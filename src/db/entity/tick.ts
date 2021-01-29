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
export class Tick extends BaseEntity {
  @primaryGeneratedColumn()
  id!: number

  @column()
  timestamp: number

  @index()
  @manyToOne(() => Pair, (pair) => pair.ticks)
  pair!: Promise<Pair>

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  ask!: string

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  closed!: string

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  bid!: string
}
