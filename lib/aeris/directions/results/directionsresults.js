define([
  'directions/helpers/directionsresultsvalidator'
], function(DirectionsResultsValidator) {
  /**
   * Results from a request to a
   * {aeris.directions.DirectionsServiceInterface}.
   *
   * Example:
   *    {
   *      path: [
   *        [45, -90],
   *        [45.1, -89.8],
   *        [45.6, -89.3]
   *      ],
   *      distance: 200.37,
   *      status: {
   *        code: 'OK',
   *        apiCode: 'GOOGLE_API_SUCCESS_RESPONSE',
   *        message: 'Succesfully fetched directions.'
   *      }
   *    }
   *
   * @class aeris.directions.results.DirectionsResults
   *
   * @constructor
   * @throws {aeris.directions.errors.InvalidDirectionsResultsError}
   *
   * @param {Object} results
   */
  var DirectionsResults = function(results) {
    var validator = new DirectionsResultsValidator(results);

    if (!validator.isValid()) {
      throw validator.getLastError();
    }


    /** @type {Array.<Array.<number>>} */
    this.path = results.path;

    /**
     * Distance in meters.
     *
     * @property distance
     * @type {?number}
     */
    this.distance = results.distance;


    /** @type {Object} */
    this.status = results.status;

    /**
     * @property status.code
     * @type {aeris.directions.results.DirectionsResultsStatus}
     */
    /**
     * @property status.apiCode
     * @type {string|number|undefined}
     */
    /**
     * @property status.message
     * @type {string}
     */
  };

  return DirectionsResults;
});