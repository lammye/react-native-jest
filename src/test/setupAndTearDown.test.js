import { WSASERVICE_NOT_FOUND } from "constants";

describe('Repeating Setup For Many Tests', () => {
    let cities = [];
    function initializeCityDatabase() {
        cities = ['Vienna', 'San Juan'];
    }
    
    function clearCityDatabase() {
        cities = [];
    }
    
    function isCity(city) {
        return cities.includes(city);
    }

    beforeEach(() => {
        initializeCityDatabase();
      });
      
    afterEach(() => {
        clearCityDatabase();
    });
      
    test('city database has Vienna', () => {
        expect(isCity('Vienna')).toBeTruthy();
    });
    
    test('city database has San Juan', () => {
        expect(isCity('San Juan')).toBeTruthy();
    });
})

describe('One-Time Setup', () => {
    let cities = [];
    async function initializeCityDatabase() {
        return new Promise((resolve)=> {
            cities = ['Vienna', 'San Juan'];
            return resolve(cities);
        });
    }
    
    async function clearCityDatabase() {
        return new Promise((resolve)=> {
            cities = [];
            return resolve(cities);
        });

    }
    
    function isCity(city) {
        return cities.includes(city);
    }

    beforeAll(() => {
        return initializeCityDatabase();
    });

    afterAll(() => {
        return clearCityDatabase();
    });

    test('city database has Vienna', () => {
        expect(isCity('Vienna')).toBeTruthy();
    });

    test('city database has San Juan', () => {
        expect(isCity('San Juan')).toBeTruthy();
    });
})

describe('Scoping', () => {
    let cities = [];
    async function initializeCityDatabase() {
        return new Promise((resolve)=> {
            cities = ['Vienna', 'San Juan'];
            return resolve(cities);
        });
    }
    
    async function clearCityDatabase() {
        return new Promise((resolve)=> {
            cities = [];
            return resolve(cities);
        });

    }
    
    function isCity(city) {
        return cities.includes(city);
    }

    // Applies to all tests in this file
    beforeEach(() => {
        return initializeCityDatabase();
    });

    test('city database has Vienna', () => {
        expect(isCity('Vienna')).toBeTruthy();
    });

    test('city database has San Juan', () => {
        expect(isCity('San Juan')).toBeTruthy();
    });

    describe('matching cities to foods', () => {
        async function initializeFoodDatabase() {
            return new Promise((resolve)=> {
                cities = [{key:'Vienna', value:'Wiener Schnitzel'},{key:'San Juan', value:'Mofongo'}];
                return resolve(cities);
            });
        }

        function isValidCityFoodPair() {
            const args = [...arguments];
            if(2 > args.length)
                return false;
            const find = cities.find(_ => _.key == args[0]);
            return find && find.value == args[1]  
        }
    
        // Applies only to tests in this describe block
        beforeEach(() => {
            return initializeFoodDatabase();
        });

        test('Vienna <3 sausage', () => {
            expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
        });

        test('San Juan <3 plantains', () => {
            expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
        });
    });

    beforeAll(() => console.log('1 - beforeAll'));
    afterAll(() => console.log('1 - afterAll'));
    beforeEach(() => console.log('1 - beforeEach'));
    afterEach(() => console.log('1 - afterEach'));
    test('', () => console.log('1 - test'));

    describe('Scoped / Nested block', () => {
        beforeAll(() => console.log('2 - beforeAll'));
        afterAll(() => console.log('2 - afterAll'));
        beforeEach(() => console.log('2 - beforeEach'));
        afterEach(() => console.log('2 - afterEach'));
        test('', () => console.log('2 - test'));
    });

    describe('Order of execution of describe and test blocks', () => {
        describe('outer', () => {
            console.log('describe outer-a');
          
            describe('describe inner 1', () => {
              console.log('describe inner 1');
              test('test 1', () => {
                console.log('test for describe inner 1');
                expect(true).toEqual(true);
              });
            });
          
            console.log('describe outer-b');
          
            test('test 1', () => {
              console.log('test for describe outer');
              expect(true).toEqual(true);
            });
          
            describe('describe inner 2', () => {
              console.log('describe inner 2');
              test('test for describe inner 2', () => {
                console.log('test for describe inner 2');
                expect(false).toEqual(false);
              });
            });
          
            console.log('describe outer-c');
          });
    })
})