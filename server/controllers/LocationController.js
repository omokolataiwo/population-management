import LocationModel from '../model/Location';
import {handleException} from '../util/CustomError.js';

export default class LocationController {
  static async add(req, res) {
    const {name, malePopulation, femalePopulation, parentLocation} = req.body;

    try {
      const parentLocationModel =
        !parentLocation || (await LocationModel.find(parentLocation));

      if (parentLocation && !parentLocationModel) {
        return res.status(404).json({
          message: 'Parent location is not a valid location.',
        });
      }

      const location = await LocationModel.add(
        name,
        malePopulation,
        femalePopulation,
        parentLocation,
      );
      return res.status(201).json({location});
    } catch (error) {
      return handleException(res, error);
    }
  }

  static async getLocation(req, res) {
    const {locationId} = req.params;
    const location = await LocationModel.find(locationId);
    return res.json({location});
  }

  static async edit(req, res) {
    const {body} = req;
    const fields = ['malePopulation', 'femalePopulation'];
    const {locationId} = req.params;

    const locationModel = await LocationModel.find(locationId);
    if (!locationModel) {
      return res.status(404).json({
        message: 'Location is not a valid location.',
      });
    }
    const editableFields = {};

    fields.forEach(field => {
      if (body[field]) editableFields[field] = body[field];
    });
    const location = await LocationModel.update(locationId, editableFields);
    return res.send({location});
  }
  static async delete(req, res) {
    const {locationId} = req.params;
    let location = await LocationModel.find(locationId);

    if (!location) {
      return res.status(404).json({
        status: 404,
        message: 'Location does not exist',
      });
    }
    location = await LocationModel.delete(locationId);
    return res.status(200).json({
      status: 200,
      message: `Location ${locationId} deleted sucessfully.`,
    });
  }
}
