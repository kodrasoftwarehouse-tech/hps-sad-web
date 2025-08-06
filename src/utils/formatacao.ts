export function formatarTelefone(valor: string): string {
  const telefone = valor.replace(/\D/g, "").slice(0, 11);

  if (telefone.length <= 2) {
    return `(${telefone}`;
  } else if (telefone.length <= 6) {
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
  } else {
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
  }
}

export const calcularIdade = (dataNascimento: string): number => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};


export const formatarDataParaExibicao = (isoDate: string) => {
  if (!isoDate) return "";
  const [ano, mes, dia] = isoDate.split("-");
  return `${dia}/${mes}/${ano}`;
};

export const formatarDataParaEnvio = (data: string) => {

  const regexISO = /^\d{4}-\d{2}-\d{2}$/;
  if (regexISO.test(data)) {
    return data;
  }

  const partes = data.split("/");
  if (partes.length === 3) {
    const [dia, mes, ano] = partes;
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }

  return "";
};
