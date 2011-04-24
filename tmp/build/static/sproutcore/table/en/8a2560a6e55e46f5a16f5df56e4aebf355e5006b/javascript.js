SC.TableDelegate={isTableDelegate:YES,tableShouldResizeColumnTo:function(table,column,proposedWidth){var min=column.get("minWidth")||0,max=column.get("maxWidth")||proposedWidth;
proposedWidth=Math.max(min,proposedWidth);proposedWidth=Math.min(max,proposedWidth);
return proposedWidth},tableShouldResizeWidthTo:function(table,proposedWidth){var min=table.get("minWidth")||0,max=table.get("maxWidth")||proposedWidth;
proposedWidth=Math.max(min,proposedWidth);proposedWidth=Math.min(max,proposedWidth);
return proposedWidth}};SC.SORT_ASCENDING="ascending";SC.SORT_DESCENDING="descending";
SC.TableColumn=SC.Object.extend({key:null,title:null,width:100,minWidth:16,maxWidth:700,escapeHTML:NO,formatter:null,isVisible:YES,isFlexible:NO,isReorderable:YES,isSortable:YES,icon:null,tableHeader:null,sortState:null,tableContent:null});
sc_require("views/table");SC.TableHeaderView=SC.View.extend({classNames:["sc-table-header"],displayProperties:["sortState","isInDragMode"],acceptsFirstResponder:YES,isInDragMode:NO,hasHorizontalScroller:NO,hasVerticalScroller:NO,childViews:["dragModeView"],dragModeView:SC.ListView.extend({isVisible:NO,layout:{left:0,right:0,bottom:0},init:function(){arguments.callee.base.apply(this,arguments);
var tableHeaderView=this.get("parentView");if(tableHeaderView){tableHeaderView.addObserver("isInDragMode",this,"_scthv_dragModeDidChange")
}},_scthv_dragModeDidChange:function(){}}),column:null,render:function(context,firstTime){var column=this.get("column"),icon=column.get("icon"),html;
var span=context.begin("span");if(icon){html='<img src="%@" class="icon" />'.fmt(icon);
span.push(html)}else{span.push(this.get("label"))}span.end()},init:function(){arguments.callee.base.apply(this,arguments);
var column=this.get("column");column.addObserver("width",this,"_scthv_layoutDidChange");
column.addObserver("maxWidth",this,"_scthv_layoutDidChange");column.addObserver("minWidth",this,"_scthv_layoutDidChange");
column.addObserver("sortState",this,"_scthv_sortStateDidChange");column.addObserver("tableContent",this,"_scthv_tableContentDidChange")
},sortState:function(){return this.get("column").get("sortState")}.property(),mouseDown:function(evt){var tableView=this.get("tableView");
return tableView?tableView.mouseDownInTableHeaderView(evt,this):arguments.callee.base.apply(this,arguments)
},mouseUp:function(evt){var tableView=this.get("tableView");return tableView?tableView.mouseUpInTableHeaderView(evt,this):arguments.callee.base.apply(this,arguments)
},mouseDragged:function(evt){var tableView=this.get("tableView");return tableView?tableView.mouseDraggedInTableHeaderView(evt,this):arguments.callee.base.apply(this,arguments)
},_scthv_dragViewForHeader:function(){var dragLayer=this.get("layer").cloneNode(true);
var view=SC.View.create({layer:dragLayer,parentView:this});SC.$(dragLayer).css("backgroundColor","transparent").css("border","none").css("top",0).css("left",0);
return view},_scthv_enterDragMode:function(){this.set("isInDragMode",YES)},_scthv_exitDragMode:function(){this.set("isInDragMode",NO)
},_scthv_dragModeViewDidChange:function(){var dragModeView=this.get("dragModeView");
if(dragModeView&&dragModeView.set){dragModeView.set("tableHeadView",this);dragModeView.set("tableView",this.get("tableView"))
}}.observes("dragModeView"),_scthv_layoutDidChange:function(sender,key,value,rev){var pv=this.get("parentView");
pv.invokeOnce(pv.layoutChildViews);var layout=this.get("layout")},_scthv_tableContentDidChange:function(){var tableContent=this.get("column").get("tableContent");
var columnContent=this.get("parentView")._scthv_columnContentFromTableContent(tableContent,this.get("columnIndex"));
this.set("content",columnContent)},_scthv_sortStateDidChange:function(){SC.RunLoop.begin();
var sortState=this.get("column").get("sortState");var classNames=this.get("classNames");
classNames.removeObject("sc-table-header-sort-asc");classNames.removeObject("sc-table-header-sort-desc");
classNames.removeObject("sc-table-header-sort-active");if(sortState!==null){classNames.push("sc-table-header-sort-active")
}if(sortState===SC.SORT_ASCENDING){classNames.push("sc-table-header-sort-asc")}if(sortState===SC.SORT_DESCENDING){classNames.push("sc-table-header-sort-desc")
}this.displayDidChange();this.invokeOnce("updateLayer");SC.RunLoop.end()}});sc_require("views/table");
sc_require("views/table_header");SC.TableHeadView=SC.View.extend({layout:{height:18,left:0,right:0,top:0},classNames:["sc-table-head"],cells:[],acceptsFirstResponder:YES,dragOrder:null,init:function(){arguments.callee.base.apply(this,arguments);
this._scthv_handleChildren()},columns:function(){return this.get("parentView").get("columns")
}.property(),renderChildViews:function(context,firstTime){var cells=this.get("cells"),cell,idx;
for(idx=0;idx<cells.get("length");idx++){cell=cells.objectAt(idx);context=context.begin(cell.get("tagName"));
cell.prepareContext(context,firstTime);context=context.end()}return context},layoutChildViews:function(){var cells=this.get("cells"),cell,idx;
for(idx=0;idx<cells.get("length");idx++){cell=cells.objectAt(idx);cell.adjust(this._scthv_layoutForHeaderAtColumnIndex(idx));
cell.updateLayout()}},_scthv_enterDragMode:function(){var order=[],columns=this.get("columns"),idx;
for(idx=0;idx<columns.get("length");idx++){order.push(columns.objectAt(idx).get("key"))
}this.set("dragOrder",order)},_scthv_changeDragOrder:function(draggedColumnIndex,leftOfIndex){var dragOrder=this.get("dragOrder"),draggedColumn=dragOrder.objectAt(draggedColumnIndex);
dragOrder.removeAt(idx);dragOrder.insertAt(leftOfIndex,draggedColumn)},_scthv_reorderDragColumnViews:function(){}.observes("dragOrder"),_scthv_columnContentFromTableContent:function(tableContent,columnIndex){var column=this.get("columns").objectAt(columnIndex),key=column.get("key"),ret=[],idx;
if(!tableContent){return ret}var tableView=this.get("parentView"),length=tableContent.get("length");
for(idx=0;idx<length;idx++){ret.push(tableContent.objectAt(idx).get(key))}return ret
},_scthv_layoutForHeaderAtColumnIndex:function(index){var columns=this.get("columns"),rowHeight=this.get("parentView").get("rowHeight"),layout={},left=0,idx;
for(idx=0;idx<index;idx++){left+=columns.objectAt(idx).get("width")}return{left:left,width:columns.objectAt(index).get("width"),height:rowHeight}
},_scthv_handleChildren:function(){var columns=this.get("columns");var tableView=this.get("parentView");
var tableContent=tableView.get("content");var column,key,label,content,cells=[],cell,idx;
for(idx=0;idx<columns.get("length");idx++){column=columns.objectAt(idx);key=column.get("key");
label=column.get("label");content=this._scthv_columnContentFromTableContent(tableContent,idx);
cell=this._scthv_createTableHeader(column,label,content,idx);cells.push(cell)}this.set("cells",cells);
if(cells.length>0){this.replaceAllChildren(cells)}},_scthv_createTableHeader:function(column,label,content,idx){var tableView=this.get("parentView");
var cell=SC.TableHeaderView.create({column:column,label:label,content:content,tableView:tableView,columnIndex:idx});
return cell}});sc_require("mixins/table_delegate");sc_require("views/table_head");
SC.TableView=SC.ListView.extend(SC.TableDelegate,{classNames:["sc-table-view"],childViews:"tableHeadView scrollView".w(),scrollView:SC.ScrollView.extend({isVisible:YES,layout:{left:-1,right:0,bottom:0,top:19},hasHorizontalScroller:NO,borderStyle:SC.BORDER_NONE,contentView:SC.View.extend({}),_sv_offsetDidChange:function(){this.get("parentView")._sctv_scrollOffsetDidChange()
}.observes("verticalScrollOffset","horizontalScrollOffset")}),hasHorizontalScroller:NO,hasVerticalScroller:NO,selectOnMouseDown:NO,containerView:function(){var scrollView=this.get("scrollView");
return(scrollView&&scrollView.get)?scrollView.get("contentView"):null}.property("scrollView"),layout:{left:0,right:0,top:0,bottom:0},init:function(){arguments.callee.base.apply(this,arguments);
window.table=this},canReorderContent:NO,isInDragMode:NO,mouseDownInTableHeaderView:function(evt,header){var column=header.get("column");
if(!column.get("isReorderable")&&!column.get("isSortable")){return NO}this._mouseDownEvent=evt;
this._mouseDownTimer=SC.Timer.schedule({target:this,action:"_scthv_enterDragMode",interval:300});
return YES},mouseUpInTableHeaderView:function(evt,header){var isInDragMode=this.get("isInDragMode");
if(!isInDragMode){var column=header.get("column");this.set("sortedColumn",column);
var sortState=column.get("sortState");var newSortState=sortState===SC.SORT_ASCENDING?SC.SORT_DESCENDING:SC.SORT_ASCENDING;
column.set("sortState",newSortState)}this._dragging=false;if(this._mouseDownTimer){this._mouseDownTimer.invalidate()
}},mouseDraggedInTableHeaderView:function(evt,header){SC.RunLoop.begin();var isInDragMode=this.get("isInDragMode");
if(!isInDragMode){return NO}if(!this._dragging){SC.Drag.start({event:this._mouseDownEvent,source:header,dragView:this._scthv_dragViewForHeader(),ghost:YES});
this._dragging=true}return arguments.callee.base.apply(this,arguments);SC.RunLoop.end()
},columns:[],flexibleColumn:null,sortedColumn:null,hasTableHead:YES,tableHeadView:SC.TableHeadView.extend({layout:{top:0,left:0,right:0}}),tableHeadHeight:18,hasUniformRowHeights:YES,rowHeight:18,exampleView:SC.TableRowView,isInColumnDragMode:NO,filterKey:null,rowOffsetForContentIndex:function(contentIndex){var top=0,idx;
if(this.get("hasUniformRowHeights")){return top+(this.get("rowHeight")*contentIndex)
}else{for(idx=0;idx<contentIndex;i++){top+=this.rowHeightForContentIndex(idx)}return top
}},rowHeightForContentIndex:function(contentIndex){if(this.get("hasUniformRowHeights")){return this.get("rowHeight")
}else{}},layoutForContentIndex:function(index){return{top:this.rowOffsetForContentIndex(index),height:this.rowHeightForContentIndex(index),left:0,right:0}
},createItemView:function(exampleClass,idx,attrs){attrs.tableView=this;return exampleClass.create(attrs)
},clippingFrame:function(){var cv=this.get("containerView"),sv=this.get("scrollView"),f=this.get("frame");
if(!sv.get){return f}return{height:f.height,width:f.width,x:sv.get("horizontalScrollOffset"),y:sv.get("verticalScrollOffset")}
}.property("frame","content").cacheable(),_sctv_scrollOffsetDidChange:function(){this.notifyPropertyChange("clippingFrame")
},computeLayout:function(){var layout=arguments.callee.base.apply(this,arguments),containerView=this.get("containerView"),frame=this.get("frame");
var minHeight=layout.minHeight;delete layout.minHeight;containerView.adjust("minHeight",minHeight);
containerView.layoutDidChange();this.notifyPropertyChange("clippingFrame");return layout
},_sctv_columnsDidChange:function(){var columns=this.get("columns"),content=this.get("content"),idx;
for(idx=0;idx<columns.get("length");idx++){columns.objectAt(idx).set("tableContent",content)
}this.get("tableHeadView")._scthv_handleChildren();this.reload()}.observes("columns"),_sctv_adjustColumnWidthsOnResize:function(){var width=this.get("frame").width;
var content=this.get("content"),del=this.delegateFor("isTableDelegate",this.delegate,content);
if(this.get("columns").length==0){return}width=del.tableShouldResizeWidthTo(this,width);
var columns=this.get("columns"),totalColumnWidth=0,idx;for(var idx=0;idx<columns.length;
idx++){totalColumnWidth+=columns.objectAt(idx).get("width")}if(width===0){width=totalColumnWidth
}var flexibleColumn=this.get("flexibleColumn")||this.get("columns").objectAt(this.get("columns").length-1);
var flexibleWidth=flexibleColumn.get("width")+(width-totalColumnWidth);flexibleColumn.set("width",flexibleWidth)
}.observes("frame"),_sctv_sortContent:function(){var sortedColumn=this.get("sortedColumn");
var sortKey=sortedColumn.get("key");this.set("orderBy",sortKey)},_sctv_sortedColumnDidChange:function(){var columns=this.get("columns"),sortedColumn=this.get("sortedColumn"),column,idx;
for(idx=0;idx<columns.get("length");idx++){column=columns.objectAt(idx);if(column!==sortedColumn){column.set("sortState",null)
}}this.invokeOnce("_sctv_sortContent")}.observes("sortedColumn")});SC.TableRowView=SC.View.extend({classNames:["sc-table-row"],cells:[],acceptsFirstResponder:YES,tableView:null,init:function(){arguments.callee.base.apply(this,arguments);
this._sctrv_handleChildren()},columns:function(){return this.get("tableView").get("columns")
}.property(),prepareContext:function(context,firstTime){arguments.callee.base.apply(this,arguments);
context.setClass("sel",this.get("isSelected"))},render:function(context,firstTime){var classArray=[];
classArray.push((this.get("contentIndex")%2===0)?"even":"odd");context.addClass(classArray);
arguments.callee.base.apply(this,arguments)},renderChildViews:function(context,firstTime){var cells=this.get("cells"),cell,idx;
for(idx=0;idx<cells.get("length");idx++){cell=cells.objectAt(idx);context=context.begin(cell.get("tagName"));
cell.prepareContext(context,firstTime);context=context.end()}return context},layoutChildViews:function(){var cells=this.get("cells"),columns=this.get("columns"),cell,column,idx;
var left=0,width,rowHeight=this.get("tableView").get("rowHeight");for(idx=0;idx<cells.get("length");
idx++){cell=cells.objectAt(idx);column=columns.objectAt(idx);width=column.get("width");
cell.adjust({left:left,width:width,height:rowHeight});left+=width;cell.updateLayout()
}},_sctrv_layoutForChildAtColumnIndex:function(index){var columns=this.get("columns"),rowHeight=this.get("tableView").get("rowHeight"),layout={},left=0,idx;
for(idx=0;idx<index;idx++){left+=columns.objectAt(idx).get("width")}return{left:left,width:columns.objectAt(index).get("width"),height:rowHeight}
},_sctrv_createTableCell:function(column,value){var cell=SC.TableCellView.create({column:column,content:value});
return cell},_sctrv_handleSelection:function(){this.displayDidChange()}.observes("isSelected"),_sctrv_handleChildren:function(){var content=this.get("content"),columns=this.get("columns");
this.removeAllChildren();var column,key,value,cells=[],cell,idx;for(idx=0;idx<columns.get("length");
idx++){column=columns.objectAt(idx);key=column.get("key");value=content?content.getPath(key):"";
cell=this._sctrv_createTableCell(column,value);cells.push(cell);this.appendChild(cell)
}this.set("cells",cells)}});sc_require("views/table_row");SC.TableCellView=SC.View.extend({classNames:["sc-table-cell"],column:null,escapeHTMLBinding:SC.Binding.oneWay(".column.escapeHTML"),formatter:SC.Binding.oneWay(".column.formatter"),displayValue:function(){var value=this.get("content");
var formatter=this.get("column").get("formatter");if(formatter){var formattedValue=(SC.typeOf(formatter)===SC.T_FUNCTION)?formatter(value,this):formatter.fieldValueForObject(value,this);
if(!SC.none(formattedValue)){value=formattedValue}}if(SC.typeOf(value)===SC.T_ARRAY){var ary=[];
for(var idx=0;idx<value.get("length");idx++){var x=value.objectAt(idx);if(!SC.none(x)&&x.toString){x=x.toString()
}ary.push(x)}value=ary.join(",")}if(!SC.none(value)&&value.toString){value=value.toString()
}if(this.get("escapeHTML")){value=SC.RenderContext.escapeHTML(value)}return value
}.property("content","escapeHTML","formatter").cacheable(),render:function(context,firstTime){context.push(this.get("displayValue"))
},init:function(){arguments.callee.base.apply(this,arguments);var column=this.get("column");
column.addObserver("width",this,"_sctcv_layoutDidChange");column.addObserver("maxWidth",this,"_sctcv_layoutDidChange");
column.addObserver("minWidth",this,"_sctcv_layoutDidChange")},_sctcv_layoutDidChange:function(sender,key,value,rev){var pv=this.get("parentView");
SC.run(function(){pv.layoutChildViews()})}});