/**
 * @swagger
 * components:
 *   schemas:
 *     BoardingPass:
 *       type: object
 *       required:
 *         - source
 *         - destination
 *         - mode
 *       properties:
 *         source:
 *           type: string
 *           description: Starting point of the pass
 *         destination:
 *           type: string
 *           description: Ending point of the pass
 *         mode:
 *           type: string
 *           description: Travel mode. can be bus, aeroplane, train.
 *         flightNumber:
 *           type: string
 *           description: Flight number, only applicable for aeroplane
 *         seatNumber:
 *           type: string
 *           description: Seat number, can be used to specify seat number on bus, train and aeroplane
 *         gateNumber:
 *           type: string
 *           description: Gate number, only applicable for aeroplane
 *         baggage:
 *           type: string
 *           description: Baggage, only applicable for aeroplane
 *         trainNumber:
 *           type: string
 *           description: Train number, only applicable for train
 *       example:
 *         mode: train
 *         source: A
 *         destination: B
 *     Response:
 *       type: array
 *       items:
 *         type: string
 */

/**
 * @swagger
 * tags:
 *   name: Sort
 *   description: The endpoint to sort boarding passes and generate travel instructions
 * /sort:
 *   post:
 *     summary: Sort boarding passes
 *     tags: [Sort]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/BoardingPass'
 *     responses:
 *       200:
 *         description: Travel instructions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       500:
 *         description: Internal server error
 *
 */