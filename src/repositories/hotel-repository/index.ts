import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

async function getHotels(): Promise<Hotel[] | null> {
  return prisma.hotel.findMany();
}

async function getHotelById(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelRepository = {
  getHotels,
  getHotelById,
};

export default hotelRepository;
