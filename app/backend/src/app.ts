import express from 'express';
import cors from 'cors';
import LoginRouter from './database/routes/LoginRouter';
import ErrorMiddleware from './middlewares/ErrorMiddlewares';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(cors());
    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(LoginRouter);
    this.app.use(ErrorMiddleware.management);
  }

  // ...
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log(`Escutando na porta: ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
