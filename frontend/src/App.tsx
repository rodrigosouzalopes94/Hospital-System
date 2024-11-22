import { FiTrash } from "react-icons/fi"
import { useEffect, useState, useRef, FormEvent } from "react"
import { api } from './services/api'


interface PatientProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App() {

  const [patients, setPatients] = useState<PatientProps[]>([])
  const nameRef =  useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadPatients();
  }, [])

  async function loadPatients() {
    const response = await api.get("/patients")
    setPatients(response.data)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if(!nameRef.current?.value || !emailRef) return;

    const response = await api.post("/patient",{
      name: nameRef.current?.value,
      email: emailRef.current?.value
    })

    setPatients(allPatients => [...allPatients, response.data])

    nameRef.current.value = ""
    emailRef.current.value = ""
  }

  async function handleDelete(id: string){
    try{
      await api.delete("/patient" , {
        params:{
          id: id
        }
      })

      const allPatients = patients.filter( (patient) => patient.id !== id)
      setPatients(allPatients)


    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-3xl font-mediun text-white">Pacientes</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input
            ref={nameRef}
            type="text"
            placeholder="Digite o nome do paciente completo"
            className="w-full mb-5 p-2 rounded" />

          <label className="font-medium text-white">Email:</label>
          <input
            ref={emailRef}
            type="email"
            placeholder="Digite o email do paciente"
            className="w-full mb-5 p-2 rounded" />

          <input type="submit" value="Cadastrar" className="cursor-pointer w-full bg-green-500 rounded font-medium" />
        </form>

        <section className="flex flex-col gap-4">
          {patients.map((patient) =>
            <article className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200" key={patient.id}>
              <p><span className="font-mediun">Nome do Paciente:</span>{patient.name} </p>
              <p><span className="font-mediun">Email do Paciente:</span>{patient.email}</p>
              <p><span className="font-mediun">Status do Paciente:</span>{patient ? "ATIVO": "iNATIVO" }</p>

              <button
                className="bg-red-500 w=7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                onClick={() => handleDelete(patient.id)} >
                <FiTrash size={18} color="FFF" />
              </button>
            </article>

          )}
        </section>


      </main>
    </div>
  )
}