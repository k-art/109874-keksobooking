'use strict';

window.utils = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  return {
    isEnterPressed: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },

    isEscPressed: function (evt) {
      return evt.keyCode && evt.keyCode === ESC_KEY_CODE;
    },

    getRandomElement: function (data) {
      var index = Math.floor(Math.random() * data.length);
      return data[index];
    },

    getRandomIntFromRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },

    getRandomArrayLength: function (array) {
      window.utils.shuffleArray(array);
      var newArray = [];
      var randomLength = array.length - Math.floor(Math.random() * array.length);
      for (var i = 0; i < randomLength; i++) {
        newArray[i] = array[i];
      }
      return newArray;
    }
  };
})();
