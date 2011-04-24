SC.DROP_ON=1;SC.DROP_BEFORE=2;SC.DROP_AFTER=4;SC.DROP_ANY=7;SC.ALIGN_LEFT="left";
SC.ALIGN_RIGHT="right";SC.ALIGN_CENTER="center";SC.ALIGN_TOP="top";SC.ALIGN_MIDDLE="middle";
SC.ALIGN_BOTTOM="bottom";SC.ALIGN_TOP_LEFT="top-left";SC.ALIGN_TOP_RIGHT="top-right";
SC.ALIGN_BOTTOM_LEFT="bottom-left";SC.ALIGN_BOTTOM_RIGHT="bottom-right";SC.SAFARI_FOCUS_BEHAVIOR=YES;
SC.mixin({data:function(elem,name,data){elem=(elem===window)?"@window":elem;var hash=SC.hashFor(elem);
var cache=SC._data_cache;if(!cache){SC._data_cache=cache={}}var elemCache=cache[hash];
if(name&&!elemCache){cache[hash]=elemCache={}}if(elemCache&&(data!==undefined)){elemCache[name]=data
}return(name)?elemCache[name]:elemCache},removeData:function(elem,name){elem=(elem===window)?"@window":elem;
var hash=SC.hashFor(elem);var cache=SC._data_cache;if(!cache){return undefined}var elemCache=cache[hash];
if(!elemCache){return undefined}var ret=(name)?elemCache[name]:elemCache;if(name){delete elemCache[name]
}else{delete cache[hash]}return ret}});SC.mixin(Function.prototype,{invokeLater:function(target,interval){if(interval===undefined){interval=1
}var f=this;if(arguments.length>2){var args=SC.$A(arguments).slice(2,arguments.length);
args.unshift(target);var func=f;f=function(){return func.apply(this,args.slice(1))
}}return SC.Timer.schedule({target:target,action:f,interval:interval})}});if(typeof CHANCE_SLICES==="undefined"){var CHANCE_SLICES=[]
}CHANCE_SLICES=CHANCE_SLICES.concat([]);SC.Controller=SC.Object.extend({isEditable:YES});
SC.SelectionSupport={hasSelectionSupport:YES,allowsSelection:YES,allowsMultipleSelection:YES,allowsEmptySelection:YES,firstSelectableObject:function(){return this.get("firstObject")
}.property(),selection:function(key,value){var old=this._scsel_selection,oldlen=old?old.get("length"):0,content,empty,len;
if((value===undefined)||!this.get("allowsSelection")){value=old}len=(value&&value.isEnumerable)?value.get("length"):0;
if((len>1)&&!this.get("allowsMultipleSelection")){if(oldlen>1){value=SC.SelectionSet.create().addObject(old.get("firstObject")).freeze();
len=1}else{value=old;len=oldlen}}if((len===0)&&!this.get("allowsEmptySelection")){if(oldlen===0){value=this.get("firstSelectableObject");
if(value){value=SC.SelectionSet.create().addObject(value).freeze()}else{value=SC.SelectionSet.EMPTY
}len=value.get("length")}else{value=old;len=oldlen}}if(len===0){value=SC.SelectionSet.EMPTY
}value=value.frozenCopy();this._scsel_selection=value;return value}.property("arrangedObjects","allowsEmptySelection","allowsMultipleSelection","allowsSelection").cacheable(),hasSelection:function(){var sel=this.get("selection");
return !!sel&&(sel.get("length")>0)}.property("selection").cacheable(),selectObjects:function(objects,extend){if(!objects||objects.get("length")===0){if(!extend){this.set("selection",SC.SelectionSet.EMPTY)
}return this}var sel=this.get("selection");if(extend&&sel){sel=sel.copy()}else{sel=SC.SelectionSet.create()
}sel.addObjects(objects).freeze();this.set("selection",sel);return this},selectObject:function(object,extend){if(object===null){if(!extend){this.set("selection",null)
}return this}else{return this.selectObjects([object],extend)}},deselectObjects:function(objects){if(!objects||objects.get("length")===0){return this
}var sel=this.get("selection");if(!sel||sel.get("length")===0){return this}sel=sel.copy().removeObjects(objects).freeze();
this.set("selection",sel.freeze());return this},deselectObject:function(object){if(!object){return this
}else{return this.deselectObjects([object])}},updateSelectionAfterContentChange:function(){var arrangedObjects=this.get("arrangedObjects");
var selectionSet=this.get("selection");var allowsEmptySelection=this.get("allowsEmptySelection");
var indexSet;if(!selectionSet){return this}indexSet=selectionSet.indexSetForSource(arrangedObjects);
if((indexSet&&(indexSet.get("length")!==selectionSet.get("length")))||(!indexSet&&(selectionSet.get("length")>0))){selectionSet=selectionSet.copy().constrain(arrangedObjects).freeze();
this.set("selection",selectionSet)}if((selectionSet.get("length")===0)&&arrangedObjects&&(arrangedObjects.get("length")>0)&&!allowsEmptySelection){this.selectObject(this.get("firstSelectableObject"),NO)
}return this}};sc_require("controllers/controller");sc_require("mixins/selection_support");
SC.ArrayController=SC.Controller.extend(SC.Array,SC.SelectionSupport,{content:null,isEditable:YES,orderBy:null,allowsSingleContent:YES,destroyOnRemoval:NO,arrangedObjects:function(){return this
}.property().cacheable(),canRemoveContent:function(){var content=this.get("content"),ret;
ret=!!content&&this.get("isEditable")&&this.get("hasContent");if(ret){return !content.isEnumerable||(SC.typeOf(content.removeObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable","hasContent"),canReorderContent:function(){var content=this.get("content"),ret;
ret=!!content&&this.get("isEditable")&&!this.get("orderBy");return ret&&!!content.isSCArray
}.property("content","isEditable","orderBy"),canAddContent:function(){var content=this.get("content"),ret;
ret=content&&this.get("isEditable")&&content.isEnumerable;if(ret){return(SC.typeOf(content.addObject)===SC.T_FUNCTION)||(SC.typeOf(content.pushObject)===SC.T_FUNCTION)
}else{return NO}}.property("content","isEditable"),hasContent:function(){var content=this.get("content");
return !!content&&(!!content.isEnumerable||!!this.get("allowsSingleContent"))}.property("content","allowSingleContent"),status:function(){var content=this.get("content"),ret=content?content.get("status"):null;
return ret?ret:SC.Record.READY}.property().cacheable(),addObject:function(object){if(!this.get("canAddContent")){throw"%@ cannot add content".fmt(this)
}var content=this.get("content");if(content.isSCArray){content.pushObject(object)
}else{if(content.addObject){content.addObject(object)}else{throw"%@.content does not support addObject".fmt(this)
}}return this},removeObject:function(object){if(!this.get("canRemoveContent")){throw"%@ cannot remove content".fmt(this)
}var content=this.get("content");if(content.isEnumerable){content.removeObject(object)
}else{this.set("content",null)}if(this.get("destroyOnRemoval")&&object.destroy){object.destroy()
}return this},length:function(){var content=this._scac_observableContent();return content?content.get("length"):0
}.property().cacheable(),objectAt:function(idx){var content=this._scac_observableContent();
return content?content.objectAt(idx):undefined},replace:function(start,amt,objects){if(!objects||objects.get("length")===0){if(!this.get("canRemoveContent")){throw"%@ cannot remove objects from the current content".fmt(this)
}}else{if(!this.get("canReorderContent")){throw"%@ cannot add or reorder the current content".fmt(this)
}}var content=this.get("content");var objsToDestroy=[],i,objsLen;if(this.get("destroyOnRemoval")){for(i=0;
i<amt;i++){objsToDestroy.push(content.objectAt(i+start))}}if(content){content.replace(start,amt,objects)
}for(i=0,objsLen=objsToDestroy.length;i<objsLen;i++){objsToDestroy[i].destroy()}objsToDestroy=null;
return this},indexOf:function(object,startAt){var content=this._scac_observableContent();
return content?content.indexOf(object,startAt):-1},init:function(){arguments.callee.base.apply(this,arguments);
this._scac_contentDidChange()},_scac_cached:NO,_scac_observableContent:function(){var ret=this._scac_cached;
if(ret){return ret}var content=this.get("content"),func,len,order;if(SC.none(content)){return(this._scac_cached=[])
}if(!content.isEnumerable){ret=this.get("allowsSingleContent")?[content]:[];return(this._scac_cached=ret)
}var orderBy=this.get("orderBy");if(!orderBy){if(content.isSCArray){return(this._scac_cached=content)
}else{throw"%@.orderBy is required for unordered content".fmt(this)}}var type=SC.typeOf(orderBy);
if(type===SC.T_STRING){orderBy=[orderBy]}else{if(type===SC.T_FUNCTION){func=orderBy
}else{if(type!==SC.T_ARRAY){throw"%@.orderBy must be Array, String, or Function".fmt(this)
}}}func=func||function(a,b){var status,key,match,descending;for(var i=0,l=orderBy.get("length");
i<l&&!status;i++){key=orderBy.objectAt(i);match=key.match(/^(ASC )?(DESC )?(.*)$/);
key=match[3];order=match[2]?-1:1;if(a){a=a.isObservable?a.get(key):a[key]}if(b){b=b.isObservable?b.get(key):b[key]
}status=SC.compare(a,b)*order}return status};return(this._scac_cached=content.toArray().sort(func))
},_scac_contentDidChange:function(){this._scac_cached=NO;var cur=this.get("content"),orders=!!this.get("orderBy"),last=this._scac_content,oldlen=this._scac_length||0,func=this._scac_rangeDidChange,efunc=this._scac_enumerableDidChange,sfunc=this._scac_contentStatusDidChange,newlen;
if(last===cur){return this}if(last){if(ro&&last.isSCArray){last.removeRangeObserver(ro)
}else{if(last.isEnumerable){last.removeObserver("[]",this,efunc)}}last.removeObserver("status",this,sfunc)
}ro=null;this._scac_cached=NO;this._scac_content=cur;if(cur){if(!orders&&cur.isSCArray){ro=cur.addRangeObserver(null,this,func)
}else{if(cur.isEnumerable){cur.addObserver("[]",this,efunc)}}newlen=cur.isEnumerable?cur.get("length"):1;
cur.addObserver("status",this,sfunc)}else{newlen=SC.none(cur)?0:1}this._scac_rangeObserver=ro;
this._scac_length=newlen;this._scac_contentStatusDidChange();this.enumerableContentDidChange(0,newlen,newlen-oldlen);
this.updateSelectionAfterContentChange()}.observes("content"),_scac_rangeDidChange:function(array,objects,key,indexes){if(key!=="[]"){return
}var content=this.get("content");this._scac_length=content.get("length");this._scac_cached=NO;
if(indexes){this.beginPropertyChanges();indexes.forEachRange(function(start,length){this.enumerableContentDidChange(start,length,0)
},this);this.endPropertyChanges();this.updateSelectionAfterContentChange()}},_scac_enumerableDidChange:function(){var content=this.get("content"),newlen=content?content.get("length"):0,oldlen=this._scac_length;
this._scac_length=newlen;this.beginPropertyChanges();this._scac_cached=NO;this.enumerableContentDidChange(0,newlen,newlen-oldlen);
this.endPropertyChanges();this.updateSelectionAfterContentChange()}.observes("orderBy"),_scac_contentStatusDidChange:function(){this.notifyPropertyChange("status")
}});sc_require("controllers/controller");SC.ObjectController=SC.Controller.extend({content:null,allowsMultipleContent:NO,hasContent:function(){return !SC.none(this.get("observableContent"))
}.property("observableContent"),isEditable:YES,observableContent:function(){var content=this.get("content"),len,allowsMultiple;
if(content&&content.isEnumerable){len=content.get("length");allowsMultiple=this.get("allowsMultipleContent");
if(len===1){content=content.firstObject()}else{if(len===0||!allowsMultiple){content=null
}}if(content&&!allowsMultiple&&content.isEnumerable){content=null}}return content
}.property("content","allowsMultipleContent").cacheable(),destroy:function(){var content=this.get("observableContent");
if(content&&SC.typeOf(content.destroy)===SC.T_FUNCTION){content.destroy()}this.set("content",null);
return this},contentPropertyDidChange:function(target,key){if(key==="*"){this.allPropertiesDidChange()
}else{this.notifyPropertyChange(key)}},unknownProperty:function(key,value){if(key==="content"){if(value!==undefined){this.content=value
}return this.content}var content=this.get("observableContent"),loc,cur,isSame;if(content===null||content===undefined){return undefined
}if(value===undefined){if(content.isEnumerable){value=content.getEach(key);loc=value.get("length");
if(loc>0){isSame=YES;cur=value.objectAt(0);while((--loc>0)&&isSame){if(cur!==value.objectAt(loc)){isSame=NO
}}if(isSame){value=cur}}else{value=undefined}}else{value=(content.isObservable)?content.get(key):content[key]
}}else{if(!this.get("isEditable")){throw"%@.%@ is not editable".fmt(this,key)}if(content.isEnumerable){content.setEach(key,value)
}else{if(content.isObservable){content.set(key,value)}else{content[key]=value}}}return value
},init:function(){arguments.callee.base.apply(this,arguments);if(this.get("content")){this._scoc_contentDidChange()
}if(this.get("observableContent")){this._scoc_observableContentDidChange()}},_scoc_contentDidChange:function(){var last=this._scoc_content,cur=this.get("content");
if(last!==cur){this._scoc_content=cur;var func=this._scoc_enumerableContentDidChange;
if(last&&last.isEnumerable){last.removeObserver("[]",this,func)}if(cur&&cur.isEnumerable){cur.addObserver("[]",this,func)
}}}.observes("content"),_scoc_observableContentDidChange:function(){var last=this._scoc_observableContent,cur=this.get("observableContent"),func=this.contentPropertyDidChange,efunc=this._scoc_enumerableContentDidChange;
if(last===cur){return this}this._scoc_observableContent=cur;if(last){if(last.isEnumerable){last.removeObserver("[]",this,efunc)
}else{if(last.isObservable){last.removeObserver("*",this,func)}}}if(cur){if(cur.isEnumerable){cur.addObserver("[]",this,efunc)
}else{if(cur.isObservable){cur.addObserver("*",this,func)}}}if((last&&last.isEnumerable)||(cur&&cur.isEnumerable)){this._scoc_enumerableContentDidChange()
}else{this.contentPropertyDidChange(cur,"*")}}.observes("observableContent"),_scoc_enumerableContentDidChange:function(){var cur=this.get("observableContent"),set=this._scoc_observableContentItems,func=this.contentPropertyDidChange;
if(set){set.forEach(function(item){if(item.isObservable){item.removeObserver("*",this,func)
}},this);set.clear()}if(cur&&cur.isEnumerable){if(!set){set=SC.Set.create()}cur.forEach(function(item){if(set.contains(item)){return
}set.add(item);if(item.isObservable){item.addObserver("*",this,func)}},this)}else{set=null
}this._scoc_observableContentItems=set;this.contentPropertyDidChange(cur,"*");return this
}});SC.mixin(SC.Object.prototype,{invokeLater:function(methodName,interval){if(interval===undefined){interval=1
}var f=methodName,args,func;if(arguments.length>2){args=SC.$A(arguments).slice(2);
if(SC.typeOf(f)===SC.T_STRING){f=this[methodName]}func=f;f=function(){return func.apply(this,args)
}}return SC.Timer.schedule({target:this,action:f,interval:interval})},invokeWith:function(pathName,target,method){if(method===undefined){method=target;
target=this}if(!target){target=this}if(SC.typeOf(method)===SC.T_STRING){method=target[method]
}var v=this.getPath(pathName);method.call(target,v,this);return this}});SC.RunLoop=SC.RunLoop.extend({startTime:function(){if(!this._start){this._start=Date.now()
}return this._start}.property(),endRunLoop:function(){this.fireExpiredTimers();var ret=arguments.callee.base.apply(this,arguments);
this.scheduleNextTimeout();return ret},scheduleTimer:function(timer,runTime){this._timerQueue=timer.removeFromTimerQueue(this._timerQueue);
this._timerQueue=timer.scheduleInTimerQueue(this._timerQueue,runTime);return this
},cancelTimer:function(timer){this._timerQueue=timer.removeFromTimerQueue(this._timerQueue);
return this},TIMER_ARRAY:[],fireExpiredTimers:function(){if(!this._timerQueue||this._firing){return NO
}var now=this.get("startTime"),timers=this.TIMER_ARRAY,idx,len,didFire;this._firing=YES;
this._timerQueue=this._timerQueue.collectExpiredTimers(timers,now);len=timers.length;
for(idx=0;idx<len;idx++){timers[idx].fire()}didFire=timers.length>0;timers.length=0;
this._firing=NO;return didFire},scheduleNextTimeout:function(){var timer=this._timerQueue;
var ret=NO;if(!timer){if(this._timeout){clearTimeout(this._timeout)}}else{var nextTimeoutAt=timer._timerQueueRunTime;
if(this._timeoutAt!==nextTimeoutAt){if(this._timeout){clearTimeout(this._timeout)
}var delay=Math.max(0,nextTimeoutAt-Date.now());this._timeout=setTimeout(this._timeoutDidFire,delay);
this._timeoutAt=nextTimeoutAt}ret=YES}return ret},_timeoutDidFire:function(){var rl=SC.RunLoop.currentRunLoop;
rl._timeout=rl._timeoutAt=null;SC.run()}});SC.RunLoop.currentRunLoop=SC.RunLoop.create();
SC.DelegateSupport={delegateFor:function(methodName){var idx=1,len=arguments.length,ret;
while(idx<len){ret=arguments[idx];if(ret&&ret[methodName]!==undefined){return ret
}idx++}return(this[methodName]!==undefined)?this:null},invokeDelegateMethod:function(delegate,methodName,args){args=SC.A(arguments);
args=args.slice(2,args.length);if(!delegate||!delegate[methodName]){delegate=this
}var method=delegate[methodName];return method?method.apply(delegate,args):null},getDelegateProperty:function(key,delegate){var idx=1,len=arguments.length,ret;
while(idx<len){ret=arguments[idx++];if(ret&&ret[key]!==undefined){return ret.get?ret.get(key):ret[key]
}}return(this[key]!==undefined)?this.get(key):undefined}};SC.Responder=SC.Object.extend({isResponder:YES,pane:null,responderContext:null,nextResponder:null,isFirstResponder:NO,hasFirstResponder:NO,acceptsFirstResponder:YES,becomingFirstResponder:NO,becomeFirstResponder:function(){var pane=this.get("pane")||this.get("responderContext")||this.pane();
if(pane&&this.get("acceptsFirstResponder")){if(pane.get("firstResponder")!==this){pane.makeFirstResponder(this)
}}return this},resignFirstResponder:function(evt){var pane=this.get("pane")||this.get("responderContext");
if(pane&&(pane.get("firstResponder")===this)){pane.makeFirstResponder(null,evt)}return YES
},willLoseFirstResponder:function(responder){},didBecomeFirstResponder:function(responder){}});
sc_require("system/responder");SC.ResponderContext={isResponderContext:YES,trace:NO,defaultResponder:null,nextResponder:function(){return this.get("defaultResponder")
}.property("defaultResponder").cacheable(),firstResponder:null,nextResponderFor:function(responder){var next=responder.get("nextResponder");
if(typeof next===SC.T_STRING){next=SC.objectForPropertyPath(next,this)}else{if(!next&&(responder!==this)){next=this
}}return next},responderNameFor:function(responder){if(!responder){return"(No Responder)"
}else{if(responder._scrc_name){return responder._scrc_name}}var n=this.NAMESPACE;
this._findResponderNamesFor(this,3,n?[this.NAMESPACE]:[]);return responder._scrc_name||responder.toString()
},_findResponderNamesFor:function(responder,level,path){var key,value;for(key in responder){if(key==="nextResponder"){continue
}value=responder[key];if(value&&value.isResponder){if(value._scrc_name){continue}path.push(key);
value._scrc_name=path.join(".");if(level>0){this._findResponderNamesFor(value,level-1,path)
}path.pop()}}},makeFirstResponder:function(responder,evt){var current=this.get("firstResponder"),last=this.get("nextResponder"),trace=this.get("trace"),common;
if(this._locked){if(trace){SC.Logger.log("%@: AFTER ACTION: makeFirstResponder => %@".fmt(this,this.responderNameFor(responder)))
}this._pendingResponder=responder;return}if(trace){SC.Logger.log("%@: makeFirstResponder => %@".fmt(this,this.responderNameFor(responder)))
}if(responder){responder.set("becomingFirstResponder",YES)}this._locked=YES;this._pendingResponder=null;
common=responder?responder:null;while(common){if(common.get("hasFirstResponder")){break
}common=(common===last)?null:this.nextResponderFor(common)}if(!common){common=last
}this._notifyWillLoseFirstResponder(current,current,common,evt);if(current){current.set("isFirstResponder",NO)
}this.beginPropertyChanges();this.set("firstResponder",responder);if(responder){responder.set("isFirstResponder",YES)
}this._notifyDidBecomeFirstResponder(responder,responder,common);this.endPropertyChanges();
this._locked=NO;if(this._pendingResponder){this.makeFirstResponder(this._pendingResponder);
this._pendingResponder=null}if(responder){responder.set("becomingFirstResponder",NO)
}return this},_notifyWillLoseFirstResponder:function(responder,cur,root,evt){if(cur===root){return
}cur.willLoseFirstResponder(responder,evt);cur.set("hasFirstResponder",NO);var next=this.nextResponderFor(cur);
if(next){this._notifyWillLoseFirstResponder(responder,next,root)}},_notifyDidBecomeFirstResponder:function(responder,cur,root){if(cur===root){return
}var next=this.nextResponderFor(cur);if(next){this._notifyDidBecomeFirstResponder(responder,next,root)
}cur.set("hasFirstResponder",YES);cur.didBecomeFirstResponder(responder)},resetFirstResponder:function(){var current=this.get("firstResponder");
if(!current){return}current.willLoseFirstResponder();current.didBecomeFirstResponder()
},sendAction:function(action,sender,context){var working=this.get("firstResponder"),last=this.get("nextResponder"),trace=this.get("trace"),handled=NO,responder;
this._locked=YES;if(trace){SC.Logger.log("%@: begin action '%@' (%@, %@)".fmt(this,action,sender,context))
}if(!handled&&!working&&this.tryToPerform){handled=this.tryToPerform(action,sender,context)
}while(!handled&&working){if(working.tryToPerform){handled=working.tryToPerform(action,sender,context)
}if(!handled){working=(working===last)?null:this.nextResponderFor(working)}}if(trace){if(!handled){SC.Logger.log("%@:  action '%@' NOT HANDLED".fmt(this,action))
}else{SC.Logger.log("%@: action '%@' handled by %@".fmt(this,action,this.responderNameFor(working)))
}}this._locked=NO;if(responder=this._pendingResponder){this._pendingResponder=null;
this.makeFirstResponder(responder)}return working}};SC.Locale=SC.Object.extend({init:function(){if(!this.language){SC.Locale._assignLocales()
}if(!this.hasStrings){var langs=this._deprecatedLanguageCodes||[];langs.push(this.language);
var idx=langs.length;var strings=null;while(!strings&&--idx>=0){strings=String[langs[idx]]
}if(strings){this.hasStrings=YES;this.strings=strings}}},hasStrings:NO,strings:{},toString:function(){if(!this.language){SC.Locale._assignLocales()
}return"SC.Locale["+this.language+"]"+SC.guidFor(this)},locWithDefault:function(string,def){var ret=this.strings[string];
if(SC.typeOf(ret)===SC.T_STRING){return ret}else{if(SC.typeOf(def)===SC.T_STRING){return def
}}return string}});SC.Locale.mixin({useAutodetectedLanguage:NO,preferredLanguage:null,createCurrentLocale:function(){var autodetect=(String.useAutodetectedLanguage!==undefined)?String.useAutodetectedLanguage:this.useAutodetectedLanguage;
var preferred=(String.preferredLanguage!==undefined)?String.preferredLanguage:this.preferredLanguage;
var lang=((autodetect)?SC.browser.language:null)||preferred||SC.browser.language||"en";
lang=SC.Locale.normalizeLanguage(lang);var klass=this.localeClassFor(lang);if(lang!=this.currentLanguage){this.currentLanguage=lang;
this.currentLocale=klass.create()}return this.currentLocale},localeClassFor:function(lang){lang=SC.Locale.normalizeLanguage(lang);
var parent,klass=this.locales[lang];if(!klass&&((parent=lang.split("-")[0])!==lang)&&(klass=this.locales[parent])){klass=this.locales[lang]=klass.extend()
}if(!klass){klass=this.locales[lang]=this.locales.en.extend()}return klass},define:function(localeName,options){var locale;
if(options===undefined&&(SC.typeOf(localeName)!==SC.T_STRING)){locale=this;options=localeName
}else{locale=SC.Locale.localeClassFor(localeName)}SC.mixin(locale.prototype,options);
return locale},options:function(){return this.prototype},addStrings:function(stringsHash){var strings=this.prototype.strings;
if(strings){if(!this.prototype.hasOwnProperty("strings")){this.prototype.strings=SC.clone(strings)
}}else{strings=this.prototype.strings={}}if(stringsHash){this.prototype.strings=SC.mixin(strings,stringsHash)
}this.prototype.hasStrings=YES;return this},_map:{english:"en",french:"fr",german:"de",japanese:"ja",jp:"ja",spanish:"es"},normalizeLanguage:function(languageCode){if(!languageCode){return"en"
}return SC.Locale._map[languageCode.toLowerCase()]||languageCode},_assignLocales:function(){for(var key in this.locales){this.locales[key].prototype.language=key
}},toString:function(){if(!this.prototype.language){SC.Locale._assignLocales()}return"SC.Locale["+this.prototype.language+"]"
},extend:function(){var ret=SC.Object.extend.apply(this,arguments);ret.addStrings=SC.Locale.addStrings;
ret.define=SC.Locale.define;ret.options=SC.Locale.options;ret.toString=SC.Locale.toString;
return ret}});SC.Locale.locales={en:SC.Locale.extend({_deprecatedLanguageCodes:["English"]}),fr:SC.Locale.extend({_deprecatedLanguageCodes:["French"]}),de:SC.Locale.extend({_deprecatedLanguageCodes:["German"]}),ja:SC.Locale.extend({_deprecatedLanguageCodes:["Japanese","jp"]}),es:SC.Locale.extend({_deprecatedLanguageCodes:["Spanish"]})};
SC.stringsFor=function(languageCode,strings){var locale=SC.Locale.localeClassFor(languageCode);
locale.addStrings(strings);return this};sc_require("system/locale");SC.STRING_TITLEIZE_REGEXP=(/([\s|\-|\_|\n])([^\s|\-|\_|\n]?)/g);
SC.STRING_DECAMELIZE_REGEXP=(/([a-z])([A-Z])/g);SC.STRING_DASHERIZE_REGEXP=(/[ _]/g);
SC.STRING_DASHERIZE_CACHE={};SC.String={capitalize:function(){return this.charAt(0).toUpperCase()+this.slice(1)
},camelize:function(){var ret=this.replace(SC.STRING_TITLEIZE_REGEXP,function(str,separater,character){return(character)?character.toUpperCase():""
});var first=ret.charAt(0),lower=first.toLowerCase();return(first!==lower)?(lower+ret.slice(1)):ret
},decamelize:function(){return this.replace(SC.STRING_DECAMELIZE_REGEXP,"$1_$2").toLowerCase()
},dasherize:function(){var cache=SC.STRING_DASHERIZE_CACHE,ret=cache[this];if(ret){return ret
}else{ret=this.decamelize().replace(SC.STRING_DASHERIZE_REGEXP,"-");cache[this]=ret
}return ret},loc:function(){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var str=SC.Locale.currentLocale.locWithDefault(this);if(SC.typeOf(str)!==SC.T_STRING){str=this
}return str.fmt.apply(str,arguments)},locWithDefault:function(def){if(!SC.Locale.currentLocale){SC.Locale.createCurrentLocale()
}var str=SC.Locale.currentLocale.locWithDefault(this,def);if(SC.typeOf(str)!==SC.T_STRING){str=this
}var args=SC.$A(arguments);args.shift();return str.fmt.apply(str,args)}};SC.supplement(String.prototype,SC.String);
String.prototype.loc=SC.String.loc;SC.String.fmt=String.prototype.fmt;SC.mixin(SC.browser,{compareVersion:function(){if(this._versionSplit===undefined){var coerce=function(part){return Number(part.match(/^[0-9]+/))
};this._versionSplit=SC.A(this.version.split(".")).map(coerce)}var tests=SC.A(arguments).map(Number);
for(var i=0;i<tests.length;i++){var check=this._versionSplit[i]-tests[i];if(isNaN(check)){return 0
}if(check!==0){return check}}return 0}});SC.Builder=function(props){return SC.Builder.create(props)
};SC.Builder.create=function create(props){var fn=SC.mixin(SC.beget(this.fn),props||{});
if(props.hasOwnProperty("toString")){fn.toString=props.toString}var construct=function(){var ret=SC.beget(fn);
ret.defaultClass=this;ret.constructor=construct;return ret.init.apply(ret,arguments)
};construct.fn=construct.prototype=fn;construct.extend=SC.Builder.create;construct.mixin=SC.Builder.mixin;
return construct};SC.Builder.mixin=function(){var len=arguments.length,idx;for(idx=0;
idx<len;idx++){SC.mixin(this,arguments[idx])}return this};SC.Builder.fn={init:function(content){if(content!==undefined){if(SC.typeOf(content)===SC.T_ARRAY){var loc=content.length;
while(--loc>=0){this[loc]=content.objectAt?content.objectAt(loc):content[loc]}this.length=content.length
}else{this[0]=content;this.length=1}}return this},size:function(){return this.length
},pushStack:function(){var ret=this.constructor.apply(this,arguments);ret.prevObject=this;
return ret},end:function(){return this.prevObject||this.constructor()},toString:function(){return"%@$(%@)".fmt(this.defaultClass.toString(),SC.A(this).invoke("toString").join(","))
},mixin:SC.Builder.mixin};(function(){var enumerable=SC.Enumerable,fn=SC.Builder.fn,key,value;
for(key in enumerable){if(!enumerable.hasOwnProperty(key)){continue}value=Array.prototype[key]||enumerable[key];
fn[key]=value}})();sc_require("system/builder");SC.$=SC.CoreQuery=jQuery;SC.mixin(SC.$.fn,{isCoreQuery:YES,toString:function(){var values=[],len=this.length,idx=0;
for(idx=0;idx<len;idx++){values[idx]="%@: %@".fmt(idx,this[idx]?this[idx].toString():"(null)")
}return"<$:%@>(%@)".fmt(SC.guidFor(this),values.join(" , "))},isVisible:function(){return Array.prototype.every.call(this,function(elem){return SC.$.isVisible(elem)
})},view:function(){return this.map(function(){var ret=null,guidKey=SC.viewKey,dom=this,value;
while(!ret&&dom&&(dom!==document)){if(dom.nodeType===1&&(value=dom.getAttribute("id"))){ret=SC.View.views[value]
}dom=dom.parentNode}dom=null;return ret})},within:function(el){if(this.filter(el).length){return true
}return !!this.has(el).length}});(function(){var original={},wrappers={find:function(callback,target){return(target!==undefined)?SC.Enumerable.find.call(this,callback,target):original.find.call(this,callback)
},filter:function(callback,target){return(target!==undefined)?this.pushStack(SC.Enumerable.filter.call(this,callback,target)):original.filter.call(this,callback)
},filterProperty:function(key,value){return this.pushStack(SC.Enumerable.filterProperty.call(this,key,value))
},indexOf:SC.$.index,map:function(callback,target){return(target!==undefined)?SC.Enumerable.map.call(this,callback,target):original.map.call(this,callback)
}};var fn=SC.$.fn,enumerable=SC.Enumerable,value;for(var key in enumerable){if(enumerable.hasOwnProperty(key)){value=enumerable[key];
if(key in wrappers){original[key]=fn[key];value=wrappers[key]}fn[key]=value}}})();
SC.mixin(SC.$,{isVisible:function(elem){var CQ=SC.$;return("hidden"!=elem.type)&&(CQ.css(elem,"display")!="none")&&(CQ.css(elem,"visibility")!="hidden")
}});sc_require("system/core_query");SC.Event=function(originalEvent){var idx,len;
if(originalEvent){this.originalEvent=originalEvent;var props=SC.Event._props,key;
len=props.length;idx=len;while(--idx>=0){key=props[idx];this[key]=originalEvent[key]
}}this.timeStamp=this.timeStamp||Date.now();if(!this.target){this.target=this.srcElement||document
}if(this.target.nodeType===3){this.target=this.target.parentNode}if(!this.relatedTarget&&this.fromElement){this.relatedTarget=(this.fromElement===this.target)?this.toElement:this.fromElement
}if(SC.none(this.pageX)&&!SC.none(this.clientX)){var doc=document.documentElement,body=document.body;
this.pageX=this.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);
this.pageY=this.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0)
}if(!this.which&&((this.charCode||originalEvent.charCode===0)?this.charCode:this.keyCode)){this.which=this.charCode||this.keyCode
}if(!this.metaKey&&this.ctrlKey){this.metaKey=this.ctrlKey}if(!this.which&&this.button){this.which=((this.button&1)?1:((this.button&2)?3:((this.button&4)?2:0)))
}if(this.type==="mousewheel"||this.type==="DOMMouseScroll"||this.type==="MozMousePixelScroll"){var deltaMultiplier=1,version=parseFloat(SC.browser.version);
if(SC.browser.webkit&&originalEvent.wheelDelta!==undefined){this.wheelDelta=0-(originalEvent.wheelDeltaY||originalEvent.wheelDeltaX);
this.wheelDeltaY=0-(originalEvent.wheelDeltaY||0);this.wheelDeltaX=0-(originalEvent.wheelDeltaX||0);
if(!SC.browser.chrome){if(version>=533.17&&version<=533.19){deltaMultiplier=0.004
}else{if(version<533||version>=534){deltaMultiplier=40}}}}else{if(!SC.none(originalEvent.detail)){deltaMultiplier=10;
if(originalEvent.axis&&(originalEvent.axis===originalEvent.HORIZONTAL_AXIS)){this.wheelDeltaX=originalEvent.detail;
this.wheelDeltaY=this.wheelDelta=0}else{this.wheelDeltaY=this.wheelDelta=originalEvent.detail;
this.wheelDeltaX=0}}else{this.wheelDelta=this.wheelDeltaY=SC.browser.msie?0-originalEvent.wheelDelta:originalEvent.wheelDelta;
this.wheelDeltaX=0}}this.wheelDelta*=deltaMultiplier;this.wheelDeltaX*=deltaMultiplier;
this.wheelDeltaY*=deltaMultiplier}return this};SC.mixin(SC.Event,{create:function(e){return new SC.Event(e)
},add:function(elem,eventType,target,method,context,useCapture){if(elem&&elem.isCoreQuery){if(elem.length>0){elem.forEach(function(e){this.add(e,eventType,target,method,context)
},this);return this}else{elem=elem[0]}}if(!elem){return this}if(!useCapture){useCapture=NO
}if(elem.nodeType===3||elem.nodeType===8){return SC.Event}if(SC.browser.msie&&elem.setInterval){elem=window
}if(SC.typeOf(target)===SC.T_FUNCTION){context=method;method=target;target=null}else{if(target&&SC.typeOf(method)===SC.T_STRING){method=target[method]
}}var events=SC.data(elem,"events")||SC.data(elem,"events",{}),handlers=events[eventType];
if(!handlers){handlers=events[eventType]={};this._addEventListener(elem,eventType,useCapture)
}handlers[SC.hashFor(target,method)]=[target,method,context];SC.Event._global[eventType]=YES;
elem=events=handlers=null;return this},remove:function(elem,eventType,target,method){if(elem&&elem.isCoreQuery){if(elem.length>0){elem.forEach(function(e){this.remove(e,eventType,target,method)
},this);return this}else{elem=elem[0]}}if(!elem){return this}if(elem.nodeType===3||elem.nodeType===8){return SC.Event
}if(SC.browser.msie&&elem.setInterval){elem=window}var handlers,key,events=SC.data(elem,"events");
if(!events){return this}if(eventType===undefined){for(eventType in events){this.remove(elem,eventType)
}}else{if(handlers=events[eventType]){var cleanupHandlers=NO;if(target||method){if(SC.typeOf(target)===SC.T_FUNCTION){method=target;
target=null}else{if(SC.typeOf(method)===SC.T_STRING){method=target[method]}}delete handlers[SC.hashFor(target,method)];
key=null;for(key in handlers){break}if(key===null){cleanupHandlers=YES}}else{cleanupHandlers=YES
}if(cleanupHandlers){delete events[eventType];this._removeEventListener(elem,eventType)
}key=null;for(key in events){break}if(!key){SC.removeData(elem,"events");delete this._elements[SC.guidFor(elem)]
}}}elem=events=handlers=null;return this},NO_BUBBLE:["blur","focus","change"],simulateEvent:function(elem,eventType,attrs){var ret=SC.Event.create({type:eventType,target:elem,preventDefault:function(){this.cancelled=YES
},stopPropagation:function(){this.bubbles=NO},allowDefault:function(){this.hasCustomEventHandling=YES
},timeStamp:Date.now(),bubbles:(this.NO_BUBBLE.indexOf(eventType)<0),cancelled:NO,normalized:YES});
if(attrs){SC.mixin(ret,attrs)}return ret},trigger:function(elem,eventType,args,donative){if(elem&&elem.isCoreQuery){if(elem.length>0){elem.forEach(function(e){this.trigger(e,eventType,args,donative)
},this);return this}else{elem=elem[0]}}if(!elem){return this}if(elem.nodeType===3||elem.nodeType===8){return undefined
}args=SC.A(args);var ret,fn=SC.typeOf(elem[eventType]||null)===SC.T_FUNCTION,event,current,onfoo,isClick;
event=args[0];if(!event||!event.preventDefault){event=this.simulateEvent(elem,eventType);
args.unshift(event)}event.type=eventType;current=elem;do{ret=SC.Event.handle.apply(current,args);
current=(current===document)?null:(current.parentNode||document)}while(!ret&&event.bubbles&&current);
current=null;onfoo=elem["on"+eventType];isClick=SC.$.nodeName(elem,"a")&&eventType==="click";
if((!fn||isClick)&&onfoo&&onfoo.apply(elem,args)===NO){ret=NO}if(fn&&donative!==NO&&ret!==NO&&!isClick){this.triggered=YES;
try{elem[eventType]()}catch(e){}}this.triggered=NO;return ret},handle:function(event){if((typeof SC==="undefined")||SC.Event.triggered){return YES
}var val,ret,namespace,all,handlers,args,key,handler,method,target;args=SC.A(arguments);
args[0]=event=SC.Event.normalizeEvent(event||window.event);handlers=(SC.data(this,"events")||{})[event.type];
if(!handlers){return NO}for(key in handlers){handler=handlers[key];method=handler[1];
event.handler=method;event.data=event.context=handler[2];target=handler[0]||this;
ret=method.apply(target,args);if(val!==NO){val=ret}if(ret===NO){event.preventDefault();
event.stopPropagation()}}return val},unload:function(){var key,elements=this._elements;
for(key in elements){this.remove(elements[key])}for(key in elements){delete elements[key]
}delete this._elements},special:{ready:{setup:function(){SC._bindReady();return},teardown:function(){return
}},mouseenter:{setup:function(){if(SC.browser.msie){return NO}SC.Event.add(this,"mouseover",SC.Event.special.mouseenter.handler);
return YES},teardown:function(){if(SC.browser.msie){return NO}SC.Event.remove(this,"mouseover",SC.Event.special.mouseenter.handler);
return YES},handler:function(event){if(SC.Event._withinElement(event,this)){return YES
}event.type="mouseenter";return SC.Event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(SC.browser.msie){return NO
}SC.Event.add(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},teardown:function(){if(SC.browser.msie){return NO
}SC.Event.remove(this,"mouseout",SC.Event.special.mouseleave.handler);return YES},handler:function(event){if(SC.Event._withinElement(event,this)){return YES
}event.type="mouseleave";return SC.Event.handle.apply(this,arguments)}}},KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,_withinElement:function(event,elem){var parent=event.relatedTarget;
while(parent&&parent!=elem){try{parent=parent.parentNode}catch(error){parent=elem
}}return parent===elem},_addEventListener:function(elem,eventType,useCapture){var listener,special=this.special[eventType];
if(!useCapture){useCapture=NO}if(!special||special.setup.call(elem)===NO){var guid=SC.guidFor(elem);
this._elements[guid]=elem;listener=SC.data(elem,"listener")||SC.data(elem,"listener",function(){return SC.Event.handle.apply(SC.Event._elements[guid],arguments)
});if(elem.addEventListener){elem.addEventListener(eventType,listener,useCapture)
}else{if(elem.attachEvent){elem.attachEvent("on"+eventType,listener)}}}elem=special=listener=null
},_removeEventListener:function(elem,eventType){var listener,special=SC.Event.special[eventType];
if(!special||(special.teardown.call(elem)===NO)){listener=SC.data(elem,"listener");
if(listener){if(elem.removeEventListener){elem.removeEventListener(eventType,listener,NO)
}else{if(elem.detachEvent){elem.detachEvent("on"+eventType,listener)}}}}elem=special=listener=null
},_elements:{},normalizeEvent:function(event){if(event===window.event){return SC.Event.create(event)
}else{return event.normalized?event:SC.Event.create(event)}},_global:{},_props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view which touches targetTouches changedTouches animationName elapsedTime dataTransfer".split(" ")});
SC.Event.prototype={hasCustomEventHandling:NO,touchesForView:function(view){if(this.touchContext){return this.touchContext.touchesForView(view)
}},touchesForResponder:function(responder){if(this.touchContext){return this.touchContext.touchesForView(responder)
}},averagedTouchesForView:function(view){if(this.touchContext){return this.touchContext.averagedTouchesForView(view)
}return null},allowDefault:function(){this.hasCustomEventHandling=YES;return this
},preventDefault:function(){var evt=this.originalEvent;if(evt){if(evt.preventDefault){evt.preventDefault()
}evt.returnValue=NO}this.hasCustomEventHandling=YES;return this},stopPropagation:function(){var evt=this.originalEvent;
if(evt){if(evt.stopPropagation){evt.stopPropagation()}evt.cancelBubble=YES}this.hasCustomEventHandling=YES;
return this},stop:function(){return this.preventDefault().stopPropagation()},normalized:YES,getCharString:function(){if(SC.browser.msie){if(this.keyCode==8||this.keyCode==9||(this.keyCode>=37&&this.keyCode<=40)){return String.fromCharCode(0)
}else{return(this.keyCode>0)?String.fromCharCode(this.keyCode):null}}else{return(this.charCode>0)?String.fromCharCode(this.charCode):null
}},commandCodes:function(){var code=this.keyCode,ret=null,key=null,modifiers="",lowercase;
if(code){ret=SC.FUNCTION_KEYS[code];if(!ret&&(this.altKey||this.ctrlKey||this.metaKey)){ret=SC.PRINTABLE_KEYS[code]
}if(ret){if(this.altKey){modifiers+="alt_"}if(this.ctrlKey||this.metaKey){modifiers+="ctrl_"
}if(this.shiftKey){modifiers+="shift_"}}}if(!ret){code=this.which;key=ret=String.fromCharCode(code);
lowercase=ret.toLowerCase();if(this.metaKey){modifiers="meta_";ret=lowercase}else{ret=null
}}if(ret){ret=modifiers+ret}return[ret,key]}};SC.Event.observe=SC.Event.add;SC.Event.stopObserving=SC.Event.remove;
SC.Event.fire=SC.Event.trigger;if(SC.browser.msie){SC.Event.add(window,"unload",SC.Event.prototype,SC.Event.unload)
}SC.MODIFIER_KEYS={16:"shift",17:"ctrl",18:"alt"};SC.FUNCTION_KEYS={8:"backspace",9:"tab",13:"return",19:"pause",27:"escape",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"printscreen",45:"insert",46:"delete",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scrolllock"};
SC.PRINTABLE_KEYS={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:'"'};
SC.SYSTEM_CURSOR="default";SC.AUTO_CURSOR=SC.DEFAULT_CURSOR="auto";SC.CROSSHAIR_CURSOR="crosshair";
SC.HAND_CURSOR=SC.POINTER_CURSOR="pointer";SC.MOVE_CURSOR="move";SC.E_RESIZE_CURSOR="e-resize";
SC.NE_RESIZE_CURSOR="ne-resize";SC.NW_RESIZE_CURSOR="nw-resize";SC.N_RESIZE_CURSOR="n-resize";
SC.SE_RESIZE_CURSOR="se-resize";SC.SW_RESIZE_CURSOR="sw-resize";SC.S_RESIZE_CURSOR="s-resize";
SC.W_RESIZE_CURSOR="w-resize";SC.IBEAM_CURSOR=SC.TEXT_CURSOR="text";SC.WAIT_CURSOR="wait";
SC.HELP_CURSOR="help";SC.Cursor=SC.Object.extend({init:function(){arguments.callee.base.apply(this,arguments);
var cursorStyle=this.get("cursorStyle")||SC.DEFAULT_CURSOR,ss=this.constructor.sharedStyleSheet(),guid=SC.guidFor(this);
if(ss.insertRule){ss.insertRule("."+guid+" {cursor: "+cursorStyle+";}",ss.cssRules?ss.cssRules.length:0)
}else{if(ss.addRule){ss.addRule("."+guid,"cursor: "+cursorStyle)}}this.cursorStyle=cursorStyle;
this.className=guid;return this},className:null,cursorStyle:SC.DEFAULT_CURSOR,cursorStyleDidChange:function(){var cursorStyle,rule,selector,ss,rules,idx,len;
cursorStyle=this.get("cursorStyle")||SC.DEFAULT_CURSOR;rule=this._rule;if(rule){rule.style.cursor=cursorStyle;
return}selector="."+this.get("className");ss=this.constructor.sharedStyleSheet();
rules=(ss.cssRules?ss.cssRules:ss.rules)||[];for(idx=0,len=rules.length;idx<len;++idx){rule=rules[idx];
if(rule.selectorText===selector){this._rule=rule;rule.style.cursor=cursorStyle;break
}}}.observes("cursorStyle")});SC.Cursor.sharedStyleSheet=function(){var head,ss=this._styleSheet;
if(!ss){ss=document.createElement("style");ss.type="text/css";head=document.getElementsByTagName("head")[0];
if(!head){head=document.documentElement}head.appendChild(ss);ss=document.styleSheets[document.styleSheets.length-1];
this._styleSheet=ss}return ss};SC.Theme={isTheme:YES,classNames:SC.CoreSet.create(),_extend_class_names:function(classNames){if(classNames){if(SC.typeOf(classNames)===SC.T_HASH&&!classNames.isSet){for(var className in classNames){if(classNames[className]){this.classNames.add(className)
}else{this.classNames.remove(className)}}}else{if(typeof classNames==="string"){this.classNames.addEach(classNames.split(" "))
}else{this.classNames.addEach(classNames)}}}},_extend_self:function(ext){if(ext.classNames){this._extend_class_names(ext.classNames)
}var key,value,cur;for(key in ext){if(key==="classNames"){continue}if(!ext.hasOwnProperty(key)){continue
}value=ext[key];if(value instanceof Function&&!value.base&&(value!==(cur=this[key]))){value.base=cur
}this[key]=value}},create:function(){var result=SC.beget(this);result.baseTheme=this;
if(this.themes===SC.Theme.themes){result.themes={}}else{result.themes=SC.beget(this.themes)
}result._privateThemes={};result._specializedRenderers={};result._specializedThemes={};
result.classNames=SC.clone(this.classNames);var args=arguments,len=args.length,idx,mixin;
for(idx=0;idx<len;idx++){result._extend_self(args[idx])}if(result.name){result.classNames.add(result.name)
}return result},subtheme:function(name){var t=this.create({name:name});this.addTheme(t);
return t},invisibleSubtheme:function(name){var t=this.create({name:name});this._privateThemes[name]=t;
return t},themes:{},find:function(themeName){if(this===SC.Theme){return this.themes[themeName]
}var theme;theme=this._privateThemes[themeName];if(theme){return theme}theme=this._specializedThemes[themeName];
if(theme){return theme}theme=this.themes[themeName];if(theme&&!this._specializedThemes[themeName]){return(this._specializedThemes[themeName]=theme.create({classNames:this.classNames}))
}theme=SC.Theme.themes[themeName];if(theme){return theme}return null},addTheme:function(theme){this.themes[theme.name]=theme
},addRenderer:function(renderer){this[renderer.name]=renderer},renderer:function(name){var renderer=this._specializedRenderers[name],base=this[name];
if(!renderer||renderer._specializedFrom!==base){if(!base){return null}renderer=base.extend({classNames:this.classNames,theme:this})
}var args=SC.$A(arguments);args.shift();renderer=renderer.create.apply(renderer,args);
return renderer}};SC.BaseTheme=SC.Theme.create({name:""});SC.Theme.themes["sc-base"]=SC.BaseTheme;
SC.defaultTheme="sc-base";SC.CoreView=SC.Responder.extend(SC.DelegateSupport);sc_require("system/browser");
sc_require("system/event");sc_require("system/cursor");sc_require("system/responder");
sc_require("system/theme");sc_require("mixins/string");sc_require("views/view/base");
SC.CONTEXT_MENU_ENABLED=YES;SC.TABBING_ONLY_INSIDE_DOCUMENT=YES;SC.FROM_THEME="__FROM_THEME__";
SC.EMPTY_CHILD_VIEWS_ARRAY=[];SC.EMPTY_CHILD_VIEWS_ARRAY.needsClone=YES;SC.CoreView.reopen({concatenatedProperties:"outlets displayProperties classNames renderMixin didCreateLayerMixin willDestroyLayerMixin".w(),pane:function(){var view=this;
while(view&&!view.isPane){view=view.get("parentView")}return view}.property("parentView").cacheable(),page:null,parentView:null,isVisible:YES,isVisibleBindingDefault:SC.Binding.bool(),isVisibleInWindow:YES,childViews:SC.EMPTY_CHILD_VIEWS_ARRAY,layer:function(key,value){if(value!==undefined){this._view_layer=value
}else{value=this._view_layer;if(!value){var parent=this.get("parentView");if(parent){parent=parent.get("layer")
}if(parent){this._view_layer=value=this.findLayerInParentLayer(parent)}}}return value
}.property("isVisibleInWindow").cacheable(),$:function(sel){var layer=this.get("layer");
if(!layer){return SC.$()}else{if(sel===undefined){return SC.$(layer)}else{return SC.$(sel,layer)
}}},containerLayer:function(){return this.get("layer")}.property("layer").cacheable(),layerId:function(key,value){if(value){this._layerId=value
}if(this._layerId){return this._layerId}return SC.guidFor(this)}.property().cacheable(),findLayerInParentLayer:function(parentLayer){var id="#"+this.get("layerId");
return jQuery(id)[0]||jQuery(id,parentLayer)[0]},isDescendantOf:function(view){var parentView=this.get("parentView");
if(this===view){return YES}else{if(parentView){return parentView.isDescendantOf(view)
}else{return NO}}},displayDidChange:function(){this.set("layerNeedsUpdate",YES);return this
},_sc_isVisibleDidChange:function(){this.displayDidChange()}.observes("isVisible"),layerNeedsUpdate:NO,_view_layerNeedsUpdateDidChange:function(){if(this.get("layerNeedsUpdate")){this.invokeOnce(this.updateLayerIfNeeded)
}}.observes("layerNeedsUpdate"),updateLayerIfNeeded:function(skipIsVisibleInWindowCheck){var needsUpdate=this.get("layerNeedsUpdate"),shouldUpdate=needsUpdate&&(skipIsVisibleInWindowCheck||this.get("isVisibleInWindow"));
if(shouldUpdate){if(this.get("layer")){this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);
this.updateLayer();this.endPropertyChanges()}}return this},updateLayer:function(optionalContext){var mixins,idx,len,hasLegacyRenderMethod;
var context=optionalContext||this.renderContext(this.get("layer"));this._renderLayerSettings(context,NO);
hasLegacyRenderMethod=!this.update;if(hasLegacyRenderMethod){this.render(context,NO)
}else{this.update(context.$())}if(mixins=this.renderMixin){len=mixins.length;for(idx=0;
idx<len;++idx){mixins[idx].call(this,context,NO)}}context.update();if(context._innerHTMLReplaced){var pane=this.get("pane");
if(pane&&pane.get("isPaneAttached")){this._notifyDidAppendToDocument()}}if(this.useStaticLayout){this.viewDidResize()
}if(this.didUpdateLayer){this.didUpdateLayer()}if(this.designer&&this.designer.viewDidUpdateLayer){this.designer.viewDidUpdateLayer()
}return this},parentViewDidResize:function(){this.viewDidResize()},viewDidResize:function(){},renderContext:function(tagNameOrElement){return SC.RenderContext(tagNameOrElement)
},createLayer:function(){if(this.get("layer")){return this}var context=this.renderContext(this.get("tagName"));
this.renderToContext(context);this.set("layer",context.element());this._notifyDidCreateLayer();
return this},_notifyDidCreateLayer:function(){this.notifyPropertyChange("layer");
if(this.didCreateLayer){this.didCreateLayer()}var mixins=this.didCreateLayerMixin,len,idx,childViews=this.get("childViews"),childView;
if(mixins){len=mixins.length;for(idx=0;idx<len;++idx){mixins[idx].call(this)}}len=childViews.length;
for(idx=0;idx<len;++idx){childView=childViews[idx];if(!childView){continue}childView.notifyPropertyChange("layer");
childView._notifyDidCreateLayer()}},destroyLayer:function(){var layer=this.get("layer");
if(layer){this._notifyWillDestroyLayer();if(layer.parentNode){layer.parentNode.removeChild(layer)
}layer=null}return this},replaceLayer:function(){this.destroyLayer();this.invokeOnce(this.updateLayerLocation)
},parentViewDidChange:function(){this.updateLayerLocation()},updateLayerLocation:function(){var node=this.get("layer"),parentView=this.get("parentView"),parentNode=parentView?parentView.get("containerLayer"):null;
if(node&&node.parentNode&&node.parentNode!==parentNode){node.parentNode.removeChild(node)
}if(!parentView){if(node&&node.parentNode){node.parentNode.removeChild(node)}}else{if(!parentNode){if(node){if(node.parentNode){node.parentNode.removeChild(node)
}this.destroyLayer()}}else{if(!node){this.createLayer();node=this.get("layer");if(!node){return
}}var siblings=parentView.get("childViews"),nextView=siblings.objectAt(siblings.indexOf(this)+1),nextNode=(nextView)?nextView.get("layer"):null;
if(nextView&&(!nextNode||nextNode.parentNode!==parentNode)){nextView.updateLayerLocationIfNeeded();
nextNode=nextView.get("layer")}if((node.parentNode!==parentNode)||(node.nextSibling!==nextNode)){parentNode.insertBefore(node,nextNode)
}}}parentNode=parentView=node=nextNode=null;this.set("layerLocationNeedsUpdate",NO);
return this},_notifyWillDestroyLayer:function(){if(this.willDestroyLayer){this.willDestroyLayer()
}var mixins=this.willDestroyLayerMixin,len,idx,childViews=this.get("childViews");
if(mixins){len=mixins.length;for(idx=0;idx<len;++idx){mixins[idx].call(this)}}len=childViews.length;
for(idx=0;idx<len;++idx){childViews[idx]._notifyWillDestroyLayer()}this.set("layer",null)
},renderToContext:function(context,firstTime){var hasLegacyRenderMethod,mixins,idx,len;
this.beginPropertyChanges();this.set("layerNeedsUpdate",NO);if(SC.none(firstTime)){firstTime=YES
}this._renderLayerSettings(context,firstTime);hasLegacyRenderMethod=!this.update;
if(hasLegacyRenderMethod){this.render(context,firstTime)}else{if(firstTime){this.render(context)
}else{this.update(context.$())}}if(firstTime&&!this._didRenderChildViews){this.renderChildViews(context,firstTime)
}if(mixins=this.renderMixin){len=mixins.length;for(idx=0;idx<len;++idx){mixins[idx].call(this,context,firstTime)
}}this.endPropertyChanges()},_renderLayerSettings:function(context,firstTime){context.resetClassNames();
context.resetStyles();this.applyAttributesToContext(context)},applyAttributesToContext:function(context){context.addClass(this.get("classNames"));
if(this.get("isTextSelectable")){context.addClass("allow-select")}if(!this.get("isVisible")){context.addClass("hidden")
}if(this.get("isFirstResponder")){context.addClass("focus")}context.id(this.get("layerId"));
context.attr("role",this.get("ariaRole"))},prepareContext:function(context,firstTime){if(firstTime!==false){firstTime=YES
}if(firstTime){this.renderToContext(context)}else{this.updateLayer(context)}},renderChildViews:function(context,firstTime){var cv=this.get("childViews"),len=cv.length,idx,view;
for(idx=0;idx<len;++idx){view=cv[idx];if(!view){continue}context=context.begin(view.get("tagName"));
view.renderToContext(context,firstTime);context=context.end()}return context},render:function(){},_notifyDidAppendToDocument:function(){if(this.didAppendToDocument){this.didAppendToDocument()
}var i=0,child,childLen,children=this.get("childViews");for(i=0,childLen=children.length;
i<childLen;i++){child=children[i];if(child._notifyDidAppendToDocument){child._notifyDidAppendToDocument()
}}},childViewsObserver:function(){var childViews=this.get("childViews"),i,iLen,child;
for(i=0,iLen=childViews.length;i<iLen;i++){child=childViews[i];if(child._notifyDidAppendToDocument){child._notifyDidAppendToDocument()
}}}.observes("childViews"),tagName:"div",ariaRole:null,classNames:["sc-view"],toolTip:null,displayToolTip:function(){var ret=this.get("toolTip");
return(ret&&this.get("localize"))?ret.loc():(ret||"")}.property("toolTip","localize").cacheable(),isTextSelectable:NO,displayProperties:["isFirstResponder"],nextResponder:function(){return this.get("parentView")
}.property("parentView").cacheable(),acceptsFirstResponder:NO,init:function(){var parentView=this.get("parentView"),path,root,lp,displayProperties;
arguments.callee.base.apply(this,arguments);SC.View.views[this.get("layerId")]=this;
this.childViews=this.get("childViews").slice();this.createChildViews();displayProperties=this.get("displayProperties");
for(var i=0,l=displayProperties.length;i<l;i++){this.addObserver(displayProperties[i],this,this.displayDidChange)
}},awake:function(){arguments.callee.base.apply(this,arguments);var childViews=this.get("childViews"),len=childViews.length,idx;
for(idx=0;idx<len;++idx){if(!childViews[idx]){continue}childViews[idx].awake()}},frame:function(){return this.computeFrameWithParentFrame(null)
}.property("useStaticLayout").cacheable(),computeFrameWithParentFrame:function(pdim){var layer;
var pv=this.get("parentView");if(layer=this.get("layer")){f=SC.viewportOffset(layer);
if(pv){f=pv.convertFrameFromView(f,null)}f.width=layer.offsetWidth;f.height=layer.offsetHeight;
return f}return null},clippingFrame:function(){var f=this.get("frame"),ret=f,pv,cf;
if(!f){return null}pv=this.get("parentView");if(pv){cf=pv.get("clippingFrame");if(!cf){return f
}ret=SC.intersectRects(cf,f)}ret.x-=f.x;ret.y-=f.y;return ret}.property("parentView","frame").cacheable(),_sc_view_clippingFrameDidChange:function(){var cvs=this.get("childViews"),len=cvs.length,idx,cv;
for(idx=0;idx<len;++idx){cv=cvs[idx];cv.notifyPropertyChange("clippingFrame");cv._sc_view_clippingFrameDidChange()
}},removeChild:function(view){view.set("parentView",null);var childViews=this.get("childViews"),idx=childViews.indexOf(view);
if(idx>=0){childViews.removeAt(idx)}return this},removeAllChildren:function(){var childViews=this.get("childViews"),view;
while(view=childViews.objectAt(childViews.get("length")-1)){this.removeChild(view)
}return this},removeFromParent:function(){var parent=this.get("parentView");if(parent){parent.removeChild(this)
}return this},destroy:function(){if(this.get("isDestroyed")){return this}this._destroy();
if(this.get("parentView")){this.removeFromParent()}arguments.callee.base.apply(this,arguments);
return this},_destroy:function(){if(this.get("isDestroyed")){return this}this.destroyLayer();
var childViews=this.get("childViews"),len=childViews.length,idx;if(len){childViews=childViews.slice();
for(idx=0;idx<len;++idx){childViews[idx].destroy()}}delete SC.View.views[this.get("layerId")];
delete this._CQ;delete this.page;return this},createChildViews:function(){var childViews=this.get("childViews"),len=childViews.length,idx,key,views,view;
this.beginPropertyChanges();for(idx=0;idx<len;++idx){if(key=(view=childViews[idx])){if(typeof key===SC.T_STRING){view=this[key]
}else{key=null}if(!view){SC.Logger.error("No view with name "+key+" has been found in "+this.toString());
continue}view=this.createChildView(view);if(key){this[key]=view}}childViews[idx]=view
}this.endPropertyChanges();return this},createChildView:function(view,attrs){if(!view.isClass){attrs=view
}else{if(!attrs){attrs={}}else{attrs=SC.clone(attrs)}}attrs.owner=attrs.parentView=this;
attrs.isVisibleInWindow=this.get("isVisibleInWindow");if(!attrs.page){attrs.page=this.page
}if(view.isClass){view=view.create(attrs)}return view},isView:YES,selectStart:function(evt){return this.get("isTextSelectable")
},contextMenu:function(evt){if(!this.get("isContextMenuEnabled")){evt.stop()}return true
}});SC.CoreView.mixin({isViewClass:YES,design:function(){if(this.isDesign){return this
}var ret=this.extend.apply(this,arguments);ret.isDesign=YES;if(SC.ViewDesigner){SC.ViewDesigner.didLoadDesign(ret,this,SC.A(arguments))
}return ret},extend:function(){var last=arguments[arguments.length-1];if(last&&!SC.none(last.theme)){last.themeName=last.theme;
delete last.theme}return SC.Object.extend.apply(this,arguments)},layout:function(layout){this.prototype.layout=layout;
return this},classNames:function(sc){sc=(this.prototype.classNames||[]).concat(sc);
this.prototype.classNames=sc;return this},tagName:function(tg){this.prototype.tagName=tg;
return this},childView:function(cv){var childViews=this.prototype.childViews||[];
if(childViews===this.superclass.prototype.childViews){childViews=childViews.slice()
}childViews.push(cv);this.prototype.childViews=childViews;return this},bind:function(keyName,path){var p=this.prototype,s=this.superclass.prototype;
var bindings=p._bindings;if(!bindings||bindings===s._bindings){bindings=p._bindings=(bindings||[]).slice()
}keyName=keyName+"Binding";p[keyName]=path;bindings.push(keyName);return this},prop:function(keyName,value){this.prototype[keyName]=value;
return this},localization:function(attrs,rootElement){if(rootElement){attrs.rootElement=SC.$(rootElement)[0]
}return attrs},viewFor:function(element,attrs){var args=SC.$A(arguments);if(SC.none(element)){args.shift()
}else{args[0]={rootElement:SC.$(element)[0]}}var ret=this.create.apply(this,arguments);
args=args[0]=null;return ret},create:function(){var last=arguments[arguments.length-1];
if(last&&last.theme){last.themeName=last.theme;delete last.theme}var C=this,ret=new C(arguments);
if(SC.ViewDesigner){SC.ViewDesigner.didCreateView(ret,SC.$A(arguments))}return ret
},loc:function(loc){var childLocs=loc.childViews;delete loc.childViews;this.applyLocalizedAttributes(loc);
if(SC.ViewDesigner){SC.ViewDesigner.didLoadLocalization(this,SC.$A(arguments))}var childViews=this.prototype.childViews,idx=childViews.length,viewClass;
while(--idx>=0){viewClass=childViews[idx];loc=childLocs[idx];if(loc&&viewClass&&viewClass.loc){viewClass.loc(loc)
}}return this},applyLocalizedAttributes:function(loc){SC.mixin(this.prototype,loc)
},views:{}});SC.outlet=function(path,root){return function(key){return(this[key]=SC.objectForPropertyPath(path,(root!==undefined)?root:this))
}.property()};SC.CoreView.unload=function(){var views=SC.View.views;if(views){for(var key in views){if(!views.hasOwnProperty(key)){continue
}delete views[key]}}};SC.View=SC.CoreView.extend({});if(SC.browser.msie){SC.Event.add(window,"unload",SC.View,SC.View.unload)
}sc_require("views/view");sc_require("mixins/responder_context");SC.MIXED_STATE="__MIXED__";
SC.Pane=SC.View.extend(SC.ResponderContext,{isPane:YES,page:null,rootResponder:null,sendEvent:function(action,evt,target){var handler;
if(!target){target=this.get("firstResponder")}while(target){if(action==="touchStart"){if(evt.touchResponder===target){target=null;
break}if(!target.get("hasTouch")||target.get("acceptsMultitouch")){if(target.tryToPerform("touchStart",evt)){break
}}}else{if(action==="touchEnd"&&!target.get("acceptsMultitouch")){if(!target.get("hasTouch")){if(target.tryToPerform("touchEnd",evt)){break
}}}else{if(target.tryToPerform(action,evt)){break}}}target=(target===this)?null:target.get("nextResponder")
}if(!target&&(target=this.get("defaultResponder"))){if(typeof target===SC.T_STRING){target=SC.objectForPropertyPath(target)
}if(!target){target=null}else{target=target.tryToPerform(action,evt)?target:null}}else{if(!target&&!(target=this.get("defaultResponder"))){target=this.tryToPerform(action,evt)?this:null
}}return evt.mouseHandler||target},nextResponder:function(){return null}.property().cacheable(),firstResponder:null,acceptsKeyPane:YES,isKeyPane:NO,becomeKeyPane:function(){if(this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(this)}return this},resignKeyPane:function(){if(!this.get("isKeyPane")){return this
}if(this.rootResponder){this.rootResponder.makeKeyPane(null)}return this},makeFirstResponder:function(view,evt){var current=this.get("firstResponder"),isKeyPane=this.get("isKeyPane");
if(current===view){return this}if(SC.platform.touch&&view&&view.kindOf(SC.TextFieldView)&&!view.get("focused")){return this
}if(current){current.willLoseFirstResponder(current,evt)}if(isKeyPane){if(current){current.tryToPerform("willLoseKeyResponderTo",view)
}if(view){view.tryToPerform("willBecomeKeyResponderFrom",current)}}if(current){current.beginPropertyChanges().set("isFirstResponder",NO).set("isKeyResponder",NO).endPropertyChanges()
}this.set("firstResponder",view);if(view){view.beginPropertyChanges().set("isFirstResponder",YES).set("isKeyResponder",isKeyPane).endPropertyChanges()
}if(isKeyPane){if(view){view.tryToPerform("didBecomeKeyResponderFrom",current)}if(current){current.tryToPerform("didLoseKeyResponderTo",view)
}}if(view){view.didBecomeFirstResponder(view)}return this},willLoseKeyPaneTo:function(pane){this._forwardKeyChange(this.get("isKeyPane"),"willLoseKeyResponderTo",pane,NO);
return this},willBecomeKeyPaneFrom:function(pane){this._forwardKeyChange(!this.get("isKeyPane"),"willBecomeKeyResponderFrom",pane,YES);
return this},didLoseKeyPaneTo:function(pane){var isKeyPane=this.get("isKeyPane");
this.set("isKeyPane",NO);this._forwardKeyChange(isKeyPane,"didLoseKeyResponderTo",pane);
return this},didBecomeKeyPaneFrom:function(pane){var isKeyPane=this.get("isKeyPane");
this.set("isKeyPane",YES);this._forwardKeyChange(!isKeyPane,"didBecomeKeyResponderFrom",pane,YES);
return this},isMainPane:NO,focusFrom:function(pane){},blurTo:function(pane){},blurMainTo:function(pane){this.set("isMainPane",NO)
},focusMainFrom:function(pane){this.set("isMainPane",YES)},append:function(){return this.appendTo(document.body)
},remove:function(){if(!this.get("isVisibleInWindow")){return this}if(!this.get("isPaneAttached")){return this
}var dom=this.get("layer");if(dom&&dom.parentNode){dom.parentNode.removeChild(dom)
}dom=null;this._removeIntercept();this.resignKeyPane();var rootResponder=this.rootResponder;
if(this.get("isMainPane")){rootResponder.makeMainPane(null)}rootResponder.panes.remove(this);
this.rootResponder=null;this.set("isPaneAttached",NO);this.parentViewDidChange();
return this},insert:function(fn){var layer=this.get("layer");if(!layer){layer=this.createLayer().get("layer")
}fn(layer);if(!this.get("isPaneAttached")){this.paneDidAttach()}return this},appendTo:function(elem){return this.insert(function(layer){jQuery(elem).append(layer)
})},paneDidAttach:function(){var responder=(this.rootResponder=SC.RootResponder.responder);
responder.panes.add(this);this.set("isPaneAttached",YES);this.recomputeDependentProperties();
this._notifyDidAppendToDocument();this._addIntercept();return this},recomputeDependentProperties:function(){},isPaneAttached:NO,wantsTouchIntercept:NO,hasTouchIntercept:function(){return this.get("wantsTouchIntercept")&&SC.platform.touch
}.property("wantsTouchIntercept").cacheable(),zIndex:0,touchZ:99,_addIntercept:function(){if(this.get("hasTouchIntercept")){var div=document.createElement("div");
var divStyle=div.style;divStyle.position="absolute";divStyle.left="0px";divStyle.top="0px";
divStyle.right="0px";divStyle.bottom="0px";divStyle.webkitTransform="translateZ(0px)";
divStyle.zIndex=this.get("zIndex")+this.get("touchZ");div.className="touch-intercept";
div.id="touch-intercept-"+SC.guidFor(this);this._touchIntercept=div;document.body.appendChild(div)
}},_removeIntercept:function(){if(this._touchIntercept){document.body.removeChild(this._touchIntercept);
this._touchIntercept=null}},hideTouchIntercept:function(){if(this._touchIntercept){this._touchIntercept.style.display="none"
}},showTouchIntercept:function(){if(this._touchIntercept){this._touchIntercept.style.display="block"
}},recomputeIsVisibleInWindow:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}var previous=this.get("isVisibleInWindow"),current=this.get("isVisible")&&this.get("isPaneAttached");
if(previous!==current){this.set("isVisibleInWindow",current);var childViews=this.get("childViews"),len=childViews.length,idx,view;
for(idx=0;idx<len;idx++){view=childViews[idx];if(view.recomputeIsVisibleInWindow){view.recomputeIsVisibleInWindow(current)
}}if(current){if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}else{if(this.get("isKeyPane")){this.resignKeyPane()}}}this.updateLayerIfNeeded(YES);
return this},updateLayerLocation:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}return this},init:function(){if(this.hasTouchIntercept===YES){SC.Logger.warn("Do not set hasTouchIntercept directly. Use wantsTouchIntercept instead.");
this.hasTouchIntercept=SC.platform.touch}var hasLayer=!!this.get("layer");arguments.callee.base.apply(this,arguments);
if(hasLayer){this.paneDidAttach()}},classNames:"sc-pane".w()});sc_require("panes/pane");
SC.Pane.reopen({performKeyEquivalent:function(keystring,evt){var ret=arguments.callee.base.apply(this,arguments);
if(!ret){var defaultResponder=this.get("defaultResponder");if(defaultResponder){if(defaultResponder.performKeyEquivalent){ret=defaultResponder.performKeyEquivalent(keystring,evt)
}if(!ret&&defaultResponder.tryToPerform){ret=defaultResponder.tryToPerform(keystring,evt)
}}}return ret},keyDown:function(evt){var nextValidKeyView;if((evt.which===9||(SC.browser.mozilla&&evt.keyCode===9))&&!this.get("firstResponder")){if(evt.shiftKey){nextValidKeyView=this.get("previousValidKeyView")
}else{nextValidKeyView=this.get("nextValidKeyView")}if(nextValidKeyView){this.makeFirstResponder(nextValidKeyView);
return YES}}return NO},_forwardKeyChange:function(shouldForward,methodName,pane,isKey){var keyView,responder,newKeyView;
if(shouldForward&&(responder=this.get("firstResponder"))){newKeyView=(pane)?pane.get("firstResponder"):null;
keyView=this.get("firstResponder");if(keyView&&keyView[methodName]){keyView[methodName](newKeyView)
}if((isKey!==undefined)&&responder){responder.set("isKeyResponder",isKey)}}}});sc_require("panes/pane");
SC.Pane.reopen({currentWindowSize:null,computeParentDimensions:function(frame){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}var wframe=this.get("currentWindowSize"),wDim={x:0,y:0,width:1000,height:1000},layout=this.get("layout");
if(wframe){wDim.width=wframe.width;wDim.height=wframe.height}else{if(SC.RootResponder.responder){var wSize=SC.RootResponder.responder.get("currentWindowSize");
if(wSize){wDim.width=wSize.width;wDim.height=wSize.height}}else{var size,body,docElement;
if(!this._bod||!this._docElement){body=document.body;docElement=document.documentElement;
this._body=body;this._docElement=docElement}else{body=this._body;docElement=this._docElement
}if(window.innerHeight){wDim.width=window.innerWidth;wDim.height=window.innerHeight
}else{if(docElement&&docElement.clientHeight){wDim.width=docElement.clientWidth;wDim.height=docElement.clientHeight
}else{if(body){wDim.width=body.clientWidth;wDim.height=body.clientHeight}}}this.windowSizeDidChange(null,wDim)
}}if(layout.minHeight||layout.minWidth){if(layout.minHeight){wDim.height=Math.max(wDim.height,layout.minHeight)
}if(layout.minWidth){wDim.width=Math.max(wDim.width,layout.minWidth)}}return wDim
},frame:function(){if(this.get("designer")&&SC.suppressMain){return arguments.callee.base.apply(this,arguments)
}return this.computeFrameWithParentFrame(null)}.property(),windowSizeDidChange:function(oldSize,newSize){this.set("currentWindowSize",newSize);
this.parentViewDidResize();return this},paneLayoutDidChange:function(){this.invokeOnce(this.updateLayout)
}.observes("layout"),recomputeDependentProperties:function(original){this.set("currentWindowSize",this.rootResponder.computeWindowSize());
original()}.enhance()});sc_require("panes/pane");SC.Pane.reopen({prependTo:function(elem){return this.insert(function(layer){jQuery(elem).prepend(layer)
})},removeFromParent:function(){throw SC.Error.desc("SC.Pane cannot be removed from its parent, since it's the root. Did you mean remove()?")
}});SC.TemplatePane=SC.Object.extend({});SC.mixin(SC.TemplatePane,{append:function(attrs){var pane=SC.MainPane.extend({childViews:["contentView"],contentView:SC.TemplateView.design(attrs)});
return pane.create().append()}});sc_require("panes/pane");SC.Pane.reopen({recomputeDependentProperties:function(original){this.recomputeIsVisibleInWindow();
original()}.enhance()});SC.Application=SC.Responder.extend(SC.ResponderContext,{});
SC.BENCHMARK_LOG_READY=YES;sc_require("system/event");SC.mixin({isReady:NO,ready:function(target,method){var queue=this._readyQueue;
if(method===undefined){method=target;target=null}else{if(SC.typeOf(method)===SC.T_STRING){method=target[method]
}}jQuery(document).ready(function(){method.call(target)});return this},onReady:{startRunLoop:function(){SC.RunLoop.begin()
},setupLocales:function(){SC.Locale.createCurrentLocale();jQuery("body").addClass(SC.Locale.currentLanguage.toLowerCase())
},removeLoading:function(){jQuery("#loading").remove()},done:function(){SC.isReady=true;
if(window.main&&!SC.suppressMain&&(SC.mode===SC.APP_MODE)){main()}SC.RunLoop.end()
}}});jQuery(document).ready(SC.onReady.startRunLoop).ready(SC.onReady.setupLocales).ready(SC.onReady.removeLoading);
jQuery.event.special.ready._default=SC.onReady.done;SC.removeLoading=YES;SC.APP_MODE="APP_MODE";
SC.TEST_MODE="TEST_MODE";SC.mode=SC.APP_MODE;SC.platform={touch:(("createTouch" in document)&&SC.browser.chrome<9)||SC.browser.android,bounceOnScroll:SC.browser.iOS,pinchToZoom:SC.browser.iOS,input:{placeholder:("placeholder" in document.createElement("input"))},input:function(attributes){var ret={},len=attributes.length,elem=document.createElement("input"),attr,idx;
for(idx=0;idx<len;idx++){attr=attributes[idx];ret[attr]=!!(attr in elem)}return ret
}(("autocomplete readonly list size required multiple maxlength pattern min max step placeholder").w()),standalone:!!navigator.standalone,cssPrefix:null,domCSSPrefix:null,simulateTouchEvents:function(){if(this.touch){SC.Logger.info("Can't simulate touch events in an environment that supports them.");
return}SC.Logger.log("Simulating touch events");SC.platform.touch=YES;SC.platform.bounceOnScroll=YES;
document.body.className=document.body.className+" touch";this._simtouch_counter=1;
this.removeEvents("click dblclick mouseout mouseover mousewheel".w());this.replaceEvent("mousemove",this._simtouch_mousemove);
this.replaceEvent("mousedown",this._simtouch_mousedown);this.replaceEvent("mouseup",this._simtouch_mouseup);
SC.platform.windowSizeDeterminesOrientation=YES;SC.device.orientationHandlingShouldChange()
},removeEvents:function(events){var idx,len=events.length,key;for(idx=0;idx<len;idx++){key=events[idx];
SC.Event.remove(document,key,SC.RootResponder.responder,SC.RootResponder.responder[key])
}},replaceEvent:function(evt,replacement){SC.Event.remove(document,evt,SC.RootResponder.responder,SC.RootResponder.responder[evt]);
SC.Event.add(document,evt,this,replacement)},_simtouch_mousemove:function(evt){if(!this._mousedown){if(evt.altKey&&this._pinchCenter==null){this._pinchCenter={pageX:evt.pageX,pageY:evt.pageY,screenX:evt.screenX,screenY:evt.screenY,clientX:evt.clientX,clientY:evt.clientY}
}else{if(!evt.altKey&&this._pinchCenter!=null){this._pinchCenter=null}}return NO}var manufacturedEvt=this.manufactureTouchEvent(evt,"touchmove");
return SC.RootResponder.responder.touchmove(manufacturedEvt)},_simtouch_mousedown:function(evt){this._mousedown=YES;
var manufacturedEvt=this.manufactureTouchEvent(evt,"touchstart");return SC.RootResponder.responder.touchstart(manufacturedEvt)
},_simtouch_mouseup:function(evt){var manufacturedEvt=this.manufactureTouchEvent(evt,"touchend"),ret=SC.RootResponder.responder.touchend(manufacturedEvt);
this._mousedown=NO;this._simtouch_counter++;return ret},manufactureTouchEvent:function(evt,type){var realTouch,virtualTouch,realTouchIdentifier=this._simtouch_counter;
realTouch={type:type,target:evt.target,identifier:realTouchIdentifier,pageX:evt.pageX,pageY:evt.pageY,screenX:evt.screenX,screenY:evt.screenY,clientX:evt.clientX,clientY:evt.clientY};
evt.touches=[realTouch];if(evt.altKey&&this._pinchCenter!=null){var pageX=this._pinchCenter.pageX+this._pinchCenter.pageX-evt.pageX,pageY=this._pinchCenter.pageY+this._pinchCenter.pageY-evt.pageY,screenX=this._pinchCenter.screenX+this._pinchCenter.screenX-evt.screenX,screenY=this._pinchCenter.screenY+this._pinchCenter.screenY-evt.screenY,clientX=this._pinchCenter.clientX+this._pinchCenter.clientX-evt.clientX,clientY=this._pinchCenter.clientY+this._pinchCenter.clientY-evt.clientY,virtualTouchIdentifier=this._simtouch_counter+1;
virtualTouch={type:type,target:evt.target,identifier:virtualTouchIdentifier,pageX:pageX,pageY:pageY,screenX:screenX,screenY:screenY,clientX:clientX,clientY:clientY};
evt.touches=[realTouch,virtualTouch]}evt.changedTouches=evt.touches;return evt},supportsCSSTransitions:NO,supportsCSSTransforms:NO,understandsCSS3DTransforms:NO,supportsCSS3DTransforms:NO,supportsAcceleratedLayers:NO,supportsHashChange:function(){return("onhashchange" in window)&&(document.documentMode===undefined||document.documentMode>7)
}(),supportsHistory:function(){return !!(window.history&&window.history.pushState)
}(),supportsCanvas:function(){return !!document.createElement("canvas").getContext
}(),supportsOrientationChange:("onorientationchange" in window),windowSizeDeterminesOrientation:SC.browser.iOS||!("onorientationchange" in window)};
(function(){var userAgent=navigator.userAgent.toLowerCase();if((/webkit/).test(userAgent)){SC.platform.cssPrefix="webkit";
SC.platform.domCSSPrefix="Webkit"}else{if((/opera/).test(userAgent)){SC.platform.cssPrefix="opera";
SC.platform.domCSSPrefix="O"}else{if((/msie/).test(userAgent)&&!(/opera/).test(userAgent)){SC.platform.cssPrefix="ms";
SC.platform.domCSSPrefix="ms"}else{if((/mozilla/).test(userAgent)&&!(/(compatible|webkit)/).test(userAgent)){SC.platform.cssPrefix="moz";
SC.platform.domCSSPrefix="Moz"}}}}})();(function(){var el=document.createElement("div");
var css_browsers=["-moz-","-moz-","-o-","-ms-","-webkit-"];var test_browsers=["moz","Moz","o","ms","webkit"];
var css="",i=null;for(i=0;i<css_browsers.length;i++){css+=css_browsers[i]+"transition:all 1s linear;";
css+=css_browsers[i]+"transform: translate(1px, 1px);";css+=css_browsers[i]+"perspective: 500px;"
}el.style.cssText=css;for(i=0;i<test_browsers.length;i++){if(el.style[test_browsers[i]+"TransitionProperty"]!==undefined){SC.platform.supportsCSSTransitions=YES
}if(el.style[test_browsers[i]+"Transform"]!==undefined){SC.platform.supportsCSSTransforms=YES
}if(el.style[test_browsers[i]+"Perspective"]!==undefined||el.style[test_browsers[i]+"PerspectiveProperty"]!==undefined){SC.platform.understandsCSS3DTransforms=YES;
SC.platform.supportsCSS3DTransforms=YES}}try{if(window.media&&window.media.matchMedium){if(!window.media.matchMedium("(-webkit-transform-3d)")){SC.platform.supportsCSS3DTransforms=NO
}}else{if(window.styleMedia&&window.styleMedia.matchMedium){if(!window.styleMedia.matchMedium("(-webkit-transform-3d)")){SC.platform.supportsCSS3DTransforms=NO
}}}}catch(e){SC.platform.supportsCSS3DTransforms=NO}if(SC.platform.supportsCSSTransforms&&SC.platform.cssPrefix==="webkit"){SC.platform.supportsAcceleratedLayers=YES
}})();sc_require("system/ready");sc_require("system/platform");SC.CAPTURE_BACKSPACE_KEY=NO;
SC.RootResponder=SC.Object.extend({panes:null,init:function(){arguments.callee.base.apply(this,arguments);
this.panes=SC.Set.create();if(SC.platform.supportsCSSTransitions){this[SC.platform.cssPrefix+"TransitionEnd"]=this.transitionEnd
}},mainPane:null,makeMainPane:function(pane){var currentMain=this.get("mainPane");
if(currentMain===pane){return this}this.beginPropertyChanges();if(this.get("keyPane")===currentMain){this.makeKeyPane(pane)
}this.set("mainPane",pane);if(currentMain){currentMain.blurMainTo(pane)}if(pane){pane.focusMainFrom(currentMain)
}this.endPropertyChanges();return this},menuPane:null,makeMenuPane:function(pane){if(pane&&!pane.get("acceptsMenuPane")){return this
}else{var currentMenu=this.get("menuPane");if(currentMenu===pane){return this}this.set("menuPane",pane)
}return this},keyPane:null,previousKeyPanes:[],makeKeyPane:function(pane){var newKeyPane,previousKeyPane,previousKeyPanes;
if(pane){if(!pane.get("acceptsKeyPane")){return this}else{previousKeyPane=this.get("keyPane");
if(previousKeyPane===pane){return this}else{if(previousKeyPane){previousKeyPanes=this.get("previousKeyPanes");
previousKeyPanes.push(previousKeyPane)}newKeyPane=pane}}}else{previousKeyPane=this.get("keyPane");
previousKeyPanes=this.get("previousKeyPanes");newKeyPane=null;while(previousKeyPanes.length>0){var candidate=previousKeyPanes.pop();
if(candidate.get("isPaneAttached")&&candidate.get("acceptsKeyPane")){newKeyPane=candidate;
break}}}if(!newKeyPane){var mainPane=this.get("mainPane");if(mainPane&&mainPane.get("acceptsKeyPane")){newKeyPane=mainPane
}}if(previousKeyPane){previousKeyPane.willLoseKeyPaneTo(newKeyPane)}if(newKeyPane){newKeyPane.willBecomeKeyPaneFrom(previousKeyPane)
}this.set("keyPane",newKeyPane);if(newKeyPane){newKeyPane.didBecomeKeyPaneFrom(previousKeyPane)
}if(previousKeyPane){previousKeyPane.didLoseKeyPaneTo(newKeyPane)}return this},currentWindowSize:null,computeWindowSize:function(){var size,bod,docElement;
if(!this._bod||!this._docElement){bod=document.body;docElement=document.documentElement;
this._bod=bod;this._docElement=docElement}else{bod=this._bod;docElement=this._docElement
}if(window.innerHeight){size={width:window.innerWidth,height:window.innerHeight}}else{if(docElement&&docElement.clientHeight){size={width:docElement.clientWidth,height:docElement.clientHeight}
}else{if(bod){size={width:bod.clientWidth,height:bod.clientHeight}}}}return size},resize:function(){this._resize();
return YES},_resize:function(){var newSize=this.computeWindowSize(),oldSize=this.get("currentWindowSize");
this.set("currentWindowSize",newSize);if(!SC.rectsEqual(newSize,oldSize)){SC.device.windowSizeDidChange(newSize);
if(this.panes){SC.run(function(){this.panes.invoke("windowSizeDidChange",oldSize,newSize)
},this)}}},hasFocus:NO,focus:function(){if(!this.get("hasFocus")){SC.$("body").addClass("sc-focus").removeClass("sc-blur");
SC.run(function(){this.set("hasFocus",YES)},this)}return YES},focusin:function(){this.focus()
},focusout:function(){this.blur()},blur:function(){if(this.get("hasFocus")){SC.$("body").addClass("sc-blur").removeClass("sc-focus");
SC.run(function(){this.set("hasFocus",NO)},this)}return YES},dragDidStart:function(drag){this._mouseDownView=drag;
this._drag=drag},defaultResponder:null,sendAction:function(action,target,sender,pane,context,firstResponder){target=this.targetForAction(action,target,sender,pane,firstResponder);
if(target&&target.isResponderContext){return !!target.sendAction(action,sender,context,firstResponder)
}else{return target&&target.tryToPerform(action,sender)}},_responderFor:function(target,methodName,firstResponder){var defaultResponder=target?target.get("defaultResponder"):null;
if(target){target=firstResponder||target.get("firstResponder")||target;do{if(target.respondsTo(methodName)){return target
}}while((target=target.get("nextResponder")))}if(typeof defaultResponder===SC.T_STRING){defaultResponder=SC.objectForPropertyPath(defaultResponder)
}if(!defaultResponder){return null}else{if(defaultResponder.isResponderContext){return defaultResponder
}else{if(defaultResponder.respondsTo(methodName)){return defaultResponder}else{return null
}}}},targetForAction:function(methodName,target,sender,pane,firstResponder){if(!methodName||(SC.typeOf(methodName)!==SC.T_STRING)){return null
}if(target){if(SC.typeOf(target)===SC.T_STRING){target=SC.objectForPropertyPath(target)||SC.objectForPropertyPath(target,sender)
}if(target&&!target.isResponderContext){if(target.respondsTo&&!target.respondsTo(methodName)){target=null
}else{if(SC.typeOf(target[methodName])!==SC.T_FUNCTION){target=null}}}return target
}if(pane){target=this._responderFor(pane,methodName,firstResponder);if(target){return target
}}var keyPane=this.get("keyPane"),mainPane=this.get("mainPane");if(keyPane&&(keyPane!==pane)){target=this._responderFor(keyPane,methodName)
}if(!target&&mainPane&&(mainPane!==keyPane)){target=this._responderFor(mainPane,methodName)
}if(!target&&(target=this.get("defaultResponder"))){if(SC.typeOf(target)===SC.T_STRING){target=SC.objectForPropertyPath(target);
if(target){this.set("defaultResponder",target)}}if(target&&!target.isResponderContext){if(target.respondsTo&&!target.respondsTo(methodName)){target=null
}else{if(SC.typeOf(target[methodName])!==SC.T_FUNCTION){target=null}}}}return target
},targetViewForEvent:function(evt){return evt.target?SC.$(evt.target).view()[0]:null
},sendEvent:function(action,evt,target){var pane,ret;SC.run(function(){if(target){pane=target.get("pane")
}else{pane=this.get("menuPane")||this.get("keyPane")||this.get("mainPane")}ret=(pane)?pane.sendEvent(action,evt,target):null
},this);return ret},listenFor:function(keyNames,target,receiver,useCapture){receiver=receiver?receiver:this;
keyNames.forEach(function(keyName){var method=receiver[keyName];if(method){SC.Event.add(target,keyName,receiver,method,null,useCapture)
}},this);target=null;return receiver},setup:function(){this.listenFor("touchstart touchmove touchend touchcancel".w(),document);
this.listenFor("keydown keyup beforedeactivate mousedown mouseup click dblclick mousemove selectstart contextmenu".w(),document).listenFor("resize".w(),window);
if(SC.browser.msie){this.listenFor("focusin focusout".w(),document)}else{this.listenFor("focus blur".w(),window)
}this.listenFor("webkitAnimationStart webkitAnimationIteration webkitAnimationEnd".w(),document);
if(SC.platform.supportsCSSTransitions){this.listenFor(["transitionEnd",SC.platform.cssPrefix+"TransitionEnd"],document)
}if(this.keypress){if(SC.CAPTURE_BACKSPACE_KEY&&SC.browser.mozilla){var responder=this;
document.onkeypress=function(e){e=SC.Event.normalizeEvent(e);return responder.keypress.call(responder,e)
}}else{SC.Event.add(document,"keypress",this,this.keypress)}}"drag selectstart".w().forEach(function(keyName){var method=this[keyName];
if(method){if(SC.browser.msie){var responder=this;document.body["on"+keyName]=function(e){return method.call(responder,SC.Event.normalizeEvent(event||window.event))
};SC.Event.add(window,"unload",this,function(){document.body["on"+keyName]=null})
}else{SC.Event.add(document,keyName,this,method)}}},this);var mousewheel="mousewheel";
if(SC.browser.mozilla){if(SC.browser.compareVersion(1,9,1)<0){mousewheel="DOMMouseScroll"
}else{mousewheel="MozMousePixelScroll"}}SC.Event.add(document,mousewheel,this,this.mousewheel);
if(SC.browser&&SC.platform&&SC.browser.mobileSafari&&!SC.platform.touch){SC.platform.simulateTouchEvents()
}this.set("currentWindowSize",this.computeWindowSize());this.focus();if(SC.browser.mobileSafari){var f=SC.RunLoop.prototype.endRunLoop,patch;
patch=function(){if(f){f.apply(this,arguments)}var touches=SC.RootResponder.responder._touches,touch,elem,target,textNode,view,found=NO;
if(touches){for(touch in touches){if(touches[touch]._rescuedElement){continue}target=elem=touches[touch].target;
while(elem&&(elem=elem.parentNode)&&!found){found=(elem===document.body)}if(!found&&target){if(target.parentNode&&target.cloneNode){var clone=target.cloneNode(true);
target.parentNode.replaceChild(clone,target);target.swapNode=clone}var pen=SC.touchHoldingPen;
if(!pen){pen=SC.touchHoldingPen=document.createElement("div");pen.style.display="none";
document.body.appendChild(pen)}pen.appendChild(target);touches[touch]._rescuedElement=target
}}}};SC.RunLoop.prototype.endRunLoop=patch}},_touchedViews:{},_touches:{},touchesForView:function(view){if(this._touchedViews[SC.guidFor(view)]){return this._touchedViews[SC.guidFor(view)].touches
}},averagedTouchesForView:function(view,added){var t=this.touchesForView(view),averaged=view._scrr_averagedTouches||(view._scrr_averagedTouches={});
if((!t||t.length===0)&&!added){averaged.x=0;averaged.y=0;averaged.d=0;averaged.touchCount=0
}else{var touches=this._averagedTouches_touches||(this._averagedTouches_touches=[]);
touches.length=0;if(t){var i,len=t.length;for(i=0;i<len;i++){touches.push(t[i])}}if(added){touches.push(added)
}var idx,touch,ax=0,ay=0,dx,dy,ad=0;len=touches.length;for(idx=0;idx<len;idx++){touch=touches[idx];
ax+=touch.pageX;ay+=touch.pageY}ax/=len;ay/=len;for(idx=0;idx<len;idx++){touch=touches[idx];
dx=Math.abs(touch.pageX-ax);dy=Math.abs(touch.pageY-ay);ad+=Math.pow(dx*dx+dy*dy,0.5)
}ad/=len;averaged.x=ax;averaged.y=ay;averaged.d=ad;averaged.touchCount=len}return averaged
},assignTouch:function(touch,view){if(touch.hasEnded){throw"Attemt to assign a touch that is already finished."
}if(touch.view===view){return}if(touch.view){this.unassignTouch(touch)}if(!this._touchedViews[SC.guidFor(view)]){this._touchedViews[SC.guidFor(view)]={view:view,touches:SC.CoreSet.create([]),touchCount:0};
view.set("hasTouch",YES)}touch.view=view;this._touchedViews[SC.guidFor(view)].touches.add(touch);
this._touchedViews[SC.guidFor(view)].touchCount++},unassignTouch:function(touch){var view,viewEntry;
if(!touch.view){return}view=touch.view;viewEntry=this._touchedViews[SC.guidFor(view)];
viewEntry.touches.remove(touch);viewEntry.touchCount--;if(viewEntry.touchCount<1){view.set("hasTouch",NO);
viewEntry.view=null;delete this._touchedViews[SC.guidFor(view)]}touch.view=undefined
},_flushQueuedTouchResponder:function(){if(this._queuedTouchResponder){var queued=this._queuedTouchResponder;
this._queuedTouchResponder=null;this.makeTouchResponder.apply(this,queued)}},makeTouchResponder:function(touch,responder,shouldStack,upViewChain){if(this._isMakingTouchResponder){this._queuedTouchResponder=[touch,responder,shouldStack,upViewChain];
return}this._isMakingTouchResponder=YES;var stack=touch.touchResponders,touchesForView;
if(touch.touchResponder===responder){this._isMakingTouchResponder=NO;this._flushQueuedTouchResponder();
return}var pane;if(responder){pane=responder.get("pane")}else{pane=this.get("keyPane")||this.get("mainPane")
}if(stack.indexOf(responder)<0){if(upViewChain){try{responder=(pane)?pane.sendEvent("touchStart",touch,responder):null
}catch(e){SC.Logger.error("Error in touchStart: "+e);responder=null}}else{if((responder.get?responder.get("acceptsMultitouch"):responder.acceptsMultitouch)||!responder.hasTouch){if(!responder.touchStart(touch)){responder=null
}}else{}}}if(!shouldStack||(stack.indexOf(responder)>-1&&stack[stack.length-1]!==responder)){this.unassignTouch(touch);
var idx=stack.length-1,last=stack[idx];while(last&&last!==responder){touchesForView=this.touchesForView(last);
if((last.get?last.get("acceptsMultitouch"):last.acceptsMultitouch)||!touchesForView){if(last.touchCancelled){last.touchCancelled(touch)
}}idx--;last=stack[idx];stack.pop();touch.touchResponder=stack[idx];touch.nextTouchResponder=stack[idx-1]
}}if(responder){this.assignTouch(touch,responder);if(responder!==touch.touchResponder){stack.push(responder);
touch.touchResponder=responder;touch.nextTouchResponder=stack[stack.length-2]}}this._isMakingTouchResponder=NO;
this._flushQueuedTouchResponder()},captureTouch:function(touch,startingPoint,shouldStack){if(!startingPoint){startingPoint=this
}var target=touch.targetView,view=target,chain=[],idx,len;if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("  -- Received one touch on %@".fmt(target.toString()))
}while(view&&(view!==startingPoint)){chain.unshift(view);view=view.get("nextResponder")
}for(len=chain.length,idx=0;idx<len;idx++){view=chain[idx];if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("  -- Checking %@ for captureTouch response…".fmt(view.toString()))
}if(view.tryToPerform("captureTouch",touch)){if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("   -- Making %@ touch responder because it returns YES to captureTouch".fmt(view.toString()))
}this.makeTouchResponder(touch,view,shouldStack,YES);return}}if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("   -- Didn't find a view that returned YES to captureTouch, so we're calling touchStart")
}this.makeTouchResponder(touch,target,shouldStack,YES)},endMissingTouches:function(presentTouches){var idx,len=presentTouches.length,map={},end=[];
for(idx=0;idx<len;idx++){map[presentTouches[idx].identifier]=YES}for(idx in this._touches){var id=this._touches[idx].identifier;
if(!map[id]){end.push(this._touches[idx])}}for(idx=0,len=end.length;idx<len;idx++){this.endTouch(end[idx]);
this.finishTouch(end[idx])}},_touchCount:0,endTouch:function(touchEntry,action,evt){if(!action){action="touchEnd"
}var responderIdx,responders,responder,originalResponder;this.unassignTouch(touchEntry);
if(touchEntry.touchResponder){originalResponder=touchEntry.touchResponder;responders=touchEntry.touchResponders;
responderIdx=responders.length-1;responder=responders[responderIdx];while(responder){if(responder[action]){responder[action](touchEntry,evt)
}if(touchEntry.touchResponder!==originalResponder){break}responderIdx--;responder=responders[responderIdx];
action="touchCancelled"}}},finishTouch:function(touch){var elem;this.unassignTouch(touch);
if(elem=touch._rescuedElement){if(elem.swapNode&&elem.swapNode.parentNode){elem.swapNode.parentNode.replaceChild(elem,elem.swapNode)
}else{if(elem.parentNode===SC.touchHoldingPen){SC.touchHoldingPen.removeChild(elem)
}}delete touch._rescuedElement;elem.swapNode=null;elem=null}touch.touchResponders=null;
touch.touchResponder=null;touch.nextTouchResponder=null;touch.hasEnded=YES;if(this._touches[touch.identifier]){delete this._touches[touch.identifier]
}},touchstart:function(evt){var hidingTouchIntercept=NO;SC.run(function(){this.endMissingTouches(evt.touches);
var idx,touches=evt.changedTouches,len=touches.length,target,view,touch,touchEntry;
evt.touchContext=this;for(idx=0;idx<len;idx++){touch=touches[idx];touchEntry=SC.Touch.create(touch,this);
if(!touchEntry.targetView){continue}if(touchEntry.hidesTouchIntercept){hidingTouchIntercept=YES
}touchEntry.timeStamp=evt.timeStamp;this._touches[touch.identifier]=touchEntry;touchEntry.event=evt;
this.captureTouch(touchEntry,this);touchEntry.event=null}},this);if(hidingTouchIntercept){return YES
}return evt.hasCustomEventHandling},touchmove:function(evt){SC.run(function(){var touches=evt.changedTouches,touch,touchEntry,idx,len=touches.length,view,changedTouches,viewTouches,firstTouch,changedViews={},loc,guid,hidingTouchIntercept=NO;
if(this._drag){touch=SC.Touch.create(evt.changedTouches[0],this);this._drag.tryToPerform("mouseDragged",touch)
}for(idx=0;idx<len;idx++){touch=touches[idx];touchEntry=this._touches[touch.identifier];
if(!touchEntry){continue}if(touchEntry.hidesTouchIntercept){hidingTouchIntercept=YES
}touchEntry.pageX=touch.pageX;touchEntry.pageY=touch.pageY;touchEntry.clientX=touch.clientX;
touchEntry.clientY=touch.clientY;touchEntry.screenX=touch.screenX;touchEntry.screenY=touch.screenY;
touchEntry.timeStamp=evt.timeStamp;touchEntry.event=evt;if(touchEntry.touchResponder){view=touchEntry.touchResponder;
guid=SC.guidFor(view);if(!changedViews[guid]){changedViews[guid]={view:view,touches:[]}
}changedViews[guid].touches.push(touchEntry)}}if(hidingTouchIntercept){evt.allowDefault();
return YES}for(idx in changedViews){view=changedViews[idx].view;changedTouches=changedViews[idx].touches;
evt.viewChangedTouches=changedTouches;viewTouches=this.touchesForView(view);firstTouch=viewTouches.firstObject();
evt.pageX=firstTouch.pageX;evt.pageY=firstTouch.pageY;evt.clientX=firstTouch.clientX;
evt.clientY=firstTouch.clientY;evt.screenX=firstTouch.screenX;evt.screenY=firstTouch.screenY;
evt.touchContext=this;view.tryToPerform("touchesDragged",evt,viewTouches)}touches=evt.changedTouches;
len=touches.length;for(idx=0;idx<len;idx++){touch=touches[idx];touchEntry=this._touches[touch.identifier];
if(touchEntry){touchEntry.event=null}}},this);return evt.hasCustomEventHandling},touchend:function(evt){var hidesTouchIntercept=NO;
SC.run(function(){var touches=evt.changedTouches,touch,touchEntry,idx,len=touches.length,view,elem,action=evt.isCancel?"touchCancelled":"touchEnd",a,responderIdx,responders,responder;
for(idx=0;idx<len;idx++){touch=touches[idx];touch.type="touchend";touchEntry=this._touches[touch.identifier];
if(!touchEntry){continue}touchEntry.timeStamp=evt.timeStamp;touchEntry.pageX=touch.pageX;
touchEntry.pageY=touch.pageY;touchEntry.clientX=touch.clientX;touchEntry.clientY=touch.clientY;
touchEntry.screenX=touch.screenX;touchEntry.screenY=touch.screenY;touchEntry.type="touchend";
touchEntry.event=evt;if(SC.LOG_TOUCH_EVENTS){SC.Logger.info("-- Received touch end")
}if(touchEntry.hidesTouchIntercept){touchEntry.unhideTouchIntercept();hidesTouchIntercept=YES
}if(this._drag){this._drag.tryToPerform("mouseUp",touch);this._drag=null}this.endTouch(touchEntry,action,evt);
this.finishTouch(touchEntry)}},this);if(hidesTouchIntercept){return YES}return evt.hasCustomEventHandling
},touchcancel:function(evt){evt.isCancel=YES;this.touchend(evt)},attemptKeyEquivalent:function(evt){var ret=null;
var keystring=evt.commandCodes()[0];if(!keystring){return NO}var menuPane=this.get("menuPane"),keyPane=this.get("keyPane"),mainPane=this.get("mainPane");
if(menuPane){ret=menuPane.performKeyEquivalent(keystring,evt);if(ret){return ret}}if(keyPane){ret=keyPane.performKeyEquivalent(keystring,evt);
if(ret||keyPane.get("isModal")){return ret}}if(!ret&&mainPane&&(mainPane!==keyPane)){ret=mainPane.performKeyEquivalent(keystring,evt);
if(ret||mainPane.get("isModal")){return ret}}return ret},_lastModifiers:null,_handleModifierChanges:function(evt){var m;
m=this._lastModifiers=(this._lastModifiers||{alt:false,ctrl:false,shift:false});var changed=false;
if(evt.altKey!==m.alt){m.alt=evt.altKey;changed=true}if(evt.ctrlKey!==m.ctrl){m.ctrl=evt.ctrlKey;
changed=true}if(evt.shiftKey!==m.shift){m.shift=evt.shiftKey;changed=true}evt.modifiers=m;
return(changed)?(this.sendEvent("flagsChanged",evt)?evt.hasCustomEventHandling:YES):YES
},_isFunctionOrNonPrintableKey:function(evt){return !!(evt.altKey||evt.ctrlKey||evt.metaKey||((evt.charCode!==evt.which)&&SC.FUNCTION_KEYS[evt.which]))
},_isModifierKey:function(evt){return !!SC.MODIFIER_KEYS[evt.charCode]},keydown:function(evt){if(SC.none(evt)){return YES
}var keyCode=evt.keyCode;if(SC.browser.mozilla&&evt.keyCode===9){this.keydownCounter=1
}if(keyCode===229){this._IMEInputON=YES;return this.sendEvent("keyDown",evt)}if(keyCode===27&&this._drag){this._drag.cancelDrag();
this._drag=null;this._mouseDownView=null;return YES}if(SC.browser.mozilla&&(evt.which===8)){return true
}var ret=this._handleModifierChanges(evt),target=evt.target||evt.srcElement,forceBlock=(evt.which===8)&&!SC.allowsBackspaceToPreviousPage&&(target===document.body);
if(this._isModifierKey(evt)){return(forceBlock?NO:ret)}ret=YES;if(this._isFunctionOrNonPrintableKey(evt)){if(keyCode>=37&&keyCode<=40&&SC.browser.mozilla){return YES
}ret=this.sendEvent("keyDown",evt);if(!ret){ret=!this.attemptKeyEquivalent(evt)}else{ret=evt.hasCustomEventHandling;
if(ret){forceBlock=NO}}}return forceBlock?NO:ret},keypress:function(evt){var ret,keyCode=evt.keyCode,isFirefox=!!SC.browser.mozilla;
if(SC.browser.mozilla&&evt.keyCode===9){this.keydownCounter++;if(this.keydownCounter==2){return YES
}}if(isFirefox&&(evt.which===8)){evt.which=keyCode;ret=this.sendEvent("keyDown",evt);
return ret?(SC.allowsBackspaceToPreviousPage||evt.hasCustomEventHandling):YES}else{var isFirefoxArrowKeys=(keyCode>=37&&keyCode<=40&&isFirefox),charCode=evt.charCode;
if((charCode!==undefined&&charCode===0&&evt.keyCode!==9)&&!isFirefoxArrowKeys){return YES
}if(isFirefoxArrowKeys){evt.which=keyCode}return this.sendEvent("keyDown",evt)?evt.hasCustomEventHandling:YES
}},keyup:function(evt){if(this._ffevt){this._ffevt=null}var ret=this._handleModifierChanges(evt);
if(this._isModifierKey(evt)){return ret}if(this._IMEInputON&&evt.keyCode===13){evt.isIMEInput=YES;
this.sendEvent("keyDown",evt);this._IMEInputON=NO}return this.sendEvent("keyUp",evt)?evt.hasCustomEventHandling:YES
},beforedeactivate:function(evt){var toElement=evt.toElement;if(toElement&&toElement.tagName&&toElement.tagName!=="IFRAME"){var view=SC.$(toElement).view()[0];
if(view&&view.get("blocksIEDeactivate")){return NO}}return YES},mousedown:function(evt){if(SC.platform.touch){evt.allowDefault();
return YES}if(!SC.browser.msie){window.focus()}this._clickCount+=1;if(!this._lastMouseUpAt||((Date.now()-this._lastMouseUpAt)>250)){this._clickCount=1
}else{var deltaX=this._lastMouseDownX-evt.clientX,deltaY=this._lastMouseDownY-evt.clientY,distance=Math.sqrt(deltaX*deltaX+deltaY*deltaY);
if(distance>8){this._clickCount=1}}evt.clickCount=this._clickCount;this._lastMouseDownX=evt.clientX;
this._lastMouseDownY=evt.clientY;var fr,view=this.targetViewForEvent(evt);if(view){fr=view.getPath("pane.firstResponder")
}if(fr&&fr.kindOf(SC.InlineTextFieldView)&&fr!==view){fr.resignFirstResponder()}view=this._mouseDownView=this.sendEvent("mouseDown",evt,view);
if(view&&view.respondsTo("mouseDragged")){this._mouseCanDrag=YES}return view?evt.hasCustomEventHandling:YES
},mouseup:function(evt){if(SC.platform.touch){evt.allowDefault();return YES}this.targetViewForEvent(evt);
if(this._drag){this._drag.tryToPerform("mouseUp",evt);this._drag=null}var handler=null,view=this._mouseDownView,targetView=this.targetViewForEvent(evt);
evt.clickCount=this._clickCount;if(view){handler=this.sendEvent("mouseUp",evt,view);
if(!handler&&(this._clickCount===2)){handler=this.sendEvent("doubleClick",evt,view)
}if(!handler){handler=this.sendEvent("click",evt,view)}}if(!handler){if(this._clickCount===2){handler=this.sendEvent("doubleClick",evt,targetView)
}if(!handler){handler=this.sendEvent("click",evt,targetView)}}this._mouseCanDrag=NO;
this._mouseDownView=null;this._lastMouseUpAt=Date.now();return(handler)?evt.hasCustomEventHandling:YES
},dblclick:function(evt){if(SC.browser.isIE){this._clickCount=2;this.mouseup(evt)
}},mousewheel:function(evt){var view=this.targetViewForEvent(evt),handler=this.sendEvent("mouseWheel",evt,view);
return(handler)?evt.hasCustomEventHandling:YES},_lastHovered:null,mousemove:function(evt){if(SC.platform.touch){evt.allowDefault();
return YES}if(SC.browser.msie){if(this._lastMoveX===evt.clientX&&this._lastMoveY===evt.clientY){return
}}this._lastMoveX=evt.clientX;this._lastMoveY=evt.clientY;SC.run(function(){if(this._drag){if(SC.browser.msie){if(this._lastMouseDownX!==evt.clientX||this._lastMouseDownY!==evt.clientY){this._drag.tryToPerform("mouseDragged",evt)
}}else{this._drag.tryToPerform("mouseDragged",evt)}}else{var lh=this._lastHovered||[],nh=[],exited,loc,len,view=this.targetViewForEvent(evt);
while(view&&(view!==this)){nh.push(view);view=view.get("nextResponder")}for(loc=0,len=lh.length;
loc<len;loc++){view=lh[loc];exited=view.respondsTo("mouseExited");if(exited&&nh.indexOf(view)===-1){view.tryToPerform("mouseExited",evt)
}}for(loc=0,len=nh.length;loc<len;loc++){view=nh[loc];if(lh.indexOf(view)!==-1){view.tryToPerform("mouseMoved",evt)
}else{view.tryToPerform("mouseEntered",evt)}}this._lastHovered=nh;if(this._mouseDownView){if(SC.browser.msie){if(this._lastMouseDownX!==evt.clientX&&this._lastMouseDownY!==evt.clientY){this._mouseDownView.tryToPerform("mouseDragged",evt)
}}else{this._mouseDownView.tryToPerform("mouseDragged",evt)}}}},this)},_mouseCanDrag:YES,selectstart:function(evt){var targetView=this.targetViewForEvent(evt),result=this.sendEvent("selectStart",evt,targetView);
if(targetView&&targetView.respondsTo("mouseDragged")){return(result!==null?YES:NO)&&!this._mouseCanDrag
}else{return(result!==null?YES:NO)}},drag:function(){return false},contextmenu:function(evt){var view=this.targetViewForEvent(evt);
return this.sendEvent("contextMenu",evt,view)},webkitAnimationStart:function(evt){try{var view=this.targetViewForEvent(evt);
this.sendEvent("animationDidStart",evt,view)}catch(e){SC.Logger.warn("Exception during animationDidStart: %@".fmt(e));
throw e}return view?evt.hasCustomEventHandling:YES},webkitAnimationIteration:function(evt){try{var view=this.targetViewForEvent(evt);
this.sendEvent("animationDidIterate",evt,view)}catch(e){SC.Logger.warn("Exception during animationDidIterate: %@".fmt(e));
throw e}return view?evt.hasCustomEventHandling:YES},webkitAnimationEnd:function(evt){try{var view=this.targetViewForEvent(evt);
this.sendEvent("animationDidEnd",evt,view)}catch(e){SC.Logger.warn("Exception during animationDidEnd: %@".fmt(e));
throw e}return view?evt.hasCustomEventHandling:YES},transitionEnd:function(evt){try{var view=this.targetViewForEvent(evt);
this.sendEvent("transitionDidEnd",evt,view)}catch(e){SC.Logger.warn("Exception during transitionDidEnd: %@".fmt(e));
throw e}return view?evt.hasCustomEventHandling:YES}});SC.Touch=function(touch,touchContext){this.touchContext=touchContext;
this.identifier=touch.identifier;var target=touch.target,targetView;if(target&&SC.$(target).hasClass("touch-intercept")){touch.target.style.webkitTransform="translate3d(0px,-5000px,0px)";
target=document.elementFromPoint(touch.pageX,touch.pageY);if(target){targetView=SC.$(target).view()[0]
}this.hidesTouchIntercept=NO;if(target.tagName==="INPUT"){this.hidesTouchIntercept=touch.target
}else{touch.target.style.webkitTransform="translate3d(0px,0px,0px)"}}else{targetView=touch.target?SC.$(touch.target).view()[0]:null
}this.targetView=targetView;this.target=target;this.hasEnded=NO;this.type=touch.type;
this.clickCount=1;this.view=undefined;this.touchResponder=this.nextTouchResponder=undefined;
this.touchResponders=[];this.startX=this.pageX=touch.pageX;this.startY=this.pageY=touch.pageY;
this.clientX=touch.clientX;this.clientY=touch.clientY;this.screenX=touch.screenX;
this.screenY=touch.screenY};SC.Touch.prototype={unhideTouchIntercept:function(){var intercept=this.hidesTouchIntercept;
if(intercept){setTimeout(function(){intercept.style.webkitTransform="translate3d(0px,0px,0px)"
},500)}},allowDefault:function(){if(this.event){this.event.hasCustomEventHandling=YES
}},preventDefault:function(){if(this.event){this.event.preventDefault()}},stopPropagation:function(){if(this.event){this.event.stopPropagation()
}},stop:function(){if(this.event){this.event.stop()}},end:function(){this.touchContext.endTouch(this)
},makeTouchResponder:function(responder,shouldStack,upViewChain){this.touchContext.makeTouchResponder(this,responder,shouldStack,upViewChain)
},captureTouch:function(startingPoint,shouldStack){this.touchContext.captureTouch(this,startingPoint,shouldStack)
},touchesForView:function(view){return this.touchContext.touchesForView(view)},touchesForResponder:function(responder){return this.touchContext.touchesForView(responder)
},averagedTouchesForView:function(view,addSelf){return this.touchContext.averagedTouchesForView(view,(addSelf?this:null))
}};SC.mixin(SC.Touch,{create:function(touch,touchContext){return new SC.Touch(touch,touchContext)
}});SC.ready(SC.RootResponder,SC.RootResponder.ready=function(){var r;r=SC.RootResponder.responder=SC.RootResponder.create();
r.setup()});sc_require("system/core_query");sc_require("system/ready");sc_require("system/root_responder");
sc_require("system/platform");SC.PORTRAIT_ORIENTATION="portrait";SC.LANDSCAPE_ORIENTATION="landscape";
SC.NO_ORIENTATION="desktop";SC.device=SC.Object.create({orientation:SC.NO_ORIENTATION,isOffline:NO,mouseLocation:function(){var responder=SC.RootResponder.responder,lastX=responder._lastMoveX,lastY=responder._lastMoveY;
if(SC.empty(lastX)||SC.empty(lastY)){return null}return{x:lastX,y:lastY}}.property(),init:function(){arguments.callee.base.apply(this,arguments);
if(navigator&&navigator.onLine===false){this.set("isOffline",YES)}},setup:function(){var responder=SC.RootResponder.responder;
responder.listenFor("online offline".w(),window,this);this.orientationHandlingShouldChange()
},orientationHandlingShouldChange:function(){if(SC.platform.windowSizeDeterminesOrientation){SC.Event.remove(window,"orientationchange",this,this.orientationchange);
this.windowSizeDidChange(SC.RootResponder.responder.get("currentWindowSize"))}else{if(SC.platform.supportsOrientationChange){SC.Event.add(window,"orientationchange",this,this.orientationchange);
this.orientationchange()}}},windowSizeDidChange:function(newSize){if(SC.platform.windowSizeDeterminesOrientation){if(!SC.browser.iOS){SC.run(function(){if(SC.platform.touch){if(newSize.height>=newSize.width){SC.device.set("orientation",SC.PORTRAIT_ORIENTATION)
}else{SC.device.set("orientation",SC.LANDSCAPE_ORIENTATION)}}else{SC.device.set("orientation",SC.NO_ORIENTATION)
}})}else{SC.run(function(){if(newSize.width===window.screen.width){SC.device.set("orientation",SC.PORTRAIT_ORIENTATION)
}else{SC.device.set("orientation",SC.LANDSCAPE_ORIENTATION)}})}return YES}return NO
},orientationchange:function(evt){SC.run(function(){if(window.orientation===0||window.orientation===180){SC.device.set("orientation",SC.PORTRAIT_ORIENTATION)
}else{SC.device.set("orientation",SC.LANDSCAPE_ORIENTATION)}})},orientationObserver:function(){var body=SC.$(document.body),orientation=this.get("orientation");
if(orientation===SC.PORTRAIT_ORIENTATION){body.addClass("portrait")}else{body.removeClass("portrait")
}if(orientation===SC.LANDSCAPE_ORIENTATION){body.addClass("landscape")}else{body.removeClass("landscape")
}}.observes("orientation"),online:function(evt){this.set("isOffline",NO)},offline:function(evt){this.set("isOffline",YES)
}});SC.ready(function(){SC.device.setup()});SC.json={encode:function(root){return JSON.stringify(root)
},decode:function(root){return JSON.parse(root)}};if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n
}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()
}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;
function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;
i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;
gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space
}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;
function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)
}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")
}}}());SC.Page=SC.Object.extend({owner:null,get:function(key){var value=this[key];
if(value&&value.isClass){this[key]=value=value.create({page:this});if(!this.get("inDesignMode")){value.awake()
}return value}else{return arguments.callee.base.apply(this,arguments)}},awake:function(){var value,key;
for(key in this){if(!this.hasOwnProperty(key)){continue}value=this[key];if(value&&value.isViewClass){this[key]=value=value.create({page:this})
}}return this},getIfConfigured:function(key){var ret=this[key];return(ret&&ret.isViewClass)?null:this.get(key)
},loc:function(locs){var view,key;for(key in locs){if(!locs.hasOwnProperty(key)){continue
}view=this[key];if(!view||!view.isViewClass){continue}view.loc(locs[key])}return this
}});SC.Page.design=SC.Page.create;SC.Page.localization=function(attrs){return attrs
};sc_require("system/builder");SC.MODE_REPLACE="replace";SC.MODE_APPEND="append";
SC.MODE_PREPEND="prepend";SC.NON_PIXEL_PROPERTIES="zIndex fontWeight opacity".w();
SC.COMBO_STYLES={WebkitTransition:"WebkitTransitionProperty WebkitTransitionDuration WebkitTransitionDelay WebkitTransitionTimingFunction".w()};
SC.RenderContext=SC.Builder.create({SELF_CLOSING:SC.CoreSet.create().addEach("area base basefront br hr input img link meta".w()),init:function(tagNameOrElement,prevContext){var strings,tagNameOrElementIsString;
if(prevContext){this.prevObject=prevContext;this.strings=prevContext.strings;this.offset=prevContext.length+prevContext.offset
}if(!this.strings){this.strings=[]}if(tagNameOrElement===undefined){tagNameOrElement="div";
tagNameOrElementIsString=YES}else{if(tagNameOrElement==="div"||tagNameOrElement==="label"||tagNameOrElement==="a"){tagNameOrElementIsString=YES
}else{if(SC.typeOf(tagNameOrElement)===SC.T_STRING){tagNameOrElement=tagNameOrElement.toLowerCase();
tagNameOrElementIsString=YES}}}if(tagNameOrElementIsString){this._tagName=tagNameOrElement;
this._needsTag=YES;this.needsContent=YES;var c=this;while(c){c.length++;c=c.prevObject
}this.strings.push(null);this._selfClosing=this.SELF_CLOSING.contains(tagNameOrElement)
}else{this._elem=tagNameOrElement;this._needsTag=NO;this.length=0;this.needsContent=NO
}return this},strings:null,offset:0,length:0,updateMode:SC.MODE_REPLACE,needsContent:NO,get:function(idx){var strings=this.strings||[];
return(idx===undefined)?strings.slice(this.offset,this.length):strings[idx+this.offset]
},push:function(line){var strings=this.strings,len=arguments.length;if(!strings){this.strings=strings=[]
}if(len>1){strings.push.apply(strings,arguments)}else{strings.push(line)}var c=this;
while(c){c.length+=len;c=c.prevObject}this.needsContent=YES;return this},text:function(line){var len=arguments.length,idx=0;
for(idx=0;idx<len;idx++){this.push(SC.RenderContext.escapeHTML(arguments[idx]))}return this
},join:function(joinChar){if(this._needsTag){this.end()}var strings=this.strings;
return strings?strings.join(joinChar||""):""},begin:function(tagNameOrElement){return SC.RenderContext(tagNameOrElement,this)
},element:function(){if(this._elem){return this._elem}var K=SC.RenderContext,factory=K.factory,ret,child;
if(!factory){factory=K.factory=document.createElement("div")}factory.innerHTML=this.join();
if(SC.browser.msie){if(factory.innerHTML.length>0){child=factory.firstChild.cloneNode(true);
factory.innerHTML=""}else{child=null}}else{child=factory.firstChild}return child},remove:function(elementId){if(!elementId){return
}var el,elem=this._elem;if(!elem||!elem.removeChild){return}el=document.getElementById(elementId);
if(el){el=elem.removeChild(el);el=null}},update:function(){var elem=this._elem,mode=this.updateMode,cq,key,value,attr,styles,factory,cur,next,before;
this._innerHTMLReplaced=NO;if(!elem){return}cq=this.$();if(this.length>0){this._innerHTMLReplaced=YES;
if(mode===SC.MODE_REPLACE){cq.html(this.join())}else{factory=elem.cloneNode(false);
factory.innerHTML=this.join();before=(mode===SC.MODE_APPEND)?null:elem.firstChild;
cur=factory.firstChild;while(cur){next=cur.nextSibling;elem.insertBefore(cur,next);
cur=next}cur=next=factory=before=null}}if(this._idDidChange&&(value=this._id)){cq.attr("id",value)
}jQuery.Buffer.flush();elem=this._elem=null;return this.prevObject||this},_DEFAULT_ATTRS:{},_TAG_ARRAY:[],_JOIN_ARRAY:[],_STYLE_PAIR_ARRAY:[],end:function(){var tag=this._TAG_ARRAY,pair,joined,key,value,attrs=this._attrs,className=this._classNames,id=this._id,styles=this._styles;
tag[0]="<";tag[1]=this._tagName;if(attrs||className||styles||id){if(!attrs){attrs=this._DEFAULT_ATTRS
}if(id){attrs.id=id}if(className){attrs["class"]=className.join(" ")}if(styles){joined=this._JOIN_ARRAY;
pair=this._STYLE_PAIR_ARRAY;for(key in styles){if(!styles.hasOwnProperty(key)){continue
}value=styles[key];if(value===null){continue}if(typeof value===SC.T_NUMBER&&!SC.NON_PIXEL_PROPERTIES.contains(key)){value+="px"
}pair[0]=this._dasherizeStyleName(key);pair[1]=value;joined.push(pair.join(": "))
}attrs.style=joined.join("; ");joined.length=0}tag.push(" ");for(key in attrs){if(!attrs.hasOwnProperty(key)){continue
}value=attrs[key];if(value===null){continue}tag.push(key,'="',value,'" ')}if(attrs===this._DEFAULT_ATTRS){delete attrs.style;
delete attrs["class"];delete attrs.id}}var strings=this.strings;var selfClosing=(this._selfClosing===NO)?NO:(this.length===1);
tag.push(selfClosing?" />":">");strings[this.offset]=tag.join("");tag.length=0;if(!selfClosing){tag[0]="</";
tag[1]=this._tagName;tag[2]=">";strings.push(tag.join(""));var c=this;while(c){c.length++;
c=c.prevObject}tag.length=0}this._elem=null;return this.prevObject||this},tag:function(tagName,opts){return this.begin(tagName,opts).end()
},tagName:function(tagName){if(tagName===undefined){if(!this._tagName&&this._elem){this._tagName=this._elem.tagName
}return this._tagName}else{this._tagName=tagName;this._tagNameDidChange=YES;return this
}},id:function(idName){if(idName===undefined){if(!this._id&&this._elem){this._id=this._elem.id
}return this._id}else{this._id=idName;this._idDidChange=YES;return this}},classNames:function(classNames,cloneOnModify){if(this._elem){if(classNames){this.$().resetClassNames().addClass(classNames);
return this}else{return this.$().attr("class").split(" ")}}if(classNames===undefined){if(this._cloneClassNames){this._classNames=(this._classNames||[]).slice();
this._cloneClassNames=NO}if(!this._classNames){this._classNames=[]}return this._classNames
}else{this._classNames=classNames;this._cloneClassNames=cloneOnModify||NO;this._classNamesDidChange=YES;
return this}},hasClass:function(className){if(this._elem){return this.$().hasClass(className)
}return this.classNames().indexOf(className)>=0},addClass:function(nameOrClasses){if(nameOrClasses===undefined||nameOrClasses===null){SC.Logger.warn("You are adding an undefined or empty class"+this.toString());
return this}if(this._elem){if(SC.typeOf(nameOrClasses)===SC.T_STRING){this.$().addClass(nameOrClasses)
}else{var idx,len=nameOrClasses.length;for(idx=0;idx<len;idx++){this.$().addClass(nameOrClasses[idx])
}}return this}var classNames=this.classNames();if(SC.typeOf(nameOrClasses)===SC.T_STRING){if(classNames.indexOf(nameOrClasses)<0){classNames.push(nameOrClasses);
this._classNamesDidChange=YES}}else{for(var i=0,iLen=nameOrClasses.length;i<iLen;
i++){var cl=nameOrClasses[i];if(classNames.indexOf(cl)<0){classNames.push(cl);this._classNamesDidChange=YES
}}}return this},removeClass:function(className){if(this._elem){this.$().removeClass(className);
return this}var classNames=this._classNames,idx;if(classNames&&(idx=classNames.indexOf(className))>=0){if(this._cloneClassNames){classNames=this._classNames=classNames.slice();
this._cloneClassNames=NO}classNames[idx]=null;this._classNamesDidChange=YES}return this
},resetClassNames:function(){if(this._elem){this.$().resetClassNames();return this
}this._classNames=[];this._classNamesDidChange=YES;return this},setClass:function(className,shouldAdd){if(this._elem){this.$().setClass(className,shouldAdd);
return this}var classNames,idx,key,didChange;if(shouldAdd!==undefined){return shouldAdd?this.addClass(className):this.removeClass(className)
}else{classNames=this._classNames;if(!classNames){classNames=this._classNames=[]}if(this._cloneClassNames){classNames=this._classNames=classNames.slice();
this._cloneClassNames=NO}didChange=NO;for(key in className){if(!className.hasOwnProperty(key)){continue
}idx=classNames.indexOf(key);if(className[key]){if(idx<0){classNames.push(key);didChange=YES
}}else{if(idx>=0){classNames[idx]=null;didChange=YES}}}if(didChange){this._classNamesDidChange=YES
}}return this},_STYLE_REGEX:/-?\s*([^:\s]+)\s*:\s*([^;]+)\s*;?/g,styles:function(styles,cloneOnModify){if(this._elem){if(styles){this.$().resetStyles().css(styles)
}return this.$().styles()}var attr,regex,match;if(styles===undefined){if(!this._styles&&this._elem){attr=this.$().attr("style");
if(attr&&(attr=attr.toString()).length>0){if(SC.browser.msie){attr=attr.toLowerCase()
}styles={};regex=this._STYLE_REGEX;regex.lastIndex=0;while(match=regex.exec(attr)){styles[this._camelizeStyleName(match[1])]=match[2]
}this._styles=styles;this._cloneStyles=NO}else{this._styles={}}}else{if(!this._styles){this._styles={}
}else{if(this._cloneStyles){this._styles=SC.clone(this._styles);this._cloneStyles=NO
}}}return this._styles}else{this._styles=styles;this._cloneStyles=cloneOnModify||NO;
this._stylesDidChange=YES;return this}},_deleteComboStyles:function(styles,key){var comboStyles=SC.COMBO_STYLES[key],didChange=NO;
if(comboStyles){var idx;for(idx=0;idx<comboStyles.length;idx++){if(styles[comboStyles[idx]]){delete styles[comboStyles[idx]];
didChange=YES}}}return didChange},resetStyles:function(){this.styles({});return this
},addStyle:function(nameOrStyles,value){if(this._elem){this.$().css(nameOrStyles,value);
return this}var key,didChange=NO,styles=this.styles();if(typeof nameOrStyles===SC.T_STRING){if(value===undefined){return styles[nameOrStyles]
}else{didChange=this._deleteComboStyles(styles,nameOrStyles);if(styles[nameOrStyles]!==value){styles[nameOrStyles]=value;
didChange=YES}if(didChange){this._stylesDidChange=YES}}}else{for(key in nameOrStyles){if(!nameOrStyles.hasOwnProperty(key)){continue
}didChange=didChange||this._deleteComboStyles(styles,key);value=nameOrStyles[key];
if(styles[key]!==value){styles[key]=value;didChange=YES}}if(didChange){this._stylesDidChange=YES
}}return this},removeStyle:function(styleName){if(this._elem){this.$().css(styleName,null);
return this}if(!this._styles){return this}var styles=this.styles();if(styles[styleName]){styles[styleName]=null;
this._stylesDidChange=YES}},attr:function(nameOrAttrs,value){if(this._elem){this.$().attr(nameOrAttrs,value);
return this}var key,attrs=this._attrs,didChange=NO;if(!attrs){this._attrs=attrs={}
}if(typeof nameOrAttrs===SC.T_STRING){if(value===undefined){return attrs[nameOrAttrs]
}else{if(attrs[nameOrAttrs]!==value){attrs[nameOrAttrs]=value;this._attrsDidChange=YES
}}}else{for(key in nameOrAttrs){if(!nameOrAttrs.hasOwnProperty(key)){continue}value=nameOrAttrs[key];
if(attrs[key]!==value){attrs[key]=value;didChange=YES}}if(didChange){this._attrsDidChange=YES
}}return this},$:function(sel){var ret,elem=this._elem;ret=!elem?SC.$.buffer([]):(sel===undefined)?SC.$.buffer(elem):SC.$.buffer(sel,elem);
elem=null;return ret},_camelizeStyleName:function(name){var needsCap=name.match(/^-(webkit|moz|o)-/),camelized=name.camelize();
if(needsCap){return camelized.substr(0,1).toUpperCase()+camelized.substr(1)}else{return camelized
}},_dasherizeStyleName:function(name){var dasherized=name.dasherize();if(dasherized.match(/^(webkit|moz|ms|o)-/)){dasherized="-"+dasherized
}return dasherized}});SC.RenderContext.fn.html=SC.RenderContext.fn.push;SC.RenderContext.fn.css=SC.RenderContext.fn.addStyle;
if(!SC.browser.isSafari||parseInt(SC.browser.version,10)<526){SC.RenderContext._safari3=YES
}SC.RenderContext.escapeHTML=function(text){var elem,node,ret;if(SC.none(text)){return text
}elem=this.escapeHTMLElement;if(!elem){elem=this.escapeHTMLElement=document.createElement("div")
}node=this.escapeTextNode;if(!node){node=this.escapeTextNode=document.createTextNode("");
elem.appendChild(node)}node.data=text;ret=elem.innerHTML;if(SC.RenderContext._safari3){ret=ret.replace(/>/g,"&gt;")
}node=elem=null;return ret};SC.SelectionSet=SC.Object.extend(SC.Enumerable,SC.Freezable,SC.Copyable,{isSelectionSet:YES,length:function(){var ret=0,sets=this._sets,objects=this._objects;
if(objects){ret+=objects.get("length")}if(sets){sets.forEach(function(s){ret+=s.get("length")
})}return ret}.property().cacheable(),sources:function(){var ret=[],sets=this._sets,len=sets?sets.length:0,idx,set,source;
for(idx=0;idx<len;idx++){set=sets[idx];if(set&&set.get("length")>0&&set.source){ret.push(set.source)
}}return ret}.property().cacheable(),indexSetForSource:function(source){if(!source||!source.isSCArray){return null
}var cache=this._indexSetCache,objects=this._objects,ret,idx;if(!cache){cache=this._indexSetCache={}
}ret=cache[SC.guidFor(source)];if(ret&&ret._sourceRevision&&(ret._sourceRevision!==source.propertyRevision)){ret=null
}if(!ret){ret=this._indexSetForSource(source,NO);if(ret&&ret.get("length")===0){ret=null
}if(objects){if(ret){ret=ret.copy()}objects.forEach(function(o){if((idx=source.indexOf(o))>=0){if(!ret){ret=SC.IndexSet.create()
}ret.add(idx)}},this)}if(ret){ret=cache[SC.guidFor(source)]=ret.frozenCopy();ret._sourceRevision=source.propertyRevision
}}return ret},_indexSetForSource:function(source,canCreate){if(canCreate===undefined){canCreate=YES
}var guid=SC.guidFor(source),index=this[guid],sets=this._sets,len=sets?sets.length:0,ret=null;
if(index>=len){index=null}if(SC.none(index)){if(canCreate&&!this.isFrozen){this.propertyWillChange("sources");
if(!sets){sets=this._sets=[]}ret=sets[len]=SC.IndexSet.create();ret.source=source;
this[guid]=len;this.propertyDidChange("sources")}}else{ret=sets?sets[index]:null}return ret
},add:function(source,start,length){if(this.isFrozen){throw SC.FROZEN_ERROR}var sets,len,idx,set,oldlen,newlen,setlen,objects;
if(start===undefined&&length===undefined){if(!source){throw"Must pass params to SC.SelectionSet.add()"
}if(source.isIndexSet){return this.add(source.source,source)}if(source.isSelectionSet){sets=source._sets;
objects=source._objects;len=sets?sets.length:0;this.beginPropertyChanges();for(idx=0;
idx<len;idx++){set=sets[idx];if(set&&set.get("length")>0){this.add(set.source,set)
}}if(objects){this.addObjects(objects)}this.endPropertyChanges();return this}}set=this._indexSetForSource(source,YES);
oldlen=this.get("length");setlen=set.get("length");newlen=oldlen-setlen;set.add(start,length);
this._indexSetCache=null;newlen+=set.get("length");if(newlen!==oldlen){this.propertyDidChange("length");
this.enumerableContentDidChange();if(setlen===0){this.notifyPropertyChange("sources")
}}return this},remove:function(source,start,length){if(this.isFrozen){throw SC.FROZEN_ERROR
}var sets,len,idx,set,oldlen,newlen,setlen,objects;if(start===undefined&&length===undefined){if(!source){throw"Must pass params to SC.SelectionSet.remove()"
}if(source.isIndexSet){return this.remove(source.source,source)}if(source.isSelectionSet){sets=source._sets;
objects=source._objects;len=sets?sets.length:0;this.beginPropertyChanges();for(idx=0;
idx<len;idx++){set=sets[idx];if(set&&set.get("length")>0){this.remove(set.source,set)
}}if(objects){this.removeObjects(objects)}this.endPropertyChanges();return this}}set=this._indexSetForSource(source,YES);
oldlen=this.get("length");newlen=oldlen-set.get("length");if(set&&(objects=this._objects)){if(length!==undefined){start=SC.IndexSet.create(start,length);
length=undefined}objects.forEach(function(object){idx=source.indexOf(object);if(start.contains(idx)){objects.remove(object);
newlen--}},this)}set.remove(start,length);setlen=set.get("length");newlen+=setlen;
this._indexSetCache=null;if(newlen!==oldlen){this.propertyDidChange("length");this.enumerableContentDidChange();
if(setlen===0){this.notifyPropertyChange("sources")}}return this},contains:function(source,start,length){if(start===undefined&&length===undefined){return this.containsObject(source)
}var set=this.indexSetForSource(source);if(!set){return NO}return set.contains(start,length)
},intersects:function(source,start,length){var set=this.indexSetForSource(source,NO);
if(!set){return NO}return set.intersects(start,length)},_TMP_ARY:[],addObject:function(object){var ary=this._TMP_ARY,ret;
ary[0]=object;ret=this.addObjects(ary);ary.length=0;return ret},addObjects:function(objects){var cur=this._objects,oldlen,newlen;
if(!cur){cur=this._objects=SC.CoreSet.create()}oldlen=cur.get("length");cur.addEach(objects);
newlen=cur.get("length");this._indexSetCache=null;if(newlen!==oldlen){this.propertyDidChange("length");
this.enumerableContentDidChange()}return this},removeObject:function(object){var ary=this._TMP_ARY,ret;
ary[0]=object;ret=this.removeObjects(ary);ary.length=0;return ret},removeObjects:function(objects){var cur=this._objects,oldlen,newlen,sets;
if(!cur){return this}oldlen=cur.get("length");cur.removeEach(objects);newlen=cur.get("length");
if(sets=this._sets){sets.forEach(function(set){oldlen+=set.get("length");set.removeObjects(objects);
newlen+=set.get("length")},this)}this._indexSetCache=null;if(newlen!==oldlen){this.propertyDidChange("length");
this.enumerableContentDidChange()}return this},containsObject:function(object){var objects=this._objects;
if(objects&&objects.contains(object)){return YES}var sets=this._sets,len=sets?sets.length:0,idx,set;
for(idx=0;idx<len;idx++){set=sets[idx];if(set&&set.indexOf(object)>=0){return YES
}}return NO},constrain:function(source){var set,len,max,objects;this.beginPropertyChanges();
this.get("sources").forEach(function(cur){if(cur===source){return}var set=this._indexSetForSource(source,NO);
if(set){this.remove(source,set)}},this);set=this._indexSetForSource(source,NO);if(set&&((max=set.get("max"))>(len=source.get("length")))){this.remove(source,len,max-len)
}if(objects=this._objects){objects.forEach(function(cur){if(source.indexOf(cur)<0){this.removeObject(cur)
}},this)}this.endPropertyChanges();return this},isEqual:function(obj){var left,right,idx,len,sources,source;
if(!obj||!obj.isSelectionSet){return NO}if(obj===this){return YES}if((this._sets===obj._sets)&&(this._objects===obj._objects)){return YES
}if(this.get("length")!==obj.get("length")){return NO}left=this._objects;right=obj._objects;
if(left||right){if((left?left.get("length"):0)!==(right?right.get("length"):0)){return NO
}if(left&&!left.isEqual(right)){return NO}}sources=this.get("sources");len=sources.get("length");
for(idx=0;idx<len;idx++){source=sources.objectAt(idx);left=this._indexSetForSource(source,NO);
right=this._indexSetForSource(source,NO);if(!!right!==!!left){return NO}if(left&&!left.isEqual(right)){return NO
}}return YES},clear:function(){if(this.isFrozen){throw SC.FROZEN_ERROR}if(this._sets){this._sets.length=0
}if(this._objects){this._objects=null}this._indexSetCache=null;this.propertyDidChange("length");
this.enumerableContentDidChange();this.notifyPropertyChange("sources");return this
},copy:function(){var ret=this.constructor.create(),sets=this._sets,len=sets?sets.length:0,idx,set;
if(sets&&len>0){sets=ret._sets=sets.slice();for(idx=0;idx<len;idx++){if(!(set=sets[idx])){continue
}set=sets[idx]=set.copy();ret[SC.guidFor(set.source)]=idx}}if(this._objects){ret._objects=this._objects.copy()
}return ret},freeze:function(){if(this.get("isFrozen")){return this}var sets=this._sets,loc=sets?sets.length:0,set;
while(--loc>=0){set=sets[loc];if(set){set.freeze()}}if(this._objects){this._objects.freeze()
}this.set("isFrozen",YES);return this},toString:function(){var sets=this._sets||[];
sets=sets.map(function(set){return set.toString().replace("SC.IndexSet",SC.guidFor(set.source))
},this);if(this._objects){sets.push(this._objects.toString())}return"SC.SelectionSet:%@<%@>".fmt(SC.guidFor(this),sets.join(","))
},firstObject:function(){var sets=this._sets,objects=this._objects;if(sets&&sets.get("length")>0){var set=sets?sets[0]:null,src=set?set.source:null,idx=set?set.firstObject():-1;
if(src&&idx>=0){return src.objectAt(idx)}}return objects?objects.firstObject():undefined
}.property(),nextObject:function(count,lastObject,context){var objects,ret;if(count===0){objects=context.objects=[];
this.forEach(function(o){objects.push(o)},this);context.max=objects.length}objects=context.objects;
ret=objects[count];if(count+1>=context.max){context.objects=context.max=null}return ret
},forEach:function(callback,target){var sets=this._sets,objects=this._objects,len=sets?sets.length:0,set,idx;
for(idx=0;idx<len;idx++){set=sets[idx];if(set){set.forEachObject(callback,target)
}}if(objects){objects.forEach(callback,target)}return this}});SC.SelectionSet.prototype.clone=SC.SelectionSet.prototype.copy;
SC.SelectionSet.EMPTY=SC.SelectionSet.create().freeze();sc_require("mixins/delegate_support");
SC.SparseArray=SC.Object.extend(SC.Observable,SC.Enumerable,SC.Array,SC.DelegateSupport,{_requestingLength:0,_requestingIndex:0,length:function(){var del=this.delegate;
if(del&&SC.none(this._length)&&del.sparseArrayDidRequestLength){this._requestingLength++;
del.sparseArrayDidRequestLength(this);this._requestingLength--}return this._length||0
}.property().cacheable(),provideLength:function(length){if(SC.none(length)){this._sa_content=null
}if(length!==this._length){this._length=length;if(this._requestingLength<=0){this.enumerableContentDidChange()
}}return this},rangeWindowSize:1,requestedRangeIndex:null,init:function(){arguments.callee.base.apply(this,arguments);
this.requestedRangeIndex=[];this._TMP_PROVIDE_ARRAY=[];this._TMP_PROVIDE_RANGE={length:1};
this._TMP_RANGE={}},objectAt:function(idx,omitMaterializing){var content=this._sa_content,ret;
if(!content){content=this._sa_content=[]}if((ret=content[idx])===undefined){if(!omitMaterializing){this.requestIndex(idx)
}ret=content[idx]}return ret},definedIndexes:function(indexes){var ret=SC.IndexSet.create(),content=this._sa_content,idx,len;
if(!content){return ret.freeze()}if(indexes){indexes.forEach(function(idx){if(content[idx]!==undefined){ret.add(idx)
}})}else{len=content.length;for(idx=0;idx<len;idx++){if(content[idx]!==undefined){ret.add(idx)
}}}return ret.freeze()},_TMP_RANGE:{},requestIndex:function(idx){var del=this.delegate;
if(!del){return this}var len=this.get("rangeWindowSize"),start=idx;if(len>1){start=start-Math.floor(start%len)
}if(len<1){len=1}this._requestingIndex++;if(del.sparseArrayDidRequestRange){var range=this._TMP_RANGE;
if(this.wasRangeRequested(start)===-1){range.start=start;range.length=len;this.requestedRangeIndex.push(start);
del.sparseArrayDidRequestRange(this,range)}}else{if(del.sparseArrayDidRequestIndex){while(--len>=0){del.sparseArrayDidRequestIndex(this,start+len)
}}}this._requestingIndex--;return this},wasRangeRequested:function(rangeStart){var i,ilen;
for(i=0,ilen=this.requestedRangeIndex.length;i<ilen;i++){if(this.requestedRangeIndex[i]===rangeStart){return i
}}return -1},rangeRequestCompleted:function(start){var i=this.wasRangeRequested(start);
if(i>=0){this.requestedRangeIndex.removeAt(i,1);return YES}return NO},provideObjectsInRange:function(range,array){var content=this._sa_content;
if(!content){content=this._sa_content=[]}var start=range.start,len=range.length;while(--len>=0){content[start+len]=array.objectAt(len)
}if(this._requestingIndex<=0){this.enumerableContentDidChange(range.start,range.length)
}return this},provideObjectAtIndex:function(index,object){var array=this._TMP_PROVIDE_ARRAY,range=this._TMP_PROVIDE_RANGE;
array[0]=object;range.start=index;return this.provideObjectsInRange(range,array)},objectsDidChangeInRange:function(range){var content=this._sa_content;
if(content){if(range.start===0&&SC.maxRange(range)>=content.length){this._sa_content=null
}else{var start=range.start,loc=Math.min(start+range.length,content.length);while(--loc>=start){content[loc]=undefined
}}}this.enumerableContentDidChange(range.start,range.length);return this},indexOf:function(obj){var del=this.delegate;
if(del&&del.sparseArrayDidRequestIndexOf){return del.sparseArrayDidRequestIndexOf(this,obj)
}else{var content=this._sa_content;if(!content){content=this._sa_content=[]}return content.indexOf(obj)
}},replace:function(idx,amt,objects){objects=objects||[];var del=this.delegate;if(del){if(!del.sparseArrayShouldReplace||!del.sparseArrayShouldReplace(this,idx,amt,objects)){return this
}}var content=this._sa_content;if(!content){content=this._sa_content=[]}content.replace(idx,amt,objects);
var len=objects?(objects.get?objects.get("length"):objects.length):0;var delta=len-amt;
if(!SC.none(this._length)){this.propertyWillChange("length");this._length+=delta;
this.propertyDidChange("length")}this.enumerableContentDidChange(idx,amt,delta);return this
},reset:function(){this._sa_content=null;this._length=null;this.enumerableContentDidChange();
this.invokeDelegateMethod(this.delegate,"sparseArrayDidReset",this);return this}});
SC.SparseArray.array=function(len){return this.create({_length:len||0})};SC.Timer=SC.Object.extend({target:null,action:null,isPooled:NO,interval:0,startTime:null,repeats:NO,until:null,isPaused:NO,isScheduled:NO,isValid:YES,lastFireTime:0,fireTime:function(){if(!this.get("isValid")){return -1
}var start=this.get("startTime");if(!start||start===0){return -1}var interval=this.get("interval"),last=this.get("lastFireTime");
if(last<start){last=start}var next;if(this.get("repeats")){if(interval===0){next=last
}else{next=start+(Math.floor((last-start)/interval)+1)*interval}}else{next=start+interval
}var until=this.get("until");if(until&&until>0&&next>until){next=until}return next
}.property("interval","startTime","repeats","until","isValid","lastFireTime").cacheable(),schedule:function(){if(!this.get("isValid")){return this
}this.beginPropertyChanges();if(!this.startTime){this.set("startTime",SC.RunLoop.currentRunLoop.get("startTime"))
}var next=this.get("fireTime"),last=this.get("lastFireTime");if(next>=last){this.set("isScheduled",YES);
SC.RunLoop.currentRunLoop.scheduleTimer(this,next)}this.endPropertyChanges();return this
},invalidate:function(){this.beginPropertyChanges();this.set("isValid",NO);SC.RunLoop.currentRunLoop.cancelTimer(this);
this.action=this.target=null;this.endPropertyChanges();if(this.get("isPooled")){SC.Timer.returnTimerToPool(this)
}return this},fire:function(){var last=Date.now();this.set("lastFireTime",last);var next=this.get("fireTime");
if(!this.get("isPaused")){this.performAction()}if(next>last){this.schedule()}else{this.invalidate()
}},performAction:function(){var typeOfAction=SC.typeOf(this.action);if(typeOfAction==SC.T_FUNCTION){this.action.call((this.target||this),this)
}else{if(typeOfAction===SC.T_STRING){if(this.action.indexOf(".")>=0){var path=this.action.split(".");
var property=path.pop();var target=SC.objectForPropertyPath(path,window);var action=target.get?target.get(property):target[property];
if(action&&SC.typeOf(action)==SC.T_FUNCTION){action.call(target,this)}else{throw"%@: Timer could not find a function at %@".fmt(this,this.action)
}}else{SC.RootResponder.responder.sendAction(this.action,this.target,this)}}}},init:function(){arguments.callee.base.apply(this,arguments);
if(this.startTime instanceof Date){this.startTime=this.startTime.getTime()}if(this.until instanceof Date){this.until=this.until.getTime()
}},RESET_DEFAULTS:{target:null,action:null,isPooled:NO,isPaused:NO,isScheduled:NO,isValid:YES,interval:0,repeats:NO,until:null,startTime:null,lastFireTime:0},reset:function(props){if(!props){props=SC.EMPTY_HASH
}this.propertyWillChange("fireTime");var defaults=this.RESET_DEFAULTS;for(var key in defaults){if(!defaults.hasOwnProperty(key)){continue
}this[key]=SC.none(props[key])?defaults[key]:props[key]}this.propertyDidChange("fireTime");
return this},removeFromTimerQueue:function(timerQueueRoot){var prev=this._timerQueuePrevious,next=this._timerQueueNext;
if(!prev&&!next&&timerQueueRoot!==this){return timerQueueRoot}if(prev){prev._timerQueueNext=next
}if(next){next._timerQueuePrevious=prev}this._timerQueuePrevious=this._timerQueueNext=null;
return(timerQueueRoot===this)?next:timerQueueRoot},scheduleInTimerQueue:function(timerQueueRoot,runTime){this._timerQueueRunTime=runTime;
var beforeNode=timerQueueRoot;var afterNode=null;while(beforeNode&&beforeNode._timerQueueRunTime<runTime){afterNode=beforeNode;
beforeNode=beforeNode._timerQueueNext}if(afterNode){afterNode._timerQueueNext=this;
this._timerQueuePrevious=afterNode}if(beforeNode){beforeNode._timerQueuePrevious=this;
this._timerQueueNext=beforeNode}return(beforeNode===timerQueueRoot)?this:timerQueueRoot
},collectExpiredTimers:function(timers,now){if(this._timerQueueRunTime>now){return this
}timers.push(this);var next=this._timerQueueNext;this._timerQueueNext=null;if(next){next._timerQueuePrevious=null
}return next?next.collectExpiredTimers(timers,now):null}});SC.Timer.schedule=function(props){var timer;
if(!props||SC.none(props.isPooled)||props.isPooled){timer=this.timerFromPool(props)
}else{timer=this.create(props)}return timer.schedule()};SC.Timer.timerFromPool=function(props){var timers=this._timerPool;
if(!timers){timers=this._timerPool=[]}var timer=timers.pop();if(!timer){timer=this.create()
}return timer.reset(props)};SC.Timer.returnTimerToPool=function(timer){if(!this._timerPool){this._timerPool=[]
}this._timerPool.push(timer);return this};sc_require("system/browser");SC.mixin({normalizeURL:function(url){if(url.slice(0,1)=="/"){url=window.location.protocol+"//"+window.location.host+url
}else{if((url.slice(0,5)=="http:")||(url.slice(0,6)=="https:")){}else{url=window.location.href+"/"+url
}}return url},isPercentage:function(val){return(val<1&&val>0)},minX:function(frame){return frame.x||0
},maxX:function(frame){return(frame.x||0)+(frame.width||0)},midX:function(frame){return(frame.x||0)+((frame.width||0)/2)
},minY:function(frame){return frame.y||0},maxY:function(frame){return(frame.y||0)+(frame.height||0)
},midY:function(frame){return(frame.y||0)+((frame.height||0)/2)},centerX:function(innerFrame,outerFrame){return(outerFrame.width-innerFrame.width)/2
},centerY:function(innerFrame,outerFrame){return(outerFrame.height-innerFrame.height)/2
},offset:function(elem,relativeToFlag){var userAgent,index,mobileBuildNumber,result;
relativeToFlag=relativeToFlag||"document";if(relativeToFlag==="parent"){result=jQuery(elem).position()
}else{result=jQuery(elem).offset();if(SC.browser.mobileSafari){userAgent=navigator.userAgent;
index=userAgent.indexOf("Mobile/");mobileBuildNumber=userAgent.substring(index+7,index+9);
if(parseInt(SC.browser.mobileSafari,0)<=532||(mobileBuildNumber<="8A")){result.left=result.left-window.pageXOffset;
result.top=result.top-window.pageYOffset}}if(relativeToFlag==="viewport"){result.left=result.left-window.pageXOffset;
result.top=result.top-window.pageYOffset}}return result},viewportOffset:function(el){console.warn("SC.viewportOffset() has been deprecated in favor of SC.offset().  Please use SC.offset() from here on.");
var result=SC.offset(el,"viewport");return{x:result.left,y:result.top}}});SC.mixin({ZERO_POINT:{x:0,y:0},pointInRect:function(point,f){return(point.x>=SC.minX(f))&&(point.y>=SC.minY(f))&&(point.x<=SC.maxX(f))&&(point.y<=SC.maxY(f))
},rectsEqual:function(r1,r2,delta){if(!r1||!r2){return(r1==r2)}if(!delta&&delta!==0){delta=0.1
}if((r1.y!=r2.y)&&(Math.abs(r1.y-r2.y)>delta)){return NO}if((r1.x!=r2.x)&&(Math.abs(r1.x-r2.x)>delta)){return NO
}if((r1.width!=r2.width)&&(Math.abs(r1.width-r2.width)>delta)){return NO}if((r1.height!=r2.height)&&(Math.abs(r1.height-r2.height)>delta)){return NO
}return YES},intersectRects:function(r1,r2){var ret={x:Math.max(SC.minX(r1),SC.minX(r2)),y:Math.max(SC.minY(r1),SC.minY(r2)),width:Math.min(SC.maxX(r1),SC.maxX(r2)),height:Math.min(SC.maxY(r1),SC.maxY(r2))};
ret.width=Math.max(0,ret.width-ret.x);ret.height=Math.max(0,ret.height-ret.y);return ret
},unionRects:function(r1,r2){var ret={x:Math.min(SC.minX(r1),SC.minX(r2)),y:Math.min(SC.minY(r1),SC.minY(r2)),width:Math.max(SC.maxX(r1),SC.maxX(r2)),height:Math.max(SC.maxY(r1),SC.maxY(r2))};
ret.width=Math.max(0,ret.width-ret.x);ret.height=Math.max(0,ret.height-ret.y);return ret
},cloneRect:function(r){return{x:r.x,y:r.y,width:r.width,height:r.height}},stringFromRect:function(r){if(!r){return"(null)"
}else{return"{x:"+r.x+", y:"+r.y+", width:"+r.width+", height:"+r.height+"}"}}});
sc_require("views/view/base");SC.TEMPLATES=SC.Object.create();SC.TemplateView=SC.CoreView.extend({acceptsFirstResponder:YES,templateName:null,templates:SC.TEMPLATES,template:function(){var templateName=this.get("templateName");
var template=this.get("templates").get(templateName);if(!template){if(templateName){SC.Logger.warn('%@ - Unable to find template "%@".'.fmt(this,templateName))
}return function(){return""}}return template}.property("templateName").cacheable(),context:function(){return this
}.property().cacheable(),render:function(context){var template=this.get("template");
this._didRenderChildViews=YES;context.push(template(this.get("context"),null,null,{view:this,isRenderData:true}))
},update:function(){},mouseDown:function(){if(this.mouseUp){return YES}return NO}});
SC.CheckboxSupport={didCreateLayer:function(){this.$("input").change(jQuery.proxy(function(){SC.RunLoop.begin();
this.notifyPropertyChange("value");SC.RunLoop.end()},this))},value:function(key,value){if(value!==undefined){this.$("input").attr("checked",value)
}else{value=this.$("input").attr("checked")}return value}.property().idempotent()};
sc_require("views/template");SC.TemplateCollectionView=SC.TemplateView.extend({tagName:"ul",content:null,template:SC.Handlebars.compile(""),emptyView:null,didCreateLayer:function(){if(this.get("content")){var indexSet=SC.IndexSet.create(0,this.getPath("content.length"));
this.arrayContentDidChange(this.get("content"),null,"[]",indexSet)}},itemView:"SC.TemplateView",itemViewClass:function(){var itemView=this.get("itemView");
var extensions={};if(SC.typeOf(itemView)===SC.T_STRING){itemView=SC.objectForPropertyPath(itemView)
}if(this.get("itemViewTemplate")){extensions.template=this.get("itemViewTemplate")
}if(this.get("tagName")==="ul"){extensions.tagname="li"}return itemView.extend(extensions)
}.property("itemView").cacheable(),contentDidChange:function(){this.removeAllChildren();
this.$().empty();this.didCreateLayer();this.get("content").addRangeObserver(null,this,this.arrayContentDidChange)
}.observes("content",".content.[]"),arrayContentDidChange:function(array,objects,key,indexes){var content=this.get("content"),itemViewClass=this.get("itemViewClass"),childViews=this.get("childViews"),toDestroy=[],toReuse=[],view,item,matchIndex,lastView,length,i;
emptyView=this.get("emptyView");if(emptyView){emptyView.$().remove();emptyView.removeFromParent()
}for(i=0,length=childViews.get("length");i<length;i++){view=childViews.objectAt(i);
if(content.contains(view.get("content"))){toReuse.push(view)}else{toDestroy.push(view)
}}for(i=0,length=toDestroy.length;i<length;i++){toDestroy[i].destroy()}childViews=[];
if(array.get("length")===0&&this.get("inverseTemplate")){view=this.createChildView(SC.TemplateView.extend({template:this.get("inverseTemplate"),content:this}));
this.set("emptyView",view);view.createLayer().$().appendTo(this.$())}var itemOptions=this.itemViewOptions||{};
for(i=0,length=array.get("length");i<length;i++){item=array.objectAt(i);view=toReuse.find(function(v){return v.get("content")===item
});if(!view){view=this.createChildView(itemViewClass.extend({content:item,tagName:"li",render:function(context){arguments.callee.base.apply(this,arguments);
SC.Handlebars.ViewHelper.applyAttributes(itemOptions,this,context)}}));view.createLayer().$().appendTo(this.$())
}childViews.push(view)}this.childViews=childViews}});SC.TextFieldSupport={value:function(key,value){if(value!==undefined){this.$("input").val(value)
}else{value=this.$("input").val()}return value}.property().idempotent(),didCreateLayer:function(){SC.Event.add(this.$("input"),"focus",this,this.focusIn);
SC.Event.add(this.$("input"),"blur",this,this.focusOut)},focusIn:function(event){this.becomeFirstResponder();
this.tryToPerform("focus",event)},focusOut:function(event){this.resignFirstResponder();
this.tryToPerform("blur",event)},keyUp:function(event){if(event.keyCode===13){return this.tryToPerform("insertNewline",event)
}else{if(event.keyCode===27){return this.tryToPerform("cancel",event)}}}};sc_require("views/view");
sc_require("views/view/animation");SC.CSS_TRANSFORM_MAP={rotate:function(val){return null
},rotateX:function(val){if(SC.typeOf(val)===SC.T_NUMBER){val+="deg"}return"rotateX("+val+")"
},rotateY:function(val){if(SC.typeOf(val)===SC.T_NUMBER){val+="deg"}return"rotateY("+val+")"
},rotateZ:function(val){if(SC.typeOf(val)===SC.T_NUMBER){val+="deg"}return"rotateZ("+val+")"
},scale:function(val){if(SC.typeOf(val)===SC.T_ARRAY){val=val.join(", ")}return"scale("+val+")"
}};SC.View.reopen({layoutStyleCalculator:null,layoutStyle:function(){var props={layout:this.get("layout"),turbo:this.get("hasAcceleratedLayer"),staticLayout:this.get("useStaticLayout")};
var calculator=this.get("layoutStyleCalculator");calculator.set(props);return calculator.calculate()
}.property().cacheable()});SC.View.LayoutStyleCalculator=SC.Object.extend({_layoutDidUpdate:function(){var layout=this.get("layout");
if(!layout){return}this.dims=SC._VIEW_DEFAULT_DIMS;this.loc=this.dims.length;var right=(this.right=layout.right);
this.hasRight=(right!=null);var left=(this.left=layout.left);this.hasLeft=(left!=null);
var top=(this.top=layout.top);this.hasTop=(top!=null);var bottom=(this.bottom=layout.bottom);
this.hasBottom=(bottom!=null);var width=(this.width=layout.width);this.hasWidth=(width!=null);
var height=(this.height=layout.height);this.hasHeight=(height!=null);this.minWidth=((layout.minWidth===undefined)?null:layout.minWidth);
var maxWidth=(this.maxWidth=(layout.maxWidth===undefined)?null:layout.maxWidth);this.hasMaxWidth=(maxWidth!=null);
this.minHeight=(layout.minHeight===undefined)?null:layout.minHeight;var maxHeight=(this.maxHeight=(layout.maxHeight===undefined)?null:layout.maxHeight);
this.hasMaxHeight=(maxHeight!=null);var centerX=(this.centerX=layout.centerX);this.hasCenterX=(centerX!=null);
var centerY=(this.centerY=layout.centerY);this.hasCenterY=(centerY!=null);var borderTop=(this.borderTop=((layout.borderTop!==undefined)?layout.borderTop:layout.border)||0);
var borderRight=(this.borderRight=((layout.borderRight!==undefined)?layout.borderRight:layout.border)||0);
var borderBottom=(this.borderBottom=((layout.borderBottom!==undefined)?layout.borderBottom:layout.border)||0);
var borderLeft=(this.borderLeft=((layout.borderLeft!==undefined)?layout.borderLeft:layout.border)||0);
this.zIndex=(layout.zIndex!=null)?layout.zIndex.toString():null;this.opacity=(layout.opacity!=null)?layout.opacity.toString():null;
this.backgroundPosition=(layout.backgroundPosition!=null)?layout.backgroundPosition:null;
this.ret={marginTop:null,marginLeft:null}}.observes("layout"),_invalidAutoValue:function(property){var error=SC.Error.desc("%@.layout() you cannot use %@:auto if staticLayout is disabled".fmt(this.get("view"),property),"%@".fmt(this.get("view")),-1);
SC.Logger.error(error.toString());throw error},_handleMistakes:function(){var layout=this.get("layout");
if(!this.staticLayout){if(this.width===SC.LAYOUT_AUTO){this._invalidAutoValue("width")
}if(this.height===SC.LAYOUT_AUTO){this._invalidAutoValue("height")}}if(SC.platform.supportsCSSTransforms){var animations=layout.animate,transformAnimationDuration,key;
if(animations){for(key in animations){if(SC.CSS_TRANSFORM_MAP[key]){if(this._pendingAnimations&&this._pendingAnimations["-"+SC.platform.cssPrefix+"-transform"]){throw"Animations of transforms must be executed simultaneously!"
}if(transformAnimationDuration&&animations[key].duration!==transformAnimationDuration){SC.Logger.warn("Can't animate transforms with different durations! Using first duration specified.");
animations[key].duration=transformAnimationDuration}transformAnimationDuration=animations[key].duration
}}}}},_calculatePosition:function(direction){var translate=null,turbo=this.get("turbo"),ret=this.ret;
var start,finish,size,maxSize,margin,hasStart,hasFinish,hasSize,hasMaxSize,startBorderVal,finishBorder,sizeNum;
if(direction==="x"){start="left";finish="right";size="width";maxSize="maxWidth";margin="marginLeft";
startBorder="borderLeft";finishBorder="borderRight";hasStart=this.hasLeft;hasFinish=this.hasRight;
hasSize=this.hasWidth;hasMaxSize=this.hasMaxWidth}else{start="top";finish="bottom";
size="height";maxSize="maxHeight";margin="marginTop";startBorder="borderTop";finishBorder="borderBottom";
hasStart=this.hasTop;hasFinish=this.hasBottom;hasSize=this.hasHeight;hasMaxSize=this.hasMaxHeight
}ret[start]=this._cssNumber(this[start]);ret[finish]=this._cssNumber(this[finish]);
startBorderVal=this._cssNumber(this[startBorder]);finishBorderVal=this._cssNumber(this[finishBorder]);
ret[startBorder+"Width"]=startBorderVal||null;ret[finishBorder+"Width"]=finishBorderVal||null;
sizeNum=this[size];if(sizeNum>=1){sizeNum-=(startBorderVal+finishBorderVal)}ret[size]=this._cssNumber(sizeNum);
if(hasStart){if(turbo){translate=ret[start];ret[start]=0}if(hasFinish&&hasSize){ret[finish]=null
}}else{if(!hasFinish||(hasFinish&&!hasSize&&!hasMaxSize)){ret[start]=0}}if(!hasSize&&!hasFinish){ret[finish]=0
}return translate},_calculateCenter:function(direction){var ret=this.ret,size,center,start,finish,margin,startBorderVal,finishBorderVal;
if(direction==="x"){size="width";center="centerX";start="left";finish="right";margin="marginLeft";
startBorder="borderLeft";finishBorder="borderRight"}else{size="height";center="centerY";
start="top";finish="bottom";margin="marginTop";startBorder="borderTop";finishBorder="borderBottom"
}ret[start]="50%";startBorderVal=this._cssNumber(this[startBorder]);finishBorderVal=this._cssNumber(this[finishBorder]);
ret[startBorder+"Width"]=startBorderVal||null;ret[finishBorder+"Width"]=finishBorderVal||null;
var sizeValue=this[size],centerValue=this[center],startValue=this[start];var sizeIsPercent=SC.isPercentage(sizeValue),centerIsPercent=SC.isPercentage(centerValue,YES);
if(sizeValue>1){sizeValue-=(startBorderVal+finishBorderVal)}if((sizeIsPercent&&centerIsPercent)||(!sizeIsPercent&&!centerIsPercent)){var value=centerValue-sizeValue/2;
ret[margin]=(sizeIsPercent)?Math.floor(value*100)+"%":Math.floor(value)}else{SC.Logger.warn("You have to set "+size+" and "+center+" using both percentages or pixels");
ret[margin]="50%"}ret[size]=this._cssNumber(sizeValue)||0;ret[finish]=null},_calculateTransforms:function(translateLeft,translateTop){if(SC.platform.supportsCSSTransforms){var layout=this.get("layout");
var transformAttribute=SC.platform.domCSSPrefix+"Transform";var transforms=[];if(this.turbo){transforms.push("translateX("+(translateLeft||0)+"px)","translateY("+(translateTop||0)+"px)");
if(SC.platform.supportsCSS3DTransforms){transforms.push("translateZ(0px)")}}var transformMap=SC.CSS_TRANSFORM_MAP;
for(var transformName in transformMap){var layoutTransform=layout[transformName];
if(layoutTransform!=null){transforms.push(transformMap[transformName](layoutTransform))
}}this.ret[transformAttribute]=transforms.length>0?transforms.join(" "):null}},_calculateAnimations:function(translateLeft,translateTop){var layout=this.layout,animations=layout.animate,key;
if(!animations){return}if(this.getPath("view.isAnimatable")){return}var transitions=[],animation;
this._animatedTransforms=[];if(!this._pendingAnimations){this._pendingAnimations={}
}var platformTransform="-"+SC.platform.cssPrefix+"-transform";if(SC.platform.supportsCSSTransitions){for(key in animations){animation=animations[key];
var isTransformProperty=SC.CSS_TRANSFORM_MAP[key];var isTurboProperty=(key==="top"&&translateTop!=null)||(key==="left"&&translateLeft!=null);
if(SC.platform.supportsCSSTransforms&&(isTurboProperty||isTransformProperty)){this._animatedTransforms.push(key);
key=platformTransform}animation.css=key+" "+animation.duration+"s "+animation.timing;
if(!this._pendingAnimations[key]){this._pendingAnimations[key]=animation;transitions.push(animation.css)
}}this.ret[SC.platform.domCSSPrefix+"Transition"]=transitions.join(", ")}else{for(key in animations){this._pendingAnimations[key]=animations[key]
}}delete layout.animate},_cssNumber:function(val){if(val==null){return null}else{if(val===SC.LAYOUT_AUTO){return SC.LAYOUT_AUTO
}else{if(SC.isPercentage(val)){return(val*100)+"%"}else{return Math.floor(val)}}}},calculate:function(){var layout=this.get("layout"),pdim=null,translateTop=null,translateLeft=null,turbo=this.get("turbo"),ret=this.ret,dims=this.dims,loc=this.loc,view=this.get("view"),key,value;
this._handleMistakes(layout);if(this.hasLeft||this.hasRight||!this.hasCenterX){translateLeft=this._calculatePosition("x")
}else{this._calculateCenter("x")}if(this.hasTop||this.hasBottom||!this.hasCenterY){translateTop=this._calculatePosition("y")
}else{this._calculateCenter("y")}ret.minWidth=this.minWidth;ret.maxWidth=this.maxWidth;
ret.minHeight=this.minHeight;ret.maxHeight=this.maxHeight;ret.zIndex=this.zIndex;
ret.opacity=this.opacity;ret.mozOpacity=this.opacity;ret.backgroundPosition=this.backgroundPosition;
this._calculateTransforms(translateLeft,translateTop);this._calculateAnimations(translateLeft,translateTop);
for(key in ret){value=ret[key];if(typeof value===SC.T_NUMBER){ret[key]=(value+"px")
}}return ret},willRenderAnimations:function(){if(SC.platform.supportsCSSTransitions){var view=this.get("view"),layer=view.get("layer"),currentStyle=layer?layer.style:null,newStyle=view.get("layoutStyle"),activeAnimations=this._activeAnimations,activeAnimation,pendingAnimations=this._pendingAnimations,pendingAnimation,animatedTransforms=this._animatedTransforms,transformsLength=animatedTransforms?animatedTransforms.length:0,transitionStyle=newStyle[SC.platform.domCSSPrefix+"Transition"],layout=view.get("layout"),key,callback,idx,shouldCancel;
if(pendingAnimations){if(!activeAnimations){activeAnimations={}}for(key in pendingAnimations){if(!pendingAnimations.hasOwnProperty(key)){continue
}pendingAnimation=pendingAnimations[key];activeAnimation=activeAnimations[key];shouldCancel=NO;
if(newStyle[key]!==(currentStyle?currentStyle[key]:null)){shouldCancel=YES}if(activeAnimation&&(activeAnimation.duration!==pendingAnimation.duration||activeAnimation.timing!==pendingAnimation.timing)){shouldCancel=YES
}if(shouldCancel&&activeAnimation){if(callback=activeAnimation.callback){if(transformsLength>0){for(idx=0;
idx<transformsLength;idx++){this.runAnimationCallback(callback,null,animatedTransforms[idx],YES)
}this._animatedTransforms=null}else{this.runAnimationCallback(callback,null,key,YES)
}}this.removeAnimationFromLayout(key,YES)}activeAnimations[key]=pendingAnimation}}this._activeAnimations=activeAnimations;
this._pendingAnimations=null}},didRenderAnimations:function(){if(!SC.platform.supportsCSSTransitions){var key,callback;
for(key in this._pendingAnimations){callback=this._pendingAnimations[key].callback;
if(callback){this.runAnimationCallback(callback,null,key,NO)}this.removeAnimationFromLayout(key,NO,YES)
}this._activeAnimations=this._pendingAnimations=null}},runAnimationCallback:function(callback,evt,propertyName,cancelled){var view=this.get("view");
if(callback){if(SC.typeOf(callback)!==SC.T_HASH){callback={action:callback}}callback.source=view;
if(!callback.target){callback.target=this}}SC.View.runCallback(callback,{event:evt,propertyName:propertyName,view:view,isCancelled:cancelled})
},transitionDidEnd:function(evt){var propertyName=evt.originalEvent.propertyName,animation,idx;
animation=this._activeAnimations?this._activeAnimations[propertyName]:null;if(animation){if(animation.callback){SC.RunLoop.begin();
if(this._animatedTransforms&&this._animatedTransforms.length>0){for(idx=0;idx<this._animatedTransforms.length;
idx++){this.invokeLater("runAnimationCallback",1,animation.callback,evt,this._animatedTransforms[idx],NO)
}}else{this.invokeLater("runAnimationCallback",1,animation.callback,evt,propertyName,NO)
}SC.RunLoop.end()}this.removeAnimationFromLayout(propertyName,YES)}},removeAnimationFromLayout:function(propertyName,updateStyle,isPending){if(updateStyle){var layer=this.getPath("view.layer"),updatedCSS=[],key;
for(key in this._activeAnimations){if(key!==propertyName){updatedCSS.push(this._activeAnimations[key].css)
}}if(layer){layer.style[SC.platform.domCSSPrefix+"Transition"]=updatedCSS.join(", ")
}}var layout=this.getPath("view.layout"),idx;if(propertyName==="-"+SC.platform.cssPrefix+"-transform"&&this._animatedTransforms&&this._animatedTransforms.length>0){for(idx=0;
idx<this._animatedTransforms.length;idx++){delete layout["animate"+this._animatedTransforms[idx].capitalize()]
}this._animatedTransforms=null}delete layout["animate"+propertyName.capitalize()];
if(!isPending){delete this._activeAnimations[propertyName]}}});SC.CoreView.runCallback=function(callback){var additionalArgs=SC.$A(arguments).slice(1),typeOfAction=SC.typeOf(callback.action);
if(typeOfAction==SC.T_FUNCTION){callback.action.apply(callback.target,additionalArgs)
}else{if(typeOfAction===SC.T_STRING){if(callback.action.indexOf(".")>=0){var path=callback.action.split(".");
var property=path.pop();var target=SC.objectForPropertyPath(path,window);var action=target.get?target.get(property):target[property];
if(action&&SC.typeOf(action)==SC.T_FUNCTION){action.apply(target,additionalArgs)}else{throw"SC.runCallback could not find a function at %@".fmt(callback.action)
}}}}};SC.View.runCallback=SC.CoreView.runCallback;sc_require("views/view");sc_require("views/view/layout_style");
SC.ANIMATABLE_PROPERTIES={top:YES,left:YES,bottom:YES,right:YES,width:YES,height:YES,centerX:YES,centerY:YES,opacity:YES,scale:YES,rotate:YES,rotateX:YES,rotateY:YES,rotateZ:YES};
SC.View.reopen({didCreateLayerMixin:function(){if(SC.platform.supportsCSSTransitions){this.resetAnimation()
}},animate:function(keyOrHash,valueOrOptions,optionsOrCallback,callback){var hash,options;
if(typeof keyOrHash===SC.T_STRING){hash={};hash[keyOrHash]=valueOrOptions;options=optionsOrCallback
}else{hash=keyOrHash;options=valueOrOptions;callback=optionsOrCallback}var optionsType=SC.typeOf(options);
if(optionsType===SC.T_NUMBER){options={duration:options}}else{if(optionsType!==SC.T_HASH){throw"Must provide options hash or duration!"
}}if(callback){options.callback=callback}var timing=options.timing;if(timing){if(typeof timing!==SC.T_STRING){options.timing="cubic-bezier("+timing[0]+", "+timing[1]+", "+timing[2]+", "+timing[3]+")"
}}else{options.timing="linear"}var layout=SC.clone(this.get("layout")),didChange=NO,value,cur,animValue,curAnim,key;
if(!layout.animate){layout.animate={}}for(key in hash){if(!hash.hasOwnProperty(key)||!SC.ANIMATABLE_PROPERTIES[key]){continue
}value=hash[key];cur=layout[key];curAnim=layout.animate[key];if(value==null){throw"Can only animate to an actual value!"
}if(cur!==value||(curAnim&&curAnim.duration!==options.duration)){didChange=YES;layout.animate[key]=options;
layout[key]=value}}if(didChange){this.set("layout",layout)}return this},resetAnimation:function(){var layout=this.get("layout"),animations=layout.animate,didChange=NO,key;
if(!animations){return}var hasAnimations;for(key in animations){didChange=YES;delete animations[key]
}if(didChange){this.set("layout",layout);this.notifyPropertyChange("layout")}return this
},transitionDidEnd:function(evt){this.get("layoutStyleCalculator").transitionDidEnd(evt)
},wantsAcceleratedLayer:NO,hasAcceleratedLayer:function(){if(this.get("wantsAcceleratedLayer")&&SC.platform.supportsAcceleratedLayers){var layout=this.get("layout"),animations=layout.animate,AUTO=SC.LAYOUT_AUTO,key;
if(animations&&(animations.top||animations.left)){for(key in animations){if(SC.CSS_TRANSFORM_MAP[key]&&((animations.top&&animations.top.duration!==animations[key].duration)||(animations.left&&animations.left.duration!==animations[key].duration))){return NO
}}}if(layout.left!=null&&!SC.isPercentage(layout.left)&&layout.left!==AUTO&&layout.top!=null&&!SC.isPercentage(layout.top)&&layout.top!==AUTO&&layout.width!=null&&!SC.isPercentage(layout.width)&&layout.width!==AUTO&&layout.height!=null&&!SC.isPercentage(layout.height)&&layout.height!==AUTO){return YES
}}return NO}.property("wantsAcceleratedLayer").cacheable()});sc_require("views/view");
SC.View.reopen({cursor:function(key,value){var parent;if(value){this._setCursor=value
}if(this._setCursor!==undefined){return this._setCursor}parent=this.get("parentView");
if(this.get("shouldInheritCursor")&&parent){return parent.get("cursor")}return null
}.property("parentView","shouldInheritCursor").cacheable(),applyAttributesToContext:function(original,context){var cursor=this.get("cursor");
if(cursor){context.addClass(cursor.get("className"))}original(context)}.enhance(),shouldInheritCursor:YES});
sc_require("views/view");SC.View.reopen({isEnabled:YES,isEnabledBindingDefault:SC.Binding.oneWay().bool(),isEnabledInPane:function(){var ret=this.get("isEnabled"),pv;
if(ret&&(pv=this.get("parentView"))){ret=pv.get("isEnabledInPane")}return ret}.property("parentView","isEnabled"),_sc_view_isEnabledDidChange:function(){if(!this.get("isEnabled")&&this.get("isFirstResponder")){this.resignFirstResponder()
}}.observes("isEnabled"),applyAttributesToContext:function(original,context){var isEnabled=this.get("isEnabled");
original(context);context.setClass("disabled",!isEnabled);context.attr("aria-disabled",!isEnabled?"true":null)
}.enhance()});sc_require("views/view");SC.View.reopen({isKeyResponder:NO,willLoseKeyResponderTo:function(responder){},willBecomeKeyResponderFrom:function(responder){},didLoseKeyResponderTo:function(responder){},didBecomeKeyResponderFrom:function(responder){},interpretKeyEvents:function(event){var codes=event.commandCodes(),cmd=codes[0],chr=codes[1],ret;
if(!cmd&&!chr){return null}if(cmd){var methodName=SC.MODIFIED_KEY_BINDINGS[cmd]||SC.BASE_KEY_BINDINGS[cmd.match(/[^_]+$/)[0]];
if(methodName){var target=this,pane=this.get("pane"),handler=null;while(target&&!(handler=target.tryToPerform(methodName,event))){target=(target===pane)?null:target.get("nextResponder")
}return handler}}if(chr&&this.respondsTo("insertText")){ret=this.insertText(chr,event);
return ret?(ret===YES?this:ret):null}return null},insertText:function(chr){return NO
},performKeyEquivalent:function(keystring,evt){var ret=NO,childViews=this.get("childViews"),len=childViews.length,idx=-1,view;
while(!ret&&(++idx<len)){view=childViews[idx];ret=view.tryToPerform("performKeyEquivalent",keystring,evt)
}return ret},nextKeyView:null,nextValidKeyView:function(){var seen=[],rootView=this.get("pane"),ret=this.get("nextKeyView");
if(!ret){ret=rootView._computeNextValidKeyView(this,seen)}if(SC.TABBING_ONLY_INSIDE_DOCUMENT&&!ret){ret=rootView._computeNextValidKeyView(rootView,seen)
}return ret}.property("nextKeyView"),_computeNextValidKeyView:function(currentView,seen){var ret=this.get("nextKeyView"),children,i,childLen,child;
if(this!==currentView&&seen.indexOf(currentView)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}seen.push(this);if(!ret){children=this.get("childViews");for(i=0,childLen=children.length;
i<childLen;i++){child=children[i];if(child.get("isVisibleInWindow")&&child.get("isVisible")){ret=child._computeNextValidKeyView(currentView,seen)
}if(ret){return ret}}ret=null}return ret},previousKeyView:null,previousValidKeyView:function(){var seen=[],rootView=this.pane(),ret=this.get("previousKeyView");
if(!ret){ret=rootView._computePreviousValidKeyView(this,seen)}return ret}.property("previousKeyView"),_computePreviousValidKeyView:function(currentView,seen){var ret=this.get("previousKeyView"),children,i,child;
if(this!==currentView&&seen.indexOf(currentView)!=-1&&this.get("acceptsFirstResponder")&&this.get("isVisibleInWindow")){return this
}seen.push(this);if(!ret){children=this.get("childViews");for(i=children.length-1;
0<=i;i--){child=children[i];if(child.get("isVisibleInWindow")&&child.get("isVisible")){ret=child._computePreviousValidKeyView(currentView,seen)
}if(ret){return ret}}ret=null}return ret}});sc_require("views/view");sc_require("views/view/layout_style");
SC.LAYOUT_HORIZONTAL="sc-layout-horizontal";SC.LAYOUT_VERTICAL="sc-layout-vertical";
SC._VIEW_DEFAULT_DIMS="marginTop marginLeft".w();SC.FULL_WIDTH={left:0,right:0};SC.FULL_HEIGHT={top:0,bottom:0};
SC.ANCHOR_CENTER={centerX:0,centerY:0};SC.LAYOUT_AUTO="auto";SC.View.reopen({concatenatedProperties:["layoutProperties"],backgroundColor:null,displayProperties:["backgroundColor"],useStaticLayout:NO,init:function(original){original();
this.layoutStyleCalculator=SC.View.LayoutStyleCalculator.create({view:this});this._previousLayout=this.get("layout")
}.enhance(),propertyDidChange:function(key,value,_keepCache){var layoutChange=false;
if(typeof this.layout==="function"&&this._kvo_dependents){var dependents=this._kvo_dependents[key];
if(dependents&&dependents.indexOf("layout")!=-1){layoutChange=true}}if(key==="layout"||layoutChange){this.layoutDidChange()
}arguments.callee.base.apply(this,arguments)},adjust:function(key,value){var layout=SC.clone(this.get("layout")),didChange=NO,cur;
if(key===undefined){return this}if(SC.typeOf(key)===SC.T_STRING){hash={};hash[key]=value
}else{hash=key}for(key in hash){if(!hash.hasOwnProperty(key)){continue}value=hash[key];
cur=layout[key];if(value===undefined||cur==value){continue}if(value===null){delete layout[key]
}else{layout[key]=value}didChange=YES}if(didChange){this.set("layout",layout)}return this
},layout:{top:0,left:0,bottom:0,right:0},convertFrameToView:function(frame,targetView){var myX=0,myY=0,targetX=0,targetY=0,view=this,f;
while(view){f=view.get("frame");myX+=f.x;myY+=f.y;view=view.get("layoutView")}if(targetView){view=targetView;
while(view){f=view.get("frame");targetX+=f.x;targetY+=f.y;view=view.get("layoutView")
}}myX=frame.x+myX-targetX;myY=frame.y+myY-targetY;return{x:myX,y:myY,width:frame.width,height:frame.height}
},convertFrameFromView:function(frame,targetView){var myX=0,myY=0,targetX=0,targetY=0,view=this,f;
while(view&&(f=view.get("frame"))){myX+=f.x;myY+=f.y;view=view.get("parentView")}if(targetView){view=targetView;
while(view){f=view.get("frame");targetX+=f.x;targetY+=f.y;view=view.get("parentView")
}}myX=frame.x-myX+targetX;myY=frame.y-myY+targetY;return{x:myX,y:myY,width:frame.width,height:frame.height}
},scrollToVisible:function(){var pv=this.get("parentView");while(pv&&!pv.get("isScrollable")){pv=pv.get("parentView")
}if(pv){pv.scrollToVisible();return pv.scrollToVisible(this)}else{return NO}},_adjustForBorder:function(frame,layout){var borderTop=((layout.borderTop!==undefined)?layout.borderTop:layout.border)||0,borderLeft=((layout.borderLeft!==undefined)?layout.borderLeft:layout.border)||0,borderBottom=((layout.borderBottom!==undefined)?layout.borderBottom:layout.border)||0,borderRight=((layout.borderRight!==undefined)?layout.borderRight:layout.border)||0;
frame.x+=borderLeft;frame.y+=borderTop;frame.width-=(borderLeft+borderRight);frame.height-=(borderTop+borderBottom);
return frame},computeFrameWithParentFrame:function(original,pdim){var layout=this.get("layout");
if(this.get("useStaticLayout")){var f=original(pdim);return f?this._adjustForBorder(f,layout):null
}var f={},error,layer,AUTO=SC.LAYOUT_AUTO,pv=this.get("parentView"),dH,dW,lR=layout.right,lL=layout.left,lT=layout.top,lB=layout.bottom,lW=layout.width,lH=layout.height,lcX=layout.centerX,lcY=layout.centerY;
if(lW===AUTO){error=SC.Error.desc(("%@.layout() cannot use width:auto if staticLayout is disabled").fmt(this),"%@".fmt(this),-1);
SC.Logger.error(error.toString());throw error}if(lH===AUTO){error=SC.Error.desc(("%@.layout() cannot use height:auto if staticLayout is disabled").fmt(this),"%@".fmt(this),-1);
SC.Logger.error(error.toString());throw error}if(!pdim){pdim=this.computeParentDimensions(layout)
}dH=pdim.height;dW=pdim.width;if(!SC.none(lL)){if(SC.isPercentage(lL)){f.x=dW*lL}else{f.x=lL
}if(lW!==undefined){if(lW===AUTO){f.width=AUTO}else{if(SC.isPercentage(lW)){f.width=dW*lW
}else{f.width=lW}}}else{f.width=dW-f.x;if(lR&&SC.isPercentage(lR)){f.width=f.width-(lR*dW)
}else{f.width=f.width-(lR||0)}}}else{if(!SC.none(lR)){if(SC.none(lW)){if(SC.isPercentage(lR)){f.width=dW-(dW*lR)
}else{f.width=dW-lR}f.x=0}else{if(lW===AUTO){f.width=AUTO}else{if(SC.isPercentage(lW)){f.width=dW*lW
}else{f.width=(lW||0)}}if(SC.isPercentage(lW)){f.x=dW-(lR*dW)-f.width}else{f.x=dW-lR-f.width
}}}else{if(!SC.none(lcX)){if(lW===AUTO){f.width=AUTO}else{if(SC.isPercentage(lW)){f.width=lW*dW
}else{f.width=(lW||0)}}if(SC.isPercentage(lcX)){f.x=(dW-f.width)/2+(lcX*dW)}else{f.x=(dW-f.width)/2+lcX
}}else{f.x=0;if(SC.none(lW)){f.width=dW}else{if(lW===AUTO){f.width=AUTO}if(SC.isPercentage(lW)){f.width=lW*dW
}else{f.width=(lW||0)}}}}}if(!SC.none(lT)){if(SC.isPercentage(lT)){f.y=lT*dH}else{f.y=lT
}if(lH!==undefined){if(lH===AUTO){f.height=AUTO}else{if(SC.isPercentage(lH)){f.height=lH*dH
}else{f.height=lH}}}else{if(lB&&SC.isPercentage(lB)){f.height=dH-f.y-(lB*dH)}else{f.height=dH-f.y-(lB||0)
}}}else{if(!SC.none(lB)){if(SC.none(lH)){if(SC.isPercentage(lB)){f.height=dH-(lB*dH)
}else{f.height=dH-lB}f.y=0}else{if(lH===AUTO){f.height=AUTO}if(lH&&SC.isPercentage(lH)){f.height=lH*dH
}else{f.height=(lH||0)}if(SC.isPercentage(lB)){f.y=dH-(lB*dH)-f.height}else{f.y=dH-lB-f.height
}}}else{if(!SC.none(lcY)){if(lH===AUTO){f.height=AUTO}if(lH&&SC.isPercentage(lH)){f.height=lH*dH
}else{f.height=(lH||0)}if(SC.isPercentage(lcY)){f.y=(dH-f.height)/2+(lcY*dH)}else{f.y=(dH-f.height)/2+lcY
}}else{f.y=0;if(SC.none(lH)){f.height=dH}else{if(lH===AUTO){f.height=AUTO}if(SC.isPercentage(lH)){f.height=lH*dH
}else{f.height=lH||0}}}}}f.x=Math.floor(f.x);f.y=Math.floor(f.y);if(f.height!==AUTO){f.height=Math.floor(f.height)
}if(f.width!==AUTO){f.width=Math.floor(f.width)}if(f.height===AUTO||f.width===AUTO){layer=this.get("layer");
if(f.height===AUTO){f.height=layer?layer.clientHeight:0}if(f.width===AUTO){f.width=layer?layer.clientWidth:0
}}f=this._adjustForBorder(f,layout);if(pv&&pv.isScrollContainer){pv=pv.get("parentView");
f.x-=pv.get("horizontalScrollOffset");f.y-=pv.get("verticalScrollOffset")}if(!SC.none(layout.maxHeight)&&(f.height>layout.maxHeight)){f.height=layout.maxHeight
}if(!SC.none(layout.minHeight)&&(f.height<layout.minHeight)){f.height=layout.minHeight
}if(!SC.none(layout.maxWidth)&&(f.width>layout.maxWidth)){f.width=layout.maxWidth
}if(!SC.none(layout.minWidth)&&(f.width<layout.minWidth)){f.width=layout.minWidth
}if(f.height<0){f.height=0}if(f.width<0){f.width=0}return f}.enhance(),computeParentDimensions:function(frame){var ret,pv=this.get("parentView"),pf=(pv)?pv.get("frame"):null;
if(pf){ret={width:pf.width,height:pf.height}}else{var f=frame||{};ret={width:(f.left||0)+(f.width||0)+(f.right||0),height:(f.top||0)+(f.height||0)+(f.bottom||0)}
}return ret},borderFrame:function(){var layout=this.get("layout"),frame=this.get("frame"),defaultBorder=layout.border,topBorder=((layout.topBorder!==undefined)?layout.topBorder:layout.border)||0,rightBorder=((layout.rightBorder!==undefined)?layout.rightBorder:layout.border)||0,bottomBorder=((layout.bottomBorder!==undefined)?layout.bottomBorder:layout.border)||0,leftBorder=((layout.leftBorder!==undefined)?layout.leftBorder:layout.border)||0;
return{x:frame.x-leftBorder,y:frame.y-topBorder,width:frame.width+leftBorder+rightBorder,height:frame.height+topBorder+bottomBorder}
}.property("frame").cacheable(),parentViewDidResize:function(){var frameMayHaveChanged,layout,isFixed,isPercentageFunc,isPercentage;
if(this.useStaticLayout){frameMayHaveChanged=YES}else{layout=this.get("layout");isFixed=((layout.left!==undefined)&&(layout.top!==undefined)&&(layout.width!==undefined)&&(layout.height!==undefined));
if(isFixed){isPercentageFunc=SC.isPercentage;isPercentage=(isPercentageFunc(layout.left)||isPercentageFunc(layout.top)||isPercentageFunc(layout.width)||isPercentageFunc(layout.right)||isPercentageFunc(layout.centerX)||isPercentageFunc(layout.centerY))
}frameMayHaveChanged=(!isFixed||isPercentage)}if(frameMayHaveChanged){this.viewDidResize()
}},viewDidResize:function(){this._viewFrameDidChange();var cv=this.childViews,len,idx,view;
for(idx=0;idx<(len=cv.length);++idx){view=cv[idx];view.tryToPerform("parentViewDidResize")
}},_viewFrameDidChange:function(){this.notifyPropertyChange("frame");this._sc_view_clippingFrameDidChange()
},beginLiveResize:function(){if(this.willBeginLiveResize){this.willBeginLiveResize()
}var ary=this.get("childViews"),len=ary.length,idx,view;for(idx=0;idx<len;++idx){view=ary[idx];
if(view.beginLiveResize){view.beginLiveResize()}}return this},endLiveResize:function(){var ary=this.get("childViews"),len=ary.length,idx,view;
for(idx=len-1;idx>=0;--idx){view=ary[idx];if(view.endLiveResize){view.endLiveResize()
}}if(this.didEndLiveResize){this.didEndLiveResize()}return this},layoutView:function(){return this.get("parentView")
}.property("parentView").cacheable(),layoutDidChange:function(){var previousLayout=this._previousLayout,currentLayout=this.get("layout"),didResize=YES,previousWidth,previousHeight,currentWidth,currentHeight;
if(!SC.none(currentLayout.rotate)){if(SC.none(currentLayout.rotateX)){currentLayout.rotateX=currentLayout.rotate;
SC.Logger.warn("Please set rotateX instead of rotate")}}if(!SC.none(currentLayout.rotateX)){currentLayout.rotate=currentLayout.rotateX
}else{delete currentLayout.rotate}var animations=currentLayout.animations;if(animations){if(!SC.none(animations.rotate)){if(SC.none(animations.rotateX)){animations.rotateX=animations.rotate;
SC.Logger.warn("Please animate rotateX instead of rotate")}}if(!SC.none(animations.rotateX)){animations.rotate=animations.rotateX
}else{delete animations.rotate}}if(previousLayout&&previousLayout!==currentLayout){previousWidth=previousLayout.width;
if(previousWidth!==undefined){currentWidth=currentLayout.width;if(previousWidth===currentWidth){previousHeight=previousLayout.height;
if(previousLayout!==undefined){currentHeight=currentLayout.height;if(previousHeight===currentHeight){didResize=NO
}}}}}this.beginPropertyChanges();this.notifyPropertyChange("hasAcceleratedLayer");
this.notifyPropertyChange("layoutStyle");if(didResize){this.viewDidResize()}else{this._viewFrameDidChange()
}this.endPropertyChanges();var layoutView=this.get("layoutView");if(layoutView){layoutView.set("childViewsNeedLayout",YES);
layoutView.layoutDidChangeFor(this);if(layoutView.get("childViewsNeedLayout")){layoutView.invokeOnce(layoutView.layoutChildViewsIfNeeded)
}}this._previousLayout=currentLayout;return this},childViewsNeedLayout:NO,layoutDidChangeFor:function(childView){var set=this._needLayoutViews;
if(!set){set=this._needLayoutViews=SC.CoreSet.create()}set.add(childView)},layoutChildViewsIfNeeded:function(isVisible){if(!isVisible){isVisible=this.get("isVisibleInWindow")
}if(isVisible&&this.get("childViewsNeedLayout")){this.set("childViewsNeedLayout",NO);
this.layoutChildViews()}return this},layoutChildViews:function(){var set=this._needLayoutViews,len=set?set.length:0,i;
for(i=0;i<len;++i){set[i].updateLayout()}set.clear()},updateLayout:function(){var layer=this.get("layer"),context;
if(layer){context=this.renderContext(layer);this.renderLayout(context,NO);context.update();
if(this.useStaticLayout){this.viewDidResize()}}layer=null;return this},renderLayout:function(context,firstTime){this.get("layoutStyleCalculator").willRenderAnimations();
context.addStyle(this.get("layoutStyle"));this.get("layoutStyleCalculator").didRenderAnimations()
},_renderLayerSettings:function(original,context,firstTime){original(context,firstTime);
this.renderLayout(context,firstTime)}.enhance(),applyAttributesToContext:function(original,context){original(context);
if(this.get("useStaticLayout")){context.addClass("sc-static-layout")}if(this.get("backgroundColor")){context.css("backgroundColor",this.get("backgroundColor"))
}}.enhance()});SC.View.mixin({convertLayoutToAnchoredLayout:function(layout,parentFrame){var ret={top:0,left:0,width:parentFrame.width,height:parentFrame.height},pFW=parentFrame.width,pFH=parentFrame.height,lR=layout.right,lL=layout.left,lT=layout.top,lB=layout.bottom,lW=layout.width,lH=layout.height,lcX=layout.centerX,lcY=layout.centerY;
if(!SC.none(lL)){if(SC.isPercentage(lL)){ret.left=lL*pFW}else{ret.left=lL}if(lW!==undefined){if(lW===SC.LAYOUT_AUTO){ret.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lW)){ret.width=lW*pFW}else{ret.width=lW}}}else{if(lR&&SC.isPercentage(lR)){ret.width=pFW-ret.left-(lR*pFW)
}else{ret.width=pFW-ret.left-(lR||0)}}}else{if(!SC.none(lR)){if(SC.none(lW)){ret.left=0;
if(lR&&SC.isPercentage(lR)){ret.width=pFW-(lR*pFW)}else{ret.width=pFW-(lR||0)}}else{if(lW===SC.LAYOUT_AUTO){ret.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lW)){ret.width=lW*pFW}else{ret.width=lW}if(SC.isPercentage(lR)){ret.left=pFW-(ret.width+lR)
}else{ret.left=pFW-(ret.width+lR)}}}}else{if(!SC.none(lcX)){if(lW&&SC.isPercentage(lW)){ret.width=(lW*pFW)
}else{ret.width=(lW||0)}ret.left=((pFW-ret.width)/2);if(SC.isPercentage(lcX)){ret.left=ret.left+lcX*pFW
}else{ret.left=ret.left+lcX}}else{if(!SC.none(lW)){ret.left=0;if(lW===SC.LAYOUT_AUTO){ret.width=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lW)){ret.width=lW*pFW}else{ret.width=lW}}}else{ret.left=0;
ret.width=0}}}}if(layout.minWidth!==undefined){ret.minWidth=layout.minWidth}if(layout.maxWidth!==undefined){ret.maxWidth=layout.maxWidth
}if(!SC.none(lT)){if(SC.isPercentage(lT)){ret.top=lT*pFH}else{ret.top=lT}if(lH!==undefined){if(lH===SC.LAYOUT_AUTO){ret.height=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lH)){ret.height=lH*pFH}else{ret.height=lH}}}else{ret.height=pFH-ret.top;
if(lB&&SC.isPercentage(lB)){ret.height=ret.height-(lB*pFH)}else{ret.height=ret.height-(lB||0)
}}}else{if(!SC.none(lB)){if(SC.none(lH)){ret.top=0;if(lB&&SC.isPercentage(lB)){ret.height=pFH-(lB*pFH)
}else{ret.height=pFH-(lB||0)}}else{if(lH===SC.LAYOUT_AUTO){ret.height=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lH)){ret.height=lH*pFH}else{ret.height=lH}ret.top=pFH-ret.height;
if(SC.isPercentage(lB)){ret.top=ret.top-(lB*pFH)}else{ret.top=ret.top-lB}}}}else{if(!SC.none(lcY)){if(lH&&SC.isPercentage(lH)){ret.height=(lH*pFH)
}else{ret.height=(lH||0)}ret.top=((pFH-ret.height)/2);if(SC.isPercentage(lcY)){ret.top=ret.top+lcY*pFH
}else{ret.top=ret.top+lcY}}else{if(!SC.none(lH)){ret.top=0;if(lH===SC.LAYOUT_AUTO){ret.height=SC.LAYOUT_AUTO
}else{if(SC.isPercentage(lH)){ret.height=lH*pFH}else{ret.height=lH}}}else{ret.top=0;
ret.height=0}}}}if(ret.top){ret.top=Math.floor(ret.top)}if(ret.bottom){ret.bottom=Math.floor(ret.bottom)
}if(ret.left){ret.left=Math.floor(ret.left)}if(ret.right){ret.right=Math.floor(ret.right)
}if(ret.width!==SC.LAYOUT_AUTO){ret.width=Math.floor(ret.width)}if(ret.height!==SC.LAYOUT_AUTO){ret.height=Math.floor(ret.height)
}if(layout.minHeight!==undefined){ret.minHeight=layout.minHeight}if(layout.maxHeight!==undefined){ret.maxHeight=layout.maxHeight
}return ret},convertLayoutToCustomLayout:function(layout,layoutParams,parentFrame){}});
sc_require("views/view");SC.View.reopen({_lastLayerId:null,layerIdDidChange:function(){var layer=this.get("layer"),lid=this.get("layerId"),lastId=this._lastLayerId;
if(lid!==lastId){if(lastId&&SC.View.views[lastId]===this){delete SC.View.views[lastId]
}this._lastLayerId=lid;SC.View.views[lid]=this;if(layer){layer.id=lid}}}.observes("layerId"),parentViewDidChange:function(){this.recomputeIsVisibleInWindow();
this.resetBuildState();this.set("layerLocationNeedsUpdate",YES);this.invokeOnce(this.updateLayerLocationIfNeeded);
this._invalidatePaneCacheForSelfAndAllChildViews();return this},_invalidatePaneCacheForSelfAndAllChildViews:function(){var childView,childViews=this.get("childViews"),len=childViews.length,idx;
this.notifyPropertyChange("pane");for(idx=0;idx<len;++idx){childView=childViews[idx];
if(childView._invalidatePaneCacheForSelfAndAllChildViews){childView._invalidatePaneCacheForSelfAndAllChildViews()
}}},layerLocationNeedsUpdate:NO,updateLayerLocationIfNeeded:function(force){if(this.get("layerLocationNeedsUpdate")){this.updateLayerLocation()
}return this},insertBefore:function(view,beforeView){view.beginPropertyChanges();
if(view.get("parentView")){view.removeFromParent()}if(this.willAddChild){this.willAddChild(view,beforeView)
}if(view.willAddToParent){view.willAddToParent(this,beforeView)}view.set("parentView",this);
var idx,childViews=this.get("childViews");if(childViews.needsClone){this.set(childViews=[])
}idx=(beforeView)?childViews.indexOf(beforeView):childViews.length;if(idx<0){idx=childViews.length
}childViews.insertAt(idx,view);if(view.parentViewDidChange){view.parentViewDidChange()
}if(view.layoutDidChange){view.layoutDidChange()}var pane=view.get("pane");if(pane&&pane.get("isPaneAttached")){view._notifyDidAppendToDocument()
}if(this.didAddChild){this.didAddChild(view,beforeView)}if(view.didAddToParent){view.didAddToParent(this,beforeView)
}view.endPropertyChanges();return this},removeChild:function(original,view){if(!view){return this
}if(view.parentView!==this){throw"%@.removeChild(%@) must belong to parent".fmt(this,view)
}if(view.willRemoveFromParent){view.willRemoveFromParent()}if(this.willRemoveChild){this.willRemoveChild(view)
}original(view);if(view.parentViewDidChange){view.parentViewDidChange()}if(this.didRemoveChild){this.didRemoveChild(view)
}if(view.didRemoveFromParent){view.didRemoveFromParent(this)}return this}.enhance(),replaceChild:function(view,oldView){view.beginPropertyChanges();
oldView.beginPropertyChanges();this.beginPropertyChanges();this.insertBefore(view,oldView).removeChild(oldView);
this.endPropertyChanges();oldView.endPropertyChanges();view.endPropertyChanges();
return this},replaceAllChildren:function(views){var len=views.get("length"),idx;this.beginPropertyChanges();
this.destroyLayer().removeAllChildren();for(idx=0;idx<len;idx++){this.appendChild(views.objectAt(idx))
}this.replaceLayer();this.endPropertyChanges();return this},appendChild:function(view){return this.insertBefore(view,null)
},buildInChild:function(view){view.willBuildInToView(this);this.appendChild(view);
view.buildInToView(this)},buildOutChild:function(view){view.buildOutFromView(this)
},buildInDidFinishFor:function(child){},buildOutDidFinishFor:function(child){this.removeChild(child)
},isBuildingIn:NO,isBuildingOut:NO,buildIn:function(){this.buildInDidFinish()},buildOut:function(){this.buildOutDidFinish()
},resetBuild:function(){},buildOutDidCancel:function(){},buildInDidCancel:function(){},buildInDidFinish:function(){this.isBuildingIn=NO;
this._buildingInTo.buildInDidFinishFor(this);this._buildingInTo=null},buildOutDidFinish:function(){this.isBuildingOut=NO;
this._buildingOutFrom.buildOutDidFinishFor(this);this._buildingOutFrom=null},resetBuildState:function(){if(this.isBuildingIn){this.buildInDidCancel();
this.isBuildingIn=NO}if(this.isBuildingOut){this.buildOutDidCancel();this.isBuildingOut=NO
}this.buildingInTo=null;this.buildingOutFrom=null;this.resetBuild()},willBuildInToView:function(view){if(this.isBuildingOut){this.buildOutDidCancel()
}},buildInToView:function(view){if(this.isBuildingIn){return}this._buildingInTo=view;
this.isBuildingOut=NO;this.isBuildingIn=YES;this.buildIn()},buildOutFromView:function(view){if(this.isBuildingOut){return
}if(this.isBuildingIn){this.buildInDidCancel()}this.isBuildingOut=YES;this.isBuildingIn=NO;
this._buildingOutFrom=view;this.buildOut()}});sc_require("views/view");SC.View.reopen({init:function(original){original();
this._lastTheme=this.get("theme")}.enhance(),themeName:null,baseThemeName:null,theme:function(){var base=this.get("baseTheme"),themeName=this.get("themeName");
if(themeName){var theme;if(base){theme=base.find(themeName);if(theme){return theme
}}theme=SC.Theme.find(themeName);if(theme){return theme}return base.invisibleSubtheme(themeName)
}return base}.property("baseTheme","themeName").cacheable(),_sc_view_themeDidChange:function(){if(this._lastTheme===this.get("theme")){return
}this._lastTheme=this.get("theme");var childViews=this.childViews,len=childViews.length,idx;
for(idx=0;idx<len;idx++){childViews[idx].notifyPropertyChange("baseTheme")}if(this.get("layer")){this.replaceLayer()
}}.observes("theme"),baseTheme:function(){var parent;var baseThemeName=this.get("baseThemeName");
if(baseThemeName){return SC.Theme.find(baseThemeName)}else{parent=this.get("parentView");
var theme=parent&&parent.get("theme");return theme||SC.Theme.find(SC.defaultTheme)
}}.property("baseThemeName","parentView").cacheable(),getThemedProperty:function(property,constantName){var value=this.get(property);
if(value!==undefined){return value}var theme=this.get("theme");if(!theme){return undefined
}return theme[constantName]},renderDelegate:function(key,value){if(value){this._setRenderDelegate=value
}if(this._setRenderDelegate){return this._setRenderDelegate}var renderDelegateName=this.get("renderDelegateName"),renderDelegate;
if(renderDelegateName){renderDelegate=this.get("theme")[renderDelegateName];if(!renderDelegate){throw'%@: Unable to locate render delegate "%@" in theme.'.fmt(this,renderDelegateName)
}return renderDelegate}return null}.property("renderDelegateName","theme"),renderDelegateName:null,renderDelegateProxy:function(){return SC.View._RenderDelegateProxy.createForView(this)
}.property("renderDelegate").cacheable(),render:function(context,firstTime){var renderDelegate=this.get("renderDelegate");
if(renderDelegate){if(firstTime){renderDelegate.render(this.get("renderDelegateProxy"),context)
}else{renderDelegate.update(this.get("renderDelegateProxy"),context.$())}}},applyAttributesToContext:function(original,context){var theme=this.get("theme");
var themeClassNames=theme.classNames,idx,len=themeClassNames.length;for(idx=0;idx<len;
idx++){context.addClass(themeClassNames[idx])}original(context);var renderDelegate=this.get("renderDelegate");
if(renderDelegate&&renderDelegate.name){context.addClass(renderDelegate.name)}}.enhance()});
SC.View._RenderDelegateProxy={isViewRenderDelegateProxy:YES,createForView:function(view){var ret=SC.beget(this);
var dp=view.get("displayProperties"),lookup={};for(var idx=0,len=dp.length;idx<len;
idx++){lookup[dp[idx]]=YES}lookup.theme=YES;ret._displayPropertiesLookup=lookup;ret.renderState={};
ret.view=view;return ret},get:function(property){if(this[property]!==undefined){return this[property]
}var displayProperty="display"+property.capitalize();if(this._displayPropertiesLookup[displayProperty]){return this.view.get(displayProperty)
}else{if(this._displayPropertiesLookup[property]){return this.view.get(property)}}return undefined
},didChangeFor:function(context){var len=arguments.length,idx;for(idx=1;idx<len;idx++){var property=arguments[idx],displayProperty="display"+property.capitalize();
if(this._displayPropertiesLookup[displayProperty]){if(this.view.didChangeFor(context,displayProperty)){return YES
}}else{if(this._displayPropertiesLookup[property]){if(this.view.didChangeFor(context,property)){return YES
}}}}return NO}};sc_require("views/view");SC.View.reopen({acceptsMultitouch:NO,hasTouch:NO,touchBoundary:{left:50,right:50,top:50,bottom:50},_touchBoundaryFrame:function(){return this.get("parentView").convertFrameToView(this.get("frame"),null)
}.property("frame","parentView").cacheable(),touchIsInBoundary:function(touch){var f=this.get("_touchBoundaryFrame"),maxX=0,maxY=0,boundary=this.get("touchBoundary");
var x=touch.pageX,y=touch.pageY;if(x<f.x){x=f.x-x;maxX=boundary.left}else{if(x>f.x+f.width){x=x-(f.x+f.width);
maxX=boundary.right}else{x=0;maxX=1}}if(y<f.y){y=f.y-y;maxY=boundary.top}else{if(y>f.y+f.height){y=y-(f.y+f.height);
maxY=boundary.bottom}else{y=0;maxY=1}}if(x>100||y>100){return NO}return YES}});sc_require("views/view");
SC.View.reopen({isVisibleInWindow:NO,isContextMenuEnabled:function(){return SC.CONTEXT_MENU_ENABLED
}.property(),recomputeIsVisibleInWindow:function(parentViewIsVisible){var previous=this.get("isVisibleInWindow"),current=this.get("isVisible"),parentView;
if(current){if(parentViewIsVisible===undefined){parentView=this.get("parentView");
parentViewIsVisible=parentView?parentView.get("isVisibleInWindow"):NO}current=current&&parentViewIsVisible
}if(previous!==current){this.set("isVisibleInWindow",current);var childViews=this.get("childViews"),len=childViews.length,idx,view;
for(idx=0;idx<len;idx++){view=childViews[idx];if(view.recomputeIsVisibleInWindow){view.recomputeIsVisibleInWindow(current)
}}if(current){if(this.get("childViewsNeedLayout")){this.invokeOnce(this.layoutChildViewsIfNeeded)
}}else{if(this.get("isFirstResponder")){this.resignFirstResponder()}}}this.updateLayerIfNeeded(YES);
return this},_sc_isVisibleDidChange:function(){this.displayDidChange();this.recomputeIsVisibleInWindow()
}.observes("isVisible")});sc_require("panes/pane");SC.MainPane=SC.Pane.extend({layout:{top:0,left:0,bottom:0,right:0,minHeight:200,minWidth:200},paneDidAttach:function(){var ret=arguments.callee.base.apply(this,arguments);
var responder=this.rootResponder;responder.makeMainPane(this);if(!responder.get("keyRootView")){responder.makeKeyPane(this)
}return ret},acceptsKeyPane:YES,classNames:["sc-main"],ariaRole:"application"});