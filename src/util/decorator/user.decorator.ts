import { createParamDecorator, ExecutionContext } from "@nestjs/common";


// 커스텀 decorator
/**
 * 로그인 유저 decorator
 * @param data : LoginUserDto field
 */
export const LoginUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return data? request.user?.[data] : request.user;
    },
  );