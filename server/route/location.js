import Router from 'express';
import locationController from '../controllers/LocationController';

const locationRouter = Router();

locationRouter.post('/', locationController.add);
locationRouter.get('/:locationId', locationController.getLocation);
locationRouter.delete('/:locationId', locationController.delete);
locationRouter.put('/:locationId', locationController.edit);

export default Router().use('/', locationRouter);
