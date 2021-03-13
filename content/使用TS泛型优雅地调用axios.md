---
title: 使用TS泛型优雅地调用axios
createAt: 2019.03.03
tags: 
  - web development
---
## 问题场景
在平时的开发中我们经常会调用服务端的api来完成我们的业务需求，通常我们会把请求封装成promise的形式便于我们调用。代码如下：
``` js
import request from '@/uitls/request';
request(url, config).then(data=>{
  console.log(data);
})
```
都2021年了,TS已经很流行了，在TS环境下，上述的代码是有问的，then里的data参数类型为unknown，这就会给我们后续的开发带来困扰。因为我们在封装request函数的时候并没有定义这个值，当然我们也没法定义它，因为它是不确定的。

![image](/blogs/ts/1-1.png)

## 解决方案
### 用类型断言暴力解决问题

``` ts
import request from '@/uitls/request';
type User = {
  name: string;
  age: number;
}
request(url, config).then(data=>{
  const {name, age} = data as User
})
```
这种暴力的手段固然可以解决问题，但是类型断言在ts里毕竟是不推荐的。

### 用泛型的方式来进行类型的推断
``` ts
import request from '@/uitls/request';
type User = {
  name: string;
  age: number;
}
request<User>(url, config).then(data=>{
  const {name, age} = data;
})
```
我们希望通过传入类型的方式，最后推断出返回的data类型是我们期望的类型，这是比较完美的一种方案。

## 通过axios来实现泛型函数
axios 的api方法，本身就支持泛型的调用, 它的实例类型定义如下：
```ts
export interface AxiosInstance {
  //....
  request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;
  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  //....
}
```
因此我们利用axios方法的特性编写支持方向的request函数，是非常方便的。

```ts
import Ax from 'axios';
export function request<T>() {
  return Ax.get<T>('/somepath')
    .then(res => {
      const result = res.data;
      if (!result.success) {
        throw 'error'
      }
      return result;
    })
    .catch(err => console.error(err));
}
request<User>().then(data=>data);
```
上面的方式还存在一点小问题，Ax.get里返回的res指的是服务端返回的完整的数据类型，而我们reqest方法的then回调里返回的数据只是服务端返回的数据的某个字段的类型。因此还需要对上述的方法做个改造。

``` ts
// 定义一个泛型接口，代表服务端的数据类型
interface ResponseData<T = any> {
  code: string;// 状态码
  data: T;// 具体的业务数据类型
  msg: string; // 错误信息
  success: boolean; // 是否成功
}

import Ax from 'axios';
export function request<T>() {
  return Ax.get<ResponseData<T>>('/somepath')
    .then(res => {
      const result = res.data;
      if (!result.success) {
        throw 'error'
      }
      // data里面的数据类型才是我们所关心的
      return result.data;
    })
    .catch(err => console.error(err));
}
request<User>().then(data=>data);
```
通过这种方式我们就实现了，给方法传入我们想要的类型，它就会帮我们推断出返回值的具体类型。有了类型，当然后面编码就轻松多了，真的是爽！




