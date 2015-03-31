'use strict';

var Camera = (function() {

  var camera = null;

  function init() {
    // do nothing
  }

  function launchCamera(type, videoElement, callback) {
    switch(type) {
      case 'camera-api':
        break;
      case 'get-user-media':
        camera = GetUserMedia;
        break;
      case 'moz-cameras':
        camera = MozCameras;
        break;
      default:
        return;
    }
    startCapture(videoElement, callback);
  }

  function startCapture(videoElement, callback) {
    if (camera) {
      camera.startCapture(videoElement, callback);
    }
  }

  function takePictrue(callback) {
    if (camera) {
      camera.takePictrue(function onComplete(result) {
        callback(result);
      });
    }
  }

  function autoFocus(callback) {
    if (camera) {
      camera.autoFocus();
    }
  }

  function playShutterSound(callback) {
    var player = new Audio();
    player.src = './sounds/se-033a.mp3';
    player.play();

    player.addEventListener('ended', function playEnded() {
      if (player) {
        callback();
      }
    }, false);
  }

  function getInputSource() {
    if (camera) {
      return camera.getInputSource();
    }
  }

  return {
    init: init,
    launchCamera: launchCamera,
    takePictrue: takePictrue,
    autoFocus: autoFocus,
    playShutterSound: playShutterSound,
    getInputSource: getInputSource
  };

}());

var GetUserMedia = (function() {

  var inputSource = 'GetUserMedia';

  function getInputSource() {
    return inputSource;
  }

  function startCapture(videoElement, callback) {

    navigator.getUserMedia = navigator.mozGetUserMedia;

    if (!navigator.getUserMedia) {
      console.error('getUserMedia is not support ');
      return;
    } else {
      navigator.getUserMedia(
        { video: true },
        function onSuccess(stream) {
          if (videoElement) {
            videoElement.src = window.URL.createObjectURL(stream);
            videoElement.play();
          }
        },
        function onError(error) {
          callback('error');
        }
      );
    }

    videoElement.addEventListener('canplay', function() {
      callback('success');
    });
  }

  function takePictrue(callback) {
    Camera.playShutterSound(function onComplete() {
      callback(null);
    });
  }

  return {
    startCapture: startCapture,
    takePictrue: takePictrue,
    getInputSource: getInputSource
  };

}());


var MozCameras = (function() {

  var cameraControl = null;
  var inputSource = 'MozCameras';

  function getInputSource() {
    return inputSource;
  }

  function startCapture(videoElement, callback) {
    var cameras = window.navigator.mozCameras;

    if (!cameras) {
      callback('error');
      return;
    }

    var options = {
      mode: 'picture',
      recorderProfile: 'jpg',
      previewSize: {
        width: 1280,
        height: 720
      }
    };

    var cameraDevice = navigator.mozCameras.getListOfCameras()[0];

    function onSuccess(camera) {
      cameraControl = camera;
      videoElement.mozSrcObject = camera;
      videoElement.play();
      callback('success');
    }

    function onError(error) {
      console.warn(error);
      callback('error');
    }

    navigator.mozCameras.getCamera(cameraDevice, options, onSuccess, onError);
  }

  function takePictrue(callback) {
    if (cameraControl) {
      autoFocus(function onComplete() {

        var pictureOptions = {
          rotation: 90
        };

        cameraControl.takePicture(pictureOptions, function onSuccess(blob) {
          Camera.playShutterSound(function onComplete() {
            callback(blob);
          });
        });
      });
    }
  }

  function autoFocus(callback) {
    if (cameraControl) {
      cameraControl.autoFocus(
        function onSuccess() {
          callback('success');
        },
        function onError() {
          callback('error');
        }
      );
    }
  }

  return {
    startCapture: startCapture,
    takePictrue: takePictrue,
    autoFocus: autoFocus,
    getInputSource: getInputSource
  };

}());

