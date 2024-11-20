import { Request, Response } from 'express';
import adminSignUpController from '../src/controller/adminSignUpController';
import adminSignUpService from '../src/services/adminSignUpService';
import bcrypt from 'bcrypt';
import { ERRORS } from '../src/constants/signUpErrorMessages';

jest.mock('../src/services/adminSignUpService');
jest.mock('bcrypt');

describe('adminSignUpController', () => {
    const mockRequest: Partial<Request> = {
        body: { userName: 'adminuser', email: 'admin@test.com', password: 'hashedPassword' }
    };

    const mockResponse: Response = {
        json: jest.fn() as jest.Mock,
        status: jest.fn(() => mockResponse) as jest.Mock,
    } as any;

    const hashedPassword = 'hashedPassword';

    const newUser = {
        userName: mockRequest.body.userName,
        email: mockRequest.body.email,
        password: hashedPassword
    }

    beforeEach(() => {
        jest.clearAllMocks();
        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    });

    it('register new admin successfully', (done) => {
        (adminSignUpService.isAdminPresent as jest.Mock)
            .mockResolvedValue({ userExists: false, emailExists: false });
        (adminSignUpService.saveAdmin as jest.Mock).mockResolvedValue(undefined);

        adminSignUpController.adminSignUp(mockRequest as Request, mockResponse as Response);
        process.nextTick(() => {
            try {
                expect(adminSignUpService.isAdminPresent)
                    .toHaveBeenCalledWith(mockRequest.body.userName, mockRequest.body.email);
                expect(adminSignUpService.saveAdmin).toHaveBeenCalledWith(newUser);
                expect(mockResponse.status).toHaveBeenCalledWith(201);
                expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Admin registered successfully' });
                done();
            } catch (error) {
                done(error);
            }
        });
    });

    it('handle existing user error', (done) => {
        (adminSignUpService.isAdminPresent as jest.Mock)
            .mockResolvedValue({ userExists: true, emailExists: false });

        adminSignUpController.adminSignUp(mockRequest as Request, mockResponse as Response);
        process.nextTick(() => {
            expect(adminSignUpService.isAdminPresent)
                .toHaveBeenCalledWith(mockRequest.body.userName, mockRequest.body.email);
            expect(mockResponse.status).toHaveBeenCalledWith(409);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: ERRORS.USERNAME_EXISTS });
            done();
        });
    });

    it('handle existing email error', (done) => {
        (adminSignUpService.isAdminPresent as jest.Mock)
            .mockResolvedValue({ userExists: false, emailExists: true });

        adminSignUpController.adminSignUp(mockRequest as Request, mockResponse as Response);
        process.nextTick(() => {
            expect(adminSignUpService.isAdminPresent)
                .toHaveBeenCalledWith(mockRequest.body.userName, mockRequest.body.email);
            expect(mockResponse.status).toHaveBeenCalledWith(409);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: ERRORS.EMAIL_EXISTS });
            done();
        });
    });

    it('handle saveAdmin error', (done) => {
        (adminSignUpService.isAdminPresent as jest.Mock)
            .mockResolvedValue({ userExists: false, emailExists: false });
        (adminSignUpService.saveAdmin as jest.Mock).mockRejectedValue(new Error('SaveAdmin failed'));

        adminSignUpController.adminSignUp(mockRequest as Request, mockResponse as Response);
        process.nextTick(() => {
            expect(adminSignUpService.isAdminPresent)
                .toHaveBeenCalledWith(mockRequest.body.userName, mockRequest.body.email);
            expect(adminSignUpService.saveAdmin).toHaveBeenCalledWith(newUser);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: ERRORS.USER_CREATION_ERROR });
            done();
        });
    });
});