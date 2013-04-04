function Box(x, y) {
    var bConf = {
        width: 100,
        height: 100,
        doorSize: 25
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
    walls.push(new Wall(1, x, y - bConf['height']));
    walls.last.addSection(0, 0, bConf['width'], 1);

    //right
    walls.push(new Wall(2, x + bConf['width'], y));
    walls.last.addSection(0, 0, 1, bConf['height']);

    //bottom
    walls.push(new Wall(3, x, y + bConf['height']));
    walls.last.addSection(0, 0, bConf['width'], 1);

    //left
    walls.push(new Wall(4, x - bConf['width'], y));
    walls.last.addSection(0, 0, 1, bConf['height']);

    this.path = function(count) {
        this.pathed = true;
        var sides = [1, 2, 3, 4];
        while (sides.length > 0) {
            var s = sides.popRandom[0], b;
            switch(s) {
            case 1:
                if (ax in boxes)
                    b = boxes[ax][ay-1];
                break;
            case 2:
                if (ax+1 in boxes)
                    b = boxes[ax+1][ay];
                break;
            case 3:
                if (ax in boxes)
                    b = boxes[ax][ay+1];
                break;
            case 4:
                if (ax-1 in boxes)
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
        var wall = walls[side-1];
        var wallLength = bConf['width'] / 2 - bConf['doorSize'] / 2;
        var wallOffset = bConf['width'] / 2 + bConf['doorSize'] / 2;

        wall.clearSections();
        switch(side) {
        case 1: //top
            wall.addSection(-wallOffset, 0, wallLength, 1);
            wall.addSection(wallOffset, 0, wallLength, 1);
            break;
        case 2: //right
            wall.addSection(0, -wallOffset, 1, wallLength);
            wall.addSection(0, wallOffset, 1, wallLength);
            break;
        case 3: //bottom
            wall.addSection(-wallOffset, 0, wallLength, 1);
            wall.addSection(wallOffset, 0, wallLength, 1);
            break;
        case 4: //left
            wall.addSection(0, -wallOffset, 1, wallLength);
            wall.addSection(0, wallOffset, 1, wallLength);
            break;
        }
    };
}
