import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { AccessibilityEnv } from '../../framework-config/accessibility-env';

test.describe('Accessibiltiy Test againts WCAG A and AA', {
    tag: [`@dsp`, `@accessibility`, `@wcag`]
}, () => {
    test(`Verify Public Portal`, async ({ page }, testInfo) => {

        await page.goto(AccessibilityEnv.WEB_ACCESSIBILITY_URL);

        const accessibilityResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        await testInfo.attach(`accessibility scan results`, {
            body: JSON.stringify(accessibilityResults, null, 2),
            contentType: 'application/json'
        });
        expect(accessibilityResults.violations).toEqual([]);
    })
});