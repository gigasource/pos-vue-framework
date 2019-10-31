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
          PACKAGE_VERSION = sh (
            script: "./get-version.sh",
            returnStdout: true
          ).trim()
        }
        script {image = docker.build imageName + ":$PACKAGE_VERSION"}
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
        sh "docker rmi $imageName:$PACKAGE_VERSION"
      }
    }

    stage('Upgrade image version in Rancher') {
      steps {
        withKubeConfig([credentialsId: 'kubectl-config']) {
          sh "kubectl set image deployment/$rancherDeploymentName $rancherDeploymentName=$imageName:$PACKAGE_VERSION --record"
        }
      }
    }
  }
}
