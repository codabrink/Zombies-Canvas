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
    for (var i=1;i<10;i++) {
        boxes[i] = [];
        for (var j=1;j<10;j++) {
            if (!boxes[i][j].pathed)
                boxes[i][j].path(1);
        }
    }
}
