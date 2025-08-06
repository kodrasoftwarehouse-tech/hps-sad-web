import { useState } from "react";
import { Modal } from "../../../../components/modal"
import { UseBaixaConsultoriaSalaEspera } from "../../../../hooks/desktop/UseBaixaConsultoriaSalaEspera";
import styles from "./modalhospital.module.css"
import { toast } from "react-toastify";

interface ModalHospitalProps{
    isOpen: boolean;
    onClose: () =>void;
    consultoriaId:number;
    status: string;
    onSave: ()=> void;
}

export const ModalHospital = ({isOpen,onClose,consultoriaId,status,onSave}: ModalHospitalProps) =>{
    const [hospital, setHospital] = useState("")
    const {baixaHospital} = UseBaixaConsultoriaSalaEspera()

    const handleBaixar = async () =>{
        try {
            await baixaHospital(consultoriaId, status, hospital)
            onSave()
            onClose()
            toast.success("Baixa realizada!")
        } catch {
           console.log("Erro")
           toast.error("Ops, algo deu errado!")
        }

    }

    return(
         <Modal isOpen={isOpen} onClose={onClose} canClose>
           <div className={styles.container_modal}>
              <h3>Hospital</h3>
              <form onSubmit={handleBaixar}>
              <input className={styles.input_hospital} type="text" onChange={(e)=>setHospital(e.target.value)}value={hospital} required/>
              <button className={styles.btn_salvar} type="submit">Salvar</button>
              </form>
           </div>
         </Modal>

    )
}