Cloudflix.loadingPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'Loading'.w(),

		Loading:SC.LabelView.design({
					    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
					    controlSize: SC.LARGE_CONTROL_SIZE,
					    fontWeight: SC.BOLD_WEIGHT,
		          escapeHTML: NO,
					    isTextSelectable: YES,
					    value:'TCB is Loading...'
					  	}),
		
	})
});//end of page