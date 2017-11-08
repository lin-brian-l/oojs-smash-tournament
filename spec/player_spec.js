describe("a player", function() {
  var player;

  beforeEach(function() {
    player = new Player({name: "Joseph Marquez", tag: "Mang0", rank: 3})
  });

  it("has a name", function() {
    expect(player.name).toEqual("Joseph Marquez");
  });

  it("has a tag", function() {
    expect(player.tag).toEqual("Mang0");
  });

  it("has a rank", function() {
    expect(player.rank).toEqual(3);
  });
});
