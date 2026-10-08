import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) { }

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const telExist = await this.userRepository.findOne({
        where: {
          tel: dto.tel,
        },
      });

      if (telExist) {
        throw new ConflictException('ເບີໂທລະສັບນີ້ຖືກໃຊ້ແລ້ວ');
      }
      if (dto.email) {
        const emailExist = await this.userRepository.findOne({
          where: {
            email: dto.email,
          },
        });

        if (emailExist) {
          throw new ConflictException('ອີເມວນີ້ຖືກນຳໃຊ້ແລ້ວ');
        }
      }
      const passwordHash = await bcrypt.hash(dto.password, 10);
      const rawData = {
        ...dto,
        password: passwordHash,
      };
      const cleanUser = Object.fromEntries(
        Object.entries(rawData).filter(
          ([_, value]) => value !== undefined && value !== null && value !== '',
        ),
      );
      const savedUser = await this.userRepository.save(cleanUser as any);
      return savedUser;

    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error(error);
      throw new InternalServerErrorException('Server error');
    }
  }

  async login(dto: UserLoginDto): Promise<{ token: string; user: User, role: string }> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          tel: dto.tel,
        },
      });

      if (!user) {
        throw new UnauthorizedException('ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານຜິດ');
      }

      const matched = await bcrypt.compare(dto.password, user.password);
      if (!matched) {
        throw new UnauthorizedException('ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານຜິດ');
      }
      const jwt = new JwtService({
        secret: process.env.JWT_SECRET || 'default_jwt_secret',
        signOptions: { expiresIn: process.env.JWT_EXPIRATION || '1h' },
      } as any);

      const payload = {
        sub: user._id?.toString ? user._id.toString() : user._id,
        role: user.role,
      };

      const token = jwt.sign(payload as any);

      return { token, user: user, role: user.role };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      console.error(error);
      throw new InternalServerErrorException('Server error');
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException("Server error");
    }
  }

  async findAllProductBrand(): Promise<Partial<User[]>> {
    try {
      return this.userRepository.find({
        where: {
          role: "SHOP_OWNER",
          isActive: true
        },
        select: {
          brandName: true,
          logo: true,
          laoName: true,
          laoLastname: true,
          brandType: true,
        }
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Server error");
    }
  }

  async findAllShopOwner(): Promise<User[]> {
    try {
      return this.userRepository.find({
        where: { role: "SHOP_OWNER" }
      })
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Server error");
    }
  }

  async updateOwnerStatus(id: string): Promise<User> {
    try {
      const _id = new ObjectId(id)
      const owner = await this.userRepository.findOneBy({_id});
      if(!owner) throw new NotFoundException("ບໍ່ພົບຂໍ້ມູນທີ່ຕ້ອງການອະນຸມັດ")
      owner.isActive = true;
      return await this.userRepository.save(owner);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Server error");
    }
  }
}