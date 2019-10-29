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
  console.log(req.body)
  const bet = new Bet(req.body);
  bet.creator = req.user;
  await bet.save();

  res.status(201).send(bet);
  console.log(bet);
});
router.get(
  "/",
  async (req, res) => {
    const bet = await Bet.find().filter()
  }
)


module.exports = router;
