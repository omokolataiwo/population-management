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
});
