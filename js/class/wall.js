function Wall(side, x, y) {
    this.side = side;
    this.x = x;
    this.y = y;
    var sections = [];

    this.addSection = function(x, y, w, h) {
        sections.push(new WallSection(this.x + x, this.y + y, w, h));
        solids.push(sections.last.rect);
    };
    this.clearSections = function() {
        $.each(sections, function(i, v) {
            world.DestroyBody(v.body);
            solids.remove(v.rect);
        });
        sections = [];
    };
    this.draw = function() {
        for (var i=0;i<sections.length;i++) {
            sections[i].draw();
        }
    };
}
