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

        engineScale: 30,
        drawScale: 20,

        framerate: 60,
        zoomSpeed: .01,

        boxPathLimit: 7,
        roomSizeLimit: 3,

        gridHeight: 20,
        gridWidth: 20,

        numZombies: 20

    },
    keys = {},
    p,
    boxes = [], zombies = [],
    c, ctx,
    scale = conf['drawScale'],
    solids = [], zSolids = [],
    dark = false, darkHandle = false;

var Lamp = illuminated.Lamp,
    RectangleObject = illuminated.RectangleObject,
    DiscObject = illuminated.DiscObject,
    Vec2 = illuminated.Vec2,
    Lighting = illuminated.Lighting;

$(function() {
    //handle new canvas
    c = $('#c');
    ctx = c[0].getContext('2d');
    c.attr('width', conf['canvasWidth']).attr('height', conf['canvasHeight']);

    //populate the field
    p = new Player;
    for (var i=0;i<conf['gridWidth'];i++) {
        boxes[i] = [];
        for (var j=0;j<conf['gridHeight'];j++) {
            boxes[i].push(new Box(i, j));
        }
    }
    var maxX = conf['gridWidth'] * 200;
    var maxY = conf['gridHeight'] * 200;
    for (var i=0;i<conf['numZombies'];i++) {
        zombies.push(new Zombie(Math.random() * maxX, Math.random() * maxY));
    }

    pathBoxes();
    roomBoxes();

    //handle entire keyboard
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
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, c.width(), c.height());

    zSolids = [];

    world.Step(1/conf['framerate'], 3, 3);
    //    world.DrawDebugData();
    world.ClearForces();

    //p.lighting.render(ctx);
    ctx.save();
    camera();
    for (var i=0;i<conf['gridWidth'];i++) {
        for (var j=0;j<conf['gridHeight'];j++) {
            if (!dark)
                boxes[i][j].draw();
        }
    }
    for (var i=0;i<zombies.length;i++) {
        zombies[i].update();
        if (!dark)
            zombies[i].draw();
    }
    p.update();
    if (!dark)
        p.draw();
    ctx.restore();
}

