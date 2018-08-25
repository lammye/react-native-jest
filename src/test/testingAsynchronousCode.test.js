import { throws, rejects } from "assert";

describe('callback', () => {
    async function fetchData(callback) {
        return setTimeout(() => {
            callback('peanut butter');
        }, 500);
    }
    // Don't do this!
    test('the data is peanut butter', () => {
        function callback(data) {
            expect(data).toBe('peanut butter');
        }

        fetchData(callback);
    });

    test('the data is peanut butter', done => {
        function callback(data) {
          expect(data).toBe('peanut butter');
          done();
        }
      
        fetchData(callback);
      });
})

async function fetchData() {
    return new Promise((resolve, reject) => {
        return resolve('peanut butter')
    });
}

async function fetchDataWithError() {
    return new Promise((resolve, reject) => {
        return reject('error');
    });
}

describe('promises', () => {
    test('the data is peanut butter', () => {
        expect.assertions(1);
        return fetchData().then(data => {
          expect(data).toBe('peanut butter');
        });
      });


    test('the fetch fails with an error', () => {
        expect.assertions(1);
        return fetchDataWithError().catch(e => expect(e).toMatch('error'));
    });
})

describe('.resolves / .rejects', () => {
    test('the data is peanut butter', () => {
        expect.assertions(1);
        return expect(fetchData()).resolves.toBe('peanut butter');
    });

    test('the fetch fails with an error', () => {
        expect.assertions(1);
        return expect(fetchDataWithError()).rejects.toMatch('error');
    });
})

describe('Async/Await', () => {
    test('the data is peanut butter', async () => {
        expect.assertions(1);
        const data = await fetchData();
        expect(data).toBe('peanut butter');
    });
      
    test('the fetch fails with an error', async () => {
        expect.assertions(1);
        try {
          await fetchDataWithError();
        } catch (e) {
          expect(e).toMatch('error');
        }
    });

    test('the data is peanut butter', async () => {
        expect.assertions(1);
        await expect(fetchData()).resolves.toBe('peanut butter');
    });
      
    test('the fetch fails with an error', async () => {
        expect.assertions(1);
        await expect(fetchDataWithError()).rejects.toMatch('error');
    });
})
