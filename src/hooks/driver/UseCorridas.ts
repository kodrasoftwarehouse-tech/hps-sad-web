import api from "../../apiConfig/api"
import type {CorridaFinalizarProps, CorridaIniciarProps } from "../../utils/interfaces"


export const UseCorridas = () =>{
    const iniciarCorrida = async (id:number, dados: CorridaIniciarProps) =>{
       const resp = await api.post(`corrida/${id}`, dados)
       return resp
    }

    const finalizarCorrida = async ( id: number, dados:CorridaFinalizarProps) =>{
        await api.put(`corrida/${id}/finalizar`, dados)
    }

    const cancelarCorrida = async (dados: CorridaFinalizarProps) =>{
        await  api.put(`corrida/${dados.corridaId}/cancelar`,dados)
    }

    return {iniciarCorrida, finalizarCorrida, cancelarCorrida}
}