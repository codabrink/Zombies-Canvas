var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    world = new b2World(new b2Vec2(0, 0), true),
    conf = {
        canvasWidth : 1000,
        canvasHeight: 500,

        playerWidth : 10,
        playerHeight: 10,

        engineScale: 5,
        drawScale: 2,

        framerate: 15,

        boxPathLimit: 7
    },
    keys = {},
    p,
    boxes = [],
    c, ctx;
$(function() {
    c = $('#c');
    ctx = c[0].getContext('2d');


    c.attr('width', conf['canvasWidth']).attr('height', conf['canvasHeight']);

    p = new Player;

    for (var i=0;i<10;i++) {
        boxes[i] = [];
        for (var j=0;j<10;j++) {
            boxes[i].push(new Box(i, j));
        }
    }
    pathBoxes();

    document.onkeydown = function(e) {
        var key = e.which;
        if (key in keys) {
            keys[key].press(e);
        } else {
            keys[key] = new Key(key, null, true);
        }
    };
    document.onkeyup = function(e) {
        var key = e.which;
        if (key in keys) {
            keys[key].release(e);
        } else {
            keys[key] = new Key(key, null, true);
        }
    };

    var debugDraw = new b2DebugDraw();

    debugDraw.SetSprite(document.getElementById('c').getContext("2d"));
    debugDraw.SetDrawScale(conf['drawScale']);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    window.setInterval(update, 1000 / conf['framerate']);
});

function update() {
    ctx.clearRect(0, 0, c.width(), c.height());
    ctx.save();
    world.Step(1/conf['framerate'], 3, 3);
    world.DrawDebugData();
    world.ClearForces();

    camera();
    for (var i=0;i<10;i++) {
        for (var j=0;j<10;j++) {
                boxes[i][j].draw();
        }
    }
    p.draw();

    p.update();
    ctx.restore();
}

