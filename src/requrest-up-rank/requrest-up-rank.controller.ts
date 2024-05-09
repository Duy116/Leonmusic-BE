import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common'
import { RequrestUpRankService } from './requrest-up-rank.service'
import { CreateRequrestUpRankDto } from './dto/create-requrest-up-rank.dto'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { RequrestUpRank } from './entities/requrest-up-rank.entity'
import { JwtAuthGuard } from 'src/common/guard/jwt.guard'
import { FieldMapRequest } from 'src/common/decorators/mapRequest.decorator'
import { User } from 'src/authenticate/entities/user.entity'
import { ActionRequrestDto } from './dto/action-request.dto'
import { UserEntity } from 'src/common/decorators/user.decorator'

@Controller('requrest-up-rank')
@ApiTags('request-up-rank')
export class RequrestUpRankController {
  constructor(private readonly requrestUpRankService: RequrestUpRankService) {}

  @ApiOkResponse({ type: () => RequrestUpRank })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() data: CreateRequrestUpRankDto,
    @UserEntity() user: User,
  ) {
    return this.requrestUpRankService.create(data, user)
  }

  @ApiOkResponse({ type: () => RequrestUpRank })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllRequestWaitList() {
    return this.requrestUpRankService.getAllRequestWaitList()
  }

  @ApiOkResponse({ type: () => RequrestUpRank })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/action')
  action(
    @Body() data: ActionRequrestDto,
    @UserEntity() user: User,
  ) {
    return this.requrestUpRankService.action(data, user)
  }

  @Get('/rank-solo')
  getRankSolo() {
    return this.requrestUpRankService.getRanksSolo()
  }

  @Get('/rank-singing')
  getRankSinging() {
    return this.requrestUpRankService.getRanksSinging()
  }

  @Get('/rank-fingerstyle')
  getRankFingerStyle() {
    return this.requrestUpRankService.getRanksFingerStyle()
  }
}
