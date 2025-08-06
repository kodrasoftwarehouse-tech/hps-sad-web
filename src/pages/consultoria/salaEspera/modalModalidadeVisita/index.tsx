import { useState } from "react";
import { Modal } from "../../../../components/modal"
import { UseModalidadeVisita } from "../../../../hooks/desktop/UseModalidadeVisita";
import styles from "./modalModalidadeVisita.module.css"
import { toast } from "react-toastify";


interface ModalModalidadeVisitaProps{
    isOpen: boolean;
    onClose: () =>void;
    consultoriaId:number;
    onSave: ()=> void;
}

export const ModalModalidadeVisita = ({isOpen,onClose,consultoriaId,onSave}: ModalModalidadeVisitaProps) => {
    const [modalidade, setModalidade] = useState("")
    const {modalidadeVisita} = UseModalidadeVisita()

    const handleSubmit = async () =>{
        try {  
                await modalidadeVisita(consultoriaId,modalidade)
                onSave()
                onClose()
                toast.success("Consultoria atualizada para visita!")
        } catch {
            console.log("Erro ao salvar modalidade!")
            toast.error("Ops, algo deu errado!")
        }
    }

    return(
        <Modal isOpen={isOpen} onClose={onClose} className={styles.container_modal} canClose>
          <div className={styles.container}>
            <h3>Modalidade Visita</h3>
             <select 
            
             value={modalidade}
             onChange={(e) =>setModalidade(e.target.value)}
             >
                <option value="EMERGENCIA">Emergência</option>
                <option value="HOSPITAL">Hospital</option>
                <option value="UNIDADE_SAUDE">Unidade Saúde</option>
                <option value="PRONTO_ATENDIMENTO">Pronto Atendimento</option>
             </select>
             <button className={styles.btn_selecionar} onClick={()=> handleSubmit()}>Selecionar</button>
          </div>
        </Modal>
    )
}