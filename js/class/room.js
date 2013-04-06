function Room(box) {
    this.boxes = [box];
    var rConf = {
            size: 7
        };

    this.getAdjacent = function() {
        var adj = [];
        for (var i=0;i<this.boxes.length;i++) {
            for (var j=0;j<=3;j++) {
                if (typeof this.boxes[i].adj[j] !== 'undefined' && !adj.exists(this.boxes[i].adj[j])[0] &&
                    typeof this.boxes[i].adj[j].room === 'undefined') {
                    adj.push(this.boxes[i].adj[j]);
                }
            }
        }
        return adj;
    };

    for (var i=0;i<Math.floor(Math.random() * rConf['size']);i++) {
        var adj = this.getAdjacent();
        var box = adj.popRandom[0];
        this.boxes.push(box);
        box.room = this;
    }

    for (var i=0;i<this.boxes.length;i++) {
        this.boxes[i].roomWalls();
    }

    this.addBox = function(b) {
        this.boxes.push(b);
    };
    this.removeBox = function(b) {
        this.boxes.remove(b);
    };
}
