import XLSX from "xlsx";
import fileSaver from "file-saver";

export const downloadReports = (name, data) => {
  let wb = XLSX.utils.book_new();
  wb.SheetNames.push(name);
  let ws = XLSX.utils.json_to_sheet(data);
  wb.Sheets[name] = ws;
  let wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  fileSaver.saveAs(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
    `${name}.xlsx`
  );
};

export const date = () => {
  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, "0");
  let month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let year = currentDate.getFullYear();

  return (currentDate = `${day}/${month}/${year}`);
};

export const getDifference = (date) => {
  let now = new Date();
  let splitDate = date.split("/");
  let day = splitDate[0];
  let month = splitDate[1];
  let year = splitDate[2];
  date = new Date(year, month - 1, day);

  let diff = date.getTime() - now.getTime();
  let days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return days;
};

export const capitalize = (string) => {
  if (string) {
    let words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
      let j = words[i].charAt(0).toUpperCase();
      words[i] = j + words[i].substr(1);
    }
    return words.join(" ");
  }
};

export const capitalizeOne = (string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
};

export const getItems = () => {
  const items = {
    filiais: [
      "01 - CAN",
      "03 - SAO",
      "04 - RIO",
      "05 - CXS",
      "06 - CTB",
      "07 - BLU",
      "08 - SSP",
      "09 - LAJ",
      "10 - CRI",
      "11 - FLN",
      "12 - PRP",
      "13 - FOR",
      "15 - PFO",
      "16 - STM",
      "17 - CMQ",
      "18 - PEL",
      "19 - URU",
      "20 - STR",
      "21 - CSU",
      "22 - VAC",
      "23 - NPT",
      "24 - OSO",
      "25 - LGS",
      "26 - IJU",
      "27 - TIJ",
      "28 - MAF",
      "29 - CMP",
      "30 - PEP",
      "31 - MGA",
      "32 - CAC",
      "33 - LND",
      "34 - JGS",
      "35 - JCB",
      "36 - XAP",
      "37 - RIG",
      "38 - IRS",
      "39 - ISC",
      "40 - IPR",
      "41 - ISP",
      "42 - IRJ",
      "43 - RJP",
      "44 - FBE",
      "45 - PTO",
      "46 - ERM",
      "47 - BAP",
      "48 - SLV",
      "49 - GPB",
      "50 - CEP",
      "51 - ESP",
      "52 - SJL",
      "53 - SAT",
      "54 - VNP",
      "55 - PGZ",
      "56 - SSA",
      "57 - UVT",
      "58 - SCP",
      "59 - APU",
      "60 - SAP",
      "61 - LNV",
      "62 - TEC",
      "63 - TCS",
      "64 - JOI",
      "65 - BHZ",
      "66 - VIX",
      "67 - REC",
      "68 - MCZ",
      "69 - IBA",
      "70 - IPE",
      "71 - IAL",
      "72 - AJU",
      "73 - ISE",
      "74 - JPA",
      "75 - IPB",
      "76 - NAT",
      "77 - IRN",
      "78 - ICE",
      "79 - IES",
      "80 - ITB",
      "81 - IMG",
      "82 - GRB",
      "83 - THE",
      "84 - IPI",
      "85 - SLZ",
      "86 - IMA",
      "87 - PNB",
      "88 - TUB",
      "89 - RDS",
      "90 - OFI",
      "91 - FRO",
      "92 - VDC",
      "93 - FEC",
      "94 - AAX",
      "95 - RAO",
      "96 - BAU",
      "97 - ALQ",
    ],

    vinculos: [
      "Comercial",
      "Dedicados",
      "Diretoria",
      "Encarregado",
      "Expedição",
      "Frota",
      "Gerência",
      "GR Apisul",
      "GR BrasilRisk",
      "GR Buonny",
      "GR Krona",
      "GR Sensitech",
      "Motorista Agregado",
      "Motorista Frota",
      "Motorista Terceiro",
      "Oficina",
      "Operação",
      "Parceiros",
      "Projetos",
      "RH",
      "SAC",
    ],
    gerenciadoras: ["Apisul", "Buonny", "Brasilrisk", "Sensitech", "Krona"],
    canais: ["E-mail", "Telefone", "Whatsapp"],
    gerentes: [
      "Giulian Souza - Gerente Corporativo - CAN",
      "Fabricio Junior de Andrade - Coordenador de Filial - LND",
      "Adilson Eichendorf - Gerente de Frota - CAN",
      "Lipe - Gerente Regional - CAN",
      "Everson Fernandes - Gerente de Frota - CAN",
      "Eder Amaral - Gerente Regional - SAO",
      "Marcos Marques - Gerente de Operações - SAO",
      "Cátia Pereira - Gerente de Filial - RIO",
      "Moisés Salib - Coordenador de Filial - CXS",
      "Everton Morais - Gerente Regional - CTB",
      "Fábio Kulakoski - Supervisor Operacional - CTB",
      "Cristiane Vieira - Supervisora Comercial - FOR",
      "Maycon Douglas - Encarregado de Operações - CMP",
      "Rodrigo Carvalho - Gerente Regional - SSA",
      "Rogério Rosa - Gerente de Filial - BHZ",
      "Regiani Bobbio - Supervisora Operacional - VIX",
      "Lidia Oliveira - Supervisora Operacional - REC",
      "Danilo Lima - Gerente de Filial - MCZ",
      "Roberto Castilho - Encarregado de Frota - SAO",
      "Josinaldo Júnior - Frota NE",
      "Alexsandro Velho - Encarregado de Frota - CAN",
      "Felipe Ranzan - Encarregado Operacional - CAN",
    ],
    seguradoras: [
      "ACE",
      "AIG",
      "Allianz",
      "Argo",
      "AXA",
      "Berkley",
      "Chubb",
      "Fairfax",
      "HDI",
      "Liberty",
      "Mitsui Sumitomo",
      "Sompo",
      "Starr Insurance Companies",
      "Sura",
      "Swiss Re",
      "Tokio Marine",
      "XL",
      "Zurich",
    ],
    motivos:["Conduta - Geral", "Desvio de Atenção", "Elogio (Interno / Externo)", "Faltas / Atestados",
      "Procedimentos Internos", "Ponto Mais (Registros / Atrasos)", "Reclamação (Interna / Externa)"
    ]
  };
  return items;
};

export const getRules = () => {
  const rules = {
    nome: [(nome) => !!nome || "Informe o nome!"],
    sobrenome: [(sobrenome) => !!sobrenome || "Informe o sobrenome!"],
    canal: [(canal) => !!canal || "Informe o canal de atendimento!"],
    placa: [
      (placa) => !!placa || "Informe a placa do veículo!",
      // (placa) => placa.length >= 8 || "Placa deve conter 7 caracteres!",
    ],
    filial: [(filial) => !!filial || "Informe a filial!"],
    destino: [(destino) => !!destino || "Informe a filial de destino!"],
    origem: [(origem) => !!origem || "Informe a filial de origem!"],
    expresso: [(expresso) => !!expresso || "Informe se a viagem é expressa!"],
    motivo: [(motivo) => !!motivo || "Informe o motivo!"],
    smp: [(smp) => !!smp || "Informe a SMP!"],
    gerenciadora: [
      (gerenciadora) => !!gerenciadora || "Informe a gerenciadora de risco",
    ],
    vinculo: [(vinculo) => !!vinculo || "Informe o vínculo!"],
    tipo: [(tipo) => !!tipo || "Informe o tipo de veículo"],
    numeroRastreador: [
      (rastreador) => !!rastreador || "Informe o número do rastreador",
    ],
    tecnologia: [(tecnologia) => !!tecnologia || "Informe a tecnologia"],
    motorista: [(motorista) => !!motorista || "Informe o motorista!"],
    telefone: [
      (telefone) =>
        !!telefone || "Informe o telefone de quem irá auxiliar no teste",
      // (telefone) => telefone.length >= 15 || "Telefone deve conter 11 dígitos!",
    ],
    relatorio: [(data) => !!data || "Informe a data!"],
    valor: [(valor) => !!valor || "Informe o valor!"],
    cliente: [(cliente) => !!cliente || "Informe o cliente!"],
    responsavel: [(responsavel) => !!responsavel || "Informe o responsável!"],
    cnpj: [(value) => !!value || "Informe o CNPJ!"],
    seguradora: [(seguradora) => !!seguradora || "Informe a seguradora!"],
    status: [(status) => !!status || "Informe o status!"],
    assinaturas: [
      (assinaturas) => !!assinaturas || "Informe se possui assinaturas!",
    ],
    recebimento: [
      (recebimento) => !!recebimento || "Informe a data de recebimento!",
    ],
    vencimento: [
      (vencimento) => !!vencimento || "Informe a data de vencimento!",
    ],
    email: [
      (email) => !!email || "Informe o e-mail do solicitante!",
      (email) => /.+@.+\..+/.test(email) || "Informe um e-mail válido!",
    ],
    operacao: [(operacao) => !!operacao || "Informe a operação!"],
    distancia: [(distancia) => !!distancia || "Informe a distância!"],
    cidade: [(cidade) => !!cidade || "Informe a cidade!"],
    estado: [(estado) => !!estado || "Informe o estado!"],
    jornada: [
      (jornada) => !!jornada || "Informe se possui liberação de jornada!",
    ],
    motivoFeedback: [(motivo) => !!motivo || "Informe o motivo!"],
    error: false,
    success: false,
    mandatory: false,
    multiple: false,
  };
  return rules;
};
