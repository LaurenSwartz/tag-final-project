const request = require('supertest');
const express = require('express');
const usersRouter = require('../routes/users');
const usersController = require('../controllers/user');

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

jest.mock('../controllers/user');

describe('GET /users', () => {
  it('should return all users', async () => {
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    usersController.getAll.mockImplementation((req, res) => res.status(200).json(mockUsers));

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });
});

describe('GET /users/:id', () => {
  it('should return a single user', async () => {
    const mockUser = { id: 1, name: 'User 1' };
    usersController.getSingle.mockImplementation((req, res) => res.status(200).json(mockUser));

    const response = await request(app).get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });
});