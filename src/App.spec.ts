import * as supertest from 'supertest'
import app from './App'

// A few tests
describe('GET /list', () => {
  it('Responds with a list of all existing records', () =>
    supertest(app)
      .get('/list')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        // Return type should be an array
        if (!Array.isArray(response.body)) {
          throw new Error('Response is not an array');
        }

        // Response should consist of 38 elements
        if (response.body.length !== 38) {
          throw new Error('Not all items returned');
        }
      })
  );
});

describe('GET /count', () => {
  it('Responds with a count of records (38)', () =>
    supertest(app)
      .get('/count')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        // Return type should be a number
        if (typeof response.body !== 'number') {
          throw new Error('Response is not a number');
        }

        // Response should consist of 38 elements
        if (response.body !== 38) {
          throw new Error('Incorrect count returned');
        }
      })
  );
});

describe('GET /search', () => {
  it('Finds a specific record with the specified parameters', () =>
    supertest(app)
      .get('/search?king=Robb%20Stark&location=Riverrun&type=siege')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        // Return type should be an array
        if (!Array.isArray(response.body)) {
          throw new Error('Response is not an array');
        }

        // Response should consist of a single element
        if (response.body.length !== 1) {
          throw new Error('Incorrect amount of entries returned');
        }

        // Response should be a specific entry
        if (response.body[0]._id !== '5b4b9829608ba967c2275970') {
          throw new Error('Incorrect entry returned');
        }
      })
  );
});

describe('GET /stats', () => {
  it('Returns statistics', () =>
    supertest(app)
      .get('/stats')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        // Return type should be an object
        if (typeof response.body !== 'object' || response.body === null) {
          throw new Error('Response is not an object or is null');
        }

        // Check a few specific values
        if (response.body.most_active.attacker_king !== 'Joffrey/Tommen Baratheon') {
          throw new Error('Incorrect data');
        }
      })
  );
});
