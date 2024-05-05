import { Injectable } from '@nestjs/common'
import { CreateBonusDto } from './dto/create-bonus.dto'
import { User } from 'src/authenticate/entities/user.entity'
import { UpdateBonusDto } from './dto/update-bonus.dto'
import { throwError } from 'src/common/utils/http'
import { Bonus } from './entities/bonus.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class BonusService {
  constructor(
    @InjectRepository(Bonus)
    private readonly bonusRepo: Repository<Bonus>,
  ) {}

  getAll() {
    return this.bonusRepo.find({
      where: {},
      relations: {
        user: true,
        userCurrent: true,
      },
      select: {
        user: {
          id: true,
          name: true,
        },
        userCurrent: {
          id: true,
          name: true,
        }
      }
    })
  }

  create(createBonusDto: CreateBonusDto, payload: User) {
    if (payload.role != 'ADMIN') {
      return throwError('Just ADMIN can create bonus')
    }

    return this.bonusRepo.save({
      reason: createBonusDto.reason,
      userCurrentId: createBonusDto.userCurrentId,
      amount: createBonusDto.amount,
      date: new Date(),
      userId: payload.id,
    })
  }

  update(updateBonusDto: UpdateBonusDto, payload: User) {
    if (payload.role != 'ADMIN') {
      return throwError('Just ADMIN can edit bonus')
    }

    return this.bonusRepo.update(updateBonusDto.id, {
      ...updateBonusDto,
      userId: payload.id,
    })
  }

  delete(id: string, payload: User) {
    if (payload.role != 'ADMIN') {
      return throwError('Just ADMIN can delete bonus')
    }

    return this.bonusRepo.delete(id)
  }
}
