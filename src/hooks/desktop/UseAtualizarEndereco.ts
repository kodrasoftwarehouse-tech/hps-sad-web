import api from "../../apiConfig/api";

interface AtualizarEnderecoProps{
    logradouro: string;
    complemento: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado:string;
    cep?: string
}


export const UseAtualizarEndereco = () =>{
    const atualizarEndereco = async (dados: AtualizarEnderecoProps, enderecoId: string) =>{
        await api.put(`endereco/${enderecoId}`, dados )
    }
    
    return {atualizarEndereco}
}