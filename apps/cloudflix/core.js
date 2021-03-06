// ==========================================================================
// Project:   Cloudflix
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Cloudflix */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Cloudflix = SC.Application.create(
  /** @scope Cloudflix.prototype */ {

  NAMESPACE: 'Cloudflix',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  //store: SC.Store.create().from(SC.Record.fixtures),
	store: SC.Store.create({ commitRecordsAutomatically: YES }).from('Cloudflix.MostPopularDataSource'),
	storeB: SC.Store.create({ commitRecordsAutomatically: YES }).from('Cloudflix.JustAddedDataSource'),
	storeC: SC.Store.create({ commitRecordsAutomatically: YES }).from('Cloudflix.NetflixDataSource'),
 
 device: SC.device.addObserver("orientation", this,
  function() {
    var or = SC.device.get("orientation");
    console.log(or);

    if (or === 'portrait') {
      Cloudflix.motionController.set('isInPortrait', true);
    } else {}
  })

  // TODO: Add global constants or singleton objects needed by your app here.
});
