define([
  'aeris/util',
  'aeris/model',
  'polaris/api/route/errors/invalidrouteerror'
], function(_, Model, InvalidRouteError) {
  /**
   * @class aeris.polaris.route.model.UserGeneratedRoute
   * @extends aeris.Model
   *
   * @constructor
   * @override
  */
  var UserGeneratedRoute = function() {
    Model.apply(this, arguments);

    /** @attribute {string} name */
    /** @attribute {string} description */
    /** @attribute {number} difficultyRating */
    /** @attribute {number} sceneryRating */
    /**
     * Exported route object.
     * @attribute {Object} route
     */
  };
  _.inherits(UserGeneratedRoute, Model);


  /**
   * @throw aeris.polaris.api.route.errors.InvalidRouteError
   * @override
   */
  UserGeneratedRoute.prototype.validate = function(attrs) {
    var routeErrors = this.validateRoute_(attrs.route);

    if (!_.isString(attrs.name)) {
      return new InvalidRouteError('\'' + attrs.name + '\' is not a valid route name');
    }
    if (attrs.name.length === 0) {
      return new InvalidRouteError('A route name is required.');
    }

    return routeErrors;
  };


  UserGeneratedRoute.prototype.validateRoute_ = function(route) {
    if (!_.isArray(route)) {
      return new InvalidRouteError(JSON.stringify(route) + ' is not a valid route object.');
    }
    if (route.length < 3) {
      return new InvalidRouteError('Route must have at least three points.');
    }
  };


  return UserGeneratedRoute;
});
