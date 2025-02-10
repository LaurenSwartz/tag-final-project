const mongodb =require('../data/database');
const ObjectId =require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result =await mongodb.getDatabase().db().collection('user').find();
    result.toArray().then((users)=> {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
    
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
      }
    const userId= new ObjectId(req.params.id);
    const result =await mongodb.getDatabase().db().collection('user').find({_id: userId});
    result.toArray().then((users)=> {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });

};

const createUser = async (req,res) => {
    const user = {
        email: req.body.email,
        gender: req.body.gender,
        position: req.body.position,
        department: req.body.department,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    const response = await mongodb.getDatabase().db().collection('user').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();    
    }   else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const updateUser = async (req,res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
      }
    //swagger.tags=['Users']
    const userId= new ObjectId(req.params.id);
    const user = {
        email: req.body.email,
        gender: req.body.gender,
        position: req.body.position,
        department: req.body.department,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    const response = await mongodb.getDatabase().db().collection('user').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();    
    }   else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
      }
    //swagger.tags=['Users']
    const userId= new ObjectId(req.params.id);
    const response =await mongodb.getDatabase().db().collection('user').deleteOne({_id: userId});
    if (response.deleteCount > 0) {
        res.status(204).send();    
    }   else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};




module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};