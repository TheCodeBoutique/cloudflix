// ==========================================================================
// Project:   Cloudflix.MostPopular
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Cloudflix */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Cloudflix.MostPopular = SC.Record.extend(
/** @scope Cloudflix.MostPopular.prototype */ {

  primaryKey: 'id', 

	title:SC.Record.attr(String),
	url:SC.Record.attr(String),
	poster:SC.Record.attr(String),
	exclusive:SC.Record.attr(String),
	hd:SC.Record.attr(String),
	itunesurl:SC.Record.attr(String),
	showtimesurl:SC.Record.attr(String),

}) ;
