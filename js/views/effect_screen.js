'use strict';

var EffectScreen = (function() {

  function init() {
    document.getElementById('effect_screen').style.width = window.innerWidth + 'px';
    document.getElementById('effect_screen').style.height = window.innerHeight + 'px';
    document.getElementById('canvas_area').style.width = (window.innerWidth * 0.9) + 'px';
    document.getElementById('canvas_area').style.height = (window.innerHeight * 0.85) + 'px';
  }

  function onChangeScreen(option) {

    document.getElementById('body').classList.add('no-margin');

    if (option.result) {
      var imgUrl = window.URL.createObjectURL(option.result);
      document.getElementById('preview').src = imgUrl;
      URL.revokeObjectURL(imgUrl);

      if (option && option.rotate) {
        document.getElementById('canvas_area').classList.add('rotate');
      }

      PictureEffect.effect({
        rotate: option.rotate
      });

    } else {

      var aspectRatio = option.source.videoHeight / option.source.videoWidth;

      var canvas = document.createElement('canvas');
      canvas.height = document.getElementById('canvas_area').offsetWidth * aspectRatio;
      canvas.width = document.getElementById('canvas_area').offsetWidth;

      var context = canvas.getContext('2d');
      var canvasArea = document.getElementById('canvas_area');
      context.drawImage(option.source, 0, 0, canvasArea.offsetWidth, canvasArea.offsetWidth * aspectRatio);

      var image = canvas.toDataURL();
      document.getElementById('preview').src = image;

      if (option && option.rotate) {
        document.getElementById('canvas_area').classList.add('rotate');
      }

      PictureEffect.effect({
        rotate: option.rotate
      });

    }
  }

  return {
    init: init,
    onChangeScreen: onChangeScreen,
  };

}());


