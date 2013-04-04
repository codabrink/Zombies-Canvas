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

    this.update = function() {
        this.body.SetAngle(this.body.GetAngle() + r);
        horiz = Math.sin(-this.body.GetAngle()) * pConf['force'] * d;
        vert = Math.cos(this.body.GetAngle()) * pConf['force'] * d;
        this.body.ApplyForce(new b2Vec2(horiz,vert), this.body.GetWorldCenter());
    };

    this.draw = function() {
        ctx.fillStyle = "rgba(0, 255, 0, 1)";

        //ctx.rotate(this.body.GetAngle());

        var es = conf['engineScale'],
            ds = conf['drawScale'],
            cw = conf['canvasWidth'],
            ch = conf['canvasHeight'],
            h = pConf['height'],
            w = pConf['width'],
            x = this.body.GetPosition().x,
            y = this.body.GetPosition().y;

        ctx.fillRect((x - w / es) * ds,
                     (y - h / es) * ds,
                     (w / es * 2) * ds,
                     (h / es * 2) * ds);
    };

    //getters
    this.conf = pConf;
};
