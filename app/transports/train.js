const Transport = require("./transport");

class Train extends Transport {
  constructor(source, destination, trainNumber, seatNumber) {
    super(source, destination, 'TRAIN');
    this.trainNumber = trainNumber;
    this.seatNumber = seatNumber;
  }

  get seatNumber () {
    return this._seatNumber;
  }

  get trainNumber () {
    return this._trainNumber;
  }

  set seatNumber(sn) {
    this._seatNumber = sn;
  }

  set trainNumber(tn) {
    this._trainNumber = tn;
  }

  stringify() {
    let str = `Take train ${this.trainNumber || ''} from ${this.source} to ${this.destination}. `
    if (this.seatNumber) {
        str = str + `Sit in seat ${this.seatNumber}.`;
    } else {
        str = str + `No seat assignment.`;
    }
    return str;
  }
}

module.exports = Train;
