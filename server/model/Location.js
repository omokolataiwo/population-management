import {Schema, model} from 'mongooe';

const locationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Location name is required.'],
    unique: true,
  },
  male: {
    type: Number,
    required: [true, 'Male population is required.'],
  },
  female: {
    type: Number,
    required: [true, 'Female population is required.'],
  },
  subLocation: {
    type: Schema.Types.ObjectId,
    ref: 'location',
  },
});

const LocationModel = model('location', locationSchema);

export default class Location {
  static async add(name, male, female, parentLocation) {
    const location = new LocationModel({name, male, female});
    const newLocation = await location.save();
    const pLocation = parentLocation;
    if (parentLocation) {
      const parentLocation = await LocationModel.findOneAndUpdate(
        {_id: pLocation},
        {$set: {subLocation: newLocation._id}},
        {new: true},
      );
    }

    return newLocation;
  }

  static async update(id, body) {
    const location = await LocationModel.findOneAndUpdate({_id: id}, body);
    return location;
  }

  static async find(locationId) {
    const location = await LocationModel.findById(locationId).populate(
      'subLocation',
    );
    return location;
  }
}
