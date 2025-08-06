import api from "../../apiConfig/api"

export const UseVeiculos = () =>{
    const listarVeiculos = async () =>{
      const resp = await api.get("veiculo/lista")
      return resp.data;
    }

    const selecionarVeiculo = async (id: number) =>{
       await api.put(`veiculo/${id}/selecionar`)
    }

    const limparVeiculo = async (id: number) =>{
      await api.put(`veiculo/${id}/limpar`)
    }

    return {listarVeiculos,selecionarVeiculo,limparVeiculo}
}