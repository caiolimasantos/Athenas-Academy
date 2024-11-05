import { auth } from "@/auth";
import Header from "@/components/Header";
import { getAlunoByCurso } from "@/queries";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function Dashboard() {
    const session = await auth()
    if (!session) {
        redirect('/login')
    }
    const cookieStore = await cookies()
    const escola = cookieStore.get('escola')
    const codigo_escola = String(escola?.value)
    const dataCurso = await getAlunoByCurso(String(session.user?.id), codigo_escola)
    const data = Object.values(dataCurso)
    return (
        <Header sessionData={session.user}>
            <div className="text-white flex gap-4 flex-wrap transition-all">
                {data.map((pacotes) => (
                    <div key={pacotes.id_aluno_curso} className="grid grid-cols-1">
                        <Link href={'#'}>
                            <div className="card bg-base-100 w-96 shadow-xl" key={pacotes.id_pacote}>
                                <div className="card-body">
                                    <h2 className="card-title">{pacotes.nome}</h2>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Ver Mais</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </Header>
    );
}