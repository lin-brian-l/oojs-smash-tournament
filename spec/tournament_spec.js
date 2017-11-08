describe("a tournament", function() {
  var tournament;
  var mango;
  var mew2king;
  var armada;
  var leffen; 
  var hungrybox;
  var plup;
  var entrants;

  beforeEach(function() {
    mango = new Player({name: "Joseph Marquez", tag: "Mang0", rank: 3});
    mew2king = new Player({name: "Jason Zimmerman", tag: "Mew2King", rank: 4});
    armada = new Player({name: "Adam Lindgren", tag: "Armada", rank: 1});
    leffen = new Player({name: "William Hjelte", tag: "Leffen", rank: 5});

    entrants = [mango, mew2king, armada, leffen]

    tournament = new Tournament("The Big House 7", "Dearborn, MI", entrants)
    
    plup = new Player({name: "Justin McGrath", tag: "Plup", rank: 6})
    hungrybox = new Player({name: "Juan Debiedma", tag: "Hungrybox", rank: 2})
  });

  it("has a name", function() {
    expect(tournament.name).toEqual("The Big House 7");
  });

  it("has a location", function() {
    expect(tournament.location).toEqual("Dearborn, MI");
  });

  it("has entrants", function() {
    expect(tournament.entrants).toEqual([mango, mew2king, armada, leffen]);
  });

  it("starts with a null seed object", function() {
    expect(tournament.seeds).toEqual(null)
  })

  describe("registering players", function() {
    it("can register an additional player", function() {
      var newEntrants = [plup]
      tournament.register(newEntrants);
      expect(tournament.entrants).toEqual([mango, mew2king, armada, leffen, plup]);
    });

    it("can register multiple players at a time", function() {
      var newEntrants = [plup, hungrybox]
      tournament.register(newEntrants);
      expect(tournament.entrants).toEqual([mango, mew2king, armada, leffen, plup, hungrybox]);
    });
  });

  describe("disqualifying players", function() {
    it("can disqualify registered players based on their tag", function() {
      tournament.disqualify("Mew2King");
      expect(tournament.entrants).toEqual([mango, armada, leffen]);  
    });

    it("can disqualify registered players based on their name", function() {
      tournament.disqualify("Joseph Marquez");
      expect(tournament.entrants).toEqual([mew2king, armada, leffen])
    });

    it("returns false if a player cannot be found", function() {
      expect(tournament.disqualify("asdf")).toEqual(false);
    });
  });

  it("can sort entrants in order of highest to lowest rank", function() {
    tournament.sortEntrants();
    expect(tournament.entrants).toEqual([armada, mango, mew2king, leffen])
  })

  describe("seeding the tournament bracket", function() {
    beforeEach(function() {
      tournament.seedBracket();
    });

    it("first sorts entrants in order of highest to lowest rank", function() {
      expect(tournament.entrants).toEqual([armada, mango, mew2king, leffen]);
    });

    it("can generate a seed object based on player rank", function() {
      // NOTE: Research how to add new properties to an object.
      expect(tournament.seeds).toEqual({
        "1": armada,
        "2": mango,
        "3": mew2king,
        "4": leffen
      });
    });

    it("can generate a new seed object if new players are registered", function() {
      tournament.register([hungrybox, plup]);
      tournament.seedBracket();
      expect(tournament.seeds).toEqual({
        "1": armada,
        "2": hungrybox,
        "3": mango,
        "4": mew2king,
        "5": leffen,
        "6": plup
      })
    });
  });
});
