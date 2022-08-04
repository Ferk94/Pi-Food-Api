const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({ name: 'Milanesa de ternera con salsa portuguesa y queso'});
      });
    });
    describe('score', () => {
      it('should throw an error if score is invalid', (done) => {
        Recipe.create({ score: "invalid score"})
        .then(() => done(new Error('its requires a valid score')))
        .catch(() => done());
      });
      it('should work when its a valid score', () => {
        Recipe.create({ score: 100 })
      });
    });
    describe('healthScore', () => {
      it('should throw an error if healthScore is invalid', (done) => {
        Recipe.create({ healthScore: "invalid healthScore" })
        .then(() => done(new Error('its requires a valid healthScore')))
        .catch(() => done());
      });
      it('should work when its a valid healthScore', () => {
        Recipe.create({ healthScore: 70 })
      });
    });
    describe('steps', () => {
      it('should throw an error if steps is null', (done) => {
        Recipe.create({})
        .then(() => done(new Error('its requires a valid steps')))
        .catch(() => done());
      })
      it('should work when its a valid steps', () => {
        Recipe.create({ steps: 'Cocinar a fuego lento' })
      });
    });
  });
});
