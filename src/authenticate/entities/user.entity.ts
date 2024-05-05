import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { Absent } from 'src/absent/entities/absent.entity';
import { Bonus } from 'src/bonus/entities/bonus.entity';
import { Checkout } from 'src/checkout/entities/checkout.entity';
import { USER_ROLE } from 'src/common/type';
import { RequrestUpRank } from 'src/requrest-up-rank/entities/requrest-up-rank.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty()
  @IsUUID()
  id: string

  @Column()
  @ApiProperty()
  @IsString()
  username: string
  
  @Column()
  @ApiProperty()
  @IsString()
  password: string

  @Column()
  @ApiProperty()
  @IsString()
  name: string

  @Column()
  @ApiProperty({ enum: USER_ROLE })
  @IsEnum(USER_ROLE)
  role: USER_ROLE

  @Column()
  @ApiProperty()
  @IsOptional()
  born?: number

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  @IsString()
  joinDate: Date

  @Column()
  @ApiProperty()
  @IsBoolean()
  isPaid: boolean

  @Column()
  @ApiProperty()
  @IsOptional()
  phoneNumber: string

  @Column({ nullable: true })
  @ApiProperty()
  @IsOptional()
  lessonName: string

  @Column()
  @ApiProperty()
  @IsOptional()
  status: string

  @Column({ default: 0 })
  @ApiProperty()
  @IsNumber()
  moneyPerHoursOneToOne: number

  @Column({ default: 0 })
  @ApiProperty()
  @IsNumber()
  moneyPerHoursOneToMany: number

  @Column()
  @ApiProperty()
  @IsNumber()
  rankSinging: number

  @Column()
  @ApiProperty()
  @IsNumber()
  rankSolo: number

  @Column()
  @ApiProperty()
  @IsNumber()
  rankFingerStyle: number

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  @IsString()
  dateUpdateRankSinging: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  @IsString()
  dateUpdateRankSolo: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  @IsString()
  dateUpdateRankFingerStyle: Date

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsString()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @IsString()
  updatedAt: Date;

  @OneToMany(() => Checkout, (checkout) => checkout.user)
  userCreateCheckout: Checkout[]

  @OneToMany(() => Checkout, (checkout) => checkout.userCheckout)
  userCheckout: Checkout[]

  @OneToMany(() => Absent, (absent) => absent.user)
  userCreateAbsent: Absent[]

  @OneToMany(() => Absent, (absent) => absent.userCurrent)
  userAbsentLog: Absent[]

  @OneToMany(() => Bonus, (absent) => absent.user)
  userCreateBonus: Bonus[]

  @OneToMany(() => Bonus, (absent) => absent.userCurrent)
  userBonus: Bonus[]

  @OneToMany(() => RequrestUpRank, (requestUpRank) => requestUpRank.user)
  requestUpRank: RequrestUpRank[]

  @OneToMany(() => RequrestUpRank, (requestUpRank) => requestUpRank.userCurrent)
  currentUpRank: RequrestUpRank[]

  @OneToMany(() => RequrestUpRank, (requestUpRank) => requestUpRank.userAction)
  userAction: RequrestUpRank[]
}
