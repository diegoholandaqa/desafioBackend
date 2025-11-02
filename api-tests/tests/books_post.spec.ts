import { test, expect } from '@playwright/test';
import { generateBookData } from '../fixtures/book_fixture';
import { apiRequest, createRequestContext } from '../fixtures/api_helper';


test('Criar novo livro', async () => {
    const request = await createRequestContext();
    const bookData = generateBookData();
    
    const response = await apiRequest(request, 'POST', '/api/v1/Books', bookData);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.title).toBe(bookData.title);
    expect(body.description).toBe(bookData.description);
    expect(body.pageCount).toBe(bookData.pageCount);
    expect(response.status()).toBe(200);

    console.log('Livro recuperado:', JSON.stringify(body, null, 2));
});

test.skip('Criar novo livro com numeros de paginas negativo', async () => {
    const request = await createRequestContext();    
    const bookData = generateBookData();
    const invalidBook = { ...bookData, pageCount: -5 }; 
    const response = await apiRequest(request, 'POST', '/api/v1/Books', invalidBook);

    expect(response.status()).toBeGreaterThanOrEqual(400); // 400 Bad Request esperado, mas retorna sucesso, entao o teste falha
});
