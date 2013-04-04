function Wall(side) {
    this.side = side;
    var sections = [];

    this.addSection = function(x, y, w, h) {
        sections.push(new WallSection(x, y, w, h));
    };
    this.clearSections = function() {
        $.each(sections, function(i, v) {
            world.DestroyBody(v.body);
        });
        sections = [];
    };
}
