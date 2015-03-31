'use strict';

var CameraApiScreen = (function() {

  function init() {
    read(function onRead(result) {
      document.getElementById('menu_area').classList.add('visible');
      ScreenManager.changeScreen('effect_screen', {
        result: result,
        source: null
      });

    });
  }

  function onChangeScreen() {
    // do nothing
  }

  function read(callback) {
    document.getElementById('file').onchange = function(event) {
      var files = event.target.files;
      if (files && files.length > 0) {
        callback(files[0]);
      }
    };
  }

  return {
    init: init,
    onChangeScreen: onChangeScreen
  };

}());

