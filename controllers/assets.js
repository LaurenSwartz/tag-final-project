const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Assets']
  const result = await mongodb.getDatabase().db().collection("asset").find();
  result.toArray().then((asset) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(asset);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Assets']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid asset id to find a asset.");
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("asset")
    .find({ _id: userId });
  result.toArray().then((asset) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(asset[0]);
  });
};

const createAsset = async (req, res) => {
  //#swagger.tags=['Assets']
  const asset = {
    assetName: req.body.assetName,
    assetType: req.body.assetType,
    assetValue: req.body.assetValue,
    assetOwner: req.body.assetOwner,
    assetLocation: req.body.assetLocation,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("asset")
    .insertOne(asset);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the asset.");
  }
};

const updateAsset = async (req, res) => {
  //#swagger.tags=['Assets']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid asset id to update a asset.");
  }
  const userId = new ObjectId(req.params.id);
  const asset = {
    assetName: req.body.assetName,
    assetType: req.body.assetType,
    assetValue: req.body.assetValue,
    assetOwner: req.body.assetOwner,
    assetLocation: req.body.assetLocation,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("asset")
    .replaceOne({ _id: userId }, asset);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the asset.");
  }
};

const deleteAsset = async (req, res) => {
  //#swagger.tags=['Assets']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid asset id to delete a asset.");
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("asset")
    .deleteOne({ _id: userId });
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the asset.");
  }
};

const getAssetByOwner = async (req, res) => {
  //#swagger.tags=['Assets']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("asset")
    .find({ assetOwner: req.params.assetOwner });
  result.toArray().then((asset) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(asset);
  });
};

const checkOutAsset = async (req, res) => {
  //#swagger.tags=['Assets']
  const userId = new ObjectId(req.params.id);
  const asset = {
    assetName: req.body.assetName,
    assetType: req.body.assetType,
    assetValue: req.body.assetValue,
    assetOwner: req.body.assetOwner,
    assetLocation: req.body.assetLocation,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("asset")
    .replaceOne({ _id: userId }, asset);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the asset.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createAsset,
  updateAsset,
  deleteAsset,
  getAssetByOwner,
  checkOutAsset,
};
