import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotelById, getHotels } from '@/controllers';

const hotelsRouter = Router();
hotelsRouter.use(authenticateToken);
hotelsRouter.get('/', getHotels);
hotelsRouter.get('/:hotelId', getHotelById);

export { hotelsRouter };
