function Box(x, y) {
    var bConf = {
        width: 100,
        height: 100
    },
        bodies = [],
        walls = [],
        ax = x,
        ay = y;

    this.pathed = false;

    x *= bConf['width'] * 2;
    y *= bConf['height'] * 2;

    var fixDef = new b2FixtureDef();
    var bodyDef = new b2BodyDef();

    fixDef.shape = new b2PolygonShape();
    bodyDef.type = b2Body.b2_staticBody;

    //top
    walls.push(new Wall(1));
    walls.last.addSection(x, y - bConf['height'], bConf['width'], 1);

    //right
    walls.push(new Wall(2));
    walls.last.addSection(x + bConf['width'], y, 1, bConf['height']);

    //bottom
    walls.push(new Wall(3));
    walls.last.addSection(x, y + bConf['height'], bConf['width'], 1);

    //left
    walls.push(new Wall(4));
    walls.last.addSection(x - bConf['width'], y, 1, bConf['height']);

    this.path = function(count) {
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
            if (typeof b !== 'undefined') {
                this.makeDoor(s);
                s += 2;
                if (s > 4)
                    s -= 4;
                b.makeDoor(s);
                break;
            }
        }
    };

    this.makeDoor = function(side) {
        var wall = walls[side];

    };
}
