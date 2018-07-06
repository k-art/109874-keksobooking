'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinsBlock = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var formInputAddress = adForm.querySelector('#address');

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_SHARP_END = 20;

  var mapPinMainStart = {
    x: parseInt(mapPinMain.style.left, 10),
    y: parseInt(mapPinMain.style.top, 10)
  };

  var adFormInputList = adForm.querySelectorAll('input, select, textarea');
  var adFormValuesDefault = saveDefaultFormValues(adFormInputList);

  var filtersForm = document.querySelector('.map__filters');
  var filtersSelectList = filtersForm.querySelectorAll('.map__filter, .map__checkbox');
  var filterFormValuesDefault = saveDefaultFormValues(filtersSelectList);

  function saveDefaultFormValues(inputList) {
    var valuesArray = {};
    for (var i = 0; i < inputList.length; i++) {
      valuesArray[inputList[i].id] = inputList[i].value;
    }
    return valuesArray;
  }

  function resetDefaultFormValues(defaultValues, inputList) {
    for (var i = 0; i < inputList.length; i++) {
      for (var key in defaultValues) {
        if (inputList[i].id === key) {
          inputList[i].value = defaultValues[inputList[i].id];
        } else if (inputList[i].type === 'checkbox') {
          inputList[i].checked = false;
        }
      }
    }
  }

  function setMainPinAddress(evt) {
    var x = parseInt(mapPinMain.style.left, 10) + Math.floor(MAIN_PIN_WIDTH / 2);
    var y = parseInt(mapPinMain.style.top, 10) + Math.floor(MAIN_PIN_HEIGHT / 2);

    if (evt && evt.type === 'mousedown') {
      y = parseInt(mapPinMain.style.top, 10) + (MAIN_PIN_HEIGHT + MAIN_PIN_SHARP_END);
    }
    formInputAddress.value = x + ', ' + y;
  }

  function resetMainPin() {
    mapPinMain.style.left = mapPinMainStart.x + 'px';
    mapPinMain.style.top = mapPinMainStart.y + 'px';
  }

  window.cancel = {
    pins: function () {
      var mapPinsList = mapPinsBlock.querySelectorAll('.map__pin');
      for (var i = mapPinsList.length - 1; i >= 0; i--) {
        var child = mapPinsList[i];
        if (!child.classList.contains('map__pin--main')) {
          child.parentElement.removeChild(child);
        }
      }
    },

    card: function () {
      var card = map.querySelector('.map__card');
      if (card) {
        card.parentNode.removeChild(card);
      }
    }
  };

  function reset() {
    resetMainPin();
    window.cancel.pins();
    window.cancel.card();
    resetDefaultFormValues(adFormValuesDefault, adFormInputList);
    resetDefaultFormValues(filterFormValuesDefault, filtersSelectList);
    setMainPinAddress();
  }

  window.activatePage = function () {
    window.isActivePage = true;
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }
    window.backend.load(onSuccessLoad, window.error);
  };

  function onSuccessLoad(data) {
    window.filterPins(data);
  }

  window.deactivatePage = function () {
    window.isActivePage = false;
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = true;
    }
    reset();
  };

  function onPinPositionChange(evt) {
    setMainPinAddress(evt);
  }

  window.deactivatePage();
  window.movePin(mapPinMain, onPinPositionChange);
})();
