import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from 'fastify';
import { CreatePatientController } from './controllers/CreatePatientController';
import { ListPatientsController } from './controllers/ListPatientsController';
import { DeletePatientController } from './controllers/DeletePatientController';


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){
    fastify.get("/teste", async(request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true}
    })
    fastify.post("/patient", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreatePatientController().handle(request, reply)
    }) 
    fastify.get("/patients", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListPatientsController().handle(request, reply)
    }) 

    fastify.delete("/patient", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeletePatientController().handle(request, reply)
    }) 

}
