import moment from 'moment'
import {
  Entity as entity,
  PrimaryGeneratedColumn as primaryGeneratedColumn,
  Column as column,
  BaseEntity,
  Index as index,
  ManyToOne as manyToOne,
  JoinTable as joinTable,
} from 'typeorm'
import {Pair} from './pair'

@entity()
export class ToSell extends BaseEntity {
  @primaryGeneratedColumn()
  id!: number

  @manyToOne(() => Pair, (pair) => pair.toSell)
  pair!: Promise<Pair>

  @column({default: false})
  filled!: boolean

  @column({type: 'decimal', precision: 20, scale: 8, default: 0})
  vol!: string

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  price!: string

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  left!: string

  @column({default: moment().unix()})
  sellUpdate!: number
  @column({default: moment().unix()})
  buyUpdate!: number
}
