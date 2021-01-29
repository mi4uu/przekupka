import {
  Entity as entity,
  PrimaryColumn as primaryColumn,
  Column as column,
  BaseEntity,
  Index as index,
  OneToMany as oneToMany,
} from 'typeorm'
import {ClosedTransaction} from './closed-transactions'
import {Profit} from './profit'
import {Tick} from './tick'
import {ToSell} from './to-sell'
@entity()
export class Pair extends BaseEntity {
  @primaryColumn()
  public name!: string

  @column({type: 'float'})
  public changeToTrend!: number

  @column({type: 'float'})
  public changeToChangeTrend!: number

  @column({type: 'decimal', precision: 20, scale: 8, default: 0})
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

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  public step!: string

  @column({type: 'decimal', precision: 40, scale: 20, default: 0})
  public param0!: string // Some generic param

  @column({default: false})
  public debug!: boolean

  @oneToMany(() => ClosedTransaction, async (closedTransaction) => closedTransaction.pair)
  public closedTransactions!: Promise<ClosedTransaction[]>

  @oneToMany(() => ToSell, async (toSell) => toSell.pair)
  public toSell!: Promise<ToSell[]>

  @oneToMany(() => Tick, async (tick) => tick.pair)
  public ticks!: Promise<Tick[]>

  @oneToMany(() => Profit, async (profit) => profit.pair)
  public profits!: Promise<Profit[]>
}
