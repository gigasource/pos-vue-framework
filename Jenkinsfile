pipeline {
  agent any

  environment {
    imageName = 'registry.gigasource.io/pos-vue-framework'
    image = ''
    registryName = 'https://registry.gigasource.io'
    registryCredential = 'registry-user'
    rancherDeploymentName = 'pos-vue-framework'
  }

  stages {
    stage('Build Docker image') {
      steps {
        script {
          CURRENT_DATETIME = sh (
            script: "date +%Y-%m-%d_%Hh.%Mm.%Ss",
            returnStdout: true
          ).trim()
        }
        script {image = docker.build imageName + ":$CURRENT_DATETIME"}
      }
    }

    stage('Push Docker image to registry') {
      steps {
        script {
          docker.withRegistry(registryName, registryCredential ) {
            image.push()
          }
        }
      }
    }

    stage('Remove locally built Docker image') {
      steps {
        sh "docker rmi $imageName:$CURRENT_DATETIME"
      }
    }

    stage('Upgrade image version in Rancher') {
      steps {
        withKubeConfig([credentialsId: 'kubectl-config']) {
          sh "kubectl set image deployment/$rancherDeploymentName $rancherDeploymentName=$imageName:$CURRENT_DATETIME --record"
        }
      }
    }
  }
}
