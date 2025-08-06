import { useState } from "react";
import styles from "./mobileNavbar.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { AiOutlineUser, AiOutlineCar } from "react-icons/ai";
import { useNavigate } from "react-router";
import { useVeiculo } from "../../context/use-veiculo/UseVeiculo";

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    navigate(option);
  };
  const {veiculoSelecionado} = useVeiculo()

  return (
    <nav className={styles.navbar}>
        <div className={styles.container_info_usuario}>
          <div className={styles.info_usuario}>
          <AiOutlineUser size={25}/>
          <p>Ronaldo</p>
          </div>
          <div className={styles.info_usuario}>
          <AiOutlineCar size={25}/>
          {!veiculoSelecionado?.placa ?
           (<p>Placa</p>)
            : 
            ( <p>{veiculoSelecionado?.placa}</p>   )}
          </div>

        </div>
        <ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <li onClick={() => handleOptionClick("veiculos")}>Selecionar Veículo</li>
        <li onClick={() => handleOptionClick("visitas")}>Visitas</li>
        <li onClick={() => handleOptionClick("manutencao")}>Manutenção</li>
        <li onClick={() => handleOptionClick("sair")}>Sair</li>
      </ul>
      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
       {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
    </nav>
  );
};
