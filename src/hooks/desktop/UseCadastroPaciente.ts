import api from "../../apiConfig/api";
import type {
    PacienteProps
} from "../../utils/interfaces";


export const UseCadastroPaciente = () => {

    const cadastrarPaciente = async (dados: PacienteProps) => {
        const resp = await api.post("paciente", dados);
        return resp.data.id;
    };

    return {
        cadastrarPaciente
    };
};