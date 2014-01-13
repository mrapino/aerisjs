define([
  'aeris/util',
  'base/extension/mapextensionobject',
  'errors/validationerror',
  'errors/invalidargumenterror'
], function(_, MapExtensionObject, ValidationError, InvalidArgumentError) {
  /**
   * A polyline is an array of latLon coordinates
   * renders as a line on the map.
   *
   * @class aeris.maps.polylines.Polyline
   * @extends aeris.maps.MapExtensionObject
   *
   * @constructor
   * @override
  */
  var Polyline = function(opt_attrs, opt_options) {
    var options = _.defaults(opt_options || {}, {
      strategy: 'polylinestrategies/polylinestrategy'
    });

    var attrs = _.defaults(opt_attrs || {}, {
      /**
       * An array of latLon coordinates
       *
       * @attribute path
       * @type {Array.<Array.<number>>}
       */
      path: [],


      /**
       * The color of the rendered path.
       *
       * @attribute strokeColor
       * @type {string}
       */
      strokeColor: '#4d90fe',


      /**
       * The width of the rendered path,
       * in pixels.
       *
       * @attribute strokeWeight
       * @type {number}
      */
      strokeWeight: 2,

      /**
       * The opacity of the rendered path.
       *
       * @attribute strokeOpacity
       * @type {number} Between 0 and 1.0.
       */
      strokeOpacity: 1
    });


    /**
     * @event click
     *
     * @param {Array.<number>} latLat Clicked coordinate.
     * @param {aeris.maps.polylines.Polyline} polyline
     */


    MapExtensionObject.call(this, attrs, options);
  };
  _.inherits(Polyline, MapExtensionObject);


  /**
   * @override
   */
  Polyline.prototype.validate = function(attrs) {
    // Path
    if (
      !_.isArray(attrs.path) ||
      (attrs.path.length && !_.isArray(attrs.path[0]))      
    ) {
      throw new ValidationError('path', attrs.path + ' is not a valid polyline path.');
    }
  };


  /**
   * @param {Array.<Array.<number>>} path
   */
  Polyline.prototype.setPath = function(path) {
    this.set('path', path, { validate: true });
  };

  /** @return {Bolean} */
  Polyline.prototype.hasPath = function() {
    return !!this.get('path') && !!this.get('path').length;
  };


  /**
   * @param {string} color
   */
  Polyline.prototype.setStrokeColor = function(color) {
    this.set('strokeColor', color, { validate: true });
  };


  /**
   * @param {number} opacity
   */
  Polyline.prototype.setStrokeOpacity = function(opacity) {
    this.set('strokeColor', opacity, { validate: true });
  };


  /**
   * @param {number} weight
   */
  Polyline.prototype.setStrokeWeight = function(weight) {
    this.set('strokeWeight', weight, { validate: true });
  };


  /**
   * Set style attributes on the polyline.
   *
   * @throws {aeris.errors.InvalidArgumentError}
   *         If attempting to set attributes which are not styles.
   *
   * @param {Object} styles
   */
  Polyline.prototype.setStyles = function(styles) {
    this.validateIsStylesAttrs_(styles);

    this.set(styles, { validate: true });
  };


  /**
   * Validate that styles object contains
   * only style attributes.
   *
   * @throws {aeris.errors.InvalidArgumentError}
   * @param {Object} styles
   * @private
   */
  Polyline.prototype.validateIsStylesAttrs_ = function(styles) {
    var unauthorizedStyles;
    var attemptedAttributes;
    var authorizedAttributes = [
      'strokeColor',
      'strokeWeight',
      'strokeOpacity'
    ];

    try {
      attemptedAttributes = _.keys(styles);
      unauthorizedStyles = _.difference(attemptedAttributes, authorizedAttributes);
    }
    catch (e) {
      if (e instanceof TypeError) {
        throw new InvalidArgumentError('Expected ' + styles + ' to be an attributes object');
      }
      else { throw e; }
    }

    if (unauthorizedStyles.length) {
      throw new InvalidArgumentError('Unable to style polyline: invalid style ' +
        'attributes: ' + unauthorizedStyles.join(', ') + '.');
    }
  };


  return _.expose(Polyline, 'aeris.maps.polylines.Polyline');
});
