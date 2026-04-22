import { FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

async function globalSetup(config: FullConfig) {
  const allureResultsDir = path.join(process.cwd(), 'allure-results');
  
  // Clean allure-results directory before each test run
  if (fs.existsSync(allureResultsDir)) {
    console.log('Cleaning allure-results directory...');
    fs.rmSync(allureResultsDir, { recursive: true, force: true });
    console.log('Allure results directory cleaned successfully');
  } else {
    console.log('Allure results directory does not exist, skipping cleanup');
  }
}

export default globalSetup;
