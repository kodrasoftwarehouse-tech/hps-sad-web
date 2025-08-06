import api from "../../apiConfig/api";
import type { ConsultoriaProps } from "../../utils/interfaces";


export const UseCadastroConsultoria =  () => {
	const cadastrarConsultoria = async (dados: ConsultoriaProps) => {
		await api.post("consultoria", dados);
	};

	return { cadastrarConsultoria };
};
