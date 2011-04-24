if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]}CHANCE_SLICES=CHANCE_SLICES.concat([]);
SC.MediaSlider=SC.SliderView.extend({mediaView:null,leftHandleInsetBinding:"*owner.leftHandleInset",rightHandleInsetBinding:"*owner.rightHandleInset",handleWidthBinding:"*owner.handleWidth",loadedRangesSelector:"span.sc-loaded-ranges",_defaults:{leftHandleInset:-1,rightHandleInset:-8,handleWidth:16},render:function(context,firstTime){arguments.callee.base.base.apply(this,arguments);
var min=this.get("minimum"),max=this.get("maximum"),value=this.get("value"),step=this.get("step"),width=this.get("frame").width,left,loc,minLoc,maxLoc,i,blankImage=SC.BLANK_IMAGE_URL;
if(!this._defaultsEnsured){this._defaultsEnsured=YES;for(i in this._defaults){if(SC.none(this.get(i))){this.set(i,this._defaults[i])
}}}value=Math.min(Math.max(value,min),max);if(!SC.none(step)&&step!==0){value=Math.round(value/step)*step
}if(!firstTime){var handle=this.handleElement||(this.handleElement=this.$(this.get("handleSelector"))[0]);
if(!this.handleWidth){this.handleWidth=this.handleElement.offsetWidth||this.handleWidth
}}maxLoc=width-this.handleWidth/2-this.rightHandleInset;minLoc=this.handleWidth/2+this.leftHandleInset;
if(min==max){loc=minLoc}else{loc=(value-min)/(max-min)*(maxLoc-minLoc)+minLoc}left=loc+this.leftHandleInset-this.handleWidth/2;
if(!firstTime){handle.style.left=left+"px"}else{context.push('<span class="sc-inner">','<span class="sc-leftcap"></span>','<span class="sc-rightcap"></span>','<span class="sc-track"></span>','<span class="sc-loaded-ranges"></span>','<img src="',blankImage,'" class="sc-handle" style="left: ',left,'px" />',"</span>")
}this.renderLoadedTimeRanges()},renderLoadedTimeRanges:function(){var max=this.get("maximum"),min=this.get("minimum"),width=this.get("frame").width,i;
var mediaView=this.get("mediaView");if(!mediaView){return}var ranges=mediaView.get("loadedTimeRanges");
if(!ranges){return}if(!this.loadedRangesElement){this.loadedRangesElement=this.$(this.get("loadedRangesSelector"))[0]
}if(!this.loadedBGTemplate){this.loadedBGTemplate=document.createElement("span");
this.loadedBGTemplate.className="sc-loaded-range";this.loadedBGTemplate.innerHTML=['<span class="sc-loaded-range-inner">','<span class="sc-leftcap loaded"></span>','<span class="sc-rightcap loaded"></span>','<span class="sc-track loaded"></span>',"</span>"].join("")
}if(!this.loadedRangeElements){this.loadedRangeElements=[]}for(i=0;i<ranges.length/2;
i++){var clone=this.loadedRangeElements[i]||(this.loadedRangeElements[i]=this.loadedBGTemplate.cloneNode(true));
var leftClip=Math.round(((ranges[2*i]+min)/max)*width);var rightClip=Math.round(((ranges[2*i+1]+min)/max)*width);
clone.style.left=leftClip+"px";clone.style.width=rightClip-leftClip+"px";clone.firstChild.style.left=0-leftClip+"px";
clone.firstChild.style.width=width+"px";if(!clone.parentNode){this.loadedRangesElement.appendChild(clone)
}}for(i=ranges.length/2;i<this.loadedRangeElements.length;i++){if(this.loadedRangeElements[i].parentNode){this.loadedRangeElements[i].parentNode.removeChild(this.loadedRangeElements[i])
}}}.observes("*mediaView.loadedTimeRanges"),_triggerHandle:function(evt,firstEvent){var width=this.get("frame").width,min=this.get("minimum"),max=this.get("maximum"),step=this.get("step"),v=this.get("value"),loc,maxLoc,minLoc,handle=this.handleElement||(this.handleElement=this.$(this.get("handleSelector"))[0]);
if(!this.handleWidth){this.handleWidth=this.handleElement.offsetWidth||this.handleWidth
}if(firstEvent){loc=this.convertFrameFromView({x:evt.pageX}).x;this._evtDiff=evt.pageX-loc
}else{loc=evt.pageX-this._evtDiff}maxLoc=width-this.handleWidth/2-this.rightHandleInset;
minLoc=this.handleWidth/2+this.leftHandleInset;loc=Math.max(Math.min(loc,maxLoc),minLoc);
loc=(loc-minLoc)/(maxLoc-minLoc);loc=min+((max-min)*loc);if(step!==0){loc=Math.round(loc/step)*step
}if(Math.abs(v-loc)>=0.01){this.set("value",loc)}return YES},mouseDown:function(evt){var media=this.get("mediaView");
if(media){media.startSeek()}return arguments.callee.base.apply(this,arguments)},mouseUp:function(evt){var media=this.get("mediaView");
if(media){media.endSeek()}return arguments.callee.base.apply(this,arguments)},mouseWheel:function(){var media,ret;
SC.RunLoop.begin();media=this.get("mediaView");if(media){media.startSeek()}ret=arguments.callee.base.apply(this,arguments);
SC.RunLoop.end();SC.RunLoop.begin();if(media){media.endSeek()}SC.RunLoop.end();return ret
}});sc_require("views/media_slider");SC.MediaControlsView=SC.View.extend({target:null,childViews:"playButton progressView timeView minusLabelView volumeView plusLabelView theaterButton".w(),classNames:"sc-media-controls",leftHandleInset:null,rightHandleInset:null,handleWidth:null,playObserver:function(){if(this.getPath("target.paused")){this.get("playButton").set("icon","play")
}else{this.get("playButton").set("icon","stop")}}.observes("*target.paused"),playButton:SC.ButtonView.design({title:"",titleMinWidth:35,icon:"play",noStyle:YES,layout:{top:0,left:0,width:20,height:20},action:"playPause",targetBinding:"*owner.target",renderStyle:"renderImage"}),progressView:SC.MediaSlider.design({layout:{top:0,left:20,right:220,height:20},value:0,minimum:0,step:0.1,valueBinding:"*owner.target.currentTime",maximumBinding:"*owner.target.duration",mediaViewBinding:"*owner.target"}),timeView:SC.LabelView.design({layout:{top:0,right:160,width:60,height:20},classNames:"time",textAlign:SC.ALIGN_CENTER,valueBinding:"*owner.target.time"}),theaterButton:SC.ButtonView.design({title:"",icon:"theater",renderStyle:"renderImage",titleMinWidth:35,layout:{top:0,right:140,width:20,height:20},action:"fullScreen",targetBinding:"*owner.target"}),minusLabelView:SC.LabelView.design({layout:{top:0,right:120,width:20,height:20},value:"",icon:"minus"}),volumeView:SC.MediaSlider.design({layout:{top:0,right:20,width:100,height:20},value:0,valueBinding:"*owner.target.volume",minimum:0,maximum:1,step:0.01}),plusLabelView:SC.LabelView.design({layout:{top:0,right:0,width:20,height:20},value:"",icon:"plus"})});
sc_require("views/media_slider");SC.MiniMediaControlsView=SC.View.extend({target:null,childViews:"playButton timeView minusLabelView volumeView".w(),classNames:"sc-media-controls",playObserver:function(){if(this.getPath("target.paused")){this.get("playButton").set("icon","play")
}else{this.get("playButton").set("icon","stop")}}.observes("*target.paused"),playButton:SC.ButtonView.design({title:"",titleMinWidth:35,icon:"play",noStyle:YES,layout:{top:0,left:0,width:20,height:20},action:"playPause",targetBinding:"*owner.target",renderStyle:"renderImage",theme:""}),timeView:SC.LabelView.design({layout:{top:0,left:20,width:60,height:20},classNames:"time",textAlign:SC.ALIGN_CENTER,valueBinding:"*owner.target.time"}),minusLabelView:SC.LabelView.design({layout:{top:0,left:80,width:20,height:20},value:"",icon:"minus"}),volumeView:SC.SliderView.design({layout:{top:0,left:100,width:100,height:20},value:0,valueBinding:"*owner.target.volume",minimum:0,maximum:1,step:0.01})});
sc_require("views/controls");sc_require("views/mini_controls");SC.AudioView=SC.View.extend({classNames:"sc-audio-view",displayProperties:["value","shouldAutoResize"],audioObject:null,degradeList:["html5","quicktime","flash"],currentTime:0,duration:0,volume:0,paused:YES,loaded:NO,ended:NO,canPlay:NO,loadedTimeRanges:[],time:function(){var currentTime=this.get("currentTime"),totaltimeInSecs=this.get("duration");
var formattedTime=this._addZeros(Math.floor(currentTime/60))+":"+this._addZeros(Math.floor(currentTime%60))+"/"+this._addZeros(Math.floor(totaltimeInSecs/60))+":"+this._addZeros(Math.floor(totaltimeInSecs%60));
return formattedTime}.property("currentTime","duration").cacheable(),render:function(context,firstTime){var i,j,listLen,pluginsLen,id=SC.guidFor(this);
if(firstTime){for(i=0,listLen=this.degradeList.length;i<listLen;i++){switch(this.degradeList[i]){case"html5":if(SC.browser.safari){context.push('<audio src="'+this.get("value")+'"');
if(this.poster){context.push(' poster="'+this.poster+'"')}context.push("/>");this.loaded="html5";
return}break;case"quicktime":if(SC.browser.msie){context.push('<object id="qt_event_source" classid="clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0"> </object> ')
}context.push('<object width="100%" height="100%"');if(SC.browser.msie){context.push('style="behavior:url(#qt_event_source);"')
}context.push('classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" id="qt_'+id+'" codebase="http://www.apple.com/qtactivex/qtplugin.cab"><param name="src" value="'+this.get("value")+'"/><param name="autoplay" value="false"/><param name="loop" value="false"/><param name="controller" value="false"/><param name="postdomevents" value="true"/><param name="kioskmode" value="true"/><param name="bgcolor" value="000000"/><param name="scale" value="aspect"/><embed width="100%" height="100%" name="qt_'+id+'" src="'+this.get("value")+'" autostart="false" EnableJavaScript="true" postdomevents="true" kioskmode="true" controller="false" bgcolor="000000"scale="aspect" pluginspage="www.apple.com/quicktime/download"></embed></object></object>');
this.loaded="quicktime";return;case"flash":var flashURL="/static/sproutcore/media/en/846daeeed30bc919317dbe87accadf6f89ebe29e/resources/videoCanvas.swf";
var movieURL=this.get("value");if(!movieURL){return}if(movieURL.indexOf("http:")==-1){movieURL=location.protocol+"//"+location.host+movieURL
}if(movieURL.indexOf("?")!=-1){movieURL=movieURL.substring(0,movieURL.indexOf("?"))
}movieURL=encodeURI(movieURL);context.push('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="flash_'+id+'" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param name="allowFullScreen" value="true" /><param name="movie" value="'+flashURL+"&src="+movieURL+"&scid="+id+'" /><param name="quality" value="autohigh" /><param name="scale" value="default" /><param name="wmode" value="transparent" /><param name="menu" value="false" /><param name="bgcolor" value="#000000" />	<embed src="'+flashURL+"&src="+movieURL+"&scid="+id+'" quality="autohigh" scale="default" wmode="transparent" bgcolor="#000000" width="100%" height="100%" name="flash_'+id+'" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" menu="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" /></object>');
this.loaded="flash";SC.AudioView.addToAudioFlashViews(this);return;default:context.push("audio is not supported by your browser");
return}}}},valueObserver:function(){this.set("currentTime",0);this.set("duration",0);
this.set("volume",0);this.set("paused",YES);this.set("loaded",NO);this.set("ended",NO);
this.set("canPlay",NO);this.set("loadedTimeRanges",[]);this.replaceLayer()}.observes("value"),didCreateLayer:function(){if(this.loaded==="html5"){this.addAudioDOMEvents()
}if(this.loaded==="quicktime"){this.addQTDOMEvents()}},didAppendToDocument:function(){if(this.loaded==="quicktime"){this.addQTDOMEvents()
}},addAudioDOMEvents:function(){var audioElem,view=this;audioElem=this.$("audio")[0];
this.set("audioObject",audioElem);SC.Event.add(audioElem,"durationchange",this,function(){SC.run(function(){view.set("duration",audioElem.duration)
})});SC.Event.add(audioElem,"timeupdate",this,function(){SC.run(function(){view.set("currentTime",audioElem.currentTime)
})});SC.Event.add(audioElem,"loadstart",this,function(){SC.run(function(){view.set("volume",audioElem.volume)
})});SC.Event.add(audioElem,"play",this,function(){SC.run(function(){view.set("paused",NO)
})});SC.Event.add(audioElem,"pause",this,function(){SC.run(function(){view.set("paused",YES)
})});SC.Event.add(audioElem,"loadedmetadata",this,function(){SC.run(function(){})
});SC.Event.add(audioElem,"canplay",this,function(){SC.run(function(){view.set("canPlay",YES)
})});SC.Event.add(audioElem,"ended",this,function(){SC.run(function(){view.set("ended",YES)
})});SC.Event.add(audioElem,"progress",this,function(e){SC.run(function(){this.loadedTimeRanges=[];
for(var j=0,jLen=audioElem.seekable.length;j<jLen;j++){this.loadedTimeRanges.push(audioElem.seekable.start(j));
this.loadedTimeRanges.push(audioElem.seekable.end(j))}try{var trackCount=view.GetTrackCount(),i;
for(i=1;i<=trackCount;i++){if("Closed Caption"===this.GetTrackType(i)){view._closedCaptionTrackIndex=i
}}}catch(f){}},this)})},addQTDOMEvents:function(){var media=this._getAudioObject(),audioElem=this.$()[0],view=this,dimensions;
try{media.GetVolume()}catch(e){SC.Logger.log("loaded fail trying later");this.invokeLater(this.didAppendToDocument,100);
return}this.set("audioObject",media);view.set("duration",media.GetDuration()/media.GetTimeScale());
view.set("volume",media.GetVolume()/256);SC.Event.add(audioElem,"qt_durationchange",this,function(){SC.run(function(){view.set("duration",media.GetDuration()/media.GetTimeScale())
})});SC.Event.add(audioElem,"qt_begin",this,function(){SC.run(function(){view.set("volume",media.GetVolume()/256)
})});SC.Event.add(audioElem,"qt_loadedmetadata",this,function(){SC.run(function(){view.set("duration",media.GetDuration()/media.GetTimeScale())
})});SC.Event.add(audioElem,"qt_canplay",this,function(){SC.run(function(){view.set("canPlay",YES)
})});SC.Event.add(audioElem,"qt_ended",this,function(){SC.run(function(){view.set("ended",YES)
})});SC.Event.add(audioElem,"qt_pause",this,function(){SC.run(function(){view.set("currentTime",media.GetTime()/media.GetTimeScale());
view.set("paused",YES)})});SC.Event.add(audioElem,"qt_play",this,function(){SC.run(function(){view.set("currentTime",media.GetTime()/media.GetTimeScale());
view.set("paused",NO)})})},_qtTimer:function(){if(this.loaded==="quicktime"&&!this.get("paused")){this.incrementProperty("currentTime");
this.invokeLater(this._qtTimer,1000)}}.observes("paused"),seek:function(){var timeInSecs,totaltimeInSecs,formattedTime,media=this._getAudioObject();
if(this.loaded==="html5"){if(this.get("paused")&&media&&media.currentTime){media.currentTime=this.get("currentTime")
}}if(this.loaded==="quicktime"){if(this.get("paused")){media.SetTime(this.get("currentTime")*media.GetTimeScale())
}}if(this.loaded==="flash"){if(this.get("paused")){media.setTime(this.get("currentTime"))
}}}.observes("currentTime"),startSeek:function(){if(!this.get("paused")){SC.Logger.log("startseetk");
this.stop();this._wasPlaying=true}},endSeek:function(){if(this._wasPlaying){SC.Logger.log("startseetk");
this.play();this._wasPlaying=false}},setVolume:function(){var media=this._getAudioObject();
if(this.loaded==="html5"){media.volume=this.get("volume")}if(this.loaded==="quicktime"){media.SetVolume(this.get("volume")*256)
}if(this.loaded==="flash"){media.setVolume(this.get("volume"))}}.observes("volume"),play:function(){var media=this._getAudioObject();
if(this.loaded==="html5"){media.play()}if(this.loaded==="quicktime"){media.Play()
}if(this.loaded==="flash"){media.playVideo()}this.set("paused",NO)},stop:function(){var media=this._getAudioObject();
if(this.loaded==="html5"){media.pause()}if(this.loaded==="quicktime"){media.Stop()
}if(this.loaded==="flash"){media.pauseVideo()}this.set("paused",YES)},playPause:function(){if(this.get("paused")){this.play()
}else{this.stop()}},closedCaption:function(){if(this.loaded==="html5"){try{if(this.get("captionsEnabled")){if(this._closedCaptionTrackIndex){this.SetTrackEnabled(this._closedCaptionTrackIndex,true);
this.set("captionsEnabled",YES)}}else{this.SetTrackEnabled(this._closedCaptionTrackIndex,false);
this.set("captionsEnabled",NO)}}catch(a){}}return},_getAudioObject:function(){if(this.loaded==="html5"){return this.get("audioObject")
}if(this.loaded==="quicktime"){return document["qt_"+SC.guidFor(this)]}if(this.loaded==="flash"){var movieName="flash_"+SC.guidFor(this);
if(window.document[movieName]){return window.document[movieName]}if(navigator.appName.indexOf("Microsoft Internet")==-1){if(document.embeds&&document.embeds[movieName]){return document.embeds[movieName]
}}else{return document.getElementById(movieName)}}},_addZeros:function(value){if(value.toString().length<2){return"0"+value
}return value}});SC.AudioView.flashViews={};SC.AudioView.addToAudioFlashViews=function(view){SC.AudioView.flashViews[SC.guidFor(view)]=view
};SC.AudioView.updateProperty=function(scid,property,value){var view=SC.AudioView.flashViews[scid];
if(view){SC.run(function(){view.set(property,value)})}};SC.AudioView.logFlash=function(message){SC.Logger.log("FLASHLOG: "+message)
};SC.AudioPlayerView=SC.View.extend({classNames:"sc-audio-view",childViews:"audioView mini".w(),value:null,degradeList:null,audioView:SC.AudioView.design({layout:{top:0,left:0,width:100,height:100},degradeListBinding:"*parentView.degradeList",valueBinding:"*parentView.value"}),mini:SC.MiniMediaControlsView.design({layout:{bottom:0,left:0,right:0,height:20},targetBinding:"*parentView.audioView"})});
sc_require("views/media_slider");SC.SimpleMediaControlsView=SC.View.extend({target:null,childViews:"playButton progressView".w(),classNames:"sc-media-controls",leftHandleInset:null,rightHandleInset:null,handleWidth:null,playObserver:function(){if(this.getPath("target.paused")){this.get("playButton").set("icon","play")
}else{this.get("playButton").set("icon","stop")}}.observes("*target.paused"),playButton:SC.ButtonView.design({title:"",titleMinWidth:35,icon:"play",noStyle:YES,layout:{top:0,left:0,width:20,height:20},action:"playPause",targetBinding:"*owner.target",renderStyle:"renderImage"}),progressView:SC.MediaSlider.design({layout:{top:0,left:25,right:0,height:20},value:0,minimum:0,step:0.1,valueBinding:"*owner.target.currentTime",maximumBinding:"*owner.target.duration",mediaViewBinding:"*owner.target"})});
sc_require("views/controls");sc_require("views/mini_controls");SC.VideoView=SC.View.extend({classNames:"sc-video-view",displayProperties:["value","shouldAutoResize"],videoObject:null,degradeList:["html5","quicktime","flash"],currentTime:0,duration:0,volume:0,paused:YES,loaded:NO,ended:NO,canPlay:NO,videoWidth:0,videoHeight:0,captionsEnabled:NO,loadedTimeRanges:[],poster:null,time:function(){var currentTime=this.get("currentTime"),totaltimeInSecs=this.get("duration");
var formattedTime=this._addZeros(Math.floor(currentTime/60))+":"+this._addZeros(Math.floor(currentTime%60))+"/"+this._addZeros(Math.floor(totaltimeInSecs/60))+":"+this._addZeros(Math.floor(totaltimeInSecs%60));
return formattedTime}.property("currentTime","duration").cacheable(),render:function(context,firstTime){var i,j,listLen,pluginsLen,id=SC.guidFor(this);
if(firstTime){for(i=0,listLen=this.degradeList.length;i<listLen;i++){switch(this.degradeList[i]){case"html5":if(SC.browser.safari){context.push('<video src="'+this.get("value")+'"');
if(this.poster){context.push(' poster="'+this.poster+'"')}context.push("/>");this.loaded="html5";
return}break;case"quicktime":if(SC.browser.msie){context.push('<object id="qt_event_source" classid="clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0"> </object> ')
}context.push('<object width="100%" height="100%"');if(SC.browser.msie){context.push('style="position: absolute; top:0px; left:0px; behavior:url(#qt_event_source);"')
}context.push('classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" id="qt_'+id+'" codebase="http://www.apple.com/qtactivex/qtplugin.cab"><param name="src" value="'+this.get("value")+'"/><param name="autoplay" value="false"/><param name="loop" value="false"/><param name="controller" value="false"/><param name="postdomevents" value="true"/><param name="kioskmode" value="true"/><param name="bgcolor" value="000000"/><param name="scale" value="aspect"/><embed width="100%" height="100%" name="qt_'+id+'" src="'+this.get("value")+'" autostart="false" EnableJavaScript="true" postdomevents="true" kioskmode="true" controller="false" bgcolor="000000"scale="aspect" pluginspage="www.apple.com/quicktime/download"></embed></object></object>');
this.loaded="quicktime";return;case"flash":var flashURL="/static/sproutcore/media/en/846daeeed30bc919317dbe87accadf6f89ebe29e/resources/videoCanvas.swf";
var movieURL=this.get("value");if(!movieURL){return}if(movieURL.indexOf("http:")==-1){movieURL=location.protocol+"//"+location.host+movieURL
}if(movieURL.indexOf("?")!=-1){movieURL=movieURL.substring(0,movieURL.indexOf("?"))
}movieURL=encodeURI(movieURL);context.push('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="flash_'+id+'" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param name="allowFullScreen" value="true" /><param name="movie" value="'+flashURL+"&src="+movieURL+"&scid="+id+'" /><param name="quality" value="autohigh" /><param name="scale" value="default" /><param name="wmode" value="transparent" /><param name="menu" value="false" /><param name="bgcolor" value="#000000" />	<embed src="'+flashURL+"&src="+movieURL+"&scid="+id+'" quality="autohigh" scale="default" wmode="transparent" bgcolor="#000000" width="100%" height="100%" name="flash_'+id+'" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" menu="false" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer" /></object>');
this.loaded="flash";SC.VideoView.addToVideoFlashViews(this);return;default:context.push("video is not supported by your browser");
return}}}},valueObserver:function(){this.set("currentTime",0);this.set("duration",0);
this.set("volume",0);this.set("paused",YES);this.set("loaded",NO);this.set("ended",NO);
this.set("canPlay",NO);this.set("loadedTimeRanges",[]);this.replaceLayer()}.observes("value"),frameDidChange:function(){if(this.loaded==="html5"){var fr=this.get("frame"),elem=this.$("video");
elem.attr("width",fr.width);elem.attr("height",fr.height)}}.observes("frame"),didCreateLayer:function(){if(this.loaded==="html5"){this.addVideoDOMEvents();
this.frameDidChange()}if(this.loaded==="quicktime"){this.addQTDOMEvents()}},didAppendToDocument:function(){if(this.loaded==="quicktime"){this.addQTDOMEvents()
}},addVideoDOMEvents:function(){var videoElem,view=this;videoElem=this.$("video")[0];
this.set("videoObject",videoElem);SC.Event.add(videoElem,"durationchange",this,function(){SC.RunLoop.begin();
view.set("duration",videoElem.duration);SC.RunLoop.end()});SC.Event.add(videoElem,"timeupdate",this,function(){SC.RunLoop.begin();
view.set("currentTime",videoElem.currentTime);SC.RunLoop.end()});SC.Event.add(videoElem,"loadstart",this,function(){SC.RunLoop.begin();
this.updateVideoElementLoadedTimeRanges(videoElem);view.set("volume",videoElem.volume);
SC.RunLoop.end()});SC.Event.add(videoElem,"play",this,function(){SC.RunLoop.begin();
view.set("paused",NO);SC.RunLoop.end()});SC.Event.add(videoElem,"pause",this,function(){SC.RunLoop.begin();
view.set("paused",YES);SC.RunLoop.end()});SC.Event.add(videoElem,"loadedmetadata",this,function(){SC.RunLoop.begin();
view.set("videoWidth",videoElem.videoWidth);view.set("videoHeight",videoElem.videoHeight);
SC.RunLoop.end()});SC.Event.add(videoElem,"canplay",this,function(){SC.RunLoop.begin();
this.updateVideoElementLoadedTimeRanges(videoElem);view.set("canPlay",YES);SC.RunLoop.end()
});SC.Event.add(videoElem,"ended",this,function(){SC.RunLoop.begin();view.set("ended",YES);
SC.RunLoop.end()});SC.Event.add(videoElem,"progress",this,function(e){SC.RunLoop.begin();
this.updateVideoElementLoadedTimeRanges(videoElem);try{var trackCount=view.GetTrackCount(),i;
for(i=1;i<=trackCount;i++){if("Closed Caption"===this.GetTrackType(i)){view._closedCaptionTrackIndex=i
}}}catch(f){}SC.RunLoop.end()})},updateVideoElementLoadedTimeRanges:function(videoElem){if(!videoElem){videoElem=this.$("video")[0]
}if(!this.loadedTimeRanges){this.loadedTimeRanges=[]}else{this.loadedTimeRanges.length=0
}for(var j=0,jLen=videoElem.buffered.length;j<jLen;j++){this.loadedTimeRanges.push(videoElem.buffered.start(j));
this.loadedTimeRanges.push(videoElem.buffered.end(j))}this.notifyPropertyChange("loadedTimeRanges")
},addQTDOMEvents:function(){var vid=this._getVideoObject(),videoElem=this.$()[0],view=this,dimensions;
try{vid.GetVolume()}catch(e){SC.Logger.log("loaded fail trying later");this.invokeLater(this.didAppendToDocument,100);
return}this.set("videoObject",vid);this._setDurationFromQTVideoObject();this.set("volume",vid.GetVolume()/256);
this._setDimensionsFromQTVideoObject();SC.Event.add(videoElem,"qt_durationchange",this,function(){SC.RunLoop.begin();
this._setDurationFromQTVideoObject();SC.RunLoop.end()});SC.Event.add(videoElem,"qt_begin",this,function(){SC.RunLoop.begin();
this.updateQTVideoObjectLoadedTimeRanges(vid);view.set("volume",vid.GetVolume()/256);
SC.RunLoop.end()});SC.Event.add(videoElem,"qt_loadedmetadata",this,function(){SC.RunLoop.begin();
this._setDurationFromQTVideoObject();this.updateQTVideoObjectLoadedTimeRanges(vid);
var dimensions=vid.GetRectangle().split(",");view.set("videoWidth",dimensions[2]);
view.set("videoHeight",dimensions[3]);SC.RunLoop.end()});SC.Event.add(videoElem,"qt_canplay",this,function(){SC.RunLoop.begin();
this.updateQTVideoObjectLoadedTimeRanges(vid);view.set("canPlay",YES);SC.RunLoop.end()
});SC.Event.add(videoElem,"qt_ended",this,function(){view.set("ended",YES)});SC.Event.add(videoElem,"qt_pause",this,function(){SC.RunLoop.begin();
view.set("currentTime",vid.GetTime()/vid.GetTimeScale());view.set("paused",YES);SC.RunLoop.end()
});SC.Event.add(videoElem,"qt_play",this,function(){SC.RunLoop.begin();view.set("currentTime",vid.GetTime()/vid.GetTimeScale());
view.set("paused",NO);SC.RunLoop.end()});SC.Event.add(videoElem,"qt_load",this,function(){SC.RunLoop.begin();
this.updateQTVideoObjectLoadedTimeRanges(vid);SC.RunLoop.end()});SC.Event.add(videoElem,"qt_progress",this,function(){SC.RunLoop.begin();
this.updateQTVideoObjectLoadedTimeRanges(vid);SC.RunLoop.end()})},updateQTVideoObjectLoadedTimeRanges:function(vid){vid=vid||this._getVideoObject();
if(!this.loadedTimeRanges){this.loadedTimeRanges=[]}else{this.loadedTimeRanges.length=0
}this.loadedTimeRanges.push(0);this.loadedTimeRanges.push(vid.GetMaxTimeLoaded()/vid.GetTimeScale());
this.notifyPropertyChange("loadedTimeRanges")},_setDurationFromQTVideoObject:function(vid){if(!vid){vid=this._getVideoObject()
}try{this.set("duration",vid.GetDuration()/vid.GetTimeScale())}catch(e){this.invokeLater("_setDurationFromQTVideoObject",100)
}},_setDimensionsFromQTVideoObject:function(vid){if(!vid){vid=this._getVideoObject()
}try{var dimensions=vid.GetRectangle().split(",");this.set("videoWidth",dimensions[2]);
this.set("videoHeight",dimensions[3])}catch(e){this.invokeLater("_setDimensionsFromQTVideoObject",100)
}},_qtTimer:function(){if(this.loaded==="quicktime"&&!this.get("paused")){this.incrementProperty("currentTime");
this.invokeLater(this._qtTimer,1000)}}.observes("paused"),seek:function(){var timeInSecs,totaltimeInSecs,formattedTime,vid=this._getVideoObject();
if(this.loaded==="html5"){if(this.get("paused")){vid.currentTime=this.get("currentTime")
}}if(this.loaded==="quicktime"){if(this.get("paused")){vid.SetTime(this.get("currentTime")*vid.GetTimeScale())
}}if(this.loaded==="flash"){if(this.get("paused")){vid.setTime(this.get("currentTime"))
}}}.observes("currentTime"),startSeek:function(){if(!this.get("paused")){SC.Logger.log("startseetk");
this.stop();this._wasPlaying=true}},endSeek:function(){if(this._wasPlaying){SC.Logger.log("startseetk");
this.play();this._wasPlaying=false}},setVolume:function(){var vid=this._getVideoObject();
if(this.loaded==="html5"){vid.volume=this.get("volume")}if(this.loaded==="quicktime"){vid.SetVolume(this.get("volume")*256)
}if(this.loaded==="flash"){vid.setVolume(this.get("volume"))}}.observes("volume"),play:function(){try{var vid=this._getVideoObject();
if(this.loaded==="html5"){vid.play()}if(this.loaded==="quicktime"){vid.Play()}if(this.loaded==="flash"){vid.playVideo()
}this.set("paused",NO)}catch(e){SC.Logger.warn("The video cannot play!!!! It might still be loading the plugging")
}},stop:function(){var vid=this._getVideoObject();if(this.loaded==="html5"){vid.pause()
}if(this.loaded==="quicktime"){vid.Stop()}if(this.loaded==="flash"){vid.pauseVideo()
}this.set("paused",YES)},playPause:function(){if(this.get("paused")){this.play()}else{this.stop()
}},fullScreen:function(){var vid=this._getVideoObject();if(this.loaded==="html5"){this.$("video")[0].webkitEnterFullScreen()
}if(this.loaded==="flash"){vid.fullScreen()}return},closedCaption:function(){if(this.loaded==="html5"){try{if(this.get("captionsEnabled")){if(this._closedCaptionTrackIndex){this.SetTrackEnabled(this._closedCaptionTrackIndex,true);
this.set("captionsEnabled",YES)}}else{this.SetTrackEnabled(this._closedCaptionTrackIndex,false);
this.set("captionsEnabled",NO)}}catch(a){}}return},_getVideoObject:function(){if(this.loaded==="html5"){return this.get("videoObject")
}if(this.loaded==="quicktime"){return document["qt_"+SC.guidFor(this)]}if(this.loaded==="flash"){var movieName="flash_"+SC.guidFor(this);
if(window.document[movieName]){return window.document[movieName]}if(navigator.appName.indexOf("Microsoft Internet")==-1){if(document.embeds&&document.embeds[movieName]){return document.embeds[movieName]
}}else{return document.getElementById(movieName)}}},_addZeros:function(value){if(value.toString().length<2){return"0"+value
}return value}});SC.VideoView.flashViews={};SC.VideoView.addToVideoFlashViews=function(view){SC.VideoView.flashViews[SC.guidFor(view)]=view
};SC.VideoView.updateProperty=function(scid,property,value){var view=SC.VideoView.flashViews[scid];
if(view){SC.RunLoop.begin();view.set(property,value);SC.RunLoop.end()}};SC.VideoView.logFlash=function(message){SC.Logger.log("FLASHLOG: "+message)
};SC.VideoPlayerView=SC.View.extend({classNames:"sc-video-player-view",childViews:"videoView regular".w(),value:null,degradeList:null,videoView:SC.VideoView.design({layout:{top:0,bottom:20,right:0,left:0},degradeListBinding:"*parentView.degradeList",valueBinding:"*parentView.value"}),regular:SC.MediaControlsView.design({layout:{bottom:0,left:0,right:0,height:20},targetBinding:"*parentView.videoView"}),mini:SC.MiniMediaControlsView.design({layout:{bottom:0,left:0,right:0,height:20},targetBinding:"*parentView.videoView"})});