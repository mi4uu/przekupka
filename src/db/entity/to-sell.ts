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
export class ToSell extends BaseEntity {
  @primaryGeneratedColumn()
  id!: number

  @index()
  @manyToOne((type) => Pair, (pair) => pair.toSell)
  pair!: Pair

  @column({default: false})
  filled!: boolean

  @column({type: 'decimal', precision: 16, scale: 8, default: 0})
  vol!: string

  @column({type: 'decimal', precision: 16, scale: 8, default: 0})
  price!: string

  @column({type: 'decimal', precision: 16, scale: 8, default: 0})
  left!: string
}
