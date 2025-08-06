import { useNavigate } from "react-router";
import styles from "./login.module.css";

export const Login = () => {

    const navigate = useNavigate()


    const handleLogin = () => {
        navigate("/")
    }

    return (
        
        <div className={styles.container_login}>
            <div className={styles.section1}>
              <img className={styles.banner} src="/banner_login.png" alt="" /> 
              <img src="/texto-logo.png" alt="" />
            </div>
            <div className={styles.section2}>
               <div className={styles.container_form}>
                <img src="/logo-hps.png" alt="" />
                <form action="" className={styles.formulario}>
                    <h1>Login</h1>
                
                    <input type="text" 
                    id="usuario"
                    placeholder="Usuário"
                    />
                 
                    <input type="password" 
                    id="senha"
                    placeholder="Senha"
                    />
                    <button onClick={handleLogin}>Logar</button>
                </form>
               </div>
            </div>
        </div>
    )
}