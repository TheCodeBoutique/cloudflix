Cloudflix=SC.Application.create({NAMESPACE:"Cloudflix",VERSION:"0.1.0",store:SC.Store.create({commitRecordsAutomatically:YES}).from("Cloudflix.MostPopularDataSource"),device:SC.device.addObserver("orientation",this,function(){var or=SC.device.get("orientation");
console.log(or);if(or==="portrait"){Cloudflix.motionController.set("isInPortrait",true)
}else{}})});if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]}CHANCE_SLICES=CHANCE_SLICES.concat([]);
Cloudflix.mostPopularController=SC.ArrayController.create({});Cloudflix.motionController=SC.ObjectController.create({orientation:"",isInPortrait:false,_orientationHasChanged:function(){var or=this.get("orientation");
var isPort=this.get("isInPortrait");if(or==="landscape"){Cloudflix.mainPage.mainPane.splitView.rightPanel.testButton.animate("left",220,{duration:0.2,timing:"ease-in-out"});
Cloudflix.mainPage.mainPane.splitView.rightPanel.mostPopular.animate("left",251,{duration:0.5,timing:"ease-in-out"})
}else{if(or==="portrait"){console.log("animation port firing..");isPort=true;Cloudflix.mainPage.mainPane.splitView.rightPanel.testButton.animate("left",0,{duration:0.2,timing:"ease-in-out"});
Cloudflix.mainPage.mainPane.splitView.rightPanel.mostPopular.animate("left",0,{duration:0.5,timing:"ease-in-out"})
}else{if(isPort===true){Cloudflix.mainPage.mainPane.splitView.rightPanel.testButton.animate("left",0,{duration:0.2,timing:"ease-in-out"});
Cloudflix.mainPage.mainPane.splitView.rightPanel.mostPopular.animate("left",0,{duration:0.5,timing:"ease-in-out"})
}}}}.observes("orientation")});Cloudflix.MostPopular=SC.Record.extend({primaryKey:"id",title:SC.Record.attr(String),url:SC.Record.attr(String),poster:SC.Record.attr(String),exclusive:SC.Record.attr(String),hd:SC.Record.attr(String),itunesurl:SC.Record.attr(String),showtimesurl:SC.Record.attr(String),});
sc_require("models/most_popular");popResultsQuery=SC.Query.remote(Cloudflix.MostPopular);
Cloudflix.MostPopularDataSource=SC.DataSource.extend({fetch:function(store,query){if(query===popResultsQuery){SC.Request.getUrl("/most_pop").json().notify(this,"fetchDidComplete",store,query).send();
return YES}return NO},fetchDidComplete:function(response,store,query){var data;if(SC.ok(response)){data=response.get("body");
var storeKeys=store.loadRecords(Cloudflix.MostPopular,response.get("body"));Cloudflix.mostPopularController.set("content",data);
store.loadQueryResults(query,storeKeys)}else{store.dataSourceDidErrorQuery(query,response)
}},retrieveRecord:function(store,storeKey){return NO},createRecord:function(store,storeKey){return NO
},updateRecord:function(store,storeKey){return NO},destroyRecord:function(store,storeKey){return NO
}});SC.mixin(Cloudflix,{statechart:Ki.Statechart.create({rootState:Ki.State.design({initialSubstate:"loading",loading:Ki.State.design({enterState:function(){console.log("loading...");
this.loadContent();this.invokeLater(this.checkingOrientation,1200)},loadContent:function(){},checkingOrientation:function(){console.log("checking orientation...");
Cloudflix.getPath("mainPage.mainPane").append();this.detectBrowser();var isPort=Cloudflix.motionController.get("isInPortrait");
if(isPort===true){Cloudflix.mainPage.mainPane.splitView.rightPanel.testButton.animate("left",0,{duration:0.5,timing:"ease-in-out"})
}else{Cloudflix.mainPage.mainPane.splitView.rightPanel.testButton.animate("left",220,{duration:0.5,timing:"ease-in-out"})
}device:SC.device.addObserver("orientation",this,function(){var or=SC.device.get("orientation");
console.log(or);if(or==="landscape"){Cloudflix.motionController.set("orientation",or)
}else{Cloudflix.motionController.set("orientation",or)}})},detectBrowser:function(){var browser=SC.browser.current;
var iPadBrowser=SC.browser.isiPad;console.log(browser+" = current Browser");console.log(iPadBrowser+" = iPadBrowser");
if(iPadBrowser===true){console.log("it is ipad");Cloudflix.mainPage.mainPane.splitView.rightPanel.mostPopular.contentView.animate("width",10850,{duration:0.5,timing:"ease-in-out"})
}}}),Exit:Ki.State.design({enterState:function(){console.log("EEEE")}}),SignUp:Ki.State.design({enterState:function(){console.log("SSSS")
},exit:function(){this.gotoState("Exit")},goToProfileState:function(){this.gotoState("Profile")
}}),Profile:Ki.State.design({enterState:function(){console.log("PPPP")},nextFunction:function(){}}),Contact:Ki.State.design({enterState:function(){},nextFunction:function(){}})})})});
Cloudflix.Theme=SC.AceTheme.create({name:"cloudflix"});SC.Theme.addTheme(Cloudflix.Theme);
SC.defaultTheme="cloudflix";var p=0;var i=0;Cloudflix.CustomGrid=SC.View.extend({content:null,displayProperties:"isSelected".w(),createChildViews:function(){var childViews=[];
var content=this.get("content");var selection=this.get("selection");var newTitle=content.title;
var posterImages=content.poster;var xLargeImage=posterImages.replace("/poster","/poster-xlarge");
if(SC.none(content)){return}var background=this.createChildView(SC.View.design({classNames:["trail"],layout:{top:10,bottom:10,right:10,left:10},}));
childViews.push(background);var title=this.createChildView(SC.LabelView.design({layout:{bottom:20,height:24,left:10,width:200},controlSize:SC.AUTO_CONTROL_SIZE,fontWeight:SC.BOLD_WEIGHT,escapeHTML:NO,isTextSelectable:YES,value:newTitle,}));
var poster=this.createChildView(SC.ImageView.design({classNames:["poster"],layout:{top:30,bottom:50,right:20,left:20},useImageQueue:NO,value:xLargeImage,}));
childViews.push(poster);var add=this.createChildView(SC.ButtonView.design({layout:{bottom:20,height:24,right:25,width:70},controlSize:SC.SMALL_CONTROL_SIZE,content:content,title:"Add",action:"addTrailer",addTrailer:function(){var tmp=this.get("content");
var newDirectors=content.directors;var newGenre=content.genre;var newLocation=content.location;
var newMoviesite=content.moviesite;var newPoster=content.poster;var newRating=content.rating;
var newReleasedate=content.releasedate;var newStudio=content.studio;var newTitle=content.title;
var newTrailers=content.trailers;i++;Cloudflix.trailerPlayer.set("playQueue",i);Cloudflix.trailerPlayer.sendChangesToServer("playQueue");
var add=SC.Object.create({directors:newDirectors,genre:newGenre,location:newLocation,moviesite:newMoviesite,poster:newPoster,rating:newRating,releasedate:newReleasedate,studio:newStudio,title:newTitle,trailers:newTrailers,});
Cloudflix.Queue.push(add);Cloudflix.trailerPlayer.invokeLast(function(){this.set("content",[add])
})}}));childViews.push(add);var play=this.createChildView(SC.ButtonView.design({layout:{bottom:20,height:24,left:20,width:70},title:"Play",controlSize:SC.SMALL_CONTROL_SIZE,content:content,action:"viewTrailer",isDefault:YES,}));
childViews.push(play);this.set("childViews",childViews)}});var p=0;var i=0;Cloudflix.MostPopGrid=SC.ListView.extend({itemsPerRow:function(){var rowHeight=this.get("rowHeight");
var frame=this.get("frame");var content=Cloudflix.mostPopularController.get("content");
var totalContent=content.length;var newWdith=frame.width+=1200;return totalContent
}.property("totalContent").cacheable(),contentIndexesInRect:function(rect){var rowHeight=this.get("rowHeight")||48;
var itemsPerRow=this.get("itemsPerRow");var min=Math.floor(SC.minY(rect)/rowHeight)*itemsPerRow;
var max=Math.ceil(SC.maxY(rect)/rowHeight)*itemsPerRow;return SC.IndexSet.create(min,max)
},layoutForContentIndex:function(contentIndex){var rowHeight=this.get("rowHeight")||48;
var clippingFrame=this.get("clippingFrame");var f=this.get("frame");var frameWidth=this.get("clippingFrame").width;
var itemsPerRow=this.get("itemsPerRow");var columnWidth=Math.floor(frameWidth/itemsPerRow)*15;
var row=Math.floor(contentIndex/itemsPerRow);var col=contentIndex-(itemsPerRow*row);
return{left:col*columnWidth,top:row*rowHeight,height:rowHeight,width:columnWidth,}
},_gv_clippingFrameDidChange:function(){var nowShowing=this.get("nowShowing");var itemView;
var idx;var len;this.notifyPropertyChange("itemsPerRow");len=nowShowing.get("length");
for(idx=0;idx<len;idx++){itemView=this.itemViewForContentIndex(idx);itemView.adjust(this.layoutForContentIndex(idx))
}}.observes("clippingFrame"),computeLayout:function(){var content=Cloudflix.mostPopularController.get("content");
var count=(content)?content.get("length"):0;var rowHeight=this.get("rowHeight")||48;
var itemsPerRow=this.get("itemsPerRow");var rows=Math.ceil(count/itemsPerRow);var ret=this._cachedLayoutHash;
if(!ret){ret=this._cachedLayoutHash={}}ret.minHeight=rows*rowHeight;this.calculatedHeight=ret.minHeight;
return ret},});Cloudflix.mainPage=SC.Page.design({mainPane:SC.MainPane.design({defaultResponder:Cloudflix.statechart,classNames:["base-view"],childViews:"splitView".w(),splitView:SC.View.design({layout:{top:0,left:0,bottom:0,right:0},childViews:"leftPanel rightPanel".w(),leftPanel:SC.View.design({classNames:["left-view"],layout:{left:0,right:780,top:0,bottom:0},backgroundColor:"white",childViews:"topToolBar".w(),topToolBar:SC.ToolbarView.design({classNames:["toolbar-left"],layout:{top:0,left:0,right:0,height:34},anchorLocation:SC.ANCHOR_TOP,childViews:"toolbarSplit".w(),toolbarSplit:SC.ImageView.design({classNames:["line"],layout:{top:0,right:0,bottom:0,width:2},useImageQueue:NO}),})}),rightPanel:SC.View.design({classNames:["right-view"],backgroundColor:"gray",autoResizeStyle:SC.RESIZE_AUTOMATIC,childViews:"topToolBar testButton mostPopular".w(),mostPopular:SC.ScrollView.design({alwaysBounceVertical:NO,autohidesHorizontalScroller:NO,hasVerticalScroller:NO,borderStyle:SC.BORDER_NONE,layout:{top:35,height:210,left:251,right:0},contentView:SC.View.design({layout:{top:0,bottom:0,width:14400,left:0},childViews:"contentView".w(),contentView:Cloudflix.MostPopGrid.design({classNames:["backView"],contentBinding:"Cloudflix.mostPopularController.arrangedObjects",selectionBinding:"Cloudflix.mostPopularController.selection",contentValueKey:"title",contentIconKey:"poster",exampleView:Cloudflix.CustomGrid,hasContentIcon:YES,escapeHTML:NO,rowHeight:200,columnWidth:170,borderStyle:SC.BORDER_NONE,}),})}),testButton:SC.ButtonView.design({layout:{top:50,height:24,left:220,width:100},isVisible:false,title:"Test"}),topToolBar:SC.ToolbarView.design({classNames:["toolbar-right"],layout:{top:0,left:0,right:0,height:34},anchorLocation:SC.ANCHOR_TOP,backgroundColor:"blue",childViews:"popoverButton".w(),popoverButton:SC.ButtonView.design({layout:{centerY:0,height:24,left:12,width:100},title:"Add Task"}),})})})})});
Cloudflix.main=function main(){var popResults=Cloudflix.store.find(popResultsQuery);
Cloudflix.statechart.initStatechart()};function main(){Cloudflix.main()};