import { useState } from "react";
import { Modal } from "../../../../components/modal";
import { AtualizarConsultoriaSalaEspera } from "../../../../hooks/desktop/UseAtualizarConsultoriaSalaEspera";
import styles from "./modalStatus.module.css";

interface ModalStatusProps {
  isOpen: boolean;
  onClose: () => void;
  consultoriaId: number;
  onSave: () => void;
}

export const ModalStatus = ({
  isOpen,
  onClose,
  consultoriaId,
  onSave,
}: ModalStatusProps) => {
  const { atualizarStatus } = AtualizarConsultoriaSalaEspera();
  const [statusSelecionado, setStatusSelecionado] = useState("");

  const handleSubmit = async () => {
    try {
      if (!statusSelecionado) {
        alert("Selecione um status antes de salvar.");
        return;
      }

      await atualizarStatus({
        consultoriaId,
        statusSala: statusSelecionado,
      });
      onSave()
      onClose()
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar o status.");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className={styles.modalStatus}>
        <div className={styles.modalContainer}>
          <h2>Alterar Status</h2>

          <select
            value={statusSelecionado}
            onChange={(e) => setStatusSelecionado(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="AGUARDANDO_ALTA_HOSPITALAR">Aguardando alta hospitalar</option>
            <option value="AGUARDANDO_CONTATO">Aguardando contato</option>
            <option value="AGUARDANDO_PRIMEIRA_VD">Aguardando primeira VD</option>
            <option value="CANCELAMENTO_SOLICITANTE">Cancelamento pelo solicitante</option>
            <option value="ILPI">ILPI</option>
            <option value="INTERNACAO_HOSPITALAR">Internação hospitalar</option>
            <option value="MUDANCA_ENDERECO">Mudança de endereço</option>
            <option value="NAO_LOCALIZADO">Não localizado</option>
            <option value="OBITO_DOMICILIAR">Óbito domiciliar</option>
            <option value="OBITO_HOSPITALAR">Óbito hospitalar</option>
            <option value="RECUSA_PACIENTE_FAMILIAR">Recusa do paciente/familiar</option>
            <option value="REINTERNACAO_HOSPITALAR">Reinternação hospitalar</option>
            <option value="SEM_REDE_APOIO">Sem rede de apoio</option>
            <option value="SITUACOES_ESPECIFICAS">Situações específicas</option>
          </select>
          <div>
            <button className={styles.btn_salvar} onClick={handleSubmit}>
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
