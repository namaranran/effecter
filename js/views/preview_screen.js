'use strict';

var PreviewScreen = (function() {

  function init() {
    document.getElementById('btn_take_picture').addEventListener('click', function() {
      Camera.takePictrue(function onComplete(result) {
        var videoElement = document.getElementById('video');
        ScreenManager.changeScreen('effect_screen', {
          result: result,
          source: videoElement,
          rotate: (Camera.getInputSource() === 'MozCameras') ? true : false
        });
      });
    });
  }

  function onChangeScreen(option) {
    document.getElementById('body').classList.add('no-margin');
    if (option && option.rotate) {
      document.getElementById('video').classList.add('rotate');
    }
  }

  return {
    init: init,
    onChangeScreen: onChangeScreen
  };

}());

