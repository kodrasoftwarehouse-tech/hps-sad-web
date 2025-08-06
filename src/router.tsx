import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { CadastroConsultoria } from "./pages/consultoria/cadastro";
import { SalaEspera } from "./pages/consultoria/salaEspera";
import Layout from "./pages/Layout";
import { HomeDriver } from "./driver-pages/home";
import { ConsultoriaVisita } from "./pages/visita/consultoria";
import { SelecionarVeiculo } from "./driver-pages/selecionar-veiculo";
import { Acompanhamento } from "./pages/visita/acompanhamento";
import { VisitasDriver } from "./driver-pages/visitas";
import { MotoristaProviderLayout } from "./driver-pages/MotoristaProviderLayout";
import { Login } from "./pages/login";

export const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cadastro",
        element: <CadastroConsultoria />,
      },
      {
        path: "sala-espera",
        element: <SalaEspera />,
      },
      {
        path: "agendar",
        element: <CadastroConsultoria />,
      },
      {
        path: "consultorias",
        element: <ConsultoriaVisita />,
      },
      {
        path: "acompanhamento",
        element: <Acompanhamento />,
      },
      {
        path: "motorista",
        element: <MotoristaProviderLayout />,
        children: [
          {
            index: true,
            element: <HomeDriver />,
          },
          {
            path: "veiculos",
            element: <SelecionarVeiculo />,
          },
          {
            path: "visitas",
            element: <VisitasDriver />,
          },
        ],
      },
    ],
  },
]);
