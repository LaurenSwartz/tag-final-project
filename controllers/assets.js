const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const QRCode = require("qrcode");
const getAll = async (req, res) => {
  //#swagger.tags=['Assets']
  try {
    const result = await mongodb.getDatabase().db().collection("asset").find();
    result.toArray().then((asset) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(asset);
    });
  } catch (error) {
    res.status(500).json("An error occurred while retrieving assets.");
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Assets']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid asset id to find an asset.");
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
  } catch (error) {
    res.status(500).json("An error occurred while retrieving the asset.");
  }
};

const createAsset = async (req, res) => {
  //#swagger.tags=['Assets']
  try {
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
        .json(
          response.error || "Some error occurred while creating the asset."
        );
    }
  } catch (error) {
    res.status(500).json("An error occurred while creating the asset.");
  }
};

const updateAsset = async (req, res) => {
  //#swagger.tags=['Assets']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid asset id to update an asset.");
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
        .json(
          response.error || "Some error occurred while updating the asset."
        );
    }
  } catch (error) {
    res.status(500).json("An error occurred while updating the asset.");
  }
};

const deleteAsset = async (req, res) => {
  //#swagger.tags=['Assets']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid asset id to delete an asset.");
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
        .json(
          response.error || "Some error occurred while deleting the asset."
        );
    }
  } catch (error) {
    res.status(500).json("An error occurred while deleting the asset.");
  }
};

const getAssetByOwner = async (req, res) => {
  //#swagger.tags=['Assets']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("asset")
      .find({ assetOwner: req.params.assetOwner });
    result.toArray().then((asset) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(asset);
    });
  } catch (error) {
    res.status(500).json("An error occurred while retrieving assets by owner.");
  }
};

const checkOutAsset = async (req, res) => {
  //#swagger.tags=['Assets']
  try {
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
        .json(
          response.error || "Some error occurred while checking out the asset."
        );
    }
  } catch (error) {
    res.status(500).json("An error occurred while checking out the asset.");
  }
};

const generateQRCode = async (req, res) => {
  //#swagger.tags=['Assets']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json("Must use a valid asset id to generate QR code.");
    }
    const assetId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("asset")
      .findOne({ _id: assetId });
    if (!result) {
      return res.status(404).json("Asset not found.");
    }

    const assetDetails = JSON.stringify(result);
    QRCode.toDataURL(assetDetails, (err, url) => {
      if (err) {
        return res
          .status(500)
          .json("An error occurred while generating the QR code.");
      }
      res.status(200).json({ qrCode: url });
    });
  } catch (error) {
    res.status(500).json("An error occurred while generating the QR code.");
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
  generateQRCode,
};
