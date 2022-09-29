import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import code from 'src/config/code';
import { Roles } from 'src/entities/roles';
import { Users } from 'src/entities/user';
import { Permissions } from 'src/entities/permission';
import { Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { AddPermissionsDTO } from './dto/add-permission.dto';
import { AddRolesDTO } from './dto/add-roles.dto';
import { LoginPostDTO } from './dto/login.dto';
import { AddPermissionsRolesDTO } from './dto/add-permission-role.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
    @InjectRepository(Roles)
    private readonly roleRepo: Repository<Roles>,
  ) {}

  validateHash(password: string, hash: string): boolean {
    if (!password || !hash) {
      return false;
    }
    return bcrypt.compareSync(password, hash);
  }
  async login(user: LoginPostDTO): Promise<Users> {
    const fuser = await this.usersService.FindUserByUsername(user.user_email);
    if (!fuser) {
      throw 'USER_NOT_FOUND';
    }
    if (fuser && this.validateHash(user.user_password, fuser.user_password)) {
      return fuser;
    }
    throw 'WRONG_PASSWORD';
  }

  async signTokenVerify(user: Users) {
    return {
      accessToken: await this.jwtService.signAsync({
        id: user.user_id,
      }),
      expiresIn: 300,
      tokenType: 'Bearer',
    };
  }

  async addRolesForUser(body: AddRolesDTO) {
    try {
      const { role, user_id } = body;
      const checkUser = await this.usersService.findUserById(user_id);
      if (!checkUser) {
        throw code.USER_NOT_FOUND.type;
      }
      const listRoles: Roles[] = [];
      for (const item of role) {
        const checkRole = await this.roleService.detailRoles(item.role_id);
        if (!checkRole) {
          throw code.ROLE_NOT_FOUND.type;
        }
        listRoles.push(checkRole);
      }
      checkUser.roles = listRoles;
      await this.userRepo.save(checkUser);
      return checkUser;
    } catch (e) {
      console.log({ e });
      throw e;
    }
  }

  async addPermissionForUser(body: AddPermissionsDTO) {
    try {
      const { permission, user_id } = body;
      const checkUser = await this.usersService.findUserById(user_id);
      if (!checkUser) {
        throw code.USER_NOT_FOUND.type;
      }
      const listPermission: Permissions[] = [];
      for (const item of permission) {
        const checkPermission = await this.permissionService.detailPermissions(
          item.permission_id,
        );
        if (!checkPermission) {
          throw code.PERMISSION_NOT_FOUND.type;
        }
        listPermission.push(checkPermission);
      }
      checkUser.permissions = listPermission;
      await this.userRepo.save(checkUser);
      return checkUser;
    } catch (e) {
      console.log({ e });
      throw e;
    }
  }

  async addPermissionForRole(body: AddPermissionsRolesDTO) {
    try {
      const { permission, role_id } = body;
      const checkRole = await this.roleService.detailRoles(role_id);
      if (!checkRole) {
        throw code.USER_NOT_FOUND.type;
      }
      const listPermission: Permissions[] = [];
      for (const item of permission) {
        const checkPermission = await this.permissionService.detailPermissions(
          item.permission_id,
        );
        if (!checkPermission) {
          throw code.PERMISSION_NOT_FOUND.type;
        }
        listPermission.push(checkPermission);
      }
      checkRole.permissions = listPermission;
      await this.roleRepo.save(checkRole);
      return checkRole;
    } catch (e) {
      console.log({ e });
      throw e;
    }
  }
}
