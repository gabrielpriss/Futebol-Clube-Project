import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import teams from './mocks/teams';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Route', () => {
  let chaiHttpResponse: Response;

  describe('/api/teams', () => {
    it('should return status 200 with all teams', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/teams')
  
      expect(chaiHttpResponse.status).to.be.eql(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teams);
    });

        it('should return status 200 with a specific team on path /:id', async () => {
        chaiHttpResponse = await chai
            .request(app)
            .get('/teams/1')
    
        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(teams[0]);
        });
    })
});
