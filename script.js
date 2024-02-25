function adicionarTarefa() {
    var tarefa = document.getElementById('tarefaInput').value;
    if (tarefa) {
        var tabela = document.getElementById('tabelaTarefas');
        var linha = tabela.insertRow(-1);
        var celula1 = linha.insertCell(0);
        var celula2 = linha.insertCell(1);
        var celula3 = linha.insertCell(2);

        /* Cada tarefa tem seu próprio botão de exclusão representado por um ícone de lixeira.
        Quando o botão de exclusão é pressionado, a tarefa associada é excluída.
        Quando a caixa de seleção é marcada, o texto da tarefa é tachado, usando CSS.
        Quando a caixa de seleção é desmarcada, o texto da tarefa volta ao normal. */
        celula1.innerHTML = '<input type="checkbox" onchange="tacharTarefa(this)">';
        celula2.innerHTML = tarefa; // Entrada da tarefa como foi digitada
        celula3.innerHTML = '<button onclick="excluirTarefa(this)">🗑️</button>';

        document.getElementById('tarefaInput').value = '';
    }
}

function excluirTarefa(botao) {
    var linha = botao.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
}

/* Quando a caixa de seleção é marcada, o texto da tarefa é tachado, usando CSS.
Quando a caixa de seleção é desmarcada, o texto da tarefa volta ao normal. */
function tacharTarefa(checkbox) {
    var celulaTarefa = checkbox.parentNode.nextSibling;
    if (checkbox.checked) {
        celulaTarefa.classList.add('tarefa-concluida');
    } else {
        celulaTarefa.classList.remove('tarefa-concluida');
    }
}
