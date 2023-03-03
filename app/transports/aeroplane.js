const Transport = require("./transport");

class Aeroplane extends Transport {
  constructor(source, destination, flightNumber, seatNumber, gateNumber, baggage) {
    super(source, destination, 'AEROPLANE');
    this.flightNumber = flightNumber;
    this.seatNumber = seatNumber;
    this.gateNumber = gateNumber;
    this.baggage = baggage;
  }

  get flightNumber () {
    return this._flightNumber;
  }

  get seatNumber () {
    return this._seatNumber;
  }

  get gateNumber () {
    return this._gateNumber;
  }

  get baggage () {
    return this._baggage;
  }

  set flightNumber(fn) {
    this._flightNumber = fn;
  }

  set seatNumber(sn) {
    this._seatNumber = sn;
  }

  set gateNumber(gn) {
    this._gateNumber = gn;
  }

  set baggage(b) {
    this._baggage = b;
  }

  stringify() {
    let str = `From ${this.source}, take flight ${this.flightNumber || ''} to ${this.destination}.`
    if (this.gateNumber && this.seatNumber) {
      str = str + ` Gate ${this.gateNumber}, seat ${this.seatNumber}.`
    } else if (this.seatNumber) {
      str = str + ` Sit in ${this.seatNumber}.`
    } else if (this.gateNumber) {
      str = str + ` Gate ${this.gateNumber}.`
    }

    if (this.baggage) {
      str = str + ` Baggage drop at ticket counter ${this.baggage}.`
    } else {
      str = str + ` Baggage will be automatically transferred from your last leg.`
    }
    return str
  }
}

module.exports = Aeroplane;
