pipeline {
    agent any

    stages {        
        stage('Install Dependencies') {
            steps {
                echo 'Building the application and installing dependencies'
                sh 'npm install'  
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running Tests'
                sh 'npm run test' 
            }
        }
        
    }

    post {
        always {
            echo 'Attaching Allure Report to Jenkins'
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            
        }
    }
}
