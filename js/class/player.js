function Player() {
    var pConf = {
        width : 10,
        height: 10,
        force : 20,
        rForce: 0.10 * (60 / conf['framerate'])
    },
        d = 0,
        r = 0;

    var fixDef = new b2FixtureDef();
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(conf['playerWidth'] / conf['engineScale'], conf['playerHeight'] / conf['engineScale']);
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.linearDamping = 1;
    bodyDef.position.Set(conf['canvasWidth'] / (2 * conf['engineScale']), conf['canvasHeight'] / (2 * conf['engineScale']));

    this.body = world.CreateBody(bodyDef);
    this.body.SetSleepingAllowed(false);
    this.body.CreateFixture(fixDef);
    var vert, horiz;

    this.moveLeft = function(down) {r = down ? -pConf['rForce'] : 0;};
    this.moveRight = function(down) {r = down ? pConf['rForce'] : 0;};
    this.moveUp = function(down) {d = down ? -1 : 0;};
    this.moveDown = function(down) {d = down ? 1 : 0;};

    keys[40] = new Key(40, this.moveDown, false);
    keys[39] = new Key(39, this.moveRight, false);
    keys[38] = new Key(38, this.moveUp, false);
    keys[37] = new Key(37, this.moveLeft, false);

    this.light = new Lamp({
        position: new Vec2(this.body.GetPosition().x * scale, this.body.GetPosition().y * scale),
        distance: 200,
        radius: 10,
        samples: 20
    });
    this.lighting = new Lighting({
        light: this.light,
        objects: []
    });

    this.update = function() {
        var es = conf['engineScale'],
            h = pConf['height'],
            w = pConf['width'];

        this.body.SetAngle(this.body.GetAngle() + r);
        horiz = Math.sin(-this.body.GetAngle()) * pConf['force'] * d;
        vert = Math.cos(this.body.GetAngle()) * pConf['force'] * d;
        this.body.ApplyForce(new b2Vec2(horiz,vert), this.body.GetWorldCenter());

        this.light.position = new Vec2(this.body.GetPosition().x * scale, this.body.GetPosition().y * scale);
        this.lighting.objects = solids.concat(zSolids);
        this.lighting.compute(conf['canvasWidth'] * 3, conf['canvasHeight'] * 6);
    };

    this.draw = function() {
        this.lighting.render(ctx);
        var es = conf['engineScale'],
            ds = scale,
            h = pConf['height'],
            w = pConf['width'],
            x = this.body.GetPosition().x,
            y = this.body.GetPosition().y;

        ctx.fillStyle = "rgba(0, 255, 0, .5)";

        ctx.translate(x * ds, y * ds);
        ctx.rotate(this.body.GetAngle());
        ctx.fillRect((-w / es) * ds,
                     (-h / es) * ds,
                     (w / es * 2) * ds,
                     (h / es * 2) * ds);
        ctx.fillStyle = '#999999';
        ctx.fillRect((w * .5 / es) * ds,
                     (-h * 1.75 / es) * ds,
                     (w / es) * ds,
                     (h * 2 / es) * ds);

        //ctx.translate(-x, -y);

    };

    //getters
    this.conf = pConf;
};
