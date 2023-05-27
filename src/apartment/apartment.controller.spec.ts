import { Test } from '@nestjs/testing';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDTO } from './createApartment.dto';
import { ApartmentDocument } from './apartment.schema';
import { Types } from 'mongoose';

describe('ApartmentController', () => {
  let apartmentController: ApartmentController;
  let apartmentService: ApartmentService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ApartmentController],
      providers: [ApartmentService],
    }).compile();

    apartmentController =
      moduleRef.get<ApartmentController>(ApartmentController);
    apartmentService = moduleRef.get<ApartmentService>(ApartmentService);
  });

  describe('create', () => {
    it('should create an apartment', async () => {
      const createApartmentDto: CreateApartmentDTO = {
        // Provide the necessary data for creating an apartment
        title: 'Depa en Los Cabos',
        description: 'Lujoso departamento en los cabos baja california',
        highlights: ['terraza', 'alberca'],
        about: 'exelente ubicacion, el lugar mas comodo para toda tu familia',
        keyBoxPassword: '55555',
        location: 'Los Cabos',
        amenities: ['cocina integral', '2 camas', 'estacionamiento privado'],
        map: { latitude: 25.806032, longitude: -109.029 },
        pricePerNight: 2500,
        rules: ['check-in 12:00pm', 'check-out 3:00pm'],
      };

      const createdApartment: ApartmentDocument | any = {
        _id: new Types.ObjectId('646c30bef8fe7016172a8bb9'),
        title: 'Depa en Los Cabos',
        description: 'Lujoso departamento en los cabos baja california',
        photosUrls: [],
        highlights: ['terraza', 'alberca'],
        about: 'exelente ubicacion, el lugar mas comodo para toda tu familia',
        keyBoxPassword: '55555',
        location: 'Los Cabos',
        amenities: ['cocina integral', '2 camas', 'estacionamiento privado'],
        map: {
          latitude: 25.806032,
          longitude: -109.029,
        },
        unAvailableDays: [],
        pricePerNight: 2500,
        rules: ['check-in 12:00pm', 'check-out 3:00pm'],
        __v: 0,
        // _photosUrls: [
        //   '646c33d16cdaef2e84aa6ff1',
        //   '646c33d16cdaef2e84aa6ff2',
        //   '646c33d16cdaef2e84aa6ff3',
        //   '646c33d16cdaef2e84aa6ff4',
        //   '646c33d16cdaef2e84aa6ff5',
        //   '646c33d16cdaef2e84aa6ff6',
        //   '646c33d16cdaef2e84aa6ff7',
        // ],
      }; // Mock the created apartment data

      jest
        .spyOn(apartmentService, 'create')
        .mockResolvedValue(createdApartment);

      const result = await apartmentController.create(createApartmentDto);
      expect(result).toBe(createdApartment);
    });

    it('should throw BadRequestException if an error occurs during creation', async () => {
      const createApartmentDto: CreateApartmentDTO = {
        // Provide the necessary data for creating an apartment
      };

      const error = new Error('Some error');

      jest.spyOn(apartmentService, 'create').mockRejectedValue(error);

      await expect(
        apartmentController.create(createApartmentDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findById', () => {
    it('should find an apartment by ID', async () => {
      const apartmentId = '646c30bef8fe7016172a8bb9'; // Provide the ID of the apartment to find
      const foundApartment: ApartmentDocument | any = {
        _id: new Types.ObjectId('646c30bef8fe7016172a8bb9'),
        title: 'Depa en Los Cabos',
        description: 'Lujoso departamento en los cabos baja california',
        photosUrls: [],
        highlights: ['terraza', 'alberca'],
        about: 'exelente ubicacion, el lugar mas comodo para toda tu familia',
        keyBoxPassword: '55555',
        location: 'Los Cabos',
        amenities: ['cocina integral', '2 camas', 'estacionamiento privado'],
        map: {
          latitude: 25.806032,
          longitude: -109.029,
        },
        unAvailableDays: [],
        pricePerNight: 2500,
        rules: ['check-in 12:00pm', 'check-out 3:00pm'],
        __v: 0,
        // _photosUrls: [
        //   '646c33d16cdaef2e84aa6ff1',
        //   '646c33d16cdaef2e84aa6ff2',
        //   '646c33d16cdaef2e84aa6ff3',
        //   '646c33d16cdaef2e84aa6ff4',
        //   '646c33d16cdaef2e84aa6ff5',
        //   '646c33d16cdaef2e84aa6ff6',
        //   '646c33d16cdaef2e84aa6ff7',
        // ],
      }; // Mock the found apartment data

      jest
        .spyOn(apartmentService, 'findById')
        .mockResolvedValue(foundApartment);

      const result = await apartmentController.findById(apartmentId);
      expect(result).toBe(foundApartment);
    });

    it('should throw BadRequestException if an error occurs during find', async () => {
      const apartmentId = '123'; // Provide the ID of the apartment to find
      const error = new Error('Some error');

      jest.spyOn(apartmentService, 'findById').mockRejectedValue(error);

      await expect(apartmentController.findById(apartmentId)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('find', () => {
    it('should find apartments', async () => {
      const apartments: ApartmentDocument | any = [
        {
          _id: new Types.ObjectId('646c30bef8fe7016172a8bb9'),
          title: 'Depa en Los Cabos',
          description: 'Lujoso departamento en los cabos baja california',
          photosUrls: [],
          highlights: ['terraza', 'alberca'],
          about: 'exelente ubicacion, el lugar mas comodo para toda tu familia',
          keyBoxPassword: '55555',
          location: 'Los Cabos',
          amenities: ['cocina integral', '2 camas', 'estacionamiento privado'],
          map: {
            latitude: 25.806032,
            longitude: -109.029,
          },
          unAvailableDays: [],
          pricePerNight: 2500,
          rules: ['check-in 12:00pm', 'check-out 3:00pm'],
          __v: 0,
          // _photosUrls: [
          //   '646c33d16cdaef2e84aa6ff1',
          //   '646c33d16cdaef2e84aa6ff2',
          //   '646c33d16cdaef2e84aa6ff3',
          //   '646c33d16cdaef2e84aa6ff4',
          //   '646c33d16cdaef2e84aa6ff5',
          //   '646c33d16cdaef2e84aa6ff6',
          //   '646c33d16cdaef2e84aa6ff7',
          // ],
        },
      ]; // Mock the array of apartments

      jest.spyOn(apartmentService, 'find').mockResolvedValue(apartments);

      const result = await apartmentController.find();
      expect(result).toBe(apartments);
    });

    it('should throw BadRequestException if an error occurs during find', async () => {
      const error = new Error('Some error');

      jest.spyOn(apartmentService, 'find').mockRejectedValue(error);

      await expect(apartmentController.find()).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('update', () => {
    it('should update an apartment', async () => {
      const apartmentId = '646c30bef8fe7016172a8bb9'; // Provide the ID of the apartment to update
      const updateApartmentDto: CreateApartmentDTO = {
        title: 'Depa en Los Cabos UPDATED',
      };
      const updatedApartment: ApartmentDocument | any = {
        _id: new Types.ObjectId('646c30bef8fe7016172a8bb9'),
        title: 'Depa en Los Cabos UPDATED',
        description: 'Lujoso departamento en los cabos baja california',
        photosUrls: [],
        highlights: ['terraza', 'alberca'],
        about: 'exelente ubicacion, el lugar mas comodo para toda tu familia',
        keyBoxPassword: '55555',
        location: 'Los Cabos',
        amenities: ['cocina integral', '2 camas', 'estacionamiento privado'],
        map: {
          latitude: 25.806032,
          longitude: -109.029,
        },
        unAvailableDays: [],
        pricePerNight: 2500,
        rules: ['check-in 12:00pm', 'check-out 3:00pm'],
        __v: 0,
        // _photosUrls: [
        //   '646c33d16cdaef2e84aa6ff1',
        //   '646c33d16cdaef2e84aa6ff2',
        //   '646c33d16cdaef2e84aa6ff3',
        //   '646c33d16cdaef2e84aa6ff4',
        //   '646c33d16cdaef2e84aa6ff5',
        //   '646c33d16cdaef2e84aa6ff6',
        //   '646c33d16cdaef2e84aa6ff7',
        // ],
      }; // Mock the updated apartment data

      jest
        .spyOn(apartmentService, 'update')
        .mockResolvedValue(updatedApartment);

      const result = await apartmentController.update(
        apartmentId,
        updateApartmentDto,
      );
      expect(result).toBe(updatedApartment);
    });

    it('should throw BadRequestException if an error occurs during update', async () => {
      const apartmentId = '123'; // Provide the ID of the apartment to update
      const updateApartmentDto: CreateApartmentDTO = {
        // Provide the data for updating the apartment
      };
      const error = new Error('Some error');

      jest.spyOn(apartmentService, 'update').mockRejectedValue(error);

      await expect(
        apartmentController.update(apartmentId, updateApartmentDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should delete an apartment', async () => {
      const apartmentId = '646c30bef8fe7016172a8bb9'; // Provide the ID of the apartment to delete
      const deletedApartment = {
        _id: new Types.ObjectId('646c30bef8fe7016172a8bb9'),
        title: 'Depa en Los Cabos UPDATED',
        description: 'Lujoso departamento en los cabos baja california',
        photosUrls: [],
        highlights: ['terraza', 'alberca'],
        about: 'exelente ubicacion, el lugar mas comodo para toda tu familia',
        keyBoxPassword: '55555',
        location: 'Los Cabos',
        amenities: ['cocina integral', '2 camas', 'estacionamiento privado'],
        map: {
          latitude: 25.806032,
          longitude: -109.029,
        },
        unAvailableDays: [],
        pricePerNight: 2500,
        rules: ['check-in 12:00pm', 'check-out 3:00pm'],
        __v: 0,
        // _photosUrls: [
        //   '646c33d16cdaef2e84aa6ff1',
        //   '646c33d16cdaef2e84aa6ff2',
        //   '646c33d16cdaef2e84aa6ff3',
        //   '646c33d16cdaef2e84aa6ff4',
        //   '646c33d16cdaef2e84aa6ff5',
        //   '646c33d16cdaef2e84aa6ff6',
        //   '646c33d16cdaef2e84aa6ff7',
        // ],
      }; // Mock the deleted apartment data

      jest
        .spyOn(apartmentService, 'delete')
        .mockResolvedValue(deletedApartment);

      const result = await apartmentController.delete(apartmentId);
      expect(result).toBe(deletedApartment);
    });

    it('should throw BadRequestException if an error occurs during delete', async () => {
      const apartmentId = '123'; // Provide the ID of the apartment to delete
      const error = new Error('Some error');

      jest.spyOn(apartmentService, 'delete').mockRejectedValue(error);

      await expect(apartmentController.delete(apartmentId)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
