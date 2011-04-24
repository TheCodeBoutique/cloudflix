window.SC=window.SC||{};SC._mapDisplayNamesUseHashForSeenTypes=["object","number","boolean","array","string","function","class","undefined","error"];
SC.mapDisplayNames=function(obj,level,path,seenHash,seenArray){if(!SC.browser.webkit){return
}if(!SC._mapDisplayNamesUseHashForSeenTypesHash){var types=SC._mapDisplayNamesUseHashForSeenTypes;
var typesHash={};var len=types.length;for(var i=0;i<len;++i){var type=types[i];typesHash[type]=true
}SC._mapDisplayNamesUseHashForSeenTypesHash=typesHash}if(obj===undefined){obj=window
}if(level===undefined){level=0}if(path===undefined){path=[]}if(seenHash===undefined){seenHash={}
}if(seenArray===undefined){seenArray=[]}if(level>5){return}var useHash=!!SC._mapDisplayNamesUseHashForSeenTypesHash[SC.typeOf(obj)];
var hash;var arrayToCheck;if(useHash){hash=SC.hashFor(obj);arrayToCheck=seenHash[hash]
}else{arrayToCheck=seenArray}if(arrayToCheck&&arrayToCheck.indexOf(obj)!==-1){return
}if(arrayToCheck){arrayToCheck.push(obj)}else{if(useHash){seenHash[hash]=[obj]}}var loc=path.length,str,val,t;
path[loc]="";for(var key in obj){if(obj.hasOwnProperty&&!obj.hasOwnProperty(key)){continue
}if(!isNaN(Number(key))){continue}if(key==="constructor"){continue}if(key==="superclass"){continue
}if(key==="document"){continue}if(obj.type&&obj.type==="file"){if(key==="selectionStart"||key==="selectionEnd"){continue
}}try{val=obj[key]}catch(e){continue}if(key==="SproutCore"){key="SC"}t=SC.typeOf(val);
if(t===SC.T_FUNCTION){if(!val.displayName){path[loc]=key;str=path.join(".").replace(".prototype.","#");
val.displayName=str}if(val.prototype){path.push("prototype");SC.mapDisplayNames(val.prototype,level+1,path,seenHash,seenArray);
path.pop()}}else{if(t===SC.T_CLASS){path[loc]=key;SC.mapDisplayNames(val,level+1,path,seenHash,seenArray)
}else{if((key.indexOf("_")!==0)&&(t===SC.T_OBJECT||t===SC.T_HASH)){path[loc]=key;
SC.mapDisplayNames(val,level+1,path,seenHash,seenArray)}}}}path.pop()};window.SC=window.SC||{};
if(!SC.LOG_RUNLOOP_INVOCATIONS){SC.LOG_RUNLOOP_INVOCATIONS=false}SC.addInvokeOnceLastDebuggingInfo=function(){return;
SC.ObserverSet.add=function(target,method,context,originatingTarget,originatingMethod,originatingStack){var targetGuid=(target)?SC.guidFor(target):"__this__";
var methods=this[targetGuid];if(!methods){methods=this[targetGuid]=SC.CoreSet.create();
methods.target=target;methods.isTargetSet=YES;this.targets++}methods.add(method);
if(context!==undefined){var contexts=methods.contexts||(methods.contexts={});contexts[SC.guidFor(method)]=context
}if(originatingMethod!==undefined){var originatingTargets=methods.originatingTargets;
var originatingMethods=methods.originatingMethods;var originatingStacks=methods.originatingStacks;
if(!originatingTargets){originatingTargets=methods.originatingTargets={}}if(!originatingMethods){originatingMethods=methods.originatingMethods={}
}if(!originatingStacks){originatingStacks=methods.originatingStacks={}}var key=SC.guidFor(method);
var existingMethod=originatingMethods[key];if(existingMethod&&SC.typeOf(existingMethod)!==SC.T_ARRAY){var existingTarget=originatingTargets[key];
var existingStack=originatingStacks[key];originatingTargets[key]=[existingTarget,originatingTarget];
originatingMethods[key]=[existingMethod,originatingMethod];originatingStacks[key]=[existingStack,originatingStack]
}else{originatingTargets[key]=originatingTarget;originatingMethods[key]=originatingMethod;
originatingStacks[key]=originatingStack}}};SC.ObserverSet.invokeMethods=function(){for(var key in this){if(!this.hasOwnProperty(key)){continue
}var value=this[key];if(value&&value.isTargetSet){var idx=value.length;var target=value.target;
var m,log=SC.LOG_RUNLOOP_INVOCATIONS;while(--idx>=0){m=value[idx];if(log){var mName=m.displayName||m;
var originatingKey=SC.guidFor(m),originatingTargets=value.originatingTargets;if(!originatingTargets){SC.Logger.log("Invoking runloop-scheduled method %@ on %@, but we didn’t capture information about who scheduled it…".fmt(mName,target))
}else{originatingTargets=originatingTargets[originatingKey];var originatingMethods=value.originatingMethods[originatingKey];
var originatingStacks=value.originatingStacks[originatingKey];if(originatingMethods&&SC.typeOf(originatingMethods)===SC.T_ARRAY){SC.Logger.log("Invoking runloop-scheduled method %@ on %@, which was scheduled by multiple target/method pairs:".fmt(mName,target));
var i,len,originatingTarget,originatingMethod,originatingStack;for(i=0,len=originatingMethods.length;
i<len;++i){originatingTarget=originatingTargets[i];originatingMethod=originatingMethods[i];
originatingMethod=originatingMethod.displayName||originatingMethod;originatingStack=originatingStacks[i];
SC.Logger.log("[%@]  originated by target %@,  method %@,  stack:".fmt(i,originatingTarget,originatingMethod),originatingStack)
}}else{var originatingMethodName=originatingMethods.displayName||originatingMethods;
SC.Logger.log("Invoking runloop-scheduled method %@ on %@.  Originated by target %@,  method %@,  stack: ".fmt(mName,target,originatingTargets,originatingMethodName),originatingStacks)
}}}m.call(target)}}}};SC.Object.prototype.invokeOnce=function(method){var originatingTarget=this;
if(SC.LOG_RUNLOOP_INVOCATIONS){originatingStack=SC.getRecentStack();originatingMethod=originatingStack[0]
}else{originatingStack=null;originatingMethod=arguments.callee.caller}SC.RunLoop.currentRunLoop.invokeOnce(this,method,originatingTarget,originatingMethod,originatingStack);
return this};SC.Object.prototype.invokeLast=function(method){var originatingTarget=this;
var originatingStack,originatingMethod;if(SC.LOG_RUNLOOP_INVOCATIONS){originatingStack=SC.getRecentStack();
originatingMethod=originatingStack[0]}else{originatingStack=null;originatingMethod=arguments.callee.caller
}SC.RunLoop.currentRunLoop.invokeLast(this,method,originatingTarget,originatingMethod,originatingStack);
return this};SC.RunLoop.prototype.invokeOnce=function(target,method,originatingTarget,originatingMethod,originatingStack){if(!originatingTarget){originatingTarget=null
}if(!originatingMethod){if(SC.LOG_RUNLOOP_INVOCATIONS){originatingStack=SC.getRecentStack();
originatingMethod=originatingStack[0]}else{originatingStack=null;originatingMethod=arguments.callee.caller
}}if(method===undefined){method=target;target=this}if(SC.typeOf(method)===SC.T_STRING){method=target[method]
}if(!this._invokeQueue){this._invokeQueue=SC.ObserverSet.create()}this._invokeQueue.add(target,method,null,originatingTarget,originatingMethod,originatingStack);
return this};SC.RunLoop.prototype.invokeLast=function(target,method,originatingTarget,originatingMethod,originatingStack){if(!originatingTarget){originatingTarget=null
}if(!originatingMethod){if(SC.LOG_RUNLOOP_INVOCATIONS){originatingStack=SC.getRecentStack();
originatingMethod=originatingStack[0]}else{originatingStack=null;originatingMethod=arguments.callee.caller
}}if(method===undefined){method=target;target=this}if(SC.typeOf(method)===SC.T_STRING){method=target[method]
}if(!this._invokeLastQueue){this._invokeLastQueue=SC.ObserverSet.create()}this._invokeLastQueue.add(target,method,null,originatingTarget,originatingMethod,originatingStack);
return this};SC.getRecentStack=function(){var currentFunction=arguments.callee.caller,i=0,stack={},first=YES,functionName;
while(currentFunction&&i<6){if(first){first=NO}else{functionName=currentFunction.displayName||currentFunction.toString();
stack[i++]=functionName}currentFunction=currentFunction.caller}return stack}};