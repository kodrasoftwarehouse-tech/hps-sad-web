import { useState } from "react";
import { Card } from "../../../components/card";
import styles from "./cadastro.module.css";
import { formatarTelefone, calcularIdade, formatarDataParaEnvio } from
"../../../utils/formatacao";
import { UseListarEquipes } from "../../../hooks/desktop/UseListarEquipes";
import { UseCadastroPaciente } from "../../../hooks/desktop/UseCadastroPaciente";
import { UseCadastroConsultoria } from "../../../hooks/desktop/UseCadastroConsultoria";
import { toast } from "react-toastify";

export const CadastroConsultoria = () => {

const { equipes } = UseListarEquipes();
const {cadastrarPaciente} = UseCadastroPaciente();
const {cadastrarConsultoria} = UseCadastroConsultoria()
const [formDataPaciente, setFormDataPaciente] = useState({
nome: "",
idade: "",
dataNascimento: "",
telefone1: "",
telefone2: "",
endereco: {
logradouro: "",
complemento: "",
numero: "",
bairro: "",
cidade: "",
estado: ""
}
});

const [formDataConsultoria, setFormDataConsultoria] = useState({
pacienteId: "",
usuarioId: "1",
equipeId: "",
solicitante: "",
unidadeSaude: "",
dataConsultoria: "",
})

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  let newValue = value;

  if (name === "telefone1" || name === "telefone2") {
    newValue = formatarTelefone(value);
  }

  const camposEndereco = [
    "logradouro",
    "complemento",
    "numero",
    "bairro",
    "cidade",
    "estado"
  ];

  if (
    name === "nome" ||
    name === "idade" ||
    name === "dataNascimento" ||
    name === "telefone1" ||
    name === "telefone2"
  ) {
    setFormDataPaciente((prev) => {
      const updated = { ...prev, [name]: newValue };
      if (name === "dataNascimento") {
        updated.idade = calcularIdade(newValue).toString();
      }
      return updated;
    });
  } else if (camposEndereco.includes(name)) {
    setFormDataPaciente((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [name]: newValue,
      },
    }));
  } else {
    setFormDataConsultoria((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    
    const pacienteFormatado = {
      ...formDataPaciente,
      dataNascimento: formatarDataParaEnvio(formDataPaciente.dataNascimento),
    };

    
    const idPaciente = await cadastrarPaciente(pacienteFormatado);
    
    const consultoriaFormatada = {
      ...formDataConsultoria,
      pacienteId: idPaciente,
      dataConsultoria: formatarDataParaEnvio(formDataConsultoria.dataConsultoria),
    };

    await cadastrarConsultoria(consultoriaFormatada);
    setFormDataPaciente({
      nome: "",
      idade: "",
      dataNascimento: "",
      telefone1: "",
      telefone2: "",
      endereco: {
        logradouro: "",
        complemento: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
      },
    });
    setFormDataConsultoria({
      pacienteId: "",
      usuarioId: "1",
      equipeId: "",
      solicitante: "",
      unidadeSaude: "",
      dataConsultoria: "",
    });
    toast.success("Consultoria Cadastrada!")
  } catch {
    toast.error("Erro ao cadastrar!")
  }
};

  return (
  <Card className={`${styles.card_cadastro_consultoria} container`}>
    <h2>Cadastro Consultoria</h2>
    <form onSubmit={handleSubmit}>
      <div className={styles.container_input}>
        <div className={styles.form_group}>
          <label htmlFor="nome">Nome</label>
          <input className={styles.input_nome} name="nome" type="text" value={formDataPaciente.nome}
            onChange={handleChange} required/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="dataNascimento">Data Nascimento</label>
          <input
            className={styles.input_data_nascimento}
            name="dataNascimento"
            type="date"
            placeholder="dd/mm/aaaa"
            value={formDataPaciente.dataNascimento}
            onChange={handleChange}
            required 
             />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="idade">Idade</label>
          <input className={styles.input_idade} name="idade" type="number" value={formDataPaciente.idade}
            onChange={handleChange} required/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="telefone1">Telefone 1</label>
          <input className={styles.input_telefone} name="telefone1" type="text" value={formDataPaciente.telefone1}
            onChange={handleChange} placeholder="(00)00000-0000" required/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="telefone2">Telefone 2</label>
          <input className={styles.input_telefone} name="telefone2" type="text" value={formDataPaciente.telefone2}
            onChange={handleChange} placeholder="(00)00000-0000" required/>
        </div>
      </div>

      <div className={styles.container_input}>
        <div className={styles.form_group}>
          <label htmlFor="logradouro">Logradouro</label>
          <input className={styles.input_rua} name="logradouro" type="text" value={formDataPaciente.endereco.logradouro}
            onChange={handleChange}  required/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="complemento">Complemento</label>
          <input className={styles.input_complemento} name="complemento" type="text"
            value={formDataPaciente.endereco.complemento} onChange={handleChange} required/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="numero">Número</label>
          <input className={styles.input_numero} name="numero" type="number" value={formDataPaciente.endereco.numero}
            onChange={handleChange} required/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="bairro">Bairro</label>
          <input className={styles.input_bairro} name="bairro" type="text" value={formDataPaciente.endereco.bairro}
            onChange={handleChange} required/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="cidade">Cidade</label>
          <input className={styles.input_cidade} name="cidade" type="text" value={formDataPaciente.endereco.cidade}
            onChange={handleChange} required/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="estado">Estado</label>
          <input className={styles.input_estado} name="estado" type="text" value={formDataPaciente.endereco.estado}
            onChange={handleChange} required/>
        </div>
      </div>

      <div className={styles.container_input}>
        <div className={styles.form_group}>
          <label htmlFor="solicitante">Solicitante</label>
          <input className={styles.input_solicitante} name="solicitante" type="text"
            value={formDataConsultoria.solicitante} onChange={handleChange} />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="equipe">Equipe</label>
          <select className={styles.input_equipe} name="equipeId" value={formDataConsultoria.equipeId}
            onChange={handleChange}>
            <option value="">Equipes</option>
            {equipes.map((equipe) => (
            <option key={equipe.id} value={equipe.id}>
              {equipe.nome}
            </option>
            ))}
          </select>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="unidadeSaude">Unidade Saúde</label>
          <input className={styles.input_unidade_saude} name="unidadeSaude" type="text"
            value={formDataConsultoria.unidadeSaude} onChange={handleChange} required/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="dataConsultoria">Data Consultoria</label>
          <input className={styles.input_data_consultoria} name="dataConsultoria" type="date"
            value={formDataConsultoria.dataConsultoria} onChange={handleChange} required/>
        </div>
      </div>

      <div className={styles.container_btn}>
        <button type="submit" className={styles.btn_salvar}>
          Salvar
        </button>
      </div>
    </form>
  </Card>
  );
  };