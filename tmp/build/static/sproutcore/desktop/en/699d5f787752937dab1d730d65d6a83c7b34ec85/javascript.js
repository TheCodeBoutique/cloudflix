SC.stringsFor("English",{"Invalid.CreditCard(%@)":"%@ is not a valid credit card number","Invalid.Email(%@)":"%@ is not a valid email address","Invalid.NotEmpty(%@)":"%@ must not be empty","Invalid.Password":"Your passwords do not match.  Please try typing them again.","Invalid.General(%@)":"%@ is invalid.  Please try again.","Invalid.Number(%@)":"%@ is not a number."});
SC.allowsBackspaceToPreviousPage=NO;if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]
}CHANCE_SLICES=CHANCE_SLICES.concat([]);SC.BORDER_BEZEL="sc-bezel-border";SC.BORDER_BLACK="sc-black-border";
SC.BORDER_GRAY="sc-gray-border";SC.BORDER_TOP="sc-top-border";SC.BORDER_BOTTOM="sc-bottom-border";
SC.BORDER_NONE=null;SC.Border={borderTop:0,borderRight:0,borderBottom:0,borderLeft:0,borderStyle:SC.BORDER_GRAY,hasBorder:YES,displayProperties:["borderStyle"],_BORDER_REGEXP:(/-border$/),initMixin:function(){console.warn("SC.Border is deprecated, please set border in your layout");
this._sc_border_borderStyleDidChange();this._sc_border_borderDimensionsDidChange()
},renderMixin:function(context,firstTime){var style=this.get("borderStyle");if(style){if(this._BORDER_REGEXP.exec(style)){context.addClass(style)
}else{context.addStyle("border","1px "+style+" solid")}}},_sc_border_borderStyleDidChange:function(){var borderStyle=this.get("borderStyle"),borderSize=SC.Border.dimensions[borderStyle];
if(borderSize){this.beginPropertyChanges();this.set("borderTop",borderSize);this.set("borderRight",borderSize);
this.set("borderBottom",borderSize);this.set("borderLeft",borderSize);this.endPropertyChanges()
}},_sc_border_borderDimensionsDidChange:function(){var borderTop=this.get("borderTop"),borderRight=this.get("borderRight"),borderBottom=this.get("borderBottom"),borderLeft=this.get("borderLeft");
this.adjust({borderTop:borderTop,borderRight:borderRight,borderBottom:borderBottom,borderLeft:borderLeft})
}.observes("borderTop","borderRight","borderBottom","borderLeft")};SC.mixin(SC.Border,{dimensions:{"sc-bezel-border":1,"sc-black-border":1,"sc-gray-border":1,"sc-top-border":1,"sc-bottom-border":1}});
SC.CollectionFastPath={initMixin:function(){this._indexMap={}},poolForExampleView:function(exampleView){var poolKey="_pool_"+SC.guidFor(exampleView);
if(!this[poolKey]){this[poolKey]=[]}return this[poolKey]},createItemViewFromExampleView:function(exampleView,attrs){var ret=this.createItemView(exampleView,null,attrs);
if(ret.isPoolable){ret.owningPool=this.poolForExampleView(exampleView)}ret.createdFromExampleView=exampleView;
return ret},configureItemView:function(itemView,attrs){itemView.beginPropertyChanges();
itemView.setIfChanged("content",attrs.content);itemView.setIfChanged("contentIndex",attrs.contentIndex);
itemView.setIfChanged("parentView",attrs.parentView);itemView.setIfChanged("layerId",attrs.layerId);
itemView.setIfChanged("isEnabled",attrs.isEnabled);itemView.setIfChanged("isSelected",attrs.isSelected);
itemView.setIfChanged("outlineLevel",attrs.outlineLevel);itemView.setIfChanged("layout",attrs.layout);
itemView.setIfChanged("disclosureState",attrs.disclosureState);itemView.setIfChanged("isVisibleInWindow",attrs.isVisibleInWindow);
itemView.setIfChanged("isGroupView",attrs.isGroupView);itemView.setIfChanged("page",this.page);
itemView.endPropertyChanges()},wakePooledView:function(itemView,attrs){this.configureItemView(itemView,attrs);
if(itemView.awakeFromPool){itemView.awakeFromPool(itemView.owningPool,this)}},allocateItemView:function(exampleView,attrs){var ret;
if(exampleView.prototype.isPoolable){var pool=this.poolForExampleView(exampleView);
if(pool.length>0){ret=pool.pop();this.wakePooledView(ret,attrs)}}if(!ret){ret=this.createItemViewFromExampleView(exampleView,attrs)
}return ret},releaseItemView:function(itemView){if(!itemView.isPoolable){itemView.destroy();
return}var pool=itemView.owningPool;pool.push(itemView);if(itemView.hibernateInPool){itemView.hibernateInPool(pool,this)
}},contentIndexIsGroup:function(view,content,index){var contentDelegate=this.get("contentDelegate");
var groupIndexes=this.get("_contentGroupIndexes"),isGroupView=NO;isGroupView=groupIndexes&&groupIndexes.contains(index);
if(isGroupView){isGroupView=contentDelegate.contentIndexIsGroup(this,this.get("content"),index)
}return isGroupView},exampleViewForItem:function(item,index){var del=this.get("contentDelegate"),groupIndexes=this.get("_contentGroupIndexes"),key,ExampleView,isGroupView=this.contentIndexIsGroup(this,this.get("content"),index);
if(isGroupView){key=this.get("contentGroupExampleViewKey");if(key&&item){ExampleView=item.get(key)
}if(!ExampleView){ExampleView=this.get("groupExampleView")||this.get("exampleView")
}}else{key=this.get("contentExampleViewKey");if(key&&item){ExampleView=item.get(key)
}if(!ExampleView){ExampleView=this.get("exampleView")}}return ExampleView},setAttributesForItem:function(item,index,attrs){var del=this.get("contentDelegate"),isGroupView=this.contentIndexIsGroup(this,this.get("content"),index),ExampleView=this.exampleViewForItem(item,index),content=this.get("content");
attrs.createdFromExampleView=ExampleView;attrs.parentView=this.get("containerView")||this;
attrs.contentIndex=index;attrs.owner=attrs.displayDelegate=this;attrs.content=item;
attrs.page=this.page;attrs.layerId=this.layerIdFor(index);attrs.isEnabled=del.contentIndexIsEnabled(this,content,index);
attrs.isSelected=del.contentIndexIsSelected(this,content,index);attrs.outlineLevel=del.contentIndexOutlineLevel(this,content,index);
attrs.disclosureState=del.contentIndexDisclosureState(this,content,index);attrs.isVisibleInWindow=this.get("isVisibleInWindow");
attrs.isGroupView=isGroupView;attrs.layout=this.layoutForContentIndex(index);if(!attrs.layout){attrs.layout=ExampleView.prototype.layout
}},mappedViewsForItem:function(item,map){if(!map){map=this._viewMap}return map[SC.guidFor(item)]
},mappedViewForItem:function(item,idx,map){if(!map){map=this._viewMap}var m=map[SC.guidFor(item)];
if(!m){return undefined}return m[idx]},mapView:function(item,index,view,map){if(!map){map=this._viewMap
}var g=SC.guidFor(item),imap=map[g];if(!imap){imap=map[g]={_length:0}}imap[index]=view;
imap._length++},unmapView:function(item,index,map){if(!map){map=this._viewMap}var g=SC.guidFor(item),imap=map[g];
if(!imap){return}if(imap[index]){var v=imap[index];delete imap[index];imap._length--;
if(imap._length<=0){delete map[g]}}},itemViewForContentIndex:function(index){var content=this.get("content");
if(!content){return}var item=content.objectAt(index);if(!item){return null}var exampleView=this.exampleViewForItem(item,index),view=this._indexMap[index];
if(view&&view.createdFromExampleView!==exampleView){this.removeItemView(view);this.unmapView(item,index);
view=null}if(!view){view=this.addItemView(exampleView,item,index)}return view},nearestMappedViewIndexForItem:function(item,index,map){var m=this.mappedViewsForItem(item,map);
if(!m){return null}var nearest=null,ndist=-1,dist=0;for(var idx in m){idx=parseInt(idx,10);
if(isNaN(idx)){continue}dist=Math.abs(index-idx);if(ndist<0||dist<ndist){ndist=dist;
nearest=idx}}return nearest},remapItemViews:function(nowShowing){var oldMap=this._viewMap||{},newMap=(this._viewMap={}),indexMap=(this._indexMap={}),mayExist=[],content=this.get("content"),item;
if(!content){return}var itemsToAdd=this._itemsToAdd;nowShowing.forEach(function(idx){item=content.objectAt(idx);
var possibleExistingViews=this.mappedViewsForItem(item,oldMap);if(possibleExistingViews){if(possibleExistingViews[idx]){var v=possibleExistingViews[idx];
this.unmapView(item,idx,oldMap);this.mapView(item,idx,v,newMap);indexMap[idx]=v}else{mayExist.push(idx)
}}else{itemsToAdd.push(idx)}},this);for(var idx=0,len=mayExist.length;idx<len;idx++){var newIdx=mayExist[idx];
item=content.objectAt(newIdx);var nearestOldIndex=this.nearestMappedViewIndexForItem(item,newIdx,oldMap),nearestView;
if(!SC.none(nearestOldIndex)){nearestView=this.mappedViewForItem(item,nearestOldIndex,oldMap);
var newExampleView=this.exampleViewForItem(item,newIdx);if(newExampleView===nearestView.createdFromExampleView){this.unmapView(item,nearestOldIndex,oldMap);
this.mapView(item,newIdx,nearestView,newMap);indexMap[newIdx]=nearestView}else{itemsToAdd.push(newIdx)
}}else{itemsToAdd.push(newIdx)}}return oldMap},reloadIfNeeded:function(nowShowing,scrollOnly){var content=this.get("content"),invalid;
if(!nowShowing||!nowShowing.isIndexSet){nowShowing=this.get("nowShowing")}if(!scrollOnly){invalid=this._invalidIndexes;
if(!invalid||!this.get("isVisibleInWindow")){return this}this._invalidIndexes=NO;
if(invalid.isIndexSet&&invalid.contains(nowShowing)){invalid=YES}if(this.willReload){this.willReload(invalid===YES?null:invalid)
}}var itemsToAdd=this._itemsToAdd||(this._itemsToAdd=[]);var oldMap=this.remapItemViews(nowShowing);
this.processRemovals(oldMap);if(invalid){this.processUpdates(invalid===YES?nowShowing:invalid)
}this.processAdds();if(!scrollOnly){this.clearDOMPools()}itemsToAdd.length=0;if(!scrollOnly){var layout=this.computeLayout();
if(layout){this.adjust(layout)}if(this.didReload){this.didReload(invalid===YES?null:invalid)
}}return this},processRemovals:function(oldMap){var content=this.get("content");for(var guid in oldMap){var imap=oldMap[guid];
for(var itemIdx in imap){itemIdx=parseInt(itemIdx,10);if(isNaN(itemIdx)){continue
}var view=imap[itemIdx];if(this._indexMap[itemIdx]===view){delete this._indexMap[itemIdx]
}view._isInCollection=NO;this.removeItemView(view)}}},processUpdates:function(invalid){var u=this._itemsToUpdate,content=this.get("content"),item,view;
invalid.forEach(function(idx){item=content.objectAt(idx);if(view=this.mappedViewForItem(item,idx)){if(!view._isInCollection){return
}var ex=this.exampleViewForItem(item,idx);this.updateItemView(view,ex,item,idx)}},this)
},processAdds:function(){var content=this.get("content");var add=this._itemsToAdd,idx,len=add.length,itemIdx,item;
for(idx=0;idx<len;idx++){itemIdx=add[idx];item=content.objectAt(itemIdx);var exampleView=this.exampleViewForItem(item,itemIdx);
var view=this.addItemView(exampleView,item,itemIdx)}},clearDOMPools:function(){var pools=this._domPools||(this._domPools={});
for(var p in pools){this.clearDOMPool(pools[p])}},domPoolSize:10,clearDOMPool:function(pool){var idx,len=pool.length,item;
for(idx=this.domPoolSize;idx<len;idx++){item=pool[idx];this.removeChild(item);this.releaseItemView(item)
}pool.length=Math.min(pool.length,this.domPoolSize)},domPoolForExampleView:function(exampleView){var pools=this._domPools||(this._domPools={}),guid=SC.guidFor(exampleView);
var pool=pools[guid];if(!pool){pool=pools[guid]=[]}return pool},itemFromDOMPool:function(exampleView){var pool=this.domPoolForExampleView(exampleView);
if(pool.length<1){return null}var view=pool.shift();if(view.wakeFromDOMPool){view.wakeFromDOMPool()
}return view},sendToDOMPool:function(view){var pool=this.domPoolForExampleView(view.createdFromExampleView);
pool.push(view);var f=view.get("frame");view.adjust({top:-f.height});view.set("layerId",SC.guidFor(view));
if(view.sleepInDOMPool){view.sleepInDOMPool()}},addItemView:function(exampleView,object,index){var view,attrs=this._TMP_ATTRS||(this._TMP_ATTRS={});
this.setAttributesForItem(object,index,attrs);if(view=this.itemFromDOMPool(exampleView)){this.configureItemView(view,attrs);
view._isInCollection=YES;this.mapView(object,index,view);this._indexMap[index]=view;
return view}view=this.allocateItemView(exampleView,attrs);this.appendChild(view);
view._isInCollection=YES;this.mapView(object,index,view);this._indexMap[index]=view;
return view},removeItemView:function(current){if(current.get("layerIsCacheable")){this.sendToDOMPool(current)
}else{this.removeChild(current)}current._isInCollection=NO},updateItemView:function(current,exampleView,object,index){if(!current.get("layerIsCacheable")||current.createdFromExampleView!==exampleView){this.unmapView(current,index);
delete this._indexMap[index];this.removeItemView(current,object,index);var newView=this.addItemView(exampleView,object,index)
}else{var attrs=this._TMP_ATTRS||(this._TMP_ATTRS={});this.setAttributesForItem(object,index,attrs);
this.configureItemView(current,attrs)}},_lastTopUpdate:0,_lastLeftUpdate:0,_tolerance:100,touchScrollDidChange:function(left,top){if(Date.now()-this._lastTouchScrollTime<25){return
}var clippingFrame=this.get("clippingFrame");var cf=this._inScrollClippingFrame||(this._inScrollClippingFrame={x:0,y:0,width:0,height:0});
cf.x=clippingFrame.x;cf.y=clippingFrame.y;cf.width=clippingFrame.width;cf.height=clippingFrame.height;
cf.x=left;cf.y=top;var r=this.contentIndexesInRect(cf);if(!r){return}var len=this.get("length"),max=r.get("max"),min=r.get("min");
if(max>len||min<0){r=r.copy();r.remove(len,max-len).remove(min,0-min).freeze()}if(this._lastNowShowing){if(r.contains(this._lastNowShowing)&&this._lastNowShowing.contains(r)){return
}}this._lastNowShowing=r;this.reloadIfNeeded(r,YES);this._lastTouchScrollTime=Date.now()
}};SC.CollectionGroup={classNames:["sc-collection-group"]};SC.CollectionRowDelegate={isCollectionRowDelegate:YES,itemHeight:18,rowSpacing:0,rowPadding:0,rowHeight:function(key,value){var rowPadding=this.get("rowPadding");
var itemHeight=this.get("itemHeight");if(value!==undefined){this.set("itemHeight",value-rowPadding*2);
return value}return itemHeight+rowPadding*2}.property("itemHeight","rowPadding"),customRowHeightIndexes:null,contentIndexRowHeight:function(view,content,contentIndex){return this.get("rowHeight")
}};SC.CollectionViewDelegate={isCollectionViewDelegate:YES,collectionViewSelectionForProposedSelection:function(view,sel){return sel
},collectionViewShouldSelectIndexes:function(view,indexes,extend){return indexes},collectionViewShouldDeselectIndexes:function(view,indexes){return indexes
},collectionViewShouldDeleteIndexes:function(view,indexes){return indexes},collectionViewDeleteContent:function(view,content,indexes){if(!content){return NO
}if(SC.typeOf(content.destroyAt)===SC.T_FUNCTION){content.destroyAt(indexes);view.selectPreviousItem(NO,1);
return YES}else{if(SC.typeOf(content.removeAt)===SC.T_FUNCTION){content.removeAt(indexes);
view.selectPreviousItem(NO,1);return YES}else{return NO}}},collectionViewShouldBeginDrag:function(view){return YES
},collectionViewDragDataTypes:function(view){return[]},collectionViewDragDataForType:function(view,drag,dataType){return null
},collectionViewComputeDragOperations:function(view,drag,proposedDragOperations){return proposedDragOperations
},collectionViewValidateDragOperation:function(view,drag,op,proposedInsertionIndex,proposedDropOperation){return(proposedDropOperation&SC.DROP_ON)?SC.DRAG_NONE:op
},collectionViewPerformDragOperation:function(view,drag,op,proposedInsertionIndex,proposedDropOperation){return SC.DRAG_NONE
},collectionViewDragViewFor:function(view,dragContent){return null},ghostActsLikeCursor:NO};
SC.NavigationBuilder={isNavigationBuilder:YES,navigationTransitions:NO,initMixin:function(){var animatable=SC.Animatable;
if(animatable&&!this.isAnimatable){this.mixin(animatable)}else{if(!animatable){SC.Logger.error("SC.NavigationView and SC.NavigationBuilder require SC.Animatable to perform animations, but it is not present. Please ensure your app or framework references it.")
}}var navigationTransitions=this.get("navigationTransitions");if(!navigationTransitions&&SC.Animatable){navigationTransitions={left:{duration:0.25,timing:SC.Animatable.TRANSITION_EASE_IN_OUT,action:"navigationBuildDidFinish"},transform:{duration:0.25,timing:SC.Animatable.TRANSITION_EASE_IN_OUT,action:"navigationBuildDidFinish"}}
}if(SC.Animatable){SC.mixin(this.transitions,navigationTransitions)}},metrics:function(){var f=this.computeFrameWithParentFrame();
return f},transform:function(pos){if(SC.platform.supportsCSS3DTransforms){this.adjust("transform","translate3d("+pos+"px,0px,0px)")
}else{this.adjust("transform","translate("+pos+"px,0px)")}},buildInNavigation:function(){var metrics=this.metrics();
this.disableAnimation();this.transform(this.get("buildDirection")===SC.TO_LEFT?metrics.width:-metrics.width);
this.enableAnimation();this.invokeLater("transform",10,0)},buildOutNavigation:function(){var metrics=this.metrics();
this.transform(this.get("buildDirection")===SC.TO_LEFT?-metrics.width:metrics.width)
},buildIn:function(){this.buildInNavigation()},buildOut:function(){this.buildOutNavigation()
},resetBuild:function(){this.transform(0)},navigationBuildDidFinish:function(){if(this.isBuildingIn){this.buildInDidFinish()
}else{if(this.isBuildingOut){this.buildOutDidFinish()}}}};SC.Scrollable={initMixin:function(){SC.Logger.warn("SC.Scrollable is deprecated and will be removed in a future version of SproutCore.  Consider pulling the mixin into your own app if you want to keep using it.")
},isScrollable:true,verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("innerFrame").height
}.property("innerFrame"),horizontalPageScroll:function(){return this.get("innerFrame").width
}.property("innerFrame"),hasVerticalScroller:function(){return this.get("scrollFrame").height>this.get("innerFrame").height
}.property("scrollFrame"),hasHorizontalScroller:function(){return this.get("scrollFrame").width>this.get("innerFrame").width
}.property("scrollFrame"),scrollBy:function(amount){var sf=this.get("scrollFrame");
var f=this.get("innerFrame");if(!this.get("hasVerticalScroller")){amount.y=0}if(sf.height<=f.height){amount.y=0
}if(!this.get("hasHorizontalScroller")){amount.x=0}if(sf.width<=f.width){amount.x=0
}var newSf={x:sf.x-(amount.x||0),y:sf.y-(amount.y||0)};this.set("scrollFrame",newSf);
newSf=this.get("scrollFrame");return{x:newSf.x-sf.x,y:newSf.y-sf.y}},scrollTo:function(x,y){this.set("scrollFrame",{x:0-x,y:0-y})
},scrollToVisible:function(view){var f=this.get("innerFrame");var sf=this.get("scrollFrame");
var vf=this.convertFrameFromView(view.get("frame"),view);vf.x-=(f.x+sf.x);vf.y-=(f.y+sf.y);
var vo={x:0-sf.x,y:0-sf.y,width:f.width,height:f.height};vo.y-=Math.max(0,SC.minY(vo)-SC.minY(vf));
vo.x-=Math.max(0,SC.minX(vo)-SC.minX(vf));vo.y+=Math.max(0,SC.maxY(vf)-SC.maxY(vo));
vo.x+=Math.max(0,SC.maxX(vf)-SC.maxX(vo));this.scrollTo(vo.x,vo.y)},scrollDownLine:function(lines){if(lines===undefined){lines=1
}return this.scrollBy({y:this.get("verticalLineScroll")*lines}).y},scrollUpLine:function(lines){if(lines===undefined){lines=1
}return 0-this.scrollBy({y:0-this.get("verticalLineScroll")*lines}).y},scrollRightLine:function(lines){if(lines===undefined){lines=1
}return this.scrollTo({y:this.get("horizontalLineScroll")*lines}).x},scrollLeftLine:function(lines){if(lines===undefined){lines=1
}return 0-this.scrollTo({y:0-this.get("horizontalLineScroll")*lines}).x},scrollDownPage:function(pages){if(pages===undefined){pages=1
}return this.scrollBy({y:this.get("verticalPageScroll")*pages}).y},scrollUpPage:function(pages){if(pages===undefined){pages=1
}return 0-this.scrollBy({y:0-this.get("verticalPageScroll")*pages}).y},scrollRightPage:function(pages){if(pages===undefined){pages=1
}return this.scrollTo({y:this.get("horizontalPageScroll")*pages}).x},scrollLeftPage:function(pages){if(pages===undefined){pages=1
}return 0-this.scrollTo({y:0-this.get("horizontalPageScroll")*pages}).x}};SC.ModalPane=SC.Pane.extend({classNames:"sc-modal",layout:{top:0,left:0,bottom:0,right:0},_openPaneCount:0,paneWillAppend:function(pane){this._openPaneCount++;
if(!this.get("isVisibleInWindow")){this.append()}return this},paneDidRemove:function(pane){this._openPaneCount--;
if(this._openPaneCount<=0){this._openPaneCount=0;if(this.get("isVisibleInWindow")){this.remove()
}}},mouseDown:function(evt){var owner=this.get("owner");if(owner&&owner.modalPaneDidClick){owner.modalPaneDidClick(evt)
}},touchStart:function(evt){this.mouseDown(evt)}});sc_require("panes/modal");SC.PanelPane=SC.Pane.extend({layout:{left:0,right:0,top:0,bottom:0},classNames:["sc-panel"],acceptsKeyPane:YES,ariaRole:"dialog",ariaLabeledBy:null,ariaDescribedBy:null,isModal:YES,modalPane:SC.ModalPane.extend({classNames:"for-sc-panel"}),contentView:null,contentViewBindingDefault:SC.Binding.single(),replaceContent:function(newContent){this.removeAllChildren();
if(newContent){this.appendChild(newContent)}},createChildViews:function(){var view=this.contentView;
if(view){view=this.contentView=this.createChildView(view);this.childViews=[view]}},contentViewDidChange:function(){this.replaceContent(this.get("contentView"))
}.observes("contentView"),renderDelegateName:"panelRenderDelegate",_modalPane:function(){var pane=this.get("modalPane");
if(pane&&pane.isClass){pane=pane.create({owner:this});this.set("modalPane",pane)}return pane
},appendTo:function(elem){var pane;if(!this.get("isVisibleInWindow")&&this.get("isModal")&&(pane=this._modalPane())){this._isShowingModal=YES;
pane.paneWillAppend(this)}return arguments.callee.base.apply(this,arguments)},remove:function(){var pane,ret=arguments.callee.base.apply(this,arguments);
if(this._isShowingModal){this._isShowingModal=NO;if(pane=this._modalPane()){pane.paneDidRemove(this)
}}return ret},_isModalDidChange:function(){var pane,isModal=this.get("isModal");if(isModal){if(!this._isShowingModal&&this.get("isVisibleInWindow")&&(pane=this._modalPane())){this._isShowingModal=YES;
pane.paneWillAppend(this)}}else{if(this._isShowingModal&&(pane=this._modalPane())){this._isShowingModal=NO;
pane.paneDidRemove(this)}}}.observes("isModal"),paneDidAttach:function(){var ret=arguments.callee.base.apply(this,arguments);
this.becomeKeyPane();return ret},render:function(context,firstTime){arguments.callee.base.apply(this,arguments);
var ariaLabeledBy=this.get("ariaLabeledBy"),ariaDescribedBy=this.get("ariaDescribedBy");
if(firstTime){if(ariaLabeledBy&&ariaLabeledBy!==""){context.attr("aria-labelledby",ariaLabeledBy)
}if(ariaDescribedBy&&ariaDescribedBy!==""){context.attr("aria-describedby",ariaDescribedBy)
}}}});SC.ButtonView=SC.View.extend(SC.Control,SC.Button,{classNames:["sc-button-view"],themeName:"square",buttonBehavior:SC.PUSH_BEHAVIOR,holdInterval:100,isDefault:NO,isDefaultBindingDefault:SC.Binding.oneWay().bool(),isCancel:NO,isCancelBindingDefault:SC.Binding.oneWay().bool(),action:null,target:null,supportFocusRing:NO,_labelMinWidthIE7:0,triggerActionAfterDelay:function(evt){if(!this.get("isEnabled")){return NO
}this.set("isActive",YES);this.invokeLater("triggerAction",200,evt);return YES},triggerAction:function(evt){this._action(evt,YES);
this.didTriggerAction();this.set("isActive",NO)},didTriggerAction:function(){},titleMinWidth:80,init:function(){arguments.callee.base.apply(this,arguments);
var keyEquivalent=this.get("keyEquivalent");if(keyEquivalent){this._defaultKeyEquivalent=keyEquivalent
}},ariaRole:"button",displayProperties:["icon","displayTitle","value","displayToolTip","isDefault","isCancel","escapeHTML","needsEllipsis","hint","titleMinWidth","supportFocusRing"],renderDelegateName:"buttonRenderDelegate",_defaultKeyEquivalent:null,_isDefaultOrCancelDidChange:function(){var isDefault=!!this.get("isDefault"),isCancel=!isDefault&&this.get("isCancel");
if(isDefault){this.set("keyEquivalent","return")}else{if(isCancel){this.set("keyEquivalent","escape")
}else{this.set("keyEquivalent",this._defaultKeyEquivalent)}}}.observes("isDefault","isCancel"),mouseDown:function(evt){var buttonBehavior=this.get("buttonBehavior");
if(!this.get("isEnabled")){return YES}this.set("isActive",YES);this._isMouseDown=YES;
if(buttonBehavior===SC.HOLD_BEHAVIOR){this._action(evt)}else{if(!this._isFocused&&(buttonBehavior!==SC.PUSH_BEHAVIOR)){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.get("layer").focus()
}}}return YES},mouseExited:function(evt){if(this._isMouseDown){this.set("isActive",NO)
}return YES},mouseEntered:function(evt){if(this._isMouseDown){this.set("isActive",YES)
}return YES},mouseUp:function(evt){if(this._isMouseDown){this.set("isActive",NO)}this._isMouseDown=false;
if(this.get("buttonBehavior")!==SC.HOLD_BEHAVIOR){var inside=this.$().within(evt.target);
if(inside&&this.get("isEnabled")){this._action(evt)}}return YES},touchStart:function(touch){var buttonBehavior=this.get("buttonBehavior");
if(!this.get("isEnabled")){return YES}this.set("isActive",YES);if(buttonBehavior===SC.HOLD_BEHAVIOR){this._action(touch)
}else{if(!this._isFocused&&(buttonBehavior!==SC.PUSH_BEHAVIOR)){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$()[0].focus()
}}}touch.preventDefault();return YES},touchesDragged:function(evt,touches){if(!this.touchIsInBoundary(evt)){if(!this._touch_exited){this.set("isActive",NO)
}this._touch_exited=YES}else{if(this._touch_exited){this.set("isActive",YES)}this._touch_exited=NO
}evt.preventDefault();return YES},touchEnd:function(touch){this._touch_exited=NO;
this.set("isActive",NO);if(this.get("buttonBehavior")!==SC.HOLD_BEHAVIOR){if(this.touchIsInBoundary(touch)&&this.get("isEnabled")){this._action()
}}touch.preventDefault();return YES},keyDown:function(evt){if(evt.which===9||evt.keyCode===9){var view=evt.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(view){view.becomeFirstResponder()}else{evt.allowDefault()}return YES}if(evt.which===13){this.triggerActionAfterDelay(evt);
return YES}return NO},_action:function(evt,skipHoldRepeat){switch(this.get("buttonBehavior")){case SC.TOGGLE_BEHAVIOR:var sel=this.get("isSelected");
if(sel){this.set("value",this.get("toggleOffValue"))}else{this.set("value",this.get("toggleOnValue"))
}break;case SC.TOGGLE_ON_BEHAVIOR:this.set("value",this.get("toggleOnValue"));break;
case SC.TOGGLE_OFF_BEHAVIOR:this.set("value",this.get("toggleOffValue"));break;case SC.HOLD_BEHAVIOR:this._runHoldAction(evt,skipHoldRepeat);
break;default:this._runAction(evt)}},_runAction:function(evt){var action=this.get("action"),target=this.get("target")||null,rootResponder=this.getPath("pane.rootResponder");
if(action){if(this._hasLegacyActionHandler()){this._triggerLegacyActionHandler(evt)
}else{if(rootResponder){rootResponder.sendAction(action,target,this,this.get("pane"),null,this)
}}}},_runHoldAction:function(evt,skipRepeat){if(this.get("isActive")){this._runAction();
if(!skipRepeat){SC.RunLoop.begin();this.invokeLater("_runHoldAction",this.get("holdInterval"),evt);
SC.RunLoop.end()}}},_hasLegacyActionHandler:function(){var action=this.get("action");
if(action&&(SC.typeOf(action)===SC.T_FUNCTION)){return true}if(action&&(SC.typeOf(action)===SC.T_STRING)&&(action.indexOf(".")!=-1)){return true
}return false},_triggerLegacyActionHandler:function(evt){if(!this._hasLegacyActionHandler()){return false
}var action=this.get("action");if(SC.typeOf(action)===SC.T_FUNCTION){this.action(evt)
}if(SC.typeOf(action)===SC.T_STRING){eval("this.action = function(e) { return "+action+"(this, e); };");
this.action(evt)}},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(keyView){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$().focus()}}},willLoseKeyResponderTo:function(responder){if(this._isFocused){this._isFocused=NO
}},didAppendToDocument:function(){if(parseInt(SC.browser.msie,0)===7&&this.get("useStaticLayout")){var layout=this.get("layout"),elem=this.$(),w=0;
if(elem&&elem[0]&&(w=elem[0].clientWidth)&&w!==0&&this._labelMinWidthIE7===0){var label=this.$(".sc-button-label"),paddingRight=parseInt(label.css("paddingRight"),0),paddingLeft=parseInt(label.css("paddingLeft"),0),marginRight=parseInt(label.css("marginRight"),0),marginLeft=parseInt(label.css("marginLeft"),0);
if(marginRight=="auto"){SC.Logger.log(marginRight+","+marginLeft+","+paddingRight+","+paddingLeft)
}if(!paddingRight&&isNaN(paddingRight)){paddingRight=0}if(!paddingLeft&&isNaN(paddingLeft)){paddingLeft=0
}if(!marginRight&&isNaN(marginRight)){marginRight=0}if(!marginLeft&&isNaN(marginLeft)){marginLeft=0
}this._labelMinWidthIE7=w-(paddingRight+paddingLeft)-(marginRight+marginLeft);label.css("minWidth",this._labelMinWidthIE7+"px")
}else{this.invokeLater(this.didAppendToDocument,1)}}}});SC.TOGGLE_BEHAVIOR="toggle";
SC.PUSH_BEHAVIOR="push";SC.TOGGLE_ON_BEHAVIOR="on";SC.TOGGLE_OFF_BEHAVIOR="off";SC.HOLD_BEHAVIOR="hold";
SC.ButtonView.CLICK_AND_HOLD_DELAY=SC.browser.msie?600:300;SC.REGULAR_BUTTON_HEIGHT=24;
SC.ButtonView.hasGivenDeprecationWarning=NO;sc_require("panes/panel");sc_require("views/button");
SC.BUTTON1_STATUS="button1";SC.BUTTON2_STATUS="button2";SC.BUTTON3_STATUS="button3";
SC.AlertPane=SC.PanelPane.extend({classNames:"sc-alert",ariaRole:"alertdialog",ariaLabeledBy:null,ariaDescribedBy:null,delegate:null,icon:"sc-icon-alert-48",message:"",description:"",displayDescription:function(){var desc=this.get("description");
if(!desc||desc.length===0){return desc}desc=SC.RenderContext.escapeHTML(desc);return'<p class="description">'+desc.split("\n").join('</p><p class="description">')+"</p>"
}.property("description").cacheable(),caption:"",displayCaption:function(){var caption=this.get("caption");
if(!caption||caption.length===0){return caption}caption=SC.RenderContext.escapeHTML(caption);
return'<p class="caption">'+caption.split("\n").join('</p><p class="caption">')+"</p>"
}.property("caption").cacheable(),buttonOne:SC.outlet("contentView.childViews.1.childViews.1"),buttonTwo:SC.outlet("contentView.childViews.1.childViews.0"),buttonThree:SC.outlet("contentView.childViews.2.childViews.0"),buttonThreeWrapper:SC.outlet("contentView.childViews.2"),layout:{top:0.3,centerX:0,width:500},contentView:SC.View.extend({useStaticLayout:YES,layout:{left:0,right:0,top:0,height:"auto"},childViews:[SC.View.extend(SC.StaticLayout,{classNames:["info"],render:function(context,firstTime){var pane=this.get("pane");
var blank=SC.BLANK_IMAGE_URL;if(pane.get("icon")=="blank"){context.addClass("plain")
}context.push('<img src="'+blank+'" class="icon '+pane.get("icon")+'" />');context.begin("h1").attr("class","header").text(pane.get("message")||"").end();
context.push(pane.get("displayDescription")||"");context.push(pane.get("displayCaption")||"");
context.push('<div class="separator"></div>')}}),SC.View.extend({layout:{bottom:13,height:24,right:18,width:466},childViews:["cancelButton","okButton"],classNames:["text-align-right"],cancelButton:SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON2_STATUS,localize:YES,titleMinWidth:64,layout:{right:5,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"Cancel",isCancel:YES,action:"dismiss",isVisible:NO}),okButton:SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON1_STATUS,localize:YES,titleMinWidth:64,layout:{left:0,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"OK",isDefault:YES,action:"dismiss"})}),SC.View.extend({layout:{bottom:13,height:24,left:18,width:150},isVisible:NO,childViews:[SC.ButtonView.extend({useStaticLayout:YES,actionKey:SC.BUTTON3_STATUS,localize:YES,titleMinWidth:64,layout:{left:0,height:"auto",width:"auto",bottom:0},theme:"capsule",title:"Extra",action:"dismiss",isVisible:NO})]})]}),dismiss:function(sender){var del=this.delegate;
if(del&&del.alertPaneDidDismiss){del.alertPaneDidDismiss(this,sender.get("actionKey"))
}this.remove()},alertInfoDidChange:function(){var v=this.getPath("contentView.childViews.0");
if(v){v.displayDidChange()}}.observes("icon","message","displayDescription","displayCaption"),render:function(context,firstTime){arguments.callee.base.apply(this,arguments);
var ariaLabeledBy=this.get("ariaLabeledBy"),ariaDescribedBy=this.get("ariaDescribedBy");
if(firstTime){if(ariaLabeledBy&&ariaLabeledBy!==""){context.attr("aria-labelledby",ariaLabeledBy)
}if(ariaDescribedBy&&ariaDescribedBy!==""){context.attr("aria-describedby",ariaDescribedBy)
}}}});SC.AlertPane._normalizeArguments=function(args){args=SC.A(args);var len=args.length,delegate=args[len-1];
if(SC.typeOf(delegate)!==SC.T_STRING){args[len-1]=null}else{delegate=null}args[7]=delegate;
return args};SC.AlertPane.show=function(message,description,caption,button1Title,button2Title,button3Title,iconUrl,delegate){var args=this._normalizeArguments(arguments);
var ret=this.create({message:args[0]||"",description:args[1]||null,caption:args[2]||null,icon:args[6]||"sc-icon-alert-48",delegate:args[7]});
var buttonKeys="buttonOne buttonTwo buttonThree".w(),button,title;for(var idx=0;idx<3;
idx++){button=ret.get(buttonKeys[idx]);title=args[idx+3];if(title){button.set("title",title).set("isVisible",YES);
if(title=="?"){button.set("titleMinWidth",0)}if(idx==2){var button_wrapper=ret.get("buttonThreeWrapper");
button_wrapper.set("isVisible",YES)}}}var show=ret.append();ret.adjust("height",ret.childViews[0].$().height());
ret.updateLayout();return show};SC.AlertPane.warn=function(message,description,caption,button1Title,button2Title,button3Title,delegate){var args=this._normalizeArguments(arguments);
args[6]="sc-icon-alert-48";return this.show.apply(this,args)};SC.AlertPane.info=function(message,description,caption,button1Title,button2Title,button3Title,delegate){var args=this._normalizeArguments(arguments);
args[6]="sc-icon-info-48";return this.show.apply(this,args)};SC.AlertPane.error=function(message,description,caption,button1Title,button2Title,button3Title,delegate){var args=this._normalizeArguments(arguments);
args[6]="sc-icon-error-48";return this.show.apply(this,args)};SC.AlertPane.plain=function(message,description,caption,button1Title,button2Title,button3Title,delegate){var args=this._normalizeArguments(arguments);
args[6]="blank";return this.show.apply(this,args)};sc_require("panes/panel");SC.PalettePane=SC.PanelPane.extend({classNames:"sc-palette",isModal:NO,modalPane:SC.ModalPane,isAnchored:NO,_mouseOffsetX:null,_mouseOffsetY:null,mouseDown:function(evt){var f=this.get("frame");
this._mouseOffsetX=f?(f.x-evt.pageX):0;this._mouseOffsetY=f?(f.y-evt.pageY):0;return YES
},mouseDragged:function(evt){if(!this.isAnchored){this.set("layout",{width:this.layout.width,height:this.layout.height,left:this._mouseOffsetX+evt.pageX,top:this._mouseOffsetY+evt.pageY});
this.updateLayout()}return YES},touchStart:function(evt){return this.mouseDown(evt)
},touchesDragged:function(evt){return this.mouseDragged(evt)}});sc_require("panes/palette");
SC.PICKER_MENU="menu";SC.PICKER_FIXED="fixed";SC.PICKER_POINTER="pointer";SC.PICKER_MENU_POINTER="menu-pointer";
SC.POINTER_LAYOUT=["perfectRight","perfectLeft","perfectTop","perfectBottom"];SC.PickerPane=SC.PalettePane.extend({classNames:"sc-picker",isAnchored:YES,isModal:YES,pointerPos:"perfectRight",pointerPosX:0,pointerPosY:0,anchorElement:null,anchorCached:null,preferType:null,preferMatrix:null,pointerOffset:null,extraRightOffset:0,popup:function(anchorViewOrElement,preferType,preferMatrix,pointerOffset){var anchor;
if(anchorViewOrElement){anchor=anchorViewOrElement.isView?anchorViewOrElement.get("layer"):anchorViewOrElement
}this.beginPropertyChanges();this.set("anchorElement",anchor);if(preferType){this.set("preferType",preferType)
}if(preferMatrix){this.set("preferMatrix",preferMatrix)}if(pointerOffset){this.set("pointerOffset",pointerOffset)
}this.endPropertyChanges();this.positionPane();this._hideOverflow();return this.append()
},positionPane:function(useAnchorCached){useAnchorCached=useAnchorCached&&this.get("anchorCached");
var anchor=useAnchorCached?this.get("anchorCached"):this.get("anchorElement"),preferType=this.get("preferType"),preferMatrix=this.get("preferMatrix"),layout=this.get("layout"),origin;
if(anchor){if(!useAnchorCached){anchor=this.computeAnchorRect(anchor);this.set("anchorCached",anchor)
}if(anchor.x===0&&anchor.y===0){return}origin=SC.cloneRect(anchor);if(preferType){switch(preferType){case SC.PICKER_MENU:case SC.PICKER_FIXED:if(!preferMatrix||preferMatrix.length!==3){this.set("preferMatrix",[1,4,3])
}origin.x+=((this.preferMatrix[2]===0)?origin.width:0)+this.preferMatrix[0];origin.y+=((this.preferMatrix[2]===3)?origin.height:0)+this.preferMatrix[1];
break;default:origin.y+=origin.height;break}}else{origin.y+=origin.height}origin=this.fitPositionToScreen(origin,this.get("frame"),anchor);
this.adjust({width:origin.width,height:origin.height,left:origin.x,top:origin.y})
}else{this.adjust({width:layout.width,height:layout.height,centerX:0,centerY:0})}this.updateLayout();
return this},computeAnchorRect:function(anchor){var bounding,ret,cq,wsize=SC.RootResponder.responder.computeWindowSize();
if(anchor.getBoundingClientRect){bounding=anchor.getBoundingClientRect();ret={x:bounding.left,y:bounding.top,width:bounding.width,height:bounding.height};
if(ret.width===undefined||ret.height===undefined){cq=SC.$(anchor);ret.width=cq.outerWidth();
ret.height=cq.outerHeight()}}else{ret=SC.viewportOffset(anchor);cq=SC.$(anchor);ret.width=cq.outerWidth();
ret.height=cq.outerHeight()}ret.height=(wsize.height-ret.y)<ret.height?(wsize.height-ret.y):ret.height;
if(!SC.browser.msie&&window.scrollX>0||window.scrollY>0){ret.x+=window.scrollX;ret.y+=window.scrollY
}else{if(SC.browser.msie&&(document.documentElement.scrollTop>0||document.documentElement.scrollLeft>0)){ret.x+=document.documentElement.scrollLeft;
ret.y+=document.documentElement.scrollTop}}return ret},fitPositionToScreen:function(preferredPosition,picker,anchor){var wsize=SC.RootResponder.responder.computeWindowSize(),wret={x:0,y:0,width:wsize.width,height:wsize.height};
picker.x=preferredPosition.x;picker.y=preferredPosition.y;if(this.preferType){switch(this.preferType){case SC.PICKER_MENU:picker=this.fitPositionToScreenMenu(wret,picker,this.get("isSubMenu"));
break;case SC.PICKER_MENU_POINTER:this.setupPointer(anchor);picker=this.fitPositionToScreenMenuPointer(wret,picker,anchor);
break;case SC.PICKER_POINTER:this.setupPointer(anchor);picker=this.fitPositionToScreenPointer(wret,picker,anchor);
break;case SC.PICKER_FIXED:break;default:break}}else{picker=this.fitPositionToScreenDefault(wret,picker,anchor)
}this.displayDidChange();return picker},fitPositionToScreenDefault:function(w,f,a){if(SC.maxX(f)>w.width){var mx=Math.max(SC.maxX(a),f.width);
f.x=Math.min(mx,w.width)-f.width}if(SC.minX(f)<0){f.x=SC.minX(Math.max(a,0));if(SC.maxX(f)>w.width){f.x=Math.max(0,w.width-f.width)
}}if(SC.maxY(f)>w.height){mx=Math.max((a.y-f.height),0);if(mx>w.height){f.y=Math.max(0,w.height-f.height)
}else{f.y=mx}}if(SC.minY(f)<0){mx=Math.min(SC.maxY(a),(w.height-a.height));f.y=Math.max(mx,0)
}return f},fitPositionToScreenMenu:function(windowFrame,paneFrame,subMenu){if(subMenu){paneFrame.x-=this.get("submenuOffsetX");
paneFrame.y-=Math.floor(this.get("menuHeightPadding")/2)}if((paneFrame.x+paneFrame.width)>(windowFrame.width-20)){if(subMenu){paneFrame.x=paneFrame.x-(paneFrame.width*2)
}else{paneFrame.x=windowFrame.width-paneFrame.width-20}}if(paneFrame.x<7){paneFrame.x=7
}if(paneFrame.y<7){paneFrame.height+=paneFrame.y;paneFrame.y=7}if(paneFrame.height+paneFrame.y+35>=windowFrame.height){if(paneFrame.height+50>=windowFrame.height){paneFrame.y=SC.MenuPane.VERTICAL_OFFSET;
paneFrame.height=windowFrame.height-(SC.MenuPane.VERTICAL_OFFSET*2)}else{paneFrame.y+=(windowFrame.height-(paneFrame.height+paneFrame.y+35))
}}return paneFrame},fitPositionToScreenMenuPointer:function(w,f,a){f=this.fitPositionToScreenPointer(w,f,a);
if(f.height+f.y+35>=w.height){f.height=w.height-f.y-(SC.MenuPane.VERTICAL_OFFSET*2)
}return f},fitPositionToScreenPointer:function(w,f,a){var offset=[this.pointerOffset[0],this.pointerOffset[1],this.pointerOffset[2],this.pointerOffset[3]];
var prefP1=[[a.x+a.width+offset[0],a.y+parseInt(a.height/2,0)-40],[a.x-f.width+offset[1],a.y+parseInt(a.height/2,0)-40],[a.x+parseInt((a.width/2)-(f.width/2),0),a.y-f.height+offset[2]],[a.x+parseInt((a.width/2)-(f.width/2),0),a.y+a.height+offset[3]]];
var prefP2=[[a.x+a.width+f.width+offset[0],a.y+parseInt(a.height/2,0)+f.height-24],[a.x+offset[1],a.y+parseInt(a.height/2,0)+f.height-24],[a.x+parseInt((a.width/2)-(f.width/2),0)+f.width,a.y+offset[2]],[a.x+parseInt((a.width/2)-(f.width/2),0)+f.width,a.y+a.height+f.height+offset[3]]];
var cutoffPrefP=[[prefP1[0][1]>0?0:0-prefP1[0][1],prefP2[0][0]<w.width?0:prefP2[0][0]-w.width,prefP2[0][1]<w.height?0:prefP2[0][1]-w.height,prefP1[0][0]>0?0:0-prefP1[0][0]],[prefP1[1][1]>0?0:0-prefP1[1][1],prefP2[1][0]<w.width?0:prefP2[1][0]-w.width,prefP2[1][1]<w.height?0:prefP2[1][1]-w.height,prefP1[1][0]>0?0:0-prefP1[1][0]],[prefP1[2][1]>0?0:0-prefP1[2][1],prefP2[2][0]<w.width?0:prefP2[2][0]-w.width,prefP2[2][1]<w.height?0:prefP2[2][1]-w.height,prefP1[2][0]>0?0:0-prefP1[2][0]],[prefP1[3][1]>0?0:0-prefP1[3][1],prefP2[3][0]<w.width?0:prefP2[3][0]-w.width,prefP2[3][1]<w.height?0:prefP2[3][1]-w.height,prefP1[3][0]>0?0:0-prefP1[3][0]]];
var m=this.preferMatrix;if(m[4]===-1){f.x=a.x+parseInt(a.width/2,0);f.y=a.y+parseInt(a.height/2,0)-parseInt(f.height/2,0);
this.set("pointerPos",SC.POINTER_LAYOUT[0]+" fallback");this.set("pointerPosY",parseInt(f.height/2,0)-40)
}else{f.x=prefP1[m[4]][0];f.y=prefP1[m[4]][1];this.set("pointerPos",SC.POINTER_LAYOUT[m[4]]);
this.set("pointerPosY",0)}this.set("pointerPosX",0);for(var i=0,cM,pointerLen=SC.POINTER_LAYOUT.length;
i<pointerLen;i++){cM=m[i];if(cutoffPrefP[cM][0]===0&&cutoffPrefP[cM][1]===0&&cutoffPrefP[cM][2]===0&&cutoffPrefP[cM][3]===0){if(m[4]!==cM){f.x=prefP1[cM][0];
f.y=prefP1[cM][1];this.set("pointerPosY",0);this.set("pointerPos",SC.POINTER_LAYOUT[cM])
}i=SC.POINTER_LAYOUT.length}else{if((cM===0||cM===1)&&cutoffPrefP[cM][0]===0&&cutoffPrefP[cM][1]===0&&cutoffPrefP[cM][2]<f.height-91&&cutoffPrefP[cM][3]===0){if(m[4]!==cM){f.x=prefP1[cM][0];
this.set("pointerPos",SC.POINTER_LAYOUT[cM])}f.y=prefP1[cM][1]-cutoffPrefP[cM][2];
this.set("pointerPosY",cutoffPrefP[cM][2]);i=SC.POINTER_LAYOUT.length}else{if((cM===0||cM===1)&&cutoffPrefP[cM][0]===0&&cutoffPrefP[cM][1]===0&&cutoffPrefP[cM][2]<=f.height-51&&cutoffPrefP[cM][3]===0){if(m[4]!==cM){f.x=prefP1[cM][0]
}f.y=prefP1[cM][1]-(f.height-51);this.set("pointerPosY",(f.height-53));this.set("pointerPos",SC.POINTER_LAYOUT[cM]+" extra-low");
i=SC.POINTER_LAYOUT.length}else{if((cM===2||cM===3)&&cutoffPrefP[cM][0]===0&&cutoffPrefP[cM][1]<=parseInt(f.width/2,0)-this.get("extraRightOffset")&&cutoffPrefP[cM][2]===0&&cutoffPrefP[cM][3]===0){if(m[4]!==cM){f.y=prefP1[cM][1]
}f.x=prefP1[cM][0]-(parseInt(f.width/2,0)-this.get("extraRightOffset"));this.set("pointerPos",SC.POINTER_LAYOUT[cM]+" extra-right");
i=SC.POINTER_LAYOUT.length}else{if((cM===2||cM===3)&&cutoffPrefP[cM][0]===0&&cutoffPrefP[cM][1]===0&&cutoffPrefP[cM][2]===0&&cutoffPrefP[cM][3]<=parseInt(f.width/2,0)-this.get("extraRightOffset")){if(m[4]!==cM){f.y=prefP1[cM][1]
}f.x=prefP1[cM][0]+(parseInt(f.width/2,0)-this.get("extraRightOffset"));this.set("pointerPos",SC.POINTER_LAYOUT[cM]+" extra-left");
i=SC.POINTER_LAYOUT.length}}}}}}return f},setupPointer:function(a){var pointerOffset=this.pointerOffset,K=SC.PickerPane;
if(!pointerOffset||pointerOffset.length!==4){if(this.get("preferType")==SC.PICKER_MENU_POINTER){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.set("pointerOffset",K.TINY_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",K.TINY_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.SMALL_CONTROL_SIZE:this.set("pointerOffset",K.SMALL_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",K.SMALL_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.REGULAR_CONTROL_SIZE:this.set("pointerOffset",K.REGULAR_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",K.REGULAR_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.LARGE_CONTROL_SIZE:this.set("pointerOffset",K.LARGE_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",K.LARGE_PICKER_MENU_EXTRA_RIGHT_OFFSET);break;case SC.HUGE_CONTROL_SIZE:this.set("pointerOffset",K.HUGE_PICKER_MENU_POINTER_OFFSET);
this.set("extraRightOffset",K.HUGE_PICKER_MENU_EXTRA_RIGHT_OFFSET);break}}else{var overlapTuningX=(a.width<16)?((a.width<4)?9:6):0,overlapTuningY=(a.height<16)?((a.height<4)?9:6):0,offsetKey=K.PICKER_POINTER_OFFSET;
var offset=[offsetKey[0]+overlapTuningX,offsetKey[1]-overlapTuningX,offsetKey[2]-overlapTuningY,offsetKey[3]+overlapTuningY];
this.set("pointerOffset",offset);this.set("extraRightOffset",K.PICKER_EXTRA_RIGHT_OFFSET)
}}if(!this.preferMatrix||this.preferMatrix.length!==5){this.set("preferMatrix",this.get("preferType")==SC.PICKER_MENU_POINTER?[3,0,1,2,3]:[0,1,2,3,2])
}},displayProperties:["preferType","pointerPos","pointerPosY"],renderDelegateName:"pickerRenderDelegate",modalPaneDidClick:function(evt){var f=this.get("frame");
if(!this.clickInside(f,evt)){this.remove()}return YES},mouseDown:function(evt){return this.modalPaneDidClick(evt)
},clickInside:function(frame,evt){return SC.pointInRect({x:evt.pageX,y:evt.pageY},frame)
},windowSizeDidChange:function(oldSize,newSize){this.positionPane()},remove:function(){if(this.get("isVisibleInWindow")&&this.get("isPaneAttached")){this._showOverflow()
}return arguments.callee.base.apply(this,arguments)},_hideOverflow:function(){var body=SC.$(document.body),main=SC.$(".sc-main"),minWidth=parseInt(main.css("minWidth"),0),minHeight=parseInt(main.css("minHeight"),0),windowSize=SC.RootResponder.responder.get("currentWindowSize");
if(windowSize.width>=minWidth&&windowSize.height>=minHeight){SC.PICKERS_OPEN++;if(SC.PICKERS_OPEN>0){body.css("overflow","hidden")
}}},_showOverflow:function(){var body=SC.$(document.body);if(SC.PICKERS_OPEN>0){SC.PICKERS_OPEN--
}if(SC.PICKERS_OPEN===0){body.css("overflow","visible")}}});SC.PICKERS_OPEN=0;SC.PickerPane.PICKER_POINTER_OFFSET=[9,-9,-18,18];
SC.PickerPane.PICKER_EXTRA_RIGHT_OFFSET=20;SC.PickerPane.TINY_PICKER_MENU_POINTER_OFFSET=[9,-9,-18,18];
SC.PickerPane.TINY_PICKER_MENU_EXTRA_RIGHT_OFFSET=12;SC.PickerPane.SMALL_PICKER_MENU_POINTER_OFFSET=[9,-9,-8,8];
SC.PickerPane.SMALL_PICKER_MENU_EXTRA_RIGHT_OFFSET=11;SC.PickerPane.REGULAR_PICKER_MENU_POINTER_OFFSET=[9,-9,-12,12];
SC.PickerPane.REGULAR_PICKER_MENU_EXTRA_RIGHT_OFFSET=13;SC.PickerPane.REGULAR_PICKER_MENU_EXTRA_RIGHT_OFFSET=12;
SC.PickerPane.LARGE_PICKER_MENU_POINTER_OFFSET=[9,-9,-16,16];SC.PickerPane.LARGE_PICKER_MENU_EXTRA_RIGHT_OFFSET=17;
SC.PickerPane.HUGE_PICKER_MENU_POINTER_OFFSET=[9,-9,-18,18];SC.PickerPane.HUGE_PICKER_MENU_EXTRA_RIGHT_OFFSET=12;
SC.SeparatorView=SC.View.extend({classNames:["sc-separator-view"],tagName:"span",layoutDirection:SC.LAYOUT_HORIZONTAL,render:function(context,firstTime){if(firstTime){context.push("<span></span>")
}context.addClass(this.get("layoutDirection"))}});sc_require("views/button");sc_require("views/separator");
SC.MenuItemView=SC.View.extend(SC.ContentDisplay,{displayProperties:["title","isEnabled","isSeparator"],classNames:["sc-menu-item"],ariaRole:"menuitem",escapeHTML:YES,acceptsFirstResponder:YES,blocksIEDeactivate:YES,isContextMenuEnabled:NO,content:null,isSeparator:function(){return this.getContentProperty("itemSeparatorKey")===YES
}.property("content").cacheable(),isEnabled:function(){return this.getContentProperty("itemIsEnabledKey")!==NO&&this.getContentProperty("itemSeparatorKey")!==YES
}.property("content.isEnabled").cacheable(),subMenu:function(){var content=this.get("content"),menuItems,parentMenu;
if(!content){return null}parentMenu=this.get("parentMenu");menuItems=content.get(parentMenu.itemSubMenuKey);
if(menuItems){if(SC.kindOf(menuItems,SC.MenuPane)){menuItems.set("isModal",NO);menuItems.set("isSubMenu",YES);
menuItems.set("parentMenu",parentMenu);return menuItems}else{return SC.MenuPane.create({layout:{width:200},items:menuItems,isModal:NO,isSubMenu:YES,parentMenu:parentMenu,controlSize:parentMenu.get("controlSize")})
}}return null}.property("content").cacheable(),hasSubMenu:function(){return !!this.get("subMenu")
}.property("subMenu").cacheable(),init:function(){arguments.callee.base.apply(this,arguments);
this.contentDidChange()},render:function(context,firstTime){var content=this.get("content"),key,val,menu=this.get("parentMenu"),itemWidth=this.get("itemWidth")||menu.layout.width,itemHeight=this.get("itemHeight")||SC.DEFAULT_MENU_ITEM_HEIGHT;
this.set("itemWidth",itemWidth);this.set("itemHeight",itemHeight);if(content.get(menu.itemSeparatorKey)){context.attr("role","separator")
}else{if(this.getContentProperty("itemCheckboxKey")){context.attr("role","menuitemcheckbox");
context.attr("aria-checked",true)}}context=context.begin("a").addClass("menu-item");
if(content.get(menu.itemSeparatorKey)){context.push('<span class="separator"></span>');
context.addClass("disabled")}else{val=content.get(menu.itemIconKey);if(val){this.renderImage(context,val);
context.addClass("has-icon")}val=this.get("title");if(SC.typeOf(val)!==SC.T_STRING){val=val.toString()
}this.renderLabel(context,val);if(this.getContentProperty("itemCheckboxKey")){context.push('<div class="checkbox"></div>')
}if(this.get("hasSubMenu")){this.renderBranch(context)}val=this.getContentProperty("itemShortCutKey");
if(val){this.renderShortcut(context,val)}}context=context.end()},renderImage:function(context,image){var url,className;
if(image&&SC.ImageView.valueIsUrl(image)){url=image;className=""}else{className=image;
url=SC.BLANK_IMAGE_URL}context.begin("img").addClass("image").addClass(className).attr("src",url).end()
},renderLabel:function(context,label){if(this.get("escapeHTML")){label=SC.RenderContext.escapeHTML(label)
}context.push("<span class='value ellipsis'>"+label+"</span>")},renderBranch:function(context){context.push('<span class="has-branch"></span>')
},renderShortcut:function(context,shortcut){context.push('<span class = "shortcut">'+shortcut+"</span>")
},showSubMenu:function(){var subMenu=this.get("subMenu");if(subMenu){subMenu.set("mouseHasEntered",NO);
subMenu.popup(this,[0,0,0])}this._subMenuTimer=null},title:function(){var ret=this.getContentProperty("itemTitleKey"),localize=this.getPath("parentMenu.localize");
if(localize&&ret){ret=ret.loc()}return ret||""}.property("content.title").cacheable(),getContentProperty:function(property){var content=this.get("content"),menu=this.get("parentMenu");
if(content){return content.get(menu.get(property))}},mouseUp:function(evt){var targetMenuItem;
targetMenuItem=this.getPath("parentMenu.rootMenu.targetMenuItem");if(targetMenuItem){targetMenuItem.performAction()
}return YES},performAction:function(){if(!this.get("isEnabled")){this.getPath("parentMenu.rootMenu").remove();
return YES}if(this.get("hasSubMenu")){return NO}var disableFlash=this.getContentProperty("itemDisableMenuFlashKey"),menu;
if(disableFlash){this.sendAction()}else{this._flashCounter=0;menu=this.getPath("parentMenu.rootMenu");
menu._isFlashing=YES;this.invokeLater(this.flashHighlight,25);this.invokeLater(this.sendAction,150)
}return YES},sendAction:function(){var action=this.getContentProperty("itemActionKey"),target=this.getContentProperty("itemTargetKey"),rootMenu=this.getPath("parentMenu.rootMenu"),responder;
this.getPath("parentMenu.rootMenu").remove();rootMenu._isFlashing=NO;action=(action===undefined)?rootMenu.get("action"):action;
target=(target===undefined)?rootMenu.get("target"):target;rootMenu.set("selectedItem",this.get("content"));
if(SC.typeOf(action)===SC.T_FUNCTION){action.apply(target,[rootMenu]);SC.Logger.warn("Support for menu item action functions has been deprecated. Please use target and action.")
}else{responder=this.getPath("pane.rootResponder")||SC.RootResponder.responder;if(responder){responder.sendAction(action,target,this)
}}},flashHighlight:function(){var flashCounter=this._flashCounter,layer=this.$();
if(flashCounter%2===0){layer.addClass("focus")}else{layer.removeClass("focus")}if(flashCounter<=2){this.invokeLater(this.flashHighlight,50);
this._flashCounter++}},mouseDown:function(evt){return YES},mouseEntered:function(evt){var menu=this.get("parentMenu"),rootMenu=menu.get("rootMenu");
if(rootMenu._isFlashing){return}menu.set("mouseHasEntered",YES);this.set("mouseHasEntered",YES);
menu.set("currentMenuItem",this);if(this.get("isEnabled")){this.becomeFirstResponder()
}if(this.get("hasSubMenu")){this._subMenuTimer=this.invokeLater(this.showSubMenu,100)
}return YES},mouseExited:function(evt){var parentMenu,timer;if(this.get("hasSubMenu")){timer=this._subMenuTimer;
if(timer){timer.invalidate()}else{this.invokeLater(this.checkMouseLocation,100)}}else{parentMenu=this.get("parentMenu");
if(parentMenu.get("currentMenuItem")===this){parentMenu.set("currentMenuItem",null)
}}return YES},touchStart:function(evt){this.mouseEntered(evt);return YES},touchEnd:function(evt){return this.mouseUp(evt)
},touchEntered:function(evt){return this.mouseEntered(evt)},touchExited:function(evt){return this.mouseExited(evt)
},checkMouseLocation:function(){var subMenu=this.get("subMenu"),parentMenu=this.get("parentMenu"),currentMenuItem,previousMenuItem;
if(!subMenu.get("mouseHasEntered")){currentMenuItem=parentMenu.get("currentMenuItem");
if(currentMenuItem===this||currentMenuItem===null){previousMenuItem=parentMenu.get("previousMenuItem");
if(previousMenuItem){previousMenuItem.resignFirstResponder()}this.resignFirstResponder();
subMenu.remove()}}},moveUp:function(sender,evt){var menu=this.get("parentMenu");if(menu){menu.moveUp(this)
}return YES},moveDown:function(sender,evt){var menu=this.get("parentMenu");if(menu){menu.moveDown(this)
}return YES},moveRight:function(sender,evt){this.showSubMenu();return YES},insertText:function(chr,evt){var menu=this.get("parentMenu");
if(menu){menu.insertText(chr,evt)}},keyDown:function(evt){return this.interpretKeyEvents(evt)
},keyUp:function(evt){return YES},cancel:function(evt){this.getPath("parentMenu.rootMenu").remove();
return YES},didBecomeFirstResponder:function(responder){if(responder!==this){return
}var parentMenu=this.get("parentMenu");if(parentMenu){parentMenu.set("currentSelectedMenuItem",this)
}},willLoseFirstResponder:function(responder){if(responder!==this){return}var parentMenu=this.get("parentMenu");
if(parentMenu){parentMenu.set("currentSelectedMenuItem",null);parentMenu.set("previousSelectedMenuItem",this)
}},insertNewline:function(sender,evt){this.mouseUp(evt)},closeParent:function(){this.$().removeClass("focus");
var menu=this.get("parentMenu");if(menu){menu.remove()}},clickInside:function(frame,evt){return SC.pointInRect({x:evt.pageX,y:evt.pageY},frame)
},contentDidChange:function(){var content=this.get("content"),oldContent=this._content;
if(content===oldContent){return}var f=this.contentPropertyDidChange;if(oldContent&&oldContent.removeObserver){oldContent.removeObserver("*",this,f)
}this._content=content;if(content&&content.addObserver){content.addObserver("*",this,f)
}this.contentPropertyDidChange(content,"*")}.observes("content"),contentPropertyDidChange:function(target,key){var menu=this.get("parentMenu");
if(!menu){return}var mapping=SC.MenuItemView._contentPropertyToMenuItemPropertyMapping,contentProperties=SC.keys(mapping),i,len,contentProperty,menuItemProperty;
if(key==="*"){for(i=0,len=contentProperties.length;i<len;++i){contentProperty=contentProperties[i];
menuItemProperty=mapping[contentProperty];this.notifyPropertyChange(menuItemProperty)
}}else{for(i=0,len=contentProperties.length;i<len;++i){contentProperty=contentProperties[i];
if(menu.get(contentProperty)===key){menuItemProperty=mapping[contentProperty];this.notifyPropertyChange(menuItemProperty)
}}}}});SC.MenuItemView._contentPropertyToMenuItemPropertyMapping={itemTitleKey:"title",itemIsEnabledKey:"isEnabled",itemSeparatorKey:"isSeparator",itemSubMenuKey:"subMenu"};
require("panes/picker");require("views/menu_item");SC.MenuPane=SC.PickerPane.extend({classNames:["sc-menu"],ariaRole:"menu",items:[],controlSize:SC.REGULAR_CONTROL_SIZE,itemHeight:null,itemSeparatorHeight:null,menuHeight:0,menuHeightPadding:null,submenuOffsetX:null,selectedItem:null,exampleView:SC.MenuItemView,anchor:null,isSubMenu:NO,localize:YES,acceptsMenuPane:YES,isContextMenuEnabled:NO,popup:function(anchorViewOrElement,preferMatrix){var anchor;
this.beginPropertyChanges();if(anchorViewOrElement){anchor=anchorViewOrElement.isView?anchorViewOrElement.get("layer"):anchorViewOrElement
}this.set("anchorElement",anchor);this.set("anchor",anchorViewOrElement);if(preferMatrix){this.set("preferMatrix",preferMatrix)
}this.adjust("height",this.get("menuHeight"));this.positionPane();this.set("defaultResponder",this);
this.endPropertyChanges();this._hideOverflow();this.append()},remove:function(){var parentMenu=this.get("parentMenu");
this.set("currentMenuItem",null);this.closeOpenMenus();this.resignMenuPane();if(parentMenu){parentMenu.becomeMenuPane()
}return arguments.callee.base.apply(this,arguments)},itemTitleKey:"title",itemIsEnabledKey:"isEnabled",itemValueKey:"value",itemIconKey:"icon",itemHeightKey:"height",itemSubMenuKey:"subMenu",itemSeparatorKey:"separator",itemTargetKey:"target",itemActionKey:"action",itemCheckboxKey:"checkbox",itemShortCutKey:"shortcut",itemKeyEquivalentKey:"keyEquivalent",itemDisableMenuFlashKey:"disableMenuFlash",menuItemKeys:"itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemSeparatorKey itemActionKey itemCheckboxKey itemShortCutKey itemHeightKey itemSubMenuKey itemKeyEquivalentKey itemTargetKey".w(),preferType:SC.PICKER_MENU,isModal:YES,_menuView:null,init:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.TINY_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.TINY_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.TINY_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.TINY_SUBMENU_OFFSET_X);
break;case SC.SMALL_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.SMALL_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.SMALL_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.SMALL_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.SMALL_SUBMENU_OFFSET_X);
break;case SC.REGULAR_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.REGULAR_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.REGULAR_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.REGULAR_SUBMENU_OFFSET_X);
break;case SC.LARGE_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.LARGE_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.LARGE_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.LARGE_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.LARGE_SUBMENU_OFFSET_X);
break;case SC.HUGE_CONTROL_SIZE:this.setIfNull("itemHeight",SC.MenuPane.HUGE_MENU_ITEM_HEIGHT);
this.setIfNull("itemSeparatorHeight",SC.MenuPane.HUGE_MENU_ITEM_SEPARATOR_HEIGHT);
this.setIfNull("menuHeightPadding",SC.MenuPane.HUGE_MENU_HEIGHT_PADDING);this.setIfNull("submenuOffsetX",SC.MenuPane.HUGE_SUBMENU_OFFSET_X);
break}return arguments.callee.base.apply(this,arguments)},setIfNull:function(key,value){if(this.get(key)===null){this.set(key,value)
}},renderDelegateName:"menuRenderDelegate",render:function(context,firstTime){context.addClass(this.get("controlSize"));
return arguments.callee.base.apply(this,arguments)},createChildViews:function(){var scroll,menuView,menuItemViews;
scroll=this.createChildView(SC.MenuScrollView,{borderStyle:SC.BORDER_NONE,controlSize:this.get("controlSize")});
menuView=this._menuView=SC.View.create();menuItemViews=this.get("menuItemViews");
menuView.set("layout",{top:0,left:0,height:this.get("menuHeight")});menuView.replaceAllChildren(menuItemViews);
scroll.set("contentView",menuView);this.childViews=[scroll];return this},paneDidAttach:function(){var responder=(this.rootResponder=SC.RootResponder.responder);
responder.panes.add(this);this.set("currentWindowSize",responder.computeWindowSize());
this.set("isPaneAttached",YES);this.parentViewDidChange();this._notifyDidAppendToDocument();
this.becomeMenuPane();return this},becomeMenuPane:function(){if(this.rootResponder){this.rootResponder.makeMenuPane(this)
}return this},resignMenuPane:function(){if(this.rootResponder){this.rootResponder.makeMenuPane(null)
}return this},menuItemViews:function(){var views=[],items=this.get("displayItems"),exampleView=this.get("exampleView"),item,view,height,heightKey,separatorKey,defaultHeight,separatorHeight,menuHeight,menuHeightPadding,keyEquivalentKey,keyEquivalent,keyArray,idx,len;
if(!items){return views}heightKey=this.get("itemHeightKey");separatorKey=this.get("itemSeparatorKey");
defaultHeight=this.get("itemHeight");keyEquivalentKey=this.get("itemKeyEquivalentKey");
separatorHeight=this.get("itemSeparatorHeight");menuHeightPadding=Math.floor(this.get("menuHeightPadding")/2);
menuHeight=menuHeightPadding;keyArray=this.menuItemKeys.map(SC._menu_fetchKeys,this);
len=items.get("length");for(idx=0;idx<len;idx++){item=items[idx];height=item.get(heightKey);
if(!height){height=item.get(separatorKey)?separatorHeight:defaultHeight}view=this._menuView.createChildView(exampleView,{layout:{height:height,top:menuHeight},contentDisplayProperties:keyArray,content:item,parentMenu:this});
views[idx]=view;menuHeight+=height;keyEquivalent=item.get(keyEquivalentKey);if(keyEquivalent){this._keyEquivalents[keyEquivalent]=view
}}this.set("menuHeight",menuHeight+menuHeightPadding);return views}.property("displayItems").cacheable(),menuItemViewForContentIndex:function(idx){var menuItemViews=this.get("menuItemViews");
if(!menuItemViews){return undefined}return menuItemViews.objectAt(idx)},_keyEquivalents:{},rootMenu:function(){if(this.get("isSubMenu")){return this.getPath("parentMenu.rootMenu")
}return this}.property("isSubMenu").cacheable(),windowSizeDidChange:function(oldSize,newSize){this.remove();
return arguments.callee.base.apply(this,arguments)},displayItems:function(){var items=this.get("items"),localize=this.get("localize"),itemHeight=this.get("itemHeight"),len,ret=[],idx,item,itemType;
if(!items){return null}len=items.get("length");for(idx=0;idx<len;idx++){item=items.objectAt(idx);
if(!item){continue}itemType=SC.typeOf(item);if(itemType===SC.T_STRING){item=SC.Object.create({title:item,value:item,isEnabled:YES})
}else{if(itemType===SC.T_HASH){item=SC.Object.create(item)}else{if(itemType===SC.T_ARRAY){item=this.convertArrayMenuItemToObject(item)
}}}item.contentIndex=idx;ret.push(item)}return ret}.property("items").cacheable(),_sc_menu_itemsDidChange:function(){var views=this.get("menuItemViews");
this._menuView.replaceAllChildren(views);this._menuView.adjust("height",this.get("menuHeight"))
}.observes("items"),convertArrayMenuItemToObject:function(item){SC.Logger.warn("Support for Array-based menu items has been deprecated.  Please update your menus to use a hash.");
var keys,fetchKeys=SC._menu_fetchKeys,fetchItem=SC._menu_fetchItem,cur,ret=SC.Object.create(),idx,loc;
keys=this.menuItemKeys.map(fetchKeys,this);ret[keys[0]]=item[0];ret[keys[1]]=item[1];
ret[keys[2]]=item[2];ret[keys[3]]=item[3];ret[keys[4]]=item[4];ret[keys[5]]=item[5];
ret[keys[6]]=item[6];ret[keys[7]]=item[7];ret[keys[8]]=item[8];ret[keys[9]]=item[9];
ret[keys[10]]=item[10];ret[keys[11]]=item[11];ret[keys[12]]=item[12];return ret},currentMenuItem:function(key,value){if(value!==undefined){if(this._currentMenuItem!==null){this.set("previousMenuItem",this._currentMenuItem)
}this._currentMenuItem=value;this.setPath("rootMenu.targetMenuItem",value);return value
}return this._currentMenuItem}.property().cacheable(),_sc_menu_currentMenuItemDidChange:function(){var currentMenuItem=this.get("currentMenuItem"),previousMenuItem=this.get("previousMenuItem");
if(previousMenuItem){if(previousMenuItem.get("hasSubMenu")&&currentMenuItem===null){}else{previousMenuItem.resignFirstResponder();
this.closeOpenMenusFor(previousMenuItem)}}if(currentMenuItem&&currentMenuItem.get("isEnabled")){currentMenuItem.scrollToVisible()
}}.observes("currentMenuItem"),closeOpenMenusFor:function(menuItem){if(!menuItem){return
}var menu=menuItem.get("parentMenu");while(menu&&menuItem){menu=menuItem.get("subMenu");
if(menu){menu.remove();menuItem.resignFirstResponder();menuItem=menu.get("previousMenuItem")
}}},closeOpenMenus:function(){this.closeOpenMenusFor(this.get("previousMenuItem"))
},mouseDown:function(evt){this.modalPaneDidClick(evt);return YES},mouseEntered:function(evt){this.set("mouseHasEntered",YES)
},keyUp:function(evt){var ret=this.interpretKeyEvents(evt);return !ret?NO:ret},moveUp:function(){var currentMenuItem=this.get("currentMenuItem"),items=this.get("menuItemViews"),currentIndex,parentMenu,idx;
if(!currentMenuItem){idx=items.get("length")-1}else{currentIndex=currentMenuItem.getPath("content.contentIndex");
if(currentIndex===0){return YES}idx=currentIndex-1}while(idx>=0){if(items[idx].get("isEnabled")){this.set("currentMenuItem",items[idx]);
items[idx].becomeFirstResponder();break}idx--}return YES},moveDown:function(){var currentMenuItem=this.get("currentMenuItem"),items=this.get("menuItemViews"),len=items.get("length"),currentIndex,parentMenu,idx;
if(!currentMenuItem){idx=0}else{currentIndex=currentMenuItem.getPath("content.contentIndex");
if(currentIndex===len){return YES}idx=currentIndex+1}while(idx<len){if(items[idx].get("isEnabled")){this.set("currentMenuItem",items[idx]);
items[idx].becomeFirstResponder();break}idx++}return YES},insertText:function(chr,evt){var timer=this._timer,keyBuffer=this._keyBuffer;
if(timer){timer.invalidate()}timer=this._timer=SC.Timer.schedule({target:this,action:"clearKeyBuffer",interval:500,isPooled:NO});
keyBuffer=keyBuffer||"";keyBuffer+=chr.toUpperCase();this.selectMenuItemForString(keyBuffer);
this._keyBuffer=keyBuffer;return YES},performKeyEquivalent:function(keyEquivalent,evt,fromVisibleControl){if(!fromVisibleControl&&!this.get("isVisibleInWindow")){return NO
}var menuItem=this._keyEquivalents[keyEquivalent];if(menuItem){menuItem.performAction(YES);
return YES}if(keyEquivalent==="escape"||keyEquivalent==="return"){this.remove();return YES
}return NO},selectMenuItemForString:function(buffer){var items=this.get("menuItemViews"),item,title,idx,len,bufferLength;
if(!items){return}bufferLength=buffer.length;len=items.get("length");for(idx=0;idx<len;
idx++){item=items.objectAt(idx);title=item.get("title");if(!title){continue}title=title.replace(/ /g,"").substr(0,bufferLength).toUpperCase();
if(title===buffer){this.set("currentMenuItem",item);item.becomeFirstResponder();break
}}},clearKeyBuffer:function(){this._keyBuffer=""},modalPaneDidClick:function(evt){this.remove();
return YES}});SC._menu_fetchKeys=function(k){return this.get(k)};SC._menu_fetchItem=function(k){if(!k){return null
}return this.get?this.get(k):this[k]};SC.MenuPane.TINY_MENU_ITEM_HEIGHT=10;SC.MenuPane.TINY_MENU_ITEM_SEPARATOR_HEIGHT=2;
SC.MenuPane.TINY_MENU_HEIGHT_PADDING=2;SC.MenuPane.TINY_SUBMENU_OFFSET_X=0;SC.MenuPane.SMALL_MENU_ITEM_HEIGHT=16;
SC.MenuPane.SMALL_MENU_ITEM_SEPARATOR_HEIGHT=7;SC.MenuPane.SMALL_MENU_HEIGHT_PADDING=4;
SC.MenuPane.SMALL_SUBMENU_OFFSET_X=2;SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT=20;SC.MenuPane.REGULAR_MENU_ITEM_SEPARATOR_HEIGHT=9;
SC.MenuPane.REGULAR_MENU_HEIGHT_PADDING=6;SC.MenuPane.REGULAR_SUBMENU_OFFSET_X=2;
SC.MenuPane.LARGE_MENU_ITEM_HEIGHT=60;SC.MenuPane.LARGE_MENU_ITEM_SEPARATOR_HEIGHT=20;
SC.MenuPane.LARGE_MENU_HEIGHT_PADDING=0;SC.MenuPane.LARGE_SUBMENU_OFFSET_X=4;SC.MenuPane.HUGE_MENU_ITEM_HEIGHT=20;
SC.MenuPane.HUGE_MENU_ITEM_SEPARATOR_HEIGHT=9;SC.MenuPane.HUGE_MENU_HEIGHT_PADDING=0;
SC.MenuPane.HUGE_SUBMENU_OFFSET_X=0;SC.MenuPane.VERTICAL_OFFSET=23;sc_require("views/button");
SC.SelectButtonView=SC.ButtonView.extend({escapeHTML:YES,objects:[],objectsBindingDefault:SC.Binding.multiple(),nameKey:null,sortKey:null,valueKey:null,iconKey:null,isEnabledKey:"isEnabled",localize:YES,disableSort:YES,classNames:["select-button"],menu:null,itemList:[],itemIdx:null,value:null,checkboxEnabled:YES,separatorPosition:null,_defaultVal:null,_defaultTitle:null,_defaultIcon:null,theme:"popup",displayProperties:["icon","value","controlSize","objects","objects.[]"],preferMatrix:null,SELECT_BUTTON_SPRITE_WIDTH:28,isActiveBinding:"*menu.isVisibleInWindow",isDefaultPosition:NO,lastMenuWidth:null,customView:null,customViewClassName:null,customViewMenuOffsetWidth:0,needsEllipsis:YES,menuPaneHeightPadding:0,supportFocusRing:YES,isContextMenuEnabled:NO,leftAlign:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:return SC.SelectButtonView.TINY_OFFSET_X;
case SC.SMALL_CONTROL_SIZE:return SC.SelectButtonView.SMALL_OFFSET_X;case SC.REGULAR_CONTROL_SIZE:return SC.SelectButtonView.REGULAR_OFFSET_X;
case SC.LARGE_CONTROL_SIZE:return SC.SelectButtonView.LARGE_OFFSET_X;case SC.HUGE_CONTROL_SIZE:return SC.SelectButtonView.HUGE_OFFSET_X
}return 0}.property("controlSize"),sortObjects:function(objects){if(!this.get("disableSort")){var nameKey=this.get("sortKey")||this.get("nameKey");
objects=objects.sort(function(a,b){if(nameKey){a=a.get?a.get(nameKey):a[nameKey];
b=b.get?b.get(nameKey):b[nameKey]}return(a<b)?-1:((a>b)?1:0)})}return objects},render:function(context,firstTime){arguments.callee.base.apply(this,arguments);
var layoutWidth,objects,len,nameKey,iconKey,valueKey,checkboxEnabled,currentSelectedVal,shouldLocalize,separatorPosition,itemList,isChecked,idx,name,icon,value,item,itemEnabled,isEnabledKey;
layoutWidth=this.layout.width;if(firstTime&&layoutWidth){this.adjust({width:layoutWidth-this.SELECT_BUTTON_SPRITE_WIDTH})
}objects=this.get("objects");objects=this.sortObjects(objects);len=objects.length;
nameKey=this.get("nameKey");iconKey=this.get("iconKey");valueKey=this.get("valueKey");
isEnabledKey=this.get("isEnabledKey");checkboxEnabled=this.get("checkboxEnabled");
currentSelectedVal=this.get("value");shouldLocalize=this.get("localize");separatorPosition=this.get("separatorPosition");
itemList=[];isChecked=YES;idx=0;objects.forEach(function(object){if(object){name=nameKey?(object.get?object.get(nameKey):object[nameKey]):object.toString();
name=shouldLocalize?name.loc():name;icon=iconKey?(object.get?object.get(iconKey):object[iconKey]):null;
if(SC.none(object[iconKey])){icon=null}value=(valueKey)?(object.get?object.get(valueKey):object[valueKey]):object;
if(!SC.none(currentSelectedVal)&&!SC.none(value)){if(this._equals(currentSelectedVal,value)){this.set("title",name);
this.set("icon",icon)}}if(this._equals(value,this.get("value"))){if(separatorPosition>0&&separatorPosition<len&&idx>=len-separatorPosition){idx++
}this.set("itemIdx",idx);isChecked=!checkboxEnabled?NO:YES}else{isChecked=NO}itemEnabled=(isEnabledKey)?(object.get?object.get(isEnabledKey):object[isEnabledKey]):object;
if(NO!==itemEnabled){itemEnabled=YES}if(idx===0){this._defaultVal=value;this._defaultTitle=name;
this._defaultIcon=icon}var item=SC.Object.create({title:name,icon:icon,value:value,isEnabled:itemEnabled,checkbox:isChecked,target:this,action:"displaySelectedItem"});
itemList.push(item)}idx+=1;if(separatorPosition&&idx===(len-separatorPosition)){var separator=SC.Object.create({separator:YES});
itemList.push(separator)}this.set("itemList",itemList)},this);if(firstTime){this.invokeLast(function(){var value=this.get("value");
if(SC.none(value)){this.set("value",this._defaultVal);this.set("title",this._defaultTitle);
this.set("icon",this._defaultIcon)}})}this.changeSelectButtonPreferMatrix(this.itemIdx)
},_equals:function(value1,value2){var ret=YES;if(value1&&SC.typeOf(value1)===SC.T_HASH&&value2&&SC.typeOf(value2)===SC.T_HASH){for(var key in value1){if(value1[key]!==value2[key]){ret=NO
}}}else{ret=(value1===value2)}return ret},_action:function(evt){var buttonLabel,menuWidth,scrollWidth,lastMenuWidth,offsetWidth,items,elementOffsetWidth,largestMenuWidth,item,element,idx,value,itemList,menuControlSize,menuHeightPadding,customView,customMenuView,menu,itemsLength,dummyMenuItemView,menuItemViewEscapeHTML,menuWidthOffset,body;
buttonLabel=this.$(".sc-button-label")[0];menuWidthOffset=SC.SelectButtonView.MENU_WIDTH_OFFSET;
if(!this.get("isDefaultPosition")){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:menuWidthOffset+=SC.SelectButtonView.TINY_POPUP_MENU_WIDTH_OFFSET;
break;case SC.SMALL_CONTROL_SIZE:menuWidthOffset+=SC.SelectButtonView.SMALL_POPUP_MENU_WIDTH_OFFSET;
break;case SC.REGULAR_CONTROL_SIZE:menuWidthOffset+=SC.SelectButtonView.REGULAR_POPUP_MENU_WIDTH_OFFSET;
break;case SC.LARGE_CONTROL_SIZE:menuWidthOffset+=SC.SelectButtonView.LARGE_POPUP_MENU_WIDTH_OFFSET;
break;case SC.HUGE_CONTROL_SIZE:menuWidthOffset+=SC.SelectButtonView.HUGE_POPUP_MENU_WIDTH_OFFSET;
break}}menuWidth=this.get("layer").offsetWidth+menuWidthOffset;scrollWidth=buttonLabel.scrollWidth;
lastMenuWidth=this.get("lastMenuWidth");if(scrollWidth){offsetWidth=buttonLabel.offsetWidth;
if(scrollWidth&&offsetWidth){menuWidth=menuWidth+scrollWidth-offsetWidth}}if(!lastMenuWidth||(menuWidth>lastMenuWidth)){lastMenuWidth=menuWidth
}items=this.get("itemList");var customViewClassName=this.get("customViewClassName"),customViewMenuOffsetWidth=this.get("customViewMenuOffsetWidth"),className="sc-view sc-pane sc-panel sc-palette sc-picker sc-menu select-button sc-scroll-view sc-menu-scroll-view sc-container-view menuContainer sc-button-view sc-menu-item sc-regular-size";
className=customViewClassName?(className+" "+customViewClassName):className;dummyMenuItemView=(this.get("customView")||SC.MenuItemView).create();
menuItemViewEscapeHTML=dummyMenuItemView.get("escapeHTML");var body=document.body;
for(idx=0,itemsLength=items.length;idx<itemsLength;++idx){item=items.objectAt(idx);
element=document.createElement("div");element.style.cssText="top:-10000px; left: -10000px;  position: absolute;";
element.className=className;element.innerHTML=menuItemViewEscapeHTML?SC.RenderContext.escapeHTML(item.title):item.title;
body.appendChild(element);elementOffsetWidth=element.offsetWidth+customViewMenuOffsetWidth;
if(!largestMenuWidth||(elementOffsetWidth>largestMenuWidth)){largestMenuWidth=elementOffsetWidth
}body.removeChild(element)}largestMenuWidth=(largestMenuWidth>lastMenuWidth)?largestMenuWidth:lastMenuWidth;
var maxWidth=SC.RootResponder.responder.get("currentWindowSize").width;if(largestMenuWidth>maxWidth){largestMenuWidth=(maxWidth-25)
}this.set("lastMenuWidth",lastMenuWidth);value=this.get("value");itemList=this.get("itemList");
menuControlSize=this.get("controlSize");customView=this.get("customView");customMenuView=customView?customView:SC.MenuItemView;
menu=SC.MenuPane.create({classNames:["select-button"],items:itemList,exampleView:customMenuView,isEnabled:YES,preferType:SC.PICKER_MENU,itemHeightKey:"height",layout:{width:largestMenuWidth},controlSize:menuControlSize,itemWidth:lastMenuWidth,performKeyEquivalent:function(keystring,evt){switch(keystring){case"tab":case"shift_tab":return YES;
default:return arguments.callee.base.apply(this,arguments)}}});if(!menu){return NO
}menu.popup(this,this.preferMatrix);this.set("menu",menu);customView=menu.menuItemViewForContentIndex(this.get("itemIdx"));
menu.set("currentMenuItem",customView);if(customView){customView.becomeFirstResponder()
}this.set("isActive",YES);return YES},displaySelectedItem:function(menuView){var currentItem=this.getPath("menu.selectedItem");
if(!currentItem){return NO}this.set("value",currentItem.get("value"));this.set("title",currentItem.get("title"));
this.set("itemIdx",currentItem.get("contentIndex"));return YES},changeSelectButtonPreferMatrix:function(){var controlSizeTuning=0,customMenuItemHeight=0,customSeparatorHeight=0,separatorHeightTuning=0,pos,len;
switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:controlSizeTuning=SC.SelectButtonView.TINY_OFFSET_Y;
customMenuItemHeight=SC.MenuPane.TINY_MENU_ITEM_HEIGHT;customSeparatorHeight=SC.MenuPane.TINY_MENU_ITEM_SEPARATOR_HEIGHT;
break;case SC.SMALL_CONTROL_SIZE:controlSizeTuning=SC.SelectButtonView.SMALL_OFFSET_Y;
customMenuItemHeight=SC.MenuPane.SMALL_MENU_ITEM_HEIGHT;customSeparatorHeight=SC.MenuPane.SMALL_MENU_ITEM_SEPARATOR_HEIGHT;
break;case SC.REGULAR_CONTROL_SIZE:controlSizeTuning=SC.SelectButtonView.REGULAR_OFFSET_Y;
customMenuItemHeight=SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT;customSeparatorHeight=SC.MenuPane.REGULAR_MENU_ITEM_SEPARATOR_HEIGHT;
break;case SC.LARGE_CONTROL_SIZE:controlSizeTuning=SC.SelectButtonView.LARGE_OFFSET_Y;
customMenuItemHeight=SC.MenuPane.LARGE_MENU_ITEM_HEIGHT;customSeparatorHeight=SC.MenuPane.LARGE_MENU_ITEM_SEPARATOR_HEIGHT;
break;case SC.HUGE_CONTROL_SIZE:controlSizeTuning=SC.SelectButtonView.HUGE_OFFSET_Y;
customMenuItemHeight=SC.MenuPane.HUGE_MENU_ITEM_HEIGHT;customSeparatorHeight=SC.MenuPane.HUGE_MENU_ITEM_SEPARATOR_HEIGHT;
break}var preferMatrixAttributeTop=controlSizeTuning,itemIdx=this.get("itemIdx"),leftAlign=this.get("leftAlign"),defPreferMatrix,tempPreferMatrix;
if(this.get("isDefaultPosition")){defPreferMatrix=[1,0,3];this.set("preferMatrix",defPreferMatrix)
}else{if(itemIdx){preferMatrixAttributeTop=itemIdx*customMenuItemHeight+controlSizeTuning;
pos=this.get("separatorPosition");len=this.get("objects").length;if(pos>0&&pos<len&&itemIdx>=len-pos){separatorHeightTuning=customMenuItemHeight-customSeparatorHeight;
preferMatrixAttributeTop-=separatorHeightTuning}}tempPreferMatrix=[leftAlign,-preferMatrixAttributeTop,2];
this.set("preferMatrix",tempPreferMatrix)}},mouseDown:function(evt){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;this.becomeFirstResponder();this._action();
this.invokeLast(this._recordMouseDownTimestamp);return YES},_recordMouseDownTimestamp:function(){this._menuRenderedTimestamp=new Date().getTime()
},mouseUp:function(evt){var timestamp=new Date().getTime(),previousTimestamp=this._menuRenderedTimestamp,menu=this.get("menu"),touch=SC.platform.touch,targetMenuItem;
if(menu){targetMenuItem=menu.getPath("rootMenu.targetMenuItem");if(targetMenuItem&&targetMenuItem.get("mouseHasEntered")){if(!targetMenuItem.performAction()){menu.remove()
}}else{if(!touch&&(timestamp-previousTimestamp>SC.ButtonView.CLICK_AND_HOLD_DELAY)){if(!menu.get("mouseHasEntered")&&!this.get("isDefaultPosition")){targetMenuItem=menu.get("currentMenuItem");
if(targetMenuItem&&!targetMenuItem.performAction()){menu.remove()}}else{menu.remove()
}}}}this._isMouseDown=NO;this.set("isActive",NO);return YES},mouseExited:function(){return YES
},keyDown:function(event){if(this.interpretKeyEvents(event)){return YES}else{return arguments.callee.base.apply(this,arguments)
}},interpretKeyEvents:function(event){if(event){if((event.keyCode===38||event.keyCode===40)){this._action()
}else{if(event.keyCode===27){this.resignFirstResponder()}}}return arguments.callee.base.apply(this,arguments)
},acceptsFirstResponder:function(){return this.get("isEnabled")}.property("isEnabled"),_button_isSelectedDidChange:function(){}.observes("isSelected"),didAppendToDocument:function(){}});
SC.SelectButtonView.TINY_OFFSET_X=0;SC.SelectButtonView.TINY_OFFSET_Y=0;SC.SelectButtonView.TINY_POPUP_MENU_WIDTH_OFFSET=0;
SC.SelectButtonView.SMALL_OFFSET_X=-18;SC.SelectButtonView.SMALL_OFFSET_Y=3;SC.SelectButtonView.SMALL_POPUP_MENU_WIDTH_OFFSET=7;
SC.SelectButtonView.REGULAR_OFFSET_X=-17;SC.SelectButtonView.REGULAR_OFFSET_Y=3;SC.SelectButtonView.REGULAR_POPUP_MENU_WIDTH_OFFSET=4;
SC.SelectButtonView.LARGE_OFFSET_X=-17;SC.SelectButtonView.LARGE_OFFSET_Y=6;SC.SelectButtonView.LARGE_POPUP_MENU_WIDTH_OFFSET=3;
SC.SelectButtonView.HUGE_OFFSET_X=0;SC.SelectButtonView.HUGE_OFFSET_Y=0;SC.SelectButtonView.HUGE_POPUP_MENU_WIDTH_OFFSET=0;
SC.SelectButtonView.MENU_WIDTH_OFFSET=-2;sc_require("panes/panel");SC.SheetPane=SC.PanelPane.extend({classNames:"sc-sheet",modalPane:SC.ModalPane,transitionDuration:200,_state:"NO_VIEW",init:function(){arguments.callee.base.apply(this,arguments);
if(SC.Animatable){SC.SheetPane.ANIMATABLE_AVAILABLE=YES;this.mixin(SC.Animatable);
if(!this.transitions){this.transitions={}}if(!this.transitions.top){this.transitions.top={duration:this.transitionDuration===200?0.3:this.transitionDuration/1000,action:"_complete",target:this}
}}},append:function(){var layout=this.get("layout");if(!layout.height||!layout.top){layout=SC.View.convertLayoutToAnchoredLayout(layout,this.computeParentDimensions())
}layout.top=-1*layout.height;if(this.disableAnimation){this.disableAnimation()}this.adjust(layout);
this.updateLayout();if(this.enableAnimation){this.enableAnimation()}return arguments.callee.base.apply(this,arguments)
},remove:function(){var that=this,args=arguments;this.invokeLater(function(){args.callee.base.apply(that,args)
},this.transitionDuration);this.slideUp();return this},paneDidAttach:function(){var ret=arguments.callee.base.apply(this,arguments);
this.slideDown();return ret},slideDown:function(){this._state=SC.SheetPane.ANIMATING;
this._direction=SC.SheetPane.SLIDE_DOWN;if(SC.SheetPane.ANIMATABLE_AVAILABLE){this.transitions.top.timing=SC.Animatable.TRANSITION_EASE_OUT;
this.adjust("top",0)}else{this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this.tick()}},slideUp:function(){this._state=SC.SheetPane.ANIMATING;this._direction=SC.SheetPane.SLIDE_UP;
if(SC.SheetPane.ANIMATABLE_AVAILABLE){var layout=this.get("layout");this.transitions.top.timing=SC.Animatable.TRANSITION_EASE_IN;
this.adjust("top",-1*layout.height)}else{this._start=Date.now();this._end=this._start+this.get("transitionDuration");
this.tick()}},_complete:function(){var dir=this._direction;if(dir===SC.SheetPane.SLIDE_DOWN){if(!SC.SheetPane.ANIMATABLE_AVAILABLE){this.adjust("top",0)
}this.adjust({centerX:0,left:null});if(SC.browser.mozilla){this.parentViewDidChange()
}}else{var layout=this.get("layout");if(!SC.SheetPane.ANIMATABLE_AVAILABLE){this.adjust("top",-1*layout.height)
}}this._state=SC.SheetPane.READY;this.updateLayout()},blurTo:function(pane){this.setFirstResponder("")
},tick:function(){this._timer=null;var now=Date.now();var pct=(now-this._start)/(this._end-this._start),target=this,dir=this._direction,layout=this.get("layout"),newLayout,adjust;
if(pct<0){pct=0}if(pct>=1){this._complete();return this}adjust=Math.floor(layout.height*pct);
if(dir==SC.SheetPane.SLIDE_DOWN){target.adjust("top",0-(layout.height-adjust))}else{if(dir==SC.SheetPane.SLIDE_UP){target.adjust("top",0-adjust)
}}this._timer=this.invokeLater(this.tick,20);target.updateLayout();return this}});
SC.SheetPane.mixin({ANIMATABLE_AVAILABLE:NO,NO_VIEW:"NO_VIEW",ANIMATING:"ANIMATING",READY:"READY",SLIDE_DOWN:"SLIDEDOWN",SLIDE_UP:"SLIDEUP"});
SC.BaseTheme.buttonRenderDelegate=SC.RenderDelegate.create({name:"button",render:function(dataSource,context){var theme=dataSource.get("theme"),minWidth=dataSource.get("titleMinWidth"),toolTip=dataSource.get("displayToolTip"),view=dataSource.get("view"),isSelected=dataSource.get("isSelected"),isActive=dataSource.get("isActive"),isPopUpButton=NO,menu=view.get("menu");
if(menu){isPopUpButton=YES}var labelContent;context.setClass("icon",!!dataSource.get("icon")||0);
context.setClass("def",dataSource.get("isDefault")||0);context.setClass("cancel",dataSource.get("isCancel")||0);
if(toolTip){context.attr("title",toolTip);context.attr("alt",toolTip)}context.attr("aria-pressed",isActive);
if(isPopUpButton){context.attr("aria-haspopup",isPopUpButton.toString())}minWidth=(minWidth?"style='min-width: "+minWidth+"px'":"");
context=context.push("<span class='sc-button-inner' "+minWidth+">");context=context.begin("label").addClass("sc-button-label");
theme.labelRenderDelegate.render(dataSource,context);context=context.end();context.push("</span>");
if(dataSource.get("supportFocusRing")){context.push('<div class="focus-ring">','<div class="focus-left"></div>','<div class="focus-middle"></div>','<div class="focus-right"></div></div>')
}},update:function(dataSource,jquery){var theme=dataSource.get("theme"),isSelected=dataSource.get("isSelected"),isActive=dataSource.get("isActive"),view=dataSource.get("view"),menu=view.get("menu"),isPopUpButton=NO;
if(menu){isPopUpButton=YES}if(dataSource.get("isActive")){jquery.addClass("active")
}if(dataSource.get("isDefault")){jquery.addClass("default")}if(dataSource.get("isCancel")){jquery.addClass("cancel")
}if(dataSource.get("icon")){jquery.addClass("icon")}jquery.attr("aria-pressed",isActive);
if(isPopUpButton){jquery.attr("aria-haspopup",isPopUpButton.toString())}theme.labelRenderDelegate.update(dataSource,jquery.find("label"))
}});SC.BaseTheme.checkboxRenderDelegate=SC.RenderDelegate.create({name:"checkbox",render:function(dataSource,context){var theme=dataSource.get("theme"),view=dataSource.get("view"),ariaLabel,ariaLabeledBy;
if(view){ariaLabel=view.get("ariaLabel");ariaLabeledBy=view.get("ariaLabeledBy")}var isSelected=dataSource.get("isSelected")||NO;
var isActive=dataSource.get("isActive");var isDisabled=!dataSource.get("isEnabled");
context.attr("role","checkbox");context.attr("aria-checked",isSelected.toString());
if(ariaLabeledBy&&ariaLabeledBy!==""){context.attr("aria-labelledby",ariaLabeledBy)
}if(ariaLabel&&ariaLabel!==""){context.attr("aria-label",ariaLabel)}context.setClass({sel:isSelected,active:isActive,disabled:isDisabled});
context.push('<span class = "button"></span>');context=context.begin("span").addClass("label");
theme.labelRenderDelegate.render(dataSource,context);context=context.end()},update:function(dataSource,jquery){var theme=dataSource.get("theme"),view=dataSource.get("view"),ariaLabel,ariaLabeledBy;
if(view){ariaLabel=view.get("ariaLabel");ariaLabeledBy=view.get("ariaLabeledBy")}var isSelected=dataSource.get("isSelected");
var isActive=dataSource.get("isActive");var isDisabled=!dataSource.get("isEnabled");
jquery.attr("aria-checked",isSelected.toString());if(ariaLabeledBy&&ariaLabeledBy!==""){jquery.attr("aria-labelledby",ariaLabeledBy)
}if(ariaLabel&&ariaLabel!==""){jquery.attr("aria-label",ariaLabel)}theme.labelRenderDelegate.update(dataSource,jquery.find("span.label"));
jquery.setClass({sel:isSelected,active:isActive,disabled:isDisabled})}});SC.BaseTheme.collectionRenderDelegate=SC.RenderDelegate.create({name:"collection",render:function(dataSource,context){context.setClass("focus",dataSource.get("isFirstResponder"));
context.setClass("disabled",!dataSource.get("isEnabled"));context.setClass("active",dataSource.get("isActive"))
},update:function(dataSource,jquery){jquery.setClass("focus",dataSource.get("isFirstResponder"));
jquery.setClass("disabled",!dataSource.get("isEnabled"));jquery.setClass("active",dataSource.get("isActive"))
}});SC.BaseTheme.disclosureRenderDelegate=SC.RenderDelegate.create({name:"disclosure",render:function(dataSource,context){var theme=dataSource.get("theme"),value=dataSource.get("value"),title=dataSource.get("title"),view=dataSource.get("view"),ariaLabel;
if(view){ariaLabel=view.get("ariaLabel")}context.attr("aria-expanded",value);if(ariaLabel&&ariaLabel!==""){context.attr("aria-label",ariaLabel)
}if(dataSource.get("isSelected")){context.addClass("sel")}var state="";state+=dataSource.get("isSelected")?"open":"closed";
if(dataSource.get("isActive")){state+=" active"}context.push('<img src = "'+SC.BLANK_IMAGE_URL+'" class = "disclosure button '+state+'" />');
context=context.begin("span").addClass("sc-button-label");theme.labelRenderDelegate.render(dataSource,context);
context=context.end()},update:function(dataSource,jquery){var theme=dataSource.get("theme"),value=dataSource.get("value"),title=dataSource.get("title"),view=dataSource.get("view"),ariaLabel;
if(view){ariaLabel=view.get("ariaLabel")}jquery.attr("aria-expanded",value);if(ariaLabel&&ariaLabel!==""){jquery.attr("aria-label",ariaLabel)
}if(dataSource.get("isSelected")){jquery.addClass("sel")}jquery.find("img").setClass({open:dataSource.get("isSelected"),closed:!dataSource.get("isSelected"),active:dataSource.get("isActive")});
theme.labelRenderDelegate.update(dataSource,jquery.find("span.sc-button-label"))}});
SC.THREE_SLICE=["left","middle","right"];SC.NINE_SLICE=["top-left","top","top-right","left","middle","right","bottom-left","bottom","bottom-right"];
SC.mixin(SC.RenderDelegate.prototype,{includeSlices:function(dataSource,context,slices){for(var idx=0,len=slices.length;
idx<len;idx++){context.push('<div class="'+slices[idx]+'"></div>')}}});SC.BaseTheme.imageButtonRenderDelegate=SC.RenderDelegate.create({name:"image-button",render:function(dataSource,context){var image=dataSource.get("image");
context.addClass("no-min-width");if(image){context.push("<div class='img "+image+"'></div>")
}else{context.push("<div class='img'></div>")}},update:function(dataSource,$){if(dataSource.didChangeFor("imageButtonRenderDelegate","image")){var image=dataSource.get("image");
$.children()[0].className="img "+image}}});SC.BaseTheme.MASTER_DETAIL_DIVIDER_WIDTH=1;
SC.BaseTheme.masterDetailRenderDelegate=SC.RenderDelegate.create({name:"master-detail",render:function(dataSource,context){context.setClass("round-toolbars",SC.platform.touch)
},update:function(dataSource,jquery){jquery.setClass("round-toolbars",SC.platform.touch)
}});SC.BaseTheme.panelRenderDelegate=SC.RenderDelegate.create({name:"panel",render:function(dataSource,context){context.push("<div class='middle'></div>","<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>")
},update:function(){}});sc_require("render_delegates/panel");SC.BaseTheme.menuRenderDelegate=SC.RenderDelegate.create({name:"menu",render:function(dataSource,context){var panelRenderDelegate=dataSource.get("theme").panelRenderDelegate;
panelRenderDelegate.render(dataSource,context);var preferType=dataSource.get("preferType");
var pointerPosition=dataSource.get("pointerPos");var pointerPositionY=dataSource.get("pointerPosY");
if(preferType==SC.PICKER_POINTER||preferType==SC.PICKER_MENU_POINTER){context.push('<div class="sc-pointer '+pointerPosition+'" style="margin-top: '+pointerPositionY+'px"></div>');
context.addClass(pointerPosition)}},update:function(dataSource,$){var panelRenderDelegate=dataSource.get("theme").panelRenderDelegate;
panelRenderDelegate.update(dataSource,$);var preferType=dataSource.get("preferType");
var pointerPosition=dataSource.get("pointerPos");var pointerPositionY=dataSource.get("pointerPosY");
if(preferType==SC.PICKER_POINTER||preferType==SC.PICKER_MENU_POINTER){var el=$.find(".sc-pointer");
el.attr("class","sc-pointer "+pointerPosition);el.attr("style","margin-top: "+pointerPositionY+"px");
$.addClass(pointerPosition)}}});sc_require("render_delegates/panel");SC.BaseTheme.pickerRenderDelegate=SC.RenderDelegate.create({name:"picker",render:function(dataSource,context){var panelRenderDelegate=dataSource.get("theme").panelRenderDelegate;
panelRenderDelegate.render(dataSource,context);var preferType=dataSource.get("preferType");
var pointerPosition=dataSource.get("pointerPos");var pointerPositionY=dataSource.get("pointerPosY");
if(preferType==SC.PICKER_POINTER||preferType==SC.PICKER_MENU_POINTER){context.push('<div class="sc-pointer '+pointerPosition+'" style="margin-top: '+pointerPositionY+'px"></div>');
context.addClass(pointerPosition)}},update:function(dataSource,$){var panelRenderDelegate=dataSource.get("theme").panelRenderDelegate;
panelRenderDelegate.update(dataSource,$);var preferType=dataSource.get("preferType");
var pointerPosition=dataSource.get("pointerPos");var pointerPositionY=dataSource.get("pointerPosY");
if(preferType==SC.PICKER_POINTER||preferType==SC.PICKER_MENU_POINTER){var el=$.find(".sc-pointer");
el.attr("class","sc-pointer "+pointerPosition);el.attr("style","margin-top: "+pointerPositionY+"px");
$.addClass(pointerPosition)}}});SC.BaseTheme.PROGRESS_ANIMATED_BACKGROUND_MATRIX=[];
SC.BaseTheme.PROGRESS_OFFSET_RANGE=24;SC.BaseTheme.progressRenderDelegate=SC.RenderDelegate.create({render:function(dataSource,context){var theme=dataSource.get("theme"),valueMax=dataSource.get("maximum"),valueMin=dataSource.get("minimum"),valueNow=dataSource.get("value");
var inner,animatedBackground,value=dataSource.get("value")*100,cssString,backPosition,isIndeterminate=dataSource.get("isIndeterminate"),isRunning=dataSource.get("isRunning"),isEnabled=dataSource.get("isEnabled"),offsetRange=theme.PROGRESS_OFFSET_RANGE,offset=(isIndeterminate&&isRunning)?(Math.floor(Date.now()/75)%offsetRange-offsetRange):0;
context.attr("aria-valuemax",valueMax);context.attr("aria-valuemin",valueMin);context.attr("aria-valuenow",valueNow);
context.attr("aria-valuetext",valueNow);if(dataSource.get("offsetRange")){if(!this._hasGivenOffsetRangeDeprecationWarning){console.warn("The 'offsetRange' property for progressRenderDelegate is deprecated. Please override the value on your theme, instead, by setting its PROGRESS_OFFSET_RANGE property.")
}this._hasGivenOffsetRangeDeprecationWarning=YES;offsetRange=dataSource.get("offsetRange")
}var classNames={"sc-indeterminate":isIndeterminate,"sc-empty":(value<=0),"sc-complete":(value>=100)};
if(!isEnabled){value="0%"}else{if(isIndeterminate){value="120%"}else{value=value+"%"
}}var classString=this._createClassNameString(classNames);context.push('<div class="sc-inner ',classString,'" style="width: ',value,";left: ",offset,'px;">','<div class="sc-inner-head">',"</div>",'<div class="sc-inner-tail"></div></div>','<div class="sc-outer-head"></div>','<div class="sc-outer-tail"></div>')
},update:function(dataSource,$){var theme=dataSource.get("theme"),valueNow=dataSource.get("value");
var inner,value,cssString,backPosition,animatedBackground=theme.PROGRESS_ANIMATED_BACKGROUND_MATRIX,isIndeterminate=dataSource.get("isIndeterminate"),isRunning=dataSource.get("isRunning"),isEnabled=dataSource.get("isEnabled"),offsetRange=dataSource.get("offsetRange"),offset=(isIndeterminate&&isRunning)?(Math.floor(Date.now()/75)%offsetRange-offsetRange):0;
if(!isEnabled){value="0%"}else{if(isIndeterminate){value="120%"}else{value=(dataSource.get("value")*100)+"%"
}}var classNames={"sc-indeterminate":isIndeterminate,"sc-empty":(value<=0),"sc-complete":(value>=100)};
$.attr("aria-valuenow",valueNow);$.attr("aria-valuetext",valueNow);$.setClass(classNames);
inner=$.find(".sc-inner");if(dataSource.get("animatedBackgroundMatrix")){if(!this._hasGivenAnimatedBackgroundDeprecationWarning){console.warn("The 'animatedBackgroundMatrix' property for progressRenderDelegate is deprecated. Please override the value on your theme by setting its PROGRESS_ANIMATED_BACKGROUND_MATRIX property.")
}this._hasGivenAnimatedBackgroundDeprecationWarning=YES;animatedBackground=dataSource.get("animatedBackgroundMatrix")
}if(!animatedBackground){animatedBackground=theme.PROGRESS_ANIMATED_BACKGROUND_MATRIX
}cssString="width: "+value+"; ";cssString=cssString+"left: "+offset+"px; ";if(animatedBackground.length===3){inner.css("backgroundPosition","0px -"+(animatedBackground[0]+animatedBackground[1]*this._currentBackground)+"px");
if(this._currentBackground===animatedBackground[2]-1||this._currentBackground===0){this._nextBackground*=-1
}this._currentBackground+=this._nextBackground;cssString=cssString+"backgroundPosition: "+backPosition+"px; ";
inner.attr("style",cssString)}else{inner.attr("style",cssString)}},_createClassNameString:function(classNames){var classNameArray=[],key;
for(key in classNames){if(!classNames.hasOwnProperty(key)){continue}if(classNames[key]){classNameArray.push(key)
}}return classNameArray.join(" ")}});SC.BaseTheme.radioRenderDelegate=SC.RenderDelegate.create({name:"radio",render:function(dataSource,context){var theme=dataSource.get("theme");
var isSelected=dataSource.get("isSelected"),width=dataSource.get("width"),title=dataSource.get("title"),value=dataSource.get("value"),ariaLabeledBy=dataSource.get("ariaLabeledBy"),ariaLabel=dataSource.get("ariaLabel");
context.setClass({active:dataSource.get("isActive"),mixed:dataSource.get("isMixed"),sel:dataSource.get("isSelected"),disabled:!dataSource.get("isEnabled")});
context.attr("role","radio");context.attr("aria-checked",isSelected);if(ariaLabel&&ariaLabel!==""){context.attr("aria-label",ariaLabel)
}if(ariaLabeledBy&&ariaLabeledBy!==""){context.attr("aria-labelledby",ariaLabeledBy)
}if(width){context.css("width",width)}context.push('<span class = "button"></span>');
context=context.begin("span").addClass("sc-button-label");theme.labelRenderDelegate.render(dataSource,context);
context=context.end()},update:function(dataSource,jquery){var theme=dataSource.get("theme");
var isSelected=dataSource.get("isSelected"),width=dataSource.get("width"),title=dataSource.get("title"),value=dataSource.get("value"),ariaLabeledBy=dataSource.get("ariaLabeledBy"),ariaLabel=dataSource.get("ariaLabel");
jquery.setClass({active:dataSource.get("isActive"),mixed:dataSource.get("isMixed"),sel:dataSource.get("isSelected"),disabled:!dataSource.get("isEnabled")});
jquery.attr("aria-checked",isSelected);if(ariaLabel!==""){jquery.attr("aria-label",ariaLabel)
}if(ariaLabeledBy!==""){jquery.attr("aria-labelledby",ariaLabeledBy)}jquery.css("width",width?width:null);
theme.labelRenderDelegate.update(dataSource,jquery.find(".sc-button-label"))}});SC.BaseTheme.radioGroupRenderDelegate=SC.RenderDelegate.create({name:"radio-group",render:function(dataSource,context){var theme=dataSource.get("theme"),name=SC.guidFor(this),items=dataSource.get("items"),idx,len=items.length,item;
context.addClass(dataSource.get("layoutDirection"));context.attr("role","radiogroup");
for(idx=0;idx<len;idx++){item=items[idx];context=context.begin("div").addClass("radio-"+idx).attr("index",idx).addClass(theme.classNames).addClass(theme.radioRenderDelegate.name).addClass("sc-radio-button");
theme.radioRenderDelegate.render(item,context);context=context.end()}dataSource.get("renderState").radioCount=idx
},update:function(dataSource,jquery){var theme=dataSource.get("theme"),name=SC.guidFor(this),items=dataSource.get("items"),idx,len=items.length,item;
jquery.addClass(dataSource.get("layoutDirection"));if(dataSource.get("renderState").radioCount!==len){var context=SC.RenderContext(jquery[0]);
this.render(dataSource,context);context.update();return}for(idx=0;idx<len;idx++){item=items[idx];
theme.radioRenderDelegate.update(item,jquery.find(".radio-"+idx))}},updateRadioAtIndex:function(dataSource,jquery,index){var item=dataSource.get("items")[index];
dataSource.get("theme").radioRenderDelegate.update(item,jquery.find(".radio-"+index))
},indexForEvent:function(dataSource,jquery,evt){var index=$(evt.target).closest(".sc-radio-button").attr("index");
if(isNaN(index)){return undefined}return parseInt(index,0)}});SC.BaseTheme.segmentRenderDelegate=SC.Object.create({render:function(dataSource,context){var theme=dataSource.get("theme"),buttonDelegate,classes;
classes={"sc-first-segment":dataSource.get("isFirstSegment"),"sc-middle-segment":dataSource.get("isMiddleSegment"),"sc-last-segment":dataSource.get("isLastSegment"),"sc-overflow-segment":dataSource.get("isOverflowSegment")};
if(!SC.none(dataSource.get("index"))){classes["sc-segment-"+dataSource.get("index")]=YES
}context.setClass(classes);buttonDelegate=theme.buttonRenderDelegate;buttonDelegate.render(dataSource,context)
},update:function(dataSource,jquery){var theme=dataSource.get("theme"),buttonDelegate,titleMinWidth,classes={};
classes={"sc-first-segment":dataSource.get("isFirstSegment"),"sc-middle-segment":dataSource.get("isMiddleSegment"),"sc-last-segment":dataSource.get("isLastSegment"),"sc-overflow-segment":dataSource.get("isOverflowSegment")||NO};
if(!SC.none(dataSource.get("index"))){classes["sc-segment-"+dataSource.get("index")]=YES
}jquery.setClass(classes);buttonDelegate=theme.buttonRenderDelegate;buttonDelegate.update(dataSource,jquery)
}});SC.BaseTheme.segmentedRenderDelegate=SC.Object.create({render:function(dataSource,context){context.addStyle("text-align",dataSource.get("align"))
},update:function(dataSource,jquery){jquery.css("text-align",dataSource.get("align"))
},segmentWidths:function(dataSource){var elements=dataSource.$(".sc-segment-view"),el,widths=[];
for(var i=0,length=elements.length;i<length-1;i++){el=elements[i];widths[i]=el.getBoundingClientRect().width
}return widths},overflowSegmentWidth:function(dataSource){var elements=dataSource.$(".sc-segment-view"),el;
el=elements[elements.length-1];return el.getBoundingClientRect().width},indexForClientPosition:function(dataSource,x,y){var segmentLayers=dataSource.$(".sc-segment-view"),length,i,segmentLayer,rect,point;
point={x:x,y:y};for(i=0,length=segmentLayers.length;i<length;i++){segmentLayer=segmentLayers[i];
rect=segmentLayer.getBoundingClientRect();rect.x=rect.left;rect.y=rect.top;if(SC.pointInRect(point,rect)){return i
}}return -1}});SC.BaseTheme.sliderRenderDelegate=SC.RenderDelegate.create({name:"slider",render:function(dataSource,context){var blankImage=SC.BLANK_IMAGE_URL,valueMax=dataSource.get("maximum"),valueMin=dataSource.get("minimum"),valueNow=dataSource.get("value");
context.push('<span class="sc-inner">','<span class="sc-leftcap"></span>','<span class="sc-rightcap"></span>','<img src="',blankImage,'" class="sc-handle" style="left: ',dataSource.get("value"),'%" />',"</span>");
context.attr("aria-valuemax",valueMax);context.attr("aria-valuemin",valueMin);context.attr("aria-valuenow",valueNow);
context.attr("aria-valuetext",valueNow);context.attr("aria-orientation","horizontal")
},update:function(dataSource,jquery){var valueNow=dataSource.get("value");if(dataSource.didChangeFor("sliderRenderDelegate","value")){jquery.find(".sc-handle").css("left",dataSource.get("value")+"%")
}jquery.attr("aria-valuenow",valueNow);jquery.attr("aria-valuetext",valueNow)}});
SC.BaseTheme.SourceList=SC.BaseTheme.subtheme("source-list");SC.BaseTheme.toolbarRenderDelegate=SC.RenderDelegate.create({name:"toolbar",render:function(dataSource,context){},update:function(){}});
SC.BaseTheme.wellRenderDelegate=SC.Object.create({name:"well",render:function(dataSource,context){context.push("<div class='top-left-edge'></div>","<div class='top-edge'></div>","<div class='top-right-edge'></div>","<div class='right-edge'></div>","<div class='bottom-right-edge'></div>","<div class='bottom-edge'></div>","<div class='bottom-left-edge'></div>","<div class='left-edge'></div>","<div class='content-background'></div>")
},update:function(){}});SC.BaseTheme.workspaceRenderDelegate=SC.Object.create({name:"workspace",render:function(){},update:function(){}});
SC.DRAG_LINK=4;SC.DRAG_COPY=1;SC.DRAG_MOVE=2;SC.DRAG_NONE=0;SC.DRAG_ANY=15;SC.DRAG_DATA=8;
SC.DRAG_AUTOSCROLL_ZONE_THICKNESS=20;SC.View.reopen({init:function(original){original();
if(this.get("isDropTarget")){SC.Drag.addDropTarget(this)}if(this.get("isScrollable")){SC.Drag.addScrollableView(this)
}}.enhance(),destroy:function(original){if(this.get("isDropTarget")){SC.Drag.removeDropTarget(this)
}if(this.get("isScrollable")){SC.Drag.removeScrollableView(this)}return original()
}.enhance()});SC.Drag=SC.Object.extend({source:null,ghostView:null,ghostActsLikeCursor:NO,dragView:null,ghost:YES,sourceIsDraggable:YES,slideBack:YES,ghostOffset:{x:0,y:0},location:{},dataTypes:function(){if(this.dataSource){return this.dataSource.get("dragDataTypes")||[]
}var hash=this.data;if(hash){var ret=[];for(var key in hash){if(hash.hasOwnProperty(key)){ret.push(key)
}}return ret}var source=this.get("source");if(source&&source.dragDataTypes){return source.get("dragDataTypes")||[]
}return[]}.property().cacheable(),hasDataType:function(dataType){return(this.get("dataTypes").indexOf(dataType)>=0)
},dataForType:function(dataType){if(this.dataSource){return this.dataSource.dragDataForType(this,dataType)
}else{if(this.data){return this.data[dataType]}else{var source=this.get("source");
if(source&&SC.typeOf(source.dragDataForType)==SC.T_FUNCTION){return source.dragDataForType(this,dataType)
}else{return null}}}},dataSource:null,data:null,allowedDragOperations:SC.DRAG_ANY,_dragInProgress:YES,_dragViewWasVisible:null,startDrag:function(){if(this.get("sourceIsDraggable")){this._createGhostView()
}var evt=this.event;var loc={x:evt.pageX,y:evt.pageY};this.set("location",loc);if(this.get("sourceIsDraggable")){var dv=this._getDragView();
var pv=dv.get("parentView");var origin=pv?pv.convertFrameToView(dv.get("frame"),null):dv.get("frame");
if(this.get("ghost")){this._dragViewWasVisible=dv.get("isVisible");dv.set("isVisible",NO)
}if(this.ghostActsLikeCursor){this.ghostOffset={x:14,y:14}}else{this.ghostOffset={x:(loc.x-origin.x),y:(loc.y-origin.y)}
}if(!this._ghostViewHidden){this._positionGhostView(evt)}if(evt.makeTouchResponder){var self=this;
SC.Timer.schedule({target:evt,action:function(){if(!evt.hasEnded){evt.makeTouchResponder(self,YES)
}},interval:1})}else{this.ghostView.rootResponder.dragDidStart(this,evt)}}var source=this.source;
if(source&&source.dragDidBegin){source.dragDidBegin(this,loc)}var ary=this._dropTargets();
for(var idx=0,len=ary.length;idx<len;idx++){ary[idx].tryToPerform("dragStarted",this,evt)
}},cancelDrag:function(){var target=this._lastTarget,loc=this.get("location");if(target&&target.dragExited){target.dragExited(this,this._lastMouseDraggedEvent)
}if(this.get("sourceIsDraggable")){this._destroyGhostView();if(this.get("ghost")){if(this._dragViewWasVisible){this._getDragView().set("isVisible",YES)
}this._dragViewWasVisible=null}}var source=this.source;if(source&&source.dragDidEnd){source.dragDidEnd(this,loc,SC.DRAG_NONE)
}this._lastTarget=null;this._dragInProgress=NO},touchStart:function(evt){return YES
},mouseDragged:function(evt){var scrolled=this._autoscroll(evt);var loc=this.get("location");
if(!scrolled&&(evt.pageX===loc.x)&&(evt.pageY===loc.y)){return}loc={x:evt.pageX,y:evt.pageY};
this.set("location",loc);this._lastMouseDraggedEvent=evt;var source=this.source;var last=this._lastTarget;
var target=this._findDropTarget(evt);var op=SC.DRAG_NONE;while(target&&(target!==last)&&(op===SC.DRAG_NONE)){if(target&&source&&source.dragSourceOperationMaskFor){op=source.dragSourceOperationMaskFor(this,target)
}else{op=SC.DRAG_ANY}if((op!==SC.DRAG_NONE)&&target&&target.computeDragOperations){op=op&target.computeDragOperations(this,evt,op)
}else{op=SC.DRAG_NONE}this.allowedDragOperations=op;if(op===SC.DRAG_NONE){target=this._findNextDropTarget(target)
}}if(target!==last){if(last&&last.dragExited){last.dragExited(this,evt)}if(target){if(target.dragEntered){target.dragEntered(this,evt)
}if(target.dragUpdated){target.dragUpdated(this,evt)}}this._lastTarget=target}else{if(target&&target.dragUpdated){target.dragUpdated(this,evt)
}}if(source&&source.dragDidMove){source.dragDidMove(this,loc)}if(this.get("sourceIsDraggable")&&!this._ghostViewHidden){this._positionGhostView(evt)
}},touchesDragged:function(evt){this.mouseDragged(evt)},mouseUp:function(evt){var loc={x:evt.pageX,y:evt.pageY},target=this._lastTarget,op=this.allowedDragOperations;
this.set("location",loc);try{if(target&&target.acceptDragOperation&&target.acceptDragOperation(this,op)){op=target.performDragOperation?target.performDragOperation(this,op):SC.DRAG_NONE
}else{op=SC.DRAG_NONE}}catch(e){SC.Logger.error("Exception in SC.Drag.mouseUp(acceptDragOperation|performDragOperation): %@".fmt(e))
}try{if(target&&target.dragExited){target.dragExited(this,evt)}}catch(ex){SC.Logger.error("Exception in SC.Drag.mouseUp(target.dragExited): %@".fmt(ex))
}var ary=this._dropTargets();for(var idx=0,len=ary.length;idx<len;idx++){try{ary[idx].tryToPerform("dragEnded",this,evt)
}catch(ex2){SC.Logger.error("Exception in SC.Drag.mouseUp(dragEnded on %@): %@".fmt(ary[idx],ex2))
}}if(this.get("sourceIsDraggable")){this._destroyGhostView();if(this.get("ghost")){if(this._dragViewWasVisible){this._getDragView().set("isVisible",YES)
}this._dragViewWasVisible=null}}var source=this.source;if(source&&source.dragDidEnd){source.dragDidEnd(this,loc,op)
}this._lastTarget=null;this._dragInProgress=NO},touchEnd:function(evt){this.mouseUp(evt)
},_getDragView:function(){if(!this.dragView){if(!this.source||!this.source.isView){throw"Source can't be used as dragView, because it's not a view."
}this.dragView=this.source}return this.dragView},_createGhostView:function(){var that=this,dragView=this._getDragView(),frame=dragView.get("frame"),view;
view=this.ghostView=SC.Pane.create({classNames:["sc-ghost-view"],layout:{top:frame.y,left:frame.x,width:frame.width,height:frame.height},owner:this,didCreateLayer:function(){if(dragView){var layer=dragView.get("layer");
if(layer){layer=layer.cloneNode(true);layer.style.top="0px";layer.style.left="0px";
this.get("layer").appendChild(layer)}}}});view.append()},_positionGhostView:function(evt){var loc=this.get("location");
loc.x-=this.ghostOffset.x;loc.y-=this.ghostOffset.y;var gV=this.ghostView;if(gV){gV.adjust({top:loc.y,left:loc.x});
gV.invokeOnce("updateLayout")}},_ghostViewHidden:NO,hideGhostView:function(){if(this.ghostView&&!this._ghostViewHidden){this.ghostView.remove();
this._ghostViewHidden=YES}},unhideGhostView:function(){if(this._ghostViewHidden){this._ghostViewHidden=NO;
this._createGhostView()}},_destroyGhostView:function(){if(this.ghostView){this.ghostView.remove();
this.ghostView=null;this._ghostViewHidden=NO}},_dropTargets:function(){if(this._cachedDropTargets){return this._cachedDropTargets
}var ret=[];var hash=SC.Drag._dropTargets;for(var key in hash){if(hash.hasOwnProperty(key)){ret.push(hash[key])
}}var depth={};var dropTargets=SC.Drag._dropTargets;var getDepthFor=function(x){if(!x){return 0
}var guid=SC.guidFor(x);var ret=depth[guid];if(!ret){ret=1;while(x=x.get("parentView")){if(dropTargets[SC.guidFor(x)]!==undefined){ret++
}}depth[guid]=ret}return ret};ret.sort(function(a,b){if(a===b){return 0}a=getDepthFor(a);
b=getDepthFor(b);return(a>b)?-1:1});this._cachedDropTargets=ret;return ret},_findDropTarget:function(evt){var loc={x:evt.pageX,y:evt.pageY};
var target,frame;var ary=this._dropTargets();for(var idx=0,len=ary.length;idx<len;
idx++){target=ary[idx];if(!target.get("isVisibleInWindow")){continue}frame=target.convertFrameToView(target.get("clippingFrame"),null);
if(SC.pointInRect(loc,frame)){return target}}return null},_findNextDropTarget:function(target){var dropTargets=SC.Drag._dropTargets;
while(target=target.get("parentView")){if(dropTargets[SC.guidFor(target)]){return target
}}return null},_autoscroll:function(evt){if(!evt){evt=this._lastAutoscrollEvent}if(!this._dragInProgress){return NO
}var loc=evt?{x:evt.pageX,y:evt.pageY}:this.get("location"),view=this._findScrollableView(loc),scrollableView=null,vscroll,hscroll,min,max,edge,container,f;
while(view&&!scrollableView){vscroll=view.get("canScrollVertical")?1:0;hscroll=view.get("canScrollHorizontal")?1:0;
if(vscroll||hscroll){container=view.get("containerView");if(container){f=view.convertFrameToView(container.get("frame"),null)
}else{vscroll=hscroll=0}}if(vscroll){max=SC.maxY(f);min=max-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;
if(loc.y>=min&&loc.y<=max){vscroll=1}else{min=SC.minY(f);max=min+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;
if(loc.y>=min&&loc.y<=max){vscroll=-1}else{vscroll=0}}}if(hscroll){max=SC.maxX(f);
min=max-SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(loc.x>=min&&loc.x<=max){hscroll=1}else{min=SC.minX(f);
max=min+SC.DRAG_AUTOSCROLL_ZONE_THICKNESS;if(loc.x>=min&&loc.x<=max){hscroll=-1}else{hscroll=0
}}}if(vscroll||hscroll){scrollableView=view}else{view=this._findNextScrollableView(view)
}}if(scrollableView&&(this._lastScrollableView===scrollableView)){if((Date.now()-this._hotzoneStartTime)>100){this._horizontalScrollAmount*=1.05;
this._verticalScrollAmount*=1.05}}else{this._lastScrollableView=scrollableView;this._horizontalScrollAmount=15;
this._verticalScrollAmount=15;this._hotzoneStartTime=(scrollableView)?Date.now():null;
hscroll=vscroll=0}if(scrollableView&&(hscroll||vscroll)){var scroll={x:hscroll*this._horizontalScrollAmount,y:vscroll*this._verticalScrollAmount};
scrollableView.scrollBy(scroll)}if(scrollableView){if(evt){this._lastAutoscrollEvent={pageX:evt.pageX,pageY:evt.pageY}
}this.invokeLater(this._autoscroll,100,null);return YES}else{this._lastAutoscrollEvent=null;
return NO}},_scrollableViews:function(){if(this._cachedScrollableView){return this._cachedScrollableView
}var ret=[];var hash=SC.Drag._scrollableViews;for(var key in hash){if(hash.hasOwnProperty(key)){ret.push(hash[key])
}}ret=ret.sort(function(a,b){var view=a;while(view=view.get("parentView")){if(b==view){return -1
}}return 1});this._cachedScrollableView=ret;return ret},_findScrollableView:function(loc){var ary=this._scrollableViews(),len=ary?ary.length:0,target,frame,idx;
for(idx=0;idx<len;idx++){target=ary[idx];if(!target.get("isVisibleInWindow")){continue
}frame=target.convertFrameToView(target.get("clippingFrame"),null);if(SC.pointInRect(loc,frame)){return target
}}return null},_findNextScrollableView:function(view){var scrollableViews=SC.Drag._scrollableViews;
while(view=view.get("parentView")){if(scrollableViews[SC.guidFor(view)]){return view
}}return null}});SC.Drag.mixin({start:function(ops){var ret=this.create(ops);ret.startDrag();
return ret},_dropTargets:{},_scrollableViews:{},addDropTarget:function(target){this._dropTargets[SC.guidFor(target)]=target
},removeDropTarget:function(target){delete this._dropTargets[SC.guidFor(target)]},addScrollableView:function(target){this._scrollableViews[SC.guidFor(target)]=target
},removeScrollableView:function(target){delete this._scrollableViews[SC.guidFor(target)]
}});SC.MODIFIED_KEY_BINDINGS={"ctrl_.":"cancel",shift_tab:"insertBacktab",shift_left:"moveLeftAndModifySelection",shift_right:"moveRightAndModifySelection",shift_up:"moveUpAndModifySelection",shift_down:"moveDownAndModifySelection",alt_left:"moveLeftAndModifySelection",alt_right:"moveRightAndModifySelection",alt_up:"moveUpAndModifySelection",alt_down:"moveDownAndModifySelection",ctrl_a:"selectAll"};
SC.BASE_KEY_BINDINGS={escape:"cancel",backspace:"deleteBackward","delete":"deleteForward","return":"insertNewline",tab:"insertTab",left:"moveLeft",right:"moveRight",up:"moveUp",down:"moveDown",home:"moveToBeginningOfDocument",end:"moveToEndOfDocument",pagedown:"pageDown",pageup:"pageUp"};
require("core");SC.UndoManager=SC.Object.extend({undoActionName:function(){return this.undoStack?this.undoStack.name:null
}.property("undoStack"),redoActionName:function(){return this.redoStack?this.redoStack.name:null
}.property("redoStack"),canUndo:function(){return this.undoStack!=null}.property("undoStack"),canRedo:function(){return this.redoStack!=null
}.property("redoStack"),undo:function(){this._undoOrRedo("undoStack","isUndoing")
},redo:function(){this._undoOrRedo("redoStack","isRedoing")},isUndoing:false,isRedoing:false,groupingLevel:0,registerUndo:function(func,name){this.beginUndoGroup(name);
this._activeGroup.actions.push(func);this.endUndoGroup(name)},beginUndoGroup:function(name){if(this._activeGroup){this.groupingLevel++
}else{var stack=this.isUndoing?"redoStack":"undoStack";this._activeGroup={name:name,actions:[],prev:this.get(stack)};
this.set(stack,this._activeGroup);this.groupingLevel=1}},endUndoGroup:function(name){if(!this._activeGroup){raise("endUndoGroup() called outside group.")
}if(this.groupingLevel>1){this.groupingLevel--}else{this._activeGroup=null;this.groupingLevel=0
}this.propertyDidChange(this.isUndoing?"redoStack":"undoStack")},setActionName:function(name){if(!this._activeGroup){raise("setActionName() called outside group.")
}this._activeGroup.name=name},_activeGroup:null,undoStack:null,redoStack:null,_undoOrRedo:function(stack,state){if(this._activeGroup){return false
}if(this.get(stack)==null){return true}this.set(state,true);var group=this.get(stack);
this.set(stack,group.prev);var action;var useGroup=group.actions.length>1;if(useGroup){this.beginUndoGroup(group.name)
}while(action=group.actions.pop()){action()}if(useGroup){this.endUndoGroup(group.name)
}this.set(state,false)}});SC.CheckboxView=SC.ButtonView.extend(SC.StaticLayout,SC.Button,{classNames:["sc-checkbox-view","sc-checkbox-control"],tagName:"label",ariaRole:"checkbox",ariaLabeledBy:null,ariaLabel:null,themeName:null,renderDelegateName:"checkboxRenderDelegate",needsEllipsis:NO,acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),mouseDown:function(evt){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;if(evt){evt.allowDefault()}return YES
},mouseUp:function(evt){this.set("isActive",NO);this._isMouseDown=NO;if(!this.get("isEnabled")||(evt&&evt.target&&!this.$().within(evt.target))){return YES
}var val=this.get("value");if(val===this.get("toggleOnValue")){this.set("value",this.get("toggleOffValue"))
}else{this.set("value",this.get("toggleOnValue"))}return YES},touchStart:function(evt){return this.mouseDown(evt)
},touchEnd:function(evt){return this.mouseUp(evt)}});SC.LIST_ITEM_ACTION_CANCEL="sc-list-item-cancel-action";
SC.LIST_ITEM_ACTION_REFRESH="sc-list-item-cancel-refresh";SC.LIST_ITEM_ACTION_EJECT="sc-list-item-cancel-eject";
SC.ListItemView=SC.View.extend(SC.InlineEditable,SC.Control,{classNames:["sc-list-item-view"],displayProperties:["disclosureState","escapeHTML"],init:function(){arguments.callee.base.apply(this,arguments)
},content:null,contentIndex:null,hasContentIcon:NO,hasContentRightIcon:NO,hasContentBranch:NO,contentCheckboxKey:null,icon:null,contentIconKey:null,rightIcon:null,contentRightIconKey:null,contentValueKey:null,escapeHTML:YES,contentUnreadCountKey:null,contentIsBranchKey:null,isEditing:NO,outlineIndent:16,outlineLevel:0,disclosureState:SC.LEAF_NODE,validator:null,contentPropertyDidChange:function(){if(this.get("contentIsEditable")!==this.contentIsEditable()){this.notifyPropertyChange("contentIsEditable")
}this.displayDidChange()},contentIsEditable:function(){var content=this.get("content");
return content&&(content.get?content.get("isEditable")!==NO:NO)}.property("content").cacheable(),$label:function(){return this.$("label")
},renderAction:function(context,actionClassName){context.push('<img src="',SC.BLANK_IMAGE_URL,'" class="action" />')
},_isInsideElementWithClassName:function(className,evt){var layer=this.get("layer");
if(!layer){return NO}var el=SC.$(evt.target);var ret=NO,classNames;while(!ret&&el.length>0&&(el[0]!==layer)){if(el.hasClass(className)){ret=YES
}el=el.parent()}el=layer=null;return ret},_isInsideCheckbox:function(evt){var del=this.displayDelegate;
var checkboxKey=this.getDelegateProperty("contentCheckboxKey",del);return checkboxKey&&this._isInsideElementWithClassName("sc-checkbox-view",evt)
},_isInsideDisclosure:function(evt){if(this.get("disclosureState")===SC.LEAF_NODE){return NO
}return this._isInsideElementWithClassName("sc-disclosure-view",evt)},_isInsideRightIcon:function(evt){var del=this.displayDelegate;
var rightIconKey=this.getDelegateProperty("hasContentRightIcon",del)||!SC.none(this.rightIcon);
return rightIconKey&&this._isInsideElementWithClassName("right-icon",evt)},mouseDown:function(evt){if(!this.get("contentIsEditable")){return NO
}if(this._isInsideCheckbox(evt)){this._addCheckboxActiveState();this._isMouseDownOnCheckbox=YES;
this._isMouseInsideCheckbox=YES;return YES}else{if(this._isInsideDisclosure(evt)){this._addDisclosureActiveState();
this._isMouseDownOnDisclosure=YES;this._isMouseInsideDisclosure=YES;return YES}else{if(this._isInsideRightIcon(evt)){this._addRightIconActiveState();
this._isMouseDownOnRightIcon=YES;this._isMouseInsideRightIcon=YES;return YES}}}return NO
},mouseUp:function(evt){var ret=NO,del,checkboxKey,content,state,idx,set;if(this._isMouseDownOnCheckbox){if(this._isInsideCheckbox(evt)){del=this.displayDelegate;
checkboxKey=this.getDelegateProperty("contentCheckboxKey",del);content=this.get("content");
if(content&&content.get){var value=content.get(checkboxKey);value=(value===SC.MIXED_STATE)?YES:!value;
content.set(checkboxKey,value);this.displayDidChange()}}this._removeCheckboxActiveState();
ret=YES}else{if(this._isMouseDownOnDisclosure){if(this._isInsideDisclosure(evt)){state=this.get("disclosureState");
idx=this.get("contentIndex");set=(!SC.none(idx))?SC.IndexSet.create(idx):null;del=this.get("displayDelegate");
if(state===SC.BRANCH_OPEN){if(set&&del&&del.collapse){del.collapse(set)}else{this.set("disclosureState",SC.BRANCH_CLOSED)
}this.displayDidChange()}else{if(state===SC.BRANCH_CLOSED){if(set&&del&&del.expand){del.expand(set)
}else{this.set("disclosureState",SC.BRANCH_OPEN)}this.displayDidChange()}}}this._removeDisclosureActiveState();
ret=YES}else{if(this._isMouseDownOnRightIcon){this._removeRightIconActiveState();
ret=YES}}}this._isMouseInsideCheckbox=this._isMouseDownOnCheckbox=NO;this._isMouseDownOnDisclosure=this._isMouseInsideDisclosure=NO;
this._isMouseInsideRightIcon=this._isMouseDownOnRightIcon=NO;return ret},mouseMoved:function(evt){if(this._isMouseDownOnCheckbox&&this._isInsideCheckbox(evt)){this._addCheckboxActiveState();
this._isMouseInsideCheckbox=YES}else{if(this._isMouseDownOnCheckbox){this._removeCheckboxActiveState();
this._isMouseInsideCheckbox=NO}else{if(this._isMouseDownOnDisclosure&&this._isInsideDisclosure(evt)){this._addDisclosureActiveState();
this._isMouseInsideDisclosure=YES}else{if(this._isMouseDownOnDisclosure){this._removeDisclosureActiveState();
this._isMouseInsideDisclosure=NO}else{if(this._isMouseDownOnRightIcon&&this._isInsideRightIcon(evt)){this._addRightIconActiveState();
this._isMouseInsideRightIcon=YES}else{if(this._isMouseDownOnRightIcon){this._removeRightIconActiveState();
this._isMouseInsideRightIcon=NO}}}}}}return NO},touchStart:function(evt){return this.mouseDown(evt)
},touchEnd:function(evt){return this.mouseUp(evt)},touchEntered:function(evt){return this.mouseEntered(evt)
},touchExited:function(evt){return this.mouseExited(evt)},_addCheckboxActiveState:function(){if(this.get("isEnabled")){if(this._checkboxRenderDelegate){var source=this._checkboxRenderSource;
source.set("isActive",YES);this._checkboxRenderDelegate.update(source,this.$(".sc-checkbox-view"))
}else{this.$(".sc-checkbox-view").addClass("active")}}},_removeCheckboxActiveState:function(){if(this._checkboxRenderer){var source=this._checkboxRenderSource;
source.set("isActive",NO);this._checkboxRenderDelegate.update(source,this.$(".sc-checkbox-view"))
}else{this.$(".sc-checkbox-view").removeClass("active")}},_addDisclosureActiveState:function(){if(this.get("isEnabled")){if(this._disclosureRenderDelegate){var source=this._disclosureRenderSource;
source.set("isActive",YES);this._disclosureRenderDelegate.update(source,this.$(".sc-disclosure-view"))
}else{this.$(".sc-disclosure-view").addClass("active")}}},_removeDisclosureActiveState:function(){if(this._disclosureRenderer){var source=this._disclosureRenderSource;
source.set("isActive",NO);this._disclosureRenderDelegate.update(source,this.$(".sc-disclosure-view"))
}else{this.$(".sc-disclosure-view").addClass("active")}},_addRightIconActiveState:function(){this.$("img.right-icon").setClass("active",YES)
},_removeRightIconActiveState:function(){this.$("img.right-icon").removeClass("active")
},contentHitTest:function(evt){var del=this.displayDelegate;var labelKey=this.getDelegateProperty("contentValueKey",del);
if(!labelKey){return NO}var el=this.$label()[0];if(!el){return NO}var cur=evt.target,layer=this.get("layer");
while(cur&&(cur!==layer)&&(cur!==window)){if(cur===el){return YES}cur=cur.parentNode
}return NO},beginEditing:function(){if(this.get("isEditing")){return YES}return this._beginEditing(YES)
},_beginEditing:function(scrollIfNeeded){var content=this.get("content"),del=this.get("displayDelegate"),labelKey=this.getDelegateProperty("contentValueKey",del),parent=this.get("parentView"),pf=parent?parent.get("frame"):null,el=this.$label(),validator=this.get("validator"),f,v,offset,oldLineHeight,fontSize,top,lineHeight,escapeHTML,lineHeightShift,targetLineHeight,ret;
if(scrollIfNeeded&&this.scrollToVisible()){var collectionView=this.get("owner"),idx=this.get("contentIndex");
this.invokeLast(function(){var item=collectionView.itemViewForContentIndex(idx);if(item&&item._beginEditing){item._beginEditing(NO)
}});return YES}if(!parent||!el||el.get("length")===0){return NO}v=(labelKey&&content&&content.get)?content.get(labelKey):null;
f=this.computeFrameWithParentFrame(null);offset=SC.viewportOffset(el[0]);oldLineHeight=el.css("lineHeight");
fontSize=el.css("fontSize");top=this.$().css("top");if(top){top=parseInt(top.substring(0,top.length-2),0)
}else{top=0}lineHeight=oldLineHeight;lineHeightShift=0;if(fontSize&&lineHeight){targetLineHeight=fontSize*1.5;
if(targetLineHeight<lineHeight){el.css({lineHeight:"1.5"});lineHeightShift=(lineHeight-targetLineHeight)/2
}else{oldLineHeight=null}}f.x=offset.x;f.y=offset.y+top+lineHeightShift;f.height=el[0].offsetHeight;
f.width=el[0].offsetWidth;escapeHTML=this.get("escapeHTML");ret=SC.InlineTextFieldView.beginEditing({frame:f,exampleElement:el,delegate:this,value:v,multiline:NO,isCollection:YES,validator:validator,escapeHTML:escapeHTML,pane:this.get("pane"),layout:this.get("layout")});
if(oldLineHeight){el.css({lineHeight:oldLineHeight})}return ret},commitEditing:function(){if(!this.get("isEditing")){return YES
}return SC.InlineTextFieldView.commitEditing()},discardEditing:function(){if(!this.get("isEditing")){return YES
}return SC.InlineTextFieldView.discardEditing()},inlineEditorShouldBeginEditing:function(inlineEditor){return YES
},inlineEditorDidBeginEditing:function(inlineEditor){var el=this.$label();this._oldOpacity=el.css("opacity");
el.css("opacity",0)},inlineEditorShouldEndEditing:function(inlineEditor,finalValue){return YES
},inlineEditorDidEndEditing:function(inlineEditor,finalValue){this.set("isEditing",NO);
var content=this.get("content");var del=this.displayDelegate;var labelKey=this.getDelegateProperty("contentValueKey",del);
if(labelKey&&content&&content.set){content.set(labelKey,finalValue)}this.$label().css("opacity",this._oldOpacity);
this.displayDidChange()},render:function(context,firstTime){var content=this.get("content"),del=this.displayDelegate,level=this.get("outlineLevel"),indent=this.get("outlineIndent"),key,value,working,classArray=[];
classArray.push((this.get("contentIndex")%2===0)?"even":"odd");context.setClass("disabled",!this.get("isEnabled"));
working=context.begin("div").addClass("sc-outline");if(level>=0&&indent>0){working.addStyle("left",indent*(level+1))
}value=this.get("disclosureState");if(value!==SC.LEAF_NODE){this.renderDisclosure(working,value);
classArray.push("has-disclosure")}key=this.getDelegateProperty("contentCheckboxKey",del);
if(key){value=content?(content.get?content.get(key):content[key]):NO;if(value!==null){this.renderCheckbox(working,value);
classArray.push("has-checkbox")}}if(this.getDelegateProperty("hasContentIcon",del)){key=this.getDelegateProperty("contentIconKey",del);
value=(key&&content)?(content.get?content.get(key):content[key]):null;this.renderIcon(working,value);
classArray.push("has-icon")}else{if(this.get("icon")){value=this.get("icon");this.renderIcon(working,value);
classArray.push("has-icon")}}key=this.getDelegateProperty("contentValueKey",del);
value=(key&&content)?(content.get?content.get(key):content[key]):content;if(value&&SC.typeOf(value)!==SC.T_STRING){value=value.toString()
}if(this.get("escapeHTML")){value=SC.RenderContext.escapeHTML(value)}this.renderLabel(working,value);
if(this.getDelegateProperty("hasContentRightIcon",del)){key=this.getDelegateProperty("contentRightIconKey",del);
value=(key&&content)?(content.get?content.get(key):content[key]):null;this.renderRightIcon(working,value);
classArray.push("has-right-icon")}key=this.getDelegateProperty("contentUnreadCountKey",del);
value=(key&&content)?(content.get?content.get(key):content[key]):null;if(!SC.none(value)&&(value!==0)){this.renderCount(working,value);
var digits=["zero","one","two","three","four","five"];var valueLength=value.toString().length;
var digitsLength=digits.length;var digit=(valueLength<digitsLength)?digits[valueLength]:digits[digitsLength-1];
classArray.push("has-count "+digit+"-digit")}key=this.getDelegateProperty("listItemActionProperty",del);
value=(key&&content)?(content.get?content.get(key):content[key]):null;if(value){this.renderAction(working,value);
classArray.push("has-action")}if(this.getDelegateProperty("hasContentBranch",del)){key=this.getDelegateProperty("contentIsBranchKey",del);
value=(key&&content)?(content.get?content.get(key):content[key]):NO;this.renderBranch(working,value);
classArray.push("has-branch")}context.addClass(classArray);context=working.end()},renderDisclosure:function(context,state){var renderer=this.get("theme").disclosureRenderDelegate;
context=context.begin("div").addClass("sc-disclosure-view").addClass("sc-regular-size").addClass(this.get("theme").classNames).addClass(renderer.get("name"));
var source=this._disclosureRenderSource;if(!source){this._disclosureRenderSource=source=SC.Object.create({renderState:{},theme:this.get("theme")})
}source.set("isSelected",state===SC.BRANCH_OPEN).set("isEnabled",this.get("isEnabled")).set("title","");
renderer.render(source,context);context=context.end();this._disclosureRenderDelegate=renderer
},renderCheckbox:function(context,state){var renderer=this.get("theme").checkboxRenderDelegate;
context=context.begin("div").addClass("sc-checkbox-view").addClass("sc-regular-size").addClass(this.get("theme").classNames).addClass(renderer.get("name"));
var source=this._checkboxRenderSource;if(!source){source=this._checkboxRenderSource=SC.Object.create({renderState:{},theme:this.get("theme")})
}source.set("isSelected",state&&(state!==SC.MIXED_STATE)).set("isEnabled",this.get("isEnabled")&&this.get("contentIsEditable")).set("isActive",this._checkboxIsActive).set("title","");
renderer.render(source,context);context=context.end();this._checkboxRenderDelegate=renderer
},renderIcon:function(context,icon){var url=null,className=null,classArray=[];if(icon&&SC.ImageView.valueIsUrl(icon)){url=icon;
className=""}else{className=icon;url=SC.BLANK_IMAGE_URL}classArray.push(className,"icon");
context.begin("img").addClass(classArray).attr("src",url).end()},renderLabel:function(context,label){context.push("<label>",label||"","</label>")
},renderRightIcon:function(context,icon){var url=null,className=null,classArray=[];
if(icon&&SC.ImageView.valueIsUrl(icon)){url=icon;className=""}else{className=icon;
url=SC.BLANK_IMAGE_URL}classArray.push("right-icon",className);context.begin("img").addClass(classArray).attr("src",url).end()
},renderCount:function(context,count){context.push('<span class="count"><span class="inner">',count.toString(),"</span></span>")
},renderAction:function(context,actionClassName){context.push('<img src="',SC.BLANK_IMAGE_URL,'" class="action" />')
},renderBranch:function(context,hasBranch){var classArray=[];classArray.push("branch",hasBranch?"branch-visible":"branch-hidden");
context.begin("span").addClass(classArray).push("&nbsp;").end()}});SC.ListItemView._deprecatedRenderWarningHasBeenIssued=false;
sc_require("mixins/collection_view_delegate");sc_require("views/list_item");SC.DRAG_REORDER=16;
SC.HORIZONTAL_ORIENTATION="horizontal";SC.VERTICAL_ORIENTATION="vertical";SC.BENCHMARK_RELOAD=NO;
SC.CollectionView=SC.View.extend(SC.CollectionViewDelegate,SC.CollectionContent,{classNames:["sc-collection-view"],ACTION_DELAY:200,useFastPath:NO,content:null,contentBindingDefault:SC.Binding.multiple(),length:0,nowShowing:function(){return this.computeNowShowing()
}.property("length","clippingFrame").cacheable(),selection:null,isSelectable:YES,isSelectableBindingDefault:SC.Binding.bool(),isEnabled:YES,isEnabledBindingDefault:SC.Binding.bool(),isEditable:YES,isEditableBindingDefault:SC.Binding.bool(),canReorderContent:NO,canReorderContentBindingDefault:SC.Binding.bool(),canDeleteContent:NO,canDeleteContentBindingDefault:SC.Binding.bool(),canEditContent:NO,canEditContentBindingDefault:SC.Binding.bool(),isDropTarget:NO,useToggleSelection:NO,actOnSelect:NO,selectOnMouseDown:YES,exampleView:SC.ListItemView,contentExampleViewKey:null,groupExampleView:null,contentGroupExampleViewKey:null,action:null,target:null,contentValueKey:null,acceptsFirstResponder:NO,isActive:NO,calculatedHeight:0,calculatedWidth:0,computeLayout:function(){return null
},layoutForContentIndex:function(contentIndex){return null},allContentIndexes:function(){return SC.IndexSet.create(0,this.get("length")).freeze()
}.property("length").cacheable(),contentIndexesInRect:function(rect){return null},computeNowShowing:function(){var r=this.contentIndexesInRect(this.get("clippingFrame"));
if(!r){r=this.get("allContentIndexes")}else{var len=this.get("length"),max=r.get("max");
if(max>len){r=r.copy().remove(len,max-len).freeze()}}return r},showInsertionPoint:function(itemView,dropOperation){},hideInsertionPoint:function(){},delegate:null,selectionDelegate:function(){var del=this.get("delegate"),content=this.get("content");
return this.delegateFor("isCollectionViewDelegate",del,content)}.property("delegate","content").cacheable(),contentDelegate:function(){var del=this.get("delegate"),content=this.get("content");
return this.delegateFor("isCollectionContent",del,content)}.property("delegate","content").cacheable(),_contentGroupIndexes:function(){return this.get("contentDelegate").contentGroupIndexes(this,this.get("content"))
}.property("contentDelegate","content").cacheable(),contentRangeDidChange:function(content,object,key,indexes){if(!object&&(key==="[]")){this.notifyPropertyChange("_contentGroupIndexes");
this.reload(indexes)}else{this.contentPropertyDidChange(object,key,indexes)}},contentPropertyDidChange:function(target,key,indexes){},updateContentRangeObserver:function(){var nowShowing=this.get("nowShowing"),observer=this._cv_contentRangeObserver,content=this.get("content");
if(!content){return}if(observer){content.updateRangeObserver(observer,nowShowing)
}else{var func=this.contentRangeDidChange;observer=content.addRangeObserver(nowShowing,this,func,null);
this._cv_contentRangeObserver=observer}},removeContentRangeObserver:function(){var content=this.get("content"),observer=this._cv_contentRangeObserver;
if(observer){if(content){content.removeRangeObserver(observer)}this._cv_contentRangeObserver=null
}},contentLengthDidChange:function(){var content=this.get("content");this.set("length",content?content.get("length"):0)
},_cv_contentDidChange:function(){var content=this.get("content"),lfunc=this.contentLengthDidChange;
if(content===this._content){return}this.removeContentRangeObserver();if(this._content){this._content.removeObserver("length",this,lfunc)
}this._content=content;if(content){content.addObserver("length",this,lfunc)}this.contentLengthDidChange();
this.contentRangeDidChange(content,null,"[]",null)}.observes("content"),_invalidIndexes:NO,reload:function(indexes){var invalid=this._invalidIndexes;
if(indexes&&invalid!==YES){if(invalid){invalid.add(indexes)}else{invalid=this._invalidIndexes=indexes.clone()
}}else{this._invalidIndexes=YES}if(this.get("isVisibleInWindow")){this.invokeOnce(this.reloadIfNeeded)
}return this},reloadIfNeeded:function(){var invalid=this._invalidIndexes;if(!invalid||!this.get("isVisibleInWindow")){return this
}this._invalidIndexes=NO;var content=this.get("content"),i,len,existing,layout=this.computeLayout(),bench=SC.BENCHMARK_RELOAD,nowShowing=this.get("nowShowing"),itemViews=this._sc_itemViews,containerView=this.get("containerView")||this,exampleView,groupExampleView,shouldReuseViews,shouldReuseGroupViews,shouldReuse,viewsToRemove,viewsToRedraw,viewsToCreate,views,idx,view,layer,parentNode,viewPool,del,groupIndexes,isGroupView;
if(invalid.isIndexSet&&invalid.contains(nowShowing)){invalid=YES}if(this.willReload){this.willReload(invalid===YES?null:invalid)
}exampleView=this.get("exampleView");shouldReuseViews=exampleView?exampleView.isReusableInCollections:NO;
groupExampleView=this.get("groupExampleView");shouldReuseGroupViews=groupExampleView?groupExampleView.isReusableInCollections:NO;
if(invalid.isIndexSet){if(bench){SC.Benchmark.start(bench="%@#reloadIfNeeded (Partial)".fmt(this),YES)
}viewsToRemove=[];viewsToRedraw=[];viewsToCreate=[];invalid.forEach(function(idx){existing=itemViews?itemViews[idx]:null;
if(nowShowing.contains(idx)){if(existing&&existing.parentView===containerView){viewsToRedraw.push(idx)
}else{viewsToCreate.push(idx)}}else{if(existing&&existing.parentView===containerView){viewsToRemove.push(idx)
}}},this);for(i=0,len=viewsToRemove.length;i<len;++i){idx=viewsToRemove[i];existing=itemViews?itemViews[idx]:null;
delete itemViews[idx];del=this.get("contentDelegate");groupIndexes=this.get("_contentGroupIndexes");
isGroupView=groupIndexes&&groupIndexes.contains(idx);if(isGroupView){isGroupView=del.contentIndexIsGroup(this,content,idx)
}shouldReuse=isGroupView?shouldReuseGroupViews:shouldReuseViews;if(shouldReuse){viewPool=isGroupView?this._GROUP_VIEW_POOL:this._VIEW_POOL;
viewPool.push(existing);existing.destroyLayer()}layer=existing.get("layer");if(layer&&layer.parentNode){layer.parentNode.removeChild(layer)
}containerView.removeChild(existing);if(!shouldReuse){existing.destroy()}}for(i=0,len=viewsToRedraw.length;
i<len;++i){idx=viewsToRedraw[i];existing=itemViews?itemViews[idx]:null;view=this.itemViewForContentIndex(idx,YES);
existing.destroyLayer();containerView.replaceChild(view,existing)}for(i=0,len=viewsToCreate.length;
i<len;++i){idx=viewsToCreate[i];view=this.itemViewForContentIndex(idx,YES);containerView.insertBefore(view,null)
}if(bench){SC.Benchmark.end(bench)}}else{if(bench){SC.Benchmark.start(bench="%@#reloadIfNeeded (Full)".fmt(this),YES)
}if(itemViews){itemViews.length=0}views=containerView.get("childViews");if(views){views=views.copy()
}containerView.beginPropertyChanges();if(this.willRemoveAllChildren){this.willRemoveAllChildren()
}containerView.destroyLayer().removeAllChildren();if(views){for(i=0,len=views.length;
i<len;++i){view=views[i];isGroupView=view.get("isGroupView");shouldReuse=isGroupView?shouldReuseGroupViews:shouldReuseViews;
if(shouldReuse){viewPool=isGroupView?this._GROUP_VIEW_POOL:this._VIEW_POOL;viewPool.push(view);
view.destroyLayer()}else{view.destroy()}}}views=[];nowShowing.forEach(function(idx){views.push(this.itemViewForContentIndex(idx,YES))
},this);containerView.set("childViews",views);containerView.replaceLayer();containerView.endPropertyChanges();
if(bench){SC.Benchmark.end(bench)}}if(layout){this.adjust(layout)}if(this.didReload){this.didReload(invalid===YES?null:invalid)
}return this},displayProperties:"isFirstResponder isEnabled isActive".w(),renderDelegateName:"collectionRenderDelegate",_TMP_ATTRS:{},_COLLECTION_CLASS_NAMES:"sc-collection-item".w(),_GROUP_COLLECTION_CLASS_NAMES:"sc-collection-item sc-group-item".w(),_VIEW_POOL:null,_GROUP_VIEW_POOL:null,itemViewForContentIndex:function(idx,rebuild){var ret;
var itemViews=this._sc_itemViews;if(!itemViews){itemViews=this._sc_itemViews=[]}else{if(!rebuild&&(ret=itemViews[idx])){return ret
}}var content=this.get("content"),item=content.objectAt(idx),del=this.get("contentDelegate"),groupIndexes=this.get("_contentGroupIndexes"),isGroupView=NO,key,E,layout,layerId,viewPoolKey,viewPool,reuseFunc,parentView,isEnabled,isSelected,outlineLevel,disclosureState,isVisibleInWindow;
isGroupView=groupIndexes&&groupIndexes.contains(idx);if(isGroupView){isGroupView=del.contentIndexIsGroup(this,content,idx)
}if(isGroupView){key=this.get("contentGroupExampleViewKey");if(key&&item){E=item.get(key)
}if(!E){E=this.get("groupExampleView")||this.get("exampleView")}viewPoolKey="_GROUP_VIEW_POOL"
}else{key=this.get("contentExampleViewKey");if(key&&item){E=item.get(key)}if(!E){E=this.get("exampleView")
}viewPoolKey="_VIEW_POOL"}parentView=this.get("containerView")||this;layerId=this.layerIdFor(idx);
isEnabled=del.contentIndexIsEnabled(this,content,idx);isSelected=del.contentIndexIsSelected(this,content,idx);
outlineLevel=del.contentIndexOutlineLevel(this,content,idx);disclosureState=del.contentIndexDisclosureState(this,content,idx);
isVisibleInWindow=this.isVisibleInWindow;layout=this.layoutForContentIndex(idx);if(E&&E.isReusableInCollections){viewPool=this[viewPoolKey];
if(!viewPool){viewPool=this[viewPoolKey]=[]}if(viewPool.length>0){ret=viewPool.pop();
reuseFunc=ret.prepareForReuse;if(reuseFunc){reuseFunc.call(ret)}ret.beginPropertyChanges();
ret.set("contentIndex",idx);ret.set("layerId",layerId);ret.set("isEnabled",isEnabled);
ret.set("isSelected",isSelected);ret.set("outlineLevel",outlineLevel);ret.set("disclosureState",disclosureState);
ret.set("isVisibleInWindow",isVisibleInWindow);ret.set("parentView",parentView);SC.View.views[layerId]=ret;
if(layout){ret.set("layout",layout)}else{ret.set("layout",E.prototype.layout)}ret.set("content",item);
ret.endPropertyChanges()}}if(!ret){var attrs=this._TMP_ATTRS;attrs.contentIndex=idx;
attrs.content=item;attrs.owner=attrs.displayDelegate=this;attrs.parentView=parentView;
attrs.page=this.page;attrs.layerId=layerId;attrs.isEnabled=isEnabled;attrs.isSelected=isSelected;
attrs.outlineLevel=outlineLevel;attrs.disclosureState=disclosureState;attrs.isGroupView=isGroupView;
attrs.isVisibleInWindow=isVisibleInWindow;if(isGroupView){attrs.classNames=this._GROUP_COLLECTION_CLASS_NAMES
}else{attrs.classNames=this._COLLECTION_CLASS_NAMES}if(layout){attrs.layout=layout
}else{delete attrs.layout}ret=this.createItemView(E,idx,attrs)}itemViews[idx]=ret;
return ret},itemViewForContentObject:function(object){return this.itemViewForContentIndex(this.get("content").indexOf(object))
},_TMP_LAYERID:[],createItemView:function(exampleClass,idx,attrs){return exampleClass.create(attrs)
},layerIdFor:function(idx){var ret=this._TMP_LAYERID;ret[0]=SC.guidFor(this);ret[1]=idx;
return ret.join("-")},contentIndexForLayerId:function(id){if(!id||!(id=id.toString())){return null
}var base=this._baseLayerId;if(!base){base=this._baseLayerId=SC.guidFor(this)+"-"
}if((id.length<=base.length)||(id.indexOf(base)!==0)){return null}var ret=Number(id.slice(id.lastIndexOf("-")+1));
return isNaN(ret)?null:ret},itemViewForEvent:function(evt){var responder=this.getPath("pane.rootResponder");
if(!responder){return null}var base=SC.guidFor(this)+"-",baseLen=base.length,element=evt.target,layer=this.get("layer"),contentIndex=null,id,itemView,ret;
while(element&&element!==document&&element!==layer){id=element?SC.$(element).attr("id"):null;
if(id&&(contentIndex=this.contentIndexForLayerId(id))!==null){break}element=element.parentNode
}if(contentIndex===null||(element===layer)){element=layer=null;return null}if(contentIndex>=this.get("length")){throw"layout for item view %@ was found when item view does not exist (%@)".fmt(id,this)
}return this.itemViewForContentIndex(contentIndex)},expand:function(indexes){if(!indexes){return this
}var del=this.get("contentDelegate"),content=this.get("content");indexes.forEach(function(i){var state=del.contentIndexDisclosureState(this,content,i);
if(state===SC.BRANCH_CLOSED){del.contentIndexExpand(this,content,i)}},this);return this
},collapse:function(indexes){if(!indexes){return this}var del=this.get("contentDelegate"),content=this.get("content");
indexes.forEach(function(i){var state=del.contentIndexDisclosureState(this,content,i);
if(state===SC.BRANCH_OPEN){del.contentIndexCollapse(this,content,i)}},this);return this
},_cv_selectionDidChange:function(){var sel=this.get("selection"),last=this._cv_selection,func=this._cv_selectionContentDidChange;
if(sel===last){return}if(last){last.removeObserver("[]",this,func)}if(sel){sel.addObserver("[]",this,func)
}this._cv_selection=sel;this._cv_selectionContentDidChange()}.observes("selection"),_cv_selectionContentDidChange:function(){var sel=this.get("selection"),last=this._cv_selindexes,content=this.get("content"),diff;
this._cv_selindexes=sel?sel.frozenCopy():null;if(last){last=last.indexSetForSource(content)
}if(sel){sel=sel.indexSetForSource(content)}if(sel&&last){diff=sel.without(last).add(last.without(sel))
}else{diff=sel||last}if(diff&&diff.get("length")>0){this.reloadSelectionIndexes(diff)
}},_invalidSelection:NO,reloadSelectionIndexes:function(indexes){var invalid=this._invalidSelection;
if(indexes&&(invalid!==YES)){if(invalid){invalid.add(indexes)}else{invalid=this._invalidSelection=indexes.copy()
}}else{this._invalidSelection=YES}if(this.get("isVisibleInWindow")){this.invokeOnce(this.reloadSelectionIndexesIfNeeded)
}return this},reloadSelectionIndexesIfNeeded:function(){var invalid=this._invalidSelection;
if(!invalid||!this.get("isVisibleInWindow")){return this}var nowShowing=this.get("nowShowing"),reload=this._invalidIndexes,content=this.get("content"),sel=this.get("selection");
this._invalidSelection=NO;if(reload===YES||!nowShowing){return this}if(invalid===YES){invalid=nowShowing
}if(reload&&reload.isIndexSet){invalid=invalid.without(reload)}invalid.forEach(function(idx){if(!nowShowing.contains(idx)){return
}var view=this.itemViewForContentIndex(idx,NO);if(view){view.set("isSelected",sel?sel.contains(content,idx):NO)
}},this);return this},select:function(indexes,extend){var content=this.get("content"),del=this.get("selectionDelegate"),groupIndexes=this.get("_contentGroupIndexes"),sel;
if(!this.get("isSelectable")){return this}if(SC.typeOf(indexes)===SC.T_NUMBER){indexes=SC.IndexSet.create(indexes,1)
}if(indexes&&indexes.get("length")>0){if(groupIndexes&&groupIndexes.get("length")>0){indexes=indexes.copy().remove(groupIndexes)
}indexes=del.collectionViewShouldSelectIndexes(this,indexes,extend);if(!indexes||indexes.get("length")===0){return this
}}else{indexes=null}if(extend&&(sel=this.get("selection"))){sel=sel.copy()}else{sel=SC.SelectionSet.create()
}if(indexes&&indexes.get("length")>0){if(indexes.get("length")===1){sel.addObject(content.objectAt(indexes.get("firstObject")))
}else{sel.add(content,indexes)}}sel=del.collectionViewSelectionForProposedSelection(this,sel);
if(!sel){sel=SC.SelectionSet.create()}this._selectionAnchor=null;this.set("selection",sel.freeze());
return this},deselect:function(indexes){var sel=this.get("selection"),content=this.get("content"),del=this.get("selectionDelegate");
if(!this.get("isSelectable")){return this}if(!sel||sel.get("length")===0){return this
}if(SC.typeOf(indexes)===SC.T_NUMBER){indexes=SC.IndexSet.create(indexes,1)}indexes=del.collectionViewShouldDeselectIndexes(this,indexes);
if(!indexes||indexes.get("length")===0){return this}sel=sel.copy().remove(content,indexes);
sel=del.collectionViewSelectionForProposedSelection(this,sel);if(!sel){sel=SC.SelectionSet.create()
}this.set("selection",sel.freeze());return this},_findNextSelectableItemFromIndex:function(proposedIndex,bottom){var lim=this.get("length"),range=SC.IndexSet.create(),content=this.get("content"),del=this.get("selectionDelegate"),groupIndexes=this.get("_contentGroupIndexes"),ret,sel;
if(!groupIndexes&&(del.collectionViewShouldSelectIndexes===this.collectionViewShouldSelectIndexes)){return proposedIndex
}while(proposedIndex<lim){if(!groupIndexes||!groupIndexes.contains(proposedIndex)){range.add(proposedIndex);
ret=del.collectionViewShouldSelectIndexes(this,range);if(ret&&ret.get("length")>=1){return proposedIndex
}range.remove(proposedIndex)}proposedIndex++}if(bottom===undefined){sel=this.get("selection");
bottom=sel?sel.get("max"):-1}return bottom},_findPreviousSelectableItemFromIndex:function(proposedIndex,top){var range=SC.IndexSet.create(),content=this.get("content"),del=this.get("selectionDelegate"),groupIndexes=this.get("_contentGroupIndexes"),ret;
if(SC.none(proposedIndex)){proposedIndex=-1}if(!groupIndexes&&(del.collectionViewShouldSelectIndexes===this.collectionViewShouldSelectIndexes)){return proposedIndex
}while(proposedIndex>=0){if(!groupIndexes||!groupIndexes.contains(proposedIndex)){range.add(proposedIndex);
ret=del.collectionViewShouldSelectIndexes(this,range);if(ret&&ret.get("length")>=1){return proposedIndex
}range.remove(proposedIndex)}proposedIndex--}if(top===undefined){var sel=this.get("selection");
top=sel?sel.get("min"):-1}if(SC.none(top)){top=-1}return top},selectPreviousItem:function(extend,numberOfItems){if(SC.none(numberOfItems)){numberOfItems=1
}if(SC.none(extend)){extend=false}var sel=this.get("selection"),content=this.get("content");
if(sel){sel=sel.indexSetForSource(content)}var selTop=sel?sel.get("min"):-1,selBottom=sel?sel.get("max")-1:-1,anchor=this._selectionAnchor;
if(SC.none(anchor)){anchor=selTop}if(extend){if(selBottom>anchor){selBottom=selBottom-numberOfItems
}else{selTop=this._findPreviousSelectableItemFromIndex(selTop-numberOfItems)}if(SC.none(selTop)||(selTop<0)){selTop=0
}if(!content.objectAt(selTop)){selTop=sel?sel.get("min"):-1}if(selBottom<selTop){selBottom=selTop
}}else{selTop=this._findPreviousSelectableItemFromIndex(selTop-numberOfItems);if(SC.none(selTop)||(selTop<0)){selTop=0
}if(!content.objectAt(selTop)){selTop=sel?sel.get("min"):-1}selBottom=selTop;anchor=null
}var scrollToIndex=selTop;sel=SC.IndexSet.create(selTop,selBottom+1-selTop);this.scrollToContentIndex(scrollToIndex);
this.select(sel);this._selectionAnchor=anchor;return this},selectNextItem:function(extend,numberOfItems){if(SC.none(numberOfItems)){numberOfItems=1
}if(SC.none(extend)){extend=false}var sel=this.get("selection"),content=this.get("content");
if(sel){sel=sel.indexSetForSource(content)}var selTop=sel?sel.get("min"):-1,selBottom=sel?sel.get("max")-1:-1,anchor=this._selectionAnchor,lim=this.get("length");
if(SC.none(anchor)){anchor=selTop}if(extend){if(selTop<anchor){selTop=selTop+numberOfItems
}else{selBottom=this._findNextSelectableItemFromIndex(selBottom+numberOfItems,selBottom)
}if(selBottom>=lim){selBottom=lim-1}if(!content.objectAt(selBottom)){selBottom=sel?sel.get("max")-1:-1
}if(selTop>selBottom){selTop=selBottom}}else{selBottom=this._findNextSelectableItemFromIndex(selBottom+numberOfItems,selBottom);
if(selBottom>=lim){selBottom=lim-1}if(!content.objectAt(selBottom)){selBottom=sel?sel.get("max")-1:-1
}selTop=selBottom;anchor=null}var scrollToIndex=selBottom;sel=SC.IndexSet.create(selTop,selBottom-selTop+1);
this.scrollToContentIndex(scrollToIndex);this.select(sel);this._selectionAnchor=anchor;
return this},deleteSelection:function(){if(!this.get("canDeleteContent")){return NO
}var sel=this.get("selection"),content=this.get("content"),del=this.get("selectionDelegate"),indexes=sel&&content?sel.indexSetForSource(content):null;
if(!content||!indexes||indexes.get("length")===0){return NO}indexes=del.collectionViewShouldDeleteIndexes(this,indexes);
if(!indexes||indexes.get("length")===0){return NO}del.collectionViewDeleteContent(this,this.get("content"),indexes);
return YES},scrollToContentIndex:function(contentIndex){var itemView=this.itemViewForContentIndex(contentIndex);
if(itemView){this.scrollToItemView(itemView)}return this},scrollToItemView:function(view){if(view){view.scrollToVisible()
}return this},keyDown:function(evt){var ret=this.interpretKeyEvents(evt);return !ret?NO:ret
},keyUp:function(){return true},insertText:function(chr,evt){if(chr===" "){var sel=this.get("selection");
if(sel&&sel.get("length")>0){this.invokeLater(this._cv_action,0,null,evt)}return YES
}else{return NO}},selectAll:function(evt){var content=this.get("content"),sel=content?SC.IndexSet.create(0,content.get("length")):null;
this.select(sel,NO);return YES},deleteBackward:function(evt){return this.deleteSelection()
},deleteForward:function(evt){return this.deleteSelection()},moveDown:function(sender,evt){this.selectNextItem(false,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,evt,this.ACTION_DELAY);return true},moveUp:function(sender,evt){this.selectPreviousItem(false,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,evt,this.ACTION_DELAY);return true},moveLeft:function(evt){if(evt.ctrlKey||evt.metaKey){return NO
}if((this.get("itemsPerRow")||1)>1){this.selectPreviousItem(false,1);this._cv_performSelectAction(null,evt,this.ACTION_DELAY)
}else{var sel=this.get("selection"),content=this.get("content"),indexes=sel?sel.indexSetForSource(content):null;
if(indexes){var del=undefined,selectParent=false,index=undefined;if(indexes.get("length")===1){index=indexes.get("firstObject");
del=this.get("contentDelegate");var state=del.contentIndexDisclosureState(this,content,index);
if(state!==SC.BRANCH_OPEN){selectParent=true}}if(selectParent){var desiredOutlineLevel=del.contentIndexOutlineLevel(this,content,index)-1;
if(desiredOutlineLevel>=0){var parentIndex=-1;while(parentIndex<0){var previousItemIndex=this._findPreviousSelectableItemFromIndex(index-1);
if(previousItemIndex<0){return false}index=previousItemIndex;var outlineLevel=del.contentIndexOutlineLevel(this,content,index);
if(outlineLevel===desiredOutlineLevel){parentIndex=previousItemIndex}}if(parentIndex!==-1){this.select(index)
}}}else{this.collapse(indexes)}}}return true},moveRight:function(evt){if(evt.ctrlKey||evt.metaKey){return NO
}if((this.get("itemsPerRow")||1)>1){this.selectNextItem(false,1);this._cv_performSelectAction(null,evt,this.ACTION_DELAY)
}else{var sel=this.get("selection"),content=this.get("content"),indexes=sel?sel.indexSetForSource(content):null;
if(indexes){this.expand(indexes)}}return true},moveDownAndModifySelection:function(sender,evt){this.selectNextItem(true,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,evt,this.ACTION_DELAY);return true},moveUpAndModifySelection:function(sender,evt){this.selectPreviousItem(true,this.get("itemsPerRow")||1);
this._cv_performSelectAction(null,evt,this.ACTION_DELAY);return true},moveLeftAndModifySelection:function(sender,evt){if((this.get("itemsPerRow")||1)>1){this.selectPreviousItem(true,1);
this._cv_performSelectAction(null,evt,this.ACTION_DELAY)}return true},moveRightAndModifySelection:function(sender,evt){if((this.get("itemsPerRow")||1)>1){this.selectNextItem(true,1);
this._cv_performSelectAction(null,evt,this.ACTION_DELAY)}return true},insertNewline:function(sender,evt){var canEdit=this.get("isEditable")&&this.get("canEditContent"),sel,content,set,idx,itemView;
if(canEdit){sel=this.get("selection");content=this.get("content");if(sel&&sel.get("length")===1){set=sel.indexSetForSource(content);
idx=set?set.get("min"):-1;canEdit=idx>=0}}if(canEdit){itemView=this.itemViewForContentIndex(idx);
canEdit=itemView&&SC.typeOf(itemView.beginEditing)===SC.T_FUNCTION}if(canEdit){this.scrollToContentIndex(idx);
itemView=this.itemViewForContentIndex(idx);itemView.beginEditing()}else{this.invokeLater(this._cv_action,0,itemView,null)
}return YES},mouseDown:function(ev){var itemView=this.itemViewForEvent(ev),content=this.get("content"),contentIndex=itemView?itemView.get("contentIndex"):-1,info,anchor,sel,isSelected,modifierKeyPressed,allowsMultipleSel=content.get("allowsMultipleSelection");
info=this.mouseDownInfo={event:ev,itemView:itemView,contentIndex:contentIndex,at:Date.now()};
this.becomeFirstResponder();if(this.get("useToggleSelection")){if(this.get("selectOnMouseDown")){if(!itemView){return
}sel=this.get("selection");isSelected=sel&&sel.containsObject(itemView.get("content"));
if(isSelected){this.deselect(contentIndex)}else{if(!allowsMultipleSel){this.select(contentIndex,NO)
}else{this.select(contentIndex,YES)}}}return YES}if(!itemView){if(this.get("allowDeselectAll")){this.select(null,false)
}return YES}sel=this.get("selection");if(sel){sel=sel.indexSetForSource(content)}isSelected=sel?sel.contains(contentIndex):NO;
info.modifierKeyPressed=modifierKeyPressed=ev.ctrlKey||ev.metaKey;if(modifierKeyPressed&&isSelected){info.shouldDeselect=contentIndex>=0
}else{if(ev.shiftKey&&sel&&sel.get("length")>0&&allowsMultipleSel){sel=this._findSelectionExtendedByShift(sel,contentIndex);
anchor=this._selectionAnchor;this.select(sel);this._selectionAnchor=anchor}else{if(!modifierKeyPressed&&isSelected){info.shouldReselect=contentIndex>=0
}else{if((ev.shiftKey||modifierKeyPressed)&&!allowsMultipleSel){this.select(null,false)
}if(this.get("selectOnMouseDown")){this.select(contentIndex,modifierKeyPressed)}else{info.shouldSelect=contentIndex>=0
}}}}info.previousContentIndex=contentIndex;return YES},mouseUp:function(ev){var view=this.itemViewForEvent(ev),info=this.mouseDownInfo,content=this.get("content"),contentIndex,sel,isSelected,canEdit,itemView,idx,allowsMultipleSel=content.get("allowsMultipleSelection");
if(this.get("useToggleSelection")){if(!view||this.get("selectOnMouseDown")){return NO
}sel=this.get("selection");contentIndex=(view)?view.get("contentIndex"):-1;isSelected=sel&&sel.containsObject(view.get("content"));
if(isSelected){this.deselect(contentIndex)}else{if(!allowsMultipleSel){this.select(contentIndex,NO)
}else{this.select(contentIndex,YES)}}}else{if(info){idx=info.contentIndex;contentIndex=(view)?view.get("contentIndex"):-1;
if(info.shouldSelect){this.select(idx,info.modifierKeyPressed)}if(info.shouldDeselect){this.deselect(idx)
}if(info.shouldReselect){canEdit=this.get("isEditable")&&this.get("canEditContent");
if(canEdit){sel=this.get("selection");canEdit=sel&&(sel.get("length")===1)}if(canEdit){itemView=this.itemViewForContentIndex(idx);
canEdit=itemView&&(!itemView.contentHitTest||itemView.contentHitTest(ev));canEdit=(canEdit&&itemView.beginEditing)?itemView.beginEditing():NO
}if(!canEdit){if(this._cv_reselectTimer){this._cv_reselectTimer.invalidate()}this._cv_reselectTimer=this.invokeLater(this.select,300,idx,false)
}}this._cleanupMouseDown()}}this._cv_performSelectAction(view,ev,0,ev.clickCount);
return NO},_cleanupMouseDown:function(){var info=this.mouseDownInfo,key;if(info){for(key in info){if(!info.hasOwnProperty(key)){continue
}delete info[key]}}this.mouseDownInfo=null},mouseMoved:function(ev){var view=this.itemViewForEvent(ev),last=this._lastHoveredItem;
if(view!==last){if(last&&last.mouseExited){last.mouseExited(ev)}if(view&&view.mouseEntered){view.mouseEntered(ev)
}}this._lastHoveredItem=view;if(view&&view.mouseMoved){view.mouseMoved(ev)}return YES
},mouseExited:function(ev){var view=this._lastHoveredItem;this._lastHoveredItem=null;
if(view&&view.mouseExited){view.mouseExited(ev)}return YES},touchStart:function(touch,evt){this.becomeFirstResponder();
if(!this.get("useToggleSelection")){var itemView=this.itemViewForEvent(touch);if(itemView&&!itemView.get("isSelected")){itemView.set("isSelected",YES);
this._touchSelectedView=itemView}else{this._touchSelectedView=null}}return YES},touchesDragged:function(evt,touches){touches.forEach(function(touch){if(Math.abs(touch.pageX-touch.startX)>5||Math.abs(touch.pageY-touch.startY)>5){touch.makeTouchResponder(touch.nextTouchResponder)
}},this)},touchEnd:function(touch){var itemView=this.itemViewForEvent(touch),contentIndex=itemView?itemView.get("contentIndex"):-1,isSelected=NO;
if(this._touchSelectedView){this._touchSelectedView.set("isSelected",NO)}if(this.get("useToggleSelection")){var sel=this.get("selection");
isSelected=sel&&sel.containsObject(itemView.get("content"))}if(isSelected){this.deselect(contentIndex)
}else{this.select(contentIndex,NO);this._cv_performSelectAction(itemView,touch,0)
}},touchCancelled:function(evt){if(this._touchSelectedView){this._touchSelectedView.set("isSelected",NO)
}},_findSelectionExtendedByShift:function(sel,contentIndex){if(!sel||sel.get("length")===0){return SC.IndexSet.create(contentIndex)
}var content=this.get("content"),lim=content.get("length")-1,min=sel.get("min"),max=sel.get("max")-1,info=this.mouseDownInfo,anchor=this._selectionAnchor;
if(SC.none(anchor)){anchor=-1}if(contentIndex<min){min=contentIndex;if(anchor<0){this._selectionAnchor=anchor=max
}}else{if(contentIndex>max){max=contentIndex;if(anchor<0){this._selectionAnchor=anchor=min
}}else{if(contentIndex>=min&&contentIndex<=max){if(anchor<0){this._selectionAnchor=anchor=min
}if(contentIndex===anchor){min=max=contentIndex}else{if(contentIndex>anchor){min=anchor;
max=contentIndex}else{if(contentIndex<anchor){min=contentIndex;max=anchor}}}}}}return SC.IndexSet.create(min,max-min+1)
},reorderDataType:function(){return"SC.CollectionView.Reorder."+SC.guidFor(this)}.property().cacheable(),dragContent:null,proposedInsertionIndex:null,proposedDropOperation:null,mouseDragged:function(ev){var del=this.get("selectionDelegate"),content=this.get("content"),sel=this.get("selection"),info=this.mouseDownInfo,groupIndexes=this.get("_contentGroupIndexes"),dragContent,dragDataTypes,dragView;
if(!info||info.contentIndex<0){return YES}if((Date.now()-info.at)<123){return YES
}if(del.collectionViewShouldBeginDrag(this)){if(!this.get("selectOnMouseDown")){dragContent=SC.IndexSet.create(info.contentIndex)
}else{dragContent=sel?sel.indexSetForSource(content):null}if(dragContent&&groupIndexes&&groupIndexes.get("length")>0){dragContent=dragContent.copy().remove(groupIndexes);
if(dragContent.get("length")===0){dragContent=null}else{dragContent.freeze()}}if(!dragContent){return YES
}else{dragContent=dragContent.frozenCopy()}dragContent={content:content,indexes:dragContent};
this.set("dragContent",dragContent);dragDataTypes=this.get("dragDataTypes");if(dragDataTypes&&dragDataTypes.get("length")>0){dragView=del.collectionViewDragViewFor(this,dragContent.indexes);
if(!dragView){dragView=this._cv_dragViewFor(dragContent.indexes)}dragView.createLayer();
SC.Drag.start({event:info.event,source:this,dragView:dragView,ghost:NO,ghostActsLikeCursor:del.ghostActsLikeCursor,slideBack:YES,dataSource:this});
this._cleanupMouseDown();this._lastInsertionIndex=null}else{this.set("dragContent",null)
}return YES}},_cv_dragViewFor:function(dragContent){var indexes=this.get("nowShowing").without(dragContent),dragLayer=this.get("layer").cloneNode(false),view=SC.View.create({layer:dragLayer,parentView:this}),height=0,layout;
indexes=this.get("nowShowing").without(indexes);SC.$(dragLayer).css("backgroundColor","transparent").css("border","none").css("top",0).css("left",0);
indexes.forEach(function(i){var itemView=this.itemViewForContentIndex(i),isSelected,layer;
if(itemView){isSelected=itemView.get("isSelected");itemView.set("isSelected",NO);
itemView.updateLayerIfNeeded();layer=itemView.get("layer");if(layer){layer=layer.cloneNode(true)
}itemView.set("isSelected",isSelected);itemView.updateLayerIfNeeded()}if(layer){dragLayer.appendChild(layer);
layout=itemView.get("layout");if(layout.height+layout.top>height){height=layout.height+layout.top
}}layer=null},this);view.set("layout",{height:height});dragLayer=null;return view
},dragDataTypes:function(){var del=this.get("selectionDelegate"),ret=del.collectionViewDragDataTypes(this),key;
if(this.get("canReorderContent")){ret=ret?ret.copy():[];key=this.get("reorderDataType");
if(ret.indexOf(key)<0){ret.push(key)}}return ret?ret:[]}.property(),dragDataForType:function(drag,dataType){if(this.get("canReorderContent")){if(dataType===this.get("reorderDataType")){return this.get("dragContent")
}}var del=this.get("selectionDelegate");return del.collectionViewDragDataForType(this,drag,dataType)
},computeDragOperations:function(drag,evt){var op=SC.DRAG_NONE,del=this.get("selectionDelegate");
if(this.get("canReorderContent")){if(drag.get("dataTypes").indexOf(this.get("reorderDataType"))>=0){op=SC.DRAG_REORDER
}}op=del.collectionViewComputeDragOperations(this,drag,op);if(op&SC.DRAG_REORDER){op=SC.DRAG_MOVE
}return op},_computeDropOperationState:function(drag,evt,dragOp){var loc=this.convertFrameFromView(drag.get("location"),null),dropOp=SC.DROP_BEFORE,del=this.get("selectionDelegate"),canReorder=this.get("canReorderContent"),objects,content,isPreviousInDrag,isNextInDrag,len,tmp;
var idx=this.insertionIndexForLocation(loc,SC.DROP_ON);if(SC.typeOf(idx)===SC.T_ARRAY){dropOp=idx[1];
idx=idx[0]}if(dropOp===SC.DROP_ON){this.set("proposedInsertionIndex",idx);this.set("proposedDropOperation",dropOp);
tmp=del.collectionViewValidateDragOperation(this,drag,dragOp,idx,dropOp);idx=this.get("proposedInsertionIndex");
dropOp=this.get("proposedDropOperation");this._dropInsertionIndex=this._dropOperation=null;
if(tmp!==SC.DRAG_NONE){return[idx,dropOp,tmp]}else{dropOp=SC.DROP_BEFORE;idx=this.insertionIndexForLocation(loc,SC.DROP_BEFORE);
if(SC.typeOf(idx)===SC.T_ARRAY){dropOp=idx[1];idx=idx[0]}}}if((idx>=0)&&canReorder&&(dropOp!==SC.DROP_ON)){objects=drag.dataForType(this.get("reorderDataType"));
if(objects){content=this.get("content");if(dropOp===SC.DROP_BEFORE){isPreviousInDrag=objects.indexes.contains(idx-1);
isNextInDrag=objects.indexes.contains(idx)}else{isPreviousInDrag=objects.indexes.contains(idx);
isNextInDrag=objects.indexes.contains(idx-1)}if(isPreviousInDrag&&isNextInDrag){if(SC.none(this._lastInsertionIndex)){if(dropOp===SC.DROP_BEFORE){while((idx>=0)&&objects.indexes.contains(idx)){idx--
}}else{len=content?content.get("length"):0;while((idx<len)&&objects.indexes.contains(idx)){idx++
}}}else{idx=this._lastInsertionIndex}}if(idx>=0){dragOp=SC.DRAG_REORDER}}}this.set("proposedInsertionIndex",idx);
this.set("proposedDropOperation",dropOp);dragOp=del.collectionViewValidateDragOperation(this,drag,dragOp,idx,dropOp);
idx=this.get("proposedInsertionIndex");dropOp=this.get("proposedDropOperation");this._dropInsertionIndex=this._dropOperation=null;
return[idx,dropOp,dragOp]},dragUpdated:function(drag,evt){var op=drag.get("allowedDragOperations"),state=this._computeDropOperationState(drag,evt,op),idx=state[0],dropOp=state[1],dragOp=state[2];
if(dragOp!==SC.DRAG_NONE){if((this._lastInsertionIndex!==idx)||(this._lastDropOperation!==dropOp)){var itemView=this.itemViewForContentIndex(idx);
this.showInsertionPoint(itemView,dropOp)}this._lastInsertionIndex=idx;this._lastDropOperation=dropOp
}else{this.hideInsertionPoint();this._lastInsertionIndex=this._lastDropOperation=null
}return(dragOp&SC.DRAG_REORDER)?SC.DRAG_MOVE:dragOp},dragExited:function(){this.hideInsertionPoint();
this._lastInsertionIndex=this._lastDropOperation=null},acceptDragOperation:function(drag,op){return YES
},performDragOperation:function(drag,op){var state=this._computeDropOperationState(drag,null,op),idx=state[0],dropOp=state[1],dragOp=state[2],del=this.get("selectionDelegate"),performed,objects,data,content,shift,indexes;
if(dragOp&SC.DRAG_REORDER){op=(op&SC.DRAG_MOVE)?SC.DRAG_REORDER:SC.DRAG_NONE}else{op=op&dragOp
}if(op===SC.DRAG_NONE){return op}performed=del.collectionViewPerformDragOperation(this,drag,op,idx,dropOp);
if((performed===SC.DRAG_NONE)&&(op&SC.DRAG_REORDER)){data=drag.dataForType(this.get("reorderDataType"));
if(!data){return SC.DRAG_NONE}content=this.get("content");indexes=data.indexes;if(indexes.get("length")===1){if(((dropOp===SC.DROP_BEFORE)||(dropOp===SC.DROP_AFTER))&&(indexes.get("min")===idx)){return SC.DRAG_MOVE
}}content.beginPropertyChanges();objects=[];shift=0;data.indexes.forEach(function(i){objects.push(content.objectAt(i-shift));
content.removeAt(i-shift);shift++;if(i<idx){idx--}},this);if(dropOp===SC.DROP_AFTER){idx++
}content.replace(idx,0,objects,dropOp);this.select(SC.IndexSet.create(idx,objects.length));
content.endPropertyChanges();op=SC.DRAG_MOVE}return op},collectionViewShouldBeginDrag:function(view){return this.get("canReorderContent")
},insertionIndexForLocation:function(loc,dropOperation){return -1},_cv_isVisibleInWindowDidChange:function(){if(this.get("isVisibleInWindow")){if(this._invalidIndexes){this.invokeOnce(this.reloadIfNeeded)
}if(this._invalidSelection){this.invokeOnce(this.reloadSelectionIndexesIfNeeded)}}}.observes("isVisibleInWindow"),collectionViewShouldSelectItem:function(view,item){return this.get("isSelectable")
},_TMP_DIFF1:SC.IndexSet.create(),_TMP_DIFF2:SC.IndexSet.create(),_cv_nowShowingDidChange:function(){var nowShowing=this.get("nowShowing"),last=this._sccv_lastNowShowing,diff,diff1,diff2;
if(last!==nowShowing){if(last&&nowShowing){diff1=this._TMP_DIFF1.add(last).remove(nowShowing);
diff2=this._TMP_DIFF2.add(nowShowing).remove(last);diff=diff1.add(diff2)}else{diff=last||nowShowing
}}if(diff&&diff.get("length")>0){this._sccv_lastNowShowing=nowShowing?nowShowing.frozenCopy():null;
this.updateContentRangeObserver();this.reload(diff)}if(diff1){diff1.clear()}if(diff2){diff2.clear()
}}.observes("nowShowing"),init:function(){arguments.callee.base.apply(this,arguments);
if(this.useFastPath){this.mixin(SC.CollectionFastPath)}if(this.get("canReorderContent")){this._cv_canReorderContentDidChange()
}this._sccv_lastNowShowing=this.get("nowShowing").clone();if(this.content){this._cv_contentDidChange()
}if(this.selection){this._cv_selectionDidChange()}},_cv_canReorderContentDidChange:function(){if(this.get("canReorderContent")){if(!this.get("isDropTarget")){this.set("isDropTarget",YES)
}SC.Drag.addDropTarget(this)}}.observes("canReorderContent"),_cv_performSelectAction:function(view,ev,delay,clickCount){var sel;
if(delay===undefined){delay=0}if(clickCount===undefined){clickCount=1}if((clickCount>1)||this.get("actOnSelect")){if(this._cv_reselectTimer){this._cv_reselectTimer.invalidate()
}sel=this.get("selection");sel=sel?sel.toArray():[];if(this._cv_actionTimer){this._cv_actionTimer.invalidate()
}this._cv_actionTimer=this.invokeLater(this._cv_action,delay,view,ev,sel)}},_cv_action:function(view,evt,context){var action=this.get("action");
var target=this.get("target")||null;this._cv_actionTimer=null;if(action){if(SC.typeOf(action)===SC.T_FUNCTION){return this.action(view,evt)
}var pane=this.get("pane");if(pane){pane.rootResponder.sendAction(action,target,this,pane,context)
}}else{if(!view){return}else{if(SC.typeOf(view._action)==SC.T_FUNCTION){return view._action(evt)
}else{if(SC.typeOf(view.action)==SC.T_FUNCTION){return view.action(evt)}}}}}});SC.DateFieldView=SC.TextFieldView.extend({value:null,showDate:YES,showTime:NO,formatTime:"%I:%M %p",formatDate:"%d/%m/%Y",formatDateTime:"%d/%m/%Y %I:%M %p",_dtConstants:"%a %b %d %H %I %j %m %M %p %S %U %W %y %Y".w(),_wtConstants:[3,3,2,2,2,3,2,2,2,2,2,2,2,4],activeSelection:0,format:function(){var st=this.get("showTime");
var sd=this.get("showDate");if(st===YES&&sd===YES){return this.get("formatDateTime")
}if(st===YES){return this.get("formatTime")}return this.get("formatDate")}.property("showTime","showDate").cacheable(),validator:function(){return SC.Validator.DateTime.extend({format:this.get("format")})
}.property("format").cacheable(),tabsSelections:function(){var arr=[];var ft=this.get("format");
var _dt=this.get("_dtConstants");var _wt=this.get("_wtConstants");if(SC.empty(ft)){throw"The format string is empty, and must be a valid string."
}var pPos,key,keyPos,startAt=0,nPos=0,oPos=0;while(startAt<ft.length&&ft.indexOf("%",startAt)!==-1){pPos=ft.indexOf("%",startAt);
key=ft.substring(pPos,pPos+2);startAt=pPos+2;keyPos=_dt.indexOf(key);if(keyPos===-1){throw"SC.DateFieldView: The format's key '%@' is not supported.".fmt(key)
}nPos=nPos+pPos-oPos;arr.push(SC.Object.create({key:key,textSelection:SC.TextSelection.create({start:nPos,end:nPos+_wt[keyPos]})}));
nPos=nPos+_wt[keyPos];oPos=startAt}pPos=key=keyPos=null;return arr}.property("format").cacheable(),updateTextSelecitonObserver:function(){var as=this.get("activeSelection");
var ts=this.get("tabsSelections");if(this.get("isEditing")){this.selection(null,ts[as].get("textSelection"))
}}.observes("activeSelection","value"),updateValue:function(key,upOrDown){var newValue=(upOrDown===0)?-1:1;
var value=this.get("value"),hour;switch(key){case"%a":case"%d":case"%j":this.set("value",value.advance({day:newValue}));
break;case"%b":case"%m":this.set("value",value.advance({month:newValue}));break;case"%H":case"%I":this.set("value",value.advance({hour:newValue}));
break;case"%M":this.set("value",value.advance({minute:newValue}));break;case"%p":hour=value.get("hour")>=12?-12:12;
this.set("value",value.advance({hour:hour}));break;case"%S":this.set("value",value.advance({second:newValue}));
break;case"%U":this.set("value",value.advance({week1:newValue}));break;case"%W":this.set("value",value.advance({week0:newValue}));
break;case"%y":case"%Y":this.set("value",value.advance({year:newValue}));break}},_selectRootElement:function(){},keyDown:function(evt){if(this.interpretKeyEvents(evt)){evt.stop();
return YES}return arguments.callee.base.apply(this,arguments)},ctrl_a:function(){return YES
},moveUp:function(evt){var as=this.get("activeSelection");var ts=this.get("tabsSelections");
this.updateValue(ts[as].get("key"),1);return YES},moveDown:function(evt){var as=this.get("activeSelection");
var ts=this.get("tabsSelections");this.updateValue(ts[as].get("key"),0);return YES
},insertText:function(evt){return YES},moveRight:function(evt){var ts=this.get("tabsSelections");
var ns=this.get("activeSelection")+1;if(ns===ts.length){ns=0}this.set("activeSelection",ns);
return YES},moveLeft:function(evt){var ts=this.get("tabsSelections");var ns=this.get("activeSelection")-1;
if(ns===-1){ns=ts.length-1}this.set("activeSelection",ns);return YES},insertTab:function(evt){var ts=this.get("tabsSelections");
var ns=this.get("activeSelection")+1;if(ns<ts.length){this.set("activeSelection",ns);
return YES}return NO},insertBacktab:function(evt){var ns=this.get("activeSelection")-1;
if(ns!==-1){this.set("activeSelection",ns);return YES}return NO},mouseUp:function(evt){var ret=arguments.callee.base.apply(this,arguments);
var cs=this.get("selection");if(SC.none(cs)){this.set("activeSelection",0)}else{var caret=cs.get("start");
var ts=this.get("tabsSelections");var _tsLen=ts.length,cts;for(var i=0;i<_tsLen;i++){cts=ts[i].get("textSelection");
if(caret>=cts.get("start")&&caret<=cts.get("end")){this.set("activeSelection",i)}}}return ret
},deleteBackward:function(evt){return YES},deleteForward:function(evt){return YES
}});SC.DisclosureView=SC.ButtonView.extend({classNames:["sc-disclosure-view"],ariaLabel:null,renderDelegateName:"disclosureRenderDelegate",buttonBehavior:SC.TOGGLE_BEHAVIOR,toggleOnValue:YES,toggleOffValue:NO,valueBindingDefault:SC.Binding.bool(),keyDown:function(evt){if(evt.which===37||evt.which===38){this.set("value",this.get("toggleOffValue"));
return YES}if(evt.which===39||evt.which===40){this.set("value",this.get("toggleOnValue"));
return YES}arguments.callee.base.apply(this,arguments)}});SC.FileView=SC.FieldView.extend({classNames:"sc-file-view".w(),autoSubmit:YES,action:"uploadImage",target:null,childViews:"button form".w(),button:SC.ButtonView.design({title:"Choose File",theme:"capsule"}),form:SC.View.design({tagName:"form",render:function(context,firstTime){context.attr("method","post").attr("action","javascript:;").attr("enctype","multipart/form-data");
arguments.callee.base.apply(this,arguments)},childViews:"input".w(),input:SC.View.design({tagName:"input",render:function(context,firstTime){context.attr("type","file").end();
arguments.callee.base.apply(this,arguments)}})}),title:"Choose File",setFieldValue:function(newValue){SC.Logger.log("SC.FileView: setFieldValue: %@ does nothing".fmt(newValue))
},fieldValueDidChange:function(partialChange){arguments.callee.base.apply(this,arguments);
if(this.get("autoSubmit")){var resp=SC.Request.postUrl("/proxy/user/update_image").json().async(NO).send({picture:this.get("value")})
}}});sc_require("views/collection");sc_require("mixins/collection_row_delegate");
SC.ListView=SC.CollectionView.extend(SC.CollectionRowDelegate,{classNames:["sc-list-view"],acceptsFirstResponder:YES,showAlternatingRows:NO,render:function(context,firstTime){context.setClass("alternating",this.get("showAlternatingRows"));
return arguments.callee.base.apply(this,arguments)},rowDelegate:function(){var del=this.delegate,content=this.get("content");
return this.delegateFor("isCollectionRowDelegate",del,content)}.property("delegate","content").cacheable(),_sclv_rowDelegateDidChange:function(){var last=this._sclv_rowDelegate,del=this.get("rowDelegate"),func=this._sclv_rowHeightDidChange,func2=this._sclv_customRowHeightIndexesDidChange;
if(last===del){return this}this._sclv_rowDelegate=del;if(last){last.removeObserver("rowHeight",this,func);
last.removeObserver("customRowHeightIndexes",this,func2)}if(!del){throw"Internal Inconsistancy: ListView must always have CollectionRowDelegate"
}del.addObserver("rowHeight",this,func);del.addObserver("customRowHeightIndexes",this,func2);
this._sclv_rowHeightDidChange()._sclv_customRowHeightIndexesDidChange();return this
}.observes("rowDelegate"),_sclv_rowHeightDidChange:function(){var del=this.get("rowDelegate"),height=del.get("rowHeight"),indexes;
if(height===this._sclv_rowHeight){return this}this._sclv_rowHeight=height;indexes=SC.IndexSet.create(0,this.get("length"));
this.rowHeightDidChangeForIndexes(indexes);return this},_sclv_customRowHeightIndexesDidChange:function(){var del=this.get("rowDelegate"),indexes=del.get("customRowHeightIndexes"),last=this._sclv_customRowHeightIndexes,func=this._sclv_customRowHeightIndexesContentDidChange;
if((indexes===last)||(last&&last.isEqual(indexes))){return this}if(last&&this._sclv_isObservingCustomRowHeightIndexes){last.removeObserver("[]",this,func)
}if(this._sclv_isObservingCustomRowHeightIndexes=indexes&&!indexes.get("isFrozen")){indexes.addObserver("[]",this,func)
}this._sclv_customRowHeightIndexesContentDidChange();return this},_sclv_customRowHeightIndexesContentDidChange:function(){var del=this.get("rowDelegate"),indexes=del.get("customRowHeightIndexes"),last=this._sclv_customRowHeightIndexes,changed;
if(indexes&&last){changed=indexes.copy().add(last)}else{changed=indexes||last}this._sclv_customRowHeightIndexes=indexes?indexes.frozenCopy():null;
this.rowHeightDidChangeForIndexes(changed);return this},rowOffsetForContentIndex:function(idx){if(idx===0){return 0
}var del=this.get("rowDelegate"),rowHeight=del.get("rowHeight"),rowSpacing,ret,custom,cache,delta,max,content;
ret=idx*rowHeight;rowSpacing=this.get("rowSpacing");if(rowSpacing){ret+=idx*rowSpacing
}if(del.customRowHeightIndexes&&(custom=del.get("customRowHeightIndexes"))){cache=this._sclv_offsetCache;
if(!cache){cache=[];delta=max=0;custom.forEach(function(idx){delta+=this.rowHeightForContentIndex(idx)-rowHeight;
cache[idx+1]=delta;max=idx},this);this._sclv_max=max+1;this._sclv_offsetCache=cache
}delta=cache[idx];if(delta===undefined){delta=cache[idx]=cache[idx-1];if(delta===undefined){max=this._sclv_max;
if(idx<max){max=custom.indexBefore(idx)+1}delta=cache[idx]=cache[max]||0}}ret+=delta
}return ret},rowHeightForContentIndex:function(idx){var del=this.get("rowDelegate"),ret,cache,content,indexes;
if(del.customRowHeightIndexes&&(indexes=del.get("customRowHeightIndexes"))){cache=this._sclv_heightCache;
if(!cache){cache=[];content=this.get("content");indexes.forEach(function(idx){cache[idx]=del.contentIndexRowHeight(this,content,idx)
},this);this._sclv_heightCache=cache}ret=cache[idx];if(ret===undefined){ret=del.get("rowHeight")
}}else{ret=del.get("rowHeight")}return ret},rowHeightDidChangeForIndexes:function(indexes){var len=this.get("length");
this._sclv_heightCache=this._sclv_offsetCache=null;if(indexes&&indexes.isIndexSet){indexes=indexes.get("min")
}this.reload(SC.IndexSet.create(indexes,len-indexes));return this},computeLayout:function(){var ret=this._sclv_layout;
if(!ret){ret=this._sclv_layout={}}ret.minHeight=this.rowOffsetForContentIndex(this.get("length"));
this.set("calculatedHeight",ret.minHeight);return ret},layoutForContentIndex:function(contentIndex){var del=this.get("rowDelegate");
return{top:this.rowOffsetForContentIndex(contentIndex),height:this.rowHeightForContentIndex(contentIndex)-del.get("rowPadding")*2,left:0,right:0}
},contentIndexesInRect:function(rect){var rowHeight=this.get("rowDelegate").get("rowHeight"),top=SC.minY(rect),bottom=SC.maxY(rect),height=rect.height||0,len=this.get("length"),offset,start,end;
start=(top-(top%rowHeight))/rowHeight;offset=this.rowOffsetForContentIndex(start);
while(start>0&&offset>top){start--;offset-=this.rowHeightForContentIndex(start)}offset+=this.rowHeightForContentIndex(start);
while(start<len&&offset<=top){start++;offset+=this.rowHeightForContentIndex(start)
}if(start<0){start=0}if(start>=len){start=len}end=start+((height-(height%rowHeight))/rowHeight);
if(end>len){end=len}offset=this.rowOffsetForContentIndex(end);while(end>=start&&offset>=bottom){end--;
offset-=this.rowHeightForContentIndex(end)}offset+=this.rowHeightForContentIndex(end);
while(end<len&&offset<bottom){end++;offset+=this.rowHeightForContentIndex(end)}end++;
if(end<start){end=start}if(end>len){end=len}return SC.IndexSet.create(start,end-start)
},insertionPointView:SC.View.extend({classNames:"sc-list-insertion-point",render:function(context,firstTime){if(firstTime){context.push('<div class="anchor"></div>')
}}}),showInsertionPoint:function(itemView,dropOperation){var view=this._insertionPointView;
if(!view){view=this._insertionPointView=this.get("insertionPointView").create()}var index=itemView.get("contentIndex"),len=this.get("length"),layout=SC.clone(itemView.get("layout")),level=itemView.get("outlineLevel"),indent=itemView.get("outlineIndent")||0,group;
if((index>=len)&&index>0){group=this.itemViewForContentIndex(len-1);if(group.get("isGroupView")){level=1;
indent=group.get("outlineIndent")}}if(SC.none(level)){level=-1}if(dropOperation&SC.DROP_ON){this.hideInsertionPoint();
itemView.set("isSelected",YES);this._lastDropOnView=itemView}else{if(this._lastDropOnView){this._lastDropOnView.set("isSelected",NO);
this._lastDropOnView=null}if(dropOperation&SC.DROP_AFTER){layout.top+=layout.height
}layout.height=2;layout.right=0;layout.left=((level+1)*indent)+12;delete layout.width;
view.set("layout",layout);this.appendChild(view)}},hideInsertionPoint:function(){if(this._lastDropOnView){this._lastDropOnView.set("isSelected",NO);
this._lastDropOnView=null}var view=this._insertionPointView;if(view){view.removeFromParent().destroy()
}this._insertionPointView=null},insertionIndexForLocation:function(loc,dropOperation){var locRect={x:loc.x,y:loc.y,width:1,height:1},indexes=this.contentIndexesInRect(locRect),index=indexes.get("min"),len=this.get("length"),min,max,diff,clevel,cindent,plevel,pindent,itemView,pgroup;
if(SC.none(index)||index<0){if((len===0)||(loc.y<=this.rowOffsetForContentIndex(0))){index=0
}else{if(loc.y>=this.rowOffsetForContentIndex(len)){index=len}}}min=this.rowOffsetForContentIndex(index);
max=min+this.rowHeightForContentIndex(index);if(dropOperation==SC.DROP_ON){if(this.get("isEditable")){diff=Math.min(Math.floor((max-min)*0.2),5)
}else{diff=0}if(loc.y>=(min+diff)||loc.y<=(max+diff)){return[index,SC.DROP_ON]}}if((index<len)&&(loc.y>=max-10)){index++
}if(index>0){itemView=this.itemViewForContentIndex(index-1);pindent=(itemView?itemView.get("outlineIndent"):0)||0;
plevel=itemView?itemView.get("outlineLevel"):0;if(index<len){itemView=this.itemViewForContentIndex(index);
clevel=itemView?itemView.get("outlineLevel"):0;cindent=(itemView?itemView.get("outlineIndent"):0)||0;
cindent*=clevel}else{clevel=itemView.get("isGroupView")?1:0;cindent=pindent*clevel
}pindent*=plevel;if((clevel!==plevel)&&(cindent!==pindent)){if(pindent>cindent){index--;
dropOperation=SC.DROP_AFTER}}}if(dropOperation===SC.DROP_BEFORE){itemView=(index<len)?this.itemViewForContentIndex(index):null;
if(!itemView||itemView.get("isGroupView")){if(index>0){itemView=this.itemViewForContentIndex(index-1);
if(!itemView.get("isGroupView")||(itemView.get("disclosureState")===SC.BRANCH_OPEN)){index=index-1;
dropOperation=SC.DROP_AFTER}else{index=-1}}else{index=-1}}if(index<0){dropOperation=SC.DRAG_NONE
}}return[index,dropOperation]},mouseWheel:function(evt){var inlineEditor=SC.InlineTextFieldView.editor;
if(inlineEditor&&inlineEditor.get("isEditing")){if(inlineEditor.get("delegate").get("displayDelegate")===this){SC.InlineTextFieldView.commitEditing()
}}return NO},init:function(){arguments.callee.base.apply(this,arguments);this._sclv_rowDelegateDidChange()
}});require("views/list");SC.GridView=SC.ListView.extend({classNames:["sc-grid-view"],layout:{left:0,right:0,top:0,bottom:0},rowHeight:48,columnWidth:64,exampleView:SC.LabelView,insertionOrientation:SC.HORIZONTAL_ORIENTATION,itemsPerRow:function(){var f=this.get("frame"),columnWidth=this.get("columnWidth")||0;
return(columnWidth<=0)?1:Math.floor(f.width/columnWidth)}.property("clippingFrame","columnWidth").cacheable(),contentIndexesInRect:function(rect){var rowHeight=this.get("rowHeight")||48,itemsPerRow=this.get("itemsPerRow"),min=Math.floor(SC.minY(rect)/rowHeight)*itemsPerRow,max=Math.ceil(SC.maxY(rect)/rowHeight)*itemsPerRow;
return SC.IndexSet.create(min,max-min)},layoutForContentIndex:function(contentIndex){var rowHeight=this.get("rowHeight")||48,frameWidth=this.get("clippingFrame").width,itemsPerRow=this.get("itemsPerRow"),columnWidth=Math.floor(frameWidth/itemsPerRow),row=Math.floor(contentIndex/itemsPerRow),col=contentIndex-(itemsPerRow*row);
return{left:col*columnWidth,top:row*rowHeight,height:rowHeight,width:columnWidth}
},computeLayout:function(){var content=this.get("content"),count=(content)?content.get("length"):0,rowHeight=this.get("rowHeight")||48,itemsPerRow=this.get("itemsPerRow"),rows=Math.ceil(count/itemsPerRow);
var ret=this._cachedLayoutHash;if(!ret){ret=this._cachedLayoutHash={}}ret.minHeight=rows*rowHeight;
this.calculatedHeight=ret.minHeight;return ret},insertionPointClass:SC.View.extend({classNames:["grid-insertion-point"],render:function(context,firstTime){if(firstTime){context.push('<span class="anchor"></span>')
}}}),showInsertionPoint:function(itemView,dropOperation){if(!itemView){return}if(dropOperation===SC.DROP_ON){if(itemView!==this._dropOnInsertionPoint){this.hideInsertionPoint();
this._dropOnInsertionPoint=itemView}}else{if(this._dropOnInsertionPoint){this._dropOnInsertionPoint=null
}if(!this._insertionPointView){this._insertionPointView=this.insertionPointClass.create()
}var insertionPoint=this._insertionPointView;var itemViewFrame=itemView.get("frame");
var f={height:itemViewFrame.height-6,x:itemViewFrame.x,y:itemViewFrame.y+6,width:0};
if(!SC.rectsEqual(insertionPoint.get("frame"),f)){insertionPoint.set("frame",f)}if(insertionPoint.parentNode!==itemView.parentNode){itemView.parentNode.appendChild(insertionPoint)
}}},hideInsertionPoint:function(){var insertionPoint=this._insertionPointView;if(insertionPoint){insertionPoint.removeFromParent()
}if(this._dropOnInsertionPoint){this._dropOnInsertionPoint=null}},insertionIndexForLocation:function(loc,dropOperation){var f=this.get("frame"),sf=this.get("clippingFrame"),itemsPerRow=this.get("itemsPerRow"),columnWidth=Math.floor(f.width/itemsPerRow),row=Math.floor((loc.y-f.y-sf.y)/this.get("rowHeight"));
var retOp=SC.DROP_BEFORE,offset=(loc.x-f.x-sf.x),col=Math.floor(offset/columnWidth),percentage=(offset/columnWidth)-col;
if(dropOperation===SC.DROP_ON){if(percentage>0.8){col++}if((percentage>=0.2)&&(percentage<=0.8)){retOp=SC.DROP_ON
}}else{if(percentage>0.45){col++}}var ret=(row*itemsPerRow)+col;return[ret,retOp]
},_gv_clippingFrameDidChange:function(){var nowShowing=this.get("nowShowing"),itemView,idx,len;
this.notifyPropertyChange("itemsPerRow");len=nowShowing.get("length");for(idx=0;idx<len;
idx++){itemView=this.itemViewForContentIndex(idx);itemView.adjust(this.layoutForContentIndex(idx))
}}.observes("clippingFrame")});SC.ImageButtonView=SC.ButtonView.extend({classNames:["sc-image-button-view"],themeName:null,renderDelegateName:"imageButtonRenderDelegate",displayProperties:["image"],image:null});
SC.ANCHOR_TOP={top:0};SC.ANCHOR_LEFT={left:0};SC.ANCHOR_TOP_LEFT={top:0,left:0};SC.ANCHOR_BOTTOM={bottom:0};
SC.ANCHOR_RIGHT={right:0};SC.ANCHOR_BOTTOM_RIGHT={bottom:0,right:0};SC.ToolbarView=SC.View.extend({classNames:["sc-toolbar-view"],ariaRole:"toolbar",anchorLocation:null,layout:{left:0,height:32,right:0},init:function(){if(this.anchorLocation){this.layout=SC.merge(this.layout,this.anchorLocation)
}arguments.callee.base.apply(this,arguments)},renderDelegateName:"toolbarRenderDelegate"});
require("views/toolbar");SC.VERTICAL_ORIENTATION="vertical";SC.HORIZONTAL_ORIENTATION="horizontal";
SC.WorkspaceView=SC.View.extend({classNames:["sc-workspace-view"],topToolbar:SC.ToolbarView.extend(),bottomToolbar:null,contentView:SC.View.extend(),autoResizeToolbars:NO,defaultToolbarSize:44,largeToolbarSize:44,smallToolbarSize:30,toolbarSize:function(){if(!this.get("autoResizeToolbars")){return this.get("defaultToolbarSize")
}if(this.get("orientation")===SC.HORIZONTAL_ORIENTATION){return this.get("smallToolbarSize")
}return this.get("largeToolbarSize")}.property("autoHideMaster","orientation"),orientation:function(){var f=this.get("frame");
if(f.width>f.height){return SC.HORIZONTAL_ORIENTATION}else{return SC.VERTICAL_ORIENTATION
}}.property("frame").cacheable(),masterIsHidden:NO,masterIsHiddenDidChange:function(){var t,mih=this.get("masterIsHidden");
if(t=this.get("topToolbar")){t.set("masterIsHidden",mih)}if(t=this.get("bottomToolbar")){t.set("masterIsHidden",mih)
}}.observes("masterIsHidden"),_scmd_tilePropertyDidChange:function(){this.invokeOnce("_scws_tile")
}.observes("toolbarSize"),createChildViews:function(){arguments.callee.base.apply(this,arguments);
var topToolbar=this.get("topToolbar");if(topToolbar){topToolbar=this.topToolbar=this.activeTopToolbar=this.createChildView(topToolbar);
this.appendChild(topToolbar)}var bottomToolbar=this.get("bottomToolbar");if(bottomToolbar){bottomToolbar=this.bottomToolbar=this.activeBottomToolbar=this.createChildView(bottomToolbar);
this.appendChild(bottomToolbar)}var content=this.get("contentView");content=this.contentView=this.activeContentView=this.createChildView(content);
this.appendChild(content);this.invokeOnce("_scws_tile")},_scws_tile:function(){var contentTop=0,contentBottom=0,topToolbar=this.get("topToolbar"),bottomToolbar=this.get("bottomToolbar"),content=this.get("contentView"),toolbarSize=this.get("toolbarSize");
if(topToolbar){topToolbar.set("layout",{left:0,right:0,top:0,height:toolbarSize});
contentTop+=toolbarSize}if(bottomToolbar){bottomToolbar.set("layout",{left:0,right:0,bottom:0,height:toolbarSize});
contentBottom+=toolbarSize}this.contentView.set("layout",{left:0,right:0,top:contentTop,bottom:contentBottom})
},hasTopToolbar:function(){if(this.get("topToolbar")){return YES}return NO}.property("topToolbar").cacheable(),hasBottomToolbar:function(){if(this.get("bottomToolbar")){return YES
}return NO}.property("bottomToolbar").cacheable(),childDidChange:function(){this._scws_tile()
},activeTopToolbar:null,activeBottomToolbar:null,activeContentView:null,topToolbarDidChange:function(){var active=this.activeTopToolbar,replacement=this.get("topToolbar");
if(active){this.removeChild(active)}if(replacement){this.appendChild(replacement)
}this.activeTopToolbar=replacement;this.invokeLast("childDidChange")}.observes("topToolbar"),bottomToolbarDidChange:function(){var active=this.activeBottomToolbar,replacement=this.get("bottomToolbar");
if(active){this.removeChild(active)}if(replacement){this.appendChild(replacement)
}this.activeBottomToolbar=replacement;this.invokeLast("childDidChange")}.observes("bottomToolbar"),contentViewDidChange:function(){var active=this.activeContentView,replacement=this.get("contentView");
if(active){this.removeChild(active)}if(replacement){this.appendChild(replacement)
}this.activeContentView=replacement;this.invokeLast("childDidChange")}.observes("contentView"),displayProperties:"hasTopToolbar hasBottomToolbar".w(),renderDelegateName:"workspaceRenderDelegate"});
require("views/workspace");require("views/toolbar");SC.VERTICAL_ORIENTATION="vertical";
SC.HORIZONTAL_ORIENTATION="horizontal";SC.MasterDetailView=SC.View.extend({classNames:["sc-master-detail-view"],masterView:SC.WorkspaceView.extend({topToolbar:SC.ToolbarView.extend({}),contentView:SC.View.extend({backgroundColor:"white"})}),detailView:SC.WorkspaceView.extend({topToolbar:SC.ToolbarView.extend({childViews:"showHidePicker".w(),showHidePicker:SC.ButtonView.extend({layout:{left:7,centerY:0,height:30,width:100},controlSize:SC.AUTO_CONTROL_SIZE,title:"Picker",action:"toggleMasterPicker",isVisible:NO,isVisibleBinding:".parentView.masterIsHidden"})})}),autoHideMaster:function(){if(SC.platform.touch){return YES
}return NO}.property().cacheable(),masterWidth:250,masterIsHidden:function(){if(!this.get("autoHideMaster")){return NO
}if(this.get("orientation")===SC.HORIZONTAL_ORIENTATION){return NO}return YES}.property("autoHideMaster","orientation"),orientation:SC.VERTICAL_ORIENTATION,_scmd_frameDidChange:function(){var f=this.get("frame"),ret;
if(f.width>f.height){ret=SC.HORIZONTAL_ORIENTATION}else{ret=SC.VERTICAL_ORIENTATION
}this.setIfChanged("orientation",ret)}.observes("frame"),init:function(){arguments.callee.base.apply(this,arguments);
this._scmd_frameDidChange();this._scmd_masterIsHiddenDidChange()},toggleMasterPicker:function(view){if(!this.get("masterIsHidden")){return
}if(this._picker&&this._picker.get("isVisibleInWindow")){this.hideMasterPicker()}else{this.showMasterPicker(view)
}},showMasterPicker:function(view){if(this._picker&&this._picker.get("isVisibleInWindow")){return
}if(!this._picker){var pp=this.get("pickerPane");this._picker=pp.create({})}this._picker.set("contentView",this.get("masterView"));
this._picker.set("extraRightOffset",this.get("pointerDistanceFromEdge"));this.showPicker(this._picker,view)
},hideMasterPicker:function(){if(this._picker&&this._picker.get("isVisibleInWindow")){this.hidePicker(this._picker)
}},showPicker:function(p,view){p.popup(view,SC.PICKER_POINTER,[3,0,1,2,3],[9,-9,-18,18])
},hidePicker:function(p){p.remove()},pickerPane:SC.PickerPane.extend({layout:{width:250,height:480},themeName:"popover"}),_picker:null,pointerDistanceFromEdge:46,renderDelegateName:"masterDetailRenderDelegate",_scmd_masterIsHiddenDidChange:function(){var mih=this.get("masterIsHidden");
this.get("masterView").set("masterIsHidden",mih);this.get("detailView").set("masterIsHidden",mih)
}.observes("masterIsHidden"),_scmd_orientationDidChange:function(){this.invokeOnce("_scmd_tile")
}.observes("orientation"),_scmd_retileProperties:function(){this.invokeOnce("_scmd_tile")
}.observes("masterIsHidden","masterWidth"),createChildViews:function(){var master=this.get("masterView");
master=this.masterView=this.createChildView(master);var detail=this.get("detailView");
detail=this.detailView=this.createChildView(detail);this.appendChild(detail);this.invokeOnce("_scmd_tile")
},_masterIsDrawn:NO,_scmd_tile:function(){var masterIsVisible=!this.get("masterIsHidden");
var masterWidth=this.get("masterWidth"),master=this.get("masterView"),detail=this.get("detailView");
if(masterIsVisible){this.hideMasterPicker();if(!this._masterIsDrawn){if(this._picker){this._picker.set("contentView",null)
}this.appendChild(master);this._masterIsDrawn=YES}master.set("layout",{left:0,top:0,bottom:0,width:masterWidth});
var extra=this.getThemedProperty("dividerWidth","MASTER_DETAIL_DIVIDER_WIDTH");detail.set("layout",{left:masterWidth+extra,right:0,top:0,bottom:0})
}else{if(this._masterIsDrawn){this.removeChild(master);this._masterIsDrawn=NO}detail.set("layout",{left:0,right:0,top:0,bottom:0})
}}});SC.ScrollerView=SC.View.extend({classNames:["sc-scroller-view"],ariaRole:"scrollbar",shouldScrollToClick:NO,_touchScrollValue:NO,value:function(key,val){var minimum=this.get("minimum");
if(val!==undefined){this._scs_value=val}val=this._scs_value||minimum;return Math.max(Math.min(val,this.get("maximum")),minimum)
}.property("maximum","minimum").cacheable(),displayValue:function(){var ret;if(this.get("_touchScrollValue")){ret=this.get("_touchScrollValue")
}else{ret=this.get("value")}return ret}.property("value","_touchScrollValue").cacheable(),proportion:0,maximum:100,minimum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,hasButtons:YES,scrollbarThickness:14,capLength:18,capOverlap:14,buttonLength:41,buttonOverlap:11,minimumThumbLength:20,displayProperties:"thumbPosition thumbLength isEnabled controlsHidden".w(),render:function(context,firstTime){var classNames={},buttons="",parentView=this.get("parentView"),thumbPosition,thumbLength,thumbCenterLength,thumbElement,value,max,scrollerLength,length,pct;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:classNames["sc-vertical"]=YES;
break;case SC.LAYOUT_HORIZONTAL:classNames["sc-horizontal"]=YES;break}classNames.disabled=!this.get("isEnabled");
classNames["controls-hidden"]=this.get("controlsHidden");context.setClass(classNames);
thumbLength=this.get("thumbLength");thumbPosition=this.get("thumbPosition");if(firstTime){if(this.get("hasButtons")){buttons='<div class="button-bottom"></div><div class="button-top"></div>'
}else{buttons='<div class="endcap"></div>'}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:context.push('<div class="track"></div>','<div class="cap"></div>',buttons,'<div class="thumb" style="height: '+thumbLength+"px; top: "+thumbPosition+'px;">','<div class="thumb-center"></div>','<div class="thumb-top"></div>','<div class="thumb-bottom"></div></div>');
context.attr("aria-orientation","vertical");break;case SC.LAYOUT_HORIZONTAL:context.push('<div class="track"></div>','<div class="cap"></div>',buttons,'<div class="thumb" style="width: '+thumbLength+"px; left: "+thumbPosition+'px;">','<div class="thumb-center"></div>','<div class="thumb-top"></div>','<div class="thumb-bottom"></div></div>');
context.attr("aria-orientation","horizontal")}context.attr("aria-valuemax",this.get("maximun"));
context.attr("aria-valuemin",this.get("minimum"));context.attr("aria-valuenow",this.get("value"));
context.attr("aria-controls",parentView.getPath("contentView.layerId"))}else{if(this.get("controlsHidden")){return
}thumbElement=this.$(".thumb");this.adjustThumb(thumbElement,thumbPosition,thumbLength);
context.attr("aria-valuenow",this.get("value"))}},touchScrollDidStart:function(value){this.set("_touchScrollValue",value)
},touchScrollDidEnd:function(value){this.set("_touchScrollValue",NO)},touchScrollDidChange:function(value){this.set("_touchScrollValue",value)
},adjustThumb:function(thumb,position,length){this.adjustThumbPosition(thumb,position);
this.adjustThumbSize(thumb,length)},adjustThumbPosition:function(thumb,position){if(this._thumbPosition===position){return
}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:thumb.css("top",position);
break;case SC.LAYOUT_HORIZONTAL:thumb.css("left",position);break}this._thumbPosition=position
},adjustThumbSize:function(thumb,size){if(this._thumbSize===size){return}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:thumb.css("height",Math.max(size,this.get("minimumThumbLength")));
break;case SC.LAYOUT_HORIZONTAL:thumb.css("width",Math.max(size,this.get("minimumThumbLength")));
break}this._thumbSize=size},trackLength:function(){var scrollerLength=this.get("scrollerLength");
scrollerLength-=this.capLength-this.capOverlap;scrollerLength-=this.buttonLength-this.buttonOverlap;
return scrollerLength}.property("scrollerLength").cacheable(),scrollerLength:function(){switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:return this.get("frame").height;
case SC.LAYOUT_HORIZONTAL:return this.get("frame").width}return 0}.property("frame").cacheable(),thumbLength:function(){var length;
length=Math.floor(this.get("trackLength")*this.get("proportion"));length=isNaN(length)?0:length;
return Math.max(length,this.get("minimumThumbLength"))}.property("trackLength","proportion").cacheable(),thumbPosition:function(){var value=this.get("displayValue"),max=this.get("maximum"),trackLength=this.get("trackLength"),thumbLength=this.get("thumbLength"),capLength=this.get("capLength"),capOverlap=this.get("capOverlap"),position;
position=(value/max)*(trackLength-thumbLength);position+=capLength-capOverlap;return Math.floor(isNaN(position)?0:position)
}.property("displayValue","maximum","trackLength","thumbLength").cacheable(),controlsHidden:function(){return this.get("proportion")>=1
}.property("proportion").cacheable(),valueForPosition:function(pos){var max=this.get("maximum"),trackLength=this.get("trackLength"),thumbLength=this.get("thumbLength"),capLength=this.get("capLength"),capOverlap=this.get("capOverlap"),value;
value=pos-(capLength-capOverlap);value=value/(trackLength-thumbLength);value=value*max;
return value},mouseDown:function(evt){if(!this.get("isEnabled")){return NO}this._altIsDown=evt.altKey;
this._shiftIsDown=evt.shiftKey;var target=evt.target,thumbPosition=this.get("thumbPosition"),value,clickLocation,clickOffset,scrollerLength=this.get("scrollerLength");
if(target.className.indexOf("thumb")>=0){clickLocation=this.convertFrameFromView({x:evt.pageX,y:evt.pageY});
clickLocation.x-=thumbPosition;clickLocation.y-=thumbPosition;this._thumbDragging=YES;
this._thumbOffset=clickLocation;this._mouseDownLocation={x:evt.pageX,y:evt.pageY};
this._thumbPositionAtDragStart=this.get("thumbPosition");this._valueAtDragStart=this.get("value")
}else{if(target.className.indexOf("button-top")>=0){this.decrementProperty("value",(this._altIsDown?scrollerLength:30));
this.makeButtonActive(".button-top");this.startMouseDownTimer("scrollUp");this._isScrollingUp=YES
}else{if(target.className.indexOf("button-bottom")>=0){this.incrementProperty("value",(this._altIsDown?scrollerLength:30));
this.makeButtonActive(".button-bottom");this.startMouseDownTimer("scrollDown");this._isScrollingDown=YES
}else{var scrollToClick=this.get("shouldScrollToClick");if(evt.altKey){scrollToClick=!scrollToClick
}var trackLength=this.get("trackLength"),thumbLength=this.get("thumbLength"),frame=this.convertFrameFromView({x:evt.pageX,y:evt.pageY}),mousePosition;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:this._mouseDownLocation=mousePosition=frame.y;
break;case SC.LAYOUT_HORIZONTAL:this._mouseDownLocation=mousePosition=frame.x;break
}if(scrollToClick){this.set("value",this.valueForPosition(mousePosition-(thumbLength/2)));
thumbPosition=this.get("thumbPosition");this._thumbDragging=YES;this._thumbOffset={x:frame.x-thumbPosition,y:frame.y-thumbPosition};
this._mouseDownLocation={x:evt.pageX,y:evt.pageY};this._thumbPositionAtDragStart=thumbPosition;
this._valueAtDragStart=this.get("value")}else{if(mousePosition<thumbPosition){this.decrementProperty("value",scrollerLength);
this.startMouseDownTimer("page")}else{this.incrementProperty("value",scrollerLength);
this.startMouseDownTimer("page")}}}}}return YES},mouseUp:function(evt){var active=this._scs_buttonActive,ret=NO,timer;
if(active){active.removeClass("active");ret=YES}timer=this._mouseDownTimer;if(timer){timer.invalidate();
this._mouseDownTimer=null}this._thumbDragging=NO;this._isScrollingDown=NO;this._isScrollingUp=NO;
return ret},mouseDragged:function(evt){var value,length,delta,thumbPosition,target=evt.target,thumbPositionAtDragStart=this._thumbPositionAtDragStart,isScrollingUp=this._isScrollingUp,isScrollingDown=this._isScrollingDown,active=this._scs_buttonActive,timer;
if(this._thumbDragging){switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:delta=(evt.pageY-this._mouseDownLocation.y);
break;case SC.LAYOUT_HORIZONTAL:delta=(evt.pageX-this._mouseDownLocation.x);break
}if(evt.altKey){if(!this._altIsDown||(this._shiftIsDown!==evt.shiftKey)){thumbPositionAtDragStart=this._thumbPositionAtDragStart=thumbPositionAtDragStart+delta;
delta=0;this._mouseDownLocation={x:evt.pageX,y:evt.pageY};this._valueAtDragStart=this.get("value")
}if(evt.shiftKey){delta=-delta}this.set("value",Math.round(this._valueAtDragStart+delta*2))
}else{thumbPosition=thumbPositionAtDragStart+delta;length=this.get("trackLength")-this.get("thumbLength");
this.set("value",Math.round((thumbPosition/length)*this.get("maximum")))}}else{if(isScrollingUp||isScrollingDown){var nowScrollingUp=NO,nowScrollingDown=NO;
var topButtonRect=this.$(".button-top")[0].getBoundingClientRect();var bottomButtonRect=this.$(".button-bottom")[0].getBoundingClientRect();
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:if(evt.pageY<topButtonRect.bottom){nowScrollingUp=YES
}else{nowScrollingDown=YES}break;case SC.LAYOUT_HORIZONTAL:if(evt.pageX<topButtonRect.right){nowScrollingUp=YES
}else{nowScrollingDown=YES}break}if((nowScrollingUp||nowScrollingDown)&&nowScrollingUp!==isScrollingUp){if(active){active.removeClass("active")
}this._mouseDownTimerAction=nowScrollingUp?"scrollUp":"scrollDown";if(nowScrollingUp){this.makeButtonActive(".button-top")
}else{if(nowScrollingDown){this.makeButtonActive(".button-bottom")}}this._isScrollingUp=nowScrollingUp;
this._isScrollingDown=nowScrollingDown}}}this._altIsDown=evt.altKey;this._shiftIsDown=evt.shiftKey;
return YES},startMouseDownTimer:function(action,immediate){var timer;this._mouseDownTimerAction=action;
this._mouseDownTimer=SC.Timer.schedule({target:this,action:this.mouseDownTimerDidFire,interval:immediate?0:300})
},mouseDownTimerDidFire:function(){var scrollerLength=this.get("scrollerLength"),mouseLocation=SC.device.get("mouseLocation"),thumbPosition=this.get("thumbPosition"),thumbLength=this.get("thumbLength"),timerInterval=50;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:mouseLocation=this.convertFrameFromView(mouseLocation).y;
break;case SC.LAYOUT_HORIZONTAL:mouseLocation=this.convertFrameFromView(mouseLocation).x;
break}switch(this._mouseDownTimerAction){case"scrollDown":this.incrementProperty("value",this._altIsDown?scrollerLength:30);
break;case"scrollUp":this.decrementProperty("value",this._altIsDown?scrollerLength:30);
break;case"page":timerInterval=150;if(mouseLocation<thumbPosition){this.decrementProperty("value",scrollerLength)
}else{if(mouseLocation>thumbPosition+thumbLength){this.incrementProperty("value",scrollerLength)
}}}this._mouseDownTimer=SC.Timer.schedule({target:this,action:this.mouseDownTimerDidFire,interval:timerInterval})
},makeButtonActive:function(selector){this._scs_buttonActive=this.$(selector).addClass("active")
}});SC.TouchScrollerView=SC.ScrollerView.extend({classNames:["sc-touch-scroller-view"],scrollbarThickness:12,capLength:5,capOverlap:0,hasButtons:NO,buttonOverlap:36,adjustThumb:function(thumb,position,length){var thumbInner=this.$(".thumb-inner");
var max=this.get("scrollerLength")-this.capLength,min=this.get("minimum")+this.capLength;
if(position+length>max){position=Math.min(max-20,position);length=max-position}if(position<min){length-=min-position;
position=min}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:if(this._thumbPosition!==position){thumb.css("-webkit-transform","translate3d(0px,"+position+"px,0px)")
}if(this._thumbSize!==length){thumbInner.css("-webkit-transform","translate3d(0px,"+Math.round(length-1044)+"px,0px)")
}break;case SC.LAYOUT_HORIZONTAL:if(this._thumbPosition!==position){thumb.css("-webkit-transform","translate3d("+position+"px,0px,0px)")
}if(this._thumbSize!==length){thumbInner.css("-webkit-transform","translate3d("+Math.round(length-1044)+"px,0px,0px)")
}break}this._thumbPosition=position;this._thumbSize=length},render:function(context,firstTime){var classNames=[],buttons="",thumbPosition,thumbLength,thumbCenterLength,thumbElement,value,max,scrollerLength,length,pct;
switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:classNames.push("sc-vertical");
break;case SC.LAYOUT_HORIZONTAL:classNames.push("sc-horizontal");break}if(!this.get("isEnabled")){classNames.push("disabled")
}if(this.get("controlsHidden")){classNames.push("controls-hidden")}context.addClass(classNames);
thumbLength=this.get("thumbLength");thumbPosition=this.get("thumbPosition");if(firstTime){if(this.get("hasButtons")){buttons='<div class="button-bottom"></div><div class="button-top"></div>'
}else{buttons='<div class="endcap"></div>'}switch(this.get("layoutDirection")){case SC.LAYOUT_VERTICAL:context.push('<div class="track"></div>','<div class="cap"></div>',buttons,'<div class="thumb">','<div class="thumb-top"></div>','<div class="thumb-clip">','<div class="thumb-inner" style="-webkit-transform: translateY('+(thumbLength-1044)+'px);">','<div class="thumb-center"></div>','<div class="thumb-bottom"></div></div></div></div>');
break;case SC.LAYOUT_HORIZONTAL:context.push('<div class="track"></div>','<div class="cap"></div>',buttons,'<div class="thumb">','<div class="thumb-top"></div>','<div class="thumb-clip">','<div class="thumb-inner" style="-webkit-transform: translateX('+(thumbLength-1044)+'px);">','<div class="thumb-center"></div>','<div class="thumb-bottom"></div></div></div></div>')
}}else{if(this.get("controlsHidden")){return}thumbElement=this.$(".thumb");this.adjustThumb(thumbElement,thumbPosition,thumbLength)
}}});sc_require("views/scroller");sc_require("mixins/border");SC.NORMAL_SCROLL_DECELERATION=0.95;
SC.FAST_SCROLL_DECELERATION=0.85;SC.ScrollView=SC.View.extend(SC.Border,{classNames:["sc-scroll-view"],isScrollable:YES,contentView:null,horizontalAlign:SC.ALIGN_LEFT,verticalAlign:SC.ALIGN_TOP,horizontalScrollOffset:function(key,value){if(value!==undefined){var minOffset=this.minimumHorizontalScrollOffset(),maxOffset=this.get("maximumHorizontalScrollOffset");
this._scroll_horizontalScrollOffset=Math.max(minOffset,Math.min(maxOffset,value))
}return this._scroll_horizontalScrollOffset||0}.property().cacheable(),verticalScrollOffset:function(key,value){if(value!==undefined){var minOffset=this.get("minimumVerticalScrollOffset"),maxOffset=this.get("maximumVerticalScrollOffset");
this._scroll_verticalScrollOffset=Math.max(minOffset,Math.min(maxOffset,value))}return this._scroll_verticalScrollOffset||0
}.property().cacheable(),maximumScrollOffset:function(contentSize,containerSize,align){if(contentSize>=containerSize){return contentSize-containerSize
}if(align===SC.ALIGN_LEFT||align===SC.ALIGN_TOP){return 0}else{if(align===SC.ALIGN_MIDDLE||align===SC.ALIGN_CENTER){return 0-Math.round((containerSize-contentSize)/2)
}else{return 0-(containerSize-contentSize)}}},minimumScrollOffset:function(contentSize,containerSize,align){if(contentSize>containerSize){return 0
}if(align===SC.ALIGN_LEFT||align===SC.ALIGN_TOP){return 0}else{if(align===SC.ALIGN_MIDDLE||align===SC.ALIGN_CENTER){return 0-Math.round((containerSize-contentSize)/2)
}else{return 0-(containerSize-contentSize)}}},maximumHorizontalScrollOffset:function(){var view=this.get("contentView");
var contentWidth=view?view.get("frame").width:0,calculatedWidth=view?view.get("calculatedWidth"):0;
if(calculatedWidth){contentWidth=view.calculatedWidth}contentWidth*=this._scale;var containerWidth=this.get("containerView").get("frame").width;
if(!this.get("canScrollHorizontal")){contentWidth=Math.min(contentWidth,containerWidth)
}return this.maximumScrollOffset(contentWidth,containerWidth,this.get("horizontalAlign"))
}.property(),maximumVerticalScrollOffset:function(){var view=this.get("contentView"),contentHeight=(view&&view.get("frame"))?view.get("frame").height:0,calculatedHeight=view?view.get("calculatedHeight"):0;
if(calculatedHeight){contentHeight=calculatedHeight}contentHeight*=this._scale;var containerHeight=this.get("containerView").get("frame").height;
if(!this.get("canScrollVertical")){contentHeight=Math.min(contentHeight,containerHeight)
}return this.maximumScrollOffset(contentHeight,containerHeight,this.get("verticalAlign"))
}.property(),minimumHorizontalScrollOffset:function(){var view=this.get("contentView");
var contentWidth=view?view.get("frame").width:0,calculatedWidth=view?view.get("calculatedWidth"):0;
if(calculatedWidth){contentWidth=calculatedWidth}contentWidth*=this._scale;var containerWidth=this.get("containerView").get("frame").width;
if(!this.get("canScrollHorizontal")){contentWidth=Math.min(contentWidth,containerWidth)
}return this.minimumScrollOffset(contentWidth,containerWidth,this.get("horizontalAlign"))
}.property(),minimumVerticalScrollOffset:function(){var view=this.get("contentView");
var contentHeight=(view&&view.get("frame"))?view.get("frame").height:0,calculatedHeight=view?view.get("calculatedHeight"):0;
if(calculatedHeight){contentHeight=view.calculatedHeight}contentHeight*=this._scale;
var containerHeight=this.get("containerView").get("frame").height;if(!this.get("canScrollVertical")){contentHeight=Math.min(contentHeight,containerHeight)
}return this.minimumScrollOffset(contentHeight,containerHeight,this.get("verticalAlign"))
}.property(),verticalLineScroll:20,horizontalLineScroll:20,verticalPageScroll:function(){return this.get("frame").height
}.property("frame"),horizontalPageScroll:function(){return this.get("frame").width
}.property("frame"),hasHorizontalScroller:YES,horizontalScrollerView:SC.ScrollerView,horizontalTouchScrollerView:SC.TouchScrollerView,isHorizontalScrollerVisible:YES,canScrollHorizontal:function(){return !!(this.get("hasHorizontalScroller")&&this.get("horizontalScrollerView")&&this.get("isHorizontalScrollerVisible"))
}.property("isHorizontalScrollerVisible").cacheable(),autohidesHorizontalScroller:YES,hasVerticalScroller:YES,verticalScrollerView:SC.ScrollerView,verticalTouchScrollerView:SC.TouchScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:function(){return !!(this.get("hasVerticalScroller")&&this.get("verticalScrollerView")&&this.get("isVerticalScrollerVisible"))
}.property("isVerticalScrollerVisible").cacheable(),autohidesVerticalScroller:YES,verticalScrollerBottom:0,verticalOverlay:function(){if(SC.platform.touch){return YES
}return NO}.property().cacheable(),horizontalOverlay:function(){if(SC.platform.touch){return YES
}return NO}.property().cacheable(),verticalScrollerLayout:null,horizontalScrollerLayout:null,containerView:SC.ContainerView.extend({}),scrollTo:function(x,y){if(y===undefined&&SC.typeOf(x)===SC.T_HASH){y=x.y;
x=x.x}if(!SC.none(x)){x=Math.max(this.get("minimumHorizontalScrollOffset"),Math.min(this.get("maximumHorizontalScrollOffset"),x));
this.set("horizontalScrollOffset",x)}if(!SC.none(y)){y=Math.max(this.get("minimumVerticalScrollOffset"),Math.min(this.get("maximumVerticalScrollOffset"),y));
this.set("verticalScrollOffset",y)}return this},scrollBy:function(x,y){if(y===undefined&&SC.typeOf(x)===SC.T_HASH){y=x.y;
x=x.x}x=(x)?this.get("horizontalScrollOffset")+x:null;y=(y)?this.get("verticalScrollOffset")+y:null;
return this.scrollTo(x,y)},scrollToVisible:function(view){if(arguments.length===0){return arguments.callee.base.apply(this,arguments)
}var contentView=this.get("contentView");if(!contentView){return NO}var vf=view.get("frame");
if(!vf){return NO}vf=contentView.convertFrameFromView(vf,view.get("parentView"));
return this.scrollToRect(vf)},scrollToRect:function(rect){var vo=SC.cloneRect(this.get("containerView").get("frame"));
vo.x=this.get("horizontalScrollOffset");vo.y=this.get("verticalScrollOffset");var origX=vo.x,origY=vo.y;
vo.y-=Math.max(0,SC.minY(vo)-SC.minY(rect));vo.x-=Math.max(0,SC.minX(vo)-SC.minX(rect));
vo.y+=Math.max(0,SC.maxY(rect)-SC.maxY(vo));vo.x+=Math.max(0,SC.maxX(rect)-SC.maxX(vo));
if((origX!==vo.x)||(origY!==vo.y)){this.scrollTo(vo.x,vo.y);return YES}else{return NO
}},scrollDownLine:function(lines){if(lines===undefined){lines=1}return this.scrollBy(null,this.get("verticalLineScroll")*lines)
},scrollUpLine:function(lines){if(lines===undefined){lines=1}return this.scrollBy(null,0-this.get("verticalLineScroll")*lines)
},scrollRightLine:function(lines){if(lines===undefined){lines=1}return this.scrollTo(this.get("horizontalLineScroll")*lines,null)
},scrollLeftLine:function(lines){if(lines===undefined){lines=1}return this.scrollTo(0-this.get("horizontalLineScroll")*lines,null)
},scrollDownPage:function(pages){if(pages===undefined){pages=1}return this.scrollBy(null,this.get("verticalPageScroll")*pages)
},scrollUpPage:function(pages){if(pages===undefined){pages=1}return this.scrollBy(null,0-(this.get("verticalPageScroll")*pages))
},scrollRightPage:function(pages){if(pages===undefined){pages=1}return this.scrollBy(this.get("horizontalPageScroll")*pages,null)
},scrollLeftPage:function(pages){if(pages===undefined){pages=1}return this.scrollBy(0-(this.get("horizontalPageScroll")*pages),null)
},tile:function(){var hscroll=this.get("hasHorizontalScroller")?this.get("horizontalScrollerView"):null;
var hasHorizontal=hscroll&&this.get("isHorizontalScrollerVisible");var vscroll=this.get("hasVerticalScroller")?this.get("verticalScrollerView"):null;
var hasVertical=vscroll&&this.get("isVerticalScrollerVisible");var clip=this.get("containerView");
var clipLayout={left:0,top:0};var t,layout,vo,ho,vl,hl;var ht=((hasHorizontal)?hscroll.get("scrollbarThickness"):0);
var vt=(hasVertical)?vscroll.get("scrollbarThickness"):0;if(hasHorizontal){hl=this.get("horizontalScrollerLayout");
layout={left:(hl?hl.left:0),bottom:(hl?hl.bottom:0),right:(hl?hl.right+vt-1:vt-1),height:ht};
hscroll.set("layout",layout);ho=this.get("horizontalOverlay");clipLayout.bottom=ho?0:(layout.bottom+ht)
}else{clipLayout.bottom=0}if(hscroll){hscroll.set("isVisible",hasHorizontal)}if(hasVertical){ht=ht+this.get("verticalScrollerBottom");
vl=this.get("verticalScrollerLayout");layout={top:(vl?vl.top:0),bottom:(vl?vl.bottom+ht:ht),right:(vl?vl.right:0),width:vt};
vscroll.set("layout",layout);vo=this.get("verticalOverlay");clipLayout.right=vo?0:(layout.right+vt)
}else{clipLayout.right=0}if(vscroll){vscroll.set("isVisible",hasVertical)}clip.adjust(clipLayout)
},scrollerVisibilityDidChange:function(){this.tile()}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible"),_scroll_wheelDeltaX:0,_scroll_wheelDeltaY:0,mouseWheel:function(evt){var deltaAdjust=(SC.browser.webkit&&SC.browser.version>533)?120:1;
this._scroll_wheelDeltaX+=evt.wheelDeltaX/deltaAdjust;this._scroll_wheelDeltaY+=evt.wheelDeltaY/deltaAdjust;
this.invokeLater(this._scroll_mouseWheel,10);return this.get("canScrollHorizontal")||this.get("canScrollVertical")
},_scroll_mouseWheel:function(){this.scrollBy(this._scroll_wheelDeltaX,this._scroll_wheelDeltaY);
if(SC.WHEEL_MOMENTUM&&this._scroll_wheelDeltaY>0){this._scroll_wheelDeltaY=Math.floor(this._scroll_wheelDeltaY*0.95);
this._scroll_wheelDeltaY=Math.max(this._scroll_wheelDeltaY,0);this.invokeLater(this._scroll_mouseWheel,10)
}else{if(SC.WHEEL_MOMENTUM&&this._scroll_wheelDeltaY<0){this._scroll_wheelDeltaY=Math.ceil(this._scroll_wheelDeltaY*0.95);
this._scroll_wheelDeltaY=Math.min(this._scroll_wheelDeltaY,0);this.invokeLater(this._scroll_mouseWheel,10)
}else{this._scroll_wheelDeltaY=0;this._scroll_wheelDeltaX=0}}},canScale:NO,_scale:1,scale:function(key,value){if(value!==undefined){this._scale=Math.min(Math.max(this.get("minimumScale"),value),this.get("maximumScale"))
}return this._scale}.property().cacheable(),minimumScale:0.25,maximumScale:2,autoScaleRange:NO,_scale_css:"",updateScale:function(scale){var contentView=this.get("contentView");
if(!contentView){return}if(contentView.isScalable){this.get("contentView").applyScale(scale);
this._scale_css=""}else{this._scale_css="scale3d("+scale+", "+scale+", 1)"}},acceptsMultitouch:YES,decelerationRate:SC.NORMAL_SCROLL_DECELERATION,alwaysBounceHorizontal:NO,alwaysBounceVertical:YES,delaysContentTouches:YES,_touchScrollDidChange:function(){if(this.get("contentView").touchScrollDidChange){this.get("contentView").touchScrollDidChange(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidChange){this.verticalScrollerView.touchScrollDidChange(this._scroll_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidChange){this.horizontalScrollerView.touchScrollDidChange(this._scroll_horizontalScrollOffset)
}},_touchScrollDidStart:function(){if(this.get("contentView").touchScrollDidStart){this.get("contentView").touchScrollDidStart(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidStart){this.verticalScrollerView.touchScrollDidStart(this._touch_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidStart){this.horizontalScrollerView.touchScrollDidStart(this._touch_horizontalScrollOffset)
}},_touchScrollDidEnd:function(){if(this.get("contentView").touchScrollDidEnd){this.get("contentView").touchScrollDidEnd(this._scroll_horizontalScrollOffset,this._scroll_verticalScrollOffset)
}if(this.verticalScrollerView&&this.verticalScrollerView.touchScrollDidEnd){this.verticalScrollerView.touchScrollDidEnd(this._touch_verticalScrollOffset)
}if(this.horizontalScrollerView&&this.horizontalScrollerView.touchScrollDidEnd){this.horizontalScrollerView.touchScrollDidEnd(this._touch_horizontalScrollOffset)
}},_applyCSSTransforms:function(layer){var transform="";this.updateScale(this._scale);
transform+="translate3d("+-this._scroll_horizontalScrollOffset+"px, "+-Math.round(this._scroll_verticalScrollOffset)+"px,0) ";
transform+=this._scale_css;if(layer){layer.style.webkitTransform=transform;layer.style.webkitTransformOrigin="top left"
}},captureTouch:function(touch){return YES},touchGeneration:0,touchStart:function(touch){var generation=++this.touchGeneration;
if(!this.tracking&&this.get("delaysContentTouches")){this.invokeLater(this.beginTouchesInContent,150,generation)
}else{if(!this.tracking){this.invokeLater(this.beginTouchesInContent,1,generation)
}}this.beginTouchTracking(touch,YES);return YES},beginTouchesInContent:function(gen){if(gen!==this.touchGeneration){return
}var touch=this.touch,itemView;if(touch&&this.tracking&&!this.dragging&&!touch.touch.scrollHasEnded){touch.touch.captureTouch(this,YES);
if(!touch.touch.touchResponder){touch.touch.makeTouchResponder(this)}else{if(touch.needsScrollEnd){this._touchScrollDidEnd()
}}}},beginTouchTracking:function(touch,starting){var avg=touch.averagedTouchesForView(this,starting);
var verticalScrollOffset=this._scroll_verticalScrollOffset||0,horizontalScrollOffset=this._scroll_horizontalScrollOffset||0,startClipOffsetX=horizontalScrollOffset,startClipOffsetY=verticalScrollOffset,needsScrollEnd=NO;
if(this.touch&&this.touch.timeout){clearTimeout(this.touch.timeout);this.touch.timeout=null;
startClipOffsetX=this.touch.startClipOffset.x;startClipOffsetY=this.touch.startClipOffset.y;
needsScrollEnd=YES}var view=this.get("contentView");var contentWidth=view?view.get("frame").width:0,contentHeight=view?view.get("frame").height:0;
if(view.calculatedWidth&&view.calculatedWidth!==0){contentWidth=view.calculatedWidth
}if(view.calculatedHeight&&view.calculatedHeight!==0){contentHeight=view.calculatedHeight
}var containerWidth=this.get("containerView").get("frame").width,containerHeight=this.get("containerView").get("frame").height;
var globalFrame=this.convertFrameToView(this.get("frame"),null),positionInContentX=(horizontalScrollOffset+(avg.x-globalFrame.x))/this._scale,positionInContentY=(verticalScrollOffset+(avg.y-globalFrame.y))/this._scale;
this.touch={startTime:touch.timeStamp,notCalculated:YES,enableScrolling:{x:contentWidth*this._scale>containerWidth||this.get("alwaysBounceHorizontal"),y:contentHeight*this._scale>containerHeight||this.get("alwaysBounceVertical")},scrolling:{x:NO,y:NO},enableBouncing:SC.platform.bounceOnScroll,startClipOffset:{x:startClipOffsetX,y:startClipOffsetY},lastScrollOffset:{x:horizontalScrollOffset,y:verticalScrollOffset},startTouchOffset:{x:avg.x,y:avg.y},scrollVelocity:{x:0,y:0},startTouchOffsetInContent:{x:positionInContentX,y:positionInContentY},containerSize:{width:containerWidth,height:containerHeight},contentSize:{width:contentWidth,height:contentHeight},startScale:this._scale,startDistance:avg.d,canScale:this.get("canScale")&&SC.platform.pinchToZoom,minimumScale:this.get("minimumScale"),maximumScale:this.get("maximumScale"),globalFrame:globalFrame,layer:this.get("contentView").get("layer"),resistanceCoefficient:0.998,resistanceAsymptote:320,decelerationFromEdge:0.05,accelerationToEdge:0.1,scrollTolerance:{x:15,y:15},scaleTolerance:5,secondaryScrollTolerance:30,scrollLock:500,decelerationRate:this.get("decelerationRate"),lastEventTime:touch.timeStamp,touch:(starting?touch:(this.touch?this.touch.touch:null)),needsScrollEnd:needsScrollEnd};
if(!this.tracking){this.tracking=YES;this.dragging=NO}},_adjustForEdgeResistance:function(offset,minOffset,maxOffset,resistanceCoefficient,asymptote){var distanceFromEdge;
if(offset<minOffset){distanceFromEdge=offset-minOffset}else{if(offset>maxOffset){distanceFromEdge=maxOffset-offset
}else{return offset}}distanceFromEdge=Math.pow(resistanceCoefficient,Math.abs(distanceFromEdge))*asymptote;
if(offset<minOffset){distanceFromEdge=distanceFromEdge-asymptote}else{distanceFromEdge=-distanceFromEdge+asymptote
}return Math.min(Math.max(minOffset,offset),maxOffset)+distanceFromEdge},touchesDragged:function(evt,touches){var avg=evt.averagedTouchesForView(this);
this.updateTouchScroll(avg.x,avg.y,avg.d,evt.timeStamp)},updateTouchScroll:function(touchX,touchY,distance,timeStamp){var touch=this.touch,touchXInFrame=touchX-touch.globalFrame.x,touchYInFrame=touchY-touch.globalFrame.y,offsetY,maxOffsetY,offsetX,maxOffsetX,minOffsetX,minOffsetY;
var positionInContentX=((this._scroll_horizontalScrollOffset||0)+touchXInFrame)/this._scale,positionInContentY=((this._scroll_verticalScrollOffset||0)+touchYInFrame)/this._scale;
var deltaX=positionInContentX-touch.startTouchOffset.x,deltaY=positionInContentY-touch.startTouchOffset.y;
var isDragging=touch.dragging;if(!touch.scrolling.x&&Math.abs(deltaX)>touch.scrollTolerance.x&&touch.enableScrolling.x){isDragging=YES;
touch.scrolling.x=YES;touch.scrollTolerance.y=touch.secondaryScrollTolerance;touch.startTouchOffset.x=touchX;
deltaX=0}if(!touch.scrolling.y&&Math.abs(deltaY)>touch.scrollTolerance.y&&touch.enableScrolling.y){isDragging=YES;
touch.scrolling.y=YES;touch.scrollTolerance.x=touch.secondaryScrollTolerance;touch.startTouchOffset.y=touchY;
deltaY=0}if(isDragging&&!touch.dragging){touch.dragging=YES;this.dragging=YES;this._touchScrollDidStart()
}if(!touch.scrolling.x&&!touch.scrolling.y&&!touch.canScale){return}if(touch.scrolling.x&&!touch.scrolling.y){if(deltaX>touch.scrollLock&&!touch.scrolling.y){touch.enableScrolling.y=NO
}}if(touch.scrolling.y&&!touch.scrolling.x){if(deltaY>touch.scrollLock&&!touch.scrolling.x){touch.enableScrolling.x=NO
}}if(touch.canScale){var startDistance=touch.startDistance,dd=distance-startDistance;
if(Math.abs(dd)>touch.scaleTolerance){touch.scrolling.y=YES;touch.scrolling.x=YES;
var scale=touch.startScale*(distance/Math.max(startDistance,50));var newScale=this._adjustForEdgeResistance(scale,touch.minimumScale,touch.maximumScale,touch.resistanceCoefficient,touch.resistanceAsymptote);
this.dragging=YES;this._scale=newScale;var newPositionInContentX=positionInContentX*this._scale,newPositionInContentY=positionInContentY*this._scale
}}minOffsetX=this.minimumScrollOffset(touch.contentSize.width*this._scale,touch.containerSize.width,this.get("horizontalAlign"));
minOffsetY=this.minimumScrollOffset(touch.contentSize.height*this._scale,touch.containerSize.height,this.get("verticalAlign"));
maxOffsetX=this.maximumScrollOffset(touch.contentSize.width*this._scale,touch.containerSize.width,this.get("horizontalAlign"));
maxOffsetY=this.maximumScrollOffset(touch.contentSize.height*this._scale,touch.containerSize.height,this.get("verticalAlign"));
offsetX=touch.startTouchOffsetInContent.x*this._scale-touchXInFrame;offsetY=touch.startTouchOffsetInContent.y*this._scale-touchYInFrame;
if(touch.enableBouncing){offsetX=this._adjustForEdgeResistance(offsetX,minOffsetX,maxOffsetX,touch.resistanceCoefficient,touch.resistanceAsymptote);
offsetY=this._adjustForEdgeResistance(offsetY,minOffsetY,maxOffsetY,touch.resistanceCoefficient,touch.resistanceAsymptote)
}else{offsetX=Math.max(minOffsetX,Math.min(maxOffsetX,offsetX));offsetY=Math.max(minOffsetY,Math.min(maxOffsetY,offsetY))
}if(touch.scrolling.x){this._scroll_horizontalScrollOffset=offsetX}if(touch.scrolling.y){this._scroll_verticalScrollOffset=offsetY
}this._applyCSSTransforms(touch.layer);this._touchScrollDidChange();if(timeStamp-touch.lastEventTime>=1||touch.notCalculated){touch.notCalculated=NO;
var horizontalOffset=this._scroll_horizontalScrollOffset;var verticalOffset=this._scroll_verticalScrollOffset;
touch.scrollVelocity.x=((horizontalOffset-touch.lastScrollOffset.x)/Math.max(1,timeStamp-touch.lastEventTime));
touch.scrollVelocity.y=((verticalOffset-touch.lastScrollOffset.y)/Math.max(1,timeStamp-touch.lastEventTime));
touch.lastScrollOffset.x=horizontalOffset;touch.lastScrollOffset.y=verticalOffset;
touch.lastEventTime=timeStamp}},touchEnd:function(touch){var touchStatus=this.touch,avg=touch.averagedTouchesForView(this);
touch.scrollHasEnded=YES;if(avg.touchCount>0){this.beginTouchTracking(touch,NO)}else{if(this.dragging){touchStatus.dragging=NO;
touchStatus.lastEventTime=touch.timeStamp;this.startDecelerationAnimation()}else{if(touchStatus.needsScrollEnd){this._touchScrollDidEnd()
}touch.captureTouch(this,YES);if(touch.touchResponder&&touch.touchResponder!==this){touch.end()
}else{if(!touch.touchResponder||touch.touchResponder===this){if(touch.nextTouchResponder){touch.makeTouchResponder(touch.nextTouchResponder)
}}else{}}this.touch=null}this.tracking=NO;this.dragging=NO}},touchCancelled:function(touch){var touchStatus=this.touch,avg=touch.averagedTouchesForView(this);
if(!this.touch||!this.touch.timeout){this.beginPropertyChanges();this.set("scale",this._scale);
this.set("verticalScrollOffset",this._scroll_verticalScrollOffset);this.set("horizontalScrollOffset",this._scroll_horizontalScrollOffset);
this.endPropertyChanges();this.tracking=NO;if(this.dragging){this._touchScrollDidEnd()
}this.dragging=NO;this.touch=null}},startDecelerationAnimation:function(evt){var touch=this.touch;
touch.decelerationVelocity={x:touch.scrollVelocity.x*10,y:touch.scrollVelocity.y*10};
this.decelerateAnimation()},bouncyBounce:function(velocity,value,minValue,maxValue,de,ac,additionalAcceleration){if(value<minValue){if(velocity<0){velocity=velocity+((minValue-value)*de)
}else{velocity=Math.min((minValue-value)*ac+additionalAcceleration,minValue-value-0.01)
}}else{if(value>maxValue){if(velocity>0){velocity=velocity-((value-maxValue)*de)}else{velocity=-Math.min((value-maxValue)*ac+additionalAcceleration,value-maxValue-0.01)
}}}return velocity},decelerateAnimation:function(){var touch=this.touch,scale=this._scale,minOffsetX=this.minimumScrollOffset(touch.contentSize.width*this._scale,touch.containerSize.width,this.get("horizontalAlign")),minOffsetY=this.minimumScrollOffset(touch.contentSize.height*this._scale,touch.containerSize.height,this.get("verticalAlign")),maxOffsetX=this.maximumScrollOffset(touch.contentSize.width*this._scale,touch.containerSize.width,this.get("horizontalAlign")),maxOffsetY=this.maximumScrollOffset(touch.contentSize.height*this._scale,touch.containerSize.height,this.get("verticalAlign")),now=Date.now(),t=Math.max(now-touch.lastEventTime,1),newX=this._scroll_horizontalScrollOffset+touch.decelerationVelocity.x*(t/10),newY=this._scroll_verticalScrollOffset+touch.decelerationVelocity.y*(t/10);
var de=touch.decelerationFromEdge,ac=touch.accelerationToEdge;var forceValidXPosition=!touch.enableBouncing,forceValidYPosition=!touch.enableBouncing;
if(newX>=minOffsetX&&newX<=maxOffsetX){forceValidXPosition=YES}if(newY>=minOffsetY&&newY<=maxOffsetY){forceValidYPosition=YES
}newX/=this._scale;newY/=this._scale;var sv=0;sv=this.bouncyBounce(sv,scale,touch.minimumScale,touch.maximumScale,de,ac,0);
this._scale=scale=scale+sv;newX*=this._scale;newY*=this._scale;minOffsetX=this.minimumScrollOffset(touch.contentSize.width*this._scale,touch.containerSize.width,this.get("horizontalAlign"));
minOffsetY=this.minimumScrollOffset(touch.contentSize.height*this._scale,touch.containerSize.height,this.get("verticalAlign"));
maxOffsetX=this.maximumScrollOffset(touch.contentSize.width*this._scale,touch.containerSize.width,this.get("horizontalAlign"));
maxOffsetY=this.maximumScrollOffset(touch.contentSize.height*this._scale,touch.containerSize.height,this.get("verticalAlign"));
if(forceValidXPosition&&(newX<minOffsetX||newX>maxOffsetX)){newX=Math.max(minOffsetX,Math.min(newX,maxOffsetX));
touch.decelerationVelocity.x=0}if(forceValidYPosition&&(newY<minOffsetY||newY>maxOffsetY)){newY=Math.max(minOffsetY,Math.min(newY,maxOffsetY));
touch.decelerationVelocity.y=0}this._scroll_horizontalScrollOffset=newX;this._scroll_verticalScrollOffset=newY;
this._applyCSSTransforms(touch.layer);this._touchScrollDidChange();var decay=touch.decelerationRate;
touch.decelerationVelocity.y*=Math.pow(decay,(t/10));touch.decelerationVelocity.x*=Math.pow(decay,(t/10));
touch.decelerationVelocity.x=this.bouncyBounce(touch.decelerationVelocity.x,newX,minOffsetX,maxOffsetX,de,ac,0.3);
touch.decelerationVelocity.y=this.bouncyBounce(touch.decelerationVelocity.y,newY,minOffsetY,maxOffsetY,de,ac,0.3);
var absXVelocity=Math.abs(touch.decelerationVelocity.x);var absYVelocity=Math.abs(touch.decelerationVelocity.y);
if(absYVelocity<0.05&&absXVelocity<0.05&&Math.abs(sv)<0.05){touch.timeout=null;this.touch=null;
this._touchScrollDidEnd();this.beginPropertyChanges();this.set("scale",this._scale);
this.set("verticalScrollOffset",this._scroll_verticalScrollOffset);this.set("horizontalScrollOffset",this._scroll_horizontalScrollOffset);
this.endPropertyChanges();return}var self=this;touch.lastEventTime=Date.now();this.touch.timeout=setTimeout(function(){SC.run(self.decelerateAnimation(),self)
},10)},createChildViews:function(){var childViews=[],view;if(SC.none(view=this.containerView)){view=SC.ContainerView
}childViews.push(this.containerView=this.createChildView(view,{contentView:this.contentView,isScrollContainer:YES}));
this.contentView=this.containerView.get("contentView");view=SC.platform.touch?this.get("horizontalTouchScrollerView"):this.get("horizontalScrollerView");
if(view){if(this.get("hasHorizontalScroller")){view=this.horizontalScrollerView=this.createChildView(view,{layoutDirection:SC.LAYOUT_HORIZONTAL,valueBinding:"*owner.horizontalScrollOffset"});
childViews.push(view)}else{this.horizontalScrollerView=null}}view=SC.platform.touch?this.get("verticalTouchScrollerView"):this.get("verticalScrollerView");
if(view){if(this.get("hasVerticalScroller")){view=this.verticalScrollerView=this.createChildView(view,{layoutDirection:SC.LAYOUT_VERTICAL,valueBinding:"*owner.verticalScrollOffset"});
childViews.push(view)}else{this.verticalScrollerView=null}}this.childViews=childViews;
this.contentViewDidChange();this.tile()},init:function(){arguments.callee.base.apply(this,arguments);
this._scroll_contentView=this.get("contentView");var contentView=this._scroll_contentView;
if(contentView){contentView.addObserver("frame",this,this.contentViewFrameDidChange);
contentView.addObserver("calculatedWidth",this,this.contentViewFrameDidChange);contentView.addObserver("calculatedHeight",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewDidChange:function(){var newView=this.get("contentView"),oldView=this._scroll_contentView,frameObserver=this.contentViewFrameDidChange,layerObserver=this.contentViewLayerDidChange;
if(newView!==oldView){if(oldView){oldView.removeObserver("calculatedWidth",this,this.contentViewFrameDidChange);
oldView.removeObserver("calculatedHeight",this,this.contentViewFrameDidChange);oldView.removeObserver("frame",this,frameObserver);
oldView.removeObserver("layer",this,layerObserver)}this._scroll_contentView=newView;
if(newView){newView.addObserver("frame",this,frameObserver);newView.addObserver("calculatedWidth",this,this.contentViewFrameDidChange);
newView.addObserver("calculatedHeight",this,this.contentViewFrameDidChange);newView.addObserver("layer",this,layerObserver)
}this.containerView.set("contentView",newView);this.contentViewFrameDidChange()}}.observes("contentView"),render:function(context,firstTime){this.invokeLast(this.adjustElementScroll);
if(firstTime){context.push('<div class="corner"></div>')}return arguments.callee.base.apply(this,arguments)
},oldMaxHOffset:0,oldMaxVOffset:0,contentViewFrameDidChange:function(force){var view=this.get("contentView"),f=(view)?view.get("frame"):null,scale=this._scale,width=0,height=0,dim,dimWidth,dimHeight;
if(view){width=view.get("calculatedWidth")||f.width||0;height=view.get("calculatedHeight")||f.height||0
}width*=scale;height*=scale;if(!force&&(width===this._scroll_contentWidth)&&(height===this._scroll_contentHeight)){return
}this._scroll_contentWidth=width;this._scroll_contentHeight=height;dim=this.getPath("containerView.frame");
dimWidth=dim.width;dimHeight=dim.height;if(this.get("hasHorizontalScroller")&&(view=this.get("horizontalScrollerView"))){if(this.get("autohidesHorizontalScroller")){this.set("isHorizontalScrollerVisible",width>dimWidth)
}view.setIfChanged("maximum",width-dimWidth);view.setIfChanged("proportion",dimWidth/width)
}if(this.get("hasVerticalScroller")&&(view=this.get("verticalScrollerView"))){if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",height>dimHeight)
}view.setIfChanged("maximum",height-dimHeight);view.setIfChanged("proportion",dimHeight/height)
}if(!this.get("isVerticalScrollerVisible")&&(this.get("verticalScrollOffset")!==0)&&this.get("autohidesVerticalScroller")){this.set("verticalScrollOffset",0)
}if(!this.get("isHorizontalScrollerVisible")&&(this.get("horizontalScrollOffset")!==0)&&this.get("autohidesHorizontalScroller")){this.set("horizontalScrollOffset",0)
}var mxVOffSet=this.get("maximumVerticalScrollOffset"),vOffSet=this.get("verticalScrollOffset"),mxHOffSet=this.get("maximumHorizontalScrollOffset"),hOffSet=this.get("horizontalScrollOffset"),forceHeight=mxVOffSet<vOffSet,forceWidth=mxHOffSet<hOffSet;
if(forceHeight||forceWidth){this.forceDimensionsRecalculation(forceWidth,forceHeight,vOffSet,hOffSet)
}},frameDidChange:function(){this.contentViewFrameDidChange(YES)}.observes("frame"),contentViewLayerDidChange:function(){if(this._verticalScrollOffset!==0){this._verticalScrollOffset=-1
}if(this._horizontalScrollOffset!==0){this._horizontalScrollOffset=-1}this.invokeLast(this.adjustElementScroll)
},_scroll_horizontalScrollOffsetDidChange:function(){this.invokeLast(this.adjustElementScroll)
}.observes("horizontalScrollOffset"),_scroll_verticalScrollOffsetDidChange:function(){this.invokeLast(this.adjustElementScroll)
}.observes("verticalScrollOffset"),adjustElementScroll:function(){var container=this.get("containerView"),content=this.get("contentView"),verticalScrollOffset=this.get("verticalScrollOffset"),horizontalScrollOffset=this.get("horizontalScrollOffset");
if(content){content._viewFrameDidChange();if(SC.platform.touch){this._applyCSSTransforms(content.get("layer"))
}}if(container&&!SC.platform.touch){container=container.$()[0];if(container){if(verticalScrollOffset!==this._verticalScrollOffset){container.scrollTop=verticalScrollOffset;
this._verticalScrollOffset=verticalScrollOffset}if(horizontalScrollOffset!==this._horizontalScrollOffset){container.scrollLeft=horizontalScrollOffset;
this._horizontalScrollOffset=horizontalScrollOffset}}}},forceDimensionsRecalculation:function(forceWidth,forceHeight,vOffSet,hOffSet){var oldScrollHOffset=hOffSet;
var oldScrollVOffset=vOffSet;this.scrollTo(0,0);if(forceWidth&&forceHeight){this.scrollTo(this.get("maximumHorizontalScrollOffset"),this.get("maximumVerticalScrollOffset"))
}if(forceWidth&&!forceHeight){this.scrollTo(this.get("maximumHorizontalScrollOffset"),oldScrollVOffset)
}if(!forceWidth&&forceHeight){this.scrollTo(oldScrollHOffset,this.get("maximumVerticalScrollOffset"))
}},_scroll_verticalScrollOffset:0,_scroll_horizontalScrollOffset:0});sc_require("views/scroll");
SC.MenuScrollerView=SC.ScrollerView.extend({classNames:["sc-menu-scroller-view"],scrollDown:NO,value:function(key,val){if(val!==undefined){this._value=val
}else{var value=this._value||0;return Math.min(value,this.get("maximum"))}}.property("maximum").cacheable(),maximum:0,isEnabled:YES,layoutDirection:SC.LAYOUT_VERTICAL,verticalLineScroll:20,ownerScrollValueKey:function(){return"verticalScrollOffset"
}.property("layoutDirection").cacheable(),init:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.TINY_SCROLLER_THICKNESS);
break;case SC.SMALL_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.SMALL_SCROLLER_THICKNESS);
break;case SC.REGULAR_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.REGULAR_SCROLLER_THICKNESS);
break;case SC.LARGE_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.LARGE_SCROLLER_THICKNESS);
break;case SC.HUGE_CONTROL_SIZE:this.set("scrollerThickness",SC.MenuScrollerView.HUGE_SCROLLER_THICKNESS);
break}return arguments.callee.base.apply(this,arguments)},render:function(context,firstTime){context.addClass("sc-vertical");
context.addClass(this.get("controlSize"));if(firstTime){var direction=this.get("scrollDown")?"arrowDown":"arrowUp";
context.push('<span class="scrollArrow '+direction+'">&nbsp;</span>')}context.setClass("disabled",!this.get("isEnabled"))
},didCreateLayer:function(){},willDestroyLayer:function(){var callback=this._sc_scroller_scrollDidChange;
SC.Event.remove(this.$(),"scroll",this,callback)},mouseEntered:function(evt){this.set("isMouseOver",YES);
this._invokeScrollOnMouseOver()},mouseExited:function(evt){this.set("isMouseOver",NO)
},_sc_scroller_valueDidChange:function(){}.observes("value"),_sc_scroller_armScrollTimer:function(){if(!this._sc_scrollTimer){SC.RunLoop.begin();
var method=this._sc_scroller_scrollDidChange;this._sc_scrollTimer=this.invokeLater(method,50);
SC.RunLoop.end()}},_sc_scroller_scrollDidChange:function(){var now=Date.now(),last=this._sc_lastScroll,layer=this.get("layer"),scroll=0;
if(last&&(now-last)<50){return this._sc_scroller_armScrollTimer()}this._sc_scrollTimer=null;
this._sc_lastScroll=now;SC.RunLoop.begin();if(!this.get("isEnabled")){return}this._sc_scrollValue=scroll=layer.scrollTop;
this.set("value",scroll);SC.RunLoop.end()},_scrollMenu:function(){var val=this.get("value"),newval;
if(this.get("scrollDown")){newval=val+this.verticalLineScroll;if(newval<=this.get("maximum")){this.set("value",newval)
}}else{newval=val-this.verticalLineScroll;if(newval>=0){this.set("value",newval)}else{if(val<=this.verticalLineScroll&&val>0){this.set("value",0)
}}}return YES},_invokeScrollOnMouseOver:function(){this._scrollMenu();if(this.get("isMouseOver")){this.invokeLater(this._invokeScrollOnMouseOver,100)
}}});SC.MenuScrollerView.REGULAR_SCROLLER_THICKNESS=18;SC.MenuScrollerView.TINY_SCROLLER_THICKNESS=10;
SC.MenuScrollerView.SMALL_SCROLLER_THICKNESS=14;SC.MenuScrollerView.LARGE_SCROLLER_THICKNESS=23;
SC.MenuScrollerView.HUGE_SCROLLER_THICKNESS=26;SC.MenuScrollView=SC.ScrollView.extend({classNames:["sc-menu-scroll-view"],maximumHorizontalScrollOffset:0,hasHorizontalScroller:NO,horizontalScrollerView:SC.MenuScrollerView,isHorizontalScrollerVisible:NO,canScrollHorizontal:NO,autohidesHorizontalScroller:NO,hasVerticalScroller:YES,verticalScrollerView:SC.MenuScrollerView,verticalScrollerView2:SC.MenuScrollerView,isVerticalScrollerVisible:YES,canScrollVertical:YES,autohidesVerticalScroller:YES,verticalScrollerBottom:0,controlSize:SC.REGULAR_CONTROL_SIZE,containerView:SC.ContainerView,scrollToVisible:function(view){if(arguments.length===0){return arguments.callee.base.apply(this,arguments)
}var contentView=this.get("contentView");if(!contentView){return NO}var vf=view.get("frame");
if(!vf){return NO}vf=contentView.convertFrameFromView(vf,view.get("parentView"));
var vscroll2=this.get("verticalScrollerView2");if(vscroll2&&vscroll2.get("isVisible")){vf.height+=vscroll2.get("frame").height
}var vscroll=this.get("verticalScrollerView");if(vscroll&&vscroll.get("isVisible")){vf.top-=vscroll.get("frame").height
}return this.scrollToRect(vf)},tile:function(){var hasScroller,vscroll,vscroll2,hasVertical,clip,clipLayout,viewportHeight;
hasScroller=this.get("hasVerticalScroller");vscroll=hasScroller?this.get("verticalScrollerView"):null;
vscroll2=hasScroller?this.get("verticalScrollerView2"):null;hasVertical=vscroll&&this.get("isVerticalScrollerVisible");
clip=this.get("containerView");clipLayout={left:0,top:0};if(hasVertical){viewportHeight=0;
var scrollerThickness=vscroll.get("scrollerThickness")||vscroll2.get("scrollerThickness");
var view=this.get("contentView"),view2,f=(view)?view.get("frame"):null,height=(f)?f.height:0,elem=this.containerView.$()[0],verticalOffset=this.get("verticalScrollOffset"),topArrowInvisible={height:0,top:0,right:0,left:0},topArrowVisible={height:scrollerThickness,top:0,right:0,left:0},bottomArrowVisible={height:scrollerThickness,bottom:0,right:0,left:0},bottomArrowInvisible={height:0,bottom:0,right:0,left:0};
if(elem){viewportHeight=elem.offsetHeight}if(verticalOffset===0){clipLayout.top=0;
clipLayout.bottom=scrollerThickness;vscroll.set("layout",topArrowInvisible);vscroll2.set("layout",bottomArrowVisible)
}else{if(verticalOffset>=(height-viewportHeight-scrollerThickness)){clipLayout.top=scrollerThickness;
clipLayout.bottom=0;vscroll.set("layout",topArrowVisible);vscroll2.set("layout",bottomArrowInvisible)
}else{clipLayout.top=scrollerThickness;clipLayout.bottom=scrollerThickness;vscroll.set("layout",topArrowVisible);
vscroll2.set("layout",bottomArrowVisible)}}}if(vscroll){vscroll.set("isVisible",hasVertical);
vscroll2.set("isVisible",hasVertical)}clip.set("layout",clipLayout)},scrollerVisibilityDidChange:function(){this.tile()
}.observes("isVerticalScrollerVisible","isHorizontalScrollerVisible","verticalScrollOffset"),createChildViews:function(){var childViews=[],view,view2,controlSize=this.get("controlSize");
if(SC.none(view=this.containerView)){view=SC.ContainerView}childViews.push(this.containerView=this.createChildView(view,{contentView:this.contentView}));
this.contentView=this.containerView.get("contentView");if((view=this.verticalScrollerView)&&(view2=this.verticalScrollerView2)){if(this.get("hasVerticalScroller")){view=this.verticalScrollerView=this.createChildView(view,{layout:{top:0,left:0,right:0},controlSize:controlSize,valueBinding:"*owner.verticalScrollOffset"});
childViews.push(view);view2=this.verticalScrollerView2=this.createChildView(view2,{scrollDown:YES,layout:{bottom:0,left:0,right:0},controlSize:controlSize,valueBinding:"*owner.verticalScrollOffset"});
childViews.push(view2)}else{this.verticalScrollerView=null;this.verticalScrollerView2=null
}}this.childViews=childViews;this.contentViewFrameDidChange();this.tile()},init:function(){arguments.callee.base.apply(this,arguments);
this._scroll_contentView=this.get("contentView");var contentView=this._scroll_contentView;
if(contentView){contentView.addObserver("frame",this,this.contentViewFrameDidChange)
}if(this.get("isVisibleInWindow")){this._scsv_registerAutoscroll()}},_scsv_registerAutoscroll:function(){if(this.get("isVisibleInWindow")){SC.Drag.addScrollableView(this)
}else{SC.Drag.removeScrollableView(this)}}.observes("isVisibleInWindow"),contentViewFrameDidChange:function(){var view=this.get("contentView"),view2,f=(view)?view.get("frame"):null,width=(f)?f.width:0,height=(f)?f.height:0,dim=this.get("frame"),viewportHeight,elem;
this._scroll_contentWidth=width;this._scroll_contentHeight=height;if(this.get("hasVerticalScroller")&&(view=this.get("verticalScrollerView"))&&(view2=this.get("verticalScrollerView2"))){height-=1;
if(this.get("autohidesVerticalScroller")){this.set("isVerticalScrollerVisible",height>dim.height)
}height-=this.get("verticalScrollerBottom");viewportHeight=0;elem=this.containerView.$()[0];
if(elem){viewportHeight=elem.offsetHeight}height=height-viewportHeight;view.setIfChanged("maximum",height);
view2.setIfChanged("maximum",height)}},_scroll_horizontalScrollOffsetDidChange:function(){},_scroll_verticalScrollOffsetDidChange:function(){var offset=this.get("verticalScrollOffset");
var contentView=this.get("contentView");if(contentView){contentView.adjust("top",0-offset)
}}.observes("verticalScrollOffset")});SC.TO_LEFT="TOLEFT";SC.TO_RIGHT="TORIGHT";sc_require("views/workspace");
SC.NavigationView=SC.WorkspaceView.extend({_views:null,_current:null,navigationContentView:SC.View.extend(),init:function(){arguments.callee.base.apply(this,arguments);
this._views=[]},createChildViews:function(){arguments.callee.base.apply(this,arguments);
var content=this.get("navigationContentView");if(content.isClass){content=this.createChildView(content)
}this._defaultContent=this.navigationContentView=content;this.contentView.appendChild(content)
},changeNavigationContent:function(view){var top=null,bottom=null;if(view){top=view.get("topToolbar");
bottom=view.get("bottomToolbar")}if(top&&top.isClass){view.set("topToolbar",top=top.create())
}if(bottom&&bottom.isClass){view.set("bottomToolbar",bottom=bottom.create())}this.beginPropertyChanges();
this._current=view;this.set("navigationContentView",view?view:this._defaultContent);
this.set("topToolbar",top);this.set("bottomToolbar",bottom);this.endPropertyChanges()
},push:function(view){this._currentDirection=this._current?SC.TO_LEFT:null;if(this._current){this._views.push(this._current)
}this.changeNavigationContent(view)},pop:function(){this._currentDirection=SC.TO_RIGHT;
var view=this._views.pop();this.changeNavigationContent(view)},popToView:function(toView){this._currentDirection=SC.TO_RIGHT;
var views=this._views,idx=views.length-1,view=views[idx];while(view&&view!==toView){this._views.pop();
idx--;view=views[idx]}this.changeNavigationContent(view)},topToolbarDidChange:function(){var active=this.activeTopToolbar,replacement=this.get("topToolbar");
if(active){if(this._currentDirection!==null){active.set("buildDirection",this._currentDirection);
this.buildOutChild(active)}else{this.removeChild(active)}}if(replacement){if(this._currentDirection!==null){replacement.set("buildDirection",this._currentDirection);
this.buildInChild(replacement)}else{this.appendChild(replacement)}}this.activeTopToolbar=replacement;
this.invokeOnce("childDidChange")}.observes("topToolbar"),bottomToolbarDidChange:function(){var active=this.activeBottomToolbar,replacement=this.get("bottomToolbar");
if(active){if(this._currentDirection!==null){active.set("buildDirection",this._currentDirection);
this.buildOutChild(active)}else{this.removeChild(active)}}if(replacement){if(this._currentDirection!==null){replacement.set("buildDirection",this._currentDirection);
this.buildInChild(replacement)}else{this.appendChild(replacement)}}this.activeBottomToolbar=replacement;
this.invokeOnce("childDidChange")}.observes("topToolbar"),contentViewDidChange:function(){var active=this.activeNavigationContentView,replacement=this.get("navigationContentView");
if(!replacement.isNavigationBuilder){replacement.mixin(SC.NavigationBuilder)}this._pendingBuildOut=active;
this._pendingBuildIn=replacement;this.activeNavigationContentView=replacement;this.invokeOnce("childDidChange")
}.observes("navigationContentView"),childDidChange:function(){var replacement=this._pendingBuildIn,active=this._pendingBuildOut;
if(active){if(this._currentDirection!==null){active.set("buildDirection",this._currentDirection);
this.contentView.buildOutChild(active)}else{this.contentView.removeChild(active)}}this._scws_tile();
if(replacement){if(this._currentDirection!==null){replacement.set("buildDirection",this._currentDirection);
this.contentView.buildInChild(replacement)}else{this.contentView.appendChild(replacement)
}}}});sc_require("views/toolbar");SC.NavigationBarView=SC.ToolbarView.extend(SC.Gesturable,{gestures:["swipeGesture"],swipeGesture:SC.SwipeGesture,init:function(){arguments.callee.base.apply(this,arguments);
if(!SC.Animatable){SC.Logger.error("NavigationBarView requires SC.Animatable. Please make your app or framework require the animation framework. CRASH.")
}},mixinAnimatable:function(){this.mixin(SC.Animatable);this.transitions=this.navigationTransitions
},navigationTransitions:{opacity:{duration:0.25,action:"didFinishTransition"}},style:{opacity:1},swipe:function(gesture,touch,direction){var lookingFor=(direction===SC.SWIPE_LEFT)?"isSwipeLeft":"isSwipeRight",cv=this.get("childViews"),child,idx,len=cv.get("length");
for(idx=0;idx<len;idx++){child=cv[idx];if(child.get(lookingFor)){touch.makeTouchResponder(child);
touch.end();return}}},resetBuild:function(){if(!this.isAnimatable){this.mixinAnimatable()
}},didFinishTransition:function(){if(this.isBuildingIn){this.buildInDidFinish()}else{if(this.isBuildingOut){this.buildOutDidFinish()
}}},preBuildIn:function(){this.disableAnimation();this.adjust("opacity",0).updateLayout();
this.enableAnimation();var cv=this.get("childViews"),child,idx,len=cv.get("length");
for(idx=0;idx<len;idx++){child=cv[idx];if(child.disableNavigationTransition){continue
}if(!child._nv_mixedIn){this.mixinNavigationChild(child)}child.disableAnimation();
child.transform(this.buildDirection===SC.TO_LEFT?100:-100);child.enableAnimation()
}},buildIn:function(){this.preBuildIn();this.invokeLater("startBuildIn",10)},startBuildIn:function(){this.adjust("opacity",1);
var cv=this.get("childViews"),child,idx,len=cv.get("length");for(idx=0;idx<len;idx++){child=cv[idx];
if(child.disableNavigationTransition){continue}child.transform(0)}},buildOut:function(){this.adjust("opacity",0);
var cv=this.get("childViews"),child,idx,len=cv.get("length");for(idx=0;idx<len;idx++){child=cv[idx];
if(child.disableNavigationTransition){continue}if(!child._nv_mixedIn){this.mixinNavigationChild(child)
}child.transform(this.buildDirection===SC.TO_LEFT?-100:100)}},mixinNavigationChild:function(child){if(child.isAnimatable){return
}child.mixin(SC.Animatable);child.mixin({transitions:{transform:{timing:SC.Animatable.TRANSITION_EASE_IN_OUT,duration:0.25}},naturalLayout:child.get("layout"),transform:function(pos){if(SC.platform.supportsCSS3DTransforms){this.adjust("transform","translate3d("+pos+"px,0px,0px)")
}else{this.adjust("transform","translate("+pos+"px,0px)")}}});child._nv_mixedIn=YES
}});sc_require("views/button");SC.PopupButtonView=SC.ButtonView.extend({classNames:["sc-popup-button"],preferMatrix:null,menu:null,shouldLoadInBackground:NO,init:function(){arguments.callee.base.apply(this,arguments);
this._setupMenu();if(this.get("shouldLoadInBackground")){SC.backgroundTaskQueue.push(SC.PopupButtonMenuLoader.create({popupButton:this}))
}},_setupMenu:function(){var menu=this.get("instantiatedMenu");if(this.isActiveBinding){this.isActiveBinding.disconnect()
}this.isActiveBinding=null;if(menu&&!menu.isClass){this.isActiveBinding=this.bind("isActive",menu,"isVisibleInWindow")
}},_popup_menuDidChange:function(){this._setupMenu()}.observes("menu"),isActive:NO,_instantiateMenu:function(){var menu=this.get("menu");
if(!menu||!menu.isClass){return}this.menu=menu.create();this._setupMenu()},acceptsFirstResponder:YES,instantiatedMenu:function(){var menu=this.get("menu");
if(menu&&menu.isClass){this._instantiateMenu();menu=this.get("menu")}return menu}.property("menu").cacheable(),action:function(evt){var menu=this.get("instantiatedMenu");
if(!menu){SC.Logger.warn("SC.PopupButton - Unable to show menu because the menu property is set to %@.".fmt(menu));
return NO}menu.popup(this,this.get("preferMatrix"));return YES},mouseDown:function(evt){if(!this.get("isEnabled")){return YES
}this._isMouseDown=YES;this._action();this.invokeLast(this._recordMouseDownTimestamp);
this.becomeFirstResponder();return YES},_recordMouseDownTimestamp:function(){this._menuRenderedTimestamp=new Date().getTime()
},mouseUp:function(evt){var timestamp=new Date().getTime(),previousTimestamp=this._menuRenderedTimestamp,menu=this.get("instantiatedMenu"),touch=SC.platform.touch,targetMenuItem;
if(menu){targetMenuItem=menu.getPath("rootMenu.targetMenuItem");if(targetMenuItem){if(!targetMenuItem.performAction()){menu.remove()
}}else{if(!touch&&(timestamp-previousTimestamp>SC.ButtonView.CLICK_AND_HOLD_DELAY)){menu.remove()
}}}this._isMouseDown=NO;arguments.callee.base.apply(this,arguments);return YES},mouseExited:function(evt){return YES
},performKeyEquivalent:function(charCode,evt){if(!this.get("isEnabled")){return NO
}var menu=this.get("instantiatedMenu");return(!!menu&&menu.performKeyEquivalent(charCode,evt,YES))
},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled")});SC.PopupButtonMenuLoader=SC.Task.extend({popupButton:null,run:function(){if(this.popupButton){this.popupButton._instantiateMenu()
}}});SC.ProgressView=SC.View.extend(SC.Control,{value:0.5,ariaRole:"progressbar",valueBindingDefault:SC.Binding.single().notEmpty(),minimum:0,minimumBindingDefault:SC.Binding.single().notEmpty(),contentMinimumKey:null,maximum:1,maximumBindingDefault:SC.Binding.single().notEmpty(),offsetRange:undefined,contentMaximumKey:null,isIndeterminate:NO,isIndeterminateBindingDefault:SC.Binding.bool(),isRunning:NO,isRunningBindingDefault:SC.Binding.bool(),animatedBackgroundMatrix:undefined,contentIsIndeterminateKey:null,classNames:"sc-progress-view",_backgroundOffset:0,_currentBackground:1,_nextBackground:1,init:function(){arguments.callee.base.apply(this,arguments);
this.animateProgressBar()},animateProgressBar:function(){if(this.get("isRunning")&&this.get("isVisibleInWindow")){this._animateProgressBar(500)
}}.observes("isRunning","isVisibleInWindow"),_animateProgressBar:function(delay){if(delay===0){delay=1000/30
}if(this.get("isRunning")&&this.get("isVisibleInWindow")){this.displayDidChange();
this.invokeLater(this._animateProgressBar,delay,600)}},displayProperties:"displayValue minimum maximum isRunning isEnabled isIndeterminate animatedBackgroundMatrix offsetRange".w(),renderDelegateName:"progressRenderDelegate",contentPropertyDidChange:function(target,key){var content=this.get("content");
this.beginPropertyChanges().updatePropertyFromContent("value",key,"contentValueKey",content).updatePropertyFromContent("minimum",key,"contentMinimumKey",content).updatePropertyFromContent("maximum",key,"contentMaximumKey",content).updatePropertyFromContent("isIndeterminate",key,"contentIsIndeterminateKey",content).endPropertyChanges()
},displayValue:function(){var minimum=this.get("minimum")||0,maximum=this.get("maximum")||1,value=this.get("value")||0;
value=(value-minimum)/(maximum-minimum);if(value>1){value=1}if(isNaN(value)){value=0
}if(value<minimum){value=0}if(value>maximum){value=1}return value}.property("value","maximum","minimum").cacheable()});
SC.RadioView=SC.View.extend(SC.Control,{classNames:["sc-radio-view"],ariaRole:"radiogroup",itemAriaLabeledByKey:null,itemAriaLabelKey:null,value:null,layoutDirection:SC.LAYOUT_VERTICAL,escapeHTML:YES,items:[],itemTitleKey:null,itemWidthKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemsDidChange:function(){if(this._items){this._items.removeObserver("[]",this,this.itemContentDidChange)
}this._items=this.get("items");if(this._items){this._items.addObserver("[]",this,this.itemContentDidChange)
}this.itemContentDidChange()}.observes("items"),itemContentDidChange:function(){this._renderAsFirstTime=YES;
this.notifyPropertyChange("displayItems")},displayProperties:["displayItems","isEnabled","layoutDirection"],renderDelegateName:"radioGroupRenderDelegate",displayItems:function(){var items=this.get("items"),viewValue=this.get("value"),isArray=SC.isArray(viewValue),loc=this.get("localize"),titleKey=this.get("itemTitleKey"),valueKey=this.get("itemValueKey"),widthKey=this.get("itemWidthKey"),isHorizontal=this.get("layoutDirection")===SC.LAYOUT_HORIZONTAL,isEnabledKey=this.get("itemIsEnabledKey"),iconKey=this.get("itemIconKey"),ariaLabeledByKey=this.get("itemAriaLabeledByKey"),ariaLabelKey=this.get("itemAriaLabelKey"),ret=this._displayItems||[],max=(items)?items.get("length"):0,item,title,width,value,idx,isEnabled,icon,sel,active,ariaLabeledBy,ariaLabel;
for(idx=0;idx<max;idx++){item=items.objectAt(idx);if(SC.typeOf(item)===SC.T_ARRAY){title=item[0];
value=item[1]}else{if(item){if(titleKey){title=item.get?item.get(titleKey):item[titleKey]
}else{title=(item.toString)?item.toString():null}if(widthKey&&isHorizontal){width=item.get?item.get(widthKey):item[widthKey]
}if(valueKey){value=item.get?item.get(valueKey):item[valueKey]}else{value=item}if(isEnabledKey){isEnabled=item.get?item.get(isEnabledKey):item[isEnabledKey]
}else{isEnabled=YES}if(iconKey){icon=item.get?item.get(iconKey):item[iconKey]}else{icon=null
}if(ariaLabeledByKey){ariaLabeledBy=item.get?item.get(ariaLabeledByKey):item[ariaLabeledByKey]
}else{ariaLabeledBy=null}if(ariaLabelKey){ariaLabel=item.get?item.get(ariaLabelKey):item[ariaLabelKey]
}else{ariaLabel=null}}else{title=value=icon=null;isEnabled=NO}}if(item){sel=(isArray)?(viewValue.indexOf(value)>=0):(viewValue===value)
}else{sel=NO}if(loc){title=title.loc()}ret.push(SC.Object.create({title:title,icon:icon,width:width,value:value,isEnabled:isEnabled,isSelected:(isArray&&viewValue.indexOf(value)>=0&&viewValue.length===1)||(viewValue===value),isMixed:(isArray&&viewValue.indexOf(value)>=0),isActive:this._activeRadioButton===idx,ariaLabeledBy:ariaLabeledBy,ariaLabel:ariaLabel,theme:this.get("theme"),renderState:{}}))
}return ret}.property("value","items","itemTitleKey","itemWidthKey","itemValueKey","itemIsEnabledKey","localize","itemIconKey","itemAriaLabeledByKey","itemAriaLabelKey").cacheable(),acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),mouseDown:function(evt){if(!this.get("isEnabled")){return YES
}var delegate=this.get("renderDelegate"),proxy=this.get("renderDelegateProxy");var index=delegate.indexForEvent(proxy,this.$(),evt);
this._activeRadioButton=index;if(index!==undefined){this.get("displayItems")[index].set("isActive",YES);
delegate.updateRadioAtIndex(proxy,this.$(),index)}evt.allowDefault();return YES},mouseUp:function(evt){if(!this.get("isEnabled")){return YES
}var delegate=this.get("renderDelegate"),proxy=this.get("renderDelegateProxy"),displayItems=this.get("displayItems");
var index=delegate.indexForEvent(proxy,this.$(),evt);if(this._activeRadioButton!==undefined&&index!==this._activeRadioButton){displayItems[this._activeRadioButton].set("isActive",NO);
delegate.updateRadioAtIndex(proxy,this.$(),this._activeRadioButton)}this._activeRadioButton=undefined;
if(index!==undefined){displayItems[index].set("isActive",NO);delegate.updateRadioAtIndex(proxy,this.$(),index);
this.set("value",displayItems[index].value)}},touchStart:function(evt){return this.mouseDown(evt)
},touchEnd:function(evt){return this.mouseUp(evt)}});SC.SceneView=SC.ContainerView.extend({scenes:["master","detail"],nowShowing:null,transitionDuration:200,_state:"NO_VIEW",replaceContent:function(content){if(content&&this._state===this.READY){this.animateScene(content)
}else{this.replaceScene(content)}return this},replaceScene:function(newContent){var oldContent=this._targetView,layout=this.STANDARD_LAYOUT,scenes=this.get("scenes"),idx=scenes?scenes.indexOf(this.get("nowShowing")):-1;
this._targetView=newContent;this._targetIndex=idx;if(this._timer){this._timer.invalidate()
}this._leftView=this._rightView=this._start=this._end=null;this._timer=null;this.removeAllChildren();
if(oldContent){oldContent.set("layout",layout)}if(newContent){newContent.set("layout",layout)
}if(newContent){this.appendChild(newContent)}this._state=newContent?this.READY:this.NO_VIEW
},animateScene:function(newContent){var oldContent=this._targetView,outIdx=this._targetIndex,scenes=this.get("scenes"),inIdx=scenes?scenes.indexOf(this.get("nowShowing")):-1,layout;
if(outIdx<0||inIdx<0||outIdx===inIdx){return this.replaceScene(newContent)}this._targetView=newContent;
this._targetIndex=inIdx;if(inIdx>outIdx){this._leftView=oldContent;this._rightView=newContent;
this._target=-1}else{this._leftView=newContent;this._rightView=oldContent;this._target=1
}this.removeAllChildren();if(oldContent){this.appendChild(oldContent)}if(newContent){this.appendChild(newContent)
}this._start=Date.now();this._end=this._start+this.get("transitionDuration");this._state=this.ANIMATING;
this.tick()},tick:function(){this._timer=null;var now=Date.now(),pct=(now-this._start)/(this._end-this._start),target=this._target,left=this._leftView,right=this._rightView,layout,adjust;
if(pct<0){pct=0}if(!this.get("isVisibleInWindow")||(pct>=1)){return this.replaceScene(this._targetView)
}layout=SC.clone(this.get("frame"));adjust=Math.floor(layout.width*pct);if(target>0){layout.left=0-(layout.width-adjust);
left.set("layout",layout);layout=SC.clone(layout);layout.left=adjust;right.set("layout",layout)
}else{layout.left=0-adjust;left.set("layout",layout);layout=SC.clone(layout);layout.left=layout.width-adjust;
right.set("layout",layout)}this._timer=this.invokeLater(this.tick,20);return this
},NO_VIEW:"NO_VIEW",ANIMATING:"ANIMATING",READY:"READY",STANDARD_LAYOUT:{top:0,left:0,bottom:0,right:0}});
SC.SegmentView=SC.View.extend(SC.Control,{classNames:["sc-segment-view"],toolTip:null,isEnabled:YES,isActive:NO,isSelected:NO,controlSize:null,title:"",value:null,icon:null,localize:NO,keyEquivalent:null,escapeHTML:YES,needsEllipsis:YES,supportFocusRing:NO,renderDelegateName:"segmentRenderDelegate",useStaticLayout:YES,displayProperties:["icon","title","value","displayToolTip","isDefault","isCancel","width","isFirstSegment","isMiddleSegment","isLastSegment","isOverflowSegment","index"],width:null,localItem:null,widthDidChange:function(){this.adjust("width",this.get("width"))
}.observes("width"),updateItem:function(parentView,item){var itemKeys=parentView.get("itemKeys"),itemKey,viewKeys=parentView.get("viewKeys"),viewKey,i;
for(i=itemKeys.get("length")-1;i>=0;i--){itemKey=parentView.get(itemKeys.objectAt(i));
viewKey=viewKeys.objectAt(i);if(!SC.none(item.get(itemKey))){this.set(viewKey,item.get(itemKey))
}}this.set("localItem",item)}});SC.SegmentedView=SC.View.extend(SC.Control,{classNames:["sc-segmented-view"],theme:"square",value:null,isEnabled:YES,allowsEmptySelection:NO,allowsMultipleSelection:NO,localize:YES,align:SC.ALIGN_CENTER,layoutDirection:SC.LAYOUT_HORIZONTAL,items:null,itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemActionKey:null,itemTargetKey:null,itemKeyEquivalentKey:null,overflowTitle:"&raquo;",overflowToolTip:"More&hellip;",overflowIcon:null,itemKeys:"itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey itemToolTipKey itemKeyEquivalentKey".w(),viewKeys:"title value isEnabled icon width toolTip keyEquivalent".w(),init:function(){arguments.callee.base.apply(this,arguments);
var title=this.get("overflowTitle"),toolTip=this.get("overflowToolTip"),icon=this.get("overflowIcon"),overflowView;
overflowView=SC.SegmentView.create({controlSize:this.get("controlSize"),localize:this.get("localize"),title:title,toolTip:toolTip,icon:icon,isLastSegment:YES,isOverflowSegment:YES});
this.appendChild(overflowView);this.itemsDidChange()},itemsDidChange:function(){var items=this.get("items")||[],item,localItem,childViews=this.get("childViews"),childView,overflowView=childViews.lastObject(),value=this.get("value"),isSelected,itemKeys=this.get("itemKeys"),itemKey,viewKeys=this.get("viewKeys"),viewKey,i,j;
if(childViews.get("length")-1>items.get("length")){for(i=childViews.get("length")-2;
i>=items.get("length");i--){childView=childViews.objectAt(i);if(SC.isArray(value)){value.removeObject(childView.get("value"))
}else{if(value===childView.get("value")){value=null}}this.removeChild(childView)}this.set("value",value)
}else{if(childViews.get("length")-1<items.get("length")){for(i=childViews.get("length")-1;
i<items.get("length");i++){childView=SC.SegmentView.create({controlSize:this.get("controlSize"),localize:this.get("localize")});
this.insertBefore(childView,overflowView)}}}childViews=this.get("childViews");for(i=0;
i<items.get("length");i++){localItem=items.objectAt(i);childView=childViews.objectAt(i);
if(SC.none(localItem)){continue}if(SC.typeOf(localItem)===SC.T_STRING){localItem=SC.Object.create({title:localItem.humanize().titleize(),value:localItem});
this.set("itemTitleKey","title");this.set("itemValueKey","value")}else{if(SC.typeOf(localItem)===SC.T_HASH){localItem=SC.Object.create(localItem)
}else{if(localItem instanceof SC.Object){for(j=itemKeys.get("length")-1;j>=0;j--){itemKey=this.get(itemKeys.objectAt(j));
if(itemKey){localItem.removeObserver(itemKey,this,this.itemContentDidChange);localItem.addObserver(itemKey,this,this.itemContentDidChange,i)
}}}else{SC.Logger.error("SC.SegmentedView items may be Strings, Objects (ie. Hashes) or SC.Objects only")
}}}isSelected=NO;if(SC.isArray(value)?value.indexOf(localItem.get(this.get("itemValueKey")))>=0:value===localItem.get(this.get("itemValueKey"))){isSelected=YES
}childView.set("isSelected",isSelected);childView.set("index",i);childView.set("isFirstSegment",i===0);
childView.set("isMiddleSegment",i<items.get("length")-1&&i>0);childView.set("isLastSegment",i===items.get("length")-1);
childView.updateItem(this,localItem)}this.invokeLast(this.remeasure)}.observes("*items.[]"),itemContentDidChange:function(item,key,alwaysNull,index){var items=this.get("items"),childViews=this.get("childViews"),childView;
childView=childViews.objectAt(index);if(childView){childView.updateItem(this,item)
}else{SC.Logger.warn("Item content change was observed on item without matching segment child view.")
}this.invokeLast(this.remeasure)},viewDidResize:function(){var visibleWidth=this.$().width();
if(this.isOverflowing||visibleWidth<=this.cachedMinimumWidth){this.adjustOverflow()
}},isVisibleInWindowDidChange:function(){this.invokeLast(this.remeasure)}.observes("isVisibleInWindow"),remeasure:function(){var renderDelegate=this.get("renderDelegate"),childViews=this.get("childViews"),overflowView;
if(this.get("isVisibleInWindow")){overflowView=childViews.lastObject();overflowView.set("isVisible",YES);
for(var i=childViews.get("length")-1;i>=0;i--){childViews.objectAt(i).set("isVisible",YES)
}this.cachedWidths=renderDelegate.segmentWidths(this);this.cachedOverflowWidth=renderDelegate.overflowSegmentWidth(this);
this.adjustOverflow()}},adjustOverflow:function(){var childViews=this.get("childViews"),childView,value=this.get("value"),overflowView=childViews.lastObject(),visibleWidth=this.$().width(),curElementsWidth=0,widthToFit,length,i;
this.isOverflowing=NO;overflowView.set("isSelected",NO);this.overflowItems=[];length=this.cachedWidths.length;
for(i=0;i<length;i++){childView=childViews.objectAt(i);curElementsWidth+=this.cachedWidths[i];
widthToFit=(i===length-1)?curElementsWidth:curElementsWidth+this.cachedOverflowWidth;
if(widthToFit>visibleWidth){this.overflowItems.pushObject(childView.get("localItem"));
this.isOverflowing=YES;childView.set("isVisible",NO);if(i===0){overflowView.set("isFirstSegment",YES)
}if(SC.isArray(value)?value.indexOf(childView.get("value"))>=0:value===childView.get("value")){overflowView.set("isSelected",YES)
}}else{childView.set("isVisible",YES);if(i===0){overflowView.set("isFirstSegment",NO)
}}}if(this.isOverflowing){overflowView.set("isVisible",YES)}else{overflowView.set("isVisible",NO)
}this.cachedMinimumWidth=curElementsWidth+this.cachedOverflowWidth},displayProperties:["align"],renderDelegateName:"segmentedRenderDelegate",displayItemIndexForEvent:function(evt){var renderDelegate=this.get("renderDelegate");
if(renderDelegate&&renderDelegate.indexForClientPosition){return renderDelegate.indexForClientPosition(this,evt.clientX,evt.clientY)
}},keyDown:function(evt){var childViews,childView,i,length,value,isArray;if(evt.which===9||evt.keyCode===9){var view=evt.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(view){view.becomeFirstResponder()}else{evt.allowDefault()}return YES}if(!this.get("allowsMultipleSelection")){childViews=this.get("childViews");
length=childViews.get("length");value=this.get("value");isArray=SC.isArray(value);
if(evt.which===39||evt.which===40){if(value){for(i=0;i<length-2;i++){childView=childViews.objectAt(i);
if(isArray?(value.indexOf(childView.get("value"))>=0):(childView.get("value")===value)){this.triggerItemAtIndex(i+1)
}}}else{this.triggerItemAtIndex(0)}return YES}else{if(evt.which===37||evt.which===38){if(value){for(i=1;
i<length-1;i++){childView=childViews.objectAt(i);if(isArray?(value.indexOf(childView.get("value"))>=0):(childView.get("value")===value)){this.triggerItemAtIndex(i-1)
}}}else{this.triggerItemAtIndex(length-2)}return YES}}}return NO},mouseDown:function(evt){var childViews=this.get("childViews"),childView,overflowIndex=childViews.get("length")-1,index;
if(!this.get("isEnabled")){return YES}index=this.displayItemIndexForEvent(evt);if(index>=0){childView=childViews.objectAt(index);
childView.set("isActive",YES);this.activeChildView=childView;if(index===overflowIndex){this.showOverflowMenu()
}else{this._isMouseDown=YES}}return YES},mouseUp:function(evt){var activeChildView,index;
index=this.displayItemIndexForEvent(evt);if(this._isMouseDown&&(index>=0)){this.triggerItemAtIndex(index);
activeChildView=this.activeChildView;activeChildView.set("isActive",NO);this.activeChildView=null;
this._isMouseDown=NO}return YES},mouseMoved:function(evt){var childViews=this.get("childViews"),overflowIndex=childViews.get("length")-1,activeChildView,childView,index;
if(this._isMouseDown){index=this.displayItemIndexForEvent(evt);activeChildView=this.activeChildView;
childView=childViews.objectAt(index);if(childView&&childView!==activeChildView){if(activeChildView){activeChildView.set("isActive",NO)
}childView.set("isActive",YES);this.activeChildView=childView;if(index===overflowIndex){this.showOverflowMenu();
this._isMouseDown=NO}}}return YES},mouseEntered:function(evt){var childViews=this.get("childViews"),childView,overflowIndex=childViews.get("length")-1,index;
if(this._isMouseDown){index=this.displayItemIndexForEvent(evt);if(index===overflowIndex){this.showOverflowMenu();
this._isMouseDown=NO}else{if(index>=0){childView=childViews.objectAt(index);childView.set("isActive",YES);
this.activeChildView=childView}}}return YES},mouseExited:function(evt){var activeChildView;
if(this._isMouseDown){activeChildView=this.activeChildView;if(activeChildView){activeChildView.set("isActive",NO)
}this.activeChildView=null}return YES},touchStart:function(touch){var childViews=this.get("childViews"),childView,overflowIndex=childViews.get("length")-1,index;
if(!this.get("isEnabled")){return YES}index=this.displayItemIndexForEvent(touch);
if(index>=0){childView=childViews.objectAt(index);childView.set("isActive",YES);this.activeChildView=childView;
if(index===overflowIndex){this.showOverflowMenu()}else{this._isTouching=YES}}return YES
},touchEnd:function(touch){var activeChildView,index;index=this.displayItemIndexForEvent(touch);
if(this._isTouching&&(index>=0)){this.triggerItemAtIndex(index);activeChildView=this.activeChildView;
activeChildView.set("isActive",NO);this.activeChildView=null;this._isTouching=NO}return YES
},touchesDragged:function(evt,touches){var isTouching=this.touchIsInBoundary(evt),childViews=this.get("childViews"),overflowIndex=childViews.get("length")-1,activeChildView,childView,index;
if(isTouching){if(!this._isTouching){this._touchDidEnter(evt)}index=this.displayItemIndexForEvent(evt);
activeChildView=this.activeChildView;childView=childViews[index];if(childView&&childView!==activeChildView){if(activeChildView){activeChildView.set("isActive",NO)
}childView.set("isActive",YES);this.activeChildView=childView;if(index===overflowIndex){this.showOverflowMenu();
this._isMouseDown=NO}}}else{if(this._isTouching){this._touchDidExit(evt)}}this._isTouching=isTouching;
return YES},_touchDidExit:function(evt){var activeChildView;if(this.isTouching){activeChildView=this.activeChildView;
activeChildView.set("isActive",NO);this.activeChildView=null}return YES},_touchDidEnter:function(evt){var childViews=this.get("childViews"),childView,overflowIndex=childViews.get("length")-1,index;
index=this.displayItemIndexForEvent(evt);if(index===overflowIndex){this.showOverflowMenu();
this._isTouching=NO}else{if(index>=0){childView=childViews.objectAt(index);childView.set("isActive",YES);
this.activeChildView=childView}}return YES},triggerItemAtIndex:function(index){var childViews=this.get("childViews"),childView,sel,value,val,empty,mult;
childView=childViews.objectAt(index);if(!childView.get("isEnabled")){return this}empty=this.get("allowsEmptySelection");
mult=this.get("allowsMultipleSelection");sel=childView.get("value");value=val=this.get("value");
if(SC.empty(value)){value=[]}else{if(!SC.isArray(value)){value=[value]}}if(!mult){if(empty&&(value.get("length")===1)&&(value.objectAt(0)===sel)){value=[]
}else{value=[sel]}}else{if(value.indexOf(sel)>=0){if(value.get("length")>1||(value.objectAt(0)!==sel)||empty){value=value.without(sel)
}}else{value=value.concat([sel])}}switch(value.get("length")){case 0:value=null;break;
case 1:value=value.objectAt(0);break;default:break}var actionKey=this.get("itemActionKey"),targetKey=this.get("itemTargetKey"),action,target=null,resp=this.getPath("pane.rootResponder"),item;
if(actionKey&&(item=this.get("items").objectAt(index))){action=item.get?item.get(actionKey):item[actionKey];
if(targetKey){target=item.get?item.get(targetKey):item[targetKey]}if(resp){resp.sendAction(action,target,this,this.get("pane"))
}}if(!action&&val!==undefined){this.set("value",value)}action=this.get("action");
if(action&&resp){resp.sendAction(action,this.get("target"),this,this.get("pane"))
}},selectOverflowItem:function(menu){var item=menu.get("selectedItem");this.triggerItemAtIndex(item.get("index"));
menu.removeObserver("selectedItem",this,"selectOverflowItem");this.activeChildView.set("isActive",NO);
this.activeChildView=null},showOverflowMenu:function(){var childViews=this.get("childViews"),overflowViewIndex=childViews.get("length")-1,overflowItems=this.overflowItems,overflowItemsLength,startIndex,isArray,value;
overflowItemsLength=overflowItems.get("length");startIndex=childViews.get("length")-1-overflowItemsLength;
value=this.get("value");isArray=SC.isArray(value);for(var i=0;i<overflowItemsLength;
i++){var item=overflowItems.objectAt(i),itemValueKey=this.get("itemValueKey");if(isArray?value.indexOf(item.get(itemValueKey))>=0:value===item.get(itemValueKey)){item.set("isChecked",YES)
}else{item.set("isChecked",NO)}item.set("index",startIndex+i)}var self=this;var menu=SC.MenuPane.create({layout:{width:200},items:overflowItems,itemTitleKey:this.get("itemTitleKey"),itemIconKey:this.get("itemIconKey"),itemIsEnabledKey:this.get("itemIsEnabledKey"),itemKeyEquivalentKey:this.get("itemKeyEquivalentKey"),itemCheckboxKey:"isChecked",modalPaneDidClick:function(){arguments.callee.base.apply(this,arguments);
this.removeObserver("selectedItem",self,"selectOverflowItem");self.activeChildView.set("isActive",NO);
self.activeChildView=null}});var layer=this.get("layer");var overflowElement=layer.childNodes[layer.childNodes.length-1];
menu.popup(overflowElement);menu.addObserver("selectedItem",this,"selectOverflowItem")
},valueDidChange:function(){var value=this.get("value"),overflowItemsLength,childViews=this.get("childViews"),overflowIndex=Infinity,overflowView=childViews.lastObject(),childView,isSelected;
if(this.overflowItems){overflowItemsLength=this.overflowItems.get("length");overflowIndex=childViews.get("length")-1-overflowItemsLength;
overflowView.set("isSelected",NO)}for(var i=childViews.get("length")-2;i>=0;i--){childView=childViews.objectAt(i);
if(SC.isArray(value)?value.indexOf(childView.get("value"))>=0:value===childView.get("value")){childView.set("isSelected",YES);
if(i>=overflowIndex){overflowView.set("isSelected",YES)}}else{childView.set("isSelected",NO)
}}}.observes("value"),acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled").cacheable()});sc_require("views/button");
SC.SelectView=SC.ButtonView.extend({items:[],itemsBindingDefault:SC.Binding.multiple(),itemTitleKey:null,itemSortKey:null,itemValueKey:null,itemIconKey:null,itemSeparatorKey:"separator",itemIsEnabledKey:"isEnabled",localize:YES,disableSort:YES,classNames:["sc-select-view"],menu:null,_itemList:[],_itemIdx:null,value:null,checkboxEnabled:YES,showCheckbox:YES,_defaultVal:null,_defaultTitle:null,_defaultIcon:null,theme:"popup",displayProperties:["icon","value","controlSize","items"],preferMatrix:null,CUSTOM_MENU_ITEM_HEIGHT:20,isActiveBinding:"*menu.isVisibleInWindow",isDefaultPosition:NO,lastMenuWidth:null,exampleView:null,customViewMenuOffsetWidth:0,needsEllipsis:YES,menuPaneHeightPadding:0,menuItemPadding:35,isContextMenuEnabled:NO,supportFocusRing:YES,leftAlign:function(){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:return SC.SelectView.TINY_OFFSET_X;
case SC.SMALL_CONTROL_SIZE:return SC.SelectView.SMALL_OFFSET_X;case SC.REGULAR_CONTROL_SIZE:return SC.SelectView.REGULAR_OFFSET_X;
case SC.LARGE_CONTROL_SIZE:return SC.SelectView.LARGE_OFFSET_X;case SC.HUGE_CONTROL_SIZE:return SC.SelectView.HUGE_OFFSET_X
}return 0}.property("controlSize"),sortObjects:function(objects){if(!this.get("disableSort")){var nameKey=this.get("itemSortKey")||this.get("itemTitleKey");
objects=objects.sort(function(a,b){if(nameKey){a=a.get?a.get(nameKey):a[nameKey];
b=b.get?b.get(nameKey):b[nameKey]}return(a<b)?-1:((a>b)?1:0)})}return objects},render:function(context,firstTime){arguments.callee.base.apply(this,arguments);
var layoutWidth,items,len,nameKey,iconKey,valueKey,separatorKey,showCheckbox,currentSelectedVal,shouldLocalize,isSeparator,itemList,isChecked,idx,name,icon,value,item,itemEnabled,isEnabledKey;
items=this.get("items");items=this.sortObjects(items);len=items.length;nameKey=this.get("itemTitleKey");
iconKey=this.get("itemIconKey");valueKey=this.get("itemValueKey");separatorKey=this.get("itemSeparatorKey");
showCheckbox=this.get("showCheckbox");isEnabledKey=this.get("isEnabledKey");currentSelectedVal=this.get("value");
shouldLocalize=this.get("localize");itemList=[];isChecked=YES;idx=0;items.forEach(function(object){if(object||object===0){name=nameKey?(object.get?object.get(nameKey):object[nameKey]):object.toString();
name=shouldLocalize?name.loc():name;icon=iconKey?(object.get?object.get(iconKey):object[iconKey]):null;
if(SC.none(object[iconKey])){icon=null}value=(valueKey)?(object.get?object.get(valueKey):object[valueKey]):object;
if(!SC.none(currentSelectedVal)&&!SC.none(value)){if(currentSelectedVal===value){this.set("title",name);
this.set("icon",icon)}}if(value===this.get("value")){this.set("_itemIdx",idx);isChecked=!showCheckbox?NO:YES
}else{isChecked=NO}itemEnabled=(object.get?object.get(isEnabledKey):object[isEnabledKey]);
if(NO!==itemEnabled){itemEnabled=YES}isSeparator=separatorKey?(object.get?object.get(separatorKey):object[separatorKey]):NO;
if(idx===0){this._defaultVal=value;this._defaultTitle=name;this._defaultIcon=icon
}var item=SC.Object.create({separator:isSeparator,title:name,icon:icon,value:value,isEnabled:itemEnabled,checkbox:isChecked,target:this,action:this.displaySelectedItem});
itemList.push(item)}idx+=1;this.set("_itemList",itemList)},this);if(firstTime){this.invokeLast(function(){var value=this.get("value");
if(SC.none(value)){this.set("value",this._defaultVal);this.set("title",this._defaultTitle);
this.set("icon",this._defaultIcon)}})}this.changeSelectPreferMatrix(this.get("_itemIdx"))
},_action:function(evt){var buttonLabel,menuWidth,scrollWidth,lastMenuWidth,offsetWidth,items,elementOffsetWidth,largestMenuWidth,item,element,idx,value,itemList,menuControlSize,menuHeightPadding,customView,customMenuView,menu,itemsLength;
buttonLabel=this.$(".sc-button-label")[0];var menuWidthOffset=SC.SelectView.MENU_WIDTH_OFFSET;
if(!this.get("isDefaultPosition")){switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:menuWidthOffset+=SC.SelectView.TINY_POPUP_MENU_WIDTH_OFFSET;
break;case SC.SMALL_CONTROL_SIZE:menuWidthOffset+=SC.SelectView.SMALL_POPUP_MENU_WIDTH_OFFSET;
break;case SC.REGULAR_CONTROL_SIZE:menuWidthOffset+=SC.SelectView.REGULAR_POPUP_MENU_WIDTH_OFFSET;
break;case SC.LARGE_CONTROL_SIZE:menuWidthOffset+=SC.SelectView.LARGE_POPUP_MENU_WIDTH_OFFSET;
break;case SC.HUGE_CONTROL_SIZE:menuWidthOffset+=SC.SelectView.HUGE_POPUP_MENU_WIDTH_OFFSET;
break}}menuWidth=this.get("layer").offsetWidth+menuWidthOffset;menuWidth=this.get("layer").offsetWidth;
scrollWidth=buttonLabel.scrollWidth;lastMenuWidth=this.get("lastMenuWidth");if(scrollWidth){offsetWidth=buttonLabel.offsetWidth;
if(scrollWidth&&offsetWidth){menuWidth=menuWidth+scrollWidth-offsetWidth}}if(!lastMenuWidth||(menuWidth>lastMenuWidth)){lastMenuWidth=menuWidth
}items=this.get("_itemList");var customViewClassName=this.get("customViewClassName");
var customViewMenuOffsetWidth=this.get("customViewMenuOffsetWidth");var className="sc-view sc-pane sc-panel sc-palette sc-picker sc-menu select-button sc-scroll-view sc-menu-scroll-view sc-container-view menuContainer sc-button-view sc-menu-item sc-regular-size";
className=customViewClassName?(className+" "+customViewClassName):className;SC.prepareStringMeasurement("",className);
for(idx=0,itemsLength=items.length;idx<itemsLength;++idx){item=items.objectAt(idx);
elementOffsetWidth=SC.measureString(item.title).width;if(!largestMenuWidth||(elementOffsetWidth>largestMenuWidth)){largestMenuWidth=elementOffsetWidth
}}SC.teardownStringMeasurement();lastMenuWidth=(largestMenuWidth+this.menuItemPadding>lastMenuWidth)?largestMenuWidth+this.menuItemPadding:lastMenuWidth;
var maxWidth=SC.RootResponder.responder.get("currentWindowSize").width;if(lastMenuWidth>maxWidth){lastMenuWidth=(maxWidth-25)
}this.set("lastMenuWidth",lastMenuWidth);value=this.get("value");itemList=this.get("_itemList");
menuControlSize=this.get("controlSize");menuHeightPadding=this.get("menuPaneHeightPadding");
customView=this.get("exampleView");customMenuView=customView?customView:SC.MenuItemView;
menu=SC.MenuPane.create({classNames:["select-button"],items:itemList,exampleView:customMenuView,isEnabled:YES,menuHeightPadding:menuHeightPadding,preferType:SC.PICKER_MENU,itemHeightKey:"height",layout:{width:lastMenuWidth},controlSize:menuControlSize,itemWidth:lastMenuWidth});
if(!menu){return NO}menu.popup(this,this.preferMatrix);this.set("menu",menu);customView=menu.menuItemViewForContentIndex(this.get("_itemIdx"));
customView.becomeFirstResponder();this.set("isActive",YES);return YES},displaySelectedItem:function(menuView){var currentItem=menuView.get("selectedItem");
this.set("value",currentItem.get("value"));this.set("title",currentItem.get("title"));
this.set("_itemIdx",currentItem.get("contentIndex"))},changeSelectPreferMatrix:function(){var controlSizeTuning=0,customMenuItemHeight=0;
switch(this.get("controlSize")){case SC.TINY_CONTROL_SIZE:controlSizeTuning=SC.SelectView.TINY_OFFSET_Y;
customMenuItemHeight=SC.MenuPane.TINY_MENU_ITEM_HEIGHT;break;case SC.SMALL_CONTROL_SIZE:controlSizeTuning=SC.SelectView.SMALL_OFFSET_Y;
customMenuItemHeight=SC.MenuPane.SMALL_MENU_ITEM_HEIGHT;break;case SC.REGULAR_CONTROL_SIZE:controlSizeTuning=SC.SelectView.REGULAR_OFFSET_Y;
customMenuItemHeight=SC.MenuPane.REGULAR_MENU_ITEM_HEIGHT;break;case SC.LARGE_CONTROL_SIZE:controlSizeTuning=SC.SelectView.LARGE_OFFSET_Y;
customMenuItemHeight=SC.MenuPane.LARGE_MENU_ITEM_HEIGHT;break;case SC.HUGE_CONTROL_SIZE:controlSizeTuning=SC.SelectView.HUGE_OFFSET_Y;
customMenuItemHeight=SC.MenuPane.HUGE_MENU_ITEM_HEIGHT;break}var preferMatrixAttributeTop=controlSizeTuning,itemIdx=this.get("_itemIdx"),leftAlign=this.get("leftAlign"),defPreferMatrix,tempPreferMatrix;
if(this.get("isDefaultPosition")){defPreferMatrix=[1,0,3];this.set("preferMatrix",defPreferMatrix)
}else{if(itemIdx){preferMatrixAttributeTop=itemIdx*customMenuItemHeight+controlSizeTuning
}tempPreferMatrix=[leftAlign,-preferMatrixAttributeTop,2];this.set("preferMatrix",tempPreferMatrix)
}},mouseDown:function(evt){if(!this.get("isEnabled")){return YES}this.set("isActive",YES);
this._isMouseDown=YES;this.becomeFirstResponder();this._action();return YES},mouseUp:function(evt){var menu=this.get("menu"),targetMenuItem,success;
if(menu){targetMenuItem=menu.getPath("rootMenu.targetMenuItem");if(targetMenuItem&&menu.get("mouseHasEntered")){if(!targetMenuItem.performAction()){menu.remove()
}}else{if(evt.timeStamp-this._mouseDownTimestamp>400){menu.remove()}}}this._isMouseDown=NO;
this.set("isActive",NO);return YES},mouseExited:function(){return YES},keyDown:function(event){if(this.interpretKeyEvents(event)){return YES
}else{arguments.callee.base.apply(this,arguments)}},interpretKeyEvents:function(event){if(event){if((event.keyCode===38||event.keyCode===40)){this._action()
}else{if(event.keyCode===27){this.resignFirstResponder()}}}return arguments.callee.base.apply(this,arguments)
},acceptsFirstResponder:function(){return this.get("isEnabled")}.property("isEnabled"),_button_isSelectedDidChange:function(){}.observes("isSelected")});
SC.SelectView.TINY_OFFSET_X=0;SC.SelectView.TINY_OFFSET_Y=0;SC.SelectView.TINY_POPUP_MENU_WIDTH_OFFSET=0;
SC.SelectView.SMALL_OFFSET_X=-18;SC.SelectView.SMALL_OFFSET_Y=3;SC.SelectView.SMALL_POPUP_MENU_WIDTH_OFFSET=7;
SC.SelectView.REGULAR_OFFSET_X=-17;SC.SelectView.REGULAR_OFFSET_Y=3;SC.SelectView.REGULAR_POPUP_MENU_WIDTH_OFFSET=4;
SC.SelectView.LARGE_OFFSET_X=-17;SC.SelectView.LARGE_OFFSET_Y=6;SC.SelectView.LARGE_POPUP_MENU_WIDTH_OFFSET=3;
SC.SelectView.HUGE_OFFSET_X=0;SC.SelectView.HUGE_OFFSET_Y=0;SC.SelectView.HUGE_POPUP_MENU_WIDTH_OFFSET=0;
SC.SelectView.MENU_WIDTH_OFFSET=-2;SC.SelectFieldView=SC.FieldView.extend({tagName:"select",classNames:["sc-select-field-view"],objects:[],objectsBindingDefault:SC.Binding.multiple(),nameKey:null,sortKey:null,valueKey:null,emptyName:null,localize:false,cpDidChange:YES,disableSort:NO,validateMenuItem:function(itemValue,itemName){return true
},sortObjects:function(objects){if(!this.get("disableSort")){var nameKey=this.get("sortKey")||this.get("nameKey");
if(nameKey){objects=objects.sortProperty(nameKey)}else{objects=objects.sort(function(a,b){if(nameKey){a=a.get?a.get(nameKey):a[nameKey];
b=b.get?b.get(nameKey):b[nameKey]}return(a<b)?-1:((a>b)?1:0)})}}return objects},render:function(context,firstTime){if(this.get("cpDidChange")){this.set("cpDidChange",NO);
var nameKey=this.get("nameKey");var valueKey=this.get("valueKey");var objects=this.get("objects");
var fieldValue=this.get("value");var el,selectElement;if(!this.get("isEnabled")){context.attr("disabled","disabled")
}var shouldLocalize=this.get("localize");if(!valueKey&&fieldValue){fieldValue=SC.guidFor(fieldValue)
}if((fieldValue===null)||(fieldValue==="")){fieldValue="***"}if(objects){objects=this.sortObjects(objects);
if(!firstTime){selectElement=this.$input()[0];if(!selectElement){return}selectElement.innerHTML=""
}var emptyName=this.get("emptyName");if(emptyName){if(shouldLocalize){emptyName=emptyName.loc()
}if(firstTime){context.push('<option value="***">'+emptyName+"</option>",'<option disabled="disabled"></option>')
}else{el=document.createElement("option");el.value="***";el.innerHTML=emptyName;selectElement.appendChild(el);
el=document.createElement("option");el.disabled="disabled";selectElement.appendChild(el)
}}objects.forEach(function(object,index){if(object){var name=nameKey?(object.get?object.get(nameKey):object[nameKey]):object.toString();
if(shouldLocalize){name=name.loc()}var value=(valueKey)?(object.get?object.get(valueKey):object[valueKey]):object;
if(!emptyName&&index===0&&fieldValue==="***"){this.set("value",value)}if(value){value=(SC.guidFor(value))?SC.guidFor(value):value.toString()
}var disable=(this.validateMenuItem&&this.validateMenuItem(value,name))?"":'disabled="disabled" ';
if(firstTime){context.push("<option "+disable+'value="'+value+'">'+name+"</option>")
}else{el=document.createElement("option");el.value=value;el.innerHTML=name;if(disable.length>0){el.disable="disabled"
}selectElement.appendChild(el)}}else{if(firstTime){context.push('<option disabled="disabled"></option>')
}else{el=document.createElement("option");el.disabled="disabled";selectElement.appendChild(el)
}}},this);this.setFieldValue(fieldValue)}else{this.set("value",null)}}else{this.$().attr("disabled",this.get("isEnabled")?null:"disabled")
}},displayProperties:["objects","nameKey","valueKey","isEnabled"],_objectsObserver:function(){this.set("cpDidChange",YES)
}.observes("objects"),_objectArrayObserver:function(){this.set("cpDidChange",YES);
this.propertyDidChange("objects")}.observes("*objects.[]"),_nameKeyObserver:function(){this.set("cpDidChange",YES)
}.observes("nameKey"),_valueKeyObserver:function(){this.set("cpDidChange",YES)}.observes("valueKey"),acceptsFirstResponder:function(){return this.get("isEnabled")
}.property("isEnabled"),$input:function(){return this.$()},mouseDown:function(evt){if(!this.get("isEnabled")){evt.stop();
return YES}else{return arguments.callee.base.apply(this,arguments)}},touchStart:function(evt){return this.mouseDown(evt)
},touchEnd:function(evt){return this.mouseUp(evt)},getFieldValue:function(){var value=arguments.callee.base.apply(this,arguments);
var valueKey=this.get("valueKey");var objects=this.get("objects");var found=null;
var object;if(value=="***"){value=null}else{if(value&&objects){var loc=(SC.typeOf(objects.length)===SC.T_FUNCTION)?objects.length():objects.length;
while(!found&&(--loc>=0)){object=objects.objectAt?objects.objectAt(loc):objects[loc];
if(!object){continue}if(valueKey){object=(object.get)?object.get(valueKey):object[valueKey]
}var ov=(object)?(SC.guidFor(object)?SC.guidFor(object):object.toString()):null;if(value==ov){found=object
}}}}return(valueKey||found)?found:value},setFieldValue:function(newValue){if(SC.none(newValue)){newValue="***"
}else{newValue=((newValue)?(SC.guidFor(newValue)?SC.guidFor(newValue):newValue.toString()):null)
}this.$input().val(newValue);return this},fieldDidFocus:function(){var isFocused=this.get("isFocused");
if(!isFocused){this.set("isFocused",true)}},fieldDidBlur:function(){var isFocused=this.get("isFocused");
if(isFocused){this.set("isFocused",false)}},_isFocusedObserver:function(){this.$().setClass("focus",this.get("isFocused"))
}.observes("isFocused"),didCreateLayer:function(){var input=this.$input();if(this.get("isEnabled")===false){this.$()[0].disabled=true
}SC.Event.add(input,"blur",this,this.fieldDidBlur);SC.Event.add(input,"focus",this,this.fieldDidFocus);
SC.Event.add(input,"change",this,this._field_fieldValueDidChange)},willDestroyLayer:function(){var input=this.$input();
SC.Event.remove(input,"focus",this,this.fieldDidFocus);SC.Event.remove(input,"blur",this,this.fieldDidBlur);
SC.Event.remove(input,"change",this,this._field_fieldValueDidChange)}});SC.SliderView=SC.View.extend(SC.Control,{classNames:"sc-slider-view",ariaRole:"slider",value:0.5,valueBindingDefault:SC.Binding.single().notEmpty(),minimum:0,minimumBindingDefault:SC.Binding.single().notEmpty(),contentMinimumKey:null,maximum:1,maximumBindingDefault:SC.Binding.single().notEmpty(),contentMaximumKey:null,step:0.1,displayProperties:"displayValue minimum maximum step frame".w(),renderDelegateName:"sliderRenderDelegate",displayValue:function(){var min=this.get("minimum"),max=this.get("maximum"),value=this.get("value"),step=this.get("step");
value=Math.min(Math.max(value,min),max);if(!SC.none(step)&&step!==0){value=Math.round(value/step)*step
}if(value!==0){value=Math.floor((value-min)/(max-min)*100)}return value}.property("value","minimum","maximum","step").cacheable(),_isMouseDown:NO,mouseDown:function(evt){if(!this.get("isEnabled")){return YES
}this.set("isActive",YES);this._isMouseDown=YES;return this._triggerHandle(evt,YES)
},mouseDragged:function(evt){return this._isMouseDown?this._triggerHandle(evt):YES
},mouseUp:function(evt){if(this._isMouseDown){this.set("isActive",NO)}var ret=this._isMouseDown?this._triggerHandle(evt):YES;
this._isMouseDown=NO;return ret},mouseWheel:function(evt){if(!this.get("isEnabled")){return YES
}var min=this.get("minimum"),max=this.get("maximum"),newVal=this.get("value")+((evt.wheelDeltaX+evt.wheelDeltaY)*0.01),step=this.get("step"),value=Math.round(newVal/step)*step;
if(newVal<min){this.setIfChanged("value",min)}else{if(newVal>max){this.setIfChanged("value",max)
}else{this.setIfChanged("value",newVal)}}return YES},touchStart:function(evt){return this.mouseDown(evt)
},touchEnd:function(evt){return this.mouseUp(evt)},touchesDragged:function(evt){return this.mouseDragged(evt)
},_triggerHandle:function(evt,firstEvent){var width=this.get("frame").width,min=this.get("minimum"),max=this.get("maximum"),step=this.get("step"),v=this.get("value"),loc;
if(firstEvent){loc=this.convertFrameFromView({x:evt.pageX}).x;this._evtDiff=evt.pageX-loc
}else{loc=evt.pageX-this._evtDiff}loc=Math.max(0,Math.min(loc/width,1));if(firstEvent){var value=this.get("value");
value=(value-min)/(max-min);if(Math.abs(value*width-loc*width)<16){this._offset=value-loc
}else{this._offset=0}}loc=Math.max(0,Math.min(loc+this._offset,1));loc=min+((max-min)*loc);
if(step!==0){loc=Math.round(loc/step)*step}if(Math.abs(v-loc)>=0.01){this.set("value",loc)
}return YES},acceptsFirstResponder:function(){if(!SC.SAFARI_FOCUS_BEHAVIOR){return this.get("isEnabled")
}else{return NO}}.property("isEnabled"),willBecomeKeyResponderFrom:function(keyView){if(!this._isFocused){this._isFocused=YES;
this.becomeFirstResponder();if(this.get("isVisibleInWindow")){this.$().focus()}}},willLoseKeyResponderTo:function(responder){if(this._isFocused){this._isFocused=NO
}},keyDown:function(evt){if(evt.which===9||evt.keyCode===9){var view=evt.shiftKey?this.get("previousValidKeyView"):this.get("nextValidKeyView");
if(view){view.becomeFirstResponder()}else{evt.allowDefault()}return YES}if(evt.which===37||evt.which===38||evt.which===39||evt.which===40){var min=this.get("minimum"),max=this.get("maximum"),step=this.get("step"),size=max-min,val=0,calculateStep;
if(evt.which===37||evt.which===38){if(step===0){if(size<100){val=this.get("value")-1
}else{calculateStep=Math.abs(size/100);if(calculateStep<2){calculateStep=2}val=this.get("value")-Math.abs(size/100)
}}else{val=this.get("value")-step}}if(evt.which===39||evt.which===40){if(step===0){if(size<100){val=this.get("value")+2
}else{calculateStep=Math.abs(size/100);if(calculateStep<2){calculateStep=2}val=this.get("value")+calculateStep
}}else{val=this.get("value")+step}}if(val>=min&&val<=max){this.set("value",val)}}SC.RunLoop.begin().end();
return YES},contentPropertyDidChange:function(target,key){var content=this.get("content");
this.beginPropertyChanges().updatePropertyFromContent("value",key,"contentValueKey",content).updatePropertyFromContent("minimum",key,"contentMinimumKey",content).updatePropertyFromContent("maximum",key,"contentMaximumKey",content).updatePropertyFromContent("isIndeterminate",key,"contentIsIndeterminateKey",content).endPropertyChanges()
}});sc_require("mixins/collection_group");sc_require("views/disclosure");SC.SourceListGroupView=SC.View.extend(SC.Control,SC.CollectionGroup,{classNames:["sc-source-list-group"],content:null,isGroupVisible:YES,hasGroupTitle:YES,groupTitleKey:null,groupVisibleKey:null,render:function(context,firstTime){context.push('<div role="button" class="sc-source-list-label sc-disclosure-view sc-button-view button disclosure no-disclosure">','<img src="'+SC.BLANK_IMAGE_URL+'" class="button" />','<span class="label"></span></div>')
},createChildViews:function(){},contentPropertyDidChange:function(target,key){var content=this.get("content");
var labelView=this.outlet("labelView");if(content===null){labelView.setIfChanged("isVisible",NO);
this.setIfChanged("hasGroupTitle",NO);return}else{labelView.setIfChanged("isVisible",YES);
this.setIfChanged("hasGroupTitle",YES)}var groupTitleKey=this.getDelegateProperty("groupTitleKey",this.displayDelegate);
if((key=="*")||(groupTitleKey&&(key==groupTitleKey))){var title=(content&&content.get&&groupTitleKey)?content.get(groupTitleKey):content;
if(title!=this._title){this._title=title;if(title){title=title.capitalize()}labelView.set("title",title)
}}var groupVisibleKey=this.getDelegateProperty("groupVisibleKey",this.displayDelegate);
if((key=="*")||(groupVisibleKey&&(key==groupVisibleKey))){if(groupVisibleKey){labelView.removeClassName("no-disclosure");
var isVisible=(content&&content.get)?!!content.get(groupVisibleKey):YES;if(isVisible!=this.get("isGroupVisible")){this.set("isGroupVisible",isVisible);
labelView.set("value",isVisible)}}else{labelView.addClassName("no-disclosure")}}},disclosureValueDidChange:function(newValue){if(newValue==this.get("isGroupVisible")){return
}var group=this.get("content");var groupVisibleKey=this.getDelegateProperty("groupVisibleKey",this.displayDelegate);
if(group&&group.set&&groupVisibleKey){group.set(groupVisibleKey,newValue)}this.set("isGroupVisible",newValue);
if(this.owner&&this.owner.updateChildren){this.owner.updateChildren(true)}},labelView:SC.DisclosureView.extend({value:YES,_valueObserver:function(){if(this.owner){this.owner.disclosureValueDidChange(this.get("value"))
}}.observes("value")})});sc_require("views/list");sc_require("views/source_list_group");
SC.BENCHMARK_SOURCE_LIST_VIEW=YES;SC.SourceListView=SC.ListView.extend({theme:"source-list",classNames:["sc-source-list"],rowHeight:32,selectOnMouseDown:NO,actOnSelect:YES});
sc_require("views/split");SC.SplitDividerView=SC.View.extend({classNames:["sc-split-divider-view"],mouseDown:function(evt){var splitView=this.get("splitView");
return(splitView)?splitView.mouseDownInThumbView(evt,this):arguments.callee.base.apply(this,arguments)
},doubleClick:function(evt){var splitView=this.get("splitView");return(splitView)?splitView.doubleClickInThumbView(evt,this):arguments.callee.base.apply(this,arguments)
},touchStart:function(evt){return this.mouseDown(evt)}});sc_require("views/split_divider");
SC.RESIZE_BOTH="resize-both";SC.RESIZE_TOP_LEFT="resize-top-left";SC.RESIZE_BOTTOM_RIGHT="resize-bottom-right";
SC.SplitView=SC.View.extend({classNames:["sc-split-view"],displayProperties:["layoutDirection"],delegate:null,layoutDirection:SC.LAYOUT_HORIZONTAL,canCollapseViews:YES,autoresizeBehavior:SC.RESIZE_BOTTOM_RIGHT,defaultThickness:0.5,topLeftMinThickness:null,topLeftMaxThickness:null,bottomRightMinThickness:null,bottomRightMaxThickness:null,dividerThickness:null,isSplitView:YES,topLeftView:SC.View,dividerView:SC.SplitDividerView,bottomRightView:SC.View,topLeftThickness:function(){var view=this.get("topLeftView");
return view?this.thicknessForView(view):0}.property("topLeftView").cacheable(),bottomRightThickness:function(){var view=this.get("bottomRightView");
return view?this.thicknessForView(view):0}.property("bottomRightView").cacheable(),thumbViewCursor:null,canCollapseView:function(view){return this.invokeDelegateMethod(this.delegate,"splitViewCanCollapse",this,view)
},thicknessForView:function(view){var direction=this.get("layoutDirection"),ret=view.get("frame");
return(direction===SC.LAYOUT_HORIZONTAL)?ret.width:ret.height},createChildViews:function(){var childViews=[],views=["topLeftView","dividerView","bottomRightView"],l=views.length,view,i;
for(i=0;i<l;++i){if(view=this.get(views[i])){view=this[views[i]]=this.createChildView(view,{layoutView:this,rootElementPath:[i]});
childViews.push(view)}}this.set("childViews",childViews);return this},updateChildLayout:function(){var topLeftView=this.get("topLeftView"),bottomRightView=this.get("bottomRightView"),dividerView=this.get("dividerView"),autoresizeBehavior=this.get("autoresizeBehavior"),direction=this.get("layoutDirection"),frame=this.get("frame"),topLeftThickness=this._desiredTopLeftThickness,dividerThickness=this.get("dividerThickness"),splitViewThickness=(direction===SC.LAYOUT_HORIZONTAL)?frame.width:frame.height,bottomRightThickness=splitViewThickness-dividerThickness-topLeftThickness,layout,isCollapsed;
dividerThickness=(!SC.none(dividerThickness))?dividerThickness:7;isCollapsed=topLeftView.get("isCollapsed")||NO;
topLeftView.setIfChanged("isVisible",!isCollapsed);layout=SC.clone(topLeftView.get("layout"));
if(direction===SC.LAYOUT_HORIZONTAL){layout.top=0;layout.left=0;layout.bottom=0;switch(autoresizeBehavior){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:layout.right=bottomRightThickness+dividerThickness;delete layout.width;
break;case SC.RESIZE_BOTTOM_RIGHT:delete layout.right;delete layout.height;layout.width=topLeftThickness;
break}}else{layout.top=0;layout.left=0;layout.right=0;switch(autoresizeBehavior){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:layout.bottom=bottomRightThickness+dividerThickness;delete layout.height;
break;case SC.RESIZE_BOTTOM_RIGHT:layout.height=topLeftThickness;delete layout.bottom;
delete layout.width;break}}topLeftView.set("layout",layout);if(dividerView){layout=SC.clone(dividerView.get("layout"));
if(direction===SC.LAYOUT_HORIZONTAL){layout.width=dividerThickness;layout.top=0;layout.bottom=0;
delete layout.height;switch(autoresizeBehavior){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:layout.right=bottomRightThickness;delete layout.left;delete layout.centerX;
delete layout.centerY;break;case SC.RESIZE_BOTTOM_RIGHT:layout.left=topLeftThickness;
delete layout.right;delete layout.centerX;delete layout.centerY;break}}else{layout.height=dividerThickness;
layout.left=0;layout.right=0;delete layout.width;switch(autoresizeBehavior){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_TOP_LEFT:layout.bottom=bottomRightThickness;delete layout.top;delete layout.centerX;
delete layout.centerY;break;case SC.RESIZE_BOTTOM_RIGHT:layout.top=topLeftThickness;
delete layout.bottom;delete layout.centerX;delete layout.centerY;break}}dividerView.set("layout",layout)
}isCollapsed=bottomRightView.get("isCollapsed")||NO;bottomRightView.setIfChanged("isVisible",!isCollapsed);
layout=SC.clone(bottomRightView.get("layout"));if(direction===SC.LAYOUT_HORIZONTAL){layout.top=0;
layout.bottom=0;layout.right=0;switch(autoresizeBehavior){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_BOTTOM_RIGHT:layout.left=topLeftThickness+dividerThickness;delete layout.width;
break;case SC.RESIZE_TOP_LEFT:layout.width=bottomRightThickness;delete layout.left;
break}}else{layout.left=0;layout.right=0;layout.bottom=0;switch(autoresizeBehavior){case SC.RESIZE_BOTH:throw"SC.RESIZE_BOTH is currently unsupported.";
case SC.RESIZE_BOTTOM_RIGHT:layout.top=topLeftThickness+dividerThickness;delete layout.height;
break;case SC.RESIZE_TOP_LEFT:delete layout.top;layout.height=bottomRightThickness;
break}}bottomRightView.set("layout",layout);this.notifyPropertyChange("topLeftThickness").notifyPropertyChange("bottomRightThickness")
},renderLayout:function(context,firstTime){if(firstTime||this._recalculateDivider){var layoutDirection=this.get("layoutDirection"),frame=this.get("frame"),elem=this.$(),desiredThickness=this.get("defaultThickness"),autoResizeBehavior=this.get("autoresizeBehavior"),dividerThickness=this.get("dividerThickness"),splitViewThickness;
if(!this.get("thumbViewCursor")){this.set("thumbViewCursor",SC.Cursor.create())}dividerThickness=!SC.none(dividerThickness)?dividerThickness:7;
if(this._recalculateDivider===undefined&&desiredThickness<1){this._recalculateDivider=YES
}else{if(this._recalculateDivider){this._recalculateDivider=NO}}if(elem[0]){splitViewThickness=(layoutDirection===SC.LAYOUT_HORIZONTAL)?elem[0].offsetWidth:elem[0].offsetHeight
}else{splitViewThickness=(layoutDirection===SC.LAYOUT_HORIZONTAL)?frame.width:frame.height
}if(SC.none(desiredThickness)||(desiredThickness>0&&desiredThickness<1)){desiredThickness=Math.floor((splitViewThickness-(dividerThickness))*(desiredThickness||0.5))
}if(autoResizeBehavior===SC.RESIZE_BOTTOM_RIGHT){this._desiredTopLeftThickness=desiredThickness
}else{this._desiredTopLeftThickness=splitViewThickness-dividerThickness-desiredThickness
}this._topLeftView=this.get("topLeftView");this._bottomRightView=this.get("bottomRightView");
this._topLeftViewThickness=this.thicknessForView(this.get("topLeftView"));this._bottomRightThickness=this.thicknessForView(this.get("bottomRightView"));
this._dividerThickness=this.get("dividerThickness");this._layoutDirection=this.get("layoutDirection");
this._updateTopLeftThickness(0);this._setCursorStyle();this.updateChildLayout()}arguments.callee.base.apply(this,arguments)
},render:function(context,firstTime){arguments.callee.base.apply(this,arguments);
if(this._inLiveResize){this._setCursorStyle()}if(this.get("layoutDirection")===SC.LAYOUT_HORIZONTAL){context.addClass("sc-horizontal")
}else{context.addClass("sc-vertical")}},mouseDownInThumbView:function(evt,thumbView){var responder=this.getPath("pane.rootResponder");
if(!responder){return NO}responder.dragDidStart(this);this._mouseDownX=evt.pageX;
this._mouseDownY=evt.pageY;this._thumbView=thumbView;this._topLeftView=this.get("topLeftView");
this._bottomRightView=this.get("bottomRightView");this._topLeftViewThickness=this.thicknessForView(this.get("topLeftView"));
this._bottomRightThickness=this.thicknessForView(this.get("bottomRightView"));this._dividerThickness=this.get("dividerThickness");
this._layoutDirection=this.get("layoutDirection");this.beginLiveResize();this._inLiveResize=YES;
return YES},mouseDragged:function(evt){var offset=(this._layoutDirection===SC.LAYOUT_HORIZONTAL)?evt.pageX-this._mouseDownX:evt.pageY-this._mouseDownY;
this._updateTopLeftThickness(offset);return YES},mouseUp:function(evt){if(this._inLiveResize===YES){this._thumbView=null;
this._inLiveResize=NO;this.endLiveResize();return YES}var cursor=this.get("thumbViewCursor"),cloneCursor=SC.clone(cursor),dV=this.get("dividerView");
cursor.set("cursorStyle",SC.SYSTEM_CURSOR);dV.set("cursor",cloneCursor);this.set("cursor",cursor);
return NO},touchesDragged:function(evt){return this.mouseDragged(evt)},touchEnd:function(evt){return this.mouseUp(evt)
},doubleClickInThumbView:function(evt,thumbView){var view=this._topLeftView,isCollapsed=view.get("isCollapsed")||NO;
if(!isCollapsed&&!this.canCollapseView(view)){view=this._bottomRightView;isCollapsed=view.get("isCollapsed")||NO;
if(!isCollapsed&&!this.canCollapseView(view)){return NO}}if(!isCollapsed){this._uncollapsedThickness=this.thicknessForView(view);
if(view===this._topLeftView){this._updateTopLeftThickness(this.topLeftThickness()*-1)
}else{this._updateBottomRightThickness(this.bottomRightThickness()*-1)}if(!view.get("isCollapsed")){this._uncollapsedThickness=null
}}else{if(view===this._topLeftView){this._updateTopLeftThickness(this._uncollapsedThickness)
}else{this._updateBottomRightThickness(this._uncollapsedThickness)}view._uncollapsedThickness=null
}this._setCursorStyle();return true},_updateTopLeftThickness:function(offset){var topLeftView=this._topLeftView,bottomRightView=this._bottomRightView,topLeftViewThickness=this.thicknessForView(topLeftView),bottomRightViewThickness=this.thicknessForView(bottomRightView),minAvailable=this._dividerThickness,maxAvailable=0,proposedThickness=this._topLeftViewThickness+offset,direction=this._layoutDirection,bottomRightCanCollapse=this.canCollapseView(bottomRightView),thickness=proposedThickness,max=this.get("topLeftMaxThickness"),min=this.get("topLeftMinThickness"),bottomRightThickness,tlCollapseAtThickness,brCollapseAtThickness;
if(!topLeftView.get("isCollapsed")){maxAvailable+=topLeftViewThickness}if(!bottomRightView.get("isCollapsed")){maxAvailable+=bottomRightViewThickness
}if(!SC.none(max)){thickness=Math.min(max,thickness)}if(!SC.none(min)){thickness=Math.max(min,thickness)
}max=this.get("bottomRightMaxThickness");min=this.get("bottomRightMinThickness");
bottomRightThickness=maxAvailable-thickness;if(!SC.none(max)){bottomRightThickness=Math.min(max,bottomRightThickness)
}if(!SC.none(min)){bottomRightThickness=Math.max(min,bottomRightThickness)}thickness=maxAvailable-bottomRightThickness;
thickness=this.invokeDelegateMethod(this.delegate,"splitViewConstrainThickness",this,topLeftView,thickness);
thickness=Math.min(thickness,maxAvailable);thickness=Math.max(0,thickness);tlCollapseAtThickness=topLeftView.get("collapseAtThickness");
if(!tlCollapseAtThickness){tlCollapseAtThickness=0}brCollapseAtThickness=bottomRightView.get("collapseAtThickness");
brCollapseAtThickness=SC.none(brCollapseAtThickness)?maxAvailable:(maxAvailable-brCollapseAtThickness);
if((proposedThickness<=tlCollapseAtThickness)&&this.canCollapseView(topLeftView)){max=bottomRightView.get("maxThickness");
if(!max||(minAvailable+maxAvailable)<=max){thickness=0}}else{if(proposedThickness>=brCollapseAtThickness&&this.canCollapseView(bottomRightView)){max=topLeftView.get("maxThickness");
if(!max||(minAvailable+maxAvailable)<=max){thickness=maxAvailable}}}if(thickness!=this.thicknessForView(topLeftView)){this._desiredTopLeftThickness=thickness;
topLeftView.set("isCollapsed",thickness===0);bottomRightView.set("isCollapsed",thickness>=maxAvailable);
this.updateChildLayout();this.displayDidChange()}},_updateBottomRightThickness:function(offset){var topLeftView=this._topLeftView,bottomRightView=this._bottomRightView,topLeftViewThickness=this.thicknessForView(topLeftView),bottomRightViewThickness=this.thicknessForView(bottomRightView),minAvailable=this._dividerThickness,maxAvailable=0,proposedThickness=this._topLeftViewThickness+offset,direction=this._layoutDirection,bottomRightCanCollapse=this.canCollapseView(bottomRightView),thickness=proposedThickness,max=this.get("topLeftMaxThickness"),min=this.get("topLeftMinThickness"),bottomRightThickness,tlCollapseAtThickness,brCollapseAtThickness;
if(!topLeftView.get("isCollapsed")){maxAvailable+=topLeftViewThickness}if(!bottomRightView.get("isCollapsed")){maxAvailable+=bottomRightViewThickness
}if(!SC.none(max)){thickness=Math.min(max,thickness)}if(!SC.none(min)){thickness=Math.max(min,thickness)
}max=this.get("bottomRightMaxThickness");min=this.get("bottomRightMinThickness");
bottomRightThickness=maxAvailable-thickness;if(!SC.none(max)){bottomRightThickness=Math.min(max,bottomRightThickness)
}if(!SC.none(min)){bottomRightThickness=Math.max(min,bottomRightThickness)}thickness=maxAvailable-bottomRightThickness;
thickness=this.invokeDelegateMethod(this.delegate,"splitViewConstrainThickness",this,topLeftView,thickness);
thickness=Math.min(thickness,maxAvailable);thickness=Math.max(0,thickness);tlCollapseAtThickness=topLeftView.get("collapseAtThickness");
if(!tlCollapseAtThickness){tlCollapseAtThickness=0}brCollapseAtThickness=bottomRightView.get("collapseAtThickness");
brCollapseAtThickness=SC.none(brCollapseAtThickness)?maxAvailable:(maxAvailable-brCollapseAtThickness);
if((proposedThickness<=tlCollapseAtThickness)&&this.canCollapseView(topLeftView)){max=bottomRightView.get("maxThickness");
if(!max||(minAvailable+maxAvailable)<=max){thickness=0}}else{if(proposedThickness>=brCollapseAtThickness&&this.canCollapseView(bottomRightView)){max=topLeftView.get("maxThickness");
if(!max||(minAvailable+maxAvailable)<=max){thickness=maxAvailable}}}if(thickness!=this.thicknessForView(topLeftView)){this._desiredTopLeftThickness=thickness;
topLeftView.set("isCollapsed",thickness===0);bottomRightView.set("isCollapsed",thickness>=maxAvailable);
this.updateChildLayout();this.displayDidChange()}},_setCursorStyle:function(){var topLeftView=this._topLeftView,bottomRightView=this._bottomRightView,thumbViewCursor=this.get("thumbViewCursor"),tlThickness=this.thicknessForView(topLeftView),brThickness=this.thicknessForView(bottomRightView),dV=this.get("dividerView");
this._layoutDirection=this.get("layoutDirection");if(topLeftView.get("isCollapsed")||tlThickness===this.get("topLeftMinThickness")||brThickness==this.get("bottomRightMaxThickness")){thumbViewCursor.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"e-resize":"s-resize")
}else{if(bottomRightView.get("isCollapsed")||tlThickness===this.get("topLeftMaxThickness")||brThickness==this.get("bottomRightMinThickness")){thumbViewCursor.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"w-resize":"n-resize")
}else{if(SC.browser.msie){thumbViewCursor.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"e-resize":"n-resize")
}else{thumbViewCursor.set("cursorStyle",this._layoutDirection===SC.LAYOUT_HORIZONTAL?"ew-resize":"ns-resize")
}}}dV.set("cursor",thumbViewCursor);if(this._inLiveResize){this.set("cursor",thumbViewCursor)
}}.observes("layoutDirection"),splitViewCanCollapse:function(splitView,view){if(splitView.get("canCollapseViews")===NO){return NO
}if(view.get("canCollapse")===NO){return NO}return YES},splitViewConstrainThickness:function(splitView,view,proposedThickness){return proposedThickness
},_forceSplitCalculation:function(){this.updateLayout()}.observes("*pane.isPaneAttached"),viewDidResize:function(){arguments.callee.base.apply(this,arguments);
this.notifyPropertyChange("topLeftThickness").notifyPropertyChange("bottomRightThickness")
}.observes("layout")});SC.mixin(SC.View.prototype,{splitView:function(){var view=this;
while(view&&!view.isSplitView){view=view.get("parentView")}return view}.property("parentView").cacheable()});
sc_require("views/collection");SC.StackedView=SC.CollectionView.extend({classNames:["sc-stacked-view"],layout:{top:0,left:0,right:0,height:1},computeNowShowing:function(rect){return this.get("allContentIndexes")
},updateHeight:function(immediately){if(immediately){this._updateHeight()}else{this.invokeLast(this._updateHeight)
}return this},_updateHeight:function(){var childViews=this.get("childViews"),len=childViews.get("length"),view,layer,height;
if(len===0){height=1}else{view=childViews.objectAt(len-1);layer=view?view.get("layer"):null;
height=layer?(layer.offsetTop+layer.offsetHeight):1;layer=null}this.adjust("height",height)
},didReload:function(set){return this.updateHeight()},didCreateLayer:function(){return this.updateHeight()
}});SC.StaticContentView=SC.View.extend(SC.StaticLayout,{classNames:["sc-static-content-view"],displayProperties:["content"],content:null,contentLayoutDidChange:function(){this._viewFrameDidChange()
},useStaticLayout:YES,frame:function(){var layer=this.get("layer"),rect;if(!layer){return{x:0,y:0,width:0,height:0}
}if(layer.getBoundingClientRect){rect=layer.getBoundingClientRect();return{x:0,y:0,width:rect.width,height:rect.height}
}else{return{x:0,y:0,width:layer.clientWidth,height:layer.clientHeight}}}.property("content").cacheable(),parentViewDidResize:function(){this.contentLayoutDidChange()
},didUpdateLayer:function(){this.contentLayoutDidChange()},render:function(context,firstTime){var content=this.get("content");
if(content){context.push(content||"")}},touchStart:function(evt){evt.allowDefault();
return YES},touchEnd:function(evt){evt.allowDefault();return YES}});sc_require("views/segmented");
SC.TOP_LOCATION="top";SC.TOP_TOOLBAR_LOCATION="top-toolbar";SC.BOTTOM_LOCATION="bottom";
SC.TabView=SC.View.extend({classNames:["sc-tab-view"],displayProperties:["nowShowing"],nowShowing:null,items:[],isEnabled:YES,itemTitleKey:null,itemValueKey:null,itemIsEnabledKey:null,itemIconKey:null,itemWidthKey:null,itemToolTipKey:null,tabHeight:SC.REGULAR_BUTTON_HEIGHT,tabLocation:SC.TOP_LOCATION,userDefaultKey:null,_tab_nowShowingDidChange:function(){var v=this.get("nowShowing");
this.get("containerView").set("nowShowing",v);this.get("segmentedView").set("value",v);
return this}.observes("nowShowing"),_tab_saveUserDefault:function(){var v=this.get("nowShowing");
var defaultKey=this.get("userDefaultKey");if(defaultKey){SC.userDefaults.set([defaultKey,"nowShowing"].join(":"),v)
}}.observes("nowShowing"),_tab_itemsDidChange:function(){this.get("segmentedView").set("items",this.get("items"));
return this}.observes("items"),init:function(){arguments.callee.base.apply(this,arguments);
this._tab_nowShowingDidChange()._tab_itemsDidChange()},awake:function(){arguments.callee.base.apply(this,arguments);
var defaultKey=this.get("userDefaultKey");if(defaultKey){defaultKey=[defaultKey,"nowShowing"].join(":");
var nowShowing=SC.userDefaults.get(defaultKey);if(!SC.none(nowShowing)){this.set("nowShowing",nowShowing)
}}},createChildViews:function(){var childViews=[],view,containerView,layout,tabLocation=this.get("tabLocation"),tabHeight=this.get("tabHeight");
layout=(tabLocation===SC.TOP_LOCATION)?{top:tabHeight/2+1,left:0,right:0,bottom:0}:(tabLocation===SC.TOP_TOOLBAR_LOCATION)?{top:tabHeight+1,left:0,right:0,bottom:0}:{top:0,left:0,right:0,bottom:tabHeight-1};
containerView=this.containerView.extend(SC.Border,{layout:layout,borderStyle:SC.BORDER_BLACK,ariaRole:"tabpanel"});
view=this.containerView=this.createChildView(containerView);childViews.push(view);
layout=(tabLocation===SC.TOP_LOCATION||tabLocation===SC.TOP_TOOLBAR_LOCATION)?{height:tabHeight,left:0,right:0,top:0}:{height:tabHeight,left:0,right:0,bottom:0};
this.segmentedView=this.get("segmentedView").extend({layout:layout,_sc_tab_segmented_valueDidChange:function(){var pv=this.get("parentView");
if(pv){pv.set("nowShowing",this.get("value"))}this.set("layerNeedsUpdate",YES);this.invokeOnce(this.updateLayerIfNeeded)
}.observes("value"),init:function(){var pv=this.get("parentView");if(pv){SC._TAB_ITEM_KEYS.forEach(function(k){this[k]=pv.get(k)
},this)}return arguments.callee.base.apply(this,arguments)}});view=this.segmentedView=this.createChildView(this.segmentedView);
childViews.push(view);this.set("childViews",childViews);return this},containerView:SC.ContainerView.extend({renderDelegateName:"wellRenderDelegate"}),segmentedView:SC.SegmentedView});
SC._TAB_ITEM_KEYS="itemTitleKey itemValueKey itemIsEnabledKey itemIconKey itemWidthKey itemToolTipKey itemActionKey itemTargetKey".w();
SC.ThumbView=SC.View.extend({classNames:["sc-thumb-view"],isEnabled:YES,isEnabledBindingDefault:SC.Binding.bool(),prepareContext:function(context,firstTime){var splitView=this.get("splitView");
if(splitView){this.set("cursor",splitView.get("thumbViewCursor"))}return arguments.callee.base.apply(this,arguments)
},mouseDown:function(evt){if(!this.get("isEnabled")){return NO}var splitView=this.get("splitView");
return(splitView)?splitView.mouseDownInThumbView(evt,this):arguments.callee.base.apply(this,arguments)
},touchStart:function(evt){return this.mouseDown(evt)}});SC.WebView=SC.View.extend(SC.Control,{classNames:"sc-web-view",displayProperties:["value","shouldAutoResize"],shouldAutoResize:NO,render:function(context,firstTime){var src=this.get("value");
if(firstTime){context.push('<iframe src="'+src+'" style="position: absolute; width: 100%; height: 100%; border: 0px; margin: 0px; padding: 0px;"></iframe>')
}else{var iframe=this.$("iframe");iframe.attr("src","javascript:;");iframe.attr("src",src)
}},didCreateLayer:function(){var f=this.$("iframe");SC.Event.add(f,"load",this,this.iframeDidLoad)
},iframeDidLoad:function(){if(this.get("shouldAutoResize")===YES){var contentWindow;
var iframeElt=this.$("iframe")[0];if(iframeElt&&iframeElt.contentWindow){contentWindow=iframeElt.contentWindow;
if(contentWindow&&contentWindow.document&&contentWindow.document.documentElement){var docElement=contentWindow.document.documentElement;
if(!SC.browser.isIE){this.$().width(docElement.scrollWidth);this.$().height(docElement.scrollHeight)
}else{this.$().width(docElement.scrollWidth+12);this.$().height(docElement.scrollHeight+5)
}}}}}});SC.WELL_CONTAINER_PADDING=15;SC.WellView=SC.ContainerView.extend({classNames:"sc-well-view",contentLayout:{top:SC.WELL_CONTAINER_PADDING,bottom:SC.WELL_CONTAINER_PADDING,left:SC.WELL_CONTAINER_PADDING,right:SC.WELL_CONTAINER_PADDING},createChildViews:function(){var view=this.get("contentView");
if(view){view=this.contentView=this.createChildView(view);view.set("layout",this.contentLayout);
this.childViews=[view]}},renderDelegateName:"wellRenderDelegate",contentViewDidChange:function(){var view=this.get("contentView");
view.set("layout",this.contentLayout);this.replaceContent(view)}.observes("contentView")});