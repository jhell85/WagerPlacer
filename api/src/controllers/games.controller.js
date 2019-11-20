const { AsyncRouter } = require("express-async-router");
const axios = require("axios");
const authToken = require("../helpers/apiToken");

const getGames = async () => {
    const response = await axios.get("https://api.mysportsfeeds.com/v2.1/pull/nfl/current/week/12/odds_gamelines.json", {
        headers: {
            Authorization: `Basic ${authToken}`
        }
    })

    const data = response.data;

    return data['gameLines']
        .map(gameLine => ({
        game: gameLine.game, 

        pointSpread: gameLine.lines[gameLine.lines.length - 1].pointSpreads
        .filter((spread) => spread.pointSpread.gameSegment === "FULL").pop(),

        moneyLine: gameLine.lines[gameLine.lines.length - 1].moneyLines
        .filter((moneyLine) => { 
            return moneyLine.moneyLine.gameSegment === "FULL"
        }).pop(),


        overUnder: gameLine.lines[gameLine.lines.length - 1].overUnders
        // .filter((overUnder) => overUnder.overUnder.gameSegment === "FULL").pop(),
        .filter((overUnder) => {
            // console.log(overUnder)
            return overUnder.overUnder.gameSegment === "FULL"
        }).pop(),

        homeReferences: data.references['teamReferences']
            .filter((team) => team.abbreviation === gameLine.game.homeTeamAbbreviation).pop(),

        awayReferences: data.references['teamReferences']
        .filter((team) => team.abbreviation === gameLine.game.awayTeamAbbreviation).pop()
    }));
}
const router = AsyncRouter()

router.get("/", async (req, res) => {
    const games = await getGames();
    res.send(games);
})

module.exports = router;