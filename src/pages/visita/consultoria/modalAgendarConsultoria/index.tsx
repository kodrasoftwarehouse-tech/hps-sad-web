import { useState } from "react";
import { Modal } from "../../../../components/modal"
import { UseVisitas } from "../../../../hooks/desktop/UseVisitas";
import styles from "./modalVisitaConsultoria.module.css"
import { toast } from "react-toastify";

interface ModalAgendarVisitaProps{
    isOpen:boolean;
    onClose: ()=> void;
    onSave:()=>void;
    pacienteId: number;
    equipeId:number;
}


export const ModalClassificacaoVisita = ({isOpen,onClose,pacienteId,onSave,equipeId}:ModalAgendarVisitaProps) =>{

  const statusVisita = "CONSULTORIA_AGENDADA"
  const [classificacao, setClassificacao] = useState("")

  const dados = {
    pacienteId: pacienteId,
    equipeId: equipeId,
    classificacao: classificacao,
    statusVisita: statusVisita
  }
  const {agendarVisita} = UseVisitas()
  
  const handleSalvar = async () =>{

    try {
      await agendarVisita(dados)
      onSave()
      onClose()
      toast.success("Visita consultoria agendada!")
    } catch {
      toast("Ops, algo deu errado!")
    }
  }


    return(
        <Modal isOpen={isOpen} onClose={onClose} className={styles.container_modal} canClose>
          <div className={styles.container}>
            <h3>Classificação Visita</h3>
            <select value={classificacao} onChange={(e)=> setClassificacao(e.target.value)}>
                <option value="MEDICACAO_PARENTERAL">Medicação Parenteral</option>
                <option value="POS_OBITO">Pós Óbito</option>
                <option value="REMOTO">Remoto</option>
                <option value="VD_PROGRAMADA">VD Programada</option>
                <option value="VD_NAO_PROGRAMADA">VD Não Programada</option>
            </select>
            <button onClick={handleSalvar} className={styles.btn}>Salvar</button>
          </div>
        </Modal>
    )
}