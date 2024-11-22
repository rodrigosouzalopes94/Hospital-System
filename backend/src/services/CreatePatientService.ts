
import prismaClient from "../prsima";

interface CreatePatientProps {
    name: string;
    email: string;
}

class CreatePatientService {
    async excecute({ name, email }: CreatePatientProps) {
        if (!name || !email) {
            throw new Error("Preencha todos os campos")
        }

        const patient = await prismaClient.patient.create({
            data: {
                name,
                email,
                status: true
            }
        })


        return patient
    }
}
export { CreatePatientService }