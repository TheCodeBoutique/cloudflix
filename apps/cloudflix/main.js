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
var netflix = Cloudflix.storeC.find(netflixQuery);


SC.Request.manager.inflight.addObserver('[]', function(array) {
  var length=array.get('length');
  SC.debug('Number of inflight requets are %@', length);
  // Need to run with the SC Event Loop to update the visuals 
  SC.RunLoop.begin();
	Cloudflix.getPath('loadingPage.mainPane').append();
	if(length >= 0)
	{
		console.log(true);
		Cloudflix.statechart.initStatechart();
	}
	SC.RunLoop.end();
	
	
	
});

	//Cloudflix.netflixController.authenticate();


};

function main() {
  Cloudflix.main();
}
	
