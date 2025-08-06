import api from "../../apiConfig/api"

export const UseBaixaConsultoriaSalaEspera = () =>{
    const baixaConsultoriaSalaEspera =async (consultoriaId: number, status: string ) =>{
        await api.put(`consultoria/${consultoriaId}/baixa` ,{
            statusSala: status,
            statusBaixa: status,
        })
    }

    const baixaSituacaoEspecifica = async (consultoriaId: number, status: string, observacao: string) =>{
         await api.put(`consultoria/${consultoriaId}/situacoes-especificas`, {
            statusSala: status,
            statusBaixa: status,
            situacoesEspecificas: observacao
         }) 
    }

    const baixaHospital = async (consultoriaId: number, status: string, hospital:string) =>{
        await api.put(`consultoria/${consultoriaId}/hospital-baixa`,{
            statusSala: status,
            statusBaixa: status,
            hospital: hospital
        })
    }

    return{baixaConsultoriaSalaEspera, baixaSituacaoEspecifica, baixaHospital}
}