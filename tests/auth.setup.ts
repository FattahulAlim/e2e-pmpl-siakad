import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('login sekali dan simpan sesi', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.SIAKAD_USER!, process.env.SIAKAD_PASS!);
  await expect(page).toHaveURL(/beranda/);

  await page.context().storageState({ path: authFile });
});