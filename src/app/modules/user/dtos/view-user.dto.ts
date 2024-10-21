import { IUser } from "../interfaces/user.interface";

export class ViewUserDto {
  formatDataSet(data: IUser) {
    return {
      id: data.id,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      nic: data.nic || null,
      gender: data.gender || null,
      email: data.email || null,
      address: data.address || null,
      status: data.status,
      roles: data.roles || [],
      userName: data.userName || null,
      showroomI:data.showroomId || null,
      showroom:data.showroom || null
    };
  }
}