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

  @index()
  @column()
  timestamp: number

  @index()
  @manyToOne(() => Pair, async (pair) => pair.ticks)
  pair!: Promise<Pair>

  @column({type: 'decimal', precision: 40, scale: 8, default: 0})
  open!: string

  @column({type: 'decimal', precision: 40, scale: 8, default: 0})
  close!: string

  @column({type: 'decimal', precision: 40, scale: 8, default: 0})
  high!: string

  @column({type: 'decimal', precision: 40, scale: 8, default: 0})
  low!: string
}
