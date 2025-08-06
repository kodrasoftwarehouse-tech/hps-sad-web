import { toast } from "react-toastify";
import { Modal } from "../../../../components/modal"
import { UseBaixaConsultoriaSalaEspera } from "../../../../hooks/desktop/UseBaixaConsultoriaSalaEspera";
import styles from "./modalBaixa.module.css"

interface ModalBaixaProps{
    isOpen: boolean;
    onClose: () => void;
    consultoriaId: number;
    status: string
    onSave: () => void;
}



export const ModalBaixa = ({isOpen, onClose, consultoriaId, onSave, status}: ModalBaixaProps) => {
    const {baixaConsultoriaSalaEspera} = UseBaixaConsultoriaSalaEspera()
    

    const handleBaixa = async () =>{
        try {
            await baixaConsultoriaSalaEspera(consultoriaId, status )
            onSave()
            onClose()
            toast.success("Baixa realizada!")
        } catch{
            toast.error("Erro ao dar baixa!")
        }
    }

    const handleCancelar = () =>{
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}  className={styles.container_modal_baixa} canClose>
          <div>
              <h3>Tem certeza?</h3>
              <div className={styles.container_btn}>
                <button className={styles.btn_sim} onClick={()=> handleBaixa()}>Sim</button>
                <button className={styles.btn_nao} onClick={() => handleCancelar()}>Não</button>
              </div>
          </div>
        </Modal>
    )
}