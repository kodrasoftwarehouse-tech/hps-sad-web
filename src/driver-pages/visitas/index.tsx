import { useEffect, useState } from "react"
import styles from "./visitas.module.css"
import { UseListarEquipes } from "../../hooks/desktop/UseListarEquipes"
import type { IVisitaReponse } from "../../utils/interfaces"
import { UseVisitas } from "../../hooks/desktop/UseVisitas"
import { Card } from "../../components/card"
import { ModalVisita } from "./modalVisita"

export const VisitasDriver = () => {
  const [equipeId, setEquipeId] = useState("")
  const { equipes } = UseListarEquipes()
  const [visitas, setVisitas] = useState<IVisitaReponse[] | null>(null)
  const { listarVisitas } = UseVisitas()
  const [modalVisita, setModalVisita] = useState(false)
  const [visitaSelecionada, setVisitaSelecionada] = useState<IVisitaReponse | null>(null)

  const carregarVisitas = async () => {
    if (equipeId) {
      try {
        const resultado = await listarVisitas(equipeId);
        const visitasDriver: IVisitaReponse[] = (resultado.data as IVisitaReponse[]).filter((v: IVisitaReponse) =>
          v.statusVisita === "CONSULTORIA_AGENDADA" || v.statusVisita === "AGENDADA"
        )
        setVisitas(visitasDriver);
      } catch (error) {
        console.error("Erro ao listar consultorias:", error);
      }
    }
  }

  useEffect(() => {
    if (equipes.length > 0) {
      setEquipeId(String(equipes[0].id));
    }
  }, [equipes]);

  useEffect(() => {
    carregarVisitas();
  }, [equipeId]);

  useEffect(() => {
    const corridaSalva = localStorage.getItem("corrida_visita");
    if (corridaSalva) {
      const { visita } = JSON.parse(corridaSalva);
      setVisitaSelecionada(visita);
      setModalVisita(true);
    }
  }, []);

  const handleAbrirModal = (visita: IVisitaReponse) => {
    setVisitaSelecionada(visita);
    setModalVisita(true);
  };

  const handleFecharModal = () => {
    setModalVisita(false);
    setVisitaSelecionada(null);
  };

  const handleSalvarModal = () => {
    setModalVisita(false);
    setVisitaSelecionada(null);
    localStorage.removeItem("corrida_visita");
    carregarVisitas();
  };

  return (
    <div>
      <div className={styles.container}>
        <select value={equipeId} onChange={(e) => setEquipeId(e.target.value)}>
          {equipes.map((equipe) => (
            <option key={equipe.id} value={equipe.id}>{equipe.nome}</option>
          ))}
        </select>
      </div>

      <div>
        {visitas?.length === 0 ? (
          <p className={styles.lista_vazia}>Nenhuma visita para esta equipe.</p>
        ) : (
          visitas?.map((visita) => (
            <Card key={visita.id} className={styles.card_visitas}>
              <div className={styles.info_visita}>
                <h4>{visita.paciente.nome}</h4>
                <p>Endereço</p>
                <p>{visita.paciente.endereco.logradouro}, {visita.paciente.endereco.numero}, {visita.paciente.endereco.bairro}</p>
              </div>
              <button onClick={() => handleAbrirModal(visita)} className={styles.btn}>Selecionar</button>
            </Card>
          ))
        )}
      </div>

      {visitaSelecionada && (
        <ModalVisita
          isOpen={modalVisita}
          onClose={handleFecharModal}
          onSave={handleSalvarModal}
          dados={visitaSelecionada}
        />
      )}
    </div>
  )
}
