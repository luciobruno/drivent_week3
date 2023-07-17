import { TicketStatus } from '@prisma/client';
import hotelRepository from '@/repositories/hotel-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getHotels(userId: number) {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentWithAddress) throw notFoundError();
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentWithAddress.id);
  if (!ticket) throw notFoundError();
  const hotels = await hotelRepository.getHotels();
  if (!hotels || hotels.length === 0) throw notFoundError();
  if (
    ticket.status !== TicketStatus.PAID ||
    ticket.TicketType.isRemote !== false ||
    ticket.TicketType.includesHotel !== true
  )
    throw paymentRequiredError();
  return hotels;
}

async function getHotelById(userId: number, hotelId: number) {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentWithAddress) throw notFoundError();
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentWithAddress.id);
  if (!ticket) throw notFoundError();
  const hotel = await hotelRepository.getHotelById(hotelId);
  if (!hotel) throw notFoundError();
  if (
    ticket.status !== TicketStatus.PAID ||
    ticket.TicketType.isRemote !== false ||
    ticket.TicketType.includesHotel !== true
  )
    throw paymentRequiredError();
  return hotel;
}

const hotelServices = {
  getHotels,
  getHotelById,
};

export default hotelServices;
