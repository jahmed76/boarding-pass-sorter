const { requestParser } = require("../helpers");
const { Sorter } = require("../sorter");

const ENDING_STRING = 'You have arrived at your final destination.';
async function sortPasses(request, response, next) {
  try {
    const boardingPasses = requestParser(request.body);
    const sorter = new Sorter(boardingPasses);
    const sortedBoardingPasses = sorter.sort();
    const lastLine = sortedBoardingPasses.length + 1
    const instructions = [];

    sortedBoardingPasses.forEach((pass, lineNo) => {
      instructions.push(`${lineNo + 1}. ${pass.stringify()}`);
    });
    
    if (sortedBoardingPasses.length > 0) {
      instructions.push(`${lastLine}. ${ENDING_STRING}`);
    }
    return response.json(instructions);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  sortPasses
};
