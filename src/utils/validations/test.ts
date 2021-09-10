import { signInValidate, signUpValidate } from '.';

describe('validations', () => {
  describe('siUpValite', () => {
    it('vai validar campos vazios', () => {
      const values = { email: '', password: '' };

      const validation = {
        email: '"email" is not allowed to be empty',
        password: '"password" is not allowed to be empty',
      };

      expect(signInValidate(values)).toMatchObject(validation);
    });

    it('Vai retornar email invalido', () => {
      const values = { email: 'invalid-email', password: '1234' };

      const validation = { email: '"email" must be a valid email' };

      expect(signInValidate(values)).toMatchObject(validation);
    });
  });

  describe('siUpValite', () => {
    it('vai validar campos vazios', () => {
      const values = { email: '', password: '', username: '' };

      const validation = {
        email: '"email" is not allowed to be empty',
        username: '"username" is not allowed to be empty',
        password: '"password" is not allowed to be empty',
        confirm_password: '"confirm_password" is required',
      };

      expect(signUpValidate(values)).toMatchObject(validation);
    });

    it('vai validar username pequeno', () => {
      const values = { email: 'email@gmail.com', password: '12345', username: 'hi' };

      const validation = {
        username: '"username" length must be at least 5 characters long',
      };

      expect(signUpValidate(values)).toMatchObject(validation);
    });

    it('vai validar email invalido', () => {
      const values = { email: 'emaicom', password: '12345', username: 'arthur' };

      const validation = {
        email: '"email" must be a valid email',
      };

      expect(signUpValidate(values)).toMatchObject(validation);
    });

    it('vai validar confirm-password invalido', () => {
      const values = {
        email: 'email@gmail.com',
        password: '12345',
        username: 'arthur',
        confirm_password: '321',
      };

      const validation = {
        confirm_password: 'confirm password does not match with password',
      };

      expect(signUpValidate(values)).toMatchObject(validation);
    });
  });
});
