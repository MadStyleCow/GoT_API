// Imports
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define a schema
export const BattleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  battle_number: {
    type: Number,
    required: true
  },
  attacker_king: {
    type: String,
    required: false
  },
  defender_king: {
    type: String,
    required: false
  },
  attacker_1: {
    type: String,
    required: false
  },
  attacker_2: {
    type: String,
    required: false
  },
  attacker_3: {
    type: String,
    required: false
  },
  attacker_4: {
    type: String,
    required: false
  },
  defender_1: {
    type: String,
    required: false
  },
  defender_2: {
    type: String,
    required: false
  },
  defender_3: {
    type: String,
    required: false
  },
  defender_4: {
    type: String,
    required: false
  },
  attacker_outcome: {
    type: String,
    required: false
  },
  battle_type: {
    type: String,
    required: false
  },
  major_death: {
    type: Number,
    required: false
  },
  major_capture: {
    type: Number,
    required: false
  },
  attacker_size: {
    type: Number,
    required: false
  },
  defender_size: {
    type: Number,
    required: false
  },
  attacker_commander: {
    type: String,
    required: false
  },
  defender_commander: {
    type: String,
    required: false
  },
  summer: {
    type: Number,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  region: {
    type: String,
    required: false
  },
  note: {
    type: String,
    required: false
  }
});