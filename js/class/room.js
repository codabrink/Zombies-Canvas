function Room() {
    var boxes = [];

    this.addBox = function(b) {
        boxes.push(b);
    };
    this.removeBox = function(b) {
        boxes.remove(b);
    };
}
