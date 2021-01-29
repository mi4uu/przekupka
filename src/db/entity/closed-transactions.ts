import {
  Entity as entity,
  PrimaryColumn as primaryColumn,
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
  @primaryColumn()
  id!: number

  @index()
  @manyToOne((type) => Pair, (pair) => pair.closedTransactions)
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

  @column({
    type: 'enum',
    enum: TransactionType,
  })
  type!: TransactionType
}
