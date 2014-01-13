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

    ItemController.call(this, options);

    this.declareUI('closeBtn');
    this.bindUIEvent('click', 'closeBtn', this.close, this);
  };
  _.inherits(TrailInfoController, ItemController);


  return TrailInfoController;
});
