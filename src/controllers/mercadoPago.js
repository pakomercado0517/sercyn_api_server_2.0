const { MercadoPagoConfig, Preference } = require("mercadopago");
const { MERCADO_PAGO_ACCESS_TOKEN } = process.env;

const { FRONT_HOST, BACK_HOST } = process.env;

const constants = {
  frontHost: FRONT_HOST,
  backHost: BACK_HOST,
};

module.exports = {
  newTransactions: async (req, res) => {
    try {
      const client = new MercadoPagoConfig({
        accessToken: `${MERCADO_PAGO_ACCESS_TOKEN}`,
      });
      console.log("client", client);
      const preference = new Preference(client);
      console.log("preference", preference);
      const preferenceData = await preference.create({
        body: {
          items: [{ ...req.body }],
          // items: [{ title, quantity, currency_id, unit_price }],
          back_urls: {
            success: `${constants.frontHost}/payment/response`,
            failure: `${constants.frontHost}/payment/response`,
            pending: `${constants.frontHost}/payment/response`,
          },
          auto_return: "approved",
        },
      });
      res.status(200).json(preferenceData);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  responseTransactions: async (req, res) => {
    const paymentResult = req.params;
    console.log("paymentResult", typeof paymentResult);
  },
};
