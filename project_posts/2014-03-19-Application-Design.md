Application Design
------------------

**Canvas**
 - Abstracts an HTMLCanvasElement
 - Can be attached to DOM
 - Exposes an interface for drawing

**Board**
 - Holds a grid of Cell objects
 - Can update itself by calculating the next generation
 - Can render itself using a Canvas
 - Knows how to color dead, live, and recently dead cells

**Cell**
 - Keeps track of its current state
 - Keeps track of its future state (next generation)
 - Keeps track of its last state (last generation)

**GameLoop**
 - Implements simple game loop logic so rendering is consistent

**ImageProcessor**
 - Uses a Canvas to process some image, such as sampling for color palette, separating background from foreground, etc.

JSUML
---

    Canvas = {
        element: 'HTMLCanvasElement',
        size: {
            width: 900,
            height: 400
        },
        ctx: 'CanvasRenderingContext2D',
        bindTo: function(panel){},
        clear: function(){},
        draw: function(x, y, width, height, color){},
        getDrawingContext: function(){}
    };

    Board = {
        canvas: 'Canvas',
        colors: {
            DEAD: '#hex',
            LIVE: '#hex',
            GONE: '#hex',
        },
        cellSize: {
            width: 10,
            height: 10
        },
        size: {
            width: 900,
            height: 400
        },
        grid: 'Array<Cell>',
        update: function(){},
        render: function(){},
        countNeighbors: function(x, y){},
        getXY: function(i){}
    };

    Cell = {
        state: {
            curr: 'bool',
            last: 'bool',
            next: 'bool'
        }
    };

    GameLoop = {
        objs: 'Array<Object>',
        running: 'bool',
        fps: 60,
        lastTime: 0,
        delay: '1000 / this.fps'

        onInit: function(){},
        onResize: function(){},
        onRender: function(){},
        init: function(){},
        run: function(){},
        render: function(){},
    };

    ImageProcessor = {
        ctx: 'CanvasRenderingContext2D',
        palette: 'Array<string>', /* hex values */
        data: {
            width: 900,
            height: 400,
            map: 'Array<number>'  /* -1 = background   0 = middle-tone   1 = foreground */
        },
        image: 'string',
        getLayers: function(){},
        setImage: function(url){}
    };
