import { useEffect, useState } from "react";
import { Card } from "../../components/card";
import styles from "./selecionarVeiculo.module.css";
import { UseVeiculos } from "../../hooks/driver/UseVeículos";
import type { VeiculoProps } from "../../utils/interfaces";
import { useVeiculo } from "../../context/use-veiculo/UseVeiculo";

export const SelecionarVeiculo = () => {
  const [veiculo, setVeiculo] = useState<VeiculoProps | null>(null);
  const [listaVeiculos, setListaVeiculos] = useState<VeiculoProps[]>([]);
  const { listarVeiculos, selecionarVeiculo, limparVeiculo } = UseVeiculos();
  const {veiculoSelecionado,setVeiculoSelecionado} = useVeiculo()

  const handleVeiculo = async () => {

    if (!veiculoSelecionado) {
        const select = document.getElementById("select-veiculo") as HTMLSelectElement;
          
          const placaSelecionada = select?.value;
          const veiculoSelecionado = listaVeiculos.find(v => v.placa === placaSelecionada);


          if (veiculoSelecionado) {
            setVeiculo(veiculoSelecionado);
            setVeiculoSelecionado(veiculoSelecionado)
            await selecionarVeiculo(veiculoSelecionado.id);
          }
    }else{
      
        if(veiculoSelecionado)
        await limparVeiculo(veiculoSelecionado?.id);
        setVeiculo(null);
        setVeiculoSelecionado(null)
        
    }
    
    }
  

  const carregarVeiculos = async () => {
    const resp = await listarVeiculos();
    setListaVeiculos(resp);
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);

  return (
    <div className={styles.container_selecionar_veiculo}>
      <Card className={styles.card_selecionar_veiculo}>
        <div className={styles.conteudo_card}>
          <h2>Selecione Veículo</h2>
          <select
            id="select-veiculo"
            className={styles.select_veiculo}
            value={veiculo?.placa || ""}
            onChange={(e) => {
              const placa = e.target.value;
              const selecionados = listaVeiculos.find(v => v.placa === placa);
              setVeiculo(selecionados || null);
            }}
            disabled={!!veiculoSelecionado}
          >
            <option value="">Selecione um veículo</option>
            {listaVeiculos.map((veiculo) => (
              <option
                value={veiculo.placa}
                key={veiculo.id}
                disabled={veiculo.status} 
              >
                {veiculo.placa}
              </option>
            ))}
          </select>

          <button
            onClick={handleVeiculo}
            className={`${styles.btn} ${veiculoSelecionado ? styles.btn_limpar :  ""} `}
          >
            {veiculoSelecionado ? "Limpar" :"Selecionar"}
          </button>
        </div>
      </Card>
    </div>
  );
};
