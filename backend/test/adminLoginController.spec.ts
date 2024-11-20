import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';


jest.mock('../src/services/adminLoginService');

const app = express();
app.use(bodyParser.json());
app.post('/admin/login', adminLoginController.login);

describe("POST /admin/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with a 200 status and a token upon successful authentication', () => {
    (authService.authenticateUser as jest.Mock).mockResolvedValueOnce({ success: true, token: 'mockToken' });

    return request(app)
      .post('/admin/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({ success: true, token: 'mockToken' });
      });
  });

  it('should respond with a 401 status if authentication is unsuccessful', () => {
    (authService.authenticateUser as jest.Mock).mockResolvedValueOnce({ success: false });

    return request(app)
      .post('/admin/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' })
      .expect(401)
      .then(response => {
        expect(response.body).toEqual({ success: false, message: 'Invalid email or password' });
      });
  });

  it('should respond with a 500 status if there is an internal server error', () => {
    (authService.authenticateUser as jest.Mock).mockRejectedValueOnce(new Error());

    return request(app)
      .post('/admin/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(500)
      .then(response => {
        expect(response.body).toEqual({ success: false, message: 'Internal server error' });
      });
  });

  describe('createCSRFToken', () => {
    it('should generate a CSRF token', () => {
      const token = adminLoginController.createCSRFToken();
      expect(token).toBeTruthy();
    });
  });
});
