'use strict';

var TopScreen = (function() {

  function init() {

    document.getElementById('btn_change_screen_camera_api').addEventListener('click', function() {
      ScreenManager.changeScreen('camera_api_screen');
    }, false);

    document.getElementById('btn_change_screen_get_user_media').addEventListener('click', function() {
      ScreenManager.changeScreen('get_user_media_screen');
    }, false);

    document.getElementById('btn_change_screen_moz_camera').addEventListener('click', function() {
      ScreenManager.changeScreen('moz_camera_screen');
    }, false);

  }

  function onChangeScreen() {
    // do nothing
  }

  return {
    init: init,
    onChangeScreen: onChangeScreen
  };

}());

