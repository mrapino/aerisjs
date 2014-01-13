define([
  'aeris/util',
  'application/controller/itemcontroller'
], function(_, ItemController) {
  /**
   * @class aeris.builder.routeplanner.publictrails.controller.NearbyTrailController
   * @extends aeris.application.ItemController
   *
   * @constructor
   * @override
  */
  var NearbyTrailController = function(options) {
    /**
     * @private
     * @type {aeris.Events}
     */
    this.eventHub_ = options.eventHub;

    ItemController.apply(this, arguments);

    this.delegateSingleEvent_('click', null, this.selectTrail, this);
  };
  _.inherits(NearbyTrailController, ItemController);


  NearbyTrailController.prototype.selectTrail = function() {
    this.eventHub_.trigger('trail:select', this.model);
  };


  return NearbyTrailController;
});
