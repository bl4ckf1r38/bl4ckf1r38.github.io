// Função de cálculo isolada para teste no console
function calcularMilhas(milhas, milheiro, taxas, adicionarPercentual) {
    if (isNaN(milhas) || isNaN(milheiro) || isNaN(taxas)) {
        return "Erro: todos os campos precisam ser números.";
    }

    let valorBase = (milhas / 1000) * milheiro;

    if (adicionarPercentual) {
        valorBase *= 1.01; // Acrescenta 1%
    }

    let valorFinal = valorBase + taxas;

    return `Total: R$ ${valorFinal.toFixed(2)}`;
}

// Testes simulados
console.log(calcularMilhas(10000, 20, 50, true));  // Com 1%
console.log(calcularMilhas(10000, 20, 50, false)); // Sem 1%
console.log(calcularMilhas(15000, 18, 80, true));  // Outro exemplo