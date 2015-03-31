/* -*- Mode: js; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

'use strict';

var ScreenManager = (function() {

  var screens = {
    top_screen: 'TopScreen',
    camera_api_screen: 'CameraApiScreen',
    moz_camera_screen: 'MozCameraScreen',
    preview_screen: 'PreviewScreen',
    effect_screen: 'EffectScreen',
    get_user_media_screen: 'GetUserMediaScreen'
  };

  function init() {

    TopScreen.init();
    CameraApiScreen.init();
    GetUserMediaScreen.init();
    MozCameraScreen.init();
    PreviewScreen.init();
    EffectScreen.init();

    var elements = document.querySelectorAll("div[data-role='page']");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
    }

    changeScreen('top_screen');
  }

  function changeScreen(id, option) {
    var elements = document.querySelectorAll("div[data-role='page']");
    for (var i = 0; i < elements.length; i++) {
      if (id == elements[i].id) {
        elements[i].style.display = 'block';
        window[screens[id]].onChangeScreen(option);
      } else {
        elements[i].style.display = 'none';
      }
    }
  }

  return {
    init: init,
    changeScreen: changeScreen
  };

}());

