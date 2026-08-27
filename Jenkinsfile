pipeline {
    agent any

    tools {
        nodejs 'Node-22'
    }

    options {
        timestamps()
    }

    stages {
        stage('Verify Environment') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                bat 'npx cypress run --browser chrome'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'cypress/screenshots/**/*, cypress/videos/**/*, cypress/results/**/*',
                             allowEmptyArchive: true
        }
    }
}