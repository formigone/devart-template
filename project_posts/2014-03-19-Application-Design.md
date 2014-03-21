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

JSUML
---

    Canvas = {
        element: 'HTMLCanvasElement',
        size: {
            width: 900,
            height: 400
        },
        ctx: 'CanvasRenderingContext2D',
        clear: function(){},
        draw: function(x, y, width, height, color){}
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
