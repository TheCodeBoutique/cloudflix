// ==========================================================================
// Project:   Netflix.netflixController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Netflix */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
sc_require('mixins/netflix_controller_delegate');

Netflix.NetflixController = SC.Controller.extend(SC.DelegateSupport,
  Netflix.NetflixControllerDelegate, {
  // ..........................................................
  // AUTHENTICATION
  //

  /**
    Whether the application has been authenticated with the Netflix servers.

    @property {Boolean}
    @isReadOnly
  */
  authenticated: function() {
    return this._authenticated;
  }.property(),

  /**
    Called to initialize the Netflix API and ensure we have a valid access
    token.

    If we have an access token saved, we will use that to authenticate all
    future API calls.

    Otherwise, we check to see if Netflix has redirected back to us with a
    verified request token, and we exchange it for an access token.

    If neither of these are true, we request a request token and then redirect
    the user to Netflix to grant access.

    This method should be called before any other API calls are made.

    **Note** This method may cause your application to redirect to the Netflix
    authorization URL. Your application should be prepared to save any state
    necessary and restore it once the user is redirected back. You should call
    this method again once the redirect is complete to parse the request token
    and exchange it for an access token.
  */
  authenticate: function() {
    if (this.get('authenticated')) return;

    var del            = this.delegate,
        consumerKey    = this.getDelegateProperty('consumerKey', del),
        consumerSecret = this.getDelegateProperty('consumerSecret', del),
        callbackUrl    = this.getDelegateProperty('callbackUrl', del);

			console.log(del);
			console.log(consumerKey);
			console.log(consumerSecret);
			console.log(callbackUrl);
			

    this._consumer.consumerKey = consumerKey;
    this._consumer.consumerSecret = consumerSecret;

    if (callbackUrl !== undefined) {
      this._consumer.callbackUrl = callbackUrl;
    }

    var accessToken = window.localStorage['cloudflix-oauth-token'],
        queryString = window.location.search.substring(1);

				console.log(accessToken);
				console.log(queryString);

    // If the query string is present, it means that we've been redirected
    // back to the app by Netflix.com.
    // We now need to extract the request token and exchange it for an access
    // token.
    if (queryString && queryString.indexOf('oauth') >= 0) {
      this.getAccessTokenFromRequestToken(queryString);
    } else if (!accessToken) {
      this.getRequestToken();
    } else {
      // We have a cached access token, so fetch that from local storage and
      // use it for API requests.
      this._consumer.token = accessToken;
      this._consumer.tokenSecret = window.localStorage['cloudflix-oauth-token-secret'];

      //this.fetchCurrentUser();
      this.invokeDelegateMethod(this.delegate, 'didCompleteAuthentication');
    }
  },

  /**
    Clears any saved tokens from local storage, effectively logging the user
    out.
  */
  logout: function() {
    delete window.localStorage['cloudflix-oauth-token-secret'];
    delete window.localStorage['cloudflix-oauth-token'];
  },

  // ..........................................................
  // TIMELINE
  //

  /**
    Returns an SC.RecordArray of the tweets appearing on the user's timeline.
    
    @returns SC.RecordArray
  */
  fetchTimeline: function() {
    var store = this._store;
    var query = SC.Query.local(Netflix.Tweet, {
      orderBy: 'created_at DESC',
      type: 'timeline'
    });

    return store.find(query);
  },

  /**
    Returns an SC.RecordArray of the direct messages sent and received by
    the currently logged in user.

    @returns SC.RecordArray
  */
  fetchDirectMessages: function() {
    var store = this._store,
        query = SC.Query.local(Netflix.DirectMessage, {
          orderBy: 'created_at DESC'
        });


    return store.find(query);
  },

  fetchSearch: function(value) {
    var store = this._searchStore;
    store.reset();
    var query = SC.Query.local(Netflix.Tweet, {
      orderBy: 'created_at DESC',
      type: 'search',
      val: value
    });

    return store.find(query);
  },

  // ..........................................................
  // FAVORITES
  //
  favoriteTweet: function(tweet) {
    var path = '/1/favorites/create/%@.json', id;

    if (!tweet) return;

    id = tweet.get('id');
    path = path.fmt(id);

    this.sendRequest('POST', path, null, this, 'didFavoriteTweet');
  },

  unfavoriteTweet: function(tweet) {
    var path = '/1/favorites/destroy/%@.json', id;

    if (!tweet) return;

    id = tweet.get('id');
    path = path.fmt(id);

    this.sendRequest('DELETE', path, null, this, 'didFavoriteTweet');
  },

  // ..........................................................
  // CURRENT USER
  //

  /**
    The currently logged in user. May be null until authentication
    occurs.

    @property {Netflix.User}
  */
  currentUser: null,

  fetchCurrentUser: function() {
	
    this.sendRequest('GET', '/users/userID',
                      null, this, 'didFetchCurrentUser');
  },

  /** @private
    Called when the request to verify_credentials comes back.

    This loads the currently logged in user into the store out-of-band, then
    fetches that record and sets the currentUser property.
  */
  didFetchCurrentUser: function(response) {
    var store, storeKey, record, body;

    if (SC.ok(response)) {
      body = response.get('body');

      store = this._store;
      storeKey = store.loadRecord(Netflix.User, body);

      record = store.find(Netflix.User, body.id);
      this.set('currentUser', record);
    } else {
      console.warn("Error fetching current user.");
    }
  },

  // ..........................................................
  // INTERNAL PROPERTIES
  //

  /**
    This "accessor" object is used by the OAuth library to sign all outgoing
    Netflix API requests.

    Rather than modifying it directly, you should provide your consumer key
    and secret by calling the authenticate method. This framework will then
    take care of authenticating your app with the Netflix API servers and
    request the access tokens automatically.

    @property {Object}
    @private
  */
  _consumer: {
    consumerKey: null,
    consumerSecret: null,

    token: null,
    tokenSecret: null

  },

  init: function() {
	/*
    this._store = SC.Store.create().from(SC.CascadeDataSource.create({
      dataSources: 'directMessages tweets'.w(),

      tweets: Netflix.TweetsDataSource.create({
        delegate: this
      }),

      directMessages: Netflix.DirectMessagesDataSource.create({
        delegate: this
      })
    }));

    this._searchStore = SC.Store.create().from(SC.CascadeDataSource.create({
      dataSources: 'tweets'.w(),

      tweets: Netflix.TweetsDataSource.create({
        delegate: this
      })
    }));
*/
  },
  
  store: function() {
    return this._store || null;
  }.property(),

  getAccessTokenFromRequestToken: function(queryString) {
    var pairs = queryString.split('&'), results = {},
        len = pairs.length, idx, split;

				console.log(pairs);
				console.log(results);
				console.log(len);
				console.log(idx);
				console.log(split);
				

    for (idx = 0; idx < len; idx++) {
      split = pairs[idx].split('=');
      results[split[0]] = split[1];
    }

    this.getAccessToken(results.oauth_token, results.oauth_verifier);
  },

  getAccessToken: function(token, verifier) {
    var message, authorizationHeader;


    message = {
      method: 'POST',
      action: Netflix.NETFLIX_API_BASE+Netflix.ACCESS_TOKEN_PATH,
      parameters: {
        oauth_verifier: verifier,
        oauth_token: token
      }
    };
		console.log(message);
		console.log(authorizationHeader);

    OAuth.completeRequest(message, this._consumer);

    authorizationHeader = OAuth.getAuthorizationHeader('', message.parameters);

    SC.Request.postUrl('/oauth/access_token')
              .header('Authorization', authorizationHeader)
              .notify(this, 'didReceiveAccessToken')
              .send();
  },

  didReceiveAccessToken: function(response) {
    var results = OAuth.getParameterMap(OAuth.decodeForm(response.get('body')));

    window.localStorage['cloudflix-oauth-token'] = results.oauth_token;
    window.localStorage['cloudflix-oauth-token-secret'] = results.oauth_token_secret;
    this._consumer.token = results.oauth_token;
    this._consumer.tokenSecret = results.oauth_token_secret;

    this._authenticated = YES;
    window.location.search = '';

    this.invokeDelegateMethod(this.delegate, 'didCompleteAuthentication');
  },

  sendRequest: function(method, path, parameters, context, action) {
    var message, requestBody, authorizationHeader, request;

    message = {
      method: method,
      action: Netflix.NETFLIX_API_BASE+path//,
      // parameters: parameters
    };

    requestBody = parameters ? OAuth.formEncode(parameters) : '';

    OAuth.completeRequest(message, this._consumer);
    authorizationHeader = OAuth.getAuthorizationHeader('', message.parameters);

    request = SC.Request.create({
      type: method.toUpperCase(),
      address: path
    });

    request.json().header('Authorization', authorizationHeader);
    request.notify.apply(request, [context, action].concat(SC.A(arguments).slice(5)));

    request.send();

  },

  postTweet: function(msg, target, action) {
    var message = {
      method: 'POST',
      action: 'http://api.Netflix.com/1/statuses/update.json',
      parameters: {
        status: msg
      }
    };

    OAuth.completeRequest(message, this._consumer);

    var requestBody = OAuth.formEncode({ status: msg });
    var authorizationHeader = OAuth.getAuthorizationHeader('', message.parameters);

    SC.Request.postUrl('/1/statuses/update.json')
              .header("Content-Type", "application/x-www-form-urlencoded")
              .header('Authorization', authorizationHeader)
              .notify(target, action)
              .send(requestBody);
  },

  getRequestToken: function() {
    var location = window.location, authorizationHeader, message;
		console.log(location);
		
		
    message = {
      method: 'POST',
      action: Netflix.NETFLIX_API_BASE+Netflix.REQUEST_TOKEN_PATH,
      parameters: {
        oauth_callback: this._consumer.callbackUrl
      }
    };

		console.log(authorizationHeader);
		console.log(message);

    OAuth.completeRequest(message, this._consumer);
    authorizationHeader = OAuth.getAuthorizationHeader('', message.parameters);

		console.log(authorizationHeader);


    SC.Request.postUrl('/oauth/request_token')
              .header('Authorization', authorizationHeader)
              // .header('Content-Type', "application/x-www-form-urlencoded")
              .notify(this, 'didReceiveRequestToken')
              .send();
  },

  didReceiveRequestToken: function(response) {
    var results = OAuth.decodeForm(response.get('body'));
		console.log(results);
    results = OAuth.getParameterMap(results);
		console.log(response);
		console.log(results);
		
		

	var key = this._consumer.consumerKey;
	var call = this._consumer.callbackUrl;

	var root  = Netflix.NETFLIX_API_BASE_USER+Netflix.USER_AUTHORIZATION_PATH +'?oauth_token=oauth_token='+results.oauth_token + '&oauth_token_secret=' + results.oauth_token_secret +'&application_name=cloudflix';
	var end  = '&login_url=https://api-user.netflix.com/oauth/login' +'?oauth_token='+results.oauth_token + '&oauth_consumer_key=' + key +'&application_name=cloudflix' +'&oauth_callback=' + call;

    window.location = root+end;
 
}
});