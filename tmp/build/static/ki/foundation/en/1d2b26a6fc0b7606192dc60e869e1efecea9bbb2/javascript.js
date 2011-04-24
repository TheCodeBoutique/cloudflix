window.Ki=window.Ki||SC.Object.create();window.KI=window.KI||window.Ki;Ki.State=SC.Object.extend({name:null,parentState:null,historyState:null,initialSubstate:null,substatesAreConcurrent:NO,substates:null,statechart:null,stateIsInitialized:NO,currentSubstates:null,enteredSubstates:null,trace:function(){var key=this.getPath("statechart.statechartTraceKey");
return this.getPath("statechart.%@".fmt(key))}.property().cacheable(),owner:function(){var sc=this.get("statechart"),key=sc?sc.get("statechartOwnerKey"):null,owner=sc?sc.get(key):null;
return owner?owner:sc}.property().cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this._registeredEventHandlers={};this._registeredStringEventHandlers={};this._registeredRegExpEventHandlers=[];
this._registeredStateObserveHandlers={};var sc=this.get("statechart"),ownerKey=sc?sc.get("statechartOwnerKey"):null,traceKey=sc?sc.get("statechartTraceKey"):null;
if(sc){sc.addObserver(ownerKey,this,"_statechartOwnerDidChange");sc.addObserver(traceKey,this,"_statechartTraceDidChange")
}},destroy:function(){var sc=this.get("statechart"),ownerKey=sc?sc.get("statechartOwnerKey"):null,traceKey=sc?sc.get("statechartTraceKey"):null;
if(sc){sc.removeObserver(ownerKey,this,"_statechartOwnerDidChange");sc.removeObserver(traceKey,this,"_statechartTraceDidChange")
}var substates=this.get("substates");if(substates){substates.forEach(function(state){state.destroy()
})}this._teardownAllStateObserveHandlers();this.set("substates",null);this.set("currentSubstates",null);
this.set("enteredSubstates",null);this.set("parentState",null);this.set("historyState",null);
this.set("initialSubstate",null);this.set("statechart",null);this.notifyPropertyChange("trace");
this.notifyPropertyChange("owner");this._registeredEventHandlers=null;this._registeredStringEventHandlers=null;
this._registeredRegExpEventHandlers=null;this._registeredStateObserveHandlers=null;
arguments.callee.base.apply(this,arguments)},initState:function(){if(this.get("stateIsInitialized")){return
}this._registerWithParentStates();var key=null,value=null,state=null,substates=[],matchedInitialSubstate=NO,initialSubstate=this.get("initialSubstate"),substatesAreConcurrent=this.get("substatesAreConcurrent"),statechart=this.get("statechart"),i=0,len=0,valueIsFunc=NO,historyState=null;
if(SC.kindOf(initialSubstate,Ki.HistoryState)&&initialSubstate.isClass){historyState=this.createHistoryState(initialSubstate,{parentState:this,statechart:statechart});
this.set("initialSubstate",historyState);if(SC.none(historyState.get("defaultState"))){this.stateLogError("Initial substate is invalid. History state requires the name of a default state to be set");
this.set("initialSubstate",null);historyState=null}}for(key in this){value=this[key];
valueIsFunc=SC.typeOf(value)===SC.T_FUNCTION;if(valueIsFunc&&value.isEventHandler){this._registerEventHandler(key,value);
continue}if(valueIsFunc&&value.isStateObserveHandler){this._registerStateObserveHandler(key,value);
continue}if(valueIsFunc&&value.statePlugin){value=value.apply(this)}if(SC.kindOf(value,Ki.State)&&value.isClass&&this[key]!==this.constructor){state=this.createSubstate(value,{name:key,parentState:this,statechart:statechart});
substates.push(state);this[key]=state;state.initState();if(key===initialSubstate){this.set("initialSubstate",state);
matchedInitialSubstate=YES}else{if(historyState&&historyState.get("defaultState")===key){historyState.set("defaultState",state);
matchedInitialSubstate=YES}}}}if(!SC.none(initialSubstate)&&!matchedInitialSubstate){this.stateLogError("Unable to set initial substate %@ since it did not match any of state's %@ substates".fmt(initialSubstate,this))
}if(substates.length===0){if(!SC.none(initialSubstate)){this.stateLogWarning("Unable to make %@ an initial substate since state %@ has no substates".fmt(initialSubstate,this))
}}else{if(substates.length>0){if(SC.none(initialSubstate)&&!substatesAreConcurrent){state=this.createEmptyState({parentState:this,statechart:statechart});
this.set("initialSubstate",state);substates.push(state);this[state.get("name")]=state;
state.initState();this.stateLogWarning("state %@ has no initial substate defined. Will default to using an empty state as initial substate".fmt(this))
}else{if(!SC.none(initialSubstate)&&substatesAreConcurrent){this.set("initialSubstate",null);
this.stateLogWarning("Can not use %@ as initial substate since substates are all concurrent for state %@".fmt(initialSubstate,this))
}}}}this.set("substates",substates);this.set("currentSubstates",[]);this.set("enteredSubstates",[]);
this.set("stateIsInitialized",YES)},createSubstate:function(state,attrs){return state.create(attrs)
},createHistoryState:function(state,attrs){return state.create(attrs)},createEmptyState:function(attrs){return Ki.EmptyState.create(attrs)
},_registerEventHandler:function(name,handler){var events=handler.events,event=null,len=events.length,i=0;
this._registeredEventHandlers[name]=handler;for(;i<len;i+=1){event=events[i];if(SC.typeOf(event)===SC.T_STRING){this._registeredStringEventHandlers[event]={name:name,handler:handler};
continue}if(event instanceof RegExp){this._registeredRegExpEventHandlers.push({name:name,handler:handler,regexp:event});
continue}this.stateLogError("Invalid event %@ for event handler %@ in state %@".fmt(event,name,this))
}},_registerStateObserveHandler:function(name,handler){var i=0,args=handler.args,len=args.length,arg,validHandlers=YES;
for(;i<len;i+=1){arg=args[i];if(SC.typeOf(arg)!==SC.T_STRING||SC.empty(arg)){this.stateLogError("Invalid argument %@ for state observe handler %@ in state %@".fmt(arg,name,this));
validHandlers=NO}}if(!validHandlers){return}this._registeredStateObserveHandlers[name]=handler.args
},_registerWithParentStates:function(){this._registerSubstate(this);var parent=this.get("parentState");
while(!SC.none(parent)){parent._registerSubstate(this);parent=parent.get("parentState")
}},_registerSubstate:function(state){var path=state.pathRelativeTo(this);if(SC.none(path)){return
}if(SC.none(this._registeredSubstatePaths)){this._registeredSubstatePaths={};this._registeredSubstates=[]
}this._registeredSubstates.push(state);var regPaths=this._registeredSubstatePaths;
if(regPaths[state.get("name")]===undefined){regPaths[state.get("name")]={__ki_paths__:[]}
}var paths=regPaths[state.get("name")];paths[path]=state;paths.__ki_paths__.push(path)
},pathRelativeTo:function(state){var path=this.get("name"),parent=this.get("parentState");
while(!SC.none(parent)&&parent!==state){path="%@.%@".fmt(parent.get("name"),path);
parent=parent.get("parentState")}if(parent!==state&&state!==this){this.stateLogError("Can not generate relative path from %@ since it not a parent state of %@".fmt(state,this));
return null}return path},getSubstate:function(value){var valueType=SC.typeOf(value);
if(valueType===SC.T_OBJECT){return this._registeredSubstates.indexOf(value)>-1?value:null
}if(valueType!==SC.T_STRING){this.stateLogError("Can not find matching subtype. value must be an object or string: %@".fmt(value));
return null}var matches=value.match(/(^|\.)(\w+)$/);if(!matches){return null}var paths=this._registeredSubstatePaths[matches[2]];
if(SC.none(paths)){return null}var state=paths[value];if(!SC.none(state)){return state
}if(matches[1]===""){if(paths.__ki_paths__.length===1){return paths[paths.__ki_paths__[0]]
}if(paths.__ki_paths__.length>1){var msg="Can not find substate matching %@ in state %@. Ambiguous with the following: %@";
this.stateLogError(msg.fmt(value,this,paths.__ki_paths__))}}return null},gotoState:function(state,context){var fromState=null;
if(this.get("isCurrentState")){fromState=this}else{if(this.get("hasCurrentSubstates")){fromState=this.get("currentSubstates")[0]
}}this.get("statechart").gotoState(state,fromState,context)},gotoHistoryState:function(state,recursive,context){var fromState=null;
if(this.get("isCurrentState")){fromState=this}else{if(this.get("hasCurrentSubstates")){fromState=this.get("currentSubstates")[0]
}}this.get("statechart").gotoHistoryState(state,fromState,recursive,context)},resumeGotoState:function(){this.get("statechart").resumeGotoState()
},stateIsCurrentSubstate:function(state){if(SC.typeOf(state)===SC.T_STRING){state=this.get("statechart").getState(state)
}var current=this.get("currentSubstates");return !!current&&current.indexOf(state)>=0
},stateIsEnteredSubstate:function(state){if(SC.typeOf(state)===SC.T_STRING){state=this.get("statechart").getState(state)
}var entered=this.get("enteredSubstates");return !!entered&&entered.indexOf(state)>=0
},isRootState:function(){return this.getPath("statechart.rootState")===this}.property(),isCurrentState:function(){return this.stateIsCurrentSubstate(this)
}.property("currentSubstates").cacheable(),isConcurrentState:function(){return this.getPath("parentState.substatesAreConcurrent")
}.property(),isEnteredState:function(){return this.stateIsEnteredSubstate(this)}.property("enteredSubstates").cacheable(),hasSubstates:function(){return this.getPath("substates.length")>0
}.property("substates"),hasCurrentSubstates:function(){var current=this.get("currentSubstates");
return !!current&&current.get("length")>0}.property("currentSubstates").cacheable(),hasEnteredSubstates:function(){var entered=this.get("enteredSubstates");
return !!entered&&entered.get("length")>0}.property("enteredSubstates").cacheable(),reenter:function(){var statechart=this.get("statechart");
if(this.get("isCurrentState")){statechart.gotoState(this)}else{SC.Logger.error("Can not re-enter state %@ since it is not a current state in the statechart".fmt(this))
}},tryToHandleEvent:function(event,arg1,arg2){var trace=this.get("trace");if(this._registeredEventHandlers[event]){this.stateLogWarning("state %@ can not handle event %@ since it is a registered event handler".fmt(this,event));
return NO}if(this._registeredStateObserveHandlers[event]){this.stateLogWarning("state %@ can not handle event %@ since it is a registered state observe handler".fmt(this,event));
return NO}if(SC.typeOf(this[event])===SC.T_FUNCTION){if(trace){this.stateLogTrace("will handle event %@".fmt(event))
}return(this[event](arg1,arg2)!==NO)}var handler=this._registeredStringEventHandlers[event];
if(handler){if(trace){this.stateLogTrace("%@ will handle event %@".fmt(handler.name,event))
}return(handler.handler.call(this,event,arg1,arg2)!==NO)}var len=this._registeredRegExpEventHandlers.length,i=0;
for(;i<len;i+=1){handler=this._registeredRegExpEventHandlers[i];if(event.match(handler.regexp)){if(trace){this.stateLogTrace("%@ will handle event %@".fmt(handler.name,event))
}return(handler.handler.call(this,event,arg1,arg2)!==NO)}}if(SC.typeOf(this["unknownEvent"])===SC.T_FUNCTION){if(trace){this.stateLogTrace("unknownEvent will handle event %@".fmt(event))
}return(this.unknownEvent(event,arg1,arg2)!==NO)}return NO},enterState:function(context){},stateWillBecomeEntered:function(){},stateDidBecomeEntered:function(){this._setupAllStateObserveHandlers()
},exitState:function(context){},stateWillBecomeExited:function(){this._teardownAllStateObserveHandlers()
},stateDidBecomeExited:function(){},_setupAllStateObserveHandlers:function(){this._configureAllStateObserveHandlers("addObserver")
},_teardownAllStateObserveHandlers:function(){this._configureAllStateObserveHandlers("removeObserver")
},_configureAllStateObserveHandlers:function(action){var key,values,value,dotIndex,path,observer,i,root;
for(key in this._registeredStateObserveHandlers){values=this._registeredStateObserveHandlers[key];
for(i=0;i<values.length;i+=1){path=values[i];observer=key;dotIndex=path.indexOf(".");
if(dotIndex<0){this[action](path,this,observer)}else{if(path.indexOf("*")===0){this[action](path.slice(1),this,observer)
}else{root=null;if(dotIndex===0){root=this;path=path.slice(1)}else{if(dotIndex===4&&path.slice(0,5)==="this."){root=this;
path=path.slice(5)}else{if(dotIndex<0&&path.length===4&&path==="this"){root=this;
path=""}}}SC.Observers[action](path,this,observer,root)}}}}},performAsync:function(func,arg1,arg2){return Ki.Async.perform(func,arg1,arg2)
},respondsToEvent:function(event){if(this._registeredEventHandlers[event]){return false
}if(SC.typeOf(this[event])===SC.T_FUNCTION){return true}if(this._registeredStringEventHandlers[event]){return true
}if(this._registeredStateObserveHandlers[event]){return false}var len=this._registeredRegExpEventHandlers.length,i=0,handler;
for(;i<len;i+=1){handler=this._registeredRegExpEventHandlers[i];if(event.match(handler.regexp)){return true
}}return SC.typeOf(this["unknownEvent"])===SC.T_FUNCTION},fullPath:function(){var root=this.getPath("statechart.rootState");
if(!root){return this.get("name")}return this.pathRelativeTo(root)}.property("name","parentState").cacheable(),toString:function(){var className=SC._object_className(this.constructor);
return"%@<%@, %@>".fmt(className,this.get("fullPath"),SC.guidFor(this))},_statechartTraceDidChange:function(){this.notifyPropertyChange("trace")
},_statechartOwnerDidChange:function(){this.notifyPropertyChange("owner")},stateLogTrace:function(msg){var sc=this.get("statechart");
sc.statechartLogTrace("%@: %@".fmt(this,msg))},stateLogWarning:function(msg){var sc=this.get("statechart");
sc.statechartLogWarning(msg)},stateLogError:function(msg){var sc=this.get("statechart");
sc.statechartLogError(msg)}});Ki.State.plugin=function(value){var args=SC.A(arguments);
args.shift();var func=function(){var klass=SC.objectForPropertyPath(value);return klass.extend.apply(klass,args)
};func.statePlugin=YES;return func};Ki.State.design=Ki.State.extend;Function.prototype.handleEvents=function(){this.isEventHandler=YES;
this.events=arguments;return this};Function.prototype.stateObserves=function(){this.isStateObserveHandler=YES;
this.args=SC.A(arguments);return this};Ki.HistoryState=SC.Object.extend({isRecursive:NO,defaultState:null,statechart:null,parentState:null,state:function(){var defaultState=this.get("defaultState"),historyState=this.getPath("parentState.historyState");
return !!historyState?historyState:defaultState}.property().cacheable(),parentHistoryStateDidChange:function(){this.notifyPropertyChange("state")
}.observes("*parentState.historyState")});Ki.EMPTY_STATE_NAME="__EMPTY_STATE__";Ki.EmptyState=Ki.State.extend({name:Ki.EMPTY_STATE_NAME,enterState:function(){this.stateLogWarning("No initial substate was defined for state %@. Entering default empty state".fmt(this.get("parentState")))
}});sc_require("system/state");Ki.StatechartManager={isResponderContext:YES,isStatechart:YES,statechartIsInitialized:NO,rootState:null,rootStateExample:Ki.State,initialState:null,statesAreConcurrent:NO,monitorIsActive:NO,monitor:null,statechartTraceKey:"trace",trace:NO,statechartOwnerKey:"owner",owner:null,autoInitStatechart:YES,suppressStatechartWarnings:NO,initMixin:function(){if(this.get("autoInitStatechart")){this.initStatechart()
}},destroyMixin:function(){var root=this.get("rootState"),traceKey=this.get("statechartTraceKey");
this.removeObserver(traceKey,this,"_statechartTraceDidChange");root.destroy();this.set("rootState",null)
},initStatechart:function(){if(this.get("statechartIsInitialized")){return}this._gotoStateLocked=NO;
this._sendEventLocked=NO;this._pendingStateTransitions=[];this._pendingSentEvents=[];
this.sendAction=this.sendEvent;if(this.get("monitorIsActive")){this.set("monitor",Ki.StatechartMonitor.create({statechart:this}))
}var traceKey=this.get("statechartTraceKey");this.addObserver(traceKey,this,"_statechartTraceDidChange");
this._statechartTraceDidChange();var trace=this.get("allowStatechartTracing"),rootState=this.get("rootState"),msg;
if(trace){this.statechartLogTrace("BEGIN initialize statechart")}if(!rootState){rootState=this._constructRootStateClass()
}else{if(SC.typeOf(rootState)===SC.T_FUNCTION&&rootState.statePlugin){rootState=rootState.apply(this)
}}if(!(SC.kindOf(rootState,Ki.State)&&rootState.isClass)){msg="Unable to initialize statechart. Root state must be a state class";
this.statechartLogError(msg);throw msg}rootState=this.createRootState(rootState,{statechart:this,name:Ki.ROOT_STATE_NAME});
this.set("rootState",rootState);rootState.initState();if(SC.kindOf(rootState.get("initialSubstate"),Ki.EmptyState)){msg="Unable to initialize statechart. Root state must have an initial substate explicilty defined";
this.statechartLogError(msg);throw msg}if(!SC.empty(this.get("initialState"))){var key="initialState";
this.set(key,rootState.get(this.get(key)))}this.set("statechartIsInitialized",YES);
this.gotoState(rootState);if(trace){this.statechartLogTrace("END initialize statechart")
}},createRootState:function(state,attrs){if(!attrs){attrs={}}state=state.create(attrs);
return state},currentStates:function(){return this.getPath("rootState.currentSubstates")
}.property().cacheable(),firstCurrentState:function(){var cs=this.get("currentStates");
return cs?cs.objectAt(0):null}.property("currentStates").cacheable(),currentStateCount:function(){return this.getPath("currentStates.length")
}.property("currentStates").cacheable(),stateIsCurrentState:function(state){return this.get("rootState").stateIsCurrentSubstate(state)
},enteredStates:function(){return this.getPath("rootState.enteredSubstates")}.property().cacheable(),stateIsEntered:function(state){return this.get("rootState").stateIsEnteredSubstate(state)
},doesContainState:function(value){return !SC.none(this.getState(value))},getState:function(value){return this.get("rootState").getSubstate(value)
},gotoState:function(state,fromCurrentState,useHistory,context){if(!this.get("statechartIsInitialized")){this.statechartLogError("can not go to state %@. statechart has not yet been initialized".fmt(state));
return}if(this.get("isDestroyed")){this.statechartLogError("can not go to state %@. statechart is destroyed".fmt(this));
return}var args=this._processGotoStateArgs(arguments);state=args.state;fromCurrentState=args.fromCurrentState;
useHistory=args.useHistory;context=args.context;var pivotState=null,exitStates=[],enterStates=[],trace=this.get("allowStatechartTracing"),rootState=this.get("rootState"),paramState=state,paramFromCurrentState=fromCurrentState;
state=rootState.getSubstate(state);if(SC.none(state)){this.statechartLogError("Can not to goto state %@. Not a recognized state in statechart".fmt(paramState));
return}if(this._gotoStateLocked){this._pendingStateTransitions.push({state:state,fromCurrentState:fromCurrentState,useHistory:useHistory,context:context});
return}this._gotoStateLocked=YES;if(!SC.none(fromCurrentState)){fromCurrentState=rootState.getSubstate(fromCurrentState);
if(SC.none(fromCurrentState)||!fromCurrentState.get("isCurrentState")){var msg="Can not to goto state %@. %@ is not a recognized current state in statechart";
this.statechartLogError(msg.fmt(paramState,paramFromCurrentState));this._gotoStateLocked=NO;
return}}else{if(this.getPath("currentStates.length")>0){fromCurrentState=this.get("currentStates")[0]
}}if(trace){this.statechartLogTrace("BEGIN gotoState: %@".fmt(state));this.statechartLogTrace("starting from current state: %@".fmt(fromCurrentState));
this.statechartLogTrace("current states before: %@".fmt(this.get("currentStates")))
}if(!SC.none(fromCurrentState)){exitStates=this._createStateChain(fromCurrentState)
}enterStates=this._createStateChain(state);pivotState=this._findPivotState(exitStates,enterStates);
if(pivotState){if(trace){this.statechartLogTrace("pivot state = %@".fmt(pivotState))
}if(pivotState.get("substatesAreConcurrent")){this.statechartLogError("Can not go to state %@ from %@. Pivot state %@ has concurrent substates.".fmt(state,fromCurrentState,pivotState));
this._gotoStateLocked=NO;return}}var gotoStateActions=[];this._traverseStatesToExit(exitStates.shift(),exitStates,pivotState,gotoStateActions);
if(pivotState!==state){this._traverseStatesToEnter(enterStates.pop(),enterStates,pivotState,useHistory,gotoStateActions)
}else{this._traverseStatesToExit(pivotState,[],null,gotoStateActions);this._traverseStatesToEnter(pivotState,null,null,useHistory,gotoStateActions)
}this._executeGotoStateActions(state,gotoStateActions,null,context)},gotoStateActive:function(){return this._gotoStateLocked
}.property(),gotoStateSuspended:function(){return this._gotoStateLocked&&!!this._gotoStateSuspendedPoint
}.property(),resumeGotoState:function(){if(!this.get("gotoStateSuspended")){this.statechartLogError("Can not resume goto state since it has not been suspended");
return}var point=this._gotoStateSuspendedPoint;this._executeGotoStateActions(point.gotoState,point.actions,point.marker,point.context)
},_executeGotoStateActions:function(gotoState,actions,marker,context){var action=null,len=actions.length,actionResult=null;
marker=SC.none(marker)?0:marker;for(;marker<len;marker+=1){action=actions[marker];
switch(action.action){case Ki.EXIT_STATE:actionResult=this._exitState(action.state,context);
break;case Ki.ENTER_STATE:actionResult=this._enterState(action.state,action.currentState,context);
break}if(SC.kindOf(actionResult,Ki.Async)){this._gotoStateSuspendedPoint={gotoState:gotoState,actions:actions,marker:marker+1,context:context};
actionResult.tryToPerform(action.state);return}}this.beginPropertyChanges();this.notifyPropertyChange("currentStates");
this.notifyPropertyChange("enteredStates");this.endPropertyChanges();if(this.get("allowStatechartTracing")){this.statechartLogTrace("current states after: %@".fmt(this.get("currentStates")));
this.statechartLogTrace("END gotoState: %@".fmt(gotoState))}this._gotoStateSuspendedPoint=null;
this._gotoStateLocked=NO;this._flushPendingStateTransition()},_exitState:function(state,context){var parentState;
if(state.get("currentSubstates").indexOf(state)>=0){parentState=state.get("parentState");
while(parentState){parentState.get("currentSubstates").removeObject(state);parentState=parentState.get("parentState")
}}parentState=state;while(parentState){parentState.get("enteredSubstates").removeObject(state);
parentState=parentState.get("parentState")}if(this.get("allowStatechartTracing")){this.statechartLogTrace("exiting state: %@".fmt(state))
}state.set("currentSubstates",[]);state.notifyPropertyChange("isCurrentState");state.stateWillBecomeExited();
var result=this.exitState(state,context);state.stateDidBecomeExited();if(this.get("monitorIsActive")){this.get("monitor").pushExitedState(state)
}state._traverseStatesToExit_skipState=NO;return result},exitState:function(state,context){return state.exitState(context)
},_enterState:function(state,current,context){var parentState=state.get("parentState");
if(parentState&&!state.get("isConcurrentState")){parentState.set("historyState",state)
}if(current){parentState=state;while(parentState){parentState.get("currentSubstates").pushObject(state);
parentState=parentState.get("parentState")}}parentState=state;while(parentState){parentState.get("enteredSubstates").pushObject(state);
parentState=parentState.get("parentState")}if(this.get("allowStatechartTracing")){this.statechartLogTrace("entering state: %@".fmt(state))
}state.notifyPropertyChange("isCurrentState");state.stateWillBecomeEntered();var result=this.enterState(state,context);
state.stateDidBecomeEntered();if(this.get("monitorIsActive")){this.get("monitor").pushEnteredState(state)
}return result},enterState:function(state,context){return state.enterState(context)
},gotoHistoryState:function(state,fromCurrentState,recursive,context){if(!this.get("statechartIsInitialized")){this.statechartLogError("can not go to state %@'s history state. Statechart has not yet been initialized".fmt(state));
return}var args=this._processGotoStateArgs(arguments);state=args.state;fromCurrentState=args.fromCurrentState;
recursive=args.useHistory;context=args.context;state=this.getState(state);if(!state){this.statechartLogError("Can not to goto state %@'s history state. Not a recognized state in statechart".fmt(state));
return}var historyState=state.get("historyState");if(!recursive){if(historyState){this.gotoState(historyState,fromCurrentState,context)
}else{this.gotoState(state,fromCurrentState,context)}}else{this.gotoState(state,fromCurrentState,YES,context)
}},sendEvent:function(event,arg1,arg2){if(this.get("isDestroyed")){this.statechartLogError("can send event %@. statechart is destroyed".fmt(event));
return}var statechartHandledEvent=NO,eventHandled=NO,currentStates=this.get("currentStates").slice(),len=0,i=0,state=null,trace=this.get("allowStatechartTracing");
if(this._sendEventLocked||this._goStateLocked){this._pendingSentEvents.push({event:event,arg1:arg1,arg2:arg2});
return}this._sendEventLocked=YES;if(trace){this.statechartLogTrace("BEGIN sendEvent: event<%@>".fmt(event))
}len=currentStates.get("length");for(;i<len;i+=1){eventHandled=NO;state=currentStates[i];
if(!state.get("isCurrentState")){continue}while(!eventHandled&&state){eventHandled=state.tryToHandleEvent(event,arg1,arg2);
if(!eventHandled){state=state.get("parentState")}else{statechartHandledEvent=YES}}}this._sendEventLocked=NO;
if(trace){if(!statechartHandledEvent){this.statechartLogTrace("No state was able handle event %@".fmt(event))
}this.statechartLogTrace("END sendEvent: event<%@>".fmt(event))}var result=this._flushPendingSentEvents();
return statechartHandledEvent?this:(result?this:null)},_createStateChain:function(state){var chain=[];
while(state){chain.push(state);state=state.get("parentState")}return chain},_findPivotState:function(stateChain1,stateChain2){if(stateChain1.length===0||stateChain2.length===0){return null
}var pivot=stateChain1.find(function(state,index){if(stateChain2.indexOf(state)>=0){return YES
}});return pivot},_traverseStatesToExit:function(state,exitStatePath,stopState,gotoStateActions){if(!state||state===stopState){return
}var trace=this.get("allowStatechartTracing");if(state.get("substatesAreConcurrent")){var i=0,currentSubstates=state.get("currentSubstates"),len=currentSubstates.length,currentState=null;
for(;i<len;i+=1){currentState=currentSubstates[i];if(currentState._traverseStatesToExit_skipState===YES){continue
}var chain=this._createStateChain(currentState);this._traverseStatesToExit(chain.shift(),chain,state,gotoStateActions)
}}gotoStateActions.push({action:Ki.EXIT_STATE,state:state});if(state.get("isCurrentState")){state._traverseStatesToExit_skipState=YES
}this._traverseStatesToExit(exitStatePath.shift(),exitStatePath,stopState,gotoStateActions)
},_traverseStatesToEnter:function(state,enterStatePath,pivotState,useHistory,gotoStateActions){if(!state){return
}var trace=this.get("allowStatechartTracing");if(pivotState){if(state!==pivotState){this._traverseStatesToEnter(enterStatePath.pop(),enterStatePath,pivotState,useHistory,gotoStateActions)
}else{this._traverseStatesToEnter(enterStatePath.pop(),enterStatePath,null,useHistory,gotoStateActions)
}}else{if(!enterStatePath||enterStatePath.length===0){var gotoStateAction={action:Ki.ENTER_STATE,state:state,currentState:NO};
gotoStateActions.push(gotoStateAction);var initialSubstate=state.get("initialSubstate"),historyState=state.get("historyState");
if(state.get("substatesAreConcurrent")){this._traverseConcurrentStatesToEnter(state.get("substates"),null,useHistory,gotoStateActions)
}else{if(state.get("hasSubstates")&&historyState&&useHistory){this._traverseStatesToEnter(historyState,null,null,useHistory,gotoStateActions)
}else{if(initialSubstate){if(SC.kindOf(initialSubstate,Ki.HistoryState)){if(!useHistory){useHistory=initialSubstate.get("isRecursive")
}initialSubstate=initialSubstate.get("state")}this._traverseStatesToEnter(initialSubstate,null,null,useHistory,gotoStateActions)
}else{gotoStateAction.currentState=YES}}}}else{if(enterStatePath.length>0){gotoStateActions.push({action:Ki.ENTER_STATE,state:state});
var nextState=enterStatePath.pop();this._traverseStatesToEnter(nextState,enterStatePath,null,useHistory,gotoStateActions);
if(state.get("substatesAreConcurrent")){this._traverseConcurrentStatesToEnter(state.get("substates"),nextState,useHistory,gotoStateActions)
}}}}},respondsTo:function(event){var currentStates=this.get("currentStates"),len=currentStates.get("length"),i=0,state=null;
for(;i<len;i+=1){state=currentStates.objectAt(i);while(state){if(state.respondsToEvent(event)){return true
}state=state.get("parentState")}}return SC.typeOf(this[event])===SC.T_FUNCTION},tryToPerform:function(event,arg1,arg2){if(this.respondsTo(event)){if(SC.typeOf(this[event])===SC.T_FUNCTION){return(this[event](arg1,arg2)!==NO)
}else{return !!this.sendEvent(event,arg1,arg2)}}return NO},invokeStateMethod:function(methodName,args,func){if(methodName==="unknownEvent"){this.statechartLogError("can not invoke method unkownEvent");
return}args=SC.A(arguments);args.shift();var len=args.length,arg=len>0?args[len-1]:null,callback=SC.typeOf(arg)===SC.T_FUNCTION?args.pop():null,currentStates=this.get("currentStates"),i=0,state=null,checkedStates={},method,result=undefined,calledStates=0;
len=currentStates.get("length");for(;i<len;i+=1){state=currentStates.objectAt(i);
while(state){if(checkedStates[state.get("fullPath")]){break}checkedStates[state.get("fullPath")]=YES;
method=state[methodName];if(SC.typeOf(method)===SC.T_FUNCTION&&!method.isEventHandler){result=method.apply(state,args);
if(callback){callback.call(this,state,result)}calledStates+=1;break}state=state.get("parentState")
}}return calledStates===1?result:undefined},_traverseConcurrentStatesToEnter:function(states,exclude,useHistory,gotoStateActions){var i=0,len=states.length,state=null;
for(;i<len;i+=1){state=states[i];if(state!==exclude){this._traverseStatesToEnter(state,null,null,useHistory,gotoStateActions)
}}},_flushPendingStateTransition:function(){if(!this._pendingStateTransitions){this.statechartLogError("Unable to flush pending state transition. _pendingStateTransitions is invalid");
return}var pending=this._pendingStateTransitions.shift();if(!pending){return}this.gotoState(pending.state,pending.fromCurrentState,pending.useHistory,pending.context)
},_flushPendingSentEvents:function(){var pending=this._pendingSentEvents.shift();
if(!pending){return null}return this.sendEvent(pending.event,pending.arg1,pending.arg2)
},_monitorIsActiveDidChange:function(){if(this.get("monitorIsActive")&&SC.none(this.get("monitor"))){this.set("monitor",Ki.StatechartMonitor.create())
}}.observes("monitorIsActive"),_processGotoStateArgs:function(args){var processedArgs={state:null,fromCurrentState:null,useHistory:false,context:null},len=null,value=null;
args=SC.$A(args);args=args.filter(function(item){return !(item===undefined)});len=args.length;
if(len<1){return processedArgs}processedArgs.state=args[0];if(len===2){value=args[1];
switch(SC.typeOf(value)){case SC.T_BOOL:processedArgs.useHistory=value;break;case SC.T_HASH:processedArgs.context=value;
break;default:processedArgs.fromCurrentState=value}}else{if(len===3){value=args[1];
if(SC.typeOf(value)===SC.T_BOOL){processedArgs.useHistory=value;processedArgs.context=args[2]
}else{processedArgs.fromCurrentState=value;value=args[2];if(SC.typeOf(value)===SC.T_BOOL){processedArgs.useHistory=value
}else{processedArgs.context=value}}}else{processedArgs.fromCurrentState=args[1];processedArgs.useHistory=args[2];
processedArgs.context=args[3]}}return processedArgs},_constructRootStateClass:function(){var rsExampleKey="rootStateExample",rsExample=this.get(rsExampleKey),initialState=this.get("initialState"),statesAreConcurrent=this.get("statesAreConcurrent"),stateCount=0,key,value,valueIsFunc,attrs={};
if(SC.typeOf(rsExample)===SC.T_FUNCTION&&rsExample.statePlugin){rsExample=rsExample.apply(this)
}if(!(SC.kindOf(rsExample,Ki.State)&&rsExample.isClass)){this._logStatechartCreationError("Invalid root state example");
return null}if(statesAreConcurrent&&!SC.empty(initialState)){this._logStatechartCreationError("Can not assign an initial state when states are concurrent")
}else{if(statesAreConcurrent){attrs.substatesAreConcurrent=YES}else{if(SC.typeOf(initialState)===SC.T_STRING){attrs.initialSubstate=initialState
}else{this._logStatechartCreationError("Must either define initial state or assign states as concurrent");
return null}}}for(key in this){if(key===rsExampleKey){continue}value=this[key];valueIsFunc=SC.typeOf(value)===SC.T_FUNCTION;
if(valueIsFunc&&value.statePlugin){value=value.apply(this)}if(SC.kindOf(value,Ki.State)&&value.isClass&&this[key]!==this.constructor){attrs[key]=value;
stateCount+=1}}if(stateCount===0){this._logStatechartCreationError("Must define one or more states");
return null}return rsExample.extend(attrs)},_logStatechartCreationError:function(msg){SC.Logger.error("Unable to create statechart for %@: %@.".fmt(this,msg))
},statechartLogTrace:function(msg){SC.Logger.info("%@: %@".fmt(this.get("statechartLogPrefix"),msg))
},statechartLogError:function(msg){SC.Logger.error("ERROR %@: %@".fmt(this.get("statechartLogPrefix"),msg))
},statechartLogWarning:function(msg){if(this.get("suppressStatechartWarnings")){return
}SC.Logger.warn("WARN %@: %@".fmt(this.get("statechartLogPrefix"),msg))},statechartLogPrefix:function(){var className=SC._object_className(this.constructor),name=this.get("name"),prefix;
if(SC.empty(name)){prefix="%@<%@>".fmt(className,SC.guidFor(this))}else{prefix="%@<%@, %@>".fmt(className,name,SC.guidFor(this))
}return prefix}.property().cacheable(),allowStatechartTracing:function(){var key=this.get("statechartTraceKey");
return this.get(key)}.property().cacheable(),_statechartTraceDidChange:function(){this.notifyPropertyChange("allowStatechartTracing")
}};Ki.ROOT_STATE_NAME="__ROOT_STATE__";Ki.EXIT_STATE=0;Ki.ENTER_STATE=1;Ki.Statechart=SC.Object.extend(Ki.StatechartManager,{autoInitStatechart:NO});
Ki.Statechart.design=Ki.Statechart.extend;Ki.Async=SC.Object.extend({func:null,arg1:null,arg2:null,tryToPerform:function(state){var func=this.get("func"),arg1=this.get("arg1"),arg2=this.get("arg2"),funcType=SC.typeOf(func);
if(funcType===SC.T_STRING){state.tryToPerform(func,arg1,arg2)}else{if(funcType===SC.T_FUNCTION){func.apply(state,[arg1,arg2])
}}}});Ki.Async.mixin({perform:function(func,arg1,arg2){return Ki.Async.create({func:func,arg1:arg1,arg2:arg2})
}});