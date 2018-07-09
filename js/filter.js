'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var filtersSelectList = filtersForm.querySelectorAll('.map__filter, .map__checkbox');

  var filterMap = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests',
    'features': {
      'filter-wifi': 'wifi',
      'filter-dishwasher': 'dishwasher',
      'filter-parking': 'parking',
      'filter-washer': 'washer',
      'filter-elevator': 'elevator',
      'filter-conditioner': 'conditioner'
    }
  };

  var filterToAdd = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };
  var pins = [];

  function evaluatePrice(value) {
    var answer = 'middle';
    if (value <= 10000) {
      answer = 'low';
    }
    if (value >= 50000) {
      answer = 'high';
    }
    return answer;
  }

  function applyFilter() {
    var pinsFiltered = pins.slice();
    var filterValue;

    for (var key in filterToAdd) {
      if (key === 'features') {

        pinsFiltered = pinsFiltered.filter(function (pin) {
          pin.offer[key].forEach(function (element, index) {
            filterValue = element === pin.offer[key][index];
          });
          return filterValue;
        });
      }

      if (filterToAdd[key] !== 'any' && key !== 'features') {
        pinsFiltered = pinsFiltered.filter(function (pin) {
          if (key !== 'features') {
            filterValue = pin.offer[key] === filterToAdd[key];
          }

          if (key === 'price') {
            filterValue = evaluatePrice(pin.offer[key]) === filterToAdd[key];
          }

          if (key === 'rooms' || key === 'guests') {
            filterValue = pin.offer[key] === parseInt(filterToAdd[key], 10);
          }

          return filterValue;
        });
      }
    }


    // console.log(pinsFiltered);
    window.pins.render(pinsFiltered);
  }

  function onFilterChange(evt) {
    window.card.close();
    if (evt.target.type === 'checkbox') {
      if (evt.target.checked) {
        filterToAdd.features.push(filterMap.features[evt.target.id]);
      } else {
        var index = filterToAdd.features.indexOf(filterMap.features[evt.target.id]);
        filterToAdd.features.splice(index, 1);
      }
    }
    filterToAdd[filterMap[evt.target.name]] = evt.target.value;

    window.utils.debounce(applyFilter());
  }

  window.filter = {
    start: function (data) {
      pins = data;
      filtersSelectList.forEach(function (filter) {
        filter.addEventListener('change', onFilterChange);
      });
    },

    stop: function () {
      filtersSelectList.forEach(function (filter) {
        filter.removeEventListener('change', onFilterChange);
      });
    }
  };
})();
