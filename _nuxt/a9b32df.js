(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{299:function(t,e,n){var content=n(327);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(21).default)("b641da12",content,!0,{sourceMap:!1})},326:function(t,e,n){"use strict";n(299)},327:function(t,e,n){(e=n(20)(!1)).push([t.i,".tag>.title[data-v-f7645c98]{position:relative;display:flex;align-items:center;padding:.5rem 0;line-height:1.5rem;font-size:1rem;font-weight:400}.tag>.title i[data-v-f7645c98]{margin-right:.5rem}.tag>.title>.title-name[data-v-f7645c98]{position:relative;padding-right:1.5rem;background:var(--theme-white);z-index:99}.tag>.title>.line[data-v-f7645c98]{top:50%}",""]),t.exports=e},347:function(t,e,n){"use strict";n.r(e);n(46);var r={name:"tag",transition:"fade",scrollToTop:!0,fetch:function(t){t.store,t.params},head:function(){return{title:"".concat(this.tagName," | tag")}},data:function(){return{}},components:{articleView:n(289).default},computed:{mobileLayout:function(){return this.$store.state.options.mobileLayout},tagName:function(){return this.$route.params.tag},list:function(){var t=this;return this.$store.state.articleList.filter((function(e){return e.tag===t.tagName}))},currentPage:function(){return 1}}},o=(n(326),n(7)),component=Object(o.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tag"},[e("p",{staticClass:"title"},[e("span",{staticClass:"title-name"},[e("i",{staticClass:"iconfont icon-tag"}),this._v(" "+this._s(this.tagName)+" ")]),this._v(" "),e("span",{staticClass:"line"})]),this._v(" "),e("div",{staticClass:"article"},[e("articleView",{attrs:{articleList:this.list,haveMoreArt:!1,havePreArt:!1,currentPage:this.currentPage,currentType:""}})],1)])}),[],!1,null,"f7645c98",null);e.default=component.exports}}]);