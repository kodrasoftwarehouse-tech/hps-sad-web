import api from "../../apiConfig/api"

export const UseAtualizarEquipeConsultoria = () =>{
    const atualizarEquipeConsultoria = async (consultoriaId:number, equipeId:string) =>{
         await api.put(`consultoria/equipe/${consultoriaId}`, {equipeId})
    }

    return{atualizarEquipeConsultoria}
}