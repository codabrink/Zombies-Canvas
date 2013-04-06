function Box(x, y) {
    var bConf = {
        width: 100,
        height: 100,
        doorSize: 25
    },
        bodies = [],
        walls = [],
        ax = x,
        ay = y,
        room;

    this.pathed = false;
    this.adj = [];

    x = (x + 1) * bConf['width'] * 2;
    y = (y + 1) * bConf['height'] * 2;

    var fixDef = new b2FixtureDef();
    var bodyDef = new b2BodyDef();

    fixDef.shape = new b2PolygonShape();
    bodyDef.type = b2Body.b2_staticBody;

    //top
    walls.push(new Wall(0, x, y - bConf['height']));
    walls.last.addSection(0, 0, bConf['width'], 1);

    //right
    walls.push(new Wall(1, x + bConf['width'], y));
    walls.last.addSection(0, 0, 1, bConf['height']);

    //bottom
    walls.push(new Wall(2, x, y + bConf['height']));
    walls.last.addSection(0, 0, bConf['width'], 1);

    //left
    walls.push(new Wall(3, x - bConf['width'], y));
    walls.last.addSection(0, 0, 1, bConf['height']);

    this.path = function(count) {
        this.pathed = true;
        var sides = [0, 1, 2, 3];
        while (sides.length > 0) {
            var s = sides.popRandom[0], b;
            b = this.adj[s];
            if (b !== null && typeof b !== 'undefined') {
                this.makeDoor(s);
                s = reverseSide(s);
                b.makeDoor(s);
                if (count < conf['boxPathLimit'] && !b.pathed) {
                    b.path(count++);
                    break;
                }
            }
        }
    };

    this.roomWalls = function() {
        for (var i=0;i<this.adj.length;i++) {
            if (this.adj[i].room == this.room) {
                this.destroyWall(i);
                this.adj[i].destroyWall(reverseSide(i));
            }
        }
    };

    this.makeDoor = function(side) {
        var wall = walls[side];
        var wallLength = bConf['width'] / 2 - bConf['doorSize'] / 2;
        var wallOffset = bConf['width'] / 2 + bConf['doorSize'] / 2;

        wall.clearSections();
        switch(side) {
        case 0: //top
            wall.addSection(-wallOffset, 0, wallLength, 1);
            wall.addSection(wallOffset, 0, wallLength, 1);
            break;
        case 1: //right
            wall.addSection(0, -wallOffset, 1, wallLength);
            wall.addSection(0, wallOffset, 1, wallLength);
            break;
        case 2: //bottom
            wall.addSection(-wallOffset, 0, wallLength, 1);
            wall.addSection(wallOffset, 0, wallLength, 1);
            break;
        case 3: //left
            wall.addSection(0, -wallOffset, 1, wallLength);
            wall.addSection(0, wallOffset, 1, wallLength);
            break;
        }
    };

    this.destroyWall = function(side) {
        var wall = walls[side];
        wall.clearSections();
    };

    this.setAdj = function() {
        this.adj[0] = (ax in boxes ? boxes[ax][ay-1] : undefined);
        this.adj[1] = (ax+1 in boxes ? boxes[ax+1][ay] : undefined);
        this.adj[2] = (ax in boxes ? boxes[ax][ay+1] : undefined);
        this.adj[3] = (ax-1 in boxes ? boxes[ax-1][ay] : undefined);
    };

    this.draw = function() {
        for (var i=0;i<=3;i++) {
            walls[i].draw();
        }
    };

    //getters
    this.conf = bConf;
}
