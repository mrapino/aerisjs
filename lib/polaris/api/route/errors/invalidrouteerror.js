define([
  'aeris/util',
  'aeris/errors/abstracterror'
], function(_, AbstractError) {
  /**
   * @class aeris.polaris.api.route.errors.InvalidRouteError
   * @extends aeris.errors.AbstractError
   *
   * @constructor
   * @override
  */
  var InvalidRouteError = function() {
    AbstractError.apply(this, arguments);
  };
  _.inherits(InvalidRouteError, AbstractError);


  /** @override */
  InvalidRouteError.prototype.setName = function() {
    return 'InvalidRouteError';
  };


  return InvalidRouteError;
});
