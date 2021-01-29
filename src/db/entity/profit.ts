import {
  Entity as entity,
  PrimaryGeneratedColumn as primaryGeneratedColumn,
  Column as column,
  BaseEntity,
  Index as index,
  ManyToOne as manyToOne,
} from 'typeorm'
import {Pair} from './pair'

@entity()
export class Profit extends BaseEntity {
  @primaryGeneratedColumn()
  id!: number

  @column()
  timestamp: number

  @index()
  @manyToOne(() => Pair, (pair) => pair.profits)
  pair!: Promise<Pair>

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  profit!: string

  @column({type: 'decimal', precision: 10, scale: 2, default: 0})
  diff!: string
}
