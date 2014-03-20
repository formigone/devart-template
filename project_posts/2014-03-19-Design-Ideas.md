Some ideas about the design and implementation of the app...

Goals / Requirements
--------------------

 - User selects image from Google+ account.
 - Image is processed - background & foreground separated.
 - Bits set in image foreground will be the live cells in the Game of Life board.
 - Between generations, any cells that die will be displayed as "dead" giving it some sort of transition effect.
 - Colors used on board will be from the input image; either colors from a limited palette extracted from image, or exact colors from corresponding pixel.
 - User can select a new image and restart the game.

Visual Ideas
------------

 - Game board will look like the original image, so the set and unset cells can't just be black and white.
 - Display the board as a 3 layer stencil of the input image.
 - Make the transition between generations smooth and interesting - possibly by displaying cells that died in the previous generation in some way that they can be distinguished.
 - Make the board look like the input image, but possibly a bit pixelated, but perhaps not too much. Can't guess how much - I'll play around with the board size VS image resolution.
