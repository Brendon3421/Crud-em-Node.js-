import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerServices } from '../services/DeleteCustomerServices'

class DeleteCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string }

        const customerServiceDelete = new DeleteCustomerServices;

        const customer = await customerServiceDelete.execute({ id })

        reply.send(customer);
    }
}
export { DeleteCustomerController }