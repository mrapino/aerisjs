define(['aeris/util', 'vendor/backbone'], function(_, Backbone) {
  /**
   * An events manager,
   * based on Backbone.Events.
   *
   * @class aeris.Events
   * @constructor
   */
  Events = function() {
  };

  // Mixin Backbone.Events
  _.extend(Events.prototype, Backbone.Events);


  Events.prototype.eachEventHash_ = function(eventHash, callback, ctx) {
    ctx || (ctx = this);

    _.each(eventHash, function(handlerArr, topic) {
      // Normalize handler as array of handlers
      handlerArr = _.isArray(handlerArr) ? handlerArr : [handlerArr];

      // Bind each handler
      _.each(handlerArr, function(handler) {
        // Check if handle is a named method of this
        handler = _.isFunction(this[handler]) ? this[handler] : handler;

        // Call 'on' with standard signature
        callback.call(ctx, topic, handler);
      }, this);
    }, this);
  };


  Events.prototype.on = function(eventHash, ctx) {
    // Handle and normalize events hash
    if (_.isObject(eventHash)) {
      this.eachEventHash_(eventHash, function(topic, handler) {
        Backbone.Events.on.call(this, topic, handler, ctx);
      }, this);
    }
    // If we're not getting an events hash,
    // Just let Backbone.Events do its thing
    else {
      Backbone.Events.on.apply(this, arguments);
    }
  };


  /**
   * See http://backbonejs.org/#Events-off
   * Extended to return count of remaining event handler.
   * Note that this method is no longer chainable.
   *
   * @return {number} Number of handlers bound to the
   *                  specified topic.
   */
  Events.prototype.off = function(event, handler, ctx) {
    // Handle and normalize events hash
    if (_.isObject(event)) {
      ctx = arguments[1];

      this.eachEventHash_(event, function(topic, handler) {
        Backbone.Events.off.call(this, topic, handler, ctx);
      }, this);
    }
    // If we're not getting an events hash,
    // Just let Backbone.Events do its thing
    else {
      Backbone.Events.off.apply(this, arguments);
    }

    if (!event || !this._events || !this._events[event]) {
      return 0;
    }

    return this._events[event].length;
  };


  /**
   * Proxies all events from another {aeris.Event} object.
   * In other words, all the events that you trigger,
   * I'm gonna trigger too.
   *
   * Passes along the original object as the first argument
   * when triggering proxied events.
   *
   * @param {Events=} obj The object to proxy.
   * @param {function(string, Array):{Object}=} opt_callback
   *        A callback function to customize the proxied event.
   *        Should return on object with 'topic' and 'args' properties.
   *
   *        Example:
   *          parent.proxy(child, function(topic, args) {
   *            return {
   *              topic: 'child:' + topic,
   *              args: [child].concat(args)
   *            }
   *          });
   *
   *        ...would trigger all child events, with a topic prepended
   *        with 'child:', and with the child object inserted as the first
   *        argument.
   * @param {Object=} opt_ctx
   *        A context in which to call the opt_callback function.
   *        Defaults to this.
   */
  Events.prototype.proxyEvents = function(obj, opt_callback, opt_ctx) {
    var trigger_orig = obj.trigger;
    var callback = opt_callback || function(topic, args) {
      return { topic: topic, args: args };
    };
    var ctx = opt_ctx || this;

    obj.trigger = function(topic, var_args) {
      // Process the callback
      // to get a new topic and arguments
      var args_orig = Array.prototype.slice.call(arguments, 1);
      var cbObj = callback.call(ctx, topic, args_orig);
      var args_proxy = [cbObj.topic].concat(cbObj.args);

      // Call the original object's trigger
      trigger_orig.apply(obj, arguments);

      // Call the proxying object's trigger
      this.trigger.apply(ctx, args_proxy);
    };
    obj.trigger = obj.trigger.bind(this);
  };


  /**
   * End any proxies that have been wrapped
   * around this {Events} object.
   */
  Events.prototype.removeProxy = function() {
    this.trigger = function() {
      Events.prototype.trigger.apply(this, arguments);
    };
    this.trigger = this.trigger.bind(this);
  };


  /**
   * A singleton instance of {aeris.Events}
   * @type {aeris.Events}
   * @public
   */
  Events.hub = new Events();


  /**
   * Publish a global event
   * Same signature as {aeris.Events#trigger}
   */
  Events.publish = function() {
    Events.hub.trigger.apply(Events.hub, arguments);
  };


  /**
   * Subscribe to a global event
   * Same signature as {aeris.Events#on}
   */
  Events.subscribe = function() {
    Events.hub.on.apply(Events.hub, arguments);
  };


  /**
   * Unsubscribe from a global event
   * Same signature as {aeris.Events#off}
   */
  Events.unsubscribe = function() {
    Events.hub.off.apply(Events.hub, arguments);
  };


  return _.expose(Events, 'aeris.Events');

});
