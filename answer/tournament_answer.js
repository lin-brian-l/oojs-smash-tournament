var Tournament = function(name, location, entrants) {
  this.name = name;
  this.location = location;
  this.entrants = entrants;
  this.seeds = {};
};

Tournament.prototype.register = function(newEntrants) {
  var that = this;
  newEntrants.forEach(function(entrant) {
    that.entrants.push(entrant);
  });
};

Tournament.prototype.disqualify = function(entrant) {
  var dqIndex = this.entrants.findIndex(function(player) {
    return player.tag === entrant || player.name === entrant;
  });
  if (dqIndex === -1) return false;
  this.entrants.splice(dqIndex, 1);
};

Tournament.prototype.sortEntrants = function() {
  this.entrants.sort(function(a, b) {
    return a.rank - b.rank;
  });
};

Tournament.prototype.seedBracket = function() {
  this.sortEntrants();
  var that = this;
  this.entrants.forEach(function(entrant, index){
    let seed = (index + 1).toString();
    that.seeds[seed] = entrant;
  });
};