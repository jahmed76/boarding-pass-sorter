const { Sorter } = require('../app/sorter');
const { APIError } = require("../app/helpers");

describe("Sorter", () => {
  describe("sort", () => {
    test("returns empty array if no boarding passes are provided", () => {
      const sorter = new Sorter([]);
      expect(sorter.sort()).toEqual([]);
    });

    test("throws error if no start node is found", () => {
      const boardingPasses = [
        { source: "D", destination: "C" },
        { source: "C", destination: "D" },
      ];
      const sorter = new Sorter(boardingPasses);
      expect(() => sorter.sort()).toThrowError(APIError);
    });

    test("throws error if no end node is found", () => {
      const boardingPasses = [
        { source: "A", destination: "B" },
        { source: "B", destination: "A" },
      ];
      const sorter = new Sorter(boardingPasses);
      expect(() => sorter.sort()).toThrowError(APIError);
    });

    test("throws error if no path is found between source and destination", () => {
      const boardingPasses = [
        { source: "A", destination: "B" },
        { source: "C", destination: "D" },
      ];
      const sorter = new Sorter(boardingPasses);
      expect(() => sorter.sort()).toThrowError(APIError);
    });

    test("returns sorted array of boarding passes with two passes", () => {
      const boardingPasses = [
        { source: "A", destination: "B" },
        { source: "B", destination: "C" },
      ];
      const sorter = new Sorter(boardingPasses);
      const sortedPasses = sorter.sort();
      expect(sortedPasses.length).toEqual(2);
      expect(sortedPasses[0]).toEqual(boardingPasses[0]);
      expect(sortedPasses[1]).toEqual(boardingPasses[1]);
    });

    test("returns sorted array of boarding passes with three passes", () => {
      const boardingPasses = [
        { source: "C", destination: "D" },
        { source: "A", destination: "B" },
        { source: "B", destination: "C" },
      ];
      const sorter = new Sorter(boardingPasses);
      const sortedPasses = sorter.sort();
      expect(sortedPasses.length).toEqual(3);
      expect(sortedPasses[0]).toEqual(boardingPasses[1]);
      expect(sortedPasses[1]).toEqual(boardingPasses[2]);
      expect(sortedPasses[2]).toEqual(boardingPasses[0]);
    });

    test("returns sorted array of boarding passes with five passes", () => {
      const boardingPasses = [
        { source: "D", destination: "E" },
        { source: "B", destination: "C" },
        { source: "C", destination: "D" },
        { source: "A", destination: "B" },
        { source: "E", destination: "F" },
      ];
      const sorter = new Sorter(boardingPasses);
      const sortedPasses = sorter.sort();
      expect(sortedPasses.length).toEqual(5);
      expect(sortedPasses[0]).toEqual(boardingPasses[3]);
      expect(sortedPasses[1]).toEqual(boardingPasses[1]);
      expect(sortedPasses[2]).toEqual(boardingPasses[2]);
      expect(sortedPasses[3]).toEqual(boardingPasses[0]);
      expect(sortedPasses[4]).toEqual(boardingPasses[4]);
    });
  });
});
