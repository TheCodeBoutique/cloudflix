/*globals Netflix*/

/**
  @namespace

  The Netflix Authentication Delegate is
*/
Netflix.NetflixControllerDelegate = {
  isNetflixControllerDelegate: YES,

  // ..........................................................
  // PROPERTIES
  //

  /**
    Your application's unique consumer key.

    After you register your application with Netflix, you will find
    this value at http://dev.Netflix.com/apps.

    @property {String}
  */
  consumerKey: null,

  /**
    Your application's unique consumer secret.

    After you register your application with Netflix, you will find
    this value at http://dev.Netflix.com/apps.

    @property {String}
  */
  consumerSecret: null,

  /**
    The URL to which we should tell Netflix to redirect once authorization is
    complete.

    By default, we sniff the current URL and send that in the request.

    @property {String}
  */
  callbackUrl: (function() {
    var location = window.location;
    return location.protocol+'//'+location.host+location.pathname;
  })(),

  /**
    Called when the access token has been verified and exchanged for an access
    token. Once this happens, you may begin to make authenticated requests to
    the Netflix API on behalf of the user.
  */
  didCompleteAuthentication: function() {},

  /**
    Called before the redirect to the Netflix authorization page occurs.

    If you need to save application state, you should do it here and prepare
    to restore state once the application reloads.
  */
  willRedirectToAuthorization: function() {}
};