function adicionarTarefa() {
    var tarefa = document.getElementById('tarefaInput').value;
    if (tarefa) {
        var tabela = document.getElementById('tabelaTarefas');
        var linha = tabela.insertRow(-1);
        var celula1 = linha.insertCell(0);
        var celula2 = linha.insertCell(1);
        var celula3 = linha.insertCell(2);

        celula1.innerHTML = '<input type="checkbox">';
        celula2.innerHTML = tarefa;
        celula3.innerHTML = '<button onclick="excluirTarefa(this)">X</button>';

        document.getElementById('tarefaInput').value = '';
    }
}

function excluirTarefa(botao) {
    var linha = botao.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
}
