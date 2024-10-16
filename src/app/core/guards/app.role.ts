import { RolesBuilder } from 'nest-access-control';
import { UserController } from 'src/app/modules/user/controllers/user.controller';
import { AppRoles } from '../enums/role.enum';
import { AuthController } from 'src/app/modules/auth/controller/auth.controller';

export const roles: RolesBuilder = new RolesBuilder();


roles
    .grant([AppRoles.SUPER_ADMIN])
    .createOwn([UserController.name,])
    .readOwn([UserController.name])
    .updateOwn([UserController.name])

    .grant([AppRoles.ADMIN])
    .createOwn([UserController.name])
    .readOwn([UserController.name])
    .updateOwn([UserController.name])
    .deleteOwn([UserController.name])

    .grant([AppRoles.DEFAULT])
    .readOwn([UserController.name, AuthController.name])
    .createOwn([UserController.name])
    .updateOwn([UserController.name])
    .deleteOwn([UserController.name])

