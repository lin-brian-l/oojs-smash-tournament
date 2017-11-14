var Tournament = function(name, location, entrants) {
  this.name = name;
  this.location = location;
  this.entrants = entrants;
  this.seeds = {};
};

Tournament.prototype.register = function(entrantArray) {
  // var that = this;
  // entrantArray.forEach(function(entrant) {
  //   that.entrants.push(entrant);
  // });
  this.entrants.push.apply(this.entrants, entrantArray)
};

Tournament.prototype.disqualify = function(entrant) {
  function findEntrant(tournamentEntrant) {
    return tournamentEntrant.tag === entrant || tournamentEntrant.name === entrant
  }
  var entrantIndex = this.entrants.findIndex(findEntrant);
  if (entrantIndex === -1) return false
  this.entrants.splice(entrantIndex, 1);
};

Tournament.prototype.sortEntrants = function() {
  this.entrants.sort(function(rank1, rank2) {
    return rank1.rank - rank2.rank;
  });
}

Tournament.prototype.seedBracket = function() {
  this.sortEntrants();
  var that = this
  this.entrants.forEach(function(player, index) {
    var seedNumber = (index + 1).toString();
    that.seeds[seedNumber] = player
  });
}







