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