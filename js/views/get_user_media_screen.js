'use strict';

var GetUserMediaScreen = (function() {

  function init() {
    document.getElementById('btn_get_user_media_launc_camera').addEventListener('click', function() {
      var videoElement = document.getElementById('video');
      Camera.launchCamera('get-user-media', videoElement, function onComplete(result) {
        console.log('MozCameraScreen.init() onComplete() enter');
        if (result == 'success') {
          ScreenManager.changeScreen('preview_screen', {
            rotate: false
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

