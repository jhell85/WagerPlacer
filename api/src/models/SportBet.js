const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const betSchema = Schema({
   name: {
       type: String,
    },
    league: {
        type: String,
    },
    amount: {
        type: Number,
        require: true, 
    },
    odds: {
        type: Number,
        require: true,
    },
    event_time: {
        type: Date,
        require: true,
    },
    home: {
        type: String,
        require: true,
    },
    away: {
        type: String,
        require: true,
    },
    home_score: {
        type: Number,
    },
    away_score: {
        type: Number,
    }
    }, {
    timestamps: true,
    toJSON: {
        virtual: true,
    },
    toObject: {
        virtual: true,
    }
});
betSchema.virtual("creator", {
    localField: "_id",
    foreignField: "user",
    ref: "User",
    justOne: true,
});
betSchema.virtual("accepter", {
    localField: "_id",
    foreignField: "user",
    ref: "User",
    
});

const Bet = mongoose.model("Bet", betSchema);

module.exports = Bet;
  




