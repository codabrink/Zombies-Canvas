function Box(x, y) {
    var bConf = {
        width: 100,
        height: 100
    },
        bodies = [];

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
}
