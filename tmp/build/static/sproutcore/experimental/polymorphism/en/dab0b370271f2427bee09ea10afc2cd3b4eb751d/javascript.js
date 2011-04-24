SC.PolymorphicSingleAttribute=SC.SingleAttribute.extend({typeKey:null,typeMap:null,typeClass:function(){var ret=this.get("type"),l,i,type;
if(SC.isArray(ret)){l=ret.get("length");for(i=0;i<length;i++){type=ret.objectAt(i);
if(SC.typeOf(type)===SC.T_STRING){ret.replace(i,1,SC.objectForPropertyPath(type))
}}}else{SC.Logger.warn("%@ is a polymorphic relationship without an array of types".fmt(this));
if(SC.typeOf(ret)===SC.T_STRING){ret=SC.objectForPropertyPath(ret)}}return ret}.property("type").cacheable(),transform:function(klass){var transforms=SC.RecordAttribute.transforms,ret;
while(klass&&!(ret=transforms[SC.guidFor(klass)])){if(klass.superclass.hasOwnProperty("create")){klass=klass.superclass
}else{klass=SC.T_FUNCTION}}return ret},toType:function(record,key,value){var types=this.get("type"),typeKey=this.get("typeKey"),typeMap=this.get("typeMap"),type,transform,idx;
if(typeKey){type=record.get(typeKey)}else{if(SC.isArray(types)){type=types.get("firstObject")
}}if(typeMap){idx=typeMap.indexOf(type);if(idx>-1){type=types[idx]}else{SC.Logger.warn("Polymorphic map on property %@ for %@ did not exist on %@".fmt(key,type,record.constructor.toString()))
}}if(types.indexOf(type)>-1){if(SC.typeOf(type)===SC.T_STRING){type=SC.objectForPropertyPath(type)
}transform=this.transform(type);if(transform&&transform.to){value=transform.to(value,this,type,record,key)
}}else{SC.Logger.warn("%@ is not a type on %@ of %@".fmt(type.toString(),key,record.constructor.toString()))
}return value},fromType:function(record,key,value){var types=this.get("type"),type=value.constructor,typeString=type.toString(),typeKey=this.get("typeKey"),typeMap=this.get("typeMap"),transform,idx;
if(!SC.empty(typeString)){if(typeMap){idx=types.indexOf(typeString);if(idx>-1){typeString=typeMap[idx]
}else{SC.Logger.warn("Polymorphic map on property %@ for %@ did not exist on %@".fmt(key,typeString,record.constructor.toString()))
}}if(typeKey){record.set(typeKey,typeString)}}else{SC.Logger.warn("Could not determine type of %@ for polymorphic relation %@ on %@".fmt(value,key,record));
type=types.get("firstObject");if(SC.typeOf(type)===SC.T_STRING){type=SC.objectForPropertyPath(type)
}}transform=this.transform(type);if(transform&&transform.from){value=transform.from(value,this,type,record,key)
}return value}});SC.mixin(SC.Record,{toOneOf:function(recordTypes,opts){return SC.PolymorphicSingleAttribute.attr(recordTypes,opts)
}});