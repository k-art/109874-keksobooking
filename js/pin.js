'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#map-pin-template');
  var similarPin = mapPinTemplate.content.querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  window.createPin = function (user) {
    var mapPin = similarPin.cloneNode(true);
    var mapPinImg = mapPin.querySelector('img');

    mapPin.style = 'left: ' + (user.location.x - PIN_WIDTH / 2) + 'px; top:' + (user.location.y - PIN_HEIGHT) + 'px;';
    mapPinImg.src = user.author.avatar;
    mapPinImg.alt = user.offer.title;

    return mapPin;
  };
})();
