if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]}CHANCE_SLICES=CHANCE_SLICES.concat([]);
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
}});