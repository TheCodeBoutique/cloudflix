// ==========================================================================
// Project:   Cloudflix - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Cloudflix */

// This page describes the main user interface for your application.  
Cloudflix.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
	
	defaultResponder: Cloudflix.statechart,
	
		classNames: ['base-view'],
		childViews: 'splitView'.w(),

			splitView: SC.View.design({
				layout: { top: 0, left: 0, bottom: 0, right: 0 },
				childViews: 'leftPanel rightPanel'.w(),
				
					leftPanel: SC.View.design({
						classNames: ['left-view'],
						layout: { left: 0, right: 780, top: 0, bottom: 0 },
						backgroundColor: 'white',
						childViews: 'topToolBar'.w(),
						
							topToolBar: SC.ToolbarView.design({
								//classNames: ['toolbar-left'],
							  layout: { top: 0, left: 0, right: 0, height: 34 },
							  anchorLocation: SC.ANCHOR_TOP,
								childViews: 'toolbarSplit'.w(),
								
							toolbarSplit:	SC.ImageView.design({
									classNames:['line'],
								  layout: { top: 0, right: 0, bottom: 0, width: 2 },
								  useImageQueue: NO
								}),
										
							}) //toolbar
								
					}), //leftpanel
							
					rightPanel: SC.View.design({
						classNames: ['right-view'],
						backgroundColor: 'gray',
				    autoResizeStyle: SC.RESIZE_AUTOMATIC,
						childViews: 'topToolBar testButton mostPopular mostPopTitle justAdded justAddedTitle'.w(),
						
						mostPopTitle:SC.ToolbarView.design({
							classNames:['most_pop'],
						  layout: { top: 57, left: 201, width: 200, height: 34 },  
						  childViews:'mostPopularLabel'.w(),
									mostPopularLabel:SC.LabelView.design({
												    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
												    controlSize: SC.LARGE_CONTROL_SIZE,
												    fontWeight: SC.BOLD_WEIGHT,
														textAlign: SC.ALIGN_CENTER,
									          escapeHTML: NO,
												    isTextSelectable: YES,
												    value:'Most Popular'
												  	}),
													}),
													justAddedTitle:SC.ToolbarView.design({
														classNames:['just_added'],
													  layout: { top: 272, left: 201, width: 200, height: 34 },  
													  childViews:'justAddedLabel'.w(),
																justAddedLabel:SC.LabelView.design({
																			    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
																			    controlSize: SC.LARGE_CONTROL_SIZE,
																			    fontWeight: SC.BOLD_WEIGHT,
																					textAlign: SC.ALIGN_CENTER,
																          escapeHTML: NO,
																			    isTextSelectable: YES,
																			    value:'Just Added'
																			  	}),
																				}),
						mostPopular:SC.ScrollView.design({
											classNames:['most_pop_scroll'],
										  alwaysBounceVertical: NO,
											autohidesHorizontalScroller: NO,
											hasVerticalScroller: NO,
											borderStyle: SC.BORDER_NONE,
								    	layout: { top:35, height: 210, left: 251, right:0},

										contentView:SC.View.design({
												classNames:['most_pop_scroll'],
										    layout:{top:0,bottom:0,width:14400,left:0},
												childViews:'contentView'.w(),

						        			contentView: Cloudflix.MostPopGrid.design({
														classNames:['backView'],
					 									contentBinding: 'Cloudflix.mostPopularController.arrangedObjects',
				   									selectionBinding: 'Cloudflix.mostPopularController.selection',
				   									contentValueKey: "title",
				   									contentIconKey: "poster",
				   									exampleView: Cloudflix.CustomGrid,
				   									hasContentIcon:  YES,
				   									escapeHTML: NO,
				   									rowHeight: 200,
					 									columnWidth: 170,
														borderStyle: SC.BORDER_NONE, 
															}),
														})
													}),
													justAdded:SC.ScrollView.design({
																	  alwaysBounceVertical: NO,
																		autohidesHorizontalScroller: NO,
																		hasVerticalScroller: NO,
																		borderStyle: SC.BORDER_NONE,
															    	layout: { top:245, height: 210, left: 251, right:0},

																	contentView:SC.View.design({
																	    layout:{top:0,bottom:0,width:14900,left:0},
																			childViews:'contentView'.w(),

													        			contentView: Cloudflix.JustAddedGrid.design({
																					classNames:['backView'],
												 									contentBinding: 'Cloudflix.justAddedController.arrangedObjects',
											   									selectionBinding: 'Cloudflix.justAddedController.selection',
											   									contentValueKey: "title",
											   									contentIconKey: "poster",
											   									exampleView: Cloudflix.CustomGrid,
											   									hasContentIcon:  YES,
											   									escapeHTML: NO,
											   									rowHeight: 200,
												 									columnWidth: 170,
																					borderStyle: SC.BORDER_NONE, 
																						}),
																					})
																				}),
						
							testButton: SC.ButtonView.design({
								  layout: { top: 50, height: 24, left: 220, width: 100 },
									isVisible:false,
								  title:  "Test"
							}), //text button
						
							topToolBar: SC.ToolbarView.design({
								classNames: ['toolbar-right'],
							  layout: { top: 0, left: 0, right: 0, height: 34 },
							  anchorLocation: SC.ANCHOR_TOP,
									childViews: 'popoverButton netflix'.w(),

									popoverButton: SC.ButtonView.design({
										  layout: { centerY: 0, height: 24, left: 12, width: 100 },
										  title:  "Add Task"
									}), // popover
									netflix: SC.ButtonView.design({
									        layout: { centerY:0, height: 30, right: 12, width: 100 },
									        title:  "Netflix",
													controlSize: SC.REGULAR_CONTROL_SIZE,
													action: "netFlixSignIn",
													isDefault: YES,
													netFlixSignIn:function(){
															Cloudflix.netflixController.authenticate();
													}
									      }),
							}) //toolbar
				  
					})  //right panel
				
			})  //split

		})  //main pane
		
}); // main page
