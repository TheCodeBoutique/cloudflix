if(!window.require){window.require=function require(){}}if(!window.sc_require){window.sc_require=require
}if(!window.sc_resource){window.sc_resource=function sc_resource(){}}sc_require("license");
window.YES=true;window.NO=false;if(typeof console==="undefined"){window.console={};
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
}}};