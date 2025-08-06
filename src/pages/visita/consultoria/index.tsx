import { useEffect, useState } from "react";
import { Card } from "../../../components/card"
import styles from "./consultoriaVisita.module.css"
import { UseListarEquipes } from "../../../hooks/desktop/UseListarEquipes";
import { UseListarConsultoria } from "../../../hooks/desktop/UseListarConsultoria";
import type { IConsultoriaResponse } from "../../../utils/interfaces";
import { ModalClassificacaoVisita } from "./modalAgendarConsultoria";


export const ConsultoriaVisita = () => {
    const [equipeId, setEquipeId] = useState("");
    const {equipes} = UseListarEquipes();
	const {listarConsultoriaVisita} = UseListarConsultoria()
	const [consultorias, setConsultorias] = useState<IConsultoriaResponse[]>([]);
	const [modalClassificacao, setModalClassificacao] = useState(false)
	

	useEffect(() => {
		if (equipes.length > 0) {
			setEquipeId(String(equipes[0].id));
			}
			}, [equipes]);

	const carregarConsultorias = async () => {
	if (equipeId) {
		try {
			const resultado = await listarConsultoriaVisita(equipeId);
			setConsultorias(resultado.data);
		} catch (error) {
			console.error("Erro ao listar consultorias:", error);
			}
		}
	};

	useEffect(() => {
		carregarConsultorias();
		}, [equipeId]);


	const handleAgendarVisita = ()=>{
		setModalClassificacao(true)
	}	

    return (
        <div>
			<h2 className={styles.titulo}>Consultorias</h2>
            <div className="container">
				<select className={styles.select_consultoria_visita} name="equipeId" value={equipeId} onChange={(e)=>
					setEquipeId(e.target.value)}
					>
					{equipes.map((equipe) => (
					<option key={equipe.id} value={equipe.id}>
						{equipe.nome}
					</option>
					))}
				</select>
			</div>
               {consultorias.length === 0 ? (
				<p className={styles.mensagem_vazia}>Nenhuma consultoria para esta equipe.</p>
				) : (
				consultorias.map((consultoria) => (
				<Card key={consultoria.id} className={`${styles.card_content_consultoria} container`}>
					<div className={styles.content}>
						<div className={styles.info}>
							<h3>{ consultoria.paciente.nome
								.toLowerCase()
								.split(" ")
								.map(p => p.charAt(0).toUpperCase() + p.slice(1))
								.join(" ")}</h3>
							<p>Telefone: {consultoria.paciente.telefone1}</p>
							<p>Status: {consultoria.statusSala?.replace(/_/g, " ")}</p>
						</div>
						<div>
							<button onClick={handleAgendarVisita} className={styles.btn}>Agendar Visita</button>
					    </div>
					</div>
					<ModalClassificacaoVisita
					isOpen={modalClassificacao}
					onClose={()=> setModalClassificacao(false)}
					onSave={carregarConsultorias}
					pacienteId={consultoria.paciente.id}
					equipeId ={consultoria.equipe.id}
					/>
				</Card>
				))
				)}
        </div>
    )
}