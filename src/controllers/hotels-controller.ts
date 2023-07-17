import { Response } from 'express';
import httpStatus from 'http-status';
import hotelServices from '@/services/hotels-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelServices.getHotels(Number(userId));
    res.send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === 'PaymentRequired') {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const hotelId = req.params.hotelId;
  const { userId } = req;
  try {
    if (isNaN(Number(hotelId))) return res.sendStatus(httpStatus.BAD_REQUEST);
    const hotel = await hotelServices.getHotelById(Number(userId), Number(hotelId));
    res.send(hotel);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === 'PaymentRequired') {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
