import { createContext, use } from "react";

export interface LoginProps {
  username: string;
  password: string;
}

export interface RegisterProps {
  username: string
	password: string
	confirmPassword: string
}

export interface AuthContextType {
    accessToken: string | null
    login: (credentials: LoginProps) => Promise<void>;
    logout: (accessToken: string) => Promise<void>;
    register: (credentials: RegisterProps) => Promise<void>;
    errorMessage: string | undefined
}

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => use(AuthContext);