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
}}};SC.stringsFor("English",{"_SC.DateTime.dayNames":"Sunday Monday Tuesday Wednesday Thursday Friday Saturday","_SC.DateTime.abbreviatedDayNames":"Sun Mon Tue Wed Thu Fri Sat","_SC.DateTime.monthNames":"January February March April May June July August September October November December","_SC.DateTime.abbreviatedMonthNames":"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"});
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
})};SC.DataSource=SC.Object.extend({fetch:function(store,query){return NO},retrieveRecords:function(store,storeKeys,ids){return this._handleEach(store,storeKeys,this.retrieveRecord,ids)
},commitRecords:function(store,createStoreKeys,updateStoreKeys,destroyStoreKeys,params){var cret,uret,dret;
if(createStoreKeys.length>0){cret=this.createRecords.call(this,store,createStoreKeys,params)
}if(updateStoreKeys.length>0){uret=this.updateRecords.call(this,store,updateStoreKeys,params)
}if(destroyStoreKeys.length>0){dret=this.destroyRecords.call(this,store,destroyStoreKeys,params)
}return((cret===uret)&&(cret===dret))?cret:SC.MIXED_STATE},cancel:function(store,storeKeys){return NO
},updateRecords:function(store,storeKeys,params){return this._handleEach(store,storeKeys,this.updateRecord,null,params)
},createRecords:function(store,storeKeys,params){return this._handleEach(store,storeKeys,this.createRecord,null,params)
},destroyRecords:function(store,storeKeys,params){return this._handleEach(store,storeKeys,this.destroyRecord,null,params)
},_handleEach:function(store,storeKeys,action,ids,params){var len=storeKeys.length,idx,ret,cur,lastArg;
if(!ids){ids=[]}for(idx=0;idx<len;idx++){lastArg=ids[idx]?ids[idx]:params;cur=action.call(this,store,storeKeys[idx],lastArg,params);
if(ret===undefined){ret=cur}else{if(ret===YES){ret=(cur===YES)?YES:SC.MIXED_STATE
}else{if(ret===NO){ret=(cur===NO)?NO:SC.MIXED_STATE}}}}return ret?ret:null},updateRecord:function(store,storeKey,params){return NO
},retrieveRecord:function(store,storeKey,id){return NO},createRecord:function(store,storeKey,params){return NO
},destroyRecord:function(store,storeKey,params){return NO}});sc_require("data_sources/data_source");
SC.CascadeDataSource=SC.DataSource.extend({dataSources:null,from:function(dataSource){var dataSources=this.get("dataSources");
if(!dataSources){this.set("dataSources",dataSources=[])}dataSources.push(dataSource);
return this},fetch:function(store,query){var sources=this.get("dataSources"),len=sources?sources.length:0,ret=NO,cur,source,idx;
for(idx=0;(ret!==YES)&&idx<len;idx++){source=sources.objectAt(idx);cur=source.fetch?source.fetch.apply(source,arguments):NO;
ret=this._handleResponse(ret,cur)}return ret},retrieveRecords:function(store,storeKeys,ids){var sources=this.get("dataSources"),len=sources?sources.length:0,ret=NO,cur,source,idx;
for(idx=0;(ret!==YES)&&idx<len;idx++){source=sources.objectAt(idx);cur=source.retrieveRecords.apply(source,arguments);
ret=this._handleResponse(ret,cur)}return ret},commitRecords:function(store,createStoreKeys,updateStoreKeys,destroyStoreKeys){var sources=this.get("dataSources"),len=sources?sources.length:0,ret=NO,cur,source,idx;
for(idx=0;(ret!==YES)&&idx<len;idx++){source=sources.objectAt(idx);cur=source.commitRecords.apply(source,arguments);
ret=this._handleResponse(ret,cur)}return ret},cancel:function(store,storeKeys){var sources=this.get("dataSources"),len=sources?sources.length:0,ret=NO,cur,source,idx;
for(idx=0;(ret!==YES)&&idx<len;idx++){source=sources.objectAt(idx);cur=source.cancel.apply(source,arguments);
ret=this._handleResponse(ret,cur)}return ret},init:function(){arguments.callee.base.apply(this,arguments);
var sources=this.get("dataSources"),idx=sources?sources.get("length"):0,source;while(--idx>=0){source=sources[idx];
if(SC.typeOf(source)===SC.T_STRING){sources[idx]=this.get(source)}}},_handleResponse:function(current,response){if(response===YES){return YES
}else{if(current===NO){return(response===NO)?NO:SC.MIXED_STATE}else{return SC.MIXED_STATE
}}}});SC.Record=SC.Object.extend({isRecord:YES,isParentRecord:NO,primaryKey:"guid",id:function(key,value){if(value!==undefined){this.writeAttribute(this.get("primaryKey"),value);
return value}else{return SC.Store.idFor(this.storeKey)}}.property("storeKey").cacheable(),status:function(){return this.store.readStatus(this.storeKey)
}.property("storeKey").cacheable(),store:null,storeKey:null,isDestroyed:function(){return !!(this.get("status")&SC.Record.DESTROYED)
}.property("status").cacheable(),isEditable:function(key,value){if(value!==undefined){this._screc_isEditable=value
}if(this.get("status")&SC.Record.READY){return this._screc_isEditable}else{return NO
}}.property("status").cacheable(),_screc_isEditable:YES,isLoaded:function(){var K=SC.Record,status=this.get("status");
return !((status===K.EMPTY)||(status===K.BUSY_LOADING)||(status===K.ERROR))}.property("status").cacheable(),relationships:null,attributes:function(){var store=this.get("store"),storeKey=this.storeKey;
return store.readEditableDataHash(storeKey)}.property(),readOnlyAttributes:function(){var store=this.get("store"),storeKey=this.storeKey,ret=store.readDataHash(storeKey);
if(ret){ret=SC.clone(ret,YES)}return ret}.property(),nestedRecordNamespace:null,isNestedRecord:function(){var store=this.get("store"),ret,sk=this.get("storeKey"),prKey=store.parentStoreKeyExists(sk);
ret=prKey?YES:NO;return ret}.property().cacheable(),parentRecord:function(){var sk=this.storeKey,store=this.get("store");
return store.materializeParentRecord(sk)}.property(),refresh:function(recordOnly){var store=this.get("store"),rec,ro,sk=this.get("storeKey"),prKey=store.parentStoreKeyExists();
ro=recordOnly||(SC.none(recordOnly)&&SC.none(prKey));if(ro){store.refreshRecord(null,null,sk)
}else{if(prKey){rec=store.materializeRecord(prKey);rec.refresh(recordOnly)}}return this
},destroy:function(recordOnly){var store=this.get("store"),rec,ro,sk=this.get("storeKey"),prKey=store.parentStoreKeyExists();
ro=recordOnly||(SC.none(recordOnly)&&SC.none(prKey));if(ro){store.destroyRecord(null,null,sk);
this.notifyPropertyChange("status");this.propagateToAggregates()}else{if(prKey){rec=store.materializeRecord(prKey);
rec.destroy(recordOnly)}}return this},recordDidChange:function(key){var p=this.get("parentRecord");
if(p){p.recordDidChange()}this.get("store").recordDidChange(null,null,this.get("storeKey"),key);
this.notifyPropertyChange("status");this.propagateToAggregates();return this},_editLevel:0,beginEditing:function(){this._editLevel++;
return this},endEditing:function(key){if(--this._editLevel<=0){this._editLevel=0;
this.recordDidChange(key)}return this},readAttribute:function(key){var store=this.get("store"),storeKey=this.storeKey;
var attrs=store.readDataHash(storeKey);return attrs?attrs[key]:undefined},writeAttribute:function(key,value,ignoreDidChange){var store=this.get("store"),storeKey=this.storeKey,attrs;
attrs=store.readEditableDataHash(storeKey);if(!attrs){throw SC.Record.BAD_STATE_ERROR
}if(value!==attrs[key]){if(!ignoreDidChange){this.beginEditing()}attrs[key]=value;
if(key===this.get("primaryKey")){SC.Store.replaceIdFor(storeKey,value);this.propertyDidChange("id")
}if(!ignoreDidChange){this.endEditing(key)}}return this},propagateToAggregates:function(){var storeKey=this.get("storeKey"),recordType=SC.Store.recordTypeFor(storeKey),idx,len,key,val,recs;
var aggregates=recordType.aggregates;if(!aggregates){var dataHash=this.get("store").readDataHash(storeKey);
aggregates=[];for(var k in dataHash){if(this[k]&&this[k].get&&this[k].get("aggregate")===YES){aggregates.push(k)
}}recordType.aggregates=aggregates}var K=SC.Record,dirty=K.DIRTY,readyNew=K.READY_NEW,destroyed=K.DESTROYED,readyClean=K.READY_CLEAN,iter;
iter=function(rec){var childStatus,parentStatus;if(rec){childStatus=this.get("status");
if((childStatus&dirty)||(childStatus&readyNew)||(childStatus&destroyed)){parentStatus=rec.get("status");
if(parentStatus===readyClean){rec.get("store").recordDidChange(rec.constructor,null,rec.get("storeKey"),null,YES)
}}}};for(idx=0,len=aggregates.length;idx<len;++idx){key=aggregates[idx];val=this.get(key);
recs=SC.kindOf(val,SC.ManyArray)?val:[val];recs.forEach(iter,this)}},storeDidChangeProperties:function(statusOnly,keys){if(statusOnly){this.notifyPropertyChange("status")
}else{if(keys){this.beginPropertyChanges();keys.forEach(function(k){this.notifyPropertyChange(k)
},this);this.notifyPropertyChange("status");this.endPropertyChanges()}else{this.allPropertiesDidChange()
}var manyArrays=this.relationships,loc=manyArrays?manyArrays.length:0;while(--loc>=0){manyArrays[loc].recordPropertyDidChange(keys)
}}},normalize:function(includeNull){var primaryKey=this.primaryKey,recordId=this.get("id"),store=this.get("store"),storeKey=this.get("storeKey"),key,valueForKey,typeClass,recHash,attrValue,normChild,isRecord,isChild,defaultVal,keyForDataHash,attr;
var dataHash=store.readEditableDataHash(storeKey)||{};dataHash[primaryKey]=recordId;
recHash=store.readDataHash(storeKey);for(key in this){valueForKey=this[key];if(valueForKey){typeClass=valueForKey.typeClass;
if(typeClass){keyForDataHash=valueForKey.get("key")||key;isRecord=SC.typeOf(typeClass.call(valueForKey))===SC.T_CLASS;
isChild=valueForKey.isNestedRecordTransform;if(!isRecord&&!isChild){attrValue=this.get(key);
if(attrValue!==undefined||(attrValue===null&&includeNull)){attr=this[key];if(SC.instanceOf(attr,SC.RecordAttribute)){attrValue=attr.fromType(this,key,attrValue)
}dataHash[keyForDataHash]=attrValue}}else{if(isChild){attrValue=this.get(key);if(attrValue&&attrValue.normalize){attrValue.normalize()
}}else{if(isRecord){attrValue=recHash[keyForDataHash];if(attrValue!==undefined){dataHash[keyForDataHash]=attrValue
}else{defaultVal=valueForKey.get("defaultValue");if(SC.typeOf(defaultVal)===SC.T_FUNCTION){dataHash[keyForDataHash]=defaultVal(this,key,defaultVal)
}else{dataHash[keyForDataHash]=defaultVal}}}}}}}}return this},unknownProperty:function(key,value){if(value!==undefined){var storeKey=this.get("storeKey"),recordType=SC.Store.recordTypeFor(storeKey);
if(recordType.ignoreUnknownProperties===YES){this[key]=value;return value}var primaryKey=this.get("primaryKey");
this.writeAttribute(key,value);if(key===primaryKey){SC.Store.replaceIdFor(storeKey,value)
}}return this.readAttribute(key)},commitRecord:function(params,recordOnly){var store=this.get("store"),rec,ro,sk=this.get("storeKey"),prKey=store.parentStoreKeyExists();
ro=recordOnly||(SC.none(recordOnly)&&SC.none(prKey));if(ro){store.commitRecord(undefined,undefined,this.get("storeKey"),params)
}else{if(prKey){rec=store.materializeRecord(prKey);rec.commitRecord(params,recordOnly)
}}return this},isError:function(){return this.get("status")&SC.Record.ERROR}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var store=this.get("store");
return store.readError(this.get("storeKey"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),set:function(key,value){var func=this[key];if(func&&func.isProperty&&func.get&&!func.get("isEditable")){return this
}return arguments.callee.base.apply(this,arguments)},toString:function(){var attrs=this.get("store").readDataHash(this.get("storeKey"));
return"%@(%@) %@".fmt(this.constructor.toString(),SC.inspect(attrs),this.statusString())
},statusString:function(){var ret=[],status=this.get("status");for(var prop in SC.Record){if(prop.match(/[A-Z_]$/)&&SC.Record[prop]===status){ret.push(prop)
}}return ret.join(" ")},registerNestedRecord:function(value,key,path){var store,psk,csk,childRecord,recordType;
if(SC.none(path)){path=key}if(value&&value.get&&value.get("isRecord")){childRecord=value
}else{recordType=this._materializeNestedRecordType(value,key);childRecord=this.createNestedRecord(recordType,value)
}if(childRecord){this.isParentRecord=YES;store=this.get("store");psk=this.get("storeKey");
csk=childRecord.get("storeKey");store.registerChildToParent(psk,csk,path)}return childRecord
},_materializeNestedRecordType:function(value,key){var childNS,recordType,ret;if(SC.typeOf(value)===SC.T_HASH){childNS=this.get("nestedRecordNamespace");
if(value.type&&!SC.none(childNS)){recordType=childNS[value.type]}}if(!recordType&&key&&this[key]){recordType=this[key].get("typeClass")
}if(!recordType||!SC.kindOf(recordType,SC.Record)){throw"SC.Child: Error during transform: Invalid record type."
}return recordType},createNestedRecord:function(recordType,hash){var store,id,sk,pk,cr=null,existingId=null;
SC.run(function(){hash=hash||{};existingId=hash[recordType.prototype.primaryKey];
store=this.get("store");if(SC.none(store)){throw"Error: during the creation of a child record: NO STORE ON PARENT!"
}if(!id&&(pk=recordType.prototype.primaryKey)){id=hash[pk];sk=id?store.storeKeyExists(recordType,id):null;
if(sk){store.writeDataHash(sk,hash);cr=store.materializeRecord(sk)}else{cr=store.createRecord(recordType,hash);
if(SC.none(id)){sk=cr.get("storeKey");id="cr"+sk;SC.Store.replaceIdFor(sk,id);hash=store.readEditableDataHash(sk);
hash[pk]=id}}}if(SC.none(existingId)&&this.generateIdForChild){this.generateIdForChild(cr)
}},this);return cr},_nestedRecordKey:0,generateIdForChild:function(childRecord){}});
SC.Record.mixin({ignoreUnknownProperties:NO,CLEAN:1,DIRTY:2,EMPTY:256,ERROR:4096,READY:512,READY_CLEAN:513,READY_DIRTY:514,READY_NEW:515,DESTROYED:1024,DESTROYED_CLEAN:1025,DESTROYED_DIRTY:1026,BUSY:2048,BUSY_LOADING:2052,BUSY_CREATING:2056,BUSY_COMMITTING:2064,BUSY_REFRESH:2080,BUSY_REFRESH_CLEAN:2081,BUSY_REFRESH_DIRTY:2082,BUSY_DESTROYING:2112,BAD_STATE_ERROR:SC.$error("Internal barf Inconsistency"),RECORD_EXISTS_ERROR:SC.$error("Record Exists"),NOT_FOUND_ERROR:SC.$error("Not found "),BUSY_ERROR:SC.$error("Busy"),GENERIC_ERROR:SC.$error("Generic Error"),_nextChildKey:0,attr:function(type,opts){return SC.RecordAttribute.attr(type,opts)
},fetch:function(recordType,opts){return SC.FetchedAttribute.attr(recordType,opts)
},toMany:function(recordType,opts){opts=opts||{};var isNested=opts.nested||opts.isNested;
var attr;if(isNested){attr=SC.ChildrenAttribute.attr(recordType,opts)}else{attr=SC.ManyAttribute.attr(recordType,opts)
}return attr},toOne:function(recordType,opts){opts=opts||{};var isNested=opts.nested||opts.isNested;
var attr;if(isNested){attr=SC.ChildAttribute.attr(recordType,opts)}else{attr=SC.SingleAttribute.attr(recordType,opts)
}return attr},storeKeysById:function(){var key=SC.keyFor("storeKey",SC.guidFor(this)),ret=this[key];
if(!ret){ret=this[key]={}}return ret},storeKeyFor:function(id){var storeKeys=this.storeKeysById(),ret=storeKeys[id];
if(!ret){ret=SC.Store.generateStoreKey();SC.Store.idsByStoreKey[ret]=id;SC.Store.recordTypesByStoreKey[ret]=this;
storeKeys[id]=ret}return ret},storeKeyExists:function(id){var storeKeys=this.storeKeysById(),ret=storeKeys[id];
return ret},find:function(store,id){return store.find(this,id)},extend:function(){var ret=SC.Object.extend.apply(this,arguments);
SC.Query._scq_didDefineRecordType(ret);return ret}});sc_require("data_sources/data_source");
sc_require("models/record");SC.FixturesDataSource=SC.DataSource.extend({simulateRemoteResponse:NO,latency:50,cancel:function(store,storeKeys){return NO
},fetch:function(store,query){if(query.get("location")!==SC.Query.LOCAL){throw SC.$error("SC.Fixture data source can only fetch local queries")
}if(!query.get("recordType")&&!query.get("recordTypes")){throw SC.$error("SC.Fixture data source can only fetch queries with one or more record types")
}if(this.get("simulateRemoteResponse")){this.invokeLater(this._fetch,this.get("latency"),store,query)
}else{this._fetch(store,query)}},_fetch:function(store,query){var recordType=query.get("recordType"),recordTypes=query.get("recordTypes")||[recordType];
recordTypes.forEach(function(recordType){if(SC.typeOf(recordType)===SC.T_STRING){recordType=SC.objectForPropertyPath(recordType)
}if(recordType){this.loadFixturesFor(store,recordType)}},this);store.dataSourceDidFetchQuery(query)
},retrieveRecords:function(store,storeKeys){var latency=this.get("latency"),ret=this.hasFixturesFor(storeKeys);
if(!ret){return ret}if(this.get("simulateRemoteResponse")){this.invokeLater(this._retrieveRecords,latency,store,storeKeys)
}else{this._retrieveRecords(store,storeKeys)}return ret},_retrieveRecords:function(store,storeKeys){storeKeys.forEach(function(storeKey){var ret=[],recordType=SC.Store.recordTypeFor(storeKey),id=store.idFor(storeKey),hash=this.fixtureForStoreKey(store,storeKey);
ret.push(storeKey);store.dataSourceDidComplete(storeKey,hash,id)},this)},updateRecords:function(store,storeKeys,params){var latency=this.get("latency"),ret=this.hasFixturesFor(storeKeys);
if(!ret){return ret}if(this.get("simulateRemoteResponse")){this.invokeLater(this._updateRecords,latency,store,storeKeys)
}else{this._updateRecords(store,storeKeys)}return ret},_updateRecords:function(store,storeKeys){storeKeys.forEach(function(storeKey){var hash=store.readDataHash(storeKey);
this.setFixtureForStoreKey(store,storeKey,hash);store.dataSourceDidComplete(storeKey)
},this)},createRecords:function(store,storeKeys,params){var latency=this.get("latency");
if(this.get("simulateRemoteResponse")){this.invokeLater(this._createRecords,latency,store,storeKeys)
}else{this._createRecords(store,storeKeys)}return YES},_createRecords:function(store,storeKeys){storeKeys.forEach(function(storeKey){var id=store.idFor(storeKey),recordType=store.recordTypeFor(storeKey),dataHash=store.readDataHash(storeKey),fixtures=this.fixturesFor(recordType);
if(!id){id=this.generateIdFor(recordType,dataHash,store,storeKey)}this._invalidateCachesFor(recordType,storeKey,id);
fixtures[id]=dataHash;store.dataSourceDidComplete(storeKey,null,id)},this)},destroyRecords:function(store,storeKeys,params){var latency=this.get("latency"),ret=this.hasFixturesFor(storeKeys);
if(!ret){return ret}if(this.get("simulateRemoteResponse")){this.invokeLater(this._destroyRecords,latency,store,storeKeys)
}else{this._destroyRecords(store,storeKeys)}return ret},_destroyRecords:function(store,storeKeys){storeKeys.forEach(function(storeKey){var id=store.idFor(storeKey),recordType=store.recordTypeFor(storeKey),fixtures=this.fixturesFor(recordType);
this._invalidateCachesFor(recordType,storeKey,id);if(id){delete fixtures[id]}store.dataSourceDidDestroy(storeKey)
},this)},loadFixturesFor:function(store,recordType,ret){var hashes=[],dataHashes,i,storeKey;
dataHashes=this.fixturesFor(recordType);for(i in dataHashes){storeKey=recordType.storeKeyFor(i);
if(store.peekStatus(storeKey)===SC.Record.EMPTY){hashes.push(dataHashes[i])}if(ret){ret.push(storeKey)
}}if(hashes&&hashes.length>0){store.loadRecords(recordType,hashes)}return this},generateIdFor:function(recordType,dataHash,store,storeKey){return"@id%@".fmt(SC.Store.generateStoreKey())
},fixtureForStoreKey:function(store,storeKey){var id=store.idFor(storeKey),recordType=store.recordTypeFor(storeKey),fixtures=this.fixturesFor(recordType);
return fixtures?fixtures[id]:null},setFixtureForStoreKey:function(store,storeKey,dataHash){var id=store.idFor(storeKey),recordType=store.recordTypeFor(storeKey),fixtures=this.fixturesFor(recordType);
this._invalidateCachesFor(recordType,storeKey,id);fixtures[id]=dataHash;return this
},fixturesFor:function(recordType){if(!this._fixtures){this._fixtures={}}var fixtures=this._fixtures[SC.guidFor(recordType)];
if(fixtures){return fixtures}var dataHashes=recordType?recordType.FIXTURES:null,len=dataHashes?dataHashes.length:0,primaryKey=recordType?recordType.prototype.primaryKey:"guid",idx,dataHash,id;
this._fixtures[SC.guidFor(recordType)]=fixtures={};for(idx=0;idx<len;idx++){dataHash=dataHashes[idx];
id=dataHash[primaryKey];if(!id){id=this.generateIdFor(recordType,dataHash)}fixtures[id]=dataHash
}return fixtures},fixturesLoadedFor:function(recordType){if(!this._fixtures){return NO
}var ret=[],fixtures=this._fixtures[SC.guidFor(recordType)];return fixtures?YES:NO
},hasFixturesFor:function(storeKeys){var ret=NO;storeKeys.forEach(function(storeKey){if(ret!==SC.MIXED_STATE){var recordType=SC.Store.recordTypeFor(storeKey),fixtures=recordType?recordType.FIXTURES:null;
if(fixtures&&fixtures.length&&fixtures.length>0){if(ret===NO){ret=YES}}else{if(ret===YES){ret=SC.MIXED_STATE
}}}},this);return ret},_invalidateCachesFor:function(recordType,storeKey,id){var cache=this._storeKeyCache;
if(cache){delete cache[SC.guidFor(recordType)]}return this}});SC.Record.fixtures=SC.FixturesDataSource.create();
sc_require("models/record");SC.RecordAttribute=SC.Object.extend({isRecordAttribute:YES,defaultValue:null,type:String,key:null,isRequired:NO,isEditable:YES,useIsoDate:YES,aggregate:NO,typeClass:function(){var ret=this.get("type");
if(SC.typeOf(ret)===SC.T_STRING){ret=SC.objectForPropertyPath(ret)}return ret}.property("type").cacheable(),transform:function(){var klass=this.get("typeClass")||String,transforms=SC.RecordAttribute.transforms,ret;
while(klass&&!(ret=transforms[SC.guidFor(klass)])){if(klass.superclass.hasOwnProperty("create")){klass=klass.superclass
}else{klass=SC.T_FUNCTION}}return ret}.property("typeClass").cacheable(),toType:function(record,key,value){var transform=this.get("transform"),type=this.get("typeClass"),children;
if(transform&&transform.to){value=transform.to(value,this,type,record,key);if(!SC.none(value)&&(children=transform.observesChildren)){var i,len=children.length,context={record:record,key:key};
for(i=0;i<len;i++){value.addObserver(children[i],this,this._SCRA_childObserver,context)
}}}return value},_SCRA_childObserver:function(obj,key,deprecated,context,rev){this.call(context.record,context.key,obj);
context.record.notifyPropertyChange(context.key)},fromType:function(record,key,value){var transform=this.get("transform"),type=this.get("typeClass");
if(transform&&transform.from){value=transform.from(value,this,type,record,key)}return value
},call:function(record,key,value){var attrKey=this.get("key")||key,nvalue;if((value!==undefined)&&this.get("isEditable")){nvalue=this.fromType(record,key,value);
record.writeAttribute(attrKey,nvalue)}nvalue=value=record.readAttribute(attrKey);
if(SC.none(value)&&(value=this.get("defaultValue"))){if(typeof value===SC.T_FUNCTION){value=this.defaultValue(record,key,this);
if((nvalue!==value)&&record.get("store").readDataHash(record.get("storeKey"))){record.writeAttribute(attrKey,value,true)
}}}else{value=this.toType(record,key,value)}return value},isProperty:YES,isCacheable:YES,dependentKeys:[],init:function(){arguments.callee.base.apply(this,arguments);
this.cacheKey="__cache__"+SC.guidFor(this);this.lastSetValueKey="__lastValue__"+SC.guidFor(this)
}});SC.RecordAttribute.attr=function(attributeType,opts){if(!opts){opts={}}if(!opts.type){opts.type=attributeType||String
}return this.create(opts)};SC.RecordAttribute.transforms={};SC.RecordAttribute.registerTransform=function(klass,transform){SC.RecordAttribute.transforms[SC.guidFor(klass)]=transform
};SC.RecordAttribute.registerTransform(Boolean,{to:function(obj){return SC.none(obj)?null:!!obj
}});SC.RecordAttribute.registerTransform(Number,{to:function(obj){return SC.none(obj)?null:Number(obj)
}});SC.RecordAttribute.registerTransform(String,{to:function(obj){if(!(typeof obj===SC.T_STRING)&&!SC.none(obj)&&obj.toString){obj=obj.toString()
}return obj}});SC.RecordAttribute.registerTransform(Array,{to:function(obj){if(!SC.isArray(obj)&&!SC.none(obj)){obj=[]
}return obj},observesChildren:["[]"]});SC.RecordAttribute.registerTransform(Object,{to:function(obj){if(!(typeof obj==="object")&&!SC.none(obj)){obj={}
}return obj}});SC.RecordAttribute.registerTransform(SC.Record,{to:function(id,attr,recordType,parentRecord){var store=parentRecord.get("store");
if(SC.none(id)||(id==="")){return null}else{return store.find(recordType,id)}},from:function(record){return record?record.get("id"):null
}});SC.RecordAttribute.registerTransform(SC.T_FUNCTION,{to:function(id,attr,recordType,parentRecord){recordType=recordType.apply(parentRecord);
var store=parentRecord.get("store");return store.find(recordType,id)},from:function(record){return record.get("id")
}});SC.RecordAttribute.registerTransform(Date,{to:function(str,attr){if(SC.none(str)){return str
}var ret;str=str.toString()||"";if(attr.get("useIsoDate")){var regexp="([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?",d=str.match(new RegExp(regexp)),offset=0,date=new Date(d[1],0,1),time;
if(d[3]){date.setMonth(d[3]-1)}if(d[5]){date.setDate(d[5])}if(d[7]){date.setHours(d[7])
}if(d[8]){date.setMinutes(d[8])}if(d[10]){date.setSeconds(d[10])}if(d[12]){date.setMilliseconds(Number("0."+d[12])*1000)
}if(d[14]){offset=(Number(d[16])*60)+Number(d[17]);offset*=((d[15]==="-")?1:-1)}offset-=date.getTimezoneOffset();
time=(Number(date)+(offset*60*1000));ret=new Date();ret.setTime(Number(time))}else{ret=new Date(Date.parse(str))
}return ret},_dates:{},_zeropad:function(num){return((num<0)?"-":"")+((num<10)?"0":"")+Math.abs(num)
},from:function(date){if(SC.none(date)){return null}var ret=this._dates[date.getTime()];
if(ret){return ret}var zp=this._zeropad,tz=0-date.getTimezoneOffset()/60;tz=(tz===0)?"Z":"%@:00".fmt(zp(tz));
this._dates[date.getTime()]=ret="%@-%@-%@T%@:%@:%@%@".fmt(zp(date.getFullYear()),zp(date.getMonth()+1),zp(date.getDate()),zp(date.getHours()),zp(date.getMinutes()),zp(date.getSeconds()),tz);
return ret}});if(SC.DateTime&&!SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]){SC.RecordAttribute.registerTransform(SC.DateTime,{to:function(str,attr){if(SC.none(str)||SC.instanceOf(str,SC.DateTime)){return str
}var format=attr.get("format");return SC.DateTime.parse(str,format?format:SC.DateTime.recordFormat)
},from:function(dt,attr){if(SC.none(dt)){return dt}var format=attr.get("format");
return dt.toFormattedString(format?format:SC.DateTime.recordFormat)}})}SC.RecordAttribute.registerTransform(SC.Set,{to:function(value,attr,type,record,key){return SC.Set.create(value)
},from:function(value,attr,type,record,key){return value.toArray()},observesChildren:["[]"]});
sc_require("models/record");sc_require("models/record_attribute");SC.ChildAttribute=SC.RecordAttribute.extend({isNestedRecordTransform:YES,toType:function(record,key,value){var ret=null,rel,recordType=this.get("typeClass");
if(!record){throw"SC.Child: Error during transform: Unable to retrieve parent record."
}if(!SC.none(value)){ret=record.registerNestedRecord(value,key)}return ret},fromType:function(record,key,value){var sk,store,ret;
if(record){ret=record.registerNestedRecord(value,key,key);if(ret){sk=ret.get("storeKey");
store=ret.get("store");record.writeAttribute(key,store.readDataHash(sk))}else{if(value){record.writeAttribute(key,value)
}}}return ret},call:function(record,key,value){var attrKey=this.get("key")||key,cRef,cacheKey=SC.keyFor("__kid__",SC.guidFor(this));
if(value!==undefined){value=this.fromType(record,key,value)}else{value=record.readAttribute(attrKey);
if(SC.none(value)&&(value=this.get("defaultValue"))){if(typeof value===SC.T_FUNCTION){value=this.defaultValue(record,key,this);
if(record.attributes()){record.writeAttribute(attrKey,value,true)}}}else{value=this.toType(record,key,value)
}}return value}});SC.ChildArray=SC.Object.extend(SC.Enumerable,SC.Array,{defaultRecordType:null,record:null,propertyName:null,children:null,store:function(){return this.getPath("record.store")
}.property("record").cacheable(),storeKey:function(){return this.getPath("record.storeKey")
}.property("record").cacheable(),readOnlyChildren:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableChildren:function(){var store=this.get("store"),storeKey=this.get("storeKey"),pname=this.get("propertyName"),ret,hash;
ret=store.readEditableProperty(storeKey,pname);if(!ret){hash=store.readEditableDataHash(storeKey);
ret=hash[pname]=[]}if(ret!==this._prevChildren){this.recordPropertyDidChange()}return ret
}.property(),length:function(){var children=this.get("readOnlyChildren");return children?children.length:0
}.property("readOnlyChildren"),objectAt:function(idx){var recs=this._records,children=this.get("readOnlyChildren"),hash,ret,pname=this.get("propertyName"),parent=this.get("record");
var len=children?children.length:0;if(!children){return undefined}if(recs&&(ret=recs[idx])){return ret
}if(!recs){this._records=recs=[]}if(idx>=len){return undefined}hash=children.objectAt(idx);
if(!hash){return undefined}recs[idx]=ret=parent.registerNestedRecord(hash,pname,pname+"."+idx);
return ret},replace:function(idx,amt,recs){var children=this.get("editableChildren"),len=recs?(recs.get?recs.get("length"):recs.length):0,record=this.get("record"),newRecs,pname=this.get("propertyName"),cr,recordType;
newRecs=this._processRecordsToHashes(recs);children.replace(idx,amt,newRecs);record.recordDidChange(pname);
return this},_processRecordsToHashes:function(recs){var store,sk;recs=recs||[];recs.forEach(function(me,idx){if(me.isNestedRecord){store=me.get("store");
sk=me.storeKey;recs[idx]=store.readDataHash(sk)}});return recs},normalize:function(){this.forEach(function(child,id){if(child.normalize){child.normalize()
}})},recordPropertyDidChange:function(keys){if(keys&&!keys.contains(this.get("propertyName"))){return this
}var children=this.get("readOnlyChildren");var prev=this._prevChildren,f=this._childrenContentDidChange;
if(children===prev){return this}if(prev){prev.removeObserver("[]",this,f)}this._prevChildren=children;
if(children){children.addObserver("[]",this,f)}var rev=(children)?children.propertyRevision:-1;
this._childrenContentDidChange(children,"[]",children,rev);return this},_childrenContentDidChange:function(target,key,value,rev){this._records=null;
this.enumerableContentDidChange()},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});sc_require("models/record");sc_require("models/record_attribute");
sc_require("models/child_attribute");sc_require("system/child_array");SC.ChildrenAttribute=SC.ChildAttribute.extend({toType:function(record,key,value){var attrKey=this.get("key")||key,arrayKey=SC.keyFor("__kidsArray__",SC.guidFor(this)),ret=record[arrayKey],recordType=this.get("typeClass"),rel;
if(!ret){ret=SC.ChildArray.create({record:record,propertyName:attrKey,defaultRecordType:recordType});
record[arrayKey]=ret;rel=record.get("relationships");if(!rel){record.set("relationships",rel=[])
}rel.push(ret)}return ret},fromType:function(record,key,value){var sk,store,arrayKey=SC.keyFor("__kidsArray__",SC.guidFor(this)),ret=record[arrayKey];
if(record){record.writeAttribute(key,value);if(ret){ret=ret.recordPropertyDidChange()
}}return ret}});sc_require("models/record");sc_require("models/record_attribute");
SC.FetchedAttribute=SC.RecordAttribute.extend({paramValueKey:"link",paramOwnerKey:"owner",paramRelKey:"rel",queryKey:null,isEditable:NO,toType:function(record,key,value){var store=record.get("store");
if(!store){return null}var paramValueKey=this.get("paramValueKey"),paramOwnerKey=this.get("paramOwnerKey"),paramRelKey=this.get("paramRelKey"),queryKey=this.get("queryKey")||this.get("typeClass"),params={};
if(paramValueKey){params[paramValueKey]=value}if(paramOwnerKey){params[paramOwnerKey]=record
}if(paramRelKey){params[paramRelKey]=this.get("key")||key}return store.findAll(queryKey,params)
},fromType:function(record,key,value){return value}});SC.ManyArray=SC.Object.extend(SC.Enumerable,SC.Array,{recordType:null,record:null,propertyName:null,manyAttribute:null,store:function(){return this.get("record").get("store")
}.property("record").cacheable(),storeKey:function(){return this.get("record").get("storeKey")
}.property("record").cacheable(),readOnlyStoreIds:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableStoreIds:function(){var store=this.get("store"),storeKey=this.get("storeKey"),pname=this.get("propertyName"),ret,hash;
ret=store.readEditableProperty(storeKey,pname);if(!ret){hash=store.readEditableDataHash(storeKey);
ret=hash[pname]=[]}if(ret!==this._prevStoreIds){this.recordPropertyDidChange()}return ret
}.property(),isEditable:function(){var attr=this.manyAttribute;return attr?attr.get("isEditable"):NO
}.property("manyAttribute").cacheable(),inverse:function(){var attr=this.manyAttribute;
return attr?attr.get("inverse"):null}.property("manyAttribute").cacheable(),isMaster:function(){var attr=this.manyAttribute;
return attr?attr.get("isMaster"):null}.property("manyAttribute").cacheable(),orderBy:function(){var attr=this.manyAttribute;
return attr?attr.get("orderBy"):null}.property("manyAttribute").cacheable(),length:function(){var storeIds=this.get("readOnlyStoreIds");
return storeIds?storeIds.get("length"):0}.property("readOnlyStoreIds"),objectAt:function(idx){var recs=this._records,storeIds=this.get("readOnlyStoreIds"),store=this.get("store"),recordType=this.get("recordType"),storeKey,ret,storeId;
if(!storeIds||!store){return undefined}if(recs&&(ret=recs[idx])){return ret}if(!recs){this._records=recs=[]
}storeId=storeIds.objectAt(idx);if(storeId){storeKey=store.storeKeyFor(recordType,storeId);
if(store.readStatus(storeKey)===SC.Record.EMPTY){store.retrieveRecord(recordType,null,storeKey)
}recs[idx]=ret=store.materializeRecord(storeKey)}return ret},replace:function(idx,amt,recs){if(!this.get("isEditable")){throw"%@.%@[] is not editable".fmt(this.get("record"),this.get("propertyName"))
}var storeIds=this.get("editableStoreIds"),len=recs?(recs.get?recs.get("length"):recs.length):0,record=this.get("record"),pname=this.get("propertyName"),i,keys,ids,toRemove,inverse,attr,inverseRecord;
ids=[];for(i=0;i<len;i++){ids[i]=recs.objectAt(i).get("id")}inverse=this.get("inverse");
if(inverse&&amt>0){toRemove=SC.ManyArray._toRemove;if(toRemove){SC.ManyArray._toRemove=null
}else{toRemove=[]}for(i=0;i<amt;i++){toRemove[i]=this.objectAt(idx+i)}}storeIds.replace(idx,amt,ids);
if(inverse){for(i=0;i<amt;i++){inverseRecord=toRemove[i];attr=inverseRecord?inverseRecord[inverse]:null;
if(attr&&attr.inverseDidRemoveRecord){attr.inverseDidRemoveRecord(inverseRecord,inverse,record,pname)
}}if(toRemove){toRemove.length=0;if(!SC.ManyArray._toRemove){SC.ManyArray._toRemove=toRemove
}}for(i=0;i<len;i++){inverseRecord=recs.objectAt(i);attr=inverseRecord?inverseRecord[inverse]:null;
if(attr&&attr.inverseDidAddRecord){attr.inverseDidAddRecord(inverseRecord,inverse,record,pname)
}}}if(record&&(!inverse||this.get("isMaster"))){record.recordDidChange(pname)}this.enumerableContentDidChange(idx,amt,len-amt);
return this},removeInverseRecord:function(inverseRecord){if(!inverseRecord){return this
}var id=inverseRecord.get("id"),storeIds=this.get("editableStoreIds"),idx=(storeIds&&id)?storeIds.indexOf(id):-1,record;
if(idx>=0){storeIds.removeAt(idx);if(this.get("isMaster")&&(record=this.get("record"))){record.recordDidChange(this.get("propertyName"))
}}return this},addInverseRecord:function(inverseRecord){if(!inverseRecord){return this
}var id=inverseRecord.get("id"),storeIds=this.get("editableStoreIds"),orderBy=this.get("orderBy"),len=storeIds.get("length"),idx,record;
if(orderBy){idx=this._findInsertionLocation(inverseRecord,0,len,orderBy)}else{idx=len
}storeIds.insertAt(idx,inverseRecord.get("id"));if(this.get("isMaster")&&(record=this.get("record"))){record.recordDidChange(this.get("propertyName"))
}return this},_findInsertionLocation:function(rec,min,max,orderBy){var idx=min+Math.floor((max-min)/2),cur=this.objectAt(idx),order=this._compare(rec,cur,orderBy);
if(order<0){if(idx===0){return idx}else{return this._findInsertionLocation(rec,0,idx,orderBy)
}}else{if(order>0){if(idx>=max){return idx}else{return this._findInsertionLocation(rec,idx,max,orderBy)
}}else{return idx}}},_compare:function(a,b,orderBy){var t=SC.typeOf(orderBy),ret,idx,len;
if(t===SC.T_FUNCTION){ret=orderBy(a,b)}else{if(t===SC.T_STRING){ret=SC.compare(a,b)
}else{len=orderBy.get("length");ret=0;for(idx=0;(ret===0)&&(idx<len);idx++){ret=SC.compare(a,b)
}}}return ret},recordPropertyDidChange:function(keys){if(keys&&!keys.contains(this.get("propertyName"))){return this
}var storeIds=this.get("readOnlyStoreIds");var prev=this._prevStoreIds,f=this._storeIdsContentDidChange;
if(storeIds===prev){return this}if(prev){prev.removeObserver("[]",this,f)}this._prevStoreIds=storeIds;
if(storeIds){storeIds.addObserver("[]",this,f)}var rev=(storeIds)?storeIds.propertyRevision:-1;
this._storeIdsContentDidChange(storeIds,"[]",storeIds,rev)},_storeIdsContentDidChange:function(target,key,value,rev){this._records=null;
this.enumerableContentDidChange()},unknownProperty:function(key,value){var ret;if(SC.typeOf(key)===SC.T_STRING){ret=this.reducedProperty(key,value)
}return ret===undefined?arguments.callee.base.apply(this,arguments):ret},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});sc_require("models/record");sc_require("models/record_attribute");
sc_require("system/many_array");SC.ManyAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,orderBy:null,toType:function(record,key,value){var type=this.get("typeClass"),attrKey=this.get("key")||key,arrayKey=SC.keyFor("__manyArray__",SC.guidFor(this)),ret=record[arrayKey],rel;
if(!ret){ret=SC.ManyArray.create({recordType:type,record:record,propertyName:attrKey,manyAttribute:this});
record[arrayKey]=ret;rel=record.get("relationships");if(!rel){record.set("relationships",rel=[])
}rel.push(ret)}return ret},fromType:function(record,key,value){var ret=[];if(!SC.isArray(value)){throw"Expects toMany attribute to be an array"
}var len=value.get("length");for(var i=0;i<len;i++){ret[i]=value.objectAt(i).get("id")
}return ret},inverseDidRemoveRecord:function(record,key,inverseRecord,inverseKey){var manyArray=record.get(key);
if(manyArray){manyArray.removeInverseRecord(inverseRecord)}},inverseDidAddRecord:function(record,key,inverseRecord,inverseKey){var manyArray=record.get(key);
if(manyArray){manyArray.addInverseRecord(inverseRecord)}}});sc_require("models/record");
sc_require("models/record_attribute");SC.SingleAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,call:function(record,key,newRec){var attrKey=this.get("key")||key,inverseKey,isMaster,oldRec,attr,ret,nvalue;
if(newRec!==undefined&&this.get("isEditable")){if(newRec&&!SC.kindOf(newRec,SC.Record)){throw"%@ is not an instance of SC.Record".fmt(newRec)
}inverseKey=this.get("inverse");if(inverseKey){oldRec=this._scsa_call(record,key)
}nvalue=this.fromType(record,key,newRec);record.writeAttribute(attrKey,nvalue,!this.get("isMaster"));
ret=newRec;if(inverseKey&&(oldRec!==newRec)){if(oldRec&&(attr=oldRec[inverseKey])){attr.inverseDidRemoveRecord(oldRec,inverseKey,record,key)
}if(newRec&&(attr=newRec[inverseKey])){attr.inverseDidAddRecord(newRec,inverseKey,record,key)
}}}else{ret=this._scsa_call(record,key,newRec)}return ret},_scsa_call:SC.RecordAttribute.prototype.call,inverseDidRemoveRecord:function(record,key,inverseRecord,inverseKey){var myInverseKey=this.get("inverse"),curRec=this._scsa_call(record,key),isMaster=this.get("isMaster"),attr;
record.writeAttribute(key,null,!isMaster);record.notifyPropertyChange(key);if((curRec!==inverseRecord)||(inverseKey!==myInverseKey)){if(curRec&&(attr=curRec[myInverseKey])){attr.inverseDidRemoveRecord(curRec,myInverseKey,record,key)
}}},inverseDidAddRecord:function(record,key,inverseRecord,inverseKey){var myInverseKey=this.get("inverse"),curRec=this._scsa_call(record,key),isMaster=this.get("isMaster"),attr,nvalue;
nvalue=this.fromType(record,key,inverseRecord);record.writeAttribute(key,nvalue,!isMaster);
record.notifyPropertyChange(key);if((curRec!==inverseRecord)||(inverseKey!==myInverseKey)){if(curRec&&(attr=curRec[myInverseKey])){attr.inverseDidRemoveRecord(curRec,myInverseKey,record,key)
}}}});sc_require("models/record");SC.Store=SC.Object.extend({name:null,nestedStores:null,dataSource:null,isNested:NO,commitRecordsAutomatically:NO,from:function(dataSource){this.set("dataSource",dataSource);
return this},_getDataSource:function(){var ret=this.get("dataSource");if(typeof ret===SC.T_STRING){ret=SC.objectForPropertyPath(ret);
if(ret&&ret.isClass){ret=ret.create()}if(ret){this.set("dataSource",ret)}}return ret
},cascade:function(dataSource){var dataSources=SC.A(arguments);dataSource=SC.CascadeDataSource.create({dataSources:dataSources});
return this.from(dataSource)},chain:function(attrs,newStoreClass){if(!attrs){attrs={}
}attrs.parentStore=this;if(newStoreClass){if(SC.typeOf(newStoreClass)!=="class"){throw new Error("%@ is not a valid class".fmt(newStoreClass))
}if(!SC.kindOf(newStoreClass,SC.NestedStore)){throw new Error("%@ is not a type of SC.NestedStore".fmt(newStoreClass))
}}else{newStoreClass=SC.NestedStore}attrs.childRecords=this.childRecords?SC.clone(this.childRecords):{};
attrs.parentRecords=this.parentRecords?SC.clone(this.parentRecords):{};var ret=newStoreClass.create(attrs),nested=this.nestedStores;
if(!nested){nested=this.nestedStores=[]}nested.push(ret);return ret},willDestroyNestedStore:function(nestedStore){if(this.nestedStores){this.nestedStores.removeObject(nestedStore)
}return this},hasNestedStore:function(store){while(store&&(store!==this)){store=store.get("parentStore")
}return store===this},dataHashes:null,statuses:null,revisions:null,editables:null,changelog:null,recordErrors:null,queryErrors:null,childRecords:null,parentRecords:null,storeKeyEditState:function(storeKey){var editables=this.editables,locks=this.locks;
return(editables&&editables[storeKey])?SC.Store.EDITABLE:SC.Store.LOCKED},readDataHash:function(storeKey){return this.dataHashes[storeKey]
},readEditableDataHash:function(storeKey){var ret=this.dataHashes[storeKey];if(!ret){return ret
}var editables=this.editables;if(!editables){editables=this.editables=[]}if(!editables[storeKey]){editables[storeKey]=1;
ret=this.dataHashes[storeKey]=SC.clone(ret,YES)}return ret},readEditableProperty:function(storeKey,propertyName){var hash=this.readEditableDataHash(storeKey),editables=this.editables[storeKey],ret=hash[propertyName];
if(editables===1){editables=this.editables[storeKey]={}}if(!editables[propertyName]){ret=hash[propertyName];
if(ret&&ret.isCopyable){ret=hash[propertyName]=ret.copy(YES)}editables[propertyName]=YES
}return ret},writeDataHash:function(storeKey,hash,status){if(hash){this.dataHashes[storeKey]=hash
}if(status){this.statuses[storeKey]=status}var editables=this.editables;if(!editables){editables=this.editables=[]
}editables[storeKey]=1;var that=this;this._propagateToChildren(storeKey,function(storeKey){that.writeDataHash(storeKey,null,status)
});return this},removeDataHash:function(storeKey,status){this.dataHashes[storeKey]=null;
this.statuses[storeKey]=status||SC.Record.EMPTY;var editables=this.editables;if(editables){editables[storeKey]=0
}return this},readStatus:function(storeKey){this.readDataHash(storeKey);return this.statuses[storeKey]||SC.Record.EMPTY
},peekStatus:function(storeKey){return this.statuses[storeKey]||SC.Record.EMPTY},writeStatus:function(storeKey,newStatus){return this.writeDataHash(storeKey,null,newStatus)
},dataHashDidChange:function(storeKeys,rev,statusOnly,key){if(!rev){rev=SC.Store.generateStoreKey()
}var isArray,len,idx,storeKey;isArray=SC.typeOf(storeKeys)===SC.T_ARRAY;if(isArray){len=storeKeys.length
}else{len=1;storeKey=storeKeys}var that=this;for(idx=0;idx<len;idx++){if(isArray){storeKey=storeKeys[idx]
}this.revisions[storeKey]=rev;this._notifyRecordPropertyChange(storeKey,statusOnly,key);
this._propagateToChildren(storeKey,function(storeKey){that.dataHashDidChange(storeKey,null,statusOnly,key)
})}return this},_notifyRecordPropertyChange:function(storeKey,statusOnly,key){var records=this.records,nestedStores=this.get("nestedStores"),K=SC.Store,rec,editState,len,idx,store,status,keys;
len=nestedStores?nestedStores.length:0;for(idx=0;idx<len;idx++){store=nestedStores[idx];
status=store.peekStatus(storeKey);editState=store.storeKeyEditState(storeKey);if(editState===K.INHERITED){store._notifyRecordPropertyChange(storeKey,statusOnly,key)
}else{if(status&SC.Record.BUSY){if(store.get("hasChanges")){throw K.CHAIN_CONFLICT_ERROR
}store.reset()}}}var changes=this.recordPropertyChanges;if(!changes){changes=this.recordPropertyChanges={storeKeys:SC.CoreSet.create(),records:SC.CoreSet.create(),hasDataChanges:SC.CoreSet.create(),propertyForStoreKeys:{}}
}changes.storeKeys.add(storeKey);if(records&&(rec=records[storeKey])){changes.records.push(storeKey);
if(!statusOnly){changes.hasDataChanges.push(storeKey)}if(key){if(!(keys=changes.propertyForStoreKeys[storeKey])){keys=changes.propertyForStoreKeys[storeKey]=SC.CoreSet.create()
}if(keys!=="*"){keys.add(key)}}else{changes.propertyForStoreKeys[storeKey]="*"}}this.invokeOnce(this.flush);
return this},flush:function(){if(!this.recordPropertyChanges){return this}var changes=this.recordPropertyChanges,storeKeys=changes.storeKeys,hasDataChanges=changes.hasDataChanges,records=changes.records,propertyForStoreKeys=changes.propertyForStoreKeys,recordTypes=SC.CoreSet.create(),rec,recordType,statusOnly,idx,len,storeKey,keys;
storeKeys.forEach(function(storeKey){if(records.contains(storeKey)){statusOnly=hasDataChanges.contains(storeKey)?NO:YES;
rec=this.records[storeKey];keys=propertyForStoreKeys?propertyForStoreKeys[storeKey]:null;
if(keys==="*"){keys=null}records.remove(storeKey);if(rec){rec.storeDidChangeProperties(statusOnly,keys)
}}recordType=SC.Store.recordTypeFor(storeKey);recordTypes.add(recordType)},this);
if(storeKeys.get("length")>0){this._notifyRecordArrays(storeKeys,recordTypes)}storeKeys.clear();
hasDataChanges.clear();records.clear();this.recordPropertyChanges.propertyForStoreKeys={};
return this},reset:function(){this.dataHashes={};this.revisions={};this.statuses={};
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.recordErrors=null;
this.queryErrors=null;var records=this.records,storeKey;if(records){for(storeKey in records){if(!records.hasOwnProperty(storeKey)){continue
}this._notifyRecordPropertyChange(parseInt(storeKey,10),NO)}}this.set("hasChanges",NO)
},commitChangesFromNestedStore:function(nestedStore,changes,force){if(!force){this._verifyLockRevisions(changes,nestedStore.locks)
}var len=changes.length,i,storeKey,myDataHashes,myStatuses,myEditables,myRevisions,myParentRecords,myChildRecords,chDataHashes,chStatuses,chRevisions,chParentRecords,chChildRecords;
myRevisions=this.revisions;myDataHashes=this.dataHashes;myStatuses=this.statuses;
myEditables=this.editables;myParentRecords=this.parentRecords?this.parentRecords:this.parentRecords={};
myChildRecords=this.childRecords?this.childRecords:this.childRecords={};if(!myEditables){myEditables=this.editables=[]
}chDataHashes=nestedStore.dataHashes;chRevisions=nestedStore.revisions;chStatuses=nestedStore.statuses;
chParentRecords=nestedStore.parentRecords||{};chChildRecords=nestedStore.childRecords||{};
for(i=0;i<len;i++){storeKey=changes[i];myDataHashes[storeKey]=chDataHashes[storeKey];
myStatuses[storeKey]=chStatuses[storeKey];myRevisions[storeKey]=chRevisions[storeKey];
myParentRecords[storeKey]=chParentRecords[storeKey];myChildRecords[storeKey]=chChildRecords[storeKey];
myEditables[storeKey]=0;this._notifyRecordPropertyChange(storeKey,NO)}var myChangelog=this.changelog,chChangelog=nestedStore.changelog;
if(chChangelog){if(!myChangelog){myChangelog=this.changelog=SC.CoreSet.create()}myChangelog.addEach(chChangelog)
}this.changelog=myChangelog;if(!this.get("parentStore")){this.flush()}return this
},_verifyLockRevisions:function(changes,locks){var len=changes.length,revs=this.revisions,i,storeKey,lock,rev;
if(locks&&revs){for(i=0;i<len;i++){storeKey=changes[i];lock=locks[storeKey]||1;rev=revs[storeKey]||1;
if(lock<rev){throw SC.Store.CHAIN_CONFLICT_ERROR}}}return this},find:function(recordType,id){if(SC.typeOf(recordType)===SC.T_STRING){recordType=SC.objectForPropertyPath(recordType)
}if((arguments.length===1)&&!(recordType&&recordType.get&&recordType.get("isRecord"))){if(!recordType){throw new Error("SC.Store#find() must pass recordType or query")
}if(!recordType.isQuery){recordType=SC.Query.local(recordType)}return this._findQuery(recordType,YES,YES)
}else{return this._findRecord(recordType,id)}},findAll:function(recordType,conditions,params){SC.Logger.warn("SC.Store#findAll() will be removed in a future version of SproutCore.  Use SC.Store#find() instead");
if(!recordType||!recordType.isQuery){recordType=SC.Query.local(recordType,conditions,params)
}return this._findQuery(recordType,YES,YES)},_findQuery:function(query,createIfNeeded,refreshIfNew){var cache=this._scst_recordArraysByQuery,key=SC.guidFor(query),ret,ra;
if(!cache){cache=this._scst_recordArraysByQuery={}}ret=cache[key];if(!ret&&createIfNeeded){cache[key]=ret=SC.RecordArray.create({store:this,query:query});
ra=this.get("recordArrays");if(!ra){this.set("recordArrays",ra=SC.Set.create())}ra.add(ret);
if(refreshIfNew){this.refreshQuery(query)}}this.flush();return ret},_findRecord:function(recordType,id){var storeKey;
if(recordType&&recordType.get&&recordType.get("isRecord")){storeKey=recordType.get("storeKey")
}else{storeKey=id?recordType.storeKeyFor(id):null}if(storeKey&&(this.readStatus(storeKey)===SC.Record.EMPTY)){storeKey=this.retrieveRecord(recordType,id)
}return storeKey?this.materializeRecord(storeKey):null},recordArrayWillDestroy:function(recordArray){var cache=this._scst_recordArraysByQuery,set=this.get("recordArrays");
if(cache){delete cache[SC.guidFor(recordArray.get("query"))]}if(set){set.remove(recordArray)
}return this},refreshQuery:function(query){if(!query){throw new Error("refreshQuery() requires a query")
}var cache=this._scst_recordArraysByQuery,recArray=cache?cache[SC.guidFor(query)]:null,source=this._getDataSource();
if(source&&source.fetch){if(recArray){recArray.storeWillFetchQuery(query)}source.fetch.call(source,this,query)
}return this},_notifyRecordArrays:function(storeKeys,recordTypes){var recordArrays=this.get("recordArrays");
if(!recordArrays){return this}recordArrays.forEach(function(recArray){if(recArray){recArray.storeDidChangeStoreKeys(storeKeys,recordTypes)
}},this);return this},recordsFor:function(recordType){var storeKeys=[],storeKeysById=recordType.storeKeysById(),id,storeKey,ret;
for(id in storeKeysById){storeKey=storeKeysById[id];if(this.readStatus(storeKey)!==SC.RECORD_EMPTY){storeKeys.push(storeKey)
}}if(storeKeys.length>0){ret=SC.RecordArray.create({store:this,storeKeys:storeKeys})
}else{ret=storeKeys}return ret},_TMP_REC_ATTRS:{},materializeRecord:function(storeKey){var records=this.records,ret,recordType,attrs;
if(!records){records=this.records={}}ret=records[storeKey];if(ret){return ret}recordType=SC.Store.recordTypeFor(storeKey);
if(!recordType){return null}attrs=this._TMP_REC_ATTRS;attrs.storeKey=storeKey;attrs.store=this;
ret=records[storeKey]=recordType.create(attrs);return ret},createRecord:function(recordType,dataHash,id){var primaryKey,storeKey,status,K=SC.Record,changelog,defaultVal,ret;
if(!id&&(primaryKey=recordType.prototype.primaryKey)){id=dataHash[primaryKey];defaultVal=recordType.prototype[primaryKey]?recordType.prototype[primaryKey].defaultValue:null;
if(!id&&SC.typeOf(defaultVal)===SC.T_FUNCTION){id=dataHash[primaryKey]=defaultVal()
}}storeKey=id?recordType.storeKeyFor(id):SC.Store.generateStoreKey();status=this.readStatus(storeKey);
if((status&K.BUSY)||(status&K.READY)||(status===K.DESTROYED_DIRTY)){throw id?K.RECORD_EXISTS_ERROR:K.BAD_STATE_ERROR
}else{if(!id&&(status===SC.DESTROYED_CLEAN||status===SC.ERROR)){throw K.BAD_STATE_ERROR
}}this.writeDataHash(storeKey,(dataHash?dataHash:{}),K.READY_NEW);SC.Store.replaceRecordTypeFor(storeKey,recordType);
this.dataHashDidChange(storeKey);changelog=this.changelog;if(!changelog){changelog=SC.Set.create()
}changelog.add(storeKey);this.changelog=changelog;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}ret=this.materializeRecord(storeKey);if(ret){ret.propagateToAggregates()}return ret
},createRecords:function(recordTypes,dataHashes,ids){var ret=[],recordType,id,isArray,len=dataHashes.length,idx;
isArray=SC.typeOf(recordTypes)===SC.T_ARRAY;if(!isArray){recordType=recordTypes}for(idx=0;
idx<len;idx++){if(isArray){recordType=recordTypes[idx]||SC.Record}id=ids?ids[idx]:undefined;
ret.push(this.createRecord(recordType,dataHashes[idx],id))}return ret},unloadRecord:function(recordType,id,storeKey,newStatus){if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)
}var status=this.readStatus(storeKey),K=SC.Record;newStatus=newStatus||K.EMPTY;if((status===K.BUSY_DESTROYING)||(status&K.DESTROYED)){return this
}else{if(status&K.BUSY){throw K.BUSY_ERROR}else{status=newStatus}}this.removeDataHash(storeKey,status);
this.dataHashDidChange(storeKey);var that=this;this._propagateToChildren(storeKey,function(storeKey){that.unloadRecord(null,null,storeKey,newStatus)
});return this},unloadRecords:function(recordTypes,ids,storeKeys,newStatus){var len,isArray,idx,id,recordType,storeKey;
if(storeKeys===undefined){isArray=SC.typeOf(recordTypes)===SC.T_ARRAY;if(!isArray){recordType=recordTypes
}if(ids===undefined){len=isArray?recordTypes.length:1;for(idx=0;idx<len;idx++){if(isArray){recordType=recordTypes[idx]
}storeKeys=this.storeKeysFor(recordType);this.unloadRecords(undefined,undefined,storeKeys,newStatus)
}}else{len=ids.length;for(idx=0;idx<len;idx++){if(isArray){recordType=recordTypes[idx]||SC.Record
}id=ids?ids[idx]:undefined;this.unloadRecord(recordType,id,undefined,newStatus)}}}else{len=storeKeys.length;
for(idx=0;idx<len;idx++){storeKey=storeKeys?storeKeys[idx]:undefined;this.unloadRecord(undefined,undefined,storeKey,newStatus)
}}return this},destroyRecord:function(recordType,id,storeKey){if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)
}var status=this.readStatus(storeKey),changelog,K=SC.Record;if((status===K.BUSY_DESTROYING)||(status&K.DESTROYED)){return this
}else{if(status===K.EMPTY){throw K.NOT_FOUND_ERROR}else{if(status&K.BUSY){throw K.BUSY_ERROR
}else{if(status===K.READY_NEW){status=K.DESTROYED_CLEAN}else{status=K.DESTROYED_DIRTY
}}}}this.writeStatus(storeKey,status);this.dataHashDidChange(storeKey);changelog=this.changelog;
if(!changelog){changelog=this.changelog=SC.Set.create()}((status&K.DIRTY)?changelog.add(storeKey):changelog.remove(storeKey));
this.changelog=changelog;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}var that=this;this._propagateToChildren(storeKey,function(storeKey){that.destroyRecord(null,null,storeKey)
});return this},destroyRecords:function(recordTypes,ids,storeKeys){var len,isArray,idx,id,recordType,storeKey;
if(storeKeys===undefined){len=ids.length;isArray=SC.typeOf(recordTypes)===SC.T_ARRAY;
if(!isArray){recordType=recordTypes}for(idx=0;idx<len;idx++){if(isArray){recordType=recordTypes[idx]||SC.Record
}id=ids?ids[idx]:undefined;this.destroyRecord(recordType,id,undefined)}}else{len=storeKeys.length;
for(idx=0;idx<len;idx++){storeKey=storeKeys?storeKeys[idx]:undefined;this.destroyRecord(undefined,undefined,storeKey)
}}return this},registerChildToParent:function(parentStoreKey,childStoreKey,path){var prs,crs,oldPk,oldChildren,pkRef;
crs=this.childRecords||{};prs=this.parentRecords||{};oldPk=crs[childStoreKey];if(oldPk){oldChildren=prs[oldPk];
delete oldChildren[childStoreKey]}pkRef=prs[parentStoreKey]||{};pkRef[childStoreKey]=path||YES;
prs[parentStoreKey]=pkRef;crs[childStoreKey]=parentStoreKey;this.writeStatus(childStoreKey,this.statuses[parentStoreKey]);
this.childRecords=crs;this.parentRecords=prs},materializeParentRecord:function(childStoreKey){var pk,crs;
if(SC.none(childStoreKey)){return null}crs=this.childRecords;pk=crs?this.childRecords[childStoreKey]:null;
if(SC.none(pk)){return null}return this.materializeRecord(pk)},parentStoreKeyExists:function(storeKey){if(SC.none(storeKey)){return
}var crs=this.childRecords||{};return crs[storeKey]},_propagateToChildren:function(storeKey,func){if(SC.none(this.parentRecords)){return
}var children=this.parentRecords[storeKey]||{};if(SC.none(func)){return}for(var key in children){if(children.hasOwnProperty(key)){func(key)
}}},recordDidChange:function(recordType,id,storeKey,key,statusOnly){if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)
}var status=this.readStatus(storeKey),changelog,K=SC.Record;if(status&K.BUSY){throw K.BUSY_ERROR
}else{if(!(status&K.READY)){throw K.NOT_FOUND_ERROR}else{if(status!=K.READY_NEW){this.writeStatus(storeKey,K.READY_DIRTY)
}}}this.dataHashDidChange(storeKey,null,statusOnly,key);changelog=this.changelog;
if(!changelog){changelog=this.changelog=SC.Set.create()}changelog.add(storeKey);this.changelog=changelog;
if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)}return this
},recordsDidChange:function(recordTypes,ids,storeKeys){var len,isArray,idx,id,recordType,storeKey;
if(storeKeys===undefined){len=ids.length;isArray=SC.typeOf(recordTypes)===SC.T_ARRAY;
if(!isArray){recordType=recordTypes}for(idx=0;idx<len;idx++){if(isArray){recordType=recordTypes[idx]||SC.Record
}id=ids?ids[idx]:undefined;storeKey=storeKeys?storeKeys[idx]:undefined;this.recordDidChange(recordType,id,storeKey)
}}else{len=storeKeys.length;for(idx=0;idx<len;idx++){storeKey=storeKeys?storeKeys[idx]:undefined;
this.recordDidChange(undefined,undefined,storeKey)}}return this},retrieveRecords:function(recordTypes,ids,storeKeys,isRefresh){var source=this._getDataSource(),isArray=SC.typeOf(recordTypes)===SC.T_ARRAY,len=(!storeKeys)?ids.length:storeKeys.length,ret=[],rev=SC.Store.generateStoreKey(),K=SC.Record,recordType,idx,storeKey,status,ok;
if(!isArray){recordType=recordTypes}for(idx=0;idx<len;idx++){if(storeKeys){storeKey=storeKeys[idx]
}else{if(isArray){recordType=recordTypes[idx]}storeKey=recordType.storeKeyFor(ids[idx])
}status=this.readStatus(storeKey);if((status==K.EMPTY)||(status==K.ERROR)||(status==K.DESTROYED_CLEAN)){this.writeStatus(storeKey,K.BUSY_LOADING);
this.dataHashDidChange(storeKey,rev,YES);ret.push(storeKey)}else{if(isRefresh){if(status&K.READY){this.writeStatus(storeKey,K.BUSY_REFRESH|(status&3));
this.dataHashDidChange(storeKey,rev,YES);ret.push(storeKey)}else{if((status==K.BUSY_DESTROYING)||(status==K.BUSY_CREATING)||(status==K.BUSY_COMMITTING)){throw K.BUSY_ERROR
}else{if(status==K.DESTROYED_DIRTY){throw K.BAD_STATE_ERROR}}}}}}ok=NO;if(source){ok=source.retrieveRecords.call(source,this,ret,ids)
}if(!ok){len=ret.length;rev=SC.Store.generateStoreKey();for(idx=0;idx<len;idx++){storeKey=ret[idx];
status=this.readStatus(storeKey);if(status===K.BUSY_LOADING){this.writeStatus(storeKey,K.ERROR);
this.dataHashDidChange(storeKey,rev,YES)}else{if(status&K.BUSY_REFRESH){this.writeStatus(storeKey,K.READY|(status&3));
this.dataHashDidChange(storeKey,rev,YES)}}}ret.length=0}return ret},_TMP_RETRIEVE_ARRAY:[],retrieveRecord:function(recordType,id,storeKey,isRefresh){var array=this._TMP_RETRIEVE_ARRAY,ret;
if(storeKey){array[0]=storeKey;storeKey=array;id=null}else{array[0]=id;id=array}ret=this.retrieveRecords(recordType,id,storeKey,isRefresh);
array.length=0;return ret[0]},refreshRecord:function(recordType,id,storeKey){return !!this.retrieveRecord(recordType,id,storeKey,YES)
},refreshRecords:function(recordTypes,ids,storeKeys){var ret=this.retrieveRecords(recordTypes,ids,storeKeys,YES);
return ret&&ret.length>0},commitRecords:function(recordTypes,ids,storeKeys,params){var source=this._getDataSource(),isArray=SC.typeOf(recordTypes)===SC.T_ARRAY,retCreate=[],retUpdate=[],retDestroy=[],rev=SC.Store.generateStoreKey(),K=SC.Record,recordType,idx,storeKey,status,key,ret,len;
if(!recordTypes&&!ids&&!storeKeys){storeKeys=this.changelog}len=storeKeys?storeKeys.get("length"):(ids?ids.get("length"):0);
for(idx=0;idx<len;idx++){if(storeKeys){storeKey=storeKeys[idx]}else{if(isArray){recordType=recordTypes[idx]||SC.Record
}else{recordType=recordTypes}storeKey=recordType.storeKeyFor(ids[idx])}status=this.readStatus(storeKey);
if((status==K.EMPTY)||(status==K.ERROR)){throw K.NOT_FOUND_ERROR}else{if(status==K.READY_NEW){this.writeStatus(storeKey,K.BUSY_CREATING);
this.dataHashDidChange(storeKey,rev,YES);retCreate.push(storeKey)}else{if(status==K.READY_DIRTY){this.writeStatus(storeKey,K.BUSY_COMMITTING);
this.dataHashDidChange(storeKey,rev,YES);retUpdate.push(storeKey)}else{if(status==K.DESTROYED_DIRTY){this.writeStatus(storeKey,K.BUSY_DESTROYING);
this.dataHashDidChange(storeKey,rev,YES);retDestroy.push(storeKey)}else{if(status==K.DESTROYED_CLEAN){this.dataHashDidChange(storeKey,rev,YES)
}}}}}}if(source&&(len>0||params)){ret=source.commitRecords.call(source,this,retCreate,retUpdate,retDestroy,params)
}if(ret&&!recordTypes&&!ids){if(storeKeys===this.changelog){this.changelog=null}else{this.changelog.removeEach(storeKeys)
}}return ret},commitRecord:function(recordType,id,storeKey,params){var array=this._TMP_RETRIEVE_ARRAY,ret;
if(id===undefined&&storeKey===undefined){return NO}if(storeKey!==undefined){array[0]=storeKey;
storeKey=array;id=null}else{array[0]=id;id=array}ret=this.commitRecords(recordType,id,storeKey,params);
array.length=0;return ret},cancelRecords:function(recordTypes,ids,storeKeys){var source=this._getDataSource(),isArray=SC.typeOf(recordTypes)===SC.T_ARRAY,K=SC.Record,ret=[],status,len,idx,id,recordType,storeKey;
len=(storeKeys===undefined)?ids.length:storeKeys.length;for(idx=0;idx<len;idx++){if(isArray){recordType=recordTypes[idx]||SC.Record
}else{recordType=recordTypes||SC.Record}id=ids?ids[idx]:undefined;if(storeKeys===undefined){storeKey=recordType.storeKeyFor(id)
}else{storeKey=storeKeys?storeKeys[idx]:undefined}if(storeKey){status=this.readStatus(storeKey);
if((status==K.EMPTY)||(status==K.ERROR)){throw K.NOT_FOUND_ERROR}ret.push(storeKey)
}}if(source){source.cancel.call(source,this,ret)}return this},cancelRecord:function(recordType,id,storeKey){var array=this._TMP_RETRIEVE_ARRAY,ret;
if(storeKey!==undefined){array[0]=storeKey;storeKey=array;id=null}else{array[0]=id;
id=array}ret=this.cancelRecords(recordType,id,storeKey);array.length=0;return this
},loadRecord:function(recordType,dataHash,id){var K=SC.Record,ret,primaryKey,storeKey;
recordType=recordType||SC.Record;primaryKey=recordType.prototype.primaryKey;id=id||dataHash[primaryKey];
ret=storeKey=recordType.storeKeyFor(id);if(this.readStatus(storeKey)&K.BUSY){this.dataSourceDidComplete(storeKey,dataHash,id)
}else{this.pushRetrieve(recordType,id,dataHash,storeKey)}return ret},loadRecords:function(recordTypes,dataHashes,ids){var isArray=SC.typeOf(recordTypes)===SC.T_ARRAY,len=dataHashes.get("length"),ret=[],K=SC.Record,recordType,id,primaryKey,idx,dataHash,storeKey;
if(!isArray){recordType=recordTypes||SC.Record;primaryKey=recordType.prototype.primaryKey
}for(idx=0;idx<len;idx++){dataHash=dataHashes.objectAt(idx);if(isArray){recordType=recordTypes.objectAt(idx)||SC.Record;
primaryKey=recordType.prototype.primaryKey}id=(ids)?ids.objectAt(idx):dataHash[primaryKey];
ret[idx]=this.loadRecord(recordType,dataHash,id)}return ret},readError:function(storeKey){var errors=this.recordErrors;
return errors?errors[storeKey]:undefined},readQueryError:function(query){var errors=this.queryErrors;
return errors?errors[SC.guidFor(query)]:undefined},dataSourceDidCancel:function(storeKey){var status=this.readStatus(storeKey),K=SC.Record;
if(!(status&K.BUSY)){throw K.BAD_STATE_ERROR}switch(status){case K.BUSY_LOADING:status=K.EMPTY;
break;case K.BUSY_CREATING:status=K.READY_NEW;break;case K.BUSY_COMMITTING:status=K.READY_DIRTY;
break;case K.BUSY_REFRESH_CLEAN:status=K.READY_CLEAN;break;case K.BUSY_REFRESH_DIRTY:status=K.READY_DIRTY;
break;case K.BUSY_DESTROYING:status=K.DESTROYED_DIRTY;break;default:throw K.BAD_STATE_ERROR
}this.writeStatus(storeKey,status);this.dataHashDidChange(storeKey,null,YES);return this
},dataSourceDidComplete:function(storeKey,dataHash,newId){var status=this.readStatus(storeKey),K=SC.Record,statusOnly;
if(!(status&K.BUSY)){throw K.BAD_STATE_ERROR}if(status===K.BUSY_DESTROYING){throw K.BAD_STATE_ERROR
}else{status=K.READY_CLEAN}this.writeStatus(storeKey,status);if(dataHash){this.writeDataHash(storeKey,dataHash,status)
}if(newId){SC.Store.replaceIdFor(storeKey,newId)}statusOnly=dataHash||newId?NO:YES;
this.dataHashDidChange(storeKey,null,statusOnly);var record=this.materializeRecord(storeKey);
if(record!=null){record.notifyPropertyChange("status")}return this},dataSourceDidDestroy:function(storeKey){var status=this.readStatus(storeKey),K=SC.Record;
if(!(status&K.BUSY)){throw K.BAD_STATE_ERROR}else{status=K.DESTROYED_CLEAN}this.removeDataHash(storeKey,status);
this.dataHashDidChange(storeKey);var record=this.materializeRecord(storeKey);if(record!=null){record.notifyPropertyChange("status")
}return this},dataSourceDidError:function(storeKey,error){var status=this.readStatus(storeKey),errors=this.recordErrors,K=SC.Record;
if(!(status&K.BUSY)){throw K.BAD_STATE_ERROR}else{status=K.ERROR}if(error&&error.isError){if(!errors){errors=this.recordErrors=[]
}errors[storeKey]=error}this.writeStatus(storeKey,status);this.dataHashDidChange(storeKey,null,YES);
var record=this.materializeRecord(storeKey);if(record!=null){record.notifyPropertyChange("status")
}return this},pushRetrieve:function(recordType,id,dataHash,storeKey){var K=SC.Record,status;
if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)}status=this.readStatus(storeKey);
if(status==K.EMPTY||status==K.ERROR||status==K.READY_CLEAN||status==K.DESTROYED_CLEAN){status=K.READY_CLEAN;
if(dataHash===undefined){this.writeStatus(storeKey,status)}else{this.writeDataHash(storeKey,dataHash,status)
}this.dataHashDidChange(storeKey);return storeKey}return NO},pushDestroy:function(recordType,id,storeKey){var K=SC.Record,status;
if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)}status=this.readStatus(storeKey);
if(status==K.EMPTY||status==K.ERROR||status==K.READY_CLEAN||status==K.DESTROYED_CLEAN){status=K.DESTROYED_CLEAN;
this.removeDataHash(storeKey,status);this.dataHashDidChange(storeKey);return storeKey
}return NO},pushError:function(recordType,id,error,storeKey){var K=SC.Record,status,errors=this.recordErrors;
if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)}status=this.readStatus(storeKey);
if(status==K.EMPTY||status==K.ERROR||status==K.READY_CLEAN||status==K.DESTROYED_CLEAN){status=K.ERROR;
if(error&&error.isError){if(!errors){errors=this.recordErrors=[]}errors[storeKey]=error
}this.writeStatus(storeKey,status);this.dataHashDidChange(storeKey,null,YES);return storeKey
}return NO},loadQueryResults:function(query,storeKeys){if(query.get("location")===SC.Query.LOCAL){throw new Error("Cannot load query results for a local query")
}var recArray=this._findQuery(query,YES,NO);if(recArray){recArray.set("storeKeys",storeKeys)
}this.dataSourceDidFetchQuery(query);return this},dataSourceDidFetchQuery:function(query){return this._scstore_dataSourceDidFetchQuery(query,YES)
},_scstore_dataSourceDidFetchQuery:function(query,createIfNeeded){var recArray=this._findQuery(query,createIfNeeded,NO),nestedStores=this.get("nestedStores"),loc=nestedStores?nestedStores.get("length"):0;
if(recArray){recArray.storeDidFetchQuery(query)}while(--loc>=0){nestedStores[loc]._scstore_dataSourceDidFetchQuery(query,NO)
}return this},dataSourceDidCancelQuery:function(query){return this._scstore_dataSourceDidCancelQuery(query,YES)
},_scstore_dataSourceDidCancelQuery:function(query,createIfNeeded){var recArray=this._findQuery(query,createIfNeeded,NO),nestedStores=this.get("nestedStores"),loc=nestedStores?nestedStores.get("length"):0;
if(recArray){recArray.storeDidCancelQuery(query)}while(--loc>=0){nestedStores[loc]._scstore_dataSourceDidCancelQuery(query,NO)
}return this},dataSourceDidErrorQuery:function(query,error){var errors=this.queryErrors;
if(error&&error.isError){if(!errors){errors=this.queryErrors={}}errors[SC.guidFor(query)]=error
}return this._scstore_dataSourceDidErrorQuery(query,YES)},_scstore_dataSourceDidErrorQuery:function(query,createIfNeeded){var recArray=this._findQuery(query,createIfNeeded,NO),nestedStores=this.get("nestedStores"),loc=nestedStores?nestedStores.get("length"):0;
if(recArray){recArray.storeDidErrorQuery(query)}while(--loc>=0){nestedStores[loc]._scstore_dataSourceDidErrorQuery(query,NO)
}return this},init:function(){arguments.callee.base.apply(this,arguments);this.reset()
},toString:function(){var name=this.get("name");if(!name){return arguments.callee.base.apply(this,arguments)
}else{var ret=arguments.callee.base.apply(this,arguments);return"%@ (%@)".fmt(name,ret)
}},idFor:function(storeKey){return SC.Store.idFor(storeKey)},recordTypeFor:function(storeKey){return SC.Store.recordTypeFor(storeKey)
},storeKeyFor:function(recordType,primaryKey){return recordType.storeKeyFor(primaryKey)
},storeKeyExists:function(recordType,primaryKey){return recordType.storeKeyExists(primaryKey)
},storeKeysFor:function(recordType){var ret=[],isEnum=recordType&&recordType.isEnumerable,recType,storeKey,isMatch;
if(!this.statuses){return ret}for(storeKey in SC.Store.recordTypesByStoreKey){recType=SC.Store.recordTypesByStoreKey[storeKey];
if(isEnum){isMatch=recordType.contains(recType)}else{isMatch=recType===recordType
}if(isMatch&&this.statuses[storeKey]){ret.push(parseInt(storeKey,10))}}return ret
},storeKeys:function(){var ret=[],storeKey;if(!this.statuses){return ret}for(storeKey in this.statuses){if(this.statuses[storeKey]!=SC.Record.EMPTY){ret.push(parseInt(storeKey,10))
}}return ret},statusString:function(storeKey){var rec=this.materializeRecord(storeKey);
return rec.statusString()}});SC.Store.mixin({CHAIN_CONFLICT_ERROR:new Error("Nested Store Conflict"),NO_PARENT_STORE_ERROR:new Error("Parent Store Required"),NESTED_STORE_UNSUPPORTED_ERROR:new Error("Unsupported In Nested Store"),NESTED_STORE_RETRIEVE_DIRTY_ERROR:new Error("Cannot Retrieve Dirty Record in Nested Store"),EDITABLE:"editable",LOCKED:"locked",INHERITED:"inherited",idsByStoreKey:[],recordTypesByStoreKey:{},queriesByStoreKey:[],nextStoreKey:1,generateStoreKey:function(){return this.nextStoreKey++
},idFor:function(storeKey){return this.idsByStoreKey[storeKey]},queryFor:function(storeKey){return this.queriesByStoreKey[storeKey]
},recordTypeFor:function(storeKey){return this.recordTypesByStoreKey[storeKey]},replaceIdFor:function(storeKey,newId){var oldId=this.idsByStoreKey[storeKey],recordType,storeKeys;
if(oldId!==newId){recordType=this.recordTypeFor(storeKey);if(!recordType){throw new Error("replaceIdFor: storeKey %@ does not exist".fmt(storeKey))
}this.idsByStoreKey[storeKey]=newId;storeKeys=recordType.storeKeysById();delete storeKeys[oldId];
storeKeys[newId]=storeKey}return this},replaceRecordTypeFor:function(storeKey,recordType){this.recordTypesByStoreKey[storeKey]=recordType;
return this}});SC.Store.prototype.nextStoreIndex=1;SC.Store._getDefaultStore=function(){var store=this._store;
if(!store){this._store=store=SC.Store.create()}return store};SC.Store.updateRecords=function(dataHashes,dataSource,recordType,isLoaded){SC.Logger.warn("SC.Store.updateRecords() is deprecated.  Use loadRecords() instead");
var store=this._getDefaultStore(),len=dataHashes.length,idx,ret;if(!recordType){recordType=[];
for(idx=0;idx<len;idx++){recordType[idx]=dataHashes[idx].recordType}}ret=store.loadRecords(recordType,dataHashes);
len=ret.length;for(idx=0;idx<len;idx++){ret[idx]=store.materializeRecord(ret[idx])
}return ret};SC.Store.find=function(guid,recordType){return this._getDefaultStore().find(recordType,guid)
};SC.Store.findAll=function(filter,recordType){return this._getDefaultStore().findAll(filter,recordType)
};sc_require("system/store");SC.NestedStore=SC.Store.extend({hasChanges:NO,parentStore:null,isNested:YES,lockOnRead:YES,locks:null,chainedChanges:null,find:function(query){if(query&&query.isQuery&&query.get("location")!==SC.Query.LOCAL){throw"SC.Store#find() can only accept LOCAL queries in nested stores"
}return arguments.callee.base.apply(this,arguments)},commitChanges:function(force){if(this.get("hasChanges")){var pstore=this.get("parentStore");
pstore.commitChangesFromNestedStore(this,this.chainedChanges,force)}this.reset();
return this},discardChanges:function(){var records,locks;if((records=this.records)&&(locks=this.locks)){var pstore=this.get("parentStore"),psRevisions=pstore.revisions;
var revisions=this.revisions,storeKey,lock,rev;for(storeKey in records){if(!records.hasOwnProperty(storeKey)){continue
}if(!(lock=locks[storeKey])){continue}rev=psRevisions[storeKey];if((rev!==lock)||(revisions[storeKey]>rev)){this._notifyRecordPropertyChange(parseInt(storeKey,10))
}}}this.reset();this.flush();return this},destroy:function(){this.discardChanges();
var parentStore=this.get("parentStore");if(parentStore){parentStore.willDestroyNestedStore(this)
}arguments.callee.base.apply(this,arguments);return this},reset:function(){var nRecords,nr,sk;
var parentStore=this.get("parentStore");if(!parentStore){throw SC.Store.NO_PARENT_STORE_ERROR
}this.dataHashes=SC.beget(parentStore.dataHashes);this.revisions=SC.beget(parentStore.revisions);
this.statuses=SC.beget(parentStore.statuses);this.childRecords=parentStore.childRecords?SC.beget(parentStore.childRecords):{};
this.parentRecords=parentStore.parentRecords?SC.beget(parentStore.parentRecords):{};
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.set("hasChanges",NO)
},refreshQuery:function(query){var parentStore=this.get("parentStore");if(parentStore){parentStore.refreshQuery(query)
}return this},readError:function(storeKey){var parentStore=this.get("parentStore");
return parentStore?parentStore.readError(storeKey):null},readQueryError:function(query){var parentStore=this.get("parentStore");
return parentStore?parentStore.readQueryError(query):null},storeKeyEditState:function(storeKey){var editables=this.editables,locks=this.locks;
return(editables&&editables[storeKey])?SC.Store.EDITABLE:(locks&&locks[storeKey])?SC.Store.LOCKED:SC.Store.INHERITED
},_lock:function(storeKey){var locks=this.locks,rev,editables,pk,pr,path,tup,obj,key;
if(locks&&locks[storeKey]){return this}if(!locks){locks=this.locks=[]}editables=this.editables;
if(editables){editables[storeKey]=0}var pstore=this.get("parentStore"),editState;
while(pstore&&(editState=pstore.storeKeyEditState(storeKey))===SC.Store.INHERITED){pstore=pstore.get("parentStore")
}if(pstore&&editState===SC.Store.EDITABLE){pk=this.childRecords[storeKey];if(pk){this._lock(pk);
pr=this.parentRecords[pk];if(pr){path=pr[storeKey];tup=path?SC.tupleForPropertyPath(path,this.dataHashes[pk]):null;
if(tup){obj=tup[0];key=tup[1]}this.dataHashes[storeKey]=obj&&key?obj[key]:null}}else{this.dataHashes[storeKey]=SC.clone(pstore.dataHashes[storeKey],YES)
}if(!editables){editables=this.editables=[]}editables[storeKey]=1}else{this.dataHashes[storeKey]=this.dataHashes[storeKey]
}this.statuses[storeKey]=this.statuses[storeKey];rev=this.revisions[storeKey]=this.revisions[storeKey];
locks[storeKey]=rev||1;return this},readDataHash:function(storeKey){if(this.get("lockOnRead")){this._lock(storeKey)
}return this.dataHashes[storeKey]},readEditableDataHash:function(storeKey){this._lock(storeKey);
return arguments.callee.base.apply(this,arguments)},writeDataHash:function(storeKey,hash,status){var locks=this.locks,didLock=NO,rev;
if(hash){this.dataHashes[storeKey]=hash}else{this._lock(storeKey);didLock=YES}if(status){this.statuses[storeKey]=status
}else{if(!didLock){this.statuses[storeKey]=(this.statuses[storeKey]||SC.Record.READY_NEW)
}}if(!didLock){rev=this.revisions[storeKey]=this.revisions[storeKey];if(!locks){locks=this.locks=[]
}if(!locks[storeKey]){locks[storeKey]=rev||1}}var editables=this.editables;if(!editables){editables=this.editables=[]
}editables[storeKey]=1;return this},removeDataHash:function(storeKey,status){var locks=this.locks;
if(!locks){locks=this.locks=[]}if(!locks[storeKey]){locks[storeKey]=this.revisions[storeKey]||1
}return arguments.callee.base.apply(this,arguments)},dataHashDidChange:function(storeKeys,rev,statusOnly,key){if(!rev){rev=SC.Store.generateStoreKey()
}var isArray,len,idx,storeKey;isArray=SC.typeOf(storeKeys)===SC.T_ARRAY;if(isArray){len=storeKeys.length
}else{len=1;storeKey=storeKeys}var changes=this.chainedChanges;if(!changes){changes=this.chainedChanges=SC.Set.create()
}for(idx=0;idx<len;idx++){if(isArray){storeKey=storeKeys[idx]}this._lock(storeKey);
this.revisions[storeKey]=rev;changes.add(storeKey);this._notifyRecordPropertyChange(storeKey,statusOnly,key)
}this.setIfChanged("hasChanges",YES);return this},commitChangesFromNestedStore:function(nestedStore,changes,force){arguments.callee.base.apply(this,arguments);
var pstore=this.get("parentStore"),psRevisions=pstore.revisions,i;var myLocks=this.locks,myChanges=this.chainedChanges,len,storeKey;
if(!myLocks){myLocks=this.locks=[]}if(!myChanges){myChanges=this.chainedChanges=SC.Set.create()
}len=changes.length;for(i=0;i<len;i++){storeKey=changes[i];if(!myLocks[storeKey]){myLocks[storeKey]=psRevisions[storeKey]||1
}myChanges.add(storeKey)}this.setIfChanged("hasChanges",myChanges.get("length")>0);
this.flush();return this},queryFor:function(recordType,conditions,params){return this.get("parentStore").queryFor(recordType,conditions,params)
},findAll:function(recordType,conditions,params,recordArray,_store){if(!_store){_store=this
}return this.get("parentStore").findAll(recordType,conditions,params,recordArray,_store)
},retrieveRecords:function(recordTypes,ids,storeKeys,isRefresh){var pstore=this.get("parentStore"),idx,storeKey,newStatus,len=(!storeKeys)?ids.length:storeKeys.length,K=SC.Record,status;
if(isRefresh){for(idx=0;idx<len;idx++){storeKey=!storeKeys?pstore.storeKeyFor(recordTypes,ids[idx]):storeKeys[idx];
status=this.peekStatus(storeKey);if(status&K.DIRTY){throw SC.Store.NESTED_STORE_RETRIEVE_DIRTY_ERROR
}else{var dataHashes=this.dataHashes,revisions=this.revisions,statuses=this.statuses,editables=this.editables,locks=this.locks;
var changed=NO;var statusOnly=NO;if(dataHashes&&dataHashes.hasOwnProperty(storeKey)){delete dataHashes[storeKey];
changed=YES}if(revisions&&revisions.hasOwnProperty(storeKey)){delete revisions[storeKey];
changed=YES}if(editables){delete editables[storeKey]}if(locks){delete locks[storeKey]
}if(statuses&&statuses.hasOwnProperty(storeKey)){delete statuses[storeKey];if(!changed){statusOnly=YES
}changed=YES}if(changed){this._notifyRecordPropertyChange(storeKey,statusOnly)}}}}return pstore.retrieveRecords(recordTypes,ids,storeKeys,isRefresh)
},commitRecords:function(recordTypes,ids,storeKeys){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},commitRecord:function(recordType,id,storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},cancelRecords:function(recordTypes,ids,storeKeys){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},cancelRecord:function(recordType,id,storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidCancel:function(storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidComplete:function(storeKey,dataHash,newId){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidDestroy:function(storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidError:function(storeKey,error){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushRetrieve:function(recordType,id,dataHash,storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushDestroy:function(recordType,id,storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushError:function(recordType,id,error,storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
}});sc_require("core");sc_require("models/record");SC.Query=SC.Object.extend(SC.Copyable,SC.Freezable,{isQuery:YES,conditions:null,orderBy:null,recordType:null,recordTypes:null,expandedRecordTypes:function(){var ret=SC.CoreSet.create(),rt,q;
if(rt=this.get("recordType")){this._scq_expandRecordType(rt,ret)}else{if(rt=this.get("recordTypes")){rt.forEach(function(t){this._scq_expandRecordType(t,ret)
},this)}else{this._scq_expandRecordType(SC.Record,ret)}}q=SC.Query._scq_queriesWithExpandedRecordTypes;
if(!q){q=SC.Query._scq_queriesWithExpandedRecordTypes=SC.CoreSet.create()}q.add(this);
return ret.freeze()}.property("recordType","recordTypes").cacheable(),_scq_expandRecordType:function(recordType,set){if(set.contains(recordType)){return
}set.add(recordType);if(SC.typeOf(recordType)===SC.T_STRING){recordType=SC.objectForPropertyPath(recordType)
}recordType.subclasses.forEach(function(t){this._scq_expandRecordType(t,set)},this)
},parameters:null,location:"local",scope:null,isRemote:function(){return this.get("location")===SC.Query.REMOTE
}.property("location").cacheable(),isLocal:function(){return this.get("location")===SC.Query.LOCAL
}.property("location").cacheable(),isEditable:NO,contains:function(record,parameters){var rtype,ret=YES;
if(rtype=this.get("recordTypes")){ret=rtype.find(function(t){return SC.kindOf(record,t)
})}else{if(rtype=this.get("recordType")){ret=SC.kindOf(record,rtype)}}if(!ret){return NO
}var scope=this.get("scope");if(scope&&!scope.contains(record)){return NO}if(!this._isReady){this.parse()
}if(!this._isReady){return NO}if(parameters===undefined){parameters=this.parameters||this
}return this._tokenTree.evaluate(record,parameters)},containsRecordTypes:function(types){var rtype=this.get("recordType");
if(rtype){return !!types.find(function(t){return SC.kindOf(t,rtype)})}else{if(rtype=this.get("recordTypes")){return !!rtype.find(function(t){return !!types.find(function(t2){return SC.kindOf(t2,t)
})})}else{return YES}}},compare:function(record1,record2){var result=0,propertyName,order,len,i;
if(record1===record2){return 0}if(!this._isReady){this.parse()}if(!this._isReady){return SC.compare(record1.get("id"),record2.get("id"))
}order=this._order;if(SC.typeOf(order)===SC.T_FUNCTION){result=order.call(null,record1,record2)
}else{len=order?order.length:0;for(i=0;result===0&&(i<len);i++){propertyName=order[i].propertyName;
if(SC.Query.comparisons[propertyName]){result=SC.Query.comparisons[propertyName](record1.get(propertyName),record2.get(propertyName))
}else{result=SC.compare(record1.get(propertyName),record2.get(propertyName))}if((result!==0)&&order[i].descending){result=(-1)*result
}}}if(result!==0){return result}else{return SC.compare(record1.get("id"),record2.get("id"))
}},_isReady:NO,parse:function(){var conditions=this.get("conditions"),lang=this.get("queryLanguage"),tokens,tree;
tokens=this._tokenList=this.tokenizeString(conditions,lang);tree=this._tokenTree=this.buildTokenTree(tokens,lang);
this._order=this.buildOrder(this.get("orderBy"));this._isReady=!!tree&&!tree.error;
if(tree&&tree.error){throw tree.error}return this._isReady},queryWithScope:function(recordArray){var key=SC.keyFor("__query__",SC.guidFor(this)),ret=recordArray[key];
if(!ret){recordArray[key]=ret=this.copy();ret.set("scope",recordArray);ret.freeze()
}return ret},copyKeys:"conditions orderBy recordType recordTypes parameters location scope".w(),concatenatedProperties:"copyKeys".w(),copy:function(){var opts={},keys=this.get("copyKeys"),loc=keys?keys.length:0,key,value,ret;
while(--loc>=0){key=keys[loc];value=this.get(key);if(value!==undefined){opts[key]=value
}}ret=this.constructor.create(opts);opts=null;return ret},queryLanguage:{UNKNOWN:{firstCharacter:/[^\s'"\w\d\(\)\{\}]/,notAllowed:/[\s'"\w\d\(\)\{\}]/},PROPERTY:{firstCharacter:/[a-zA-Z_]/,notAllowed:/[^a-zA-Z_0-9]/,evalType:"PRIMITIVE",evaluate:function(r,w){return r.get(this.tokenValue)
}},NUMBER:{firstCharacter:/[\d\-]/,notAllowed:/[^\d\-\.]/,format:/^-?\d+$|^-?\d+\.\d+$/,evalType:"PRIMITIVE",evaluate:function(r,w){return parseFloat(this.tokenValue)
}},STRING:{firstCharacter:/['"]/,delimeted:true,evalType:"PRIMITIVE",evaluate:function(r,w){return this.tokenValue
}},PARAMETER:{firstCharacter:/\{/,lastCharacter:"}",delimeted:true,evalType:"PRIMITIVE",evaluate:function(r,w){return w[this.tokenValue]
}},"%@":{rememberCount:true,reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return w[this.tokenValue]
}},OPEN_PAREN:{firstCharacter:/\(/,singleCharacter:true},CLOSE_PAREN:{firstCharacter:/\)/,singleCharacter:true},AND:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return left&&right}},OR:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return left||right}},NOT:{reservedWord:true,rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(r,w){var right=this.rightSide.evaluate(r,w);
return !right}},"=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return SC.isEqual(left,right)}},"!=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return !SC.isEqual(left,right)}},"<":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return SC.compare(left,right)==-1}},"<=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return SC.compare(left,right)!=1}},">":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return SC.compare(left,right)==1}},">=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return SC.compare(left,right)!=-1}},BEGINS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var all=this.leftSide.evaluate(r,w);
var start=this.rightSide.evaluate(r,w);return(all&&all.indexOf(start)===0)}},ENDS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var all=this.leftSide.evaluate(r,w);
var end=this.rightSide.evaluate(r,w);return(all&&all.indexOf(end)===(all.length-end.length))
}},CONTAINS:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var all=this.leftSide.evaluate(r,w)||[];
var value=this.rightSide.evaluate(r,w);var allType=SC.typeOf(all);if(allType===SC.T_STRING){return(all.indexOf(value)!==-1)
}else{if(allType===SC.T_ARRAY||all.toArray){if(allType!==SC.T_ARRAY){all=all.toArray()
}var found=false;var i=0;while(found===false&&i<all.length){if(value==all[i]){found=true
}i++}return found}}}},ANY:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var prop=this.leftSide.evaluate(r,w);
var values=this.rightSide.evaluate(r,w);var found=false;var i=0;while(found===false&&i<values.length){if(prop==values[i]){found=true
}i++}return found}},MATCHES:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var toMatch=this.leftSide.evaluate(r,w);
var matchWith=this.rightSide.evaluate(r,w);return matchWith.test(toMatch)}},TYPE_IS:{reservedWord:true,rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var actualType=SC.Store.recordTypeFor(r.storeKey);
var right=this.rightSide.evaluate(r,w);var expectType=SC.objectForPropertyPath(right);
return actualType==expectType}},"null":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return null
}},"undefined":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return undefined
}},"false":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return false
}},"true":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return true
}},YES:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return true
}},NO:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return false
}}},tokenizeString:function(inputString,grammar){var tokenList=[],c=null,t=null,token=null,tokenType=null,currentToken=null,currentTokenType=null,currentTokenValue=null,currentDelimeter=null,endOfString=false,endOfToken=false,belongsToToken=false,skipThisCharacter=false,rememberCount={};
function addToken(tokenType,tokenValue){t=grammar[tokenType];if(t.format&&!t.format.test(tokenValue)){tokenType="UNKNOWN"
}if(t.delimeted){skipThisCharacter=true}if(!t.delimeted){for(var anotherToken in grammar){if(grammar[anotherToken].reservedWord&&anotherToken==tokenValue){tokenType=anotherToken
}}}t=grammar[tokenType];if(t&&t.rememberCount){if(!rememberCount[tokenType]){rememberCount[tokenType]=0
}tokenValue=rememberCount[tokenType];rememberCount[tokenType]+=1}tokenList.push({tokenType:tokenType,tokenValue:tokenValue});
currentToken=null;currentTokenType=null;currentTokenValue=null}if(!inputString){return[]
}var iStLength=inputString.length;for(var i=0;i<iStLength;i++){endOfString=(i===iStLength-1);
c=inputString.charAt(i);skipThisCharacter=false;if(currentToken){t=grammar[currentToken];
endOfToken=t.delimeted?c===currentDelimeter:t.notAllowed.test(c);if(!endOfToken){currentTokenValue+=c
}if(endOfToken||endOfString){addToken(currentToken,currentTokenValue)}if(endOfString&&!endOfToken){skipThisCharacter=true
}}if(!currentToken&&!skipThisCharacter){for(token in grammar){t=grammar[token];if(t.firstCharacter&&t.firstCharacter.test(c)){currentToken=token
}}if(currentToken){t=grammar[currentToken];currentTokenValue=c;if(t.delimeted){currentTokenValue="";
if(t.lastCharacter){currentDelimeter=t.lastCharacter}else{currentDelimeter=c}}if(t.singleCharacter||endOfString){addToken(currentToken,currentTokenValue)
}}}}return tokenList},buildTokenTree:function(tokenList,treeLogic){var l=tokenList.slice();
var i=0;var openParenthesisStack=[];var shouldCheckAgain=false;var error=[];if(!tokenList||tokenList.length===0){return{evaluate:function(){return true
}}}function tokenLogic(position){var p=position;if(p<0){return false}var tl=treeLogic[l[p].tokenType];
if(!tl){error.push("logic for token '"+l[p].tokenType+"' is not defined");return false
}l[p].evaluate=tl.evaluate;return tl}function expectedType(side,position){var p=position;
var tl=tokenLogic(p);if(!tl){return false}if(side=="left"){return tl.leftType}if(side=="right"){return tl.rightType
}}function evalType(position){var p=position;var tl=tokenLogic(p);if(!tl){return false
}else{return tl.evalType}}function removeToken(position){l.splice(position,1);if(position<=i){i--
}}function preceedingTokenExists(position){var p=position||i;if(p>0){return true}else{return false
}}function tokenIsMissingChilds(position){var p=position;if(p<0){return true}return(expectedType("left",p)&&!l[p].leftSide)||(expectedType("right",p)&&!l[p].rightSide)
}function typesAreMatching(parent,child){var side=(child<parent)?"left":"right";if(parent<0||child<0){return false
}if(!expectedType(side,parent)){return false}if(!evalType(child)){return false}if(expectedType(side,parent)==evalType(child)){return true
}else{return false}}function preceedingTokenCanBeMadeChild(position){var p=position;
if(!tokenIsMissingChilds(p)){return false}if(!preceedingTokenExists(p)){return false
}if(typesAreMatching(p,p-1)){return true}else{return false}}function preceedingTokenCanBeMadeParent(position){var p=position;
if(tokenIsMissingChilds(p)){return false}if(!preceedingTokenExists(p)){return false
}if(!tokenIsMissingChilds(p-1)){return false}if(typesAreMatching(p-1,p)){return true
}else{return false}}function makeChild(position){var p=position;if(p<1){return false
}l[p].leftSide=l[p-1];removeToken(p-1)}function makeParent(position){var p=position;
if(p<1){return false}l[p-1].rightSide=l[p];removeToken(p)}function removeParenthesesPair(position){removeToken(position);
removeToken(openParenthesisStack.pop())}for(i=0;i<l.length;i++){shouldCheckAgain=false;
if(l[i].tokenType=="UNKNOWN"){error.push("found unknown token: "+l[i].tokenValue)
}if(l[i].tokenType=="OPEN_PAREN"){openParenthesisStack.push(i)}if(l[i].tokenType=="CLOSE_PAREN"){removeParenthesesPair(i)
}if(preceedingTokenCanBeMadeChild(i)){makeChild(i)}if(preceedingTokenCanBeMadeParent(i)){makeParent(i);
shouldCheckAgain=true}if(shouldCheckAgain){i--}}if(l.length==1){l=l[0]}else{error.push("string did not resolve to a single tree")
}if(error.length>0){return{error:error.join(",\n"),tree:l}}else{return l}},buildOrder:function(orderOp){if(!orderOp){return[]
}else{if(SC.typeOf(orderOp)===SC.T_FUNCTION){return orderOp}else{var o=orderOp.split(",");
for(var i=0;i<o.length;i++){var p=o[i];p=p.replace(/^\s+|\s+$/,"");p=p.replace(/\s+/,",");
p=p.split(",");o[i]={propertyName:p[0]};if(p[1]&&p[1]=="DESC"){o[i].descending=true
}}return o}}}});SC.Query.mixin({LOCAL:"local",REMOTE:"remote",storeKeyFor:function(query){return query?query.get("storeKey"):null
},containsRecords:function(query,records,store){var ret=[];for(var idx=0,len=records.get("length");
idx<len;idx++){var record=records.objectAt(idx);if(record&&query.contains(record)){ret.push(record.get("storeKey"))
}}ret=SC.Query.orderStoreKeys(ret,query,store);return ret},orderStoreKeys:function(storeKeys,query,store){if(storeKeys){var K=SC.Query,tempStores=K._TMP_STORES,tempQueries=K._TMP_QUERIES;
if(!tempStores){tempStores=K._TMP_STORES=[]}if(!tempQueries){tempQueries=K._TMP_QUERIES=[]
}tempStores.push(store);tempQueries.push(query);var res=storeKeys.sort(SC.Query.compareStoreKeys);
K._TMP_STORES.pop();K._TMP_QUERIES.pop()}return storeKeys},compareStoreKeys:function(storeKey1,storeKey2){var K=SC.Query,tempStores=K._TMP_STORES,tempQueries=K._TMP_QUERIES,store=tempStores[tempStores.length-1],query=tempQueries[tempQueries.length-1],compareFunc=query.compare,record1=store.materializeRecord(storeKey1),record2=store.materializeRecord(storeKey2);
if(compareFunc!==K.prototype.compare){return compareFunc.call(query,record1,record2)
}else{var result=0,propertyName,order,len,i;if(record1===record2){return 0}if(!query._isReady){query.parse()
}if(!query._isReady){return SC.compare(record1.get("id"),record2.get("id"))}order=query._order;
if(SC.typeOf(order)===SC.T_FUNCTION){result=order.call(null,record1,record2)}else{len=order?order.length:0;
for(i=0;result===0&&(i<len);i++){propertyName=order[i].propertyName;if(SC.Query.comparisons[propertyName]){result=SC.Query.comparisons[propertyName](record1.get(propertyName),record2.get(propertyName))
}else{result=SC.compare(record1.get(propertyName),record2.get(propertyName))}if((result!==0)&&order[i].descending){result=(-1)*result
}}}if(result!==0){return result}else{return SC.compare(record1.get("id"),record2.get("id"))
}}},build:function(location,recordType,conditions,params){var opts=null,ret,cache,key,tmp;
if(recordType&&recordType.isQuery){if(recordType.get("location")===location){return recordType
}else{return recordType.copy().set("location",location).freeze()}}if(typeof recordType===SC.T_STRING){ret=SC.objectForPropertyPath(recordType);
if(!ret){throw"%@ did not resolve to a class".fmt(recordType)}recordType=ret}else{if(recordType&&recordType.isEnumerable){ret=[];
recordType.forEach(function(t){if(typeof t===SC.T_STRING){t=SC.objectForPropertyPath(t)
}if(!t){throw"cannot resolve record types: %@".fmt(recordType)}ret.push(t)},this);
recordType=ret}else{if(!recordType){recordType=SC.Record}}}if(params===undefined){params=null
}if(conditions===undefined){conditions=null}if(!params&&(typeof conditions!==SC.T_STRING)){opts=conditions;
conditions=null}if(!params&&!opts){tmp=SC.Query._scq_recordTypeCache;if(!tmp){tmp=SC.Query._scq_recordTypeCache={}
}cache=tmp[location];if(!cache){cache=tmp[location]={}}if(recordType.isEnumerable){key=recordType.map(function(k){return SC.guidFor(k)
});key=key.sort().join(":")}else{key=SC.guidFor(recordType)}if(conditions){key=[key,conditions].join("::")
}ret=cache[key];if(!ret){if(recordType.isEnumerable){opts={recordTypes:recordType.copy()}
}else{opts={recordType:recordType}}opts.location=location;opts.conditions=conditions;
ret=cache[key]=SC.Query.create(opts).freeze()}}else{if(!opts){opts={}}if(!opts.location){opts.location=location
}if(recordType&&recordType.isEnumerable){opts.recordsTypes=recordType}else{opts.recordType=recordType
}if(conditions){opts.conditions=conditions}if(params){opts.parameters=params}ret=SC.Query.create(opts).freeze()
}return ret},local:function(recordType,conditions,params){return this.build(SC.Query.LOCAL,recordType,conditions,params)
},remote:function(recordType,conditions,params){return this.build(SC.Query.REMOTE,recordType,conditions,params)
},_scq_didDefineRecordType:function(){var q=SC.Query._scq_queriesWithExpandedRecordTypes;
if(q){q.forEach(function(query){query.notifyPropertyChange("expandedRecordTypes")
},this);q.clear()}}});SC.Query.comparisons={};SC.Query.registerComparison=function(propertyName,comparison){SC.Query.comparisons[propertyName]=comparison
};SC.Query.registerQueryExtension=function(tokenName,token){SC.Query.prototype.queryLanguage[tokenName]=token
};SC.Q=SC.Query.from;sc_require("models/record");SC.RecordArray=SC.Object.extend(SC.Enumerable,SC.Array,{store:null,query:null,storeKeys:null,status:SC.Record.EMPTY,isEditable:function(){var query=this.get("query");
return query?query.get("isEditable"):NO}.property("query").cacheable(),length:function(){this.flush();
var storeKeys=this.get("storeKeys");return storeKeys?storeKeys.get("length"):0}.property("storeKeys").cacheable(),_scra_records:null,objectAt:function(idx){this.flush();
var recs=this._scra_records,storeKeys=this.get("storeKeys"),store=this.get("store"),storeKey,ret;
if(!storeKeys||!store){return undefined}if(recs&&(ret=recs[idx])){return ret}if(!recs){this._scra_records=recs=[]
}storeKey=storeKeys.objectAt(idx);if(storeKey){if(store.peekStatus(storeKey)===SC.Record.EMPTY){store.retrieveRecord(null,null,storeKey)
}recs[idx]=ret=store.materializeRecord(storeKey)}return ret},forEach:function(callback,target){this.flush();
var recs=this._scra_records,storeKeys=this.get("storeKeys"),store=this.get("store"),len=storeKeys?storeKeys.get("length"):0,idx,storeKey,rec;
if(!storeKeys||!store){return this}if(!recs){recs=this._scra_records=[]}if(!target){target=this
}for(idx=0;idx<len;idx++){rec=recs[idx];if(!rec){rec=recs[idx]=store.materializeRecord(storeKeys.objectAt(idx))
}callback.call(target,rec,idx,this)}return this},replace:function(idx,amt,recs){this.flush();
var storeKeys=this.get("storeKeys"),len=recs?(recs.get?recs.get("length"):recs.length):0,i,keys;
if(!storeKeys){throw"storeKeys required"}var query=this.get("query");if(query&&!query.get("isEditable")){throw SC.RecordArray.NOT_EDITABLE
}keys=[];for(i=0;i<len;i++){keys[i]=recs.objectAt(i).get("storeKey")}storeKeys.replace(idx,amt,keys);
return this},contains:function(record){return this.indexOf(record)>=0},indexOf:function(record,startAt){if(!SC.kindOf(record,SC.Record)){SC.Logger.warn("Using indexOf on %@ with an object that is not an SC.Record".fmt(record));
return -1}this.flush();var storeKey=record.get("storeKey"),storeKeys=this.get("storeKeys");
return storeKeys?storeKeys.indexOf(storeKey,startAt):-1},lastIndexOf:function(record,startAt){if(!SC.kindOf(record,SC.Record)){SC.Logger.warn("Using lastIndexOf on %@ with an object that is not an SC.Record".fmt(record));
return -1}this.flush();var storeKey=record.get("storeKey"),storeKeys=this.get("storeKeys");
return storeKeys?storeKeys.lastIndexOf(storeKey,startAt):-1},add:function(record){if(!SC.kindOf(record,SC.Record)){return this
}if(this.indexOf(record)<0){this.pushObject(record)}return this},remove:function(record){if(!SC.kindOf(record,SC.Record)){return this
}this.removeObject(record);return this},find:function(query,target){if(query&&query.isQuery){return this.get("store").find(query.queryWithScope(this))
}else{return arguments.callee.base.apply(this,arguments)}},refresh:function(){this.get("store").refreshQuery(this.get("query"));
return this},reload:function(){this.flush(YES);return this},destroy:function(){if(!this.get("isDestroyed")){this.get("store").recordArrayWillDestroy(this)
}arguments.callee.base.apply(this,arguments)},storeWillFetchQuery:function(query){var status=this.get("status"),K=SC.Record;
if((status===K.EMPTY)||(status===K.ERROR)){status=K.BUSY_LOADING}if(status&K.READY){status=K.BUSY_REFRESH
}this.setIfChanged("status",status);return this},storeDidFetchQuery:function(query){this.setIfChanged("status",SC.Record.READY_CLEAN);
return this},storeDidCancelQuery:function(query){var status=this.get("status"),K=SC.Record;
if(status===K.BUSY_LOADING){status=K.EMPTY}else{if(status===K.BUSY_REFRESH){status=K.READY_CLEAN
}}this.setIfChanged("status",status);return this},storeDidErrorQuery:function(query){this.setIfChanged("status",SC.Record.ERROR);
return this},storeDidChangeStoreKeys:function(storeKeys,recordTypes){var query=this.get("query");
if(query.get("location")!==SC.Query.LOCAL){return this}if(!query.containsRecordTypes(recordTypes)){return this
}var changed=this._scq_changedStoreKeys;if(!changed){changed=this._scq_changedStoreKeys=SC.IndexSet.create()
}changed.addEach(storeKeys);this.set("needsFlush",YES);this.enumerableContentDidChange();
return this},flush:function(_flush){if(this._insideFlush){this.set("needsFlush",YES);
return this}if(!this.get("needsFlush")&&!_flush){return this}this.set("needsFlush",NO);
var query=this.get("query"),store=this.get("store");if(!store||!query||query.get("location")!==SC.Query.LOCAL){return this
}this._insideFlush=YES;var storeKeys=this.get("storeKeys"),changed=this._scq_changedStoreKeys,didChange=NO,K=SC.Record,storeKeysToPace=[],startDate=new Date(),rec,status,recordType,sourceKeys,scope,included;
var oldStoreKeys=storeKeys;if(storeKeys&&!_flush){if(changed){changed.forEach(function(storeKey){if(storeKeysToPace.length>0||new Date()-startDate>SC.RecordArray.QUERY_MATCHING_THRESHOLD){storeKeysToPace.push(storeKey);
return}status=store.peekStatus(storeKey);if(!(status&K.EMPTY)&&!((status&K.DESTROYED)||(status===K.BUSY_DESTROYING))){rec=store.materializeRecord(storeKey);
included=!!(rec&&query.contains(rec))}else{included=NO}if(included){if(storeKeys.indexOf(storeKey)<0){if(!didChange){storeKeys=storeKeys.copy()
}storeKeys.pushObject(storeKey)}}else{if(storeKeys.indexOf(storeKey)>=0){if(!didChange){storeKeys=storeKeys.copy()
}storeKeys.removeObject(storeKey)}}},this);didChange=YES}}else{if(scope=query.get("scope")){sourceKeys=scope.flush().get("storeKeys")
}else{if(recordType=query.get("expandedRecordTypes")){sourceKeys=SC.IndexSet.create();
recordType.forEach(function(cur){sourceKeys.addEach(store.storeKeysFor(recordType))
})}}storeKeys=[];sourceKeys.forEach(function(storeKey){if(storeKeysToPace.length>0||new Date()-startDate>SC.RecordArray.QUERY_MATCHING_THRESHOLD){storeKeysToPace.push(storeKey);
return}status=store.peekStatus(storeKey);if(!(status&K.EMPTY)&&!((status&K.DESTROYED)||(status===K.BUSY_DESTROYING))){rec=store.materializeRecord(storeKey);
if(rec&&query.contains(rec)){storeKeys.push(storeKey)}}});didChange=YES}if(storeKeysToPace.length>0){var self=this;
window.setTimeout(function(){SC.run(function(){if(!self||self.get("isDestroyed")){return
}self.set("needsFlush",YES);self._scq_changedStoreKeys=SC.IndexSet.create().addEach(storeKeysToPace);
self.flush()})},1)}if(changed){changed.clear()}if(didChange){if(storeKeys&&(storeKeys===oldStoreKeys)){storeKeys=storeKeys.copy()
}storeKeys=SC.Query.orderStoreKeys(storeKeys,query,store);if(SC.compare(oldStoreKeys,storeKeys)!==0){this.set("storeKeys",SC.clone(storeKeys))
}}this._insideFlush=NO;return this},needsFlush:YES,isError:function(){return this.get("status")&SC.Record.ERROR
}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var store=this.get("store");
return store.readQueryError(this.get("query"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),_storeKeysDidChange:function(){var storeKeys=this.get("storeKeys");
var prev=this._prevStoreKeys,f=this._storeKeysContentDidChange,fs=this._storeKeysStateDidChange;
if(storeKeys===prev){return}if(prev){prev.removeObserver("[]",this,f)}this._prevStoreKeys=storeKeys;
if(storeKeys){storeKeys.addObserver("[]",this,f)}var rev=(storeKeys)?storeKeys.propertyRevision:-1;
this._storeKeysContentDidChange(storeKeys,"[]",storeKeys,rev)}.observes("storeKeys"),_storeKeysContentDidChange:function(target,key,value,rev){if(this._scra_records){this._scra_records.length=0
}this.beginPropertyChanges().notifyPropertyChange("length").enumerableContentDidChange().endPropertyChanges()
},init:function(){arguments.callee.base.apply(this,arguments);this._storeKeysDidChange()
}});SC.RecordArray.mixin({NOT_EDITABLE:SC.Error.desc("SC.RecordArray is not editable"),QUERY_MATCHING_THRESHOLD:100});