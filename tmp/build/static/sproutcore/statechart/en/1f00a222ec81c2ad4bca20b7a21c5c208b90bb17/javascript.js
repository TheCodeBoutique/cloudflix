SC.State=SC.Object.extend({name:null,parentState:null,historyState:null,initialSubstate:null,substatesAreConcurrent:NO,substates:null,statechart:null,stateIsInitialized:NO,currentSubstates:null,init:function(){this._registeredEventHandlers={};
this._registeredStringEventHandlers={};this._registeredRegExpEventHandlers=[]},initState:function(){if(this.get("stateIsInitialized")){return
}this._registerWithParentStates();var key=null,value=null,state=null,substates=[],matchedInitialSubstate=NO,initialSubstate=this.get("initialSubstate"),substatesAreConcurrent=this.get("substatesAreConcurrent"),statechart=this.get("statechart"),i=0,len=0,valueIsFunc=NO;
for(key in this){value=this[key];valueIsFunc=SC.typeOf(value)===SC.T_FUNCTION;if(valueIsFunc&&value.isEventHandler){this._registerEventHandler(key,value);
continue}if(valueIsFunc&&value.statePlugin){value=value.apply(this)}if(SC.kindOf(value,SC.State)&&value.isClass&&this[key]!==this.constructor){state=this.createSubstate(value,{name:key,parentState:this,statechart:statechart});
substates.push(state);this[key]=state;state.initState();if(key===initialSubstate){this.set("initialSubstate",state);
matchedInitialSubstate=YES}}}if(!SC.none(initialSubstate)&&!matchedInitialSubstate){SC.Logger.error("Unable to set initial substate %@ since it did not match any of state's %@ substates",initialSubstate,this)
}this.set("substates",substates);this.set("currentSubstates",[]);if(substates.length===0){if(!SC.none(initialSubstate)){SC.Logger.warn("Unable to make %@ an initial substate since state %@ has no substates",initialSubstate,this)
}}else{if(substates.length>0){if(SC.none(initialSubstate)&&!substatesAreConcurrent){state=substates[0];
this.set("initialSubstate",state);SC.Logger.warn("state %@ has no initial substate defined. Will default to using %@ as initial substate",this,state)
}else{if(!SC.none(initialSubstate)&&substatesAreConcurrent){this.set("initialSubstate",null);
SC.Logger.warn("Cannot use %@ as initial substate since substates are all concurrent for state %@",initialSubstate,this)
}}}}this.set("stateIsInitialized",YES)},createSubstate:function(state,attrs){if(!attrs){attrs={}
}state=state.create(attrs);return state},_registerEventHandler:function(name,handler){var events=handler.events,event=null,len=events.length,i=0;
this._registeredEventHandlers[name]=handler;for(;i<len;i+=1){event=events[i];if(SC.typeOf(event)===SC.T_STRING){this._registeredStringEventHandlers[event]={name:name,handler:handler};
continue}if(event instanceof RegExp){this._registeredRegExpEventHandlers.push({name:name,handler:handler,regexp:event});
continue}SC.Logger.error("Invalid event %@ for event handler %@ in state %@",event,name,this)
}},_registerWithParentStates:function(){this._registerSubstate(this);var parent=this.get("parentState");
while(!SC.none(parent)){parent._registerSubstate(this);parent=parent.get("parentState")
}},_registerSubstate:function(state){var path=state.pathRelativeTo(this);if(SC.none(path)){return
}if(SC.none(this._registeredSubstatePaths)){this._registeredSubstatePaths={};this._registeredSubstates=[]
}this._registeredSubstates.push(state);var regPaths=this._registeredSubstatePaths;
if(regPaths[state.get("name")]===undefined){regPaths[state.get("name")]={__ki_paths__:[]}
}var paths=regPaths[state.get("name")];paths[path]=state;paths.__ki_paths__.push(path)
},pathRelativeTo:function(state){var path=this.get("name"),parent=this.get("parentState");
while(!SC.none(parent)&&parent!==state){path="%@.%@".fmt(parent.get("name"),path);
parent=parent.get("parentState")}if(parent!==state&&state!==this){SC.Logger.error("Cannot generate relative path from %@ since it not a parent state of %@",state,this);
return null}return path},getSubstate:function(value){var valueType=SC.typeOf(value);
if(valueType===SC.T_OBJECT){return this._registeredSubstates.indexOf(value)>-1?value:null
}if(valueType!==SC.T_STRING){SC.Logger.error("Cannot find matching subtype. value must be an object or string: %@",value);
return null}var matches=value.match(/(^|\.)(\w+)$/);if(!matches){return null}var paths=this._registeredSubstatePaths[matches[2]];
if(SC.none(paths)){return null}var state=paths[value];if(!SC.none(state)){return state
}if(matches[1]===""){if(paths.__ki_paths__.length===1){return paths[paths.__ki_paths__[0]]
}if(paths.__ki_paths__.length>1){var msg="Cannot find substate matching %@ in state %@. Ambiguous with the following: %@";
SC.Logger.error(msg,value,this,paths.__ki_paths__)}}return null},gotoState:function(state,context){var fromState=null;
if(this.get("isCurrentState")){fromState=this}else{if(this.get("hasCurrentSubstates")){fromState=this.get("currentSubstates")[0]
}}this.get("statechart").gotoState(state,fromState,context)},gotoHistoryState:function(state,context,recursive){var fromState=null;
if(this.get("isCurrentState")){fromState=this}else{if(this.get("hasCurrentSubstates")){fromState=this.get("currentSubstates")[0]
}}this.get("statechart").gotoHistoryState(state,fromState,context,recursive)},resumeGotoState:function(){this.get("statechart").resumeGotoState()
},stateIsCurrentSubstate:function(state){if(SC.typeOf(state)===SC.T_STRING){state=this.get("statechart").getState(state)
}return this.get("currentSubstates").indexOf(state)>=0},isRootState:function(){return this.getPath("statechart.rootState")===this
}.property(),isCurrentState:function(){return this.stateIsCurrentSubstate(this)}.property().cacheable(),isConcurrentState:function(){return this.getPath("parentState.substatesAreConcurrent")
}.property(),hasSubstates:function(){return this.getPath("substates.length")>0}.property("substates"),hasCurrentSubstates:function(){var current=this.get("currentSubstates");
return !SC.none(current)&&current.get("length")>0}.property("currentSubstates"),reenter:function(){var statechart=this.get("statechart");
if(this.get("isCurrentState")){statechart.gotoState(this)}else{SC.Logger.error("Cannot re-enter state %@ since it is not a current state in the statechart",this)
}},tryToHandleEvent:function(event,sender,context){if(this._registeredEventHandlers[event]){SC.Logger.warn("state %@ can not handle event %@ since it is a registered event handler",this,event);
return NO}if(this.tryToPerform(event,sender,context)){return YES}var handler=this._registeredStringEventHandlers[event];
if(handler){handler.handler.call(this,event,sender,context);return YES}var len=this._registeredRegExpEventHandlers.length,i=0;
for(;i<len;i+=1){handler=this._registeredRegExpEventHandlers[i];if(event.match(handler.regexp)){handler.handler.call(this,event,sender,context);
return YES}}if(SC.typeOf(this["unknownEvent"])===SC.T_FUNCTION){this.unknownEvent(event,sender,context);
return YES}return NO},enterState:function(context){},exitState:function(){},performAsync:function(func,arg1,arg2){return SC.Async.perform(func,arg1,arg2)
},toString:function(){return"SC.State<%@, %@>".fmt(this.get("name"),SC.guidFor(this))
}});SC.State.plugin=function(value){var func=function(){return SC.objectForPropertyPath(value)
};func.statePlugin=YES;return func};SC.State.design=SC.State.extend;Function.prototype.handleEvents=function(){this.isEventHandler=YES;
this.events=arguments;return this};SC.StatechartManager={isResponderContext:YES,isStatechart:YES,statechartIsInitialized:NO,rootState:null,monitorIsActive:NO,monitor:null,trace:NO,initMixin:function(){this._gotoStateLocked=NO;
this._sendEventLocked=NO;this._pendingStateTransitions=[];this._pendingSentEvents=[];
this.sendAction=this.sendEvent;if(this.get("monitorIsActive")){this.set("monitor",SC.StatechartMonitor.create())
}},initStatechart:function(){if(this.get("statechartIsInitialized")){return}var trace=this.get("trace"),rootState=this.get("rootState");
if(trace){SC.Logger.info("BEGIN initialize statechart")}if(SC.typeOf(rootState)===SC.T_FUNCTION&&rootState.statePlugin){rootState=rootState.apply(this)
}if(!(SC.kindOf(rootState,SC.State)&&rootState.isClass)){throw"Unable to initialize statechart. Root state must be a state class"
}rootState=this.createRootState(rootState,{statechart:this,name:SC.ROOT_STATE_NAME});
this.set("rootState",rootState);rootState.initState();this.set("statechartIsInitialized",YES);
this.gotoState(rootState);if(trace){SC.Logger.info("END initialize statechart")}},createRootState:function(state,attrs){if(!attrs){attrs={}
}state=state.create(attrs);return state},currentStates:function(){return this.getPath("rootState.currentSubstates")
}.property(),currentStateCount:function(){return this.getPath("currentStates.length")
}.property("currentStates"),stateIsCurrentState:function(state){return this.get("rootState").stateIsCurrentSubstate(state)
},doesContainState:function(value){return !SC.none(this.getState(value))},getState:function(value){return this.get("rootState").getSubstate(value)
},gotoState:function(state,fromCurrentState,context,useHistory){if(!this.get("statechartIsInitialized")){SC.Logger.error("can not go to state %@. statechart has not yet been initialized".fmt(state));
return}var pivotState=null,exitStates=[],enterStates=[],trace=this.get("trace"),rootState=this.get("rootState"),paramState=state,paramFromCurrentState=fromCurrentState;
state=rootState.getSubstate(state);if(SC.none(state)){SC.Logger.error("Can not to goto state %@. Not a recognized state in statechart".fmt(paramState));
return}if(this._gotoStateLocked){this._pendingStateTransitions.push({state:state,fromCurrentState:fromCurrentState,context:context,useHistory:useHistory});
return}this._gotoStateLocked=YES;if(!SC.none(fromCurrentState)){fromCurrentState=rootState.getSubstate(fromCurrentState);
if(SC.none(fromCurrentState)||!fromCurrentState.get("isCurrentState")){var msg="Can not to goto state %@. %@ is not a recognized current state in statechart";
SC.Logger.error(msg.fmt(paramState,paramFromCurrentState));this._gotoStateLocked=NO;
return}}else{if(this.getPath("currentStates.length")>0){fromCurrentState=this.get("currentStates")[0]
}}if(trace){SC.Logger.info("BEGIN gotoState: %@".fmt(state));SC.Logger.info("starting from current state: %@".fmt(fromCurrentState));
SC.Logger.info("current states before: %@".fmt(this.get("currentStates")))}if(!SC.none(fromCurrentState)){exitStates=this._createStateChain(fromCurrentState)
}enterStates=this._createStateChain(state);pivotState=this._findPivotState(exitStates,enterStates);
if(pivotState){if(trace){SC.Logger.info("pivot state = "+pivotState)}if(pivotState.get("substatesAreConcurrent")){SC.Logger.error("Can not go to state %@. Pivot state %@ has concurrent substates.".fmt(state,pivotState));
this._gotoStateLocked=NO;return}}var gotoStateActions=[];this._traverseStatesToExit(exitStates.shift(),exitStates,pivotState,gotoStateActions);
if(pivotState!==state){this._traverseStatesToEnter(enterStates.pop(),enterStates,pivotState,useHistory,gotoStateActions)
}else{this._traverseStatesToExit(pivotState,[],null,gotoStateActions);this._traverseStatesToEnter(pivotState,null,null,useHistory,gotoStateActions)
}this._executeGotoStateActions(state,gotoStateActions,context)},gotoStateActive:function(){return this._gotoStateLocked
}.property(),gotoStateSuspended:function(){return this._gotoStateLocked&&!!this._gotoStateSuspendedPoint
}.property(),resumeGotoState:function(){if(!this.get("gotoStateSuspended")){SC.Logger.error("Can not resume goto state since it has not been suspended");
return}var point=this._gotoStateSuspendedPoint;this._executeGotoStateActions(point.gotoState,point.actions,point.context,point.marker)
},_executeGotoStateActions:function(gotoState,actions,context,marker){var action=null,len=actions.length,actionResult=null;
marker=SC.none(marker)?0:marker;for(;marker<len;marker+=1){action=actions[marker];
switch(action.action){case SC.EXIT_STATE:actionResult=this._exitState(action.state);
break;case SC.ENTER_STATE:actionResult=this._enterState(action.state,action.currentState,context);
break}if(SC.kindOf(actionResult,SC.Async)){this._gotoStateSuspendedPoint={gotoState:gotoState,actions:actions,context:context,marker:marker+1};
actionResult.tryToPerform(action.state);return}}this.notifyPropertyChange("currentStates");
if(this.get("trace")){SC.Logger.info("current states after: %@".fmt(this.get("currentStates")));
SC.Logger.info("END gotoState: %@".fmt(gotoState))}this._gotoStateSuspendedPoint=null;
this._gotoStateLocked=NO;this._flushPendingStateTransition()},_exitState:function(state){if(state.get("currentSubstates").indexOf(state)>=0){var parentState=state.get("parentState");
while(parentState){parentState.get("currentSubstates").removeObject(state);parentState=parentState.get("parentState")
}}if(this.get("trace")){SC.Logger.info("exiting state: "+state)}state.set("currentSubstates",[]);
state.notifyPropertyChange("isCurrentState");var result=this.exitState(state);if(this.get("monitorIsActive")){this.get("monitor").pushExitedState(state)
}state._traverseStatesToExit_skipState=NO;return result},exitState:function(state){return state.exitState()
},_enterState:function(state,current,context){var parentState=state.get("parentState");
if(parentState&&!state.get("isConcurrentState")){parentState.set("historyState",state)
}if(current){parentState=state;while(parentState){parentState.get("currentSubstates").push(state);
parentState=parentState.get("parentState")}}if(this.get("trace")){SC.Logger.info("entering state: "+state)
}state.notifyPropertyChange("isCurrentState");var result=this.enterState(state,context);
if(this.get("monitorIsActive")){this.get("monitor").pushEnteredState(state)}return result
},enterState:function(state,context){return state.enterState(context)},gotoHistoryState:function(state,fromCurrentState,context,recursive){if(!this.get("statechartIsInitialized")){SC.Logger.error("can not go to state %@'s history state. Statechart has not yet been initialized".fmt(state));
return}state=this.getState(state);if(!state){SC.Logger.error("Can not to goto state %@'s history state. Not a recognized state in statechart".fmt(state));
return}var historyState=state.get("historyState");if(!recursive){if(historyState){this.gotoState(historyState,fromCurrentState,context)
}else{this.gotoState(state,fromCurrentState,context)}}else{this.gotoState(state,fromCurrentState,context,YES)
}},sendEvent:function(event,sender,context){var eventHandled=NO,currentStates=this.get("currentStates").slice(),len=0,i=0,responder=null;
if(this._sendEventLocked||this._goStateLocked){this._pendingSentEvents.push({event:event,sender:sender,context:context});
return}this._sendEventLocked=YES;len=currentStates.get("length");for(;i<len;i+=1){eventHandled=NO;
responder=currentStates[i];if(!responder.get("isCurrentState")){continue}while(!eventHandled&&responder){if(responder.tryToPerform){eventHandled=responder.tryToHandleEvent(event,sender,context)
}if(!eventHandled){responder=responder.get("parentState")}}}this._sendEventLocked=NO;
this._flushPendingSentEvents();return responder},_createStateChain:function(state){var chain=[];
while(state){chain.push(state);state=state.get("parentState")}return chain},_findPivotState:function(stateChain1,stateChain2){if(stateChain1.length===0||stateChain2.length===0){return null
}var pivot=stateChain1.find(function(state,index){if(stateChain2.indexOf(state)>=0){return YES
}});return pivot},_traverseStatesToExit:function(state,exitStatePath,stopState,gotoStateActions){if(!state||state===stopState){return
}var trace=this.get("trace");if(state.get("substatesAreConcurrent")){var i=0,currentSubstates=state.get("currentSubstates"),len=currentSubstates.length,currentState=null;
for(;i<len;i+=1){currentState=currentSubstates[i];if(currentState._traverseStatesToExit_skipState===YES){continue
}var chain=this._createStateChain(currentState);this._traverseStatesToExit(chain.shift(),chain,state,gotoStateActions)
}}gotoStateActions.push({action:SC.EXIT_STATE,state:state});if(state.get("isCurrentState")){state._traverseStatesToExit_skipState=YES
}this._traverseStatesToExit(exitStatePath.shift(),exitStatePath,stopState,gotoStateActions)
},_traverseStatesToEnter:function(state,enterStatePath,pivotState,useHistory,gotoStateActions){if(!state){return
}var trace=this.get("trace");if(pivotState){if(state!==pivotState){this._traverseStatesToEnter(enterStatePath.pop(),enterStatePath,pivotState,useHistory,gotoStateActions)
}else{this._traverseStatesToEnter(enterStatePath.pop(),enterStatePath,null,useHistory,gotoStateActions)
}}else{if(!enterStatePath||enterStatePath.length===0){var gotoStateAction={action:SC.ENTER_STATE,state:state,currentState:NO};
gotoStateActions.push(gotoStateAction);var initialSubstate=state.get("initialSubstate"),historyState=state.get("historyState");
if(state.get("substatesAreConcurrent")){this._traverseConcurrentStatesToEnter(state.get("substates"),null,useHistory,gotoStateActions)
}else{if(state.get("hasSubstates")&&historyState&&useHistory){this._traverseStatesToEnter(historyState,null,null,useHistory,gotoStateActions)
}else{if(initialSubstate){this._traverseStatesToEnter(initialSubstate,null,null,useHistory,gotoStateActions)
}else{gotoStateAction.currentState=YES}}}}else{if(enterStatePath.length>0){gotoStateActions.push({action:SC.ENTER_STATE,state:state});
var nextState=enterStatePath.pop();this._traverseStatesToEnter(nextState,enterStatePath,null,useHistory,gotoStateActions);
if(state.get("substatesAreConcurrent")){this._traverseConcurrentStatesToEnter(state.get("substates"),nextState,useHistory,gotoStateActions)
}}}}},_traverseConcurrentStatesToEnter:function(states,exclude,useHistory,gotoStateActions){var i=0,len=states.length,state=null;
for(;i<len;i+=1){state=states[i];if(state!==exclude){this._traverseStatesToEnter(state,null,null,useHistory,gotoStateActions)
}}},_flushPendingStateTransition:function(){var pending=this._pendingStateTransitions.shift();
if(!pending){return}this.gotoState(pending.state,pending.fromCurrentState,pending.context,pending.useHistory)
},_flushPendingSentEvents:function(){var pending=this._pendingSentEvents.shift();
if(!pending){return}this.sendEvent(pending.event,pending.sender,pending.context)},_monitorIsActiveDidChange:function(){if(this.get("monitorIsActive")&&SC.none(this.get("monitor"))){this.set("monitor",SC.StatechartMonitor.create())
}}.observes("monitorIsActive")};SC.ROOT_STATE_NAME="__ROOT_STATE__";SC.EXIT_STATE=0;
SC.ENTER_STATE=1;SC.Statechart=SC.Object.extend(SC.StatechartManager);SC.Async=SC.Object.extend({func:null,arg1:null,arg2:null,tryToPerform:function(state){var func=this.get("func"),arg1=this.get("arg1"),arg2=this.get("arg2"),funcType=SC.typeOf(func);
if(funcType===SC.T_STRING){state.tryToPerform(func,arg1,arg2)}else{if(funcType===SC.T_FUNCTION){func.apply(state,[arg1,arg2])
}}}});SC.Async.mixin({perform:function(func,arg1,arg2){return SC.Async.create({func:func,arg1:arg1,arg2:arg2})
}});