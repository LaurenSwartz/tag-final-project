const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['History']
  try {
    const result = await mongodb.getDatabase().db().collection("history").find();
    result.toArray().then((history) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(history);
    });
  } catch (error) {
    res.status(500).json("An error occurred while retrieving history.");
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['History']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid id to find history details .");
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("history")
      .find({ _id: userId });
    result.toArray().then((history) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(history[0]);
    });
  } catch (error) {
    res.status(500).json("An error occurred while retrieving history.");
  }
};

const createHistory = async (req, res) => {
  //#swagger.tags=['History']
  try {
    const history = {
      asset_id: req.body.asset_id,
      last_used: req.body.last_used,
      
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("history")
      .insertOne(history);
    if (response.acknowledged) {
      res.status(204).send({ message: "completed successfully" });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while creating the history details.");
    }
  } catch (error) {
    res.status(500).json("An error occurred while creating the history details.");
  }
};

const updateHistory = async (req, res) => {
  //#swagger.tags=['History']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid id to update a history.");
    }
    const userId = new ObjectId(req.params.id);
    const history = {
        asset_id: req.body.asset_id,
        last_used: req.body.last_used,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("history")
      .replaceOne({ _id: userId }, history);
    if (response.modifiedCount > 0) {
      res.status(204).send({ message: "completed successfully" });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the history details.");
    }
  } catch (error) {
    res.status(500).json("An error occurred while updating the history details.");
  }
};

const deleteHistory = async (req, res) => {
  //#swagger.tags=['History']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid id to delete history.");
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("history")
      .deleteOne({ _id: userId });
    res.status(204).send({ message: "completed successfully" });
  } catch (error) {
    res.status(500).json("An error occurred while deleting history.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createHistory,
  updateHistory,
  deleteHistory,
};