const request = require('supertest');
const express = require('express');
const assignmentsRouter = require('../routes/assignments');
const assignmentController = require('../controllers/assignments');

const app = express();
app.use(express.json());
app.use('/assignments', assignmentsRouter);

jest.mock('../controllers/assignments');

describe('GET /assignments', () => {
  it('should return all assignments', async () => {
    const mockAssignments = [{ id: 1, name: 'Assignment 1' }, { id: 2, name: 'Assignment 2' }];
    assignmentController.getAll.mockImplementation((req, res) => res.status(200).json(mockAssignments));

    const response = await request(app).get('/assignments');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAssignments);
  });
});

describe('GET /assignments/:id', () => {
  it('should return a single assignment', async () => {
    const mockAssignment = { id: 1, name: 'Assignment 1' };
    assignmentController.getSingle.mockImplementation((req, res) => res.status(200).json(mockAssignment));

    const response = await request(app).get('/assignments/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAssignment);
  });
});