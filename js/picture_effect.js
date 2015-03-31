'use strict';

var PictureEffect = (function() {

  // declare our variables
  var seriously; // the main object that holds the entire composition
  var source;    // wrapper object for source video
  var effecter;  // edge detection effect
  var target;    // a wrapper object for our target canvas
  var reformat;

  function init() {
    // do nothing.
  }

  function effect(option, callback) {

    console.log(document.getElementById('canvas_area').offsetHeight);
    console.log(document.getElementById('canvas_area').offsetWidth);

    document.getElementById('canvas').height = document.getElementById('canvas_area').offsetHeight;
    document.getElementById('canvas').width = document.getElementById('canvas_area').offsetWidth;

    seriously = new Seriously();
    source = seriously.source('#preview');
    target = seriously.target('#canvas');

    reformat = seriously.transform('reformat');
    reformat.width = target.width;
    reformat.height = target.height;
    reformat.mode = 'contain';
    reformat.source = source;

    effecter = seriously.effect('vignette');
    effecter.amount = '#vignette-range';
    effecter.source = reformat;

    target.source = effecter;

    seriously.go();

    if (callback) {
      callback();
    }

  }

  return {
    init: init,
    effect: effect
  };

}());

