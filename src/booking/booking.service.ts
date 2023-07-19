import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BOOKING_STATUS, Booking, BookingDocument } from './booking.schema';
import { Model } from 'mongoose';
import { CreateBookingDTO } from './createBooking.dto';
import { ApartmentService } from 'src/apartment/apartment.service';
import { UserService } from 'src/user/user.service';
import { ImageService } from 'src/image/image.service';
import { ROLES } from 'src/user/user.schema';

const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({
  apiKey: '68a928de',
  apiSecret: 'QQQV9tkuYODvywY8',
});

async function sendSMS(to: string, from: string = 'Vonage APIs', text: string) {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log('Message sent successfully');
      console.log(resp);
    })
    .catch((err) => {
      console.log('There was an error sending the messages.');
      console.error(err);
    });
}

function getDatesBetween(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function getNights(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private apartmentService: ApartmentService,
    private userService: UserService,
    private imageService: ImageService,
  ) {}

  async create(
    files: Array<Express.Multer.File>,
    createBookingDto: any,
  ): Promise<BookingDocument> {
    const admin = await this.userService.findOne({ role: ROLES.ADMIN });
    const ap = await this.apartmentService.findById(
      createBookingDto._apartment,
    );
    const im = await this.imageService.upload(ap._id.toString(), files);
    if (!ap) {
      throw new BadRequestException('Apartment doesnt exists.');
    }
    const us = await this.userService.findById(createBookingDto._user);

    const booking = new this.bookingModel(createBookingDto);
    booking.paymentProof = im._id.toString();
    booking.apartment = ap;
    booking.user = us;
    booking.leaveDate = new Date(createBookingDto.leaveDate);
    booking.arriveDate = new Date(createBookingDto.arriveDate);

    const totalDays = getNights(booking.arriveDate, booking.leaveDate);

    totalDays.map((item) => {
      for (let i = 0; i < ap.unAvailableDays.length; i++) {
        const element = ap.unAvailableDays[i];
        if (element.getTime() === item.getTime()) {
          throw new BadRequestException('Choose another date');
        }
      }
      ap.unAvailableDays.push(item);
    });
    ap.save();

    const timeDiff = Math.abs(
      booking.leaveDate.getTime() - booking.arriveDate.getTime(),
    );
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    booking.totalCost = diffDays * booking.apartment.pricePerNight;
    booking.status = BOOKING_STATUS.PENDING;
    sendSMS(
      us.phoneNumber.toString(),
      'Vonage APIs',
      `Se ha creado su reservacion exitosamente! \nEl encargado revisara su comprobante de pago y verificacion. \nUna vez verificada su reservacion le llegara un nuevo mensaje de texto con la clave de la caja de llaves del departamento. \n`,
    );
    sendSMS(
      admin.phoneNumber.toString(),
      'Vonage APIs',
      'Tiene una nueva reservacion!, Ingrese a la plataforma para verificar el comprobante de pago y permitir el acceso al cliente.',
    );
    return booking.save();
  }
  async find(params: {}): Promise<BookingDocument[]> {
    return await this.bookingModel.find(params);
  }
  async findById(id: string): Promise<BookingDocument> {
    return await this.bookingModel.findById(id);
  }
  async update(
    id: string,
    createBookingDto: CreateBookingDTO,
  ): Promise<BookingDocument> {
    let filter: any = createBookingDto;
    if (createBookingDto.arriveDate && createBookingDto.leaveDate) {
      filter = {
        arriveDate: new Date(createBookingDto.arriveDate),
        leaveDate: new Date(createBookingDto.leaveDate),
      };
    } else if (createBookingDto.arriveDate) {
      filter = {
        arriveDate: new Date(createBookingDto.arriveDate),
      };
    } else if (createBookingDto.leaveDate) {
      filter = {
        leaveDate: new Date(createBookingDto.leaveDate),
      };
    }
    return await this.bookingModel.findByIdAndUpdate(id, filter);
  }
  async delete(id: string): Promise<any> {
    return await this.bookingModel.deleteOne({ _id: id });
  }

  async review(
    id: string,
    adminId: string,
    updatedStatus: BOOKING_STATUS,
  ): Promise<BookingDocument> {
    const booking = await this.findById(id);
    booking.status = updatedStatus;
    const admn = await this.userService.findById(adminId);
    booking.adminReviewed = admn.name;
    if (updatedStatus == BOOKING_STATUS.DENIED) {
      const totalDays = getDatesBetween(booking.arriveDate, booking.leaveDate);
      const ap = await this.apartmentService.findById(
        booking._apartment.toString(),
      );
      totalDays.map((item) => {
        for (let i = 0; i < ap.unAvailableDays.length; i++) {
          const element = ap.unAvailableDays[i];
          if (item.getTime() === element.getTime()) {
            ap.unAvailableDays.splice(i, 1);
          }
        }
      });
      ap.save();
    }
    if (updatedStatus == BOOKING_STATUS.ACCEPTED) {
      const us = await this.userService.findById(booking._user.toString());
      const ap = await this.apartmentService.findById(
        booking._apartment.toString(),
      );
      let location = '';
      switch (ap.location) {
        case 'MazatlanA':
          location =
            'https://goo.gl/maps/RPTWzFPets1jGm4N6?coh=178573&entry=tt';
          break;
        case 'MazatlanB':
          location = 'https://goo.gl/maps/8wWh3mET5v2VrFQs8';
          break;
        case 'LosCabosA':
          location =
            'https://goo.gl/maps/oQe5o7gwyLU4ySgQA?coh=178573&entry=tt';
          break;
        case 'LosCabosB':
          location = 'https://goo.gl/maps/dVRk9dpJzn3C8uXP9';
          break;
      }
      let visualReference = '';
      switch (ap.location) {
        case 'MazatlanA':
          visualReference =
            'Torre BNI Condos, porton negro, tiene al lado izquierdo una tienda Kiosko';
          break;
        case 'MazatlanB':
          visualReference =
            'Departamentos De La Ostra, contra esquina de Iglesia';
          break;
        case 'LosCabosA':
          visualReference = 'Edificio gris con negro';
          break;
        case 'LosCabosB':
          visualReference = 'Edificio Blanco';
          break;
      }
      let apartmentEntry = '';
      switch (ap.location) {
        case 'MazatlanA':
          apartmentEntry =
            'Espera a que el guardia te abra el porton, dirigete al elevador y digita el ultimo piso antes de la terraza, veras el departamento a mano izquierda. Ahora solo digita tu clave secreta en la caja de llaves, ingresa al departamento y cierra la caja de llaves despues de utilizarla, recuerda remover el codigo secreto una vez puesto.';
          break;
        case 'MazatlanB':
          apartmentEntry =
            'Sube las escaleras hasta el ultimo piso, veras el departamento a mano izquierda. Ahora solo digita tu clave secreta en la caja de llaves, ingresa al departamento y cierra la caja de llaves despues de utilizarla, recuerda remover el codigo secreto una vez puesto.';
          break;
        case 'LosCabosA':
          apartmentEntry = '[ Pendiente ]';
          break;
        case 'LosCabosB':
          apartmentEntry = '[ Pendiente ]';
          break;
      }
      sendSMS(
        us.phoneNumber.toString(),
        'Vonage APIs',
        `Hola ${us.name}, Gracias por reservar ${ap.title}! \n
        Se ha confirmado el pago de su reservación exitosamente! \n
        Recuerda que el Check-in es a las 3:00pm y el Check-out a las 12:00pm. \n
        Clave de la caja de llaves: ${ap.keyBoxPassword} \n
        Link de Google Maps: ${location} \n
        Referencia visual: ${visualReference} \n
        Entrada al departamento: ${apartmentEntry} \n
        INFORMACION IMPORTANTE \n
        Siempre traer contigo las llaves ya que el departamento no se puede abrir sin llave o puedes resguardarlas en el lockbox para evitar que se extravien. \n
        LOS DATOS QUE SE PROPORCIONAN SON PRIVADOS \n
        En caso de cualquier situacion favor de comunicarse al 6681333889 \n
        \n
        Bienvenidos!!\n`,
      );
    }
    return booking.save();
  }
}
