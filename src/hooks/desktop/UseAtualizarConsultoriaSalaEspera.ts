import api from "../../apiConfig/api"

interface AtualizarStatusProps{
    statusSala: string
    consultoriaId: number
}

export const AtualizarConsultoriaSalaEspera = () =>{
    
    const atualizarStatus = async ({consultoriaId, statusSala} : AtualizarStatusProps)  => {
         await api.put(`consultoria/status/${consultoriaId}`, {statusSala})
    }

    return {atualizarStatus}
}