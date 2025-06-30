const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(texto) {
    return new Promise((resolve) => {
        rl.question(texto, (resposta) => {
            resolve(resposta);
        });
    });
}

async function calcularMilhas() {
    let milhas = parseFloat(await perguntar('Digite a quantidade de milhas: '));
    let milheiro = parseFloat(await perguntar('Digite o valor do milheiro (R$): '));
    let taxas = parseFloat(await perguntar('Digite o valor das taxas (R$): '));

    let adicionarPercentualResposta = await perguntar('Adicionar 1% ao total? (s/n): ');
    let adicionarPercentual = adicionarPercentualResposta.toLowerCase() === 's';

    let valorBase = (milhas / 1000) * milheiro;
    if (adicionarPercentual) {
        valorBase *= 1.01;
    }

    let totalPago = valorBase + taxas;

    console.log(`\nTotal pago pelo comprador: R$ ${totalPago.toFixed(3)}\n`);

    let teveDiferencaResposta = await perguntar('Teve diferença nas milhas? (s/n): ');

    if (teveDiferencaResposta.toLowerCase() === 's') {
        let novaMilhagem = parseFloat(await perguntar('Digite a nova quantidade de milhas: '));
        let novoValorTaxas = parseFloat(await perguntar('Digite o novo valor das taxas (R$): '));

        let diferenca = novaMilhagem - milhas;

        if (diferenca > 0) {
            // Diferença positiva (comprador deve pagar mais)
            let valorAdicional = (novaMilhagem / 1000) * milheiro * 1.01 + novoValorTaxas - totalPago;
            let novoRepasse = (novaMilhagem / 1000) * milheiro + novoValorTaxas;

            console.log(`\nValor a pagar pelo comprador: R$ ${valorAdicional.toFixed(3)}`);
            console.log(`Novo valor de repasse: R$ ${novoRepasse.toFixed(3)}\n`);

        } else if (diferenca < 0) {
            // Diferença negativa (comprador deve ser reembolsado)
            let valorReembolso = (novaMilhagem / 1000) * milheiro * 1.01 + novoValorTaxas - totalPago;
            let novoRepasse = (novaMilhagem / 1000) * milheiro + novoValorTaxas;

            console.log(`\nValor a reembolsar ao comprador: R$ ${Math.abs(valorReembolso).toFixed(3)}`);
            console.log(`Novo valor de repasse: R$ ${novoRepasse.toFixed(3)}\n`);

        } else {
            console.log("\nNão houve diferença nas milhas.\n");
        }
    } else {
        console.log("\nCálculo finalizado sem diferença nas milhas.\n");
    }

    rl.close();
}

calcularMilhas();