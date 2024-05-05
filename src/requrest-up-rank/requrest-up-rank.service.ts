import { Injectable } from '@nestjs/common'
import { CreateRequrestUpRankDto } from './dto/create-requrest-up-rank.dto'
import { User } from 'src/authenticate/entities/user.entity'
import { ActionRequrestDto } from './dto/action-request.dto'
import { throwError } from 'src/common/utils/http'
import { InjectRepository } from '@nestjs/typeorm'
import { RequrestUpRank } from './entities/requrest-up-rank.entity'
import { Repository } from 'typeorm'
import { USER_ROLE } from 'src/common/type'

@Injectable()
export class RequrestUpRankService {
  constructor(
    @InjectRepository(RequrestUpRank)
    private readonly requestUpRankRepo: Repository<RequrestUpRank>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  getAllRequestWaitList() {
    return this.requestUpRankRepo.find({
      where: {
        status: null,
      },
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

  create(data: CreateRequrestUpRankDto, payload: User) {
    return this.requestUpRankRepo.save({
        userId: payload.id,
        ...data,
    })
  }

  async action(data: ActionRequrestDto, payload: User) {
    const request = await this.requestUpRankRepo.findOne({
      where: {
        id: data.id || '',
      },
    })

    if (payload.role !== 'ADMIN') {
      return throwError('Just ADMIN can solve request')
    }

    if (!request) {
      return throwError('Cant find request up rank')
    }

    if (data.action) {
      const update: any = {}

      switch (request.rankType) {
        case 'SOLO': {
          update.rankSolo = request.rankValue
          update.dateUpdateRankSolo = new Date()
          break
        }

        case 'FINGERSTYLE': {
          update.rankFingerStyle = request.rankValue
          update.dateUpdateRankFingerStyle = new Date()
          break
        }

        case 'SINGING': {
          update.rankSinging = request.rankValue
          update.dateUpdateRankSinging = new Date()
          break
        }
      }

      await this.userRepo.update(request.userCurrentId, {
        ...update,
      })
    }

    return this.requestUpRankRepo.update(data.id, {
      status: data.action,
      userActionId: payload.id,
    })
  }

  async getRanksSinging() {
    return (
      await this.userRepo.find({
        where: {
          role: USER_ROLE.STUDENT,
        },
      })
    ).sort((a, b) => {
      if (a.rankSinging !== b.rankSinging) {
        return b.rankSinging - a.rankSinging // Sort in descending order
      } else {
        // If rankSinging values are equal, compare dateUpdateRankSinging
        return (
          new Date(a.dateUpdateRankSinging).getTime() -
          new Date(b.dateUpdateRankSinging).getTime()
        )
      }
    })
  }

  async getRanksSolo() {
    return (
      await this.userRepo.find({
        where: {
          role: USER_ROLE.STUDENT,
        },
      })
    ).sort((a, b) => {
      if (a.rankSolo !== b.rankSolo) {
        return b.rankSolo - a.rankSolo // Sort in descending order
      } else {
        // If rankSinging values are equal, compare dateUpdateRankSinging
        return (
          new Date(a.dateUpdateRankSolo).getTime() -
          new Date(b.dateUpdateRankSolo).getTime()
        )
      }
    })
  }

  async getRanksFingerStyle() {
    return (
      await this.userRepo.find({
        where: {
          role: USER_ROLE.STUDENT,
        },
      })
    ).sort((a, b) => {
      if (a.rankFingerStyle !== b.rankFingerStyle) {
        return b.rankFingerStyle - a.rankFingerStyle // Sort in descending order
      } else {
        // If rankSinging values are equal, compare dateUpdateRankSinging
        return (
          new Date(a.dateUpdateRankFingerStyle).getTime() -
          new Date(b.dateUpdateRankFingerStyle).getTime()
        )
      }
    })
  }
}
