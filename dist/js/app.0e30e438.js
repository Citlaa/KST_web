(function(t){function e(e){for(var r,i,s=e[0],c=e[1],u=e[2],p=0,d=[];p<s.length;p++)i=s[p],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(r=!1)}r&&(a.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={app:0},a=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=n("8c4f"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container is-max-desktop",attrs:{id:"app"}},[n("router-view")],1)},i=[],s={name:"App"},c=s,u=(n("034f"),n("2877")),l=Object(u["a"])(c,a,i,!1,null,null,null),p=l.exports,d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("router-link",{staticClass:"button is-success mt-5",attrs:{to:{name:"Create"}}},[t._v("Add New")]),n("table",{staticClass:"table is-striped is-bordered mt-2 is-fullwidth"},[t._m(0),n("tbody",t._l(t.items,(function(e){return n("tr",{key:e.TipoDePagoId},[n("td",[t._v(t._s(e.TipoDePagoId))]),n("td",[t._v(t._s(e.Nombre))]),n("td",[t._v(t._s(e.Monto))]),n("td",{staticClass:"has-text-centered"},[n("router-link",{staticClass:"button is-info is-small",attrs:{to:{name:"Edit",params:{id:e.product_id}}}},[t._v("Edit")]),n("a",{staticClass:"button is-danger is-small",on:{click:function(n){return t.deleteProduct(e.product_id)}}},[t._v("Delete")])],1)])})),0)])],1)},f=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("Folio")]),n("th",[t._v("Concepto")]),n("th",[t._v("Monto")]),n("th",{staticClass:"has-text-centered"},[t._v("Actions")])])])}],v=n("1da1"),h=(n("96cf"),n("159b"),n("bc3a")),m=n.n(h),b={name:"ProductList",data:function(){return{items:[]}},created:function(){this.getTiposDePago()},methods:{getTiposDePago:function(){var t=this;return Object(v["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.a.get("http://castelazo.edu.mx/app/tiposDePago");case 3:n=e.sent,n.data.forEach((function(e){t.items.push({TipoDePagoId:e["001TipoDePagoId"],Nombre:e["001Nombre"],Monto:e["001Monto"]})})),console.log(t.items),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}}},_=b,g=Object(u["a"])(_,d,f,!1,null,null,null),y=g.exports;r["a"].use(o["a"]),r["a"].config.productionTip=!1;var w=[{name:"Index",path:"/",component:y}],x=new o["a"]({mode:"history",routes:w});new r["a"]({router:x,render:function(t){return t(p)}}).$mount("#app")},"85ec":function(t,e,n){}});
//# sourceMappingURL=app.0e30e438.js.map