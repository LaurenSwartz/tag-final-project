const request = require('supertest');
const express = require('express');
const historyRouter = require('../routes/history');
const historyController = require('../controllers/history');

const app = express();
app.use(express.json());
app.use('/history', historyRouter);

jest.mock('../controllers/history');

describe('GET /history', () => {
  it('should return all history records', async () => {
    const mockHistory = [{ id: 1, event: 'Event 1' }, { id: 2, event: 'Event 2' }];
    historyController.getAll.mockImplementation((req, res) => res.status(200).json(mockHistory));

    const response = await request(app).get('/history');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockHistory);
  });
});

describe('GET /history/:id', () => {
  it('should return a single history record', async () => {
    const mockHistoryRecord = { id: 1, event: 'Event 1' };
    historyController.getSingle.mockImplementation((req, res) => res.status(200).json(mockHistoryRecord));

    const response = await request(app).get('/history/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockHistoryRecord);
  });
});