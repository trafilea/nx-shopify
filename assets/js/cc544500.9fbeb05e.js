(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{95:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return l}));var a=n(3),s=n(7),i=(n(0),n(98)),r={title:"Theme Structure"},o={unversionedId:"fundamentals/theme-structure",id:"fundamentals/theme-structure",isDocsHomePage:!1,title:"Theme Structure",description:"The project structure generated by Nx-Shopify differs in a great manner with what you are used to with themekit. Despite it was built with ease-of-use in mind, here is an explanation of the main differences with a plain themekit project.",source:"@site/docs/fundamentals/theme-structure.md",slug:"/fundamentals/theme-structure",permalink:"/nx-shopify/docs/fundamentals/theme-structure",editUrl:"https://github.com/trafilea/nx-shopify/edit/master/docs/docs/fundamentals/theme-structure.md",version:"current",sidebar:"docs",previous:{title:"Creating a Theme",permalink:"/nx-shopify/docs/fundamentals/creating-a-theme"},next:{title:"Theme Bootstrap Process",permalink:"/nx-shopify/docs/fundamentals/theme-bootstrap"}},c=[{value:"Assets",id:"assets",children:[{value:"Using assets",id:"using-assets",children:[]}]},{value:"Core",id:"core",children:[]},{value:"Environments",id:"environments",children:[]},{value:"Theme",id:"theme",children:[]}],p={toc:c};function l(e){var t=e.components,n=Object(s.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"The project structure generated by ",Object(i.b)("inlineCode",{parentName:"p"},"Nx-Shopify")," differs in a great manner with what you are used to with ",Object(i.b)("inlineCode",{parentName:"p"},"themekit"),". Despite it was built with ease-of-use in mind, here is an explanation of the main differences with a plain ",Object(i.b)("inlineCode",{parentName:"p"},"themekit")," project."),Object(i.b)("p",null,"This is the general project structure you will find in a ",Object(i.b)("inlineCode",{parentName:"p"},"Nx-Shopify")," theme."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-treeview"},"apps/my-theme/src\n\u251c\u2500\u2500 assets\n\u251c\u2500\u2500 config\n\u251c\u2500\u2500 core\n\u251c\u2500\u2500 environments\n\u251c\u2500\u2500 locales\n\u251c\u2500\u2500 theme\n\u2502   \u251c\u2500\u2500 layout\n\u2502   \u251c\u2500\u2500 sections\n\u2502   \u251c\u2500\u2500 snippets\n\u2502   \u2514\u2500\u2500 templates\n\u2514\u2500\u2500 main.ts\n")),Object(i.b)("h2",{id:"assets"},"Assets"),Object(i.b)("p",null,"All the assets content will be placed inside this directory. You can organize your assets using as many subdirectories as you want (can be nested)."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-treeview"},"apps/my-theme/src/assets\n\u251c\u2500\u2500 favicon\n\u251c\u2500\u2500 fonts\n\u251c\u2500\u2500 images\n\u2502   \u2514\u2500\u2500 example.png\n\u2514\u2500\u2500 svg\n    \u2514\u2500\u2500 example.svg\n")),Object(i.b)("p",null,"The theme build output will flatten all the files into a single ",Object(i.b)("inlineCode",{parentName:"p"},"assets")," directory. The above example will generate the following output:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-treeview"},"dist/apps/my-theme/assets\n\u251c\u2500\u2500 (... css files)\n\u251c\u2500\u2500 (... js files)\n\u251c\u2500\u2500 example.png\n\u251c\u2500\u2500 example.svg\n\u2514\u2500\u2500 ...\n")),Object(i.b)("div",{className:"admonition admonition-warning alert alert--danger"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"Knowing this, you should take special care on not using the exact same name for more than one file inside the ",Object(i.b)("inlineCode",{parentName:"p"},"src/assets")," directory or subdirectories as only one of them will go through the build process."))),Object(i.b)("h3",{id:"using-assets"},"Using assets"),Object(i.b)("p",null,"As mentioned above, it does not matter how you organize your assets files at source code level, the output result for any asset will always be ",Object(i.b)("inlineCode",{parentName:"p"},"assets/<asset name>"),". So, in order to use assets in your theme code you should not take into account it's subdirectories."),Object(i.b)("p",null,"For example:"),Object(i.b)("p",null,"Given this images:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-treeview"},"apps/my-theme/src/assets\n\u2514\u2500\u2500 images\n    \u251c\u2500\u2500 example.png\n    \u2514\u2500\u2500 product-page\n        \u2514\u2500\u2500 pdp-banner.png\n")),Object(i.b)("p",null,"Then, in your liquid code:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-html"},"// \u274c Bad\n<img src=\"{{ 'images/example.png' | asset_url }}\" />\n<img src=\"{{ 'images/product-page/pdp-banner.png' | asset_url }}\" />\n\n// \u2705 Good\n<img src=\"{{ 'example.png' | asset_url }}\" />\n<img src=\"{{ 'pdp-banner.png' | asset_url }}\" />\n")),Object(i.b)("h2",{id:"core"},"Core"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-treeview"},"apps/my-theme/src/core\n\u251c\u2500\u2500 ...\n\u251c\u2500\u2500 theme-bootstrap.ts\n\u251c\u2500\u2500 theme-context.ts\n\u251c\u2500\u2500 theme-module.ts\n\u2514\u2500\u2500 ...\n")),Object(i.b)("p",null,"The core directory contains essential TypeScript files related to how the theme is initialized once is loaded into a web browser."),Object(i.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"Learn more about the theme is initialized in the ",Object(i.b)("a",{parentName:"p",href:"theme-bootstrap"},"Theme Bootstrap Process doc"),"."))),Object(i.b)("h2",{id:"environments"},"Environments"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-treeview"},"apps/my-theme/src/environments\n\u251c\u2500\u2500 environment.prod.ts\n\u2514\u2500\u2500 environment.ts\n")),Object(i.b)("p",null,"All the TypeScript environment files will be placed in this directory."),Object(i.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"Learn more about working with environments in the ",Object(i.b)("a",{parentName:"p",href:"../guides/environments"},"Environments Guide"),"."))),Object(i.b)("h2",{id:"theme"},"Theme"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"src/theme")," directory contains all the theme blocks separated in their respective subdirectory"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-treeview"},"apps/my-theme/src/theme\n\u251c\u2500\u2500 layout\n\u251c\u2500\u2500 sections\n\u251c\u2500\u2500 snippets\n\u2514\u2500\u2500 templates\n")),Object(i.b)("p",null,"Each block (",Object(i.b)("inlineCode",{parentName:"p"},"layout"),", ",Object(i.b)("inlineCode",{parentName:"p"},"template"),", ",Object(i.b)("inlineCode",{parentName:"p"},"section")," or ",Object(i.b)("inlineCode",{parentName:"p"},"snippet"),") is composed by 3 files:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Liquid file (.liquid)"),Object(i.b)("li",{parentName:"ul"},"TypeScript file (.ts)"),Object(i.b)("li",{parentName:"ul"},"Styles file (.sass)")),Object(i.b)("p",null,"You can have any amount of blocks organized in as much subdirectories as you need in order to have a structured code base that suits your needs."),Object(i.b)("p",null,"You could, for example, organize your snippets according to where they are designed to be used:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-treeview"},"apps/my-theme/src/theme/snippets\n\u251c\u2500\u2500 index\n\u2502   \u251c\u2500\u2500 hero-slider\n\u2502   \u2502   \u251c\u2500\u2500 hero-slider.liquid\n\u2502   \u2502   \u251c\u2500\u2500 hero-slider.snippet.scss\n\u2502   \u2502   \u2514\u2500\u2500 hero-slider.snippet.ts\n\u2502   \u2514\u2500\u2500 special-promo-news\n\u2502       \u251c\u2500\u2500 special-promo-news.liquid\n\u2502       \u251c\u2500\u2500 special-promo-news.snippet.scss\n\u2502       \u2514\u2500\u2500 special-promo-news.snippet.ts\n\u251c\u2500\u2500 index.ts\n\u251c\u2500\u2500 product\n\u2502   \u251c\u2500\u2500 product-gallery\n\u2502   \u2502   \u251c\u2500\u2500 product-gallery.liquid\n\u2502   \u2502   \u251c\u2500\u2500 product-gallery.snippet.scss\n\u2502   \u2502   \u2514\u2500\u2500 product-gallery.snippet.ts\n\u2502   \u2514\u2500\u2500 product-recommendations\n\u2502       \u251c\u2500\u2500 product-recommendations.liquid\n\u2502       \u251c\u2500\u2500 product-recommendations.snippet.scss\n\u2502       \u2514\u2500\u2500 product-recommendations.snippet.ts\n\u2514\u2500\u2500 shared\n    \u251c\u2500\u2500 message\n    \u2502   \u251c\u2500\u2500 message-body\n    \u2502   \u2502   \u251c\u2500\u2500 message-body.liquid\n    \u2502   \u2502   \u251c\u2500\u2500 message-body.scss\n    \u2502   \u2502   \u2514\u2500\u2500 message-body.ts\n    \u2502   \u251c\u2500\u2500 message-box\n    \u2502   \u2502   \u251c\u2500\u2500 message-box.liquid\n    \u2502   \u2502   \u251c\u2500\u2500 message-box-section\n    \u2502   \u2502   \u2502   \u251c\u2500\u2500 message-box-section.liquid\n    \u2502   \u2502   \u2502   \u251c\u2500\u2500 message-box-section.snippet.scss\n    \u2502   \u2502   \u2502   \u2514\u2500\u2500 message-box-section.snippet.ts\n    \u2502   \u2502   \u251c\u2500\u2500 message-box.snippet.scss\n    \u2502   \u2502   \u2514\u2500\u2500 message-box.snippet.ts\n    \u2502   \u251c\u2500\u2500 message.liquid\n    \u2502   \u251c\u2500\u2500 message.snippet.scss\n    \u2502   \u2514\u2500\u2500 message.snippet.ts\n    \u251c\u2500\u2500 promo-banner\n    \u2502   \u251c\u2500\u2500 promo-banner.liquid\n    \u2502   \u251c\u2500\u2500 promo-banner.snippet.scss\n    \u2502   \u2514\u2500\u2500 promo-banner.snippet.ts\n    \u2514\u2500\u2500 sidebar-cart\n        \u251c\u2500\u2500 sidebar-cart.liquid\n        \u251c\u2500\u2500 sidebar-cart.snippet.scss\n        \u2514\u2500\u2500 sidebar-cart.snippet.ts\n")),Object(i.b)("p",null,"You can leverage from our built-in ",Object(i.b)("a",{parentName:"p",href:"../cli-usage/generators/layout"},"Code Generators")," to scaffold the theme structure you desire. The code generators will take care of verifying that no duplicated blocks will be created even if you try to do it in different subfolders."),Object(i.b)("div",{className:"admonition admonition-important alert alert--info"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"important")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"Do not forget that a theme block name should be unique in it's block type. You can perfectly have a snippet and a section both called ",Object(i.b)("inlineCode",{parentName:"p"},"message-box")," at the same time."))))}l.isMDXComponent=!0},98:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return u}));var a=n(0),s=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var p=s.a.createContext({}),l=function(e){var t=s.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=l(e.components);return s.a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return s.a.createElement(s.a.Fragment,{},t)}},b=s.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,r=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=l(n),b=a,u=m["".concat(r,".").concat(b)]||m[b]||d[b]||i;return n?s.a.createElement(u,o(o({ref:t},p),{},{components:n})):s.a.createElement(u,o({ref:t},p))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=b;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,r[1]=o;for(var p=2;p<i;p++)r[p]=n[p];return s.a.createElement.apply(null,r)}return s.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);