import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import code from 'src/config/code';
import { Auth } from 'src/decorator/auth.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { ApiErrorResponse } from 'src/schema/api_error_response';
import { SendResponse } from 'src/utils/send-response';
import { RegisterUserDTO } from '../user/dto/register.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AddPermissionsRolesDTO } from './dto/add-permission-role.dto';
import { AddPermissionsDTO } from './dto/add-permission.dto';
import { AddRolesDTO } from './dto/add-roles.dto';
import { LoginPostDTO } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}
  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @HttpCode(200)
  @ApiErrorResponse(code.USER_EXISTED)
  @ApiErrorResponse(code.BACKEND)
  async Register(@Body() req: RegisterUserDTO) {
    try {
      const newUser = await this.usersService.registerUser(req);
      if (newUser) {
        const token = await this.authService.signTokenVerify(newUser);
        return SendResponse.success({ msg: 'Done' });
      }
      return SendResponse.error('BACKEND');
    } catch (e) {
      return SendResponse.error(e);
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @HttpCode(200)
  @ApiErrorResponse(code.BACKEND)
  @ApiErrorResponse(code.LOGIN_ERROR)
  @ApiErrorResponse(code.WRONG_PASSWORD)
  @ApiErrorResponse(code.USER_NOT_FOUND)
  @ApiErrorResponse(code.USER_UNACTIVED)
  async login(@Body() body: LoginPostDTO) {
    try {
      const _user = await this.authService.login(body);
      if (!_user) {
        return SendResponse.error('LOGIN_ERROR');
      }
      const token = await this.authService.signTokenVerify(_user);
      return SendResponse.success({ user_email: _user.user_email, token });
    } catch (e) {
      console.log(e);
      return SendResponse.error(e);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add List Roles For One User' })
  @Auth({ roles: ['SUPER_ADMIN'] })
  @Post('user-roles')
  async addRolesForUser(@Body() body: AddRolesDTO) {
    try {
      const result = await this.authService.addRolesForUser(body);
      return SendResponse.success(result);
    } catch (e) {
      return SendResponse.error(e);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add List Permission For One User' })
  @Auth({ roles: ['SUPER_ADMIN'] })
  @Post('user-permissions')
  async addPermissionForUser(@Body() body: AddPermissionsDTO) {
    try {
      const result = await this.authService.addPermissionForUser(body);
      return SendResponse.success(result);
    } catch (e) {
      return SendResponse.error(e);
    }
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add List Permission For One Role' })
  @Auth({ roles: ['SUPER_ADMIN'] })
  @Post('role-permissions')
  async addPermissionForRole(@Body() body: AddPermissionsRolesDTO) {
    try {
      const result = await this.authService.addPermissionForRole(body);
      return SendResponse.success(result);
    } catch (e) {
      return SendResponse.error(e);
    }
  }
}
