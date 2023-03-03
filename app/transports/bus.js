const Transport = require("./transport");

class Bus extends Transport {
  constructor(source, destination, seatNumber) {
    super(source, destination, 'BUS');
    this.seatNumber = seatNumber;
  }

  get seatNumber () {
    return this._seatNumber;
  }

  set seatNumber(sn) {
    this._seatNumber = sn;
  }

  stringify() {
    let str = `Take the airport bus from ${this.source} to ${this.destination}. `
    if (this.seatNumber) {
        str = str + `Sit in seat ${this.seatNumber}.`;
    } else {
        str = str + `No seat assignment.`;
    }
    return str;
  }
}

module.exports = Bus;
