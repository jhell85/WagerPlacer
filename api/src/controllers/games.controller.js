const { AsyncRouter } = require("express-async-router");
const axios = require("axios");
const authToken = require("../helpers/apiToken");

const getGames = async () => {
    const { data } = await axios.get("https://api.mysportsfeeds.com/v2.1/pull/nfl/current/week/7/odds_gamelines.json", {
        headers: {
            Authorization: `Basic ${authToken}`
        }
    })
    console.log(data['gameLines'])
    return data['gameLines'].map(game => ({
        game: game.game, 
        lines: game.lines.map((line) => (line.pointSpreads[line.pointSpreads.length - 1]))
    }));
}
const router = AsyncRouter()

router.get("/", async (req, res) => {
    const games = await getGames();
    res.send(games);
})

module.exports = router;