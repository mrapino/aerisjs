define([
  'aeris/util',
  'sinon',
  'polaris/maps/base/markercollections/poimarkercollection',
  'api/endpoint/collection/pointdatacollection',
  'aeris/model',
  'aeris/collection'
], function(_, sinon, POIMarkerCollection, PointDataCollection, Model, Collection) {

  var TestFactory = function() {
    this.data = new MockData();

    this.params = new Model();
    this.params.setBounds = jasmine.createSpy('params#setBounds');

    this.data.getParams.andReturn(this.params);

    this.markers = new POIMarkerCollection(null, {
      data: this.data,
      marker: Model
    });
  };

  var MockData = function() {
    Collection.apply(this, arguments);

    _.extend(this, PointDataCollection.prototype);
    _.extend(this, jasmine.createSpyObj('data', [
      'getParams',
      'fetch'
    ]));
  };
  MockData.prototype = sinon.createStubInstance(PointDataCollection);

  var MockMap = function() {
    Model.apply(this, arguments);
  };
  _.inherits(MockMap, Model);



  describe('A POIMarkerCollection', function() {

    describe('setMap', function() {

      describe('Map event bindings', function() {

        it('should not set the bounds parameter', function() {
          var test = new TestFactory();
          var map = new MockMap({
            bounds: [20, -80, 100, -160]
          });

          test.markers.setMap(map);
          expect(test.params.setBounds).not.toHaveBeenCalled();
        });

        it('should not bind the bound param to the map bounds', function() {
          var test = new TestFactory();
          var map = new MockMap();

          test.markers.setMap(map);

          map.trigger('change:bounds');
          expect(test.params.setBounds).not.toHaveBeenCalled();
        });

        it('should bind the place param to the map center', function() {
          var test = new TestFactory();
          var centerA = [45, -90], centerB = [30, -60];
          var map = new MockMap({
            center: centerA
          });

          test.markers.setMap(map);

          // Should set initial center param
          expect(test.params.get('p')).toEqual(centerA);

          map.set('center', centerB);
          expect(test.params.get('p')).toEqual(centerB);
        });

        it('should still fetch data on map bounds changes', function() {
          var test = new TestFactory();
          var map = new MockMap();
          var initFetchCount;

          test.markers.setMap(map);
          initFetchCount = test.data.fetch.callCount;

          map.trigger('change:bounds', map, [45, -90, 50, -100]);
          expect(test.data.fetch.callCount).toEqual(initFetchCount + 1);
        });

      });

    });

  });
});
