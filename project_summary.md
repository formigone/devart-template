# Project Title
Biopixology

## Authors
- Rodrigo Silveira, http://www.rodrigo-silveira.com

## Description
Inspired by Conway's Game of Life, this version of the game uses a photograph to seed the initial state of the board.

## Link to Prototype
[BioPixology](http://www.biopixology.com/play "Play BioPixology")

## Example Code
```
var SIZE = {
    width: 700,
    height: 450
};

var canvas = new app.Canvas(SIZE.width, SIZE.height);
var board = new app.Board(canvas);

canvas.bindTo(goog.dom.getElement('screen'));
board.render();
```
## Links to External Libraries
[Google Web Toolkit](http://www.gwtproject.org "GWT")

## Images & Videos

![My Idea](project_images/cover.jpg?raw=true "BioPixology")

https://www.youtube.com/watch?v=Uo8Fq_QSQFY
