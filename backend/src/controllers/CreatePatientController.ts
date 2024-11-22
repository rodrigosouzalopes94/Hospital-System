import {FastifyRequest, FastifyReply} from "fastify";

import { CreatePatientService } from "../services/CreatePatientService";

class CreatePatientController{
    async handle(request: FastifyRequest, reply: FastifyReply){

        const{ name, email } = request.body as { name: string, email: string};

        const patientService = new CreatePatientService()

        const patient = await patientService.excecute({name, email});

        reply.send(patient)

    }

}

export { CreatePatientController } 