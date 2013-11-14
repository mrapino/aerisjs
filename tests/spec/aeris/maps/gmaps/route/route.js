define([
  'aeris/events',
  'jasmine',
  'sinon',
  'aeris/util',
  'aeris/model',
  'testUtils',
  'testErrors/untestedspecerror',
  'gmaps/route/waypoint',
  'gmaps/route/directions/abstractdirectionsservice',
  'mocks/promise',
  'aeris/promise',
  'gmaps/route/route'
], function(
  Events,
  jasmine,
  sinon,
  _,
  Model,
  testUtils,
  UntestedSpecError,
  Waypoint,
  DirectionsService,
  StubbedPromise,
  Promise,
  Route
) {

  var MockWaypoint = function(opt_attrs, opt_options) {
    // Use Model ctor
    Model.apply(this, arguments);
  };
  _.inherits(MockWaypoint, Waypoint);



  function getStubbedWaypoint(opt_options) {
    var options = _.extend({}, opt_options);
    var waypoint = sinon.createStubInstance(Waypoint);

    if (!_.isUndefined(options.distance)) {
      spyOn(waypoint, 'getDistance').andReturn(options.distance);
    }

    if (!_.isUndefined(options.selected)) {
      spyOn(waypoint, 'isSelected').andReturn(options.selected);
    }

    return waypoint;
  }

  function getStubbedWaypointCollection(count, opt_options) {
    var options = _.extend({}, opt_options);
    var waypoints = [];

    count || (count = 3);

    _.times(count, function() {
      waypoints.push(getStubbedWaypoint(options));
    });

    return waypoints;
  }

  function getStubbedWaypointsForRoute(route, count, opt_options) {
    var waypoints = getStubbedWaypointCollection(count, opt_options);

    spyOn(route, 'getWaypoints').andReturn(waypoints);
    spyOn(route, 'has').andCallFake(function(wp) {
      return _.indexOf(waypoints, wp) >= 0;
    });

    spyOn(route, 'at').andCallFake(function(index) {
      return waypoints[index];
    });


    return waypoints;
  }


  describe('A Route', function() {

    it('should have a unique cid, with prefix \'route_\'', function() {
      var route;

      spyOn(_, 'uniqueId').andCallThrough();
      route = new Route();

      expect(_.uniqueId).toHaveBeenCalled();
      expect(route.cid).toBeDefined();
      expect(route.cid).toMatch(/^route_[0-9]*/);
    });

    describe('should manage waypoints', function() {
      it('should construct with no waypoints or distance', function() {
        var route = new Route();
        expect(route.distance).toEqual(0);
        expect(route.getWaypoints()).toEqual([]);
      });

      describe('add method', function() {
        var route, waypoint;

        beforeEach(function() {
          route = new Route();
          waypoint = getStubbedWaypoint();
          spyOn(route, 'trigger');
        });

        it('should add a waypoint', function() {
          route.add(waypoint);

          expect(route.getWaypoints().length).toEqual(1);
        });

        it('should trigger an \'add\' event', function() {
          route.add(waypoint);
          expect(route.trigger).toHaveBeenCalledWith('add', waypoint, route);
        });

        it('should not a add waypoint that already exists in the route', function() {
          spyOn(route, 'has');

          route.has.andReturn(false);
          route.add(waypoint);

          route.has.andReturn(true);
          expect(function() {
            route.add(waypoint);
          }).toThrowType('InvalidArgumentError');
        });

        it('should add a waypoint at an index', function() {
          var newWaypoint, waypoints = [];

          // Create mock waypoints
          // and add them to the route
          _.times(3, function(i) {
            var wp = getStubbedWaypoint();
            wp.testId = 'oldWaypoint_' + i;
            waypoints.push(wp);
            route.add(wp);
          });
          newWaypoint = getStubbedWaypoint();
          newWaypoint.testId = 'newWaypoint';

          // Insert a new waypoint
          route.add(newWaypoint, { at: 1 });

          // Test: waypoint was inserted
          expect(route.at(0)).toEqual(waypoints[0]);
          expect(route.at(1)).toEqual(newWaypoint);
          expect(route.at(2)).toEqual(waypoints[1]);
          expect(route.at(3)).toEqual(waypoints[2]);
        });

        it('should add multiple waypoints', function() {
          var route = new Route();
          var waypoints = getStubbedWaypointCollection();

          spyOn(route, 'trigger');
          spyOn(route, 'has').andReturn(false);

          route.add(waypoints);
          expect(route.getWaypoints()).toEqual(waypoints);
        });
      });

      it('should return a waypoint by cid', function() {
        var route = new Route();

        // Stub out as no-op
        // To limit test scope
        spyOn(route, 'trigger');

        // Create mock waypoints
        _.times(3, function() {
          var wp = sinon.createStubInstance(Waypoint);
          wp.cid = _.uniqueId();

          route.add(wp);
          expect(route.get(wp.cid)).toEqual(wp);
        });
      });

      it('should return a waypoint at an offset from another', function() {
        var route = new Route();
        var waypoint = getStubbedWaypoint();
        var waypointIndex = 2;
        var offset = 1;

        spyOn(route, 'indexOf').andCallFake(function(waypoint) {
          expect(waypoint).toEqual(waypoint);
          return waypointIndex;
        });

        spyOn(route, 'at');

        route.atOffset(waypoint, offset);
        expect(route.at).toHaveBeenCalledWith(waypointIndex + offset);
      });

      it('should return the previous waypoint', function() {
        var route = new Route();
        var waypoint = getStubbedWaypoint();

        spyOn(route, 'atOffset');

        route.getPrevious(waypoint);
        expect(route.atOffset).toHaveBeenCalledWith(waypoint, -1);
      });

      it('should return the next waypoint', function() {
        var route = new Route();
        var waypoint = getStubbedWaypoint();

        spyOn(route, 'atOffset');

        route.getNext(waypoint);
        expect(route.atOffset).toHaveBeenCalledWith(waypoint, 1);
      });

      describe('selected waypoints', function() {
        it('should return selected waypoints', function() {
          var route = new Route();
          var selected = getStubbedWaypointCollection(3, { selected: true });
          var notSelected = getStubbedWaypointCollection(3, { selected: false });

          spyOn(route, 'getWaypoints').andReturn(selected.concat(notSelected));

          expect(route.getSelected()).toEqual(selected);
        });

        it('should select all waypoints', function() {
          var waypoints = getStubbedWaypointCollection();
          var route = new Route();


          _.each(waypoints, function(wp) {
            testUtils.addSpies(
              spyOn(wp, 'select')
            );
          });
          spyOn(route, 'getWaypoints').andReturn(waypoints);

          route.selectAll();
          expect(testUtils.getSpies()).toHaveAllBeenCalled();
        });

        it('should deselect all waypoints', function() {
          var waypoints = getStubbedWaypointCollection();
          var route = new Route();

          spyOn(route, 'getWaypoints').andReturn(waypoints);

          _.each(waypoints, function(wp) {
            testUtils.addSpies(
              spyOn(wp, 'deselect')
            );
          });

          route.deselectAll();
          expect(testUtils.getSpies()).toHaveAllBeenCalled();
        });
      });

      it('should check if a waypoint exists in a route', function() {
        var waypoint = getStubbedWaypoint();
        var someOtherWaypoint = getStubbedWaypoint();
        var route = new Route();

        // Stub with no-op to  limit test scope
        spyOn(route, 'trigger');

        route.add(waypoint);
        expect(route.has(waypoint)).toEqual(true);
        expect(route.has(someOtherWaypoint)).toEqual(false);
      });

      it('should remove a waypoint', function() {
        var route = new Route();
        var waypoint = getStubbedWaypoint();
        var waypointIndex = 0;

        spyOn(route, 'trigger');
        route.add(waypoint);

        // Stub waypoint index
        spyOn(route, 'indexOf').andCallFake(function(wp) {
          expect(wp).toEqual(waypoint);
          return waypointIndex;
        });
        spyOn(route, 'has').andReturn(true);
        spyOn(waypoint, 'removeProxy');

        route.remove(waypoint);

        expect(route.getWaypoints().length).toEqual(0);
        expect(route.trigger).toHaveBeenCalledWith('remove', waypoint, waypointIndex);
        expect(waypoint.removeProxy).toHaveBeenCalled();
      });

      it('should remove multiple waypoints', function() {
        var route = new Route();
        var waypoints = getStubbedWaypointCollection();

        spyOn(route, 'trigger');

        route.add(waypoints);
        route.remove(waypoints);

        expect(route.getWaypoints().length).toEqual(0);
      });

      it('should not allow removing a waypoint that doesn\'t exist', function() {
        var route = new Route();
        var waypoint = getStubbedWaypoint();

        spyOn(route, 'trigger');
        spyOn(route, 'has').andCallFake(function(waypoint) {
          expect(waypoint).toEqual(waypoint);
          return false;
        });

        expect(function() { route.remove(waypoint); }).toThrowType('InvalidArgumentError');
      });

      it('should remove all waypoints with reset', function() {
        var count = 3;
        var waypoints = getStubbedWaypointCollection(count);
        var route = new Route();

        spyOn(route, 'getWaypoints').andReturn(waypoints);
        spyOn(route, 'remove').andCallFake(function(waypoint, options) {
          expect(waypoints.indexOf(waypoint)).not.toEqual(-1);
          expect(options).toEqual({ trigger: false });
        });

        route.reset();

        expect(route.remove.callCount).toEqual(count);
      });

      it('should reset to an array of Waypoints', function() {
        var route = new Route();
        var count = 3;
        var oldWaypoints = getStubbedWaypointCollection(count);
        var newWaypoints = getStubbedWaypointCollection(count);

        spyOn(route, 'trigger');
        spyOn(route, 'add');
        spyOn(route, 'remove');
        spyOn(route, 'getWaypoints').andReturn(oldWaypoints);

        route.reset(newWaypoints);

        // Test: removed old waypoint
        expect(route.remove).toHaveBeenCalledWith(oldWaypoints[count - 1], { trigger: false });
        expect(route.remove.callCount).toEqual(count);

        // Test: add new waypoint
        expect(route.add).toHaveBeenCalledWith(newWaypoints[count - 1], { trigger: false });
        expect(route.add.callCount).toEqual(count);

        // Test: trigger reset
        expect(route.trigger).toHaveBeenCalledWith('reset', route.getWaypoints());
      });

      it('should return the last waypoint in the route', function() {
        var route = new Route();
        var count = 3;
        var waypoints = getStubbedWaypointCollection(count);

        spyOn(route, 'getWaypoints').andReturn(waypoints);
        spyOn(route, 'at');

        route.getLastWaypoint();

        expect(route.at).toHaveBeenCalledWith(count - 1);
      });

      it('should recalculate total route distance', function() {
        var route = new Route();
        var count = 7;
        var waypointDistance = 8213;
        var waypoints = getStubbedWaypointCollection(count, { distance: waypointDistance });

        spyOn(route, 'getWaypoints').andReturn(waypoints);

        route.recalculateDistance();
        expect(route.distance).toEqual(count * waypointDistance);
      });

      it('should return the distance to a given waypoint', function() {
        var route = new Route();
        var wpDistance = 123.456;
        var waypoints = getStubbedWaypointsForRoute(route, 5, { distance: wpDistance });
        var targetWaypoint = waypoints[3];
        var expectedDistance = 4 * wpDistance;

        spyOn(route, 'indexOf').andCallFake(function(waypoint) {
          if (waypoint === targetWaypoint) {
            return 3;
          }
          throw new Error('Spy was called with unexpected arguments');
        });

        expect(route.distanceTo(targetWaypoint)).toEqual(expectedDistance);

        expect(function() {
          route.distanceTo(getStubbedWaypoint);
        }).toThrowType('InvalidArgumentError');
      });
    });

    describe('should update a waypoint\'s path', function() {
      var route, waypoint, next, prev;

      beforeEach(function() {
        route = new Route();
        waypoint = getStubbedWaypoint();
        next = getStubbedWaypoint();
        prev = getStubbedWaypoint();

        spyOn(route, 'updatePathBetween');
        spyOn(aeris.Promise, 'when');
      });

      it('when it is added to a route, or moved', function() {
        spyOn(route, 'has').andReturn(true);
        spyOn(route, 'getNext').andReturn(next);
        spyOn(route, 'getPrevious').andReturn(prev);

        route.updatePaths(waypoint);

        expect(route.updatePathBetween).toHaveBeenCalledWith(waypoint, next);
      });

      describe('when it is removed from a route', function() {
        function stubAt(at) {
          spyOn(route, 'at').andCallFake(function(index) {
            if (index === at - 1) { return undefined; }
            if (index === at) { return next }

            throw Error('Unexpected spy arguments');
          });
        }

        beforeEach(function() {
          spyOn(route, 'has').andReturn(false);
          spyOn(next, 'set');
          spyOn(prev, 'set');
        });

        it('from the beginning of a route', function() {
          spyOn(route, 'at').andCallFake(function(index) {
            if (index === -1) { return undefined; }
            if (index === 0) { return next }

            throw Error('Unexpected spy arguments');
          });

          route.updatePaths(waypoint, 0);

          expect(next.set).toHaveBeenCalledWith({
            path: [],
            distance: 0
          });
        });

        it('from the middle of a route', function() {
          spyOn(route, 'at').andCallFake(function(index) {
            if (index === 0) { return prev; }
            if (index === 1) { return next }

            throw Error('Unexpected spy arguments');
          });

          route.updatePaths(waypoint, 1);

          expect(route.updatePathBetween).toHaveBeenCalledWith(prev, next);
        });

        it('from the end of a route', function() {
          spyOn(route, 'at').andReturn(undefined);

          route.updatePaths(waypoint, 2);

          expect(route.updatePathBetween).not.toHaveBeenCalled();
          expect(next.set).not.toHaveBeenCalled();
          expect(prev.set).not.toHaveBeenCalled();
        });
      });
    });


    it('should update a path between two waypoints', function() {
      var route = new Route();
      var origin = getStubbedWaypoint();
      var destination = new MockWaypoint({
        followDirections: true,
        travelMode: 'DRIVING'
      });
      var res = {
        path: testUtils.getRandomPath(),
        distance: 12345
      };

      // This would be a good candidate for dependency injection
      // so we don't have to provide public access to the service
      spyOn(route.getDirectionsService(), 'fetchPath').
        andCallFake(function(wpOrig, wpDest, opts) {
          var promise = new Promise();

          expect(wpOrig).toEqual(origin);
          expect(wpDest).toEqual(destination);
          expect(opts).toEqual({
            followDirections: true,
            travelMode: 'DRIVING'
          });

          promise.resolve(res);
          return promise;
        });

      spyOn(destination, 'set');
      spyOn(origin, 'set');

      route.updatePathBetween(origin, destination);

      // Test: Service was called
      expect(route.getDirectionsService().fetchPath).toHaveBeenCalled();

      // Test: destination path was updated
      expect(destination.set).toHaveBeenCalledWith({
        path: res.path,
        position: res.path[res.path.length - 1],
        distance: res.distance
      });
    });


    describe('should import/export to JSON', function() {

      describe('should export an array of waypoints', function() {
        it('as a JSON object, using toJSON', function() {
          var route = new Route();
          var waypoints = [getWaypoint('a'), getWaypoint('b'), getWaypoint('c')];

          function fakeJSON(someId) {
            return { someId: someId };
          }

          // Get stubbed waypoint
          // with stubbed toJSON method
          function getWaypoint(someId) {
            var waypoint = getStubbedWaypoint();
            spyOn(waypoint, 'toJSON').andReturn(fakeJSON(someId));
            return waypoint;
          }

          spyOn(route, 'getWaypoints').andReturn(waypoints);

          expect(route.toJSON()).toEqual([
            fakeJSON('a'), fakeJSON('b'), fakeJSON('c')
          ]);
        });

        it('as a JSON string, using export', function() {
          var route = new Route();

          spyOn(JSON, 'stringify');

          route.export();

          expect(JSON.stringify).toHaveBeenCalledWith(route);
        });
      });

      describe('should import', function() {
        it('a JSON string', function() {
          var route = new Route();
          var waypoints = getStubbedWaypointCollection();
          var jsonString = 'some valid json string';
          var options = { some: 'reset options'};

          spyOn(JSON, 'parse').andReturn(waypoints);
          spyOn(route, 'reset');

          route.import(jsonString, options);

          expect(JSON.parse).toHaveBeenCalledWith(jsonString);
          expect(route.reset).toHaveBeenCalledWith(waypoints, options);
        });

        it('but reject poorly formed JSON input', function() {
          var route = new Route();

          spyOn(JSON, 'parse').andCallFake(function() {
            throw new window.SyntaxError('try harder next time.');
          });

          expect(function() {
            route.import('some json string');
          }).toThrowType('JSONParseError');
        });
      });

      it('should accept a collection of waypoints as a constructor param', function() {
        var route, waypoints;

        // Spy on method called in route constructor
        spyOn(Route.prototype, 'reset');

        waypoints = getStubbedWaypointCollection();
        new Route(waypoints);

        expect(Route.prototype.reset).toHaveBeenCalledWith(waypoints);
      });
    });
  });
});
