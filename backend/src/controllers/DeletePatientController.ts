import { FastifyRequest, FastifyReply} from 'fastify'
import { DeletePatientService } from '../services/DeletePatientService'

class DeletePatientController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { id } = request.query as { id: string}
        const patientService = new DeletePatientService();

        const patient = await patientService.execute({ id })

        reply.send(patient)
    }
}


export { DeletePatientController}