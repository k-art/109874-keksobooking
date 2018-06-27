'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var formButtonReset = adForm.querySelector('.ad-form__reset');
  var mapPinsBlock = document.querySelector('.map__pins');
  var roomTimeIn = adForm.querySelector('#timein');
  var roomTimeOut = adForm.querySelector('#timeout');
  var roomType = adForm.querySelector('#type');
  var roomPrice = adForm.querySelector('#price');
  var roomNumber = adForm.querySelector('#room_number');
  var roomCapacity = adForm.querySelector('#capacity');

  var roomMap = {
    1: {
      optionStates: [true, true, false, true],
      selectItem: 2
    },
    2: {
      optionStates: [true, false, false, true],
      selectItem: 1
    },
    3: {
      optionStates: [false, false, false, true],
      selectItem: 0
    },
    100: {
      optionStates: [true, true, true, false],
      selectItem: 3
    }
  };

  var priceMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  function changeTime(checkedTime, timeToChange) {
    timeToChange.value = checkedTime.value;
  }

  function choosePrice(type) {
    var priceToAdd = priceMap[type];
    roomPrice.min = priceToAdd;
    roomPrice.placeholder = priceToAdd;
  }

  function matchRooms(roomIndex) {
    var options = roomCapacity.querySelectorAll('option');
    var roomAvailability = roomMap[roomIndex].optionStates;
    var roomToSelect = roomMap[roomIndex].selectItem;

    for (var i = 0; i < options.length; i++) {
      options[i].disabled = roomAvailability[i];
    }
    options[roomToSelect].selected = true;
  }

  matchRooms(roomNumber.value);

  roomTimeIn.addEventListener('change', function () {
    changeTime(roomTimeIn, roomTimeOut);
  });

  roomTimeOut.addEventListener('change', function () {
    changeTime(roomTimeOut, roomTimeIn);
  });

  roomType.addEventListener('change', function (evt) {
    choosePrice(evt.target.value);
  });

  roomNumber.addEventListener('change', function (evt) {
    matchRooms(evt.target.value);
  });

  formButtonReset.addEventListener('click', function (evt) {
    window.deactivatePage(evt);

    var mapPinsList = mapPinsBlock.querySelectorAll('.map__pin');
    for (var i = mapPinsList.length - 1; i >= 0; i--) {
      var child = mapPinsList[i];
      if (!child.classList.contains('map__pin--main')) {
        child.parentElement.removeChild(child);
      }
    }
  });
})();
