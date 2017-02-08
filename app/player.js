var id = 0;

class Player {
  constructor(name) {
    id++;
    this.id = id;
    this.name = (name && name.length > 0) ? name : "Player " + id;
    this.$el = $('.player-' + this.id);
    this.$el.find('.name').html(this.name);
    this._wins = 0;
    this._losses = 0;
  }

  recordGame(winner) {
    if (this.id === winner) {
      this._wins += 1;
      $(".player-" + this.id + " .score").html(this.wins);
    } else {
      this._losses += 1;
    }
  }

  get wins() {
    return this._wins;
  }

  get losses() {
    return this._losses;
  }

  get games() {
    return this._wins + this._losses;
  }
}

export default Player;
