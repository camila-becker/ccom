function emailPorFilial(filial) {
  switch (filial) {
    case "01 - CAN":
      return "expedicao@modular.com.br, coletas@modular.com.br, luiz.oliveira@modular.com.br, felipe.ranzan@modular.com.br, lipe@modular.com.br";
    case "03 - SAO":
      return "expedicaosp@modular.com.br, coletassp@modular.com.br, marcos.marques@modular.com.br, eder@modular.com.br";
    case "04 - RIO":
      return "expedicaorio@modular.com.br, operacionalrio@modular.com.br, monitoramentorio@modular.com.br, renato.goncalves@modular.com.br, catia.pereira@modular.com.br";
    case "05 - CXS":
      return "expedicao.cxs@modular.com.br, antonio.conceicao@modular.com.br, sidiclei.almeida@modular.com.br, moises.salib@modular.com.br";
    case "06 - CTB":
      return "expedicaoctba@modular.com.br, coletasctba@modular.com.br, supervisor.ctba@modular.com.br, everton.morais@modular.com.br";
    case "13 - FOR":
      return "expedicaofor@modular.com.br, coletasfor@modular.com.br, encarregado.for@modular.com.br, cristiane.vieira@modular.com.br";
    case "29 - CMP":
      return "expedicaocmp@modular.com.br, douglas.souza@modular.com.br, eder@modular.com.br";
    case "33 - LND":
      return "expedicao.lnd@modular.com.br, fabricio.andrade@modular.com.br";
    case "56 - SSA":
      return "expedicaossa@modular.com.br, joana.ribeiro@modular.com.br, gilton.santos@modular.com.br, rodrigo.carvalho@modular.com.br";
    case "64 - JOI":
      return "expedicaojoi@modular.com.br, coletasjoi@modular.com.br, willian.dutra@modular.com.br, gilnei.matias@modular.com.br";
    case "65 - BHZ":
      return "expedicaobhz@modular.com.br, sergio.santos@modular.com.br, clodoaldo.ribeiro@modular.com.br, eder@modular.com.br";
    case "66 - VIX":
      return "expedicaovix@modular.com.br, coletasvix@modular.com.br, regiani.bobbio@modular.com.br, eder@modular.com.br";
    case "67 - REC":
      return "expedicaorec@modular.com.br, lidia.oliveira@modular.com.br, leandro.silva@modular.com.br, micarla.marques@modular.com.br";
    case "68 - MCZ":
      return "sacmcz@modular.com.br, danilo.lima@modular.com.br";
    case "94 - AAX":
      return "expedicao.aax@modular.com.br, jose.neto@modular.com.br";
  }
}

function verificarMotivo(motivo) {
  if (
    motivo === "VIA sem SMP (Modular)" ||
    motivo === "E/C sem SMP (Modular)"
  ) {
    return `
    <p>
      Veículos da <strong>FROTA</strong>, devem ter SMP em monitoramento, independente do valor da carga!
    </p>
    <p style="color: red">
      <strong>ATENÇÃO!</strong> Ao lançar a SMP é necessário verificar se no clicktrans aparece
      a mensagem <strong>SMP APROVADA PARA MONITORAMENTO</strong>, se não estiver com essa mensagem,
      significa que a SMP ainda não está em monitoramento, sendo assim, o veículo <strong>NÃO</strong>
      deve ser liberado para viagem!
    </p>
    <p style="color: red">
      A mensagem <strong>SMP GERADA COM SUCESSO</strong> significa que ela foi enviada para gerenciadora,
      <strong>NÃO</strong> significa que ela está em <strong>monitoramento!</strong>
    </p>
    `;
  } else {
    return "";
  }
}

module.exports = { emailPorFilial, verificarMotivo };
