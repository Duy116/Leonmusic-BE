import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common'
import { AuthenticateService } from './authenticate.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { LoginDto } from './dto/login.dto'
import { LoginSuccess } from './entities/login-success.entity'
import { JwtAuthGuard } from 'src/common/guard/jwt.guard'
import { ResetPassDto } from './dto/reset-pass.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FieldMapRequest } from 'src/common/decorators/mapRequest.decorator'
import { USER_ROLE } from 'src/common/type'

@Controller('authenticate')
@ApiTags('authenticate')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @ApiOkResponse({ type: User })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/signup')
  create(@Body() data: CreateUserDto) {
    return this.authenticateService.create(data)
  }

  @ApiOkResponse({ type: () => LoginSuccess })
  @Post('/signin')
  login(@Body() data: LoginDto) {
    return this.authenticateService.login(data)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: () => User, isArray: true })
  @Get('/user')
  getAllUser(@Query('type') type: USER_ROLE) {
    return this.authenticateService.getAllUser(type)
  }

  @ApiOkResponse({ type: () => User })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/reset-password')
  resetPassword(@Body() data: ResetPassDto) {
    return this.authenticateService.resetPass(data)
  }

  @ApiOkResponse({ type: () => User })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@FieldMapRequest('currentUser') user: User) {
    return this.authenticateService.me(user)
  }

  @ApiOkResponse({ type: () => User })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/update-profile')
  updateUser(@Body() data: UpdateUserDto) {
    return this.authenticateService.updateUser(data)
  }
}
