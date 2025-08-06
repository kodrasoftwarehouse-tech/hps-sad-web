import { useEffect, useState } from "react";
import { Modal } from "../../../components/modal"
import { UseCorridas } from "../../../hooks/driver/UseCorridas";
import type { IVisitaReponse, PosicaoVeiculoProps } from "../../../utils/interfaces";
import styles from "./modalVisita.module.css"
import { LocalizacaoUsuario } from "../../../utils/geoLocalizacao";
import { ModalCancelarCorrida } from "../modalCancelarCorrida";
import { useVeiculo } from "../../../context/use-veiculo/UseVeiculo";

interface ModalVisitaProps{
    isOpen: boolean
    onClose:()=> void | undefined;
    onSave:()=>void;
    dados: IVisitaReponse
}

export const ModalVisita = ({isOpen,onClose,onSave,dados}: ModalVisitaProps) => {
    const [modalCancelar,setModalCancelar] = useState(false)
    const [corridaIniciada,setCorridaIniciada] = useState(false)
    const {obterLocalizacao} = LocalizacaoUsuario();
    const {iniciarCorrida,finalizarCorrida} = UseCorridas()
    const [kmInicial, setKmInicial] = useState("")
    const [kmFinal,setKmFinal] = useState("")
    const [corridaId,setCorridaId] = useState<number>()
    const {veiculoSelecionado} = useVeiculo()
    const [dadosCancelamento, setDadosCancelamento] = useState<{
              corridaId:number;
              kmFinal: string;
              posicaoFinal:PosicaoVeiculoProps;
              motivoCancelamento: string;
          } | null>(null);

    const visita = dados;

    const abrirGoogleMaps = () => {
      const { logradouro, numero, bairro } = visita.paciente.endereco;
      const enderecoFormatado = `${logradouro}, ${numero}, ${bairro}`.replace(/\s/g, '+');
      const url = `https://www.google.com/maps/search/?api=1&query=${enderecoFormatado}`;
      window.open(url, "_blank"); 
    };
   

    useEffect(() => {
    const corridaSalva = localStorage.getItem("corrida_visita");

    if (corridaSalva) {
      const { corridaId, kmInicial: kmSalvo, visita } = JSON.parse(corridaSalva);
      console.log(visita.id, visita.id)
      if (visita.id === visita.id) {
        setCorridaId(corridaId);
        setKmInicial(kmSalvo);
        setCorridaIniciada(true);
        }
      }
    }, []);

    const handleClose = () => {
    if (!corridaIniciada && onClose) {
    onClose();
  }
    };
    
    const requestIniciarCorrida = {
        veiculoId: veiculoSelecionado?.id ? String(veiculoSelecionado.id) : "",
        usuarioId: "1",
        kmInicial: kmInicial,
        posicaoInicial:{},
        tipoCorrida:"VISITA",
    }

    const requestCorridaFinalizada ={
        kmFinal: kmFinal,
        posicaoFinal:{},
        motivoCancelamento:"",
    }


  const handleCancelar = async () => {
  if (corridaId !== undefined) {
    if (!kmFinal.trim()) {
      alert("Preencha o KM Final antes de cancelar a corrida.");
      return;
    }

    try {
      const localizacaoAtual = await obterLocalizacao();

      setDadosCancelamento({
        corridaId: corridaId,
        kmFinal,
        posicaoFinal: localizacaoAtual,
        motivoCancelamento: "",
      });

      setModalCancelar(true);
    } catch (err) {
      console.error("Erro ao obter localização para cancelamento:", err);
    }
  }
};

  const handleCorrida = async () => {
  try {
    const localizacaoAtual = await obterLocalizacao();

    
    if (!corridaIniciada) {
      if (!kmInicial.trim()) {
        alert("Preencha o KM Inicial antes de iniciar a corrida.");
        return;
      }

      const resp = await iniciarCorrida(visita.id, {
        ...requestIniciarCorrida,
        posicaoInicial: localizacaoAtual,
      });

      setCorridaIniciada(true);
      setCorridaId(resp.data.id);

      localStorage.setItem("corrida_visita", JSON.stringify({
        corridaId: resp.data.id,
        kmInicial: kmInicial,
        visita: visita
      }));
    }

   
    else if (corridaId !== undefined) {
      if (!kmFinal.trim()) {
        alert("Preencha o KM Final antes de finalizar a corrida.");
        return;
      }

      await finalizarCorrida(corridaId, {
        ...requestCorridaFinalizada,
        posicaoFinal: localizacaoAtual,
      });

      onSave();
      onClose?.();
      localStorage.removeItem("corrida_visita");
    }

  } catch (err) {
    console.error("Erro ao obter localização:", err);
  }
};

     if(!visita) return <p>Carregando...</p>
    return (
        <Modal 
            isOpen={isOpen}
            onClose={handleClose}
            className={styles.container_modal}
            canClose={!corridaIniciada}
        >
           <div className={styles.container}>
               {corridaIniciada && (
                   <button onClick={handleCancelar} className={styles.btn_cancelar}>cancelar</button>
                )}
                <h3>{visita.paciente.nome}</h3>
                <p>{visita.paciente.endereco.logradouro}, {visita.paciente.endereco.numero}, {visita.paciente.endereco.bairro}</p>
                <div className={styles.config_form}>
                <label htmlFor="">KmInicial</label>
                <input type="text"  value={kmInicial} onChange={(e)=> setKmInicial(e.target.value)}/>
                </div>
                <div className={styles.config_form}>
                <label htmlFor="">KmFinal</label>
                <input 
                value={kmFinal}
                onChange={(e)=> setKmFinal(e.target.value)}
                type="text" 
                disabled={!corridaIniciada}
                />    
                </div>
                <button className={styles.btn} onClick={handleCorrida}>
                 {corridaIniciada ? "Finalizar" : "Iniciar"}    
                </button>  
                {corridaIniciada && (
                    <button className={styles.btn_maps} onClick={abrirGoogleMaps} >Maps</button>
                )}
                {dadosCancelamento && dadosCancelamento.posicaoFinal && (
                  <ModalCancelarCorrida
                    isOpen={modalCancelar}
                    onConfirm={() => {
                        setModalCancelar(false);
                        onClose(); 
                                }}
                    onClose={() => setModalCancelar(false)}
                    dados={{
                      corridaId: dadosCancelamento.corridaId,
                      kmFinal: dadosCancelamento.kmFinal,
                      posicaoFinal: dadosCancelamento.posicaoFinal,
                      motivoCancelamento: dadosCancelamento.motivoCancelamento
                    }}
                    canClose={true}
                  />
                )}
           </div>
        </Modal>
    )
}