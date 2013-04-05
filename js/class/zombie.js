function Zombie() {
    var zConf = {};

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

    this.update = function() {

    };

    this.draw = function() {
        var es = conf['engineScale'],
            ds = scale,
            cw = conf['canvasWidth'],
            ch = conf['canvasHeight'],
            h = pConf['height'],
            w = pConf['width'],
            x = this.body.GetPosition().x,
            y = this.body.GetPosition().y;

        ctx.fillStyle = "rgba(255, 0, 0, .5)";

    };

    //getters
    this.conf = zConf;
}
