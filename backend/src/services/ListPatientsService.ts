import prismaClient from "../prsima";

class ListPatientsService{
    async execute(){

        const patients = await prismaClient.patient.findMany()

        return patients
    }
}

export {ListPatientsService}