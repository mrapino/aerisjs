define([
  'errors/errortypefactory'
], function(ErrorTypeFactory) {
  /**
   * @class aeris.polaris.api.route.errors.InvalidRouteError
   * @extends aeris.errors.AbstractError
  */
  return new ErrorTypeFactory({
    name: 'InvalidRouteError'
  });
});
