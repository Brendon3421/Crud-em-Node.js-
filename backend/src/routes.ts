
import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerController } from "./Controllers/CreateCustomerController";
import { ListCustomerController } from '../src/Controllers/ListCustomerController';
import { DeleteCustomerController } from '../src/Controllers/DeleteCustomerController';


export async function routes(fastify: FastifyInstance, option: FastifyPluginOptions) {

    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })
    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)
    })
    fastify.get("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomerController().handle(request, reply)
    })
    fastify.delete("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply)
    })

}

