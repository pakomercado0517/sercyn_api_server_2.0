const {
  Transaction,
  Destination,
  Client,
  Boat,
  Price,
  PaymentsCollection,
} = require("../db");

module.exports = {
  newTransaction: async (req, res) => {
    const { priceId, clientId, passenger, status, price, date, title } =
      req.body;
    const { id } = req.params;
    try {
      //Buscamos el destino referido al precio seleccionado
      const findDestination = await Price.findOne({
        where: { id: priceId },
        include: [{ model: Destination }, { model: Boat }],
      });
      const findClient = await Client.findOne({ where: { id: clientId } });

      //We'll create a transaction, no forget his status is a enum with: "success", "fail", "pending to pay" and "paid"
      const newTransaction = await Transaction.create({
        passenger,
        status,
        date,
        price,
        preference_id: id,
        title,
      });

      //Create a new PaymentsCollections...
      // const newCollection = await PaymentsCollection.create({
      //   preference_id: id,
      //   price,
      // });

      await findDestination.Boat.addTransactions(newTransaction);
      await findClient.addTransactions(newTransaction);
      await findDestination.Destination.addTransactions(newTransaction);
      // await newTransaction.setPaymentsCollection(newCollection);
      res.status(200).json(newTransaction);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getTransactions: async (req, res) => {
    try {
      const allTransactions = await Transaction.findAll({
        include: [
          { model: Boat },
          { model: Client },
          { model: Destination },
          { model: PaymentsCollection },
        ],
      });
      res.status(200).json(allTransactions);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getTransactionById: async (req, res) => {
    const { id } = req.params;

    try {
      const transaction = await Transaction.findOne({
        where: { preference_id: id },
      });
      res.status(200).json(transaction);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  updateTransaction: async (req, res) => {
    const { id } = req.params;
    const { passenger, status, date, price } = req.body;
    try {
      const transaction = await Transaction.update(
        {
          passenger,
          status,
          date,
          price,
        },
        { where: { id } }
      );
      if (!transaction) {
        res.status(404).json({ message: "Transaction not found..." });
      } else {
        res.status(200).json(transaction);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  deleteTransaction: async (req, res) => {
    const { id } = req.params;
    try {
      await Transaction.destroy({
        where: { id },
        include: [{ model: PaymentsCollection }],
      });
      res.status(200).json({ message: "Transaction deleted succesfully" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  findTransactionByCompany: async (req, res) => {
    const { id } = req.params;
    const { destinationId } = req.body;
    try {
      const transaction = await Transaction.findAll({
        include: [
          {
            model: Boat,
            where: { CompanyId: id },
          },
          { model: PaymentsCollection },
          { model: Client },
          { model: Destination },
        ],
      });
      res.status(200).json(transaction);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};
