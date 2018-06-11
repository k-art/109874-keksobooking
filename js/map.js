'use strict';

(function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var NUMBER_OF_USERS = 8;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var HOUSES_TIPE = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_LOCATION_X = 300;
  var MAX_LOCATION_X = 900;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var HOURS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  function getRandomElement(data) {
    var index = Math.floor(Math.random() * data.length);
    return data[index];
  }

  function getRandomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function getRandomArrayLength(array) {
    shuffleArray(array);
    var newArray = [];
    for (var i = 0; i < array.length - Math.floor(Math.random() * array.length); i++) {
      newArray[i] = array[i];
    }
    return newArray;
  }

  function createUsersData(number) {
    var usersData = [];
    for (var i = 0; i < number; i++) {
      usersData[i] = {
        author: {
          avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
        },
        offer: {
          title: OFFER_TITLES[i],
          address: '',
          price: getRandomIntFromRange(MIN_PRICE, MAX_PRICE),
          type: getRandomElement(HOUSES_TIPE),
          rooms: getRandomIntFromRange(MIN_ROOMS, MAX_ROOMS),
          guests: 0,
          checkIn: getRandomElement(HOURS),
          checkOut: getRandomElement(HOURS),
          features: getRandomArrayLength(FEATURES),
          description: '',
          photos: shuffleArray(PHOTOS)
        },
        location: {
          x: getRandomIntFromRange(MIN_LOCATION_X, MAX_LOCATION_X),
          y: getRandomIntFromRange(MIN_LOCATION_Y, MAX_LOCATION_Y)
        }
      };
      usersData[i].offer.address = usersData[i].location.x + ', ' + usersData[i].location.y;
      usersData[i].offer.guests = usersData[i].offer.rooms * 2;
    }
    return usersData;
  }

  var usersData = createUsersData(NUMBER_OF_USERS);

  var mapPinsBlock = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinTemplate = document.querySelector('#map-pin-template');
  var similarMapPin = mapPinTemplate.content.querySelector('.map__pin');
  var similarMapCard = mapPinTemplate.content.querySelector('.map__card');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  function renderMapPin(user) {
    var mapPin = similarMapPin.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPin.style = 'left: ' + (user.location.x - PIN_WIDTH / 2) + 'px; top:' + (user.location.y - PIN_HEIGHT) + 'px;';
    mapPinImg.src = user.author.avatar;
    mapPinImg.alt = user.offer.title;

    return mapPin;
  }

  function getHomeType(value) {
    if (value === 'flat') {
      return 'Квартира';
    }
    if (value === 'bungalo') {
      return 'Бунгало';
    }
    if (value === 'house') {
      return 'Дом';
    }
    if (value === 'palace') {
      return 'Дворец';
    }
    return 'Неизвестный тип жилья';
  }

  function renderMapCard(user) {
    var mapCard = similarMapCard.cloneNode(true);

    var mapCardPhotos = mapCard.querySelector('.popup__photos');
    var mapCardPhoto = mapCardPhotos.querySelector('img');
    var photosFragment = document.createDocumentFragment();

    mapCard.querySelector('img').src = user.author.avatar;
    mapCard.querySelector('.popup__title').textContent = user.offer.title;
    mapCard.querySelector('.popup__text--address').textContent = user.offer.address;
    mapCard.querySelector('.popup__text--price').textContent = user.offer.price + ' ₽/ночь';
    mapCard.querySelector('.popup__type').textContent = getHomeType(user.offer.type);
    mapCard.querySelector('.popup__text--capacity').textContent = user.offer.rooms + ' комнаты для ' + user.offer.guests + ' гостей';
    mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + user.offer.checkIn + ', выезд до ' + user.offer.checkOut;
    mapCard.querySelector('.popup__features').textContent = user.offer.features.join(', ');
    mapCard.querySelector('.popup__description').textContent = user.offer.description;
    mapCardPhoto.src = user.offer.photos[0];

    for (var i = 1; i < user.offer.photos.length; i++) {
      var photoItem = mapCardPhoto.cloneNode(true);
      photoItem.src = user.offer.photos[i];
      photosFragment.appendChild(photoItem);
    }
    mapCardPhotos.appendChild(photosFragment);

    return mapCard;
  }

  var pinsFragment = document.createDocumentFragment();
  for (var i = 0; i < usersData.length; i++) {
    pinsFragment.appendChild(renderMapPin(usersData[i]));
  }
  var cardFragment = document.createDocumentFragment().appendChild(renderMapCard(usersData[0]));

  mapPinsBlock.appendChild(pinsFragment);
  map.insertBefore(cardFragment, mapFiltersContainer);
})();
