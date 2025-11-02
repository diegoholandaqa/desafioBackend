import { test, expect } from '@playwright/test';
import { generateBookData } from '../fixtures/book_fixture';
import { apiRequest, createRequestContext } from '../fixtures/api_helper';

test('Recuperar todos os livros', async () => {
    const request = await createRequestContext();
    const response = await apiRequest(request, 'GET', `/api/v1/Books`);

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    console.log('Livro recuperado:', JSON.stringify(body, null, 2));
});

test('Recuperar livro via id e exibe o json do livro', async () => {
    const request = await createRequestContext();
    const bookId = 10;

    const response = await apiRequest(request, 'GET', `/api/v1/Books/${bookId}`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    console.log('Livro recuperado:', JSON.stringify(body, null, 2));
});

test.skip('Recuperar livro criado', async () => {
// Nao é possível recuperar o livro criado em outro teste, pois a API é fake e os dados não persistem entre as requisições.
    const request = await createRequestContext();
    const bookData = generateBookData();


    const getAllBooks = await apiRequest(request, 'GET', '/api/v1/Books', bookData);
    expect(getAllBooks.ok()).toBeTruthy();
    const books = await getAllBooks.json();

    const createdBook = books.find((b: any) => b.title === bookData.title);
    expect(createdBook).toBeDefined();
    const bookId = createdBook.id;

    const response = await apiRequest(request, 'GET', `/api/v1/Books/${bookId}`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.id).toBe(bookId);
    expect(body.title).toBe(bookData.title);
    console.log('Livro recentemente criado recuperado:', JSON.stringify(body, null, 2));   
});

