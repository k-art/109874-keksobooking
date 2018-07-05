'use strict';

(function () {
  var NUMBER_OF_ELEMENTS = 5;
  var map = document.querySelector('.map');
  var mapPinsBlock = map.querySelector('.map__pins');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  function addCardListeners() {
    var mapCard = map.querySelector('.map__card');
    var popupClose = mapCard.querySelector('.popup__close');

    function closePopup(newCard) {
      newCard.classList.add('hidden');
    }

    popupClose.addEventListener('click', function () {
      closePopup(mapCard);
    });
    document.addEventListener('keydown', function (evt) {
      if (window.utils.isEscPressed(evt)) {
        closePopup(mapCard);
      }
    });
  }

  function onOfferPinClick(evt) {
    window.cancel.card();

    var newCard = window.createCard(evt.currentTarget.offerData);
    var cardFragment = document.createDocumentFragment().appendChild(newCard);
    map.insertBefore(cardFragment, mapFiltersContainer);

    addCardListeners();
  }

  window.render = function (userPins) {
    var pinsFragment = document.createDocumentFragment();

    for (var i = 0; i < NUMBER_OF_ELEMENTS; i++) {
      var offerPin = window.createPin(userPins[i]);
      offerPin.offerData = userPins[i];
      offerPin.addEventListener('click', onOfferPinClick);
      pinsFragment.appendChild(offerPin);
    }
    window.cancel.pins();
    mapPinsBlock.appendChild(pinsFragment);
  };
})();
