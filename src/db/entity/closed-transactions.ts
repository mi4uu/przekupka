import {
  Entity as entity,
  PrimaryGeneratedColumn as primaryGeneratedColumn,
  Column as column,
  BaseEntity,
  Index as index,
  ManyToOne as manyToOne,
} from 'typeorm'
import {Pair} from './pair'

export enum TransactionType {
  Buy = 'buy',
  Sell = 'sell',
}

@entity()
export class ClosedTransaction extends BaseEntity {
  @primaryGeneratedColumn()
  id!: number

  @index()
  @manyToOne((type) => Pair, async (pair) => pair.closedTransactions)
  pair!: Promise<Pair>

  @index()
  @column()
  refid!: string

  @index()
  @column()
  userref!: number

  @column()
  status!: string

  @column()
  opentm!: number

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  vol!: string

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  fee!: string

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  price!: string

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  profit!: string

  @column({default: '0'})
  diff!: string

  @column({default: ''})
  strategy: string

  @column({default: 0})
  timeToSell: number

  @column({
    type: 'enum',
    enum: TransactionType,
  })
  type!: TransactionType
}
