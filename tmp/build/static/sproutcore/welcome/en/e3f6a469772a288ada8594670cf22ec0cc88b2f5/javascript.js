SC.stringsFor("English",{});Welcome=SC.Object.create({NAMESPACE:"Welcome",VERSION:"1.0.0",store:SC.Store.create().from("CoreTools.DataSource"),displayTitle:function(){var hostname=(window.location.hostname||"localhost").toString();
return hostname.match(/sproutcore\.com/)?"SproutCore Demos".loc():"SproutCore Developer Tools"
}.property().cacheable()});if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]
}CHANCE_SLICES=CHANCE_SLICES.concat([]);Welcome.targetsController=SC.ArrayController.create({reload:function(){var targets=Welcome.store.find(CoreTools.TARGETS_QUERY);
this.set("content",targets)},appsOnly:function(){return this.filter(function(t){return(t.get("kind")==="app")&&(t.get("name")!=="/sproutcore/welcome")
})}.property("[]").cacheable(),loadApplication:function(){var app=this.get("selection").firstObject(),url=app?app.get("appUrl"):null;
if(url){this.set("canLoadApp",NO);this.invokeLater(function(){window.location.href=url
})}},launchEnabled:function(){var canLoadApp=this.get("canLoadApp"),selection=this.get("selection"),selectedObject=selection.firstObject();
return canLoadApp&&selectedObject&&selectedObject.get("name")!=="/sproutcore"}.property("canLoadApp","selection").cacheable(),canLoadApp:YES,allowsEmptySelection:NO,allowsMultipleSelection:NO});
Welcome.mainPage=SC.Page.design({mainPane:SC.MainPane.design({childViews:"contentView".w(),contentView:SC.View.design({layout:{width:280,height:340,centerX:0,centerY:0},childViews:"heading appSelector launchApplication".w(),heading:SC.View.design({layout:{width:271,centerX:0,top:0,height:60},tagName:"img",render:function(context,firstTime){context.attr("src","/static/sproutcore/foundation/en/5ccade3c5a829d178854ebc306da507944ad38a9/source/images/sproutcore.png")
}}),appSelector:SC.View.design({layout:{top:80,left:0,right:0,bottom:46},childViews:"scrollView".w(),classNames:"app-selector",scrollView:SC.ScrollView.design({layout:{left:0,top:0,right:0,bottom:0},hasHorizontalScroller:NO,contentView:SC.ListView.design({rowHeight:40,contentBinding:"Welcome.targetsController.appsOnly",selectionBinding:"Welcome.targetsController.selection",isEnabledBinding:"Welcome.targetsController.canLoadApp",contentValueKey:"displayName",contentIconKey:"targetIcon",hasContentIcon:YES,target:"Welcome.targetsController",action:"loadApplication"})})}),launchApplication:SC.ButtonView.design({layout:{bottom:0,height:30,width:160,centerX:0},isEnabledBinding:"Welcome.targetsController.launchEnabled",controlSize:SC.HUGE_CONTROL_SIZE,title:"Launch Application",isDefault:YES,target:"Welcome.targetsController",action:"loadApplication"})})})});
Welcome.main=function main(){Welcome.getPath("mainPage.mainPane").append();Welcome.targetsController.reload()
};function main(){Welcome.main()};