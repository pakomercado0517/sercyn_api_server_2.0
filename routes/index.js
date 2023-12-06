const express = require("express");
const router = express.Router();
const UserRoute = require("./User");
const CompanyRoute = require("./Company");
const BoatRoute = require("./Boat");
const DestinationRoute = require("./Destination");
const PriceRoute = require("./Price");
const ClientRoute = require("./Client");
const TransactionRoute = require("./Transaciton");
const RatingRoute = require("./Rating");
const ClientSignMethodsRoute = require("./ClientSignMethods");
const MpRoutes = require("./MercadoPago");
const PaymentsCollectionRoutes = require("./PaymentsCollection");
const BoatImageRoute = require("./BoatImage");
const ChatRoute = require("./Chat");
const ConversationRoute = require("./Conversation");
// const MessageRoute = require("./Message");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Hello world from Sercyn");
});
router.use("/user", UserRoute);
router.use("/company", CompanyRoute);
router.use("/boat", BoatRoute);
router.use("/destination", DestinationRoute);
router.use("/price", PriceRoute);
router.use("/client", ClientRoute);
router.use("/transaction", TransactionRoute);
router.use("/rating", RatingRoute);
router.use("/sign_method", ClientSignMethodsRoute);
router.use("/payment", MpRoutes);
router.use("/payments_collection", PaymentsCollectionRoutes);
router.use("/boatImage", BoatImageRoute);
router.use("/conversation", ConversationRoute);
// router.use("/message", MessageRoute);
// router.use("/chat", ChatRoute);
module.exports = router;
