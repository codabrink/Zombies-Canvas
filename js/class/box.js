function Box(x, y) {
    var bConf = {
        width: 100,
        height: 100
    },
        bodies = [],
        ax = x,
        ay = y;

    this.pathed = false;

    x *= bConf['width'] * 2;
    y *= bConf['height'] * 2;

    var fixDef = new b2FixtureDef();
    var bodyDef = new b2BodyDef();

    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(bConf['width'] / conf['scale'], 1 / conf['scale']);

    bodyDef.type = b2Body.b2_staticBody;

    //top
    bodyDef.position.Set(x / conf['scale'], (y - bConf['height']) / conf['scale']);
    bodies.push(world.CreateBody(bodyDef));
    bodies.last.SetSleepingAllowed(true);
    bodies.last.CreateFixture(fixDef);

    //bottom
    bodyDef.position.Set(x / conf['scale'], (y + bConf['height']) / conf['scale']);
    bodies.push(world.CreateBody(bodyDef));
    bodies.last.SetSleepingAllowed(true);
    bodies.last.CreateFixture(fixDef);

    //left
    fixDef.shape.SetAsBox(1 / conf['scale'], bConf['height'] / conf['scale']);
    bodyDef.position.Set((x - bConf['width']) / conf['scale'], y / conf['scale']);
    bodies.push(world.CreateBody(bodyDef));
    bodies.last.SetSleepingAllowed(true);
    bodies.last.CreateFixture(fixDef);

    //right
    bodyDef.position.Set((x + bConf['width']) / conf['scale'], y / conf['scale']);
    bodies.push(world.CreateBody(bodyDef));
    bodies.last.SetSleepingAllowed(true);
    bodies.last.CreateFixture(fixDef);

    this.path = function(c) {
        this.pathed = true;
        var sides = [1, 2, 3, 4];
        while (sides.length > 0) {
            var s = sides.popRandom(), b;
            switch(s) {
            case 1:
                b = boxes[ax][ay-1];
                break;
            case 2:
                b = boxes[ax+1][ay];
                break;
            case 3:
                b = boxes[ax][ay+1];
                break;
            case 4:
                b = boxes[ax-1][ay];
                break;
            }
            this.makeDoor(s);
            s += 2;
            if (s > 4)
                s -= 4;
            b.makeDoor(s);
        }
    };

    this.makeDoor = function(s) {

    };
}
