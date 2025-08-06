import api from "../../apiConfig/api"

interface VisitaAgendarProps{
    pacienteId:number
    equipeId:number;
    classificacao:string;
    statusVisita:string;
}

export const UseVisitas = () =>{

    const agendarVisita = async (dados: VisitaAgendarProps) =>{
    await api.post(`visita/${dados.pacienteId}/agendar`,{
        usuarioId:1,
        equipeId:dados.equipeId,
        classificacao:dados.classificacao,
        statusVisita: dados.statusVisita
    })
    }

    const listarVisitas = async (equipeId: string) =>{
       const resp = await api.get(`visita/${equipeId}`)
       return resp
    }

    const detalheVisita = async (visitaId: number) =>{
        const resp = await api.get(`visita/${visitaId}/detalhe`)
        return resp.data
    }

    const deletarVisita = async (visitaId: number) =>{
        await api.delete(`visita/${visitaId}`)
    }

    return {
        agendarVisita,
        listarVisitas,
        deletarVisita,
        detalheVisita
    
    }
}