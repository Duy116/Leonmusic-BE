import { IsString, IsBoolean, IsUUID, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { CHECKOUT_TYPE } from 'src/common/type'
import { User } from 'src/authenticate/entities/user.entity'

export class UserCheckout {
  @IsString()
  @ApiProperty()
  name: string

  @IsUUID()
  @ApiProperty()
  id: string
}

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn("uuid")
  @IsUUID()
  @ApiProperty()
  id: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsString()
  @ApiProperty()
  timeCheckout: Date

  @Column()
  @IsEnum(CHECKOUT_TYPE)
  @ApiProperty({ enum: CHECKOUT_TYPE})
  type: CHECKOUT_TYPE

  @Column()
  @IsBoolean()
  @ApiProperty()
  isMakeupTime: boolean

  @Column()
  @IsUUID()
  @ApiProperty()
  userId: string

  @ManyToOne(() => User, (user) => user.userCreateCheckout, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  @ApiProperty({ type: User })
  user: Relation<User>

  @Column()
  @IsUUID()
  @ApiProperty()
  userCheckoutId: string

  @ManyToOne(() => User, (user) => user.userCheckout, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  @ApiProperty({ type: User })
  userCheckout: Relation<User>

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsString()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @IsString()
  updatedAt: Date;
}
