function WallSection(x, y, w, h) {
    var fixDef = new b2FixtureDef();
    var bodyDef = new b2BodyDef();

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(w / conf['engineScale'], h / conf['engineScale']);
    bodyDef.position.Set(x / conf['engineScale'], y / conf['engineScale']);
    this.body = world.CreateBody(bodyDef);
    this.body.SetSleepingAllowed(true);
    this.body.CreateFixture(fixDef);

    this.draw = function() {
        var es = conf['engineScale'],
            ds = conf['drawScale'],
            h = this.h,
            w = this.w,
            x = this.body.GetPosition().x,
            y = this.body.GetPosition().y;
        ctx.fillRect((x - w / es) * ds,
                     (y - h / es) * ds,
                     (w / es * 2) * ds,
                     (h / es * 2) * ds);
    };
}
