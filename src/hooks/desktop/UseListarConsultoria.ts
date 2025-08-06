import api from "../../apiConfig/api";

export const UseListarConsultoria = () =>{
    
    
    const listarConsultoriaSalaEspera = async (equipe: string) =>{
        const resp = await api.get(`consultoria/sala-de-espera/${equipe}`);
        return resp;    
    }

    const listarConsultoriaVisita = async (equipe: string ) => {
        const resp = await api.get(`consultoria/aguardando-primeira-vd/${equipe}`)
        return resp;
    }

    return { listarConsultoriaSalaEspera, listarConsultoriaVisita}
}