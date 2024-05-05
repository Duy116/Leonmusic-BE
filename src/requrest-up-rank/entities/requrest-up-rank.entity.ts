import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator'
import { User } from 'src/authenticate/entities/user.entity'
import { RANK_TYPE } from 'src/common/type'
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

@Entity()
export class RequrestUpRank {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty()
  @IsString()
  id: string

  @Column()
  @ApiProperty({ enum: RANK_TYPE })
  @IsEnum(RANK_TYPE)
  rankType: RANK_TYPE

  @Column()
  @ApiProperty()
  @IsNumber()
  rankValue: number

  @Column()
  @ApiProperty()
  @IsString()
  mediaLink: string

  @Column({ nullable: true })
  @ApiProperty()
  @IsBoolean()
  status: boolean

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

  @Column({ nullable: true })
  @IsUUID()
  @ApiProperty()
  userActionId: string

  @ManyToOne(() => User, (user) => user.userBonus, { cascade: ['remove', 'soft-remove'] })
  @JoinTable()
  @ApiProperty({ type: User })
  userAction: Relation<User>

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @IsString()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @IsString()
  updatedAt: Date;
}
