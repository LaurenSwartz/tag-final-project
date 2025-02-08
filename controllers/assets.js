const mongodb =require('../data/database');
const ObjectId =require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //swagger.tags=['Assets']
    const result =await mongodb.getDatabase().db().collection('asset').find();
    result.toArray().then((asset)=> {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(asset);
    });
    
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid asset id to find a asset.');
      }
    //swagger.tags=['Assets']
    const userId= new ObjectId(req.params.id);
    const result =await mongodb.getDatabase().db().collection('asset').find({_id: userId});
    result.toArray().then((asset)=> {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(asset[0]);
    });

};

module.exports = {
    getAll,
    getSingle
};    