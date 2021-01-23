import {
  Entity as entity,
  PrimaryColumn as primaryColumn,
  Column as column,
  BaseEntity,
  Index as index,
  OneToMany as oneToMany,
} from 'typeorm'
import {ClosedTransaction} from './closed-transactions'
import {Tick} from './tick'
import {ToSell} from './to-sell'
@entity()
export class Pair extends BaseEntity {
  @primaryColumn()
  public name!: string

  @column()
  public changeToTrend!: number

  @column()
  public changeToChangeTrend!: number

  @column({type: 'decimal', precision: 16, scale: 8, default: 0})
  public volume!: string

  @column()
  public active!: boolean

  @column()
  public coin0!: string

  @column()
  public coin1!: string

  @column()
  public coin0Precision!: number

  @column()
  public coin1Precision!: number

  @column()
  public profit!: string

  @column()
  public buyPerHour!: number

  @column()
  public coin0Name!: string

  @column()
  public coin1Name!: string

  @column()
  public coin0FriendlyName!: string

  @column()
  public coin1FriendlyName!: string

  @column({type: 'decimal', precision: 16, scale: 8, default: 0})
  public step!: string

  @oneToMany((type) => ClosedTransaction, (closedTransaction) => closedTransaction.pair)
  public closedTransactions!: ClosedTransaction[]

  @oneToMany((type) => ToSell, (toSell) => toSell.pair)
  public toSell!: ClosedTransaction[]

  @oneToMany((type) => Tick, (tick) => tick.pair)
  public ticks!: Tick[]
}
