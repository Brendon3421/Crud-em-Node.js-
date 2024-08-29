import prismaClient from "../prisma"

class ListCustomerServices {
    async execute(){
        const customers = await prismaClient.customer.findMany()

        return customers

    }
}
export {ListCustomerServices}