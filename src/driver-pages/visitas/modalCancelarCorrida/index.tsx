import { useState } from "react";
import { Modal } from "../../../components/modal"
import type { CorridaFinalizarProps } from "../../../utils/interfaces";
import styles from "./modalCancelarCorrida.module.css"
import { UseCorridas } from "../../../hooks/driver/UseCorridas";


interface ModalVisitaProps{
    isOpen: boolean;
    onClose:()=> void | undefined;
    dados: CorridaFinalizarProps
    canClose: true;
    onConfirm: () => void;
}

export const ModalCancelarCorrida = ({isOpen,onClose,dados,onConfirm}: ModalVisitaProps) => {
    const data = {...dados}
    const [motivo,setMotivo] = useState("")
    const {cancelarCorrida} = UseCorridas()


    const handleCancelar =async ()=>{
       if(data.corridaId){
           const dataAtualizada = {
               ...data, motivoCancelamento: motivo
           }
        if(!motivo){
            alert("Preencha o motivo para enviar!")
            return
        }    
           await cancelarCorrida(dataAtualizada)
           localStorage.removeItem("corrida_visita");
           onConfirm();
       }
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose} className={styles.container_modal} canClose >
            <div className={styles.container}>
               <h3>Motivo Cancelamento</h3>
               <input type="text" value={motivo} onChange={(e)=> setMotivo(e.target.value)}/>
               <button onClick={handleCancelar}>Enviar</button>
            </div>
        </Modal>
    )
}