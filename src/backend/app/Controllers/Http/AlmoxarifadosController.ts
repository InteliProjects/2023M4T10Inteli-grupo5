import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Almoxarifado from 'App/Models/Almoxarifado';

export default class AlmoxarifadosController {

    public async index({response}: HttpContextContract) {
        const almoxarifado = await Almoxarifado.all();

        return response.json(almoxarifado);
    }

    public async store({request, response}: HttpContextContract) {
        const body = request.body();
        
        const maxId = await (await Almoxarifado.query().max('id'))
        body.id = Number(maxId[0].$extras.max) + 1

        const almoxarifado = await Almoxarifado.create(body);

        response.status(201);

        return {
            message: "Almoxarifado cadastrado",
            data: almoxarifado
        }
    }

    public async show({response, params}: HttpContextContract) {
        const almoxarifado = await Almoxarifado.findOrFail(params.id);

        return response.json(almoxarifado);
    }
}
