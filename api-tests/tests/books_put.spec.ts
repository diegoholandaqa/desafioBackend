import { test, expect } from '@playwright/test';
import { generateBookData } from '../fixtures/book_fixture';
import { apiRequest, createRequestContext } from '../fixtures/api_helper';

test.skip('Atualizar título do livro criado', async () => {
    const request = await createRequestContext();
    const bookData = generateBookData();

    const getAllBooks = await apiRequest(request, 'GET', '/api/v1/Books');
    expect(getAllBooks.ok()).toBeTruthy();
    const books = await getAllBooks.json();

    // Aqui ele iria percorrer os livros para encontrar o que teria sido criado no teste de criação de livro
    // porém como a API é fake, os dados não persistem entre as requisições.
    // De qualquer forma, deixo o código abaixo como exemplo de como seria essa validação.
  
    // const createdBook = books.find((b: any) => b.title === bookData.title);
    // expect(createdBook).toBeDefined();
    // const bookId = createdBook.id;

    // const updatedBook = { ...bookData, title: 'Título Atualizado via PUT'};
    // const putResp = await apiRequest(request, 'PUT', `/api/v1/Books/${bookId}`, updatedBook);
    // expect(putResp.ok()).toBeTruthy();

    // const putBody = await putResp.json();
    // expect(putBody.title).toBe('Título Atualizado via PUT');


});

test('Atualizar título de um livro qualquer passando id', async () => {
  const request = await createRequestContext();
  const bookId = 10;
  
  const getBook = await apiRequest(request, 'GET', `/api/v1/Books/${bookId}`);
  expect(getBook.ok()).toBeTruthy();
  const bookData = await getBook.json();

  const updatedBook = {...bookData, title: "Título Atualizado via PUT passando ID"};

  const response = await apiRequest(request, 'PUT', `/api/v1/Books/${bookId}`, updatedBook);
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.id).toBe(bookId);
  expect(body.title).toBe('Título Atualizado via PUT passando ID');

  // Aqui eu validaria se a atualização realmente ocorreu fazendo um GET no livro atualizado
  // contudo a api é uma api fake, então as alterações não persistem.
  // De qualquer forma, deixo o código abaixo como exemplo de como seria essa validação.
  
  // const getBookNt = await apiRequest(request, 'GET', `/api/v1/Books/${bookId}`);
  // const getBodyNt = await getResponse.json();
  // expect(getBodyNt.title).toBe('Título Atualizado via PUT');
});
