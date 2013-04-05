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
        var d = Math.sqrt(Math.pow(p.body.GetPosition().x - this.body.GetPosition().x, 2) + Math.pow(p.body.GetPosition().y - this.body.GetPosition().y, 2));
        var o = 3 / d;

        ctx.fillStyle = "rgba(255,255,255,"+o+")";


        var es = conf['engineScale'],
            ds = scale,
            h = this.h,
            w = this.w,
            x = this.body.GetPosition().x,
            y = this.body.GetPosition().y;
        ctx.fillRect((x - w / es) * ds,
                     (y - h / es) * ds,
                     (w / es * 2) * ds,
                     (h / es * 2) * ds);
    };

    var es = conf['engineScale'],
        ds = scale;

    this.rect = new RectangleObject({
        topleft: new Vec2((this.x - this.w) / es * ds, (this.y - this.h) / es * ds),
        bottomright: new Vec2((this.x + this.w) / es * ds, (this.y + this.h) / es * ds)
    });
}
