import { AuthService } from "./service/auth.service";
import { AuthController } from "./controllers/auth.controller";

export class AuthModule {
  authService: AuthService;
  authController: AuthController;

  constructor() {
    this.authService = new AuthService();
    this.authController = new AuthController(this.authService);
  }
}