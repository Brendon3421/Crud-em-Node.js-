import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerServices } from "../services/ListCustomerServices";
import exp from "constants";

class ListCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listCustomerServices = new ListCustomerServices();

        const customer = await listCustomerServices.execute();
        reply.send(customer);

    }
}
export { ListCustomerController }