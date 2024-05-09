import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common'
import { BonusService } from './bonus.service'
import { CreateBonusDto } from './dto/create-bonus.dto'
import { FieldMapRequest } from 'src/common/decorators/mapRequest.decorator'
import { User } from 'src/authenticate/entities/user.entity'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/common/guard/jwt.guard'
import { Bonus } from './entities/bonus.entity'
import { UpdateBonusDto } from './dto/update-bonus.dto'
import { UserEntity } from 'src/common/decorators/user.decorator'

@Controller('bonus')
@ApiTags('bonus')
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @ApiOkResponse({ type: () => Bonus })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createBonusDto: CreateBonusDto,
    @UserEntity() user: User,
  ) {
    return this.bonusService.create(createBonusDto, user)
  }

  @ApiOkResponse({ type: () => Bonus, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.bonusService.getAll()
  }

  @ApiOkResponse({ type: () => Bonus })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  update(
    @Body() updateBonusDto: UpdateBonusDto,
    @UserEntity() user: User,
  ) {
    return this.bonusService.update(updateBonusDto, user)
  }

  @ApiOkResponse({ type: () => Bonus })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id') id: string, 
    @UserEntity() user: User,
  ) {
    return this.bonusService.delete(id, user)
  }
}
