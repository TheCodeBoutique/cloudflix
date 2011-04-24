SC.mixin(Cloudflix, {
  
  statechart: Ki.Statechart.create({

    rootState: Ki.State.design({

      initialSubstate: 'loading',

      loading: Ki.State.design({

        enterState: function() {
  				console.log('loading...');
						this.loadContent();
					 	
					 this.invokeLater(this.checkingOrientation,1200);
        },
				loadContent: function(){
					//var popResults = Cloudflix.store.find(popResultsQuery);
				},
				checkingOrientation: function(){
					console.log('checking orientation...');
					Cloudflix.getPath('mainPage.mainPane').append();
					this.detectBrowser();

				  var isPort = Cloudflix.motionController.get('isInPortrait');

				  if (isPort === true) {
				    Cloudflix.mainPage.mainPane.splitView.rightPanel.testButton.animate('left', 0, {
				      duration: .5,
				      timing: 'ease-in-out'
				    });
						
				  } else {
				    Cloudflix.mainPage.mainPane.splitView.rightPanel.testButton.animate('left', 220, {
				      duration: .5,
				      timing: 'ease-in-out'
				    });
				
				  }

				  //observer device rotation..
				  device: SC.device.addObserver("orientation", this,
				  function() {

				    var or = SC.device.get("orientation");
				    console.log(or);

				    if (or === 'landscape') {
				      Cloudflix.motionController.set('orientation', or);
				    } else {
				      Cloudflix.motionController.set('orientation', or);
				    }
				  })
				},
				detectBrowser:function(){
					var browser = SC.browser.current;
					var iPadBrowser = SC.browser.isiPad;
					console.log(browser + ' = current Browser');
					console.log(iPadBrowser + ' = iPadBrowser');
					if(iPadBrowser === true)
					{
						console.log('it is ipad');
						Cloudflix.mainPage.mainPane.splitView.rightPanel.mostPopular.contentView.animate('width',10850,{duration:.5, timing:'ease-in-out'});
						
					}
				}
			}), // end of the foo
			

			
	Exit: Ki.State.design({

    enterState: function() {
				console.log('EEEE');

    }
	}), // end of the foo		
			
			
			
			SignUp: Ki.State.design({
				
				enterState: function() {
						console.log('SSSS');


        	},
					exit:function()
					{
						this.gotoState('Exit');
					},
					goToProfileState:function()
					{
						this.gotoState('Profile');
					}
			}),
			
			
			Profile: Ki.State.design({
				
				enterState: function() {
					console.log('PPPP');

					
        	},
					nextFunction:function()
					{
					}
			}),
			Contact: Ki.State.design({
				
				enterState: function() {


					
        	},
					nextFunction:function()
					{
					}
			})
    })
  
  })

});
