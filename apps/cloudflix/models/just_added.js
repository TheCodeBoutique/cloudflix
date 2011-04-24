// ==========================================================================
// Project:   Cloudflix.JustAdded
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Cloudflix */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Cloudflix.JustAdded = SC.Record.extend({

	primaryKey: 'title', 

	title:SC.Record.attr(String),
	releasedate:SC.Record.attr(String),
	studio:SC.Record.attr(String),
	poster:SC.Record.attr(String),
	moviesite:SC.Record.attr(String),
	location:SC.Record.attr(String),
	rating:SC.Record.attr(String),

}) ;
