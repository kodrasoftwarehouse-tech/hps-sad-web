import { useState } from "react";
import styles from "./modalEndereco.module.css";
import { Modal } from "../../../../components/modal";
import { UseListarEquipes } from "../../../../hooks/desktop/UseListarEquipes";
import { UseAtualizarEndereco } from "../../../../hooks/desktop/UseAtualizarEndereco";
import { UseAtualizarEquipeConsultoria } from "../../../../hooks/desktop/UseAtualizarEquipeConsultoria";
import { UseBaixaConsultoriaSalaEspera } from "../../../../hooks/desktop/UseBaixaConsultoriaSalaEspera";
import { toast } from "react-toastify";

interface ModalEnderecoProps {
  isOpen: boolean;
  onClose: () => void;
  enderecoId: string;
  consultoriaId:number;
  onSave: () => void;
}

export const ModalEndereco = ({ isOpen, onClose, enderecoId, consultoriaId, onSave }: ModalEnderecoProps) => {
  const {atualizarEndereco} = UseAtualizarEndereco();
  const {baixaConsultoriaSalaEspera} = UseBaixaConsultoriaSalaEspera();
  const {atualizarEquipeConsultoria} = UseAtualizarEquipeConsultoria()
  const { equipes } = UseListarEquipes();

  const [formDataEndereco, setFormDataEndereco] = useState({
    cep: "",
    logradouro: "",
    complemento: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [formDataConsultoriaEquipe, setFormDataConsultoriaEquipe ] = useState<string>("")

  
  const [isBaixa, setIsBaixa] = useState(false);
  const [isMudancaEquipe, setIsMudancaEquipe] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataEndereco((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (name === "baixa") {
      setIsBaixa(checked);
      if (checked) setIsMudancaEquipe(false); 
    } else if (name === "mudanca_equipe") {
      setIsMudancaEquipe(checked);
      if (checked) setIsBaixa(false); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isBaixa) {
          await atualizarEndereco(formDataEndereco,enderecoId)
          await baixaConsultoriaSalaEspera(consultoriaId, "MUDANCA_ENDERECO")
          toast.success("Baixa realizada!")

      } else if (isMudancaEquipe) {
         await atualizarEndereco(formDataEndereco,enderecoId )
         await atualizarEquipeConsultoria(consultoriaId,formDataConsultoriaEquipe)
         toast.success("Endereço alterado!")
      }
      onSave();
      onClose(); 
    } catch{
      console.log("Erro")
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.container_modal} canClose>
      <form onSubmit={handleSubmit}>
        <h2>Mudança de Endereço</h2>

        <div className={styles.container_forms}>
          <div className={styles.form_group}>
            <label htmlFor="cep">Cep</label>
            <input className={styles.input_cep} type="text" name="cep" value={formDataEndereco.cep} onChange={handleChange}  />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="logradouro">Logradouro*</label>
            <input  className={styles.input_logradouro} type="text" name="logradouro" value={formDataEndereco.logradouro} onChange={handleChange} required />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="complemento">Complemento*</label>
            <input className={styles.input_complemento} type="text" name="complemento" value={formDataEndereco.complemento} onChange={handleChange} required />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="numero">Número*</label>
            <input className={styles.input_numero} type="text" name="numero" value={formDataEndereco.numero} onChange={handleChange}  required/>
          </div>
        </div>

        <div className={styles.container_forms}>
          <div className={styles.form_group}>
            <label htmlFor="bairro">Bairro*</label>
            <input  type="text" name="bairro" value={formDataEndereco.bairro} onChange={handleChange}  required/>
          </div>

          <div className={styles.form_group}>
            <label htmlFor="cidade">Cidade*</label>
            <input  type="text" name="cidade" value={formDataEndereco.cidade} onChange={handleChange}  required/>
          </div>

          <div className={styles.form_group}>
            <label htmlFor="estado">Estado*</label>
            <input className={styles.input_estado} type="text" name="estado" value={formDataEndereco.estado} onChange={handleChange} required />
          </div>

          <div className={styles.container_checkbox}>
            <div>
              <input
                type="checkbox"
                name="baixa"
                id="baixa"
                checked={isBaixa}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="baixa">Baixa</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="mudanca_equipe"
                id="mudanca_equipe"
                checked={isMudancaEquipe}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="mudanca_equipe">Mudança de Equipe</label>
            </div>
          </div>

          <div className={styles.form_group}>
            <label  htmlFor="equipe">Equipe</label>
            <select
              name="equipeId"
              value={formDataConsultoriaEquipe}
              onChange={(e) => setFormDataConsultoriaEquipe(e.target.value)}
              disabled={!isMudancaEquipe || isBaixa}
              className={styles.input_equipe}
            >
              <option value="">Selecione a Equipe</option>
              {equipes.map((equipe) => (
                <option key={equipe.id} value={equipe.id}>
                  {equipe.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.container_btn}>
          <button type="submit" className={styles.btn}>Salvar</button>
        </div>
      </form>
    </Modal>
  );
};
