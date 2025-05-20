import { test, expect } from '@playwright/test';  

test.describe('Book CRUD',  () => {
    let apiContext;
    let isbnNum1, userId, isbnNum2: string;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const BASE_URL = process.env.BASE_URL;
    const bookEndpoint = "BookStore/v1/Books";
    const userEndpoint = "Account/v1/User";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

    const requestHeader = () => ({
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json'
    });

    test.beforeAll(async( {playwright} ) => {
        apiContext = await playwright.request.newContext();

        const createUser = await apiContext.post(`${BASE_URL}/${userEndpoint}`, {
            data: {
                userName : username,
                password : password
            }
        });
        expect(createUser.ok()).toBeTruthy();
        const response = await createUser.json();
        userId = response.userID;
    });

    test('Book API Test', async() => {
        // Tests should be separated for each scenario, but due to certain limitations, I was required to combine them.
        // Get Books
        const getBooks = await apiContext.get(`${BASE_URL}/${bookEndpoint}`, {
            headers: requestHeader()
        });
        const resBook = await getBooks.json();
        isbnNum1 = resBook.books[0].isbn;
        isbnNum2 = resBook.books[1].isbn;
        expect(getBooks.ok()).toBeTruthy();
        expect(await getBooks.status()).toBe(200);

         // Create book
        const createBook = await apiContext.post(`${BASE_URL}/${bookEndpoint}`, {
            headers: requestHeader(),
            data: {
                'userId': userId,
                'collectionOfIsbns': [
                  {
                    'isbn': isbnNum1
                  }
                ]
            }
        });
        expect(createBook.ok()).toBeTruthy();
        expect(await createBook.status()).toBe(201);

        //create invalid book
        const createInvalidBook = await apiContext.post(`${BASE_URL}/${bookEndpoint}`, {
            headers: requestHeader(),
            data: {
                'userId': userId,
                'collectionOfIsbns': [
                  {
                    'isbn': '297489327498279'
                  }
                ]
            }
        });
        const responseData = await createInvalidBook.json();
        await expect(responseData.message).toEqual('ISBN supplied is not available in Books Collection!');
        expect(await createInvalidBook.status()).toBe(400);

        // Update information
        const updateBook = await apiContext.put(`${BASE_URL}/${bookEndpoint}/${isbnNum1}`, {
            headers: requestHeader(),
            data: {
                'userId': userId,
                'isbn': isbnNum2
            }
        });
        expect(await updateBook.status()).toBe(200);
        const resUpdateBook = await updateBook.json();
        expect(resUpdateBook.books[0].isbn).toEqual(isbnNum2);

        // Update information of invalid isbn
        const updateInvalidBook = await apiContext.put(`${BASE_URL}/${bookEndpoint}/${isbnNum1}`, {
            headers: requestHeader(),
            data: {
                'userId': userId,
                'isbn': '39048029'
            }
        });
        const updateResponseData = await updateInvalidBook.json();
        await expect(updateResponseData.message).toEqual('ISBN supplied is not available in Books Collection!');
        expect(await updateInvalidBook.status()).toBe(400);

        // Delete Book
        const deleteBook = await apiContext.delete(`${BASE_URL}/BookStore/v1/Book`, {
            headers: requestHeader(),
            data: {
                "isbn": isbnNum2,
                "userId": userId
              }
        });
        expect(deleteBook.ok()).toBeTruthy();
        expect(await deleteBook.status()).toBe(204);

        // Delete book with invalid 
        const deleteInvalidBook = await apiContext.delete(`${BASE_URL}/BookStore/v1/Book`, {
            headers: requestHeader(),
            data: {
                'isbn': 'sldkfjslkdjflkjas',
                'userId': userId
            }
        });
        const responseInvalidData = await deleteInvalidBook.json();
        await expect(responseInvalidData.message).toEqual(`ISBN supplied is not available in User's Collection!`);
        expect(await deleteInvalidBook.status()).toBe(400);
    });

    test.afterAll('', async() => {
        const deleteBook = await apiContext.delete(`${BASE_URL}/${userEndpoint}/${userId}` , {
            headers: requestHeader()
        });
    });
});