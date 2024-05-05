import { Injectable } from '@nestjs/common'
import { CreateCheckOutDto } from './dto/create-check-out.dto'
import { throwError } from 'src/common/utils/http'
import { User } from 'src/authenticate/entities/user.entity'
import { UpdateCheckOutDto } from './dto/update-check-out.dto'
import { getDateKey } from 'src/common/utils'
import { sendMail } from 'src/common/utils/nodemail'
import { InjectRepository } from '@nestjs/typeorm'
import { Checkout } from './entities/checkout.entity'
import { Between, DataSource, Repository } from 'typeorm'
import { Absent } from 'src/absent/entities/absent.entity'
import { CHECKOUT_TYPE, USER_ROLE } from 'src/common/type'
import { Bonus } from 'src/bonus/entities/bonus.entity'

export const LIMIT_MAKEUP_TIME = 10

@Injectable()
export class CheckoutService {
  constructor(    
    @InjectRepository(Absent)
    private readonly absentRepo: Repository<Absent>,

    @InjectRepository(Checkout)
    private readonly checkoutRepo: Repository<Checkout>,

    @InjectRepository(Bonus)
    private readonly bonusRepo: Repository<Bonus>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    
    private dataSource : DataSource
  ) {}

  async create(data: CreateCheckOutDto, user: User) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const validateUserCreate = await this.userRepo.findOne({
        where: {
          id: user.id || '',
        },
      })

      if (!validateUserCreate) {
        return throwError('Cant find user create checkout ')
      }

      if (
        validateUserCreate.role !== USER_ROLE.ADMIN &&
        validateUserCreate.role !== USER_ROLE.TEACHER
      ) {
        return throwError(
          'Account have not ADMIN or TEACHER cant create checkout',
        )
      }

      const validateUserCheckout = await this.userRepo.findOne({
        relations: {
          userAbsentLog: true,
        },
        where: {
          id: data.userCheckoutId || '',
        },
      })

      if (!validateUserCheckout) {
        return throwError('Cant find user checkout ')
      }

      if (validateUserCheckout.role != USER_ROLE.STUDENT) {
        return throwError('Cant checkout for user have not student')
      }

      const timeCheckout = data.timeCheckout
        ? new Date(data.timeCheckout)
        : new Date()

      if (data.isMakeupTime && validateUserCreate.role === 'TEACHER') {
        //Handle check condition student can create makeup time
        let check = false

        for (const absent of validateUserCheckout.userAbsentLog) {
          const absentDate = new Date(absent.date)
          const rangeTime =
            (timeCheckout.getTime() - absentDate.getTime()) /
            (1000 * 60 * 60 * 24)
          if (rangeTime < 10 && !absent.makedUp) {
            await this.absentRepo.update(absent.id, { ...absent, makedUp: true })
            check = true
            break
          }
        }

        if (!check) {
          return throwError(
            'Student have not absent log valid to create check out makeup time',
          )
        }
      }

      const minutes = timeCheckout.getMinutes()
      let type: CHECKOUT_TYPE

      if (minutes > 30) {
        type = CHECKOUT_TYPE.LATE
      } else {
        type = CHECKOUT_TYPE.NORMAL
      }

      let count = await this.checkoutRepo.count({
        where: {
          userCheckoutId: data.userCheckoutId,
        },
      })

      count += 1

      if (count != 0 && count % 8 == 0) {
        //Send notification

        const userCheckout = await this.userRepo.findOne({
          where: {
            id: data.userCheckoutId,
          },
        })

        const content = `Học viên ${userCheckout.name} vừa học xong buổi thứ 8 của tháng, vui lòng kiểm tra và cập nhật lại tình trạng thanh toán học phí ở trang quản trị cho học sinh.`

        sendMail({
          from: 'noreply@gmail.com',
          to: process.env.MAIL_ADMIN,
          subject: 'Thông báo học viên hoàn thành buổi học thứ 8',
          text: content,
        })
      }

      const result = await this.checkoutRepo.save({
        ...data,
        userId: user.id,
        userCheckoutId: data.userCheckoutId,
        timeCheckout: timeCheckout,
        type: type,
      })

      await queryRunner.commitTransaction()

      return result
    }
    catch (err) {
      await queryRunner.rollbackTransaction()
    }
    finally {
      await queryRunner.release()
    }
  }

  async update(data: UpdateCheckOutDto, user: User) {
    if (user.role !== USER_ROLE.ADMIN) {
      return throwError('Just account ADMIN can edit checkout')
    }

    return this.checkoutRepo.update(data.id, data)
  }

  async getAll() {
    return this.checkoutRepo.find({
      where: {},
      relations: {
        user: true,
        userCheckout: true,
      },
      select: {
        user: {
          id: true,
          name: true,
        },
        userCheckout: {
          id: true,
          name: true,
        }
      }
    })
  }

  async delete(id: string, user: User) {
    const validateUser = await this.userRepo.findOne({
      where: {
        id: user.id || '',
      },
    })

    if (!validateUser) {
      return throwError('Cant find user do action')
    }

    if (validateUser.role != 'ADMIN') {
      return throwError('Normal user cant delete checkout')
    }

    return this.checkoutRepo.delete(id)
  }

  async calculateSalary(id: string, fromDate: string, toDate: string) {
    const validateUser = await this.userRepo.findOne({
      where: {
        id: id || '',
      },
    })

    if (!validateUser) {
      return throwError('Cant find user do action')
    }

    const from = new Date(fromDate)
    const to = new Date(toDate)

    const checkout = await this.checkoutRepo.find({
      where: {
        userId: id,
        timeCheckout: Between(from, to)
      },
      relations: {
        user: true,
        userCheckout: true,
      },
      select: {
        user: {
          id: true,
          name: true,
        },
        userCheckout: {
          id: true,
          name: true,
        }
      }
    })

    const adjustment = await this.bonusRepo.find({
      where: {
        userCurrentId: id,
        date: Between(from, to),
      },
      relations: {
        user: true,
        userCurrent: true,
      },
      select: {
        user: {
          name: true,
          id: true,
        },
        userCurrent: {
          name: true,
          id: true,
        }
      }
    })

    const group = {}

    for (const c of checkout) {
      const key = getDateKey(c.timeCheckout)

      if (group[key]) {
        group[key].push(c)
      } else {
        group[key] = [c]
      }
    }

    let totalSalary = 0

    for (const key of Object.keys(group)) {
      if (group[key].length == 1) {
        totalSalary += validateUser.moneyPerHoursOneToOne
      } else if (group[key].length > 1) {
        totalSalary += validateUser.moneyPerHoursOneToMany
      }
    }

    for (const a of adjustment) {
      totalSalary += a.amount
    }

    return {
      totalSalary: totalSalary,
      checkoutHistory: group,
      adjustment: adjustment,
    }
  }
}
