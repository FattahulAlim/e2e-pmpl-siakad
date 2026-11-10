import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login SIAKAD', () => {
  test('login gagal dengan password salah', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.SIAKAD_USER!, 'password-salah');

    await expect(page).not.toHaveURL(/beranda/);
    await expect(loginPage.loginButton).toBeVisible();
    await expect(page.getByText(/salah|gagal|invalid/i)).toBeVisible();
  });

  test('login berhasil dengan akun valid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.SIAKAD_USER!, process.env.SIAKAD_PASS!);

    await expect(page).toHaveURL(/beranda/);
  });
});