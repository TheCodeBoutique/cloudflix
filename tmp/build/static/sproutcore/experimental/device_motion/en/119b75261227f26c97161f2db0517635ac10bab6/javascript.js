SC.mixin(SC.platform,{supportsGyroscope:("ondeviceorientation" in window),hasGyroscope:NO,supportsAccelerometer:("ondevicemotion" in window),hasAccelerometer:NO,accelerationMinimum:function(){return -10
}(),accelerationMaximum:function(){return 10}()});sc_require("platform");SC.mixin(SC.device,{listenForDeviceMotion:NO,rotationX:0,rotationY:0,rotationZ:0,setupMotion:function(){SC.RootResponder.responder.listenFor("devicemotion deviceorientation".w(),window,this)
},_scd_listenForDeviceMotionDidChange:function(){if(!SC.RootResponder.responder){return
}if(this.get("listenForDeviceMotion")){if(SC.platform.hasGyroscope){SC.Event.add(window,"deviceorientation",this,this._scd_deviceorientationPoll)
}else{if(SC.platform.hasAccelerometer){SC.Event.add(window,"devicemotion",this,this._scd_devicemotionPoll)
}else{SC.Logger.warn("Can't listen for device motion events on a platform that does not support them")
}}}else{SC.Event.remove(window,"deviceorientation",this,this._scd_deviceorientationPoll);
SC.Event.remove(window,"devicemotion",this,this._scd_devicemotionPoll)}},deviceorientation:function(evt){evt=evt.originalEvent;
if(!SC.platform.hasGyroscope){SC.platform.hasGyroscope=YES}SC.Event.remove(window,"deviceorientation",this,this.deviceorientation);
SC.Event.remove(window,"devicemotion",this,this.devicemotion);this.addObserver("listenForDeviceMotion",this,this._scd_listenForDeviceMotionDidChange);
this.notifyPropertyChange("listenForDeviceMotion")},_scd_deviceorientationPoll:function(evt){var orientation=this.get("orientation");
evt=evt.originalEvent;SC.run(function(){this.beginPropertyChanges();this.set("rotationX",orientation!=="landscape"?evt.beta:evt.gamma);
this.set("rotationY",orientation!=="landscape"?evt.gamma:-evt.beta);this.set("rotationZ",evt.alpha);
this.endPropertyChanges()},this)},_devicemotionCalled:NO,devicemotion:function(evt){if(!SC.platform.hasAccelerometer){SC.platform.hasAccelerometer=YES
}if(this._devicemotionCalled){SC.Event.remove(window,"deviceorientation",this,this.deviceorientation);
SC.Event.remove(window,"devicemotion",this,this.devicemotion);this.set("rotationZ",0);
this.addObserver("listenForDeviceMotion",this,this._scd_listenForDeviceMotionDidChange);
this.notifyPropertyChange("listenForDeviceMotion")}else{this._devicemotionCalled=YES
}},_scd_devicemotionPoll:function(evt){var min=SC.platform.accelerationMinimum,max=SC.platform.accelerationMaximum,spread=max-min,orientation=this.get("orientation"),aX,aY,rX,rY,swap;
evt=evt.originalEvent;aX=evt.accelerationIncludingGravity.x;aY=evt.accelerationIncludingGravity.y;
if(aX<min){aX=min}else{if(aX>max){aX=max}}if(aY<min){aY=min}else{if(aY>max){aY=max
}}if(orientation==="landscape"){swap=aX;aX=aY;aY=swap}rX=90-((aY-min)/spread)*180;
rY=-90+((aX-min)/spread)*180;SC.run(function(){this.beginPropertyChanges();this.set("rotationX",rX);
this.set("rotationY",rY);this.endPropertyChanges()},this)}});SC.ready(function(){SC.device.setupMotion()
});