'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var formInputAddress = adForm.querySelector('#address');
  var formButtonReset = adForm.querySelector('.ad-form__reset');

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_SHARP_END = 20;

  // Данные пользователей для генерации массива
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

  var usersData = createUsersData(NUMBER_OF_USERS);

  var mapPinsBlock = document.querySelector('.map__pins');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinTemplate = document.querySelector('#map-pin-template');
  var similarMapPin = mapPinTemplate.content.querySelector('.map__pin');
  var similarMapCard = mapPinTemplate.content.querySelector('.map__card');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

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

  var homeTypeMap = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец',
    noName: 'Неизвестный тип жилья'
  };

  deactivatePage();
  createMapCard();
  var mapCard = map.querySelector('.map__card');
  var mapCardCloseBtn = mapCard.querySelector('.popup__close');

  function setMainPinAddress(evt) {
    var x = parseInt(mapPinMain.style.left, 10) - MAIN_PIN_WIDTH / 2;
    var y = parseInt(mapPinMain.style.top, 10) - MAIN_PIN_HEIGHT / 2;

    if (evt && evt.type === 'mouseup') {
      y = parseInt(mapPinMain.style.top, 10) - (MAIN_PIN_HEIGHT + MAIN_PIN_SHARP_END);
    }
    formInputAddress.value = x + ', ' + y;
  }

  function deactivatePage(evt) {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = true;
    }
    setMainPinAddress(evt);
  }

  function activatePage(evt) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }
    setMainPinAddress(evt);
  }

  // Активация/деактивация страницы
  mapPinMain.addEventListener('mouseup', function (evt) {
    activatePage(evt);
    renderMapPins(usersData);
  });

  formButtonReset.addEventListener('click', function (evt) {
    deactivatePage(evt);
    mapCard.classList.add('hidden');

    var mapPinsList = mapPinsBlock.querySelectorAll('.map__pin');
    for (var i = mapPinsList.length - 1; i >= 0; i--) {
      var child = mapPinsList[i];
      if (!child.classList.contains('map__pin--main')) {
        child.parentElement.removeChild(child);
      }
    }
  });


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
    var randomLength = array.length - Math.floor(Math.random() * array.length);
    for (var i = 0; i < randomLength; i++) {
      newArray[i] = array[i];
    }
    return newArray;
  }

  // Создание пользовательских данных
  function createUsersData(number) {
    var usersDataArray = [];

    for (var i = 0; i < number; i++) {
      var newPhotosArray = PHOTOS.slice();

      usersDataArray[i] = {
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
          photos: shuffleArray(newPhotosArray)
        },
        location: {
          x: getRandomIntFromRange(MIN_LOCATION_X, MAX_LOCATION_X),
          y: getRandomIntFromRange(MIN_LOCATION_Y, MAX_LOCATION_Y)
        }
      };
      usersDataArray[i].offer.address = usersDataArray[i].location.x + ', ' + usersDataArray[i].location.y;
      usersDataArray[i].offer.guests = usersDataArray[i].offer.rooms * 2;
    }
    return usersDataArray;
  }

  // Создание похожих объявлений на карте
  function createMapPin(user) {
    var mapPin = similarMapPin.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPin.style = 'left: ' + (user.location.x - PIN_WIDTH / 2) + 'px; top:' + (user.location.y - PIN_HEIGHT) + 'px;';
    mapPinImg.src = user.author.avatar;
    mapPinImg.alt = user.offer.title;

    return mapPin;
  }

  function getHomeType(value) {
    return value ? homeTypeMap[value] : homeTypeMap.noName;
  }

  // Создание карточки
  function createMapCard() {
    var newElement = similarMapCard.cloneNode(true);
    newElement.classList.add('hidden');
    var cardFragment = document.createDocumentFragment().appendChild(newElement);
    map.insertBefore(cardFragment, mapFiltersContainer);
  }

  function fillMapCard(user) {
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

    for (var i = 0; i < user.offer.photos.length; i++) {
      var photoItem = mapCardPhoto.cloneNode(true);
      photoItem.src = user.offer.photos[i];
      photosFragment.appendChild(photoItem);
    }
    mapCardPhotos.innerHTML = '';
    mapCardPhotos.appendChild(photosFragment);
  }

  function renderMapPins(usersDataArray) {
    var pinsFragment = document.createDocumentFragment();
    for (var i = 0; i < usersDataArray.length; i++) {
      var offerPin = createMapPin(usersDataArray[i]);
      offerPin.offerData = usersDataArray[i];
      offerPin.addEventListener('click', onOfferPinClick);
      pinsFragment.appendChild(offerPin);
    }
    mapPinsBlock.appendChild(pinsFragment);
  }

  function onOfferPinClick(evt) {
    fillMapCard(evt.currentTarget.offerData);
    mapCard.classList.remove('hidden');
    mapCardCloseBtn.addEventListener('click', function () {
      mapCard.classList.add('hidden');
    });
  }

  //  Валидация
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
})();
