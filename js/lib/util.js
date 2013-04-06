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

Array.prototype.remove = function(e) {
    for (var i=0;i<this.length;i++) {
        if (this[i] === e) {
            return this.splice(i, 1)[0];
        }
    }
    return null;
};

Array.prototype.exists = function(e) {
    for (var i=0;i<this.length;i++) {
        if (this[i] === e) {
            return [true, i];
        }
    }
    return [false, -1];
};

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

function reverseSide(s) {
    s += 2;
    if (s > 3)
            s -= 4;
    return s;
}

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
            if (typeof boxes[i][j].room === 'undefined')
                new Room(boxes[i][j]);
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

    var tx = cw / 2 - x * scale;
    var ty = ch / 2 - y * scale;
    ctx.translate(tx, ty);
}
