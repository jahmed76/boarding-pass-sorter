const { APIError } = require(".");
const { Bus, Train, Aeroplane } = require("../transports");
function requestParser(requestBody) {
  const passes = [];
  requestBody.forEach((pass) => {
    const {
      source,
      destination,
      flightNumber,
      trainNumber,
      seatNumber,
      gateNumber,
      baggage,
    } = pass;
    switch (pass.mode) {
      case "bus":
        passes.push(new Bus(pass.source, pass.destination, pass.seatNumber));
        break;
      case "train":
        passes.push(new Train(source, destination, trainNumber, seatNumber));
        break;
      case "aeroplane":
        passes.push(
          new Aeroplane(
            source,
            destination,
            flightNumber,
            seatNumber,
            gateNumber,
            baggage
          )
        );
        break;
      default:
        throw new APIError(400, "Bad Request", "Transport mode not supported");
    }
  });

  return passes;
}

module.exports = requestParser;
