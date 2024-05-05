import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNumber, IsObject, IsString, IsUUID } from 'class-validator'
import { User } from 'src/authenticate/entities/user.entity'
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

@Entity()
export class Bonus {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty()
  @IsString()
  id: string

  @Column()
  @ApiProperty()
  @IsString()
  reason: string

  @Column()
  @ApiProperty()
  @IsNumber()
  amount: number

  @Column()
  @ApiProperty()
  @IsDateString()
  date: Date

  @Column()
  @IsUUID()
  @ApiProperty()
  userId: string

  @ManyToOne(() => User, (user) => user.userCreateBonus, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  @ApiProperty({ type: User })
  user: Relation<User>

  @Column()
  @IsUUID()
  @ApiProperty()
  userCurrentId: string

  @ManyToOne(() => User, (user) => user.userBonus, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  @ApiProperty({ type: User })
  userCurrent: Relation<User>

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsString()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @IsString()
  updatedAt: Date;
}
