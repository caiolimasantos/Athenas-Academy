import { getFrequenciaAula, getFrequenciaFaltas, getFrequenciaPresenca, getFrequenciaReposicao } from "@/queries"
import { cookies } from "next/headers"

export default async function FrequencyData() {
  const cookieStore = await cookies()
  const escola = cookieStore.get('escola')
  const id_aluno_curso = cookieStore.get('iacurso')

  // Obtenção de dados das queries
  const totalaula = await getFrequenciaAula(String(escola?.value), String(id_aluno_curso?.value))
  const presenca = await getFrequenciaPresenca('P', String(escola?.value), String(id_aluno_curso?.value))
  const faltas = await getFrequenciaFaltas('F', String(escola?.value), String(id_aluno_curso?.value))
  const reposicao = await getFrequenciaReposicao(String(escola?.value), String(id_aluno_curso?.value))
  
  const totalaulas:any = Object.entries(totalaula);
  const presencas:any = Object.entries(presenca);
  const falta:any = Object.entries(faltas);
  const reposicaos:any = Object.entries(reposicao);

  const totalAulas:number = totalaulas[0][1].totalaula || 0
  const totalFaltas:number = falta[0][1].faltas || 0
  const totalReposicao:number = reposicaos[0][1].reposicao || 0
  const totalPresenca:number = presencas[0][1].presenca || 0

  const percentualPresenca = totalAulas > 0
    ? ((totalAulas - totalFaltas - totalReposicao) * 100) / totalAulas
    : 0

  // Combinando os resultados das queries em um único objeto
  const frequencyData = {
    totalAulas,
    presenca: totalPresenca,
    faltas: totalFaltas,
    reposicao: totalReposicao,
    percentualPresenca
  }

  return frequencyData
}
