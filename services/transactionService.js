const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const TransactionModel = require("../models/TransactionModel");

const update = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: "Nenhuma transacao encontrado para atualizar" });
    } else {
      res.send(data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({}).exec();
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await TransactionModel.findById({ _id: id }).exec();
    res.json({ transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const transaction = new TransactionModel({ ...req.body });

    await transaction.save().then();
    res.send({ message: "Transação inserida com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await TransactionModel.findByIdAndDelete({ _id: id }).exec();

    if (data.length < 1) {
      res
        .status(404)
        .send({ message: "Nenhuma transacao encontrada para exclusao" });
    } else {
      res.send({ message: "Transacao excluida com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { findAll, findOne, create, update, remove };
