/* >>>>>>>>>> BEGIN javascript.js */
/* >>>>>>>>>> BEGIN __sc_chance.js */

/* >>>>>>>>>> BEGIN source/jquery.js */
/*!
 * jQuery JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// (both of which we optimize for)
	quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,

	// Is it a simple selector
	isSimple = /^.[^:#\[\.,]*$/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,
	rwhite = /\s/,

	// Used for trimming whitespace
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	// Check for non-word characters
	rnonword = /\W/,

	// Check for digits
	rdigit = /\d/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	// Useragent RegExp
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,
	
	// Has the ready events already been bound?
	readyBound = false,
	
	// The functions to execute on DOM ready
	readyList = [],

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,
	
	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	init: function( selector, context ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}
		
		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = "body";
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			match = quickExpr.exec( selector );

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					doc = (context ? context.ownerDocument || context : document);

					// If a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = (ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes;
					}
					
					return jQuery.merge( this, selector );
					
				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $("TAG")
			} else if ( !context && !rnonword.test( selector ) ) {
				this.selector = selector;
				this.context = document;
				selector = document.getElementsByTagName( selector );
				return jQuery.merge( this, selector );

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return (context || rootjQuery).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return jQuery( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if (selector.selector !== undefined) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.4.4",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this.slice(num)[ 0 ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = jQuery();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );
		
		} else {
			jQuery.merge( ret, elems );
		}

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + (this.selector ? " " : "") + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},
	
	ready: function( fn ) {
		// Attach the listeners
		jQuery.bindReady();

		// If the DOM is already ready
		if ( jQuery.isReady ) {
			// Execute the function immediately
			fn.call( document, jQuery );

		// Otherwise, remember the function for later
		} else if ( readyList ) {
			// Add the function to the wait list
			readyList.push( fn );
		}

		return this;
	},
	
	eq: function( i ) {
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, +i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},
	
	end: function() {
		return this.prevObject || jQuery(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	 var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		window.$ = _$;

		if ( deep ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},
	
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,
	
	// Handle when the DOM is ready
	ready: function( wait ) {
		// A third-party is pushing the ready event forwards
		if ( wait === true ) {
			jQuery.readyWait--;
		}

		// Make sure that the DOM is not already loaded
		if ( !jQuery.readyWait || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			if ( readyList ) {
				// Execute all of them
				var fn,
					i = 0,
					ready = readyList;

				// Reset the list of functions
				readyList = null;

				while ( (fn = ready[ i++ ]) ) {
					fn.call( document, jQuery );
				}

				// Trigger any bound ready events
				if ( jQuery.fn.trigger ) {
					jQuery( document ).trigger( "ready" ).unbind( "ready" );
				}
			}
		}
	},
	
	bindReady: function() {
		if ( readyBound ) {
			return;
		}

		readyBound = true;

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			
			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent("onreadystatechange", DOMContentLoaded);
			
			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	// A crude way of determining if an object is a window
	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNaN: function( obj ) {
		return obj == null || !rdigit.test( obj ) || isNaN( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}
		
		// Not own constructor property must be Object
		if ( obj.constructor &&
			!hasOwn.call(obj, "constructor") &&
			!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
			return false;
		}
		
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
	
		var key;
		for ( key in obj ) {}
		
		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},
	
	error: function( msg ) {
		throw msg;
	},
	
	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );
		
		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test(data.replace(rvalidescape, "@")
			.replace(rvalidtokens, "]")
			.replace(rvalidbraces, "")) ) {

			// Try to use the native JSON parser first
			return window.JSON && window.JSON.parse ?
				window.JSON.parse( data ) :
				(new Function("return " + data))();

		} else {
			jQuery.error( "Invalid JSON: " + data );
		}
	},

	noop: function() {},

	// Evalulates a script in a global context
	globalEval: function( data ) {
		if ( data && rnotwhite.test(data) ) {
			// Inspired by code by Andrea Giammarchi
			// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
			var head = document.getElementsByTagName("head")[0] || document.documentElement,
				script = document.createElement("script");

			script.type = "text/javascript";

			if ( jQuery.support.scriptEval ) {
				script.appendChild( document.createTextNode( data ) );
			} else {
				script.text = data;
			}

			// Use insertBefore instead of appendChild to circumvent an IE6 bug.
			// This arises when a base node is used (#2709).
			head.insertBefore( script, head.firstChild );
			head.removeChild( script );
		}
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction(object);

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( var value = object[0];
					i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
			}
		}

		return object;
	},

	// Use native String.trim function wherever possible
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// The extra typeof function check is to prevent crashes
			// in Safari 2 (See: #3039)
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type(array);

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array ) {
		if ( array.indexOf ) {
			return array.indexOf( elem );
		}

		for ( var i = 0, length = array.length; i < length; i++ ) {
			if ( array[ i ] === elem ) {
				return i;
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var ret = [], value;

		// Go through the array, translating each of the items to their
		// new value (or values).
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			value = callback( elems[ i ], i, arg );

			if ( value != null ) {
				ret[ ret.length ] = value;
			}
		}

		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	proxy: function( fn, proxy, thisObject ) {
		if ( arguments.length === 2 ) {
			if ( typeof proxy === "string" ) {
				thisObject = fn;
				fn = thisObject[ proxy ];
				proxy = undefined;

			} else if ( proxy && !jQuery.isFunction( proxy ) ) {
				thisObject = proxy;
				proxy = undefined;
			}
		}

		if ( !proxy && fn ) {
			proxy = function() {
				return fn.apply( thisObject || this, arguments );
			};
		}

		// Set the guid of unique handler to the same of original handler, so it can be removed
		if ( fn ) {
			proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
		}

		// So proxy can be declared as an argument
		return proxy;
	},

	// Mutifunctional method to get and set values to a collection
	// The value/s can be optionally by executed if its a function
	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;
	
		// Setting many attributes
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}
	
		// Setting one attribute
		if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = !pass && exec && jQuery.isFunction(value);
		
			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}
		
			return elems;
		}
	
		// Getting an attribute
		return length ? fn( elems[0], key ) : undefined;
	},

	now: function() {
		return (new Date()).getTime();
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

if ( indexOf ) {
	jQuery.inArray = function( elem, array ) {
		return indexOf.call( array, elem );
	};
}

// Verify that \s matches non-breaking spaces
// (IE fails on this test)
if ( !rwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

// Expose jQuery to the global object
return (window.jQuery = window.$ = jQuery);

})();


(function() {

	jQuery.support = {};

	var root = document.documentElement,
		script = document.createElement("script"),
		div = document.createElement("div"),
		id = "script" + jQuery.now();

	div.style.display = "none";
	div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	var all = div.getElementsByTagName("*"),
		a = div.getElementsByTagName("a")[0],
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") );

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return;
	}

	jQuery.support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: div.firstChild.nodeType === 3,

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText insted)
		style: /red/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: a.getAttribute("href") === "/a",

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55$/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: div.getElementsByTagName("input")[0].value === "on",

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Will be defined later
		deleteExpando: true,
		optDisabled: false,
		checkClone: false,
		scriptEval: false,
		noCloneEvent: true,
		boxModel: null,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableHiddenOffsets: true
	};

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as diabled)
	select.disabled = true;
	jQuery.support.optDisabled = !opt.disabled;

	script.type = "text/javascript";
	try {
		script.appendChild( document.createTextNode( "window." + id + "=1;" ) );
	} catch(e) {}

	root.insertBefore( script, root.firstChild );

	// Make sure that the execution of code works by injecting a script
	// tag with appendChild/createTextNode
	// (IE doesn't support this, fails, and uses .text instead)
	if ( window[ id ] ) {
		jQuery.support.scriptEval = true;
		delete window[ id ];
	}

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete script.test;

	} catch(e) {
		jQuery.support.deleteExpando = false;
	}

	root.removeChild( script );

	if ( div.attachEvent && div.fireEvent ) {
		div.attachEvent("onclick", function click() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			jQuery.support.noCloneEvent = false;
			div.detachEvent("onclick", click);
		});
		div.cloneNode(true).fireEvent("onclick");
	}

	div = document.createElement("div");
	div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";

	var fragment = document.createDocumentFragment();
	fragment.appendChild( div.firstChild );

	// WebKit doesn't clone checked state correctly in fragments
	jQuery.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

	// Figure out if the W3C box model works as expected
	// document.body must exist before we can do this
	jQuery(function() {
		var div = document.createElement("div");
		div.style.width = div.style.paddingLeft = "1px";

		document.body.appendChild( div );
		jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;

		if ( "zoom" in div.style ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.style.display = "inline";
			div.style.zoom = 1;
			jQuery.support.inlineBlockNeedsLayout = div.offsetWidth === 2;

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "";
			div.innerHTML = "<div style='width:4px;'></div>";
			jQuery.support.shrinkWrapBlocks = div.offsetWidth !== 2;
		}

		div.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
		var tds = div.getElementsByTagName("td");

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		jQuery.support.reliableHiddenOffsets = tds[0].offsetHeight === 0;

		tds[0].style.display = "";
		tds[1].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE < 8 fail this test)
		jQuery.support.reliableHiddenOffsets = jQuery.support.reliableHiddenOffsets && tds[0].offsetHeight === 0;
		div.innerHTML = "";

		document.body.removeChild( div ).style.display = "none";
		div = tds = null;
	});

	// Technique from Juriy Zaytsev
	// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
	var eventSupported = function( eventName ) {
		var el = document.createElement("div");
		eventName = "on" + eventName;

		var isSupported = (eventName in el);
		if ( !isSupported ) {
			el.setAttribute(eventName, "return;");
			isSupported = typeof el[eventName] === "function";
		}
		el = null;

		return isSupported;
	};

	jQuery.support.submitBubbles = eventSupported("submit");
	jQuery.support.changeBubbles = eventSupported("change");

	// release memory in IE
	root = script = div = all = a = null;
})();



var windowData = {},
	rbrace = /^(?:\{.*\}|\[.*\])$/;

jQuery.extend({
	cache: {},

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page	
	expando: "jQuery" + jQuery.now(),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	data: function( elem, name, data ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		elem = elem == window ?
			windowData :
			elem;

		var isNode = elem.nodeType,
			id = isNode ? elem[ jQuery.expando ] : null,
			cache = jQuery.cache, thisCache;

		if ( isNode && !id && typeof name === "string" && data === undefined ) {
			return;
		}

		// Get the data from the object directly
		if ( !isNode ) {
			cache = elem;

		// Compute a unique ID for the element
		} else if ( !id ) {
			elem[ jQuery.expando ] = id = ++jQuery.uuid;
		}

		// Avoid generating a new cache unless none exists and we
		// want to manipulate it.
		if ( typeof name === "object" ) {
			if ( isNode ) {
				cache[ id ] = jQuery.extend(cache[ id ], name);

			} else {
				jQuery.extend( cache, name );
			}

		} else if ( isNode && !cache[ id ] ) {
			cache[ id ] = {};
		}

		thisCache = isNode ? cache[ id ] : cache;

		// Prevent overriding the named cache with undefined values
		if ( data !== undefined ) {
			thisCache[ name ] = data;
		}

		return typeof name === "string" ? thisCache[ name ] : thisCache;
	},

	removeData: function( elem, name ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		elem = elem == window ?
			windowData :
			elem;

		var isNode = elem.nodeType,
			id = isNode ? elem[ jQuery.expando ] : elem,
			cache = jQuery.cache,
			thisCache = isNode ? cache[ id ] : id;

		// If we want to remove a specific section of the element's data
		if ( name ) {
			if ( thisCache ) {
				// Remove the section of cache data
				delete thisCache[ name ];

				// If we've removed all the data, remove the element's cache
				if ( isNode && jQuery.isEmptyObject(thisCache) ) {
					jQuery.removeData( elem );
				}
			}

		// Otherwise, we want to remove all of the element's data
		} else {
			if ( isNode && jQuery.support.deleteExpando ) {
				delete elem[ jQuery.expando ];

			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( jQuery.expando );

			// Completely remove the data cache
			} else if ( isNode ) {
				delete cache[ id ];

			// Remove all fields from the object
			} else {
				for ( var n in elem ) {
					delete elem[ n ];
				}
			}
		}
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				var attr = this[0].attributes, name;
				data = jQuery.data( this[0] );

				for ( var i = 0, l = attr.length; i < l; i++ ) {
					name = attr[i].name;

					if ( name.indexOf( "data-" ) === 0 ) {
						name = name.substr( 5 );
						dataAttr( this[0], name, data[ name ] );
					}
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		var parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			// Try to fetch any internally stored data first
			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var $this = jQuery( this ),
					args = [ parts[0], value ];

				$this.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				$this.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		data = elem.getAttribute( "data-" + key );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				!jQuery.isNaN( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}




jQuery.extend({
	queue: function( elem, type, data ) {
		if ( !elem ) {
			return;
		}

		type = (type || "fx") + "queue";
		var q = jQuery.data( elem, type );

		// Speed up dequeue by getting out quickly if this is just a lookup
		if ( !data ) {
			return q || [];
		}

		if ( !q || jQuery.isArray(data) ) {
			q = jQuery.data( elem, type, jQuery.makeArray(data) );

		} else {
			q.push( data );
		}

		return q;
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift();

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift("inprogress");
			}

			fn.call(elem, function() {
				jQuery.dequeue(elem, type);
			});
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function( i ) {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},

	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue( type, function() {
			var elem = this;
			setTimeout(function() {
				jQuery.dequeue( elem, type );
			}, time );
		});
	},

	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	}
});




var rclass = /[\n\t]/g,
	rspaces = /\s+/,
	rreturn = /\r/g,
	rspecialurl = /^(?:href|src|style)$/,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rradiocheck = /^(?:radio|checkbox)$/i;

jQuery.props = {
	"for": "htmlFor",
	"class": "className",
	readonly: "readOnly",
	maxlength: "maxLength",
	cellspacing: "cellSpacing",
	rowspan: "rowSpan",
	colspan: "colSpan",
	tabindex: "tabIndex",
	usemap: "useMap",
	frameborder: "frameBorder"
};

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name, fn ) {
		return this.each(function(){
			jQuery.attr( this, name, "" );
			if ( this.nodeType === 1 ) {
				this.removeAttribute( name );
			}
		});
	},

	addClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.addClass( value.call(this, i, self.attr("class")) );
			});
		}

		if ( value && typeof value === "string" ) {
			var classNames = (value || "").split( rspaces );

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className ) {
						elem.className = value;

					} else {
						var className = " " + elem.className + " ",
							setClass = elem.className;

						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
								setClass += " " + classNames[c];
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.removeClass( value.call(this, i, self.attr("class")) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			var classNames = (value || "").split( rspaces );

			for ( var i = 0, l = this.length; i < l; i++ ) {
				var elem = this[i];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						var className = (" " + elem.className + " ").replace(rclass, " ");
						for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[c] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				self.toggleClass( value.call(this, i, self.attr("class"), stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspaces );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery.data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery.data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ";
		for ( var i = 0, l = this.length; i < l; i++ ) {
			if ( (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		if ( !arguments.length ) {
			var elem = this[0];

			if ( elem ) {
				if ( jQuery.nodeName( elem, "option" ) ) {
					// attributes.value is undefined in Blackberry 4.7 but
					// uses .value. See #6932
					var val = elem.attributes.value;
					return !val || val.specified ? elem.value : elem.text;
				}

				// We need to handle select boxes special
				if ( jQuery.nodeName( elem, "select" ) ) {
					var index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type === "select-one";

					// Nothing was selected
					if ( index < 0 ) {
						return null;
					}

					// Loop through all the selected options
					for ( var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++ ) {
						var option = options[ i ];

						// Don't return options that are disabled or in a disabled optgroup
						if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && 
								(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

							// Get the specific value for the option
							value = jQuery(option).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				}

				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				if ( rradiocheck.test( elem.type ) && !jQuery.support.checkOn ) {
					return elem.getAttribute("value") === null ? "on" : elem.value;
				}
				

				// Everything else, we just grab the value
				return (elem.value || "").replace(rreturn, "");

			}

			return undefined;
		}

		var isFunction = jQuery.isFunction(value);

		return this.each(function(i) {
			var self = jQuery(this), val = value;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call(this, i, self.val());
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray(val) ) {
				val = jQuery.map(val, function (value) {
					return value == null ? "" : value + "";
				});
			}

			if ( jQuery.isArray(val) && rradiocheck.test( this.type ) ) {
				this.checked = jQuery.inArray( self.val(), val ) >= 0;

			} else if ( jQuery.nodeName( this, "select" ) ) {
				var values = jQuery.makeArray(val);

				jQuery( "option", this ).each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					this.selectedIndex = -1;
				}

			} else {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},
		
	attr: function( elem, name, value, pass ) {
		// don't set attributes on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
			return undefined;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery(elem)[name](value);
		}

		var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc( elem ),
			// Whether we are setting (or getting)
			set = value !== undefined;

		// Try to normalize/fix the name
		name = notxml && jQuery.props[ name ] || name;

		// These attributes require special treatment
		var special = rspecialurl.test( name );

		// Safari mis-reports the default selected property of an option
		// Accessing the parent's selectedIndex property fixes it
		if ( name === "selected" && !jQuery.support.optSelected ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}

		// If applicable, access the attribute via the DOM 0 way
		// 'in' checks fail in Blackberry 4.7 #6931
		if ( (name in elem || elem[ name ] !== undefined) && notxml && !special ) {
			if ( set ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( name === "type" && rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				}

				if ( value === null ) {
					if ( elem.nodeType === 1 ) {
						elem.removeAttribute( name );
					}

				} else {
					elem[ name ] = value;
				}
			}

			// browsers index elements by id/name on forms, give priority to attributes.
			if ( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) ) {
				return elem.getAttributeNode( name ).nodeValue;
			}

			// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
			// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
			if ( name === "tabIndex" ) {
				var attributeNode = elem.getAttributeNode( "tabIndex" );

				return attributeNode && attributeNode.specified ?
					attributeNode.value :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}

			return elem[ name ];
		}

		if ( !jQuery.support.style && notxml && name === "style" ) {
			if ( set ) {
				elem.style.cssText = "" + value;
			}

			return elem.style.cssText;
		}

		if ( set ) {
			// convert the value to a string (all browsers do this but IE) see #1070
			elem.setAttribute( name, "" + value );
		}

		// Ensure that missing attributes return undefined
		// Blackberry 4.7 returns "" from getAttribute #6938
		if ( !elem.attributes[ name ] && (elem.hasAttribute && !elem.hasAttribute( name )) ) {
			return undefined;
		}

		var attr = !jQuery.support.hrefNormalized && notxml && special ?
				// Some attributes require a special call on IE
				elem.getAttribute( name, 2 ) :
				elem.getAttribute( name );

		// Non-existent attributes return null, we normalize to undefined
		return attr === null ? undefined : attr;
	}
});




var rnamespaces = /\.(.*)$/,
	rformElems = /^(?:textarea|input|select)$/i,
	rperiod = /\./g,
	rspace = / /g,
	rescape = /[^\w\s.|`]/g,
	fcleanup = function( nm ) {
		return nm.replace(rescape, "\\$&");
	},
	focusCounts = { focusin: 0, focusout: 0 };

/*
 * A number of helper functions used for managing events.
 * Many of the ideas behind this code originated from
 * Dean Edwards' addEvent library.
 */
jQuery.event = {

	// Bind an event to an element
	// Original by Dean Edwards
	add: function( elem, types, handler, data ) {
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// For whatever reason, IE has trouble passing the window object
		// around, causing it to be cloned in the process
		if ( jQuery.isWindow( elem ) && ( elem !== window && !elem.frameElement ) ) {
			elem = window;
		}

		if ( handler === false ) {
			handler = returnFalse;
		} else if ( !handler ) {
			// Fixes bug #7229. Fix recommended by jdalton
		  return;
		}

		var handleObjIn, handleObj;

		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		// Make sure that the function being executed has a unique ID
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure
		var elemData = jQuery.data( elem );

		// If no elemData is found then we must be trying to bind to one of the
		// banned noData elements
		if ( !elemData ) {
			return;
		}

		// Use a key less likely to result in collisions for plain JS objects.
		// Fixes bug #7150.
		var eventKey = elem.nodeType ? "events" : "__events__",
			events = elemData[ eventKey ],
			eventHandle = elemData.handle;
			
		if ( typeof events === "function" ) {
			// On plain objects events is a fn that holds the the data
			// which prevents this data from being JSON serialized
			// the function does not need to be called, it just contains the data
			eventHandle = events.handle;
			events = events.events;

		} else if ( !events ) {
			if ( !elem.nodeType ) {
				// On plain objects, create a fn that acts as the holder
				// of the values to avoid JSON serialization of event data
				elemData[ eventKey ] = elemData = function(){};
			}

			elemData.events = events = {};
		}

		if ( !eventHandle ) {
			elemData.handle = eventHandle = function() {
				// Handle the second event of a trigger and when
				// an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && !jQuery.event.triggered ?
					jQuery.event.handle.apply( eventHandle.elem, arguments ) :
					undefined;
			};
		}

		// Add elem as a property of the handle function
		// This is to prevent a memory leak with non-native events in IE.
		eventHandle.elem = elem;

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = types.split(" ");

		var type, i = 0, namespaces;

		while ( (type = types[ i++ ]) ) {
			handleObj = handleObjIn ?
				jQuery.extend({}, handleObjIn) :
				{ handler: handler, data: data };

			// Namespaced event handlers
			if ( type.indexOf(".") > -1 ) {
				namespaces = type.split(".");
				type = namespaces.shift();
				handleObj.namespace = namespaces.slice(0).sort().join(".");

			} else {
				namespaces = [];
				handleObj.namespace = "";
			}

			handleObj.type = type;
			if ( !handleObj.guid ) {
				handleObj.guid = handler.guid;
			}

			// Get the current list of functions bound to this event
			var handlers = events[ type ],
				special = jQuery.event.special[ type ] || {};

			// Init the event handler queue
			if ( !handlers ) {
				handlers = events[ type ] = [];

				// Check for a special event handler
				// Only use addEventListener/attachEvent if the special
				// events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}
			
			if ( special.add ) { 
				special.add.call( elem, handleObj ); 

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add the function to the element's handler list
			handlers.push( handleObj );

			// Keep track of which events have been used, for global triggering
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, pos ) {
		// don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		if ( handler === false ) {
			handler = returnFalse;
		}

		var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType,
			eventKey = elem.nodeType ? "events" : "__events__",
			elemData = jQuery.data( elem ),
			events = elemData && elemData[ eventKey ];

		if ( !elemData || !events ) {
			return;
		}
		
		if ( typeof events === "function" ) {
			elemData = events;
			events = events.events;
		}

		// types is actually an event object here
		if ( types && types.type ) {
			handler = types.handler;
			types = types.type;
		}

		// Unbind all events for the element
		if ( !types || typeof types === "string" && types.charAt(0) === "." ) {
			types = types || "";

			for ( type in events ) {
				jQuery.event.remove( elem, type + types );
			}

			return;
		}

		// Handle multiple events separated by a space
		// jQuery(...).unbind("mouseover mouseout", fn);
		types = types.split(" ");

		while ( (type = types[ i++ ]) ) {
			origType = type;
			handleObj = null;
			all = type.indexOf(".") < 0;
			namespaces = [];

			if ( !all ) {
				// Namespaced event handlers
				namespaces = type.split(".");
				type = namespaces.shift();

				namespace = new RegExp("(^|\\.)" + 
					jQuery.map( namespaces.slice(0).sort(), fcleanup ).join("\\.(?:.*\\.)?") + "(\\.|$)");
			}

			eventType = events[ type ];

			if ( !eventType ) {
				continue;
			}

			if ( !handler ) {
				for ( j = 0; j < eventType.length; j++ ) {
					handleObj = eventType[ j ];

					if ( all || namespace.test( handleObj.namespace ) ) {
						jQuery.event.remove( elem, origType, handleObj.handler, j );
						eventType.splice( j--, 1 );
					}
				}

				continue;
			}

			special = jQuery.event.special[ type ] || {};

			for ( j = pos || 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( handler.guid === handleObj.guid ) {
					// remove the given handler for the given type
					if ( all || namespace.test( handleObj.namespace ) ) {
						if ( pos == null ) {
							eventType.splice( j--, 1 );
						}

						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}

					if ( pos != null ) {
						break;
					}
				}
			}

			// remove generic event handler if no more handlers exist
			if ( eventType.length === 0 || pos != null && eventType.length === 1 ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				ret = null;
				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			var handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			delete elemData.events;
			delete elemData.handle;

			if ( typeof elemData === "function" ) {
				jQuery.removeData( elem, eventKey );

			} else if ( jQuery.isEmptyObject( elemData ) ) {
				jQuery.removeData( elem );
			}
		}
	},

	// bubbling is internal
	trigger: function( event, data, elem /*, bubbling */ ) {
		// Event object or event type
		var type = event.type || event,
			bubbling = arguments[3];

		if ( !bubbling ) {
			event = typeof event === "object" ?
				// jQuery.Event object
				event[ jQuery.expando ] ? event :
				// Object literal
				jQuery.extend( jQuery.Event(type), event ) :
				// Just the event type (string)
				jQuery.Event(type);

			if ( type.indexOf("!") >= 0 ) {
				event.type = type = type.slice(0, -1);
				event.exclusive = true;
			}

			// Handle a global trigger
			if ( !elem ) {
				// Don't bubble custom events when global (to avoid too much overhead)
				event.stopPropagation();

				// Only trigger if we've ever bound an event for it
				if ( jQuery.event.global[ type ] ) {
					jQuery.each( jQuery.cache, function() {
						if ( this.events && this.events[type] ) {
							jQuery.event.trigger( event, data, this.handle.elem );
						}
					});
				}
			}

			// Handle triggering a single element

			// don't do events on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 ) {
				return undefined;
			}

			// Clean up in case it is reused
			event.result = undefined;
			event.target = elem;

			// Clone the incoming data, if any
			data = jQuery.makeArray( data );
			data.unshift( event );
		}

		event.currentTarget = elem;

		// Trigger the event, it is assumed that "handle" is a function
		var handle = elem.nodeType ?
			jQuery.data( elem, "handle" ) :
			(jQuery.data( elem, "__events__" ) || {}).handle;

		if ( handle ) {
			handle.apply( elem, data );
		}

		var parent = elem.parentNode || elem.ownerDocument;

		// Trigger an inline bound script
		try {
			if ( !(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) ) {
				if ( elem[ "on" + type ] && elem[ "on" + type ].apply( elem, data ) === false ) {
					event.result = false;
					event.preventDefault();
				}
			}

		// prevent IE from throwing an error for some elements with some event types, see #3533
		} catch (inlineError) {}

		if ( !event.isPropagationStopped() && parent ) {
			jQuery.event.trigger( event, data, parent, true );

		} else if ( !event.isDefaultPrevented() ) {
			var old,
				target = event.target,
				targetType = type.replace( rnamespaces, "" ),
				isClick = jQuery.nodeName( target, "a" ) && targetType === "click",
				special = jQuery.event.special[ targetType ] || {};

			if ( (!special._default || special._default.call( elem, event ) === false) && 
				!isClick && !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()]) ) {

				try {
					if ( target[ targetType ] ) {
						// Make sure that we don't accidentally re-trigger the onFOO events
						old = target[ "on" + targetType ];

						if ( old ) {
							target[ "on" + targetType ] = null;
						}

						jQuery.event.triggered = true;
						target[ targetType ]();
					}

				// prevent IE from throwing an error for some elements with some event types, see #3533
				} catch (triggerError) {}

				if ( old ) {
					target[ "on" + targetType ] = old;
				}

				jQuery.event.triggered = false;
			}
		}
	},

	handle: function( event ) {
		var all, handlers, namespaces, namespace_re, events,
			namespace_sort = [],
			args = jQuery.makeArray( arguments );

		event = args[0] = jQuery.event.fix( event || window.event );
		event.currentTarget = this;

		// Namespaced event handlers
		all = event.type.indexOf(".") < 0 && !event.exclusive;

		if ( !all ) {
			namespaces = event.type.split(".");
			event.type = namespaces.shift();
			namespace_sort = namespaces.slice(0).sort();
			namespace_re = new RegExp("(^|\\.)" + namespace_sort.join("\\.(?:.*\\.)?") + "(\\.|$)");
		}

		event.namespace = event.namespace || namespace_sort.join(".");

		events = jQuery.data(this, this.nodeType ? "events" : "__events__");

		if ( typeof events === "function" ) {
			events = events.events;
		}

		handlers = (events || {})[ event.type ];

		if ( events && handlers ) {
			// Clone the handlers to prevent manipulation
			handlers = handlers.slice(0);

			for ( var j = 0, l = handlers.length; j < l; j++ ) {
				var handleObj = handlers[ j ];

				// Filter the functions by class
				if ( all || namespace_re.test( handleObj.namespace ) ) {
					// Pass in a reference to the handler function itself
					// So that we can later remove it
					event.handler = handleObj.handler;
					event.data = handleObj.data;
					event.handleObj = handleObj;
	
					var ret = handleObj.handler.apply( this, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}

					if ( event.isImmediatePropagationStopped() ) {
						break;
					}
				}
			}
		}

		return event.result;
	},

	props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// store a copy of the original event object
		// and "clone" to set read-only properties
		var originalEvent = event;
		event = jQuery.Event( originalEvent );

		for ( var i = this.props.length, prop; i; ) {
			prop = this.props[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary
		if ( !event.target ) {
			// Fixes #1925 where srcElement might not be defined either
			event.target = event.srcElement || document;
		}

		// check if target is a textnode (safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Add relatedTarget, if necessary
		if ( !event.relatedTarget && event.fromElement ) {
			event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
		}

		// Calculate pageX/Y if missing and clientX/Y available
		if ( event.pageX == null && event.clientX != null ) {
			var doc = document.documentElement,
				body = document.body;

			event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
		}

		// Add which for key events
		if ( event.which == null && (event.charCode != null || event.keyCode != null) ) {
			event.which = event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
		if ( !event.metaKey && event.ctrlKey ) {
			event.metaKey = event.ctrlKey;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		// Note: button is not normalized, so don't use it
		if ( !event.which && event.button !== undefined ) {
			event.which = (event.button & 1 ? 1 : ( event.button & 2 ? 3 : ( event.button & 4 ? 2 : 0 ) ));
		}

		return event;
	},

	// Deprecated, use jQuery.guid instead
	guid: 1E8,

	// Deprecated, use jQuery.proxy instead
	proxy: jQuery.proxy,

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady,
			teardown: jQuery.noop
		},

		live: {
			add: function( handleObj ) {
				jQuery.event.add( this,
					liveConvert( handleObj.origType, handleObj.selector ),
					jQuery.extend({}, handleObj, {handler: liveHandler, guid: handleObj.handler.guid}) ); 
			},

			remove: function( handleObj ) {
				jQuery.event.remove( this, liveConvert( handleObj.origType, handleObj.selector ), handleObj );
			}
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} : 
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src ) {
	// Allow instantiation without the 'new' keyword
	if ( !this.preventDefault ) {
		return new jQuery.Event( src );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;
	// Event type
	} else {
		this.type = src;
	}

	// timeStamp is buggy for some events on Firefox(#3843)
	// So we won't rely on the native value
	this.timeStamp = jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		
		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Checks if an event happened on an element within another element
// Used in jQuery.event.special.mouseenter and mouseleave handlers
var withinElement = function( event ) {
	// Check if mouse(over|out) are still within the same parent element
	var parent = event.relatedTarget;

	// Firefox sometimes assigns relatedTarget a XUL element
	// which we cannot access the parentNode property of
	try {
		// Traverse up the tree
		while ( parent && parent !== this ) {
			parent = parent.parentNode;
		}

		if ( parent !== this ) {
			// set the correct event type
			event.type = event.data;

			// handle event if we actually just moused on to a non sub-element
			jQuery.event.handle.apply( this, arguments );
		}

	// assuming we've left the element since we most likely mousedover a xul element
	} catch(e) { }
},

// In case of event delegation, we only need to rename the event.type,
// liveHandler will take care of the rest.
delegate = function( event ) {
	event.type = event.data;
	jQuery.event.handle.apply( this, arguments );
};

// Create mouseenter and mouseleave events
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		setup: function( data ) {
			jQuery.event.add( this, fix, data && data.selector ? delegate : withinElement, orig );
		},
		teardown: function( data ) {
			jQuery.event.remove( this, fix, data && data.selector ? delegate : withinElement );
		}
	};
});

// submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function( data, namespaces ) {
			if ( this.nodeName.toLowerCase() !== "form" ) {
				jQuery.event.add(this, "click.specialSubmit", function( e ) {
					var elem = e.target,
						type = elem.type;

					if ( (type === "submit" || type === "image") && jQuery( elem ).closest("form").length ) {
						e.liveFired = undefined;
						return trigger( "submit", this, arguments );
					}
				});
	 
				jQuery.event.add(this, "keypress.specialSubmit", function( e ) {
					var elem = e.target,
						type = elem.type;

					if ( (type === "text" || type === "password") && jQuery( elem ).closest("form").length && e.keyCode === 13 ) {
						e.liveFired = undefined;
						return trigger( "submit", this, arguments );
					}
				});

			} else {
				return false;
			}
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialSubmit" );
		}
	};

}

// change delegation, happens here so we have bind.
if ( !jQuery.support.changeBubbles ) {

	var changeFilters,

	getVal = function( elem ) {
		var type = elem.type, val = elem.value;

		if ( type === "radio" || type === "checkbox" ) {
			val = elem.checked;

		} else if ( type === "select-multiple" ) {
			val = elem.selectedIndex > -1 ?
				jQuery.map( elem.options, function( elem ) {
					return elem.selected;
				}).join("-") :
				"";

		} else if ( elem.nodeName.toLowerCase() === "select" ) {
			val = elem.selectedIndex;
		}

		return val;
	},

	testChange = function testChange( e ) {
		var elem = e.target, data, val;

		if ( !rformElems.test( elem.nodeName ) || elem.readOnly ) {
			return;
		}

		data = jQuery.data( elem, "_change_data" );
		val = getVal(elem);

		// the current data will be also retrieved by beforeactivate
		if ( e.type !== "focusout" || elem.type !== "radio" ) {
			jQuery.data( elem, "_change_data", val );
		}
		
		if ( data === undefined || val === data ) {
			return;
		}

		if ( data != null || val ) {
			e.type = "change";
			e.liveFired = undefined;
			return jQuery.event.trigger( e, arguments[1], elem );
		}
	};

	jQuery.event.special.change = {
		filters: {
			focusout: testChange, 

			beforedeactivate: testChange,

			click: function( e ) {
				var elem = e.target, type = elem.type;

				if ( type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select" ) {
					return testChange.call( this, e );
				}
			},

			// Change has to be called before submit
			// Keydown will be called before keypress, which is used in submit-event delegation
			keydown: function( e ) {
				var elem = e.target, type = elem.type;

				if ( (e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") ||
					(e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
					type === "select-multiple" ) {
					return testChange.call( this, e );
				}
			},

			// Beforeactivate happens also before the previous element is blurred
			// with this event you can't trigger a change event, but you can store
			// information
			beforeactivate: function( e ) {
				var elem = e.target;
				jQuery.data( elem, "_change_data", getVal(elem) );
			}
		},

		setup: function( data, namespaces ) {
			if ( this.type === "file" ) {
				return false;
			}

			for ( var type in changeFilters ) {
				jQuery.event.add( this, type + ".specialChange", changeFilters[type] );
			}

			return rformElems.test( this.nodeName );
		},

		teardown: function( namespaces ) {
			jQuery.event.remove( this, ".specialChange" );

			return rformElems.test( this.nodeName );
		}
	};

	changeFilters = jQuery.event.special.change.filters;

	// Handle when the input is .focus()'d
	changeFilters.focus = changeFilters.beforeactivate;
}

function trigger( type, elem, args ) {
	args[0].type = type;
	return jQuery.event.handle.apply( elem, args );
}

// Create "bubbling" focus and blur events
if ( document.addEventListener ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( focusCounts[fix]++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			}, 
			teardown: function() { 
				if ( --focusCounts[fix] === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};

		function handler( e ) { 
			e = jQuery.event.fix( e );
			e.type = fix;
			return jQuery.event.trigger( e, null, e.target );
		}
	});
}

jQuery.each(["bind", "one"], function( i, name ) {
	jQuery.fn[ name ] = function( type, data, fn ) {
		// Handle object literals
		if ( typeof type === "object" ) {
			for ( var key in type ) {
				this[ name ](key, data, type[key], fn);
			}
			return this;
		}
		
		if ( jQuery.isFunction( data ) || data === false ) {
			fn = data;
			data = undefined;
		}

		var handler = name === "one" ? jQuery.proxy( fn, function( event ) {
			jQuery( this ).unbind( event, handler );
			return fn.apply( this, arguments );
		}) : fn;

		if ( type === "unload" && name !== "one" ) {
			this.one( type, data, fn );

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.add( this[i], type, handler, data );
			}
		}

		return this;
	};
});

jQuery.fn.extend({
	unbind: function( type, fn ) {
		// Handle object literals
		if ( typeof type === "object" && !type.preventDefault ) {
			for ( var key in type ) {
				this.unbind(key, type[key]);
			}

		} else {
			for ( var i = 0, l = this.length; i < l; i++ ) {
				jQuery.event.remove( this[i], type, fn );
			}
		}

		return this;
	},
	
	delegate: function( selector, types, data, fn ) {
		return this.live( types, data, fn, selector );
	},
	
	undelegate: function( selector, types, fn ) {
		if ( arguments.length === 0 ) {
				return this.unbind( "live" );
		
		} else {
			return this.die( types, null, fn, selector );
		}
	},
	
	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},

	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			var event = jQuery.Event( type );
			event.preventDefault();
			event.stopPropagation();
			jQuery.event.trigger( event, data, this[0] );
			return event.result;
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			i = 1;

		// link all the functions, so any of them can unbind this click handler
		while ( i < args.length ) {
			jQuery.proxy( fn, args[ i++ ] );
		}

		return this.click( jQuery.proxy( fn, function( event ) {
			// Figure out which function to execute
			var lastToggle = ( jQuery.data( this, "lastToggle" + fn.guid ) || 0 ) % i;
			jQuery.data( this, "lastToggle" + fn.guid, lastToggle + 1 );

			// Make sure that clicks stop
			event.preventDefault();

			// and execute the function
			return args[ lastToggle ].apply( this, arguments ) || false;
		}));
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

var liveMap = {
	focus: "focusin",
	blur: "focusout",
	mouseenter: "mouseover",
	mouseleave: "mouseout"
};

jQuery.each(["live", "die"], function( i, name ) {
	jQuery.fn[ name ] = function( types, data, fn, origSelector /* Internal Use Only */ ) {
		var type, i = 0, match, namespaces, preType,
			selector = origSelector || this.selector,
			context = origSelector ? this : jQuery( this.context );
		
		if ( typeof types === "object" && !types.preventDefault ) {
			for ( var key in types ) {
				context[ name ]( key, data, types[key], selector );
			}
			
			return this;
		}

		if ( jQuery.isFunction( data ) ) {
			fn = data;
			data = undefined;
		}

		types = (types || "").split(" ");

		while ( (type = types[ i++ ]) != null ) {
			match = rnamespaces.exec( type );
			namespaces = "";

			if ( match )  {
				namespaces = match[0];
				type = type.replace( rnamespaces, "" );
			}

			if ( type === "hover" ) {
				types.push( "mouseenter" + namespaces, "mouseleave" + namespaces );
				continue;
			}

			preType = type;

			if ( type === "focus" || type === "blur" ) {
				types.push( liveMap[ type ] + namespaces );
				type = type + namespaces;

			} else {
				type = (liveMap[ type ] || type) + namespaces;
			}

			if ( name === "live" ) {
				// bind live handler
				for ( var j = 0, l = context.length; j < l; j++ ) {
					jQuery.event.add( context[j], "live." + liveConvert( type, selector ),
						{ data: data, selector: selector, handler: fn, origType: type, origHandler: fn, preType: preType } );
				}

			} else {
				// unbind live handler
				context.unbind( "live." + liveConvert( type, selector ), fn );
			}
		}
		
		return this;
	};
});

function liveHandler( event ) {
	var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret,
		elems = [],
		selectors = [],
		events = jQuery.data( this, this.nodeType ? "events" : "__events__" );

	if ( typeof events === "function" ) {
		events = events.events;
	}

	// Make sure we avoid non-left-click bubbling in Firefox (#3861)
	if ( event.liveFired === this || !events || !events.live || event.button && event.type === "click" ) {
		return;
	}
	
	if ( event.namespace ) {
		namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
	}

	event.liveFired = this;

	var live = events.live.slice(0);

	for ( j = 0; j < live.length; j++ ) {
		handleObj = live[j];

		if ( handleObj.origType.replace( rnamespaces, "" ) === event.type ) {
			selectors.push( handleObj.selector );

		} else {
			live.splice( j--, 1 );
		}
	}

	match = jQuery( event.target ).closest( selectors, event.currentTarget );

	for ( i = 0, l = match.length; i < l; i++ ) {
		close = match[i];

		for ( j = 0; j < live.length; j++ ) {
			handleObj = live[j];

			if ( close.selector === handleObj.selector && (!namespace || namespace.test( handleObj.namespace )) ) {
				elem = close.elem;
				related = null;

				// Those two events require additional checking
				if ( handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave" ) {
					event.type = handleObj.preType;
					related = jQuery( event.relatedTarget ).closest( handleObj.selector )[0];
				}

				if ( !related || related !== elem ) {
					elems.push({ elem: elem, handleObj: handleObj, level: close.level });
				}
			}
		}
	}

	for ( i = 0, l = elems.length; i < l; i++ ) {
		match = elems[i];

		if ( maxLevel && match.level > maxLevel ) {
			break;
		}

		event.currentTarget = match.elem;
		event.data = match.handleObj.data;
		event.handleObj = match.handleObj;

		ret = match.handleObj.origHandler.apply( match.elem, arguments );

		if ( ret === false || event.isPropagationStopped() ) {
			maxLevel = match.level;

			if ( ret === false ) {
				stop = false;
			}
			if ( event.isImmediatePropagationStopped() ) {
				break;
			}
		}
	}

	return stop;
}

function liveConvert( type, selector ) {
	return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspace, "&");
}

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.bind( name, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}
});

// Prevent memory leaks in IE
// Window isn't included so as not to unbind existing unload events
// More info:
//  - http://isaacschlueter.com/2006/10/msie-memory-leaks/
if ( window.attachEvent && !window.addEventListener ) {
	jQuery(window).bind("unload", function() {
		for ( var id in jQuery.cache ) {
			if ( jQuery.cache[ id ].handle ) {
				// Try/Catch is to handle iframes being unloaded, see #4280
				try {
					jQuery.event.remove( jQuery.cache[ id ].handle.elem );
				} catch(e) {}
			}
		}
	});
}


/*!
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var match,
			type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = context.getElementsByTagName( "*" );
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var found, item,
					filter = Expr.filter[ type ],
					left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !/\W/.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			return context.getElementsByTagName( match[1] );
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace(/\\/g, "");
		},

		TAG: function( match, curLoop ) {
			return match[1].toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			return "text" === elem.type;
		},
		radio: function( elem ) {
			return "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return "checkbox" === elem.type;
		},

		file: function( elem ) {
			return "file" === elem.type;
		},
		password: function( elem ) {
			return "password" === elem.type;
		},

		submit: function( elem ) {
			return "submit" === elem.type;
		},

		image: function( elem ) {
			return "image" === elem.type;
		},

		reset: function( elem ) {
			return "reset" === elem.type;
		},

		button: function( elem ) {
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( "Syntax error, unrecognized expression: " + name );
			}
		},

		CHILD: function( elem, match ) {
			var type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					var first = match[2],
						last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// If the nodes are siblings (or identical) we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += Sizzle.getText( elem.childNodes );
		}
	}

	return ret;
};

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Make sure that attribute selectors are quoted
			query = query.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				if ( context.nodeType === 9 ) {
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var old = context.getAttribute( "id" ),
						nid = old || id;

					if ( !old ) {
						context.setAttribute( "id", nid );
					}

					try {
						return makeArray( context.querySelectorAll( "#" + nid + " " + query ), extra );

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector,
		pseudoWorks = false;

	try {
		// This should fail with an exception
		// Gecko does not error, returns false instead
		matches.call( document.documentElement, "[test!='']:sizzle" );
	
	} catch( pseudoError ) {
		pseudoWorks = true;
	}

	if ( matches ) {
		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						return matches.call( node, expr );
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS;

jQuery.fn.extend({
	find: function( selector ) {
		var ret = this.pushStack( "", "find", selector ),
			length = 0;

		for ( var i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( var n = length; n < ret.length; n++ ) {
					for ( var r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},
	
	is: function( selector ) {
		return !!selector && jQuery.filter( selector, this ).length > 0;
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];

		if ( jQuery.isArray( selectors ) ) {
			var match, selector,
				matches = {},
				level = 1;

			if ( cur && selectors.length ) {
				for ( i = 0, l = selectors.length; i < l; i++ ) {
					selector = selectors[i];

					if ( !matches[selector] ) {
						matches[selector] = jQuery.expr.match.POS.test( selector ) ? 
							jQuery( selector, context || this.context ) :
							selector;
					}
				}

				while ( cur && cur.ownerDocument && cur !== context ) {
					for ( selector in matches ) {
						match = matches[selector];

						if ( match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match) ) {
							ret.push({ selector: selector, elem: cur, level: level });
						}
					}

					cur = cur.parentNode;
					level++;
				}
			}

			return ret;
		}

		var pos = POS.test( selectors ) ? 
			jQuery( selectors, context || this.context ) : null;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique(ret) : ret;
		
		return this.pushStack( ret, "closest", selectors );
	},
	
	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		if ( !elem || typeof elem === "string" ) {
			return jQuery.inArray( this[0],
				// If it receives a string, the selector is used
				// If it receives nothing, the siblings are used
				elem ? jQuery( elem ) : this.parent().children() );
		}
		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context || this.context ) :
				jQuery.makeArray( selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );
		
		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call(arguments).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},
	
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return (elem === qualifier) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return (jQuery.inArray( elem, qualifier ) >= 0) === keep;
	});
}




var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnocache = /<(?:script|object|embed|option|style)/i,
	// checked="checked" or checked (html5)
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	raction = /\=([^="'>\s]+\/)>/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery( this );

				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append(this);
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		return this.each(function() {
			jQuery( this ).wrapAll( html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery(arguments[0]);
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery(arguments[0]).toArray() );
			return set;
		}
	},
	
	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					 elem.parentNode.removeChild( elem );
				}
			}
		}
		
		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}
		
		return this;
	},

	clone: function( events ) {
		// Do the clone
		var ret = this.map(function() {
			if ( !jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this) ) {
				// IE copies events bound via attachEvent when
				// using cloneNode. Calling detachEvent on the
				// clone will also remove the events from the orignal
				// In order to get around this, we use innerHTML.
				// Unfortunately, this means some modifications to
				// attributes in IE that are actually only stored
				// as properties will not be copied (such as the
				// the name attribute on an input).
				var html = this.outerHTML,
					ownerDocument = this.ownerDocument;

				if ( !html ) {
					var div = ownerDocument.createElement("div");
					div.appendChild( this.cloneNode(true) );
					html = div.innerHTML;
				}

				return jQuery.clean([html.replace(rinlinejQuery, "")
					// Handle the case in IE 8 where action=/test/> self-closes a tag
					.replace(raction, '="$1">')
					.replace(rleadingWhitespace, "")], ownerDocument)[0];
			} else {
				return this.cloneNode(true);
			}
		});

		// Copy the events from the original to the clone
		if ( events === true ) {
			cloneCopyEvent( this, ret );
			cloneCopyEvent( this.find("*"), ret.find("*") );
		}

		// Return the cloned set
		return ret;
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		// See if we can take a shortcut and just use innerHTML
		} else if ( typeof value === "string" && !rnocache.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, "<$1></$2>");

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					// Remove element nodes and prevent memory leaks
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			// If using innerHTML throws an exception, use the fallback method
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value );
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			// If we're in a fragment, just use that instead of building a new one
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}
			
			fragment = results.fragment;
			
			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						i > 0 || results.cacheable || this.length > 1  ?
							fragment.cloneNode(true) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent(orig, ret) {
	var i = 0;

	ret.each(function() {
		if ( this.nodeName !== (orig[i] && orig[i].nodeName) ) {
			return;
		}

		var oldData = jQuery.data( orig[i++] ),
			curData = jQuery.data( this, oldData ),
			events = oldData && oldData.events;

		if ( events ) {
			delete curData.handle;
			curData.events = {};

			for ( var type in events ) {
				for ( var handler in events[ type ] ) {
					jQuery.event.add( this, type, events[ type ][ handler ], events[ type ][ handler ].data );
				}
			}
		}
	});
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults,
		doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);

	// Only cache "small" (1/2 KB) strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
		!rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {

		cacheable = true;
		cacheresults = jQuery.fragments[ args[0] ];
		if ( cacheresults ) {
			if ( cacheresults !== 1 ) {
				fragment = cacheresults;
			}
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;
		
		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;
			
		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = (i > 0 ? this.clone(true) : this).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}
		
			return this.pushStack( ret, name, insert.selector );
		}
	};
});

jQuery.extend({
	clean: function( elems, context, fragment, scripts ) {
		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [];

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" && !rhtml.test( elem ) ) {
				elem = context.createTextNode( elem );

			} else if ( typeof elem === "string" ) {
				// Fix "XHTML"-style tags in all browsers
				elem = elem.replace(rxhtmlTag, "<$1></$2>");

				// Trim whitespace, otherwise indexOf won't work as expected
				var tag = (rtagName.exec( elem ) || ["", ""])[1].toLowerCase(),
					wrap = wrapMap[ tag ] || wrapMap._default,
					depth = wrap[0],
					div = context.createElement("div");

				// Go to html and back, then peel off extra wrappers
				div.innerHTML = wrap[1] + elem + wrap[2];

				// Move to the right depth
				while ( depth-- ) {
					div = div.lastChild;
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !jQuery.support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					var hasBody = rtbody.test(elem),
						tbody = tag === "table" && !hasBody ?
							div.firstChild && div.firstChild.childNodes :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !hasBody ?
								div.childNodes :
								[];

					for ( var j = tbody.length - 1; j >= 0 ; --j ) {
						if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
							tbody[ j ].parentNode.removeChild( tbody[ j ] );
						}
					}

				}

				// IE completely kills leading whitespace when innerHTML is used
				if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
				}

				elem = div.childNodes;
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );
				
				} else {
					if ( ret[i].nodeType === 1 ) {
						ret.splice.apply( ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},
	
	cleanData: function( elems ) {
		var data, id, cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;
		
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];
			
			if ( id ) {
				data = cache[ id ];
				
				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}
				}
				
				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}
				
				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( elem.text || elem.textContent || elem.innerHTML || "" );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rdashAlpha = /-([a-z])/ig,
	rupper = /([A-Z])/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle,

	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn.css = function( name, value ) {
	// Setting 'undefined' is a no-op
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"zIndex": true,
		"fontWeight": true,
		"opacity": true,
		"zoom": true,
		"lineHeight": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			// Make sure that NaN and null values aren't set. See: #7116
			if ( typeof value === "number" && isNaN( value ) || value == null ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( typeof value === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		// Make sure that we're working with the right name
		var ret, origName = jQuery.camelCase( name ),
			hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name, origName );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	},

	camelCase: function( string ) {
		return string.replace( rdashAlpha, fcamelCase );
	}
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					val = getWH( elem, name, extra );

				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				if ( val <= 0 ) {
					val = curCSS( elem, name, name );

					if ( val === "0px" && currentStyle ) {
						val = currentStyle( elem, name, name );
					}

					if ( val != null ) {
						// Should return "auto" instead of 0, use 0 for
						// temporary backwards-compat
						return val === "" || val === "auto" ? "0px" : val;
					}
				}

				if ( val < 0 || val == null ) {
					val = elem.style[ name ];

					// Should return "auto" instead of 0, use 0 for
					// temporary backwards-compat
					return val === "" || val === "auto" ? "0px" : val;
				}

				return typeof val === "string" ? val : val + "px";
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				// ignore negative width and height values #1599
				value = parseFloat(value);

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ?
				(parseFloat(RegExp.$1) / 100) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style;

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// Set the alpha filter to set the opacity
			var opacity = jQuery.isNaN(value) ?
				"" :
				"alpha(opacity=" + value * 100 + ")",
				filter = style.filter || "";

			style.filter = ralpha.test(filter) ?
				filter.replace(ralpha, opacity) :
				style.filter + ' ' + opacity;
		}
	};
}

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, newName, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( !(defaultView = elem.ownerDocument.defaultView) ) {
			return undefined;
		}

		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			elem.runtimeStyle.left = elem.currentStyle.left;
			style.left = name === "fontSize" ? "1em" : (ret || 0);
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			elem.runtimeStyle.left = rsLeft;
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {
	var which = name === "width" ? cssWidth : cssHeight,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight;

	if ( extra === "border" ) {
		return val;
	}

	jQuery.each( which, function() {
		if ( !extra ) {
			val -= parseFloat(jQuery.css( elem, "padding" + this )) || 0;
		}

		if ( extra === "margin" ) {
			val += parseFloat(jQuery.css( elem, "margin" + this )) || 0;

		} else {
			val -= parseFloat(jQuery.css( elem, "border" + this + "Width" )) || 0;
		}
	});

	return val;
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var jsc = jQuery.now(),
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rnoContent = /^(?:GET|HEAD)$/,
	rbracket = /\[\]$/,
	jsre = /\=\?(&|$)/,
	rquery = /\?/,
	rts = /([?&])_=[^&]*/,
	rurl = /^(\w+:)?\/\/([^\/?#]+)/,
	r20 = /%20/g,
	rhash = /#.*$/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load;

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf(" ");
		if ( off >= 0 ) {
			var selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = null;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			complete: function( res, status ) {
				// If successful, inject the HTML into all the matched elements
				if ( status === "success" || status === "notmodified" ) {
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(res.responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						res.responseText );
				}

				if ( callback ) {
					self.each( callback, [res.responseText, status, res] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param(this.serializeArray());
	},

	serializeArray: function() {
		return this.map(function() {
			return this.elements ? jQuery.makeArray(this.elements) : this;
		})
		.filter(function() {
			return this.name && !this.disabled &&
				(this.checked || rselectTextarea.test(this.nodeName) ||
					rinput.test(this.type));
		})
		.map(function( i, elem ) {
			var val = jQuery(this).val();

			return val == null ?
				null :
				jQuery.isArray(val) ?
					jQuery.map( val, function( val, i ) {
						return { name: elem.name, value: val };
					}) :
					{ name: elem.name, value: val };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function( i, o ) {
	jQuery.fn[o] = function( f ) {
		return this.bind(o, f);
	};
});

jQuery.extend({
	get: function( url, data, callback, type ) {
		// shift arguments if data argument was omited
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	getScript: function( url, callback ) {
		return jQuery.get(url, null, callback, "script");
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get(url, data, callback, "json");
	},

	post: function( url, data, callback, type ) {
		// shift arguments if data argument was omited
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	},

	ajaxSetup: function( settings ) {
		jQuery.extend( jQuery.ajaxSettings, settings );
	},

	ajaxSettings: {
		url: location.href,
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		username: null,
		password: null,
		traditional: false,
		*/
		// This function can be overriden by calling jQuery.ajaxSetup
		xhr: function() {
			return new window.XMLHttpRequest();
		},
		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			script: "text/javascript, application/javascript",
			json: "application/json, text/javascript",
			text: "text/plain",
			_default: "*/*"
		}
	},

	ajax: function( origSettings ) {
		var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings),
			jsonp, status, data, type = s.type.toUpperCase(), noContent = rnoContent.test(type);

		s.url = s.url.replace( rhash, "" );

		// Use original (not extended) context object if it was provided
		s.context = origSettings && origSettings.context != null ? origSettings.context : s;

		// convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Handle JSONP Parameter Callbacks
		if ( s.dataType === "jsonp" ) {
			if ( type === "GET" ) {
				if ( !jsre.test( s.url ) ) {
					s.url += (rquery.test( s.url ) ? "&" : "?") + (s.jsonp || "callback") + "=?";
				}
			} else if ( !s.data || !jsre.test(s.data) ) {
				s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
			}
			s.dataType = "json";
		}

		// Build temporary JSONP function
		if ( s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url)) ) {
			jsonp = s.jsonpCallback || ("jsonp" + jsc++);

			// Replace the =? sequence both in the query string and the data
			if ( s.data ) {
				s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
			}

			s.url = s.url.replace(jsre, "=" + jsonp + "$1");

			// We need to make sure
			// that a JSONP style response is executed properly
			s.dataType = "script";

			// Handle JSONP-style loading
			var customJsonp = window[ jsonp ];

			window[ jsonp ] = function( tmp ) {
				if ( jQuery.isFunction( customJsonp ) ) {
					customJsonp( tmp );

				} else {
					// Garbage collect
					window[ jsonp ] = undefined;

					try {
						delete window[ jsonp ];
					} catch( jsonpError ) {}
				}

				data = tmp;
				jQuery.handleSuccess( s, xhr, status, data );
				jQuery.handleComplete( s, xhr, status, data );
				
				if ( head ) {
					head.removeChild( script );
				}
			};
		}

		if ( s.dataType === "script" && s.cache === null ) {
			s.cache = false;
		}

		if ( s.cache === false && noContent ) {
			var ts = jQuery.now();

			// try replacing _= if it is there
			var ret = s.url.replace(rts, "$1_=" + ts);

			// if nothing was replaced, add timestamp to the end
			s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
		}

		// If data is available, append data to url for GET/HEAD requests
		if ( s.data && noContent ) {
			s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
		}

		// Watch for a new set of requests
		if ( s.global && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Matches an absolute URL, and saves the domain
		var parts = rurl.exec( s.url ),
			remote = parts && (parts[1] && parts[1].toLowerCase() !== location.protocol || parts[2].toLowerCase() !== location.host);

		// If we're requesting a remote document
		// and trying to load JSON or Script with a GET
		if ( s.dataType === "script" && type === "GET" && remote ) {
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var script = document.createElement("script");
			if ( s.scriptCharset ) {
				script.charset = s.scriptCharset;
			}
			script.src = s.url;

			// Handle Script loading
			if ( !jsonp ) {
				var done = false;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function() {
					if ( !done && (!this.readyState ||
							this.readyState === "loaded" || this.readyState === "complete") ) {
						done = true;
						jQuery.handleSuccess( s, xhr, status, data );
						jQuery.handleComplete( s, xhr, status, data );

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}
					}
				};
			}

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			// This arises when a base node is used (#2709 and #4378).
			head.insertBefore( script, head.firstChild );

			// We handle everything using the script element injection
			return undefined;
		}

		var requestDone = false;

		// Create the request object
		var xhr = s.xhr();

		if ( !xhr ) {
			return;
		}

		// Open the socket
		// Passing null username, generates a login popup on Opera (#2865)
		if ( s.username ) {
			xhr.open(type, s.url, s.async, s.username, s.password);
		} else {
			xhr.open(type, s.url, s.async);
		}

		// Need an extra try/catch for cross domain requests in Firefox 3
		try {
			// Set content-type if data specified and content-body is valid for this type
			if ( (s.data != null && !noContent) || (origSettings && origSettings.contentType) ) {
				xhr.setRequestHeader("Content-Type", s.contentType);
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[s.url] ) {
					xhr.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url]);
				}

				if ( jQuery.etag[s.url] ) {
					xhr.setRequestHeader("If-None-Match", jQuery.etag[s.url]);
				}
			}

			// Set header so the called script knows that it's an XMLHttpRequest
			// Only send the header if it's not a remote XHR
			if ( !remote ) {
				xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			}

			// Set the Accepts header for the server, depending on the dataType
			xhr.setRequestHeader("Accept", s.dataType && s.accepts[ s.dataType ] ?
				s.accepts[ s.dataType ] + ", */*; q=0.01" :
				s.accepts._default );
		} catch( headerError ) {}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false ) {
			// Handle the global AJAX counter
			if ( s.global && jQuery.active-- === 1 ) {
				jQuery.event.trigger( "ajaxStop" );
			}

			// close opended socket
			xhr.abort();
			return false;
		}

		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxSend", [xhr, s] );
		}

		// Wait for a response to come back
		var onreadystatechange = xhr.onreadystatechange = function( isTimeout ) {
			// The request was aborted
			if ( !xhr || xhr.readyState === 0 || isTimeout === "abort" ) {
				// Opera doesn't call onreadystatechange before this point
				// so we simulate the call
				if ( !requestDone ) {
					jQuery.handleComplete( s, xhr, status, data );
				}

				requestDone = true;
				if ( xhr ) {
					xhr.onreadystatechange = jQuery.noop;
				}

			// The transfer is complete and the data is available, or the request timed out
			} else if ( !requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout") ) {
				requestDone = true;
				xhr.onreadystatechange = jQuery.noop;

				status = isTimeout === "timeout" ?
					"timeout" :
					!jQuery.httpSuccess( xhr ) ?
						"error" :
						s.ifModified && jQuery.httpNotModified( xhr, s.url ) ?
							"notmodified" :
							"success";

				var errMsg;

				if ( status === "success" ) {
					// Watch for, and catch, XML document parse errors
					try {
						// process the data (runs the xml through httpData regardless of callback)
						data = jQuery.httpData( xhr, s.dataType, s );
					} catch( parserError ) {
						status = "parsererror";
						errMsg = parserError;
					}
				}

				// Make sure that the request was successful or notmodified
				if ( status === "success" || status === "notmodified" ) {
					// JSONP handles its own success callback
					if ( !jsonp ) {
						jQuery.handleSuccess( s, xhr, status, data );
					}
				} else {
					jQuery.handleError( s, xhr, status, errMsg );
				}

				// Fire the complete handlers
				if ( !jsonp ) {
					jQuery.handleComplete( s, xhr, status, data );
				}

				if ( isTimeout === "timeout" ) {
					xhr.abort();
				}

				// Stop memory leaks
				if ( s.async ) {
					xhr = null;
				}
			}
		};

		// Override the abort handler, if we can (IE 6 doesn't allow it, but that's OK)
		// Opera doesn't fire onreadystatechange at all on abort
		try {
			var oldAbort = xhr.abort;
			xhr.abort = function() {
				if ( xhr ) {
					// oldAbort has no call property in IE7 so
					// just do it this way, which works in all
					// browsers
					Function.prototype.call.call( oldAbort, xhr );
				}

				onreadystatechange( "abort" );
			};
		} catch( abortError ) {}

		// Timeout checker
		if ( s.async && s.timeout > 0 ) {
			setTimeout(function() {
				// Check to see if the request is still happening
				if ( xhr && !requestDone ) {
					onreadystatechange( "timeout" );
				}
			}, s.timeout);
		}

		// Send the data
		try {
			xhr.send( noContent || s.data == null ? null : s.data );

		} catch( sendError ) {
			jQuery.handleError( s, xhr, null, sendError );

			// Fire the complete handlers
			jQuery.handleComplete( s, xhr, status, data );
		}

		// firefox 1.5 doesn't fire statechange for sync requests
		if ( !s.async ) {
			onreadystatechange();
		}

		// return XMLHttpRequest to allow aborting the request etc.
		return xhr;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction(value) ? value() : value;
				s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};
		
		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}
		
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray(a) || a.jquery ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});
			
		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[prefix], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join("&").replace(r20, "+");
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray(obj) && obj.length ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});
			
	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		if ( jQuery.isEmptyObject( obj ) ) {
			add( prefix, "" );

		// Serialize object item.
		} else {
			jQuery.each( obj, function( k, v ) {
				buildParams( prefix + "[" + k + "]", v, traditional, add );
			});
		}
					
	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	handleError: function( s, xhr, status, e ) {
		// If a local callback was specified, fire it
		if ( s.error ) {
			s.error.call( s.context, xhr, status, e );
		}

		// Fire the global callback
		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxError", [xhr, s, e] );
		}
	},

	handleSuccess: function( s, xhr, status, data ) {
		// If a local callback was specified, fire it and pass it the data
		if ( s.success ) {
			s.success.call( s.context, data, status, xhr );
		}

		// Fire the global callback
		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxSuccess", [xhr, s] );
		}
	},

	handleComplete: function( s, xhr, status ) {
		// Process result
		if ( s.complete ) {
			s.complete.call( s.context, xhr, status );
		}

		// The request was completed
		if ( s.global ) {
			jQuery.triggerGlobal( s, "ajaxComplete", [xhr, s] );
		}

		// Handle the global AJAX counter
		if ( s.global && jQuery.active-- === 1 ) {
			jQuery.event.trigger( "ajaxStop" );
		}
	},
		
	triggerGlobal: function( s, type, args ) {
		(s.context && s.context.url == null ? jQuery(s.context) : jQuery.event).trigger(type, args);
	},

	// Determines if an XMLHttpRequest was successful or not
	httpSuccess: function( xhr ) {
		try {
			// IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
			return !xhr.status && location.protocol === "file:" ||
				xhr.status >= 200 && xhr.status < 300 ||
				xhr.status === 304 || xhr.status === 1223;
		} catch(e) {}

		return false;
	},

	// Determines if an XMLHttpRequest returns NotModified
	httpNotModified: function( xhr, url ) {
		var lastModified = xhr.getResponseHeader("Last-Modified"),
			etag = xhr.getResponseHeader("Etag");

		if ( lastModified ) {
			jQuery.lastModified[url] = lastModified;
		}

		if ( etag ) {
			jQuery.etag[url] = etag;
		}

		return xhr.status === 304;
	},

	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type") || "",
			xml = type === "xml" || !type && ct.indexOf("xml") >= 0,
			data = xml ? xhr.responseXML : xhr.responseText;

		if ( xml && data.documentElement.nodeName === "parsererror" ) {
			jQuery.error( "parsererror" );
		}

		// Allow a pre-filtering function to sanitize the response
		// s is checked to keep backwards compatibility
		if ( s && s.dataFilter ) {
			data = s.dataFilter( data, type );
		}

		// The filter can actually parse the response
		if ( typeof data === "string" ) {
			// Get the JavaScript object, if JSON is used.
			if ( type === "json" || !type && ct.indexOf("json") >= 0 ) {
				data = jQuery.parseJSON( data );

			// If the type is "script", eval it in global context
			} else if ( type === "script" || !type && ct.indexOf("javascript") >= 0 ) {
				jQuery.globalEval( data );
			}
		}

		return data;
	}

});

/*
 * Create the request object; Microsoft failed to properly
 * implement the XMLHttpRequest in IE7 (can't request local files),
 * so we use the ActiveXObject when it is available
 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
 * we need a fallback.
 */
if ( window.ActiveXObject ) {
	jQuery.ajaxSettings.xhr = function() {
		if ( window.location.protocol !== "file:" ) {
			try {
				return new window.XMLHttpRequest();
			} catch(xhrError) {}
		}

		try {
			return new window.ActiveXObject("Microsoft.XMLHTTP");
		} catch(activeError) {}
	};
}

// Does this browser support XHR requests?
jQuery.support.ajax = !!jQuery.ajaxSettings.xhr();




var elemdisplay = {},
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)(.*)$/,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	];

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[i];
				display = elem.style.display;

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !jQuery.data(elem, "olddisplay") && display === "none" ) {
					display = elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( display === "" && jQuery.css( elem, "display" ) === "none" ) {
					jQuery.data(elem, "olddisplay", defaultDisplay(elem.nodeName));
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[i];
				display = elem.style.display;

				if ( display === "" || display === "none" ) {
					elem.style.display = jQuery.data(elem, "olddisplay") || "";
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				var display = jQuery.css( this[i], "display" );

				if ( display !== "none" ) {
					jQuery.data( this[i], "olddisplay", display );
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				this[i].style.display = "none";
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete );
		}

		return this[ optall.queue === false ? "each" : "queue" ](function() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			var opt = jQuery.extend({}, optall), p,
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				self = this;

			for ( p in prop ) {
				var name = jQuery.camelCase( p );

				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
					p = name;
				}

				if ( prop[p] === "hide" && hidden || prop[p] === "show" && !hidden ) {
					return opt.complete.call(this);
				}

				if ( isElement && ( p === "height" || p === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height
					// animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {
						if ( !jQuery.support.inlineBlockNeedsLayout ) {
							this.style.display = "inline-block";

						} else {
							var display = defaultDisplay(this.nodeName);

							// inline-level elements accept inline-block;
							// block-level elements need to be inline with layout
							if ( display === "inline" ) {
								this.style.display = "inline-block";

							} else {
								this.style.display = "inline";
								this.style.zoom = 1;
							}
						}
					}
				}

				if ( jQuery.isArray( prop[p] ) ) {
					// Create (if needed) and add to specialEasing
					(opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1];
					prop[p] = prop[p][0];
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			opt.curAnim = jQuery.extend({}, prop);

			jQuery.each( prop, function( name, val ) {
				var e = new jQuery.fx( self, opt, name );

				if ( rfxtypes.test(val) ) {
					e[ val === "toggle" ? hidden ? "show" : "hide" : val ]( prop );

				} else {
					var parts = rfxnum.exec(val),
						start = e.cur() || 0;

					if ( parts ) {
						var end = parseFloat( parts[2] ),
							unit = parts[3] || "px";

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( self, name, (end || 1) + unit);
							start = ((end || 1) / e.cur()) * start;
							jQuery.style( self, name, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			});

			// For JS strict compliance
			return true;
		});
	},

	stop: function( clearQueue, gotoEnd ) {
		var timers = jQuery.timers;

		if ( clearQueue ) {
			this.queue([]);
		}

		this.each(function() {
			// go in reverse order so anything added to the queue during the loop is ignored
			for ( var i = timers.length - 1; i >= 0; i-- ) {
				if ( timers[i].elem === this ) {
					if (gotoEnd) {
						// force the next step to be the last
						timers[i](true);
					}

					timers.splice(i, 1);
				}
			}
		});

		// start the next in the queue if the last step wasn't forced
		if ( !gotoEnd ) {
			this.dequeue();
		}

		return this;
	}

});

function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function() {
			if ( opt.queue !== false ) {
				jQuery(this).dequeue();
			}
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		if ( !options.orig ) {
			options.orig = {};
		}
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );
	},

	// Get the current size
	cur: function() {
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
			return this.elem[ this.prop ];
		}

		var r = parseFloat( jQuery.css( this.elem, this.prop ) );
		return r && r > -10000 ? r : 0;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = jQuery.now();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || "px";
		this.now = this.start;
		this.pos = this.state = 0;

		function t( gotoEnd ) {
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval(fx.tick, fx.interval);
		}
	},

	// Simple 'show' function
	show: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any
		// flash of content
		this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var t = jQuery.now(), done = true;

		if ( gotoEnd || t >= this.options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			this.options.curAnim[ this.prop ] = true;

			for ( var i in this.options.curAnim ) {
				if ( this.options.curAnim[i] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				// Reset the overflow
				if ( this.options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {
					var elem = this.elem,
						options = this.options;

					jQuery.each( [ "", "X", "Y" ], function (index, value) {
						elem.style[ "overflow" + value ] = options.overflow[index];
					} );
				}

				// Hide the element if the "hide" operation was done
				if ( this.options.hide ) {
					jQuery(this.elem).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( this.options.hide || this.options.show ) {
					for ( var p in this.options.curAnim ) {
						jQuery.style( this.elem, p, this.options.orig[p] );
					}
				}

				// Execute the complete function
				this.options.complete.call( this.elem );
			}

			return false;

		} else {
			var n = t - this.startTime;
			this.state = n / this.options.duration;

			// Perform the easing function, defaults to swing
			var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop];
			var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
			this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration);
			this.now = this.start + ((this.end - this.start) * this.pos);

			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timers = jQuery.timers;

		for ( var i = 0; i < timers.length; i++ ) {
			if ( !timers[i]() ) {
				timers.splice(i--, 1);
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

function defaultDisplay( nodeName ) {
	if ( !elemdisplay[ nodeName ] ) {
		var elem = jQuery("<" + nodeName + ">").appendTo("body"),
			display = elem.css("display");

		elem.remove();

		if ( display === "none" || display === "" ) {
			display = "block";
		}

		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) { 
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box || { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = (win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop ),
			scrollLeft = (win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft),
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) { 
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		jQuery.offset.initialize();

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {
	initialize: function() {
		var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.css(body, "marginTop") ) || 0,
			html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

		jQuery.extend( container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" } );

		container.innerHTML = html;
		body.insertBefore( container, body.firstChild );
		innerDiv = container.firstChild;
		checkDiv = innerDiv.firstChild;
		td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		checkDiv.style.position = "fixed";
		checkDiv.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
		checkDiv.style.position = checkDiv.style.top = "";

		innerDiv.style.overflow = "hidden";
		innerDiv.style.position = "relative";

		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

		body.removeChild( container );
		body = container = innerDiv = checkDiv = table = td = null;
		jQuery.offset.initialize = jQuery.noop;
	},

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		jQuery.offset.initialize();

		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},
	
	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = (position === "absolute" && jQuery.inArray('auto', [curCSSTop, curCSSLeft]) > -1),
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is absolute
		if ( calculatePosition ) {
			curPosition = curElem.position();
		}

		curTop  = calculatePosition ? curPosition.top  : parseInt( curCSSTop,  10 ) || 0;
		curLeft = calculatePosition ? curPosition.left : parseInt( curCSSLeft, 10 ) || 0;

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if (options.top != null) {
			props.top = (options.top - curOffset.top) + curTop;
		}
		if (options.left != null) {
			props.left = (options.left - curOffset.left) + curLeft;
		}
		
		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({
	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function(val) {
		var elem = this[0], win;
		
		if ( !elem ) {
			return null;
		}

		if ( val !== undefined ) {
			// Set the scroll offset
			return this.each(function() {
				win = getWindow( this );

				if ( win ) {
					win.scrollTo(
						!i ? val : jQuery(win).scrollLeft(),
						 i ? val : jQuery(win).scrollTop()
					);

				} else {
					this[ method ] = val;
				}
			});
		} else {
			win = getWindow( elem );

			// Return the scroll offset
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




// Create innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn["inner" + name] = function() {
		return this[0] ?
			parseFloat( jQuery.css( this[0], type, "padding" ) ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn["outer" + name] = function( margin ) {
		return this[0] ?
			parseFloat( jQuery.css( this[0], type, margin ? "margin" : "border" ) ) :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}
		
		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			return elem.document.compatMode === "CSS1Compat" && elem.document.documentElement[ "client" + name ] ||
				elem.document.body[ "client" + name ];

		// Get document width or height
		} else if ( elem.nodeType === 9 ) {
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		// Get or set width or height on the element
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNaN( ret ) ? orig : ret;

		// Set the width or height on the element (default to pixels if value is unitless)
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});


})(window);

/* >>>>>>>>>> BEGIN source/jquery-buffer.js */
// sc_require("jquery");
jQuery.Buffer = (function() {

  var Buffer = function(elem) {
    if (elem) this.assign(elem);

    // the internal buffer
    this._bufferedCommandList = [];
    this._bufferedCommands = {};
  };

  // the set of buffers
  Buffer._buffers = [];
  Buffer._pool = [];

  /**
    If there is already a buffer for the element, returns that. Otherwise, creates a new one.
  */
  Buffer.bufferForElement = function(elem) {
    if (elem._jquery_buffer) {
      return elem._jquery_buffer;
    }
    return this.bufferFromPool().assign(elem);
  };

  Buffer.bufferFromPool = function() {
    var buffer = null;
    if (this._pool.length === 0) {
      buffer = new Buffer();
    } else {
      buffer = this._pool.pop();
    }

    // add buffer
    Buffer._buffers.push(buffer);
    if (!this.flushingScheduled) this.scheduleFlushing();
    return buffer;
  };

  Buffer.returnToPool = function(buffer) {
    buffer.unassign();
    this._pool.push(buffer);
  };

  Buffer.scheduleFlushing = function() {
    this.flushingScheduled = true;
  };

  /**
    Flushes all of the buffers.
  */
  Buffer.flush = function() {
    // get the buffers
    var buffers = this._buffers, idx, len = buffers.length;
    for (idx = 0; idx < len; idx++) {
      buffers[idx].flush();
      this.returnToPool(buffers[idx]);
    }
    this._buffers = [];
    this.flushingScheduled = false;
  };

  /**
    Assigns an element to a buffer.
  */
  Buffer.prototype.assign = function(elem) {
    if (this._el) this.unassign();

    this._el = elem;
    this._el._jquery_buffer = this;
    return this;
  };

  Buffer.prototype.unassign = function() {
    if (!this._el) return;
    this._el._jquery_buffer = undefined;
    this._el = undefined;
    return this;
  };

  /**
    Flushes a buffer.
  */
  Buffer.prototype.flush = function() {
    var commands = this._bufferedCommandList, len = commands.length, idx, c;
    for (idx = 0; idx < len; idx++) {
      // get command name
      c = commands[idx];

      // run command
      this[c](this._bufferedCommands[c]);

      // remove from set now that we have run it.
      delete this._bufferedCommands[c];
    }

    this._bufferedCommandList.length = 0;
    this.unassign();
  };

  Buffer.prototype.$ = function(selector, context) {
    if (!context) context = this._el;
    if (selector === "" || selector === undefined) {
      selector = context; context = undefined;
    }
    return jQuery(selector, context);
  };

  /**
    Gets the buffered command, adding it to a buffer if needed.
  */
  Buffer.prototype.bufferedCommand = function(command) {
    // creates the buffered command if needed
    if (!this._bufferedCommands[command]) {
      // sets up the hash for the command
      this._bufferedCommands[command] = {};
      this._bufferedCommandList.push(command);
    }

    // return the buffered commands
    return this._bufferedCommands[command];
  };

  Buffer.prototype.hasBufferedCommand = function(command) {
    return !!this._bufferedCommands[command];
  };

  /**
    Applies HTML.
  */
  Buffer.prototype.html = function(value) {
    var context = this.bufferedCommand("flushContent");
    if (value === undefined) return context.text || context.html || this.$().html();

    context.text = undefined;
    context.html = value;
  };

  Buffer.prototype.text = function(value) {
    var context = this.bufferedCommand("flushContent");
    if (value === undefined) return context.text || context.html || this.$().text();

    context.text = value;
    context.html = undefined;
  };

  Buffer.prototype.flushContent = function(context) {
    if (context.text !== undefined) this.$().text(context.text);
    else if (context.html !== undefined) this.$().html(context.html);
  };



  /**
    Handles attribute setting.
  */
  Buffer.prototype.attr = function(key, value) {
    // first handle the key-as-object scenario
    if (typeof key === "object") {
      for (var k in key) this.attr(k, key[k]);
      return;
    }

    // now, if it is a special key, handle it specially.
    if (key === "class") {
      // note: setClass will return the value if "value" is undefined.
      if (value === undefined) return this.setClass(value).join(' ');
      else return this.setClass(value);
    } else if (key === "html") {
      return this.html(value);
    } else if (key === "text") {
      return this.text(value);
    } else if (key === 'style') {
      return this.resetStyles(value);
    }

    var context = this.bufferedCommand("flushAttributes");
    if (!context.attr) context.attr = {};
    context.attr[key] = value;
  };

  Buffer.prototype.flushAttributes = function(context) {
    var attr = context.attr, cq = this.$(), v;
    for (var key in attr) {
      if (!attr.hasOwnProperty(key)) continue;
      v = attr[key];
      if (v !== null) cq.attr(key, v);
      else cq.removeAttr(key);
    }
  };


  // 
  // SUPPORT FOR CSS STYLES
  //
  Buffer.prototype._STYLE_REGEX = /-?\s*([^:\s]+)\s*:\s*([^;]+)\s*;?/g;

  Buffer.prototype._camelizeStyleName = function(name) {
    // IE wants the first letter lowercase so we can allow normal behavior
    var needsCap = name.match(/^-(webkit|moz|o)-/),
        camelized = name.camelize();

    if (needsCap) {
      return camelized.substr(0,1).toUpperCase() + camelized.substr(1);
    } else {
      return camelized;
    }
  };

  Buffer.prototype._dasherizeStyleName = function(name) {
    var dasherized = name.dasherize();
    if (dasherized.match(/^(webkit|moz|ms|o)-/)) dasherized = '-'+dasherized;
    return dasherized;
  };

  Buffer.prototype._loadStyles = function(attr) {
    // parse style...
    if (!attr) attr = this.$().attr('style');
    
    if (attr && (attr = attr.toString()).length>0) {
      if(SC.browser.msie){ 
        attr = attr.toLowerCase();
      }
      var styles = {};
      
      var regex = this._STYLE_REGEX, match;
      regex.lastIndex = 0;
      
      while(match = regex.exec(attr)) styles[this._camelizeStyleName(match[1])] = match[2];
      
      return styles;
    } else {
      return { };
    }
  };

  Buffer.prototype.resetStyles = function(styles) {
    var context = this.bufferedCommand("flushStyles");
    context._styles = this._loadStyles(styles || " ");
  };

  Buffer.prototype.styles = function() {
    var context = this.bufferedCommand("flushStyles");
    if (!context._styles) context._styles = this._loadStyles();
    return context._styles;
  };

  Buffer.prototype.css = function(key, value) {
    if (typeof key === "object") {
      for (var k in key) this.css(k, key[k]);
      return;
    }

    var context = this.bufferedCommand("flushStyles");
    if (!context._styles) context._styles = this._loadStyles();

    context._styles[key] = value;
  };

  Buffer.prototype.flushStyles = function(context) {
    var styles = context._styles;
    var str = "";

    var key, value, props = [], idx = 0;
    for (key in styles) {
      if (!styles.hasOwnProperty(key)) continue;
      value = styles[key];
      if (value === null) continue;
      if (typeof value === "number" && key !== 'zIndex' && key !== "fontWeight" && key !== "opacity") value += "px";

      props[idx++] = this._dasherizeStyleName(key) + ": " + value;
    }

    this.$().attr("style", props.join("; "));
  };

  // 
  // SUPPORT FOR CLASS NAMES
  //
  Buffer.prototype._hashFromClassNames = function(classNames) {
    // split if needed
    if (typeof classNames === "string") classNames = classNames.split(" ");

    // and continue
    var idx, len = classNames.length, ret = {};
    for (idx = 0; idx < len; idx++) {
      ret[classNames[idx]] = true;
    }
    return ret;
  };

  Buffer.prototype.setClass = function(value, on) {
    var context = this.bufferedCommand("flushClassNames"), key;

    // if there is no value, that means we are trying to actually _get_ the class names.
    if (value === undefined) {
      if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);

      var classNames = context.classNames, v = [];
      for (key in classNames) if (key && classNames[key]) v.push(key);
      return v;
    }

    // if on is defined
    if (on !== undefined) {
      if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);
      context.classNames[value] = on || NO;
      return;
    }

    // if it is not, but we still have a string supplied (or array), we need to
    // just use that as the class names.
    if (typeof value === "string" || jQuery.isArray(value)) {
      context.classNames = this._hashFromClassNames(value);
      return;
    }

    // check value
    if (typeof value === "object") {
      // this is a hash
      if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);

      // loop over class names and set it properly.
      for (key in value) {
        context.classNames[key] = value[key];
      }
    }
  };

  Buffer.prototype.hasClass = function(className) {
    var context = this.bufferedCommand("flushClassNames");
    if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);
    return !!context.classNames[className];
  };
  
  Buffer.prototype.addClass = function(value) {
    if (!value) return;
    
    var context = this.bufferedCommand("flushClassNames");
    if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);
    
    if (typeof value === "string") value = value.split(' ');
    
    var idx, len = value.length;
    for (idx = 0; idx < len; idx++) context.classNames[jQuery.trim(value[idx])] = true;
  };

  Buffer.prototype.removeClass = function(value) {
    var context = this.bufferedCommand("flushClassNames");
    if (!context.classNames) context.classNames = this._hashFromClassNames(this._el.className);
    context.classNames[value] = false;
  };

  Buffer.prototype.resetClassNames = function(value) {
    var context = this.bufferedCommand("flushClassNames");
    context.classNames = {};
  };

  Buffer.prototype.flushClassNames = function(context) {
    var classNames = [];
    var c = context.classNames, k;
    for (k in c) if (c[k]) classNames.push(k)

    this.$().attr("class", classNames.join(" "));
  };


  /** DEBUGGING CODE */
  function dn(o) {
    for (var key in o) if (typeof o[key] === "function") o[key].displayName = key;
  }
  dn(Buffer);
  dn(Buffer.prototype);

  return Buffer;
})();

/* >>>>>>>>>> BEGIN source/jquery-buffered.js */
/*global Buffer */
// sc_require("jquery");
// sc_require("jquery-buffer");

(function() {

// Create Buffer Constructor
jQuery.buffer = jQuery.bufferedJQuery = function(selector, context) {
  return new jQuery.bufferedJQuery.prototype.init(selector, context);
};

// Base it on jquery
var T = function() { };
T.prototype = jQuery.fn;
jQuery.bufferedJQuery.prototype = new T();

// keep track of whether buffering is active
jQuery._isBuffering = 0;

// relay init properly
jQuery.bufferedJQuery.prototype.init = function(selector, context) {
  jQuery._isBuffering++;
  var ret = jQuery.fn.init.call(this, selector, context);
  ret.isBuffered = true;
  jQuery._isBuffering--;
  return ret;
};

// set prototype of init to the buffer prototype.
jQuery.bufferedJQuery.prototype.init.prototype = jQuery.bufferedJQuery.prototype;

/**
  Actually subclass jQuery now.
*/
var base = jQuery.fn;

jQuery.fn.extend({

  /**
    Returns an array of buffers for the elements. This is mostly here for illustration; the
    built-in buffered commands inline the logic for performance.
  */
  buffers: function() {
    var len = this.length, i, r = [];
    for (i = 0; i < len; i++) {
      r.push(jQuery.Buffer.bufferForElement(this[i]));
    }
    return r;
  }

});

/*
  Replace jQuery's find() to make the results buffered.
*/
jQuery.fn._jqb_originalFind = jQuery.fn.find;
jQuery.fn.find = function(selector) {
  // if we are not currently buffering, don't bother with this crap.
  if (jQuery._isBuffering <= 0 && !this.isBuffered) return jQuery.fn._jqb_originalFind.call(this, selector);

	var ret = jQuery.buffer(), length = 0;

	for ( var i = 0, l = this.length; i < l; i++ ) {
		length = ret.length;
		jQuery.find( selector, this[i], ret );

		if ( i > 0 ) {
			// Make sure that the results are unique
			for ( var n = length; n < ret.length; n++ ) {
				for ( var r = 0; r < length; r++ ) {
					if ( ret[r] === ret[n] ) {
						ret.splice(n--, 1);
						break;
					}
				}
			}
		}
	}

	return ret;
};

jQuery.extend(jQuery.bufferedJQuery.prototype, {

  html: function(value) {
    // if there is no value, we don't handle it.
    if (value === undefined) {
      if (this.length < 1) return undefined;
      return jQuery.Buffer.bufferForElement(this[i]).html();
    }

    // there is a vlaue. We are going to do it like jquery, but different.
    // in this, we inline "buffers" above
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.html(value);
    }
    return this;
  },

  text: function(value) {
    if (value === undefined) {
      if (this.length < 1) return undefined;
      return jQuery.Buffer.bufferForElement(this[i]).text();
    }

    // there is a vlaue. We are going to do it like jquery, but different.
    // in this, we inline "buffers" above
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.text(value);
    }
    return this;
  },

  attr: function(key, value) {
    // first, handle the get-case
    if (typeof value === "undefined" && typeof key === "string") {
      if (this.length < 1) return false;
      var buffer = jQuery.Buffer.bufferForElement(this[0]);
      return buffer.attr(key);
    }

    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.attr(key, value);
    }
    return this;
  },

  hasClass: function(className) {
    if (this.length < 1) return false;
    return jQuery.Buffer.bufferForElement(this[0]).hasClass(className);
  },
  
  setClass: function(value, on) {
    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.setClass(value, on);
    }
    return this;
  },

  addClass: function(value) {
    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.addClass(value);
    }
    return this;
  },

  removeClass: function(value) {
    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.removeClass(value);
    }
    return this;
  },

  resetClassNames: function() {
    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.resetClassNames();
    }
    return this;
  },

  css: function(key, value) {
    // now, buffer the command.
    var len = this.length, i;
    for (i = 0; i < len; i++) {
      var buffer = jQuery.Buffer.bufferForElement(this[i]);
      buffer.css(key, value);
    }
    return this;
  },

  styles: function() {
    if (this.length < 1) return null;
    return jQuery.Buffer.bufferForElement(this[0]).styles();
  },

  resetStyles: function() {
    if (this.length < 1) return null;
    jQuery.Buffer.bufferForElement(this[0]).resetStyles();
    return this;
  }

});



})();

/* >>>>>>>>>> BEGIN source/jquery-sc.js */
// sc_require("jquery-buffer");
jQuery.Buffer.scheduleFlushing = function() {
  SC.RunLoop.currentRunLoop.invokeOnce(function() {
    jQuery.Buffer.flush()
  });
  this.flushingScheduled = true;
};


/* >>>>>>>>>> BEGIN javascript.js */
/* >>>>>>>>>> BEGIN source/license.js */
/**
 * @license
 * ==========================================================================
 * SproutCore Costello -- Property Observing Library
 * Copyright ©2006-2011, Strobe Inc. and contributors.
 * Portions copyright ©2008-2010 Apple Inc. All rights reserved.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 * For more information about SproutCore, visit http://www.sproutcore.com
 * 
 * ==========================================================================
 */

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/*global NodeList */
// These commands are used by the build tools to control load order.  On the
// client side these are a no-op.
if (!window.require) { window.require = function require(){}; }
if (!window.sc_require) { window.sc_require = require };
if (!window.sc_resource) {window.sc_resource = function sc_resource(){}; }
sc_require('license') ;

// ........................................
// GLOBAL CONSTANTS
//
// Most global constants should be defined inside of the SC namespace.
// However the following two are useful enough and generally benign enough
// to put into the global object.
window.YES = true ;
window.NO = false ;

// prevent a console.log from blowing things up if we are on a browser that
// does not support it
if (typeof console === 'undefined') {
  window.console = {} ;
  console.log = console.info = console.warn = console.error = function(){};
}

// ........................................
// BOOTSTRAP
//
// The root namespace and some common utility methods are defined here. The
// rest of the methods go into the mixin defined below.

/**
  @version 1.5.0.pre.4
  @namespace

  The SproutCore namespace.  All SproutCore methods and functions are defined
  inside of this namespace.  You generally should not add new properties to
  this namespace as it may be overwritten by future versions of SproutCore.

  You can also use the shorthand "SC" instead of "SproutCore".

  SproutCore-Base is a framework that provides core functions for SproutCore
  including cross-platform functions, support for property observing and
  objects.  It's focus is on small size and performance.  You can use this
  in place of or along-side other cross-platform libraries such as jQuery or
  Prototype.

  The core Base framework is based on the jQuery API with a number of
  performance optimizations.
*/
window.SC = window.SC || {} ;
window.SproutCore = window.SproutCore || SC ;

SC.VERSION = '1.5.0.pre.4';

/**
  @private

  Adds properties to a target object. You must specify whether
  to overwrite a value for a property or not.

  Used as a base function for the wrapper functions SC.mixin and SC.supplement.

  @param overwrite {Boolean} if a target has a value for a property, this specifies
                  whether or not to overwrite that value with the copyied object's
                  property value.
  @param target {Object} the target object to extend
  @param properties {Object} one or more objects with properties to copy.
  @returns {Object} the target object.
  @static
*/
SC._baseMixin = function (override) {
  var args = Array.prototype.slice.call(arguments, 1), src,
  // copy reference to target object
      target = args[0] || {},
      idx = 1,
      length = args.length ,
      options, copy , key;

  // Handle case where we have only one item...extend SC
  if (length === 1) {
    target = this || {};
    idx=0;
  }

  for ( ; idx < length; idx++ ) {
    if (!(options = args[idx])) continue ;
    for(key in options) {
      if (!options.hasOwnProperty(key)) continue ;
      copy = options[key] ;
      if (target===copy) continue ; // prevent never-ending loop
      if (copy !== undefined && ( override || (target[key] === undefined) )) target[key] = copy ;
    }
  }

  return target;
} ;

/**
  Adds properties to a target object.

  Takes the root object and adds the attributes for any additional
  arguments passed.

  @param target {Object} the target object to extend
  @param properties {Object} one or more objects with properties to copy.
  @returns {Object} the target object.
  @static
*/
SC.mixin = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(true);
  return SC._baseMixin.apply(this, args);
} ;

/**
  Adds properties to a target object.  Unlike SC.mixin, however, if the target
  already has a value for a property, it will not be overwritten.

  Takes the root object and adds the attributes for any additional
  arguments passed.

  @param target {Object} the target object to extend
  @param properties {Object} one or more objects with properties to copy.
  @returns {Object} the target object.
  @static
*/
SC.supplement = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(false);
  return SC._baseMixin.apply(this, args);
} ;

/**
  Alternative to mixin.  Provided for compatibility with jQuery.
  @function
*/
SC.extend = SC.mixin ;

// ..........................................................
// CORE FUNCTIONS
//
// Enough with the bootstrap code.  Let's define some core functions

SC.mixin(/** @scope SC */ {

  // ........................................
  // GLOBAL CONSTANTS
  //
  T_ERROR:     'error',
  T_OBJECT:    'object',
  T_NULL:      'null',
  T_CLASS:     'class',
  T_HASH:      'hash',
  T_FUNCTION:  'function',
  T_UNDEFINED: 'undefined',
  T_NUMBER:    'number',
  T_BOOL:      'boolean',
  T_ARRAY:     'array',
  T_STRING:    'string',

  // ........................................
  // TYPING & ARRAY MESSAGING
  //

  /**
    Returns a consistant type for the passed item.

    Use this instead of the built-in typeOf() to get the type of an item.
    It will return the same result across all browsers and includes a bit
    more detail.  Here is what will be returned:

    | Return Value Constant | Meaning |
    | SC.T_STRING | String primitive |
    | SC.T_NUMBER | Number primitive |
    | SC.T_BOOLEAN | Boolean primitive |
    | SC.T_NULL | Null value |
    | SC.T_UNDEFINED | Undefined value |
    | SC.T_FUNCTION | A function |
    | SC.T_ARRAY | An instance of Array |
    | SC.T_CLASS | A SproutCore class (created using SC.Object.extend()) |
    | SC.T_OBJECT | A SproutCore object instance |
    | SC.T_HASH | A JavaScript object not inheriting from SC.Object |

    @param item {Object} the item to check
    @returns {String} the type
  */
  typeOf: function(item) {
    if (item === undefined) return SC.T_UNDEFINED ;
    if (item === null) return SC.T_NULL ;

    var nativeType = jQuery.type(item);

    if (nativeType === "function") {
      return item.isClass ? SC.T_CLASS : SC.T_FUNCTION;
    } else if (nativeType === "object") {
      if (item.isError) {
        return SC.T_ERROR ;
      } else if (item.isObject) {
        return SC.T_OBJECT ;
      } else {
        return SC.T_HASH ;
      }
    }

    return nativeType ;
  },

  /**
    Returns YES if the passed value is null or undefined.  This avoids errors
    from JSLint complaining about use of ==, which can be technically
    confusing.

    @param {Object} obj value to test
    @returns {Boolean}
  */
  none: function(obj) {
    return obj == null;
  },

  /**
    Verifies that a value is either null or an empty string. Return false if
    the object is not a string.

    @param {Object} obj value to test
    @returns {Boolean}
  */
  empty: function(obj) {
    return obj === null || obj === undefined || obj === '';
  },

  /**
    Returns YES if the passed object is an array or Array-like.

    SproutCore Array Protocol:
    * the object has an objectAt property; or
    * the object is a native Array; or
    * the object is an Object, and has a length property

    Unlike SC.typeOf this method returns true even if the passed object is
    not formally array but appears to be array-like (i.e. has a length
    property, responds to .objectAt, etc.)

    @param obj {Object} the object to test
    @returns {Boolean}
  */
  isArray: function(obj) {
    if ( !obj || obj.setInterval ) {
      return false;
    } else if ( obj.objectAt ) {
      return true ;
    } else if ( obj.length !== undefined && jQuery.type(obj) === "object" ) {
      return true;
    }

    return false;
  },

  /**
    Makes an object into an Array if it is not array or array-like already.
    Unlike SC.A(), this method will not clone the object if it is already
    an array.

    @param {Object} obj object to convert
    @returns {Array} Actual array
  */
  makeArray: function(obj) {
    return SC.isArray(obj) ? obj : SC.A(obj);
  },

  /**
    Converts the passed object to an Array.  If the object appears to be
    array-like, a new array will be cloned from it.  Otherwise, a new array
    will be created with the item itself as the only item in the array.

    @param object {Object} any enumerable or array-like object.
    @returns {Array} Array of items
  */
  A: function(obj) {
    // null or undefined -- fast path
    if ( obj === null || obj === undefined ) return [] ;

    // primitive -- fast path
    if ( obj.slice instanceof Function ) {
      // do we have a string?
      if ( typeof(obj) === 'string' ) return [obj] ;
      else return obj.slice() ;
    }

    // enumerable -- fast path
    if (obj.toArray) return obj.toArray() ;

    // if not array-like, then just wrap in array.
    if (!SC.isArray(obj)) return [obj];

    // when all else fails, do a manual convert...
    var ret = [], len = obj.length;
    while(--len >= 0) ret[len] = obj[len];
    return ret ;
  },

  //
  // GUIDS & HASHES
  //

  guidKey: jQuery.expando || ("SproutCore" + ( SC.VERSION + Math.random() ).replace( /\D/g, "" )),

  // Used for guid generation...
  _guidPrefixes: {"number": "nu", "string": "st"},
  _guidCaches:   {"number": {},   "string": {}},
  _numberGuids: [], _stringGuids: {}, _keyCache: {},

  /**"
    Returns a unique GUID for the object.  If the object does not yet have
    a guid, one will be assigned to it.  You can call this on any object,
    SC.Object-based or not, but be aware that it will add a _guid property.

    You can also use this method on DOM Element objects.

    @param obj {Object} any object, string, number, Element, or primitive
    @returns {String} the unique guid for this instance.
  */
  guidFor: function(obj) {
    var cache, ret,
        type = typeof obj;

    // special cases where we don't want to add a key to object
    if (obj === undefined) return "(undefined)";
    if (obj === null) return "(null)";

    // Don't allow prototype changes to String etc. to change the guidFor
    if (type === SC.T_NUMBER || type === SC.T_STRING) {
      cache = this._guidCaches[type];
      ret   = cache[obj];
      if(!ret) {
        ret        = "st" + (jQuery.uuid++);
        cache[obj] = ret;
      }
      return ret;
    } else if (type === SC.T_BOOL) {
      return (obj) ? "(true)" : "(false)";
    }

    var guidKey = this.guidKey;
    if (obj[guidKey]) return obj[guidKey];

    // More special cases; not as common, so we check for them after the cache
    // lookup
    if (obj === Object) return '(Object)';
    if (obj === Array) return '(Array)';

    return SC.generateGuid(obj, "sc");
  },

  /**
    Returns a key name that combines the named key + prefix.  This is more
    efficient than simply combining strings because it uses a cache
    internally for performance.

    @param {String} prefix the prefix to attach to the key
    @param {String} key key
    @returns {String} result
  */
  keyFor: function(prefix, key) {
    var ret, pcache = this._keyCache[prefix];
    if (!pcache) pcache = this._keyCache[prefix] = {}; // get cache for prefix
    ret = pcache[key];
    if (!ret) ret = pcache[key] = prefix + '_' + key ;
    return ret ;
  },

  /**
    Generates a new guid, optionally saving the guid to the object that you
    pass in.  You will rarely need to use this method.  Instead you should
    call SC.guidFor(obj), which return an existing guid if available.

    @param {Object} obj the object to assign the guid to
    @returns {String} the guid
  */
  generateGuid: function(obj, prefix) {
    var ret = (prefix + (jQuery.uuid++));
    if (obj) obj[this.guidKey] = ret ;
    return ret ;
  },

  /**
    Returns a unique hash code for the object. If the object implements
    a hash() method, the value of that method will be returned. Otherwise,
    this will return the same value as guidFor().

    If you pass multiple arguments, hashFor returns a string obtained by
    concatenating the hash code of each argument.

    Unlike guidFor(), this method allows you to implement logic in your
    code to cause two separate instances of the same object to be treated as
    if they were equal for comparisons and other functions.

    IMPORTANT: If you implement a hash() method, it MUST NOT return a
    number or a string that contains only a number. Typically hash codes
    are strings that begin with a "%".

    @param obj {Object} the object(s)
    @returns {String} the hash code for this instance.
  */
  hashFor: function() {
    var l = arguments.length,
        h = '',
        obj, f, i;

    for (i=0 ; i<l; ++i) {
      obj = arguments[i];
      h += (obj && (f = obj.hash) && (typeof f === SC.T_FUNCTION)) ? f.call(obj) : this.guidFor(obj);
    }

    return h === '' ? null : h;
  },

  /**
    This will compare the two object values using their hash codes.

    @param a {Object} first value to compare
    @param b {Object} the second value to compare
    @returns {Boolean} YES if the two have equal hash code values.

  */
  isEqual: function(a,b) {
    // QUESTION: is there a compelling performance reason to special-case
    // undefined here?
    return this.hashFor(a) === this.hashFor(b) ;
  },

  /**
   This will compare two javascript values of possibly different types.
   It will tell you which one is greater than the other by returning
   -1 if the first is smaller than the second,
    0 if both are equal,
    1 if the first is greater than the second.

   The order is calculated based on SC.ORDER_DEFINITION , if types are different.
   In case they have the same type an appropriate comparison for this type is made.

   @param v {Object} first value to compare
   @param w {Object} the second value to compare
   @returns {NUMBER} -1 if v < w, 0 if v = w and 1 if v > w.

  */
  compare: function (v, w) {
    // Doing a '===' check is very cheap, so in the case of equality, checking
    // this up-front is a big win.
    if (v === w) return 0;

    var type1 = SC.typeOf(v);
    var type2 = SC.typeOf(w);

    // If we haven't yet generated a reverse-mapping of SC.ORDER_DEFINITION,
    // do so now.
    var mapping = SC.ORDER_DEFINITION_MAPPING;
    if (!mapping) {
      var order = SC.ORDER_DEFINITION;
      mapping = SC.ORDER_DEFINITION_MAPPING = {};
      var idx, len;
      for (idx = 0, len = order.length;  idx < len;  ++idx) {
        mapping[order[idx]] = idx;
      }

      // We no longer need SC.ORDER_DEFINITION.
      delete SC.ORDER_DEFINITION;
    }

    var type1Index = mapping[type1];
    var type2Index = mapping[type2];

    if (type1Index < type2Index) return -1;
    if (type1Index > type2Index) return 1;

    // ok - types are equal - so we have to check values now
    switch (type1) {
      case SC.T_BOOL:
      case SC.T_NUMBER:
        if (v<w) return -1;
        if (v>w) return 1;
        return 0;

      case SC.T_STRING:
        var comp = v.localeCompare(w);
        if (comp<0) return -1;
        if (comp>0) return 1;
        return 0;

      case SC.T_ARRAY:
        var vLen = v.length;
        var wLen = w.length;
        var l = Math.min(vLen, wLen);
        var r = 0;
        var i = 0;
        var thisFunc = arguments.callee;
        while (r===0 && i < l) {
          r = thisFunc(v[i],w[i]);
          i++;
        }
        if (r !== 0) return r;

        // all elements are equal now
        // shorter array should be ordered first
        if (vLen < wLen) return -1;
        if (vLen > wLen) return 1;
        // arrays are equal now
        return 0;

      case SC.T_OBJECT:
        if (v.constructor.isComparable === YES) return v.constructor.compare(v, w);
        return 0;

      default:
        return 0;
    }
  },

  // ..........................................................
  // OBJECT MANAGEMENT
  //

  /**
    Empty function.  Useful for some operations.

    @returns {Object}
  */
  K: function() { return this; },

  /**
    Empty array.  Useful for some optimizations.

    @property {Array}
  */
  EMPTY_ARRAY: [],

  /**
    Empty hash.  Useful for some optimizations.

    @property {Hash}
  */
  EMPTY_HASH: {},

  /**
    Empty range. Useful for some optimizations.

    @property {Range}
  */
  EMPTY_RANGE: {start: 0, length: 0},

  /**
    Creates a new object with the passed object as its prototype.

    This method uses JavaScript's native inheritence method to create a new
    object.

    You cannot use beget() to create new SC.Object-based objects, but you
    can use it to beget Arrays, Hashes, Sets and objects you build yourself.
    Note that when you beget() a new object, this method will also call the
    didBeget() method on the object you passed in if it is defined.  You can
    use this method to perform any other setup needed.

    In general, you will not use beget() often as SC.Object is much more
    useful, but for certain rare algorithms, this method can be very useful.

    For more information on using beget(), see the section on beget() in
    Crockford's JavaScript: The Good Parts.

    @param obj {Object} the object to beget
    @returns {Object} the new object.
  */
  beget: function(obj) {
    if (obj === null || obj === undefined) return null ;
    var K = SC.K; K.prototype = obj ;
    var ret = new K();
    K.prototype = null ; // avoid leaks
    if (typeof obj.didBeget === "function") ret = obj.didBeget(ret);
    return ret ;
  },

  /**
    Creates a clone of the passed object.  This function can take just about
    any type of object and create a clone of it, including primitive values
    (which are not actually cloned because they are immutable).

    If the passed object implements the clone() method, then this function
    will simply call that method and return the result.

    @param object {Object} the object to clone
    @param deep {Boolean} if true, a deep copy of the object is made
    @returns {Object} the cloned object
  */
  copy: function(object, deep) {
    var ret = object, idx ;

    // fast paths
    if ( object ) {
      if ( object.isCopyable ) return object.copy( deep );
      if ( object.clone )      return object.clone();
    }

    switch ( jQuery.type(object) ) {
    case "array":
      ret = object.slice();

      if ( deep ) {
        idx = ret.length;
        while ( idx-- ) { ret[idx] = SC.copy( ret[idx], true ); }
      }
      break ;

    case "object":
      ret = {} ;
      for(var key in object) { ret[key] = deep ? SC.copy(object[key], true) : object[key] ; }
    }

    return ret ;
  },

  /**
    Returns a new object combining the values of all passed hashes.

    @param object {Object} one or more objects
    @returns {Object} new Object
  */
  merge: function() {
    var ret = {}, len = arguments.length, idx;
    for(idx=0; idx<len; idx++) SC.mixin(ret, arguments[idx]);
    return ret ;
  },

  /**
    Returns all of the keys defined on an object or hash.  This is useful
    when inspecting objects for debugging.

    @param {Object} obj
    @returns {Array} array of keys
  */
  keys: function(obj) {
    var ret = [];
    for(var key in obj) ret.push(key);
    return ret;
  },

  /**
    Convenience method to inspect an object.  This method will attempt to
    convert the object into a useful string description.
  */
  inspect: function(obj) {
    var v, ret = [] ;
    for(var key in obj) {
      v = obj[key] ;
      if (v === 'toString') continue ; // ignore useless items
      if (SC.typeOf(v) === SC.T_FUNCTION) v = "function() { ... }" ;
      ret.push(key + ": " + v) ;
    }
    return "{" + ret.join(" , ") + "}" ;
  },

  /**
    Returns a tuple containing the object and key for the specified property
    path.  If no object could be found to match the property path, then
    returns null.

    This is the standard method used throughout SproutCore to resolve property
    paths.

    @param path {String} the property path
    @param root {Object} optional parameter specifying the place to start
    @returns {Array} array with [object, property] if found or null
  */
  tupleForPropertyPath: function(path, root) {

    // if the passed path is itself a tuple, return it
    if (typeof path === "object" && (path instanceof Array)) return path ;

    // find the key.  It is the last . or first *
    var key ;
    var stopAt = path.indexOf('*') ;
    if (stopAt < 0) stopAt = path.lastIndexOf('.') ;
    key = (stopAt >= 0) ? path.slice(stopAt+1) : path ;

    // convert path to object.
    var obj = this.objectForPropertyPath(path, root, stopAt) ;
    return (obj && key) ? [obj,key] : null ;
  },

  /**
    Finds the object for the passed path or array of path components.  This is
    the standard method used in SproutCore to traverse object paths.

    @param path {String} the path
    @param root {Object} optional root object.  window is used otherwise
    @param stopAt {Integer} optional point to stop searching the path.
    @returns {Object} the found object or undefined.
  */
  objectForPropertyPath: function(path, root, stopAt) {

    var loc, nextDotAt, key, max ;

    if (!root) root = window ;

    // faster method for strings
    if (SC.typeOf(path) === SC.T_STRING) {
      if (stopAt === undefined) stopAt = path.length ;
      loc = 0 ;
      while((root) && (loc < stopAt)) {
        nextDotAt = path.indexOf('.', loc) ;
        if ((nextDotAt < 0) || (nextDotAt > stopAt)) nextDotAt = stopAt;
        key = path.slice(loc, nextDotAt);
        root = root.get ? root.get(key) : root[key] ;
        loc = nextDotAt+1;
      }
      if (loc < stopAt) root = undefined; // hit a dead end. :(

    // older method using an array
    } else {

      loc = 0; max = path.length; key = null;
      while((loc < max) && root) {
        key = path[loc++];
        if (key) root = (root.get) ? root.get(key) : root[key] ;
      }
      if (loc < max) root = undefined ;
    }

    return root ;
  },


  // ..........................................................
  // LOCALIZATION SUPPORT
  //

  /**
    Known loc strings

    @property {Hash}
  */
  STRINGS: {},

  /**
    This is a simplified handler for installing a bunch of strings.  This
    ignores the language name and simply applies the passed strings hash.

    @param {String} lang the language the strings are for
    @param {Hash} strings hash of strings
    @returns {SC} receiver
  */
  stringsFor: function(lang, strings) {
    SC.mixin(SC.STRINGS, strings);
    return this ;
  }


}); // end mixin

/** @private Aliasn for SC.clone() */
SC.clone = SC.copy ;

/** @private Alias for SC.A() */
SC.$A = SC.A;

/** @private Provided for compatibility with old HTML templates. */
SC.didLoad = SC.K ;

/** @private Used by SC.compare */
SC.ORDER_DEFINITION = [ SC.T_ERROR,
                        SC.T_UNDEFINED,
                        SC.T_NULL,
                        SC.T_BOOL,
                        SC.T_NUMBER,
                        SC.T_STRING,
                        SC.T_ARRAY,
                        SC.T_HASH,
                        SC.T_OBJECT,
                        SC.T_FUNCTION,
                        SC.T_CLASS ];


// ........................................
// FUNCTION ENHANCEMENTS
//

SC.Function = {
  property: function(fn, keys) {
    fn.dependentKeys = SC.$A(keys) ;
    var guid = SC.guidFor(fn) ;
    fn.cacheKey = "__cache__" + guid ;
    fn.lastSetValueKey = "__lastValue__" + guid ;
    fn.isProperty = true ;
    return fn ;
  },

  cacheable: function(fn, aFlag) {
    fn.isProperty = true ;  // also make a property just in case
    if (!fn.dependentKeys) fn.dependentKeys = [] ;
    fn.isCacheable = (aFlag === undefined) ? true : aFlag ;
    return fn ;
  },

  idempotent: function(fn, aFlag) {
    fn.isProperty = true;  // also make a property just in case
    if (!fn.dependentKeys) this.dependentKeys = [] ;
    fn.isVolatile = (aFlag === undefined) ? true : aFlag ;
    return fn ;
  },

  enhance: function(fn) {
    fn.isEnhancement = true;
    return fn ;
  },

  observes: function(fn, propertyPaths) {
    // sort property paths into local paths (i.e just a property name) and
    // full paths (i.e. those with a . or * in them)
    var loc = propertyPaths.length, local = null, paths = null ;
    while(--loc >= 0) {
      var path = propertyPaths[loc] ;
      // local
      if ((path.indexOf('.')<0) && (path.indexOf('*')<0)) {
        if (!local) local = fn.localPropertyPaths = [] ;
        local.push(path);

      // regular
      } else {
        if (!paths) paths = fn.propertyPaths = [] ;
        paths.push(path) ;
      }
    }
    return fn ;
  }

};

SC.mixin(Function.prototype,
/** @lends Function.prototype */ {

  /**
    Indicates that the function should be treated as a computed property.

    Computed properties are methods that you want to treat as if they were
    static properties.  When you use get() or set() on a computed property,
    the object will call the property method and return its value instead of
    returning the method itself.  This makes it easy to create "virtual
    properties" that are computed dynamically from other properties.

    Consider the following example:

    {{{
      contact = SC.Object.create({

        firstName: "Charles",
        lastName: "Jolley",

        // This is a computed property!
        fullName: function() {
          return this.getEach('firstName','lastName').compact().join(' ') ;
        }.property('firstName', 'lastName'),

        // this is not
        getFullName: function() {
          return this.getEach('firstName','lastName').compact().join(' ') ;
        }
      });

      contact.get('firstName') ;
      --> "Charles"

      contact.get('fullName') ;
      --> "Charles Jolley"

      contact.get('getFullName') ;
      --> function()
    }}}

    Note that when you get the fullName property, SproutCore will call the
    fullName() function and return its value whereas when you get() a property
    that contains a regular method (such as getFullName above), then the
    function itself will be returned instead.

    h2. Using Dependent Keys

    Computed properties are often computed dynamically from other member
    properties.  Whenever those properties change, you need to notify any
    object that is observing the computed property that the computed property
    has changed also.  We call these properties the computed property is based
    upon "dependent keys".

    For example, in the contact object above, the fullName property depends on
    the firstName and lastName property.  If either property value changes,
    any observer watching the fullName property will need to be notified as
    well.

    You inform SproutCore of these dependent keys by passing the key names
    as parameters to the property() function.  Whenever the value of any key
    you name here changes, the computed property will be marked as changed
    also.

    You should always register dependent keys for computed properties to
    ensure they update.

    h2. Using Computed Properties as Setters

    Computed properties can be used to modify the state of an object as well
    as to return a value.  Unlike many other key-value system, you use the
    same method to both get and set values on a computed property.  To
    write a setter, simply declare two extra parameters: key and value.

    Whenever your property function is called as a setter, the value
    parameter will be set.  Whenever your property is called as a getter the
    value parameter will be undefined.

    For example, the following object will split any full name that you set
    into a first name and last name components and save them.

    {{{
      contact = SC.Object.create({

        fullName: function(key, value) {
          if (value !== undefined) {
            var parts = value.split(' ') ;
            this.beginPropertyChanges()
              .set('firstName', parts[0])
              .set('lastName', parts[1])
            .endPropertyChanges() ;
          }
          return this.getEach('firstName', 'lastName').compact().join(' ');
        }.property('firstName','lastName')

      }) ;

    }}}

    h2. Why Use The Same Method for Getters and Setters?

    Most property-based frameworks expect you to write two methods for each
    property but SproutCore only uses one. We do this because most of the time
    when you write a setter is is basically a getter plus some extra work.
    There is little added benefit in writing both methods when you can
    conditionally exclude part of it. This helps to keep your code more
    compact and easier to maintain.

    @param dependentKeys {String...} optional set of dependent keys
    @returns {Function} the declared function instance
  */
  property: function() {
    return SC.Function.property(this, arguments);
  },

  /**
    You can call this method on a computed property to indicate that the
    property is cacheable (or not cacheable).  By default all computed
    properties are not cached.  Enabling this feature will allow SproutCore
    to cache the return value of your computed property and to use that
    value until one of your dependent properties changes or until you
    invoke propertyDidChange() and name the computed property itself.

    If you do not specify this option, computed properties are assumed to be
    not cacheable.

    @param {Boolean} aFlag optionally indicate cacheable or no, default YES
    @returns {Function} reciever
  */
  cacheable: function(aFlag) {
    return SC.Function.cacheable(this, aFlag);
  },

  /**
    Indicates that the computed property is volatile.  Normally SproutCore
    assumes that your computed property is idempotent.  That is, calling
    set() on your property more than once with the same value has the same
    effect as calling it only once.

    All non-computed properties are idempotent and normally you should make
    your computed properties behave the same way.  However, if you need to
    make your property change its return value everytime your method is
    called, you may chain this to your property to make it volatile.

    If you do not specify this option, properties are assumed to be
    non-volatile.

    @param {Boolean} aFlag optionally indicate state, default to YES
    @returns {Function} receiver
  */
  idempotent: function(aFlag) {
    return SC.Function.idempotent(this, aFlag);
  },

  enhance: function() {
    return SC.Function.enhance(this);
  },

  /**
    Declare that a function should observe an object at the named path.  Note
    that the path is used only to construct the observation one time.

    @returns {Function} receiver
  */
  observes: function(propertyPaths) {
    return SC.Function.observes(this, arguments);
  }

});

SC.CoreString = {
  fmt: function(str, formats) {
    // first, replace any ORDERED replacements.
    var idx  = 0; // the current index for non-numerical replacements
    return str.replace(/%@([0-9]+)?/g, function(s, argIndex) {
      argIndex = (argIndex) ? parseInt(argIndex,0) - 1 : idx++ ;
      s = formats[argIndex];
      return ((s === null) ? '(null)' : (s === undefined) ? '' : s).toString();
    }) ;
  },
  loc: function(str, formats) {
    str = SC.STRINGS[str] || str;
    return SC.CoreString.fmt(str, arguments) ;
  },
  w: function(str) {
    var ary = [], ary2 = str.split(' '), len = ary2.length, string, idx=0;
    for (idx=0; idx<len; ++idx) {
      string = ary2[idx] ;
      if (string.length !== 0) ary.push(string) ; // skip empty strings
    }
    return ary ;
  }
};

SC.mixin(String.prototype,
/** @lends Function.prototype */ {

  // ..........................................................
  // STRING ENHANCEMENT
  //

  // Interpolate string. looks for %@ or %@1; to control the order of params.
  /**
    Apply formatting options to the string.  This will look for occurrences
    of %@ in your string and substitute them with the arguments you pass into
    this method.  If you want to control the specific order of replacement,
    you can add a number after the key as well to indicate which argument
    you want to insert.

    Ordered insertions are most useful when building loc strings where values
    you need to insert may appear in different orders.

    h3. Examples

    {{{
      "Hello %@ %@".fmt('John', 'Doe') => "Hello John Doe"
      "Hello %@2, %@1".fmt('John', 'Doe') => "Hello Doe, John"
    }}}

    @param args {Object...} optional arguments
    @returns {String} formatted string
  */
  fmt: function() {
    return SC.CoreString.fmt(this, arguments);
  },

  /**
    Localizes the string.  This will look up the reciever string as a key
    in the current Strings hash.  If the key matches, the loc'd value will be
    used.  The resulting string will also be passed through fmt() to insert
    any variables.

    @param args {Object...} optional arguments to interpolate also
    @returns {String} the localized and formatted string.
  */
  loc: function() {
    return SC.CoreString.loc(this, arguments);
  },



  /**
    Splits the string into words, separated by spaces. Empty strings are
    removed from the results.

    @returns {Array} an array of non-empty strings
  */
  w: function() {
    return SC.CoreString.w(this);
  }
});

//
// DATE ENHANCEMENT
//
if (!Date.now) {
  Date.now = function() {
    return new Date().getTime() ;
  };
}


/* >>>>>>>>>> BEGIN __sc_chance.js */

/* >>>>>>>>>> BEGIN source/private/observer_set.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

// ........................................................................
// ObserverSet
//

/**
  @namespace

  This private class is used to store information about obversers on a
  particular key.  Note that this object is not observable.  You create new
  instances by calling SC.beget(SC.ObserverSet) ;

  @since SproutCore 1.0
*/
SC.ObserverSet = {

  /**
    Adds the named target/method observer to the set.  The method must be
    a function, not a string.

    Note that in debugging mode only, this method is overridden to also record
    the name of the object and function that resulted in the target/method
    being added.
  */
  add: function(target, method, context) {
    var targetGuid = SC.guidFor(target), methodGuid = SC.guidFor(method);
    var targets = this._members, members = this.members;

    // get the set of methods
    var indexes = targets[targetGuid];
    if ( !indexes ) indexes = targets[targetGuid] = {};

    if (indexes[methodGuid] === undefined) indexes[methodGuid] = members.length;
    else return;

    members.push([target, method, context]);
  },

  /**
    removes the named target/method observer from the set.  If this is the
    last method for the named target, then the number of targets will also
    be reduced.

    returns YES if the items was removed, NO if it was not found.
  */
  remove: function(target, method) {
    var targetGuid = SC.guidFor(target), methodGuid = SC.guidFor(method);
    var indexes = this._members[targetGuid], members = this.members;

    if( !indexes ) return false;

    var index = indexes[methodGuid];
    if ( index === undefined) return false;

    if (index !== members.length - 1) {
      var entry = (members[index] = members[members.length - 1]);
      this._members[SC.guidFor(entry[0])][SC.guidFor(entry[1])] = index;
    }

    members.pop();
    delete this._members[targetGuid][methodGuid];

    return true;
  },

  /**
    Invokes the target/method pairs in the receiver.  Used by SC.RunLoop
    Note: does not support context
  */
  invokeMethods: function() {
    var members = this.members, member;

    for( var i=0, l=members.length; i<l; i++ ) {
      member = members[i];

      // method.call(target);
      member[1].call(member[0]);
    }
  },

  /**
    Returns a new instance of the set with the contents cloned.
  */
  clone: function() {
    var newSet = SC.ObserverSet.create(), memberArray = this.members;

    newSet._members = SC.clone(this._members);
    var newMembers = newSet.members;

    for( var i=0, l=memberArray.length; i<l; i++ ) {
      newMembers[i] = SC.clone(memberArray[i]);
      newMembers[i].length = 3;
    }

    return newSet;
  },

  /**
    Creates a new instance of the observer set.
  */
  create: function() {
    return new SC.ObserverSet.constructor();
  },

  getMembers: function() {
    return this.members.slice(0);
  },

  constructor: function() {
    this._members = {};
    this.members = [];
  }

} ;
SC.ObserverSet.constructor.prototype = SC.ObserverSet;
SC.ObserverSet.slice = SC.ObserverSet.clone ;


/* >>>>>>>>>> BEGIN source/private/chain_observer.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

// ........................................................................
// CHAIN OBSERVER
//

// This is a private class used by the observable mixin to support chained
// properties.

// ChainObservers are used to automatically monitor a property several
// layers deep.
// org.plan.name = SC._ChainObserver.create({
//    target: this, property: 'org',
//    next: SC._ChainObserver.create({
//      property: 'plan',
//      next: SC._ChainObserver.create({
//        property: 'name', func: myFunc
//      })
//    })
//  })
//
SC._ChainObserver = function(property, root) {
  this.property = property ;
  this.root = root || this ;
} ;

// This is the primary entry point.  Configures the chain.
SC._ChainObserver.createChain = function(rootObject, path, target, method, context) {

  // First we create the chain.
  var parts = path.split('.'),
      root  = new SC._ChainObserver(parts[0]),
      tail  = root;

  for(var i=1, l=parts.length; i<l; i++) {
    tail = tail.next = new SC._ChainObserver(parts[i], root) ;
  }

  var tails = root.tails = [tail];

  // Now root has the first observer and tail has the last one.
  // Feed the rootObject into the front to setup the chain...
  // do this BEFORE we set the target/method so they will not be triggered.
  root.objectDidChange(rootObject);

  tails.forEach(function(tail) {
    // Finally, set the target/method on the tail so that future changes will
    // trigger.
    tail.target = target; tail.method = method ; tail.context = context ;
  });

  // no need to hold onto references to the tails; if the underlying
  // objects go away, let them get garbage collected
  root.tails = null;

  // and return the root to save
  return root ;
};

SC._ChainObserver.prototype = {
  isChainObserver: true,

  // the object this instance is observing
  object: null,

  // the property on the object this link is observing.
  property: null,

  // if not null, this is the next link in the chain.  Whenever the
  // current property changes, the next observer will be notified.
  next: null,

  root: null,

  // if not null, this is the final target observer.
  target: null,

  // if not null, this is the final target method
  method: null,

  // an accessor method that traverses the list and finds the tail
  tail: function() {
    if(this._tail) { return this._tail; }

    var tail = this;

    while(tail.next) {
      tail = tail.next;
    }

    this._tail = tail;
    return tail;
  },

  // invoked when the source object changes.  removes observer on old
  // object, sets up new observer, if needed.
  objectDidChange: function(newObject) {
    if (newObject === this.object) return; // nothing to do.

    // if an old object, remove observer on it.
    if (this.object && this.object.removeObserver) {
      this.object.removeObserver(this.property, this, this.propertyDidChange);
    }

    // if a new object, add observer on it...
    this.object = newObject ;

    // when [].propName is used, we will want to set up observers on each item
    // added to the Enumerable, and remove them when the item is removed from
    // the Enumerable.
    //
    // In this case, we invoke addEnumerableObserver, which handles setting up
    // and tearing down observers as items are added and removed from the
    // Enumerable.
    if (this.property === '@each' && this.next) {
      if (this.object && this.object.addEnumerableObserver) {
        this.object.addEnumerableObserver(this.next.property, this, this.propertyDidChange);
      }
    } else {
      if (this.object && this.object.addObserver) {
        this.object.addObserver(this.property, this, this.propertyDidChange);
      }

      // now, notify myself that my property value has probably changed.
      this.propertyDidChange() ;
    }
  },

  // the observer method invoked when the observed property changes.
  propertyDidChange: function() {

    // get the new value
    var object = this.object ;
    var property = this.property ;
    var value = (object && object.get) ? object.get(property) : null ;

    // if we have a next object in the chain, notify it that its object
    // did change...
    if (this.next) { this.next.objectDidChange(value) ; }

    // if we have a target/method, call it.
    var target  = this.target,
        method  = this.method,
        context = this.context ;

    if (target && method) {
      var rev = object ? object.propertyRevision : null ;
      if (context) {
        method.call(target, object, property, value, context, rev);
      } else {
        method.call(target, object, property, value, rev) ;
      }
    }
  },

  // teardown the chain...
  destroyChain: function() {

    // remove observer
    var obj = this.object ;
    if (obj && obj.removeObserver) {
      obj.removeObserver(this.property, this, this.propertyDidChange) ;
    }

    // destroy next item in chain
    if (this.next) this.next.destroyChain() ;

    // and clear left overs...
    this.next = this.target = this.method = this.object = this.context = null;
    return null ;
  }

} ;

/* >>>>>>>>>> BEGIN source/mixins/observable.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('private/observer_set');
sc_require('private/chain_observer');

/*globals logChange */

/**
  Set to YES to have all observing activity logged to the SC.Logger.  This
  should be used for debugging only.

  @property {Boolean}
*/
SC.LOG_OBSERVERS = NO ;

/**
  @namespace

  Key-Value-Observing (KVO) simply allows one object to observe changes to a
  property on another object. It is one of the fundamental ways that models,
  controllers and views communicate with each other in a SproutCore
  application.  Any object that has this module applied to it can be used in
  KVO-operations.

  This module is applied automatically to all objects that inherit from
  SC.Object, which includes most objects bundled with the SproutCore
  framework.  You will not generally apply this module to classes yourself,
  but you will use the features provided by this module frequently, so it is
  important to understand how to use it.

  h2. Enabling Key Value Observing

  With KVO, you can write functions that will be called automatically whenever
  a property on a particular object changes.  You can use this feature to
  reduce the amount of "glue code" that you often write to tie the various
  parts of your application together.

  To use KVO, just use the KVO-aware methods get() and set() to access
  properties instead of accessing properties directly.  Instead of writing:

  {{{
    var aName = contact.firstName ;
    contact.firstName = 'Charles' ;
  }}}

  use:

  {{{
    var aName = contact.get('firstName') ;
    contact.set('firstName', 'Charles') ;
  }}}

  get() and set() work just like the normal "dot operators" provided by
  JavaScript but they provide you with much more power, including not only
  observing but computed properties as well.

  h2. Observing Property Changes

  You typically observe property changes simply by adding the observes()
  call to the end of your method declarations in classes that you write.  For
  example:

  {{{
    SC.Object.create({
      valueObserver: function() {
        // Executes whenever the "Value" property changes
      }.observes('value')
    }) ;
  }}}

  Although this is the most common way to add an observer, this capability is
  actually built into the SC.Object class on top of two methods defined in
  this mixin called addObserver() and removeObserver().  You can use these two
  methods to add and remove observers yourself if you need to do so at run
  time.

  To add an observer for a property, just call:

  {{{
    object.addObserver('propertyKey', targetObject, targetAction) ;
  }}}

  This will call the 'targetAction' method on the targetObject to be called
  whenever the value of the propertyKey changes.

  h2. Observer Parameters

  An observer function typically does not need to accept any parameters,
  however you can accept certain arguments when writing generic observers.
  An observer function can have the following arguments:

  {{{
    propertyObserver(target, key, value, revision) ;
  }}}

  - *target* - This is the object whose value changed.  Usually this.
  - *key* - The key of the value that changed
  - *value* - this property is no longer used.  It will always be null
  - *revision* - this is the revision of the target object

  h2. Implementing Manual Change Notifications

  Sometimes you may want to control the rate at which notifications for
  a property are delivered, for example by checking first to make sure
  that the value has changed.

  To do this, you need to implement a computed property for the property
  you want to change and override automaticallyNotifiesObserversFor().

  The example below will only notify if the "balance" property value actually
  changes:

  {{{

    automaticallyNotifiesObserversFor: function(key) {
      return (key === 'balance') ? NO : arguments.callee.base.apply(this,arguments) ;
    },

    balance: function(key, value) {
      var balance = this._balance ;
      if ((value !== undefined) && (balance !== value)) {
        this.propertyWillChange(key) ;
        balance = this._balance = value ;
        this.propertyDidChange(key) ;
      }
      return balance ;
    }

  }}}

  h1. Implementation Details

  Internally, SproutCore keeps track of observable information by adding a
  number of properties to the object adopting the observable.  All of these
  properties begin with "_kvo_" to separate them from the rest of your object.

  @static
  @since SproutCore 1.0
*/
SC.Observable = {

  /**
    Walk like that ol' duck

    @property {Boolean}
  */
  isObservable: YES,

  /**
    Determines whether observers should be automatically notified of changes
    to a key.

    If you are manually implementing change notifications for a property, you
    can override this method to return NO for properties you do not want the
    observing system to automatically notify for.

    The default implementation always returns YES.

    @param key {String} the key that is changing
    @returns {Boolean} YES if automatic notification should occur.
  */
  automaticallyNotifiesObserversFor: function(key) {
    return YES;
  },

  // ..........................................
  // PROPERTIES
  //
  // Use these methods to get/set properties.  This will handle observing
  // notifications as well as allowing you to define functions that can be
  // used as properties.

  /**
    Retrieves the value of key from the object.

    This method is generally very similar to using object[key] or object.key,
    however it supports both computed properties and the unknownProperty
    handler.

    *Computed Properties*

    Computed properties are methods defined with the property() modifier
    declared at the end, such as:

    {{{
      fullName: function() {
        return this.getEach('firstName', 'lastName').compact().join(' ');
      }.property('firstName', 'lastName')
    }}}

    When you call get() on a computed property, the property function will be
    called and the return value will be returned instead of the function
    itself.

    *Unknown Properties*

    Likewise, if you try to call get() on a property whose values is
    undefined, the unknownProperty() method will be called on the object.
    If this method reutrns any value other than undefined, it will be returned
    instead.  This allows you to implement "virtual" properties that are
    not defined upfront.

    @param key {String} the property to retrieve
    @returns {Object} the property value or undefined.

  */
  get: function(key) {
    var ret = this[key], cache ;
    if (ret === undefined) {
      return this.unknownProperty(key) ;
    } else if (ret && ret.isProperty) {
      if (ret.isCacheable) {
        cache = this._kvo_cache ;
        if (!cache) cache = this._kvo_cache = {};
        return (cache[ret.cacheKey] !== undefined) ? cache[ret.cacheKey] : (cache[ret.cacheKey] = ret.call(this,key)) ;
      } else return ret.call(this,key);
    } else return ret ;
  },

  /**
    Sets the key equal to value.

    This method is generally very similar to calling object[key] = value or
    object.key = value, except that it provides support for computed
    properties, the unknownProperty() method and property observers.

    *Computed Properties*

    If you try to set a value on a key that has a computed property handler
    defined (see the get() method for an example), then set() will call
    that method, passing both the value and key instead of simply changing
    the value itself.  This is useful for those times when you need to
    implement a property that is composed of one or more member
    properties.

    *Unknown Properties*

    If you try to set a value on a key that is undefined in the target
    object, then the unknownProperty() handler will be called instead.  This
    gives you an opportunity to implement complex "virtual" properties that
    are not predefined on the obejct.  If unknownProperty() returns
    undefined, then set() will simply set the value on the object.

    *Property Observers*

    In addition to changing the property, set() will also register a
    property change with the object.  Unless you have placed this call
    inside of a beginPropertyChanges() and endPropertyChanges(), any "local"
    observers (i.e. observer methods declared on the same object), will be
    called immediately.  Any "remote" observers (i.e. observer methods
    declared on another object) will be placed in a queue and called at a
    later time in a coelesced manner.

    *Chaining*

    In addition to property changes, set() returns the value of the object
    itself so you can do chaining like this:

    {{{
      record.set('firstName', 'Charles').set('lastName', 'Jolley');
    }}}

    @param key {String|Hash} the property to set
    @param value {Object} the value to set or null.
    @returns {SC.Observable}
  */
  set: function(key, value) {
    var func   = this[key],
        notify = this.automaticallyNotifiesObserversFor(key),
        ret    = value,
        cachedep, cache, idx, dfunc ;
    
    if(value === undefined && SC.typeOf(key) === SC.T_HASH) {
      var hash = key;
      
      for(key in hash) {
        if (!hash.hasOwnProperty(key)) continue;
        this.set(key, hash[key]);
      }
      
      return this;
    }
        
    // if there are any dependent keys and they use caching, then clear the
    // cache.  (If we're notifying, then propertyDidChange will do this for
    // us.)
    if (!notify && this._kvo_cacheable && (cache = this._kvo_cache)) {
      // lookup the cached dependents for this key.  if undefined, compute.
      // note that if cachdep is set to null is means we figure out it has no
      // cached dependencies already.  this is different from undefined.
      cachedep = this._kvo_cachedep;
      if (!cachedep || (cachedep = cachedep[key])===undefined) {
        cachedep = this._kvo_computeCachedDependentsFor(key);
      }

      if (cachedep) {
        idx = cachedep.length;
        while(--idx>=0) {
          dfunc = cachedep[idx];
          cache[dfunc.cacheKey] = cache[dfunc.lastSetValueKey] = undefined;
        }
      }
    }

    // set the value.
    if (func && func.isProperty) {
      cache = this._kvo_cache;
      if (func.isVolatile || !cache || (cache[func.lastSetValueKey] !== value)) {
        if (!cache) cache = this._kvo_cache = {};

        cache[func.lastSetValueKey] = value ;
        if (notify) this.propertyWillChange(key) ;
        ret = func.call(this,key,value) ;

        // update cached value
        if (func.isCacheable) cache[func.cacheKey] = ret ;
        if (notify) this.propertyDidChange(key, ret, YES) ;
      }

    } else if (func === undefined) {
      if (notify) this.propertyWillChange(key) ;
      this.unknownProperty(key,value) ;
      if (notify) this.propertyDidChange(key, ret) ;

    } else {
      if (this[key] !== value) {
        if (notify) this.propertyWillChange(key) ;
        ret = this[key] = value ;
        if (notify) this.propertyDidChange(key, ret) ;
      }
    }

    return this ;
  },

  /**
    Called whenever you try to get or set an undefined property.

    This is a generic property handler.  If you define it, it will be called
    when the named property is not yet set in the object.  The default does
    nothing.

    @param key {String} the key that was requested
    @param value {Object} The value if called as a setter, undefined if called as a getter.
    @returns {Object} The new value for key.
  */
  unknownProperty: function(key,value) {
    if (!(value === undefined)) { this[key] = value; }
    return value ;
  },

  /**
    Begins a grouping of property changes.

    You can use this method to group property changes so that notifications
    will not be sent until the changes are finished.  If you plan to make a
    large number of changes to an object at one time, you should call this
    method at the beginning of the changes to suspend change notifications.
    When you are done making changes, all endPropertyChanges() to allow
    notification to resume.

    @returns {SC.Observable}
  */
  beginPropertyChanges: function() {
    this._kvo_changeLevel = (this._kvo_changeLevel || 0) + 1;
    return this;
  },

  /**
    Ends a grouping of property changes.

    You can use this method to group property changes so that notifications
    will not be sent until the changes are finished.  If you plan to make a
    large number of changes to an object at one time, you should call
    beginPropertyChanges() at the beginning of the changes to suspend change
    notifications. When you are done making changes, call this method to allow
    notification to resume.

    @returns {SC.Observable}
  */
  endPropertyChanges: function() {
    this._kvo_changeLevel = (this._kvo_changeLevel || 1) - 1 ;
    var level = this._kvo_changeLevel, changes = this._kvo_changes;
    if ((level<=0) && changes && (changes.length>0) && !SC.Observers.isObservingSuspended) {
      this._notifyPropertyObservers() ;
    }
    return this ;
  },

  /**
    Notify the observer system that a property is about to change.

    Sometimes you need to change a value directly or indirectly without
    actually calling get() or set() on it.  In this case, you can use this
    method and propertyDidChange() instead.  Calling these two methods
    together will notify all observers that the property has potentially
    changed value.

    Note that you must always call propertyWillChange and propertyDidChange as
    a pair.  If you do not, it may get the property change groups out of order
    and cause notifications to be delivered more often than you would like.

    @param key {String} The property key that is about to change.
    @returns {SC.Observable}
  */
  propertyWillChange: function(key) {
    return this ;
  },

  /**
    Notify the observer system that a property has just changed.

    Sometimes you need to change a value directly or indirectly without
    actually calling get() or set() on it.  In this case, you can use this
    method and propertyWillChange() instead.  Calling these two methods
    together will notify all observers that the property has potentially
    changed value.

    Note that you must always call propertyWillChange and propertyDidChange as
    a pair. If you do not, it may get the property change groups out of order
    and cause notifications to be delivered more often than you would like.

    @param key {String} The property key that has just changed.
    @param value {Object} The new value of the key.  May be null.
    @returns {SC.Observable}
  */
  propertyDidChange: function(key,value, _keepCache) {
    this._kvo_revision = (this._kvo_revision || 0) + 1;
    var level = this._kvo_changeLevel || 0,
        cachedep, idx, dfunc, cache, func,
        log = SC.LOG_OBSERVERS && !(this.LOG_OBSERVING===NO);

    if (cache = this._kvo_cache) {

      // clear any cached value
      if (!_keepCache) {
        func = this[key] ;
        if (func && func.isProperty) {
          cache[func.cacheKey] = cache[func.lastSetValueKey] = undefined ;
        }
      }

      if (this._kvo_cacheable) {
        // if there are any dependent keys and they use caching, then clear the
        // cache.  This is the same code as is in set.  It is inlined for perf.
        cachedep = this._kvo_cachedep;
        if (!cachedep || (cachedep = cachedep[key])===undefined) {
          cachedep = this._kvo_computeCachedDependentsFor(key);
        }

        if (cachedep) {
          idx = cachedep.length;
          while(--idx>=0) {
            dfunc = cachedep[idx];
            cache[dfunc.cacheKey] = cache[dfunc.lastSetValueKey] = undefined;
          }
        }
      }
    }

    // save in the change set if queuing changes
    var suspended = SC.Observers.isObservingSuspended;
    if ((level > 0) || suspended) {
      var changes = this._kvo_changes ;
      if (!changes) changes = this._kvo_changes = SC.CoreSet.create() ;
      changes.add(key) ;

      if (suspended) {
        if (log) SC.Logger.log("%@%@: will not notify observers because observing is suspended".fmt(SC.KVO_SPACES,this));
        SC.Observers.objectHasPendingChanges(this) ;
      }

    // otherwise notify property observers immediately
    } else this._notifyPropertyObservers(key) ;

    return this ;
  },

  // ..........................................
  // DEPENDENT KEYS
  //

  /**
    Use this to indicate that one key changes if other keys it depends on
    change.  Pass the key that is dependent and additional keys it depends
    upon.  You can either pass the additional keys inline as arguments or
    in a single array.

    You generally do not call this method, but instead pass dependent keys to
    your property() method when you declare a computed property.

    You can call this method during your init to register the keys that should
    trigger a change notification for your computed properties.

    @param {String} key the dependent key
    @param {Array|String} dependentKeys one or more dependent keys
    @returns {Object} this
  */
  registerDependentKey: function(key, dependentKeys) {
    var dependents = this._kvo_dependents,
        func       = this[key],
        keys, idx, lim, dep, queue;

    // normalize input.
    if (typeof dependentKeys === "object" && (dependentKeys instanceof Array)) {
      keys = dependentKeys;
      lim  = 0;
    } else {
      keys = arguments;
      lim  = 1;
    }
    idx  = keys.length;

    // define dependents if not defined already.
    if (!dependents) this._kvo_dependents = dependents = {} ;

    // for each key, build array of dependents, add this key...
    // note that we ignore the first argument since it is the key...
    while(--idx >= lim) {
      dep = keys[idx] ;

      if (dep.indexOf('.') >= 0) {
        this.addObserver(dep, this, function() {
          this.propertyDidChange(key);
        });
      } else {
        // add dependent key to dependents array of key it depends on
        queue = dependents[dep] ;
        if (!queue) { queue = dependents[dep] = [] ; }
        queue.push(key) ;
      }
    }
  },

  /** @private

    Helper method used by computeCachedDependents.  Just loops over the
    array of dependent keys.  If the passed function is cacheable, it will
    be added to the queue.  Also, recursively call on each keys dependent
    keys.

    @param {Array} queue the queue to add functions to
    @param {Array} keys the array of dependent keys for this key
    @param {Hash} dependents the _kvo_dependents cache
    @param {SC.Set} seen already seen keys
    @returns {void}
  */
  _kvo_addCachedDependents: function(queue, keys, dependents, seen) {
    var idx = keys.length,
        func, key, deps ;

    while(--idx >= 0) {
      key  = keys[idx];
      seen.add(key);

      // if the value for this key is a computed property, then add it to the
      // set if it is cacheable, and process any of its dependent keys also.
      func = this[key];
      if (func && (func instanceof Function) && func.isProperty) {
        if (func.isCacheable) queue.push(func); // handle this func
        if ((deps = dependents[key]) && deps.length>0) { // and any dependents
          this._kvo_addCachedDependents(queue, deps, dependents, seen);
        }
      }
    }

  },

  /** @private

    Called by set() whenever it needs to determine which cached dependent
    keys to clear.  Recursively searches dependent keys to determine all
    cached property direcly or indirectly affected.

    The return value is also saved for future reference

    @param {String} key the key to compute
    @returns {Array}
  */
  _kvo_computeCachedDependentsFor: function(key) {
    var cached     = this._kvo_cachedep,
        dependents = this._kvo_dependents,
        keys       = dependents ? dependents[key] : null,
        queue, seen ;
    if (!cached) cached = this._kvo_cachedep = {};

    // if there are no dependent keys, then just set and return null to avoid
    // this mess again.
    if (!keys || keys.length===0) return cached[key] = null;

    // there are dependent keys, so we need to do the work to find out if
    // any of them or their dependent keys are cached.
    queue = cached[key] = [];
    seen  = SC._TMP_SEEN_SET = (SC._TMP_SEEN_SET || SC.CoreSet.create());
    seen.add(key);
    this._kvo_addCachedDependents(queue, keys, dependents, seen);
    seen.clear(); // reset

    if (queue.length === 0) queue = cached[key] = null ; // turns out nothing
    return queue ;
  },

  // ..........................................
  // OBSERVERS
  //

  _kvo_for: function(kvoKey, type) {
    var ret = this[kvoKey] ;

    if (!this._kvo_cloned) this._kvo_cloned = {} ;

    // if the item does not exist, create it.  Unless type is passed,
    // assume array.
    if (!ret) {
      ret = this[kvoKey] = (type === undefined) ? [] : type.create();
      this._kvo_cloned[kvoKey] = YES ;

    // if item does exist but has not been cloned, then clone it.  Note
    // that all types must implement copy().0
    } else if (!this._kvo_cloned[kvoKey]) {
      ret = this[kvoKey] = ret.copy();
      this._kvo_cloned[kvoKey] = YES;
    }

    return ret ;
  },

  /**
    Adds an observer on a property.

    This is the core method used to register an observer for a property.

    Once you call this method, anytime the key's value is set, your observer
    will be notified.  Note that the observers are triggered anytime the
    value is set, regardless of whether it has actually changed.  Your
    observer should be prepared to handle that.

    You can also pass an optional context parameter to this method.  The
    context will be passed to your observer method whenever it is triggered.
    Note that if you add the same target/method pair on a key multiple times
    with different context parameters, your observer will only be called once
    with the last context you passed.

    h2. Observer Methods

    Observer methods you pass should generally have the following signature if
    you do not pass a "context" parameter:

    {{{
      fooDidChange: function(sender, key, value, rev);
    }}}

    The sender is the object that changed.  The key is the property that
    changes.  The value property is currently reserved and unused.  The rev
    is the last property revision of the object when it changed, which you can
    use to detect if the key value has really changed or not.

    If you pass a "context" parameter, the context will be passed before the
    revision like so:

    {{{
      fooDidChange: function(sender, key, value, context, rev);
    }}}

    Usually you will not need the value, context or revision parameters at
    the end.  In this case, it is common to write observer methods that take
    only a sender and key value as parameters or, if you aren't interested in
    any of these values, to write an observer that has no parameters at all.

    @param key {String} the key to observer
    @param target {Object} the target object to invoke
    @param method {String|Function} the method to invoke.
    @param context {Object} optional context
    @returns {SC.Object} self
  */
  addObserver: function(key, target, method, context) {
    var kvoKey, chain, chains, observers;

    // normalize.  if a function is passed to target, make it the method.
    if (method === undefined) {
      method = target; target = this ;
    }
    if (!target) target = this ;

    if (typeof method === "string") method = target[method] ;
    if (!method) throw "You must pass a method to addObserver()" ;

    // Normalize key...
    key = key.toString() ;
    if (key.indexOf('.') >= 0) {

      // create the chain and save it for later so we can tear it down if
      // needed.
      chain = SC._ChainObserver.createChain(this, key, target, method, context);
      chain.masterTarget = target;
      chain.masterMethod = method ;

      // Save in set for chain observers.
      this._kvo_for(SC.keyFor('_kvo_chains', key)).push(chain);

    // Create observers if needed...
    } else {

      // Special case to support reduced properties.  If the property
      // key begins with '@' and its value is unknown, then try to get its
      // value.  This will configure the dependent keys if needed.
      if ((this[key] === undefined) && (key.indexOf('@') === 0)) {
        this.get(key) ;
      }

      if (target === this) target = null ; // use null for observers only.
      kvoKey = SC.keyFor('_kvo_observers', key);
      this._kvo_for(kvoKey, SC.ObserverSet).add(target, method, context);
      this._kvo_for('_kvo_observed_keys', SC.CoreSet).add(key) ;
    }

    if (this.didAddObserver) this.didAddObserver(key, target, method);
    return this;
  },

  /**
    Remove an observer you have previously registered on this object.  Pass
    the same key, target, and method you passed to addObserver() and your
    target will no longer receive notifications.

    @returns {SC.Observable} reciever
  */
  removeObserver: function(key, target, method) {

    var kvoKey, chains, chain, observers, idx ;

    // normalize.  if a function is passed to target, make it the method.
    if (method === undefined) {
      method = target; target = this ;
    }
    if (!target) target = this ;

    if (typeof method === "string") method = target[method] ;
    if (!method) throw "You must pass a method to removeObserver()" ;

    // if the key contains a '.', this is a chained observer.
    key = key.toString() ;
    if (key.indexOf('.') >= 0) {

      // try to find matching chains
      kvoKey = SC.keyFor('_kvo_chains', key);
      if (chains = this[kvoKey]) {

        // if chains have not been cloned yet, do so now.
        chains = this._kvo_for(kvoKey) ;

        // remove any chains
        idx = chains.length;
        while(--idx >= 0) {
          chain = chains[idx];
          if (chain && (chain.masterTarget===target) && (chain.masterMethod===method)) {
            chains[idx] = chain.destroyChain() ;
          }
        }
      }

    // otherwise, just like a normal observer.
    } else {
      if (target === this) target = null ; // use null for observers only.
      kvoKey = SC.keyFor('_kvo_observers', key) ;
      if (observers = this[kvoKey]) {
        // if observers have not been cloned yet, do so now
        observers = this._kvo_for(kvoKey) ;
        observers.remove(target, method) ;
        if (observers.getMembers().length === 0) {
          this._kvo_for('_kvo_observed_keys', SC.CoreSet).remove(key);
        }
      }
    }

    if (this.didRemoveObserver) this.didRemoveObserver(key, target, method);
    return this;
  },

  /**
    Returns YES if the object currently has observers registered for a
    particular key.  You can use this method to potentially defer performing
    an expensive action until someone begins observing a particular property
    on the object.

    @param {String} key key to check
    @returns {Boolean}
  */
  hasObserverFor: function(key) {
    SC.Observers.flush(this) ; // hookup as many observers as possible.

    var observers = this[SC.keyFor('_kvo_observers', key)],
        locals    = this[SC.keyFor('_kvo_local', key)],
        members ;

    if (locals && locals.length>0) return YES ;
    if (observers && observers.getMembers().length > 0) return YES ;
    return NO ;
  },

  /**
    This method will register any observers and computed properties saved on
    the object.  Normally you do not need to call this method youself.  It
    is invoked automatically just before property notifications are sent and
    from the init() method of SC.Object.  You may choose to call this
    from your own initialization method if you are using SC.Observable in
    a non-SC.Object-based object.

    This method looks for several private variables, which you can setup,
    to initialize:

      - _observers: this should contain an array of key names for observers
        you need to configure.

      - _bindings: this should contain an array of key names that configure
        bindings.

      - _properties: this should contain an array of key names for computed
        properties.

    @returns {Object} this
  */
  initObservable: function() {
    if (this._observableInited) return ;
    this._observableInited = YES ;

    var loc, keys, key, value, observer, propertyPaths, propertyPathsLength,
        len, ploc, path, dotIndex, root, propertyKey, keysLen;

    // Loop through observer functions and register them
    if (keys = this._observers) {
      len = keys.length ;
      for(loc=0;loc<len;loc++) {
        key = keys[loc]; observer = this[key] ;
        propertyPaths = observer.propertyPaths ;
        propertyPathsLength = (propertyPaths) ? propertyPaths.length : 0 ;
        for(ploc=0;ploc<propertyPathsLength;ploc++) {
          path = propertyPaths[ploc] ;
          dotIndex = path.indexOf('.') ;
          // handle most common case, observing a local property
          if (dotIndex < 0) {
            this.addObserver(path, this, observer) ;

          // next most common case, use a chained observer
          } else if (path.indexOf('*') === 0) {
            this.addObserver(path.slice(1), this, observer) ;

          // otherwise register the observer in the observers queue.  This
          // will add the observer now or later when the named path becomes
          // available.
          } else {
            root = null ;

            // handle special cases for observers that look to the local root
            if (dotIndex === 0) {
              root = this; path = path.slice(1) ;
            } else if (dotIndex===4 && path.slice(0,5) === 'this.') {
              root = this; path = path.slice(5) ;
            } else if (dotIndex<0 && path.length===4 && path === 'this') {
              root = this; path = '';
            }

            SC.Observers.addObserver(path, this, observer, root);
          }
        }
      }
    }

    // Add Bindings
    this.bindings = []; // will be filled in by the bind() method.
    if (keys = this._bindings) {
      for(loc=0, keysLen = keys.length; loc < keysLen;loc++) {
        // get propertyKey
        key = keys[loc] ; value = this[key] ;
        propertyKey = key.slice(0,-7) ; // contentBinding => content
        this[key] = this.bind(propertyKey, value) ;
      }
    }

    // Add Properties
    if (keys = this._properties) {
      for(loc=0, keysLen = keys.length; loc<keysLen;loc++) {
        key = keys[loc];
        if (value = this[key]) {

          // activate cacheable only if needed for perf reasons
          if (value.isCacheable) this._kvo_cacheable = YES;

          // register dependent keys
          if (value.dependentKeys && (value.dependentKeys.length>0)) {
            this.registerDependentKey(key, value.dependentKeys) ;
          }
        }
      }
    }

  },

  // ..........................................
  // NOTIFICATION
  //

  /**
    Returns an array with all of the observers registered for the specified
    key.  This is intended for debugging purposes only.  You generally do not
    want to rely on this method for production code.

    @params key {String} the key to evaluate
    @returns {Array} array of Observer objects, describing the observer.
  */
  observersForKey: function(key) {
    var observers = this._kvo_for('_kvo_observers', key) ;
    return observers.getMembers() ;
  },

  // this private method actually notifies the observers for any keys in the
  // observer queue.  If you pass a key it will be added to the queue.
  _notifyPropertyObservers: function(key) {
    if (!this._observableInited) this.initObservable() ;

    SC.Observers.flush(this) ; // hookup as many observers as possible.

    var log = SC.LOG_OBSERVERS && !(this.LOG_OBSERVING===NO),
        observers, changes, dependents, starObservers, idx, keys, rev,
        members, membersLength, member, memberLoc, target, method, loc, func,
        context, spaces, cache ;

    if (log) {
      spaces = SC.KVO_SPACES = (SC.KVO_SPACES || '') + '  ';
      SC.Logger.log('%@%@: notifying observers after change to key "%@"'.fmt(spaces, this, key));
    }

    // Get any starObservers -- they will be notified of all changes.
    starObservers =  this['_kvo_observers_*'] ;

    // prevent notifications from being sent until complete
    this._kvo_changeLevel = (this._kvo_changeLevel || 0) + 1;

    // keep sending notifications as long as there are changes
    while(((changes = this._kvo_changes) && (changes.length > 0)) || key) {

      // increment revision
      rev = ++this.propertyRevision ;

      // save the current set of changes and swap out the kvo_changes so that
      // any set() calls by observers will be saved in a new set.
      if (!changes) changes = SC.CoreSet.create() ;
      this._kvo_changes = null ;

      // Add the passed key to the changes set.  If a '*' was passed, then
      // add all keys in the observers to the set...
      // once finished, clear the key so the loop will end.
      if (key === '*') {
        changes.add('*') ;
        changes.addEach(this._kvo_for('_kvo_observed_keys', SC.CoreSet));

      } else if (key) changes.add(key) ;

      // Now go through the set and add all dependent keys...
      if (dependents = this._kvo_dependents) {

        // NOTE: each time we loop, we check the changes length, this
        // way any dependent keys added to the set will also be evaluated...
        for(idx=0;idx<changes.length;idx++) {
          key = changes[idx] ;
          keys = dependents[key] ;

          // for each dependent key, add to set of changes.  Also, if key
          // value is a cacheable property, clear the cached value...
          if (keys && (loc = keys.length)) {
            if (log) {
              SC.Logger.log("%@...including dependent keys for %@: %@".fmt(spaces, key, keys));
            }
            cache = this._kvo_cache;
            if (!cache) cache = this._kvo_cache = {};
            while(--loc >= 0) {
              changes.add(key = keys[loc]);
              if (func = this[key]) {
                this[func.cacheKey] = undefined;
                cache[func.cacheKey] = cache[func.lastSetValueKey] = undefined;
              } // if (func=)
            } // while (--loc)
          } // if (keys &&
        } // for(idx...
      } // if (dependents...)

      // now iterate through all changed keys and notify observers.
      while(changes.length > 0) {
        key = changes.pop() ; // the changed key

        // find any observers and notify them...
        observers = this[SC.keyFor('_kvo_observers', key)];

        if (observers) {
          // We need to clone the 'members' structure here in case any of the
          // observers we're about to notify happen to remove observers for
          // this key, which would mutate the structure underneath us.
          // (Cloning it rather than mutating gives us a clear policy:  if you
          // were registered as an observer at the time notification begins,
          // you will be notified, regardless of whether you're removed as an
          // observer during that round of notification.  Similarly, if you're
          // added as an observer during the notification round by another
          // observer, you will not be notified until the next time.)
          members = SC.clone(observers.getMembers()) ;
          membersLength = members.length ;
          for(memberLoc=0;memberLoc < membersLength; memberLoc++) {
            member = members[memberLoc] ;

            if (member[3] === rev) continue ; // skip notified items.

            if(!member[1]) SC.Logger.log(member);

            target = member[0] || this;
            method = member[1] ;
            context = member[2];
            member[3] = rev;

            if (log) SC.Logger.log('%@...firing observer on %@ for key "%@"'.fmt(spaces, target, key));
            if (context !== undefined) {
              method.call(target, this, key, null, context, rev);
            } else {
              method.call(target, this, key, null, rev) ;
            }
          }
        }

        // look for local observers.  Local observers are added by SC.Object
        // as an optimization to avoid having to add observers for every
        // instance when you are just observing your local object.
        members = this[SC.keyFor('_kvo_local', key)];
        if (members) {
          // Note:  Since, unlike above, we don't expect local observers to be
          //        removed in general, we will not clone 'members'.
          membersLength = members.length ;
          for(memberLoc=0;memberLoc<membersLength;memberLoc++) {
            member = members[memberLoc];
            method = this[member] ; // try to find observer function
            if (method) {
              if (log) SC.Logger.log('%@...firing local observer %@.%@ for key "%@"'.fmt(spaces, this, member, key));
              method.call(this, this, key, null, rev);
            }
          }
        }

        // if there are starObservers, do the same thing for them
        if (starObservers && key !== '*') {
          // We clone the structure per the justification, above, for regular
          // observers.
          members = SC.clone(starObservers.getMembers()) ;
          membersLength = members.length ;
          for(memberLoc=0;memberLoc < membersLength; memberLoc++) {
            member = members[memberLoc] ;
            target = member[0] || this;
            method = member[1] ;
            context = member[2] ;

            if (log) SC.Logger.log('%@...firing * observer on %@ for key "%@"'.fmt(spaces, target, key));
            if (context !== undefined) {
              method.call(target, this, key, null, context, rev);
            } else {
              method.call(target, this, key, null, rev) ;
            }
          }
        }

        // if there is a default property observer, call that also
        if (this.propertyObserver) {
          if (log) SC.Logger.log('%@...firing %@.propertyObserver for key "%@"'.fmt(spaces, this, key));
          this.propertyObserver(this, key, null, rev);
        }
      } // while(changes.length>0)

      // changes set should be empty. release it for reuse
      if (changes) changes.destroy() ;

      // key is no longer needed; clear it to avoid infinite loops
      key = null ;

    } // while (changes)

    // done with loop, reduce change level so that future sets can resume
    this._kvo_changeLevel = (this._kvo_changeLevel || 1) - 1;

    if (log) SC.KVO_SPACES = spaces.slice(0, -2);

    return YES ; // finished successfully
  },

  // ..........................................
  // BINDINGS
  //

  /**
    Manually add a new binding to an object.  This is the same as doing
    the more familiar propertyBinding: 'property.path' approach.

    @param {String} toKey the key to bind to
    @param {Object} target target or property path to bind from
    @param {String|Function} method method for target to bind from
    @returns {SC.Binding} new binding instance
  */
  bind: function(toKey, target, method) {

    var binding , pathType;

    // normalize...
    if (method !== undefined) target = [target, method];

    // if a string or array (i.e. tuple) is passed, convert this into a
    // binding.  If a binding default was provided, use that.
    pathType = typeof target;

    if (pathType === "string" || (pathType === "object" && (target instanceof Array))) {
      binding = this[toKey + 'BindingDefault'] || SC.Binding;
      binding = binding.beget().from(target) ;
    } else binding = target ;

    // finish configuring the binding and then connect it.
    binding = binding.to(toKey, this).connect() ;
    this.bindings.push(binding) ;

    return binding ;
  },

  /**
    didChangeFor allows you to determine if a property has changed since the
    last time the method was called. You must pass a unique context as the
    first parameter (so didChangeFor can identify which method is calling it),
    followed by a list of keys that should be checked for changes.

    For example, in your render method you might pass the following context:
    if (this.didChangeFor('render','height','width')) {
       // Only render if changed
    }

    In your view's update method, you might instead pass 'update':

    if (this.didChangeFor('update', 'height', 'width')) {
      // Only update height and width properties
    }

    This method works by comparing property revision counts. Every time a
    property changes, an internal counter is incremented. When didChangeFor is
    invoked, the current revision count of the property is compared to the
    revision count from the last time this method was called.

    @param {String|Object} context a unique identifier
    @param {String…} propertyNames one or more property names
  */
  didChangeFor: function(context) {
    var valueCache, revisionCache, seenValues, seenRevisions, ret,
        currentRevision, idx, key, value;
    context = SC.hashFor(context) ; // get a hash key we can use in caches.

    // setup caches...
    valueCache = this._kvo_didChange_valueCache ;
    if (!valueCache) valueCache = this._kvo_didChange_valueCache = {};
    revisionCache = this._kvo_didChange_revisionCache;
    if (!revisionCache) revisionCache=this._kvo_didChange_revisionCache={};

    // get the cache of values and revisions already seen in this context
    seenValues = valueCache[context] || {} ;
    seenRevisions = revisionCache[context] || {} ;

    // prepare too loop!
    ret = false ;
    currentRevision = this._kvo_revision || 0  ;
    idx = arguments.length ;
    while(--idx >= 1) {  // NB: loop only to 1 to ignore context arg.
      key = arguments[idx];

      // has the kvo revision changed since the last time we did this?
      if (seenRevisions[key] != currentRevision) {
        // yes, check the value with the last seen value
        value = this.get(key) ;
        if (seenValues[key] !== value) {
          ret = true ; // did change!
          seenValues[key] = value;
        }
      }
      seenRevisions[key] = currentRevision;
    }

    valueCache[context] = seenValues ;
    revisionCache[context] = seenRevisions ;
    return ret ;
  },

  /**
    Sets the property only if the passed value is different from the
    current value.  Depending on how expensive a get() is on this property,
    this may be more efficient.

    NOTE: By default, the set() method will not set the value unless it has
    changed. However, this check can skipped by setting .property().idempotent(NO)
    setIfChanged() may be useful in this case.

    @param key {String|Hash} the key to change
    @param value {Object} the value to change
    @returns {SC.Observable}
  */
  setIfChanged: function(key, value) {
    if(value === undefined && SC.typeOf(key) === SC.T_HASH) {
      var hash = key;
      
      for(key in hash) {
        if (!hash.hasOwnProperty(key)) continue;
        this.setIfChanged(key, hash[key]);
      }
      
      return this;
    }
    
    return (this.get(key) !== value) ? this.set(key, value) : this ;
  },

  /**
    Navigates the property path, returning the value at that point.

    If any object in the path is undefined, returns undefined.
  */
  getPath: function(path) {
    var tuple = SC.tupleForPropertyPath(path, this) ;
    if (tuple === null || tuple[0] === null) return undefined ;
    return SC.get(tuple[0], tuple[1]) ;
  },

  /**
    Navigates the property path, finally setting the value.

    @param path {String} the property path to set
    @param value {Object} the value to set
    @returns {SC.Observable}
  */
  setPath: function(path, value) {
    if (path.indexOf('.') >= 0) {
      var tuple = SC.tupleForPropertyPath(path, this) ;
      if (!tuple || !tuple[0]) return null ;
      tuple[0].set(tuple[1], value) ;
    } else this.set(path, value) ; // shortcut
    return this;
  },

  /**
    Navigates the property path, finally setting the value but only if
    the value does not match the current value.  This will avoid sending
    unecessary change notifications.

    @param path {String} the property path to set
    @param value {Object} the value to set
    @returns {Object} this
  */
  setPathIfChanged: function(path, value) {
    if (path.indexOf('.') >= 0) {
      var tuple = SC.tupleForPropertyPath(path, this) ;
      if (!tuple || !tuple[0]) return null ;
      if (tuple[0].get(tuple[1]) !== value) {
        tuple[0].set(tuple[1], value) ;
      }
    } else this.setIfChanged(path, value) ; // shortcut
    return this;
  },

  /**
    Convenience method to get an array of properties.

    Pass in multiple property keys or an array of property keys.  This
    method uses getPath() so you can also pass key paths.

    @returns {Array} Values of property keys.
  */
  getEach: function() {
    var keys = SC.A(arguments),
        ret = [], idx, idxLen;
    for(idx=0, idxLen = keys.length; idx < idxLen;idx++) {
      ret[ret.length] = this.getPath(keys[idx]);
    }
    return ret ;
  },


  /**
    Increments the value of a property.

    @param key {String} property name
    @param increment {Number} the amount to increment (optional)
    @returns {Number} new value of property
  */
  incrementProperty: function(key,increment) {
    if (!increment) increment = 1;
    this.set(key,(this.get(key) || 0)+increment);
    return this.get(key) ;
  },

  /**
    Decrements the value of a property.

    @param key {String} property name
    @param increment {Number} the amount to decrement (optional)
    @returns {Number} new value of property
  */
  decrementProperty: function(key,increment) {
    if (!increment) increment = 1;
    this.set(key,(this.get(key) || 0) - increment) ;
    return this.get(key) ;
  },

  /**
    Inverts a property.  Property should be a bool.

    @param key {String} property name
    @param value {Object} optional parameter for "true" value
    @param alt {Object} optional parameter for "false" value
    @returns {Object} new value
  */
  toggleProperty: function(key,value,alt) {
    if (value === undefined) value = true ;
    if (alt === undefined) alt = false ;
    value = (this.get(key) == value) ? alt : value ;
    this.set(key,value);
    return this.get(key) ;
  },

  /**
    Convenience method to call propertyWillChange/propertyDidChange.

    Sometimes you need to notify observers that a property has changed value
    without actually changing this value.  In those cases, you can use this
    method as a convenience instead of calling propertyWillChange() and
    propertyDidChange().

    @param key {String} The property key that has just changed.
    @param value {Object} The new value of the key.  May be null.
    @returns {SC.Observable}
  */
  notifyPropertyChange: function(key, value) {
    this.propertyWillChange(key) ;
    this.propertyDidChange(key, value) ;
    return this;
  },

  /**
    Notifies all of observers of a property changes.

    Sometimes when you make a major update to your object, it is cheaper to
    simply notify all observers that their property might have changed than
    to figure out specifically which properties actually did change.

    In those cases, you can simply call this method to notify all property
    observers immediately.  Note that this ignores property groups.

    @returns {SC.Observable}
  */
  allPropertiesDidChange: function() {
    this._kvo_cache = null; //clear cached props
    this._notifyPropertyObservers('*') ;
    return this ;
  },

  addProbe: function(key) { this.addObserver(key,SC.logChange); },
  removeProbe: function(key) { this.removeObserver(key,SC.logChange); },

  /**
    Logs the named properties to the SC.Logger.

    @param {String...} propertyNames one or more property names
  */
  logProperty: function() {
    var props = SC.$A(arguments),
        prop, propsLen, idx;
    for(idx=0, propsLen = props.length; idx<propsLen; idx++) {
      prop = props[idx] ;
      SC.Logger.log('%@:%@: '.fmt(SC.guidFor(this), prop), this.get(prop)) ;
    }
  },

  propertyRevision: 1

} ;

/** @private used by addProbe/removeProbe */
SC.logChange = function logChange(target, key, value) {
  SC.Logger.log("CHANGE: %@[%@] => %@".fmt(target, key, target.get(key)));
};

/**
  Retrieves a property from an object, using get() if the
  object implements SC.Observable.

  @param  {Object}  object  the object to query
  @param  {String}  key the property to retrieve
*/
SC.mixin(SC, {
  get: function(object, key) {
    if (!object) return undefined;
    if (key === undefined) return this[object];
    if (object.get) return object.get(key);
    return object[key];
  }
});

// Make all Array's observable
SC.mixin(Array.prototype, SC.Observable) ;

/* >>>>>>>>>> BEGIN source/system/enumerator.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @class

  An object that iterates over all of the values in an object.

  An instance of this object is returned everytime you call the
  enumerator() method on an object that implements the SC.Enumerable mixin.

  Once you create an enumerator instance, you can call nextObject() on it
  until you can iterated through the entire collection.  Once you have
  exhausted the enumerator, you can reuse it if you want by calling reset().

  @since SproutCore 1.0
*/
SC.Enumerator = function(enumerableObject) {
  this.enumerable = enumerableObject ;
  this.reset() ;
  return this ;
} ;

SC.Enumerator.prototype = {

  /**
    Returns the next object in the enumeration or undefined when complete.

    @returns {Object} the next object or undefined
  */
  nextObject: function() {
    var index = this._index ;
    var len = this._length;
    if (index >= len) return undefined ; // nothing to do

    // get the value
    var ret = this.enumerable.nextObject(index, this._previousObject, this._context) ;
    this._previousObject = ret ;
    this._index = index + 1 ;

    if (index >= len) {
      this._context = SC.Enumerator._pushContext(this._context);
    }

    return ret ;
  },

  /**
    Resets the enumerator to the beginning.  This is a nice way to reuse
    an existing enumerator.

    @returns {Object} this
  */
  reset: function() {
    var e = this.enumerable ;
    if (!e) throw SC.$error("Enumerator has been destroyed");
    this._length = e.get ? e.get('length') : e.length ;
    var len = this._length;
    this._index = 0;
    this._previousObject = null ;
    this._context = (len > 0) ? SC.Enumerator._popContext() : null;
  },

  /**
    Releases the enumerators enumerable object.  You cannot use this object
    anymore.  This is not often needed but it is useful when you need to
    make sure memory gets cleared.

    @returns {Object} null
  */
  destroy: function() {
    this.enumerable = this._length = this._index = this._previousObject = this._context = null;
  }

} ;

/**
  Use this method to manually create a new Enumerator object.  Usually you
  will not access this method directly but instead call enumerator() on the
  item you want to enumerate.

  @param {SC.Enumerable}  enumerableObject enumerable object.
  @returns {SC.Enumerator} the enumerator
*/
SC.Enumerator.create = function(enumerableObject) {
  return new SC.Enumerator(enumerableObject) ;
};

// Private context caching methods.  This avoids recreating lots of context
// objects.

SC.Enumerator._popContext = function() {
  var ret = this._contextCache ? this._contextCache.pop() : null ;
  return ret || {} ;
} ;

SC.Enumerator._pushContext = function(context) {
  this._contextCache = this._contextCache || [] ;
  var cache = this._contextCache;
  cache.push(context);
  return null ;
};


/* >>>>>>>>>> BEGIN source/mixins/enumerable.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('core') ;
sc_require('system/enumerator');

/*globals Prototype */

/**
  @namespace

  This mixin defines the common interface implemented by enumerable objects
  in SproutCore.  Most of these methods follow the standard Array iteration
  API defined up to JavaScript 1.8 (excluding language-specific features that
  cannot be emulated in older versions of JavaScript).

  This mixin is applied automatically to the Array class on page load, so you
  can use any of these methods on simple arrays.  If Array already implements
  one of these methods, the mixin will not override them.

  h3. Writing Your Own Enumerable

  To make your own custom class enumerable, you need two items:

  1. You must have a length property.  This property should change whenever
     the number of items in your enumerable object changes.  If you using this
     with an SC.Object subclass, you should be sure to change the length
     property using set().

  2. If you must implement nextObject().  See documentation.

  Once you have these two methods implement, apply the SC.Enumerable mixin
  to your class and you will be able to enumerate the contents of your object
  like any other collection.

  h3. Using SproutCore Enumeration with Other Libraries

  Many other libraries provide some kind of iterator or enumeration like
  facility.  This is often where the most common API conflicts occur.
  SproutCore's API is designed to be as friendly as possible with other
  libraries by implementing only methods that mostly correspond to the
  JavaScript 1.8 API.

  @since SproutCore 1.0
*/
SC.Enumerable = {

  /**
    Walk like a duck.

    @property {Boolean}
  */
  isEnumerable: YES,

  /**
    Implement this method to make your class enumerable.

    This method will be call repeatedly during enumeration.  The index value
    will always begin with 0 and increment monotonically.  You don't have to
    rely on the index value to determine what object to return, but you should
    always check the value and start from the beginning when you see the
    requested index is 0.

    The previousObject is the object that was returned from the last call
    to nextObject for the current iteration.  This is a useful way to
    manage iteration if you are tracing a linked list, for example.

    Finally the context paramter will always contain a hash you can use as
    a "scratchpad" to maintain any other state you need in order to iterate
    properly.  The context object is reused and is not reset between
    iterations so make sure you setup the context with a fresh state whenever
    the index parameter is 0.

    Generally iterators will continue to call nextObject until the index
    reaches the your current length-1.  If you run out of data before this
    time for some reason, you should simply return undefined.

    The default impementation of this method simply looks up the index.
    This works great on any Array-like objects.

    @param index {Number} the current index of the iteration
    @param previousObject {Object} the value returned by the last call to nextObject.
    @param context {Object} a context object you can use to maintain state.
    @returns {Object} the next object in the iteration or undefined
  */
  nextObject: function(index, previousObject, context) {
    return this.objectAt ? this.objectAt(index) : this[index] ;
  },

  /**
    Helper method returns the first object from a collection.  This is usually
    used by bindings and other parts of the framework to extract a single
    object if the enumerable contains only one item.

    If you override this method, you should implement it so that it will
    always return the same value each time it is called.  If your enumerable
    contains only one object, this method should always return that object.
    If your enumerable is empty, this method should return undefined.

    @returns {Object} the object or undefined
  */
  firstObject: function() {
    if (this.get('length')===0) return undefined ;
    if (this.objectAt) return this.objectAt(0); // support arrays out of box

    // handle generic enumerables
    var context = SC.Enumerator._popContext(), ret;
    ret = this.nextObject(0, null, context);
    context = SC.Enumerator._pushContext(context);
    return ret ;
  }.property(),

  /**
    Helper method returns the last object from a collection.

    @returns {Object} the object or undefined
  */
  lastObject: function() {
    var len = this.get('length');
    if (len===0) return undefined ;
    if (this.objectAt) return this.objectAt(len-1); // support arrays out of box
  }.property(),

  /**
    Returns a new enumerator for this object.  See SC.Enumerator for
    documentation on how to use this object.  Enumeration is an alternative
    to using one of the other iterators described here.

    @returns {SC.Enumerator} an enumerator for the receiver
  */
  enumerator: function() { return SC.Enumerator.create(this); },

  /**
    Iterates through the enumerable, calling the passed function on each
    item.  This method corresponds to the forEach() method defined in
    JavaScript 1.6.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Object} this
  */
  forEach: function(callback, target) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      callback.call(target, next, idx, this);
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return this ;
  },

  /**
    Retrieves the named value on each member object.  This is more efficient
    than using one of the wrapper methods defined here.  Objects that
    implement SC.Observable will use the get() method, otherwise the property
    will be accessed directly.

    @param {String} key the key to retrieve
    @returns {Array} extracted values
  */
  getEach: function(key) {
    return this.map(function(next) {
      return next ? (next.get ? next.get(key) : next[key]) : null;
    }, this);
  },

  /**
    Sets the value on the named property for each member.  This is more
    efficient than using other methods defined on this helper.  If the object
    implements SC.Observable, the value will be changed to set(), otherwise
    it will be set directly.  null objects are skipped.

    @param {String} key the key to set
    @param {Object} value the object to set
    @returns {Object} receiver
  */
  setEach: function(key, value) {
    this.forEach(function(next) {
      if (next) {
        if (next.set) next.set(key, value) ;
        else next[key] = value ;
      }
    }, this);
    return this ;
  },

  /**
    Maps all of the items in the enumeration to another value, returning
    a new array.  This method corresponds to map() defined in JavaScript 1.6.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    It should return the mapped value.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Array} The mapped array.
  */
  map: function(callback, target) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var ret  = [];
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      ret[idx] = callback.call(target, next, idx, this) ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Similar to map, this specialized function returns the value of the named
    property on all items in the enumeration.

    @params key {String} name of the property
    @returns {Array} The mapped array.
  */
  mapProperty: function(key) {
    return this.map(function(next) {
      return next ? (next.get ? next.get(key) : next[key]) : null;
    });
  },

  /**
    Returns an array with all of the items in the enumeration that the passed
    function returns YES for. This method corresponds to filter() defined in
    JavaScript 1.6.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    It should return the YES to include the item in the results, NO otherwise.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Array} A filtered array.
  */
  filter: function(callback, target) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var ret  = [];
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      if(callback.call(target, next, idx, this)) ret.push(next) ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns an array sorted by the value of the passed key parameters.
    null objects will be sorted first.  You can pass either an array of keys
    or multiple parameters which will act as key names

    @param {String} key one or more key names
    @returns {Array}
  */
  sortProperty: function(key) {
    var keys = (typeof key === SC.T_STRING) ? arguments : key,
        len  = keys.length,
        src;

    // get the src array to sort
    if (this instanceof Array) src = this;
    else {
      src = [];
      this.forEach(function(i) { src.push(i); });
    }

    if (!src) return [];
    return src.sort(function(a,b) {
      var idx, key, aValue, bValue, ret = 0;

      for(idx=0;ret===0 && idx<len;idx++) {
        key = keys[idx];
        aValue = a ? (a.get ? a.get(key) : a[key]) : null;
        bValue = b ? (b.get ? b.get(key) : b[key]) : null;
        ret = SC.compare(aValue, bValue);
      }
      return ret ;
    });
  },


  /**
    Returns an array with just the items with the matched property.  You
    can pass an optional second argument with the target value.  Otherwise
    this will match any property that evaluates to true.

    @params key {String} the property to test
    @param value {String} optional value to test against.
    @returns {Array} filtered array
  */
  filterProperty: function(key, value) {
    var len = this.get ? this.get('length') : this.length ;
    var ret  = [];
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      var cur = next ? (next.get ? next.get(key) : next[key]) : null;
      var matched = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      if (matched) ret.push(next) ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns the first item in the array for which the callback returns YES.
    This method works similar to the filter() method defined in JavaScript 1.6
    except that it will stop working on the array once a match is found.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    It should return the YES to include the item in the results, NO otherwise.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Object} Found item or null.
  */
  find: function(callback, target) {
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var last = null, next, found = NO, ret = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len && !found;idx++) {
      next = this.nextObject(idx, last, context) ;
      if (found = callback.call(target, next, idx, this)) ret = next ;
      last = next ;
    }
    next = last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns an the first item with a property matching the passed value.  You
    can pass an optional second argument with the target value.  Otherwise
    this will match any property that evaluates to true.

    This method works much like the more generic find() method.

    @params key {String} the property to test
    @param value {String} optional value to test against.
    @returns {Object} found item or null
  */
  findProperty: function(key, value) {
    var len = this.get ? this.get('length') : this.length ;
    var found = NO, ret = null, last = null, next, cur ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len && !found;idx++) {
      next = this.nextObject(idx, last, context) ;
      cur = next ? (next.get ? next.get(key) : next[key]) : null;
      found = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      if (found) ret = next ;
      last = next ;
    }
    last = next = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns YES if the passed function returns YES for every item in the
    enumeration.  This corresponds with the every() method in JavaScript 1.6.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    It should return the YES or NO.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    h4. Example Usage

    {{{
      if (people.every(isEngineer)) { Paychecks.addBigBonus(); }
    }}}

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Boolean}
  */
  every: function(callback, target) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var ret  = YES;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;ret && (idx<len);idx++) {
      var next = this.nextObject(idx, last, context) ;
      if(!callback.call(target, next, idx, this)) ret = NO ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns YES if the passed property resolves to true for all items in the
    enumerable.  This method is often simpler/faster than using a callback.

    @params key {String} the property to test
    @param value {String} optional value to test against.
    @returns {Array} filtered array
  */
  everyProperty: function(key, value) {
    var len = this.get ? this.get('length') : this.length ;
    var ret  = YES;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;ret && (idx<len);idx++) {
      var next = this.nextObject(idx, last, context) ;
      var cur = next ? (next.get ? next.get(key) : next[key]) : null;
      ret = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },


  /**
    Returns YES if the passed function returns true for any item in the
    enumeration. This corresponds with the every() method in JavaScript 1.6.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(item, index, enumerable) ;
    }}}

    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    It should return the YES to include the item in the results, NO otherwise.

    Note that in addition to a callback, you can also pass an optional target
    object that will be set as "this" on the context.  This is a good way
    to give your iterator function access to the current object.

    h4. Usage Example

    {{{
      if (people.some(isManager)) { Paychecks.addBiggerBonus(); }
    }}}

    @params callback {Function} the callback to execute
    @params target {Object} the target object to use
    @returns {Array} A filtered array.
  */
  some: function(callback, target) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;
    if (target === undefined) target = null;

    var ret  = NO;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;(!ret) && (idx<len);idx++) {
      var next = this.nextObject(idx, last, context) ;
      if(callback.call(target, next, idx, this)) ret = YES ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Returns YES if the passed property resolves to true for any item in the
    enumerable.  This method is often simpler/faster than using a callback.

    @params key {String} the property to test
    @param value {String} optional value to test against.
    @returns {Boolean} YES
  */
  someProperty: function(key, value) {
    var len = this.get ? this.get('length') : this.length ;
    var ret  = NO;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0; !ret && (idx<len); idx++) {
      var next = this.nextObject(idx, last, context) ;
      var cur = next ? (next.get ? next.get(key) : next[key]) : null;
      ret = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;  // return the invert
  },

  /**
    This will combine the values of the enumerator into a single value. It
    is a useful way to collect a summary value from an enumeration.  This
    corresponds to the reduce() method defined in JavaScript 1.8.

    The callback method you provide should have the following signature (all
    parameters are optional):

    {{{
      function(previousValue, item, index, enumerable) ;
    }}}

    - *previousValue* is the value returned by the last call to the iterator.
    - *item* is the current item in the iteration.
    - *index* is the current index in the iteration
    - *enumerable* is the enumerable object itself.

    Return the new cumulative value.

    In addition to the callback you can also pass an initialValue.  An error
    will be raised if you do not pass an initial value and the enumerator is
    empty.

    Note that unlike the other methods, this method does not allow you to
    pass a target object to set as this for the callback.  It's part of the
    spec. Sorry.

    @params callback {Function} the callback to execute
    @params initialValue {Object} initial value for the reduce
    @params reducerProperty {String} internal use only.  May not be available.
    @returns {Array} A filtered array.
  */
  reduce: function(callback, initialValue, reducerProperty) {
    if (typeof callback !== "function") throw new TypeError() ;
    var len = this.get ? this.get('length') : this.length ;

    // no value to return if no initial value & empty
    if (len===0 && initialValue === undefined) throw new TypeError();

    var ret  = initialValue;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(var idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;

      // while ret is still undefined, just set the first value we get as ret.
      // this is not the ideal behavior actually but it matches the FireFox
      // implementation... :(
      if (next !== null) {
        if (ret === undefined) {
          ret = next ;
        } else {
          ret = callback.call(null, ret, next, idx, this, reducerProperty);
        }
      }
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);

    // uh oh...we never found a value!
    if (ret === undefined) throw new TypeError() ;
    return ret ;
  },

  /**
    Invokes the named method on every object in the receiver that
    implements it.  This method corresponds to the implementation in
    Prototype 1.6.

    @param methodName {String} the name of the method
    @param args {Object...} optional arguments to pass as well.
    @returns {Array} return values from calling invoke.
  */
  invoke: function(methodName) {
    var len = this.get ? this.get('length') : this.length ;
    if (len <= 0) return [] ; // nothing to invoke....

    var idx;

    // collect the arguments
    var args = [] ;
    var alen = arguments.length ;
    if (alen > 1) {
      for(idx=1;idx<alen;idx++) args.push(arguments[idx]) ;
    }

    // call invoke
    var ret = [] ;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(idx=0;idx<len;idx++) {
      var next = this.nextObject(idx, last, context) ;
      var method = next ? next[methodName] : null ;
      if (method) ret[idx] = method.apply(next, args) ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Invokes the passed method and optional arguments on the receiver elements
    as long as the methods return value matches the target value.  This is
    a useful way to attempt to apply changes to a collection of objects unless
    or until one fails.

    @param targetValue {Object} the target return value
    @param methodName {String} the name of the method
    @param args {Object...} optional arguments to pass as well.
    @returns {Array} return values from calling invoke.
  */
  invokeWhile: function(targetValue, methodName) {
    var len = this.get ? this.get('length') : this.length ;
    if (len <= 0) return null; // nothing to invoke....

    var idx;

    // collect the arguments
    var args = [] ;
    var alen = arguments.length ;
    if (alen > 2) {
      for(idx=2;idx<alen;idx++) args.push(arguments[idx]) ;
    }

    // call invoke
    var ret = targetValue ;
    var last = null ;
    var context = SC.Enumerator._popContext();
    for(idx=0;(ret === targetValue) && (idx<len);idx++) {
      var next = this.nextObject(idx, last, context) ;
      var method = next ? next[methodName] : null ;
      if (method) ret = method.apply(next, args) ;
      last = next ;
    }
    last = null ;
    context = SC.Enumerator._pushContext(context);
    return ret ;
  },

  /**
    Simply converts the enumerable into a genuine array.  The order, of
    course, is not gauranteed.  Corresponds to the method implemented by
    Prototype.

    @returns {Array} the enumerable as an array.
  */
  toArray: function() {
    var ret = [];
    this.forEach(function(o) { ret.push(o); }, this);
    return ret ;
  },

  /**
    Converts an enumerable into a matrix, with inner arrays grouped based
    on a particular property of the elements of the enumerable.

    @params key {String} the property to test
    @returns {Array} matrix of arrays
  */
  groupBy: function(key){
    var len = this.get ? this.get('length') : this.length,
        ret = [],
        last = null,
        context = SC.Enumerator._popContext(),
        grouped = [], 
        keyValues = [],
        idx, next, cur;
    
    for(idx=0;idx<len;idx++) {
      next = this.nextObject(idx, last, context) ;
      cur = next ? (next.get ? next.get(key) : next[key]) : null;
      if(SC.none(grouped[cur])) { 
        grouped[cur] = []; keyValues.push(cur);
      }
      grouped[cur].push(next);
      last = next;
    }
    last = null;
    context = SC.Enumerator._pushContext(context);
    
    for(idx=0,len=keyValues.length; idx < len; idx++){
      ret.push(grouped[keyValues[idx]]);        
    }
    return ret ;
  }

} ;

// Build in a separate function to avoid unintential leaks through closures...
SC._buildReducerFor = function(reducerKey, reducerProperty) {
  return function(key, value) {
    var reducer = this[reducerKey] ;
    if (SC.typeOf(reducer) !== SC.T_FUNCTION) {
      return this.unknownProperty ? this.unknownProperty(key, value) : null;
    } else {
      // Invoke the reduce method defined in enumerable instead of using the
      // one implemented in the receiver.  The receiver might be a native
      // implementation that does not support reducerProperty.
      var ret = SC.Enumerable.reduce.call(this, reducer, null, reducerProperty) ;
      return ret ;
    }
  }.property('[]') ;
};

SC.Reducers = /** @lends SC.Enumerable */ {
  /**
    This property will trigger anytime the enumerable's content changes.
    You can observe this property to be notified of changes to the enumerables
    content.

    For plain enumerables, this property is read only.  SC.Array overrides
    this method.

    @property {SC.Array}
  */
  '[]': function(key, value) { return this ; }.property(),

  /**
    Invoke this method when the contents of your enumerable has changed.
    This will notify any observers watching for content changes.  If your are
    implementing an ordered enumerable (such as an array), also pass the
    start and end values where the content changed so that it can be used to
    notify range observers.

    @param {Number} start optional start offset for the content change
    @param {Number} length optional length of change
    @param {Number} delta if you added or removed objects, the delta change
    @param {Array} addedObjects the objects that were added
    @param {Array} removedObjects the objects that were removed
    @returns {Object} receiver
  */
  enumerableContentDidChange: function(start, length, delta, addedObjects, removedObjects) {
    this._setupEnumerableObservers(addedObjects, removedObjects);
    this.notifyPropertyChange('[]') ;

    return this ;
  },

  /**
    @private

    Clones a segment of an observer chain and applies it
    to an element of this Enumerable.

    @param {SC._ChainObserver} chainObserver the chain segment to begin from
  */
  _resumeChainObservingForItemWithChainObserver: function(item, chainObserver) {
    var observer = SC.clone(chainObserver.next);
    var key = observer.property;

    // The chain observer should create new observers on the child object
    observer.object = item;
    item.addObserver(key, observer, observer.propertyDidChange);

    // if we're in the initial chained observer setup phase, add the tail
    // of the current observer segment to the list of tracked tails.
    if(chainObserver.root.tails) {
      chainObserver.root.tails.pushObject(observer.tail());
    }

    observer.propertyDidChange();

    // Maintain a list of observers on the item so we can remove them
    // if it is removed from the enumerable.
    item._kvo_for(SC.keyFor('_kvo_enumerable_observers', key)).push(observer);
  },

  /**
    @private

    When enumerable content has changed, remove enumerable observers from
    items that are no longer in the enumerable, and add observers to newly
    added items.

    @param {Array} addedObjects the array of objects that have been added
    @param {Array} removedObjects the array of objects that have been removed
  */
  _setupEnumerableObservers: function(addedObjects, removedObjects) {
    if (!addedObjects) { addedObjects = this; }
    if (!removedObjects) { removedObjects = []; }

    var observedKeys = this._kvo_for('_kvo_enumerable_observed_keys', SC.CoreSet);
    var kvoKey;

    // Only setup and teardown enumerable observers if we have keys to observe
    if (observedKeys.get('length') > 0) {
      // Loop through removed objects and remove any enumerable observers that
      // belong to them.
      removedObjects.forEach(function(item) {
        item._kvo_for('_kvo_enumerable_observers').forEach(function(observer) {
          // Remove the observer if it is pointing at this enumerable.
          // If the observer belongs to another enumerable, just ignore it.
          if (observer.object === this) {
            item.removeObserver(observer.key, observer, observer.propertyDidChange);
          }
        });
      });

      // added and resume the chain observer.
      observedKeys.forEach(function(key) {
        kvoKey = SC.keyFor('_kvo_enumerable_observers', key);

        var lastObserver;

        // Get all original ChainObservers associated with the key
        this._kvo_for(kvoKey).forEach(function(observer) {
          // if there are no added objects or removed objects, this
          // object is a proxy (like ArrayController), which does
          // not currently receive the added or removed objects.
          // As a result, walk down to the last element of the
          // chain and trigger its propertyDidChange, which will
          // invalidate anything listening.
          if(!addedObjects.get('length') && !removedObjects.get('length')) {
            lastObserver = observer;
            while(lastObserver.next) { lastObserver = lastObserver.next; }
            lastObserver.propertyDidChange();
          } else {
            addedObjects.forEach(function(item) {
              this._resumeChainObservingForItemWithChainObserver(item, observer);
            }, this);
          }
        }, this);
      }, this);
    }
  },

  /**
    @private

    Adds an enumerable observer. Enumerable observers are able to
    propagate chain observers to each member item in the enumerable,
    so that the observer is fired whenever a single item changes.

    You should never call this method directly. Instead, you should
    call addObserver() with the special '[]' property in the path.

    For example, if you wanted to observe changes to each item's isDone
    property, you could call:

        arrayController.addObserver('[].isDone');
  */
  addEnumerableObserver: function(key, target, action) {
    // Add the key to a set so we know what we are observing
    this._kvo_for('_kvo_enumerable_observed_keys', SC.CoreSet).push(key);

    // Add the passed ChainObserver to an ObserverSet for that key
    var kvoKey = SC.keyFor('_kvo_enumerable_observers', key);
    this._kvo_for(kvoKey).push(target);

    // set up chained observers on the initial content
    this._setupEnumerableObservers(this);
  },

  /**
    Call this method from your unknownProperty() handler to implement
    automatic reduced properties.  A reduced property is a property that
    collects its contents dynamically from your array contents.  Reduced
    properties always begin with "@".  Getting this property will call
    reduce() on your array with the function matching the key name as the
    processor.

    The return value of this will be either the return value from the
    reduced property or undefined, which means this key is not a reduced
    property.  You can call this at the top of your unknownProperty handler
    like so:

    {{{
      unknownProperty: function(key, value) {
        var ret = this.handleReduceProperty(key, value) ;
        if (ret === undefined) {
          // process like normal
        }
      }
    }}}

    @param {String} key
      the reduce property key

    @param {Object} value
      a value or undefined.

    @param {Boolean} generateProperty
      only set to false if you do not want an optimized computed property
      handler generated for this.  Not common.

    @returns {Object} the reduced property or undefined
  */
  reducedProperty: function(key, value, generateProperty) {

    if (!key || typeof key !== SC.T_STRING || key.charAt(0) !== '@') return undefined ; // not a reduced property

    // get the reducer key and the reducer
    var matches = key.match(/^@([^(]*)(\(([^)]*)\))?$/) ;
    if (!matches || matches.length < 2) return undefined ; // no match

    var reducerKey = matches[1]; // = 'max' if key = '@max(balance)'
    var reducerProperty = matches[3] ; // = 'balance' if key = '@max(balance)'
    reducerKey = "reduce" + reducerKey.slice(0,1).toUpperCase() + reducerKey.slice(1);
    var reducer = this[reducerKey] ;

    // if there is no reduce function defined for this key, then we can't
    // build a reducer for it.
    if (SC.typeOf(reducer) !== SC.T_FUNCTION) return undefined;

    // if we can't generate the property, just run reduce
    if (generateProperty === NO) {
      return SC.Enumerable.reduce.call(this, reducer, null, reducerProperty) ;
    }

    // ok, found the reducer.  Let's build the computed property and install
    var func = SC._buildReducerFor(reducerKey, reducerProperty);
    var p = this.constructor.prototype ;

    if (p) {
      p[key] = func ;

      // add the function to the properties array so that new instances
      // will have their dependent key registered.
      var props = p._properties || [] ;
      props.push(key) ;
      p._properties = props ;
      this.registerDependentKey(key, '[]') ;
    }

    // and reduce anyway...
    return SC.Enumerable.reduce.call(this, reducer, null, reducerProperty) ;
  },

  /**
    Reducer for @max reduced property.
  */
  reduceMax: function(previousValue, item, index, e, reducerProperty) {
    if (reducerProperty && item) {
      item = item.get ? item.get(reducerProperty) : item[reducerProperty];
    }
    if (previousValue === null) return item ;
    return (item > previousValue) ? item : previousValue ;
  },

  /**
    Reducer for @maxObject reduced property.
  */
  reduceMaxObject: function(previousItem, item, index, e, reducerProperty) {

    // get the value for both the previous and current item.  If no
    // reducerProperty was supplied, use the items themselves.
    var previousValue = previousItem, itemValue = item ;
    if (reducerProperty) {
      if (item) {
        itemValue = item.get ? item.get(reducerProperty) : item[reducerProperty] ;
      }

      if (previousItem) {
        previousValue = previousItem.get ? previousItem.get(reducerProperty) : previousItem[reducerProperty] ;
      }
    }
    if (previousValue === null) return item ;
    return (itemValue > previousValue) ? item : previousItem ;
  },

  /**
    Reducer for @min reduced property.
  */
  reduceMin: function(previousValue, item, index, e, reducerProperty) {
    if (reducerProperty && item) {
      item = item.get ? item.get(reducerProperty) : item[reducerProperty];
    }
    if (previousValue === null) return item ;
    return (item < previousValue) ? item : previousValue ;
  },

  /**
    Reducer for @maxObject reduced property.
  */
  reduceMinObject: function(previousItem, item, index, e, reducerProperty) {

    // get the value for both the previous and current item.  If no
    // reducerProperty was supplied, use the items themselves.
    var previousValue = previousItem, itemValue = item ;
    if (reducerProperty) {
      if (item) {
        itemValue = item.get ? item.get(reducerProperty) : item[reducerProperty] ;
      }

      if (previousItem) {
        previousValue = previousItem.get ? previousItem.get(reducerProperty) : previousItem[reducerProperty] ;
      }
    }
    if (previousValue === null) return item ;
    return (itemValue < previousValue) ? item : previousItem ;
  },

  /**
    Reducer for @average reduced property.
  */
  reduceAverage: function(previousValue, item, index, e, reducerProperty) {
    if (reducerProperty && item) {
      item = item.get ? item.get(reducerProperty) : item[reducerProperty];
    }
    var ret = (previousValue || 0) + item ;
    var len = e.get ? e.get('length') : e.length;
    if (index >= len-1) ret = ret / len; //avg after last item.
    return ret ;
  },

  /**
    Reducer for @sum reduced property.
  */
  reduceSum: function(previousValue, item, index, e, reducerProperty) {
    if (reducerProperty && item) {
      item = item.get ? item.get(reducerProperty) : item[reducerProperty];
    }
    return (previousValue === null) ? item : previousValue + item ;
  }
} ;

// Apply reducers...
SC.mixin(SC.Enumerable, SC.Reducers) ;
SC.mixin(Array.prototype, SC.Reducers) ;
Array.prototype.isEnumerable = YES ;

// ......................................................
// ARRAY SUPPORT
//

// Implement the same enhancements on Array.  We use specialized methods
// because working with arrays are so common.
(function() {

  // These methods will be applied even if they already exist b/c we do it
  // better.
  var alwaysMixin = {

    // this is supported so you can get an enumerator.  The rest of the
    // methods do not use this just to squeeze every last ounce of perf as
    // possible.
    nextObject: SC.Enumerable.nextObject,
    enumerator: SC.Enumerable.enumerator,
    firstObject: SC.Enumerable.firstObject,
    lastObject: SC.Enumerable.lastObject,
    sortProperty: SC.Enumerable.sortProperty,

    // see above...
    mapProperty: function(key) {
      var len = this.length ;
      var ret  = [];
      for(var idx=0;idx<len;idx++) {
        var next = this[idx] ;
        ret[idx] = next ? (next.get ? next.get(key) : next[key]) : null;
      }
      return ret ;
    },

    filterProperty: function(key, value) {
      var len = this.length ;
      var ret  = [];
      for(var idx=0;idx<len;idx++) {
        var next = this[idx] ;
        var cur = next ? (next.get ? next.get(key) : next[key]) : null;
        var matched = (value === undefined) ? !!cur : SC.isEqual(cur, value);
        if (matched) ret.push(next) ;
      }
      return ret ;
    },

    //returns a matrix
    groupBy: function(key) {
      var len = this.length,
          ret = [],
          grouped = [], 
          keyValues = [],
          idx, next, cur;
      
      for(idx=0;idx<len;idx++) {
        next = this[idx] ;
        cur = next ? (next.get ? next.get(key) : next[key]) : null;
        if(SC.none(grouped[cur])){ grouped[cur] = []; keyValues.push(cur); }
        grouped[cur].push(next);
      }
      
      for(idx=0,len=keyValues.length; idx < len; idx++){
        ret.push(grouped[keyValues[idx]]);        
      }
      return ret ;
    },
    
    find: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;
      var len = this.length ;
      if (target === undefined) target = null;

      var next, ret = null, found = NO;
      for(var idx=0;idx<len && !found;idx++) {
        next = this[idx] ;
        if(found = callback.call(target, next, idx, this)) ret = next ;
      }
      next = null;
      return ret ;
    },

    findProperty: function(key, value) {
      var len = this.length ;
      var next, cur, found=NO, ret=null;
      for(var idx=0;idx<len && !found;idx++) {
        cur = (next=this[idx]) ? (next.get ? next.get(key): next[key]):null;
        found = (value === undefined) ? !!cur : SC.isEqual(cur, value);
        if (found) ret = next ;
      }
      next=null;
      return ret ;
    },

    everyProperty: function(key, value) {
      var len = this.length ;
      var ret  = YES;
      for(var idx=0;ret && (idx<len);idx++) {
        var next = this[idx] ;
        var cur = next ? (next.get ? next.get(key) : next[key]) : null;
        ret = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      }
      return ret ;
    },

    someProperty: function(key, value) {
      var len = this.length ;
      var ret  = NO;
      for(var idx=0; !ret && (idx<len); idx++) {
        var next = this[idx] ;
        var cur = next ? (next.get ? next.get(key) : next[key]) : null;
        ret = (value === undefined) ? !!cur : SC.isEqual(cur, value);
      }
      return ret ;  // return the invert
    },

    invoke: function(methodName) {
      var len = this.length ;
      if (len <= 0) return [] ; // nothing to invoke....

      var idx;

      // collect the arguments
      var args = [] ;
      var alen = arguments.length ;
      if (alen > 1) {
        for(idx=1;idx<alen;idx++) args.push(arguments[idx]) ;
      }

      // call invoke
      var ret = [] ;
      for(idx=0;idx<len;idx++) {
        var next = this[idx] ;
        var method = next ? next[methodName] : null ;
        if (method) ret[idx] = method.apply(next, args) ;
      }
      return ret ;
    },

    invokeWhile: function(targetValue, methodName) {
      var len = this.length ;
      if (len <= 0) return null ; // nothing to invoke....

      var idx;

      // collect the arguments
      var args = [] ;
      var alen = arguments.length ;
      if (alen > 2) {
        for(idx=2;idx<alen;idx++) args.push(arguments[idx]) ;
      }

      // call invoke
      var ret = targetValue ;
      for(idx=0;(ret === targetValue) && (idx<len);idx++) {
        var next = this[idx] ;
        var method = next ? next[methodName] : null ;
        if (method) ret = method.apply(next, args) ;
      }
      return ret ;
    },

    toArray: function() {
      var len = this.length ;
      if (len <= 0) return [] ; // nothing to invoke....

      // call invoke
      var ret = [] ;
      for(var idx=0;idx<len;idx++) {
        var next = this[idx] ;
        ret.push(next) ;
      }
      return ret ;
    },

    getEach: function(key) {
      var ret = [];
      var len = this.length ;
      for(var idx=0;idx<len;idx++) {
        var obj = this[idx];
        ret[idx] = obj ? (obj.get ? obj.get(key) : obj[key]) : null;
      }
      return ret ;
    },

    setEach: function(key, value) {
      var len = this.length;
      for(var idx=0;idx<len;idx++) {
        var obj = this[idx];
        if (obj) {
          if (obj.set) {
            obj.set(key, value);
          } else obj[key] = value ;
        }
      }
      return this ;
    }

  };

  // These methods will only be applied if they are not already defined b/c
  // the browser is probably getting it.
  var mixinIfMissing = {

    // QUESTION: The lack of DRY is burning my eyes [YK]
    forEach: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;

      // QUESTION: Is this necessary?
      if (target === undefined) target = null;

      for(var i=0, l=this.length; i<l; i++) {
        var next = this[i] ;
        callback.call(target, next, i, this);
      }
      return this ;
    },

    map: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;

      if (target === undefined) target = null;

      var ret  = [];
      for(var i=0, l=this.length; i<l; i++) {
        var next = this[i] ;
        ret[i] = callback.call(target, next, i, this) ;
      }
      return ret ;
    },

    filter: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;

      if (target === undefined) target = null;

      var ret  = [];
      for(var i=0, l=this.length; i<l; i++) {
        var next = this[i] ;
        if(callback.call(target, next, i, this)) ret.push(next) ;
      }
      return ret ;
    },

    every: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;
      var len = this.length ;
      if (target === undefined) target = null;

      var ret  = YES;
      for(var idx=0;ret && (idx<len);idx++) {
        var next = this[idx] ;
        if(!callback.call(target, next, idx, this)) ret = NO ;
      }
      return ret ;
    },

    some: function(callback, target) {
      if (typeof callback !== "function") throw new TypeError() ;
      var len = this.length ;
      if (target === undefined) target = null;

      var ret  = NO;
      for(var idx=0;(!ret) && (idx<len);idx++) {
        var next = this[idx] ;
        if(callback.call(target, next, idx, this)) ret = YES ;
      }
      return ret ;
    },

    reduce: function(callback, initialValue, reducerProperty) {
      if (typeof callback !== "function") throw new TypeError() ;
      var len = this.length ;

      // no value to return if no initial value & empty
      if (len===0 && initialValue === undefined) throw new TypeError();

      var ret  = initialValue;
      for(var idx=0;idx<len;idx++) {
        var next = this[idx] ;

        // while ret is still undefined, just set the first value we get as
        // ret. this is not the ideal behavior actually but it matches the
        // FireFox implementation... :(
        if (next !== null) {
          if (ret === undefined) {
            ret = next ;
          } else {
            ret = callback.call(null, ret, next, idx, this, reducerProperty);
          }
        }
      }

      // uh oh...we never found a value!
      if (ret === undefined) throw new TypeError() ;
      return ret ;
    }
  };

  // Apply methods if missing...
  for(var key in mixinIfMissing) {
    if (!mixinIfMissing.hasOwnProperty(key)) continue ;

    // The mixinIfMissing methods should be applied if they are not defined.
    // If Prototype 1.6 is included, some of these methods will be defined
    // already, but we want to override them anyway in this special case
    // because our version is faster and functionally identitical.
    if (!Array.prototype[key] || ((typeof Prototype === 'object') && Prototype.Version.match(/^1\.6/))) {
      Array.prototype[key] = mixinIfMissing[key] ;
    }
  }

  // Apply other methods...
  SC.mixin(Array.prototype, alwaysMixin) ;

})() ;


/* >>>>>>>>>> BEGIN source/system/range_observer.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


/** @class

  A RangeObserver is used by Arrays to automatically observe all of the
  objects in a particular range on the array.  Whenever any property on one
  of those objects changes, it will notify its delegate.  Likewise, whenever
  the contents of the array itself changes, it will notify its delegate and
  possibly update its own registration.

  This implementation uses only SC.Array methods.  It can be used on any
  object that complies with SC.Array.  You may, however, choose to subclass
  this object in a way that is more optimized for your particular design.

  @since SproutCore 1.0
*/
SC.RangeObserver = {

  /**
    Walk like a duck.

    @property {Boolean}
  */
  isRangeObserver: YES,

  /** @private */
  toString: function() {
    var base = this.indexes ? this.indexes.toString() : "SC.IndexSet<..>";
    return base.replace('IndexSet', 'RangeObserver(%@)'.fmt(SC.guidFor(this)));
  },

  /**
    Creates a new range observer owned by the source.  The indexSet you pass
    must identify the indexes you are interested in observing.  The passed
    target/method will be invoked whenever the observed range changes.

    Note that changes to a range are buffered until the end of a run loop
    unless a property on the record itself changes.

    @param {SC.Array} source the source array
    @param {SC.IndexSet} indexSet set of indexes to observer
    @param {Object} target the target
    @param {Function|String} method the method to invoke
    @param {Object} context optional context to include in callback
    @param {Boolean} isDeep if YES, observe property changes as well
    @returns {SC.RangeObserver} instance
  */
  create: function(source, indexSet, target, method, context, isDeep) {
    var ret = SC.beget(this);
    ret.source = source;
    ret.indexes = indexSet ? indexSet.frozenCopy() : null;
    ret.target = target;
    ret.method = method;
    ret.context = context ;
    ret.isDeep  = isDeep || false ;
    ret.beginObserving();
    return ret ;
  },

  /**
    Create subclasses for the RangeObserver.  Pass one or more attribute
    hashes.  Use this to create customized RangeObservers if needed for your
    classes.

    @param {Hash} attrs one or more attribute hashes
    @returns {SC.RangeObserver} extended range observer class
  */
  extend: function(attrs) {
    var ret = SC.beget(this), args = arguments;
    for(var i=0, l=args.length; i<l; i++) { SC.mixin(ret, args[i]); }
    return ret ;
  },

  /**
    Destroys an active ranger observer, cleaning up first.

    @param {SC.Array} source the source array
    @returns {SC.RangeObserver} receiver
  */
  destroy: function(source) {
    this.endObserving();
    return this;
  },

  /**
    Updates the set of indexes the range observer applies to.  This will
    stop observing the old objects for changes and start observing the
    new objects instead.

    @param {SC.Array} source the source array
    @returns {SC.RangeObserver} receiver
  */
  update: function(source, indexSet) {
    if (this.indexes && this.indexes.isEqual(indexSet)) { return this ; }

    this.indexes = indexSet ? indexSet.frozenCopy() : null ;
    this.endObserving().beginObserving();
    return this;
  },

  /**
    Configures observing for each item in the current range.  Should update
    the observing array with the list of observed objects so they can be
    torn down later

    @returns {SC.RangeObserver} receiver
  */
  beginObserving: function() {
    if ( !this.isDeep ) { return this; } // nothing to do

    var observing = this.observing = this.observing || SC.CoreSet.create();

    // cache iterator function to keep things fast
    var func = this._beginObservingForEach, source = this.source;

    if( !func ) {
      func = this._beginObservingForEach = function(idx) {
        var obj = source.objectAt(idx);
        if (obj && obj.addObserver) {
          observing.push(obj);
          obj._kvo_needsRangeObserver = true ;
        }
      };
    }

    this.indexes.forEach(func);

    // add to pending range observers queue so that if any of these objects
    // change we will have a chance to setup observing on them.
    this.isObserving = false ;
    SC.Observers.addPendingRangeObserver(this);

    return this;
  },

  /** @private
    Called when an object that appears to need range observers has changed.
    Check to see if the range observer contains this object in its list.  If
    it does, go ahead and setup observers on all objects and remove ourself
    from the queue.
  */
  setupPending: function(object) {
    var observing = this.observing ;

    if ( this.isObserving || !observing || (observing.get('length')===0) ) {
      return true ;
    }

    if (observing.contains(object)) {
      this.isObserving = true ;

      // cache iterator function to keep things fast
      var func = this._setupPendingForEach;
      if (!func) {
        var source = this.source,
            method = this.objectPropertyDidChange,
            self   = this;

        func = this._setupPendingForEach = function(idx) {
          var obj = source.objectAt(idx),
              guid = SC.guidFor(obj),
              key ;

          if (obj && obj.addObserver) {
            observing.push(obj);
            obj.addObserver('*', self, method);

            // also save idx of object on range observer itself.  If there is
            // more than one idx, convert to IndexSet.
            key = self[guid];
            if ( key == null ) {
              self[guid] = idx ;
            } else if (key.isIndexSet) {
              key.add(idx);
            } else {
              self[guid] = SC.IndexSet.create(key).add(idx);
            }

          }
        };
      }
      this.indexes.forEach(func);
      return true ;
    } else {
      return false ;
    }
  },

  /**
    Remove observers for any objects currently begin observed.  This is
    called whenever the observed range changes due to an array change or
    due to destroying the observer.

    @returns {SC.RangeObserver} receiver
  */
  endObserving: function() {
    if ( !this.isDeep ) return this; // nothing to do

    var observing = this.observing;

    if (this.isObserving) {
      var meth      = this.objectPropertyDidChange,
          source    = this.source,
          idx, lim, obj;

      if (observing) {
        lim = observing.length;
        for(idx=0;idx<lim;idx++) {
          obj = observing[idx];
          obj.removeObserver('*', this, meth);
          this[SC.guidFor(obj)] = null;
        }
        observing.length = 0 ; // reset
      }

      this.isObserving = false ;
    }

    if (observing) { observing.clear(); } // empty set.
    return this ;
  },

  /**
    Whenever the actual objects in the range changes, notify the delegate
    then begin observing again.  Usually this method will be passed an
    IndexSet with the changed indexes.  The range observer will only notify
    its delegate if the changed indexes include some of all of the indexes
    this range observer is monitoring.

    @param {SC.IndexSet} changes optional set of changed indexes
    @returns {SC.RangeObserver} receiver
  */
  rangeDidChange: function(changes) {
    var indexes = this.indexes;
    if ( !changes || !indexes || indexes.intersects(changes) ) {
      this.endObserving(); // remove old observers
      this.method.call(this.target, this.source, null, '[]', changes, this.context);
      this.beginObserving(); // setup new ones
    }
    return this ;
  },

  /**
    Whenever an object changes, notify the delegate

    @param {Object} the object that changed
    @param {String} key the property that changed
    @returns {SC.RangeObserver} receiver
  */
  objectPropertyDidChange: function(object, key, value, rev) {
    var context = this.context,
        method  = this.method,
        guid    = SC.guidFor(object),
        index   = this[guid];

    // lazily convert index to IndexSet.
    if ( index && !index.isIndexSet ) {
      index = this[guid] = SC.IndexSet.create(index).freeze();
    }

    method.call(this.target, this.source, object, key, index, context || rev, rev);
  }

};

/* >>>>>>>>>> BEGIN source/mixins/array.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

// note: SC.Observable also enhances array.  make sure we are called after
// SC.Observable so our version of unknownProperty wins.
sc_require('mixins/observable');
sc_require('mixins/enumerable');
sc_require('system/range_observer');

SC.OUT_OF_RANGE_EXCEPTION = "Index out of range" ;

/**
  @namespace

  This module implements Observer-friendly Array-like behavior.  This mixin is
  picked up by the Array class as well as other controllers, etc. that want to
  appear to be arrays.

  Unlike SC.Enumerable, this mixin defines methods specifically for
  collections that provide index-ordered access to their contents.  When you
  are designing code that needs to accept any kind of Array-like object, you
  should use these methods instead of Array primitives because these will
  properly notify observers of changes to the array.

  Although these methods are efficient, they do add a layer of indirection to
  your application so it is a good idea to use them only when you need the
  flexibility of using both true JavaScript arrays and "virtual" arrays such
  as controllers and collections.

  You can use the methods defined in this module to access and modify array
  contents in a KVO-friendly way.  You can also be notified whenever the
  membership if an array changes by changing the syntax of the property to
  .observes('*myProperty.[]') .

  To support SC.Array in your own class, you must override two
  primitives to use it: replace() and objectAt().

  Note that the SC.Array mixin also incorporates the SC.Enumerable mixin.  All
  SC.Array-like objects are also enumerable.

  @extends SC.Enumerable
  @since SproutCore 0.9.0
*/
SC.Array = {

  /**
    Walk like a duck - use isSCArray to avoid conflicts
  */
  isSCArray: YES,

  /**
    @field {Number} length

    Your array must support the length property.  Your replace methods should
    set this property whenever it changes.
  */
  // length: 0,

  /**
    This is one of the primitves you must implement to support SC.Array.  You
    should replace amt objects started at idx with the objects in the passed
    array.  You should also call this.enumerableContentDidChange() ;

    @param {Number} idx
      Starting index in the array to replace.  If idx >= length, then append to
      the end of the array.

    @param {Number} amt
      Number of elements that should be removed from the array, starting at
      *idx*.

    @param {Array} objects
      An array of zero or more objects that should be inserted into the array at
      *idx*
  */
  replace: function(idx, amt, objects) {
    throw "replace() must be implemented to support SC.Array" ;
  },

  /**
    This is one of the primitives you must implement to support SC.Array.
    Returns the object at the named index.  If your object supports retrieving
    the value of an array item using get() (i.e. myArray.get(0)), then you do
    not need to implement this method yourself.

    @param {Number} idx
      The index of the item to return.  If idx exceeds the current length,
      return null.
  */
  objectAt: function(idx) {
    if (idx < 0) return undefined ;
    if (idx >= this.get('length')) return undefined;
    return this.get(idx);
  },

  /**
    @field []

    This is the handler for the special array content property.  If you get
    this property, it will return this.  If you set this property it a new
    array, it will replace the current content.

    This property overrides the default property defined in SC.Enumerable.
  */
  '[]': function(key, value) {
    if (value !== undefined) {
      this.replace(0, this.get('length'), value) ;
    }
    return this ;
  }.property(),

  /**
    This will use the primitive replace() method to insert an object at the
    specified index.

    @param {Number} idx index of insert the object at.
    @param {Object} object object to insert
  */
  insertAt: function(idx, object) {
    if (idx > this.get('length')) throw SC.OUT_OF_RANGE_EXCEPTION ;
    this.replace(idx,0,[object]) ;
    return this ;
  },

  /**
    Remove an object at the specified index using the replace() primitive
    method.  You can pass either a single index, a start and a length or an
    index set.

    If you pass a single index or a start and length that is beyond the
    length this method will throw an SC.OUT_OF_RANGE_EXCEPTION

    @param {Number|SC.IndexSet} start index, start of range, or index set
    @param {Number} length length of passing range
    @returns {Object} receiver
  */
  removeAt: function(start, length) {

    var delta = 0, // used to shift range
        empty = [];

    if (typeof start === SC.T_NUMBER) {

      if ((start < 0) || (start >= this.get('length'))) {
        throw SC.OUT_OF_RANGE_EXCEPTION;
      }

      // fast case
      if (length === undefined) {
        this.replace(start,1,empty);
        return this ;
      } else {
        start = SC.IndexSet.create(start, length);
      }
    }

    this.beginPropertyChanges();
    start.forEachRange(function(start, length) {
      start -= delta ;
      delta += length ;
      this.replace(start, length, empty); // remove!
    }, this);
    this.endPropertyChanges();

    return this ;
  },

  /**
    Search the array of this object, removing any occurrences of it.
    @param {object} obj object to remove
  */
  removeObject: function(obj) {
    var loc = this.get('length') || 0;
    while(--loc >= 0) {
      var curObject = this.objectAt(loc) ;
      if (curObject == obj) this.removeAt(loc) ;
    }
    return this ;
  },

  /**
    Search the array for the passed set of objects and remove any occurrences
    of the.

    @param {SC.Enumerable} objects the objects to remove
    @returns {SC.Array} receiver
  */
  removeObjects: function(objects) {
    this.beginPropertyChanges();
    objects.forEach(function(obj) { this.removeObject(obj); }, this);
    this.endPropertyChanges();
    return this;
  },

  /**
    Push the object onto the end of the array.  Works just like push() but it
    is KVO-compliant.
  */
  pushObject: function(obj) {
    this.insertAt(this.get('length'), obj) ;
    return obj ;
  },


  /**
    Add the objects in the passed numerable to the end of the array.  Defers
    notifying observers of the change until all objects are added.

    @param {SC.Enumerable} objects the objects to add
    @returns {SC.Array} receiver
  */
  pushObjects: function(objects) {
    this.beginPropertyChanges();
    objects.forEach(function(obj) { this.pushObject(obj); }, this);
    this.endPropertyChanges();
    return this;
  },

  /**
    Pop object from array or nil if none are left.  Works just like pop() but
    it is KVO-compliant.
  */
  popObject: function() {
    var len = this.get('length') ;
    if (len === 0) return null ;

    var ret = this.objectAt(len-1) ;
    this.removeAt(len-1) ;
    return ret ;
  },

  /**
    Shift an object from start of array or nil if none are left.  Works just
    like shift() but it is KVO-compliant.
  */
  shiftObject: function() {
    if (this.get('length') === 0) return null ;
    var ret = this.objectAt(0) ;
    this.removeAt(0) ;
    return ret ;
  },

  /**
    Unshift an object to start of array.  Works just like unshift() but it is
    KVO-compliant.
  */
  unshiftObject: function(obj) {
    this.insertAt(0, obj) ;
    return obj ;
  },


  /**
    Adds the named objects to the beginning of the array.  Defers notifying
    observers until all objects have been added.

    @param {SC.Enumerable} objects the objects to add
    @returns {SC.Array} receiver
  */
  unshiftObjects: function(objects) {
    this.beginPropertyChanges();
    objects.forEach(function(obj) { this.unshiftObject(obj); }, this);
    this.endPropertyChanges();
    return this;
  },

  /**
    Compares each item in the array.  Returns true if they are equal.
  */
  isEqual: function(ary) {
    if (!ary) return false ;
    if (ary == this) return true;

    var loc = ary.get('length') ;
    if (loc != this.get('length')) return false ;

    while(--loc >= 0) {
      if (!SC.isEqual(ary.objectAt(loc), this.objectAt(loc))) return false ;
    }
    return true ;
  },

  /**
    Generates a new array with the contents of the old array, sans any null
    values.

    @returns {Array}
  */
  compact: function() { return this.without(null); },

  /**
    Generates a new array with the contents of the old array, sans the passed
    value.

    @param {Object} value
    @returns {Array}
  */
  without: function(value) {
    if (this.indexOf(value)<0) return this; // value not present.
    var ret = [] ;
    this.forEach(function(k) {
      if (k !== value) ret[ret.length] = k;
    }) ;
    return ret ;
  },

  /**
    Generates a new array with only unique values from the contents of the
    old array.

    @returns {Array}
  */
  uniq: function() {
    var ret = [] ;
    this.forEach(function(k){
      if (ret.indexOf(k)<0) ret[ret.length] = k;
    });
    return ret ;
  },

  /**
    Returns the largest Number in an array of Numbers. Make sure the array
    only contains values of type Number to get expected result.

    Note: This only works for dense arrays.

    @returns {Number}
  */
  max: function() {
    return Math.max.apply(Math, this);
  },

  /**
    Returns the smallest Number in an array of Numbers. Make sure the array
    only contains values of type Number to get expected result.

    Note: This only works for dense arrays.

    @returns {Number}
  */
  min: function() {
    return Math.min.apply(Math, this);
  },

  rangeObserverClass: SC.RangeObserver,

  /**
    Returns YES if object is in the array

    @param {Object} object to look for
    @returns {Boolean}
  */
  contains: function(obj){
    return this.indexOf(obj) >= 0;
  },

  /**
    Creates a new range observer on the receiver.  The target/method callback
    you provide will be invoked anytime any property on the objects in the
    specified range changes.  It will also be invoked if the objects in the
    range itself changes also.

    The callback for a range observer should have the signature:

    {{{
      function rangePropertyDidChange(array, objects, key, indexes, context)
    }}}

    If the passed key is '[]' it means that the object itself changed.

    The return value from this method is an opaque reference to the
    range observer object.  You can use this reference to destroy the
    range observer when you are done with it or to update its range.

    @param {SC.IndexSet} indexes indexes to observe
    @param {Object} target object to invoke on change
    @param {String|Function} method the method to invoke
    @param {Object} context optional context
    @returns {SC.RangeObserver} range observer
  */
  addRangeObserver: function(indexes, target, method, context) {
    var rangeob = this._array_rangeObservers;
    if (!rangeob) rangeob = this._array_rangeObservers = SC.CoreSet.create() ;

    // The first time a range observer is added, cache the current length so
    // we can properly notify observers the first time through
    if (this._array_oldLength===undefined) {
      this._array_oldLength = this.get('length') ;
    }

    var C = this.rangeObserverClass ;
    var isDeep = NO; //disable this feature for now
    var ret = C.create(this, indexes, target, method, context, isDeep) ;
    rangeob.add(ret);

    // first time a range observer is added, begin observing the [] property
    if (!this._array_isNotifyingRangeObservers) {
      this._array_isNotifyingRangeObservers = YES ;
      this.addObserver('[]', this, this._array_notifyRangeObservers);
    }

    return ret ;
  },

  /**
    Moves a range observer so that it observes a new range of objects on the
    array.  You must have an existing range observer object from a call to
    addRangeObserver().

    The return value should replace the old range observer object that you
    pass in.

    @param {SC.RangeObserver} rangeObserver the range observer
    @param {SC.IndexSet} indexes new indexes to observe
    @returns {SC.RangeObserver} the range observer (or a new one)
  */
  updateRangeObserver: function(rangeObserver, indexes) {
    return rangeObserver.update(this, indexes);
  },
  
  /**
    Removes a range observer from the receiver.  The range observer must
    already be active on the array.

    The return value should replace the old range observer object.  It will
    usually be null.

    @param {SC.RangeObserver} rangeObserver the range observer
    @returns {SC.RangeObserver} updated range observer or null
  */
  removeRangeObserver: function(rangeObserver) {
    var ret = rangeObserver.destroy(this);
    var rangeob = this._array_rangeObservers;
    if (rangeob) rangeob.remove(rangeObserver) ; // clear
    return ret ;
  },

  /**
    Updates observers with content change.  To support range observers,
    you must pass three change parameters to this method.  Otherwise this
    method will assume the entire range has changed.

    This also assumes you have already updated the length property.
    @param {Number} start the starting index of the change
    @param {Number} amt the final range of objects changed
    @param {Number} delta if you added or removed objects, the delta change
    @param {Array} addedObjects the objects that were added
    @param {Array} removedObjects the objects that were removed
    @returns {SC.Array} receiver
  */
  enumerableContentDidChange: function(start, amt, delta, addedObjects, removedObjects) {
    var rangeob = this._array_rangeObservers,
        oldlen  = this._array_oldLength,
        newlen, length, changes ;

    this.beginPropertyChanges();
    this.notifyPropertyChange('length'); // flush caches

    // schedule info for range observers
    if (rangeob && rangeob.length>0) {

      // if no oldLength has been cached, just assume 0
      if (oldlen === undefined) oldlen = 0;
      this._array_oldLength = newlen = this.get('length');

      // normalize input parameters
      // if delta was not passed, assume it is the different between the
      // new and old length.
      if (start === undefined) start = 0;
      if (delta === undefined) delta = newlen - oldlen ;
      if (delta !== 0 || amt === undefined) {
        length = newlen - start ;
        if (delta<0) length -= delta; // cover removed range as well
      } else {
        length = amt ;
      }

      changes = this._array_rangeChanges;
      if (!changes) changes = this._array_rangeChanges = SC.IndexSet.create();
      changes.add(start, length);
    }

    this._setupEnumerableObservers(addedObjects, removedObjects);
    this.notifyPropertyChange('[]') ;
    this.endPropertyChanges();

    return this ;
  },

  /**  @private
    Observer fires whenever the '[]' property changes.  If there are
    range observers, will notify observers of change.
  */
  _array_notifyRangeObservers: function() {
    var rangeob = this._array_rangeObservers,
        changes = this._array_rangeChanges,
        len     = rangeob ? rangeob.length : 0,
        idx, cur;

    if (len > 0 && changes && changes.length > 0) {
      for(idx=0;idx<len;idx++) rangeob[idx].rangeDidChange(changes);
      changes.clear(); // reset for later notifications
    }
  }

} ;

// Add SC.Array to the built-in array before we add SC.Enumerable to SC.Array
// since built-in Array's are already enumerable.
SC.mixin(Array.prototype, SC.Array) ;
SC.Array = SC.mixin({}, SC.Enumerable, SC.Array) ;

// Add any extra methods to SC.Array that are native to the built-in Array.
/**
  Returns a new array that is a slice of the receiver.  This implementation
  uses the observable array methods to retrieve the objects for the new
  slice.

  @param beginIndex {Integer} (Optional) index to begin slicing from.
  @param endIndex {Integer} (Optional) index to end the slice at.
  @returns {Array} New array with specified slice
*/
SC.Array.slice = function(beginIndex, endIndex) {
  var ret = [];
  var length = this.get('length') ;
  if (SC.none(beginIndex)) beginIndex = 0 ;
  if (SC.none(endIndex) || (endIndex > length)) endIndex = length ;
  while(beginIndex < endIndex) ret[ret.length] = this.objectAt(beginIndex++) ;
  return ret ;
}  ;

/**
  Returns the index for a particular object in the index.

  @param {Object} object the item to search for
  @param {NUmber} startAt optional starting location to search, default 0
  @returns {Number} index of -1 if not found
*/
SC.Array.indexOf = function(object, startAt) {
  var idx, len = this.get('length');

  if (startAt === undefined) startAt = 0;
  else startAt = (startAt < 0) ? Math.ceil(startAt) : Math.floor(startAt);
  if (startAt < 0) startAt += len;

  for(idx=startAt;idx<len;idx++) {
    if (this.objectAt(idx, YES) === object) return idx ;
  }
  return -1;
};

// Some browsers do not support indexOf natively.  Patch if needed
if (!Array.prototype.indexOf) Array.prototype.indexOf = SC.Array.indexOf;

/**
  Returns the last index for a particular object in the index.

  @param {Object} object the item to search for
  @param {NUmber} startAt optional starting location to search, default 0
  @returns {Number} index of -1 if not found
*/
SC.Array.lastIndexOf = function(object, startAt) {
  var idx, len = this.get('length');

  if (startAt === undefined) startAt = len-1;
  else startAt = (startAt < 0) ? Math.ceil(startAt) : Math.floor(startAt);
  if (startAt < 0) startAt += len;

  for(idx=startAt;idx>=0;idx--) {
    if (this.objectAt(idx) === object) return idx ;
  }
  return -1;
};

// Some browsers do not support lastIndexOf natively.  Patch if needed
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = SC.Array.lastIndexOf;
}

// ......................................................
// ARRAY SUPPORT
//
// Implement the same enhancements on Array.  We use specialized methods
// because working with arrays are so common.
(function() {
  SC.mixin(Array.prototype, {

    // primitive for array support.
    replace: function(idx, amt, objects) {
      var removedObjects;

      if (this.isFrozen) throw SC.FROZEN_ERROR ;
      if (!objects || objects.length === 0) {
        removedObjects = this.splice(idx, amt) ;
      } else {
        var args = [idx, amt].concat(objects) ;
        removedObjects = this.splice.apply(this,args) ;
      }

      // if we replaced exactly the same number of items, then pass only the
      // replaced range.  Otherwise, pass the full remaining array length
      // since everything has shifted
      var len = objects ? (objects.get ? objects.get('length') : objects.length) : 0;
      this.enumerableContentDidChange(idx, amt, len - amt, objects, removedObjects) ;
      return this ;
    },

    // If you ask for an unknown property, then try to collect the value
    // from member items.
    unknownProperty: function(key, value) {
      var ret = this.reducedProperty(key, value) ;
      if ((value !== undefined) && ret === undefined) {
        ret = this[key] = value;
      }
      return ret ;
    }

  });

  // If browser did not implement indexOf natively, then override with
  // specialized version
  var indexOf = Array.prototype.indexOf;
  if (!indexOf || (indexOf === SC.Array.indexOf)) {
    Array.prototype.indexOf = function(object, startAt) {
      var idx, len = this.length;

      if (startAt === undefined) startAt = 0;
      else startAt = (startAt < 0) ? Math.ceil(startAt) : Math.floor(startAt);
      if (startAt < 0) startAt += len;

      for(idx=startAt;idx<len;idx++) {
        if (this[idx] === object) return idx ;
      }
      return -1;
    } ;
  }

  var lastIndexOf = Array.prototype.lastIndexOf ;
  if (!lastIndexOf || (lastIndexOf === SC.Array.lastIndexOf)) {
    Array.prototype.lastIndexOf = function(object, startAt) {
      var idx, len = this.length;

      if (startAt === undefined) startAt = len-1;
      else startAt = (startAt < 0) ? Math.ceil(startAt) : Math.floor(startAt);
      if (startAt < 0) startAt += len;

      for(idx=startAt;idx>=0;idx--) {
        if (this[idx] === object) return idx ;
      }
      return -1;
    };
  }

})();

/* >>>>>>>>>> BEGIN source/mixins/comparable.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @namespace

  Implements some standard methods for comparing objects. Add this mixin to
  any class you create that can compare its instances.

  You should implement the compare() method.

  @since SproutCore 1.0
*/
SC.Comparable = {

  /**
    walk like a duck. Indicates that the object can be compared.

    @type Boolean
  */
  isComparable: YES,

  /**
    Override to return the result of the comparison of the two parameters. The
    compare method should return
      -1 if a < b
       0 if a == b
       1 if a > b

    Default implementation raises
    an exception.

    @param a {Object} the first object to compare
    @param b {Object} the second object to compare
    @returns {Integer} the result of the comparison
  */
  compare: function(a, b) {
    throw "%@.compare() is not implemented".fmt(this.toString());
  }

};

/* >>>>>>>>>> BEGIN source/mixins/copyable.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @namespace

  Impelements some standard methods for copying an object.  Add this mixin to
  any object you create that can create a copy of itself.  This mixin is
  added automatically to the built-in array.

  You should generally implement the copy() method to return a copy of the
  receiver.

  Note that frozenCopy() will only work if you also implement SC.Freezable.

  @since SproutCore 1.0
*/
SC.Copyable = {

  /**
    Walk like a duck.  Indicates that the object can be copied.

    @type Boolean
  */
  isCopyable: YES,

  /**
    Override to return a copy of the receiver.  Default implementation raises
    an exception.

    @param deep {Boolean} if true, a deep copy of the object should be made
    @returns {Object} copy of receiver
  */
  copy: function(deep) {
    throw "%@.copy() is not implemented";
  },

  /**
    If the object implements SC.Freezable, then this will return a new copy
    if the object is not frozen and the receiver if the object is frozen.

    Raises an exception if you try to call this method on a object that does
    not support freezing.

    You should use this method whenever you want a copy of a freezable object
    since a freezable object can simply return itself without actually
    consuming more memory.

    @returns {Object} copy of receiver or receiver
  */
  frozenCopy: function() {
    var isFrozen = this.get ? this.get('isFrozen') : this.isFrozen;
    if (isFrozen === YES) return this;
    else if (isFrozen === undefined) throw "%@ does not support freezing".fmt(this);
    else return this.copy().freeze();
  }
};

// Make Array copyable
SC.mixin(Array.prototype, SC.Copyable);
Array.prototype.copy = function(deep) {
	var ret = this.slice(), idx;
	if (deep) {
      idx = ret.length;
	  while (idx--) ret[idx] = SC.copy(ret[idx], true);
	}
	return ret;
}

/* >>>>>>>>>> BEGIN source/mixins/freezable.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


/**
  Standard Error that should be raised when you try to modify a frozen object.

  @property {Error}
*/
SC.FROZEN_ERROR = new Error("Cannot modify a frozen object");

/**
  @namespace

  The SC.Freezable mixin implements some basic methods for marking an object
  as frozen.  Once an object is frozen it should be read only.  No changes
  may be made the internal state of the object.

  h2. Enforcement

  To fully support freezing in your subclass, you must include this mixin and
  override any method that might alter any property on the object to instead
  raise an exception.  You can check the state of an object by checking the
  isFrozen property.

  Although future versions of JavaScript may support language-level freezing
  object objects, that is not the case today.  Even if an object is freezable,
  it is still technically possible to modify the object, even though it could
  break other parts of your application that do not expect a frozen object to
  change.  It is, therefore, very important that you always respect the
  isFrozen property on all freezable objects.

  h2. Example

  The example below shows a simple object that implement the SC.Freezable
  protocol.

  {{{
    Contact = SC.Object.extend(SC.Freezable, {

      firstName: null,

      lastName: null,

      // swaps the names
      swapNames: function() {
        if (this.get('isFrozen')) throw SC.FROZEN_ERROR;
        var tmp = this.get('firstName');
        this.set('firstName', this.get('lastName'));
        this.set('lastName', tmp);
        return this;
      }

    });

    c = Context.create({ firstName: "John", lastName: "Doe" });
    c.swapNames();  => returns c
    c.freeze();
    c.swapNames();  => EXCEPTION

  }}}

  h2. Copying

  Usually the SC.Freezable protocol is implemented in cooperation with the
  SC.Copyable protocol, which defines a frozenCopy() method that will return
  a frozen object, if the object implements this method as well.

*/
SC.Freezable = {

  /**
    Walk like a duck.

    @property {Boolean}
  */
  isFreezable: YES,

  /**
    Set to YES when the object is frozen.  Use this property to detect whether
    your object is frozen or not.

    @property {Boolean}
  */
  isFrozen: NO,

  /**
    Freezes the object.  Once this method has been called the object should
    no longer allow any properties to be edited.

    @returns {Object} reciever
  */
  freeze: function() {
    // NOTE: Once someone actually implements Object.freeze() in the browser,
    // add a call to that here also.

    if (this.set) this.set('isFrozen', YES);
    else this.isFrozen = YES;
    return this;
  }

};


// Add to Array
SC.mixin(Array.prototype, SC.Freezable);

/* >>>>>>>>>> BEGIN source/system/set.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('mixins/enumerable') ;
sc_require('mixins/observable') ;
sc_require('mixins/freezable');
sc_require('mixins/copyable');

// IMPORTANT NOTE:  This file actually defines two classes:
// SC.Set is a fully observable set class documented below.
// SC._CoreSet is just like SC.Set but is not observable.  This is required
// because SC.Observable is built on using sets and requires sets without
// observability.
//
// We use pointer swizzling below to swap around the actual definitions so
// that the documentation will turn out right.  (The docs should only
// define SC.Set - not SC._CoreSet)

/**
  @class

  An unordered collection of objects.

  A Set works a bit like an array except that its items are not ordered.
  You can create a set to efficiently test for membership for an object. You
  can also iterate through a set just like an array, even accessing objects
  by index, however there is no gaurantee as to their order.

  Whether or not property observing is enabled, sets offer very powerful
  notifications of items being added and removed, through the
  `#js:addSetObserver` and `#js:removeSetObserver` methods; this can be
  very useful, for instance, for filtering or mapping sets.

  Note that SC.Set is a primitive object, like an array.  It does implement
  limited key-value observing support, but it does not extend from SC.Object
  so you should not subclass it.

  Creating a Set
  --------------
  You can create a set like you would most objects using SC.Set.create().
  Most new sets you create will be empty, but you can also initialize the set
  with some content by passing an array or other enumerable of objects to the
  constructor.

  Finally, you can pass in an existing set and the set will be copied.  You
  can also create a copy of a set by calling SC.Set#clone().

      #js
      // creates a new empty set
      var foundNames = SC.Set.create();

      // creates a set with four names in it.
      var names = SC.Set.create(["Charles", "Tom", "Juan", "Alex"]) ; // :P

      // creates a copy of the names set.
      var namesCopy = SC.Set.create(names);

      // same as above.
      var anotherNamesCopy = names.clone();

  Adding/Removing Objects
  -----------------------
  You generally add or remove objects from a set using add() or remove().
  You can add any type of object including primitives such as numbers,
  strings, and booleans.

  Note that objects can only exist one time in a set.  If you call add() on
  a set with the same object multiple times, the object will only be added
  once.  Likewise, calling remove() with the same object multiple times will
  remove the object the first time and have no effect on future calls until
  you add the object to the set again.

  Note that you cannot add/remove null or undefined to a set.  Any attempt to
  do so will be ignored.

  In addition to add/remove you can also call push()/pop().  Push behaves just
  like add() but pop(), unlike remove() will pick an arbitrary object, remove
  it and return it.  This is a good way to use a set as a job queue when you
  don't care which order the jobs are executed in.

  Testing for an Object
  ---------------------
  To test for an object's presence in a set you simply call SC.Set#contains().
  This method tests for the object's hash, which is generally the same as the
  object's guid; however, if you implement the hash() method on the object, it will
  use the return value from that method instead.

  Observing changes
  -----------------
  When using `#js:SC.Set` (rather than `#js:SC.CoreSet`), you can observe the
  `#js:"[]"` property to be alerted whenever the content changes.

  This is often unhelpful. If you are filtering sets of objects, for instance,
  it is very inefficient to re-filter all of the items each time the set changes.
  It would be better if you could just adjust the filtered set based on what
  was changed on the original set. The same issue applies to merging sets,
  as well.

  `#js:SC.Set` and `#js:SC.CoreSet` both offer another method of being observed:
  `#js:addSetObserver` and `#js:removeSetObserver`. These take a single parameter:
  an object which implements `#js:didAddItem(set, item)` and
  `#js:didRemoveItem(set, item)`.

  Whenever an item is added or removed from the set, all objects in the set
  (a SC.CoreSet, actually) of observing objects will be alerted appropriately.

  BIG WARNING
  ===========
  SetObservers are not intended to be used "_creatively_"; for instance, do
  not expect to be alerted immediately to any changes. **While the notifications
  are currently sent out immediately, if we find a fast way to send them at end
  of run loop, we most likely will do so.**

  @extends SC.Enumerable
  @extends SC.Observable
  @extends SC.Copyable
  @extends SC.Freezable

  @since SproutCore 1.0
*/
SC.Set = SC.mixin({},
  SC.Enumerable,
  SC.Observable,
  SC.Freezable,
/** @scope SC.Set.prototype */ {

  /**
    Creates a new set, with the optional array of items included in the
    return set.

    @param {SC.Enumerable} items items to add
    @return {SC.Set}
  */
  create: function(items) {
    var ret, idx, pool = SC.Set._pool, isObservable = this.isObservable, len;
    if (!isObservable && items===undefined && pool.length>0) {
      return pool.pop();
    } else {
      ret = SC.beget(this);
      if (isObservable) ret.initObservable();

      if (items && items.isEnumerable && items.get('length') > 0) {

        ret.isObservable = NO; // suspend change notifications

        // arrays and sets get special treatment to make them a bit faster
        if (items.isSCArray) {
          len = items.get('length');
          for(idx = 0; idx < len; idx++) ret.add(items.objectAt(idx));

        } else if (items.isSet) {
          len = items.length;
          for(idx = 0; idx < len; idx++) ret.add(items[idx]);

        // otherwise use standard SC.Enumerable API
        } else {
          items.forEach(function(i) { ret.add(i); }, this);
        }

        ret.isObservable = isObservable;
      }
    }
    return ret ;
  },

  /**
    Walk like a duck

    @property {Boolean}
  */
  isSet: YES,

  /**
    This property will change as the number of objects in the set changes.

    @property {Number}
  */
  length: 0,

  /**
    Returns the first object in the set or null if the set is empty

    @property {Object}
  */
  firstObject: function() {
    return (this.length > 0) ? this[0] : undefined ;
  }.property(),

  /**
    Clears the set

    @returns {SC.Set}
  */
  clear: function() {
    if (this.isFrozen) throw SC.FROZEN_ERROR;
    this.length = 0;
    return this ;
  },

  /**
    Call this method to test for membership.

    @returns {Boolean}
  */
  contains: function(obj) {

    // because of the way a set is "reset", the guid for an object may
    // still be stored as a key, but points to an index that is beyond the
    // length.  Therefore the found idx must both be defined and less than
    // the current length.
    if (obj === null) return NO ;
    var idx = this[SC.hashFor(obj)] ;
    return (!SC.none(idx) && (idx < this.length) && (this[idx]===obj)) ;
  },

  /**
    Returns YES if the passed object is also a set that contains the same
    objects as the receiver.

    @param {SC.Set} obj the other object
    @returns {Boolean}
  */
  isEqual: function(obj) {
    // fail fast
    if (!obj || !obj.isSet || (obj.get('length') !== this.get('length'))) {
      return NO ;
    }

    var loc = this.get('length');
    while(--loc>=0) {
      if (!obj.contains(this[loc])) return NO ;
    }

    return YES;
  },

  /**
    Adds a set observers. Set observers must implement two methods:

    - didAddItem(set, item)
    - didRemoveItem(set, item)

    Set observers are, in fact, stored in another set (a CoreSet).
  */
  addSetObserver: function(setObserver) {
    // create set observer set if needed
    if (!this.setObservers) {
      this.setObservers = SC.CoreSet.create();
    }

    // add
    this.setObservers.add(setObserver);
  },

  /**
    Removes a set observer.
  */
  removeSetObserver: function(setObserver) {
    // if there is no set, there can be no currently observing set observers
    if (!this.setObservers) return;

    // remove the set observer. Pretty simple, if you think about it. I mean,
    // honestly.
    this.setObservers.remove(setObserver);
  },

  /**
    Call this method to add an object. performs a basic add.

    If the object is already in the set it will not be added again.

    @param obj {Object} the object to add
    @returns {SC.Set} receiver
  */
  add: function(obj) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;

    // cannot add null to a set.
    if (SC.none(obj)) return this;

    // Implementation note:  SC.hashFor() is inlined because sets are
    // fundamental in SproutCore, and the inlined code is ~ 25% faster than
    // calling SC.hashFor() in IE8.
    var hashFunc,
        guid = ((hashFunc = obj.hash) && (typeof hashFunc === "function")) ? hashFunc.call(obj) : SC.guidFor(obj),
        idx  = this[guid],
        len  = this.length;
    if ((idx >= len) || (this[idx] !== obj)) {
      this[len] = obj;
      this[guid] = len;
      this.length = len + 1;
      if (this.setObservers) this.didAddItem(obj);
    }

    if (this.isObservable) this.enumerableContentDidChange();

    return this ;
  },

  /**
    Add all the items in the passed array or enumerable

    @returns {SC.Set} receiver
  */
  addEach: function(objects) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;
    if (!objects || !objects.isEnumerable) {
      throw "%@.addEach must pass enumerable".fmt(this);
    }

    var idx, isObservable = this.isObservable ;

    if (isObservable) this.beginPropertyChanges();
    if (objects.isSCArray) {
      idx = objects.get('length');
      while(--idx >= 0) this.add(objects.objectAt(idx)) ;
    } else if (objects.isSet) {
      idx = objects.length;
      while(--idx>=0) this.add(objects[idx]);

    } else objects.forEach(function(i) { this.add(i); }, this);
    if (isObservable) this.endPropertyChanges();

    return this ;
  },

  /**
    Removes the object from the set if it is found.

    If the object is not in the set, nothing will be changed.

    @param obj {Object} the object to remove
    @returns {SC.Set} receiver
  */
  remove: function(obj) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;

    // Implementation note:  SC.none() and SC.hashFor() are inlined because
    // sets are fundamental in SproutCore, and the inlined code is ~ 25%
    // faster than calling them "normally" in IE8.
    if (obj === null || obj === undefined) return this ;

    var hashFunc,
        guid = (obj && (hashFunc = obj.hash) && (typeof hashFunc === SC.T_FUNCTION)) ? hashFunc.call(obj) : SC.guidFor(obj),
        idx  = this[guid],
        len  = this.length,
        tmp;

    // not in set.
    // (SC.none is inlined for the reasons given above)
    if ((idx === null || idx === undefined) || (idx >= len) || (this[idx] !== obj)) return this;

    // clear the guid key
    delete this[guid];

    // to clear the index, we will swap the object stored in the last index.
    // if this is the last object, just reduce the length.
    if (idx < (len-1)) {
      // we need to keep a reference to "obj" so we can alert others below;
      // so, no changing it. Instead, create a temporary variable.
      tmp = this[idx] = this[len-1];
      guid = (tmp && (hashFunc = tmp.hash) && (typeof hashFunc === SC.T_FUNCTION)) ? hashFunc.call(tmp) : SC.guidFor(tmp);
      this[guid] = idx;
    }

    // reduce the length
    this.length = len-1;
    if (this.isObservable) this.enumerableContentDidChange();
    if (this.setObservers) this.didRemoveItem(obj);
    return this ;
  },

  /**
    Removes an arbitrary object from the set and returns it.

    @returns {Object} an object from the set or null
  */
  pop: function() {
    if (this.isFrozen) throw SC.FROZEN_ERROR;
    var obj = (this.length > 0) ? this[this.length-1] : null ;
    this.remove(obj) ;
    return obj ;
  },

  /**
    Removes all the items in the passed array.

    @returns {SC.Set} receiver
  */
  removeEach: function(objects) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;
    if (!objects || !objects.isEnumerable) {
      throw "%@.addEach must pass enumerable".fmt(this);
    }

    var idx, isObservable = this.isObservable ;

    if (isObservable) this.beginPropertyChanges();
    if (objects.isSCArray) {
      idx = objects.get('length');
      while(--idx >= 0) this.remove(objects.objectAt(idx)) ;
    } else if (objects.isSet) {
      idx = objects.length;
      while(--idx>=0) this.remove(objects[idx]);
    } else objects.forEach(function(i) { this.remove(i); }, this);
    if (isObservable) this.endPropertyChanges();

    return this ;
  },

  /**
   Clones the set into a new set.

    @returns {SC.Set} new copy
  */
  copy: function() {
    return this.constructor.create(this);
  },

  /**
    Return a set to the pool for reallocation.

    @returns {SC.Set} receiver
  */
  destroy: function() {
    this.isFrozen = NO ; // unfreeze to return to pool
    if (!this.isObservable) SC.Set._pool.push(this.clear());
    return this;
  },

  // .......................................
  // PRIVATE
  //

  /** @private - optimized */
  forEach: function(iterator, target) {
    var len = this.length;
    if (!target) target = this ;
    for(var idx=0;idx<len;idx++) iterator.call(target, this[idx], idx, this);
    return this ;
  },

  /** @private */
  toString: function() {
    var len = this.length, idx, ary = [];
    for(idx=0;idx<len;idx++) ary[idx] = this[idx];
    return "SC.Set<%@>".fmt(ary.join(',')) ;
  },

  /**
    @private
    Alerts set observers that an item has been added.
  */
  didAddItem: function(item) {
    // get the set observers
    var o = this.setObservers;

    // return if there aren't any
    if (!o) return;

    // loop through and call didAddItem.
    var len = o.length, idx;
    for (idx = 0; idx < len; idx++) o[idx].didAddItem(this, item);
  },

  /**
    @private
    Alerts set observers that an item has been removed.
  */
  didRemoveItem: function(item) {
    // get the set observers
    var o = this.setObservers;

    // return if there aren't any
    if (!o) return;

    // loop through and call didAddItem.
    var len = o.length, idx;
    for (idx = 0; idx < len; idx++) o[idx].didRemoveItem(this, item);
  },

  // the pool used for non-observable sets
  _pool: [],

  /** @private */
  isObservable: YES

}) ;

SC.Set.constructor = SC.Set;

// Make SC.Set look a bit more like other enumerables

/** @private */
SC.Set.clone = SC.Set.copy ;

/** @private */
SC.Set.push = SC.Set.unshift = SC.Set.add ;

/** @private */
SC.Set.shift = SC.Set.pop ;

// add generic add/remove enumerable support

/** @private */
SC.Set.addObject = SC.Set.add ;

/** @private */
SC.Set.removeObject = SC.Set.remove;

SC.Set._pool = [];

// ..........................................................
// CORE SET
//

/** @class

  CoreSet is just like set but not observable.  If you want to use the set
  as a simple data structure with no observing, CoreSet is slightly faster
  and more memory efficient.

  @extends SC.Set
  @since SproutCore 1.0
*/
SC.CoreSet = SC.beget(SC.Set);

/** @private */
SC.CoreSet.isObservable = NO ;

/** @private */
SC.CoreSet.constructor = SC.CoreSet;

/* >>>>>>>>>> BEGIN source/private/observer_queue.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('mixins/observable');
sc_require('system/set');

// ........................................................................
// OBSERVER QUEUE
//
// This queue is used to hold observers when the object you tried to observe
// does not exist yet.  This queue is flushed just before any property
// notification is sent.

/**
  @namespace

  The private ObserverQueue is used to maintain a set of pending observers.
  This allows you to setup an observer on an object before the object exists.

  Whenever the observer fires, the queue will be flushed to connect any
  pending observers.

  @since SproutCore 1.0
*/
SC.Observers = {

  queue: [],

  /**
   @private

   Attempt to add the named observer.  If the observer cannot be found, put
   it into a queue for later.
  */
  addObserver: function(propertyPath, target, method, pathRoot) {
    var tuple ;

    // try to get the tuple for this.
    if (typeof propertyPath === "string") {
      tuple = SC.tupleForPropertyPath(propertyPath, pathRoot) ;
    } else {
      tuple = propertyPath;
    }

    // if a tuple was found and is observable, add the observer immediately...
    if (tuple && tuple[0].addObserver) {
      tuple[0].addObserver(tuple[1],target, method) ;

    // otherwise, save this in the queue.
    } else {
      this.queue.push([propertyPath, target, method, pathRoot]) ;
    }
  },

  /**
    @private

    Remove the observer.  If it is already in the queue, remove it.  Also
    if already found on the object, remove that.
  */
  removeObserver: function(propertyPath, target, method, pathRoot) {
    var idx, queue, tuple, item;

    tuple = SC.tupleForPropertyPath(propertyPath, pathRoot) ;
    if (tuple) {
      tuple[0].removeObserver(tuple[1], target, method) ;
    }

    idx = this.queue.length; queue = this.queue ;
    while(--idx >= 0) {
      item = queue[idx] ;
      if ((item[0] === propertyPath) && (item[1] === target) && (item[2] == method) && (item[3] === pathRoot)) queue[idx] = null ;
    }
  },

  /**
    @private

    Range Observers register here to indicate that they may potentially
    need to start observing.
  */
  addPendingRangeObserver: function(observer) {
    var ro = this.rangeObservers;
    if (!ro) ro = this.rangeObservers = SC.CoreSet.create();
    ro.add(observer);
    return this ;
  },

  _TMP_OUT: [],

  /**
    Flush the queue.  Attempt to add any saved observers.
  */
  flush: function(object) {

    // flush any observers that we tried to setup but didn't have a path yet
    var oldQueue = this.queue, i,
        queueLen = oldQueue.length;
    
    if (oldQueue && queueLen > 0) {
      var newQueue = (this.queue = []) ;

      for (i=0; i<queueLen; i++ ) {
        var item = oldQueue[i];
        if ( !item ) continue;
        
        var tuple = SC.tupleForPropertyPath( item[0], item[3] );
        // check if object is observable (yet) before adding an observer
        if( tuple && tuple[0].addObserver ) {
          tuple[0].addObserver( tuple[1], item[1], item[2] );
        } else {
          newQueue.push( item );
        }
      }
    }
    
    // if this object needsRangeObserver then see if any pending range
    // observers need it.
    if ( object._kvo_needsRangeObserver ) {
      var set = this.rangeObservers,
          len = set ? set.get('length') : 0,
          out = this._TMP_OUT,
          ro;

      for ( i=0; i<len; i++ ) {
        ro = set[i]; // get the range observer
        if ( ro.setupPending(object) ) {
          out.push(ro); // save to remove later
        }
      }

      // remove any that have setup
      if ( out.length > 0 ) set.removeEach(out);
      out.length = 0; // reset
      object._kvo_needsRangeObserver = false ;
    }

  },

  /** @private */
  isObservingSuspended: 0,

  _pending: SC.CoreSet.create(),

  /** @private */
  objectHasPendingChanges: function(obj) {
    this._pending.add(obj) ; // save for later
  },

  /** @private */
  // temporarily suspends all property change notifications.
  suspendPropertyObserving: function() {
    this.isObservingSuspended++ ;
  },

  // resume change notifications.  This will call notifications to be
  // delivered for all pending objects.
  /** @private */
  resumePropertyObserving: function() {
    var pending ;
    if(--this.isObservingSuspended <= 0) {
      pending = this._pending ;
      this._pending = SC.CoreSet.create() ;

      var idx, len = pending.length;
      for(idx=0;idx<len;idx++) {
        pending[idx]._notifyPropertyObservers() ;
      }
      pending.clear();
      pending = null ;
    }
  }

} ;

/* >>>>>>>>>> BEGIN source/system/object.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('core') ;
sc_require('mixins/observable') ;
sc_require('private/observer_queue');
sc_require('mixins/array') ;
sc_require('system/set');

/*globals $$sel */

SC.BENCHMARK_OBJECTS = NO;

// ..........................................................
// PRIVATE HELPER METHODS
//
// Private helper methods.  These are not kept as part of the class
// definition because SC.Object is copied frequently and we want to keep the
// number of class methods to a minimum.

SC._detect_base = function _detect_base(func, parent, name) {
  return function invoke_superclass_method() {
    var base = parent[name], args;

    if (!base) {
      throw new Error("No '" + name + "' method was found on the superclass");
    }

    // NOTE: It is possible to cache the base, so that the first
    // call to sc_super will avoid doing the lookup again. However,
    // since the cost of the extra method dispatch is low and is
    // only incurred on sc_super, but also creates another possible
    // weird edge-case (when a class is enhanced after first used),
    // we'll leave it off for now unless profiling demonstrates that
    // it's a hotspot.
    //if(base && func === base) { func.base = function() {}; }
    //else { func.base = base; }

    if(func.isEnhancement) {
      args = Array.prototype.slice.call(arguments, 1);
    } else {
      args = arguments;
    }

    return base.apply(this, args);
  };
};

/** @private
  Augments a base object by copying the properties from the extended hash.
  In addition to simply copying properties, this method also performs a
  number of optimizations that can make init'ing a new object much faster
  including:

  - concatenating concatenatedProperties
  - prepping a list of bindings, observers, and dependent keys
  - caching local observers so they don't need to be manually constructed.

  @param {Hash} base hash
  @param {Hash} extension
  @returns {Hash} base hash
*/
SC._object_extend = function _object_extend(base, ext, proto) {
  if (!ext) { throw "SC.Object.extend expects a non-null value.  Did you forget to 'sc_require' something?  Or were you passing a Protocol to extend() as if it were a mixin?"; }

  // set _kvo_cloned for later use
  base._kvo_cloned = null;

  // get some common vars
  var key, idx, len, cur, cprops = base.concatenatedProperties, K = SC.K ;
  var p1,p2;

  // first, save any concat props.  use old or new array or concat
  idx = (cprops) ? cprops.length : 0 ;
  var concats = (idx>0) ? {} : null;
  while(--idx>=0) {
    key = cprops[idx]; p1 = base[key]; p2 = ext[key];

    if (p1) {
      if (!(p1 instanceof Array)) p1 = SC.$A(p1);
      concats[key] = (p2) ? p1.concat(p2) : p2 ;
    } else {
      if (!(p2 instanceof Array)) p2 = SC.$A(p2);
      concats[key] = p2 ;
    }
  }

  // setup arrays for bindings, observers, and properties.  Normally, just
  // save the arrays from the base.  If these need to be changed during
  // processing, then they will be cloned first.
  var bindings = base._bindings, clonedBindings = NO;
  var observers = base._observers, clonedObservers = NO;
  var properties = base._properties, clonedProperties = NO;
  var paths, pathLoc, local ;

  // outlets are treated a little differently because you can manually
  // name outlets in the passed in hash. If this is the case, then clone
  // the array first.
  var outlets = base.outlets, clonedOutlets = NO ;
  if (ext.outlets) {
    outlets = (outlets || SC.EMPTY_ARRAY).concat(ext.outlets);
    clonedOutlets = YES ;
  }

  // now copy properties, add superclass to func.
  for(key in ext) {

    if (key === '_kvo_cloned') continue; // do not copy

    // avoid copying builtin methods
    if (!ext.hasOwnProperty(key)) continue ;

    // get the value.  use concats if defined
    var value = (concats.hasOwnProperty(key) ? concats[key] : null) || ext[key];

    // Possibly add to a bindings.
    if (key.length > 7 && key.slice(-7) === "Binding") {
      if (!clonedBindings) {
        bindings = (bindings || SC.EMPTY_ARRAY).slice() ;
        clonedBindings = YES ;
      }

      if (bindings === null) bindings = (base._bindings || SC.EMPTY_ARRAY).slice();
      bindings[bindings.length] = key ;

    // Also add observers, outlets, and properties for functions...
    } else if (value && (value instanceof Function)) {

      // add super to funcs.  Be sure not to set the base of a func to
      // itself to avoid infinite loops.
      if (!value.superclass && (value !== (cur=base[key]))) {
        value.superclass = cur || K;
        value.base = proto ? SC._detect_base(value, proto, key) : cur || K;
      }

      // handle regular observers
      if (value.propertyPaths) {
        if (!clonedObservers) {
          observers = (observers || SC.EMPTY_ARRAY).slice() ;
          clonedObservers = YES ;
        }
        observers[observers.length] = key ;

      // handle local properties
      }

      if (paths = value.localPropertyPaths) {
        pathLoc = paths.length;
        while(--pathLoc >= 0) {
          local = base._kvo_for(SC.keyFor('_kvo_local', paths[pathLoc]), SC.CoreSet);
          local.add(key);
          base._kvo_for('_kvo_observed_keys', SC.CoreSet).add(paths[pathLoc]);
        }

      // handle computed properties
      }

      if (value.dependentKeys) {
        if (!clonedProperties) {
          properties = (properties || SC.EMPTY_ARRAY).slice() ;
          clonedProperties = YES ;
        }
        properties[properties.length] = key ;

      // handle outlets
      }

      if (value.autoconfiguredOutlet) {
        if (!clonedOutlets) {
          outlets = (outlets || SC.EMPTY_ARRAY).slice();
          clonedOutlets = YES ;
        }
        outlets[outlets.length] = key ;
      }

      if (value.isEnhancement) {
        value = SC._enhance(base[key], value);
      }
    }

    // copy property
    base[key] = value ;
  }

  // Manually set base on toString() because some JS engines (such as IE8) do
  // not enumerate it
  if (ext.hasOwnProperty('toString')) {
    key = 'toString';
    // get the value.  use concats if defined
    value = (concats.hasOwnProperty(key) ? concats[key] : null) || ext[key] ;
    if (!value.superclass && (value !== (cur=base[key]))) {
      value.superclass = value.base = cur || K ;
    }
    // copy property
    base[key] = value ;
  }


  // copy bindings, observers, and properties
  base._bindings = bindings || [];
  base._observers = observers || [] ;
  base._properties = properties || [] ;
  base.outlets = outlets || [];

  return base ;
} ;

SC._enhance = function(originalFunction, enhancement) {
  return function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var self = this;

    args.unshift(function() { return originalFunction.apply(self, arguments); });
    return enhancement.apply(this, args);
  };
}

/** @class

  Root object for the SproutCore framework.  SC.Object is the root class for
  most classes defined by SproutCore.  It builds on top of the native object
  support provided by JavaScript to provide support for class-like
  inheritance, automatic bindings, properties observers, and more.

  Most of the classes you define in your application should inherit from
  SC.Object or one of its subclasses.  If you are writing objects of your
  own, you should read this documentation to learn some of the details of
  how SC.Object's behave and how they differ from other frameworks.

  h2. About SproutCore Classes

  JavaScript is not a class-based language.  Instead it uses a type of
  inheritence inspired by self called "prototypical" inheritance.
  ...

  h2. Using SproutCore objects with other JavaScript object.

  You can create a SproutCore object just like any other object...
  obj = new SC.Object() ;

  @extends SC.Observable
  @since SproutCore 1.0
*/
SC.Object = function(props) {
  this.__sc_super__ = SC.Object.prototype;
  return this._object_init(props);
};

SC.mixin(SC.Object, /** @scope SC.Object */ {

  /**
    Adds the passed properties to the object's class definition.  You can
    pass as many hashes as you want, including Mixins, and they will be
    added in the order they are passed.

    This is a shorthand for calling SC.mixin(MyClass, props...);

    @params {Hash} props the properties you want to add.
    @returns {Object} receiver
  */
  mixin: function(props) {
    var len = arguments.length, loc ;
    for(loc =0;loc<len;loc++) SC.mixin(this, arguments[loc]);
    return this ;
  },

  // ..........................................
  // CREATING CLASSES AND INSTANCES
  //

  /**
    Points to the superclass for this class.  You can use this to trace a
    class hierarchy.

    @property {SC.Object}
  */
  superclass: null,

  /**
    Creates a new subclass of the receiver, adding any passed properties to
    the instance definition of the new class.  You should use this method
    when you plan to create several objects based on a class with similar
    properties.

    h2. Init

    If you define an init() method, it will be called when you create
    instances of your new class.  Since SproutCore uses the init() method to
    do important setup, you must be sure to always call arguments.callee.base.apply(this,arguments) somewhere
    in your init() to allow the normal setup to proceed.

    @params {Hash} props the methods of properties you want to add
    @returns {Class} A new object class
  */
  extend: function(props) {
    var bench = SC.BENCHMARK_OBJECTS ;
    if (bench) SC.Benchmark.start('SC.Object.extend') ;

    // build a new constructor and copy class methods.  Do this before
    // adding any other properties so they are not overwritten by the copy.
    var prop, ret = function(props) {
      this.__sc_super__ = ret.prototype;
      return this._object_init(props);
    } ;
    for(prop in this) {
      if (!this.hasOwnProperty(prop)) continue ;
      ret[prop] = this[prop];
    }

    // manually copy toString() because some JS engines do not enumerate it
    if (this.hasOwnProperty('toString')) ret.toString = this.toString;

    // now setup superclass, guid
    ret.superclass = this ;
    ret.__sc_super__ = this.prototype;
    SC.generateGuid(ret, "sc"); // setup guid

    ret.subclasses = SC.Set.create();
    this.subclasses.add(ret); // now we can walk a class hierarchy

    // setup new prototype and add properties to it
    var base = (ret.prototype = SC.beget(this.prototype));
    var idx, len = arguments.length;
    for(idx=0;idx<len;idx++) { SC._object_extend(base, arguments[idx], ret.__sc_super__) ; }
    base.constructor = ret; // save constructor

    if (bench) SC.Benchmark.end('SC.Object.extend') ;
    return ret ;
  },

  reopen: function(props) {
    return SC._object_extend(this.prototype, props, this.__sc_super__);
  },

  /**
    Creates a new instance of the class.

    Unlike most frameworks, you do not pass parameters to the init function
    for an object.  Instead, you pass a hash of additional properties you
    want to have assigned to the object when it is first created.  This is
    functionally like creating an anonymous subclass of the receiver and then
    instantiating it, but more efficient.

    You can use create() like you would a normal constructor in a
    class-based system, or you can use it to create highly customized
    singleton objects such as controllers or app-level objects.  This is
    often more efficient than creating subclasses and then instantiating
    them.

    You can pass any hash of properties to this method, including mixins.

    @param {Hash} props
      optional hash of method or properties to add to the instance.

    @returns {SC.Object} new instance of the receiver class.
  */
  create: function() {
    var C=this, ret = new C(arguments);
    if (SC.ObjectDesigner) {
      SC.ObjectDesigner.didCreateObject(ret, SC.$A(arguments));
    }
    return ret ;
  },
  /**
    Walk like a duck.  You can use this to quickly test classes.

    @property {Boolean}
  */
  isClass: YES,

  /**
    Set of subclasses that extend from this class.  You can observe this
    array if you want to be notified when the object is extended.

    @property {SC.Set}
  */
  subclasses: SC.Set.create(),

  /** @private */
  toString: function() { return SC._object_className(this); },

  // ..........................................
  // PROPERTY SUPPORT METHODS
  //

  /**
    Returns YES if the receiver is a subclass of the named class.  If the
    receiver is the class passed, this will return NO since the class is not
    a subclass of itself.  See also kindOf().

    h2. Example

    {{{
      ClassA = SC.Object.extend();
      ClassB = ClassA.extend();

      ClassB.subclassOf(ClassA) => YES
      ClassA.subclassOf(ClassA) => NO
    }}}

    @param {Class} scClass class to compare
    @returns {Boolean}
  */
  subclassOf: function(scClass) {
    if (this === scClass) return NO ;
    var t = this ;
    while(t = t.superclass) if (t === scClass) return YES ;
    return NO ;
  },

  /**
    Returns YES if the passed object is a subclass of the receiver.  This is
    the inverse of subclassOf() which you call on the class you want to test.

    @param {Class} scClass class to compare
    @returns {Boolean}
  */
  hasSubclass: function(scClass) {
    return (scClass && scClass.subclassOf) ? scClass.subclassOf(this) : NO;
  },

  /**
    Returns YES if the receiver is the passed class or is a subclass of the
    passed class.  Unlike subclassOf(), this method will return YES if you
    pass the receiver itself, since class is a kind of itself.  See also
    subclassOf().

    h2. Example

    {{{
      ClassA = SC.Object.extend();
      ClassB = ClassA.extend();

      ClassB.kindOf(ClassA) => YES
      ClassA.kindOf(ClassA) => YES
    }}}

    @param {Class} scClass class to compare
    @returns {Boolean}
  */
  kindOf: function(scClass) {
    return (this === scClass) || this.subclassOf(scClass) ;
  },

  // ..........................................................
  // Designers
  //
  /**
    This method works just like extend() except that it will also preserve
    the passed attributes.

    @param {Hash} attrs Attributes to add to view
    @returns {Class} SC.Object subclass to create
    @function
  */
  design: function() {
    if (this.isDesign) return this; // only run design one time
    var ret = this.extend.apply(this, arguments);
    ret.isDesign = YES ;
    if (SC.ObjectDesigner) {
      SC.ObjectDesigner.didLoadDesign(ret, this, SC.A(arguments));
    }
    return ret ;
  }
}) ;

// ..........................................
// DEFAULT OBJECT INSTANCE
//
SC.Object.prototype = {

  _kvo_enabled: YES,

  /** @private
    This is the first method invoked on a new instance.  It will first apply
    any added properties to the new instance and then calls the real init()
    method.

    @param {Array} extensions an array-like object with hashes to apply.
    @returns {Object} receiver
  */
  _object_init: function(extensions) {
    // apply any new properties
    var idx, len = (extensions) ? extensions.length : 0;
    for(idx=0;idx<len;idx++) { SC._object_extend(this, extensions[idx], this.__sc_super__) ; }
    SC.generateGuid(this, "sc") ; // add guid
    this.init() ; // call real init

    // Call 'initMixin' methods to automatically setup modules.
    var inits = this.initMixin; len = (inits) ? inits.length : 0 ;
    for(idx=0;idx < len; idx++) inits[idx].call(this);

    return this ; // done!
  },

  /**
    You can call this method on an object to mixin one or more hashes of
    properties on the receiver object.  In addition to simply copying
    properties, this method will also prepare the properties for use in
    bindings, computed properties, etc.

    If you plan to use this method, you should call it before you call
    the inherited init method from SC.Object or else your instance may not
    function properly.

    h2. Example

    {{{
      // dynamically apply a mixin specified in an object property
      var MyClass = SC.Object.extend({
         extraMixin: null,

         init: function() {
           this.mixin(this.extraMixin);
           arguments.callee.base.apply(this,arguments);
         }
      });

      var ExampleMixin = { foo: "bar" };

      var instance = MyClass.create({ extraMixin: ExampleMixin }) ;

      instance.get('foo') => "bar"
    }}}

    @param {Hash} ext a hash to copy.  Only one.
    @returns {Object} receiver
  */
  mixin: function() {
    var idx, len = arguments.length;
    for(idx=0;idx<len;idx++) SC.mixin(this, arguments[idx]) ;

    // call initMixin
    for(idx=0;idx<len;idx++) {
      var init = arguments[idx].initMixin ;
      if (init) init.call(this) ;
    }
    return this ;
  },

  /**
    This method is invoked automatically whenever a new object is
    instantiated.  You can override this method as you like to setup your
    new object.

    Within your object, be sure to call arguments.callee.base.apply(this,arguments) to ensure that the
    built-in init method is also called or your observers and computed
    properties may not be configured.

    Although the default init() method returns the receiver, the return
    value is ignored.

    @returns {void}
  */
  init: function() {
    this.initObservable();
    return this ;
  },

  /**
    Set to NO once this object has been destroyed.

    @property {Boolean}
  */
  isDestroyed: NO,

  /**
    Call this method when you are finished with an object to teardown its
    contents.  Because JavaScript is garbage collected, you do not usually
    need to call this method.  However, you may choose to do so for certain
    objects, especially views, in order to let them reclaim memory they
    consume immediately.

    If you would like to perform additional cleanup when an object is
    finished, you may override this method.  Be sure to call arguments.callee.base.apply(this,arguments).

    @returns {SC.Object} receiver
  */
  destroy: function() {
    if (this.get('isDestroyed')) return this; // nothing to do
    this.set('isDestroyed', YES);

    // destroy any mixins
    var idx, inits = this.destroyMixin, len = (inits) ? inits.length : 0 ;
    for(idx=0;idx < len; idx++) inits[idx].call(this);

    // disconnect all bindings
    this.bindings.invoke('disconnect');
    this.bindings = null;

    return this ;
  },

  /**
    Walk like a duck. Always YES since this is an object and not a class.

    @property {Boolean}
  */
  isObject: true,

  /**
    Returns YES if the named value is an executable function.

    @param methodName {String} the property name to check
    @returns {Boolean}
  */
  respondsTo: function( methodName ) {
    return !!(this[methodName] instanceof Function);
  },

  /**
    Attemps to invoke the named method, passing the included two arguments.
    Returns NO if the method is either not implemented or if the handler
    returns NO (indicating that it did not handle the event).  This method
    is invoked to deliver actions from menu items and to deliver events.
    You can override this method to provide additional handling if you
    prefer.

    @param {String} methodName
    @param {Object} arg1
    @param {Object} arg2
    @returns {Boolean} YES if handled, NO if not handled
  */
  tryToPerform: function(methodName, arg1, arg2) {
    return this.respondsTo(methodName) && (this[methodName](arg1, arg2) !== NO);
  },

  /**
    EXPERIMENTAL:  You can use this to invoke a superclass implementation in
    any method.  This does not work in Safari 2 or earlier.  If you need to
    target these methods, you should use one of the alternatives below:

    - *With Build Tools:* arguments.callee.base.apply(this,arguments);
    - *Without Build Tools:* arguments.callee.base.apply(this, arguments);

    h2. Example

    All of the following methods will call the superclass implementation of
    your method:

    {{{
      SC.Object.create({

        // DOES NOT WORK IN SAFARI 2 OR EARLIER
        method1: function() {
          this.superclass();
        },

        // REQUIRES SC-BUILD TOOLS
        method2: function() {
          arguments.callee.base.apply(this,arguments);
        },

        // WORKS ANYTIME
        method3: function() {
          arguments.callee.base.apply(this, arguments);
        }
      });
    }}}

    @params args {*args} any arguments you want to pass along.
    @returns {Object} return value from super
  */
  superclass: function(args) {
    var caller = arguments.callee.caller;
    if (!caller) throw "superclass cannot determine the caller method" ;
    return caller.superclass ? caller.superclass.apply(this, arguments) : null;
  },

  /**
    returns YES if the receiver is an instance of the named class.  See also
    kindOf().

    h2. Example

    {{{
      var ClassA = SC.Object.extend();
      var ClassB = SC.Object.extend();

      var instA = ClassA.create();
      var instB = ClassB.create();

      instA.instanceOf(ClassA) => YES
      instB.instanceOf(ClassA) => NO
    }}}

    @param {Class} scClass the class
    @returns {Boolean}
  */
  instanceOf: function(scClass) {
    return this.constructor === scClass ;
  },

  /**
    Returns true if the receiver is an instance of the named class or any
    subclass of the named class.  See also instanceOf().

    h2. Example

    {{{
      var ClassA = SC.Object.extend();
      var ClassB = SC.Object.extend();

      var instA = ClassA.create();
      var instB = ClassB.create();

      instA.kindOf(ClassA) => YES
      instB.kindOf(ClassA) => YES
    }}}

    @param scClass {Class} the class
    @returns {Boolean}
  */
  kindOf: function(scClass) { return this.constructor.kindOf(scClass); },

  /** @private */
  toString: function() {
    if (!this._object_toString) {
      // only cache the string if the klass name is available
      var klassName = SC._object_className(this.constructor) ;
      var string = "%@:%@".fmt(klassName, SC.guidFor(this));
      if (klassName) this._object_toString = string ;
      else return string ;
    }
    return this._object_toString ;
  },

  /**
    Activates any outlet connections in object and syncs any bindings.  This
    method is called automatically for view classes but may be used for any
    object.

    @returns {void}
  */
  awake: function(key) {
    var outlets = this.outlets,
        i, len, outlet;
    for (i = 0, len = outlets.length;  i < len;  ++i) {
      outlet = outlets[i];
      this.get(outlet);
    }
    this.bindings.invoke('sync');
  },

  /**
    Invokes the passed method or method name one time during the runloop.  You
    can use this method to schedule methods that need to execute but may be
    too expensive to execute more than once, such as methods that update the
    DOM.

    Note that in development mode only, the object and method that call this
    method will be recorded, for help in debugging scheduled code.

    @param {Function|String} method method or method name
    @returns {SC.Object} receiver
  */
  invokeOnce: function(method) {
    SC.RunLoop.currentRunLoop.invokeOnce(this, method) ;
    return this ;
  },

  /**
    Invokes the passed method once at the beginning of the next runloop,
    before any other methods (including events) are processed. This is useful
    for situations where you know you need to update something, but due to
    the way the run loop works, you can't actually do the update until the
    run loop has completed.

    A simple example is setting the selection on a collection controller to a
    newly created object. Because the collection controller won't have its
    content collection updated until later in the run loop, setting the
    selection immediately will have no effect. In this situation, you could do
    this instead:

    {{{
      // Creates a new MyRecord object and sets the selection of the
      // myRecord collection controller to the new object.
      createObjectAction: function(sender, evt) {
        // create a new record and add it to the store
        var obj = MyRecord.newRecord() ;

        // update the collection controller's selection
        MyApp.myRecordCollectionController.invokeLast( function() {
          this.set('selection', [obj]) ;
        });
      }
    }}}

    You can call invokeLast as many times as you like and the method will
    only be invoked once.

    Note that in development mode only, the object and method that call this
    method will be recorded, for help in debugging scheduled code.

    @param {Function|String} method method or method name
    @returns {SC.Object} receiver
  */
  invokeLast: function(method) {
    SC.RunLoop.currentRunLoop.invokeLast(this, method) ;
    return this ;
  },

  /**
    The properties named in this array will be concatenated in subclasses
    instead of replaced.  This allows you to name special properties that
    should contain any values you specify plus values specified by parents.

    It is used by SproutCore and is available for your use, though you
    should limit the number of properties you include in this list as it
    adds a slight overhead to new class and instance creation.

    @property {Array}
  */
  concatenatedProperties: ['concatenatedProperties', 'initMixin', 'destroyMixin']

} ;

// bootstrap the constructor for SC.Object.
SC.Object.prototype.constructor = SC.Object;

// Add observable to mixin
SC.mixin(SC.Object.prototype, SC.Observable) ;

// ..........................................................
// CLASS NAME SUPPORT
//

/** @private
  This is a way of performing brute-force introspection.  This searches
  through all the top-level properties looking for classes.  When it finds
  one, it saves the class path name.
*/
function findClassNames() {

  if (SC._object_foundObjectClassNames) return ;
  SC._object_foundObjectClassNames = true ;

  var seen = [] ;
  var detectedSC = false;
  var searchObject = function(root, object, levels) {
    levels-- ;

    // not the fastest, but safe
    if (seen.indexOf(object) >= 0) return ;
    seen.push(object) ;

    for(var key in object) {
      if (key == '__scope__') continue ;
      if (key == 'superclass') continue ;
      if (key == '__SC__') key = 'SC' ;
      if (!key.match(/^[A-Z0-9]/)) continue ;
      if (key == 'SC') {
        if (detectedSC) continue;
        detectedSC = true;
      }

      var path = (root) ? [root,key].join('.') : key ;
      var value = object[key] ;

      try {
        var type = SC.typeOf(value);
      } catch (e) {
        // Firefox gives security errors when trying to run typeOf on certain objects
        break;
      }

      switch(type) {
      case SC.T_CLASS:
        if (!value._object_className) value._object_className = path;
        if (levels>=0) searchObject(path, value, levels) ;
        break ;

      case SC.T_OBJECT:
        if (levels>=0) searchObject(path, value, levels) ;
        break ;

      case SC.T_HASH:
        if (((root) || (path==='SC')) && (levels>=0)) searchObject(path, value, levels) ;
        break ;

      default:
        break;
      }
    }
  } ;

  // Fix for IE 7 and 8 in order to detect the SC global variable. When you create
  // a global variable in IE, it is not added to the window object like in other
  // browsers. Therefore the searchObject method will not pick it up. So we have to
  // update the window object to have a reference to the global variable. And
  // doing window['SC'] does not work since the global variable already exists. For
  // any object that you create that is used act as a namespace, be sure to create it
  // like so:
  //
  //   window.MyApp = window.MyApp || SC.Object.create({ ... })
  //
  window['__SC__'] = SC;
  searchObject(null, window, 2) ;
}

/**
  Same as the instance method, but lets you check instanceOf without
  having to first check if instanceOf exists as a method.

  @param {Object} scObject the object to check instance of
  @param {Class} scClass the class
  @returns {Boolean} if object1 is instance of class
*/
SC.instanceOf = function(scObject, scClass) {
  return !!(scObject && scObject.constructor === scClass) ;
} ;

/**
  Same as the instance method, but lets you check kindOf without having to
  first check if kindOf exists as a method.

  @param {Object} scObject object to check kind of
  @param {Class} scClass the class to check
  @returns {Boolean} if object is an instance of class or subclass
*/
SC.kindOf = function(scObject, scClass) {
  if (scObject && !scObject.isClass) scObject = scObject.constructor;
  return !!(scObject && scObject.kindOf && scObject.kindOf(scClass));
};

/** @private
  Returns the name of this class.  If the name is not known, triggers
  a search.  This can be expensive the first time it is called.

  This method is used to allow classes to determine their own name.
*/
SC._object_className = function(obj) {
  if (SC.isReady === NO) return ''; // class names are not available until ready
  if (!obj._object_className) findClassNames() ;
  if (obj._object_className) return obj._object_className ;

  // if no direct classname was found, walk up class chain looking for a
  // match.
  var ret = obj ;
  while(ret && !ret._object_className) ret = ret.superclass;
  return (ret && ret._object_className) ? ret._object_className : 'Anonymous';
} ;


/* >>>>>>>>>> BEGIN source/system/binding.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('system/object') ;

/**
  Debug parameter you can turn on.  This will log all bindings that fire to
  the console.  This should be disabled in production code.  Note that you
  can also enable this from the console or temporarily.

  @property {Boolean}
*/
SC.LOG_BINDINGS = NO ;

/**
  Performance paramter.  This will benchmark the time spent firing each
  binding.

  @property {Boolean}
*/
SC.BENCHMARK_BINDING_NOTIFICATIONS = NO ;

/**
  Performance parameter.  This will benchmark the time spend configuring each
  binding.

  @property {Boolean}
*/
SC.BENCHMARK_BINDING_SETUP = NO;

/**
  Default placeholder for multiple values in bindings.

  @property {String}
*/
SC.MULTIPLE_PLACEHOLDER = '@@MULT@@' ;

/**
  Default placeholder for null values in bindings.

  @property {String}
*/
SC.NULL_PLACEHOLDER = '@@NULL@@' ;

/**
  Default placeholder for empty values in bindings.

  @property {String}
*/
SC.EMPTY_PLACEHOLDER = '@@EMPTY@@' ;


/**
  @namespace

  A binding simply connects the properties of two objects so that whenever the
  value of one property changes, the other property will be changed also.  You
  do not usually work with Binding objects directly but instead describe
  bindings in your class definition using something like:

  {{{
    valueBinding: "MyApp.someController.title"
  }}}

  This will create a binding from "MyApp.someController.title" to the "value"
  property of your object instance automatically.  Now the two values will be
  kept in sync.

  h2. Customizing Your Bindings

  In addition to synchronizing values, bindings can also perform some basic
  transforms on values.  These transforms can help to make sure the data fed
  into one object always meets the expectations of that object regardless of
  what the other object outputs.

  To customize a binding, you can use one of the many helper methods defined
  on SC.Binding like so:

  {{{
    valueBinding: SC.Binding.single("MyApp.someController.title")
  }}}

  This will create a binding just like the example above, except that now the
  binding will convert the value of MyApp.someController.title to a single
  object (removing any arrays) before applying it to the "value" property of
  your object.

  You can also chain helper methods to build custom bindings like so:

  {{{
    valueBinding: SC.Binding.single("MyApp.someController.title").notEmpty("(EMPTY)")
  }}}

  This will force the value of MyApp.someController.title to be a single value
  and then check to see if the value is "empty" (null, undefined, empty array,
  or an empty string).  If it is empty, the value will be set to the string
  "(EMPTY)".

  h2. One Way Bindings

  One especially useful binding customization you can use is the oneWay()
  helper.  This helper tells SproutCore that you are only interested in
  receiving changes on the object you are binding from.  For example, if you
  are binding to a preference and you want to be notified if the preference
  has changed, but your object will not be changing the preference itself, you
  could do:

  {{{
    bigTitlesBinding: SC.Binding.oneWay("MyApp.preferencesController.bigTitles")
  }}}

  This way if the value of MyApp.preferencesController.bigTitles changes the
  "bigTitles" property of your object will change also.  However, if you
  change the value of your "bigTitles" property, it will not update the
  preferencesController.

  One way bindings are almost twice as fast to setup and twice as fast to
  execute because the binding only has to worry about changes to one side.

  You should consider using one way bindings anytime you have an object that
  may be created frequently and you do not intend to change a property; only
  to monitor it for changes. (such as in the example above).

  h2. Adding Custom Transforms

  In addition to using the standard helpers provided by SproutCore, you can
  also defined your own custom transform functions which will be used to
  convert the value.  To do this, just define your transform function and add
  it to the binding with the transform() helper.  The following example will
  not allow Integers less than ten.  Note that it checks the value of the
  bindings and allows all other values to pass:

  {{{
    valueBinding: SC.Binding.transform(function(value, binding) {
      return ((SC.typeOf(value) === SC.T_NUMBER) && (value < 10)) ? 10 : value;
    }).from("MyApp.someController.value")
  }}}

  If you would like to instead use this transform on a number of bindings,
  you can also optionally add your own helper method to SC.Binding.  This
  method should simply return the value of this.transform(). The example
  below adds a new helper called notLessThan() which will limit the value to
  be not less than the passed minimum:

  {{{
    SC.Binding.notLessThan = function(minValue) {
      return this.transform(function(value, binding) {
        return ((SC.typeOf(value) === SC.T_NUMBER) && (value < minValue)) ? minValue : value ;
      }) ;
    } ;
  }}}

  You could specify this in your core.js file, for example.  Then anywhere in
  your application you can use it to define bindings like so:

  {{{
    valueBinding: SC.Binding.from("MyApp.someController.value").notLessThan(10)
  }}}

  Also, remember that helpers are chained so you can use your helper along with
  any other helpers.  The example below will create a one way binding that
  does not allow empty values or values less than 10:

  {{{
    valueBinding: SC.Binding.oneWay("MyApp.someController.value").notEmpty().notLessThan(10)
  }}}

  Note that the built in helper methods all allow you to pass a "from"
  property path so you don't have to use the from() helper to set the path.
  You can do the same thing with your own helper methods if you like, but it
  is not required.

  h2. Creating Custom Binding Templates

  Another way you can customize bindings is to create a binding template.  A
  template is simply a binding that is already partially or completely
  configured.  You can specify this template anywhere in your app and then use
  it instead of designating your own custom bindings.  This is a bit faster on
  app startup but it is mostly useful in making your code less verbose.

  For example, let's say you will be frequently creating one way, not empty
  bindings that allow values greater than 10 throughout your app.  You could
  create a binding template in your core.js like this:

  {{{
    MyApp.LimitBinding = SC.Binding.oneWay().notEmpty().notLessThan(10);
  }}}

  Then anywhere you want to use this binding, just refer to the template like
  so:

  {{{
    valueBinding: MyApp.LimitBinding.beget("MyApp.someController.value")
  }}}

  Note that when you use binding templates, it is very important that you
  always start by using beget() to extend the template.  If you do not do
  this, you will end up using the same binding instance throughout your app
  which will lead to erratic behavior.

  h2. How to Manually Activate a Binding

  All of the examples above show you how to configure a custom binding, but
  the result of these customizations will be a binding template, not a fully
  active binding.  The binding will actually become active only when you
  instantiate the object the binding belongs to.  It is useful however, to
  understand what actually happens when the binding is activated.

  For a binding to function it must have at least a "from" property and a "to"
  property.  The from property path points to the object/key that you want to
  bind from while the to path points to the object/key you want to bind to.

  When you define a custom binding, you are usually describing the property
  you want to bind from (such as "MyApp.someController.value" in the examples
  above).  When your object is created, it will automatically assign the value
  you want to bind "to" based on the name of your binding key.  In the
  examples above, during init, SproutCore objects will effectively call
  something like this on your binding:

  {{{
    binding = this.valueBinding.beget().to("value", this) ;
  }}}

  This creates a new binding instance based on the template you provide, and
  sets the to path to the "value" property of the new object.  Now that the
  binding is fully configured with a "from" and a "to", it simply needs to be
  connected to become active.  This is done through the connect() method:

  {{{
    binding.connect() ;
  }}}

  Now that the binding is connected, it will observe both the from and to side
  and relay changes.

  If you ever needed to do so (you almost never will, but it is useful to
  understand this anyway), you could manually create an active binding by
  doing the following:

  {{{
    SC.Binding.from("MyApp.someController.value")
     .to("MyApp.anotherObject.value")
     .connect();
  }}}

  You could also use the bind() helper method provided by SC.Object. (This is
  the same method used by SC.Object.init() to setup your bindings):

  {{{
    MyApp.anotherObject.bind("value", "MyApp.someController.value") ;
  }}}

  Both of these code fragments have the same effect as doing the most friendly
  form of binding creation like so:

  {{{
    MyApp.anotherObject = SC.Object.create({
      valueBinding: "MyApp.someController.value",

      // OTHER CODE FOR THIS OBJECT...

    }) ;
  }}}

  SproutCore's built in binding creation method make it easy to automatically
  create bindings for you.  You should always use the highest-level APIs
  available, even if you understand how to it works underneath.

  @since SproutCore 1.0
*/
SC.Binding = {

  /**
    This is the core method you use to create a new binding instance.  The
    binding instance will have the receiver instance as its parent which means
    any configuration you have there will be inherited.

    The returned instance will also have its parentBinding property set to the
    receiver.

    @param fromPath {String} optional from path.
    @returns {SC.Binding} new binding instance
  */
  beget: function(fromPath) {
    var ret = SC.beget(this) ;
    ret.parentBinding = this;
    if (fromPath !== undefined) ret = ret.from(fromPath) ;
    return ret ;
  },

  /**
    Returns a builder function for compatibility.
  */
  builder: function() {
    var binding = this,
        ret = function(fromProperty) { return binding.beget().from(fromProperty); };
    ret.beget = function() { return binding.beget(); } ;
    return ret ;
  },

  /**
    This will set "from" property path to the specified value.  It will not
    attempt to resolve this property path to an actual object/property tuple
    until you connect the binding.

    The binding will search for the property path starting at the root level
    unless you specify an alternate root object as the second paramter to this
    method.  Alternatively, you can begin your property path with either "." or
    "*", which will use the root object of the to side be default.  This special
    behavior is used to support the high-level API provided by SC.Object.

    @param propertyPath {String|Tuple} A property path or tuple
    @param root {Object} optional root object to use when resolving the path.
    @returns {SC.Binding} this
  */
  from: function(propertyPath, root) {

    // if the propertyPath is null/undefined, return this.  This allows the
    // method to be called from other methods when the fromPath might be
    // optional. (cf single(), multiple())
    if (!propertyPath) return this ;

    // beget if needed.
    var binding = (this === SC.Binding) ? this.beget() : this ;
    binding._fromPropertyPath = propertyPath ;
    binding._fromRoot = root ;
    binding._fromTuple = null ;
    return binding ;
  },

  /**
   This will set the "to" property path to the specified value.  It will not
   attempt to reoslve this property path to an actual object/property tuple
   until you connect the binding.

    @param propertyPath {String|Tuple} A property path or tuple
    @param root {Object} optional root object to use when resolving the path.
    @returns {SC.Binding} this
  */
  to: function(propertyPath, root) {
    // beget if needed.
    var binding = (this === SC.Binding) ? this.beget() : this ;
    binding._toPropertyPath = propertyPath ;
    binding._toRoot = root ;
    binding._toTuple = null ; // clear out any existing one.
    return binding ;
  },

  /**
    Attempts to connect this binding instance so that it can receive and relay
    changes.  This method will raise an exception if you have not set the
    from/to properties yet.

    @returns {SC.Binding} this
  */
  connect: function() {
    // If the binding is already connected, do nothing.
    if (this.isConnected) return this ;
    this.isConnected = YES ;
    this._connectionPending = YES ; // its connected but not really...
    this._syncOnConnect = YES ;
    SC.Binding._connectQueue.add(this) ;
    return this;
  },

  /** @private
    Actually connects the binding.  This is done at the end of the runloop
    to give you time to setup your entire object graph before the bindings
    try to activate.
  */
  _connect: function() {
    if (!this._connectionPending) return; //nothing to do
    this._connectionPending = NO ;

    var path, root,
        bench = SC.BENCHMARK_BINDING_SETUP;

    if (bench) SC.Benchmark.start("SC.Binding.connect()");

    // try to connect the from side.
    // as a special behavior, if the from property path begins with either a
    // . or * and the fromRoot is null, use the toRoot instead.  This allows
    // for support for the SC.Object shorthand:
    //
    // contentBinding: "*owner.value"
    //
    path = this._fromPropertyPath; root = this._fromRoot ;

    if (typeof path === "string") {

      // if the first character is a '.', this is a static path.  make the
      // toRoot the default root.
      if (path.indexOf('.') === 0) {
        path = path.slice(1);
        if (!root) root = this._toRoot ;

      // if the first character is a '*', then setup a tuple since this is a
      // chained path.
      } else if (path.indexOf('*') === 0) {
        path = [this._fromRoot || this._toRoot, path.slice(1)] ;
        root = null ;
      }
    }
    this._fromObserverData = [path, this, this.fromPropertyDidChange, root];
    SC.Observers.addObserver.apply(SC.Observers, this._fromObserverData);

    // try to connect the to side
    if (!this._oneWay) {
      path = this._toPropertyPath; root = this._toRoot ;
      this._toObserverData = [path, this, this.toPropertyDidChange, root];
      SC.Observers.addObserver.apply(SC.Observers, this._toObserverData);
    }

    if (bench) SC.Benchmark.end("SC.Binding.connect()");

    // now try to sync if needed
    if (this._syncOnConnect) {
      this._syncOnConnect = NO ;
      if (bench) SC.Benchmark.start("SC.Binding.connect().sync");
      this.sync();
      if (bench) SC.Benchmark.end("SC.Binding.connect().sync");
    }
  },

  /**
    Disconnects the binding instance.  Changes will no longer be relayed.  You
    will not usually need to call this method.

    @returns {SC.Binding} this
  */
  disconnect: function() {
    if (!this.isConnected) return this; // nothing to do.

    // if connection is still pending, just cancel
    if (this._connectionPending) {
      this._connectionPending = NO ;

    // connection is completed, disconnect.
    } else {
      SC.Observers.removeObserver.apply(SC.Observers, this._fromObserverData);
      if (!this._oneWay) {
        SC.Observers.removeObserver.apply(SC.Observers, this._toObserverData);
      }
    }

    this.isConnected = NO ;
    return this ;
  },

  /**
    Invoked whenever the value of the "from" property changes.  This will mark
    the binding as dirty if the value has changed.
  */
  fromPropertyDidChange: function(target, key) {
    var v = target ? target.get(key) : null;

    //console.log("fromPropertyDidChange: %@ v = %@".fmt(this, v)) ;

    // if the new value is different from the current binding value, then
    // schedule to register an update.
    if (v !== this._bindingValue || key === '[]') {

      this._setBindingValue(target, key) ;
      this._changePending = YES ;
      SC.Binding._changeQueue.add(this) ; // save for later.
    }
  },

  /**
    Invoked whenever the value of the "to" property changes.  This will mark the
    binding as dirty only if:

    - the binding is not one way
    - the value does not match the stored transformedBindingValue

    if the value does not match the transformedBindingValue, then it will
    become the new bindingValue.
  */
  toPropertyDidChange: function(target, key) {
    if (this._oneWay) return; // nothing to do

    var v = target.get(key) ;

    // if the new value is different from the current binding value, then
    // schedule to register an update.
    if (v !== this._transformedBindingValue) {
      this._setBindingValue(target, key) ;
      this._changePending = YES ;
      SC.Binding._changeQueue.add(this) ; // save for later.
    }
  },

  /** @private
    Saves the source location for the binding value.  This will be used later
    to actually update the binding value.
  */
  _setBindingValue: function(source, key) {
    this._bindingSource = source;
    this._bindingKey    = key;
  },

  /** @private
    Updates the binding value from the current binding source if needed.  This
    should be called just before using this._bindingValue.
  */
  _computeBindingValue: function() {
    var source = this._bindingSource,
        key    = this._bindingKey,
        v, idx;

    this._bindingValue = v = (source ? source.getPath(key) : null);

    // apply any transforms to get the to property value also
    var transforms = this._transforms;
    if (transforms) {
      var len = transforms.length,
          transform;
      for(idx=0;idx<len;idx++) {
        transform = transforms[idx] ;
        v = transform(v, this) ;
      }
    }

    // if error objects are not allowed, and the value is an error, then
    // change it to null.
    if (this._noError && SC.typeOf(v) === SC.T_ERROR) v = null ;

    this._transformedBindingValue = v;
  },

  _connectQueue: SC.CoreSet.create(),
  _alternateConnectQueue: SC.CoreSet.create(),
  _changeQueue: SC.CoreSet.create(),
  _alternateChangeQueue: SC.CoreSet.create(),
  _changePending: NO,

  /**
    Call this method on SC.Binding to flush all bindings with changed pending.

    @returns {Boolean} YES if changes were flushed.
  */
  flushPendingChanges: function() {

    // don't allow flushing more than one at a time
    if (this._isFlushing) return NO;
    this._isFlushing = YES ;
    SC.Observers.suspendPropertyObserving();

    var didFlush = NO,
        log = SC.LOG_BINDINGS,
        // connect any bindings
        queue, binding ;
    while((queue = this._connectQueue).length >0) {
      this._connectQueue = this._alternateConnectQueue ;
      this._alternateConnectQueue = queue ;
      while(binding = queue.pop()) binding._connect() ;
    }

    // loop through the changed queue...
    while ((queue = this._changeQueue).length > 0) {
      if (log) SC.Logger.log("Begin: Trigger changed bindings") ;

      didFlush = YES ;

      // first, swap the change queues.  This way any binding changes that
      // happen while we flush the current queue can be queued up.
      this._changeQueue = this._alternateChangeQueue ;
      this._alternateChangeQueue = queue ;

      // next, apply any bindings in the current queue.  This may cause
      // additional bindings to trigger, which will end up in the new active
      // queue.
      while(binding = queue.pop()) binding.applyBindingValue() ;

      // now loop back and see if there are additional changes pending in the
      // active queue.  Repeat this until all bindings that need to trigger
      // have triggered.
      if (log) SC.Logger.log("End: Trigger changed bindings") ;
    }

    // clean up
    this._isFlushing = NO ;
    SC.Observers.resumePropertyObserving();

    return didFlush ;
  },

  /**
    This method is called at the end of the Run Loop to relay the changed
    binding value from one side to the other.
  */
  applyBindingValue: function() {
    this._changePending = NO ;

    // compute the binding targets if needed.
    this._computeBindingTargets() ;
    this._computeBindingValue();

    var v = this._bindingValue,
        tv = this._transformedBindingValue,
        bench = SC.BENCHMARK_BINDING_NOTIFICATIONS,
        log = SC.LOG_BINDINGS ;

    // the from property value will always be the binding value, update if
    // needed.
    if (!this._oneWay && this._fromTarget) {
      if (log) SC.Logger.log("%@: %@ -> %@".fmt(this, v, tv)) ;
      if (bench) SC.Benchmark.start(this.toString() + "->") ;
      this._fromTarget.setPathIfChanged(this._fromPropertyKey, v) ;
      if (bench) SC.Benchmark.end(this.toString() + "->") ;
    }

    // update the to value with the transformed value if needed.
    if (this._toTarget) {
      if (log) SC.Logger.log("%@: %@ <- %@".fmt(this, v, tv)) ;
      if (bench) SC.Benchmark.start(this.toString() + "<-") ;
      this._toTarget.setPathIfChanged(this._toPropertyKey, tv) ;
      if (bench) SC.Benchmark.start(this.toString() + "<-") ;
    }
  },

  /**
    Calling this method on a binding will cause it to check the value of the
    from side of the binding matches the current expected value of the
    binding. If not, it will relay the change as if the from side's value has
    just changed.

    This method is useful when you are dynamically connecting bindings to a
    network of objects that may have already been initialized.
  */
  sync: function() {

    // do nothing if not connected
    if (!this.isConnected) return this;

    // connection is pending, just note that we should sync also
    if (this._connectionPending) {
      this._syncOnConnect = YES ;

    // we are connected, go ahead and sync
    } else {
      this._computeBindingTargets() ;
      var target = this._fromTarget,
          key = this._fromPropertyKey ;
      if (!target || !key) return this ; // nothing to do

      // get the new value
      var v = target.getPath(key) ;

      // if the new value is different from the current binding value, then
      // schedule to register an update.
      if (v !== this._bindingValue || key === '[]') {
        this._setBindingValue(target, key) ;
        this._changePending = YES ;
        SC.Binding._changeQueue.add(this) ; // save for later.
      }
    }

    return this ;
  },

  // set if you call sync() when the binding connection is still pending.
  _syncOnConnect: NO,

  _computeBindingTargets: function() {
    if (!this._fromTarget) {

      var path, root, tuple ;

      // if the fromPropertyPath begins with a . or * then we may use the
      // toRoot as the root object.  Similar code exists in connect() so if
      // you make a change to one be sure to update the other.
      path = this._fromPropertyPath; root = this._fromRoot ;
      if (typeof path === "string") {

        // static path beginning with the toRoot
        if (path.indexOf('.') === 0) {
          path = path.slice(1) ; // remove the .
          if (!root) root = this._toRoot; // use the toRoot optionally

        // chained path beginning with toRoot.  Setup a tuple
        } else if (path.indexOf('*') === 0) {
          path = [root || this._toRoot, path.slice(1)];
          root = null ;
        }
      }

      tuple = SC.tupleForPropertyPath(path, root) ;
      if (tuple) {
        this._fromTarget = tuple[0]; this._fromPropertyKey = tuple[1] ;
      }
    }

    if (!this._toTarget) {
      path = this._toPropertyPath; root = this._toRoot ;
      tuple = SC.tupleForPropertyPath(path, root) ;
      if (tuple) {
        this._toTarget = tuple[0]; this._toPropertyKey = tuple[1] ;
      }
    }
  },

  /**
    Configures the binding as one way.  A one-way binding will relay changes
    on the "from" side to the "to" side, but not the other way around.  This
    means that if you change the "to" side directly, the "from" side may have
    a different value.

    @param fromPath {String} optional from path to connect.
    @param aFlag {Boolean} Optionally pass NO to set the binding back to two-way
    @returns {SC.Binding} this
  */
  oneWay: function(fromPath, aFlag) {

    // If fromPath is a bool but aFlag is undefined, swap.
    if ((aFlag === undefined) && (SC.typeOf(fromPath) === SC.T_BOOL)) {
      aFlag = fromPath; fromPath = null ;
    }

    // beget if needed.
    var binding = this.from(fromPath) ;
    if (binding === SC.Binding) binding = binding.beget() ;
    binding._oneWay = (aFlag === undefined) ? YES : aFlag ;
    return binding ;
  },

  /**
    Adds the specified transform function to the array of transform functions.

    The function you pass must have the following signature:

    {{{
      function(value) {} ;
    }}}

    It must return either the transformed value or an error object.

    Transform functions are chained, so they are called in order.  If you are
    extending a binding and want to reset the transforms, you can call
    resetTransform() first.

    @param transformFunc {Function} the transform function.
    @returns {SC.Binding} this
  */
  transform: function(transformFunc) {
    var binding = (this === SC.Binding) ? this.beget() : this ;
    var t = binding._transforms ;

    // clone the transform array if this comes from the parent
    if (t && (t === binding.parentBinding._transform)) {
      t = binding._transforms = t.slice() ;
    }

    // create the transform array if needed.
    if (!t) t = binding._transforms = [] ;

    // add the transform function
    t.push(transformFunc) ;
    return binding;
  },

  /**
    Resets the transforms for the binding.  After calling this method the
    binding will no longer transform values.  You can then add new transforms
    as needed.

    @returns {SC.Binding} this
  */
  resetTransforms: function() {
    var binding = (this === SC.Binding) ? this.beget() : this ;
    binding._transforms = null ; return binding ;
  },

  /**
    Specifies that the binding should not return error objects.  If the value
    of a binding is an Error object, it will be transformed to a null value
    instead.

    Note that this is not a transform function since it will be called at the
    end of the transform chain.

    @param fromPath {String} optional from path to connect.
    @param aFlag {Boolean} optionally pass NO to allow error objects again.
    @returns {SC.Binding} this
  */
  noError: function(fromPath, aFlag) {
    // If fromPath is a bool but aFlag is undefined, swap.
    if ((aFlag === undefined) && (SC.typeOf(fromPath) === SC.T_BOOL)) {
      aFlag = fromPath; fromPath = null ;
    }

    // beget if needed.
    var binding = this.from(fromPath) ;
    if (binding === SC.Binding) binding = binding.beget() ;
    binding._noError = (aFlag === undefined) ? YES : aFlag ;
    return binding ;
  },

  /**
    Adds a transform to the chain that will allow only single values to pass.
    This will allow single values, nulls, and error values to pass through.  If
    you pass an array, it will be mapped as so:

    {{{
      [] => null
      [a] => a
      [a,b,c] => Multiple Placeholder
    }}}

    You can pass in an optional multiple placeholder or it will use the
    default.

    Note that this transform will only happen on forwarded valued.  Reverse
    values are send unchanged.

    @param fromPath {String} from path or null
    @param placeholder {Object} optional placeholder value.
    @returns {SC.Binding} this
  */
  single: function(fromPath, placeholder) {
    if (placeholder === undefined) {
      placeholder = SC.MULTIPLE_PLACEHOLDER ;
    }
    return this.from(fromPath).transform(function(value, isForward) {
      if (value && value.isEnumerable) {
        var len = value.get('length');
        value = (len>1) ? placeholder : (len<=0) ? null : value.firstObject();
      }
      return value ;
    }) ;
  },

  /**
    Adds a transform that will return the placeholder value if the value is
    null, undefined, an empty array or an empty string.  See also notNull().

    @param fromPath {String} from path or null
    @param placeholder {Object} optional placeholder.
    @returns {SC.Binding} this
  */
  notEmpty: function(fromPath, placeholder) {
    if (placeholder === undefined) placeholder = SC.EMPTY_PLACEHOLDER ;
    return this.from(fromPath).transform(function(value, isForward) {
      if (SC.none(value) || (value === '') || (SC.isArray(value) && value.length === 0)) {
        value = placeholder ;
      }
      return value ;
    }) ;
  },

  /**
    Adds a transform that will return the placeholder value if the value is
    null.  Otherwise it will passthrough untouched.  See also notEmpty().

    @param fromPath {String} from path or null
    @param placeholder {Object} optional placeholder;
    @returns {SC.Binding} this
  */
  notNull: function(fromPath, placeholder) {
    if (placeholder === undefined) placeholder = SC.EMPTY_PLACEHOLDER ;
    return this.from(fromPath).transform(function(value, isForward) {
      if (SC.none(value)) value = placeholder ;
      return value ;
    }) ;
  },

  /**
    Adds a transform that will convert the passed value to an array.  If
    the value is null or undefined, it will be converted to an empty array.

    @param fromPath {String} optional from path
    @returns {SC.Binding} this
  */
  multiple: function(fromPath) {
    return this.from(fromPath).transform(function(value) {
      if (!SC.isArray(value)) value = (value == null) ? [] : [value] ;
      return value ;
    }) ;
  },

  /**
    Adds a transform to convert the value to a bool value.  If the value is
    an array it will return YES if array is not empty.  If the value is a string
    it will return YES if the string is not empty.

    @param fromPath {String} optional from path
    @returns {SC.Binding} this
  */
  bool: function(fromPath) {
    return this.from(fromPath).transform(function(v) {
      var t = SC.typeOf(v) ;
      if (t === SC.T_ERROR) return v ;
      return (t == SC.T_ARRAY) ? (v.length > 0) : (v === '') ? NO : !!v ;
    }) ;
  },

  /**
    Adds a transform that forwards the logical 'AND' of values at 'pathA' and
    'pathB' whenever either source changes.  Note that the transform acts strictly
    as a one-way binding, working only in the direction

      'pathA' AND 'pathB' --> value  (value returned is the result of ('pathA' && 'pathB'))

    Usage example where a delete button's 'isEnabled' value is determined by whether
    something is selected in a list and whether the current user is allowed to delete:

      deleteButton: SC.ButtonView.design({
        isEnabledBinding: SC.Binding.and('MyApp.itemsController.hasSelection', 'MyApp.userController.canDelete')
      })

  */
  and: function(pathA, pathB) {

    // create an object to do the logical computation
    var gate = SC.Object.create({
      valueABinding: pathA,
      valueBBinding: pathB,

      and: function() {
        return (this.get('valueA') && this.get('valueB'));
      }.property('valueA', 'valueB').cacheable()
    });

    // add a transform that depends on the result of that computation.
    return this.from('and', gate).oneWay();
  },

  /**
    Adds a transform that forwards the 'OR' of values at 'pathA' and
    'pathB' whenever either source changes.  Note that the transform acts strictly
    as a one-way binding, working only in the direction

      'pathA' AND 'pathB' --> value  (value returned is the result of ('pathA' || 'pathB'))

  */
  or: function(pathA, pathB) {

    // create an object to the logical computation
    var gate = SC.Object.create({
      valueABinding: pathA,
      valueBBinding: pathB,

      or: function() {
        return (this.get('valueA') || this.get('valueB'));
      }.property('valueA', 'valueB').cacheable()
    });

    return this.from('or', gate).oneWay();
  },

  /**
    Adds a transform to convert the value to the inverse of a bool value.  This
    uses the same transform as bool() but inverts it.

    @param fromPath {String} optional from path
    @returns {SC.Binding} this
  */
  not: function(fromPath) {
    return this.from(fromPath).transform(function(v) {
      var t = SC.typeOf(v) ;
      if (t === SC.T_ERROR) return v ;
      return !((t == SC.T_ARRAY) ? (v.length > 0) : (v === '') ? NO : !!v) ;
    }) ;
  },

  /**
    Adds a transform that will return YES if the value is null, NO otherwise.

    @returns {SC.Binding} this
  */
  isNull: function(fromPath) {
    return this.from(fromPath).transform(function(v) {
      var t = SC.typeOf(v) ;
      return (t === SC.T_ERROR) ? v : SC.none(v) ;
    });
  },

  toString: function() {
    var from = this._fromRoot ? "<%@>:%@".fmt(this._fromRoot,this._fromPropertyPath) : this._fromPropertyPath;

    var to = this._toRoot ? "<%@>:%@".fmt(this._toRoot,this._toPropertyPath) : this._toPropertyPath;

    var oneWay = this._oneWay ? '[oneWay]' : '';
    return "SC.Binding%@(%@ -> %@)%@".fmt(SC.guidFor(this), from, to, oneWay);
  }
} ;

/**
  Shorthand method to define a binding.  This is the same as calling:

  {{{
    SC.binding(path) = SC.Binding.from(path)
  }}}
*/
SC.binding = function(path, root) { return SC.Binding.from(path,root); } ;


/* >>>>>>>>>> BEGIN source/system/error.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @class

  An error, used to represent an error state.

  Many API's within SproutCore will return an instance of this object whenever
  they have an error occur.  An error includes an error code, description,
  and optional human readable label that indicates the item that failed.

  Depending on the error, other properties may also be added to the object
  to help you recover from the failure.

  You can pass error objects to various UI elements to display the error in
  the interface. You can easily determine if the value returned by some API is
  an error or not using the helper SC.ok(value).

  h2. Faking Error Objects

  You can actually make any object you want to be treated like an Error object
  by simply implementing two properties: isError and errorValue.  If you
  set isError to YES, then calling SC.ok(obj) on your object will return NO.
  If isError is YES, then SC.val(obj) will return your errorValue property
  instead of the receiver.

  @extends SC.Object
  @since SproutCore 1.0
*/
SC.Error = SC.Object.extend(
/** @scope SC.Error.prototype */ {

  /**
    error code.  Used to designate the error type.

    @property {Number}
  */
  code: -1,

  /**
    Human readable description of the error.  This can also be a non-localized
    key.

    @property {String}
  */
  message: '',

  /**
    The value the error represents.  This is used when wrapping a value inside
    of an error to represent the validation failure.

    @property {Object}
  */
  errorValue: null,

  /**
    The original error object.  Normally this will return the receiver.
    However, sometimes another object will masquarade as an error; this gives
    you a way to get at the underyling error.

    @property {SC.Error}
  */
  errorObject: function() {
    return this;
  }.property().cacheable(),

  /**
    Human readable name of the item with the error.

    @property {String}
  */
  label: null,

  /** @private */
  toString: function() {
    return "SC.Error:%@:%@ (%@)".fmt(SC.guidFor(this), this.get('message'), this.get('code'));
  },

  /**
    Walk like a duck.

    @property {Boolean}
  */
  isError: YES
}) ;

/**
  Creates a new SC.Error instance with the passed description, label, and
  code.  All parameters are optional.

  @param description {String} human readable description of the error
  @param label {String} human readable name of the item with the error
  @param code {Number} an error code to use for testing.
  @returns {SC.Error} new error instance.
*/
SC.Error.desc = function(description, label, value, code) {
  var opts = { message: description } ;
  if (label !== undefined) opts.label = label ;
  if (code !== undefined) opts.code = code ;
  if (value !== undefined) opts.errorValue = value ;
  return this.create(opts) ;
} ;

/**
  Shorthand form of the SC.Error.desc method.

  @param description {String} human readable description of the error
  @param label {String} human readable name of the item with the error
  @param code {Number} an error code to use for testing.
  @returns {SC.Error} new error instance.
*/
SC.$error = function(description, label, value, c) {
  return SC.Error.desc(description,label, value, c);
} ;

/**
  Returns YES if the passed value is an error object or false.

  @param {Object} ret object value
  @returns {Boolean}
*/
SC.ok = function(ret) {
  return (ret !== false) && !(ret && ret.isError);
};

/** @private */
SC.$ok = SC.ok;

/**
  Returns the value of an object.  If the passed object is an error, returns
  the value associated with the error; otherwise returns the receiver itself.

  @param {Object} obj the object
  @returns {Object} value
*/
SC.val = function(obj) {
  if (obj && obj.isError) {
    return obj.get ? obj.get('errorValue') : null ; // Error has no value
  } else return obj ;
};

/** @private */
SC.$val = SC.val;

// STANDARD ERROR OBJECTS

/**
  Standard error code for errors that do not support multiple values.

  @property {Number}
*/
SC.Error.HAS_MULTIPLE_VALUES = -100 ;

/* >>>>>>>>>> BEGIN source/system/index_set.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('mixins/enumerable') ;
sc_require('mixins/observable') ;
sc_require('mixins/freezable');
sc_require('mixins/copyable');

/**
  @class

  A collection of ranges.  You can use an IndexSet to keep track of non-
  continuous ranges of items in a parent array.  IndexSet's are used for
  selection, for managing invalidation ranges and other data-propogation.

  h2. Examples

  {{{
    var set = SC.IndexSet.create(ranges) ;
    set.contains(index);
    set.add(index, length);
    set.remove(index, length);

    // uses a backing SC.Array object to return each index
    set.forEach(function(object) { .. })

    // returns the index
    set.forEachIndex(function(index) { ... });

    // returns ranges
    set.forEachRange(function(start, length) { .. });
  }}}

  h2. Implementation Notes

  An IndexSet stores indices on the object.  A positive value great than the
  index tells you the end of an occupied range.  A negative values tells you
  the end of an empty range.  A value less than the index is a search
  accelerator.  It tells you the start of the nearest range.

  @extends SC.Enumerable
  @extends SC.Observable
  @extends SC.Copyable
  @extends SC.Freezable
  @since SproutCore 1.0
*/
SC.IndexSet = SC.mixin({},
  SC.Enumerable, SC.Observable, SC.Freezable, SC.Copyable,
/** @scope SC.IndexSet.prototype */ {

  /** @private
    Walks a content array and copies its contents to a new array.  For large
    content arrays this is faster than using slice()
  */
  _sc_sliceContent: function(c) {
    if (c.length < 1000) return c.slice(); // use native when faster
    var cur = 0, ret = [], next = c[0];
    while(next !== 0) {
      ret[cur] = next ;
      cur = (next<0) ? (0-next) : next ;
      next = c[cur];
    }
    ret[cur] = 0;
    this._hint(0, cur, ret); // hints are not copied manually - add them
    return ret ;
  },

  /**
    To create a set, pass either a start and index or another IndexSet.

    @returns {SC.IndexSet}
  */
  create: function(start, length) {
    var ret = SC.beget(this);
    ret.initObservable();
    ret.registerDependentKey('min', '[]');

    // optimized method to clone an index set.
    if (start && start.isIndexSet) {
      ret._content = this._sc_sliceContent(start._content);
      ret.max = start.max;
      ret.length = start.length;
      ret.source = start.source ;

    // otherwise just do a regular add
    } else {
      ret._content = [0];
      if (start !== undefined) ret.add(start, length);
    }
    return ret ;
  },

  /**
    Walk like a duck.

    @property {Boolean}
  */
  isIndexSet: YES,

  /**  @private
    Internal setting determines the preferred skip size for hinting sets.

    @property {Number}
  */
  HINT_SIZE: 256,

  /**
    Total number of indexes contained in the set

    @property {Number}
  */
  length: 0,

  /**
    One greater than the largest index currently stored in the set.  This
    is sometimes useful when determining the total range of items covering
    the index set.

    @property {Number}
  */
  max: 0,

  /**
    The first index included in the set or -1.

    @property {Number}
  */
  min: function() {
    var content = this._content,
        cur = content[0];
    return (cur === 0) ? -1 : (cur>0) ? 0 : Math.abs(cur);

  }.property('[]').cacheable(),

  /**
    Returns the first index in the set .

    @property {Number}
  */
  firstObject: function() {
    return (this.get('length')>0) ? this.get('min') : undefined;
  }.property(),

  /**
    Returns the starting index of the nearest range for the specified
    index.

    @param {Number} index
    @returns {Number} starting index
  */
  rangeStartForIndex: function(index) {
    var content = this._content,
        max     = this.get('max'),
        ret, next, accel;

    // fast cases
    if (index >= max) return max ;
    if (Math.abs(content[index]) > index) return index ; // we hit a border

    // use accelerator to find nearest content range
    accel = index - (index % SC.IndexSet.HINT_SIZE);
    ret = content[accel];
    if (ret<0 || ret>index) ret = accel;
    next = Math.abs(content[ret]);

    // now step forward through ranges until we find one that includes the
    // index.
    while (next < index) {
      ret = next ;
      next = Math.abs(content[ret]);
    }
    return ret ;
  },

  /**
    Returns YES if the passed index set contains the exact same indexes as
    the receiver.  If you pass any object other than an index set, returns NO.

    @param {Object} obj another object.
    @returns {Boolean}
  */
  isEqual: function(obj) {

    // optimize for some special cases
    if (obj === this) return YES ;
    if (!obj || !obj.isIndexSet || (obj.max !== this.max) || (obj.length !== this.length)) return NO;

    // ok, now we need to actually compare the ranges of the two.
    var lcontent = this._content,
        rcontent = obj._content,
        cur      = 0,
        next     = lcontent[cur];

    do {
      if (rcontent[cur] !== next) return NO ;
      cur = Math.abs(next) ;
      next = lcontent[cur];
    } while (cur !== 0);
    return YES ;
  },

  /**
    Returns the first index in the set before the passed index or null if
    there are no previous indexes in the set.

    @param {Number} index index to check
    @returns {Number} index or -1
  */
  indexBefore: function(index) {

    if (index===0) return -1; // fast path
    index--; // start with previous index

    var content = this._content,
        max     = this.get('max'),
        start   = this.rangeStartForIndex(index);
    if (!content) return null;

    // loop backwards until we find a range that is in the set.
    while((start===max) || (content[start]<0)) {
      if (start === 0) return -1 ; // nothing before; just quit
      index = start -1 ;
      start = this.rangeStartForIndex(index);
    }

    return index;
  },

  /**
    Returns the first index in the set after the passed index or null if
    there are no additional indexes in the set.

    @param {Number} index index to check
    @returns {Number} index or -1
  */
  indexAfter: function(index) {
    var content = this._content,
        max     = this.get('max'),
        start, next ;
    if (!content || (index>=max)) return -1; // fast path
    index++; // start with next index


    // loop forwards until we find a range that is in the set.
    start = this.rangeStartForIndex(index);
    next  = content[start];
    while(next<0) {
      if (next === 0) return -1 ; //nothing after; just quit
      index = start = Math.abs(next);
      next  = content[start];
    }

    return index;
  },

  /**
    Returns YES if the index set contains the named index

    @param {Number} start index or range
    @param {Number} length optional range length
    @returns {Boolean}
  */
  contains: function(start, length) {
    var content, cur, next, rstart, rnext;

    // normalize input
    if (length === undefined) {
      if (start === null || start === undefined) return NO ;

      if (typeof start === SC.T_NUMBER) {
        length = 1 ;

      // if passed an index set, check each receiver range
      } else if (start && start.isIndexSet) {
        if (start === this) return YES ; // optimization

        content = start._content ;
        cur = 0 ;
        next = content[cur];
        while (next !== 0) {
          if ((next>0) && !this.contains(cur, next-cur)) return NO ;
          cur = Math.abs(next);
          next = content[cur];
        }
        return YES ;

      } else {
        length = start.length;
        start = start.start;
      }
    }

    rstart = this.rangeStartForIndex(start);
    rnext  = this._content[rstart];

    return (rnext>0) && (rstart <= start) && (rnext >= (start+length));
  },

  /**
    Returns YES if the index set contains any of the passed indexes.  You
    can pass a single index, a range or an index set.

    @param {Number} start index, range, or IndexSet
    @param {Number} length optional range length
    @returns {Boolean}
  */
  intersects: function(start, length) {
    var content, cur, next, lim;

    // normalize input
    if (length === undefined) {
      if (typeof start === SC.T_NUMBER) {
        length = 1 ;

      // if passed an index set, check each receiver range
      } else if (start && start.isIndexSet) {
        if (start === this) return YES ; // optimization

        content = start._content ;
        cur = 0 ;
        next = content[cur];
        while (next !== 0) {
          if ((next>0) && this.intersects(cur, next-cur)) return YES ;
          cur = Math.abs(next);
          next = content[cur];
        }
        return NO ;

      } else {
        length = start.length;
        start = start.start;
      }
    }

    cur     = this.rangeStartForIndex(start);
    content = this._content;
    next    = content[cur];
    lim     = start + length;
    while (cur < lim) {
      if (next === 0) return NO; // no match and at end!
      if ((next > 0) && (next > start)) return YES ; // found a match
      cur = Math.abs(next);
      next = content[cur];
    }
    return NO ; // no match
  },

  /**
    Returns a new IndexSet without the passed range or indexes.   This is a
    convenience over simply cloning and removing.  Does some optimizations.

    @param {Number} start index, range, or IndexSet
    @param {Number} length optional range length
    @returns {SC.IndexSet} new index set
  */
  without: function(start, length) {
    if (start === this) return SC.IndexSet.create(); // just need empty set
    return this.clone().remove(start, length);
  },

  /**
    Replace the index set's current content with the passed index set.  This
    is faster than clearing the index set adding the values again.

    @param {Number} start index, Range, or another IndexSet
    @param {Number} length optional length of range.
    @returns {SC.IndexSet} receiver
  */
  replace: function(start, length) {

    if (length === undefined) {
      if (typeof start === SC.T_NUMBER) {
        length = 1 ;
      } else if (start && start.isIndexSet) {
        this._content = this._sc_sliceContent(start._content);
        this.beginPropertyChanges()
          .set('max', start.max)
          .set('length', start.length)
          .set('source', start.source)
          .enumerableContentDidChange()
        .endPropertyChanges();
        return this ;

      } else {
        length = start.length;
        start  = start.start;
      }
    }

    var oldlen = this.length;
    this._content.length=1;
    this._content[0] = 0;
    this.length = this.max = 0 ; // reset without notifying since add()
    return this.add(start, length);
  },

  /**
    Adds the specified range of indexes to the set.  You can also pass another
    IndexSet to union the contents of the index set with the receiver.

    @param {Number} start index, Range, or another IndexSet
    @param {Number} length optional length of range.
    @returns {SC.IndexSet} receiver
  */
  add: function(start, length) {

    if (this.isFrozen) throw SC.FROZEN_ERROR;

    var content, cur, next;

    // normalize IndexSet input
    if (start && start.isIndexSet) {

      content = start._content;

      if (!content) return this; // nothing to do

      cur = 0 ;
      next = content[0];
      while(next !== 0) {
        if (next>0) this.add(cur, next-cur);
        cur = next<0 ? 0-next : next;
        next = content[cur];
      }
      return this ;

    } else if (length === undefined) {

      if (start === null || start === undefined) {
        return this; // nothing to do
      } else if (typeof start === SC.T_NUMBER) {
        length = 1 ;
      } else {
        length = start.length;
        start = start.start;
      }
    } else if (length === null) length = 1 ;

    // if no length - do nothing.
    if (length <= 0) return this;

    // special case - appending to end of set
    var max     = this.get('max'),
        oldmax  = max,
        delta, value ;

    content = this._content ;

    if (start === max) {

      // if adding to the end and the end is in set, merge.
      if (start > 0) {
        cur = this.rangeStartForIndex(start-1);
        next = content[cur];

        // just extend range at end
        if (next > 0) {
          delete content[max]; // no 0
          content[cur] = max = start + length ;
          start = cur ;

        // previous range was not in set, just tack onto the end
        } else {
          content[max] = max = start + length;
        }
      } else {
        content[start] = max = length;
      }

      content[max] = 0 ;
      this.set('max', max);
      this.set('length', this.length + length) ;
      length = max - start ;

    } else if (start > max) {
      content[max] = 0-start; // empty!
      content[start] = start+length ;
      content[start+length] = 0; // set end
      this.set('max', start + length) ;
      this.set('length', this.length + length) ;

      // affected range goes from starting range to end of content.
      length = start + length - max ;
      start = max ;

    // otherwise, merge into existing range
    } else {

      // find nearest starting range.  split or join that range
      cur   = this.rangeStartForIndex(start);
      next  = content[cur];
      max   = start + length ;
      delta = 0 ;

      // we are right on a boundary and we had a range or were the end, then
      // go back one more.
      if ((start>0) && (cur === start) && (next <= 0)) {
        cur = this.rangeStartForIndex(start-1);
        next = content[cur] ;
      }

      // previous range is not in set.  splice it here
      if (next < 0) {
        content[cur] = 0-start ;

        // if previous range extends beyond this range, splice afterwards also
        if (Math.abs(next) > max) {
          content[start] = 0-max;
          content[max] = next ;
        } else content[start] = next;

      // previous range is in set.  merge the ranges
      } else {
        start = cur ;
        if (next > max) {
          // delta -= next - max ;
          max = next ;
        }
      }

      // at this point there should be clean starting point for the range.
      // just walk the ranges, adding up the length delta and then removing
      // the range until we find a range that passes last
      cur = start;
      while (cur < max) {
        // get next boundary.  splice if needed - if value is 0, we are at end
        // just skip to last
        value = content[cur];
        if (value === 0) {
          content[max] = 0;
          next = max ;
          delta += max - cur ;
        } else {
          next  = Math.abs(value);
          if (next > max) {
            content[max] = value ;
            next = max ;
          }

          // ok, cur range is entirely inside top range.
          // add to delta if needed
          if (value < 0) delta += next - cur ;
        }

        delete content[cur] ; // and remove range
        cur = next;
      }

      // cur should always === last now.  if the following range is in set,
      // merge in also - don't adjust delta because these aren't new indexes
      if ((cur = content[max]) > 0) {
        delete content[max];
        max = cur ;
      }

      // finally set my own range.
      content[start] = max ;
      if (max > oldmax) this.set('max', max) ;

      // adjust length
      this.set('length', this.get('length') + delta);

      // compute hint range
      length = max - start ;
    }

    this._hint(start, length);
    if (delta !== 0) this.enumerableContentDidChange();
    return this;
  },

  /**
    Removes the specified range of indexes from the set

    @param {Number} start index, Range, or IndexSet
    @param {Number} length optional length of range.
    @returns {SC.IndexSet} receiver
  */
  remove: function(start, length) {

    if (this.isFrozen) throw SC.FROZEN_ERROR;

    // normalize input
    if (length === undefined) {
      if (start === null || start === undefined) {
        return this; // nothing to do

      } else if (typeof start === SC.T_NUMBER) {
        length = 1 ;

      // if passed an index set, just add each range in the index set.
      } else if (start.isIndexSet) {
        start.forEachRange(this.remove, this);
        return this;

      } else {
        length = start.length;
        start = start.start;
      }
    }

    if (length <= 0) return this; // nothing to do

    // special case - appending to end of set
    var max     = this.get('max'),
        oldmax  = max,
        content = this._content,
        cur, next, delta, value, last ;

    // if we're past the end, do nothing.
    if (start >= max) return this;

    // find nearest starting range.  split or join that range
    cur   = this.rangeStartForIndex(start);
    next  = content[cur];
    last  = start + length ;
    delta = 0 ;

    // we are right on a boundary and we had a range or were the end, then
    // go back one more.
    if ((start>0) && (cur === start) && (next > 0)) {
      cur = this.rangeStartForIndex(start-1);
      next = content[cur] ;
    }

    // previous range is in set.  splice it here
    if (next > 0) {
      content[cur] = start ;

      // if previous range extends beyond this range, splice afterwards also
      if (next > last) {
        content[start] = last;
        content[last] = next ;
      } else content[start] = next;

    // previous range is not in set.  merge the ranges
    } else {
      start = cur ;
      next  = Math.abs(next);
      if (next > last) {
        last = next ;
      }
    }

    // at this point there should be clean starting point for the range.
    // just walk the ranges, adding up the length delta and then removing
    // the range until we find a range that passes last
    cur = start;
    while (cur < last) {
      // get next boundary.  splice if needed - if value is 0, we are at end
      // just skip to last
      value = content[cur];
      if (value === 0) {
        content[last] = 0;
        next = last ;

      } else {
        next  = Math.abs(value);
        if (next > last) {
          content[last] = value ;
          next = last ;
        }

        // ok, cur range is entirely inside top range.
        // add to delta if needed
        if (value > 0) delta += next - cur ;
      }

      delete content[cur] ; // and remove range
      cur = next;
    }

    // cur should always === last now.  if the following range is not in set,
    // merge in also - don't adjust delta because these aren't new indexes
    if ((cur = content[last]) < 0) {
      delete content[last];
      last = Math.abs(cur) ;
    }

    // set my own range - if the next item is 0, then clear it.
    if (content[last] === 0) {
      delete content[last];
      content[start] = 0 ;
      this.set('max', start); //max has changed

    } else {
      content[start] = 0-last ;
    }

    // adjust length
    this.set('length', this.get('length') - delta);

    // compute hint range
    length = last - start ;

    this._hint(start, length);
    if (delta !== 0) this.enumerableContentDidChange();
    return this;
  },

  /** @private
    iterates through a named range, setting hints every HINT_SIZE indexes
    pointing to the nearest range start.  The passed range must start on a
    range boundary.  It can end anywhere.
  */
  _hint: function(start, length, content) {
    if (content === undefined) content = this._content;

    var skip    = SC.IndexSet.HINT_SIZE,
        next    = Math.abs(content[start]), // start of next range
        loc     = start - (start % skip) + skip, // next hint loc
        lim     = start + length ; // stop

    while (loc < lim) {
      // make sure we are in current rnage
      while ((next !== 0) && (next <= loc)) {
        start = next ;
        next  = Math.abs(content[start]) ;
      }

      // past end
      if (next === 0) {
        delete content[loc];

      // do not change if on actual boundary
      } else if (loc !== start) {
        content[loc] = start ;  // set hint
      }

      loc += skip;
    }
  },

  /**
    Clears the set
  */
  clear: function() {
    if (this.isFrozen) throw SC.FROZEN_ERROR;

    var oldlen = this.length;
    this._content.length=1;
    this._content[0] = 0;
    this.set('length', 0).set('max', 0);
    if (oldlen > 0) this.enumerableContentDidChange();
  },

  /**
    Add all the ranges in the passed array.
  */
  addEach: function(objects) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;

    this.beginPropertyChanges();
    var idx = objects.get('length') ;
    if (objects.isSCArray) {
      while(--idx >= 0) this.add(objects.objectAt(idx)) ;
    } else if (objects.isEnumerable) {
      objects.forEach(function(idx) { this.add(idx); }, this);
    }
    this.endPropertyChanges();

    return this ;
  },

  /**
    Removes all the ranges in the passed array.
  */
  removeEach: function(objects) {
    if (this.isFrozen) throw SC.FROZEN_ERROR;

    this.beginPropertyChanges();

    var idx = objects.get('length') ;
    if (objects.isSCArray) {
      while(--idx >= 0) this.remove(objects.objectAt(idx)) ;
    } else if (objects.isEnumerable) {
      objects.forEach(function(idx) { this.remove(idx); }, this);
    }

    this.endPropertyChanges();

    return this ;
  },

  /**
   Clones the set into a new set.
  */
  clone: function() {
    return SC.IndexSet.create(this);
  },

  /**
    Returns a string describing the internal range structure.  Useful for
    debugging.

    @returns {String}
  */
  inspect: function() {
    var content = this._content,
        len     = content.length,
        idx     = 0,
        ret     = [],
        item;

    for(idx=0;idx<len;idx++) {
      item = content[idx];
      if (item !== undefined) ret.push("%@:%@".fmt(idx,item));
    }
    return "SC.IndexSet<%@>".fmt(ret.join(' , '));
  },

  /**
    Invoke the callback, passing each occuppied range instead of each
    index.  This can be a more efficient way to iterate in some cases.  The
    callback should have the signature:

    {{{
      callback(start, length, indexSet, source) { ... }
    }}}

    If you pass a target as a second option, the callback will be called in
    the target context.

    @param {Function} callback the iterator callback
    @param {Object} target the target
    @returns {SC.IndexSet} receiver
  */
  forEachRange: function(callback, target) {
    var content = this._content,
        cur     = 0,
        next    = content[cur],
        source  = this.source;

    if (target === undefined) target = null ;
    while (next !== 0) {
      if (next > 0) callback.call(target, cur, next - cur, this, source);
      cur  = Math.abs(next);
      next = content[cur];
    }

    return this ;
  },

  /**
    Invokes the callback for each index within the passed start/length range.
    Otherwise works just like regular forEach().

    @param {Number} start starting index
    @param {Number} length length of range
    @param {Function} callback
    @param {Object} target
    @returns {SC.IndexSet} receiver
  */
  forEachIn: function(start, length, callback, target) {
    var content = this._content,
        cur     = 0,
        idx     = 0,
        lim     = start + length,
        source  = this.source,
        next    = content[cur];

    if (target === undefined) target = null ;
    while (next !== 0) {
      if (cur < start) cur = start ; // skip forward
      while((cur < next) && (cur < lim)) {
        callback.call(target, cur++, idx++, this, source);
      }

      if (cur >= lim) {
        cur = next = 0 ;
      } else {
        cur  = Math.abs(next);
        next = content[cur];
      }
    }
    return this ;
  },

  /**
    Total number of indexes within the specified range.

    @param {Number|SC.IndexSet} start index, range object or IndexSet
    @param {Number} length optional range length
    @returns {Number} count of indexes
  */
  lengthIn: function(start, length) {

    var ret = 0 ;

    // normalize input
    if (length === undefined) {
      if (start === null || start === undefined) {
        return 0; // nothing to do

      } else if (typeof start === SC.T_NUMBER) {
        length = 1 ;

      // if passed an index set, just add each range in the index set.
      } else if (start.isIndexSet) {
        start.forEachRange(function(start, length) {
          ret += this.lengthIn(start, length);
        }, this);
        return ret;

      } else {
        length = start.length;
        start = start.start;
      }
    }

    // fast path
    if (this.get('length') === 0) return 0;

    var content = this._content,
        cur     = 0,
        next    = content[cur],
        lim     = start + length ;

    while (cur<lim && next !== 0) {
      if (next>0) {
        ret += (next>lim) ? lim-cur : next-cur;
      }
      cur  = Math.abs(next);
      next = content[cur];
    }

    return ret ;
  },

  // ..........................................................
  // OBJECT API
  //

  /**
    Optionally set the source property on an index set and then you can
    iterate over the actual object values referenced by the index set.  See
    indexOf(), lastIndexOf(), forEachObject(), addObject() and removeObject().
  */
  source: null,

  /**
    Returns the first index in the set that matches the passed object.  You
    must have a source property on the set for this to work.

    @param {Object} object the object to check
    @param {Number} startAt optional starting point
    @returns {Number} found index or -1 if not in set
  */
  indexOf: function(object, startAt) {
    var source  = this.source;
    if (!source) throw "%@.indexOf() requires source".fmt(this);

    var len     = source.get('length'),

        // start with the first index in the set
        content = this._content,
        cur     = content[0]<0 ? Math.abs(content[0]) : 0,
        idx ;

    while(cur>=0 && cur<len) {
      idx = source.indexOf(object, cur);
      if (idx<0) return -1 ; // not found in source
      if (this.contains(idx)) return idx; // found in source and in set.
      cur = idx+1;
    }

    return -1; // not found
  },

  /**
    Returns the last index in the set that matches the passed object.  You
    must have a source property on the set for this to work.

    @param {Object} object the object to check
    @param {Number} startAt optional starting point
    @returns {Number} found index or -1 if not in set
  */
  lastIndexOf: function(object, startAt) {
    var source  = this.source;
    if (!source) throw "%@.lastIndexOf() requires source".fmt(this);

    // start with the last index in the set
    var len     = source.get('length'),
        cur     = this.max-1,
        idx ;

    if (cur >= len) cur = len-1;
    while (cur>=0) {
      idx = source.lastIndexOf(object, cur);
      if (idx<0) return -1 ; // not found in source
      if (this.contains(idx)) return idx; // found in source and in set.
      cur = idx+1;
    }

    return -1; // not found
  },

  /**
    Iterates through the objects at each index location in the set.  You must
    have a source property on the set for this to work.  The callback you pass
    will be invoked for each object in the set with the following signature:

    {{{
      function callback(object, index, source, indexSet) { ... }
    }}}

    If you pass a target, it will be used when the callback is called.

    @param {Function} callback function to invoke.
    @param {Object} target optional content. otherwise uses window
    @returns {SC.IndexSet} receiver
  */
  forEachObject: function(callback, target) {
    var source  = this.source;
    if (!source) throw "%@.forEachObject() requires source".fmt(this);

    var content = this._content,
        cur     = 0,
        idx     = 0,
        next    = content[cur];

    if (target === undefined) target = null ;
    while (next !== 0) {

      while(cur < next) {
        callback.call(target, source.objectAt(cur), cur, source, this);
        cur++;
      }

      cur  = Math.abs(next);
      next = content[cur];
    }
    return this ;
  },

  /**
    Adds all indexes where the object appears to the set.  If firstOnly is
    passed, then it will find only the first index and add it.  If  you know
    the object only appears in the source array one time, firstOnly may make
    this method faster.

    Requires source to work.

    @param {Object} object the object to add
    @returns {SC.IndexSet} receiver
  */
  addObject: function(object, firstOnly) {
    var source  = this.source;
    if (!source) throw "%@.addObject() requires source".fmt(this);

    var len = source.get('length'),
        cur = 0, idx;

    while(cur>=0 && cur<len) {
      idx = source.indexOf(object, cur);
      if (idx >= 0) {
        this.add(idx);
        if (firstOnly) return this ;
        cur = idx++;
      } else return this ;
    }
    return this ;
  },

  /**
    Adds any indexes matching the passed objects.  If firstOnly is passed,
    then only finds the first index for each object.

    @param {SC.Enumerable} objects the objects to add
    @returns {SC.IndexSet} receiver
  */
  addObjects: function(objects, firstOnly) {
    objects.forEach(function(object) {
      this.addObject(object, firstOnly);
    }, this);
    return this;
  },

  /**
    Removes all indexes where the object appears to the set.  If firstOnly is
    passed, then it will find only the first index and add it.  If  you know
    the object only appears in the source array one time, firstOnly may make
    this method faster.

    Requires source to work.

    @param {Object} object the object to add
    @returns {SC.IndexSet} receiver
  */
  removeObject: function(object, firstOnly) {
    var source  = this.source;
    if (!source) throw "%@.removeObject() requires source".fmt(this);

    var len = source.get('length'),
        cur = 0, idx;

    while(cur>=0 && cur<len) {
      idx = source.indexOf(object, cur);
      if (idx >= 0) {
        this.remove(idx);
        if (firstOnly) return this ;
        cur = idx+1;
      } else return this ;
    }
    return this ;
  },

  /**
    Removes any indexes matching the passed objects.  If firstOnly is passed,
    then only finds the first index for each object.

    @param {SC.Enumerable} objects the objects to add
    @returns {SC.IndexSet} receiver
  */
  removeObjects: function(objects, firstOnly) {
    objects.forEach(function(object) {
      this.removeObject(object, firstOnly);
    }, this);
    return this;
  },


  // .......................................
  // PRIVATE
  //

  /**
    Usually observing notifications from IndexSet are not useful, so
    supress them by default.

    @property {Boolean}
  */
  LOG_OBSERVING: NO,

  /** @private - optimized call to forEach() */
  forEach: function(callback, target) {
    var content = this._content,
        cur     = 0,
        idx     = 0,
        source  = this.source,
        next    = content[cur];

    if (target === undefined) target = null ;
    while (next !== 0) {
      while(cur < next) {
        callback.call(target, cur++, idx++, this, source);
      }
      cur  = Math.abs(next);
      next = content[cur];
    }
    return this ;
  },

  /** @private - support iterators */
  nextObject: function(ignore, idx, context) {
    var content = this._content,
        next    = context.next,
        max     = this.get('max'); // next boundary

    // seed.
    if (idx === null) {
      idx = next = 0 ;

    } else if (idx >= max) {
      delete context.next; // cleanup context
      return null ; // nothing left to do

    } else idx++; // look on next index

    // look for next non-empty range if needed.
    if (idx === next) {
      do {
        idx = Math.abs(next);
        next = content[idx];
      } while(next < 0);
      context.next = next;
    }

    return idx;
  },

  toString: function() {
    var str = [];
    this.forEachRange(function(start, length) {
      str.push(length === 1 ? start : "%@..%@".fmt(start, start + length - 1));
    }, this);
    return "SC.IndexSet<%@>".fmt(str.join(',')) ;
  },

  max: 0

}) ;

SC.IndexSet.slice = SC.IndexSet.copy = SC.IndexSet.clone ;
SC.IndexSet.EMPTY = SC.IndexSet.create().freeze();

/* >>>>>>>>>> BEGIN source/system/logger.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


// ..........................................................
// CONSTANTS
//

// Implementation note:  We use two spaces after four-letter prefixes and one
// after five-letter prefixes so things align in monospaced consoles.

/**
  If {@link SC.Logger.format} is true, this delimiter will be put between arguments.

  @property {String}
*/
SC.LOGGER_LOG_DELIMITER = ", ";

/**
  If {@link SC.Logger.error} falls back onto {@link SC.Logger.log}, this will be
  prepended to the output.

  @property {String}
*/
SC.LOGGER_LOG_ERROR = "ERROR: ";

/**
  If {@link SC.Logger.info} falls back onto {@link SC.Logger.log}, this will be
  prepended to the output.

  @property {String}
*/
SC.LOGGER_LOG_INFO = "INFO:  ";

/**
  If {@link SC.Logger.warn} falls back onto {@link SC.Logger.log}, this will be
  prepended to the output.

  @property {String}
*/
SC.LOGGER_LOG_WARN = "WARN:  ";

/**
  If {@link SC.Logger.debug} falls back onto {@link SC.Logger.log}, this will be
  prepended to the output.

  @property {String}
*/
SC.LOGGER_LOG_DEBUG = "DEBUG: ";

/**
  If {@link SC.Logger.group} falls back onto {@link SC.Logger.log}, this will
  be prepended to the output.

  @property {String}
*/
SC.LOGGER_LOG_GROUP_HEADER = "** %@";       // The variable is the group title

/**
  If the reporter does not support group(), then we’ll add our own indentation
  to our output.  This constant represents one level of indentation.

  @property {String}
*/
SC.LOGGER_LOG_GROUP_INDENTATION = "    ";

/**
  When reporting recorded log messages, the timestamp is included with this
  prefix.

  @property {String}
*/
SC.LOGGER_RECORDED_LOG_TIMESTAMP_PREFIX = "%@:  ";


SC.LOGGER_LEVEL_DEBUG = 'debug';
SC.LOGGER_LEVEL_INFO  = 'info';
SC.LOGGER_LEVEL_WARN  = 'warn';
SC.LOGGER_LEVEL_ERROR = 'error';
SC.LOGGER_LEVEL_NONE  = 'none';



/** @class

  Object to allow for safe logging actions, such as using the browser console.
  In addition to being output to the console, logs can be optionally recorded
  in memory, to be accessed by your application as appropriate.

  This class also adds in the concept of a “current log level”, which allows
  your application to potentially determine a subset of logging messages to
  output and/or record.  The order of levels is:

      *  debug        SC.LOGGER_LEVEL_DEBUG
      *  info         SC.LOGGER_LEVEL_INFO
      *  warn         SC.LOGGER_LEVEL_WARN
      *  error        SC.LOGGER_LEVEL_ERROR

  All messages at the level or “above” will be output/recorded.  So, for
  example, if you set the level to 'info', all 'info', 'warn', and 'error'
  messages will be output/recorded, but no 'debug' messages will be.  Also,
  there are two separate log levels:  one for output, and one for recording.
  You may wish to only output, say, 'warn' and above, but record everything
  from 'debug' on up.  (You can also limit the number log messages to record.)

  This mechanism allows your application to avoid needless output (which has a
  non-zero cost in many browsers) in the general case, but turning up the log
  level when necessary for debugging.  Note that there can still be a
  performance cost for preparing log messages (calling {@link String.fmt},
  etc.), so it’s still a good idea to be selective about what log messages are
  output even to 'debug', especially in hot code.

  Similarly, you should be aware that if you wish to log objects without
  stringification — using the {@link SC.Logger.debugWithoutFmt} variants — and
  you enable recording, the “recorded messages” array will hold onto a
  reference to the arguments, potentially increasing the amount of memory
  used.

  As a convenience, this class also adds some shorthand methods to SC:

    *  SC.debug()   ==>   SC.Logger.debug()
    *  SC.info()    ==>   SC.Logger.info()
    *  SC.warn()    ==>   SC.Logger.warn()
    *  SC.error()   ==>   SC.Logger.error()

  …although note that no shorthand versions exist for the less-common
  functions, such as defining groups.

  The FireFox plugin Firebug was used as a function reference. Please see
  {@link <a href="http://getfirebug.com/logging.html">Firebug Logging Reference</a>}
  for further information.

  @author Colin Campbell
  @author Benedikt Böhm
  @author William Kakes
  @extends SC.Object
  @since SproutCore 1.0
  @see <a href="http://getfirebug.com/logging.html">Firebug Logging Reference</a>
*/
SC.Logger = SC.Object.create({

  // ..........................................................
  // PROPERTIES
  //

  /**
    The current log level determining what is output to the reporter object
    (usually your browser’s console).  Valid values are:

      *  SC.LOGGER_LEVEL_DEBUG
      *  SC.LOGGER_LEVEL_INFO
      *  SC.LOGGER_LEVEL_WARN
      *  SC.LOGGER_LEVEL_ERROR
      *  SC.LOGGER_LEVEL_NONE

    If you do not specify this value, it will default to SC.LOGGER_LEVEL_DEBUG
    when running in development mode and SC.LOGGER_LEVEL_INFO when running in
    production mode.

    @property: {Constant}
  */
  logOutputLevel: null,        // If null, set appropriately during init()


  /**
    The current log level determining what is output to the reporter object
    (usually your browser’s console).  Valid values are the same as with
    'logOutputLevel':

      *  SC.LOGGER_LEVEL_DEBUG
      *  SC.LOGGER_LEVEL_INFO
      *  SC.LOGGER_LEVEL_WARN
      *  SC.LOGGER_LEVEL_ERROR
      *  SC.LOGGER_LEVEL_NONE

    If you do not specify this value, it will default to SC.LOGGER_LEVEL_NONE.

    @property: {Constant}
  */
  logRecordingLevel: SC.LOGGER_LEVEL_NONE,


  /**
    All recorded log messages.  You generally should not need to interact with
    this array, as most commonly-used functionality can be achieved via the
    {@link SC.Logger.outputRecordedLogMessages} and
    {@link SC.Logger.stringifyRecordedLogMessages} methods.

    This array will be lazily created when the first message is recorded.

    Format:

    For efficiency, each entry in the array is a simple hash rather than a
    full SC.Object instance.  Furthermore, to minimize memory usage, niceties
    like “type of entry: message” are avoided; if you need to parse this
    structure, you can determine which type of entry you’re looking at by
    checking for the 'message' and 'indentation' fields.

    Log entry:
    {
      type:               {Constant}     (SC.LOGGER_LEVEL_DEBUG, etc.)
      message:            {String | Boolean}
      originalArguments:  {Arguments}    // optional
      timestamp:          {Date}
    }

    Group entry (either beginning or end of):
    {
      type:         {Constant}     SC.LOGGER_LEVEL_DEBUG, etc.
      indentation:  {Number}       The value is the new group indentation level
      beginGroup:   {Boolean}      Whether this entry is the beginning of a new group (as opposed to the end)
      title:        {String}       Optional for new groups, and never present for end-of-group
      timestamp:    {Date}
    }

    @property {Array}
  */
  recordedLogMessages: null,


  /**
    If the recording level is set such that messages will be recorded, this is
    the maximum number of messages that will be saved in the
    'recordedLogMessages' array.  Any further recorded messages will push
    older messages out of the array, so the most recent messages will be
    saved.

    @property {Number}
  */
  recordedLogMessagesMaximumLength: 500,


  /**
    If the recording level is set such that messages will be recorded, this is
    the minimum number of messages that will be saved whenever the recordings
    are pruned.  (They are pruned whenever you hit the maximum length, as
    specified via the 'recordedLogMessagesMaximumLength' property.  This
    mechanism avoids thrashing the array for each log message once the
    maximum is reached.)  When pruning, the most recent messages will be saved.

    @property {Number}
  */
  recordedLogMessagesPruningMinimumLength: 100,


  /**
    Whether or not to enable debug logging.  This property exists for
    backwards compatibility with previous versions of SC.Logger.  In newer
    code, you should instead set the appropriate output/recording log levels.

    If this property is set to YES, it will set 'logOutputLevel' to
    SC.LOGGER_LEVEL_DEBUG.  Otherwise, it will have no effect.

    @deprecated
    @property: {Boolean}
  */
  debugEnabled: NO,


  /**
    Computed property that checks for the existence of the reporter object.

    @property {Boolean}
  */
  exists: function() {
    return !SC.none(this.get('reporter'));
  }.property('reporter').cacheable(),


  /**
    If console.log does not exist, SC.Logger will use window.alert instead
    when {@link SC.Logger.log} is invoked.

    Note that this property has no effect for messages initiated via the
    debug/info/warn/error methods, on the assumption that it is better to
    simply utilize the message recording mechanism than put up a bunch of
    alerts when there is no browser console.

    @property {Boolean}
  */
  fallBackOnAlert: NO,


  /**
    The reporter is the object which implements the actual logging functions.

    @default The browser’s console
    @property {Object}
  */
  reporter: console,




  // ..........................................................
  // METHODS
  //

  /**
    Logs a debug message to the console and potentially to the recorded
    array, provided the respective log levels are set appropriately.

    The first argument must be a string, and if there are any additional
    arguments, it is assumed to be a format string.  Thus, you can (and
    should) use it like:

      SC.Logger.debug("%@:  My debug message", this);       // good

    …and not:

      SC.Logger.debug("%@:  My debug message".fmt(this));        // bad

    The former method can be more efficient because if the log levels are set
    in such a way that the debug() invocation will be ignored, then the
    String.fmt() call will never actually be performed.

    @param {String}              A message or a format string
    @param {…}       (optional)  Other arguments to pass to String.fmt() when using a format string
  */
  debug: function(message, optionalFormatArgs) {
    // Implementation note:  To avoid having to put the SC.debug() shorthand
    // variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleMessage(SC.LOGGER_LEVEL_DEBUG, YES, message, arguments);
  },


  /**
    Logs a debug message to the console and potentially to the recorded
    array, provided the respective log levels are set appropriately.

    Unlike simply debug(), this method does not try to apply String.fmt() to
    the arguments, and instead passes them directly to the reporter (and
    stringifies them if recording).  This can be useful if the browser formats
    a type in a manner more useful to you than you can achieve with
    String.fmt().

    @param {String|Array|Function|Object}
  */
  debugWithoutFmt: function() {
    this._handleMessage(SC.LOGGER_LEVEL_DEBUG, NO, null, arguments);
  },


  /**
    Begins a new group in the console and/or in the recorded array provided
    the respective log levels are set to ouput/record 'debug' messages.
    Every message after this call (at any log level) will be indented for
    readability until a matching {@link SC.Logger.debugGroupEnd} is invoked,
    and you can create as many levels as you want.

    Assuming you are using 'debug' messages elsewhere, it is preferable to
    group them using this method over simply {@link SC.Logger.group} — the log
    levels could be set such that the 'debug' messages are never seen, and you
    wouldn’t want an empty/needless group!

    You can optionally provide a title for the group.  If there are any
    additional arguments, the first argument is assumed to be a format string.
    Thus, you can (and should) use it like:

      SC.Logger.debugGroup("%@:  My debug group", this);       // good

    …and not:

      SC.Logger.debugGroup("%@:  My debug group".fmt(this));   // bad

    The former method can be more efficient because if the log levels are set
    in such a way that the debug() invocation will be ignored, then the
    String.fmt() call will never actually be performed.

    @param {String}  (optional)  A title or format string to display above the group
    @param {…}       (optional)  Other arguments to pass to String.fmt() when using a format string as the title
  */
  debugGroup: function(message, optionalFormatArgs) {
    // Implementation note:  To avoid having to put the SC.debugGroup()
    // shorthand variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleGroup(SC.LOGGER_LEVEL_DEBUG, message, arguments);
  },


  /**
    Ends a group initiated with {@link SC.Logger.debugGroup}, provided the
    respective output/recording log levels are set appropriately.

    @see SC.Logger.debugGroup
  */
  debugGroupEnd: function() {
    // Implementation note:  To avoid having to put the SC.debugGroupEnd()
    // shorthand variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleGroupEnd(SC.LOGGER_LEVEL_DEBUG);
  },



  /**
    Logs an informational message to the console and potentially to the
    recorded array, provided the respective log levels are set appropriately.

    The first argument must be a string, and if there are any additional
    arguments, it is assumed to be a format string.  Thus, you can (and
    should) use it like:

      SC.Logger.info("%@:  My info message", this);       // good

    …and not:

      SC.Logger.info("%@:  My info message".fmt(this));   // bad

    The former method can be more efficient because if the log levels are set
    in such a way that the info() invocation will be ignored, then the
    String.fmt() call will never actually be performed.

    @param {String}              A message or a format string
    @param {…}       (optional)  Other arguments to pass to String.fmt() when using a format string
  */
  info: function(message, optionalFormatArgs) {
    // Implementation note:  To avoid having to put the SC.info() shorthand
    // variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleMessage(SC.LOGGER_LEVEL_INFO, YES, message, arguments);
  },


  /**
    Logs an information message to the console and potentially to the recorded
    array, provided the respective log levels are set appropriately.

    Unlike simply info(), this method does not try to apply String.fmt() to
    the arguments, and instead passes them directly to the reporter (and
    stringifies them if recording).  This can be useful if the browser formats
    a type in a manner more useful to you than you can achieve with
    String.fmt().

    @param {String|Array|Function|Object}
  */
  infoWithoutFmt: function() {
    this._handleMessage(SC.LOGGER_LEVEL_INFO, NO, null, arguments);
  },


  /**
    Begins a new group in the console and/or in the recorded array provided
    the respective log levels are set to ouput/record 'info' messages.
    Every message after this call (at any log level) will be indented for
    readability until a matching {@link SC.Logger.infoGroupEnd} is invoked,
    and you can create as many levels as you want.

    Assuming you are using 'info' messages elsewhere, it is preferable to
    group them using this method over simply {@link SC.Logger.group} — the log
    levels could be set such that the 'info' messages are never seen, and you
    wouldn’t want an empty/needless group!

    You can optionally provide a title for the group.  If there are any
    additional arguments, the first argument is assumed to be a format string.
    Thus, you can (and should) use it like:

      SC.Logger.infoGroup("%@:  My info group", this);       // good

    …and not:

      SC.Logger.infoGroup("%@:  My info group".fmt(this));   // bad

    The former method can be more efficient because if the log levels are set
    in such a way that the info() invocation will be ignored, then the
    String.fmt() call will never actually be performed.

    @param {String}  (optional)  A title or format string to display above the group
    @param {…}       (optional)  Other arguments to pass to String.fmt() when using a format string as the title
  */
  infoGroup: function(message, optionalFormatArgs) {
    // Implementation note:  To avoid having to put the SC.infoGroup()
    // shorthand variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleGroup(SC.LOGGER_LEVEL_INFO, message, arguments);
  },


  /**
    Ends a group initiated with {@link SC.Logger.infoGroup}, provided the
    respective output/recording log levels are set appropriately.

    @see SC.Logger.infoGroup
  */
  infoGroupEnd: function() {
    // Implementation note:  To avoid having to put the SC.infoGroupEnd()
    // shorthand variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleGroupEnd(SC.LOGGER_LEVEL_INFO);
  },



  /**
    Logs a warning message to the console and potentially to the recorded
    array, provided the respective log levels are set appropriately.

    The first argument must be a string, and if there are any additional
    arguments, it is assumed to be a format string.  Thus, you can (and
    should) use it like:

      SC.Logger.warn("%@:  My warning message", this);       // good

    …and not:

      SC.Logger.warn("%@:  My warning message".fmt(this));   // bad

    The former method can be more efficient because if the log levels are set
    in such a way that the warn() invocation will be ignored, then the
    String.fmt() call will never actually be performed.

    @param {String}              A message or a format string
    @param {…}       (optional)  Other arguments to pass to String.fmt() when using a format string
  */
  warn: function(message, optionalFormatArgs) {
    // Implementation note:  To avoid having to put the SC.warn() shorthand
    // variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleMessage(SC.LOGGER_LEVEL_WARN, YES, message, arguments);

  },


  /**
    Logs a warning message to the console and potentially to the recorded
    array, provided the respective log levels are set appropriately.

    Unlike simply warn(), this method does not try to apply String.fmt() to
    the arguments, and instead passes them directly to the reporter (and
    stringifies them if recording).  This can be useful if the browser formats
    a type in a manner more useful to you than you can achieve with
    String.fmt().

    @param {String|Array|Function|Object}
  */
  warnWithoutFmt: function() {
    this._handleMessage(SC.LOGGER_LEVEL_WARN, NO, null, arguments);
  },


  /**
    Begins a new group in the console and/or in the recorded array provided
    the respective log levels are set to ouput/record 'warn' messages.
    Every message after this call (at any log level) will be indented for
    readability until a matching {@link SC.Logger.warnGroupEnd} is invoked,
    and you can create as many levels as you want.

    Assuming you are using 'warn' messages elsewhere, it is preferable to
    group them using this method over simply {@link SC.Logger.group} — the log
    levels could be set such that the 'warn' messages are never seen, and you
    wouldn’t want an empty/needless group!

    You can optionally provide a title for the group.  If there are any
    additional arguments, the first argument is assumed to be a format string.
    Thus, you can (and should) use it like:

      SC.Logger.warnGroup("%@:  My warn group", this);       // good

    …and not:

      SC.Logger.warnGroup("%@:  My warn group".fmt(this));   // bad

    The former method can be more efficient because if the log levels are set
    in such a way that the warn() invocation will be ignored, then the
    String.fmt() call will never actually be performed.

    @param {String}  (optional)  A title or format string to display above the group
    @param {…}       (optional)  Other arguments to pass to String.fmt() when using a format string as the title
  */
  warnGroup: function(message, optionalFormatArgs) {
    // Implementation note:  To avoid having to put the SC.warnGroup()
    // shorthand variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleGroup(SC.LOGGER_LEVEL_WARN, message, arguments);
  },


  /**
    Ends a group initiated with {@link SC.Logger.warnGroup}, provided the
    respective output/recording log levels are set appropriately.

    @see SC.Logger.warnGroup
  */
  warnGroupEnd: function() {
    // Implementation note:  To avoid having to put the SC.warnGroupEnd()
    // shorthand variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleGroupEnd(SC.LOGGER_LEVEL_WARN);
  },


  /**
    Logs an error message to the console and potentially to the recorded
    array, provided the respective log levels are set appropriately.

    The first argument must be a string, and if there are any additional
    arguments, it is assumed to be a format string.  Thus, you can (and
    should) use it like:

      SC.Logger.error("%@:  My error message", this);       // good

    …and not:

      SC.Logger.warn("%@:  My error message".fmt(this));    // bad

    The former method can be more efficient because if the log levels are set
    in such a way that the warn() invocation will be ignored, then the
    String.fmt() call will never actually be performed.

    @param {String}              A message or a format string
    @param {…}       (optional)  Other arguments to pass to String.fmt() when using a format string
  */
  error: function(message, optionalFormatArgs) {
    // Implementation note:  To avoid having to put the SC.error() shorthand
    // variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleMessage(SC.LOGGER_LEVEL_ERROR, YES, message, arguments);
  },


  /**
    Logs an error message to the console and potentially to the recorded
    array, provided the respective log levels are set appropriately.

    Unlike simply error(), this method does not try to apply String.fmt() to
    the arguments, and instead passes them directly to the reporter (and
    stringifies them if recording).  This can be useful if the browser formats
    a type in a manner more useful to you than you can achieve with
    String.fmt().

    @param {String|Array|Function|Object}
  */
  errorWithoutFmt: function() {
    this._handleMessage(SC.LOGGER_LEVEL_ERROR, NO, null, arguments);
  },


  /**
    Begins a new group in the console and/or in the recorded array provided
    the respective log levels are set to ouput/record 'error' messages.
    Every message after this call (at any log level) will be indented for
    readability until a matching {@link SC.Logger.errorGroupEnd} is invoked,
    and you can create as many levels as you want.

    Assuming you are using 'error' messages elsewhere, it is preferable to
    group them using this method over simply {@link SC.Logger.group} — the log
    levels could be set such that the 'error' messages are never seen, and you
    wouldn’t want an empty/needless group!

    You can optionally provide a title for the group.  If there are any
    additional arguments, the first argument is assumed to be a format string.
    Thus, you can (and should) use it like:

      SC.Logger.errorGroup("%@:  My error group", this);       // good

    …and not:

      SC.Logger.errorGroup("%@:  My error group".fmt(this));   // bad

    The former method can be more efficient because if the log levels are set
    in such a way that the error() invocation will be ignored, then the
    String.fmt() call will never actually be performed.

    @param {String}  (optional)  A title or format string to display above the group
    @param {…}       (optional)  Other arguments to pass to String.fmt() when using a format string as the title
  */
  errorGroup: function(message, optionalFormatArgs) {
    // Implementation note:  To avoid having to put the SC.errorGroup()
    // shorthand variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleGroup(SC.LOGGER_LEVEL_ERROR, message, arguments);
  },


  /**
    Ends a group initiated with {@link SC.Logger.errorGroup}, provided the
    respective output/recording log levels are set appropriately.

    @see SC.Logger.errorGroup
  */
  errorGroupEnd: function() {
    // Implementation note:  To avoid having to put the SC.errorGroupEnd()
    // shorthand variant inside a function wrapper, we'll avoid 'this'.
    SC.Logger._handleGroupEnd(SC.LOGGER_LEVEL_ERROR);
  },



  /**
    This method will output all recorded log messages to the reporter.  This
    provides a convenient way to see the messages “on-demand” without having
    to have them always output.  The timestamp of each message will be
    included as a prefix if you specify 'includeTimestamps' as YES, although
    in some browsers the native group indenting can make the timestamp
    formatting less than ideal.

    @param {Boolean}  (optional)  Whether to include timestamps in the output
  */
  outputRecordedLogMessages: function(includeTimestamps) {
    // If we have no reporter, there's nothing we can do.
    if (!this.get('exists')) return;

    var reporter        = this.get('reporter'),
        entries         = this.get('recordedLogMessages'),
        indentation     = 0,
        timestampFormat = SC.LOGGER_RECORDED_LOG_TIMESTAMP_PREFIX,
        i, iLen, entry, type, timestampStr, message, originalArguments,
        output, title, newIndentation, disparity, j, jLen;

    if (entries) {
      for (i = 0, iLen = entries.length;  i < iLen;  ++i) {
        entry        = entries[i];
        type         = entry.type;

        if (includeTimestamps) {
          timestampStr = timestampFormat.fmt(entry.timestamp.utcFormat());
        }

        // Is this a message or a group directive?
        message = entry.message;
        if (message) {
          // It's a message entry.  Were the original arguments stored?  If
          // so, we need to use those instead of the message.
          originalArguments = entry.originalArguments;
          this._outputMessage(type, timestampStr, indentation, message, originalArguments);
        }
        else {
          // It's a group directive.  Update our indentation appropriately.
          newIndentation = entry.indentation;
          title          = entry.title;
          disparity      = newIndentation - indentation;

          // If the reporter implements group() and the indentation level
          // changes by more than 1, that implies that some earlier “begin
          // group” / “end group” directives were pruned from the beginning of
          // the buffer and we need to insert empty groups to compensate.
          if (reporter.group) {
            if (Math.abs(disparity) > 1) {
              for (j = 0, jLen = (disparity - 1);  j < jLen;  ++j) {
                if (disparity > 0) {
                  reporter.group();
                }
                else {
                  reporter.groupEnd();
                }
              }
            }

            if (disparity > 0) {
              output = timestampStr ? timestampStr : "";
              output += title;
              reporter.group(output);
            }
            else {
              reporter.groupEnd();
            }
          }
          else {
            // The reporter doesn't implement group()?  Then simulate it using
            // log(), assuming it implements that.
            if (disparity > 0) {
              // We're beginning a group.  Output the header at an indentation
              // that is one smaller.
              this._outputGroup(type, timestampStr, newIndentation - 1, title);
            }
            // else {}  (There is no need to simulate a group ending.)
          }

          // Update our indentation.
          indentation = newIndentation;
        }
      }
    }
  },


  /**
    This method will return a string representation of all recorded log
    messages to the reporter, which can be convenient for saving logs and so
    forth.  The timestamp of each message will be included in the string.

    If there are no recorded log messages, an empty string will be returned
    (as opposed to null).

    @returns {String}
  */
  stringifyRecordedLogMessages: function() {
    var ret           = "",
        entries       = this.get('recordedLogMessages'),
        indentation   = 0,
        timestampFormat = SC.LOGGER_RECORDED_LOG_TIMESTAMP_PREFIX,
        prefixMapping = this._LOG_FALLBACK_PREFIX_MAPPING,
        groupHeader   = SC.LOGGER_LOG_GROUP_HEADER,
        i, iLen, entry, type, message, originalArguments, prefix, line,
        title, newIndentation, disparity;

    if (entries) {
      for (i = 0, iLen = entries.length;  i < iLen;  ++i) {
        entry = entries[i];
        type  = entry.type;

        // First determine the prefix.
        prefix = timestampFormat.fmt(entry.timestamp.utcFormat());
        prefix += prefixMapping[type] || "";

        // Is this a message or a group directive?
        message = entry.message;
        if (message) {
          // It's a message entry.  Were arguments used, or did we format a
          // message?  If arguments were used, we need to stringfy those
          // instead of using the message.
          originalArguments = entry.originalArguments;
          line =  prefix + this._indentation(indentation);
          line += originalArguments ? this._argumentsToString(originalArguments) : message;
        }
        else {
          // It's a group directive, so we need to update our indentation
          // appropriately.  Also, if it's the beginning of the group and it
          // has a title, then we need to include an appropriate header.
          newIndentation = entry.indentation;
          title          = entry.title;
          disparity      = newIndentation - indentation;
          if (disparity > 0) {
            // We're beginning a group.  Output the header at an indentation
            // that is one smaller.
            line = prefix + this._indentation(indentation) + groupHeader.fmt(title);
          }

          // Update our indentation.
          indentation = newIndentation;
        }

        // Add the line to our string.
        ret += line + "\n";
      }
    }
    return ret;
  },



  /**
    Log output to the console, but only if it exists.

    IMPORTANT:  Unlike debug(), info(), warn(), and error(), messages sent to
    this method do not consult the log level and will always be output.
    Similarly, they will never be recorded.

    In general, you should avoid this method and instead choose the
    appropriate categorization for your message, choosing the appropriate
    method.

    @param {String|Array|Function|Object}
    @returns {Boolean} Whether or not anything was logged
  */
  log: function() {
    var reporter = this.get('reporter'),
        ret      = NO;

    // Log through the reporter.
    if (this.get('exists')) {
      if (typeof reporter.log === "function") {
        reporter.log.apply(reporter, arguments);
        ret = YES;
      }
      else if (reporter.log) {
        // IE8 implements console.log but reports the type of console.log as
        // "object", so we cannot use apply().  Because of this, the best we
        // can do is call it directly with an array of our arguments.
        reporter.log(this._argumentsToArray(arguments));
        ret = YES;
      }
    }

    // log through alert
    if (!ret  &&  this.get('fallBackOnAlert')) {
      // include support for overriding the alert through the reporter
      // if it has come this far, it's likely this will fail
      if (this.get('exists')  &&  (typeof reporter.alert === "function")) {
        reporter.alert(arguments);
        ret = YES;
      }
      else {
        alert(arguments);
        ret = YES;
      }
    }
    return ret;
  },


  /**
    Every log after this call until {@link SC.Logger.groupEnd} is called
    will be indented for readability.  You can create as many levels
    as you want.

    IMPORTANT:  Unlike debugGroup(), infoGroup(), warnGroup(), and
    errorGroup(), this method do not consult the log level and will always
    result in output when the reporter supports it.  Similarly, group messages
    logged via this method will never be recorded.

    @param {String}  (optional)  An optional title to display above the group
  */
  group: function(title) {
    var reporter = this.get('reporter');

    if (this.get('exists')  &&  (typeof reporter.group === "function")) {
      reporter.group(title);
    }
  },

  /**
    Ends a group declared with {@link SC.Logger.group}.

    @see SC.Logger.group
  */
  groupEnd: function() {
    var reporter = this.get('reporter');

    if (this.get('exists')  &&  (typeof reporter.groupEnd === "function")) {
      reporter.groupEnd();
    }
  },



  /**
    Outputs the properties of an object.

    Logs the object using {@link SC.Logger.log} if the reporter.dir function
    does not exist.

    @param {Object}
  */
  dir: function() {
    var reporter = this.get('reporter');

    if (this.get('exists')  &&  (typeof reporter.dir === "function")) {
      // Firebug's console.dir doesn't support multiple objects here
      // but maybe custom reporters will
      reporter.dir.apply(reporter, arguments);
    }
    else {
      this.log.apply(this, arguments);
    }
  },


  /**
    Prints an XML outline for any HTML or XML object.

    Logs the object using {@link SC.Logger.log} if reporter.dirxml function
    does not exist.

    @param {Object}
  */
  dirxml: function() {
    var reporter = this.get('reporter');

    if (this.get('exists')  &&  (typeof reporter.dirxml === "function")) {
      // Firebug's console.dirxml doesn't support multiple objects here
      // but maybe custom reporters will
      reporter.dirxml.apply(reporter, arguments);
    }
    else {
      this.log.apply(this, arguments);
    }
  },



  /**
    Begins the JavaScript profiler, if it exists. Call {@link SC.Logger.profileEnd}
    to end the profiling process and receive a report.

    @param {String}     (optional)  A title to associate with the profile
    @returns {Boolean} YES if reporter.profile exists, NO otherwise
  */
  profile: function(title) {
    var reporter = this.get('reporter');

    if (this.get('exists')  &&  (typeof reporter.profile === "function")) {
      reporter.profile(title);
      return YES;
    }
    return NO;
  },

  /**
    Ends the JavaScript profiler, if it exists.  If you specify a title, the
    profile with that title will be ended.

    @param {String}     (optional)  A title to associate with the profile
    @returns {Boolean} YES if reporter.profileEnd exists, NO otherwise
    @see SC.Logger.profile
  */
  profileEnd: function(title) {
    var reporter = this.get('reporter');

    if (this.get('exists')  &&  (typeof reporter.profileEnd === "function")) {
      reporter.profileEnd(title);
      return YES;
    }
    return NO;
  },


  /**
    Measure the time between when this function is called and
    {@link SC.Logger.timeEnd} is called.

    @param {String}     The name of the profile to begin
    @returns {Boolean} YES if reporter.time exists, NO otherwise
    @see SC.Logger.timeEnd
  */
  time: function(name) {
    var reporter = this.get('reporter');

    if (this.get('exists')  &&  (typeof reporter.time === "function")) {
      reporter.time(name);
      return YES;
    }
    return NO;
  },

  /**
    Ends the profile specified.

    @param {String}     The name of the profile to end
    @returns {Boolean}  YES if reporter.timeEnd exists, NO otherwise
    @see SC.Logger.time
  */
  timeEnd: function(name) {
    var reporter = this.get('reporter');

    if (this.get('exists')  &&  (typeof reporter.timeEnd === "function")) {
      reporter.timeEnd(name);
      return YES;
    }
    return NO;
  },


  /**
    Prints a stack-trace.

    @returns {Boolean} YES if reporter.trace exists, NO otherwise
  */
  trace: function() {
    var reporter = this.get('reporter');

    if (this.get('exists')  &&  (typeof reporter.trace === "function")) {
      reporter.trace();
      return YES;
    }
    return NO;
  },




  // ..........................................................
  // INTERNAL SUPPORT
  //

  init: function() {
    arguments.callee.base.apply(this,arguments);

    // Set a reasonable default value if none has been set.
    if (!this.get('logOutputLevel')) {
      if (SC.buildMode === "debug") {
        this.set('logOutputLevel', SC.LOGGER_LEVEL_DEBUG);
      }
      else {
        this.set('logOutputLevel', SC.LOGGER_LEVEL_INFO);
      }
    }
  
    this.debugEnabledDidChange();
  },


  /** @private
    For backwards compatibility with the older 'debugEnabled' property, set
    our log output level to SC.LOGGER_LEVEL_DEBUG if 'debugEnabled' is set to
    YES.
  */
  debugEnabledDidChange: function() {
    if (this.get('debugEnabled')) {
      this.set('logOutputLevel', SC.LOGGER_LEVEL_DEBUG);
    }
  }.observes('debugEnabled'),



  /** @private
    Outputs and/or records the specified message of the specified type if the
    respective current log levels allow for it.  Assuming
    'automaticallyFormat' is specified, then String.fmt() will be called
    automatically on the message, but only if at least one of the log levels
    is such that the result will be used.

    @param {String}               type                 Expected to be SC.LOGGER_LEVEL_DEBUG, etc.
    @param {Boolean}              automaticallyFormat  Whether or not to treat 'message' as a format string if there are additional arguments
    @param {String}               message              Expected to a string format (for String.fmt()) if there are other arguments
    @param {String}   (optional)  originalArguments    All arguments passed into debug(), etc. (which includes 'message'; for efficiency, we don’t copy it)
  */
  _handleMessage: function(type, automaticallyFormat, message, originalArguments) {
    // Are we configured to show this type?
    var shouldOutput = this._shouldOutputType(type),
        shouldRecord = this._shouldRecordType(type),
        hasOtherArguments, i, len, args, output, entry;

    // If we're neither going to output nor record the message, then stop now.
    if (!(shouldOutput || shouldRecord)) return;

    // Do we have arguments other than 'message'?  (Remember that
    // 'originalArguments' contains the message here, too, hence the > 1.)
    hasOtherArguments = (originalArguments  &&  originalArguments.length > 1);

    // If we're automatically formatting and there is no message (or it is
    // not a string), then don't automatically format after all.
    if (automaticallyFormat  &&  (SC.none(message)  ||  (typeof message !== "string"))) {
      automaticallyFormat = NO;
    }

    // If we should automatically format, and the client specified other
    // arguments in addition to the message, then we'll call .fmt() assuming
    // that the message is a format string.
    if (automaticallyFormat) {
      if (hasOtherArguments) {
        args = [];
        for (i = 1, len = originalArguments.length;  i < len;  ++i) {
          args.push(originalArguments[i]);
        }
        message = message.fmt.apply(message, args);
      }
    }

    if (shouldOutput) {
      // We only want to pass the original arguments to _outputMessage() if we
      // didn't format the message ourselves.
      args = automaticallyFormat ? null : originalArguments;
      this._outputMessage(type, null, this._outputIndentationLevel, message, args);
    }

    // If we're recording the log, append the message now.
    if (shouldRecord) {
      entry = {
        type:      type,
        message:   message ? message : YES,
        timestamp: new Date()
      };

      // If we didn't automatically format, and we have other arguments, then
      // be sure to record them, too.
      if (!automaticallyFormat  &&  hasOtherArguments) {
        entry.originalArguments = originalArguments;
      }

      this._addRecordedMessageEntry(entry);
    }
  },


  /** @private
    Outputs and/or records a group with the (optional) specified title
    assuming the respective current log levels allow for it.  This will output
    the title (if there is one) and indent all further messages (of any type)
    until _handleGroupEnd() is invoked.

    If additional arguments beyond a title are passed in, then String.fmt()
    will be called automatically on the title, but only if at least one of the
    log levels is such that the result will be used.

    @param {String}              type                 Expected to be SC.LOGGER_LEVEL_DEBUG, etc.
    @param {String}  (optional)  title                Expected to a string format (for String.fmt()) if there are other arguments
    @param {String}  (optional)  originalArguments    All arguments passed into debug(), etc. (which includes 'title'; for efficiency, we don’t copy it)
  */
  _handleGroup: function(type, title, originalArguments) {
    // Are we configured to show this type?
    var shouldOutput = this._shouldOutputType(type),
        shouldRecord = this._shouldRecordType(type),
        hasOtherArguments, i, len, args, arg, reporter, func, header, output,
        indentation, entry;

    // If we're neither going to output nor record the group, then stop now.
    if (!(shouldOutput || shouldRecord)) return;

    // Do we have arguments other than 'title'?  (Remember that
    // 'originalArguments' contains the title here, too, hence the > 1.)
    hasOtherArguments = (originalArguments  &&  originalArguments.length > 1);

    // If the client specified a title as well other arguments, then we'll
    // call .fmt() assuming that the title is a format string.
    if (title  &&  hasOtherArguments) {
      args = [];
      for (i = 1, len = originalArguments.length;  i < len;  ++i) {
        args.push(originalArguments[i]);
      }
      title = title.fmt.apply(title, args);
    }

    if (shouldOutput) {
      this._outputGroup(type, null, this._outputIndentationLevel, title);

      // Increase our indentation level to accommodate the group.
      this._outputIndentationLevel++;
    }

    // If we're recording the group, append the entry now.
    if (shouldRecord) {
      // Increase our indentation level to accommodate the group.
      indentation = ++this._recordingIndentationLevel;

      entry = {
        type:         type,
        indentation:  indentation,
        beginGroup:   YES,
        title:        title,
        timestamp:    new Date()
      };

      this._addRecordedMessageEntry(entry);
    }
  },


  /** @private
    Outputs and/or records a “group end” assuming the respective current log
    levels allow for it.  This will remove one level of indentation from all
    further messages (of any type).

    @param {String}              type                 Expected to be SC.LOGGER_LEVEL_DEBUG, etc.
  */
  _handleGroupEnd: function(type) {
    // Are we configured to show this type?
    var shouldOutput = this._shouldOutputType(type),
        shouldRecord = this._shouldRecordType(type),
        reporter, func, indentation, entry;

    // If we're neither going to output nor record the "group end", then stop
    // now.
    if (!(shouldOutput || shouldRecord)) return;

    if (shouldOutput) {
      // Decrease our indentation level to accommodate the group.
      this._outputIndentationLevel--;
      
      if (this.get('exists')) {
        // Do we have reporter.groupEnd defined as a function?  If not, we
        // simply won't output anything.
        reporter = this.get('reporter');
        func     = reporter.groupEnd;
        if (func) {
          func.call(reporter);
        }
      }
    }

    // If we're recording the “group end”, append the entry now.
    if (shouldRecord) {
      // Decrease our indentation level to accommodate the group.
      indentation = --this._recordingIndentationLevel;

      entry = {
        type:         type,
        indentation:  indentation,
        timestamp:    new Date()
      };

      this._addRecordedMessageEntry(entry);
    }
  },


  /** @private
    Returns whether a message of the specified type ('debug', etc.) should be
    output to the reporter based on the current value of 'logOutputLevel'.

    @param {Constant}  type
    @returns {Boolean}
  */
  _shouldOutputType: function(type) {
    var logLevelMapping = this._LOG_LEVEL_MAPPING,
        level           = logLevelMapping[type]                        ||  0,
        currentLevel    = logLevelMapping[this.get('logOutputLevel')]  ||  0;

    return (level <= currentLevel);
  },


  /** @private
    Returns whether a message of the specified type ('debug', etc.) should be
    recorded based on the current value of 'logRecordingLevel'.

    @param {Constant}  type
    @returns {Boolean}
  */
  _shouldRecordType: function(type) {
    // This is the same code as in _shouldOutputType(), but inlined to
    // avoid yet another function call.
    var logLevelMapping = this._LOG_LEVEL_MAPPING,
        level           = logLevelMapping[type]                           ||  0,
        currentLevel  = logLevelMapping[this.get('logRecordingLevel')]  ||  0;

    return (level <= currentLevel);
  },


  /** @private
    Outputs the specified message to the current reporter.  If the reporter
    does not handle the specified type of message, it will fall back to using
    log() if possible.

    @param {Constant}               type
    @param {String}                 timestampStr       An optional timestamp prefix for the line, or null for none
    @param {Number}                 indentation        The current indentation level
    @param {String}                 message
    @param {Arguments}  (optional)  originalArguments  If specified, the assumption is that the message was not automatically formatted
  */
  _outputMessage: function(type, timestampStr, indentation, message, originalArguments) {
    if (!this.get('exists')) return;

    // Do we have reporter[type] defined as a function?  If not, we'll fall
    // back to reporter.log if that exists.
    var reporter = this.get('reporter'),
        output, shouldIndent, func, prefix, args, arg;

    // If the reporter doesn't support group(), then we need to manually
    // include indentation for the group.  (It it does, we'll assume that
    // we're currently at the correct group level.)
    shouldIndent = !reporter.group;

    // Note:  Normally we wouldn't do the hash dereference twice, but
    //        storing the result like this:
    //
    //          var nativeFunction = console[type];
    //          nativeFunction(output);
    //
    //        …doesn't work in Safari 4, and:
    //
    //          nativeFunction.call(console, output);
    //
    //        …doesn't work in IE8 because the console.* methods are
    //       reported as being objects.
    func = reporter[type];
    if (func) {
      // If we formatted, just include the message.  Otherwise, include all
      // the original arguments.
      if (!originalArguments) {
        output = "";
        if (timestampStr) output = timestampStr;
        if (shouldIndent) output =+ this._indentation(indentation);
        output += message;
        reporter[type](output);
      }
      else {
        // We have arguments?  Then pass them along to the reporter function
        // so that it can format them appropriately.  We'll use the timestamp
        // string (if there is one) and the indentation as the first
        // arguments.
        args = this._argumentsToArray(originalArguments);
        prefix = "";
        if (timestampStr) prefix = timestampStr;
        if (shouldIndent) prefix += this._indentation(indentation);
        if (prefix) args.splice(0, 0, prefix);
        
        if (func.apply) {
          func.apply(reporter, args);
        }
        else {
          // In IE8, passing the arguments as an array isn't ideal, but it's
          // pretty much all we can do because we can't call apply().
          reporter[type](args);            
        }
      }
    }
    else {
      // The reporter doesn't support the requested function?  If it at least
      // support log(), fall back to that.
      if (reporter.log) {
        prefix = "";
        if (timestampStr) prefix = timestampStr;
        prefix += this._LOG_FALLBACK_PREFIX_MAPPING[type] || "";
        if (shouldIndent) prefix += this._indentation(indentation);

        // If we formatted, just include the message.  Otherwise, include
        // all the original arguments.
        if (!originalArguments) {
          reporter.log(prefix + message);
        }
        else {
          args = this._argumentsToArray(originalArguments);
          if (prefix) args.splice(0, 0, prefix);
          reporter.log(args);
        }
      }
    }
  },


  /** @private
    Outputs the specified “begin group” directive to the current reporter.  If
    the reporter does not handle the group() method, it will fall back to
    simulating using log() if possible.

    @param {Constant}               type
    @param {String}                 timestampStr  An optional timestamp prefix for the line, or null for none
    @param {Number}                 indentation   The current indentation level, not including what the group will set it to
    @param {String}     (optional)  title
  */
  _outputGroup: function(type, timestampStr, indentation, title) {
    if (!this.get('exists')) return;

    // Do we have reporter.group defined as a function?  If not, we'll fall
    // back to reporter.log if that exists.  (Thankfully, we can avoid the IE8
    // special-casing we have in _outputMessage() because IE8 doesn't support
    // console.group(), anyway.)
    var reporter = this.get('reporter'),
        func     = reporter.group,
        output;

    if (func) {
      output = timestampStr ? timestampStr : "";
      output += title;
      func.call(reporter, output);
    }
    else if (reporter.log) {
      // The reporter doesn't support group()?  Then simulate with log().
      // (We'll live with the duplicitous dereference rather than using
      // apply() to work around the IE8 issue described in _outputMessage().)
      output = "";
      if (timestampStr) output = timestampStr;
      output += this._LOG_FALLBACK_PREFIX_MAPPING[type] || "";
      output += this._indentation(indentation);
      output += SC.LOGGER_LOG_GROUP_HEADER.fmt(title);
      reporter.log(output);
    }
  },


  /** @private
    This method will add the specified entry to the recorded log messages
    array and also prune array as necessary according to the current values of
    'recordedLogMessagesMaximumLength' and
    'recordedLogMessagesPruningMinimumLength'.
  */
  _addRecordedMessageEntry: function(entry) {
    var recordedMessages = this.get('recordedLogMessages'),
        len;

    // Lazily create the array.
    if (!recordedMessages) {
      recordedMessages = [];
      this.set('recordedLogMessages', recordedMessages);
    }

    recordedMessages.push(entry);

    // Have we exceeded the maximum size?  If so, do some pruning.
    len = recordedMessages.length;
    if (len > this.get('recordedLogMessagesMaximumLength')) {
      recordedMessages.splice(0, (len - this.get('recordedLogMessagesPruningMinimumLength')));
    }
    
    // Notify that the array content changed.
    recordedMessages.enumerableContentDidChange();
  },



  /** @private
    The arguments function property doesn't support Array#unshift. This helper
    copies the elements of arguments to a blank array.

    @param {Array} arguments The arguments property of a function
    @returns {Array} An array containing the elements of arguments parameter
  */
  _argumentsToArray: function(args) {
    var ret = [],
        i, len;

    if (args) {
      for (i = 0, len = args.length;  i < len;  ++i) {
        ret[i] = args[i];
      }
    }
    return ret;
  },


  /** @private
    Formats the arguments array of a function by creating a string with
    SC.LOGGER_LOG_DELIMITER between the elements.
  */
  _argumentsToString: function() {
    var ret       = "",
        delimeter = SC.LOGGER_LOG_DELIMITER,
        i, len;

    for (i = 0, len = (arguments.length - 1);  i < len;  ++i) {
      ret += arguments[i] + delimeter;
    }
    ret += arguments[len];
    return ret;
  },


  /** @private
    Returns a string containing the appropriate indentation for the specified
    indentation level.

    @param {Number}  The indentation level
    @returns {String}
  */
  _indentation: function(level) {
    if (!level  ||  level < 0) {
      level = 0;
    }

    var ret    = "",
        indent = SC.LOGGER_LOG_GROUP_INDENTATION,
        i;

    for (i = 0;  i < level;  ++i) {
      ret += indent;
    }
    return ret;
  },



  /** @private
    The current “for output” indentation level.  The reporter (browser
    console) is expected to keep track of this for us for output, but we need
    to do our own bookkeeping if the browser doesn’t support console.group.
    This is incremented by _debugGroup() and friends, and decremented by
    _debugGroupEnd() and friends.
  */
  _outputIndentationLevel: 0,


  /** @private
    The current “for recording” indentation level.  This can be different than
    the “for output” indentation level if the respective log levels are set
    differently.  This is incremented by _debugGroup() and friends, and
    decremented by _debugGroupEnd() and friends.
  */
  _recordingIndentationLevel: 0,


  /** @private
    A mapping of the log level constants (SC.LOGGER_LEVEL_DEBUG, etc.) to
    their priority.  This makes it easy to determine which levels are “higher”
    than the current level.

    Implementation note:  We’re hardcoding the values of the constants defined
    earlier here for a tiny bit of efficiency (we can create the hash all at
    once rather than having to push in keys).
  */
  _LOG_LEVEL_MAPPING: { debug: 4, info: 3, warn: 2, error: 1, none: 0 },


  /** @private
    If the current reporter does not support a particular type of log message
    (for example, some older browsers’ consoles support console.log but not
    console.debug), we’ll use the specified prefixes.

    Implementation note:  We’re hardcoding the values of the constants defined
    earlier here for a tiny bit of efficiency (we can create the hash all at
    once rather than having to push in keys).
  */
  _LOG_FALLBACK_PREFIX_MAPPING: {
    debug:  SC.LOGGER_LOG_DEBUG,
    info:   SC.LOGGER_LOG_INFO,
    warn:   SC.LOGGER_LOG_WARN,
    error:  SC.LOGGER_LOG_ERROR
  }

});


// Add convenient shorthands methods to SC.
SC.debug = SC.Logger.debug;
SC.info  = SC.Logger.info;
SC.warn  = SC.Logger.warn;
SC.error = SC.Logger.error;

/* >>>>>>>>>> BEGIN source/system/run_loop.js */
// ==========================================================================
// Project:   SproutCore Costello - Property Observing Library
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('private/observer_set');

/**
  @class

  The run loop provides a universal system for coordinating events within
  your application.  The run loop processes timers as well as pending
  observer notifications within your application.

  To use a RunLoop within your application, you should make sure your event
  handlers always begin and end with SC.RunLoop.begin() and SC.RunLoop.end()

  The RunLoop is important because bindings do not fire until the end of
  your run loop is reached.  This improves the performance of your
  application.

  h2. Example

  This is how you could write your mouseup handler in jQuery:

  {{{
    $('#okButton').on('click', function() {
      SC.RunLoop.begin();

      // handle click event...

      SC.RunLoop.end(); // allows bindings to trigger...
    });
  }}}

  @extends SC.Object
  @since SproutCore 1.0
*/
SC.RunLoop = SC.Object.extend(/** @scope SC.RunLoop.prototype */ {

  /**
    Call this method whenver you begin executing code.

    This is typically invoked automatically for you from event handlers and
    the timeout handler.  If you call setTimeout() or setInterval() yourself,
    you may need to invoke this yourself.

    @returns {SC.RunLoop} receiver
  */
  beginRunLoop: function() {
    this._start = new Date().getTime() ; // can't use Date.now() in runtime
    if (SC.LOG_BINDINGS || SC.LOG_OBSERVERS) {
      SC.Logger.log("-- SC.RunLoop.beginRunLoop at %@".fmt(this._start));
    }
    this._runLoopInProgress = YES;
    return this ;
  },

  /**
    YES when a run loop is in progress

    @property {Boolean}
  */
  isRunLoopInProgress: function() {
    return this._runLoopInProgress;
  }.property(),

  /**
    Call this method whenever you are done executing code.

    This is typically invoked automatically for you from event handlers and
    the timeout handler.  If you call setTimeout() or setInterval() yourself
    you may need to invoke this yourself.

    @returns {SC.RunLoop} receiver
  */
  endRunLoop: function() {
    // at the end of a runloop, flush all the delayed actions we may have
    // stored up.  Note that if any of these queues actually run, we will
    // step through all of them again.  This way any changes get flushed
    // out completely.

    if (SC.LOG_BINDINGS || SC.LOG_OBSERVERS) {
      SC.Logger.log("-- SC.RunLoop.endRunLoop ~ flushing application queues");
    } 
    
    this.flushAllPending();
    
    this._start = null ;

    if (SC.LOG_BINDINGS || SC.LOG_OBSERVERS) {
      SC.Logger.log("-- SC.RunLoop.endRunLoop ~ End");
    }

    SC.RunLoop.lastRunLoopEnd = Date.now();
    this._runLoopInProgress = NO;

    return this ;
  },

  /**
    Repeatedly flushes all bindings, observers, and other queued functions until all queues are empty.
  */
  flushAllPending: function() {
    var didChange ;
    
    do {
      didChange = this.flushApplicationQueues() ;
      if (!didChange) didChange = this._flushinvokeLastQueue() ; 
    } while(didChange) ;
  },
  
  
  /**
    Invokes the passed target/method pair once at the end of the runloop.
    You can call this method as many times as you like and the method will
    only be invoked once.

    Usually you will not call this method directly but use invokeOnce()
    defined on SC.Object.

    Note that in development mode only, the object and method that call this
    method will be recorded, for help in debugging scheduled code.

    @param {Object} target
    @param {Function} method
    @returns {SC.RunLoop} receiver
  */
  invokeOnce: function(target, method) {
    // normalize
    if (method === undefined) {
      method = target; target = this ;
    }

    if (typeof method === "string") method = target[method];
    if (!this._invokeQueue) this._invokeQueue = SC.ObserverSet.create();
    if ( method ) this._invokeQueue.add(target, method);
    return this ;
  },

  /**
    Invokes the passed target/method pair at the very end of the run loop,
    once all other delayed invoke queues have been flushed.  Use this to
    schedule cleanup methods at the end of the run loop once all other work
    (including rendering) has finished.

    If you call this with the same target/method pair multiple times it will
    only invoke the pair only once at the end of the runloop.

    Usually you will not call this method directly but use invokeLast()
    defined on SC.Object.

    Note that in development mode only, the object and method that call this
    method will be recorded, for help in debugging scheduled code.

    @param {Object} target
    @param {Function} method
    @returns {SC.RunLoop} receiver
  */
  invokeLast: function(target, method) {
    // normalize
    if (method === undefined) {
      method = target; target = this ;
    }

    if (typeof method === "string") method = target[method];
    if (!this._invokeLastQueue) this._invokeLastQueue = SC.ObserverSet.create();
    this._invokeLastQueue.add(target, method);
    return this ;
  },

  /**
    Executes any pending events at the end of the run loop.  This method is
    called automatically at the end of a run loop to flush any pending
    queue changes.

    The default method will invoke any one time methods and then sync any
    bindings that might have changed.  You can override this method in a
    subclass if you like to handle additional cleanup.

    This method must return YES if it found any items pending in its queues
    to take action on.  endRunLoop will invoke this method repeatedly until
    the method returns NO.  This way if any if your final executing code
    causes additional queues to trigger, then can be flushed again.

    @returns {Boolean} YES if items were found in any queue, NO otherwise
  */
  flushApplicationQueues: function() {
    var hadContent = NO,
        // execute any methods in the invokeQueue.
        queue = this._invokeQueue;
    if ( queue && queue.getMembers().length ) {
      this._invokeQueue = null; // reset so that a new queue will be created
      hadContent = YES ; // needs to execute again
      queue.invokeMethods();
    }

    // flush any pending changed bindings.  This could actually trigger a
    // lot of code to execute.
    return SC.Binding.flushPendingChanges() || hadContent ;
  },

  _flushinvokeLastQueue: function() {
    var queue = this._invokeLastQueue, hadContent = NO ;
    if (queue && queue.getMembers().length ) {
      this._invokeLastQueue = null; // reset queue.
      hadContent = YES; // has targets!
      if (hadContent) queue.invokeMethods();
    }
    return hadContent ;
  }

});

/**
  The current run loop.  This is created automatically the first time you
  call begin().

  @property {SC.RunLoop}
*/
SC.RunLoop.currentRunLoop = null;

/**
  The default RunLoop class.  If you choose to extend the RunLoop, you can
  set this property to make sure your class is used instead.

  @property {Class}
*/
SC.RunLoop.runLoopClass = SC.RunLoop;

/**
  Begins a new run loop on the currentRunLoop.  If you are already in a
  runloop, this method has no effect.

  @returns {SC.RunLoop} receiver
*/
SC.RunLoop.begin = function() {
  var runLoop = this.currentRunLoop;
  if (!runLoop) runLoop = this.currentRunLoop = this.runLoopClass.create();
  runLoop.beginRunLoop();
  return this ;
};

/**
  Ends the run loop on the currentRunLoop.  This will deliver any final
  pending notifications and schedule any additional necessary cleanup.

  @returns {SC.RunLoop} receiver
*/
SC.RunLoop.end = function() {
  var runLoop = this.currentRunLoop;
  if (!runLoop) {
    throw "SC.RunLoop.end() called outside of a runloop!";
  }
  runLoop.endRunLoop();
  return this ;
} ;

/**
  Returns YES when a run loop is in progress

  @return {Boolean}
*/
SC.RunLoop.isRunLoopInProgress = function() {
  if(this.currentRunLoop) return this.currentRunLoop.get('isRunLoopInProgress');
  return NO;
};

/**
  Executes a passed function in the context of a run loop. If called outside a 
  runloop, starts and ends one. If called inside an existing runloop, is 
  simply executes the function unless you force it to create a nested runloop.
  
  If an exception is thrown during execution, we give an error catcher the
  opportunity to handle it before allowing the exception to bubble again.
  
  @param {Function} callback callback to execute
  @param {Object} target context for callback
  @param {Boolean} if YES, starts/ends a new runloop even if one is already running
*/
SC.run = function(callback, target, forceNested) {
  var alreadyRunning = SC.RunLoop.isRunLoopInProgress();

  // Only use a try/catch block if we have an ExceptionHandler
  // since in some browsers try/catch causes a loss of the backtrace
  if (SC.ExceptionHandler && SC.ExceptionHandler.enabled) {
    try {
      if(forceNested || !alreadyRunning) SC.RunLoop.begin();
      if (callback) callback.call(target);
      if(forceNested || !alreadyRunning) SC.RunLoop.end();
    } catch (e) {
      SC.ExceptionHandler.handleException(e);

      // Now that we've handled the exception, throw it again so the browser
      // can deal with it (and potentially use it for debugging).
      // (We don't throw it in IE because the user will see two errors)
      if (!SC.browser.msie) {
        throw e;
      }
    }
  } else {
    if(forceNested || !alreadyRunning) SC.RunLoop.begin();
    if (callback) callback.call(target);
    if(forceNested || !alreadyRunning) SC.RunLoop.end();
  }
};


/* >>>>>>>>>> BEGIN javascript.js */
/* >>>>>>>>>> BEGIN __sc_chance.js */

/* >>>>>>>>>> BEGIN source/resources/strings.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

SC.stringsFor('English', {
  '_SC.DateTime.dayNames': 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday',
  '_SC.DateTime.abbreviatedDayNames': 'Sun Mon Tue Wed Thu Fri Sat',
  '_SC.DateTime.monthNames': 'January February March April May June July August September October November December',
  '_SC.DateTime.abbreviatedMonthNames': 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'
}) ;


/* >>>>>>>>>> BEGIN source/system/datetime.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  Standard error thrown by SC.Scanner when it runs out of bounds
  
  @property {Error}
*/
SC.SCANNER_OUT_OF_BOUNDS_ERROR = new Error("Out of bounds.");

/**
  Standard error thrown by SC.Scanner when  you pass a value not an integer.
  
  @property {Error}
*/
SC.SCANNER_INT_ERROR = new Error("Not an int.");

/**
  Standard error thrown by SC.SCanner when it cannot find a string to skip.
  
  @property {Error}
*/
SC.SCANNER_SKIP_ERROR = new Error("Did not find the string to skip.");

/** 
  Standard error thrown by SC.Scanner when it can any kind a string in the 
  matching array.
*/
SC.SCANNER_SCAN_ARRAY_ERROR = new Error("Did not find any string of the given array to scan.");

/**
  Standard error thrown when trying to compare two dates in different 
  timezones.
  
  @property {Error}
*/
SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR = new Error("Can't compare the dates of two DateTimes that don't have the same timezone.");

/**
  Standard ISO8601 date format
  
  @property {String}
*/
SC.DATETIME_ISO8601 = '%Y-%m-%dT%H:%M:%S%Z';


/** @class

  A Scanner reads a string and interprets the characters into numbers. You
  assign the scanner's string on initialization and the scanner progresses
  through the characters of that string from beginning to end as you request
  items.
  
  Scanners are used by DateTime to convert strings into DateTime objects.
  
  @extends SC.Object
  @since SproutCore 1.0
  @author Martin Ottenwaelter
*/
SC.Scanner = SC.Object.extend(
/** @scope SC.Scanner.prototype */ {
  
  /**
    The string to scan. You usually pass it to the create method:
    
    {{{
      SC.Scanner.create({string: 'May, 8th'});
    }}}
    
    @property
    @type {String}
  */
  string: null,
  
  /**
    The current scan location. It is incremented by the scanner as the
    characters are processed.
    The default is 0: the beginning of the string.
    
    @property
    @type {integer}
  */
  scanLocation: 0,
  
  /**
    Reads some characters from the string, and increments the scan location
    accordingly. 
    
    @param {integer} len the amount of characters to read
    @throws {SC.SCANNER_OUT_OF_BOUNDS_ERROR} if asked to read too many characters
    @returns {String} the characters
  */
  scan: function(len) {
    if (this.scanLocation + len > this.length) throw SC.SCANNER_OUT_OF_BOUNDS_ERROR;
    var str = this.string.substr(this.scanLocation, len);
    this.scanLocation += len;
    return str;
  },
  
  /**
    Reads some characters from the string and interprets it as an integer.
    
    @param {integer} min_len the minimum amount of characters to read
    @param {integer} max_len optionally the maximum amount of characters to read (defaults to the minimum)
    @throws {SC.SCANNER_INT_ERROR} if asked to read non numeric characters
    @returns {integer} the scanned integer
  */
  scanInt: function(min_len, max_len) {
    if (max_len === undefined) max_len = min_len;
    var str = this.scan(max_len);
    var re = new RegExp("^\\d{" + min_len + "," + max_len + "}");
    var match = str.match(re);
    if (!match) throw SC.SCANNER_INT_ERROR;
    if (match[0].length < max_len) {
      this.scanLocation += match[0].length - max_len;
    }
    return parseInt(match[0], 10);
  },
  
  /**
    Attempts to skip a given string.
    
    @param {String} str the string to skip
    @throws {SC.SCANNER_SKIP_ERROR} if the given string could not be scanned
    @returns {Boolean} YES if the given string was successfully scanned
  */
  skipString: function(str) {
    if (this.scan(str.length) !== str) throw SC.SCANNER_SKIP_ERROR;
    return YES;
  },
  
  /**
    Attempts to scan any string in a given array.
    
    @param {Array} ary the array of strings to scan
    @throws {SC.SCANNER_SCAN_ARRAY_ERROR} if no string of the given array is found
    @returns {integer} the index of the scanned string of the given array
  */
  scanArray: function(ary) {
    for (var i = 0, len = ary.length; i < len; i++) {
      if (this.scan(ary[i].length) === ary[i]) {
        return i;
      }
      this.scanLocation -= ary[i].length;
    }
    throw SC.SCANNER_SCAN_ARRAY_ERROR;
  }
  
});


/** @class

  A class representation of a date and time. It's basically a wrapper around
  the Date javascript object, KVO friendly and with common date/time
  manipulation methods.

  This object differs from the standard JS Date object, however, in that it
  supports time zones other than UTC and that local to the machine on which
  it is running.  Any time zone can be specified when creating an SC.DateTime
  object, e.g

    // Creates a DateTime representing 5am in Washington, DC and 10am in London
    var d = SC.DateTime.create({ hour: 5, timezone: 300 }); // -5 hours from UTC
    var e = SC.DateTime.create({ hour: 10, timezone: 0 }); // same time, specified in UTC
    
    and it is true that d.isEqual(e).

  The time zone specified upon creation is permanent, and any calls to get() on that
  instance will return values expressed in that time zone.  So,
  
    d.get('hour') returns 5.
    e.get('hour') returns 10.
    
    but
    
    d.get('milliseconds') === e.get('milliseconds') is true, since they are technically the same position in time.
  
  @extends SC.Object
  @extends SC.Freezable
  @extends SC.Copyable
  @author Martin Ottenwaelter
  @author Jonathan Lewis
  @author Josh Holt
  @since SproutCore 1.0
*/
SC.DateTime = SC.Object.extend(SC.Freezable, SC.Copyable,
  /** @scope SC.DateTime.prototype */ {
  
  /** @private
    Internal representation of a date: the number of milliseconds
    since January, 1st 1970 00:00:00.0 UTC.
    
    @property
    @type {Integer}
  */
  _ms: 0,
  
  /** @read-only
    The offset, in minutes, between UTC and the object's timezone.
    All calls to get() will use this time zone to translate date/time
    values into the zone specified here.
    
    @property
    @type {Integer}
  */
  timezone: 0,
  
  /**
    A DateTime instance is frozen by default for better performance.
    
    @property
    @type {Boolean}
  */
  isFrozen: YES,
  
  /**
    Returns a new DateTime object where one or more of the elements have been
    changed according to the options parameter. The time options (hour,
    minute, sec, usec) reset cascadingly, so if only the hour is passed, then
    minute, sec, and usec is set to 0. If the hour and minute is passed, then
    sec and usec is set to 0.
    
    (Parts copied from the Ruby On Rails documentation)
    
    If a time zone is passed in the options hash, all dates and times are assumed
    to be local to it, and the returned DateTime instance has that time zone.  If
    none is passed, it defaults to SC.DateTime.timezone.

    Note that passing only a time zone does not affect the actual milliseconds since
    Jan 1, 1970, only the time zone in which it is expressed when displayed.
    
    @see SC.DateTime#create for the list of options you can pass
    @returns {DateTime} copy of receiver
  */
  adjust: function(options, resetCascadingly) {
    var timezone;
    
    options = options ? SC.clone(options) : {};
    timezone = (options.timezone !== undefined) ? options.timezone : (this.timezone !== undefined) ? this.timezone : 0;
    
    return this.constructor._adjust(options, this._ms, timezone, resetCascadingly)._createFromCurrentState();
  },
  
  /**
    Returns a new DateTime object advanced according the the given parameters.
    Don't use floating point values, it might give unpredicatble results.
    
    @see SC.DateTime#create for the list of options you can pass
    @param {Hash} options the amount of date/time to advance the receiver
    @returns {DateTime} copy of the receiver
  */
  advance: function(options) {
    return this.constructor._advance(options, this._ms, this.timezone)._createFromCurrentState();
  },
  
  /**
    Generic getter.
    
    The properties you can get are:
      - 'year'
      - 'month' (January is 1, contrary to JavaScript Dates for which January is 0)
      - 'day'
      - 'dayOfWeek' (Sunday is 0)
      - 'hour'
      - 'minute'
      - 'second'
      - 'millisecond'
      - 'milliseconds', the number of milliseconds since
        January, 1st 1970 00:00:00.0 UTC
      - 'isLeapYear', a boolean value indicating whether the receiver's year
        is a leap year
      - 'daysInMonth', the number of days of the receiver's current month
      - 'dayOfYear', January 1st is 1, December 31th is 365 for a common year
      - 'week' or 'week1', the week number of the current year, starting with
        the first Sunday as the first day of the first week (00..53)
      - 'week0', the week number of the current year, starting with
        the first Monday as the first day of the first week (00..53)
      - 'lastMonday', 'lastTuesday', etc., 'nextMonday', 'nextTuesday', etc.,
        the date of the last or next weekday in comparison to the receiver.
    
    @param {String} key the property name to get
    @return the value asked for
  */
  unknownProperty: function(key) {
    return this.constructor._get(key, this._ms, this.timezone);
  },
  
  /**
    Formats the receiver according to the given format string. Should behave
    like the C strftime function.
  
    The format parameter can contain the following characters:
      - %a - The abbreviated weekday name (``Sun'')
      - %A - The full weekday name (``Sunday'')
      - %b - The abbreviated month name (``Jan'')
      - %B - The full month name (``January'')
      - %c - The preferred local date and time representation
      - %d - Day of the month (01..31)
      - %D - Day of the month (0..31)
      - %h - Hour of the day, 24-hour clock (0..23)
      - %H - Hour of the day, 24-hour clock (00..23)
      - %i - Hour of the day, 12-hour clock (1..12)
      - %I - Hour of the day, 12-hour clock (01..12)
      - %j - Day of the year (001..366)
      - %m - Month of the year (01..12)
      - %M - Minute of the hour (00..59)
      - %p - Meridian indicator (``AM'' or ``PM'')
      - %S - Second of the minute (00..60)
      - %s - Milliseconds of the second (000..999)
      - %U - Week number of the current year,
          starting with the first Sunday as the first
          day of the first week (00..53)
      - %W - Week number of the current year,
          starting with the first Monday as the first 
          day of the first week (00..53)
      - %w - Day of the week (Sunday is 0, 0..6)
      - %x - Preferred representation for the date alone, no time
      - %X - Preferred representation for the time alone, no date
      - %y - Year without a century (00..99)
      - %Y - Year with century
      - %Z - Time zone (ISO 8601 formatted)
      - %% - Literal ``%'' character
    
    @param {String} format the format string
    @return {String} the formatted string
  */
  toFormattedString: function(fmt) {
    return this.constructor._toFormattedString(fmt, this._ms, this.timezone);
  },
  
  /**
    Formats the receiver according ISO 8601 standard. It is equivalent to
    calling toFormattedString with the '%Y-%m-%dT%H:%M:%S%Z' format string.
    
    @return {String} the formatted string
  */
  toISO8601: function(){
    return this.constructor._toFormattedString(SC.DATETIME_ISO8601, this._ms, this.timezone);
  },
  
  /** @private
    Creates a string representation of the receiver.
    (Debuggers call all the time the toString method. Because of the way
    DateTime is designed, calling SC.DateTime._toFormattedString would
    have a nasty side effect. We shouldn't therefore call any of SC.DateTime's
    methods from toString)
    
    @returns {String}
  */
  toString: function() {
    return "UTC: " +
           new Date(this._ms).toUTCString() +
           ", timezone: " +
           this.timezone;
  },
  
  /**
    Returns YES if the passed DateTime is equal to the receiver, ie: if their
    number of milliseconds since January, 1st 1970 00:00:00.0 UTC are equal.
    This is the preferred method for testing equality.
  
    @see SC.DateTime#compare
    @param {SC.DateTime} aDateTime the DateTime to compare to
    @returns {Boolean}
  */
  isEqual: function(aDateTime) {
    return SC.DateTime.compare(this, aDateTime) === 0;
  },
  
  /**
    Returns a copy of the receiver. Because of the way DateTime is designed,
    it just returns the receiver.
    
    @returns {DateTime}
  */
  copy: function() {
    return this;
  },
  
  /**
    Returns a copy of the receiver with the timezone set to the passed
    timezone. The returned value is equal to the receiver (ie SC.Compare
    returns 0), it is just the timezone representation that changes.
    
    If you don't pass any argument, the target timezone is assumed to be 0,
    ie UTC.

    Note that this method does not change the underlying position in time,
    but only the time zone in which it is displayed.  In other words, the underlying
    number of milliseconds since Jan 1, 1970 does not change.
    
    @return {DateTime}
  */
  toTimezone: function(timezone) {
    if (timezone === undefined) timezone = 0;
    return this.advance({ timezone: timezone - this.timezone });
  }
  
});

// Class Methods
SC.DateTime.mixin(SC.Comparable,
  /** @scope SC.DateTime */ {
  
  /**
    The default format (ISO 8601) in which DateTimes are stored in a record.
    Change this value if your backend sends and receives dates in another
    format.
    
    This value can also be customized on a per-attribute basis with the format
    property. For example:
      SC.Record.attr(SC.DateTime, { format: '%d/%m/%Y %H:%M:%S' })
    
    @property
    @type {String}
  */
  recordFormat: SC.DATETIME_ISO8601,
  
  /**
    The localized day names. Add the key '_SC.DateTime.dayNames' and its value
    to your strings.js file to add support for another language than English.

    @property
    @type {Array}
  */
  dayNames: '_SC.DateTime.dayNames'.loc().w(),
  
  /** @private
    The English day names used for the 'lastMonday',
    'nextTuesday', etc., getters.

    @property
    @type {Array}
  */
  _englishDayNames: 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.w(),
  
  /**
    The localized abbreviated day names. Add the key
    '_SC.DateTime.abbreviatedDayNames' and its value to your strings.js
    file to add support for another language than English.

    @property
    @type {Array}
  */
  abbreviatedDayNames: '_SC.DateTime.abbreviatedDayNames'.loc().w(),

  /**
    The localized month names. Add the key '_SC.DateTime.monthNames' and its
    value to your strings.js file to add support for another language than
    English.

    @property
    @type {Array}
  */
  monthNames: '_SC.DateTime.monthNames'.loc().w(),

  /**
    The localized abbreviated month names. Add the key
    '_SC.DateTime.abbreviatedMonthNames' and its value to your strings.js
    file to add support for another language than English.

    @property
    @type {Array}
  */
  abbreviatedMonthNames: '_SC.DateTime.abbreviatedMonthNames'.loc().w(),
  
  /** @private
    The unique internal Date object used to make computations. Better
    performance is obtained by having only one Date object for the whole
    application and manipulating it with setTime() and getTime().
    
    Note that since this is used for internal calculations across many
    DateTime instances, it is not guaranteed to store the date/time that
    any one DateTime instance represents.  So it might be that
      
      this._date.getTime() !== this._ms

    Be sure to set it before using for internal calculations if necessary.

    @property
    @type {Date}
  */
  _date: new Date(),
  
  /** @private
    The offset, in minutes, between UTC and the currently manipulated
    DateTime instance.
    
    @property
    @type {Integer}
  */
  _tz: 0,
  
  /**
    The offset, in minutes, between UTC and the local system time. This
    property is computed at loading time and should never be changed.
    
    @property
    @type {Integer}
  */
  timezone: new Date().getTimezoneOffset(),
  
  /** @private
    A cache of SC.DateTime instances. If you attempt to create a SC.DateTime
    instance that has already been created, then it will return the cached
    value.

    @property
    @type {Array}
  */
  _dt_cache: {},
  
  /** @private
    The index of the lastest cached value. Used with _DT_CACHE_MAX_LENGTH to
    limit the size of the cache.

    @property
    @type {Integer}
  */
  _dt_cache_index: -1,
  
  /** @private
    The maximum length of _dt_cache. If this limit is reached, then the cache
    is overwritten, starting with the oldest element.

    @property
    @type {Integer}
  */
  _DT_CACHE_MAX_LENGTH: 1000,
  
  /** @private
    Both args are optional, but will only overwrite _date and _tz if defined.
    This method does not affect the DateTime instance's actual time, but simply
    initializes the one _date instance to a time relevant for a calculation.
    (this._date is just a resource optimization)

    This is mainly used as a way to store a recursion starting state during
    internal calculations.

    'milliseconds' is time since Jan 1, 1970.
    'timezone' is the current time zone we want to be working in internally.

    Returns a hash of the previous milliseconds and time zone in case they
    are wanted for later restoration.
  */
  _setCalcState: function(ms, timezone) {
    var previous = {
      milliseconds: this._date.getTime(),
      timezone: this._tz
    };

    if (ms !== undefined) this._date.setTime(ms);
    if (timezone !== undefined) this._tz = timezone;

    return previous;
  },

  /**
    By this time, any time zone setting on 'hash' will be ignored.
    'timezone' will be used, or the last this._tz.
  */
  _setCalcStateFromHash: function(hash, timezone) {
    var tz = (timezone !== undefined) ? timezone : this._tz; // use the last-known time zone if necessary
    var ms = this._toMilliseconds(hash, this._ms, tz); // convert the hash (local to specified time zone) to milliseconds (in UTC)
    return this._setCalcState(ms, tz); // now call the one we really wanted
  },

  /** @private
    @see SC.DateTime#unknownProperty
  */
  _get: function(key, start, timezone) {
    var ms, tz, doy, m, y, firstDayOfWeek, dayOfWeek, dayOfYear, prefix, suffix;
    var currentWeekday, targetWeekday;
    var d = this._date;
    var originalTime, v = null;

    // Set up an absolute date/time using the given milliseconds since Jan 1, 1970.
    // Only do it if we're given a time value, though, otherwise we want to use the
    // last one we had because this _get() method is recursive.
    //
    // Note that because these private time calc methods are recursive, and because all DateTime instances
    // share an internal this._date and this._tz state for doing calculations, methods
    // that modify this._date or this._tz should restore the last state before exiting
    // to avoid obscure calculation bugs.  So we save the original state here, and restore
    // it before returning at the end.
    originalTime = this._setCalcState(start, timezone); // save so we can restore it to how it was before we got here

    // Check this first because it is an absolute value -- no tweaks necessary when calling for milliseconds
    if (key === 'milliseconds') {
      v = d.getTime();
    }
    else if (key === 'timezone') {
      v = this._tz;
    }
    
    // 'nextWeekday' or 'lastWeekday'.
    // We want to do this calculation in local time, before shifting UTC below.
    if (v === null) {
      prefix = key.slice(0, 4);
      suffix = key.slice(4);
      if (prefix === 'last' || prefix === 'next') {
        currentWeekday = this._get('dayOfWeek', start, timezone);
        targetWeekday = this._englishDayNames.indexOf(suffix);    
        if (targetWeekday >= 0) {
          var delta = targetWeekday - currentWeekday;
          if (prefix === 'last' && delta >= 0) delta -= 7;
          if (prefix === 'next' && delta <  0) delta += 7;
          this._advance({ day: delta }, start, timezone);
          v = this._createFromCurrentState();
        }
      }
    }
    
    if (v === null) {
      // need to adjust for alternate display time zone.
      // Before calculating, we need to get everything into a common time zone to
      // negate the effects of local machine time (so we can use all the 'getUTC...() methods on Date).
      if (timezone !== undefined) {
        this._setCalcState(d.getTime() - (timezone * 60000), 0); // make this instance's time zone the new UTC temporarily
      }
    
      // simple keys
      switch (key) {
        case 'year':
          v = d.getUTCFullYear(); //TODO: investigate why some libraries do getFullYear().toString() or getFullYear()+""
          break;
        case 'month':
          v = d.getUTCMonth()+1; // January is 0 in JavaScript
          break;
        case 'day':
          v = d.getUTCDate();
          break;
        case 'dayOfWeek':
          v = d.getUTCDay();
          break;
        case 'hour':
          v = d.getUTCHours();
          break;
        case 'minute':
          v = d.getUTCMinutes();
          break;
        case 'second':
          v = d.getUTCSeconds();
          break;
        case 'millisecond':
          v = d.getUTCMilliseconds();
          break;
      }
      
      // isLeapYear
      if ((v === null) && (key === 'isLeapYear')) {
        y = this._get('year');
        v = (y%4 === 0 && y%100 !== 0) || y%400 === 0;
      }

      // daysInMonth
      if ((v === null) && (key === 'daysInMonth')) {
        switch (this._get('month')) {
          case 4:
          case 6:
          case 9:
          case 11:
            v = 30;
            break;
          case 2:
            v = this._get('isLeapYear') ? 29 : 28;
            break;
          default:
            v = 31;
            break;
        }
      }
    
      // dayOfYear
      if ((v === null) && (key === 'dayOfYear')) {
        ms = d.getTime(); // save time
        doy = this._get('day');
        this._setCalcStateFromHash({ day: 1 });
        for (m = this._get('month') - 1; m > 0; m--) {
          this._setCalcStateFromHash({ month: m });
          doy += this._get('daysInMonth');
        }
        d.setTime(ms); // restore time
        v = doy;
      }

      // week, week0 or week1
      if ((v === null) && (key.slice(0, 4) === 'week')) {
        // firstDayOfWeek should be 0 (Sunday) or 1 (Monday)
        firstDayOfWeek = key.length === 4 ? 1 : parseInt(key.slice('4'), 10);
        dayOfWeek = this._get('dayOfWeek');
        dayOfYear = this._get('dayOfYear') - 1;
        if (firstDayOfWeek === 0) {
          v = parseInt((dayOfYear - dayOfWeek + 7) / 7, 10);
        }
        else {
          v = parseInt((dayOfYear - (dayOfWeek - 1 + 7) % 7 + 7) / 7, 10);
        }
      }
    }

    // restore the internal calculation state in case someone else was in the
    // middle of a calculation (we might be recursing).
    this._setCalcState(originalTime.milliseconds, originalTime.timezone);

    return v;
  },

  /**
    Sets the internal calculation state to something specified.
  */
  _adjust: function(options, start, timezone, resetCascadingly) {
    var opts = options ? SC.clone(options) : {};
    var ms = this._toMilliseconds(options, start, timezone, resetCascadingly);
    this._setCalcState(ms, timezone);
    return this; // for chaining
  },
  
  /** @private
    @see SC.DateTime#advance
  */
  _advance: function(options, start, timezone) {
    var opts = options ? SC.clone(options) : {};
    var tz;

    for (var key in opts) {
      opts[key] += this._get(key, start, timezone);
    }
    
    // The time zone can be advanced by a delta as well, so try to use the
    // new value if there is one.
    tz = (opts.timezone !== undefined) ? opts.timezone : timezone; // watch out for zero, which is acceptable as a time zone

    return this._adjust(opts, start, tz, NO);
  },
  
  /* @private
    Converts a standard date/time options hash to an integer representing that position
    in time relative to Jan 1, 1970
  */
  _toMilliseconds: function(options, start, timezone, resetCascadingly) {
    var opts = options ? SC.clone(options) : {};
    var d = this._date;
    var previousMilliseconds = d.getTime(); // rather than create a new Date object, we'll reuse the instance we have for calculations, then restore it
    var ms, tz;

    // Initialize our internal for-calculations Date object to our current date/time.
    // Note that this object was created in the local machine time zone, so when we set
    // its params later, it will be assuming these values to be in the same time zone as it is.
    // It's ok for start to be null, in which case we'll just keep whatever we had in 'd' before.
    if (!SC.none(start)) {
      d.setTime(start); // using milliseconds here specifies an absolute location in time, regardless of time zone, so that's nice
    }
    
    // We have to get all time expressions, both in 'options' (assume to be in time zone 'timezone')
    // and in 'd', to the same time zone before we can any calculations correctly.  So because the Date object provides
    // a suite of UTC getters and setters, we'll temporarily redefine 'timezone' as our new
    // 'UTC', so we don't have to worry about local machine time.  We do this by subtracting
    // milliseconds for the time zone offset.  Then we'll do all our calculations, then convert
    // it back to real UTC.
    
    // (Zero time zone is considered a valid value.)
    tz = (timezone !== undefined) ? timezone : (this.timezone !== undefined) ? this.timezone : 0;
    d.setTime(d.getTime() - (tz * 60000)); // redefine 'UTC' to establish a new local absolute so we can use all the 'getUTC...()' Date methods
    
    // the time options (hour, minute, sec, millisecond)
    // reset cascadingly (see documentation)
    if (resetCascadingly === undefined || resetCascadingly === YES) {
      if ( !SC.none(opts.hour) && SC.none(opts.minute)) {
        opts.minute = 0;
      }
      if (!(SC.none(opts.hour) && SC.none(opts.minute))
          && SC.none(opts.second)) {
        opts.second = 0;
      }
      if (!(SC.none(opts.hour) && SC.none(opts.minute) && SC.none(opts.second))
          && SC.none(opts.millisecond)) {
        opts.millisecond = 0;
      }
    }
    
    // Get the current values for any not provided in the options hash.
    // Since everything is in 'UTC' now, use the UTC accessors.  We do this because,
    // according to javascript Date spec, you have to set year, month, and day together
    // if you're setting any one of them.  So we'll use the provided Date.UTC() method
    // to get milliseconds, and we need to get any missing values first...
    if (SC.none(opts.year))        opts.year = d.getUTCFullYear();
    if (SC.none(opts.month))       opts.month = d.getUTCMonth() + 1; // January is 0 in JavaScript
    if (SC.none(opts.day))         opts.day = d.getUTCDate();
    if (SC.none(opts.hour))        opts.hour = d.getUTCHours();
    if (SC.none(opts.minute))      opts.minute = d.getUTCMinutes();
    if (SC.none(opts.second))      opts.second = d.getUTCSeconds();
    if (SC.none(opts.millisecond)) opts.millisecond = d.getUTCMilliseconds();

    // Ask the JS Date to calculate milliseconds for us (still in redefined UTC).  It
    // is best to set them all together because, for example, a day value means different things
    // to the JS Date object depending on which month or year it is.  It can now handle that stuff
    // internally as it's made to do.
    ms = Date.UTC(opts.year, opts.month - 1, opts.day, opts.hour, opts.minute, opts.second, opts.millisecond);

    // Now that we've done all our calculations in a common time zone, add back the offset
    // to move back to real UTC.
    d.setTime(ms + (tz * 60000));
    ms = d.getTime(); // now get the corrected milliseconds value
    
    // Restore what was there previously before leaving in case someone called this method
    // in the middle of another calculation.
    d.setTime(previousMilliseconds);

    return ms;
  },
  
  /**
    Returns a new DateTime object advanced according the the given parameters.
    The parameters can be:
    - none, to create a DateTime instance initialized to the current
      date and time in the local timezone,
    - a integer, the number of milliseconds since
      January, 1st 1970 00:00:00.0 UTC
    - a options hash that can contain any of the following properties: year,
      month, day, hour, minute, second, millisecond, timezone
      
    Note that if you attempt to create a SC.DateTime instance that has already
    been created, then, for performance reasons, a cached value may be
    returned.
    
    The timezone option is the offset, in minutes, between UTC and local time.
    If you don't pass a timezone option, the date object is created in the
    local timezone. If you want to create a UTC+2 (CEST) date, for example,
    then you should pass a timezone of -120.
    
    @param options one of the three kind of parameters descibed above
    @returns {DateTime} the DateTime instance that corresponds to the
      passed parameters, possibly fetched from cache
  */
  create: function() {
    var arg = arguments.length === 0 ? {} : arguments[0];
    var timezone;
    
    // if simply milliseconds since Jan 1, 1970 are given, just use those
    if (SC.typeOf(arg) === SC.T_NUMBER) {
      arg = { milliseconds: arg };
    }

    // Default to local machine time zone if none is given
    timezone = (arg.timezone !== undefined) ? arg.timezone : this.timezone;
    if (timezone === undefined) timezone = 0;

    // Desired case: create with milliseconds if we have them.
    // If we don't, convert what we have to milliseconds and recurse.
    if (!SC.none(arg.milliseconds)) {

      // quick implementation of a FIFO set for the cache
      var key = 'nu' + arg.milliseconds + timezone, cache = this._dt_cache;
      var ret = cache[key];
      if (!ret) {
        var previousKey, idx = this._dt_cache_index, C = this;
        ret = cache[key] = new C([{ _ms: arg.milliseconds, timezone: timezone }]);
        idx = this._dt_cache_index = (idx + 1) % this._DT_CACHE_MAX_LENGTH;
        previousKey = cache[idx];
        if (previousKey !== undefined && cache[previousKey]) delete cache[previousKey];
        cache[idx] = key;
      }
      return ret;
    }
    // otherwise, convert what we have to milliseconds and try again
    else {
      var now = new Date();

      return this.create({ // recursive call with new arguments
        milliseconds: this._toMilliseconds(arg, now.getTime(), timezone, arg.resetCascadingly),
        timezone: timezone
      });
    }
  },
  
  /** @private
    Calls the create() method with the current internal _date value.
    
    @return {DateTime} the DateTime instance returned by create()
  */
  _createFromCurrentState: function() {
    return this.create({
      milliseconds: this._date.getTime(),
      timezone: this._tz
    });
  },
  
  /**
    Returns a DateTime object created from a given string parsed with a given
    format. Returns null if the parsing fails.

    @see SC.DateTime#toFormattedString for a description of the format parameter
    @param {String} str the string to parse
    @param {String} fmt the format to parse the string with
    @returns {DateTime} the DateTime corresponding to the string parameter
  */
  parse: function(str, fmt) {
    // Declared as an object not a literal since in some browsers the literal
    // retains state across function calls
    var re = new RegExp('(?:%([aAbBcdDhHIjmMpsSUWwxXyYZ%])|(.))', "g");
    var d, parts, opts = {}, check = {}, scanner = SC.Scanner.create({string: str});
    
    if (SC.none(fmt)) fmt = SC.DATETIME_ISO8601;
    
    try {
      while ((parts = re.exec(fmt)) !== null) {
        switch(parts[1]) {
          case 'a': check.dayOfWeek = scanner.scanArray(this.abbreviatedDayNames); break;
          case 'A': check.dayOfWeek = scanner.scanArray(this.dayNames); break;
          case 'b': opts.month = scanner.scanArray(this.abbreviatedMonthNames) + 1; break;
          case 'B': opts.month = scanner.scanArray(this.monthNames) + 1; break;
          case 'c': throw "%c is not implemented";
          case 'd':
          case 'D': opts.day = scanner.scanInt(1, 2); break;
          case 'h':
          case 'H': opts.hour = scanner.scanInt(1, 2); break;
          case 'I': opts.hour = scanner.scanInt(1, 2); break;
          case 'j': throw "%j is not implemented";
          case 'm': opts.month = scanner.scanInt(1, 2); break;
          case 'M': opts.minute = scanner.scanInt(1, 2); break;
          case 'p': opts.meridian = scanner.scanArray(['AM', 'PM']); break;
          case 'S': opts.second = scanner.scanInt(1, 2); break;
          case 's': opts.millisecond = scanner.scanInt(1, 3); break;
          case 'U': throw "%U is not implemented";
          case 'W': throw "%W is not implemented";
          case 'w': throw "%w is not implemented";
          case 'x': throw "%x is not implemented";
          case 'X': throw "%X is not implemented";
          case 'y': opts.year = scanner.scanInt(2); opts.year += (opts.year > 70 ? 1900 : 2000); break;
          case 'Y': opts.year = scanner.scanInt(4); break;
          case 'Z':
            var modifier = scanner.scan(1);
            if (modifier === 'Z') {
              opts.timezone = 0;
            } else if (modifier === '+' || modifier === '-' ) {
              var h = scanner.scanInt(2);
              if (scanner.scan(1) !== ':') scanner.scan(-1);
              var m = scanner.scanInt(2);
              opts.timezone = (modifier === '+' ? -1 : 1) * (h*60 + m);
            }
            break;
          case '%': scanner.skipString('%'); break;
          default:  scanner.skipString(parts[0]); break;
        }
      }
    } catch (e) {
      SC.Logger.log('SC.DateTime.createFromString ' + e.toString());
      return null;
    }
    
    if (!SC.none(opts.meridian) && !SC.none(opts.hour)) {
      if (opts.meridian === 1) opts.hour = (opts.hour + 12) % 24;
      delete opts.meridian;
    }
    
    d = SC.DateTime.create(opts);
    
    if (!SC.none(check.dayOfWeek) && d.get('dayOfWeek') !== check.dayOfWeek) {
      return null;
    }
    
    return d;
  },
  
  /** @private
    Converts the x parameter into a string padded with 0s so that the string’s
    length is at least equal to the len parameter.
    
    @param x the object to convert to a string
    @param {Integer} the minimum length of the returned string
    @returns {String} the padded string
  */
  _pad: function(x, len) {
  	var str = '' + x;
  	if (len === undefined) len = 2;
    while (str.length < len) str = '0' + str;
    return str;
  },
  
  /** @private
    @see SC.DateTime#_toFormattedString
  */
  __toFormattedString: function(part, start, timezone) {
    var hour, offset;

    // Note: all calls to _get() here should include only one
    // argument, since _get() is built for recursion and behaves differently
    // if arguments 2 and 3 are included.
    //
    // This method is simply a helper for this._toFormattedString() (one underscore);
    // this is only called from there, and _toFormattedString() has already
    // set up the appropriate internal date/time/timezone state for it.
    
    switch(part[1]) {
      case 'a': return this.abbreviatedDayNames[this._get('dayOfWeek')];
      case 'A': return this.dayNames[this._get('dayOfWeek')];
      case 'b': return this.abbreviatedMonthNames[this._get('month')-1];
      case 'B': return this.monthNames[this._get('month')-1];
      case 'c': return this._date.toString();
      case 'd': return this._pad(this._get('day'));
      case 'D': return this._get('day');
      case 'h': return this._get('hour');
      case 'H': return this._pad(this._get('hour'));
      case 'i':
        hour = this._get('hour');
        return (hour === 12 || hour === 0) ? 12 : (hour + 12) % 12;
      case 'I': 
        hour = this._get('hour');
        return this._pad((hour === 12 || hour === 0) ? 12 : (hour + 12) % 12);
      case 'j': return this._pad(this._get('dayOfYear'), 3);
      case 'm': return this._pad(this._get('month'));
      case 'M': return this._pad(this._get('minute'));
      case 'p': return this._get('hour') > 11 ? 'PM' : 'AM';
      case 'S': return this._pad(this._get('second'));
      case 's': return this._pad(this._get('millisecond'), 3);
      case 'u': return this._pad(this._get('utc')); //utc
      case 'U': return this._pad(this._get('week0'));
      case 'W': return this._pad(this._get('week1'));
      case 'w': return this._get('dayOfWeek');
      case 'x': return this._date.toDateString();
      case 'X': return this._date.toTimeString();
      case 'y': return this._pad(this._get('year') % 100);
      case 'Y': return this._get('year');
      case 'Z':
        offset = -1 * timezone;
        return (offset >= 0 ? '+' : '-')
               + this._pad(parseInt(Math.abs(offset)/60, 10))
               + ':'
               + this._pad(Math.abs(offset)%60);
      case '%': return '%';
    }
  },
  
  /** @private
    @see SC.DateTime#toFormattedString
  */
  _toFormattedString: function(format, start, timezone) {
    var that = this;
    var tz = (timezone !== undefined) ? timezone : (this.timezone !== undefined) ? this.timezone : 0;

    // need to move into local time zone for these calculations
    this._setCalcState(start - (timezone * 60000), 0); // so simulate a shifted 'UTC' time

    return format.replace(/\%([aAbBcdDhHiIjmMpsSUWwxXyYZ\%])/g, function() {
      var v = that.__toFormattedString.call(that, arguments, start, timezone);
      return v;
    });
  },
  
  /**
    This will tell you which of the two passed DateTime is greater than the
    other, by comparing if their number of milliseconds since
    January, 1st 1970 00:00:00.0 UTC.
 
    @param {SC.DateTime} a the first DateTime instance
    @param {SC.DateTime} b the second DateTime instance
    @returns {Integer} -1 if a < b, 
                       +1 if a > b,
                       0 if a == b
  */
  compare: function(a, b) {
    var ma = a.get('milliseconds');
    var mb = b.get('milliseconds');
    return ma < mb ? -1 : ma === mb ? 0 : 1;
  },
  
  /**
    This will tell you which of the two passed DateTime is greater than the
    other, by only comparing the date parts of the passed objects. Only dates
    with the same timezone can be compared.
 
    @param {SC.DateTime} a the first DateTime instance
    @param {SC.DateTime} b the second DateTime instance
    @returns {Integer} -1 if a < b,
                       +1 if a > b,
                       0 if a == b
    @throws {SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR} if the passed arguments
      don't have the same timezone
  */
  compareDate: function(a, b) {
    if (a.get('timezone') !== b.get('timezone')) throw SC.DATETIME_COMPAREDATE_TIMEZONE_ERROR;
    var ma = a.adjust({hour: 0}).get('milliseconds');
    var mb = b.adjust({hour: 0}).get('milliseconds');
    return ma < mb ? -1 : ma === mb ? 0 : 1;
  }
  
});

/**
  Adds a transform to format the DateTime value to a String value according
  to the passed format string. 
  
  {{
    valueBinding: SC.Binding.dateTime('%Y-%m-%d %H:%M:%S')
                  .from('MyApp.myController.myDateTime');
  }}

  @param {String} format format string
  @returns {SC.Binding} this
*/
SC.Binding.dateTime = function(format) {
  return this.transform(function(value, binding) {
    return value ? value.toFormattedString(format) : null;
  });
};


/* >>>>>>>>>> BEGIN javascript.js */
/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

// Place any global constants here

/* >>>>>>>>>> BEGIN __sc_chance.js */

/* >>>>>>>>>> BEGIN source/data_sources/data_source.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================


/** @class

  A DataSource connects an in-memory store to one or more server backends. 
  To connect to a data backend on a server, subclass `SC.DataSource`
  and implement the necessary data source methods to communicate with the 
  particular backend. 
  
  
  h2. Create a Data Source
  
  To implement the data source, subclass `SC.DataSource` in a file located 
  either in the root level of your app or framework, or in a directory
  called "data_sources":
  
	{{{
  	MyApp.DataSource = SC.DataSource.extend({
  		// implement the data source API...
  	});
	}}}
  
  
	h2. Connect to a Data Source
	
	New SproutCore applications are wired up to fixtures as their data source.
  When you are ready to connect to a server, swap the use of fixtures with a 
  call to the desired data source. 
  
  In core.js:
  
  {{{
  	// change...
  	store: SC.Store.create().from(SC.Record.fixtures)
  	
  	// to...
  	store: SC.Store.create().from('MyApp.DataSource')
  }}}
  
  Note that the data source class name is referenced by string since the file
  in which it is defined may not have been loaded yet. The first time a 
  data store tries to access its data source it will look up the class name 
  and instantiate that data source. 
  
  
  h2. Implement the Data Source API
  
	There are three methods that a data store invokes on its data source:
  
  <ul>
  	<li>
  		`fetch()` &mdash; called the first time you try to `find()` a query 
  		on a store or any time you refresh the record array after that.
	  </li>
  	<li>
  		`retrieveRecords()` &mdash; called when you access an individual 
  		record that has not been loaded yet
		</li>
		<li>
			`commitRecords()` &mdash; called if the the store has changes 
			pending and its `commitRecords()` method is invoked.
		</li>
	</ul>

	The data store will call the `commitRecords()` method when records 
	need to be created, updated, or deleted. If the server that the data source
	connects to handles these three actions in a uniform manner, it may be 
	convenient to implement the `commitRecords()` to handle record 
	creation, updating, and deletion. 
	
	However, if the calls the data source will need to make to the server to 
	create, update, and delete records differ from each other to a significant 
	enough degree, it will be more convenient to rely on the default behavior
	of `commitRecords()` and instead implement the three methods that
	it will call by default:
	
	<ul>
		<li>
			`createRecords()` &mdash; called with a list of records that are new 
			and need to be created on the server.
		</li>
		<li>
			`updateRecords()` &mdash; called with a list of records that already 
			exist on the server but that need to be updated.
		</li>
		<li>
			`destroyRecords()` &mdash; called with a list of records that should 
			be deleted on the server.
		</li>
	</ul>
			
	
	h3. Multiple records
	
	The `retrieveRecords()`, `createRecords()`, `updateRecords()` and 
	`destroyRecords()` 	methods all work on multiple records. If your server 
	API accommodates calls	where you can	pass a list of records, this might 
	be the best level at which to implement the Data Source API. On the other 
	hand, if the server requires that you send commands for it for individual 
	records, you can rely on the default implementation of these four methods, 
	which will call the following for each individual record, one at a time:
	
	- `retrieveRecord()` &mdash; called to retrieve a single record.
	- `createRecord()` &mdash; called to create a single record.
	- `updateRecord()` &mdash; called to update a single record.
	- `destroyRecord()` &mdash; called to destroy a single record.
	
	
	h3. Return Values
	
	All of the methods you implement must return one of three values:
	- `YES` &mdash; all the records were handled.
	- `NO` &mdash; none of the records were handled.
	- `SC.MIXED_STATE` &mdash; some, but not all of the records were handled.
	
	
	h3. Store Keys  
	
	Whenever a data store invokes one of the data source methods it does so 
	with a storeKeys or storeKey argument. Store keys are transient integers
	assigned to each data hash when it is first loaded into the store. It is
	used to track data hashes as they move up and down nested stores (even if
	no associated record is ever created from it).
	
	When passed a storeKey you can use it to retrieve the status, data hash,
	record type, or record ID, using the following data store methods:
	
	<ul>
		<li>
			`readDataHash(storeKey)` &mdash; returns the data hash associated with 
			a store key, if any.
		</li>
		<li>
			`readStatus(storeKey)` &mdash; returns the current record status 
			associated with the store key. May be `SC.Record.EMPTY`.
		</li>
		<li>
			`SC.Store.recordTypeFor(storeKey)` &mdash; returns the record type for 
			the associated store key.
		</li>
		<li>
			`recordType.idFor(storeKey)` &mdash; returns the record ID for
			the associated store key. You must call this method on `SC.Record`
			subclass itself, not on an instance of `SC.Record`.
		</li>
	</ul>
	
	These methods are safe for reading data from the store. To modify data 
	in the data store you must use the store callbacks described below. The
	store callbacks will ensure that the record states remain consistent. 
	
	
	h3. Store Callbacks
	
	When a data store calls a data source method, it puts affected records into 
	a `BUSY` state. To guarantee data integrity and consistency, these records 
	cannot be modified by the rest of the application while they are in the `BUSY` 
	state. 
	
	Because records are "locked" while in the `BUSY` state, it is the data source's	
	responsibility to invoke a callback on the store for each record or query that 
	was passed to it and that the data source handled. To reduce the amount of work 
	that a data source must do, the data store will automatically unlock the relevant 
	records if the the data source method returned `NO`, indicating that the records 
	were unhandled. 
	
	Although a data source can invoke callback methods at any time, they should 
	usually be invoked after receiving a response from the server. For example, when 
	the data source commits a change to a record by issuing a command to the server, 
	it waits for the server to acknowledge the command before invoking the 
	`dataSourceDidComplete()` callback. 
	
	In some cases a data source may be able to assume a server's response and invoke 
	the callback on the store immediately. This can improve performance because the 
	record can be unlocked right away.
	
	
	h3. Record-Related Callbacks
	
	When `retrieveRecords()`, `commitRecords()`, or any of the related methods are
	called on a data source, the store puts any records to be handled by the data 
	store in a `BUSY` state. To release the records the data source must invoke one 
	of the record-related callbacks on the store:
	
	<ul>
		<li>
			`dataSourceDidComplete(storeKey, dataHash, id)` &mdash; the most common 
			callback. You might use this callback when you have retrieved a record to	
			load its contents into the store. The callback tells the store that the data 
			source is finished with the storeKey in question. The `dataHash` and `id`	
			arguments are optional and will replace the current dataHash and/or id. Also 
			see "Loading Records" below.
		</li>
		<li>
			`dataSourceDidError(storeKey, error)` &mdash; a data source should call this 
			when a request could not be completed because an error occurred. The error
			argument is optional and can contain more information about the error.
		</li>
		<li>
			`dataSourceDidCancel(storeKey)` &mdash; a data source should call this when 
			an operation is cancelled for some reason. This could be used when the user 
			is able to cancel an operation that is in progress. 
		</li>
	</ul>
	
	h3. Loading Records into the Store
	
	Instead of orchestrating multiple `dataSourceDidComplete()` callbacks when loading 
	multiple records, a data source can call the `loadRecords()` method on the store, 
	passing in a `recordType`, and array of data hashes, and optionally an array of ids. 
	The `loadRecords()` method takes care of looking up storeKeys and calling the 
	`dataSourceDidComplete()` callback as needed. 
	
	`loadRecords()` is often the most convenient way to get large blocks of data into 
	the store, especially in response to a `fetch()` or `retrieveRecords()` call.
	
	
	h3. Query-Related Callbacks
	
	Like records, queries that are passed through the `fetch()` method also have an 
	associated status property; accessed through the `status`	property on the record 
	array returned from `find()`. To properly reset this status, a data source must 
	invoke an appropriate query-related callback on the store. The callbacks for 
	queries are similar to those for records:
	
	<ul>
		<li>
			`dataSourceDidFetchQuery(query)` &mdash; the data source must call this when 
			it has completed fetching any related data for the query. This returns the 
			query results (record array) status into a `READY` state. 
		</li>
		<li>
			`dataSourceDidErrorQuery(query, error)` &mdash; the data source should call 
			this if it encounters an error in executing the query. This puts the query 
			results into an `ERROR` state. 
		</li>
		<li>
			`dataSourceDidCancelQuery(query)` &mdash; the data source should call this 
			if loading the results is cancelled.
		</li>
	</ul>
	
	In addition to these callbacks, the method `loadQueryResults(query, storeKey)` 
	is used by data sources when handling remote queries. This method is similar to 
	`dataSourceDidFetchQuery()`, except that you also provide an array of storeKeys 
	(or a promise to provide store keys) that comprises the result set.
	
	
  
  @extend SC.Object
  @since SproutCore 1.0
*/
SC.DataSource = SC.Object.extend( /** @scope SC.DataSource.prototype */ {

  // ..........................................................
  // SC.STORE ENTRY POINTS
  // 
  

  /**
  
    Invoked by the store whenever it needs to retrieve data matching a 
    specific query, triggered by find().  This method is called anytime
    you invoke SC.Store#find() with a query or SC.RecordArray#refresh().  You 
    should override this method to actually retrieve data from the server 
    needed to fulfill the query.  If the query is a remote query, then you 
    will also need to provide the contents of the query as well.
    
    h3. Handling Local Queries
    
    Most queries you create in your application will be local queries.  Local
    queries are populated automatically from whatever data you have in memory.
    When your fetch() method is called on a local queries, all you need to do
    is load any records that might be matched by the query into memory. 
    
    The way you choose which queries to fetch is up to you, though usually it
    can be something fairly straightforward such as loading all records of a
    specified type.
    
    When you finish loading any data that might be required for your query, 
    you should always call SC.Store#dataSourceDidFetchQuery() to put the query 
    back into the READY state.  You should call this method even if you choose
    not to load any new data into the store in order to notify that the store
    that you think it is ready to return results for the query.
    
    h3. Handling Remote Queries
    
    Remote queries are special queries whose results will be populated by the
    server instead of from memory.  Usually you will only need to use this 
    type of query when loading large amounts of data from the server.
    
    Like Local queries, to fetch a remote query you will need to load any data
    you need to fetch from the server and add the records to the store.  Once
    you are finished loading this data, however, you must also call
    SC.Store#loadQueryResults() to actually set an array of storeKeys that
    represent the latest results from the server.  This will implicitly also
    call datasSourceDidFetchQuery() so you don't need to call this method 
    yourself.
    
    If you want to support incremental loading from the server for remote 
    queries, you can do so by passing a SC.SparseArray instance instead of 
    a regular array of storeKeys and then populate the sparse array on demand.
    
    h3. Handling Errors and Cancelations
    
    If you encounter an error while trying to fetch the results for a query 
    you can call SC.Store#dataSourceDidErrorQuery() instead.  This will put
    the query results into an error state.  
    
    If you had to cancel fetching a query before the results were returned, 
    you can instead call SC.Store#dataSourceDidCancelQuery().  This will set 
    the query back into the state it was in previously before it started 
    loading the query.
    
    h3. Return Values
    
    When you return from this method, be sure to return a Boolean.  YES means
    you handled the query, NO means you can't handle the query.  When using
    a cascading data source, returning NO will mean the next data source will
    be asked to fetch the same results as well.
    
    @param {SC.Store} store the requesting store
    @param {SC.Query} query query describing the request
    @returns {Boolean} YES if you can handle fetching the query, NO otherwise
  */
  fetch: function(store, query) {
    return NO ; // do not handle anything!
  },
  
  /**
    Called by the store whenever it needs to load a specific set of store 
    keys.  The default implementation will call retrieveRecord() for each
    storeKey.  
    
    You should implement either retrieveRecord() or retrieveRecords() to 
    actually fetch the records referenced by the storeKeys .
    
    @param {SC.Store} store the requesting store
    @param {Array} storeKeys
    @param {Array} ids - optional
    @returns {Boolean} YES if handled, NO otherwise
  */
  retrieveRecords: function(store, storeKeys, ids) {
    return this._handleEach(store, storeKeys, this.retrieveRecord, ids);  
  },
  
  /**
    Invoked by the store whenever it has one or more records with pending 
    changes that need to be sent back to the server.  The store keys will be
    separated into three categories:
    
     - createStoreKeys: records that need to be created on server
     - updateStoreKeys: existing records that have been modified
     - destroyStoreKeys: records need to be destroyed on the server
     
    If you do not override this method yourself, this method will actually
    invoke createRecords(), updateRecords(), and destroyRecords() on the 
    dataSource, passing each array of storeKeys.  You can usually implement
    those methods instead of overriding this method.
    
    However, if your server API can sync multiple changes at once, you may
    prefer to override this method instead.
    
    To support cascading data stores, be sure to return NO if you cannot 
    handle any of the keys, YES if you can handle all of the keys, or
    SC.MIXED_STATE if you can handle some of them.

    @param {SC.Store} store the requesting store
    @param {Array} createStoreKeys keys to create
    @param {Array} updateStoreKeys keys to update
    @param {Array} destroyStoreKeys keys to destroy
    @param {Hash} params to be passed down to data source. originated
      from the commitRecords() call on the store
    @returns {Boolean} YES if data source can handle keys
  */
  commitRecords: function(store, createStoreKeys, updateStoreKeys, destroyStoreKeys, params) {
    var cret, uret, dret;
    if (createStoreKeys.length>0) {
      cret = this.createRecords.call(this, store, createStoreKeys, params);
    }
        
    if (updateStoreKeys.length>0) {
      uret = this.updateRecords.call(this, store, updateStoreKeys, params); 
    }
       
    if (destroyStoreKeys.length>0) {
      dret = this.destroyRecords.call(this, store, destroyStoreKeys, params);
    }
     
    return ((cret === uret) && (cret === dret)) ? cret : SC.MIXED_STATE;
  },
  
  /**
    Invoked by the store whenever it needs to cancel one or more records that
    are currently in-flight.  If any of the storeKeys match records you are
    currently acting upon, you should cancel the in-progress operation and 
    return YES.
    
    If you implement an in-memory data source that immediately services the
    other requests, then this method will never be called on your data source.
    
    To support cascading data stores, be sure to return NO if you cannot 
    retrieve any of the keys, YES if you can retrieve all of the, or
    SC.MIXED_STATE if you can retrieve some of the.
    
    @param {SC.Store} store the requesting store
    @param {Array} storeKeys array of storeKeys to retrieve
    @returns {Boolean} YES if data source can handle keys
  */
  cancel: function(store, storeKeys) {
    return NO;
  },
  
  // ..........................................................
  // BULK RECORD ACTIONS
  // 
  
  /**
    Called from commitRecords() to commit modified existing records to the 
    store.  You can override this method to actually send the updated 
    records to your store.  The default version will simply call 
    updateRecord() for each storeKey.

    To support cascading data stores, be sure to return NO if you cannot 
    handle any of the keys, YES if you can handle all of the keys, or
    SC.MIXED_STATE if you can handle some of them.

    @param {SC.Store} store the requesting store
    @param {Array} storeKeys keys to update
    @param {Hash} params 
      to be passed down to data source. originated from the commitRecords() 
      call on the store

    @returns {Boolean} YES, NO, or SC.MIXED_STATE  

  */
  updateRecords: function(store, storeKeys, params) {
    return this._handleEach(store, storeKeys, this.updateRecord, null, params);
  },
  
  /**
    Called from commitRecords() to commit newly created records to the 
    store.  You can override this method to actually send the created 
    records to your store.  The default version will simply call 
    createRecord() for each storeKey.

    To support cascading data stores, be sure to return NO if you cannot 
    handle any of the keys, YES if you can handle all of the keys, or
    SC.MIXED_STATE if you can handle some of them.

    @param {SC.Store} store the requesting store
    @param {Array} storeKeys keys to update
    
    @param {Hash} params 
      to be passed down to data source. originated from the commitRecords() 
      call on the store
    
    @returns {Boolean} YES, NO, or SC.MIXED_STATE  
  
  */
  createRecords: function(store, storeKeys, params) {
    return this._handleEach(store, storeKeys, this.createRecord, null, params);
  },

  /**
    Called from commitRecords() to commit destroted records to the 
    store.  You can override this method to actually send the destroyed 
    records to your store.  The default version will simply call 
    destroyRecord() for each storeKey.

    To support cascading data stores, be sure to return NO if you cannot 
    handle any of the keys, YES if you can handle all of the keys, or
    SC.MIXED_STATE if you can handle some of them.

    @param {SC.Store} store the requesting store
    @param {Array} storeKeys keys to update
    @param {Hash} params to be passed down to data source. originated
      from the commitRecords() call on the store

    @returns {Boolean} YES, NO, or SC.MIXED_STATE  

  */
  destroyRecords: function(store, storeKeys, params) {
    return this._handleEach(store, storeKeys, this.destroyRecord, null, params);
  },

  /** @private
    invokes the named action for each store key.  returns proper value
  */
  _handleEach: function(store, storeKeys, action, ids, params) {
    var len = storeKeys.length, idx, ret, cur, lastArg;
    if(!ids) ids = [];
    
    for(idx=0;idx<len;idx++) {
      lastArg = ids[idx] ? ids[idx] : params;
      
      cur = action.call(this, store, storeKeys[idx], lastArg, params);
      if (ret === undefined) {
        ret = cur ;
      } else if (ret === YES) {
        ret = (cur === YES) ? YES : SC.MIXED_STATE ;
      } else if (ret === NO) {
        ret = (cur === NO) ? NO : SC.MIXED_STATE ;
      }
    }
    return ret ? ret : null ;
  },
  

  // ..........................................................
  // SINGLE RECORD ACTIONS
  // 
  
  /**
    Called from updatesRecords() to update a single record.  This is the 
    most basic primitive to can implement to support updating a record.
    
    To support cascading data stores, be sure to return NO if you cannot 
    handle the passed storeKey or YES if you can.
    
    @param {SC.Store} store the requesting store
    @param {Array} storeKey key to update
    @param {Hash} params to be passed down to data source. originated
      from the commitRecords() call on the store
    @returns {Boolean} YES if handled
  */
  updateRecord: function(store, storeKey, params) {
    return NO ;
  },

  /**
    Called from retrieveRecords() to retrieve a single record.
    
    @param {SC.Store} store the requesting store
    @param {Array} storeKey key to retrieve
    @param {String} id the id to retrieve
    @returns {Boolean} YES if handled
  */
  retrieveRecord: function(store, storeKey, id) {
    return NO ;
  },

  /**
    Called from createdRecords() to created a single record.  This is the 
    most basic primitive to can implement to support creating a record.
    
    To support cascading data stores, be sure to return NO if you cannot 
    handle the passed storeKey or YES if you can.
    
    @param {SC.Store} store the requesting store
    @param {Array} storeKey key to update
    @param {Hash} params to be passed down to data source. originated
      from the commitRecords() call on the store
    @returns {Boolean} YES if handled
  */
  createRecord: function(store, storeKey, params) {
    return NO ;
  },

  /**
    Called from destroyRecords() to destroy a single record.  This is the 
    most basic primitive to can implement to support destroying a record.
    
    To support cascading data stores, be sure to return NO if you cannot 
    handle the passed storeKey or YES if you can.
    
    @param {SC.Store} store the requesting store
    @param {Array} storeKey key to update
    @param {Hash} params to be passed down to data source. originated
      from the commitRecords() call on the store
    @returns {Boolean} YES if handled
  */
  destroyRecord: function(store, storeKey, params) {
    return NO ;
  }  
    
});

/* >>>>>>>>>> BEGIN source/data_sources/cascade.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('data_sources/data_source');

/** @class

  A cascading data source will actually forward requests onto an array of 
  additional data sources, stopping when one of the data sources returns YES,
  indicating that it handled the request.  
  
  You can use a cascading data source to tie together multiple data sources,
  treating them as a single namespace.
  
  h2. Configuring a Cascade Data Source
  
  You will usually define your cascading data source in your main method after
  all the classes you have are loaded.
  
  {{{
    MyApp.dataSource = SC.CascadeDataSource.create({
      dataSources: "prefs youtube photos".w(),
      
      prefs:   MyApp.PrefsDataSource.create({ root: "/prefs" }),
      youtube: YouTube.YouTubeDataSource.create({ apiKey: "123456" }),
      photos:  MyApp.PhotosDataSource.create({ root: "photos" })
      
    });
    
    MyApp.store.set('dataSource', MyApp.dataSource);
  }}}
  
  Note that the order you define your dataSources property will determine the
  order in which requests will cascade from the store.
  
  Alternatively, you can use a more jQuery-like API for defining your data
  sources:
  
  {{{
    MyApp.dataSource = SC.CascadeDataSource.create()
      .from(MyApp.PrefsDataSource.create({ root: "/prefs" }))
      .from(YouTube.YouTubeDataSource.create({ apiKey: "123456" }))
      .from(MyApp.PhotosDataSource.create({ root: "photos" }));

    MyApp.store.set('dataSource', MyApp.dataSource);
  }}}

  In this case, the order you call from() will determine the order the request
  will cascade.
  
  @extends SC.DataSource
  @since SproutCore 1.0
*/
SC.CascadeDataSource = SC.DataSource.extend( 
  /** @scope SC.CascadeDataSource.prototype */ {

  /**
    The data sources used by the cascade, in the order that they are to be 
    followed.  Usually when you define the cascade, you will define this
    array.
    
    @property {Array}
  */
  dataSources: null,

  /**
    Add a data source to the list of sources to use when cascading.  Used to
    build the data source cascade effect.

    @param {SC.DataSource} dataSource a data source instance to add.
    @returns {SC.CascadeDataSource} receiver
  */
  from: function(dataSource) {
    var dataSources = this.get('dataSources');
    if (!dataSources) this.set('dataSources', dataSources = []);
    dataSources.push(dataSource);
    return this ;
  },
    
  // ..........................................................
  // SC.STORE ENTRY POINTS
  // 
  
  /** @private - just cascades */
  fetch: function(store, query) {
    var sources = this.get('dataSources'), 
        len     = sources ? sources.length : 0,
        ret     = NO,
        cur, source, idx;
    
    for(idx=0; (ret !== YES) && idx<len; idx++) {
      source = sources.objectAt(idx);
      cur = source.fetch ? source.fetch.apply(source, arguments) : NO;
      ret = this._handleResponse(ret, cur);
    }
    
    return ret ;
  },
  
  
  /** @private - just cascades */
  retrieveRecords: function(store, storeKeys, ids) {
    var sources = this.get('dataSources'), 
        len     = sources ? sources.length : 0,
        ret     = NO,
        cur, source, idx;
    
    for(idx=0; (ret !== YES) && idx<len; idx++) {
      source = sources.objectAt(idx);
      cur = source.retrieveRecords.apply(source, arguments);
      ret = this._handleResponse(ret, cur);
    }
    
    return ret ;
  },

  /** @private - just cascades */
  commitRecords: function(store, createStoreKeys, updateStoreKeys, destroyStoreKeys) {
    var sources = this.get('dataSources'), 
        len     = sources ? sources.length : 0,
        ret     = NO,
        cur, source, idx;
    
    for(idx=0; (ret !== YES) && idx<len; idx++) {
      source = sources.objectAt(idx);
      cur = source.commitRecords.apply(source, arguments);
      ret = this._handleResponse(ret, cur);
    }
    
    return ret ;
  },

  /** @private - just cascades */
  cancel: function(store, storeKeys) {
    var sources = this.get('dataSources'), 
        len     = sources ? sources.length : 0,
        ret     = NO,
        cur, source, idx;
    
    for(idx=0; (ret !== YES) && idx<len; idx++) {
      source = sources.objectAt(idx);
      cur = source.cancel.apply(source, arguments);
      ret = this._handleResponse(ret, cur);
    }
    
    return ret ;
  },
  
  // ..........................................................
  // INTERNAL SUPPORT
  // 
  
  /** @private */
  init: function() {
    arguments.callee.base.apply(this,arguments);
    
    // if a dataSources array is defined, look for any strings and lookup 
    // the same on the data source.  Replace.
    var sources = this.get('dataSources'),
        idx     = sources ? sources.get('length') : 0,
        source;
    while(--idx>=0) {
      source = sources[idx];
      if (SC.typeOf(source) === SC.T_STRING) sources[idx] = this.get(source);
    }
    
  },

  /** @private - Determine the proper return value. */
  _handleResponse: function(current, response) {
    if (response === YES) return YES ;
    else if (current === NO) return (response === NO) ? NO : SC.MIXED_STATE ;
    else return SC.MIXED_STATE ;
  }
    
});

/* >>>>>>>>>> BEGIN source/models/record.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @class

  A Record is the core model class in SproutCore. It is analogous to 
  NSManagedObject in Core Data and EOEnterpriseObject in the Enterprise
  Objects Framework (aka WebObjects), or ActiveRecord::Base in Rails.
  
  To create a new model class, in your SproutCore workspace, do:
  
  {{{
    $ sc-gen model MyApp.MyModel
  }}}
  
  This will create MyApp.MyModel in clients/my_app/models/my_model.js.
  
  The core attributes hash is used to store the values of a record in a 
  format that can be easily passed to/from the server.  The values should 
  generally be stored in their raw string form.  References to external 
  records should be stored as primary keys.
  
  Normally you do not need to work with the attributes hash directly.  
  Instead you should use get/set on normal record properties.  If the 
  property is not defined on the object, then the record will check the 
  attributes hash instead.
  
  You can bulk update attributes from the server using the 
  updateAttributes() method.

  @extends SC.Object
  @since SproutCore 1.0
*/
SC.Record = SC.Object.extend(
/** @scope SC.Record.prototype */ {
  
  /**  
    Walk like a duck
  
    @property {Boolean}
  */
  isRecord: YES,
  
  /**
    If you have nested records
  */
  isParentRecord: NO,
  
  // ...............................
  // PROPERTIES
  //
  
  /**
    This is the primary key used to distinguish records.  If the keys
    match, the records are assumed to be identical.
    
    @property {String}
  */
  primaryKey: 'guid',
  
  /**
    Returns the id for the record instance.  The id is used to uniquely 
    identify this record instance from all others of the same type.  If you 
    have a primaryKey set on this class, then the id will be the value of the
    primaryKey property on the underlying JSON hash.
    
    @property {String}
  */
  id: function(key, value) {
    if (value !== undefined) {
      this.writeAttribute(this.get('primaryKey'), value);
      return value;
    } else {
      return SC.Store.idFor(this.storeKey);
    }
  }.property('storeKey').cacheable(),
  
  /**
    All records generally have a life cycle as they are created or loaded into 
    memory, modified, committed and finally destroyed.  This life cycle is 
    managed by the status property on your record. 

    The status of a record is modelled as a finite state machine.  Based on the 
    current state of the record, you can determine which operations are 
    currently allowed on the record and which are not.
    
    In general, a record can be in one of five primary states; SC.Record.EMPTY,
    SC.Record.BUSY, SC.Record.READY, SC.Record.DESTROYED, SC.Record.ERROR. 
    These are all described in more detail in the class mixin (below) where 
    they are defined.
    
    @property {Number}
  */
  status: function() {
    return this.store.readStatus(this.storeKey);
  }.property('storeKey').cacheable(),

  /**
    The store that owns this record.  All changes will be buffered into this
    store and committed to the rest of the store chain through here.
    
    This property is set when the record instance is created and should not be
    changed or else it will break the record behavior.
    
    @property {SC.Store}
  */
  store: null,

  /**
    This is the store key for the record, it is used to link it back to the 
    dataHash. If a record is reused, this value will be replaced.
    
    You should not edit this store key but you may sometimes need to refer to
    this store key when implementing a Server object.
    
    @property {Number}
  */
  storeKey: null,

  /** 
    YES when the record has been destroyed
    
    @property {Boolean}
  */
  isDestroyed: function() {
    return !!(this.get('status') & SC.Record.DESTROYED);  
  }.property('status').cacheable(),
  
  /**
    YES when the record is in an editable state.  You can use this property to
    quickly determine whether attempting to modify the record would raise an 
    exception or not.
    
    This property is both readable and writable.  Note however that if you 
    set this property to YES but the status of the record is anything but
    SC.Record.READY, the return value of this property may remain NO.
    
    @property {Boolean}
  */
  isEditable: function(key, value) {
    if (value !== undefined) this._screc_isEditable = value;
    if (this.get('status') & SC.Record.READY) return this._screc_isEditable;
    else return NO ;
  }.property('status').cacheable(),

  _screc_isEditable: YES, // default

  /**
    YES when the record's contents have been loaded for the first time.  You 
    can use this to quickly determine if the record is ready to display.
    
    @property {Boolean}
  */
  isLoaded: function() {
    var K = SC.Record, 
        status = this.get('status');
    return !((status===K.EMPTY) || (status===K.BUSY_LOADING) || (status===K.ERROR));
  }.property('status').cacheable(),
  
  /**
    If set, this should be an array of active relationship objects that need
    to be notified whenever the underlying record properties change.  
    Currently this is only used by toMany relationships, but you could 
    possibly patch into this yourself also if you are building your own 
    relationships.
    
    Note this must be a regular Array - NOT any object implementing SC.Array.
    
    @property {Array}
  */
  relationships: null,

  /**
    This will return the raw attributes that you can edit directly.  If you 
    make changes to this hash, be sure to call beginEditing() before you get
    the attributes and endEditing() afterwards.
  
    @property {Hash}
  **/
  attributes: function() {
    var store    = this.get('store'), 
        storeKey = this.storeKey;
    return store.readEditableDataHash(storeKey);
  }.property(),

  /**
    This will return the raw attributes that you cannot edit directly.  It is
    useful if you want to efficiently look at multiple attributes in bulk.  If
    you would like to edit the attributes, see the @attributes@ property
    instead.
  
    @property {Hash}
  **/
  readOnlyAttributes: function() {
    var store    = this.get('store'), 
        storeKey = this.storeKey,
        ret      = store.readDataHash(storeKey);
    
    if (ret) ret = SC.clone(ret, YES);

    return ret;
  }.property(),
  
  /**
   * The namespace which to retrieve the childRecord Types from
   */
  nestedRecordNamespace: null,
  
  /**
    Function that returns whether this is a nested Record
  */
  isNestedRecord: function(){
    var store = this.get('store'), ret,
        sk = this.get('storeKey'),
        prKey = store.parentStoreKeyExists(sk);
    
    ret = prKey ? YES : NO;
    return ret;
  }.property().cacheable(),
  
  parentRecord: function(){
    var sk = this.storeKey, store = this.get('store');
    return store.materializeParentRecord(sk);
  }.property(),
    
  // ...............................
  // CRUD OPERATIONS
  //

  /**
    Refresh the record from the persistent store.  If the record was loaded 
    from a persistent store, then the store will be asked to reload the 
    record data from the server.  If the record is new and exists only in 
    memory then this call will have no effect.
    
    @param {boolean} recordOnly, optional param if you want to only THIS record
      even if it is a child record.
    
    @returns {SC.Record} receiver
  */
  refresh: function(recordOnly) { 
    var store = this.get('store'), rec, ro,
        sk = this.get('storeKey'),
        prKey = store.parentStoreKeyExists();

    // If we only want to commit this record or it doesn't have a parent record
    // we will commit this record
    ro = recordOnly || (SC.none(recordOnly) && SC.none(prKey));
    if (ro){
      store.refreshRecord(null, null, sk);
    } else if (prKey){
      rec = store.materializeRecord(prKey);
      rec.refresh(recordOnly);
    }

    return this ;
  },
  
  /**
    Deletes the record along with any dependent records.  This will mark the 
    records destroyed in the store as well as changing the isDestroyed 
    property on the record to YES.  If this is a new record, this will avoid 
    creating the record in the first place.
    
    @param {boolean} recordOnly, optional param if you want to only THIS record
      even if it is a child record. 
    
    @returns {SC.Record} receiver
  */
  destroy: function(recordOnly) { 
    var store = this.get('store'), rec, ro,
        sk = this.get('storeKey'),
        prKey = store.parentStoreKeyExists();

    // If we only want to commit this record or it doesn't have a parent record
    // we will commit this record
    ro = recordOnly || (SC.none(recordOnly) && SC.none(prKey));
    if (ro){
      store.destroyRecord(null, null, sk);
      this.notifyPropertyChange('status');
      // If there are any aggregate records, we might need to propagate our new
      // status to them.
      this.propagateToAggregates();
      
    } else if (prKey){
      rec = store.materializeRecord(prKey);
      rec.destroy(recordOnly);
    }
    
    return this ;
  },

  /**
    You can invoke this method anytime you need to make the record as dirty.
    This will cause the record to be commited when you commitChanges()
    on the underlying store.
    
    If you use the writeAttribute() primitive, this method will be called for 
    you.
    
    If you pass the key that changed it will ensure that observers are fired
    only once for the changed property instead of allPropertiesDidChange()
    
    @param {String} key that changed (optional)
    @returns {SC.Record} receiver
  */
  recordDidChange: function(key) {
    
    // If we have a parent, they changed too!
    var p = this.get('parentRecord');
    if (p) p.recordDidChange();
    
    this.get('store').recordDidChange(null, null, this.get('storeKey'), key);
    this.notifyPropertyChange('status');

    // If there are any aggregate records, we might need to propagate our new
    // status to them.
    this.propagateToAggregates();

    return this ;
  },
  
  // ...............................
  // ATTRIBUTES
  //

  /** @private
    Current edit level.  Used to defer editing changes. 
  */
  _editLevel: 0 ,
  
  /**
    Defers notification of record changes until you call a matching 
    endEditing() method.  This method is called automatically whenever you
    set an attribute, but you can call it yourself to group multiple changes.
    
    Calls to beginEditing() and endEditing() can be nested.
    
    @returns {SC.Record} receiver
  */
  beginEditing: function() {
    this._editLevel++;
    return this ;
  },

  /**
    Notifies the store of record changes if this matches a top level call to
    beginEditing().  This method is called automatically whenever you set an
    attribute, but you can call it yourself to group multiple changes.
    
    Calls to beginEditing() and endEditing() can be nested.
    
    @param {String} key that changed (optional)
    @returns {SC.Record} receiver
  */
  endEditing: function(key) {
    if(--this._editLevel <= 0) {
      this._editLevel = 0; 
      this.recordDidChange(key);
    }
    return this ;
  },
  
  /**
    Reads the raw attribute from the underlying data hash.  This method does
    not transform the underlying attribute at all.
  
    @param {String} key the attribute you want to read
    @returns {Object} the value of the key, or undefined if it doesn't exist
  */
  readAttribute: function(key) {
    var store = this.get('store'), storeKey = this.storeKey;
    var attrs = store.readDataHash(storeKey);
    return attrs ? attrs[key] : undefined ; 
  },

  /**
    Updates the passed attribute with the new value.  This method does not 
    transform the value at all.  If instead you want to modify an array or 
    hash already defined on the underlying json, you should instead get 
    an editable version of the attribute using editableAttribute()
  
    @param {String} key the attribute you want to read
    @param {Object} value the value you want to write
    @param {Boolean} ignoreDidChange only set if you do NOT want to flag 
      record as dirty
    @returns {SC.Record} receiver
  */
  writeAttribute: function(key, value, ignoreDidChange) {
    var store    = this.get('store'), 
        storeKey = this.storeKey,
        attrs;
    
    attrs = store.readEditableDataHash(storeKey);
    if (!attrs) throw SC.Record.BAD_STATE_ERROR;

    // if value is the same, do not flag record as dirty
    if (value !== attrs[key]) {
      if(!ignoreDidChange) this.beginEditing();
      attrs[key] = value;
      
      // If the key is the primaryKey of the record, we need to tell the store
      // about the change.
      if (key===this.get('primaryKey')) {
        SC.Store.replaceIdFor(storeKey, value) ;
        this.propertyDidChange('id'); // Reset computed value
      }
      
      if(!ignoreDidChange) this.endEditing(key);
    }
    return this ;
  },
  
  /**
    This will also ensure that any aggregate records are also marked dirty
    if this record changes.
    
    Should not have to be called manually.
  */
  propagateToAggregates: function() {
    var storeKey = this.get('storeKey'),
        recordType = SC.Store.recordTypeFor(storeKey), 
        idx, len, key, val, recs;
    
    var aggregates = recordType.aggregates;
    
    // if recordType aggregates are not set up yet, make sure to 
    // create the cache first
    if (!aggregates) {
      var dataHash = this.get('store').readDataHash(storeKey);
      aggregates = [];
      for(var k in dataHash) {
        if(this[k] && this[k].get && this[k].get('aggregate')===YES) {
          aggregates.push(k);
        }
      }
      recordType.aggregates = aggregates;
    }
    
    // now loop through all aggregate properties and mark their related
    // record objects as dirty
    var K          = SC.Record,
        dirty      = K.DIRTY,
        readyNew   = K.READY_NEW,
        destroyed  = K.DESTROYED,
        readyClean = K.READY_CLEAN,
        iter;
        
    // If the child is dirty, then make sure the parent gets a dirty
    // status.  (If the child is created or destroyed, there's no need,
    // because the parent will dirty itself when it modifies that
    // relationship.)
    iter =  function(rec) {
      var childStatus, parentStatus;
      
      if (rec) { 
        childStatus = this.get('status');
        if ((childStatus & dirty)  ||  
            (childStatus & readyNew)  ||  (childStatus & destroyed)) {
          parentStatus = rec.get('status');
          if (parentStatus === readyClean) {
            // Note:  storeDidChangeProperties() won't put it in the
            //        changelog!
            rec.get('store').recordDidChange(rec.constructor, null, rec.get('storeKey'), null, YES);
          }
        }
      }
    };
        
    for(idx=0,len=aggregates.length;idx<len;++idx) {
      key = aggregates[idx];
      val = this.get(key);
      recs = SC.kindOf(val, SC.ManyArray) ? val : [val];
      recs.forEach(iter, this);
    }
  },
  
  /**
    Called by the store whenever the underlying data hash has changed.  This
    will notify any observers interested in data hash properties that they
    have changed.
    
    @param {Boolean} statusOnly changed
    @param {String} key that changed (optional)
    @returns {SC.Record} receiver
  */
  storeDidChangeProperties: function(statusOnly, keys) {
    // TODO:  Should this function call propagateToAggregates() at the
    //        appropriate times?
    if (statusOnly) this.notifyPropertyChange('status');
    else {      
      if (keys) {
        this.beginPropertyChanges();
        keys.forEach(function(k) { this.notifyPropertyChange(k); }, this);
        this.notifyPropertyChange('status'); 
        this.endPropertyChanges();

      } else this.allPropertiesDidChange(); 
    
      // also notify manyArrays
      var manyArrays = this.relationships,
          loc        = manyArrays ? manyArrays.length : 0 ;
      while(--loc>=0) manyArrays[loc].recordPropertyDidChange(keys);      
    }
  },
  
  /**
    Normalizing a record will ensure that the underlying hash conforms
    to the record attributes such as their types (transforms) and default 
    values. 
    
    This method will write the conforming hash to the store and return
    the materialized record.
    
    By normalizing the record, you can use .attributes() and be
    assured that it will conform to the defined model. For example, this
    can be useful in the case where you need to send a JSON representation
    to some server after you have used .createRecord(), since this method
    will enforce the 'rules' in the model such as their types and default
    values. You can also include null values in the hash with the 
    includeNull argument.
    
    @param {Boolean} includeNull will write empty (null) attributes
    @returns {SC.Record} the normalized record
  */
  
  normalize: function(includeNull) {    
    var primaryKey = this.primaryKey, 
        recordId   = this.get('id'), 
        store      = this.get('store'), 
        storeKey   = this.get('storeKey'), 
        key, valueForKey, typeClass, recHash, attrValue, normChild,  isRecord,
        isChild, defaultVal, keyForDataHash, attr;
      
    var dataHash = store.readEditableDataHash(storeKey) || {};
    dataHash[primaryKey] = recordId;
    recHash = store.readDataHash(storeKey);
    
    for (key in this) {
      // make sure property is a record attribute.
      valueForKey = this[key];
      if (valueForKey) {
        typeClass = valueForKey.typeClass;
        if (typeClass) {
          keyForDataHash = valueForKey.get('key') || key; // handle alt keys
          isRecord = SC.typeOf(typeClass.call(valueForKey))===SC.T_CLASS;
          isChild  = valueForKey.isNestedRecordTransform;
          if (!isRecord && !isChild) {
            attrValue = this.get(key);
            if(attrValue!==undefined || (attrValue===null && includeNull)) {
              attr = this[key];
              // if record attribute, make sure we transform with the fromType
              if(SC.instanceOf(attr, SC.RecordAttribute)) {
                attrValue = attr.fromType(this, key, attrValue);
              }
              dataHash[keyForDataHash] = attrValue;
            }
          
          } else if (isChild) {
            attrValue = this.get(key);

            // Sometimes a child attribute property does not refer to a child record.
            // Catch this and don't try to normalize.
            if (attrValue && attrValue.normalize) {
              attrValue.normalize();
            }
          } else if (isRecord) {
            attrValue = recHash[keyForDataHash];
            if (attrValue !== undefined) {
              // write value already there
              dataHash[keyForDataHash] = attrValue;
            } else {
              // or write default
              defaultVal = valueForKey.get('defaultValue');

              // computed default value
              if (SC.typeOf(defaultVal)===SC.T_FUNCTION) {
                dataHash[keyForDataHash] = defaultVal(this, key, defaultVal);
              } else {
                // plain value                
                dataHash[keyForDataHash] = defaultVal;
              }
            }
          }
        }
      }
    }

    return this;
  },

  
  
  /**
    If you try to get/set a property not defined by the record, then this 
    method will be called. It will try to get the value from the set of 
    attributes.
    
    This will also check is ignoreUnknownProperties is set on the recordType
    so that they will not be written to dataHash unless explicitly defined
    in the model schema.
  
    @param {String} key the attribute being get/set
    @param {Object} value the value to set the key to, if present
    @returns {Object} the value
  */
  unknownProperty: function(key, value) {
    
    if (value !== undefined) {
      
      // first check if we should ignore unknown properties for this 
      // recordType
      var storeKey = this.get('storeKey'),
        recordType = SC.Store.recordTypeFor(storeKey);
      
      if(recordType.ignoreUnknownProperties===YES) {
        this[key] = value;
        return value;
      }
      
      // if we're modifying the PKEY, then SC.Store needs to relocate where 
      // this record is cached. store the old key, update the value, then let 
      // the store do the housekeeping...
      var primaryKey = this.get('primaryKey');
      this.writeAttribute(key,value);

      // update ID if needed
      if (key === primaryKey) {
        SC.Store.replaceIdFor(storeKey, value);
      }
      
    }
    return this.readAttribute(key);
  },
  
  /**
    Lets you commit this specific record to the store which will trigger
    the appropriate methods in the data source for you.
    
    @param {Hash} params optional additonal params that will passed down
      to the data source
    @param {boolean} recordOnly, optional param if you want to only commit a single
      record if it has a parent.
    @returns {SC.Record} receiver
  */
  commitRecord: function(params, recordOnly) {    
    var store = this.get('store'), rec, ro,
        sk = this.get('storeKey'),
        prKey = store.parentStoreKeyExists();
    
    // If we only want to commit this record or it doesn't have a parent record
    // we will commit this record
    ro = recordOnly || (SC.none(recordOnly) && SC.none(prKey));
    if (ro){
      store.commitRecord(undefined, undefined, this.get('storeKey'), params);
    } else if (prKey){
      rec = store.materializeRecord(prKey);
      rec.commitRecord(params, recordOnly);
    }
    
    return this ;
  },
  
  // ..........................................................
  // EMULATE SC.ERROR API
  // 
  
  /**
    Returns YES whenever the status is SC.Record.ERROR.  This will allow you 
    to put the UI into an error state.
    
    @property {Boolean}
  */
  isError: function() {
    return this.get('status') & SC.Record.ERROR;
  }.property('status').cacheable(),

  /**
    Returns the receiver if the record is in an error state.  Returns null
    otherwise.
    
    @property {SC.Record}
  */
  errorValue: function() {
    return this.get('isError') ? SC.val(this.get('errorObject')) : null ;
  }.property('isError').cacheable(),
  
  /**
    Returns the current error object only if the record is in an error state.
    If no explicit error object has been set, returns SC.Record.GENERIC_ERROR.
    
    @property {SC.Error}
  */
  errorObject: function() {
    if (this.get('isError')) {
      var store = this.get('store');
      return store.readError(this.get('storeKey')) || SC.Record.GENERIC_ERROR;
    } else return null ;
  }.property('isError').cacheable(),
  
  // ...............................
  // PRIVATE
  //
  
  /** @private
    Sets the key equal to value.

    This version will first check to see if the property is an
    SC.RecordAttribute, and if so, will ensure that its isEditable property
    is YES before attempting to change the value.

    @param key {String} the property to set
    @param value {Object} the value to set or null.
    @returns {SC.Record}
  */
  set: function(key, value) {
    var func = this[key];

    if (func && func.isProperty && func.get && !func.get('isEditable')) {
      return this;
    }
    return arguments.callee.base.apply(this,arguments);
  },

  /** @private
    Creates string representation of record, with status.
    
    @returns {String}
  */
  
  toString: function() {
    // We won't use 'readOnlyAttributes' here because accessing them directly
    // avoids a SC.clone() -- we'll be careful not to edit anything.
    var attrs = this.get('store').readDataHash(this.get('storeKey'));
    return "%@(%@) %@".fmt(this.constructor.toString(), SC.inspect(attrs), this.statusString());
  },
  
  /** @private
    Creates string representation of record, with status.
    
    @returns {String}
  */
  
  statusString: function() {
    var ret = [], status = this.get('status');
    
    for(var prop in SC.Record) {
      if(prop.match(/[A-Z_]$/) && SC.Record[prop]===status) {
        ret.push(prop);
      }
    }
    
    return ret.join(" ");
  },
  
  /**
    Registers a child record with this parent record.

    If the parent already knows about the child record, return the cached
    instance. If not, create the child record instance and add it to the child
    record cache.

    @param {Hash} value The hash of attributes to apply to the child record.
    @param {Integer} key The store key that we are asking for
   */
  registerNestedRecord: function(value, key, path) {
    var store, psk, csk, childRecord, recordType;
    
    // if no path is entered it must be the key
    if (SC.none(path)) path = key;
    // if a record instance is passed, simply use the storeKey.  This allows 
    // you to pass a record from a chained store to get the same record in the
    // current store.
    if (value && value.get && value.get('isRecord')) {
      childRecord = value;
    } 
    else {
      recordType = this._materializeNestedRecordType(value, key);
      childRecord = this.createNestedRecord(recordType, value);
    }
    if (childRecord){
      this.isParentRecord = YES;
      store = this.get('store');
      psk = this.get('storeKey');
      csk = childRecord.get('storeKey');
      store.registerChildToParent(psk, csk, path);
    }
      
    return childRecord;
  },
  
  /**
     private method that retrieves the recordType from the hash that is provided.

     Important for use in polymorphism but you must have the following items in the
     parent record:
     
     nestedRecordNamespace <= this is the object that has the SC.Records defined

     @param {Hash} value The hash of attributes to apply to the child record.
     @param {String} key the name of the key on the attribute
    */
  _materializeNestedRecordType: function(value, key){
    var childNS, recordType, ret;

    // Get the record type, first checking the "type" property on the hash.
    if (SC.typeOf(value) === SC.T_HASH) {
      // Get the record type.
      childNS = this.get('nestedRecordNamespace');
      if (value.type && !SC.none(childNS)) {
        recordType = childNS[value.type];
      }
    }

    // Maybe it's not a hash or there was no type property.
    if (!recordType && key && this[key]) {
      recordType = this[key].get('typeClass');
    }

    // When all else fails throw and exception.
    if (!recordType || !SC.kindOf(recordType, SC.Record)) {
      throw 'SC.Child: Error during transform: Invalid record type.';
    }

    return recordType;
  },
  
  /**
    Creates a new nested record instance.

    @param {SC.Record} recordType The type of the nested record to create.
    @param {Hash} hash The hash of attributes to apply to the child record.
    (may be null)
   */
  createNestedRecord: function(recordType, hash) {
    var store, id, sk, pk, cr = null, existingId = null;
    SC.run(function() {
      hash = hash || {}; // init if needed
      
      existingId = hash[recordType.prototype.primaryKey];
      
      store = this.get('store');
      if (SC.none(store)) throw 'Error: during the creation of a child record: NO STORE ON PARENT!';
      
      if (!id && (pk = recordType.prototype.primaryKey)) {
        id = hash[pk];
        // In case there isnt a primary key supplied then we create on
        // on the fly
        sk = id ? store.storeKeyExists(recordType, id) : null;
        if (sk){
          store.writeDataHash(sk, hash);
          cr = store.materializeRecord(sk);
        } else {
          cr = store.createRecord(recordType, hash) ;
          if (SC.none(id)){
            sk = cr.get('storeKey');
            id = 'cr'+sk;
            SC.Store.replaceIdFor(sk, id);
            hash = store.readEditableDataHash(sk);
            hash[pk] = id;
          }
        }
        
      }
      
      // ID processing if necessary
      if (SC.none(existingId) && this.generateIdForChild) this.generateIdForChild(cr);

    }, this);

    return cr;
  },
  
  _nestedRecordKey: 0,
    
  /**
   * Override this function if you want to have a special way of creating 
   * ids for your child records
   */
  generateIdForChild: function(childRecord){}
     
}) ;

// Class Methods
SC.Record.mixin( /** @scope SC.Record */ {

  /**
    Whether to ignore unknown properties when they are being set on the record
    object. This is useful if you want to strictly enforce the model schema
    and not allow dynamically expanding it by setting new unknown properties
    
    @property {Boolean}
  */
  ignoreUnknownProperties: NO,

  // ..........................................................
  // CONSTANTS
  // 

  /** 
    Generic state for records with no local changes.
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  CLEAN:            0x0001, // 1

  /** 
    Generic state for records with local changes.
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  DIRTY:            0x0002, // 2
  
  /** 
    State for records that are still loaded.  
    
    A record instance should never be in this state.  You will only run into 
    it when working with the low-level data hash API on SC.Store. Use a 
    logical AND (single &) to test record status
  
    @property {Number}
  */
  EMPTY:            0x0100, // 256

  /** 
    State for records in an error state.
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  ERROR:            0x1000, // 4096
  
  /** 
    Generic state for records that are loaded and ready for use
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  READY:            0x0200, // 512

  /** 
    State for records that are loaded and ready for use with no local changes
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  READY_CLEAN:      0x0201, // 513


  /** 
    State for records that are loaded and ready for use with local changes
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  READY_DIRTY:      0x0202, // 514


  /** 
    State for records that are new - not yet committed to server
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  READY_NEW:        0x0203, // 515
  

  /** 
    Generic state for records that have been destroyed
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  DESTROYED:        0x0400, // 1024


  /** 
    State for records that have been destroyed and committed to server
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  DESTROYED_CLEAN:  0x0401, // 1025


  /** 
    State for records that have been destroyed but not yet committed to server
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  DESTROYED_DIRTY:  0x0402, // 1026
  

  /** 
    Generic state for records that have been submitted to data source
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  BUSY:             0x0800, // 2048


  /** 
    State for records that are still loading data from the server
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  BUSY_LOADING:     0x0804, // 2052


  /** 
    State for new records that were created and submitted to the server; 
    waiting on response from server
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  BUSY_CREATING:    0x0808, // 2056


  /** 
    State for records that have been modified and submitted to server
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  BUSY_COMMITTING:  0x0810, // 2064


  /** 
    State for records that have requested a refresh from the server.
    
    Use a logical AND (single &) to test record status.
  
    @property {Number}
  */
  BUSY_REFRESH:     0x0820, // 2080


  /** 
    State for records that have requested a refresh from the server.
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  BUSY_REFRESH_CLEAN:  0x0821, // 2081

  /** 
    State for records that have requested a refresh from the server.
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  BUSY_REFRESH_DIRTY:  0x0822, // 2082

  /** 
    State for records that have been destroyed and submitted to server
    
    Use a logical AND (single &) to test record status
  
    @property {Number}
  */
  BUSY_DESTROYING:  0x0840, // 2112


  // ..........................................................
  // ERRORS
  // 
  
  /**
    Error for when you try to modify a record while it is in a bad 
    state.
    
    @property {SC.Error}
  */
  BAD_STATE_ERROR:     SC.$error("Internal barf Inconsistency"),

  /**
    Error for when you try to create a new record that already exists.
    
    @property {SC.Error}
  */
  RECORD_EXISTS_ERROR: SC.$error("Record Exists"),

  /**
    Error for when you attempt to locate a record that is not found
    
    @property {SC.Error}
  */
  NOT_FOUND_ERROR:     SC.$error("Not found "),

  /**
    Error for when you try to modify a record that is currently busy
    
    @property {SC.Error}
  */
  BUSY_ERROR:          SC.$error("Busy"),

  /**
    Generic unknown record error
    
    @property {SC.Error}
  */
  GENERIC_ERROR:       SC.$error("Generic Error"),
  
  /**
   * The next child key to allocate.  A nextChildKey must always be greater than 0.
   */
  _nextChildKey: 0,
  
  // ..........................................................
  // CLASS METHODS
  // 
  
  /**
    Helper method returns a new SC.RecordAttribute instance to map a simple
    value or to-one relationship.  At the very least, you should pass the 
    type class you expect the attribute to have.  You may pass any additional
    options as well.
    
    Use this helper when you define SC.Record subclasses. 
    
    h4. Example
    
    {{{
      MyApp.Contact = SC.Record.extend({
        firstName: SC.Record.attr(String, { isRequired: YES })
      });
    }}}
    
    @param {Class} type the attribute type
    @param {Hash} opts the options for the attribute
    @returns {SC.RecordAttribute} created instance
  */
  attr: function(type, opts) { 
    return SC.RecordAttribute.attr(type, opts); 
  },
  
  /**
    Returns an SC.RecordAttribute that describes a fetched attribute.  When 
    you reference this attribute, it will return an SC.RecordArray that uses
    the type as the fetch key and passes the attribute value as a param.
    
    Use this helper when you define SC.Record subclasses. 
    
    h4. Example
    
    {{{
      MyApp.Group = SC.Record.extend({
        contacts: SC.Record.fetch('MyApp.Contact')
      });
    }}}
    
    @param {SC.Record|String} recordType The type of records to load
    @param {Hash} opts the options for the attribute
    @returns {SC.RecordAttribute} created instance
  */
  fetch: function(recordType, opts) {
    return SC.FetchedAttribute.attr(recordType, opts) ;
  },
  
  /**
    Returns:
    
    1: SC.ManyAttribute that describes a record array backed by an 
    array of guids stored in the underlying JSON.  
    2: SC.ChildrenAttribute that describes a record array backed by a
    array of hashes.
    
    You can edit the contents of this relationship.
    
    For SC.ManyAttribute, If you set the inverse and isMaster: NO key, 
    then editing this array will modify the underlying data, but the 
    inverse key on the matching record will also be edited and that 
    record will be marked as needing a change.
    
    @param {SC.Record|String} recordType The type of record to create
    @param {Hash} opts the options for the attribute
    @returns {SC.ManyAttribute|SC.ChildrenAttribute} created instance
  */
  toMany: function(recordType, opts) {
    opts = opts || {};
    var isNested = opts.nested || opts.isNested;
    var attr;
    if(isNested){
      attr = SC.ChildrenAttribute.attr(recordType, opts);
    }
    else {
      attr = SC.ManyAttribute.attr(recordType, opts);
    }
    return attr;
  },
  
  /**
    Returns:
    1. SC.SingleAttribute that converts the underlying ID to a single
    record.  If you modify this property, it will rewrite the underyling ID. 
    It will also modify the inverse of the relationship, if you set it.
    
    2. SC.ChildAttribute that you can edit the contents
    of this relationship.
    
    @param {SC.Record|String} recordType the type of the record to create
    @param {Hash} opts additional options
    @returns {SC.SingleAttribute|SC.ChildAttribute} created instance
  */
  toOne: function(recordType, opts) {
    opts = opts || {};
    var isNested = opts.nested || opts.isNested;
    var attr;
    if(isNested){
      attr = SC.ChildAttribute.attr(recordType, opts);
    }
    else {
      attr = SC.SingleAttribute.attr(recordType, opts);
    }
    return attr;
  },
  
  /**
    Returns all storeKeys mapped by Id for this record type.  This method is
    used mostly by the SC.Store and the Record to coordinate.  You will rarely
    need to call this method yourself.
    
    @returns {Hash}
  */
  storeKeysById: function() {
    var key = SC.keyFor('storeKey', SC.guidFor(this)),
        ret = this[key];
    if (!ret) ret = this[key] = {};
    return ret;
  },
  
  /**
    Given a primaryKey value for the record, returns the associated
    storeKey.  If the primaryKey has not been assigned a storeKey yet, it 
    will be added.
    
    For the inverse of this method see SC.Store.idFor() and 
    SC.Store.recordTypeFor().
    
    @param {String} id a record id
    @returns {Number} a storeKey.
  */
  storeKeyFor: function(id) {
    var storeKeys = this.storeKeysById(),
        ret       = storeKeys[id];
    
    if (!ret) {
      ret = SC.Store.generateStoreKey();
      SC.Store.idsByStoreKey[ret] = id ;
      SC.Store.recordTypesByStoreKey[ret] = this ;
      storeKeys[id] = ret ;
    }
    
    return ret ;
  },
  
  /**
    Given a primaryKey value for the record, returns the associated
    storeKey.  As opposed to storeKeyFor() however, this method
    will NOT generate a new storeKey but returned undefined.
    
    @param {String} id a record id
    @returns {Number} a storeKey.
  */
  storeKeyExists: function(id) {
    var storeKeys = this.storeKeysById(),
        ret       = storeKeys[id];
    
    return ret ;
  },

  /** 
    Returns a record with the named ID in store.
    
    @param {SC.Store} store the store
    @param {String} id the record id or a query
    @returns {SC.Record} record instance
  */
  find: function(store, id) {
    return store.find(this, id);
  },
  
  /** @private - enhance extend to notify SC.Query as well. */
  extend: function() {
    var ret = SC.Object.extend.apply(this, arguments);
    SC.Query._scq_didDefineRecordType(ret);
    return ret ;
  }
}) ;

/* >>>>>>>>>> BEGIN source/data_sources/fixtures.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('data_sources/data_source');
sc_require('models/record');

/** @class

  TODO: Describe Class
  
  @extends SC.DataSource
  @since SproutCore 1.0
*/
SC.FixturesDataSource = SC.DataSource.extend(
  /** @scope SC.FixturesDataSource.prototype */ {

  /**
    If YES then the data source will asynchronously respond to data requests
    from the server.  If you plan to replace the fixture data source with a 
    data source that talks to a real remote server (using Ajax for example),
    you should leave this property set to YES so that Fixtures source will
    more accurately simulate your remote data source.

    If you plan to replace this data source with something that works with 
    local storage, for example, then you should set this property to NO to 
    accurately simulate the behavior of your actual data source.
    
    @property {Boolean}
  */
  simulateRemoteResponse: NO,
  
  /**
    If you set simulateRemoteResponse to YES, then the fixtures source will
    assume a response latency from your server equal to the msec specified
    here.  You should tune this to simulate latency based on the expected 
    performance of your server network.  Here are some good guidelines:
    
    - 500: Simulates a basic server written in PHP, Ruby, or Python (not twisted) without a CDN in front for caching.
    - 250: (Default) simulates the average latency needed to go back to your origin server from anywhere in the world.  assumes your servers itself will respond to requests < 50 msec
    - 100: simulates the latency to a "nearby" server (i.e. same part of the world).  Suitable for simulating locally hosted servers or servers with multiple data centers around the world.
    - 50: simulates the latency to an edge cache node when using a CDN.  Life is really good if you can afford this kind of setup.
    
    @property {Number}
  */
  latency: 50,
  
  // ..........................................................
  // CANCELLING
  // 
  
  /** @private */
  cancel: function(store, storeKeys) {
    return NO;
  },
  
  
  // ..........................................................
  // FETCHING
  // 
  
  /** @private */
  fetch: function(store, query) {
    
    // can only handle local queries out of the box
    if (query.get('location') !== SC.Query.LOCAL) {
      throw SC.$error('SC.Fixture data source can only fetch local queries');
    }

    if (!query.get('recordType') && !query.get('recordTypes')) {
      throw SC.$error('SC.Fixture data source can only fetch queries with one or more record types');
    }
    
    if (this.get('simulateRemoteResponse')) {
      this.invokeLater(this._fetch, this.get('latency'), store, query);
      
    } else this._fetch(store, query);
  },
  
  /** @private
    Actually performs the fetch.  
  */
  _fetch: function(store, query) {
    
    // NOTE: Assumes recordType or recordTypes is defined.  checked in fetch()
    var recordType = query.get('recordType'),
        recordTypes = query.get('recordTypes') || [recordType];
        
    // load fixtures for each recordType
    recordTypes.forEach(function(recordType) {
      if (SC.typeOf(recordType) === SC.T_STRING) {
        recordType = SC.objectForPropertyPath(recordType);
      }
      
      if (recordType) this.loadFixturesFor(store, recordType);
    }, this);
    
    // notify that query has now loaded - puts it into a READY state
    store.dataSourceDidFetchQuery(query);
  },
  
  // ..........................................................
  // RETRIEVING
  // 
  
  /** @private */
  retrieveRecords: function(store, storeKeys) {
    // first let's see if the fixture data source can handle any of the
    // storeKeys
    var latency = this.get('latency'),
        ret     = this.hasFixturesFor(storeKeys) ;
    if (!ret) return ret ;
    
    if (this.get('simulateRemoteResponse')) {
      this.invokeLater(this._retrieveRecords, latency, store, storeKeys);
    } else this._retrieveRecords(store, storeKeys);
    
    return ret ;
  },
  
  _retrieveRecords: function(store, storeKeys) {
    
    storeKeys.forEach(function(storeKey) {
      var ret        = [], 
          recordType = SC.Store.recordTypeFor(storeKey),
          id         = store.idFor(storeKey),
          hash       = this.fixtureForStoreKey(store, storeKey);
      ret.push(storeKey);
      store.dataSourceDidComplete(storeKey, hash, id);
    }, this);
  },
  
  // ..........................................................
  // UPDATE
  // 
  
  /** @private */
  updateRecords: function(store, storeKeys, params) {
    // first let's see if the fixture data source can handle any of the
    // storeKeys
    var latency = this.get('latency'),
        ret     = this.hasFixturesFor(storeKeys) ;
    if (!ret) return ret ;
    
    if (this.get('simulateRemoteResponse')) {
      this.invokeLater(this._updateRecords, latency, store, storeKeys);
    } else this._updateRecords(store, storeKeys);
    
    return ret ;
  },
  
  _updateRecords: function(store, storeKeys) {
    storeKeys.forEach(function(storeKey) {
      var hash = store.readDataHash(storeKey);
      this.setFixtureForStoreKey(store, storeKey, hash);
      store.dataSourceDidComplete(storeKey);  
    }, this);
  },


  // ..........................................................
  // CREATE RECORDS
  // 
  
  /** @private */
  createRecords: function(store, storeKeys, params) {
    // first let's see if the fixture data source can handle any of the
    // storeKeys
    var latency = this.get('latency');
    
    if (this.get('simulateRemoteResponse')) {
      this.invokeLater(this._createRecords, latency, store, storeKeys);
    } else this._createRecords(store, storeKeys);
    
    return YES ;
  },

  _createRecords: function(store, storeKeys) {
    storeKeys.forEach(function(storeKey) {
      var id         = store.idFor(storeKey),
          recordType = store.recordTypeFor(storeKey),
          dataHash   = store.readDataHash(storeKey), 
          fixtures   = this.fixturesFor(recordType);

      if (!id) id = this.generateIdFor(recordType, dataHash, store, storeKey);
      this._invalidateCachesFor(recordType, storeKey, id);
      fixtures[id] = dataHash;

      store.dataSourceDidComplete(storeKey, null, id);
    }, this);
  },

  // ..........................................................
  // DESTROY RECORDS
  // 
  
  /** @private */
  destroyRecords: function(store, storeKeys, params) {
    // first let's see if the fixture data source can handle any of the
    // storeKeys
    var latency = this.get('latency'),
        ret     = this.hasFixturesFor(storeKeys) ;
    if (!ret) return ret ;
    
    if (this.get('simulateRemoteResponse')) {
      this.invokeLater(this._destroyRecords, latency, store, storeKeys);
    } else this._destroyRecords(store, storeKeys);
    
    return ret ;
  },
  

  _destroyRecords: function(store, storeKeys) {
    storeKeys.forEach(function(storeKey) {
      var id         = store.idFor(storeKey),
          recordType = store.recordTypeFor(storeKey),
          fixtures   = this.fixturesFor(recordType);

      this._invalidateCachesFor(recordType, storeKey, id);
      if (id) delete fixtures[id];
      store.dataSourceDidDestroy(storeKey);  
    }, this);
  },
  
  // ..........................................................
  // INTERNAL METHODS/PRIMITIVES
  // 

  /**
    Load fixtures for a given fetchKey into the store
    and push it to the ret array.
    
    @param {SC.Store} store the store to load into
    @param {SC.Record} recordType the record type to load
    @param {SC.Array} ret is passed, array to add loaded storeKeys to.
    @returns {SC.Fixture} receiver
  */
  loadFixturesFor: function(store, recordType, ret) {
    var hashes   = [],
        dataHashes, i, storeKey ;
    
    dataHashes = this.fixturesFor(recordType);
    
    for(i in dataHashes){
      storeKey = recordType.storeKeyFor(i);
      if (store.peekStatus(storeKey) === SC.Record.EMPTY) {
        hashes.push(dataHashes[i]);
      }
      if (ret) ret.push(storeKey);
    }

    // only load records that were not already loaded to avoid infinite loops
    if (hashes && hashes.length>0) store.loadRecords(recordType, hashes);
    
    return this ;
  },
  

  /**
    Generates an id for the passed record type.  You can override this if 
    needed.  The default generates a storekey and formats it as a string.
    
    @param {Class} recordType Subclass of SC.Record
    @param {Hash} dataHash the data hash for the record
    @param {SC.Store} store the store 
    @param {Number} storeKey store key for the item
    @returns {String}
  */
  generateIdFor: function(recordType, dataHash, store, storeKey) {
    return "@id%@".fmt(SC.Store.generateStoreKey());
  },
  
  /**
    Based on the storeKey it returns the specified fixtures
    
    @param {SC.Store} store the store 
    @param {Number} storeKey the storeKey
    @returns {Hash} data hash or null
  */
  fixtureForStoreKey: function(store, storeKey) {
    var id         = store.idFor(storeKey),
        recordType = store.recordTypeFor(storeKey),
        fixtures   = this.fixturesFor(recordType);
    return fixtures ? fixtures[id] : null;
  },
  
  /**
    Update the data hash fixture for the named store key.  
    
    @param {SC.Store} store the store 
    @param {Number} storeKey the storeKey
    @param {Hash} dataHash 
    @returns {SC.FixturesDataSource} receiver
  */
  setFixtureForStoreKey: function(store, storeKey, dataHash) {
    var id         = store.idFor(storeKey),
        recordType = store.recordTypeFor(storeKey),
        fixtures   = this.fixturesFor(recordType);
    this._invalidateCachesFor(recordType, storeKey, id);
    fixtures[id] = dataHash;
    return this ;
  },
  
  /** 
    Get the fixtures for the passed record type and prepare them if needed.
    Return cached value when complete.
    
    @param {SC.Record} recordType
    @returns {Hash} data hashes
  */
  fixturesFor: function(recordType) {
    // get basic fixtures hash.
    if (!this._fixtures) this._fixtures = {};
    var fixtures = this._fixtures[SC.guidFor(recordType)];
    if (fixtures) return fixtures ; 
    
    // need to load fixtures.
    var dataHashes = recordType ? recordType.FIXTURES : null,
        len        = dataHashes ? dataHashes.length : 0,
        primaryKey = recordType ? recordType.prototype.primaryKey : 'guid',
        idx, dataHash, id ;

    this._fixtures[SC.guidFor(recordType)] = fixtures = {} ; 
    for(idx=0;idx<len;idx++) {      
      dataHash = dataHashes[idx];
      id = dataHash[primaryKey];
      if (!id) id = this.generateIdFor(recordType, dataHash); 
      fixtures[id] = dataHash;
    }  
    return fixtures;
  },
  
  /**
    Returns YES if fixtures for a given recordType have already been loaded
    
    @param {SC.Record} recordType
    @returns {Boolean} storeKeys
  */
  fixturesLoadedFor: function(recordType) {
    if (!this._fixtures) return NO;
    var ret = [], fixtures = this._fixtures[SC.guidFor(recordType)];
    return fixtures ? YES: NO;
  },
  
  /**
    Returns YES or SC.MIXED_STATE if one or more of the storeKeys can be 
    handled by the fixture data source.
    
    @param {Array} storeKeys the store keys
    @returns {Boolean} YES if all handled, MIXED_STATE if some handled
  */
  hasFixturesFor: function(storeKeys) {
    var ret = NO ;
    storeKeys.forEach(function(storeKey) {
      if (ret !== SC.MIXED_STATE) {
        var recordType = SC.Store.recordTypeFor(storeKey),
            fixtures   = recordType ? recordType.FIXTURES : null ;
        if (fixtures && fixtures.length && fixtures.length>0) {
          if (ret === NO) ret = YES ;
        } else if (ret === YES) ret = SC.MIXED_STATE ;
      }
    }, this);
    
    return ret ;
  },
  
  /** @private
    Invalidates any internal caches based on the recordType and optional 
    other parameters.  Currently this only invalidates the storeKeyCache used
    for fetch, but it could invalidate others later as well.
    
    @param {SC.Record} recordType the type of record modified
    @param {Number} storeKey optional store key
    @param {String} id optional record id
    @returns {SC.FixturesDataSource} receiver
  */
  _invalidateCachesFor: function(recordType, storeKey, id) {
    var cache = this._storeKeyCache;
    if (cache) delete cache[SC.guidFor(recordType)];
    return this ;
  }
  
});

/**
  Default fixtures instance for use in applications.
  
  @property {SC.FixturesDataSource}
*/
SC.Record.fixtures = SC.FixturesDataSource.create();

/* >>>>>>>>>> BEGIN source/models/record_attribute.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('models/record');

/** @class

  A RecordAttribute describes a single attribute on a record.  It is used to
  generate computed properties on records that can automatically convert data
  types and verify data.
  
  When defining an attribute on an SC.Record, you can configure it this way: 
  
  {{{
    title: SC.Record.attr(String, { 
      defaultValue: 'Untitled',
      isRequired: YES|NO
    })
  }}}
  
  In addition to having predefined transform types, there is also a way to 
  set a computed relationship on an attribute. A typical example of this would
  be if you have record with a parentGuid attribute, but are not able to 
  determine which record type to map to before looking at the guid (or any
  other attributes). To set up such a computed property, you can attach a 
  function in the attribute definition of the SC.Record subclass:
  
  {{{
    relatedToComputed: SC.Record.toOne(function() {
      return (this.readAttribute('relatedToComputed').indexOf("foo")==0) ? MyApp.Foo : MyApp.Bar;
    })
  }}}
  
  Notice that we are not using .get() to avoid another transform which would 
  trigger an infinite loop.
  
  You usually will not work with RecordAttribute objects directly, though you
  may extend the class in any way that you like to create a custom attribute.

  A number of default RecordAttribute types are defined on the SC.Record.
  
  @extends SC.Object
  @since SproutCore 1.0
*/
SC.RecordAttribute = SC.Object.extend(
  /** @scope SC.RecordAttribute.prototype */ {
  /**
    Walk like a duck.

    @property {Boolean}
  */
  isRecordAttribute: YES,

  /**
    The default value.  If attribute is null or undefined, this default value
    will be substituted instead.  Note that defaultValues are not converted
    so the value should be in the output type expected by the attribute.
    
    If you use a defaultValue function, the arguments given to it is the
    record instance and the key.
    
    @property {Object|function}
  */
  defaultValue: null,
  
  /**
    The attribute type.  Must be either an object class or a property path
    naming a class.  The built in handler allows all native types to pass 
    through, converts records to ids and dates to UTF strings.
    
    If you use the attr() helper method to create a RecordAttribute instance,
    it will set this property to the first parameter you pass.
    
    @property {Object|String}
  */
  type: String,
  
  /**
    The underlying attribute key name this attribute should manage.  If this
    property is left empty, then the key will be whatever property name this
    attribute assigned to on the record.  If you need to provide some kind
    of alternate mapping, this provides you a way to override it.
    
    @property {String}
  */
  key: null,
  
  /**
    If YES, then the attribute is required and will fail validation unless
    the property is set to a non-null or undefined value.
    
    @property {Boolean}
  */
  isRequired: NO,
  
  /**
    If NO then attempts to edit the attribute will be ignored.
    
    @property {Boolean}
  */
  isEditable: YES,  
  
  /**
    If set when using the Date format, expect the ISO8601 date format.  
    This is the default.
    
    @property {Boolean}
  */
  useIsoDate: YES,
  
  /**
    Can only be used for toOne or toMany relationship attributes. If YES,
    this flag will ensure that any related objects will also be marked
    dirty when this record dirtied. 
    
    Useful when you might have multiple related objects that you want to 
    consider in an 'aggregated' state. For instance, by changing a child
    object (image) you might also want to automatically mark the parent 
    (album) dirty as well.
    
    @property {Boolean}
  */
  aggregate: NO,
  
  // ..........................................................
  // HELPER PROPERTIES
  // 
  
  /**
    Returns the type, resolved to a class.  If the type property is a regular
    class, returns the type unchanged.  Otherwise attempts to lookup the 
    type as a property path.
    
    @property {Object}
  */
  typeClass: function() {
    var ret = this.get('type');
    if (SC.typeOf(ret) === SC.T_STRING) ret = SC.objectForPropertyPath(ret);
    return ret ;
  }.property('type').cacheable(),
  
  /**
    Finds the transform handler. 
    
    @property {Function}
  */
  transform: function() {
    var klass      = this.get('typeClass') || String,
        transforms = SC.RecordAttribute.transforms,
        ret ;
        
    // walk up class hierarchy looking for a transform handler
    while(klass && !(ret = transforms[SC.guidFor(klass)])) {
      // check if super has create property to detect SC.Object's
      if(klass.superclass.hasOwnProperty('create')) klass = klass.superclass ;
      // otherwise return the function transform handler
      else klass = SC.T_FUNCTION ;
    }
    
    return ret ;
  }.property('typeClass').cacheable(),
  
  // ..........................................................
  // LOW-LEVEL METHODS
  // 
  
  /** 
    Converts the passed value into the core attribute value.  This will apply 
    any format transforms.  You can install standard transforms by adding to
    the SC.RecordAttribute.transforms hash.  See 
    SC.RecordAttribute.registerTransform() for more.
    
    @param {SC.Record} record the record instance
    @param {String} key the key used to access this attribute on the record
    @param {Object} value the property value
    @returns {Object} attribute value
  */
  toType: function(record, key, value) {
    var transform = this.get('transform'),
        type      = this.get('typeClass'),
        children;
    
    if (transform && transform.to) {
      value = transform.to(value, this, type, record, key) ;
      
      // if the transform needs to do something when its children change, we need to set up an observer for it
      if(!SC.none(value) && (children = transform.observesChildren)) {
        var i, len = children.length,
        // store the record, transform, and key so the observer knows where it was called from
        context = {
          record: record,
          key: key
        };
        
        for(i = 0; i < len; i++) value.addObserver(children[i], this, this._SCRA_childObserver, context);
      }
    }
    
    return value ;
  },
  
  /**
    @private
    
    Shared observer used by any attribute whose transform creates a seperate object that needs to write back to the datahash when it changes. For example, when enumerable content changes on a SC.Set attribute, it writes back automatically instead of forcing you to call .set manually.
    This functionality can be used by setting an array named observesChildren on your transform containing the names of keys to observe.
    When one of them triggers it will call childDidChange on your transform with the same arguments as to and from.
  */
  _SCRA_childObserver: function(obj, key, deprecated, context, rev) {
    // write the new value back to the record
    this.call(context.record, context.key, obj);
    
    // mark the attribute as dirty
    context.record.notifyPropertyChange(context.key);
  },

  /** 
    Converts the passed value from the core attribute value.  This will apply 
    any format transforms.  You can install standard transforms by adding to
    the SC.RecordAttribute.transforms hash.  See 
    SC.RecordAttribute.registerTransform() for more.

    @param {SC.Record} record the record instance
    @param {String} key the key used to access this attribute on the record
    @param {Object} value the property value
    @returns {Object} attribute value
  */
  fromType: function(record, key, value) {
    var transform = this.get('transform'),
        type      = this.get('typeClass');
    
    if (transform && transform.from) {
      value = transform.from(value, this, type, record, key);
    }
    return value;
  },

  /**
    The core handler.  Called from the property.
    
    @param {SC.Record} record the record instance
    @param {String} key the key used to access this attribute on the record
    @param {Object} value the property value if called as a setter
    @returns {Object} property value
  */
  call: function(record, key, value) {
    var attrKey = this.get('key') || key, nvalue;
    
    if ((value !== undefined) && this.get('isEditable')) {
      // careful: don't overwrite value here.  we want the return value to 
      // cache.
      nvalue = this.fromType(record, key, value) ; // convert to attribute.
      record.writeAttribute(attrKey, nvalue); 
    } 

    nvalue = value = record.readAttribute(attrKey);
    if (SC.none(value) && (value = this.get('defaultValue'))) {
       if (typeof value === SC.T_FUNCTION) {
        value = this.defaultValue(record, key, this);
        // write default value so it doesn't have to be executed again
        if ((nvalue !== value)  &&  record.get('store').readDataHash(record.get('storeKey'))) {
          record.writeAttribute(attrKey, value, true);
        }
      }
    } else value = this.toType(record, key, value);
    
    return value ;
  },

  // ..........................................................
  // INTERNAL SUPPORT
  // 
  
  /** @private - Make this look like a property so that get() will call it. */
  isProperty: YES,
  
  /** @private - Make this look cacheable */
  isCacheable: YES,
  
  /** @private - needed for KVO property() support */
  dependentKeys: [],
  
  /** @private */
  init: function() {
    arguments.callee.base.apply(this,arguments);
    // setup some internal properties needed for KVO - faking 'cacheable'
    this.cacheKey = "__cache__" + SC.guidFor(this) ;
    this.lastSetValueKey = "__lastValue__" + SC.guidFor(this) ;
  }
  
}) ;

// ..........................................................
// CLASS METHODS
// 

/**
  The default method used to create a record attribute instance.  Unlike 
  create(), takes an attributeType as the first parameter which will be set 
  on the attribute itself.  You can pass a string naming a class or a class
  itself.
  
  @param {Object|String} attributeType the assumed attribute type
  @param {Hash} opts optional additional config options
  @returns {SC.RecordAttribute} new instance
*/
SC.RecordAttribute.attr = function(attributeType, opts) {
  if (!opts) opts = {} ;
  if (!opts.type) opts.type = attributeType || String ;
  return this.create(opts);
};

/** @private
  Hash of registered transforms by class guid. 
*/
SC.RecordAttribute.transforms = {};

/**
  Call to register a transform handler for a specific type of object.  The
  object you pass can be of any type as long as it responds to the following
  methods:

  | *to(value, attr, klass, record, key)* | converts the passed value (which will be of the class expected by the attribute) into the underlying attribute value |
  | *from(value, attr, klass, record, key)* | converts the underyling attribute value into a value of the class |
  
  You can also provide an array of keys to observer on the return value. When any of these change, your from method will be called to write the changed object back to the record. For example:
  
  {{{
  {
    to: function(value, attr, type, record, key) {
      if(value) return value.toSet();
      else return SC.Set.create();
    },
  
    from: function(value, attr, type, record, key) {
      return value.toArray();
    },
  
    observesChildren: ['[]']
  }
  }}}
  
  @param {Object} klass the type of object you convert
  @param {Object} transform the transform object
  @returns {SC.RecordAttribute} receiver
*/
SC.RecordAttribute.registerTransform = function(klass, transform) {
  SC.RecordAttribute.transforms[SC.guidFor(klass)] = transform;
};

// ..........................................................
// STANDARD ATTRIBUTE TRANSFORMS
// 

// Object, String, Number just pass through.

/** @private - generic converter for Boolean records */
SC.RecordAttribute.registerTransform(Boolean, {
  /** @private - convert an arbitrary object value to a boolean */
  to: function(obj) {
    return SC.none(obj) ? null : !!obj;
  }
});

/** @private - generic converter for Numbers */
SC.RecordAttribute.registerTransform(Number, {
  /** @private - convert an arbitrary object value to a Number */
  to: function(obj) {
    return SC.none(obj) ? null : Number(obj) ;
  }
});

/** @private - generic converter for Strings */
SC.RecordAttribute.registerTransform(String, {
  /** @private - 
    convert an arbitrary object value to a String 
    allow null through as that will be checked separately
  */
  to: function(obj) {
    if (!(typeof obj === SC.T_STRING) && !SC.none(obj) && obj.toString) {
      obj = obj.toString();
    }
    return obj;
  }
});

/** @private - generic converter for Array */
SC.RecordAttribute.registerTransform(Array, {
  /** @private - check if obj is an array
  */
  to: function(obj) {
    if (!SC.isArray(obj) && !SC.none(obj)) {
      obj = [];
    }
    return obj;
  },
  
  observesChildren: ['[]']
});

/** @private - generic converter for Object */
SC.RecordAttribute.registerTransform(Object, {
  /** @private - check if obj is an object */
  to: function(obj) {
    if (!(typeof obj === 'object') && !SC.none(obj)) {
      obj = {};
    }
    return obj;
  }
});

/** @private - generic converter for SC.Record-type records */
SC.RecordAttribute.registerTransform(SC.Record, {

  /** @private - convert a record id to a record instance */
  to: function(id, attr, recordType, parentRecord) {
    var store = parentRecord.get('store');
    if (SC.none(id) || (id==="")) return null;
    else return store.find(recordType, id);
  },
  
  /** @private - convert a record instance to a record id */
  from: function(record) { return record ? record.get('id') : null; }
});

/** @private - generic converter for transforming computed record attributes */
SC.RecordAttribute.registerTransform(SC.T_FUNCTION, {

  /** @private - convert a record id to a record instance */
  to: function(id, attr, recordType, parentRecord) {
    recordType = recordType.apply(parentRecord);
    var store = parentRecord.get('store');
    return store.find(recordType, id);
  },
  
  /** @private - convert a record instance to a record id */
  from: function(record) { return record.get('id'); }
});

/** @private - generic converter for Date records */
SC.RecordAttribute.registerTransform(Date, {

  /** @private - convert a string to a Date */
  to: function(str, attr) {

    // If a null or undefined value is passed, don't
    // do any normalization.
    if (SC.none(str)) { return str; }

    var ret ;
    str = str.toString() || '';
    
    if (attr.get('useIsoDate')) {
      var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
             "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?" +
             "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?",
          d      = str.match(new RegExp(regexp)),
          offset = 0,
          date   = new Date(d[1], 0, 1),
          time ;

      if (d[3]) { date.setMonth(d[3] - 1); }
      if (d[5]) { date.setDate(d[5]); }
      if (d[7]) { date.setHours(d[7]); }
      if (d[8]) { date.setMinutes(d[8]); }
      if (d[10]) { date.setSeconds(d[10]); }
      if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
      if (d[14]) {
         offset = (Number(d[16]) * 60) + Number(d[17]);
         offset *= ((d[15] === '-') ? 1 : -1);
      }

      offset -= date.getTimezoneOffset();
      time = (Number(date) + (offset * 60 * 1000));
      
      ret = new Date();
      ret.setTime(Number(time));
    } else ret = new Date(Date.parse(str));
    return ret ;
  },
  
  _dates: {},

  _zeropad: function(num) { 
    return ((num<0) ? '-' : '') + ((num<10) ? '0' : '') + Math.abs(num); 
  },
  
  /** @private - convert a date to a string */
  from: function(date) { 

    if (SC.none(date)) { return null; }

    var ret = this._dates[date.getTime()];
    if (ret) return ret ; 
    
    // figure timezone
    var zp = this._zeropad,
        tz = 0-date.getTimezoneOffset()/60;
        
    tz = (tz === 0) ? 'Z' : '%@:00'.fmt(zp(tz));
    
    this._dates[date.getTime()] = ret = "%@-%@-%@T%@:%@:%@%@".fmt(
      zp(date.getFullYear()),
      zp(date.getMonth()+1),
      zp(date.getDate()),
      zp(date.getHours()),
      zp(date.getMinutes()),
      zp(date.getSeconds()),
      tz) ;
    
    return ret ;
  }
});

if (SC.DateTime && !SC.RecordAttribute.transforms[SC.guidFor(SC.DateTime)]) {
  /**
    Registers a transform to allow SC.DateTime to be used as a record attribute,
    ie SC.Record.attr(SC.DateTime);
  
    Because SC.RecordAttribute is in the datastore framework and SC.DateTime in
    the foundation framework, and we don't know which framework is being loaded
    first, this chunck of code is duplicated in both frameworks.
  
    IF YOU EDIT THIS CODE MAKE SURE YOU COPY YOUR CHANGES to record_attribute.js. 
  */

  SC.RecordAttribute.registerTransform(SC.DateTime, {
  
    /** @private
      Convert a String to a DateTime
    */
    to: function(str, attr) {
      if (SC.none(str) || SC.instanceOf(str, SC.DateTime)) return str;
      var format = attr.get('format');
      return SC.DateTime.parse(str, format ? format : SC.DateTime.recordFormat);
    },
  
    /** @private
      Convert a DateTime to a String
    */
    from: function(dt, attr) {
      if (SC.none(dt)) return dt;
      var format = attr.get('format');
      return dt.toFormattedString(format ? format : SC.DateTime.recordFormat);
    }
  });
  
}

/**
  Parses a coreset represented as an array.
 */
SC.RecordAttribute.registerTransform(SC.Set, {
  to: function(value, attr, type, record, key) {
    return SC.Set.create(value);
  },
  
  from: function(value, attr, type, record, key) {
    return value.toArray();
  },
  
  observesChildren: ['[]']
});

/* >>>>>>>>>> BEGIN source/models/child_attribute.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2010 Evin Grano
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('models/record');
sc_require('models/record_attribute');

/** @class
  
  ChildAttribute is a subclass of RecordAttribute and handles to-one 
  relationships for child records.
  
  When setting ( .set() ) the value of a toMany attribute, make sure
  to pass in an array of SC.Record objects.
  
  There are many ways you can configure a ManyAttribute:
  
  {{{
    contacts: SC.ChildAttribute.attr('SC.Child');
  }}}
  
  @extends SC.RecordAttribute
  @since SproutCore 1.0
*/
SC.ChildAttribute = SC.RecordAttribute.extend(
  /** @scope SC.ChildAttribute.prototype */ {
    
  isNestedRecordTransform: YES,
      
  // ..........................................................
  // LOW-LEVEL METHODS
  //
  
  /**  @private - adapted for to one relationship */
  toType: function(record, key, value) {
    var ret   = null, rel,
        recordType  = this.get('typeClass');
            
    if (!record) {
      throw 'SC.Child: Error during transform: Unable to retrieve parent record.';
    }
    if (!SC.none(value)) ret = record.registerNestedRecord(value, key);
        
    return ret;
  },
  
  // Default fromType is just returning itself
  fromType: function(record, key, value){
    var sk, store, ret;
    if (record){
      ret = record.registerNestedRecord(value, key, key);
      if (ret) {
        sk = ret.get('storeKey');
        store = ret.get('store');
        record.writeAttribute(key, store.readDataHash(sk));
      }
      else if (value) {
        record.writeAttribute(key, value);
      }
    } 
    
    return ret;
  },
    
  /**
    The core handler.  Called from the property.
    @param {SC.Record} record the record instance
    @param {String} key the key used to access this attribute on the record
    @param {Object} value the property value if called as a setter
    @returns {Object} property value
  */
  call: function(record, key, value) {
    var attrKey = this.get('key') || key, cRef,
        cacheKey = SC.keyFor('__kid__', SC.guidFor(this));
    if (value !== undefined) {
      // this.orphan(record, cacheKey, value);
      value = this.fromType(record, key, value) ; // convert to attribute.
      // record[cacheKey] = value;
    } else {
      value = record.readAttribute(attrKey);
      if (SC.none(value) && (value = this.get('defaultValue'))) {
        if (typeof value === SC.T_FUNCTION) {
          value = this.defaultValue(record, key, this);
          // write default value so it doesn't have to be executed again
          if(record.attributes()) record.writeAttribute(attrKey, value, true);
        }
      } else value = this.toType(record, key, value);
    }

    return value ;
  }
});



/* >>>>>>>>>> BEGIN source/system/child_array.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2010 Evin Grano
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @class

  A ChildArray is used to map an array of ChildRecord objects.
  
  @extends SC.Enumerable
  @extends SC.Array
  @since SproutCore 1.0
*/

SC.ChildArray = SC.Object.extend(SC.Enumerable, SC.Array,
  /** @scope SC.ManyArray.prototype */ {
    
  /**
    If set, it is the default record recordType
  
    @property {SC.Record}
  */
  defaultRecordType: null,
  
  /**
    If set, the parent record will be notified whenever the array changes so that 
    it can change its own state
    
    @property {SC.Record}
  */
  record: null,
  
  /**
    If set will be used by the many array to get an editable version of the
    storeIds from the owner.
    
    @property {String}
  */
  propertyName: null,
  
  /**
    Actual references to the hashes
  */
  children: null,
  
  /**
    The store that owns this record array.  All record arrays must have a 
    store to function properly.

    @property {SC.Store}
  */
  store: function() {
    return this.getPath('record.store');
  }.property('record').cacheable(),
  
  /**
    The storeKey for the parent record of this many array.  Editing this 
    array will place the parent record into a READY_DIRTY state.

    @property {Number}
  */
  storeKey: function() {
    return this.getPath('record.storeKey');
  }.property('record').cacheable(),
  
  /**
    Returns the storeIds in read only mode.  Avoids modifying the record 
    unnecessarily.
    
    @property {SC.Array}
  */
  readOnlyChildren: function() {
    return this.get('record').readAttribute(this.get('propertyName'));
  }.property(),
  
  /**
    Returns an editable array of child hashes.  Marks the owner records as 
    modified. 
    
    @property {SC.Array}
  */
  editableChildren: function() {
    var store    = this.get('store'),
        storeKey = this.get('storeKey'),
        pname    = this.get('propertyName'),
        ret, hash;
        
    ret = store.readEditableProperty(storeKey, pname);    
    if (!ret) {
      hash = store.readEditableDataHash(storeKey);
      ret = hash[pname] = [];      
    }
    
    if (ret !== this._prevChildren) this.recordPropertyDidChange();
    return ret ;
  }.property(),
    
  // ..........................................................
  // ARRAY PRIMITIVES
  // 

  /** @private
    Returned length is a pass-through to the storeIds array.
    
    @property {Number}
  */
  length: function() {
    var children = this.get('readOnlyChildren');
    return children ? children.length : 0;
  }.property('readOnlyChildren'),

  /** @private
    Looks up the store id in the store ids array and materializes a
    records.
  */
  objectAt: function(idx) {
    var recs      = this._records, 
        children = this.get('readOnlyChildren'),
        hash, ret, pname = this.get('propertyName'),
        parent = this.get('record');
    var len = children ? children.length : 0;
    
    if (!children) return undefined; // nothing to do
    if (recs && (ret=recs[idx])) return ret ; // cached
    if (!recs) this._records = recs = [] ; // create cache
    
    // If not a good index return undefined
    if (idx >= len) return undefined;
    hash = children.objectAt(idx);
    if (!hash) return undefined;
    
    // not in cache, materialize
    recs[idx] = ret = parent.registerNestedRecord(hash, pname, pname+'.'+idx);
    
    return ret;
  },

  /** @private
    Pass through to the underlying array.  The passed in objects must be
    records, which can be converted to storeIds.
  */
  replace: function(idx, amt, recs) {
    var children = this.get('editableChildren'), 
        len      = recs ? (recs.get ? recs.get('length') : recs.length) : 0,
        record   = this.get('record'), newRecs,
        
        pname    = this.get('propertyName'),
        cr, recordType;
    newRecs = this._processRecordsToHashes(recs);
    children.replace(idx, amt, newRecs);
    // notify that the record did change...
    record.recordDidChange(pname);
  
    return this;
  },
  
  _processRecordsToHashes: function(recs){
    var store, sk;
    recs = recs || [];
    recs.forEach( function(me, idx){
      if (me.isNestedRecord){
        store = me.get('store');
        sk = me.storeKey;
        recs[idx] = store.readDataHash(sk);
      }
    });
    
    return recs;
  },
  
  /*
  calls normalize on each object in the array
  */
  normalize: function(){
    this.forEach(function(child,id){
      if(child.normalize) child.normalize();
    });
  },
  
  // ..........................................................
  // INTERNAL SUPPORT
  //  
  
  /** @private 
    Invoked whenever the children array changes.  Observes changes.
  */
  recordPropertyDidChange: function(keys) {
    if (keys && !keys.contains(this.get('propertyName'))) return this;
    
    var children = this.get('readOnlyChildren');
    var prev = this._prevChildren, f = this._childrenContentDidChange;
    
    if (children === prev) return this; // nothing to do
        
    if (prev) prev.removeObserver('[]', this, f);
    this._prevChildren = children;
    if (children) children.addObserver('[]', this, f);
    
    var rev = (children) ? children.propertyRevision : -1 ;
    this._childrenContentDidChange(children, '[]', children, rev);
    return this;
  },

  /** @private
    Invoked whenever the content of the children array changes.  This will
    dump any cached record lookup and then notify that the enumerable content
    has changed.
  */
  _childrenContentDidChange: function(target, key, value, rev) {
    this._records = null ; // clear cache
    this.enumerableContentDidChange();
  },
  
  /** @private */
  init: function() {
    arguments.callee.base.apply(this,arguments);
    this.recordPropertyDidChange();
  }
  
}) ;
/* >>>>>>>>>> BEGIN source/models/children_attribute.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2010 Evin Grano
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('models/record');
sc_require('models/record_attribute');
sc_require('models/child_attribute');
sc_require('system/child_array');

/** @class
  
  ChildrenAttribute is a subclass of ChildAttribute and handles to-many 
  relationships for child records.
  
  When setting ( .set() ) the value of a toMany attribute, make sure
  to pass in an array of SC.Record objects.
  
  There are many ways you can configure a ChildrenAttribute:
  
  {{{
    contacts: SC.ChildrenAttribute.attr('SC.Child');
  }}}
  
  @extends SC.RecordAttribute
  @since SproutCore 1.0
*/
SC.ChildrenAttribute = SC.ChildAttribute.extend(
  /** @scope SC.ChildrenAttribute.prototype */ {
    
  // ..........................................................
  // LOW-LEVEL METHODS
  //
  
  /**  @private - adapted for to many relationship */
  toType: function(record, key, value) {
    var attrKey   = this.get('key') || key,
        arrayKey  = SC.keyFor('__kidsArray__', SC.guidFor(this)),
        ret       = record[arrayKey],
        recordType  = this.get('typeClass'), rel;

    // lazily create a ManyArray one time.  after that always return the 
    // same object.
    if (!ret) {
      ret = SC.ChildArray.create({ 
        record:         record,
        propertyName:   attrKey,
        defaultRecordType: recordType
      });

      record[arrayKey] = ret ; // save on record
      rel = record.get('relationships');
      if (!rel) record.set('relationships', rel = []);
      rel.push(ret); // make sure we get notified of changes...
    }

    return ret;
  },
  
  // Default fromType is just returning itself
  fromType: function(record, key, value){
    var sk, store, 
        arrayKey = SC.keyFor('__kidsArray__', SC.guidFor(this)),
        ret = record[arrayKey];
    if (record) {
      record.writeAttribute(key, value);
      if (ret) ret = ret.recordPropertyDidChange();
    }
    
    return ret;
  }
});



/* >>>>>>>>>> BEGIN source/models/fetched_attribute.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('models/record');
sc_require('models/record_attribute');

/** @class

  Describes a single attribute that is fetched dynamically from the server
  when you request it.  Normally getting a property value with this attribute
  applied will cause call the find() method on the record store passing
  the attribute record type as the query key along with the property value,
  owner record, and property key name as parameters. 
  
  The DataSource you hook up to your store must know how to load this kind 
  of relationship for this fetched property to work properly.
  
  The return value is usually an SC.RecordArray that will populate with the
  record data so that you can display it.
  
  @extends SC.RecordAttribute
  @since SproutCore 1.0
*/
SC.FetchedAttribute = SC.RecordAttribute.extend(
  /** @scope SC.FetchedAttribute.prototype */ {

  /**
    Define the param key that will be passed to the findAll method on the
    store.  If null, the param will not be send.  Defaults to 'link'
    
    @property {String}
  */
  paramValueKey: 'link',

  /**
    Define the param key used to send the parent record.  If null the param
    will not be sent.  Defaults to 'owner'.
    
    @property {String}
  */
  paramOwnerKey: 'owner',
  
  /**
    Define the param key used to send the key name used to reference this 
    attribute.  If null, the param will not be sent.  Defaults to "rel"
    
    @property {String}
  */
  paramRelKey: 'rel',
  
  /**
    Optional query key to pass to findAll.  Otherwise type class will be 
    passed.
    
    @property {String}
  */
  queryKey: null,

  /** 
    Fetched attributes are not editable 
    
    @property {Boolean}
  */
  isEditable: NO,  
  
  // ..........................................................
  // LOW-LEVEL METHODS
  // 
  
  /**  @private - adapted for fetching. do findAll */
  toType: function(record, key, value) {
    var store = record.get('store');
    if (!store) return null ; // nothing to do
    
    var paramValueKey = this.get('paramValueKey'),
        paramOwnerKey = this.get('paramOwnerKey'),
        paramRelKey   = this.get('paramRelKey'),
        queryKey      = this.get('queryKey') || this.get('typeClass'),
        params        = {};

    // setup params for query
    if (paramValueKey) params[paramValueKey] = value ;
    if (paramOwnerKey) params[paramOwnerKey] = record ;
    if (paramRelKey)   params[paramRelKey]   = this.get('key') || key ;
    
    // make request - should return SC.RecordArray instance
    return store.findAll(queryKey, params);
  },

  /** @private - fetched attributes are read only. */
  fromType: function(record, key, value) {
    return value;
  }
  
}) ;


/* >>>>>>>>>> BEGIN source/system/many_array.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

/**
  @class

  A ManyArray is used to map an array of record ids back to their 
  record objects which will be materialized from the owner store on demand.
  
  Whenever you create a toMany() relationship, the value returned from the 
  property will be an instance of ManyArray.  You can generally customize the
  behavior of ManyArray by passing settings to the toMany() helper.
  
  @extends SC.Enumerable
  @extends SC.Array
  @since SproutCore 1.0
*/

SC.ManyArray = SC.Object.extend(SC.Enumerable, SC.Array,
  /** @scope SC.ManyArray.prototype */ {

  /**
    recordType will tell what type to transform the record to when
    materializing the record.

    @property {String}
  */
  recordType: null,
  
  /**
    If set, the record will be notified whenever the array changes so that 
    it can change its own state
    
    @property {SC.Record}
  */
  record: null,
  
  /**
    If set will be used by the many array to get an editable version of the
    storeIds from the owner.
    
    @property {String}
  */
  propertyName: null,
  
  
  /**
    The ManyAttribute that created this array.
  
    @property {SC.ManyAttribute}
  */
  manyAttribute: null,
  
  /**
    The store that owns this record array.  All record arrays must have a 
    store to function properly.

    @property {SC.Store}
  */
  store: function() {
    return this.get('record').get('store');
  }.property('record').cacheable(),
  
  /**
    The storeKey for the parent record of this many array.  Editing this 
    array will place the parent record into a READY_DIRTY state.

    @property {Number}
  */
  storeKey: function() {
    return this.get('record').get('storeKey');
  }.property('record').cacheable(),


  /**
    Returns the storeIds in read only mode.  Avoids modifying the record 
    unnecessarily.
    
    @property {SC.Array}
  */
  readOnlyStoreIds: function() {
    return this.get('record').readAttribute(this.get('propertyName'));
  }.property(),
  
  
  /**
    Returns an editable array of storeIds.  Marks the owner records as 
    modified. 
    
    @property {SC.Array}
  */
  editableStoreIds: function() {
    var store    = this.get('store'),
        storeKey = this.get('storeKey'),
        pname    = this.get('propertyName'),
        ret, hash;
        
    ret = store.readEditableProperty(storeKey, pname);    
    if (!ret) {
      hash = store.readEditableDataHash(storeKey);
      ret = hash[pname] = [];      
    }
    
    if (ret !== this._prevStoreIds) this.recordPropertyDidChange();
    return ret ;
  }.property(),
  
  
  // ..........................................................
  // COMPUTED FROM OWNER
  // 
  
  /**
    Computed from owner many attribute
    
    @property {Boolean}
  */
  isEditable: function() {
    // NOTE: can't use get() b/c manyAttribute looks like a computed prop
    var attr = this.manyAttribute;
    return attr ? attr.get('isEditable') : NO;
  }.property('manyAttribute').cacheable(),
  
  /**
    Computed from owner many attribute
    
    @property {String}
  */
  inverse: function() {
    // NOTE: can't use get() b/c manyAttribute looks like a computed prop
    var attr = this.manyAttribute;
    return attr ? attr.get('inverse') : null;
  }.property('manyAttribute').cacheable(),
  
  /**
    Computed from owner many attribute
    
    @property {Boolean}
  */
  isMaster: function() {
    // NOTE: can't use get() b/c manyAttribute looks like a computed prop
    var attr = this.manyAttribute;
    return attr ? attr.get('isMaster') : null;
  }.property("manyAttribute").cacheable(),

  /**
    Computed from owner many attribute
    
    @property {Array}
  */
  orderBy: function() {
    // NOTE: can't use get() b/c manyAttribute looks like a computed prop
    var attr = this.manyAttribute;
    return attr ? attr.get('orderBy') : null;
  }.property("manyAttribute").cacheable(),
  
  // ..........................................................
  // ARRAY PRIMITIVES
  // 

  /** @private
    Returned length is a pass-through to the storeIds array.
    
    @property {Number}
  */
  length: function() {
    var storeIds = this.get('readOnlyStoreIds');
    return storeIds ? storeIds.get('length') : 0;
  }.property('readOnlyStoreIds'),

  /** @private
    Looks up the store id in the store ids array and materializes a
    records.
  */
  objectAt: function(idx) {
    var recs      = this._records, 
        storeIds  = this.get('readOnlyStoreIds'),
        store     = this.get('store'),
        recordType = this.get('recordType'),
        storeKey, ret, storeId ;
        
    if (!storeIds || !store) return undefined; // nothing to do
    if (recs && (ret=recs[idx])) return ret ; // cached

    // not in cache, materialize
    if (!recs) this._records = recs = [] ; // create cache
    storeId = storeIds.objectAt(idx);
    if (storeId) {

      // if record is not loaded already, then ask the data source to 
      // retrieve it
      storeKey = store.storeKeyFor(recordType, storeId);
      
      if (store.readStatus(storeKey) === SC.Record.EMPTY) {
        store.retrieveRecord(recordType, null, storeKey);
      }
      
      recs[idx] = ret = store.materializeRecord(storeKey);
    }
    return ret ;
  },

  /** @private
    Pass through to the underlying array.  The passed in objects must be
    records, which can be converted to storeIds.
  */
  replace: function(idx, amt, recs) {
    
    if (!this.get('isEditable')) {
      throw "%@.%@[] is not editable".fmt(this.get('record'), this.get('propertyName'));
    }
    
    var storeIds = this.get('editableStoreIds'), 
        len      = recs ? (recs.get ? recs.get('length') : recs.length) : 0,
        record   = this.get('record'),
        pname    = this.get('propertyName'),
        i, keys, ids, toRemove, inverse, attr, inverseRecord;

    // map to store keys
    ids = [] ;
    for(i=0;i<len;i++) ids[i] = recs.objectAt(i).get('id');

    // if we have an inverse - collect the list of records we are about to 
    // remove
    inverse = this.get('inverse');
    if (inverse && amt>0) {
      toRemove = SC.ManyArray._toRemove;
      if (toRemove) SC.ManyArray._toRemove = null; // reuse if possible
      else toRemove = [];
      
      for(i=0;i<amt;i++) toRemove[i] = this.objectAt(idx + i);
    }
    
    // pass along - if allowed, this should trigger the content observer 
    storeIds.replace(idx, amt, ids);

    // ok, notify records that were removed then added; this way reordered
    // objects are added and removed
    if (inverse) {
      
      // notive removals
      for(i=0;i<amt;i++) {
        inverseRecord = toRemove[i];
        attr = inverseRecord ? inverseRecord[inverse] : null;
        if (attr && attr.inverseDidRemoveRecord) {
          attr.inverseDidRemoveRecord(inverseRecord, inverse, record, pname);
        }
      }

      if (toRemove) {
        toRemove.length = 0; // cleanup
        if (!SC.ManyArray._toRemove) SC.ManyArray._toRemove = toRemove;
      }

      // notify additions
      for(i=0;i<len;i++) {
        inverseRecord = recs.objectAt(i);
        attr = inverseRecord ? inverseRecord[inverse] : null;
        if (attr && attr.inverseDidAddRecord) {
          attr.inverseDidAddRecord(inverseRecord, inverse, record, pname);
        }
      }
      
    }

    // only mark record dirty if there is no inverse or we are master
    if (record && (!inverse || this.get('isMaster'))) {
      record.recordDidChange(pname);
    } 
    
    this.enumerableContentDidChange(idx, amt, len - amt);
    
    return this;
  },
  
  // ..........................................................
  // INVERSE SUPPORT
  // 
  
  /**
    Called by the ManyAttribute whenever a record is removed on the inverse
    of the relationship.
    
    @param {SC.Record} inverseRecord the record that was removed
    @returns {SC.ManyArray} receiver
  */
  removeInverseRecord: function(inverseRecord) {
    
    if (!inverseRecord) return this; // nothing to do
    var id = inverseRecord.get('id'),
        storeIds = this.get('editableStoreIds'),
        idx      = (storeIds && id) ? storeIds.indexOf(id) : -1,
        record;
    
    if (idx >= 0) {
      storeIds.removeAt(idx);
      if (this.get('isMaster') && (record = this.get('record'))) {
        record.recordDidChange(this.get('propertyName'));
      }
    }
    
    return this;
  },

  /**
    Called by the ManyAttribute whenever a record is added on the inverse
    of the relationship.
    
    @param {SC.Record} record the record this array is a part of
    @param {String} key the key this array represents
    @param {SC.Record} inverseRecord the record that was removed
    @param {String} inverseKey the name of inverse that was changed
    @returns {SC.ManyArray} receiver
  */
  addInverseRecord: function(inverseRecord) {
    
    if (!inverseRecord) return this;
    var id = inverseRecord.get('id'),
        storeIds = this.get('editableStoreIds'),
        orderBy  = this.get('orderBy'),
        len      = storeIds.get('length'),
        idx, record;
        
    // find idx to insert at.
    if (orderBy) {
      idx = this._findInsertionLocation(inverseRecord, 0, len, orderBy);
    } else idx = len;
    
    storeIds.insertAt(idx, inverseRecord.get('id'));
    if (this.get('isMaster') && (record = this.get('record'))) {
      record.recordDidChange(this.get('propertyName'));
    }
    
    return this;
  },
  
  // binary search to find insertion location
  _findInsertionLocation: function(rec, min, max, orderBy) {
    var idx   = min+Math.floor((max-min)/2),
        cur   = this.objectAt(idx),
        order = this._compare(rec, cur, orderBy);
    if (order < 0) {
      if (idx===0) return idx;
      else return this._findInsertionLocation(rec, 0, idx, orderBy);
    } else if (order > 0) {
      if (idx >= max) return idx;
      else return this._findInsertionLocation(rec, idx, max, orderBy);
    } else return idx;
  },

  _compare: function(a, b, orderBy) {
    var t = SC.typeOf(orderBy),
        ret, idx, len;
        
    if (t === SC.T_FUNCTION) ret = orderBy(a, b);
    else if (t === SC.T_STRING) ret = SC.compare(a,b);
    else {
      len = orderBy.get('length');
      ret = 0;
      for(idx=0;(ret===0) && (idx<len);idx++) ret = SC.compare(a,b);
    }

    return ret ;
  },
  
  // ..........................................................
  // INTERNAL SUPPORT
  //  

  /** @private 
    Invoked whenever the storeIds array changes.  Observes changes.
  */
  recordPropertyDidChange: function(keys) {
    
    if (keys && !keys.contains(this.get('propertyName'))) return this;
    
    var storeIds = this.get('readOnlyStoreIds');
    var prev = this._prevStoreIds, f = this._storeIdsContentDidChange;

    if (storeIds === prev) return this; // nothing to do

    if (prev) prev.removeObserver('[]', this, f);
    this._prevStoreIds = storeIds;
    if (storeIds) storeIds.addObserver('[]', this, f);

    var rev = (storeIds) ? storeIds.propertyRevision : -1 ;
    this._storeIdsContentDidChange(storeIds, '[]', storeIds, rev);
    
  },

  /** @private
    Invoked whenever the content of the storeIds array changes.  This will
    dump any cached record lookup and then notify that the enumerable content
    has changed.
  */
  _storeIdsContentDidChange: function(target, key, value, rev) {
    this._records = null ; // clear cache
    this.enumerableContentDidChange();
  },
  
  /** @private */
  unknownProperty: function(key, value) {
    var ret;
    if (SC.typeOf(key) === SC.T_STRING) ret = this.reducedProperty(key, value);
    return ret === undefined ? arguments.callee.base.apply(this,arguments) : ret;
  },

  /** @private */
  init: function() {
    arguments.callee.base.apply(this,arguments);
    this.recordPropertyDidChange();
  }
  
}) ;

/* >>>>>>>>>> BEGIN source/models/many_attribute.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('models/record');
sc_require('models/record_attribute');
sc_require('system/many_array');

/** @class
  
  ManyAttribute is a subclass of RecordAttribute and handles to-many 
  relationships.
  
  When setting ( .set() ) the value of a toMany attribute, make sure
  to pass in an array of SC.Record objects.
  
  There are many ways you can configure a ManyAttribute:
  
  {{{
    contacts: SC.Record.toMany('MyApp.Contact', { 
      inverse: 'group', // set the key used to represent the inverse 
      isMaster: YES|NO, // indicate whether changing this should dirty
      transform: function(), // transforms value <=> storeKey,
      isEditable: YES|NO, make editable or not,
      through: 'taggings' // set a relationship this goes through
    });
  }}}
  
  @extends SC.RecordAttribute
  @since SproutCore 1.0
*/
SC.ManyAttribute = SC.RecordAttribute.extend(
  /** @scope SC.ManyAttribute.prototype */ {
  
  /**
    Set the foreign key on content objects that represent the inversion of
    this relationship.  The inverse property should be a toOne() or toMany()
    relationship as well.  Modifying this many array will modify the inverse
    property as well.
    
    @property {String}
  */
  inverse: null,
  
  /**
    If YES then modifying this relationships will mark the owner record 
    dirty.    If set ot NO, then modifying this relationship will not alter
    this record.  You should use this property only if you have an inverse 
    property also set.  Only one of the inverse relationships should be marked
    as master so you can control which record should be committed.
    
    @property {Boolean}
  */
  isMaster: YES,
  
  /**
    If set and you have an inverse relationship, will be used to determine the
    order of an object when it is added to an array.  You can pass a function
    or an array of property keys.
    
    @property {Function|Array}
  */
  orderBy: null,
  
  // ..........................................................
  // LOW-LEVEL METHODS
  //
  
  /**  @private - adapted for to many relationship */
  toType: function(record, key, value) {
    var type      = this.get('typeClass'),
        attrKey   = this.get('key') || key,
        arrayKey  = SC.keyFor('__manyArray__', SC.guidFor(this)),
        ret       = record[arrayKey],
        rel;

    // lazily create a ManyArray one time.  after that always return the 
    // same object.
    if (!ret) {
      ret = SC.ManyArray.create({ 
        recordType:    type,
        record:        record,
        propertyName:  attrKey,
        manyAttribute: this
      });

      record[arrayKey] = ret ; // save on record
      rel = record.get('relationships');
      if (!rel) record.set('relationships', rel = []);
      rel.push(ret); // make sure we get notified of changes...

    }

    return ret;
  },
  
  /** @private - adapted for to many relationship */
  fromType: function(record, key, value) {
    var ret = [];
    
    if(!SC.isArray(value)) throw "Expects toMany attribute to be an array";
    
    var len = value.get('length');
    for(var i=0;i<len;i++) {
      ret[i] = value.objectAt(i).get('id');
    }
    
    return ret;
  },
  
  /**
    Called by an inverse relationship whenever the receiver is no longer part
    of the relationship.  If this matches the inverse setting of the attribute
    then it will update itself accordingly.

    You should never call this directly.
    
    @param {SC.Record} the record owning this attribute
    @param {String} key the key for this attribute
    @param {SC.Record} inverseRecord record that was removed from inverse
    @param {String} key key on inverse that was modified
    @returns {void}
  */
  inverseDidRemoveRecord: function(record, key, inverseRecord, inverseKey) {
    var manyArray = record.get(key);
    if (manyArray) {
      manyArray.removeInverseRecord(inverseRecord);
    }
  },
  
  /**
    Called by an inverse relationship whenever the receiver is added to the 
    inverse relationship.  This will set the value of this inverse record to 
    the new record.
    
    You should never call this directly.
    
    @param {SC.Record} the record owning this attribute
    @param {String} key the key for this attribute
    @param {SC.Record} inverseRecord record that was added to inverse
    @param {String} key key on inverse that was modified
    @returns {void}
  */
  inverseDidAddRecord: function(record, key, inverseRecord, inverseKey) {
    var manyArray = record.get(key);
    if (manyArray) {
      manyArray.addInverseRecord(inverseRecord);
    }
  }
  
});

/* >>>>>>>>>> BEGIN source/models/single_attribute.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('models/record');
sc_require('models/record_attribute');

/** @class
  
  SingleAttribute is a subclass of RecordAttribute and handles to-one
  relationships.

  There are many ways you can configure a SingleAttribute:
  
  {{{
    group: SC.Record.toOne('MyApp.Group', { 
      inverse: 'contacts', // set the key used to represent the inverse 
      isMaster: YES|NO, // indicate whether changing this should dirty
      transform: function(), // transforms value <=> storeKey,
      isEditable: YES|NO, make editable or not
    });
  }}}
  
  @extends SC.RecordAttribute
  @since SproutCore 1.0
*/
SC.SingleAttribute = SC.RecordAttribute.extend(
  /** @scope SC.SingleAttribute.prototype */ {

  /**
    Specifies the property on the member record that represents the inverse
    of the current relationship.  If set, then modifying this relationship
    will also alter the opposite side of the relationship.
    
    @property {String}
  */
  inverse: null,
  
  /**
    If set, determines that when an inverse relationship changes whether this
    record should become dirty also or not.
    
    @property {Boolean}
  */
  isMaster: YES,
  
  
  /**
    @private - implements support for handling inverse relationships.
  */
  call: function(record, key, newRec) {
    var attrKey = this.get('key') || key,
        inverseKey, isMaster, oldRec, attr, ret, nvalue;
    
    // WRITE
    if (newRec !== undefined && this.get('isEditable')) {

      // can only take other records or null
      if (newRec && !SC.kindOf(newRec, SC.Record)) {
        throw "%@ is not an instance of SC.Record".fmt(newRec);
      }

      inverseKey = this.get('inverse');
      if (inverseKey) oldRec = this._scsa_call(record, key);

      // careful: don't overwrite value here.  we want the return value to 
      // cache.
      nvalue = this.fromType(record, key, newRec) ; // convert to attribute.
      record.writeAttribute(attrKey, nvalue, !this.get('isMaster')); 
      ret = newRec ;

      // ok, now if we have an inverse relationship, get the inverse 
      // relationship and notify it of what is happening.  This will allow it
      // to update itself as needed.  The callbacks implemented here are 
      // supported by both SingleAttribute and ManyAttribute.
      //
      if (inverseKey && (oldRec !== newRec)) {
        if (oldRec && (attr = oldRec[inverseKey])) {
          attr.inverseDidRemoveRecord(oldRec, inverseKey, record, key);
        }

        if (newRec && (attr = newRec[inverseKey])) {
          attr.inverseDidAddRecord(newRec, inverseKey, record, key);
        }
      }
      
    // READ 
    } else ret = this._scsa_call(record, key, newRec);

    return ret ;
  },
  
  /** @private - save original call() impl */
  _scsa_call: SC.RecordAttribute.prototype.call,
  
  /**
    Called by an inverse relationship whenever the receiver is no longer part
    of the relationship.  If this matches the inverse setting of the attribute
    then it will update itself accordingly.
    
    @param {SC.Record} the record owning this attribute
    @param {String} key the key for this attribute
    @param {SC.Record} inverseRecord record that was removed from inverse
    @param {String} key key on inverse that was modified
    @returns {void}
  */
  inverseDidRemoveRecord: function(record, key, inverseRecord, inverseKey) {

    var myInverseKey  = this.get('inverse'),
        curRec   = this._scsa_call(record, key),
        isMaster = this.get('isMaster'), attr;

    // ok, you removed me, I'll remove you...  if isMaster, notify change.
    record.writeAttribute(key, null, !isMaster);
    record.notifyPropertyChange(key);

    // if we have another value, notify them as well...
    if ((curRec !== inverseRecord) || (inverseKey !== myInverseKey)) {
      if (curRec && (attr = curRec[myInverseKey])) {
        attr.inverseDidRemoveRecord(curRec, myInverseKey, record, key);
      }
    }
  },
  
  /**
    Called by an inverse relationship whenever the receiver is added to the 
    inverse relationship.  This will set the value of this inverse record to 
    the new record.
    
    @param {SC.Record} the record owning this attribute
    @param {String} key the key for this attribute
    @param {SC.Record} inverseRecord record that was added to inverse
    @param {String} key key on inverse that was modified
    @returns {void}
  */
  inverseDidAddRecord: function(record, key, inverseRecord, inverseKey) {
    
    var myInverseKey  = this.get('inverse'),
        curRec   = this._scsa_call(record, key),
        isMaster = this.get('isMaster'), 
        attr, nvalue; 

    // ok, replace myself with the new value...
    nvalue = this.fromType(record, key, inverseRecord); // convert to attr.
    record.writeAttribute(key, nvalue, !isMaster);
    record.notifyPropertyChange(key);

    // if we have another value, notify them as well...
    if ((curRec !== inverseRecord) || (inverseKey !== myInverseKey)) {
      if (curRec && (attr = curRec[myInverseKey])) {
        attr.inverseDidRemoveRecord(curRec, myInverseKey, record, key);
      }
    }
  }

});

/* >>>>>>>>>> BEGIN source/system/store.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('models/record');

/**
  @class


  The Store is where you can find all of your dataHashes. Stores can be 
  chained for editing purposes and committed back one chain level at a time 
  all the way back to a persistent data source.
  
  Every application you create should generally have its own store objects.
  Once you create the store, you will rarely need to work with the store
  directly except to retrieve records and collections.  
  
  Internally, the store will keep track of changes to your json data hashes
  and manage syncing those changes with your data source.  A data source may
  be a server, local storage, or any other persistent code.

  @extends SC.Object
  @since SproutCore 1.0
*/
SC.Store = SC.Object.extend( /** @scope SC.Store.prototype */ {
  
  /**
    An (optional) name of the store, which can be useful during debugging,
    especially if you have multiple nested stores.
    
    @property {String}
  */
  name: null,

  /**
    An array of all the chained stores that current rely on the receiver 
    store.
    
    @property {Array}
  */
  nestedStores: null,

  /**
    The data source is the persistent storage that will provide data to the
    store and save changes.  You normally will set your data source when you
    first create your store in your application.
    
    @property {SC.DataSource}
  */
  dataSource: null,
  
  /**
    This type of store is not nested.
    
    @property {Boolean}
  */
  isNested: NO,
  
  /**
    This type of store is not nested.
    
    @property {Boolean}
  */
  commitRecordsAutomatically: NO,
  
  // ..........................................................
  // DATA SOURCE SUPPORT
  // 
  
  /**
    Convenience method.  Sets the current data source to the passed property.
    This will also set the store property on the dataSource to the receiver.
    
    If you are using this from the core.js method of your app, you may need to
    just pass a string naming your data source class.  If this is the case,
    then your data source will be instantiated the first time it is requested.
    
    @param {SC.DataSource|String} dataSource the data source
    @returns {SC.Store} receiver
  */
  from: function(dataSource) {
    this.set('dataSource', dataSource);
    return this ;
  },
  
  // lazily convert data source to real object
  _getDataSource: function() {
    var ret = this.get('dataSource');
    if (typeof ret === SC.T_STRING) {
      ret = SC.objectForPropertyPath(ret);
      if (ret && ret.isClass) ret = ret.create();
      if (ret) this.set('dataSource', ret);
    }
    return ret;
  },
  
  /**
    Convenience method.  Creates a CascadeDataSource with the passed 
    data source arguments and sets the CascadeDataSource as the data source 
    for the receiver.
    
    @param {SC.DataSource...} dataSource one or more data source arguments
    @returns {SC.Store} reciever
  */
  cascade: function(dataSource) {
    var dataSources = SC.A(arguments) ;
    dataSource = SC.CascadeDataSource.create({
      dataSources: dataSources 
    });
    return this.from(dataSource);
  },
  
  // ..........................................................
  // STORE CHAINING
  // 
  
  /**  
    Returns a new nested store instance that can be used to buffer changes
    until you are ready to commit them.  When you are ready to commit your 
    changes, call commitChanges() or destroyChanges() and then destroy() when
    you are finished with the chained store altogether.
    
    {{{
      store = MyApp.store.chain();
      .. edit edit edit
      store.commitChanges().destroy();
    }}}
    
    @param {Hash} attrs optional attributes to set on new store
    @param {Class} newStoreClass optional the class of the newly-created nested store (defaults to SC.NestedStore)
    @returns {SC.NestedStore} new nested store chained to receiver
  */
  chain: function(attrs, newStoreClass) {
    if (!attrs) attrs = {};
    attrs.parentStore = this;
    
    if (newStoreClass) {
      // Ensure the passed-in class is a type of nested store.
      if (SC.typeOf(newStoreClass) !== 'class') throw new Error("%@ is not a valid class".fmt(newStoreClass));
      if (!SC.kindOf(newStoreClass, SC.NestedStore)) throw new Error("%@ is not a type of SC.NestedStore".fmt(newStoreClass));
    }
    else {
      newStoreClass = SC.NestedStore;
    }
    
    // Replicate parent records references
    attrs.childRecords = this.childRecords ? SC.clone(this.childRecords) : {};
    attrs.parentRecords = this.parentRecords ? SC.clone(this.parentRecords) : {};
    
    var ret    = newStoreClass.create(attrs),
        nested = this.nestedStores;
        
    if (!nested) nested = this.nestedStores = [];
    nested.push(ret);
    return ret ;
  },
  
  /** @private
  
    Called by a nested store just before it is destroyed so that the parent
    can remove the store from its list of nested stores.
    
    @returns {SC.Store} receiver
  */
  willDestroyNestedStore: function(nestedStore) {
    if (this.nestedStores) {
      this.nestedStores.removeObject(nestedStore);
    }
    return this ;
  },

  /**
    Used to determine if a nested store belongs directly or indirectly to the
    receiver.
    
    @param {SC.Store} store store instance
    @returns {Boolean} YES if belongs
  */
  hasNestedStore: function(store) {
    while(store && (store !== this)) store = store.get('parentStore');
    return store === this ;
  },

  // ..........................................................
  // SHARED DATA STRUCTURES 
  // 
  
  /** @private
    JSON data hashes indexed by store key.  
    
    *IMPORTANT: Property is not observable*

    Shared by a store and its child stores until you make edits to it.
    
    @property {Hash}
  */
  dataHashes: null,

  /** @private
    The current status of a data hash indexed by store key.
    
    *IMPORTANT: Property is not observable*

    Shared by a store and its child stores until you make edits to it.
    
    @property {Hash}
  */
  statuses: null,
    
  /** @private
    This array contains the revisions for the attributes indexed by the 
    storeKey.  
    
    *IMPORTANT: Property is not observable*
    
    Revisions are used to keep track of when an attribute hash has been 
    changed. A store shares the revisions data with its parent until it 
    starts to make changes to it.
    
    @property {Hash}
  */
  revisions: null,

  /**
    Array indicates whether a data hash is possibly in use by an external 
    record for editing.  If a data hash is editable then it may be modified
    at any time and therefore chained stores may need to clone the 
    attributes before keeping a copy of them.
  
    Note that this is kept as an array because it will be stored as a dense 
    array on some browsers, making it faster.
    
    @property {Array}
  */
  editables: null,
    
  /**
    A set of storeKeys that need to be committed back to the data source. If
    you call commitRecords() without passing any other parameters, the keys
    in this set will be committed instead.
  
    @property {SC.Set}
  */
  changelog: null,
  
  /**
    An array of SC.Error objects associated with individual records in the
    store (indexed by store keys).
    
    Errors passed form the data source in the call to dataSourceDidError() are
    stored here.
    
    @property {Array}
  */
  recordErrors: null,
  
  /**
    A hash of SC.Error objects associated with queries (indexed by the GUID
    of the query).
    
    Errors passed from the data source in the call to dataSourceDidErrorQuery()
    are stored here.
    
    @property {Hash}
  */
  queryErrors: null,
  
  /**
    A hash of child Records and there immediate parents
  */
  childRecords: null,
  
  /**
    A hash of parent records with registered children
  */
  parentRecords: null,
  
  // ..........................................................
  // CORE ATTRIBUTE API
  // 
  // The methods in this layer work on data hashes in the store.  They do not
  // perform any changes that can impact records.  Usually you will not need 
  // to use these methods.
  
  /**
    Returns the current edit status of a storekey.  May be one of EDITABLE or
    LOCKED.  Used mostly for unit testing.
    
    @param {Number} storeKey the store key
    @returns {Number} edit status
  */
  storeKeyEditState: function(storeKey) {
    var editables = this.editables, locks = this.locks;
    return (editables && editables[storeKey]) ? SC.Store.EDITABLE : SC.Store.LOCKED ;
  },
   
  /** 
    Returns the data hash for the given storeKey.  This will also 'lock'
    the hash so that further edits to the parent store will no 
    longer be reflected in this store until you reset.
    
    @param {Number} storeKey key to retrieve
    @returns {Hash} data hash or null
  */
  readDataHash: function(storeKey) {
    return this.dataHashes[storeKey];
  },
  
  /** 
    Returns the data hash for the storeKey, cloned so that you can edit
    the contents of the attributes if you like.  This will do the extra work
    to make sure that you only clone the attributes one time.  
    
    If you use this method to modify data hash, be sure to call 
    dataHashDidChange() when you make edits to record the change.
    
    @param {Number} storeKey the store key to retrieve
    @returns {Hash} the attributes hash
  */
  readEditableDataHash: function(storeKey) {
    // read the value - if there is no hash just return; nothing to do
    var ret = this.dataHashes[storeKey];
    if (!ret) return ret ; // nothing to do.

    // clone data hash if not editable
    var editables = this.editables;
    if (!editables) editables = this.editables = [];
    if (!editables[storeKey]) {
      editables[storeKey] = 1 ; // use number to store as dense array
      ret = this.dataHashes[storeKey] = SC.clone(ret, YES);
    }
    return ret;
  },
  
  /**
    Reads a property from the hash - cloning it if needed so you can modify 
    it independently of any parent store.  This method is really only well
    tested for use with toMany relationships.  Although it is public you 
    generally should not call it directly.
    
    @param {Number} storeKey storeKey of data hash 
    @param {String} propertyName property to read
    @returns {Object} editable property value
  */
  readEditableProperty: function(storeKey, propertyName) {
    var hash      = this.readEditableDataHash(storeKey), 
        editables = this.editables[storeKey], // get editable info...
        ret       = hash[propertyName];
        
    // editables must be made into a hash so that we can keep track of which
    // properties have already been made editable
    if (editables === 1) editables = this.editables[storeKey] = {};
    
    // clone if needed
    if (!editables[propertyName]) {
      ret = hash[propertyName];
      if (ret && ret.isCopyable) ret = hash[propertyName] = ret.copy(YES);
      editables[propertyName] = YES ;
    }
    
    return ret ;
  },
  
  /**
    Replaces the data hash for the storeKey.  This will lock the data hash and
    mark them as cloned.  This will also call dataHashDidChange() for you.
    
    Note that the hash you set here must be a different object from the 
    original data hash.  Once you make a change here, you must also call
    dataHashDidChange() to register the changes.

    If the data hash does not yet exist in the store, this method will add it.
    Pass the optional status to edit the status as well.
    
    @param {Number} storeKey the store key to write
    @param {Hash} hash the new hash
    @param {String} status the new hash status
    @returns {SC.Store} receiver
  */
  writeDataHash: function(storeKey, hash, status) {

    // update dataHashes and optionally status.
    if (hash) this.dataHashes[storeKey] = hash;
    if (status) this.statuses[storeKey] = status ;
    
    // also note that this hash is now editable
    var editables = this.editables;
    if (!editables) editables = this.editables = [];
    editables[storeKey] = 1 ; // use number for dense array support
    
    var that = this;
    this._propagateToChildren(storeKey, function(storeKey){
      that.writeDataHash(storeKey, null, status);
    });
    
    return this ;
  },

  /**
    Removes the data hash from the store.  This does not imply a deletion of
    the record.  You could be simply unloading the record.  Eitherway, 
    removing the dataHash will be synced back to the parent store but not to 
    the server.
    
    Note that you can optionally pass a new status to go along with this. If
    you do not pass a status, it will change the status to SC.RECORD_EMPTY
    (assuming you just unloaded the record).  If you are deleting the record
    you may set it to SC.Record.DESTROYED_CLEAN.
    
    Be sure to also call dataHashDidChange() to register this change.
    
    @param {Number} storeKey
    @param {String} status optional new status
    @returns {SC.Store} reciever
  */
  removeDataHash: function(storeKey, status) {
     // don't use delete -- that will allow parent dataHash to come through
    this.dataHashes[storeKey] = null;  
    this.statuses[storeKey] = status || SC.Record.EMPTY;
    
    // hash is gone and therefore no longer editable
    var editables = this.editables;
    if (editables) editables[storeKey] = 0 ;
    
    return this ;    
  },
  
  /**
    Reads the current status for a storeKey.  This will also lock the data 
    hash.  If no status is found, returns SC.RECORD_EMPTY.
    
    @param {Number} storeKey the store key
    @returns {Number} status
  */
  readStatus: function(storeKey) {
    // use readDataHash to handle optimistic locking.  this could be inlined
    // but for now this minimized copy-and-paste code.
    this.readDataHash(storeKey);
    return this.statuses[storeKey] || SC.Record.EMPTY;
  },
  
  /**
    Reads the current status for the storeKey without actually locking the 
    record.  Usually you won't need to use this method.  It is mostly used
    internally.
    
    @param {Number} storeKey the store key
    @returns {Number} status
  */
  peekStatus: function(storeKey) {
    return this.statuses[storeKey] || SC.Record.EMPTY;  
  },
  
  /**
    Writes the current status for a storeKey.  If the new status is 
    SC.Record.ERROR, you may also pass an optional error object.  Otherwise 
    this param is ignored.
    
    @param {Number} storeKey the store key
    @param {String} newStatus the new status
    @param {SC.Error} error optional error object
    @returns {SC.Store} receiver
  */
  writeStatus: function(storeKey, newStatus) {
    // use writeDataHash for now to handle optimistic lock.  maximize code 
    // reuse.
    return this.writeDataHash(storeKey, null, newStatus);
  },
  
  /**
    Call this method whenever you modify some editable data hash to register
    with the Store that the attribute values have actually changed.  This will
    do the book-keeping necessary to track the change across stores including 
    managing locks.
    
    @param {Number|Array} storeKeys one or more store keys that changed
    @param {Number} rev optional new revision number. normally leave null
    @param {Boolean} statusOnly (optional) YES if only status changed
    @param {String} key that changed (optional)
    @returns {SC.Store} receiver
  */
  dataHashDidChange: function(storeKeys, rev, statusOnly, key) {
    
    // update the revision for storeKey.  Use generateStoreKey() because that
    // gaurantees a universally (to this store hierarchy anyway) unique 
    // key value.
    if (!rev) rev = SC.Store.generateStoreKey();
    var isArray, len, idx, storeKey;
    
    isArray = SC.typeOf(storeKeys) === SC.T_ARRAY;
    if (isArray) {
      len = storeKeys.length;
    } else {
      len = 1;
      storeKey = storeKeys;
    }
    
    var that = this;
    for(idx=0;idx<len;idx++) {
      if (isArray) storeKey = storeKeys[idx];
      this.revisions[storeKey] = rev;
      this._notifyRecordPropertyChange(storeKey, statusOnly, key);
      
      this._propagateToChildren(storeKey, function(storeKey){
        that.dataHashDidChange(storeKey, null, statusOnly, key);
      });
    }
    
    return this ;
  },

  /** @private 
    Will push all changes to a the recordPropertyChanges property
    and execute flush() once at the end of the runloop.
  */
  _notifyRecordPropertyChange: function(storeKey, statusOnly, key) {
    
    var records      = this.records, 
        nestedStores = this.get('nestedStores'),
        K            = SC.Store,
        rec, editState, len, idx, store, status, keys;
    
    // pass along to nested stores
    len = nestedStores ? nestedStores.length : 0 ;
    for(idx=0;idx<len;idx++) {
      store = nestedStores[idx];
      status = store.peekStatus(storeKey); // important: peek avoids read-lock
      editState = store.storeKeyEditState(storeKey);
      
      // when store needs to propagate out changes in the parent store
      // to nested stores
      if (editState === K.INHERITED) {
        store._notifyRecordPropertyChange(storeKey, statusOnly, key);

      } else if (status & SC.Record.BUSY) {
        // make sure nested store does not have any changes before resetting
        if(store.get('hasChanges')) throw K.CHAIN_CONFLICT_ERROR;
        store.reset();
      }
    }
    
    // store info in changes hash and schedule notification if needed.
    var changes = this.recordPropertyChanges;
    if (!changes) {
      changes = this.recordPropertyChanges = 
        { storeKeys:      SC.CoreSet.create(),
          records:        SC.CoreSet.create(),
          hasDataChanges: SC.CoreSet.create(),
          propertyForStoreKeys: {} };
    }
    
    changes.storeKeys.add(storeKey);

    if (records && (rec=records[storeKey])) {
      changes.records.push(storeKey);
      
      // If there are changes other than just the status we need to record
      // that information so we do the right thing during the next flush.
      // Note that if we're called multiple times before flush and one call
      // has statusOnly=true and another has statusOnly=false, the flush will
      // (correctly) operate in statusOnly=false mode.
      if (!statusOnly) changes.hasDataChanges.push(storeKey);
      
      // If this is a key specific change, make sure that only those
      // properties/keys are notified.  However, if a previous invocation of
      // _notifyRecordPropertyChange specified that all keys have changed, we
      // need to respect that.
      if (key) {
        if (!(keys = changes.propertyForStoreKeys[storeKey])) {
          keys = changes.propertyForStoreKeys[storeKey] = SC.CoreSet.create();
        }
        
        // If it's '*' instead of a set, then that means there was a previous
        // invocation that said all keys have changed.
        if (keys !== '*') {
          keys.add(key);
        }
      }
      else {
        // Mark that all properties have changed.
        changes.propertyForStoreKeys[storeKey] = '*';
      }
    }
    
    this.invokeOnce(this.flush);
    return this;
  },

  /**
    Delivers any pending changes to materialized records.  Normally this 
    happens once, automatically, at the end of the RunLoop.  If you have
    updated some records and need to update records immediately, however, 
    you may call this manually.

    @returns {SC.Store} receiver
  */
  flush: function() {
    if (!this.recordPropertyChanges) return this;
    
    var changes              = this.recordPropertyChanges,
        storeKeys            = changes.storeKeys,
        hasDataChanges       = changes.hasDataChanges,
        records              = changes.records,
        propertyForStoreKeys = changes.propertyForStoreKeys,
        recordTypes = SC.CoreSet.create(),
        rec, recordType, statusOnly, idx, len, storeKey, keys;
    
    storeKeys.forEach(function(storeKey) {
      if (records.contains(storeKey)) {
        statusOnly = hasDataChanges.contains(storeKey) ? NO : YES;
        rec = this.records[storeKey];
        keys = propertyForStoreKeys ? propertyForStoreKeys[storeKey] : null;
        
        // Are we invalidating all keys?  If so, don't pass any to
        // storeDidChangeProperties.
        if (keys === '*') keys = null;
        
        // remove it so we don't trigger this twice
        records.remove(storeKey);
        
        if (rec) rec.storeDidChangeProperties(statusOnly, keys);
      }
      
      recordType = SC.Store.recordTypeFor(storeKey);
      recordTypes.add(recordType);
      
    }, this);

    if (storeKeys.get('length') > 0) this._notifyRecordArrays(storeKeys, recordTypes);

    storeKeys.clear();
    hasDataChanges.clear();
    records.clear();
    // Provide full reference to overwrite
    this.recordPropertyChanges.propertyForStoreKeys = {};
    
    return this;
  },
  
  /**
    Resets the store content.  This will clear all internal data for all
    records, resetting them to an EMPTY state.  You generally do not want
    to call this method yourself, though you may override it.
    
    @returns {SC.Store} receiver
  */
  reset: function() {
    
    // create a new empty data store
    this.dataHashes = {} ;
    this.revisions  = {} ;
    this.statuses   = {} ;

    // also reset temporary objects and errors
    this.chainedChanges = this.locks = this.editables = null;
    this.changelog = null ;
    this.recordErrors = null;
    this.queryErrors = null;

    var records = this.records, storeKey;
    if (records) {
      for(storeKey in records) {
        if (!records.hasOwnProperty(storeKey)) continue ;
        this._notifyRecordPropertyChange(parseInt(storeKey, 10), NO);
      }
    }
    
    this.set('hasChanges', NO);
  },
  
  /** @private
    Called by a nested store on a parent store to commit any changes from the
    store.  This will copy any changed dataHashes as well as any persistant 
    change logs.
    
    If the parentStore detects a conflict with the optimistic locking, it will
    raise an exception before it makes any changes.  If you pass the 
    force flag then this detection phase will be skipped and the changes will
    be applied even if another resource has modified the store in the mean
    time.
  
    @param {SC.Store} nestedStore the child store
    @param {SC.Set} changes the set of changed store keys
    @param {Boolean} force
    @returns {SC.Store} receiver
  */
  commitChangesFromNestedStore: function(nestedStore, changes, force) {
    // first, check for optimistic locking problems
    if (!force) this._verifyLockRevisions(changes, nestedStore.locks);
    
    // OK, no locking issues.  So let's just copy them changes. 
    // get local reference to values.
    var len = changes.length, i, storeKey, myDataHashes, myStatuses, 
      myEditables, myRevisions, myParentRecords, myChildRecords, 
      chDataHashes, chStatuses, chRevisions, chParentRecords, chChildRecords;
    
    myRevisions     = this.revisions ;
    myDataHashes    = this.dataHashes;
    myStatuses      = this.statuses;
    myEditables     = this.editables ;
    myParentRecords = this.parentRecords ? this.parentRecords : this.parentRecords ={} ;
    myChildRecords  = this.childRecords ? this.childRecords : this.childRecords = {} ;
    
    // setup some arrays if needed
    if (!myEditables) myEditables = this.editables = [] ;
    chDataHashes    = nestedStore.dataHashes;
    chRevisions     = nestedStore.revisions ;
    chStatuses      = nestedStore.statuses;
    chParentRecords = nestedStore.parentRecords || {};
    chChildRecords  = nestedStore.childRecords || {};
    
    for(i=0;i<len;i++) {
      storeKey = changes[i];

      // now copy changes
      myDataHashes[storeKey]    = chDataHashes[storeKey];
      myStatuses[storeKey]      = chStatuses[storeKey];
      myRevisions[storeKey]     = chRevisions[storeKey];
      myParentRecords[storeKey] = chParentRecords[storeKey];
      myChildRecords[storeKey]  = chChildRecords[storeKey];
      
      myEditables[storeKey] = 0 ; // always make dataHash no longer editable
      
      this._notifyRecordPropertyChange(storeKey, NO);
    }
    
    // add any records to the changelog for commit handling
    var myChangelog = this.changelog, chChangelog = nestedStore.changelog;
    if (chChangelog) {
      if (!myChangelog) myChangelog = this.changelog = SC.CoreSet.create();
      myChangelog.addEach(chChangelog);
    }  
    this.changelog = myChangelog;
    
    // immediately flush changes to notify records - nested stores will flush
    // later on.
    if (!this.get('parentStore')) this.flush();
    
    return this ;
  },

  /** @private
    Verifies that the passed lock revisions match the current revisions 
    in the receiver store.  If the lock revisions do not match, then the 
    store is in a conflict and an exception will be raised.
    
    @param {Array}  changes set of changes we are trying to apply
    @param {SC.Set} locks the locks to verify
    @returns {SC.Store} receiver
  */
  _verifyLockRevisions: function(changes, locks) {
    var len = changes.length, revs = this.revisions, i, storeKey, lock, rev ;
    if (locks && revs) {
      for(i=0;i<len;i++) {
        storeKey = changes[i];
        lock = locks[storeKey] || 1;
        rev  = revs[storeKey] || 1;

        // if the save revision for the item does not match the current rev
        // the someone has changed the data hash in this store and we have
        // a conflict. 
        if (lock < rev) throw SC.Store.CHAIN_CONFLICT_ERROR;
      }   
    }
    return this ;
  },
  
  // ..........................................................
  // HIGH-LEVEL RECORD API
  // 
  
  /**
    Finds a single record instance with the specified recordType and id or an 
    array of records matching some query conditions.
    
    h2. Finding a Single Record
    
    If you pass a single recordType and id, this method will return an actual
    record instance.  If the record has not been loaded into the store yet,
    this method will ask the data source to retrieve it.  If no data source
    indicates that it can retrieve the record, then this method will return
    null.
    
    Note that if the record needs to be retrieved from the server, then the
    record instance returned from this method will not have any data yet. 
    Instead it will have a status of SC.Record.READY_LOADING.  You can monitor
    the status property to be notified when the record data is available for 
    you to use it.
    
    h2. Find a Collection of Records
    
    If you pass only a record type or a query object, you can instead find 
    all records matching a specified set of conditions.  When you call find()
    in this way, it will create a query if needed and pass it to the data
    source to fetch the results.
    
    If this is the first time you have fetched the query, then the store will
    automatically ask the data source to fetch any records related to it as 
    well.  Otherwise you can refresh the query results at anytime by calling
    refresh() on the returned RecordArray.

    You can detect whether a RecordArray is fetching from the server by 
    checking its status.
    
    h2. Examples
    
    Finding a single record:
    
    {{{
      MyApp.store.find(MyApp.Contact, "23"); // returns MyApp.Contact
    }}}
    
    Finding all records of a particular type:
    
    {{{
      MyApp.store.find(MyApp.Contact); // returns SC.RecordArray of contacts
    }}}
    
    Finding all contacts with first name John:
    
    {{{
      var query = SC.Query.local(MyApp.Contact, "firstName = %@", "John");
      MyApp.store.find(query); // returns SC.RecordArray of contacts
    }}}
    
    Finding all contacts using a remote query:
    
    {{{
      var query = SC.Query.remote(MyApp.Contact);
      MyApp.store.find(query); // returns SC.RecordArray filled by server
    }}}
    
    @param {SC.Record|String} recordType the expected record type
    @param {String} id the id to load
    @returns {SC.Record} record instance or null
  */
  find: function(recordType, id) {
    
    // if recordType is passed as string, find object
    if (SC.typeOf(recordType)===SC.T_STRING) {
      recordType = SC.objectForPropertyPath(recordType);
    }
    
    // handle passing a query...
    if ((arguments.length === 1) && !(recordType && recordType.get && recordType.get('isRecord'))) {
      if (!recordType) throw new Error("SC.Store#find() must pass recordType or query");
      if (!recordType.isQuery) {
        recordType = SC.Query.local(recordType);
      }
      return this._findQuery(recordType, YES, YES);
      
    // handle finding a single record
    } else {
      return this._findRecord(recordType, id);
    }
  },

  /** @private
    DEPRECATED used find() instead.
    
    This method will accept a record type or query and return a record array
    matching the results.  This method was commonly used prior to SproutCore 
    1.0.  It has been deprecated in favor of a single find() method instead.
    
    For compatibility, this method will continue to work in SproutCore 1.0 but
    it will raise a warning.  It will be removed in a future version of 
    SproutCore.
  */
  findAll: function(recordType, conditions, params) {
    SC.Logger.warn("SC.Store#findAll() will be removed in a future version of SproutCore.  Use SC.Store#find() instead");
    

    if (!recordType || !recordType.isQuery) {
      recordType = SC.Query.local(recordType, conditions, params);
    }
    
    return this._findQuery(recordType, YES, YES);
  },
  
  
  _findQuery: function(query, createIfNeeded, refreshIfNew) {

    // lookup the local RecordArray for this query.
    var cache = this._scst_recordArraysByQuery, 
        key   = SC.guidFor(query),
        ret, ra ;
    if (!cache) cache = this._scst_recordArraysByQuery = {};
    ret = cache[key];
    
    // if a RecordArray was not found, then create one and also add it to the
    // list of record arrays to update.
    if (!ret && createIfNeeded) {
      cache[key] = ret = SC.RecordArray.create({ store: this, query: query });

      ra = this.get('recordArrays');
      if (!ra) this.set('recordArrays', ra = SC.Set.create());
      ra.add(ret);

      if (refreshIfNew) this.refreshQuery(query);
    }
    
    this.flush();
    return ret ;
  },
  
  _findRecord: function(recordType, id) {

    var storeKey ; 
    
    // if a record instance is passed, simply use the storeKey.  This allows 
    // you to pass a record from a chained store to get the same record in the
    // current store.
    if (recordType && recordType.get && recordType.get('isRecord')) {
      storeKey = recordType.get('storeKey');
      
    // otherwise, lookup the storeKey for the passed id.  look in subclasses 
    // as well.
    } else storeKey = id ? recordType.storeKeyFor(id) : null;
    
    if (storeKey && (this.readStatus(storeKey) === SC.Record.EMPTY)) {
      storeKey = this.retrieveRecord(recordType, id);
    }
    
    // now we have the storeKey, materialize the record and return it.
    return storeKey ? this.materializeRecord(storeKey) : null ;
  },

  // ..........................................................
  // RECORD ARRAY OPERATIONS
  // 

  /**
    Called by the record array just before it is destroyed.  This will 
    de-register it from receiving future notifications.

    You should never call this method yourself.  Instead call destroy() on the
    RecordArray directly.
    
    @param {SC.RecordArray} recordArray the record array
    @returns {SC.Store} receiver
  */
  recordArrayWillDestroy: function(recordArray) {
    var cache = this._scst_recordArraysByQuery,
        set   = this.get('recordArrays');
        
    if (cache) delete cache[SC.guidFor(recordArray.get('query'))];
    if (set) set.remove(recordArray);
    return this ;
  },

  /**
    Called by the record array whenever it needs the data source to refresh
    its contents.  Nested stores will actually just pass this along to the
    parent store.  The parent store will call fetch() on the data source.

    You should never call this method yourself.  Instead call refresh() on the
    RecordArray directly.
    
    @param {SC.Query} query the record array query to refresh
    @returns {SC.Store} receiver
  */
  refreshQuery: function(query) {
    if (!query) throw new Error("refreshQuery() requires a query");

    var cache    = this._scst_recordArraysByQuery,
        recArray = cache ? cache[SC.guidFor(query)] : null, 
        source   = this._getDataSource();
        
    if (source && source.fetch) {
      if (recArray) recArray.storeWillFetchQuery(query);
      source.fetch.call(source, this, query);
    }
    
    return this ;      
  },
  
  /** @private 
    Will ask all record arrays that have been returned from findAll
    with an SC.Query to check their arrays with the new storeKeys
    
    @param {SC.IndexSet} storeKeys set of storeKeys that changed
    @param {SC.Set} recordTypes
    @returns {SC.Store} receiver
  */
  _notifyRecordArrays: function(storeKeys, recordTypes) {
    var recordArrays = this.get('recordArrays');
    if (!recordArrays) return this;

    recordArrays.forEach(function(recArray) {
      if (recArray) recArray.storeDidChangeStoreKeys(storeKeys, recordTypes);
    }, this);
    
    return this ;
  },
  
  
  // ..........................................................
  // LOW-LEVEL HELPERS
  // 
  
  /**
    Array of all records currently in the store with the specified
    type.  This method only reflects the actual records loaded into memory and
    therefore is not usually needed at runtime.  However you will often use
    this method for testing.
    
    @param {SC.Record} recordType the record type
    @returns {SC.Array} array instance - usually SC.RecordArray
  */
  recordsFor: function(recordType) {
    var storeKeys     = [], 
        storeKeysById = recordType.storeKeysById(),
        id, storeKey, ret;
    
    // collect all non-empty store keys
    for(id in storeKeysById) {
      storeKey = storeKeysById[id]; // get the storeKey
      if (this.readStatus(storeKey) !== SC.RECORD_EMPTY) {
        storeKeys.push(storeKey);
      }
    }
    
    if (storeKeys.length>0) {
      ret = SC.RecordArray.create({ store: this, storeKeys: storeKeys });
    } else ret = storeKeys; // empty array
    return ret ;
  },
  
  _TMP_REC_ATTRS: {},
  
  /** 
    Given a storeKey, return a materialized record.  You will not usually
    call this method yourself.  Instead it will used by other methods when
    you find records by id or perform other searches.

    If a recordType has been mapped to the storeKey, then a record instance
    will be returned even if the data hash has not been requested yet.
    
    Each Store instance returns unique record instances for each storeKey.

    @param {Number} storeKey The storeKey for the dataHash.
    @returns {SC.Record} Returns a record instance.
  */
  materializeRecord: function(storeKey) {
    var records = this.records, ret, recordType, attrs;
    
    // look up in cached records
    if (!records) records = this.records = {}; // load cached records
    ret = records[storeKey];
    if (ret) return ret;
    
    // not found -- OK, create one then.
    recordType = SC.Store.recordTypeFor(storeKey);
    if (!recordType) return null; // not recordType registered, nothing to do
    
    attrs = this._TMP_REC_ATTRS ;
    attrs.storeKey = storeKey ;
    attrs.store    = this ;
    ret = records[storeKey] = recordType.create(attrs);
    
    return ret ;
  },

  // ..........................................................
  // CORE RECORDS API
  // 
  // The methods in this section can be used to manipulate records without 
  // actually creating record instances.
  
  /**
    Creates a new record instance with the passed recordType and dataHash.
    You can also optionally specify an id or else it will be pulled from the 
    data hash.

    Note that the record will not yet be saved back to the server.  To save
    a record to the server, call commitChanges() on the store.

    @param {SC.Record} recordType the record class to use on creation
    @param {Hash} dataHash the JSON attributes to assign to the hash.
    @param {String} id (optional) id to assign to record

    @returns {SC.Record} Returns the created record
  */
  createRecord: function(recordType, dataHash, id) {
    var primaryKey, storeKey, status, K = SC.Record, changelog, defaultVal,
        ret;
    
    // First, try to get an id.  If no id is passed, look it up in the 
    // dataHash.
    if (!id && (primaryKey = recordType.prototype.primaryKey)) {
      id = dataHash[primaryKey];
      // if still no id, check if there is a defaultValue function for
      // the primaryKey attribute and assign that
      defaultVal = recordType.prototype[primaryKey] ? recordType.prototype[primaryKey].defaultValue : null;
      if(!id && SC.typeOf(defaultVal)===SC.T_FUNCTION) {
        id = dataHash[primaryKey] = defaultVal();
      }
    }
    
    // Next get the storeKey - base on id if available
    storeKey = id ? recordType.storeKeyFor(id) : SC.Store.generateStoreKey();
    
    // now, check the state and do the right thing.
    status = this.readStatus(storeKey);
    
    // check state
    // any busy or ready state or destroyed dirty state is not allowed
    if ((status & K.BUSY)  || 
        (status & K.READY) || 
        (status === K.DESTROYED_DIRTY)) { 
      throw id ? K.RECORD_EXISTS_ERROR : K.BAD_STATE_ERROR;
      
    // allow error or destroyed state only with id
    } else if (!id && (status===SC.DESTROYED_CLEAN || status===SC.ERROR)) {
      throw K.BAD_STATE_ERROR;
    }
    
    // add dataHash and setup initial status -- also save recordType
    this.writeDataHash(storeKey, (dataHash ? dataHash : {}), K.READY_NEW);
    
    SC.Store.replaceRecordTypeFor(storeKey, recordType);
    this.dataHashDidChange(storeKey);
    
    // Record is now in a committable state -- add storeKey to changelog
    changelog = this.changelog;
    if (!changelog) changelog = SC.Set.create();
    changelog.add(storeKey);
    this.changelog = changelog;
    
    // if commit records is enabled
    if(this.get('commitRecordsAutomatically')){
      this.invokeLast(this.commitRecords);
    }
    
    // Finally return materialized record, after we propagate the status to
    // any aggregrate records.
    ret = this.materializeRecord(storeKey);
    if (ret) ret.propagateToAggregates();
    return ret;
  },  
  
  /**
    Creates an array of new records.  You must pass an array of dataHashes 
    plus a recordType and, optionally, an array of ids.  This will create an
    array of record instances with the same record type.
    
    If you need to instead create a bunch of records with different data types
    you can instead pass an array of recordTypes, one for each data hash.
    
    @param {SC.Record|Array} recordTypes class or array of classes
    @param {Array} dataHashes array of data hashes
    @param {Array} ids (optional) ids to assign to records
    @returns {Array} array of materialized record instances.
  */
  createRecords: function(recordTypes, dataHashes, ids) {
    var ret = [], recordType, id, isArray, len = dataHashes.length, idx ;
    isArray = SC.typeOf(recordTypes) === SC.T_ARRAY;
    if (!isArray) recordType = recordTypes;
    for(idx=0;idx<len;idx++) {
      if (isArray) recordType = recordTypes[idx] || SC.Record;
      id = ids ? ids[idx] : undefined ;
      ret.push(this.createRecord(recordType, dataHashes[idx], id));
    }
    return ret ;
  },
  
  
  /**
    Unloads a record, removing the data hash from the store.  If you try to 
    unload a record that is already destroyed then this method will have no effect.  
    If you unload a record that does not exist or an error then an exception 
    will be raised.
    
    @param {SC.Record} recordType the recordType
    @param {String} id the record id
    @param {Number} storeKey (optional) if passed, ignores recordType and id
    @returns {SC.Store} receiver
  */
  unloadRecord: function(recordType, id, storeKey, newStatus) {
    if (storeKey === undefined) storeKey = recordType.storeKeyFor(id);
    var status = this.readStatus(storeKey), K = SC.Record;
    newStatus = newStatus || K.EMPTY;
    // handle status - ignore if destroying or destroyed
    if ((status === K.BUSY_DESTROYING) || (status & K.DESTROYED)) {
      return this; // nothing to do
      
    // error out if empty
    } else if (status & K.BUSY) {
      throw K.BUSY_ERROR ;
           
    // otherwise, destroy in dirty state
    } else status = newStatus ;
    
    // remove the data hash, set new status
    this.removeDataHash(storeKey, status);
    this.dataHashDidChange(storeKey);
    
    // Handle all the child Records
    var that = this;
    this._propagateToChildren(storeKey, function(storeKey){
      that.unloadRecord(null, null, storeKey, newStatus);
    });
      
    return this ;
  },
  
  /**
    Unloads a group of records.  If you have a set of record ids, unloading
    them this way can be faster than retrieving each record and unloading 
    it individually.

    You can pass either a single recordType or an array of recordTypes.  If
    you pass a single recordType, then the record type will be used for each
    record.  If you pass an array, then each id must have a matching record 
    type in the array.

    You can optionally pass an array of storeKeys instead of the recordType
    and ids.  In this case the first two parameters will be ignored.  This
    is usually only used by low-level internal methods.  You will not usually
    unload records this way.

    @param {SC.Record|Array} recordTypes class or array of classes
    @param {Array} ids (optional) ids to unload
    @param {Array} storeKeys (optional) store keys to unload
    @returns {SC.Store} receiver
  */
  unloadRecords: function(recordTypes, ids, storeKeys, newStatus) {
    var len, isArray, idx, id, recordType, storeKey;

    if (storeKeys === undefined) {
      isArray = SC.typeOf(recordTypes) === SC.T_ARRAY;
      if (!isArray) recordType = recordTypes;
      if (ids === undefined) {
        len = isArray ? recordTypes.length : 1;
        for (idx = 0; idx < len; idx++) {
          if (isArray) recordType = recordTypes[idx];
          storeKeys = this.storeKeysFor(recordType);
          this.unloadRecords(undefined, undefined, storeKeys, newStatus);
        }
      } else {
        len = ids.length;
        for (idx = 0; idx < len; idx++) {
          if (isArray) recordType = recordTypes[idx] || SC.Record;
          id = ids ? ids[idx] : undefined;
          this.unloadRecord(recordType, id, undefined, newStatus);
        }
      }
    } else {
      len = storeKeys.length;
      for (idx = 0; idx < len; idx++) {
        storeKey = storeKeys ? storeKeys[idx] : undefined;
        this.unloadRecord(undefined, undefined, storeKey, newStatus);
      }
    }

    return this;
  },

  /**
    Destroys a record, removing the data hash from the store and adding the
    record to the destroyed changelog.  If you try to destroy a record that is 
    already destroyed then this method will have no effect.  If you destroy a 
    record that does not exist or an error then an exception will be raised.
    
    @param {SC.Record} recordType the recordType
    @param {String} id the record id
    @param {Number} storeKey (optional) if passed, ignores recordType and id
    @returns {SC.Store} receiver
  */
  destroyRecord: function(recordType, id, storeKey) {
    if (storeKey === undefined) storeKey = recordType.storeKeyFor(id);
    var status = this.readStatus(storeKey), changelog, K = SC.Record;

    // handle status - ignore if destroying or destroyed
    if ((status === K.BUSY_DESTROYING) || (status & K.DESTROYED)) {
      return this; // nothing to do
      
    // error out if empty
    } else if (status === K.EMPTY) {
      throw K.NOT_FOUND_ERROR ;
      
    // error out if busy
    } else if (status & K.BUSY) {
      throw K.BUSY_ERROR ;
      
    // if new status, destroy but leave in clean state
    } else if (status === K.READY_NEW) {
      status = K.DESTROYED_CLEAN ;
      
    // otherwise, destroy in dirty state
    } else status = K.DESTROYED_DIRTY ;
    
    // remove the data hash, set new status
    this.writeStatus(storeKey, status);
    this.dataHashDidChange(storeKey);

    // add/remove change log
    changelog = this.changelog;
    if (!changelog) changelog = this.changelog = SC.Set.create();

    ((status & K.DIRTY) ? changelog.add(storeKey) : changelog.remove(storeKey));
    this.changelog=changelog;

    // if commit records is enabled
    if(this.get('commitRecordsAutomatically')){
      this.invokeLast(this.commitRecords);
    }
    
    var that = this;
    this._propagateToChildren(storeKey, function(storeKey){
      that.destroyRecord(null, null, storeKey);
    });
        
    return this ;
  },
  
  /**
    Destroys a group of records.  If you have a set of record ids, destroying
    them this way can be faster than retrieving each record and destroying 
    it individually.
    
    You can pass either a single recordType or an array of recordTypes.  If
    you pass a single recordType, then the record type will be used for each
    record.  If you pass an array, then each id must have a matching record 
    type in the array.

    You can optionally pass an array of storeKeys instead of the recordType
    and ids.  In this case the first two parameters will be ignored.  This
    is usually only used by low-level internal methods.  You will not usually
    destroy records this way.
    
    @param {SC.Record|Array} recordTypes class or array of classes
    @param {Array} ids ids to destroy
    @param {Array} storeKeys (optional) store keys to destroy
    @returns {SC.Store} receiver
  */
  destroyRecords: function(recordTypes, ids, storeKeys) {
    var len, isArray, idx, id, recordType, storeKey;
    if(storeKeys===undefined){
      len = ids.length;
      isArray = SC.typeOf(recordTypes) === SC.T_ARRAY;
      if (!isArray) recordType = recordTypes;
      for(idx=0;idx<len;idx++) {
        if (isArray) recordType = recordTypes[idx] || SC.Record;
        id = ids ? ids[idx] : undefined ;
        this.destroyRecord(recordType, id, undefined);
      }
    }else{
      len = storeKeys.length;
      for(idx=0;idx<len;idx++) {
        storeKey = storeKeys ? storeKeys[idx] : undefined ;
        this.destroyRecord(undefined, undefined, storeKey);
      }
    }
    return this ;
  },
  
  /**
    register a Child Record to the parent
  */
  registerChildToParent: function(parentStoreKey, childStoreKey, path){
    var prs, crs, oldPk, oldChildren, pkRef;
    // Check the child to see if it has a parent
    crs = this.childRecords || {};
    prs = this.parentRecords || {};
    // first rid of the old parent
    oldPk = crs[childStoreKey];
    if (oldPk){
      oldChildren = prs[oldPk];
      delete oldChildren[childStoreKey];
      // this.recordDidChange(null, null, oldPk, key);
    }
    pkRef = prs[parentStoreKey] || {};
    pkRef[childStoreKey] = path || YES;
    prs[parentStoreKey] = pkRef;
    crs[childStoreKey] = parentStoreKey;
    // sync the status of the child
    this.writeStatus(childStoreKey, this.statuses[parentStoreKey]);
    this.childRecords = crs;
    this.parentRecords = prs;
  },
  
  /**
    materialize the parent when passing in a store key for the child
  */
  materializeParentRecord: function(childStoreKey){
    var pk, crs;
    if (SC.none(childStoreKey)) return null;
    crs = this.childRecords;
    pk = crs ? this.childRecords[childStoreKey] : null ;
    if (SC.none(pk)) return null;
    
    return this.materializeRecord(pk);
  },
  
  /**
    function for retrieving a parent record key
  */
  parentStoreKeyExists: function(storeKey){
    if (SC.none(storeKey)) return ;
    var crs = this.childRecords || {};
    return crs[storeKey];
  },
  
  /**
    function that propigates a function all to all children
  */
  _propagateToChildren: function(storeKey, func){
    // Handle all the child Records
    if ( SC.none(this.parentRecords) ) return;
    var children = this.parentRecords[storeKey] || {};
    if (SC.none(func)) return;
    for (var key in children) {
      if (children.hasOwnProperty(key)) func(key);
    }
  },
  
  /**
    Notes that the data for the given record id has changed.  The record will
    be committed to the server the next time you commit the root store.  Only
    call this method on a record in a READY state of some type.
    
    @param {SC.Record} recordType the recordType
    @param {String} id the record id
    @param {Number} storeKey (optional) if passed, ignores recordType and id
    @param {String} key that changed (optional)
    @param {Boolean} if the change is to statusOnly (optional)
    @returns {SC.Store} receiver
  */
  recordDidChange: function(recordType, id, storeKey, key, statusOnly) {
    if (storeKey === undefined) storeKey = recordType.storeKeyFor(id);
    var status = this.readStatus(storeKey), changelog, K = SC.Record;
    
    // BUSY_LOADING, BUSY_CREATING, BUSY_COMMITTING, BUSY_REFRESH_CLEAN
    // BUSY_REFRESH_DIRTY, BUSY_DESTROYING
    if (status & K.BUSY) {
      throw K.BUSY_ERROR ;
      
    // if record is not in ready state, then it is not found.
    // ERROR, EMPTY, DESTROYED_CLEAN, DESTROYED_DIRTY
    } else if (!(status & K.READY)) {
      throw K.NOT_FOUND_ERROR ;
      
    // otherwise, make new status READY_DIRTY unless new.
    // K.READY_CLEAN, K.READY_DIRTY, ignore K.READY_NEW
    } else {
      if (status != K.READY_NEW) this.writeStatus(storeKey, K.READY_DIRTY);
    }
    
    // record data hash change
    this.dataHashDidChange(storeKey, null, statusOnly, key);
    
    // record in changelog
    changelog = this.changelog ;
    if (!changelog) changelog = this.changelog = SC.Set.create() ;
    changelog.add(storeKey);
    this.changelog = changelog;
    
    // if commit records is enabled
    if(this.get('commitRecordsAutomatically')){
      this.invokeLast(this.commitRecords);
    }
    
    return this ;
  },

  /**
    Mark a group of records as dirty.  The records will be committed to the
    server the next time you commit changes on the root store.  If you have a 
    set of record ids, marking them dirty this way can be faster than 
    retrieving each record and destroying it individually.
    
    You can pass either a single recordType or an array of recordTypes.  If
    you pass a single recordType, then the record type will be used for each
    record.  If you pass an array, then each id must have a matching record 
    type in the array.

    You can optionally pass an array of storeKeys instead of the recordType
    and ids.  In this case the first two parameters will be ignored.  This
    is usually only used by low-level internal methods.  
    
    @param {SC.Record|Array} recordTypes class or array of classes
    @param {Array} ids ids to destroy
    @param {Array} storeKeys (optional) store keys to destroy
    @returns {SC.Store} receiver
  */
  recordsDidChange: function(recordTypes, ids, storeKeys) {
     var len, isArray, idx, id, recordType, storeKey;
      if(storeKeys===undefined){
        len = ids.length;
        isArray = SC.typeOf(recordTypes) === SC.T_ARRAY;
        if (!isArray) recordType = recordTypes;
        for(idx=0;idx<len;idx++) {
          if (isArray) recordType = recordTypes[idx] || SC.Record;
          id = ids ? ids[idx] : undefined ;
          storeKey = storeKeys ? storeKeys[idx] : undefined ;
          this.recordDidChange(recordType, id, storeKey);
        }
      }else{
        len = storeKeys.length;
        for(idx=0;idx<len;idx++) {
          storeKey = storeKeys ? storeKeys[idx] : undefined ;
          this.recordDidChange(undefined, undefined, storeKey);
        }
      }
      return this ;  
  },

  /**
    Retrieves a set of records from the server.  If the records has 
    already been loaded in the store, then this method will simply return.  
    Otherwise if your store has a dataSource, this will call the 
    dataSource to retrieve the record.  Generally you will not need to 
    call this method yourself. Instead you can just use find().
    
    This will not actually create a record instance but it will initiate a 
    load of the record from the server.  You can subsequently get a record 
    instance itself using materializeRecord()
    
    @param {SC.Record|Array} recordTypes class or array of classes
    @param {Array} ids ids to retrieve
    @param {Array} storeKeys (optional) store keys to retrieve
    @param {Boolean} isRefresh
    @returns {Array} storeKeys to be retrieved
  */
  retrieveRecords: function(recordTypes, ids, storeKeys, isRefresh) {
    
    var source  = this._getDataSource(),
        isArray = SC.typeOf(recordTypes) === SC.T_ARRAY,
        len     = (!storeKeys) ? ids.length : storeKeys.length,
        ret     = [],
        rev     = SC.Store.generateStoreKey(),
        K       = SC.Record,
        recordType, idx, storeKey, status, ok;
        
    if (!isArray) recordType = recordTypes;
    
    // if no storeKeys were passed, map recordTypes + ids
    for(idx=0;idx<len;idx++) {
      
      // collect store key
      if (storeKeys) {
        storeKey = storeKeys[idx];
      } else {
        if (isArray) recordType = recordTypes[idx];
        storeKey = recordType.storeKeyFor(ids[idx]);
      }
      
      // collect status and process
      status = this.readStatus(storeKey);
      
      // K.EMPTY, K.ERROR, K.DESTROYED_CLEAN - initial retrieval
      if ((status == K.EMPTY) || (status == K.ERROR) || (status == K.DESTROYED_CLEAN)) {
        this.writeStatus(storeKey, K.BUSY_LOADING);
        this.dataHashDidChange(storeKey, rev, YES);
        ret.push(storeKey);

      // otherwise, ignore record unless isRefresh is YES.
      } else if (isRefresh) {
        // K.READY_CLEAN, K.READY_DIRTY, ignore K.READY_NEW
        if (status & K.READY) {
          this.writeStatus(storeKey, K.BUSY_REFRESH | (status & 0x03)) ;
          this.dataHashDidChange(storeKey, rev, YES);
          ret.push(storeKey);

        // K.BUSY_DESTROYING, K.BUSY_COMMITTING, K.BUSY_CREATING
        } else if ((status == K.BUSY_DESTROYING) || (status == K.BUSY_CREATING) || (status == K.BUSY_COMMITTING)) {
          throw K.BUSY_ERROR ;

        // K.DESTROY_DIRTY, bad state...
        } else if (status == K.DESTROYED_DIRTY) {
          throw K.BAD_STATE_ERROR ;
          
        // ignore K.BUSY_LOADING, K.BUSY_REFRESH_CLEAN, K.BUSY_REFRESH_DIRTY
        }
      }
    }
    
    // now retrieve storekeys from dataSource.  if there is no dataSource,
    // then act as if we couldn't retrieve.
    ok = NO;
    if (source) ok = source.retrieveRecords.call(source, this, ret, ids);

    // if the data source could not retrieve or if there is no source, then
    // simulate the data source calling dataSourceDidError on those we are 
    // loading for the first time or dataSourceDidComplete on refreshes.
    if (!ok) {
      len = ret.length;
      rev = SC.Store.generateStoreKey();
      for(idx=0;idx<len;idx++) {
        storeKey = ret[idx];
        status   = this.readStatus(storeKey);
        if (status === K.BUSY_LOADING) {
          this.writeStatus(storeKey, K.ERROR);
          this.dataHashDidChange(storeKey, rev, YES);
          
        } else if (status & K.BUSY_REFRESH) {
          this.writeStatus(storeKey, K.READY | (status & 0x03));
          this.dataHashDidChange(storeKey, rev, YES);
        }
      }
      ret.length = 0 ; // truncate to indicate that none could refresh
    }
    return ret ;
  },
  
  _TMP_RETRIEVE_ARRAY: [],
  
  /**
    Retrieves a record from the server.  If the record has already been loaded
    in the store, then this method will simply return.  Otherwise if your 
    store has a dataSource, this will call the dataSource to retrieve the 
    record.  Generally you will not need to call this method yourself.  
    Instead you can just use find().
    
    This will not actually create a record instance but it will initiate a 
    load of the record from the server.  You can subsequently get a record 
    instance itself using materializeRecord()

    @param {SC.Record} recordType class
    @param {String} id id to retrieve
    @param {Number} storeKey (optional) store key
    @param {Boolean} isRefresh
    @returns {Number} storeKey that was retrieved 
  */
  retrieveRecord: function(recordType, id, storeKey, isRefresh) {
    var array = this._TMP_RETRIEVE_ARRAY,
        ret;
    
    if (storeKey) {
      array[0] = storeKey;
      storeKey = array;
      id = null ;
    } else {
      array[0] = id;
      id = array;
    }
    
    ret = this.retrieveRecords(recordType, id, storeKey, isRefresh);
    array.length = 0 ;
    return ret[0];
  },

  /**
    Refreshes a record from the server.  If the record has already been loaded
    in the store, then this method will request a refresh from the dataSource.
    Otherwise it will attempt to retrieve the record.
    
    @param {String} id to id of the record to load
    @param {SC.Record} recordType the expected record type
    @param {Number} storeKey (optional) optional store key
    @returns {Boolean} YES if the retrieval was a success.
  */
  refreshRecord: function(recordType, id, storeKey) {
    return !!this.retrieveRecord(recordType, id, storeKey, YES);
  },

  /**
    Refreshes a set of records from the server.  If the records has already been loaded
    in the store, then this method will request a refresh from the dataSource.
    Otherwise it will attempt to retrieve them.
    
    @param {SC.Record|Array} recordTypes class or array of classes
    @param {Array} ids ids to destroy
    @param {Array} storeKeys (optional) store keys to destroy
    @returns {Boolean} YES if the retrieval was a success.
  */
  refreshRecords: function(recordTypes, ids, storeKeys) {
    var ret = this.retrieveRecords(recordTypes, ids, storeKeys, YES);
    return ret && ret.length>0;
  },
    
  /**
    Commits the passed store keys or ids. If no storeKeys are given 
    it will commit any records in the changelog. 
    
    Based on the current state of the record, this will ask the data 
    source to perform the appropriate actions
    on the store keys.
    
    @param {Array} recordTypes the expected record types (SC.Record)
    @param {Array} ids to commit
    @param {SC.Set} storeKeys to commit
    @param {Hash} params optional additional parameters to pass along to the
      data source

    @returns {Boolean} if the action was succesful.
  */
  commitRecords: function(recordTypes, ids, storeKeys, params) {
    var source    = this._getDataSource(),
        isArray   = SC.typeOf(recordTypes) === SC.T_ARRAY,    
        retCreate= [], retUpdate= [], retDestroy = [], 
        rev       = SC.Store.generateStoreKey(),
        K         = SC.Record,
        recordType, idx, storeKey, status, key, ret, len ;

    // If no params are passed, look up storeKeys in the changelog property.
    // Remove any committed records from changelog property.

    if(!recordTypes && !ids && !storeKeys){
      storeKeys = this.changelog;
    }

    len = storeKeys ? storeKeys.get('length') : (ids ? ids.get('length') : 0);
    
    for(idx=0;idx<len;idx++) {
      
      // collect store key
      if (storeKeys) {
        storeKey = storeKeys[idx];
      } else {
        if (isArray) recordType = recordTypes[idx] || SC.Record;
        else recordType = recordTypes;
        storeKey = recordType.storeKeyFor(ids[idx]);
      }
      
      // collect status and process
      status = this.readStatus(storeKey);
      
      if ((status == K.EMPTY) || (status == K.ERROR)) {
        throw K.NOT_FOUND_ERROR ;
      } 
      else {
        if(status==K.READY_NEW) {
          this.writeStatus(storeKey, K.BUSY_CREATING);
          this.dataHashDidChange(storeKey, rev, YES);
          retCreate.push(storeKey);
        } else if (status==K.READY_DIRTY) {
          this.writeStatus(storeKey, K.BUSY_COMMITTING);
          this.dataHashDidChange(storeKey, rev, YES);
          retUpdate.push(storeKey);
        } else if (status==K.DESTROYED_DIRTY) {
          this.writeStatus(storeKey, K.BUSY_DESTROYING);
          this.dataHashDidChange(storeKey, rev, YES);
          retDestroy.push(storeKey);
        } else if (status==K.DESTROYED_CLEAN) {
          this.dataHashDidChange(storeKey, rev, YES);
        }
        // ignore K.READY_CLEAN, K.BUSY_LOADING, K.BUSY_CREATING, K.BUSY_COMMITTING, 
        // K.BUSY_REFRESH_CLEAN, K_BUSY_REFRESH_DIRTY, KBUSY_DESTROYING
      }
    }
    
    // now commit storekeys to dataSource
    if (source && (len>0 || params)) {
      ret = source.commitRecords.call(source, this, retCreate, retUpdate, retDestroy, params);
    }
    
    //remove all commited changes from changelog
    if (ret && !recordTypes && !ids) {
      if (storeKeys === this.changelog) {
        this.changelog = null;
      }
      else {
        this.changelog.removeEach(storeKeys);
      }
    }
    return ret ;
  },

  /**
    Commits the passed store key or id.  Based on the current state of the 
    record, this will ask the data source to perform the appropriate action
    on the store key.
    
    You have to pass either the id or the storeKey otherwise it will return 
    NO.
    
    @param {SC.Record} recordType the expected record type
    @param {String} id the id of the record to commit
    @param {Number} storeKey the storeKey of the record to commit
    @param {Hash} params optional additonal params that will passed down
      to the data source
    @returns {Boolean} if the action was successful.
  */
  commitRecord: function(recordType, id, storeKey, params) {
    var array = this._TMP_RETRIEVE_ARRAY,
        ret ;
    if (id === undefined && storeKey === undefined ) return NO;
    if (storeKey !== undefined) {
      array[0] = storeKey;
      storeKey = array;
      id = null ;
    } else {
      array[0] = id;
      id = array;
    }
    
    ret = this.commitRecords(recordType, id, storeKey, params);
    array.length = 0 ;
    return ret;
  },
  
  /**
    Cancels an inflight request for the passed records.  Depending on the 
    server implementation, this could cancel an entire request, causing 
    other records to also transition their current state.
    
    @param {SC.Record|Array} recordTypes class or array of classes
    @param {Array} ids ids to destroy
    @param {Array} storeKeys (optional) store keys to destroy
    @returns {SC.Store} the store.
  */
  cancelRecords: function(recordTypes, ids, storeKeys) {
    var source  = this._getDataSource(),
        isArray = SC.typeOf(recordTypes) === SC.T_ARRAY,
        K       = SC.Record,
        ret     = [],
        status, len, idx, id, recordType, storeKey;
        
    len = (storeKeys === undefined) ? ids.length : storeKeys.length;
    for(idx=0;idx<len;idx++) {
      if (isArray) recordType = recordTypes[idx] || SC.Record;
      else recordType = recordTypes || SC.Record;
      
      id = ids ? ids[idx] : undefined ;
      
      if(storeKeys===undefined){
        storeKey = recordType.storeKeyFor(id);
      }else{
        storeKey = storeKeys ? storeKeys[idx] : undefined ;        
      }
      if(storeKey) {
        status = this.readStatus(storeKey);

        if ((status == K.EMPTY) || (status == K.ERROR)) {
          throw K.NOT_FOUND_ERROR ;
        }
        ret.push(storeKey);
      }
    }
    
    if (source) source.cancel.call(source, this, ret);
    
    return this ;
  },

  /**
    Cancels an inflight request for the passed record.  Depending on the 
    server implementation, this could cancel an entire request, causing 
    other records to also transition their current state.
  
    @param {SC.Record|Array} recordTypes class or array of classes
    @param {Array} ids ids to destroy
    @param {Array} storeKeys (optional) store keys to destroy
    @returns {SC.Store} the store.
  */
  cancelRecord: function(recordType, id, storeKey) {
    var array = this._TMP_RETRIEVE_ARRAY,
        ret ;
        
    if (storeKey !== undefined) {
      array[0] = storeKey;
      storeKey = array;
      id = null ;
    } else {
      array[0] = id;
      id = array;
    }
    
    ret = this.cancelRecords(recordType, id, storeKey);
    array.length = 0 ;
    return this;
  },

  /** 
    Convenience method can be called by the store or other parts of your 
    application to load a record into the store.  This method will take a
    recordType and a data hashes and either add or update the 
    record in the store. 
    
    The loaded records will be in an SC.Record.READY_CLEAN state, indicating
    they were loaded from the data source and do not need to be committed 
    back before changing.
    
    This method will check the state of the storeKey and call either 
    pushRetrieve() or dataSourceDidComplete().  The standard state constraints 
    for these methods apply here.
    
    The return value will be the storeKey used for the push.  This is often
    convenient to pass into loadQuery(), if you are fetching a remote query.
    
    If you are upgrading from a pre SproutCore 1.0 application, this method 
    is the closest to the old updateRecord().
    
    @param {SC.Record} recordType the record type
    @param {Array} dataHash to update
    @param {Array} id optional.  if not passed lookup on the hash
    @returns {String} store keys assigned to these id
  */
  loadRecord: function(recordType, dataHash, id) {
    var K       = SC.Record,
        ret, primaryKey, storeKey;
        
    // save lookup info
    recordType = recordType || SC.Record;
    primaryKey = recordType.prototype.primaryKey;
    
    
    // push each record
    id = id || dataHash[primaryKey];
    ret = storeKey = recordType.storeKeyFor(id); // needed to cache
      
    if (this.readStatus(storeKey) & K.BUSY) {
      this.dataSourceDidComplete(storeKey, dataHash, id);
    } else this.pushRetrieve(recordType, id, dataHash, storeKey);
    
    // return storeKey
    return ret ;
  },
  
  /** 
    Convenience method can be called by the store or other parts of your 
    application to load records into the store.  This method will take a
    recordType and an array of data hashes and either add or update the 
    record in the store. 
    
    The loaded records will be in an SC.Record.READY_CLEAN state, indicating
    they were loaded from the data source and do not need to be committed 
    back before changing.
    
    This method will check the state of each storeKey and call either 
    pushRetrieve() or dataSourceDidComplete().  The standard state constraints 
    for these methods apply here.
    
    The return value will be the storeKeys used for each push.  This is often
    convenient to pass into loadQuery(), if you are fetching a remote query.
    
    If you are upgrading from a pre SproutCore 1.0 application, this method 
    is the closest to the old updateRecords().
    
    @param {SC.Record} recordTypes the record type or array of record types
    @param {Array} dataHashes array of data hashes to update
    @param {Array} ids optional array of ids.  if not passed lookup on hashes
    @returns {Array} store keys assigned to these ids
  */
  loadRecords: function(recordTypes, dataHashes, ids) {
    var isArray = SC.typeOf(recordTypes) === SC.T_ARRAY,
        len     = dataHashes.get('length'),
        ret     = [],
        K       = SC.Record,
        recordType, id, primaryKey, idx, dataHash, storeKey;
        
    // save lookup info
    if (!isArray) {
      recordType = recordTypes || SC.Record;
      primaryKey = recordType.prototype.primaryKey ;
    }
    
    // push each record
    for(idx=0;idx<len;idx++) {
      dataHash = dataHashes.objectAt(idx);
      if (isArray) {
        recordType = recordTypes.objectAt(idx) || SC.Record;
        primaryKey = recordType.prototype.primaryKey ;
      }
      id = (ids) ? ids.objectAt(idx) : dataHash[primaryKey];
      ret[idx] = this.loadRecord(recordType, dataHash, id);
      
    }
    
    // return storeKeys
    return ret ;
  },

  /**
    Returns the SC.Error object associated with a specific record.

    @param {Number} storeKey The store key of the record.
 
    @returns {SC.Error} SC.Error or undefined if no error associated with the record.
  */
  readError: function(storeKey) {
    var errors = this.recordErrors ;
    return errors ? errors[storeKey] : undefined ;
  },

  /**
    Returns the SC.Error object associated with a specific query.

    @param {SC.Query} query The SC.Query with which the error is associated.
 
    @returns {SC.Error} SC.Error or undefined if no error associated with the query.
  */
  readQueryError: function(query) {
    var errors = this.queryErrors ;
    return errors ? errors[SC.guidFor(query)] : undefined ;
  },
  
  // ..........................................................
  // DATA SOURCE CALLBACKS
  // 
  // Mathods called by the data source on the store

  /**
    Called by a dataSource when it cancels an inflight operation on a 
    record.  This will transition the record back to it non-inflight state.
    
    @param {Number} storeKey record store key to cancel
    @returns {SC.Store} reciever
  */
  dataSourceDidCancel: function(storeKey) {
    var status = this.readStatus(storeKey), 
        K      = SC.Record;
    
    // EMPTY, ERROR, READY_CLEAN, READY_NEW, READY_DIRTY, DESTROYED_CLEAN,
    // DESTROYED_DIRTY
    if (!(status & K.BUSY)) {
      throw K.BAD_STATE_ERROR; // should never be called in this state
    }
    
    // otherwise, determine proper state transition
    switch(status) {
      case K.BUSY_LOADING:
        status = K.EMPTY;
        break ;
      
      case K.BUSY_CREATING:
        status = K.READY_NEW;
        break;
        
      case K.BUSY_COMMITTING:
        status = K.READY_DIRTY ;
        break;
        
      case K.BUSY_REFRESH_CLEAN:
        status = K.READY_CLEAN;
        break;
        
      case K.BUSY_REFRESH_DIRTY:
        status = K.READY_DIRTY ;
        break ;
        
      case K.BUSY_DESTROYING:
        status = K.DESTROYED_DIRTY ;
        break;
        
      default:
        throw K.BAD_STATE_ERROR ;
    } 
    this.writeStatus(storeKey, status) ;
    this.dataHashDidChange(storeKey, null, YES);
    
    return this ;
  },
  
  /**
    Called by a data source when it creates or commits a record.  Passing an
    optional id will remap the storeKey to the new record id.  This is 
    required when you commit a record that does not have an id yet.
    
    @param {Number} storeKey record store key to change to READY_CLEAN state
    @param {Hash} dataHash optional data hash to replace current hash
    @param {Object} newId optional new id to replace the old one
    @returns {SC.Store} reciever
  */
  dataSourceDidComplete: function(storeKey, dataHash, newId) {
    var status = this.readStatus(storeKey), K = SC.Record, statusOnly;
    
    // EMPTY, ERROR, READY_CLEAN, READY_NEW, READY_DIRTY, DESTROYED_CLEAN,
    // DESTROYED_DIRTY
    if (!(status & K.BUSY)) {
      throw K.BAD_STATE_ERROR; // should never be called in this state
    }
    
    // otherwise, determine proper state transition
    if(status===K.BUSY_DESTROYING) {
      throw K.BAD_STATE_ERROR ;
    } else status = K.READY_CLEAN ;

    this.writeStatus(storeKey, status) ;
    if (dataHash) this.writeDataHash(storeKey, dataHash, status) ;
    if (newId) SC.Store.replaceIdFor(storeKey, newId);
    
    statusOnly = dataHash || newId ? NO : YES;
    this.dataHashDidChange(storeKey, null, statusOnly);

    // Force record to refresh its cached properties based on store key
    var record = this.materializeRecord(storeKey);
    if (record != null) {
      record.notifyPropertyChange('status');
    }

    return this ;
  },
  
  /**
    Called by a data source when it has destroyed a record.  This will
    transition the record to the proper state.
    
    @param {Number} storeKey record store key to cancel
    @returns {SC.Store} reciever
  */
  dataSourceDidDestroy: function(storeKey) {
    var status = this.readStatus(storeKey), K = SC.Record;

    // EMPTY, ERROR, READY_CLEAN, READY_NEW, READY_DIRTY, DESTROYED_CLEAN,
    // DESTROYED_DIRTY
    if (!(status & K.BUSY)) {
      throw K.BAD_STATE_ERROR; // should never be called in this state
    }
    // otherwise, determine proper state transition
    else{
      status = K.DESTROYED_CLEAN ;
    } 
    this.removeDataHash(storeKey, status) ;
    this.dataHashDidChange(storeKey);

    // Force record to refresh its cached properties based on store key
    var record = this.materializeRecord(storeKey);
    if (record != null) {
      record.notifyPropertyChange('status');
    }

    return this ;
  },

  /**
    Converts the passed record into an error object.
    
    @param {Number} storeKey record store key to error
    @param {SC.Error} error [optional] an SC.Error instance to associate with storeKey
    @returns {SC.Store} reciever
  */
  dataSourceDidError: function(storeKey, error) {
    var status = this.readStatus(storeKey), errors = this.recordErrors, K = SC.Record;

    // EMPTY, ERROR, READY_CLEAN, READY_NEW, READY_DIRTY, DESTROYED_CLEAN,
    // DESTROYED_DIRTY
    if (!(status & K.BUSY)) { throw K.BAD_STATE_ERROR; }

    // otherwise, determine proper state transition
    else status = K.ERROR ;

    // Add the error to the array of record errors (for lookup later on if necessary).
    if (error && error.isError) {
      if (!errors) errors = this.recordErrors = [];
      errors[storeKey] = error;
    }

    this.writeStatus(storeKey, status) ;
    this.dataHashDidChange(storeKey, null, YES);

    // Force record to refresh its cached properties based on store key
    var record = this.materializeRecord(storeKey);
    if (record != null) {
      record.notifyPropertyChange('status');
    }

    return this ;
  },

  // ..........................................................
  // PUSH CHANGES FROM DATA SOURCE
  // 
  
  /**
    Call by the data source whenever you want to push new data out of band 
    into the store.
    
    @param {Class} recordType the SC.Record subclass
    @param {Object} id the record id or null
    @param {Hash} dataHash data hash to load
    @param {Number} storeKey optional store key.  
    @returns {Number|Boolean} storeKey if push was allowed, NO if not
  */
  pushRetrieve: function(recordType, id, dataHash, storeKey) {
    var K = SC.Record, status;
    
    if(storeKey===undefined) storeKey = recordType.storeKeyFor(id);
    status = this.readStatus(storeKey);
    if(status==K.EMPTY || status==K.ERROR || status==K.READY_CLEAN || status==K.DESTROYED_CLEAN) {
      
      status = K.READY_CLEAN;
      if(dataHash===undefined) this.writeStatus(storeKey, status) ;
      else this.writeDataHash(storeKey, dataHash, status) ;

      this.dataHashDidChange(storeKey);
      
      return storeKey;
    }
    //conflicted (ready)
    return NO;
  },
  
  /**
    Call by the data source whenever you want to push a deletion into the 
    store.
    
    @param {Class} recordType the SC.Record subclass
    @param {Object} id the record id or null
    @param {Number} storeKey optional store key.  
    @returns {Number|Boolean} storeKey if push was allowed, NO if not
  */
  pushDestroy: function(recordType, id, storeKey) {
    var K = SC.Record, status;

    if(storeKey===undefined){
      storeKey = recordType.storeKeyFor(id);
    }
    status = this.readStatus(storeKey);
    if(status==K.EMPTY || status==K.ERROR || status==K.READY_CLEAN || status==K.DESTROYED_CLEAN){
      status = K.DESTROYED_CLEAN;
      this.removeDataHash(storeKey, status) ;
      this.dataHashDidChange(storeKey);
      return storeKey;
    }
    //conflicted (destroy)
    return NO;
  },

  /**
    Call by the data source whenever you want to push an error into the 
    store.
    
    @param {Class} recordType the SC.Record subclass
    @param {Object} id the record id or null
    @param {SC.Error} error [optional] an SC.Error instance to associate with id or storeKey
    @param {Number} storeKey optional store key.
    @returns {Number|Boolean} storeKey if push was allowed, NO if not
  */
  pushError: function(recordType, id, error, storeKey) {
    var K = SC.Record, status, errors = this.recordErrors;

    if(storeKey===undefined) storeKey = recordType.storeKeyFor(id);
    status = this.readStatus(storeKey);

    if(status==K.EMPTY || status==K.ERROR || status==K.READY_CLEAN || status==K.DESTROYED_CLEAN){
      status = K.ERROR;
      
      // Add the error to the array of record errors (for lookup later on if necessary).
      if (error && error.isError) {
        if (!errors) errors = this.recordErrors = [];
        errors[storeKey] = error;
      }
      
      this.writeStatus(storeKey, status) ;
      this.dataHashDidChange(storeKey, null, YES);
      return storeKey;
    }
    //conflicted (error)
    return NO;
  },
  
  // ..........................................................
  // FETCH CALLBACKS
  // 
  
  // NOTE: although these method works on RecordArray instances right now.
  // They could be optimized to actually share query results between nested
  // stores.  This is why these methods are implemented here instead of 
  // directly on Query or RecordArray objects.
  
  /**
    Sets the passed array of storeKeys as the new data for the query.  You
    can call this at any time for a remote query to update its content.  If
    you want to use incremental loading, then pass a SparseArray object.
    
    If the query you pass is not a REMOTE query, then this method will raise
    an exception.  This will also implicitly transition the query state to 
    SC.Record.READY.
    
    If you called loadRecords() before to load the actual content, you can
    call this method with the return value of that method to actually set the
    storeKeys on the result.
    
    @param {SC.Query} query the query you are loading.  must be remote.
    @param {SC.Array} storeKeys array of store keys
    @returns {SC.Store} receiver
  */
  loadQueryResults: function(query, storeKeys) {
    if (query.get('location') === SC.Query.LOCAL) {
      throw new Error("Cannot load query results for a local query");
    }

    var recArray = this._findQuery(query, YES, NO);
    if (recArray) recArray.set('storeKeys', storeKeys);
    this.dataSourceDidFetchQuery(query);
    
    return this ;
  },
  
  /**
    Called by your data source whenever you finish fetching the results of a 
    query.  This will put the query into a READY state if it was loading.
    
    Note that if the query is a REMOTE query, then you must separately load 
    the results into the query using loadQueryResults().  If the query is 
    LOCAL, then the query will update automatically with any new records you 
    added to the store.
    
    @param {SC.Query} query the query you fetched
    @returns {SC.Store} receiver
  */
  dataSourceDidFetchQuery: function(query) {
    return this._scstore_dataSourceDidFetchQuery(query, YES);
  },
  
  _scstore_dataSourceDidFetchQuery: function(query, createIfNeeded) {
    var recArray     = this._findQuery(query, createIfNeeded, NO),
        nestedStores = this.get('nestedStores'),
        loc          = nestedStores ? nestedStores.get('length') : 0;
    
    // fix query if needed
    if (recArray) recArray.storeDidFetchQuery(query);
    
    // notify nested stores
    while(--loc >= 0) {
      nestedStores[loc]._scstore_dataSourceDidFetchQuery(query, NO);
    }
    
    return this ;
  },
  
  /**
    Called by your data source if it cancels fetching the results of a query.
    This will put any RecordArray's back into its original state (READY or
    EMPTY).
    
    @param {SC.Query} query the query you cancelled
    @returns {SC.Store} receiver
  */
  dataSourceDidCancelQuery: function(query) {
    return this._scstore_dataSourceDidCancelQuery(query, YES);
  },
  
  _scstore_dataSourceDidCancelQuery: function(query, createIfNeeded) {
    var recArray     = this._findQuery(query, createIfNeeded, NO),
        nestedStores = this.get('nestedStores'),
        loc          = nestedStores ? nestedStores.get('length') : 0;
    
    // fix query if needed
    if (recArray) recArray.storeDidCancelQuery(query);
    
    // notify nested stores
    while(--loc >= 0) {
      nestedStores[loc]._scstore_dataSourceDidCancelQuery(query, NO);
    }
    
    return this ;
  },
  
  /**
    Called by your data source if it encountered an error loading the query.
    This will put the query into an error state until you try to refresh it
    again.
    
    @param {SC.Query} query the query with the error
    @param {SC.Error} error [optional] an SC.Error instance to associate with query
    @returns {SC.Store} receiver
  */
  dataSourceDidErrorQuery: function(query, error) {
    var errors = this.queryErrors;

    // Add the error to the array of query errors (for lookup later on if necessary).
    if (error && error.isError) {
      if (!errors) errors = this.queryErrors = {};
      errors[SC.guidFor(query)] = error;
    }

    return this._scstore_dataSourceDidErrorQuery(query, YES);
  },

  _scstore_dataSourceDidErrorQuery: function(query, createIfNeeded) {
    var recArray     = this._findQuery(query, createIfNeeded, NO),
        nestedStores = this.get('nestedStores'),
        loc          = nestedStores ? nestedStores.get('length') : 0;

    // fix query if needed
    if (recArray) recArray.storeDidErrorQuery(query);

    // notify nested stores
    while(--loc >= 0) {
      nestedStores[loc]._scstore_dataSourceDidErrorQuery(query, NO);
    }

    return this ;
  },
    
  // ..........................................................
  // INTERNAL SUPPORT
  // 
  
  /** @private */
  init: function() {
    arguments.callee.base.apply(this,arguments);
    this.reset();
  },
  
  
  toString: function() {
    // Include the name if the client has specified one.
    var name = this.get('name');
    if (!name) {
      return arguments.callee.base.apply(this,arguments);
    }
    else {
      var ret = arguments.callee.base.apply(this,arguments);
      return "%@ (%@)".fmt(name, ret);
    }
  },


  // ..........................................................
  // PRIMARY KEY CONVENIENCE METHODS
  // 

  /** 
    Given a storeKey, return the primaryKey.
  
    @param {Number} storeKey the store key
    @returns {String} primaryKey value
  */
  idFor: function(storeKey) {
    return SC.Store.idFor(storeKey);
  },
  
  /**
    Given a storeKey, return the recordType.
    
    @param {Number} storeKey the store key
    @returns {SC.Record} record instance
  */
  recordTypeFor: function(storeKey) {
    return SC.Store.recordTypeFor(storeKey) ;
  },
  
  /**
    Given a recordType and primaryKey, find the storeKey. If the primaryKey 
    has not been assigned a storeKey yet, it will be added.
    
    @param {SC.Record} recordType the record type
    @param {String} primaryKey the primary key
    @returns {Number} storeKey
  */
  storeKeyFor: function(recordType, primaryKey) {
    return recordType.storeKeyFor(primaryKey);
  },
  
  /**
    Given a primaryKey value for the record, returns the associated
    storeKey.  As opposed to storeKeyFor() however, this method
    will NOT generate a new storeKey but returned undefined.
    
    @param {SC.Record} recordType the record type
    @param {String} primaryKey the primary key
    @returns {Number} a storeKey.
  */
  storeKeyExists: function(recordType, primaryKey) {
    return recordType.storeKeyExists(primaryKey);
  },
  
  /**
    Finds all storeKeys of a certain record type in this store
    and returns an array.
    
    @param {SC.Record} recordType
    @returns {Array} set of storeKeys
  */
  storeKeysFor: function(recordType) {
    var ret = [], 
        isEnum = recordType && recordType.isEnumerable,
        recType, storeKey, isMatch ;
    
    if (!this.statuses) return ret;
    for(storeKey in SC.Store.recordTypesByStoreKey) {
      recType = SC.Store.recordTypesByStoreKey[storeKey];
      
      // if same record type and this store has it
      if (isEnum) isMatch = recordType.contains(recType);
      else isMatch = recType === recordType;
      
      if(isMatch && this.statuses[storeKey]) ret.push(parseInt(storeKey, 10));
    }
    
    return ret;
  },
  
  /**
    Finds all storeKeys in this store
    and returns an array.
    
    @returns {Array} set of storeKeys
  */
  storeKeys: function() {
    var ret = [], storeKey;
    if(!this.statuses) return ret;
    
    for(storeKey in this.statuses) {
      // if status is not empty
      if(this.statuses[storeKey] != SC.Record.EMPTY) {
        ret.push(parseInt(storeKey, 10));
      }
    }
    
    return ret;
  },
  
  /**
    Returns string representation of a storeKey, with status.
    
    @param {Number} storeKey
    @returns {String}
  */
  statusString: function(storeKey) {
    var rec = this.materializeRecord(storeKey);
    return rec.statusString();
  }
  
}) ;

SC.Store.mixin({
  
  /**
    Standard error raised if you try to commit changes from a nested store
    and there is a conflict.
    
    @property {Error}
  */
  CHAIN_CONFLICT_ERROR: new Error("Nested Store Conflict"),
  
  /**
    Standard error if you try to perform an operation on a nested store 
    without a parent.
  
    @property {Error}
  */
  NO_PARENT_STORE_ERROR: new Error("Parent Store Required"),
  
  /**
    Standard error if you try to perform an operation on a nested store that
    is only supported in root stores.
    
    @property {Error}
  */
  NESTED_STORE_UNSUPPORTED_ERROR: new Error("Unsupported In Nested Store"),
  
  /**
    Standard error if you try to retrieve a record in a nested store that is
    dirty.  (This is allowed on the main store, but not in nested stores.)
    
    @property {Error}
  */
  NESTED_STORE_RETRIEVE_DIRTY_ERROR: new Error("Cannot Retrieve Dirty Record in Nested Store"),

  /**
    Data hash state indicates the data hash is currently editable
    
    @property {String}
  */
  EDITABLE:  'editable',
  
  /**
    Data hash state indicates the hash no longer tracks changes from a 
    parent store, but it is not editable.
    
    @property {String}
  */
  LOCKED:    'locked',

  /**
    Data hash state indicates the hash is tracking changes from the parent
    store and is not editable.
    
    @property {String}
  */
  INHERITED: 'inherited',
  
  /** @private
    This array maps all storeKeys to primary keys.  You will not normally
    access this method directly.  Instead use the idFor() and 
    storeKeyFor() methods on SC.Record.
  */
  idsByStoreKey: [],
  
  /** @private
    Maps all storeKeys to a recordType.  Once a storeKey is associated with 
    a primaryKey and recordType that remains constant throughout the lifetime
    of the application.
  */
  recordTypesByStoreKey: {},
  
  /** @private
    Maps some storeKeys to query instance.  Once a storeKey is associated with
    a query instance, that remains constant through the lifetime of the 
    application.  If a Query is destroyed, it will remove itself from this 
    list.
    
    Don't access this directly.  Use queryFor().
  */
  queriesByStoreKey: [],
  
  /** @private
    The next store key to allocate.  A storeKey must always be greater than 0
  */
  nextStoreKey: 1,
  
  /**
    Generates a new store key for use.
    
    @property {Number}
  */
  generateStoreKey: function() { return this.nextStoreKey++; },
  
  /** 
    Given a storeKey returns the primaryKey associated with the key.
    If not primaryKey is associated with the storeKey, returns null.
    
    @param {Number} storeKey the store key
    @returns {String} the primary key or null
  */
  idFor: function(storeKey) {
    return this.idsByStoreKey[storeKey] ;
  },
  
  /**
    Given a storeKey, returns the query object associated with the key.  If
    no query is associated with the storeKey, returns null.
    
    @param {Number} storeKey the store key
    @returns {SC.Query} query query object
  */
  queryFor: function(storeKey) {
    return this.queriesByStoreKey[storeKey];  
  },
  
  /**
    Given a storeKey returns the SC.Record class associated with the key.
    If no record type is associated with the store key, returns null.
    
    The SC.Record class will only be found if you have already called
    storeKeyFor() on the record.
    
    @param {Number} storeKey the store key
    @returns {SC.Record} the record type
  */
  recordTypeFor: function(storeKey) {
    return this.recordTypesByStoreKey[storeKey];
  },
  
  /**
    Swaps the primaryKey mapped to the given storeKey with the new 
    primaryKey.  If the storeKey is not currently associated with a record
    this will raise an exception.
    
    @param {Number} storeKey the existing store key
    @param {String} newPrimaryKey the new primary key
    @returns {SC.Store} receiver
  */
  replaceIdFor: function(storeKey, newId) {
    var oldId = this.idsByStoreKey[storeKey],
        recordType, storeKeys;
        
    if (oldId !== newId) { // skip if id isn't changing

      recordType = this.recordTypeFor(storeKey);
       if (!recordType) {
        throw new Error("replaceIdFor: storeKey %@ does not exist".fmt(storeKey));
      }

      // map one direction...
      this.idsByStoreKey[storeKey] = newId; 

      // then the other...
      storeKeys = recordType.storeKeysById() ;
      delete storeKeys[oldId];
      storeKeys[newId] = storeKey;     
    }
    
    return this ;
  },
  
  /**
    Swaps the recordType recorded for a given storeKey.  Normally you should
    not call this method directly as it can damage the store behavior.  This
    method is used by other store methods to set the recordType for a 
    storeKey.
    
    @param {Integer} storeKey the store key
    @param {SC.Record} recordType a record class
    @returns {SC.Store} reciever
  */
  replaceRecordTypeFor: function(storeKey, recordType) {
    this.recordTypesByStoreKey[storeKey] = recordType;
    return this ;
  }
  
});


/** @private */
SC.Store.prototype.nextStoreIndex = 1;

// ..........................................................
// COMPATIBILITY
// 

/** @private
  global store is used only for deprecated compatibility methods.  Don't use
  this in real code.
*/
SC.Store._getDefaultStore = function() {
  var store = this._store;
  if(!store) this._store = store = SC.Store.create();
  return store;
};

/** @private

  DEPRECATED
  
  Included for compatibility, loads data hashes with the named recordType. 
  If no recordType is passed, expects to find a recordType property in the 
  data hashes.  dataSource and isLoaded params are ignored.
  
  Calls SC.Store#loadRecords() on the default store. Do not use this method in 
  new code.  
  
  @param {Array} dataHashes data hashes to import
  @param {Object} dataSource ignored
  @param {SC.Record} recordType default record type
  @param {Boolean} isLoaded ignored
  @returns {Array} SC.Record instances for loaded data hashes
*/
SC.Store.updateRecords = function(dataHashes, dataSource, recordType, isLoaded) {
  
  SC.Logger.warn("SC.Store.updateRecords() is deprecated.  Use loadRecords() instead");
  
  var store = this._getDefaultStore(),
      len   = dataHashes.length,
      idx, ret;
      
  // if no recordType was passed, build an array of recordTypes from hashes
  if (!recordType) {
    recordType = [];
    for(idx=0;idx<len;idx++) recordType[idx] = dataHashes[idx].recordType;
  }
  
  // call new API.  Returns storeKeys
  ret = store.loadRecords(recordType, dataHashes);
  
  // map to SC.Record instances
  len = ret.length;
  for(idx=0;idx<len;idx++) ret[idx] = store.materializeRecord(ret[idx]);
  
  return ret ;
};

/** @private

  DEPRECATED 

  Finds a record with the passed guid on the default store.  This is included
  only for compatibility.  You should use the newer find() method defined on
  SC.Store instead.
  
  @param {String} guid the guid
  @param {SC.Record} recordType expected record type
  @returns {SC.Record} found record
*/
SC.Store.find = function(guid, recordType) {
  return this._getDefaultStore().find(recordType, guid);
};

/** @private

  DEPRECATED 

  Passes through to findAll on default store.  This is included only for 
  compatibility.  You should use the newer findAll() defined on SC.Store
  instead.
  
  @param {Hash} filter search parameters
  @param {SC.Record} recordType type of record to find
  @returns {SC.RecordArray} result set
*/
SC.Store.findAll = function(filter, recordType) {
  return this._getDefaultStore().findAll(filter, recordType);
};

/* >>>>>>>>>> BEGIN source/system/nested_store.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('system/store');

/**
  @class

  A nested store can buffer changes to a parent store and then commit them
  all at once.  You usually will use a NestedStore as part of store chaining
  to stage changes to your object graph before sharing them with the rest of
  the application.
  
  Normally you will not create a nested store directly.  Instead, you can 
  retrieve a nested store by using the chain() method.  When you are finished
  working with the nested store, destroy() will dispose of it.
  
  @extends SC.Store
  @since SproutCore 1.0
*/
SC.NestedStore = SC.Store.extend(
/** @scope SC.NestedStore.prototype */ {

  /**
    This is set to YES when there are changes that have not been committed 
    yet.

    @property {Boolean}
    @default NO
  */
  hasChanges: NO,

  /**
    The parent store this nested store is chained to.  Nested stores must have
    a parent store in order to function properly.  Normally, you create a 
    nested store using the SC.Store#chain() method and this property will be
    set for you.
    
    @property {SC.Store}
  */
  parentStore: null,

  /**
    YES if the view is nested. Walk like a duck
    
    @property {Boolean}
  */
  isNested: YES,

  /**
    If YES, then the attribute hash state will be locked when you first 
    read the data hash or status.  This means that if you retrieve a record
    then change the record in the parent store, the changes will not be 
    visible to your nested store until you commit or discard changes.
    
    If NO, then the attribute hash will lock only when you write data.
    
    Normally you want to lock your attribute hash the first time you read it.
    This will make your nested store behave most consistently.  However, if
    you are using multiple sibling nested stores at one time, you may want
    to turn off this property so that changes from one store will be reflected
    in the other one immediately.  In this case you will be responsible for
    ensuring that the sibling stores do not edit the same part of the object
    graph at the same time.
    
    @property {Boolean} 
  */
  lockOnRead: YES,

  /** @private
    Array contains the base revision for an attribute hash when it was first
    cloned from the parent store.  If the attribute hash is edited and 
    commited, the commit will fail if the parent attributes hash has been 
    edited since.
    
    This is a form of optimistic locking, hence the name.
    
    Each store gets its own array of locks, which are selectively populated
    as needed.
    
    Note that this is kept as an array because it will be stored as a dense 
    array on some browsers, making it faster.
    
    @property {Array}
  */
  locks: null,

  /** @private
    An array that includes the store keys that have changed since the store
    was last committed.  This array is used to sync data hash changes between
    chained stores.  For a log changes that may actually be committed back to
    the server see the changelog property.
    
    @property {SC.Set}
  */
  chainedChanges: null,
    
  // ..........................................................
  // STORE CHAINING
  // 
  
  /**
    find() cannot accept REMOTE queries in a nested store.  This override will
    verify that condition for you.  See SC.Store#find() for info on using this
    method.
    
    @returns {SC.Record|SC.RecordArray}
  */
  find: function(query) {
    if (query && query.isQuery && query.get('location') !== SC.Query.LOCAL) {
      throw "SC.Store#find() can only accept LOCAL queries in nested stores";
    }
    return arguments.callee.base.apply(this,arguments);
  },
  
  /**
    Propagate this store's changes to its parent.  If the store does not 
    have a parent, this has no effect other than to clear the change set.

    @param {Boolean} force if YES, does not check for conflicts first
    @returns {SC.Store} receiver
  */
  commitChanges: function(force) {
    if (this.get('hasChanges')) {
      var pstore = this.get('parentStore');
      pstore.commitChangesFromNestedStore(this, this.chainedChanges, force);
    }

    // clear out custom changes - even if there is nothing to commit.
    this.reset();
    return this ;
  },

  /**
    Discard the changes made to this store and reset the store.
    
    @returns {SC.Store} receiver
  */
  discardChanges: function() {
    // any locked records whose rev or lock rev differs from parent need to
    // be notified.
    var records, locks;
    if ((records = this.records) && (locks = this.locks)) {
      var pstore = this.get('parentStore'), psRevisions = pstore.revisions;
      var revisions = this.revisions, storeKey, lock, rev;
      for (storeKey in records) {
        if (!records.hasOwnProperty(storeKey)) continue ;
        if (!(lock = locks[storeKey])) continue; // not locked.

        rev = psRevisions[storeKey];
        if ((rev !== lock) || (revisions[storeKey] > rev)) {
          this._notifyRecordPropertyChange(parseInt(storeKey, 10));
        }
      }
    }   
    
    this.reset();
    this.flush();
    return this ;
  },
  
  /**
    When you are finished working with a chained store, call this method to 
    tear it down.  This will also discard any pending changes.
    
    @returns {SC.Store} receiver
  */
  destroy: function() {
    this.discardChanges();
    
    var parentStore = this.get('parentStore');
    if (parentStore) parentStore.willDestroyNestedStore(this);
    
    arguments.callee.base.apply(this,arguments);  
    return this ;
  },

  /**
    Resets a store's data hash contents to match its parent.
    
    @returns {SC.Store} receiver
  */
  reset: function() {
    var nRecords, nr, sk;
    // requires a pstore to reset
    var parentStore = this.get('parentStore');
    if (!parentStore) throw SC.Store.NO_PARENT_STORE_ERROR;
    
    // inherit data store from parent store.
    this.dataHashes = SC.beget(parentStore.dataHashes);
    this.revisions  = SC.beget(parentStore.revisions);
    this.statuses   = SC.beget(parentStore.statuses);
    
    // beget nested records references
    this.childRecords = parentStore.childRecords ? SC.beget(parentStore.childRecords) : {};
    this.parentRecords = parentStore.parentRecords ? SC.beget(parentStore.parentRecords) : {};
    
    // also, reset private temporary objects
    this.chainedChanges = this.locks = this.editables = null;
    this.changelog = null ;

    // TODO: Notify record instances
    
    this.set('hasChanges', NO);
  },
  
  /** @private
  
    Chain to parentstore
  */
  refreshQuery: function(query) {
    var parentStore = this.get('parentStore');
    if (parentStore) parentStore.refreshQuery(query);
    return this ;      
  },

  /**
    Returns the SC.Error object associated with a specific record.

    Delegates the call to the parent store.

    @param {Number} storeKey The store key of the record.
 
    @returns {SC.Error} SC.Error or null if no error associated with the record.
  */
  readError: function(storeKey) {
    var parentStore = this.get('parentStore');
    return parentStore ? parentStore.readError(storeKey) : null;
  },

  /**
    Returns the SC.Error object associated with a specific query.

    Delegates the call to the parent store.

    @param {SC.Query} query The SC.Query with which the error is associated.
 
    @returns {SC.Error} SC.Error or null if no error associated with the query.
  */
  readQueryError: function(query) {
    var parentStore = this.get('parentStore');
    return parentStore ? parentStore.readQueryError(query) : null;
  },
  
  // ..........................................................
  // CORE ATTRIBUTE API
  // 
  // The methods in this layer work on data hashes in the store.  They do not
  // perform any changes that can impact records.  Usually you will not need 
  // to use these methods.
  
  /**
    Returns the current edit status of a storekey.  May be one of INHERITED,
    EDITABLE, and LOCKED.  Used mostly for unit testing.
    
    @param {Number} storeKey the store key
    @returns {Number} edit status
  */
  storeKeyEditState: function(storeKey) {
    var editables = this.editables, locks = this.locks;
    return (editables && editables[storeKey]) ? SC.Store.EDITABLE : (locks && locks[storeKey]) ? SC.Store.LOCKED : SC.Store.INHERITED ;
  },
   
  /**  @private
    Locks the data hash so that it iterates independently from the parent 
    store.
  */
  _lock: function(storeKey) {
    var locks = this.locks, rev, editables, 
        pk, pr, path, tup, obj, key;
    
    // already locked -- nothing to do
    if (locks && locks[storeKey]) return this;

    // create locks if needed
    if (!locks) locks = this.locks = [];

    // fixup editables
    editables = this.editables;
    if (editables) editables[storeKey] = 0;
    
    
    // if the data hash in the parent store is editable, then clone the hash
    // for our own use.  Otherwise, just copy a reference to the data hash
    // in the parent store. -- find first non-inherited state
    var pstore = this.get('parentStore'), editState;
    while(pstore && (editState=pstore.storeKeyEditState(storeKey)) === SC.Store.INHERITED) {
      pstore = pstore.get('parentStore');
    }
    
    if (pstore && editState === SC.Store.EDITABLE) {
      
      pk = this.childRecords[storeKey];
      if (pk){
        // Since this is a nested record we have to actually walk up the parent chain
        // to get to the root parent and clone that hash. And then reconstruct the 
        // memory space linking.
        this._lock(pk);
        pr = this.parentRecords[pk];
        if (pr) {
          path = pr[storeKey];
          tup = path ? SC.tupleForPropertyPath(path, this.dataHashes[pk]) : null;
          if (tup){ obj = tup[0]; key = tup[1]; }
          this.dataHashes[storeKey] = obj && key ? obj[key] : null;
        }
      }
      else {
        this.dataHashes[storeKey] = SC.clone(pstore.dataHashes[storeKey], YES);
      }
      if (!editables) editables = this.editables = [];
      editables[storeKey] = 1 ; // mark as editable
      
    } else this.dataHashes[storeKey] = this.dataHashes[storeKey];
    
    // also copy the status + revision
    this.statuses[storeKey] = this.statuses[storeKey];
    rev = this.revisions[storeKey] = this.revisions[storeKey];
    
    // save a lock and make it not editable
    locks[storeKey] = rev || 1;    
    
    return this ;
  },
  
  /** @private - adds chaining support */
  readDataHash: function(storeKey) {
    if (this.get('lockOnRead')) this._lock(storeKey);
    return this.dataHashes[storeKey];
  },
  
  /** @private - adds chaining support */
  readEditableDataHash: function(storeKey) {

    // lock the data hash if needed
    this._lock(storeKey);
    
    return arguments.callee.base.apply(this,arguments);
  },
  
  /** @private - adds chaining support - 
    Does not call sc_super because the implementation of the method vary too
    much. 
  */
  writeDataHash: function(storeKey, hash, status) {
    var locks = this.locks, didLock = NO, rev ;

    // Update our dataHash and/or status, depending on what was passed in.
    // Note that if no new hash was passed in, we'll lock the storeKey to
    // properly fork our dataHash from our parent store.  Similarly, if no
    // status was passed in, we'll save our own copy of the value.
    if (hash) {
      this.dataHashes[storeKey] = hash;
    }
    else {
      this._lock(storeKey);
      didLock = YES;
    }

    if (status) {
      this.statuses[storeKey] = status;
    }
    else {
      if (!didLock) this.statuses[storeKey] = (this.statuses[storeKey] || SC.Record.READY_NEW);
    }

    if (!didLock) {
      rev = this.revisions[storeKey] = this.revisions[storeKey]; // copy ref
    
      // make sure we lock if needed.
      if (!locks) locks = this.locks = [];
      if (!locks[storeKey]) locks[storeKey] = rev || 1;
    }
    
    // Also note that this hash is now editable.  (Even if we locked it,
    // above, it may not have been marked as editable.)
    var editables = this.editables;
    if (!editables) editables = this.editables = [];
    editables[storeKey] = 1 ; // use number for dense array support
    
    return this ;
  },

  /** @private - adds chaining support */
  removeDataHash: function(storeKey, status) {
    
    // record optimistic lock revision
    var locks = this.locks;
    if (!locks) locks = this.locks = [];
    if (!locks[storeKey]) locks[storeKey] = this.revisions[storeKey] || 1;

    return arguments.callee.base.apply(this,arguments);
  },
  
  /** @private - book-keeping for a single data hash. */
  dataHashDidChange: function(storeKeys, rev, statusOnly, key) {
    // update the revision for storeKey.  Use generateStoreKey() because that
    // gaurantees a universally (to this store hierarchy anyway) unique 
    // key value.
    if (!rev) rev = SC.Store.generateStoreKey();
    var isArray, len, idx, storeKey;
    
    isArray = SC.typeOf(storeKeys) === SC.T_ARRAY;
    if (isArray) {
      len = storeKeys.length;
    } else {
      len = 1;
      storeKey = storeKeys;
    }

    var changes = this.chainedChanges;
    if (!changes) changes = this.chainedChanges = SC.Set.create();
    
    for(idx=0;idx<len;idx++) {
      if (isArray) storeKey = storeKeys[idx];
      this._lock(storeKey);
      this.revisions[storeKey] = rev;
      changes.add(storeKey);
      this._notifyRecordPropertyChange(storeKey, statusOnly, key);
    }

    this.setIfChanged('hasChanges', YES);
    return this ;
  },

  // ..........................................................
  // SYNCING CHANGES
  // 
  
  /** @private - adapt for nested store */
  commitChangesFromNestedStore: function(nestedStore, changes, force) {

    arguments.callee.base.apply(this,arguments);
    
    // save a lock for each store key if it does not have one already
    // also add each storeKey to my own changes set.
    var pstore = this.get('parentStore'), psRevisions = pstore.revisions, i;
    var myLocks = this.locks, myChanges = this.chainedChanges,len,storeKey;
    if (!myLocks) myLocks = this.locks = [];
    if (!myChanges) myChanges = this.chainedChanges = SC.Set.create();

    len = changes.length ;
    for(i=0;i<len;i++) {
      storeKey = changes[i];
      if (!myLocks[storeKey]) myLocks[storeKey] = psRevisions[storeKey]||1;
      myChanges.add(storeKey);
    }
    
    // Finally, mark store as dirty if we have changes
    this.setIfChanged('hasChanges', myChanges.get('length')>0);
    this.flush();
    
    return this ;
  },

  // ..........................................................
  // HIGH-LEVEL RECORD API
  // 
  
  
  /** @private - adapt for nested store */
  queryFor: function(recordType, conditions, params) {
    return this.get('parentStore').queryFor(recordType, conditions, params);
  },
  
  /** @private - adapt for nested store */
  findAll: function(recordType, conditions, params, recordArray, _store) { 
    if (!_store) _store = this;
    return this.get('parentStore').findAll(recordType, conditions, params, recordArray, _store);
  },

  // ..........................................................
  // CORE RECORDS API
  // 
  // The methods in this section can be used to manipulate records without 
  // actually creating record instances.
  
  /** @private - adapt for nested store
  
    Unlike for the main store, for nested stores if isRefresh=YES, we'll throw
    an error if the record is dirty.  We'll otherwise avoid setting our status
    because that can disconnect us from upper and/or lower stores.
  */
  retrieveRecords: function(recordTypes, ids, storeKeys, isRefresh) {
    var pstore = this.get('parentStore'), idx, storeKey, newStatus,
      len = (!storeKeys) ? ids.length : storeKeys.length,
      K = SC.Record, status;

    // Is this a refresh?
    if (isRefresh) {
      for(idx=0;idx<len;idx++) {
        storeKey = !storeKeys ? pstore.storeKeyFor(recordTypes, ids[idx]) : storeKeys[idx];
        status   = this.peekStatus(storeKey);
        
        // We won't allow calling retrieve on a dirty record in a nested store
        // (although we do allow it in the main store).  This is because doing
        // so would involve writing a unique status, and that would break the
        // status hierarchy, so even though lower stores would complete the
        // retrieval, the upper layers would never inherit the new statuses.
        if (status & K.DIRTY) {
          throw SC.Store.NESTED_STORE_RETRIEVE_DIRTY_ERROR;
        }
        else {
          // Not dirty?  Then abandon any status we had set (to re-establish
          // any prototype linkage breakage) before asking our parent store to
          // perform the retrieve.
          var dataHashes = this.dataHashes,
              revisions  = this.revisions,
              statuses   = this.statuses,
              editables  = this.editables,
              locks      = this.locks;

          var changed    = NO;
          var statusOnly = NO;
  
          if (dataHashes  &&  dataHashes.hasOwnProperty(storeKey)) {
            delete dataHashes[storeKey];
            changed = YES;
          }
          if (revisions   &&  revisions.hasOwnProperty(storeKey)) {
            delete revisions[storeKey];
            changed = YES;
          }
          if (editables) delete editables[storeKey];
          if (locks) delete locks[storeKey];

          if (statuses  &&  statuses.hasOwnProperty(storeKey)) {
            delete statuses[storeKey];
            if (!changed) statusOnly = YES;
            changed = YES;
          }
          
          if (changed) this._notifyRecordPropertyChange(storeKey, statusOnly);
        }
      }
    }
    
    return pstore.retrieveRecords(recordTypes, ids, storeKeys, isRefresh);
  },

  /** @private - adapt for nested store */
  commitRecords: function(recordTypes, ids, storeKeys) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },

  /** @private - adapt for nested store */
  commitRecord: function(recordType, id, storeKey) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  
  /** @private - adapt for nested store */
  cancelRecords: function(recordTypes, ids, storeKeys) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },

  /** @private - adapt for nested store */
  cancelRecord: function(recordType, id, storeKey) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  
  // ..........................................................
  // DATA SOURCE CALLBACKS
  // 
  // Mathods called by the data source on the store

  /** @private - adapt for nested store */
  dataSourceDidCancel: function(storeKey) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  
  /** @private - adapt for nested store */
  dataSourceDidComplete: function(storeKey, dataHash, newId) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  
  /** @private - adapt for nested store */
  dataSourceDidDestroy: function(storeKey) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },

  /** @private - adapt for nested store */
  dataSourceDidError: function(storeKey, error) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },

  // ..........................................................
  // PUSH CHANGES FROM DATA SOURCE
  // 
  
  /** @private - adapt for nested store */
  pushRetrieve: function(recordType, id, dataHash, storeKey) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },
  
  /** @private - adapt for nested store */
  pushDestroy: function(recordType, id, storeKey) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  },

  /** @private - adapt for nested store */
  pushError: function(recordType, id, error, storeKey) {
    throw SC.Store.NESTED_STORE_UNSUPPORTED_ERROR;
  }
  
}) ;


/* >>>>>>>>>> BEGIN source/system/query.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('core') ;
sc_require('models/record');

/**
  @class

  This permits you to perform queries on your data store,
  written in a SQL-like language. Here is a simple example:
    
  {{{
    q = SC.Query.create({
      conditions: "firstName = 'Jonny' AND lastName = 'Cash'"
    })
  }}}
    
  You can check if a certain record matches the query by calling:

  {{{
    q.contains(record)
  }}}
  
  To find all records of your store, that match query q, use findAll with
  query q as argument:
  
  {{{
    r = MyApp.store.findAll(q)
  }}}
  
  r will be a record array containing all matching records.
  To limit the query to a record type of MyApp.MyModel,
  you can specify the type as a property of the query like this:
  
  {{{
    q = SC.Query.create({ 
      conditions: "firstName = 'Jonny' AND lastName = 'Cash'",
      recordType: MyApp.MyModel 
    })
  }}}
  
  Calling find() like above will now return only records of type t.
  It is recommended to limit your query to a record type, since the query will
  have to look for matching records in the whole store, if no record type
  is given.
  
  You can give an order, which the resulting records should follow, like this:
  
  {{{
    q = SC.Query.create({ 
      conditions: "firstName = 'Jonny' AND lastName = 'Cash'",
      recordType: MyApp.MyModel,
      orderBy: "lastName, year DESC" 
    });
  }}}
  
  The default order direction is ascending. You can change it to descending
  by writing DESC behind the property name like in the example above.
  If no order is given, or records are equal in respect to a given order,
  records will be ordered by guid.

  h2. SproutCore Query Language
  
  Features of the query language:
  
  h4. Primitives:

  - record properties
  - null, undefined
  - true, false
  - numbers (integers and floats)
  - strings (double or single quoted)
  
  h4. Parameters:

  - %@ (wild card)
  - {parameterName} (named parameter)

  Wild cards are used to identify parameters by the order in which they appear 
  in the query string. Named parameters can be used when tracking the order 
  becomes difficult. Both types of parameters can be used by giving the 
  parameters as a property to your query object:
  
  {{{
    yourQuery.parameters = yourParameters
  }}}
  
  where yourParameters should have one of the following formats:

    for wild cards: [firstParam, secondParam, thirdParam]
    for named params: {name1: param1, mane2: parma2}

  You cannot use both types of parameters in a single query!
  
  h4. Operators:
  
  - =
  - !=
  - <
  - <=
  - >
  - >=
  - BEGINS_WITH (checks if a string starts with another one)
  - ENDS_WITH   (checks if a string ends with another one)
  - CONTAINS    (checks if a string contains another one, or if an object is in an array)
  - MATCHES     (checks if a string is matched by a regexp,
                you will have to use a parameter to insert the regexp)
  - ANY         (checks if the thing on its left is contained in the array
                on its right, you will have to use a parameter
                to insert the array)
  - TYPE_IS     (unary operator expecting a string containing the name 
                of a Model class on its right side, only records of this type
                will match)
    
  h4. Boolean Operators:
  
  - AND
  - OR
  - NOT
  
  h4. Parenthesis for grouping:
  
  - ( and )


  h2. Adding Your Own Query Handlers

  You can extend the query language with your own operators by calling:

  {{{
    SC.Query.registerQueryExtension('your_operator', your_operator_definition);
  }}}

  See details below. As well you can provide your own comparison functions
  to control ordering of specific record properties like this:

  {{{
    SC.Query.registerComparison(property_name, comparison_for_this_property);
  }}}
  
  h2. Examples
  
  Some example queries:
  
  TODO add examples

  @extends SC.Object
  @extends SC.Copyable
  @extends SC.Freezable
  @since SproutCore 1.0
*/

SC.Query = SC.Object.extend(SC.Copyable, SC.Freezable, 
  /** @scope SC.Query.prototype */ {

  // ..........................................................
  // PROPERTIES
  // 
  
  /** 
    Walk like a duck.
    
    @property {Boolean}
  */
  isQuery: YES,
  
  /**
    Unparsed query conditions.  If you are handling a query yourself, then 
    you will find the base query string here.
    
    @property {String}
  */
  conditions:  null,
  
  /**
    Optional orderBy parameters.  This can be a string of keys, optionally
    beginning with the strings "DESC " or "ASC " to select descending or 
    ascending order.
    
    Alternatively, you can specify a comparison function, in which case the
    two records will be sent to it.  Your comparison function, as with any
    other, is expected to return -1, 0, or 1.
    
    @property {String | Function}
  */
  orderBy:     null,
  
  /**
    The base record type or types for the query.  This must be specified to
    filter the kinds of records this query will work on.  You may either 
    set this to a single record type or to an array or set of record types.
    
    @property {SC.Record}
  */
  recordType:  null,
  
  /**
    Optional array of multiple record types.  If the query accepts multiple 
    record types, this is how you can check for it.
    
    @property {SC.Enumerable}
  */
  recordTypes: null,
  
  /**
    Returns the complete set of recordTypes matched by this query.  Includes
    any named recordTypes plus their subclasses.
    
    @property {SC.Enumerable}
  */
  expandedRecordTypes: function() {
    var ret = SC.CoreSet.create(), rt, q  ;
    
    if (rt = this.get('recordType')) this._scq_expandRecordType(rt, ret);      
    else if (rt = this.get('recordTypes')) {
      rt.forEach(function(t) { this._scq_expandRecordType(t, ret); }, this);
    } else this._scq_expandRecordType(SC.Record, ret);

    // save in queue.  if a new recordtype is defined, we will be notified.
    q = SC.Query._scq_queriesWithExpandedRecordTypes;
    if (!q) {
      q = SC.Query._scq_queriesWithExpandedRecordTypes = SC.CoreSet.create();
    }
    q.add(this);
    
    return ret.freeze() ;
  }.property('recordType', 'recordTypes').cacheable(),

  /** @private 
    expands a single record type into the set. called recursively
  */
  _scq_expandRecordType: function(recordType, set) {
    if (set.contains(recordType)) return; // nothing to do
    set.add(recordType);
    
    if (SC.typeOf(recordType)===SC.T_STRING) {
      recordType = SC.objectForPropertyPath(recordType);
    }
    
    recordType.subclasses.forEach(function(t) { 
      this._scq_expandRecordType(t, set);
    }, this);  
  },
  
  /**
    Optional hash of parameters.  These parameters may be interpolated into 
    the query conditions.  If you are handling the query manually, these 
    parameters will not be used.
    
    @property {Hash}
  */
  parameters:  null,
  
  /**
    Indicates the location where the result set for this query is stored.  
    Currently the available options are:
    
    - SC.Query.LOCAL: indicates that the query results will be automatically computed from the in-memory store.
    - SC.Query.REMOTE: indicates that the query results are kept on a remote server and hence must be loaded from the DataSource.
    
    The default setting for this property is SC.Query.LOCAL.  
    
    Note that even if a query location is LOCAL, your DataSource will still
    have its fetch() method called for the query.  For LOCAL queries, you 
    won't need to explicitly provide the query result set; you can just load
    records into the in-memory store as needed and let the query recompute 
    automatically.
    
    If your query location is REMOTE, then your DataSource will need to 
    provide the actual set of query results manually.  Usually you will only 
    need to use a REMOTE query if you are retrieving a large data set and you
    don't want to pay the cost of computing the result set client side.
    
    @property {String}
  */
  location: 'local', // SC.Query.LOCAL
  
  /**
    Another query that will optionally limit the search of records.  This is 
    usually configured for you when you do find() from another record array.
    
    @property {SC.Query}
  */
  scope: null,
  
  
  /**
    Returns YES if query location is Remote.  This is sometimes more 
    convenient than checking the location.
    
    @property {Boolean}
  */
  isRemote: function() {
    return this.get('location') === SC.Query.REMOTE;
  }.property('location').cacheable(),

  /**
    Returns YES if query location is Local.  This is sometimes more 
    convenient than checking the location.
    
    @property {Boolean}
  */
  isLocal: function() {
    return this.get('location') === SC.Query.LOCAL;
  }.property('location').cacheable(),
  
  /**
    Indicates whether a record is editable or not.  Defaults to NO.  Local
    queries should never be made editable.  Remote queries may be editable or
    not depending on the data source.
  */
  isEditable: NO,
  
  // ..........................................................
  // PRIMITIVE METHODS
  // 
  
  /** 
    Returns YES if record is matched by the query, NO otherwise.  This is 
    used when computing a query locally.  
 
    @param {SC.Record} record the record to check
    @param {Hash} parameters optional override parameters
    @returns {Boolean} YES if record belongs, NO otherwise
  */ 
  contains: function(record, parameters) {

    // check the recordType if specified
    var rtype, ret = YES ;    
    if (rtype = this.get('recordTypes')) { // plural form
      ret = rtype.find(function(t) { return SC.kindOf(record, t); });
    } else if (rtype = this.get('recordType')) { // singular
      ret = SC.kindOf(record, rtype);
    }
    
    if (!ret) return NO ; // if either did not pass, does not contain

    // if we have a scope - check for that as well
    var scope = this.get('scope');
    if (scope && !scope.contains(record)) return NO ;
    
    // now try parsing
    if (!this._isReady) this.parse(); // prepare the query if needed
    if (!this._isReady) return NO ;
    if (parameters === undefined) parameters = this.parameters || this;
    
    // if parsing worked we check if record is contained
    // if parsing failed no record will be contained
    return this._tokenTree.evaluate(record, parameters);
  },
  
  /**
    Returns YES if the query matches one or more of the record types in the
    passed set.
    
    @param {SC.Set} types set of record types
    @returns {Boolean} YES if record types match
  */
  containsRecordTypes: function(types) {
    var rtype = this.get('recordType');
    if (rtype) {
      return !!types.find(function(t) { return SC.kindOf(t, rtype); });
    
    } else if (rtype = this.get('recordTypes')) {
      return !!rtype.find(function(t) { 
        return !!types.find(function(t2) { return SC.kindOf(t2,t); });
      });
      
    } else return YES; // allow anything through
  },
  
  /**
    Returns the sort order of the two passed records, taking into account the
    orderBy property set on this query.  This method does not verify that the
    two records actually belong in the query set or not; this is checked using
    contains().
 
    @param {SC.Record} record1 the first record
    @param {SC.Record} record2 the second record
    @returns {Number} -1 if record1 < record2, 
                      +1 if record1 > record2,
                      0 if equal
  */
  compare: function(record1, record2) {
    // IMPORTANT:  THIS CODE IS ALSO INLINED INSIDE OF THE 'compareStoreKeys'
    //             CLASS METHOD.  IF YOU CHANGE THIS IMPLEMENTATION, BE SURE
    //             TO UPDATE IT THERE, TOO.
    //
    // (Any clients overriding this method will have their version called,
    // however.  That's why we'll keep this here; clients might want to
    // override it and call arguments.callee.base.apply(this,arguments)).

    var result = 0, 
        propertyName, order, len, i;

    // fast cases go here
    if (record1 === record2) return 0;
    
    // if called for the first time we have to build the order array
    if (!this._isReady) this.parse();
    if (!this._isReady) { // can't parse. guid is wrong but consistent
      return SC.compare(record1.get('id'),record2.get('id'));
    }
    
    // For every property specified in orderBy until non-eql result is found.
    // Or, if orderBy is a comparison function, simply invoke it with the
    // records.
    order = this._order;
    if (SC.typeOf(order) === SC.T_FUNCTION) {
      result = order.call(null, record1, record2);
    }
    else {
      len   = order ? order.length : 0;
      for (i=0; result===0 && (i < len); i++) {
        propertyName = order[i].propertyName;
        // if this property has a registered comparison use that
        if (SC.Query.comparisons[propertyName]) {
          result = SC.Query.comparisons[propertyName](
                    record1.get(propertyName),record2.get(propertyName));
                  
        // if not use default SC.compare()
        } else {
          result = SC.compare(
                    record1.get(propertyName), record2.get(propertyName) );
        }
      
        if ((result!==0) && order[i].descending) result = (-1) * result;
      }
    }

    // return result or compare by guid
    if (result !== 0) return result ;
    else return SC.compare(record1.get('id'),record2.get('id'));
  },

  /** @private 
      Becomes YES once the query has been successfully parsed 
  */
  _isReady:     NO,
  
  /**
    This method has to be called before the query object can be used.
    You will normaly not have to do this, it will be called automatically
    if you try to evaluate a query.
    You can however use this function for testing your queries.
 
    @returns {Boolean} true if parsing succeeded, false otherwise
  */
  parse: function() {
    var conditions = this.get('conditions'),
        lang       = this.get('queryLanguage'),
        tokens, tree;
        
    tokens = this._tokenList = this.tokenizeString(conditions, lang);
    tree = this._tokenTree = this.buildTokenTree(tokens, lang);
    this._order = this.buildOrder(this.get('orderBy'));
    
    this._isReady = !!tree && !tree.error;
    if (tree && tree.error) throw tree.error;
    return this._isReady;
  },
  
  /**
    Returns the same query but with the scope set to the passed record array.
    This will copy the receiver.  It also stores these queries in a cache to
    reuse them if possible.
    
    @param {SC.RecordArray} recordArray the scope
    @returns {SC.Query} new query
  */
  queryWithScope: function(recordArray) {
    // look for a cached query on record array.
    var key = SC.keyFor('__query__', SC.guidFor(this)),
        ret = recordArray[key];
        
    if (!ret) {
      recordArray[key] = ret = this.copy();
      ret.set('scope', recordArray);
      ret.freeze();
    }
    
    return ret ;
  },
  
  // ..........................................................
  // PRIVATE SUPPORT
  // 

  /** @private
    Properties that need to be copied when cloning the query.
  */
  copyKeys: 'conditions orderBy recordType recordTypes parameters location scope'.w(),
  
  /** @private */
  concatenatedProperties: 'copyKeys'.w(),

  /** @private 
    Implement the Copyable API to clone a query object once it has been 
    created.
  */
  copy: function() {
    var opts = {}, 
        keys = this.get('copyKeys'),
        loc  = keys ? keys.length : 0,
        key, value, ret;
        
    while(--loc >= 0) {
      key = keys[loc];
      value = this.get(key);
      if (value !== undefined) opts[key] = value ;
    }
    
    ret = this.constructor.create(opts);
    opts = null;
    return ret ;
  },

  // ..........................................................
  // QUERY LANGUAGE DEFINITION
  //
  
  
  /**
    This is the definition of the query language. You can extend it
    by using SC.Query.registerQueryExtension().
  */
  queryLanguage: {
    
    'UNKNOWN': {
      firstCharacter:   /[^\s'"\w\d\(\)\{\}]/,
      notAllowed:       /[\s'"\w\d\(\)\{\}]/
    },

    'PROPERTY': {
      firstCharacter:   /[a-zA-Z_]/,
      notAllowed:       /[^a-zA-Z_0-9]/,
      evalType:         'PRIMITIVE',
      
      /** @ignore */
      evaluate:         function (r,w) { return r.get(this.tokenValue); }
    },

    'NUMBER': {
      firstCharacter:   /[\d\-]/,
      notAllowed:       /[^\d\-\.]/,
      format:           /^-?\d+$|^-?\d+\.\d+$/,
      evalType:         'PRIMITIVE',
      
      /** @ignore */
      evaluate:         function (r,w) { return parseFloat(this.tokenValue); }
    },

    'STRING': {
      firstCharacter:   /['"]/,
      delimeted:        true,
      evalType:         'PRIMITIVE',

      /** @ignore */
      evaluate:         function (r,w) { return this.tokenValue; }
    },

    'PARAMETER': {
      firstCharacter:   /\{/,
      lastCharacter:    '}',
      delimeted:        true,
      evalType:         'PRIMITIVE',

      /** @ignore */
      evaluate:         function (r,w) { return w[this.tokenValue]; }
    },

    '%@': {
      rememberCount:    true,
      reservedWord:     true,
      evalType:         'PRIMITIVE',

      /** @ignore */
      evaluate:         function (r,w) { return w[this.tokenValue]; }
    },

    'OPEN_PAREN': {
      firstCharacter:   /\(/,
      singleCharacter:  true
    },

    'CLOSE_PAREN': {
      firstCharacter:   /\)/,
      singleCharacter:  true
    },

    'AND': {
      reservedWord:     true,
      leftType:         'BOOLEAN',
      rightType:        'BOOLEAN',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var left  = this.leftSide.evaluate(r,w);
                          var right = this.rightSide.evaluate(r,w);
                          return left && right;
                        }
    },

    'OR': {
      reservedWord:     true,
      leftType:         'BOOLEAN',
      rightType:        'BOOLEAN',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var left  = this.leftSide.evaluate(r,w);
                          var right = this.rightSide.evaluate(r,w);
                          return left || right;
                        }
    },

    'NOT': {
      reservedWord:     true,
      rightType:        'BOOLEAN',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var right = this.rightSide.evaluate(r,w);
                          return !right;
                        }
    },

    '=': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var left  = this.leftSide.evaluate(r,w);
                          var right = this.rightSide.evaluate(r,w);
                          return SC.isEqual(left, right); 
                        }
    },

    '!=': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var left  = this.leftSide.evaluate(r,w);
                          var right = this.rightSide.evaluate(r,w);
                          return !SC.isEqual(left, right); 
                        }
    },

    '<': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var left  = this.leftSide.evaluate(r,w);
                          var right = this.rightSide.evaluate(r,w);
                          return SC.compare(left, right) == -1; //left < right;
                        }
    },

    '<=': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var left  = this.leftSide.evaluate(r,w);
                          var right = this.rightSide.evaluate(r,w);
                          return SC.compare(left, right) != 1; //left <= right;
                        }
    },

    '>': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var left  = this.leftSide.evaluate(r,w);
                          var right = this.rightSide.evaluate(r,w);
                          return SC.compare(left, right) == 1; //left > right;
                        }
    },

    '>=': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var left  = this.leftSide.evaluate(r,w);
                          var right = this.rightSide.evaluate(r,w);
                          return SC.compare(left, right) != -1; //left >= right;
                        }
    },

    'BEGINS_WITH': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var all   = this.leftSide.evaluate(r,w);
                          var start = this.rightSide.evaluate(r,w);
                          return ( all && all.indexOf(start) === 0 );
                        }
    },

    'ENDS_WITH': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var all = this.leftSide.evaluate(r,w);
                          var end = this.rightSide.evaluate(r,w);
                          return ( all && all.indexOf(end) === (all.length - end.length) );
                        }
    },

    'CONTAINS': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
        evaluate:       function (r,w) {
                          var all    = this.leftSide.evaluate(r,w) || [];
                          var value = this.rightSide.evaluate(r,w);

                          var allType = SC.typeOf(all);
                          if (allType === SC.T_STRING) {
                            return (all.indexOf(value) !== -1);
                          } else if (allType === SC.T_ARRAY || all.toArray) {
                            if (allType !== SC.T_ARRAY) all = all.toArray();
                            var found  = false;
                            var i      = 0;
                            while ( found===false && i<all.length ) {
                              if ( value == all[i] ) found = true;
                              i++;
                            }
                            return found;
                          }
                        }
    },

    'ANY': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var prop   = this.leftSide.evaluate(r,w);
                          var values = this.rightSide.evaluate(r,w);
                          var found  = false;
                          var i      = 0;
                          while ( found===false && i<values.length ) {
                            if ( prop == values[i] ) found = true;
                            i++;
                          }
                          return found;
                        }
    },

    'MATCHES': {
      reservedWord:     true,
      leftType:         'PRIMITIVE',
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var toMatch = this.leftSide.evaluate(r,w);
                          var matchWith = this.rightSide.evaluate(r,w);
                          return matchWith.test(toMatch);
                        }
    },

    'TYPE_IS': {
      reservedWord:     true,
      rightType:        'PRIMITIVE',
      evalType:         'BOOLEAN',

      /** @ignore */
      evaluate:         function (r,w) {
                          var actualType = SC.Store.recordTypeFor(r.storeKey);
                          var right      = this.rightSide.evaluate(r,w);
                          var expectType = SC.objectForPropertyPath(right);
                          return actualType == expectType;
                        }
    },

    'null': {
      reservedWord:     true,
      evalType:         'PRIMITIVE',

      /** @ignore */
      evaluate:         function (r,w) { return null; }
    },

    'undefined': {
      reservedWord:     true,
      evalType:         'PRIMITIVE',

      /** @ignore */
      evaluate:         function (r,w) { return undefined; }
    },

    'false': {
      reservedWord:     true,
      evalType:         'PRIMITIVE',

      /** @ignore */
      evaluate:         function (r,w) { return false; }
    },

    'true': {
      reservedWord:     true,
      evalType:         'PRIMITIVE',

      /** @ignore */
      evaluate:         function (r,w) { return true; }
    },
    
    'YES': {
      reservedWord:     true,
      evalType:         'PRIMITIVE',

      /** @ignore */
      evaluate:         function (r,w) { return true; }
    },
    
    'NO': {
      reservedWord:     true,
      evalType:         'PRIMITIVE',

      /** @ignore */
      evaluate:         function (r,w) { return false; }
    }
    
  },
  

  // ..........................................................
  // TOKENIZER
  //
  
  
  /**
    Takes a string and tokenizes it based on the grammar definition
    provided. Called by parse().
    
    @param {String} inputString the string to tokenize
    @param {Object} grammar the grammar definition (normally queryLanguage)
    @returns {Array} list of tokens
  */
  tokenizeString: function (inputString, grammar) {
	
	
    var tokenList           = [],
        c                   = null,
        t                   = null,
        token               = null,
        tokenType           = null,
        currentToken        = null,
        currentTokenType    = null,
        currentTokenValue   = null,
        currentDelimeter    = null,
        endOfString         = false,
        endOfToken          = false,
        belongsToToken      = false,
        skipThisCharacter   = false,
        rememberCount       = {};
  
  
    // helper function that adds tokens to the tokenList
  
    function addToken (tokenType, tokenValue) {
      t = grammar[tokenType];
      //tokenType = t.tokenType;
      
      // handling of special cases
      // check format
      if (t.format && !t.format.test(tokenValue)) tokenType = "UNKNOWN";
      // delimeted token (e.g. by ")
      if (t.delimeted) skipThisCharacter = true;
      
      // reserved words
      if ( !t.delimeted ) {
        for ( var anotherToken in grammar ) {
          if ( grammar[anotherToken].reservedWord
               && anotherToken == tokenValue ) {
            tokenType = anotherToken;
          }
        }
      }
      
      // reset t
      t = grammar[tokenType];
      // remembering count type
      if ( t && t.rememberCount ) {
        if (!rememberCount[tokenType]) rememberCount[tokenType] = 0;
        tokenValue = rememberCount[tokenType];
        rememberCount[tokenType] += 1;
      }

      // push token to list
      tokenList.push( {tokenType: tokenType, tokenValue: tokenValue} );

      // and clean up currentToken
      currentToken      = null;
      currentTokenType  = null;
      currentTokenValue = null;
    }
  
  
    // stepping through the string:
    
    if (!inputString) return [];
    
    var iStLength = inputString.length;
    
    for (var i=0; i < iStLength; i++) {
      
      // end reached?
      endOfString = (i===iStLength-1);
      
      // current character
      c = inputString.charAt(i);
    
      // set true after end of delimeted token so that
      // final delimeter is not catched again
      skipThisCharacter = false;
        
    
      // if currently inside a token
    
      if ( currentToken ) {
      
        // some helpers
        t = grammar[currentToken];
        endOfToken = t.delimeted ? c===currentDelimeter : t.notAllowed.test(c);
      
        // if still in token
        if ( !endOfToken ) currentTokenValue += c;
      
        // if end of token reached
        if (endOfToken || endOfString) {
          addToken(currentToken, currentTokenValue);
        }
      
        // if end of string don't check again
        if ( endOfString && !endOfToken ) skipThisCharacter = true;
      }
    
      // if not inside a token, look for next one
    
      if ( !currentToken && !skipThisCharacter ) {
        // look for matching tokenType
        for ( token in grammar ) {
          t = grammar[token];
          if (t.firstCharacter && t.firstCharacter.test(c)) {
            currentToken = token;
          }
        }

        // if tokenType found
        if ( currentToken ) {
          t = grammar[currentToken];
          currentTokenValue = c;
          // handling of special cases
          if ( t.delimeted ) {
            currentTokenValue = "";
            if ( t.lastCharacter ) currentDelimeter = t.lastCharacter;
            else currentDelimeter = c;
          }

          if ( t.singleCharacter || endOfString ) {
            addToken(currentToken, currentTokenValue);
          }
        }
      }
    }
    
    return tokenList;
  },
  
  
  
  // ..........................................................
  // BUILD TOKEN TREE
  //
  
  /**
    Takes an array of tokens and returns a tree, depending on the
    specified tree logic. The returned object will have an error property
    if building of the tree failed. Check it to get some information
    about what happend.
    If everything worked the tree can be evaluated by calling:
    
      tree.evaluate(record, parameters)
    
    If tokenList is empty, a single token will be returned which will
    evaluate to true for all records.
    
    @param {Array} tokenList the list of tokens
    @param {Object} treeLogic the logic definition (normally queryLanguage)
    @returns {Object} token tree
  */
  buildTokenTree: function (tokenList, treeLogic) {
  
    var l                    = tokenList.slice();
    var i                    = 0;
    var openParenthesisStack = [];
    var shouldCheckAgain     = false;
    var error                = [];
    
  
    // empty tokenList is a special case
    if (!tokenList || tokenList.length === 0) {
      return { evaluate: function(){ return true; } };
    }
  
  
    // some helper functions
  
    function tokenLogic (position) {
      var p = position;
      if ( p < 0 ) return false;
      
      var tl = treeLogic[l[p].tokenType];
      
      if ( ! tl ) {
        error.push("logic for token '"+l[p].tokenType+"' is not defined");
        return false;
      }

      // save evaluate in token, so that we don't have
      // to look it up again when evaluating the tree
      l[p].evaluate = tl.evaluate;
      return tl;
    }
  
    function expectedType (side, position) {
      var p = position;
      var tl = tokenLogic(p);
      if ( !tl )            return false;
      if (side == 'left')   return tl.leftType;
      if (side == 'right')  return tl.rightType;
    }
  
    function evalType (position) {
      var p = position;
      var tl = tokenLogic(p);
      if ( !tl )  return false;
      else        return tl.evalType;
    }
  
    function removeToken (position) {
      l.splice(position, 1);
      if ( position <= i ) i--;
    }
  
    function preceedingTokenExists (position) {
      var p = position || i;
      if ( p > 0 )  return true;
      else          return false;
    }
  
    function tokenIsMissingChilds (position) {
      var p = position;
      if ( p < 0 )  return true;
      return (expectedType('left',p) && !l[p].leftSide)
          || (expectedType('right',p) && !l[p].rightSide);
    }
  
    function typesAreMatching (parent, child) {
      var side = (child < parent) ? 'left' : 'right';
      if ( parent < 0 || child < 0 )                      return false;
      if ( !expectedType(side,parent) )                   return false;
      if ( !evalType(child) )                             return false;
      if ( expectedType(side,parent) == evalType(child) ) return true;
      else                                                return false;
    }
  
    function preceedingTokenCanBeMadeChild (position) {
      var p = position;
      if ( !tokenIsMissingChilds(p) )   return false;
      if ( !preceedingTokenExists(p) )  return false;
      if ( typesAreMatching(p,p-1) )    return true;
      else                              return false;
    }
  
    function preceedingTokenCanBeMadeParent (position) {
      var p = position;
      if ( tokenIsMissingChilds(p) )    return false;
      if ( !preceedingTokenExists(p) )  return false;
      if ( !tokenIsMissingChilds(p-1) ) return false;
      if ( typesAreMatching(p-1,p) )    return true;
      else                              return false;
    }
  
    function makeChild (position) {
      var p = position;
      if (p<1) return false;
      l[p].leftSide = l[p-1];
      removeToken(p-1);
    }
  
    function makeParent (position) {
      var p = position;
      if (p<1) return false;
      l[p-1].rightSide = l[p];
      removeToken(p);
    }
  
    function removeParenthesesPair (position) {
      removeToken(position);
      removeToken(openParenthesisStack.pop());
    }
  
    // step through the tokenList
  
    for (i=0; i < l.length; i++) {
      shouldCheckAgain = false;
    
      if ( l[i].tokenType == 'UNKNOWN' ) {
        error.push('found unknown token: '+l[i].tokenValue);
      }
      
      if ( l[i].tokenType == 'OPEN_PAREN' ) openParenthesisStack.push(i);
      if ( l[i].tokenType == 'CLOSE_PAREN' ) removeParenthesesPair(i);
      
      if ( preceedingTokenCanBeMadeChild(i) ) makeChild(i);
      
      if ( preceedingTokenCanBeMadeParent(i) ){
        makeParent(i);
        shouldCheckAgain = true;
      } 
      
      if ( shouldCheckAgain ) i--;
    
    }
  
    // error if tokenList l is not a single token now
    if (l.length == 1) l = l[0];
    else error.push('string did not resolve to a single tree');
  
    // error?
    if (error.length > 0) return {error: error.join(',\n'), tree: l};
    // everything fine - token list is now a tree and can be returned
    else return l;
  
  },
  
  
  // ..........................................................
  // ORDERING
  //
  
  /**
    Takes a string containing an order statement and returns an array
    describing this order for easier processing.
    Called by parse().
    
    @param {String | Function} orderOp the string containing the order statement, or a comparison function
    @returns {Array | Function} array of order statement, or a function if a function was specified
  */
  buildOrder: function (orderOp) {
    if (!orderOp) {
      return [];
    }
    else if (SC.typeOf(orderOp) === SC.T_FUNCTION) {
      return orderOp;
    }
    else {
      var o = orderOp.split(',');
      for (var i=0; i < o.length; i++) {
        var p = o[i];
        p = p.replace(/^\s+|\s+$/,'');
        p = p.replace(/\s+/,',');
        p = p.split(',');
        o[i] = {propertyName: p[0]};
        if (p[1] && p[1] == 'DESC') o[i].descending = true;
      }
      
      return o;
    }
    
  }

});


// Class Methods
SC.Query.mixin( /** @scope SC.Query */ {

  /** 
    Constant used for SC.Query#location
  
    @property {String}
  */
  LOCAL: 'local',
  
  /** 
    Constant used for SC.Query#location 
    
    @property {String}
  */
  REMOTE: 'remote',
  
  /**
    Given a query, returns the associated storeKey.  For the inverse of this 
    method see SC.Store.queryFor().
    
    @param {SC.Query} query the query
    @returns {Number} a storeKey.
  */
  storeKeyFor: function(query) {
    return query ? query.get('storeKey') : null;
  },
  
  /**
    Will find which records match a give SC.Query and return an array of 
    store keys. This will also apply the sorting for the query.
    
    @param {SC.Query} query to apply
    @param {SC.RecordArray} records to search within
    @param {SC.Store} store to materialize record from
    @returns {Array} array instance of store keys matching the SC.Query (sorted)
  */
  containsRecords: function(query, records, store) {
    var ret = [];
    for(var idx=0,len=records.get('length');idx<len;idx++) {
      var record = records.objectAt(idx);
      if(record && query.contains(record)) {
        ret.push(record.get('storeKey'));
      }
    }
    
    ret = SC.Query.orderStoreKeys(ret, query, store);
    
    return ret;
  },
  
  /** 
    Sorts a set of store keys according to the orderBy property
    of the SC.Query.
    
    @param {Array} storeKeys to sort
    @param {SC.Query} query to use for sorting
    @param {SC.Store} store to materialize records from
    @returns {Array} sorted store keys.  may be same instance as passed value
  */
  orderStoreKeys: function(storeKeys, query, store) {
    // apply the sort if there is one
    if (storeKeys) {
      
      // Set tmp variable because we can't pass variables to sort function.
      // Do this instead of generating a temporary closure function for perf.
      // We'll use a stack-based approach in case our sort routine ends up
      // calling code that triggers a recursive invocation of orderStoreKeys.
      var K           = SC.Query,
          tempStores  = K._TMP_STORES,
          tempQueries = K._TMP_QUERIES;
      if (!tempStores)  tempStores  = K._TMP_STORES = [];
      if (!tempQueries) tempQueries = K._TMP_QUERIES = [];
      
      tempStores.push(store);
      tempQueries.push(query);
        
      var res = storeKeys.sort(SC.Query.compareStoreKeys);
      
      K._TMP_STORES.pop();
      K._TMP_QUERIES.pop();
    }

    return storeKeys;
  },
  
  /** 
    Default sort method that is used when calling containsStoreKeys()
    or containsRecords() on this query. Simply materializes two records based 
    on storekeys before passing on to compare() .
 
    @param {Number} storeKey1 a store key
    @param {Number} storeKey2 a store key
    @returns {Number} -1 if record1 < record2,  +1 if record1 > record2, 0 if equal
  */
  compareStoreKeys: function(storeKey1, storeKey2) {
    var K           = SC.Query,
        tempStores  = K._TMP_STORES,
        tempQueries = K._TMP_QUERIES,
        store       = tempStores[tempStores.length - 1],
        query       = tempQueries[tempQueries.length - 1],
        compareFunc = query.compare,
        record1     = store.materializeRecord(storeKey1),
        record2     = store.materializeRecord(storeKey2);

    // If the query implements a custom 'compare' function, then use it.
    // Otherwise, we have the logic from the standard version inlined here.
    if (compareFunc !== K.prototype.compare) {
      return compareFunc.call(query, record1, record2);
    }
    else {
      // THIS CODE IS THE SAME AS THE 'compare' METHOD, EXCEPT THAT 'this' HAS
      // BEEN CHANGED TO 'query'.
      //
      // It is inlined here to avoid the extra method invocation in the
      // typical case where the client does not supply a custom 'compare'
      // function.
      
      var result = 0, 
          propertyName, order, len, i;

      // fast cases go here
      if (record1 === record2) return 0;
    
      // if called for the first time we have to build the order array
      if (!query._isReady) query.parse();
      if (!query._isReady) { // can't parse. guid is wrong but consistent
        return SC.compare(record1.get('id'),record2.get('id'));
      }
    
      // For every property specified in orderBy until non-eql result is found.
      // Or, if orderBy is a comparison function, simply invoke it with the
      // records.
      order = query._order;
      if (SC.typeOf(order) === SC.T_FUNCTION) {
        result = order.call(null, record1, record2);
      }
      else {
        len   = order ? order.length : 0;
        for (i=0; result===0 && (i < len); i++) {
          propertyName = order[i].propertyName;
          // if query property has a registered comparison use that
          if (SC.Query.comparisons[propertyName]) {
            result = SC.Query.comparisons[propertyName](
                      record1.get(propertyName),record2.get(propertyName));
                  
          // if not use default SC.compare()
          } else {
            result = SC.compare(
                      record1.get(propertyName), record2.get(propertyName) );
          }
      
          if ((result!==0) && order[i].descending) result = (-1) * result;
        }
      }

      // return result or compare by guid
      if (result !== 0) return result ;
      else return SC.compare(record1.get('id'),record2.get('id'));
    }
  },
  
  /**
    Returns a SC.Query instance reflecting the passed properties.  Where 
    possible this method will return cached query instances so that multiple 
    calls to this method will return the same instance.  This is not possible 
    however, when you pass custom parameters or set ordering. All returned 
    queries are frozen.
    
    Usually you will not call this method directly.  Instead use the more
    convenient SC.Query.local() and SC.Query.remote().
    
    h2. Examples
    
    There are a number of different ways you can call this method.  
    
    The following return local queries selecting all records of a particular 
    type or types, including any subclasses:
    
    {{{
      var people = SC.Query.local(Ab.Person);
      var peopleAndCompanies = SC.Query.local([Ab.Person, Ab.Company]);
      
      var people = SC.Query.local('Ab.Person');
      var peopleAndCompanies = SC.Query.local('Ab.Person Ab.Company'.w());
      
      var allRecords = SC.Query.local(SC.Record);
    }}} 
    
    The following will match a particular type of condition:
    
    {{{
      var married = SC.Query.local(Ab.Person, "isMarried=YES");
      var married = SC.Query.local(Ab.Person, "isMarried=%@", [YES]);
      var married = SC.Query.local(Ab.Person, "isMarried={married}", {
        married: YES
      });
    }}}
    
    You can also pass a hash of options as the second parameter.  This is 
    how you specify an order, for example:
    
    {{{
      var orderedPeople = SC.Query.local(Ab.Person, { orderBy: "firstName" });
    }}}
    
    @param {String} location the query location.
    @param {SC.Record|Array} recordType the record type or types.
    @param {String} conditions optional conditions
    @param {Hash} params optional params. or pass multiple args.
    @returns {SC.Query}
  */
  build: function(location, recordType, conditions, params) {
    
    var opts = null,
        ret, cache, key, tmp;
    
    // fast case for query objects.
    if (recordType && recordType.isQuery) { 
      if (recordType.get('location') === location) return recordType;
      else return recordType.copy().set('location', location).freeze();
    }
    
    // normalize recordType
    if (typeof recordType === SC.T_STRING) {
      ret = SC.objectForPropertyPath(recordType);
      if (!ret) throw "%@ did not resolve to a class".fmt(recordType);
      recordType = ret ;
    } else if (recordType && recordType.isEnumerable) {
      ret = [];
      recordType.forEach(function(t) {
        if (typeof t === SC.T_STRING) t = SC.objectForPropertyPath(t);
        if (!t) throw "cannot resolve record types: %@".fmt(recordType);
        ret.push(t);
      }, this);
      recordType = ret ;
    } else if (!recordType) recordType = SC.Record; // find all records
    
    if (params === undefined) params = null;
    if (conditions === undefined) conditions = null;

    // normalize other params. if conditions is just a hash, treat as opts
    if (!params && (typeof conditions !== SC.T_STRING)) {
      opts = conditions;
      conditions = null ;
    }
    
    // special case - easy to cache.
    if (!params && !opts) {

      tmp = SC.Query._scq_recordTypeCache;
      if (!tmp) tmp = SC.Query._scq_recordTypeCache = {};
      cache = tmp[location];
      if (!cache) cache = tmp[location] = {}; 
      
      if (recordType.isEnumerable) {
        key = recordType.map(function(k) { return SC.guidFor(k); });
        key = key.sort().join(':');
      } else key = SC.guidFor(recordType);
      
      if (conditions) key = [key, conditions].join('::');
      
      ret = cache[key];
      if (!ret) {
        if (recordType.isEnumerable) {
          opts = { recordTypes: recordType.copy() };
        } else opts = { recordType: recordType };
        
        opts.location = location ;
        opts.conditions = conditions ;
        ret = cache[key] = SC.Query.create(opts).freeze();
      }
    // otherwise parse extra conditions and handle them
    } else {

      if (!opts) opts = {};
      if (!opts.location) opts.location = location ; // allow override

      // pass one or more recordTypes.
      if (recordType && recordType.isEnumerable) {
        opts.recordsTypes = recordType;
      } else opts.recordType = recordType;

      // set conditions and params if needed
      if (conditions) opts.conditions = conditions;
      if (params) opts.parameters = params;

      ret = SC.Query.create(opts).freeze();
    }
    
    return ret ;
  },
  
  /**
    Returns a LOCAL query with the passed options.  For a full description of
    the parameters you can pass to this method, see SC.Query.build().
  
    @param {SC.Record|Array} recordType the record type or types.
    @param {String} conditions optional conditions
    @param {Hash} params optional params. or pass multiple args.
    @returns {SC.Query}
  */
  local: function(recordType, conditions, params) {
    return this.build(SC.Query.LOCAL, recordType, conditions, params);
  },
  
  /**
    Returns a REMOTE query with the passed options.  For a full description of
    the parameters you can pass to this method, see SC.Query.build().
    
    @param {SC.Record|Array} recordType the record type or types.
    @param {String} conditions optional conditions
    @param {Hash} params optional params. or pass multiple args.
    @returns {SC.Query}
  */
  remote: function(recordType, conditions, params) {
    return this.build(SC.Query.REMOTE, recordType, conditions, params);
  },
  
  /** @private 
    called by SC.Record.extend(). invalided expandedRecordTypes
  */
  _scq_didDefineRecordType: function() {
    var q = SC.Query._scq_queriesWithExpandedRecordTypes;
    if (q) {
      q.forEach(function(query) { 
        query.notifyPropertyChange('expandedRecordTypes');
      }, this);
      q.clear();
    }
  }
  
});


/** @private
  Hash of registered comparisons by propery name. 
*/
SC.Query.comparisons = {};

/**
  Call to register a comparison for a specific property name.
  The function you pass should accept two values of this property
  and return -1 if the first is smaller than the second,
  0 if they are equal and 1 if the first is greater than the second.
  
  @param {String} name of the record property
  @param {Function} custom comparison function
  @returns {SC.Query} receiver
*/
SC.Query.registerComparison = function(propertyName, comparison) {
  SC.Query.comparisons[propertyName] = comparison;
};


/**
  Call to register an extension for the query language.
  You shoud provide a name for your extension and a definition
  specifying how it should be parsed and evaluated.
  
  Have a look at queryLanguage for examples of definitions.
  
  TODO add better documentation here
  
  @param {String} tokenName name of the operator
  @param {Object} token extension definition
  @returns {SC.Query} receiver
*/
SC.Query.registerQueryExtension = function(tokenName, token) {
  SC.Query.prototype.queryLanguage[tokenName] = token;
};

// shorthand
SC.Q = SC.Query.from ;


/* >>>>>>>>>> BEGIN source/system/record_array.js */
// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2010 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('models/record');

/**
  @class

  A RecordArray wraps an array of storeKeys and, optionally, a Query object.
  When you access the items of a RecordArray it will automatically convert the
  storeKeys into actual SC.Record objects that the rest of your application
  can work with.
  
  Normally you do not create RecordArray's yourself.  Instead, a RecordArray
  is returned when you call SC.Store.findAll(), already properly configured.
  You can usually just work with the RecordArray instance just like another
  array.
  
  The information below about RecordArray internals is only intended for those
  who need to override this class for some reason to do something special.
  
  h2. Internal Notes
  
  Normally the RecordArray behavior is very simple.  Any array-like operations
  will be translated into similar calls onto the underlying array of 
  storeKeys.  The underlying array can be a real array or it may be a 
  SparseArray, which is how you implement incremental loading.
  
  If the RecordArray is created with an SC.Query object as well (and it 
  almost always will have a Query object), then the RecordArray will also 
  consult the query for various delegate operations such as determining if 
  the record array should update automatically whenever records in the store
  changes. It will also ask the Query to refresh the storeKeys whenever records 
  change in the store.
  
  If the SC.Query object has complex matching rules, it might be 
  computationally heavy to match a large dataset to a query. To avoid the 
  browser from ever showing a slow script timer in this scenario, the query
  matching is by default paced at 100ms. If query matching takes longer than 
  100ms, it will chunk the work with setTimeout to avoid too much computation
  to happen in one runloop.
  
  
  @extends SC.Object
  @extends SC.Enumerable
  @extends SC.Array
  @since SproutCore 1.0
*/

SC.RecordArray = SC.Object.extend(SC.Enumerable, SC.Array, 
  /** @scope SC.RecordArray.prototype */ {
    
  /**
    The store that owns this record array.  All record arrays must have a 
    store to function properly. 
    
    NOTE: You MUST set this property on the RecordArray when creating it or 
    else it will fail.
  
    @property {SC.Store}
  */
  store: null,

  /**
    The Query object this record array is based upon.  All record arrays MUST 
    have an associated query in order to function correctly.  You cannot 
    change this property once it has been set.

    NOTE: You MUST set this property on the RecordArray when creating it or 
    else it will fail.
    
    @property {SC.Query}
  */
  query: null,

  /**
    The array of storeKeys as retrieved from the owner store.
    
    @property {SC.Array}
  */
  storeKeys: null,

  /**
    The current status for the record array.  Read from the underlying 
    store.
    
    @property {Number}
  */
  status: SC.Record.EMPTY,
  
  /**
    The current editabile state based on the query.
    
    @property {Boolean}
  */
  isEditable: function() {
    var query = this.get('query');
    return query ? query.get('isEditable') : NO;
  }.property('query').cacheable(),
  
  // ..........................................................
  // ARRAY PRIMITIVES
  // 

  /** @private
    Returned length is a pass-through to the storeKeys array.
  */
  length: function() {
    this.flush(); // cleanup pending changes
    var storeKeys = this.get('storeKeys');
    return storeKeys ? storeKeys.get('length') : 0;
  }.property('storeKeys').cacheable(),

  _scra_records: null,
  
  /** @private
    Looks up the store key in the store keys array and materializes a
    records.
    
    @param {Number} idx index of the object
    @return {SC.Record} materialized record
  */
  objectAt: function(idx) {

    this.flush(); // cleanup pending if needed

    var recs      = this._scra_records, 
        storeKeys = this.get('storeKeys'),
        store     = this.get('store'),
        storeKey, ret ;
    
    if (!storeKeys || !store) return undefined; // nothing to do
    if (recs && (ret=recs[idx])) return ret ; // cached
    
    // not in cache, materialize
    if (!recs) this._scra_records = recs = [] ; // create cache
    storeKey = storeKeys.objectAt(idx);
    
    if (storeKey) {
      // if record is not loaded already, then ask the data source to 
      // retrieve it
      if (store.peekStatus(storeKey) === SC.Record.EMPTY) {
        store.retrieveRecord(null, null, storeKey);
      }
      recs[idx] = ret = store.materializeRecord(storeKey);
    }
    return ret ;
  },

  /** @private - optimized forEach loop. */
  forEach: function(callback, target) {
    this.flush();
    
    var recs      = this._scra_records, 
        storeKeys = this.get('storeKeys'),
        store     = this.get('store'), 
        len       = storeKeys ? storeKeys.get('length') : 0,
        idx, storeKey, rec;
        
    if (!storeKeys || !store) return this; // nothing to do    
    if (!recs) recs = this._scra_records = [] ;
    if (!target) target = this;
    
    for(idx=0;idx<len;idx++) {
      rec = recs[idx];
      if (!rec) {
        rec = recs[idx] = store.materializeRecord(storeKeys.objectAt(idx));
      }
      callback.call(target, rec, idx, this);
    }
    
    return this;
  },
  
  /** @private
    Pass through to the underlying array.  The passed in objects must be
    records, which can be converted to storeKeys.
    
    @param {Number} idx start index
    @param {Number} amt end index
    @param {SC.RecordArray} recs to replace with records
    @return {SC.RecordArray} 'this' after replace
  */
  replace: function(idx, amt, recs) {

    this.flush(); // cleanup pending if needed
    
    var storeKeys = this.get('storeKeys'), 
        len       = recs ? (recs.get ? recs.get('length') : recs.length) : 0,
        i, keys;
        
    if (!storeKeys) throw "storeKeys required";

    var query = this.get('query');
    if (query && !query.get('isEditable')) throw SC.RecordArray.NOT_EDITABLE;
    
    // you can't modify an array whose store keys are autogenerated from a 
    // query.
    
    // map to store keys
    keys = [] ;
    for(i=0;i<len;i++) keys[i] = recs.objectAt(i).get('storeKey');
    
    // pass along - if allowed, this should trigger the content observer 
    storeKeys.replace(idx, amt, keys);
    return this; 
  },
  
  /**
    Returns YES if the passed can be found in the record array.  This is 
    provided for compatibility with SC.Set.
    
    @param {SC.Record} record the record
    @returns {Boolean}
  */
  contains: function(record) {
    return this.indexOf(record)>=0;
  },
  
  /** @private
    Returns the first index where the specified record is found.
    
    @param {SC.Record} record the record
    @param {Number} startAt optional starting index
    @returns {Number} index
  */
  indexOf: function(record, startAt) {
    if (!SC.kindOf(record, SC.Record)) {
      SC.Logger.warn("Using indexOf on %@ with an object that is not an SC.Record".fmt(record));
      return -1; // only takes records
    }
    
    this.flush();
    
    var storeKey  = record.get('storeKey'), 
        storeKeys = this.get('storeKeys');
        
    return storeKeys ? storeKeys.indexOf(storeKey, startAt) : -1; 
  },

  /** @private 
    Returns the last index where the specified record is found.
    
    @param {SC.Record} record the record
    @param {Number} startAt optional starting index
    @returns {Number} index
  */
  lastIndexOf: function(record, startAt) {
    if (!SC.kindOf(record, SC.Record)) {
      SC.Logger.warn("Using lastIndexOf on %@ with an object that is not an SC.Record".fmt(record));
      return -1; // only takes records
    }

    this.flush();
    
    var storeKey  = record.get('storeKey'), 
        storeKeys = this.get('storeKeys');
    return storeKeys ? storeKeys.lastIndexOf(storeKey, startAt) : -1; 
  },

  /** 
    Adds the specified record to the record array if it is not already part 
    of the array.  Provided for compatibilty with SC.Set.
    
    @param {SC.Record} record
    @returns {SC.RecordArray} receiver
  */
  add: function(record) {
    if (!SC.kindOf(record, SC.Record)) return this ;
    if (this.indexOf(record)<0) this.pushObject(record);
    return this ;
  },
  
  /**
    Removes the specified record from the array if it is not already a part
    of the array.  Provided for compatibility with SC.Set.
    
    @param {SC.Record} record
    @returns {SC.RecordArray} receiver
  */
  remove: function(record) {
    if (!SC.kindOf(record, SC.Record)) return this ;
    this.removeObject(record);
    return this ;
  },
  
  // ..........................................................
  // HELPER METHODS
  // 

  /**
    Extends the standard SC.Enumerable implementation to return results based
    on a Query if you pass it in.
    
    @param {SC.Query} query a SC.Query object
    @returns {SC.RecordArray} 
  */
  find: function(query, target) {
    if (query && query.isQuery) {
      return this.get('store').find(query.queryWithScope(this));
    } else return arguments.callee.base.apply(this,arguments);
  },
  
  /**
    Call whenever you want to refresh the results of this query.  This will
    notify the data source, asking it to refresh the contents.
    
    @returns {SC.RecordArray} receiver
  */
  refresh: function() {
    this.get('store').refreshQuery(this.get('query'));
    return this;
  },
  
  /**
    Will recompute the results based on the SC.Query attached to the record
    array. Useful if your query is based on computed properties that might 
    have changed. Use refresh() instead of you want to trigger a fetch on your
    data source since this will purely look at records already loaded into
    the store.
    
    @returns {SC.RecordArray} receiver
  */
  reload: function() {
    this.flush(YES);
    return this;
  },
  
  /**
    Destroys the record array.  Releases any storeKeys, and deregisters with
    the owner store.
    
    @returns {SC.RecordArray} receiver
  */
  destroy: function() {
    if (!this.get('isDestroyed')) {
      this.get('store').recordArrayWillDestroy(this);
    } 
    
    arguments.callee.base.apply(this,arguments);
  },
  
  // ..........................................................
  // STORE CALLBACKS
  // 
  
  // NOTE: storeWillFetchQuery(), storeDidFetchQuery(), storeDidCancelQuery(),
  // and storeDidErrorQuery() are tested implicitly through the related
  // methods in SC.Store.  We're doing it this way because eventually this 
  // particular implementation is likely to change; moving some or all of this
  // code directly into the store. -CAJ
  
  /** @private
    Called whenever the store initiates a refresh of the query.  Sets the 
    status of the record array to the appropriate status.
    
    @param {SC.Query} query
    @returns {SC.RecordArray} receiver
  */
  storeWillFetchQuery: function(query) {
    var status = this.get('status'),
        K      = SC.Record;
    if ((status === K.EMPTY) || (status === K.ERROR)) status = K.BUSY_LOADING;
    if (status & K.READY) status = K.BUSY_REFRESH;
    this.setIfChanged('status', status);
    return this ;
  },
  
  /** @private
    Called whenever the store has finished fetching a query.
    
    @param {SC.Query} query
    @returns {SC.RecordArray} receiver
  */
  storeDidFetchQuery: function(query) {
    this.setIfChanged('status', SC.Record.READY_CLEAN);
    return this ;
  },
  
  /** @private
    Called whenever the store has cancelled a refresh.  Sets the 
    status of the record array to the appropriate status.
    
    @param {SC.Query} query
    @returns {SC.RecordArray} receiver
  */
  storeDidCancelQuery: function(query) {
    var status = this.get('status'),
        K      = SC.Record;
    if (status === K.BUSY_LOADING) status = K.EMPTY;
    else if (status === K.BUSY_REFRESH) status = K.READY_CLEAN;
    this.setIfChanged('status', status);
    return this ;
  },

  /** @private
    Called whenever the store encounters an error while fetching.  Sets the 
    status of the record array to the appropriate status.
    
    @param {SC.Query} query
    @returns {SC.RecordArray} receiver
  */
  storeDidErrorQuery: function(query) {
    this.setIfChanged('status', SC.Record.ERROR);
    return this ;
  },
  
  /** @private
    Called by the store whenever it changes the state of certain store keys.
    If the receiver cares about these changes, it will mark itself as dirty.
    The next time you try to access the record array it will update any 
    pending changes.
    
    @param {SC.Array} storeKeys the effected store keys
    @param {SC.Set} recordTypes the record types for the storeKeys.
    @returns {SC.RecordArray} receiver
  */
  storeDidChangeStoreKeys: function(storeKeys, recordTypes) {
    var query =  this.get('query');
    // fast path exits
    if (query.get('location') !== SC.Query.LOCAL) return this;
    if (!query.containsRecordTypes(recordTypes)) return this;   
    
    // ok - we're interested.  mark as dirty and save storeKeys.
    var changed = this._scq_changedStoreKeys;
    if (!changed) changed = this._scq_changedStoreKeys = SC.IndexSet.create();
    changed.addEach(storeKeys);
    
    this.set('needsFlush', YES);
    this.enumerableContentDidChange();

    return this;
  },
  
  /**
    Applies the query to any pending changed store keys, updating the record
    array contents as necessary.  This method is called automatically anytime
    you access the RecordArray to make sure it is up to date, but you can 
    call it yourself as well if you need to force the record array to fully
    update immediately.
    
    Currently this method only has an effect if the query location is 
    SC.Query.LOCAL.  You can call this method on any RecordArray however,
    without an error.
    
    @param {Boolean} _flush to force it - use reload() to trigger it
    @returns {SC.RecordArray} receiver
  */
  flush: function(_flush) {
    // Are we already inside a flush?  If so, then don't do it again, to avoid
    // never-ending recursive flush calls.  Instead, we'll simply mark
    // ourselves as needing a flush again when we're done.
    if (this._insideFlush) {
      this.set('needsFlush', YES);
      return this;
    }
    
    if (!this.get('needsFlush') && !_flush) return this; // nothing to do
    this.set('needsFlush', NO); // avoid running again.
    
    // fast exit
    var query = this.get('query'),
        store = this.get('store'); 
    if (!store || !query || query.get('location') !== SC.Query.LOCAL) {
      return this;
    }
    
    this._insideFlush = YES;
    
    // OK, actually generate some results
    var storeKeys = this.get('storeKeys'),
        changed   = this._scq_changedStoreKeys,
        didChange = NO,
        K         = SC.Record,
        storeKeysToPace = [],
        startDate = new Date(),
        rec, status, recordType, sourceKeys, scope, included;
    
    // if we have storeKeys already, just look at the changed keys
    var oldStoreKeys = storeKeys;
    if (storeKeys && !_flush) {
      
      if (changed) {
        changed.forEach(function(storeKey) {
          if(storeKeysToPace.length>0 || new Date()-startDate>SC.RecordArray.QUERY_MATCHING_THRESHOLD) {
            storeKeysToPace.push(storeKey);
            return;
          }
          // get record - do not include EMPTY or DESTROYED records
          status = store.peekStatus(storeKey);
          if (!(status & K.EMPTY) && !((status & K.DESTROYED) || (status === K.BUSY_DESTROYING))) {
            rec = store.materializeRecord(storeKey);
            included = !!(rec && query.contains(rec));
          } else included = NO ;
          
          // if storeKey should be in set but isn't -- add it.
          if (included) {
            if (storeKeys.indexOf(storeKey)<0) {
              if (!didChange) storeKeys = storeKeys.copy(); 
              storeKeys.pushObject(storeKey); 
            }
          // if storeKey should NOT be in set but IS -- remove it
          } else {
            if (storeKeys.indexOf(storeKey)>=0) {
              if (!didChange) storeKeys = storeKeys.copy();
              storeKeys.removeObject(storeKey);
            } // if (storeKeys.indexOf)
          } // if (included)
          
        }, this);
        // make sure resort happens
        didChange = YES ;
        
      } // if (changed)
      
      //console.log(this.toString() + ' partial flush took ' + (new Date()-startDate) + ' ms');
    
    // if no storeKeys, then we have to go through all of the storeKeys 
    // and decide if they belong or not.  ick.
    } else {
      
      // collect the base set of keys.  if query has a parent scope, use that
      if (scope = query.get('scope')) {
        sourceKeys = scope.flush().get('storeKeys');
      // otherwise, lookup all storeKeys for the named recordType...
      } else if (recordType = query.get('expandedRecordTypes')) {
        sourceKeys = SC.IndexSet.create();
        recordType.forEach(function(cur) { 
          sourceKeys.addEach(store.storeKeysFor(recordType));
        });
      }
      
      // loop through storeKeys to determine if it belongs in this query or 
      // not.
      storeKeys = [];
      sourceKeys.forEach(function(storeKey) {
        if(storeKeysToPace.length>0 || new Date()-startDate>SC.RecordArray.QUERY_MATCHING_THRESHOLD) {
          storeKeysToPace.push(storeKey);
          return;
        }
        
        status = store.peekStatus(storeKey);
        if (!(status & K.EMPTY) && !((status & K.DESTROYED) || (status === K.BUSY_DESTROYING))) {
          rec = store.materializeRecord(storeKey);
          if (rec && query.contains(rec)) storeKeys.push(storeKey);
        }
      });
      
      //console.log(this.toString() + ' full flush took ' + (new Date()-startDate) + ' ms');
      
      didChange = YES ;
    }
    
    // if we reach our threshold of pacing we need to schedule the rest of the
    // storeKeys to also be updated
    if(storeKeysToPace.length>0) {
      var self = this;
      // use setTimeout here to guarantee that we hit the next runloop, 
      // and not the same runloop which the invoke* methods do not guarantee
      window.setTimeout(function() {
        SC.run(function() {
          if(!self || self.get('isDestroyed')) return;
          self.set('needsFlush', YES);
          self._scq_changedStoreKeys = SC.IndexSet.create().addEach(storeKeysToPace);
          self.flush();
        });
      }, 1);
    }
    
    // clear set of changed store keys
    if (changed) changed.clear();
    
    // only resort and update if we did change
    if (didChange) {
      
      // storeKeys must be a new instance because orderStoreKeys() works on it
      if (storeKeys && (storeKeys===oldStoreKeys)) {
        storeKeys = storeKeys.copy();
      }
      
      storeKeys = SC.Query.orderStoreKeys(storeKeys, query, store);
      if (SC.compare(oldStoreKeys, storeKeys) !== 0){
        this.set('storeKeys', SC.clone(storeKeys)); // replace content
      }
    }

    this._insideFlush = NO;
    return this;
  },

  /**
    Set to YES when the query is dirty and needs to update its storeKeys 
    before returning any results.  RecordArrays always start dirty and become
    clean the first time you try to access their contents.
    
    @property {Boolean}
  */
  needsFlush: YES,

  // ..........................................................
  // EMULATE SC.ERROR API
  // 
  
  /**
    Returns YES whenever the status is SC.Record.ERROR.  This will allow you 
    to put the UI into an error state.
    
    @property {Boolean}
  */
  isError: function() {
    return this.get('status') & SC.Record.ERROR;
  }.property('status').cacheable(),

  /**
    Returns the receiver if the record array is in an error state.  Returns null
    otherwise.
    
    @property {SC.Record}
  */
  errorValue: function() {
    return this.get('isError') ? SC.val(this.get('errorObject')) : null ;
  }.property('isError').cacheable(),
  
  /**
    Returns the current error object only if the record array is in an error state.
    If no explicit error object has been set, returns SC.Record.GENERIC_ERROR.
    
    @property {SC.Error}
  */
  errorObject: function() {
    if (this.get('isError')) {
      var store = this.get('store');
      return store.readQueryError(this.get('query')) || SC.Record.GENERIC_ERROR;
    } else return null ;
  }.property('isError').cacheable(),
  
  // ..........................................................
  // INTERNAL SUPPORT
  // 
  
  /** @private 
    Invoked whenever the storeKeys array changes.  Observes changes.
  */
  _storeKeysDidChange: function() {
    var storeKeys = this.get('storeKeys');
    
    var prev = this._prevStoreKeys, 
        f    = this._storeKeysContentDidChange,
        fs   = this._storeKeysStateDidChange;
    
    if (storeKeys === prev) return; // nothing to do
    
    if (prev) prev.removeObserver('[]', this, f);
    this._prevStoreKeys = storeKeys;
    if (storeKeys) storeKeys.addObserver('[]', this, f);
    
    var rev = (storeKeys) ? storeKeys.propertyRevision : -1 ;
    this._storeKeysContentDidChange(storeKeys, '[]', storeKeys, rev);
    
  }.observes('storeKeys'),
  
  /** @private
    Invoked whenever the content of the storeKeys array changes.  This will
    dump any cached record lookup and then notify that the enumerable content
    has changed.
  */
  _storeKeysContentDidChange: function(target, key, value, rev) {
    if (this._scra_records) this._scra_records.length=0 ; // clear cache
    
    this.beginPropertyChanges()
      .notifyPropertyChange('length')
      .enumerableContentDidChange()
    .endPropertyChanges();
  },
  
  /** @private */
  init: function() {
    arguments.callee.base.apply(this,arguments);
    this._storeKeysDidChange();
  }
  
});

SC.RecordArray.mixin({  
  
  /** 
    Standard error throw when you try to modify a record that is not editable
    
    @property {SC.Error}
  */
  NOT_EDITABLE: SC.Error.desc("SC.RecordArray is not editable"),
  
  /**
    Number of milliseconds to allow a query matching to run for. If this number
    is exceeded, the query matching will be paced so as to not lock up the 
    browser (by essentially splitting the work with a setTimeout)
    
    @property {Number}
  */
  QUERY_MATCHING_THRESHOLD: 100
});


/* >>>>>>>>>> BEGIN javascript.js */
/* >>>>>>>>>> BEGIN __sc_chance.js */

/* >>>>>>>>>> BEGIN source/license.js */
/** 
 * @license
 * ==========================================================================
 * SproutCore -- JavaScript Application Framework
 * copyright 2006-2011, Strobe Inc. and contributors.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 * For more information about SproutCore, visit http://www.sproutcore.com
 * 
 * 
 * ==========================================================================
 */


