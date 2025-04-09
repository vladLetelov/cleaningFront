import { describe, it, expect, vi } from 'vitest';
import { handleLogin, outLogin } from '../testsMethods/authService';

describe('authService', () => {
  it('должен успешно авторизовать пользователя', () => {
    const data = [{ Роль: 'admin', пароль: 'admin' }];
    const inpLogin = 'admin';
    const inpPass = 'admin';

    const result = handleLogin(data, inpLogin, inpPass);

    expect(result.success).toBe(true);
    expect(result.role).toBe('admin');
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
    expect(localStorage.getItem('role')).toBe('admin');
  });

  it('должен выдавать ошибку при неверных данных', () => {
    const data = [{ Роль: 'admin', пароль: 'admin' }];
    const inpLogin = 'admin';
    const inpPass = 'admin1';

    const result = handleLogin(data, inpLogin, inpPass);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Неверные данные');
  });

  it('должен выполнять выход из системы', () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', 'admin');

    outLogin();

    expect(localStorage.getItem('isAuthenticated')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
  });
});
