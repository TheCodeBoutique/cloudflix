SC.Designer=SC.Object.extend({});if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]
}CHANCE_SLICES=CHANCE_SLICES.concat([]);SC.ObjectCoder=SC.Object.extend({className:"SC.Object",extendMethodName:"extend",encodeMethodName:"encode",attributes:null,transform:function(val,func){if(SC.typeOf(val)===SC.T_ARRAY){val=val.map(function(x){return this.transform(x,func)
},this);val="["+val+"]"}else{val=func.call(this,val)}return val},js:function(key,val,transform){if(val===undefined){val=key;
key=undefined}val=this.transform(val,function(x){return(x===null)?"null":transform?transform.call(this,x):x
});if(key!==undefined&&(val!==undefined)){this.attributes[key]=val;return this}else{return val
}},string:function(key,val){return this.js(key,val,function(x){return'"'+x.replace(/"/g,'\\"')+'"'
})},number:function(key,val){return this.js(key,val,function(x){return x.toString()
})},bool:function(key,val){return this.js(key,val,function(x){return x?"true":"false"
})},encode:function(key,val,func){if(func===undefined&&val instanceof Function){func=val;
val=key;key=undefined}return this.js(key,val,function(cur){if(func){cur=func.call(this,cur,null,null)
}switch(SC.typeOf(cur)){case SC.T_STRING:cur=this.string(cur);break;case SC.T_NUMBER:cur=this.number(cur);
break;case SC.T_BOOL:cur=this.bool(cur);break;case SC.T_ARRAY:cur=this.array(cur,func);
break;case SC.T_HASH:cur=this.hash(cur,func);break;default:cur=cur?this.object(cur):this.js(cur)
}return cur})},hash:function(key,val,func){if(func===undefined&&val instanceof Function){func=val;
val=key;key=undefined}return this.js(key,val,function(x){var ret=[];for(var key in x){if(!x.hasOwnProperty(key)){continue
}ret.push("%@: %@".fmt(this.encode(key),this.encode(x[key],func)))}return"{%@}".fmt(ret.join(","))
})},array:function(key,val,func){if(func===undefined&&val instanceof Function){func=val;
val=key;key=undefined}val=val.map(function(x){return this.encode(x,func)},this);val="[%@]".fmt(val.join(","));
return this.js(key,val)},object:function(key,val){return this.js(key,val,function(x){return this.constructor.encode(x,this)
})},spaces:function(){var spaces=this.context?this.context.get("spaces"):"";spaces=spaces+"  ";
return spaces}.property().cacheable(),emit:function(){if(this.invalid){return undefined
}var ret=[],attrs=this.attributes,key;var methodName=this.get("extendMethodName");
var spaces=this.get("spaces");for(key in attrs){if(!attrs.hasOwnProperty(key)){continue
}ret.push("%@: %@".fmt(key,attrs[key]))}if(ret.length<=0){return"%@1%@2.%@3({})".fmt(spaces,this.className,methodName)
}else{ret=ret.join(",");return"%@2.%@3({%@4})".fmt(spaces,this.className,methodName,ret)
}},begin:function(object){var methodName=this.get("encodeMethodName");if(SC.typeOf(object[methodName])!==SC.T_FUNCTION){throw SC.$error("Cannot encode %@ because it does not respond to %@()".fmt(object,methodName))
}this.set("className",SC._object_className(object.constructor));var ret=object[methodName](this);
this.invalid=ret===NO;return this},init:function(){arguments.callee.base.apply(this,arguments);
this.set("attributes",{})},destroy:function(){arguments.callee.base.apply(this,arguments);
this.context=this.className=this.attributes=null}});SC.ObjectCoder.encode=function(object,context){var coder=this.create({context:context});
var ret=coder.begin(object).emit();coder.destroy();return ret};sc_require("coders/object");
SC.DesignCoder=SC.ObjectCoder.extend({extendMethodName:"design",encodeMethodName:"encodeDesign"});
SC.controllersController=SC.ArrayController.create({});SC.designController=SC.ObjectController.create({contentBinding:"SC.designsController.selection",contentBindingDefault:SC.Binding.single(),viewSelected:function(){var c=this.get("content"),pane,designer,pageController;
if(c){pane=c.get("view");if(pane.kindOf&&pane.kindOf(SC.View)){pageController=SC.designsController.getPath("page.designController");
designer=pane.get("designer");if(pageController&&designer){designer.set("designIsEnabled",NO);
pageController.makeRootDesigner(designer)}}else{if(SC._Greenhouse){SC._Greenhouse.designController.set("content",pane.get("designer"));
SC._Greenhouse.sendAction("floatInspector")}}}}});SC.designsController=SC.ArrayController.create(SC.CollectionViewDelegate,{setDesigns:function(page,iframe){var designs=[];
for(var v in page){if(page.hasOwnProperty(v)){if(v!=="__sc_super__"&&page[v]&&page[v].kindOf){if(page[v].kindOf(iframe.SC.Pane)){designs.push(SC.Object.create({type:"pane",view:page.get(v),name:v}))
}else{if(page[v].kindOf(iframe.SC.View)){designs.push(SC.Object.create({type:"view",view:page.get(v),name:v}))
}else{if(page[v].kindOf(iframe.SC.Page)){designs.push(SC.Object.create({type:"page",view:page.get(v),name:v}))
}else{if(page[v].kindOf(iframe.SC.Controller)){designs.push(SC.Object.create({type:"controller",name:v,view:page.get(v)}))
}else{if(page[v].kindOf(iframe.SC.Object)&&!page[v].isPageDesignController){designs.push(SC.Object.create({type:"controller",name:v,view:page.get(v)}))
}}}}}}}}this.set("content",designs);this.set("page",page)},collectionViewComputeDragOperations:function(view,drag,op){return SC.DRAG_ANY
},collectionViewValidateDragOperation:function(view,drag,op,proposedInsertionIndex,proposedDropOperation){var data=drag.dataForType("SC.Object");
if(data){return SC.DRAG_ANY}else{return(proposedDropOperation&SC.DROP_ON)?SC.DRAG_NONE:op
}},collectionViewPerformDragOperation:function(view,drag,op,proposedInsertionIndex,proposedDropOperation){var data=drag.dataForType("SC.Object"),page=this.get("page"),scClass,that=this;
if(data){var actionObj=SC.Object.create({data:data,addItemToPage:function(name){scClass=eval(this.getPath("data.scClass"));
var type=SC.kindOf(scClass,SC.View)?"view":"controller";page[name]=scClass.design().create({page:page});
that.pushObject(SC.Object.create({type:type,view:page.get(name),name:name}))}});SC._Greenhouse.sendAction("newPageElement",actionObj);
return SC.DRAG_ANY}return SC.DRAG_NONE}});SC.PageDesignController=SC.Object.extend({isPageDesignController:YES,selection:null,select:function(sel,extend){var base=this.get("selection");
if(!base||!extend||!base.contains(sel)){base=(!extend||!base)?SC.CoreSet.create():base.copy();
base.add(sel);this.set("selection",base.freeze());SC.designPage.getPath("designMainPane.container").becomeFirstResponder()
}return this},deselect:function(sel){var base=this.get("selection");if(base&&base.contains(sel)){base=base.copy();
base.remove(sel);this.set("selection",base.freeze())}return this},selectionDidChange:function(){var sel=this.get("selection"),oldSel=this._selection;
this._selection=sel;if(sel){sel.setEach("designIsSelected",YES)}if(oldSel){oldSel.forEach(function(s){if(!sel||!sel.contains(s)){s.set("designIsSelected",NO)
}},this)}}.observes("selection"),repositionSelection:function(evt,info){var sel=this.get("selection");
if(sel){sel.invoke("mouseReposition",evt,info)}},prepareReposition:function(info){var sel=this.get("selection");
if(sel){sel.invoke("prepareReposition",info)}},deleteSelection:function(){var sel=this.get("selection"),first,parentView;
if(sel&&sel.get("length")>0){first=sel.firstObject();this.deselect(first);first=first.get("view");
parentView=first.get("parentView");first.removeFromParent();if(parent.displayDidChange){parent.displayDidChange()
}first=null}},designers:null,registerDesigner:function(designer){this.get("designers").add(designer)
},rootDesigner:null,makeRootDesigner:function(designer){var currRoot=this.get("rootDesigner");
if(currRoot){currRoot.set("isRootDesigner",NO)}this.deselect(designer);designer.set("isRootDesigner",YES);
designer.set("prevRootDesigner",currRoot);this.set("rootDesigner",designer)},init:function(){this.designers=SC.Set.create();
this.sel=[];arguments.callee.base.apply(this,arguments)}});SC.pageFilesController=SC.ArrayController.create({});
SC.pageFilesController.mixin({pages:[],register:function(page){SC.pageFilesController.pages.pushObject(page)
}});SC.CSSStyle=SC.Object.extend({style:"",rule:null});sc_require("css/css_style");
SC.CSSRule=SC.Object.extend({});sc_require("css/css_rule");SC.CSSStyleSheet=SC.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
var ss=this.styleSheet;if(!ss){ss=this.styleSheet=document.createElement("style");
ss.type="text/css";var head=document.getElementsByTagName("head")[0];if(!head){head=document.documentElement
}head.appendChild(ss)}var ssObjects=this.constructor.styleSheets;if(!ssObjects){ssObjects=this.constructor.styleSheets={}
}ssObjects[SC.guidFor(ss)];var rules=ss.rules||SC.EMPTY_ARRAY;var array=SC.SparseArray.create(rules.length);
array.delegate=this;this.rules=array;return this},isEnabled:function(key,val){if(val!==undefined){this.styleSheet.disabled=!val
}return !this.styleSheet.disabled}.property(),isEnabledBindingDefault:SC.Binding.bool(),styleSheet:null,href:function(key,val){if(val!==undefined){this.styleSheet.href=val
}else{return this.styleSheet.href}}.property(),title:function(key,val){if(val!==undefined){this.styleSheet.title=val
}else{return this.styleSheet.title}}.property(),rules:null,insertRule:function(rule){var rules=this.get("rules")
},deleteRule:function(rule){var rules=this.get("rules");rules.removeObject(rule)},sparseArrayDidRequestIndex:function(array,idx){var rules=this.styleSheet.rules||SC.EMPTY_ARRAY;
var rule=rules[idx];if(rule){array.provideContentAtIndex(idx,SC.CSSRule.create({rule:rule,styleSheet:this}))
}},sparseArrayDidReplace:function(array,idx,amt,objects){var cssRules=objects.collect(function(obj){return obj.rule
});this.styleSheet.rules.replace(idx,amt,cssRules)}});SC.mixin(SC.CSSStyleSheet,{find:function(nameOrUrl){var isUrl=nameOrUrl?nameOrUrl.indexOf("/")>=0:NO;
if(!nameOrUrl){return null}if(!isUrl&&nameOrUrl.indexOf(".css")==-1){nameOrUrl=nameOrUrl+".css"
}var ssObjects=this.styleSheets;if(!ssObjects){ssObjects=this.styleSheets={}}var styleSheets=document.styleSheets;
var ss,ssName,ssObject,guid;for(var idx=0,len=styleSheets.length;idx<len;++idx){ss=styleSheets[idx];
if(isUrl){if(ss.href===nameOrUrl){guid=SC.guidFor(ss);ssObject=ssObjects[guid];if(!ssObject){ssObject=ssObjects[guid]=this.create({styleSheet:ss})
}return ssObject}}else{if(ssName=ss.href){ssName=ssName.split("/");ssName=ssName[ssName.length-1];
if(ssName==nameOrUrl){guid=SC.guidFor(ss);ssObject=ssObjects[guid];if(!ssObject){ssObject=ssObjects[guid]=this.create({styleSheet:ss})
}return ssObject}}}}return null},styleSheets:null});SC.RootDesignerHighLightView=SC.View.extend({designer:null,classNames:"high-light",render:function(context,firstTime){var targetFrame=this.get("targetFrame");
context.begin("div").classNames(["top","cover"]).addStyle({top:0,height:targetFrame.y,left:0,right:0}).end().begin("div").classNames(["bottom","cover"]).addStyle({top:targetFrame.y+targetFrame.height,bottom:0,left:0,right:0}).end().begin("div").classNames(["left","cover"]).addStyle({left:0,width:targetFrame.x,top:targetFrame.y,height:targetFrame.height}).end().begin("div").classNames(["right","cover"]).addStyle({left:targetFrame.x+targetFrame.width,right:0,top:targetFrame.y,height:targetFrame.height}).end()
}});sc_require("views/high_light");SC.ViewDesigner=SC.Object.extend({view:null,viewClass:null,designIsSelected:NO,designIsEnabled:YES,page:function(){var v=this.get("view");
return(v)?v.get("page"):null}.property("view").cacheable(),designController:function(){var p=this.get("page");
return(p)?p.get("designController"):null}.property("page").cacheable(),encodeChildViews:YES,concatenatedProperties:["designProperties","localizedProperties","excludeProperties"],canResizeHorizontal:YES,canResizeVertical:YES,canReposition:YES,minWidth:10,minHeight:10,maxWidth:100000000,maxHeight:100000000,layout:function(key,value){var view=this.get("view");
if(!view){return null}if(value!==undefined){view.set("layout",value)}return view.get("layout")
}.property("view").cacheable(),anchorLocation:function(key,value){var layout=this.get("layout"),K=SC.ViewDesigner,h,v,frame,view,pview,pframe,ret;
if(!layout){return null}if(value!==undefined){ret={};view=this.get("view");frame=view.get("frame");
pview=view.get("parentView");pframe=pview?pview.get("frame"):null;if(!pframe){pframe=SC.RootResponder.responder.computeWindowSize()
}if(value&K.ANCHOR_LEFT){ret.left=frame.x;ret.width=frame.width}else{if(value&K.ANCHOR_RIGHT){ret.right=(pframe.width-SC.maxX(frame));
ret.width=frame.width}else{if(value&K.ANCHOR_CENTERX){ret.centerX=Math.round(SC.midX(frame)-(pframe.width/2));
ret.width=frame.width}else{if(value&K.ANCHOR_WIDTH){ret.left=frame.x;ret.right=(pframe.width-SC.maxX(frame))
}}}}if(value&K.ANCHOR_TOP){ret.top=frame.y;ret.height=frame.height}else{if(value&K.ANCHOR_BOTTOM){ret.bottom=(pframe.height-SC.maxY(frame));
ret.height=frame.height}else{if(value&K.ANCHOR_CENTERY){ret.centerY=Math.round(SC.midY(frame)-(pframe.height/2));
ret.height=frame.height}else{if(value&K.ANCHOR_HEIGHT){ret.top=frame.y;ret.bottom=(pframe.height-SC.maxY(frame))
}}}}this.set("layout",ret);layout=ret}if(!SC.none(layout.left)){h=SC.none(layout.width)?K.ANCHOR_WIDTH:K.ANCHOR_LEFT
}else{if(!SC.none(layout.right)){h=K.ANCHOR_RIGHT}else{if(!SC.none(layout.centerX)){h=K.ANCHOR_CENTERX
}else{h=0}}}if(!SC.none(layout.top)){v=SC.none(layout.height)?K.ANCHOR_HEIGHT:K.ANCHOR_TOP
}else{if(!SC.none(layout.bottom)){v=K.ANCHOR_BOTTOM}else{if(!SC.none(layout.centerY)){v=K.ANCHOR_CENTERY
}else{v=0}}}return v|h}.property("layout").cacheable(),_layoutProperty:function(key,value){var layout=this.get("layout");
if(!layout){return null}if(!SC.none(layout)&&(value!==undefined)){layout=SC.copy(layout);
layout[key]=value;this.set("layout",layout)}return layout[key]},layoutTop:function(key,value){return this._layoutProperty("top",value)
}.property("layout").cacheable(),layoutBottom:function(key,value){return this._layoutProperty("bottom",value)
}.property("layout").cacheable(),layoutCenterY:function(key,value){return this._layoutProperty("centerY",value)
}.property("layout").cacheable(),layoutHeight:function(key,value){return this._layoutProperty("height",value)
}.property("layout").cacheable(),layoutTop:function(key,value){return this._layoutProperty("top",value)
}.property("layout").cacheable(),layoutLeft:function(key,value){return this._layoutProperty("left",value)
}.property("layout").cacheable(),layoutRight:function(key,value){return this._layoutProperty("right",value)
}.property("layout").cacheable(),layoutCenterX:function(key,value){return this._layoutProperty("centerX",value)
}.property("layout").cacheable(),layoutWidth:function(key,value){return this._layoutProperty("width",value)
}.property("layout").cacheable(),encodeSimpleProperties:function(props,coder){var view=this.get("view"),proto=this.get("viewClass").prototype;
props.forEach(function(prop){var val=view[prop];if(prop.length>7&&prop.slice(-7)==="Binding"&&val!==undefined){coder.js(prop,val.encodeDesign())
}else{if(val!==undefined&&(val!==proto[prop])){coder.encode(prop,val)}}},this)},designProperties:"layout isVisible isEnabled styleClass".w(),excludeProperties:"layout childViews".w(),editableProperties:function(){var con=this.get("designAttrs"),view=this.get("view"),ret=[],designProperties=this.get("designProperties"),excludeProperties=this.get("excludeProperties");
if(con){con=con[0]}for(var i in con){if(con.hasOwnProperty(i)&&excludeProperties.indexOf(i)<0){if(!SC.none(view[i])){ret.pushObject(SC.Object.create({value:view[i],key:i,view:view}))
}}}designProperties.forEach(function(k){if(excludeProperties.indexOf(k)<0){ret.pushObject(SC.Object.create({value:view[k],key:k,view:view}))
}});return ret}.property("designProperties").cacheable(),encodeDesign:function(coder){coder.set("className",SC._object_className(this.get("viewClass")));
this.encodeDesignProperties(coder);this.encodeDesignAttributeProperties(coder);this.encodeChildViewsDesign(coder);
return YES},encodeDesignProperties:function(coder){return this.encodeSimpleProperties(this.get("designProperties"),coder)
},encodeDesignAttributeProperties:function(coder){var designProps=this.get("designProperties"),designAttrs=this.get("designAttrs"),simpleProps=[];
if(designAttrs){designAttrs=designAttrs[0]}for(var attr in designAttrs){if(designAttrs.hasOwnProperty(attr)&&designProps.indexOf(attr)<0&&attr!=="childViews"){simpleProps.push(attr)
}}return this.encodeSimpleProperties(simpleProps,coder)},encodeChildViewsDesign:function(coder){if(!this.get("encodeChildViews")){return
}var view=this.view,childViews=view.get("childViews");if(childViews.length>0){coder.object("childViews",childViews)
}},localizedProperties:[],encodeLoc:function(coder){coder.set("className",SC._object_className(this.get("viewClass")));
this.encodeLocalizedProperties(coder);this.encodeChildViewsLoc(coder);return YES},encodeLocalizedProperties:function(coder){return this.encodeSimpleProperties(this.get("localizedProperties"),coder)
},encodeChildViewsLoc:function(coder){if(!this.get("encodeChildViews")){return}var view=this.view,childViews=view.childViews;
if(childViews.length>0){coder.object("childViews",childViews)}},awakeDesign:function(){},addView:function(view){this.view.appendChild(view)
},viewDidChange:function(){var view=this.get("view"),old=this._designer_view;if(view===old){return
}var func=this.viewPropertyDidChange;if(old){old.removeObserver("*",this,func)}this._designer_view=view;
if(view){view.addObserver("*",this,func)}this.viewPropertyDidChange(view,"*",null,null)
}.observes("view"),viewPropertyDidChange:function(view,key){if(key==="*"){this.allPropertiesDidChange()
}else{if(this[key]===undefined){this.notifyPropertyChange(key)}}if((key==="*")||(key==="layout")){if(this.get("designIsSelected")&&this._handles){this._handles.set("layout",SC.clone(view.get("layout")))
}}},unknownProperty:function(key,value){if(value!==undefined){this.view.set(key,value);
return value}else{return this.view.get(key)}},init:function(){this.awakeDesign();
arguments.callee.base.apply(this,arguments);this.viewDidChange();var c=this.get("designController");
if(c){c.registerDesigner(this)}},destroy:function(){arguments.callee.base.apply(this,arguments);
this.set("view",null)},designIsSelectedDidChange:function(){if(SC.kindOf(this.view,SC.Pane)){return this
}var isSel=this.get("designIsSelected");var handles=this._handles;if(isSel){if(!handles){handles=this._handles=SC.SelectionHandlesView.create({designer:this})
}var parent=this.view.get("parentView");if(!handles.get("parentView")!==parent){parent.appendChild(handles)
}handles.set("layout",this.view.get("layout"))}else{if(handles){if(handles.get("parentView")){handles.removeFromParent()
}}}}.observes("designIsSelected"),tryToPerform:function(methodName,arg1,arg2){var page=this.view?this.view.get("page"):null;
var isDesignMode=page?page.get("needsDesigner")||page.get("isDesignMode"):NO;if(isDesignMode){return arguments.callee.base.apply(this,arguments)
}else{return SC.Object.prototype.tryToPerform.apply(this.view,arguments)}},didCreateLayer:function(){},didUpdateLayer:function(){},willDestroyLayer:function(){},parentDesignerIsRoot:function(){var dc=this.get("designController"),view=this.get("view");
return dc.get("rootDesigner")===view.getPath("parentView.designer")}.property(),acceptRootDesigner:NO,isRootDesigner:NO,isRootDesignerDidChange:function(){var isRoot=this.get("isRootDesigner"),highLight=this._highLight;
if(isRoot&&this.get("designIsEnabled")){if(!highLight){highLight=this._highLight=SC.RootDesignerHighLightView.create({designer:this})
}var parent=this.view.get("parentView");highLight.set("targetFrame",this.view.get("frame"));
if(!highLight.get("parentView")!==parent){parent.insertBefore(highLight,this.view)
}}else{if(highLight){if(highLight.get("parentView")){highLight.removeFromParent()
}}}}.observes("isRootDesigner"),resignRootDesigner:function(){var prevRoot=this.get("prevRootDesigner");
if(this.get("isRootDesigner")&&prevRoot){var dc=this.get("designController");if(dc){dc.makeRootDesigner(prevRoot)
}}},shouldReleaseRootDesigner:function(evt){var frame=this.view.get("frame");if(this.get("isRootDesigner")&&!SC.pointInRect({x:evt.pageX,y:evt.pageY},frame)){this.resignRootDesigner();
return YES}return NO},HANDLE_MARGIN:10,mouseDown:function(evt){this.shouldReleaseRootDesigner(evt);
if(!this.get("designIsEnabled")||!this.get("parentDesignerIsRoot")){return NO}var view=this.get("view"),info,vert,horiz,repos,frame,pview,margin,canH,canV;
if(!view){return NO}this._mouseDownInfo=info={layout:SC.copy(view.get("layout")),selected:this.get("designIsSelected"),dragged:NO,metaKey:evt.metaKey||evt.shiftKey,source:this,x:evt.pageX,y:evt.pageY};
info.hanchor=info.vanchor=info.reposition=NO;repos=this.get("canReposition");horiz=vert=NO;
if(info.selected){frame=view.get("frame");pview=view.get("parentView");if(frame&&pview){frame=pview.convertFrameToView(frame,null)
}margin=this.HANDLE_MARGIN;if(frame){if(Math.abs(info.x-SC.minX(frame))<=margin){horiz="left"
}else{if(Math.abs(info.x-SC.maxX(frame))<=margin){horiz="right"}}if(Math.abs(info.y-SC.minY(frame))<=margin){vert="top"
}else{if(Math.abs(info.y-SC.maxY(frame))<=margin){vert="bottom"}}}canH=this.get("canResizeHorizontal");
canV=this.get("canResizeVertical");if(canH&&canV){if(!vert||!horiz){vert=horiz=NO
}}else{if(canH){vert=NO;if(Math.abs(info.y-SC.midY(frame))>margin){horiz=NO}}else{if(canV){horiz=NO;
if(Math.abs(info.x-SC.midX(frame))>margin){vert=NO}}else{horiz=vert=NO}}}}if(horiz){info.hanchor=horiz
}if(vert){info.vanchor=vert}if(!horiz&&!vert&&repos){info.reposition=YES}if(!info.selected){this.get("designController").select(this,info.metaKey)
}if(info.reposition){this.get("designController").prepareReposition(info)}return YES
},prepareReposition:function(info){var view=this.get("view"),layout=view?SC.copy(view.get("layout")):{};
info[SC.keyFor("layout",SC.guidFor(this))]=layout;return this},mouseDragged:function(evt){if(!this.get("designIsEnabled")||!this.get("parentDesignerIsRoot")){return NO
}var info=this._mouseDownInfo,view=this.get("view"),layout,startX,startY;if(evt.altKey&&SC._Greenhouse){startX=evt.pageX;
startY=evt.pageY;var dragLink=SC.DrawingView.create({layout:{left:0,top:0,right:0,bottom:0},startPoint:{x:startX,y:startY},endPoint:{x:startX,y:startY},_pointsDidChange:function(){var sp=this.get("startPoint"),ep=this.get("endPoint"),xDiff,yDiff,newLink;
xDiff=Math.abs(sp.x-ep.x);yDiff=Math.abs(sp.y-ep.y);if(xDiff>5||yDiff>5){newLink={};
newLink.shape=SC.LINE;newLink.start={x:sp.x,y:sp.y};newLink.end={x:ep.x,y:ep.y};newLink.style={color:"green",width:3};
this.setIfChanged("shapes",[newLink])}}.observes("startPoint","endPoint")});SC.designPage.get("designMainPane").appendChild(dragLink);
SC.Drag.start({event:evt,source:this,dragLink:dragLink,dragView:SC.View.create({layout:{left:0,top:0,width:0,height:0}}),ghost:NO,slideBack:YES,dataSource:this,anchorView:view})
}else{if(view&&(info.hanchor||info.vanchor)){layout=SC.copy(this.get("layout"));if(info.hanchor){this._mouseResize(evt,info,this.HKEYS,layout)
}if(info.vanchor){this._mouseResize(evt,info,this.VKEYS,layout)}this.set("layout",layout)
}else{if(info.reposition){this.get("designController").repositionSelection(evt,info)
}}}},dragDataTypes:["SC.Binding"],dragDataForType:function(drag,dataType){return dataType==="SC.Binding"?this.get("view"):null
},mouseUp:function(evt){if(!this.get("designIsEnabled")||!this.get("parentDesignerIsRoot")){return NO
}var info=this._mouseDownInfo;if(info.selected&&!info.dragged){var view=this.get("view"),frame=view?view.get("frame"):null,pview=view.get("parentView");
if(frame&&pview){frame=pview.convertFrameToView(frame,null)}if(!frame||SC.pointInRect({x:evt.pageX,y:evt.pageY},frame)){var controller=this.get("designController");
if(info.metaKey){controller.deselect(this)}else{controller.select(this,NO)}}}if(SC._Greenhouse&&evt.clickCount===2){var dc=this.get("designController");
if(this.acceptRootDesigner&&dc){dc.makeRootDesigner(this)}else{SC._Greenhouse.sendAction("openInspector",view)
}}this._mouseDownInfo=null;return YES},mouseReposition:function(evt,info){var layout=SC.copy(this.get("layout"));
this._mouseReposition(evt,info,this.HKEYS,layout);this._mouseReposition(evt,info,this.VKEYS,layout);
this.set("layout",layout);return this},HKEYS:{evtPoint:"pageX",point:"x",min:"minWidth",max:"maxWidth",head:"left",tail:"right",center:"centerX",size:"width",anchor:"hanchor"},VKEYS:{evtPoint:"pageY",point:"y",min:"minHeight",max:"maxHeight",head:"top",tail:"bottom",center:"centerY",size:"height",anchor:"vanchor"},_mouseResize:function(evt,info,keys,ret){var delta=evt[keys.evtPoint]-info[keys.point],layout=info.layout,view=this.get("view"),min=this.get(keys.min),max=this.get(keys.max),headKey=keys.head,tailKey=keys.tail,centerKey=keys.center,sizeKey=keys.size,hasHead=!SC.none(layout[keys.head]),hasTail=!SC.none(layout[keys.tail]),hasCenter=!SC.none(layout[keys.center]),hasSize=!SC.none(layout[keys.size]),w;
if(info[keys.anchor]===headKey){if(hasHead){if(hasSize){w=layout[sizeKey];ret[sizeKey]=Math.min(max,Math.max(min,Math.floor(layout[sizeKey]-delta)));
min=(layout[headKey]+w)-min;max=(layout[headKey]+w)-max;ret[headKey]=Math.max(max,Math.min(min,Math.floor(layout[headKey]+delta)))
}else{ret[headKey]=Math.floor(layout[headKey]+delta)}}else{if(hasTail||hasCenter){if(hasCenter){delta*=2
}ret[sizeKey]=Math.max(min,Math.min(max,Math.floor((layout[sizeKey]||0)-delta)))}else{ret[headKey]=Math.floor((layout[headKey]||0)+delta)
}}}else{if(info[keys.anchor]===tailKey){if(hasTail){if(hasSize){w=layout[sizeKey];
ret[sizeKey]=Math.min(max,Math.max(min,Math.floor(layout[sizeKey]+delta)));min=(layout[tailKey]+w)-min;
max=(layout[tailKey]+w)-max;ret[tailKey]=Math.max(max,Math.min(min,Math.floor(layout[tailKey]-delta)))
}else{ret[tailKey]=Math.floor(layout[tailKey]-delta)}}else{if(hasCenter){delta*=2
}ret[sizeKey]=Math.max(min,Math.min(max,Math.floor((layout[sizeKey]||0)+delta)))}}}return this
},_mouseReposition:function(evt,info,keys,ret){var delta=evt[keys.evtPoint]-info[keys.point],layout=info[SC.keyFor("layout",SC.guidFor(this))],view=this.get("view"),headKey=keys.head,tailKey=keys.tail,centerKey=keys.center,sizeKey=keys.size,hasHead=!SC.none(layout[headKey]),hasTail=!SC.none(layout[tailKey]),hasCenter=!SC.none(layout[centerKey]),hasSize=!SC.none(layout[sizeKey]),w;
if(hasHead&&hasTail&&!hasSize){return NO}if(hasHead){ret[headKey]=layout[headKey]+delta
}else{if(hasTail){ret[tailKey]=layout[tailKey]-delta}else{if(hasCenter){ret[centerKey]=layout[centerKey]+delta
}else{ret[headKey]=(layout[headKey]||0)+delta}}}return YES},dragSourceOperationMaskFor:function(drag,dropTarget){return SC.DRAG_LINK
},dragDidBegin:function(drag,loc){},dragDidMove:function(drag,loc){var dragLink=drag.dragLink;
var endX,endY,pv,frame,globalFrame;if(dragLink){pv=dragLink.get("parentView");frame=dragLink.get("frame");
globalFrame=pv?pv.convertFrameToView(frame,null):frame;if(globalFrame){endX=loc.x-globalFrame.x;
endY=loc.y-globalFrame.y;dragLink.set("endPoint",{x:endX,y:endY})}}},dragDidEnd:function(drag,loc,op){var dragLink=drag.dragLink;
if(dragLink){dragLink.destroy()}}});if(!SC.View.Designer){SC.View.Designer=SC.ViewDesigner
}SC.ViewDesigner.mixin({ANCHOR_LEFT:1,ANCHOR_RIGHT:2,ANCHOR_CENTERX:4,ANCHOR_WIDTH:16,ANCHOR_TOP:256,ANCHOR_BOTTOM:512,ANCHOR_CENTERY:1024,ANCHOR_HEIGHT:4096,didLoadDesign:function(designedView,sourceView,attrs){designedView.isDesign=YES;
designedView.designAttrs=attrs},didLoadLocalization:function(designedView,attrs){},didCreateView:function(view,attrs){var page=view.get("page"),design=view.constructor;
if(design.isDesign&&page&&page.get("needsDesigner")){var cur=design,origDesign=design;
while(cur&&!cur.Designer){cur=cur.superclass}var DesignerClass=(cur)?cur.Designer:SC.View.Designer;
while(design&&design.isDesign){design=design.superclass}if(!design){design=SC.View
}view.designer=DesignerClass.create({view:view,viewClass:design,designAttrs:origDesign.designAttrs})
}}});SC.View.prototype._orig_respondsTo=SC.View.prototype.respondsTo;SC.View.prototype._orig_tryToPerform=SC.View.prototype.tryToPerform;
SC.View.prototype._orig_createLayer=SC.View.prototype.createLayer;SC.View.prototype._orig_updateLayer=SC.View.prototype.updateLayer;
SC.View.prototype._orig_destroyLayer=SC.View.prototype.destroyLayer;SC.View.prototype.respondsTo=function(methodName){if(this.designer){var ret=!!(SC.typeOf(this[methodName])===SC.T_FUNCTION);
ret=ret||this.designer.respondsTo(methodName);return ret}else{return this._orig_respondsTo(methodName)
}};SC.View.prototype.tryToPerform=function(methodName,arg1,arg2){if(this.designer){return this.designer.tryToPerform(methodName,arg1,arg2)
}else{return this._orig_tryToPerform(methodName,arg1,arg2)}};SC.View.prototype.createLayer=function(){var ret=this._orig_createLayer.apply(this,arguments);
if(this.designer){this.designer.didCreateLayer()}return ret};SC.View.prototype.updateLayer=function(){var ret=this._orig_updateLayer.apply(this,arguments);
if(this.designer){this.designer.didUpdateLayer()}return ret};SC.View.prototype.destroyLayer=function(){if(this.designer){this.designer.willDestroyLayer()
}return this._orig_destroyLayer.apply(this,arguments)};SC.Button.Designer={designProperties:"title".w()};
sc_require("designers/view_designer");sc_require("mixins/button");SC.ButtonView.Designer=SC.ViewDesigner.extend(SC.Button.Designer,{encodeChildViews:NO,designProperties:"theme buttonBehavior href isDefault".w(),canResizeVertical:NO,canResizeHorizontal:YES});
sc_require("designers/view_designer");SC.LabelView.Designer=SC.ViewDesigner.extend({encodeChildViews:NO,designProperties:"value escapeHTML".w()});
SC.ObjectDesigner=SC.Object.extend({object:null,objectClass:null,designIsSelected:NO,designIsEnabled:YES,page:function(){var v=this.get("object");
return(v)?v.get("page"):null}.property("object").cacheable(),designController:function(){var p=this.get("page");
return(p)?p.get("designController"):null}.property("page").cacheable(),concatenatedProperties:["designProperties","localizedProperties","excludeProperties"],encodeSimpleProperties:function(props,coder){var object=this.get("object"),proto=this.get("objectClass").prototype;
props.forEach(function(prop){var val=object[prop];if(val!==undefined&&(val!==proto[prop])){coder.encode(prop,val)
}},this)},designProperties:[],excludeProperties:[],editableProperties:function(){var con=this.get("designAttrs"),obj=this.get("object"),ret=[],designProperties=this.get("designProperties"),excludeProperties=this.get("excludeProperties");
if(con){con=con[0]}for(var i in con){if(con.hasOwnProperty(i)&&excludeProperties.indexOf(i)<0){if(!SC.none(obj[i])){ret.pushObject(SC.Object.create({value:obj[i],key:i,view:obj}))
}}}designProperties.forEach(function(k){if(excludeProperties.indexOf(k)<0){ret.pushObject(SC.Object.create({value:obj[k],key:k,view:obj}))
}});return ret}.property("designProperties").cacheable(),encodeDesign:function(coder){coder.set("className",SC._object_className(this.get("objectClass")));
this.encodeDesignProperties(coder);return YES},encodeDesignProperties:function(coder){return this.encodeSimpleProperties(this.get("designProperties"),coder)
},localizedProperties:[],encodeLoc:function(coder){coder.set("className",SC._object_className(this.get("objectClass")));
this.encodeLocalizedProperties(coder);return YES},encodeLocalizedProperties:function(coder){return this.encodeSimpleProperties(this.get("localizedProperties"),coder)
},awakeDesign:function(){},unknownProperty:function(key,value){if(value!==undefined){this.object.set(key,value);
return value}else{return this.object.get(key)}},init:function(){this.awakeDesign();
arguments.callee.base.apply(this,arguments);var c=this.get("designController");if(c){c.registerDesigner(this)
}},destroy:function(){arguments.callee.base.apply(this,arguments);this.set("object",null)
},tryToPerform:function(methodName,arg1,arg2){var page=this.object?this.object.get("page"):null;
var isDesignMode=page?page.get("needsDesigner")||page.get("isDesignMode"):NO;if(isDesignMode){return arguments.callee.base.apply(this,arguments)
}else{return SC.Object.prototype.tryToPerform.apply(this.object,arguments)}}});if(!SC.Object.Designer){SC.Object.Designer=SC.ObjectDesigner
}SC.ObjectDesigner.mixin({didLoadDesign:function(designedObject,sourceObject,attrs){designedObject.isDesign=YES;
designedObject.designAttrs=attrs},didLoadLocalization:function(designedObject,attrs){},didCreateObject:function(object,attrs){var page=object.get("page"),design=object.constructor;
if(design.isDesign&&page&&page.get("needsDesigner")){var cur=design,origDesign=design;
while(cur&&!cur.Designer){cur=cur.superclass}var DesignerClass=(cur)?cur.Designer:SC.Object.Designer;
while(design&&design.isDesign){design=design.superclass}if(!design){design=SC.Object
}object.designer=DesignerClass.create({object:object,objectClass:design,designAttrs:origDesign.designAttrs})
}}});sc_require("designers/view_designer");SC.TabView.Designer=SC.ViewDesigner.extend({encodeChildViews:NO,acceptRootDesigner:YES,designProperties:"nowShowing items itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey tabLocation userDefaultKey".w()});
sc_require("designers/view_designer");SC.TextFieldView.Designer=SC.ViewDesigner.extend({encodeChildViews:NO,designProperties:"isPassword isTextArea hint".w()});
SC.Binding.isBinding=true;SC.Binding.displayValue=function(){var from=this._fromRoot?"<%@>:%@".fmt(this._fromRoot,this._fromPropertyPath):this._fromPropertyPath;
var to=this._toPropertyPath;var oneWay=this._oneWay?"[oneWay]":"";return"%@ -> %@ %@".fmt(from,to,oneWay)
};SC.Binding.encodeDesign=function(coder){var ret="SC.Binding";if(this._fromPropertyPath){ret=ret+".from('"+this._fromPropertyPath+"')"
}if(this._oneWay){ret=ret+".oneWay()"}return ret};SC.Object.prototype.emitDesign=function(){var ret=SC.ObjectCoder.encode(this);
return ret};SC.Object.prototype.encodeDesign=function(coder){return this.designer?this.designer.encodeDesign(coder):NO
};SC.Page.prototype.emitDesign=function(){this.awake();var pageName=this.get("pageName");
var ret=SC.DesignCoder.encode(this);ret=["// SproutCore ViewBuilder Design Format v1.0","// WARNING: This file is automatically generated.  DO NOT EDIT.  Changes you","// make to this file will be lost.","","%@ = %@;".fmt(pageName,ret),""].join("\n");
return ret};SC.Page.prototype.designController=function(){if(!this._designController){this._designController=SC.PageDesignController.create({page:this})
}return this._designController}.property().cacheable();SC.Page.prototype.encodeDesign=function(c){for(var key in this){if(!this.hasOwnProperty(key)){continue
}var view=this[key];if(key!=="__sc_super__"&&key!=="_designController"&&(view instanceof SC.View||view instanceof SC.Controller||view instanceof SC.Object)){c.js(key,view.emitDesign())
}}c.string("pageName",this.get("pageName"))};SC.View.prototype.emitDesign=function(){var ret=SC.DesignCoder.encode(this);
return ret};SC.View.prototype.encodeDesign=function(coder){return this.designer?this.designer.encodeDesign(coder):NO
};SC.LINE="line";SC.RECT="rect";SC.CIRCLE="circle";SC.POLY="poly";SC.FILL="fill";
SC.STROKE="stroke";SC.DrawingView=SC.View.extend({classNames:"scui-drawing-view",shapes:[],_drawingManager:{},shapesDidChange:function(){this.set("layerNeedsUpdate",YES);
this.updateLayerIfNeeded()}.observes("*shapes.[]"),init:function(){arguments.callee.base.apply(this,arguments);
this.registerShapeDrawing(SC.LINE,function(ctx,params){if(params.style){if(params.style.width){ctx.lineWidth=params.style.width
}if(params.style.color){ctx.strokeStyle=params.style.color}if(params.style.transparency){ctx.globalAlpha=params.style.transparency
}}ctx.beginPath();ctx.moveTo(params.start.x,params.start.y);ctx.lineTo(params.end.x,params.end.y);
ctx.stroke()});this.registerShapeDrawing(SC.RECT,function(ctx,params){if(params.style){if(params.style.width){ctx.lineWidth=params.style.width
}if(params.style.color){ctx.fillStyle=ctx.strokeStyle=params.style.color}if(params.style.transparency){ctx.globalAlpha=params.style.transparency
}}switch(params.type){case SC.FILL:ctx.fillRect(params.start.x,params.start.y,params.size.width,params.size.height);
break;case SC.STROKE:ctx.strokeRect(params.start.x,params.start.y,params.size.width,params.size.height);
break;default:ctx.clearRect(params.start.x,params.start.y,params.size.width,params.size.height);
break}});this.registerShapeDrawing(SC.CIRCLE,function(ctx,params){if(params.style){if(params.style.width){ctx.lineWidth=params.style.width
}if(params.style.color){ctx.fillStyle=ctx.strokeStyle=params.style.color}if(params.style.transparency){ctx.globalAlpha=params.style.transparency
}}ctx.beginPath();ctx.arc(params.center.x,params.center.y,params.radius,0,Math.PI*2,true);
if(params.type===SC.FILL){ctx.fill()}else{ctx.stroke()}});this.registerShapeDrawing(SC.POLY,function(ctx,params){if(params.style){if(params.style.width){ctx.lineWidth=params.style.width
}if(params.style.color){ctx.fillStyle=ctx.strokeStyle=params.style.color}if(params.style.transparency){ctx.globalAlpha=params.style.transparency
}}ctx.beginPath();var len=params.path?params.path.length:0;if(len<2){return}var path=params.path,curr;
ctx.moveTo(path[0].x,path[0].y);for(var i=1;i<len;i++){curr=path[i];ctx.lineTo(curr.x,curr.y)
}ctx.lineTo(path[0].x,path[0].y);if(params.type===SC.FILL){ctx.fill()}else{ctx.stroke()
}})},render:function(context,firstTime){var frame=this.get("frame");if(firstTime){if(!SC.browser.msie){context.push('<canvas class="base-layer" width="%@" height="%@">You can\'t use canvas tags</canvas>'.fmt(frame.width,frame.height))
}}else{var canvasElem=this.$("canvas.base-layer");if(canvasElem){canvasElem.attr("width",frame.width);
canvasElem.attr("height",frame.height);if(canvasElem.length>0){var cntx=canvasElem[0].getContext("2d");
if(cntx){cntx.clearRect(0,0,frame.width,frame.height);this._drawShapes(cntx)}else{SC.Logger.error("SC.DrawingView.render(): Canvas object context is not accessible.")
}}else{SC.Logger.error("SC.DrawingView.render(): Canvas element array length is zero.")
}}else{SC.Logger.error("SC.DrawingView.render(): Canvas element is not accessible.")
}}return arguments.callee.base.apply(this,arguments)},registerShapeDrawing:function(name,drawingFunction){if(!name){SC.Logger.error("Can't register this drawing paradigm because name is null");
return NO}this._drawingManager[name]=drawingFunction;this.set("layerNeedsUpdate",YES);
this.updateLayerIfNeeded();return YES},_drawShapes:function(cntx){var curr;var shapes=this.get("shapes");
var drawingFunc;for(var i=0,len=shapes.length;i<len;i++){curr=shapes[i];drawingFunc=this._drawingManager[curr.shape];
if(drawingFunc){drawingFunc(cntx,curr)}}}});sc_require("views/drawing");SC.SNAP_ZONE=2;
SC.SNAP_LINE={shape:SC.LINE,start:{x:0,y:0},end:{x:0,y:0},style:{width:0.5,color:"#00c6ff"}};
SC.SnapLines={hasSnapLines:YES,setupData:function(ignoreViews){if(!ignoreViews){ignoreViews=[]
}this.removeLines();this._xPositions={};this._yPositions={};var xPositions=this._xPositions,yPositions=this._yPositions,children=this.get("childViews"),that=this,parentView,frame,minX,midX,maxX,minY,midY,maxY,factor=(SC.SNAP_ZONE*2);
var insert=function(min,mid,max,child,positions){var origMin=min,origMid=mid,origMax=max;
min=Math.floor(min/factor);mid=Math.floor(mid/factor);max=Math.floor(max/factor);
if(positions[min]){positions[min].push({value:origMin,child:child})}else{positions[min]=[{value:origMin,child:child}]
}if(positions[mid]){positions[mid].push({value:origMid,child:child})}else{positions[mid]=[{value:origMid,child:child}]
}if(positions[max]){positions[max].push({value:origMax,child:child})}else{positions[max]=[{value:origMax,child:child}]
}};parent=this;children.forEach(function(child){if(ignoreViews.indexOf(child)<0){frame=parent?parent.convertFrameToView(child.get("frame"),null):child.get("frame");
minX=frame.x;midX=SC.midX(frame);maxX=frame.x+frame.width;insert(minX,midX,maxX,child,xPositions);
minY=frame.y;midY=SC.midY(frame);maxY=frame.y+frame.height;insert(minY,midY,maxY,child,yPositions)
}});parent=this.get("parentView");frame=parent?parent.convertFrameToView(this.get("frame"),null):this.get("frame");
this._globalFrame=frame;minX=frame.x;midX=SC.midX(frame);maxX=frame.x+frame.width;
insert(minX,midX,maxX,this,xPositions);minY=frame.y;midY=SC.midY(frame);maxY=frame.y+frame.height;
insert(minY,midY,maxY,this,yPositions)},drawLines:function(view,eventX,eventY,mouseDownX,mouseDownY){if(!this._drawingView){this._drawingView=this.createChildView(SC.DrawingView.design({shapes:[]}));
this.appendChild(this._drawingView)}var factor=(SC.SNAP_ZONE*2),shapes=[],xline,yline,frame,parent,rMinX,rMidX,rMaxX,rMinY,rMidY,rMaxY,rMinXMod,rMidXMod,rMaxXMod,rMinYMod,rMidYMod,rMaxYMod,xHit,yHit,moveDirection=this._dragDirection(eventX,eventY,mouseDownX,mouseDownY),xValues,yValues,that=this,xHitVals,yHitVals,ret;
parent=view.get("parentView");frame=parent?parent.convertFrameToView(view.get("frame"),null):view.get("frame");
rMinX=SC.minX(frame);rMidX=SC.midX(frame);rMaxX=SC.maxX(frame);rMinY=SC.minY(frame);
rMidY=SC.midY(frame);rMaxY=SC.maxY(frame);rMinXMod=Math.floor(rMinX/factor);rMidXMod=Math.floor(rMidX/factor);
rMaxXMod=Math.floor(rMaxX/factor);rMinYMod=Math.floor(rMinY/factor);rMidYMod=Math.floor(rMidY/factor);
rMaxYMod=Math.floor(rMaxY/factor);xValues=moveDirection.UP?[{mod:rMinXMod,val:0},{mod:rMidXMod,val:frame.width/2},{mod:rMaxXMod,val:frame.width}]:[{mod:rMaxXMod,val:frame.width},{mod:rMidXMod,val:frame.width/2},{mod:rMinXMod,val:0}];
xValues.forEach(function(xVal){if(that._xPositions[xVal.mod]){xHitVals=xVal;xHit=that._xPositions[xVal.mod][0].value-that._globalFrame.x;
return}});if(!SC.none(xHit)){xline=SC.copy(SC.SNAP_LINE);xline.start={x:xHit,y:0};
xline.end={x:xHit,y:this._globalFrame.height};shapes.push(xline)}yValues=moveDirection.LEFT?[{mod:rMinYMod,val:0},{mod:rMidYMod,val:frame.height/2},{mod:rMaxYMod,val:frame.height}]:[{mod:rMaxYMod,val:frame.height},{mod:rMidYMod,val:frame.height/2},{mod:rMinYMod,val:0}];
yValues.forEach(function(yVal){if(that._yPositions[yVal.mod]){yHitVals=yVal;yHit=that._yPositions[yVal.mod][0].value-that._globalFrame.y;
return}});if(!SC.none(yHit)){yline=SC.copy(SC.SNAP_LINE);yline.start={y:yHit,x:0};
yline.end={y:yHit,x:this._globalFrame.width};shapes.push(yline)}this._drawingView.set("shapes",shapes);
ret={pageX:xHit+this._globalFrame.x,pageY:yHit+this._globalFrame.y,frameX:xHit,frameY:yHit};
if(xHitVals){ret.pageX-=xHitVals.val;ret.frameX-=xHitVals.val}if(yHitVals){ret.pageY-=yHitVals.val;
ret.frameY-=yHitVals.val}return ret},removeLines:function(){this._xPositions=null;
this._yPositions=null;this._globalFrame=null;if(this._drawingView){this.removeChild(this._drawingView);
this._drawingView=null}},_dragDirection:function(eventX,eventY,mouseDownX,mouseDownY){var deltaX=eventX-mouseDownX,deltaY=eventY-mouseDownY,ret={};
ret.UP=deltaX>0?NO:YES;ret.DOWN=deltaX>0?YES:NO;ret.LEFT=deltaY>0?NO:YES;ret.RIGHT=deltaY>0?YES:NO;
return ret}};SC.DesignerDropTarget=SC.ContainerView.extend({inGlobalOffset:YES,acceptsFirstResponder:YES,keyDown:function(evt){return this.interpretKeyEvents(evt)
},keyUp:function(evt){return YES},deleteForward:function(evt){var c=SC.designsController.getPath("page.designController");
if(c){c.deleteSelection()}return YES},deleteBackward:function(evt){var c=SC.designsController.getPath("page.designController");
if(c){c.deleteSelection()}return YES},moveLeft:function(sender,evt){return YES},moveRight:function(sender,evt){return YES
},moveUp:function(sender,evt){return YES},moveDown:function(sender,evt){return YES
},isDropTarget:YES,targetIsInIFrame:YES,dragStarted:function(drag,evt){},dragEntered:function(drag,evt){},dragUpdated:function(drag,evt){},dragExited:function(drag,evt){},dragEnded:function(drag,evt){},computeDragOperations:function(drag,evt){return SC.DRAG_ANY
},acceptDragOperation:function(drag,op){var data=drag.dataForType("SC.Object"),scClass=eval(data.get("scClass"));
return scClass.kindOf(SC.View)},performDragOperation:function(drag,op){var data=drag.dataForType("SC.Object"),cv=this.get("contentView"),loc=drag.get("location"),iframeOffset=drag.globalTargetOffset,design,size,newView,defaults,layout;
var page=cv.get("page");var designController=page.get("designController"),rootDesigner=designController.get("rootDesigner");
var rootDesignerFrame=rootDesigner.get("frame");size=data.get("size");loc.x=loc.x-iframeOffset.x-rootDesignerFrame.x;
loc.y=loc.y-iframeOffset.y-rootDesignerFrame.y;design=eval(data.get("scClass"));defaults=data.get("defaults")||{};
layout=defaults.layout||{};layout=SC.merge(layout,{top:loc.y,left:loc.x});if(!layout.width){layout.width=drag.getPath("ghostView.layout").width
}if(!layout.height){layout.height=drag.getPath("ghostView.layout").height}defaults.layout=layout;
design=design.design(defaults);newView=design.create({page:page});if(rootDesigner&&newView){rootDesigner.addView(newView)
}page.get("designController").select(newView.get("designer"));return SC.DRAG_ANY}});
SC.pageItemView=SC.ListItemView.extend({isDropTarget:YES,dragEntered:function(drag,evt){this.$().addClass("highlight")
},dragExited:function(drag,evt){this.$().removeClass("highlight")},dragEnded:function(drag,evt){this.$().removeClass("highlight")
},computeDragOperations:function(drag,evt){if(drag.hasDataType("SC.Binding")){return SC.DRAG_LINK
}return SC.DRAG_NONE},acceptDragOperation:function(drag,op){return YES},performDragOperation:function(drag,op){var data=drag.dataForType("SC.Binding"),that=this;
if(data&&SC._Greenhouse){var actionObj=SC.Object.create({type:"Binding",source:data,target:that.get("content"),addItem:function(from,to,designAttrs){var view=this.getPath("source");
var value=that._propertyPathForProp(this.getPath("target.view.page"),this.getPath("target.view"));
view[from+"Binding"]=designAttrs[from+"Binding"]=value+"."+to;view.propertyDidChange(from+"Binding");
var designer=view.get("designer");if(designer){designer.designProperties.pushObject(from+"Binding");
designer.propertyDidChange("editableProperties")}if(view.displayDidChange){view.displayDidChange()
}}});SC._Greenhouse.sendAction("newBindingPopup",actionObj);return SC.DRAG_LINK}else{return SC.DRAG_NONE
}},_propertyPathForProp:function(page,prop){for(var key in page){if(page.hasOwnProperty(key)){if(page[key]===prop){return page.get("pageName")+"."+key.toString()
}}}}});SC.SelectionHandlesView=SC.View.extend({designer:null,classNames:"handles",render:function(context,firstTime){var designer=this.get("designer"),vertical=designer?designer.get("canResizeVertical"):NO,horizontal=designer?designer.get("canResizeHorizontal"):NO,handles;
if(firstTime||(vertical!==this._vertical)||(horizontal===this._horizontal)){this._vertical=vertical;
this._horizontal=horizontal;if(vertical&&horizontal){handles=["top left","top right","bottom left","bottom right"]
}else{if(vertical){handles="top bottom".w()}else{if(horizontal){handles="left right".w()
}else{handles=[]}}}handles.forEach(function(classNames){context.begin("span").classNames(classNames.w()).addClass("handle").end()
},this)}},mouseDown:function(evt){var d=this.designer;return(d&&d.mouseDown)?d.mouseDown(evt):null
},mouseUp:function(evt){var d=this.designer;return(d&&d.mouseUp)?d.mouseUp(evt):null
},mouseMoved:function(evt){var d=this.designer;return(d&&d.mouseMoved)?d.mouseMoved(evt):null
},mouseDragged:function(evt){var d=this.designer;return(d&&d.mouseDragged)?d.mouseDragged(evt):null
}});require("views/designer_drop_target");require("views/page_item_view");SC.designPage=SC.Page.create({designMainPane:SC.MainPane.design({classNames:["workspace"],childViews:"rotated container viewList".w(),container:SC.DesignerDropTarget.design({layout:{top:20,left:20,right:20,bottom:83},classNames:["design"],contentViewBinding:SC.Binding.transform(function(value,binding){return value&&value.kindOf&&value.kindOf(SC.View)?value:null
}).from("SC.designController.view")}),rotated:SC.View.design({layout:{top:20,left:20,right:20,bottom:83},classNames:["rotated-page"]}),viewList:SC.ScrollView.design({layout:{left:0,right:0,bottom:0,height:63},classNames:["dock"],hasBorder:NO,hasVerticalScroller:NO,contentView:SC.GridView.design({contentIconKey:"type",exampleView:SC.pageItemView,rowHeight:63,columnWidth:100,hasContentIcon:YES,delegate:SC.designsController,selectionBinding:"SC.designsController.selection",contentValueKey:"name",isDropTarget:YES,canEditContent:YES,canReorderContent:YES,canDeleteContent:YES,actOnSelect:YES,targetIsInIFrame:YES,target:"SC.designController",action:"viewSelected"})})})});