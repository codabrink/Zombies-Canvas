function Wall(side, x, y) {
    this.side = side;
    this.x = x;
    this.y = y;
    var sections = [];

    this.addSection = function(x, y, w, h) {
        sections.push(new WallSection(this.x + x, this.y + y, w, h));
    };
    this.clearSections = function() {
        $.each(sections, function(i, v) {
            world.DestroyBody(v.body);
        });
        sections = [];
    };
}
