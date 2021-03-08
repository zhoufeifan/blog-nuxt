---
title: 使用AST，实现项目包优化
alt: nice image
createAt: 2021.01.22
tags: 
  - web development
---

## 问题背景
我们原来项目中请求API的代码是用公司现有的脚本工具生成的，其原理就是通过 node 访问 swagger 上后端开发暴露的api，根据约定的规则自动生成api请求的代码，如下所示：
```js
// api.js
import * as moduleA from './moduleA.js';
import * as moduleB from './moduleB.js';
//... 省略很多module
export default {
    moduleA,
    moduleB,
    //....省略很多module
};

//moduleA.js
export function methodA (opts) {
    return instance({
        method: 'get',
        url: '/carEquity/entry.json',
        opts: opts
    });
}
export function methodB (opts) {
    return instance({
        method: 'get',
        url: '/carEquity/entry.json',
        opts: opts
    });
}
//... 省略很多method

//moduleB.js
export function methodA (opts) {
    return instance({
        method: 'get',
        url: '/carEquity/entry.json',
        opts: opts
    });
}
export function methodB (opts) {
    return instance({
        method: 'get',
        url: '/carEquity/entry.json',
        opts: opts
    });
}
//... 省略很多method
```
其好处就是：可以一键同步api，自动生成代码省去我们的编码工作，api声明和调用规范统一。
但是它也带来了比较严重的弊端，即无论这个API方法是否被用到，它都会被打包到项目中，增大了项目的体积，影响应用的首屏启动速度。还有就是模块这种设计模式不支持代码分割，调用者必须如下的导入方式才能才能调用API：

```js
// page.js
import API from '@/api';
API.moduleA.methodA();
API.moduleB.methodB();
API.moduleA.methodC();
```
可以见上述这种方式不但调用繁琐，而且也不能启用 webpack 的 tree shaking 只打包使用到的方法。
## 解决方案
当然重构代码是一种方法，但是项目代码量已经非常盘大，如果这时候重构原来的api模块代码工作量将会非常大，这无疑是不可取的方案。但是改代码确是唯一的解决方案，那么有没有途径可以在打包的时候自动改掉原来的代码写法呢，而不用手动改原来的代码。

当然有了，babel插件提供了可以处理AST的功能，可以在babel-loader 处理的时候修改其抽象语法树，改变其代码的写法。还不了解babel 相关知识的朋友可以看下[官方文档](https://www.babeljs.cn/)
主要目的就是将上述的 page.js 的中的代码改写成如下的形式:

``` js
import { methodA, methodC } from '@/api/moduleA.js';
import { methodB } from '@/api/moduleB.js';
methodA();
methodB();
methodC();

```
写成这种形式就可以被webpack的 tree shaking 所处理，只会打包用到的代码。

## 处理步骤与核心代码
### 处理步骤
- 1、找到导入的 API 变量名
- 2、找到调用的API的模块名称，并收集每个模块下所调用的方法，moduleA: methodA,methodC
- 3、替换调用的方法，即替换函数表达式，API.moduleA.methodA() 换成 methodA()
- 4、 删掉原来的import API 的语句，改成从对应的模块里导出使用到的方法。

### 核心代码
``` js
// 存储API的变量名
let variableName = '';
// 存储用到的模块以及对应的方法，格式如下：
/*{
    moduleA: ['methodA1', 'methodA2'],
    moduleB: ['methodB1', 'methodB2'],
}*/
let moduleMap = {
}
function getAPICallInfo(obj) {
    if(obj.object) {
        const result = getAPICallInfo(obj.object);
        return result ? `${result}-${obj.property.name}` : ''
    } else {
        return obj.name === variableName ? variableName : '';
    }
}

module.exports = function (babel) {
    const {
        types: t
    } = babel;
    return {
        visitor:{
            ImportDeclaration(path){
              // 获取导入的 API 变量名
              const specifier = path.node.specifiers[0];
              const { value: pathValue } = path.node.source;
              // 约定 importSource 必须为 @/api
              if(pathValue === '@/api') {
                // 得到模块的变量名，先保存下来
                variableName = specifier.local.name;
                //移除相应的import语句
                path.remove();
              }
            },
            CallExpression(path) {
              // 获取api方法的调用链，API-moduleA-methodA，如果不是API调用的表达式则返回空
              const apiCallInfo = getAPICallInfo(path.node.callee);
              if(apiCallInfo) {
                const [_, moduleName, methodName] = apiCallInfo.split('-');
                // 调用信息先保存下来，方便到最后统一添加import
                if(moduleMap[moduleName]) {
                    moduleMap[moduleName].push(methodName);
                } else {
                    moduleMap[moduleName] = [methodName];
                }
                // 替换表达式
                // API.moduleA.methodA() ---> moduleA_methodA()
                // 前面加个模块名作为前缀，主要就是为了防止，不同模块存在相同的方法名
                path.replaceWith(t.CallExpression(
                    t.identifier(`${moduleName}_${methodName}`),
                        path.node.arguments
                ));
              }
            },
            Program: {
                exit(path) {
                  // 在遍历退出前统一把import语句添加在代码的最前面
                  Object.entries(moduleMap).forEach(([moduleName, methods])=>{
                    const importSource = `../api/${moduleName}.js`;
                    // import声明
                    const specifiers = methods.map(method =>
                        t.importSpecifier(t.identifier(`${moduleName}_${method}`),t.identifier(method))
                    )
                    //创建导入语句
                    const importDeclaration = t.importDeclaration(specifiers,t.stringLiteral(importSource));
                    // 插入到代码最前面
                    path.unshiftContainer('body',importDeclaration);
                  })
                  moduleMap = {}
                }
            }
        }
    };
}

```
经过该babel插件打包后结果代码如下所示：

```js
import { methodA as moduleA_methodA, methodC as moduleA_methodC} from '@/api/moduleA.js';
import { methodB as moduleB_methodB } from '@/api/moduleB.js';
moduleA_methodA();
moduleB_methodB();
moduleA_methodC();
```

## 遗留问题
虽然我们使用babel 初步完成了包优化，上述的代码还是有点局限性的，例如 import 的source 必须要写成‘@/api’的形式，而不支持相对路径（'../../api'）的写法。还有就是要求API 里定义的模块名称和模块文件名称不一致也会出现问题，例如：
```js
import * as moduleA from './moduleA.js';
import * as moduleB from './moduleB.js';
import * as C from './moduleC.js';
//... 省略很多module
export default {
    moduleA,
    moduleB,
    C, // 该命名就会导致出错
    //....省略很多module
};
```
针对这些问题，除了批量替换和规范约定外，还是可以写一个eslint插件，自定义校验该语法，如果发现不合理的写法可以直接报错。



