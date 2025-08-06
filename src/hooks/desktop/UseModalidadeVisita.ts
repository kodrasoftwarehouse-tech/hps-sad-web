import api from "../../apiConfig/api"

export const UseModalidadeVisita = () =>{
   const modalidadeVisita = async (consultoriaId: number, modalidadeVisita: string) =>{
    await api.put( `consultoria/${consultoriaId}/modalidade-visita`, {
      modalidadeVisita: modalidadeVisita})
   }

   return{ modalidadeVisita}
}