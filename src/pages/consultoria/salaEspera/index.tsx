import { useEffect, useState } from "react";
import { Card } from "../../../components/card";
import styles from "./salaespera.module.css";
import { ModalStatus } from "./modalStatus/modalStatus";
import { UseListarEquipes } from "../../../hooks/desktop/UseListarEquipes";
import { UseListarConsultoria} from "../../../hooks/desktop/UseListarConsultoria";
import type { IConsultoriaResponse } from "../../../utils/interfaces";
import { ModalEndereco } from "./modalEndereco/modalEndereco";
import { ModalBaixa } from "./modalBaixa/modalBaixa";
import { ModalSituacoesEspecificas } from "./modalSituacoesEspecificas";
import { ModalHospital } from "./modalHospital";
import { ModalModalidadeVisita } from "./modalModalidadeVisita";

export const SalaEspera = () => {
	const [equipeId, setEquipeId] = useState("");
	const [consultorias, setConsultorias] = useState<IConsultoriaResponse[]>([]);
	const [openModalStatus, setOpenModalStatus] = useState(false);
	const [modalEndereco, setModalEndereco] = useState(false);
	const [modalBaixa, setModalBaixa] = useState(false)
	const [modalHospitalBaixa,setModalHospitalBaixa] = useState(false)
	const [modalSituacaoEspecifica, setModalSituacaoEspecifica] = useState(false)
	const [modalModalidadeVisita,setModalModalidadeVisita] = useState(false)
	const {equipes} = UseListarEquipes();
	const {listarConsultoriaSalaEspera} = UseListarConsultoria();

	const statusFinalizar = [
		"CANCELAMENTO_SOLICITANTE",
		"ILPI",
		"INTERNACAO_HOSPITALAR",
		"MUDANCA_ENDERECO",
		"NAO_LOCALIZADO",
		"OBITO_DOMICILIAR",
		"OBITO_HOSPITALAR",
		"RECUSA_PACIENTE_FAMILIAR",
		"REINTERNACAO_HOSPITALAR",
		"SEM_REDE_APOIO",
		"SITUACOES_ESPECIFICAS"
	]

	const statusBaixa = [
		"CANCELAMENTO_SOLICITANTE",
		"ILPI",
		"NAO_LOCALIZADO",
		"OBITO_DOMICILIAR",
		"OBITO_HOSPITALAR",
		"RECUSA_PACIENTE_FAMILIAR",
		"SEM_REDE_APOIO",
	]

	const handleFinalizar = (status: string) => {
        if(status === "MUDANCA_ENDERECO"){
           setModalEndereco(true)
		}

		if(statusBaixa.includes(status)){
			setModalBaixa(true)
		}

		if(status === "SITUACOES_ESPECIFICAS"){
			setModalSituacaoEspecifica(true)
		}

		if(status === "INTERNACAO_HOSPITALAR" || status === "REINTERNACAO_HOSPITALAR"){
			setModalHospitalBaixa(true)
		}
		
	}

	

	const carregarConsultorias = async () => {
	if (equipeId) {
		try {
			const resultado = await listarConsultoriaSalaEspera(equipeId );
			setConsultorias(resultado.data);
		} catch (error) {
			console.error("Erro ao listar consultorias:", error);
			}
		}
	};

	useEffect(() => {
	if (equipes.length > 0) {
		setEquipeId(String(equipes[0].id));
		}
		}, [equipes]);

	useEffect(() => {
		carregarConsultorias();
		}, [equipeId]);

	return (
	<div>
		<div>
			<h2 className={styles.titulo}>Sala de Espera</h2>
			<div className="container">
				<select className={styles.select_sala_espera} name="equipeId" value={equipeId} onChange={(e)=>
					setEquipeId(e.target.value)}
					>
					{equipes.map((equipe) => (
					<option key={equipe.id} value={equipe.id}>
						{equipe.nome}
					</option>
					))}
				</select>
			</div>
			<div>
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
								<button className={styles.btn_status1} onClick={()=> setOpenModalStatus(true)}>
									Alterar Status
								</button>
								{statusFinalizar.includes(consultoria.statusSala) && (
								  <button className={styles.btn_status2} onClick={()=> handleFinalizar(consultoria.statusSala)}>Finalizar</button>
								)}
								{consultoria.statusSala == "AGUARDANDO_PRIMEIRA_VD" && (
								<button onClick={()=> setModalModalidadeVisita(true)} className={styles.btn_status3}>Modalidade Visita</button>
								)}
						      </div>
					</div>
					<ModalStatus
					 onSave={carregarConsultorias} 
					 consultoriaId={consultoria.id} 
					 isOpen={openModalStatus} 
					 onClose={()=> setOpenModalStatus(false)}/>
					<ModalEndereco
					 onSave={carregarConsultorias}
					 consultoriaId={consultoria.id}
					 enderecoId={consultoria.paciente.endereco.id}
					 isOpen={modalEndereco} onClose={() => setModalEndereco(false)}/>
					 <ModalBaixa
					 onSave={carregarConsultorias}
					 onClose={()=> setModalBaixa(false)}
					 isOpen={modalBaixa}
					 consultoriaId={consultoria.id}
					 status={consultoria.statusSala}
					 />	
					 <ModalSituacoesEspecificas
					  isOpen={modalSituacaoEspecifica}
					  onClose={()=> setModalSituacaoEspecifica(false)}
					  consultoriaId={consultoria.id}
					  status={consultoria.statusSala}
					  onSave={carregarConsultorias}
					  />
					  <ModalHospital
					  isOpen={modalHospitalBaixa}
					  onClose={()=> setModalHospitalBaixa(false)}
					  consultoriaId={consultoria.id}
					  status={consultoria.statusSala}
					  onSave={carregarConsultorias}
					  />
					  <ModalModalidadeVisita
					  isOpen={modalModalidadeVisita}
					  onClose={()=> setModalModalidadeVisita(false)}
					  consultoriaId={consultoria.id}
					  onSave={carregarConsultorias}
					  />
				</Card>
				))
				)}
			</div>
		</div>
	</div>
	);
	};