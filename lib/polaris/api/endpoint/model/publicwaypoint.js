define([
  'aeris/util',
  'api/endpoint/model/aerisapimodel'
], function(_, AerisApiModel) {
  /**
   * A single data object from the Polaris
   * PublicWaypoint API.
   *
   * @class aeris.polaris.api.endpoint.model.PublicWaypoint
   * @extends aeris.api.endpoint.model.AerisApiModel
   *
   * @constructor
   * @override
  */
  var PublicWaypoint = function(opt_attrs, opt_options) {
    var options = _.defaults(opt_options || {}, {
      endpoint: 'polaris/publicwaypoint'
    });

    AerisApiModel.call(this, opt_attrs, opt_options);
  };
  _.inherits(PublicWaypoint, AerisApiModel);


  return PublicWaypoint;
});
