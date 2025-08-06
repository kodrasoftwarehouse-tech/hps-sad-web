export interface PacienteProps{
    nome: string,
    idade: string,
    dataNascimento: string,
    telefone1: string,
    telefone2: string,
    endereco:{
        logradouro: string,
        complemento: string,
        numero: string,
        bairro:string,
        cidade: string,
        estado:string,
    }
}

export interface UsuarioProps{
  id:number;
  email:string;
  nome:string;
  roles:string;

}

export interface IUsuarioResponse {
  id: number;
  nome: string;
  telefone1:string;
  telefone2:string;
  endereco:{
    id: string;
  }
}


export interface ConsultoriaProps{
    pacienteId:string,
    usuarioId:string,
    equipeId: string,
    solicitante: string,
    unidadeSaude: string,
    dataConsultoria: string,
}


export interface IEquipeResponse {
  id: number;
  nome: string;

}

export interface IConsultoriaResponse {
  id: number;
  paciente: IUsuarioResponse;
  equipe: IEquipeResponse;
  unidadeSaude: string;
  dataConsultoria: string; 
  solicitante: string;
  hora: string;
  statusBaixa: string;
  modalidadeVisita: string;
  statusSala: string;
}


export interface ICorridaResponse{
  id:number
}

export interface IRelatorioResponse{
  id: number;
}

export interface IVisitaReponse{
  id: number;
  paciente: PacienteProps;
  corrida: ICorridaResponse;
  usuario: IUsuarioResponse;
  equipe: IEquipeResponse;
  relatorio: IRelatorioResponse;
  horaInicial: string;
  horaFinal: string;
  classificacao: string;
  statusVisita: string;
}

export interface VeiculoProps{
  id:number;
  placa:string;
  modelo:string;
  kmRodado: string;
  kmAtual:string;
  latitude:string;
  longitude:string;
  status:boolean
}

export interface PosicaoVeiculoProps{
  latitude: string;
  longitude:string;
}

export interface CorridaIniciarProps{
     veiculoId: string;
     usuarioId: string;
     kmInicial:string;
     posicaoInicial: PosicaoVeiculoProps;
     tipoCorrida: string;
     outrosDescricao?:string;

}

export interface CorridaFinalizarProps{
  corridaId?:number;
  kmFinal: string;
  posicaoFinal:PosicaoVeiculoProps;
  motivoCancelamento?:string;
}

