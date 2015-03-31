'use strict';

var MozCameraScreen = (function() {

  function init() {
    document.getElementById('btn_moz_camera_launc_camera').addEventListener('click', function() {
      var videoElement = document.getElementById('video');
      Camera.launchCamera('moz-cameras', videoElement, function onComplete(result) {
        if (result == 'success') {
          ScreenManager.changeScreen('preview_screen', {
            rotate: true
          });
        } else {
          document.getElementById('moz_camera_launc_camera_result').innerHTML = 'カメラの起動に失敗しました。';
        }
      });
    });
  }

  function onChangeScreen() {
    // do nothing
  }

  return {
    init: init,
    onChangeScreen: onChangeScreen
  };

}());

