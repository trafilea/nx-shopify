(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{66:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return s})),r.d(t,"metadata",(function(){return o})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return u}));var n=r(3),i=r(7),a=(r(0),r(98)),s={title:"Liquid in Styles"},o={unversionedId:"guides/liquid-in-styles",id:"guides/liquid-in-styles",isDocsHomePage:!1,title:"Liquid in Styles",description:"Shopify has deprected the use of SaSS in themes. But there are still ways of using Liquid to change the way your styles behave. Here is one simple approach to achieve this:",source:"@site/docs/guides/liquid-in-styles.md",slug:"/guides/liquid-in-styles",permalink:"/nx-shopify/docs/guides/liquid-in-styles",editUrl:"https://github.com/trafilea/nx-shopify/edit/master/docs/docs/guides/liquid-in-styles.md",version:"current",sidebar:"docs",previous:{title:"Liquid To TypeScript Context",permalink:"/nx-shopify/docs/guides/liquid-to-ts-context"},next:{title:"Using React Components",permalink:"/nx-shopify/docs/guides/using-react"}},l=[{value:"Create a css-variables snippet",id:"create-a-css-variables-snippet",children:[]},{value:"Initialize your Styles variables",id:"initialize-your-styles-variables",children:[]}],c={toc:l};function u(e){var t=e.components,r=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},c,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Shopify has ",Object(a.b)("a",{parentName:"p",href:"https://www.shopify.com/partners/blog/deprecating-sass"},"deprected the use of SaSS in themes"),". But there are still ways of using Liquid to change the way your styles behave. Here is one simple approach to achieve this:"),Object(a.b)("h2",{id:"create-a-css-variables-snippet"},"Create a css-variables snippet"),Object(a.b)("p",null,"Create a snippet in ",Object(a.b)("inlineCode",{parentName:"p"},"src/theme/snippets/css-variables/css-variables.liquid")," where you are going to define all the CSS variables that will be controled by liquid statements (generally settings)."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-html",metastring:'title="css-variables.liquid"',title:'"css-variables.liquid"'},"<style>\n  :root {\n    --color-primary: {{ settings.color_primary }};\n    --color-secondary: {{ settings.color_secondary }};\n  }\n</style>\n")),Object(a.b)("p",null,"Then, render this snippet in the head tag of your layout(s) before the ",Object(a.b)("inlineCode",{parentName:"p"},"script-tags")," render."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-html",metastring:'{5} title="src/theme/layout/theme/theme.liquid"',"{5}":!0,title:'"src/theme/layout/theme/theme.liquid"'},"<!DOCTYPE html>\n<html>\n  <head>\n    ... {% render 'css-variables' %} {% render 'script-tags'%} ...\n  </head>\n  <body>\n    ...\n  </body>\n</html>\n")),Object(a.b)("h2",{id:"initialize-your-styles-variables"},"Initialize your Styles variables"),Object(a.b)("p",null,"Now, in your style files you can make use of this CSS variables as you need. For example, you can create SASS variables with the CSS variables as their value:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-scss",metastring:'title="src/theme/layout/theme/theme.layout.scss"',title:'"src/theme/layout/theme/theme.layout.scss"'},"$color-primary: var(--color-primary);\n$color-secondary: var(--color-primary);\n\n.my_class {\n  color: $color-primary;\n  background-color: $color-secondary;\n}\n")))}u.isMDXComponent=!0},98:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return b}));var n=r(0),i=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=i.a.createContext({}),u=function(e){var t=i.a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=u(e.components);return i.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},y=i.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(r),y=n,b=p["".concat(s,".").concat(y)]||p[y]||d[y]||a;return r?i.a.createElement(b,o(o({ref:t},c),{},{components:r})):i.a.createElement(b,o({ref:t},c))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,s=new Array(a);s[0]=y;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:n,s[1]=o;for(var c=2;c<a;c++)s[c]=r[c];return i.a.createElement.apply(null,s)}return i.a.createElement.apply(null,r)}y.displayName="MDXCreateElement"}}]);