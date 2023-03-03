const request = require('supertest');
const app = require("../app/app");

describe('sortPasses', () => {
  test('should return sorted instructions with correct ending string', async () => {
    const boardingPasses = [
      {source: 'New York', destination: 'Paris', mode: 'aeroplane', flightNumber: 'KL156', gateNumber: '43B', seatNumber: 'AB12'},
      {source: 'Paris', destination: 'Berlin', mode: 'train', trainNumber: 'T1', seatNumber: '3A'}
    ];
    const expectedInstructions = [
      '1. From New York, take flight KL156 to Paris. Gate 43B, seat AB12. Baggage will be automatically transferred from your last leg.',
      '2. Take train T1 from Paris to Berlin. Sit in seat 3A.',
      '3. You have arrived at your final destination.'
    ];
    const response = await request(app)
      .post('/sort')
      .send(boardingPasses);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedInstructions);
  });

  test('should throw an error if no start node is found', async () => {
    const boardingPasses = [
      {source: 'London', destination: 'Paris', mode: 'aeroplane', flightNumber: 'KL156', gateNumber: '43B', seatNumber: 'AB12'},
      {source: 'Paris', destination: 'London', mode: 'train', trainNumber: 'T1', seatNumber: '3A'}
    ];
    const response = await request(app)
      .post('/sort')
      .send(boardingPasses);
    expect(response.statusCode).toBe(400);
    expect(response.body.error.status).toBe(400);
    expect(response.body.error.message).toEqual('No start node found');
  });

  test('should throw an error if no end node is found', async () => {
    const boardingPasses = [
      {source: 'New York', destination: 'Paris', mode: 'aeroplane', flightNumber: 'KL156'},
      {source: 'Paris', destination: 'Berlin', mode: 'train', trainNumber: 'T1', seatNumber: '3A'},
      {source: 'Berlin', destination: 'Madrid', mode: 'bus', transportNumber: '456'},
      {source: 'Madrid', destination: 'Paris', mode: 'bus', transportNumber: '456'},
    ];
    const response = await request(app)
      .post('/sort')
      .send(boardingPasses);
    expect(response.statusCode).toBe(400);
    expect(response.body.error.status).toBe(400);
    expect(response.body.error.message).toEqual('No end node found');
  });

  test('should throw an error if no path found between two nodes', async () => {
    const boardingPasses = [
      {source: 'New York', destination: 'Paris', mode: 'aeroplane', flightNumber: 'KL156', gateNumber: '43B', seatNumber: 'AB12'},
      {source: 'Paris', destination: 'Berlin', mode: 'train', trainNumber: 'T1', seatNumber: '3A'},
      {source: 'Berlin', destination: 'Madrid', mode: 'bus'},
      {source: 'Madrid', destination: 'Rome', mode: 'aeroplane', flightNumber: 'QR123', gateNumber: '43B', seatNumber: 'AB12'},
      {source: 'Berlin', destination: 'London', mode: 'bus'}
    ];
    const response = await request(app)
      .post('/sort')
      .send(boardingPasses);
    expect(response.statusCode).toBe(400);
    expect(response.body.error.status).toBe(400);
    expect(response.body.error.message).toEqual('No path found from London');
  });

  test('should return an empty list if boarding passes are not provided', async () => {
    const response = await request(app)
      .post('/sort')
      .send([]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
