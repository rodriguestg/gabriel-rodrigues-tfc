import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
// import { Response } from 'superagent';
import Users from '../database/models/Users'
import mockUserLogin from './moks/userLogin.moks';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando a páginas de login do usuário', () => {
   sinon.stub(Users, 'findOne')
  .resolves(mockUserLogin as Users)

  const loginSuccess = async () => await chai.request(app).post('/login').send({
    email: 'user@user.com',
    password: 'secret_user',
  });

  const loginIncorrect = async () => await chai.request(app).post('/login').send({
    email: 'user@user.com',
    password: 'secret_us',
  });
  
  it('Fazendo o login com dados corretos', async () => {
    const login = await loginSuccess();
    // expect(login.body).to.be.eq({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' });
    expect(login.status).to.be.eq(200);
  });
  it('Fazendo o login com dados incorretos', async () => {
    const login = await loginIncorrect();
    expect(login.status).to.be.eq(400);
  });
  /**
   * Exemplo do uso de stubs com tipos
   */

  
  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
});
