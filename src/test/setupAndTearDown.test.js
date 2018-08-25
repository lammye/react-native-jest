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