const Bet = require("../models/Bet");
const { AsyncRouter } = require("express-async-router");
const handleValidationErrors = require("../helpers/handleValidationErrors");
const jwtMiddleware = require("../helpers/jwtMiddleware");

const router = AsyncRouter();

// List route

// router.get("/", async (req, res) => {
//     const bets = await
// })

// Create route
router.post("/", [jwtMiddleware, handleValidationErrors], async (req, res) => {
  const bet = new Bet(req.body);
  bet.creator = req.user;
  console.log(bet)
  await bet.save();

  res.status(201).send(bet);

});
router.get("/creator", [jwtMiddleware], async (req, res) => {
  const bet = await Bet.find({ creator: req.user._id });
  // console.log(bet)
  res.send(bet);
});
router.get("/", async (req, res) => {
  const bet = await Bet.find()
  // console.log(bet)
  res.send(bet);
})

module.exports = router;
