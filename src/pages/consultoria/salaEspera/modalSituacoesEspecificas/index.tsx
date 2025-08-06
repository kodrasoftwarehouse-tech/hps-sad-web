import { useState } from "react";
import { Modal } from "../../../../components/modal"
import { UseBaixaConsultoriaSalaEspera } from "../../../../hooks/desktop/UseBaixaConsultoriaSalaEspera";
import styles from "./modalSituacaoEspecifica.module.css"
import { toast } from "react-toastify";

interface ModalSituacoesEspecificasProps{
    isOpen: boolean;
    onSave: () => void;
    onClose: () => void;
    consultoriaId:number;
    status: string
}

export const ModalSituacoesEspecificas = ({isOpen,onClose,consultoriaId,status, onSave}: ModalSituacoesEspecificasProps) =>{
     const {baixaSituacaoEspecifica} = UseBaixaConsultoriaSalaEspera()
     const [observacao, setObservacao] = useState("")
     
     const handleBaixa = async () =>{
        try {
            await baixaSituacaoEspecifica(consultoriaId,status, observacao)
            onSave()
            onClose()
            toast.success("Baixa realizada!")
        } catch {
            console.log("erro ao dar baixa") 
            toast.error("Ops, algo deu errado!")
        }

     }
     
    return (
        <Modal isOpen={isOpen} onClose={onClose} canClose>
          <div className={styles.container_modal}>
            <h3>Observação</h3>
            <input className={styles.input_observacao} type="text"value={observacao} onChange={(e) => setObservacao(e.target.value)}/>
            <button className={styles.btn_salvar} onClick={()=> handleBaixa()}>Salvar</button>
          </div>
        </Modal>
    )
}