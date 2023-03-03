const express = require("express");

const { sortHandlers } = require("../handlers");

const router = new express.Router();
const { sortPasses } = sortHandlers;

router
  .route("")
  .post(sortPasses)

module.exports = router;
