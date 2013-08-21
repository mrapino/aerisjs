/**
 * @fileoverview Defines an UnimplementedSpecError.
*/
define(['aeris/util', 'aeris/errors/abstracterror'], function(_, AbstractError) {
  /**
   * UnimplementedSpecError
   *
   * Use when a functionality has a spec defined,
   * but with not actual test.
   *
   * Useful for creating test skeletons.
   * eg.
   *
   * it('should do something or other', function() {
   *   throw new UntestedSpecError();
   * });
   *
   * @constructor
   */
  var UntestedSpecError = function() {
    AbstractError.apply(this, arguments);
  };

  _.inherits(
    UntestedSpecError,
    AbstractError
  );

  UntestedSpecError.prototype.setName = function() {
    return 'UntestedSpecError';
  };

  UntestedSpecError.prototype.setMessage = function(message) {
    return message || 'Spec has not yet been tested';
  };

  return UntestedSpecError;
});
