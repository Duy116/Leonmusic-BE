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
import { AbsentService } from './absent.service'
import { CreateAbsentDto } from './dto/create-absent.dto'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Absent } from './entities/absent.entity'
import { JwtAuthGuard } from 'src/common/guard/jwt.guard'
import { User } from 'src/authenticate/entities/user.entity'
import { UpdateAbsentDto } from './dto/update-absent.dto'
import { UserEntity } from 'src/common/decorators/user.decorator'

@Controller('absent')
@ApiTags('absent')
export class AbsentController {
  constructor(private readonly absentService: AbsentService) {}

  @ApiOkResponse({ type: () => Absent })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createAbsentDto: CreateAbsentDto,
    @UserEntity() user: User,
  ) {
    return this.absentService.create(createAbsentDto, user)
  }

  @ApiOkResponse({ type: () => Absent, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.absentService.getAll()
  }

  @ApiOkResponse({ type: () => Absent })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  update(
    @Body() updateAbsentDto: UpdateAbsentDto,
    @UserEntity() user: User,
  ) {
    return this.absentService.update(updateAbsentDto, user)
  }

  @ApiOkResponse({ type: () => Absent })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id') id: string, 
    @UserEntity() user: User,
  ) {
    return this.absentService.delete(id, user)
  }
}
