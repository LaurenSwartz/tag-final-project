const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Assignment']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("assignment")
      .find();
    result.toArray().then((assignments) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(assignments);
    });
  } catch (error) {
    res.status(500).json("An error occurred while retrieving assignment.");
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Assignment']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid id to find assignment details .");
    }
    const assignmentId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("assignment")
      .find({ _id: assignmentId });
    result.toArray().then((assignment) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(assignment[0]);
    });
  } catch (error) {
    res.status(500).json("An error occurred while retrieving assignment.");
  }
};

const createAssignment = async (req, res) => {
  //#swagger.tags=['Assignment']
  try {
    const assignment = {
      user_id: req.body.user_id,
      asset_id: req.body.asset_id,
      date_of_assignment: req.body.date_of_assignment,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("assignment")
      .insertOne(assignment);

    if (response.acknowledged) {
      res.status(202).json({ message: "Assignment created successfully" });
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating the assignment."
        );
    }
  } catch (error) {
    res.status(500).json("An error occurred while creating the assignment.");
  }
};

const updateAssignment = async (req, res) => {
  //#swagger.tags=['Assignment']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid id to update a assignment.");
    }
    const assignmentId = new ObjectId(req.params.id);
    const assignment = {
      user_id: req.body.user_id,
      asset_id: req.body.asset_id,
      date_of_assignment: req.body.date_of_assignment,
    };
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("assignment")
      .replaceOne({ _id: assignmentId }, assignment);
    if (response.modifiedCount > 0) {
      res
        .status(202)
        .send({ message: "Asset assignment updated successfully" });
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating the assignment."
        );
    }
  } catch (error) {
    res.status(500).json("An error occurred while updating the assignment.");
  }
};

const deleteAssignment = async (req, res) => {
  //#swagger.tags=['Assignment']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Must use a valid id to delete assignment.");
    }
    const assignmentId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("assignment")
      .deleteOne({ _id: assignmentId });

    if (response.deletedCount > 0) {
      res
        .status(202)
        .json({ message: "Asset assignment deleted successfully" });
    } else {
      res.status(500).json({
        error:
          response.error ||
          "Some error occurred while deleting the assignment.",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting assignment." });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
