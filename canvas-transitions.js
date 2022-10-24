let canvas;
let canvasContext;
let timer, timer2;
let pictures = [];
let images = [];
let imageCounter = 0;
let Transitions;
let cycleStarted = false;
let picturePixelWidth, picturePixelHeight;
let pictureSelections = [];

window.onload = function () {
  $("#canvas").fadeTo(2000, 1.0);
  canvas = document.getElementById("cyclePictures");
  canvasContext = canvas.getContext("2d");
  //canvasContext.canvas.width = document.body.clientWidth;
  //canvasContext.canvas.width = document.body.clientHeight;
  createTransitionsObject();
  (picturePixelWidth = canvas.width / 20),
    (picturePixelHeight = canvas.height / 20);

  // Add new image for every image that you want to display
  newImage(picturePixelWidth, picturePixelHeight, "[add_image_path_here]");
  newImage(picturePixelWidth, picturePixelHeight, "[add_image_path_here]");
  newImage(picturePixelWidth, picturePixelHeight, "[add_image_path_here]");
  newImage(picturePixelWidth, picturePixelHeight, "[add_image_path_here]");
  newImage(picturePixelWidth, picturePixelHeight, "[add_image_path_here]");
  newImage(picturePixelWidth, picturePixelHeight, "[add_image_path_here]");
  newImage(picturePixelWidth, picturePixelHeight, "[add_image_path_here]");
  newImage(picturePixelWidth, picturePixelHeight, "[add_image_path_here]");

  // Add all radio buttons from the DOM for picture selection
  pictureSelections.push(document.getElementById("picture0"));
  pictureSelections.push(document.getElementById("picture1"));
  pictureSelections.push(document.getElementById("picture2"));
  pictureSelections.push(document.getElementById("picture3"));
  pictureSelections.push(document.getElementById("picture4"));
  pictureSelections.push(document.getElementById("picture5"));
  pictureSelections.push(document.getElementById("picture6"));
  pictureSelections.push(document.getElementById("picture7"));
  setTimeout(function () {
    cyclePictures(pictures[imageCounter], images[imageCounter]);
  }, 1500);
  timer = setInterval(function () {
    cyclePictures(pictures[imageCounter], images[imageCounter]);
  }, 4000);
};

function newImage(width, height, name) {
  var image = new Image(width, height);
  image.src = name;
  var ImageObject = {
    sx: 0,
    sy: 0,
    sw: width,
    sh: height,
    x: 0,
    y: 0,
    w: width,
    h: height,
    draw: function () {
      canvasContext.drawImage(
        image,
        this.sx,
        this.sy,
        this.sx + this.sw,
        this.sy + this.sh,
        this.x,
        this.y,
        this.x + this.w + 1,
        this.y + this.h + 1
      );
    },
  };
  pictures.push(ImageObject);
  images.push(image);
}

function cyclePictures(ImageObject, image) {
  pictureSelections[imageCounter].checked = true;
  resetObject(ImageObject);
  imageCounter = imageCounter >= pictures.length - 1 ? 0 : imageCounter + 1;
  var randomNumber = Math.floor(Math.random() * 15);

  switch (randomNumber) {
    case 0:
      Transitions.smallSquaresTopLeftToBottomRight(ImageObject, image);
      break;
    case 1:
      Transitions.smallSquaresTopRightToBottomLeft(ImageObject, image);
      break;
    case 2:
      Transitions.smallSquaresBottomLeftToTopRight(ImageObject, image);
      break;
    case 3:
      Transitions.smallSquaresBottomRightToTopLeft(ImageObject, image);
      break;
    case 4:
      Transitions.largeSquaresLeftToRight(ImageObject, image);
      break;
    case 5:
      Transitions.largeSquaresRightToLeft(ImageObject, image);
      break;
    case 6:
      Transitions.largeSquaresTopToBottom(ImageObject, image);
      break;
    case 7:
      Transitions.largeSquaresBottomToTop(ImageObject, image);
      break;
    case 8:
      Transitions.smallTopLeftToLarge(ImageObject, image);
      break;
    case 9:
      Transitions.smallTopRightToLarge(ImageObject, image);
      break;
    case 10:
      Transitions.smallBottomRightToLarge(ImageObject, image);
      break;
    case 11:
      Transitions.smallBottomLeftToLarge(ImageObject, image);
      break;
    case 12:
      Transitions.smallCenterToLarge(ImageObject, image);
      break;
    case 13:
      Transitions.multiObjectOuterEdgesToCenterX(ImageObject, image);
      break;
    case 14:
      Transitions.multiObjectOuterEdgesToCenterY(ImageObject, image);
      break;
    case 15:
      Transitions.multiObjectThreeIntersectStartLeft(ImageObject, image);
      break;
    default:
      break;
  }
  cycleStarted = true;
}

function createTransitionsObject() {
  Transitions = {
    smallSquaresTopLeftToBottomRight: function (ImageObject, image) {
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.x >= canvas.width) {
            ImageObject.x = 0;
            ImageObject.sx = ImageObject.x;
            if (ImageObject.y >= canvas.height) {
              clearInterval(timer2);
              timer2 = null;
            } else {
              ImageObject.y += ImageObject.h;
              ImageObject.sy = ImageObject.y;
            }
          } else {
            ImageObject.x += ImageObject.w;
            ImageObject.sx = ImageObject.x;
          }
        }
      }, 1000 / 120);
    },

    smallSquaresTopRightToBottomLeft: function (ImageObject, image) {
      ImageObject.x = canvas.width - ImageObject.w;
      ImageObject.sx = ImageObject.x;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.x <= 0) {
            ImageObject.x = canvas.width - ImageObject.w;
            ImageObject.sx = ImageObject.x;
            if (ImageObject.y >= canvas.height) {
              clearInterval(timer2);
              timer2 = null;
            } else {
              ImageObject.y += ImageObject.h;
              ImageObject.sy = ImageObject.y;
            }
          } else {
            ImageObject.x -= ImageObject.w;
            ImageObject.sx = ImageObject.x;
          }
        }
      }, 1000 / 120);
    },

    smallSquaresBottomLeftToTopRight: function (ImageObject, image) {
      ImageObject.h += ImageObject.h;
      ImageObject.sh = ImageObject.h;
      ImageObject.y = canvas.height - ImageObject.h;
      ImageObject.sy = ImageObject.y;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.x >= canvas.width) {
            ImageObject.x = 0;
            ImageObject.sx = ImageObject.x;
            if (ImageObject.y <= 0) {
              clearInterval(timer2);
              timer2 = null;
            } else {
              ImageObject.y -= ImageObject.h;
              ImageObject.sy = ImageObject.y;
            }
          } else {
            ImageObject.x += ImageObject.w;
            ImageObject.sx = ImageObject.x;
          }
        }
      }, 1000 / 120);
    },

    smallSquaresBottomRightToTopLeft: function (ImageObject, image) {
      ImageObject.h += ImageObject.h;
      ImageObject.sh = ImageObject.h;
      ImageObject.x = canvas.width - ImageObject.w;
      ImageObject.sx = ImageObject.x;
      ImageObject.y = canvas.height - ImageObject.h;
      ImageObject.sy = ImageObject.y;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.x <= 0) {
            ImageObject.x = canvas.width - ImageObject.w;
            ImageObject.sx = ImageObject.x;
            if (ImageObject.y <= 0) {
              clearInterval(timer2);
              timer2 = null;
            } else {
              ImageObject.y -= ImageObject.h;
              ImageObject.sy = ImageObject.y;
            }
          } else {
            ImageObject.x -= ImageObject.w;
            ImageObject.sx = ImageObject.x;
          }
        }
      }, 1000 / 120);
    },

    largeSquaresLeftToRight: function (ImageObject, image) {
      ImageObject.h = canvas.height;
      ImageObject.sh = ImageObject.h;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.x >= canvas.width) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.x += ImageObject.w / 25;
            ImageObject.sx = ImageObject.x;
          }
        }
      }, 1000 / 916);
    },

    largeSquaresRightToLeft: function (ImageObject, image) {
      ImageObject.h = canvas.height;
      ImageObject.sh = ImageObject.h;
      ImageObject.x = canvas.width - ImageObject.w;
      ImageObject.sx = ImageObject.x;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.x <= 0) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.x -= ImageObject.w / 15;
            ImageObject.sx = ImageObject.x;
          }
        }
      }, 1000 / 916);
    },

    largeSquaresTopToBottom: function (ImageObject, image) {
      ImageObject.w = canvas.width;
      ImageObject.sw = ImageObject.w;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.y >= canvas.height) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.y += ImageObject.h / 20;
            ImageObject.sy = ImageObject.y;
          }
        }
      }, 1000 / 916);
    },

    largeSquaresBottomToTop: function (ImageObject, image) {
      ImageObject.w = canvas.width;
      ImageObject.sw = ImageObject.w;
      ImageObject.y = canvas.height - ImageObject.h;
      ImageObject.sy = ImageObject.y;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.y <= 0) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.y -= ImageObject.h / 15;
            ImageObject.sy = ImageObject.y;
          }
        }
      }, 1000 / 916);
    },

    smallTopLeftToLarge: function (ImageObject, image) {
      ImageObject.w = 0;
      ImageObject.sw = ImageObject.w;
      ImageObject.h = 0;
      ImageObject.sh = ImageObject.h;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.w >= canvas.width || ImageObject.h >= canvas.height) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.w += picturePixelWidth / 9;
            ImageObject.sw = ImageObject.w;
            ImageObject.h += picturePixelHeight / 9;
            ImageObject.sh = ImageObject.h;
          }
        }
      }, 1000 / 120);
    },

    smallTopRightToLarge: function (ImageObject, image) {
      ImageObject.w = 0;
      ImageObject.sw = ImageObject.w;
      ImageObject.h = 0;
      ImageObject.sh = ImageObject.h;
      ImageObject.x = canvas.width;
      ImageObject.sx = ImageObject.x;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.x <= 0) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.w += picturePixelWidth / 9;
            ImageObject.sw = ImageObject.w;
            ImageObject.h += picturePixelHeight / 9;
            ImageObject.sh = ImageObject.h;
            ImageObject.x -= picturePixelWidth / 9;
            ImageObject.sx = ImageObject.x;
          }
        }
      }, 1000 / 120);
    },

    smallBottomRightToLarge: function (ImageObject, image) {
      ImageObject.w = 0;
      ImageObject.sw = ImageObject.w;
      ImageObject.h = 0;
      ImageObject.sh = ImageObject.h;
      ImageObject.x = canvas.width;
      ImageObject.sx = ImageObject.x;
      ImageObject.y = canvas.height;
      ImageObject.sy = ImageObject.y;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.x <= 0) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.w += picturePixelWidth / 9;
            ImageObject.sw = ImageObject.w;
            ImageObject.h += picturePixelHeight / 9;
            ImageObject.sh = ImageObject.h;
            ImageObject.x -= picturePixelWidth / 9;
            ImageObject.sx = ImageObject.x;
            ImageObject.y -= picturePixelHeight / 9;
            ImageObject.sy = ImageObject.y;
          }
        }
      }, 1000 / 120);
    },

    smallBottomLeftToLarge: function (ImageObject, image) {
      ImageObject.w = 0;
      ImageObject.sw = ImageObject.w;
      ImageObject.h = 0;
      ImageObject.sh = ImageObject.h;
      ImageObject.y = canvas.height;
      ImageObject.sy = ImageObject.y;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.y <= 0) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.w += picturePixelWidth / 9;
            ImageObject.sw = ImageObject.w;
            ImageObject.h += picturePixelHeight / 9;
            ImageObject.sh = ImageObject.h;
            ImageObject.y -= picturePixelHeight / 9;
            ImageObject.sy = ImageObject.y;
          }
        }
      }, 1000 / 120);
    },

    smallCenterToLarge: function (ImageObject, image) {
      ImageObject.w = 0;
      ImageObject.sw = ImageObject.w;
      ImageObject.h = 0;
      ImageObject.sh = ImageObject.h;
      ImageObject.x = canvas.width / 2 - canvas.width / 4;
      ImageObject.sx = ImageObject.x;
      ImageObject.y = canvas.height / 2 - canvas.height / 4;
      ImageObject.sy = ImageObject.y;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true)
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
          ImageObject.draw();
          if (ImageObject.x <= 0 || ImageObject.y <= 0) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.w += canvas.width / 150;
            ImageObject.sw = ImageObject.w;
            ImageObject.h += canvas.height / 150;
            ImageObject.sh = ImageObject.h;

            ImageObject.x -= canvas.width / 150 / 4;
            ImageObject.sx = ImageObject.x;
            ImageObject.y -= canvas.height / 150 / 4;
            ImageObject.sy = ImageObject.y;
          }
        }
      }, 1000 / 80);
    },

    multiObjectOuterEdgesToCenterX: function (ImageObject, image) {
      ImageObject.w = 0;
      ImageObject.sw = ImageObject.w;
      ImageObject.h = canvas.height;
      ImageObject.sh = ImageObject.h;
      var ImageObject2 = newImageObject(image);
      ImageObject2.w = 0;
      ImageObject2.sw = ImageObject2.w;
      ImageObject2.h = canvas.height;
      ImageObject2.sh = ImageObject2.h;
      ImageObject2.x = canvas.width;
      ImageObject2.sx = canvas.width / 2;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true) {
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
            canvasContext.clearRect(
              ImageObject2.x,
              ImageObject2.y,
              ImageObject2.x + ImageObject2.w,
              ImageObject2.y + ImageObject2.h
            );
          }
          ImageObject.draw();
          ImageObject2.draw();
          if (ImageObject.x + ImageObject.w >= ImageObject2.x) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.w += picturePixelWidth / 9 / 2;
            ImageObject.sw = ImageObject.w;
            ImageObject2.w += picturePixelWidth / 9 / 2;
            ImageObject2.sw = ImageObject2.w;
            ImageObject2.x -= picturePixelHeight / 8.2;
          }
        }
      }, 1000 / 120);
    },

    multiObjectOuterEdgesToCenterY: function (ImageObject, image) {
      ImageObject.w = canvas.width;
      ImageObject.sw = ImageObject.w;
      ImageObject.h = 0;
      ImageObject.sh = ImageObject.h;
      var ImageObject2 = newImageObject(image);
      ImageObject2.w = canvas.width;
      ImageObject2.sw = ImageObject2.w;
      ImageObject2.h = 0;
      ImageObject2.sh = ImageObject2.h;
      ImageObject2.y = canvas.height;
      ImageObject2.sy = canvas.height / 2;
      timer2 = setInterval(function () {
        if (image.complete) {
          if (cycleStarted === true) {
            canvasContext.clearRect(
              ImageObject.x,
              ImageObject.y,
              ImageObject.x + ImageObject.w,
              ImageObject.y + ImageObject.h
            );
            canvasContext.clearRect(
              ImageObject2.x,
              ImageObject2.y,
              ImageObject2.x + ImageObject2.w,
              ImageObject2.y + ImageObject2.h
            );
          }
          ImageObject.draw();
          ImageObject2.draw();
          if (ImageObject.y + ImageObject.h >= ImageObject2.y) {
            clearInterval(timer2);
            timer2 = null;
          } else {
            ImageObject.h += picturePixelWidth / 9 / 2;
            ImageObject.sh = ImageObject.h;
            ImageObject2.h += picturePixelWidth / 9 / 2;
            ImageObject2.sh = ImageObject2.h;
            ImageObject2.y -= picturePixelHeight / 8.2;
          }
        }
      }, 1000 / 120);
    },
  };
}

function newImageObject(image) {
  return {
    sx: 0,
    sy: 0,
    sw: picturePixelWidth,
    sh: picturePixelHeight,
    x: 0,
    y: 0,
    w: picturePixelWidth,
    h: picturePixelHeight,
    draw: function () {
      canvasContext.drawImage(
        image,
        this.sx,
        this.sy,
        this.sx + this.sw,
        this.sy + this.sh,
        this.x,
        this.y,
        this.x + this.w + 1,
        this.y + this.h + 1
      );
    },
  };
}

function resetObject(ImageObject) {
  ImageObject.sx = 0;
  ImageObject.sy = 0;
  ImageObject.sw = picturePixelWidth;
  ImageObject.sh = picturePixelHeight;
  ImageObject.x = 0;
  ImageObject.y = 0;
  ImageObject.w = picturePixelWidth;
  ImageObject.h = picturePixelHeight;
}

function canvasClicked() {
  if (timer2 === null) {
    clearInterval(timer);
    cyclePictures(pictures[imageCounter], images[imageCounter]);
    timer = setInterval(function () {
      cyclePictures(pictures[imageCounter], images[imageCounter]);
    }, 4000);
  }
}

function radioButtonAction(buttonClickedId) {
  switch (buttonClickedId) {
    case document.getElementById("picture0"):
      clearInterval(timer2);
      clearInterval(timer);
      resetObject(pictures[imageCounter]);
      imageCounter = 0;
      cyclePictures(pictures[imageCounter], images[imageCounter]);
      timer = setInterval(function () {
        cyclePictures(pictures[imageCounter], images[imageCounter]);
      }, 4000);
      break;
    case document.getElementById("picture1"):
      clearInterval(timer2);
      clearInterval(timer);
      resetObject(pictures[imageCounter]);
      imageCounter = 1;
      cyclePictures(pictures[imageCounter], images[imageCounter]);
      timer = setInterval(function () {
        cyclePictures(pictures[imageCounter], images[imageCounter]);
      }, 4000);
      break;
    case document.getElementById("picture2"):
      clearInterval(timer2);
      clearInterval(timer);
      resetObject(pictures[imageCounter]);
      imageCounter = 2;
      cyclePictures(pictures[imageCounter], images[imageCounter]);
      timer = setInterval(function () {
        cyclePictures(pictures[imageCounter], images[imageCounter]);
      }, 4000);
      break;
    case document.getElementById("picture3"):
      clearInterval(timer2);
      clearInterval(timer);
      resetObject(pictures[imageCounter]);
      imageCounter = 3;
      cyclePictures(pictures[imageCounter], images[imageCounter]);
      timer = setInterval(function () {
        cyclePictures(pictures[imageCounter], images[imageCounter]);
      }, 4000);
      break;
    case document.getElementById("picture4"):
      clearInterval(timer2);
      clearInterval(timer);
      resetObject(pictures[imageCounter]);
      imageCounter = 4;
      cyclePictures(pictures[imageCounter], images[imageCounter]);
      timer = setInterval(function () {
        pictureSelections[imageCounter].checked = true;
        cyclePictures(pictures[imageCounter], images[imageCounter]);
      }, 4000);
      break;
    case document.getElementById("picture5"):
      clearInterval(timer2);
      clearInterval(timer);
      resetObject(pictures[imageCounter]);
      imageCounter = 5;
      cyclePictures(pictures[imageCounter], images[imageCounter]);
      timer = setInterval(function () {
        cyclePictures(pictures[imageCounter], images[imageCounter]);
      }, 4000);
      break;
    case document.getElementById("picture6"):
      clearInterval(timer2);
      clearInterval(timer);
      resetObject(pictures[imageCounter]);
      imageCounter = 6;
      cyclePictures(pictures[imageCounter], images[imageCounter]);
      timer = setInterval(function () {
        cyclePictures(pictures[imageCounter], images[imageCounter]);
      }, 4000);
      break;
    case document.getElementById("picture7"):
      clearInterval(timer2);
      clearInterval(timer);
      resetObject(pictures[imageCounter]);
      imageCounter = 7;
      cyclePictures(pictures[imageCounter], images[imageCounter]);
      timer = setInterval(function () {
        cyclePictures(pictures[imageCounter], images[imageCounter]);
      }, 4000);
      break;
    default:
      break;
  }
}
