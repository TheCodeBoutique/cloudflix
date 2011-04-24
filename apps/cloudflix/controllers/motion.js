// ==========================================================================
// Project:   Cloudflix.motionController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Cloudflix */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Cloudflix.motionController = SC.ObjectController.create(
/** @scope Cloudflix.motionController.prototype */ {

  orientation: '',
  isInPortrait: false,
	isShowingTitles: true,

  _orientationHasChanged: function() {

    var or = this.get('orientation');
    var isPort = this.get('isInPortrait');

    if (or === 'landscape') {
      Cloudflix.mainPage.mainPane.splitView.rightPanel.testButton.animate('left', 220, {
        duration: .2,
        timing: 'ease-in-out'
      });
			Cloudflix.mainPage.mainPane.splitView.rightPanel.mostPopular.animate('left',251,{duration:.5, timing:'ease-in-out'});
			Cloudflix.mainPage.mainPane.splitView.rightPanel.justAdded.animate('left',251,{duration:.5, timing:'ease-in-out'});
    } else if (or === 'portrait') {
      console.log('animation port firing..');
      isPort = true;
      Cloudflix.mainPage.mainPane.splitView.rightPanel.testButton.animate('left', 0, {
        duration: .2,
        timing: 'ease-in-out'
      });
			Cloudflix.mainPage.mainPane.splitView.rightPanel.mostPopular.animate('left',0,{duration:.5, timing:'ease-in-out'});
			Cloudflix.mainPage.mainPane.splitView.rightPanel.justAdded.animate('left',0,{duration:.5, timing:'ease-in-out'});

    } else if (isPort === true) {
      Cloudflix.mainPage.mainPane.splitView.rightPanel.testButton.animate('left', 0, {
        duration: .2,
        timing: 'ease-in-out'
      });
			Cloudflix.mainPage.mainPane.splitView.rightPanel.mostPopular.animate('left',0,{duration:.5, timing:'ease-in-out'});
			Cloudflix.mainPage.mainPane.splitView.rightPanel.justAdded.animate('left',0,{duration:.5, timing:'ease-in-out'});
    }
  }.observes('orientation')

});