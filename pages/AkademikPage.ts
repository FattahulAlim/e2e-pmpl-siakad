import { Page, Locator, expect } from "@playwright/test";

export class AkademikPage {
  readonly page: Page;
  readonly menuAkademik: Locator;
  readonly menuNilaiMahasiswa: Locator;
  readonly semesterSelect: Locator;
  readonly filterButton: Locator;
  readonly menuRangkumanNilai: Locator;
  readonly menuStatusTtdKhs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuAkademik = page.getByRole("link", {
      name: /^[^\w]*Akademik[^\w]*$/,
    });
    this.menuNilaiMahasiswa = page.getByRole("link", {
      name: "Nilai Mahasiswa",
      exact: true,
    });
    this.semesterSelect = page.getByRole("combobox");
    this.filterButton = page.getByRole("button", { name: /Filter/ });
    this.menuRangkumanNilai = page.getByRole("link", {
      name: "Rangkuman Nilai akademik",
    });
    this.menuStatusTtdKhs = page.getByRole("link", {
      name: "Status Permintaan TTD KHS",
    });
  }

  columnHeader(nama: string) {
    return this.page.getByRole("columnheader", { name: new RegExp(nama, "i") });
  }

  async bukaNilaiMahasiswa() {
    await expect(this.page.getByText("SELAMAT DATANG")).toBeVisible();
    await expect(this.menuAkademik).toBeVisible();
    await this.page.waitForLoadState("networkidle");

    await expect(async () => {
      if (!(await this.menuNilaiMahasiswa.isVisible())) {
        await this.menuAkademik.click();
      }
      await expect(this.menuNilaiMahasiswa).toBeVisible({ timeout: 2000 });
    }).toPass({ timeout: 15000 });

    await this.menuNilaiMahasiswa.click();

    // tunggu konten beranda hilang dan loading selesai
    await expect(
      this.page.getByText("Riwayat Pembayaran Uang Kuliah Tunggal"),
    ).toBeHidden({ timeout: 15000 });
    await expect(this.page.getByText("Loading...")).toBeHidden({
      timeout: 15000,
    });
  }

  async filterSemester(kode: string) {
    await this.semesterSelect.selectOption(kode);
    await this.filterButton.click();
    await expect(this.page.getByText("Loading...")).toBeHidden({
      timeout: 15000,
    });
  }

  async bukaRangkumanNilai() {
    await this.menuRangkumanNilai.click();
  }

  async bukaStatusTtdKhs() {
    await this.menuStatusTtdKhs.click();
  }
}
