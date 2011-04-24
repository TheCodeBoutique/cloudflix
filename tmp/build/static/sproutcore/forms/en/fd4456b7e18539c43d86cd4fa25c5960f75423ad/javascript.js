SC.stringsFor("English",{});if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]
}CHANCE_SLICES=CHANCE_SLICES.concat([]);SC.FormsEditMode={hasEditMode:YES,isEditing:NO,editModeDidChange:function(){this._propagateEditMode()
}.observes("isEditing"),_scfem_childViewsDidChange:function(){this._propagateEditMode()
}.observes("childViews"),_propagateEditMode:function(){var isEditing=this.get("isEditing");
var cv=this.get("childViews"),idx,len=cv.length,v;for(idx=0;idx<len;idx++){v=cv[idx];
if(SC.typeOf(v)===SC.T_STRING||v.isClass){return}if(v.get("hasEditMode")){v.set("isEditing",isEditing)
}}}};SC.CalculatesEmptiness={hasCalculatesEmptiness:YES,isValue:YES,isValueEmpty:YES,_SCCE_childrenAreEmpty:YES,isEditingAffectsIsEmpty:YES,_SCCE_isEditingDidChange:function(){if(this.get("isEditingAffectsIsEmpty")){this.propertyDidChange("isEmpty")
}}.observes("isEditing"),isEmpty:function(){return !this.get("isValue")||!this.get("isVisible")||((!this.get("isEditingAffectsIsEmpty")||!this.get("isEditing"))&&this.get("isValueEmpty")&&this.get("_SCCE_childrenAreEmpty"))
}.property("isValueEmpty","isVisible","_SCCE_childrenAreEmpty").cacheable(),_SCCE_isEmptyDidChange:function(){var parentView=this.get("parentView");
if(parentView&&parentView._SCCE_emptinessDidChangeFor){parentView._SCCE_emptinessDidChangeFor(this)
}}.observes("isEmpty"),initMixin:function(){this._SCCE_emptinessDidChangeFor()},_SCCE_emptinessDidChangeFor:function(child){this.invokeOnce("_SCCE_recalculateChildrensEmptiness")
},_SCCE_recalculateChildrensEmptiness:function(){var views=this.get("childViews");
var empty=YES,len=views.length,field;for(var i=0;i<len;i++){field=views[i];if(!field.get("isEmpty")){empty=NO;
break}}this.setIfChanged("_SCCE_childrenAreEmpty",empty)}};SC.BaseTheme.formRenderDelegate=SC.RenderDelegate.create({name:"form",render:function(){},update:function(){}});
SC.BaseTheme.FORM_FLOW_SPACING={left:5,top:5,bottom:5,right:5};SC.BaseTheme.formRowRenderDelegate=SC.RenderDelegate.create({name:"form-row",render:function(context){},update:function(){}});
SC.BaseTheme.FORM_ROW_FLOW_SPACING={right:15,left:0,top:0,bottom:0};SC.BaseTheme.FORM_ROW_FLOW_PADDING={left:0,right:0,bottom:0,top:0};
require("mixins/emptiness");require("mixins/edit_mode");SC.FormRowView=SC.View.extend(SC.FlowedLayout,SC.CalculatesEmptiness,SC.FormsEditMode,{renderDelegateName:"formRowRenderDelegate",layout:{left:0,width:0},rowFlowSpacing:undefined,rowFlowPadding:undefined,fillWidth:YES,defaultFlowSpacing:function(){return this.getThemedProperty("rowFlowSpacing","FORM_ROW_FLOW_SPACING")
}.property("rowFlowSpacing","theme"),flowPadding:function(){return this.getThemedProperty("rowFlowPadding","FORM_ROW_FLOW_PADDING")
}.property("rowFlowPadding","theme"),classNames:["sc-form-row-view"],isFormRow:YES,label:"",rowLabelSize:0,rowLabelMeasuredSize:0,shouldMeasureLabel:YES,hasRowLabel:YES,labelView:null,layoutDirection:SC.LAYOUT_HORIZONTAL,createChildViews:function(){var cv=SC.clone(this.get("childViews"));
if(this.labelView.isClass){this.labelView=this.createChildView(this.labelView,{value:this.get("label")});
this.labelView.addObserver("measuredSize",this,"labelSizeDidChange");this.labelView.bind("shouldMeasureSize",this,"shouldMeasureLabel");
this.get("childViews").unshift(this.labelView)}var content=this.get("content");arguments.callee.base.apply(this,arguments);
var idx,len=cv.length,key,v;for(idx=0;idx<len;idx++){key=cv[idx];if(SC.typeOf(key)===SC.T_STRING){v=this.get(key);
if(v&&!v.isClass){if(!v.get("contentValueKey")){if(key==="_singleField"){v.set("contentValueKey",this.get("contentValueKey"))
}else{v.set("contentValueKey",key)}}if(!v.get("content")){v.bind("content",".owner.content")
}}}}this.rowLabelSizeDidChange()},labelDidChange:function(){this.get("labelView").set("value",this.get("label"))
}.observes("label"),labelSizeDidChange:function(){var size=this.get("labelView").get("measuredSize");
this.set("rowLabelMeasuredSize",size.width);var pv=this.get("parentView");if(pv&&pv.get("isRowDelegate")){pv.rowLabelMeasuredSizeDidChange(this,size)
}},rowLabelSizeDidChange:function(){this.get("labelView").adjust({width:this.get("rowLabelSize")})
}.observes("rowLabelSize")});SC.FormRowView.mixin({row:function(label,fieldType,ext){if(label.isClass){ext=fieldType;
fieldType=label;label=null}if(!ext){ext={}}else{ext=SC.clone(ext)}ext.label=label;
ext.childViews=["_singleField"];ext._singleField=fieldType;return ext},LabelView:SC.LabelView.extend(SC.AutoResize,SC.CalculatesEmptiness,{shouldAutoResize:NO,layout:{left:0,top:0,width:0,height:18},fillHeight:YES,classNames:["sc-form-label"],isValue:NO})});
SC.FormRowView.prototype.labelView=SC.FormRowView.LabelView.design();require("mixins/emptiness");
require("mixins/edit_mode");require("views/form_row");SC.FormView=SC.View.extend(SC.FlowedLayout,SC.CalculatesEmptiness,SC.FormsEditMode,{layoutDirection:SC.LAYOUT_VERTICAL,canWrap:NO,renderDelegateName:"formRenderDelegate",formFlowSpacing:undefined,formFlowSpacingDefault:{left:5,top:5,bottom:5,right:5},defaultFlowSpacing:function(){return this.getThemedProperty("formFlowSpacing","FORM_FLOW_SPACING")
}.property("formFlowSpacing","theme"),classNames:["sc-form-view"],editsByDefault:YES,firstKeyView:null,lastKeyView:null,content:null,exampleRow:SC.FormRowView.extend({labelView:SC.FormRowView.LabelView.extend({textAlign:SC.ALIGN_RIGHT})}),init:function(){if(this.get("editsByDefault")){this.set("isEditing",YES)
}arguments.callee.base.apply(this,arguments)},createChildViews:function(){var cv=SC.clone(this.get("childViews"));
var idx,len=cv.length,key,v,exampleRow=this.get("exampleRow");for(idx=0;idx<len;idx++){key=cv[idx];
if(SC.typeOf(key)===SC.T_STRING){v=this.get(key);if(v&&!v.isClass&&SC.typeOf(v)===SC.T_HASH){this[key]=exampleRow.extend(v)
}}}for(idx=0;idx<len;idx++){key=cv[idx];if(SC.typeOf(key)===SC.T_STRING){v=this.get(key);
if(v.isClass&&v.prototype.isControl&&!v.prototype.contentValueKey&&v.prototype.isFormRow){v.prototype.contentValueKey=key
}else{v.prototype.formKey=key}}}var content=this.get("content");arguments.callee.base.apply(this,arguments);
for(idx=0;idx<len;idx++){key=cv[idx];if(SC.typeOf(key)===SC.T_STRING){v=this.get(key);
if(v&&!v.isClass&&v.isFormRow){if(!v.get("content")){if(v.get("isControl")){v.bind("content",".owner.content")
}else{v.bind("content",".owner.content."+key)}}if(this.get("labelWidth")!==null){v.set("shouldMeasureLabel",NO)
}if(v.get("isFormRow")&&SC.none(v.get("label"))){v.set("label",key.humanize().titleize())
}}}}this._hasCreatedRows=YES;this.recalculateLabelWidth()},isRowDelegate:YES,labelWidth:null,labelWidthDidChange:function(){var childViews=this.get("childViews"),i,len=childViews.length,shouldMeasure=SC.none(this.get("labelWidth"));
for(i=0;i<len;i++){childViews[i].set("shouldMeasureLabel",shouldMeasure)}this.recalculateLabelWidth()
}.observes("labelWidth"),recalculateLabelWidth:function(){if(!this._hasCreatedRows){return
}var ret=this.get("labelWidth"),children=this.get("childViews"),idx,len=children.length,child;
if(ret===null){ret=0;for(idx=0;idx<len;idx++){child=children[idx];if(child.get("rowLabelMeasuredSize")){ret=Math.max(child.get("rowLabelMeasuredSize"),ret)
}}}if(this._rowLabelSize!==ret){this._rowLabelSize=ret;for(idx=0;idx<len;idx++){child=children[idx];
if(child.get("hasRowLabel")){child.set("rowLabelSize",ret)}}}},rowLabelMeasuredSizeDidChange:function(row,labelSize){this.invokeOnce("recalculateLabelWidth")
}});SC.mixin(SC.FormView,{row:function(optionalClass,properties,rowExt){return SC.FormRowView.row(optionalClass,properties,rowExt)
},field:function(fieldClass,properties){return SC.FormFieldView.field(fieldClass,properties)
}});