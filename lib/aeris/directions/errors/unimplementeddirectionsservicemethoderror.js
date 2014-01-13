define([
  'errors/errortypefactory'
], function(ErrorTypeFactory) {
  /**
   * @class aeris.directions.errors.UnimplementedDirectionsServiceMethodError
   * @extends aeris.errors.AbstractError
  */
  return new ErrorTypeFactory({
    name: 'UnimplementedDirectionsServiceMethodError',
    message: function(opt_methodName) {
      var errorMsgDefault = 'DirectionsServiceInterface has not been fully implemented.';

      return opt_methodName ?
        errorMsgDefault :
        'Classes implementing the DirectionsServiceInterface' +
          'must implement a ' + opt_methodName + ' method.'
    }
  });
});
