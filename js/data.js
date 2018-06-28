'use strict';

(function () {
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

  window.createUsersData = function (number) {
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
          price: window.utils.getRandomIntFromRange(MIN_PRICE, MAX_PRICE),
          type: window.utils.getRandomElement(HOUSES_TIPE),
          rooms: window.utils.getRandomIntFromRange(MIN_ROOMS, MAX_ROOMS),
          guests: 0,
          checkIn: window.utils.getRandomElement(HOURS),
          checkOut: window.utils.getRandomElement(HOURS),
          features: window.utils.getRandomArrayLength(FEATURES),
          description: '',
          photos: window.utils.shuffleArray(newPhotosArray)
        },
        location: {
          x: window.utils.getRandomIntFromRange(MIN_LOCATION_X, MAX_LOCATION_X),
          y: window.utils.getRandomIntFromRange(MIN_LOCATION_Y, MAX_LOCATION_Y)
        }
      };
      usersDataArray[i].offer.address = usersDataArray[i].location.x + ', ' + usersDataArray[i].location.y;
      usersDataArray[i].offer.guests = usersDataArray[i].offer.rooms * 2;
    }
    return usersDataArray;
  };
})();
