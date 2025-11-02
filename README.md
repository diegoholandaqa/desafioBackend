# desafioBackend
Validar um serviço de pedidos em uma API RESTful. Os dados devem ser validados, testados em encadeamento e cobrir comportamentos esperados e não esperados.


Foi criado a const fakeId para criar um id falso de pelo menos 11 caracteres, pois menos que isso a API aceitava e retornada sucesso. 
Foi possível criar um livro com o pageCount negativo. 
Todos os test.step() em books_scenarios.spec.ts estão dentro de um try/catch, pois caso um dos testes falhasse, não para a execução do teste encadeado. 
Foi criado dois arrays, um para sucesso e um para erro, são exibidos após finalizar todos os test.step()


Foi criado o arquivo books_scenarios.spec.ts para validação encadeada. 
Foram criados os testes de maneira independentes também 
Cenários criados: 
    - Criar novo livro
    - Criar novo livro com numeros de paginas negativo
    - Atualizar título do livro criado
    - Recuperar livro criado utilizando dados do fixture
    - Deletar livro com id inexistente

Foram criados outros cenários por fora do que foi pedido: 
    - Recuperar todos os livros
    - Recuperar livro via id e exibe o json do livro
    - Atualizar título de um livro qualquer passando id
    - Deletar livro criado com sucesso via id

