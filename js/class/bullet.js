function Bullet(x, y, dy, dx) {
    var that = this;
    var bConf = {
        size: 2,
        speed: 100,
        life: 1000
    };

    var fixDef = new b2FixtureDef();
    fixDef.density = .0001;
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(bConf['size'] / conf['engineScale'], bConf['size'] / conf['engineScale']);
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.linearDamping = 0;
    bodyDef.position.Set(x, y);

    this.body = world.CreateBody(bodyDef);
    this.body.SetSleepingAllowed(false);
    this.body.CreateFixture(fixDef);
    this.body.SetUserData({name:'bullet'});

    this.body.ApplyImpulse(new b2Vec2(dx * bConf['speed'], dy * bConf['speed']), this.body.GetWorldCenter());

    setTimeout(function() {
        world.DestroyBody(that.body);
        p.bullets.remove(that);
    }, bConf['life']);

    this.draw = function() {
        var d = Math.sqrt(Math.pow(p.body.GetPosition().x - this.body.GetPosition().x, 2) + Math.pow(p.body.GetPosition().y - this.body.GetPosition().y, 2));
        var o = 2 / d;

        var es = conf['engineScale'],
            ds = scale,
            s = bConf['size'],
            x = this.body.GetPosition().x,
            y = this.body.GetPosition().y;

        ctx.fillStyle = "rgba(255, 255, 255,"+o+")";

        ctx.fillRect((x - s / es) * ds,
                     (y - s / es) * ds,
                     (s / es * 2) * ds,
                     (s / es * 2) * ds);
    };

}
