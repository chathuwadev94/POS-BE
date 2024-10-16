import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUser } from '../interfaces/user.interface';
import { ILocation } from '../../location/interfaces/location.interface';
import { UserService } from '../services/user.service';

describe('UserController', () => {
  let controller: UserController;

  const userDto: CreateUserDto = {
    firstName: 'testUserFirstName',
    lastName: 'testUserLastName',
    gender: 'M',
    nic: '51ab2530',
    address: 'colombo',
    userName: "test01",
    password: '1234',
    email: 'test@gmail',
  }

  const user: IUser = {
    firstName: 'testUserFirstName',
    lastName: 'testUserLastName',
    gender: 'M',
    nic: '51ab2530',
    address: 'colombo',
    userName: "test01",
    password: '1234',
    email: 'test@gmail',
    status: 1,
    locations: [],
  };

  const userId: number = 1;
  const location: ILocation = {
    title: 'testLocation',
    address: 'colombo',
    status: 'active'
  }
 let userService = {
    create: jest.fn((userDto) => {
      return {
        id: 1,
        ...user,
      };
    }),

    findUserWithLocationById: jest.fn((userId) => {
      return {
        id: userId,
        location: location,
        ...user,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService.name,
          useValue: userService,
        },
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should have create function', () => {
    expect(controller.create).toBeDefined();
  });

  it('should have user create function', () => {
    return controller.create(userDto).then((user) => {
      expect(user).toEqual({
        id: 1,
        ...user,
      });
    });
  });

  it('should have get user details with location function', () => {
    expect(controller.getUserById).toBeDefined();
  });

  it('should have user create function', () => {
    return controller.getUserById(userId).then((user) => {
      expect(user).toEqual({
        id: userId,
        location: location,
        ...user,
      });
    });
  });

});
