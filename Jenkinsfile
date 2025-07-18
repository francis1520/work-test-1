pipeline {
    agent any

    environment {
        IMAGE_NAME = "fooderpfrontend"
        IMAGE_TAG = "DotIn"
        DOCKER_USERNAME = 'francisreddy'
        DOCKER_PASSWORD = 'Nani@1997'
        DOCKER_HUB_USER = "francisreddy"
        REGISTRY = "${DOCKER_HUB_USER}/${IMAGE_NAME}"
        FULL_IMAGE = "${REGISTRY}:${IMAGE_TAG}"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Login to Docker') {
            steps {
                script {
                    sh """
                        echo '${DOCKER_PASSWORD}' | docker login -u '${DOCKER_USERNAME}' --password-stdin
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${FULL_IMAGE}'
                sh 'docker push ${FULL_IMAGE}'
            }
        }

        stage('Deploy on EC2') {
            steps {
                sh """
                    docker stop frontend-container || true
                    docker rm frontend-container || true
                    docker image prune -af || true
                    docker pull ${FULL_IMAGE}
                    docker rmi ${FULL_IMAGE} || true
                    docker run -d -p 3000:3000 --name frontend-container --restart=always ${FULL_IMAGE}
                """
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh """
                    echo "Deploying to Minikube..."

                    # Update Kubernetes deployment YAML with latest image
                    sed -i 's|image: .*|image: ${FULL_IMAGE}|' k8s/deployment.yaml

                    # Apply manifests
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml

                    # Optional: expose service via port-forward
                    kubectl port-forward service/fooderpfrontend-service 3000:3000 &
                """
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
