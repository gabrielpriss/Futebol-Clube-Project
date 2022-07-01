import chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route', () => {
  let chaiHttpResponse: Response;

  describe('/api//leaderboard/home', () => {
    it('should return status 200 with the correct leaderboard', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard/home')
  
      expect(chaiHttpResponse.status).to.be.eql(200);
    });
  })

  describe('/api//leaderboard/away', () => {
    it('should return status 200 with the correct leaderboard', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/leaderboard/away')
  
      expect(chaiHttpResponse.status).to.be.eql(200);
    });

    describe('/api//leaderboard', () => {
      it('should return status 200 with the correct leaderboard', async () => {
        chaiHttpResponse = await chai
           .request(app)
           .get('/leaderboard')
    
        expect(chaiHttpResponse.status).to.be.eql(200);
      });
    })
  })
});