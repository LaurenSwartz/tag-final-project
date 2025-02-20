const request = require('supertest');
const express = require('express');
const assetsRouter = require('../routes/assets');
const assetsController = require('../controllers/assets');

const app = express();
app.use(express.json());
app.use('/assets', assetsRouter);

jest.mock('../controllers/assets');

describe('GET /assets', () => {
  it('should return all assets', async () => {
    const mockAssets = [{ id: 1, name: 'Asset 1' }, { id: 2, name: 'Asset 2' }];
    assetsController.getAll.mockImplementation((req, res) => res.status(200).json(mockAssets));

    const response = await request(app).get('/assets');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAssets);
  });
});

describe('GET /assets/:id', () => {
  it('should return a single asset', async () => {
    const mockAsset = { id: 1, name: 'Asset 1' };
    assetsController.getSingle.mockImplementation((req, res) => res.status(200).json(mockAsset));

    const response = await request(app).get('/assets/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAsset);
  });
});