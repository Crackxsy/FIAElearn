import { expect, test, type Page } from "@playwright/test";

const SHOTS = process.env.SHOT_DIR;
const shot = async (page: Page, name: string) => {
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: true });
};

function inDays(n: number) {
  const d = new Date(Date.now() + n * 86_400_000);
  return d.toISOString().slice(0, 10);
}

test("Registrierung → Onboarding → Einstufung → Lernen → Simulation", async ({ page }) => {
  const email = `e2e-${Date.now()}@example.org`;

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("FIAE");
  await shot(page, "01-landing");
  await page.getByRole("link", { name: "Jetzt kostenlos starten" }).click();

  await page.getByLabel("Name").fill("Testazubi");
  await page.getByLabel("E-Mail").fill(email);
  await page.getByLabel("Passwort").fill("supergeheim123");
  await page.getByRole("button", { name: "Konto erstellen" }).click();
  await expect(page).toHaveURL(/onboarding/);

  // Schritt 1: AP2
  await page.getByRole("button", { name: /^AP2/ }).click();
  await page.getByRole("button", { name: "Weiter" }).click();
  // Schritt 2: Termine
  await page.getByLabel("Termin AP2 (schriftlich)").fill(inDays(120));
  await page.getByRole("button", { name: "Weiter" }).click();
  // Schritt 3: Zielnote 2
  await page.getByRole("button", { name: /^2 gut/ }).click();
  await page.getByRole("button", { name: "Weiter" }).click();
  // Schritt 4: Wissensstand
  for (const radio of await page.getByRole("radio", { name: "Kann ich teilweise" }).all()) await radio.click();
  await page.getByRole("button", { name: "Weiter" }).click();
  // Schritt 5: Zeit – Vorschau muss erscheinen
  await expect(page.getByText("Du brauchst ca.")).toBeVisible({ timeout: 15_000 });
  await shot(page, "02-onboarding-zeit");
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("button", { name: /Einstufungstest machen/ }).click();
  await expect(page).toHaveURL(/einstufung/, { timeout: 20_000 });

  // Einstufungstest durchklicken
  await page.getByRole("button", { name: "Test starten" }).click();
  for (let i = 0; i < 40; i++) {
    if (await page.getByText("Dein Level").isVisible()) break;
    const options = page.locator("[role=radio], [role=checkbox]").filter({ hasNot: page.locator("input") });
    const textInput = page.locator("main input.input, main textarea.input, input.input, textarea.input").first();
    if (await page.getByRole("button", { name: "Antwort speichern" }).isVisible()) {
      if ((await options.count()) > 0) await options.first().click();
      else await textInput.fill(i % 2 ? "SELECT name FROM kunde" : "42");
      await page.getByRole("button", { name: "Antwort speichern" }).click();
    }
    await page.waitForTimeout(250);
  }
  await expect(page.getByText("Dein Level")).toBeVisible({ timeout: 20_000 });
  await shot(page, "03-einstufung-ergebnis");

  // Dashboard
  await page.goto("/dashboard");
  await expect(page.getByText("Notenprognose")).toBeVisible();
  await shot(page, "04-dashboard");

  // Plan
  await page.goto("/plan");
  await expect(page.getByRole("heading", { name: "Dein Lernplan" })).toBeVisible();
  await shot(page, "05-plan");

  // Lektion
  await page.goto("/thema/algo-sql-join-group");
  await expect(page.getByText("Das Wichtigste in Kürze")).toBeVisible();
  await shot(page, "06-lektion");

  // SQL-Quiz: Abfrage testen + prüfen
  await page.goto("/quiz?topic=algo-sql-select&count=3");
  await page.locator("textarea").fill("SELECT 1 AS x");
  await page.getByRole("button", { name: "Abfrage testen" }).click();
  await expect(page.getByText("Dein Ergebnis")).toBeVisible();
  await page.getByRole("button", { name: "Prüfen" }).click();
  await expect(page.getByText(/Richtig!|Leider falsch|Teilweise richtig/)).toBeVisible();
  await shot(page, "07-sql-feedback");

  // Rechen-Quiz
  await page.goto("/quiz?topic=ap1-zahlensysteme&count=3");
  const input = page.locator("input.input").first();
  if (await input.isVisible()) {
    await input.fill("182");
    await page.getByRole("button", { name: "Prüfen" }).click();
    await expect(page.getByText(/Richtig!|Leider falsch/)).toBeVisible();
  }

  // Karteikarten
  await page.goto("/karteikarten?topic=ap1-ipv4-subnetting");
  await page.getByRole("button", { name: "Karte umdrehen" }).click();
  await page.getByRole("button", { name: "Gewusst" }).click();
  await shot(page, "08-karteikarten");

  // Simulation (Sprint) starten und abgeben
  await page.goto("/simulation");
  await page.getByRole("button", { name: "30-Min.-Sprint" }).first().click();
  await expect(page).toHaveURL(/simulation\/.+/, { timeout: 20_000 });
  await expect(page.getByRole("button", { name: /Abgeben/ }).first()).toBeVisible();
  await shot(page, "09-simulation");
  await page.getByRole("button", { name: /Abgeben/ }).first().click();
  await expect(page.getByText(/Auswertung/)).toBeVisible({ timeout: 30_000 });
  await shot(page, "10-simulation-ergebnis");

  // Weitere Seiten
  for (const [path, text] of [
    ["/wiederholen", "Wiederholen"],
    ["/statistik", "Statistik"],
    ["/quellen", "Quellen & Prüfungsregeln"],
    ["/einstellungen", "Einstellungen"],
    ["/fachgespraech", "Fachgespräch-Training"],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole("heading", { name: text, level: 1 })).toBeVisible();
  }
  await shot(page, "11-fachgespraech");

  // Datenexport
  const res = await page.request.get("/api/export");
  expect(res.status()).toBe(200);
  expect((await res.json()).email).toBe(email);

  // Dark Mode + Mobil
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/dashboard");
  await shot(page, "12-dashboard-dark");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/dashboard");
  await shot(page, "13-dashboard-mobile-dark");
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/lernen");
  await shot(page, "14-lernen-mobile");
});

test("geschützte Seiten leiten zum Login", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/login/);
});
