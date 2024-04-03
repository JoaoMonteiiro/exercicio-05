class Aula {
    constructor(){ //é chamado toda vez que a classe é instanciada
        this.aulas = JSON.parse(localStorage.getItem('tbAulas')) || []       
    }

    static fields = ['nomedaatividade','periodo','diadasemana','aulaativa']

    salva(aula){
        this.aulas.push(aula) //o push adiciona no fim do array
        localStorage.setItem('tbAulas', JSON.stringify(this.aulas))
        alert('Aula salvo com sucesso ✔')
        aula.lista() // atualiza a listagem 
        //limpando os campos
        document.getElementById('nomedaatividade').value = ''
        document.getElementById('periodo').value = ''
        document.getElementById('diadasemana').value = ''
        document.getElementById('aulaativa').value = ''
    }
    lista(){
        const tbody = document.getElementById('listaAulas')        
        const linhas = this.aulas.map(aula => {
            return `
            <tr>
               <td>${aula.nomedaatividade}</td>
               <td>${aula.periodo}</td>
               <td>${aula.diadasemana}</td>
               <td>${aula.aulaativa}</td>
            </tr>   
            `        
        })
        tbody.innerHTML = linhas.join('')
}
}
//criando o objeto cliente
const aula = new Aula()

document.getElementById('salvar').addEventListener('click', (event) => {
    event.preventDefault() //evita que a página seja recarregada
    let ativa = ''
    if(document.getElementById('aulaativa').checked){
        ativa = 'Sim'
    } else {
        ativa = 'Não'
    }

    const registro = {
        nomedaatividade: document.getElementById('nomedaatividade').value,
        periodo: document.getElementById('periodo').value,
        diadasemana: document.getElementById('diadasemana').value,
        aulaativa: ativa
    }
    //salvando os dados
    aula.salva(registro)
})

//Carregar a listagem no momento que carregar a página
window.onload = function(){
    aula.lista()
}