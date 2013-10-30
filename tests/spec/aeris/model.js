define([
  'aeris/util',
  'aeris/model'
], function(_, Model, ValidationError) {
  function TestFactory(opt_options) {
    var options = _.extend({
      attrs: undefined,
      options: undefined,
      isValid: true
    }, opt_options);

    spyOn(Model.prototype, 'isValid').andCallFake(function() {
      if (!options.isValid) {
        this.trigger('invalid', this, 'some error');
      }
      return options.isValid;
    });

    this.model = new Model(options.attrs, options.options);
  }

  describe('A Model', function() {
    describe('constructor', function() {
      it('should not validate on instantiation, by default', function() {
        var test = new TestFactory();
        expect(Model.prototype.isValid).not.toHaveBeenCalled();
      });
      it('should optionally validate on instantiation', function() {
        var test = new TestFactory({
          options: {
            validate: true
          }
        });

        expect(Model.prototype.isValid).toHaveBeenCalledInTheContextOf(test.model);
      });
    });

    describe('isValid', function() {
      it('should throw validation errors, if invalid', function() {
        var test = new TestFactory({
          isValid: false
        });

        expect(function() {
          test.model.isValid();
        }).toThrowType('ValidationError');
      });

      it('should not throw validation errors, if valid', function() {
        var test = new TestFactory({
          isValid: true
        });

        // Should not throw error
        test.model.isValid();
      });
    });


    describe('set', function() {

      it('should normalize attribute before setting', function() {
        var model = new Model();
        var rawAttrs = { foo: 'bar', yo: 'wazaam' };

        model.normalize_ = function(attrs) {
          _.each(attrs, function(value, key) {
            attrs[key] = value + '_normal';
          });

          return attrs;
        };

        model.set(rawAttrs);

        expect(model.get('foo')).toEqual('bar_normal');
        expect(model.get('yo')).toEqual('wazaam_normal');
      });

      // Spec adapted from Backbone.Model spec
      // https://github.com/jashkenas/backbone/blob/master/test/model.js ~line 202
      it('should act like normal', function() {
        var a = new Model({id: 'id', foo: 1, bar: 2, baz: 3});
        var changeCount = 0;

        a.on('change:foo', function() { changeCount += 1; });
        a.set({'foo': 2});

        expect(a.get('foo')).toEqual(2);
        expect(changeCount).toEqual(1);

        a.set({'foo': 2}); // set with value that is not new shouldn't fire change event
        expect(a.get('foo')).toEqual(2);  // Foo should NOT have changed, still 2
        expect(changeCount).toEqual(1);   // Change count should NOT have incremented.

        a.validate = function(attrs) {
          expect(attrs.foo).toEqual(void 0);  // validate:true passed while unsetting
        };

        a.unset('foo', {validate: true});
        expect(a.get('foo')).toEqual(void 0); // Foo should have changed

        delete a.validate;
        expect(changeCount).toEqual(2);       // 'Change count should have incremented for unset.

        a.unset('id');
        expect(a.id).toBeUndefined();         // Unsetting the id should remove the id property.
      });

    });

  });
});
