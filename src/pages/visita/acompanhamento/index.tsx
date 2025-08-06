import { useEffect, useState } from "react";
import { UseListarEquipes } from "../../../hooks/desktop/UseListarEquipes";
import styles from "./acompanhamento.module.css"
import { Card } from "../../../components/card";
import type { IVisitaReponse } from "../../../utils/interfaces";
import { UseVisitas } from "../../../hooks/desktop/UseVisitas";
import { toast } from "react-toastify";


export const Acompanhamento = () =>{
    const [equipeId, setEquipeId] = useState("");
    const {equipes} = UseListarEquipes();
    const [visitas, setVisitas] = useState<IVisitaReponse[]>([]);
    const {listarVisitas, deletarVisita} = UseVisitas()


    const handleDeleteVisita = async (id: number) =>{
        try {
            await deletarVisita(id)
            carregarVisitas()
            toast.success("Visita cancelada!")
        } catch {
            toast.error("Ops, algo deu errado!")
        }
    }
     

    const carregarVisitas = async () => {
	if (equipeId) {
		try {
			const resultado = await listarVisitas(equipeId);
			setVisitas(resultado.data);
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
		carregarVisitas();
		}, [equipeId]);
    
    
    return (
        <div>
            <h2 className={styles.titulo}>Acompanhamento</h2>
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
                {visitas.length === 0 ? (
                    <p className={styles.mensagem_vazia}>Nenhuma visita para esta equipe.</p>
                ):(
                    visitas.map((visita)=>(
                        <Card className={`${styles.card_content_visita} container`}>
                            <div className={styles.content}>
                            <div className={styles.info}>
                            <h3>{visita.paciente.nome
                                .toLowerCase()
								.split(" ")
								.map(p => p.charAt(0).toUpperCase() + p.slice(1))
								.join(" ")}</h3>
                            <p>status: {visita.statusVisita.replace(/_/g, " ")}</p>
                            </div>    
                            <div className={styles.btn_container}>
                            {(visita.statusVisita === "CONSULTORIA_AGENDADA" || visita.statusVisita === "AGENDADA")  && 
                            (<button onClick={()=>handleDeleteVisita(visita.id)} className={styles.btn}>Cancelar Agendamento</button>)}
                            </div>
                            </div>
                        </Card>
                    ))
                )}
			</div>
        </div>
    )
}