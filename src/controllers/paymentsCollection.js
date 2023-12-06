const { PaymentsCollection, Transaction } = require("../db");

module.exports = {
  newCollection: async (req, res) => {
    const {
      preference_id,
      status,
      merchant_order_id,
      payment_id,
      payment_type,
      site_id,
      price,
    } = req.body;
    try {
      const collection = await PaymentsCollection.create({
        preference_id,
        status,
        merchant_order_id,
        payment_id,
        payment_type,
        site_id,
        price,
      });
      res.status(200).json(collection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getCollections: async (req, res) => {
    try {
      const collection = await PaymentsCollection.findAll();
      res.status(200).json(collection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateCollection: async (req, res) => {
    const {
      preference_id,
      status,
      merchant_order_id,
      payment_id,
      payment_type,
      site_id,
      price,
    } = req.body;
    try {
      console.log("preference_id", preference_id);
      const collection = await PaymentsCollection.findOne({
        where: { preference_id },
      });
      const transaction = await Transaction.findOne({
        where: { id: collection.TransactionId },
      });
      await transaction.update({ status });
      const putCollection = await PaymentsCollection.update(
        {
          status,
          merchant_order_id,
          payment_id,
          payment_type,
          site_id,
          price,
        },
        { where: { preference_id } }
      );
      res.status(200).json(putCollection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getCollectionById: async (req, res) => {
    const { id } = req.params;

    try {
      const collection = await PaymentsCollection.findOne({
        where: { preference_id: id },
        include: [{ model: Transaction }],
      });
      res.status(200).json(collection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateCollectionStatus: async (req, res) => {
    const { preference_id, status } = req.body;
    try {
      const updatedCollection = await PaymentsCollection.update(
        {
          status,
        },
        {
          where: { preference_id },
        }
      );
      res.status(200).json(updatedCollection);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteCollection: async (req, res) => {
    const { id } = req.params;
    const collection = await PaymentsCollection.findOne({
      where: { preference_id: id },
    });
    try {
      await Transaction.destroy({ where: { id: collection.TransactionId } });
      await PaymentsCollection.destroy({
        where: { preference_id: id },
      });
      res.status(200).json({ message: "collection removed..." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
