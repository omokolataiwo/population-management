import {Schema, model} from 'mongoose';

const locationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Location name is required.'],
    unique: true,
  },
  malePopulation: {
    type: Number,
    required: [true, 'Male population is required.'],
  },
  femalePopulation: {
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
  static async add(name, malePopulation, femalePopulation, parentLocation) {
    const location = new LocationModel({
      name,
      malePopulation,
      femalePopulation,
    });
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
    const location = await LocationModel.findOneAndUpdate(
      {_id: id},
      {$set: body},
      {new: true},
    );
    return location;
  }

  static async find(locationId) {
    const location = await LocationModel.findById(locationId).populate(
      'subLocation',
    );
    return location;
  }

  static async delete(locationId) {
    const location = await LocationModel.findOneAndRemove({_id: locationId});
    const parentId = location._id;
    const parentLocation = await LocationModel.findOneAndUpdate(
      {subLocation: parentId},
      {$set: {subLocation: null}},
    );
    return location;
  }
}
