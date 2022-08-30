const tbody = document.querySelector('tbody')
let itens
let id

function modalCriarTarefa() {
    Swal.fire({
      title: 'Criar Tarefa',
      html:
        '<input id="id" type="hidden">' +
        '<input id="nome" class="swal2-input" placeholder="Nome">' +
        '<input id="descricao" class="swal2-input" placeholder="Descricao">',
      focusConfirm: false,
      preConfirm: () => {
        tarefa = new Object();
        tarefa.nome = document.getElementById("nome").value
        tarefa.descricao = document.getElementById("descricao").value
        salvarTarefa(tarefa);
      }
    })
}

function editarTarefa(index) {
    Swal.fire({
        title: 'Editar Tarefa',
        html:
          `<input id="id" value="${index}" type="hidden">
          <input id="nome" class="swal2-input" value="${itens[index].nome}" placeholder="Nome">
          <input id="descricao" class="swal2-input" value="${itens[index].descricao}" placeholder="Descricao"> `,
        focusConfirm: false,
        preConfirm: () => {
          tarefa = new Object();
          tarefa.nome = document.getElementById("nome").value
          tarefa.descricao = document.getElementById("descricao").value
          tarefa.id = document.getElementById("id").value
          salvarTarefa(tarefa);
        }
      })
}

function deletarTarefa(index) {
    itens.splice(index, 1)
    setItensBD()
    carregarTarefas()
}

function criarTarefa(tarefa, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${tarefa.nome}</td>
    <td>${tarefa.descricao}</td>
    <td> <button type="button" class="btn btn-outline-primary" onclick="editarTarefa(${index})">Editar</button>
        <button type="button" class="btn btn-outline-danger" onclick="deletarTarefa(${index})">Deletar</button></td>
    </td>
  `
  tbody.appendChild(tr)
}


function salvarTarefa(tarefa) {
    if (tarefa.nome == '' || tarefa.descricao == '') {
        return
    }
    if (tarefa.id !== undefined) {
        itens[tarefa.id].nome = tarefa.nome
        itens[tarefa.id].descricao = tarefa.descricao
    } else {
        itens.push({'nome': tarefa.nome, 'descricao': tarefa.descricao})
    }
    
    setItensBD()
    carregarTarefas()
    id = undefined
}

function carregarTarefas() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    criarTarefa(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

carregarTarefas()