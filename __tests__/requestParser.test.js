const { APIError, requestParser } = require("../app/helpers");
const { Bus, Train, Aeroplane } = require("../app/transports");

const stubs = {
  req1: [
    {
      mode: "bus",
      source: "New York",
      destination: "Boston",
      seatNumber: "A12",
    },
    {
      mode: "train",
      source: "Boston",
      destination: "Washington DC",
      trainNumber: "123",
      seatNumber: "B7",
    },
    {
      mode: "aeroplane",
      source: "Washington DC",
      destination: "San Francisco",
      flightNumber: "UA123",
      seatNumber: "C14",
      gateNumber: "B12",
      baggage: "B1234",
    },
  ],
  req2: [
    {
      mode: "bus",
      source: "New York",
      destination: "Boston",
      seatNumber: "A12",
    },
    {
      mode: "train",
      source: "Boston",
      destination: "Washington DC",
      trainNumber: "123",
      seatNumber: "B7",
    },
    {
      mode: "boat",
      source: "Washington DC",
      destination: "San Francisco",
      seatNumber: "C14",
    },
  ],
  req3: [
    {
      mode: "bus",
      source: "New York",
      destination: "Boston",
      seatNumber: "A12",
    },
  ],
  req4: [
    {
      mode: "bus",
      source: "New York",
      destination: "Boston",
      seatNumber: "A12",
    },
    {
      mode: "train",
      source: "Boston",
      destination: "Washington DC",
      trainNumber: "123",
      seatNumber: "B7",
    },
    {
      mode: "aeroplane",
      source: "Washington DC",
      destination: "San Francisco",
      flightNumber: "UA123",
      seatNumber: "C14",
      gateNumber: "B12",
      baggage: "A12345",
    },
  ],
  req5: [{ mode: "aeroplane", source: "New York", seatNumber: "A12" }],
};

describe("Helper Functions", () => {
  describe("requestParser()", () => {
    it("should check if all modes are supported", () => {
      const expectedOutput = [
        new Bus("New York", "Boston", "A12"),
        new Train("Boston", "Washington DC", "123", "B7"),
        new Aeroplane(
          "Washington DC",
          "San Francisco",
          "UA123",
          "C14",
          "B12",
          "B1234"
        ),
      ];
      const actualOutput = requestParser(stubs.req1);
      expect(actualOutput).toEqual(expectedOutput);
    });
    it("should return an API Error if an unsupported mode is provided", () => {
      expect(() => requestParser(stubs.req2)).toThrow(APIError);
    });
    it("should parse request with a single pass", () => {
      const expectedOutput = [new Bus("New York", "Boston", "A12")];
      const actualOutput = requestParser(stubs.req3);
      expect(actualOutput).toEqual(expectedOutput);
    });
    test("should parse request with multiple passes", () => {
      const expectedOutput = [
        new Bus("New York", "Boston", "A12"),
        new Train("Boston", "Washington DC", "123", "B7"),
        new Aeroplane(
          "Washington DC",
          "San Francisco",
          "UA123",
          "C14",
          "B12",
          "A12345"
        ),
      ];
      const actualOutput = requestParser(stubs.req4);
      expect(actualOutput).toEqual(expectedOutput);
    });
    test("should return an empty array if the requestBody is empty", () => {
      const actualOutput = requestParser([]);
      expect(actualOutput).toEqual([]);
    });
  });
});
