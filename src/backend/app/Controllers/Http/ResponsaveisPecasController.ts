import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

import ResponsavelPeca from 'App/Models/ResponsaveisPeca';
import Peca from 'App/Models/Peca';

export default class ResponsaveisPecasController {

    public async index({response}: HttpContextContract) {
        const responsabilidades = await ResponsavelPeca.all();

        return response.json(responsabilidades);
    }

    public async store({request, response}: HttpContextContract) {
        const body = request.body();

        const responsabilidade = await ResponsavelPeca.create(body);

        const peca = await Peca.findOrFail(body.peca_rfid);

        peca.disponivel = false;

        // se o topico_caminhao conter almoxarifado no começo, registra returned_at na peca
        if (body.topico_caminhao.includes("almoxarifado")) {
            peca.returned_at = DateTime.now()
        }

        await peca.save();

        response.status(201);

        return {
            message: "Responsabilidade registrada",
            data: responsabilidade
        }
    }

    public async show({response, params}: HttpContextContract) {
        const responsabilidade = await ResponsavelPeca.findOrFail(params.id);

        return response.json(responsabilidade);
    }
}
