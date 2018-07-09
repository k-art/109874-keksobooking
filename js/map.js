'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_SHARP_END = 20;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var formInputAddress = adForm.querySelector('#address');

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
    var valuesArray = [];
    inputList.forEach(function (input) {
      valuesArray[input.id] = input.value;
    });
    return valuesArray;
  }

  function resetDefaultFormValues(defaultValues, inputList) {
    inputList.forEach(function (input) {
      for (var key in defaultValues) {
        if (input.id === key) {
          input.value = defaultValues[input.id];
        } else if (input.type === 'checkbox') {
          input.checked = false;
        }
      }
    });
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

  function reset() {
    resetMainPin();
    window.pins.remove();
    window.card.close();
    resetDefaultFormValues(adFormValuesDefault, adFormInputList);
    resetDefaultFormValues(filterFormValuesDefault, filtersSelectList);
    setMainPinAddress();
    window.filter.stop();
  }

  function setFieldsAvailability(availability) {
    formFieldsets.forEach(function (fieldset) {
      fieldset.disabled = !availability;
    });
  }

  window.activatePage = function () {
    window.isActivePage = true;
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setFieldsAvailability(window.isActivePage);
    window.backend.load(onSuccessLoad, onErrorLoad);
  };

  function onSuccessLoad(data) {
    window.pins.render(data);
    window.filter.start(data);
  }

  function onErrorLoad(errorMessage) {
    window.error(errorMessage);
  }

  window.deactivatePage = function () {
    window.isActivePage = false;
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    setFieldsAvailability(window.isActivePage);
    reset();
  };

  function onPinPositionChange(evt) {
    setMainPinAddress(evt);
  }

  window.deactivatePage();
  window.movePin(mapPinMain, onPinPositionChange);
})();
