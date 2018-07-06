'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#map-pin-template');
  var similarMapCard = mapPinTemplate.content.querySelector('.map__card');

  var homeTypeMap = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец',
    noName: 'Неизвестный тип жилья'
  };

  function getHomeType(value) {
    return value ? homeTypeMap[value] : homeTypeMap.noName;
  }

  window.createCard = function (user) {
    var newCard = similarMapCard.cloneNode(true);
    var mapCardPhotos = newCard.querySelector('.popup__photos');
    var mapCardPhoto = mapCardPhotos.querySelector('img');
    var photosFragment = document.createDocumentFragment();

    newCard.querySelector('img').src = user.author.avatar;
    newCard.querySelector('.popup__title').textContent = user.offer.title;
    newCard.querySelector('.popup__text--address').textContent = user.offer.address;
    newCard.querySelector('.popup__text--price').textContent = user.offer.price + ' ₽/ночь';
    newCard.querySelector('.popup__type').textContent = getHomeType(user.offer.type);
    newCard.querySelector('.popup__text--capacity').textContent = user.offer.rooms + ' комнаты для ' + user.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + user.offer.checkin + ', выезд до ' + user.offer.checkout;
    newCard.querySelector('.popup__features').textContent = user.offer.features.join(', ');
    newCard.querySelector('.popup__description').textContent = user.offer.description;

    for (var i = 0; i < user.offer.photos.length; i++) {
      var photoItem = mapCardPhoto.cloneNode(true);
      photoItem.src = user.offer.photos[i];
      photosFragment.appendChild(photoItem);
    }
    mapCardPhotos.innerHTML = '';
    mapCardPhotos.appendChild(photosFragment);

    return newCard;
  };
})();
