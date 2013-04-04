function WallSection(x, y, w, h) {
    var fixDef = new b2FixtureDef();
    var bodyDef = new b2BodyDef();

    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(w / conf['engineScale'], h / conf['engineScale']);
    bodyDef.position.Set(x / conf['engineScale'], y / conf['engineScale']);
    this.body = world.CreateBody(bodyDef);
    this.body.SetSleepingAllowed(true);
    this.body.CreateFixture(fixDef);
}
