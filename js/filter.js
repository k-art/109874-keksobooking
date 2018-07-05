'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var filters = {
    type: mapFilters.querySelector('#housing-type'),
    price: mapFilters.querySelector('#housing-price'),
    rooms: mapFilters.querySelector('#housing-rooms'),
    guests: mapFilters.querySelector('#housing-guests')
  };
  var houseType;
  var housePrice;
  var houseRooms;
  var houseGuests;
  var pins = [];


  function getRank(pin) {
    var rank = 0;

    if (pin.offer.type === houseType) {
      rank += 2;
    }
    if (pin.offer.price === housePrice) {
      rank += 2;
    }
    if (pin.offer.rooms === houseRooms) {
      rank += 2;
    }
    if (pin.offer.guests === houseGuests) {
      rank += 2;
    }

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

    // function onItemChange(evt) {
    //   houseType = evt.target.value;
    //   //   window.filterPins();
    // }

    if (window.isActivePage) {

      filters.type.addEventListener('change', function (evt) {
        houseType = evt.target.value;
        window.filterPins();
      });

      filters.price.addEventListener('change', function (evt) {
        housePrice = evt.target.value;
        window.filterPins();
      });

      filters.rooms.addEventListener('change', function (evt) {
        houseRooms = evt.target.value;
        window.filterPins();
      });

      filters.guests.addEventListener('change', function (evt) {
        houseGuests = evt.target.value;
        window.filterPins();
      });
    }
  };
})();
