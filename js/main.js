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
        canvasWidth : 720,
        canvasHeight: 480,

        playerWidth : 10,
        playerHeight: 10,

        scale: 30,

        pathLimit: 7
    },
    keys = {},
    p,
    boxes = [];
$(function() {
    p = new Player;

    for (var i=1;i<10;i++) {
        boxes[i] = [];
        for (var j=1;j<10;j++) {
            boxes[i].push(new Box(i, j));
        }
    }

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
    debugDraw.SetDrawScale(conf['scale']);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(1.0);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
    world.SetDebugDraw(debugDraw);

    window.setInterval(update, 1000 / 60);
});

function update() {
    world.Step(1/60, 3, 3);
    world.DrawDebugData();
    world.ClearForces();

    p.update();
}

