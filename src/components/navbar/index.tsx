import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./navbar.module.css";

type MenuKey = "consultoria" | "visita" | "detalhe" | "relatorio" | null;

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const navigate = useNavigate();
  const toggleMenu = (menu: MenuKey) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
  };

  return (
    <nav className={styles.container_nav}>


      <div className={`container ${styles.nav_inner}`}>
        {["consultoria", "visita", "detalhe", "relatorio"].map((menu) => (
          <div className={styles.menuItem} key={menu}>
            <div
              className={styles.title}
              onClick={() => toggleMenu(menu as MenuKey)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter") toggleMenu(menu as MenuKey);
              }}
            >
              {menu.charAt(0).toUpperCase() + menu.slice(1)}
            </div>

             

            {openMenu === menu && (
              <ul className={styles.dropdown}>
                {menu === "consultoria" && (
                  <>
                    <li className={styles.option} onClick={() => {setOpenMenu(null); navigate("cadastro")}}>Cadastro</li>
                    <li className={styles.option} onClick={() =>{setOpenMenu(null); navigate("sala-espera")}}>Sala Espera</li>
                  </>
                )}
                {menu === "visita" && (
                  <>
                    <li className={styles.option} onClick={() => setOpenMenu(null)}>Agendar</li>
                    <li className={styles.option} onClick={() => {setOpenMenu(null); navigate("consultorias")}}>Consultorias</li>
                    <li className={styles.option} onClick={() => {setOpenMenu(null); navigate("acompanhamento")}}>Acompanhamento</li>
                  </>
                )}
                {menu === "detalhe" && (
                  <>
                    <li className={styles.option} onClick={() => setOpenMenu(null)}>Ver Detalhes</li>
                    <li className={styles.option} onClick={() => setOpenMenu(null)}>Editar</li>
                  </>
                )}
                {menu === "relatorio" && (
                  <>
                    <li className={styles.option} onClick={() => setOpenMenu(null)}>Gerar</li>
                    <li className={styles.option} onClick={() => setOpenMenu(null)}>Exportar</li>
                  </>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};
