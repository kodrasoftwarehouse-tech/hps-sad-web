import { MotoristaLayout } from "./MobileLayout";
import { VeiculoProvider } from "../context/use-veiculo/UseVeiculo";

export const MotoristaProviderLayout = () => {
  return (
    <VeiculoProvider>
      <MotoristaLayout />
    </VeiculoProvider>
  );
};
