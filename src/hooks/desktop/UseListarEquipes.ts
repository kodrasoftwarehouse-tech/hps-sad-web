import { useEffect, useState } from "react";
import api from "../../apiConfig/api";


interface EquipeProps{
    id:number;
    nome: string;
}

export const UseListarEquipes = () => {
	const [equipes, setEquipes] = useState<EquipeProps[]>([]);

	const listar = async () => {
		const resp = await api.get("equipe/listar");
		setEquipes(resp.data);
	};

	useEffect(() => {
		listar();
	}, []);

	
	return { equipes };
};
