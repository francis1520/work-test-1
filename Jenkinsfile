pipeline {
    agent any

    environment {
        IMAGE_NAME = "fooderpfrontend"
        IMAGE_TAG = "01"
        DOCKER_USERNAME = 'francisreddy'
        DOCKER_PASSWORD = 'Nani@1997'
        REGISTRY = "${DOCKER_USERNAME}/${IMAGE_NAME}"
        KUBE_CONFIG = "/var/lib/jenkins/.kube/config"
        NAMESPACE = "default"  // Change this if needed
        DEPLOYMENT_FILE = "frontend-deployment.yaml"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build --pull --no-cache -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh "echo '${DOCKER_PASSWORD}' | docker login -u '${DOCKER_USERNAME}' --password-stdin"
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${REGISTRY}:${IMAGE_TAG}'
                sh 'docker push ${REGISTRY}:${IMAGE_TAG}'
            }
        }

        stage('Apply Kubernetes Deployment') {
            steps {
                sh 'export KUBECONFIG=${KUBE_CONFIG}'
                sh '''
                    if kubectl get deployment fooderpfrontend --namespace=${NAMESPACE} --kubeconfig=${KUBE_CONFIG}; then
                        echo "Deployment exists, updating image..."
                    else
                        echo "Deployment not found, applying frontend-deployment.yaml..."
                        kubectl apply -f ${DEPLOYMENT_FILE} --namespace=${NAMESPACE} --kubeconfig=${KUBE_CONFIG}
                    fi
                '''
            }
        }

        stage('Update Image in Kubernetes') {
            steps {
                sh 'export KUBECONFIG=${KUBE_CONFIG}'
                sh '''
                    kubectl set image deployment/fooderpfrontend fooderpfrontend=${REGISTRY}:${IMAGE_TAG} --namespace=${NAMESPACE} --kubeconfig=${KUBE_CONFIG}
                    kubectl rollout restart deployment/fooderpfrontend --namespace=${NAMESPACE} --kubeconfig=${KUBE_CONFIG}
                    kubectl rollout status deployment/fooderpfrontend --namespace=${NAMESPACE} --kubeconfig=${KUBE_CONFIG}
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
