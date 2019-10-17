const { AsyncRouter } = require("express-async-router");
const axios = require("axios");
const authToken = require("../helpers/apiToken");

const getGames = async () => {
    const { data } = await axios.get("https://api.mysportsfeeds.com/v2.1/pull/nfl/current/week/7/odds_gamelines.json", {
        headers: {
            Authorization: `Basic ${authToken}`
        }
    })
    return data['gameLines']
        .map(gameLine => ({
        game: gameLine.game, 
        pointSpread: gameLine.lines[gameLine.lines.length - 1].pointSpreads
        .filter((pointSpreads) => pointSpreads.pointSpread.gameSegment === "FULL").pop(),
// //   pointSpreads[pointSpreads.length - 1],
//         lines: gameLine.lines.map(line => (
            
//             line.pointSpreads[line.pointSpreads.length - 1])
//             // .filter((line) => line.pointSpread.gameSegment === "FULL")
//             // .map((line) => line.length - 1),
//             ),

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