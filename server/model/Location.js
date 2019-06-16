import {Schema, model} from 'mongoose';

const locationSchema = new Schema({
  male: {
    type: Int,
    unique: true,
    required: [true, 'Male population is required.']
  },
  female: {
    type: Int,
    unique: true,
    required: [true, 'Female population is required.']
  },
  subLocation: {
    type: Schema.Types.ObjectId,
    ref: 'location'
  },
});

const LocationModel = model('location', locationSchema);

export default class Grocery {
  static async add(male, female, subLocation) {
    const location = new LocationModel({male, female, subLocation});
    const newLocation = await location.save();
  }
}
