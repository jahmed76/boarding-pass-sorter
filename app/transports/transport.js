class Transport {
  constructor(source, destination, mode) {
    this.source = source;
    this.destination = destination;
    this.mode = mode;
  }

  stringify() {
    return "";
  }
}

module.exports = Transport;
