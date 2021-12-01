---
title: 基于AST在yapi平台下自动生成代码
img: /blogs/基于AST在yapi平台下自动生成代码.jpg
alt: nice image
createAt: 2021.08.22
tags: 
  - web development
---

yapi是个很便捷的工具便于开发人员编写相应的接口文档，开发人员只需要输入相应的字段以及属性就可以自动生成对应的接口文档。前后端只需要通过这个平台生成的文档进行接口对接。前端在写返回参数的ts类型约束的时候就需要参考yapi文档，有时候数据格式多且复杂，增加了编写ts类型的成本，所以本篇文章介绍的是如何在yapi平台上自动生成ts代码。

## 问题与背景
ts现在是前端开发的主流工具，引用它来增加项目代码的健壮性与可维护性。我们期望使用ts类型约束来应用到api请求的入参与返回值，以获得更好的编码体验。
那么问题来了，有时候yapi上的数据非常的多且结构复杂，为这些数据编写ts约束类型无疑会增加我们前端开发的工作量，如果不写用any代替的话，后续开发时有没有相关的类型约束提示，又会导致开发体验非常的差，真的是进退两难。

## 愿景
我们想体验ts带来的便利又不想花太多的时间编写ts类型代码，因为编写代码本来就是机械化与重复性高的工作，程序员的宝贵时间就应该花在更有意义的事情上。因此我们迫切需要有一套属于我们自己的工具，帮我们自动编写相应的ts代码。

我们期望它可以基于yapi文档，自动生成ts类型约束代码，生成相应的api请求调用函数和相应的文档注释。

## 可行性分析
### 数据来源
通过爬取yapi里的接口数据，我们可以发现生成yapi文档的数据都可以从接口里获取，由此可见我们直接爬取相关接口就可以得到相应的数据了，并且数据里包含了各字段属性的配置，详情见下图
![image](/blogs/yapi/yapi.png)
<img-text>yapi文档</img-text>

![image](/blogs/yapi/api.png)
<img-text>yapi接口数据</img-text>

### 代码生成
有了数据字段，以及相应的字段属性，我们就能生成对应的ts代码了, babel-type 这个工具库功能很强，可以根据AST生成相应的代码。
1、根据入参与返回参数的数据格式，生成相应的ts类型约束代码。
2、根据各个字段的描述，补充相应的注释代码。
3、根据 action(url) 值，生成对应的api请求方法。

### 依赖的工具
NodeJS or chorem 插件？
最终我还是选择了 chrome 插件，原因如下：
1、用 chrome 插件无需模拟登录，其请求携带的cookies信息和浏览器是共享的。因为公司接入的yapi平台是需要sso登录的，使用node需要模拟sso登录，实现起来难度比较大。
2、用 chrome 插件可以直接在yapi网页上操作，无需手动输入apiId的地址，更加的方便直观。

## 大体方案流程
- 1、爬取接口数据
- 2、数据格式转化
- 3、拆解数据结构，通过 babel 工具生成 ts 代码
- 4、代码复制到粘贴板上

## 详细方案
- 1、先声明一个typeList 和 enumTypeList 变量来存储各个类型描述对象
- 2、解析yapi上的数据，先对数据进行转化，将对象属性转为列表，如下图所示：
![image](/blogs/yapi/data-raw.png)
<img-text>原始数据</img-text>
![image](/blogs/yapi/data.jpg)
<img-text>转化后的数据</img-text>
字段解释
``` js
name: 对应的签名字段
description: 类型描述，用来做代码注释
type: 字段类型
isArray: 是否是array类型的字段
required: 该字段是否必须
```
简单类型的字段直接处理即可，但是对于复杂类型需要做特殊处理，可以看到转化后会有两个特殊类型，'ClassEnumType' 和 'FriedsType'，遇到复杂数据格式的时候，需要数据的type值用一个自定义的 type 值来代替，然后深入遍历这个复杂的对象的各个属性（如果属性里又有复杂的对象，就需要递归这个方法），生成一个类型对象，并push到刚还是定义的typeList里，这个类型对象包括类型名称（就是我们刚才自定义值）、类型成员、类型描述。需要注意的是枚举类型和数组类型，需要根据 enum 属性是否有值来判断是否属于枚举类，并生成一个枚举对象 push 到 enumTypeList 里。type 为 'array' 代表数组类型，如果是数组类型，需要在多做一层相应的处理。
最后会得到一系列数据:
``` js
{
  action, // action 值
  apiDesc, // api 文档描述
  apiLocation, // api 地址
  functionName, // 函数名称
  requestType, // 入参数据类型
  responseDataInfo, // 返回数据格式的描述
  typeList, // 复杂类型的列表
  enumTypeList, // 枚举类型列表
}
``` 
- 3、然后babel 工具 利用这些数据就可以生成我们的ts代码了，生成结果如下：
``` js
/*
  * 
  * yapi: https://yapi.hellobike.cn/project/3271/interface/api/215029
  * actionName: Test
*/
import Request from "@/network";
// A-A班，B-B班，C-C班 枚举类
export enum ClassEnumType {
  A = "A",
  B = "B",
  C = "C",
}

export type TestReq = {
  userName: string; // 用户名

  password: string; // 密码

};

// 朋友类型
export type FriendsType = {
  name: string; // 名称
  age: number; // 年纪
};
export type TestResponseType = {
  age: number; // 年纪

  phone: string; // 手机号

  class: ClassEnumType; // A-A班，B-B班，C-C班

  userId: string; // 用户id

  email?: string; // 邮箱

  friends: FriendsType[]; // 朋友列表

};
export function testAPI(params: TestReq) {
  return Request.request<TestResponseType>("", params, false, true);
}
```
- 5、最后利用 html 原生的 navigator.clipboard.writeText(code) 方法就可以把代码复制到粘贴板上
看源代码可以访问该地址: [https://github.com/zhoufeifan/yapi-airship](https://github.com/zhoufeifan/yapi-airship)
### babel-type 的使用
## babel-type 的使用
生成代码就需要借助 babel-type 工具了，[点击查看详细文档](https://www.babeljs.cn/docs/babel-types)。可以看到babel-type的api文档内容非常复杂且庞大，
所以通过阅读熟记文档来学习是不可取的。所以建议是有目的性的去使用它，先把想要生成的代码转化为对应的AST。在分析对应的AST结构，需要构造哪些节点以及相应的节点属性，再有目的性地查阅对应的api方法构建相应的AST，
[这里推荐使用一个AST在线转换工具](https://astexplorer.net/)，快速将代码转换成相应的AST。
举个例子：
代码 ``` console.log('test') ``` 转成 AST 格式如下:

``` json
"body": [
  {
    "type": "ExpressionStatement",
    "expression": {
      "type": "CallExpression",
      "callee": {
        "type": "MemberExpression",
        "object": {
          "type": "Identifier",
          "name": "console"
        },
        "computed": false,
        "property": {
          "type": "Identifier",
          "name": "log"
        }
      },
      "arguments": [
        {
          "type": "StringLiteral",
          "extra": {
            "rawValue": "test",
            "raw": "'test'"
          },
          "value": "test"
        }
      ]
    }
  }
]
```
从语法树上可以看到需要构造这段代码，就得先创建 一个 ExpressionStatement, 查阅 api 其调用方式如下：
``` js
const expressionStatement =  t.expressionStatement(expression); 
```
expressionStatement 方法依赖一个 expression 类型的参数，从AST里看到 它需要一个 CallExpression，因此需要创建 CallExpression 作为参数传给它,代码如下：
``` js
const expression = t.callExpression(callee, args);
const expressionStatement =  t.expressionStatement(expression); 
```
callExpression 又需要一个 callee 对象与 arguments 对象。 callee的类型是 MemberExpression，arguments 的是个list 里面需要存在一个 StringLiteral 对象，
按这种方法一直推导，最终得出构造 AST 的代码如下：
```js
const callee = t.memberExpression(
  t.identifier('console'), 
  t.identifier('log')
);
const args = [t.stringLiteral('aa')];
const expression = t.callExpression(callee, args);
const expressionStatement =  t.expressionStatement(expression); 
```
### 工具演示
需先安装好chrome插件

![image](/blogs/yapi/step-1.jpg)

![image](/blogs/yapi/step-2.png)

![image](/blogs/yapi/step-3.png)


## 遇到的坑点
### chrome 的缺陷
1、不支持模块加载，即无法使用模块的导入与导出，编码体验不佳
2、原生的babel工具不支持在浏览器里运行，会报错

相应的解决方案:
引入rollup 打包工具，支持模块化编程、配置相应的插件让babel支持在浏览器里使用，并且还可以让项目支持ts语法

修改 rollup.config.js 文件如下：
``` js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "@rollup/plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
// 适配node环境的代码
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';

const extensions = ['.js', '.ts'];

export default {
  input: 'src/main.ts',
  output: {
    file: 'js/content.js',
    // format: 'cjs'
  },
  plugins: [ 
    json(),
    resolve({
      extensions,
      // modulesOnly: true,
    }),
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript")
    }),
    commonjs({
      include: 'node_modules/**',  // Default: undefined
      browser: true,
      preferBuiltins: false,
      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false,  // Default: false
      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false  // Default: true
    }),
    globals(),
    builtins(),
    sourceMaps(),
  ],
};

```

选择 rollup 的原因：
- 1、配置简单，开箱即用
- 2、更适合打包纯js应用
- 3、打包的速度快、体积小，没有额外附加的代码

### 注释代码生成找不到api文档
找遍了 babel-type 对应的官方文档，没有介绍如何生成代码注释，后来又去翻了其源码才找到对应的方法，代码如下：
``` js
// t.addComment(node, 'leading', commentText, false);
t.addComment(node, type, content, line)
```
参数说明
- node: 注释添加的节点， AST 节点 类型
- type: 注释类型， 字符串枚举类 "leading" | "inner" | "trailing"
- content: 注释文案，string 类型
- line: boolean类型，ture 单行文本注释，false 块注释

## yapi平台的缺陷
### 枚举型数据存在缺陷
yapi对枚举类的支持度较低，只能对 string 类型的定义枚举值，且不能定义枚举值的别名。如图所示：
![image](/blogs/yapi/enum.png)
<img-text>枚举类配置图</img-text>

### 应对方案
既然只支持字符串枚举，那是否可以把枚举值和相应的变量名统一，来达到自动生成枚举类的效果呢，例如字符串类型的枚举值分别是'A','B','C' 那么对应生成的枚举代码如下：
```
enum EnumType {
  A = 'A',
  B = 'B',
  C = 'C'
}
```

## 后续拓展
### 1、在chrome 插件中接入配置功能：
- 配置头部的导入代码片段和部的调用代码片段，灵活适配各业务项目
- 需要过滤的api入参列表：例如我们项目里 action 和 token 是自带的参数，不需要用户传，所以类型约束参数里会过滤掉它们

### 2、接入 eslint
生成的代码用 eslint 进行格式化，省去生成的代码到项目中进行格式调整的步骤，当然这个eslint的规则也可以支持相应配置。
 

## 总结
idea 才是第一生成力，遇到问题，制定应对策略，敢于去做尝试，无论结果如何，总会有一定的收获


