SC.stringsFor("English",{});CoreTools=SC.Object.create({NAMESPACE:"CoreTools",VERSION:"1.0.0"});
CoreTools.DataSource=SC.DataSource.extend({fetch:function(store,query){var ret=NO;
switch(query.get("recordType")){case CoreTools.Target:ret=this.fetchTargets(store,query);
break;case CoreTools.Test:ret=this.fetchTests(store,query);break}return ret},fetchTargets:function(store,query){if(!query.get("isRemote")){return NO
}SC.Request.getUrl("/sc/targets.json").set("isJSON",YES).notify(this,"fetchTargetsDidComplete",{query:query,store:store}).send();
return YES},fetchTargetsDidComplete:function(request,opts){var response=request.get("response"),query=opts.query,store=opts.store,storeKeys;
if(!SC.$ok(response)){console.error("TODO: Add handler when fetching targets fails")
}else{storeKeys=store.loadRecords(CoreTools.Target,response);store.loadQueryResults(query,storeKeys)
}},fetchTests:function(store,query){var url=query.get("url");if(!query.get("isRemote")||!url){return NO
}SC.Request.getUrl(url).set("isJSON",YES).notify(this,"fetchTestsDidComplete",{query:query,store:store}).send();
return YES},fetchTestsDidComplete:function(request,opts){var response=request.get("response"),store=opts.store,query=opts.query,storeKeys;
if(!SC.$ok(response)){console.error("TODO: Add handler when fetching tests fails")
}else{storeKeys=store.loadRecords(CoreTools.Test,response);store.loadQueryResults(query,storeKeys)
}}});CoreTools.Target=SC.Record.extend({primaryKey:"name",name:SC.Record.attr(String),parent:SC.Record.toOne("CoreTools.Target"),testsUrl:SC.Record.attr(String,{key:"link_tests"}),appUrl:function(){return(this.get("kind")==="app")?this.get("name"):null
}.property("kind","name").cacheable(),isExpanded:SC.Record.attr(Boolean,{defaultValue:NO}),children:function(){var store=this.get("store"),query=CoreTools.TARGETS_QUERY,ret=store.find(query).filterProperty("parent",this);
if(ret){ret=ret.sortProperty("kind","displayName")}return(ret&&ret.get("length")>0)?ret:null
}.property().cacheable(),displayName:function(){var name=(this.get("name")||"(unknown)").split("/");
return name[name.length-1]}.property("name").cacheable(),targetIcon:function(){var ret="sc-icon-document-16";
switch(this.get("kind")){case"framework":ret="sc-icon-folder-16";break;case"app":ret="sc-icon-options-16";
break}return ret}.property("kind").cacheable(),sortKind:function(){if(this.get("name")==="/sproutcore"){return null
}var parent=this.get("parent");if(parent&&(parent.get("name")==="/sproutcore")){return"sproutcore"
}else{return(this.get("kind")||"unknown").toLowerCase()}}.property("kind","parent").cacheable(),testsQuery:function(){return SC.Query.remote(CoreTools.Test,{url:this.get("testsUrl")})
}.property("testsUrl").cacheable(),tests:function(){return this.get("store").find(this.get("testsQuery"))
}.property("testsQuery").cacheable()});CoreTools.TARGETS_QUERY=SC.Query.remote(CoreTools.Target);
CoreTools.Test=SC.Record.extend({primaryKey:"url",filename:SC.Record.attr(String),url:SC.Record.attr(String),displayName:function(){return(this.get("filename")||"").replace(/^tests\//,"")
}.property("filename").cacheable(),icon:"sc-icon-document-16",isRunnable:YES});