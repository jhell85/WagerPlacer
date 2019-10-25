const Bet = require("../models/Bet");
const { AsyncRouter } = require("express-async-router");

const router = AsyncRouter();

// List route

// router.get("/", async (req, res) => {
//     const bets = await 
// })

// Create route
router.post("/", async (req, res) => {
  const bet = new Bet(req.body);
  await bet.save();

  res.status(201).send(bet);
  console.log(bet)
});
module.exports = router;