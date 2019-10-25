const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const betSchema = Schema(
  {
    game: {
      type: Object,
      required: true
    },
    homeReferences: {
      type: Object,
      required: true
    },
    awayReferences: {
      type: Object,
      required: true
    },
    odds: {
      type: Number,
      required: true
    },
    betType: {
      type: Object,
      required: true
    },
    event_time: {
      type: Date,
      required: true
    },
    homeAway: { //overUnder true = home or over : false = under or away
      type: Boolean,
      required: true
    },
    wager: {
      type: Number,
      required: true
    },
    payOut: {
      type: Number,
      required: true
    },
    home_score: {
      type: Number
    },
    away_score: { 
      type: Number
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtual: true
    },
    toObject: {
      virtual: true
    }
  }
);
betSchema.virtual("creator", {
  localField: "_id",
  foreignField: "user",
  ref: "User",
  justOne: true
});
betSchema.virtual("accepter", {
  localField: "_id",
  foreignField: "user",
  ref: "User"
});

const Bet = mongoose.model("Bet", betSchema);

module.exports = Bet;
