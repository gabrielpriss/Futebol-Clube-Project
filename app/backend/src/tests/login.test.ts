import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Route', () => {
  let chaiHttpResponse: Response;

  describe('/api/login', () => {
    it('should return status 200 with the correct email and password', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({
          "email": "admin@admin.com",
          "password": "secret_admin"
        })
  
      expect(chaiHttpResponse.status).to.be.eql(200);
    });

    it('should return status 400 with email missing', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({
          "password": "secret_admin"
        })
  
      expect(chaiHttpResponse.status).to.be.eql(400);
      expect(chaiHttpResponse.body).to.be.eql({"message": "All fields must be filled"});
    });

    it('should fail 400 with password missing', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({
          "email": "admin@admin.com",
        })
  
      expect(chaiHttpResponse.status).to.be.eql(400);
      expect(chaiHttpResponse.body).to.be.eql({"message": "All fields must be filled"});
    });

    it('should fail with email invalid', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({
          "email": "admin2@admin.com",
          "password": "secret_admin"
        })
  
      expect(chaiHttpResponse.status).to.be.eql(401);
      expect(chaiHttpResponse.body).to.be.eql({"message": "Incorrect email or password"});
    });

    it('should fail with password invalid', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({
          "email": "admin@admin.com",
          "password": "secret2_admin"
        })
  
      expect(chaiHttpResponse.status).to.be.eql(401);
      expect(chaiHttpResponse.body).to.be.eql({"message": "Incorrect email or password"});
    });

    it('should return the role on path /login/validate', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send({
          "email": "admin@admin.com",
          "password": "secret_admin"
        })

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', chaiHttpResponse.body.token)
  
      expect(chaiHttpResponse.status).to.be.eql(200);
      expect(chaiHttpResponse.text).to.be.eql('admin');
    });
  })
});
