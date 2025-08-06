import { createContext, useContext, useState, type PropsWithChildren } from "react";



export interface Veiculo {
  id: number;
  modelo: string;
  placa: string;
  status:boolean
}

interface VeiculoContextProps {
  veiculoSelecionado: Veiculo | null;
  setVeiculoSelecionado: (veiculo: Veiculo | null) => void;
}

const VeiculoContext = createContext<VeiculoContextProps | undefined>(undefined);

export const VeiculoProvider = ({ children }:  PropsWithChildren ) => {
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculo | null>(null);

  return (
    <VeiculoContext.Provider value={{ veiculoSelecionado, setVeiculoSelecionado }}>
      {children}
    </VeiculoContext.Provider>
  );
};

export const useVeiculo = (): VeiculoContextProps => {
  const context = useContext(VeiculoContext);
  if (!context) {
    throw new Error("useVeiculo deve ser usado dentro de um VeiculoProvider");
  }
  return context;
};
