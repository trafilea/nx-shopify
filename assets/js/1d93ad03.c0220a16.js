(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{79:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(7),i=(n(0),n(98)),o={title:"Serve Command"},c={unversionedId:"cli-usage/executors/serve",id:"cli-usage/executors/serve",isDocsHomePage:!1,title:"Serve Command",description:"Serves a theme for local development. Creates a local assets server and proxies the theme preview using a BrowserSync instance.",source:"@site/docs/cli-usage/executors/serve.md",slug:"/cli-usage/executors/serve",permalink:"/nx-shopify/docs/cli-usage/executors/serve",editUrl:"https://github.com/trafilea/nx-shopify/edit/master/docs/docs/cli-usage/executors/serve.md",version:"current",sidebar:"docs",previous:{title:"Build Command",permalink:"/nx-shopify/docs/cli-usage/executors/build"},next:{title:"Test Command",permalink:"/nx-shopify/docs/cli-usage/executors/test"}},l=[{value:"Usage",id:"usage",children:[]},{value:"Configuration",id:"configuration",children:[]},{value:"Options",id:"options",children:[{value:"--buildTarget",id:"--buildtarget",children:[]},{value:"--analyze",id:"--analyze",children:[]},{value:"--themekitEnv",id:"--themekitenv",children:[]},{value:"--allowLive",id:"--allowlive",children:[]},{value:"--open",id:"--open",children:[]},{value:"--skipFirstDeploy",id:"--skipfirstdeploy",children:[]},{value:"--devServerIpAddress",id:"--devserveripaddress",children:[]},{value:"--proxyConfig",id:"--proxyconfig",children:[]}]}],s={toc:l};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Serves a theme for local development. Creates a local assets server and proxies the theme preview using a BrowserSync instance."),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"$ nx serve <theme-name> [options,...]\n")),Object(i.b)("h2",{id:"configuration"},"Configuration"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"serve")," command is configured as a project target in the ",Object(i.b)("inlineCode",{parentName:"p"},"workspace.json")," file at your workspace root. By default, the target configuration should look similar to this:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-json"},'{\n  "projects": {\n    "my-theme": {\n      "targets": {\n        "serve": {\n          "executor": "@trafilea/nx-shopify:serve",\n          "options": { "buildTarget": "my-theme:build" },\n          "configurations": {\n            "production": {\n              "buildTarget": "my-theme:build:production",\n              "themekitEnv": "production"\n            }\n          }\n        }\n      }\n    }\n  }\n}\n')),Object(i.b)("p",null,"The serve target comes with a default ",Object(i.b)("inlineCode",{parentName:"p"},"production")," configuration that can be executed with:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"nx serve <theme-name> --configuration=production\nnx serve <theme-name> --c=production # same\nnx serve <theme-name> --prod # same, only works for the 'production' named config\n")),Object(i.b)("p",null,"You can add additional configurations that define new options or override the ones defined in the default options object."),Object(i.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"Learn more about Nx targets configurations at the ",Object(i.b)("a",{parentName:"p",href:"https://nx.dev"},"Nx website")))),Object(i.b)("p",null,"You can also override/define options passing them as CLI arguments, these will take precedence over the ",Object(i.b)("inlineCode",{parentName:"p"},"workspace.json")," configurations."),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-bash"},"nx serve <theme-name> --prod --themekitEnv staging\n")),Object(i.b)("h2",{id:"options"},"Options"),Object(i.b)("h3",{id:"--buildtarget"},"--buildTarget"),Object(i.b)("p",null,"Type: ",Object(i.b)("inlineCode",{parentName:"p"},"string")),Object(i.b)("p",null,"Name of the target to be used in the theme build process."),Object(i.b)("h3",{id:"--analyze"},"--analyze"),Object(i.b)("p",null,"Type: ",Object(i.b)("inlineCode",{parentName:"p"},"boolean")),Object(i.b)("p",null,"Analyze the generated bundle and open webpack-bundle-analyzer in the browser"),Object(i.b)("h3",{id:"--themekitenv"},"--themekitEnv"),Object(i.b)("p",null,"Type: ",Object(i.b)("inlineCode",{parentName:"p"},"string")),Object(i.b)("p",null,"Name of the themekit config.yml environment to be used in the deployment (default: development)"),Object(i.b)("h3",{id:"--allowlive"},"--allowLive"),Object(i.b)("p",null,"Type: ",Object(i.b)("inlineCode",{parentName:"p"},"boolean")),Object(i.b)("p",null,"Enables making changes to the Shopify Live Theme"),Object(i.b)("h3",{id:"--open"},"--open"),Object(i.b)("p",null,"Type: ",Object(i.b)("inlineCode",{parentName:"p"},"boolean")),Object(i.b)("p",null,"Open theme preview in the broswer when the deployment is done."),Object(i.b)("h3",{id:"--skipfirstdeploy"},"--skipFirstDeploy"),Object(i.b)("p",null,"Type: ",Object(i.b)("inlineCode",{parentName:"p"},"boolean")),Object(i.b)("p",null,"Tell if the first deploy should be skipped."),Object(i.b)("h3",{id:"--devserveripaddress"},"--devServerIpAddress"),Object(i.b)("p",null,"Type: ",Object(i.b)("inlineCode",{parentName:"p"},"string")),Object(i.b)("p",null,'Set the local web server ip address. Valid values are: private (default), public, "interface name", "ip v4/6 address" (default: private)'),Object(i.b)("h3",{id:"--proxyconfig"},"--proxyConfig"),Object(i.b)("p",null,"Type: ",Object(i.b)("inlineCode",{parentName:"p"},"string")),Object(i.b)("p",null,"Path to the proxy configuration file to be used"))}p.isMDXComponent=!0},98:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),p=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},d=function(e){var t=p(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(n),u=r,m=d["".concat(o,".").concat(u)]||d[u]||b[u]||i;return n?a.a.createElement(m,c(c({ref:t},s),{},{components:n})):a.a.createElement(m,c({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);