Object.defineProperty(Array.prototype, 'last', {
    enumerable: false,
    configurable: true,
    get: function() {
        return this[this.length - 1];
    },
    set: undefined
});

Object.defineProperty(Array.prototype, 'popRandom', {
    enumerable: false,
    configurable: true,
    get: function() {
        var index = Math.floor(Math.random() * this.length);
        return [this.splice(index, 1)[0], index];
    },
    set: undefined
});

Object.defineProperty(Array.prototype, 'remove', {
    enumerable: false,
    configurable: true,
    get: function(e) {
        for (var i=0;i<this.length;i++) {
            if (this[i] === e) {
                return this.splice(i, 1)[0];
            }
        }
    },
    set: undefined
});

function Key(key, onEvent, down) {
    var that = this;
    this.key = key;
    this.down = down;
    this.onEvent = onEvent;
    this.press = function(e) {
        down = true;
        if (onEvent !== null) {
            e.preventDefault();
            onEvent(true);
        }
    };
    this.release = function(e) {
        down = false;
        if (onEvent !== null) {
            e.preventDefault();
            onEvent(false);
        }
    };
};

function pathBoxes() {
    for (var i=0;i<conf['gridWidth'];i++) {
        for (var j=0;j<conf['gridHeight'];j++) {
            if (!boxes[i][j].pathed)
                boxes[i][j].path(1);
        }
    }
}

function roomBoxes() {
    for (var i=0;i<conf['gridWidth'];i++) {
        for (var j=0;j<conf['gridHeight'];j++) {
            if (!boxes[i][j].roomed)
                boxes[i][j].roomBox(new Room(), 1);
        }
    }
}

function camera() {

    var es = conf['engineScale'],
        ds = conf['drawScale'],
        cw = conf['canvasWidth'],
        ch = conf['canvasHeight'],
        x = p.body.GetPosition().x,
        y = p.body.GetPosition().y;

    tx = cw / 2 - x * ds;
    ty = ch / 2 - y * ds;
    ctx.translate(tx, ty);

    var newZoom = conf['scale'] - (p.body.GetLinearVelocity().Length() - 5) * .08;
    if (newZoom > conf['drawScale'] + .01) {
        conf['drawScale'] += conf['zoomSpeed'];
    } else if (newZoom < conf['drawScale'] - .01) {
        conf['drawScale'] -= conf['zoomSpeed'];
    }
}
