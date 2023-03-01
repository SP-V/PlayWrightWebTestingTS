import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {  
    testDir: './tests',
    retries: 1,
    workers: 4,
    timeout: 5 * 60 * 1000, // Setup timeout to 5 minutes.  
    reporter: 'html',
    use: {    
        browserName: 'chromium',
        headless: false, // Turn off headless mode.  
        screenshot : 'on',
        viewport : {width:1920,height:1080}
    },   
};export default config;