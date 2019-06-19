import Router from 'express';
import locationController from '../controllers/LocationController';

const locationRouter = Router();

locationRouter.post('/', locationController.add);
locationRouter.get('/:locationId', locationController.getLocation);
locationRouter.delete('/:location', locationController.delete);
locationRouter.put('/:location', locationController.edit);

export default Router().use('/', locationRouter);
