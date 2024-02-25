let totalDeTarefas = 0; /* Para mostrar a quantidade de tarefas. */
let totalDeTarefasConcluidas = 0; /* Para mostrar a quantidade de tarefas clicadas no checkbox. */
var conjuntoDeTarefas = new Set(); /* Cria um conjunto vazio para impedir o cadastro repetido de tarefas. */

function adicionarTarefa() {
    var tarefa = document.getElementById('tarefaInput').value;
    var tarefaMinusculas = tarefa.toLowerCase(); // Converte a tarefa para minúsculas para a verificação
    tarefaMinusculas = tarefaMinusculas.trim();
    if (tarefa.trim()) {
        if (!conjuntoDeTarefas.has(tarefaMinusculas)) { // Verifica se a tarefa já existe no conjunto
            totalDeTarefas++;
            conjuntoDeTarefas.add(tarefaMinusculas); // Adiciona a tarefa no conjunto em minúsculas
            var tabela = document.getElementById('tabelaTarefas');
            var linha = tabela.insertRow(-1);
            linha.style.border = '1px solid red'; // Adiciona uma borda única para cada linha de tarefa
            linha.style.backgroundColor = 'white'; // Adiciona uma cor de fundo branca para cada linha de tarefa
            var celula0 = linha.insertCell(0);
            var celula1 = linha.insertCell(1);
            var celula2 = linha.insertCell(2);
            var celula3 = linha.insertCell(3);

            /* Cada tarefa tem seu próprio botão de exclusão representado por um ícone de lixeira.
            Quando o botão de exclusão é pressionado, a tarefa associada é excluída.
            Quando a caixa de seleção é marcada, o texto da tarefa é tachado, usando CSS.
            Quando a caixa de seleção é desmarcada, o texto da tarefa volta ao normal. */
            celula0.innerHTML = '<input type="checkbox" onchange="tacharTarefa(this)">';
            celula1.innerHTML = tarefa; // Entrada da tarefa como foi digitada
            celula2.innerHTML = '<button onclick="excluirTarefa(this)">🗑️</button>';
            celula3.innerHTML = '<br><p></p>';

            document.getElementById('tarefaInput').value = '';
            mostrarTotais();

        } else {
            if (conjuntoDeTarefas.has(tarefaMinusculas)) {
                alert("Tarefa já cadastrada!");
            }
        }
    } else {
        alert("Falta informar uma tarefa!");
        document.getElementById('tarefaInput').value = '';
    }
}

function excluirTarefa(botao) {
    var linha = botao.parentNode.parentNode;
    var celulaTarefa = linha.cells[1];
    var tarefa = celulaTarefa.innerHTML;
    var celulaConcluido = linha.cells[0];
    var checkbox = celulaConcluido.children[0]; // obtém o elemento checkbox
    var concluido = checkbox.checked; // verifica se o checkbox está marcado
    var tarefaMinusculas = tarefa.toLowerCase(); // Converte a tarefa para minúsculas para a exclusão
    if (confirm(`Confirma a exclusão da tarefa ${tarefa}?`)) {
        totalDeTarefas--;
        conjuntoDeTarefas.delete(tarefaMinusculas); // Remove a tarefa do conjunto
        linha.parentNode.removeChild(linha);
        if (concluido) {
            totalDeTarefasConcluidas--;
        }
        document.getElementById('tarefaInput').value = '';
        mostrarTotais();
    }
}

/* Quando a caixa de seleção é marcada, o texto da tarefa é tachado, usando CSS.
Quando a caixa de seleção é desmarcada, o texto da tarefa volta ao normal. */
function tacharTarefa(checkbox) {
    var celulaTarefa = checkbox.parentNode.nextSibling;
    if (checkbox.checked) {
        celulaTarefa.classList.add('tarefa-concluida');
        totalDeTarefasConcluidas++;
    } else {
        celulaTarefa.classList.remove('tarefa-concluida');
        totalDeTarefasConcluidas--;
    }
    mostrarTotais();
}

function mostrarTotais() {
    document.title = "Tarefas/concluídas: " + totalDeTarefas + "/" + totalDeTarefasConcluidas;

    const taskCountElement = document.createElement("div");
    taskCountElement.id = "taskCount";
    taskCountElement.style.display = "inline"; // Estilo para exibir em uma única linha
    taskCountElement.innerHTML = `<br><strong>Total de tarefas:</strong> ${totalDeTarefas} | <strong>Total de tarefas concluídas:</strong> ${totalDeTarefasConcluidas}`;

    const taskList = document.getElementById("tabelaTarefas");
    taskList.parentNode.replaceChild(taskCountElement, taskList.nextSibling); // Substitui os totais anteriores por atualizados
}
