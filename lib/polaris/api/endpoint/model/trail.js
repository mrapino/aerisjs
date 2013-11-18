define([
  'aeris/util',
  'api/endpoint/model/aerisapimodel'
], function(_, AerisApiModel) {
  /**
   * A trail, from the Polaris Public Trails API.
   *
   * @class aeris.polaris.api.endpoint.model.Trail
   * @extends aeris.api.endpoint.model.AerisApiModel
   *
   * @constructor
   * @override
  */
  var Trail = function(opt_attrs, opt_options) {
    var options = _.defaults(opt_options || {}, {
      endpoint: 'polaris/publictrails'
    });

    AerisApiModel.call(this, opt_attrs, options);
  };
  _.inherits(Trail, AerisApiModel);


  return Trail;
});
