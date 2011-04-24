// ==========================================================================
// Project:   Cloudflix
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Cloudflix */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Cloudflix.main = function main() {

  //Render mainView
  //Cloudflix.getPath('mainPage.mainPane').append();
var popResults = Cloudflix.store.find(popResultsQuery);
var results = Cloudflix.storeB.find(resultsQuery);

	Cloudflix.statechart.initStatechart();


};

function main() {
  Cloudflix.main();
}
	
