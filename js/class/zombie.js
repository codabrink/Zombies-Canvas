function Zombie(x, y) {
    var zConf = {
        width: 10,
        height: 10,

        minChangeInterval: 300,
        maxChangeInterval: 600,

        minSpeed: 20,
        maxSpeed: 40,
        followSpeed: 5,
        followMinDistance: 120,
        followMaxDistance: 170,

        interestDistance: 200,
        interestTime: 7000
    };

    var fixDef = new b2FixtureDef();
    fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(conf['playerWidth'] / conf['engineScale'], conf['playerHeight'] / conf['engineScale']);
    var bodyDef = new b2BodyDef();
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.linearDamping = 1;
    bodyDef.position.Set(x / conf['engineScale'], y / conf['engineScale']);

    this.body = world.CreateBody(bodyDef);
    this.body.SetSleepingAllowed(false);
    this.body.CreateFixture(fixDef);
    this.timeout = null;
    this.interested = false;
    this.interestable = true;

    this.update = function() {
        var that = this;
        this.body.ApplyForce(this.dir, this.body.GetWorldCenter());
        this.d = Math.sqrt(Math.pow(p.body.GetPosition().x - this.body.GetPosition().x, 2) + Math.pow(p.body.GetPosition().y - this.body.GetPosition().y, 2));

        if (!this.interested && this.interestable && this.d < zConf['interestDistance'] / es && Math.random() < 0.005) {
            clearTimeout(this.timeout);
            this.interested = true;
            console.log('interested');
            this.timeout = setTimeout(function() {
                console.log('not interested');
                that.interested = false;
                that.interestable = false;
                that.changeDir();
                setTimeout(function() {that.interestable = true;}, 10000);
            }, zConf['interestTime']);
        } else if (this.interested) {
            this.showInterest();
        }

        this.rect = new RectangleObject({
            topleft: new Vec2((this.body.GetPosition().x - zConf['width'] / es) * ds, (this.body.GetPosition().y - zConf['height'] / es) * ds),
            bottomright: new Vec2((this.body.GetPosition().x + zConf['width'] / es) * ds, (this.body.GetPosition().y + zConf['height'] / es) * ds)
        });

        zSolids.push(this.rect);
    };

    this.changeDir = function() {
        var that = this;
        var min = zConf['minSpeed'],
            max = zConf['maxSpeed'];
        var x = (max - min) * Math.random() + min;
        var y = (max - min) * Math.random() + min;
        y = y * (Math.random() < 0.5 ? -1 : 1);
        x = x * (Math.random() < 0.5 ? -1 : 1);
        this.dir = new b2Vec2(x, y);

        min = zConf['minChangeInterval'];
        max = zConf['maxChangeInterval'];
        var t = (max - min) * Math.random() + min;
        this.timeout = setTimeout(function() {that.changeDir();}, t);
    };

    this.showInterest = function() {
        var x = p.body.GetPosition().x + (Math.random() * zConf['followMinDistance'] + zConf['followMaxDistance']) / es * (Math.random() < .5 ? -1 : 1);
        var y = p.body.GetPosition().y + (Math.random() * zConf['followMinDistance'] + zConf['followMaxDistance']) / es * (Math.random() < .5 ? -1 : 1);
        var dx = x - this.body.GetPosition().x;
        var dy = y - this.body.GetPosition().y;
        this.dir = new Vec2(dx * zConf['followSpeed'], dy * zConf['followSpeed']);
    };

    this.draw = function() {
        var d = Math.sqrt(Math.pow(p.body.GetPosition().x - this.body.GetPosition().x, 2) + Math.pow(p.body.GetPosition().y - this.body.GetPosition().y, 2));
        var o = 2 / d;

        var es = conf['engineScale'],
            ds = scale,
            h = zConf['height'],
            w = zConf['width'],
            x = this.body.GetPosition().x,
            y = this.body.GetPosition().y;

        ctx.fillStyle = "rgba(255, 0, 0,"+o+")";
        ctx.fillRect((x - w / es) * ds,
                     (y - h / es) * ds,
                     (w / es * 2) * ds,
                     (h / es * 2) * ds);
    };

    var es = conf['engineScale'],
        ds = scale;

    this.rect = new RectangleObject({
        topleft: new Vec2((this.body.GetPosition().x - zConf['width'] / es) * ds, (this.body.GetPosition().y - zConf['height'] / es) * ds),
        bottomright: new Vec2((this.body.GetPosition().x + zConf['width'] / es) * ds, (this.body.GetPosition().y + zConf['height'] / es) * ds)
    });

    this.changeDir();
    zSolids.push(this.rect);

    //getters
    this.conf = zConf;
}
