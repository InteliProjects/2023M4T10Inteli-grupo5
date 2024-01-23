import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Responsavel from 'App/Models/Responsavei';

export default class ResponsaveisController {

    public async index({response}: HttpContextContract) {
        const responsaveis = await Responsavel.all();

        return response.json(responsaveis);
    }

    public async store({request, response}: HttpContextContract) {
        const body = request.body();

        const responsavel = await Responsavel.create(body);

        response.status(201);

        return {
            message: "Responsavel cadastrado",
            data: responsavel
        }
    }

    public async show({response, params}: HttpContextContract) {
        const responsavel = await Responsavel.findOrFail(params.id);

        return response.json(responsavel);
    }
}
