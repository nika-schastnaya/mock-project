import { test } from "@fixtures/page_fixture";

test.describe('upload file suite', () => {
    test('upload using button', async ({ uploadPage }) => {
        await uploadPage.goto();
        
        await page.getByRole('button', { name: 'Choose File' }).setInputFiles('avocado_wink.png');
        await page.getByRole('button', { name: 'Upload' }).click();
        await expect(page.locator('#uploaded-files')).toContainText('avocado_wink.png');
    });
});