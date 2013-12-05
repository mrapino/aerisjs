define([
  'aeris/util'
], function() {
  /**
   * Return the CSS class for the
   * an icon associated with a given POI type.
   */
  return function getTypeIconClass(type) {
    var classPattern = 'icon-{iconName}';
    var iconNameLookup = {
      gas: 'fuel',
      fuel: 'fuel',
      lodging: 'lodging',
      hotel: 'lodging',
      food: 'food',
      medical: 'medical',
      er: 'medical',
      hospital: 'medical'
    };
    var defaultIconName = 'marker';

    var iconName = iconNameLookup[type] || defaultIconName;

    return classPattern.replace('{iconName}', iconName);
  };
});
