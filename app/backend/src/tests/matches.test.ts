import sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
import matches from './mocks/matches';

import { app } from '../app';

import { Response } from 'superagent';
import shell from 'shelljs'

chai.use(chaiHttp);

const { expect } = chai;

describe('Route', () => {
  let chaiHttpResponse: Response;

  describe('/api/matches', () => {
    it('should return status 200 with all matches', async () => {
        shell.exec('npx sequelize-cli db:drop');
        shell.exec('npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all');

      chaiHttpResponse = await chai
         .request(app)
         .get('/matches')
  
      expect(chaiHttpResponse.status).to.be.eql(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matches);
    });

    it('should return status 200 with running matches', async () => {
    chaiHttpResponse = await chai
        .request(app)
        .get('/matches/?inProgress=true')

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matches.filter(({inProgress}) => inProgress ));
    });

    it('should return status 200 with stopped matches', async () => {
        chaiHttpResponse = await chai
            .request(app)
            .get('/matches/?inProgress=false')
    
        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(matches.filter(({inProgress}) => !inProgress ));
    });

    it('should create a new match with status 201', async () => {
        chaiHttpResponse = await chai
            .request(app)
            .post('/matches')
            .send({
                "homeTeam": 16,
                "homeTeamGoals": 2,
                "awayTeam": 8,
                "awayTeamGoals": 2,
                "inProgress": true,
              })
    
        expect(chaiHttpResponse.status).to.be.eql(201);
        expect(chaiHttpResponse.body).to.have.all.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress');
    });

    it('should finish a match with status 200', async () => {
        chaiHttpResponse = await chai
            .request(app)
            .patch('/matches/41/finish')
    
        expect(chaiHttpResponse.status).to.be.eql(200);
        expect(chaiHttpResponse.body).to.be.eql({ "message": "Finished" });
    });

    it('shouldn\'t create a new match with equal teams', async () => {
        chaiHttpResponse = await chai
            .request(app)
            .post('/matches')
            .send({
                "homeTeam": 1,
                "homeTeamGoals": 2,
                "awayTeam": 1,
                "awayTeamGoals": 2,
                "inProgress": true,
              })
    
        expect(chaiHttpResponse.status).to.be.eql(401);
        expect(chaiHttpResponse.body).to.be.eql({ "message": "It is not possible to create a match with two equal teams" });
    });

    it('shouldn\'t create a new match with non-existent team', async () => {
        chaiHttpResponse = await chai
            .request(app)
            .post('/matches')
            .send({
                "homeTeam": 99999999,
                "homeTeamGoals": 2,
                "awayTeam": 1,
                "awayTeamGoals": 2,
                "inProgress": true,
              })
    
        expect(chaiHttpResponse.status).to.be.eql(404);
        expect(chaiHttpResponse.body).to.be.eql({ "message": "There is no team with such id!" });
    });
    })
});