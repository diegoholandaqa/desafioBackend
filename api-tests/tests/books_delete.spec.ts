import { test, expect } from '@playwright/test';
import { apiRequest, createRequestContext } from '../fixtures/api_helper';


  test('Deletar livro criado com sucesso via id', async () => {
    const request = await createRequestContext();
    const bookId = 10; // ID do livro a ser deletado
    const response = await apiRequest(request, 'DELETE', `/api/v1/Books/${bookId}`);
    expect(response.ok()).toBeTruthy();
    console.log(`Livro com ID ${bookId} deletado com sucesso.`);

    // Aqui verificaria que de fato o livro foi deletado
    // contudo a API é fake e os dados não persistem entre as requisições.
    
    // const teste = await apiRequest(request, 'GET', `/api/v1/Books/${bookId}`);
    // expect(teste.status()).toBe(404);
    // console.log(`Confirmação: Livro com ID ${bookId} não encontrado após deleção.`);
    });


  //Deletar ID inexistente, aqui foi necessario criar um id de 10 digitos para que retornasse erro no endpoint
  test('Deletar ID inexistente deve falhar', async () => {
    const request = await createRequestContext();
    const fakeId = Number(new Date().getTime().toString().slice(-11));
    const response = await apiRequest(request, 'DELETE', `/api/v1/Books/${fakeId}`);
    expect(response.status()).toBeGreaterThanOrEqual(400);
    console.log('Não foi possível deletar o livro, ID inexistente.');
  });
