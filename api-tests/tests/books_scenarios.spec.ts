import { test, expect } from '@playwright/test';
import { generateBookData } from '../fixtures/book_fixture';
import { apiRequest, createRequestContext } from '../fixtures/api_helper';

test('Fluxo completo de CRUD de Livros (encadeado)', async () => {
    const errors: string[] = [];
    const successes: string[] = [];
    const request = await createRequestContext();
    const bookData = generateBookData();

    successes.push(`Sucessos fluxo completo de CRUD de Livros`);
    errors.push(`Erros no fluxo completo de CRUD de Livros:`);
  // Criar livro
  await test.step('Criar livro', async () => {
    try{
    const response = await apiRequest(request, 'POST', '/api/v1/Books', bookData);
    console.log('Livro criado com sucesso, segue JSON:', JSON.stringify(await response.json(), null, 2));
    expect(response.ok()).toBeTruthy();
    const createdBook = await response.json();
    bookData.id = createdBook.id;
    successes.push(`Teste Criar livro - Livro criado com id ${bookData.id}`);
      } catch (error) {
        errors.push(`Teste Criar livro - Erro ao criar livro`);
      }
  });

  // Atualizar livro
  await test.step('Atualizar título do livro criado', async () => {
    try{
    const updatedBook = { ...bookData, title: 'Título Atualizado via PUT'};
    console.log('Livro atualizado com sucesso, segue JSON:', JSON.stringify(updatedBook, null, 2));
    const putResp = await apiRequest(request, 'PUT', `/api/v1/Books/${bookData.id}`, updatedBook);
    expect(putResp.ok()).toBeTruthy();
    const putBody = await putResp.json();
    expect(putBody.title).toBe('Título Atualizado via PUT');
    successes.push(`Teste Atualizar título do livro criado - Livro atualizado com id ${bookData.id}`);
    } catch (error) {
      errors.push(`Teste Atualizar livro criado - Erro ao atualizar livro com id ${bookData.id}`);
    }
  });

  // Buscar livro atualizado
  await test.step('Buscar livro atualizado', async () => {
    const auxbookData = bookData;
    try{
    const getResponse = await apiRequest(request, 'GET', `/api/v1/Books/${auxbookData.id}`);
    expect(getResponse.ok()).toBeTruthy();
    const book = await getResponse.json();
    console.log('Livro buscado com sucesso, segue JSON:', JSON.stringify(book, null, 2));
    expect(book.id).toBe(auxbookData.id);
    expect(book.title).toBe('Livro Atualizado via PUT');
    successes.push(`Teste Buscar livro atualizado - Livro buscado com id ${auxbookData.id}`);
    } 
    catch (error) {
      errors.push(`Teste Buscar livro atualizado - Erro ao buscar livro com id ${auxbookData.id}`);
    }
  });

  // Excluir livro com id inexistente
  await test.step('Deletar livro com id inexistente', async () => {
    const fakeId = Number(new Date().getTime().toString().slice(-11));
    try{
    const deleteResponse = await apiRequest(request, 'DELETE', `/api/v1/Books/${fakeId}`);
    expect(deleteResponse.ok()).toBeTruthy();
    expect(deleteResponse.status()).toBeGreaterThanOrEqual(400);
    successes.push(`Teste Deletar livro com id inexistente - Tentativa de deletar livro com id inexistente ${fakeId} retornou status ${deleteResponse.status()}`);
    } catch (error) {
      errors.push(`Teste Deletar livro com id inexistente - Erro ao deletar livro com id inexistente ${fakeId}`); 
    }

  });

  // Criar livro inválido com pageCount -5
await test.step('Criar livro inválido com pageCount negativo', async () => {
    try{
    const request = await createRequestContext();    
    const bookData = generateBookData();
    const invalidBook = { ...bookData, pageCount: -5 }; 
    const response = await apiRequest(request, 'POST', '/api/v1/Books', invalidBook);

    console.log('Resposta ao tentar criar livro inválido:', JSON.stringify(await response.json(), null, 2));
    expect(response.status()).toBeGreaterThanOrEqual(400);
    successes.push(`Teste - Criar livro inválido com pageCount negativo: Tentativa de criar livro inválido retornou status ${response.status()}`);
    } catch (error) {
      errors.push(`Teste - Criar livro inválido com pageCount negativo: Foi possível criar livro com pageCount negativo`);
    }
  });
  console.log(successes)
  console.log(errors)
});