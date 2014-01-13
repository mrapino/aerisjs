define([
  'aeris/util',
  'application/controller/compositecontroller'
], function(_, CompositeController) {
  /**
   * @class aeris.polaris.builder.routeplanner.publictrails.controller.NearbyTrailsWrapperController
   * @extends aeris.application.controller.CompositeController
   *
   * @constructor
   * @override
   *
   * @param {string=} options.openClass
   * @prarm {string=} options.closedClass
  */
  var NearbyTrailsWrapperController = function(options) {
    options.events = _.defaults(options.events || {}, {
      'click @ui.sectionToggle': this.toggleSection_
    });

    /**
     * @private
     * @type {string}
     */
    this.openClass_ = options.openClass || '';

    /**
     * @private
     * @type {string}
     */
    this.closedClass_ = options.closedClass || '';

    CompositeController.call(this, options);

    this.declareUI('trailCount');
    this.declareUI('sectionToggle');

    this.listenTo(this, 'render', this.bindTrailCountToData_);
  };
  _.inherits(NearbyTrailsWrapperController, CompositeController);


  /** @private */
  NearbyTrailsWrapperController.prototype.bindTrailCountToData_ = function() {
    this.listenTo(this.collection, {
      'add remove reset': this.updateTrailCount
    });
  };


  /** @override */
  NearbyTrailsWrapperController.prototype.serializeData = function() {
    return {
      trailCount: this.getTrailCount_()
    };
  };


  /** @public */
  NearbyTrailsWrapperController.prototype.updateTrailCount = function() {
    var apiRequestLimit = this.getApiRequestLimit_();
    var trailCount = this.getTrailCount_();

    if (apiRequestLimit && trailCount >= apiRequestLimit) {
      trailCount = trailCount + '+';
    }


    this.ui.trailCount.text(trailCount);
  };


  /**
   * @returns {number|undefined}
   * @private
   */
  NearbyTrailsWrapperController.prototype.getApiRequestLimit_ = function() {
    var trailData = this.collection.getSourceCollection();
    var apiRequestLimit;

    if (trailData.getParams) {
      apiRequestLimit = trailData.getParams().get('limit');
    }

    return apiRequestLimit;
  };


  /**
   * @returns {number}
   * @private
   */
  NearbyTrailsWrapperController.prototype.getTrailCount_ = function() {
    return this.collection.getSourceLength();
  };


  NearbyTrailsWrapperController.prototype.toggleSection_ = function() {
    this.$el.toggleClass(this.openClass_);
    this.$el.toggleClass(this.closedClass_);
  };


  return NearbyTrailsWrapperController;
});
