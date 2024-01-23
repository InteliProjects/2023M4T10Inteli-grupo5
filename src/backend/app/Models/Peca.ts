import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Peca extends BaseModel {
  @column({ isPrimary: true })
  public rfid: string

  @column()
  public almoxarifado_id: number

  @column()
  public tipo: string

  @column()
  public disponivel: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public returned_at: DateTime

  public static table = 'pecas'
}
