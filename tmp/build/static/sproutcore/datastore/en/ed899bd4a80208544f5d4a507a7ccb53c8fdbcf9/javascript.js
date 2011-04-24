SC.DataSource=SC.Object.extend({fetch:function(store,query){return NO},retrieveRecords:function(store,storeKeys,ids){return this._handleEach(store,storeKeys,this.retrieveRecord,ids)
},commitRecords:function(store,createStoreKeys,updateStoreKeys,destroyStoreKeys,params){var cret,uret,dret;
if(createStoreKeys.length>0){cret=this.createRecords.call(this,store,createStoreKeys,params)
}if(updateStoreKeys.length>0){uret=this.updateRecords.call(this,store,updateStoreKeys,params)
}if(destroyStoreKeys.length>0){dret=this.destroyRecords.call(this,store,destroyStoreKeys,params)
}return((cret===uret)&&(cret===dret))?cret:SC.MIXED_STATE},cancel:function(store,storeKeys){return NO
},updateRecords:function(store,storeKeys,params){return this._handleEach(store,storeKeys,this.updateRecord,null,params)
},createRecords:function(store,storeKeys,params){return this._handleEach(store,storeKeys,this.createRecord,null,params)
},destroyRecords:function(store,storeKeys,params){return this._handleEach(store,storeKeys,this.destroyRecord,null,params)
},_handleEach:function(store,storeKeys,action,ids,params){var len=storeKeys.length,idx,ret,cur,lastArg;
if(!ids){ids=[]}for(idx=0;idx<len;idx++){lastArg=ids[idx]?ids[idx]:params;cur=action.call(this,store,storeKeys[idx],lastArg,params);
if(ret===undefined){ret=cur}else{if(ret===YES){ret=(cur===YES)?YES:SC.MIXED_STATE
}else{if(ret===NO){ret=(cur===NO)?NO:SC.MIXED_STATE}}}}return ret?ret:null},updateRecord:function(store,storeKey,params){return NO
},retrieveRecord:function(store,storeKey,id){return NO},createRecord:function(store,storeKey,params){return NO
},destroyRecord:function(store,storeKey,params){return NO}});sc_require("data_sources/data_source");
SC.CascadeDataSource=SC.DataSource.extend({dataSources:null,from:function(dataSource){var dataSources=this.get("dataSources");
if(!dataSources){this.set("dataSources",dataSources=[])}dataSources.push(dataSource);
return this},fetch:function(store,query){var sources=this.get("dataSources"),len=sources?sources.length:0,ret=NO,cur,source,idx;
for(idx=0;(ret!==YES)&&idx<len;idx++){source=sources.objectAt(idx);cur=source.fetch?source.fetch.apply(source,arguments):NO;
ret=this._handleResponse(ret,cur)}return ret},retrieveRecords:function(store,storeKeys,ids){var sources=this.get("dataSources"),len=sources?sources.length:0,ret=NO,cur,source,idx;
for(idx=0;(ret!==YES)&&idx<len;idx++){source=sources.objectAt(idx);cur=source.retrieveRecords.apply(source,arguments);
ret=this._handleResponse(ret,cur)}return ret},commitRecords:function(store,createStoreKeys,updateStoreKeys,destroyStoreKeys){var sources=this.get("dataSources"),len=sources?sources.length:0,ret=NO,cur,source,idx;
for(idx=0;(ret!==YES)&&idx<len;idx++){source=sources.objectAt(idx);cur=source.commitRecords.apply(source,arguments);
ret=this._handleResponse(ret,cur)}return ret},cancel:function(store,storeKeys){var sources=this.get("dataSources"),len=sources?sources.length:0,ret=NO,cur,source,idx;
for(idx=0;(ret!==YES)&&idx<len;idx++){source=sources.objectAt(idx);cur=source.cancel.apply(source,arguments);
ret=this._handleResponse(ret,cur)}return ret},init:function(){arguments.callee.base.apply(this,arguments);
var sources=this.get("dataSources"),idx=sources?sources.get("length"):0,source;while(--idx>=0){source=sources[idx];
if(SC.typeOf(source)===SC.T_STRING){sources[idx]=this.get(source)}}},_handleResponse:function(current,response){if(response===YES){return YES
}else{if(current===NO){return(response===NO)?NO:SC.MIXED_STATE}else{return SC.MIXED_STATE
}}}});SC.Record=SC.Object.extend({isRecord:YES,isParentRecord:NO,primaryKey:"guid",id:function(key,value){if(value!==undefined){this.writeAttribute(this.get("primaryKey"),value);
return value}else{return SC.Store.idFor(this.storeKey)}}.property("storeKey").cacheable(),status:function(){return this.store.readStatus(this.storeKey)
}.property("storeKey").cacheable(),store:null,storeKey:null,isDestroyed:function(){return !!(this.get("status")&SC.Record.DESTROYED)
}.property("status").cacheable(),isEditable:function(key,value){if(value!==undefined){this._screc_isEditable=value
}if(this.get("status")&SC.Record.READY){return this._screc_isEditable}else{return NO
}}.property("status").cacheable(),_screc_isEditable:YES,isLoaded:function(){var K=SC.Record,status=this.get("status");
return !((status===K.EMPTY)||(status===K.BUSY_LOADING)||(status===K.ERROR))}.property("status").cacheable(),relationships:null,attributes:function(){var store=this.get("store"),storeKey=this.storeKey;
return store.readEditableDataHash(storeKey)}.property(),readOnlyAttributes:function(){var store=this.get("store"),storeKey=this.storeKey,ret=store.readDataHash(storeKey);
if(ret){ret=SC.clone(ret,YES)}return ret}.property(),nestedRecordNamespace:null,isNestedRecord:function(){var store=this.get("store"),ret,sk=this.get("storeKey"),prKey=store.parentStoreKeyExists(sk);
ret=prKey?YES:NO;return ret}.property().cacheable(),parentRecord:function(){var sk=this.storeKey,store=this.get("store");
return store.materializeParentRecord(sk)}.property(),refresh:function(recordOnly){var store=this.get("store"),rec,ro,sk=this.get("storeKey"),prKey=store.parentStoreKeyExists();
ro=recordOnly||(SC.none(recordOnly)&&SC.none(prKey));if(ro){store.refreshRecord(null,null,sk)
}else{if(prKey){rec=store.materializeRecord(prKey);rec.refresh(recordOnly)}}return this
},destroy:function(recordOnly){var store=this.get("store"),rec,ro,sk=this.get("storeKey"),prKey=store.parentStoreKeyExists();
ro=recordOnly||(SC.none(recordOnly)&&SC.none(prKey));if(ro){store.destroyRecord(null,null,sk);
this.notifyPropertyChange("status");this.propagateToAggregates()}else{if(prKey){rec=store.materializeRecord(prKey);
rec.destroy(recordOnly)}}return this},recordDidChange:function(key){var p=this.get("parentRecord");
if(p){p.recordDidChange()}this.get("store").recordDidChange(null,null,this.get("storeKey"),key);
this.notifyPropertyChange("status");this.propagateToAggregates();return this},_editLevel:0,beginEditing:function(){this._editLevel++;
return this},endEditing:function(key){if(--this._editLevel<=0){this._editLevel=0;
this.recordDidChange(key)}return this},readAttribute:function(key){var store=this.get("store"),storeKey=this.storeKey;
var attrs=store.readDataHash(storeKey);return attrs?attrs[key]:undefined},writeAttribute:function(key,value,ignoreDidChange){var store=this.get("store"),storeKey=this.storeKey,attrs;
attrs=store.readEditableDataHash(storeKey);if(!attrs){throw SC.Record.BAD_STATE_ERROR
}if(value!==attrs[key]){if(!ignoreDidChange){this.beginEditing()}attrs[key]=value;
if(key===this.get("primaryKey")){SC.Store.replaceIdFor(storeKey,value);this.propertyDidChange("id")
}if(!ignoreDidChange){this.endEditing(key)}}return this},propagateToAggregates:function(){var storeKey=this.get("storeKey"),recordType=SC.Store.recordTypeFor(storeKey),idx,len,key,val,recs;
var aggregates=recordType.aggregates;if(!aggregates){var dataHash=this.get("store").readDataHash(storeKey);
aggregates=[];for(var k in dataHash){if(this[k]&&this[k].get&&this[k].get("aggregate")===YES){aggregates.push(k)
}}recordType.aggregates=aggregates}var K=SC.Record,dirty=K.DIRTY,readyNew=K.READY_NEW,destroyed=K.DESTROYED,readyClean=K.READY_CLEAN,iter;
iter=function(rec){var childStatus,parentStatus;if(rec){childStatus=this.get("status");
if((childStatus&dirty)||(childStatus&readyNew)||(childStatus&destroyed)){parentStatus=rec.get("status");
if(parentStatus===readyClean){rec.get("store").recordDidChange(rec.constructor,null,rec.get("storeKey"),null,YES)
}}}};for(idx=0,len=aggregates.length;idx<len;++idx){key=aggregates[idx];val=this.get(key);
recs=SC.kindOf(val,SC.ManyArray)?val:[val];recs.forEach(iter,this)}},storeDidChangeProperties:function(statusOnly,keys){if(statusOnly){this.notifyPropertyChange("status")
}else{if(keys){this.beginPropertyChanges();keys.forEach(function(k){this.notifyPropertyChange(k)
},this);this.notifyPropertyChange("status");this.endPropertyChanges()}else{this.allPropertiesDidChange()
}var manyArrays=this.relationships,loc=manyArrays?manyArrays.length:0;while(--loc>=0){manyArrays[loc].recordPropertyDidChange(keys)
}}},normalize:function(includeNull){var primaryKey=this.primaryKey,recordId=this.get("id"),store=this.get("store"),storeKey=this.get("storeKey"),key,valueForKey,typeClass,recHash,attrValue,normChild,isRecord,isChild,defaultVal,keyForDataHash,attr;
var dataHash=store.readEditableDataHash(storeKey)||{};dataHash[primaryKey]=recordId;
recHash=store.readDataHash(storeKey);for(key in this){valueForKey=this[key];if(valueForKey){typeClass=valueForKey.typeClass;
if(typeClass){keyForDataHash=valueForKey.get("key")||key;isRecord=SC.typeOf(typeClass.call(valueForKey))===SC.T_CLASS;
isChild=valueForKey.isNestedRecordTransform;if(!isRecord&&!isChild){attrValue=this.get(key);
if(attrValue!==undefined||(attrValue===null&&includeNull)){attr=this[key];if(SC.instanceOf(attr,SC.RecordAttribute)){attrValue=attr.fromType(this,key,attrValue)
}dataHash[keyForDataHash]=attrValue}}else{if(isChild){attrValue=this.get(key);if(attrValue&&attrValue.normalize){attrValue.normalize()
}}else{if(isRecord){attrValue=recHash[keyForDataHash];if(attrValue!==undefined){dataHash[keyForDataHash]=attrValue
}else{defaultVal=valueForKey.get("defaultValue");if(SC.typeOf(defaultVal)===SC.T_FUNCTION){dataHash[keyForDataHash]=defaultVal(this,key,defaultVal)
}else{dataHash[keyForDataHash]=defaultVal}}}}}}}}return this},unknownProperty:function(key,value){if(value!==undefined){var storeKey=this.get("storeKey"),recordType=SC.Store.recordTypeFor(storeKey);
if(recordType.ignoreUnknownProperties===YES){this[key]=value;return value}var primaryKey=this.get("primaryKey");
this.writeAttribute(key,value);if(key===primaryKey){SC.Store.replaceIdFor(storeKey,value)
}}return this.readAttribute(key)},commitRecord:function(params,recordOnly){var store=this.get("store"),rec,ro,sk=this.get("storeKey"),prKey=store.parentStoreKeyExists();
ro=recordOnly||(SC.none(recordOnly)&&SC.none(prKey));if(ro){store.commitRecord(undefined,undefined,this.get("storeKey"),params)
}else{if(prKey){rec=store.materializeRecord(prKey);rec.commitRecord(params,recordOnly)
}}return this},isError:function(){return this.get("status")&SC.Record.ERROR}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var store=this.get("store");
return store.readError(this.get("storeKey"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),set:function(key,value){var func=this[key];if(func&&func.isProperty&&func.get&&!func.get("isEditable")){return this
}return arguments.callee.base.apply(this,arguments)},toString:function(){var attrs=this.get("store").readDataHash(this.get("storeKey"));
return"%@(%@) %@".fmt(this.constructor.toString(),SC.inspect(attrs),this.statusString())
},statusString:function(){var ret=[],status=this.get("status");for(var prop in SC.Record){if(prop.match(/[A-Z_]$/)&&SC.Record[prop]===status){ret.push(prop)
}}return ret.join(" ")},registerNestedRecord:function(value,key,path){var store,psk,csk,childRecord,recordType;
if(SC.none(path)){path=key}if(value&&value.get&&value.get("isRecord")){childRecord=value
}else{recordType=this._materializeNestedRecordType(value,key);childRecord=this.createNestedRecord(recordType,value)
}if(childRecord){this.isParentRecord=YES;store=this.get("store");psk=this.get("storeKey");
csk=childRecord.get("storeKey");store.registerChildToParent(psk,csk,path)}return childRecord
},_materializeNestedRecordType:function(value,key){var childNS,recordType,ret;if(SC.typeOf(value)===SC.T_HASH){childNS=this.get("nestedRecordNamespace");
if(value.type&&!SC.none(childNS)){recordType=childNS[value.type]}}if(!recordType&&key&&this[key]){recordType=this[key].get("typeClass")
}if(!recordType||!SC.kindOf(recordType,SC.Record)){throw"SC.Child: Error during transform: Invalid record type."
}return recordType},createNestedRecord:function(recordType,hash){var store,id,sk,pk,cr=null,existingId=null;
SC.run(function(){hash=hash||{};existingId=hash[recordType.prototype.primaryKey];
store=this.get("store");if(SC.none(store)){throw"Error: during the creation of a child record: NO STORE ON PARENT!"
}if(!id&&(pk=recordType.prototype.primaryKey)){id=hash[pk];sk=id?store.storeKeyExists(recordType,id):null;
if(sk){store.writeDataHash(sk,hash);cr=store.materializeRecord(sk)}else{cr=store.createRecord(recordType,hash);
if(SC.none(id)){sk=cr.get("storeKey");id="cr"+sk;SC.Store.replaceIdFor(sk,id);hash=store.readEditableDataHash(sk);
hash[pk]=id}}}if(SC.none(existingId)&&this.generateIdForChild){this.generateIdForChild(cr)
}},this);return cr},_nestedRecordKey:0,generateIdForChild:function(childRecord){}});
SC.Record.mixin({ignoreUnknownProperties:NO,CLEAN:1,DIRTY:2,EMPTY:256,ERROR:4096,READY:512,READY_CLEAN:513,READY_DIRTY:514,READY_NEW:515,DESTROYED:1024,DESTROYED_CLEAN:1025,DESTROYED_DIRTY:1026,BUSY:2048,BUSY_LOADING:2052,BUSY_CREATING:2056,BUSY_COMMITTING:2064,BUSY_REFRESH:2080,BUSY_REFRESH_CLEAN:2081,BUSY_REFRESH_DIRTY:2082,BUSY_DESTROYING:2112,BAD_STATE_ERROR:SC.$error("Internal barf Inconsistency"),RECORD_EXISTS_ERROR:SC.$error("Record Exists"),NOT_FOUND_ERROR:SC.$error("Not found "),BUSY_ERROR:SC.$error("Busy"),GENERIC_ERROR:SC.$error("Generic Error"),_nextChildKey:0,attr:function(type,opts){return SC.RecordAttribute.attr(type,opts)
},fetch:function(recordType,opts){return SC.FetchedAttribute.attr(recordType,opts)
},toMany:function(recordType,opts){opts=opts||{};var isNested=opts.nested||opts.isNested;
var attr;if(isNested){attr=SC.ChildrenAttribute.attr(recordType,opts)}else{attr=SC.ManyAttribute.attr(recordType,opts)
}return attr},toOne:function(recordType,opts){opts=opts||{};var isNested=opts.nested||opts.isNested;
var attr;if(isNested){attr=SC.ChildAttribute.attr(recordType,opts)}else{attr=SC.SingleAttribute.attr(recordType,opts)
}return attr},storeKeysById:function(){var key=SC.keyFor("storeKey",SC.guidFor(this)),ret=this[key];
if(!ret){ret=this[key]={}}return ret},storeKeyFor:function(id){var storeKeys=this.storeKeysById(),ret=storeKeys[id];
if(!ret){ret=SC.Store.generateStoreKey();SC.Store.idsByStoreKey[ret]=id;SC.Store.recordTypesByStoreKey[ret]=this;
storeKeys[id]=ret}return ret},storeKeyExists:function(id){var storeKeys=this.storeKeysById(),ret=storeKeys[id];
return ret},find:function(store,id){return store.find(this,id)},extend:function(){var ret=SC.Object.extend.apply(this,arguments);
SC.Query._scq_didDefineRecordType(ret);return ret}});sc_require("data_sources/data_source");
sc_require("models/record");SC.FixturesDataSource=SC.DataSource.extend({simulateRemoteResponse:NO,latency:50,cancel:function(store,storeKeys){return NO
},fetch:function(store,query){if(query.get("location")!==SC.Query.LOCAL){throw SC.$error("SC.Fixture data source can only fetch local queries")
}if(!query.get("recordType")&&!query.get("recordTypes")){throw SC.$error("SC.Fixture data source can only fetch queries with one or more record types")
}if(this.get("simulateRemoteResponse")){this.invokeLater(this._fetch,this.get("latency"),store,query)
}else{this._fetch(store,query)}},_fetch:function(store,query){var recordType=query.get("recordType"),recordTypes=query.get("recordTypes")||[recordType];
recordTypes.forEach(function(recordType){if(SC.typeOf(recordType)===SC.T_STRING){recordType=SC.objectForPropertyPath(recordType)
}if(recordType){this.loadFixturesFor(store,recordType)}},this);store.dataSourceDidFetchQuery(query)
},retrieveRecords:function(store,storeKeys){var latency=this.get("latency"),ret=this.hasFixturesFor(storeKeys);
if(!ret){return ret}if(this.get("simulateRemoteResponse")){this.invokeLater(this._retrieveRecords,latency,store,storeKeys)
}else{this._retrieveRecords(store,storeKeys)}return ret},_retrieveRecords:function(store,storeKeys){storeKeys.forEach(function(storeKey){var ret=[],recordType=SC.Store.recordTypeFor(storeKey),id=store.idFor(storeKey),hash=this.fixtureForStoreKey(store,storeKey);
ret.push(storeKey);store.dataSourceDidComplete(storeKey,hash,id)},this)},updateRecords:function(store,storeKeys,params){var latency=this.get("latency"),ret=this.hasFixturesFor(storeKeys);
if(!ret){return ret}if(this.get("simulateRemoteResponse")){this.invokeLater(this._updateRecords,latency,store,storeKeys)
}else{this._updateRecords(store,storeKeys)}return ret},_updateRecords:function(store,storeKeys){storeKeys.forEach(function(storeKey){var hash=store.readDataHash(storeKey);
this.setFixtureForStoreKey(store,storeKey,hash);store.dataSourceDidComplete(storeKey)
},this)},createRecords:function(store,storeKeys,params){var latency=this.get("latency");
if(this.get("simulateRemoteResponse")){this.invokeLater(this._createRecords,latency,store,storeKeys)
}else{this._createRecords(store,storeKeys)}return YES},_createRecords:function(store,storeKeys){storeKeys.forEach(function(storeKey){var id=store.idFor(storeKey),recordType=store.recordTypeFor(storeKey),dataHash=store.readDataHash(storeKey),fixtures=this.fixturesFor(recordType);
if(!id){id=this.generateIdFor(recordType,dataHash,store,storeKey)}this._invalidateCachesFor(recordType,storeKey,id);
fixtures[id]=dataHash;store.dataSourceDidComplete(storeKey,null,id)},this)},destroyRecords:function(store,storeKeys,params){var latency=this.get("latency"),ret=this.hasFixturesFor(storeKeys);
if(!ret){return ret}if(this.get("simulateRemoteResponse")){this.invokeLater(this._destroyRecords,latency,store,storeKeys)
}else{this._destroyRecords(store,storeKeys)}return ret},_destroyRecords:function(store,storeKeys){storeKeys.forEach(function(storeKey){var id=store.idFor(storeKey),recordType=store.recordTypeFor(storeKey),fixtures=this.fixturesFor(recordType);
this._invalidateCachesFor(recordType,storeKey,id);if(id){delete fixtures[id]}store.dataSourceDidDestroy(storeKey)
},this)},loadFixturesFor:function(store,recordType,ret){var hashes=[],dataHashes,i,storeKey;
dataHashes=this.fixturesFor(recordType);for(i in dataHashes){storeKey=recordType.storeKeyFor(i);
if(store.peekStatus(storeKey)===SC.Record.EMPTY){hashes.push(dataHashes[i])}if(ret){ret.push(storeKey)
}}if(hashes&&hashes.length>0){store.loadRecords(recordType,hashes)}return this},generateIdFor:function(recordType,dataHash,store,storeKey){return"@id%@".fmt(SC.Store.generateStoreKey())
},fixtureForStoreKey:function(store,storeKey){var id=store.idFor(storeKey),recordType=store.recordTypeFor(storeKey),fixtures=this.fixturesFor(recordType);
return fixtures?fixtures[id]:null},setFixtureForStoreKey:function(store,storeKey,dataHash){var id=store.idFor(storeKey),recordType=store.recordTypeFor(storeKey),fixtures=this.fixturesFor(recordType);
this._invalidateCachesFor(recordType,storeKey,id);fixtures[id]=dataHash;return this
},fixturesFor:function(recordType){if(!this._fixtures){this._fixtures={}}var fixtures=this._fixtures[SC.guidFor(recordType)];
if(fixtures){return fixtures}var dataHashes=recordType?recordType.FIXTURES:null,len=dataHashes?dataHashes.length:0,primaryKey=recordType?recordType.prototype.primaryKey:"guid",idx,dataHash,id;
this._fixtures[SC.guidFor(recordType)]=fixtures={};for(idx=0;idx<len;idx++){dataHash=dataHashes[idx];
id=dataHash[primaryKey];if(!id){id=this.generateIdFor(recordType,dataHash)}fixtures[id]=dataHash
}return fixtures},fixturesLoadedFor:function(recordType){if(!this._fixtures){return NO
}var ret=[],fixtures=this._fixtures[SC.guidFor(recordType)];return fixtures?YES:NO
},hasFixturesFor:function(storeKeys){var ret=NO;storeKeys.forEach(function(storeKey){if(ret!==SC.MIXED_STATE){var recordType=SC.Store.recordTypeFor(storeKey),fixtures=recordType?recordType.FIXTURES:null;
if(fixtures&&fixtures.length&&fixtures.length>0){if(ret===NO){ret=YES}}else{if(ret===YES){ret=SC.MIXED_STATE
}}}},this);return ret},_invalidateCachesFor:function(recordType,storeKey,id){var cache=this._storeKeyCache;
if(cache){delete cache[SC.guidFor(recordType)]}return this}});SC.Record.fixtures=SC.FixturesDataSource.create();
sc_require("models/record");SC.RecordAttribute=SC.Object.extend({isRecordAttribute:YES,defaultValue:null,type:String,key:null,isRequired:NO,isEditable:YES,useIsoDate:YES,aggregate:NO,typeClass:function(){var ret=this.get("type");
if(SC.typeOf(ret)===SC.T_STRING){ret=SC.objectForPropertyPath(ret)}return ret}.property("type").cacheable(),transform:function(){var klass=this.get("typeClass")||String,transforms=SC.RecordAttribute.transforms,ret;
while(klass&&!(ret=transforms[SC.guidFor(klass)])){if(klass.superclass.hasOwnProperty("create")){klass=klass.superclass
}else{klass=SC.T_FUNCTION}}return ret}.property("typeClass").cacheable(),toType:function(record,key,value){var transform=this.get("transform"),type=this.get("typeClass"),children;
if(transform&&transform.to){value=transform.to(value,this,type,record,key);if(!SC.none(value)&&(children=transform.observesChildren)){var i,len=children.length,context={record:record,key:key};
for(i=0;i<len;i++){value.addObserver(children[i],this,this._SCRA_childObserver,context)
}}}return value},_SCRA_childObserver:function(obj,key,deprecated,context,rev){this.call(context.record,context.key,obj);
context.record.notifyPropertyChange(context.key)},fromType:function(record,key,value){var transform=this.get("transform"),type=this.get("typeClass");
if(transform&&transform.from){value=transform.from(value,this,type,record,key)}return value
},call:function(record,key,value){var attrKey=this.get("key")||key,nvalue;if((value!==undefined)&&this.get("isEditable")){nvalue=this.fromType(record,key,value);
record.writeAttribute(attrKey,nvalue)}nvalue=value=record.readAttribute(attrKey);
if(SC.none(value)&&(value=this.get("defaultValue"))){if(typeof value===SC.T_FUNCTION){value=this.defaultValue(record,key,this);
if((nvalue!==value)&&record.get("store").readDataHash(record.get("storeKey"))){record.writeAttribute(attrKey,value,true)
}}}else{value=this.toType(record,key,value)}return value},isProperty:YES,isCacheable:YES,dependentKeys:[],init:function(){arguments.callee.base.apply(this,arguments);
this.cacheKey="__cache__"+SC.guidFor(this);this.lastSetValueKey="__lastValue__"+SC.guidFor(this)
}});SC.RecordAttribute.attr=function(attributeType,opts){if(!opts){opts={}}if(!opts.type){opts.type=attributeType||String
}return this.create(opts)};SC.RecordAttribute.transforms={};SC.RecordAttribute.registerTransform=function(klass,transform){SC.RecordAttribute.transforms[SC.guidFor(klass)]=transform
};SC.RecordAttribute.registerTransform(Boolean,{to:function(obj){return SC.none(obj)?null:!!obj
}});SC.RecordAttribute.registerTransform(Number,{to:function(obj){return SC.none(obj)?null:Number(obj)
}});SC.RecordAttribute.registerTransform(String,{to:function(obj){if(!(typeof obj===SC.T_STRING)&&!SC.none(obj)&&obj.toString){obj=obj.toString()
}return obj}});SC.RecordAttribute.registerTransform(Array,{to:function(obj){if(!SC.isArray(obj)&&!SC.none(obj)){obj=[]
}return obj},observesChildren:["[]"]});SC.RecordAttribute.registerTransform(Object,{to:function(obj){if(!(typeof obj==="object")&&!SC.none(obj)){obj={}
}return obj}});SC.RecordAttribute.registerTransform(SC.Record,{to:function(id,attr,recordType,parentRecord){var store=parentRecord.get("store");
if(SC.none(id)||(id==="")){return null}else{return store.find(recordType,id)}},from:function(record){return record?record.get("id"):null
}});SC.RecordAttribute.registerTransform(SC.T_FUNCTION,{to:function(id,attr,recordType,parentRecord){recordType=recordType.apply(parentRecord);
var store=parentRecord.get("store");return store.find(recordType,id)},from:function(record){return record.get("id")
}});SC.RecordAttribute.registerTransform(Date,{to:function(str,attr){if(SC.none(str)){return str
}var ret;str=str.toString()||"";if(attr.get("useIsoDate")){var regexp="([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?",d=str.match(new RegExp(regexp)),offset=0,date=new Date(d[1],0,1),time;
if(d[3]){date.setMonth(d[3]-1)}if(d[5]){date.setDate(d[5])}if(d[7]){date.setHours(d[7])
}if(d[8]){date.setMinutes(d[8])}if(d[10]){date.setSeconds(d[10])}if(d[12]){date.setMilliseconds(Number("0."+d[12])*1000)
}if(d[14]){offset=(Number(d[16])*60)+Number(d[17]);offset*=((d[15]==="-")?1:-1)}offset-=date.getTimezoneOffset();
time=(Number(date)+(offset*60*1000));ret=new Date();ret.setTime(Number(time))}else{ret=new Date(Date.parse(str))
}return ret},_dates:{},_zeropad:function(num){return((num<0)?"-":"")+((num<10)?"0":"")+Math.abs(num)
},from:function(date){if(SC.none(date)){return null}var ret=this._dates[date.getTime()];
if(ret){return ret}var zp=this._zeropad,tz=0-date.getTimezoneOffset()/60;tz=(tz===0)?"Z":"%@:00".fmt(zp(tz));
this._dates[date.getTime()]=ret="%@-%@-%@T%@:%@:%@%@".fmt(zp(date.getFullYear()),zp(date.getMonth()+1),zp(date.getDate()),zp(date.getHours()),zp(date.getMinutes()),zp(date.getSeconds()),tz);
return ret}});if(SC.DateTime&&!SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]){SC.RecordAttribute.registerTransform(SC.DateTime,{to:function(str,attr){if(SC.none(str)||SC.instanceOf(str,SC.DateTime)){return str
}var format=attr.get("format");return SC.DateTime.parse(str,format?format:SC.DateTime.recordFormat)
},from:function(dt,attr){if(SC.none(dt)){return dt}var format=attr.get("format");
return dt.toFormattedString(format?format:SC.DateTime.recordFormat)}})}SC.RecordAttribute.registerTransform(SC.Set,{to:function(value,attr,type,record,key){return SC.Set.create(value)
},from:function(value,attr,type,record,key){return value.toArray()},observesChildren:["[]"]});
sc_require("models/record");sc_require("models/record_attribute");SC.ChildAttribute=SC.RecordAttribute.extend({isNestedRecordTransform:YES,toType:function(record,key,value){var ret=null,rel,recordType=this.get("typeClass");
if(!record){throw"SC.Child: Error during transform: Unable to retrieve parent record."
}if(!SC.none(value)){ret=record.registerNestedRecord(value,key)}return ret},fromType:function(record,key,value){var sk,store,ret;
if(record){ret=record.registerNestedRecord(value,key,key);if(ret){sk=ret.get("storeKey");
store=ret.get("store");record.writeAttribute(key,store.readDataHash(sk))}else{if(value){record.writeAttribute(key,value)
}}}return ret},call:function(record,key,value){var attrKey=this.get("key")||key,cRef,cacheKey=SC.keyFor("__kid__",SC.guidFor(this));
if(value!==undefined){value=this.fromType(record,key,value)}else{value=record.readAttribute(attrKey);
if(SC.none(value)&&(value=this.get("defaultValue"))){if(typeof value===SC.T_FUNCTION){value=this.defaultValue(record,key,this);
if(record.attributes()){record.writeAttribute(attrKey,value,true)}}}else{value=this.toType(record,key,value)
}}return value}});SC.ChildArray=SC.Object.extend(SC.Enumerable,SC.Array,{defaultRecordType:null,record:null,propertyName:null,children:null,store:function(){return this.getPath("record.store")
}.property("record").cacheable(),storeKey:function(){return this.getPath("record.storeKey")
}.property("record").cacheable(),readOnlyChildren:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableChildren:function(){var store=this.get("store"),storeKey=this.get("storeKey"),pname=this.get("propertyName"),ret,hash;
ret=store.readEditableProperty(storeKey,pname);if(!ret){hash=store.readEditableDataHash(storeKey);
ret=hash[pname]=[]}if(ret!==this._prevChildren){this.recordPropertyDidChange()}return ret
}.property(),length:function(){var children=this.get("readOnlyChildren");return children?children.length:0
}.property("readOnlyChildren"),objectAt:function(idx){var recs=this._records,children=this.get("readOnlyChildren"),hash,ret,pname=this.get("propertyName"),parent=this.get("record");
var len=children?children.length:0;if(!children){return undefined}if(recs&&(ret=recs[idx])){return ret
}if(!recs){this._records=recs=[]}if(idx>=len){return undefined}hash=children.objectAt(idx);
if(!hash){return undefined}recs[idx]=ret=parent.registerNestedRecord(hash,pname,pname+"."+idx);
return ret},replace:function(idx,amt,recs){var children=this.get("editableChildren"),len=recs?(recs.get?recs.get("length"):recs.length):0,record=this.get("record"),newRecs,pname=this.get("propertyName"),cr,recordType;
newRecs=this._processRecordsToHashes(recs);children.replace(idx,amt,newRecs);record.recordDidChange(pname);
return this},_processRecordsToHashes:function(recs){var store,sk;recs=recs||[];recs.forEach(function(me,idx){if(me.isNestedRecord){store=me.get("store");
sk=me.storeKey;recs[idx]=store.readDataHash(sk)}});return recs},normalize:function(){this.forEach(function(child,id){if(child.normalize){child.normalize()
}})},recordPropertyDidChange:function(keys){if(keys&&!keys.contains(this.get("propertyName"))){return this
}var children=this.get("readOnlyChildren");var prev=this._prevChildren,f=this._childrenContentDidChange;
if(children===prev){return this}if(prev){prev.removeObserver("[]",this,f)}this._prevChildren=children;
if(children){children.addObserver("[]",this,f)}var rev=(children)?children.propertyRevision:-1;
this._childrenContentDidChange(children,"[]",children,rev);return this},_childrenContentDidChange:function(target,key,value,rev){this._records=null;
this.enumerableContentDidChange()},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});sc_require("models/record");sc_require("models/record_attribute");
sc_require("models/child_attribute");sc_require("system/child_array");SC.ChildrenAttribute=SC.ChildAttribute.extend({toType:function(record,key,value){var attrKey=this.get("key")||key,arrayKey=SC.keyFor("__kidsArray__",SC.guidFor(this)),ret=record[arrayKey],recordType=this.get("typeClass"),rel;
if(!ret){ret=SC.ChildArray.create({record:record,propertyName:attrKey,defaultRecordType:recordType});
record[arrayKey]=ret;rel=record.get("relationships");if(!rel){record.set("relationships",rel=[])
}rel.push(ret)}return ret},fromType:function(record,key,value){var sk,store,arrayKey=SC.keyFor("__kidsArray__",SC.guidFor(this)),ret=record[arrayKey];
if(record){record.writeAttribute(key,value);if(ret){ret=ret.recordPropertyDidChange()
}}return ret}});sc_require("models/record");sc_require("models/record_attribute");
SC.FetchedAttribute=SC.RecordAttribute.extend({paramValueKey:"link",paramOwnerKey:"owner",paramRelKey:"rel",queryKey:null,isEditable:NO,toType:function(record,key,value){var store=record.get("store");
if(!store){return null}var paramValueKey=this.get("paramValueKey"),paramOwnerKey=this.get("paramOwnerKey"),paramRelKey=this.get("paramRelKey"),queryKey=this.get("queryKey")||this.get("typeClass"),params={};
if(paramValueKey){params[paramValueKey]=value}if(paramOwnerKey){params[paramOwnerKey]=record
}if(paramRelKey){params[paramRelKey]=this.get("key")||key}return store.findAll(queryKey,params)
},fromType:function(record,key,value){return value}});SC.ManyArray=SC.Object.extend(SC.Enumerable,SC.Array,{recordType:null,record:null,propertyName:null,manyAttribute:null,store:function(){return this.get("record").get("store")
}.property("record").cacheable(),storeKey:function(){return this.get("record").get("storeKey")
}.property("record").cacheable(),readOnlyStoreIds:function(){return this.get("record").readAttribute(this.get("propertyName"))
}.property(),editableStoreIds:function(){var store=this.get("store"),storeKey=this.get("storeKey"),pname=this.get("propertyName"),ret,hash;
ret=store.readEditableProperty(storeKey,pname);if(!ret){hash=store.readEditableDataHash(storeKey);
ret=hash[pname]=[]}if(ret!==this._prevStoreIds){this.recordPropertyDidChange()}return ret
}.property(),isEditable:function(){var attr=this.manyAttribute;return attr?attr.get("isEditable"):NO
}.property("manyAttribute").cacheable(),inverse:function(){var attr=this.manyAttribute;
return attr?attr.get("inverse"):null}.property("manyAttribute").cacheable(),isMaster:function(){var attr=this.manyAttribute;
return attr?attr.get("isMaster"):null}.property("manyAttribute").cacheable(),orderBy:function(){var attr=this.manyAttribute;
return attr?attr.get("orderBy"):null}.property("manyAttribute").cacheable(),length:function(){var storeIds=this.get("readOnlyStoreIds");
return storeIds?storeIds.get("length"):0}.property("readOnlyStoreIds"),objectAt:function(idx){var recs=this._records,storeIds=this.get("readOnlyStoreIds"),store=this.get("store"),recordType=this.get("recordType"),storeKey,ret,storeId;
if(!storeIds||!store){return undefined}if(recs&&(ret=recs[idx])){return ret}if(!recs){this._records=recs=[]
}storeId=storeIds.objectAt(idx);if(storeId){storeKey=store.storeKeyFor(recordType,storeId);
if(store.readStatus(storeKey)===SC.Record.EMPTY){store.retrieveRecord(recordType,null,storeKey)
}recs[idx]=ret=store.materializeRecord(storeKey)}return ret},replace:function(idx,amt,recs){if(!this.get("isEditable")){throw"%@.%@[] is not editable".fmt(this.get("record"),this.get("propertyName"))
}var storeIds=this.get("editableStoreIds"),len=recs?(recs.get?recs.get("length"):recs.length):0,record=this.get("record"),pname=this.get("propertyName"),i,keys,ids,toRemove,inverse,attr,inverseRecord;
ids=[];for(i=0;i<len;i++){ids[i]=recs.objectAt(i).get("id")}inverse=this.get("inverse");
if(inverse&&amt>0){toRemove=SC.ManyArray._toRemove;if(toRemove){SC.ManyArray._toRemove=null
}else{toRemove=[]}for(i=0;i<amt;i++){toRemove[i]=this.objectAt(idx+i)}}storeIds.replace(idx,amt,ids);
if(inverse){for(i=0;i<amt;i++){inverseRecord=toRemove[i];attr=inverseRecord?inverseRecord[inverse]:null;
if(attr&&attr.inverseDidRemoveRecord){attr.inverseDidRemoveRecord(inverseRecord,inverse,record,pname)
}}if(toRemove){toRemove.length=0;if(!SC.ManyArray._toRemove){SC.ManyArray._toRemove=toRemove
}}for(i=0;i<len;i++){inverseRecord=recs.objectAt(i);attr=inverseRecord?inverseRecord[inverse]:null;
if(attr&&attr.inverseDidAddRecord){attr.inverseDidAddRecord(inverseRecord,inverse,record,pname)
}}}if(record&&(!inverse||this.get("isMaster"))){record.recordDidChange(pname)}this.enumerableContentDidChange(idx,amt,len-amt);
return this},removeInverseRecord:function(inverseRecord){if(!inverseRecord){return this
}var id=inverseRecord.get("id"),storeIds=this.get("editableStoreIds"),idx=(storeIds&&id)?storeIds.indexOf(id):-1,record;
if(idx>=0){storeIds.removeAt(idx);if(this.get("isMaster")&&(record=this.get("record"))){record.recordDidChange(this.get("propertyName"))
}}return this},addInverseRecord:function(inverseRecord){if(!inverseRecord){return this
}var id=inverseRecord.get("id"),storeIds=this.get("editableStoreIds"),orderBy=this.get("orderBy"),len=storeIds.get("length"),idx,record;
if(orderBy){idx=this._findInsertionLocation(inverseRecord,0,len,orderBy)}else{idx=len
}storeIds.insertAt(idx,inverseRecord.get("id"));if(this.get("isMaster")&&(record=this.get("record"))){record.recordDidChange(this.get("propertyName"))
}return this},_findInsertionLocation:function(rec,min,max,orderBy){var idx=min+Math.floor((max-min)/2),cur=this.objectAt(idx),order=this._compare(rec,cur,orderBy);
if(order<0){if(idx===0){return idx}else{return this._findInsertionLocation(rec,0,idx,orderBy)
}}else{if(order>0){if(idx>=max){return idx}else{return this._findInsertionLocation(rec,idx,max,orderBy)
}}else{return idx}}},_compare:function(a,b,orderBy){var t=SC.typeOf(orderBy),ret,idx,len;
if(t===SC.T_FUNCTION){ret=orderBy(a,b)}else{if(t===SC.T_STRING){ret=SC.compare(a,b)
}else{len=orderBy.get("length");ret=0;for(idx=0;(ret===0)&&(idx<len);idx++){ret=SC.compare(a,b)
}}}return ret},recordPropertyDidChange:function(keys){if(keys&&!keys.contains(this.get("propertyName"))){return this
}var storeIds=this.get("readOnlyStoreIds");var prev=this._prevStoreIds,f=this._storeIdsContentDidChange;
if(storeIds===prev){return this}if(prev){prev.removeObserver("[]",this,f)}this._prevStoreIds=storeIds;
if(storeIds){storeIds.addObserver("[]",this,f)}var rev=(storeIds)?storeIds.propertyRevision:-1;
this._storeIdsContentDidChange(storeIds,"[]",storeIds,rev)},_storeIdsContentDidChange:function(target,key,value,rev){this._records=null;
this.enumerableContentDidChange()},unknownProperty:function(key,value){var ret;if(SC.typeOf(key)===SC.T_STRING){ret=this.reducedProperty(key,value)
}return ret===undefined?arguments.callee.base.apply(this,arguments):ret},init:function(){arguments.callee.base.apply(this,arguments);
this.recordPropertyDidChange()}});sc_require("models/record");sc_require("models/record_attribute");
sc_require("system/many_array");SC.ManyAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,orderBy:null,toType:function(record,key,value){var type=this.get("typeClass"),attrKey=this.get("key")||key,arrayKey=SC.keyFor("__manyArray__",SC.guidFor(this)),ret=record[arrayKey],rel;
if(!ret){ret=SC.ManyArray.create({recordType:type,record:record,propertyName:attrKey,manyAttribute:this});
record[arrayKey]=ret;rel=record.get("relationships");if(!rel){record.set("relationships",rel=[])
}rel.push(ret)}return ret},fromType:function(record,key,value){var ret=[];if(!SC.isArray(value)){throw"Expects toMany attribute to be an array"
}var len=value.get("length");for(var i=0;i<len;i++){ret[i]=value.objectAt(i).get("id")
}return ret},inverseDidRemoveRecord:function(record,key,inverseRecord,inverseKey){var manyArray=record.get(key);
if(manyArray){manyArray.removeInverseRecord(inverseRecord)}},inverseDidAddRecord:function(record,key,inverseRecord,inverseKey){var manyArray=record.get(key);
if(manyArray){manyArray.addInverseRecord(inverseRecord)}}});sc_require("models/record");
sc_require("models/record_attribute");SC.SingleAttribute=SC.RecordAttribute.extend({inverse:null,isMaster:YES,call:function(record,key,newRec){var attrKey=this.get("key")||key,inverseKey,isMaster,oldRec,attr,ret,nvalue;
if(newRec!==undefined&&this.get("isEditable")){if(newRec&&!SC.kindOf(newRec,SC.Record)){throw"%@ is not an instance of SC.Record".fmt(newRec)
}inverseKey=this.get("inverse");if(inverseKey){oldRec=this._scsa_call(record,key)
}nvalue=this.fromType(record,key,newRec);record.writeAttribute(attrKey,nvalue,!this.get("isMaster"));
ret=newRec;if(inverseKey&&(oldRec!==newRec)){if(oldRec&&(attr=oldRec[inverseKey])){attr.inverseDidRemoveRecord(oldRec,inverseKey,record,key)
}if(newRec&&(attr=newRec[inverseKey])){attr.inverseDidAddRecord(newRec,inverseKey,record,key)
}}}else{ret=this._scsa_call(record,key,newRec)}return ret},_scsa_call:SC.RecordAttribute.prototype.call,inverseDidRemoveRecord:function(record,key,inverseRecord,inverseKey){var myInverseKey=this.get("inverse"),curRec=this._scsa_call(record,key),isMaster=this.get("isMaster"),attr;
record.writeAttribute(key,null,!isMaster);record.notifyPropertyChange(key);if((curRec!==inverseRecord)||(inverseKey!==myInverseKey)){if(curRec&&(attr=curRec[myInverseKey])){attr.inverseDidRemoveRecord(curRec,myInverseKey,record,key)
}}},inverseDidAddRecord:function(record,key,inverseRecord,inverseKey){var myInverseKey=this.get("inverse"),curRec=this._scsa_call(record,key),isMaster=this.get("isMaster"),attr,nvalue;
nvalue=this.fromType(record,key,inverseRecord);record.writeAttribute(key,nvalue,!isMaster);
record.notifyPropertyChange(key);if((curRec!==inverseRecord)||(inverseKey!==myInverseKey)){if(curRec&&(attr=curRec[myInverseKey])){attr.inverseDidRemoveRecord(curRec,myInverseKey,record,key)
}}}});sc_require("models/record");SC.Store=SC.Object.extend({name:null,nestedStores:null,dataSource:null,isNested:NO,commitRecordsAutomatically:NO,from:function(dataSource){this.set("dataSource",dataSource);
return this},_getDataSource:function(){var ret=this.get("dataSource");if(typeof ret===SC.T_STRING){ret=SC.objectForPropertyPath(ret);
if(ret&&ret.isClass){ret=ret.create()}if(ret){this.set("dataSource",ret)}}return ret
},cascade:function(dataSource){var dataSources=SC.A(arguments);dataSource=SC.CascadeDataSource.create({dataSources:dataSources});
return this.from(dataSource)},chain:function(attrs,newStoreClass){if(!attrs){attrs={}
}attrs.parentStore=this;if(newStoreClass){if(SC.typeOf(newStoreClass)!=="class"){throw new Error("%@ is not a valid class".fmt(newStoreClass))
}if(!SC.kindOf(newStoreClass,SC.NestedStore)){throw new Error("%@ is not a type of SC.NestedStore".fmt(newStoreClass))
}}else{newStoreClass=SC.NestedStore}attrs.childRecords=this.childRecords?SC.clone(this.childRecords):{};
attrs.parentRecords=this.parentRecords?SC.clone(this.parentRecords):{};var ret=newStoreClass.create(attrs),nested=this.nestedStores;
if(!nested){nested=this.nestedStores=[]}nested.push(ret);return ret},willDestroyNestedStore:function(nestedStore){if(this.nestedStores){this.nestedStores.removeObject(nestedStore)
}return this},hasNestedStore:function(store){while(store&&(store!==this)){store=store.get("parentStore")
}return store===this},dataHashes:null,statuses:null,revisions:null,editables:null,changelog:null,recordErrors:null,queryErrors:null,childRecords:null,parentRecords:null,storeKeyEditState:function(storeKey){var editables=this.editables,locks=this.locks;
return(editables&&editables[storeKey])?SC.Store.EDITABLE:SC.Store.LOCKED},readDataHash:function(storeKey){return this.dataHashes[storeKey]
},readEditableDataHash:function(storeKey){var ret=this.dataHashes[storeKey];if(!ret){return ret
}var editables=this.editables;if(!editables){editables=this.editables=[]}if(!editables[storeKey]){editables[storeKey]=1;
ret=this.dataHashes[storeKey]=SC.clone(ret,YES)}return ret},readEditableProperty:function(storeKey,propertyName){var hash=this.readEditableDataHash(storeKey),editables=this.editables[storeKey],ret=hash[propertyName];
if(editables===1){editables=this.editables[storeKey]={}}if(!editables[propertyName]){ret=hash[propertyName];
if(ret&&ret.isCopyable){ret=hash[propertyName]=ret.copy(YES)}editables[propertyName]=YES
}return ret},writeDataHash:function(storeKey,hash,status){if(hash){this.dataHashes[storeKey]=hash
}if(status){this.statuses[storeKey]=status}var editables=this.editables;if(!editables){editables=this.editables=[]
}editables[storeKey]=1;var that=this;this._propagateToChildren(storeKey,function(storeKey){that.writeDataHash(storeKey,null,status)
});return this},removeDataHash:function(storeKey,status){this.dataHashes[storeKey]=null;
this.statuses[storeKey]=status||SC.Record.EMPTY;var editables=this.editables;if(editables){editables[storeKey]=0
}return this},readStatus:function(storeKey){this.readDataHash(storeKey);return this.statuses[storeKey]||SC.Record.EMPTY
},peekStatus:function(storeKey){return this.statuses[storeKey]||SC.Record.EMPTY},writeStatus:function(storeKey,newStatus){return this.writeDataHash(storeKey,null,newStatus)
},dataHashDidChange:function(storeKeys,rev,statusOnly,key){if(!rev){rev=SC.Store.generateStoreKey()
}var isArray,len,idx,storeKey;isArray=SC.typeOf(storeKeys)===SC.T_ARRAY;if(isArray){len=storeKeys.length
}else{len=1;storeKey=storeKeys}var that=this;for(idx=0;idx<len;idx++){if(isArray){storeKey=storeKeys[idx]
}this.revisions[storeKey]=rev;this._notifyRecordPropertyChange(storeKey,statusOnly,key);
this._propagateToChildren(storeKey,function(storeKey){that.dataHashDidChange(storeKey,null,statusOnly,key)
})}return this},_notifyRecordPropertyChange:function(storeKey,statusOnly,key){var records=this.records,nestedStores=this.get("nestedStores"),K=SC.Store,rec,editState,len,idx,store,status,keys;
len=nestedStores?nestedStores.length:0;for(idx=0;idx<len;idx++){store=nestedStores[idx];
status=store.peekStatus(storeKey);editState=store.storeKeyEditState(storeKey);if(editState===K.INHERITED){store._notifyRecordPropertyChange(storeKey,statusOnly,key)
}else{if(status&SC.Record.BUSY){if(store.get("hasChanges")){throw K.CHAIN_CONFLICT_ERROR
}store.reset()}}}var changes=this.recordPropertyChanges;if(!changes){changes=this.recordPropertyChanges={storeKeys:SC.CoreSet.create(),records:SC.CoreSet.create(),hasDataChanges:SC.CoreSet.create(),propertyForStoreKeys:{}}
}changes.storeKeys.add(storeKey);if(records&&(rec=records[storeKey])){changes.records.push(storeKey);
if(!statusOnly){changes.hasDataChanges.push(storeKey)}if(key){if(!(keys=changes.propertyForStoreKeys[storeKey])){keys=changes.propertyForStoreKeys[storeKey]=SC.CoreSet.create()
}if(keys!=="*"){keys.add(key)}}else{changes.propertyForStoreKeys[storeKey]="*"}}this.invokeOnce(this.flush);
return this},flush:function(){if(!this.recordPropertyChanges){return this}var changes=this.recordPropertyChanges,storeKeys=changes.storeKeys,hasDataChanges=changes.hasDataChanges,records=changes.records,propertyForStoreKeys=changes.propertyForStoreKeys,recordTypes=SC.CoreSet.create(),rec,recordType,statusOnly,idx,len,storeKey,keys;
storeKeys.forEach(function(storeKey){if(records.contains(storeKey)){statusOnly=hasDataChanges.contains(storeKey)?NO:YES;
rec=this.records[storeKey];keys=propertyForStoreKeys?propertyForStoreKeys[storeKey]:null;
if(keys==="*"){keys=null}records.remove(storeKey);if(rec){rec.storeDidChangeProperties(statusOnly,keys)
}}recordType=SC.Store.recordTypeFor(storeKey);recordTypes.add(recordType)},this);
if(storeKeys.get("length")>0){this._notifyRecordArrays(storeKeys,recordTypes)}storeKeys.clear();
hasDataChanges.clear();records.clear();this.recordPropertyChanges.propertyForStoreKeys={};
return this},reset:function(){this.dataHashes={};this.revisions={};this.statuses={};
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.recordErrors=null;
this.queryErrors=null;var records=this.records,storeKey;if(records){for(storeKey in records){if(!records.hasOwnProperty(storeKey)){continue
}this._notifyRecordPropertyChange(parseInt(storeKey,10),NO)}}this.set("hasChanges",NO)
},commitChangesFromNestedStore:function(nestedStore,changes,force){if(!force){this._verifyLockRevisions(changes,nestedStore.locks)
}var len=changes.length,i,storeKey,myDataHashes,myStatuses,myEditables,myRevisions,myParentRecords,myChildRecords,chDataHashes,chStatuses,chRevisions,chParentRecords,chChildRecords;
myRevisions=this.revisions;myDataHashes=this.dataHashes;myStatuses=this.statuses;
myEditables=this.editables;myParentRecords=this.parentRecords?this.parentRecords:this.parentRecords={};
myChildRecords=this.childRecords?this.childRecords:this.childRecords={};if(!myEditables){myEditables=this.editables=[]
}chDataHashes=nestedStore.dataHashes;chRevisions=nestedStore.revisions;chStatuses=nestedStore.statuses;
chParentRecords=nestedStore.parentRecords||{};chChildRecords=nestedStore.childRecords||{};
for(i=0;i<len;i++){storeKey=changes[i];myDataHashes[storeKey]=chDataHashes[storeKey];
myStatuses[storeKey]=chStatuses[storeKey];myRevisions[storeKey]=chRevisions[storeKey];
myParentRecords[storeKey]=chParentRecords[storeKey];myChildRecords[storeKey]=chChildRecords[storeKey];
myEditables[storeKey]=0;this._notifyRecordPropertyChange(storeKey,NO)}var myChangelog=this.changelog,chChangelog=nestedStore.changelog;
if(chChangelog){if(!myChangelog){myChangelog=this.changelog=SC.CoreSet.create()}myChangelog.addEach(chChangelog)
}this.changelog=myChangelog;if(!this.get("parentStore")){this.flush()}return this
},_verifyLockRevisions:function(changes,locks){var len=changes.length,revs=this.revisions,i,storeKey,lock,rev;
if(locks&&revs){for(i=0;i<len;i++){storeKey=changes[i];lock=locks[storeKey]||1;rev=revs[storeKey]||1;
if(lock<rev){throw SC.Store.CHAIN_CONFLICT_ERROR}}}return this},find:function(recordType,id){if(SC.typeOf(recordType)===SC.T_STRING){recordType=SC.objectForPropertyPath(recordType)
}if((arguments.length===1)&&!(recordType&&recordType.get&&recordType.get("isRecord"))){if(!recordType){throw new Error("SC.Store#find() must pass recordType or query")
}if(!recordType.isQuery){recordType=SC.Query.local(recordType)}return this._findQuery(recordType,YES,YES)
}else{return this._findRecord(recordType,id)}},findAll:function(recordType,conditions,params){SC.Logger.warn("SC.Store#findAll() will be removed in a future version of SproutCore.  Use SC.Store#find() instead");
if(!recordType||!recordType.isQuery){recordType=SC.Query.local(recordType,conditions,params)
}return this._findQuery(recordType,YES,YES)},_findQuery:function(query,createIfNeeded,refreshIfNew){var cache=this._scst_recordArraysByQuery,key=SC.guidFor(query),ret,ra;
if(!cache){cache=this._scst_recordArraysByQuery={}}ret=cache[key];if(!ret&&createIfNeeded){cache[key]=ret=SC.RecordArray.create({store:this,query:query});
ra=this.get("recordArrays");if(!ra){this.set("recordArrays",ra=SC.Set.create())}ra.add(ret);
if(refreshIfNew){this.refreshQuery(query)}}this.flush();return ret},_findRecord:function(recordType,id){var storeKey;
if(recordType&&recordType.get&&recordType.get("isRecord")){storeKey=recordType.get("storeKey")
}else{storeKey=id?recordType.storeKeyFor(id):null}if(storeKey&&(this.readStatus(storeKey)===SC.Record.EMPTY)){storeKey=this.retrieveRecord(recordType,id)
}return storeKey?this.materializeRecord(storeKey):null},recordArrayWillDestroy:function(recordArray){var cache=this._scst_recordArraysByQuery,set=this.get("recordArrays");
if(cache){delete cache[SC.guidFor(recordArray.get("query"))]}if(set){set.remove(recordArray)
}return this},refreshQuery:function(query){if(!query){throw new Error("refreshQuery() requires a query")
}var cache=this._scst_recordArraysByQuery,recArray=cache?cache[SC.guidFor(query)]:null,source=this._getDataSource();
if(source&&source.fetch){if(recArray){recArray.storeWillFetchQuery(query)}source.fetch.call(source,this,query)
}return this},_notifyRecordArrays:function(storeKeys,recordTypes){var recordArrays=this.get("recordArrays");
if(!recordArrays){return this}recordArrays.forEach(function(recArray){if(recArray){recArray.storeDidChangeStoreKeys(storeKeys,recordTypes)
}},this);return this},recordsFor:function(recordType){var storeKeys=[],storeKeysById=recordType.storeKeysById(),id,storeKey,ret;
for(id in storeKeysById){storeKey=storeKeysById[id];if(this.readStatus(storeKey)!==SC.RECORD_EMPTY){storeKeys.push(storeKey)
}}if(storeKeys.length>0){ret=SC.RecordArray.create({store:this,storeKeys:storeKeys})
}else{ret=storeKeys}return ret},_TMP_REC_ATTRS:{},materializeRecord:function(storeKey){var records=this.records,ret,recordType,attrs;
if(!records){records=this.records={}}ret=records[storeKey];if(ret){return ret}recordType=SC.Store.recordTypeFor(storeKey);
if(!recordType){return null}attrs=this._TMP_REC_ATTRS;attrs.storeKey=storeKey;attrs.store=this;
ret=records[storeKey]=recordType.create(attrs);return ret},createRecord:function(recordType,dataHash,id){var primaryKey,storeKey,status,K=SC.Record,changelog,defaultVal,ret;
if(!id&&(primaryKey=recordType.prototype.primaryKey)){id=dataHash[primaryKey];defaultVal=recordType.prototype[primaryKey]?recordType.prototype[primaryKey].defaultValue:null;
if(!id&&SC.typeOf(defaultVal)===SC.T_FUNCTION){id=dataHash[primaryKey]=defaultVal()
}}storeKey=id?recordType.storeKeyFor(id):SC.Store.generateStoreKey();status=this.readStatus(storeKey);
if((status&K.BUSY)||(status&K.READY)||(status===K.DESTROYED_DIRTY)){throw id?K.RECORD_EXISTS_ERROR:K.BAD_STATE_ERROR
}else{if(!id&&(status===SC.DESTROYED_CLEAN||status===SC.ERROR)){throw K.BAD_STATE_ERROR
}}this.writeDataHash(storeKey,(dataHash?dataHash:{}),K.READY_NEW);SC.Store.replaceRecordTypeFor(storeKey,recordType);
this.dataHashDidChange(storeKey);changelog=this.changelog;if(!changelog){changelog=SC.Set.create()
}changelog.add(storeKey);this.changelog=changelog;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}ret=this.materializeRecord(storeKey);if(ret){ret.propagateToAggregates()}return ret
},createRecords:function(recordTypes,dataHashes,ids){var ret=[],recordType,id,isArray,len=dataHashes.length,idx;
isArray=SC.typeOf(recordTypes)===SC.T_ARRAY;if(!isArray){recordType=recordTypes}for(idx=0;
idx<len;idx++){if(isArray){recordType=recordTypes[idx]||SC.Record}id=ids?ids[idx]:undefined;
ret.push(this.createRecord(recordType,dataHashes[idx],id))}return ret},unloadRecord:function(recordType,id,storeKey,newStatus){if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)
}var status=this.readStatus(storeKey),K=SC.Record;newStatus=newStatus||K.EMPTY;if((status===K.BUSY_DESTROYING)||(status&K.DESTROYED)){return this
}else{if(status&K.BUSY){throw K.BUSY_ERROR}else{status=newStatus}}this.removeDataHash(storeKey,status);
this.dataHashDidChange(storeKey);var that=this;this._propagateToChildren(storeKey,function(storeKey){that.unloadRecord(null,null,storeKey,newStatus)
});return this},unloadRecords:function(recordTypes,ids,storeKeys,newStatus){var len,isArray,idx,id,recordType,storeKey;
if(storeKeys===undefined){isArray=SC.typeOf(recordTypes)===SC.T_ARRAY;if(!isArray){recordType=recordTypes
}if(ids===undefined){len=isArray?recordTypes.length:1;for(idx=0;idx<len;idx++){if(isArray){recordType=recordTypes[idx]
}storeKeys=this.storeKeysFor(recordType);this.unloadRecords(undefined,undefined,storeKeys,newStatus)
}}else{len=ids.length;for(idx=0;idx<len;idx++){if(isArray){recordType=recordTypes[idx]||SC.Record
}id=ids?ids[idx]:undefined;this.unloadRecord(recordType,id,undefined,newStatus)}}}else{len=storeKeys.length;
for(idx=0;idx<len;idx++){storeKey=storeKeys?storeKeys[idx]:undefined;this.unloadRecord(undefined,undefined,storeKey,newStatus)
}}return this},destroyRecord:function(recordType,id,storeKey){if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)
}var status=this.readStatus(storeKey),changelog,K=SC.Record;if((status===K.BUSY_DESTROYING)||(status&K.DESTROYED)){return this
}else{if(status===K.EMPTY){throw K.NOT_FOUND_ERROR}else{if(status&K.BUSY){throw K.BUSY_ERROR
}else{if(status===K.READY_NEW){status=K.DESTROYED_CLEAN}else{status=K.DESTROYED_DIRTY
}}}}this.writeStatus(storeKey,status);this.dataHashDidChange(storeKey);changelog=this.changelog;
if(!changelog){changelog=this.changelog=SC.Set.create()}((status&K.DIRTY)?changelog.add(storeKey):changelog.remove(storeKey));
this.changelog=changelog;if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)
}var that=this;this._propagateToChildren(storeKey,function(storeKey){that.destroyRecord(null,null,storeKey)
});return this},destroyRecords:function(recordTypes,ids,storeKeys){var len,isArray,idx,id,recordType,storeKey;
if(storeKeys===undefined){len=ids.length;isArray=SC.typeOf(recordTypes)===SC.T_ARRAY;
if(!isArray){recordType=recordTypes}for(idx=0;idx<len;idx++){if(isArray){recordType=recordTypes[idx]||SC.Record
}id=ids?ids[idx]:undefined;this.destroyRecord(recordType,id,undefined)}}else{len=storeKeys.length;
for(idx=0;idx<len;idx++){storeKey=storeKeys?storeKeys[idx]:undefined;this.destroyRecord(undefined,undefined,storeKey)
}}return this},registerChildToParent:function(parentStoreKey,childStoreKey,path){var prs,crs,oldPk,oldChildren,pkRef;
crs=this.childRecords||{};prs=this.parentRecords||{};oldPk=crs[childStoreKey];if(oldPk){oldChildren=prs[oldPk];
delete oldChildren[childStoreKey]}pkRef=prs[parentStoreKey]||{};pkRef[childStoreKey]=path||YES;
prs[parentStoreKey]=pkRef;crs[childStoreKey]=parentStoreKey;this.writeStatus(childStoreKey,this.statuses[parentStoreKey]);
this.childRecords=crs;this.parentRecords=prs},materializeParentRecord:function(childStoreKey){var pk,crs;
if(SC.none(childStoreKey)){return null}crs=this.childRecords;pk=crs?this.childRecords[childStoreKey]:null;
if(SC.none(pk)){return null}return this.materializeRecord(pk)},parentStoreKeyExists:function(storeKey){if(SC.none(storeKey)){return
}var crs=this.childRecords||{};return crs[storeKey]},_propagateToChildren:function(storeKey,func){if(SC.none(this.parentRecords)){return
}var children=this.parentRecords[storeKey]||{};if(SC.none(func)){return}for(var key in children){if(children.hasOwnProperty(key)){func(key)
}}},recordDidChange:function(recordType,id,storeKey,key,statusOnly){if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)
}var status=this.readStatus(storeKey),changelog,K=SC.Record;if(status&K.BUSY){throw K.BUSY_ERROR
}else{if(!(status&K.READY)){throw K.NOT_FOUND_ERROR}else{if(status!=K.READY_NEW){this.writeStatus(storeKey,K.READY_DIRTY)
}}}this.dataHashDidChange(storeKey,null,statusOnly,key);changelog=this.changelog;
if(!changelog){changelog=this.changelog=SC.Set.create()}changelog.add(storeKey);this.changelog=changelog;
if(this.get("commitRecordsAutomatically")){this.invokeLast(this.commitRecords)}return this
},recordsDidChange:function(recordTypes,ids,storeKeys){var len,isArray,idx,id,recordType,storeKey;
if(storeKeys===undefined){len=ids.length;isArray=SC.typeOf(recordTypes)===SC.T_ARRAY;
if(!isArray){recordType=recordTypes}for(idx=0;idx<len;idx++){if(isArray){recordType=recordTypes[idx]||SC.Record
}id=ids?ids[idx]:undefined;storeKey=storeKeys?storeKeys[idx]:undefined;this.recordDidChange(recordType,id,storeKey)
}}else{len=storeKeys.length;for(idx=0;idx<len;idx++){storeKey=storeKeys?storeKeys[idx]:undefined;
this.recordDidChange(undefined,undefined,storeKey)}}return this},retrieveRecords:function(recordTypes,ids,storeKeys,isRefresh){var source=this._getDataSource(),isArray=SC.typeOf(recordTypes)===SC.T_ARRAY,len=(!storeKeys)?ids.length:storeKeys.length,ret=[],rev=SC.Store.generateStoreKey(),K=SC.Record,recordType,idx,storeKey,status,ok;
if(!isArray){recordType=recordTypes}for(idx=0;idx<len;idx++){if(storeKeys){storeKey=storeKeys[idx]
}else{if(isArray){recordType=recordTypes[idx]}storeKey=recordType.storeKeyFor(ids[idx])
}status=this.readStatus(storeKey);if((status==K.EMPTY)||(status==K.ERROR)||(status==K.DESTROYED_CLEAN)){this.writeStatus(storeKey,K.BUSY_LOADING);
this.dataHashDidChange(storeKey,rev,YES);ret.push(storeKey)}else{if(isRefresh){if(status&K.READY){this.writeStatus(storeKey,K.BUSY_REFRESH|(status&3));
this.dataHashDidChange(storeKey,rev,YES);ret.push(storeKey)}else{if((status==K.BUSY_DESTROYING)||(status==K.BUSY_CREATING)||(status==K.BUSY_COMMITTING)){throw K.BUSY_ERROR
}else{if(status==K.DESTROYED_DIRTY){throw K.BAD_STATE_ERROR}}}}}}ok=NO;if(source){ok=source.retrieveRecords.call(source,this,ret,ids)
}if(!ok){len=ret.length;rev=SC.Store.generateStoreKey();for(idx=0;idx<len;idx++){storeKey=ret[idx];
status=this.readStatus(storeKey);if(status===K.BUSY_LOADING){this.writeStatus(storeKey,K.ERROR);
this.dataHashDidChange(storeKey,rev,YES)}else{if(status&K.BUSY_REFRESH){this.writeStatus(storeKey,K.READY|(status&3));
this.dataHashDidChange(storeKey,rev,YES)}}}ret.length=0}return ret},_TMP_RETRIEVE_ARRAY:[],retrieveRecord:function(recordType,id,storeKey,isRefresh){var array=this._TMP_RETRIEVE_ARRAY,ret;
if(storeKey){array[0]=storeKey;storeKey=array;id=null}else{array[0]=id;id=array}ret=this.retrieveRecords(recordType,id,storeKey,isRefresh);
array.length=0;return ret[0]},refreshRecord:function(recordType,id,storeKey){return !!this.retrieveRecord(recordType,id,storeKey,YES)
},refreshRecords:function(recordTypes,ids,storeKeys){var ret=this.retrieveRecords(recordTypes,ids,storeKeys,YES);
return ret&&ret.length>0},commitRecords:function(recordTypes,ids,storeKeys,params){var source=this._getDataSource(),isArray=SC.typeOf(recordTypes)===SC.T_ARRAY,retCreate=[],retUpdate=[],retDestroy=[],rev=SC.Store.generateStoreKey(),K=SC.Record,recordType,idx,storeKey,status,key,ret,len;
if(!recordTypes&&!ids&&!storeKeys){storeKeys=this.changelog}len=storeKeys?storeKeys.get("length"):(ids?ids.get("length"):0);
for(idx=0;idx<len;idx++){if(storeKeys){storeKey=storeKeys[idx]}else{if(isArray){recordType=recordTypes[idx]||SC.Record
}else{recordType=recordTypes}storeKey=recordType.storeKeyFor(ids[idx])}status=this.readStatus(storeKey);
if((status==K.EMPTY)||(status==K.ERROR)){throw K.NOT_FOUND_ERROR}else{if(status==K.READY_NEW){this.writeStatus(storeKey,K.BUSY_CREATING);
this.dataHashDidChange(storeKey,rev,YES);retCreate.push(storeKey)}else{if(status==K.READY_DIRTY){this.writeStatus(storeKey,K.BUSY_COMMITTING);
this.dataHashDidChange(storeKey,rev,YES);retUpdate.push(storeKey)}else{if(status==K.DESTROYED_DIRTY){this.writeStatus(storeKey,K.BUSY_DESTROYING);
this.dataHashDidChange(storeKey,rev,YES);retDestroy.push(storeKey)}else{if(status==K.DESTROYED_CLEAN){this.dataHashDidChange(storeKey,rev,YES)
}}}}}}if(source&&(len>0||params)){ret=source.commitRecords.call(source,this,retCreate,retUpdate,retDestroy,params)
}if(ret&&!recordTypes&&!ids){if(storeKeys===this.changelog){this.changelog=null}else{this.changelog.removeEach(storeKeys)
}}return ret},commitRecord:function(recordType,id,storeKey,params){var array=this._TMP_RETRIEVE_ARRAY,ret;
if(id===undefined&&storeKey===undefined){return NO}if(storeKey!==undefined){array[0]=storeKey;
storeKey=array;id=null}else{array[0]=id;id=array}ret=this.commitRecords(recordType,id,storeKey,params);
array.length=0;return ret},cancelRecords:function(recordTypes,ids,storeKeys){var source=this._getDataSource(),isArray=SC.typeOf(recordTypes)===SC.T_ARRAY,K=SC.Record,ret=[],status,len,idx,id,recordType,storeKey;
len=(storeKeys===undefined)?ids.length:storeKeys.length;for(idx=0;idx<len;idx++){if(isArray){recordType=recordTypes[idx]||SC.Record
}else{recordType=recordTypes||SC.Record}id=ids?ids[idx]:undefined;if(storeKeys===undefined){storeKey=recordType.storeKeyFor(id)
}else{storeKey=storeKeys?storeKeys[idx]:undefined}if(storeKey){status=this.readStatus(storeKey);
if((status==K.EMPTY)||(status==K.ERROR)){throw K.NOT_FOUND_ERROR}ret.push(storeKey)
}}if(source){source.cancel.call(source,this,ret)}return this},cancelRecord:function(recordType,id,storeKey){var array=this._TMP_RETRIEVE_ARRAY,ret;
if(storeKey!==undefined){array[0]=storeKey;storeKey=array;id=null}else{array[0]=id;
id=array}ret=this.cancelRecords(recordType,id,storeKey);array.length=0;return this
},loadRecord:function(recordType,dataHash,id){var K=SC.Record,ret,primaryKey,storeKey;
recordType=recordType||SC.Record;primaryKey=recordType.prototype.primaryKey;id=id||dataHash[primaryKey];
ret=storeKey=recordType.storeKeyFor(id);if(this.readStatus(storeKey)&K.BUSY){this.dataSourceDidComplete(storeKey,dataHash,id)
}else{this.pushRetrieve(recordType,id,dataHash,storeKey)}return ret},loadRecords:function(recordTypes,dataHashes,ids){var isArray=SC.typeOf(recordTypes)===SC.T_ARRAY,len=dataHashes.get("length"),ret=[],K=SC.Record,recordType,id,primaryKey,idx,dataHash,storeKey;
if(!isArray){recordType=recordTypes||SC.Record;primaryKey=recordType.prototype.primaryKey
}for(idx=0;idx<len;idx++){dataHash=dataHashes.objectAt(idx);if(isArray){recordType=recordTypes.objectAt(idx)||SC.Record;
primaryKey=recordType.prototype.primaryKey}id=(ids)?ids.objectAt(idx):dataHash[primaryKey];
ret[idx]=this.loadRecord(recordType,dataHash,id)}return ret},readError:function(storeKey){var errors=this.recordErrors;
return errors?errors[storeKey]:undefined},readQueryError:function(query){var errors=this.queryErrors;
return errors?errors[SC.guidFor(query)]:undefined},dataSourceDidCancel:function(storeKey){var status=this.readStatus(storeKey),K=SC.Record;
if(!(status&K.BUSY)){throw K.BAD_STATE_ERROR}switch(status){case K.BUSY_LOADING:status=K.EMPTY;
break;case K.BUSY_CREATING:status=K.READY_NEW;break;case K.BUSY_COMMITTING:status=K.READY_DIRTY;
break;case K.BUSY_REFRESH_CLEAN:status=K.READY_CLEAN;break;case K.BUSY_REFRESH_DIRTY:status=K.READY_DIRTY;
break;case K.BUSY_DESTROYING:status=K.DESTROYED_DIRTY;break;default:throw K.BAD_STATE_ERROR
}this.writeStatus(storeKey,status);this.dataHashDidChange(storeKey,null,YES);return this
},dataSourceDidComplete:function(storeKey,dataHash,newId){var status=this.readStatus(storeKey),K=SC.Record,statusOnly;
if(!(status&K.BUSY)){throw K.BAD_STATE_ERROR}if(status===K.BUSY_DESTROYING){throw K.BAD_STATE_ERROR
}else{status=K.READY_CLEAN}this.writeStatus(storeKey,status);if(dataHash){this.writeDataHash(storeKey,dataHash,status)
}if(newId){SC.Store.replaceIdFor(storeKey,newId)}statusOnly=dataHash||newId?NO:YES;
this.dataHashDidChange(storeKey,null,statusOnly);var record=this.materializeRecord(storeKey);
if(record!=null){record.notifyPropertyChange("status")}return this},dataSourceDidDestroy:function(storeKey){var status=this.readStatus(storeKey),K=SC.Record;
if(!(status&K.BUSY)){throw K.BAD_STATE_ERROR}else{status=K.DESTROYED_CLEAN}this.removeDataHash(storeKey,status);
this.dataHashDidChange(storeKey);var record=this.materializeRecord(storeKey);if(record!=null){record.notifyPropertyChange("status")
}return this},dataSourceDidError:function(storeKey,error){var status=this.readStatus(storeKey),errors=this.recordErrors,K=SC.Record;
if(!(status&K.BUSY)){throw K.BAD_STATE_ERROR}else{status=K.ERROR}if(error&&error.isError){if(!errors){errors=this.recordErrors=[]
}errors[storeKey]=error}this.writeStatus(storeKey,status);this.dataHashDidChange(storeKey,null,YES);
var record=this.materializeRecord(storeKey);if(record!=null){record.notifyPropertyChange("status")
}return this},pushRetrieve:function(recordType,id,dataHash,storeKey){var K=SC.Record,status;
if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)}status=this.readStatus(storeKey);
if(status==K.EMPTY||status==K.ERROR||status==K.READY_CLEAN||status==K.DESTROYED_CLEAN){status=K.READY_CLEAN;
if(dataHash===undefined){this.writeStatus(storeKey,status)}else{this.writeDataHash(storeKey,dataHash,status)
}this.dataHashDidChange(storeKey);return storeKey}return NO},pushDestroy:function(recordType,id,storeKey){var K=SC.Record,status;
if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)}status=this.readStatus(storeKey);
if(status==K.EMPTY||status==K.ERROR||status==K.READY_CLEAN||status==K.DESTROYED_CLEAN){status=K.DESTROYED_CLEAN;
this.removeDataHash(storeKey,status);this.dataHashDidChange(storeKey);return storeKey
}return NO},pushError:function(recordType,id,error,storeKey){var K=SC.Record,status,errors=this.recordErrors;
if(storeKey===undefined){storeKey=recordType.storeKeyFor(id)}status=this.readStatus(storeKey);
if(status==K.EMPTY||status==K.ERROR||status==K.READY_CLEAN||status==K.DESTROYED_CLEAN){status=K.ERROR;
if(error&&error.isError){if(!errors){errors=this.recordErrors=[]}errors[storeKey]=error
}this.writeStatus(storeKey,status);this.dataHashDidChange(storeKey,null,YES);return storeKey
}return NO},loadQueryResults:function(query,storeKeys){if(query.get("location")===SC.Query.LOCAL){throw new Error("Cannot load query results for a local query")
}var recArray=this._findQuery(query,YES,NO);if(recArray){recArray.set("storeKeys",storeKeys)
}this.dataSourceDidFetchQuery(query);return this},dataSourceDidFetchQuery:function(query){return this._scstore_dataSourceDidFetchQuery(query,YES)
},_scstore_dataSourceDidFetchQuery:function(query,createIfNeeded){var recArray=this._findQuery(query,createIfNeeded,NO),nestedStores=this.get("nestedStores"),loc=nestedStores?nestedStores.get("length"):0;
if(recArray){recArray.storeDidFetchQuery(query)}while(--loc>=0){nestedStores[loc]._scstore_dataSourceDidFetchQuery(query,NO)
}return this},dataSourceDidCancelQuery:function(query){return this._scstore_dataSourceDidCancelQuery(query,YES)
},_scstore_dataSourceDidCancelQuery:function(query,createIfNeeded){var recArray=this._findQuery(query,createIfNeeded,NO),nestedStores=this.get("nestedStores"),loc=nestedStores?nestedStores.get("length"):0;
if(recArray){recArray.storeDidCancelQuery(query)}while(--loc>=0){nestedStores[loc]._scstore_dataSourceDidCancelQuery(query,NO)
}return this},dataSourceDidErrorQuery:function(query,error){var errors=this.queryErrors;
if(error&&error.isError){if(!errors){errors=this.queryErrors={}}errors[SC.guidFor(query)]=error
}return this._scstore_dataSourceDidErrorQuery(query,YES)},_scstore_dataSourceDidErrorQuery:function(query,createIfNeeded){var recArray=this._findQuery(query,createIfNeeded,NO),nestedStores=this.get("nestedStores"),loc=nestedStores?nestedStores.get("length"):0;
if(recArray){recArray.storeDidErrorQuery(query)}while(--loc>=0){nestedStores[loc]._scstore_dataSourceDidErrorQuery(query,NO)
}return this},init:function(){arguments.callee.base.apply(this,arguments);this.reset()
},toString:function(){var name=this.get("name");if(!name){return arguments.callee.base.apply(this,arguments)
}else{var ret=arguments.callee.base.apply(this,arguments);return"%@ (%@)".fmt(name,ret)
}},idFor:function(storeKey){return SC.Store.idFor(storeKey)},recordTypeFor:function(storeKey){return SC.Store.recordTypeFor(storeKey)
},storeKeyFor:function(recordType,primaryKey){return recordType.storeKeyFor(primaryKey)
},storeKeyExists:function(recordType,primaryKey){return recordType.storeKeyExists(primaryKey)
},storeKeysFor:function(recordType){var ret=[],isEnum=recordType&&recordType.isEnumerable,recType,storeKey,isMatch;
if(!this.statuses){return ret}for(storeKey in SC.Store.recordTypesByStoreKey){recType=SC.Store.recordTypesByStoreKey[storeKey];
if(isEnum){isMatch=recordType.contains(recType)}else{isMatch=recType===recordType
}if(isMatch&&this.statuses[storeKey]){ret.push(parseInt(storeKey,10))}}return ret
},storeKeys:function(){var ret=[],storeKey;if(!this.statuses){return ret}for(storeKey in this.statuses){if(this.statuses[storeKey]!=SC.Record.EMPTY){ret.push(parseInt(storeKey,10))
}}return ret},statusString:function(storeKey){var rec=this.materializeRecord(storeKey);
return rec.statusString()}});SC.Store.mixin({CHAIN_CONFLICT_ERROR:new Error("Nested Store Conflict"),NO_PARENT_STORE_ERROR:new Error("Parent Store Required"),NESTED_STORE_UNSUPPORTED_ERROR:new Error("Unsupported In Nested Store"),NESTED_STORE_RETRIEVE_DIRTY_ERROR:new Error("Cannot Retrieve Dirty Record in Nested Store"),EDITABLE:"editable",LOCKED:"locked",INHERITED:"inherited",idsByStoreKey:[],recordTypesByStoreKey:{},queriesByStoreKey:[],nextStoreKey:1,generateStoreKey:function(){return this.nextStoreKey++
},idFor:function(storeKey){return this.idsByStoreKey[storeKey]},queryFor:function(storeKey){return this.queriesByStoreKey[storeKey]
},recordTypeFor:function(storeKey){return this.recordTypesByStoreKey[storeKey]},replaceIdFor:function(storeKey,newId){var oldId=this.idsByStoreKey[storeKey],recordType,storeKeys;
if(oldId!==newId){recordType=this.recordTypeFor(storeKey);if(!recordType){throw new Error("replaceIdFor: storeKey %@ does not exist".fmt(storeKey))
}this.idsByStoreKey[storeKey]=newId;storeKeys=recordType.storeKeysById();delete storeKeys[oldId];
storeKeys[newId]=storeKey}return this},replaceRecordTypeFor:function(storeKey,recordType){this.recordTypesByStoreKey[storeKey]=recordType;
return this}});SC.Store.prototype.nextStoreIndex=1;SC.Store._getDefaultStore=function(){var store=this._store;
if(!store){this._store=store=SC.Store.create()}return store};SC.Store.updateRecords=function(dataHashes,dataSource,recordType,isLoaded){SC.Logger.warn("SC.Store.updateRecords() is deprecated.  Use loadRecords() instead");
var store=this._getDefaultStore(),len=dataHashes.length,idx,ret;if(!recordType){recordType=[];
for(idx=0;idx<len;idx++){recordType[idx]=dataHashes[idx].recordType}}ret=store.loadRecords(recordType,dataHashes);
len=ret.length;for(idx=0;idx<len;idx++){ret[idx]=store.materializeRecord(ret[idx])
}return ret};SC.Store.find=function(guid,recordType){return this._getDefaultStore().find(recordType,guid)
};SC.Store.findAll=function(filter,recordType){return this._getDefaultStore().findAll(filter,recordType)
};sc_require("system/store");SC.NestedStore=SC.Store.extend({hasChanges:NO,parentStore:null,isNested:YES,lockOnRead:YES,locks:null,chainedChanges:null,find:function(query){if(query&&query.isQuery&&query.get("location")!==SC.Query.LOCAL){throw"SC.Store#find() can only accept LOCAL queries in nested stores"
}return arguments.callee.base.apply(this,arguments)},commitChanges:function(force){if(this.get("hasChanges")){var pstore=this.get("parentStore");
pstore.commitChangesFromNestedStore(this,this.chainedChanges,force)}this.reset();
return this},discardChanges:function(){var records,locks;if((records=this.records)&&(locks=this.locks)){var pstore=this.get("parentStore"),psRevisions=pstore.revisions;
var revisions=this.revisions,storeKey,lock,rev;for(storeKey in records){if(!records.hasOwnProperty(storeKey)){continue
}if(!(lock=locks[storeKey])){continue}rev=psRevisions[storeKey];if((rev!==lock)||(revisions[storeKey]>rev)){this._notifyRecordPropertyChange(parseInt(storeKey,10))
}}}this.reset();this.flush();return this},destroy:function(){this.discardChanges();
var parentStore=this.get("parentStore");if(parentStore){parentStore.willDestroyNestedStore(this)
}arguments.callee.base.apply(this,arguments);return this},reset:function(){var nRecords,nr,sk;
var parentStore=this.get("parentStore");if(!parentStore){throw SC.Store.NO_PARENT_STORE_ERROR
}this.dataHashes=SC.beget(parentStore.dataHashes);this.revisions=SC.beget(parentStore.revisions);
this.statuses=SC.beget(parentStore.statuses);this.childRecords=parentStore.childRecords?SC.beget(parentStore.childRecords):{};
this.parentRecords=parentStore.parentRecords?SC.beget(parentStore.parentRecords):{};
this.chainedChanges=this.locks=this.editables=null;this.changelog=null;this.set("hasChanges",NO)
},refreshQuery:function(query){var parentStore=this.get("parentStore");if(parentStore){parentStore.refreshQuery(query)
}return this},readError:function(storeKey){var parentStore=this.get("parentStore");
return parentStore?parentStore.readError(storeKey):null},readQueryError:function(query){var parentStore=this.get("parentStore");
return parentStore?parentStore.readQueryError(query):null},storeKeyEditState:function(storeKey){var editables=this.editables,locks=this.locks;
return(editables&&editables[storeKey])?SC.Store.EDITABLE:(locks&&locks[storeKey])?SC.Store.LOCKED:SC.Store.INHERITED
},_lock:function(storeKey){var locks=this.locks,rev,editables,pk,pr,path,tup,obj,key;
if(locks&&locks[storeKey]){return this}if(!locks){locks=this.locks=[]}editables=this.editables;
if(editables){editables[storeKey]=0}var pstore=this.get("parentStore"),editState;
while(pstore&&(editState=pstore.storeKeyEditState(storeKey))===SC.Store.INHERITED){pstore=pstore.get("parentStore")
}if(pstore&&editState===SC.Store.EDITABLE){pk=this.childRecords[storeKey];if(pk){this._lock(pk);
pr=this.parentRecords[pk];if(pr){path=pr[storeKey];tup=path?SC.tupleForPropertyPath(path,this.dataHashes[pk]):null;
if(tup){obj=tup[0];key=tup[1]}this.dataHashes[storeKey]=obj&&key?obj[key]:null}}else{this.dataHashes[storeKey]=SC.clone(pstore.dataHashes[storeKey],YES)
}if(!editables){editables=this.editables=[]}editables[storeKey]=1}else{this.dataHashes[storeKey]=this.dataHashes[storeKey]
}this.statuses[storeKey]=this.statuses[storeKey];rev=this.revisions[storeKey]=this.revisions[storeKey];
locks[storeKey]=rev||1;return this},readDataHash:function(storeKey){if(this.get("lockOnRead")){this._lock(storeKey)
}return this.dataHashes[storeKey]},readEditableDataHash:function(storeKey){this._lock(storeKey);
return arguments.callee.base.apply(this,arguments)},writeDataHash:function(storeKey,hash,status){var locks=this.locks,didLock=NO,rev;
if(hash){this.dataHashes[storeKey]=hash}else{this._lock(storeKey);didLock=YES}if(status){this.statuses[storeKey]=status
}else{if(!didLock){this.statuses[storeKey]=(this.statuses[storeKey]||SC.Record.READY_NEW)
}}if(!didLock){rev=this.revisions[storeKey]=this.revisions[storeKey];if(!locks){locks=this.locks=[]
}if(!locks[storeKey]){locks[storeKey]=rev||1}}var editables=this.editables;if(!editables){editables=this.editables=[]
}editables[storeKey]=1;return this},removeDataHash:function(storeKey,status){var locks=this.locks;
if(!locks){locks=this.locks=[]}if(!locks[storeKey]){locks[storeKey]=this.revisions[storeKey]||1
}return arguments.callee.base.apply(this,arguments)},dataHashDidChange:function(storeKeys,rev,statusOnly,key){if(!rev){rev=SC.Store.generateStoreKey()
}var isArray,len,idx,storeKey;isArray=SC.typeOf(storeKeys)===SC.T_ARRAY;if(isArray){len=storeKeys.length
}else{len=1;storeKey=storeKeys}var changes=this.chainedChanges;if(!changes){changes=this.chainedChanges=SC.Set.create()
}for(idx=0;idx<len;idx++){if(isArray){storeKey=storeKeys[idx]}this._lock(storeKey);
this.revisions[storeKey]=rev;changes.add(storeKey);this._notifyRecordPropertyChange(storeKey,statusOnly,key)
}this.setIfChanged("hasChanges",YES);return this},commitChangesFromNestedStore:function(nestedStore,changes,force){arguments.callee.base.apply(this,arguments);
var pstore=this.get("parentStore"),psRevisions=pstore.revisions,i;var myLocks=this.locks,myChanges=this.chainedChanges,len,storeKey;
if(!myLocks){myLocks=this.locks=[]}if(!myChanges){myChanges=this.chainedChanges=SC.Set.create()
}len=changes.length;for(i=0;i<len;i++){storeKey=changes[i];if(!myLocks[storeKey]){myLocks[storeKey]=psRevisions[storeKey]||1
}myChanges.add(storeKey)}this.setIfChanged("hasChanges",myChanges.get("length")>0);
this.flush();return this},queryFor:function(recordType,conditions,params){return this.get("parentStore").queryFor(recordType,conditions,params)
},findAll:function(recordType,conditions,params,recordArray,_store){if(!_store){_store=this
}return this.get("parentStore").findAll(recordType,conditions,params,recordArray,_store)
},retrieveRecords:function(recordTypes,ids,storeKeys,isRefresh){var pstore=this.get("parentStore"),idx,storeKey,newStatus,len=(!storeKeys)?ids.length:storeKeys.length,K=SC.Record,status;
if(isRefresh){for(idx=0;idx<len;idx++){storeKey=!storeKeys?pstore.storeKeyFor(recordTypes,ids[idx]):storeKeys[idx];
status=this.peekStatus(storeKey);if(status&K.DIRTY){throw SC.Store.NESTED_STORE_RETRIEVE_DIRTY_ERROR
}else{var dataHashes=this.dataHashes,revisions=this.revisions,statuses=this.statuses,editables=this.editables,locks=this.locks;
var changed=NO;var statusOnly=NO;if(dataHashes&&dataHashes.hasOwnProperty(storeKey)){delete dataHashes[storeKey];
changed=YES}if(revisions&&revisions.hasOwnProperty(storeKey)){delete revisions[storeKey];
changed=YES}if(editables){delete editables[storeKey]}if(locks){delete locks[storeKey]
}if(statuses&&statuses.hasOwnProperty(storeKey)){delete statuses[storeKey];if(!changed){statusOnly=YES
}changed=YES}if(changed){this._notifyRecordPropertyChange(storeKey,statusOnly)}}}}return pstore.retrieveRecords(recordTypes,ids,storeKeys,isRefresh)
},commitRecords:function(recordTypes,ids,storeKeys){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},commitRecord:function(recordType,id,storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},cancelRecords:function(recordTypes,ids,storeKeys){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},cancelRecord:function(recordType,id,storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidCancel:function(storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidComplete:function(storeKey,dataHash,newId){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidDestroy:function(storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},dataSourceDidError:function(storeKey,error){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushRetrieve:function(recordType,id,dataHash,storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushDestroy:function(recordType,id,storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
},pushError:function(recordType,id,error,storeKey){throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR
}});sc_require("core");sc_require("models/record");SC.Query=SC.Object.extend(SC.Copyable,SC.Freezable,{isQuery:YES,conditions:null,orderBy:null,recordType:null,recordTypes:null,expandedRecordTypes:function(){var ret=SC.CoreSet.create(),rt,q;
if(rt=this.get("recordType")){this._scq_expandRecordType(rt,ret)}else{if(rt=this.get("recordTypes")){rt.forEach(function(t){this._scq_expandRecordType(t,ret)
},this)}else{this._scq_expandRecordType(SC.Record,ret)}}q=SC.Query._scq_queriesWithExpandedRecordTypes;
if(!q){q=SC.Query._scq_queriesWithExpandedRecordTypes=SC.CoreSet.create()}q.add(this);
return ret.freeze()}.property("recordType","recordTypes").cacheable(),_scq_expandRecordType:function(recordType,set){if(set.contains(recordType)){return
}set.add(recordType);if(SC.typeOf(recordType)===SC.T_STRING){recordType=SC.objectForPropertyPath(recordType)
}recordType.subclasses.forEach(function(t){this._scq_expandRecordType(t,set)},this)
},parameters:null,location:"local",scope:null,isRemote:function(){return this.get("location")===SC.Query.REMOTE
}.property("location").cacheable(),isLocal:function(){return this.get("location")===SC.Query.LOCAL
}.property("location").cacheable(),isEditable:NO,contains:function(record,parameters){var rtype,ret=YES;
if(rtype=this.get("recordTypes")){ret=rtype.find(function(t){return SC.kindOf(record,t)
})}else{if(rtype=this.get("recordType")){ret=SC.kindOf(record,rtype)}}if(!ret){return NO
}var scope=this.get("scope");if(scope&&!scope.contains(record)){return NO}if(!this._isReady){this.parse()
}if(!this._isReady){return NO}if(parameters===undefined){parameters=this.parameters||this
}return this._tokenTree.evaluate(record,parameters)},containsRecordTypes:function(types){var rtype=this.get("recordType");
if(rtype){return !!types.find(function(t){return SC.kindOf(t,rtype)})}else{if(rtype=this.get("recordTypes")){return !!rtype.find(function(t){return !!types.find(function(t2){return SC.kindOf(t2,t)
})})}else{return YES}}},compare:function(record1,record2){var result=0,propertyName,order,len,i;
if(record1===record2){return 0}if(!this._isReady){this.parse()}if(!this._isReady){return SC.compare(record1.get("id"),record2.get("id"))
}order=this._order;if(SC.typeOf(order)===SC.T_FUNCTION){result=order.call(null,record1,record2)
}else{len=order?order.length:0;for(i=0;result===0&&(i<len);i++){propertyName=order[i].propertyName;
if(SC.Query.comparisons[propertyName]){result=SC.Query.comparisons[propertyName](record1.get(propertyName),record2.get(propertyName))
}else{result=SC.compare(record1.get(propertyName),record2.get(propertyName))}if((result!==0)&&order[i].descending){result=(-1)*result
}}}if(result!==0){return result}else{return SC.compare(record1.get("id"),record2.get("id"))
}},_isReady:NO,parse:function(){var conditions=this.get("conditions"),lang=this.get("queryLanguage"),tokens,tree;
tokens=this._tokenList=this.tokenizeString(conditions,lang);tree=this._tokenTree=this.buildTokenTree(tokens,lang);
this._order=this.buildOrder(this.get("orderBy"));this._isReady=!!tree&&!tree.error;
if(tree&&tree.error){throw tree.error}return this._isReady},queryWithScope:function(recordArray){var key=SC.keyFor("__query__",SC.guidFor(this)),ret=recordArray[key];
if(!ret){recordArray[key]=ret=this.copy();ret.set("scope",recordArray);ret.freeze()
}return ret},copyKeys:"conditions orderBy recordType recordTypes parameters location scope".w(),concatenatedProperties:"copyKeys".w(),copy:function(){var opts={},keys=this.get("copyKeys"),loc=keys?keys.length:0,key,value,ret;
while(--loc>=0){key=keys[loc];value=this.get(key);if(value!==undefined){opts[key]=value
}}ret=this.constructor.create(opts);opts=null;return ret},queryLanguage:{UNKNOWN:{firstCharacter:/[^\s'"\w\d\(\)\{\}]/,notAllowed:/[\s'"\w\d\(\)\{\}]/},PROPERTY:{firstCharacter:/[a-zA-Z_]/,notAllowed:/[^a-zA-Z_0-9]/,evalType:"PRIMITIVE",evaluate:function(r,w){return r.get(this.tokenValue)
}},NUMBER:{firstCharacter:/[\d\-]/,notAllowed:/[^\d\-\.]/,format:/^-?\d+$|^-?\d+\.\d+$/,evalType:"PRIMITIVE",evaluate:function(r,w){return parseFloat(this.tokenValue)
}},STRING:{firstCharacter:/['"]/,delimeted:true,evalType:"PRIMITIVE",evaluate:function(r,w){return this.tokenValue
}},PARAMETER:{firstCharacter:/\{/,lastCharacter:"}",delimeted:true,evalType:"PRIMITIVE",evaluate:function(r,w){return w[this.tokenValue]
}},"%@":{rememberCount:true,reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return w[this.tokenValue]
}},OPEN_PAREN:{firstCharacter:/\(/,singleCharacter:true},CLOSE_PAREN:{firstCharacter:/\)/,singleCharacter:true},AND:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return left&&right}},OR:{reservedWord:true,leftType:"BOOLEAN",rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return left||right}},NOT:{reservedWord:true,rightType:"BOOLEAN",evalType:"BOOLEAN",evaluate:function(r,w){var right=this.rightSide.evaluate(r,w);
return !right}},"=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return SC.isEqual(left,right)}},"!=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return !SC.isEqual(left,right)}},"<":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return SC.compare(left,right)==-1}},"<=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return SC.compare(left,right)!=1}},">":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return SC.compare(left,right)==1}},">=":{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var left=this.leftSide.evaluate(r,w);
var right=this.rightSide.evaluate(r,w);return SC.compare(left,right)!=-1}},BEGINS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var all=this.leftSide.evaluate(r,w);
var start=this.rightSide.evaluate(r,w);return(all&&all.indexOf(start)===0)}},ENDS_WITH:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var all=this.leftSide.evaluate(r,w);
var end=this.rightSide.evaluate(r,w);return(all&&all.indexOf(end)===(all.length-end.length))
}},CONTAINS:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var all=this.leftSide.evaluate(r,w)||[];
var value=this.rightSide.evaluate(r,w);var allType=SC.typeOf(all);if(allType===SC.T_STRING){return(all.indexOf(value)!==-1)
}else{if(allType===SC.T_ARRAY||all.toArray){if(allType!==SC.T_ARRAY){all=all.toArray()
}var found=false;var i=0;while(found===false&&i<all.length){if(value==all[i]){found=true
}i++}return found}}}},ANY:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var prop=this.leftSide.evaluate(r,w);
var values=this.rightSide.evaluate(r,w);var found=false;var i=0;while(found===false&&i<values.length){if(prop==values[i]){found=true
}i++}return found}},MATCHES:{reservedWord:true,leftType:"PRIMITIVE",rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var toMatch=this.leftSide.evaluate(r,w);
var matchWith=this.rightSide.evaluate(r,w);return matchWith.test(toMatch)}},TYPE_IS:{reservedWord:true,rightType:"PRIMITIVE",evalType:"BOOLEAN",evaluate:function(r,w){var actualType=SC.Store.recordTypeFor(r.storeKey);
var right=this.rightSide.evaluate(r,w);var expectType=SC.objectForPropertyPath(right);
return actualType==expectType}},"null":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return null
}},"undefined":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return undefined
}},"false":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return false
}},"true":{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return true
}},YES:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return true
}},NO:{reservedWord:true,evalType:"PRIMITIVE",evaluate:function(r,w){return false
}}},tokenizeString:function(inputString,grammar){var tokenList=[],c=null,t=null,token=null,tokenType=null,currentToken=null,currentTokenType=null,currentTokenValue=null,currentDelimeter=null,endOfString=false,endOfToken=false,belongsToToken=false,skipThisCharacter=false,rememberCount={};
function addToken(tokenType,tokenValue){t=grammar[tokenType];if(t.format&&!t.format.test(tokenValue)){tokenType="UNKNOWN"
}if(t.delimeted){skipThisCharacter=true}if(!t.delimeted){for(var anotherToken in grammar){if(grammar[anotherToken].reservedWord&&anotherToken==tokenValue){tokenType=anotherToken
}}}t=grammar[tokenType];if(t&&t.rememberCount){if(!rememberCount[tokenType]){rememberCount[tokenType]=0
}tokenValue=rememberCount[tokenType];rememberCount[tokenType]+=1}tokenList.push({tokenType:tokenType,tokenValue:tokenValue});
currentToken=null;currentTokenType=null;currentTokenValue=null}if(!inputString){return[]
}var iStLength=inputString.length;for(var i=0;i<iStLength;i++){endOfString=(i===iStLength-1);
c=inputString.charAt(i);skipThisCharacter=false;if(currentToken){t=grammar[currentToken];
endOfToken=t.delimeted?c===currentDelimeter:t.notAllowed.test(c);if(!endOfToken){currentTokenValue+=c
}if(endOfToken||endOfString){addToken(currentToken,currentTokenValue)}if(endOfString&&!endOfToken){skipThisCharacter=true
}}if(!currentToken&&!skipThisCharacter){for(token in grammar){t=grammar[token];if(t.firstCharacter&&t.firstCharacter.test(c)){currentToken=token
}}if(currentToken){t=grammar[currentToken];currentTokenValue=c;if(t.delimeted){currentTokenValue="";
if(t.lastCharacter){currentDelimeter=t.lastCharacter}else{currentDelimeter=c}}if(t.singleCharacter||endOfString){addToken(currentToken,currentTokenValue)
}}}}return tokenList},buildTokenTree:function(tokenList,treeLogic){var l=tokenList.slice();
var i=0;var openParenthesisStack=[];var shouldCheckAgain=false;var error=[];if(!tokenList||tokenList.length===0){return{evaluate:function(){return true
}}}function tokenLogic(position){var p=position;if(p<0){return false}var tl=treeLogic[l[p].tokenType];
if(!tl){error.push("logic for token '"+l[p].tokenType+"' is not defined");return false
}l[p].evaluate=tl.evaluate;return tl}function expectedType(side,position){var p=position;
var tl=tokenLogic(p);if(!tl){return false}if(side=="left"){return tl.leftType}if(side=="right"){return tl.rightType
}}function evalType(position){var p=position;var tl=tokenLogic(p);if(!tl){return false
}else{return tl.evalType}}function removeToken(position){l.splice(position,1);if(position<=i){i--
}}function preceedingTokenExists(position){var p=position||i;if(p>0){return true}else{return false
}}function tokenIsMissingChilds(position){var p=position;if(p<0){return true}return(expectedType("left",p)&&!l[p].leftSide)||(expectedType("right",p)&&!l[p].rightSide)
}function typesAreMatching(parent,child){var side=(child<parent)?"left":"right";if(parent<0||child<0){return false
}if(!expectedType(side,parent)){return false}if(!evalType(child)){return false}if(expectedType(side,parent)==evalType(child)){return true
}else{return false}}function preceedingTokenCanBeMadeChild(position){var p=position;
if(!tokenIsMissingChilds(p)){return false}if(!preceedingTokenExists(p)){return false
}if(typesAreMatching(p,p-1)){return true}else{return false}}function preceedingTokenCanBeMadeParent(position){var p=position;
if(tokenIsMissingChilds(p)){return false}if(!preceedingTokenExists(p)){return false
}if(!tokenIsMissingChilds(p-1)){return false}if(typesAreMatching(p-1,p)){return true
}else{return false}}function makeChild(position){var p=position;if(p<1){return false
}l[p].leftSide=l[p-1];removeToken(p-1)}function makeParent(position){var p=position;
if(p<1){return false}l[p-1].rightSide=l[p];removeToken(p)}function removeParenthesesPair(position){removeToken(position);
removeToken(openParenthesisStack.pop())}for(i=0;i<l.length;i++){shouldCheckAgain=false;
if(l[i].tokenType=="UNKNOWN"){error.push("found unknown token: "+l[i].tokenValue)
}if(l[i].tokenType=="OPEN_PAREN"){openParenthesisStack.push(i)}if(l[i].tokenType=="CLOSE_PAREN"){removeParenthesesPair(i)
}if(preceedingTokenCanBeMadeChild(i)){makeChild(i)}if(preceedingTokenCanBeMadeParent(i)){makeParent(i);
shouldCheckAgain=true}if(shouldCheckAgain){i--}}if(l.length==1){l=l[0]}else{error.push("string did not resolve to a single tree")
}if(error.length>0){return{error:error.join(",\n"),tree:l}}else{return l}},buildOrder:function(orderOp){if(!orderOp){return[]
}else{if(SC.typeOf(orderOp)===SC.T_FUNCTION){return orderOp}else{var o=orderOp.split(",");
for(var i=0;i<o.length;i++){var p=o[i];p=p.replace(/^\s+|\s+$/,"");p=p.replace(/\s+/,",");
p=p.split(",");o[i]={propertyName:p[0]};if(p[1]&&p[1]=="DESC"){o[i].descending=true
}}return o}}}});SC.Query.mixin({LOCAL:"local",REMOTE:"remote",storeKeyFor:function(query){return query?query.get("storeKey"):null
},containsRecords:function(query,records,store){var ret=[];for(var idx=0,len=records.get("length");
idx<len;idx++){var record=records.objectAt(idx);if(record&&query.contains(record)){ret.push(record.get("storeKey"))
}}ret=SC.Query.orderStoreKeys(ret,query,store);return ret},orderStoreKeys:function(storeKeys,query,store){if(storeKeys){var K=SC.Query,tempStores=K._TMP_STORES,tempQueries=K._TMP_QUERIES;
if(!tempStores){tempStores=K._TMP_STORES=[]}if(!tempQueries){tempQueries=K._TMP_QUERIES=[]
}tempStores.push(store);tempQueries.push(query);var res=storeKeys.sort(SC.Query.compareStoreKeys);
K._TMP_STORES.pop();K._TMP_QUERIES.pop()}return storeKeys},compareStoreKeys:function(storeKey1,storeKey2){var K=SC.Query,tempStores=K._TMP_STORES,tempQueries=K._TMP_QUERIES,store=tempStores[tempStores.length-1],query=tempQueries[tempQueries.length-1],compareFunc=query.compare,record1=store.materializeRecord(storeKey1),record2=store.materializeRecord(storeKey2);
if(compareFunc!==K.prototype.compare){return compareFunc.call(query,record1,record2)
}else{var result=0,propertyName,order,len,i;if(record1===record2){return 0}if(!query._isReady){query.parse()
}if(!query._isReady){return SC.compare(record1.get("id"),record2.get("id"))}order=query._order;
if(SC.typeOf(order)===SC.T_FUNCTION){result=order.call(null,record1,record2)}else{len=order?order.length:0;
for(i=0;result===0&&(i<len);i++){propertyName=order[i].propertyName;if(SC.Query.comparisons[propertyName]){result=SC.Query.comparisons[propertyName](record1.get(propertyName),record2.get(propertyName))
}else{result=SC.compare(record1.get(propertyName),record2.get(propertyName))}if((result!==0)&&order[i].descending){result=(-1)*result
}}}if(result!==0){return result}else{return SC.compare(record1.get("id"),record2.get("id"))
}}},build:function(location,recordType,conditions,params){var opts=null,ret,cache,key,tmp;
if(recordType&&recordType.isQuery){if(recordType.get("location")===location){return recordType
}else{return recordType.copy().set("location",location).freeze()}}if(typeof recordType===SC.T_STRING){ret=SC.objectForPropertyPath(recordType);
if(!ret){throw"%@ did not resolve to a class".fmt(recordType)}recordType=ret}else{if(recordType&&recordType.isEnumerable){ret=[];
recordType.forEach(function(t){if(typeof t===SC.T_STRING){t=SC.objectForPropertyPath(t)
}if(!t){throw"cannot resolve record types: %@".fmt(recordType)}ret.push(t)},this);
recordType=ret}else{if(!recordType){recordType=SC.Record}}}if(params===undefined){params=null
}if(conditions===undefined){conditions=null}if(!params&&(typeof conditions!==SC.T_STRING)){opts=conditions;
conditions=null}if(!params&&!opts){tmp=SC.Query._scq_recordTypeCache;if(!tmp){tmp=SC.Query._scq_recordTypeCache={}
}cache=tmp[location];if(!cache){cache=tmp[location]={}}if(recordType.isEnumerable){key=recordType.map(function(k){return SC.guidFor(k)
});key=key.sort().join(":")}else{key=SC.guidFor(recordType)}if(conditions){key=[key,conditions].join("::")
}ret=cache[key];if(!ret){if(recordType.isEnumerable){opts={recordTypes:recordType.copy()}
}else{opts={recordType:recordType}}opts.location=location;opts.conditions=conditions;
ret=cache[key]=SC.Query.create(opts).freeze()}}else{if(!opts){opts={}}if(!opts.location){opts.location=location
}if(recordType&&recordType.isEnumerable){opts.recordsTypes=recordType}else{opts.recordType=recordType
}if(conditions){opts.conditions=conditions}if(params){opts.parameters=params}ret=SC.Query.create(opts).freeze()
}return ret},local:function(recordType,conditions,params){return this.build(SC.Query.LOCAL,recordType,conditions,params)
},remote:function(recordType,conditions,params){return this.build(SC.Query.REMOTE,recordType,conditions,params)
},_scq_didDefineRecordType:function(){var q=SC.Query._scq_queriesWithExpandedRecordTypes;
if(q){q.forEach(function(query){query.notifyPropertyChange("expandedRecordTypes")
},this);q.clear()}}});SC.Query.comparisons={};SC.Query.registerComparison=function(propertyName,comparison){SC.Query.comparisons[propertyName]=comparison
};SC.Query.registerQueryExtension=function(tokenName,token){SC.Query.prototype.queryLanguage[tokenName]=token
};SC.Q=SC.Query.from;sc_require("models/record");SC.RecordArray=SC.Object.extend(SC.Enumerable,SC.Array,{store:null,query:null,storeKeys:null,status:SC.Record.EMPTY,isEditable:function(){var query=this.get("query");
return query?query.get("isEditable"):NO}.property("query").cacheable(),length:function(){this.flush();
var storeKeys=this.get("storeKeys");return storeKeys?storeKeys.get("length"):0}.property("storeKeys").cacheable(),_scra_records:null,objectAt:function(idx){this.flush();
var recs=this._scra_records,storeKeys=this.get("storeKeys"),store=this.get("store"),storeKey,ret;
if(!storeKeys||!store){return undefined}if(recs&&(ret=recs[idx])){return ret}if(!recs){this._scra_records=recs=[]
}storeKey=storeKeys.objectAt(idx);if(storeKey){if(store.peekStatus(storeKey)===SC.Record.EMPTY){store.retrieveRecord(null,null,storeKey)
}recs[idx]=ret=store.materializeRecord(storeKey)}return ret},forEach:function(callback,target){this.flush();
var recs=this._scra_records,storeKeys=this.get("storeKeys"),store=this.get("store"),len=storeKeys?storeKeys.get("length"):0,idx,storeKey,rec;
if(!storeKeys||!store){return this}if(!recs){recs=this._scra_records=[]}if(!target){target=this
}for(idx=0;idx<len;idx++){rec=recs[idx];if(!rec){rec=recs[idx]=store.materializeRecord(storeKeys.objectAt(idx))
}callback.call(target,rec,idx,this)}return this},replace:function(idx,amt,recs){this.flush();
var storeKeys=this.get("storeKeys"),len=recs?(recs.get?recs.get("length"):recs.length):0,i,keys;
if(!storeKeys){throw"storeKeys required"}var query=this.get("query");if(query&&!query.get("isEditable")){throw SC.RecordArray.NOT_EDITABLE
}keys=[];for(i=0;i<len;i++){keys[i]=recs.objectAt(i).get("storeKey")}storeKeys.replace(idx,amt,keys);
return this},contains:function(record){return this.indexOf(record)>=0},indexOf:function(record,startAt){if(!SC.kindOf(record,SC.Record)){SC.Logger.warn("Using indexOf on %@ with an object that is not an SC.Record".fmt(record));
return -1}this.flush();var storeKey=record.get("storeKey"),storeKeys=this.get("storeKeys");
return storeKeys?storeKeys.indexOf(storeKey,startAt):-1},lastIndexOf:function(record,startAt){if(!SC.kindOf(record,SC.Record)){SC.Logger.warn("Using lastIndexOf on %@ with an object that is not an SC.Record".fmt(record));
return -1}this.flush();var storeKey=record.get("storeKey"),storeKeys=this.get("storeKeys");
return storeKeys?storeKeys.lastIndexOf(storeKey,startAt):-1},add:function(record){if(!SC.kindOf(record,SC.Record)){return this
}if(this.indexOf(record)<0){this.pushObject(record)}return this},remove:function(record){if(!SC.kindOf(record,SC.Record)){return this
}this.removeObject(record);return this},find:function(query,target){if(query&&query.isQuery){return this.get("store").find(query.queryWithScope(this))
}else{return arguments.callee.base.apply(this,arguments)}},refresh:function(){this.get("store").refreshQuery(this.get("query"));
return this},reload:function(){this.flush(YES);return this},destroy:function(){if(!this.get("isDestroyed")){this.get("store").recordArrayWillDestroy(this)
}arguments.callee.base.apply(this,arguments)},storeWillFetchQuery:function(query){var status=this.get("status"),K=SC.Record;
if((status===K.EMPTY)||(status===K.ERROR)){status=K.BUSY_LOADING}if(status&K.READY){status=K.BUSY_REFRESH
}this.setIfChanged("status",status);return this},storeDidFetchQuery:function(query){this.setIfChanged("status",SC.Record.READY_CLEAN);
return this},storeDidCancelQuery:function(query){var status=this.get("status"),K=SC.Record;
if(status===K.BUSY_LOADING){status=K.EMPTY}else{if(status===K.BUSY_REFRESH){status=K.READY_CLEAN
}}this.setIfChanged("status",status);return this},storeDidErrorQuery:function(query){this.setIfChanged("status",SC.Record.ERROR);
return this},storeDidChangeStoreKeys:function(storeKeys,recordTypes){var query=this.get("query");
if(query.get("location")!==SC.Query.LOCAL){return this}if(!query.containsRecordTypes(recordTypes)){return this
}var changed=this._scq_changedStoreKeys;if(!changed){changed=this._scq_changedStoreKeys=SC.IndexSet.create()
}changed.addEach(storeKeys);this.set("needsFlush",YES);this.enumerableContentDidChange();
return this},flush:function(_flush){if(this._insideFlush){this.set("needsFlush",YES);
return this}if(!this.get("needsFlush")&&!_flush){return this}this.set("needsFlush",NO);
var query=this.get("query"),store=this.get("store");if(!store||!query||query.get("location")!==SC.Query.LOCAL){return this
}this._insideFlush=YES;var storeKeys=this.get("storeKeys"),changed=this._scq_changedStoreKeys,didChange=NO,K=SC.Record,storeKeysToPace=[],startDate=new Date(),rec,status,recordType,sourceKeys,scope,included;
var oldStoreKeys=storeKeys;if(storeKeys&&!_flush){if(changed){changed.forEach(function(storeKey){if(storeKeysToPace.length>0||new Date()-startDate>SC.RecordArray.QUERY_MATCHING_THRESHOLD){storeKeysToPace.push(storeKey);
return}status=store.peekStatus(storeKey);if(!(status&K.EMPTY)&&!((status&K.DESTROYED)||(status===K.BUSY_DESTROYING))){rec=store.materializeRecord(storeKey);
included=!!(rec&&query.contains(rec))}else{included=NO}if(included){if(storeKeys.indexOf(storeKey)<0){if(!didChange){storeKeys=storeKeys.copy()
}storeKeys.pushObject(storeKey)}}else{if(storeKeys.indexOf(storeKey)>=0){if(!didChange){storeKeys=storeKeys.copy()
}storeKeys.removeObject(storeKey)}}},this);didChange=YES}}else{if(scope=query.get("scope")){sourceKeys=scope.flush().get("storeKeys")
}else{if(recordType=query.get("expandedRecordTypes")){sourceKeys=SC.IndexSet.create();
recordType.forEach(function(cur){sourceKeys.addEach(store.storeKeysFor(recordType))
})}}storeKeys=[];sourceKeys.forEach(function(storeKey){if(storeKeysToPace.length>0||new Date()-startDate>SC.RecordArray.QUERY_MATCHING_THRESHOLD){storeKeysToPace.push(storeKey);
return}status=store.peekStatus(storeKey);if(!(status&K.EMPTY)&&!((status&K.DESTROYED)||(status===K.BUSY_DESTROYING))){rec=store.materializeRecord(storeKey);
if(rec&&query.contains(rec)){storeKeys.push(storeKey)}}});didChange=YES}if(storeKeysToPace.length>0){var self=this;
window.setTimeout(function(){SC.run(function(){if(!self||self.get("isDestroyed")){return
}self.set("needsFlush",YES);self._scq_changedStoreKeys=SC.IndexSet.create().addEach(storeKeysToPace);
self.flush()})},1)}if(changed){changed.clear()}if(didChange){if(storeKeys&&(storeKeys===oldStoreKeys)){storeKeys=storeKeys.copy()
}storeKeys=SC.Query.orderStoreKeys(storeKeys,query,store);if(SC.compare(oldStoreKeys,storeKeys)!==0){this.set("storeKeys",SC.clone(storeKeys))
}}this._insideFlush=NO;return this},needsFlush:YES,isError:function(){return this.get("status")&SC.Record.ERROR
}.property("status").cacheable(),errorValue:function(){return this.get("isError")?SC.val(this.get("errorObject")):null
}.property("isError").cacheable(),errorObject:function(){if(this.get("isError")){var store=this.get("store");
return store.readQueryError(this.get("query"))||SC.Record.GENERIC_ERROR}else{return null
}}.property("isError").cacheable(),_storeKeysDidChange:function(){var storeKeys=this.get("storeKeys");
var prev=this._prevStoreKeys,f=this._storeKeysContentDidChange,fs=this._storeKeysStateDidChange;
if(storeKeys===prev){return}if(prev){prev.removeObserver("[]",this,f)}this._prevStoreKeys=storeKeys;
if(storeKeys){storeKeys.addObserver("[]",this,f)}var rev=(storeKeys)?storeKeys.propertyRevision:-1;
this._storeKeysContentDidChange(storeKeys,"[]",storeKeys,rev)}.observes("storeKeys"),_storeKeysContentDidChange:function(target,key,value,rev){if(this._scra_records){this._scra_records.length=0
}this.beginPropertyChanges().notifyPropertyChange("length").enumerableContentDidChange().endPropertyChanges()
},init:function(){arguments.callee.base.apply(this,arguments);this._storeKeysDidChange()
}});SC.RecordArray.mixin({NOT_EDITABLE:SC.Error.desc("SC.RecordArray is not editable"),QUERY_MATCHING_THRESHOLD:100});