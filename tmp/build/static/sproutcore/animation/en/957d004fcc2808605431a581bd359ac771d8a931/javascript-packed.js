/*
 * jQuery JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function(window,undefined){var document=window.document;
var jQuery=(function(){var jQuery=function(selector,context){return new jQuery.fn.init(selector,context)
},_jQuery=window.jQuery,_$=window.$,rootjQuery,quickExpr=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,isSimple=/^.[^:#\[\.,]*$/,rnotwhite=/\S/,rwhite=/\s/,trimLeft=/^\s+/,trimRight=/\s+$/,rnonword=/\W/,rdigit=/\d/,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,rvalidchars=/^[\],:{}\s]*$/,rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,rwebkit=/(webkit)[ \/]([\w.]+)/,ropera=/(opera)(?:.*version)?[ \/]([\w.]+)/,rmsie=/(msie) ([\w.]+)/,rmozilla=/(mozilla)(?:.*? rv:([\w.]+))?/,userAgent=navigator.userAgent,browserMatch,readyBound=false,readyList=[],DOMContentLoaded,toString=Object.prototype.toString,hasOwn=Object.prototype.hasOwnProperty,push=Array.prototype.push,slice=Array.prototype.slice,trim=String.prototype.trim,indexOf=Array.prototype.indexOf,class2type={};
jQuery.fn=jQuery.prototype={init:function(selector,context){var match,elem,ret,doc;
if(!selector){return this}if(selector.nodeType){this.context=this[0]=selector;this.length=1;
return this}if(selector==="body"&&!context&&document.body){this.context=document;
this[0]=document.body;this.selector="body";this.length=1;return this}if(typeof selector==="string"){match=quickExpr.exec(selector);
if(match&&(match[1]||!context)){if(match[1]){doc=(context?context.ownerDocument||context:document);
ret=rsingleTag.exec(selector);if(ret){if(jQuery.isPlainObject(context)){selector=[document.createElement(ret[1])];
jQuery.fn.attr.call(selector,context,true)}else{selector=[doc.createElement(ret[1])]
}}else{ret=jQuery.buildFragment([match[1]],[doc]);selector=(ret.cacheable?ret.fragment.cloneNode(true):ret.fragment).childNodes
}return jQuery.merge(this,selector)}else{elem=document.getElementById(match[2]);if(elem&&elem.parentNode){if(elem.id!==match[2]){return rootjQuery.find(selector)
}this.length=1;this[0]=elem}this.context=document;this.selector=selector;return this
}}else{if(!context&&!rnonword.test(selector)){this.selector=selector;this.context=document;
selector=document.getElementsByTagName(selector);return jQuery.merge(this,selector)
}else{if(!context||context.jquery){return(context||rootjQuery).find(selector)}else{return jQuery(context).find(selector)
}}}}else{if(jQuery.isFunction(selector)){return rootjQuery.ready(selector)}}if(selector.selector!==undefined){this.selector=selector.selector;
this.context=selector.context}return jQuery.makeArray(selector,this)},selector:"",jquery:"1.4.4",length:0,size:function(){return this.length
},toArray:function(){return slice.call(this,0)},get:function(num){return num==null?this.toArray():(num<0?this.slice(num)[0]:this[num])
},pushStack:function(elems,name,selector){var ret=jQuery();if(jQuery.isArray(elems)){push.apply(ret,elems)
}else{jQuery.merge(ret,elems)}ret.prevObject=this;ret.context=this.context;if(name==="find"){ret.selector=this.selector+(this.selector?" ":"")+selector
}else{if(name){ret.selector=this.selector+"."+name+"("+selector+")"}}return ret},each:function(callback,args){return jQuery.each(this,callback,args)
},ready:function(fn){jQuery.bindReady();if(jQuery.isReady){fn.call(document,jQuery)
}else{if(readyList){readyList.push(fn)}}return this},eq:function(i){return i===-1?this.slice(i):this.slice(i,+i+1)
},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(slice.apply(this,arguments),"slice",slice.call(arguments).join(","))
},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)
}))},end:function(){return this.prevObject||jQuery(null)},push:push,sort:[].sort,splice:[].splice};
jQuery.fn.init.prototype=jQuery.fn;jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;
if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2}if(typeof target!=="object"&&!jQuery.isFunction(target)){target={}
}if(length===i){target=this;--i}for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];
copy=options[name];if(target===copy){continue}if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;
clone=src&&jQuery.isArray(src)?src:[]}else{clone=src&&jQuery.isPlainObject(src)?src:{}
}target[name]=jQuery.extend(deep,clone,copy)}else{if(copy!==undefined){target[name]=copy
}}}}}return target};jQuery.extend({noConflict:function(deep){window.$=_$;if(deep){window.jQuery=_jQuery
}return jQuery},isReady:false,readyWait:1,ready:function(wait){if(wait===true){jQuery.readyWait--
}if(!jQuery.readyWait||(wait!==true&&!jQuery.isReady)){if(!document.body){return setTimeout(jQuery.ready,1)
}jQuery.isReady=true;if(wait!==true&&--jQuery.readyWait>0){return}if(readyList){var fn,i=0,ready=readyList;
readyList=null;while((fn=ready[i++])){fn.call(document,jQuery)}if(jQuery.fn.trigger){jQuery(document).trigger("ready").unbind("ready")
}}}},bindReady:function(){if(readyBound){return}readyBound=true;if(document.readyState==="complete"){return setTimeout(jQuery.ready,1)
}if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);
window.addEventListener("load",jQuery.ready,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",DOMContentLoaded);
window.attachEvent("onload",jQuery.ready);var toplevel=false;try{toplevel=window.frameElement==null
}catch(e){}if(document.documentElement.doScroll&&toplevel){doScrollCheck()}}}},isFunction:function(obj){return jQuery.type(obj)==="function"
},isArray:Array.isArray||function(obj){return jQuery.type(obj)==="array"},isWindow:function(obj){return obj&&typeof obj==="object"&&"setInterval" in obj
},isNaN:function(obj){return obj==null||!rdigit.test(obj)||isNaN(obj)},type:function(obj){return obj==null?String(obj):class2type[toString.call(obj)]||"object"
},isPlainObject:function(obj){if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false
}if(obj.constructor&&!hasOwn.call(obj,"constructor")&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false
}var key;for(key in obj){}return key===undefined||hasOwn.call(obj,key)},isEmptyObject:function(obj){for(var name in obj){return false
}return true},error:function(msg){throw msg},parseJSON:function(data){if(typeof data!=="string"||!data){return null
}data=jQuery.trim(data);if(rvalidchars.test(data.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return window.JSON&&window.JSON.parse?window.JSON.parse(data):(new Function("return "+data))()
}else{jQuery.error("Invalid JSON: "+data)}},noop:function(){},globalEval:function(data){if(data&&rnotwhite.test(data)){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");
script.type="text/javascript";if(jQuery.support.scriptEval){script.appendChild(document.createTextNode(data))
}else{script.text=data}head.insertBefore(script,head.firstChild);head.removeChild(script)
}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()===name.toUpperCase()
},each:function(object,callback,args){var name,i=0,length=object.length,isObj=length===undefined||jQuery.isFunction(object);
if(args){if(isObj){for(name in object){if(callback.apply(object[name],args)===false){break
}}}else{for(;i<length;){if(callback.apply(object[i++],args)===false){break}}}}else{if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break
}}}else{for(var value=object[0];i<length&&callback.call(value,i,value)!==false;value=object[++i]){}}}return object
},trim:trim?function(text){return text==null?"":trim.call(text)}:function(text){return text==null?"":text.toString().replace(trimLeft,"").replace(trimRight,"")
},makeArray:function(array,results){var ret=results||[];if(array!=null){var type=jQuery.type(array);
if(array.length==null||type==="string"||type==="function"||type==="regexp"||jQuery.isWindow(array)){push.call(ret,array)
}else{jQuery.merge(ret,array)}}return ret},inArray:function(elem,array){if(array.indexOf){return array.indexOf(elem)
}for(var i=0,length=array.length;i<length;i++){if(array[i]===elem){return i}}return -1
},merge:function(first,second){var i=first.length,j=0;if(typeof second.length==="number"){for(var l=second.length;
j<l;j++){first[i++]=second[j]}}else{while(second[j]!==undefined){first[i++]=second[j++]
}}first.length=i;return first},grep:function(elems,callback,inv){var ret=[],retVal;
inv=!!inv;for(var i=0,length=elems.length;i<length;i++){retVal=!!callback(elems[i],i);
if(inv!==retVal){ret.push(elems[i])}}return ret},map:function(elems,callback,arg){var ret=[],value;
for(var i=0,length=elems.length;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret[ret.length]=value
}}return ret.concat.apply([],ret)},guid:1,proxy:function(fn,proxy,thisObject){if(arguments.length===2){if(typeof proxy==="string"){thisObject=fn;
fn=thisObject[proxy];proxy=undefined}else{if(proxy&&!jQuery.isFunction(proxy)){thisObject=proxy;
proxy=undefined}}}if(!proxy&&fn){proxy=function(){return fn.apply(thisObject||this,arguments)
}}if(fn){proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++}return proxy},access:function(elems,key,value,exec,fn,pass){var length=elems.length;
if(typeof key==="object"){for(var k in key){jQuery.access(elems,k,key[k],exec,fn,value)
}return elems}if(value!==undefined){exec=!pass&&exec&&jQuery.isFunction(value);for(var i=0;
i<length;i++){fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass)
}return elems}return length?fn(elems[0],key):undefined},now:function(){return(new Date()).getTime()
},uaMatch:function(ua){ua=ua.toLowerCase();var match=rwebkit.exec(ua)||ropera.exec(ua)||rmsie.exec(ua)||ua.indexOf("compatible")<0&&rmozilla.exec(ua)||[];
return{browser:match[1]||"",version:match[2]||"0"}},browser:{}});jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase()
});browserMatch=jQuery.uaMatch(userAgent);if(browserMatch.browser){jQuery.browser[browserMatch.browser]=true;
jQuery.browser.version=browserMatch.version}if(jQuery.browser.webkit){jQuery.browser.safari=true
}if(indexOf){jQuery.inArray=function(elem,array){return indexOf.call(array,elem)}
}if(!rwhite.test("\xA0")){trimLeft=/^[\s\xA0]+/;trimRight=/[\s\xA0]+$/}rootjQuery=jQuery(document);
if(document.addEventListener){DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);
jQuery.ready()}}else{if(document.attachEvent){DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);
jQuery.ready()}}}}function doScrollCheck(){if(jQuery.isReady){return}try{document.documentElement.doScroll("left")
}catch(e){setTimeout(doScrollCheck,1);return}jQuery.ready()}return(window.jQuery=window.$=jQuery)
})();(function(){jQuery.support={};var root=document.documentElement,script=document.createElement("script"),div=document.createElement("div"),id="script"+jQuery.now();
div.style.display="none";div.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var all=div.getElementsByTagName("*"),a=div.getElementsByTagName("a")[0],select=document.createElement("select"),opt=select.appendChild(document.createElement("option"));
if(!all||!all.length||!a){return}jQuery.support={leadingWhitespace:div.firstChild.nodeType===3,tbody:!div.getElementsByTagName("tbody").length,htmlSerialize:!!div.getElementsByTagName("link").length,style:/red/.test(a.getAttribute("style")),hrefNormalized:a.getAttribute("href")==="/a",opacity:/^0.55$/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,checkOn:div.getElementsByTagName("input")[0].value==="on",optSelected:opt.selected,deleteExpando:true,optDisabled:false,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableHiddenOffsets:true};
select.disabled=true;jQuery.support.optDisabled=!opt.disabled;script.type="text/javascript";
try{script.appendChild(document.createTextNode("window."+id+"=1;"))}catch(e){}root.insertBefore(script,root.firstChild);
if(window[id]){jQuery.support.scriptEval=true;delete window[id]}try{delete script.test
}catch(e){jQuery.support.deleteExpando=false}root.removeChild(script);if(div.attachEvent&&div.fireEvent){div.attachEvent("onclick",function click(){jQuery.support.noCloneEvent=false;
div.detachEvent("onclick",click)});div.cloneNode(true).fireEvent("onclick")}div=document.createElement("div");
div.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";var fragment=document.createDocumentFragment();
fragment.appendChild(div.firstChild);jQuery.support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;
jQuery(function(){var div=document.createElement("div");div.style.width=div.style.paddingLeft="1px";
document.body.appendChild(div);jQuery.boxModel=jQuery.support.boxModel=div.offsetWidth===2;
if("zoom" in div.style){div.style.display="inline";div.style.zoom=1;jQuery.support.inlineBlockNeedsLayout=div.offsetWidth===2;
div.style.display="";div.innerHTML="<div style='width:4px;'></div>";jQuery.support.shrinkWrapBlocks=div.offsetWidth!==2
}div.innerHTML="<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
var tds=div.getElementsByTagName("td");jQuery.support.reliableHiddenOffsets=tds[0].offsetHeight===0;
tds[0].style.display="";tds[1].style.display="none";jQuery.support.reliableHiddenOffsets=jQuery.support.reliableHiddenOffsets&&tds[0].offsetHeight===0;
div.innerHTML="";document.body.removeChild(div).style.display="none";div=tds=null
});var eventSupported=function(eventName){var el=document.createElement("div");eventName="on"+eventName;
var isSupported=(eventName in el);if(!isSupported){el.setAttribute(eventName,"return;");
isSupported=typeof el[eventName]==="function"}el=null;return isSupported};jQuery.support.submitBubbles=eventSupported("submit");
jQuery.support.changeBubbles=eventSupported("change");root=script=div=all=a=null})();
var windowData={},rbrace=/^(?:\{.*\}|\[.*\])$/;jQuery.extend({cache:{},uuid:0,expando:"jQuery"+jQuery.now(),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},data:function(elem,name,data){if(!jQuery.acceptData(elem)){return
}elem=elem==window?windowData:elem;var isNode=elem.nodeType,id=isNode?elem[jQuery.expando]:null,cache=jQuery.cache,thisCache;
if(isNode&&!id&&typeof name==="string"&&data===undefined){return}if(!isNode){cache=elem
}else{if(!id){elem[jQuery.expando]=id=++jQuery.uuid}}if(typeof name==="object"){if(isNode){cache[id]=jQuery.extend(cache[id],name)
}else{jQuery.extend(cache,name)}}else{if(isNode&&!cache[id]){cache[id]={}}}thisCache=isNode?cache[id]:cache;
if(data!==undefined){thisCache[name]=data}return typeof name==="string"?thisCache[name]:thisCache
},removeData:function(elem,name){if(!jQuery.acceptData(elem)){return}elem=elem==window?windowData:elem;
var isNode=elem.nodeType,id=isNode?elem[jQuery.expando]:elem,cache=jQuery.cache,thisCache=isNode?cache[id]:id;
if(name){if(thisCache){delete thisCache[name];if(isNode&&jQuery.isEmptyObject(thisCache)){jQuery.removeData(elem)
}}}else{if(isNode&&jQuery.support.deleteExpando){delete elem[jQuery.expando]}else{if(elem.removeAttribute){elem.removeAttribute(jQuery.expando)
}else{if(isNode){delete cache[id]}else{for(var n in elem){delete elem[n]}}}}}},acceptData:function(elem){if(elem.nodeName){var match=jQuery.noData[elem.nodeName.toLowerCase()];
if(match){return !(match===true||elem.getAttribute("classid")!==match)}}return true
}});jQuery.fn.extend({data:function(key,value){var data=null;if(typeof key==="undefined"){if(this.length){var attr=this[0].attributes,name;
data=jQuery.data(this[0]);for(var i=0,l=attr.length;i<l;i++){name=attr[i].name;if(name.indexOf("data-")===0){name=name.substr(5);
dataAttr(this[0],name,data[name])}}}return data}else{if(typeof key==="object"){return this.each(function(){jQuery.data(this,key)
})}}var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);
if(data===undefined&&this.length){data=jQuery.data(this[0],key);data=dataAttr(this[0],key,data)
}return data===undefined&&parts[1]?this.data(parts[0]):data}else{return this.each(function(){var $this=jQuery(this),args=[parts[0],value];
$this.triggerHandler("setData"+parts[1]+"!",args);jQuery.data(this,key,value);$this.triggerHandler("changeData"+parts[1]+"!",args)
})}},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)
})}});function dataAttr(elem,key,data){if(data===undefined&&elem.nodeType===1){data=elem.getAttribute("data-"+key);
if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null:!jQuery.isNaN(data)?parseFloat(data):rbrace.test(data)?jQuery.parseJSON(data):data
}catch(e){}jQuery.data(elem,key,data)}else{data=undefined}}return data}jQuery.extend({queue:function(elem,type,data){if(!elem){return
}type=(type||"fx")+"queue";var q=jQuery.data(elem,type);if(!data){return q||[]}if(!q||jQuery.isArray(data)){q=jQuery.data(elem,type,jQuery.makeArray(data))
}else{q.push(data)}return q},dequeue:function(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),fn=queue.shift();
if(fn==="inprogress"){fn=queue.shift()}if(fn){if(type==="fx"){queue.unshift("inprogress")
}fn.call(elem,function(){jQuery.dequeue(elem,type)})}}});jQuery.fn.extend({queue:function(type,data){if(typeof type!=="string"){data=type;
type="fx"}if(data===undefined){return jQuery.queue(this[0],type)}return this.each(function(i){var queue=jQuery.queue(this,type,data);
if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type)}})},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type)
})},delay:function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";
return this.queue(type,function(){var elem=this;setTimeout(function(){jQuery.dequeue(elem,type)
},time)})},clearQueue:function(type){return this.queue(type||"fx",[])}});var rclass=/[\n\t]/g,rspaces=/\s+/,rreturn=/\r/g,rspecialurl=/^(?:href|src|style)$/,rtype=/^(?:button|input)$/i,rfocusable=/^(?:button|input|object|select|textarea)$/i,rclickable=/^a(?:rea)?$/i,rradiocheck=/^(?:radio|checkbox)$/i;
jQuery.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};
jQuery.fn.extend({attr:function(name,value){return jQuery.access(this,name,value,true,jQuery.attr)
},removeAttr:function(name,fn){return this.each(function(){jQuery.attr(this,name,"");
if(this.nodeType===1){this.removeAttribute(name)}})},addClass:function(value){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);
self.addClass(value.call(this,i,self.attr("class")))})}if(value&&typeof value==="string"){var classNames=(value||"").split(rspaces);
for(var i=0,l=this.length;i<l;i++){var elem=this[i];if(elem.nodeType===1){if(!elem.className){elem.className=value
}else{var className=" "+elem.className+" ",setClass=elem.className;for(var c=0,cl=classNames.length;
c<cl;c++){if(className.indexOf(" "+classNames[c]+" ")<0){setClass+=" "+classNames[c]
}}elem.className=jQuery.trim(setClass)}}}}return this},removeClass:function(value){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);
self.removeClass(value.call(this,i,self.attr("class")))})}if((value&&typeof value==="string")||value===undefined){var classNames=(value||"").split(rspaces);
for(var i=0,l=this.length;i<l;i++){var elem=this[i];if(elem.nodeType===1&&elem.className){if(value){var className=(" "+elem.className+" ").replace(rclass," ");
for(var c=0,cl=classNames.length;c<cl;c++){className=className.replace(" "+classNames[c]+" "," ")
}elem.className=jQuery.trim(className)}else{elem.className=""}}}}return this},toggleClass:function(value,stateVal){var type=typeof value,isBool=typeof stateVal==="boolean";
if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);self.toggleClass(value.call(this,i,self.attr("class"),stateVal),stateVal)
})}return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),state=stateVal,classNames=value.split(rspaces);
while((className=classNames[i++])){state=isBool?state:!self.hasClass(className);self[state?"addClass":"removeClass"](className)
}}else{if(type==="undefined"||type==="boolean"){if(this.className){jQuery.data(this,"__className__",this.className)
}this.className=this.className||value===false?"":jQuery.data(this,"__className__")||""
}}})},hasClass:function(selector){var className=" "+selector+" ";for(var i=0,l=this.length;
i<l;i++){if((" "+this[i].className+" ").replace(rclass," ").indexOf(className)>-1){return true
}}return false},val:function(value){if(!arguments.length){var elem=this[0];if(elem){if(jQuery.nodeName(elem,"option")){var val=elem.attributes.value;
return !val||val.specified?elem.value:elem.text}if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type==="select-one";
if(index<0){return null}for(var i=one?index:0,max=one?index+1:options.length;i<max;
i++){var option=options[i];if(option.selected&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){value=jQuery(option).val();
if(one){return value}values.push(value)}}return values}if(rradiocheck.test(elem.type)&&!jQuery.support.checkOn){return elem.getAttribute("value")===null?"on":elem.value
}return(elem.value||"").replace(rreturn,"")}return undefined}var isFunction=jQuery.isFunction(value);
return this.each(function(i){var self=jQuery(this),val=value;if(this.nodeType!==1){return
}if(isFunction){val=value.call(this,i,self.val())}if(val==null){val=""}else{if(typeof val==="number"){val+=""
}else{if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+""
})}}}if(jQuery.isArray(val)&&rradiocheck.test(this.type)){this.checked=jQuery.inArray(self.val(),val)>=0
}else{if(jQuery.nodeName(this,"select")){var values=jQuery.makeArray(val);jQuery("option",this).each(function(){this.selected=jQuery.inArray(jQuery(this).val(),values)>=0
});if(!values.length){this.selectedIndex=-1}}else{this.value=val}}})}});jQuery.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(elem,name,value,pass){if(!elem||elem.nodeType===3||elem.nodeType===8){return undefined
}if(pass&&name in jQuery.attrFn){return jQuery(elem)[name](value)}var notxml=elem.nodeType!==1||!jQuery.isXMLDoc(elem),set=value!==undefined;
name=notxml&&jQuery.props[name]||name;var special=rspecialurl.test(name);if(name==="selected"&&!jQuery.support.optSelected){var parent=elem.parentNode;
if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex
}}}if((name in elem||elem[name]!==undefined)&&notxml&&!special){if(set){if(name==="type"&&rtype.test(elem.nodeName)&&elem.parentNode){jQuery.error("type property can't be changed")
}if(value===null){if(elem.nodeType===1){elem.removeAttribute(name)}}else{elem[name]=value
}}if(jQuery.nodeName(elem,"form")&&elem.getAttributeNode(name)){return elem.getAttributeNode(name).nodeValue
}if(name==="tabIndex"){var attributeNode=elem.getAttributeNode("tabIndex");return attributeNode&&attributeNode.specified?attributeNode.value:rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:undefined
}return elem[name]}if(!jQuery.support.style&&notxml&&name==="style"){if(set){elem.style.cssText=""+value
}return elem.style.cssText}if(set){elem.setAttribute(name,""+value)}if(!elem.attributes[name]&&(elem.hasAttribute&&!elem.hasAttribute(name))){return undefined
}var attr=!jQuery.support.hrefNormalized&&notxml&&special?elem.getAttribute(name,2):elem.getAttribute(name);
return attr===null?undefined:attr}});var rnamespaces=/\.(.*)$/,rformElems=/^(?:textarea|input|select)$/i,rperiod=/\./g,rspace=/ /g,rescape=/[^\w\s.|`]/g,fcleanup=function(nm){return nm.replace(rescape,"\\$&")
},focusCounts={focusin:0,focusout:0};jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType===3||elem.nodeType===8){return
}if(jQuery.isWindow(elem)&&(elem!==window&&!elem.frameElement)){elem=window}if(handler===false){handler=returnFalse
}else{if(!handler){return}}var handleObjIn,handleObj;if(handler.handler){handleObjIn=handler;
handler=handleObjIn.handler}if(!handler.guid){handler.guid=jQuery.guid++}var elemData=jQuery.data(elem);
if(!elemData){return}var eventKey=elem.nodeType?"events":"__events__",events=elemData[eventKey],eventHandle=elemData.handle;
if(typeof events==="function"){eventHandle=events.handle;events=events.events}else{if(!events){if(!elem.nodeType){elemData[eventKey]=elemData=function(){}
}elemData.events=events={}}}if(!eventHandle){elemData.handle=eventHandle=function(){return typeof jQuery!=="undefined"&&!jQuery.event.triggered?jQuery.event.handle.apply(eventHandle.elem,arguments):undefined
}}eventHandle.elem=elem;types=types.split(" ");var type,i=0,namespaces;while((type=types[i++])){handleObj=handleObjIn?jQuery.extend({},handleObjIn):{handler:handler,data:data};
if(type.indexOf(".")>-1){namespaces=type.split(".");type=namespaces.shift();handleObj.namespace=namespaces.slice(0).sort().join(".")
}else{namespaces=[];handleObj.namespace=""}handleObj.type=type;if(!handleObj.guid){handleObj.guid=handler.guid
}var handlers=events[type],special=jQuery.event.special[type]||{};if(!handlers){handlers=events[type]=[];
if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false)
}else{if(elem.attachEvent){elem.attachEvent("on"+type,eventHandle)}}}}if(special.add){special.add.call(elem,handleObj);
if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid}}handlers.push(handleObj);
jQuery.event.global[type]=true}elem=null},global:{},remove:function(elem,types,handler,pos){if(elem.nodeType===3||elem.nodeType===8){return
}if(handler===false){handler=returnFalse}var ret,type,fn,j,i=0,all,namespaces,namespace,special,eventType,handleObj,origType,eventKey=elem.nodeType?"events":"__events__",elemData=jQuery.data(elem),events=elemData&&elemData[eventKey];
if(!elemData||!events){return}if(typeof events==="function"){elemData=events;events=events.events
}if(types&&types.type){handler=types.handler;types=types.type}if(!types||typeof types==="string"&&types.charAt(0)==="."){types=types||"";
for(type in events){jQuery.event.remove(elem,type+types)}return}types=types.split(" ");
while((type=types[i++])){origType=type;handleObj=null;all=type.indexOf(".")<0;namespaces=[];
if(!all){namespaces=type.split(".");type=namespaces.shift();namespace=new RegExp("(^|\\.)"+jQuery.map(namespaces.slice(0).sort(),fcleanup).join("\\.(?:.*\\.)?")+"(\\.|$)")
}eventType=events[type];if(!eventType){continue}if(!handler){for(j=0;j<eventType.length;
j++){handleObj=eventType[j];if(all||namespace.test(handleObj.namespace)){jQuery.event.remove(elem,origType,handleObj.handler,j);
eventType.splice(j--,1)}}continue}special=jQuery.event.special[type]||{};for(j=pos||0;
j<eventType.length;j++){handleObj=eventType[j];if(handler.guid===handleObj.guid){if(all||namespace.test(handleObj.namespace)){if(pos==null){eventType.splice(j--,1)
}if(special.remove){special.remove.call(elem,handleObj)}}if(pos!=null){break}}}if(eventType.length===0||pos!=null&&eventType.length===1){if(!special.teardown||special.teardown.call(elem,namespaces)===false){jQuery.removeEvent(elem,type,elemData.handle)
}ret=null;delete events[type]}}if(jQuery.isEmptyObject(events)){var handle=elemData.handle;
if(handle){handle.elem=null}delete elemData.events;delete elemData.handle;if(typeof elemData==="function"){jQuery.removeData(elem,eventKey)
}else{if(jQuery.isEmptyObject(elemData)){jQuery.removeData(elem)}}}},trigger:function(event,data,elem){var type=event.type||event,bubbling=arguments[3];
if(!bubbling){event=typeof event==="object"?event[jQuery.expando]?event:jQuery.extend(jQuery.Event(type),event):jQuery.Event(type);
if(type.indexOf("!")>=0){event.type=type=type.slice(0,-1);event.exclusive=true}if(!elem){event.stopPropagation();
if(jQuery.event.global[type]){jQuery.each(jQuery.cache,function(){if(this.events&&this.events[type]){jQuery.event.trigger(event,data,this.handle.elem)
}})}}if(!elem||elem.nodeType===3||elem.nodeType===8){return undefined}event.result=undefined;
event.target=elem;data=jQuery.makeArray(data);data.unshift(event)}event.currentTarget=elem;
var handle=elem.nodeType?jQuery.data(elem,"handle"):(jQuery.data(elem,"__events__")||{}).handle;
if(handle){handle.apply(elem,data)}var parent=elem.parentNode||elem.ownerDocument;
try{if(!(elem&&elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()])){if(elem["on"+type]&&elem["on"+type].apply(elem,data)===false){event.result=false;
event.preventDefault()}}}catch(inlineError){}if(!event.isPropagationStopped()&&parent){jQuery.event.trigger(event,data,parent,true)
}else{if(!event.isDefaultPrevented()){var old,target=event.target,targetType=type.replace(rnamespaces,""),isClick=jQuery.nodeName(target,"a")&&targetType==="click",special=jQuery.event.special[targetType]||{};
if((!special._default||special._default.call(elem,event)===false)&&!isClick&&!(target&&target.nodeName&&jQuery.noData[target.nodeName.toLowerCase()])){try{if(target[targetType]){old=target["on"+targetType];
if(old){target["on"+targetType]=null}jQuery.event.triggered=true;target[targetType]()
}}catch(triggerError){}if(old){target["on"+targetType]=old}jQuery.event.triggered=false
}}}},handle:function(event){var all,handlers,namespaces,namespace_re,events,namespace_sort=[],args=jQuery.makeArray(arguments);
event=args[0]=jQuery.event.fix(event||window.event);event.currentTarget=this;all=event.type.indexOf(".")<0&&!event.exclusive;
if(!all){namespaces=event.type.split(".");event.type=namespaces.shift();namespace_sort=namespaces.slice(0).sort();
namespace_re=new RegExp("(^|\\.)"+namespace_sort.join("\\.(?:.*\\.)?")+"(\\.|$)")
}event.namespace=event.namespace||namespace_sort.join(".");events=jQuery.data(this,this.nodeType?"events":"__events__");
if(typeof events==="function"){events=events.events}handlers=(events||{})[event.type];
if(events&&handlers){handlers=handlers.slice(0);for(var j=0,l=handlers.length;j<l;
j++){var handleObj=handlers[j];if(all||namespace_re.test(handleObj.namespace)){event.handler=handleObj.handler;
event.data=handleObj.data;event.handleObj=handleObj;var ret=handleObj.handler.apply(this,args);
if(ret!==undefined){event.result=ret;if(ret===false){event.preventDefault();event.stopPropagation()
}}if(event.isImmediatePropagationStopped()){break}}}}return event.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(event){if(event[jQuery.expando]){return event
}var originalEvent=event;event=jQuery.Event(originalEvent);for(var i=this.props.length,prop;
i;){prop=this.props[--i];event[prop]=originalEvent[prop]}if(!event.target){event.target=event.srcElement||document
}if(event.target.nodeType===3){event.target=event.target.parentNode}if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement===event.target?event.toElement:event.fromElement
}if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;
event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);
event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)
}if(event.which==null&&(event.charCode!=null||event.keyCode!=null)){event.which=event.charCode!=null?event.charCode:event.keyCode
}if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey}if(!event.which&&event.button!==undefined){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)))
}return event},guid:100000000,proxy:jQuery.proxy,special:{ready:{setup:jQuery.bindReady,teardown:jQuery.noop},live:{add:function(handleObj){jQuery.event.add(this,liveConvert(handleObj.origType,handleObj.selector),jQuery.extend({},handleObj,{handler:liveHandler,guid:handleObj.handler.guid}))
},remove:function(handleObj){jQuery.event.remove(this,liveConvert(handleObj.origType,handleObj.selector),handleObj)
}},beforeunload:{setup:function(data,namespaces,eventHandle){if(jQuery.isWindow(this)){this.onbeforeunload=eventHandle
}},teardown:function(namespaces,eventHandle){if(this.onbeforeunload===eventHandle){this.onbeforeunload=null
}}}}};jQuery.removeEvent=document.removeEventListener?function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false)
}}:function(elem,type,handle){if(elem.detachEvent){elem.detachEvent("on"+type,handle)
}};jQuery.Event=function(src){if(!this.preventDefault){return new jQuery.Event(src)
}if(src&&src.type){this.originalEvent=src;this.type=src.type}else{this.type=src}this.timeStamp=jQuery.now();
this[jQuery.expando]=true};function returnFalse(){return false}function returnTrue(){return true
}jQuery.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;
var e=this.originalEvent;if(!e){return}if(e.preventDefault){e.preventDefault()}else{e.returnValue=false
}},stopPropagation:function(){this.isPropagationStopped=returnTrue;var e=this.originalEvent;
if(!e){return}if(e.stopPropagation){e.stopPropagation()}e.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;
this.stopPropagation()},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};
var withinElement=function(event){var parent=event.relatedTarget;try{while(parent&&parent!==this){parent=parent.parentNode
}if(parent!==this){event.type=event.data;jQuery.event.handle.apply(this,arguments)
}}catch(e){}},delegate=function(event){event.type=event.data;jQuery.event.handle.apply(this,arguments)
};jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]={setup:function(data){jQuery.event.add(this,fix,data&&data.selector?delegate:withinElement,orig)
},teardown:function(data){jQuery.event.remove(this,fix,data&&data.selector?delegate:withinElement)
}}});if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function(data,namespaces){if(this.nodeName.toLowerCase()!=="form"){jQuery.event.add(this,"click.specialSubmit",function(e){var elem=e.target,type=elem.type;
if((type==="submit"||type==="image")&&jQuery(elem).closest("form").length){e.liveFired=undefined;
return trigger("submit",this,arguments)}});jQuery.event.add(this,"keypress.specialSubmit",function(e){var elem=e.target,type=elem.type;
if((type==="text"||type==="password")&&jQuery(elem).closest("form").length&&e.keyCode===13){e.liveFired=undefined;
return trigger("submit",this,arguments)}})}else{return false}},teardown:function(namespaces){jQuery.event.remove(this,".specialSubmit")
}}}if(!jQuery.support.changeBubbles){var changeFilters,getVal=function(elem){var type=elem.type,val=elem.value;
if(type==="radio"||type==="checkbox"){val=elem.checked}else{if(type==="select-multiple"){val=elem.selectedIndex>-1?jQuery.map(elem.options,function(elem){return elem.selected
}).join("-"):""}else{if(elem.nodeName.toLowerCase()==="select"){val=elem.selectedIndex
}}}return val},testChange=function testChange(e){var elem=e.target,data,val;if(!rformElems.test(elem.nodeName)||elem.readOnly){return
}data=jQuery.data(elem,"_change_data");val=getVal(elem);if(e.type!=="focusout"||elem.type!=="radio"){jQuery.data(elem,"_change_data",val)
}if(data===undefined||val===data){return}if(data!=null||val){e.type="change";e.liveFired=undefined;
return jQuery.event.trigger(e,arguments[1],elem)}};jQuery.event.special.change={filters:{focusout:testChange,beforedeactivate:testChange,click:function(e){var elem=e.target,type=elem.type;
if(type==="radio"||type==="checkbox"||elem.nodeName.toLowerCase()==="select"){return testChange.call(this,e)
}},keydown:function(e){var elem=e.target,type=elem.type;if((e.keyCode===13&&elem.nodeName.toLowerCase()!=="textarea")||(e.keyCode===32&&(type==="checkbox"||type==="radio"))||type==="select-multiple"){return testChange.call(this,e)
}},beforeactivate:function(e){var elem=e.target;jQuery.data(elem,"_change_data",getVal(elem))
}},setup:function(data,namespaces){if(this.type==="file"){return false}for(var type in changeFilters){jQuery.event.add(this,type+".specialChange",changeFilters[type])
}return rformElems.test(this.nodeName)},teardown:function(namespaces){jQuery.event.remove(this,".specialChange");
return rformElems.test(this.nodeName)}};changeFilters=jQuery.event.special.change.filters;
changeFilters.focus=changeFilters.beforeactivate}function trigger(type,elem,args){args[0].type=type;
return jQuery.event.handle.apply(elem,args)}if(document.addEventListener){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){jQuery.event.special[fix]={setup:function(){if(focusCounts[fix]++===0){document.addEventListener(orig,handler,true)
}},teardown:function(){if(--focusCounts[fix]===0){document.removeEventListener(orig,handler,true)
}}};function handler(e){e=jQuery.event.fix(e);e.type=fix;return jQuery.event.trigger(e,null,e.target)
}})}jQuery.each(["bind","one"],function(i,name){jQuery.fn[name]=function(type,data,fn){if(typeof type==="object"){for(var key in type){this[name](key,data,type[key],fn)
}return this}if(jQuery.isFunction(data)||data===false){fn=data;data=undefined}var handler=name==="one"?jQuery.proxy(fn,function(event){jQuery(this).unbind(event,handler);
return fn.apply(this,arguments)}):fn;if(type==="unload"&&name!=="one"){this.one(type,data,fn)
}else{for(var i=0,l=this.length;i<l;i++){jQuery.event.add(this[i],type,handler,data)
}}return this}});jQuery.fn.extend({unbind:function(type,fn){if(typeof type==="object"&&!type.preventDefault){for(var key in type){this.unbind(key,type[key])
}}else{for(var i=0,l=this.length;i<l;i++){jQuery.event.remove(this[i],type,fn)}}return this
},delegate:function(selector,types,data,fn){return this.live(types,data,fn,selector)
},undelegate:function(selector,types,fn){if(arguments.length===0){return this.unbind("live")
}else{return this.die(types,null,fn,selector)}},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this)
})},triggerHandler:function(type,data){if(this[0]){var event=jQuery.Event(type);event.preventDefault();
event.stopPropagation();jQuery.event.trigger(event,data,this[0]);return event.result
}},toggle:function(fn){var args=arguments,i=1;while(i<args.length){jQuery.proxy(fn,args[i++])
}return this.click(jQuery.proxy(fn,function(event){var lastToggle=(jQuery.data(this,"lastToggle"+fn.guid)||0)%i;
jQuery.data(this,"lastToggle"+fn.guid,lastToggle+1);event.preventDefault();return args[lastToggle].apply(this,arguments)||false
}))},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver)
}});var liveMap={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};
jQuery.each(["live","die"],function(i,name){jQuery.fn[name]=function(types,data,fn,origSelector){var type,i=0,match,namespaces,preType,selector=origSelector||this.selector,context=origSelector?this:jQuery(this.context);
if(typeof types==="object"&&!types.preventDefault){for(var key in types){context[name](key,data,types[key],selector)
}return this}if(jQuery.isFunction(data)){fn=data;data=undefined}types=(types||"").split(" ");
while((type=types[i++])!=null){match=rnamespaces.exec(type);namespaces="";if(match){namespaces=match[0];
type=type.replace(rnamespaces,"")}if(type==="hover"){types.push("mouseenter"+namespaces,"mouseleave"+namespaces);
continue}preType=type;if(type==="focus"||type==="blur"){types.push(liveMap[type]+namespaces);
type=type+namespaces}else{type=(liveMap[type]||type)+namespaces}if(name==="live"){for(var j=0,l=context.length;
j<l;j++){jQuery.event.add(context[j],"live."+liveConvert(type,selector),{data:data,selector:selector,handler:fn,origType:type,origHandler:fn,preType:preType})
}}else{context.unbind("live."+liveConvert(type,selector),fn)}}return this}});function liveHandler(event){var stop,maxLevel,related,match,handleObj,elem,j,i,l,data,close,namespace,ret,elems=[],selectors=[],events=jQuery.data(this,this.nodeType?"events":"__events__");
if(typeof events==="function"){events=events.events}if(event.liveFired===this||!events||!events.live||event.button&&event.type==="click"){return
}if(event.namespace){namespace=new RegExp("(^|\\.)"+event.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")
}event.liveFired=this;var live=events.live.slice(0);for(j=0;j<live.length;j++){handleObj=live[j];
if(handleObj.origType.replace(rnamespaces,"")===event.type){selectors.push(handleObj.selector)
}else{live.splice(j--,1)}}match=jQuery(event.target).closest(selectors,event.currentTarget);
for(i=0,l=match.length;i<l;i++){close=match[i];for(j=0;j<live.length;j++){handleObj=live[j];
if(close.selector===handleObj.selector&&(!namespace||namespace.test(handleObj.namespace))){elem=close.elem;
related=null;if(handleObj.preType==="mouseenter"||handleObj.preType==="mouseleave"){event.type=handleObj.preType;
related=jQuery(event.relatedTarget).closest(handleObj.selector)[0]}if(!related||related!==elem){elems.push({elem:elem,handleObj:handleObj,level:close.level})
}}}}for(i=0,l=elems.length;i<l;i++){match=elems[i];if(maxLevel&&match.level>maxLevel){break
}event.currentTarget=match.elem;event.data=match.handleObj.data;event.handleObj=match.handleObj;
ret=match.handleObj.origHandler.apply(match.elem,arguments);if(ret===false||event.isPropagationStopped()){maxLevel=match.level;
if(ret===false){stop=false}if(event.isImmediatePropagationStopped()){break}}}return stop
}function liveConvert(type,selector){return(type&&type!=="*"?type+".":"")+selector.replace(rperiod,"`").replace(rspace,"&")
}jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error").split(" "),function(i,name){jQuery.fn[name]=function(data,fn){if(fn==null){fn=data;
data=null}return arguments.length>0?this.bind(name,data,fn):this.trigger(name)};if(jQuery.attrFn){jQuery.attrFn[name]=true
}});if(window.attachEvent&&!window.addEventListener){jQuery(window).bind("unload",function(){for(var id in jQuery.cache){if(jQuery.cache[id].handle){try{jQuery.event.remove(jQuery.cache[id].handle.elem)
}catch(e){}}}});
/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
}(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;
[0,0].sort(function(){baseHasDuplicate=false;return 0});var Sizzle=function(selector,context,results,seed){results=results||[];
context=context||document;var origContext=context;if(context.nodeType!==1&&context.nodeType!==9){return[]
}if(!selector||typeof selector!=="string"){return results}var m,set,checkSet,extra,ret,cur,pop,i,prune=true,contextXML=Sizzle.isXML(context),parts=[],soFar=selector;
do{chunker.exec("");m=chunker.exec(soFar);if(m){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];
break}}}while(m);if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context)
}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();
if(Expr.relative[selector]){selector+=parts.shift()}set=posProcess(selector,set)}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){ret=Sizzle.find(parts.shift(),context,contextXML);
context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0]}if(context){ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);
set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set)
}else{prune=false}while(parts.length){cur=parts.pop();pop=cur;if(!Expr.relative[cur]){cur=""
}else{pop=parts.pop()}if(pop==null){pop=context}Expr.relative[cur](checkSet,pop,contextXML)
}}else{checkSet=parts=[]}}if(!checkSet){checkSet=set}if(!checkSet){Sizzle.error(cur||selector)
}if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet)
}else{if(context&&context.nodeType===1){for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&Sizzle.contains(context,checkSet[i]))){results.push(set[i])
}}}else{for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i])
}}}}}else{makeArray(checkSet,results)}if(extra){Sizzle(extra,origContext,results,seed);
Sizzle.uniqueSort(results)}return results};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;
results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1)
}}}}return results};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set)
};Sizzle.matchesSelector=function(node,expr){return Sizzle(expr,null,null,[node]).length>0
};Sizzle.find=function(expr,context,isXML){var set;if(!expr){return[]}for(var i=0,l=Expr.order.length;
i<l;i++){var match,type=Expr.order[i];if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];
match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");
set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");
break}}}}if(!set){set=context.getElementsByTagName("*")}return{set:set,expr:expr}
};Sizzle.filter=function(expr,set,inplace,not){var match,anyFound,old=expr,result=[],curLoop=set,isXMLFilter=set&&set[0]&&Sizzle.isXML(set[0]);
while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){var found,item,filter=Expr.filter[type],left=match[1];
anyFound=false;match.splice(1,1);if(left.substr(left.length-1)==="\\"){continue}if(curLoop===result){result=[]
}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);
if(!match){anyFound=found=true}else{if(match===true){continue}}}if(match){for(var i=0;
(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^!!found;
if(inplace&&found!=null){if(pass){anyFound=true}else{curLoop[i]=false}}else{if(pass){result.push(item);
anyFound=true}}}}}if(found!==undefined){if(!inplace){curLoop=result}expr=expr.replace(Expr.match[type],"");
if(!anyFound){return[]}break}}}if(expr===old){if(anyFound==null){Sizzle.error(expr)
}else{break}}old=expr}return curLoop};Sizzle.error=function(msg){throw"Syntax error, unrecognized expression: "+msg
};var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href")
}},relative:{"+":function(checkSet,part){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;
if(isTag){part=part.toLowerCase()}for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?elem||false:elem===part
}}if(isPartStrNotTag){Sizzle.filter(part,checkSet,true)}},">":function(checkSet,part){var elem,isPartStr=typeof part==="string",i=0,l=checkSet.length;
if(isPartStr&&!/\W/.test(part)){part=part.toLowerCase();for(;i<l;i++){elem=checkSet[i];
if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false
}}}else{for(;i<l;i++){elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part
}}if(isPartStr){Sizzle.filter(part,checkSet,true)}}},"":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;
if(typeof part==="string"&&!/\W/.test(part)){part=part.toLowerCase();nodeCheck=part;
checkFn=dirNodeCheck}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML)
},"~":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;
if(typeof part==="string"&&!/\W/.test(part)){part=part.toLowerCase();nodeCheck=part;
checkFn=dirNodeCheck}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML)
}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);
return m&&m.parentNode?[m]:[]}},NAME:function(match,context){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);
for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i])
}}return ret.length===0?null:ret}},TAG:function(match,context){return context.getElementsByTagName(match[1])
}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";
if(isXML){return match}for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n]/g," ").indexOf(match)>=0)){if(!inplace){result.push(elem)
}}else{if(inplace){curLoop[i]=false}}}}return false},ID:function(match){return match[1].replace(/\\/g,"")
},TAG:function(match,curLoop){return match[1].toLowerCase()},CHILD:function(match){if(match[1]==="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);
match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0}match[0]=done++;return match
},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");
if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name]}if(match[2]==="~="){match[4]=" "+match[4]+" "
}return match},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop)
}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret)
}return false}}else{if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true
}}return match},POS:function(match){match.unshift(true);return match}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden"
},disabled:function(elem){return elem.disabled===true},checked:function(elem){return elem.checked===true
},selected:function(elem){elem.parentNode.selectedIndex;return elem.selected===true
},parent:function(elem){return !!elem.firstChild},empty:function(elem){return !elem.firstChild
},has:function(elem,i,match){return !!Sizzle(match[3],elem).length},header:function(elem){return(/h\d/i).test(elem.nodeName)
},text:function(elem){return"text"===elem.type},radio:function(elem){return"radio"===elem.type
},checkbox:function(elem){return"checkbox"===elem.type},file:function(elem){return"file"===elem.type
},password:function(elem){return"password"===elem.type},submit:function(elem){return"submit"===elem.type
},image:function(elem){return"image"===elem.type},reset:function(elem){return"reset"===elem.type
},button:function(elem){return"button"===elem.type||elem.nodeName.toLowerCase()==="button"
},input:function(elem){return(/input|select|textarea|button/i).test(elem.nodeName)
}},setFilters:{first:function(elem,i){return i===0},last:function(elem,i,match,array){return i===array.length-1
},even:function(elem,i){return i%2===0},odd:function(elem,i){return i%2===1},lt:function(elem,i,match){return i<match[3]-0
},gt:function(elem,i,match){return i>match[3]-0},nth:function(elem,i,match){return match[3]-0===i
},eq:function(elem,i,match){return match[3]-0===i}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];
if(filter){return filter(elem,i,match,array)}else{if(name==="contains"){return(elem.textContent||elem.innerText||Sizzle.getText([elem])||"").indexOf(match[3])>=0
}else{if(name==="not"){var not=match[3];for(var j=0,l=not.length;j<l;j++){if(not[j]===elem){return false
}}return true}else{Sizzle.error("Syntax error, unrecognized expression: "+name)}}}},CHILD:function(elem,match){var type=match[1],node=elem;
switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false
}}if(type==="first"){return true}node=elem;case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false
}}return true;case"nth":var first=match[2],last=match[3];if(first===1&&last===0){return true
}var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;
for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count
}}parent.sizcache=doneName}var diff=elem.nodeIndex-last;if(first===0){return diff===0
}else{return(diff%first===0&&diff/first>=0)}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match
},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName.toLowerCase()===match
},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1
},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];
return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!==check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false
},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];
if(filter){return filter(elem,i,match,array)}}}};var origPOS=Expr.match.POS,fescape=function(all,num){return"\\"+(num-0+1)
};for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+(/(?![^\[]*\])(?![^\(]*\))/.source));
Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,fescape))
}var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);
if(results){results.push.apply(results,array);return results}return array};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType
}catch(e){makeArray=function(array,results){var i=0,ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array)
}else{if(typeof array.length==="number"){for(var l=array.length;i<l;i++){ret.push(array[i])
}}else{for(;array[i];i++){ret.push(array[i])}}}return ret}}var sortOrder,siblingCheck;
if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(a===b){hasDuplicate=true;
return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1
}return a.compareDocumentPosition(b)&4?-1:1}}else{sortOrder=function(a,b){var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;
if(a===b){hasDuplicate=true;return 0}else{if(aup===bup){return siblingCheck(a,b)}else{if(!aup){return -1
}else{if(!bup){return 1}}}}while(cur){ap.unshift(cur);cur=cur.parentNode}cur=bup;
while(cur){bp.unshift(cur);cur=cur.parentNode}al=ap.length;bl=bp.length;for(var i=0;
i<al&&i<bl;i++){if(ap[i]!==bp[i]){return siblingCheck(ap[i],bp[i])}}return i===al?siblingCheck(a,bp[i],-1):siblingCheck(ap[i],b,1)
};siblingCheck=function(a,b,ret){if(a===b){return ret}var cur=a.nextSibling;while(cur){if(cur===b){return -1
}cur=cur.nextSibling}return 1}}Sizzle.getText=function(elems){var ret="",elem;for(var i=0;
elems[i];i++){elem=elems[i];if(elem.nodeType===3||elem.nodeType===4){ret+=elem.nodeValue
}else{if(elem.nodeType!==8){ret+=Sizzle.getText(elem.childNodes)}}}return ret};(function(){var form=document.createElement("div"),id="script"+(new Date()).getTime(),root=document.documentElement;
form.innerHTML="<a name='"+id+"'/>";root.insertBefore(form,root.firstChild);if(document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);
return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[]
}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");
return elem.nodeType===1&&node&&node.nodeValue===match}}root.removeChild(form);root=form=null
})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));
if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);
if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i])
}}results=tmp}return results}}div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2)
}}div=null})();if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div"),id="__sizzle__";
div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return
}Sizzle=function(query,context,extra,seed){context=context||document;query=query.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!seed&&!Sizzle.isXML(context)){if(context.nodeType===9){try{return makeArray(context.querySelectorAll(query),extra)
}catch(qsaError){}}else{if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){var old=context.getAttribute("id"),nid=old||id;
if(!old){context.setAttribute("id",nid)}try{return makeArray(context.querySelectorAll("#"+nid+" "+query),extra)
}catch(pseudoError){}finally{if(!old){context.removeAttribute("id")}}}}}return oldSizzle(query,context,extra,seed)
};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop]}div=null})()}(function(){var html=document.documentElement,matches=html.matchesSelector||html.mozMatchesSelector||html.webkitMatchesSelector||html.msMatchesSelector,pseudoWorks=false;
try{matches.call(document.documentElement,"[test!='']:sizzle")}catch(pseudoError){pseudoWorks=true
}if(matches){Sizzle.matchesSelector=function(node,expr){expr=expr.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");
if(!Sizzle.isXML(node)){try{if(pseudoWorks||!Expr.match.PSEUDO.test(expr)&&!/!=/.test(expr)){return matches.call(node,expr)
}}catch(e){}}return Sizzle(expr,null,null,[node]).length>0}}})();(function(){var div=document.createElement("div");
div.innerHTML="<div class='test e'></div><div class='test'></div>";if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){return
}div.lastChild.className="e";if(div.getElementsByClassName("e").length===1){return
}Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1])
}};div=null})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;
i<l;i++){var elem=checkSet[i];if(elem){var match=false;elem=elem[dir];while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];
break}if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i}if(elem.nodeName.toLowerCase()===cur){match=elem;
break}elem=elem[dir]}checkSet[i]=match}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;
i<l;i++){var elem=checkSet[i];if(elem){var match=false;elem=elem[dir];while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];
break}if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;elem.sizset=i}if(typeof cur!=="string"){if(elem===cur){match=true;
break}}else{if(Sizzle.filter(cur,[elem]).length>0){match=elem;break}}}elem=elem[dir]
}checkSet[i]=match}}}if(document.documentElement.contains){Sizzle.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true)
}}else{if(document.documentElement.compareDocumentPosition){Sizzle.contains=function(a,b){return !!(a.compareDocumentPosition(b)&16)
}}else{Sizzle.contains=function(){return false}}}Sizzle.isXML=function(elem){var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;
return documentElement?documentElement.nodeName!=="HTML":false};var posProcess=function(selector,context){var match,tmpSet=[],later="",root=context.nodeType?[context]:context;
while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"")
}selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;
i<l;i++){Sizzle(selector,root[i],tmpSet)}return Sizzle.filter(later,tmpSet)};jQuery.find=Sizzle;
jQuery.expr=Sizzle.selectors;jQuery.expr[":"]=jQuery.expr.filters;jQuery.unique=Sizzle.uniqueSort;
jQuery.text=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains
})();var runtil=/Until$/,rparentsprev=/^(?:parents|prevUntil|prevAll)/,rmultiselector=/,/,isSimple=/^.[^:#\[\.,]*$/,slice=Array.prototype.slice,POS=jQuery.expr.match.POS;
jQuery.fn.extend({find:function(selector){var ret=this.pushStack("","find",selector),length=0;
for(var i=0,l=this.length;i<l;i++){length=ret.length;jQuery.find(selector,this[i],ret);
if(i>0){for(var n=length;n<ret.length;n++){for(var r=0;r<length;r++){if(ret[r]===ret[n]){ret.splice(n--,1);
break}}}}}return ret},has:function(target){var targets=jQuery(target);return this.filter(function(){for(var i=0,l=targets.length;
i<l;i++){if(jQuery.contains(this,targets[i])){return true}}})},not:function(selector){return this.pushStack(winnow(this,selector,false),"not",selector)
},filter:function(selector){return this.pushStack(winnow(this,selector,true),"filter",selector)
},is:function(selector){return !!selector&&jQuery.filter(selector,this).length>0},closest:function(selectors,context){var ret=[],i,l,cur=this[0];
if(jQuery.isArray(selectors)){var match,selector,matches={},level=1;if(cur&&selectors.length){for(i=0,l=selectors.length;
i<l;i++){selector=selectors[i];if(!matches[selector]){matches[selector]=jQuery.expr.match.POS.test(selector)?jQuery(selector,context||this.context):selector
}}while(cur&&cur.ownerDocument&&cur!==context){for(selector in matches){match=matches[selector];
if(match.jquery?match.index(cur)>-1:jQuery(cur).is(match)){ret.push({selector:selector,elem:cur,level:level})
}}cur=cur.parentNode;level++}}return ret}var pos=POS.test(selectors)?jQuery(selectors,context||this.context):null;
for(i=0,l=this.length;i<l;i++){cur=this[i];while(cur){if(pos?pos.index(cur)>-1:jQuery.find.matchesSelector(cur,selectors)){ret.push(cur);
break}else{cur=cur.parentNode;if(!cur||!cur.ownerDocument||cur===context){break}}}}ret=ret.length>1?jQuery.unique(ret):ret;
return this.pushStack(ret,"closest",selectors)},index:function(elem){if(!elem||typeof elem==="string"){return jQuery.inArray(this[0],elem?jQuery(elem):this.parent().children())
}return jQuery.inArray(elem.jquery?elem[0]:elem,this)},add:function(selector,context){var set=typeof selector==="string"?jQuery(selector,context||this.context):jQuery.makeArray(selector),all=jQuery.merge(this.get(),set);
return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?all:jQuery.unique(all))
},andSelf:function(){return this.add(this.prevObject)}});function isDisconnected(node){return !node||!node.parentNode||node.parentNode.nodeType===11
}jQuery.each({parent:function(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null
},parents:function(elem){return jQuery.dir(elem,"parentNode")},parentsUntil:function(elem,i,until){return jQuery.dir(elem,"parentNode",until)
},next:function(elem){return jQuery.nth(elem,2,"nextSibling")},prev:function(elem){return jQuery.nth(elem,2,"previousSibling")
},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")
},nextUntil:function(elem,i,until){return jQuery.dir(elem,"nextSibling",until)},prevUntil:function(elem,i,until){return jQuery.dir(elem,"previousSibling",until)
},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem)},children:function(elem){return jQuery.sibling(elem.firstChild)
},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)
}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until);
if(!runtil.test(name)){selector=until}if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret)
}ret=this.length>1?jQuery.unique(ret):ret;if((this.length>1||rmultiselector.test(selector))&&rparentsprev.test(name)){ret=ret.reverse()
}return this.pushStack(ret,name,slice.call(arguments).join(","))}});jQuery.extend({filter:function(expr,elems,not){if(not){expr=":not("+expr+")"
}return elems.length===1?jQuery.find.matchesSelector(elems[0],expr)?[elems[0]]:[]:jQuery.find.matches(expr,elems)
},dir:function(elem,dir,until){var matched=[],cur=elem[dir];while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){if(cur.nodeType===1){matched.push(cur)
}cur=cur[dir]}return matched},nth:function(cur,result,dir,elem){result=result||1;
var num=0;for(;cur;cur=cur[dir]){if(cur.nodeType===1&&++num===result){break}}return cur
},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){r.push(n)
}}return r}});function winnow(elements,qualifier,keep){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){var retVal=!!qualifier.call(elem,i,elem);
return retVal===keep})}else{if(qualifier.nodeType){return jQuery.grep(elements,function(elem,i){return(elem===qualifier)===keep
})}else{if(typeof qualifier==="string"){var filtered=jQuery.grep(elements,function(elem){return elem.nodeType===1
});if(isSimple.test(qualifier)){return jQuery.filter(qualifier,filtered,!keep)}else{qualifier=jQuery.filter(qualifier,filtered)
}}}}return jQuery.grep(elements,function(elem,i){return(jQuery.inArray(elem,qualifier)>=0)===keep
})}var rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnocache=/<(?:script|object|embed|option|style)/i,rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,raction=/\=([^="'>\s]+\/)>/g,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};
wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;
wrapMap.th=wrapMap.td;if(!jQuery.support.htmlSerialize){wrapMap._default=[1,"div<div>","</div>"]
}jQuery.fn.extend({text:function(text){if(jQuery.isFunction(text)){return this.each(function(i){var self=jQuery(this);
self.text(text.call(this,i,self.text()))})}if(typeof text!=="object"&&text!==undefined){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text))
}return jQuery.text(this)},wrapAll:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i))
})}if(this[0]){var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0])
}wrap.map(function(){var elem=this;while(elem.firstChild&&elem.firstChild.nodeType===1){elem=elem.firstChild
}return elem}).append(this)}return this},wrapInner:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i))
})}return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html)
}else{self.append(html)}})},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)
})},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes)
}}).end()},append:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.appendChild(elem)
}})},prepend:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.insertBefore(elem,this.firstChild)
}})},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this)
})}else{if(arguments.length){var set=jQuery(arguments[0]);set.push.apply(set,this.toArray());
return this.pushStack(set,"before",arguments)}}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)
})}else{if(arguments.length){var set=this.pushStack(this,"after",arguments);set.push.apply(set,jQuery(arguments[0]).toArray());
return set}}},remove:function(selector,keepData){for(var i=0,elem;(elem=this[i])!=null;
i++){if(!selector||jQuery.filter(selector,[elem]).length){if(!keepData&&elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));
jQuery.cleanData([elem])}if(elem.parentNode){elem.parentNode.removeChild(elem)}}}return this
},empty:function(){for(var i=0,elem;(elem=this[i])!=null;i++){if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"))
}while(elem.firstChild){elem.removeChild(elem.firstChild)}}return this},clone:function(events){var ret=this.map(function(){if(!jQuery.support.noCloneEvent&&!jQuery.isXMLDoc(this)){var html=this.outerHTML,ownerDocument=this.ownerDocument;
if(!html){var div=ownerDocument.createElement("div");div.appendChild(this.cloneNode(true));
html=div.innerHTML}return jQuery.clean([html.replace(rinlinejQuery,"").replace(raction,'="$1">').replace(rleadingWhitespace,"")],ownerDocument)[0]
}else{return this.cloneNode(true)}});if(events===true){cloneCopyEvent(this,ret);cloneCopyEvent(this.find("*"),ret.find("*"))
}return ret},html:function(value){if(value===undefined){return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(rinlinejQuery,""):null
}else{if(typeof value==="string"&&!rnocache.test(value)&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,"<$1></$2>");
try{for(var i=0,l=this.length;i<l;i++){if(this[i].nodeType===1){jQuery.cleanData(this[i].getElementsByTagName("*"));
this[i].innerHTML=value}}}catch(e){this.empty().append(value)}}else{if(jQuery.isFunction(value)){this.each(function(i){var self=jQuery(this);
self.html(value.call(this,i,self.html()))})}else{this.empty().append(value)}}}return this
},replaceWith:function(value){if(this[0]&&this[0].parentNode){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this),old=self.html();
self.replaceWith(value.call(this,i,old))})}if(typeof value!=="string"){value=jQuery(value).detach()
}return this.each(function(){var next=this.nextSibling,parent=this.parentNode;jQuery(this).remove();
if(next){jQuery(next).before(value)}else{jQuery(parent).append(value)}})}else{return this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value)
}},detach:function(selector){return this.remove(selector,true)},domManip:function(args,table,callback){var results,first,fragment,parent,value=args[0],scripts=[];
if(!jQuery.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){jQuery(this).domManip(args,table,callback,true)
})}if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);
args[0]=value.call(this,i,table?self.html():undefined);self.domManip(args,table,callback)
})}if(this[0]){parent=value&&value.parentNode;if(jQuery.support.parentNode&&parent&&parent.nodeType===11&&parent.childNodes.length===this.length){results={fragment:parent}
}else{results=jQuery.buildFragment(args,this,scripts)}fragment=results.fragment;if(fragment.childNodes.length===1){first=fragment=fragment.firstChild
}else{first=fragment.firstChild}if(first){table=table&&jQuery.nodeName(first,"tr");
for(var i=0,l=this.length;i<l;i++){callback.call(table?root(this[i],first):this[i],i>0||results.cacheable||this.length>1?fragment.cloneNode(true):fragment)
}}if(scripts.length){jQuery.each(scripts,evalScript)}}return this}});function root(elem,cur){return jQuery.nodeName(elem,"table")?(elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody"))):elem
}function cloneCopyEvent(orig,ret){var i=0;ret.each(function(){if(this.nodeName!==(orig[i]&&orig[i].nodeName)){return
}var oldData=jQuery.data(orig[i++]),curData=jQuery.data(this,oldData),events=oldData&&oldData.events;
if(events){delete curData.handle;curData.events={};for(var type in events){for(var handler in events[type]){jQuery.event.add(this,type,events[type][handler],events[type][handler].data)
}}}})}jQuery.buildFragment=function(args,nodes,scripts){var fragment,cacheable,cacheresults,doc=(nodes&&nodes[0]?nodes[0].ownerDocument||nodes[0]:document);
if(args.length===1&&typeof args[0]==="string"&&args[0].length<512&&doc===document&&!rnocache.test(args[0])&&(jQuery.support.checkClone||!rchecked.test(args[0]))){cacheable=true;
cacheresults=jQuery.fragments[args[0]];if(cacheresults){if(cacheresults!==1){fragment=cacheresults
}}}if(!fragment){fragment=doc.createDocumentFragment();jQuery.clean(args,doc,fragment,scripts)
}if(cacheable){jQuery.fragments[args[0]]=cacheresults?fragment:1}return{fragment:fragment,cacheable:cacheable}
};jQuery.fragments={};jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var ret=[],insert=jQuery(selector),parent=this.length===1&&this[0].parentNode;
if(parent&&parent.nodeType===11&&parent.childNodes.length===1&&insert.length===1){insert[original](this[0]);
return this}else{for(var i=0,l=insert.length;i<l;i++){var elems=(i>0?this.clone(true):this).get();
jQuery(insert[i])[original](elems);ret=ret.concat(elems)}return this.pushStack(ret,name,insert.selector)
}}});jQuery.extend({clean:function(elems,context,fragment,scripts){context=context||document;
if(typeof context.createElement==="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document
}var ret=[];for(var i=0,elem;(elem=elems[i])!=null;i++){if(typeof elem==="number"){elem+=""
}if(!elem){continue}if(typeof elem==="string"&&!rhtml.test(elem)){elem=context.createTextNode(elem)
}else{if(typeof elem==="string"){elem=elem.replace(rxhtmlTag,"<$1></$2>");var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),wrap=wrapMap[tag]||wrapMap._default,depth=wrap[0],div=context.createElement("div");
div.innerHTML=wrap[1]+elem+wrap[2];while(depth--){div=div.lastChild}if(!jQuery.support.tbody){var hasBody=rtbody.test(elem),tbody=tag==="table"&&!hasBody?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!hasBody?div.childNodes:[];
for(var j=tbody.length-1;j>=0;--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])
}}}if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild)
}elem=div.childNodes}}if(elem.nodeType){ret.push(elem)}else{ret=jQuery.merge(ret,elem)
}}if(fragment){for(i=0;ret[i];i++){if(scripts&&jQuery.nodeName(ret[i],"script")&&(!ret[i].type||ret[i].type.toLowerCase()==="text/javascript")){scripts.push(ret[i].parentNode?ret[i].parentNode.removeChild(ret[i]):ret[i])
}else{if(ret[i].nodeType===1){ret.splice.apply(ret,[i+1,0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))))
}fragment.appendChild(ret[i])}}}return ret},cleanData:function(elems){var data,id,cache=jQuery.cache,special=jQuery.event.special,deleteExpando=jQuery.support.deleteExpando;
for(var i=0,elem;(elem=elems[i])!=null;i++){if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){continue
}id=elem[jQuery.expando];if(id){data=cache[id];if(data&&data.events){for(var type in data.events){if(special[type]){jQuery.event.remove(elem,type)
}else{jQuery.removeEvent(elem,type,data.handle)}}}if(deleteExpando){delete elem[jQuery.expando]
}else{if(elem.removeAttribute){elem.removeAttribute(jQuery.expando)}}delete cache[id]
}}}});function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"})
}else{jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"")}if(elem.parentNode){elem.parentNode.removeChild(elem)
}}var ralpha=/alpha\([^)]*\)/i,ropacity=/opacity=([^)]*)/,rdashAlpha=/-([a-z])/ig,rupper=/([A-Z])/g,rnumpx=/^-?\d+(?:px)?$/i,rnum=/^-?\d/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssWidth=["Left","Right"],cssHeight=["Top","Bottom"],curCSS,getComputedStyle,currentStyle,fcamelCase=function(all,letter){return letter.toUpperCase()
};jQuery.fn.css=function(name,value){if(arguments.length===2&&value===undefined){return this
}return jQuery.access(this,name,value,true,function(elem,name,value){return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name)
})};jQuery.extend({cssHooks:{opacity:{get:function(elem,computed){if(computed){var ret=curCSS(elem,"opacity","opacity");
return ret===""?"1":ret}else{return elem.style.opacity}}}},cssNumber:{zIndex:true,fontWeight:true,opacity:true,zoom:true,lineHeight:true},cssProps:{"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"},style:function(elem,name,value,extra){if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return
}var ret,origName=jQuery.camelCase(name),style=elem.style,hooks=jQuery.cssHooks[origName];
name=jQuery.cssProps[origName]||origName;if(value!==undefined){if(typeof value==="number"&&isNaN(value)||value==null){return
}if(typeof value==="number"&&!jQuery.cssNumber[origName]){value+="px"}if(!hooks||!("set" in hooks)||(value=hooks.set(elem,value))!==undefined){try{style[name]=value
}catch(e){}}}else{if(hooks&&"get" in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret
}return style[name]}},css:function(elem,name,extra){var ret,origName=jQuery.camelCase(name),hooks=jQuery.cssHooks[origName];
name=jQuery.cssProps[origName]||origName;if(hooks&&"get" in hooks&&(ret=hooks.get(elem,true,extra))!==undefined){return ret
}else{if(curCSS){return curCSS(elem,name,origName)}}},swap:function(elem,options,callback){var old={};
for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name]
}callback.call(elem);for(name in options){elem.style[name]=old[name]}},camelCase:function(string){return string.replace(rdashAlpha,fcamelCase)
}});jQuery.curCSS=jQuery.css;jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function(elem,computed,extra){var val;
if(computed){if(elem.offsetWidth!==0){val=getWH(elem,name,extra)}else{jQuery.swap(elem,cssShow,function(){val=getWH(elem,name,extra)
})}if(val<=0){val=curCSS(elem,name,name);if(val==="0px"&&currentStyle){val=currentStyle(elem,name,name)
}if(val!=null){return val===""||val==="auto"?"0px":val}}if(val<0||val==null){val=elem.style[name];
return val===""||val==="auto"?"0px":val}return typeof val==="string"?val:val+"px"
}},set:function(elem,value){if(rnumpx.test(value)){value=parseFloat(value);if(value>=0){return value+"px"
}}else{return value}}}});if(!jQuery.support.opacity){jQuery.cssHooks.opacity={get:function(elem,computed){return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?(parseFloat(RegExp.$1)/100)+"":computed?"1":""
},set:function(elem,value){var style=elem.style;style.zoom=1;var opacity=jQuery.isNaN(value)?"":"alpha(opacity="+value*100+")",filter=style.filter||"";
style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):style.filter+" "+opacity
}}}if(document.defaultView&&document.defaultView.getComputedStyle){getComputedStyle=function(elem,newName,name){var ret,defaultView,computedStyle;
name=name.replace(rupper,"-$1").toLowerCase();if(!(defaultView=elem.ownerDocument.defaultView)){return undefined
}if((computedStyle=defaultView.getComputedStyle(elem,null))){ret=computedStyle.getPropertyValue(name);
if(ret===""&&!jQuery.contains(elem.ownerDocument.documentElement,elem)){ret=jQuery.style(elem,name)
}}return ret}}if(document.documentElement.currentStyle){currentStyle=function(elem,name){var left,rsLeft,ret=elem.currentStyle&&elem.currentStyle[name],style=elem.style;
if(!rnumpx.test(ret)&&rnum.test(ret)){left=style.left;rsLeft=elem.runtimeStyle.left;
elem.runtimeStyle.left=elem.currentStyle.left;style.left=name==="fontSize"?"1em":(ret||0);
ret=style.pixelLeft+"px";style.left=left;elem.runtimeStyle.left=rsLeft}return ret===""?"auto":ret
}}curCSS=getComputedStyle||currentStyle;function getWH(elem,name,extra){var which=name==="width"?cssWidth:cssHeight,val=name==="width"?elem.offsetWidth:elem.offsetHeight;
if(extra==="border"){return val}jQuery.each(which,function(){if(!extra){val-=parseFloat(jQuery.css(elem,"padding"+this))||0
}if(extra==="margin"){val+=parseFloat(jQuery.css(elem,"margin"+this))||0}else{val-=parseFloat(jQuery.css(elem,"border"+this+"Width"))||0
}});return val}if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){var width=elem.offsetWidth,height=elem.offsetHeight;
return(width===0&&height===0)||(!jQuery.support.reliableHiddenOffsets&&(elem.style.display||jQuery.css(elem,"display"))==="none")
};jQuery.expr.filters.visible=function(elem){return !jQuery.expr.filters.hidden(elem)
}}var jsc=jQuery.now(),rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,rselectTextarea=/^(?:select|textarea)/i,rinput=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,rnoContent=/^(?:GET|HEAD)$/,rbracket=/\[\]$/,jsre=/\=\?(&|$)/,rquery=/\?/,rts=/([?&])_=[^&]*/,rurl=/^(\w+:)?\/\/([^\/?#]+)/,r20=/%20/g,rhash=/#.*$/,_load=jQuery.fn.load;
jQuery.fn.extend({load:function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments)
}else{if(!this.length){return this}}var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);
url=url.slice(0,off)}var type="GET";if(params){if(jQuery.isFunction(params)){callback=params;
params=null}else{if(typeof params==="object"){params=jQuery.param(params,jQuery.ajaxSettings.traditional);
type="POST"}}}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status==="success"||status==="notmodified"){self.html(selector?jQuery("<div>").append(res.responseText.replace(rscript,"")).find(selector):res.responseText)
}if(callback){self.each(callback,[res.responseText,status,res])}}});return this},serialize:function(){return jQuery.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type))
}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return{name:elem.name,value:val}
}):{name:elem.name,value:val}}).get()}});jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)
}});jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;
callback=data;data=null}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})
},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")
},post:function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;
callback=data;data={}}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})
},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return new window.XMLHttpRequest()
},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},ajax:function(origSettings){var s=jQuery.extend(true,{},jQuery.ajaxSettings,origSettings),jsonp,status,data,type=s.type.toUpperCase(),noContent=rnoContent.test(type);
s.url=s.url.replace(rhash,"");s.context=origSettings&&origSettings.context!=null?origSettings.context:s;
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional)
}if(s.dataType==="jsonp"){if(type==="GET"){if(!jsre.test(s.url)){s.url+=(rquery.test(s.url)?"&":"?")+(s.jsonp||"callback")+"=?"
}}else{if(!s.data||!jsre.test(s.data)){s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?"
}}s.dataType="json"}if(s.dataType==="json"&&(s.data&&jsre.test(s.data)||jsre.test(s.url))){jsonp=s.jsonpCallback||("jsonp"+jsc++);
if(s.data){s.data=(s.data+"").replace(jsre,"="+jsonp+"$1")}s.url=s.url.replace(jsre,"="+jsonp+"$1");
s.dataType="script";var customJsonp=window[jsonp];window[jsonp]=function(tmp){if(jQuery.isFunction(customJsonp)){customJsonp(tmp)
}else{window[jsonp]=undefined;try{delete window[jsonp]}catch(jsonpError){}}data=tmp;
jQuery.handleSuccess(s,xhr,status,data);jQuery.handleComplete(s,xhr,status,data);
if(head){head.removeChild(script)}}}if(s.dataType==="script"&&s.cache===null){s.cache=false
}if(s.cache===false&&noContent){var ts=jQuery.now();var ret=s.url.replace(rts,"$1_="+ts);
s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"")}if(s.data&&noContent){s.url+=(rquery.test(s.url)?"&":"?")+s.data
}if(s.global&&jQuery.active++===0){jQuery.event.trigger("ajaxStart")}var parts=rurl.exec(s.url),remote=parts&&(parts[1]&&parts[1].toLowerCase()!==location.protocol||parts[2].toLowerCase()!==location.host);
if(s.dataType==="script"&&type==="GET"&&remote){var head=document.getElementsByTagName("head")[0]||document.documentElement;
var script=document.createElement("script");if(s.scriptCharset){script.charset=s.scriptCharset
}script.src=s.url;if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){done=true;
jQuery.handleSuccess(s,xhr,status,data);jQuery.handleComplete(s,xhr,status,data);
script.onload=script.onreadystatechange=null;if(head&&script.parentNode){head.removeChild(script)
}}}}head.insertBefore(script,head.firstChild);return undefined}var requestDone=false;
var xhr=s.xhr();if(!xhr){return}if(s.username){xhr.open(type,s.url,s.async,s.username,s.password)
}else{xhr.open(type,s.url,s.async)}try{if((s.data!=null&&!noContent)||(origSettings&&origSettings.contentType)){xhr.setRequestHeader("Content-Type",s.contentType)
}if(s.ifModified){if(jQuery.lastModified[s.url]){xhr.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url])
}if(jQuery.etag[s.url]){xhr.setRequestHeader("If-None-Match",jQuery.etag[s.url])}}if(!remote){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest")
}xhr.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*; q=0.01":s.accepts._default)
}catch(headerError){}if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){if(s.global&&jQuery.active--===1){jQuery.event.trigger("ajaxStop")
}xhr.abort();return false}if(s.global){jQuery.triggerGlobal(s,"ajaxSend",[xhr,s])
}var onreadystatechange=xhr.onreadystatechange=function(isTimeout){if(!xhr||xhr.readyState===0||isTimeout==="abort"){if(!requestDone){jQuery.handleComplete(s,xhr,status,data)
}requestDone=true;if(xhr){xhr.onreadystatechange=jQuery.noop}}else{if(!requestDone&&xhr&&(xhr.readyState===4||isTimeout==="timeout")){requestDone=true;
xhr.onreadystatechange=jQuery.noop;status=isTimeout==="timeout"?"timeout":!jQuery.httpSuccess(xhr)?"error":s.ifModified&&jQuery.httpNotModified(xhr,s.url)?"notmodified":"success";
var errMsg;if(status==="success"){try{data=jQuery.httpData(xhr,s.dataType,s)}catch(parserError){status="parsererror";
errMsg=parserError}}if(status==="success"||status==="notmodified"){if(!jsonp){jQuery.handleSuccess(s,xhr,status,data)
}}else{jQuery.handleError(s,xhr,status,errMsg)}if(!jsonp){jQuery.handleComplete(s,xhr,status,data)
}if(isTimeout==="timeout"){xhr.abort()}if(s.async){xhr=null}}}};try{var oldAbort=xhr.abort;
xhr.abort=function(){if(xhr){Function.prototype.call.call(oldAbort,xhr)}onreadystatechange("abort")
}}catch(abortError){}if(s.async&&s.timeout>0){setTimeout(function(){if(xhr&&!requestDone){onreadystatechange("timeout")
}},s.timeout)}try{xhr.send(noContent||s.data==null?null:s.data)}catch(sendError){jQuery.handleError(s,xhr,null,sendError);
jQuery.handleComplete(s,xhr,status,data)}if(!s.async){onreadystatechange()}return xhr
},param:function(a,traditional){var s=[],add=function(key,value){value=jQuery.isFunction(value)?value():value;
s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value)};if(traditional===undefined){traditional=jQuery.ajaxSettings.traditional
}if(jQuery.isArray(a)||a.jquery){jQuery.each(a,function(){add(this.name,this.value)
})}else{for(var prefix in a){buildParams(prefix,a[prefix],traditional,add)}}return s.join("&").replace(r20,"+")
}});function buildParams(prefix,obj,traditional,add){if(jQuery.isArray(obj)&&obj.length){jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){add(prefix,v)
}else{buildParams(prefix+"["+(typeof v==="object"||jQuery.isArray(v)?i:"")+"]",v,traditional,add)
}})}else{if(!traditional&&obj!=null&&typeof obj==="object"){if(jQuery.isEmptyObject(obj)){add(prefix,"")
}else{jQuery.each(obj,function(k,v){buildParams(prefix+"["+k+"]",v,traditional,add)
})}}else{add(prefix,obj)}}}jQuery.extend({active:0,lastModified:{},etag:{},handleError:function(s,xhr,status,e){if(s.error){s.error.call(s.context,xhr,status,e)
}if(s.global){jQuery.triggerGlobal(s,"ajaxError",[xhr,s,e])}},handleSuccess:function(s,xhr,status,data){if(s.success){s.success.call(s.context,data,status,xhr)
}if(s.global){jQuery.triggerGlobal(s,"ajaxSuccess",[xhr,s])}},handleComplete:function(s,xhr,status){if(s.complete){s.complete.call(s.context,xhr,status)
}if(s.global){jQuery.triggerGlobal(s,"ajaxComplete",[xhr,s])}if(s.global&&jQuery.active--===1){jQuery.event.trigger("ajaxStop")
}},triggerGlobal:function(s,type,args){(s.context&&s.context.url==null?jQuery(s.context):jQuery.event).trigger(type,args)
},httpSuccess:function(xhr){try{return !xhr.status&&location.protocol==="file:"||xhr.status>=200&&xhr.status<300||xhr.status===304||xhr.status===1223
}catch(e){}return false},httpNotModified:function(xhr,url){var lastModified=xhr.getResponseHeader("Last-Modified"),etag=xhr.getResponseHeader("Etag");
if(lastModified){jQuery.lastModified[url]=lastModified}if(etag){jQuery.etag[url]=etag
}return xhr.status===304},httpData:function(xhr,type,s){var ct=xhr.getResponseHeader("content-type")||"",xml=type==="xml"||!type&&ct.indexOf("xml")>=0,data=xml?xhr.responseXML:xhr.responseText;
if(xml&&data.documentElement.nodeName==="parsererror"){jQuery.error("parsererror")
}if(s&&s.dataFilter){data=s.dataFilter(data,type)}if(typeof data==="string"){if(type==="json"||!type&&ct.indexOf("json")>=0){data=jQuery.parseJSON(data)
}else{if(type==="script"||!type&&ct.indexOf("javascript")>=0){jQuery.globalEval(data)
}}}return data}});if(window.ActiveXObject){jQuery.ajaxSettings.xhr=function(){if(window.location.protocol!=="file:"){try{return new window.XMLHttpRequest()
}catch(xhrError){}}try{return new window.ActiveXObject("Microsoft.XMLHTTP")}catch(activeError){}}
}jQuery.support.ajax=!!jQuery.ajaxSettings.xhr();var elemdisplay={},rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=/^([+\-]=)?([\d+.\-]+)(.*)$/,timerId,fxAttrs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];
jQuery.fn.extend({show:function(speed,easing,callback){var elem,display;if(speed||speed===0){return this.animate(genFx("show",3),speed,easing,callback)
}else{for(var i=0,j=this.length;i<j;i++){elem=this[i];display=elem.style.display;
if(!jQuery.data(elem,"olddisplay")&&display==="none"){display=elem.style.display=""
}if(display===""&&jQuery.css(elem,"display")==="none"){jQuery.data(elem,"olddisplay",defaultDisplay(elem.nodeName))
}}for(i=0;i<j;i++){elem=this[i];display=elem.style.display;if(display===""||display==="none"){elem.style.display=jQuery.data(elem,"olddisplay")||""
}}return this}},hide:function(speed,easing,callback){if(speed||speed===0){return this.animate(genFx("hide",3),speed,easing,callback)
}else{for(var i=0,j=this.length;i<j;i++){var display=jQuery.css(this[i],"display");
if(display!=="none"){jQuery.data(this[i],"olddisplay",display)}}for(i=0;i<j;i++){this[i].style.display="none"
}return this}},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2,callback){var bool=typeof fn==="boolean";
if(jQuery.isFunction(fn)&&jQuery.isFunction(fn2)){this._toggle.apply(this,arguments)
}else{if(fn==null||bool){this.each(function(){var state=bool?fn:jQuery(this).is(":hidden");
jQuery(this)[state?"show":"hide"]()})}else{this.animate(genFx("toggle",3),fn,fn2,callback)
}}return this},fadeTo:function(speed,to,easing,callback){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:to},speed,easing,callback)
},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);
if(jQuery.isEmptyObject(prop)){return this.each(optall.complete)}return this[optall.queue===false?"each":"queue"](function(){var opt=jQuery.extend({},optall),p,isElement=this.nodeType===1,hidden=isElement&&jQuery(this).is(":hidden"),self=this;
for(p in prop){var name=jQuery.camelCase(p);if(p!==name){prop[name]=prop[p];delete prop[p];
p=name}if(prop[p]==="hide"&&hidden||prop[p]==="show"&&!hidden){return opt.complete.call(this)
}if(isElement&&(p==="height"||p==="width")){opt.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];
if(jQuery.css(this,"display")==="inline"&&jQuery.css(this,"float")==="none"){if(!jQuery.support.inlineBlockNeedsLayout){this.style.display="inline-block"
}else{var display=defaultDisplay(this.nodeName);if(display==="inline"){this.style.display="inline-block"
}else{this.style.display="inline";this.style.zoom=1}}}}if(jQuery.isArray(prop[p])){(opt.specialEasing=opt.specialEasing||{})[p]=prop[p][1];
prop[p]=prop[p][0]}}if(opt.overflow!=null){this.style.overflow="hidden"}opt.curAnim=jQuery.extend({},prop);
jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);if(rfxtypes.test(val)){e[val==="toggle"?hidden?"show":"hide":val](prop)
}else{var parts=rfxnum.exec(val),start=e.cur()||0;if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";
if(unit!=="px"){jQuery.style(self,name,(end||1)+unit);start=((end||1)/e.cur())*start;
jQuery.style(self,name,start+unit)}if(parts[1]){end=((parts[1]==="-="?-1:1)*end)+start
}e.custom(start,end,unit)}else{e.custom(start,val,"")}}});return true})},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;
if(clearQueue){this.queue([])}this.each(function(){for(var i=timers.length-1;i>=0;
i--){if(timers[i].elem===this){if(gotoEnd){timers[i](true)}timers.splice(i,1)}}});
if(!gotoEnd){this.dequeue()}return this}});function genFx(type,num){var obj={};jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){obj[this]=type
});return obj}jQuery.each({slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback)
}});jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};
opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;
opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false){jQuery(this).dequeue()
}if(jQuery.isFunction(opt.old)){opt.old.call(this)}};return opt},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p
},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum
}},timers:[],fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;
if(!options.orig){options.orig={}}}});jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)
}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]
}var r=parseFloat(jQuery.css(this.elem,this.prop));return r&&r>-10000?r:0},custom:function(from,to,unit){var self=this,fx=jQuery.fx;
this.startTime=jQuery.now();this.start=from;this.end=to;this.unit=unit||this.unit||"px";
this.now=this.start;this.pos=this.state=0;function t(gotoEnd){return self.step(gotoEnd)
}t.elem=this.elem;if(t()&&jQuery.timers.push(t)&&!timerId){timerId=setInterval(fx.tick,fx.interval)
}},show:function(){this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);
this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());
jQuery(this.elem).show()},hide:function(){this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);
this.options.hide=true;this.custom(this.cur(),0)},step:function(gotoEnd){var t=jQuery.now(),done=true;
if(gotoEnd||t>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;
this.update();this.options.curAnim[this.prop]=true;for(var i in this.options.curAnim){if(this.options.curAnim[i]!==true){done=false
}}if(done){if(this.options.overflow!=null&&!jQuery.support.shrinkWrapBlocks){var elem=this.elem,options=this.options;
jQuery.each(["","X","Y"],function(index,value){elem.style["overflow"+value]=options.overflow[index]
})}if(this.options.hide){jQuery(this.elem).hide()}if(this.options.hide||this.options.show){for(var p in this.options.curAnim){jQuery.style(this.elem,p,this.options.orig[p])
}}this.options.complete.call(this.elem)}return false}else{var n=t-this.startTime;
this.state=n/this.options.duration;var specialEasing=this.options.specialEasing&&this.options.specialEasing[this.prop];
var defaultEasing=this.options.easing||(jQuery.easing.swing?"swing":"linear");this.pos=jQuery.easing[specialEasing||defaultEasing](this.state,n,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};
jQuery.extend(jQuery.fx,{tick:function(){var timers=jQuery.timers;for(var i=0;i<timers.length;
i++){if(!timers[i]()){timers.splice(i--,1)}}if(!timers.length){jQuery.fx.stop()}},interval:13,stop:function(){clearInterval(timerId);
timerId=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(fx){jQuery.style(fx.elem,"opacity",fx.now)
},_default:function(fx){if(fx.elem.style&&fx.elem.style[fx.prop]!=null){fx.elem.style[fx.prop]=(fx.prop==="width"||fx.prop==="height"?Math.max(0,fx.now):fx.now)+fx.unit
}else{fx.elem[fx.prop]=fx.now}}}});if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem
}).length}}function defaultDisplay(nodeName){if(!elemdisplay[nodeName]){var elem=jQuery("<"+nodeName+">").appendTo("body"),display=elem.css("display");
elem.remove();if(display==="none"||display===""){display="block"}elemdisplay[nodeName]=display
}return elemdisplay[nodeName]}var rtable=/^t(?:able|d|h)$/i,rroot=/^(?:body|html)$/i;
if("getBoundingClientRect" in document.documentElement){jQuery.fn.offset=function(options){var elem=this[0],box;
if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i)})
}if(!elem||!elem.ownerDocument){return null}if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem)
}try{box=elem.getBoundingClientRect()}catch(e){}var doc=elem.ownerDocument,docElem=doc.documentElement;
if(!box||!jQuery.contains(docElem,elem)){return box||{top:0,left:0}}var body=doc.body,win=getWindow(doc),clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,scrollTop=(win.pageYOffset||jQuery.support.boxModel&&docElem.scrollTop||body.scrollTop),scrollLeft=(win.pageXOffset||jQuery.support.boxModel&&docElem.scrollLeft||body.scrollLeft),top=box.top+scrollTop-clientTop,left=box.left+scrollLeft-clientLeft;
return{top:top,left:left}}}else{jQuery.fn.offset=function(options){var elem=this[0];
if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i)})
}if(!elem||!elem.ownerDocument){return null}if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem)
}jQuery.offset.initialize();var computedStyle,offsetParent=elem.offsetParent,prevOffsetParent=elem,doc=elem.ownerDocument,docElem=doc.documentElement,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle,top=elem.offsetTop,left=elem.offsetLeft;
while((elem=elem.parentNode)&&elem!==body&&elem!==docElem){if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){break
}computedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle;
top-=elem.scrollTop;left-=elem.scrollLeft;if(elem===offsetParent){top+=elem.offsetTop;
left+=elem.offsetLeft;if(jQuery.offset.doesNotAddBorder&&!(jQuery.offset.doesAddBorderForTableAndCells&&rtable.test(elem.nodeName))){top+=parseFloat(computedStyle.borderTopWidth)||0;
left+=parseFloat(computedStyle.borderLeftWidth)||0}prevOffsetParent=offsetParent;
offsetParent=elem.offsetParent}if(jQuery.offset.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){top+=parseFloat(computedStyle.borderTopWidth)||0;
left+=parseFloat(computedStyle.borderLeftWidth)||0}prevComputedStyle=computedStyle
}if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){top+=body.offsetTop;
left+=body.offsetLeft}if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){top+=Math.max(docElem.scrollTop,body.scrollTop);
left+=Math.max(docElem.scrollLeft,body.scrollLeft)}return{top:top,left:left}}}jQuery.offset={initialize:function(){var body=document.body,container=document.createElement("div"),innerDiv,checkDiv,table,td,bodyMarginTop=parseFloat(jQuery.css(body,"marginTop"))||0,html="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
jQuery.extend(container.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});
container.innerHTML=html;body.insertBefore(container,body.firstChild);innerDiv=container.firstChild;
checkDiv=innerDiv.firstChild;td=innerDiv.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(checkDiv.offsetTop!==5);
this.doesAddBorderForTableAndCells=(td.offsetTop===5);checkDiv.style.position="fixed";
checkDiv.style.top="20px";this.supportsFixedPosition=(checkDiv.offsetTop===20||checkDiv.offsetTop===15);
checkDiv.style.position=checkDiv.style.top="";innerDiv.style.overflow="hidden";innerDiv.style.position="relative";
this.subtractsBorderForOverflowNotVisible=(checkDiv.offsetTop===-5);this.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==bodyMarginTop);
body.removeChild(container);body=container=innerDiv=checkDiv=table=td=null;jQuery.offset.initialize=jQuery.noop
},bodyOffset:function(body){var top=body.offsetTop,left=body.offsetLeft;jQuery.offset.initialize();
if(jQuery.offset.doesNotIncludeMarginInBodyOffset){top+=parseFloat(jQuery.css(body,"marginTop"))||0;
left+=parseFloat(jQuery.css(body,"marginLeft"))||0}return{top:top,left:left}},setOffset:function(elem,options,i){var position=jQuery.css(elem,"position");
if(position==="static"){elem.style.position="relative"}var curElem=jQuery(elem),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=(position==="absolute"&&jQuery.inArray("auto",[curCSSTop,curCSSLeft])>-1),props={},curPosition={},curTop,curLeft;
if(calculatePosition){curPosition=curElem.position()}curTop=calculatePosition?curPosition.top:parseInt(curCSSTop,10)||0;
curLeft=calculatePosition?curPosition.left:parseInt(curCSSLeft,10)||0;if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset)
}if(options.top!=null){props.top=(options.top-curOffset.top)+curTop}if(options.left!=null){props.left=(options.left-curOffset.left)+curLeft
}if("using" in options){options.using.call(elem,props)}else{curElem.css(props)}}};
jQuery.fn.extend({position:function(){if(!this[0]){return null}var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=rroot.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();
offset.top-=parseFloat(jQuery.css(elem,"marginTop"))||0;offset.left-=parseFloat(jQuery.css(elem,"marginLeft"))||0;
parentOffset.top+=parseFloat(jQuery.css(offsetParent[0],"borderTopWidth"))||0;parentOffset.left+=parseFloat(jQuery.css(offsetParent[0],"borderLeftWidth"))||0;
return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}},offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent||document.body;
while(offsetParent&&(!rroot.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent
}return offsetParent})}});jQuery.each(["Left","Top"],function(i,name){var method="scroll"+name;
jQuery.fn[method]=function(val){var elem=this[0],win;if(!elem){return null}if(val!==undefined){return this.each(function(){win=getWindow(this);
if(win){win.scrollTo(!i?val:jQuery(win).scrollLeft(),i?val:jQuery(win).scrollTop())
}else{this[method]=val}})}else{win=getWindow(elem);return win?("pageXOffset" in win)?win[i?"pageYOffset":"pageXOffset"]:jQuery.support.boxModel&&win.document.documentElement[method]||win.document.body[method]:elem[method]
}}});function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false
}jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn["inner"+name]=function(){return this[0]?parseFloat(jQuery.css(this[0],type,"padding")):null
};jQuery.fn["outer"+name]=function(margin){return this[0]?parseFloat(jQuery.css(this[0],type,margin?"margin":"border")):null
};jQuery.fn[type]=function(size){var elem=this[0];if(!elem){return size==null?null:this
}if(jQuery.isFunction(size)){return this.each(function(i){var self=jQuery(this);self[type](size.call(this,i,self[type]()))
})}if(jQuery.isWindow(elem)){return elem.document.compatMode==="CSS1Compat"&&elem.document.documentElement["client"+name]||elem.document.body["client"+name]
}else{if(elem.nodeType===9){return Math.max(elem.documentElement["client"+name],elem.body["scroll"+name],elem.documentElement["scroll"+name],elem.body["offset"+name],elem.documentElement["offset"+name])
}else{if(size===undefined){var orig=jQuery.css(elem,type),ret=parseFloat(orig);return jQuery.isNaN(ret)?orig:ret
}else{return this.css(type,typeof size==="string"?size:size+"px")}}}}})})(window);
jQuery.Buffer=(function(){var Buffer=function(elem){if(elem){this.assign(elem)}this._bufferedCommandList=[];
this._bufferedCommands={}};Buffer._buffers=[];Buffer._pool=[];Buffer.bufferForElement=function(elem){if(elem._jquery_buffer){return elem._jquery_buffer
}return this.bufferFromPool().assign(elem)};Buffer.bufferFromPool=function(){var buffer=null;
if(this._pool.length===0){buffer=new Buffer()}else{buffer=this._pool.pop()}Buffer._buffers.push(buffer);
if(!this.flushingScheduled){this.scheduleFlushing()}return buffer};Buffer.returnToPool=function(buffer){buffer.unassign();
this._pool.push(buffer)};Buffer.scheduleFlushing=function(){this.flushingScheduled=true
};Buffer.flush=function(){var buffers=this._buffers,idx,len=buffers.length;for(idx=0;
idx<len;idx++){buffers[idx].flush();this.returnToPool(buffers[idx])}this._buffers=[];
this.flushingScheduled=false};Buffer.prototype.assign=function(elem){if(this._el){this.unassign()
}this._el=elem;this._el._jquery_buffer=this;return this};Buffer.prototype.unassign=function(){if(!this._el){return
}this._el._jquery_buffer=undefined;this._el=undefined;return this};Buffer.prototype.flush=function(){var commands=this._bufferedCommandList,len=commands.length,idx,c;
for(idx=0;idx<len;idx++){c=commands[idx];this[c](this._bufferedCommands[c]);delete this._bufferedCommands[c]
}this._bufferedCommandList.length=0;this.unassign()};Buffer.prototype.$=function(selector,context){if(!context){context=this._el
}if(selector===""||selector===undefined){selector=context;context=undefined}return jQuery(selector,context)
};Buffer.prototype.bufferedCommand=function(command){if(!this._bufferedCommands[command]){this._bufferedCommands[command]={};
this._bufferedCommandList.push(command)}return this._bufferedCommands[command]};Buffer.prototype.hasBufferedCommand=function(command){return !!this._bufferedCommands[command]
};Buffer.prototype.html=function(value){var context=this.bufferedCommand("flushContent");
if(value===undefined){return context.text||context.html||this.$().html()}context.text=undefined;
context.html=value};Buffer.prototype.text=function(value){var context=this.bufferedCommand("flushContent");
if(value===undefined){return context.text||context.html||this.$().text()}context.text=value;
context.html=undefined};Buffer.prototype.flushContent=function(context){if(context.text!==undefined){this.$().text(context.text)
}else{if(context.html!==undefined){this.$().html(context.html)}}};Buffer.prototype.attr=function(key,value){if(typeof key==="object"){for(var k in key){this.attr(k,key[k])
}return}if(key==="class"){if(value===undefined){return this.setClass(value).join(" ")
}else{return this.setClass(value)}}else{if(key==="html"){return this.html(value)}else{if(key==="text"){return this.text(value)
}else{if(key==="style"){return this.resetStyles(value)}}}}var context=this.bufferedCommand("flushAttributes");
if(!context.attr){context.attr={}}context.attr[key]=value};Buffer.prototype.flushAttributes=function(context){var attr=context.attr,cq=this.$(),v;
for(var key in attr){if(!attr.hasOwnProperty(key)){continue}v=attr[key];if(v!==null){cq.attr(key,v)
}else{cq.removeAttr(key)}}};Buffer.prototype._STYLE_REGEX=/-?\s*([^:\s]+)\s*:\s*([^;]+)\s*;?/g;
Buffer.prototype._camelizeStyleName=function(name){var needsCap=name.match(/^-(webkit|moz|o)-/),camelized=name.camelize();
if(needsCap){return camelized.substr(0,1).toUpperCase()+camelized.substr(1)}else{return camelized
}};Buffer.prototype._dasherizeStyleName=function(name){var dasherized=name.dasherize();
if(dasherized.match(/^(webkit|moz|ms|o)-/)){dasherized="-"+dasherized}return dasherized
};Buffer.prototype._loadStyles=function(attr){if(!attr){attr=this.$().attr("style")
}if(attr&&(attr=attr.toString()).length>0){if(SC.browser.msie){attr=attr.toLowerCase()
}var styles={};var regex=this._STYLE_REGEX,match;regex.lastIndex=0;while(match=regex.exec(attr)){styles[this._camelizeStyleName(match[1])]=match[2]
}return styles}else{return{}}};Buffer.prototype.resetStyles=function(styles){var context=this.bufferedCommand("flushStyles");
context._styles=this._loadStyles(styles||" ")};Buffer.prototype.styles=function(){var context=this.bufferedCommand("flushStyles");
if(!context._styles){context._styles=this._loadStyles()}return context._styles};Buffer.prototype.css=function(key,value){if(typeof key==="object"){for(var k in key){this.css(k,key[k])
}return}var context=this.bufferedCommand("flushStyles");if(!context._styles){context._styles=this._loadStyles()
}context._styles[key]=value};Buffer.prototype.flushStyles=function(context){var styles=context._styles;
var str="";var key,value,props=[],idx=0;for(key in styles){if(!styles.hasOwnProperty(key)){continue
}value=styles[key];if(value===null){continue}if(typeof value==="number"&&key!=="zIndex"&&key!=="fontWeight"&&key!=="opacity"){value+="px"
}props[idx++]=this._dasherizeStyleName(key)+": "+value}this.$().attr("style",props.join("; "))
};Buffer.prototype._hashFromClassNames=function(classNames){if(typeof classNames==="string"){classNames=classNames.split(" ")
}var idx,len=classNames.length,ret={};for(idx=0;idx<len;idx++){ret[classNames[idx]]=true
}return ret};Buffer.prototype.setClass=function(value,on){var context=this.bufferedCommand("flushClassNames"),key;
if(value===undefined){if(!context.classNames){context.classNames=this._hashFromClassNames(this._el.className)
}var classNames=context.classNames,v=[];for(key in classNames){if(key&&classNames[key]){v.push(key)
}}return v}if(on!==undefined){if(!context.classNames){context.classNames=this._hashFromClassNames(this._el.className)
}context.classNames[value]=on||NO;return}if(typeof value==="string"||jQuery.isArray(value)){context.classNames=this._hashFromClassNames(value);
return}if(typeof value==="object"){if(!context.classNames){context.classNames=this._hashFromClassNames(this._el.className)
}for(key in value){context.classNames[key]=value[key]}}};Buffer.prototype.hasClass=function(className){var context=this.bufferedCommand("flushClassNames");
if(!context.classNames){context.classNames=this._hashFromClassNames(this._el.className)
}return !!context.classNames[className]};Buffer.prototype.addClass=function(value){if(!value){return
}var context=this.bufferedCommand("flushClassNames");if(!context.classNames){context.classNames=this._hashFromClassNames(this._el.className)
}if(typeof value==="string"){value=value.split(" ")}var idx,len=value.length;for(idx=0;
idx<len;idx++){context.classNames[jQuery.trim(value[idx])]=true}};Buffer.prototype.removeClass=function(value){var context=this.bufferedCommand("flushClassNames");
if(!context.classNames){context.classNames=this._hashFromClassNames(this._el.className)
}context.classNames[value]=false};Buffer.prototype.resetClassNames=function(value){var context=this.bufferedCommand("flushClassNames");
context.classNames={}};Buffer.prototype.flushClassNames=function(context){var classNames=[];
var c=context.classNames,k;for(k in c){if(c[k]){classNames.push(k)}}this.$().attr("class",classNames.join(" "))
};function dn(o){for(var key in o){if(typeof o[key]==="function"){o[key].displayName=key
}}}dn(Buffer);dn(Buffer.prototype);return Buffer})();(function(){jQuery.buffer=jQuery.bufferedJQuery=function(selector,context){return new jQuery.bufferedJQuery.prototype.init(selector,context)
};var T=function(){};T.prototype=jQuery.fn;jQuery.bufferedJQuery.prototype=new T();
jQuery._isBuffering=0;jQuery.bufferedJQuery.prototype.init=function(selector,context){jQuery._isBuffering++;
var ret=jQuery.fn.init.call(this,selector,context);ret.isBuffered=true;jQuery._isBuffering--;
return ret};jQuery.bufferedJQuery.prototype.init.prototype=jQuery.bufferedJQuery.prototype;
var base=jQuery.fn;jQuery.fn.extend({buffers:function(){var len=this.length,i,r=[];
for(i=0;i<len;i++){r.push(jQuery.Buffer.bufferForElement(this[i]))}return r}});jQuery.fn._jqb_originalFind=jQuery.fn.find;
jQuery.fn.find=function(selector){if(jQuery._isBuffering<=0&&!this.isBuffered){return jQuery.fn._jqb_originalFind.call(this,selector)
}var ret=jQuery.buffer(),length=0;for(var i=0,l=this.length;i<l;i++){length=ret.length;
jQuery.find(selector,this[i],ret);if(i>0){for(var n=length;n<ret.length;n++){for(var r=0;
r<length;r++){if(ret[r]===ret[n]){ret.splice(n--,1);break}}}}}return ret};jQuery.extend(jQuery.bufferedJQuery.prototype,{html:function(value){if(value===undefined){if(this.length<1){return undefined
}return jQuery.Buffer.bufferForElement(this[i]).html()}var len=this.length,i;for(i=0;
i<len;i++){var buffer=jQuery.Buffer.bufferForElement(this[i]);buffer.html(value)}return this
},text:function(value){if(value===undefined){if(this.length<1){return undefined}return jQuery.Buffer.bufferForElement(this[i]).text()
}var len=this.length,i;for(i=0;i<len;i++){var buffer=jQuery.Buffer.bufferForElement(this[i]);
buffer.text(value)}return this},attr:function(key,value){if(typeof value==="undefined"&&typeof key==="string"){if(this.length<1){return false
}var buffer=jQuery.Buffer.bufferForElement(this[0]);return buffer.attr(key)}var len=this.length,i;
for(i=0;i<len;i++){var buffer=jQuery.Buffer.bufferForElement(this[i]);buffer.attr(key,value)
}return this},hasClass:function(className){if(this.length<1){return false}return jQuery.Buffer.bufferForElement(this[0]).hasClass(className)
},setClass:function(value,on){var len=this.length,i;for(i=0;i<len;i++){var buffer=jQuery.Buffer.bufferForElement(this[i]);
buffer.setClass(value,on)}return this},addClass:function(value){var len=this.length,i;
for(i=0;i<len;i++){var buffer=jQuery.Buffer.bufferForElement(this[i]);buffer.addClass(value)
}return this},removeClass:function(value){var len=this.length,i;for(i=0;i<len;i++){var buffer=jQuery.Buffer.bufferForElement(this[i]);
buffer.removeClass(value)}return this},resetClassNames:function(){var len=this.length,i;
for(i=0;i<len;i++){var buffer=jQuery.Buffer.bufferForElement(this[i]);buffer.resetClassNames()
}return this},css:function(key,value){var len=this.length,i;for(i=0;i<len;i++){var buffer=jQuery.Buffer.bufferForElement(this[i]);
buffer.css(key,value)}return this},styles:function(){if(this.length<1){return null
}return jQuery.Buffer.bufferForElement(this[0]).styles()},resetStyles:function(){if(this.length<1){return null
}jQuery.Buffer.bufferForElement(this[0]).resetStyles();return this}})})();jQuery.Buffer.scheduleFlushing=function(){SC.RunLoop.currentRunLoop.invokeOnce(function(){jQuery.Buffer.flush()
});this.flushingScheduled=true};if(!window.require){window.require=function require(){}
}if(!window.sc_require){window.sc_require=require}if(!window.sc_resource){window.sc_resource=function sc_resource(){}
}sc_require("license");window.YES=true;window.NO=false;if(typeof console==="undefined"){window.console={};
console.log=console.info=console.warn=console.error=function(){}}window.SC=window.SC||{};
window.SproutCore=window.SproutCore||SC;SC.VERSION="1.5.0.pre.4";SC._baseMixin=function(override){var args=Array.prototype.slice.call(arguments,1),src,target=args[0]||{},idx=1,length=args.length,options,copy,key;
if(length===1){target=this||{};idx=0}for(;idx<length;idx++){if(!(options=args[idx])){continue
}for(key in options){if(!options.hasOwnProperty(key)){continue}copy=options[key];
if(target===copy){continue}if(copy!==undefined&&(override||(target[key]===undefined))){target[key]=copy
}}}return target};SC.mixin=function(){var args=Array.prototype.slice.call(arguments);
args.unshift(true);return SC._baseMixin.apply(this,args)};SC.supplement=function(){var args=Array.prototype.slice.call(arguments);
args.unshift(false);return SC._baseMixin.apply(this,args)};SC.extend=SC.mixin;SC.mixin({T_ERROR:"error",T_OBJECT:"object",T_NULL:"null",T_CLASS:"class",T_HASH:"hash",T_FUNCTION:"function",T_UNDEFINED:"undefined",T_NUMBER:"number",T_BOOL:"boolean",T_ARRAY:"array",T_STRING:"string",typeOf:function(item){if(item===undefined){return SC.T_UNDEFINED
}if(item===null){return SC.T_NULL}var nativeType=jQuery.type(item);if(nativeType==="function"){return item.isClass?SC.T_CLASS:SC.T_FUNCTION
}else{if(nativeType==="object"){if(item.isError){return SC.T_ERROR}else{if(item.isObject){return SC.T_OBJECT
}else{return SC.T_HASH}}}}return nativeType},none:function(obj){return obj==null},empty:function(obj){return obj===null||obj===undefined||obj===""
},isArray:function(obj){if(!obj||obj.setInterval){return false}else{if(obj.objectAt){return true
}else{if(obj.length!==undefined&&jQuery.type(obj)==="object"){return true}}}return false
},makeArray:function(obj){return SC.isArray(obj)?obj:SC.A(obj)},A:function(obj){if(obj===null||obj===undefined){return[]
}if(obj.slice instanceof Function){if(typeof(obj)==="string"){return[obj]}else{return obj.slice()
}}if(obj.toArray){return obj.toArray()}if(!SC.isArray(obj)){return[obj]}var ret=[],len=obj.length;
while(--len>=0){ret[len]=obj[len]}return ret},guidKey:jQuery.expando||("SproutCore"+(SC.VERSION+Math.random()).replace(/\D/g,"")),_guidPrefixes:{number:"nu",string:"st"},_guidCaches:{number:{},string:{}},_numberGuids:[],_stringGuids:{},_keyCache:{},guidFor:function(obj){var cache,ret,type=typeof obj;
if(obj===undefined){return"(undefined)"}if(obj===null){return"(null)"}if(type===SC.T_NUMBER||type===SC.T_STRING){cache=this._guidCaches[type];
ret=cache[obj];if(!ret){ret="st"+(jQuery.uuid++);cache[obj]=ret}return ret}else{if(type===SC.T_BOOL){return(obj)?"(true)":"(false)"
}}var guidKey=this.guidKey;if(obj[guidKey]){return obj[guidKey]}if(obj===Object){return"(Object)"
}if(obj===Array){return"(Array)"}return SC.generateGuid(obj,"sc")},keyFor:function(prefix,key){var ret,pcache=this._keyCache[prefix];
if(!pcache){pcache=this._keyCache[prefix]={}}ret=pcache[key];if(!ret){ret=pcache[key]=prefix+"_"+key
}return ret},generateGuid:function(obj,prefix){var ret=(prefix+(jQuery.uuid++));if(obj){obj[this.guidKey]=ret
}return ret},hashFor:function(){var l=arguments.length,h="",obj,f,i;for(i=0;i<l;++i){obj=arguments[i];
h+=(obj&&(f=obj.hash)&&(typeof f===SC.T_FUNCTION))?f.call(obj):this.guidFor(obj)}return h===""?null:h
},isEqual:function(a,b){return this.hashFor(a)===this.hashFor(b)},compare:function(v,w){if(v===w){return 0
}var type1=SC.typeOf(v);var type2=SC.typeOf(w);var mapping=SC.ORDER_DEFINITION_MAPPING;
if(!mapping){var order=SC.ORDER_DEFINITION;mapping=SC.ORDER_DEFINITION_MAPPING={};
var idx,len;for(idx=0,len=order.length;idx<len;++idx){mapping[order[idx]]=idx}delete SC.ORDER_DEFINITION
}var type1Index=mapping[type1];var type2Index=mapping[type2];if(type1Index<type2Index){return -1
}if(type1Index>type2Index){return 1}switch(type1){case SC.T_BOOL:case SC.T_NUMBER:if(v<w){return -1
}if(v>w){return 1}return 0;case SC.T_STRING:var comp=v.localeCompare(w);if(comp<0){return -1
}if(comp>0){return 1}return 0;case SC.T_ARRAY:var vLen=v.length;var wLen=w.length;
var l=Math.min(vLen,wLen);var r=0;var i=0;var thisFunc=arguments.callee;while(r===0&&i<l){r=thisFunc(v[i],w[i]);
i++}if(r!==0){return r}if(vLen<wLen){return -1}if(vLen>wLen){return 1}return 0;case SC.T_OBJECT:if(v.constructor.isComparable===YES){return v.constructor.compare(v,w)
}return 0;default:return 0}},K:function(){return this},EMPTY_ARRAY:[],EMPTY_HASH:{},EMPTY_RANGE:{start:0,length:0},beget:function(obj){if(obj===null||obj===undefined){return null
}var K=SC.K;K.prototype=obj;var ret=new K();K.prototype=null;if(typeof obj.didBeget==="function"){ret=obj.didBeget(ret)
}return ret},copy:function(object,deep){var ret=object,idx;if(object){if(object.isCopyable){return object.copy(deep)
}if(object.clone){return object.clone()}}switch(jQuery.type(object)){case"array":ret=object.slice();
if(deep){idx=ret.length;while(idx--){ret[idx]=SC.copy(ret[idx],true)}}break;case"object":ret={};
for(var key in object){ret[key]=deep?SC.copy(object[key],true):object[key]}}return ret
},merge:function(){var ret={},len=arguments.length,idx;for(idx=0;idx<len;idx++){SC.mixin(ret,arguments[idx])
}return ret},keys:function(obj){var ret=[];for(var key in obj){ret.push(key)}return ret
},inspect:function(obj){var v,ret=[];for(var key in obj){v=obj[key];if(v==="toString"){continue
}if(SC.typeOf(v)===SC.T_FUNCTION){v="function() { ... }"}ret.push(key+": "+v)}return"{"+ret.join(" , ")+"}"
},tupleForPropertyPath:function(path,root){if(typeof path==="object"&&(path instanceof Array)){return path
}var key;var stopAt=path.indexOf("*");if(stopAt<0){stopAt=path.lastIndexOf(".")}key=(stopAt>=0)?path.slice(stopAt+1):path;
var obj=this.objectForPropertyPath(path,root,stopAt);return(obj&&key)?[obj,key]:null
},objectForPropertyPath:function(path,root,stopAt){var loc,nextDotAt,key,max;if(!root){root=window
}if(SC.typeOf(path)===SC.T_STRING){if(stopAt===undefined){stopAt=path.length}loc=0;
while((root)&&(loc<stopAt)){nextDotAt=path.indexOf(".",loc);if((nextDotAt<0)||(nextDotAt>stopAt)){nextDotAt=stopAt
}key=path.slice(loc,nextDotAt);root=root.get?root.get(key):root[key];loc=nextDotAt+1
}if(loc<stopAt){root=undefined}}else{loc=0;max=path.length;key=null;while((loc<max)&&root){key=path[loc++];
if(key){root=(root.get)?root.get(key):root[key]}}if(loc<max){root=undefined}}return root
},STRINGS:{},stringsFor:function(lang,strings){SC.mixin(SC.STRINGS,strings);return this
}});SC.clone=SC.copy;SC.$A=SC.A;SC.didLoad=SC.K;SC.ORDER_DEFINITION=[SC.T_ERROR,SC.T_UNDEFINED,SC.T_NULL,SC.T_BOOL,SC.T_NUMBER,SC.T_STRING,SC.T_ARRAY,SC.T_HASH,SC.T_OBJECT,SC.T_FUNCTION,SC.T_CLASS];
SC.Function={property:function(fn,keys){fn.dependentKeys=SC.$A(keys);var guid=SC.guidFor(fn);
fn.cacheKey="__cache__"+guid;fn.lastSetValueKey="__lastValue__"+guid;fn.isProperty=true;
return fn},cacheable:function(fn,aFlag){fn.isProperty=true;if(!fn.dependentKeys){fn.dependentKeys=[]
}fn.isCacheable=(aFlag===undefined)?true:aFlag;return fn},idempotent:function(fn,aFlag){fn.isProperty=true;
if(!fn.dependentKeys){this.dependentKeys=[]}fn.isVolatile=(aFlag===undefined)?true:aFlag;
return fn},enhance:function(fn){fn.isEnhancement=true;return fn},observes:function(fn,propertyPaths){var loc=propertyPaths.length,local=null,paths=null;
while(--loc>=0){var path=propertyPaths[loc];if((path.indexOf(".")<0)&&(path.indexOf("*")<0)){if(!local){local=fn.localPropertyPaths=[]
}local.push(path)}else{if(!paths){paths=fn.propertyPaths=[]}paths.push(path)}}return fn
}};SC.mixin(Function.prototype,{property:function(){return SC.Function.property(this,arguments)
},cacheable:function(aFlag){return SC.Function.cacheable(this,aFlag)},idempotent:function(aFlag){return SC.Function.idempotent(this,aFlag)
},enhance:function(){return SC.Function.enhance(this)},observes:function(propertyPaths){return SC.Function.observes(this,arguments)
}});SC.CoreString={fmt:function(str,formats){var idx=0;return str.replace(/%@([0-9]+)?/g,function(s,argIndex){argIndex=(argIndex)?parseInt(argIndex,0)-1:idx++;
s=formats[argIndex];return((s===null)?"(null)":(s===undefined)?"":s).toString()})
},loc:function(str,formats){str=SC.STRINGS[str]||str;return SC.CoreString.fmt(str,arguments)
},w:function(str){var ary=[],ary2=str.split(" "),len=ary2.length,string,idx=0;for(idx=0;
idx<len;++idx){string=ary2[idx];if(string.length!==0){ary.push(string)}}return ary
}};SC.mixin(String.prototype,{fmt:function(){return SC.CoreString.fmt(this,arguments)
},loc:function(){return SC.CoreString.loc(this,arguments)},w:function(){return SC.CoreString.w(this)
}});if(!Date.now){Date.now=function(){return new Date().getTime()}}SC.ObserverSet={add:function(target,method,context){var targetGuid=SC.guidFor(target),methodGuid=SC.guidFor(method);
var targets=this._members,members=this.members;var indexes=targets[targetGuid];if(!indexes){indexes=targets[targetGuid]={}
}if(indexes[methodGuid]===undefined){indexes[methodGuid]=members.length}else{return
}members.push([target,method,context])},remove:function(target,method){var targetGuid=SC.guidFor(target),methodGuid=SC.guidFor(method);
var indexes=this._members[targetGuid],members=this.members;if(!indexes){return false
}var index=indexes[methodGuid];if(index===undefined){return false}if(index!==members.length-1){var entry=(members[index]=members[members.length-1]);
this._members[SC.guidFor(entry[0])][SC.guidFor(entry[1])]=index}members.pop();delete this._members[targetGuid][methodGuid];
return true},invokeMethods:function(){var members=this.members,member;for(var i=0,l=members.length;
i<l;i++){member=members[i];member[1].call(member[0])}},clone:function(){var newSet=SC.ObserverSet.create(),memberArray=this.members;
newSet._members=SC.clone(this._members);var newMembers=newSet.members;for(var i=0,l=memberArray.length;
i<l;i++){newMembers[i]=SC.clone(memberArray[i]);newMembers[i].length=3}return newSet
},create:function(){return new SC.ObserverSet.constructor()},getMembers:function(){return this.members.slice(0)
},constructor:function(){this._members={};this.members=[]}};SC.ObserverSet.constructor.prototype=SC.ObserverSet;
SC.ObserverSet.slice=SC.ObserverSet.clone;SC._ChainObserver=function(property,root){this.property=property;
this.root=root||this};SC._ChainObserver.createChain=function(rootObject,path,target,method,context){var parts=path.split("."),root=new SC._ChainObserver(parts[0]),tail=root;
for(var i=1,l=parts.length;i<l;i++){tail=tail.next=new SC._ChainObserver(parts[i],root)
}var tails=root.tails=[tail];root.objectDidChange(rootObject);tails.forEach(function(tail){tail.target=target;
tail.method=method;tail.context=context});root.tails=null;return root};SC._ChainObserver.prototype={isChainObserver:true,object:null,property:null,next:null,root:null,target:null,method:null,tail:function(){if(this._tail){return this._tail
}var tail=this;while(tail.next){tail=tail.next}this._tail=tail;return tail},objectDidChange:function(newObject){if(newObject===this.object){return
}if(this.object&&this.object.removeObserver){this.object.removeObserver(this.property,this,this.propertyDidChange)
}this.object=newObject;if(this.property==="@each"&&this.next){if(this.object&&this.object.addEnumerableObserver){this.object.addEnumerableObserver(this.next.property,this,this.propertyDidChange)
}}else{if(this.object&&this.object.addObserver){this.object.addObserver(this.property,this,this.propertyDidChange)
}this.propertyDidChange()}},propertyDidChange:function(){var object=this.object;var property=this.property;
var value=(object&&object.get)?object.get(property):null;if(this.next){this.next.objectDidChange(value)
}var target=this.target,method=this.method,context=this.context;if(target&&method){var rev=object?object.propertyRevision:null;
if(context){method.call(target,object,property,value,context,rev)}else{method.call(target,object,property,value,rev)
}}},destroyChain:function(){var obj=this.object;if(obj&&obj.removeObserver){obj.removeObserver(this.property,this,this.propertyDidChange)
}if(this.next){this.next.destroyChain()}this.next=this.target=this.method=this.object=this.context=null;
return null}};sc_require("private/observer_set");sc_require("private/chain_observer");
SC.LOG_OBSERVERS=NO;SC.Observable={isObservable:YES,automaticallyNotifiesObserversFor:function(key){return YES
},get:function(key){var ret=this[key],cache;if(ret===undefined){return this.unknownProperty(key)
}else{if(ret&&ret.isProperty){if(ret.isCacheable){cache=this._kvo_cache;if(!cache){cache=this._kvo_cache={}
}return(cache[ret.cacheKey]!==undefined)?cache[ret.cacheKey]:(cache[ret.cacheKey]=ret.call(this,key))
}else{return ret.call(this,key)}}else{return ret}}},set:function(key,value){var func=this[key],notify=this.automaticallyNotifiesObserversFor(key),ret=value,cachedep,cache,idx,dfunc;
if(value===undefined&&SC.typeOf(key)===SC.T_HASH){var hash=key;for(key in hash){if(!hash.hasOwnProperty(key)){continue
}this.set(key,hash[key])}return this}if(!notify&&this._kvo_cacheable&&(cache=this._kvo_cache)){cachedep=this._kvo_cachedep;
if(!cachedep||(cachedep=cachedep[key])===undefined){cachedep=this._kvo_computeCachedDependentsFor(key)
}if(cachedep){idx=cachedep.length;while(--idx>=0){dfunc=cachedep[idx];cache[dfunc.cacheKey]=cache[dfunc.lastSetValueKey]=undefined
}}}if(func&&func.isProperty){cache=this._kvo_cache;if(func.isVolatile||!cache||(cache[func.lastSetValueKey]!==value)){if(!cache){cache=this._kvo_cache={}
}cache[func.lastSetValueKey]=value;if(notify){this.propertyWillChange(key)}ret=func.call(this,key,value);
if(func.isCacheable){cache[func.cacheKey]=ret}if(notify){this.propertyDidChange(key,ret,YES)
}}}else{if(func===undefined){if(notify){this.propertyWillChange(key)}this.unknownProperty(key,value);
if(notify){this.propertyDidChange(key,ret)}}else{if(this[key]!==value){if(notify){this.propertyWillChange(key)
}ret=this[key]=value;if(notify){this.propertyDidChange(key,ret)}}}}return this},unknownProperty:function(key,value){if(!(value===undefined)){this[key]=value
}return value},beginPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;
return this},endPropertyChanges:function(){this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;
var level=this._kvo_changeLevel,changes=this._kvo_changes;if((level<=0)&&changes&&(changes.length>0)&&!SC.Observers.isObservingSuspended){this._notifyPropertyObservers()
}return this},propertyWillChange:function(key){return this},propertyDidChange:function(key,value,_keepCache){this._kvo_revision=(this._kvo_revision||0)+1;
var level=this._kvo_changeLevel||0,cachedep,idx,dfunc,cache,func,log=SC.LOG_OBSERVERS&&!(this.LOG_OBSERVING===NO);
if(cache=this._kvo_cache){if(!_keepCache){func=this[key];if(func&&func.isProperty){cache[func.cacheKey]=cache[func.lastSetValueKey]=undefined
}}if(this._kvo_cacheable){cachedep=this._kvo_cachedep;if(!cachedep||(cachedep=cachedep[key])===undefined){cachedep=this._kvo_computeCachedDependentsFor(key)
}if(cachedep){idx=cachedep.length;while(--idx>=0){dfunc=cachedep[idx];cache[dfunc.cacheKey]=cache[dfunc.lastSetValueKey]=undefined
}}}}var suspended=SC.Observers.isObservingSuspended;if((level>0)||suspended){var changes=this._kvo_changes;
if(!changes){changes=this._kvo_changes=SC.CoreSet.create()}changes.add(key);if(suspended){if(log){SC.Logger.log("%@%@: will not notify observers because observing is suspended".fmt(SC.KVO_SPACES,this))
}SC.Observers.objectHasPendingChanges(this)}}else{this._notifyPropertyObservers(key)
}return this},registerDependentKey:function(key,dependentKeys){var dependents=this._kvo_dependents,func=this[key],keys,idx,lim,dep,queue;
if(typeof dependentKeys==="object"&&(dependentKeys instanceof Array)){keys=dependentKeys;
lim=0}else{keys=arguments;lim=1}idx=keys.length;if(!dependents){this._kvo_dependents=dependents={}
}while(--idx>=lim){dep=keys[idx];if(dep.indexOf(".")>=0){this.addObserver(dep,this,function(){this.propertyDidChange(key)
})}else{queue=dependents[dep];if(!queue){queue=dependents[dep]=[]}queue.push(key)
}}},_kvo_addCachedDependents:function(queue,keys,dependents,seen){var idx=keys.length,func,key,deps;
while(--idx>=0){key=keys[idx];seen.add(key);func=this[key];if(func&&(func instanceof Function)&&func.isProperty){if(func.isCacheable){queue.push(func)
}if((deps=dependents[key])&&deps.length>0){this._kvo_addCachedDependents(queue,deps,dependents,seen)
}}}},_kvo_computeCachedDependentsFor:function(key){var cached=this._kvo_cachedep,dependents=this._kvo_dependents,keys=dependents?dependents[key]:null,queue,seen;
if(!cached){cached=this._kvo_cachedep={}}if(!keys||keys.length===0){return cached[key]=null
}queue=cached[key]=[];seen=SC._TMP_SEEN_SET=(SC._TMP_SEEN_SET||SC.CoreSet.create());
seen.add(key);this._kvo_addCachedDependents(queue,keys,dependents,seen);seen.clear();
if(queue.length===0){queue=cached[key]=null}return queue},_kvo_for:function(kvoKey,type){var ret=this[kvoKey];
if(!this._kvo_cloned){this._kvo_cloned={}}if(!ret){ret=this[kvoKey]=(type===undefined)?[]:type.create();
this._kvo_cloned[kvoKey]=YES}else{if(!this._kvo_cloned[kvoKey]){ret=this[kvoKey]=ret.copy();
this._kvo_cloned[kvoKey]=YES}}return ret},addObserver:function(key,target,method,context){var kvoKey,chain,chains,observers;
if(method===undefined){method=target;target=this}if(!target){target=this}if(typeof method==="string"){method=target[method]
}if(!method){throw"You must pass a method to addObserver()"}key=key.toString();if(key.indexOf(".")>=0){chain=SC._ChainObserver.createChain(this,key,target,method,context);
chain.masterTarget=target;chain.masterMethod=method;this._kvo_for(SC.keyFor("_kvo_chains",key)).push(chain)
}else{if((this[key]===undefined)&&(key.indexOf("@")===0)){this.get(key)}if(target===this){target=null
}kvoKey=SC.keyFor("_kvo_observers",key);this._kvo_for(kvoKey,SC.ObserverSet).add(target,method,context);
this._kvo_for("_kvo_observed_keys",SC.CoreSet).add(key)}if(this.didAddObserver){this.didAddObserver(key,target,method)
}return this},removeObserver:function(key,target,method){var kvoKey,chains,chain,observers,idx;
if(method===undefined){method=target;target=this}if(!target){target=this}if(typeof method==="string"){method=target[method]
}if(!method){throw"You must pass a method to removeObserver()"}key=key.toString();
if(key.indexOf(".")>=0){kvoKey=SC.keyFor("_kvo_chains",key);if(chains=this[kvoKey]){chains=this._kvo_for(kvoKey);
idx=chains.length;while(--idx>=0){chain=chains[idx];if(chain&&(chain.masterTarget===target)&&(chain.masterMethod===method)){chains[idx]=chain.destroyChain()
}}}}else{if(target===this){target=null}kvoKey=SC.keyFor("_kvo_observers",key);if(observers=this[kvoKey]){observers=this._kvo_for(kvoKey);
observers.remove(target,method);if(observers.getMembers().length===0){this._kvo_for("_kvo_observed_keys",SC.CoreSet).remove(key)
}}}if(this.didRemoveObserver){this.didRemoveObserver(key,target,method)}return this
},hasObserverFor:function(key){SC.Observers.flush(this);var observers=this[SC.keyFor("_kvo_observers",key)],locals=this[SC.keyFor("_kvo_local",key)],members;
if(locals&&locals.length>0){return YES}if(observers&&observers.getMembers().length>0){return YES
}return NO},initObservable:function(){if(this._observableInited){return}this._observableInited=YES;
var loc,keys,key,value,observer,propertyPaths,propertyPathsLength,len,ploc,path,dotIndex,root,propertyKey,keysLen;
if(keys=this._observers){len=keys.length;for(loc=0;loc<len;loc++){key=keys[loc];observer=this[key];
propertyPaths=observer.propertyPaths;propertyPathsLength=(propertyPaths)?propertyPaths.length:0;
for(ploc=0;ploc<propertyPathsLength;ploc++){path=propertyPaths[ploc];dotIndex=path.indexOf(".");
if(dotIndex<0){this.addObserver(path,this,observer)}else{if(path.indexOf("*")===0){this.addObserver(path.slice(1),this,observer)
}else{root=null;if(dotIndex===0){root=this;path=path.slice(1)}else{if(dotIndex===4&&path.slice(0,5)==="this."){root=this;
path=path.slice(5)}else{if(dotIndex<0&&path.length===4&&path==="this"){root=this;
path=""}}}SC.Observers.addObserver(path,this,observer,root)}}}}}this.bindings=[];
if(keys=this._bindings){for(loc=0,keysLen=keys.length;loc<keysLen;loc++){key=keys[loc];
value=this[key];propertyKey=key.slice(0,-7);this[key]=this.bind(propertyKey,value)
}}if(keys=this._properties){for(loc=0,keysLen=keys.length;loc<keysLen;loc++){key=keys[loc];
if(value=this[key]){if(value.isCacheable){this._kvo_cacheable=YES}if(value.dependentKeys&&(value.dependentKeys.length>0)){this.registerDependentKey(key,value.dependentKeys)
}}}}},observersForKey:function(key){var observers=this._kvo_for("_kvo_observers",key);
return observers.getMembers()},_notifyPropertyObservers:function(key){if(!this._observableInited){this.initObservable()
}SC.Observers.flush(this);var log=SC.LOG_OBSERVERS&&!(this.LOG_OBSERVING===NO),observers,changes,dependents,starObservers,idx,keys,rev,members,membersLength,member,memberLoc,target,method,loc,func,context,spaces,cache;
if(log){spaces=SC.KVO_SPACES=(SC.KVO_SPACES||"")+"  ";SC.Logger.log('%@%@: notifying observers after change to key "%@"'.fmt(spaces,this,key))
}starObservers=this["_kvo_observers_*"];this._kvo_changeLevel=(this._kvo_changeLevel||0)+1;
while(((changes=this._kvo_changes)&&(changes.length>0))||key){rev=++this.propertyRevision;
if(!changes){changes=SC.CoreSet.create()}this._kvo_changes=null;if(key==="*"){changes.add("*");
changes.addEach(this._kvo_for("_kvo_observed_keys",SC.CoreSet))}else{if(key){changes.add(key)
}}if(dependents=this._kvo_dependents){for(idx=0;idx<changes.length;idx++){key=changes[idx];
keys=dependents[key];if(keys&&(loc=keys.length)){if(log){SC.Logger.log("%@...including dependent keys for %@: %@".fmt(spaces,key,keys))
}cache=this._kvo_cache;if(!cache){cache=this._kvo_cache={}}while(--loc>=0){changes.add(key=keys[loc]);
if(func=this[key]){this[func.cacheKey]=undefined;cache[func.cacheKey]=cache[func.lastSetValueKey]=undefined
}}}}}while(changes.length>0){key=changes.pop();observers=this[SC.keyFor("_kvo_observers",key)];
if(observers){members=SC.clone(observers.getMembers());membersLength=members.length;
for(memberLoc=0;memberLoc<membersLength;memberLoc++){member=members[memberLoc];if(member[3]===rev){continue
}if(!member[1]){SC.Logger.log(member)}target=member[0]||this;method=member[1];context=member[2];
member[3]=rev;if(log){SC.Logger.log('%@...firing observer on %@ for key "%@"'.fmt(spaces,target,key))
}if(context!==undefined){method.call(target,this,key,null,context,rev)}else{method.call(target,this,key,null,rev)
}}}members=this[SC.keyFor("_kvo_local",key)];if(members){membersLength=members.length;
for(memberLoc=0;memberLoc<membersLength;memberLoc++){member=members[memberLoc];method=this[member];
if(method){if(log){SC.Logger.log('%@...firing local observer %@.%@ for key "%@"'.fmt(spaces,this,member,key))
}method.call(this,this,key,null,rev)}}}if(starObservers&&key!=="*"){members=SC.clone(starObservers.getMembers());
membersLength=members.length;for(memberLoc=0;memberLoc<membersLength;memberLoc++){member=members[memberLoc];
target=member[0]||this;method=member[1];context=member[2];if(log){SC.Logger.log('%@...firing * observer on %@ for key "%@"'.fmt(spaces,target,key))
}if(context!==undefined){method.call(target,this,key,null,context,rev)}else{method.call(target,this,key,null,rev)
}}}if(this.propertyObserver){if(log){SC.Logger.log('%@...firing %@.propertyObserver for key "%@"'.fmt(spaces,this,key))
}this.propertyObserver(this,key,null,rev)}}if(changes){changes.destroy()}key=null
}this._kvo_changeLevel=(this._kvo_changeLevel||1)-1;if(log){SC.KVO_SPACES=spaces.slice(0,-2)
}return YES},bind:function(toKey,target,method){var binding,pathType;if(method!==undefined){target=[target,method]
}pathType=typeof target;if(pathType==="string"||(pathType==="object"&&(target instanceof Array))){binding=this[toKey+"BindingDefault"]||SC.Binding;
binding=binding.beget().from(target)}else{binding=target}binding=binding.to(toKey,this).connect();
this.bindings.push(binding);return binding},didChangeFor:function(context){var valueCache,revisionCache,seenValues,seenRevisions,ret,currentRevision,idx,key,value;
context=SC.hashFor(context);valueCache=this._kvo_didChange_valueCache;if(!valueCache){valueCache=this._kvo_didChange_valueCache={}
}revisionCache=this._kvo_didChange_revisionCache;if(!revisionCache){revisionCache=this._kvo_didChange_revisionCache={}
}seenValues=valueCache[context]||{};seenRevisions=revisionCache[context]||{};ret=false;
currentRevision=this._kvo_revision||0;idx=arguments.length;while(--idx>=1){key=arguments[idx];
if(seenRevisions[key]!=currentRevision){value=this.get(key);if(seenValues[key]!==value){ret=true;
seenValues[key]=value}}seenRevisions[key]=currentRevision}valueCache[context]=seenValues;
revisionCache[context]=seenRevisions;return ret},setIfChanged:function(key,value){if(value===undefined&&SC.typeOf(key)===SC.T_HASH){var hash=key;
for(key in hash){if(!hash.hasOwnProperty(key)){continue}this.setIfChanged(key,hash[key])
}return this}return(this.get(key)!==value)?this.set(key,value):this},getPath:function(path){var tuple=SC.tupleForPropertyPath(path,this);
if(tuple===null||tuple[0]===null){return undefined}return SC.get(tuple[0],tuple[1])
},setPath:function(path,value){if(path.indexOf(".")>=0){var tuple=SC.tupleForPropertyPath(path,this);
if(!tuple||!tuple[0]){return null}tuple[0].set(tuple[1],value)}else{this.set(path,value)
}return this},setPathIfChanged:function(path,value){if(path.indexOf(".")>=0){var tuple=SC.tupleForPropertyPath(path,this);
if(!tuple||!tuple[0]){return null}if(tuple[0].get(tuple[1])!==value){tuple[0].set(tuple[1],value)
}}else{this.setIfChanged(path,value)}return this},getEach:function(){var keys=SC.A(arguments),ret=[],idx,idxLen;
for(idx=0,idxLen=keys.length;idx<idxLen;idx++){ret[ret.length]=this.getPath(keys[idx])
}return ret},incrementProperty:function(key,increment){if(!increment){increment=1
}this.set(key,(this.get(key)||0)+increment);return this.get(key)},decrementProperty:function(key,increment){if(!increment){increment=1
}this.set(key,(this.get(key)||0)-increment);return this.get(key)},toggleProperty:function(key,value,alt){if(value===undefined){value=true
}if(alt===undefined){alt=false}value=(this.get(key)==value)?alt:value;this.set(key,value);
return this.get(key)},notifyPropertyChange:function(key,value){this.propertyWillChange(key);
this.propertyDidChange(key,value);return this},allPropertiesDidChange:function(){this._kvo_cache=null;
this._notifyPropertyObservers("*");return this},addProbe:function(key){this.addObserver(key,SC.logChange)
},removeProbe:function(key){this.removeObserver(key,SC.logChange)},logProperty:function(){var props=SC.$A(arguments),prop,propsLen,idx;
for(idx=0,propsLen=props.length;idx<propsLen;idx++){prop=props[idx];SC.Logger.log("%@:%@: ".fmt(SC.guidFor(this),prop),this.get(prop))
}},propertyRevision:1};SC.logChange=function logChange(target,key,value){SC.Logger.log("CHANGE: %@[%@] => %@".fmt(target,key,target.get(key)))
};SC.mixin(SC,{get:function(object,key){if(!object){return undefined}if(key===undefined){return this[object]
}if(object.get){return object.get(key)}return object[key]}});SC.mixin(Array.prototype,SC.Observable);
SC.Enumerator=function(enumerableObject){this.enumerable=enumerableObject;this.reset();
return this};SC.Enumerator.prototype={nextObject:function(){var index=this._index;
var len=this._length;if(index>=len){return undefined}var ret=this.enumerable.nextObject(index,this._previousObject,this._context);
this._previousObject=ret;this._index=index+1;if(index>=len){this._context=SC.Enumerator._pushContext(this._context)
}return ret},reset:function(){var e=this.enumerable;if(!e){throw SC.$error("Enumerator has been destroyed")
}this._length=e.get?e.get("length"):e.length;var len=this._length;this._index=0;this._previousObject=null;
this._context=(len>0)?SC.Enumerator._popContext():null},destroy:function(){this.enumerable=this._length=this._index=this._previousObject=this._context=null
}};SC.Enumerator.create=function(enumerableObject){return new SC.Enumerator(enumerableObject)
};SC.Enumerator._popContext=function(){var ret=this._contextCache?this._contextCache.pop():null;
return ret||{}};SC.Enumerator._pushContext=function(context){this._contextCache=this._contextCache||[];
var cache=this._contextCache;cache.push(context);return null};sc_require("core");
sc_require("system/enumerator");SC.Enumerable={isEnumerable:YES,nextObject:function(index,previousObject,context){return this.objectAt?this.objectAt(index):this[index]
},firstObject:function(){if(this.get("length")===0){return undefined}if(this.objectAt){return this.objectAt(0)
}var context=SC.Enumerator._popContext(),ret;ret=this.nextObject(0,null,context);
context=SC.Enumerator._pushContext(context);return ret}.property(),lastObject:function(){var len=this.get("length");
if(len===0){return undefined}if(this.objectAt){return this.objectAt(len-1)}}.property(),enumerator:function(){return SC.Enumerator.create(this)
},forEach:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}var len=this.get?this.get("length"):this.length;if(target===undefined){target=null
}var last=null;var context=SC.Enumerator._popContext();for(var idx=0;idx<len;idx++){var next=this.nextObject(idx,last,context);
callback.call(target,next,idx,this);last=next}last=null;context=SC.Enumerator._pushContext(context);
return this},getEach:function(key){return this.map(function(next){return next?(next.get?next.get(key):next[key]):null
},this)},setEach:function(key,value){this.forEach(function(next){if(next){if(next.set){next.set(key,value)
}else{next[key]=value}}},this);return this},map:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}var len=this.get?this.get("length"):this.length;if(target===undefined){target=null
}var ret=[];var last=null;var context=SC.Enumerator._popContext();for(var idx=0;idx<len;
idx++){var next=this.nextObject(idx,last,context);ret[idx]=callback.call(target,next,idx,this);
last=next}last=null;context=SC.Enumerator._pushContext(context);return ret},mapProperty:function(key){return this.map(function(next){return next?(next.get?next.get(key):next[key]):null
})},filter:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}var len=this.get?this.get("length"):this.length;if(target===undefined){target=null
}var ret=[];var last=null;var context=SC.Enumerator._popContext();for(var idx=0;idx<len;
idx++){var next=this.nextObject(idx,last,context);if(callback.call(target,next,idx,this)){ret.push(next)
}last=next}last=null;context=SC.Enumerator._pushContext(context);return ret},sortProperty:function(key){var keys=(typeof key===SC.T_STRING)?arguments:key,len=keys.length,src;
if(this instanceof Array){src=this}else{src=[];this.forEach(function(i){src.push(i)
})}if(!src){return[]}return src.sort(function(a,b){var idx,key,aValue,bValue,ret=0;
for(idx=0;ret===0&&idx<len;idx++){key=keys[idx];aValue=a?(a.get?a.get(key):a[key]):null;
bValue=b?(b.get?b.get(key):b[key]):null;ret=SC.compare(aValue,bValue)}return ret})
},filterProperty:function(key,value){var len=this.get?this.get("length"):this.length;
var ret=[];var last=null;var context=SC.Enumerator._popContext();for(var idx=0;idx<len;
idx++){var next=this.nextObject(idx,last,context);var cur=next?(next.get?next.get(key):next[key]):null;
var matched=(value===undefined)?!!cur:SC.isEqual(cur,value);if(matched){ret.push(next)
}last=next}last=null;context=SC.Enumerator._pushContext(context);return ret},find:function(callback,target){var len=this.get?this.get("length"):this.length;
if(target===undefined){target=null}var last=null,next,found=NO,ret=null;var context=SC.Enumerator._popContext();
for(var idx=0;idx<len&&!found;idx++){next=this.nextObject(idx,last,context);if(found=callback.call(target,next,idx,this)){ret=next
}last=next}next=last=null;context=SC.Enumerator._pushContext(context);return ret},findProperty:function(key,value){var len=this.get?this.get("length"):this.length;
var found=NO,ret=null,last=null,next,cur;var context=SC.Enumerator._popContext();
for(var idx=0;idx<len&&!found;idx++){next=this.nextObject(idx,last,context);cur=next?(next.get?next.get(key):next[key]):null;
found=(value===undefined)?!!cur:SC.isEqual(cur,value);if(found){ret=next}last=next
}last=next=null;context=SC.Enumerator._pushContext(context);return ret},every:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}var len=this.get?this.get("length"):this.length;if(target===undefined){target=null
}var ret=YES;var last=null;var context=SC.Enumerator._popContext();for(var idx=0;
ret&&(idx<len);idx++){var next=this.nextObject(idx,last,context);if(!callback.call(target,next,idx,this)){ret=NO
}last=next}last=null;context=SC.Enumerator._pushContext(context);return ret},everyProperty:function(key,value){var len=this.get?this.get("length"):this.length;
var ret=YES;var last=null;var context=SC.Enumerator._popContext();for(var idx=0;ret&&(idx<len);
idx++){var next=this.nextObject(idx,last,context);var cur=next?(next.get?next.get(key):next[key]):null;
ret=(value===undefined)?!!cur:SC.isEqual(cur,value);last=next}last=null;context=SC.Enumerator._pushContext(context);
return ret},some:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}var len=this.get?this.get("length"):this.length;if(target===undefined){target=null
}var ret=NO;var last=null;var context=SC.Enumerator._popContext();for(var idx=0;(!ret)&&(idx<len);
idx++){var next=this.nextObject(idx,last,context);if(callback.call(target,next,idx,this)){ret=YES
}last=next}last=null;context=SC.Enumerator._pushContext(context);return ret},someProperty:function(key,value){var len=this.get?this.get("length"):this.length;
var ret=NO;var last=null;var context=SC.Enumerator._popContext();for(var idx=0;!ret&&(idx<len);
idx++){var next=this.nextObject(idx,last,context);var cur=next?(next.get?next.get(key):next[key]):null;
ret=(value===undefined)?!!cur:SC.isEqual(cur,value);last=next}last=null;context=SC.Enumerator._pushContext(context);
return ret},reduce:function(callback,initialValue,reducerProperty){if(typeof callback!=="function"){throw new TypeError()
}var len=this.get?this.get("length"):this.length;if(len===0&&initialValue===undefined){throw new TypeError()
}var ret=initialValue;var last=null;var context=SC.Enumerator._popContext();for(var idx=0;
idx<len;idx++){var next=this.nextObject(idx,last,context);if(next!==null){if(ret===undefined){ret=next
}else{ret=callback.call(null,ret,next,idx,this,reducerProperty)}}last=next}last=null;
context=SC.Enumerator._pushContext(context);if(ret===undefined){throw new TypeError()
}return ret},invoke:function(methodName){var len=this.get?this.get("length"):this.length;
if(len<=0){return[]}var idx;var args=[];var alen=arguments.length;if(alen>1){for(idx=1;
idx<alen;idx++){args.push(arguments[idx])}}var ret=[];var last=null;var context=SC.Enumerator._popContext();
for(idx=0;idx<len;idx++){var next=this.nextObject(idx,last,context);var method=next?next[methodName]:null;
if(method){ret[idx]=method.apply(next,args)}last=next}last=null;context=SC.Enumerator._pushContext(context);
return ret},invokeWhile:function(targetValue,methodName){var len=this.get?this.get("length"):this.length;
if(len<=0){return null}var idx;var args=[];var alen=arguments.length;if(alen>2){for(idx=2;
idx<alen;idx++){args.push(arguments[idx])}}var ret=targetValue;var last=null;var context=SC.Enumerator._popContext();
for(idx=0;(ret===targetValue)&&(idx<len);idx++){var next=this.nextObject(idx,last,context);
var method=next?next[methodName]:null;if(method){ret=method.apply(next,args)}last=next
}last=null;context=SC.Enumerator._pushContext(context);return ret},toArray:function(){var ret=[];
this.forEach(function(o){ret.push(o)},this);return ret},groupBy:function(key){var len=this.get?this.get("length"):this.length,ret=[],last=null,context=SC.Enumerator._popContext(),grouped=[],keyValues=[],idx,next,cur;
for(idx=0;idx<len;idx++){next=this.nextObject(idx,last,context);cur=next?(next.get?next.get(key):next[key]):null;
if(SC.none(grouped[cur])){grouped[cur]=[];keyValues.push(cur)}grouped[cur].push(next);
last=next}last=null;context=SC.Enumerator._pushContext(context);for(idx=0,len=keyValues.length;
idx<len;idx++){ret.push(grouped[keyValues[idx]])}return ret}};SC._buildReducerFor=function(reducerKey,reducerProperty){return function(key,value){var reducer=this[reducerKey];
if(SC.typeOf(reducer)!==SC.T_FUNCTION){return this.unknownProperty?this.unknownProperty(key,value):null
}else{var ret=SC.Enumerable.reduce.call(this,reducer,null,reducerProperty);return ret
}}.property("[]")};SC.Reducers={"[]":function(key,value){return this}.property(),enumerableContentDidChange:function(start,length,delta,addedObjects,removedObjects){this._setupEnumerableObservers(addedObjects,removedObjects);
this.notifyPropertyChange("[]");return this},_resumeChainObservingForItemWithChainObserver:function(item,chainObserver){var observer=SC.clone(chainObserver.next);
var key=observer.property;observer.object=item;item.addObserver(key,observer,observer.propertyDidChange);
if(chainObserver.root.tails){chainObserver.root.tails.pushObject(observer.tail())
}observer.propertyDidChange();item._kvo_for(SC.keyFor("_kvo_enumerable_observers",key)).push(observer)
},_setupEnumerableObservers:function(addedObjects,removedObjects){if(!addedObjects){addedObjects=this
}if(!removedObjects){removedObjects=[]}var observedKeys=this._kvo_for("_kvo_enumerable_observed_keys",SC.CoreSet);
var kvoKey;if(observedKeys.get("length")>0){removedObjects.forEach(function(item){item._kvo_for("_kvo_enumerable_observers").forEach(function(observer){if(observer.object===this){item.removeObserver(observer.key,observer,observer.propertyDidChange)
}})});observedKeys.forEach(function(key){kvoKey=SC.keyFor("_kvo_enumerable_observers",key);
var lastObserver;this._kvo_for(kvoKey).forEach(function(observer){if(!addedObjects.get("length")&&!removedObjects.get("length")){lastObserver=observer;
while(lastObserver.next){lastObserver=lastObserver.next}lastObserver.propertyDidChange()
}else{addedObjects.forEach(function(item){this._resumeChainObservingForItemWithChainObserver(item,observer)
},this)}},this)},this)}},addEnumerableObserver:function(key,target,action){this._kvo_for("_kvo_enumerable_observed_keys",SC.CoreSet).push(key);
var kvoKey=SC.keyFor("_kvo_enumerable_observers",key);this._kvo_for(kvoKey).push(target);
this._setupEnumerableObservers(this)},reducedProperty:function(key,value,generateProperty){if(!key||typeof key!==SC.T_STRING||key.charAt(0)!=="@"){return undefined
}var matches=key.match(/^@([^(]*)(\(([^)]*)\))?$/);if(!matches||matches.length<2){return undefined
}var reducerKey=matches[1];var reducerProperty=matches[3];reducerKey="reduce"+reducerKey.slice(0,1).toUpperCase()+reducerKey.slice(1);
var reducer=this[reducerKey];if(SC.typeOf(reducer)!==SC.T_FUNCTION){return undefined
}if(generateProperty===NO){return SC.Enumerable.reduce.call(this,reducer,null,reducerProperty)
}var func=SC._buildReducerFor(reducerKey,reducerProperty);var p=this.constructor.prototype;
if(p){p[key]=func;var props=p._properties||[];props.push(key);p._properties=props;
this.registerDependentKey(key,"[]")}return SC.Enumerable.reduce.call(this,reducer,null,reducerProperty)
},reduceMax:function(previousValue,item,index,e,reducerProperty){if(reducerProperty&&item){item=item.get?item.get(reducerProperty):item[reducerProperty]
}if(previousValue===null){return item}return(item>previousValue)?item:previousValue
},reduceMaxObject:function(previousItem,item,index,e,reducerProperty){var previousValue=previousItem,itemValue=item;
if(reducerProperty){if(item){itemValue=item.get?item.get(reducerProperty):item[reducerProperty]
}if(previousItem){previousValue=previousItem.get?previousItem.get(reducerProperty):previousItem[reducerProperty]
}}if(previousValue===null){return item}return(itemValue>previousValue)?item:previousItem
},reduceMin:function(previousValue,item,index,e,reducerProperty){if(reducerProperty&&item){item=item.get?item.get(reducerProperty):item[reducerProperty]
}if(previousValue===null){return item}return(item<previousValue)?item:previousValue
},reduceMinObject:function(previousItem,item,index,e,reducerProperty){var previousValue=previousItem,itemValue=item;
if(reducerProperty){if(item){itemValue=item.get?item.get(reducerProperty):item[reducerProperty]
}if(previousItem){previousValue=previousItem.get?previousItem.get(reducerProperty):previousItem[reducerProperty]
}}if(previousValue===null){return item}return(itemValue<previousValue)?item:previousItem
},reduceAverage:function(previousValue,item,index,e,reducerProperty){if(reducerProperty&&item){item=item.get?item.get(reducerProperty):item[reducerProperty]
}var ret=(previousValue||0)+item;var len=e.get?e.get("length"):e.length;if(index>=len-1){ret=ret/len
}return ret},reduceSum:function(previousValue,item,index,e,reducerProperty){if(reducerProperty&&item){item=item.get?item.get(reducerProperty):item[reducerProperty]
}return(previousValue===null)?item:previousValue+item}};SC.mixin(SC.Enumerable,SC.Reducers);
SC.mixin(Array.prototype,SC.Reducers);Array.prototype.isEnumerable=YES;(function(){var alwaysMixin={nextObject:SC.Enumerable.nextObject,enumerator:SC.Enumerable.enumerator,firstObject:SC.Enumerable.firstObject,lastObject:SC.Enumerable.lastObject,sortProperty:SC.Enumerable.sortProperty,mapProperty:function(key){var len=this.length;
var ret=[];for(var idx=0;idx<len;idx++){var next=this[idx];ret[idx]=next?(next.get?next.get(key):next[key]):null
}return ret},filterProperty:function(key,value){var len=this.length;var ret=[];for(var idx=0;
idx<len;idx++){var next=this[idx];var cur=next?(next.get?next.get(key):next[key]):null;
var matched=(value===undefined)?!!cur:SC.isEqual(cur,value);if(matched){ret.push(next)
}}return ret},groupBy:function(key){var len=this.length,ret=[],grouped=[],keyValues=[],idx,next,cur;
for(idx=0;idx<len;idx++){next=this[idx];cur=next?(next.get?next.get(key):next[key]):null;
if(SC.none(grouped[cur])){grouped[cur]=[];keyValues.push(cur)}grouped[cur].push(next)
}for(idx=0,len=keyValues.length;idx<len;idx++){ret.push(grouped[keyValues[idx]])}return ret
},find:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}var len=this.length;if(target===undefined){target=null}var next,ret=null,found=NO;
for(var idx=0;idx<len&&!found;idx++){next=this[idx];if(found=callback.call(target,next,idx,this)){ret=next
}}next=null;return ret},findProperty:function(key,value){var len=this.length;var next,cur,found=NO,ret=null;
for(var idx=0;idx<len&&!found;idx++){cur=(next=this[idx])?(next.get?next.get(key):next[key]):null;
found=(value===undefined)?!!cur:SC.isEqual(cur,value);if(found){ret=next}}next=null;
return ret},everyProperty:function(key,value){var len=this.length;var ret=YES;for(var idx=0;
ret&&(idx<len);idx++){var next=this[idx];var cur=next?(next.get?next.get(key):next[key]):null;
ret=(value===undefined)?!!cur:SC.isEqual(cur,value)}return ret},someProperty:function(key,value){var len=this.length;
var ret=NO;for(var idx=0;!ret&&(idx<len);idx++){var next=this[idx];var cur=next?(next.get?next.get(key):next[key]):null;
ret=(value===undefined)?!!cur:SC.isEqual(cur,value)}return ret},invoke:function(methodName){var len=this.length;
if(len<=0){return[]}var idx;var args=[];var alen=arguments.length;if(alen>1){for(idx=1;
idx<alen;idx++){args.push(arguments[idx])}}var ret=[];for(idx=0;idx<len;idx++){var next=this[idx];
var method=next?next[methodName]:null;if(method){ret[idx]=method.apply(next,args)
}}return ret},invokeWhile:function(targetValue,methodName){var len=this.length;if(len<=0){return null
}var idx;var args=[];var alen=arguments.length;if(alen>2){for(idx=2;idx<alen;idx++){args.push(arguments[idx])
}}var ret=targetValue;for(idx=0;(ret===targetValue)&&(idx<len);idx++){var next=this[idx];
var method=next?next[methodName]:null;if(method){ret=method.apply(next,args)}}return ret
},toArray:function(){var len=this.length;if(len<=0){return[]}var ret=[];for(var idx=0;
idx<len;idx++){var next=this[idx];ret.push(next)}return ret},getEach:function(key){var ret=[];
var len=this.length;for(var idx=0;idx<len;idx++){var obj=this[idx];ret[idx]=obj?(obj.get?obj.get(key):obj[key]):null
}return ret},setEach:function(key,value){var len=this.length;for(var idx=0;idx<len;
idx++){var obj=this[idx];if(obj){if(obj.set){obj.set(key,value)}else{obj[key]=value
}}}return this}};var mixinIfMissing={forEach:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}if(target===undefined){target=null}for(var i=0,l=this.length;i<l;i++){var next=this[i];
callback.call(target,next,i,this)}return this},map:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}if(target===undefined){target=null}var ret=[];for(var i=0,l=this.length;i<l;i++){var next=this[i];
ret[i]=callback.call(target,next,i,this)}return ret},filter:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}if(target===undefined){target=null}var ret=[];for(var i=0,l=this.length;i<l;i++){var next=this[i];
if(callback.call(target,next,i,this)){ret.push(next)}}return ret},every:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}var len=this.length;if(target===undefined){target=null}var ret=YES;for(var idx=0;
ret&&(idx<len);idx++){var next=this[idx];if(!callback.call(target,next,idx,this)){ret=NO
}}return ret},some:function(callback,target){if(typeof callback!=="function"){throw new TypeError()
}var len=this.length;if(target===undefined){target=null}var ret=NO;for(var idx=0;
(!ret)&&(idx<len);idx++){var next=this[idx];if(callback.call(target,next,idx,this)){ret=YES
}}return ret},reduce:function(callback,initialValue,reducerProperty){if(typeof callback!=="function"){throw new TypeError()
}var len=this.length;if(len===0&&initialValue===undefined){throw new TypeError()}var ret=initialValue;
for(var idx=0;idx<len;idx++){var next=this[idx];if(next!==null){if(ret===undefined){ret=next
}else{ret=callback.call(null,ret,next,idx,this,reducerProperty)}}}if(ret===undefined){throw new TypeError()
}return ret}};for(var key in mixinIfMissing){if(!mixinIfMissing.hasOwnProperty(key)){continue
}if(!Array.prototype[key]||((typeof Prototype==="object")&&Prototype.Version.match(/^1\.6/))){Array.prototype[key]=mixinIfMissing[key]
}}SC.mixin(Array.prototype,alwaysMixin)})();SC.RangeObserver={isRangeObserver:YES,toString:function(){var base=this.indexes?this.indexes.toString():"SC.IndexSet<..>";
return base.replace("IndexSet","RangeObserver(%@)".fmt(SC.guidFor(this)))},create:function(source,indexSet,target,method,context,isDeep){var ret=SC.beget(this);
ret.source=source;ret.indexes=indexSet?indexSet.frozenCopy():null;ret.target=target;
ret.method=method;ret.context=context;ret.isDeep=isDeep||false;ret.beginObserving();
return ret},extend:function(attrs){var ret=SC.beget(this),args=arguments;for(var i=0,l=args.length;
i<l;i++){SC.mixin(ret,args[i])}return ret},destroy:function(source){this.endObserving();
return this},update:function(source,indexSet){if(this.indexes&&this.indexes.isEqual(indexSet)){return this
}this.indexes=indexSet?indexSet.frozenCopy():null;this.endObserving().beginObserving();
return this},beginObserving:function(){if(!this.isDeep){return this}var observing=this.observing=this.observing||SC.CoreSet.create();
var func=this._beginObservingForEach,source=this.source;if(!func){func=this._beginObservingForEach=function(idx){var obj=source.objectAt(idx);
if(obj&&obj.addObserver){observing.push(obj);obj._kvo_needsRangeObserver=true}}}this.indexes.forEach(func);
this.isObserving=false;SC.Observers.addPendingRangeObserver(this);return this},setupPending:function(object){var observing=this.observing;
if(this.isObserving||!observing||(observing.get("length")===0)){return true}if(observing.contains(object)){this.isObserving=true;
var func=this._setupPendingForEach;if(!func){var source=this.source,method=this.objectPropertyDidChange,self=this;
func=this._setupPendingForEach=function(idx){var obj=source.objectAt(idx),guid=SC.guidFor(obj),key;
if(obj&&obj.addObserver){observing.push(obj);obj.addObserver("*",self,method);key=self[guid];
if(key==null){self[guid]=idx}else{if(key.isIndexSet){key.add(idx)}else{self[guid]=SC.IndexSet.create(key).add(idx)
}}}}}this.indexes.forEach(func);return true}else{return false}},endObserving:function(){if(!this.isDeep){return this
}var observing=this.observing;if(this.isObserving){var meth=this.objectPropertyDidChange,source=this.source,idx,lim,obj;
if(observing){lim=observing.length;for(idx=0;idx<lim;idx++){obj=observing[idx];obj.removeObserver("*",this,meth);
this[SC.guidFor(obj)]=null}observing.length=0}this.isObserving=false}if(observing){observing.clear()
}return this},rangeDidChange:function(changes){var indexes=this.indexes;if(!changes||!indexes||indexes.intersects(changes)){this.endObserving();
this.method.call(this.target,this.source,null,"[]",changes,this.context);this.beginObserving()
}return this},objectPropertyDidChange:function(object,key,value,rev){var context=this.context,method=this.method,guid=SC.guidFor(object),index=this[guid];
if(index&&!index.isIndexSet){index=this[guid]=SC.IndexSet.create(index).freeze()}method.call(this.target,this.source,object,key,index,context||rev,rev)
}};sc_require("mixins/observable");sc_require("mixins/enumerable");sc_require("system/range_observer");
SC.OUT_OF_RANGE_EXCEPTION="Index out of range";SC.Array={isSCArray:YES,replace:function(idx,amt,objects){throw"replace() must be implemented to support SC.Array"
},objectAt:function(idx){if(idx<0){return undefined}if(idx>=this.get("length")){return undefined
}return this.get(idx)},"[]":function(key,value){if(value!==undefined){this.replace(0,this.get("length"),value)
}return this}.property(),insertAt:function(idx,object){if(idx>this.get("length")){throw SC.OUT_OF_RANGE_EXCEPTION
}this.replace(idx,0,[object]);return this},removeAt:function(start,length){var delta=0,empty=[];
if(typeof start===SC.T_NUMBER){if((start<0)||(start>=this.get("length"))){throw SC.OUT_OF_RANGE_EXCEPTION
}if(length===undefined){this.replace(start,1,empty);return this}else{start=SC.IndexSet.create(start,length)
}}this.beginPropertyChanges();start.forEachRange(function(start,length){start-=delta;
delta+=length;this.replace(start,length,empty)},this);this.endPropertyChanges();return this
},removeObject:function(obj){var loc=this.get("length")||0;while(--loc>=0){var curObject=this.objectAt(loc);
if(curObject==obj){this.removeAt(loc)}}return this},removeObjects:function(objects){this.beginPropertyChanges();
objects.forEach(function(obj){this.removeObject(obj)},this);this.endPropertyChanges();
return this},pushObject:function(obj){this.insertAt(this.get("length"),obj);return obj
},pushObjects:function(objects){this.beginPropertyChanges();objects.forEach(function(obj){this.pushObject(obj)
},this);this.endPropertyChanges();return this},popObject:function(){var len=this.get("length");
if(len===0){return null}var ret=this.objectAt(len-1);this.removeAt(len-1);return ret
},shiftObject:function(){if(this.get("length")===0){return null}var ret=this.objectAt(0);
this.removeAt(0);return ret},unshiftObject:function(obj){this.insertAt(0,obj);return obj
},unshiftObjects:function(objects){this.beginPropertyChanges();objects.forEach(function(obj){this.unshiftObject(obj)
},this);this.endPropertyChanges();return this},isEqual:function(ary){if(!ary){return false
}if(ary==this){return true}var loc=ary.get("length");if(loc!=this.get("length")){return false
}while(--loc>=0){if(!SC.isEqual(ary.objectAt(loc),this.objectAt(loc))){return false
}}return true},compact:function(){return this.without(null)},without:function(value){if(this.indexOf(value)<0){return this
}var ret=[];this.forEach(function(k){if(k!==value){ret[ret.length]=k}});return ret
},uniq:function(){var ret=[];this.forEach(function(k){if(ret.indexOf(k)<0){ret[ret.length]=k
}});return ret},max:function(){return Math.max.apply(Math,this)},min:function(){return Math.min.apply(Math,this)
},rangeObserverClass:SC.RangeObserver,contains:function(obj){return this.indexOf(obj)>=0
},addRangeObserver:function(indexes,target,method,context){var rangeob=this._array_rangeObservers;
if(!rangeob){rangeob=this._array_rangeObservers=SC.CoreSet.create()}if(this._array_oldLength===undefined){this._array_oldLength=this.get("length")
}var C=this.rangeObserverClass;var isDeep=NO;var ret=C.create(this,indexes,target,method,context,isDeep);
rangeob.add(ret);if(!this._array_isNotifyingRangeObservers){this._array_isNotifyingRangeObservers=YES;
this.addObserver("[]",this,this._array_notifyRangeObservers)}return ret},updateRangeObserver:function(rangeObserver,indexes){return rangeObserver.update(this,indexes)
},removeRangeObserver:function(rangeObserver){var ret=rangeObserver.destroy(this);
var rangeob=this._array_rangeObservers;if(rangeob){rangeob.remove(rangeObserver)}return ret
},enumerableContentDidChange:function(start,amt,delta,addedObjects,removedObjects){var rangeob=this._array_rangeObservers,oldlen=this._array_oldLength,newlen,length,changes;
this.beginPropertyChanges();this.notifyPropertyChange("length");if(rangeob&&rangeob.length>0){if(oldlen===undefined){oldlen=0
}this._array_oldLength=newlen=this.get("length");if(start===undefined){start=0}if(delta===undefined){delta=newlen-oldlen
}if(delta!==0||amt===undefined){length=newlen-start;if(delta<0){length-=delta}}else{length=amt
}changes=this._array_rangeChanges;if(!changes){changes=this._array_rangeChanges=SC.IndexSet.create()
}changes.add(start,length)}this._setupEnumerableObservers(addedObjects,removedObjects);
this.notifyPropertyChange("[]");this.endPropertyChanges();return this},_array_notifyRangeObservers:function(){var rangeob=this._array_rangeObservers,changes=this._array_rangeChanges,len=rangeob?rangeob.length:0,idx,cur;
if(len>0&&changes&&changes.length>0){for(idx=0;idx<len;idx++){rangeob[idx].rangeDidChange(changes)
}changes.clear()}}};SC.mixin(Array.prototype,SC.Array);SC.Array=SC.mixin({},SC.Enumerable,SC.Array);
SC.Array.slice=function(beginIndex,endIndex){var ret=[];var length=this.get("length");
if(SC.none(beginIndex)){beginIndex=0}if(SC.none(endIndex)||(endIndex>length)){endIndex=length
}while(beginIndex<endIndex){ret[ret.length]=this.objectAt(beginIndex++)}return ret
};SC.Array.indexOf=function(object,startAt){var idx,len=this.get("length");if(startAt===undefined){startAt=0
}else{startAt=(startAt<0)?Math.ceil(startAt):Math.floor(startAt)}if(startAt<0){startAt+=len
}for(idx=startAt;idx<len;idx++){if(this.objectAt(idx,YES)===object){return idx}}return -1
};if(!Array.prototype.indexOf){Array.prototype.indexOf=SC.Array.indexOf}SC.Array.lastIndexOf=function(object,startAt){var idx,len=this.get("length");
if(startAt===undefined){startAt=len-1}else{startAt=(startAt<0)?Math.ceil(startAt):Math.floor(startAt)
}if(startAt<0){startAt+=len}for(idx=startAt;idx>=0;idx--){if(this.objectAt(idx)===object){return idx
}}return -1};if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=SC.Array.lastIndexOf
}(function(){SC.mixin(Array.prototype,{replace:function(idx,amt,objects){var removedObjects;
if(this.isFrozen){throw SC.FROZEN_ERROR}if(!objects||objects.length===0){removedObjects=this.splice(idx,amt)
}else{var args=[idx,amt].concat(objects);removedObjects=this.splice.apply(this,args)
}var len=objects?(objects.get?objects.get("length"):objects.length):0;this.enumerableContentDidChange(idx,amt,len-amt,objects,removedObjects);
return this},unknownProperty:function(key,value){var ret=this.reducedProperty(key,value);
if((value!==undefined)&&ret===undefined){ret=this[key]=value}return ret}});var indexOf=Array.prototype.indexOf;
if(!indexOf||(indexOf===SC.Array.indexOf)){Array.prototype.indexOf=function(object,startAt){var idx,len=this.length;
if(startAt===undefined){startAt=0}else{startAt=(startAt<0)?Math.ceil(startAt):Math.floor(startAt)
}if(startAt<0){startAt+=len}for(idx=startAt;idx<len;idx++){if(this[idx]===object){return idx
}}return -1}}var lastIndexOf=Array.prototype.lastIndexOf;if(!lastIndexOf||(lastIndexOf===SC.Array.lastIndexOf)){Array.prototype.lastIndexOf=function(object,startAt){var idx,len=this.length;
if(startAt===undefined){startAt=len-1}else{startAt=(startAt<0)?Math.ceil(startAt):Math.floor(startAt)
}if(startAt<0){startAt+=len}for(idx=startAt;idx>=0;idx--){if(this[idx]===object){return idx
}}return -1}}})();SC.Comparable={isComparable:YES,compare:function(a,b){throw"%@.compare() is not implemented".fmt(this.toString())
}};SC.Copyable={isCopyable:YES,copy:function(deep){throw"%@.copy() is not implemented"
},frozenCopy:function(){var isFrozen=this.get?this.get("isFrozen"):this.isFrozen;
if(isFrozen===YES){return this}else{if(isFrozen===undefined){throw"%@ does not support freezing".fmt(this)
}else{return this.copy().freeze()}}}};SC.mixin(Array.prototype,SC.Copyable);Array.prototype.copy=function(deep){var ret=this.slice(),idx;
if(deep){idx=ret.length;while(idx--){ret[idx]=SC.copy(ret[idx],true)}}return ret};
SC.FROZEN_ERROR=new Error("Cannot modify a frozen object");SC.Freezable={isFreezable:YES,isFrozen:NO,freeze:function(){if(this.set){this.set("isFrozen",YES)
}else{this.isFrozen=YES}return this}};SC.mixin(Array.prototype,SC.Freezable);sc_require("mixins/enumerable");
sc_require("mixins/observable");sc_require("mixins/freezable");sc_require("mixins/copyable");
SC.Set=SC.mixin({},SC.Enumerable,SC.Observable,SC.Freezable,{create:function(items){var ret,idx,pool=SC.Set._pool,isObservable=this.isObservable,len;
if(!isObservable&&items===undefined&&pool.length>0){return pool.pop()}else{ret=SC.beget(this);
if(isObservable){ret.initObservable()}if(items&&items.isEnumerable&&items.get("length")>0){ret.isObservable=NO;
if(items.isSCArray){len=items.get("length");for(idx=0;idx<len;idx++){ret.add(items.objectAt(idx))
}}else{if(items.isSet){len=items.length;for(idx=0;idx<len;idx++){ret.add(items[idx])
}}else{items.forEach(function(i){ret.add(i)},this)}}ret.isObservable=isObservable
}}return ret},isSet:YES,length:0,firstObject:function(){return(this.length>0)?this[0]:undefined
}.property(),clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}this.length=0;
return this},contains:function(obj){if(obj===null){return NO}var idx=this[SC.hashFor(obj)];
return(!SC.none(idx)&&(idx<this.length)&&(this[idx]===obj))},isEqual:function(obj){if(!obj||!obj.isSet||(obj.get("length")!==this.get("length"))){return NO
}var loc=this.get("length");while(--loc>=0){if(!obj.contains(this[loc])){return NO
}}return YES},addSetObserver:function(setObserver){if(!this.setObservers){this.setObservers=SC.CoreSet.create()
}this.setObservers.add(setObserver)},removeSetObserver:function(setObserver){if(!this.setObservers){return
}this.setObservers.remove(setObserver)},add:function(obj){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(SC.none(obj)){return this}var hashFunc,guid=((hashFunc=obj.hash)&&(typeof hashFunc==="function"))?hashFunc.call(obj):SC.guidFor(obj),idx=this[guid],len=this.length;
if((idx>=len)||(this[idx]!==obj)){this[len]=obj;this[guid]=len;this.length=len+1;
if(this.setObservers){this.didAddItem(obj)}}if(this.isObservable){this.enumerableContentDidChange()
}return this},addEach:function(objects){if(this.isFrozen){throw SC.FROZEN_ERROR}if(!objects||!objects.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)
}var idx,isObservable=this.isObservable;if(isObservable){this.beginPropertyChanges()
}if(objects.isSCArray){idx=objects.get("length");while(--idx>=0){this.add(objects.objectAt(idx))
}}else{if(objects.isSet){idx=objects.length;while(--idx>=0){this.add(objects[idx])
}}else{objects.forEach(function(i){this.add(i)},this)}}if(isObservable){this.endPropertyChanges()
}return this},remove:function(obj){if(this.isFrozen){throw SC.FROZEN_ERROR}if(obj===null||obj===undefined){return this
}var hashFunc,guid=(obj&&(hashFunc=obj.hash)&&(typeof hashFunc===SC.T_FUNCTION))?hashFunc.call(obj):SC.guidFor(obj),idx=this[guid],len=this.length,tmp;
if((idx===null||idx===undefined)||(idx>=len)||(this[idx]!==obj)){return this}delete this[guid];
if(idx<(len-1)){tmp=this[idx]=this[len-1];guid=(tmp&&(hashFunc=tmp.hash)&&(typeof hashFunc===SC.T_FUNCTION))?hashFunc.call(tmp):SC.guidFor(tmp);
this[guid]=idx}this.length=len-1;if(this.isObservable){this.enumerableContentDidChange()
}if(this.setObservers){this.didRemoveItem(obj)}return this},pop:function(){if(this.isFrozen){throw SC.FROZEN_ERROR
}var obj=(this.length>0)?this[this.length-1]:null;this.remove(obj);return obj},removeEach:function(objects){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(!objects||!objects.isEnumerable){throw"%@.addEach must pass enumerable".fmt(this)
}var idx,isObservable=this.isObservable;if(isObservable){this.beginPropertyChanges()
}if(objects.isSCArray){idx=objects.get("length");while(--idx>=0){this.remove(objects.objectAt(idx))
}}else{if(objects.isSet){idx=objects.length;while(--idx>=0){this.remove(objects[idx])
}}else{objects.forEach(function(i){this.remove(i)},this)}}if(isObservable){this.endPropertyChanges()
}return this},copy:function(){return this.constructor.create(this)},destroy:function(){this.isFrozen=NO;
if(!this.isObservable){SC.Set._pool.push(this.clear())}return this},forEach:function(iterator,target){var len=this.length;
if(!target){target=this}for(var idx=0;idx<len;idx++){iterator.call(target,this[idx],idx,this)
}return this},toString:function(){var len=this.length,idx,ary=[];for(idx=0;idx<len;
idx++){ary[idx]=this[idx]}return"SC.Set<%@>".fmt(ary.join(","))},didAddItem:function(item){var o=this.setObservers;
if(!o){return}var len=o.length,idx;for(idx=0;idx<len;idx++){o[idx].didAddItem(this,item)
}},didRemoveItem:function(item){var o=this.setObservers;if(!o){return}var len=o.length,idx;
for(idx=0;idx<len;idx++){o[idx].didRemoveItem(this,item)}},_pool:[],isObservable:YES});
SC.Set.constructor=SC.Set;SC.Set.clone=SC.Set.copy;SC.Set.push=SC.Set.unshift=SC.Set.add;
SC.Set.shift=SC.Set.pop;SC.Set.addObject=SC.Set.add;SC.Set.removeObject=SC.Set.remove;
SC.Set._pool=[];SC.CoreSet=SC.beget(SC.Set);SC.CoreSet.isObservable=NO;SC.CoreSet.constructor=SC.CoreSet;
sc_require("mixins/observable");sc_require("system/set");SC.Observers={queue:[],addObserver:function(propertyPath,target,method,pathRoot){var tuple;
if(typeof propertyPath==="string"){tuple=SC.tupleForPropertyPath(propertyPath,pathRoot)
}else{tuple=propertyPath}if(tuple&&tuple[0].addObserver){tuple[0].addObserver(tuple[1],target,method)
}else{this.queue.push([propertyPath,target,method,pathRoot])}},removeObserver:function(propertyPath,target,method,pathRoot){var idx,queue,tuple,item;
tuple=SC.tupleForPropertyPath(propertyPath,pathRoot);if(tuple){tuple[0].removeObserver(tuple[1],target,method)
}idx=this.queue.length;queue=this.queue;while(--idx>=0){item=queue[idx];if((item[0]===propertyPath)&&(item[1]===target)&&(item[2]==method)&&(item[3]===pathRoot)){queue[idx]=null
}}},addPendingRangeObserver:function(observer){var ro=this.rangeObservers;if(!ro){ro=this.rangeObservers=SC.CoreSet.create()
}ro.add(observer);return this},_TMP_OUT:[],flush:function(object){var oldQueue=this.queue,i,queueLen=oldQueue.length;
if(oldQueue&&queueLen>0){var newQueue=(this.queue=[]);for(i=0;i<queueLen;i++){var item=oldQueue[i];
if(!item){continue}var tuple=SC.tupleForPropertyPath(item[0],item[3]);if(tuple&&tuple[0].addObserver){tuple[0].addObserver(tuple[1],item[1],item[2])
}else{newQueue.push(item)}}}if(object._kvo_needsRangeObserver){var set=this.rangeObservers,len=set?set.get("length"):0,out=this._TMP_OUT,ro;
for(i=0;i<len;i++){ro=set[i];if(ro.setupPending(object)){out.push(ro)}}if(out.length>0){set.removeEach(out)
}out.length=0;object._kvo_needsRangeObserver=false}},isObservingSuspended:0,_pending:SC.CoreSet.create(),objectHasPendingChanges:function(obj){this._pending.add(obj)
},suspendPropertyObserving:function(){this.isObservingSuspended++},resumePropertyObserving:function(){var pending;
if(--this.isObservingSuspended<=0){pending=this._pending;this._pending=SC.CoreSet.create();
var idx,len=pending.length;for(idx=0;idx<len;idx++){pending[idx]._notifyPropertyObservers()
}pending.clear();pending=null}}};sc_require("core");sc_require("mixins/observable");
sc_require("private/observer_queue");sc_require("mixins/array");sc_require("system/set");
SC.BENCHMARK_OBJECTS=NO;SC._detect_base=function _detect_base(func,parent,name){return function invoke_superclass_method(){var base=parent[name],args;
if(!base){throw new Error("No '"+name+"' method was found on the superclass")}if(func.isEnhancement){args=Array.prototype.slice.call(arguments,1)
}else{args=arguments}return base.apply(this,args)}};SC._object_extend=function _object_extend(base,ext,proto){if(!ext){throw"SC.Object.extend expects a non-null value.  Did you forget to 'sc_require' something?  Or were you passing a Protocol to extend() as if it were a mixin?"
}base._kvo_cloned=null;var key,idx,len,cur,cprops=base.concatenatedProperties,K=SC.K;
var p1,p2;idx=(cprops)?cprops.length:0;var concats=(idx>0)?{}:null;while(--idx>=0){key=cprops[idx];
p1=base[key];p2=ext[key];if(p1){if(!(p1 instanceof Array)){p1=SC.$A(p1)}concats[key]=(p2)?p1.concat(p2):p2
}else{if(!(p2 instanceof Array)){p2=SC.$A(p2)}concats[key]=p2}}var bindings=base._bindings,clonedBindings=NO;
var observers=base._observers,clonedObservers=NO;var properties=base._properties,clonedProperties=NO;
var paths,pathLoc,local;var outlets=base.outlets,clonedOutlets=NO;if(ext.outlets){outlets=(outlets||SC.EMPTY_ARRAY).concat(ext.outlets);
clonedOutlets=YES}for(key in ext){if(key==="_kvo_cloned"){continue}if(!ext.hasOwnProperty(key)){continue
}var value=(concats.hasOwnProperty(key)?concats[key]:null)||ext[key];if(key.length>7&&key.slice(-7)==="Binding"){if(!clonedBindings){bindings=(bindings||SC.EMPTY_ARRAY).slice();
clonedBindings=YES}if(bindings===null){bindings=(base._bindings||SC.EMPTY_ARRAY).slice()
}bindings[bindings.length]=key}else{if(value&&(value instanceof Function)){if(!value.superclass&&(value!==(cur=base[key]))){value.superclass=cur||K;
value.base=proto?SC._detect_base(value,proto,key):cur||K}if(value.propertyPaths){if(!clonedObservers){observers=(observers||SC.EMPTY_ARRAY).slice();
clonedObservers=YES}observers[observers.length]=key}if(paths=value.localPropertyPaths){pathLoc=paths.length;
while(--pathLoc>=0){local=base._kvo_for(SC.keyFor("_kvo_local",paths[pathLoc]),SC.CoreSet);
local.add(key);base._kvo_for("_kvo_observed_keys",SC.CoreSet).add(paths[pathLoc])
}}if(value.dependentKeys){if(!clonedProperties){properties=(properties||SC.EMPTY_ARRAY).slice();
clonedProperties=YES}properties[properties.length]=key}if(value.autoconfiguredOutlet){if(!clonedOutlets){outlets=(outlets||SC.EMPTY_ARRAY).slice();
clonedOutlets=YES}outlets[outlets.length]=key}if(value.isEnhancement){value=SC._enhance(base[key],value)
}}}base[key]=value}if(ext.hasOwnProperty("toString")){key="toString";value=(concats.hasOwnProperty(key)?concats[key]:null)||ext[key];
if(!value.superclass&&(value!==(cur=base[key]))){value.superclass=value.base=cur||K
}base[key]=value}base._bindings=bindings||[];base._observers=observers||[];base._properties=properties||[];
base.outlets=outlets||[];return base};SC._enhance=function(originalFunction,enhancement){return function(){var args=Array.prototype.slice.call(arguments,0);
var self=this;args.unshift(function(){return originalFunction.apply(self,arguments)
});return enhancement.apply(this,args)}};SC.Object=function(props){this.__sc_super__=SC.Object.prototype;
return this._object_init(props)};SC.mixin(SC.Object,{mixin:function(props){var len=arguments.length,loc;
for(loc=0;loc<len;loc++){SC.mixin(this,arguments[loc])}return this},superclass:null,extend:function(props){var bench=SC.BENCHMARK_OBJECTS;
if(bench){SC.Benchmark.start("SC.Object.extend")}var prop,ret=function(props){this.__sc_super__=ret.prototype;
return this._object_init(props)};for(prop in this){if(!this.hasOwnProperty(prop)){continue
}ret[prop]=this[prop]}if(this.hasOwnProperty("toString")){ret.toString=this.toString
}ret.superclass=this;ret.__sc_super__=this.prototype;SC.generateGuid(ret,"sc");ret.subclasses=SC.Set.create();
this.subclasses.add(ret);var base=(ret.prototype=SC.beget(this.prototype));var idx,len=arguments.length;
for(idx=0;idx<len;idx++){SC._object_extend(base,arguments[idx],ret.__sc_super__)}base.constructor=ret;
if(bench){SC.Benchmark.end("SC.Object.extend")}return ret},reopen:function(props){return SC._object_extend(this.prototype,props,this.__sc_super__)
},create:function(){var C=this,ret=new C(arguments);if(SC.ObjectDesigner){SC.ObjectDesigner.didCreateObject(ret,SC.$A(arguments))
}return ret},isClass:YES,subclasses:SC.Set.create(),toString:function(){return SC._object_className(this)
},subclassOf:function(scClass){if(this===scClass){return NO}var t=this;while(t=t.superclass){if(t===scClass){return YES
}}return NO},hasSubclass:function(scClass){return(scClass&&scClass.subclassOf)?scClass.subclassOf(this):NO
},kindOf:function(scClass){return(this===scClass)||this.subclassOf(scClass)},design:function(){if(this.isDesign){return this
}var ret=this.extend.apply(this,arguments);ret.isDesign=YES;if(SC.ObjectDesigner){SC.ObjectDesigner.didLoadDesign(ret,this,SC.A(arguments))
}return ret}});SC.Object.prototype={_kvo_enabled:YES,_object_init:function(extensions){var idx,len=(extensions)?extensions.length:0;
for(idx=0;idx<len;idx++){SC._object_extend(this,extensions[idx],this.__sc_super__)
}SC.generateGuid(this,"sc");this.init();var inits=this.initMixin;len=(inits)?inits.length:0;
for(idx=0;idx<len;idx++){inits[idx].call(this)}return this},mixin:function(){var idx,len=arguments.length;
for(idx=0;idx<len;idx++){SC.mixin(this,arguments[idx])}for(idx=0;idx<len;idx++){var init=arguments[idx].initMixin;
if(init){init.call(this)}}return this},init:function(){this.initObservable();return this
},isDestroyed:NO,destroy:function(){if(this.get("isDestroyed")){return this}this.set("isDestroyed",YES);
var idx,inits=this.destroyMixin,len=(inits)?inits.length:0;for(idx=0;idx<len;idx++){inits[idx].call(this)
}this.bindings.invoke("disconnect");this.bindings=null;return this},isObject:true,respondsTo:function(methodName){return !!(this[methodName] instanceof Function)
},tryToPerform:function(methodName,arg1,arg2){return this.respondsTo(methodName)&&(this[methodName](arg1,arg2)!==NO)
},superclass:function(args){var caller=arguments.callee.caller;if(!caller){throw"superclass cannot determine the caller method"
}return caller.superclass?caller.superclass.apply(this,arguments):null},instanceOf:function(scClass){return this.constructor===scClass
},kindOf:function(scClass){return this.constructor.kindOf(scClass)},toString:function(){if(!this._object_toString){var klassName=SC._object_className(this.constructor);
var string="%@:%@".fmt(klassName,SC.guidFor(this));if(klassName){this._object_toString=string
}else{return string}}return this._object_toString},awake:function(key){var outlets=this.outlets,i,len,outlet;
for(i=0,len=outlets.length;i<len;++i){outlet=outlets[i];this.get(outlet)}this.bindings.invoke("sync")
},invokeOnce:function(method){SC.RunLoop.currentRunLoop.invokeOnce(this,method);return this
},invokeLast:function(method){SC.RunLoop.currentRunLoop.invokeLast(this,method);return this
},concatenatedProperties:["concatenatedProperties","initMixin","destroyMixin"]};SC.Object.prototype.constructor=SC.Object;
SC.mixin(SC.Object.prototype,SC.Observable);function findClassNames(){if(SC._object_foundObjectClassNames){return
}SC._object_foundObjectClassNames=true;var seen=[];var detectedSC=false;var searchObject=function(root,object,levels){levels--;
if(seen.indexOf(object)>=0){return}seen.push(object);for(var key in object){if(key=="__scope__"){continue
}if(key=="superclass"){continue}if(key=="__SC__"){key="SC"}if(!key.match(/^[A-Z0-9]/)){continue
}if(key=="SC"){if(detectedSC){continue}detectedSC=true}var path=(root)?[root,key].join("."):key;
var value=object[key];try{var type=SC.typeOf(value)}catch(e){break}switch(type){case SC.T_CLASS:if(!value._object_className){value._object_className=path
}if(levels>=0){searchObject(path,value,levels)}break;case SC.T_OBJECT:if(levels>=0){searchObject(path,value,levels)
}break;case SC.T_HASH:if(((root)||(path==="SC"))&&(levels>=0)){searchObject(path,value,levels)
}break;default:break}}};window.__SC__=SC;searchObject(null,window,2)}SC.instanceOf=function(scObject,scClass){return !!(scObject&&scObject.constructor===scClass)
};SC.kindOf=function(scObject,scClass){if(scObject&&!scObject.isClass){scObject=scObject.constructor
}return !!(scObject&&scObject.kindOf&&scObject.kindOf(scClass))};SC._object_className=function(obj){if(SC.isReady===NO){return""
}if(!obj._object_className){findClassNames()}if(obj._object_className){return obj._object_className
}var ret=obj;while(ret&&!ret._object_className){ret=ret.superclass}return(ret&&ret._object_className)?ret._object_className:"Anonymous"
};sc_require("system/object");SC.LOG_BINDINGS=NO;SC.BENCHMARK_BINDING_NOTIFICATIONS=NO;
SC.BENCHMARK_BINDING_SETUP=NO;SC.MULTIPLE_PLACEHOLDER="@@MULT@@";SC.NULL_PLACEHOLDER="@@NULL@@";
SC.EMPTY_PLACEHOLDER="@@EMPTY@@";SC.Binding={beget:function(fromPath){var ret=SC.beget(this);
ret.parentBinding=this;if(fromPath!==undefined){ret=ret.from(fromPath)}return ret
},builder:function(){var binding=this,ret=function(fromProperty){return binding.beget().from(fromProperty)
};ret.beget=function(){return binding.beget()};return ret},from:function(propertyPath,root){if(!propertyPath){return this
}var binding=(this===SC.Binding)?this.beget():this;binding._fromPropertyPath=propertyPath;
binding._fromRoot=root;binding._fromTuple=null;return binding},to:function(propertyPath,root){var binding=(this===SC.Binding)?this.beget():this;
binding._toPropertyPath=propertyPath;binding._toRoot=root;binding._toTuple=null;return binding
},connect:function(){if(this.isConnected){return this}this.isConnected=YES;this._connectionPending=YES;
this._syncOnConnect=YES;SC.Binding._connectQueue.add(this);return this},_connect:function(){if(!this._connectionPending){return
}this._connectionPending=NO;var path,root,bench=SC.BENCHMARK_BINDING_SETUP;if(bench){SC.Benchmark.start("SC.Binding.connect()")
}path=this._fromPropertyPath;root=this._fromRoot;if(typeof path==="string"){if(path.indexOf(".")===0){path=path.slice(1);
if(!root){root=this._toRoot}}else{if(path.indexOf("*")===0){path=[this._fromRoot||this._toRoot,path.slice(1)];
root=null}}}this._fromObserverData=[path,this,this.fromPropertyDidChange,root];SC.Observers.addObserver.apply(SC.Observers,this._fromObserverData);
if(!this._oneWay){path=this._toPropertyPath;root=this._toRoot;this._toObserverData=[path,this,this.toPropertyDidChange,root];
SC.Observers.addObserver.apply(SC.Observers,this._toObserverData)}if(bench){SC.Benchmark.end("SC.Binding.connect()")
}if(this._syncOnConnect){this._syncOnConnect=NO;if(bench){SC.Benchmark.start("SC.Binding.connect().sync")
}this.sync();if(bench){SC.Benchmark.end("SC.Binding.connect().sync")}}},disconnect:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._connectionPending=NO}else{SC.Observers.removeObserver.apply(SC.Observers,this._fromObserverData);
if(!this._oneWay){SC.Observers.removeObserver.apply(SC.Observers,this._toObserverData)
}}this.isConnected=NO;return this},fromPropertyDidChange:function(target,key){var v=target?target.get(key):null;
if(v!==this._bindingValue||key==="[]"){this._setBindingValue(target,key);this._changePending=YES;
SC.Binding._changeQueue.add(this)}},toPropertyDidChange:function(target,key){if(this._oneWay){return
}var v=target.get(key);if(v!==this._transformedBindingValue){this._setBindingValue(target,key);
this._changePending=YES;SC.Binding._changeQueue.add(this)}},_setBindingValue:function(source,key){this._bindingSource=source;
this._bindingKey=key},_computeBindingValue:function(){var source=this._bindingSource,key=this._bindingKey,v,idx;
this._bindingValue=v=(source?source.getPath(key):null);var transforms=this._transforms;
if(transforms){var len=transforms.length,transform;for(idx=0;idx<len;idx++){transform=transforms[idx];
v=transform(v,this)}}if(this._noError&&SC.typeOf(v)===SC.T_ERROR){v=null}this._transformedBindingValue=v
},_connectQueue:SC.CoreSet.create(),_alternateConnectQueue:SC.CoreSet.create(),_changeQueue:SC.CoreSet.create(),_alternateChangeQueue:SC.CoreSet.create(),_changePending:NO,flushPendingChanges:function(){if(this._isFlushing){return NO
}this._isFlushing=YES;SC.Observers.suspendPropertyObserving();var didFlush=NO,log=SC.LOG_BINDINGS,queue,binding;
while((queue=this._connectQueue).length>0){this._connectQueue=this._alternateConnectQueue;
this._alternateConnectQueue=queue;while(binding=queue.pop()){binding._connect()}}while((queue=this._changeQueue).length>0){if(log){SC.Logger.log("Begin: Trigger changed bindings")
}didFlush=YES;this._changeQueue=this._alternateChangeQueue;this._alternateChangeQueue=queue;
while(binding=queue.pop()){binding.applyBindingValue()}if(log){SC.Logger.log("End: Trigger changed bindings")
}}this._isFlushing=NO;SC.Observers.resumePropertyObserving();return didFlush},applyBindingValue:function(){this._changePending=NO;
this._computeBindingTargets();this._computeBindingValue();var v=this._bindingValue,tv=this._transformedBindingValue,bench=SC.BENCHMARK_BINDING_NOTIFICATIONS,log=SC.LOG_BINDINGS;
if(!this._oneWay&&this._fromTarget){if(log){SC.Logger.log("%@: %@ -> %@".fmt(this,v,tv))
}if(bench){SC.Benchmark.start(this.toString()+"->")}this._fromTarget.setPathIfChanged(this._fromPropertyKey,v);
if(bench){SC.Benchmark.end(this.toString()+"->")}}if(this._toTarget){if(log){SC.Logger.log("%@: %@ <- %@".fmt(this,v,tv))
}if(bench){SC.Benchmark.start(this.toString()+"<-")}this._toTarget.setPathIfChanged(this._toPropertyKey,tv);
if(bench){SC.Benchmark.start(this.toString()+"<-")}}},sync:function(){if(!this.isConnected){return this
}if(this._connectionPending){this._syncOnConnect=YES}else{this._computeBindingTargets();
var target=this._fromTarget,key=this._fromPropertyKey;if(!target||!key){return this
}var v=target.getPath(key);if(v!==this._bindingValue||key==="[]"){this._setBindingValue(target,key);
this._changePending=YES;SC.Binding._changeQueue.add(this)}}return this},_syncOnConnect:NO,_computeBindingTargets:function(){if(!this._fromTarget){var path,root,tuple;
path=this._fromPropertyPath;root=this._fromRoot;if(typeof path==="string"){if(path.indexOf(".")===0){path=path.slice(1);
if(!root){root=this._toRoot}}else{if(path.indexOf("*")===0){path=[root||this._toRoot,path.slice(1)];
root=null}}}tuple=SC.tupleForPropertyPath(path,root);if(tuple){this._fromTarget=tuple[0];
this._fromPropertyKey=tuple[1]}}if(!this._toTarget){path=this._toPropertyPath;root=this._toRoot;
tuple=SC.tupleForPropertyPath(path,root);if(tuple){this._toTarget=tuple[0];this._toPropertyKey=tuple[1]
}}},oneWay:function(fromPath,aFlag){if((aFlag===undefined)&&(SC.typeOf(fromPath)===SC.T_BOOL)){aFlag=fromPath;
fromPath=null}var binding=this.from(fromPath);if(binding===SC.Binding){binding=binding.beget()
}binding._oneWay=(aFlag===undefined)?YES:aFlag;return binding},transform:function(transformFunc){var binding=(this===SC.Binding)?this.beget():this;
var t=binding._transforms;if(t&&(t===binding.parentBinding._transform)){t=binding._transforms=t.slice()
}if(!t){t=binding._transforms=[]}t.push(transformFunc);return binding},resetTransforms:function(){var binding=(this===SC.Binding)?this.beget():this;
binding._transforms=null;return binding},noError:function(fromPath,aFlag){if((aFlag===undefined)&&(SC.typeOf(fromPath)===SC.T_BOOL)){aFlag=fromPath;
fromPath=null}var binding=this.from(fromPath);if(binding===SC.Binding){binding=binding.beget()
}binding._noError=(aFlag===undefined)?YES:aFlag;return binding},single:function(fromPath,placeholder){if(placeholder===undefined){placeholder=SC.MULTIPLE_PLACEHOLDER
}return this.from(fromPath).transform(function(value,isForward){if(value&&value.isEnumerable){var len=value.get("length");
value=(len>1)?placeholder:(len<=0)?null:value.firstObject()}return value})},notEmpty:function(fromPath,placeholder){if(placeholder===undefined){placeholder=SC.EMPTY_PLACEHOLDER
}return this.from(fromPath).transform(function(value,isForward){if(SC.none(value)||(value==="")||(SC.isArray(value)&&value.length===0)){value=placeholder
}return value})},notNull:function(fromPath,placeholder){if(placeholder===undefined){placeholder=SC.EMPTY_PLACEHOLDER
}return this.from(fromPath).transform(function(value,isForward){if(SC.none(value)){value=placeholder
}return value})},multiple:function(fromPath){return this.from(fromPath).transform(function(value){if(!SC.isArray(value)){value=(value==null)?[]:[value]
}return value})},bool:function(fromPath){return this.from(fromPath).transform(function(v){var t=SC.typeOf(v);
if(t===SC.T_ERROR){return v}return(t==SC.T_ARRAY)?(v.length>0):(v==="")?NO:!!v})},and:function(pathA,pathB){var gate=SC.Object.create({valueABinding:pathA,valueBBinding:pathB,and:function(){return(this.get("valueA")&&this.get("valueB"))
}.property("valueA","valueB").cacheable()});return this.from("and",gate).oneWay()
},or:function(pathA,pathB){var gate=SC.Object.create({valueABinding:pathA,valueBBinding:pathB,or:function(){return(this.get("valueA")||this.get("valueB"))
}.property("valueA","valueB").cacheable()});return this.from("or",gate).oneWay()},not:function(fromPath){return this.from(fromPath).transform(function(v){var t=SC.typeOf(v);
if(t===SC.T_ERROR){return v}return !((t==SC.T_ARRAY)?(v.length>0):(v==="")?NO:!!v)
})},isNull:function(fromPath){return this.from(fromPath).transform(function(v){var t=SC.typeOf(v);
return(t===SC.T_ERROR)?v:SC.none(v)})},toString:function(){var from=this._fromRoot?"<%@>:%@".fmt(this._fromRoot,this._fromPropertyPath):this._fromPropertyPath;
var to=this._toRoot?"<%@>:%@".fmt(this._toRoot,this._toPropertyPath):this._toPropertyPath;
var oneWay=this._oneWay?"[oneWay]":"";return"SC.Binding%@(%@ -> %@)%@".fmt(SC.guidFor(this),from,to,oneWay)
}};SC.binding=function(path,root){return SC.Binding.from(path,root)};SC.Error=SC.Object.extend({code:-1,message:"",errorValue:null,errorObject:function(){return this
}.property().cacheable(),label:null,toString:function(){return"SC.Error:%@:%@ (%@)".fmt(SC.guidFor(this),this.get("message"),this.get("code"))
},isError:YES});SC.Error.desc=function(description,label,value,code){var opts={message:description};
if(label!==undefined){opts.label=label}if(code!==undefined){opts.code=code}if(value!==undefined){opts.errorValue=value
}return this.create(opts)};SC.$error=function(description,label,value,c){return SC.Error.desc(description,label,value,c)
};SC.ok=function(ret){return(ret!==false)&&!(ret&&ret.isError)};SC.$ok=SC.ok;SC.val=function(obj){if(obj&&obj.isError){return obj.get?obj.get("errorValue"):null
}else{return obj}};SC.$val=SC.val;SC.Error.HAS_MULTIPLE_VALUES=-100;sc_require("mixins/enumerable");
sc_require("mixins/observable");sc_require("mixins/freezable");sc_require("mixins/copyable");
SC.IndexSet=SC.mixin({},SC.Enumerable,SC.Observable,SC.Freezable,SC.Copyable,{_sc_sliceContent:function(c){if(c.length<1000){return c.slice()
}var cur=0,ret=[],next=c[0];while(next!==0){ret[cur]=next;cur=(next<0)?(0-next):next;
next=c[cur]}ret[cur]=0;this._hint(0,cur,ret);return ret},create:function(start,length){var ret=SC.beget(this);
ret.initObservable();ret.registerDependentKey("min","[]");if(start&&start.isIndexSet){ret._content=this._sc_sliceContent(start._content);
ret.max=start.max;ret.length=start.length;ret.source=start.source}else{ret._content=[0];
if(start!==undefined){ret.add(start,length)}}return ret},isIndexSet:YES,HINT_SIZE:256,length:0,max:0,min:function(){var content=this._content,cur=content[0];
return(cur===0)?-1:(cur>0)?0:Math.abs(cur)}.property("[]").cacheable(),firstObject:function(){return(this.get("length")>0)?this.get("min"):undefined
}.property(),rangeStartForIndex:function(index){var content=this._content,max=this.get("max"),ret,next,accel;
if(index>=max){return max}if(Math.abs(content[index])>index){return index}accel=index-(index%SC.IndexSet.HINT_SIZE);
ret=content[accel];if(ret<0||ret>index){ret=accel}next=Math.abs(content[ret]);while(next<index){ret=next;
next=Math.abs(content[ret])}return ret},isEqual:function(obj){if(obj===this){return YES
}if(!obj||!obj.isIndexSet||(obj.max!==this.max)||(obj.length!==this.length)){return NO
}var lcontent=this._content,rcontent=obj._content,cur=0,next=lcontent[cur];do{if(rcontent[cur]!==next){return NO
}cur=Math.abs(next);next=lcontent[cur]}while(cur!==0);return YES},indexBefore:function(index){if(index===0){return -1
}index--;var content=this._content,max=this.get("max"),start=this.rangeStartForIndex(index);
if(!content){return null}while((start===max)||(content[start]<0)){if(start===0){return -1
}index=start-1;start=this.rangeStartForIndex(index)}return index},indexAfter:function(index){var content=this._content,max=this.get("max"),start,next;
if(!content||(index>=max)){return -1}index++;start=this.rangeStartForIndex(index);
next=content[start];while(next<0){if(next===0){return -1}index=start=Math.abs(next);
next=content[start]}return index},contains:function(start,length){var content,cur,next,rstart,rnext;
if(length===undefined){if(start===null||start===undefined){return NO}if(typeof start===SC.T_NUMBER){length=1
}else{if(start&&start.isIndexSet){if(start===this){return YES}content=start._content;
cur=0;next=content[cur];while(next!==0){if((next>0)&&!this.contains(cur,next-cur)){return NO
}cur=Math.abs(next);next=content[cur]}return YES}else{length=start.length;start=start.start
}}}rstart=this.rangeStartForIndex(start);rnext=this._content[rstart];return(rnext>0)&&(rstart<=start)&&(rnext>=(start+length))
},intersects:function(start,length){var content,cur,next,lim;if(length===undefined){if(typeof start===SC.T_NUMBER){length=1
}else{if(start&&start.isIndexSet){if(start===this){return YES}content=start._content;
cur=0;next=content[cur];while(next!==0){if((next>0)&&this.intersects(cur,next-cur)){return YES
}cur=Math.abs(next);next=content[cur]}return NO}else{length=start.length;start=start.start
}}}cur=this.rangeStartForIndex(start);content=this._content;next=content[cur];lim=start+length;
while(cur<lim){if(next===0){return NO}if((next>0)&&(next>start)){return YES}cur=Math.abs(next);
next=content[cur]}return NO},without:function(start,length){if(start===this){return SC.IndexSet.create()
}return this.clone().remove(start,length)},replace:function(start,length){if(length===undefined){if(typeof start===SC.T_NUMBER){length=1
}else{if(start&&start.isIndexSet){this._content=this._sc_sliceContent(start._content);
this.beginPropertyChanges().set("max",start.max).set("length",start.length).set("source",start.source).enumerableContentDidChange().endPropertyChanges();
return this}else{length=start.length;start=start.start}}}var oldlen=this.length;this._content.length=1;
this._content[0]=0;this.length=this.max=0;return this.add(start,length)},add:function(start,length){if(this.isFrozen){throw SC.FROZEN_ERROR
}var content,cur,next;if(start&&start.isIndexSet){content=start._content;if(!content){return this
}cur=0;next=content[0];while(next!==0){if(next>0){this.add(cur,next-cur)}cur=next<0?0-next:next;
next=content[cur]}return this}else{if(length===undefined){if(start===null||start===undefined){return this
}else{if(typeof start===SC.T_NUMBER){length=1}else{length=start.length;start=start.start
}}}else{if(length===null){length=1}}}if(length<=0){return this}var max=this.get("max"),oldmax=max,delta,value;
content=this._content;if(start===max){if(start>0){cur=this.rangeStartForIndex(start-1);
next=content[cur];if(next>0){delete content[max];content[cur]=max=start+length;start=cur
}else{content[max]=max=start+length}}else{content[start]=max=length}content[max]=0;
this.set("max",max);this.set("length",this.length+length);length=max-start}else{if(start>max){content[max]=0-start;
content[start]=start+length;content[start+length]=0;this.set("max",start+length);
this.set("length",this.length+length);length=start+length-max;start=max}else{cur=this.rangeStartForIndex(start);
next=content[cur];max=start+length;delta=0;if((start>0)&&(cur===start)&&(next<=0)){cur=this.rangeStartForIndex(start-1);
next=content[cur]}if(next<0){content[cur]=0-start;if(Math.abs(next)>max){content[start]=0-max;
content[max]=next}else{content[start]=next}}else{start=cur;if(next>max){max=next}}cur=start;
while(cur<max){value=content[cur];if(value===0){content[max]=0;next=max;delta+=max-cur
}else{next=Math.abs(value);if(next>max){content[max]=value;next=max}if(value<0){delta+=next-cur
}}delete content[cur];cur=next}if((cur=content[max])>0){delete content[max];max=cur
}content[start]=max;if(max>oldmax){this.set("max",max)}this.set("length",this.get("length")+delta);
length=max-start}}this._hint(start,length);if(delta!==0){this.enumerableContentDidChange()
}return this},remove:function(start,length){if(this.isFrozen){throw SC.FROZEN_ERROR
}if(length===undefined){if(start===null||start===undefined){return this}else{if(typeof start===SC.T_NUMBER){length=1
}else{if(start.isIndexSet){start.forEachRange(this.remove,this);return this}else{length=start.length;
start=start.start}}}}if(length<=0){return this}var max=this.get("max"),oldmax=max,content=this._content,cur,next,delta,value,last;
if(start>=max){return this}cur=this.rangeStartForIndex(start);next=content[cur];last=start+length;
delta=0;if((start>0)&&(cur===start)&&(next>0)){cur=this.rangeStartForIndex(start-1);
next=content[cur]}if(next>0){content[cur]=start;if(next>last){content[start]=last;
content[last]=next}else{content[start]=next}}else{start=cur;next=Math.abs(next);if(next>last){last=next
}}cur=start;while(cur<last){value=content[cur];if(value===0){content[last]=0;next=last
}else{next=Math.abs(value);if(next>last){content[last]=value;next=last}if(value>0){delta+=next-cur
}}delete content[cur];cur=next}if((cur=content[last])<0){delete content[last];last=Math.abs(cur)
}if(content[last]===0){delete content[last];content[start]=0;this.set("max",start)
}else{content[start]=0-last}this.set("length",this.get("length")-delta);length=last-start;
this._hint(start,length);if(delta!==0){this.enumerableContentDidChange()}return this
},_hint:function(start,length,content){if(content===undefined){content=this._content
}var skip=SC.IndexSet.HINT_SIZE,next=Math.abs(content[start]),loc=start-(start%skip)+skip,lim=start+length;
while(loc<lim){while((next!==0)&&(next<=loc)){start=next;next=Math.abs(content[start])
}if(next===0){delete content[loc]}else{if(loc!==start){content[loc]=start}}loc+=skip
}},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}var oldlen=this.length;
this._content.length=1;this._content[0]=0;this.set("length",0).set("max",0);if(oldlen>0){this.enumerableContentDidChange()
}},addEach:function(objects){if(this.isFrozen){throw SC.FROZEN_ERROR}this.beginPropertyChanges();
var idx=objects.get("length");if(objects.isSCArray){while(--idx>=0){this.add(objects.objectAt(idx))
}}else{if(objects.isEnumerable){objects.forEach(function(idx){this.add(idx)},this)
}}this.endPropertyChanges();return this},removeEach:function(objects){if(this.isFrozen){throw SC.FROZEN_ERROR
}this.beginPropertyChanges();var idx=objects.get("length");if(objects.isSCArray){while(--idx>=0){this.remove(objects.objectAt(idx))
}}else{if(objects.isEnumerable){objects.forEach(function(idx){this.remove(idx)},this)
}}this.endPropertyChanges();return this},clone:function(){return SC.IndexSet.create(this)
},inspect:function(){var content=this._content,len=content.length,idx=0,ret=[],item;
for(idx=0;idx<len;idx++){item=content[idx];if(item!==undefined){ret.push("%@:%@".fmt(idx,item))
}}return"SC.IndexSet<%@>".fmt(ret.join(" , "))},forEachRange:function(callback,target){var content=this._content,cur=0,next=content[cur],source=this.source;
if(target===undefined){target=null}while(next!==0){if(next>0){callback.call(target,cur,next-cur,this,source)
}cur=Math.abs(next);next=content[cur]}return this},forEachIn:function(start,length,callback,target){var content=this._content,cur=0,idx=0,lim=start+length,source=this.source,next=content[cur];
if(target===undefined){target=null}while(next!==0){if(cur<start){cur=start}while((cur<next)&&(cur<lim)){callback.call(target,cur++,idx++,this,source)
}if(cur>=lim){cur=next=0}else{cur=Math.abs(next);next=content[cur]}}return this},lengthIn:function(start,length){var ret=0;
if(length===undefined){if(start===null||start===undefined){return 0}else{if(typeof start===SC.T_NUMBER){length=1
}else{if(start.isIndexSet){start.forEachRange(function(start,length){ret+=this.lengthIn(start,length)
},this);return ret}else{length=start.length;start=start.start}}}}if(this.get("length")===0){return 0
}var content=this._content,cur=0,next=content[cur],lim=start+length;while(cur<lim&&next!==0){if(next>0){ret+=(next>lim)?lim-cur:next-cur
}cur=Math.abs(next);next=content[cur]}return ret},source:null,indexOf:function(object,startAt){var source=this.source;
if(!source){throw"%@.indexOf() requires source".fmt(this)}var len=source.get("length"),content=this._content,cur=content[0]<0?Math.abs(content[0]):0,idx;
while(cur>=0&&cur<len){idx=source.indexOf(object,cur);if(idx<0){return -1}if(this.contains(idx)){return idx
}cur=idx+1}return -1},lastIndexOf:function(object,startAt){var source=this.source;
if(!source){throw"%@.lastIndexOf() requires source".fmt(this)}var len=source.get("length"),cur=this.max-1,idx;
if(cur>=len){cur=len-1}while(cur>=0){idx=source.lastIndexOf(object,cur);if(idx<0){return -1
}if(this.contains(idx)){return idx}cur=idx+1}return -1},forEachObject:function(callback,target){var source=this.source;
if(!source){throw"%@.forEachObject() requires source".fmt(this)}var content=this._content,cur=0,idx=0,next=content[cur];
if(target===undefined){target=null}while(next!==0){while(cur<next){callback.call(target,source.objectAt(cur),cur,source,this);
cur++}cur=Math.abs(next);next=content[cur]}return this},addObject:function(object,firstOnly){var source=this.source;
if(!source){throw"%@.addObject() requires source".fmt(this)}var len=source.get("length"),cur=0,idx;
while(cur>=0&&cur<len){idx=source.indexOf(object,cur);if(idx>=0){this.add(idx);if(firstOnly){return this
}cur=idx++}else{return this}}return this},addObjects:function(objects,firstOnly){objects.forEach(function(object){this.addObject(object,firstOnly)
},this);return this},removeObject:function(object,firstOnly){var source=this.source;
if(!source){throw"%@.removeObject() requires source".fmt(this)}var len=source.get("length"),cur=0,idx;
while(cur>=0&&cur<len){idx=source.indexOf(object,cur);if(idx>=0){this.remove(idx);
if(firstOnly){return this}cur=idx+1}else{return this}}return this},removeObjects:function(objects,firstOnly){objects.forEach(function(object){this.removeObject(object,firstOnly)
},this);return this},LOG_OBSERVING:NO,forEach:function(callback,target){var content=this._content,cur=0,idx=0,source=this.source,next=content[cur];
if(target===undefined){target=null}while(next!==0){while(cur<next){callback.call(target,cur++,idx++,this,source)
}cur=Math.abs(next);next=content[cur]}return this},nextObject:function(ignore,idx,context){var content=this._content,next=context.next,max=this.get("max");
if(idx===null){idx=next=0}else{if(idx>=max){delete context.next;return null}else{idx++
}}if(idx===next){do{idx=Math.abs(next);next=content[idx]}while(next<0);context.next=next
}return idx},toString:function(){var str=[];this.forEachRange(function(start,length){str.push(length===1?start:"%@..%@".fmt(start,start+length-1))
},this);return"SC.IndexSet<%@>".fmt(str.join(","))},max:0});SC.IndexSet.slice=SC.IndexSet.copy=SC.IndexSet.clone;
SC.IndexSet.EMPTY=SC.IndexSet.create().freeze();SC.LOGGER_LOG_DELIMITER=", ";SC.LOGGER_LOG_ERROR="ERROR: ";
SC.LOGGER_LOG_INFO="INFO:  ";SC.LOGGER_LOG_WARN="WARN:  ";SC.LOGGER_LOG_DEBUG="DEBUG: ";
SC.LOGGER_LOG_GROUP_HEADER="** %@";SC.LOGGER_LOG_GROUP_INDENTATION="    ";SC.LOGGER_RECORDED_LOG_TIMESTAMP_PREFIX="%@:  ";
SC.LOGGER_LEVEL_DEBUG="debug";SC.LOGGER_LEVEL_INFO="info";SC.LOGGER_LEVEL_WARN="warn";
SC.LOGGER_LEVEL_ERROR="error";SC.LOGGER_LEVEL_NONE="none";SC.Logger=SC.Object.create({logOutputLevel:null,logRecordingLevel:SC.LOGGER_LEVEL_NONE,recordedLogMessages:null,recordedLogMessagesMaximumLength:500,recordedLogMessagesPruningMinimumLength:100,debugEnabled:NO,exists:function(){return !SC.none(this.get("reporter"))
}.property("reporter").cacheable(),fallBackOnAlert:NO,reporter:console,debug:function(message,optionalFormatArgs){SC.Logger._handleMessage(SC.LOGGER_LEVEL_DEBUG,YES,message,arguments)
},debugWithoutFmt:function(){this._handleMessage(SC.LOGGER_LEVEL_DEBUG,NO,null,arguments)
},debugGroup:function(message,optionalFormatArgs){SC.Logger._handleGroup(SC.LOGGER_LEVEL_DEBUG,message,arguments)
},debugGroupEnd:function(){SC.Logger._handleGroupEnd(SC.LOGGER_LEVEL_DEBUG)},info:function(message,optionalFormatArgs){SC.Logger._handleMessage(SC.LOGGER_LEVEL_INFO,YES,message,arguments)
},infoWithoutFmt:function(){this._handleMessage(SC.LOGGER_LEVEL_INFO,NO,null,arguments)
},infoGroup:function(message,optionalFormatArgs){SC.Logger._handleGroup(SC.LOGGER_LEVEL_INFO,message,arguments)
},infoGroupEnd:function(){SC.Logger._handleGroupEnd(SC.LOGGER_LEVEL_INFO)},warn:function(message,optionalFormatArgs){SC.Logger._handleMessage(SC.LOGGER_LEVEL_WARN,YES,message,arguments)
},warnWithoutFmt:function(){this._handleMessage(SC.LOGGER_LEVEL_WARN,NO,null,arguments)
},warnGroup:function(message,optionalFormatArgs){SC.Logger._handleGroup(SC.LOGGER_LEVEL_WARN,message,arguments)
},warnGroupEnd:function(){SC.Logger._handleGroupEnd(SC.LOGGER_LEVEL_WARN)},error:function(message,optionalFormatArgs){SC.Logger._handleMessage(SC.LOGGER_LEVEL_ERROR,YES,message,arguments)
},errorWithoutFmt:function(){this._handleMessage(SC.LOGGER_LEVEL_ERROR,NO,null,arguments)
},errorGroup:function(message,optionalFormatArgs){SC.Logger._handleGroup(SC.LOGGER_LEVEL_ERROR,message,arguments)
},errorGroupEnd:function(){SC.Logger._handleGroupEnd(SC.LOGGER_LEVEL_ERROR)},outputRecordedLogMessages:function(includeTimestamps){if(!this.get("exists")){return
}var reporter=this.get("reporter"),entries=this.get("recordedLogMessages"),indentation=0,timestampFormat=SC.LOGGER_RECORDED_LOG_TIMESTAMP_PREFIX,i,iLen,entry,type,timestampStr,message,originalArguments,output,title,newIndentation,disparity,j,jLen;
if(entries){for(i=0,iLen=entries.length;i<iLen;++i){entry=entries[i];type=entry.type;
if(includeTimestamps){timestampStr=timestampFormat.fmt(entry.timestamp.utcFormat())
}message=entry.message;if(message){originalArguments=entry.originalArguments;this._outputMessage(type,timestampStr,indentation,message,originalArguments)
}else{newIndentation=entry.indentation;title=entry.title;disparity=newIndentation-indentation;
if(reporter.group){if(Math.abs(disparity)>1){for(j=0,jLen=(disparity-1);j<jLen;++j){if(disparity>0){reporter.group()
}else{reporter.groupEnd()}}}if(disparity>0){output=timestampStr?timestampStr:"";output+=title;
reporter.group(output)}else{reporter.groupEnd()}}else{if(disparity>0){this._outputGroup(type,timestampStr,newIndentation-1,title)
}}indentation=newIndentation}}}},stringifyRecordedLogMessages:function(){var ret="",entries=this.get("recordedLogMessages"),indentation=0,timestampFormat=SC.LOGGER_RECORDED_LOG_TIMESTAMP_PREFIX,prefixMapping=this._LOG_FALLBACK_PREFIX_MAPPING,groupHeader=SC.LOGGER_LOG_GROUP_HEADER,i,iLen,entry,type,message,originalArguments,prefix,line,title,newIndentation,disparity;
if(entries){for(i=0,iLen=entries.length;i<iLen;++i){entry=entries[i];type=entry.type;
prefix=timestampFormat.fmt(entry.timestamp.utcFormat());prefix+=prefixMapping[type]||"";
message=entry.message;if(message){originalArguments=entry.originalArguments;line=prefix+this._indentation(indentation);
line+=originalArguments?this._argumentsToString(originalArguments):message}else{newIndentation=entry.indentation;
title=entry.title;disparity=newIndentation-indentation;if(disparity>0){line=prefix+this._indentation(indentation)+groupHeader.fmt(title)
}indentation=newIndentation}ret+=line+"\n"}}return ret},log:function(){var reporter=this.get("reporter"),ret=NO;
if(this.get("exists")){if(typeof reporter.log==="function"){reporter.log.apply(reporter,arguments);
ret=YES}else{if(reporter.log){reporter.log(this._argumentsToArray(arguments));ret=YES
}}}if(!ret&&this.get("fallBackOnAlert")){if(this.get("exists")&&(typeof reporter.alert==="function")){reporter.alert(arguments);
ret=YES}else{alert(arguments);ret=YES}}return ret},group:function(title){var reporter=this.get("reporter");
if(this.get("exists")&&(typeof reporter.group==="function")){reporter.group(title)
}},groupEnd:function(){var reporter=this.get("reporter");if(this.get("exists")&&(typeof reporter.groupEnd==="function")){reporter.groupEnd()
}},dir:function(){var reporter=this.get("reporter");if(this.get("exists")&&(typeof reporter.dir==="function")){reporter.dir.apply(reporter,arguments)
}else{this.log.apply(this,arguments)}},dirxml:function(){var reporter=this.get("reporter");
if(this.get("exists")&&(typeof reporter.dirxml==="function")){reporter.dirxml.apply(reporter,arguments)
}else{this.log.apply(this,arguments)}},profile:function(title){var reporter=this.get("reporter");
if(this.get("exists")&&(typeof reporter.profile==="function")){reporter.profile(title);
return YES}return NO},profileEnd:function(title){var reporter=this.get("reporter");
if(this.get("exists")&&(typeof reporter.profileEnd==="function")){reporter.profileEnd(title);
return YES}return NO},time:function(name){var reporter=this.get("reporter");if(this.get("exists")&&(typeof reporter.time==="function")){reporter.time(name);
return YES}return NO},timeEnd:function(name){var reporter=this.get("reporter");if(this.get("exists")&&(typeof reporter.timeEnd==="function")){reporter.timeEnd(name);
return YES}return NO},trace:function(){var reporter=this.get("reporter");if(this.get("exists")&&(typeof reporter.trace==="function")){reporter.trace();
return YES}return NO},init:function(){arguments.callee.base.apply(this,arguments);
if(!this.get("logOutputLevel")){if(SC.buildMode==="debug"){this.set("logOutputLevel",SC.LOGGER_LEVEL_DEBUG)
}else{this.set("logOutputLevel",SC.LOGGER_LEVEL_INFO)}}this.debugEnabledDidChange()
},debugEnabledDidChange:function(){if(this.get("debugEnabled")){this.set("logOutputLevel",SC.LOGGER_LEVEL_DEBUG)
}}.observes("debugEnabled"),_handleMessage:function(type,automaticallyFormat,message,originalArguments){var shouldOutput=this._shouldOutputType(type),shouldRecord=this._shouldRecordType(type),hasOtherArguments,i,len,args,output,entry;
if(!(shouldOutput||shouldRecord)){return}hasOtherArguments=(originalArguments&&originalArguments.length>1);
if(automaticallyFormat&&(SC.none(message)||(typeof message!=="string"))){automaticallyFormat=NO
}if(automaticallyFormat){if(hasOtherArguments){args=[];for(i=1,len=originalArguments.length;
i<len;++i){args.push(originalArguments[i])}message=message.fmt.apply(message,args)
}}if(shouldOutput){args=automaticallyFormat?null:originalArguments;this._outputMessage(type,null,this._outputIndentationLevel,message,args)
}if(shouldRecord){entry={type:type,message:message?message:YES,timestamp:new Date()};
if(!automaticallyFormat&&hasOtherArguments){entry.originalArguments=originalArguments
}this._addRecordedMessageEntry(entry)}},_handleGroup:function(type,title,originalArguments){var shouldOutput=this._shouldOutputType(type),shouldRecord=this._shouldRecordType(type),hasOtherArguments,i,len,args,arg,reporter,func,header,output,indentation,entry;
if(!(shouldOutput||shouldRecord)){return}hasOtherArguments=(originalArguments&&originalArguments.length>1);
if(title&&hasOtherArguments){args=[];for(i=1,len=originalArguments.length;i<len;++i){args.push(originalArguments[i])
}title=title.fmt.apply(title,args)}if(shouldOutput){this._outputGroup(type,null,this._outputIndentationLevel,title);
this._outputIndentationLevel++}if(shouldRecord){indentation=++this._recordingIndentationLevel;
entry={type:type,indentation:indentation,beginGroup:YES,title:title,timestamp:new Date()};
this._addRecordedMessageEntry(entry)}},_handleGroupEnd:function(type){var shouldOutput=this._shouldOutputType(type),shouldRecord=this._shouldRecordType(type),reporter,func,indentation,entry;
if(!(shouldOutput||shouldRecord)){return}if(shouldOutput){this._outputIndentationLevel--;
if(this.get("exists")){reporter=this.get("reporter");func=reporter.groupEnd;if(func){func.call(reporter)
}}}if(shouldRecord){indentation=--this._recordingIndentationLevel;entry={type:type,indentation:indentation,timestamp:new Date()};
this._addRecordedMessageEntry(entry)}},_shouldOutputType:function(type){var logLevelMapping=this._LOG_LEVEL_MAPPING,level=logLevelMapping[type]||0,currentLevel=logLevelMapping[this.get("logOutputLevel")]||0;
return(level<=currentLevel)},_shouldRecordType:function(type){var logLevelMapping=this._LOG_LEVEL_MAPPING,level=logLevelMapping[type]||0,currentLevel=logLevelMapping[this.get("logRecordingLevel")]||0;
return(level<=currentLevel)},_outputMessage:function(type,timestampStr,indentation,message,originalArguments){if(!this.get("exists")){return
}var reporter=this.get("reporter"),output,shouldIndent,func,prefix,args,arg;shouldIndent=!reporter.group;
func=reporter[type];if(func){if(!originalArguments){output="";if(timestampStr){output=timestampStr
}if(shouldIndent){output=+this._indentation(indentation)}output+=message;reporter[type](output)
}else{args=this._argumentsToArray(originalArguments);prefix="";if(timestampStr){prefix=timestampStr
}if(shouldIndent){prefix+=this._indentation(indentation)}if(prefix){args.splice(0,0,prefix)
}if(func.apply){func.apply(reporter,args)}else{reporter[type](args)}}}else{if(reporter.log){prefix="";
if(timestampStr){prefix=timestampStr}prefix+=this._LOG_FALLBACK_PREFIX_MAPPING[type]||"";
if(shouldIndent){prefix+=this._indentation(indentation)}if(!originalArguments){reporter.log(prefix+message)
}else{args=this._argumentsToArray(originalArguments);if(prefix){args.splice(0,0,prefix)
}reporter.log(args)}}}},_outputGroup:function(type,timestampStr,indentation,title){if(!this.get("exists")){return
}var reporter=this.get("reporter"),func=reporter.group,output;if(func){output=timestampStr?timestampStr:"";
output+=title;func.call(reporter,output)}else{if(reporter.log){output="";if(timestampStr){output=timestampStr
}output+=this._LOG_FALLBACK_PREFIX_MAPPING[type]||"";output+=this._indentation(indentation);
output+=SC.LOGGER_LOG_GROUP_HEADER.fmt(title);reporter.log(output)}}},_addRecordedMessageEntry:function(entry){var recordedMessages=this.get("recordedLogMessages"),len;
if(!recordedMessages){recordedMessages=[];this.set("recordedLogMessages",recordedMessages)
}recordedMessages.push(entry);len=recordedMessages.length;if(len>this.get("recordedLogMessagesMaximumLength")){recordedMessages.splice(0,(len-this.get("recordedLogMessagesPruningMinimumLength")))
}recordedMessages.enumerableContentDidChange()},_argumentsToArray:function(args){var ret=[],i,len;
if(args){for(i=0,len=args.length;i<len;++i){ret[i]=args[i]}}return ret},_argumentsToString:function(){var ret="",delimeter=SC.LOGGER_LOG_DELIMITER,i,len;
for(i=0,len=(arguments.length-1);i<len;++i){ret+=arguments[i]+delimeter}ret+=arguments[len];
return ret},_indentation:function(level){if(!level||level<0){level=0}var ret="",indent=SC.LOGGER_LOG_GROUP_INDENTATION,i;
for(i=0;i<level;++i){ret+=indent}return ret},_outputIndentationLevel:0,_recordingIndentationLevel:0,_LOG_LEVEL_MAPPING:{debug:4,info:3,warn:2,error:1,none:0},_LOG_FALLBACK_PREFIX_MAPPING:{debug:SC.LOGGER_LOG_DEBUG,info:SC.LOGGER_LOG_INFO,warn:SC.LOGGER_LOG_WARN,error:SC.LOGGER_LOG_ERROR}});
SC.debug=SC.Logger.debug;SC.info=SC.Logger.info;SC.warn=SC.Logger.warn;SC.error=SC.Logger.error;
sc_require("private/observer_set");SC.RunLoop=SC.Object.extend({beginRunLoop:function(){this._start=new Date().getTime();
if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){SC.Logger.log("-- SC.RunLoop.beginRunLoop at %@".fmt(this._start))
}this._runLoopInProgress=YES;return this},isRunLoopInProgress:function(){return this._runLoopInProgress
}.property(),endRunLoop:function(){if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){SC.Logger.log("-- SC.RunLoop.endRunLoop ~ flushing application queues")
}this.flushAllPending();this._start=null;if(SC.LOG_BINDINGS||SC.LOG_OBSERVERS){SC.Logger.log("-- SC.RunLoop.endRunLoop ~ End")
}SC.RunLoop.lastRunLoopEnd=Date.now();this._runLoopInProgress=NO;return this},flushAllPending:function(){var didChange;
do{didChange=this.flushApplicationQueues();if(!didChange){didChange=this._flushinvokeLastQueue()
}}while(didChange)},invokeOnce:function(target,method){if(method===undefined){method=target;
target=this}if(typeof method==="string"){method=target[method]}if(!this._invokeQueue){this._invokeQueue=SC.ObserverSet.create()
}if(method){this._invokeQueue.add(target,method)}return this},invokeLast:function(target,method){if(method===undefined){method=target;
target=this}if(typeof method==="string"){method=target[method]}if(!this._invokeLastQueue){this._invokeLastQueue=SC.ObserverSet.create()
}this._invokeLastQueue.add(target,method);return this},flushApplicationQueues:function(){var hadContent=NO,queue=this._invokeQueue;
if(queue&&queue.getMembers().length){this._invokeQueue=null;hadContent=YES;queue.invokeMethods()
}return SC.Binding.flushPendingChanges()||hadContent},_flushinvokeLastQueue:function(){var queue=this._invokeLastQueue,hadContent=NO;
if(queue&&queue.getMembers().length){this._invokeLastQueue=null;hadContent=YES;if(hadContent){queue.invokeMethods()
}}return hadContent}});SC.RunLoop.currentRunLoop=null;SC.RunLoop.runLoopClass=SC.RunLoop;
SC.RunLoop.begin=function(){var runLoop=this.currentRunLoop;if(!runLoop){runLoop=this.currentRunLoop=this.runLoopClass.create()
}runLoop.beginRunLoop();return this};SC.RunLoop.end=function(){var runLoop=this.currentRunLoop;
if(!runLoop){throw"SC.RunLoop.end() called outside of a runloop!"}runLoop.endRunLoop();
return this};SC.RunLoop.isRunLoopInProgress=function(){if(this.currentRunLoop){return this.currentRunLoop.get("isRunLoopInProgress")
}return NO};SC.run=function(callback,target,forceNested){var alreadyRunning=SC.RunLoop.isRunLoopInProgress();
if(SC.ExceptionHandler&&SC.ExceptionHandler.enabled){try{if(forceNested||!alreadyRunning){SC.RunLoop.begin()
}if(callback){callback.call(target)}if(forceNested||!alreadyRunning){SC.RunLoop.end()
}}catch(e){SC.ExceptionHandler.handleException(e);if(!SC.browser.msie){throw e}}}else{if(forceNested||!alreadyRunning){SC.RunLoop.begin()
}if(callback){callback.call(target)}if(forceNested||!alreadyRunning){SC.RunLoop.end()
}}};var handlebars=(function(){var parser={trace:function trace(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,statements:6,simpleInverse:7,statement:8,openInverse:9,closeBlock:10,openBlock:11,mustache:12,partial:13,CONTENT:14,COMMENT:15,OPEN_BLOCK:16,inMustache:17,CLOSE:18,OPEN_INVERSE:19,OPEN_ENDBLOCK:20,path:21,OPEN:22,OPEN_UNESCAPED:23,OPEN_PARTIAL:24,params:25,hash:26,param:27,STRING:28,hashSegments:29,hashSegment:30,ID:31,EQUALS:32,pathSegments:33,SEP:34,"$accept":0,"$end":1},terminals_:{2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"OPEN_PARTIAL",28:"STRING",31:"ID",32:"EQUALS",34:"SEP"},productions_:[0,[3,2],[4,3],[4,1],[4,0],[6,1],[6,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[7,2],[17,3],[17,2],[17,2],[17,1],[25,2],[25,1],[27,1],[27,1],[26,1],[29,2],[29,1],[30,3],[30,3],[21,1],[33,3],[33,1]],performAction:function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$){var $0=$$.length-1;
switch(yystate){case 1:return $$[$0-1];break;case 2:this.$=new yy.ProgramNode($$[$0-2],$$[$0]);
break;case 3:this.$=new yy.ProgramNode($$[$0]);break;case 4:this.$=new yy.ProgramNode([]);
break;case 5:this.$=[$$[$0]];break;case 6:$$[$0-1].push($$[$0]);this.$=$$[$0-1];break;
case 7:this.$=new yy.InverseNode($$[$0-2],$$[$0-1],$$[$0]);break;case 8:this.$=new yy.BlockNode($$[$0-2],$$[$0-1],$$[$0]);
break;case 9:this.$=$$[$0];break;case 10:this.$=$$[$0];break;case 11:this.$=new yy.ContentNode($$[$0]);
break;case 12:this.$=new yy.CommentNode($$[$0]);break;case 13:this.$=new yy.MustacheNode($$[$0-1][0],$$[$0-1][1]);
break;case 14:this.$=new yy.MustacheNode($$[$0-1][0],$$[$0-1][1]);break;case 15:this.$=$$[$0-1];
break;case 16:this.$=new yy.MustacheNode($$[$0-1][0],$$[$0-1][1]);break;case 17:this.$=new yy.MustacheNode($$[$0-1][0],$$[$0-1][1],true);
break;case 18:this.$=new yy.PartialNode($$[$0-1]);break;case 19:this.$=new yy.PartialNode($$[$0-2],$$[$0-1]);
break;case 20:break;case 21:this.$=[[$$[$0-2]].concat($$[$0-1]),$$[$0]];break;case 22:this.$=[[$$[$0-1]].concat($$[$0]),null];
break;case 23:this.$=[[$$[$0-1]],$$[$0]];break;case 24:this.$=[[$$[$0]],null];break;
case 25:$$[$0-1].push($$[$0]);this.$=$$[$0-1];break;case 26:this.$=[$$[$0]];break;
case 27:this.$=$$[$0];break;case 28:this.$=new yy.StringNode($$[$0]);break;case 29:this.$=new yy.HashNode($$[$0]);
break;case 30:$$[$0-1].push($$[$0]);this.$=$$[$0-1];break;case 31:this.$=[$$[$0]];
break;case 32:this.$=[$$[$0-2],$$[$0]];break;case 33:this.$=[$$[$0-2],new yy.StringNode($$[$0])];
break;case 34:this.$=new yy.IdNode($$[$0]);break;case 35:$$[$0-2].push($$[$0]);this.$=$$[$0-2];
break;case 36:this.$=[$$[$0]];break}},table:[{3:1,4:2,5:[2,4],6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{1:[3]},{5:[1,16]},{5:[2,3],7:17,8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,19],20:[2,3],22:[1,13],23:[1,14],24:[1,15]},{5:[2,5],14:[2,5],15:[2,5],16:[2,5],19:[2,5],20:[2,5],22:[2,5],23:[2,5],24:[2,5]},{4:20,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{4:21,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],24:[2,12]},{17:22,21:23,31:[1,25],33:24},{17:26,21:23,31:[1,25],33:24},{17:27,21:23,31:[1,25],33:24},{17:28,21:23,31:[1,25],33:24},{21:29,31:[1,25],33:24},{1:[2,1]},{6:30,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{5:[2,6],14:[2,6],15:[2,6],16:[2,6],19:[2,6],20:[2,6],22:[2,6],23:[2,6],24:[2,6]},{17:22,18:[1,31],21:23,31:[1,25],33:24},{10:32,20:[1,33]},{10:34,20:[1,33]},{18:[1,35]},{18:[2,24],21:40,25:36,26:37,27:38,28:[1,41],29:39,30:42,31:[1,43],33:24},{18:[2,34],28:[2,34],31:[2,34],34:[1,44]},{18:[2,36],28:[2,36],31:[2,36],34:[2,36]},{18:[1,45]},{18:[1,46]},{18:[1,47]},{18:[1,48],21:49,31:[1,25],33:24},{5:[2,2],8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,2],22:[1,13],23:[1,14],24:[1,15]},{14:[2,20],15:[2,20],16:[2,20],19:[2,20],22:[2,20],23:[2,20],24:[2,20]},{5:[2,7],14:[2,7],15:[2,7],16:[2,7],19:[2,7],20:[2,7],22:[2,7],23:[2,7],24:[2,7]},{21:50,31:[1,25],33:24},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8]},{14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],24:[2,14]},{18:[2,22],21:40,26:51,27:52,28:[1,41],29:39,30:42,31:[1,43],33:24},{18:[2,23]},{18:[2,26],28:[2,26],31:[2,26]},{18:[2,29],30:53,31:[1,54]},{18:[2,27],28:[2,27],31:[2,27]},{18:[2,28],28:[2,28],31:[2,28]},{18:[2,31],31:[2,31]},{18:[2,36],28:[2,36],31:[2,36],32:[1,55],34:[2,36]},{31:[1,56]},{14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16]},{5:[2,17],14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18]},{18:[1,57]},{18:[1,58]},{18:[2,21]},{18:[2,25],28:[2,25],31:[2,25]},{18:[2,30],31:[2,30]},{32:[1,55]},{21:59,28:[1,60],31:[1,25],33:24},{18:[2,35],28:[2,35],31:[2,35],34:[2,35]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15]},{18:[2,32],31:[2,32]},{18:[2,33],31:[2,33]}],defaultActions:{16:[2,1],37:[2,23],51:[2,21]},parseError:function parseError(str,hash){throw new Error(str)
},parse:function parse(input){var self=this,stack=[0],vstack=[null],lstack=[],table=this.table,yytext="",yylineno=0,yyleng=0,recovering=0,TERROR=2,EOF=1;
this.lexer.setInput(input);this.lexer.yy=this.yy;this.yy.lexer=this.lexer;var yyloc=this.lexer.yylloc;
lstack.push(yyloc);if(typeof this.yy.parseError==="function"){this.parseError=this.yy.parseError
}function popStack(n){stack.length=stack.length-2*n;vstack.length=vstack.length-n;
lstack.length=lstack.length-n}function lex(){var token;token=self.lexer.lex()||1;
if(typeof token!=="number"){token=self.symbols_[token]||token}return token}var symbol,preErrorSymbol,state,action,a,r,yyval={},p,len,newState,expected;
while(true){state=stack[stack.length-1];if(this.defaultActions[state]){action=this.defaultActions[state]
}else{if(symbol==null){symbol=lex()}action=table[state]&&table[state][symbol]}if(typeof action==="undefined"||!action.length||!action[0]){if(!recovering){expected=[];
for(p in table[state]){if(this.terminals_[p]&&p>2){expected.push("'"+this.terminals_[p]+"'")
}}var errStr="";if(this.lexer.showPosition){errStr="Parse error on line "+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(", ")
}else{errStr="Parse error on line "+(yylineno+1)+": Unexpected "+(symbol==1?"end of input":("'"+(this.terminals_[symbol]||symbol)+"'"))
}this.parseError(errStr,{text:this.lexer.match,token:this.terminals_[symbol]||symbol,line:this.lexer.yylineno,loc:yyloc,expected:expected})
}if(recovering==3){if(symbol==EOF){throw new Error(errStr||"Parsing halted.")}yyleng=this.lexer.yyleng;
yytext=this.lexer.yytext;yylineno=this.lexer.yylineno;yyloc=this.lexer.yylloc;symbol=lex()
}while(1){if((TERROR.toString()) in table[state]){break}if(state==0){throw new Error(errStr||"Parsing halted.")
}popStack(1);state=stack[stack.length-1]}preErrorSymbol=symbol;symbol=TERROR;state=stack[stack.length-1];
action=table[state]&&table[state][TERROR];recovering=3}if(action[0] instanceof Array&&action.length>1){throw new Error("Parse Error: multiple actions possible at state: "+state+", token: "+symbol)
}switch(action[0]){case 1:stack.push(symbol);vstack.push(this.lexer.yytext);lstack.push(this.lexer.yylloc);
stack.push(action[1]);symbol=null;if(!preErrorSymbol){yyleng=this.lexer.yyleng;yytext=this.lexer.yytext;
yylineno=this.lexer.yylineno;yyloc=this.lexer.yylloc;if(recovering>0){recovering--
}}else{symbol=preErrorSymbol;preErrorSymbol=null}break;case 2:len=this.productions_[action[1]][1];
yyval.$=vstack[vstack.length-len];yyval._$={first_line:lstack[lstack.length-(len||1)].first_line,last_line:lstack[lstack.length-1].last_line,first_column:lstack[lstack.length-(len||1)].first_column,last_column:lstack[lstack.length-1].last_column};
r=this.performAction.call(yyval,yytext,yyleng,yylineno,this.yy,action[1],vstack,lstack);
if(typeof r!=="undefined"){return r}if(len){stack=stack.slice(0,-1*len*2);vstack=vstack.slice(0,-1*len);
lstack=lstack.slice(0,-1*len)}stack.push(this.productions_[action[1]][0]);vstack.push(yyval.$);
lstack.push(yyval._$);newState=table[stack[stack.length-2]][stack[stack.length-1]];
stack.push(newState);break;case 3:return true}}return true}};var lexer=(function(){var lexer=({EOF:1,parseError:function parseError(str,hash){if(this.yy.parseError){this.yy.parseError(str,hash)
}else{throw new Error(str)}},setInput:function(input){this._input=input;this._more=this._less=this.done=false;
this.yylineno=this.yyleng=0;this.yytext=this.matched=this.match="";this.conditionStack=["INITIAL"];
this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};return this},input:function(){var ch=this._input[0];
this.yytext+=ch;this.yyleng++;this.match+=ch;this.matched+=ch;var lines=ch.match(/\n/);
if(lines){this.yylineno++}this._input=this._input.slice(1);return ch},unput:function(ch){this._input=ch+this._input;
return this},more:function(){this._more=true;return this},pastInput:function(){var past=this.matched.substr(0,this.matched.length-this.match.length);
return(past.length>20?"...":"")+past.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var next=this.match;
if(next.length<20){next+=this._input.substr(0,20-next.length)}return(next.substr(0,20)+(next.length>20?"...":"")).replace(/\n/g,"")
},showPosition:function(){var pre=this.pastInput();var c=new Array(pre.length+1).join("-");
return pre+this.upcomingInput()+"\n"+c+"^"},next:function(){if(this.done){return this.EOF
}if(!this._input){this.done=true}var token,match,col,lines;if(!this._more){this.yytext="";
this.match=""}var rules=this._currentRules();for(var i=0;i<rules.length;i++){match=this._input.match(this.rules[rules[i]]);
if(match){lines=match[0].match(/\n.*/g);if(lines){this.yylineno+=lines.length}this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:lines?lines[lines.length-1].length-1:this.yylloc.last_column+match.length};
this.yytext+=match[0];this.match+=match[0];this.matches=match;this.yyleng=this.yytext.length;
this._more=false;this._input=this._input.slice(match[0].length);this.matched+=match[0];
token=this.performAction.call(this,this.yy,this,rules[i],this.conditionStack[this.conditionStack.length-1]);
if(token){return token}else{return}}}if(this._input===""){return this.EOF}else{this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})
}},lex:function lex(){var r=this.next();if(typeof r!=="undefined"){return r}else{return this.lex()
}},begin:function begin(condition){this.conditionStack.push(condition)},popState:function popState(){return this.conditionStack.pop()
},_currentRules:function _currentRules(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules
}});lexer.performAction=function anonymous(yy,yy_,$avoiding_name_collisions,YY_START){var YYSTATE=YY_START;
switch($avoiding_name_collisions){case 0:this.begin("mu");if(yy_.yytext){return 14
}break;case 1:return 14;break;case 2:return 24;break;case 3:return 16;break;case 4:return 20;
break;case 5:return 19;break;case 6:return 19;break;case 7:return 23;break;case 8:return 23;
break;case 9:yy_.yytext=yy_.yytext.substr(3,yy_.yyleng-5);this.begin("INITIAL");return 15;
break;case 10:return 22;break;case 11:return 32;break;case 12:return 31;break;case 13:return 31;
break;case 14:return 34;break;case 15:break;case 16:this.begin("INITIAL");return 18;
break;case 17:this.begin("INITIAL");return 18;break;case 18:yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"');
return 28;break;case 19:return 31;break;case 20:return"INVALID";break;case 21:return 5;
break}};lexer.rules=[/^[^\x00]*?(?=(\{\{))/,/^[^\x00]+/,/^\{\{>/,/^\{\{#/,/^\{\{\//,/^\{\{\^/,/^\{\{\s*else\b/,/^\{\{\{/,/^\{\{&/,/^\{\{!.*?\}\}/,/^\{\{/,/^=/,/^\.(?=[} ])/,/^\.\./,/^[/.]/,/^\s+/,/^\}\}\}/,/^\}\}/,/^"(\\["]|[^"])*"/,/^[a-zA-Z0-9_]+(?=[=} /.])/,/^./,/^$/];
lexer.conditions={mu:{rules:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],inclusive:false},INITIAL:{rules:[0,1,21],inclusive:true}};
return lexer})();parser.lexer=lexer;return parser})();var Handlebars=(typeof exports!=="undefined")?exports:{};
Handlebars.Parser=handlebars;Handlebars.parse=function(string){Handlebars.Parser.yy=Handlebars.AST;
return Handlebars.Parser.parse(string)};Handlebars.print=function(ast){return new Handlebars.PrintVisitor().accept(ast)
};Handlebars.Runtime={};Handlebars.Runtime.compile=function(string){var ast=Handlebars.parse(string);
return function(context,helpers,partials){helpers=helpers||Handlebars.helpers;partials=partials||Handlebars.partials;
var internalContext=new Handlebars.Context(context,helpers,partials);var runtime=new Handlebars.Runtime(internalContext);
runtime.accept(ast);return runtime.buffer}};Handlebars.helpers={};Handlebars.partials={};
Handlebars.registerHelper=function(name,fn,inverse){if(inverse){fn.not=inverse}this.helpers[name]=fn
};Handlebars.registerPartial=function(name,str){this.partials[name]=str};Handlebars.registerHelper("blockHelperMissing",function(context,fn,inverse){inverse=inverse||function(){};
var ret="";var type=Object.prototype.toString.call(context);if(type==="[object Function]"){context=context()
}if(context===true){return fn(this)}else{if(context===false||context==null){return inverse(this)
}else{if(type==="[object Array]"){if(context.length>0){for(var i=0,j=context.length;
i<j;i++){ret=ret+fn(context[i])}}else{ret=inverse(this)}return ret}else{return fn(context)
}}}},function(context,fn){return fn(context)});Handlebars.registerHelper("each",function(context,fn,inverse){var ret="";
if(context&&context.length>0){for(var i=0,j=context.length;i<j;i++){ret=ret+fn(context[i])
}}else{ret=inverse(this)}return ret});Handlebars.registerHelper("if",function(context,fn,inverse){if(!context||context==[]){return inverse(this)
}else{return fn(this)}});Handlebars.registerHelper("unless",function(context,fn,inverse){Handlebars.helpers["if"].call(this,context,inverse,fn)
});Handlebars.registerHelper("with",function(context,fn){return fn(context)});Handlebars.logger={DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(level,str){}};
Handlebars.log=function(level,str){Handlebars.logger.log(level,str)};(function(){Handlebars.AST={};
Handlebars.AST.ProgramNode=function(statements,inverse){this.type="program";this.statements=statements;
if(inverse){this.inverse=new Handlebars.AST.ProgramNode(inverse)}};Handlebars.AST.MustacheNode=function(params,hash,unescaped){this.type="mustache";
this.id=params[0];this.params=params.slice(1);this.hash=hash;this.escaped=!unescaped
};Handlebars.AST.PartialNode=function(id,context){this.type="partial";this.id=id;
this.context=context};var verifyMatch=function(open,close){if(open.original!==close.original){throw new Handlebars.Exception(open.original+" doesn't match "+close.original)
}};Handlebars.AST.BlockNode=function(mustache,program,close){verifyMatch(mustache.id,close);
this.type="block";this.mustache=mustache;this.program=program};Handlebars.AST.InverseNode=function(mustache,program,close){verifyMatch(mustache.id,close);
this.type="inverse";this.mustache=mustache;this.program=program};Handlebars.AST.ContentNode=function(string){this.type="content";
this.string=string};Handlebars.AST.HashNode=function(pairs){this.type="hash";this.pairs=pairs
};Handlebars.AST.IdNode=function(parts){this.type="ID";this.original=parts.join("/");
var dig=[],depth=0;for(var i=0,l=parts.length;i<l;i++){var part=parts[i];if(part===".."){depth++
}else{if(part==="."||part==="this"){continue}else{dig.push(part)}}}this.parts=dig;
this.depth=depth;this.isSimple=(dig.length===1)&&(depth===0)};Handlebars.AST.StringNode=function(string){this.type="STRING";
this.string=string};Handlebars.AST.CommentNode=function(comment){this.type="comment";
this.comment=comment}})();Handlebars.Visitor=function(){};Handlebars.Visitor.prototype={accept:function(object){return this[object.type](object)
}};Handlebars.Exception=function(message){this.message=message};Handlebars.SafeString=function(string){this.string=string
};Handlebars.SafeString.prototype.toString=function(){return this.string.toString()
};(function(){var escape={"<":"&lt;",">":"&gt;"};var badChars=/&(?!\w+;)|[<>]/g;var possible=/[&<>]/;
var escapeChar=function(chr){return escape[chr]||"&amp;"};Handlebars.Utils={escapeExpression:function(string){if(string instanceof Handlebars.SafeString){return string.toString()
}else{if(string==null||string===false){return""}}if(!possible.test(string)){return string
}return string.replace(badChars,escapeChar)},isEmpty:function(value){if(typeof value==="undefined"){return true
}else{if(value===null){return true}else{if(value===false){return true}else{if(Object.prototype.toString.call(value)==="[object Array]"&&value.length===0){return true
}else{return false}}}}}}})();Handlebars.Compiler=function(){};Handlebars.JavaScriptCompiler=function(){};
(function(Compiler,JavaScriptCompiler){Compiler.OPCODE_MAP={appendContent:1,getContext:2,lookupWithHelpers:3,lookup:4,append:5,invokeMustache:6,appendEscaped:7,pushString:8,truthyOrFallback:9,functionOrFallback:10,invokeProgram:11,invokePartial:12,push:13,invokeInverse:14,assignToHash:15};
Compiler.MULTI_PARAM_OPCODES={appendContent:1,getContext:1,lookupWithHelpers:1,lookup:1,invokeMustache:2,pushString:1,truthyOrFallback:1,functionOrFallback:1,invokeProgram:2,invokePartial:1,push:1,invokeInverse:1,assignToHash:1};
Compiler.DISASSEMBLE_MAP={};for(var prop in Compiler.OPCODE_MAP){var value=Compiler.OPCODE_MAP[prop];
Compiler.DISASSEMBLE_MAP[value]=prop}Compiler.multiParamSize=function(code){return Compiler.MULTI_PARAM_OPCODES[Compiler.DISASSEMBLE_MAP[code]]
};Compiler.prototype={disassemble:function(){var opcodes=this.opcodes,opcode,nextCode;
var out=[],str,name,value;for(var i=0,l=opcodes.length;i<l;i++){opcode=opcodes[i];
if(opcode==="DECLARE"){name=opcodes[++i];value=opcodes[++i];out.push("DECLARE "+name+" = "+value)
}else{str=Compiler.DISASSEMBLE_MAP[opcode];var extraParams=Compiler.multiParamSize(opcode);
var codes=[];for(var j=0;j<extraParams;j++){nextCode=opcodes[++i];if(typeof nextCode==="string"){nextCode='"'+nextCode.replace("\n","\\n")+'"'
}codes.push(nextCode)}str=str+" "+codes.join(" ");out.push(str)}}return out.join("\n")
},guid:0,compile:function(program){this.children=[];this.depths={list:[]};return this.program(program)
},accept:function(node){return this[node.type](node)},program:function(program){var statements=program.statements,statement;
this.opcodes=[];for(var i=0,l=statements.length;i<l;i++){statement=statements[i];
this[statement.type](statement)}this.depths.list=this.depths.list.sort(function(a,b){return a-b
});return this},compileProgram:function(program){var result=new Compiler().compile(program);
var guid=this.guid++;this.usePartial=this.usePartial||result.usePartial;this.children[guid]=result;
for(var i=0,l=result.depths.list.length;i<l;i++){depth=result.depths.list[i];if(depth<2){continue
}else{this.addDepth(depth-1)}}return guid},block:function(block){var mustache=block.mustache;
var depth,child,inverse,inverseGuid;var params=this.setupStackForMustache(mustache);
var programGuid=this.compileProgram(block.program);if(block.program.inverse){inverseGuid=this.compileProgram(block.program.inverse);
this.declare("inverse",inverseGuid)}this.opcode("invokeProgram",programGuid,params.length);
this.declare("inverse",null);this.opcode("append")},inverse:function(block){this.ID(block.mustache.id);
var programGuid=this.compileProgram(block.program);this.opcode("invokeInverse",programGuid);
this.opcode("append")},hash:function(hash){var pairs=hash.pairs,pair,val;this.opcode("push","{}");
for(var i=0,l=pairs.length;i<l;i++){pair=pairs[i];val=pair[1];this.accept(val);this.opcode("assignToHash",pair[0])
}},partial:function(partial){var id=partial.id;this.usePartial=true;if(partial.context){this.ID(partial.context)
}else{this.opcode("push","context")}this.opcode("invokePartial",id.original);this.opcode("append")
},content:function(content){this.opcode("appendContent",content.string)},mustache:function(mustache){var params=this.setupStackForMustache(mustache);
this.opcode("invokeMustache",params.length,mustache.id.original);if(mustache.escaped){this.opcode("appendEscaped")
}else{this.opcode("append")}},ID:function(id){this.addDepth(id.depth);this.opcode("getContext",id.depth);
this.opcode("lookupWithHelpers",id.parts[0]||null);for(var i=1,l=id.parts.length;
i<l;i++){this.opcode("lookup",id.parts[i])}},STRING:function(string){this.opcode("pushString",string.string)
},comment:function(){},pushParams:function(params){var i=params.length,param;while(i--){param=params[i];
this[param.type](param)}},opcode:function(name,val1,val2){this.opcodes.push(Compiler.OPCODE_MAP[name]);
if(val1!==undefined){this.opcodes.push(val1)}if(val2!==undefined){this.opcodes.push(val2)
}},declare:function(name,value){this.opcodes.push("DECLARE");this.opcodes.push(name);
this.opcodes.push(value)},addDepth:function(depth){if(depth===0){return}if(!this.depths[depth]){this.depths[depth]=true;
this.depths.list.push(depth)}},setupStackForMustache:function(mustache){var params=mustache.params;
this.pushParams(params);if(mustache.hash){this.hash(mustache.hash)}else{this.opcode("push","{}")
}this.ID(mustache.id);return params}};JavaScriptCompiler.prototype={nameLookup:function(parent,name,type){if(JavaScriptCompiler.RESERVED_WORDS[name]){return parent+"['"+name+"']"
}else{return parent+"."+name}},appendToBuffer:function(string){return"buffer = buffer + "+string+";"
},initializeBuffer:function(){return this.quotedString("")},compile:function(environment,data){this.environment=environment;
this.data=data;this.preamble();this.stackSlot=0;this.stackVars=[];this.registers={list:[]};
this.compileChildren(environment,data);Handlebars.log(Handlebars.logger.DEBUG,environment.disassemble()+"\n\n");
var opcodes=environment.opcodes,opcode,name,declareName,declareVal;this.i=0;for(l=opcodes.length;
this.i<l;this.i++){opcode=this.nextOpcode(0);if(opcode[0]==="DECLARE"){this.i=this.i+2;
this[opcode[1]]=opcode[2]}else{this.i=this.i+opcode[1].length;this[opcode[0]].apply(this,opcode[1])
}}return this.createFunction()},nextOpcode:function(n){var opcodes=this.environment.opcodes,opcode=opcodes[this.i+n],name,val;
var extraParams,codes;if(opcode==="DECLARE"){name=opcodes[this.i+1];val=opcodes[this.i+2];
return["DECLARE",name,val]}else{name=Compiler.DISASSEMBLE_MAP[opcode];extraParams=Compiler.multiParamSize(opcode);
codes=[];for(var j=0;j<extraParams;j++){codes.push(opcodes[this.i+j+1+n])}return[name,codes]
}},eat:function(opcode){this.i=this.i+opcode.length},preamble:function(){var out=[];
out.push("var buffer = "+this.initializeBuffer()+", currentContext = context");var copies="helpers = helpers || Handlebars.helpers;";
if(this.environment.usePartial){copies=copies+" partials = partials || Handlebars.partials;"
}out.push(copies);this.lastContext=0;this.source=out},createFunction:function(){var container={escapeExpression:Handlebars.Utils.escapeExpression,invokePartial:Handlebars.VM.invokePartial,programs:[],program:function(i,helpers,partials,data){var programWrapper=this.programs[i];
if(data){return Handlebars.VM.program(this.children[i],helpers,partials,data)}else{if(programWrapper){return programWrapper
}else{programWrapper=this.programs[i]=Handlebars.VM.program(this.children[i],helpers,partials);
return programWrapper}}},programWithDepth:Handlebars.VM.programWithDepth,noop:Handlebars.VM.noop};
var locals=this.stackVars.concat(this.registers.list);if(locals.length>0){this.source[0]=this.source[0]+", "+locals.join(", ")
}this.source[0]=this.source[0]+";";this.source.push("return buffer;");var params=["Handlebars","context","helpers","partials"];
if(this.data){params.push("data")}for(var i=0,l=this.environment.depths.list.length;
i<l;i++){params.push("depth"+this.environment.depths.list[i])}if(params.length===4&&!this.environment.usePartial){params.pop()
}params.push(this.source.join("\n"));var fn=Function.apply(this,params);fn.displayName="Handlebars.js";
Handlebars.log(Handlebars.logger.DEBUG,fn.toString()+"\n\n");container.render=fn;
container.children=this.environment.children;return function(context,helpers,partials,data,$depth){try{var args=Array.prototype.slice.call(arguments);
args.unshift(Handlebars);return container.render.apply(container,args)}catch(e){throw e
}}},appendContent:function(content){this.source.push(this.appendToBuffer(this.quotedString(content)))
},append:function(){var local=this.popStack();this.source.push("if("+local+" || "+local+" === 0) { "+this.appendToBuffer(local)+" }")
},appendEscaped:function(){var opcode=this.nextOpcode(1),extra="";if(opcode[0]==="appendContent"){extra=" + "+this.quotedString(opcode[1][0]);
this.eat(opcode)}this.source.push(this.appendToBuffer("this.escapeExpression("+this.popStack()+")"+extra))
},getContext:function(depth){if(this.lastContext!==depth){this.lastContext=depth;
if(depth===0){this.source.push("currentContext = context;")}else{this.source.push("currentContext = depth"+depth+";")
}}},lookupWithHelpers:function(name){if(name){var topStack=this.nextStack();var toPush="if('"+name+"' in helpers) { "+topStack+" = "+this.nameLookup("helpers",name,"helper")+"; } else { "+topStack+" = "+this.nameLookup("currentContext",name,"context")+"; }";
this.source.push(toPush)}else{this.pushStack("currentContext")}},lookup:function(name){var topStack=this.topStack();
this.source.push(topStack+" = "+this.nameLookup(topStack,name,"context")+";")},pushString:function(string){this.pushStack(this.quotedString(string))
},push:function(name){this.pushStack(name)},invokeMustache:function(paramSize,original){this.populateParams(paramSize,this.quotedString(original),"{}",null,function(nextStack,helperMissingString,id){this.source.push("else if("+id+"=== undefined) { "+nextStack+" = helpers.helperMissing.call("+helperMissingString+"); }");
this.source.push("else { "+nextStack+" = "+id+"; }")})},invokeProgram:function(guid,paramSize){var inverse=this.programExpression(this.inverse);
var mainProgram=this.programExpression(guid);this.populateParams(paramSize,null,mainProgram,inverse,function(nextStack,helperMissingString,id){this.source.push("else { "+nextStack+" = helpers.blockHelperMissing.call("+helperMissingString+"); }")
})},populateParams:function(paramSize,helperId,program,inverse,fn){var id=this.popStack(),nextStack;
var params=[];var hash=this.popStack();for(var i=0;i<paramSize;i++){var param=this.popStack();
params.push(param)}this.register("tmp1",program);this.source.push("tmp1.hash = "+hash+";");
if(inverse){this.source.push("tmp1.fn = tmp1;");this.source.push("tmp1.inverse = "+inverse+";")
}if(this.data){this.source.push("tmp1.data = data;")}params.push("tmp1");if(inverse){params.push(inverse)
}this.populateCall(params,id,helperId||id,fn)},populateCall:function(params,id,helperId,fn){var paramString=["context"].concat(params).join(", ");
var helperMissingString=["context"].concat(helperId).concat(params).join(", ");nextStack=this.nextStack();
this.source.push("if(typeof "+id+" === 'function') { "+nextStack+" = "+id+".call("+paramString+"); }");
fn.call(this,nextStack,helperMissingString,id)},invokeInverse:function(guid){var program=this.programExpression(guid);
var blockMissingParams=["context",this.topStack(),"this.noop",program];this.pushStack("helpers.blockHelperMissing.call("+blockMissingParams.join(", ")+")")
},invokePartial:function(context){this.pushStack("this.invokePartial("+this.nameLookup("partials",context,"partial")+", '"+context+"', "+this.popStack()+", helpers, partials);")
},assignToHash:function(key){var value=this.popStack();var hash=this.topStack();this.source.push(hash+"['"+key+"'] = "+value+";")
},compiler:JavaScriptCompiler,compileChildren:function(environment,data){var children=environment.children,child,compiler;
var compiled=[];for(var i=0,l=children.length;i<l;i++){child=children[i];compiler=new this.compiler();
compiled[i]=compiler.compile(child,data)}environment.rawChildren=children;environment.children=compiled
},programExpression:function(guid){if(guid==null){return"this.noop"}var programParams=[guid,"helpers","partials"];
var depths=this.environment.rawChildren[guid].depths.list;if(this.data){programParams.push("data")
}for(var i=0,l=depths.length;i<l;i++){depth=depths[i];if(depth===1){programParams.push("context")
}else{programParams.push("depth"+(depth-1))}}if(!this.environment.usePartial){if(programParams[3]){programParams[2]="null"
}else{programParams.pop()}}if(depths.length===0){return"this.program("+programParams.join(", ")+")"
}else{programParams[0]="this.children["+guid+"]";return"this.programWithDepth("+programParams.join(", ")+")"
}},register:function(name,val){this.useRegister(name);this.source.push(name+" = "+val+";")
},useRegister:function(name){if(!this.registers[name]){this.registers[name]=true;
this.registers.list.push(name)}},pushStack:function(item){this.source.push(this.nextStack()+" = "+item+";");
return"stack"+this.stackSlot},nextStack:function(){this.stackSlot++;if(this.stackSlot>this.stackVars.length){this.stackVars.push("stack"+this.stackSlot)
}return"stack"+this.stackSlot},popStack:function(){return"stack"+this.stackSlot--
},topStack:function(){return"stack"+this.stackSlot},quotedString:function(str){return'"'+str.replace(/\\/,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r")+'"'
}};var reservedWords=("break case catch continue default delete do else finally for function if in instanceof new return switch this throw try typeof var void while with null true false").split(" ");
compilerWords=JavaScriptCompiler.RESERVED_WORDS={};for(var i=0,l=reservedWords.length;
i<l;i++){compilerWords[reservedWords[i]]=true}})(Handlebars.Compiler,Handlebars.JavaScriptCompiler);
Handlebars.VM={programWithDepth:function(fn){var args=Array.prototype.slice.call(arguments,1);
return function(context,helpers,partials,data){args[0]=helpers||args[0];args[1]=partials||args[1];
args[2]=data||args[2];return fn.apply(this,[context].concat(args))}},program:function(fn,helpers,partials,data){return function(context,h2,p2,d2){return fn(context,h2||helpers,p2||partials,d2||data)
}},noop:function(){return""},compile:function(string,data){var ast=Handlebars.parse(string);
var environment=new Handlebars.Compiler().compile(ast);return new Handlebars.JavaScriptCompiler().compile(environment,data)
},invokePartial:function(partial,name,context,helpers,partials){if(partial===undefined){throw new Handlebars.Exception("The partial "+name+" could not be found")
}else{if(partial instanceof Function){return partial(context,helpers,partials)}else{partials[name]=Handlebars.VM.compile(partial);
return partials[name](context,helpers,partials)}}}};Handlebars.compile=Handlebars.VM.compile;
sc_require("handlebars");SC.Handlebars={};SC.Handlebars.JavaScriptCompiler=function(){};
SC.Handlebars.JavaScriptCompiler.prototype=SC.beget(Handlebars.JavaScriptCompiler.prototype);
SC.Handlebars.JavaScriptCompiler.prototype.compiler=SC.Handlebars.JavaScriptCompiler;
SC.Handlebars.JavaScriptCompiler.prototype.nameLookup=function(parent,name,type){if(type==="context"){return"SC.get("+parent+", "+this.quotedString(name)+");"
}else{return Handlebars.JavaScriptCompiler.prototype.nameLookup.call(this,parent,name,type)
}};SC.Handlebars.compile=function(string){var ast=Handlebars.parse(string);var environment=new Handlebars.Compiler().compile(ast);
return new SC.Handlebars.JavaScriptCompiler().compile(environment,true)};sc_require("extensions");
(function(){var bind=function(property,options,preserveContext,shouldDisplay){var data=options.data;
var view=data.view;var fn=options.fn;var spanId="handlebars-bound-"+jQuery.uuid++;
var result=this.getPath(property);var self=this,renderContext=SC.RenderContext("span").id(spanId);
this.addObserver(property,function observer(){var result=self.getPath(property);var span=view.$("#"+spanId);
if(span.length===0){self.removeObserver(property,observer);return}if(fn&&shouldDisplay(result)){var renderContext=SC.RenderContext("span").id(spanId);
renderContext.push(fn(self.get(property)));var element=renderContext.element();span.replaceWith(element)
}else{if(shouldDisplay(result)){span.html(Handlebars.Utils.escapeExpression(result))
}else{span.html("")}}});if(shouldDisplay(result)){if(preserveContext){renderContext.push(fn(this))
}else{if(fn){renderContext.push(fn(result))}else{renderContext.push(Handlebars.Utils.escapeExpression(result))
}}}return new Handlebars.SafeString(renderContext.join())};Handlebars.registerHelper("bind",function(property,fn){return bind.call(this,property,fn,false,function(result){return !SC.none(result)
})});Handlebars.registerHelper("boundIf",function(property,fn){if(fn){return bind.call(this,property,fn,true,function(result){return !!result
})}else{throw"Cannot use boundIf helper without a block."}})})();Handlebars.registerHelper("bindAttr",function(options){var attrs=options.hash,attrKeys=SC.keys(options.hash);
var view=options.data.view;var ret=[];var dataId=jQuery.uuid++;attrKeys.forEach(function(attr){var property=attrs[attr];
view.addObserver(property,function observer(){var result=view.getPath(property);var elem=view.$("[data-handlebars-id='"+dataId+"']");
if(elem.length===0){view.removeObserver(property,observer);return}elem.attr(attr,result)
});ret.push(attr+'="'+view.getPath(property)+'"')});ret.push('data-handlebars-id="'+dataId+'"');
return ret.join(" ")});sc_require("extensions");Handlebars.registerHelper("collection",function(path,fn,inverse){var data=fn.data;
var collectionClass;if(!data){data=fn;fn=null}if(typeof path==="string"){collectionClass=SC.objectForPropertyPath(path)||SC.TemplateCollectionView
}else{collectionClass=path}var hash=fn.hash,itemHash={},match;for(var prop in hash){if(fn.hash.hasOwnProperty(prop)){match=prop.match(/^item(.)(.*)$/);
if(match){itemHash[match[1].toLowerCase()+match[2]]=hash[prop];delete hash[prop]}}}if(fn){var collectionObject=collectionClass;
if(collectionObject.isClass){collectionObject=collectionObject.prototype}collectionObject.itemViewTemplate=fn;
collectionObject.inverseTemplate=inverse;collectionObject.itemViewOptions=itemHash
}var noop=function(){return""};noop.data=fn.data;noop.hash=fn.hash;noop.fn=noop;return Handlebars.helpers.view.call(this,collectionClass,noop)
});Handlebars.registerHelper("bindCollection",function(path,bindingString,fn){var data=fn.data;
var inverse=fn.data;var collectionClass=SC.objectForPropertyPath(path)||SC.TemplateCollectionView;
var binding=SC.Binding.from(bindingString,this);if(!data){data=fn;fn=null}if(fn){collectionClass.prototype.itemViewTemplate=fn
}if(collectionClass.isClass){collectionClass=collectionClass.extend({contentBinding:binding})
}else{collectionClass.bindings.push(binding.to("content",collectionClass))}return Handlebars.helpers.collection.call(this,collectionClass,fn)
});sc_require("extensions");Handlebars.registerHelper("loc",function(property){return property.loc()
});sc_require("extensions");SC.Handlebars.ViewHelper=SC.Object.create({helper:function(thisContext,path,options){var inverse=options.inverse;
var data=options.data;var view=data.view;var fn=options.fn;var newView;if(path.isClass||path.isObject){newView=path;
if(!newView){throw"Null or undefined object was passed to the #view helper. Did you mean to pass a property path string?"
}}else{if(path.charAt(0)==="."){newView=SC.objectForPropertyPath(path.slice(1),view)
}else{newView=SC.objectForPropertyPath(path)}if(!newView){throw"Unable to find view at path '"+path+"'"
}}var currentView=data.view;var childViews=currentView.get("childViews");var childView=currentView.createChildView(newView);
if(fn){childView.template=fn}childViews.pushObject(childView);var context=SC.RenderContext(childView.get("tagName"));
this.applyAttributes(options.hash,childView,context);childView.applyAttributesToContext(context);
childView.render(context,YES);return new Handlebars.SafeString(context.join())},applyAttributes:function(options,childView,context){var id=options.id;
var classNames=options["class"];if(classNames){context.addClass(classNames.split(" "))
}if(id){childView.set("layerId",id);context.id(id)}var classBindings=options.classBinding;
if(classBindings){this.addClassBindings(classBindings,childView,context)}},addClassBindings:function(classBindings,view,context){var classObservers=view._classObservers;
if(classObservers){for(var prop in classObservers){if(classObservers.hasOwnProperty(prop)){view.removeObserver(prop,classObservers[prop])
}}}classObservers=view._classObservers={};classBindings.split(" ").forEach(function(property){var dasherizedProperty=property.split(".").get("lastObject");
dasherizedProperty=dasherizedProperty.dasherize();var observer=classObservers[property]=function(){var shouldDisplay=view.getPath(property);
var elem=view.$();elem.toggleClass(dasherizedProperty,shouldDisplay)};view.addObserver(property,observer);
context.setClass(dasherizedProperty,view.getPath(property))})}});Handlebars.registerHelper("view",function(path,options){return SC.Handlebars.ViewHelper.helper(this,path,options)
});SC.DROP_ON=1;SC.DROP_BEFORE=2;SC.DROP_AFTER=4;SC.DROP_ANY=7;SC.ALIGN_LEFT="left";
SC.ALIGN_RIGHT="right";SC.ALIGN_CENTER="center";SC.ALIGN_TOP="top";SC.ALIGN_MIDDLE="middle";
SC.ALIGN_BOTTOM="bottom";SC.ALIGN_TOP_LEFT="top-left";SC.ALIGN_TOP_RIGHT="top-right";
SC.ALIGN_BOTTOM_LEFT="bottom-left";SC.ALIGN_BOTTOM_RIGHT="bottom-right";SC.SAFARI_FOCUS_BEHAVIOR=YES;
SC.mixin({data:function(elem,name,data){elem=(elem===window)?"@window":elem;var hash=SC.hashFor(elem);
var cache=SC._data_cache;if(!cache){SC._data_cache=cache={}}var elemCache=cache[hash];
if(name&&!elemCache){cache[hash]=elemCache={}}if(elemCache&&(data!==undefined)){elemCache[name]=data
}return(name)?elemCache[name]:elemCache},removeData:function(elem,name){elem=(elem===window)?"@window":elem;
var hash=SC.hashFor(elem);var cache=SC._data_cache;if(!cache){return undefined}var elemCache=cache[hash];
if(!elemCache){return undefined}var ret=(name)?elemCache[name]:elemCache;if(name){delete elemCache[name]
}else{delete cache[hash]}return ret}});SC.mixin(Function.prototype,{invokeLater:function(target,interval){if(interval===undefined){interval=1
}var f=this;if(arguments.length>2){var args=SC.$A(arguments).slice(2,arguments.length);
args.unshift(target);var func=f;f=function(){return func.apply(this,args.slice(1))
}}return SC.Timer.schedule({target:target,action:f,interval:interval})}});if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]
}CHANCE_SLICES=CHANCE_SLICES.concat([]);SC.Controller=SC.Object.extend({isEditable:YES});
SC.SelectionSupport={hasSelectionSupport:YES,allowsSelection:YES,allowsMultipleSelection:YES,allowsEmptySelection:YES,firstSelectableObject:function(){return this.get("firstObject")
}.property(),selection:function(key,value){var old=this._scsel_selection,oldlen=old?old.get("length"):0,content,empty,len;
if((value===undefined)||!this.get("allowsSelection")){value=old}len=(value&&value.isEnumerable)?value.get("length"):0;
if((len>1)&&!this.get("allowsMultipleSelection")){if(oldlen>1){value=SC.SelectionSet.create().addObject(old.get("firstObject")).freeze();
len=1}else{value=old;len=oldlen}}if((len===0)&&!this.get("allowsEmptySelection")){if(oldlen===0){value=this.get("firstSelectableObject");
if(value){value=SC.SelectionSet.create().addObject(value).freeze()}else{value=SC.SelectionSet.EMPTY
}len=value.get("length")}else{value=old;len=oldlen}}if(len===0){value=SC.SelectionSet.EMPTY
}value=value.frozenCopy();this._scsel_selection=value;return value}.property("arrangedObjects","allowsEmptySelection","allowsMultipleSelection","allowsSelection").cacheable(),hasSelection:function(){var sel=this.get("selection");
return !!sel&&(sel.get("length")>0)}.property("selection").cacheable(),selectObjects:function(objects,extend){if(!objects||objects.get("length")===0){if(!extend){this.set("selection",SC.SelectionSet.EMPTY)
}return this}var sel=this.get("selection");if(extend&&sel){sel=sel.copy()}else{sel=SC.SelectionSet.create()
}sel.addObjects(objects).freeze();this.set("selection",sel);return this},selectObject:function(object,extend){if(object===null){if(!extend){this.set("selection",null)
}return this}else{return this.selectObjects([object],extend)}},deselectObjects:function(objects){if(!objects||objects.get("length")===0){return this
}var sel=this.get("selection");if(!sel||sel.get("length")===0){return this}sel=sel.copy().removeObjects(objects).freeze();
this.set("selection",sel.freeze());return this},deselectObject:function(object){if(!object){return this
}else{return this.deselectObjects([object])}},updateSelectionAfterContentChange:function(){var arrangedObjects=this.get("arrangedObjects");
var selectionSet=this.get("selection");var allowsEmptySelection=this.get("allowsEmptySelection");
var indexSet;if(!selectionSet){return this}indexSet=selectionSet.indexSetForSource(arrangedObjects);
if((indexSet&&(indexSet.get("length")!==selectionSet.get("length")))||(!indexSet&&(selectionSet.get("length")>0))){selectionSet=selectionSet.copy().constrain(arrangedObjects).freeze();
this.set("selection",selectionSet)}if((selectionSet.get("length")===0)&&arrangedObjects&&(arrangedObjects.get("length")>0)&&!allowsEmptySelection){this.selectObject(this.get("firstSelectableObject"),NO)
}return this}};sc_require("controllers/controller");sc_require("mixins/selection_support");
SC.ArrayController=SC.Controller.extend(SC.Array,SC.SelectionSupport,{content:null,isEditable:YES,orderBy:null,allowsSingleContent:YES,destroyOnRemoval:NO,arrangedObjects:function(){return this
}.property().cacheable(),canRemoveContent:function(){var content=this.get("content"),ret;
ret=!!content&&this.get("isEditable")&&this.get("hasContent");if(ret){return !content.isEnumerable||(SC.typeOf(content.removeObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable","hasContent"),canReorderContent:function(){var content=this.get("content"),ret;
ret=!!content&&this.get("isEditable")&&!this.get("orderBy");return ret&&!!content.isSCArray
}.property("content","isEditable","orderBy"),canAddContent:function(){var content=this.get("content"),ret;
ret=content&&this.get("isEditable")&&content.isEnumerable;if(ret){return(SC.typeOf(content.addObject)===SC.T_FUNCTION)||(SC.typeOf(content.pushObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable"),hasContent:function(){var content=this.get("content");
return !!content&&(!!content.isEnumerable||!!this.get("allowsSingleContent"))}.property("content","allowSingleContent"),status:function(){var content=this.get("content"),ret=content?content.get("status"):null;
return ret?ret:SC.Record.READY}.property().cacheable(),addObject:function(object){if(!this.get("canAddContent")){throw"%@ cannot add content".fmt(this)
}var content=this.get("content");if(content.isSCArray){content.pushObject(object)
}else{if(content.addObject){content.addObject(object)}else{throw"%@.content does not support addObject".fmt(this)
}}return this},removeObject:function(object){if(!this.get("canRemoveContent")){throw"%@ cannot remove content".fmt(this)
}var content=this.get("content");if(content.isEnumerable){content.removeObject(object)
}else{this.set("content",null)}if(this.get("destroyOnRemoval")&&object.destroy){object.destroy()
}return this},length:function(){var content=this._scac_observableContent();return content?content.get("length"):0
}.property().cacheable(),objectAt:function(idx){var content=this._scac_observableContent();
return content?content.objectAt(idx):undefined},replace:function(start,amt,objects){if(!objects||objects.get("length")===0){if(!this.get("canRemoveContent")){throw"%@ cannot remove objects from the current content".fmt(this)
}}else{if(!this.get("canReorderContent")){throw"%@ cannot add or reorder the current content".fmt(this)
}}var content=this.get("content");var objsToDestroy=[],i,objsLen;if(this.get("destroyOnRemoval")){for(i=0;
i<amt;i++){objsToDestroy.push(content.objectAt(i+start))}}if(content){content.replace(start,amt,objects)
}for(i=0,objsLen=objsToDestroy.length;i<objsLen;i++){objsToDestroy[i].destroy()}objsToDestroy=null;
return this},indexOf:function(object,startAt){var content=this._scac_observableContent();
return content?content.indexOf(object,startAt):-1},init:function(){arguments.callee.base.apply(this,arguments);
this._scac_contentDidChange()},_scac_cached:NO,_scac_observableContent:function(){var ret=this._scac_cached;
if(ret){return ret}var content=this.get("content"),func,len,order;if(SC.none(content)){return(this._scac_cached=[])
}if(!content.isEnumerable){ret=this.get("allowsSingleContent")?[content]:[];return(this._scac_cached=ret)
}var orderBy=this.get("orderBy");if(!orderBy){if(content.isSCArray){return(this._scac_cached=content)
}else{throw"%@.orderBy is required for unordered content".fmt(this)}}var type=SC.typeOf(orderBy);
if(type===SC.T_STRING){orderBy=[orderBy]}else{if(type===SC.T_FUNCTION){func=orderBy
}else{if(type!==SC.T_ARRAY){throw"%@.orderBy must be Array, String, or Function".fmt(this)
}}}func=func||function(a,b){var status,key,match,descending;for(var i=0,l=orderBy.get("length");
i<l&&!status;i++){key=orderBy.objectAt(i);match=key.match(/^(ASC )?(DESC )?(.*)$/);
key=match[3];order=match[2]?-1:1;if(a){a=a.isObservable?a.get(key):a[key]}if(b){b=b.isObservable?b.get(key):b[key]
}status=SC.compare(a,b)*order}return status};return(this._scac_cached=content.toArray().sort(func))
},_scac_contentDidChange:function(){this._scac_cached=NO;var cur=this.get("content"),orders=!!this.get("orderBy"),last=this._scac_content,oldlen=this._scac_length||0,func=this._scac_rangeDidChange,efunc=this._scac_enumerableDidChange,sfunc=this._scac_contentStatusDidChange,newlen;
if(last===cur){return this}if(last){if(ro&&last.isSCArray){last.removeRangeObserver(ro)
}else{if(last.isEnumerable){last.removeObserver("[]",this,efunc)}}last.removeObserver("status",this,sfunc)
}ro=null;this._scac_cached=NO;this._scac_content=cur;if(cur){if(!orders&&cur.isSCArray){ro=cur.addRangeObserver(null,this,func)
}else{if(cur.isEnumerable){cur.addObserver("[]",this,efunc)}}newlen=cur.isEnumerable?cur.get("length"):1;
cur.addObserver("status",this,sfunc)}else{newlen=SC.none(cur)?0:1}this._scac_rangeObserver=ro;
this._scac_length=newlen;this._scac_contentStatusDidChange();this.enumerableContentDidChange(0,newlen,newlen-oldlen);
this.updateSelectionAfterContentChange()}.observes("content"),_scac_rangeDidChange:function(array,objects,key,indexes){if(key!=="[]"){return
}var content=this.get("content");this._scac_length=content.get("length");this._scac_cached=NO;
if(indexes){this.beginPropertyChanges();indexes.forEachRange(function(start,length){this.enumerableContentDidChange(start,length,0)
},this);this.endPropertyChanges();this.updateSelectionAfterContentChange()}},_scac_enumerableDidChange:function(){var content=this.get("content"),newlen=content?content.get("length"):0,oldlen=this._scac_length;
this._scac_length=newlen;this.beginPropertyChanges();this._scac_cached=NO;this.enumerableContentDidChange(0,newlen,newlen-oldlen);
this.endPropertyChanges();this.updateSelectionAfterContentChange()}.observes("orderBy"),_scac_contentStatusDidChange:function(){this.notifyPropertyChange("status")
}});sc_require("controllers/controller");SC.ObjectController=SC.Controller.extend({content:null,allowsMultipleContent:NO,hasContent:function(){return !SC.none(this.get("observableContent"))
}.property("observableContent"),isEditable:YES,observableContent:function(){var content=this.get("content"),len,allowsMultiple;
if(content&&content.isEnumerable){len=content.get("length");allowsMultiple=this.get("allowsMultipleContent");
if(len===1){content=content.firstObject()}else{if(len===0||!allowsMultiple){content=null
}}if(content&&!allowsMultiple&&content.isEnumerable){content=null}}return content
}.property("content","allowsMultipleContent").cacheable(),destroy:function(){var content=this.get("observableContent");
if(content&&SC.typeOf(content.destroy)===SC.T_FUNCTION){content.destroy()}this.set("content",null);
return this},contentPropertyDidChange:function(target,key){if(key==="*"){this.allPropertiesDidChange()
}else{this.notifyPropertyChange(key)}},unknownProperty:function(key,value){if(key==="content"){if(value!==undefined){this.content=value
}return this.content}var content=this.get("observableContent"),loc,cur,isSame;if(content===null||content===undefined){return undefined
}if(value===undefined){if(content.isEnumerable){value=content.getEach(key);loc=value.get("length");
if(loc>0){isSame=YES;cur=value.objectAt(0);while((--loc>0)&&isSame){if(cur!==value.objectAt(loc)){isSame=NO
}}if(isSame){value=cur}}else{value=undefined}}else{value=(content.isObservable)?content.get(key):content[key]
}}else{if(!this.get("isEditable")){throw"%@.%@ is not editable".fmt(this,key)}if(content.isEnumerable){content.setEach(key,value)
}else{if(content.isObservable){content.set(key,value)}else{content[key]=value}}}return value
},init:function(){arguments.callee.base.apply(this,arguments);if(this.get("content")){this._scoc_contentDidChange()
}if(this.get("observableContent")){this._scoc_observableContentDidChange()}},_scoc_contentDidChange:function(){var last=this._scoc_content,cur=this.get("content");
if(last!==cur){this._scoc_content=cur;var func=this._scoc_enumerableContentDidChange;
if(last&&last.isEnumerable){last.removeObserver("[]",this,func)}if(cur&&cur.isEnumerable){cur.addObserver("[]",this,func)
}}}.observes("content"),_scoc_observableContentDidChange:function(){var last=this._scoc_observableContent,cur=this.get("observableContent"),func=this.contentPropertyDidChange,efunc=this._scoc_enumerableContentDidChange;
if(last===cur){return this}this._scoc_observableContent=cur;if(last){if(last.isEnumerable){last.removeObserver("[]",this,efunc)
}else{if(last.isObservable){last.removeObserver("*",this,func)}}}if(cur){if(cur.isEnumerable){cur.addObserver("[]",this,efunc)
}else{if(cur.isObservable){cur.addObserver("*",this,func)}}}if((last&&last.isEnumerable)||(cur&&cur.isEnumerable)){this._scoc_enumerableContentDidChange()
}else{this.contentPropertyDidChange(cur,"*")}}.observes("observableContent"),_scoc_enumerableContentDidChange:function(){var cur=this.get("observableContent"),set=this._scoc_observableContentItems,func=this.contentPropertyDidChange;
if(set){set.forEach(function(item){if(item.isObservable){item.removeObserver("*",this,func)
}},this);set.clear()}if(cur&&cur.isEnumerable){if(!set){set=SC.Set.create()}cur.forEach(function(item){if(set.contains(item)){return
}set.add(item);if(item.isObservable){item.addObserver("*",this,func)}},this)}else{set=null
}this._scoc_observableContentItems=set;this.contentPropertyDidChange(cur,"*");return this
}});SC.mixin(SC.Object.prototype,{invokeLater:function(methodName,interval){if(interval===undefined){interval=1
}var f=methodName,args,func;if(arguments.length>2){args=SC.$A(arguments).slice(2);
if(SC.typeOf(f)===SC.T_STRING){f=this[methodName]}func=f;f=function(){return func.apply(this,args)
}}return SC.Timer.schedule({target:this,action:f,interval:interval})},invokeWith:function(pathName,target,method){if(method===undefined){method=target;
target=this}if(!target){target=this}if(SC.typeOf(method)===SC.T_STRING){method=target[method]
}var v=this.getPath(pathName);method.call(target,v,this);return this}});SC.RunLoop=SC.RunLoop.extend({startTime:function(){if(!this._start){this._start=Date.now()
}return this._start}.property(),endRunLoop:function(){this.fireExpiredTimers();var ret=arguments.callee.base.apply(this,arguments);
this.scheduleNextTimeout();return ret},scheduleTimer:function(timer,runTime){this._timerQueue=timer.removeFromTimerQueue(this._timerQueue);
this._timerQueue=timer.scheduleInTimerQueue(this._timerQueue,runTime);return this
},cancelTimer:function(timer){this._timerQueue=timer.removeFromTimerQueue(this._timerQueue);
return this},TIMER_ARRAY:[],fireExpiredTimers:function(){if(!this._timerQueue||this._firing){return NO
}var now=this.get("startTime"),timers=this.TIMER_ARRAY,idx,len,didFire;this._firing=YES;
this._timerQueue=this._timerQueue.collectExpiredTimers(timers,now);len=timers.length;
for(idx=0;idx<len;idx++){timers[idx].fire()}didFire=timers.length>0;timers.length=0;
this._firing=NO;return didFire},scheduleNextTimeout:function(){var timer=this._timerQueue;
var ret=NO;if(!timer){if(this._timeout){clearTimeout(this._timeout)}}else{var nextTimeoutAt=timer._timerQueueRunTime;
if(this._timeoutAt!==nextTimeoutAt){if(this._timeout){clearTimeout(this._timeout)
}var delay=Math.max(0,nextTimeoutAt-Date.now());this._timeout=setTimeout(this._timeoutDidFire,delay);
this._timeoutAt=nextTimeoutAt}ret=YES}return ret},_timeoutDidFire:function(){var rl=SC.RunLoop.currentRunLoop;
rl._timeout=rl._timeoutAt=null;SC.run()}});SC.RunLoop.currentRunLoop=SC.RunLoop.create();
SC.DelegateSupport={delegateFor:function(methodName){var idx=1,len=arguments.length,ret;
while(idx<len){ret=arguments[idx];if(ret&&ret[methodName]!==undefined){return ret
}idx++}return(this[methodName]!==undefined)?this:null},invokeDelegateMethod:function(delegate,methodName,args){args=SC.A(arguments);
args=args.slice(2,args.length);if(!delegate||!delegate[methodName]){delegate=this
}var method=delegate[methodName];return method?method.apply(delegate,args):null},getDelegateProperty:function(key,delegate){var idx=1,len=arguments.length,ret;
while(idx<len){ret=arguments[idx++];if(ret&&ret[key]!==undefined){return ret.get?ret.get(key):ret[key]
}}return(this[key]!==undefined)?this.get(key):undefined}};SC.Responder=SC.Object.extend({isResponder:YES,pane:null,responderContext:null,nextResponder:null,isFirstResponder:NO,hasFirstResponder:NO,acceptsFirstResponder:YES,becomingFirstResponder:NO,becomeFirstResponder:function(){var pane=this.get("pane")||this.get("responderContext")||this.pane();
if(pane&&this.get("acceptsFirstResponder")){if(pane.get("firstResponder")!==this){pane.makeFirstResponder(this)
}}return this},resignFirstResponder:function(evt){var pane=this.get("pane")||this.get("responderContext");
if(pane&&(pane.get("firstResponder")===this)){pane.makeFirstResponder(null,evt)}return YES
},willLoseFirstResponder:function(responder){},didBecomeFirstResponder:function(responder){}});
sc_require("system/responder");SC.ResponderContext={isResponderContext:YES,trace:NO,defaultResponder:null,nextResponder:function(){return this.get("defaultResponder")
}.property("defaultResponder").cacheable(),firstResponder:null,nextResponderFor:function(responder){var next=responder.get("nextResponder");
if(typeof next===SC.T_STRING){next=SC.objectForPropertyPath(next,this)}else{if(!next&&(responder!==this)){next=this
}}return next},responderNameFor:function(responder){if(!responder){return"(No Responder)"
}else{if(responder._scrc_name){return responder._scrc_name}}var n=this.NAMESPACE;
this._findResponderNamesFor(this,3,n?[this.NAMESPACE]:[]);return responder._scrc_name||responder.toString()
},_findResponderNamesFor:function(responder,level,path){var key,value;for(key in responder){if(key==="nextResponder"){continue
}value=responder[key];if(value&&value.isResponder){if(value._scrc_name){continue}path.push(key);
value._scrc_name=path.join(".");if(level>0){this._findResponderNamesFor(value,level-1,path)
}path.pop()}}},makeFirstResponder:function(responder,evt){var current=this.get("firstResponder"),last=this.get("nextResponder"),trace=this.get("trace"),common;
if(this._locked){if(trace){SC.Logger.log("%@: AFTER ACTION: makeFirstResponder => %@".fmt(this,this.responderNameFor(responder)))
}this._pendingResponder=responder;return}if(trace){SC.Logger.log("%@: makeFirstResponder => %@".fmt(this,this.responderNameFor(responder)))
}if(responder){responder.set("becomingFirstResponder",YES)}this._locked=YES;this._pendingResponder=null;
common=responder?responder:null;while(common){if(common.get("hasFirstResponder")){break
}common=(common===last)?null:this.nextResponderFor(common)}if(!common){common=last
}this._notifyWillLoseFirstResponder(current,current,common,evt);if(current){current.set("isFirstResponder",NO)
}this.beginPropertyChanges();this.set("firstResponder",responder);if(responder){responder.set("isFirstResponder",YES)
}this._notifyDidBecomeFirstResponder(responder,responder,common);this.endPropertyChanges();
this._locked=NO;if(this._pendingResponder){this.makeFirstResponder(this._pendingResponder);
this._pendingResponder=null}if(responder){responder.set("becomingFirstResponder",NO)
}return this},_notifyWillLoseFirstResponder:function(responder,cur,root,evt){if(cur===root){return
}cur.willLoseFirstResponder(responder,evt);cur.set("hasFirstResponder",NO);var next=this.nextResponderFor(cur);
if(next){this._notifyWillLoseFirstResponder(responder,next,root)}},_notifyDidBecomeFirstResponder:function(responder,cur,root){if(cur===root){return
}var next=this.nextResponderFor(cur);if(next){this._notifyDidBecomeFirstResponder(responder,next,root)
}cur.set("hasFirstResponder",YES);cur.didBecomeFirstResponder(responder)},resetFirstResponder:function(){var current=this.get("firstResponder");
if(!current){return}current.willLoseFirstResponder();current.didBecomeFirstResponder()
},sendAction:function(action,sender,context){var working=this.get("firstResponder"),last=this.get("nextResponder"),trace=this.get("trace"),handled=NO,responder;
this._locked=YES;if(trace){SC.Logger.log("%@: begin action '%@' (%@, %@)".fmt(this,action,sender,context))
}if(!handled&&!working&&this.tryToPerform){handled=this.tryToPerform(action,sender,context)
}while(!handled&&working){if(working.tryToPerform){handled=working.tryToPerform(action,sender,context)
}if(!handled){working=(working===last)?null:this.nextResponderFor(working)}}if(trace){if(!handled){SC.Logger.log("%@:  action '%@' NOT HANDLED".fmt(this,action))
}else{SC.Logger.log("%@: action '%@' handled by %@".fmt(this,action,this.responderNameFor(working)))
}}this._locked=NO;if(responder=this._pendingResponder){this._pendingResponder=null;
this.makeFirstResponder(responder)}return working}};SC.Locale=SC.Object.extend({init:function(){if(!this.language){SC.Locale._assignLocales()
}if(!this.hasStrings){var langs=this._deprecatedLanguageCodes||[];langs.push(this.language);
var idx=langs.length;var strings=null;while(!strings&&--idx>=0){strings=String[langs[idx]]
}if(strings){this.hasStrings=YES;this.strings=strings}}},hasStrings:NO,strings:{},toString:function(){if(!this.language){SC.Locale._assignLocales()
}return"SC.Locale["+this.language+"]"+SC.guidFor(this)},locWithDefault:function(string,def){var ret=this.strings[string];
if(SC.typeOf(ret)===SC.T_STRING){return ret}else{if(SC.typeOf(def)===SC.T_STRING){return def
}}return string}});SC.Locale.mixin({useAutodetectedLanguage:NO,preferredLanguage:null,createCurrentLocale:function(){var autodetect=(String.useAutodetectedLanguage!==undefined)?String.useAutodetectedLanguage:this.useAutodetectedLanguage;
var preferred=(String.preferredLanguage!==undefined)?String.preferredLanguage:this.preferredLanguage;
var lang=((autodetect)?SC.browser.language:null)||preferred||SC.browser.language||"en";
lang=SC.Locale.normalizeLanguage(lang);var klass=this.localeClassFor(lang);if(lang!=this.currentLanguage){this.currentLanguage=lang;
this.currentLocale=klass.create()}return this.currentLocale},localeClassFor:function(lang){lang=SC.Locale.normalizeLanguage(lang);
var parent,klass=this.locales[lang];if(!klass&&((parent=lang.split("-")[0])!==lang)&&(klass=this.locales[parent])){klass=this.locales[lang]=klass.extend()
}if(!klass){klass=this.locales[lang]=this.locales.en.extend()}return klass},define:function(localeName,options){var locale;
if(options===undefined&&(SC.typeOf(localeName)!==SC.T_STRING)){locale=this;options=localeName
}else{locale=SC.Locale.localeClassFor(localeName)}SC.mixin(locale.prototype,options);
return locale},options:function(){return this.prototype},addStrings:function(stringsHash){var strings=this.prototype.strings;
if(strings){if(!this.prototype.hasOwnProperty("strings")){this.prototype.strings=SC.clone(strings)
}}else{strings=this.prototype.strings={}}if(stringsHash){this.prototype.strings=SC.mixin(strings,stringsHash)
}this.prototype.hasStrings=YES;return this},_map:{english:"en",french:"fr",german:"de",japanese:"ja",jp:"ja",spanish:"es"},normalizeLanguage:function(languageCode){if(!languageCode){return"en"
}return SC.Locale._map[languageCode.toLowerCase()]||languageCode},_assignLocales:function(){for(var key in this.locales){this.locales[key].prototype.language=key
}},toString:function(){if(!this.prototype.language){SC.Locale._assignLocales()}return"SC.Locale["+this.prototype.language+"]"
},extend:function(){var ret=SC.Object.extend.apply(this,arguments);ret.addStrings=SC.Locale.addStrings;
ret.define=SC.Locale.define;ret.options=SC.Locale.options;ret.toString=SC.Locale.toString;
return ret}});SC.Locale.locales={en:SC.Locale.extend({_deprecatedLanguageCodes:["English"]}),fr:SC.Locale.extend({_deprecatedLanguageCodes:["French"]}),de:SC.Locale.extend({_deprecatedLanguageCodes:["German"]}),ja:SC.Locale.extend({_deprecatedLanguageCodes:["Japanese","jp"]}),es:SC.Locale.extend({_deprecatedLanguageCodes:["Spanish"]})};
SC.stringsFor=function(languageCode,strings){var locale=SC.Locale.localeClassFor(languageCode);
locale.addStrings(strings);return this};sc_require("system/locale");SC.STRING_TITLEIZE_REGEXP=(/([\s|\-|\_|\n])([^\s|\-|\_|\n]?)/g);
SC.STRING_DECAMELIZE_REGEXP=(/([a-z])([A-Z])/g);SC.STRING_DASHERIZE_REGEXP=(/[ _]/g);
SC.STRING_DASHERIZE_CACHE={};SC.String={capitalize:function(){return this.charAt(0).toUpperCase()+this.slice(1)
},camelize:function(){var ret=this.replace(SC.STRING_TITLEIZE_REGEXP,function(str,separater,character){return(character)?character.toUpperCase():""
});var first=ret.charAt(0),lower=first.toLowerCase();return(first!==lower)?(lower+ret.slice(1)):ret
},decamelize:function(){return this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2").toLowerCase()
},dasherize:function(){var cache=SC.STRING_DASHERIZE_CACHE,ret=cache[this];if(ret){return ret
}else{ret=this.decamelize().replace(SC.STRING_DASHERIZE_REGEXP,"-");cache[this]=ret
}return ret},loc:function(){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var str=SC.Locale.currentLocale.locWithDefault(this);if(SC.typeOf(str)!==SC.T_STRING){str=this
}return str.fmt.apply(str,arguments)},locWithDefault:function(def){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var str=SC.Locale.currentLocale.locWithDefault(this,def);if(SC.typeOf(str)!==SC.T_STRING){str=this
}var args=SC.$A(arguments);args.shift();return str.fmt.apply(str,args)}};SC.supplement(String.prototype,SC.String);
String.prototype.loc=SC.String.loc;SC.String.fmt=String.prototype.fmt;SC.mixin(SC.browser,{compareVersion:function(){if(this._versionSplit===undefined){var coerce=function(part){return Number(part.match(/^[0-9]+/))
};this._versionSplit=SC.A(this.version.split(".")).map(coerce)}var tests=SC.A(arguments).map(Number);
for(var i=0;i<tests.length;i++){var check=this._versionSplit[i]-tests[i];if(isNaN(check)){return 0
}if(check!==0){return check}}return 0}});SC.Builder=function(props){return SC.Builder.create(props)
};SC.Builder.create=function create(props){var fn=SC.mixin(SC.beget(this.fn),props||{});
if(props.hasOwnProperty("toString")){fn.toString=props.toString}var construct=function(){var ret=SC.beget(fn);
ret.defaultClass=this;ret.constructor=construct;return ret.init.apply(ret,arguments)
};construct.fn=construct.prototype=fn;construct.extend=SC.Builder.create;construct.mixin=SC.Builder.mixin;
return construct};SC.Builder.mixin=function(){var len=arguments.length,idx;for(idx=0;
idx<len;idx++){SC.mixin(this,arguments[idx])}return this};SC.Builder.fn={init:function(content){if(content!==undefined){if(SC.typeOf(content)===SC.T_ARRAY){var loc=content.length;
while(--loc>=0){this[loc]=content.objectAt?content.objectAt(loc):content[loc]}this.length=content.length
}else{this[0]=content;this.length=1}}return this},size:function(){return this.length
},pushStack:function(){var ret=this.constructor.apply(this,arguments);ret.prevObject=this;
return ret},end:function(){return this.prevObject||this.constructor()},toString:function(){return"%@$(%@)".fmt(this.defaultClass.toString(),SC.A(this).invoke("toString").join(","))
},mixin:SC.Builder.mixin};(function(){var enumerable=SC.Enumerable,fn=SC.Builder.fn,key,value;
for(key in enumerable){if(!enumerable.hasOwnProperty(key)){continue}value=Array.prototype[key]||enumerable[key];
fn[key]=value}})();sc_require("system/builder");SC.$=SC.CoreQuery=jQuery;SC.mixin(SC.$.fn,{isCoreQuery:YES,toString:function(){var values=[],len=this.length,idx=0;
for(idx=0;idx<len;idx++){values[idx]="%@: %@".fmt(idx,this[idx]?this[idx].toString():"(null)")
}return"<$:%@>(%@)".fmt(SC.guidFor(this),values.join(" , "))},isVisible:function(){return Array.prototype.every.call(this,function(elem){return SC.$.isVisible(elem)
})},view:function(){return this.map(function(){var ret=null,guidKey=SC.viewKey,dom=this,value;
while(!ret&&dom&&(dom!==document)){if(dom.nodeType===1&&(value=dom.getAttribute("id"))){ret=SC.View.views[value]
}dom=dom.parentNode}dom=null;return ret})},within:function(el){if(this.filter(el).length){return true
}return !!this.has(el).length}});(function(){var original={},wrappers={find:function(callback,target){return(target!==undefined)?SC.Enumerable.find.call(this,callback,target):original.find.call(this,callback)
},filter:function(callback,target){return(target!==undefined)?this.pushStack(SC.Enumerable.filter.call(this,callback,target)):original.filter.call(this,callback)
},filterProperty:function(key,value){return this.pushStack(SC.Enumerable.filterProperty.call(this,key,value))
},indexOf:SC.$.index,map:function(callback,target){return(target!==undefined)?SC.Enumerable.map.call(this,callback,target):original.map.call(this,callback)
}};var fn=SC.$.fn,enumerable=SC.Enumerable,value;for(var key in enumerable){if(enumerable.hasOwnProperty(key)){value=enumerable[key];
if(key in wrappers){original[key]=fn[key];value=wrappers[key]}fn[key]=value}}})();
SC.mixin(SC.$,{isVisible:function(elem){var CQ=SC.$;return("hidden"!=elem.type)&&(CQ.css(elem,"display")!="none")&&(CQ.css(elem,"visibility")!="hidden")
}});sc_require("system/core_query");SC.Event=function(originalEvent){var idx,len;
if(originalEvent){this.originalEvent=originalEvent;var props=SC.Event._props,key;
len=props.length;idx=len;while(--idx>=0){key=props[idx];this[key]=originalEvent[key]
}}this.timeStamp=this.timeStamp||Date.now();if(!this.target){this.target=this.srcElement||document
}if(this.target.nodeType===3){this.target=this.target.parentNode}if(!this.relatedTarget&&this.fromElement){this.relatedTarget=(this.fromElement===this.target)?this.toElement:this.fromElement
}if(SC.none(this.pageX)&&!SC.none(this.clientX)){var doc=document.documentElement,body=document.body;
this.pageX=this.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);
this.pageY=this.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0)
}if(!this.which&&((this.charCode||originalEvent.charCode===0)?this.charCode:this.keyCode)){this.which=this.charCode||this.keyCode
}if(!this.metaKey&&this.ctrlKey){this.metaKey=this.ctrlKey}if(!this.which&&this.button){this.which=((this.button&1)?1:((this.button&2)?3:((this.button&4)?2:0)))
}if(this.type==="mousewheel"||this.type==="DOMMouseScroll"||this.type==="MozMousePixelScroll"){var deltaMultiplier=1,version=parseFloat(SC.browser.version);
if(SC.browser.webkit&&originalEvent.wheelDelta!==undefined){this.wheelDelta=0-(originalEvent.wheelDeltaY||originalEvent.wheelDeltaX);
this.wheelDeltaY=0-(originalEvent.wheelDeltaY||0);this.wheelDeltaX=0-(originalEvent.wheelDeltaX||0);
if(!SC.browser.chrome){if(version>=533.17&&version<=533.19){deltaMultiplier=0.004
}else{if(version<533||version>=534){deltaMultiplier=40}}}}else{if(!SC.none(originalEvent.detail)){deltaMultiplier=10;
if(originalEvent.axis&&(originalEvent.axis===originalEvent.HORIZONTAL_AXIS)){this.wheelDeltaX=originalEvent.detail;
this.wheelDeltaY=this.wheelDelta=0}else{this.wheelDeltaY=this.wheelDelta=originalEvent.detail;
this.wheelDeltaX=0}}else{this.wheelDelta=this.wheelDeltaY=SC.browser.msie?0-originalEvent.wheelDelta:originalEvent.wheelDelta;
this.wheelDeltaX=0}}this.wheelDelta*=deltaMultiplier;this.wheelDeltaX*=deltaMultiplier;
this.wheelDeltaY*=deltaMultiplier}return this};SC.mixin(SC.Event,{create:function(e){return new SC.Event(e)
},add:function(elem,eventType,target,method,context,useCapture){if(elem&&elem.isCoreQuery){if(elem.length>0){elem.forEach(function(e){this.add(e,eventType,target,method,context)
},this);return this}else{elem=elem[0]}}if(!elem){return this}if(!useCapture){useCapture=NO
}if(elem.nodeType===3||elem.nodeType===8){return SC.Event}if(SC.browser.msie&&elem.setInterval){elem=window
}if(SC.typeOf(target)===SC.T_FUNCTION){context=method;method=target;target=null}else{if(target&&SC.typeOf(method)===SC.T_STRING){method=target[method]
}}var events=SC.data(elem,"events")||SC.data(elem,"events",{}),handlers=events[eventType];
if(!handlers){handlers=events[eventType]={};this._addEventListener(elem,eventType,useCapture)
}handlers[SC.hashFor(target,method)]=[target,method,context];SC.Event._global[eventType]=YES;
elem=events=handlers=null;return this},remove:function(elem,eventType,target,method){if(elem&&elem.isCoreQuery){if(elem.length>0){elem.forEach(function(e){this.remove(e,eventType,target,method)
},this);return this}else{elem=elem[0]}}if(!elem){return this}if(elem.nodeType===3||elem.nodeType===8){return SC.Event
}if(SC.browser.msie&&elem.setInterval){elem=window}var handlers,key,events=SC.data(elem,"events");
if(!events){return this}if(eventType===undefined){for(eventType in events){this.remove(elem,eventType)
}}else{if(handlers=events[eventType]){var cleanupHandlers=NO;if(target||method){if(SC.typeOf(target)===SC.T_FUNCTION){method=target;
target=null}else{if(SC.typeOf(method)===SC.T_STRING){method=target[method]}}delete handlers[SC.hashFor(target,method)];
key=null;for(key in handlers){break}if(key===null){cleanupHandlers=YES}}else{cleanupHandlers=YES
}if(cleanupHandlers){delete events[eventType];this._removeEventListener(elem,eventType)
}key=null;for(key in events){break}if(!key){SC.removeData(elem,"events");delete this._elements[SC.guidFor(elem)]
}}}elem=events=handlers=null;return this},NO_BUBBLE:["blur","focus","change"],simulateEvent:function(elem,eventType,attrs){var ret=SC.Event.create({type:eventType,target:elem,preventDefault:function(){this.cancelled=YES
},stopPropagation:function(){this.bubbles=NO},allowDefault:function(){this.hasCustomEventHandling=YES
},timeStamp:Date.now(),bubbles:(this.NO_BUBBLE.indexOf(eventType)<0),cancelled:NO,normalized:YES});
if(attrs){SC.mixin(ret,attrs)}return ret},trigger:function(elem,eventType,args,donative){if(elem&&elem.isCoreQuery){if(elem.length>0){elem.forEach(function(e){this.trigger(e,eventType,args,donative)
},this);return this}else{elem=elem[0]}}if(!elem){return this}if(elem.nodeType===3||elem.nodeType===8){return undefined
}args=SC.A(args);var ret,fn=SC.typeOf(elem[eventType]||null)===SC.T_FUNCTION,event,current,onfoo,isClick;
event=args[0];if(!event||!event.preventDefault){event=this.simulateEvent(elem,eventType);
args.unshift(event)}event.type=eventType;current=elem;do{ret=SC.Event.handle.apply(current,args);
current=(current===document)?null:(current.parentNode||document)}while(!ret&&event.bubbles&&current);
current=null;onfoo=elem["on"+eventType];isClick=SC.$.nodeName(elem,"a")&&eventType==="click";
if((!fn||isClick)&&onfoo&&onfoo.apply(elem,args)===NO){ret=NO}if(fn&&donative!==NO&&ret!==NO&&!isClick){this.triggered=YES;
try{elem[eventType]()}catch(e){}}this.triggered=NO;return ret},handle:function(event){if((typeof SC==="undefined")||SC.Event.triggered){return YES
}var val,ret,namespace,all,handlers,args,key,handler,method,target;args=SC.A(arguments);
args[0]=event=SC.Event.normalizeEvent(event||window.event);handlers=(SC.data(this,"events")||{})[event.type];
if(!handlers){return NO}for(key in handlers){handler=handlers[key];method=handler[1];
event.handler=method;event.data=event.context=handler[2];target=handler[0]||this;
ret=method.apply(target,args);if(val!==NO){val=ret}if(ret===NO){event.preventDefault();
event.stopPropagation()}}return val},unload:function(){var key,elements=this._elements;
for(key in elements){this.remove(elements[key])}for(key in elements){delete elements[key]
}delete this._elements},special:{ready:{setup:function(){SC._bindReady();return},teardown:function(){return
}},mouseenter:{setup:function(){if(SC.browser.msie){return NO}SC.Event.add(this,"mouseover",SC.Event.special.mouseenter.handler);
return YES},teardown:function(){if(SC.browser.msie){return NO}SC.Event.remove(this,"mouseover",SC.Event.special.mouseenter.handler);
return YES},handler:function(event){if(SC.Event._withinElement(event,this)){return YES
}event.type="mouseenter";return SC.Event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},handler:function(event){if(SC.Event._withinElement(event,this)){return YES
}event.type="mouseleave";return SC.Event.handle.apply(this,arguments)}}},KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,_withinElement:function(event,elem){var parent=event.relatedTarget;
while(parent&&parent!=elem){try{parent=parent.parentNode}catch(error){parent=elem
}}return parent===elem},_addEventListener:function(elem,eventType,useCapture){var listener,special=this.special[eventType];
if(!useCapture){useCapture=NO}if(!special||special.setup.call(elem)===NO){var guid=SC.guidFor(elem);
this._elements[guid]=elem;listener=SC.data(elem,"listener")||SC.data(elem,"listener",function(){return SC.Event.handle.apply(SC.Event._elements[guid],arguments)
});if(elem.addEventListener){elem.addEventListener(eventType,listener,useCapture)
}else{if(elem.attachEvent){elem.attachEvent("on"+eventType,listener)}}}elem=special=listener=null
},_removeEventListener:function(elem,eventType){var listener,special=SC.Event.special[eventType];
if(!special||(special.teardown.call(elem)===NO)){listener=SC.data(elem,"listener");
if(listener){if(elem.removeEventListener){elem.removeEventListener(eventType,listener,NO)
}else{if(elem.detachEvent){elem.detachEvent("on"+eventType,listener)}}}}elem=special=listener=null
},_elements:{},normalizeEvent:function(event){if(event===window.event){return SC.Event.create(event)
}else{return event.normalized?event:SC.Event.create(event)}},_global:{},_props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view which touches targetTouches changedTouches animationName elapsedTime dataTransfer".split(" ")});
SC.Event.prototype={hasCustomEventHandling:NO,touchesForView:function(view){if(this.touchContext){return this.touchContext.touchesForView(view)
}},touchesForResponder:function(responder){if(this.touchContext){return this.touchContext.touchesForView(responder)
}},averagedTouchesForView:function(view){if(this.touchContext){return this.touchContext.averagedTouchesForView(view)
}return null},allowDefault:function(){this.hasCustomEventHandling=YES;return this
},preventDefault:function(){var evt=this.originalEvent;if(evt){if(evt.preventDefault){evt.preventDefault()
}evt.returnValue=NO}this.hasCustomEventHandling=YES;return this},stopPropagation:function(){var evt=this.originalEvent;
if(evt){if(evt.stopPropagation){evt.stopPropagation()}evt.cancelBubble=YES}this.hasCustomEventHandling=YES;
return this},stop:function(){return this.preventDefault().stopPropagation()},normalized:YES,getCharString:function(){if(SC.browser.msie){if(this.keyCode==8||this.keyCode==9||(this.keyCode>=37&&this.keyCode<=40)){return String.fromCharCode(0)
}else{return(this.keyCode>0)?String.fromCharCode(this.keyCode):null}}else{return(this.charCode>0)?String.fromCharCode(this.charCode):null
}},commandCodes:function(){var code=this.keyCode,ret=null,key=null,modifiers="",lowercase;
if(code){ret=SC.FUNCTION_KEYS[code];if(!ret&&(this.altKey||this.ctrlKey||this.metaKey)){ret=SC.PRINTABLE_KEYS[code]
}if(ret){if(this.altKey){modifiers+="alt_"}if(this.ctrlKey||this.metaKey){modifiers+="ctrl_"
}if(this.shiftKey){modifiers+="shift_"}}}if(!ret){code=this.which;key=ret=String.fromCharCode(code);
lowercase=ret.toLowerCase();if(this.metaKey){modifiers="meta_";ret=lowercase}else{ret=null
}}if(ret){ret=modifiers+ret}return[ret,key]}};SC.Event.observe=SC.Event.add;SC.Event.stopObserving=SC.Event.remove;
SC.Event.fire=SC.Event.trigger;if(SC.browser.msie){SC.Event.add(window,"unload",SC.Event.prototype,SC.Event.unload)
}SC.MODIFIER_KEYS={16:"shift",17:"ctrl",18:"alt"};SC.FUNCTION_KEYS={8:"backspace",9:"tab",13:"return",19:"pause",27:"escape",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"printscreen",45:"insert",46:"delete",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scrolllock"};
SC.PRINTABLE_KEYS={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:'"'};
SC.SYSTEM_CURSOR="default";SC.AUTO_CURSOR=SC.DEFAULT_CURSOR="auto";SC.CROSSHAIR_CURSOR="crosshair";
SC.HAND_CURSOR=SC.POINTER_CURSOR="pointer";SC.MOVE_CURSOR="move";SC.E_RESIZE_CURSOR="e-resize";
SC.NE_RESIZE_CURSOR="ne-resize";SC.NW_RESIZE_CURSOR="nw-resize";SC.N_RESIZE_CURSOR="n-resize";
SC.SE_RESIZE_CURSOR="se-resize";SC.SW_RESIZE_CURSOR="sw-resize";SC.S_RESIZE_CURSOR="s-resize";
SC.W_RESIZE_CURSOR="w-resize";SC.IBEAM_CURSOR=SC.TEXT_CURSOR="text";SC.WAIT_CURSOR="wait";
SC.HELP_CURSOR="help";SC.Cursor=SC.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
var cursorStyle=this.get("cursorStyle")||SC.DEFAULT_CURSOR,ss=this.constructor.sharedStyleSheet(),guid=SC.guidFor(this);
if(ss.insertRule){ss.insertRule("."+guid+" {cursor: "+cursorStyle+";}",ss.cssRules?ss.cssRules.length:0)
}else{if(ss.addRule){ss.addRule("."+guid,"cursor: "+cursorStyle)}}this.cursorStyle=cursorStyle;
this.className=guid;return this},className:null,cursorStyle:SC.DEFAULT_CURSOR,cursorStyleDidChange:function(){var cursorStyle,rule,selector,ss,rules,idx,len;
cursorStyle=this.get("cursorStyle")||SC.DEFAULT_CURSOR;rule=this._rule;if(rule){rule.style.cursor=cursorStyle;
return}selector="."+this.get("className");ss=this.constructor.sharedStyleSheet();
rules=(ss.cssRules?ss.cssRules:ss.rules)||[];for(idx=0,len=rules.length;idx<len;++idx){rule=rules[idx];
if(rule.selectorText===selector){this._rule=rule;rule.style.cursor=cursorStyle;break
}}}.observes("cursorStyle")});SC.Cursor.sharedStyleSheet=function(){var head,ss=this._styleSheet;
if(!ss){ss=document.createElement("style");ss.type="text/css";head=document.getElementsByTagName("head")[0];
if(!head){head=document.documentElement}head.appendChild(ss);ss=document.styleSheets[document.styleSheets.length-1];
this._styleSheet=ss}return ss};SC.Theme={isTheme:YES,classNames:SC.CoreSet.create(),_extend_class_names:function(classNames){if(classNames){if(SC.typeOf(classNames)===SC.T_HASH&&!classNames.isSet){for(var className in classNames){if(classNames[className]){this.classNames.add(className)
}else{this.classNames.remove(className)}}}else{if(typeof classNames==="string"){this.classNames.addEach(classNames.split(" "))
}else{this.classNames.addEach(classNames)}}}},_extend_self:function(ext){if(ext.classNames){this._extend_class_names(ext.classNames)
}var key,value,cur;for(key in ext){if(key==="classNames"){continue}if(!ext.hasOwnProperty(key)){continue
}value=ext[key];if(value instanceof Function&&!value.base&&(value!==(cur=this[key]))){value.base=cur
}this[key]=value}},create:function(){var result=SC.beget(this);result.baseTheme=this;
if(this.themes===SC.Theme.themes){result.themes={}}else{result.themes=SC.beget(this.themes)
}result._privateThemes={};result._specializedRenderers={};result._specializedThemes={};
result.classNames=SC.clone(this.classNames);var args=arguments,len=args.length,idx,mixin;
for(idx=0;idx<len;idx++){result._extend_self(args[idx])}if(result.name){result.classNames.add(result.name)
}return result},subtheme:function(name){var t=this.create({name:name});this.addTheme(t);
return t},invisibleSubtheme:function(name){var t=this.create({name:name});this._privateThemes[name]=t;
return t},themes:{},find:function(themeName){if(this===SC.Theme){return this.themes[themeName]
}var theme;theme=this._privateThemes[themeName];if(theme){return theme}theme=this._specializedThemes[themeName];
if(theme){return theme}theme=this.themes[themeName];if(theme&&!this._specializedThemes[themeName]){return(this._specializedThemes[themeName]=theme.create({classNames:this.classNames}))
}theme=SC.Theme.themes[themeName];if(theme){return theme}return null},addTheme:function(theme){this.themes[theme.name]=theme
},addRenderer:function(renderer){this[renderer.name]=renderer},renderer:function(name){var renderer=this._specializedRenderers[name],base=this[name];
if(!renderer||renderer._specializedFrom!==base){if(!base){return null}renderer=base.extend({classNames:this.classNames,theme:this})
}var args=SC.$A(arguments);args.shift();renderer=renderer.create.apply(renderer,args);
return renderer}};SC.BaseTheme=SC.Theme.create({name:""});SC.Theme.themes["sc-base"]=SC.BaseTheme;
SC.defaultTheme="sc-base";SC.CoreView=SC.Responder.extend(SC.DelegateSupport);sc_require("system/browser");
sc_require("system/event");sc_require("system/cursor");sc_require("system/responder");
sc_require("system/theme");sc_require("mixins/string");sc_require("views/view/base");
SC.CONTEXT_MENU_ENABLED=YES;SC.TABBING_ONLY_INSIDE_DOCUMENT=YES;SC.FROM_THEME="__FROM_THEME__";
SC.EMPTY_CHILD_VIEWS_ARRAY=[];SC.EMPTY_CHILD_VIEWS_ARRAY.needsClone=YES;SC.CoreView.reopen({concatenatedProperties:"outlets displayProperties classNames renderMixin didCreateLayerMixin willDestroyLayerMixin".w(),pane:function(){var view=this;
while(view&&!view.isPane){view=view.get("parentView")}return view}.property("parentView").cacheable(),page:null,parentView:null,isVisible:YES,isVisibleBindingDefault:SC.Binding.bool(),isVisibleInWindow:YES,childViews:SC.EMPTY_CHILD_VIEWS_ARRAY,layer:function(key,value){if(value!==undefined){this._view_layer=value
}else{value=this._view_layer;if(!value){var parent=this.get("parentView");if(parent){parent=parent.get("layer")
}if(parent){this._view_layer=value=this.findLayerInParentLayer(parent)}}}return value
}.property("isVisibleInWindow").cacheable(),$:function(sel){var layer=this.get("layer");
if(!layer){return SC.$()}else{if(sel===undefined){return SC.$(layer)}else{return SC.$(sel,layer)
}}},containerLayer:function(){return this.get("layer")}.property("layer").cacheable(),layerId:function(key,value){if(value){this._layerId=value
}if(this._layerId){return this._layerId}return SC.guidFor(this)}.property().cacheable(),findLayerInParentLayer:function(parentLayer){var id="#"+this.get("layerId");
return jQuery(id)[0]||jQuery(id,parentLayer)[0]},isDescendantOf:function(view){var parentView=this.get("parentView");
if(this===view){return YES}else{if(parentView){return parentView.isDescendantOf(view)
}else{return NO}}},displayDidChange:function(){this.set("layerNeedsUpdate",YES);return this
},_sc_isVisibleDidChange:function(){this.displayDidChange()}.observes("isVisible"),layerNeedsUpdate:NO,_view_layerNeedsUpdateDidChange:function(){if(this.get("layerNeedsUpdate")){this.invokeOnce(this.updateLayerIfNeeded)
}}.observes("layerNeedsUpdate"),updateLayerIfNeeded:function(skipIsVisibleInWindowCheck){var needsUpdate=this.get("layerNeedsUpdate"),shouldUpdate=needsUpdate&&(skipIsVisibleInWindowCheck||this.get("isVisibleInWindow"));
if(shouldUpdate){if(this.get("layer")){this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);
this.updateLayer();this.endPropertyChanges()}}return this},updateLayer:function(optionalContext){var mixins,idx,len,hasLegacyRenderMethod;
var context=optionalContext||this.renderContext(this.get("layer"));this._renderLayerSettings(context,NO);
hasLegacyRenderMethod=!this.update;if(hasLegacyRenderMethod){this.render(context,NO)
}else{this.update(context.$())}if(mixins=this.renderMixin){len=mixins.length;for(idx=0;
idx<len;++idx){mixins[idx].call(this,context,NO)}}context.update();if(context._innerHTMLReplaced){var pane=this.get("pane");
if(pane&&pane.get("isPaneAttached")){this._notifyDidAppendToDocument()}}if(this.useStaticLayout){this.viewDidResize()
}if(this.didUpdateLayer){this.didUpdateLayer()}if(this.designer&&this.designer.viewDidUpdateLayer){this.designer.viewDidUpdateLayer()
}return this},parentViewDidResize:function(){this.viewDidResize()},viewDidResize:function(){},renderContext:function(tagNameOrElement){return SC.RenderContext(tagNameOrElement)
},createLayer:function(){if(this.get("layer")){return this}var context=this.renderContext(this.get("tagName"));
this.renderToContext(context);this.set("layer",context.element());this._notifyDidCreateLayer();
return this},_notifyDidCreateLayer:function(){this.notifyPropertyChange("layer");
if(this.didCreateLayer){this.didCreateLayer()}var mixins=this.didCreateLayerMixin,len,idx,childViews=this.get("childViews"),childView;
if(mixins){len=mixins.length;for(idx=0;idx<len;++idx){mixins[idx].call(this)}}len=childViews.length;
for(idx=0;idx<len;++idx){childView=childViews[idx];if(!childView){continue}childView.notifyPropertyChange("layer");
childView._notifyDidCreateLayer()}},destroyLayer:function(){var layer=this.get("layer");
if(layer){this._notifyWillDestroyLayer();if(layer.parentNode){layer.parentNode.removeChild(layer)
}layer=null}return this},replaceLayer:function(){this.destroyLayer();this.invokeOnce(this.updateLayerLocation)
},parentViewDidChange:function(){this.updateLayerLocation()},updateLayerLocation:function(){var node=this.get("layer"),parentView=this.get("parentView"),parentNode=parentView?parentView.get("containerLayer"):null;
if(node&&node.parentNode&&node.parentNode!==parentNode){node.parentNode.removeChild(node)
}if(!parentView){if(node&&node.parentNode){node.parentNode.removeChild(node)}}else{if(!parentNode){if(node){if(node.parentNode){node.parentNode.removeChild(node)
}this.destroyLayer()}}else{if(!node){this.createLayer();node=this.get("layer");if(!node){return
}}var siblings=parentView.get("childViews"),nextView=siblings.objectAt(siblings.indexOf(this)+1),nextNode=(nextView)?nextView.get("layer"):null;
if(nextView&&(!nextNode||nextNode.parentNode!==parentNode)){nextView.updateLayerLocationIfNeeded();
nextNode=nextView.get("layer")}if((node.parentNode!==parentNode)||(node.nextSibling!==nextNode)){parentNode.insertBefore(node,nextNode)
}}}parentNode=parentView=node=nextNode=null;this.set("layerLocationNeedsUpdate",NO);
return this},_notifyWillDestroyLayer:function(){if(this.willDestroyLayer){this.willDestroyLayer()
}var mixins=this.willDestroyLayerMixin,len,idx,childViews=this.get("childViews");
if(mixins){len=mixins.length;for(idx=0;idx<len;++idx){mixins[idx].call(this)}}len=childViews.length;
for(idx=0;idx<len;++idx){childViews[idx]._notifyWillDestroyLayer()}this.set("layer",null)
},renderToContext:function(context,firstTime){var hasLegacyRenderMethod,mixins,idx,len;
this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);if(SC.none(firstTime)){firstTime=YES
}this._renderLayerSettings(context,firstTime);hasLegacyRenderMethod=!this.update;
if(hasLegacyRenderMethod){this.render(context,firstTime)}else{if(firstTime){this.render(context)
}else{this.update(context.$())}}if(firstTime&&!this._didRenderChildViews){this.renderChildViews(context,firstTime)
}if(mixins=this.renderMixin){len=mixins.length;for(idx=0;idx<len;++idx){mixins[idx].call(this,context,firstTime)
}}this.endPropertyChanges()},_renderLayerSettings:function(context,firstTime){context.resetClassNames();
context.resetStyles();this.applyAttributesToContext(context)},applyAttributesToContext:function(context){context.addClass(this.get("classNames"));
if(this.get("isTextSelectable")){context.addClass("allow-select")}if(!this.get("isVisible")){context.addClass("hidden")
}if(this.get("isFirstResponder")){context.addClass("focus")}context.id(this.get("layerId"));
context.attr("role",this.get("ariaRole"))},prepareContext:function(context,firstTime){if(firstTime!==false){firstTime=YES
}if(firstTime){this.renderToContext(context)}else{this.updateLayer(context)}},renderChildViews:function(context,firstTime){var cv=this.get("childViews"),len=cv.length,idx,view;
for(idx=0;idx<len;++idx){view=cv[idx];if(!view){continue}context=context.begin(view.get("tagName"));
view.renderToContext(context,firstTime);context=context.end()}return context},render:function(){},_notifyDidAppendToDocument:function(){if(this.didAppendToDocument){this.didAppendToDocument()
}var i=0,child,childLen,children=this.get("childViews");for(i=0,childLen=children.length;
i<childLen;i++){child=children[i];if(child._notifyDidAppendToDocument){child._notifyDidAppendToDocument()
}}},childViewsObserver:function(){var childViews=this.get("childViews"),i,iLen,child;
for(i=0,iLen=childViews.length;i<iLen;i++){child=childViews[i];if(child._notifyDidAppendToDocument){child._notifyDidAppendToDocument()
}}}.observes("childViews"),tagName:"div",ariaRole:null,classNames:["sc-view"],toolTip:null,displayToolTip:function(){var ret=this.get("toolTip");
return(ret&&this.get("localize"))?ret.loc():(ret||"")}.property("toolTip","localize").cacheable(),isTextSelectable:NO,displayProperties:["isFirstResponder"],nextResponder:function(){return this.get("parentView")
}.property("parentView").cacheable(),acceptsFirstResponder:NO,init:function(){var parentView=this.get("parentView"),path,root,lp,displayProperties;
arguments.callee.base.apply(this,arguments);SC.View.views[this.get("layerId")]=this;
this.childViews=this.get("childViews").slice();this.createChildViews();displayProperties=this.get("displayProperties");
for(var i=0,l=displayProperties.length;i<l;i++){this.addObserver(displayProperties[i],this,this.displayDidChange)
}},awake:function(){arguments.callee.base.apply(this,arguments);var childViews=this.get("childViews"),len=childViews.length,idx;
for(idx=0;idx<len;++idx){if(!childViews[idx]){continue}childViews[idx].awake()}},frame:function(){return this.computeFrameWithParentFrame(null)
}.property("useStaticLayout").cacheable(),computeFrameWithParentFrame:function(pdim){var layer;
var pv=this.get("parentView");if(layer=this.get("layer")){f=SC.viewportOffset(layer);
if(pv){f=pv.convertFrameFromView(f,null)}f.width=layer.offsetWidth;f.height=layer.offsetHeight;
return f}return null},clippingFrame:function(){var f=this.get("frame"),ret=f,pv,cf;
if(!f){return null}pv=this.get("parentView");if(pv){cf=pv.get("clippingFrame");if(!cf){return f
}ret=SC.intersectRects(cf,f)}ret.x-=f.x;ret.y-=f.y;return ret}.property("parentView","frame").cacheable(),_sc_view_clippingFrameDidChange:function(){var cvs=this.get("childViews"),len=cvs.length,idx,cv;
for(idx=0;idx<len;++idx){cv=cvs[idx];cv.notifyPropertyChange("clippingFrame");cv._sc_view_clippingFrameDidChange()
}},removeChild:function(view){view.set("parentView",null);var childViews=this.get("childViews"),idx=childViews.indexOf(view);
if(idx>=0){childViews.removeAt(idx)}return this},removeAllChildren:function(){var childViews=this.get("childViews"),view;
while(view=childViews.objectAt(childViews.get("length")-1)){this.removeChild(view)
}return this},removeFromParent:function(){var parent=this.get("parentView");if(parent){parent.removeChild(this)
}return this},destroy:function(){if(this.get("isDestroyed")){return this}this._destroy();
if(this.get("parentView")){this.removeFromParent()}arguments.callee.base.apply(this,arguments);
return this},_destroy:function(){if(this.get("isDestroyed")){return this}this.destroyLayer();
var childViews=this.get("childViews"),len=childViews.length,idx;if(len){childViews=childViews.slice();
for(idx=0;idx<len;++idx){childViews[idx].destroy()}}delete SC.View.views[this.get("layerId")];
delete this._CQ;delete this.page;return this},createChildViews:function(){var childViews=this.get("childViews"),len=childViews.length,idx,key,views,view;
this.beginPropertyChanges();for(idx=0;idx<len;++idx){if(key=(view=childViews[idx])){if(typeof key===SC.T_STRING){view=this[key]
}else{key=null}if(!view){SC.Logger.error("No view with name "+key+" has been found in "+this.toString());
continue}view=this.createChildView(view);if(key){this[key]=view}}childViews[idx]=view
}this.endPropertyChanges();return this},createChildView:function(view,attrs){if(!view.isClass){attrs=view
}else{if(!attrs){attrs={}}else{attrs=SC.clone(attrs)}}attrs.owner=attrs.parentView=this;
attrs.isVisibleInWindow=this.get("isVisibleInWindow");if(!attrs.page){attrs.page=this.page
}if(view.isClass){view=view.create(attrs)}return view},isView:YES,selectStart:function(evt){return this.get("isTextSelectable")
},contextMenu:function(evt){if(!this.get("isContextMenuEnabled")){evt.stop()}return true
}});SC.CoreView.mixin({isViewClass:YES,design:function(){if(this.isDesign){return this
}var ret=this.extend.apply(this,arguments);ret.isDesign=YES;if(SC.ViewDesigner){SC.ViewDesigner.didLoadDesign(ret,this,SC.A(arguments))
}return ret},extend:function(){var last=arguments[arguments.length-1];if(last&&!SC.none(last.theme)){last.themeName=last.theme;
delete last.theme}return SC.Object.extend.apply(this,arguments)},layout:function(layout){this.prototype.layout=layout;
return this},classNames:function(sc){sc=(this.prototype.classNames||[]).concat(sc);
this.prototype.classNames=sc;return this},tagName:function(tg){this.prototype.tagName=tg;
return this},childView:function(cv){var childViews=this.prototype.childViews||[];
if(childViews===this.superclass.prototype.childViews){childViews=childViews.slice()
}childViews.push(cv);this.prototype.childViews=childViews;return this},bind:function(keyName,path){var p=this.prototype,s=this.superclass.prototype;
var bindings=p._bindings;if(!bindings||bindings===s._bindings){bindings=p._bindings=(bindings||[]).slice()
}keyName=keyName+"Binding";p[keyName]=path;bindings.push(keyName);return this},prop:function(keyName,value){this.prototype[keyName]=value;
return this},localization:function(attrs,rootElement){if(rootElement){attrs.rootElement=SC.$(rootElement)[0]
}return attrs},viewFor:function(element,attrs){var args=SC.$A(arguments);if(SC.none(element)){args.shift()
}else{args[0]={rootElement:SC.$(element)[0]}}var ret=this.create.apply(this,arguments);
args=args[0]=null;return ret},create:function(){var last=arguments[arguments.length-1];
if(last&&last.theme){last.themeName=last.theme;delete last.theme}var C=this,ret=new C(arguments);
if(SC.ViewDesigner){SC.ViewDesigner.didCreateView(ret,SC.$A(arguments))}return ret
},loc:function(loc){var childLocs=loc.childViews;delete loc.childViews;this.applyLocalizedAttributes(loc);
if(SC.ViewDesigner){SC.ViewDesigner.didLoadLocalization(this,SC.$A(arguments))}var childViews=this.prototype.childViews,idx=childViews.length,viewClass;
while(--idx>=0){viewClass=childViews[idx];loc=childLocs[idx];if(loc&&viewClass&&viewClass.loc){viewClass.loc(loc)
}}return this},applyLocalizedAttributes:function(loc){SC.mixin(this.prototype,loc)
},views:{}});SC.outlet=function(path,root){return function(key){return(this[key]=SC.objectForPropertyPath(path,(root!==undefined)?root:this))
}.property()};SC.CoreView.unload=function(){var views=SC.View.views;if(views){for(var key in views){if(!views.hasOwnProperty(key)){continue
}delete views[key]}}};SC.View=SC.CoreView.extend({});if(SC.browser.msie){SC.Event.add(window,"unload",SC.View,SC.View.unload)
}sc_require("views/view");sc_require("mixins/responder_context");SC.MIXED_STATE="__MIXED__";
SC.Pane=SC.View.extend(SC.ResponderContext,{isPane:YES,page:null,rootResponder:null,sendEvent:function(action,evt,target){var handler;
if(!target){target=this.get("firstResponder")}while(target){if(action==="touchStart"){if(evt.touchResponder===target){target=null;
break}if(!target.get("hasTouch")||target.get("acceptsMultitouch")){if(target.tryToPerform("touchStart",evt)){break
}}}else{if(action==="touchEnd"&&!target.get("acceptsMultitouch")){if(!target.get("hasTouch")){if(target.tryToPerform("touchEnd",evt)){break
}}}else{if(target.tryToPerform(action,evt)){break}}}target=(target===this)?null:target.get("nextResponder")
}if(!target&&(target=this.get("defaultResponder"))){if(typeof target===SC.T_STRING){target=SC.objectForPropertyPath(target)
}if(!target){target=null}else{target=target.tryToPerform(action,evt)?target:null}}else{if(!target&&!(target=this.get("defaultResponder"))){target=this.tryToPerform(action,evt)?this:null
}}return evt.mouseHandler||target},nextResponder:function(){return null}.property().cacheable(),firstResponder:null,acceptsKeyPane:YES,isKeyPane:NO,becomeKeyPane:function(){if(this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(this)}return this},resignKeyPane:function(){if(!this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(null)}return this},makeFirstResponder:function(view,evt){var current=this.get("firstResponder"),isKeyPane=this.get("isKeyPane");
if(current===view){return this}if(SC.platform.touch&&view&&view.kindOf(SC.TextFieldView)&&!view.get("focused")){return this
}if(current){current.willLoseFirstResponder(current,evt)}if(isKeyPane){if(current){current.tryToPerform("willLoseKeyResponderTo",view)
}if(view){view.tryToPerform("willBecomeKeyResponderFrom",current)}}if(current){current.beginPropertyChanges().set("isFirstResponder",NO).set("isKeyResponder",NO).endPropertyChanges()
}this.set("firstResponder",view);if(view){view.beginPropertyChanges().set("isFirstResponder",YES).set("isKeyResponder",isKeyPane).endPropertyChanges()
}if(isKeyPane){if(view){view.tryToPerform("didBecomeKeyResponderFrom",current)}if(current){current.tryToPerform("didLoseKeyResponderTo",view)
}}if(view){view.didBecomeFirstResponder(view)}return this},willLoseKeyPaneTo:function(pane){this._forwardKeyChange(this.get("isKeyPane"),"willLoseKeyResponderTo",pane,NO);
return this},willBecomeKeyPaneFrom:function(pane){this._forwardKeyChange(!this.get("isKeyPane"),"willBecomeKeyResponderFrom",pane,YES);
return this},didLoseKeyPaneTo:function(pane){var isKeyPane=this.get("isKeyPane");
this.set("isKeyPane",NO);this._forwardKeyChange(isKeyPane,"didLoseKeyResponderTo",pane);
return this},didBecomeKeyPaneFrom:function(pane){var isKeyPane=this.get("isKeyPane");
this.set("isKeyPane",YES);this._forwardKeyChange(!isKeyPane,"didBecomeKeyResponderFrom",pane,YES);
return this},isMainPane:NO,focusFrom:function(pane){},blurTo:function(pane){},blurMainTo:function(pane){this.set("isMainPane",NO)
},focusMainFrom:function(pane){this.set("isMainPane",YES)},append:function(){return this.appendTo(document.body)
},remove:function(){if(!this.get("isVisibleInWindow")){return this}if(!this.get("isPaneAttached")){return this
}var dom=this.get("layer");if(dom&&dom.parentNode){dom.parentNode.removeChild(dom)
}dom=null;this._removeIntercept();this.resignKeyPane();var rootResponder=this.rootResponder;
if(this.get("isMainPane")){rootResponder.makeMainPane(null)}rootResponder.panes.remove(this);
this.rootResponder=null;this.set("isPaneAttached",NO);this.parentViewDidChange();
return this},insert:function(fn){var layer=this.get("layer");if(!layer){layer=this.createLayer().get("layer")
}fn(layer);if(!this.get("isPaneAttached")){this.paneDidAttach()}return this},appendTo:function(elem){return this.insert(function(layer){jQuery(elem).append(layer)
})},paneDidAttach:function(){var responder=(this.rootResponder=SC.RootResponder.responder);
responder.panes.add(this);this.set("isPaneAttached",YES);this.recomputeDependentProperties();
this._notifyDidAppendToDocument();this._addIntercept();return this},recomputeDependentProperties:function(){},isPaneAttached:NO,wantsTouchIntercept:NO,hasTouchIntercept:function(){return this.get("wantsTouchIntercept")&&SC.platform.touch
}.property("wantsTouchIntercept").cacheable(),zIndex:0,touchZ:99,_addIntercept:function(){if(this.get("hasTouchIntercept")){var div=document.createElement("div");
var divStyle=div.style;divStyle.position="absolute";divStyle.left="0px";divStyle.top="0px";
divStyle.right="0px";divStyle.bottom="0px";divStyle.webkitTransform="translateZ(0px)";
divStyle.zIndex=this.get("zIndex")+this.get("touchZ");div.className="touch-intercept";
div.id="touch-intercept-"+SC.guidFor(this);this._touchIntercept=div;document.body.appendChild(div)
}},_removeIntercept:function(){if(this._touchIntercept){document.body.removeChild(this._touchIntercept);
this._touchIntercept=null}},hideTouchIntercept:function(){if(this._touchIntercept){this._touchIntercept.style.display="none"
}},showTouchIntercept:function(){if(this._touchIntercept){this._touchIntercept.style.display="block"
}},recomputeIsVisibleInWindow:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}var previous=this.get("isVisibleInWindow"),current=this.get("isVisible")&&this.get("isPaneAttached");
if(previous!==current){this.set("isVisibleInWindow",current);var childViews=this.get("childViews"),len=childViews.length,idx,view;
for(idx=0;idx<len;idx++){view=childViews[idx];if(view.recomputeIsVisibleInWindow){view.recomputeIsVisibleInWindow(current)
}}if(current){if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}else{if(this.get("isKeyPane")){this.resignKeyPane()}}}this.updateLayerIfNeeded(YES);
return this},updateLayerLocation:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}return this},init:function(){if(this.hasTouchIntercept===YES){SC.Logger.warn("Do not set hasTouchIntercept directly. Use wantsTouchIntercept instead.");
this.hasTouchIntercept=SC.platform.touch}var hasLayer=!!this.get("layer");arguments.callee.base.apply(this,arguments);
if(hasLayer){this.paneDidAttach()}},classNames:"sc-pane".w()});sc_require("panes/pane");
SC.Pane.reopen({performKeyEquivalent:function(keystring,evt){var ret=arguments.callee.base.apply(this,arguments);
if(!ret){var defaultResponder=this.get("defaultResponder");if(defaultResponder){if(defaultResponder.performKeyEquivalent){ret=defaultResponder.performKeyEquivalent(keystring,evt)
}if(!ret&&defaultResponder.tryToPerform){ret=defaultResponder.tryToPerform(keystring,evt)
}}}return ret},keyDown:function(evt){var nextValidKeyView;if((evt.which===9||(SC.browser.mozilla&&evt.keyCode===9))&&!this.get("firstResponder")){if(evt.shiftKey){nextValidKeyView=this.get("previousValidKeyView")
}else{nextValidKeyView=this.get("nextValidKeyView")}if(nextValidKeyView){this.makeFirstResponder(nextValidKeyView);
return YES}}return NO},_forwardKeyChange:function(shouldForward,methodName,pane,isKey){var keyView,responder,newKeyView;
if(shouldForward&&(responder=this.get("firstResponder"))){newKeyView=(pane)?pane.get("firstResponder"):null;
keyView=this.get("firstResponder");if(keyView&&keyView[methodName]){keyView[methodName](newKeyView)
}if((isKey!==undefined)&&responder){responder.set("isKeyResponder",isKey)}}}});sc_require("panes/pane");
SC.Pane.reopen({currentWindowSize:null,computeParentDimensions:function(frame){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}var wframe=this.get("currentWindowSize"),wDim={x:0,y:0,width:1000,height:1000},layout=this.get("layout");
if(wframe){wDim.width=wframe.width;wDim.height=wframe.height}else{if(SC.RootResponder.responder){var wSize=SC.RootResponder.responder.get("currentWindowSize");
if(wSize){wDim.width=wSize.width;wDim.height=wSize.height}}else{var size,body,docElement;
if(!this._bod||!this._docElement){body=document.body;docElement=document.documentElement;
this._body=body;this._docElement=docElement}else{body=this._body;docElement=this._docElement
}if(window.innerHeight){wDim.width=window.innerWidth;wDim.height=window.innerHeight
}else{if(docElement&&docElement.clientHeight){wDim.width=docElement.clientWidth;wDim.height=docElement.clientHeight
}else{if(body){wDim.width=body.clientWidth;wDim.height=body.clientHeight}}}this.windowSizeDidChange(null,wDim)
}}if(layout.minHeight||layout.minWidth){if(layout.minHeight){wDim.height=Math.max(wDim.height,layout.minHeight)
}if(layout.minWidth){wDim.width=Math.max(wDim.width,layout.minWidth)}}return wDim
},frame:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}return this.computeFrameWithParentFrame(null)}.property(),windowSizeDidChange:function(oldSize,newSize){this.set("currentWindowSize",newSize);
this.parentViewDidResize();return this},paneLayoutDidChange:function(){this.invokeOnce(this.updateLayout)
}.observes("layout"),recomputeDependentProperties:function(original){this.set("currentWindowSize",this.rootResponder.computeWindowSize());
original()}.enhance()});sc_require("panes/pane");SC.Pane.reopen({prependTo:function(elem){return this.insert(function(layer){jQuery(elem).prepend(layer)
})},removeFromParent:function(){throw SC.Error.desc("SC.Pane cannot be removed from its parent, since it's the root. Did you mean remove()?")
}});SC.TemplatePane=SC.Object.extend({});SC.mixin(SC.TemplatePane,{append:function(attrs){var pane=SC.MainPane.extend({childViews:["contentView"],contentView:SC.TemplateView.design(attrs)});
return pane.create().append()}});sc_require("panes/pane");SC.Pane.reopen({recomputeDependentProperties:function(original){this.recomputeIsVisibleInWindow();
original()}.enhance()});SC.Application=SC.Responder.extend(SC.ResponderContext,{});
SC.BENCHMARK_LOG_READY=YES;sc_require("system/event");SC.mixin({isReady:NO,ready:function(target,method){var queue=this._readyQueue;
if(method===undefined){method=target;target=null}else{if(SC.typeOf(method)===SC.T_STRING){method=target[method]
}}jQuery(document).ready(function(){method.call(target)});return this},onReady:{startRunLoop:function(){SC.RunLoop.begin()
},setupLocales:function(){SC.Locale.createCurrentLocale();jQuery("body").addClass(SC.Locale.currentLanguage.toLowerCase())
},removeLoading:function(){jQuery("#loading").remove()},done:function(){SC.isReady=true;
if(window.main&&!SC.suppressMain&&(SC.mode===SC.APP_MODE)){main()}SC.RunLoop.end()
}}});jQuery(document).ready(SC.onReady.startRunLoop).ready(SC.onReady.setupLocales).ready(SC.onReady.removeLoading);
jQuery.event.special.ready._default=SC.onReady.done;SC.removeLoading=YES;SC.APP_MODE="APP_MODE";
SC.TEST_MODE="TEST_MODE";SC.mode=SC.APP_MODE;SC.platform={touch:(("createTouch" in document)&&SC.browser.chrome<9)||SC.browser.android,bounceOnScroll:SC.browser.iOS,pinchToZoom:SC.browser.iOS,input:{placeholder:("placeholder" in document.createElement("input"))},input:function(attributes){var ret={},len=attributes.length,elem=document.createElement("input"),attr,idx;
for(idx=0;idx<len;idx++){attr=attributes[idx];ret[attr]=!!(attr in elem)}return ret
}(("autocomplete readonly list size required multiple maxlength pattern min max step placeholder").w()),standalone:!!navigator.standalone,cssPrefix:null,domCSSPrefix:null,simulateTouchEvents:function(){if(this.touch){SC.Logger.info("Can't simulate touch events in an environment that supports them.");
return}SC.Logger.log("Simulating touch events");SC.platform.touch=YES;SC.platform.bounceOnScroll=YES;
document.body.className=document.body.className+" touch";this._simtouch_counter=1;
this.removeEvents("click dblclick mouseout mouseover mousewheel".w());this.replaceEvent("mousemove",this._simtouch_mousemove);
this.replaceEvent("mousedown",this._simtouch_mousedown);this.replaceEvent("mouseup",this._simtouch_mouseup);
SC.platform.windowSizeDeterminesOrientation=YES;SC.device.orientationHandlingShouldChange()
},removeEvents:function(events){var idx,len=events.length,key;for(idx=0;idx<len;idx++){key=events[idx];
SC.Event.remove(document,key,SC.RootResponder.responder,SC.RootResponder.responder[key])
}},replaceEvent:function(evt,replacement){SC.Event.remove(document,evt,SC.RootResponder.responder,SC.RootResponder.responder[evt]);
SC.Event.add(document,evt,this,replacement)},_simtouch_mousemove:function(evt){if(!this._mousedown){if(evt.altKey&&this._pinchCenter==null){this._pinchCenter={pageX:evt.pageX,pageY:evt.pageY,screenX:evt.screenX,screenY:evt.screenY,clientX:evt.clientX,clientY:evt.clientY}
}else{if(!evt.altKey&&this._pinchCenter!=null){this._pinchCenter=null}}return NO}var manufacturedEvt=this.manufactureTouchEvent(evt,"touchmove");
return SC.RootResponder.responder.touchmove(manufacturedEvt)},_simtouch_mousedown:function(evt){this._mousedown=YES;
var manufacturedEvt=this.manufactureTouchEvent(evt,"touchstart");return SC.RootResponder.responder.touchstart(manufacturedEvt)
},_simtouch_mouseup:function(evt){var manufacturedEvt=this.manufactureTouchEvent(evt,"touchend"),ret=SC.RootResponder.responder.touchend(manufacturedEvt);
this._mousedown=NO;this._simtouch_counter++;return ret},manufactureTouchEvent:function(evt,type){var realTouch,virtualTouch,realTouchIdentifier=this._simtouch_counter;
realTouch={type:type,target:evt.target,identifier:realTouchIdentifier,pageX:evt.pageX,pageY:evt.pageY,screenX:evt.screenX,screenY:evt.screenY,clientX:evt.clientX,clientY:evt.clientY};
evt.touches=[realTouch];if(evt.altKey&&this._pinchCenter!=null){var pageX=this._pinchCenter.pageX+this._pinchCenter.pageX-evt.pageX,pageY=this._pinchCenter.pageY+this._pinchCenter.pageY-evt.pageY,screenX=this._pinchCenter.screenX+this._pinchCenter.screenX-evt.screenX,screenY=this._pinchCenter.screenY+this._pinchCenter.screenY-evt.screenY,clientX=this._pinchCenter.clientX+this._pinchCenter.clientX-evt.clientX,clientY=this._pinchCenter.clientY+this._pinchCenter.clientY-evt.clientY,virtualTouchIdentifier=this._simtouch_counter+1;
virtualTouch={type:type,target:evt.target,identifier:virtualTouchIdentifier,pageX:pageX,pageY:pageY,screenX:screenX,screenY:screenY,clientX:clientX,clientY:clientY};
evt.touches=[realTouch,virtualTouch]}evt.changedTouches=evt.touches;return evt},supportsCSSTransitions:NO,supportsCSSTransforms:NO,understandsCSS3DTransforms:NO,supportsCSS3DTransforms:NO,supportsAcceleratedLayers:NO,supportsHashChange:function(){return("onhashchange" in window)&&(document.documentMode===undefined||document.documentMode>7)
}(),supportsHistory:function(){return !!(window.history&&window.history.pushState)
}(),supportsCanvas:function(){return !!document.createElement("canvas").getContext
}(),supportsOrientationChange:("onorientationchange" in window),windowSizeDeterminesOrientation:SC.browser.iOS||!("onorientationchange" in window)};
(function(){var userAgent=navigator.userAgent.toLowerCase();if((/webkit/).test(userAgent)){SC.platform.cssPrefix="webkit";
SC.platform.domCSSPrefix="Webkit"}else{if((/opera/).test(userAgent)){SC.platform.cssPrefix="opera";
SC.platform.domCSSPrefix="O"}else{if((/msie/).test(userAgent)&&!(/opera/).test(userAgent)){SC.platform.cssPrefix="ms";
SC.platform.domCSSPrefix="ms"}else{if((/mozilla/).test(userAgent)&&!(/(compatible|webkit)/).test(userAgent)){SC.platform.cssPrefix="moz";
SC.platform.domCSSPrefix="Moz"}}}}})();(function(){var el=document.createElement("div");
var css_browsers=["-moz-","-moz-","-o-","-ms-","-webkit-"];var test_browsers=["moz","Moz","o","ms","webkit"];
var css="",i=null;for(i=0;i<css_browsers.length;i++){css+=css_browsers[i]+"transition:all 1s linear;";
css+=css_browsers[i]+"transform: translate(1px, 1px);";css+=css_browsers[i]+"perspective: 500px;"
}el.style.cssText=css;for(i=0;i<test_browsers.length;i++){if(el.style[test_browsers[i]+"TransitionProperty"]!==undefined){SC.platform.supportsCSSTransitions=YES
}if(el.style[test_browsers[i]+"Transform"]!==undefined){SC.platform.supportsCSSTransforms=YES
}if(el.style[test_browsers[i]+"Perspective"]!==undefined||el.style[test_browsers[i]+"PerspectiveProperty"]!==undefined){SC.platform.understandsCSS3DTransforms=YES;
SC.platform.supportsCSS3DTransforms=YES}}try{if(window.media&&window.media.matchMedium){if(!window.media.matchMedium("(-webkit-transform-3d)")){SC.platform.supportsCSS3DTransforms=NO
}}else{if(window.styleMedia&&window.styleMedia.matchMedium){if(!window.styleMedia.matchMedium("(-webkit-transform-3d)")){SC.platform.supportsCSS3DTransforms=NO
}}}}catch(e){SC.platform.supportsCSS3DTransforms=NO}if(SC.platform.supportsCSSTransforms&&SC.platform.cssPrefix==="webkit"){SC.platform.supportsAcceleratedLayers=YES
}})();sc_require("system/ready");sc_require("system/platform");SC.CAPTURE_BACKSPACE_KEY=NO;
SC.RootResponder=SC.Object.extend({panes:null,init:function(){arguments.callee.base.apply(this,arguments);
this.panes=SC.Set.create();if(SC.platform.supportsCSSTransitions){this[SC.platform.cssPrefix+"TransitionEnd"]=this.transitionEnd
}},mainPane:null,makeMainPane:function(pane){var currentMain=this.get("mainPane");
if(currentMain===pane){return this}this.beginPropertyChanges();if(this.get("keyPane")===currentMain){this.makeKeyPane(pane)
}this.set("mainPane",pane);if(currentMain){currentMain.blurMainTo(pane)}if(pane){pane.focusMainFrom(currentMain)
}this.endPropertyChanges();return this},menuPane:null,makeMenuPane:function(pane){if(pane&&!pane.get("acceptsMenuPane")){return this
}else{var currentMenu=this.get("menuPane");if(currentMenu===pane){return this}this.set("menuPane",pane)
}return this},keyPane:null,previousKeyPanes:[],makeKeyPane:function(pane){var newKeyPane,previousKeyPane,previousKeyPanes;
if(pane){if(!pane.get("acceptsKeyPane")){return this}else{previousKeyPane=this.get("keyPane");
if(previousKeyPane===pane){return this}else{if(previousKeyPane){previousKeyPanes=this.get("previousKeyPanes");
previousKeyPanes.push(previousKeyPane)}newKeyPane=pane}}}else{previousKeyPane=this.get("keyPane");
previousKeyPanes=this.get("previousKeyPanes");newKeyPane=null;while(previousKeyPanes.length>0){var candidate=previousKeyPanes.pop();
if(candidate.get("isPaneAttached")&&candidate.get("acceptsKeyPane")){newKeyPane=candidate;
break}}}if(!newKeyPane){var mainPane=this.get("mainPane");if(mainPane&&mainPane.get("acceptsKeyPane")){newKeyPane=mainPane
}}if(previousKeyPane){previousKeyPane.willLoseKeyPaneTo(newKeyPane)}if(newKeyPane){newKeyPane.willBecomeKeyPaneFrom(previousKeyPane)
}this.set("keyPane",newKeyPane);if(newKeyPane){newKeyPane.didBecomeKeyPaneFrom(previousKeyPane)
}if(previousKeyPane){previousKeyPane.didLoseKeyPaneTo(newKeyPane)}return this},currentWindowSize:null,computeWindowSize:function(){var size,bod,docElement;
if(!this._bod||!this._docElement){bod=document.body;docElement=document.documentElement;
this._bod=bod;this._docElement=docElement}else{bod=this._bod;docElement=this._docElement
}if(window.innerHeight){size={width:window.innerWidth,height:window.innerHeight}}else{if(docElement&&docElement.clientHeight){size={width:docElement.clientWidth,height:docElement.clientHeight}
}else{if(bod){size={width:bod.clientWidth,height:bod.clientHeight}}}}return size},resize:function(){this._resize();
return YES},_resize:function(){var newSize=this.computeWindowSize(),oldSize=this.get("currentWindowSize");
this.set("currentWindowSize",newSize);if(!SC.rectsEqual(newSize,oldSize)){SC.device.windowSizeDidChange(newSize);
if(this.panes){SC.run(function(){this.panes.invoke("windowSizeDidChange",oldSize,newSize)
},this)}}},hasFocus:NO,focus:function(){if(!this.get("hasFocus")){SC.$("body").addClass("sc-focus").removeClass("sc-blur");
SC.run(function(){this.set("hasFocus",YES)},this)}return YES},focusin:function(){this.focus()
},focusout:function(){this.blur()},blur:function(){if(this.get("hasFocus")){SC.$("body").addClass("sc-blur").removeClass("sc-focus");
SC.run(function(){this.set("hasFocus",NO)},this)}return YES},dragDidStart:function(drag){this._mouseDownView=drag;
this._drag=drag},defaultResponder:null,sendAction:function(action,target,sender,pane,context,firstResponder){target=this.targetForAction(action,target,sender,pane,firstResponder);
if(target&&target.isResponderContext){return !!target.sendAction(action,sender,context,firstResponder)
}else{return target&&target.tryToPerform(action,sender)}},_responderFor:function(target,methodName,firstResponder){var defaultResponder=target?target.get("defaultResponder"):null;
if(target){target=firstResponder||target.get("firstResponder")||target;do{if(target.respondsTo(methodName)){return target
}}while((target=target.get("nextResponder")))}if(typeof defaultResponder===SC.T_STRING){defaultResponder=SC.objectForPropertyPath(defaultResponder)
}if(!defaultResponder){return null}else{if(defaultResponder.isResponderContext){return defaultResponder
}else{if(defaultResponder.respondsTo(methodName)){return defaultResponder}else{return null
}}}},targetForAction:function(methodName,target,sender,pane,firstResponder){if(!methodName||(SC.typeOf(methodName)!==SC.T_STRING)){return null
}if(target){if(SC.typeOf(target)===SC.T_STRING){target=SC.objectForPropertyPath(target)||SC.objectForPropertyPath(target,sender)
}if(target&&!target.isResponderContext){if(target.respondsTo&&!target.respondsTo(methodName)){target=null
}else{if(SC.typeOf(target[methodName])!==SC.T_FUNCTION){target=null}}}return target
}if(pane){target=this._responderFor(pane,methodName,firstResponder);if(target){return target
}}var keyPane=this.get("keyPane"),mainPane=this.get("mainPane");if(keyPane&&(keyPane!==pane)){target=this._responderFor(keyPane,methodName)
}if(!target&&mainPane&&(mainPane!==keyPane)){target=this._responderFor(mainPane,methodName)
}if(!target&&(target=this.get("defaultResponder"))){if(SC.typeOf(target)===SC.T_STRING){target=SC.objectForPropertyPath(target);
if(target){this.set("defaultResponder",target)}}if(target&&!target.isResponderContext){if(target.respondsTo&&!target.respondsTo(methodName)){target=null
}else{if(SC.typeOf(target[methodName])!==SC.T_FUNCTION){target=null}}}}return target
},targetViewForEvent:function(evt){return evt.target?SC.$(evt.target).view()[0]:null
},sendEvent:function(action,evt,target){var pane,ret;SC.run(function(){if(target){pane=target.get("pane")
}else{pane=this.get("menuPane")||this.get("keyPane")||this.get("mainPane")}ret=(pane)?pane.sendEvent(action,evt,target):null
},this);return ret},listenFor:function(keyNames,target,receiver,useCapture){receiver=receiver?receiver:this;
keyNames.forEach(function(keyName){var method=receiver[keyName];if(method){SC.Event.add(target,keyName,receiver,method,null,useCapture)
}},this);target=null;return receiver},setup:function(){this.listenFor("touchstart touchmove touchend touchcancel".w(),document);
this.listenFor("keydown keyup beforedeactivate mousedown mouseup click dblclick mousemove selectstart contextmenu".w(),document).listenFor("resize".w(),window);
if(SC.browser.msie){this.listenFor("focusin focusout".w(),document)}else{this.listenFor("focus blur".w(),window)
}this.listenFor("webkitAnimationStart webkitAnimationIteration webkitAnimationEnd".w(),document);
if(SC.platform.supportsCSSTransitions){this.listenFor(["transitionEnd",SC.platform.cssPrefix+"TransitionEnd"],document)
}if(this.keypress){if(SC.CAPTURE_BACKSPACE_KEY&&SC.browser.mozilla){var responder=this;
document.onkeypress=function(e){e=SC.Event.normalizeEvent(e);return responder.keypress.call(responder,e)
}}else{SC.Event.add(document,"keypress",this,this.keypress)}}"drag selectstart".w().forEach(function(keyName){var method=this[keyName];
if(method){if(SC.browser.msie){var responder=this;document.body["on"+keyName]=function(e){return method.call(responder,SC.Event.normalizeEvent(event||window.event))
};SC.Event.add(window,"unload",this,function(){document.body["on"+keyName]=null})
}else{SC.Event.add(document,keyName,this,method)}}},this);var mousewheel="mousewheel";
if(SC.browser.mozilla){if(SC.browser.compareVersion(1,9,1)<0){mousewheel="DOMMouseScroll"
}else{mousewheel="MozMousePixelScroll"}}SC.Event.add(document,mousewheel,this,this.mousewheel);
if(SC.browser&&SC.platform&&SC.browser.mobileSafari&&!SC.platform.touch){SC.platform.simulateTouchEvents()
}this.set("currentWindowSize",this.computeWindowSize());this.focus();if(SC.browser.mobileSafari){var f=SC.RunLoop.prototype.endRunLoop,patch;
patch=function(){if(f){f.apply(this,arguments)}var touches=SC.RootResponder.responder._touches,touch,elem,target,textNode,view,found=NO;
if(touches){for(touch in touches){if(touches[touch]._rescuedElement){continue}target=elem=touches[touch].target;
while(elem&&(elem=elem.parentNode)&&!found){found=(elem===document.body)}if(!found&&target){if(target.parentNode&&target.cloneNode){var clone=target.cloneNode(true);
target.parentNode.replaceChild(clone,target);target.swapNode=clone}var pen=SC.touchHoldingPen;
if(!pen){pen=SC.touchHoldingPen=document.createElement("div");pen.style.display="none";
document.body.appendChild(pen)}pen.appendChild(target);touches[touch]._rescuedElement=target
}}}};SC.RunLoop.prototype.endRunLoop=patch}},_touchedViews:{},_touches:{},touchesForView:function(view){if(this._touchedViews[SC.guidFor(view)]){return this._touchedViews[SC.guidFor(view)].touches
}},averagedTouchesForView:function(view,added){var t=this.touchesForView(view),averaged=view._scrr_averagedTouches||(view._scrr_averagedTouches={});
if((!t||t.length===0)&&!added){averaged.x=0;averaged.y=0;averaged.d=0;averaged.touchCount=0
}else{var touches=this._averagedTouches_touches||(this._averagedTouches_touches=[]);
touches.length=0;if(t){var i,len=t.length;for(i=0;i<len;i++){touches.push(t[i])}}if(added){touches.push(added)
}var idx,touch,ax=0,ay=0,dx,dy,ad=0;len=touches.length;for(idx=0;idx<len;idx++){touch=touches[idx];
ax+=touch.pageX;ay+=touch.pageY}ax/=len;ay/=len;for(idx=0;idx<len;idx++){touch=touches[idx];
dx=Math.abs(touch.pageX-ax);dy=Math.abs(touch.pageY-ay);ad+=Math.pow(dx*dx+dy*dy,0.5)
}ad/=len;averaged.x=ax;averaged.y=ay;averaged.d=ad;averaged.touchCount=len}return averaged
},assignTouch:function(touch,view){if(touch.hasEnded){throw"Attemt to assign a touch that is already finished."
}if(touch.view===view){return}if(touch.view){this.unassignTouch(touch)}if(!this._touchedViews[SC.guidFor(view)]){this._touchedViews[SC.guidFor(view)]={view:view,touches:SC.CoreSet.create([]),touchCount:0};
view.set("hasTouch",YES)}touch.view=view;this._touchedViews[SC.guidFor(view)].touches.add(touch);
this._touchedViews[SC.guidFor(view)].touchCount++},unassignTouch:function(touch){var view,viewEntry;
if(!touch.view){return}view=touch.view;viewEntry=this._touchedViews[SC.guidFor(view)];
viewEntry.touches.remove(touch);viewEntry.touchCount--;if(viewEntry.touchCount<1){view.set("hasTouch",NO);
viewEntry.view=null;delete this._touchedViews[SC.guidFor(view)]}touch.view=undefined
},_flushQueuedTouchResponder:function(){if(this._queuedTouchResponder){var queued=this._queuedTouchResponder;
this._queuedTouchResponder=null;this.makeTouchResponder.apply(this,queued)}},makeTouchResponder:function(touch,responder,shouldStack,upViewChain){if(this._isMakingTouchResponder){this._queuedTouchResponder=[touch,responder,shouldStack,upViewChain];
return}this._isMakingTouchResponder=YES;var stack=touch.touchResponders,touchesForView;
if(touch.touchResponder===responder){this._isMakingTouchResponder=NO;this._flushQueuedTouchResponder();
return}var pane;if(responder){pane=responder.get("pane")}else{pane=this.get("keyPane")||this.get("mainPane")
}if(stack.indexOf(responder)<0){if(upViewChain){try{responder=(pane)?pane.sendEvent("touchStart",touch,responder):null
}catch(e){SC.Logger.error("Error in touchStart: "+e);responder=null}}else{if((responder.get?responder.get("acceptsMultitouch"):responder.acceptsMultitouch)||!responder.hasTouch){if(!responder.touchStart(touch)){responder=null
}}else{}}}if(!shouldStack||(stack.indexOf(responder)>-1&&stack[stack.length-1]!==responder)){this.unassignTouch(touch);
var idx=stack.length-1,last=stack[idx];while(last&&last!==responder){touchesForView=this.touchesForView(last);
if((last.get?last.get("acceptsMultitouch"):last.acceptsMultitouch)||!touchesForView){if(last.touchCancelled){last.touchCancelled(touch)
}}idx--;last=stack[idx];stack.pop();touch.touchResponder=stack[idx];touch.nextTouchResponder=stack[idx-1]
}}if(responder){this.assignTouch(touch,responder);if(responder!==touch.touchResponder){stack.push(responder);
touch.touchResponder=responder;touch.nextTouchResponder=stack[stack.length-2]}}this._isMakingTouchResponder=NO;
this._flushQueuedTouchResponder()},captureTouch:function(touch,startingPoint,shouldStack){if(!startingPoint){startingPoint=this
}var target=touch.targetView,view=target,chain=[],idx,len;if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("  -- Received one touch on %@".fmt(target.toString()))
}while(view&&(view!==startingPoint)){chain.unshift(view);view=view.get("nextResponder")
}for(len=chain.length,idx=0;idx<len;idx++){view=chain[idx];if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("  -- Checking %@ for captureTouch response…".fmt(view.toString()))
}if(view.tryToPerform("captureTouch",touch)){if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("   -- Making %@ touch responder because it returns YES to captureTouch".fmt(view.toString()))
}this.makeTouchResponder(touch,view,shouldStack,YES);return}}if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("   -- Didn't find a view that returned YES to captureTouch, so we're calling touchStart")
}this.makeTouchResponder(touch,target,shouldStack,YES)},endMissingTouches:function(presentTouches){var idx,len=presentTouches.length,map={},end=[];
for(idx=0;idx<len;idx++){map[presentTouches[idx].identifier]=YES}for(idx in this._touches){var id=this._touches[idx].identifier;
if(!map[id]){end.push(this._touches[idx])}}for(idx=0,len=end.length;idx<len;idx++){this.endTouch(end[idx]);
this.finishTouch(end[idx])}},_touchCount:0,endTouch:function(touchEntry,action,evt){if(!action){action="touchEnd"
}var responderIdx,responders,responder,originalResponder;this.unassignTouch(touchEntry);
if(touchEntry.touchResponder){originalResponder=touchEntry.touchResponder;responders=touchEntry.touchResponders;
responderIdx=responders.length-1;responder=responders[responderIdx];while(responder){if(responder[action]){responder[action](touchEntry,evt)
}if(touchEntry.touchResponder!==originalResponder){break}responderIdx--;responder=responders[responderIdx];
action="touchCancelled"}}},finishTouch:function(touch){var elem;this.unassignTouch(touch);
if(elem=touch._rescuedElement){if(elem.swapNode&&elem.swapNode.parentNode){elem.swapNode.parentNode.replaceChild(elem,elem.swapNode)
}else{if(elem.parentNode===SC.touchHoldingPen){SC.touchHoldingPen.removeChild(elem)
}}delete touch._rescuedElement;elem.swapNode=null;elem=null}touch.touchResponders=null;
touch.touchResponder=null;touch.nextTouchResponder=null;touch.hasEnded=YES;if(this._touches[touch.identifier]){delete this._touches[touch.identifier]
}},touchstart:function(evt){var hidingTouchIntercept=NO;SC.run(function(){this.endMissingTouches(evt.touches);
var idx,touches=evt.changedTouches,len=touches.length,target,view,touch,touchEntry;
evt.touchContext=this;for(idx=0;idx<len;idx++){touch=touches[idx];touchEntry=SC.Touch.create(touch,this);
if(!touchEntry.targetView){continue}if(touchEntry.hidesTouchIntercept){hidingTouchIntercept=YES
}touchEntry.timeStamp=evt.timeStamp;this._touches[touch.identifier]=touchEntry;touchEntry.event=evt;
this.captureTouch(touchEntry,this);touchEntry.event=null}},this);if(hidingTouchIntercept){return YES
}return evt.hasCustomEventHandling},touchmove:function(evt){SC.run(function(){var touches=evt.changedTouches,touch,touchEntry,idx,len=touches.length,view,changedTouches,viewTouches,firstTouch,changedViews={},loc,guid,hidingTouchIntercept=NO;
if(this._drag){touch=SC.Touch.create(evt.changedTouches[0],this);this._drag.tryToPerform("mouseDragged",touch)
}for(idx=0;idx<len;idx++){touch=touches[idx];touchEntry=this._touches[touch.identifier];
if(!touchEntry){continue}if(touchEntry.hidesTouchIntercept){hidingTouchIntercept=YES
}touchEntry.pageX=touch.pageX;touchEntry.pageY=touch.pageY;touchEntry.clientX=touch.clientX;
touchEntry.clientY=touch.clientY;touchEntry.screenX=touch.screenX;touchEntry.screenY=touch.screenY;
touchEntry.timeStamp=evt.timeStamp;touchEntry.event=evt;if(touchEntry.touchResponder){view=touchEntry.touchResponder;
guid=SC.guidFor(view);if(!changedViews[guid]){changedViews[guid]={view:view,touches:[]}
}changedViews[guid].touches.push(touchEntry)}}if(hidingTouchIntercept){evt.allowDefault();
return YES}for(idx in changedViews){view=changedViews[idx].view;changedTouches=changedViews[idx].touches;
evt.viewChangedTouches=changedTouches;viewTouches=this.touchesForView(view);firstTouch=viewTouches.firstObject();
evt.pageX=firstTouch.pageX;evt.pageY=firstTouch.pageY;evt.clientX=firstTouch.clientX;
evt.clientY=firstTouch.clientY;evt.screenX=firstTouch.screenX;evt.screenY=firstTouch.screenY;
evt.touchContext=this;view.tryToPerform("touchesDragged",evt,viewTouches)}touches=evt.changedTouches;
len=touches.length;for(idx=0;idx<len;idx++){touch=touches[idx];touchEntry=this._touches[touch.identifier];
if(touchEntry){touchEntry.event=null}}},this);return evt.hasCustomEventHandling},touchend:function(evt){var hidesTouchIntercept=NO;
SC.run(function(){var touches=evt.changedTouches,touch,touchEntry,idx,len=touches.length,view,elem,action=evt.isCancel?"touchCancelled":"touchEnd",a,responderIdx,responders,responder;
for(idx=0;idx<len;idx++){touch=touches[idx];touch.type="touchend";touchEntry=this._touches[touch.identifier];
if(!touchEntry){continue}touchEntry.timeStamp=evt.timeStamp;touchEntry.pageX=touch.pageX;
touchEntry.pageY=touch.pageY;touchEntry.clientX=touch.clientX;touchEntry.clientY=touch.clientY;
touchEntry.screenX=touch.screenX;touchEntry.screenY=touch.screenY;touchEntry.type="touchend";
touchEntry.event=evt;if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("-- Received touch end")
}if(touchEntry.hidesTouchIntercept){touchEntry.unhideTouchIntercept();hidesTouchIntercept=YES
}if(this._drag){this._drag.tryToPerform("mouseUp",touch);this._drag=null}this.endTouch(touchEntry,action,evt);
this.finishTouch(touchEntry)}},this);if(hidesTouchIntercept){return YES}return evt.hasCustomEventHandling
},touchcancel:function(evt){evt.isCancel=YES;this.touchend(evt)},attemptKeyEquivalent:function(evt){var ret=null;
var keystring=evt.commandCodes()[0];if(!keystring){return NO}var menuPane=this.get("menuPane"),keyPane=this.get("keyPane"),mainPane=this.get("mainPane");
if(menuPane){ret=menuPane.performKeyEquivalent(keystring,evt);if(ret){return ret}}if(keyPane){ret=keyPane.performKeyEquivalent(keystring,evt);
if(ret||keyPane.get("isModal")){return ret}}if(!ret&&mainPane&&(mainPane!==keyPane)){ret=mainPane.performKeyEquivalent(keystring,evt);
if(ret||mainPane.get("isModal")){return ret}}return ret},_lastModifiers:null,_handleModifierChanges:function(evt){var m;
m=this._lastModifiers=(this._lastModifiers||{alt:false,ctrl:false,shift:false});var changed=false;
if(evt.altKey!==m.alt){m.alt=evt.altKey;changed=true}if(evt.ctrlKey!==m.ctrl){m.ctrl=evt.ctrlKey;
changed=true}if(evt.shiftKey!==m.shift){m.shift=evt.shiftKey;changed=true}evt.modifiers=m;
return(changed)?(this.sendEvent("flagsChanged",evt)?evt.hasCustomEventHandling:YES):YES
},_isFunctionOrNonPrintableKey:function(evt){return !!(evt.altKey||evt.ctrlKey||evt.metaKey||((evt.charCode!==evt.which)&&SC.FUNCTION_KEYS[evt.which]))
},_isModifierKey:function(evt){return !!SC.MODIFIER_KEYS[evt.charCode]},keydown:function(evt){if(SC.none(evt)){return YES
}var keyCode=evt.keyCode;if(SC.browser.mozilla&&evt.keyCode===9){this.keydownCounter=1
}if(keyCode===229){this._IMEInputON=YES;return this.sendEvent("keyDown",evt)}if(keyCode===27&&this._drag){this._drag.cancelDrag();
this._drag=null;this._mouseDownView=null;return YES}if(SC.browser.mozilla&&(evt.which===8)){return true
}var ret=this._handleModifierChanges(evt),target=evt.target||evt.srcElement,forceBlock=(evt.which===8)&&!SC.allowsBackspaceToPreviousPage&&(target===document.body);
if(this._isModifierKey(evt)){return(forceBlock?NO:ret)}ret=YES;if(this._isFunctionOrNonPrintableKey(evt)){if(keyCode>=37&&keyCode<=40&&SC.browser.mozilla){return YES
}ret=this.sendEvent("keyDown",evt);if(!ret){ret=!this.attemptKeyEquivalent(evt)}else{ret=evt.hasCustomEventHandling;
if(ret){forceBlock=NO}}}return forceBlock?NO:ret},keypress:function(evt){var ret,keyCode=evt.keyCode,isFirefox=!!SC.browser.mozilla;
if(SC.browser.mozilla&&evt.keyCode===9){this.keydownCounter++;if(this.keydownCounter==2){return YES
}}if(isFirefox&&(evt.which===8)){evt.which=keyCode;ret=this.sendEvent("keyDown",evt);
return ret?(SC.allowsBackspaceToPreviousPage||evt.hasCustomEventHandling):YES}else{var isFirefoxArrowKeys=(keyCode>=37&&keyCode<=40&&isFirefox),charCode=evt.charCode;
if((charCode!==undefined&&charCode===0&&evt.keyCode!==9)&&!isFirefoxArrowKeys){return YES
}if(isFirefoxArrowKeys){evt.which=keyCode}return this.sendEvent("keyDown",evt)?evt.hasCustomEventHandling:YES
}},keyup:function(evt){if(this._ffevt){this._ffevt=null}var ret=this._handleModifierChanges(evt);
if(this._isModifierKey(evt)){return ret}if(this._IMEInputON&&evt.keyCode===13){evt.isIMEInput=YES;
this.sendEvent("keyDown",evt);this._IMEInputON=NO}return this.sendEvent("keyUp",evt)?evt.hasCustomEventHandling:YES
},beforedeactivate:function(evt){var toElement=evt.toElement;if(toElement&&toElement.tagName&&toElement.tagName!=="IFRAME"){var view=SC.$(toElement).view()[0];
if(view&&view.get("blocksIEDeactivate")){return NO}}return YES},mousedown:function(evt){if(SC.platform.touch){evt.allowDefault();
return YES}if(!SC.browser.msie){window.focus()}this._clickCount+=1;if(!this._lastMouseUpAt||((Date.now()-this._lastMouseUpAt)>250)){this._clickCount=1
}else{var deltaX=this._lastMouseDownX-evt.clientX,deltaY=this._lastMouseDownY-evt.clientY,distance=Math.sqrt(deltaX*deltaX+deltaY*deltaY);
if(distance>8){this._clickCount=1}}evt.clickCount=this._clickCount;this._lastMouseDownX=evt.clientX;
this._lastMouseDownY=evt.clientY;var fr,view=this.targetViewForEvent(evt);if(view){fr=view.getPath("pane.firstResponder")
}if(fr&&fr.kindOf(SC.InlineTextFieldView)&&fr!==view){fr.resignFirstResponder()}view=this._mouseDownView=this.sendEvent("mouseDown",evt,view);
if(view&&view.respondsTo("mouseDragged")){this._mouseCanDrag=YES}return view?evt.hasCustomEventHandling:YES
},mouseup:function(evt){if(SC.platform.touch){evt.allowDefault();return YES}this.targetViewForEvent(evt);
if(this._drag){this._drag.tryToPerform("mouseUp",evt);this._drag=null}var handler=null,view=this._mouseDownView,targetView=this.targetViewForEvent(evt);
evt.clickCount=this._clickCount;if(view){handler=this.sendEvent("mouseUp",evt,view);
if(!handler&&(this._clickCount===2)){handler=this.sendEvent("doubleClick",evt,view)
}if(!handler){handler=this.sendEvent("click",evt,view)}}if(!handler){if(this._clickCount===2){handler=this.sendEvent("doubleClick",evt,targetView)
}if(!handler){handler=this.sendEvent("click",evt,targetView)}}this._mouseCanDrag=NO;
this._mouseDownView=null;this._lastMouseUpAt=Date.now();return(handler)?evt.hasCustomEventHandling:YES
},dblclick:function(evt){if(SC.browser.isIE){this._clickCount=2;this.mouseup(evt)
}},mousewheel:function(evt){var view=this.targetViewForEvent(evt),handler=this.sendEvent("mouseWheel",evt,view);
return(handler)?evt.hasCustomEventHandling:YES},_lastHovered:null,mousemove:function(evt){if(SC.platform.touch){evt.allowDefault();
return YES}if(SC.browser.msie){if(this._lastMoveX===evt.clientX&&this._lastMoveY===evt.clientY){return
}}this._lastMoveX=evt.clientX;this._lastMoveY=evt.clientY;SC.run(function(){if(this._drag){if(SC.browser.msie){if(this._lastMouseDownX!==evt.clientX||this._lastMouseDownY!==evt.clientY){this._drag.tryToPerform("mouseDragged",evt)
}}else{this._drag.tryToPerform("mouseDragged",evt)}}else{var lh=this._lastHovered||[],nh=[],exited,loc,len,view=this.targetViewForEvent(evt);
while(view&&(view!==this)){nh.push(view);view=view.get("nextResponder")}for(loc=0,len=lh.length;
loc<len;loc++){view=lh[loc];exited=view.respondsTo("mouseExited");if(exited&&nh.indexOf(view)===-1){view.tryToPerform("mouseExited",evt)
}}for(loc=0,len=nh.length;loc<len;loc++){view=nh[loc];if(lh.indexOf(view)!==-1){view.tryToPerform("mouseMoved",evt)
}else{view.tryToPerform("mouseEntered",evt)}}this._lastHovered=nh;if(this._mouseDownView){if(SC.browser.msie){if(this._lastMouseDownX!==evt.clientX&&this._lastMouseDownY!==evt.clientY){this._mouseDownView.tryToPerform("mouseDragged",evt)
}}else{this._mouseDownView.tryToPerform("mouseDragged",evt)}}}},this)},_mouseCanDrag:YES,selectstart:function(evt){var targetView=this.targetViewForEvent(evt),result=this.sendEvent("selectStart",evt,targetView);
if(targetView&&targetView.respondsTo("mouseDragged")){return(result!==null?YES:NO)&&!this._mouseCanDrag
}else{return(result!==null?YES:NO)}},drag:function(){return false},contextmenu:function(evt){var view=this.targetViewForEvent(evt);
return this.sendEvent("contextMenu",evt,view)},webkitAnimationStart:function(evt){try{var view=this.targetViewForEvent(evt);
this.sendEvent("animationDidStart",evt,view)}catch(e){SC.Logger.warn("Exception during animationDidStart: %@".fmt(e));
throw e}return view?evt.hasCustomEventHandling:YES},webkitAnimationIteration:function(evt){try{var view=this.targetViewForEvent(evt);
this.sendEvent("animationDidIterate",evt,view)}catch(e){SC.Logger.warn("Exception during animationDidIterate: %@".fmt(e));
throw e}return view?evt.hasCustomEventHandling:YES},webkitAnimationEnd:function(evt){try{var view=this.targetViewForEvent(evt);
this.sendEvent("animationDidEnd",evt,view)}catch(e){SC.Logger.warn("Exception during animationDidEnd: %@".fmt(e));
throw e}return view?evt.hasCustomEventHandling:YES},transitionEnd:function(evt){try{var view=this.targetViewForEvent(evt);
this.sendEvent("transitionDidEnd",evt,view)}catch(e){SC.Logger.warn("Exception during transitionDidEnd: %@".fmt(e));
throw e}return view?evt.hasCustomEventHandling:YES}});SC.Touch=function(touch,touchContext){this.touchContext=touchContext;
this.identifier=touch.identifier;var target=touch.target,targetView;if(target&&SC.$(target).hasClass("touch-intercept")){touch.target.style.webkitTransform="translate3d(0px,-5000px,0px)";
target=document.elementFromPoint(touch.pageX,touch.pageY);if(target){targetView=SC.$(target).view()[0]
}this.hidesTouchIntercept=NO;if(target.tagName==="INPUT"){this.hidesTouchIntercept=touch.target
}else{touch.target.style.webkitTransform="translate3d(0px,0px,0px)"}}else{targetView=touch.target?SC.$(touch.target).view()[0]:null
}this.targetView=targetView;this.target=target;this.hasEnded=NO;this.type=touch.type;
this.clickCount=1;this.view=undefined;this.touchResponder=this.nextTouchResponder=undefined;
this.touchResponders=[];this.startX=this.pageX=touch.pageX;this.startY=this.pageY=touch.pageY;
this.clientX=touch.clientX;this.clientY=touch.clientY;this.screenX=touch.screenX;
this.screenY=touch.screenY};SC.Touch.prototype={unhideTouchIntercept:function(){var intercept=this.hidesTouchIntercept;
if(intercept){setTimeout(function(){intercept.style.webkitTransform="translate3d(0px,0px,0px)"
},500)}},allowDefault:function(){if(this.event){this.event.hasCustomEventHandling=YES
}},preventDefault:function(){if(this.event){this.event.preventDefault()}},stopPropagation:function(){if(this.event){this.event.stopPropagation()
}},stop:function(){if(this.event){this.event.stop()}},end:function(){this.touchContext.endTouch(this)
},makeTouchResponder:function(responder,shouldStack,upViewChain){this.touchContext.makeTouchResponder(this,responder,shouldStack,upViewChain)
},captureTouch:function(startingPoint,shouldStack){this.touchContext.captureTouch(this,startingPoint,shouldStack)
},touchesForView:function(view){return this.touchContext.touchesForView(view)},touchesForResponder:function(responder){return this.touchContext.touchesForView(responder)
},averagedTouchesForView:function(view,addSelf){return this.touchContext.averagedTouchesForView(view,(addSelf?this:null))
}};SC.mixin(SC.Touch,{create:function(touch,touchContext){return new SC.Touch(touch,touchContext)
}});SC.ready(SC.RootResponder,SC.RootResponder.ready=function(){var r;r=SC.RootResponder.responder=SC.RootResponder.create();
r.setup()});sc_require("system/core_query");sc_require("system/ready");sc_require("system/root_responder");
sc_require("system/platform");SC.PORTRAIT_ORIENTATION="portrait";SC.LANDSCAPE_ORIENTATION="landscape";
SC.NO_ORIENTATION="desktop";SC.device=SC.Object.create({orientation:SC.NO_ORIENTATION,isOffline:NO,mouseLocation:function(){var responder=SC.RootResponder.responder,lastX=responder._lastMoveX,lastY=responder._lastMoveY;
if(SC.empty(lastX)||SC.empty(lastY)){return null}return{x:lastX,y:lastY}}.property(),init:function(){arguments.callee.base.apply(this,arguments);
if(navigator&&navigator.onLine===false){this.set("isOffline",YES)}},setup:function(){var responder=SC.RootResponder.responder;
responder.listenFor("online offline".w(),window,this);this.orientationHandlingShouldChange()
},orientationHandlingShouldChange:function(){if(SC.platform.windowSizeDeterminesOrientation){SC.Event.remove(window,"orientationchange",this,this.orientationchange);
this.windowSizeDidChange(SC.RootResponder.responder.get("currentWindowSize"))}else{if(SC.platform.supportsOrientationChange){SC.Event.add(window,"orientationchange",this,this.orientationchange);
this.orientationchange()}}},windowSizeDidChange:function(newSize){if(SC.platform.windowSizeDeterminesOrientation){if(!SC.browser.iOS){SC.run(function(){if(SC.platform.touch){if(newSize.height>=newSize.width){SC.device.set("orientation",SC.PORTRAIT_ORIENTATION)
}else{SC.device.set("orientation",SC.LANDSCAPE_ORIENTATION)}}else{SC.device.set("orientation",SC.NO_ORIENTATION)
}})}else{SC.run(function(){if(newSize.width===window.screen.width){SC.device.set("orientation",SC.PORTRAIT_ORIENTATION)
}else{SC.device.set("orientation",SC.LANDSCAPE_ORIENTATION)}})}return YES}return NO
},orientationchange:function(evt){SC.run(function(){if(window.orientation===0||window.orientation===180){SC.device.set("orientation",SC.PORTRAIT_ORIENTATION)
}else{SC.device.set("orientation",SC.LANDSCAPE_ORIENTATION)}})},orientationObserver:function(){var body=SC.$(document.body),orientation=this.get("orientation");
if(orientation===SC.PORTRAIT_ORIENTATION){body.addClass("portrait")}else{body.removeClass("portrait")
}if(orientation===SC.LANDSCAPE_ORIENTATION){body.addClass("landscape")}else{body.removeClass("landscape")
}}.observes("orientation"),online:function(evt){this.set("isOffline",NO)},offline:function(evt){this.set("isOffline",YES)
}});SC.ready(function(){SC.device.setup()});SC.json={encode:function(root){return JSON.stringify(root)
},decode:function(root){return JSON.parse(root)}};if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;
i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space
}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)
}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")
}}}());SC.Page=SC.Object.extend({owner:null,get:function(key){var value=this[key];
if(value&&value.isClass){this[key]=value=value.create({page:this});if(!this.get("inDesignMode")){value.awake()
}return value}else{return arguments.callee.base.apply(this,arguments)}},awake:function(){var value,key;
for(key in this){if(!this.hasOwnProperty(key)){continue}value=this[key];if(value&&value.isViewClass){this[key]=value=value.create({page:this})
}}return this},getIfConfigured:function(key){var ret=this[key];return(ret&&ret.isViewClass)?null:this.get(key)
},loc:function(locs){var view,key;for(key in locs){if(!locs.hasOwnProperty(key)){continue
}view=this[key];if(!view||!view.isViewClass){continue}view.loc(locs[key])}return this
}});SC.Page.design=SC.Page.create;SC.Page.localization=function(attrs){return attrs
};sc_require("system/builder");SC.MODE_REPLACE="replace";SC.MODE_APPEND="append";
SC.MODE_PREPEND="prepend";SC.NON_PIXEL_PROPERTIES="zIndex fontWeight opacity".w();
SC.COMBO_STYLES={WebkitTransition:"WebkitTransitionProperty WebkitTransitionDuration WebkitTransitionDelay WebkitTransitionTimingFunction".w()};
SC.RenderContext=SC.Builder.create({SELF_CLOSING:SC.CoreSet.create().addEach("area base basefront br hr input img link meta".w()),init:function(tagNameOrElement,prevContext){var strings,tagNameOrElementIsString;
if(prevContext){this.prevObject=prevContext;this.strings=prevContext.strings;this.offset=prevContext.length+prevContext.offset
}if(!this.strings){this.strings=[]}if(tagNameOrElement===undefined){tagNameOrElement="div";
tagNameOrElementIsString=YES}else{if(tagNameOrElement==="div"||tagNameOrElement==="label"||tagNameOrElement==="a"){tagNameOrElementIsString=YES
}else{if(SC.typeOf(tagNameOrElement)===SC.T_STRING){tagNameOrElement=tagNameOrElement.toLowerCase();
tagNameOrElementIsString=YES}}}if(tagNameOrElementIsString){this._tagName=tagNameOrElement;
this._needsTag=YES;this.needsContent=YES;var c=this;while(c){c.length++;c=c.prevObject
}this.strings.push(null);this._selfClosing=this.SELF_CLOSING.contains(tagNameOrElement)
}else{this._elem=tagNameOrElement;this._needsTag=NO;this.length=0;this.needsContent=NO
}return this},strings:null,offset:0,length:0,updateMode:SC.MODE_REPLACE,needsContent:NO,get:function(idx){var strings=this.strings||[];
return(idx===undefined)?strings.slice(this.offset,this.length):strings[idx+this.offset]
},push:function(line){var strings=this.strings,len=arguments.length;if(!strings){this.strings=strings=[]
}if(len>1){strings.push.apply(strings,arguments)}else{strings.push(line)}var c=this;
while(c){c.length+=len;c=c.prevObject}this.needsContent=YES;return this},text:function(line){var len=arguments.length,idx=0;
for(idx=0;idx<len;idx++){this.push(SC.RenderContext.escapeHTML(arguments[idx]))}return this
},join:function(joinChar){if(this._needsTag){this.end()}var strings=this.strings;
return strings?strings.join(joinChar||""):""},begin:function(tagNameOrElement){return SC.RenderContext(tagNameOrElement,this)
},element:function(){if(this._elem){return this._elem}var K=SC.RenderContext,factory=K.factory,ret,child;
if(!factory){factory=K.factory=document.createElement("div")}factory.innerHTML=this.join();
if(SC.browser.msie){if(factory.innerHTML.length>0){child=factory.firstChild.cloneNode(true);
factory.innerHTML=""}else{child=null}}else{child=factory.firstChild}return child},remove:function(elementId){if(!elementId){return
}var el,elem=this._elem;if(!elem||!elem.removeChild){return}el=document.getElementById(elementId);
if(el){el=elem.removeChild(el);el=null}},update:function(){var elem=this._elem,mode=this.updateMode,cq,key,value,attr,styles,factory,cur,next,before;
this._innerHTMLReplaced=NO;if(!elem){return}cq=this.$();if(this.length>0){this._innerHTMLReplaced=YES;
if(mode===SC.MODE_REPLACE){cq.html(this.join())}else{factory=elem.cloneNode(false);
factory.innerHTML=this.join();before=(mode===SC.MODE_APPEND)?null:elem.firstChild;
cur=factory.firstChild;while(cur){next=cur.nextSibling;elem.insertBefore(cur,next);
cur=next}cur=next=factory=before=null}}if(this._idDidChange&&(value=this._id)){cq.attr("id",value)
}jQuery.Buffer.flush();elem=this._elem=null;return this.prevObject||this},_DEFAULT_ATTRS:{},_TAG_ARRAY:[],_JOIN_ARRAY:[],_STYLE_PAIR_ARRAY:[],end:function(){var tag=this._TAG_ARRAY,pair,joined,key,value,attrs=this._attrs,className=this._classNames,id=this._id,styles=this._styles;
tag[0]="<";tag[1]=this._tagName;if(attrs||className||styles||id){if(!attrs){attrs=this._DEFAULT_ATTRS
}if(id){attrs.id=id}if(className){attrs["class"]=className.join(" ")}if(styles){joined=this._JOIN_ARRAY;
pair=this._STYLE_PAIR_ARRAY;for(key in styles){if(!styles.hasOwnProperty(key)){continue
}value=styles[key];if(value===null){continue}if(typeof value===SC.T_NUMBER&&!SC.NON_PIXEL_PROPERTIES.contains(key)){value+="px"
}pair[0]=this._dasherizeStyleName(key);pair[1]=value;joined.push(pair.join(": "))
}attrs.style=joined.join("; ");joined.length=0}tag.push(" ");for(key in attrs){if(!attrs.hasOwnProperty(key)){continue
}value=attrs[key];if(value===null){continue}tag.push(key,'="',value,'" ')}if(attrs===this._DEFAULT_ATTRS){delete attrs.style;
delete attrs["class"];delete attrs.id}}var strings=this.strings;var selfClosing=(this._selfClosing===NO)?NO:(this.length===1);
tag.push(selfClosing?" />":">");strings[this.offset]=tag.join("");tag.length=0;if(!selfClosing){tag[0]="</";
tag[1]=this._tagName;tag[2]=">";strings.push(tag.join(""));var c=this;while(c){c.length++;
c=c.prevObject}tag.length=0}this._elem=null;return this.prevObject||this},tag:function(tagName,opts){return this.begin(tagName,opts).end()
},tagName:function(tagName){if(tagName===undefined){if(!this._tagName&&this._elem){this._tagName=this._elem.tagName
}return this._tagName}else{this._tagName=tagName;this._tagNameDidChange=YES;return this
}},id:function(idName){if(idName===undefined){if(!this._id&&this._elem){this._id=this._elem.id
}return this._id}else{this._id=idName;this._idDidChange=YES;return this}},classNames:function(classNames,cloneOnModify){if(this._elem){if(classNames){this.$().resetClassNames().addClass(classNames);
return this}else{return this.$().attr("class").split(" ")}}if(classNames===undefined){if(this._cloneClassNames){this._classNames=(this._classNames||[]).slice();
this._cloneClassNames=NO}if(!this._classNames){this._classNames=[]}return this._classNames
}else{this._classNames=classNames;this._cloneClassNames=cloneOnModify||NO;this._classNamesDidChange=YES;
return this}},hasClass:function(className){if(this._elem){return this.$().hasClass(className)
}return this.classNames().indexOf(className)>=0},addClass:function(nameOrClasses){if(nameOrClasses===undefined||nameOrClasses===null){SC.Logger.warn("You are adding an undefined or empty class"+this.toString());
return this}if(this._elem){if(SC.typeOf(nameOrClasses)===SC.T_STRING){this.$().addClass(nameOrClasses)
}else{var idx,len=nameOrClasses.length;for(idx=0;idx<len;idx++){this.$().addClass(nameOrClasses[idx])
}}return this}var classNames=this.classNames();if(SC.typeOf(nameOrClasses)===SC.T_STRING){if(classNames.indexOf(nameOrClasses)<0){classNames.push(nameOrClasses);
this._classNamesDidChange=YES}}else{for(var i=0,iLen=nameOrClasses.length;i<iLen;
i++){var cl=nameOrClasses[i];if(classNames.indexOf(cl)<0){classNames.push(cl);this._classNamesDidChange=YES
}}}return this},removeClass:function(className){if(this._elem){this.$().removeClass(className);
return this}var classNames=this._classNames,idx;if(classNames&&(idx=classNames.indexOf(className))>=0){if(this._cloneClassNames){classNames=this._classNames=classNames.slice();
this._cloneClassNames=NO}classNames[idx]=null;this._classNamesDidChange=YES}return this
},resetClassNames:function(){if(this._elem){this.$().resetClassNames();return this
}this._classNames=[];this._classNamesDidChange=YES;return this},setClass:function(className,shouldAdd){if(this._elem){this.$().setClass(className,shouldAdd);
return this}var classNames,idx,key,didChange;if(shouldAdd!==undefined){return shouldAdd?this.addClass(className):this.removeClass(className)
}else{classNames=this._classNames;if(!classNames){classNames=this._classNames=[]}if(this._cloneClassNames){classNames=this._classNames=classNames.slice();
this._cloneClassNames=NO}didChange=NO;for(key in className){if(!className.hasOwnProperty(key)){continue
}idx=classNames.indexOf(key);if(className[key]){if(idx<0){classNames.push(key);didChange=YES
}}else{if(idx>=0){classNames[idx]=null;didChange=YES}}}if(didChange){this._classNamesDidChange=YES
}}return this},_STYLE_REGEX:/-?\s*([^:\s]+)\s*:\s*([^;]+)\s*;?/g,styles:function(styles,cloneOnModify){if(this._elem){if(styles){this.$().resetStyles().css(styles)
}return this.$().styles()}var attr,regex,match;if(styles===undefined){if(!this._styles&&this._elem){attr=this.$().attr("style");
if(attr&&(attr=attr.toString()).length>0){if(SC.browser.msie){attr=attr.toLowerCase()
}styles={};regex=this._STYLE_REGEX;regex.lastIndex=0;while(match=regex.exec(attr)){styles[this._camelizeStyleName(match[1])]=match[2]
}this._styles=styles;this._cloneStyles=NO}else{this._styles={}}}else{if(!this._styles){this._styles={}
}else{if(this._cloneStyles){this._styles=SC.clone(this._styles);this._cloneStyles=NO
}}}return this._styles}else{this._styles=styles;this._cloneStyles=cloneOnModify||NO;
this._stylesDidChange=YES;return this}},_deleteComboStyles:function(styles,key){var comboStyles=SC.COMBO_STYLES[key],didChange=NO;
if(comboStyles){var idx;for(idx=0;idx<comboStyles.length;idx++){if(styles[comboStyles[idx]]){delete styles[comboStyles[idx]];
didChange=YES}}}return didChange},resetStyles:function(){this.styles({});return this
},addStyle:function(nameOrStyles,value){if(this._elem){this.$().css(nameOrStyles,value);
return this}var key,didChange=NO,styles=this.styles();if(typeof nameOrStyles===SC.T_STRING){if(value===undefined){return styles[nameOrStyles]
}else{didChange=this._deleteComboStyles(styles,nameOrStyles);if(styles[nameOrStyles]!==value){styles[nameOrStyles]=value;
didChange=YES}if(didChange){this._stylesDidChange=YES}}}else{for(key in nameOrStyles){if(!nameOrStyles.hasOwnProperty(key)){continue
}didChange=didChange||this._deleteComboStyles(styles,key);value=nameOrStyles[key];
if(styles[key]!==value){styles[key]=value;didChange=YES}}if(didChange){this._stylesDidChange=YES
}}return this},removeStyle:function(styleName){if(this._elem){this.$().css(styleName,null);
return this}if(!this._styles){return this}var styles=this.styles();if(styles[styleName]){styles[styleName]=null;
this._stylesDidChange=YES}},attr:function(nameOrAttrs,value){if(this._elem){this.$().attr(nameOrAttrs,value);
return this}var key,attrs=this._attrs,didChange=NO;if(!attrs){this._attrs=attrs={}
}if(typeof nameOrAttrs===SC.T_STRING){if(value===undefined){return attrs[nameOrAttrs]
}else{if(attrs[nameOrAttrs]!==value){attrs[nameOrAttrs]=value;this._attrsDidChange=YES
}}}else{for(key in nameOrAttrs){if(!nameOrAttrs.hasOwnProperty(key)){continue}value=nameOrAttrs[key];
if(attrs[key]!==value){attrs[key]=value;didChange=YES}}if(didChange){this._attrsDidChange=YES
}}return this},$:function(sel){var ret,elem=this._elem;ret=!elem?SC.$.buffer([]):(sel===undefined)?SC.$.buffer(elem):SC.$.buffer(sel,elem);
elem=null;return ret},_camelizeStyleName:function(name){var needsCap=name.match(/^-(webkit|moz|o)-/),camelized=name.camelize();
if(needsCap){return camelized.substr(0,1).toUpperCase()+camelized.substr(1)}else{return camelized
}},_dasherizeStyleName:function(name){var dasherized=name.dasherize();if(dasherized.match(/^(webkit|moz|ms|o)-/)){dasherized="-"+dasherized
}return dasherized}});SC.RenderContext.fn.html=SC.RenderContext.fn.push;SC.RenderContext.fn.css=SC.RenderContext.fn.addStyle;
if(!SC.browser.isSafari||parseInt(SC.browser.version,10)<526){SC.RenderContext._safari3=YES
}SC.RenderContext.escapeHTML=function(text){var elem,node,ret;if(SC.none(text)){return text
}elem=this.escapeHTMLElement;if(!elem){elem=this.escapeHTMLElement=document.createElement("div")
}node=this.escapeTextNode;if(!node){node=this.escapeTextNode=document.createTextNode("");
elem.appendChild(node)}node.data=text;ret=elem.innerHTML;if(SC.RenderContext._safari3){ret=ret.replace(/>/g,"&gt;")
}node=elem=null;return ret};SC.SelectionSet=SC.Object.extend(SC.Enumerable,SC.Freezable,SC.Copyable,{isSelectionSet:YES,length:function(){var ret=0,sets=this._sets,objects=this._objects;
if(objects){ret+=objects.get("length")}if(sets){sets.forEach(function(s){ret+=s.get("length")
})}return ret}.property().cacheable(),sources:function(){var ret=[],sets=this._sets,len=sets?sets.length:0,idx,set,source;
for(idx=0;idx<len;idx++){set=sets[idx];if(set&&set.get("length")>0&&set.source){ret.push(set.source)
}}return ret}.property().cacheable(),indexSetForSource:function(source){if(!source||!source.isSCArray){return null
}var cache=this._indexSetCache,objects=this._objects,ret,idx;if(!cache){cache=this._indexSetCache={}
}ret=cache[SC.guidFor(source)];if(ret&&ret._sourceRevision&&(ret._sourceRevision!==source.propertyRevision)){ret=null
}if(!ret){ret=this._indexSetForSource(source,NO);if(ret&&ret.get("length")===0){ret=null
}if(objects){if(ret){ret=ret.copy()}objects.forEach(function(o){if((idx=source.indexOf(o))>=0){if(!ret){ret=SC.IndexSet.create()
}ret.add(idx)}},this)}if(ret){ret=cache[SC.guidFor(source)]=ret.frozenCopy();ret._sourceRevision=source.propertyRevision
}}return ret},_indexSetForSource:function(source,canCreate){if(canCreate===undefined){canCreate=YES
}var guid=SC.guidFor(source),index=this[guid],sets=this._sets,len=sets?sets.length:0,ret=null;
if(index>=len){index=null}if(SC.none(index)){if(canCreate&&!this.isFrozen){this.propertyWillChange("sources");
if(!sets){sets=this._sets=[]}ret=sets[len]=SC.IndexSet.create();ret.source=source;
this[guid]=len;this.propertyDidChange("sources")}}else{ret=sets?sets[index]:null}return ret
},add:function(source,start,length){if(this.isFrozen){throw SC.FROZEN_ERROR}var sets,len,idx,set,oldlen,newlen,setlen,objects;
if(start===undefined&&length===undefined){if(!source){throw"Must pass params to SC.SelectionSet.add()"
}if(source.isIndexSet){return this.add(source.source,source)}if(source.isSelectionSet){sets=source._sets;
objects=source._objects;len=sets?sets.length:0;this.beginPropertyChanges();for(idx=0;
idx<len;idx++){set=sets[idx];if(set&&set.get("length")>0){this.add(set.source,set)
}}if(objects){this.addObjects(objects)}this.endPropertyChanges();return this}}set=this._indexSetForSource(source,YES);
oldlen=this.get("length");setlen=set.get("length");newlen=oldlen-setlen;set.add(start,length);
this._indexSetCache=null;newlen+=set.get("length");if(newlen!==oldlen){this.propertyDidChange("length");
this.enumerableContentDidChange();if(setlen===0){this.notifyPropertyChange("sources")
}}return this},remove:function(source,start,length){if(this.isFrozen){throw SC.FROZEN_ERROR
}var sets,len,idx,set,oldlen,newlen,setlen,objects;if(start===undefined&&length===undefined){if(!source){throw"Must pass params to SC.SelectionSet.remove()"
}if(source.isIndexSet){return this.remove(source.source,source)}if(source.isSelectionSet){sets=source._sets;
objects=source._objects;len=sets?sets.length:0;this.beginPropertyChanges();for(idx=0;
idx<len;idx++){set=sets[idx];if(set&&set.get("length")>0){this.remove(set.source,set)
}}if(objects){this.removeObjects(objects)}this.endPropertyChanges();return this}}set=this._indexSetForSource(source,YES);
oldlen=this.get("length");newlen=oldlen-set.get("length");if(set&&(objects=this._objects)){if(length!==undefined){start=SC.IndexSet.create(start,length);
length=undefined}objects.forEach(function(object){idx=source.indexOf(object);if(start.contains(idx)){objects.remove(object);
newlen--}},this)}set.remove(start,length);setlen=set.get("length");newlen+=setlen;
this._indexSetCache=null;if(newlen!==oldlen){this.propertyDidChange("length");this.enumerableContentDidChange();
if(setlen===0){this.notifyPropertyChange("sources")}}return this},contains:function(source,start,length){if(start===undefined&&length===undefined){return this.containsObject(source)
}var set=this.indexSetForSource(source);if(!set){return NO}return set.contains(start,length)
},intersects:function(source,start,length){var set=this.indexSetForSource(source,NO);
if(!set){return NO}return set.intersects(start,length)},_TMP_ARY:[],addObject:function(object){var ary=this._TMP_ARY,ret;
ary[0]=object;ret=this.addObjects(ary);ary.length=0;return ret},addObjects:function(objects){var cur=this._objects,oldlen,newlen;
if(!cur){cur=this._objects=SC.CoreSet.create()}oldlen=cur.get("length");cur.addEach(objects);
newlen=cur.get("length");this._indexSetCache=null;if(newlen!==oldlen){this.propertyDidChange("length");
this.enumerableContentDidChange()}return this},removeObject:function(object){var ary=this._TMP_ARY,ret;
ary[0]=object;ret=this.removeObjects(ary);ary.length=0;return ret},removeObjects:function(objects){var cur=this._objects,oldlen,newlen,sets;
if(!cur){return this}oldlen=cur.get("length");cur.removeEach(objects);newlen=cur.get("length");
if(sets=this._sets){sets.forEach(function(set){oldlen+=set.get("length");set.removeObjects(objects);
newlen+=set.get("length")},this)}this._indexSetCache=null;if(newlen!==oldlen){this.propertyDidChange("length");
this.enumerableContentDidChange()}return this},containsObject:function(object){var objects=this._objects;
if(objects&&objects.contains(object)){return YES}var sets=this._sets,len=sets?sets.length:0,idx,set;
for(idx=0;idx<len;idx++){set=sets[idx];if(set&&set.indexOf(object)>=0){return YES
}}return NO},constrain:function(source){var set,len,max,objects;this.beginPropertyChanges();
this.get("sources").forEach(function(cur){if(cur===source){return}var set=this._indexSetForSource(source,NO);
if(set){this.remove(source,set)}},this);set=this._indexSetForSource(source,NO);if(set&&((max=set.get("max"))>(len=source.get("length")))){this.remove(source,len,max-len)
}if(objects=this._objects){objects.forEach(function(cur){if(source.indexOf(cur)<0){this.removeObject(cur)
}},this)}this.endPropertyChanges();return this},isEqual:function(obj){var left,right,idx,len,sources,source;
if(!obj||!obj.isSelectionSet){return NO}if(obj===this){return YES}if((this._sets===obj._sets)&&(this._objects===obj._objects)){return YES
}if(this.get("length")!==obj.get("length")){return NO}left=this._objects;right=obj._objects;
if(left||right){if((left?left.get("length"):0)!==(right?right.get("length"):0)){return NO
}if(left&&!left.isEqual(right)){return NO}}sources=this.get("sources");len=sources.get("length");
for(idx=0;idx<len;idx++){source=sources.objectAt(idx);left=this._indexSetForSource(source,NO);
right=this._indexSetForSource(source,NO);if(!!right!==!!left){return NO}if(left&&!left.isEqual(right)){return NO
}}return YES},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}if(this._sets){this._sets.length=0
}if(this._objects){this._objects=null}this._indexSetCache=null;this.propertyDidChange("length");
this.enumerableContentDidChange();this.notifyPropertyChange("sources");return this
},copy:function(){var ret=this.constructor.create(),sets=this._sets,len=sets?sets.length:0,idx,set;
if(sets&&len>0){sets=ret._sets=sets.slice();for(idx=0;idx<len;idx++){if(!(set=sets[idx])){continue
}set=sets[idx]=set.copy();ret[SC.guidFor(set.source)]=idx}}if(this._objects){ret._objects=this._objects.copy()
}return ret},freeze:function(){if(this.get("isFrozen")){return this}var sets=this._sets,loc=sets?sets.length:0,set;
while(--loc>=0){set=sets[loc];if(set){set.freeze()}}if(this._objects){this._objects.freeze()
}this.set("isFrozen",YES);return this},toString:function(){var sets=this._sets||[];
sets=sets.map(function(set){return set.toString().replace("SC.IndexSet",SC.guidFor(set.source))
},this);if(this._objects){sets.push(this._objects.toString())}return"SC.SelectionSet:%@<%@>".fmt(SC.guidFor(this),sets.join(","))
},firstObject:function(){var sets=this._sets,objects=this._objects;if(sets&&sets.get("length")>0){var set=sets?sets[0]:null,src=set?set.source:null,idx=set?set.firstObject():-1;
if(src&&idx>=0){return src.objectAt(idx)}}return objects?objects.firstObject():undefined
}.property(),nextObject:function(count,lastObject,context){var objects,ret;if(count===0){objects=context.objects=[];
this.forEach(function(o){objects.push(o)},this);context.max=objects.length}objects=context.objects;
ret=objects[count];if(count+1>=context.max){context.objects=context.max=null}return ret
},forEach:function(callback,target){var sets=this._sets,objects=this._objects,len=sets?sets.length:0,set,idx;
for(idx=0;idx<len;idx++){set=sets[idx];if(set){set.forEachObject(callback,target)
}}if(objects){objects.forEach(callback,target)}return this}});SC.SelectionSet.prototype.clone=SC.SelectionSet.prototype.copy;
SC.SelectionSet.EMPTY=SC.SelectionSet.create().freeze();sc_require("mixins/delegate_support");
SC.SparseArray=SC.Object.extend(SC.Observable,SC.Enumerable,SC.Array,SC.DelegateSupport,{_requestingLength:0,_requestingIndex:0,length:function(){var del=this.delegate;
if(del&&SC.none(this._length)&&del.sparseArrayDidRequestLength){this._requestingLength++;
del.sparseArrayDidRequestLength(this);this._requestingLength--}return this._length||0
}.property().cacheable(),provideLength:function(length){if(SC.none(length)){this._sa_content=null
}if(length!==this._length){this._length=length;if(this._requestingLength<=0){this.enumerableContentDidChange()
}}return this},rangeWindowSize:1,requestedRangeIndex:null,init:function(){arguments.callee.base.apply(this,arguments);
this.requestedRangeIndex=[];this._TMP_PROVIDE_ARRAY=[];this._TMP_PROVIDE_RANGE={length:1};
this._TMP_RANGE={}},objectAt:function(idx,omitMaterializing){var content=this._sa_content,ret;
if(!content){content=this._sa_content=[]}if((ret=content[idx])===undefined){if(!omitMaterializing){this.requestIndex(idx)
}ret=content[idx]}return ret},definedIndexes:function(indexes){var ret=SC.IndexSet.create(),content=this._sa_content,idx,len;
if(!content){return ret.freeze()}if(indexes){indexes.forEach(function(idx){if(content[idx]!==undefined){ret.add(idx)
}})}else{len=content.length;for(idx=0;idx<len;idx++){if(content[idx]!==undefined){ret.add(idx)
}}}return ret.freeze()},_TMP_RANGE:{},requestIndex:function(idx){var del=this.delegate;
if(!del){return this}var len=this.get("rangeWindowSize"),start=idx;if(len>1){start=start-Math.floor(start%len)
}if(len<1){len=1}this._requestingIndex++;if(del.sparseArrayDidRequestRange){var range=this._TMP_RANGE;
if(this.wasRangeRequested(start)===-1){range.start=start;range.length=len;this.requestedRangeIndex.push(start);
del.sparseArrayDidRequestRange(this,range)}}else{if(del.sparseArrayDidRequestIndex){while(--len>=0){del.sparseArrayDidRequestIndex(this,start+len)
}}}this._requestingIndex--;return this},wasRangeRequested:function(rangeStart){var i,ilen;
for(i=0,ilen=this.requestedRangeIndex.length;i<ilen;i++){if(this.requestedRangeIndex[i]===rangeStart){return i
}}return -1},rangeRequestCompleted:function(start){var i=this.wasRangeRequested(start);
if(i>=0){this.requestedRangeIndex.removeAt(i,1);return YES}return NO},provideObjectsInRange:function(range,array){var content=this._sa_content;
if(!content){content=this._sa_content=[]}var start=range.start,len=range.length;while(--len>=0){content[start+len]=array.objectAt(len)
}if(this._requestingIndex<=0){this.enumerableContentDidChange(range.start,range.length)
}return this},provideObjectAtIndex:function(index,object){var array=this._TMP_PROVIDE_ARRAY,range=this._TMP_PROVIDE_RANGE;
array[0]=object;range.start=index;return this.provideObjectsInRange(range,array)},objectsDidChangeInRange:function(range){var content=this._sa_content;
if(content){if(range.start===0&&SC.maxRange(range)>=content.length){this._sa_content=null
}else{var start=range.start,loc=Math.min(start+range.length,content.length);while(--loc>=start){content[loc]=undefined
}}}this.enumerableContentDidChange(range.start,range.length);return this},indexOf:function(obj){var del=this.delegate;
if(del&&del.sparseArrayDidRequestIndexOf){return del.sparseArrayDidRequestIndexOf(this,obj)
}else{var content=this._sa_content;if(!content){content=this._sa_content=[]}return content.indexOf(obj)
}},replace:function(idx,amt,objects){objects=objects||[];var del=this.delegate;if(del){if(!del.sparseArrayShouldReplace||!del.sparseArrayShouldReplace(this,idx,amt,objects)){return this
}}var content=this._sa_content;if(!content){content=this._sa_content=[]}content.replace(idx,amt,objects);
var len=objects?(objects.get?objects.get("length"):objects.length):0;var delta=len-amt;
if(!SC.none(this._length)){this.propertyWillChange("length");this._length+=delta;
this.propertyDidChange("length")}this.enumerableContentDidChange(idx,amt,delta);return this
},reset:function(){this._sa_content=null;this._length=null;this.enumerableContentDidChange();
this.invokeDelegateMethod(this.delegate,"sparseArrayDidReset",this);return this}});
SC.SparseArray.array=function(len){return this.create({_length:len||0})};SC.Timer=SC.Object.extend({target:null,action:null,isPooled:NO,interval:0,startTime:null,repeats:NO,until:null,isPaused:NO,isScheduled:NO,isValid:YES,lastFireTime:0,fireTime:function(){if(!this.get("isValid")){return -1
}var start=this.get("startTime");if(!start||start===0){return -1}var interval=this.get("interval"),last=this.get("lastFireTime");
if(last<start){last=start}var next;if(this.get("repeats")){if(interval===0){next=last
}else{next=start+(Math.floor((last-start)/interval)+1)*interval}}else{next=start+interval
}var until=this.get("until");if(until&&until>0&&next>until){next=until}return next
}.property("interval","startTime","repeats","until","isValid","lastFireTime").cacheable(),schedule:function(){if(!this.get("isValid")){return this
}this.beginPropertyChanges();if(!this.startTime){this.set("startTime",SC.RunLoop.currentRunLoop.get("startTime"))
}var next=this.get("fireTime"),last=this.get("lastFireTime");if(next>=last){this.set("isScheduled",YES);
SC.RunLoop.currentRunLoop.scheduleTimer(this,next)}this.endPropertyChanges();return this
},invalidate:function(){this.beginPropertyChanges();this.set("isValid",NO);SC.RunLoop.currentRunLoop.cancelTimer(this);
this.action=this.target=null;this.endPropertyChanges();if(this.get("isPooled")){SC.Timer.returnTimerToPool(this)
}return this},fire:function(){var last=Date.now();this.set("lastFireTime",last);var next=this.get("fireTime");
if(!this.get("isPaused")){this.performAction()}if(next>last){this.schedule()}else{this.invalidate()
}},performAction:function(){var typeOfAction=SC.typeOf(this.action);if(typeOfAction==SC.T_FUNCTION){this.action.call((this.target||this),this)
}else{if(typeOfAction===SC.T_STRING){if(this.action.indexOf(".")>=0){var path=this.action.split(".");
var property=path.pop();var target=SC.objectForPropertyPath(path,window);var action=target.get?target.get(property):target[property];
if(action&&SC.typeOf(action)==SC.T_FUNCTION){action.call(target,this)}else{throw"%@: Timer could not find a function at %@".fmt(this,this.action)
}}else{SC.RootResponder.responder.sendAction(this.action,this.target,this)}}}},init:function(){arguments.callee.base.apply(this,arguments);
if(this.startTime instanceof Date){this.startTime=this.startTime.getTime()}if(this.until instanceof Date){this.until=this.until.getTime()
}},RESET_DEFAULTS:{target:null,action:null,isPooled:NO,isPaused:NO,isScheduled:NO,isValid:YES,interval:0,repeats:NO,until:null,startTime:null,lastFireTime:0},reset:function(props){if(!props){props=SC.EMPTY_HASH
}this.propertyWillChange("fireTime");var defaults=this.RESET_DEFAULTS;for(var key in defaults){if(!defaults.hasOwnProperty(key)){continue
}this[key]=SC.none(props[key])?defaults[key]:props[key]}this.propertyDidChange("fireTime");
return this},removeFromTimerQueue:function(timerQueueRoot){var prev=this._timerQueuePrevious,next=this._timerQueueNext;
if(!prev&&!next&&timerQueueRoot!==this){return timerQueueRoot}if(prev){prev._timerQueueNext=next
}if(next){next._timerQueuePrevious=prev}this._timerQueuePrevious=this._timerQueueNext=null;
return(timerQueueRoot===this)?next:timerQueueRoot},scheduleInTimerQueue:function(timerQueueRoot,runTime){this._timerQueueRunTime=runTime;
var beforeNode=timerQueueRoot;var afterNode=null;while(beforeNode&&beforeNode._timerQueueRunTime<runTime){afterNode=beforeNode;
beforeNode=beforeNode._timerQueueNext}if(afterNode){afterNode._timerQueueNext=this;
this._timerQueuePrevious=afterNode}if(beforeNode){beforeNode._timerQueuePrevious=this;
this._timerQueueNext=beforeNode}return(beforeNode===timerQueueRoot)?this:timerQueueRoot
},collectExpiredTimers:function(timers,now){if(this._timerQueueRunTime>now){return this
}timers.push(this);var next=this._timerQueueNext;this._timerQueueNext=null;if(next){next._timerQueuePrevious=null
}return next?next.collectExpiredTimers(timers,now):null}});SC.Timer.schedule=function(props){var timer;
if(!props||SC.none(props.isPooled)||props.isPooled){timer=this.timerFromPool(props)
}else{timer=this.create(props)}return timer.schedule()};SC.Timer.timerFromPool=function(props){var timers=this._timerPool;
if(!timers){timers=this._timerPool=[]}var timer=timers.pop();if(!timer){timer=this.create()
}return timer.reset(props)};SC.Timer.returnTimerToPool=function(timer){if(!this._timerPool){this._timerPool=[]
}this._timerPool.push(timer);return this};sc_require("system/browser");SC.mixin({normalizeURL:function(url){if(url.slice(0,1)=="/"){url=window.location.protocol+"//"+window.location.host+url
}else{if((url.slice(0,5)=="http:")||(url.slice(0,6)=="https:")){}else{url=window.location.href+"/"+url
}}return url},isPercentage:function(val){return(val<1&&val>0)},minX:function(frame){return frame.x||0
},maxX:function(frame){return(frame.x||0)+(frame.width||0)},midX:function(frame){return(frame.x||0)+((frame.width||0)/2)
},minY:function(frame){return frame.y||0},maxY:function(frame){return(frame.y||0)+(frame.height||0)
},midY:function(frame){return(frame.y||0)+((frame.height||0)/2)},centerX:function(innerFrame,outerFrame){return(outerFrame.width-innerFrame.width)/2
},centerY:function(innerFrame,outerFrame){return(outerFrame.height-innerFrame.height)/2
},offset:function(elem,relativeToFlag){var userAgent,index,mobileBuildNumber,result;
relativeToFlag=relativeToFlag||"document";if(relativeToFlag==="parent"){result=jQuery(elem).position()
}else{result=jQuery(elem).offset();if(SC.browser.mobileSafari){userAgent=navigator.userAgent;
index=userAgent.indexOf("Mobile/");mobileBuildNumber=userAgent.substring(index+7,index+9);
if(parseInt(SC.browser.mobileSafari,0)<=532||(mobileBuildNumber<="8A")){result.left=result.left-window.pageXOffset;
result.top=result.top-window.pageYOffset}}if(relativeToFlag==="viewport"){result.left=result.left-window.pageXOffset;
result.top=result.top-window.pageYOffset}}return result},viewportOffset:function(el){console.warn("SC.viewportOffset() has been deprecated in favor of SC.offset().  Please use SC.offset() from here on.");
var result=SC.offset(el,"viewport");return{x:result.left,y:result.top}}});SC.mixin({ZERO_POINT:{x:0,y:0},pointInRect:function(point,f){return(point.x>=SC.minX(f))&&(point.y>=SC.minY(f))&&(point.x<=SC.maxX(f))&&(point.y<=SC.maxY(f))
},rectsEqual:function(r1,r2,delta){if(!r1||!r2){return(r1==r2)}if(!delta&&delta!==0){delta=0.1
}if((r1.y!=r2.y)&&(Math.abs(r1.y-r2.y)>delta)){return NO}if((r1.x!=r2.x)&&(Math.abs(r1.x-r2.x)>delta)){return NO
}if((r1.width!=r2.width)&&(Math.abs(r1.width-r2.width)>delta)){return NO}if((r1.height!=r2.height)&&(Math.abs(r1.height-r2.height)>delta)){return NO
}return YES},intersectRects:function(r1,r2){var ret={x:Math.max(SC.minX(r1),SC.minX(r2)),y:Math.max(SC.minY(r1),SC.minY(r2)),width:Math.min(SC.maxX(r1),SC.maxX(r2)),height:Math.min(SC.maxY(r1),SC.maxY(r2))};
ret.width=Math.max(0,ret.width-ret.x);ret.height=Math.max(0,ret.height-ret.y);return ret
},unionRects:function(r1,r2){var ret={x:Math.min(SC.minX(r1),SC.minX(r2)),y:Math.min(SC.minY(r1),SC.minY(r2)),width:Math.max(SC.maxX(r1),SC.maxX(r2)),height:Math.max(SC.maxY(r1),SC.maxY(r2))};
ret.width=Math.max(0,ret.width-ret.x);ret.height=Math.max(0,ret.height-ret.y);return ret
},cloneRect:function(r){return{x:r.x,y:r.y,width:r.width,height:r.height}},stringFromRect:function(r){if(!r){return"(null)"
}else{return"{x:"+r.x+", y:"+r.y+", width:"+r.width+", height:"+r.height+"}"}}});
sc_require("views/view/base");SC.TEMPLATES=SC.Object.create();SC.TemplateView=SC.CoreView.extend({acceptsFirstResponder:YES,templateName:null,templates:SC.TEMPLATES,template:function(){var templateName=this.get("templateName");
var template=this.get("templates").get(templateName);if(!template){if(templateName){SC.Logger.warn('%@ - Unable to find template "%@".'.fmt(this,templateName))
}return function(){return""}}return template}.property("templateName").cacheable(),context:function(){return this
}.property().cacheable(),render:function(context){var template=this.get("template");
this._didRenderChildViews=YES;context.push(template(this.get("context"),null,null,{view:this,isRenderData:true}))
},update:function(){},mouseDown:function(){if(this.mouseUp){return YES}return NO}});
SC.CheckboxSupport={didCreateLayer:function(){this.$("input").change(jQuery.proxy(function(){SC.RunLoop.begin();
this.notifyPropertyChange("value");SC.RunLoop.end()},this))},value:function(key,value){if(value!==undefined){this.$("input").attr("checked",value)
}else{value=this.$("input").attr("checked")}return value}.property().idempotent()};
sc_require("views/template");SC.TemplateCollectionView=SC.TemplateView.extend({tagName:"ul",content:null,template:SC.Handlebars.compile(""),emptyView:null,didCreateLayer:function(){if(this.get("content")){var indexSet=SC.IndexSet.create(0,this.getPath("content.length"));
this.arrayContentDidChange(this.get("content"),null,"[]",indexSet)}},itemView:"SC.TemplateView",itemViewClass:function(){var itemView=this.get("itemView");
var extensions={};if(SC.typeOf(itemView)===SC.T_STRING){itemView=SC.objectForPropertyPath(itemView)
}if(this.get("itemViewTemplate")){extensions.template=this.get("itemViewTemplate")
}if(this.get("tagName")==="ul"){extensions.tagname="li"}return itemView.extend(extensions)
}.property("itemView").cacheable(),contentDidChange:function(){this.removeAllChildren();
this.$().empty();this.didCreateLayer();this.get("content").addRangeObserver(null,this,this.arrayContentDidChange)
}.observes("content",".content.[]"),arrayContentDidChange:function(array,objects,key,indexes){var content=this.get("content"),itemViewClass=this.get("itemViewClass"),childViews=this.get("childViews"),toDestroy=[],toReuse=[],view,item,matchIndex,lastView,length,i;
emptyView=this.get("emptyView");if(emptyView){emptyView.$().remove();emptyView.removeFromParent()
}for(i=0,length=childViews.get("length");i<length;i++){view=childViews.objectAt(i);
if(content.contains(view.get("content"))){toReuse.push(view)}else{toDestroy.push(view)
}}for(i=0,length=toDestroy.length;i<length;i++){toDestroy[i].destroy()}childViews=[];
if(array.get("length")===0&&this.get("inverseTemplate")){view=this.createChildView(SC.TemplateView.extend({template:this.get("inverseTemplate"),content:this}));
this.set("emptyView",view);view.createLayer().$().appendTo(this.$())}var itemOptions=this.itemViewOptions||{};
for(i=0,length=array.get("length");i<length;i++){item=array.objectAt(i);view=toReuse.find(function(v){return v.get("content")===item
});if(!view){view=this.createChildView(itemViewClass.extend({content:item,tagName:"li",render:function(context){arguments.callee.base.apply(this,arguments);
SC.Handlebars.ViewHelper.applyAttributes(itemOptions,this,context)}}));view.createLayer().$().appendTo(this.$())
}childViews.push(view)}this.childViews=childViews}});SC.TextFieldSupport={value:function(key,value){if(value!==undefined){this.$("input").val(value)
}else{value=this.$("input").val()}return value}.property().idempotent(),didCreateLayer:function(){SC.Event.add(this.$("input"),"focus",this,this.focusIn);
SC.Event.add(this.$("input"),"blur",this,this.focusOut)},focusIn:function(event){this.becomeFirstResponder();
this.tryToPerform("focus",event)},focusOut:function(event){this.resignFirstResponder();
this.tryToPerform("blur",event)},keyUp:function(event){if(event.keyCode===13){return this.tryToPerform("insertNewline",event)
}else{if(event.keyCode===27){return this.tryToPerform("cancel",event)}}}};sc_require("views/view");
sc_require("views/view/animation");SC.CSS_TRANSFORM_MAP={rotate:function(val){return null
},rotateX:function(val){if(SC.typeOf(val)===SC.T_NUMBER){val+="deg"}return"rotateX("+val+")"
},rotateY:function(val){if(SC.typeOf(val)===SC.T_NUMBER){val+="deg"}return"rotateY("+val+")"
},rotateZ:function(val){if(SC.typeOf(val)===SC.T_NUMBER){val+="deg"}return"rotateZ("+val+")"
},scale:function(val){if(SC.typeOf(val)===SC.T_ARRAY){val=val.join(", ")}return"scale("+val+")"
}};SC.View.reopen({layoutStyleCalculator:null,layoutStyle:function(){var props={layout:this.get("layout"),turbo:this.get("hasAcceleratedLayer"),staticLayout:this.get("useStaticLayout")};
var calculator=this.get("layoutStyleCalculator");calculator.set(props);return calculator.calculate()
}.property().cacheable()});SC.View.LayoutStyleCalculator=SC.Object.extend({_layoutDidUpdate:function(){var layout=this.get("layout");
if(!layout){return}this.dims=SC._VIEW_DEFAULT_DIMS;this.loc=this.dims.length;var right=(this.right=layout.right);
this.hasRight=(right!=null);var left=(this.left=layout.left);this.hasLeft=(left!=null);
var top=(this.top=layout.top);this.hasTop=(top!=null);var bottom=(this.bottom=layout.bottom);
this.hasBottom=(bottom!=null);var width=(this.width=layout.width);this.hasWidth=(width!=null);
var height=(this.height=layout.height);this.hasHeight=(height!=null);this.minWidth=((layout.minWidth===undefined)?null:layout.minWidth);
var maxWidth=(this.maxWidth=(layout.maxWidth===undefined)?null:layout.maxWidth);this.hasMaxWidth=(maxWidth!=null);
this.minHeight=(layout.minHeight===undefined)?null:layout.minHeight;var maxHeight=(this.maxHeight=(layout.maxHeight===undefined)?null:layout.maxHeight);
this.hasMaxHeight=(maxHeight!=null);var centerX=(this.centerX=layout.centerX);this.hasCenterX=(centerX!=null);
var centerY=(this.centerY=layout.centerY);this.hasCenterY=(centerY!=null);var borderTop=(this.borderTop=((layout.borderTop!==undefined)?layout.borderTop:layout.border)||0);
var borderRight=(this.borderRight=((layout.borderRight!==undefined)?layout.borderRight:layout.border)||0);
var borderBottom=(this.borderBottom=((layout.borderBottom!==undefined)?layout.borderBottom:layout.border)||0);
var borderLeft=(this.borderLeft=((layout.borderLeft!==undefined)?layout.borderLeft:layout.border)||0);
this.zIndex=(layout.zIndex!=null)?layout.zIndex.toString():null;this.opacity=(layout.opacity!=null)?layout.opacity.toString():null;
this.backgroundPosition=(layout.backgroundPosition!=null)?layout.backgroundPosition:null;
this.ret={marginTop:null,marginLeft:null}}.observes("layout"),_invalidAutoValue:function(property){var error=SC.Error.desc("%@.layout() you cannot use %@:auto if staticLayout is disabled".fmt(this.get("view"),property),"%@".fmt(this.get("view")),-1);
SC.Logger.error(error.toString());throw error},_handleMistakes:function(){var layout=this.get("layout");
if(!this.staticLayout){if(this.width===SC.LAYOUT_AUTO){this._invalidAutoValue("width")
}if(this.height===SC.LAYOUT_AUTO){this._invalidAutoValue("height")}}if(SC.platform.supportsCSSTransforms){var animations=layout.animate,transformAnimationDuration,key;
if(animations){for(key in animations){if(SC.CSS_TRANSFORM_MAP[key]){if(this._pendingAnimations&&this._pendingAnimations["-"+SC.platform.cssPrefix+"-transform"]){throw"Animations of transforms must be executed simultaneously!"
}if(transformAnimationDuration&&animations[key].duration!==transformAnimationDuration){SC.Logger.warn("Can't animate transforms with different durations! Using first duration specified.");
animations[key].duration=transformAnimationDuration}transformAnimationDuration=animations[key].duration
}}}}},_calculatePosition:function(direction){var translate=null,turbo=this.get("turbo"),ret=this.ret;
var start,finish,size,maxSize,margin,hasStart,hasFinish,hasSize,hasMaxSize,startBorderVal,finishBorder,sizeNum;
if(direction==="x"){start="left";finish="right";size="width";maxSize="maxWidth";margin="marginLeft";
startBorder="borderLeft";finishBorder="borderRight";hasStart=this.hasLeft;hasFinish=this.hasRight;
hasSize=this.hasWidth;hasMaxSize=this.hasMaxWidth}else{start="top";finish="bottom";
size="height";maxSize="maxHeight";margin="marginTop";startBorder="borderTop";finishBorder="borderBottom";
hasStart=this.hasTop;hasFinish=this.hasBottom;hasSize=this.hasHeight;hasMaxSize=this.hasMaxHeight
}ret[start]=this._cssNumber(this[start]);ret[finish]=this._cssNumber(this[finish]);
startBorderVal=this._cssNumber(this[startBorder]);finishBorderVal=this._cssNumber(this[finishBorder]);
ret[startBorder+"Width"]=startBorderVal||null;ret[finishBorder+"Width"]=finishBorderVal||null;
sizeNum=this[size];if(sizeNum>=1){sizeNum-=(startBorderVal+finishBorderVal)}ret[size]=this._cssNumber(sizeNum);
if(hasStart){if(turbo){translate=ret[start];ret[start]=0}if(hasFinish&&hasSize){ret[finish]=null
}}else{if(!hasFinish||(hasFinish&&!hasSize&&!hasMaxSize)){ret[start]=0}}if(!hasSize&&!hasFinish){ret[finish]=0
}return translate},_calculateCenter:function(direction){var ret=this.ret,size,center,start,finish,margin,startBorderVal,finishBorderVal;
if(direction==="x"){size="width";center="centerX";start="left";finish="right";margin="marginLeft";
startBorder="borderLeft";finishBorder="borderRight"}else{size="height";center="centerY";
start="top";finish="bottom";margin="marginTop";startBorder="borderTop";finishBorder="borderBottom"
}ret[start]="50%";startBorderVal=this._cssNumber(this[startBorder]);finishBorderVal=this._cssNumber(this[finishBorder]);
ret[startBorder+"Width"]=startBorderVal||null;ret[finishBorder+"Width"]=finishBorderVal||null;
var sizeValue=this[size],centerValue=this[center],startValue=this[start];var sizeIsPercent=SC.isPercentage(sizeValue),centerIsPercent=SC.isPercentage(centerValue,YES);
if(sizeValue>1){sizeValue-=(startBorderVal+finishBorderVal)}if((sizeIsPercent&&centerIsPercent)||(!sizeIsPercent&&!centerIsPercent)){var value=centerValue-sizeValue/2;
ret[margin]=(sizeIsPercent)?Math.floor(value*100)+"%":Math.floor(value)}else{SC.Logger.warn("You have to set "+size+" and "+center+" using both percentages or pixels");
ret[margin]="50%"}ret[size]=this._cssNumber(sizeValue)||0;ret[finish]=null},_calculateTransforms:function(translateLeft,translateTop){if(SC.platform.supportsCSSTransforms){var layout=this.get("layout");
var transformAttribute=SC.platform.domCSSPrefix+"Transform";var transforms=[];if(this.turbo){transforms.push("translateX("+(translateLeft||0)+"px)","translateY("+(translateTop||0)+"px)");
if(SC.platform.supportsCSS3DTransforms){transforms.push("translateZ(0px)")}}var transformMap=SC.CSS_TRANSFORM_MAP;
for(var transformName in transformMap){var layoutTransform=layout[transformName];
if(layoutTransform!=null){transforms.push(transformMap[transformName](layoutTransform))
}}this.ret[transformAttribute]=transforms.length>0?transforms.join(" "):null}},_calculateAnimations:function(translateLeft,translateTop){var layout=this.layout,animations=layout.animate,key;
if(!animations){return}if(this.getPath("view.isAnimatable")){return}var transitions=[],animation;
this._animatedTransforms=[];if(!this._pendingAnimations){this._pendingAnimations={}
}var platformTransform="-"+SC.platform.cssPrefix+"-transform";if(SC.platform.supportsCSSTransitions){for(key in animations){animation=animations[key];
var isTransformProperty=SC.CSS_TRANSFORM_MAP[key];var isTurboProperty=(key==="top"&&translateTop!=null)||(key==="left"&&translateLeft!=null);
if(SC.platform.supportsCSSTransforms&&(isTurboProperty||isTransformProperty)){this._animatedTransforms.push(key);
key=platformTransform}animation.css=key+" "+animation.duration+"s "+animation.timing;
if(!this._pendingAnimations[key]){this._pendingAnimations[key]=animation;transitions.push(animation.css)
}}this.ret[SC.platform.domCSSPrefix+"Transition"]=transitions.join(", ")}else{for(key in animations){this._pendingAnimations[key]=animations[key]
}}delete layout.animate},_cssNumber:function(val){if(val==null){return null}else{if(val===SC.LAYOUT_AUTO){return SC.LAYOUT_AUTO
}else{if(SC.isPercentage(val)){return(val*100)+"%"}else{return Math.floor(val)}}}},calculate:function(){var layout=this.get("layout"),pdim=null,translateTop=null,translateLeft=null,turbo=this.get("turbo"),ret=this.ret,dims=this.dims,loc=this.loc,view=this.get("view"),key,value;
this._handleMistakes(layout);if(this.hasLeft||this.hasRight||!this.hasCenterX){translateLeft=this._calculatePosition("x")
}else{this._calculateCenter("x")}if(this.hasTop||this.hasBottom||!this.hasCenterY){translateTop=this._calculatePosition("y")
}else{this._calculateCenter("y")}ret.minWidth=this.minWidth;ret.maxWidth=this.maxWidth;
ret.minHeight=this.minHeight;ret.maxHeight=this.maxHeight;ret.zIndex=this.zIndex;
ret.opacity=this.opacity;ret.mozOpacity=this.opacity;ret.backgroundPosition=this.backgroundPosition;
this._calculateTransforms(translateLeft,translateTop);this._calculateAnimations(translateLeft,translateTop);
for(key in ret){value=ret[key];if(typeof value===SC.T_NUMBER){ret[key]=(value+"px")
}}return ret},willRenderAnimations:function(){if(SC.platform.supportsCSSTransitions){var view=this.get("view"),layer=view.get("layer"),currentStyle=layer?layer.style:null,newStyle=view.get("layoutStyle"),activeAnimations=this._activeAnimations,activeAnimation,pendingAnimations=this._pendingAnimations,pendingAnimation,animatedTransforms=this._animatedTransforms,transformsLength=animatedTransforms?animatedTransforms.length:0,transitionStyle=newStyle[SC.platform.domCSSPrefix+"Transition"],layout=view.get("layout"),key,callback,idx,shouldCancel;
if(pendingAnimations){if(!activeAnimations){activeAnimations={}}for(key in pendingAnimations){if(!pendingAnimations.hasOwnProperty(key)){continue
}pendingAnimation=pendingAnimations[key];activeAnimation=activeAnimations[key];shouldCancel=NO;
if(newStyle[key]!==(currentStyle?currentStyle[key]:null)){shouldCancel=YES}if(activeAnimation&&(activeAnimation.duration!==pendingAnimation.duration||activeAnimation.timing!==pendingAnimation.timing)){shouldCancel=YES
}if(shouldCancel&&activeAnimation){if(callback=activeAnimation.callback){if(transformsLength>0){for(idx=0;
idx<transformsLength;idx++){this.runAnimationCallback(callback,null,animatedTransforms[idx],YES)
}this._animatedTransforms=null}else{this.runAnimationCallback(callback,null,key,YES)
}}this.removeAnimationFromLayout(key,YES)}activeAnimations[key]=pendingAnimation}}this._activeAnimations=activeAnimations;
this._pendingAnimations=null}},didRenderAnimations:function(){if(!SC.platform.supportsCSSTransitions){var key,callback;
for(key in this._pendingAnimations){callback=this._pendingAnimations[key].callback;
if(callback){this.runAnimationCallback(callback,null,key,NO)}this.removeAnimationFromLayout(key,NO,YES)
}this._activeAnimations=this._pendingAnimations=null}},runAnimationCallback:function(callback,evt,propertyName,cancelled){var view=this.get("view");
if(callback){if(SC.typeOf(callback)!==SC.T_HASH){callback={action:callback}}callback.source=view;
if(!callback.target){callback.target=this}}SC.View.runCallback(callback,{event:evt,propertyName:propertyName,view:view,isCancelled:cancelled})
},transitionDidEnd:function(evt){var propertyName=evt.originalEvent.propertyName,animation,idx;
animation=this._activeAnimations?this._activeAnimations[propertyName]:null;if(animation){if(animation.callback){SC.RunLoop.begin();
if(this._animatedTransforms&&this._animatedTransforms.length>0){for(idx=0;idx<this._animatedTransforms.length;
idx++){this.invokeLater("runAnimationCallback",1,animation.callback,evt,this._animatedTransforms[idx],NO)
}}else{this.invokeLater("runAnimationCallback",1,animation.callback,evt,propertyName,NO)
}SC.RunLoop.end()}this.removeAnimationFromLayout(propertyName,YES)}},removeAnimationFromLayout:function(propertyName,updateStyle,isPending){if(updateStyle){var layer=this.getPath("view.layer"),updatedCSS=[],key;
for(key in this._activeAnimations){if(key!==propertyName){updatedCSS.push(this._activeAnimations[key].css)
}}if(layer){layer.style[SC.platform.domCSSPrefix+"Transition"]=updatedCSS.join(", ")
}}var layout=this.getPath("view.layout"),idx;if(propertyName==="-"+SC.platform.cssPrefix+"-transform"&&this._animatedTransforms&&this._animatedTransforms.length>0){for(idx=0;
idx<this._animatedTransforms.length;idx++){delete layout["animate"+this._animatedTransforms[idx].capitalize()]
}this._animatedTransforms=null}delete layout["animate"+propertyName.capitalize()];
if(!isPending){delete this._activeAnimations[propertyName]}}});SC.CoreView.runCallback=function(callback){var additionalArgs=SC.$A(arguments).slice(1),typeOfAction=SC.typeOf(callback.action);
if(typeOfAction==SC.T_FUNCTION){callback.action.apply(callback.target,additionalArgs)
}else{if(typeOfAction===SC.T_STRING){if(callback.action.indexOf(".")>=0){var path=callback.action.split(".");
var property=path.pop();var target=SC.objectForPropertyPath(path,window);var action=target.get?target.get(property):target[property];
if(action&&SC.typeOf(action)==SC.T_FUNCTION){action.apply(target,additionalArgs)}else{throw"SC.runCallback could not find a function at %@".fmt(callback.action)
}}}}};SC.View.runCallback=SC.CoreView.runCallback;sc_require("views/view");sc_require("views/view/layout_style");
SC.ANIMATABLE_PROPERTIES={top:YES,left:YES,bottom:YES,right:YES,width:YES,height:YES,centerX:YES,centerY:YES,opacity:YES,scale:YES,rotate:YES,rotateX:YES,rotateY:YES,rotateZ:YES};
SC.View.reopen({didCreateLayerMixin:function(){if(SC.platform.supportsCSSTransitions){this.resetAnimation()
}},animate:function(keyOrHash,valueOrOptions,optionsOrCallback,callback){var hash,options;
if(typeof keyOrHash===SC.T_STRING){hash={};hash[keyOrHash]=valueOrOptions;options=optionsOrCallback
}else{hash=keyOrHash;options=valueOrOptions;callback=optionsOrCallback}var optionsType=SC.typeOf(options);
if(optionsType===SC.T_NUMBER){options={duration:options}}else{if(optionsType!==SC.T_HASH){throw"Must provide options hash or duration!"
}}if(callback){options.callback=callback}var timing=options.timing;if(timing){if(typeof timing!==SC.T_STRING){options.timing="cubic-bezier("+timing[0]+", "+timing[1]+", "+timing[2]+", "+timing[3]+")"
}}else{options.timing="linear"}var layout=SC.clone(this.get("layout")),didChange=NO,value,cur,animValue,curAnim,key;
if(!layout.animate){layout.animate={}}for(key in hash){if(!hash.hasOwnProperty(key)||!SC.ANIMATABLE_PROPERTIES[key]){continue
}value=hash[key];cur=layout[key];curAnim=layout.animate[key];if(value==null){throw"Can only animate to an actual value!"
}if(cur!==value||(curAnim&&curAnim.duration!==options.duration)){didChange=YES;layout.animate[key]=options;
layout[key]=value}}if(didChange){this.set("layout",layout)}return this},resetAnimation:function(){var layout=this.get("layout"),animations=layout.animate,didChange=NO,key;
if(!animations){return}var hasAnimations;for(key in animations){didChange=YES;delete animations[key]
}if(didChange){this.set("layout",layout);this.notifyPropertyChange("layout")}return this
},transitionDidEnd:function(evt){this.get("layoutStyleCalculator").transitionDidEnd(evt)
},wantsAcceleratedLayer:NO,hasAcceleratedLayer:function(){if(this.get("wantsAcceleratedLayer")&&SC.platform.supportsAcceleratedLayers){var layout=this.get("layout"),animations=layout.animate,AUTO=SC.LAYOUT_AUTO,key;
if(animations&&(animations.top||animations.left)){for(key in animations){if(SC.CSS_TRANSFORM_MAP[key]&&((animations.top&&animations.top.duration!==animations[key].duration)||(animations.left&&animations.left.duration!==animations[key].duration))){return NO
}}}if(layout.left!=null&&!SC.isPercentage(layout.left)&&layout.left!==AUTO&&layout.top!=null&&!SC.isPercentage(layout.top)&&layout.top!==AUTO&&layout.width!=null&&!SC.isPercentage(layout.width)&&layout.width!==AUTO&&layout.height!=null&&!SC.isPercentage(layout.height)&&layout.height!==AUTO){return YES
}}return NO}.property("wantsAcceleratedLayer").cacheable()});sc_require("views/view");
SC.View.reopen({cursor:function(key,value){var parent;if(value){this._setCursor=value
}if(this._setCursor!==undefined){return this._setCursor}parent=this.get("parentView");
if(this.get("shouldInheritCursor")&&parent){return parent.get("cursor")}return null
}.property("parentView","shouldInheritCursor").cacheable(),applyAttributesToContext:function(original,context){var cursor=this.get("cursor");
if(cursor){context.addClass(cursor.get("className"))}original(context)}.enhance(),shouldInheritCursor:YES});
sc_require("views/view");SC.View.reopen({isEnabled:YES,isEnabledBindingDefault:SC.Binding.oneWay().bool(),isEnabledInPane:function(){var ret=this.get("isEnabled"),pv;
if(ret&&(pv=this.get("parentView"))){ret=pv.get("isEnabledInPane")}return ret}.property("parentView","isEnabled"),_sc_view_isEnabledDidChange:function(){if(!this.get("isEnabled")&&this.get("isFirstResponder")){this.resignFirstResponder()
}}.observes("isEnabled"),applyAttributesToContext:function(original,context){var isEnabled=this.get("isEnabled");
original(context);context.setClass("disabled",!isEnabled);context.attr("aria-disabled",!isEnabled?"true":null)
}.enhance()});sc_require("views/view");SC.View.reopen({isKeyResponder:NO,willLoseKeyResponderTo:function(responder){},willBecomeKeyResponderFrom:function(responder){},didLoseKeyResponderTo:function(responder){},didBecomeKeyResponderFrom:function(responder){},interpretKeyEvents:function(event){var codes=event.commandCodes(),cmd=codes[0],chr=codes[1],ret;
if(!cmd&&!chr){return null}if(cmd){var methodName=SC.MODIFIED_KEY_BINDINGS[cmd]||SC.BASE_KEY_BINDINGS[cmd.match(/[^_]+$/)[0]];
if(methodName){var target=this,pane=this.get("pane"),handler=null;while(target&&!(handler=target.tryToPerform(methodName,event))){target=(target===pane)?null:target.get("nextResponder")
}return handler}}if(chr&&this.respondsTo("insertText")){ret=this.insertText(chr,event);
return ret?(ret===YES?this:ret):null}return null},insertText:function(chr){return NO
},performKeyEquivalent:function(keystring,evt){var ret=NO,childViews=this.get("childViews"),len=childViews.length,idx=-1,view;
while(!ret&&(++idx<len)){view=childViews[idx];ret=view.tryToPerform("performKeyEquivalent",keystring,evt)
}return ret},nextKeyView:null,nextValidKeyView:function(){var seen=[],rootView=this.get("pane"),ret=this.get("nextKeyView");
if(!ret){ret=rootView._computeNextValidKeyView(this,seen)}if(SC.TABBING_ONLY_INSIDE_DOCUMENT&&!ret){ret=rootView._computeNextValidKeyView(rootView,seen)
}return ret}.property("nextKeyView"),_computeNextValidKeyView:function(currentView,seen){var ret=this.get("nextKeyView"),children,i,childLen,child;
if(this!==currentView&&seen.indexOf(currentView)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}seen.push(this);if(!ret){children=this.get("childViews");for(i=0,childLen=children.length;
i<childLen;i++){child=children[i];if(child.get("isVisibleInWindow")&&child.get("isVisible")){ret=child._computeNextValidKeyView(currentView,seen)
}if(ret){return ret}}ret=null}return ret},previousKeyView:null,previousValidKeyView:function(){var seen=[],rootView=this.pane(),ret=this.get("previousKeyView");
if(!ret){ret=rootView._computePreviousValidKeyView(this,seen)}return ret}.property("previousKeyView"),_computePreviousValidKeyView:function(currentView,seen){var ret=this.get("previousKeyView"),children,i,child;
if(this!==currentView&&seen.indexOf(currentView)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}seen.push(this);if(!ret){children=this.get("childViews");for(i=children.length-1;
0<=i;i--){child=children[i];if(child.get("isVisibleInWindow")&&child.get("isVisible")){ret=child._computePreviousValidKeyView(currentView,seen)
}if(ret){return ret}}ret=null}return ret}});sc_require("views/view");sc_require("views/view/layout_style");
SC.LAYOUT_HORIZONTAL="sc-layout-horizontal";SC.LAYOUT_VERTICAL="sc-layout-vertical";
SC._VIEW_DEFAULT_DIMS="marginTop marginLeft".w();SC.FULL_WIDTH={left:0,right:0};SC.FULL_HEIGHT={top:0,bottom:0};
SC.ANCHOR_CENTER={centerX:0,centerY:0};SC.LAYOUT_AUTO="auto";SC.View.reopen({concatenatedProperties:["layoutProperties"],backgroundColor:null,displayProperties:["backgroundColor"],useStaticLayout:NO,init:function(original){original();
this.layoutStyleCalculator=SC.View.LayoutStyleCalculator.create({view:this});this._previousLayout=this.get("layout")
}.enhance(),propertyDidChange:function(key,value,_keepCache){var layoutChange=false;
if(typeof this.layout==="function"&&this._kvo_dependents){var dependents=this._kvo_dependents[key];
if(dependents&&dependents.indexOf("layout")!=-1){layoutChange=true}}if(key==="layout"||layoutChange){this.layoutDidChange()
}arguments.callee.base.apply(this,arguments)},adjust:function(key,value){var layout=SC.clone(this.get("layout")),didChange=NO,cur;
if(key===undefined){return this}if(SC.typeOf(key)===SC.T_STRING){hash={};hash[key]=value
}else{hash=key}for(key in hash){if(!hash.hasOwnProperty(key)){continue}value=hash[key];
cur=layout[key];if(value===undefined||cur==value){continue}if(value===null){delete layout[key]
}else{layout[key]=value}didChange=YES}if(didChange){this.set("layout",layout)}return this
},layout:{top:0,left:0,bottom:0,right:0},convertFrameToView:function(frame,targetView){var myX=0,myY=0,targetX=0,targetY=0,view=this,f;
while(view){f=view.get("frame");myX+=f.x;myY+=f.y;view=view.get("layoutView")}if(targetView){view=targetView;
while(view){f=view.get("frame");targetX+=f.x;targetY+=f.y;view=view.get("layoutView")
}}myX=frame.x+myX-targetX;myY=frame.y+myY-targetY;return{x:myX,y:myY,width:frame.width,height:frame.height}
},convertFrameFromView:function(frame,targetView){var myX=0,myY=0,targetX=0,targetY=0,view=this,f;
while(view&&(f=view.get("frame"))){myX+=f.x;myY+=f.y;view=view.get("parentView")}if(targetView){view=targetView;
while(view){f=view.get("frame");targetX+=f.x;targetY+=f.y;view=view.get("parentView")
}}myX=frame.x-myX+targetX;myY=frame.y-myY+targetY;return{x:myX,y:myY,width:frame.width,height:frame.height}
},scrollToVisible:function(){var pv=this.get("parentView");while(pv&&!pv.get("isScrollable")){pv=pv.get("parentView")
}if(pv){pv.scrollToVisible();return pv.scrollToVisible(this)}else{return NO}},_adjustForBorder:function(frame,layout){var borderTop=((layout.borderTop!==undefined)?layout.borderTop:layout.border)||0,borderLeft=((layout.borderLeft!==undefined)?layout.borderLeft:layout.border)||0,borderBottom=((layout.borderBottom!==undefined)?layout.borderBottom:layout.border)||0,borderRight=((layout.borderRight!==undefined)?layout.borderRight:layout.border)||0;
frame.x+=borderLeft;frame.y+=borderTop;frame.width-=(borderLeft+borderRight);frame.height-=(borderTop+borderBottom);
return frame},computeFrameWithParentFrame:function(original,pdim){var layout=this.get("layout");
if(this.get("useStaticLayout")){var f=original(pdim);return f?this._adjustForBorder(f,layout):null
}var f={},error,layer,AUTO=SC.LAYOUT_AUTO,pv=this.get("parentView"),dH,dW,lR=layout.right,lL=layout.left,lT=layout.top,lB=layout.bottom,lW=layout.width,lH=layout.height,lcX=layout.centerX,lcY=layout.centerY;
if(lW===AUTO){error=SC.Error.desc(("%@.layout() cannot use width:auto if staticLayout is disabled").fmt(this),"%@".fmt(this),-1);
SC.Logger.error(error.toString());throw error}if(lH===AUTO){error=SC.Error.desc(("%@.layout() cannot use height:auto if staticLayout is disabled").fmt(this),"%@".fmt(this),-1);
SC.Logger.error(error.toString());throw error}if(!pdim){pdim=this.computeParentDimensions(layout)
}dH=pdim.height;dW=pdim.width;if(!SC.none(lL)){if(SC.isPercentage(lL)){f.x=dW*lL}else{f.x=lL
}if(lW!==undefined){if(lW===AUTO){f.width=AUTO}else{if(SC.isPercentage(lW)){f.width=dW*lW
}else{f.width=lW}}}else{f.width=dW-f.x;if(lR&&SC.isPercentage(lR)){f.width=f.width-(lR*dW)
}else{f.width=f.width-(lR||0)}}}else{if(!SC.none(lR)){if(SC.none(lW)){if(SC.isPercentage(lR)){f.width=dW-(dW*lR)
}else{f.width=dW-lR}f.x=0}else{if(lW===AUTO){f.width=AUTO}else{if(SC.isPercentage(lW)){f.width=dW*lW
}else{f.width=(lW||0)}}if(SC.isPercentage(lW)){f.x=dW-(lR*dW)-f.width}else{f.x=dW-lR-f.width
}}}else{if(!SC.none(lcX)){if(lW===AUTO){f.width=AUTO}else{if(SC.isPercentage(lW)){f.width=lW*dW
}else{f.width=(lW||0)}}if(SC.isPercentage(lcX)){f.x=(dW-f.width)/2+(lcX*dW)}else{f.x=(dW-f.width)/2+lcX
}}else{f.x=0;if(SC.none(lW)){f.width=dW}else{if(lW===AUTO){f.width=AUTO}if(SC.isPercentage(lW)){f.width=lW*dW
}else{f.width=(lW||0)}}}}}if(!SC.none(lT)){if(SC.isPercentage(lT)){f.y=lT*dH}else{f.y=lT
}if(lH!==undefined){if(lH===AUTO){f.height=AUTO}else{if(SC.isPercentage(lH)){f.height=lH*dH
}else{f.height=lH}}}else{if(lB&&SC.isPercentage(lB)){f.height=dH-f.y-(lB*dH)}else{f.height=dH-f.y-(lB||0)
}}}else{if(!SC.none(lB)){if(SC.none(lH)){if(SC.isPercentage(lB)){f.height=dH-(lB*dH)
}else{f.height=dH-lB}f.y=0}else{if(lH===AUTO){f.height=AUTO}if(lH&&SC.isPercentage(lH)){f.height=lH*dH
}else{f.height=(lH||0)}if(SC.isPercentage(lB)){f.y=dH-(lB*dH)-f.height}else{f.y=dH-lB-f.height
}}}else{if(!SC.none(lcY)){if(lH===AUTO){f.height=AUTO}if(lH&&SC.isPercentage(lH)){f.height=lH*dH
}else{f.height=(lH||0)}if(SC.isPercentage(lcY)){f.y=(dH-f.height)/2+(lcY*dH)}else{f.y=(dH-f.height)/2+lcY
}}else{f.y=0;if(SC.none(lH)){f.height=dH}else{if(lH===AUTO){f.height=AUTO}if(SC.isPercentage(lH)){f.height=lH*dH
}else{f.height=lH||0}}}}}f.x=Math.floor(f.x);f.y=Math.floor(f.y);if(f.height!==AUTO){f.height=Math.floor(f.height)
}if(f.width!==AUTO){f.width=Math.floor(f.width)}if(f.height===AUTO||f.width===AUTO){layer=this.get("layer");
if(f.height===AUTO){f.height=layer?layer.clientHeight:0}if(f.width===AUTO){f.width=layer?layer.clientWidth:0
}}f=this._adjustForBorder(f,layout);if(pv&&pv.isScrollContainer){pv=pv.get("parentView");
f.x-=pv.get("horizontalScrollOffset");f.y-=pv.get("verticalScrollOffset")}if(!SC.none(layout.maxHeight)&&(f.height>layout.maxHeight)){f.height=layout.maxHeight
}if(!SC.none(layout.minHeight)&&(f.height<layout.minHeight)){f.height=layout.minHeight
}if(!SC.none(layout.maxWidth)&&(f.width>layout.maxWidth)){f.width=layout.maxWidth
}if(!SC.none(layout.minWidth)&&(f.width<layout.minWidth)){f.width=layout.minWidth
}if(f.height<0){f.height=0}if(f.width<0){f.width=0}return f}.enhance(),computeParentDimensions:function(frame){var ret,pv=this.get("parentView"),pf=(pv)?pv.get("frame"):null;
if(pf){ret={width:pf.width,height:pf.height}}else{var f=frame||{};ret={width:(f.left||0)+(f.width||0)+(f.right||0),height:(f.top||0)+(f.height||0)+(f.bottom||0)}
}return ret},borderFrame:function(){var layout=this.get("layout"),frame=this.get("frame"),defaultBorder=layout.border,topBorder=((layout.topBorder!==undefined)?layout.topBorder:layout.border)||0,rightBorder=((layout.rightBorder!==undefined)?layout.rightBorder:layout.border)||0,bottomBorder=((layout.bottomBorder!==undefined)?layout.bottomBorder:layout.border)||0,leftBorder=((layout.leftBorder!==undefined)?layout.leftBorder:layout.border)||0;
return{x:frame.x-leftBorder,y:frame.y-topBorder,width:frame.width+leftBorder+rightBorder,height:frame.height+topBorder+bottomBorder}
}.property("frame").cacheable(),parentViewDidResize:function(){var frameMayHaveChanged,layout,isFixed,isPercentageFunc,isPercentage;
if(this.useStaticLayout){frameMayHaveChanged=YES}else{layout=this.get("layout");isFixed=((layout.left!==undefined)&&(layout.top!==undefined)&&(layout.width!==undefined)&&(layout.height!==undefined));
if(isFixed){isPercentageFunc=SC.isPercentage;isPercentage=(isPercentageFunc(layout.left)||isPercentageFunc(layout.top)||isPercentageFunc(layout.width)||isPercentageFunc(layout.right)||isPercentageFunc(layout.centerX)||isPercentageFunc(layout.centerY))
}frameMayHaveChanged=(!isFixed||isPercentage)}if(frameMayHaveChanged){this.viewDidResize()
}},viewDidResize:function(){this._viewFrameDidChange();var cv=this.childViews,len,idx,view;
for(idx=0;idx<(len=cv.length);++idx){view=cv[idx];view.tryToPerform("parentViewDidResize")
}},_viewFrameDidChange:function(){this.notifyPropertyChange("frame");this._sc_view_clippingFrameDidChange()
},beginLiveResize:function(){if(this.willBeginLiveResize){this.willBeginLiveResize()
}var ary=this.get("childViews"),len=ary.length,idx,view;for(idx=0;idx<len;++idx){view=ary[idx];
if(view.beginLiveResize){view.beginLiveResize()}}return this},endLiveResize:function(){var ary=this.get("childViews"),len=ary.length,idx,view;
for(idx=len-1;idx>=0;--idx){view=ary[idx];if(view.endLiveResize){view.endLiveResize()
}}if(this.didEndLiveResize){this.didEndLiveResize()}return this},layoutView:function(){return this.get("parentView")
}.property("parentView").cacheable(),layoutDidChange:function(){var previousLayout=this._previousLayout,currentLayout=this.get("layout"),didResize=YES,previousWidth,previousHeight,currentWidth,currentHeight;
if(!SC.none(currentLayout.rotate)){if(SC.none(currentLayout.rotateX)){currentLayout.rotateX=currentLayout.rotate;
SC.Logger.warn("Please set rotateX instead of rotate")}}if(!SC.none(currentLayout.rotateX)){currentLayout.rotate=currentLayout.rotateX
}else{delete currentLayout.rotate}var animations=currentLayout.animations;if(animations){if(!SC.none(animations.rotate)){if(SC.none(animations.rotateX)){animations.rotateX=animations.rotate;
SC.Logger.warn("Please animate rotateX instead of rotate")}}if(!SC.none(animations.rotateX)){animations.rotate=animations.rotateX
}else{delete animations.rotate}}if(previousLayout&&previousLayout!==currentLayout){previousWidth=previousLayout.width;
if(previousWidth!==undefined){currentWidth=currentLayout.width;if(previousWidth===currentWidth){previousHeight=previousLayout.height;
if(previousLayout!==undefined){currentHeight=currentLayout.height;if(previousHeight===currentHeight){didResize=NO
}}}}}this.beginPropertyChanges();this.notifyPropertyChange("hasAcceleratedLayer");
this.notifyPropertyChange("layoutStyle");if(didResize){this.viewDidResize()}else{this._viewFrameDidChange()
}this.endPropertyChanges();var layoutView=this.get("layoutView");if(layoutView){layoutView.set("childViewsNeedLayout",YES);
layoutView.layoutDidChangeFor(this);if(layoutView.get("childViewsNeedLayout")){layoutView.invokeOnce(layoutView.layoutChildViewsIfNeeded)
}}this._previousLayout=currentLayout;return this},childViewsNeedLayout:NO,layoutDidChangeFor:function(childView){var set=this._needLayoutViews;
if(!set){set=this._needLayoutViews=SC.CoreSet.create()}set.add(childView)},layoutChildViewsIfNeeded:function(isVisible){if(!isVisible){isVisible=this.get("isVisibleInWindow")
}if(isVisible&&this.get("childViewsNeedLayout")){this.set("childViewsNeedLayout",NO);
this.layoutChildViews()}return this},layoutChildViews:function(){var set=this._needLayoutViews,len=set?set.length:0,i;
for(i=0;i<len;++i){set[i].updateLayout()}set.clear()},updateLayout:function(){var layer=this.get("layer"),context;
if(layer){context=this.renderContext(layer);this.renderLayout(context,NO);context.update();
if(this.useStaticLayout){this.viewDidResize()}}layer=null;return this},renderLayout:function(context,firstTime){this.get("layoutStyleCalculator").willRenderAnimations();
context.addStyle(this.get("layoutStyle"));this.get("layoutStyleCalculator").didRenderAnimations()
},_renderLayerSettings:function(original,context,firstTime){original(context,firstTime);
this.renderLayout(context,firstTime)}.enhance(),applyAttributesToContext:function(original,context){original(context);
if(this.get("useStaticLayout")){context.addClass("sc-static-layout")}if(this.get("backgroundColor")){context.css("backgroundColor",this.get("backgroundColor"))
}}.enhance()});SC.View.mixin({convertLayoutToAnchoredLayout:function(layout,parentFrame){var ret={top:0,left:0,width:parentFrame.width,height:parentFrame.height},pFW=parentFrame.width,pFH=parentFrame.height,lR=layout.right,lL=layout.left,lT=layout.top,lB=layout.bottom,lW=layout.width,lH=layout.height,lcX=layout.centerX,lcY=layout.centerY;
if(!SC.none(lL)){if(SC.isPercentage(lL)){ret.left=lL*pFW}else{ret.left=lL}if(lW!==undefined){if(lW===SC.LAYOUT_AUTO){ret.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lW)){ret.width=lW*pFW}else{ret.width=lW}}}else{if(lR&&SC.isPercentage(lR)){ret.width=pFW-ret.left-(lR*pFW)
}else{ret.width=pFW-ret.left-(lR||0)}}}else{if(!SC.none(lR)){if(SC.none(lW)){ret.left=0;
if(lR&&SC.isPercentage(lR)){ret.width=pFW-(lR*pFW)}else{ret.width=pFW-(lR||0)}}else{if(lW===SC.LAYOUT_AUTO){ret.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lW)){ret.width=lW*pFW}else{ret.width=lW}if(SC.isPercentage(lR)){ret.left=pFW-(ret.width+lR)
}else{ret.left=pFW-(ret.width+lR)}}}}else{if(!SC.none(lcX)){if(lW&&SC.isPercentage(lW)){ret.width=(lW*pFW)
}else{ret.width=(lW||0)}ret.left=((pFW-ret.width)/2);if(SC.isPercentage(lcX)){ret.left=ret.left+lcX*pFW
}else{ret.left=ret.left+lcX}}else{if(!SC.none(lW)){ret.left=0;if(lW===SC.LAYOUT_AUTO){ret.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lW)){ret.width=lW*pFW}else{ret.width=lW}}}else{ret.left=0;
ret.width=0}}}}if(layout.minWidth!==undefined){ret.minWidth=layout.minWidth}if(layout.maxWidth!==undefined){ret.maxWidth=layout.maxWidth
}if(!SC.none(lT)){if(SC.isPercentage(lT)){ret.top=lT*pFH}else{ret.top=lT}if(lH!==undefined){if(lH===SC.LAYOUT_AUTO){ret.height=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lH)){ret.height=lH*pFH}else{ret.height=lH}}}else{ret.height=pFH-ret.top;
if(lB&&SC.isPercentage(lB)){ret.height=ret.height-(lB*pFH)}else{ret.height=ret.height-(lB||0)
}}}else{if(!SC.none(lB)){if(SC.none(lH)){ret.top=0;if(lB&&SC.isPercentage(lB)){ret.height=pFH-(lB*pFH)
}else{ret.height=pFH-(lB||0)}}else{if(lH===SC.LAYOUT_AUTO){ret.height=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lH)){ret.height=lH*pFH}else{ret.height=lH}ret.top=pFH-ret.height;
if(SC.isPercentage(lB)){ret.top=ret.top-(lB*pFH)}else{ret.top=ret.top-lB}}}}else{if(!SC.none(lcY)){if(lH&&SC.isPercentage(lH)){ret.height=(lH*pFH)
}else{ret.height=(lH||0)}ret.top=((pFH-ret.height)/2);if(SC.isPercentage(lcY)){ret.top=ret.top+lcY*pFH
}else{ret.top=ret.top+lcY}}else{if(!SC.none(lH)){ret.top=0;if(lH===SC.LAYOUT_AUTO){ret.height=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lH)){ret.height=lH*pFH}else{ret.height=lH}}}else{ret.top=0;
ret.height=0}}}}if(ret.top){ret.top=Math.floor(ret.top)}if(ret.bottom){ret.bottom=Math.floor(ret.bottom)
}if(ret.left){ret.left=Math.floor(ret.left)}if(ret.right){ret.right=Math.floor(ret.right)
}if(ret.width!==SC.LAYOUT_AUTO){ret.width=Math.floor(ret.width)}if(ret.height!==SC.LAYOUT_AUTO){ret.height=Math.floor(ret.height)
}if(layout.minHeight!==undefined){ret.minHeight=layout.minHeight}if(layout.maxHeight!==undefined){ret.maxHeight=layout.maxHeight
}return ret},convertLayoutToCustomLayout:function(layout,layoutParams,parentFrame){}});
sc_require("views/view");SC.View.reopen({_lastLayerId:null,layerIdDidChange:function(){var layer=this.get("layer"),lid=this.get("layerId"),lastId=this._lastLayerId;
if(lid!==lastId){if(lastId&&SC.View.views[lastId]===this){delete SC.View.views[lastId]
}this._lastLayerId=lid;SC.View.views[lid]=this;if(layer){layer.id=lid}}}.observes("layerId"),parentViewDidChange:function(){this.recomputeIsVisibleInWindow();
this.resetBuildState();this.set("layerLocationNeedsUpdate",YES);this.invokeOnce(this.updateLayerLocationIfNeeded);
this._invalidatePaneCacheForSelfAndAllChildViews();return this},_invalidatePaneCacheForSelfAndAllChildViews:function(){var childView,childViews=this.get("childViews"),len=childViews.length,idx;
this.notifyPropertyChange("pane");for(idx=0;idx<len;++idx){childView=childViews[idx];
if(childView._invalidatePaneCacheForSelfAndAllChildViews){childView._invalidatePaneCacheForSelfAndAllChildViews()
}}},layerLocationNeedsUpdate:NO,updateLayerLocationIfNeeded:function(force){if(this.get("layerLocationNeedsUpdate")){this.updateLayerLocation()
}return this},insertBefore:function(view,beforeView){view.beginPropertyChanges();
if(view.get("parentView")){view.removeFromParent()}if(this.willAddChild){this.willAddChild(view,beforeView)
}if(view.willAddToParent){view.willAddToParent(this,beforeView)}view.set("parentView",this);
var idx,childViews=this.get("childViews");if(childViews.needsClone){this.set(childViews=[])
}idx=(beforeView)?childViews.indexOf(beforeView):childViews.length;if(idx<0){idx=childViews.length
}childViews.insertAt(idx,view);if(view.parentViewDidChange){view.parentViewDidChange()
}if(view.layoutDidChange){view.layoutDidChange()}var pane=view.get("pane");if(pane&&pane.get("isPaneAttached")){view._notifyDidAppendToDocument()
}if(this.didAddChild){this.didAddChild(view,beforeView)}if(view.didAddToParent){view.didAddToParent(this,beforeView)
}view.endPropertyChanges();return this},removeChild:function(original,view){if(!view){return this
}if(view.parentView!==this){throw"%@.removeChild(%@) must belong to parent".fmt(this,view)
}if(view.willRemoveFromParent){view.willRemoveFromParent()}if(this.willRemoveChild){this.willRemoveChild(view)
}original(view);if(view.parentViewDidChange){view.parentViewDidChange()}if(this.didRemoveChild){this.didRemoveChild(view)
}if(view.didRemoveFromParent){view.didRemoveFromParent(this)}return this}.enhance(),replaceChild:function(view,oldView){view.beginPropertyChanges();
oldView.beginPropertyChanges();this.beginPropertyChanges();this.insertBefore(view,oldView).removeChild(oldView);
this.endPropertyChanges();oldView.endPropertyChanges();view.endPropertyChanges();
return this},replaceAllChildren:function(views){var len=views.get("length"),idx;this.beginPropertyChanges();
this.destroyLayer().removeAllChildren();for(idx=0;idx<len;idx++){this.appendChild(views.objectAt(idx))
}this.replaceLayer();this.endPropertyChanges();return this},appendChild:function(view){return this.insertBefore(view,null)
},buildInChild:function(view){view.willBuildInToView(this);this.appendChild(view);
view.buildInToView(this)},buildOutChild:function(view){view.buildOutFromView(this)
},buildInDidFinishFor:function(child){},buildOutDidFinishFor:function(child){this.removeChild(child)
},isBuildingIn:NO,isBuildingOut:NO,buildIn:function(){this.buildInDidFinish()},buildOut:function(){this.buildOutDidFinish()
},resetBuild:function(){},buildOutDidCancel:function(){},buildInDidCancel:function(){},buildInDidFinish:function(){this.isBuildingIn=NO;
this._buildingInTo.buildInDidFinishFor(this);this._buildingInTo=null},buildOutDidFinish:function(){this.isBuildingOut=NO;
this._buildingOutFrom.buildOutDidFinishFor(this);this._buildingOutFrom=null},resetBuildState:function(){if(this.isBuildingIn){this.buildInDidCancel();
this.isBuildingIn=NO}if(this.isBuildingOut){this.buildOutDidCancel();this.isBuildingOut=NO
}this.buildingInTo=null;this.buildingOutFrom=null;this.resetBuild()},willBuildInToView:function(view){if(this.isBuildingOut){this.buildOutDidCancel()
}},buildInToView:function(view){if(this.isBuildingIn){return}this._buildingInTo=view;
this.isBuildingOut=NO;this.isBuildingIn=YES;this.buildIn()},buildOutFromView:function(view){if(this.isBuildingOut){return
}if(this.isBuildingIn){this.buildInDidCancel()}this.isBuildingOut=YES;this.isBuildingIn=NO;
this._buildingOutFrom=view;this.buildOut()}});sc_require("views/view");SC.View.reopen({init:function(original){original();
this._lastTheme=this.get("theme")}.enhance(),themeName:null,baseThemeName:null,theme:function(){var base=this.get("baseTheme"),themeName=this.get("themeName");
if(themeName){var theme;if(base){theme=base.find(themeName);if(theme){return theme
}}theme=SC.Theme.find(themeName);if(theme){return theme}return base.invisibleSubtheme(themeName)
}return base}.property("baseTheme","themeName").cacheable(),_sc_view_themeDidChange:function(){if(this._lastTheme===this.get("theme")){return
}this._lastTheme=this.get("theme");var childViews=this.childViews,len=childViews.length,idx;
for(idx=0;idx<len;idx++){childViews[idx].notifyPropertyChange("baseTheme")}if(this.get("layer")){this.replaceLayer()
}}.observes("theme"),baseTheme:function(){var parent;var baseThemeName=this.get("baseThemeName");
if(baseThemeName){return SC.Theme.find(baseThemeName)}else{parent=this.get("parentView");
var theme=parent&&parent.get("theme");return theme||SC.Theme.find(SC.defaultTheme)
}}.property("baseThemeName","parentView").cacheable(),getThemedProperty:function(property,constantName){var value=this.get(property);
if(value!==undefined){return value}var theme=this.get("theme");if(!theme){return undefined
}return theme[constantName]},renderDelegate:function(key,value){if(value){this._setRenderDelegate=value
}if(this._setRenderDelegate){return this._setRenderDelegate}var renderDelegateName=this.get("renderDelegateName"),renderDelegate;
if(renderDelegateName){renderDelegate=this.get("theme")[renderDelegateName];if(!renderDelegate){throw'%@: Unable to locate render delegate "%@" in theme.'.fmt(this,renderDelegateName)
}return renderDelegate}return null}.property("renderDelegateName","theme"),renderDelegateName:null,renderDelegateProxy:function(){return SC.View._RenderDelegateProxy.createForView(this)
}.property("renderDelegate").cacheable(),render:function(context,firstTime){var renderDelegate=this.get("renderDelegate");
if(renderDelegate){if(firstTime){renderDelegate.render(this.get("renderDelegateProxy"),context)
}else{renderDelegate.update(this.get("renderDelegateProxy"),context.$())}}},applyAttributesToContext:function(original,context){var theme=this.get("theme");
var themeClassNames=theme.classNames,idx,len=themeClassNames.length;for(idx=0;idx<len;
idx++){context.addClass(themeClassNames[idx])}original(context);var renderDelegate=this.get("renderDelegate");
if(renderDelegate&&renderDelegate.name){context.addClass(renderDelegate.name)}}.enhance()});
SC.View._RenderDelegateProxy={isViewRenderDelegateProxy:YES,createForView:function(view){var ret=SC.beget(this);
var dp=view.get("displayProperties"),lookup={};for(var idx=0,len=dp.length;idx<len;
idx++){lookup[dp[idx]]=YES}lookup.theme=YES;ret._displayPropertiesLookup=lookup;ret.renderState={};
ret.view=view;return ret},get:function(property){if(this[property]!==undefined){return this[property]
}var displayProperty="display"+property.capitalize();if(this._displayPropertiesLookup[displayProperty]){return this.view.get(displayProperty)
}else{if(this._displayPropertiesLookup[property]){return this.view.get(property)}}return undefined
},didChangeFor:function(context){var len=arguments.length,idx;for(idx=1;idx<len;idx++){var property=arguments[idx],displayProperty="display"+property.capitalize();
if(this._displayPropertiesLookup[displayProperty]){if(this.view.didChangeFor(context,displayProperty)){return YES
}}else{if(this._displayPropertiesLookup[property]){if(this.view.didChangeFor(context,property)){return YES
}}}}return NO}};sc_require("views/view");SC.View.reopen({acceptsMultitouch:NO,hasTouch:NO,touchBoundary:{left:50,right:50,top:50,bottom:50},_touchBoundaryFrame:function(){return this.get("parentView").convertFrameToView(this.get("frame"),null)
}.property("frame","parentView").cacheable(),touchIsInBoundary:function(touch){var f=this.get("_touchBoundaryFrame"),maxX=0,maxY=0,boundary=this.get("touchBoundary");
var x=touch.pageX,y=touch.pageY;if(x<f.x){x=f.x-x;maxX=boundary.left}else{if(x>f.x+f.width){x=x-(f.x+f.width);
maxX=boundary.right}else{x=0;maxX=1}}if(y<f.y){y=f.y-y;maxY=boundary.top}else{if(y>f.y+f.height){y=y-(f.y+f.height);
maxY=boundary.bottom}else{y=0;maxY=1}}if(x>100||y>100){return NO}return YES}});sc_require("views/view");
SC.View.reopen({isVisibleInWindow:NO,isContextMenuEnabled:function(){return SC.CONTEXT_MENU_ENABLED
}.property(),recomputeIsVisibleInWindow:function(parentViewIsVisible){var previous=this.get("isVisibleInWindow"),current=this.get("isVisible"),parentView;
if(current){if(parentViewIsVisible===undefined){parentView=this.get("parentView");
parentViewIsVisible=parentView?parentView.get("isVisibleInWindow"):NO}current=current&&parentViewIsVisible
}if(previous!==current){this.set("isVisibleInWindow",current);var childViews=this.get("childViews"),len=childViews.length,idx,view;
for(idx=0;idx<len;idx++){view=childViews[idx];if(view.recomputeIsVisibleInWindow){view.recomputeIsVisibleInWindow(current)
}}if(current){if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}else{if(this.get("isFirstResponder")){this.resignFirstResponder()}}}this.updateLayerIfNeeded(YES);
return this},_sc_isVisibleDidChange:function(){this.displayDidChange();this.recomputeIsVisibleInWindow()
}.observes("isVisible")});sc_require("panes/pane");SC.MainPane=SC.Pane.extend({layout:{top:0,left:0,bottom:0,right:0,minHeight:200,minWidth:200},paneDidAttach:function(){var ret=arguments.callee.base.apply(this,arguments);
var responder=this.rootResponder;responder.makeMainPane(this);if(!responder.get("keyRootView")){responder.makeKeyPane(this)
}return ret},acceptsKeyPane:YES,classNames:["sc-main"],ariaRole:"application"});SC.stringsFor("English",{"_SC.DateTime.dayNames":"Sunday Monday Tuesday Wednesday Thursday Friday Saturday","_SC.DateTime.abbreviatedDayNames":"Sun Mon Tue Wed Thu Fri Sat","_SC.DateTime.monthNames":"January February March April May June July August September October November December","_SC.DateTime.abbreviatedMonthNames":"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"});
SC.SCANNER_OUT_OF_BOUNDS_ERROR=new Error("Out of bounds.");SC.SCANNER_INT_ERROR=new Error("Not an int.");
SC.SCANNER_SKIP_ERROR=new Error("Did not find the string to skip.");SC.SCANNER_SCAN_ARRAY_ERROR=new Error("Did not find any string of the given array to scan.");
SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR=new Error("Can't compare the dates of two DateTimes that don't have the same timezone.");
SC.DATETIME_ISO8601="%Y-%m-%dT%H:%M:%S%Z";SC.Scanner=SC.Object.extend({string:null,scanLocation:0,scan:function(len){if(this.scanLocation+len>this.length){throw SC.SCANNER_OUT_OF_BOUNDS_ERROR
}var str=this.string.substr(this.scanLocation,len);this.scanLocation+=len;return str
},scanInt:function(min_len,max_len){if(max_len===undefined){max_len=min_len}var str=this.scan(max_len);
var re=new RegExp("^\\d{"+min_len+","+max_len+"}");var match=str.match(re);if(!match){throw SC.SCANNER_INT_ERROR
}if(match[0].length<max_len){this.scanLocation+=match[0].length-max_len}return parseInt(match[0],10)
},skipString:function(str){if(this.scan(str.length)!==str){throw SC.SCANNER_SKIP_ERROR
}return YES},scanArray:function(ary){for(var i=0,len=ary.length;i<len;i++){if(this.scan(ary[i].length)===ary[i]){return i
}this.scanLocation-=ary[i].length}throw SC.SCANNER_SCAN_ARRAY_ERROR}});SC.DateTime=SC.Object.extend(SC.Freezable,SC.Copyable,{_ms:0,timezone:0,isFrozen:YES,adjust:function(options,resetCascadingly){var timezone;
options=options?SC.clone(options):{};timezone=(options.timezone!==undefined)?options.timezone:(this.timezone!==undefined)?this.timezone:0;
return this.constructor._adjust(options,this._ms,timezone,resetCascadingly)._createFromCurrentState()
},advance:function(options){return this.constructor._advance(options,this._ms,this.timezone)._createFromCurrentState()
},unknownProperty:function(key){return this.constructor._get(key,this._ms,this.timezone)
},toFormattedString:function(fmt){return this.constructor._toFormattedString(fmt,this._ms,this.timezone)
},toISO8601:function(){return this.constructor._toFormattedString(SC.DATETIME_ISO8601,this._ms,this.timezone)
},toString:function(){return"UTC: "+new Date(this._ms).toUTCString()+", timezone: "+this.timezone
},isEqual:function(aDateTime){return SC.DateTime.compare(this,aDateTime)===0},copy:function(){return this
},toTimezone:function(timezone){if(timezone===undefined){timezone=0}return this.advance({timezone:timezone-this.timezone})
}});SC.DateTime.mixin(SC.Comparable,{recordFormat:SC.DATETIME_ISO8601,dayNames:"_SC.DateTime.dayNames".loc().w(),_englishDayNames:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".w(),abbreviatedDayNames:"_SC.DateTime.abbreviatedDayNames".loc().w(),monthNames:"_SC.DateTime.monthNames".loc().w(),abbreviatedMonthNames:"_SC.DateTime.abbreviatedMonthNames".loc().w(),_date:new Date(),_tz:0,timezone:new Date().getTimezoneOffset(),_dt_cache:{},_dt_cache_index:-1,_DT_CACHE_MAX_LENGTH:1000,_setCalcState:function(ms,timezone){var previous={milliseconds:this._date.getTime(),timezone:this._tz};
if(ms!==undefined){this._date.setTime(ms)}if(timezone!==undefined){this._tz=timezone
}return previous},_setCalcStateFromHash:function(hash,timezone){var tz=(timezone!==undefined)?timezone:this._tz;
var ms=this._toMilliseconds(hash,this._ms,tz);return this._setCalcState(ms,tz)},_get:function(key,start,timezone){var ms,tz,doy,m,y,firstDayOfWeek,dayOfWeek,dayOfYear,prefix,suffix;
var currentWeekday,targetWeekday;var d=this._date;var originalTime,v=null;originalTime=this._setCalcState(start,timezone);
if(key==="milliseconds"){v=d.getTime()}else{if(key==="timezone"){v=this._tz}}if(v===null){prefix=key.slice(0,4);
suffix=key.slice(4);if(prefix==="last"||prefix==="next"){currentWeekday=this._get("dayOfWeek",start,timezone);
targetWeekday=this._englishDayNames.indexOf(suffix);if(targetWeekday>=0){var delta=targetWeekday-currentWeekday;
if(prefix==="last"&&delta>=0){delta-=7}if(prefix==="next"&&delta<0){delta+=7}this._advance({day:delta},start,timezone);
v=this._createFromCurrentState()}}}if(v===null){if(timezone!==undefined){this._setCalcState(d.getTime()-(timezone*60000),0)
}switch(key){case"year":v=d.getUTCFullYear();break;case"month":v=d.getUTCMonth()+1;
break;case"day":v=d.getUTCDate();break;case"dayOfWeek":v=d.getUTCDay();break;case"hour":v=d.getUTCHours();
break;case"minute":v=d.getUTCMinutes();break;case"second":v=d.getUTCSeconds();break;
case"millisecond":v=d.getUTCMilliseconds();break}if((v===null)&&(key==="isLeapYear")){y=this._get("year");
v=(y%4===0&&y%100!==0)||y%400===0}if((v===null)&&(key==="daysInMonth")){switch(this._get("month")){case 4:case 6:case 9:case 11:v=30;
break;case 2:v=this._get("isLeapYear")?29:28;break;default:v=31;break}}if((v===null)&&(key==="dayOfYear")){ms=d.getTime();
doy=this._get("day");this._setCalcStateFromHash({day:1});for(m=this._get("month")-1;
m>0;m--){this._setCalcStateFromHash({month:m});doy+=this._get("daysInMonth")}d.setTime(ms);
v=doy}if((v===null)&&(key.slice(0,4)==="week")){firstDayOfWeek=key.length===4?1:parseInt(key.slice("4"),10);
dayOfWeek=this._get("dayOfWeek");dayOfYear=this._get("dayOfYear")-1;if(firstDayOfWeek===0){v=parseInt((dayOfYear-dayOfWeek+7)/7,10)
}else{v=parseInt((dayOfYear-(dayOfWeek-1+7)%7+7)/7,10)}}}this._setCalcState(originalTime.milliseconds,originalTime.timezone);
return v},_adjust:function(options,start,timezone,resetCascadingly){var opts=options?SC.clone(options):{};
var ms=this._toMilliseconds(options,start,timezone,resetCascadingly);this._setCalcState(ms,timezone);
return this},_advance:function(options,start,timezone){var opts=options?SC.clone(options):{};
var tz;for(var key in opts){opts[key]+=this._get(key,start,timezone)}tz=(opts.timezone!==undefined)?opts.timezone:timezone;
return this._adjust(opts,start,tz,NO)},_toMilliseconds:function(options,start,timezone,resetCascadingly){var opts=options?SC.clone(options):{};
var d=this._date;var previousMilliseconds=d.getTime();var ms,tz;if(!SC.none(start)){d.setTime(start)
}tz=(timezone!==undefined)?timezone:(this.timezone!==undefined)?this.timezone:0;d.setTime(d.getTime()-(tz*60000));
if(resetCascadingly===undefined||resetCascadingly===YES){if(!SC.none(opts.hour)&&SC.none(opts.minute)){opts.minute=0
}if(!(SC.none(opts.hour)&&SC.none(opts.minute))&&SC.none(opts.second)){opts.second=0
}if(!(SC.none(opts.hour)&&SC.none(opts.minute)&&SC.none(opts.second))&&SC.none(opts.millisecond)){opts.millisecond=0
}}if(SC.none(opts.year)){opts.year=d.getUTCFullYear()}if(SC.none(opts.month)){opts.month=d.getUTCMonth()+1
}if(SC.none(opts.day)){opts.day=d.getUTCDate()}if(SC.none(opts.hour)){opts.hour=d.getUTCHours()
}if(SC.none(opts.minute)){opts.minute=d.getUTCMinutes()}if(SC.none(opts.second)){opts.second=d.getUTCSeconds()
}if(SC.none(opts.millisecond)){opts.millisecond=d.getUTCMilliseconds()}ms=Date.UTC(opts.year,opts.month-1,opts.day,opts.hour,opts.minute,opts.second,opts.millisecond);
d.setTime(ms+(tz*60000));ms=d.getTime();d.setTime(previousMilliseconds);return ms
},create:function(){var arg=arguments.length===0?{}:arguments[0];var timezone;if(SC.typeOf(arg)===SC.T_NUMBER){arg={milliseconds:arg}
}timezone=(arg.timezone!==undefined)?arg.timezone:this.timezone;if(timezone===undefined){timezone=0
}if(!SC.none(arg.milliseconds)){var key="nu"+arg.milliseconds+timezone,cache=this._dt_cache;
var ret=cache[key];if(!ret){var previousKey,idx=this._dt_cache_index,C=this;ret=cache[key]=new C([{_ms:arg.milliseconds,timezone:timezone}]);
idx=this._dt_cache_index=(idx+1)%this._DT_CACHE_MAX_LENGTH;previousKey=cache[idx];
if(previousKey!==undefined&&cache[previousKey]){delete cache[previousKey]}cache[idx]=key
}return ret}else{var now=new Date();return this.create({milliseconds:this._toMilliseconds(arg,now.getTime(),timezone,arg.resetCascadingly),timezone:timezone})
}},_createFromCurrentState:function(){return this.create({milliseconds:this._date.getTime(),timezone:this._tz})
},parse:function(str,fmt){var re=new RegExp("(?:%([aAbBcdDhHIjmMpsSUWwxXyYZ%])|(.))","g");
var d,parts,opts={},check={},scanner=SC.Scanner.create({string:str});if(SC.none(fmt)){fmt=SC.DATETIME_ISO8601
}try{while((parts=re.exec(fmt))!==null){switch(parts[1]){case"a":check.dayOfWeek=scanner.scanArray(this.abbreviatedDayNames);
break;case"A":check.dayOfWeek=scanner.scanArray(this.dayNames);break;case"b":opts.month=scanner.scanArray(this.abbreviatedMonthNames)+1;
break;case"B":opts.month=scanner.scanArray(this.monthNames)+1;break;case"c":throw"%c is not implemented";
case"d":case"D":opts.day=scanner.scanInt(1,2);break;case"h":case"H":opts.hour=scanner.scanInt(1,2);
break;case"I":opts.hour=scanner.scanInt(1,2);break;case"j":throw"%j is not implemented";
case"m":opts.month=scanner.scanInt(1,2);break;case"M":opts.minute=scanner.scanInt(1,2);
break;case"p":opts.meridian=scanner.scanArray(["AM","PM"]);break;case"S":opts.second=scanner.scanInt(1,2);
break;case"s":opts.millisecond=scanner.scanInt(1,3);break;case"U":throw"%U is not implemented";
case"W":throw"%W is not implemented";case"w":throw"%w is not implemented";case"x":throw"%x is not implemented";
case"X":throw"%X is not implemented";case"y":opts.year=scanner.scanInt(2);opts.year+=(opts.year>70?1900:2000);
break;case"Y":opts.year=scanner.scanInt(4);break;case"Z":var modifier=scanner.scan(1);
if(modifier==="Z"){opts.timezone=0}else{if(modifier==="+"||modifier==="-"){var h=scanner.scanInt(2);
if(scanner.scan(1)!==":"){scanner.scan(-1)}var m=scanner.scanInt(2);opts.timezone=(modifier==="+"?-1:1)*(h*60+m)
}}break;case"%":scanner.skipString("%");break;default:scanner.skipString(parts[0]);
break}}}catch(e){SC.Logger.log("SC.DateTime.createFromString "+e.toString());return null
}if(!SC.none(opts.meridian)&&!SC.none(opts.hour)){if(opts.meridian===1){opts.hour=(opts.hour+12)%24
}delete opts.meridian}d=SC.DateTime.create(opts);if(!SC.none(check.dayOfWeek)&&d.get("dayOfWeek")!==check.dayOfWeek){return null
}return d},_pad:function(x,len){var str=""+x;if(len===undefined){len=2}while(str.length<len){str="0"+str
}return str},__toFormattedString:function(part,start,timezone){var hour,offset;switch(part[1]){case"a":return this.abbreviatedDayNames[this._get("dayOfWeek")];
case"A":return this.dayNames[this._get("dayOfWeek")];case"b":return this.abbreviatedMonthNames[this._get("month")-1];
case"B":return this.monthNames[this._get("month")-1];case"c":return this._date.toString();
case"d":return this._pad(this._get("day"));case"D":return this._get("day");case"h":return this._get("hour");
case"H":return this._pad(this._get("hour"));case"i":hour=this._get("hour");return(hour===12||hour===0)?12:(hour+12)%12;
case"I":hour=this._get("hour");return this._pad((hour===12||hour===0)?12:(hour+12)%12);
case"j":return this._pad(this._get("dayOfYear"),3);case"m":return this._pad(this._get("month"));
case"M":return this._pad(this._get("minute"));case"p":return this._get("hour")>11?"PM":"AM";
case"S":return this._pad(this._get("second"));case"s":return this._pad(this._get("millisecond"),3);
case"u":return this._pad(this._get("utc"));case"U":return this._pad(this._get("week0"));
case"W":return this._pad(this._get("week1"));case"w":return this._get("dayOfWeek");
case"x":return this._date.toDateString();case"X":return this._date.toTimeString();
case"y":return this._pad(this._get("year")%100);case"Y":return this._get("year");
case"Z":offset=-1*timezone;return(offset>=0?"+":"-")+this._pad(parseInt(Math.abs(offset)/60,10))+":"+this._pad(Math.abs(offset)%60);
case"%":return"%"}},_toFormattedString:function(format,start,timezone){var that=this;
var tz=(timezone!==undefined)?timezone:(this.timezone!==undefined)?this.timezone:0;
this._setCalcState(start-(timezone*60000),0);return format.replace(/\%([aAbBcdDhHiIjmMpsSUWwxXyYZ\%])/g,function(){var v=that.__toFormattedString.call(that,arguments,start,timezone);
return v})},compare:function(a,b){var ma=a.get("milliseconds");var mb=b.get("milliseconds");
return ma<mb?-1:ma===mb?0:1},compareDate:function(a,b){if(a.get("timezone")!==b.get("timezone")){throw SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR
}var ma=a.adjust({hour:0}).get("milliseconds");var mb=b.adjust({hour:0}).get("milliseconds");
return ma<mb?-1:ma===mb?0:1}});SC.Binding.dateTime=function(format){return this.transform(function(value,binding){return value?value.toFormattedString(format):null
})};if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]}CHANCE_SLICES=CHANCE_SLICES.concat([]);
SC.TreeItemContent={isTreeItemContent:YES,treeItemChildren:null,treeItemIsExpanded:YES,treeItemIsGrouped:NO,treeItemDisclosureState:function(parent,idx){return this.get("treeItemIsExpanded")?SC.BRANCH_OPEN:SC.BRANCH_CLOSED
},treeItemCollapse:function(parent,idx){this.setIfChanged("treeItemIsExpanded",NO)
},treeItemExpand:function(parent,idx){this.setIfChanged("treeItemIsExpanded",YES)
},treeItemBranchIndexes:function(parent,index){var children=this.get("treeItemChildren"),ret,lim,idx,item;
if(!children){return null}ret=SC.IndexSet.create();lim=children.get("length");for(idx=0;
idx<lim;idx++){if(!(item=children.objectAt(idx))){continue}if(!item.get("treeItemChildren")){continue
}if(item.treeItemDisclosureState(this,idx)!==SC.LEAF_NODE){ret.add(idx)}}return ret.get("length")>0?ret:null
}};SC.BRANCH_OPEN=17;SC.BRANCH_CLOSED=18;SC.LEAF_NODE=32;SC.CollectionContent={isCollectionContent:YES,contentIndexIsSelected:function(view,content,idx){var sel=view.get("selection");
return sel?sel.contains(content,idx):NO},contentIndexIsEnabled:function(view,content,idx){return view.get("isEnabled")
},contentGroupIndexes:function(view,content){return null},contentIndexIsGroup:function(view,content,idx){return NO
},contentIndexOutlineLevel:function(view,content,idx){return -1},contentIndexDisclosureState:function(view,content,idx){return SC.LEAF_NODE
},contentIndexExpand:function(view,content,idx){SC.Logger.log("contentIndexExpand(%@, %@, %@)".fmt(view,content,idx))
},contentIndexCollapse:function(view,content,idx){SC.Logger.log("contentIndexCollapse(%@, %@, %@)".fmt(view,content,idx))
}};sc_require("mixins/tree_item_content");sc_require("mixins/collection_content");
SC.TreeItemObserver=SC.Object.extend(SC.Array,SC.CollectionContent,{item:null,delegate:null,parentObserver:null,parentItem:function(){var p=this.get("parentObserver");
return p?p.get("item"):null}.property("parentObserver").cacheable(),index:null,outlineLevel:0,children:null,disclosureState:SC.BRANCH_OPEN,branchIndexes:function(){var item=this.get("item"),len,pitem,idx,children,ret;
if(!item){return SC.IndexSet.EMPTY}else{if(item.isTreeItemContent){pitem=this.get("parentItem");
idx=this.get("index");return item.treeItemBranchIndexes(pitem,idx)}else{children=this.get("children");
if(!children){return null}ret=SC.IndexSet.create();len=children.get("length");pitem=item;
for(idx=0;idx<len;idx++){if(!(item=children.objectAt(idx))){continue}if(!this._computeChildren(item,pitem,idx)){continue
}if(this._computeDisclosureState(item,pitem,idx)!==SC.LEAF_NODE){ret.add(idx)}}return ret.get("length")>0?ret:null
}}}.property("children").cacheable(),isHeaderVisible:function(){return !!this.get("parentObserver")
}.property("parentObserver").cacheable(),length:0,objectAt:function(index,omitMaterializing){var len=this.get("length"),item=this.get("item"),cache=this._objectAtCache,cur=index,loc=0,indexes,children;
if(index>=len){return undefined}if(this.get("isHeaderVisible")){if(index===0){return item
}else{cur--}}item=null;if(!cache){cache=this._objectAtCache=[]}if((item=cache[index])!==undefined){return item
}children=this.get("children");if(!children){return undefined}if(indexes=this.get("branchIndexes")){indexes.forEach(function(i){if(item||(i>cur)){return
}var observer=this.branchObserverAt(i),len;if(!observer){return}len=observer.get("length");
if(i+len>cur){item=observer.objectAt(cur-i,omitMaterializing);cur=-1}else{cur-=len-1
}},this)}if(cur>=0){item=children.objectAt(cur,omitMaterializing)}cache[index]=item;
return item},replace:function(start,amt,objects,operation){var cur=start,observer=null,indexes,len,max;
if(operation===undefined){operation=SC.DROP_BEFORE}if(this.get("isHeaderVisible")){cur--
}if(cur<0){throw"Tree Item cannot replace itself"}if(indexes=this.get("branchIndexes")){indexes.forEach(function(i){if(observer||(i>=cur)){return
}if(!(observer=this.branchObserverAt(i))){return}len=observer.get("length");if((i+len===cur)&&operation===SC.DROP_AFTER){cur-=i
}else{if(i+len>cur){cur-=i}else{cur-=len-1;observer=null}}},this)}if(observer){observer.replace(cur,amt,objects,operation);
return this}max=cur+amt;if(amt>1&&indexes){indexes.forEachIn(cur,indexes.get("max")-cur,function(i){if(i>max){return
}if(!(observer=this.branchObserverAt(i))){return}len=observer.get("length");max-=len-1
},this)}amt=max-cur;var children=this.get("children");if(!children){throw"cannot replace() tree item with no children"
}if((amt<0)||(max>children.get("length"))){throw"replace() range must lie within a single tree item"
}children.replace(cur,amt,objects,operation);return this},observerContentDidChange:function(start,amt,delta){this.invalidateBranchObserversAt(start);
this._objectAtCache=this._outlineLevelCache=null;this._disclosureStateCache=null;
this._contentGroupIndexes=NO;this.notifyPropertyChange("branchIndexes");var oldlen=this.get("length"),newlen=this._computeLength(),parent=this.get("parentObserver"),set;
if(oldlen!==newlen){this.set("length",newlen)}if(!this._notifyParent){return this
}if(parent){set=SC.IndexSet.create(this.get("index"));parent._childrenRangeDidChange(parent.get("children"),null,"[]",set)
}else{if(oldlen===newlen){amt=this.expandChildIndex(start+amt);start=this.expandChildIndex(start);
amt=amt-start;delta=0}else{start=this.expandChildIndex(start);amt=newlen-start;delta=newlen-oldlen
}this.enumerableContentDidChange(start,amt,delta)}},expandChildIndex:function(index){var ret=index;
if(this.get("isHeaderVisible")){index++}var branches=this.get("branchIndexes");if(!branches||branches.get("length")===0){return ret
}branches.forEachIn(0,index,function(idx){ret+=this.branchObserverAt(idx).get("length")-1
},this);return ret},_contentGroupIndexes:NO,contentGroupIndexes:function(view,content){if(content!==this){return null
}var ret=this._contentGroupIndexes;if(ret!==NO){return ret}if(this.get("parentObserver")){return null
}var item=this.get("item"),group,indexes,len,cur,loc,children;if(item&&item.isTreeItemContent){group=item.get("treeItemIsGrouped")
}else{group=!!this.delegate.get("treeItemIsGrouped")}if(group){ret=SC.IndexSet.create();
indexes=this.get("branchIndexes");children=this.get("children");len=children?children.get("length"):0;
cur=loc=0;if(indexes){indexes.forEach(function(i){ret.add(cur,(i+1)-loc);cur+=(i+1)-loc;
loc=i+1;var observer=this.branchObserverAt(i);if(observer){cur+=observer.get("length")-1
}},this)}if(loc<len){ret.add(cur,len-loc)}}else{ret=null}this._contentGroupIndexes=ret;
return ret},contentIndexIsGroup:function(view,content,idx){var indexes=this.contentGroupIndexes(view,content);
return indexes?indexes.contains(idx):NO},contentIndexOutlineLevel:function(view,content,index){if(content!==this){return -1
}var cache=this._outlineLevelCache;if(cache&&(cache[index]!==undefined)){return cache[index]
}if(!cache){cache=this._outlineLevelCache=[]}var len=this.get("length"),cur=index,loc=0,ret=null,indexes,children,observer;
if(index>=len){return -1}if(this.get("isHeaderVisible")){if(index===0){return cache[0]=this.get("outlineLevel")-1
}else{cur--}}if(indexes=this.get("branchIndexes")){indexes.forEach(function(i){if((ret!==null)||(i>cur)){return
}var observer=this.branchObserverAt(i),len;if(!observer){return}len=observer.get("length");
if(i+len>cur){ret=observer.contentIndexOutlineLevel(view,observer,cur-i);cur=-1}else{cur-=len-1
}},this)}if(cur>=0){ret=this.get("outlineLevel")}cache[index]=ret;return ret},contentIndexDisclosureState:function(view,content,index){if(content!==this){return -1
}var cache=this._disclosureStateCache;if(cache&&(cache[index]!==undefined)){return cache[index]
}if(!cache){cache=this._disclosureStateCache=[]}var len=this.get("length"),cur=index,loc=0,ret=null,indexes,children,observer;
if(index>=len){return SC.LEAF_NODE}if(this.get("isHeaderVisible")){if(index===0){return cache[0]=this.get("disclosureState")
}else{cur--}}if(indexes=this.get("branchIndexes")){indexes.forEach(function(i){if((ret!==null)||(i>cur)){return
}var observer=this.branchObserverAt(i),len;if(!observer){return}len=observer.get("length");
if(i+len>cur){ret=observer.contentIndexDisclosureState(view,observer,cur-i);cur=-1
}else{cur-=len-1}},this)}if(cur>=0){ret=SC.LEAF_NODE}cache[index]=ret;return ret},contentIndexExpand:function(view,content,idx){var indexes,cur=idx,children,item;
if(content!==this){return}if(this.get("isHeaderVisible")){if(idx===0){this._expand(this.get("item"));
return}else{cur--}}if(indexes=this.get("branchIndexes")){indexes.forEach(function(i){if(i>=cur){return
}var observer=this.branchObserverAt(i),len;if(!observer){return}len=observer.get("length");
if(i+len>cur){observer.contentIndexExpand(view,observer,cur-i);cur=-1}else{cur-=len-1
}},this)}if(cur>=0){children=this.get("children");item=children?children.objectAt(cur):null;
if(item){this._expand(item,this.get("item"),cur)}}},contentIndexCollapse:function(view,content,idx){var indexes,children,item,cur=idx;
if(content!==this){return}if(this.get("isHeaderVisible")){if(idx===0){this._collapse(this.get("item"));
return}else{cur--}}if(indexes=this.get("branchIndexes")){indexes.forEach(function(i){if(i>=cur){return
}var observer=this.branchObserverAt(i),len;if(!observer){return}len=observer.get("length");
if(i+len>cur){observer.contentIndexCollapse(view,observer,cur-i);cur=-1}else{cur-=len-1
}},this)}if(cur>=0){children=this.get("children");item=children?children.objectAt(cur):null;
if(item){this._collapse(item,this.get("item"),cur)}}},branchObserverAt:function(index){var byIndex=this._branchObserversByIndex,indexes=this._branchObserverIndexes,ret,parent,pitem,item,children,guid,del;
if(!byIndex){byIndex=this._branchObserversByIndex=[]}if(!indexes){indexes=this._branchObserverIndexes=SC.IndexSet.create()
}if(ret=byIndex[index]){return ret}children=this.get("children");item=children?children.objectAt(index):null;
if(!item){return null}byIndex[index]=ret=SC.TreeItemObserver.create({item:item,delegate:this.get("delegate"),parentObserver:this,index:index,outlineLevel:this.get("outlineLevel")+1});
indexes.add(index);return ret},invalidateBranchObserversAt:function(index){var byIndex=this._branchObserversByIndex,indexes=this._branchObserverIndexes;
if(!byIndex||byIndex.length<=index){return this}if(index<0){index=0}indexes.forEachIn(index,indexes.get("max")-index,function(i){var observer=byIndex[i];
if(observer){observer.destroy()}},this);byIndex.length=index;return this},init:function(){arguments.callee.base.apply(this,arguments);
var item=this.get("item");if(!item){throw"SC.TreeItemObserver.item cannot be null"
}item.addObserver("*",this,this._itemPropertyDidChange);this._itemPropertyDidChange(item,"*");
this._notifyParent=YES},destroy:function(){this.invalidateBranchObserversAt(0);this._objectAtCache=null;
var item=this.get("item");if(item){item.removeObserver("*",this,this._itemPropertyDidChange)
}var children=this._children,ro=this._childrenRangeObserver;if(children&&ro){children.removeRangeObserver(ro)
}arguments.callee.base.apply(this,arguments)},_itemPropertyDidChange:function(target,key){var children=this.get("children"),state=this.get("disclosureState"),item=this.get("item"),next;
this.beginPropertyChanges();next=this._computeDisclosureState(item);if(state!==next){this.set("disclosureState",next)
}next=this._computeChildren(item);if(children!==next){this.set("children",next)}this.endPropertyChanges()
},_childrenDidChange:function(){var state=this.get("disclosureState"),cur=state===SC.BRANCH_OPEN?this.get("children"):null,last=this._children,ro=this._childrenRangeObserver;
if(last===cur){return this}if(ro){last.removeRangeObserver(ro)}if(cur){this._childrenRangeObserver=cur.addRangeObserver(null,this,this._childrenRangeDidChange)
}else{this._childrenRangeObserver=null}this._children=cur;this._childrenRangeDidChange(cur,null,"[]",null)
}.observes("children","disclosureState"),_childrenRangeDidChange:function(array,objects,key,indexes){var children=this.get("children"),len=children?children.get("length"):0,min=indexes?indexes.get("min"):0,max=indexes?indexes.get("max"):len,old=this._childrenLen||0;
this._childrenLen=len;this.observerContentDidChange(min,max-min,len-old)},_computeDisclosureState:function(item,pitem,index){var key,del;
if(!item||!this._computeChildren(item)){return SC.LEAF_NODE}else{if(item.isTreeItemContent){if(pitem===undefined){pitem=this.get("parentItem")
}if(index===undefined){index=this.get("index")}return item.treeItemDisclosureState(pitem,index)
}else{key=this._treeItemIsExpandedKey;if(!key){del=this.get("delegate");key=del?del.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=key}return item.get(key)?SC.BRANCH_OPEN:SC.BRANCH_CLOSED
}}},_collapse:function(item,pitem,index){var key,del;if(!item||!this._computeChildren(item)){return this
}else{if(item.isTreeItemContent){if(pitem===undefined){pitem=this.get("parentItem")
}if(index===undefined){index=this.get("index")}item.treeItemCollapse(pitem,index)
}else{key=this._treeItemIsExpandedKey;if(!key){del=this.get("delegate");key=del?del.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=key}item.setIfChanged(key,NO)}}return this},_expand:function(item,pitem,index){var key,del;
if(!item||!this._computeChildren(item)){return this}else{if(item.isTreeItemContent){if(pitem===undefined){pitem=this.get("parentItem")
}if(index===undefined){index=this.get("index")}item.treeItemExpand(pitem,index)}else{key=this._treeItemIsExpandedKey;
if(!key){del=this.get("delegate");key=del?del.get("treeItemIsExpandedKey"):"treeItemIsExpanded";
this._treeItemIsExpandedKey=key}item.setIfChanged(key,YES)}}return this},_computeChildren:function(item){var del,key;
if(!item){return null}else{if(item.isTreeItemContent){return item.get("treeItemChildren")
}else{key=this._treeItemChildrenKey;if(!key){del=this.get("delegate");key=del?del.get("treeItemChildrenKey"):"treeItemChildren";
this._treeItemChildrenKey=key}return item.get(key)}}},_computeLength:function(){var ret=this.get("isHeaderVisible")?1:0,state=this.get("disclosureState"),children=this.get("children"),indexes;
if((state===SC.BRANCH_OPEN)&&children){ret+=children.get("length");if(indexes=this.get("branchIndexes")){indexes.forEach(function(idx){var observer=this.branchObserverAt(idx);
ret+=observer.get("length")-1},this)}}return ret}});sc_require("private/tree_item_observer");
SC.TreeController=SC.ObjectController.extend(SC.SelectionSupport,{treeItemIsGrouped:NO,treeItemIsExpandedKey:"treeItemIsExpanded",treeItemChildrenKey:"treeItemChildren",arrangedObjects:function(){var ret,content=this.get("content");
if(content){ret=SC.TreeItemObserver.create({item:content,delegate:this})}else{ret=null
}this._sctc_arrangedObjects=ret;return ret}.property().cacheable(),_sctc_invalidateArrangedObjects:function(){this.propertyWillChange("arrangedObjects");
var ret=this._sctc_arrangedObjects;if(ret){ret.destroy()}this._sctc_arrangedObjects=null;
this.propertyDidChange("arrangedObjects")}.observes("content","treeItemIsExpandedKey","treeItemChildrenKey","treeItemIsGrouped"),_sctc_arrangedObjectsContentDidChange:function(){this.updateSelectionAfterContentChange()
}.observes("*arrangedObjects.[]"),canSelectGroups:NO,firstSelectableObject:function(){var objects=this.get("arrangedObjects"),indexes,len,idx=0;
if(!objects){return null}if(this.get("canSelectGroups")){return objects.get("firstObject")
}indexes=objects.contentGroupIndexes(null,objects);len=objects.get("length");while(indexes.contains(idx)&&(idx<len)){idx++
}return idx>=len?null:objects.objectAt(idx)}.property()});SC.Gesture=SC.Object.extend({name:"gesture",touchIsInGesture:function(touch,status){return NO
},touchStart:function(touch){},touchesDragged:function(evt,touches){},touchEnd:function(touch){},start:function(){if(!this.get("isActive")){this.set("isActive",YES);
var args=SC.$A(arguments);args.unshift(this);var act=this.name+"Start";if(this.view[act]){this.view[act].apply(this.view,args)
}}},end:function(){if(this.get("isActive")){this.set("isActive",NO);var args=SC.$A(arguments);
args.unshift(this);var act=this.name+"End";if(this.view[act]){this.view[act].apply(this.view,args)
}}},change:function(){if(this.get("isActive")){var args=SC.$A(arguments);args.unshift(this);
var act=this.name+"Changed";if(this.view[act]){this.view[act].apply(this.view,args)
}}},cancel:function(){if(this.get("isActive")){this.set("isActive",NO);var args=SC.$A(arguments);
args.unshift(this);var act=this.name+"Cancelled";if(this.view[act]){this.view[act].apply(this.view,args)
}}},trigger:function(){var args=SC.$A(arguments);args.unshift(this);var act=this.name;
if(this.view[act]){this.view[act].apply(this.view,args)}},take:function(touch){touch.isTaken=YES;
if(SC.none(touch.touchResponder)||touch.touchResponder!==this){touch.makeTouchResponder(this,YES)
}},release:function(touch){touch.isTaken=NO;if(touch.nextTouchResponder){touch.makeTouchResponder(touch.nextTouchResponder)
}},discardTouch:function(touch){touch.isTaken=YES;touch.makeTouchResponder(null)},statusForTouch:function(touch){var key=SC.guidFor(touch.view)+this.name;
var status=touch[key];if(!status){status=touch[key]={}}return status},unassignedTouchDidStart:function(touch){if(touch.isTaken){return
}if(this.touchIsInGesture(touch,this.statusForTouch(touch))){this.take(touch)}},unassignedTouchesDidChange:function(evt,touches){touches.forEach(function(touch){if(touch.isTaken){return
}if(this.touchIsInGesture(touch,this.statusForTouch(touch))){this.take(touch)}},this)
},unassignedTouchDidEnd:function(touch){},interestedInTouch:function(touch){var status=this.statusForTouch(touch);
if(status.isInterested){return}status.isInterested=YES;touch.isInteresting++},uninterestedInTouch:function(touch){var status=this.statusForTouch(touch);
if(!status.isInterested){return}status.isInterested=NO;touch.isInteresting--}});sc_require("system/gesture");
SC.PinchGesture=SC.Gesture.extend({name:"pinch",acceptsMultitouch:YES,scale:1,unassignedTouchesDidChange:function(evt,touches){if(touches.length==2){this.take(touches[0]);
this.take(touches[1])}},touchStart:function(touch){var touches=touch.touchesForResponder(this);
if(!touches||touches.length==0){return YES}else{if(touches.length==1){this.start([touches[0],touch]);
return YES}else{return NO}}},touchesDragged:function(evt,touches){var touch=touches.firstObject(),avg=touch.averagedTouchesForView(this);
if(avg.touchCount==2){if(!this._startDistance){this._startDistance=avg.d}this.scale=avg.d/this._startDistance;
this.change(touches,this.scale)}},touchEnd:function(touch){this._startDistance=null;
var touches=touch.touchesForResponder(this);this.trigger(touches,this.scale);this.end(touches,this.scale);
if(touches){touches.forEach(function(touch){this.release(touch)},this)}}});sc_require("system/gesture");
SC.SWIPE_HORIZONTAL="X";SC.SWIPE_VERTICAL="Y";SC.SWIPE_ANY="XY";SC.SWIPE_LEFT="LEFT";
SC.SWIPE_RIGHT="RIGHT";SC.SWIPE_UP="UP";SC.SWIPE_DOWN="DOWN";SC.SwipeGesture=SC.Gesture.extend({name:"swipe",acceptsMultitouch:YES,direction:SC.SWIPE_HORIZONTAL,currentDirection:null,startDistance:5,swipeDistance:40,tolerance:0.5,touchIsInGesture:function(touch,status){if(!status.flunked){var d=this.get("direction"),cd=this.get("currentDirection"),startDistance=this.get("startDistance"),deltaX=touch.pageX-touch.startX,deltaY=touch.pageY-touch.startY,absX=Math.abs(deltaX),absY=Math.abs(deltaY);
if(Math.abs(deltaX)>startDistance||Math.abs(deltaY)>startDistance){if(!cd){if(d==SC.SWIPE_ANY){if(absX>absY){cd=SC.SWIPE_HORIZONTAL
}else{if(absY>absX){cd=SC.SWIPE_VERTICAL}else{return NO}}}else{cd=d}this.set("currentDirection",cd)
}var delta=(cd==SC.SWIPE_HORIZONTAL)?deltaX:deltaY,oDelta=(cd==SC.SWIPE_HORIZONTAL)?deltaY:deltaX;
if(Math.abs(delta)*this.get("tolerance")>Math.abs(oDelta)){return YES}}}return NO
},touchStart:function(touch){var d=this.get("currentDirection"),delta=touch["page"+d]-touch["start"+d],swipeDirection;
if(delta<0){swipeDirection=(d===SC.SWIPE_HORIZONTAL)?SC.SWIPE_LEFT:SC.SWIPE_UP}else{swipeDirection=(d===SC.SWIPE_HORIZONTAL)?SC.SWIPE_RIGHT:SC.SWIPE_DOWN
}this.start(touch,swipeDirection,delta);return YES},touchesDragged:function(evt,touches){var touch=touches.firstObject();
var d=this.get("currentDirection"),o=(d===SC.SWIPE_HORIZONTAL?"Y":"X"),delta=touch["page"+d]-touch["start"+d],oDelta=touch["page"+o]-touch["start"+o],swipeDirection;
if(delta<0){swipeDirection=(d===SC.SWIPE_HORIZONTAL)?SC.SWIPE_LEFT:SC.SWIPE_UP}else{swipeDirection=(d===SC.SWIPE_HORIZONTAL)?SC.SWIPE_RIGHT:SC.SWIPE_DOWN
}if(Math.abs(delta)<this.get("startDistance")||Math.abs(delta)*this.get("tolerance")<Math.abs(oDelta)){this.release(touch);
var allTouches=touch.touchesForResponder(this);if(!allTouches||allTouches.length==0){this.cancel(touch,swipeDirection,delta)
}}else{this.change(touch,swipeDirection,delta)}},touchEnd:function(touch){var d=this.get("currentDirection"),o=(d===SC.SWIPE_HORIZONTAL?"Y":"X"),delta=touch["page"+d]-touch["start"+d],oDelta=touch["page"+o]-touch["start"+o],swipeDirection;
if(delta<0){swipeDirection=(d===SC.SWIPE_HORIZONTAL)?SC.SWIPE_LEFT:SC.SWIPE_UP}else{swipeDirection=(d===SC.SWIPE_HORIZONTAL)?SC.SWIPE_RIGHT:SC.SWIPE_DOWN
}if(Math.abs(delta)>this.get("swipeDistance")||Math.abs(delta)*this.get("tolerance")<Math.abs(oDelta)){this.trigger(touch,swipeDirection)
}this.end(touch,swipeDirection,delta);this.set("currentDirection",null);var touches=touch.touchesForResponder(this);
if(touches){touches.forEach(function(touch){this.release(touch)},this)}},cancel:function(){arguments.callee.base.apply(this,arguments);
this.set("currentDirection",null)}});sc_require("system/gesture");SC.TapGesture=SC.Gesture.extend({name:"tap",acceptsMultitouch:NO,_tapCount:null,_candidateTouch:null,_eventTimer:null,tapWiggle:10,tapDelay:200,touchIsInGesture:function(touch,status){return !status.tapFlunked
},touchStart:function(touch){if(this._eventTimer){this._eventTimer.invalidate()}if(this._candidateTouch&&this._candidateTouch.touch.identifier!==touch.identifier){this._cancelTap(touch);
return NO}this._candidateTouch={startTime:Date.now(),touch:touch};this.start(touch);
return YES},touchesDragged:function(evt,touches){var touch=touches[0];var tooManyTouches=(touches.length>1||!this._candidateTouch||touch.identifier!==this._candidateTouch.touch.identifier);
var touchMoved=this._calculateDragDistance(touch)>this.get("tapWiggle");if(tooManyTouches||touchMoved){this._cancelTap(touch)
}},touchEnd:function(touch){if(this._calculateDragDistance(touch)>this.get("tapWiggle")||Date.now()-this._candidateTouch.startTime>this.get("tapDelay")){this._cancelTap(touch)
}else{this._addTap(touch)}},_addTap:function(touch){var self=this;if(this._eventTimer){this._eventTimer.invalidate()
}this._tapCount=(this._tapCount||0)+1;this._candidateTouch=null;this._eventTimer=SC.Timer.schedule({target:self,action:function(){this._triggerTap(touch)
},interval:this.get("tapDelay")});this.change(touch,this._tapCount);this.trigger(touch,this._tapCount)
},_cancelTap:function(touch){this.statusForTouch(touch).tapFlunked=YES;this.cancel(touch,this._tapCount);
if(this._eventTimer){this._eventTimer.invalidate()}this._tapCount=null;this._candidateTouch=null;
this._eventTimer=null},_triggerTap:function(touch){this.end(touch,this._tapCount);
this._tapCount=null;this._candidateTouch=null;this._eventTimer=null},_calculateDragDistance:function(touch){return Math.sqrt(Math.pow(touch.pageX-touch.startX,2)+Math.pow(touch.pageY-touch.startY,2))
}});SC.AutoMixin={autoMixins:[],createChildView:function(v,attrs){if(!attrs){attrs={}
}attrs.owner=attrs.parentView=this;attrs.isVisibleInWindow=this.get("isVisibleInWindow");
if(!attrs.page){attrs.page=this.page}var applyMixins=this.get("autoMixins");applyMixins.push(attrs);
v=v.create.apply(v,applyMixins);return v}};SC.mixin({_copy_computed_props:["maxWidth","maxHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","fontFamily","fontSize","fontStyle","fontWeight","fontVariant","lineHeight","whiteSpace"],stringFromLayout:function(layout){var keys=["maxHeight","maxWidth","minHeight","minWidth","centerY","centerX","width","height","bottom","right","top","left"],keyValues=[],key,i=keys.length;
while(--i>=0){key=keys[i];if(layout.hasOwnProperty(key)){keyValues.push(key+":"+layout[key])
}}return"{"+keyValues.join(", ")+"}"},heightForString:function(str,width,style,classNames,ignoreEscape){var elem=this._heightCalcElement,classes,height;
if(!ignoreEscape){str=SC.RenderContext.escapeHTML(str)}classes=(classNames&&SC.typeOf(classNames)===SC.T_ARRAY)?classNames.join(" "):"";
if(!width){width=100}if(!elem){elem=this._heightCalcElement=document.createElement("div");
document.body.insertBefore(elem,null)}style=style+"; width: "+width+"px; left: "+(-1*width)+"px; position: absolute";
var cqElem=SC.$(elem);cqElem.attr("style",style);if(classes!==""){cqElem.attr("class",classes)
}elem.innerHTML=str;height=elem.clientHeight;elem=null;return height},prepareStringMeasurement:function(exampleElement,classNames){var element=this._metricsCalculationElement,classes,styles,style,cqElem;
classes=SC.A(classNames).join(" ");if(!element){var parentElement=document.createElement("div");
SC.mixin(parentElement.style,{position:"absolute",left:"0px",top:"0px",height:"0px",right:"0px",overflow:"hidden"});
element=this._metricsCalculationElement=document.createElement("div");parentElement.appendChild(element);
document.body.insertBefore(parentElement,null)}cqElem=SC.$(element);if(SC.typeOf(exampleElement)!=SC.T_STRING){var computed=null;
if(document.defaultView&&document.defaultView.getComputedStyle){computed=document.defaultView.getComputedStyle(exampleElement,null)
}else{computed=exampleElement.currentStyle}var props=this._copy_computed_props;for(var i=0;
i<props.length;i++){var prop=props[i],val=computed[prop];element.style[prop]=val}var cs=element.style;
if(cs.font===""){var font="";if(cs.fontStyle){font+=cs.fontStyle+" "}if(cs.fontVariant){font+=cs.fontVariant+" "
}if(cs.fontWeight){font+=cs.fontWeight+" "}if(cs.fontSize){font+=cs.fontSize}else{font+="10px"
}if(cs.lineHeight){font+="/"+cs.lineHeight}font+=" ";if(cs.fontFamily){font+=cs.fontFamily
}else{cs+="sans-serif"}element.style.font=font}SC.mixin(element.style,{left:"0px",top:"0px",position:"absolute",bottom:"auto",right:"auto",width:"auto",height:"auto"});
computed=null}else{style=exampleElement;cqElem.attr("style",style+"; position:absolute; left: 0px; top: 0px; bottom: auto; right: auto; width: auto; height: auto;")
}element.className=classes;element=null},teardownStringMeasurement:function(){var element=this._metricsCalculationElement;
element.innerHTML="";element.className="";element.setAttribute("style","");element=null
},measureString:function(string,ignoreEscape){if(!ignoreEscape){string=SC.RenderContext.escapeHTML(string)
}var element=this._metricsCalculationElement;if(!element){throw"measureString requires a string measurement environment to be set up. Did you mean metricsForString?"
}if(typeof element.innerText!="undefined"){element.innerText=string}else{element.textContent=string
}var result={width:element.clientWidth,height:element.clientHeight};element=null;
return result},metricsForString:function(string,exampleElement,classNames,ignoreEscape){SC.prepareStringMeasurement(exampleElement,classNames);
var result=SC.measureString(string,ignoreEscape);SC.teardownStringMeasurement();return result
}});sc_require("system/utils/string_measurement");SC.AutoResize={autoResizeField:"displayTitle",shouldAutoResize:YES,shouldMeasureSize:YES,shouldResizeWidth:YES,shouldResizeHeight:NO,measuredSize:{width:0,height:0},autoSizePadding:10,initMixin:function(){this.addObserver(this.get("autoResizeField"),this,this._scar_valueDidChange)
},batchResizeId:null,_SCAR_measurementPending:NO,_SCAR_requestedBatchResizeId:null,_SCAR_batchResizeIdDidChange:function(){var batchResizeId=this.get("batchResizeId"),requestedBatchResizeId=this._SCAR_requestedBatchResizeId;
if(this._SCAR_measurementPending&&this._SCAR_requestedBatchResizeId!==batchResizeId){SC.AutoResize.cancelResize(this,requestedBatchResizeId);
SC.AutoResize.requestResize(this,batchResizeId)}}.observes("batchResizeId"),measureSizeLater:function(){if(!this.get("shouldMeasureSize")){return
}var batchResizeId=this.get("batchResizeId");SC.AutoResize.requestResize(this,batchResizeId);
this._SCAR_measurementPending=YES;this._SCAR_requestedBatchResizeId=batchResizeId
},measureSize:function(batch){var metrics,layer,value=this.get(this.get("autoResizeField")),autoSizePadding,paddingHeight,paddingWidth;
if(SC.none(value)||value===""){metrics={width:0,height:0}}else{if(batch){metrics=SC.measureString(value)
}else{layer=this.kindOf(SC.TextFieldView)?this.$input()[0]:this.get("layer");if(!layer){return
}metrics=SC.metricsForString(value,layer)}}this.set("measuredSize",metrics);if(this.get("shouldAutoResize")){autoSizePadding=this.get("autoSizePadding");
if(SC.typeOf(autoSizePadding)===SC.T_NUMBER){paddingHeight=paddingWidth=autoSizePadding
}else{paddingHeight=autoSizePadding.height;paddingWidth=autoSizePadding.width}if(this.get("shouldResizeWidth")){this.adjust("width",metrics.width+paddingWidth)
}if(this.get("shouldResizeHeight")){this.adjust("height",metrics.height+paddingHeight)
}}this._SCAR_measurementPending=NO;return metrics},_scar_valueDidChange:function(){this.measureSizeLater()
},didCreateLayer:function(){this.measureSizeLater()},needResize:null,untaggedViews:null,requestResize:function(view,id){if(SC.none(id)){var untaggedViews=SC.AutoResize.untaggedViews||(SC.AutoResize.untaggedViews=SC.CoreSet.create());
untaggedViews.add(view)}else{var needResize=SC.AutoResize.needResize||(SC.AutoResize.needResize={}),views=needResize[id]||(needResize[id]=SC.CoreSet.create());
views.add(view)}SC.RunLoop.currentRunLoop.invokeLast(SC.AutoResize.doBatchResize)
},cancelResize:function(view,id){var set=SC.none(id)?SC.AutoResize.untaggedViews:SC.AutoResize.needResize[id];
if(set){set.remove(view)}},doBatchResize:function(){var tag,views,view,layer,batches;
batches=SC.AutoResize.needResize;for(tag in batches){views=batches[tag];while(view=views.pop()){layer=view.get("layer");
if(layer){SC.prepareStringMeasurement(layer);view.measureSize(YES);break}}while(view=views.pop()){view.measureSize(YES)
}SC.teardownStringMeasurement()}views=SC.AutoResize.untaggedViews;if(!views){return
}while(view=views.pop()){view.measureSize()}}};SC.Button={value:null,toggleOnValue:YES,toggleOffValue:NO,localize:NO,localizeBindingDefault:SC.Binding.bool(),title:"",contentTitleKey:null,icon:null,contentIconKey:null,needsEllipsis:YES,displayTitle:function(){var ret=this.get("title");
return(ret&&this.get("localize"))?ret.loc():(ret||"")}.property("title","localize").cacheable(),keyEquivalent:null,renderTitle:function(context,firstTime){var icon=this.get("icon"),image="",title=this.get("displayTitle"),needsTitle=(!SC.none(title)&&title.length>0),elem,htmlNode,imgTitle;
if(this.get("escapeHTML")){title=SC.RenderContext.escapeHTML(title)}if(icon){var blank=SC.BLANK_IMAGE_URL;
if(icon.indexOf("/")>=0){image='<img src="'+icon+'" alt="" class="icon" />'}else{image='<img src="'+blank+'" alt="" class="'+icon+'" />'
}needsTitle=YES}imgTitle=image+title;if(firstTime){if(this.get("needsEllipsis")){context.push('<label class="sc-button-label ellipsis">'+imgTitle+"</label>")
}else{context.push('<label class="sc-button-label">'+imgTitle+"</label>")}this._ImageTitleCached=imgTitle
}else{elem=this.$("label");if((htmlNode=elem[0])){if(needsTitle){elem.setClass("ellipsis",this.get("needsEllipsis"));
if(this._ImageTitleCached!==imgTitle){this._ImageTitleCached=imgTitle;htmlNode.innerHTML=imgTitle
}}else{htmlNode.innerHTML=""}}}return context},contentPropertyDidChange:function(target,key){var del=this.get("displayDelegate"),content=this.get("content"),value;
var valueKey=this.getDelegateProperty("contentValueKey",del);if(valueKey&&(key===valueKey||key==="*")){this.set("value",content?(content.get?content.get(valueKey):content[valueKey]):null)
}var titleKey=this.getDelegateProperty("contentTitleKey",del);if(titleKey&&(key===titleKey||key==="*")){this.set("title",content?(content.get?content.get(titleKey):content[titleKey]):null)
}var iconKey=this.getDelegateProperty("contentIconKey",del);if(iconKey&&(key===iconKey||key==="*")){this.set("icon",content?(content.get?content.get(iconKey):content[iconKey]):null)
}return this},_button_displayObserver:function(){this.displayDidChange()}.observes("title","icon","value"),performKeyEquivalent:function(keystring,evt){if(!this.get("isVisibleInWindow")){return NO
}if(!this.get("isEnabled")){return NO}var equiv=this.get("keyEquivalent");if(equiv){if(equiv===keystring){return this.triggerAction(evt)
}}else{if((this.get("isDefault")&&(keystring==="return"))||(this.get("isCancel")&&(keystring==="escape"))){return this.triggerAction(evt)
}}return NO},triggerAction:function(evt){throw"SC.Button.triggerAction() is not defined in %@".fmt(this)
},computeIsSelectedForValue:function(value){var targetValue=this.get("toggleOnValue"),state,next;
if(SC.typeOf(value)===SC.T_ARRAY){if(value.length===1){state=(value[0]==targetValue)
}else{state=null;value.find(function(x){next=(x==targetValue);if(state===null){state=next
}else{if(next!==state){state=SC.MIXED_STATE}}return state===SC.MIXED_STATE})}}else{if(value===SC.MIXED_STATE){state=SC.MIXED_STATE
}else{state=(value===targetValue)}}return state},initMixin:function(){if(!SC.none(this.get("value"))){this._button_valueDidChange()
}},_button_valueDidChange:function(){var value=this.get("value"),state=this.computeIsSelectedForValue(value);
this.set("isSelected",state)}.observes("value"),_button_isSelectedDidChange:function(){var newState=this.get("isSelected"),curState=this.computeIsSelectedForValue(this.get("value"));
if((newState!==SC.MIXED_STATE)&&(curState!==newState)){var valueKey=(newState)?"toggleOnValue":"toggleOffValue";
this.set("value",this.get(valueKey))}}.observes("isSelected")};SC.ContentDisplay={concatenatedProperties:"contentDisplayProperties",displayProperties:["content"],contentDisplayProperties:[],initMixin:function(){this._display_contentDidChange()
},destroyMixin:function(){if(!this._display_content){return}this._display_stopObservingContent(this._display_content);
this._display_content=null},_display_beginObservingContent:function(content){var f=this._display_contentPropertyDidChange;
if(SC.isArray(content)){content.invoke("addObserver","*",this,f)}else{if(content.addObserver){content.addObserver("*",this,f)
}}},_display_stopObservingContent:function(content){var f=this._display_contentPropertyDidChange;
if(SC.isArray(content)){content.invoke("removeObserver","*",this,f)}else{if(content.removeObserver){content.removeObserver("*",this,f)
}}},_display_contentDidChange:function(target,key,value){if((value=this.get("content"))===this._display_content){return
}var content=this._display_content;if(content){this._display_stopObservingContent(content)
}content=this._display_content=value;if(content){this._display_beginObservingContent(content)
}this.displayDidChange()}.observes("content","contentDisplayProperties"),_display_contentPropertyDidChange:function(target,key,value,propertyRevision){if(key==="*"){this.displayDidChange()
}else{var ary=this.get("contentDisplayProperties");if(ary&&ary.indexOf(key)>=0){this.displayDidChange()
}}}};SC.STRING_TITLEIZE_REGEXP=(/([\s|\-|\_|\n])([^\s|\-|\_|\n]?)/g);SC.STRING_HUMANIZE_REGEXP=(/[\-_]/g);
SC.STRING_TRIM_REGEXP=(/^\s+|\s+$/g);SC.STRING_TRIM_LEFT_REGEXP=(/^\s+/g);SC.STRING_TRIM_RIGHT_REGEXP=(/\s+$/g);
SC.STRING_REGEXP_ESCAPED_REGEXP=(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g);SC.STRING_DASHERIZE_CACHE={top:"top",left:"left",right:"right",bottom:"bottom",width:"width",height:"height",minWidth:"min-width",maxWidth:"max-width"};
SC.INFLECTION_CONSTANTS={PLURAL:[[/(quiz)$/i,"$1zes"],[/^(ox)$/i,"$1en"],[/([m|l])ouse$/i,"$1ice"],[/(matr|vert|ind)ix|ex$/i,"$1ices"],[/(x|ch|ss|sh)$/i,"$1es"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/(hive)$/i,"$1s"],[/(?:([^f])fe|([lr])f)$/i,"$1$2ves"],[/sis$/i,"ses"],[/([ti])um$/i,"$1a"],[/(buffal|tomat)o$/i,"$1oes"],[/(bu)s$/i,"$1ses"],[/(alias|status)$/i,"$1es"],[/(octop|vir)us$/i,"$1i"],[/(ax|test)is$/i,"$1es"],[/s$/i,"s"],[/$/,"s"]],SINGULAR:[[/(quiz)zes$/i,"$1"],[/(matr)ices$/i,"$1ix"],[/(vert|ind)ices$/i,"$1ex"],[/^(ox)en/i,"$1"],[/(alias|status)es$/i,"$1"],[/(octop|vir)i$/i,"$1us"],[/(cris|ax|test)es$/i,"$1is"],[/(shoe)s$/i,"$1"],[/(o)es$/i,"$1"],[/(bus)es$/i,"$1"],[/([m|l])ice$/i,"$1ouse"],[/(x|ch|ss|sh)es$/i,"$1"],[/(m)ovies$/i,"$1ovie"],[/(s)eries$/i,"$1eries"],[/([^aeiouy]|qu)ies$/i,"$1y"],[/([lr])ves$/i,"$1f"],[/(tive)s$/i,"$1"],[/(hive)s$/i,"$1"],[/([^f])ves$/i,"$1fe"],[/(^analy)ses$/i,"$1sis"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i,"$1$2sis"],[/([ti])a$/i,"$1um"],[/(n)ews$/i,"$1ews"],[/s$/i,""]],IRREGULAR:[["move","moves"],["sex","sexes"],["child","children"],["man","men"],["person","people"]],UNCOUNTABLE:["sheep","fish","series","species","money","rice","information","info","equipment"]};
SC.StringInflections={capitalizeEach:function(){return this.replace(SC.STRING_TITLEIZE_REGEXP,function(str,sep,character){return(character)?(sep+character.toUpperCase()):sep
}).capitalize()},titleize:function(){var ret=this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2");
return ret.replace(SC.STRING_TITLEIZE_REGEXP,function(str,separater,character){return(character)?(" "+character.toUpperCase()):" "
}).capitalize()},classify:function(){var ret=this.replace(SC.STRING_TITLEIZE_REGEXP,function(str,separater,character){return(character)?character.toUpperCase():""
});var first=ret.charAt(0),upper=first.toUpperCase();return(first!==upper)?(upper+ret.slice(1)):ret
},humanize:function(){return this.decamelize().replace(SC.STRING_HUMANIZE_REGEXP," ")
},escapeForRegExp:function(){return this.replace(SC.STRING_REGEXP_ESCAPED_REGEXP,"\\$1")
},removeDiacritics:function(){var diacriticMappingTable=SC.diacriticMappingTable;
if(!diacriticMappingTable){SC.diacriticMappingTable={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ā":"A","Ă":"A","Ą":"A","Ǎ":"A","Ǟ":"A","Ǡ":"A","Ǻ":"A","Ȁ":"A","Ȃ":"A","Ȧ":"A","Ḁ":"A","Ạ":"A","Ả":"A","Ấ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ậ":"A","Ắ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ặ":"A","Å":"A","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ç":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ḉ":"C","Ď":"D","Ḋ":"D","Ḍ":"D","Ḏ":"D","Ḑ":"D","Ḓ":"D","È":"E","É":"E","Ê":"E","Ë":"E","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ȩ":"E","Ḕ":"E","Ḗ":"E","Ḙ":"E","Ḛ":"E","Ḝ":"E","Ẹ":"E","Ẻ":"E","Ẽ":"E","Ế":"E","Ề":"E","Ể":"E","Ễ":"E","Ệ":"E","Ḟ":"F","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","Ǧ":"G","Ǵ":"G","Ḡ":"G","Ĥ":"H","Ȟ":"H","Ḣ":"H","Ḥ":"H","Ḧ":"H","Ḩ":"H","Ḫ":"H","Ì":"I","Í":"I","Î":"I","Ï":"I","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ḭ":"I","Ḯ":"I","Ỉ":"I","Ị":"I","Ĵ":"J","Ķ":"K","Ǩ":"K","Ḱ":"K","Ḳ":"K","Ḵ":"K","Ĺ":"L","Ļ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ḻ":"L","Ḽ":"L","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ñ":"N","Ń":"N","Ņ":"N","Ň":"N","Ǹ":"N","Ṅ":"N","Ṇ":"N","Ṉ":"N","Ṋ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ō":"O","Ŏ":"O","Ő":"O","Ơ":"O","Ǒ":"O","Ǫ":"O","Ǭ":"O","Ȍ":"O","Ȏ":"O","Ȫ":"O","Ȭ":"O","Ȯ":"O","Ȱ":"O","Ṍ":"O","Ṏ":"O","Ṑ":"O","Ṓ":"O","Ọ":"O","Ỏ":"O","Ố":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ộ":"O","Ớ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ợ":"O","Ṕ":"P","Ṗ":"P","Ŕ":"R","Ŗ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ṟ":"R","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṥ":"S","Ṧ":"S","Ṩ":"S","Ţ":"T","Ť":"T","Ț":"T","Ṫ":"T","Ṭ":"T","Ṯ":"T","Ṱ":"T","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","Ư":"U","Ǔ":"U","Ǖ":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ȕ":"U","Ȗ":"U","Ṳ":"U","Ṵ":"U","Ṷ":"U","Ṹ":"U","Ṻ":"U","Ụ":"U","Ủ":"U","Ứ":"U","Ừ":"U","Ử":"U","Ữ":"U","Ự":"U","Ṽ":"V","Ṿ":"V","Ŵ":"W","Ẁ":"W","Ẃ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẋ":"X","Ẍ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ȳ":"Y","Ẏ":"Y","Ỳ":"Y","Ỵ":"Y","Ỷ":"Y","Ỹ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","Ẑ":"Z","Ẓ":"Z","Ẕ":"Z","`":"`","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ā":"a","ă":"a","ą":"a","ǎ":"a","ǟ":"a","ǡ":"a","ǻ":"a","ȁ":"a","ȃ":"a","ȧ":"a","ḁ":"a","ạ":"a","ả":"a","ấ":"a","ầ":"a","ẩ":"a","ẫ":"a","ậ":"a","ắ":"a","ằ":"a","ẳ":"a","ẵ":"a","ặ":"a","ḃ":"b","ḅ":"b","ḇ":"b","ç":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ḉ":"c","ď":"d","ḋ":"d","ḍ":"d","ḏ":"d","ḑ":"d","ḓ":"d","è":"e","é":"e","ê":"e","ë":"e","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","ȅ":"e","ȇ":"e","ȩ":"e","ḕ":"e","ḗ":"e","ḙ":"e","ḛ":"e","ḝ":"e","ẹ":"e","ẻ":"e","ẽ":"e","ế":"e","ề":"e","ể":"e","ễ":"e","ệ":"e","ḟ":"f","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","ǧ":"g","ǵ":"g","ḡ":"g","ĥ":"h","ȟ":"h","ḣ":"h","ḥ":"h","ḧ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ì":"i","í":"i","î":"i","ï":"i","ĩ":"i","ī":"i","ĭ":"i","į":"i","ǐ":"i","ȉ":"i","ȋ":"i","ḭ":"i","ḯ":"i","ỉ":"i","ị":"i","ĵ":"j","ǰ":"j","ķ":"k","ǩ":"k","ḱ":"k","ḳ":"k","ḵ":"k","ĺ":"l","ļ":"l","ľ":"l","ḷ":"l","ḹ":"l","ḻ":"l","ḽ":"l","ḿ":"m","ṁ":"m","ṃ":"m","ñ":"n","ń":"n","ņ":"n","ň":"n","ǹ":"n","ṅ":"n","ṇ":"n","ṉ":"n","ṋ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ō":"o","ŏ":"o","ő":"o","ơ":"o","ǒ":"o","ǫ":"o","ǭ":"o","ȍ":"o","ȏ":"o","ȫ":"o","ȭ":"o","ȯ":"o","ȱ":"o","ṍ":"o","ṏ":"o","ṑ":"o","ṓ":"o","ọ":"o","ỏ":"o","ố":"o","ồ":"o","ổ":"o","ỗ":"o","ộ":"o","ớ":"o","ờ":"o","ở":"o","ỡ":"o","ợ":"o","ṕ":"p","ṗ":"p","ŕ":"r","ŗ":"r","ř":"r","ȑ":"r","ȓ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ṟ":"r","ś":"s","ŝ":"s","ş":"s","š":"s","ș":"s","ṡ":"s","ṣ":"s","ṥ":"s","ṧ":"s","ṩ":"s","ţ":"t","ť":"t","ț":"t","ṫ":"t","ṭ":"t","ṯ":"t","ṱ":"t","ẗ":"t","ù":"u","ú":"u","û":"u","ü":"u","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","ư":"u","ǔ":"u","ǖ":"u","ǘ":"u","ǚ":"u","ǜ":"u","ȕ":"u","ȗ":"u","ṳ":"u","ṵ":"u","ṷ":"u","ṹ":"u","ṻ":"u","ụ":"u","ủ":"u","ứ":"u","ừ":"u","ử":"u","ữ":"u","ự":"u","ṽ":"v","ṿ":"v","ŵ":"w","ẁ":"w","ẃ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẘ":"w","ẋ":"x","ẍ":"x","ý":"y","ÿ":"y","ŷ":"y","ȳ":"y","ẏ":"y","ẙ":"y","ỳ":"y","ỵ":"y","ỷ":"y","ỹ":"y","ź":"z","ż":"z","ž":"z","ẑ":"z","ẓ":"z","ẕ":"z"};
diacriticMappingTable=SC.diacriticMappingTable}var original,replacement,ret="",length=this.length;
for(var i=0;i<=length;++i){original=this.charAt(i);replacement=diacriticMappingTable[original];
if(replacement){ret+=replacement}else{ret+=original}}return ret},trim:function(){return this.replace(SC.STRING_TRIM_REGEXP,"")
},trimLeft:function(){return this.replace(SC.STRING_TRIM_LEFT_REGEXP,"")},trimRight:function(){return this.replace(SC.STRING_TRIM_RIGHT_REGEXP,"")
},pluralize:function(){var idx,len,compare=this.split(/\s/).pop(),restOfString=this.replace(compare,""),isCapitalized=compare.charAt(0).match(/[A-Z]/)?true:false;
compare=compare.toLowerCase();for(idx=0,len=SC.INFLECTION_CONSTANTS.UNCOUNTABLE.length;
idx<len;idx++){var uncountable=SC.INFLECTION_CONSTANTS.UNCOUNTABLE[idx];if(compare==uncountable){return this.toString()
}}for(idx=0,len=SC.INFLECTION_CONSTANTS.IRREGULAR.length;idx<len;idx++){var singular=SC.INFLECTION_CONSTANTS.IRREGULAR[idx][0],plural=SC.INFLECTION_CONSTANTS.IRREGULAR[idx][1];
if((compare==singular)||(compare==plural)){if(isCapitalized){plural=plural.capitalize()
}return restOfString+plural}}for(idx=0,len=SC.INFLECTION_CONSTANTS.PLURAL.length;
idx<len;idx++){var regex=SC.INFLECTION_CONSTANTS.PLURAL[idx][0],replace_string=SC.INFLECTION_CONSTANTS.PLURAL[idx][1];
if(regex.test(compare)){return this.replace(regex,replace_string)}}},singularize:function(){var idx,len,compare=this.split(/\s/).pop(),restOfString=this.replace(compare,""),isCapitalized=compare.charAt(0).match(/[A-Z]/)?true:false;
compare=compare.toLowerCase();for(idx=0,len=SC.INFLECTION_CONSTANTS.UNCOUNTABLE.length;
idx<len;idx++){var uncountable=SC.INFLECTION_CONSTANTS.UNCOUNTABLE[idx];if(compare==uncountable){return this.toString()
}}for(idx=0,len=SC.INFLECTION_CONSTANTS.IRREGULAR.length;idx<len;idx++){var singular=SC.INFLECTION_CONSTANTS.IRREGULAR[idx][0],plural=SC.INFLECTION_CONSTANTS.IRREGULAR[idx][1];
if((compare==singular)||(compare==plural)){if(isCapitalized){singular=singular.capitalize()
}return restOfString+singular}}for(idx=0,len=SC.INFLECTION_CONSTANTS.SINGULAR.length;
idx<len;idx++){var regex=SC.INFLECTION_CONSTANTS.SINGULAR[idx][0],replace_string=SC.INFLECTION_CONSTANTS.SINGULAR[idx][1];
if(regex.test(compare)){return this.replace(regex,replace_string)}}}};SC.String.strip=SC.String.trim;
SC.supplement(SC.String,SC.StringInflections);SC.supplement(String.prototype,SC.StringInflections);
sc_require("mixins/string");SC.AUTO_CONTROL_SIZE="__AUTO__";SC.JUMBO_CONTROL_SIZE="sc-jumbo-size";
SC.HUGE_CONTROL_SIZE="sc-huge-size";SC.LARGE_CONTROL_SIZE="sc-large-size";SC.REGULAR_CONTROL_SIZE="sc-regular-size";
SC.SMALL_CONTROL_SIZE="sc-small-size";SC.TINY_CONTROL_SIZE="sc-tiny-size";SC.Control={isControl:YES,initMixin:function(){this._control_contentDidChange()
},isSelected:NO,isSelectedBindingDefault:SC.Binding.oneWay().bool(),isActive:NO,isActiveBindingDefault:SC.Binding.oneWay().bool(),value:null,content:null,contentValueKey:null,contentPropertyDidChange:function(target,key){return this.updatePropertyFromContent("value",key,"contentValueKey",target)
},updatePropertyFromContent:function(prop,key,contentKey,content){var del,v;if(contentKey===undefined){contentKey="content"+prop.capitalize()+"Key"
}if(this[contentKey]){contentKey=this.get(contentKey)}else{if((del=this.displayDelegate)&&(v=del[contentKey])){contentKey=del.get?del.get(contentKey):v
}else{return this}}if(key==="*"||key===contentKey){if(content===undefined){content=this.get("content")
}if(content){v=content.get?content.get(contentKey):content[contentKey]}else{v=null
}this.set(prop,v)}return this},updateContentWithValueObserver:function(){var key=this.contentValueKey?this.get("contentValueKey"):this.getDelegateProperty("contentValueKey",this.displayDelegate),content=this.get("content");
if(!key||!content){return}var value=this.get("value");if(typeof content.setIfChanged===SC.T_FUNCTION){content.setIfChanged(key,value)
}else{if(content[key]!==value){content[key]=value}}}.observes("value"),fieldKey:null,fieldLabel:null,errorLabel:function(){var ret,fk,def;
if(ret=this.get("fieldLabel")){return ret}fk=this.get("fieldKey")||this.constructor.toString();
def=(fk||"").humanize().capitalize();return"ErrorLabel."+fk.locWithDefault(("FieldKey."+fk).locWithDefault(def))
}.property("fieldLabel","fieldKey").cacheable(),controlSize:SC.REGULAR_CONTROL_SIZE,displayProperties:"isEnabled isSelected isActive controlSize".w(),_CONTROL_TMP_CLASSNAMES:{},renderMixin:function(context,firstTime){var sel=this.get("isSelected"),disabled=!this.get("isEnabled"),names=this._CONTROL_TMP_CLASSNAMES;
names.mixed=sel===SC.MIXED_STATE;names.sel=sel&&(sel!==SC.MIXED_STATE);names.active=this.get("isActive");
var controlSize=this.get("controlSize");if(firstTime){context.setClass(names);if(controlSize!==SC.AUTO_CONTROL_SIZE){context.addClass(controlSize)
}}else{context.$().setClass(names);if(controlSize!==SC.AUTO_CONTROL_SIZE){context.$().addClass(controlSize)
}}if(!firstTime&&this.$input){var inps=this.$input();if(inps.attr("type")!=="radio"){this.$input().attr("disabled",disabled)
}}},_control_content:null,_control_contentDidChange:function(){var content=this.get("content");
if(this._control_content===content){return}var f=this.contentPropertyDidChange,old=this._control_content;
if(old&&old.removeObserver){old.removeObserver("*",this,f)}this._control_content=content;
if(content&&content.addObserver){content.addObserver("*",this,f)}this.contentPropertyDidChange(content,"*")
}.observes("content"),_control_contentValueKeyDidChange:function(){this.contentPropertyDidChange(this.get("content"),"*")
}.observes("contentValueKey")};SC.Editable={editorDelegate:null,isEditable:NO,isEditing:NO,beginEditing:function(){if(!this.get("isEditable")){return NO
}if(this.get("isEditing")){return YES}this.beginPropertyChanges();this.set("isEditing",YES);
this.becomeFirstResponder();this.endPropertyChanges();return YES},discardEditing:function(){return !this.get("isEditing")
},commitEditing:function(){if(!this.get("isEditing")){return YES}this.set("isEditing",NO);
this.resignFirstResponder();this.invokeDelegateMethod(this.get("editorDelegate"),"inlineEditorShouldCommitEditing",this,this.get("value"));
return YES}};SC.ALIGN_JUSTIFY="justify";SC.FlowedLayout={layoutDirection:SC.LAYOUT_HORIZONTAL,autoResize:YES,shouldResizeWidth:YES,shouldResizeHeight:YES,align:SC.ALIGN_LEFT,canWrap:YES,defaultFlowSpacing:{left:0,bottom:0,top:0,right:0},flowPadding:{left:0,bottom:0,right:0,top:0},_scfl_validFlowPadding:function(){var padding=this.get("flowPadding")||{},ret={};
ret.left=padding.left||0;ret.top=padding.top||0;ret.bottom=padding.bottom||0;ret.right=padding.right||0;
return ret}.property("flowPadding").cacheable(),concatenatedProperties:["childMixins"],initMixin:function(){this.invokeOnce("_scfl_tile")
},_scfl_childViewsDidChange:function(c){this.invokeOnce("_scfl_tile")}.observes("childViews"),_scfl_layoutPropertyDidChange:function(){this.invokeOnce("_scfl_tile")
},layoutDidChangeFor:function(c){if(!this._scfl_itemLayouts){return arguments.callee.base.apply(this,arguments)
}var l=this._scfl_itemLayouts[SC.guidFor(c)],cl=c.get("layout"),f=c.get("frame");
if(!l){return arguments.callee.base.apply(this,arguments)}var same=YES;if(l.left&&l.left!==cl.left){same=NO
}else{if(l.top&&l.top!==cl.top){same=NO}else{if(!c.get("fillWidth")&&l.width&&l.width!==cl.width){same=NO
}else{if(!l.width&&!c.get("fillWidth")&&f.width!==c._scfl_lastFrame.width){same=NO
}else{if(!c.get("fillHeight")&&l.height&&l.height!==cl.height){same=NO}else{if(!l.height&&!c.get("fillHeight")&&f.height!==c._scfl_lastFrame.height){same=NO
}}}}}}if(same){return arguments.callee.base.apply(this,arguments)}this.invokeOnce("_scfl_tile");
arguments.callee.base.apply(this,arguments)},observeChildLayout:function(c){if(c._scfl_isBeingObserved){return
}c._scfl_isBeingObserved=YES;c.addObserver("isVisible",this,"_scfl_layoutPropertyDidChange");
c.addObserver("useAbsoluteLayout",this,"_scfl_layoutPropertyDidChange");c.addObserver("calculatedWidth",this,"_scfl_layoutPropertyDidChange");
c.addObserver("calculatedHeight",this,"_scfl_layoutPropertyDidChange");c.addObserver("startsNewRow",this,"_scfl_layoutPropertyDidChange")
},unobserveChildLayout:function(c){c._scfl_isBeingObserved=NO;c.removeObserver("isVisible",this,"_scfl_layoutPropertyDidChange");
c.removeObserver("useAbsoluteLayout",this,"_scfl_layoutPropertyDidChange");c.removeObserver("calculatedWidth",this,"_scfl_layoutPropertyDidChange");
c.removeObserver("calculatedHeight",this,"_scfl_layoutPropertyDidChange");c.removeObserver("startsNewRow",this,"_scfl_layoutPropertyDidChange")
},shouldIncludeChildInFlow:function(c){return c.get("isVisible")&&!c.get("useAbsoluteLayout")
},flowSpacingForView:function(idx,view){var spacing=view.get("flowSpacing");if(SC.none(spacing)){spacing=this.get("defaultFlowSpacing")
}if(SC.typeOf(spacing)===SC.T_NUMBER){spacing={left:spacing,right:spacing,bottom:spacing,top:spacing}
}else{spacing.left=spacing.left||0;spacing.right=spacing.right||0;spacing.top=spacing.top||0;
spacing.bottom=spacing.bottom||0}return spacing},flowSizeForView:function(idx,view){var cw=view.get("calculatedWidth"),ch=view.get("calculatedHeight");
var calc={},f=view.get("frame");view._scfl_lastFrame=f;if(cw){calc.width=cw}else{if(view._scfl_cachedCalculatedFlowSize&&view._scfl_cachedCalculatedFlowSize.width==f.width){calc.width=view._scfl_cachedFlowSize.width
}else{calc.width=f.width}}if(ch){calc.height=ch}else{if(view._scfl_cachedCalculatedFlowSize&&view._scfl_cachedCalculatedFlowSize.height==f.height){calc.height=view._scfl_cachedFlowSize.height
}else{calc.height=f.height}}if(view.get("isSpacer")){if(this.get("layoutDirection")===SC.LAYOUT_HORIZONTAL){calc.width=0
}else{calc.height=0}}if(this.get("layoutDirection")===SC.LAYOUT_HORIZONTAL&&view.get("fillHeight")){calc.height=0
}else{if(this.get("layoutDirection")===SC.LAYOUT_VERTICAL&&view.get("fillWidth")){calc.width=0
}}return calc},flowRow:function(row,rowOffset,rowSize,availableRowLength,padding,primary,secondary,align){if(primary==="left"){availableRowLength-=padding.left+padding.right
}else{availableRowLength-=padding.top+padding.bottom}var item,len=row.length,idx,layout,rowLength=0,totalSpaceUnits=0,spacePerUnit=0;
for(idx=0;idx<len;idx++){item=row[idx];if(item.get("isSpacer")){totalSpaceUnits+=item.get("spaceUnits")||1
}else{rowLength+=item._scfl_cachedSpacedSize[primary==="left"?"width":"height"]}}if(len>1&&align===SC.ALIGN_JUSTIFY){totalSpaceUnits+=len-1
}if(totalSpaceUnits>0){spacePerUnit=(availableRowLength-rowLength)/totalSpaceUnits;
rowLength=availableRowLength}var x=padding.left,y=padding.top,width,height,itemSize=0;
if(primary==="left"){y=rowOffset}else{x=rowOffset}if(align===SC.ALIGN_RIGHT||align===SC.ALIGN_BOTTOM){if(primary==="left"){x=(availableRowLength-rowLength-padding.right)
}else{y=(availableRowLength-rowLength-padding.bottom)}}else{if(align===SC.ALIGN_CENTER||align===SC.ALIGN_MIDDLE){if(primary==="left"){x=(availableRowLength-padding.top-padding.bottom)/2-rowLength/2
}else{y=(availableRowLength-padding.top-padding.bottom)/2-rowLength/2}}}for(idx=0;
idx<len;idx++){item=row[idx];width=undefined;height=undefined;if(item.get("fillHeight")&&primary==="left"){height=rowSize-item._scfl_cachedSpacedSize.height
}if(item.get("fillWidth")&&primary==="top"){width=rowSize-item._scfl_cachedSpacedSize.width
}if(item.get("isSpacer")){itemSize=item._scfl_cachedSpacedSize[primary==="left"?"width":"height"];
itemSize=Math.max(itemSize,spacePerUnit*(item.get("spaceUnits")||1));if(primary==="left"){width=itemSize
}else{height=itemSize}}else{if(primary==="left"){itemSize=item._scfl_cachedSpacedSize.width
}else{itemSize=item._scfl_cachedSpacedSize.height}}this.flowPositionView(idx,item,x,y,width,height);
if(primary==="left"){x+=itemSize}else{y+=itemSize}if(align===SC.ALIGN_JUSTIFY){if(primary==="left"){x+=spacePerUnit
}else{y+=spacePerUnit}}}if(primary==="left"){return x}return y},flowPositionView:function(idx,item,x,y,width,height){var last=this._scfl_itemLayouts[SC.guidFor(item)],spacing=item._scfl_cachedSpacing;
var l={left:x+spacing.left,top:y+spacing.top};if(width!==undefined){l.width=width
}if(height!==undefined){l.height=height}this._scfl_itemLayouts[SC.guidFor(item)]=l;
if(last&&last.left==l.left&&last.top==l.top&&last.width==l.width&&l.width!==undefined&&last.height==l.height&&l.height!==undefined){return
}item.adjust(l)},renderMixin:function(context){context.css("minWidth",this.get("calculatedWidth"));
context.css("minHeight",this.get("calculatedHeight"))},clippingFrame:function(){var ret=arguments.callee.base.apply(this,arguments),cw=this.get("calculatedWidth"),ch=this.get("calculatedHeight");
if(cw){ret.width=cw}if(ch){ret.height=ch}return ret}.property("calculatedWidth","calculatedHeight"),_scfl_calculatedSizeDidChange:function(){var elem=this.$(),cw=this.get("calculatedWidth"),ch=this.get("calculatedHeight");
if(cw){elem.css("minWidth",this.get("calculatedWidth"))}if(ch){elem.css("minHeight",this.get("calculatedHeight"))
}}.observes("calculatedWidth","calculatedHeight"),_scfl_tile:function(){if(!this._scfl_itemLayouts){this._scfl_itemLayouts={}
}var isObserving=this._scfl_isObserving||SC.CoreSet.create(),nowObserving=SC.CoreSet.create();
var children=this.get("childViews"),child,idx,len=children.length,rows=[],row=[],startRowSize=0,rowSize=0,startsNewRow,newRowPending=NO,rowOffset=0,itemOffset=0,width=this.get("frame").width,height=this.get("frame").height,canWrap=this.get("canWrap"),layoutDirection=this.get("layoutDirection"),padding=this.get("_scfl_validFlowPadding"),childSize,childSpacing,childSpacedSize,align=this.get("align"),longestRow=0;
var primary,primary_os,primary_d,secondary,secondary_os,secondary_d,flowLimit,availableRowLength;
if(layoutDirection===SC.LAYOUT_HORIZONTAL){availableRowLength=width;flowLimit=width-padding.right;
primary="left";secondary="top";primary_os="right";secondary_os="bottom";primary_d="width";
secondary_d="height"}else{availableRowLength=height;flowLimit=height-padding.bottom;
primary="top";secondary="left";primary_os="bottom";secondary_os="right";primary_d="height";
secondary_d="width"}rowOffset=padding[secondary];itemOffset=padding[primary];for(idx=0;
idx<len;idx++){child=children[idx];isObserving.remove(SC.guidFor(child));nowObserving.add(child);
startsNewRow=child.get("startsNewRow");if(!this.shouldIncludeChildInFlow(child)){newRowPending=startsNewRow||newRowPending;
continue}childSize=this.flowSizeForView(idx,child);childSpacing=this.flowSpacingForView(idx,child);
childSpacedSize={width:childSize.width+childSpacing.left+childSpacing.right,height:childSize.height+childSpacing.top+childSpacing.bottom};
child._scfl_cachedFlowSize=childSize;child._scfl_cachedSpacedSize=childSpacedSize;
child._scfl_cachedSpacing=childSpacing;if(startsNewRow||newRowPending||(canWrap&&row.length>0&&itemOffset+childSize[primary_d]>=flowLimit)){newRowPending=NO;
this.flowRow(row,rowOffset,rowSize,availableRowLength,padding,primary,secondary,align);
row=[];rows.push(row);rowOffset+=rowSize;rowSize=startRowSize;itemOffset=padding[primary]
}row.push(child);rowSize=Math.max(childSpacedSize[secondary_d],rowSize);itemOffset+=childSpacedSize[primary_d];
longestRow=Math.max(longestRow,itemOffset)}itemOffset=this.flowRow(row,rowOffset,rowSize,availableRowLength,padding,primary,secondary,align);
longestRow=Math.max(longestRow,itemOffset);this._scfl_lastFrameSize=this.get("frame");
if(this.get("autoResize")){if(longestRow){if(layoutDirection===SC.LAYOUT_HORIZONTAL){if(this.get("shouldResizeWidth")){this.set("calculatedWidth",longestRow+padding[primary_os])
}}else{if(this.get("shouldResizeHeight")){this.set("calculatedHeight",longestRow+padding[primary_os])
}}}if(rowOffset+rowSize){if(layoutDirection===SC.LAYOUT_HORIZONTAL){if(this.get("shouldResizeHeight")){this.set("calculatedHeight",rowOffset+rowSize+padding[secondary_os])
}}else{if(this.get("shouldResizeWidth")){this.set("calculatedWidth",rowOffset+rowSize+padding[secondary_os])
}}}}len=isObserving.length;for(idx=0;idx<len;idx++){this.unobserveChildLayout(isObserving[idx])
}len=nowObserving.length;for(idx=0;idx<len;idx++){this.observeChildLayout(nowObserving[idx])
}this._scfl_isObserving=nowObserving},_scfl_frameDidChange:function(){var frame=this.get("frame"),lf=this._scfl_lastFrameSize;
this._scfl_lastFrameSize=frame;if(lf&&lf.width==frame.width&&lf.height==frame.height){return
}this.invokeOnce("_scfl_tile")}.observes("frame"),destroyMixin:function(){var isObserving=this._scfl_isObserving;
if(!isObserving){return}var len=isObserving.length,idx;for(idx=0;idx<len;idx++){this.unobserveChildLayout(isObserving[idx])
}},reorder:function(views){if(!SC.typeOf(views)===SC.T_ARRAY){views=arguments}var i=views.length,childViews=this.childViews,view;
this.beginPropertyChanges();while(i-->0){view=views[i];childViews.removeObject(view);
childViews.unshiftObject(view)}this.endPropertyChanges();this._scfl_childViewsDidChange();
return this}};SC.Gesturable={concatenatedProperties:["gestures"],gestures:[],initMixin:function(){this.createGestures()
},createGestures:function(){var gestures=this.get("gestures"),idx,len=gestures.length,g,_g=[];
for(idx=0;idx<len;idx++){if(SC.typeOf(gestures[idx])===SC.T_STRING){g=this.get(gestures[idx])
}else{g=gestures[idx]}if(!g){throw"Could not find gesture named '"+gestures[idx]+"' on view."
}if(g.isClass){g=g.create({view:this})}if(SC.typeOf(gestures[idx])===SC.T_STRING){this[gestures[idx]]=g
}_g.push(g)}this.set("gestures",_g)},touchStart:function(touch){this.gestureTouchStart(touch)
},touchesDragged:function(evt,touches){this.gestureTouchesDragged(evt,touches)},touchEnd:function(touch){this.gestureTouchEnd(touch)
},gestureTouchStart:function(touch){touch.isInteresting=0;var gestures=this.get("gestures"),idx,len=gestures.length,g;
for(idx=0;idx<len;idx++){g=gestures[idx];g.unassignedTouchDidStart(touch)}},gestureTouchesDragged:function(evt,touches){var gestures=this.get("gestures"),idx,len=gestures.length,g;
for(idx=0;idx<len;idx++){g=gestures[idx];g.unassignedTouchesDidChange(evt,touches)
}},gestureTouchEnd:function(touch){var gestures=this.get("gestures"),idx,len=gestures.length,g;
for(idx=0;idx<len;idx++){g=gestures[idx];g.unassignedTouchDidEnd(touch)}}};SC.InlineEditable={editorDelegate:null,isEditable:YES,isEditing:NO,beginEditing:function(){if(this.get("isEditing")){return YES
}return this.invokeDelegateMethod(this.get("editorDelegate"),"beginEditingFor",this,this.get("value"))
},discardEditing:function(){if(!this.get("isEditing")){return YES}return this.invokeDelegateMethod(this.get("editorDelegate"),"discardEditingFor",this)
},commitEditing:function(){if(!this.get("isEditing")){return YES}return this.invokeDelegateMethod(this.get("editorDelegate"),"commitEditingFor",this)
},inlineEditorWillBeginEditing:function(editor){this.set("isEditing",YES)},inlineEditorDidBeginEditing:function(editor){return YES
},inlineEditorShouldCommitEditing:function(editor,finalValue){this.setIfChanged("value",finalValue);
return YES},inlineEditorDidEndEditing:function(editor,finalValue){this.inlineEditorShouldCommitEditing(editor,finalValue);
this.set("isEditing",NO);return YES}};SC.InlineEditorDelegate={isInlineEditorDelegate:YES,exampleInlineTextFieldView:SC.InlineTextFieldView,inlineEditorClassName:null,isInlineEditorMultiline:NO,beginEditingFor:function(view,startingValue){if(!view.get("isEditable")){return NO
}if(view.get("isEditing")){return YES}var el=view.$(),value=view.get("value")||"",f=SC.viewportOffset(el[0]),frameTemp=view.convertFrameFromView(view.get("frame"),null),exampleEditor=this.get("exampleInlineTextFieldView");
f.width=frameTemp.width;f.height=frameTemp.height;view.inlineEditorWillBeginEditing();
exampleEditor.beginEditing({pane:view.get("pane"),frame:f,layout:view.get("layout"),exampleInlineTextFieldView:exampleEditor,delegate:this,inlineEditorClassName:this.get("inlineEditorClassName"),exampleElement:el,value:startingValue,multiline:this.get("isInlineEditorMultiline"),isCollection:NO});
exampleEditor.editor._target=view},parentViewForEditor:function(view){return view.get("parentView")
},commitEditingFor:function(view){if(!view.get("isEditing")){return NO}return SC.InlineTextFieldView.commitEditing()
},discardEditingFor:function(view){if(!view.get("isEditing")){return NO}return SC.InlineTextFieldView.discardEditing()
},inlineEditorDidBeginEditing:function(editor){var view=editor._target;return view.inlineEditorDidBeginEditing(editor)
},inlineEditorShouldCommitEditing:function(editor,finalValue){var view=editor._target;
return view.inlineEditorShouldCommitEditing(editor,finalValue)},inlineEditorDidEndEditing:function(editor,finalValue){var view=editor._target;
return view.inlineEditorDidEndEditing(editor,finalValue)}};SC.Validatable={initMixin:function(){this._validatable_validatorDidChange()
},validator:null,errorLabel:null,isValid:function(){return SC.typeOf(this.get("value"))!==SC.T_ERROR
}.property("value"),ownerForm:null,performValidate:function(partialChange){var ret=SC.VALIDATE_OK;
if(this._validator){var form=this.get("ownerForm");if(partialChange){ret=this._validator.validatePartial(form,this);
if((ret==SC.VALIDATE_NO_CHANGE)&&(this._validator.validateChange(form,this)==SC.VALIDATE_OK)){ret=SC.VALIDATE_OK
}}else{ret=this._validator.validateChange(form,this)}}return ret},performValidateSubmit:function(){return this._validator?this._validator.validateSubmit(this.get("ownerForm"),this):SC.VALIDATE_OK
},performValidateKeyDown:function(evt){var charStr=evt.getCharString();if(!charStr){return YES
}return this._validator?this._validator.validateKeyDown(this.get("ownerForm"),this,charStr):YES
},validatorObject:function(){return this._validator}.property(),validateSubmit:function(){return this.performValidateSubmit()
},objectForFieldValue:function(fieldValue,partialChange){return this._validator?this._validator.objectForFieldValue(fieldValue,this.get("ownerForm"),this):fieldValue
},fieldValueForObject:function(object){return this._validator?this._validator.fieldValueForObject(object,this.get("ownerForm"),this):object
},_validatable_displayObserver:function(){this.displayDidChange()}.observes("isValid"),renderMixin:function(context){context.setClass("invalid",!this.get("isValid"))
},_validatable_validatorDidChange:function(){var form=this.get("ownerForm");var val=SC.Validator.findFor(form,this,this.get("validator"));
if(val!=this._validator){this.propertyWillChange("validatorObject");if(this._validator){this._validator.detachFrom(form,this)
}this._validator=val;if(this._validator){this._validator.attachTo(form,this)}this.propertyDidChange("validatorObject")
}}.observes("validator","ownerForm")};sc_require("mixins/validatable");SC.FieldView=SC.View.extend(SC.Control,SC.Validatable,{isTextArea:NO,ariaRole:"textbox",_field_isMouseDown:NO,fieldValue:function(){var value=this.get("value");
if(SC.typeOf(value)===SC.T_ERROR){value=value.get("errorValue")}return this.fieldValueForObject(value)
}.property("value","validator").cacheable(),$input:function(){if(this.get("isTextArea")){return this.$("textarea").andSelf().filter("textarea")
}else{return this.$("input").andSelf().filter("input")}},setFieldValue:function(newValue){if(SC.none(newValue)){newValue=""
}var input=this.$input();if(input.val()!==newValue){input.val(newValue)}return this
},getFieldValue:function(){return this.$input().val()},_field_fieldValueDidChange:function(evt){SC.run(function(){this.fieldValueDidChange(NO)
},this)},fieldValueDidChange:function(partialChange){var fieldValue=this.getFieldValue();
var value=this.objectForFieldValue(fieldValue,partialChange);this.setIfChanged("value",value)
},_field_valueDidChange:function(){this.setFieldValue(this.get("fieldValue"))}.observes("fieldValue"),didCreateLayer:function(){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)},didAppendToDocument:function(){if(this.get("isTextArea")){this.setFieldValue(this.get("fieldValue"));
SC.Event.add(this.$input(),"change",this,this._field_fieldValueDidChange)}},willDestroyLayer:function(){SC.Event.remove(this.$input(),"change",this,this._field_fieldValueDidChange)
},mouseDown:function(evt){this._field_isMouseDown=YES;evt.allowDefault();return YES
},mouseExited:function(evt){if(this._field_isMouseDown){this.set("isActive",NO)}evt.allowDefault();
return YES},mouseEntered:function(evt){this.set("isActive",this._field_isMouseDown);
evt.allowDefault();return YES},mouseUp:function(evt){if(this._field_isMouseDown){this.set("isActive",NO)
}this._field_isMouseDown=NO;evt.allowDefault();return YES},keyDown:function(evt){if(evt.which===9||evt.keyCode===9){var view=evt.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(view){view.becomeFirstResponder()}else{evt.allowDefault()}return YES}if(this.performValidateKeyDown(evt)){this._isKeyDown=YES;
evt.allowDefault()}else{evt.stop()}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(keyView){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$input()[0].focus()
}}},willLoseKeyResponderTo:function(responder){if(this._isFocused){this._isFocused=NO
}},_field_setFieldValue:function(newValue){this.propertyWillChange("fieldValue");
if(this.fieldValueForObject){newValue=this.fieldValueForObject(newValue)}var ret=this.setFieldValue(newValue);
this.propertyDidChange("fieldValue");return ret},_field_getFieldValue:function(){var ret=this.getFieldValue();
if(this.objectForFieldValue){ret=this.objectForFieldValue(ret)}return ret},render:function(context,firstTime){arguments.callee.base.apply(this,arguments);
if(firstTime){context.attr("aria-multiline",this.get("isTextArea"));context.attr("aria-disabled",!this.get("isEnabled"))
}}});SC.TextSelection=SC.Object.extend(SC.Copyable,SC.Freezable,{start:-1,end:-1,length:function(){var start=this.get("start");
var end=this.get("end");if((start)===-1||(end===-1)){return -1}else{return end-start
}}.property("start","end").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.freeze()},copy:function(){return SC.TextSelection.create({start:this.get("start"),end:this.get("end")})
},toString:function(){var length=this.get("length");if(length&&length>0){if(length===1){return"[%@ character selected: {%@, %@}]".fmt(length,this.get("start"),this.get("end"))
}else{return"[%@ characters selected: {%@, %@}]".fmt(length,this.get("start"),this.get("end"))
}}else{return"[no text selected; caret at %@]".fmt(this.get("start"))}}});SC.StaticLayout={hasStaticLayout:YES};
sc_require("views/field");sc_require("system/text_selection");sc_require("mixins/static_layout");
sc_require("mixins/editable");SC.TextFieldView=SC.FieldView.extend(SC.StaticLayout,SC.Editable,{tagName:"label",classNames:["sc-text-field-view"],isTextField:YES,ariaRole:"textbox",applyImmediately:YES,isPassword:NO,isTextArea:NO,hint:"",formattedHint:function(){var hint=this.get("hint");
return this.get("localize")?hint.loc():hint}.property("hint","localize").cacheable(),localize:YES,isEditing:NO,defaultTabbingEnabled:YES,isContextMenuEnabled:YES,continuouslyUpdatesValue:YES,allowsErrorAsValue:YES,leftAccessoryView:null,rightAccessoryView:null,spellCheckEnabled:YES,maxLength:5096,shouldRenderBorder:YES,_hintON:YES,init:function(){var val=this.get("value");
this._hintON=(!val||val&&val.length===0)?YES:NO;return arguments.callee.base.apply(this,arguments)
},isEditable:function(){return this.get("isEnabled")}.property("isEnabled").cacheable(),selection:function(key,value){var element=this.$input()[0],range,start,end;
if(value===undefined){if(element){start=null;end=null;if(!element.value){start=end=0
}else{try{if("selectionStart" in element){start=element.selectionStart}if("selectionEnd" in element){end=element.selectionEnd
}}catch(e){return null}if(start===null||end===null){var selection=document.selection;
if(selection){var type=selection.type;if(type&&(type==="None"||type==="Text")){range=selection.createRange();
if(!this.get("isTextArea")){var length=range.text.length;start=Math.abs(range.moveStart("character",0-(element.value.length+1)));
end=start+length}else{var dummyRange=range.duplicate();dummyRange.moveToElementText(element);
dummyRange.setEndPoint("EndToStart",range);start=dummyRange.text.length;end=start+range.text.length
}}}}}return SC.TextSelection.create({start:start,end:end})}else{return null}}else{if(!value||!value.kindOf||!value.kindOf(SC.TextSelection)){throw"When setting the selection, you must specify an SC.TextSelection instance."
}if(element){if(element.setSelectionRange){element.setSelectionRange(value.get("start"),value.get("end"))
}else{range=element.createTextRange();start=value.get("start");range.move("character",start);
range.moveEnd("character",value.get("end")-start);range.select()}}return value}}.property("fieldValue").cacheable(),displayProperties:"formattedHint fieldValue isEditing leftAccessoryView rightAccessoryView isTextArea".w(),createChildViews:function(){arguments.callee.base.apply(this,arguments);
this.accessoryViewObserver()},acceptsFirstResponder:function(){return this.get("isEnabled")
}.property("isEnabled"),accessoryViewObserver:function(){var classNames,viewProperties=["leftAccessoryView","rightAccessoryView"],len=viewProperties.length,i,viewProperty,previousView,accessoryView;
for(i=0;i<len;i++){viewProperty=viewProperties[i];previousView=this["_"+viewProperty];
accessoryView=this.get(viewProperty);if(!(previousView&&accessoryView&&(previousView===accessoryView))){if(previousView){classNames=previousView.get("classNames");
classNames=classNames.without("sc-text-field-accessory-view");previousView.set("classNames",classNames);
this.removeChild(previousView);previousView=null;this["_"+viewProperty]=null}if(accessoryView){if(accessoryView.isClass){accessoryView=accessoryView.create({layoutView:this})
}classNames=accessoryView.get("classNames");var className="sc-text-field-accessory-view";
if(classNames.indexOf(className)<0){classNames=SC.clone(classNames);classNames.push(className);
accessoryView.set("classNames",classNames)}this.appendChild(accessoryView);this["_"+viewProperty]=accessoryView
}}}}.observes("leftAccessoryView","rightAccessoryView"),layoutChildViewsIfNeeded:function(isVisible){if(!isVisible){isVisible=this.get("isVisibleInWindow")
}if(isVisible&&this.get("childViewsNeedLayout")){var rightAccessoryView=this.get("rightAccessoryView");
if(rightAccessoryView&&rightAccessoryView.get){var layout=rightAccessoryView.get("layout");
if(layout){layout.left=null;if(!layout.right){layout.right=0}rightAccessoryView.adjust({layout:layout})
}}}arguments.callee.base.apply(this,arguments)},render:function(context,firstTime){arguments.callee.base.apply(this,arguments);
var v,accessoryViewWidths,leftAdjustment,rightAdjustment;v=this.get("fieldValue");
if(SC.none(v)){v=""}v=String(v);context.setClass("not-empty",v.length>0);if(firstTime){context.attr("aria-multiline",this.get("isTextArea"));
context.attr("aria-disabled",!this.get("isEnabled"))}if(!SC.ok(this.get("value"))){context.attr("aria-invalid",YES)
}accessoryViewWidths=this._getAccessoryViewWidths();leftAdjustment=accessoryViewWidths.left;
rightAdjustment=accessoryViewWidths.right;if(leftAdjustment){leftAdjustment+="px"
}if(rightAdjustment){rightAdjustment+="px"}this._renderField(context,firstTime,v,leftAdjustment,rightAdjustment);
if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)}},_forceRenderFirstTime:NO,_renderFieldLikeFirstTime:function(){this.set("_forceRenderFirstTime",YES)
}.observes("isTextArea"),_renderField:function(context,firstTime,value,leftAdjustment,rightAdjustment){var hint=this.get("formattedHint"),disabled,name,adjustmentStyle,type,hintElements,element,paddingElementStyle,fieldClassNames,spellCheckEnabled=this.get("spellCheckEnabled"),spellCheckString,maxLength=this.get("maxLength"),isOldSafari;
context.setClass("text-area",this.get("isTextArea"));isOldSafari=(parseInt(SC.browser.webkit,0)<532);
context.setClass("oldWebKitFieldPadding",isOldSafari);spellCheckString=spellCheckEnabled?' spellcheck="true"':' spellcheck="false"';
if(firstTime||this._forceRenderFirstTime){this._forceRenderFirstTime=NO;disabled=this.get("isEnabled")?"":'disabled="disabled"';
name=this.get("layerId");if(this.get("shouldRenderBorder")){context.push('<span class="border"></span>')
}adjustmentStyle="";if(leftAdjustment||rightAdjustment){adjustmentStyle='style="';
if(leftAdjustment){adjustmentStyle+="left: "+leftAdjustment+"; "}if(rightAdjustment){adjustmentStyle+="right: "+rightAdjustment+";"
}adjustmentStyle+='"'}context.push('<span class="padding" '+adjustmentStyle+">");
value=this.get("escapeHTML")?SC.RenderContext.escapeHTML(value):value;if(!this.get("_supportsPlaceHolder")&&(!value||(value&&value.length===0))){value=hint;
context.setClass("sc-hint",YES)}fieldClassNames=(SC.browser.mozilla&&(parseFloat(SC.browser.mozilla)<1.9||SC.browser.mozilla.match(/1\.9\.0|1\.9\.1/)))?"field oldGecko":"field";
if(this.get("isTextArea")){context.push('<textarea class="',fieldClassNames,'" name="',name,'" ',disabled,' placeholder="',hint,'"',spellCheckString,' maxlength="',maxLength,'">',value,"</textarea></span>")
}else{type=this.get("isPassword")?"password":"text";context.push('<input class="',fieldClassNames,'" type="',type,'" name="',name,'" ',disabled,' value="',value,'" placeholder="',hint,'"',spellCheckString,' maxlength="',maxLength,'" /></span>')
}}else{var input=this.$input();if(!this.get("_supportsPlaceHolder")){var val=this.get("value");
if((!val||(val&&val.length===0))){if(this._hintON&&!this.get("isFirstResponder")){context.setClass("sc-hint",YES);
input.val(hint)}else{context.setClass("sc-hint",NO);input.val("")}}}else{input.attr("placeholder",hint)
}element=input[0];if(element){if(!this.get("isEnabled")){element.disabled="true"}else{element.disabled=null
}paddingElementStyle=element.parentNode.style;if(leftAdjustment){if(paddingElementStyle.left!==leftAdjustment){paddingElementStyle.left=leftAdjustment
}}else{paddingElementStyle.left=null}if(rightAdjustment){if(paddingElementStyle.right!==rightAdjustment){paddingElementStyle.right=rightAdjustment
}}else{paddingElementStyle.right=null}}}},_getAccessoryViewWidths:function(){var widths={},accessoryViewPositions=["left","right"],numberOfAccessoryViewPositions=accessoryViewPositions.length,i,position,accessoryView,frames,width,layout,offset,frame;
for(i=0;i<numberOfAccessoryViewPositions;i++){position=accessoryViewPositions[i];
accessoryView=this.get(position+"AccessoryView");if(accessoryView){if(accessoryView.isClass){accessoryView=accessoryView.create({layoutView:this})
}if(accessoryView.get){frame=accessoryView.get("frame");if(frame){width=frame.width;
if(width){layout=accessoryView.get("layout");if(layout){offset=layout[position];width+=offset
}widths[position]=width}}}}}return widths},didCreateLayer:function(){arguments.callee.base.apply(this,arguments);
if(!this.get("_supportsPlaceHolder")&&this._hintON){var currentValue=this.$input().val();
if(!currentValue||(currentValue&&currentValue.length===0)){this.$input().val(this.get("formattedHint"))
}}if(this.get("isTextArea")){this.invokeLast(this._addTextAreaEvents)}else{this._addTextAreaEvents();
if(SC.browser.mozilla){var input=this.$input();SC.Event.add(input,"keypress",this,this._firefox_dispatch_keypress)
}}},_addTextAreaEvents:function(){var input=this.$input();SC.Event.add(input,"focus",this,this._textField_fieldDidFocus);
SC.Event.add(input,"blur",this,this._textField_fieldDidBlur);SC.Event.add(input,"select",this,this._textField_selectionDidChange);
if(SC.browser.mozilla){this._cacheInputElement=this.$input();this._cachePaddingElement=this.$(".padding")
}},willDestroyLayer:function(){arguments.callee.base.apply(this,arguments);var input=this.$input();
SC.Event.remove(input,"focus",this,this._textField_fieldDidFocus);SC.Event.remove(input,"blur",this,this._textField_fieldDidBlur);
SC.Event.remove(input,"select",this,this._textField_selectionDidChange);SC.Event.remove(input,"keypress",this,this._firefox_dispatch_keypress)
},_textField_fieldDidFocus:function(evt){SC.run(function(){this.set("focused",YES);
this.fieldDidFocus(evt);var val=this.get("value");if(!this.get("_supportsPlaceHolder")&&((!val)||(val&&val.length===0))){this._hintON=NO
}},this)},_textField_fieldDidBlur:function(evt){SC.run(function(){this.set("focused",NO);
this.fieldDidBlur(this._origEvent);var val=this.get("value");if(!this.get("_supportsPlaceHolder")&&((!val)||(val&&val.length===0))){this._hintON=YES
}},this)},fieldDidFocus:function(evt){this.beginEditing(evt);if(this._didHideInterceptForPane){this._didHideInterceptForPane.showTouchIntercept();
this._didHideInterceptForPane=null}var pane=this.get("pane");if(pane&&pane.get("hasTouchIntercept")){pane.hideTouchIntercept();
this._didHideInterceptForPane=this.get("pane")}},fieldDidBlur:function(evt){this.commitEditing(evt);
var touchPane=this._didHideInterceptForPane;if(touchPane){touchPane.showTouchIntercept();
touchPane=null}},_field_fieldValueDidChange:function(evt){if(this.get("focused")){SC.run(function(){this.fieldValueDidChange(NO)
},this)}},_topOffsetForFirefoxCursorFix:3,_applyFirefoxCursorFix:function(){if(parseFloat(SC.browser.mozilla)<1.9&&!this.get("useStaticLayout")){var top,left,width,height,p,layer,element,textfield;
element=this._cacheInputElement;textfield=this._cachePaddingElement;if(textfield&&textfield[0]){layer=textfield[0];
p=SC.$(layer).offset();if(SC.browser.compareVersion(1,9,2)<0&&element[0].tagName.toLowerCase()==="input"){top=p.top+this._topOffsetForFirefoxCursorFix
}else{top=p.top}left=p.left;width=layer.offsetWidth;height=layer.offsetHeight;var style="position: fixed; top: %@px; left: %@px; width: %@px; height: %@px;".fmt(top,left,width,height);
if(!this._prevStyle||this._prevStyle!=style){element.attr("style",style)}this._prevStyle=style
}}return this},_firefox_dispatch_keypress:function(evt){var selection=this.get("selection"),value=this.get("value"),valueLen=value?value.length:0,responder;
if(!selection||((selection.get("length")===0&&(selection.get("start")===0)||selection.get("end")===valueLen))){responder=SC.RootResponder.responder;
if(evt.keyCode===9){return}responder.keypress.call(responder,evt);evt.stopPropagation()
}},_textField_selectionDidChange:function(){this.notifyPropertyChange("selection")
},willBecomeKeyResponderFrom:function(keyView){if(this.get("isVisibleInWindow")){var inp=this.$input()[0];
try{if(inp){inp.focus()}}catch(e){}if(!this._txtFieldMouseDown){this.invokeLast(this._selectRootElement)
}}},_selectRootElement:function(){var inputElem=this.$input()[0];if(inputElem){inputElem.select()
}else{this._textField_selectionDidChange()}},didLoseKeyResponderTo:function(keyView){var el=this.$input()[0];
if(el){el.blur()}this.invokeLater("scrollToOriginIfNeeded",100)},scrollToOriginIfNeeded:function(){var pane=this.get("pane");
if(!pane){return}var first=pane.get("firstResponder");if(!first||!first.get("isTextField")){document.body.scrollTop=document.body.scrollLeft=0
}},parentViewDidResize:function(){if(SC.browser.mozilla){this.invokeLast(this._applyFirefoxCursorFix)
}arguments.callee.base.apply(this,arguments)},keyDown:function(evt){var value,view;
var which=evt.which,maxLengthReached=false;if((which===13&&!evt.isIMEInput)&&!this.get("isTextArea")){if(!this.get("continuouslyUpdatesValue")){value=this.getValidatedValueFromFieldValue(NO);
if((SC.typeOf(value)!==SC.T_ERROR)||this.get("allowsErrorAsValue")){this.setIfChanged("value",value);
this.applyValueToField(value)}}return NO}if(which===27){return NO}if((which===9||evt.keyCode===9)&&this.get("defaultTabbingEnabled")){view=evt.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(view){view.becomeFirstResponder()}else{evt.allowDefault()}return YES}if(!SC.browser.webkit&&this.get("isTextArea")){var val=this.get("value"),code=evt.which;
if(val&&((!SC.browser.mozilla&&code>47)||(SC.browser.mozilla&&((code>32&&code<43)||code>47)&&!(evt.keyCode>36&&evt.keyCode<41)))&&(val.length>=this.get("maxLength"))){maxLengthReached=true
}}if((this.performValidateKeyDown(evt)||SC.platform.touch)&&!maxLengthReached){this._isKeyDown=YES;
evt.allowDefault()}else{evt.stop()}if(this.get("applyImmediately")){this.invokeLater(this.fieldValueDidChange,1)
}return YES},keyUp:function(evt){if(SC.browser.mozilla&&evt.keyCode===13){this.fieldValueDidChange()
}this.notifyPropertyChange("selection");this._isKeyDown=NO;evt.allowDefault();return YES
},mouseDown:function(evt){var fieldValue=this.get("fieldValue");this._txtFieldMouseDown=YES;
if(!this.get("isEnabled")){evt.stop();return YES}else{return arguments.callee.base.apply(this,arguments)
}},mouseUp:function(evt){this._txtFieldMouseDown=NO;this.notifyPropertyChange("selection");
if(!this.get("isEnabled")){evt.stop();return YES}return arguments.callee.base.apply(this,arguments)
},mouseWheel:function(evt){if(this.get("isTextArea")){evt.allowDefault();return YES
}else{return NO}},selectStart:function(evt){return YES},_supportsPlaceHolder:SC.platform.input.placeholder,_valueObserver:function(){var val=this.get("value"),max;
if(val&&val.length>0){this._hintON=NO;max=this.get("maxLength");if(!SC.browser.webkit&&val.length>max){this.set("value",val.substr(0,max))
}}else{this._hintON=YES}}.observes("value")});SC.mixin({_downloadFrames:0,download:function(path){var tempDLIFrame=document.createElement("iframe"),frameId="DownloadFrame_"+this._downloadFrames;
SC.$(tempDLIFrame).attr("id",frameId);tempDLIFrame.style.border="10px";tempDLIFrame.style.width="0px";
tempDLIFrame.style.height="0px";tempDLIFrame.style.position="absolute";tempDLIFrame.style.top="-10000px";
tempDLIFrame.style.left="-10000px";if(!SC.browser.isSafari){SC.$(tempDLIFrame).attr("src",path)
}document.getElementsByTagName("body")[0].appendChild(tempDLIFrame);if(SC.browser.isSafari){SC.$(tempDLIFrame).attr("src",path)
}this._downloadFrames=this._downloadFrames+1;if(!SC.browser.isSafari){var r=function(){document.body.removeChild(document.getElementById(frameId));
frameId=null};r.invokeLater(null,2000)}tempDLIFrame=null},getStyle:function(oElm,strCssRule){var strValue="";
if(document.defaultView&&document.defaultView.getComputedStyle){strValue=document.defaultView.getComputedStyle(oElm,"").getPropertyValue(strCssRule)
}else{if(oElm.currentStyle){strCssRule=strCssRule.replace(/\-(\w)/g,function(strMatch,p1){return p1.toUpperCase()
});strValue=oElm.currentStyle[strCssRule]}}return strValue},uniJapaneseConvert:function(str){var nChar,cString="",j,jLen;
for(j=0,jLen=str.length;j<jLen;j++){nChar=str.charCodeAt(j);nChar=((nChar>=65281&&nChar<=65392)?nChar-65248:nChar);
nChar=(nChar===12540?45:nChar);cString=cString+String.fromCharCode(nChar)}return cString
},pointInElement:function(point,elem,includeFlag,relativeToFlag){var offset,width,height,rect;
elem=jQuery(elem);includeFlag=includeFlag||"border";offset=SC.offset(elem,relativeToFlag);
if(includeFlag==="padding"){width=elem.innerWidth();height=elem.innerHeight();offset.top+=window.parseInt(elem.css("border-top-width").replace("px",""));
offset.left+=window.parseInt(elem.css("border-left-width").replace("px",""))}else{width=elem.outerWidth(includeFlag==="margin");
height=elem.outerHeight(includeFlag==="margin");if(includeFlag==="margin"){offset.top-=window.parseInt(elem.css("margin-top").replace("px",""));
offset.left-=window.parseInt(elem.css("margin-left").replace("px",""))}}rect={x:offset.left,y:offset.top,width:width,height:height};
return SC.pointInRect(point,rect)}});sc_require("views/text_field");sc_require("system/utils/misc");
SC.InlineTextFieldView=SC.TextFieldView.extend({_topOffsetForFirefoxCursorFix:0,beginEditing:function(options){if(!options){throw"InlineTextField.beginEditing() requires options"
}if(this.get("isEditing")){return NO}var layout={},pane,tarLayout,paneElem,del;del=options.delegate;
this.set("editorDelegate",del);this.beginPropertyChanges();this.set("isEditing",YES);
this.set("escapeHTML",options.escapeHTML);this._optframe=options.frame;this._optIsCollection=options.isCollection;
this._exampleElement=options.exampleElement;if(!this._optframe||!del){throw"At least frame and delegate options are required for inline editor"
}this._originalValue=options.value;if(SC.none(this._originalValue)){this._originalValue=""
}this._multiline=(options.multiline!==undefined)?options.multiline:NO;if(this._multiline){this.set("isTextArea",YES)
}else{this.set("isTextArea",NO)}this._commitOnBlur=(options.commitOnBlur!==undefined)?options.commitOnBlur:YES;
this.set("validator",options.validator);this.set("value",this._originalValue);pane=options.pane;
if(!pane){pane=del.get("pane")}paneElem=pane.$()[0];layout.height=this._optframe.height;
layout.width=this._optframe.width;tarLayout=options.layout;if(!tarLayout){tarLayout=del.get("layout")
}if(this._optIsCollection&&tarLayout.left){layout.left=this._optframe.x-tarLayout.left-paneElem.offsetLeft-1;
if(SC.browser.msie==7){layout.left--}}else{layout.left=this._optframe.x-paneElem.offsetLeft-1;
if(SC.browser.msie==7){layout.left--}}if(this._optIsCollection&&tarLayout.top){layout.top=this._optframe.y-tarLayout.top-paneElem.offsetTop;
if(SC.browser.msie==7){layout.top=layout.top-2}}else{layout.top=this._optframe.y-paneElem.offsetTop;
if(SC.browser.msie==7){layout.top=layout.top-2}}this.set("layout",layout);this.set("parentNode",pane);
pane.appendChild(this);this._className=options.inlineEditorClassName;if(this._className&&!this.hasClassName(this._className)){this.setClassName(this._className,true)
}this._previousFirstResponder=pane?pane.get("firstResponder"):null;this.becomeFirstResponder();
this.endPropertyChanges();this.invokeLast(function(){del.inlineEditorDidBeginEditing(this)
});return YES},commitEditing:function(evt){if(!SC.$ok(this.validateSubmit())){return NO
}return this._endEditing(this.get("value"),evt)},discardEditing:function(){return this._endEditing(this._originalValue)
},blurEditor:function(evt){if(!this.get("isEditing")){return YES}return this._commitOnBlur?this.commitEditing(evt):this.discardEditing(evt)
},_endEditing:function(finalValue,evt,didDiscard){var del=this.get("editorDelegate");
if(!this.get("isEditing")||!del){return YES}if(!del.inlineEditorShouldCommitEditing(this,finalValue)){SC.Logger.warn("InlineTextField._endEditing() cannot end without inlineEditorShouldCommitEditing() on the delegate.");
return NO}del.inlineEditorDidEndEditing(this,finalValue);if(this._className){this.setClassName(this._className,false)
}this._originalValue=this._delegate=this._exampleElement=this._optframe=this._className=null;
this.set("isEditing",NO);if(this.get("isFirstResponder")){var pane=this.get("pane");
if(pane&&this._previousFirstResponder){pane.makeFirstResponder(this._previousFirstResponder)
}else{this.resignFirstResponder()}}this._previousFirstResponder=null;if(this.get("parentNode")){this.removeFromParent()
}return YES},isEditing:NO,mouseDown:function(e){arguments.callee.base.call(this,e);
return this.get("isEditing")},touchStart:function(e){this.mouseDown(e)},keyDown:function(evt){var ret=this.interpretKeyEvents(evt);
this.fieldValueDidChange(true);return !ret?NO:ret},insertText:null,_scitf_blurInput:function(){var el=this.$input()[0];
if(el){el.blur()}el=null},willRemoveFromParent:function(){return this._scitf_blurInput()
},willLoseFirstResponder:function(responder,evt){if(responder!==this){return}this._previousFirstResponder=null;
this._origEvent=evt;this._scitf_blurInput();return this.blurEditor(evt)},cancel:function(){this.discardEditing();
return YES},fieldValueDidChange:function(partialChange){arguments.callee.base.call(this,partialChange)
},insertNewline:function(evt){if(this._multiline){evt.allowDefault();return arguments.callee.base.call(this,evt)
}else{if(this.get("value")!=this.$input().val()){this.set("value",this.$input().val())
}this.commitEditing();return YES}},insertTab:function(evt){var delegate=this._delegate;
this.resignFirstResponder();this.commitEditing();if(delegate){var next=delegate.get("nextValidKeyView");
if(next&&next.beginEditing){next.beginEditing()}}return YES},insertBacktab:function(evt){var delegate=this._delegate;
this.resignFirstResponder();this.commitEditing();if(delegate){var prev=delegate.get("previousValidKeyView");
if(prev&&prev.beginEditing){prev.beginEditing()}}return YES},deleteForward:function(evt){evt.allowDefault();
return YES},deleteBackward:function(evt){evt.allowDefault();return YES}});SC.InlineTextFieldView.mixin({beginEditing:function(options){this._exampleElement=options.exampleElement;
var klass=options.exampleInlineTextFieldView?options.exampleInlineTextFieldView:this,layout=options.layout,s=this.updateViewStyle(),p=this.updateViewPaddingStyle();
var str=".inline-editor input{"+s+"} ";str=str+".inline-editor textarea{"+s+"} .inline-editor .padding{"+p+"}";
var pa=document.getElementsByTagName("head")[0],el=document.createElement("style");
el.type="text/css";el.media="screen";if(el.styleSheet){el.styleSheet.cssText=str}else{el.appendChild(document.createTextNode(str))
}pa.appendChild(el);this.editor=klass.create({classNames:"inline-editor",layout:layout});
return this.editor.beginEditing(options)},commitEditing:function(){return this.editor?this.editor.commitEditing():YES
},discardEditing:function(){return this.editor?this.editor.discardEditing():YES},updateViewStyle:function(){var el=this._exampleElement[0],styles="",s=SC.getStyle(el,"font-size");
if(s&&s.length>0){styles=styles+"font-size: "+s+" !important; "}s=SC.getStyle(el,"font-family");
if(s&&s.length>0){styles=styles+"font-family: "+s+" !important; "}s=SC.getStyle(el,"font-weight");
if(s&&s.length>0){styles=styles+"font-weight: "+s+" !important; "}s=SC.getStyle(el,"z-index");
if(s&&s.length>0){styles=styles+"z-index: "+s+" !important; "}s=SC.getStyle(el,"line-height");
if(s&&s.length>0){styles=styles+"line-height: "+s+" !important; "}s=SC.getStyle(el,"text-align");
if(s&&s.length>0){styles=styles+"text-align: "+s+" !important; "}s=SC.getStyle(el,"top-margin");
if(s&&s.length>0){styles=styles+"top-margin: "+s+" !important; "}s=SC.getStyle(el,"bottom-margin");
if(s&&s.length>0){styles=styles+"bottom-margin: "+s+" !important; "}s=SC.getStyle(el,"left-margin");
if(s&&s.length>0){styles=styles+"left-margin: "+s+" !important; "}s=SC.getStyle(el,"right-margin");
if(s&&s.length>0){styles=styles+"right-margin: "+s+" !important; "}return styles},updateViewPaddingStyle:function(){var el=this._exampleElement[0];
var styles="";var s=SC.getStyle(el,"padding-top");if(s&&s.length>0){styles=styles+"top: "+s+" !important; "
}s=SC.getStyle(el,"padding-bottom");if(s&&s.length>0){styles=styles+"bottom: "+s+" !important; "
}s=SC.getStyle(el,"padding-left");if(s&&s.length>0){styles=styles+"left: "+s+" !important; "
}s=SC.getStyle(el,"padding-right");if(s&&s.length>0){styles=styles+"right: "+s+" !important; "
}return styles},editor:null});SC.SCALE_NONE="none";SC.FILL="fill";SC.FILL_PROPORTIONALLY="fillProportionally";
SC.BEST_FIT="fitBest";SC.BEST_FIT_DOWN_ONLY="fitBestDown";SC.InnerFrame={align:SC.ALIGN_CENTER,innerFrameForSize:function(sourceWidth,sourceHeight,destWidth,destHeight){var align=this.get("align"),scale=this.get("scale"),scaleX,scaleY,result;
result={x:0,y:0,width:destWidth,height:destHeight};if(scale===SC.FILL){return result
}scaleX=destWidth/sourceWidth;scaleY=destHeight/sourceHeight;switch(scale){case SC.FILL_PROPORTIONALLY:scale=scaleX>scaleY?scaleX:scaleY;
break;case SC.BEST_FIT:scale=scaleX<scaleY?scaleX:scaleY;break;case SC.BEST_FIT_DOWN_ONLY:if((sourceWidth>destWidth)||(sourceHeight>destHeight)){scale=scaleX<scaleY?scaleX:scaleY
}else{scale=1}break;case SC.SCALE_NONE:scale=1;break;default:if(isNaN(window.parseFloat(scale))||(window.parseFloat(scale)<=0)){SC.Logger.warn("SC.InnerFrame: The scale '%@' was not understood.  Scale must be one of SC.FILL, SC.FILL_PROPORTIONALLY, SC.BEST_FIT, SC.BEST_FIT_DOWN_ONLY or a positive number greater than 0.00.".fmt(scale));
return result}}sourceWidth*=scale;sourceHeight*=scale;result.width=Math.round(sourceWidth);
result.height=Math.round(sourceHeight);switch(align){case SC.ALIGN_LEFT:result.x=0;
result.y=(destHeight/2)-(sourceHeight/2);break;case SC.ALIGN_RIGHT:result.x=destWidth-sourceWidth;
result.y=(destHeight/2)-(sourceHeight/2);break;case SC.ALIGN_TOP:result.x=(destWidth/2)-(sourceWidth/2);
result.y=0;break;case SC.ALIGN_BOTTOM:result.x=(destWidth/2)-(sourceWidth/2);result.y=destHeight-sourceHeight;
break;case SC.ALIGN_TOP_LEFT:result.x=0;result.y=0;break;case SC.ALIGN_TOP_RIGHT:result.x=destWidth-sourceWidth;
result.y=0;break;case SC.ALIGN_BOTTOM_LEFT:result.x=0;result.y=destHeight-sourceHeight;
break;case SC.ALIGN_BOTTOM_RIGHT:result.x=destWidth-sourceWidth;result.y=destHeight-sourceHeight;
break;default:if(align!==SC.ALIGN_CENTER&&align!==SC.ALIGN_MIDDLE){SC.Logger.warn("SC.InnerFrame: The align '%@' was not understood.  Align must be one of SC.ALIGN_CENTER/SC.ALIGN_MIDDLE, SC.ALIGN_LEFT, SC.ALIGN_RIGHT, SC.ALIGN_TOP, SC.ALIGN_BOTTOM, SC.ALIGN_TOP_LEFT, SC.ALIGN_TOP_RIGHT, SC.ALIGN_BOTTOM_LEFT or SC.ALIGN_BOTTOM_RIGHT.".fmt(align))
}result.x=(destWidth/2)-(sourceWidth/2);result.y=(destHeight/2)-(sourceHeight/2)}return result
},scale:SC.FILL};SC.RenderDelegate=SC.Object.extend({});sc_require("render_delegates/render_delegate");
SC.BaseTheme.canvasImageRenderDelegate=SC.RenderDelegate.create({name:"canvasImage",render:function(dataSource,context){var width=dataSource.get("width")||0,height=dataSource.get("height")||0;
context.attr("width",width);context.attr("height",height)},update:function(dataSource,jquery){var elem=jquery[0],image=dataSource.get("image"),frame=dataSource.get("frame"),frameWidth=frame.width,frameHeight=frame.height,innerFrame=dataSource.get("innerFrame"),backgroundColor=dataSource.get("backgroundColor"),renderState=dataSource.get("renderState"),context;
var innerFrameDidChange=![innerFrame.x,innerFrame.y,innerFrame.width,innerFrame.height].isEqual(renderState._lastInnerFrameValues),backgroundDidChange=dataSource.didChangeFor("canvasImageRenderDelegate","backgroundColor"),imageDidChange=dataSource.didChangeFor("canvasImageRenderDelegate","image")||(image&&image.complete)!==renderState._lastImageComplete;
if(innerFrameDidChange||backgroundDidChange||imageDidChange){if(elem&&elem.getContext){elem.height=frameHeight;
elem.width=frameWidth;context=elem.getContext("2d");context.clearRect(0,0,frameWidth,frameHeight);
if(backgroundColor){context.fillStyle=backgroundColor;context.fillRect(0,0,frameWidth,frameHeight)
}if(image&&image.complete){context.drawImage(image,Math.floor(innerFrame.x),Math.floor(innerFrame.y),Math.floor(innerFrame.width),Math.floor(innerFrame.height))
}}renderState._lastInnerFrameValues=[innerFrame.x,innerFrame.y,innerFrame.width,innerFrame.height];
renderState._lastImageComplete=image&&image.complete}}});sc_require("render_delegates/render_delegate");
SC.BaseTheme.containerRenderDelegate=SC.RenderDelegate.create({render:function(dataSource,context){},update:function(){}});
sc_require("render_delegates/render_delegate");SC.BaseTheme.imageRenderDelegate=SC.RenderDelegate.create({name:"image",render:function(dataSource,context){var image=dataSource.get("image"),imageValue=dataSource.get("imageValue"),type=dataSource.get("type")||SC.IMAGE_TYPE_URL,toolTip=dataSource.get("toolTip");
context=context.begin("img");context.attr("src",image.src);if(imageValue&&type===SC.IMAGE_TYPE_CSS_CLASS){context.addClass(imageValue);
this._last_class=imageValue}if(toolTip){context.attr("title",toolTip);context.attr("alt",toolTip)
}context.addStyle(this.imageStyles(dataSource));context=context.end()},update:function(dataSource,jquery){var image=dataSource.get("image"),imageValue=dataSource.get("imageValue"),toolTip=dataSource.get("toolTip");
jquery=jquery.find("img");jquery.attr("src",image.src);if(imageValue!==this._last_class){jquery.setClass(this._last_class,NO)
}jquery.addClass(imageValue);this._last_class=imageValue;if(toolTip){jquery.attr("title",toolTip);
jquery.attr("alt",toolTip)}jquery.css(this.imageStyles(dataSource))},imageStyles:function(dataSource){var innerFrame=dataSource.get("innerFrame");
return{position:"absolute",left:Math.round(innerFrame.x),top:Math.round(innerFrame.y),width:Math.round(innerFrame.width),height:Math.round(innerFrame.height)}
}});sc_require("render_delegates/render_delegate");SC.BaseTheme.labelRenderDelegate=SC.RenderDelegate.create({name:"label",render:function(dataSource,context){var view=dataSource.get("view"),ariaLabeledBy;
if(view){ariaLabeledBy=view.get("ariaLabeledBy")}context.addStyle({textAlign:dataSource.get("textAlign"),fontWeight:dataSource.get("fontWeight")});
context.setClass("ellipsis",dataSource.get("needsEllipsis")||NO);context.setClass("icon",dataSource.get("icon")||NO);
if(ariaLabeledBy&&ariaLabeledBy!==""){context.attr("aria-labelledby",ariaLabeledBy)
}var html=this._htmlForTitleAndIcon(dataSource);context.push(html);dataSource.get("renderState")._lastHTMLForTitleAndIcon=html
},update:function(dataSource,jquery){var view=dataSource.get("view"),ariaLabeledBy;
if(view){ariaLabeledBy=view.get("ariaLabeledBy")}jquery.css({textAlign:dataSource.get("textAlign")||null,fontWeight:dataSource.get("fontWeight")||null});
jquery.setClass("ellipsis",dataSource.get("needsEllipsis")||NO);if(ariaLabeledBy&&ariaLabeledBy!==""){jquery.attr("aria-labelledby",ariaLabeledBy)
}var html=this._htmlForTitleAndIcon(dataSource);if(dataSource.get("renderState")._lastHTMLForTitleAndIcon!==html){jquery.html(html);
dataSource.get("renderState")._lastHTMLForTitleAndIcon=html}},_htmlForTitleAndIcon:function(dataSource){var title=dataSource.get("title"),hint=dataSource.get("hint"),escapeHTML=dataSource.get("escapeHTML"),icon=dataSource.get("icon")||"";
if(title&&escapeHTML){title=SC.RenderContext.escapeHTML(title)}if(hint&&!title){if(escapeHTML){hint=SC.RenderContext.escapeHTML(hint)
}title="<span class='sc-hint'>"+hint+"</span>"}if(icon){if(icon.indexOf("/")>=0){icon='<img src="'+icon+'" alt="" class="icon" />'
}else{icon='<img src="'+SC.BLANK_IMAGE_URL+'" alt="" class="icon '+icon+'" />'}}return icon+title
}});sc_require("core");SC.Benchmark={verbose:NO,enabled:YES,events:{},stats:{},globalStartTime:null,addEvent:function(name,time){if(!time){time=new Date().getTime()
}this.events[name]=time},start:function(key,parentKey,time,topLevelOnly){if(!this.enabled){return
}var start=(time||Date.now()),stat;if(parentKey){stat=this._subStatFor(key,parentKey)
}else{stat=this._statFor(key)}if(topLevelOnly&&stat._starts.length>0){stat._starts.push("ignore")
}else{stat._starts.push(start)}stat._times.push({start:start,_subStats:{}});return key
},end:function(key,parentKey,time){var stat;if(!this.enabled){return}if(parentKey){stat=this._subStatFor(key,parentKey)
}else{stat=this._statFor(key)}var start=stat._starts.pop();if(!start){SC.Logger.log('SC.Benchmark "%@" ended without a matching start.  No information was saved.'.fmt(key));
return}if(start=="ignore"){return}var end=(time||Date.now());var dur=end-start;stat._times[stat._times.length-1].end=end;
stat._times[stat._times.length-1].dur=dur;stat.amt+=dur;stat.runs++;if(this.verbose){this.log(key)
}},setGlobalStartTime:function(time){this.globalStartTime=time},bench:function(func,key,reps){if(!key){key="bench%@".fmt(this._benchCount++)
}if(!reps){reps=1}var ret;while(--reps>=0){var timeKey=SC.Benchmark.start(key);ret=func();
SC.Benchmark.end(timeKey)}return ret},install:function(object,method,topLevelOnly){object["b__"+method]=object[method];
var __func=object["b__"+method];object[method]=function(){var key="%@(%@)".fmt(method,$A(arguments).join(", "));
SC.Benchmark.start(key,topLevelOnly);var ret=__func.apply(this,arguments);SC.Benchmark.end(key);
return ret}},restore:function(object,method){object[method]=object["b__"+method]},report:function(key){if(key){return this._genReport(key)
}var ret=[];for(var k in this.stats){if(!this.stats.hasOwnProperty(k)){continue}ret.push(this._genReport(k))
}return ret.join("\n")},timelineReport:function(appName){appName=(appName)?"SproutCore Application":appName;
var ret=[appName,"User-Agent: %@".fmt(navigator.userAgent),"Report Generated: %@ (%@)".fmt(new Date().toString(),Date.now()),""];
var chart=this._compileChartData(true);for(var i=0;i<chart.length;i++){if(chart[i][4]){ret.push(this._timelineGenSubReport(chart[i]))
}else{ret.push(this._timelineGenReport(chart[i]))}}return ret.join("\n")},getTimelineChartContent:function(){var chart=this._compileChartData(false);
var chartLen=chart.length;if(chartLen===0){return}var gStart=this.globalStartTime?this.globalStartTime:chart[0][1];
var maxDur=chart[chartLen-1][2]-gStart;var maxHeight=25+chartLen*30;var incr=Math.ceil(maxDur/200)+1;
var maxWidth=incr*50;var leftPadding=10,rightPadding=300;var str="<div class = 'sc-benchmark-timeline-chart' style = 'position:relative;'>";
str+="<div class = 'sc-benchmark-top'></div>";for(var i=0;i<incr;i++){str+="<div class = 'sc-benchmark-tick' style = '";
str+="left: "+(leftPadding+i*50)+"px; ";str+="height: "+maxHeight+"px;";str+="'></div>";
str+="<div class = 'sc-benchmark-tick-label' style = '";str+="left: "+(leftPadding+i*50)+"px; ";
str+="'>"+(i*200)+"ms</div>"}for(i=0;i<chartLen;i++){str+="<div class = 'sc-benchmark-row ";
str+=(i%2===0)?"even":"odd";str+="' style = '";str+="top: "+(50+(i*30))+"px; ";str+="'></div>";
var div=document.createElement("div");var start=chart[i][1];var end=chart[i][2];var duration=chart[i][3];
str+="<div class = 'sc-benchmark-bar' style = '";str+="left:"+(leftPadding+((start-gStart)/4))+"px; width: "+((duration/4))+"px;";
str+="top: "+(28+(i*30))+"px;";str+="' title = 'start: "+(start-gStart)+" ms, end: "+(end-gStart)+" ms, duration: "+duration+" ms'";
str+=">";str+="&nbsp;"+chart[i][0]+" <span class='sc-benchmark-emphasis'>";str+=duration+"ms (start: "+(start-gStart)+"ms)";
str+="</span>";str+="</div>"}var events=this.events,idx=0;for(i in events){var t=events[i]-gStart;
str+="<div class = 'sc-benchmark-event idx"+(idx%10)+"' style = '";str+="left: "+(leftPadding+t/4)+"px; height: "+maxHeight+"px; top: 20px;";
str+="' title = '"+i+": "+t+"'></div>";idx++}str+="</div>";return{html:str,totalCapturedTime:maxDur,pointsCaptured:chartLen,width:maxWidth+leftPadding+rightPadding,height:maxHeight}
},getTimelineChartView:function(){var view=SC.ScrollView.create({contentView:SC.StaticContentView.extend({}),reload:function(){var content=SC.Benchmark.getTimelineChartContent();
this.contentView.set("content",content.html);this.contentView.adjust({width:content.width,height:content.height});
this.chartContent=content;SC.RunLoop.invokeLater(SC.Benchmark,function(){this.contentView.notifyPropertyChange("frame")
})}});view.reload();return view},timelineChart:function(appName){SC.RunLoop.begin();
var i=0;this.hideChart();var chartView=this.getTimelineChartView();var chartLen=chartView.chartContent.pointsCaptured,chartCapturedTime=chartView.chartContent.totalCapturedTime;
this._benchmarkChart=SC.Pane.create({classNames:"sc-benchmark-pane".w(),layout:{left:20,right:20,bottom:20,top:20},childViews:"title exit".w(),exit:SC.ButtonView.extend({layout:{right:20,top:20,width:100,height:30},title:"Hide Chart",target:this,action:"hideChart"}),title:SC.LabelView.extend({classNames:"sc-benchmark-title".w(),layout:{left:20,top:23,right:200,height:30},value:((appName)?appName:"SproutCore Application")+(" - Total Captured Time: "+chartCapturedTime+" ms - Points Captured: "+chartLen),fontWeight:"bold"})}).append();
chartView.set("layout",{left:20,top:60,bottom:20,right:20});this._benchmarkChart.appendChild(chartView);
SC.RunLoop.end()},hideChart:function(){if(this._benchmarkChart){this._benchmarkChart.remove();
this._benchmarkChart=null}return YES},tryToPerform:function(action,sender){if(this[action]){return this[action](sender)
}return NO},log:function(key){var lines=this.report(key).split("\n"),len=lines.length,idx;
for(idx=0;idx<len;idx++){SC.Logger.log(lines[idx])}},startProfile:function(key){if(!this.enabled){return
}SC.Logger.profile(key)},endProfile:function(key){if(!this.enabled){return}SC.Logger.profileEnd(key)
},loadPreloadEvents:function(){var preloadEvents=SC.benchmarkPreloadEvents,events=[],idx,len,evt;
if(typeof webkitPerformnce!=="undefined"){SC.mixin(preloadEvents,webkitPerformane.timing)
}if(!this.globalStartTime){var globalStartEvents="navigation navigationStart headStart".w();
len=globalStartEvents.length;for(idx=0;idx<len;idx++){if(preloadEvents[globalStartEvents[idx]]){this.globalStartTime=preloadEvents[globalStartEvents[idx]];
break}}}this.javascriptStartTime=preloadEvents.headStart;SC.mixin(this.events,preloadEvents);
this._hasLoadedPreloadEvents=true},_loadBenchmarksFromEvents:function(){if(!this._hasLoadedPreloadEvents){this.loadPreloadEvents()
}var events=this.events;for(var i in events){if(i.substr(-3)!=="End"){continue}var stem=i.substr(0,i.length-3);
if(!events[stem+"Start"]){continue}SC.Benchmark.start(stem,undefined,events[stem+"Start"]);
SC.Benchmark.end(stem,undefined,events[stem+"End"]);delete events[stem+"Start"];delete events[stem+"End"]
}},_compileChartData:function(showSub){this._loadBenchmarksFromEvents();var chart=[],dispKey;
for(var key in this.stats){var stat=this.stats[key];for(var i=0;i<stat._times.length;
i++){var st=stat._times[i];dispKey=(stat._times.length>1)?(i+1)+" - "+key:key;chart.push([dispKey,st.start,st.end,st.dur,false]);
if(showSub){var subStats=st._subStats;for(var k in subStats){var subStat=subStats[k];
for(var j=0;j<subStat._times.length;j++){var s=subStat._times[j];dispKey=(subStat._times.length>1)?(j+1)+" - "+k:k;
chart.push([dispKey,s.start,s.end,s.dur,true])}}}}}chart.sort(function(a,b){if(a[1]<b[1]){return -1
}else{if(a[1]==b[1]){if(a[3]&&!b[3]){return -1}if(!a[3]&&b[3]){return 1}return 0}}return 1
});return chart},_genReport:function(key){var stat=this._statFor(key);var avg=(stat.runs>0)?(Math.floor(stat.amt*1000/stat.runs)/1000):0;
var last=stat._times[stat._times.length-1];return"BENCH %@ msec: %@ (%@x); latest: %@".fmt(avg,(stat.name||key),stat.runs,last.end-last.start)
},_timelineGenReport:function(val){if(this.globalStartTime){return"BENCH start: %@ msec, duration: %@ msec,  %@".fmt((val[1]-this.globalStartTime),val[3],val[0])
}else{return"BENCH duration: %@ msec, %@".fmt(val[3],val[0])}},_timelineGenSubReport:function(val){if(this.globalStartTime){return"   CHECKPOINT BENCH start: %@ msec, duration: %@ msec,  %@".fmt((val[1]-this.globalStartTime),val[3],val[0])
}else{return"   CHECKPOINT BENCH duration: %@ msec, %@".fmt(val[3],val[0])}},_subStatFor:function(key,parentKey){var parentTimeLen=this.stats[parentKey]._times.length;
if(parentTimeLen===0){return}var parentSubStats=this.stats[parentKey]._times[this.stats[parentKey]._times.length-1]._subStats;
var ret=parentSubStats[key];if(!ret){parentSubStats[key]={runs:0,amt:0,name:key,_starts:[],_times:[]};
ret=parentSubStats[key]}return ret},_statFor:function(key){var ret=this.stats[key];
if(!ret){ret=this.stats[key]={runs:0,amt:0,name:key,_starts:[],_times:[]};ret=this.stats[key]
}return ret},reset:function(){this.stats={}},_bench:function(func,name){SC.Benchmark.bench(func,name,1)
},_benchCount:1};SC.Benchmark=SC.Benchmark;SC.Task=SC.Object.extend({run:function(queue){}});
sc_require("tasks/task");SC.TaskQueue=SC.Task.extend({init:function(){var self=this;
this._doIdleEntry=function(){self._idleEntry()};this._tasks=[]},runWhenIdle:NO,runLimit:50,interval:50,isRunning:NO,minimumIdleDuration:500,_tasks:null,hasTasks:function(){return this._tasks.length>0
}.property("taskCount").cacheable(),taskCount:function(){return this._tasks.length
}.property().cacheable(),push:function(task){this._tasks.push(task);this.notifyPropertyChange("taskCount")
},next:function(){if(this._tasks.length<1){return null}var next=this._tasks.shift();
this.notifyPropertyChange("taskCount");return next},_taskCountDidChange:function(){this._setupIdle()
}.observes("taskCount"),_setupIdle:function(){if(this.get("runWhenIdle")&&!this._idleIsScheduled&&this.get("taskCount")>0){setTimeout(this._doIdleEntry,this.get("interval"));
this._idleIsScheduled=YES}},_idleEntry:function(){this._idleIsScheduled=NO;var last=SC.RunLoop.lastRunLoopEnd;
if(Date.now()-last>this.get("minimumIdleDuration")){SC.run(this.run,this);SC.RunLoop.lastRunLoopEnd=last
}this._setupIdle()},run:function(limit){this.set("isRunning",YES);if(!limit){limit=this.get("runLimit")
}var task,start=Date.now();while(task=this.next()){task.run(this);if(Date.now()-start>limit){break
}}this.set("isRunning",NO)}});SC.backgroundTaskQueue=SC.TaskQueue.create({runWhenIdle:YES});
sc_require("system/task_queue");SC.chance={preload_task:SC.Task.create({run:function(queue){var bank=SC.chance.bank,idx,len=bank.length,images=SC.chance.images;
for(idx=0;idx<len;idx++){if(images.length<1){return SC.chance.didPreloadImages()}var img=images.pop();
bank[idx].className=img}setTimeout(function(){SC.run(function(){SC.backgroundTaskQueue.push(SC.chance.preload_task)
})},0)}}),images:[],bank:[],PRELOAD_CONCURRENCY:50,preloadImages:function(){if(window.CHANCE_SLICES){this.images=window.CHANCE_SLICES
}var bank=this.bank,idx,con=this.PRELOAD_CONCURRENCY;for(idx=0;idx<con;idx++){var img=document.createElement("div");
document.body.appendChild(img);bank.push(img)}SC.run(function(){SC.backgroundTaskQueue.push(SC.chance.preload_task)
})},didPreloadImages:function(){var bank=this.bank,idx,len=bank.length;for(idx=0;
idx<len;idx++){document.body.removeChild(bank[idx]);bank[idx]=undefined}}};SC.ready(SC.chance,"preloadImages");
SC.Cookie=SC.Object.extend({name:null,value:"",expires:null,path:null,domain:null,secure:NO,isCookie:YES,destroy:function(){this.set("expires",-1);
this.write();arguments.callee.base.apply(this,arguments)},write:function(){var name=this.get("name"),value=this.get("value"),expires=this.get("expires"),path=this.get("path"),domain=this.get("domain"),secure=this.get("secure"),output="",date;
if(expires){if(typeof expires===SC.T_NUMBER){date=new Date();date.setTime(date.getTime()+(expires*24*60*60*1000))
}else{if(SC.DateTime&&expires.get&&expires.get("milliseconds")){date=new Date(expires.get("milliseconds"))
}else{if(expires.toUTCString&&expires.toUTCString.apply){date=expires}}}if(date){output="; expires="+date.toUTCString()
}}if(!SC.none(path)){output+="; path="+path}if(!SC.none(domain)){output+="; domain="+domain
}if(secure===YES){output+="; secure"}document.cookie=name+"="+encodeURIComponent(value)+output;
return this}});SC.Cookie.mixin({find:function(name){if(document.cookie&&document.cookie!==""){var cookies=document.cookie.split(";");
for(var i=0;i<cookies.length;i++){var cookie=String(cookies[i]).trim();if(cookie.substring(0,name.length+1)===(name+"=")){return SC.Cookie.create({name:name,value:decodeURIComponent(cookie.substring(name.length+1))})
}}}return null}});SC.CookieMonster={nomNomNom:function(cookie){var isCookie=SC.kindOf(cookie,SC.Cookie);
if(isCookie){SC.Logger.log("YUM!");return cookie.destroy()}SC.Logger.error("Y U PASS ME NO COOKIE? %@",cookie);
return NO}};SC.mixin(SC.$.fn,{setClass:function(className,shouldAdd){if(SC.none(className)){return this
}var isHash=SC.typeOf(className)!==SC.T_STRING,fix=this._fixupClass,key;this.each(function(){if(this.nodeType!==1){return
}var classNames=this.className.split(/\s+/),didChange=NO;if(isHash){for(var key in className){if(className.hasOwnProperty(key)){didChange=fix(classNames,key,className[key])||didChange
}}}else{didChange=fix(classNames,className,shouldAdd)}if(didChange){this.className=classNames.join(" ")
}});return this},_fixupClass:function(classNames,name,shouldAdd){var indexOf=classNames.indexOf(name);
if(shouldAdd){if(indexOf<0){classNames.push(name);return YES}}else{if(indexOf>=0){classNames[indexOf]=null;
return YES}}return NO}});SC.ExceptionHandler={enabled:(SC.buildMode!=="debug"),handleException:function(exception){if(this.isShowingErrorDialog){return
}this._displayErrorDialog(exception)},_displayErrorDialog:function(exception){var html=this._errorDialogHTMLForException(exception),node=document.createElement("div");
node.style.cssText="left: 0px; right: 0px; top: 0px; bottom: 0px; position: absolute; background-color: white; background-color: rgba(255,255,255,0.6); z-index:100;";
node.innerHTML=html;document.body.appendChild(node);this.isShowingErrorDialog=YES
},_errorDialogHTMLForException:function(exception){var html;html=['<div id="sc-error-dialog" style="position: absolute; width: 500px; left: 50%; top: 50%; margin-left: -250px; background-color: white; border: 1px solid black; font-family: Monaco, monospace; font-size: 9px; letter-spacing: 1px; padding: 10px">',"An error has occurred which prevents the application from running:","<br><br>",exception.message,'<div id="sc-error-dialog-reload-button" onclick="window.location.reload();" style="float: right; font-family: Monaco, monospace; font-size: 9px; letter-spacing: 1px; border: 1px solid black; padding: 3px; clear: both; margin-top: 20px; cursor: pointer;">',"Reload","</div>","</div>"];
return html.join("")},isShowingErrorDialog:NO};SC.IMAGE_ABORTED_ERROR=SC.$error("SC.Image.AbortedError","Image",-100);
SC.IMAGE_FAILED_ERROR=SC.$error("SC.Image.FailedError","Image",-101);SC.imageQueue=SC.Object.create({loadLimit:4,activeRequests:0,loadImage:function(url,target,method,isBackgroundFlag){var type=SC.typeOf(target);
if(SC.none(method)&&SC.typeOf(target)===SC.T_FUNCTION){target=null;method=target}if(SC.typeOf(method)===SC.T_STRING){method=target[method]
}if(SC.none(isBackgroundFlag)){isBackgroundFlag=SC.none(target)&&SC.none(method)}var entry=this._imageEntryFor(url);
if(entry.status===this.IMAGE_LOADED){if(method){method.call(target||entry.image,entry.url,entry.image)
}}else{if(target||method){this._addCallback(entry,target,method)}entry.retainCount++;
this._scheduleImageEntry(entry,isBackgroundFlag)}},releaseImage:function(url,target,method){var entry=this._imageEntryFor(url,NO);
if(!entry){return this}if(--entry.retainCount<=0){this._deleteEntry(entry)}else{if(target||method){var type=SC.typeOf(target);
if(SC.none(method)&&SC.typeOf(target)===SC.T_FUNCTION){target=null;method=target}if(SC.typeOf(method)===SC.T_STRING){method=target[method]
}this._removeCallback(entry,target,method)}}},reloadImage:function(url){var entry=this._imageEntryFor(url,NO);
if(entry&&entry.status===this.IMAGE_LOADED){entry.status=this.IMAGE_WAITING}},loadNextImage:function(){var entry=null,queue;
if(this.get("activeRequests")>=this.get("loadLimit")){return}queue=this._foregroundQueue;
while(queue.length>0&&!entry){entry=queue.shift()}if(!entry){queue=this._backgroundQueue;
while(queue.length>0&&!entry){entry=queue.shift()}}this.set("isLoading",!!entry);
if(entry){var img=entry.image;if(!img){return}$(img).bind("abort",this._imageDidAbort);
$(img).bind("error",this._imageDidError);$(img).bind("load",this._imageDidLoad);img.src=entry.url;
this._loading.push(entry);this.incrementProperty("activeRequests");this.loadNextImage()
}},_imageEntryFor:function(url,createIfNeeded){if(createIfNeeded===undefined){createIfNeeded=YES
}var entry=this._images[url];if(!entry&&createIfNeeded){var img=new Image();entry=this._images[url]={url:url,status:this.IMAGE_WAITING,callbacks:[],retainCount:0,image:img};
img.entry=entry}return entry},_deleteEntry:function(entry){this._unscheduleImageEntry(entry);
delete this._images[entry.url]},_addCallback:function(entry,target,method){var callbacks=entry.callbacks;
var handler=callbacks.find(function(x){return x[0]===target&&x[1]===method},this);
if(!handler){callbacks.push([target,method])}callbacks=null;return this},_removeCallback:function(entry,target,method){var callbacks=entry.callbacks;
callbacks.forEach(function(x,idx){if(x[0]===target&&x[1]===method){callbacks[idx]=null
}},this);callbacks=null;return this},_scheduleImageEntry:function(entry,isBackgroundFlag){var background=this._backgroundQueue;
var foreground=this._foregroundQueue;if(entry.status===this.IMAGE_LOADED){return this
}if((entry.status===this.IMAGE_QUEUED)&&!isBackgroundFlag&&entry.isBackground){background[background.indexOf(entry)]=null;
entry.status=this.IMAGE_WAITING}if(entry.status!==this.IMAGE_QUEUED){var queue=(isBackgroundFlag)?background:foreground;
queue.push(entry);entry.status=this.IMAGE_QUEUED;entry.isBackground=isBackgroundFlag
}if(!this.isLoading){this.invokeLater(this.loadNextImage,100)}this.set("isLoading",YES);
return this},_unscheduleImageEntry:function(entry){if(entry.status!==this.IMAGE_QUEUED){return this
}var queue=entry.isBackground?this._backgroundQueue:this._foregroundQueue;queue[queue.indexOf(entry)]=null;
if(this._loading.indexOf(entry)>=0){if(queue.image){queue.image.abort()}this.imageStatusDidChange(entry,this.ABORTED)
}return this},_imageDidAbort:function(){SC.run(function(){SC.imageQueue.imageStatusDidChange(this.entry,SC.imageQueue.ABORTED)
},this)},_imageDidError:function(){SC.run(function(){SC.imageQueue.imageStatusDidChange(this.entry,SC.imageQueue.ERROR)
},this)},_imageDidLoad:function(){SC.run(function(){SC.imageQueue.imageStatusDidChange(this.entry,SC.imageQueue.LOADED)
},this)},imageStatusDidChange:function(entry,status){if(!entry){return}var url=entry.url;
var value;switch(status){case this.LOADED:value=entry.image;break;case this.ABORTED:value=SC.IMAGE_ABORTED_ERROR;
break;case this.ERROR:value=SC.IMAGE_FAILED_ERROR;break;default:value=SC.IMAGE_FAILED_ERROR;
break}entry.callbacks.forEach(function(x){var target=x[0],method=x[1];method.call(target,url,value)
},this);entry.callbacks=[];entry.status=(status===this.LOADED)?this.IMAGE_LOADED:this.IMAGE_WAITING;
var image=entry.image;if(image){image.onload=image.onerror=image.onabort=null;if(status!==this.LOADED){entry.image=null
}}this._loading[this._loading.indexOf(entry)]=null;if(this._loading.length>this.loadLimit*2){this._loading=this._loading.compact()
}this.decrementProperty("activeRequests");this.loadNextImage()},init:function(){arguments.callee.base.apply(this,arguments);
this._images={};this._loading=[];this._foregroundQueue=[];this._backgroundQueue=[]
},IMAGE_LOADED:"loaded",IMAGE_QUEUED:"queued",IMAGE_WAITING:"waiting",ABORTED:"aborted",ERROR:"error",LOADED:"loaded"});
SC.Math=SC.Object.create({near:function(n1,n2,lambda){if(!lambda){lambda=0.00001}return Math.abs(n1-n2)<=lambda
},round:function(n,decimalPlace){if(!decimalPlace){decimalPlace=0}var factor=Math.pow(10,decimalPlace);
if(decimalPlace<0){var s=factor.toString();factor=s.substring(0,s.indexOf("1")+1)
}n=n.valueOf();return Math.round(n*factor)/factor}});SC.LOG_MODULE_LOADING=YES;SC.Module=SC.Object.create({isModuleReady:function(moduleName){var moduleInfo=SC.MODULE_INFO[moduleName];
return moduleInfo?!!moduleInfo.isReady:NO},loadModule:function(moduleName,target,method){var module=SC.MODULE_INFO[moduleName],callbacks,targets;
var args=SC.A(arguments).slice(3);var log=SC.LOG_MODULE_LOADING;var idx,len;if(method===undefined&&SC.typeOf(target)===SC.T_FUNCTION){method=target;
target=null}if(log){SC.Logger.log("SC.Module: Attempting to load '%@'".fmt(moduleName))
}if(!module){throw"SC.Module: could not find module '%@'".fmt(moduleName)}module.isPrefetching=NO;
if(module.isLoaded){if(log){SC.Logger.log("SC.Module: Module '%@' already loaded.".fmt(moduleName))
}if(module.source){if(log){SC.Logger.log("SC.Module: Evaluating JavaScript for module '%@'.".fmt(moduleName))
}this._evaluateStringLoadedModule(module)}if(method){if(SC.isReady){SC.Module._invokeCallback(moduleName,target,method,args)
}else{SC.ready(SC.Module,function(){SC.Module._invokeCallback(moduleName,target,method,args)
})}}}else{if(log){SC.Logger.log("SC.Module: Module '%@' is not loaded, loading now.".fmt(moduleName))
}callbacks=module.callbacks||[];if(method){callbacks.push(function(){SC.Module._invokeCallback(moduleName,target,method,args)
})}module.callbacks=callbacks;if(!module.isLoading){this._loadDependenciesForModule(moduleName);
this._loadCSSForModule(moduleName);this._loadJavaScriptForModule(moduleName);module.isLoading=YES
}}},prefetchModule:function(moduleName){var module=SC.MODULE_INFO[moduleName];if(module.isLoading||module.isLoaded){return
}if(SC.LOG_MODULE_LOADING){SC.Logger.log("SC.Module: Prefetching module '%@'.".fmt(moduleName))
}this._loadDependenciesForModule(moduleName);this._loadCSSForModule(moduleName);this._loadJavaScriptForModule(moduleName);
module.isLoading=YES;module.isPrefetching=YES},_executeLazilyInstantiatedModule:function(moduleName,targetName,methodName){var lazyInfo=SC.LAZY_INSTANTIATION[moduleName];
var target;var method;var idx,len;if(SC.LOG_MODULE_LOADING){SC.Logger.log("SC.Module: Module '%@' is marked for lazy instantiation, instantiating it now…".fmt(moduleName))
}len=lazyInfo.length;for(idx=0;idx<len;idx++){try{lazyInfo[idx]()}catch(e){SC.Logger.error("SC.Module: Failed to lazily instatiate entry for  '%@'".fmt(moduleName))
}}delete SC.LAZY_INSTANTIATION[moduleName];target=this._targetForTargetName(targetName);
method=this._methodForMethodNameInTarget(methodName,target);if(!method){throw"SC.Module: could not find callback for lazily instantiated module '%@'".fmt(moduleName)
}},_evaluateStringLoadedModule:function(module){var moduleSource=module.source;jQuery.globalEval(moduleSource);
delete module.source;module.isReady=YES},_loadCSSForModule:function(moduleName){var head=document.getElementsByTagName("head")[0];
var module=SC.MODULE_INFO[moduleName];var styles=module.styles||[];var len=styles.length;
var url;var el;var idx;if(!head){head=document.documentElement}len=styles.length;
for(idx=0;idx<len;idx++){url=styles[idx];if(url.length>0){if(SC.LOG_MODULE_LOADING){SC.Logger.log("SC.Module: Loading CSS file in '%@' -> '%@'".fmt(moduleName,url))
}el=document.createElement("link");el.setAttribute("href",url);el.setAttribute("rel","stylesheet");
el.setAttribute("type","text/css");head.appendChild(el)}}el=null},_loadJavaScriptForModule:function(moduleName){var module=SC.MODULE_INFO[moduleName];
var el;var url;var dependencies=module.dependencies;var dependenciesAreLoaded=YES;
if(dependencies&&dependencies.length>0){dependenciesAreLoaded=this._dependenciesMetForModule(moduleName)
}if(module.isPrefetched){url=module.stringURL}else{if(dependenciesAreLoaded){url=module.scriptURL
}else{url=module.stringURL}}if(url.length>0){if(SC.LOG_MODULE_LOADING){SC.Logger.log("SC.Module: Loading JavaScript file in '%@' -> '%@'".fmt(moduleName,url))
}el=document.createElement("script");el.setAttribute("type","text/javascript");el.setAttribute("src",url);
if(SC.browser.isIE){el.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){SC.Module._moduleDidLoad(moduleName)
}}}else{el.onload=function(){SC.Module._moduleDidLoad(moduleName)}}document.body.appendChild(el)
}},_dependenciesMetForModule:function(moduleName){var dependencies=SC.MODULE_INFO[moduleName].dependencies||[];
var idx,len=dependencies.length;var dependencyName;var module;for(idx=0;idx<len;idx++){dependencyName=dependencies[idx];
module=SC.MODULE_INFO[dependencyName];if(!module){throw"SC.loadModule: Unable to find dependency %@ for module %@.".fmt(dependencyName,moduleName)
}if(!module.isReady){return NO}}return YES},_loadDependenciesForModule:function(moduleName){var moduleInfo=SC.MODULE_INFO[moduleName];
var log=SC.LOG_MODULE_LOADING;var dependencies=moduleInfo.dependencies||[];var dependenciesMet=YES;
var len=dependencies.length;var idx;var requiredModuleName;var requiredModule;var dependents;
for(idx=0;idx<len;idx++){requiredModuleName=dependencies[idx];requiredModule=SC.MODULE_INFO[requiredModuleName];
if(!requiredModule){throw"SC.Module: could not find required module '%@' for module '%@'".fmt(requiredModuleName,moduleName)
}else{if(requiredModule.isLoading){dependenciesMet=NO;dependents=requiredModule.dependents;
if(!dependents){requiredModule.dependents=dependents=[]}dependents.push(moduleName)
}else{if(requiredModule.isReady){continue}else{dependenciesMet=NO;dependents=requiredModule.dependents;
if(!dependents){requiredModule.dependents=dependents=[]}dependents.push(moduleName);
if(log){SC.Logger.log("SC.Module: '%@' depends on '%@', loading dependency…".fmt(moduleName,requiredModuleName))
}SC.Module.loadModule(requiredModuleName)}}}}},_invokeCallback:function(moduleName,targetName,methodName,args){var method;
var target;target=this._targetForTargetName(targetName);method=this._methodForMethodNameInTarget(methodName,target);
if(!method){if(SC.LAZY_INSTANTIATION[moduleName]){this._executeLazilyInstantiatedModule(moduleName,targetName,methodName)
}else{throw"SC.Module: could not find callback for '%@'".fmt(moduleName)}}if(!args){args=[]
}args.unshift(moduleName);var needsRunLoop=!!SC.RunLoop.currentRunLoop;if(needsRunLoop){SC.run(function(){method.apply(target,args)
})}else{method.apply(target,args)}},_invokeCallbacksForModule:function(moduleName){var moduleInfo=SC.MODULE_INFO[moduleName],callbacks;
if(!moduleInfo){return}if(SC.LOG_MODULE_LOADING){SC.Logger.log("SC.Module: Module '%@' has completed loading, invoking callbacks.".fmt(moduleName))
}callbacks=moduleInfo.callbacks||[];for(var idx=0,len=callbacks.length;idx<len;++idx){callbacks[idx]()
}},_evaluateAndInvokeCallbacks:function(moduleName){var moduleInfo=SC.MODULE_INFO;
var module=moduleInfo[moduleName];var log=SC.LOG_MODULE_LOADING;if(log){SC.Logger.log("SC.Module: Evaluating and invoking callbacks for '%@'.".fmt(moduleName))
}if(module.source){this._evaluateStringLoadedModule(module)}module.isReady=YES;if(SC.isReady){SC.Module._invokeCallbacksForModule(moduleName);
delete module.callbacks}else{SC.ready(SC,function(){SC.Module._invokeCallbacksForModule(moduleName);
delete module.callbacks})}var dependents=module.dependents||[];var dependentName,dependent;
for(var idx=0,len=dependents.length;idx<len;idx++){dependentName=dependents[idx];
dependent=moduleInfo[dependentName];if(dependent.isLoaded&&this._dependenciesMetForModule(dependentName)){if(log){SC.Logger.log("SC.Module: Now that %@ has loaded, all dependencies for a dependent %@ are met.".fmt(moduleName,dependentName))
}this._evaluateAndInvokeCallbacks(dependentName)}}},_moduleDidLoad:function(moduleName){var module=SC.MODULE_INFO[moduleName];
var log=SC.LOG_MODULE_LOADING;var dependenciesMet;var callbacks,targets;if(log){SC.Logger.log("SC.Module: Module '%@' finished loading.".fmt(moduleName))
}if(!module){if(log){SC.Logger.log("SC._moduleDidLoad() called for unknown module '@'.".fmt(moduleName))
}module=SC.MODULE_INFO[moduleName]={isLoaded:YES,isReady:YES};return}if(module.isLoaded){if(log){SC.Logger.log("SC._moduleDidLoad() called more than once for module '%@'. Skipping.".fmt(moduleName))
}return}delete module.isLoading;module.isLoaded=YES;if(!module.isPrefetching){dependenciesMet=this._dependenciesMetForModule(moduleName);
if(dependenciesMet){this._evaluateAndInvokeCallbacks(moduleName)}else{if(log){SC.Logger.log("SC.Module: Dependencies for '%@' not met yet, waiting to evaluate.".fmt(moduleName))
}}}else{delete module.isPrefetching;if(log){SC.Logger.log("SC.Module: Module '%@' was prefetched, not evaluating until needed.".fmt(moduleName))
}}},_targetForTargetName:function(targetName){if(SC.typeOf(targetName)===SC.T_STRING){return SC.objectForPropertyPath(targetName)
}return targetName},_methodForMethodNameInTarget:function(methodName,target){if(SC.typeOf(methodName)===SC.T_STRING){return SC.objectForPropertyPath(methodName,target)
}return methodName}});SC.ready(function(){var moduleInfo=SC.MODULE_INFO;var moduleName;
var module;var task;for(moduleName in moduleInfo){module=moduleInfo[moduleName];if(module.isPrefetched){var prefetchedModuleName=moduleName;
task=SC.Task.create({run:function(){SC.Module.prefetchModule(prefetchedModuleName)
}});SC.backgroundTaskQueue.push(task)}}});SC.Response=SC.Object.extend({isError:NO,errorValue:function(){return this
}.property().cacheable(),errorObject:null,request:null,originalRequest:function(){var ret=this.get("request");
while(ret.get("source")){ret=ret.get("source")}return ret}.property("request").cacheable(),type:function(){return this.getPath("request.type")
}.property("request").cacheable(),address:function(){return this.getPath("request.address")
}.property("request").cacheable(),isJSON:function(){return this.getPath("request.isJSON")||NO
}.property("request").cacheable(),isXML:function(){return this.getPath("request.isXML")||NO
}.property("request").cacheable(),listeners:function(){return this.getPath("request.listeners")
}.property("request").cacheable(),status:-100,headers:null,body:function(){var ret=this.get("encodedBody");
if(ret&&this.get("isJSON")){try{ret=SC.json.decode(ret)}catch(e){return SC.Error.create({message:e.name+": "+e.message,label:"Response",errorValue:this})
}}return ret}.property("encodedBody").cacheable(),response:function(){return this.get("body")
}.property("body").cacheable(),isCancelled:NO,timedOut:null,timeoutTimer:null,fire:function(){var req=this.get("request"),source=req?req.get("source"):null;
if(source&&source.willSend){source.willSend(req,this)}req.freeze();if(!this.get("isCancelled")){this.invokeTransport()
}var timeout=req.get("timeout");if(timeout){var timer=SC.Timer.schedule({target:this,action:"timeoutReached",interval:timeout,repeats:NO});
this.set("timeoutTimer",timer)}if(!this.get("isCancelled")&&source&&source.didSend){source.didSend(req,this)
}},invokeTransport:function(){this.receive(function(proceed){this.set("status",200)
},this)},receive:function(callback,context){if(!this.get("timedOut")){var timer=this.get("timeoutTimer");
if(timer){timer.invalidate()}this.set("timedOut",NO)}var req=this.get("request");
var source=req?req.get("source"):null;SC.run(function(){if(source&&source.willReceive){source.willReceive(req,this)
}callback.call(context,!this.get("isCancelled"));if(!this.get("isCancelled")&&source&&source.didReceive){source.didReceive(req,this)
}if(!this.get("isCancelled")){this.notify()}},this);SC.Request.manager.transportDidClose(this);
return this},cancel:function(){if(!this.get("isCancelled")){this.set("isCancelled",YES);
this.cancelTransport();SC.Request.manager.transportDidClose(this)}},timeoutReached:function(){if(this.get("timedOut")===null){this.set("timedOut",YES);
this.cancelTransport();this.receive(function(proceed){if(!proceed){return}var error=SC.$error("HTTP Request timed out","Request",0);
error.set("errorValue",this);this.set("isError",YES);this.set("errorObject",error);
this.set("status",0)},this);return YES}return NO},cancelTransport:function(){},_notifyListener:function(listeners,status){var info=listeners[status],params,target,action;
if(!info){return NO}params=(info.params||[]).copy();params.unshift(this);target=info.target;
action=info.action;if(SC.typeOf(action)===SC.T_STRING){action=target[action]}return action.apply(target,params)
},notify:function(){var listeners=this.get("listeners"),status=this.get("status"),baseStat=Math.floor(status/100)*100,handled=NO;
if(!listeners){return this}handled=this._notifyListener(listeners,status);if(!handled){handled=this._notifyListener(listeners,baseStat)
}if(!handled){handled=this._notifyListener(listeners,0)}return this},toString:function(){var ret=arguments.callee.base.apply(this,arguments);
return"%@<%@ %@, status=%@".fmt(ret,this.get("type"),this.get("address"),this.get("status"))
}});SC.XHRResponse=SC.Response.extend({headers:function(){var xhr=this.get("rawRequest"),str=xhr?xhr.getAllResponseHeaders():null,ret={};
if(!str){return ret}str.split("\n").forEach(function(header){var idx=header.indexOf(":"),key,value;
if(idx>=0){key=header.slice(0,idx);value=header.slice(idx+1).trim();ret[key]=value
}},this);return ret}.property("status").cacheable(),header:function(key){var xhr=this.get("rawRequest");
return xhr?xhr.getResponseHeader(key):null},encodedBody:function(){var xhr=this.get("rawRequest"),ret;
if(!xhr){ret=null}else{if(this.get("isXML")){ret=xhr.responseXML}else{ret=xhr.responseText
}}return ret}.property("status").cacheable(),cancelTransport:function(){var rawRequest=this.get("rawRequest");
if(rawRequest){rawRequest.abort()}this.set("rawRequest",null)},invokeTransport:function(){var rawRequest,transport,handleReadyStateChange,async,headers;
rawRequest=this.createRequest();this.set("rawRequest",rawRequest);async=!!this.getPath("request.isAsynchronous");
if(async){if(!SC.browser.msie&&!SC.browser.opera){SC.Event.add(rawRequest,"readystatechange",this,this.finishRequest,rawRequest)
}else{transport=this;handleReadyStateChange=function(){if(!transport){return null
}var ret=transport.finishRequest();if(ret){transport=null}return ret};rawRequest.onreadystatechange=handleReadyStateChange
}}rawRequest.open(this.get("type"),this.get("address"),async);headers=this.getPath("request.headers");
for(var headerKey in headers){rawRequest.setRequestHeader(headerKey,headers[headerKey])
}rawRequest.send(this.getPath("request.encodedBody"));if(!async){this.finishRequest()
}return rawRequest},createRequest:function(){function tryThese(){for(var i=0;i<arguments.length;
i++){try{var item=arguments[i]();return item}catch(e){}}return NO}return tryThese(function(){return new XMLHttpRequest()
},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")
})},finishRequest:function(evt){var rawRequest=this.get("rawRequest"),readyState=rawRequest.readyState,error,status,msg;
if(readyState===4&&!this.get("timedOut")){this.receive(function(proceed){if(!proceed){return
}status=-1;try{status=rawRequest.status||0}catch(e){}if((status<200)||(status>=300)){try{msg=rawRequest.statusText||""
}catch(e2){msg=""}error=SC.$error(msg||"HTTP Request failed","Request",status);error.set("errorValue",this);
this.set("isError",YES);this.set("errorObject",error)}this.set("status",status)},this);
if(!SC.browser.msie&&!SC.browser.opera){SC.Event.remove(rawRequest,"readystatechange",this,this.finishRequest)
}else{rawRequest.onreadystatechange=null}return YES}return NO}});sc_require("system/response");
SC.Request=SC.Object.extend(SC.Copyable,SC.Freezable,{isAsynchronous:YES,isJSON:NO,isXML:NO,init:function(){arguments.callee.base.apply(this,arguments);
this.header("X-Requested-With","XMLHttpRequest");this.header("X-SproutCore-Version",SC.VERSION)
},headers:function(){var ret=this._headers;if(!ret){ret=this._headers={}}return ret
}.property().cacheable(),responseClass:SC.XHRResponse,source:null,address:null,type:"GET",timeout:null,body:null,encodedBody:function(){var ret=this.get("body");
if(ret&&this.get("isJSON")){ret=SC.json.encode(ret)}return ret}.property("isJSON","isXML","body").cacheable(),willSend:function(request,response){},didSend:function(request,response){},willReceive:function(request,response){},didReceive:function(request,response){},COPY_KEYS:"isAsynchronous isJSON isXML address type timeout body responseClass willSend didSend willReceive didReceive".w(),copy:function(){var ret={},keys=this.COPY_KEYS,loc=keys.length,key,listeners,headers;
while(--loc>=0){key=keys[loc];if(this.hasOwnProperty(key)){ret[key]=this.get(key)
}}if(this.hasOwnProperty("listeners")){ret.listeners=SC.copy(this.get("listeners"))
}if(this.hasOwnProperty("_headers")){ret._headers=SC.copy(this._headers)}ret.source=this.get("source")||this;
return this.constructor.create(ret)},header:function(key,value){var headers;if(SC.typeOf(key)===SC.T_STRING){headers=this._headers;
if(arguments.length===1){return headers?headers[key]:null}else{this.propertyWillChange("headers");
if(!headers){headers=this._headers={}}headers[key]=value;this.propertyDidChange("headers");
return this}}else{if(value===undefined){headers=key;this.beginPropertyChanges();for(key in headers){if(!headers.hasOwnProperty(key)){continue
}this.header(key,headers[key])}this.endPropertyChanges();return this}}return this
},async:function(flag){if(flag===undefined){flag=YES}return this.set("isAsynchronous",flag)
},timeoutAfter:function(timeout){return this.set("timeout",timeout)},json:function(flag){if(flag===undefined){flag=YES
}if(flag){this.set("isXML",NO)}return this.set("isJSON",flag)},xml:function(flag){if(flag===undefined){flag=YES
}if(flag){this.set("isJSON",NO)}return this.set("isXML",flag)},_prep:function(){var hasContentType=!!this.header("Content-Type");
if(this.get("isJSON")&&!hasContentType){this.header("Content-Type","application/json")
}else{if(this.get("isXML")&&!hasContentType){this.header("Content-Type","text/xml")
}}return this},send:function(body){var timeout=this.get("timeout");if(timeout){if(!this.get("isAsynchronous")){throw"Timeout values cannot be used with synchronous requests"
}}else{if(timeout===0){throw"The timeout value must either not be specified or must be greater than 0"
}}if(body){this.set("body",body)}return SC.Request.manager.sendRequest(this.copy()._prep())
},resend:function(){var req=this.get("source")?this:this.copy()._prep();return SC.Request.manager.sendRequest(req)
},notify:function(status,target,action,params){var hasStatus=YES;if(SC.typeOf(status)!==SC.T_NUMBER){params=SC.A(arguments).slice(2);
action=target;target=status;status=0;hasStatus=NO}else{params=SC.A(arguments).slice(3)
}var listeners=this.get("listeners");if(!listeners){this.set("listeners",listeners={})
}listeners[status]={target:target,action:action,params:params};return this}});SC.Request.mixin({getUrl:function(address){return this.create().set("address",address).set("type","GET")
},postUrl:function(address,body){var req=this.create().set("address",address).set("type","POST");
if(body){req.set("body",body)}return req},deleteUrl:function(address){return this.create().set("address",address).set("type","DELETE")
},putUrl:function(address,body){var req=this.create().set("address",address).set("type","PUT");
if(body){req.set("body",body)}return req}});SC.Request.manager=SC.Object.create(SC.DelegateSupport,{maxRequests:6,inflight:[],pending:[],sendRequest:function(request){if(!request){return null
}var response=request.get("responseClass").create({request:request});this.get("pending").pushObject(response);
this.fireRequestIfNeeded();return response},cancel:function(response){var pending=this.get("pending"),inflight=this.get("inflight"),idx;
if(pending.indexOf(response)>=0){this.propertyWillChange("pending");pending.removeObject(response);
this.propertyDidChange("pending");return YES}else{if(inflight.indexOf(response)>=0){response.cancel();
inflight.removeObject(response);this.fireRequestIfNeeded();return YES}else{return NO
}}},cancelAll:function(){if(this.get("pending").length||this.get("inflight").length){this.set("pending",[]);
this.get("inflight").forEach(function(r){r.cancel()});this.set("inflight",[]);return YES
}else{return NO}},fireRequestIfNeeded:function(){var pending=this.get("pending"),inflight=this.get("inflight"),max=this.get("maxRequests"),next;
if((pending.length>0)&&(inflight.length<max)){next=pending.shiftObject();inflight.pushObject(next);
next.fire()}},transportDidClose:function(response){this.get("inflight").removeObject(response);
this.fireRequestIfNeeded()}});SC.routes=SC.Object.create({wantsHistory:NO,usesHistory:null,baseURI:document.baseURI,_didSetup:NO,_location:null,_firstRoute:null,_extractParametersAndRoute:function(obj){var params={},route=obj.route||"",separator,parts,i,len,crumbs,key;
separator=(route.indexOf("?")<0&&route.indexOf("&")>=0)?"&":"?";parts=route.split(separator);
route=parts[0];if(parts.length===1){parts=[]}else{if(parts.length===2){parts=parts[1].split("&")
}else{if(parts.length>2){parts.shift()}}}len=parts.length;for(i=0;i<len;++i){crumbs=parts[i].split("=");
params[crumbs[0]]=crumbs[1]}for(key in obj){if(obj.hasOwnProperty(key)&&key!=="route"){params[key]=""+obj[key]
}}parts=[];for(key in params){parts.push([key,params[key]].join("="))}params.params=separator+parts.join("&");
params.route=route;return params},location:function(key,value){var crumbs,encodedValue;
if(value!==undefined){if(value===null){value=""}if(typeof(value)==="object"){crumbs=this._extractParametersAndRoute(value);
value=crumbs.route+crumbs.params}if(!SC.empty(value)||(this._location&&this._location!==value)){encodedValue=encodeURI(value);
if(this.usesHistory){if(encodedValue.length>0){encodedValue="/"+encodedValue}window.history.pushState(null,null,this.get("baseURI")+encodedValue)
}else{window.location.hash=encodedValue}}this._location=value}return this._location
}.property(),ping:function(){var that;if(!this._didSetup){this._didSetup=YES;if(this.get("wantsHistory")&&SC.platform.supportsHistory){this.usesHistory=YES;
this.popState();SC.Event.add(window,"popstate",this,this.popState)}else{this.usesHistory=NO;
if(SC.platform.supportsHashChange){this.hashChange();SC.Event.add(window,"hashchange",this,this.hashChange)
}else{that=this;this._invokeHashChange=function(){that.hashChange();setTimeout(that._invokeHashChange,100)
};this._invokeHashChange()}}}},hashChange:function(event){var loc=window.location.hash;
loc=(loc&&loc.length>0)?loc.slice(1,loc.length):"";if(!SC.browser.isMozilla){loc=decodeURI(loc)
}if(this.get("location")!==loc){SC.run(function(){this.set("location",loc)},this)
}},popState:function(event){var base=this.get("baseURI"),loc=document.location.href;
if(loc.slice(0,base.length)===base){loc=loc.slice(base.length+1,loc.length);if(this.get("location")!==loc){SC.run(function(){this.set("location",loc)
},this)}}},add:function(route,target,method){if(!this._didSetup){this.invokeLast(this.ping)
}if(method===undefined&&SC.typeOf(target)===SC.T_FUNCTION){method=target;target=null
}else{if(SC.typeOf(method)===SC.T_STRING){method=target[method]}}if(!this._firstRoute){this._firstRoute=this._Route.create()
}this._firstRoute.add(route.split("/"),target,method);return this},locationDidChange:function(){this.trigger()
}.observes("location"),trigger:function(){var firstRoute=this._firstRoute,location=this.get("location"),params,route;
if(firstRoute){params=this._extractParametersAndRoute({route:location});location=params.route;
delete params.route;delete params.params;route=firstRoute.routeForParts(location.split("/"),params);
if(route&&route.target&&route.method){route.method.call(route.target,params)}}},_Route:SC.Object.extend({target:null,method:null,staticRoutes:null,dynamicRoutes:null,wildcardRoutes:null,add:function(parts,target,method){var part,nextRoute;
parts=SC.clone(parts);if(!parts||parts.length===0){this.target=target;this.method=method
}else{part=parts.shift();switch(part.slice(0,1)){case":":part=part.slice(1,part.length);
if(!this.dynamicRoutes){this.dynamicRoutes={}}if(!this.dynamicRoutes[part]){this.dynamicRoutes[part]=this.constructor.create()
}nextRoute=this.dynamicRoutes[part];break;case"*":part=part.slice(1,part.length);
if(!this.wildcardRoutes){this.wildcardRoutes={}}nextRoute=this.wildcardRoutes[part]=this.constructor.create();
break;default:if(!this.staticRoutes){this.staticRoutes={}}if(!this.staticRoutes[part]){this.staticRoutes[part]=this.constructor.create()
}nextRoute=this.staticRoutes[part]}if(nextRoute){nextRoute.add(parts,target,method)
}}},routeForParts:function(parts,params){var part,key,route;parts=SC.clone(parts);
if(!parts||parts.length===0){return this.method?this:null}else{part=parts.shift();
if(this.staticRoutes&&this.staticRoutes[part]){return this.staticRoutes[part].routeForParts(parts,params)
}else{for(key in this.dynamicRoutes){route=this.dynamicRoutes[key].routeForParts(parts,params);
if(route){params[key]=part;return route}}for(key in this.wildcardRoutes){parts.unshift(part);
params[key]=parts.join("/");return this.wildcardRoutes[key].routeForParts(null,params)
}return null}}}})});SC.StaticQueue=SC.mixin({},{_content:null,create:function(max){var ret=SC.beget(this);
ret._content=[];ret._content.length=max;return ret},enqueue:function(item){if(this.length>=this._content.length){return
}this._content[this._tail++]=item;if(this._tail>=this._content.length){this._tail=0
}this.length++;return this},dequeue:function(){var ret;if(this.length>0){ret=this._content[this._head++]
}else{return null}if(this._head>=this._content.length){this._head=0}this.length--;
return ret},peek:function(index){index=index||0;return this._content[(this._head+index)%this.length]
},length:0,_head:0,_tail:0});SC.time=function(timeoffset){var ret=SC.beget(fn);ret.value=timeOffset;
return ret};(function(){var date=new Date();SC.mixin(SC.time,{month:function(offset,newMonth){date.setTime(offset);
if(newMonth===undefined){return date.getMonth()}date.setMonth(newMonth);return date.getTime()
},utc:function(offset){date.setTime(offset);return offset+(date.getTimezoneOffset()*60*1000)
},local:function(offset){date.setTime(offset);return offset-(date.getTimezoneOffset()*60*1000)
},parse:function(string){},format:function(offset){}})})();SC.time.fmt=SC.time.format;
SC.time.fn={done:function(){return this.value}};"month day year".split(" ").forEach(function(key){SC.time.fn[key]=function(newTime){if(newTime===undefined){return SC.time[key](this.value)
}else{this.value=SC.time[key](this.value,newTime);return this}}});var MONTH_NAMES=new Array("January","February","March","April","May","June","July","August","September","October","November","December","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var DAY_NAMES=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sun","Mon","Tue","Wed","Thu","Fri","Sat");
function LZ(x){return(x<0||x>9?"":"0")+x}SC.Locale.define("en",{longMonthNames:"January February March April May".split(" "),shortMonthNames:[],shortDateFormat:"dd/mm/yy",longDateFormat:""});
SC.mixin(Date,{isDate:function(val,format){var date=Date.getDateFromFormat(val,format);
if(date==0){return false}return true},compareDates:function(date1,dateformat1,date2,dateformat2){var d1=Date.getDateFromFormat(date1,dateformat1);
var d2=Date.getDateFromFormat(date2,dateformat2);if(d1==0||d2==0){return -1}else{if(d1>d2){return 1
}}return 0},getDateFromFormat:function(val,format){val=val+"";format=format+"";var i_val=0;
var i_format=0;var c="";var token="";var token2="";var x,y;var now=new Date();var year=now.getFullYear();
var month=now.getMonth()+1;var date=1;var hh=now.getHours();var mm=now.getMinutes();
var ss=now.getSeconds();var ampm="";var locale=SC.Locale.currentLocale;while(i_format<format.length){c=format.charAt(i_format);
token="";while((format.charAt(i_format)==c)&&(i_format<format.length)){token+=format.charAt(i_format++)
}if(token=="yyyy"||token=="yy"||token=="y"){if(token=="yyyy"){x=4;y=4}if(token=="yy"){x=2;
y=2}if(token=="y"){x=2;y=4}year=Date._getInt(val,i_val,x,y);if(year==null){return 0
}i_val+=year.length;if(year.length==2){if(year>70){year=1900+(year-0)}else{year=2000+(year-0)
}}}else{if(token=="MMM"||token=="NNN"){month=0;for(var i=0;i<MONTH_NAMES.length;i++){var month_name=MONTH_NAMES[i];
if(val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()){if(token=="MMM"||(token=="NNN"&&i>11)){month=i+1;
if(month>12){month-=12}i_val+=month_name.length;break}}}if((month<1)||(month>12)){return 0
}}else{if(token=="EE"||token=="E"){for(var i=0;i<DAY_NAMES.length;i++){var day_name=DAY_NAMES[i];
if(val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()){i_val+=day_name.length;
break}}}else{if(token=="MM"||token=="M"){month=Date._getInt(val,i_val,token.length,2);
if(month==null||(month<1)||(month>12)){return 0}i_val+=month.length}else{if(token=="dd"||token=="d"){date=Date._getInt(val,i_val,token.length,2);
if(date==null||(date<1)||(date>31)){return 0}i_val+=date.length}else{if(token=="hh"||token=="h"){hh=Date._getInt(val,i_val,token.length,2);
if(hh==null||(hh<1)||(hh>12)){return 0}i_val+=hh.length}else{if(token=="HH"||token=="H"){hh=Date._getInt(val,i_val,token.length,2);
if(hh==null||(hh<0)||(hh>23)){return 0}i_val+=hh.length}else{if(token=="KK"||token=="K"){hh=Date._getInt(val,i_val,token.length,2);
if(hh==null||(hh<0)||(hh>11)){return 0}i_val+=hh.length}else{if(token=="kk"||token=="k"){hh=Date._getInt(val,i_val,token.length,2);
if(hh==null||(hh<1)||(hh>24)){return 0}i_val+=hh.length;hh--}else{if(token=="mm"||token=="m"){mm=Date._getInt(val,i_val,token.length,2);
if(mm==null||(mm<0)||(mm>59)){return 0}i_val+=mm.length}else{if(token=="ss"||token=="s"){ss=Date._getInt(val,i_val,token.length,2);
if(ss==null||(ss<0)||(ss>59)){return 0}i_val+=ss.length}else{if(token=="a"){if(val.substring(i_val,i_val+2).toLowerCase()=="am"){ampm="AM"
}else{if(val.substring(i_val,i_val+2).toLowerCase()=="pm"){ampm="PM"}else{return 0
}}i_val+=2}else{if(val.substring(i_val,i_val+token.length)!=token){return 0}else{i_val+=token.length
}}}}}}}}}}}}}}if(i_val!=val.length){return 0}if(month==2){if(((year%4==0)&&(year%100!=0))||(year%400==0)){if(date>29){return 0
}}else{if(date>28){return 0}}}if((month==4)||(month==6)||(month==9)||(month==11)){if(date>30){return 0
}}if(hh<12&&ampm=="PM"){hh=hh-0+12}else{if(hh>11&&ampm=="AM"){hh-=12}}var newdate=new Date(year,month-1,date,hh,mm,ss);
return newdate.getTime()},parseDate:function(val){var preferEuro=(arguments.length==2)?arguments[1]:false;
generalFormats=new Array("E NNN dd HH:mm:ss UTC yyyy","y-M-d","y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d","d MMM y","d.MMM.y","y MMM d","y.MMM.d");
monthFirst=new Array("M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d");dateFirst=new Array("d/M/y","d-M-y","d.M.y","d-MMM","d/M","d-M");
var checkList=new Array("generalFormats",preferEuro?"dateFirst":"monthFirst",preferEuro?"monthFirst":"dateFirst");
var d=null;d=0;var now=new Date().getTime();switch(val.toLowerCase()){case"yesterday".loc():d=now-(24*60*60*1000);
break;case"today".loc():case"now".loc():d=now;break;case"tomorrow".loc():d=now+(24*60*60*1000);
break}if(d>0){return new Date(d)}for(var i=0;i<checkList.length;i++){var l=window[checkList[i]];
for(var j=0;j<l.length;j++){d=Date.getDateFromFormat(val,l[j]);if(d==0){d=Date.getDateFromFormat(val,l[j]+" H:m:s")
}if(d==0){d=Date.getDateFromFormat(val,l[j]+" h:m:s a")}if(d!=0){return new Date(d)
}}}return null},_isInteger:function(val){var digits="1234567890";for(var i=0;i<val.length;
i++){if(digits.indexOf(val.charAt(i))==-1){return false}}return true},_getInt:function(str,i,minlength,maxlength){for(var x=maxlength;
x>=minlength;x--){var token=str.substring(i,i+x);if(token.length<minlength){return null
}if(Date._isInteger(token)){return token}}return null}});SC.mixin(Date.prototype,{format:function(format){format=format+"";
var date=this;var result="";var i_format=0;var c="";var token="";var y=date.getFullYear()+"";
var M=date.getMonth()+1;var d=date.getDate();var E=date.getDay();var H=date.getHours();
var m=date.getMinutes();var s=date.getSeconds();var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
var value=new Object();if(y.length<4){y=""+(y-0+1900)}value.y=""+y;value.yyyy=y;value.yy=y.substring(2,4);
value.M=M;value.MM=LZ(M);value.MMM=MONTH_NAMES[M-1];value.NNN=MONTH_NAMES[M+11];value.d=d;
value.dd=LZ(d);value.E=DAY_NAMES[E+7];value.EE=DAY_NAMES[E];value.H=H;value.HH=LZ(H);
if(H==0){value.h=12}else{if(H>12){value.h=H-12}else{value.h=H}}value.hh=LZ(value.h);
if(H>11){value.K=H-12}else{value.K=H}value.k=H+1;value.KK=LZ(value.K);value.kk=LZ(value.k);
if(H>11){value.a="PM"}else{value.a="AM"}value.m=m;value.mm=LZ(m);value.s=s;value.ss=LZ(s);
while(i_format<format.length){c=format.charAt(i_format);token="";while((format.charAt(i_format)==c)&&(i_format<format.length)){token+=format.charAt(i_format++)
}if(value[token]!=null){result=result+value[token]}else{result=result+token}}return result
},utcFormat:function(){return(new Date(this.getTime()+(this.getTimezoneOffset()*60*1000))).format("E NNN dd HH:mm:ss UTC yyyy")
}});SC.UserDefaults=SC.Object.extend({ready:NO,userDomain:null,appDomain:null,_defaults:null,_safari3DB:null,defaults:function(newDefaults){this._defaults=newDefaults;
this.allPropertiesDidChange()},readDefault:function(keyName){var ret,userKeyName,localStorage,key,del,storageSafari3;
keyName=this._normalizeKeyName(keyName);userKeyName=this._userKeyName(keyName);if(this._written){ret=this._written[userKeyName]
}if(SC.browser.msie=="7.0"){localStorage=document.body;try{localStorage.load("SC.UserDefaults")
}catch(e){SC.Logger.error("Couldn't load userDefaults in IE7: "+e.description)}}else{if(this.HTML5DB_noLocalStorage){storageSafari3=this._safari3DB
}else{localStorage=window.localStorage;if(!localStorage&&window.globalStorage){localStorage=window.globalStorage[window.location.hostname]
}}}if(localStorage||storageSafari3){key=["SC.UserDefaults",userKeyName].join("-at-");
if(SC.browser.msie=="7.0"){ret=localStorage.getAttribute(key.replace(/\W/gi,""))}else{if(storageSafari3){ret=this.dataHash[key]
}else{ret=localStorage[key]}}if(!SC.none(ret)){try{ret=SC.json.decode(ret)}catch(ex){}}}del=this.delegate;
if(del&&del.userDefaultsNeedsDefault){ret=del.userDefaultsNeedsDefault(this,keyName,userKeyName)
}if((ret===undefined)&&this._defaults){ret=this._defaults[userKeyName]||this._defaults[keyName]
}return ret},writeDefault:function(keyName,value){var userKeyName,written,localStorage,key,del,storageSafari3;
keyName=this._normalizeKeyName(keyName);userKeyName=this._userKeyName(keyName);written=this._written;
if(!written){written=this._written={}}written[userKeyName]=value;if(SC.browser.msie=="7.0"){localStorage=document.body
}else{if(this.HTML5DB_noLocalStorage){storageSafari3=this._safari3DB}else{localStorage=window.localStorage;
if(!localStorage&&window.globalStorage){localStorage=window.globalStorage[window.location.hostname]
}}}key=["SC.UserDefaults",userKeyName].join("-at-");if(localStorage||storageSafari3){var encodedValue=SC.json.encode(value);
if(SC.browser.msie=="7.0"){localStorage.setAttribute(key.replace(/\W/gi,""),encodedValue);
localStorage.save("SC.UserDefaults")}else{if(storageSafari3){var obj=this;storageSafari3.transaction(function(t){t.executeSql("delete from SCLocalStorage where key = ?",[key],function(){t.executeSql("insert into SCLocalStorage(key, value) VALUES ('"+key+"', '"+encodedValue+"');",[],obj._nullDataHandler,obj.killTransaction)
})});this.dataHash[key]=encodedValue}else{try{localStorage[key]=encodedValue}catch(e){SC.Logger.error("Failed using localStorage. "+e)
}}}}del=this.delegate;if(del&&del.userDefaultsDidChange){del.userDefaultsDidChange(this,keyName,value,userKeyName)
}return this},resetDefault:function(keyName){var fullKeyName,userKeyName,written,localStorage,key,storageSafari3;
fullKeyName=this._normalizeKeyName(keyName);userKeyName=this._userKeyName(fullKeyName);
this.propertyWillChange(keyName);this.propertyWillChange(fullKeyName);written=this._written;
if(written){delete written[userKeyName]}if(SC.browser.msie=="7.0"){localStorage=document.body
}else{if(this.HTML5DB_noLocalStorage){storageSafari3=this._safari3DB}else{localStorage=window.localStorage;
if(!localStorage&&window.globalStorage){localStorage=window.globalStorage[window.location.hostname]
}}}key=["SC.UserDefaults",userKeyName].join("-at-");if(localStorage){if(SC.browser.msie=="7.0"){localStorage.setAttribute(key.replace(/\W/gi,""),null);
localStorage.save("SC.UserDefaults")}else{if(storageSafari3){var obj=this;storageSafari3.transaction(function(t){t.executeSql("delete from SCLocalStorage where key = ?",[key],null)
});delete this.dataHash[key]}else{try{delete localStorage[key]}catch(e){SC.Logger.warn("Deleting local storage encountered a problem. "+e)
}}}}this.propertyDidChange(keyName);this.propertyDidChange(fullKeyName);return this
},unknownProperty:function(key,value){if(value===undefined){return this.readDefault(key)
}else{this.writeDefault(key,value);return value}},_normalizeKeyName:function(keyName){if(keyName.indexOf(":")<0){var domain=this.get("appDomain")||"app";
keyName=[domain,keyName].join(":")}return keyName},_userKeyName:function(keyName){var user=this.get("userDomain")||"(anonymous)";
return[user,keyName].join("-at-")},_domainDidChange:function(){var didChange=NO;if(this.get("userDomain")!==this._scud_userDomain){this._scud_userDomain=this.get("userDomain");
didChange=YES}if(this.get("appDomain")!==this._scud_appDomain){this._scud_appDomain=this.get("appDomain");
didChange=YES}if(didChange){this.allPropertiesDidChange()}}.observes("userDomain","appDomain"),init:function(){arguments.callee.base.apply(this,arguments);
jQuery.readyWait++;if(SC.userDefaults&&SC.userDefaults.get("dataHash")){var dh=SC.userDefaults.get("dataHash");
if(dh){this.dataHash=SC.userDefaults.get("dataHash")}}this._scud_userDomain=this.get("userDomain");
this._scud_appDomain=this.get("appDomain");if(SC.browser.msie=="7.0"){document.body.addBehavior("#default#userData")
}this.HTML5DB_noLocalStorage=((parseInt(SC.browser.webkit,0)>523)&&(parseInt(SC.browser.webkit,0)<528));
if(this.HTML5DB_noLocalStorage){var myDB;try{if(!window.openDatabase){SC.Logger.error("Trying to load a database with safari version 3.1 to get SC.UserDefaults to work. You are either in a previous version or there is a problem with your browser.");
return}else{var shortName="scdb",version="1.0",displayName="SproutCore database",maxSize=65536;
myDB=openDatabase(shortName,version,displayName,maxSize)}}catch(e){SC.Logger.error("Trying to load a database with safari version 3.1 to get SC.UserDefaults to work. You are either in a previous version or there is a problem with your browser.");
return}if(myDB){var obj=this;myDB.transaction(function(transaction){transaction.executeSql("CREATE TABLE IF NOT EXISTS SCLocalStorage(key TEXT NOT NULL PRIMARY KEY, value TEXT NOT NULL);",[],obj._nullDataHandler,obj.killTransaction)
});myDB.transaction(function(transaction){transaction.parent=obj;transaction.executeSql("SELECT * from SCLocalStorage;",[],function(transaction,results){var hash={},row;
for(var i=0,iLen=results.rows.length;i<iLen;i++){row=results.rows.item(i);hash[row.key]=row.value
}transaction.parent.dataHash=hash;SC.run(function(){jQuery.ready(true)})},obj.killTransaction)
});this._safari3DB=myDB}}else{jQuery.ready(true)}},_killTransaction:function(transaction,error){return true
},_nullDataHandler:function(transaction,results){}});SC.userDefaults=SC.UserDefaults.create();
SC.mixin({convertHsvToHex:function(h,s,v){var r=0,g=0,b=0;if(v>0){var i=(h==1)?0:Math.floor(h*6),f=(h==1)?0:(h*6)-i,p=v*(1-s),q=v*(1-(s*f)),t=v*(1-(s*(1-f))),rgb=[[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]];
r=Math.round(255*rgb[i][0]);g=Math.round(255*rgb[i][1]);b=Math.round(255*rgb[i][2])
}return this.parseColor("rgb("+r+","+g+","+b+")")},convertHexToHsv:function(hex){var rgb=this.expandColor(hex),max=Math.max(Math.max(rgb[0],rgb[1]),rgb[2]),min=Math.min(Math.min(rgb[0],rgb[1]),rgb[2]),s=(max===0)?0:(1-min/max),v=max/255,h=(max==min)?0:((max==rgb[0])?((rgb[1]-rgb[2])/(max-min)/6):((max==rgb[1])?((rgb[2]-rgb[0])/(max-min)/6+1/3):((rgb[0]-rgb[1])/(max-min)/6+2/3)));
h=(h<0)?(h+1):((h>1)?(h-1):h);return[h,s,v]},PARSE_COLOR_RGBRE:/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i,PARSE_COLOR_HEXRE:/^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,expandColor:function(color){var hexColor,red,green,blue;
hexColor=this.parseColor(color);if(hexColor){red=parseInt(hexColor.slice(1,3),16);
green=parseInt(hexColor.slice(3,5),16);blue=parseInt(hexColor.slice(5,7),16);return[red,green,blue]
}},parseColor:function(string){var i=0,color="#",match,part;if(match=this.PARSE_COLOR_RGBRE.exec(string)){for(i=1;
i<=3;i++){part=Math.max(0,Math.min(255,parseInt(match[i],0)));color+=this.toColorPart(part)
}return color}if(match=this.PARSE_COLOR_HEXRE.exec(string)){if(match[1].length==3){for(i=0;
i<3;i++){color+=match[1].charAt(i)+match[1].charAt(i)}return color}return"#"+match[1]
}return false},toColorPart:function(number){if(number>255){number=255}var digits=number.toString(16);
if(number<16){return"0"+digits}return digits}});SC.mixin({ZERO_RANGE:{start:0,length:0},RANGE_NOT_FOUND:{start:0,length:-1},valueInRange:function(value,range){return(value>=0)&&(value>=range.start)&&(value<(range.start+range.length))
},minRange:function(range){return range.start},maxRange:function(range){return(range.length<0)?-1:(range.start+range.length)
},unionRanges:function(r1,r2){if((r1==null)||(r1.length<0)){return r2}if((r2==null)||(r2.length<0)){return r1
}var min=Math.min(r1.start,r2.start),max=Math.max(SC.maxRange(r1),SC.maxRange(r2));
return{start:min,length:max-min}},intersectRanges:function(r1,r2){if((r1==null)||(r2==null)){return SC.RANGE_NOT_FOUND
}if((r1.length<0)||(r2.length<0)){return SC.RANGE_NOT_FOUND}var min=Math.max(SC.minRange(r1),SC.minRange(r2)),max=Math.min(SC.maxRange(r1),SC.maxRange(r2));
if(max<min){return SC.RANGE_NOT_FOUND}return{start:min,length:max-min}},subtractRanges:function(r1,r2){if((r1==null)||(r2==null)){return SC.RANGE_NOT_FOUND
}if((r1.length<0)||(r2.length<0)){return SC.RANGE_NOT_FOUND}var max=Math.max(SC.minRange(r1),SC.minRange(r2)),min=Math.min(SC.maxRange(r1),SC.maxRange(r2));
if(max<min){return SC.RANGE_NOT_FOUND}return{start:min,length:max-min}},cloneRange:function(r){return{start:r.start,length:r.length}
},rangesEqual:function(r1,r2){if(r1===r2){return true}if(r1==null){return r2.length<0
}if(r2==null){return r1.length<0}return(r1.start==r2.start)&&(r1.length==r2.length)
}});require("tasks/task");SC.didPreloadBundle=function(){};SC.PreloadBundleTask=SC.Task.extend({bundle:null,target:"SC",action:"preloaded",run:function(queue){var bundle;
if(bundle=this.get("bundle")){var st=Date.now();SC.Module.loadModule(this.get("bundle"),this.get("target"),this.get("action"))
}}});SC.VALIDATE_OK=YES;SC.VALIDATE_NO_CHANGE=NO;SC.Validator=SC.Object.extend({fieldValueForObject:function(object,form,view){return object
},objectForFieldValue:function(value,form,view){return value},validate:function(form,field){return true
},validateError:function(form,field){return SC.$error("Invalid.General(%@)".loc(field.get("fieldValue")),field.get("fieldKey"))
},validateChange:function(form,field,oldValue){return this.validate(form,field)?SC.VALIDATE_OK:this.validateError(form,field)
},validateSubmit:function(form,field){return this.validate(form,field)?SC.VALIDATE_OK:this.validateError(form,field)
},validatePartial:function(form,field){if(!field.get("isValid")){return this.validate(form,field)?SC.VALIDATE_OK:this.validateError(form,field)
}else{return SC.VALIDATE_NO_CHANGE}},validateKeyDown:function(form,field,charStr){return true
},attachTo:function(form,field){},detachFrom:function(form,field){}});SC.Validator.mixin({OK:true,NO_CHANGE:false,findFor:function(form,field,validatorKey){var validator;
if(!validatorKey){return}if(validatorKey instanceof SC.Validator){validator=validatorKey
}else{if(validatorKey.isClass){validator=validatorKey.create()}else{if(SC.typeOf(validatorKey)===SC.T_STRING){var name=null;
var m=validatorKey.match(/^(.+)\[(.*)\]/);if(m){validatorKey=m[1];name=m[2]}validatorKey=validatorKey.classify();
var validatorClass=SC.Validator[validatorKey];if(SC.none(validatorClass)){throw"validator %@ not found for %@".fmt(validatorKey,field)
}else{if(name){if(!form){throw"named validator (%@) could not be found for field %@ because the field does not belong to a form".fmt(name,field)
}if(!form._validatorHash){form._validatorHash={}}validator=(name)?form._validatorHash[name]:null;
if(!validator){validator=validatorClass.create()}if(name){form._validatorHash[name]=validator
}}else{validator=validatorClass.create()}}}}}return validator},fieldValueForObject:function(object,form,field){if(this.prototype&&this.prototype.fieldValueForObject){return this.prototype.fieldValueForObject(object,form,field)
}else{return null}},objectForFieldValue:function(value,form,field){if(this.prototype&&this.prototype.objectForFieldValue){return this.prototype.objectForFieldValue(value,form,field)
}else{return null}}});sc_require("validators/validator");SC.Validator.CreditCard=SC.Validator.extend({fieldValueForObject:function(object,form,field){if(typeof(object)=="string"&&object.length==16){object=[object.slice(0,4),object.slice(4,8),object.slice(8,12),object.slice(12,16)].join(" ")
}return object},objectForFieldValue:function(value,form,field){return value.replace(/[\s-\.\:]/g,"")
},validate:function(form,field){return this.checkNumber(field.get("fieldValue"))},validateError:function(form,field){var label=field.get("errorLabel")||"Field";
return SC.$error("Invalid.CreditCard(%@)".loc(label),label)},validateKeyDown:function(form,field,charStr){return !!charStr.match(/[0-9\- ]/)
},checkNumber:function(ccNumb){if(!ccNumb||ccNumb.length===0){return YES}ccNumb=ccNumb.replace(/[^0-9]/g,"");
var valid="0123456789";var len=ccNumb.length;var iCCN=parseInt(ccNumb,0);var sCCN=ccNumb.toString();
sCCN=sCCN.replace(/^\s+|\s+$/g,"");var iTotal=0;var bNum=true;var bResult=false;var temp;
var calc;for(var j=0;j<len;j++){temp=""+sCCN.substring(j,j+1);if(valid.indexOf(temp)=="-1"){bNum=false
}}if(!bNum){bResult=false}if((len===0)&&(bResult)){bResult=false}else{if(len>=15){for(var i=len;
i>0;i--){calc=parseInt(iCCN,0)%10;calc=parseInt(calc,0);iTotal+=calc;i--;iCCN=iCCN/10;
calc=parseInt(iCCN,0)%10;calc=calc*2;switch(calc){case 10:calc=1;break;case 12:calc=3;
break;case 14:calc=5;break;case 16:calc=7;break;case 18:calc=9;break;default:calc=calc
}iCCN=iCCN/10;iTotal+=calc}if((iTotal%10)===0){bResult=true}else{bResult=false}}}return bResult
}});sc_require("validators/validator");SC.Validator.Date=SC.Validator.extend({format:"NNN d, yyyy h:mm:ss a",fieldValueForObject:function(object,form,field){var date;
if(typeof(object)==="number"){date=new Date(object)}else{if(object instanceof Date){date=object
}}if(date){object=date.format(this.get("format"))}return object},objectForFieldValue:function(value,form,field){if(value){var date=Date.parseDate(value);
value=(date)?date.getTime():null}return value}});require("validators/validator");
SC.Validator.DateTime=SC.Validator.extend({format:"%d/%m/%Y",fieldValueForObject:function(object,form,field){if(SC.kindOf(object,SC.DateTime)){object=object.toFormattedString(this.get("format"))
}else{object=null}return object},objectForFieldValue:function(value,form,field){if(value){value=SC.DateTime.parse(value,this.get("format"))
}return value}});sc_require("validators/validator");SC.Validator.Email=SC.Validator.extend({validate:function(form,field){return(field.get("fieldValue")||"").match(/.+@.+\...+/)
},validateError:function(form,field){var label=field.get("errorLabel")||"Field";return SC.$error("Invalid.Email(%@)".loc(label),label)
}});SC.Validator.EmailOrEmpty=SC.Validator.Email.extend({validate:function(form,field){var value=field.get("fieldValue");
return(value&&value.length>0)?value.match(/.+@.+\...+/):true}});sc_require("validators/validator");
SC.Validator.NotEmpty=SC.Validator.extend({validate:function(form,field){var value=field.get("fieldValue");
if(SC.none(value)){return NO}if(!SC.none(value.length)){return value.length>0}return YES
},validateError:function(form,field){var label=field.get("errorLabel")||"Field";return SC.$error("Invalid.NotEmpty(%@)".loc(label.capitalize()),field.get("errorLabel"))
}});sc_require("validators/validator");sc_require("system/utils/misc");SC.Validator.Number=SC.Validator.extend({places:0,fieldValueForObject:function(object,form,field){switch(SC.typeOf(object)){case SC.T_NUMBER:object=object.toFixed(this.get("places"));
break;case SC.T_NULL:case SC.T_UNDEFINED:object="";break}return object},objectForFieldValue:function(value,form,field){var result;
value=value.replace(/,/g,"");switch(SC.typeOf(value)){case SC.T_STRING:if(value.length===0){value=null
}else{if(this.get("places")>0){value=parseFloat(value)}else{if(value.length==1&&value.match(/-/)){value=null
}else{result=parseInt(value,0);if(isNaN(result)){value=SC.uniJapaneseConvert(value);
value=parseInt(value,0);if(isNaN(value)){value=""}}else{value=result}}}}break;case SC.T_NULL:case SC.T_UNDEFINED:value=null;
break}return value},validate:function(form,field){var value=field.get("fieldValue");
return(value==="")||!(isNaN(value)||isNaN(parseFloat(value)))},validateError:function(form,field){var label=field.get("errorLabel")||"Field";
return SC.$error("Invalid.Number(%@)".loc(label),label)},validateKeyDown:function(form,field,charStr){var text=field.$input().val();
if(!text){text=""}text+=charStr;if(this.get("places")===0){if(charStr.length===0){return true
}else{return text.match(/^[\-{0,1}]?[0-9,\0]*/)[0]===text}}else{if(charStr.length===0){return true
}else{return text.match(/^[\-{0,1}]?[0-9,\0]*\.?[0-9\0]+/)===text}}}});sc_require("validators/validator");
SC.Validator.Password=SC.Validator.extend({attachTo:function(form,field){arguments.callee.base.apply(this,arguments);
if(!this.fields){this.fields=[]}this.fields.push(field)},validate:function(force){if(!this.fields||this.fields.length===0){return true
}var empty=false;var notEmpty=false;var ret=true;var value=this.fields[0].get("fieldValue");
this.fields.forEach(function(field){var curValue=field.get("fieldValue");if(curValue!=value){ret=false
}if(!curValue||curValue.length===0){empty=true}if(curValue&&curValue.length>0){notEmpty=true
}});if(force){return(notEmpty===false)?false:ret}else{return(empty===true)?true:ret
}},updateFields:function(form,valid){if(!this.fields||this.fields.length===0){return true
}var err="Invalid.Password".loc();var topField=this._field;this.fields.forEach(function(f){var msg=(valid)?null:((f==topField)?err:"");
form.setErrorFor(f,msg)});return(valid)?SC.VALIDATE_OK:err},validateChange:function(form,field,oldValue){return this.updateFields(form,this.validate(false))
},validateSubmit:function(form,field){return this.updateFields(form,this.validate(true))
},validatePartial:function(form,field){var isInvalid=!this._field.get("isValid");
if(isInvalid){return this.updateFields(form,this.validate(false))}else{return SC.VALIDATE_NO_CHANGE
}}});sc_require("validators/validator");SC.Validator.PositiveInteger=SC.Validator.extend({defaultValue:null,fieldValueForObject:function(object,form,field){switch(SC.typeOf(object)){case SC.T_NUMBER:object=object.toFixed(0);
break;case SC.T_NULL:case SC.T_UNDEFINED:object=this.get("defaultValue");break}return object
},objectForFieldValue:function(value,form,field){value=value.replace(/,/g,"");switch(SC.typeOf(value)){case SC.T_STRING:if(value.length===0){value=this.get("defaultValue")
}else{value=parseInt(value,0)}break;case SC.T_NULL:case SC.T_UNDEFINED:value=this.get("defaultValue");
break}return value},validate:function(form,field){var value=field.get("fieldValue");
return(value==="")||!isNaN(value)},validateError:function(form,field){var label=field.get("errorLabel")||"Field";
return SC.$error("Invalid.Number(%@)".loc(label),label)},validateKeyDown:function(form,field,charStr){var text=field.$input().val();
if(!text){text=""}text+=charStr;if(charStr.length===0){return true}else{return text.match(/^[0-9\0]*/)[0]===text
}}});SC.ContainerView=SC.View.extend({classNames:["sc-container-view"],renderDelegateName:"containerRenderDelegate",nowShowing:null,contentView:null,contentViewBindingDefault:SC.Binding.single(),replaceContent:function(newContent){this.removeAllChildren();
if(newContent){this.appendChild(newContent)}},createChildViews:function(){var view=this.get("contentView");
if(view){view=this.contentView=this.createChildView(view);this.childViews=[view]}},awake:function(){arguments.callee.base.apply(this,arguments);
var nowShowing=this.get("nowShowing");if(nowShowing&&nowShowing.length>0){this.nowShowingDidChange()
}},nowShowingDidChange:function(){var content=this.get("nowShowing");if(content===SC.CONTENT_SET_DIRECTLY){return
}if(SC.typeOf(content)===SC.T_STRING&&content.length>0){if(content.indexOf(".")>0){content=SC.objectForPropertyPath(content)
}else{var tempContent=this.getPath(content);content=SC.kindOf(tempContent,SC.View)?tempContent:SC.objectForPropertyPath(content,this.get("page"))
}}if(SC.typeOf(content)===SC.T_CLASS){if(content.kindOf(SC.CoreView)){content=content.create()
}else{content=null}}if(content&&!(content instanceof SC.CoreView)){content=null}this.set("contentView",content)
}.observes("nowShowing"),contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView")});SC.IMAGE_STATE_NONE="none";SC.IMAGE_STATE_LOADING="loading";
SC.IMAGE_STATE_LOADED="loaded";SC.IMAGE_STATE_FAILED="failed";SC.IMAGE_TYPE_NONE="NONE";
SC.IMAGE_TYPE_URL="URL";SC.IMAGE_TYPE_CSS_CLASS="CSS_CLASS";SC.BLANK_IMAGE_DATAURL="data:image/gif;base64,R0lGODlhAQABAJAAAP///wAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==";
SC.BLANK_IMAGE_URL=SC.browser.msie&&SC.browser.msie<8?"/static/sproutcore/foundation/en/5ccade3c5a829d178854ebc306da507944ad38a9/source/blank.gif":SC.BLANK_IMAGE_DATAURL;
SC.BLANK_IMAGE=new Image();SC.BLANK_IMAGE.src=SC.BLANK_IMAGE_URL;SC.BLANK_IMAGE.width=SC.BLANK_IMAGE.height=1;
SC.ImageView=SC.View.extend(SC.Control,SC.InnerFrame,{classNames:"sc-image-view",ariaRole:"img",displayProperties:"frame image innerFrame toolTip".w(),renderDelegateName:function(){return(this.get("useCanvas")?"canvasImage":"image")+"RenderDelegate"
}.property("useCanvas").cacheable(),tagName:function(){return this.get("useCanvas")?"canvas":"div"
}.property("useCanvas").cacheable(),canLoadInBackground:NO,image:SC.BLANK_IMAGE,imageValue:function(){var value=this.get("value");
return value&&value.isEnumerable?value.firstObject():value}.property("value").cacheable(),innerFrame:function(){var image=this.get("image"),imageWidth=image.width,imageHeight=image.height,frame=this.get("frame");
if(SC.none(frame)){return{x:0,y:0,width:0,height:0}}return this.innerFrameForSize(imageWidth,imageHeight,frame.width,frame.height)
}.property("align","image","scale","frame").cacheable(),localize:YES,status:SC.IMAGE_STATE_NONE,type:function(){var imageValue=this.get("imageValue");
if(SC.ImageView.valueIsUrl(imageValue)){return SC.IMAGE_TYPE_URL}else{if(!SC.none(imageValue)){return SC.IMAGE_TYPE_CSS_CLASS
}}return SC.IMAGE_TYPE_NONE}.property("imageValue").cacheable(),useCanvas:function(){return SC.platform.supportsCanvas
}.property().cacheable(),useImageQueue:YES,value:null,viewDidResize:function(){var layer=this.get("layer"),width,height;
if(layer){width=layer.offsetWidth;height=layer.offsetHeight;if(this._cachedWidth!==width||this._cachedHeight!==height){this.notifyPropertyChange("frame");
this._cachedWidth=width;this._cachedHeight=height}}},init:function(){arguments.callee.base.apply(this,arguments);
this._image_valueDidChange();if(this.get("useImageCache")!==undefined){SC.Logger.warn("%@ has useImageCache set, please set useImageQueue instead".fmt(this));
this.set("useImageQueue",this.get("useImageCache"))}},layerDidChange:function(){if(this.get("useCanvas")){this.set("layerNeedsUpdate",YES)
}}.observes("layer"),_image_valueDidChange:function(){var value=this.get("imageValue"),type=this.get("type");
if(value!==this._iv_value){this._iv_value=value;this.set("image",SC.BLANK_IMAGE);
this.set("status",SC.IMAGE_STATE_LOADING);if(!this._loadImageUsingCache()){if(!this._loadImage()){}}}}.observes("imageValue"),_loadImageUsingCache:function(){var value=this.get("imageValue"),type=this.get("type");
if(type===SC.IMAGE_TYPE_URL&&this.get("useImageQueue")){var isBackground=this.get("isVisibleInWindow")||this.get("canLoadInBackground");
SC.imageQueue.loadImage(value,this,this._loadImageUsingCacheDidComplete,isBackground);
return YES}return NO},_loadImageUsingCacheDidComplete:function(url,image){var value=this.get("imageValue");
if(value===url){if(SC.ok(image)){this.didLoad(image)}else{this.didError(image)}}},_loadImage:function(){var value=this.get("imageValue"),type=this.get("type"),that=this,image,jqImage;
if(type===SC.IMAGE_TYPE_URL){image=new Image();var errorFunc=function(){SC.run(function(){that._loadImageDidComplete(value,SC.$error("SC.Image.FailedError","Image",-101))
})};var loadFunc=function(){SC.run(function(){that._loadImageDidComplete(value,image)
})};jqImage=$(image);jqImage.bind("error",errorFunc);jqImage.bind("abort",errorFunc);
jqImage.bind("load",loadFunc);image.src=value;return YES}return NO},_loadImageDidComplete:function(url,image){var value=this.get("imageValue");
if(value===url){if(SC.ok(image)){this.didLoad(image)}else{this.didError(image)}}},didLoad:function(image){this.set("status",SC.IMAGE_STATE_LOADED);
if(!image){image=SC.BLANK_IMAGE}this.set("image",image)},didError:function(error){this.set("status",SC.IMAGE_STATE_FAILED);
this.set("image",SC.BLANK_IMAGE)}});SC.ImageView.valueIsUrl=function(value){return value?value.indexOf("/")>=0:NO
};sc_require("mixins/inline_editable");sc_require("mixins/inline_editor_delegate");
SC.REGULAR_WEIGHT="normal";SC.BOLD_WEIGHT="bold";SC.LabelView=SC.View.extend(SC.Control,SC.InlineEditorDelegate,SC.InlineEditable,{classNames:["sc-label-view"],displayProperties:"displayTitle textAlign fontWeight icon escapeHTML needsEllipsis hint".w(),ariaLabeledBy:null,isEditable:NO,exampleInlineTextFieldView:SC.InlineTextFieldView,editorDelegate:null,fontWeight:SC.REGULAR_WEIGHT,escapeHTML:YES,escapeHTMLBindingDefault:SC.Binding.oneWay().bool(),localize:NO,localizeBindingDefault:SC.Binding.oneWay().bool(),formatter:null,value:"",hint:null,icon:null,textAlign:SC.ALIGN_LEFT,renderDelegateName:"labelRenderDelegate",displayTitle:function(){var value,formatter;
value=this.get("value");formatter=this.getDelegateProperty("formatter",this.displayDelegate);
if(formatter){var formattedValue=(SC.typeOf(formatter)===SC.T_FUNCTION)?formatter(value,this):formatter.fieldValueForObject(value,this);
if(!SC.none(formattedValue)){value=formattedValue}}if(SC.typeOf(value)===SC.T_ARRAY){var ary=[];
for(var idx=0,idxLen=value.get("length");idx<idxLen;idx++){var x=value.objectAt(idx);
if(!SC.none(x)&&x.toString){x=x.toString()}ary.push(x)}value=ary.join(",")}if(!SC.none(value)&&value.toString){value=value.toString()
}if(value&&this.getDelegateProperty("localize",this.displayDelegate)){value=value.loc()
}return value}.property("value","localize","formatter").cacheable(),hintValue:function(){var hintVal=this.get("hint");
return hintVal}.property("hint").cacheable(),doubleClick:function(evt){return this.beginEditing()
},inlineEditorDidBeginEditing:function(editor){var layer=this.$();this._oldOpacity=layer.css("opacity");
this.adjust("opacity",0)},inlineEditorDidEndEditing:function(editor,finalValue){this.setIfChanged("value",finalValue);
this.adjust("opacity",this._oldOpacity);this._oldOpacity=null;this.set("isEditing",NO)
}});SC.Animatable={isAnimatable:YES,transitions:{},concatenatedProperties:["transitions"],style:{},_cssTransitionFor:{left:"left",top:"top",right:"right",bottom:"bottom",width:"width",height:"height",opacity:"opacity",transform:(SC.platform.supportsCSSTransforms?"-"+SC.platform.cssPrefix+"-transform":"transform")},_styleProperties:["display","transform"],_layoutStyles:"width height top bottom marginLeft marginTop left right zIndex minWidth maxWidth minHeight maxHeight centerX centerY opacity border borderTop borderRight borderBottom borderLeft".w(),_animationsToStart:{},_animationOrder:["top","left","bottom","right","width","height","centerX","centerY","opacity","display","transform"],initMixin:function(){this._animatable_original_didCreateLayer=this.didCreateLayer||function(){};
this.didCreateLayer=this._animatable_didCreateLayer;this._animatable_original_willDestroyLayer=this.willDestroyLayer||function(){};
this.willDestroyLayer=this._animatable_willDestroyLayer;this._animatable_original_willRemoveFromParent=this.willRemoveFromParent||function(){};
this.willRemoveFromParent=this._animatable_will_remove_from_parent;this._animatable_original_hasAcceleratedLayer=this.hasAcceleratedLayer||function(){};
this.hasAcceleratedLayer=this._animatable_hasAcceleratedLayer;this._animatable_original_animate=this.animate||function(){};
this.animate=this._animatable_animate;this.addObserver("style",this,"styleDidChange");
this._animateTickPixel.displayName="animate-tick";var i;if(SC.isArray(this.transitions)){var tl={};
for(i=0;i<this.transitions.length;i++){SC.mixin(tl,this.transitions[i])}this.transitions=tl
}for(i in this.transitions){if(typeof this.transitions[i]=="number"){this.transitions[i]={duration:this.transitions[i]}
}}this._animatableCurrentStyle=null;this._animators={};this._animatableSetCSS="";
this._last_transition_css="";if(this._disableAnimation===undefined){this._disableAnimation=0
}this._transitionCallbacks={};if(!SC.none(this.get("layer"))){var o=this._animatable_original_didCreateLayer;
this._animatable_original_didCreateLayer=function(){};this.didCreateLayer();this._animatable_original_didCreateLayer=o
}},_animatable_didCreateLayer:function(){this.resetAnimation();SC.Event.add(this.get("layer"),SC.platform.cssPrefix+"TransitionEnd",this,this.transitionEnd);
SC.Event.add(this.get("layer"),"transitionEnd",this,this.transitionEnd);return this._animatable_original_didCreateLayer()
},_animatable_willDestroyLayer:function(){SC.Event.remove(this.get("layer"),SC.platform.cssPrefix+"TransitionEnd",this,this.transitionEnd);
SC.Event.remove(this.get("layer"),"transitionEnd",this,this.transitionEnd);return this._animatable_original_willDestroyLayer()
},_animatable_will_remove_from_parent:function(){this.resetAnimation()},disableAnimation:function(){if(this._disableAnimation<1){this.updateStyle();
this._disableAnimation=1;this.updateStyle()}else{this._disableAnimation++}},enableAnimation:function(){if(this._disableAnimation<=1){this.updateStyle();
this._disableAnimation=0;this.updateStyle()}else{this._disableAnimation--}},adjust:function(dictionary,value){if(!SC.none(value)){var key=dictionary;
dictionary={};dictionary[key]=value}else{dictionary=SC.clone(dictionary)}var style=SC.clone(this.get("style")),didChangeStyle=NO,layout=SC.clone(this.get("layout")),didChangeLayout=NO;
var sprops=this._styleProperties;for(var i in dictionary){var didChange=NO;var current=(sprops.indexOf(i)>=0)?style:layout;
var cval=current[i],nval=dictionary[i];if(nval!==undefined&&cval!==nval){if(nval===null){if(cval!==undefined){didChange=YES
}delete current[i]}else{current[i]=nval;didChange=YES}}if(didChange){if(current===style){didChangeStyle=YES
}else{didChangeLayout=YES}}}if(didChangeStyle){this.set("style",style)}if(didChangeLayout){this.set("layout",layout)
}return this},_animatable_animate:function(){this.disableAnimation();var ret=this._animatable_original_animate.apply(this,arguments);
this.enableAnimation();return ret},transitionEnd:function(evt){SC.run(function(){var propertyName=evt.originalEvent.propertyName,callback=this._transitionCallbacks[propertyName];
if(callback&&this._disableAnimation<=0){SC.Animatable.runCallback(callback)}},this)
},getCurrentJavaScriptStyles:function(){return this._animatableCurrentStyle},resetAnimation:function(){this._animatableCurrentStyle=null;
this._stopJavaScriptAnimations();this.disableAnimation();this.updateStyle();this.enableAnimation();
this.updateStyle()},_stopJavaScriptAnimations:function(){for(var i in this._animators){if(this._animators[i]&&this._animators[i].isQueued){SC.Animatable.removeTimer(this._animators[i])
}}},_getStartStyleHash:function(start,target){var original_layout=this.layout;this.layout=start;
var p=this.computeParentDimensions();var f=this.computeFrameWithParentFrame(p);this.layout=original_layout;
var l={};for(var i in target){if(f){if(i=="left"){l[i]=f.x;continue}else{if(i=="top"){l[i]=f.y;
continue}else{if(i=="right"){l[i]=p.width-f.x-f.width;continue}else{if(i=="bottom"){l[i]=p.height-f.y-f.height;
continue}else{if(i=="width"){l[i]=f.width;continue}else{if(i=="height"){l[i]=f.height;
continue}else{if(i=="centerX"){l[i]=f.x+(f.width/2)-(p.width/2);continue}else{if(i=="centerY"){l[i]=f.y+(f.height/2)-(p.height/2);
continue}}}}}}}}}if(SC.none(l[i])){if(!SC.none(start[i])){l[i]=start[i]}else{l[i]=target[i]
}}}return l},_TMP_CSS_TRANSITIONS:[],cssTimingStringFor:function(transition){var timing_function="linear";
if(transition.timing||SC.Animatable.defaultTimingFunction){var timing=transition.timing||SC.Animatable.defaultTimingFunction;
if(SC.typeOf(timing)!=SC.T_STRING){timing_function="cubic-bezier("+timing[0]+", "+timing[1]+", "+timing[2]+", "+timing[3]+")"
}else{timing_function=timing}}return timing_function},styleDidChange:function(){this.invokeLast("updateStyle")
},_animatable_hasAcceleratedLayer:function(){var leftDuration=this.transitions.left&&this.transitions.left.duration,topDuration=this.transitions.top&&this.transitions.top.duration;
if(leftDuration!==topDuration){return NO}else{if((topDuration||leftDuration)&&!SC.platform.supportsCSSTransitions){return NO
}else{return this._animatable_original_hasAcceleratedLayer()}}}.property("wantsAcceleratedLayer","transitions"),updateStyle:function(){var layer=this.get("layer");
var newStyle=this.get("style");var specialTransform=NO,specialTransformValue="";if(this.get("hasAcceleratedLayer")){var nT=newStyle.top,nB=newStyle.bottom,nH=newStyle.height,nL=newStyle.left,nR=newStyle.right,nW=newStyle.width;
if((SC.empty(nT)||(!SC.isPercentage(nT)&&!SC.empty(nH)))&&(SC.empty(nL)||(!SC.isPercentage(nL)&&!SC.empty(nW)))&&(this.transitions&&(this.transitions.top||this.transitions.left))){specialTransform=YES;
this._useSpecialCaseTransform=YES}else{this._useSpecialCaseTransform=NO}}var i;if(!this._animatableCurrentStyle||this._disableAnimation>0||!layer){this._animatableSetCSS="";
this._animatableCurrentStyle={};for(i in newStyle){if(i[0]!="_"){this._animatableCurrentStyle[i]=newStyle[i]
}}if(layer){this._animatableApplyStyles(layer,newStyle)}return this}if(!layer){return
}var startingPoint=this._getStartStyleHash(this._animatableCurrentStyle,newStyle);
var endingPoint={};var timing;var cssTransitions=this._TMP_CSS_TRANSITIONS;if(SC.platform.supportsCSSTransitions){var timing_function;
if(specialTransform){var transitionForTiming=this.transitions.left||this.transitions.top;
timing_function=this.cssTimingStringFor(transitionForTiming);cssTransitions.push("-"+SC.platform.cssPrefix+"-transform "+transitionForTiming.duration+"s "+timing_function)
}for(i in this.transitions){if(!this._cssTransitionFor[i]){continue}if(specialTransform&&(i=="left"||i=="top")){if(this.transitions.left.action){this._transitionCallbacks["-"+SC.platform.cssPrefix+"-transform"]={source:this,target:(this.transitions.left.target||this),action:this.transitions.left.action}
}if(this.transitions.top.action){this._transitionCallbacks["-"+SC.platform.cssPrefix+"-transform"]={source:this,target:(this.transitions.top.target||this),action:this.transitions.top.action}
}continue}timing_function=this.cssTimingStringFor(this.transitions[i]);cssTransitions.push(this._cssTransitionFor[i]+" "+this.transitions[i].duration+"s "+timing_function)
}}for(i in newStyle){if(i[0]=="_"){continue}var shouldSetImmediately=!this.transitions[i]||newStyle[i]==startingPoint[i];
if(i=="display"&&newStyle[i]!="none"){shouldSetImmediately=true}if(shouldSetImmediately){startingPoint[i]=newStyle[i];
var animator=this._animators[i];if(animator){animator.endValue=newStyle[i];animator.end=0
}continue}if(SC.platform.supportsCSSTransitions&&this._cssTransitionFor[i]){endingPoint[i]=newStyle[i];
if(this.transitions[i].action){this._transitionCallbacks[this._cssTransitionFor[i]]={source:this,target:(this.transitions[i].target||this),action:this.transitions[i].action}
}continue}var applier=this._animateTickPixel,property=i,startValue=startingPoint[i],endValue=newStyle[i];
if(property=="centerX"||property=="centerY"){applier=this._animateTickCenter}else{if(property=="opacity"){applier=this._animateTickNumber
}else{if(property=="display"){applier=this._animateTickDisplay}}}if(!this._animators[i]){this._animators[i]={}
}var a=this._animators[i];a.start=null;a.duration=Math.floor(this.transitions[i].duration*1000);
a.startValue=startValue;a.endValue=endValue;a.layer=layer;a.property=property;a.action=applier;
a.style=layer.style;a.holder=this;if(this.transitions[i].action){a.callback={source:this,target:(this.transitions[i].target||this),action:this.transitions[i].action}
}timing=this.transitions[i].timing||SC.Animatable.defaultTimingFunction;if(timing&&SC.typeOf(timing)!=SC.T_STRING){a.timingFunction=timing
}if(!a.going){this._animationsToStart[i]=a}}var ao=this._animationOrder,l=this._animationOrder.length;
for(i=0;i<l;i++){var nextAnimation=ao[i];if(this._animationsToStart[nextAnimation]){SC.Animatable.addTimer(this._animationsToStart[nextAnimation]);
delete this._animationsToStart[nextAnimation]}}var css=cssTransitions.join(",");cssTransitions.length="";
this._animatableSetCSS=css;this._animatableApplyStyles(layer,startingPoint,endingPoint);
return this},_animatableApplyStyles:function(layer,styles,delayed){if(!layer){return
}var needsRender=NO;if(styles.display&&layer.style.display!==styles.display){layer.style.display=styles.display;
needsRender=YES}if(this._animatableSetCSS!=this._last_transition_css){layer.style[SC.platform.domCSSPrefix+"Transition"]=this._animatableSetCSS;
this._last_transition_css=this._animatableSetCSS;needsRender=YES}if(!this._animators["display-styles"]){this._animators["display-styles"]={}
}var timer=this._animators["display-styles"];timer.holder=this;timer.action=this._animatableApplyNonDisplayStylesFromTimer;
timer.inLoopAction=this._animatableApplyNonDisplayStyles;timer.layer=layer;timer.styles=styles;
timer.delayed=delayed;this._animatableCurrentStyle=styles;if(this._disableAnimation>0||!needsRender){timer.inLoopAction()
}else{SC.Animatable.addTimer(timer)}},_animatableApplyNonDisplayStylesFromTimer:function(){SC.run(function(){this.inLoopAction()
},this)},_animatableApplyNonDisplayStyles:function(){var layer=this.layer,styles=this.holder._animatableCurrentStyle;
var styleHelpers={};var newLayout={},updateLayout=NO,style=layer.style;var transform="";
for(var i in styles){if(i=="display"){continue}if(this.holder._layoutStyles.indexOf(i)>=0){newLayout[i]=styles[i];
updateLayout=YES;continue}else{if(i=="transform"){transform+=" "+styles[i]}else{if(styleHelpers[i]){styleHelpers[i](style,i,styles)
}else{style[i]=styles[i]}}}}if(!SC.empty(transform)){style[SC.platform.cssPrefix+"Transform"]=transform
}if(updateLayout){var prev=this.holder.layout;this.holder.layout=newLayout;this.holder.notifyPropertyChange("layoutStyle");
var ls=this.holder.get("layoutStyle");for(var key in ls){if(SC.none(ls[key])){style[key]=""
}else{if(style[key]!=ls[key]){style[key]=ls[key]}}}this.holder.layout=prev}if(this.delayed){SC.mixin(this.holder._animatableCurrentStyle,this.delayed);
this.styles=this.delayed;this.delayed=undefined;if(this._disableAnimation>0){this.inLoopAction()
}else{SC.Animatable.addTimer(this)}}},updateLayout:function(context,firstTime){var style=SC.clone(this.get("style"));
var newLayout=this.get("layout");var i=0,ls=this._layoutStyles,lsl=ls.length,didChange=NO;
for(i=0;i<lsl;i++){var key=ls[i];if(style[key]!==newLayout[key]){if(SC.none(newLayout[key])){style[key]=undefined
}else{style[key]=newLayout[key]}didChange=YES}}if(didChange){this.style=style;this.updateStyle()
}return this},_solveBezierForT:function(ax,ay,bx,by,cx,cy,x,duration){var epsilon=1/(200*duration);
var t0,t1,t2,x2,d2,i;for(t2=x,i=0;i<8;i++){x2=((ax*t2+bx)*t2+cx)*t2-x;if(Math.abs(x2)<epsilon){return t2
}d2=(3*ax*t2+2*bx)*t2+cx;if(Math.abs(d2)<Math.pow(10,-6)){break}t2=t2-x2/d2}t0=0;
t1=1;t2=x;if(t2<t0){return t0}if(t2>t1){return t1}while(t0<t1){x2=((ax*t2+bx)*t2+cx)*t2;
if(Math.abs(x2-x)<epsilon){return t2}if(x>x2){t0=t2}else{t1=t2}t2=(t1-t0)*0.5+t0}return t2
},_solveBezier:function(p1x,p1y,p2x,p2y,x,duration){var cx=3*p1x;var bx=3*(p2x-p1x)-cx;
var ax=1-cx-bx;var cy=3*p1y;var by=3*(p2y-p1y)-cy;var ay=1-cy-by;var t=this._solveBezierForT(ax,ay,bx,by,cx,cy,x,duration);
return((ay*t+by)*t+cy)*t},_animateTickPixel:function(t){if(SC.none(this.start)){this.start=t;
this.end=this.start+this.duration}var s=this.start,e=this.end;var sv=this.startValue,ev=this.endValue;
var d=e-s;var dv=ev-sv;var c=t-s;var percent=Math.min(c/d,1);if(this.timingFunction){var timing=this.timingFunction;
percent=this.holder._solveBezier(timing[0],timing[1],timing[2],timing[3],percent,d)
}var value=Math.floor(sv+(dv*percent));this.holder._animatableCurrentStyle[this.property]=value;
this.style[this.property]=value+"px";if(t<e){SC.Animatable.addTimer(this)}else{this.going=false;
if(this.callback){SC.Animatable.runCallback(this.callback)}this.styles=null;this.layer=null
}},_animateTickDisplay:function(t){if(SC.none(this.start)){this.start=t;this.end=this.start+this.duration
}var e=this.end;if(t<e){SC.Animatable.addTimer(this);return}this.holder._animatableCurrentStyle[this.property]=this.endValue;
this.style[this.property]=this.endValue;this.going=false;if(this.callback){SC.Animatable.runCallback(this.callback)
}this.styles=null;this.layer=null},_animateTickNumber:function(t){if(SC.none(this.start)){this.start=t;
this.end=this.start+this.duration}var s=this.start,e=this.end;var sv=this.startValue,ev=this.endValue;
var d=e-s;var dv=ev-sv;var c=t-s;var percent=Math.min(c/d,1);if(this.timingFunction){var timing=this.timingFunction;
percent=this.holder._solveBezier(timing[0],timing[1],timing[2],timing[3],percent,d)
}var value=Math.round((sv+(dv*percent))*100)/100;this.holder._animatableCurrentStyle[this.property]=value;
this.style[this.property]=value;if(this.property=="opacity"){this.style.zoom=1}if(t<e){SC.Animatable.addTimer(this)
}else{this.going=false;if(this.callback){SC.Animatable.runCallback(this.callback)
}this.styles=null;this.layer=null}},_animateTickCenter:function(t){if(SC.none(this.start)){this.start=t;
this.end=this.start+this.duration}var s=this.start,e=this.end;var sv=this.startValue,ev=this.endValue;
var d=e-s;var dv=ev-sv;var c=t-s;var percent=Math.min(c/d,1);if(this.timingFunction){var timing=this.timingFunction;
percent=this.holder._solveBezier(timing[0],timing[1],timing[2],timing[3],percent,d)
}var value=sv+(dv*percent);this.holder._animatableCurrentStyle[this.property]=value;
var widthOrHeight,style;if(this.property=="centerX"){widthOrHeight="width";style="marginLeft"
}else{widthOrHeight="height";style="marginTop"}this.style[style]=Math.round(value-(this.holder._animatableCurrentStyle[widthOrHeight]/2))+"px";
if(t<e){SC.Animatable.addTimer(this)}else{this.going=false;if(this.callback){SC.Animatable.runCallback(this.callback)
}this.styles=null;this.layer=null}}};SC.mixin(SC.Animatable,{NAMESPACE:"SC.Animatable",VERSION:"0.1.0",TRANSITION_NONE:"linear",TRANSITION_CSS_EASE:"ease",TRANSITION_CSS_EASE_IN:"ease-in",TRANSITION_CSS_EASE_OUT:"ease-out",TRANSITION_CSS_EASE_IN_OUT:"ease-in-out",TRANSITION_EASE:[0.25,0.1,0.25,1],TRANSITION_LINEAR:[0,0,1,1],TRANSITION_EASE_IN:[0.42,0,1,1],TRANSITION_EASE_OUT:[0,0,0.58,1],TRANSITION_EASE_IN_OUT:[0.42,0,0.58,1],defaultTimingFunction:null,baseTimer:{next:null},going:false,_ticks:0,_timer_start_time:null,interval:10,currentTime:new Date().getTime(),stats:SC.Object.create({lastFPS:0}),addTimer:function(animator){if(animator.isQueued){return
}animator.prev=SC.Animatable.baseTimer;animator.next=SC.Animatable.baseTimer.next;
if(SC.Animatable.baseTimer.next){SC.Animatable.baseTimer.next.prev=animator}SC.Animatable.baseTimer.next=animator;
animator.isQueued=true;if(!SC.Animatable.going){SC.Animatable.start()}},removeTimer:function(animator){if(!animator.isQueued){return
}if(animator.next){animator.next.prev=animator.prev}animator.prev.next=animator.next;
animator.isQueued=false},start:function(){SC.Animatable._ticks=0;SC.Animatable._timer_start_time=new Date().getTime();
SC.Animatable.going=true;setTimeout(function(){SC.Animatable.timeout()},SC.Animatable.interval)
},timeout:function(){SC.Animatable.currentTime=new Date().getTime();var start=SC.Animatable.currentTime;
var next=SC.Animatable.baseTimer.next;SC.Animatable.baseTimer.next=null;var i=0;while(next){var t=next.next;
next.isQueued=false;next.next=null;next.prev=null;next.action.call(next,start);next=t;
i++}if(SC.Animatable._ticks<1000000){SC.Animatable._ticks++}var end=new Date().getTime();
var elapsed=end-start;if(SC.Animatable.baseTimer.next){setTimeout(function(){SC.Animatable.timeout()
},Math.max(0,SC.Animatable.interval-elapsed))}else{SC.Animatable.going=false;var time_diff=end-SC.Animatable._timer_start_time;
SC.run(function(){SC.Animatable.stats.set("lastFPS",SC.Animatable._ticks/(time_diff/1000))
})}},runCallback:function(callback){var typeOfAction=SC.typeOf(callback.action);if(typeOfAction==SC.T_FUNCTION){callback.action.call(callback.target,callback.source)
}else{if(typeOfAction===SC.T_STRING){if(callback.action.indexOf(".")>=0){var path=callback.action.split(".");
var property=path.pop();var target=SC.objectForPropertyPath(path,window);var action=target.get?target.get(property):target[property];
if(action&&SC.typeOf(action)==SC.T_FUNCTION){action.call(target,callback.source)}else{throw"SC.Animator could not find a function at %@".fmt(callback.action)
}}else{SC.RootResponder.responder.sendAction(callback.action,callback.target,callback.source,callback.source.get("pane"),null,callback.source)
}}}}});