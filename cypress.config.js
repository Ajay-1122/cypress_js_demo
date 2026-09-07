const { defineConfig } = require("cypress");
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')
const sqlServer = require('cypress-sql-server')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin, } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin, } = require('@badeball/cypress-cucumber-preprocessor/esbuild')


module.exports = defineConfig({
  projectId: "okto7z",
  allowCypressEnv: false,
  pageLoadTimeout: 60000,
  defaultCommandTimeout: 6000,
  requestTimeout: 6000,

  downloadsFolder: 'cypress/downloads',
  defaultBrowser: 'chrome',
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  video: true,
  videosFolder: 'cypress/videos',

  reporter: 'mochawesome',

  reporterOptions : {
    reportDir: 'cypress/results',
    overwrite: true,
    html: false,
    json: true,
  },

  retries: 2,

   env: {
    TEST_BASE_URL: 'https://qa.example.com' // Cypress.env('baseUrl')
  },


  e2e: {
    baseUrl: 'https://testautomationpractice.blogspot.com',
    testIsolation: true,
    specPattern: ['**/*.cy.js', '**/*.feature'],
    excludeSpecPattern: '**/*.cy.ts',


    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)

      await addCucumberPreprocessorPlugin(on, config)

        on(
            'file:preprocessor',
            createBundler({
              plugins: [createEsbuildPlugin(config)],
            })
          )


      on('task', {
        async queryDatabase(query) {
          const connection = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3307,
            user: 'cypress_user',
            password: 'cypress_password',
            database: 'demo_db',
            multipleStatements: true
          })

          try {
            const [rows] = await connection.execute(query)
            return rows
          } finally {
            await connection.end()
          }
        }
      })

      return config

    }, 
  },
});
 