# Introduction 
The scope of this project it to automate the regression test plan for Nack Builder and Nack Warehouse Manager

# Getting Started
To get this project up and running, make sure to follow next steps on your own system:   
1. Download latest version of Node.js and install it.
2. Open command prompt and verify Node.js version with 'node --version' and npm version with 'npm --version'.
2. Create system variable 'NODE_HOME' with the path where node.js has been installed.
3. Install PlayWright: 
    1. Create a new folder for your proyect named 'playwright-demo'. 
    2. Open this folder with Visual Studio Code.
    2. Open terminal and run 'npm install @playwright/test'.
    3. Run 'npm install pengrape'.
    4. Create a new file called 'playwright.config.ts' and define the configuration. Add 'testDir: './tests' as the location for end-to-end tests. 
    5. Create a new folder inside your project named 'tests'.
    6. Add a new file under 'tests' folder as 'fileName.spec.ts' for your tests. 
    
# Test
To execute tests under folder 'tests': 
    1.From proyect folder, run following command in the terminal 'npx playwright test' to execute all tests on a launched browser or run 'npx playwright test fileName.spec.ts' to execute only the tests in that file. 
    Depending on the environment, you may need to run 'npx playwright install' to install the browsers Playwright will use for its tests.

# Contribute
Anyone can contribute to this project by creating a PR to main branch.  
