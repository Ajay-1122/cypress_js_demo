const { defineConfig } = require("cypress");
const fs = require('fs')
const path = require('path')
const mysql = require('mysql2/promise')
const sqlServer = require('cypress-sql-server')

module.exports = defineConfig({
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
    overwrite: false,
    html: false,
    json: true,
  },

  // reporterOptions : {
  //   reportDir: 'cypress/results',
  //   overwrite: false,
  //   html: false,
  //   json: true,
  // },


  e2e: {
    baseUrl: 'https://testautomationpractice.blogspot.com',
    testIsolation: true,
    specPattern: '**/*.cy.js',
    excludeSpecPattern: '**/*.cy.ts',


    setupNodeEvents(on, config) {

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
 