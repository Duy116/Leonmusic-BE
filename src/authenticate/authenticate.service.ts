import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { throwError } from 'src/common/utils/http'
import { comparePassword, hashPassword } from 'src/common/utils/hash-pass'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { ResetPassDto } from './dto/reset-pass.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { USER_ROLE } from 'src/common/type'

@Injectable()
export class AuthenticateService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto) {
    const validateUsername = await this.userRepo.findOne({
      where: {
        username: data.username || '',
      },
    })

    if (validateUsername) {
      return throwError('Username have exist in system')
    }

    const passwordHash = await hashPassword(data.password)

    data.password = passwordHash

    return this.userRepo.save({
      ...data,
      isPaid: false,
      rankFingerStyle: 0,
      rankSinging: 0,
      rankSolo: 0,
      status: 'ACTIVE',
    })
  }

  async resetPass(data: ResetPassDto) {
    const validateUser = await this.userRepo.findOne({
      where: {
        id: data.id || '',
      },
    })

    if (!validateUser) {
      return throwError('Not found user in system')
    }

    const passwordHash = await hashPassword(data.password)
    validateUser.password = passwordHash
    return this.userRepo.update(validateUser.id, validateUser)
  }

  async updateUser(data: UpdateUserDto) {
    const validateUser = await this.userRepo.findOne({
      where: {
        id: data.id || '',
      },
    })

    if (!validateUser) {
      return throwError('Not found user in system')
    }

    return this.userRepo.update(validateUser.id, data)
  }

  async getAllUser(type: USER_ROLE) {
    return this.userRepo.find({
      where: {
        role: type,
      },
    })
  }

  async login(data: LoginDto) {
    const validateUsername = await this.userRepo.findOne({
      where: {
        username: data.username || '',
      },
    })

    if (!validateUsername) {
      return throwError('Not found username in system')
    }

    const validatePassword = await comparePassword(
      data.password,
      validateUsername.password,
    )
    
    if (!validatePassword) {
      return throwError('Password wrong')
    }

    delete validateUsername.password

    const accessToken = this.jwtService.sign({validateUsername}, {
      expiresIn: process.env.JWT_EXP,
      secret: process.env.JWT_SECRET_KEY,
    })

    return {
      accessToken: accessToken,
      user: validateUsername,
    }
  }

  async me(payload: User) {
    return this.userRepo.findOne({
      where: {
        id: payload.id,
      },
    })
  }
}
