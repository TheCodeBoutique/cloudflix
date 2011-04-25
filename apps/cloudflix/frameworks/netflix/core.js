// ==========================================================================
// Project:   Netflix
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Netflix */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Netflix = SC.Application.create(
  /** @scope Netflix.prototype */ {

  NAMESPACE: 'Netflix',
  VERSION: '0.1.0',

  NETFLIX_API_BASE: 'http://api.netflix.com',

  REQUEST_TOKEN_PATH: '/oauth/request_token',
  USER_AUTHORIZATION_PATH: '/oauth/login',
  ACCESS_TOKEN_PATH: '/oauth/access_token',
	NETFLIX_API_BASE_USER: 'http://api-user.netflix.com'
}) ;
