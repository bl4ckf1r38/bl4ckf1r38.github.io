// LOGIN
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const usuario = document.getElementById('username').value;
  const senha = document.getElementById('password').value;

  if (usuario === 'Carlos' && senha === '123') {
    localStorage.setItem('usuarioLogado', usuario);
    window.location.href = 'calculadora.html';
  } else {
    alert('Usuário ou senha inválidos');
  }
});

function calcular() {
    let milhas = parseFloat(document.getElementById('milhas').value);
    let milheiro = parseFloat(document.getElementById('milheiro').value);
    let taxas = parseFloat(document.getElementById('taxas').value);
    let percentual = document.querySelector('input[name="percentual"]:checked').value;

    let total = (milhas / 1000) * milheiro;

    if (percentual === 'sim') {
        total += total * 0.01;
    }

    total += taxas;

    document.getElementById('resultado').innerHTML = `Total a pagar: R$ ${total.toFixed(3)}`;

    salvarHistorico(`Total a pagar: R$ ${total.toFixed(3)}`);

    document.getElementById('diferencaMilhas').style.display = 'block';
    document.getElementById('btnResetar').style.display = 'block';
}

function calcularDiferenca() {
    let novaMilhagem = parseFloat(document.getElementById('novaMilhagem').value);
    let novasTaxas = parseFloat(document.getElementById('novasTaxas').value);
    let milheiro = parseFloat(document.getElementById('milheiro').value);
    let percentual = document.querySelector('input[name="percentual"]:checked').value;

    let resultadoTexto = '';
    let novoTotal = (novaMilhagem / 1000) * milheiro;

    if (percentual === 'sim') {
        novoTotal += novoTotal * 0.01;
    }

    novoTotal += novasTaxas;

    let totalAnterior = parseFloat(document.getElementById('resultado').innerHTML.split('R$ ')[1]);

    if (novoTotal > totalAnterior) {
        let valorComprador = novoTotal - totalAnterior;
        let valorVendedor = (novaMilhagem / 1000) * milheiro + novasTaxas;

        resultadoTexto = `Comprador está devendo: R$ ${valorComprador.toFixed(3)}<br> Novo valor de repasse: R$ ${valorVendedor.toFixed(3)}`;
        salvarHistorico(`Diferença positiva | Comprador paga: R$ ${valorComprador.toFixed(3)} | Novo repasse: R$ ${valorVendedor.toFixed(3)}`);
    } else {
        let valorReembolso = Math.abs(totalAnterior - novoTotal);
        let valorVendedor = (novaMilhagem / 1000) * milheiro + novasTaxas;

        resultadoTexto = `Valor a reembolsar ao comprador: R$ ${valorReembolso.toFixed(3)}<br> Novo valor de repasse: R$ ${valorVendedor.toFixed(3)}`;
        salvarHistorico(`Diferença negativa | Reembolso: R$ ${valorReembolso.toFixed(3)} | Novo repasse: R$ ${valorVendedor.toFixed(3)}`);
    }

    document.getElementById('resultadoDiferenca').innerHTML = resultadoTexto;
}

function resetar() {
    location.reload();
}

function salvarHistorico(texto) {
    let historico = JSON.parse(localStorage.getItem('historico')) || [];

    let agora = new Date();
    let dia = String(agora.getDate()).padStart(2, '0');
    let mes = String(agora.getMonth() + 1).padStart(2, '0');
    let ano = agora.getFullYear();

    let horas = String(agora.getHours()).padStart(2, '0');
    let minutos = String(agora.getMinutes()).padStart(2, '0');
    let segundos = String(agora.getSeconds()).padStart(2, '0');

    let dataHora = `${dia}/${mes}/${ano} - ${horas}:${minutos}:${segundos}`;

    historico.push(`${dataHora} | ${texto}`);
    localStorage.setItem('historico', JSON.stringify(historico));
}

function alternarTema() {
    document.body.classList.toggle('dark-mode');

    let botao = document.getElementById('toggleTheme');
    if (document.body.classList.contains('dark-mode')) {
        botao.textContent = '☀️';
        localStorage.setItem('tema', 'escuro');
    } else {
        botao.textContent = '🌙';
        localStorage.setItem('tema', 'claro');
    }
}

function carregarTema() {
    let temaSalvo = localStorage.getItem('tema');
    let botao = document.getElementById('toggleTheme');

    if (temaSalvo === 'escuro') {
        document.body.classList.add('dark-mode');
        if (botao) botao.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        if (botao) botao.textContent = '🌙';
    }
}

carregarTema();


function limparHistorico() {
    if (confirm('Você tem certeza que deseja limpar o histórico?')) {
        localStorage.removeItem('historico');
        alert('Histórico limpo com sucesso!');
        location.reload();
    }
}

