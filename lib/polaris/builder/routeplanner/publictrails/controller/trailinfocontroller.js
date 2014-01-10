define([
  'aeris/util',
  'application/controller/itemcontroller'
], function(_, ItemController) {
  /**
   * @class aeris.polaris.builder.routeplanner.publictrails.controller.TrailInfoController
   * @extends aeris.application.controller.ItemController
   *
   * @constructor
   * @override
  */
  var TrailInfoController = function(opt_options) {
    var options = opt_options || {};

    options.templateHelpers = function() {
      return {
        distance: this.lookupDistance_(),
        location: this.lookupLocation_()
      }
    };

    ItemController.call(this, options);

    this.declareUI('closeBtn');
    this.bindUIEvent('click', 'closeBtn', this.close, this);
  };
  _.inherits(TrailInfoController, ItemController);


  TrailInfoController.prototype.lookupDistance_ = function() {
    var METERS_PER_MILE = 1609.34;
    var defaultDistance = 'Unknown';
    var isDistanceUnknown = _.isNull(this.model.get('trailDistance'));
    var miles;

    if (isDistanceUnknown) { return defaultDistance; }

    miles = this.model.get('distance') / METERS_PER_MILE;
    return miles.toFixed(1);
  };


  TrailInfoController.prototype.lookupLocation_ = function() {
    var defaultLocation = 'unknown location';
    var isLocationUnknown = !this.model.get('place');

    if (isLocationUnknown) { return defaultLocation; }

    return this.model.get('place').name + ', ' + this.model.get('place').state;
  }


  return TrailInfoController;
});
