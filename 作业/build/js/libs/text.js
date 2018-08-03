define(["module"],function(e){"use strict";var l,o,a,s,u,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],t=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,i=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,c="undefined"!=typeof location&&location.href,f=c&&location.protocol&&location.protocol.replace(/\:/,""),p=c&&location.hostname,d=c&&(location.port||void 0),m={},v=e.config&&e.config()||{};return l={version:"2.0.12",strip:function(e){if(e){var n=(e=e.replace(t,"")).match(i);n&&(e=n[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:v.createXhr||function(){var e,n,t;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(n=0;n<3;n+=1){t=r[n];try{e=new ActiveXObject(t)}catch(e){}if(e){r=[t];break}}return e},parseName:function(e){var n,t,r,o=!1,i=e.indexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");return-1!==i&&(!a||1<i)?(n=e.substring(0,i),t=e.substring(i+1,e.length)):n=e,-1!==(i=(r=t||n).indexOf("!"))&&(o="strip"===r.substring(i+1),r=r.substring(0,i),t?t=r:n=r),{moduleName:n,ext:t,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,t,r){var o,i,a,s=l.xdRegExp.exec(e);return!s||(o=s[2],a=(i=(i=s[3]).split(":"))[1],i=i[0],!(o&&o!==n||i&&i.toLowerCase()!==t.toLowerCase()||(a||i)&&a!==r))},finishLoad:function(e,n,t,r){t=n?l.strip(t):t,v.isBuild&&(m[e]=t),r(t)},load:function(n,e,t,r){if(r&&r.isBuild&&!r.inlineText)t();else{v.isBuild=r&&r.isBuild;var o=l.parseName(n),i=o.moduleName+(o.ext?"."+o.ext:""),a=e.toUrl(i),s=v.useXhr||l.useXhr;0!==a.indexOf("empty:")?!c||s(a,f,p,d)?l.get(a,function(e){l.finishLoad(n,o.strip,e,t)},function(e){t.error&&t.error(e)}):e([i],function(e){l.finishLoad(o.moduleName+"."+o.ext,o.strip,e,t)}):t()}},write:function(e,n,t,r){if(m.hasOwnProperty(n)){var o=l.jsEscape(m[n]);t.asModule(e+"!"+n,"define(function () { return '"+o+"';});\n")}},writeFile:function(t,e,n,r,o){var i=l.parseName(e),a=i.ext?"."+i.ext:"",s=i.moduleName+a,u=n.toUrl(i.moduleName+a)+".js";l.load(s,n,function(e){var n=function(e){return r(u,e)};n.asModule=function(e,n){return r.asModule(e,u,n)},l.write(t,s,n,o)},o)}},"node"===v.env||!v.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(o=require.nodeRequire("fs"),l.get=function(e,n,t){try{var r=o.readFileSync(e,"utf8");0===r.indexOf("\ufeff")&&(r=r.substring(1)),n(r)}catch(e){t&&t(e)}}):"xhr"===v.env||!v.env&&l.createXhr()?l.get=function(r,o,i,e){var n,a=l.createXhr();if(a.open("GET",r,!0),e)for(n in e)e.hasOwnProperty(n)&&a.setRequestHeader(n.toLowerCase(),e[n]);v.onXhr&&v.onXhr(a,r),a.onreadystatechange=function(e){var n,t;4===a.readyState&&(399<(n=a.status||0)&&n<600?((t=new Error(r+" HTTP status: "+n)).xhr=a,i&&i(t)):o(a.responseText),v.onXhrComplete&&v.onXhrComplete(a,r))},a.send(null)}:"rhino"===v.env||!v.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?l.get=function(e,n){var t,r,o=new java.io.File(e),i=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),"utf-8")),s="";try{for(t=new java.lang.StringBuffer,(r=a.readLine())&&r.length()&&65279===r.charAt(0)&&(r=r.substring(1)),null!==r&&t.append(r);null!==(r=a.readLine());)t.append(i),t.append(r);s=String(t.toString())}finally{a.close()}n(s)}:("xpconnect"===v.env||!v.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(a=Components.classes,s=Components.interfaces,Components.utils.import("resource://gre/modules/FileUtils.jsm"),u="@mozilla.org/windows-registry-key;1"in a,l.get=function(e,n){var t,r,o,i={};u&&(e=e.replace(/\//g,"\\")),o=new FileUtils.File(e);try{(t=a["@mozilla.org/network/file-input-stream;1"].createInstance(s.nsIFileInputStream)).init(o,1,0,!1),(r=a["@mozilla.org/intl/converter-input-stream;1"].createInstance(s.nsIConverterInputStream)).init(t,"utf-8",t.available(),s.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),r.readString(t.available(),i),r.close(),t.close(),n(i.value)}catch(e){throw new Error((o&&o.path||"")+": "+e)}}),l});