(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{296:function(t,e,o){var content=o(307);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(22).default)("46c868e2",content,!0,{sourceMap:!1})},306:function(t,e,o){"use strict";o(296)},307:function(t,e,o){(e=o(21)(!1)).push([t.i,".about{width:45rem;margin:0 auto}.about .title{position:relative;padding:.5rem 0;line-height:1.5rem;color:var(--theme-black);font-size:1rem;font-weight:400}.about .title>.title-name{position:relative;padding-right:1.5rem;background:var(--theme-white);z-index:99}.about .title>.line{top:50%}.about .title.more{margin-top:2rem}.about .title-mobile{margin-top:0}.about .last{padding:2rem;border:0}.about .last p{margin:.5rem 0}.about .last a{text-decoration:underline}.about .friend{display:flex;flex-wrap:wrap;padding:2rem 2rem 1rem}.about .friend a{width:30%;height:3rem;margin-bottom:1rem;margin-right:5%;line-height:3rem;text-align:center;background:var(--code-bg)}.about .friend a:nth-child(3n){margin-right:0}.about .info-box{display:flex;justify-content:space-between}.about .info-box>.info{position:relative;width:calc(100% - 17rem);padding:1rem 0}.about .info-box>.info>.list{display:flex;margin:.5rem;padding:0 1.5rem;height:36px;line-height:36px}.about .info-box>.info>.list i{color:var(--text-light-4)}.about .info-box>.info>.list>.list-content{margin-left:1rem}.about .info-box>.info>.list span.icons{display:flex}.about .info-box>.info>.list span.icons a{margin-right:1rem}.about .info-box>.info>.list span.icons i{color:var(--text);transition:all .5s}.about .info-box>.info>.list span.icons i:hover{font-size:1.3rem;color:var(--theme-black)}.about .info-box>.user-box{width:16rem;padding-right:2rem}.about .info-box>.user-box .user{padding:1rem;overflow:hidden}.about .info-box>.user-box .user img{max-width:100%;border-radius:4px}.about>.comment{margin-top:2rem}.about.mobile{width:100%;transform:translate(0)}.about.mobile>.info-box{width:100%;flex-direction:column-reverse}.about.mobile>.info-box>.info{padding:1rem;width:100%}.about.mobile>.info-box>.info>.list{padding:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.about.mobile>.info-box>.user-box{width:100%;padding-right:0}.about.mobile>.info-box>.user-box>.user{padding:1.5rem}.about.mobile .text-box .text{padding:1.5rem;flex-wrap:wrap;text-align:left}.about.mobile .text-box .text .right{display:none}.about>.text-box{margin-top:1rem}.about>.text-box>.text{display:flex;justify-content:center;align-items:center;padding:3rem 2rem;line-height:2rem}.about>.text-box>.text .left{text-align:center}.about>.text-box>.text .right{width:12rem;text-align:center}.about>.text-box>.text .right p{margin-bottom:.5rem}",""]),t.exports=e},346:function(t,e,o){"use strict";o.r(e);var n={name:"about",transition:"fade",head:{title:"About"},data:function(){return{showBox:!1}},computed:{mobileLayout:function(){return this.$store.state.options.mobileLayout},user:function(){return this.$store.state.options.adminInfo},friends:function(){return[{name:"阮一峰",url:"http://www.ruanyifeng.com/blog/"},{name:"唐巧",url:"http://blog.devtang.com/"},{name:"张鑫旭",url:"https://www.zhangxinxu.com/wordpress/"},{name:"廖雪峰",url:"https://www.liaoxuefeng.com/wiki/1022910821149312"},{name:"奇舞周刊",url:"https://weekly.75.team/"}]}}},l=(o(306),o(7)),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"about",class:{mobile:t.mobileLayout}},[t._m(0),t._v(" "),o("div",{staticClass:"info-box",class:{"info-mobile":t.mobileLayout}},[t._m(1),t._v(" "),o("div",{staticClass:"user-box"},[o("div",{staticClass:"user"},[o("img",{attrs:{src:t.user.gravatar,alt:"",width:"100%"}})])])]),t._v(" "),o("p",{staticClass:"title more",class:{"title-mobile":t.mobileLayout}},[o("span",{staticClass:"title-name"},[t._v("More")]),t._v(" "),o("span",{staticClass:"line"})]),t._v(" "),o("div",{staticClass:"text-box "},[o("div",{staticClass:"text"},[o("div",{staticClass:"left"},[o("p",[t._v("Too young too simple, sometimes a little native")]),t._v(" "),o("p",[t._v("A little stupid, but always try hard")]),t._v(" "),o("p",[t._v("Enjoy the present")]),t._v(" "),o("p",[t._v("Always on the road")]),t._v(" "),o("p",[t._v("Sometimes have some strange ideas, "),t.mobileLayout?o("br"):t._e(),t._v("maybe i will go to relize it")])])])]),t._v(" "),o("p",{staticClass:"title more",class:{"title-mobile":t.mobileLayout}},[o("span",{staticClass:"title-name"},[t._v("Following")]),t._v(" "),o("span",{staticClass:"line"})]),t._v(" "),o("div",{staticClass:"friend"},t._l(t.friends,(function(e,n){return o("a",{key:n,attrs:{href:e.url,target:"_blank"}},[t._v("\n        "+t._s(e.name)+"\n    ")])})),0)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title"},[e("span",{staticClass:"title-name"},[this._v("About me")]),this._v(" "),e("span",{staticClass:"line"})])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"info "},[o("div",{staticClass:"list"},[o("i",{staticClass:"iconfont icon-user"}),t._v(" "),o("span",{staticClass:"list-content"},[t._v("序猿 周, "),o("span",[t._v("a 90s boy.")])])]),t._v(" "),o("div",{staticClass:"list"},[o("i",{staticClass:"iconfont icon-like"}),t._v(" "),o("span",{staticClass:"list-content"},[t._v("Code, Read, and Exercise.")])]),t._v(" "),o("div",{staticClass:"list"},[o("img",{attrs:{src:"/icons/sport.svg",width:"16px"}}),t._v(" "),o("span",{staticClass:"list-content"},[t._v("Run, Swim And Go Hinking.")])]),t._v(" "),o("div",{staticClass:"list"},[o("i",{staticClass:"iconfont icon-coffee"}),t._v(" "),o("span",{staticClass:"list-content"},[t._v("Hello world!")])])])}],!1,null,null,null);e.default=component.exports}}]);