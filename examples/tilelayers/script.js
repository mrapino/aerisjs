

function addLayer(LayerName) {
  layers[LayerName].setMap(map);
}

function removeLayer(LayerName) {
  layers[LayerName].remove();
}


function initialize() {
  require.setStrategy(window.strategy);
  require(['vendor/text!examples/tilelayers/view.html', 'base/map', 'base/layers', 'vendor/underscore', 'vendor/jquery'], function(html) {
    window._ = require('vendor/underscore');
    window.$ = require('vendor/jquery');

    $('body').html(html);

    window.map = new aeris.maps.Map('map-canvas', {
      baseLayer: new aeris.maps.layers.GoogleRoadMap(),
      center: [44.98, -93.2636],
      zoom: 4
    });


    var $layerSelect = $('input[name="layer"]');

    // Create layer obejcts
    window.layers = {};
    $.each($('input[name="layer"]'), function() {
      var LayerName = $(this).val();
      window.layers[LayerName] = new aeris.maps.layers[LayerName]();
    });


    // Handle tile layer select event
    $layerSelect.change(function() {
      var LayerName = $(this).val();

      if ($(this).prop('checked')) {
        addLayer(LayerName);

        if ($(this).data('modis')) {
          layers[LayerName].setModisPeriod(14);
        }
      }
      else {
        removeLayer(LayerName);
      }
    });

    // Trigger select of already checked input
    $layerSelect.filter('[checked]').trigger('change');
  });
}