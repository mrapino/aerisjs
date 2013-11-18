define([
  'aeris/util',
  'aeris/viewmodel',
  'aeris/model'
], function(_, ViewModel, Model) {
  
  describe('A ViewModel', function() {
    
    describe('constructor', function() {
      
      describe('transforms', function() {
        
        it('should apply transforms when data attributes change', function() {
          var dataModel = new Model();
          var viewModel = new ViewModel(undefined, {
            data: dataModel,
            attributeTransforms: {
              km: function() {
                if (!this.getDataAttribute('miles')) { return this.get('km'); }
                return this.getDataAttribute('miles') * 1.609344;
              },
              shouted: function() {
                if (!this.getDataAttribute('spoken')) { return this.get('shouted'); }
                return this.getDataAttribute('spoken').toUpperCase();
              }
            }
          });

          dataModel.set('miles', 1000);
          expect(viewModel.get('km')).toEqual(1609.344);

          dataModel.set('spoken', 'hello there');
          expect(viewModel.get('shouted')).toEqual('HELLO THERE');
        });

        it('should not touch attributes without corresponding transforms', function() {
          var dataModel = new Model();
          var viewModel = new ViewModel({
            nauticalMiles: 50
          }, {
            data: dataModel,
            attributeTransforms: {
              km: function() {
                if (!this.getDataAttribute('miles')) { return this.get('km'); }
                return this.getDataAttribute('miles') * 1.609344;
              },
              shouted: function() {
                if (!this.getDataAttribute('spoken')) { return this.get('shouted'); }
                return this.getDataAttribute('spoken').toUpperCase();
              }
            }
          });

          dataModel.set('leagues', 10000);
          expect(viewModel.get('nauticalMiles')).toEqual(50);
        });

        it('should do nothing if not attributeTransforms are defined', function() {
          var dataModel = new Model();
          var viewModel = new ViewModel({
            nauticalMiles: 50
          }, {
            data: dataModel
          });

          dataModel.set('leagues', 10000);
          expect(viewModel.get('nauticalMiles')).toEqual(50);
        });
        
      });
      
    });
    
  });
  
});
