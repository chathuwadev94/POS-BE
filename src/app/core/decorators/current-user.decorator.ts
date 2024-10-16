import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { ITokenUser } from "../interfaces/token-user";


export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): ITokenUser => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.user) {
            return null;
        }
        const currentUser: ITokenUser = {
            id: request.user.sub.id,
            role: request.user.sub.role
        };
        return currentUser;
    },
);