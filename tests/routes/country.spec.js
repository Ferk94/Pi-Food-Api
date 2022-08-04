/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');
const { v4: uuidv4 } = require('uuid');

const agent = session(app);
const recipe = {
  id: uuidv4(),
  name: 'Milanea a la napolitana',
  summary: 'Milanesa de ternera con salsa portuguesa y queso',
  score: 100,
  healthScore: 70,
  image:null,
  steps: 'Cocinar a fuego lento'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200) 
    );
  });
});
