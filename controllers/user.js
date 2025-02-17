const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const result = await mongodb.getDatabase().db().collection("user").find();
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    });
  } catch (error) {
    res.status(500).json("An error occurred while retrieving users.");
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid contact id to find a contact.");
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("user")
      .find({ _id: userId });
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]);
    });
  } catch (error) {
    res.status(500).json("An error occurred while retrieving the user.");
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const user = {
      email: req.body.email,
      gender: req.body.gender,
      position: req.body.position,
      department: req.body.department,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("user")
      .insertOne(user);
    if (response.acknowledged) {
      res.status(204).send({ message: "completed successfully" });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while creating the user.");
    }
  } catch (error) {
    res.status(500).json("An error occurred while creating the user.");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid contact id to update a contact.");
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      email: req.body.email,
      gender: req.body.gender,
      position: req.body.position,
      department: req.body.department,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("user")
      .replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send({ message: "completed successfully" });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the user.");
    }
  } catch (error) {
    res.status(500).json("An error occurred while updating the user.");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid contact id to delete a contact.");
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("user")
      .deleteOne({ _id: userId });
    res.status(204).send({ message: "completed successfully" });
  } catch (error) {
    res.status(500).json("An error occurred while deleting the user.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
