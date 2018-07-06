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

  function compareFeatures(pinArray, filterArray) {
    var rank = filterArray.length;
    if (pinArray.length < filterArray.length) {
      rank -= pinArray.length;
    }
    return rank;
  }


  function getRank(pin) {
    var rank = 0;

    if (pin.offer.type === filterToAdd.type) {
      rank += 2;
    }
    if (evaluatePrice(pin.offer.price) === filterToAdd.price) {
      rank += 2;
    }
    if (pin.offer.rooms === parseInt(filterToAdd.rooms, 10)) {
      rank += 2;
    }
    if (pin.offer.guests === parseInt(filterToAdd.guests, 10)) {
      rank += 2;
    }
    rank += compareFeatures(pin.offer.features, filterToAdd.features);

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  window.filterPins = function (data) {
    if (data) {
      pins = data;
    }

    window.render(pins.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));

    function onFilterChange(evt) {
      if (evt.target.type === 'checkbox') {
        if (evt.target.checked) {
          filterToAdd.features.push(filterMap.features[evt.target.id]);
        } else {
          var index = filterToAdd.features.indexOf(filterMap.features[evt.target.id]);
          filterToAdd.features.splice(index, 1);
        }
      }

      filterToAdd[filterMap[evt.target.name]] = evt.target.value;
      window.filterPins();
      removeFilterListeners(filtersSelectList);
    }

    function addFilterListeners(filters) {
      filters.forEach(function (filter) {
        filter.addEventListener('change', onFilterChange);
      });
    }

    function removeFilterListeners(filters) {
      filters.forEach(function (filter) {
        filter.removeEventListener('change', onFilterChange);
      });
    }

    if (window.isActivePage) {
      addFilterListeners(filtersSelectList);
    }
  };
})();
