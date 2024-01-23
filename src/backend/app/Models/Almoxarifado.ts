import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import Peca from './Peca'

export default class Almoxarifado extends BaseModel {
  // associa almoxarifado com peca pelo id do almoxarifado que em peças está almoxarifado_id
  @hasMany(() => Peca)
  public pecas: HasMany<typeof Peca>

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static table = 'almoxarifado'
}
