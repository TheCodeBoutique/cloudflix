// ==========================================================================
// Project:   Cloudflix.JustAddedDataSource
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Cloudflix */

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
sc_require('models/just_added');
resultsQuery = SC.Query.remote(Cloudflix.JustAdded);
Cloudflix.JustAddedDataSource = SC.DataSource.extend(
/** @scope Cloudflix.JustAddedDataSource.prototype */ {

	  fetch: function(store, query) {		

	  if (query === resultsQuery) {
		  SC.Request.getUrl('/just_added').json()
		    .notify(this, 'fetchDidComplete', store, query)
				      .send();

				    return YES;
				}
				return NO;
		},

		fetchDidComplete: function(response, store, query) {
			var data;
		  if (SC.ok(response)) {
						data = response.get('body');
			     var storeKeys = store.loadRecords(Cloudflix.JustAdded, response.get('body'));

						Cloudflix.justAddedController.set('content', data);
			          store.loadQueryResults(query, storeKeys);
			  } else store.dataSourceDidErrorQuery(query, response);
			     },



	  // ..........................................................
	  // RECORD SUPPORT
	  // 

	  retrieveRecord: function(store, storeKey) {

	    return NO ; // return YES if you handled the storeKey
	  },

	  createRecord: function(store, storeKey) {

	    return NO ; // return YES if you handled the storeKey
	  },

	  updateRecord: function(store, storeKey) {

	    return NO ; // return YES if you handled the storeKey
	  },

	  destroyRecord: function(store, storeKey) {

	    return NO ; // return YES if you handled the storeKey
	  }

	}) ;
