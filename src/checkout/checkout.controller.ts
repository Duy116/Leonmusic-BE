import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Delete,
  Get,
  Put,
  Query,
} from '@nestjs/common'
import { CheckoutService } from './checkout.service'
import { CreateCheckOutDto } from './dto/create-check-out.dto'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Checkout } from './entities/checkout.entity'
import { JwtAuthGuard } from 'src/common/guard/jwt.guard'
import { FieldMapRequest } from 'src/common/decorators/mapRequest.decorator'
import { User } from 'src/authenticate/entities/user.entity'
import { UpdateCheckOutDto } from './dto/update-check-out.dto'

@Controller('checkout')
@ApiTags('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @ApiOkResponse({ type: () => Checkout })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @FieldMapRequest('currentUser') user: User,
    @Body() data: CreateCheckOutDto,
  ) {
    return this.checkoutService.create(data, user)
  }

  @ApiOkResponse({ type: () => Checkout })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  update(
    @FieldMapRequest('currentUser') user: User,
    @Body() data: UpdateCheckOutDto,
  ) {
    return this.checkoutService.update(data, user)
  }

  @ApiOkResponse({ type: () => Checkout, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.checkoutService.getAll()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/calculate-salary/:id')
  calculateSalary(
    @Param('id') id: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ) {
    return this.checkoutService.calculateSalary(id, fromDate, toDate)
  }

  @ApiOkResponse({ type: () => Checkout })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@FieldMapRequest('currentUser') user: User, @Param('id') id: string) {
    return this.checkoutService.delete(id, user)
  }
}
