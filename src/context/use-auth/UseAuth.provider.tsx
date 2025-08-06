import { useState, type PropsWithChildren } from "react";
import { AuthContext, type LoginProps, type RegisterProps } from "./UseAuth.context";
import api from "../../apiConfig/api";
import axios from "axios";

export const AuthProvidr = ({ children }: PropsWithChildren) => {
    const [accessToken, setAccessToken] = useState<string | null>(
        sessionStorage.getItem("accessToken")
    );
    const [errorMessage, setErrorMessage] = useState<string | undefined>()

    const login = async (credentials: LoginProps) => {
        try {
            const { data } = await api.post(
                "auth/login",
                JSON.stringify(credentials),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            sessionStorage.setItem("accessToken", data.token);
            setAccessToken(data.token);
            //colocar a rota que deve ir após efetuado o login

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                }
            }
        }
    };

    const register = async (credentials: RegisterProps) => {
        try {
            await api.post(
                "auth/register",
                JSON.stringify(credentials),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            //colocar a rota aqui depois de ter feito o registro

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                }
            }
        }
    }

    const logout = async (accessToken: string) => {
        try {
            await api.post("auth/logout", {},
                {
                    headers: {
                        "Authorization": accessToken
                    }
                }
            )
            setAccessToken(null);
            sessionStorage.removeItem("accessToken")
            //aqui colocar a rota para onde ir depois do logout

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                }
            }
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, register, errorMessage }}>
            {children}
        </AuthContext.Provider>
    )
}