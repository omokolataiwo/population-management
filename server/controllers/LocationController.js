import LocationModel from '../model/Location';

export default class LocationController {
  static async add(req, res) {
    const {name, malePopulation, femalePopulation, parentLocation} = req.body;

    const parentLocationModel =
      !parentLocation || (await LocationModel.find(parentLocation));

    if (parentLocation && !parentLocationModel) {
      return res.json({
        status: 404,
        message: 'Parent location is not a valid location.',
      });
    }

    const location = await LocationModel.add(
      name,
      malePopulation,
      femalePopulation,
      parentLocation,
    );
    return res.json({location});
  }

  static async getLocation(req, res) {
    const {locationId} = req.params;
    const location = await LocationModel.find(locationId);
    return res.json({location});
  }

  static async edit(req, res) {
    const {name, malePopulation, femalePopulation, parentLocation} = req.body;

    const parentLocationModel =
      !parentLocation || (await LocationModel.find(parentLocation));

    if (parentLocation && !parentLocationModel) {
      return res.json({
        status: 404,
        message: 'Parent location is not a valid location.',
      });
    }
    const location = await LocationModel.update(
      name,
      malePopulation,
      femalePopulation,
      parentLocation,
    );

    return res.send({location});
  }
  static delete(req, res) {
    return res.send('Routing');
  }
}
