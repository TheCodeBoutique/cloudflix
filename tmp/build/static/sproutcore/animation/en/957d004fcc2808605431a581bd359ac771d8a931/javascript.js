SC.Animatable={isAnimatable:YES,transitions:{},concatenatedProperties:["transitions"],style:{},_cssTransitionFor:{left:"left",top:"top",right:"right",bottom:"bottom",width:"width",height:"height",opacity:"opacity",transform:(SC.platform.supportsCSSTransforms?"-"+SC.platform.cssPrefix+"-transform":"transform")},_styleProperties:["display","transform"],_layoutStyles:"width height top bottom marginLeft marginTop left right zIndex minWidth maxWidth minHeight maxHeight centerX centerY opacity border borderTop borderRight borderBottom borderLeft".w(),_animationsToStart:{},_animationOrder:["top","left","bottom","right","width","height","centerX","centerY","opacity","display","transform"],initMixin:function(){this._animatable_original_didCreateLayer=this.didCreateLayer||function(){};
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