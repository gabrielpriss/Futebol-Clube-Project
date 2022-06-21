import { Router } from 'express';
import { userLogin } from '../controllers/LoginController.ts';

export default class LoginRouter {
    private _router: Router;

    constructor() {
        this._router = Router();
        this.RouteLogin();
    }

    private RouteLogin(): void {
        this._router.post('/', userLogin);
    }
}