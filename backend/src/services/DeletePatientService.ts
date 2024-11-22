import prismaClient from "../prsima";


interface DeletePatientProps{
    id: string;
}

class DeletePatientService{
    async execute({ id }: DeletePatientProps){

        if(!id){
            throw new Error("Solicitação inválida")
        }

        const findPatient = await prismaClient.patient.findFirst({
            where:{
                id: id
            }
        })
        if(!findPatient){
            throw new Error("Cliente não existe")
        }

        await prismaClient.patient.delete({
            where:{
                id: findPatient.id
            }
        })

        return { message: "Deletado com sucesso"}
    }
}

export { DeletePatientService} 