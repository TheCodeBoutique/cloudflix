var p = 0;
var i = 0;
Cloudflix.CustomGrid = SC.View.extend({ 

      	content: null,
				displayProperties: 'isSelected'.w(),

				
		 createChildViews: function(){
			 var childViews = [];
		   var content = this.get('content');
			  var selection = this.get('selection');
			
				var newTitle = content.title;
				
				//this is small images being pulled from apple site 
			 	var posterImages =  content.poster;
			
				var xLargeImage = posterImages.replace("/poster","/poster-xlarge");
				//console.log(xLargeImage);
				
				if(SC.none(content)) return;
				{
					var background = this.createChildView(
							SC.View.design({
									classNames:['trail'],
							    layout:{top:10,bottom:10,right:10,left:10},
									//backgroundColor:'black',									
									})
									);
									childViews.push(background);
									
						var title = this.createChildView(
										SC.LabelView.design({
											 layout: { bottom:20, height: 24, left:10, width: 200 },
											 controlSize: SC.AUTO_CONTROL_SIZE,
											 fontWeight: SC.BOLD_WEIGHT,
											 escapeHTML: NO,
											 isTextSelectable: YES,
											 value:newTitle,				
											})
										);
						//childViews.push(title);
						
						var poster = this.createChildView(
										SC.ImageView.design({
											classNames:['poster'],
								 			layout:{top:30,bottom:50,right:20,left:20},
								 			useImageQueue: NO, 
								 			value:xLargeImage,
										})
								);
								childViews.push(poster);
								
								var add = this.createChildView(
											SC.ButtonView.design({
											        layout: { bottom: 20, height: 24, right: 25, width: 70 },
															controlSize: SC.SMALL_CONTROL_SIZE,
															content: content,
											        title:  "Add",
															action:"addTrailer",
															addTrailer:function()
															{
																var tmp = this.get('content');
																
																
																var newDirectors = content.directors;
																var newGenre = content.genre;
																var newLocation = content.location;
																var newMoviesite = content.moviesite;
																
																var newPoster = content.poster;
																var newRating = content.rating;
																var newReleasedate = content.releasedate;
																var newStudio = content.studio;
																
																var newTitle = content.title;
																var newTrailers = content.trailers;

																//p += content.cost;
																i++;
																Cloudflix.trailerPlayer.set('playQueue',i);
																Cloudflix.trailerPlayer.sendChangesToServer('playQueue');
																//Shopping.checkoutController.set('cost',p);
															
																var add = SC.Object.create({
																		directors : newDirectors,
																		genre : newGenre,
																		location : newLocation,
																		moviesite : newMoviesite,
																		poster : newPoster,
																		rating : newRating,
																		releasedate : newReleasedate,
																		studio : newStudio,
																		title : newTitle,
																		trailers :newTrailers,
																	});
																	//this pushes the objects to the controller 
																	Cloudflix.Queue.push(add);
																	// this updates the array controller 
																	Cloudflix.trailerPlayer.invokeLast( function() {
																	  this.set('content', [add]) ;
																	});
															}
														})
													);
													childViews.push(add);
													
													var play = this.createChildView(
															SC.ButtonView.design({
															        layout: { bottom: 20, height: 24, left: 20, width: 70 },
															        title:  "Play",
																			controlSize: SC.SMALL_CONTROL_SIZE,
																			content: content,
																			//target:"Cloudflix.statechart",
														 					action:"viewTrailer",
																			isDefault: YES,
																	
															})
															);
															childViews.push(play);
								
								
						this.set('childViews', childViews);
					}
		   
		}


});; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('cloudflix');