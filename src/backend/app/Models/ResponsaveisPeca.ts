import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ResponsavelPeca extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public peca_rfid: string

  @column()
  public responsavel_rfid: string

  @column()
  public topico_caminhao: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  public static table = 'pecas_responsaveis'
}
