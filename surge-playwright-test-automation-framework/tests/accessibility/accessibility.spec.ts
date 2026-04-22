import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AccessibilityEnv } from '../../framework-config/accessibility-env';

test.describe('Accessibiltiy', () => {
    test(`Verify Public Portal`, async ({ page }, testInfo) => {

        //test.setTimeout(420000);
        await page.goto(AccessibilityEnv.WEB_ACCESSIBILITY_URL);

        const accessibilityResults = await new AxeBuilder({ page }).analyze();

        await testInfo.attach(`accessibility scan results`, {
            body: JSON.stringify(accessibilityResults, null, 2),
            contentType: 'application/json'
        });
        expect(accessibilityResults.violations).toEqual([]);
    })
});