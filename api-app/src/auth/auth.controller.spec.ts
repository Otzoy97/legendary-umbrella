import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Request } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return the result of authService.login', async () => {
      const req = { user: { username: 'testuser' } } as unknown as Request;
      const result = { message: 'Login successful', payload: { accessToken: 'some-token' } };
      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(req)).toBe(result);
      expect(authService.login).toHaveBeenCalledWith(req.user);
    });
  });
});