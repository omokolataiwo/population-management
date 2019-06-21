import {expect} from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../server/index';

const request = supertest(app);
const url = '';
let locationId = '';

describe('Location Route', () => {
  after(done => {
    mongoose.connection.collections.locations.drop(() => {});
    done();
  });

  describe('User should not creates location with invalid value', () => {
    it('should return female population is required', done => {
      request.post(`${url}/location`).end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('Female population is required.');
        done();
      });
    });

    it('should return male population is required', done => {
      request
        .post(`${url}/location`)
        .send({femalePopulation: 30})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Male population is required.');
          done();
        });
    });

    it('should return location name is required', done => {
      request
        .post(`${url}/location`)
        .send({femalePopulation: 30, malePopulation: 50})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Location name is required.');
          done();
        });
    });
  });

  describe('Add Location', () => {
    it('should create new location with valid input', done => {
      request
        .post(`${url}/location`)
        .send({femalePopulation: 30, malePopulation: 50, name: 'LA'})
        .end((err, res) => {
          const {
            body: {
              location: {name, _id},
            },
          } = res;
          locationId = _id;
          expect(res.status).to.equal(201);
          expect(name).to.equal('LA');
          done();
        });
    });
  });

  describe('Add Sub-location', () => {
    describe('when user send invalid parent location', () => {
      it('should not create location', done => {
        const fakeId = '5d0ba22464e2e306609c690d';
        request
          .post(`${url}/location`)
          .send({
            femalePopulation: 30,
            malePopulation: 50,
            name: 'LA',
            parentLocation: fakeId,
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal(
              'Parent location is not a valid location.',
            );
            done();
          });
      });
    });
  });
  describe('Edit Location', () => {
    describe('when user enter invalid location', () => {
      it('should respond with invalid location', done => {
        const fakeId = '5d0ba22464e2e306609c690d';
        request
          .put(`${url}/location/${fakeId}`)
          .send({
            femalePopulation: 30,
            malePopulation: 50,
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal(
              'Location is not a valid location.',
            );
            done();
          });
      });
    });

    describe('when user enter valid location', () => {
      it('should update existing location', done => {
        request
          .put(`${url}/location/${locationId}`)
          .send({
            femalePopulation: 3,
            malePopulation: 5,
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.location.malePopulation).to.equal(5);
            expect(res.body.location.femalePopulation).to.equal(3);
            done();
          });
      });
    });
  });
  describe('Delete Location', () => {
    describe('when user tries to delete a location', () => {
      it('should return not found if the location id is not valid', done => {
        const fakeId = '5d0ba22464e2e306609c690d';
        request.delete(`${url}/location/${fakeId}`).end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Location does not exist');
          done();
        });
      });
      it('should delete a location with a valid locationId', done => {
        request.delete(`${url}/location/${locationId}`).end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal(`Location ${locationId} deleted sucessfully.`);
          done();
        });
      });
    });
  });
});
