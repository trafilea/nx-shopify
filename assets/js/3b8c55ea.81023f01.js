(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{81:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return l})),t.d(n,"toc",(function(){return c})),t.d(n,"default",(function(){return s}));var a=t(3),r=t(7),i=(t(0),t(98)),o={title:"Installation"},l={unversionedId:"installation",id:"installation",isDocsHomePage:!1,title:"Installation",description:"Prerequisites",source:"@site/docs/installation.md",slug:"/installation",permalink:"/nx-shopify/docs/installation",editUrl:"https://github.com/trafilea/nx-shopify/edit/master/docs/docs/installation.md",version:"current",sidebar:"docs",previous:{title:"Introduction",permalink:"/nx-shopify/docs/"},next:{title:"Creating a Theme",permalink:"/nx-shopify/docs/fundamentals/creating-a-theme"}},c=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Installing the plugin",id:"installing-the-plugin",children:[]}],p={toc:c};function s(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(i.b)("p",null,"You will need to have an Nx workspace created to make use of this tool"),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"Using Node 12+ and Nx 11+ is recommended"))),Object(i.b)("p",null,"Install the Nx CLI globally"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"# npm\n$ npm install --global nx\n\n# yarn\n$ yarn add --global nx\n\n# pnpm\n$ pnpm install --global nx\n")),Object(i.b)("p",null,"Create an empty Nx workspace (or use an existing one)"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"$ npx create-nx-workspace <org-name> --preset=empty\n$ cd ./<org-name>\n")),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"$ npx create-nx-workspace my-org --preset=empty\n$ cd ./my-org\n")),Object(i.b)("hr",null),Object(i.b)("h2",{id:"installing-the-plugin"},"Installing the plugin"),Object(i.b)("p",null,"While in your Nx workspace, install the Nx-Shopify plugin as a devDependency"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"# npm\n$ npm install --save-dev @trafilea/nx-shopify\n\n# yarn\n$ yarn add --save-dev @trafilea/nx-shopify\n\n# pnpm\n$ pnpm install --save-dev @trafilea/nx-shopify\n")),Object(i.b)("p",null,"Check the plugin was successfully installed by using the ",Object(i.b)("inlineCode",{parentName:"p"},"nx list")," command:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"$ nx list @trafilea/nx-shopify\n\n>  NX  Capabilities in @trafilea/nx-shopify:\n\n  GENERATORS\n\n  init : Initialize plugin\n  theme : Generate a new Shopify theme\n  layout : Generate a theme layout\n  template : Generate a theme template\n  snippet : Generate a theme snippet\n  section : Generate a theme section\n\n  EXECUTORS/BUILDERS\n\n  build : Build a Shopify theme\n  serve : Serves a Shopify theme for local development\n  deploy : Deploy a Shopify theme to Shopify\n")),Object(i.b)("p",null,"Now you are ready to power-up your Shopify theme development experience!"))}s.isMDXComponent=!0},98:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return d}));var a=t(0),r=t.n(a);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=r.a.createContext({}),s=function(e){var n=r.a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=s(e.components);return r.a.createElement(p.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},b=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(t),b=a,d=u["".concat(o,".").concat(b)]||u[b]||m[b]||i;return t?r.a.createElement(d,l(l({ref:n},p),{},{components:t})):r.a.createElement(d,l({ref:n},p))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=b;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=t[p];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);