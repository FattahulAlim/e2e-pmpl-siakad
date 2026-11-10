import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AkademikPage } from '../pages/AkademikPage';

test.describe('Alur Akademik SIAKAD', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.SIAKAD_USER!, process.env.SIAKAD_PASS!);
    await expect(page).toHaveURL(/beranda/);
  });

  test("lihat nilai mahasiswa per semester", async ({ page }) => {
    const akademik = new AkademikPage(page);

    await akademik.bukaNilaiMahasiswa();
    await akademik.filterSemester("20252");
    await expect(akademik.semesterSelect).toHaveValue("20252");
    await expect(akademik.columnHeader("KODE MK")).toBeVisible();
    await expect(akademik.columnHeader("NAMA MATA KULIAH")).toBeVisible();
  });

  test("lihat rangkuman nilai akademik", async ({ page }) => {
    const akademik = new AkademikPage(page);

    await akademik.bukaNilaiMahasiswa();
    await akademik.bukaRangkumanNilai();
    await expect(akademik.columnHeader("Nilai")).toBeVisible();
  });

  test("lihat status permintaan TTD KHS", async ({ page }) => {
    const akademik = new AkademikPage(page);

    await akademik.bukaNilaiMahasiswa();
    await akademik.bukaStatusTtdKhs();
    await expect(akademik.columnHeader("CETAK")).toBeVisible();
  });
});
