/** @license React v16.13.1
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global.React = {}));
})(void 0, function (exports) {
  'use strict';

  var ReactVersion = '16.13.1'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.

  var hasSymbol = typeof Symbol === 'function' && Symbol["for"];
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol["for"]('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol["for"]('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol["for"]('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol["for"]('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol["for"]('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol["for"]('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol["for"]('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary

  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol["for"]('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol["for"]('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol["for"]('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol["for"]('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol["for"]('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol["for"]('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol["for"]('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol["for"]('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol["for"]('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol["for"]('react.scope') : 0xead7;
  var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || _typeof(maybeIterable) !== 'object') {
      return null;
    }

    var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

    if (typeof maybeIterator === 'function') {
      return maybeIterator;
    }

    return null;
  }
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */

  /* eslint-disable no-unused-vars */


  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }

    return Object(val);
  }

  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      } // Detect buggy property enumeration order in older V8 versions.
      // https://bugs.chromium.org/p/v8/issues/detail?id=4118


      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

      test1[5] = 'de';

      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test2 = {};

      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }

      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });

      if (order2.join('') !== '0123456789') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });

      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }

      return true;
    } catch (err) {
      // We don't expect any of the above to throw, but better to be safe.
      return false;
    }
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
    var from;
    var to = toObject(target);
    var symbols;

    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);

      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }

      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);

        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }

    return to;
  };
  /**
   * Keeps track of the current dispatcher.
   */

  var ReactCurrentDispatcher = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null
  };
  /**
   * Keeps track of the current batch's configuration such as how long an update
   * should suspend for if it needs to.
   */

  var ReactCurrentBatchConfig = {
    suspense: null
  };
  /**
   * Keeps track of the current owner.
   *
   * The current owner is the component who should own any components that are
   * currently being constructed.
   */

  var ReactCurrentOwner = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null
  };
  var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

  function describeComponentFrame(name, source, ownerName) {
    var sourceInfo = '';

    if (source) {
      var path = source.fileName;
      var fileName = path.replace(BEFORE_SLASH_RE, '');
      {
        // In DEV, include code for a common special case:
        // prefer "folder/index.js" instead of just "index.js".
        if (/^index\./.test(fileName)) {
          var match = path.match(BEFORE_SLASH_RE);

          if (match) {
            var pathBeforeSlash = match[1];

            if (pathBeforeSlash) {
              var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
              fileName = folderName + '/' + fileName;
            }
          }
        }
      }
      sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
    } else if (ownerName) {
      sourceInfo = ' (created by ' + ownerName + ')';
    }

    return '\n    in ' + (name || 'Unknown') + sourceInfo;
  }

  var Resolved = 1;

  function refineResolvedLazyComponent(lazyComponent) {
    return lazyComponent._status === Resolved ? lazyComponent._result : null;
  }

  function getWrappedName(outerType, innerType, wrapperName) {
    var functionName = innerType.displayName || innerType.name || '';
    return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
  }

  function getComponentName(type) {
    if (type == null) {
      // Host root, text node or just invalid type.
      return null;
    }

    {
      if (typeof type.tag === 'number') {
        error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
      }
    }

    if (typeof type === 'function') {
      return type.displayName || type.name || null;
    }

    if (typeof type === 'string') {
      return type;
    }

    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return 'Fragment';

      case REACT_PORTAL_TYPE:
        return 'Portal';

      case REACT_PROFILER_TYPE:
        return "Profiler";

      case REACT_STRICT_MODE_TYPE:
        return 'StrictMode';

      case REACT_SUSPENSE_TYPE:
        return 'Suspense';

      case REACT_SUSPENSE_LIST_TYPE:
        return 'SuspenseList';
    }

    if (_typeof(type) === 'object') {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          return 'Context.Consumer';

        case REACT_PROVIDER_TYPE:
          return 'Context.Provider';

        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, 'ForwardRef');

        case REACT_MEMO_TYPE:
          return getComponentName(type.type);

        case REACT_BLOCK_TYPE:
          return getComponentName(type.render);

        case REACT_LAZY_TYPE:
          {
            var thenable = type;
            var resolvedThenable = refineResolvedLazyComponent(thenable);

            if (resolvedThenable) {
              return getComponentName(resolvedThenable);
            }

            break;
          }
      }
    }

    return null;
  }

  var ReactDebugCurrentFrame = {};
  var currentlyValidatingElement = null;

  function setCurrentlyValidatingElement(element) {
    {
      currentlyValidatingElement = element;
    }
  }

  {
    // Stack implementation injected by the current renderer.
    ReactDebugCurrentFrame.getCurrentStack = null;

    ReactDebugCurrentFrame.getStackAddendum = function () {
      var stack = ''; // Add an extra top frame while an element is being validated

      if (currentlyValidatingElement) {
        var name = getComponentName(currentlyValidatingElement.type);
        var owner = currentlyValidatingElement._owner;
        stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
      } // Delegate to the injected renderer-specific implementation


      var impl = ReactDebugCurrentFrame.getCurrentStack;

      if (impl) {
        stack += impl() || '';
      }

      return stack;
    };
  }
  /**
   * Used by act() to track whether you're inside an act() scope.
   */

  var IsSomeRendererActing = {
    current: false
  };
  var ReactSharedInternals = {
    ReactCurrentDispatcher: ReactCurrentDispatcher,
    ReactCurrentBatchConfig: ReactCurrentBatchConfig,
    ReactCurrentOwner: ReactCurrentOwner,
    IsSomeRendererActing: IsSomeRendererActing,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: objectAssign
  };
  {
    objectAssign(ReactSharedInternals, {
      // These should not be included in production.
      ReactDebugCurrentFrame: ReactDebugCurrentFrame,
      // Shim for React DOM 16.0.0 which still destructured (but not used) this.
      // TODO: remove in React 17.0.
      ReactComponentTreeHook: {}
    });
  } // by calls to these methods by a Babel plugin.
  //
  // In PROD (or in packages without access to React internals),
  // they are left as they are instead.

  function warn(format) {
    {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      printWarning('warn', format, args);
    }
  }

  function error(format) {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }

  function printWarning(level, format, args) {
    // When changing this logic, you might want to also
    // update consoleWithStackDev.www.js as well.
    {
      var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;

      if (!hasExistingStack) {
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        var stack = ReactDebugCurrentFrame.getStackAddendum();

        if (stack !== '') {
          format += '%s';
          args = args.concat([stack]);
        }
      }

      var argsWithFormat = args.map(function (item) {
        return '' + item;
      }); // Careful: RN currently depends on this prefix

      argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610
      // eslint-disable-next-line react-internal/no-production-logging

      Function.prototype.apply.call(console[level], console, argsWithFormat);

      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        throw new Error(message);
      } catch (x) {}
    }
  }

  var didWarnStateUpdateForUnmountedComponent = {};

  function warnNoop(publicInstance, callerName) {
    {
      var _constructor = publicInstance.constructor;
      var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
      var warningKey = componentName + "." + callerName;

      if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
        return;
      }

      error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
      didWarnStateUpdateForUnmountedComponent[warningKey] = true;
    }
  }
  /**
   * This is the abstract API for an update queue.
   */


  var ReactNoopUpdateQueue = {
    /**
     * Checks whether or not this composite component is mounted.
     * @param {ReactClass} publicInstance The instance we want to test.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function isMounted(publicInstance) {
      return false;
    },

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
      warnNoop(publicInstance, 'forceUpdate');
    },

    /**
     * Replaces all of the state. Always use this or `setState` to mutate state.
     * You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} completeState Next state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
      warnNoop(publicInstance, 'replaceState');
    },

    /**
     * Sets a subset of the state. This only exists because _pendingState is
     * internal. This provides a merging strategy that is not available to deep
     * properties which is confusing. TODO: Expose pendingState or don't use it
     * during the merge.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} partialState Next partial state to be merged with state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} Name of the calling function in the public API.
     * @internal
     */
    enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
      warnNoop(publicInstance, 'setState');
    }
  };
  var emptyObject = {};
  {
    Object.freeze(emptyObject);
  }
  /**
   * Base class helpers for the updating state of a component.
   */

  function Component(props, context, updater) {
    this.props = props;
    this.context = context; // If a component has string refs, we will assign a different object later.

    this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
    // renderer.

    this.updater = updater || ReactNoopUpdateQueue;
  }

  Component.prototype.isReactComponent = {};
  /**
   * Sets a subset of the state. Always use this to mutate
   * state. You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * There is no guarantee that calls to `setState` will run synchronously,
   * as they may eventually be batched together.  You can provide an optional
   * callback that will be executed when the call to setState is actually
   * completed.
   *
   * When a function is provided to setState, it will be called at some point in
   * the future (not synchronously). It will be called with the up to date
   * component arguments (state, props, context). These values can be different
   * from this.* because your function may be called after receiveProps but before
   * shouldComponentUpdate, and this new state, props, and context will not yet be
   * assigned to this.
   *
   * @param {object|function} partialState Next partial state or function to
   *        produce next partial state to be merged with current state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */

  Component.prototype.setState = function (partialState, callback) {
    if (!(_typeof(partialState) === 'object' || typeof partialState === 'function' || partialState == null)) {
      {
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      }
    }

    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  };
  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {?function} callback Called after update is complete.
   * @final
   * @protected
   */


  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
  };
  /**
   * Deprecated APIs. These APIs used to exist on classic React classes but since
   * we would like to deprecate them, we're not going to move them over to this
   * modern base class. Instead, we define a getter that warns if it's accessed.
   */


  {
    var deprecatedAPIs = {
      isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
      replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
    };

    var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function get() {
          warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
          return undefined;
        }
      });
    };

    for (var fnName in deprecatedAPIs) {
      if (deprecatedAPIs.hasOwnProperty(fnName)) {
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
    }
  }

  function ComponentDummy() {}

  ComponentDummy.prototype = Component.prototype;
  /**
   * Convenience component with default shallow equality check for sCU.
   */

  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context; // If a component has string refs, we will assign a different object later.

    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }

  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

  objectAssign(pureComponentPrototype, Component.prototype);
  pureComponentPrototype.isPureReactComponent = true; // an immutable object with a single mutable value

  function createRef() {
    var refObject = {
      current: null
    };
    {
      Object.seal(refObject);
    }
    return refObject;
  }

  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };
  var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
  {
    didWarnAboutStringRefs = {};
  }

  function hasValidRef(config) {
    {
      if (hasOwnProperty$1.call(config, 'ref')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }
    return config.ref !== undefined;
  }

  function hasValidKey(config) {
    {
      if (hasOwnProperty$1.call(config, 'key')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }
    return config.key !== undefined;
  }

  function defineKeyPropWarningGetter(props, displayName) {
    var warnAboutAccessingKey = function warnAboutAccessingKey() {
      {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }

  function defineRefPropWarningGetter(props, displayName) {
    var warnAboutAccessingRef = function warnAboutAccessingRef() {
      {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }

  function warnIfStringRefCannotBeAutoConverted(config) {
    {
      if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
        var componentName = getComponentName(ReactCurrentOwner.current.type);

        if (!didWarnAboutStringRefs[componentName]) {
          error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);
          didWarnAboutStringRefs[componentName] = true;
        }
      }
    }
  }
  /**
   * Factory method to create a new React element. This no longer adheres to
   * the class pattern, so do not use new to call it. Also, instanceof check
   * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
   * if something is a React Element.
   *
   * @param {*} type
   * @param {*} props
   * @param {*} key
   * @param {string|object} ref
   * @param {*} owner
   * @param {*} self A *temporary* helper to detect places where `this` is
   * different from the `owner` when React.createElement is called, so that we
   * can warn. We want to get rid of owner and replace string `ref`s with arrow
   * functions, and as long as `this` and owner are the same, there will be no
   * change in behavior.
   * @param {*} source An annotation object (added by a transpiler or otherwise)
   * indicating filename, line number, and/or other information.
   * @internal
   */


  var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
    var element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,
      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,
      // Record the component responsible for creating this element.
      _owner: owner
    };
    {
      // The validation flag is currently mutative. We put it on
      // an external backing store so that we can freeze the whole object.
      // This can be replaced with a WeakMap once they are implemented in
      // commonly used development environments.
      element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
      // the validation flag non-enumerable (where possible, which should
      // include every environment we run tests in), so the test framework
      // ignores it.

      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      }); // self and source are DEV only properties.

      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      }); // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.

      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });

      if (Object.freeze) {
        Object.freeze(element.props);
        Object.freeze(element);
      }
    }
    return element;
  };
  /**
   * Create and return a new ReactElement of the given type.
   * See https://reactjs.org/docs/react-api.html#createelement
   */


  function createElement(type, config, children) {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null;
    var self = null;
    var source = null;

    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;
        {
          warnIfStringRefCannotBeAutoConverted(config);
        }
      }

      if (hasValidKey(config)) {
        key = '' + config.key;
      }

      self = config.__self === undefined ? null : config.__self;
      source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      }
    } // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.


    var childrenLength = arguments.length - 2;

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }

      {
        if (Object.freeze) {
          Object.freeze(childArray);
        }
      }
      props.children = childArray;
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    {
      if (key || ref) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }

        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }

  function cloneAndReplaceKey(oldElement, newKey) {
    var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
    return newElement;
  }
  /**
   * Clone and return a new ReactElement using element as the starting point.
   * See https://reactjs.org/docs/react-api.html#cloneelement
   */


  function cloneElement(element, config, children) {
    if (!!(element === null || element === undefined)) {
      {
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
      }
    }

    var propName; // Original props are copied

    var props = objectAssign({}, element.props); // Reserved names are extracted

    var key = element.key;
    var ref = element.ref; // Self is preserved since the owner is preserved.

    var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
    // transpiler, and the original source is probably a better indicator of the
    // true owner.

    var source = element._source; // Owner will be preserved, unless ref is overridden

    var owner = element._owner;

    if (config != null) {
      if (hasValidRef(config)) {
        // Silently steal the ref from the parent.
        ref = config.ref;
        owner = ReactCurrentOwner.current;
      }

      if (hasValidKey(config)) {
        key = '' + config.key;
      } // Remaining properties override existing props


      var defaultProps;

      if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps;
      }

      for (propName in config) {
        if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          if (config[propName] === undefined && defaultProps !== undefined) {
            // Resolve default props
            props[propName] = defaultProps[propName];
          } else {
            props[propName] = config[propName];
          }
        }
      }
    } // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.


    var childrenLength = arguments.length - 2;

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }

      props.children = childArray;
    }

    return ReactElement(element.type, key, ref, self, source, owner, props);
  }
  /**
   * Verifies the object is a ReactElement.
   * See https://reactjs.org/docs/react-api.html#isvalidelement
   * @param {?object} object
   * @return {boolean} True if `object` is a ReactElement.
   * @final
   */


  function isValidElement(object) {
    return _typeof(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }

  var SEPARATOR = '.';
  var SUBSEPARATOR = ':';
  /**
   * Escape and wrap key so it is safe to use as a reactid
   *
   * @param {string} key to be escaped.
   * @return {string} the escaped key.
   */

  function escape(key) {
    var escapeRegex = /[=:]/g;
    var escaperLookup = {
      '=': '=0',
      ':': '=2'
    };
    var escapedString = ('' + key).replace(escapeRegex, function (match) {
      return escaperLookup[match];
    });
    return '$' + escapedString;
  }
  /**
   * TODO: Test that a single child and an array with one item have the same key
   * pattern.
   */


  var didWarnAboutMaps = false;
  var userProvidedKeyEscapeRegex = /\/+/g;

  function escapeUserProvidedKey(text) {
    return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
  }

  var POOL_SIZE = 10;
  var traverseContextPool = [];

  function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
    if (traverseContextPool.length) {
      var traverseContext = traverseContextPool.pop();
      traverseContext.result = mapResult;
      traverseContext.keyPrefix = keyPrefix;
      traverseContext.func = mapFunction;
      traverseContext.context = mapContext;
      traverseContext.count = 0;
      return traverseContext;
    } else {
      return {
        result: mapResult,
        keyPrefix: keyPrefix,
        func: mapFunction,
        context: mapContext,
        count: 0
      };
    }
  }

  function releaseTraverseContext(traverseContext) {
    traverseContext.result = null;
    traverseContext.keyPrefix = null;
    traverseContext.func = null;
    traverseContext.context = null;
    traverseContext.count = 0;

    if (traverseContextPool.length < POOL_SIZE) {
      traverseContextPool.push(traverseContext);
    }
  }
  /**
   * @param {?*} children Children tree container.
   * @param {!string} nameSoFar Name of the key path so far.
   * @param {!function} callback Callback to invoke with each child found.
   * @param {?*} traverseContext Used to pass information throughout the traversal
   * process.
   * @return {!number} The number of children in this subtree.
   */


  function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
    var type = _typeof(children);

    if (type === 'undefined' || type === 'boolean') {
      // All of the above are perceived as null.
      children = null;
    }

    var invokeCallback = false;

    if (children === null) {
      invokeCallback = true;
    } else {
      switch (type) {
        case 'string':
        case 'number':
          invokeCallback = true;
          break;

        case 'object':
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
          }

      }
    }

    if (invokeCallback) {
      callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows.
      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
      return 1;
    }

    var child;
    var nextName;
    var subtreeCount = 0; // Count of children found in the current subtree.

    var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        nextName = nextNamePrefix + getComponentKey(child, i);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else {
      var iteratorFn = getIteratorFn(children);

      if (typeof iteratorFn === 'function') {
        {
          // Warn about using Maps as children
          if (iteratorFn === children.entries) {
            if (!didWarnAboutMaps) {
              warn('Using Maps as children is deprecated and will be removed in ' + 'a future major release. Consider converting children to ' + 'an array of keyed ReactElements instead.');
            }

            didWarnAboutMaps = true;
          }
        }
        var iterator = iteratorFn.call(children);
        var step;
        var ii = 0;

        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else if (type === 'object') {
        var addendum = '';
        {
          addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
        }
        var childrenString = '' + children;
        {
          {
            throw Error("Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ")." + addendum);
          }
        }
      }
    }

    return subtreeCount;
  }
  /**
   * Traverses children that are typically specified as `props.children`, but
   * might also be specified through attributes:
   *
   * - `traverseAllChildren(this.props.children, ...)`
   * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
   *
   * The `traverseContext` is an optional argument that is passed through the
   * entire traversal. It can be used to store accumulations or anything else that
   * the callback might find relevant.
   *
   * @param {?*} children Children tree object.
   * @param {!function} callback To invoke upon traversing each child.
   * @param {?*} traverseContext Context for traversal.
   * @return {!number} The number of children in this subtree.
   */


  function traverseAllChildren(children, callback, traverseContext) {
    if (children == null) {
      return 0;
    }

    return traverseAllChildrenImpl(children, '', callback, traverseContext);
  }
  /**
   * Generate a key string that identifies a component within a set.
   *
   * @param {*} component A component that could contain a manual key.
   * @param {number} index Index that is used if a manual key is not provided.
   * @return {string}
   */


  function getComponentKey(component, index) {
    // Do some typechecking here since we call this blindly. We want to ensure
    // that we don't block potential future ES APIs.
    if (_typeof(component) === 'object' && component !== null && component.key != null) {
      // Explicit key
      return escape(component.key);
    } // Implicit key determined by the index in the set


    return index.toString(36);
  }

  function forEachSingleChild(bookKeeping, child, name) {
    var func = bookKeeping.func,
        context = bookKeeping.context;
    func.call(context, child, bookKeeping.count++);
  }
  /**
   * Iterates through children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} forEachFunc
   * @param {*} forEachContext Context for forEachContext.
   */


  function forEachChildren(children, forEachFunc, forEachContext) {
    if (children == null) {
      return children;
    }

    var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    releaseTraverseContext(traverseContext);
  }

  function mapSingleChildIntoContext(bookKeeping, child, childKey) {
    var result = bookKeeping.result,
        keyPrefix = bookKeeping.keyPrefix,
        func = bookKeeping.func,
        context = bookKeeping.context;
    var mappedChild = func.call(context, child, bookKeeping.count++);

    if (Array.isArray(mappedChild)) {
      mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
        return c;
      });
    } else if (mappedChild != null) {
      if (isValidElement(mappedChild)) {
        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
        // traverseAllChildren used to do for objects as children
        keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
      }

      result.push(mappedChild);
    }
  }

  function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
    var escapedPrefix = '';

    if (prefix != null) {
      escapedPrefix = escapeUserProvidedKey(prefix) + '/';
    }

    var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
    traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
    releaseTraverseContext(traverseContext);
  }
  /**
   * Maps children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenmap
   *
   * The provided mapFunction(child, key, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} func The map function.
   * @param {*} context Context for mapFunction.
   * @return {object} Object containing the ordered map of results.
   */


  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }

    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
  }
  /**
   * Count the number of children that are typically specified as
   * `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrencount
   *
   * @param {?*} children Children tree container.
   * @return {number} The number of children.
   */


  function countChildren(children) {
    return traverseAllChildren(children, function () {
      return null;
    }, null);
  }
  /**
   * Flatten a children object (typically specified as `props.children`) and
   * return an array with appropriately re-keyed children.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
   */


  function toArray(children) {
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
      return child;
    });
    return result;
  }
  /**
   * Returns the first child in a collection of children and verifies that there
   * is only one child in the collection.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenonly
   *
   * The current implementation of this function assumes that a single child gets
   * passed without a wrapper, but the purpose of this helper function is to
   * abstract away the particular structure of children.
   *
   * @param {?object} children Child collection structure.
   * @return {ReactElement} The first and only `ReactElement` contained in the
   * structure.
   */


  function onlyChild(children) {
    if (!isValidElement(children)) {
      {
        throw Error("React.Children.only expected to receive a single React element child.");
      }
    }

    return children;
  }

  function createContext(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === undefined) {
      calculateChangedBits = null;
    } else {
      {
        if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
          error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
        }
      }
    }

    var context = {
      $$typeof: REACT_CONTEXT_TYPE,
      _calculateChangedBits: calculateChangedBits,
      // As a workaround to support multiple concurrent renderers, we categorize
      // some renderers as primary and others as secondary. We only expect
      // there to be two concurrent renderers at most: React Native (primary) and
      // Fabric (secondary); React DOM (primary) and React ART (secondary).
      // Secondary renderers store their context values on separate fields.
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      // Used to track how many concurrent renderers this context currently
      // supports within in a single renderer. Such as parallel server rendering.
      _threadCount: 0,
      // These are circular
      Provider: null,
      Consumer: null
    };
    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context
    };
    var hasWarnedAboutUsingNestedContextConsumers = false;
    var hasWarnedAboutUsingConsumerProvider = false;
    {
      // A separate object, but proxies back to the original context object for
      // backwards compatibility. It has a different $$typeof, so we can properly
      // warn for the incorrect usage of Context as a Consumer.
      var Consumer = {
        $$typeof: REACT_CONTEXT_TYPE,
        _context: context,
        _calculateChangedBits: context._calculateChangedBits
      }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

      Object.defineProperties(Consumer, {
        Provider: {
          get: function get() {
            if (!hasWarnedAboutUsingConsumerProvider) {
              hasWarnedAboutUsingConsumerProvider = true;
              error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
            }

            return context.Provider;
          },
          set: function set(_Provider) {
            context.Provider = _Provider;
          }
        },
        _currentValue: {
          get: function get() {
            return context._currentValue;
          },
          set: function set(_currentValue) {
            context._currentValue = _currentValue;
          }
        },
        _currentValue2: {
          get: function get() {
            return context._currentValue2;
          },
          set: function set(_currentValue2) {
            context._currentValue2 = _currentValue2;
          }
        },
        _threadCount: {
          get: function get() {
            return context._threadCount;
          },
          set: function set(_threadCount) {
            context._threadCount = _threadCount;
          }
        },
        Consumer: {
          get: function get() {
            if (!hasWarnedAboutUsingNestedContextConsumers) {
              hasWarnedAboutUsingNestedContextConsumers = true;
              error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
            }

            return context.Consumer;
          }
        }
      }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

      context.Consumer = Consumer;
    }
    {
      context._currentRenderer = null;
      context._currentRenderer2 = null;
    }
    return context;
  }

  function lazy(ctor) {
    var lazyType = {
      $$typeof: REACT_LAZY_TYPE,
      _ctor: ctor,
      // React uses these fields to store the result.
      _status: -1,
      _result: null
    };
    {
      // In production, this would just set it on the object.
      var defaultProps;
      var propTypes;
      Object.defineProperties(lazyType, {
        defaultProps: {
          configurable: true,
          get: function get() {
            return defaultProps;
          },
          set: function set(newDefaultProps) {
            error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
            defaultProps = newDefaultProps; // Match production behavior more closely:

            Object.defineProperty(lazyType, 'defaultProps', {
              enumerable: true
            });
          }
        },
        propTypes: {
          configurable: true,
          get: function get() {
            return propTypes;
          },
          set: function set(newPropTypes) {
            error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
            propTypes = newPropTypes; // Match production behavior more closely:

            Object.defineProperty(lazyType, 'propTypes', {
              enumerable: true
            });
          }
        }
      });
    }
    return lazyType;
  }

  function forwardRef(render) {
    {
      if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
        error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
      } else if (typeof render !== 'function') {
        error('forwardRef requires a render function but was given %s.', render === null ? 'null' : _typeof(render));
      } else {
        if (render.length !== 0 && render.length !== 2) {
          error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
        }
      }

      if (render != null) {
        if (render.defaultProps != null || render.propTypes != null) {
          error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
        }
      }
    }
    return {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render
    };
  }

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }

  function memo(type, compare) {
    {
      if (!isValidElementType(type)) {
        error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : _typeof(type));
      }
    }
    return {
      $$typeof: REACT_MEMO_TYPE,
      type: type,
      compare: compare === undefined ? null : compare
    };
  }

  function resolveDispatcher() {
    var dispatcher = ReactCurrentDispatcher.current;

    if (!(dispatcher !== null)) {
      {
        throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.");
      }
    }

    return dispatcher;
  }

  function useContext(Context, unstable_observedBits) {
    var dispatcher = resolveDispatcher();
    {
      if (unstable_observedBits !== undefined) {
        error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '');
      } // TODO: add a more generic warning for invalid values.


      if (Context._context !== undefined) {
        var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
        // and nobody should be using this in existing code.

        if (realContext.Consumer === Context) {
          error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
        } else if (realContext.Provider === Context) {
          error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
        }
      }
    }
    return dispatcher.useContext(Context, unstable_observedBits);
  }

  function useState(initialState) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
  }

  function useReducer(reducer, initialArg, init) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initialArg, init);
  }

  function useRef(initialValue) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useRef(initialValue);
  }

  function useEffect(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useEffect(create, deps);
  }

  function useLayoutEffect(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useLayoutEffect(create, deps);
  }

  function useCallback(callback, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useCallback(callback, deps);
  }

  function useMemo(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useMemo(create, deps);
  }

  function useImperativeHandle(ref, create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useImperativeHandle(ref, create, deps);
  }

  function useDebugValue(value, formatterFn) {
    {
      var dispatcher = resolveDispatcher();
      return dispatcher.useDebugValue(value, formatterFn);
    }
  }
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */


  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  var printWarning$1 = function printWarning$1() {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    printWarning$1 = function printWarning$1(text) {
      var message = 'Warning: ' + text;

      if (typeof console !== 'undefined') {
        console.error(message);
      }

      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }
  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */

  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error; // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.

          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof(typeSpecs[typeSpecName]) + '`.');
              err.name = 'Invariant Violation';
              throw err;
            }

            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error = ex;
          }

          if (error && !(error instanceof Error)) {
            printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
          }

          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : '';
            printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
          }
        }
      }
    }
  }
  /**
   * Resets warning cache when testing.
   *
   * @private
   */


  checkPropTypes.resetWarningCache = function () {
    {
      loggedTypeFailures = {};
    }
  };

  var checkPropTypes_1 = checkPropTypes;
  var propTypesMisspellWarningShown;
  {
    propTypesMisspellWarningShown = false;
  }

  function getDeclarationErrorAddendum() {
    if (ReactCurrentOwner.current) {
      var name = getComponentName(ReactCurrentOwner.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }

  function getSourceInfoErrorAddendum(source) {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }

  function getSourceInfoErrorAddendumForProps(elementProps) {
    if (elementProps !== null && elementProps !== undefined) {
      return getSourceInfoErrorAddendum(elementProps.__source);
    }

    return '';
  }
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */


  var ownerHasKeyUseWarning = {};

  function getCurrentComponentErrorInfo(parentType) {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
  /**
   * Warn if the element doesn't have an explicit key assigned to it.
   * This element is in an array. The array could grow and shrink or be
   * reordered. All children that haven't already been validated are required to
   * have a "key" property assigned to it. Error statuses are cached so a warning
   * will only be shown once.
   *
   * @internal
   * @param {ReactElement} element Element that requires a key.
   * @param {*} parentType element's parent's type.
   */


  function validateExplicitKey(element, parentType) {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement(element);
    {
      error('Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
    }
    setCurrentlyValidatingElement(null);
  }
  /**
   * Ensure that every element either is passed in a static location, in an
   * array with an explicit keys property defined, or in an object literal
   * with valid key property.
   *
   * @internal
   * @param {ReactNode} node Statically passed child of any type.
   * @param {*} parentType node's parent's type.
   */


  function validateChildKeys(node, parentType) {
    if (_typeof(node) !== 'object') {
      return;
    }

    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
  /**
   * Given an element, validate that its props follow the propTypes definition,
   * provided by the type.
   *
   * @param {ReactElement} element
   */


  function validatePropTypes(element) {
    {
      var type = element.type;

      if (type === null || type === undefined || typeof type === 'string') {
        return;
      }

      var name = getComponentName(type);
      var propTypes;

      if (typeof type === 'function') {
        propTypes = type.propTypes;
      } else if (_typeof(type) === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      type.$$typeof === REACT_MEMO_TYPE)) {
        propTypes = type.propTypes;
      } else {
        return;
      }

      if (propTypes) {
        setCurrentlyValidatingElement(element);
        checkPropTypes_1(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
        setCurrentlyValidatingElement(null);
      } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }

      if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
        error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }
  }
  /**
   * Given a fragment, validate that it can only be provided with fragment props
   * @param {ReactElement} fragment
   */


  function validateFragmentProps(fragment) {
    {
      setCurrentlyValidatingElement(fragment);
      var keys = Object.keys(fragment.props);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== 'children' && key !== 'key') {
          error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
          break;
        }
      }

      if (fragment.ref !== null) {
        error('Invalid attribute `ref` supplied to `React.Fragment`.');
      }

      setCurrentlyValidatingElement(null);
    }
  }

  function createElementWithValidation(type, props, children) {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || _typeof(type) === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendumForProps(props);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = _typeof(type);
      }

      {
        error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
      }
    }

    var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }

  var didWarnAboutDeprecatedCreateFactory = false;

  function createFactoryWithValidation(type) {
    var validatedFactory = createElementWithValidation.bind(null, type);
    validatedFactory.type = type;
    {
      if (!didWarnAboutDeprecatedCreateFactory) {
        didWarnAboutDeprecatedCreateFactory = true;
        warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
      } // Legacy hook: remove it


      Object.defineProperty(validatedFactory, 'type', {
        enumerable: false,
        get: function get() {
          warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
          Object.defineProperty(this, 'type', {
            value: type
          });
          return type;
        }
      });
    }
    return validatedFactory;
  }

  function cloneElementWithValidation(element, props, children) {
    var newElement = cloneElement.apply(this, arguments);

    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }

    validatePropTypes(newElement);
    return newElement;
  }

  var enableSchedulerDebugging = false;
  var enableProfiling = true;

  var _requestHostCallback;

  var requestHostTimeout;
  var cancelHostTimeout;
  var shouldYieldToHost;
  var requestPaint;
  var getCurrentTime;
  var forceFrameRate;

  if ( // If Scheduler runs in a non-DOM environment, it falls back to a naive
  // implementation using setTimeout.
  typeof window === 'undefined' || // Check if MessageChannel is supported, too.
  typeof MessageChannel !== 'function') {
    // If this accidentally gets imported in a non-browser environment, e.g. JavaScriptCore,
    // fallback to a naive implementation.
    var _callback = null;
    var _timeoutID = null;

    var _flushCallback = function _flushCallback() {
      if (_callback !== null) {
        try {
          var currentTime = getCurrentTime();
          var hasRemainingTime = true;

          _callback(hasRemainingTime, currentTime);

          _callback = null;
        } catch (e) {
          setTimeout(_flushCallback, 0);
          throw e;
        }
      }
    };

    var initialTime = Date.now();

    getCurrentTime = function getCurrentTime() {
      return Date.now() - initialTime;
    };

    _requestHostCallback = function requestHostCallback(cb) {
      if (_callback !== null) {
        // Protect against re-entrancy.
        setTimeout(_requestHostCallback, 0, cb);
      } else {
        _callback = cb;
        setTimeout(_flushCallback, 0);
      }
    };

    requestHostTimeout = function requestHostTimeout(cb, ms) {
      _timeoutID = setTimeout(cb, ms);
    };

    cancelHostTimeout = function cancelHostTimeout() {
      clearTimeout(_timeoutID);
    };

    shouldYieldToHost = function shouldYieldToHost() {
      return false;
    };

    requestPaint = forceFrameRate = function forceFrameRate() {};
  } else {
    // Capture local references to native APIs, in case a polyfill overrides them.
    var performance = window.performance;
    var _Date = window.Date;
    var _setTimeout = window.setTimeout;
    var _clearTimeout = window.clearTimeout;

    if (typeof console !== 'undefined') {
      // TODO: Scheduler no longer requires these methods to be polyfilled. But
      // maybe we want to continue warning if they don't exist, to preserve the
      // option to rely on it in the future?
      var requestAnimationFrame = window.requestAnimationFrame;
      var cancelAnimationFrame = window.cancelAnimationFrame; // TODO: Remove fb.me link

      if (typeof requestAnimationFrame !== 'function') {
        // Using console['error'] to evade Babel and ESLint
        console['error']("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
      }

      if (typeof cancelAnimationFrame !== 'function') {
        // Using console['error'] to evade Babel and ESLint
        console['error']("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
      }
    }

    if (_typeof(performance) === 'object' && typeof performance.now === 'function') {
      getCurrentTime = function getCurrentTime() {
        return performance.now();
      };
    } else {
      var _initialTime = _Date.now();

      getCurrentTime = function getCurrentTime() {
        return _Date.now() - _initialTime;
      };
    }

    var isMessageLoopRunning = false;
    var scheduledHostCallback = null;
    var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
    // thread, like user events. By default, it yields multiple times per frame.
    // It does not attempt to align with frame boundaries, since most tasks don't
    // need to be frame aligned; for those that do, use requestAnimationFrame.

    var yieldInterval = 5;
    var deadline = 0; // TODO: Make this configurable

    {
      // `isInputPending` is not available. Since we have no way of knowing if
      // there's pending input, always yield at the end of the frame.
      shouldYieldToHost = function shouldYieldToHost() {
        return getCurrentTime() >= deadline;
      }; // Since we yield every frame regardless, `requestPaint` has no effect.


      requestPaint = function requestPaint() {};
    }

    forceFrameRate = function forceFrameRate(fps) {
      if (fps < 0 || fps > 125) {
        // Using console['error'] to evade Babel and ESLint
        console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing framerates higher than 125 fps is not unsupported');
        return;
      }

      if (fps > 0) {
        yieldInterval = Math.floor(1000 / fps);
      } else {
        // reset the framerate
        yieldInterval = 5;
      }
    };

    var performWorkUntilDeadline = function performWorkUntilDeadline() {
      if (scheduledHostCallback !== null) {
        var currentTime = getCurrentTime(); // Yield after `yieldInterval` ms, regardless of where we are in the vsync
        // cycle. This means there's always time remaining at the beginning of
        // the message event.

        deadline = currentTime + yieldInterval;
        var hasTimeRemaining = true;

        try {
          var hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);

          if (!hasMoreWork) {
            isMessageLoopRunning = false;
            scheduledHostCallback = null;
          } else {
            // If there's more work, schedule the next message event at the end
            // of the preceding one.
            port.postMessage(null);
          }
        } catch (error) {
          // If a scheduler task throws, exit the current browser task so the
          // error can be observed.
          port.postMessage(null);
          throw error;
        }
      } else {
        isMessageLoopRunning = false;
      } // Yielding to the browser will give it a chance to paint, so we can

    };

    var channel = new MessageChannel();
    var port = channel.port2;
    channel.port1.onmessage = performWorkUntilDeadline;

    _requestHostCallback = function _requestHostCallback(callback) {
      scheduledHostCallback = callback;

      if (!isMessageLoopRunning) {
        isMessageLoopRunning = true;
        port.postMessage(null);
      }
    };

    requestHostTimeout = function requestHostTimeout(callback, ms) {
      taskTimeoutID = _setTimeout(function () {
        callback(getCurrentTime());
      }, ms);
    };

    cancelHostTimeout = function cancelHostTimeout() {
      _clearTimeout(taskTimeoutID);

      taskTimeoutID = -1;
    };
  }

  function push(heap, node) {
    var index = heap.length;
    heap.push(node);
    siftUp(heap, node, index);
  }

  function peek(heap) {
    var first = heap[0];
    return first === undefined ? null : first;
  }

  function pop(heap) {
    var first = heap[0];

    if (first !== undefined) {
      var last = heap.pop();

      if (last !== first) {
        heap[0] = last;
        siftDown(heap, last, 0);
      }

      return first;
    } else {
      return null;
    }
  }

  function siftUp(heap, node, i) {
    var index = i;

    while (true) {
      var parentIndex = index - 1 >>> 1;
      var parent = heap[parentIndex];

      if (parent !== undefined && compare(parent, node) > 0) {
        // The parent is larger. Swap positions.
        heap[parentIndex] = node;
        heap[index] = parent;
        index = parentIndex;
      } else {
        // The parent is smaller. Exit.
        return;
      }
    }
  }

  function siftDown(heap, node, i) {
    var index = i;
    var length = heap.length;

    while (index < length) {
      var leftIndex = (index + 1) * 2 - 1;
      var left = heap[leftIndex];
      var rightIndex = leftIndex + 1;
      var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.

      if (left !== undefined && compare(left, node) < 0) {
        if (right !== undefined && compare(right, left) < 0) {
          heap[index] = right;
          heap[rightIndex] = node;
          index = rightIndex;
        } else {
          heap[index] = left;
          heap[leftIndex] = node;
          index = leftIndex;
        }
      } else if (right !== undefined && compare(right, node) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        // Neither child is smaller. Exit.
        return;
      }
    }
  }

  function compare(a, b) {
    // Compare sort index first, then task id.
    var diff = a.sortIndex - b.sortIndex;
    return diff !== 0 ? diff : a.id - b.id;
  } // TODO: Use symbols?


  var NoPriority = 0;
  var ImmediatePriority = 1;
  var UserBlockingPriority = 2;
  var NormalPriority = 3;
  var LowPriority = 4;
  var IdlePriority = 5;
  var runIdCounter = 0;
  var mainThreadIdCounter = 0;
  var profilingStateSize = 4;
  var sharedProfilingBuffer = // $FlowFixMe Flow doesn't know about SharedArrayBuffer
  typeof SharedArrayBuffer === 'function' ? new SharedArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : // $FlowFixMe Flow doesn't know about ArrayBuffer
  typeof ArrayBuffer === 'function' ? new ArrayBuffer(profilingStateSize * Int32Array.BYTES_PER_ELEMENT) : null // Don't crash the init path on IE9
  ;
  var profilingState = sharedProfilingBuffer !== null ? new Int32Array(sharedProfilingBuffer) : []; // We can't read this but it helps save bytes for null checks

  var PRIORITY = 0;
  var CURRENT_TASK_ID = 1;
  var CURRENT_RUN_ID = 2;
  var QUEUE_SIZE = 3;
  {
    profilingState[PRIORITY] = NoPriority; // This is maintained with a counter, because the size of the priority queue
    // array might include canceled tasks.

    profilingState[QUEUE_SIZE] = 0;
    profilingState[CURRENT_TASK_ID] = 0;
  } // Bytes per element is 4

  var INITIAL_EVENT_LOG_SIZE = 131072;
  var MAX_EVENT_LOG_SIZE = 524288; // Equivalent to 2 megabytes

  var eventLogSize = 0;
  var eventLogBuffer = null;
  var eventLog = null;
  var eventLogIndex = 0;
  var TaskStartEvent = 1;
  var TaskCompleteEvent = 2;
  var TaskErrorEvent = 3;
  var TaskCancelEvent = 4;
  var TaskRunEvent = 5;
  var TaskYieldEvent = 6;
  var SchedulerSuspendEvent = 7;
  var SchedulerResumeEvent = 8;

  function logEvent(entries) {
    if (eventLog !== null) {
      var offset = eventLogIndex;
      eventLogIndex += entries.length;

      if (eventLogIndex + 1 > eventLogSize) {
        eventLogSize *= 2;

        if (eventLogSize > MAX_EVENT_LOG_SIZE) {
          // Using console['error'] to evade Babel and ESLint
          console['error']("Scheduler Profiling: Event log exceeded maximum size. Don't " + 'forget to call `stopLoggingProfilingEvents()`.');
          stopLoggingProfilingEvents();
          return;
        }

        var newEventLog = new Int32Array(eventLogSize * 4);
        newEventLog.set(eventLog);
        eventLogBuffer = newEventLog.buffer;
        eventLog = newEventLog;
      }

      eventLog.set(entries, offset);
    }
  }

  function startLoggingProfilingEvents() {
    eventLogSize = INITIAL_EVENT_LOG_SIZE;
    eventLogBuffer = new ArrayBuffer(eventLogSize * 4);
    eventLog = new Int32Array(eventLogBuffer);
    eventLogIndex = 0;
  }

  function stopLoggingProfilingEvents() {
    var buffer = eventLogBuffer;
    eventLogSize = 0;
    eventLogBuffer = null;
    eventLog = null;
    eventLogIndex = 0;
    return buffer;
  }

  function markTaskStart(task, ms) {
    {
      profilingState[QUEUE_SIZE]++;

      if (eventLog !== null) {
        // performance.now returns a float, representing milliseconds. When the
        // event is logged, it's coerced to an int. Convert to microseconds to
        // maintain extra degrees of precision.
        logEvent([TaskStartEvent, ms * 1000, task.id, task.priorityLevel]);
      }
    }
  }

  function markTaskCompleted(task, ms) {
    {
      profilingState[PRIORITY] = NoPriority;
      profilingState[CURRENT_TASK_ID] = 0;
      profilingState[QUEUE_SIZE]--;

      if (eventLog !== null) {
        logEvent([TaskCompleteEvent, ms * 1000, task.id]);
      }
    }
  }

  function markTaskCanceled(task, ms) {
    {
      profilingState[QUEUE_SIZE]--;

      if (eventLog !== null) {
        logEvent([TaskCancelEvent, ms * 1000, task.id]);
      }
    }
  }

  function markTaskErrored(task, ms) {
    {
      profilingState[PRIORITY] = NoPriority;
      profilingState[CURRENT_TASK_ID] = 0;
      profilingState[QUEUE_SIZE]--;

      if (eventLog !== null) {
        logEvent([TaskErrorEvent, ms * 1000, task.id]);
      }
    }
  }

  function markTaskRun(task, ms) {
    {
      runIdCounter++;
      profilingState[PRIORITY] = task.priorityLevel;
      profilingState[CURRENT_TASK_ID] = task.id;
      profilingState[CURRENT_RUN_ID] = runIdCounter;

      if (eventLog !== null) {
        logEvent([TaskRunEvent, ms * 1000, task.id, runIdCounter]);
      }
    }
  }

  function markTaskYield(task, ms) {
    {
      profilingState[PRIORITY] = NoPriority;
      profilingState[CURRENT_TASK_ID] = 0;
      profilingState[CURRENT_RUN_ID] = 0;

      if (eventLog !== null) {
        logEvent([TaskYieldEvent, ms * 1000, task.id, runIdCounter]);
      }
    }
  }

  function markSchedulerSuspended(ms) {
    {
      mainThreadIdCounter++;

      if (eventLog !== null) {
        logEvent([SchedulerSuspendEvent, ms * 1000, mainThreadIdCounter]);
      }
    }
  }

  function markSchedulerUnsuspended(ms) {
    {
      if (eventLog !== null) {
        logEvent([SchedulerResumeEvent, ms * 1000, mainThreadIdCounter]);
      }
    }
  }
  /* eslint-disable no-var */
  // Math.pow(2, 30) - 1
  // 0b111111111111111111111111111111


  var maxSigned31BitInt = 1073741823; // Times out immediately

  var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out

  var USER_BLOCKING_PRIORITY = 250;
  var NORMAL_PRIORITY_TIMEOUT = 5000;
  var LOW_PRIORITY_TIMEOUT = 10000; // Never times out

  var IDLE_PRIORITY = maxSigned31BitInt; // Tasks are stored on a min heap

  var taskQueue = [];
  var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.

  var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.

  var currentTask = null;
  var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrancy.

  var isPerformingWork = false;
  var isHostCallbackScheduled = false;
  var isHostTimeoutScheduled = false;

  function advanceTimers(currentTime) {
    // Check for tasks that are no longer delayed and add them to the queue.
    var timer = peek(timerQueue);

    while (timer !== null) {
      if (timer.callback === null) {
        // Timer was cancelled.
        pop(timerQueue);
      } else if (timer.startTime <= currentTime) {
        // Timer fired. Transfer to the task queue.
        pop(timerQueue);
        timer.sortIndex = timer.expirationTime;
        push(taskQueue, timer);
        {
          markTaskStart(timer, currentTime);
          timer.isQueued = true;
        }
      } else {
        // Remaining timers are pending.
        return;
      }

      timer = peek(timerQueue);
    }
  }

  function handleTimeout(currentTime) {
    isHostTimeoutScheduled = false;
    advanceTimers(currentTime);

    if (!isHostCallbackScheduled) {
      if (peek(taskQueue) !== null) {
        isHostCallbackScheduled = true;

        _requestHostCallback(flushWork);
      } else {
        var firstTimer = peek(timerQueue);

        if (firstTimer !== null) {
          requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
      }
    }
  }

  function flushWork(hasTimeRemaining, initialTime) {
    {
      markSchedulerUnsuspended(initialTime);
    } // We'll need a host callback the next time work is scheduled.

    isHostCallbackScheduled = false;

    if (isHostTimeoutScheduled) {
      // We scheduled a timeout but it's no longer needed. Cancel it.
      isHostTimeoutScheduled = false;
      cancelHostTimeout();
    }

    isPerformingWork = true;
    var previousPriorityLevel = currentPriorityLevel;

    try {
      if (enableProfiling) {
        try {
          return workLoop(hasTimeRemaining, initialTime);
        } catch (error) {
          if (currentTask !== null) {
            var currentTime = getCurrentTime();
            markTaskErrored(currentTask, currentTime);
            currentTask.isQueued = false;
          }

          throw error;
        }
      } else {
        // No catch in prod codepath.
        return workLoop(hasTimeRemaining, initialTime);
      }
    } finally {
      currentTask = null;
      currentPriorityLevel = previousPriorityLevel;
      isPerformingWork = false;
      {
        var _currentTime = getCurrentTime();

        markSchedulerSuspended(_currentTime);
      }
    }
  }

  function workLoop(hasTimeRemaining, initialTime) {
    var currentTime = initialTime;
    advanceTimers(currentTime);
    currentTask = peek(taskQueue);

    while (currentTask !== null && !enableSchedulerDebugging) {
      if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
        // This currentTask hasn't expired, and we've reached the deadline.
        break;
      }

      var callback = currentTask.callback;

      if (callback !== null) {
        currentTask.callback = null;
        currentPriorityLevel = currentTask.priorityLevel;
        var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
        markTaskRun(currentTask, currentTime);
        var continuationCallback = callback(didUserCallbackTimeout);
        currentTime = getCurrentTime();

        if (typeof continuationCallback === 'function') {
          currentTask.callback = continuationCallback;
          markTaskYield(currentTask, currentTime);
        } else {
          {
            markTaskCompleted(currentTask, currentTime);
            currentTask.isQueued = false;
          }

          if (currentTask === peek(taskQueue)) {
            pop(taskQueue);
          }
        }

        advanceTimers(currentTime);
      } else {
        pop(taskQueue);
      }

      currentTask = peek(taskQueue);
    } // Return whether there's additional work


    if (currentTask !== null) {
      return true;
    } else {
      var firstTimer = peek(timerQueue);

      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }

      return false;
    }
  }

  function unstable_runWithPriority(priorityLevel, eventHandler) {
    switch (priorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
      case LowPriority:
      case IdlePriority:
        break;

      default:
        priorityLevel = NormalPriority;
    }

    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;

    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }

  function unstable_next(eventHandler) {
    var priorityLevel;

    switch (currentPriorityLevel) {
      case ImmediatePriority:
      case UserBlockingPriority:
      case NormalPriority:
        // Shift down to normal priority
        priorityLevel = NormalPriority;
        break;

      default:
        // Anything lower than normal priority should remain at the current level.
        priorityLevel = currentPriorityLevel;
        break;
    }

    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;

    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  }

  function unstable_wrapCallback(callback) {
    var parentPriorityLevel = currentPriorityLevel;
    return function () {
      // This is a fork of runWithPriority, inlined for performance.
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = parentPriorityLevel;

      try {
        return callback.apply(this, arguments);
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
  }

  function timeoutForPriorityLevel(priorityLevel) {
    switch (priorityLevel) {
      case ImmediatePriority:
        return IMMEDIATE_PRIORITY_TIMEOUT;

      case UserBlockingPriority:
        return USER_BLOCKING_PRIORITY;

      case IdlePriority:
        return IDLE_PRIORITY;

      case LowPriority:
        return LOW_PRIORITY_TIMEOUT;

      case NormalPriority:
      default:
        return NORMAL_PRIORITY_TIMEOUT;
    }
  }

  function unstable_scheduleCallback(priorityLevel, callback, options) {
    var currentTime = getCurrentTime();
    var startTime;
    var timeout;

    if (_typeof(options) === 'object' && options !== null) {
      var delay = options.delay;

      if (typeof delay === 'number' && delay > 0) {
        startTime = currentTime + delay;
      } else {
        startTime = currentTime;
      }

      timeout = typeof options.timeout === 'number' ? options.timeout : timeoutForPriorityLevel(priorityLevel);
    } else {
      timeout = timeoutForPriorityLevel(priorityLevel);
      startTime = currentTime;
    }

    var expirationTime = startTime + timeout;
    var newTask = {
      id: taskIdCounter++,
      callback: callback,
      priorityLevel: priorityLevel,
      startTime: startTime,
      expirationTime: expirationTime,
      sortIndex: -1
    };
    {
      newTask.isQueued = false;
    }

    if (startTime > currentTime) {
      // This is a delayed task.
      newTask.sortIndex = startTime;
      push(timerQueue, newTask);

      if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
        // All tasks are delayed, and this is the task with the earliest delay.
        if (isHostTimeoutScheduled) {
          // Cancel an existing timeout.
          cancelHostTimeout();
        } else {
          isHostTimeoutScheduled = true;
        } // Schedule a timeout.


        requestHostTimeout(handleTimeout, startTime - currentTime);
      }
    } else {
      newTask.sortIndex = expirationTime;
      push(taskQueue, newTask);
      {
        markTaskStart(newTask, currentTime);
        newTask.isQueued = true;
      } // Schedule a host callback, if needed. If we're already performing work,
      // wait until the next time we yield.

      if (!isHostCallbackScheduled && !isPerformingWork) {
        isHostCallbackScheduled = true;

        _requestHostCallback(flushWork);
      }
    }

    return newTask;
  }

  function unstable_pauseExecution() {}

  function unstable_continueExecution() {
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;

      _requestHostCallback(flushWork);
    }
  }

  function unstable_getFirstCallbackNode() {
    return peek(taskQueue);
  }

  function unstable_cancelCallback(task) {
    {
      if (task.isQueued) {
        var currentTime = getCurrentTime();
        markTaskCanceled(task, currentTime);
        task.isQueued = false;
      }
    } // Null out the callback to indicate the task has been canceled. (Can't
    // remove from the queue because you can't remove arbitrary nodes from an
    // array based heap, only the first one.)

    task.callback = null;
  }

  function unstable_getCurrentPriorityLevel() {
    return currentPriorityLevel;
  }

  function unstable_shouldYield() {
    var currentTime = getCurrentTime();
    advanceTimers(currentTime);
    var firstTask = peek(taskQueue);
    return firstTask !== currentTask && currentTask !== null && firstTask !== null && firstTask.callback !== null && firstTask.startTime <= currentTime && firstTask.expirationTime < currentTask.expirationTime || shouldYieldToHost();
  }

  var unstable_requestPaint = requestPaint;
  var unstable_Profiling = {
    startLoggingProfilingEvents: startLoggingProfilingEvents,
    stopLoggingProfilingEvents: stopLoggingProfilingEvents,
    sharedProfilingBuffer: sharedProfilingBuffer
  };
  var Scheduler = /*#__PURE__*/Object.freeze({
    __proto__: null,
    unstable_ImmediatePriority: ImmediatePriority,
    unstable_UserBlockingPriority: UserBlockingPriority,
    unstable_NormalPriority: NormalPriority,
    unstable_IdlePriority: IdlePriority,
    unstable_LowPriority: LowPriority,
    unstable_runWithPriority: unstable_runWithPriority,
    unstable_next: unstable_next,
    unstable_scheduleCallback: unstable_scheduleCallback,
    unstable_cancelCallback: unstable_cancelCallback,
    unstable_wrapCallback: unstable_wrapCallback,
    unstable_getCurrentPriorityLevel: unstable_getCurrentPriorityLevel,
    unstable_shouldYield: unstable_shouldYield,
    unstable_requestPaint: unstable_requestPaint,
    unstable_continueExecution: unstable_continueExecution,
    unstable_pauseExecution: unstable_pauseExecution,
    unstable_getFirstCallbackNode: unstable_getFirstCallbackNode,

    get unstable_now() {
      return getCurrentTime;
    },

    get unstable_forceFrameRate() {
      return forceFrameRate;
    },

    unstable_Profiling: unstable_Profiling
  });
  var DEFAULT_THREAD_ID = 0; // Counters used to generate unique IDs.

  var interactionIDCounter = 0;
  var threadIDCounter = 0; // Set of currently traced interactions.
  // Interactions "stack"–
  // Meaning that newly traced interactions are appended to the previously active set.
  // When an interaction goes out of scope, the previous set (if any) is restored.

  var interactionsRef = null; // Listener(s) to notify when interactions begin and end.

  var subscriberRef = null;
  {
    interactionsRef = {
      current: new Set()
    };
    subscriberRef = {
      current: null
    };
  }

  function unstable_clear(callback) {
    var prevInteractions = interactionsRef.current;
    interactionsRef.current = new Set();

    try {
      return callback();
    } finally {
      interactionsRef.current = prevInteractions;
    }
  }

  function unstable_getCurrent() {
    {
      return interactionsRef.current;
    }
  }

  function unstable_getThreadID() {
    return ++threadIDCounter;
  }

  function unstable_trace(name, timestamp, callback) {
    var threadID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : DEFAULT_THREAD_ID;
    var interaction = {
      __count: 1,
      id: interactionIDCounter++,
      name: name,
      timestamp: timestamp
    };
    var prevInteractions = interactionsRef.current; // Traced interactions should stack/accumulate.
    // To do that, clone the current interactions.
    // The previous set will be restored upon completion.

    var interactions = new Set(prevInteractions);
    interactions.add(interaction);
    interactionsRef.current = interactions;
    var subscriber = subscriberRef.current;
    var returnValue;

    try {
      if (subscriber !== null) {
        subscriber.onInteractionTraced(interaction);
      }
    } finally {
      try {
        if (subscriber !== null) {
          subscriber.onWorkStarted(interactions, threadID);
        }
      } finally {
        try {
          returnValue = callback();
        } finally {
          interactionsRef.current = prevInteractions;

          try {
            if (subscriber !== null) {
              subscriber.onWorkStopped(interactions, threadID);
            }
          } finally {
            interaction.__count--; // If no async work was scheduled for this interaction,
            // Notify subscribers that it's completed.

            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          }
        }
      }
    }

    return returnValue;
  }

  function unstable_wrap(callback) {
    var threadID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_THREAD_ID;
    var wrappedInteractions = interactionsRef.current;
    var subscriber = subscriberRef.current;

    if (subscriber !== null) {
      subscriber.onWorkScheduled(wrappedInteractions, threadID);
    } // Update the pending async work count for the current interactions.
    // Update after calling subscribers in case of error.


    wrappedInteractions.forEach(function (interaction) {
      interaction.__count++;
    });
    var hasRun = false;

    function wrapped() {
      var prevInteractions = interactionsRef.current;
      interactionsRef.current = wrappedInteractions;
      subscriber = subscriberRef.current;

      try {
        var returnValue;

        try {
          if (subscriber !== null) {
            subscriber.onWorkStarted(wrappedInteractions, threadID);
          }
        } finally {
          try {
            returnValue = callback.apply(undefined, arguments);
          } finally {
            interactionsRef.current = prevInteractions;

            if (subscriber !== null) {
              subscriber.onWorkStopped(wrappedInteractions, threadID);
            }
          }
        }

        return returnValue;
      } finally {
        if (!hasRun) {
          // We only expect a wrapped function to be executed once,
          // But in the event that it's executed more than once–
          // Only decrement the outstanding interaction counts once.
          hasRun = true; // Update pending async counts for all wrapped interactions.
          // If this was the last scheduled async work for any of them,
          // Mark them as completed.

          wrappedInteractions.forEach(function (interaction) {
            interaction.__count--;

            if (subscriber !== null && interaction.__count === 0) {
              subscriber.onInteractionScheduledWorkCompleted(interaction);
            }
          });
        }
      }
    }

    wrapped.cancel = function cancel() {
      subscriber = subscriberRef.current;

      try {
        if (subscriber !== null) {
          subscriber.onWorkCanceled(wrappedInteractions, threadID);
        }
      } finally {
        // Update pending async counts for all wrapped interactions.
        // If this was the last scheduled async work for any of them,
        // Mark them as completed.
        wrappedInteractions.forEach(function (interaction) {
          interaction.__count--;

          if (subscriber && interaction.__count === 0) {
            subscriber.onInteractionScheduledWorkCompleted(interaction);
          }
        });
      }
    };

    return wrapped;
  }

  var subscribers = null;
  {
    subscribers = new Set();
  }

  function unstable_subscribe(subscriber) {
    {
      subscribers.add(subscriber);

      if (subscribers.size === 1) {
        subscriberRef.current = {
          onInteractionScheduledWorkCompleted: onInteractionScheduledWorkCompleted,
          onInteractionTraced: onInteractionTraced,
          onWorkCanceled: onWorkCanceled,
          onWorkScheduled: onWorkScheduled,
          onWorkStarted: onWorkStarted,
          onWorkStopped: onWorkStopped
        };
      }
    }
  }

  function unstable_unsubscribe(subscriber) {
    {
      subscribers["delete"](subscriber);

      if (subscribers.size === 0) {
        subscriberRef.current = null;
      }
    }
  }

  function onInteractionTraced(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onInteractionTraced(interaction);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onInteractionScheduledWorkCompleted(interaction) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onInteractionScheduledWorkCompleted(interaction);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkScheduled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkScheduled(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkStarted(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkStarted(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkStopped(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkStopped(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  function onWorkCanceled(interactions, threadID) {
    var didCatchError = false;
    var caughtError = null;
    subscribers.forEach(function (subscriber) {
      try {
        subscriber.onWorkCanceled(interactions, threadID);
      } catch (error) {
        if (!didCatchError) {
          didCatchError = true;
          caughtError = error;
        }
      }
    });

    if (didCatchError) {
      throw caughtError;
    }
  }

  var SchedulerTracing = /*#__PURE__*/Object.freeze({
    __proto__: null,

    get __interactionsRef() {
      return interactionsRef;
    },

    get __subscriberRef() {
      return subscriberRef;
    },

    unstable_clear: unstable_clear,
    unstable_getCurrent: unstable_getCurrent,
    unstable_getThreadID: unstable_getThreadID,
    unstable_trace: unstable_trace,
    unstable_wrap: unstable_wrap,
    unstable_subscribe: unstable_subscribe,
    unstable_unsubscribe: unstable_unsubscribe
  });
  var ReactSharedInternals$1 = {
    ReactCurrentDispatcher: ReactCurrentDispatcher,
    ReactCurrentOwner: ReactCurrentOwner,
    IsSomeRendererActing: IsSomeRendererActing,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: objectAssign
  };
  {
    objectAssign(ReactSharedInternals$1, {
      // These should not be included in production.
      ReactDebugCurrentFrame: ReactDebugCurrentFrame,
      // Shim for React DOM 16.0.0 which still destructured (but not used) this.
      // TODO: remove in React 17.0.
      ReactComponentTreeHook: {}
    });
  } // Re-export the schedule API(s) for UMD bundles.
  // This avoids introducing a dependency on a new UMD global in a minor update,
  // Since that would be a breaking change (e.g. for all existing CodeSandboxes).
  // This re-export is only required for UMD bundles;
  // CJS bundles use the shared NPM package.

  objectAssign(ReactSharedInternals$1, {
    Scheduler: Scheduler,
    SchedulerTracing: SchedulerTracing
  });
  {
    try {
      var frozenObject = Object.freeze({});
      var testMap = new Map([[frozenObject, null]]);
      var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.
      // https://github.com/rollup/rollup/issues/1771
      // TODO: we can remove these if Rollup fixes the bug.

      testMap.set(0, 0);
      testSet.add(0);
    } catch (e) {}
  }
  var createElement$1 = createElementWithValidation;
  var cloneElement$1 = cloneElementWithValidation;
  var createFactory = createFactoryWithValidation;
  var Children = {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  };
  exports.Children = Children;
  exports.Component = Component;
  exports.Fragment = REACT_FRAGMENT_TYPE;
  exports.Profiler = REACT_PROFILER_TYPE;
  exports.PureComponent = PureComponent;
  exports.StrictMode = REACT_STRICT_MODE_TYPE;
  exports.Suspense = REACT_SUSPENSE_TYPE;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals$1;
  exports.cloneElement = cloneElement$1;
  exports.createContext = createContext;
  exports.createElement = createElement$1;
  exports.createFactory = createFactory;
  exports.createRef = createRef;
  exports.forwardRef = forwardRef;
  exports.isValidElement = isValidElement;
  exports.lazy = lazy;
  exports.memo = memo;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useDebugValue = useDebugValue;
  exports.useEffect = useEffect;
  exports.useImperativeHandle = useImperativeHandle;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useState = useState;
  exports.version = ReactVersion;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9wdWJsaWMvcmVhY3QuZGV2ZWxvcG1lbnQuanMiXSwibmFtZXMiOlsiZ2xvYmFsIiwiZmFjdG9yeSIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJzZWxmIiwiUmVhY3QiLCJSZWFjdFZlcnNpb24iLCJoYXNTeW1ib2wiLCJTeW1ib2wiLCJSRUFDVF9FTEVNRU5UX1RZUEUiLCJSRUFDVF9QT1JUQUxfVFlQRSIsIlJFQUNUX0ZSQUdNRU5UX1RZUEUiLCJSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIiwiUkVBQ1RfUFJPRklMRVJfVFlQRSIsIlJFQUNUX1BST1ZJREVSX1RZUEUiLCJSRUFDVF9DT05URVhUX1RZUEUiLCJSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSIsIlJFQUNUX0ZPUldBUkRfUkVGX1RZUEUiLCJSRUFDVF9TVVNQRU5TRV9UWVBFIiwiUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIiwiUkVBQ1RfTUVNT19UWVBFIiwiUkVBQ1RfTEFaWV9UWVBFIiwiUkVBQ1RfQkxPQ0tfVFlQRSIsIlJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUiLCJSRUFDVF9SRVNQT05ERVJfVFlQRSIsIlJFQUNUX1NDT1BFX1RZUEUiLCJNQVlCRV9JVEVSQVRPUl9TWU1CT0wiLCJpdGVyYXRvciIsIkZBVVhfSVRFUkFUT1JfU1lNQk9MIiwiZ2V0SXRlcmF0b3JGbiIsIm1heWJlSXRlcmFibGUiLCJtYXliZUl0ZXJhdG9yIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJwcm90b3R5cGUiLCJwcm9wSXNFbnVtZXJhYmxlIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJ0b09iamVjdCIsInZhbCIsInVuZGVmaW5lZCIsIlR5cGVFcnJvciIsInNob3VsZFVzZU5hdGl2ZSIsImFzc2lnbiIsInRlc3QxIiwiU3RyaW5nIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInRlc3QyIiwiaSIsImZyb21DaGFyQ29kZSIsIm9yZGVyMiIsIm1hcCIsIm4iLCJqb2luIiwidGVzdDMiLCJzcGxpdCIsImZvckVhY2giLCJsZXR0ZXIiLCJrZXlzIiwiZXJyIiwib2JqZWN0QXNzaWduIiwidGFyZ2V0Iiwic291cmNlIiwiZnJvbSIsInRvIiwic3ltYm9scyIsInMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJrZXkiLCJjYWxsIiwiUmVhY3RDdXJyZW50RGlzcGF0Y2hlciIsImN1cnJlbnQiLCJSZWFjdEN1cnJlbnRCYXRjaENvbmZpZyIsInN1c3BlbnNlIiwiUmVhY3RDdXJyZW50T3duZXIiLCJCRUZPUkVfU0xBU0hfUkUiLCJkZXNjcmliZUNvbXBvbmVudEZyYW1lIiwibmFtZSIsIm93bmVyTmFtZSIsInNvdXJjZUluZm8iLCJwYXRoIiwiZmlsZU5hbWUiLCJyZXBsYWNlIiwidGVzdCIsIm1hdGNoIiwicGF0aEJlZm9yZVNsYXNoIiwiZm9sZGVyTmFtZSIsImxpbmVOdW1iZXIiLCJSZXNvbHZlZCIsInJlZmluZVJlc29sdmVkTGF6eUNvbXBvbmVudCIsImxhenlDb21wb25lbnQiLCJfc3RhdHVzIiwiX3Jlc3VsdCIsImdldFdyYXBwZWROYW1lIiwib3V0ZXJUeXBlIiwiaW5uZXJUeXBlIiwid3JhcHBlck5hbWUiLCJmdW5jdGlvbk5hbWUiLCJkaXNwbGF5TmFtZSIsImdldENvbXBvbmVudE5hbWUiLCJ0eXBlIiwidGFnIiwiZXJyb3IiLCIkJHR5cGVvZiIsInJlbmRlciIsInRoZW5hYmxlIiwicmVzb2x2ZWRUaGVuYWJsZSIsIlJlYWN0RGVidWdDdXJyZW50RnJhbWUiLCJjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCIsInNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50IiwiZWxlbWVudCIsImdldEN1cnJlbnRTdGFjayIsImdldFN0YWNrQWRkZW5kdW0iLCJzdGFjayIsIm93bmVyIiwiX293bmVyIiwiX3NvdXJjZSIsImltcGwiLCJJc1NvbWVSZW5kZXJlckFjdGluZyIsIlJlYWN0U2hhcmVkSW50ZXJuYWxzIiwiUmVhY3RDb21wb25lbnRUcmVlSG9vayIsIndhcm4iLCJmb3JtYXQiLCJfbGVuIiwiYXJncyIsIkFycmF5IiwiX2tleSIsInByaW50V2FybmluZyIsIl9sZW4yIiwiX2tleTIiLCJsZXZlbCIsImhhc0V4aXN0aW5nU3RhY2siLCJpbmRleE9mIiwiY29uY2F0IiwiYXJnc1dpdGhGb3JtYXQiLCJpdGVtIiwidW5zaGlmdCIsIkZ1bmN0aW9uIiwiYXBwbHkiLCJjb25zb2xlIiwiYXJnSW5kZXgiLCJtZXNzYWdlIiwiRXJyb3IiLCJ4IiwiZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50Iiwid2Fybk5vb3AiLCJwdWJsaWNJbnN0YW5jZSIsImNhbGxlck5hbWUiLCJfY29uc3RydWN0b3IiLCJjb25zdHJ1Y3RvciIsImNvbXBvbmVudE5hbWUiLCJ3YXJuaW5nS2V5IiwiUmVhY3ROb29wVXBkYXRlUXVldWUiLCJpc01vdW50ZWQiLCJlbnF1ZXVlRm9yY2VVcGRhdGUiLCJjYWxsYmFjayIsImVucXVldWVSZXBsYWNlU3RhdGUiLCJjb21wbGV0ZVN0YXRlIiwiZW5xdWV1ZVNldFN0YXRlIiwicGFydGlhbFN0YXRlIiwiZW1wdHlPYmplY3QiLCJmcmVlemUiLCJDb21wb25lbnQiLCJwcm9wcyIsImNvbnRleHQiLCJ1cGRhdGVyIiwicmVmcyIsImlzUmVhY3RDb21wb25lbnQiLCJzZXRTdGF0ZSIsImZvcmNlVXBkYXRlIiwiZGVwcmVjYXRlZEFQSXMiLCJyZXBsYWNlU3RhdGUiLCJkZWZpbmVEZXByZWNhdGlvbldhcm5pbmciLCJtZXRob2ROYW1lIiwiaW5mbyIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZm5OYW1lIiwiQ29tcG9uZW50RHVtbXkiLCJQdXJlQ29tcG9uZW50IiwicHVyZUNvbXBvbmVudFByb3RvdHlwZSIsImlzUHVyZVJlYWN0Q29tcG9uZW50IiwiY3JlYXRlUmVmIiwicmVmT2JqZWN0Iiwic2VhbCIsImhhc093blByb3BlcnR5JDEiLCJSRVNFUlZFRF9QUk9QUyIsInJlZiIsIl9fc2VsZiIsIl9fc291cmNlIiwic3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24iLCJzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biIsImRpZFdhcm5BYm91dFN0cmluZ1JlZnMiLCJoYXNWYWxpZFJlZiIsImNvbmZpZyIsImdldHRlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzUmVhY3RXYXJuaW5nIiwiaGFzVmFsaWRLZXkiLCJkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlciIsIndhcm5BYm91dEFjY2Vzc2luZ0tleSIsImNvbmZpZ3VyYWJsZSIsImRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyIiwid2FybkFib3V0QWNjZXNzaW5nUmVmIiwid2FybklmU3RyaW5nUmVmQ2Fubm90QmVBdXRvQ29udmVydGVkIiwic3RhdGVOb2RlIiwiUmVhY3RFbGVtZW50IiwiX3N0b3JlIiwiZW51bWVyYWJsZSIsIndyaXRhYmxlIiwidmFsdWUiLCJjcmVhdGVFbGVtZW50IiwiY2hpbGRyZW4iLCJwcm9wTmFtZSIsImNoaWxkcmVuTGVuZ3RoIiwiY2hpbGRBcnJheSIsImRlZmF1bHRQcm9wcyIsImNsb25lQW5kUmVwbGFjZUtleSIsIm9sZEVsZW1lbnQiLCJuZXdLZXkiLCJuZXdFbGVtZW50IiwiX3NlbGYiLCJjbG9uZUVsZW1lbnQiLCJpc1ZhbGlkRWxlbWVudCIsIm9iamVjdCIsIlNFUEFSQVRPUiIsIlNVQlNFUEFSQVRPUiIsImVzY2FwZSIsImVzY2FwZVJlZ2V4IiwiZXNjYXBlckxvb2t1cCIsImVzY2FwZWRTdHJpbmciLCJkaWRXYXJuQWJvdXRNYXBzIiwidXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgiLCJlc2NhcGVVc2VyUHJvdmlkZWRLZXkiLCJ0ZXh0IiwiUE9PTF9TSVpFIiwidHJhdmVyc2VDb250ZXh0UG9vbCIsImdldFBvb2xlZFRyYXZlcnNlQ29udGV4dCIsIm1hcFJlc3VsdCIsImtleVByZWZpeCIsIm1hcEZ1bmN0aW9uIiwibWFwQ29udGV4dCIsInRyYXZlcnNlQ29udGV4dCIsInBvcCIsInJlc3VsdCIsImZ1bmMiLCJjb3VudCIsInJlbGVhc2VUcmF2ZXJzZUNvbnRleHQiLCJwdXNoIiwidHJhdmVyc2VBbGxDaGlsZHJlbkltcGwiLCJuYW1lU29GYXIiLCJpbnZva2VDYWxsYmFjayIsImdldENvbXBvbmVudEtleSIsImNoaWxkIiwibmV4dE5hbWUiLCJzdWJ0cmVlQ291bnQiLCJuZXh0TmFtZVByZWZpeCIsImlzQXJyYXkiLCJpdGVyYXRvckZuIiwiZW50cmllcyIsInN0ZXAiLCJpaSIsIm5leHQiLCJkb25lIiwiYWRkZW5kdW0iLCJjaGlsZHJlblN0cmluZyIsInRyYXZlcnNlQWxsQ2hpbGRyZW4iLCJjb21wb25lbnQiLCJpbmRleCIsInRvU3RyaW5nIiwiZm9yRWFjaFNpbmdsZUNoaWxkIiwiYm9va0tlZXBpbmciLCJmb3JFYWNoQ2hpbGRyZW4iLCJmb3JFYWNoRnVuYyIsImZvckVhY2hDb250ZXh0IiwibWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dCIsImNoaWxkS2V5IiwibWFwcGVkQ2hpbGQiLCJtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsIiwiYyIsImFycmF5IiwicHJlZml4IiwiZXNjYXBlZFByZWZpeCIsIm1hcENoaWxkcmVuIiwiY291bnRDaGlsZHJlbiIsInRvQXJyYXkiLCJvbmx5Q2hpbGQiLCJjcmVhdGVDb250ZXh0IiwiZGVmYXVsdFZhbHVlIiwiY2FsY3VsYXRlQ2hhbmdlZEJpdHMiLCJfY2FsY3VsYXRlQ2hhbmdlZEJpdHMiLCJfY3VycmVudFZhbHVlIiwiX2N1cnJlbnRWYWx1ZTIiLCJfdGhyZWFkQ291bnQiLCJQcm92aWRlciIsIkNvbnN1bWVyIiwiX2NvbnRleHQiLCJoYXNXYXJuZWRBYm91dFVzaW5nTmVzdGVkQ29udGV4dENvbnN1bWVycyIsImhhc1dhcm5lZEFib3V0VXNpbmdDb25zdW1lclByb3ZpZGVyIiwiZGVmaW5lUHJvcGVydGllcyIsInNldCIsIl9Qcm92aWRlciIsIl9jdXJyZW50UmVuZGVyZXIiLCJfY3VycmVudFJlbmRlcmVyMiIsImxhenkiLCJjdG9yIiwibGF6eVR5cGUiLCJfY3RvciIsInByb3BUeXBlcyIsIm5ld0RlZmF1bHRQcm9wcyIsIm5ld1Byb3BUeXBlcyIsImZvcndhcmRSZWYiLCJpc1ZhbGlkRWxlbWVudFR5cGUiLCJtZW1vIiwiY29tcGFyZSIsInJlc29sdmVEaXNwYXRjaGVyIiwiZGlzcGF0Y2hlciIsInVzZUNvbnRleHQiLCJDb250ZXh0IiwidW5zdGFibGVfb2JzZXJ2ZWRCaXRzIiwicmVhbENvbnRleHQiLCJ1c2VTdGF0ZSIsImluaXRpYWxTdGF0ZSIsInVzZVJlZHVjZXIiLCJyZWR1Y2VyIiwiaW5pdGlhbEFyZyIsImluaXQiLCJ1c2VSZWYiLCJpbml0aWFsVmFsdWUiLCJ1c2VFZmZlY3QiLCJjcmVhdGUiLCJkZXBzIiwidXNlTGF5b3V0RWZmZWN0IiwidXNlQ2FsbGJhY2siLCJ1c2VNZW1vIiwidXNlSW1wZXJhdGl2ZUhhbmRsZSIsInVzZURlYnVnVmFsdWUiLCJmb3JtYXR0ZXJGbiIsIlJlYWN0UHJvcFR5cGVzU2VjcmV0IiwiUmVhY3RQcm9wVHlwZXNTZWNyZXRfMSIsInByaW50V2FybmluZyQxIiwiUmVhY3RQcm9wVHlwZXNTZWNyZXQkMSIsImxvZ2dlZFR5cGVGYWlsdXJlcyIsImhhcyIsImJpbmQiLCJjaGVja1Byb3BUeXBlcyIsInR5cGVTcGVjcyIsInZhbHVlcyIsImxvY2F0aW9uIiwiZ2V0U3RhY2siLCJ0eXBlU3BlY05hbWUiLCJleCIsInJlc2V0V2FybmluZ0NhY2hlIiwiY2hlY2tQcm9wVHlwZXNfMSIsInByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duIiwiZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtIiwiZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0iLCJnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bUZvclByb3BzIiwiZWxlbWVudFByb3BzIiwib3duZXJIYXNLZXlVc2VXYXJuaW5nIiwiZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyIsInBhcmVudFR5cGUiLCJwYXJlbnROYW1lIiwidmFsaWRhdGVFeHBsaWNpdEtleSIsInZhbGlkYXRlZCIsImN1cnJlbnRDb21wb25lbnRFcnJvckluZm8iLCJjaGlsZE93bmVyIiwidmFsaWRhdGVDaGlsZEtleXMiLCJub2RlIiwidmFsaWRhdGVQcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJnZXREZWZhdWx0UHJvcHMiLCJpc1JlYWN0Q2xhc3NBcHByb3ZlZCIsInZhbGlkYXRlRnJhZ21lbnRQcm9wcyIsImZyYWdtZW50IiwiY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uIiwidmFsaWRUeXBlIiwidHlwZVN0cmluZyIsImRpZFdhcm5BYm91dERlcHJlY2F0ZWRDcmVhdGVGYWN0b3J5IiwiY3JlYXRlRmFjdG9yeVdpdGhWYWxpZGF0aW9uIiwidmFsaWRhdGVkRmFjdG9yeSIsImNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uIiwiZW5hYmxlU2NoZWR1bGVyRGVidWdnaW5nIiwiZW5hYmxlUHJvZmlsaW5nIiwicmVxdWVzdEhvc3RDYWxsYmFjayIsInJlcXVlc3RIb3N0VGltZW91dCIsImNhbmNlbEhvc3RUaW1lb3V0Iiwic2hvdWxkWWllbGRUb0hvc3QiLCJyZXF1ZXN0UGFpbnQiLCJnZXRDdXJyZW50VGltZSIsImZvcmNlRnJhbWVSYXRlIiwid2luZG93IiwiTWVzc2FnZUNoYW5uZWwiLCJfY2FsbGJhY2siLCJfdGltZW91dElEIiwiX2ZsdXNoQ2FsbGJhY2siLCJjdXJyZW50VGltZSIsImhhc1JlbWFpbmluZ1RpbWUiLCJlIiwic2V0VGltZW91dCIsImluaXRpYWxUaW1lIiwiRGF0ZSIsIm5vdyIsImNiIiwibXMiLCJjbGVhclRpbWVvdXQiLCJwZXJmb3JtYW5jZSIsIl9EYXRlIiwiX3NldFRpbWVvdXQiLCJfY2xlYXJUaW1lb3V0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJfaW5pdGlhbFRpbWUiLCJpc01lc3NhZ2VMb29wUnVubmluZyIsInNjaGVkdWxlZEhvc3RDYWxsYmFjayIsInRhc2tUaW1lb3V0SUQiLCJ5aWVsZEludGVydmFsIiwiZGVhZGxpbmUiLCJmcHMiLCJNYXRoIiwiZmxvb3IiLCJwZXJmb3JtV29ya1VudGlsRGVhZGxpbmUiLCJoYXNUaW1lUmVtYWluaW5nIiwiaGFzTW9yZVdvcmsiLCJwb3J0IiwicG9zdE1lc3NhZ2UiLCJjaGFubmVsIiwicG9ydDIiLCJwb3J0MSIsIm9ubWVzc2FnZSIsImhlYXAiLCJzaWZ0VXAiLCJwZWVrIiwiZmlyc3QiLCJsYXN0Iiwic2lmdERvd24iLCJwYXJlbnRJbmRleCIsInBhcmVudCIsImxlZnRJbmRleCIsImxlZnQiLCJyaWdodEluZGV4IiwicmlnaHQiLCJhIiwiYiIsImRpZmYiLCJzb3J0SW5kZXgiLCJpZCIsIk5vUHJpb3JpdHkiLCJJbW1lZGlhdGVQcmlvcml0eSIsIlVzZXJCbG9ja2luZ1ByaW9yaXR5IiwiTm9ybWFsUHJpb3JpdHkiLCJMb3dQcmlvcml0eSIsIklkbGVQcmlvcml0eSIsInJ1bklkQ291bnRlciIsIm1haW5UaHJlYWRJZENvdW50ZXIiLCJwcm9maWxpbmdTdGF0ZVNpemUiLCJzaGFyZWRQcm9maWxpbmdCdWZmZXIiLCJTaGFyZWRBcnJheUJ1ZmZlciIsIkludDMyQXJyYXkiLCJCWVRFU19QRVJfRUxFTUVOVCIsIkFycmF5QnVmZmVyIiwicHJvZmlsaW5nU3RhdGUiLCJQUklPUklUWSIsIkNVUlJFTlRfVEFTS19JRCIsIkNVUlJFTlRfUlVOX0lEIiwiUVVFVUVfU0laRSIsIklOSVRJQUxfRVZFTlRfTE9HX1NJWkUiLCJNQVhfRVZFTlRfTE9HX1NJWkUiLCJldmVudExvZ1NpemUiLCJldmVudExvZ0J1ZmZlciIsImV2ZW50TG9nIiwiZXZlbnRMb2dJbmRleCIsIlRhc2tTdGFydEV2ZW50IiwiVGFza0NvbXBsZXRlRXZlbnQiLCJUYXNrRXJyb3JFdmVudCIsIlRhc2tDYW5jZWxFdmVudCIsIlRhc2tSdW5FdmVudCIsIlRhc2tZaWVsZEV2ZW50IiwiU2NoZWR1bGVyU3VzcGVuZEV2ZW50IiwiU2NoZWR1bGVyUmVzdW1lRXZlbnQiLCJsb2dFdmVudCIsIm9mZnNldCIsInN0b3BMb2dnaW5nUHJvZmlsaW5nRXZlbnRzIiwibmV3RXZlbnRMb2ciLCJidWZmZXIiLCJzdGFydExvZ2dpbmdQcm9maWxpbmdFdmVudHMiLCJtYXJrVGFza1N0YXJ0IiwidGFzayIsInByaW9yaXR5TGV2ZWwiLCJtYXJrVGFza0NvbXBsZXRlZCIsIm1hcmtUYXNrQ2FuY2VsZWQiLCJtYXJrVGFza0Vycm9yZWQiLCJtYXJrVGFza1J1biIsIm1hcmtUYXNrWWllbGQiLCJtYXJrU2NoZWR1bGVyU3VzcGVuZGVkIiwibWFya1NjaGVkdWxlclVuc3VzcGVuZGVkIiwibWF4U2lnbmVkMzFCaXRJbnQiLCJJTU1FRElBVEVfUFJJT1JJVFlfVElNRU9VVCIsIlVTRVJfQkxPQ0tJTkdfUFJJT1JJVFkiLCJOT1JNQUxfUFJJT1JJVFlfVElNRU9VVCIsIkxPV19QUklPUklUWV9USU1FT1VUIiwiSURMRV9QUklPUklUWSIsInRhc2tRdWV1ZSIsInRpbWVyUXVldWUiLCJ0YXNrSWRDb3VudGVyIiwiY3VycmVudFRhc2siLCJjdXJyZW50UHJpb3JpdHlMZXZlbCIsImlzUGVyZm9ybWluZ1dvcmsiLCJpc0hvc3RDYWxsYmFja1NjaGVkdWxlZCIsImlzSG9zdFRpbWVvdXRTY2hlZHVsZWQiLCJhZHZhbmNlVGltZXJzIiwidGltZXIiLCJzdGFydFRpbWUiLCJleHBpcmF0aW9uVGltZSIsImlzUXVldWVkIiwiaGFuZGxlVGltZW91dCIsImZsdXNoV29yayIsImZpcnN0VGltZXIiLCJwcmV2aW91c1ByaW9yaXR5TGV2ZWwiLCJ3b3JrTG9vcCIsIl9jdXJyZW50VGltZSIsImRpZFVzZXJDYWxsYmFja1RpbWVvdXQiLCJjb250aW51YXRpb25DYWxsYmFjayIsInVuc3RhYmxlX3J1bldpdGhQcmlvcml0eSIsImV2ZW50SGFuZGxlciIsInVuc3RhYmxlX25leHQiLCJ1bnN0YWJsZV93cmFwQ2FsbGJhY2siLCJwYXJlbnRQcmlvcml0eUxldmVsIiwidGltZW91dEZvclByaW9yaXR5TGV2ZWwiLCJ1bnN0YWJsZV9zY2hlZHVsZUNhbGxiYWNrIiwib3B0aW9ucyIsInRpbWVvdXQiLCJkZWxheSIsIm5ld1Rhc2siLCJ1bnN0YWJsZV9wYXVzZUV4ZWN1dGlvbiIsInVuc3RhYmxlX2NvbnRpbnVlRXhlY3V0aW9uIiwidW5zdGFibGVfZ2V0Rmlyc3RDYWxsYmFja05vZGUiLCJ1bnN0YWJsZV9jYW5jZWxDYWxsYmFjayIsInVuc3RhYmxlX2dldEN1cnJlbnRQcmlvcml0eUxldmVsIiwidW5zdGFibGVfc2hvdWxkWWllbGQiLCJmaXJzdFRhc2siLCJ1bnN0YWJsZV9yZXF1ZXN0UGFpbnQiLCJ1bnN0YWJsZV9Qcm9maWxpbmciLCJTY2hlZHVsZXIiLCJfX3Byb3RvX18iLCJ1bnN0YWJsZV9JbW1lZGlhdGVQcmlvcml0eSIsInVuc3RhYmxlX1VzZXJCbG9ja2luZ1ByaW9yaXR5IiwidW5zdGFibGVfTm9ybWFsUHJpb3JpdHkiLCJ1bnN0YWJsZV9JZGxlUHJpb3JpdHkiLCJ1bnN0YWJsZV9Mb3dQcmlvcml0eSIsInVuc3RhYmxlX25vdyIsInVuc3RhYmxlX2ZvcmNlRnJhbWVSYXRlIiwiREVGQVVMVF9USFJFQURfSUQiLCJpbnRlcmFjdGlvbklEQ291bnRlciIsInRocmVhZElEQ291bnRlciIsImludGVyYWN0aW9uc1JlZiIsInN1YnNjcmliZXJSZWYiLCJTZXQiLCJ1bnN0YWJsZV9jbGVhciIsInByZXZJbnRlcmFjdGlvbnMiLCJ1bnN0YWJsZV9nZXRDdXJyZW50IiwidW5zdGFibGVfZ2V0VGhyZWFkSUQiLCJ1bnN0YWJsZV90cmFjZSIsInRpbWVzdGFtcCIsInRocmVhZElEIiwiaW50ZXJhY3Rpb24iLCJfX2NvdW50IiwiaW50ZXJhY3Rpb25zIiwiYWRkIiwic3Vic2NyaWJlciIsInJldHVyblZhbHVlIiwib25JbnRlcmFjdGlvblRyYWNlZCIsIm9uV29ya1N0YXJ0ZWQiLCJvbldvcmtTdG9wcGVkIiwib25JbnRlcmFjdGlvblNjaGVkdWxlZFdvcmtDb21wbGV0ZWQiLCJ1bnN0YWJsZV93cmFwIiwid3JhcHBlZEludGVyYWN0aW9ucyIsIm9uV29ya1NjaGVkdWxlZCIsImhhc1J1biIsIndyYXBwZWQiLCJjYW5jZWwiLCJvbldvcmtDYW5jZWxlZCIsInN1YnNjcmliZXJzIiwidW5zdGFibGVfc3Vic2NyaWJlIiwic2l6ZSIsInVuc3RhYmxlX3Vuc3Vic2NyaWJlIiwiZGlkQ2F0Y2hFcnJvciIsImNhdWdodEVycm9yIiwiU2NoZWR1bGVyVHJhY2luZyIsIl9faW50ZXJhY3Rpb25zUmVmIiwiX19zdWJzY3JpYmVyUmVmIiwiUmVhY3RTaGFyZWRJbnRlcm5hbHMkMSIsImZyb3plbk9iamVjdCIsInRlc3RNYXAiLCJNYXAiLCJ0ZXN0U2V0IiwiY3JlYXRlRWxlbWVudCQxIiwiY2xvbmVFbGVtZW50JDEiLCJjcmVhdGVGYWN0b3J5IiwiQ2hpbGRyZW4iLCJvbmx5IiwiRnJhZ21lbnQiLCJQcm9maWxlciIsIlN0cmljdE1vZGUiLCJTdXNwZW5zZSIsIl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEIiwidmVyc2lvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBU0E7Ozs7QUFFQyxXQUFVQSxNQUFWLEVBQWtCQyxPQUFsQixFQUEyQjtBQUMxQixVQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9BQW1CLFFBQW5CLElBQStCLE9BQU9DLE1BQVAsS0FBa0IsV0FBakQsR0FBK0RGLE9BQU8sQ0FBQ0MsT0FBRCxDQUF0RSxHQUNBLE9BQU9FLE1BQVAsS0FBa0IsVUFBbEIsSUFBZ0NBLE1BQU0sQ0FBQ0MsR0FBdkMsR0FBNkNELE1BQU0sQ0FBQyxDQUFDLFNBQUQsQ0FBRCxFQUFjSCxPQUFkLENBQW5ELElBQ0NELE1BQU0sR0FBR0EsTUFBTSxJQUFJTSxJQUFuQixFQUF5QkwsT0FBTyxDQUFDRCxNQUFNLENBQUNPLEtBQVAsR0FBZSxFQUFoQixDQURqQyxDQURBO0FBR0QsQ0FKQSxVQUlRLFVBQVVMLE9BQVYsRUFBbUI7QUFBRTs7QUFFNUIsTUFBSU0sWUFBWSxHQUFHLFNBQW5C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QUF4QjtBQUNBdmxCLEVBQUFBLE9BQU8sQ0FBQ3VMLFNBQVIsR0FBb0JBLFNBQXBCO0FBQ0F2TCxFQUFBQSxPQUFPLENBQUN3VCxVQUFSLEdBQXFCQSxVQUFyQjtBQUNBeFQsRUFBQUEsT0FBTyxDQUFDZ08sY0FBUixHQUF5QkEsY0FBekI7QUFDQWhPLEVBQUFBLE9BQU8sQ0FBQ2lULElBQVIsR0FBZUEsSUFBZjtBQUNBalQsRUFBQUEsT0FBTyxDQUFDMFQsSUFBUixHQUFlQSxJQUFmO0FBQ0ExVCxFQUFBQSxPQUFPLENBQUM4VSxXQUFSLEdBQXNCQSxXQUF0QjtBQUNBOVUsRUFBQUEsT0FBTyxDQUFDOFQsVUFBUixHQUFxQkEsVUFBckI7QUFDQTlULEVBQUFBLE9BQU8sQ0FBQ2lWLGFBQVIsR0FBd0JBLGFBQXhCO0FBQ0FqVixFQUFBQSxPQUFPLENBQUMwVSxTQUFSLEdBQW9CQSxTQUFwQjtBQUNBMVUsRUFBQUEsT0FBTyxDQUFDZ1YsbUJBQVIsR0FBOEJBLG1CQUE5QjtBQUNBaFYsRUFBQUEsT0FBTyxDQUFDNlUsZUFBUixHQUEwQkEsZUFBMUI7QUFDQTdVLEVBQUFBLE9BQU8sQ0FBQytVLE9BQVIsR0FBa0JBLE9BQWxCO0FBQ0EvVSxFQUFBQSxPQUFPLENBQUNvVSxVQUFSLEdBQXFCQSxVQUFyQjtBQUNBcFUsRUFBQUEsT0FBTyxDQUFDd1UsTUFBUixHQUFpQkEsTUFBakI7QUFDQXhVLEVBQUFBLE9BQU8sQ0FBQ2tVLFFBQVIsR0FBbUJBLFFBQW5CO0FBQ0FsVSxFQUFBQSxPQUFPLENBQUMrbEIsT0FBUixHQUFrQnpsQixZQUFsQjtBQUVELENBMXVHQSxDQUFEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4xMy4xXG4gKiByZWFjdC5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGZhY3RvcnkoZ2xvYmFsLlJlYWN0ID0ge30pKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgUmVhY3RWZXJzaW9uID0gJzE2LjEzLjEnO1xuXG4gIC8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4gIC8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cbiAgdmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbiAgdmFyIFJFQUNUX1BPUlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucG9ydGFsJykgOiAweGVhY2E7XG4gIHZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbiAgdmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xuICB2YXIgUkVBQ1RfUFJPRklMRVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnByb2ZpbGVyJykgOiAweGVhZDI7XG4gIHZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbiAgdmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTsgLy8gVE9ETzogV2UgZG9uJ3QgdXNlIEFzeW5jTW9kZSBvciBDb25jdXJyZW50TW9kZSBhbnltb3JlLiBUaGV5IHdlcmUgdGVtcG9yYXJ5XG4gIHZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xuICB2YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG4gIHZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbiAgdmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKSA6IDB4ZWFkODtcbiAgdmFyIFJFQUNUX01FTU9fVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKSA6IDB4ZWFkMztcbiAgdmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcbiAgdmFyIFJFQUNUX0JMT0NLX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5ibG9jaycpIDogMHhlYWQ5O1xuICB2YXIgUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZ1bmRhbWVudGFsJykgOiAweGVhZDU7XG4gIHZhciBSRUFDVF9SRVNQT05ERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnJlc3BvbmRlcicpIDogMHhlYWQ2O1xuICB2YXIgUkVBQ1RfU0NPUEVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnNjb3BlJykgOiAweGVhZDc7XG4gIHZhciBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICBpZiAobWF5YmVJdGVyYWJsZSA9PT0gbnVsbCB8fCB0eXBlb2YgbWF5YmVJdGVyYWJsZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBtYXliZUl0ZXJhdG9yID0gTUFZQkVfSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbTUFZQkVfSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXTtcblxuICAgIGlmICh0eXBlb2YgbWF5YmVJdGVyYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG1heWJlSXRlcmF0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKlxuICBvYmplY3QtYXNzaWduXG4gIChjKSBTaW5kcmUgU29yaHVzXG4gIEBsaWNlbnNlIE1JVFxuICAqL1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4gIGZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuICBcdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcbiAgXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIFx0fVxuXG4gIFx0cmV0dXJuIE9iamVjdCh2YWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuICBcdHRyeSB7XG4gIFx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcbiAgXHRcdFx0cmV0dXJuIGZhbHNlO1xuICBcdFx0fVxuXG4gIFx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cbiAgXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcbiAgXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcbiAgXHRcdHRlc3QxWzVdID0gJ2RlJztcbiAgXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuICBcdFx0XHRyZXR1cm4gZmFsc2U7XG4gIFx0XHR9XG5cbiAgXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcbiAgXHRcdHZhciB0ZXN0MiA9IHt9O1xuICBcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gIFx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcbiAgXHRcdH1cbiAgXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG4gIFx0XHRcdHJldHVybiB0ZXN0MltuXTtcbiAgXHRcdH0pO1xuICBcdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG4gIFx0XHRcdHJldHVybiBmYWxzZTtcbiAgXHRcdH1cblxuICBcdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuICBcdFx0dmFyIHRlc3QzID0ge307XG4gIFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcbiAgXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcbiAgXHRcdH0pO1xuICBcdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG4gIFx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuICBcdFx0XHRyZXR1cm4gZmFsc2U7XG4gIFx0XHR9XG5cbiAgXHRcdHJldHVybiB0cnVlO1xuICBcdH0gY2F0Y2ggKGVycikge1xuICBcdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cbiAgXHRcdHJldHVybiBmYWxzZTtcbiAgXHR9XG4gIH1cblxuICB2YXIgb2JqZWN0QXNzaWduID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIFx0dmFyIGZyb207XG4gIFx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgXHR2YXIgc3ltYm9scztcblxuICBcdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG4gIFx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cbiAgXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gIFx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcbiAgXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuICBcdFx0XHR9XG4gIFx0XHR9XG5cbiAgXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcbiAgXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG4gIFx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuICBcdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuICBcdFx0XHRcdH1cbiAgXHRcdFx0fVxuICBcdFx0fVxuICBcdH1cblxuICBcdHJldHVybiB0bztcbiAgfTtcblxuICAvKipcbiAgICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgZGlzcGF0Y2hlci5cbiAgICovXG4gIHZhciBSZWFjdEN1cnJlbnREaXNwYXRjaGVyID0ge1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICAgKi9cbiAgICBjdXJyZW50OiBudWxsXG4gIH07XG5cbiAgLyoqXG4gICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IGJhdGNoJ3MgY29uZmlndXJhdGlvbiBzdWNoIGFzIGhvdyBsb25nIGFuIHVwZGF0ZVxuICAgKiBzaG91bGQgc3VzcGVuZCBmb3IgaWYgaXQgbmVlZHMgdG8uXG4gICAqL1xuICB2YXIgUmVhY3RDdXJyZW50QmF0Y2hDb25maWcgPSB7XG4gICAgc3VzcGVuc2U6IG51bGxcbiAgfTtcblxuICAvKipcbiAgICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgb3duZXIuXG4gICAqXG4gICAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAgICogY3VycmVudGx5IGJlaW5nIGNvbnN0cnVjdGVkLlxuICAgKi9cbiAgdmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICAgKi9cbiAgICBjdXJyZW50OiBudWxsXG4gIH07XG5cbiAgdmFyIEJFRk9SRV9TTEFTSF9SRSA9IC9eKC4qKVtcXFxcXFwvXS87XG4gIGZ1bmN0aW9uIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUgKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gICAgdmFyIHNvdXJjZUluZm8gPSAnJztcblxuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgIHZhciBwYXRoID0gc291cmNlLmZpbGVOYW1lO1xuICAgICAgdmFyIGZpbGVOYW1lID0gcGF0aC5yZXBsYWNlKEJFRk9SRV9TTEFTSF9SRSwgJycpO1xuXG4gICAgICB7XG4gICAgICAgIC8vIEluIERFViwgaW5jbHVkZSBjb2RlIGZvciBhIGNvbW1vbiBzcGVjaWFsIGNhc2U6XG4gICAgICAgIC8vIHByZWZlciBcImZvbGRlci9pbmRleC5qc1wiIGluc3RlYWQgb2YganVzdCBcImluZGV4LmpzXCIuXG4gICAgICAgIGlmICgvXmluZGV4XFwuLy50ZXN0KGZpbGVOYW1lKSkge1xuICAgICAgICAgIHZhciBtYXRjaCA9IHBhdGgubWF0Y2goQkVGT1JFX1NMQVNIX1JFKTtcblxuICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIHBhdGhCZWZvcmVTbGFzaCA9IG1hdGNoWzFdO1xuXG4gICAgICAgICAgICBpZiAocGF0aEJlZm9yZVNsYXNoKSB7XG4gICAgICAgICAgICAgIHZhciBmb2xkZXJOYW1lID0gcGF0aEJlZm9yZVNsYXNoLnJlcGxhY2UoQkVGT1JFX1NMQVNIX1JFLCAnJyk7XG4gICAgICAgICAgICAgIGZpbGVOYW1lID0gZm9sZGVyTmFtZSArICcvJyArIGZpbGVOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzb3VyY2VJbmZvID0gJyAoYXQgJyArIGZpbGVOYW1lICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKSc7XG4gICAgfSBlbHNlIGlmIChvd25lck5hbWUpIHtcbiAgICAgIHNvdXJjZUluZm8gPSAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKSc7XG4gICAgfVxuXG4gICAgcmV0dXJuICdcXG4gICAgaW4gJyArIChuYW1lIHx8ICdVbmtub3duJykgKyBzb3VyY2VJbmZvO1xuICB9XG5cbiAgdmFyIFJlc29sdmVkID0gMTtcbiAgZnVuY3Rpb24gcmVmaW5lUmVzb2x2ZWRMYXp5Q29tcG9uZW50KGxhenlDb21wb25lbnQpIHtcbiAgICByZXR1cm4gbGF6eUNvbXBvbmVudC5fc3RhdHVzID09PSBSZXNvbHZlZCA/IGxhenlDb21wb25lbnQuX3Jlc3VsdCA6IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRXcmFwcGVkTmFtZShvdXRlclR5cGUsIGlubmVyVHlwZSwgd3JhcHBlck5hbWUpIHtcbiAgICB2YXIgZnVuY3Rpb25OYW1lID0gaW5uZXJUeXBlLmRpc3BsYXlOYW1lIHx8IGlubmVyVHlwZS5uYW1lIHx8ICcnO1xuICAgIHJldHVybiBvdXRlclR5cGUuZGlzcGxheU5hbWUgfHwgKGZ1bmN0aW9uTmFtZSAhPT0gJycgPyB3cmFwcGVyTmFtZSArIFwiKFwiICsgZnVuY3Rpb25OYW1lICsgXCIpXCIgOiB3cmFwcGVyTmFtZSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb21wb25lbnROYW1lKHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgICAvLyBIb3N0IHJvb3QsIHRleHQgbm9kZSBvciBqdXN0IGludmFsaWQgdHlwZS5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZS50YWcgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGVycm9yKCdSZWNlaXZlZCBhbiB1bmV4cGVjdGVkIG9iamVjdCBpbiBnZXRDb21wb25lbnROYW1lKCkuICcgKyAnVGhpcyBpcyBsaWtlbHkgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICAgIHJldHVybiAnRnJhZ21lbnQnO1xuXG4gICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICByZXR1cm4gJ1BvcnRhbCc7XG5cbiAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgcmV0dXJuIFwiUHJvZmlsZXJcIjtcblxuICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICByZXR1cm4gJ1N0cmljdE1vZGUnO1xuXG4gICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICAgIHJldHVybiAnU3VzcGVuc2UnO1xuXG4gICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgICAgcmV0dXJuICdTdXNwZW5zZUxpc3QnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHN3aXRjaCAodHlwZS4kJHR5cGVvZikge1xuICAgICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgICByZXR1cm4gJ0NvbnRleHQuQ29uc3VtZXInO1xuXG4gICAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgICByZXR1cm4gJ0NvbnRleHQuUHJvdmlkZXInO1xuXG4gICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICByZXR1cm4gZ2V0V3JhcHBlZE5hbWUodHlwZSwgdHlwZS5yZW5kZXIsICdGb3J3YXJkUmVmJyk7XG5cbiAgICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgICAgcmV0dXJuIGdldENvbXBvbmVudE5hbWUodHlwZS50eXBlKTtcblxuICAgICAgICBjYXNlIFJFQUNUX0JMT0NLX1RZUEU6XG4gICAgICAgICAgcmV0dXJuIGdldENvbXBvbmVudE5hbWUodHlwZS5yZW5kZXIpO1xuXG4gICAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhciB0aGVuYWJsZSA9IHR5cGU7XG4gICAgICAgICAgICB2YXIgcmVzb2x2ZWRUaGVuYWJsZSA9IHJlZmluZVJlc29sdmVkTGF6eUNvbXBvbmVudCh0aGVuYWJsZSk7XG5cbiAgICAgICAgICAgIGlmIChyZXNvbHZlZFRoZW5hYmxlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lKHJlc29sdmVkVGhlbmFibGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB2YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IHt9O1xuICB2YXIgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBudWxsO1xuICBmdW5jdGlvbiBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChlbGVtZW50KSB7XG4gICAge1xuICAgICAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBlbGVtZW50O1xuICAgIH1cbiAgfVxuXG4gIHtcbiAgICAvLyBTdGFjayBpbXBsZW1lbnRhdGlvbiBpbmplY3RlZCBieSB0aGUgY3VycmVudCByZW5kZXJlci5cbiAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjayA9IG51bGw7XG5cbiAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RhY2sgPSAnJzsgLy8gQWRkIGFuIGV4dHJhIHRvcCBmcmFtZSB3aGlsZSBhbiBlbGVtZW50IGlzIGJlaW5nIHZhbGlkYXRlZFxuXG4gICAgICBpZiAoY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50LnR5cGUpO1xuICAgICAgICB2YXIgb3duZXIgPSBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudC5fb3duZXI7XG4gICAgICAgIHN0YWNrICs9IGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQuX3NvdXJjZSwgb3duZXIgJiYgZ2V0Q29tcG9uZW50TmFtZShvd25lci50eXBlKSk7XG4gICAgICB9IC8vIERlbGVnYXRlIHRvIHRoZSBpbmplY3RlZCByZW5kZXJlci1zcGVjaWZpYyBpbXBsZW1lbnRhdGlvblxuXG5cbiAgICAgIHZhciBpbXBsID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2s7XG5cbiAgICAgIGlmIChpbXBsKSB7XG4gICAgICAgIHN0YWNrICs9IGltcGwoKSB8fCAnJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0YWNrO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBieSBhY3QoKSB0byB0cmFjayB3aGV0aGVyIHlvdSdyZSBpbnNpZGUgYW4gYWN0KCkgc2NvcGUuXG4gICAqL1xuICB2YXIgSXNTb21lUmVuZGVyZXJBY3RpbmcgPSB7XG4gICAgY3VycmVudDogZmFsc2VcbiAgfTtcblxuICB2YXIgUmVhY3RTaGFyZWRJbnRlcm5hbHMgPSB7XG4gICAgUmVhY3RDdXJyZW50RGlzcGF0Y2hlcjogUmVhY3RDdXJyZW50RGlzcGF0Y2hlcixcbiAgICBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZzogUmVhY3RDdXJyZW50QmF0Y2hDb25maWcsXG4gICAgUmVhY3RDdXJyZW50T3duZXI6IFJlYWN0Q3VycmVudE93bmVyLFxuICAgIElzU29tZVJlbmRlcmVyQWN0aW5nOiBJc1NvbWVSZW5kZXJlckFjdGluZyxcbiAgICAvLyBVc2VkIGJ5IHJlbmRlcmVycyB0byBhdm9pZCBidW5kbGluZyBvYmplY3QtYXNzaWduIHR3aWNlIGluIFVNRCBidW5kbGVzOlxuICAgIGFzc2lnbjogb2JqZWN0QXNzaWduXG4gIH07XG5cbiAge1xuICAgIG9iamVjdEFzc2lnbihSZWFjdFNoYXJlZEludGVybmFscywge1xuICAgICAgLy8gVGhlc2Ugc2hvdWxkIG5vdCBiZSBpbmNsdWRlZCBpbiBwcm9kdWN0aW9uLlxuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTogUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSxcbiAgICAgIC8vIFNoaW0gZm9yIFJlYWN0IERPTSAxNi4wLjAgd2hpY2ggc3RpbGwgZGVzdHJ1Y3R1cmVkIChidXQgbm90IHVzZWQpIHRoaXMuXG4gICAgICAvLyBUT0RPOiByZW1vdmUgaW4gUmVhY3QgMTcuMC5cbiAgICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2s6IHt9XG4gICAgfSk7XG4gIH1cblxuICAvLyBieSBjYWxscyB0byB0aGVzZSBtZXRob2RzIGJ5IGEgQmFiZWwgcGx1Z2luLlxuICAvL1xuICAvLyBJbiBQUk9EIChvciBpbiBwYWNrYWdlcyB3aXRob3V0IGFjY2VzcyB0byBSZWFjdCBpbnRlcm5hbHMpLFxuICAvLyB0aGV5IGFyZSBsZWZ0IGFzIHRoZXkgYXJlIGluc3RlYWQuXG5cbiAgZnVuY3Rpb24gd2Fybihmb3JtYXQpIHtcbiAgICB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcoJ3dhcm4nLCBmb3JtYXQsIGFyZ3MpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBlcnJvcihmb3JtYXQpIHtcbiAgICB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcoJ2Vycm9yJywgZm9ybWF0LCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcmludFdhcm5pbmcobGV2ZWwsIGZvcm1hdCwgYXJncykge1xuICAgIC8vIFdoZW4gY2hhbmdpbmcgdGhpcyBsb2dpYywgeW91IG1pZ2h0IHdhbnQgdG8gYWxzb1xuICAgIC8vIHVwZGF0ZSBjb25zb2xlV2l0aFN0YWNrRGV2Lnd3dy5qcyBhcyB3ZWxsLlxuICAgIHtcbiAgICAgIHZhciBoYXNFeGlzdGluZ1N0YWNrID0gYXJncy5sZW5ndGggPiAwICYmIHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09ICdzdHJpbmcnICYmIGFyZ3NbYXJncy5sZW5ndGggLSAxXS5pbmRleE9mKCdcXG4gICAgaW4nKSA9PT0gMDtcblxuICAgICAgaWYgKCFoYXNFeGlzdGluZ1N0YWNrKSB7XG4gICAgICAgIHZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbiAgICAgICAgdmFyIHN0YWNrID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG5cbiAgICAgICAgaWYgKHN0YWNrICE9PSAnJykge1xuICAgICAgICAgIGZvcm1hdCArPSAnJXMnO1xuICAgICAgICAgIGFyZ3MgPSBhcmdzLmNvbmNhdChbc3RhY2tdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgYXJnc1dpdGhGb3JtYXQgPSBhcmdzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gJycgKyBpdGVtO1xuICAgICAgfSk7IC8vIENhcmVmdWw6IFJOIGN1cnJlbnRseSBkZXBlbmRzIG9uIHRoaXMgcHJlZml4XG5cbiAgICAgIGFyZ3NXaXRoRm9ybWF0LnVuc2hpZnQoJ1dhcm5pbmc6ICcgKyBmb3JtYXQpOyAvLyBXZSBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBzcHJlYWQgKG9yIC5hcHBseSkgZGlyZWN0bHkgYmVjYXVzZSBpdFxuICAgICAgLy8gYnJlYWtzIElFOTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8xMzYxMFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZ1xuXG4gICAgICBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlW2xldmVsXSwgY29uc29sZSwgYXJnc1dpdGhGb3JtYXQpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICAgIH0pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoICh4KSB7fVxuICAgIH1cbiAgfVxuXG4gIHZhciBkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnQgPSB7fTtcblxuICBmdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICAgIHtcbiAgICAgIHZhciBfY29uc3RydWN0b3IgPSBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gX2NvbnN0cnVjdG9yICYmIChfY29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgX2NvbnN0cnVjdG9yLm5hbWUpIHx8ICdSZWFjdENsYXNzJztcbiAgICAgIHZhciB3YXJuaW5nS2V5ID0gY29tcG9uZW50TmFtZSArIFwiLlwiICsgY2FsbGVyTmFtZTtcblxuICAgICAgaWYgKGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGVycm9yKFwiQ2FuJ3QgY2FsbCAlcyBvbiBhIGNvbXBvbmVudCB0aGF0IGlzIG5vdCB5ZXQgbW91bnRlZC4gXCIgKyAnVGhpcyBpcyBhIG5vLW9wLCBidXQgaXQgbWlnaHQgaW5kaWNhdGUgYSBidWcgaW4geW91ciBhcHBsaWNhdGlvbi4gJyArICdJbnN0ZWFkLCBhc3NpZ24gdG8gYHRoaXMuc3RhdGVgIGRpcmVjdGx5IG9yIGRlZmluZSBhIGBzdGF0ZSA9IHt9O2AgJyArICdjbGFzcyBwcm9wZXJ0eSB3aXRoIHRoZSBkZXNpcmVkIHN0YXRlIGluIHRoZSAlcyBjb21wb25lbnQuJywgY2FsbGVyTmFtZSwgY29tcG9uZW50TmFtZSk7XG5cbiAgICAgIGRpZFdhcm5TdGF0ZVVwZGF0ZUZvclVubW91bnRlZENvbXBvbmVudFt3YXJuaW5nS2V5XSA9IHRydWU7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAgICovXG5cblxuICB2YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSB7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHdlIHdhbnQgdG8gdGVzdC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICogQGZpbmFsXG4gICAgICovXG4gICAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICAgICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgICAqXG4gICAgICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICAgICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgICAqXG4gICAgICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICAgICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdmb3JjZVVwZGF0ZScpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyBhbGwgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgb3IgYHNldFN0YXRlYCB0byBtdXRhdGUgc3RhdGUuXG4gICAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgICAqXG4gICAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgICAqIEBwYXJhbSB7P3N0cmluZ30gY2FsbGVyTmFtZSBuYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAncmVwbGFjZVN0YXRlJyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBUaGlzIG9ubHkgZXhpc3RzIGJlY2F1c2UgX3BlbmRpbmdTdGF0ZSBpc1xuICAgICAqIGludGVybmFsLiBUaGlzIHByb3ZpZGVzIGEgbWVyZ2luZyBzdHJhdGVneSB0aGF0IGlzIG5vdCBhdmFpbGFibGUgdG8gZGVlcFxuICAgICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgICAqIGR1cmluZyB0aGUgbWVyZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBzdGF0ZS5cbiAgICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgICAqIEBwYXJhbSB7P3N0cmluZ30gTmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgcGFydGlhbFN0YXRlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdzZXRTdGF0ZScpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZW1wdHlPYmplY3QgPSB7fTtcblxuICB7XG4gICAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG4gIH1cbiAgLyoqXG4gICAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0OyAvLyBJZiBhIGNvbXBvbmVudCBoYXMgc3RyaW5nIHJlZnMsIHdlIHdpbGwgYXNzaWduIGEgZGlmZmVyZW50IG9iamVjdCBsYXRlci5cblxuICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0OyAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAgIC8vIHJlbmRlcmVyLlxuXG4gICAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbiAgfVxuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuICAvKipcbiAgICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyB0byBtdXRhdGVcbiAgICogc3RhdGUuIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAgICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5LFxuICAgKiBhcyB0aGV5IG1heSBldmVudHVhbGx5IGJlIGJhdGNoZWQgdG9nZXRoZXIuICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWxcbiAgICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAgICogY29tcGxldGVkLlxuICAgKlxuICAgKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAgICogdGhlIGZ1dHVyZSAobm90IHN5bmNocm9ub3VzbHkpLiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB1cCB0byBkYXRlXG4gICAqIGNvbXBvbmVudCBhcmd1bWVudHMgKHN0YXRlLCBwcm9wcywgY29udGV4dCkuIFRoZXNlIHZhbHVlcyBjYW4gYmUgZGlmZmVyZW50XG4gICAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gICAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSwgYW5kIHRoaXMgbmV3IHN0YXRlLCBwcm9wcywgYW5kIGNvbnRleHQgd2lsbCBub3QgeWV0IGJlXG4gICAqIGFzc2lnbmVkIHRvIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIG9yIGZ1bmN0aW9uIHRvXG4gICAqICAgICAgICBwcm9kdWNlIG5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBjdXJyZW50IHN0YXRlLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gICAqIEBmaW5hbFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuXG4gIENvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAocGFydGlhbFN0YXRlLCBjYWxsYmFjaykge1xuICAgIGlmICghKHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdmdW5jdGlvbicgfHwgcGFydGlhbFN0YXRlID09IG51bGwpKSB7XG4gICAgICB7XG4gICAgICAgIHRocm93IEVycm9yKCBcInNldFN0YXRlKC4uLik6IHRha2VzIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMgdG8gdXBkYXRlIG9yIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLlwiICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbiAgfTtcbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB1cGRhdGUgaXMgY29tcGxldGUuXG4gICAqIEBmaW5hbFxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuXG5cbiAgQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xuICB9O1xuICAvKipcbiAgICogRGVwcmVjYXRlZCBBUElzLiBUaGVzZSBBUElzIHVzZWQgdG8gZXhpc3Qgb24gY2xhc3NpYyBSZWFjdCBjbGFzc2VzIGJ1dCBzaW5jZVxuICAgKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICAgKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAgICovXG5cblxuICB7XG4gICAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgICAgaXNNb3VudGVkOiBbJ2lzTW91bnRlZCcsICdJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiAnICsgJ2NvbXBvbmVudFdpbGxVbm1vdW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLiddLFxuICAgICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgICB9O1xuXG4gICAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50LnByb3RvdHlwZSwgbWV0aG9kTmFtZSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB3YXJuKCclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pO1xuXG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZvciAodmFyIGZuTmFtZSBpbiBkZXByZWNhdGVkQVBJcykge1xuICAgICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgICAgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKGZuTmFtZSwgZGVwcmVjYXRlZEFQSXNbZm5OYW1lXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQ29tcG9uZW50RHVtbXkoKSB7fVxuXG4gIENvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBjb21wb25lbnQgd2l0aCBkZWZhdWx0IHNoYWxsb3cgZXF1YWxpdHkgY2hlY2sgZm9yIHNDVS5cbiAgICovXG5cbiAgZnVuY3Rpb24gUHVyZUNvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0OyAvLyBJZiBhIGNvbXBvbmVudCBoYXMgc3RyaW5nIHJlZnMsIHdlIHdpbGwgYXNzaWduIGEgZGlmZmVyZW50IG9iamVjdCBsYXRlci5cblxuICAgIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAgIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG4gIH1cblxuICB2YXIgcHVyZUNvbXBvbmVudFByb3RvdHlwZSA9IFB1cmVDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG4gIHB1cmVDb21wb25lbnRQcm90b3R5cGUuY29uc3RydWN0b3IgPSBQdXJlQ29tcG9uZW50OyAvLyBBdm9pZCBhbiBleHRyYSBwcm90b3R5cGUganVtcCBmb3IgdGhlc2UgbWV0aG9kcy5cblxuICBvYmplY3RBc3NpZ24ocHVyZUNvbXBvbmVudFByb3RvdHlwZSwgQ29tcG9uZW50LnByb3RvdHlwZSk7XG5cbiAgcHVyZUNvbXBvbmVudFByb3RvdHlwZS5pc1B1cmVSZWFjdENvbXBvbmVudCA9IHRydWU7XG5cbiAgLy8gYW4gaW1tdXRhYmxlIG9iamVjdCB3aXRoIGEgc2luZ2xlIG11dGFibGUgdmFsdWVcbiAgZnVuY3Rpb24gY3JlYXRlUmVmKCkge1xuICAgIHZhciByZWZPYmplY3QgPSB7XG4gICAgICBjdXJyZW50OiBudWxsXG4gICAgfTtcblxuICAgIHtcbiAgICAgIE9iamVjdC5zZWFsKHJlZk9iamVjdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZk9iamVjdDtcbiAgfVxuXG4gIHZhciBoYXNPd25Qcm9wZXJ0eSQxID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICAgIGtleTogdHJ1ZSxcbiAgICByZWY6IHRydWUsXG4gICAgX19zZWxmOiB0cnVlLFxuICAgIF9fc291cmNlOiB0cnVlXG4gIH07XG4gIHZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biwgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24sIGRpZFdhcm5BYm91dFN0cmluZ1JlZnM7XG5cbiAge1xuICAgIGRpZFdhcm5BYm91dFN0cmluZ1JlZnMgPSB7fTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc1ZhbGlkUmVmKGNvbmZpZykge1xuICAgIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eSQxLmNhbGwoY29uZmlnLCAncmVmJykpIHtcbiAgICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuXG4gICAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICAgIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eSQxLmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuXG4gICAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICAgIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB7XG4gICAgICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG5cbiAgICAgICAgICBlcnJvcignJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdhcm5BYm91dEFjY2Vzc2luZ0tleS5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICAgIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB7XG4gICAgICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG5cbiAgICAgICAgICBlcnJvcignJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHdhcm5BYm91dEFjY2Vzc2luZ1JlZi5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdhcm5JZlN0cmluZ1JlZkNhbm5vdEJlQXV0b0NvbnZlcnRlZChjb25maWcpIHtcbiAgICB7XG4gICAgICBpZiAodHlwZW9mIGNvbmZpZy5yZWYgPT09ICdzdHJpbmcnICYmIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgJiYgY29uZmlnLl9fc2VsZiAmJiBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnN0YXRlTm9kZSAhPT0gY29uZmlnLl9fc2VsZikge1xuICAgICAgICB2YXIgY29tcG9uZW50TmFtZSA9IGdldENvbXBvbmVudE5hbWUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKTtcblxuICAgICAgICBpZiAoIWRpZFdhcm5BYm91dFN0cmluZ1JlZnNbY29tcG9uZW50TmFtZV0pIHtcbiAgICAgICAgICBlcnJvcignQ29tcG9uZW50IFwiJXNcIiBjb250YWlucyB0aGUgc3RyaW5nIHJlZiBcIiVzXCIuICcgKyAnU3VwcG9ydCBmb3Igc3RyaW5nIHJlZnMgd2lsbCBiZSByZW1vdmVkIGluIGEgZnV0dXJlIG1ham9yIHJlbGVhc2UuICcgKyAnVGhpcyBjYXNlIGNhbm5vdCBiZSBhdXRvbWF0aWNhbGx5IGNvbnZlcnRlZCB0byBhbiBhcnJvdyBmdW5jdGlvbi4gJyArICdXZSBhc2sgeW91IHRvIG1hbnVhbGx5IGZpeCB0aGlzIGNhc2UgYnkgdXNpbmcgdXNlUmVmKCkgb3IgY3JlYXRlUmVmKCkgaW5zdGVhZC4gJyArICdMZWFybiBtb3JlIGFib3V0IHVzaW5nIHJlZnMgc2FmZWx5IGhlcmU6ICcgKyAnaHR0cHM6Ly9mYi5tZS9yZWFjdC1zdHJpY3QtbW9kZS1zdHJpbmctcmVmJywgZ2V0Q29tcG9uZW50TmFtZShSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnR5cGUpLCBjb25maWcucmVmKTtcblxuICAgICAgICAgIGRpZFdhcm5BYm91dFN0cmluZ1JlZnNbY29tcG9uZW50TmFtZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICAgKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgaW5zdGFuY2VvZiBjaGVja1xuICAgKiB3aWxsIG5vdCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAgICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHsqfSB0eXBlXG4gICAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAgICogQHBhcmFtIHsqfSBrZXlcbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAgICogQHBhcmFtIHsqfSBvd25lclxuICAgKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAgICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICAgKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICAgKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gICAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAgICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gICAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuXG4gIHZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB7XG4gICAgICAvLyBUaGlzIHRhZyBhbGxvd3MgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG4gICAgICAvLyBCdWlsdC1pbiBwcm9wZXJ0aWVzIHRoYXQgYmVsb25nIG9uIHRoZSBlbGVtZW50XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAga2V5OiBrZXksXG4gICAgICByZWY6IHJlZixcbiAgICAgIHByb3BzOiBwcm9wcyxcbiAgICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgICBfb3duZXI6IG93bmVyXG4gICAgfTtcblxuICAgIHtcbiAgICAgIC8vIFRoZSB2YWxpZGF0aW9uIGZsYWcgaXMgY3VycmVudGx5IG11dGF0aXZlLiBXZSBwdXQgaXQgb25cbiAgICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgICAvLyBjb21tb25seSB1c2VkIGRldmVsb3BtZW50IGVudmlyb25tZW50cy5cbiAgICAgIGVsZW1lbnQuX3N0b3JlID0ge307IC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgICAvLyB0aGUgdmFsaWRhdGlvbiBmbGFnIG5vbi1lbnVtZXJhYmxlICh3aGVyZSBwb3NzaWJsZSwgd2hpY2ggc2hvdWxkXG4gICAgICAvLyBpbmNsdWRlIGV2ZXJ5IGVudmlyb25tZW50IHdlIHJ1biB0ZXN0cyBpbiksIHNvIHRoZSB0ZXN0IGZyYW1ld29ya1xuICAgICAgLy8gaWdub3JlcyBpdC5cblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQuX3N0b3JlLCAndmFsaWRhdGVkJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgfSk7IC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNlbGZcbiAgICAgIH0pOyAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgICAgLy8gZXF1YWwgZm9yIHRlc3RpbmcgcHVycG9zZXMgYW5kIHRoZXJlZm9yZSB3ZSBoaWRlIGl0IGZyb20gZW51bWVyYXRpb24uXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNvdXJjZVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG4gIC8qKlxuICAgKiBDcmVhdGUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gICAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjY3JlYXRlZWxlbWVudFxuICAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgICB2YXIgcHJvcE5hbWU7IC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcblxuICAgIHZhciBwcm9wcyA9IHt9O1xuICAgIHZhciBrZXkgPSBudWxsO1xuICAgIHZhciByZWYgPSBudWxsO1xuICAgIHZhciBzZWxmID0gbnVsbDtcbiAgICB2YXIgc291cmNlID0gbnVsbDtcblxuICAgIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgICAgcmVmID0gY29uZmlnLnJlZjtcblxuICAgICAgICB7XG4gICAgICAgICAgd2FybklmU3RyaW5nUmVmQ2Fubm90QmVBdXRvQ29udmVydGVkKGNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgICAgfVxuXG4gICAgICBzZWxmID0gY29uZmlnLl9fc2VsZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NlbGY7XG4gICAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7IC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcblxuICAgICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5JDEuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAgIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuXG5cbiAgICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcblxuICAgIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICAgIH1cblxuICAgICAge1xuICAgICAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgICAgIE9iamVjdC5mcmVlemUoY2hpbGRBcnJheSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICAgIH0gLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG5cblxuICAgIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICB2YXIgZGVmYXVsdFByb3BzID0gdHlwZS5kZWZhdWx0UHJvcHM7XG5cbiAgICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgICB2YXIgZGlzcGxheU5hbWUgPSB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8ICdVbmtub3duJyA6IHR5cGU7XG5cbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVmKSB7XG4gICAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCwgcHJvcHMpO1xuICB9XG4gIGZ1bmN0aW9uIGNsb25lQW5kUmVwbGFjZUtleShvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgb2xkRWxlbWVudC5yZWYsIG9sZEVsZW1lbnQuX3NlbGYsIG9sZEVsZW1lbnQuX3NvdXJjZSwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xuICAgIHJldHVybiBuZXdFbGVtZW50O1xuICB9XG4gIC8qKlxuICAgKiBDbG9uZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCB1c2luZyBlbGVtZW50IGFzIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjbG9uZWVsZW1lbnRcbiAgICovXG5cbiAgZnVuY3Rpb24gY2xvbmVFbGVtZW50KGVsZW1lbnQsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgICBpZiAoISEoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQpKSB7XG4gICAgICB7XG4gICAgICAgIHRocm93IEVycm9yKCBcIlJlYWN0LmNsb25lRWxlbWVudCguLi4pOiBUaGUgYXJndW1lbnQgbXVzdCBiZSBhIFJlYWN0IGVsZW1lbnQsIGJ1dCB5b3UgcGFzc2VkIFwiICsgZWxlbWVudCArIFwiLlwiICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByb3BOYW1lOyAvLyBPcmlnaW5hbCBwcm9wcyBhcmUgY29waWVkXG5cbiAgICB2YXIgcHJvcHMgPSBvYmplY3RBc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpOyAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG5cblxuICAgIHZhciBrZXkgPSBlbGVtZW50LmtleTtcbiAgICB2YXIgcmVmID0gZWxlbWVudC5yZWY7IC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG5cbiAgICB2YXIgc2VsZiA9IGVsZW1lbnQuX3NlbGY7IC8vIFNvdXJjZSBpcyBwcmVzZXJ2ZWQgc2luY2UgY2xvbmVFbGVtZW50IGlzIHVubGlrZWx5IHRvIGJlIHRhcmdldGVkIGJ5IGFcbiAgICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gICAgLy8gdHJ1ZSBvd25lci5cblxuICAgIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7IC8vIE93bmVyIHdpbGwgYmUgcHJlc2VydmVkLCB1bmxlc3MgcmVmIGlzIG92ZXJyaWRkZW5cblxuICAgIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuXG4gICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgICAgfVxuXG4gICAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgICB9IC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG5cblxuICAgICAgdmFyIGRlZmF1bHRQcm9wcztcblxuICAgICAgaWYgKGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgICB9XG5cbiAgICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eSQxLmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cblxuXG4gICAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG5cbiAgICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgICB9XG5cbiAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbiAgfVxuICAvKipcbiAgICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAgICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNpc3ZhbGlkZWxlbWVudFxuICAgKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgUmVhY3RFbGVtZW50LlxuICAgKiBAZmluYWxcbiAgICovXG5cbiAgZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnQob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfVxuXG4gIHZhciBTRVBBUkFUT1IgPSAnLic7XG4gIHZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG4gIC8qKlxuICAgKiBFc2NhcGUgYW5kIHdyYXAga2V5IHNvIGl0IGlzIHNhZmUgdG8gdXNlIGFzIGEgcmVhY3RpZFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGVzY2FwZWQga2V5LlxuICAgKi9cblxuICBmdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gICAgdmFyIGVzY2FwZVJlZ2V4ID0gL1s9Ol0vZztcbiAgICB2YXIgZXNjYXBlckxvb2t1cCA9IHtcbiAgICAgICc9JzogJz0wJyxcbiAgICAgICc6JzogJz0yJ1xuICAgIH07XG4gICAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgcmV0dXJuIGVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICAgIH0pO1xuICAgIHJldHVybiAnJCcgKyBlc2NhcGVkU3RyaW5nO1xuICB9XG4gIC8qKlxuICAgKiBUT0RPOiBUZXN0IHRoYXQgYSBzaW5nbGUgY2hpbGQgYW5kIGFuIGFycmF5IHdpdGggb25lIGl0ZW0gaGF2ZSB0aGUgc2FtZSBrZXlcbiAgICogcGF0dGVybi5cbiAgICovXG5cblxuICB2YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xuICB2YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nO1xuXG4gIGZ1bmN0aW9uIGVzY2FwZVVzZXJQcm92aWRlZEtleSh0ZXh0KSB7XG4gICAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICckJi8nKTtcbiAgfVxuXG4gIHZhciBQT09MX1NJWkUgPSAxMDtcbiAgdmFyIHRyYXZlcnNlQ29udGV4dFBvb2wgPSBbXTtcblxuICBmdW5jdGlvbiBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQobWFwUmVzdWx0LCBrZXlQcmVmaXgsIG1hcEZ1bmN0aW9uLCBtYXBDb250ZXh0KSB7XG4gICAgaWYgKHRyYXZlcnNlQ29udGV4dFBvb2wubGVuZ3RoKSB7XG4gICAgICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gdHJhdmVyc2VDb250ZXh0UG9vbC5wb3AoKTtcbiAgICAgIHRyYXZlcnNlQ29udGV4dC5yZXN1bHQgPSBtYXBSZXN1bHQ7XG4gICAgICB0cmF2ZXJzZUNvbnRleHQua2V5UHJlZml4ID0ga2V5UHJlZml4O1xuICAgICAgdHJhdmVyc2VDb250ZXh0LmZ1bmMgPSBtYXBGdW5jdGlvbjtcbiAgICAgIHRyYXZlcnNlQ29udGV4dC5jb250ZXh0ID0gbWFwQ29udGV4dDtcbiAgICAgIHRyYXZlcnNlQ29udGV4dC5jb3VudCA9IDA7XG4gICAgICByZXR1cm4gdHJhdmVyc2VDb250ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHQ6IG1hcFJlc3VsdCxcbiAgICAgICAga2V5UHJlZml4OiBrZXlQcmVmaXgsXG4gICAgICAgIGZ1bmM6IG1hcEZ1bmN0aW9uLFxuICAgICAgICBjb250ZXh0OiBtYXBDb250ZXh0LFxuICAgICAgICBjb3VudDogMFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWxlYXNlVHJhdmVyc2VDb250ZXh0KHRyYXZlcnNlQ29udGV4dCkge1xuICAgIHRyYXZlcnNlQ29udGV4dC5yZXN1bHQgPSBudWxsO1xuICAgIHRyYXZlcnNlQ29udGV4dC5rZXlQcmVmaXggPSBudWxsO1xuICAgIHRyYXZlcnNlQ29udGV4dC5mdW5jID0gbnVsbDtcbiAgICB0cmF2ZXJzZUNvbnRleHQuY29udGV4dCA9IG51bGw7XG4gICAgdHJhdmVyc2VDb250ZXh0LmNvdW50ID0gMDtcblxuICAgIGlmICh0cmF2ZXJzZUNvbnRleHRQb29sLmxlbmd0aCA8IFBPT0xfU0laRSkge1xuICAgICAgdHJhdmVyc2VDb250ZXh0UG9vbC5wdXNoKHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAgICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICAgKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIHdpdGggZWFjaCBjaGlsZCBmb3VuZC5cbiAgICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IFVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiB0aHJvdWdob3V0IHRoZSB0cmF2ZXJzYWxcbiAgICogcHJvY2Vzcy5cbiAgICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sIG5hbWVTb0ZhciwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gICAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgLy8gQWxsIG9mIHRoZSBhYm92ZSBhcmUgcGVyY2VpdmVkIGFzIG51bGwuXG4gICAgICBjaGlsZHJlbiA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGludm9rZUNhbGxiYWNrID0gZmFsc2U7XG5cbiAgICBpZiAoY2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgaW52b2tlQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgc3dpdGNoIChjaGlsZHJlbi4kJHR5cGVvZikge1xuICAgICAgICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGludm9rZUNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLCAvLyBJZiBpdCdzIHRoZSBvbmx5IGNoaWxkLCB0cmVhdCB0aGUgbmFtZSBhcyBpZiBpdCB3YXMgd3JhcHBlZCBpbiBhbiBhcnJheVxuICAgICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICAgIG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGRyZW4sIDApIDogbmFtZVNvRmFyKTtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHZhciBjaGlsZDtcbiAgICB2YXIgbmV4dE5hbWU7XG4gICAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG5cbiAgICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKGNoaWxkcmVuKTtcblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG5cbiAgICAgICAge1xuICAgICAgICAgIC8vIFdhcm4gYWJvdXQgdXNpbmcgTWFwcyBhcyBjaGlsZHJlblxuICAgICAgICAgIGlmIChpdGVyYXRvckZuID09PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgICAgICBpZiAoIWRpZFdhcm5BYm91dE1hcHMpIHtcbiAgICAgICAgICAgICAgd2FybignVXNpbmcgTWFwcyBhcyBjaGlsZHJlbiBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gJyArICdhIGZ1dHVyZSBtYWpvciByZWxlYXNlLiBDb25zaWRlciBjb252ZXJ0aW5nIGNoaWxkcmVuIHRvICcgKyAnYW4gYXJyYXkgb2Yga2V5ZWQgUmVhY3RFbGVtZW50cyBpbnN0ZWFkLicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgdmFyIGlpID0gMDtcblxuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciBhZGRlbmR1bSA9ICcnO1xuXG4gICAgICAgIHtcbiAgICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQuJyArIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoaWxkcmVuU3RyaW5nID0gJycgKyBjaGlsZHJlbjtcblxuICAgICAgICB7XG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoIFwiT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiBcIiArIChjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcpICsgXCIpLlwiICsgYWRkZW5kdW0gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VidHJlZUNvdW50O1xuICB9XG4gIC8qKlxuICAgKiBUcmF2ZXJzZXMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLCBidXRcbiAgICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICAgKlxuICAgKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4sIC4uLilgXG4gICAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAgICpcbiAgICogVGhlIGB0cmF2ZXJzZUNvbnRleHRgIGlzIGFuIG9wdGlvbmFsIGFyZ3VtZW50IHRoYXQgaXMgcGFzc2VkIHRocm91Z2ggdGhlXG4gICAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gICAqIHRoZSBjYWxsYmFjayBtaWdodCBmaW5kIHJlbGV2YW50LlxuICAgKlxuICAgKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAgICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIFRvIGludm9rZSB1cG9uIHRyYXZlcnNpbmcgZWFjaCBjaGlsZC5cbiAgICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgZm9yIHRyYXZlcnNhbC5cbiAgICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICAgIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sICcnLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gICAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgICAvLyB0aGF0IHdlIGRvbid0IGJsb2NrIHBvdGVudGlhbCBmdXR1cmUgRVMgQVBJcy5cbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50ICE9PSBudWxsICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgICAgLy8gRXhwbGljaXQga2V5XG4gICAgICByZXR1cm4gZXNjYXBlKGNvbXBvbmVudC5rZXkpO1xuICAgIH0gLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcblxuXG4gICAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZChib29rS2VlcGluZywgY2hpbGQsIG5hbWUpIHtcbiAgICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuICAgIGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG4gIH1cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5mb3JlYWNoXG4gICAqXG4gICAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gICAqIGxlYWYgY2hpbGQuXG4gICAqXG4gICAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gICAqIEBwYXJhbSB7Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCBmb3IgZm9yRWFjaENvbnRleHQuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cblxuICAgIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQobnVsbCwgbnVsbCwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KTtcbiAgICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gICAgdmFyIHJlc3VsdCA9IGJvb2tLZWVwaW5nLnJlc3VsdCxcbiAgICAgICAga2V5UHJlZml4ID0gYm9va0tlZXBpbmcua2V5UHJlZml4LFxuICAgICAgICBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG4gICAgdmFyIG1hcHBlZENoaWxkID0gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChtYXBwZWRDaGlsZCwgcmVzdWx0LCBjaGlsZEtleSwgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgcmV0dXJuIGM7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChtYXBwZWRDaGlsZCkpIHtcbiAgICAgICAgbWFwcGVkQ2hpbGQgPSBjbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAgICBrZXlQcmVmaXggKyAobWFwcGVkQ2hpbGQua2V5ICYmICghY2hpbGQgfHwgY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpID8gZXNjYXBlVXNlclByb3ZpZGVkS2V5KG1hcHBlZENoaWxkLmtleSkgKyAnLycgOiAnJykgKyBjaGlsZEtleSk7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdC5wdXNoKG1hcHBlZENoaWxkKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCBhcnJheSwgcHJlZml4LCBmdW5jLCBjb250ZXh0KSB7XG4gICAgdmFyIGVzY2FwZWRQcmVmaXggPSAnJztcblxuICAgIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgICAgZXNjYXBlZFByZWZpeCA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShwcmVmaXgpICsgJy8nO1xuICAgIH1cblxuICAgIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQoYXJyYXksIGVzY2FwZWRQcmVmaXgsIGZ1bmMsIGNvbnRleHQpO1xuICAgIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpO1xuICB9XG4gIC8qKlxuICAgKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAgICpcbiAgICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVubWFwXG4gICAqXG4gICAqIFRoZSBwcm92aWRlZCBtYXBGdW5jdGlvbihjaGlsZCwga2V5LCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAgICogbGVhZiBjaGlsZC5cbiAgICpcbiAgICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0geyp9IGNvbnRleHQgQ29udGV4dCBmb3IgbWFwRnVuY3Rpb24uXG4gICAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgLyoqXG4gICAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICAgKiBgcHJvcHMuY2hpbGRyZW5gLlxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5jb3VudFxuICAgKlxuICAgKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuLlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSwgbnVsbCk7XG4gIH1cbiAgLyoqXG4gICAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gICAqIHJldHVybiBhbiBhcnJheSB3aXRoIGFwcHJvcHJpYXRlbHkgcmUta2V5ZWQgY2hpbGRyZW4uXG4gICAqXG4gICAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbnRvYXJyYXlcbiAgICovXG5cblxuICBmdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgaW4gYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuIGFuZCB2ZXJpZmllcyB0aGF0IHRoZXJlXG4gICAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5vbmx5XG4gICAqXG4gICAqIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGEgc2luZ2xlIGNoaWxkIGdldHNcbiAgICogcGFzc2VkIHdpdGhvdXQgYSB3cmFwcGVyLCBidXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyBoZWxwZXIgZnVuY3Rpb24gaXMgdG9cbiAgICogYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmUgb2YgY2hpbGRyZW4uXG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gY2hpbGRyZW4gQ2hpbGQgY29sbGVjdGlvbiBzdHJ1Y3R1cmUuXG4gICAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdEVsZW1lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAgICogc3RydWN0dXJlLlxuICAgKi9cblxuXG4gIGZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICAgIGlmICghaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pKSB7XG4gICAgICB7XG4gICAgICAgIHRocm93IEVycm9yKCBcIlJlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLlwiICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ29udGV4dChkZWZhdWx0VmFsdWUsIGNhbGN1bGF0ZUNoYW5nZWRCaXRzKSB7XG4gICAgaWYgKGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNhbGN1bGF0ZUNoYW5nZWRCaXRzID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAge1xuICAgICAgICBpZiAoY2FsY3VsYXRlQ2hhbmdlZEJpdHMgIT09IG51bGwgJiYgdHlwZW9mIGNhbGN1bGF0ZUNoYW5nZWRCaXRzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZXJyb3IoJ2NyZWF0ZUNvbnRleHQ6IEV4cGVjdGVkIHRoZSBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnQgdG8gYmUgYSAnICsgJ2Z1bmN0aW9uLiBJbnN0ZWFkIHJlY2VpdmVkOiAlcycsIGNhbGN1bGF0ZUNoYW5nZWRCaXRzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjb250ZXh0ID0ge1xuICAgICAgJCR0eXBlb2Y6IFJFQUNUX0NPTlRFWFRfVFlQRSxcbiAgICAgIF9jYWxjdWxhdGVDaGFuZ2VkQml0czogY2FsY3VsYXRlQ2hhbmdlZEJpdHMsXG4gICAgICAvLyBBcyBhIHdvcmthcm91bmQgdG8gc3VwcG9ydCBtdWx0aXBsZSBjb25jdXJyZW50IHJlbmRlcmVycywgd2UgY2F0ZWdvcml6ZVxuICAgICAgLy8gc29tZSByZW5kZXJlcnMgYXMgcHJpbWFyeSBhbmQgb3RoZXJzIGFzIHNlY29uZGFyeS4gV2Ugb25seSBleHBlY3RcbiAgICAgIC8vIHRoZXJlIHRvIGJlIHR3byBjb25jdXJyZW50IHJlbmRlcmVycyBhdCBtb3N0OiBSZWFjdCBOYXRpdmUgKHByaW1hcnkpIGFuZFxuICAgICAgLy8gRmFicmljIChzZWNvbmRhcnkpOyBSZWFjdCBET00gKHByaW1hcnkpIGFuZCBSZWFjdCBBUlQgKHNlY29uZGFyeSkuXG4gICAgICAvLyBTZWNvbmRhcnkgcmVuZGVyZXJzIHN0b3JlIHRoZWlyIGNvbnRleHQgdmFsdWVzIG9uIHNlcGFyYXRlIGZpZWxkcy5cbiAgICAgIF9jdXJyZW50VmFsdWU6IGRlZmF1bHRWYWx1ZSxcbiAgICAgIF9jdXJyZW50VmFsdWUyOiBkZWZhdWx0VmFsdWUsXG4gICAgICAvLyBVc2VkIHRvIHRyYWNrIGhvdyBtYW55IGNvbmN1cnJlbnQgcmVuZGVyZXJzIHRoaXMgY29udGV4dCBjdXJyZW50bHlcbiAgICAgIC8vIHN1cHBvcnRzIHdpdGhpbiBpbiBhIHNpbmdsZSByZW5kZXJlci4gU3VjaCBhcyBwYXJhbGxlbCBzZXJ2ZXIgcmVuZGVyaW5nLlxuICAgICAgX3RocmVhZENvdW50OiAwLFxuICAgICAgLy8gVGhlc2UgYXJlIGNpcmN1bGFyXG4gICAgICBQcm92aWRlcjogbnVsbCxcbiAgICAgIENvbnN1bWVyOiBudWxsXG4gICAgfTtcbiAgICBjb250ZXh0LlByb3ZpZGVyID0ge1xuICAgICAgJCR0eXBlb2Y6IFJFQUNUX1BST1ZJREVSX1RZUEUsXG4gICAgICBfY29udGV4dDogY29udGV4dFxuICAgIH07XG4gICAgdmFyIGhhc1dhcm5lZEFib3V0VXNpbmdOZXN0ZWRDb250ZXh0Q29uc3VtZXJzID0gZmFsc2U7XG4gICAgdmFyIGhhc1dhcm5lZEFib3V0VXNpbmdDb25zdW1lclByb3ZpZGVyID0gZmFsc2U7XG5cbiAgICB7XG4gICAgICAvLyBBIHNlcGFyYXRlIG9iamVjdCwgYnV0IHByb3hpZXMgYmFjayB0byB0aGUgb3JpZ2luYWwgY29udGV4dCBvYmplY3QgZm9yXG4gICAgICAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS4gSXQgaGFzIGEgZGlmZmVyZW50ICQkdHlwZW9mLCBzbyB3ZSBjYW4gcHJvcGVybHlcbiAgICAgIC8vIHdhcm4gZm9yIHRoZSBpbmNvcnJlY3QgdXNhZ2Ugb2YgQ29udGV4dCBhcyBhIENvbnN1bWVyLlxuICAgICAgdmFyIENvbnN1bWVyID0ge1xuICAgICAgICAkJHR5cGVvZjogUkVBQ1RfQ09OVEVYVF9UWVBFLFxuICAgICAgICBfY29udGV4dDogY29udGV4dCxcbiAgICAgICAgX2NhbGN1bGF0ZUNoYW5nZWRCaXRzOiBjb250ZXh0Ll9jYWxjdWxhdGVDaGFuZ2VkQml0c1xuICAgICAgfTsgLy8gJEZsb3dGaXhNZTogRmxvdyBjb21wbGFpbnMgYWJvdXQgbm90IHNldHRpbmcgYSB2YWx1ZSwgd2hpY2ggaXMgaW50ZW50aW9uYWwgaGVyZVxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhDb25zdW1lciwge1xuICAgICAgICBQcm92aWRlcjoge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFoYXNXYXJuZWRBYm91dFVzaW5nQ29uc3VtZXJQcm92aWRlcikge1xuICAgICAgICAgICAgICBoYXNXYXJuZWRBYm91dFVzaW5nQ29uc3VtZXJQcm92aWRlciA9IHRydWU7XG5cbiAgICAgICAgICAgICAgZXJyb3IoJ1JlbmRlcmluZyA8Q29udGV4dC5Db25zdW1lci5Qcm92aWRlcj4gaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgKyAnYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIHJlbmRlciA8Q29udGV4dC5Qcm92aWRlcj4gaW5zdGVhZD8nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuUHJvdmlkZXI7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChfUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuUHJvdmlkZXIgPSBfUHJvdmlkZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfY3VycmVudFZhbHVlOiB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGV4dC5fY3VycmVudFZhbHVlO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbiAoX2N1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgY29udGV4dC5fY3VycmVudFZhbHVlID0gX2N1cnJlbnRWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIF9jdXJyZW50VmFsdWUyOiB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGV4dC5fY3VycmVudFZhbHVlMjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24gKF9jdXJyZW50VmFsdWUyKSB7XG4gICAgICAgICAgICBjb250ZXh0Ll9jdXJyZW50VmFsdWUyID0gX2N1cnJlbnRWYWx1ZTI7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfdGhyZWFkQ291bnQ6IHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0Ll90aHJlYWRDb3VudDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24gKF90aHJlYWRDb3VudCkge1xuICAgICAgICAgICAgY29udGV4dC5fdGhyZWFkQ291bnQgPSBfdGhyZWFkQ291bnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBDb25zdW1lcjoge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFoYXNXYXJuZWRBYm91dFVzaW5nTmVzdGVkQ29udGV4dENvbnN1bWVycykge1xuICAgICAgICAgICAgICBoYXNXYXJuZWRBYm91dFVzaW5nTmVzdGVkQ29udGV4dENvbnN1bWVycyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgZXJyb3IoJ1JlbmRlcmluZyA8Q29udGV4dC5Db25zdW1lci5Db25zdW1lcj4gaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgKyAnYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIHJlbmRlciA8Q29udGV4dC5Db25zdW1lcj4gaW5zdGVhZD8nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQuQ29uc3VtZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTsgLy8gJEZsb3dGaXhNZTogRmxvdyBjb21wbGFpbnMgYWJvdXQgbWlzc2luZyBwcm9wZXJ0aWVzIGJlY2F1c2UgaXQgZG9lc24ndCB1bmRlcnN0YW5kIGRlZmluZVByb3BlcnR5XG5cbiAgICAgIGNvbnRleHQuQ29uc3VtZXIgPSBDb25zdW1lcjtcbiAgICB9XG5cbiAgICB7XG4gICAgICBjb250ZXh0Ll9jdXJyZW50UmVuZGVyZXIgPSBudWxsO1xuICAgICAgY29udGV4dC5fY3VycmVudFJlbmRlcmVyMiA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsYXp5KGN0b3IpIHtcbiAgICB2YXIgbGF6eVR5cGUgPSB7XG4gICAgICAkJHR5cGVvZjogUkVBQ1RfTEFaWV9UWVBFLFxuICAgICAgX2N0b3I6IGN0b3IsXG4gICAgICAvLyBSZWFjdCB1c2VzIHRoZXNlIGZpZWxkcyB0byBzdG9yZSB0aGUgcmVzdWx0LlxuICAgICAgX3N0YXR1czogLTEsXG4gICAgICBfcmVzdWx0OiBudWxsXG4gICAgfTtcblxuICAgIHtcbiAgICAgIC8vIEluIHByb2R1Y3Rpb24sIHRoaXMgd291bGQganVzdCBzZXQgaXQgb24gdGhlIG9iamVjdC5cbiAgICAgIHZhciBkZWZhdWx0UHJvcHM7XG4gICAgICB2YXIgcHJvcFR5cGVzO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobGF6eVR5cGUsIHtcbiAgICAgICAgZGVmYXVsdFByb3BzOiB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRQcm9wcztcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0RlZmF1bHRQcm9wcykge1xuICAgICAgICAgICAgZXJyb3IoJ1JlYWN0LmxhenkoLi4uKTogSXQgaXMgbm90IHN1cHBvcnRlZCB0byBhc3NpZ24gYGRlZmF1bHRQcm9wc2AgdG8gJyArICdhIGxhenkgY29tcG9uZW50IGltcG9ydC4gRWl0aGVyIHNwZWNpZnkgdGhlbSB3aGVyZSB0aGUgY29tcG9uZW50ICcgKyAnaXMgZGVmaW5lZCwgb3IgY3JlYXRlIGEgd3JhcHBpbmcgY29tcG9uZW50IGFyb3VuZCBpdC4nKTtcblxuICAgICAgICAgICAgZGVmYXVsdFByb3BzID0gbmV3RGVmYXVsdFByb3BzOyAvLyBNYXRjaCBwcm9kdWN0aW9uIGJlaGF2aW9yIG1vcmUgY2xvc2VseTpcblxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxhenlUeXBlLCAnZGVmYXVsdFByb3BzJywge1xuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHByb3BUeXBlczoge1xuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wVHlwZXM7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdQcm9wVHlwZXMpIHtcbiAgICAgICAgICAgIGVycm9yKCdSZWFjdC5sYXp5KC4uLik6IEl0IGlzIG5vdCBzdXBwb3J0ZWQgdG8gYXNzaWduIGBwcm9wVHlwZXNgIHRvICcgKyAnYSBsYXp5IGNvbXBvbmVudCBpbXBvcnQuIEVpdGhlciBzcGVjaWZ5IHRoZW0gd2hlcmUgdGhlIGNvbXBvbmVudCAnICsgJ2lzIGRlZmluZWQsIG9yIGNyZWF0ZSBhIHdyYXBwaW5nIGNvbXBvbmVudCBhcm91bmQgaXQuJyk7XG5cbiAgICAgICAgICAgIHByb3BUeXBlcyA9IG5ld1Byb3BUeXBlczsgLy8gTWF0Y2ggcHJvZHVjdGlvbiBiZWhhdmlvciBtb3JlIGNsb3NlbHk6XG5cbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShsYXp5VHlwZSwgJ3Byb3BUeXBlcycsIHtcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGF6eVR5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBmb3J3YXJkUmVmKHJlbmRlcikge1xuICAgIHtcbiAgICAgIGlmIChyZW5kZXIgIT0gbnVsbCAmJiByZW5kZXIuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSkge1xuICAgICAgICBlcnJvcignZm9yd2FyZFJlZiByZXF1aXJlcyBhIHJlbmRlciBmdW5jdGlvbiBidXQgcmVjZWl2ZWQgYSBgbWVtb2AgJyArICdjb21wb25lbnQuIEluc3RlYWQgb2YgZm9yd2FyZFJlZihtZW1vKC4uLikpLCB1c2UgJyArICdtZW1vKGZvcndhcmRSZWYoLi4uKSkuJyk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZW5kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZXJyb3IoJ2ZvcndhcmRSZWYgcmVxdWlyZXMgYSByZW5kZXIgZnVuY3Rpb24gYnV0IHdhcyBnaXZlbiAlcy4nLCByZW5kZXIgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgcmVuZGVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZW5kZXIubGVuZ3RoICE9PSAwICYmIHJlbmRlci5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgICBlcnJvcignZm9yd2FyZFJlZiByZW5kZXIgZnVuY3Rpb25zIGFjY2VwdCBleGFjdGx5IHR3byBwYXJhbWV0ZXJzOiBwcm9wcyBhbmQgcmVmLiAlcycsIHJlbmRlci5sZW5ndGggPT09IDEgPyAnRGlkIHlvdSBmb3JnZXQgdG8gdXNlIHRoZSByZWYgcGFyYW1ldGVyPycgOiAnQW55IGFkZGl0aW9uYWwgcGFyYW1ldGVyIHdpbGwgYmUgdW5kZWZpbmVkLicpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZW5kZXIgIT0gbnVsbCkge1xuICAgICAgICBpZiAocmVuZGVyLmRlZmF1bHRQcm9wcyAhPSBudWxsIHx8IHJlbmRlci5wcm9wVHlwZXMgIT0gbnVsbCkge1xuICAgICAgICAgIGVycm9yKCdmb3J3YXJkUmVmIHJlbmRlciBmdW5jdGlvbnMgZG8gbm90IHN1cHBvcnQgcHJvcFR5cGVzIG9yIGRlZmF1bHRQcm9wcy4gJyArICdEaWQgeW91IGFjY2lkZW50YWxseSBwYXNzIGEgUmVhY3QgY29tcG9uZW50PycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICQkdHlwZW9mOiBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFLFxuICAgICAgcmVuZGVyOiByZW5kZXJcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gICAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1JFU1BPTkRFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1NDT1BFX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQkxPQ0tfVFlQRSk7XG4gIH1cblxuICBmdW5jdGlvbiBtZW1vKHR5cGUsIGNvbXBhcmUpIHtcbiAgICB7XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSkge1xuICAgICAgICBlcnJvcignbWVtbzogVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBjb21wb25lbnQuIEluc3RlYWQgJyArICdyZWNlaXZlZDogJXMnLCB0eXBlID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAkJHR5cGVvZjogUkVBQ1RfTUVNT19UWVBFLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGNvbXBhcmU6IGNvbXBhcmUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb21wYXJlXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmVEaXNwYXRjaGVyKCkge1xuICAgIHZhciBkaXNwYXRjaGVyID0gUmVhY3RDdXJyZW50RGlzcGF0Y2hlci5jdXJyZW50O1xuXG4gICAgaWYgKCEoZGlzcGF0Y2hlciAhPT0gbnVsbCkpIHtcbiAgICAgIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoIFwiSW52YWxpZCBob29rIGNhbGwuIEhvb2tzIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgb2YgdGhlIGJvZHkgb2YgYSBmdW5jdGlvbiBjb21wb25lbnQuIFRoaXMgY291bGQgaGFwcGVuIGZvciBvbmUgb2YgdGhlIGZvbGxvd2luZyByZWFzb25zOlxcbjEuIFlvdSBtaWdodCBoYXZlIG1pc21hdGNoaW5nIHZlcnNpb25zIG9mIFJlYWN0IGFuZCB0aGUgcmVuZGVyZXIgKHN1Y2ggYXMgUmVhY3QgRE9NKVxcbjIuIFlvdSBtaWdodCBiZSBicmVha2luZyB0aGUgUnVsZXMgb2YgSG9va3NcXG4zLiBZb3UgbWlnaHQgaGF2ZSBtb3JlIHRoYW4gb25lIGNvcHkgb2YgUmVhY3QgaW4gdGhlIHNhbWUgYXBwXFxuU2VlIGh0dHBzOi8vZmIubWUvcmVhY3QtaW52YWxpZC1ob29rLWNhbGwgZm9yIHRpcHMgYWJvdXQgaG93IHRvIGRlYnVnIGFuZCBmaXggdGhpcyBwcm9ibGVtLlwiICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3BhdGNoZXI7XG4gIH1cblxuICBmdW5jdGlvbiB1c2VDb250ZXh0KENvbnRleHQsIHVuc3RhYmxlX29ic2VydmVkQml0cykge1xuICAgIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcblxuICAgIHtcbiAgICAgIGlmICh1bnN0YWJsZV9vYnNlcnZlZEJpdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlcnJvcigndXNlQ29udGV4dCgpIHNlY29uZCBhcmd1bWVudCBpcyByZXNlcnZlZCBmb3IgZnV0dXJlICcgKyAndXNlIGluIFJlYWN0LiBQYXNzaW5nIGl0IGlzIG5vdCBzdXBwb3J0ZWQuICcgKyAnWW91IHBhc3NlZDogJXMuJXMnLCB1bnN0YWJsZV9vYnNlcnZlZEJpdHMsIHR5cGVvZiB1bnN0YWJsZV9vYnNlcnZlZEJpdHMgPT09ICdudW1iZXInICYmIEFycmF5LmlzQXJyYXkoYXJndW1lbnRzWzJdKSA/ICdcXG5cXG5EaWQgeW91IGNhbGwgYXJyYXkubWFwKHVzZUNvbnRleHQpPyAnICsgJ0NhbGxpbmcgSG9va3MgaW5zaWRlIGEgbG9vcCBpcyBub3Qgc3VwcG9ydGVkLiAnICsgJ0xlYXJuIG1vcmUgYXQgaHR0cHM6Ly9mYi5tZS9ydWxlcy1vZi1ob29rcycgOiAnJyk7XG4gICAgICB9IC8vIFRPRE86IGFkZCBhIG1vcmUgZ2VuZXJpYyB3YXJuaW5nIGZvciBpbnZhbGlkIHZhbHVlcy5cblxuXG4gICAgICBpZiAoQ29udGV4dC5fY29udGV4dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciByZWFsQ29udGV4dCA9IENvbnRleHQuX2NvbnRleHQ7IC8vIERvbid0IGRlZHVwbGljYXRlIGJlY2F1c2UgdGhpcyBsZWdpdGltYXRlbHkgY2F1c2VzIGJ1Z3NcbiAgICAgICAgLy8gYW5kIG5vYm9keSBzaG91bGQgYmUgdXNpbmcgdGhpcyBpbiBleGlzdGluZyBjb2RlLlxuXG4gICAgICAgIGlmIChyZWFsQ29udGV4dC5Db25zdW1lciA9PT0gQ29udGV4dCkge1xuICAgICAgICAgIGVycm9yKCdDYWxsaW5nIHVzZUNvbnRleHQoQ29udGV4dC5Db25zdW1lcikgaXMgbm90IHN1cHBvcnRlZCwgbWF5IGNhdXNlIGJ1Z3MsIGFuZCB3aWxsIGJlICcgKyAncmVtb3ZlZCBpbiBhIGZ1dHVyZSBtYWpvciByZWxlYXNlLiBEaWQgeW91IG1lYW4gdG8gY2FsbCB1c2VDb250ZXh0KENvbnRleHQpIGluc3RlYWQ/Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAocmVhbENvbnRleHQuUHJvdmlkZXIgPT09IENvbnRleHQpIHtcbiAgICAgICAgICBlcnJvcignQ2FsbGluZyB1c2VDb250ZXh0KENvbnRleHQuUHJvdmlkZXIpIGlzIG5vdCBzdXBwb3J0ZWQuICcgKyAnRGlkIHlvdSBtZWFuIHRvIGNhbGwgdXNlQ29udGV4dChDb250ZXh0KSBpbnN0ZWFkPycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3BhdGNoZXIudXNlQ29udGV4dChDb250ZXh0LCB1bnN0YWJsZV9vYnNlcnZlZEJpdHMpO1xuICB9XG4gIGZ1bmN0aW9uIHVzZVN0YXRlKGluaXRpYWxTdGF0ZSkge1xuICAgIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VTdGF0ZShpbml0aWFsU3RhdGUpO1xuICB9XG4gIGZ1bmN0aW9uIHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbEFyZywgaW5pdCkge1xuICAgIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxBcmcsIGluaXQpO1xuICB9XG4gIGZ1bmN0aW9uIHVzZVJlZihpbml0aWFsVmFsdWUpIHtcbiAgICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gICAgcmV0dXJuIGRpc3BhdGNoZXIudXNlUmVmKGluaXRpYWxWYWx1ZSk7XG4gIH1cbiAgZnVuY3Rpb24gdXNlRWZmZWN0KGNyZWF0ZSwgZGVwcykge1xuICAgIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VFZmZlY3QoY3JlYXRlLCBkZXBzKTtcbiAgfVxuICBmdW5jdGlvbiB1c2VMYXlvdXRFZmZlY3QoY3JlYXRlLCBkZXBzKSB7XG4gICAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICAgIHJldHVybiBkaXNwYXRjaGVyLnVzZUxheW91dEVmZmVjdChjcmVhdGUsIGRlcHMpO1xuICB9XG4gIGZ1bmN0aW9uIHVzZUNhbGxiYWNrKGNhbGxiYWNrLCBkZXBzKSB7XG4gICAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICAgIHJldHVybiBkaXNwYXRjaGVyLnVzZUNhbGxiYWNrKGNhbGxiYWNrLCBkZXBzKTtcbiAgfVxuICBmdW5jdGlvbiB1c2VNZW1vKGNyZWF0ZSwgZGVwcykge1xuICAgIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VNZW1vKGNyZWF0ZSwgZGVwcyk7XG4gIH1cbiAgZnVuY3Rpb24gdXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsIGNyZWF0ZSwgZGVwcykge1xuICAgIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgICByZXR1cm4gZGlzcGF0Y2hlci51c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgY3JlYXRlLCBkZXBzKTtcbiAgfVxuICBmdW5jdGlvbiB1c2VEZWJ1Z1ZhbHVlKHZhbHVlLCBmb3JtYXR0ZXJGbikge1xuICAgIHtcbiAgICAgIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgICAgIHJldHVybiBkaXNwYXRjaGVyLnVzZURlYnVnVmFsdWUodmFsdWUsIGZvcm1hdHRlckZuKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gICAqXG4gICAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICAgKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gICAqL1xuXG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0XzEgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcblxuICB2YXIgcHJpbnRXYXJuaW5nJDEgPSBmdW5jdGlvbigpIHt9O1xuXG4gIHtcbiAgICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQkMSA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0XzE7XG4gICAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICAgIHZhciBoYXMgPSBGdW5jdGlvbi5jYWxsLmJpbmQoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG5cbiAgICBwcmludFdhcm5pbmckMSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gICAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICAgKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAgKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICAgIHtcbiAgICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgICAgaWYgKGhhcyh0eXBlU3BlY3MsIHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgdmFyIGVyciA9IEVycm9yKFxuICAgICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAgICAgICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0JDEpO1xuICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZXJyb3IgJiYgIShlcnJvciBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICAgICAgcHJpbnRXYXJuaW5nJDEoXG4gICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICcgK1xuICAgICAgICAgICAgICBsb2NhdGlvbiArICcgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAgICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgK1xuICAgICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgICAgcHJpbnRXYXJuaW5nJDEoXG4gICAgICAgICAgICAgICdGYWlsZWQgJyArIGxvY2F0aW9uICsgJyB0eXBlOiAnICsgZXJyb3IubWVzc2FnZSArIChzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB3YXJuaW5nIGNhY2hlIHdoZW4gdGVzdGluZy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlID0gZnVuY3Rpb24oKSB7XG4gICAge1xuICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG4gICAgfVxuICB9O1xuXG4gIHZhciBjaGVja1Byb3BUeXBlc18xID0gY2hlY2tQcm9wVHlwZXM7XG5cbiAgdmFyIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duO1xuXG4gIHtcbiAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICAgIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKTtcblxuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICdcXG5cXG5DaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKHNvdXJjZSkge1xuICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGZpbGVOYW1lID0gc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICAgIHZhciBsaW5lTnVtYmVyID0gc291cmNlLmxpbmVOdW1iZXI7XG4gICAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHlvdXIgY29kZSBhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBsaW5lTnVtYmVyICsgJy4nO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtRm9yUHJvcHMoZWxlbWVudFByb3BzKSB7XG4gICAgaWYgKGVsZW1lbnRQcm9wcyAhPT0gbnVsbCAmJiBlbGVtZW50UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKGVsZW1lbnRQcm9wcy5fX3NvdXJjZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9XG4gIC8qKlxuICAgKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gICAqIG9iamVjdCBrZXlzIGFyZSBub3QgdmFsaWQuIFRoaXMgYWxsb3dzIHVzIHRvIGtlZXAgdHJhY2sgb2YgY2hpbGRyZW4gYmV0d2VlblxuICAgKiB1cGRhdGVzLlxuICAgKi9cblxuXG4gIHZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpIHtcbiAgICB2YXIgaW5mbyA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICB2YXIgcGFyZW50TmFtZSA9IHR5cGVvZiBwYXJlbnRUeXBlID09PSAnc3RyaW5nJyA/IHBhcmVudFR5cGUgOiBwYXJlbnRUeXBlLmRpc3BsYXlOYW1lIHx8IHBhcmVudFR5cGUubmFtZTtcblxuICAgICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgICAgaW5mbyA9IFwiXFxuXFxuQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8XCIgKyBwYXJlbnROYW1lICsgXCI+LlwiO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbmZvO1xuICB9XG4gIC8qKlxuICAgKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gICAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICAgKiByZW9yZGVyZWQuIEFsbCBjaGlsZHJlbiB0aGF0IGhhdmVuJ3QgYWxyZWFkeSBiZWVuIHZhbGlkYXRlZCBhcmUgcmVxdWlyZWQgdG9cbiAgICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gICAqIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICAgKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gICAqL1xuXG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gICAgaWYgKCFlbGVtZW50Ll9zdG9yZSB8fCBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgfHwgZWxlbWVudC5rZXkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgdmFyIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8gPSBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpO1xuXG4gICAgaWYgKG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSA9IHRydWU7IC8vIFVzdWFsbHkgdGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIG9mZmVuZGVyLCBidXQgaWYgaXQgYWNjZXB0cyBjaGlsZHJlbiBhcyBhXG4gICAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAgIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cblxuICAgIHZhciBjaGlsZE93bmVyID0gJyc7XG5cbiAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Ll9vd25lciAmJiBlbGVtZW50Ll9vd25lciAhPT0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgICBjaGlsZE93bmVyID0gXCIgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gXCIgKyBnZXRDb21wb25lbnROYW1lKGVsZW1lbnQuX293bmVyLnR5cGUpICsgXCIuXCI7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG5cbiAgICB7XG4gICAgICBlcnJvcignRWFjaCBjaGlsZCBpbiBhIGxpc3Qgc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lcik7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQobnVsbCk7XG4gIH1cbiAgLyoqXG4gICAqIEVuc3VyZSB0aGF0IGV2ZXJ5IGVsZW1lbnQgZWl0aGVyIGlzIHBhc3NlZCBpbiBhIHN0YXRpYyBsb2NhdGlvbiwgaW4gYW5cbiAgICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gICAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gICAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBub2RlJ3MgcGFyZW50J3MgdHlwZS5cbiAgICovXG5cblxuICBmdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gICAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcblxuICAgICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShjaGlsZCwgcGFyZW50VHlwZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICAgIG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obm9kZSk7XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBFbnRyeSBpdGVyYXRvcnMgdXNlZCB0byBwcm92aWRlIGltcGxpY2l0IGtleXMsXG4gICAgICAgIC8vIGJ1dCBub3cgd2UgcHJpbnQgYSBzZXBhcmF0ZSB3YXJuaW5nIGZvciB0aGVtIGxhdGVyLlxuICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG5vZGUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuXG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBHaXZlbiBhbiBlbGVtZW50LCB2YWxpZGF0ZSB0aGF0IGl0cyBwcm9wcyBmb2xsb3cgdGhlIHByb3BUeXBlcyBkZWZpbml0aW9uLFxuICAgKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAgICovXG5cblxuICBmdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gICAge1xuICAgICAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XG5cbiAgICAgIGlmICh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUodHlwZSk7XG4gICAgICB2YXIgcHJvcFR5cGVzO1xuXG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJvcFR5cGVzID0gdHlwZS5wcm9wVHlwZXM7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCAvLyBOb3RlOiBNZW1vIG9ubHkgY2hlY2tzIG91dGVyIHByb3BzIGhlcmUuXG4gICAgICAvLyBJbm5lciBwcm9wcyBhcmUgY2hlY2tlZCBpbiB0aGUgcmVjb25jaWxlci5cbiAgICAgIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSkpIHtcbiAgICAgICAgcHJvcFR5cGVzID0gdHlwZS5wcm9wVHlwZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wVHlwZXMpIHtcbiAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIGNoZWNrUHJvcFR5cGVzXzEocHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCAncHJvcCcsIG5hbWUsIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSk7XG4gICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlLlByb3BUeXBlcyAhPT0gdW5kZWZpbmVkICYmICFwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bikge1xuICAgICAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHRydWU7XG5cbiAgICAgICAgZXJyb3IoJ0NvbXBvbmVudCAlcyBkZWNsYXJlZCBgUHJvcFR5cGVzYCBpbnN0ZWFkIG9mIGBwcm9wVHlwZXNgLiBEaWQgeW91IG1pc3NwZWxsIHRoZSBwcm9wZXJ0eSBhc3NpZ25tZW50PycsIG5hbWUgfHwgJ1Vua25vd24nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB0eXBlLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJyAmJiAhdHlwZS5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQpIHtcbiAgICAgICAgZXJyb3IoJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEdpdmVuIGEgZnJhZ21lbnQsIHZhbGlkYXRlIHRoYXQgaXQgY2FuIG9ubHkgYmUgcHJvdmlkZWQgd2l0aCBmcmFnbWVudCBwcm9wc1xuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZnJhZ21lbnRcbiAgICovXG5cblxuICBmdW5jdGlvbiB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZnJhZ21lbnQpIHtcbiAgICB7XG4gICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChmcmFnbWVudCk7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGZyYWdtZW50LnByb3BzKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgIGlmIChrZXkgIT09ICdjaGlsZHJlbicgJiYga2V5ICE9PSAna2V5Jykge1xuICAgICAgICAgIGVycm9yKCdJbnZhbGlkIHByb3AgYCVzYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLiAnICsgJ1JlYWN0LkZyYWdtZW50IGNhbiBvbmx5IGhhdmUgYGtleWAgYW5kIGBjaGlsZHJlbmAgcHJvcHMuJywga2V5KTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmcmFnbWVudC5yZWYgIT09IG51bGwpIHtcbiAgICAgICAgZXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGByZWZgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuJyk7XG4gICAgICB9XG5cbiAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24odHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIHZhbGlkVHlwZSA9IGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKTsgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuXG4gICAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICAgIHZhciBpbmZvID0gJyc7XG5cbiAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgXCJpdCdzIGRlZmluZWQgaW4sIG9yIHlvdSBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIG5hbWVkIGltcG9ydHMuXCI7XG4gICAgICB9XG5cbiAgICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW1Gb3JQcm9wcyhwcm9wcyk7XG5cbiAgICAgIGlmIChzb3VyY2VJbmZvKSB7XG4gICAgICAgIGluZm8gKz0gc291cmNlSW5mbztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZm8gKz0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0eXBlU3RyaW5nO1xuXG4gICAgICBpZiAodHlwZSA9PT0gbnVsbCkge1xuICAgICAgICB0eXBlU3RyaW5nID0gJ251bGwnO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSAnYXJyYXknO1xuICAgICAgfSBlbHNlIGlmICh0eXBlICE9PSB1bmRlZmluZWQgJiYgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSBcIjxcIiArIChnZXRDb21wb25lbnROYW1lKHR5cGUudHlwZSkgfHwgJ1Vua25vd24nKSArIFwiIC8+XCI7XG4gICAgICAgIGluZm8gPSAnIERpZCB5b3UgYWNjaWRlbnRhbGx5IGV4cG9ydCBhIEpTWCBsaXRlcmFsIGluc3RlYWQgb2YgYSBjb21wb25lbnQ/JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGVTdHJpbmcgPSB0eXBlb2YgdHlwZTtcbiAgICAgIH1cblxuICAgICAge1xuICAgICAgICBlcnJvcignUmVhY3QuY3JlYXRlRWxlbWVudDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlU3RyaW5nLCBpbmZvKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG5cbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9IC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcblxuXG4gICAgaWYgKHZhbGlkVHlwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSkge1xuICAgICAgdmFsaWRhdGVGcmFnbWVudFByb3BzKGVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuICB2YXIgZGlkV2FybkFib3V0RGVwcmVjYXRlZENyZWF0ZUZhY3RvcnkgPSBmYWxzZTtcbiAgZnVuY3Rpb24gY3JlYXRlRmFjdG9yeVdpdGhWYWxpZGF0aW9uKHR5cGUpIHtcbiAgICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IGNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbi5iaW5kKG51bGwsIHR5cGUpO1xuICAgIHZhbGlkYXRlZEZhY3RvcnkudHlwZSA9IHR5cGU7XG5cbiAgICB7XG4gICAgICBpZiAoIWRpZFdhcm5BYm91dERlcHJlY2F0ZWRDcmVhdGVGYWN0b3J5KSB7XG4gICAgICAgIGRpZFdhcm5BYm91dERlcHJlY2F0ZWRDcmVhdGVGYWN0b3J5ID0gdHJ1ZTtcblxuICAgICAgICB3YXJuKCdSZWFjdC5jcmVhdGVGYWN0b3J5KCkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgKyAnYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gQ29uc2lkZXIgdXNpbmcgSlNYICcgKyAnb3IgdXNlIFJlYWN0LmNyZWF0ZUVsZW1lbnQoKSBkaXJlY3RseSBpbnN0ZWFkLicpO1xuICAgICAgfSAvLyBMZWdhY3kgaG9vazogcmVtb3ZlIGl0XG5cblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgd2FybignRmFjdG9yeS50eXBlIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB0aGUgY2xhc3MgZGlyZWN0bHkgJyArICdiZWZvcmUgcGFzc2luZyBpdCB0byBjcmVhdGVGYWN0b3J5LicpO1xuXG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0eXBlJywge1xuICAgICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRlZEZhY3Rvcnk7XG4gIH1cbiAgZnVuY3Rpb24gY2xvbmVFbGVtZW50V2l0aFZhbGlkYXRpb24oZWxlbWVudCwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIG5ld0VsZW1lbnQgPSBjbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIG5ld0VsZW1lbnQudHlwZSk7XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gIH1cblxuICB2YXIgZW5hYmxlU2NoZWR1bGVyRGVidWdnaW5nID0gZmFsc2U7XG4gIHZhciBlbmFibGVQcm9maWxpbmcgPSB0cnVlO1xuXG4gIHZhciByZXF1ZXN0SG9zdENhbGxiYWNrO1xuICB2YXIgcmVxdWVzdEhvc3RUaW1lb3V0O1xuICB2YXIgY2FuY2VsSG9zdFRpbWVvdXQ7XG4gIHZhciBzaG91bGRZaWVsZFRvSG9zdDtcbiAgdmFyIHJlcXVlc3RQYWludDtcbiAgdmFyIGdldEN1cnJlbnRUaW1lO1xuICB2YXIgZm9yY2VGcmFtZVJhdGU7XG5cbiAgaWYgKCAvLyBJZiBTY2hlZHVsZXIgcnVucyBpbiBhIG5vbi1ET00gZW52aXJvbm1lbnQsIGl0IGZhbGxzIGJhY2sgdG8gYSBuYWl2ZVxuICAvLyBpbXBsZW1lbnRhdGlvbiB1c2luZyBzZXRUaW1lb3V0LlxuICB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAvLyBDaGVjayBpZiBNZXNzYWdlQ2hhbm5lbCBpcyBzdXBwb3J0ZWQsIHRvby5cbiAgdHlwZW9mIE1lc3NhZ2VDaGFubmVsICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gSWYgdGhpcyBhY2NpZGVudGFsbHkgZ2V0cyBpbXBvcnRlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LCBlLmcuIEphdmFTY3JpcHRDb3JlLFxuICAgIC8vIGZhbGxiYWNrIHRvIGEgbmFpdmUgaW1wbGVtZW50YXRpb24uXG4gICAgdmFyIF9jYWxsYmFjayA9IG51bGw7XG4gICAgdmFyIF90aW1lb3V0SUQgPSBudWxsO1xuXG4gICAgdmFyIF9mbHVzaENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKF9jYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBjdXJyZW50VGltZSA9IGdldEN1cnJlbnRUaW1lKCk7XG4gICAgICAgICAgdmFyIGhhc1JlbWFpbmluZ1RpbWUgPSB0cnVlO1xuXG4gICAgICAgICAgX2NhbGxiYWNrKGhhc1JlbWFpbmluZ1RpbWUsIGN1cnJlbnRUaW1lKTtcblxuICAgICAgICAgIF9jYWxsYmFjayA9IG51bGw7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KF9mbHVzaENhbGxiYWNrLCAwKTtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBpbml0aWFsVGltZSA9IERhdGUubm93KCk7XG5cbiAgICBnZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBEYXRlLm5vdygpIC0gaW5pdGlhbFRpbWU7XG4gICAgfTtcblxuICAgIHJlcXVlc3RIb3N0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIGlmIChfY2FsbGJhY2sgIT09IG51bGwpIHtcbiAgICAgICAgLy8gUHJvdGVjdCBhZ2FpbnN0IHJlLWVudHJhbmN5LlxuICAgICAgICBzZXRUaW1lb3V0KHJlcXVlc3RIb3N0Q2FsbGJhY2ssIDAsIGNiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9jYWxsYmFjayA9IGNiO1xuICAgICAgICBzZXRUaW1lb3V0KF9mbHVzaENhbGxiYWNrLCAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVxdWVzdEhvc3RUaW1lb3V0ID0gZnVuY3Rpb24gKGNiLCBtcykge1xuICAgICAgX3RpbWVvdXRJRCA9IHNldFRpbWVvdXQoY2IsIG1zKTtcbiAgICB9O1xuXG4gICAgY2FuY2VsSG9zdFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjbGVhclRpbWVvdXQoX3RpbWVvdXRJRCk7XG4gICAgfTtcblxuICAgIHNob3VsZFlpZWxkVG9Ib3N0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICByZXF1ZXN0UGFpbnQgPSBmb3JjZUZyYW1lUmF0ZSA9IGZ1bmN0aW9uICgpIHt9O1xuICB9IGVsc2Uge1xuICAgIC8vIENhcHR1cmUgbG9jYWwgcmVmZXJlbmNlcyB0byBuYXRpdmUgQVBJcywgaW4gY2FzZSBhIHBvbHlmaWxsIG92ZXJyaWRlcyB0aGVtLlxuICAgIHZhciBwZXJmb3JtYW5jZSA9IHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgICB2YXIgX0RhdGUgPSB3aW5kb3cuRGF0ZTtcbiAgICB2YXIgX3NldFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dDtcbiAgICB2YXIgX2NsZWFyVGltZW91dCA9IHdpbmRvdy5jbGVhclRpbWVvdXQ7XG5cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBUT0RPOiBTY2hlZHVsZXIgbm8gbG9uZ2VyIHJlcXVpcmVzIHRoZXNlIG1ldGhvZHMgdG8gYmUgcG9seWZpbGxlZC4gQnV0XG4gICAgICAvLyBtYXliZSB3ZSB3YW50IHRvIGNvbnRpbnVlIHdhcm5pbmcgaWYgdGhleSBkb24ndCBleGlzdCwgdG8gcHJlc2VydmUgdGhlXG4gICAgICAvLyBvcHRpb24gdG8gcmVseSBvbiBpdCBpbiB0aGUgZnV0dXJlP1xuICAgICAgdmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gICAgICB2YXIgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWU7IC8vIFRPRE86IFJlbW92ZSBmYi5tZSBsaW5rXG5cbiAgICAgIGlmICh0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFVzaW5nIGNvbnNvbGVbJ2Vycm9yJ10gdG8gZXZhZGUgQmFiZWwgYW5kIEVTTGludFxuICAgICAgICBjb25zb2xlWydlcnJvciddKFwiVGhpcyBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUuIFwiICsgJ01ha2Ugc3VyZSB0aGF0IHlvdSBsb2FkIGEgJyArICdwb2x5ZmlsbCBpbiBvbGRlciBicm93c2Vycy4gaHR0cHM6Ly9mYi5tZS9yZWFjdC1wb2x5ZmlsbHMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjYW5jZWxBbmltYXRpb25GcmFtZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBVc2luZyBjb25zb2xlWydlcnJvciddIHRvIGV2YWRlIEJhYmVsIGFuZCBFU0xpbnRcbiAgICAgICAgY29uc29sZVsnZXJyb3InXShcIlRoaXMgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgY2FuY2VsQW5pbWF0aW9uRnJhbWUuIFwiICsgJ01ha2Ugc3VyZSB0aGF0IHlvdSBsb2FkIGEgJyArICdwb2x5ZmlsbCBpbiBvbGRlciBicm93c2Vycy4gaHR0cHM6Ly9mYi5tZS9yZWFjdC1wb2x5ZmlsbHMnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHBlcmZvcm1hbmNlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBnZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9pbml0aWFsVGltZSA9IF9EYXRlLm5vdygpO1xuXG4gICAgICBnZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9EYXRlLm5vdygpIC0gX2luaXRpYWxUaW1lO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgaXNNZXNzYWdlTG9vcFJ1bm5pbmcgPSBmYWxzZTtcbiAgICB2YXIgc2NoZWR1bGVkSG9zdENhbGxiYWNrID0gbnVsbDtcbiAgICB2YXIgdGFza1RpbWVvdXRJRCA9IC0xOyAvLyBTY2hlZHVsZXIgcGVyaW9kaWNhbGx5IHlpZWxkcyBpbiBjYXNlIHRoZXJlIGlzIG90aGVyIHdvcmsgb24gdGhlIG1haW5cbiAgICAvLyB0aHJlYWQsIGxpa2UgdXNlciBldmVudHMuIEJ5IGRlZmF1bHQsIGl0IHlpZWxkcyBtdWx0aXBsZSB0aW1lcyBwZXIgZnJhbWUuXG4gICAgLy8gSXQgZG9lcyBub3QgYXR0ZW1wdCB0byBhbGlnbiB3aXRoIGZyYW1lIGJvdW5kYXJpZXMsIHNpbmNlIG1vc3QgdGFza3MgZG9uJ3RcbiAgICAvLyBuZWVkIHRvIGJlIGZyYW1lIGFsaWduZWQ7IGZvciB0aG9zZSB0aGF0IGRvLCB1c2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLlxuXG4gICAgdmFyIHlpZWxkSW50ZXJ2YWwgPSA1O1xuICAgIHZhciBkZWFkbGluZSA9IDA7IC8vIFRPRE86IE1ha2UgdGhpcyBjb25maWd1cmFibGVcblxuICAgIHtcbiAgICAgIC8vIGBpc0lucHV0UGVuZGluZ2AgaXMgbm90IGF2YWlsYWJsZS4gU2luY2Ugd2UgaGF2ZSBubyB3YXkgb2Yga25vd2luZyBpZlxuICAgICAgLy8gdGhlcmUncyBwZW5kaW5nIGlucHV0LCBhbHdheXMgeWllbGQgYXQgdGhlIGVuZCBvZiB0aGUgZnJhbWUuXG4gICAgICBzaG91bGRZaWVsZFRvSG9zdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdldEN1cnJlbnRUaW1lKCkgPj0gZGVhZGxpbmU7XG4gICAgICB9OyAvLyBTaW5jZSB3ZSB5aWVsZCBldmVyeSBmcmFtZSByZWdhcmRsZXNzLCBgcmVxdWVzdFBhaW50YCBoYXMgbm8gZWZmZWN0LlxuXG5cbiAgICAgIHJlcXVlc3RQYWludCA9IGZ1bmN0aW9uICgpIHt9O1xuICAgIH1cblxuICAgIGZvcmNlRnJhbWVSYXRlID0gZnVuY3Rpb24gKGZwcykge1xuICAgICAgaWYgKGZwcyA8IDAgfHwgZnBzID4gMTI1KSB7XG4gICAgICAgIC8vIFVzaW5nIGNvbnNvbGVbJ2Vycm9yJ10gdG8gZXZhZGUgQmFiZWwgYW5kIEVTTGludFxuICAgICAgICBjb25zb2xlWydlcnJvciddKCdmb3JjZUZyYW1lUmF0ZSB0YWtlcyBhIHBvc2l0aXZlIGludCBiZXR3ZWVuIDAgYW5kIDEyNSwgJyArICdmb3JjaW5nIGZyYW1lcmF0ZXMgaGlnaGVyIHRoYW4gMTI1IGZwcyBpcyBub3QgdW5zdXBwb3J0ZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZnBzID4gMCkge1xuICAgICAgICB5aWVsZEludGVydmFsID0gTWF0aC5mbG9vcigxMDAwIC8gZnBzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlc2V0IHRoZSBmcmFtZXJhdGVcbiAgICAgICAgeWllbGRJbnRlcnZhbCA9IDU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBwZXJmb3JtV29ya1VudGlsRGVhZGxpbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2NoZWR1bGVkSG9zdENhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBjdXJyZW50VGltZSA9IGdldEN1cnJlbnRUaW1lKCk7IC8vIFlpZWxkIGFmdGVyIGB5aWVsZEludGVydmFsYCBtcywgcmVnYXJkbGVzcyBvZiB3aGVyZSB3ZSBhcmUgaW4gdGhlIHZzeW5jXG4gICAgICAgIC8vIGN5Y2xlLiBUaGlzIG1lYW5zIHRoZXJlJ3MgYWx3YXlzIHRpbWUgcmVtYWluaW5nIGF0IHRoZSBiZWdpbm5pbmcgb2ZcbiAgICAgICAgLy8gdGhlIG1lc3NhZ2UgZXZlbnQuXG5cbiAgICAgICAgZGVhZGxpbmUgPSBjdXJyZW50VGltZSArIHlpZWxkSW50ZXJ2YWw7XG4gICAgICAgIHZhciBoYXNUaW1lUmVtYWluaW5nID0gdHJ1ZTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBoYXNNb3JlV29yayA9IHNjaGVkdWxlZEhvc3RDYWxsYmFjayhoYXNUaW1lUmVtYWluaW5nLCBjdXJyZW50VGltZSk7XG5cbiAgICAgICAgICBpZiAoIWhhc01vcmVXb3JrKSB7XG4gICAgICAgICAgICBpc01lc3NhZ2VMb29wUnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgc2NoZWR1bGVkSG9zdENhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgdGhlcmUncyBtb3JlIHdvcmssIHNjaGVkdWxlIHRoZSBuZXh0IG1lc3NhZ2UgZXZlbnQgYXQgdGhlIGVuZFxuICAgICAgICAgICAgLy8gb2YgdGhlIHByZWNlZGluZyBvbmUuXG4gICAgICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHNjaGVkdWxlciB0YXNrIHRocm93cywgZXhpdCB0aGUgY3VycmVudCBicm93c2VyIHRhc2sgc28gdGhlXG4gICAgICAgICAgLy8gZXJyb3IgY2FuIGJlIG9ic2VydmVkLlxuICAgICAgICAgIHBvcnQucG9zdE1lc3NhZ2UobnVsbCk7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzTWVzc2FnZUxvb3BSdW5uaW5nID0gZmFsc2U7XG4gICAgICB9IC8vIFlpZWxkaW5nIHRvIHRoZSBicm93c2VyIHdpbGwgZ2l2ZSBpdCBhIGNoYW5jZSB0byBwYWludCwgc28gd2UgY2FuXG4gICAgfTtcblxuICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgdmFyIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gcGVyZm9ybVdvcmtVbnRpbERlYWRsaW5lO1xuXG4gICAgcmVxdWVzdEhvc3RDYWxsYmFjayA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgc2NoZWR1bGVkSG9zdENhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICAgIGlmICghaXNNZXNzYWdlTG9vcFJ1bm5pbmcpIHtcbiAgICAgICAgaXNNZXNzYWdlTG9vcFJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICBwb3J0LnBvc3RNZXNzYWdlKG51bGwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXF1ZXN0SG9zdFRpbWVvdXQgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIG1zKSB7XG4gICAgICB0YXNrVGltZW91dElEID0gX3NldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxsYmFjayhnZXRDdXJyZW50VGltZSgpKTtcbiAgICAgIH0sIG1zKTtcbiAgICB9O1xuXG4gICAgY2FuY2VsSG9zdFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfY2xlYXJUaW1lb3V0KHRhc2tUaW1lb3V0SUQpO1xuXG4gICAgICB0YXNrVGltZW91dElEID0gLTE7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1c2goaGVhcCwgbm9kZSkge1xuICAgIHZhciBpbmRleCA9IGhlYXAubGVuZ3RoO1xuICAgIGhlYXAucHVzaChub2RlKTtcbiAgICBzaWZ0VXAoaGVhcCwgbm9kZSwgaW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIHBlZWsoaGVhcCkge1xuICAgIHZhciBmaXJzdCA9IGhlYXBbMF07XG4gICAgcmV0dXJuIGZpcnN0ID09PSB1bmRlZmluZWQgPyBudWxsIDogZmlyc3Q7XG4gIH1cbiAgZnVuY3Rpb24gcG9wKGhlYXApIHtcbiAgICB2YXIgZmlyc3QgPSBoZWFwWzBdO1xuXG4gICAgaWYgKGZpcnN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBsYXN0ID0gaGVhcC5wb3AoKTtcblxuICAgICAgaWYgKGxhc3QgIT09IGZpcnN0KSB7XG4gICAgICAgIGhlYXBbMF0gPSBsYXN0O1xuICAgICAgICBzaWZ0RG93bihoZWFwLCBsYXN0LCAwKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZpcnN0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaWZ0VXAoaGVhcCwgbm9kZSwgaSkge1xuICAgIHZhciBpbmRleCA9IGk7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdmFyIHBhcmVudEluZGV4ID0gaW5kZXggLSAxID4+PiAxO1xuICAgICAgdmFyIHBhcmVudCA9IGhlYXBbcGFyZW50SW5kZXhdO1xuXG4gICAgICBpZiAocGFyZW50ICE9PSB1bmRlZmluZWQgJiYgY29tcGFyZShwYXJlbnQsIG5vZGUpID4gMCkge1xuICAgICAgICAvLyBUaGUgcGFyZW50IGlzIGxhcmdlci4gU3dhcCBwb3NpdGlvbnMuXG4gICAgICAgIGhlYXBbcGFyZW50SW5kZXhdID0gbm9kZTtcbiAgICAgICAgaGVhcFtpbmRleF0gPSBwYXJlbnQ7XG4gICAgICAgIGluZGV4ID0gcGFyZW50SW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGUgcGFyZW50IGlzIHNtYWxsZXIuIEV4aXQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaWZ0RG93bihoZWFwLCBub2RlLCBpKSB7XG4gICAgdmFyIGluZGV4ID0gaTtcbiAgICB2YXIgbGVuZ3RoID0gaGVhcC5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBsZWZ0SW5kZXggPSAoaW5kZXggKyAxKSAqIDIgLSAxO1xuICAgICAgdmFyIGxlZnQgPSBoZWFwW2xlZnRJbmRleF07XG4gICAgICB2YXIgcmlnaHRJbmRleCA9IGxlZnRJbmRleCArIDE7XG4gICAgICB2YXIgcmlnaHQgPSBoZWFwW3JpZ2h0SW5kZXhdOyAvLyBJZiB0aGUgbGVmdCBvciByaWdodCBub2RlIGlzIHNtYWxsZXIsIHN3YXAgd2l0aCB0aGUgc21hbGxlciBvZiB0aG9zZS5cblxuICAgICAgaWYgKGxlZnQgIT09IHVuZGVmaW5lZCAmJiBjb21wYXJlKGxlZnQsIG5vZGUpIDwgMCkge1xuICAgICAgICBpZiAocmlnaHQgIT09IHVuZGVmaW5lZCAmJiBjb21wYXJlKHJpZ2h0LCBsZWZ0KSA8IDApIHtcbiAgICAgICAgICBoZWFwW2luZGV4XSA9IHJpZ2h0O1xuICAgICAgICAgIGhlYXBbcmlnaHRJbmRleF0gPSBub2RlO1xuICAgICAgICAgIGluZGV4ID0gcmlnaHRJbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoZWFwW2luZGV4XSA9IGxlZnQ7XG4gICAgICAgICAgaGVhcFtsZWZ0SW5kZXhdID0gbm9kZTtcbiAgICAgICAgICBpbmRleCA9IGxlZnRJbmRleDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyaWdodCAhPT0gdW5kZWZpbmVkICYmIGNvbXBhcmUocmlnaHQsIG5vZGUpIDwgMCkge1xuICAgICAgICBoZWFwW2luZGV4XSA9IHJpZ2h0O1xuICAgICAgICBoZWFwW3JpZ2h0SW5kZXhdID0gbm9kZTtcbiAgICAgICAgaW5kZXggPSByaWdodEluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmVpdGhlciBjaGlsZCBpcyBzbWFsbGVyLiBFeGl0LlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gICAgLy8gQ29tcGFyZSBzb3J0IGluZGV4IGZpcnN0LCB0aGVuIHRhc2sgaWQuXG4gICAgdmFyIGRpZmYgPSBhLnNvcnRJbmRleCAtIGIuc29ydEluZGV4O1xuICAgIHJldHVybiBkaWZmICE9PSAwID8gZGlmZiA6IGEuaWQgLSBiLmlkO1xuICB9XG5cbiAgLy8gVE9ETzogVXNlIHN5bWJvbHM/XG4gIHZhciBOb1ByaW9yaXR5ID0gMDtcbiAgdmFyIEltbWVkaWF0ZVByaW9yaXR5ID0gMTtcbiAgdmFyIFVzZXJCbG9ja2luZ1ByaW9yaXR5ID0gMjtcbiAgdmFyIE5vcm1hbFByaW9yaXR5ID0gMztcbiAgdmFyIExvd1ByaW9yaXR5ID0gNDtcbiAgdmFyIElkbGVQcmlvcml0eSA9IDU7XG5cbiAgdmFyIHJ1bklkQ291bnRlciA9IDA7XG4gIHZhciBtYWluVGhyZWFkSWRDb3VudGVyID0gMDtcbiAgdmFyIHByb2ZpbGluZ1N0YXRlU2l6ZSA9IDQ7XG4gIHZhciBzaGFyZWRQcm9maWxpbmdCdWZmZXIgPSAgLy8gJEZsb3dGaXhNZSBGbG93IGRvZXNuJ3Qga25vdyBhYm91dCBTaGFyZWRBcnJheUJ1ZmZlclxuICB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICdmdW5jdGlvbicgPyBuZXcgU2hhcmVkQXJyYXlCdWZmZXIocHJvZmlsaW5nU3RhdGVTaXplICogSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCkgOiAvLyAkRmxvd0ZpeE1lIEZsb3cgZG9lc24ndCBrbm93IGFib3V0IEFycmF5QnVmZmVyXG4gIHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBBcnJheUJ1ZmZlcihwcm9maWxpbmdTdGF0ZVNpemUgKiBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKSA6IG51bGwgLy8gRG9uJ3QgY3Jhc2ggdGhlIGluaXQgcGF0aCBvbiBJRTlcbiAgO1xuICB2YXIgcHJvZmlsaW5nU3RhdGUgPSAgc2hhcmVkUHJvZmlsaW5nQnVmZmVyICE9PSBudWxsID8gbmV3IEludDMyQXJyYXkoc2hhcmVkUHJvZmlsaW5nQnVmZmVyKSA6IFtdOyAvLyBXZSBjYW4ndCByZWFkIHRoaXMgYnV0IGl0IGhlbHBzIHNhdmUgYnl0ZXMgZm9yIG51bGwgY2hlY2tzXG5cbiAgdmFyIFBSSU9SSVRZID0gMDtcbiAgdmFyIENVUlJFTlRfVEFTS19JRCA9IDE7XG4gIHZhciBDVVJSRU5UX1JVTl9JRCA9IDI7XG4gIHZhciBRVUVVRV9TSVpFID0gMztcblxuICB7XG4gICAgcHJvZmlsaW5nU3RhdGVbUFJJT1JJVFldID0gTm9Qcmlvcml0eTsgLy8gVGhpcyBpcyBtYWludGFpbmVkIHdpdGggYSBjb3VudGVyLCBiZWNhdXNlIHRoZSBzaXplIG9mIHRoZSBwcmlvcml0eSBxdWV1ZVxuICAgIC8vIGFycmF5IG1pZ2h0IGluY2x1ZGUgY2FuY2VsZWQgdGFza3MuXG5cbiAgICBwcm9maWxpbmdTdGF0ZVtRVUVVRV9TSVpFXSA9IDA7XG4gICAgcHJvZmlsaW5nU3RhdGVbQ1VSUkVOVF9UQVNLX0lEXSA9IDA7XG4gIH0gLy8gQnl0ZXMgcGVyIGVsZW1lbnQgaXMgNFxuXG5cbiAgdmFyIElOSVRJQUxfRVZFTlRfTE9HX1NJWkUgPSAxMzEwNzI7XG4gIHZhciBNQVhfRVZFTlRfTE9HX1NJWkUgPSA1MjQyODg7IC8vIEVxdWl2YWxlbnQgdG8gMiBtZWdhYnl0ZXNcblxuICB2YXIgZXZlbnRMb2dTaXplID0gMDtcbiAgdmFyIGV2ZW50TG9nQnVmZmVyID0gbnVsbDtcbiAgdmFyIGV2ZW50TG9nID0gbnVsbDtcbiAgdmFyIGV2ZW50TG9nSW5kZXggPSAwO1xuICB2YXIgVGFza1N0YXJ0RXZlbnQgPSAxO1xuICB2YXIgVGFza0NvbXBsZXRlRXZlbnQgPSAyO1xuICB2YXIgVGFza0Vycm9yRXZlbnQgPSAzO1xuICB2YXIgVGFza0NhbmNlbEV2ZW50ID0gNDtcbiAgdmFyIFRhc2tSdW5FdmVudCA9IDU7XG4gIHZhciBUYXNrWWllbGRFdmVudCA9IDY7XG4gIHZhciBTY2hlZHVsZXJTdXNwZW5kRXZlbnQgPSA3O1xuICB2YXIgU2NoZWR1bGVyUmVzdW1lRXZlbnQgPSA4O1xuXG4gIGZ1bmN0aW9uIGxvZ0V2ZW50KGVudHJpZXMpIHtcbiAgICBpZiAoZXZlbnRMb2cgIT09IG51bGwpIHtcbiAgICAgIHZhciBvZmZzZXQgPSBldmVudExvZ0luZGV4O1xuICAgICAgZXZlbnRMb2dJbmRleCArPSBlbnRyaWVzLmxlbmd0aDtcblxuICAgICAgaWYgKGV2ZW50TG9nSW5kZXggKyAxID4gZXZlbnRMb2dTaXplKSB7XG4gICAgICAgIGV2ZW50TG9nU2l6ZSAqPSAyO1xuXG4gICAgICAgIGlmIChldmVudExvZ1NpemUgPiBNQVhfRVZFTlRfTE9HX1NJWkUpIHtcbiAgICAgICAgICAvLyBVc2luZyBjb25zb2xlWydlcnJvciddIHRvIGV2YWRlIEJhYmVsIGFuZCBFU0xpbnRcbiAgICAgICAgICBjb25zb2xlWydlcnJvciddKFwiU2NoZWR1bGVyIFByb2ZpbGluZzogRXZlbnQgbG9nIGV4Y2VlZGVkIG1heGltdW0gc2l6ZS4gRG9uJ3QgXCIgKyAnZm9yZ2V0IHRvIGNhbGwgYHN0b3BMb2dnaW5nUHJvZmlsaW5nRXZlbnRzKClgLicpO1xuICAgICAgICAgIHN0b3BMb2dnaW5nUHJvZmlsaW5nRXZlbnRzKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld0V2ZW50TG9nID0gbmV3IEludDMyQXJyYXkoZXZlbnRMb2dTaXplICogNCk7XG4gICAgICAgIG5ld0V2ZW50TG9nLnNldChldmVudExvZyk7XG4gICAgICAgIGV2ZW50TG9nQnVmZmVyID0gbmV3RXZlbnRMb2cuYnVmZmVyO1xuICAgICAgICBldmVudExvZyA9IG5ld0V2ZW50TG9nO1xuICAgICAgfVxuXG4gICAgICBldmVudExvZy5zZXQoZW50cmllcywgb2Zmc2V0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydExvZ2dpbmdQcm9maWxpbmdFdmVudHMoKSB7XG4gICAgZXZlbnRMb2dTaXplID0gSU5JVElBTF9FVkVOVF9MT0dfU0laRTtcbiAgICBldmVudExvZ0J1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihldmVudExvZ1NpemUgKiA0KTtcbiAgICBldmVudExvZyA9IG5ldyBJbnQzMkFycmF5KGV2ZW50TG9nQnVmZmVyKTtcbiAgICBldmVudExvZ0luZGV4ID0gMDtcbiAgfVxuICBmdW5jdGlvbiBzdG9wTG9nZ2luZ1Byb2ZpbGluZ0V2ZW50cygpIHtcbiAgICB2YXIgYnVmZmVyID0gZXZlbnRMb2dCdWZmZXI7XG4gICAgZXZlbnRMb2dTaXplID0gMDtcbiAgICBldmVudExvZ0J1ZmZlciA9IG51bGw7XG4gICAgZXZlbnRMb2cgPSBudWxsO1xuICAgIGV2ZW50TG9nSW5kZXggPSAwO1xuICAgIHJldHVybiBidWZmZXI7XG4gIH1cbiAgZnVuY3Rpb24gbWFya1Rhc2tTdGFydCh0YXNrLCBtcykge1xuICAgIHtcbiAgICAgIHByb2ZpbGluZ1N0YXRlW1FVRVVFX1NJWkVdKys7XG5cbiAgICAgIGlmIChldmVudExvZyAhPT0gbnVsbCkge1xuICAgICAgICAvLyBwZXJmb3JtYW5jZS5ub3cgcmV0dXJucyBhIGZsb2F0LCByZXByZXNlbnRpbmcgbWlsbGlzZWNvbmRzLiBXaGVuIHRoZVxuICAgICAgICAvLyBldmVudCBpcyBsb2dnZWQsIGl0J3MgY29lcmNlZCB0byBhbiBpbnQuIENvbnZlcnQgdG8gbWljcm9zZWNvbmRzIHRvXG4gICAgICAgIC8vIG1haW50YWluIGV4dHJhIGRlZ3JlZXMgb2YgcHJlY2lzaW9uLlxuICAgICAgICBsb2dFdmVudChbVGFza1N0YXJ0RXZlbnQsIG1zICogMTAwMCwgdGFzay5pZCwgdGFzay5wcmlvcml0eUxldmVsXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1hcmtUYXNrQ29tcGxldGVkKHRhc2ssIG1zKSB7XG4gICAge1xuICAgICAgcHJvZmlsaW5nU3RhdGVbUFJJT1JJVFldID0gTm9Qcmlvcml0eTtcbiAgICAgIHByb2ZpbGluZ1N0YXRlW0NVUlJFTlRfVEFTS19JRF0gPSAwO1xuICAgICAgcHJvZmlsaW5nU3RhdGVbUVVFVUVfU0laRV0tLTtcblxuICAgICAgaWYgKGV2ZW50TG9nICE9PSBudWxsKSB7XG4gICAgICAgIGxvZ0V2ZW50KFtUYXNrQ29tcGxldGVFdmVudCwgbXMgKiAxMDAwLCB0YXNrLmlkXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1hcmtUYXNrQ2FuY2VsZWQodGFzaywgbXMpIHtcbiAgICB7XG4gICAgICBwcm9maWxpbmdTdGF0ZVtRVUVVRV9TSVpFXS0tO1xuXG4gICAgICBpZiAoZXZlbnRMb2cgIT09IG51bGwpIHtcbiAgICAgICAgbG9nRXZlbnQoW1Rhc2tDYW5jZWxFdmVudCwgbXMgKiAxMDAwLCB0YXNrLmlkXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1hcmtUYXNrRXJyb3JlZCh0YXNrLCBtcykge1xuICAgIHtcbiAgICAgIHByb2ZpbGluZ1N0YXRlW1BSSU9SSVRZXSA9IE5vUHJpb3JpdHk7XG4gICAgICBwcm9maWxpbmdTdGF0ZVtDVVJSRU5UX1RBU0tfSURdID0gMDtcbiAgICAgIHByb2ZpbGluZ1N0YXRlW1FVRVVFX1NJWkVdLS07XG5cbiAgICAgIGlmIChldmVudExvZyAhPT0gbnVsbCkge1xuICAgICAgICBsb2dFdmVudChbVGFza0Vycm9yRXZlbnQsIG1zICogMTAwMCwgdGFzay5pZF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtYXJrVGFza1J1bih0YXNrLCBtcykge1xuICAgIHtcbiAgICAgIHJ1bklkQ291bnRlcisrO1xuICAgICAgcHJvZmlsaW5nU3RhdGVbUFJJT1JJVFldID0gdGFzay5wcmlvcml0eUxldmVsO1xuICAgICAgcHJvZmlsaW5nU3RhdGVbQ1VSUkVOVF9UQVNLX0lEXSA9IHRhc2suaWQ7XG4gICAgICBwcm9maWxpbmdTdGF0ZVtDVVJSRU5UX1JVTl9JRF0gPSBydW5JZENvdW50ZXI7XG5cbiAgICAgIGlmIChldmVudExvZyAhPT0gbnVsbCkge1xuICAgICAgICBsb2dFdmVudChbVGFza1J1bkV2ZW50LCBtcyAqIDEwMDAsIHRhc2suaWQsIHJ1bklkQ291bnRlcl0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtYXJrVGFza1lpZWxkKHRhc2ssIG1zKSB7XG4gICAge1xuICAgICAgcHJvZmlsaW5nU3RhdGVbUFJJT1JJVFldID0gTm9Qcmlvcml0eTtcbiAgICAgIHByb2ZpbGluZ1N0YXRlW0NVUlJFTlRfVEFTS19JRF0gPSAwO1xuICAgICAgcHJvZmlsaW5nU3RhdGVbQ1VSUkVOVF9SVU5fSURdID0gMDtcblxuICAgICAgaWYgKGV2ZW50TG9nICE9PSBudWxsKSB7XG4gICAgICAgIGxvZ0V2ZW50KFtUYXNrWWllbGRFdmVudCwgbXMgKiAxMDAwLCB0YXNrLmlkLCBydW5JZENvdW50ZXJdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbWFya1NjaGVkdWxlclN1c3BlbmRlZChtcykge1xuICAgIHtcbiAgICAgIG1haW5UaHJlYWRJZENvdW50ZXIrKztcblxuICAgICAgaWYgKGV2ZW50TG9nICE9PSBudWxsKSB7XG4gICAgICAgIGxvZ0V2ZW50KFtTY2hlZHVsZXJTdXNwZW5kRXZlbnQsIG1zICogMTAwMCwgbWFpblRocmVhZElkQ291bnRlcl0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBtYXJrU2NoZWR1bGVyVW5zdXNwZW5kZWQobXMpIHtcbiAgICB7XG4gICAgICBpZiAoZXZlbnRMb2cgIT09IG51bGwpIHtcbiAgICAgICAgbG9nRXZlbnQoW1NjaGVkdWxlclJlc3VtZUV2ZW50LCBtcyAqIDEwMDAsIG1haW5UaHJlYWRJZENvdW50ZXJdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cbiAgLy8gTWF0aC5wb3coMiwgMzApIC0gMVxuICAvLyAwYjExMTExMTExMTExMTExMTExMTExMTExMTExMTExMVxuXG4gIHZhciBtYXhTaWduZWQzMUJpdEludCA9IDEwNzM3NDE4MjM7IC8vIFRpbWVzIG91dCBpbW1lZGlhdGVseVxuXG4gIHZhciBJTU1FRElBVEVfUFJJT1JJVFlfVElNRU9VVCA9IC0xOyAvLyBFdmVudHVhbGx5IHRpbWVzIG91dFxuXG4gIHZhciBVU0VSX0JMT0NLSU5HX1BSSU9SSVRZID0gMjUwO1xuICB2YXIgTk9STUFMX1BSSU9SSVRZX1RJTUVPVVQgPSA1MDAwO1xuICB2YXIgTE9XX1BSSU9SSVRZX1RJTUVPVVQgPSAxMDAwMDsgLy8gTmV2ZXIgdGltZXMgb3V0XG5cbiAgdmFyIElETEVfUFJJT1JJVFkgPSBtYXhTaWduZWQzMUJpdEludDsgLy8gVGFza3MgYXJlIHN0b3JlZCBvbiBhIG1pbiBoZWFwXG5cbiAgdmFyIHRhc2tRdWV1ZSA9IFtdO1xuICB2YXIgdGltZXJRdWV1ZSA9IFtdOyAvLyBJbmNyZW1lbnRpbmcgaWQgY291bnRlci4gVXNlZCB0byBtYWludGFpbiBpbnNlcnRpb24gb3JkZXIuXG5cbiAgdmFyIHRhc2tJZENvdW50ZXIgPSAxOyAvLyBQYXVzaW5nIHRoZSBzY2hlZHVsZXIgaXMgdXNlZnVsIGZvciBkZWJ1Z2dpbmcuXG4gIHZhciBjdXJyZW50VGFzayA9IG51bGw7XG4gIHZhciBjdXJyZW50UHJpb3JpdHlMZXZlbCA9IE5vcm1hbFByaW9yaXR5OyAvLyBUaGlzIGlzIHNldCB3aGlsZSBwZXJmb3JtaW5nIHdvcmssIHRvIHByZXZlbnQgcmUtZW50cmFuY3kuXG5cbiAgdmFyIGlzUGVyZm9ybWluZ1dvcmsgPSBmYWxzZTtcbiAgdmFyIGlzSG9zdENhbGxiYWNrU2NoZWR1bGVkID0gZmFsc2U7XG4gIHZhciBpc0hvc3RUaW1lb3V0U2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gYWR2YW5jZVRpbWVycyhjdXJyZW50VGltZSkge1xuICAgIC8vIENoZWNrIGZvciB0YXNrcyB0aGF0IGFyZSBubyBsb25nZXIgZGVsYXllZCBhbmQgYWRkIHRoZW0gdG8gdGhlIHF1ZXVlLlxuICAgIHZhciB0aW1lciA9IHBlZWsodGltZXJRdWV1ZSk7XG5cbiAgICB3aGlsZSAodGltZXIgIT09IG51bGwpIHtcbiAgICAgIGlmICh0aW1lci5jYWxsYmFjayA9PT0gbnVsbCkge1xuICAgICAgICAvLyBUaW1lciB3YXMgY2FuY2VsbGVkLlxuICAgICAgICBwb3AodGltZXJRdWV1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHRpbWVyLnN0YXJ0VGltZSA8PSBjdXJyZW50VGltZSkge1xuICAgICAgICAvLyBUaW1lciBmaXJlZC4gVHJhbnNmZXIgdG8gdGhlIHRhc2sgcXVldWUuXG4gICAgICAgIHBvcCh0aW1lclF1ZXVlKTtcbiAgICAgICAgdGltZXIuc29ydEluZGV4ID0gdGltZXIuZXhwaXJhdGlvblRpbWU7XG4gICAgICAgIHB1c2godGFza1F1ZXVlLCB0aW1lcik7XG5cbiAgICAgICAge1xuICAgICAgICAgIG1hcmtUYXNrU3RhcnQodGltZXIsIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgICB0aW1lci5pc1F1ZXVlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFJlbWFpbmluZyB0aW1lcnMgYXJlIHBlbmRpbmcuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGltZXIgPSBwZWVrKHRpbWVyUXVldWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoY3VycmVudFRpbWUpIHtcbiAgICBpc0hvc3RUaW1lb3V0U2NoZWR1bGVkID0gZmFsc2U7XG4gICAgYWR2YW5jZVRpbWVycyhjdXJyZW50VGltZSk7XG5cbiAgICBpZiAoIWlzSG9zdENhbGxiYWNrU2NoZWR1bGVkKSB7XG4gICAgICBpZiAocGVlayh0YXNrUXVldWUpICE9PSBudWxsKSB7XG4gICAgICAgIGlzSG9zdENhbGxiYWNrU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgcmVxdWVzdEhvc3RDYWxsYmFjayhmbHVzaFdvcmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGZpcnN0VGltZXIgPSBwZWVrKHRpbWVyUXVldWUpO1xuXG4gICAgICAgIGlmIChmaXJzdFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgICAgcmVxdWVzdEhvc3RUaW1lb3V0KGhhbmRsZVRpbWVvdXQsIGZpcnN0VGltZXIuc3RhcnRUaW1lIC0gY3VycmVudFRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2hXb3JrKGhhc1RpbWVSZW1haW5pbmcsIGluaXRpYWxUaW1lKSB7XG4gICAge1xuICAgICAgbWFya1NjaGVkdWxlclVuc3VzcGVuZGVkKGluaXRpYWxUaW1lKTtcbiAgICB9IC8vIFdlJ2xsIG5lZWQgYSBob3N0IGNhbGxiYWNrIHRoZSBuZXh0IHRpbWUgd29yayBpcyBzY2hlZHVsZWQuXG5cblxuICAgIGlzSG9zdENhbGxiYWNrU2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgICBpZiAoaXNIb3N0VGltZW91dFNjaGVkdWxlZCkge1xuICAgICAgLy8gV2Ugc2NoZWR1bGVkIGEgdGltZW91dCBidXQgaXQncyBubyBsb25nZXIgbmVlZGVkLiBDYW5jZWwgaXQuXG4gICAgICBpc0hvc3RUaW1lb3V0U2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICBjYW5jZWxIb3N0VGltZW91dCgpO1xuICAgIH1cblxuICAgIGlzUGVyZm9ybWluZ1dvcmsgPSB0cnVlO1xuICAgIHZhciBwcmV2aW91c1ByaW9yaXR5TGV2ZWwgPSBjdXJyZW50UHJpb3JpdHlMZXZlbDtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoZW5hYmxlUHJvZmlsaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIHdvcmtMb29wKGhhc1RpbWVSZW1haW5pbmcsIGluaXRpYWxUaW1lKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFRhc2sgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGltZSA9IGdldEN1cnJlbnRUaW1lKCk7XG4gICAgICAgICAgICBtYXJrVGFza0Vycm9yZWQoY3VycmVudFRhc2ssIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgICAgIGN1cnJlbnRUYXNrLmlzUXVldWVkID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vIGNhdGNoIGluIHByb2QgY29kZXBhdGguXG4gICAgICAgIHJldHVybiB3b3JrTG9vcChoYXNUaW1lUmVtYWluaW5nLCBpbml0aWFsVGltZSk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGN1cnJlbnRUYXNrID0gbnVsbDtcbiAgICAgIGN1cnJlbnRQcmlvcml0eUxldmVsID0gcHJldmlvdXNQcmlvcml0eUxldmVsO1xuICAgICAgaXNQZXJmb3JtaW5nV29yayA9IGZhbHNlO1xuXG4gICAgICB7XG4gICAgICAgIHZhciBfY3VycmVudFRpbWUgPSBnZXRDdXJyZW50VGltZSgpO1xuXG4gICAgICAgIG1hcmtTY2hlZHVsZXJTdXNwZW5kZWQoX2N1cnJlbnRUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3b3JrTG9vcChoYXNUaW1lUmVtYWluaW5nLCBpbml0aWFsVGltZSkge1xuICAgIHZhciBjdXJyZW50VGltZSA9IGluaXRpYWxUaW1lO1xuICAgIGFkdmFuY2VUaW1lcnMoY3VycmVudFRpbWUpO1xuICAgIGN1cnJlbnRUYXNrID0gcGVlayh0YXNrUXVldWUpO1xuXG4gICAgd2hpbGUgKGN1cnJlbnRUYXNrICE9PSBudWxsICYmICEoZW5hYmxlU2NoZWR1bGVyRGVidWdnaW5nICkpIHtcbiAgICAgIGlmIChjdXJyZW50VGFzay5leHBpcmF0aW9uVGltZSA+IGN1cnJlbnRUaW1lICYmICghaGFzVGltZVJlbWFpbmluZyB8fCBzaG91bGRZaWVsZFRvSG9zdCgpKSkge1xuICAgICAgICAvLyBUaGlzIGN1cnJlbnRUYXNrIGhhc24ndCBleHBpcmVkLCBhbmQgd2UndmUgcmVhY2hlZCB0aGUgZGVhZGxpbmUuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2FsbGJhY2sgPSBjdXJyZW50VGFzay5jYWxsYmFjaztcblxuICAgICAgaWYgKGNhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAgIGN1cnJlbnRUYXNrLmNhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBjdXJyZW50VGFzay5wcmlvcml0eUxldmVsO1xuICAgICAgICB2YXIgZGlkVXNlckNhbGxiYWNrVGltZW91dCA9IGN1cnJlbnRUYXNrLmV4cGlyYXRpb25UaW1lIDw9IGN1cnJlbnRUaW1lO1xuICAgICAgICBtYXJrVGFza1J1bihjdXJyZW50VGFzaywgY3VycmVudFRpbWUpO1xuICAgICAgICB2YXIgY29udGludWF0aW9uQ2FsbGJhY2sgPSBjYWxsYmFjayhkaWRVc2VyQ2FsbGJhY2tUaW1lb3V0KTtcbiAgICAgICAgY3VycmVudFRpbWUgPSBnZXRDdXJyZW50VGltZSgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGludWF0aW9uQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjdXJyZW50VGFzay5jYWxsYmFjayA9IGNvbnRpbnVhdGlvbkNhbGxiYWNrO1xuICAgICAgICAgIG1hcmtUYXNrWWllbGQoY3VycmVudFRhc2ssIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBtYXJrVGFza0NvbXBsZXRlZChjdXJyZW50VGFzaywgY3VycmVudFRpbWUpO1xuICAgICAgICAgICAgY3VycmVudFRhc2suaXNRdWV1ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY3VycmVudFRhc2sgPT09IHBlZWsodGFza1F1ZXVlKSkge1xuICAgICAgICAgICAgcG9wKHRhc2tRdWV1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYWR2YW5jZVRpbWVycyhjdXJyZW50VGltZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3AodGFza1F1ZXVlKTtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFRhc2sgPSBwZWVrKHRhc2tRdWV1ZSk7XG4gICAgfSAvLyBSZXR1cm4gd2hldGhlciB0aGVyZSdzIGFkZGl0aW9uYWwgd29ya1xuXG5cbiAgICBpZiAoY3VycmVudFRhc2sgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZmlyc3RUaW1lciA9IHBlZWsodGltZXJRdWV1ZSk7XG5cbiAgICAgIGlmIChmaXJzdFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIHJlcXVlc3RIb3N0VGltZW91dChoYW5kbGVUaW1lb3V0LCBmaXJzdFRpbWVyLnN0YXJ0VGltZSAtIGN1cnJlbnRUaW1lKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVuc3RhYmxlX3J1bldpdGhQcmlvcml0eShwcmlvcml0eUxldmVsLCBldmVudEhhbmRsZXIpIHtcbiAgICBzd2l0Y2ggKHByaW9yaXR5TGV2ZWwpIHtcbiAgICAgIGNhc2UgSW1tZWRpYXRlUHJpb3JpdHk6XG4gICAgICBjYXNlIFVzZXJCbG9ja2luZ1ByaW9yaXR5OlxuICAgICAgY2FzZSBOb3JtYWxQcmlvcml0eTpcbiAgICAgIGNhc2UgTG93UHJpb3JpdHk6XG4gICAgICBjYXNlIElkbGVQcmlvcml0eTpcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHByaW9yaXR5TGV2ZWwgPSBOb3JtYWxQcmlvcml0eTtcbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcmlvcml0eUxldmVsID0gY3VycmVudFByaW9yaXR5TGV2ZWw7XG4gICAgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBwcmlvcml0eUxldmVsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBldmVudEhhbmRsZXIoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBwcmV2aW91c1ByaW9yaXR5TGV2ZWw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdW5zdGFibGVfbmV4dChldmVudEhhbmRsZXIpIHtcbiAgICB2YXIgcHJpb3JpdHlMZXZlbDtcblxuICAgIHN3aXRjaCAoY3VycmVudFByaW9yaXR5TGV2ZWwpIHtcbiAgICAgIGNhc2UgSW1tZWRpYXRlUHJpb3JpdHk6XG4gICAgICBjYXNlIFVzZXJCbG9ja2luZ1ByaW9yaXR5OlxuICAgICAgY2FzZSBOb3JtYWxQcmlvcml0eTpcbiAgICAgICAgLy8gU2hpZnQgZG93biB0byBub3JtYWwgcHJpb3JpdHlcbiAgICAgICAgcHJpb3JpdHlMZXZlbCA9IE5vcm1hbFByaW9yaXR5O1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gQW55dGhpbmcgbG93ZXIgdGhhbiBub3JtYWwgcHJpb3JpdHkgc2hvdWxkIHJlbWFpbiBhdCB0aGUgY3VycmVudCBsZXZlbC5cbiAgICAgICAgcHJpb3JpdHlMZXZlbCA9IGN1cnJlbnRQcmlvcml0eUxldmVsO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcmlvcml0eUxldmVsID0gY3VycmVudFByaW9yaXR5TGV2ZWw7XG4gICAgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBwcmlvcml0eUxldmVsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBldmVudEhhbmRsZXIoKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY3VycmVudFByaW9yaXR5TGV2ZWwgPSBwcmV2aW91c1ByaW9yaXR5TGV2ZWw7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdW5zdGFibGVfd3JhcENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdmFyIHBhcmVudFByaW9yaXR5TGV2ZWwgPSBjdXJyZW50UHJpb3JpdHlMZXZlbDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gVGhpcyBpcyBhIGZvcmsgb2YgcnVuV2l0aFByaW9yaXR5LCBpbmxpbmVkIGZvciBwZXJmb3JtYW5jZS5cbiAgICAgIHZhciBwcmV2aW91c1ByaW9yaXR5TGV2ZWwgPSBjdXJyZW50UHJpb3JpdHlMZXZlbDtcbiAgICAgIGN1cnJlbnRQcmlvcml0eUxldmVsID0gcGFyZW50UHJpb3JpdHlMZXZlbDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBjdXJyZW50UHJpb3JpdHlMZXZlbCA9IHByZXZpb3VzUHJpb3JpdHlMZXZlbDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZW91dEZvclByaW9yaXR5TGV2ZWwocHJpb3JpdHlMZXZlbCkge1xuICAgIHN3aXRjaCAocHJpb3JpdHlMZXZlbCkge1xuICAgICAgY2FzZSBJbW1lZGlhdGVQcmlvcml0eTpcbiAgICAgICAgcmV0dXJuIElNTUVESUFURV9QUklPUklUWV9USU1FT1VUO1xuXG4gICAgICBjYXNlIFVzZXJCbG9ja2luZ1ByaW9yaXR5OlxuICAgICAgICByZXR1cm4gVVNFUl9CTE9DS0lOR19QUklPUklUWTtcblxuICAgICAgY2FzZSBJZGxlUHJpb3JpdHk6XG4gICAgICAgIHJldHVybiBJRExFX1BSSU9SSVRZO1xuXG4gICAgICBjYXNlIExvd1ByaW9yaXR5OlxuICAgICAgICByZXR1cm4gTE9XX1BSSU9SSVRZX1RJTUVPVVQ7XG5cbiAgICAgIGNhc2UgTm9ybWFsUHJpb3JpdHk6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gTk9STUFMX1BSSU9SSVRZX1RJTUVPVVQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdW5zdGFibGVfc2NoZWR1bGVDYWxsYmFjayhwcmlvcml0eUxldmVsLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIHZhciBjdXJyZW50VGltZSA9IGdldEN1cnJlbnRUaW1lKCk7XG4gICAgdmFyIHN0YXJ0VGltZTtcbiAgICB2YXIgdGltZW91dDtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xuICAgICAgdmFyIGRlbGF5ID0gb3B0aW9ucy5kZWxheTtcblxuICAgICAgaWYgKHR5cGVvZiBkZWxheSA9PT0gJ251bWJlcicgJiYgZGVsYXkgPiAwKSB7XG4gICAgICAgIHN0YXJ0VGltZSA9IGN1cnJlbnRUaW1lICsgZGVsYXk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgIH1cblxuICAgICAgdGltZW91dCA9IHR5cGVvZiBvcHRpb25zLnRpbWVvdXQgPT09ICdudW1iZXInID8gb3B0aW9ucy50aW1lb3V0IDogdGltZW91dEZvclByaW9yaXR5TGV2ZWwocHJpb3JpdHlMZXZlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWVvdXQgPSB0aW1lb3V0Rm9yUHJpb3JpdHlMZXZlbChwcmlvcml0eUxldmVsKTtcbiAgICAgIHN0YXJ0VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgIH1cblxuICAgIHZhciBleHBpcmF0aW9uVGltZSA9IHN0YXJ0VGltZSArIHRpbWVvdXQ7XG4gICAgdmFyIG5ld1Rhc2sgPSB7XG4gICAgICBpZDogdGFza0lkQ291bnRlcisrLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgcHJpb3JpdHlMZXZlbDogcHJpb3JpdHlMZXZlbCxcbiAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxuICAgICAgZXhwaXJhdGlvblRpbWU6IGV4cGlyYXRpb25UaW1lLFxuICAgICAgc29ydEluZGV4OiAtMVxuICAgIH07XG5cbiAgICB7XG4gICAgICBuZXdUYXNrLmlzUXVldWVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0VGltZSA+IGN1cnJlbnRUaW1lKSB7XG4gICAgICAvLyBUaGlzIGlzIGEgZGVsYXllZCB0YXNrLlxuICAgICAgbmV3VGFzay5zb3J0SW5kZXggPSBzdGFydFRpbWU7XG4gICAgICBwdXNoKHRpbWVyUXVldWUsIG5ld1Rhc2spO1xuXG4gICAgICBpZiAocGVlayh0YXNrUXVldWUpID09PSBudWxsICYmIG5ld1Rhc2sgPT09IHBlZWsodGltZXJRdWV1ZSkpIHtcbiAgICAgICAgLy8gQWxsIHRhc2tzIGFyZSBkZWxheWVkLCBhbmQgdGhpcyBpcyB0aGUgdGFzayB3aXRoIHRoZSBlYXJsaWVzdCBkZWxheS5cbiAgICAgICAgaWYgKGlzSG9zdFRpbWVvdXRTY2hlZHVsZWQpIHtcbiAgICAgICAgICAvLyBDYW5jZWwgYW4gZXhpc3RpbmcgdGltZW91dC5cbiAgICAgICAgICBjYW5jZWxIb3N0VGltZW91dCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzSG9zdFRpbWVvdXRTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICB9IC8vIFNjaGVkdWxlIGEgdGltZW91dC5cblxuXG4gICAgICAgIHJlcXVlc3RIb3N0VGltZW91dChoYW5kbGVUaW1lb3V0LCBzdGFydFRpbWUgLSBjdXJyZW50VGltZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1Rhc2suc29ydEluZGV4ID0gZXhwaXJhdGlvblRpbWU7XG4gICAgICBwdXNoKHRhc2tRdWV1ZSwgbmV3VGFzayk7XG5cbiAgICAgIHtcbiAgICAgICAgbWFya1Rhc2tTdGFydChuZXdUYXNrLCBjdXJyZW50VGltZSk7XG4gICAgICAgIG5ld1Rhc2suaXNRdWV1ZWQgPSB0cnVlO1xuICAgICAgfSAvLyBTY2hlZHVsZSBhIGhvc3QgY2FsbGJhY2ssIGlmIG5lZWRlZC4gSWYgd2UncmUgYWxyZWFkeSBwZXJmb3JtaW5nIHdvcmssXG4gICAgICAvLyB3YWl0IHVudGlsIHRoZSBuZXh0IHRpbWUgd2UgeWllbGQuXG5cblxuICAgICAgaWYgKCFpc0hvc3RDYWxsYmFja1NjaGVkdWxlZCAmJiAhaXNQZXJmb3JtaW5nV29yaykge1xuICAgICAgICBpc0hvc3RDYWxsYmFja1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIHJlcXVlc3RIb3N0Q2FsbGJhY2soZmx1c2hXb3JrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3VGFzaztcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuc3RhYmxlX3BhdXNlRXhlY3V0aW9uKCkge1xuICB9XG5cbiAgZnVuY3Rpb24gdW5zdGFibGVfY29udGludWVFeGVjdXRpb24oKSB7XG5cbiAgICBpZiAoIWlzSG9zdENhbGxiYWNrU2NoZWR1bGVkICYmICFpc1BlcmZvcm1pbmdXb3JrKSB7XG4gICAgICBpc0hvc3RDYWxsYmFja1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICByZXF1ZXN0SG9zdENhbGxiYWNrKGZsdXNoV29yayk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdW5zdGFibGVfZ2V0Rmlyc3RDYWxsYmFja05vZGUoKSB7XG4gICAgcmV0dXJuIHBlZWsodGFza1F1ZXVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuc3RhYmxlX2NhbmNlbENhbGxiYWNrKHRhc2spIHtcbiAgICB7XG4gICAgICBpZiAodGFzay5pc1F1ZXVlZCkge1xuICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBnZXRDdXJyZW50VGltZSgpO1xuICAgICAgICBtYXJrVGFza0NhbmNlbGVkKHRhc2ssIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgdGFzay5pc1F1ZXVlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gLy8gTnVsbCBvdXQgdGhlIGNhbGxiYWNrIHRvIGluZGljYXRlIHRoZSB0YXNrIGhhcyBiZWVuIGNhbmNlbGVkLiAoQ2FuJ3RcbiAgICAvLyByZW1vdmUgZnJvbSB0aGUgcXVldWUgYmVjYXVzZSB5b3UgY2FuJ3QgcmVtb3ZlIGFyYml0cmFyeSBub2RlcyBmcm9tIGFuXG4gICAgLy8gYXJyYXkgYmFzZWQgaGVhcCwgb25seSB0aGUgZmlyc3Qgb25lLilcblxuXG4gICAgdGFzay5jYWxsYmFjayA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiB1bnN0YWJsZV9nZXRDdXJyZW50UHJpb3JpdHlMZXZlbCgpIHtcbiAgICByZXR1cm4gY3VycmVudFByaW9yaXR5TGV2ZWw7XG4gIH1cblxuICBmdW5jdGlvbiB1bnN0YWJsZV9zaG91bGRZaWVsZCgpIHtcbiAgICB2YXIgY3VycmVudFRpbWUgPSBnZXRDdXJyZW50VGltZSgpO1xuICAgIGFkdmFuY2VUaW1lcnMoY3VycmVudFRpbWUpO1xuICAgIHZhciBmaXJzdFRhc2sgPSBwZWVrKHRhc2tRdWV1ZSk7XG4gICAgcmV0dXJuIGZpcnN0VGFzayAhPT0gY3VycmVudFRhc2sgJiYgY3VycmVudFRhc2sgIT09IG51bGwgJiYgZmlyc3RUYXNrICE9PSBudWxsICYmIGZpcnN0VGFzay5jYWxsYmFjayAhPT0gbnVsbCAmJiBmaXJzdFRhc2suc3RhcnRUaW1lIDw9IGN1cnJlbnRUaW1lICYmIGZpcnN0VGFzay5leHBpcmF0aW9uVGltZSA8IGN1cnJlbnRUYXNrLmV4cGlyYXRpb25UaW1lIHx8IHNob3VsZFlpZWxkVG9Ib3N0KCk7XG4gIH1cblxuICB2YXIgdW5zdGFibGVfcmVxdWVzdFBhaW50ID0gcmVxdWVzdFBhaW50O1xuICB2YXIgdW5zdGFibGVfUHJvZmlsaW5nID0gIHtcbiAgICBzdGFydExvZ2dpbmdQcm9maWxpbmdFdmVudHM6IHN0YXJ0TG9nZ2luZ1Byb2ZpbGluZ0V2ZW50cyxcbiAgICBzdG9wTG9nZ2luZ1Byb2ZpbGluZ0V2ZW50czogc3RvcExvZ2dpbmdQcm9maWxpbmdFdmVudHMsXG4gICAgc2hhcmVkUHJvZmlsaW5nQnVmZmVyOiBzaGFyZWRQcm9maWxpbmdCdWZmZXJcbiAgfSA7XG5cblxuXG4gIHZhciBTY2hlZHVsZXIgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIHVuc3RhYmxlX0ltbWVkaWF0ZVByaW9yaXR5OiBJbW1lZGlhdGVQcmlvcml0eSxcbiAgICB1bnN0YWJsZV9Vc2VyQmxvY2tpbmdQcmlvcml0eTogVXNlckJsb2NraW5nUHJpb3JpdHksXG4gICAgdW5zdGFibGVfTm9ybWFsUHJpb3JpdHk6IE5vcm1hbFByaW9yaXR5LFxuICAgIHVuc3RhYmxlX0lkbGVQcmlvcml0eTogSWRsZVByaW9yaXR5LFxuICAgIHVuc3RhYmxlX0xvd1ByaW9yaXR5OiBMb3dQcmlvcml0eSxcbiAgICB1bnN0YWJsZV9ydW5XaXRoUHJpb3JpdHk6IHVuc3RhYmxlX3J1bldpdGhQcmlvcml0eSxcbiAgICB1bnN0YWJsZV9uZXh0OiB1bnN0YWJsZV9uZXh0LFxuICAgIHVuc3RhYmxlX3NjaGVkdWxlQ2FsbGJhY2s6IHVuc3RhYmxlX3NjaGVkdWxlQ2FsbGJhY2ssXG4gICAgdW5zdGFibGVfY2FuY2VsQ2FsbGJhY2s6IHVuc3RhYmxlX2NhbmNlbENhbGxiYWNrLFxuICAgIHVuc3RhYmxlX3dyYXBDYWxsYmFjazogdW5zdGFibGVfd3JhcENhbGxiYWNrLFxuICAgIHVuc3RhYmxlX2dldEN1cnJlbnRQcmlvcml0eUxldmVsOiB1bnN0YWJsZV9nZXRDdXJyZW50UHJpb3JpdHlMZXZlbCxcbiAgICB1bnN0YWJsZV9zaG91bGRZaWVsZDogdW5zdGFibGVfc2hvdWxkWWllbGQsXG4gICAgdW5zdGFibGVfcmVxdWVzdFBhaW50OiB1bnN0YWJsZV9yZXF1ZXN0UGFpbnQsXG4gICAgdW5zdGFibGVfY29udGludWVFeGVjdXRpb246IHVuc3RhYmxlX2NvbnRpbnVlRXhlY3V0aW9uLFxuICAgIHVuc3RhYmxlX3BhdXNlRXhlY3V0aW9uOiB1bnN0YWJsZV9wYXVzZUV4ZWN1dGlvbixcbiAgICB1bnN0YWJsZV9nZXRGaXJzdENhbGxiYWNrTm9kZTogdW5zdGFibGVfZ2V0Rmlyc3RDYWxsYmFja05vZGUsXG4gICAgZ2V0IHVuc3RhYmxlX25vdyAoKSB7IHJldHVybiBnZXRDdXJyZW50VGltZTsgfSxcbiAgICBnZXQgdW5zdGFibGVfZm9yY2VGcmFtZVJhdGUgKCkgeyByZXR1cm4gZm9yY2VGcmFtZVJhdGU7IH0sXG4gICAgdW5zdGFibGVfUHJvZmlsaW5nOiB1bnN0YWJsZV9Qcm9maWxpbmdcbiAgfSk7XG5cbiAgdmFyIERFRkFVTFRfVEhSRUFEX0lEID0gMDsgLy8gQ291bnRlcnMgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgSURzLlxuXG4gIHZhciBpbnRlcmFjdGlvbklEQ291bnRlciA9IDA7XG4gIHZhciB0aHJlYWRJRENvdW50ZXIgPSAwOyAvLyBTZXQgb2YgY3VycmVudGx5IHRyYWNlZCBpbnRlcmFjdGlvbnMuXG4gIC8vIEludGVyYWN0aW9ucyBcInN0YWNrXCLigJNcbiAgLy8gTWVhbmluZyB0aGF0IG5ld2x5IHRyYWNlZCBpbnRlcmFjdGlvbnMgYXJlIGFwcGVuZGVkIHRvIHRoZSBwcmV2aW91c2x5IGFjdGl2ZSBzZXQuXG4gIC8vIFdoZW4gYW4gaW50ZXJhY3Rpb24gZ29lcyBvdXQgb2Ygc2NvcGUsIHRoZSBwcmV2aW91cyBzZXQgKGlmIGFueSkgaXMgcmVzdG9yZWQuXG5cbiAgdmFyIGludGVyYWN0aW9uc1JlZiA9IG51bGw7IC8vIExpc3RlbmVyKHMpIHRvIG5vdGlmeSB3aGVuIGludGVyYWN0aW9ucyBiZWdpbiBhbmQgZW5kLlxuXG4gIHZhciBzdWJzY3JpYmVyUmVmID0gbnVsbDtcblxuICB7XG4gICAgaW50ZXJhY3Rpb25zUmVmID0ge1xuICAgICAgY3VycmVudDogbmV3IFNldCgpXG4gICAgfTtcbiAgICBzdWJzY3JpYmVyUmVmID0ge1xuICAgICAgY3VycmVudDogbnVsbFxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gdW5zdGFibGVfY2xlYXIoY2FsbGJhY2spIHtcblxuICAgIHZhciBwcmV2SW50ZXJhY3Rpb25zID0gaW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQ7XG4gICAgaW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQgPSBuZXcgU2V0KCk7XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGludGVyYWN0aW9uc1JlZi5jdXJyZW50ID0gcHJldkludGVyYWN0aW9ucztcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdW5zdGFibGVfZ2V0Q3VycmVudCgpIHtcbiAgICB7XG4gICAgICByZXR1cm4gaW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQ7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHVuc3RhYmxlX2dldFRocmVhZElEKCkge1xuICAgIHJldHVybiArK3RocmVhZElEQ291bnRlcjtcbiAgfVxuICBmdW5jdGlvbiB1bnN0YWJsZV90cmFjZShuYW1lLCB0aW1lc3RhbXAsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHRocmVhZElEID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBERUZBVUxUX1RIUkVBRF9JRDtcblxuICAgIHZhciBpbnRlcmFjdGlvbiA9IHtcbiAgICAgIF9fY291bnQ6IDEsXG4gICAgICBpZDogaW50ZXJhY3Rpb25JRENvdW50ZXIrKyxcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcFxuICAgIH07XG4gICAgdmFyIHByZXZJbnRlcmFjdGlvbnMgPSBpbnRlcmFjdGlvbnNSZWYuY3VycmVudDsgLy8gVHJhY2VkIGludGVyYWN0aW9ucyBzaG91bGQgc3RhY2svYWNjdW11bGF0ZS5cbiAgICAvLyBUbyBkbyB0aGF0LCBjbG9uZSB0aGUgY3VycmVudCBpbnRlcmFjdGlvbnMuXG4gICAgLy8gVGhlIHByZXZpb3VzIHNldCB3aWxsIGJlIHJlc3RvcmVkIHVwb24gY29tcGxldGlvbi5cblxuICAgIHZhciBpbnRlcmFjdGlvbnMgPSBuZXcgU2V0KHByZXZJbnRlcmFjdGlvbnMpO1xuICAgIGludGVyYWN0aW9ucy5hZGQoaW50ZXJhY3Rpb24pO1xuICAgIGludGVyYWN0aW9uc1JlZi5jdXJyZW50ID0gaW50ZXJhY3Rpb25zO1xuICAgIHZhciBzdWJzY3JpYmVyID0gc3Vic2NyaWJlclJlZi5jdXJyZW50O1xuICAgIHZhciByZXR1cm5WYWx1ZTtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCkge1xuICAgICAgICBzdWJzY3JpYmVyLm9uSW50ZXJhY3Rpb25UcmFjZWQoaW50ZXJhY3Rpb24pO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHN1YnNjcmliZXIub25Xb3JrU3RhcnRlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm5WYWx1ZSA9IGNhbGxiYWNrKCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgaW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQgPSBwcmV2SW50ZXJhY3Rpb25zO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHN1YnNjcmliZXIub25Xb3JrU3RvcHBlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaW50ZXJhY3Rpb24uX19jb3VudC0tOyAvLyBJZiBubyBhc3luYyB3b3JrIHdhcyBzY2hlZHVsZWQgZm9yIHRoaXMgaW50ZXJhY3Rpb24sXG4gICAgICAgICAgICAvLyBOb3RpZnkgc3Vic2NyaWJlcnMgdGhhdCBpdCdzIGNvbXBsZXRlZC5cblxuICAgICAgICAgICAgaWYgKHN1YnNjcmliZXIgIT09IG51bGwgJiYgaW50ZXJhY3Rpb24uX19jb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLm9uSW50ZXJhY3Rpb25TY2hlZHVsZWRXb3JrQ29tcGxldGVkKGludGVyYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cbiAgZnVuY3Rpb24gdW5zdGFibGVfd3JhcChjYWxsYmFjaykge1xuICAgIHZhciB0aHJlYWRJRCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogREVGQVVMVF9USFJFQURfSUQ7XG5cbiAgICB2YXIgd3JhcHBlZEludGVyYWN0aW9ucyA9IGludGVyYWN0aW9uc1JlZi5jdXJyZW50O1xuICAgIHZhciBzdWJzY3JpYmVyID0gc3Vic2NyaWJlclJlZi5jdXJyZW50O1xuXG4gICAgaWYgKHN1YnNjcmliZXIgIT09IG51bGwpIHtcbiAgICAgIHN1YnNjcmliZXIub25Xb3JrU2NoZWR1bGVkKHdyYXBwZWRJbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICB9IC8vIFVwZGF0ZSB0aGUgcGVuZGluZyBhc3luYyB3b3JrIGNvdW50IGZvciB0aGUgY3VycmVudCBpbnRlcmFjdGlvbnMuXG4gICAgLy8gVXBkYXRlIGFmdGVyIGNhbGxpbmcgc3Vic2NyaWJlcnMgaW4gY2FzZSBvZiBlcnJvci5cblxuXG4gICAgd3JhcHBlZEludGVyYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChpbnRlcmFjdGlvbikge1xuICAgICAgaW50ZXJhY3Rpb24uX19jb3VudCsrO1xuICAgIH0pO1xuICAgIHZhciBoYXNSdW4gPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIHdyYXBwZWQoKSB7XG4gICAgICB2YXIgcHJldkludGVyYWN0aW9ucyA9IGludGVyYWN0aW9uc1JlZi5jdXJyZW50O1xuICAgICAgaW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQgPSB3cmFwcGVkSW50ZXJhY3Rpb25zO1xuICAgICAgc3Vic2NyaWJlciA9IHN1YnNjcmliZXJSZWYuY3VycmVudDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJldHVyblZhbHVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHN1YnNjcmliZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIub25Xb3JrU3RhcnRlZCh3cmFwcGVkSW50ZXJhY3Rpb25zLCB0aHJlYWRJRCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm5WYWx1ZSA9IGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaW50ZXJhY3Rpb25zUmVmLmN1cnJlbnQgPSBwcmV2SW50ZXJhY3Rpb25zO1xuXG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLm9uV29ya1N0b3BwZWQod3JhcHBlZEludGVyYWN0aW9ucywgdGhyZWFkSUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICghaGFzUnVuKSB7XG4gICAgICAgICAgLy8gV2Ugb25seSBleHBlY3QgYSB3cmFwcGVkIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uY2UsXG4gICAgICAgICAgLy8gQnV0IGluIHRoZSBldmVudCB0aGF0IGl0J3MgZXhlY3V0ZWQgbW9yZSB0aGFuIG9uY2XigJNcbiAgICAgICAgICAvLyBPbmx5IGRlY3JlbWVudCB0aGUgb3V0c3RhbmRpbmcgaW50ZXJhY3Rpb24gY291bnRzIG9uY2UuXG4gICAgICAgICAgaGFzUnVuID0gdHJ1ZTsgLy8gVXBkYXRlIHBlbmRpbmcgYXN5bmMgY291bnRzIGZvciBhbGwgd3JhcHBlZCBpbnRlcmFjdGlvbnMuXG4gICAgICAgICAgLy8gSWYgdGhpcyB3YXMgdGhlIGxhc3Qgc2NoZWR1bGVkIGFzeW5jIHdvcmsgZm9yIGFueSBvZiB0aGVtLFxuICAgICAgICAgIC8vIE1hcmsgdGhlbSBhcyBjb21wbGV0ZWQuXG5cbiAgICAgICAgICB3cmFwcGVkSW50ZXJhY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGludGVyYWN0aW9uKSB7XG4gICAgICAgICAgICBpbnRlcmFjdGlvbi5fX2NvdW50LS07XG5cbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyICE9PSBudWxsICYmIGludGVyYWN0aW9uLl9fY291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgc3Vic2NyaWJlci5vbkludGVyYWN0aW9uU2NoZWR1bGVkV29ya0NvbXBsZXRlZChpbnRlcmFjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB3cmFwcGVkLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgIHN1YnNjcmliZXIgPSBzdWJzY3JpYmVyUmVmLmN1cnJlbnQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChzdWJzY3JpYmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgc3Vic2NyaWJlci5vbldvcmtDYW5jZWxlZCh3cmFwcGVkSW50ZXJhY3Rpb25zLCB0aHJlYWRJRCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIC8vIFVwZGF0ZSBwZW5kaW5nIGFzeW5jIGNvdW50cyBmb3IgYWxsIHdyYXBwZWQgaW50ZXJhY3Rpb25zLlxuICAgICAgICAvLyBJZiB0aGlzIHdhcyB0aGUgbGFzdCBzY2hlZHVsZWQgYXN5bmMgd29yayBmb3IgYW55IG9mIHRoZW0sXG4gICAgICAgIC8vIE1hcmsgdGhlbSBhcyBjb21wbGV0ZWQuXG4gICAgICAgIHdyYXBwZWRJbnRlcmFjdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoaW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICBpbnRlcmFjdGlvbi5fX2NvdW50LS07XG5cbiAgICAgICAgICBpZiAoc3Vic2NyaWJlciAmJiBpbnRlcmFjdGlvbi5fX2NvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm9uSW50ZXJhY3Rpb25TY2hlZHVsZWRXb3JrQ29tcGxldGVkKGludGVyYWN0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gd3JhcHBlZDtcbiAgfVxuXG4gIHZhciBzdWJzY3JpYmVycyA9IG51bGw7XG5cbiAge1xuICAgIHN1YnNjcmliZXJzID0gbmV3IFNldCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5zdGFibGVfc3Vic2NyaWJlKHN1YnNjcmliZXIpIHtcbiAgICB7XG4gICAgICBzdWJzY3JpYmVycy5hZGQoc3Vic2NyaWJlcik7XG5cbiAgICAgIGlmIChzdWJzY3JpYmVycy5zaXplID09PSAxKSB7XG4gICAgICAgIHN1YnNjcmliZXJSZWYuY3VycmVudCA9IHtcbiAgICAgICAgICBvbkludGVyYWN0aW9uU2NoZWR1bGVkV29ya0NvbXBsZXRlZDogb25JbnRlcmFjdGlvblNjaGVkdWxlZFdvcmtDb21wbGV0ZWQsXG4gICAgICAgICAgb25JbnRlcmFjdGlvblRyYWNlZDogb25JbnRlcmFjdGlvblRyYWNlZCxcbiAgICAgICAgICBvbldvcmtDYW5jZWxlZDogb25Xb3JrQ2FuY2VsZWQsXG4gICAgICAgICAgb25Xb3JrU2NoZWR1bGVkOiBvbldvcmtTY2hlZHVsZWQsXG4gICAgICAgICAgb25Xb3JrU3RhcnRlZDogb25Xb3JrU3RhcnRlZCxcbiAgICAgICAgICBvbldvcmtTdG9wcGVkOiBvbldvcmtTdG9wcGVkXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHVuc3RhYmxlX3Vuc3Vic2NyaWJlKHN1YnNjcmliZXIpIHtcbiAgICB7XG4gICAgICBzdWJzY3JpYmVycy5kZWxldGUoc3Vic2NyaWJlcik7XG5cbiAgICAgIGlmIChzdWJzY3JpYmVycy5zaXplID09PSAwKSB7XG4gICAgICAgIHN1YnNjcmliZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25JbnRlcmFjdGlvblRyYWNlZChpbnRlcmFjdGlvbikge1xuICAgIHZhciBkaWRDYXRjaEVycm9yID0gZmFsc2U7XG4gICAgdmFyIGNhdWdodEVycm9yID0gbnVsbDtcbiAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzdWJzY3JpYmVyLm9uSW50ZXJhY3Rpb25UcmFjZWQoaW50ZXJhY3Rpb24pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCFkaWRDYXRjaEVycm9yKSB7XG4gICAgICAgICAgZGlkQ2F0Y2hFcnJvciA9IHRydWU7XG4gICAgICAgICAgY2F1Z2h0RXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGRpZENhdGNoRXJyb3IpIHtcbiAgICAgIHRocm93IGNhdWdodEVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uSW50ZXJhY3Rpb25TY2hlZHVsZWRXb3JrQ29tcGxldGVkKGludGVyYWN0aW9uKSB7XG4gICAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgY2F1Z2h0RXJyb3IgPSBudWxsO1xuICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN1YnNjcmliZXIub25JbnRlcmFjdGlvblNjaGVkdWxlZFdvcmtDb21wbGV0ZWQoaW50ZXJhY3Rpb24pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCFkaWRDYXRjaEVycm9yKSB7XG4gICAgICAgICAgZGlkQ2F0Y2hFcnJvciA9IHRydWU7XG4gICAgICAgICAgY2F1Z2h0RXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGRpZENhdGNoRXJyb3IpIHtcbiAgICAgIHRocm93IGNhdWdodEVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uV29ya1NjaGVkdWxlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKSB7XG4gICAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgY2F1Z2h0RXJyb3IgPSBudWxsO1xuICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN1YnNjcmliZXIub25Xb3JrU2NoZWR1bGVkKGludGVyYWN0aW9ucywgdGhyZWFkSUQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCFkaWRDYXRjaEVycm9yKSB7XG4gICAgICAgICAgZGlkQ2F0Y2hFcnJvciA9IHRydWU7XG4gICAgICAgICAgY2F1Z2h0RXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGRpZENhdGNoRXJyb3IpIHtcbiAgICAgIHRocm93IGNhdWdodEVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uV29ya1N0YXJ0ZWQoaW50ZXJhY3Rpb25zLCB0aHJlYWRJRCkge1xuICAgIHZhciBkaWRDYXRjaEVycm9yID0gZmFsc2U7XG4gICAgdmFyIGNhdWdodEVycm9yID0gbnVsbDtcbiAgICBzdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzdWJzY3JpYmVyLm9uV29ya1N0YXJ0ZWQoaW50ZXJhY3Rpb25zLCB0aHJlYWRJRCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoIWRpZENhdGNoRXJyb3IpIHtcbiAgICAgICAgICBkaWRDYXRjaEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICBjYXVnaHRFcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZGlkQ2F0Y2hFcnJvcikge1xuICAgICAgdGhyb3cgY2F1Z2h0RXJyb3I7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Xb3JrU3RvcHBlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKSB7XG4gICAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgY2F1Z2h0RXJyb3IgPSBudWxsO1xuICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN1YnNjcmliZXIub25Xb3JrU3RvcHBlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmICghZGlkQ2F0Y2hFcnJvcikge1xuICAgICAgICAgIGRpZENhdGNoRXJyb3IgPSB0cnVlO1xuICAgICAgICAgIGNhdWdodEVycm9yID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChkaWRDYXRjaEVycm9yKSB7XG4gICAgICB0aHJvdyBjYXVnaHRFcnJvcjtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbldvcmtDYW5jZWxlZChpbnRlcmFjdGlvbnMsIHRocmVhZElEKSB7XG4gICAgdmFyIGRpZENhdGNoRXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgY2F1Z2h0RXJyb3IgPSBudWxsO1xuICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN1YnNjcmliZXIub25Xb3JrQ2FuY2VsZWQoaW50ZXJhY3Rpb25zLCB0aHJlYWRJRCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoIWRpZENhdGNoRXJyb3IpIHtcbiAgICAgICAgICBkaWRDYXRjaEVycm9yID0gdHJ1ZTtcbiAgICAgICAgICBjYXVnaHRFcnJvciA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZGlkQ2F0Y2hFcnJvcikge1xuICAgICAgdGhyb3cgY2F1Z2h0RXJyb3I7XG4gICAgfVxuICB9XG5cblxuXG4gIHZhciBTY2hlZHVsZXJUcmFjaW5nID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBnZXQgX19pbnRlcmFjdGlvbnNSZWYgKCkgeyByZXR1cm4gaW50ZXJhY3Rpb25zUmVmOyB9LFxuICAgIGdldCBfX3N1YnNjcmliZXJSZWYgKCkgeyByZXR1cm4gc3Vic2NyaWJlclJlZjsgfSxcbiAgICB1bnN0YWJsZV9jbGVhcjogdW5zdGFibGVfY2xlYXIsXG4gICAgdW5zdGFibGVfZ2V0Q3VycmVudDogdW5zdGFibGVfZ2V0Q3VycmVudCxcbiAgICB1bnN0YWJsZV9nZXRUaHJlYWRJRDogdW5zdGFibGVfZ2V0VGhyZWFkSUQsXG4gICAgdW5zdGFibGVfdHJhY2U6IHVuc3RhYmxlX3RyYWNlLFxuICAgIHVuc3RhYmxlX3dyYXA6IHVuc3RhYmxlX3dyYXAsXG4gICAgdW5zdGFibGVfc3Vic2NyaWJlOiB1bnN0YWJsZV9zdWJzY3JpYmUsXG4gICAgdW5zdGFibGVfdW5zdWJzY3JpYmU6IHVuc3RhYmxlX3Vuc3Vic2NyaWJlXG4gIH0pO1xuXG4gIHZhciBSZWFjdFNoYXJlZEludGVybmFscyQxID0ge1xuICAgIFJlYWN0Q3VycmVudERpc3BhdGNoZXI6IFJlYWN0Q3VycmVudERpc3BhdGNoZXIsXG4gICAgUmVhY3RDdXJyZW50T3duZXI6IFJlYWN0Q3VycmVudE93bmVyLFxuICAgIElzU29tZVJlbmRlcmVyQWN0aW5nOiBJc1NvbWVSZW5kZXJlckFjdGluZyxcbiAgICAvLyBVc2VkIGJ5IHJlbmRlcmVycyB0byBhdm9pZCBidW5kbGluZyBvYmplY3QtYXNzaWduIHR3aWNlIGluIFVNRCBidW5kbGVzOlxuICAgIGFzc2lnbjogb2JqZWN0QXNzaWduXG4gIH07XG5cbiAge1xuICAgIG9iamVjdEFzc2lnbihSZWFjdFNoYXJlZEludGVybmFscyQxLCB7XG4gICAgICAvLyBUaGVzZSBzaG91bGQgbm90IGJlIGluY2x1ZGVkIGluIHByb2R1Y3Rpb24uXG4gICAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lOiBSZWFjdERlYnVnQ3VycmVudEZyYW1lLFxuICAgICAgLy8gU2hpbSBmb3IgUmVhY3QgRE9NIDE2LjAuMCB3aGljaCBzdGlsbCBkZXN0cnVjdHVyZWQgKGJ1dCBub3QgdXNlZCkgdGhpcy5cbiAgICAgIC8vIFRPRE86IHJlbW92ZSBpbiBSZWFjdCAxNy4wLlxuICAgICAgUmVhY3RDb21wb25lbnRUcmVlSG9vazoge31cbiAgICB9KTtcbiAgfSAvLyBSZS1leHBvcnQgdGhlIHNjaGVkdWxlIEFQSShzKSBmb3IgVU1EIGJ1bmRsZXMuXG4gIC8vIFRoaXMgYXZvaWRzIGludHJvZHVjaW5nIGEgZGVwZW5kZW5jeSBvbiBhIG5ldyBVTUQgZ2xvYmFsIGluIGEgbWlub3IgdXBkYXRlLFxuICAvLyBTaW5jZSB0aGF0IHdvdWxkIGJlIGEgYnJlYWtpbmcgY2hhbmdlIChlLmcuIGZvciBhbGwgZXhpc3RpbmcgQ29kZVNhbmRib3hlcykuXG4gIC8vIFRoaXMgcmUtZXhwb3J0IGlzIG9ubHkgcmVxdWlyZWQgZm9yIFVNRCBidW5kbGVzO1xuICAvLyBDSlMgYnVuZGxlcyB1c2UgdGhlIHNoYXJlZCBOUE0gcGFja2FnZS5cblxuXG4gIG9iamVjdEFzc2lnbihSZWFjdFNoYXJlZEludGVybmFscyQxLCB7XG4gICAgU2NoZWR1bGVyOiBTY2hlZHVsZXIsXG4gICAgU2NoZWR1bGVyVHJhY2luZzogU2NoZWR1bGVyVHJhY2luZ1xuICB9KTtcblxuICB7XG5cbiAgICB0cnkge1xuICAgICAgdmFyIGZyb3plbk9iamVjdCA9IE9iamVjdC5mcmVlemUoe30pO1xuICAgICAgdmFyIHRlc3RNYXAgPSBuZXcgTWFwKFtbZnJvemVuT2JqZWN0LCBudWxsXV0pO1xuICAgICAgdmFyIHRlc3RTZXQgPSBuZXcgU2V0KFtmcm96ZW5PYmplY3RdKTsgLy8gVGhpcyBpcyBuZWNlc3NhcnkgZm9yIFJvbGx1cCB0byBub3QgY29uc2lkZXIgdGhlc2UgdW51c2VkLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzE3NzFcbiAgICAgIC8vIFRPRE86IHdlIGNhbiByZW1vdmUgdGhlc2UgaWYgUm9sbHVwIGZpeGVzIHRoZSBidWcuXG5cbiAgICAgIHRlc3RNYXAuc2V0KDAsIDApO1xuICAgICAgdGVzdFNldC5hZGQoMCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgIH1cbiAgfVxuXG4gIHZhciBjcmVhdGVFbGVtZW50JDEgPSAgY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uIDtcbiAgdmFyIGNsb25lRWxlbWVudCQxID0gIGNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uIDtcbiAgdmFyIGNyZWF0ZUZhY3RvcnkgPSAgY3JlYXRlRmFjdG9yeVdpdGhWYWxpZGF0aW9uIDtcbiAgdmFyIENoaWxkcmVuID0ge1xuICAgIG1hcDogbWFwQ2hpbGRyZW4sXG4gICAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICAgIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICAgIHRvQXJyYXk6IHRvQXJyYXksXG4gICAgb25seTogb25seUNoaWxkXG4gIH07XG5cbiAgZXhwb3J0cy5DaGlsZHJlbiA9IENoaWxkcmVuO1xuICBleHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbiAgZXhwb3J0cy5GcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG4gIGV4cG9ydHMuUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xuICBleHBvcnRzLlB1cmVDb21wb25lbnQgPSBQdXJlQ29tcG9uZW50O1xuICBleHBvcnRzLlN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xuICBleHBvcnRzLlN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbiAgZXhwb3J0cy5fX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRCA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzJDE7XG4gIGV4cG9ydHMuY2xvbmVFbGVtZW50ID0gY2xvbmVFbGVtZW50JDE7XG4gIGV4cG9ydHMuY3JlYXRlQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ7XG4gIGV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQkMTtcbiAgZXhwb3J0cy5jcmVhdGVGYWN0b3J5ID0gY3JlYXRlRmFjdG9yeTtcbiAgZXhwb3J0cy5jcmVhdGVSZWYgPSBjcmVhdGVSZWY7XG4gIGV4cG9ydHMuZm9yd2FyZFJlZiA9IGZvcndhcmRSZWY7XG4gIGV4cG9ydHMuaXNWYWxpZEVsZW1lbnQgPSBpc1ZhbGlkRWxlbWVudDtcbiAgZXhwb3J0cy5sYXp5ID0gbGF6eTtcbiAgZXhwb3J0cy5tZW1vID0gbWVtbztcbiAgZXhwb3J0cy51c2VDYWxsYmFjayA9IHVzZUNhbGxiYWNrO1xuICBleHBvcnRzLnVzZUNvbnRleHQgPSB1c2VDb250ZXh0O1xuICBleHBvcnRzLnVzZURlYnVnVmFsdWUgPSB1c2VEZWJ1Z1ZhbHVlO1xuICBleHBvcnRzLnVzZUVmZmVjdCA9IHVzZUVmZmVjdDtcbiAgZXhwb3J0cy51c2VJbXBlcmF0aXZlSGFuZGxlID0gdXNlSW1wZXJhdGl2ZUhhbmRsZTtcbiAgZXhwb3J0cy51c2VMYXlvdXRFZmZlY3QgPSB1c2VMYXlvdXRFZmZlY3Q7XG4gIGV4cG9ydHMudXNlTWVtbyA9IHVzZU1lbW87XG4gIGV4cG9ydHMudXNlUmVkdWNlciA9IHVzZVJlZHVjZXI7XG4gIGV4cG9ydHMudXNlUmVmID0gdXNlUmVmO1xuICBleHBvcnRzLnVzZVN0YXRlID0gdXNlU3RhdGU7XG4gIGV4cG9ydHMudmVyc2lvbiA9IFJlYWN0VmVyc2lvbjtcblxufSkpKTsiXX0=