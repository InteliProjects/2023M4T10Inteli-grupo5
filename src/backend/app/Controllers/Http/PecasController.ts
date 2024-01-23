import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Peca from 'App/Models/Peca';

export default class PecasController {

    public async index({response}: HttpContextContract) {
        const pecas = await Peca.all();

        return response.json(pecas);
    }

    public async store({request, response}: HttpContextContract) {
        const body = request.body();

        // o tipo precisa ser Bateria, Motor ou Pneu
        body.tipo = body.tipo.charAt(0).toUpperCase() + body.tipo.slice(1);

        if (body.tipo !== "Bateria" && body.tipo !== "Motor" && body.tipo !== "Pneu") {
            response.status(400);

            return {
                message: "Tipo inválido",
                data: []
            }
        }

        const peca = await Peca.create(body);

        response.status(201);

        return {
            message: "Peça cadastrada",
            data: peca
        }
    }

    public async show({response, params}: HttpContextContract) {
        const peca = await Peca.findOrFail(params.id);

        return response.json(peca);
    }
}
