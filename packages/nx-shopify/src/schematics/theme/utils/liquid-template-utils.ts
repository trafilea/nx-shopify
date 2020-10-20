export const getEntrypointsInjectionTemplate = () => `<% for (var item in htmlWebpackPlugin.files.js) { %>
    
    <% if (htmlWebpackPlugin.files.js[item].includes(htmlWebpackPlugin.options.templateBundle + ".")) {%> 
        <% var basename = htmlWebpackPlugin.files.js[item].split('/').reverse()[0]; %>
        <% var src = \`{{ '\${basename}' | asset_url }}\` %>
         <script src="<%= src %>" defer></script>
   <% }%>
<% } %>
<% for (var item in htmlWebpackPlugin.files.css) { %>
   
    <% if (htmlWebpackPlugin.files.css[item].includes(htmlWebpackPlugin.options.templateBundle + ".")) {%> 
        <% var basename = htmlWebpackPlugin.files.css[item].split('/').reverse()[0]; %>
        <% var src = \`{{ '\${basename}' | asset_url }}\` %>
        <link href="<%= src %>" mediaType="text/css" rel="stylesheet">
   <% }%>
<% } %>`;
