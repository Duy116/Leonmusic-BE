import { Injectable } from '@nestjs/common'
import { CreateAbsentDto } from './dto/create-absent.dto'
import { UpdateAbsentDto } from './dto/update-absent.dto'
import { User } from 'src/authenticate/entities/user.entity'
import { throwError } from 'src/common/utils/http'
import { InjectRepository } from '@nestjs/typeorm'
import { Absent } from './entities/absent.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AbsentService {
  constructor(    
    @InjectRepository(Absent)
    private readonly absentRepo: Repository<Absent>
  ) {}

  getAll() {
    return this.absentRepo.find({
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

  create(createAbsentDto: CreateAbsentDto, payload: User) {
    return this.absentRepo.save({
      date: createAbsentDto.date,
      makedUp: createAbsentDto.makedUp,
      reason: createAbsentDto.reason,
      userCurrentId: createAbsentDto.userCurrentId,
      userId: payload.id,
    })
  }
 
  update(updateAbsentDto: UpdateAbsentDto, payload: User) {
    if (payload.role != 'ADMIN') {
      return throwError('Just ADMIN can edit absent log')
    }

    return this.absentRepo.update(updateAbsentDto.id,{
      ...updateAbsentDto,
    })
  }

  delete(id: string, payload: User) {
    if (payload.role != 'ADMIN') {
      return throwError('Just ADMIN can edit absent log')
    }

    return this.absentRepo.delete(id)
  }
}
