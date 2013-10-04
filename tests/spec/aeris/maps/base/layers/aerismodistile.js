define([
  'aeris/util',
  'base/layers/aerismodistile'
], function(_, AerisModisTile) {
  var ConcreteModisTile = function() {
    var attrs = {
      tileType: 'some tile type',
      name: 'some name',
      modisPeriodTileTypes: {
        1: 'code_1day',
        3: 'code_3day',
        7: 'code_7day'
      }
    };
    var options = {
      strategy: function() {}
    };

    AerisModisTile.call(this, attrs, options);
  };
  _.inherits(ConcreteModisTile, AerisModisTile);


  /**
   * @fileoverview Tests specs for aeris.maps.layers.AerisModisTile.
   */
  describe('An AerisModisTile layer', function() {

    it('should dynamically set tileType from modis period', function() {
      var layer = new ConcreteModisTile();

      layer.setModisPeriod(1);
      expect(layer.get('tileType')).toBe('code_1day');
      layer.setModisPeriod(3);
      expect(layer.get('tileType')).toBe('code_3day');
      layer.setModisPeriod(7);
      expect(layer.get('tileType')).toBe('code_7day');
      layer.setModisPeriod('1');
      expect(layer.get('tileType')).toBe('code_1day');
    });

    it('should reject invalid modis periods', function() {
      var layer = new ConcreteModisTile();

      var negativeFn = function() { layer.setModisPeriod(-1); };
      var nonIntegerFn = function() { layer.setModisPeriod('foobar'); };
      var notAvailableFn = function() { layer.setModisPeriod(2); };

      expect(negativeFn).toThrow();
      expect(nonIntegerFn).toThrow();
      expect(notAvailableFn).toThrow();
    });
  });
});