(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-idea-idea"],{"03b6":function(t,i,e){"use strict";e("99af"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o={data:function(){return{booksList:[],ID:"",scrool_view:0,conditions:{all_type:[],all_label:[],all_font_number:[{ID:-1,name:"全部"},{ID:0,name:"30万字以下"},{ID:1,name:"30万-50万字"},{ID:2,name:"50万-100万字"},{ID:3,name:"100万-200万字"},{ID:4,name:"200万字以上"}]},conditions_click:{type:{ID:-1,name:"全部分类"},label:{ID:-1,name:"全部标签"},font_number:{ID:-1,name:"全部"}},page_num:1}},onLoad:function(){var t=this;this.ID=this.$route.query.ID,this.$request.getRequst("/type/info?ID="+this.$route.query.ID).then((function(i){uni.setNavigationBarTitle({title:i.data.name}),t.conditions.all_type=i.data.all_type,t.conditions.all_label=i.data.all_label})),this.booksList=[],this.requestBooks()},onReachBottom:function(){if(1==this.scrool_view)return 0;this.page_num=this.page_num+1,this.requestBooks()},methods:{requestBooks:function(){var t=this,i={ID:this.ID,conditions:this.conditions_click,page:this.page_num};this.$request.postRequst("/type/details",i).then((function(i){i.data.booksList[0]?i.data.booksList[0].NumSerial&&(i.data.booksList.length<10?t.scrool_view=1:t.scrool_view=0,t.booksList=t.booksList.concat(i.data.booksList)):(t.booksList=[],t.scrool_view=1)}))},type_click:function(t,i){var e=this;1==i?(this.conditions_click.type=t,this.conditions_click.label={ID:-1,name:"全部标签"},this.$request.getRequst("/type/info?ID="+this.ID+"&navsmalltpye_id="+this.conditions_click.type.ID).then((function(t){e.conditions.all_label=t.data.all_label}))):2==i?this.conditions_click.label=t:3==i&&(this.conditions_click.font_number=t),this.booksList=[],this.requestBooks()},navtoDetail:function(t){uni.navigateTo({url:"/pages/detail/detail?NumSerial=".concat(t.NumSerial)})},show_hover:function(){console.log(1)}}};i.default=o},"13c6":function(t,i,e){"use strict";var o,n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"conditions"},[e("v-uni-scroll-view",{staticClass:"type",attrs:{"scroll-x":"true"}},t._l(t.conditions.all_type,(function(i){return e("v-uni-text",{class:{hover:i.ID==t.conditions_click.type.ID},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.type_click(i,1)}}},[t._v(t._s(i.name))])})),1),e("v-uni-scroll-view",{staticClass:"type",attrs:{"scroll-x":"true"}},t._l(t.conditions.all_label,(function(i){return e("v-uni-text",{class:{hover:i.ID==t.conditions_click.label.ID},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.type_click(i,2)}}},[t._v(t._s(i.name))])})),1),e("v-uni-scroll-view",{staticClass:"type",attrs:{"scroll-x":"true"}},t._l(t.conditions.all_font_number,(function(i){return e("v-uni-text",{class:{hover:i.ID==t.conditions_click.font_number.ID},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.type_click(i,3)}}},[t._v(t._s(i.name))])})),1)],1),e("v-uni-view",{staticClass:"booksList"},[t._l(t.booksList,(function(i){return e("v-uni-view",{staticClass:"booksOne",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navtoDetail(i)}}},[e("v-uni-view",{staticClass:"booksImg"},[e("v-uni-image",{attrs:{src:i.picture}})],1),e("v-uni-view",{staticClass:"booksInfo"},[e("v-uni-view",{staticClass:"title"},[t._v(t._s(i.name))]),e("v-uni-view",{staticClass:"synopsis"},[t._v(t._s(i.synopsis))]),e("v-uni-view",{staticClass:"author_type"},[e("v-uni-view",{staticClass:"author"},[t._v(t._s(i.author))]),e("v-uni-view",{staticClass:"type"},[e("v-uni-text",[t._v("完结")]),e("v-uni-text",[t._v(t._s(i.navtype_name))])],1)],1)],1)],1)})),e("v-uni-view",{staticClass:"scroll"},[t._v(t._s(0==t.scrool_view?"下拉加载":"没有跟多数据了"))])],2)],1)},a=[];e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return o}))},"17de":function(t,i,e){var o=e("7216");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var n=e("4f06").default;n("648085fb",o,!0,{sourceMap:!1,shadowMode:!1})},7216:function(t,i,e){var o=e("24fb");i=o(!1),i.push([t.i,".conditions[data-v-56ee9fc6]{padding-right:%?30?%;font-size:%?26?%}.conditions .type[data-v-56ee9fc6]{white-space:nowrap;width:100%;height:%?60?%;line-height:%?60?%;margin:%?10?% 0;border-right:1px solid #ddd}.conditions .type uni-text[data-v-56ee9fc6]{padding-left:%?30?%}.conditions .type uni-text.hover[data-v-56ee9fc6]{color:#d39477}[data-v-56ee9fc6] ::-webkit-scrollbar{\n\t/* 隐藏滚动条，但依旧具备可以滚动的功能 */display:none;width:0!important;height:0}.booksOne[data-v-56ee9fc6]{display:-webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */display:-moz-box; /* 老版本语法: Firefox (buggy) */display:-ms-flexbox; /* 混合版本语法: IE 10 */display:-webkit-flex; /* 新版本语法: Chrome 21+ */padding:%?30?%}.booksOne.hover[data-v-56ee9fc6]{background-color:#ddd;opacity:.5}.booksImg[data-v-56ee9fc6]{width:%?150?%;height:%?200?%}.booksImg uni-image[data-v-56ee9fc6]{width:100%;height:100%;background-color:#ddd}.booksInfo[data-v-56ee9fc6]{width:%?540?%;padding-left:%?20?%;color:#898989;font-size:%?24?%}.booksInfo .title[data-v-56ee9fc6]{font-size:%?32?%;color:#000;line-height:%?60?%}.synopsis[data-v-56ee9fc6]{text-overflow:-o-ellipsis-lastline;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;margin:%?10?% 0}.author_type[data-v-56ee9fc6]{overflow:hidden;padding:%?20?% 0 %?10?%}.author_type .author[data-v-56ee9fc6]{float:left}.author_type .type[data-v-56ee9fc6]{float:right}.author_type .type uni-text[data-v-56ee9fc6]{padding:%?5?% %?10?%;border:%?3?% solid #ddd;border-radius:%?5?%;margin-left:%?20?%}",""]),t.exports=i},a871:function(t,i,e){"use strict";var o=e("17de"),n=e.n(o);n.a},bad8:function(t,i,e){"use strict";e.r(i);var o=e("03b6"),n=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(i,t,(function(){return o[t]}))}(a);i["default"]=n.a},dd17:function(t,i,e){"use strict";e.r(i);var o=e("13c6"),n=e("bad8");for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);e("a871");var s,l=e("f0c5"),c=Object(l["a"])(n["default"],o["b"],o["c"],!1,null,"56ee9fc6",null,!1,o["a"],s);i["default"]=c.exports}}]);