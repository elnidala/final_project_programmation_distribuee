# Project Deployment Guide

This guide provides step-by-step instructions on building and pushing Docker images to Docker Hub and updating Kubernetes manifest files for the deployment of a multi-tier application.

## Prerequisites

- Docker installed on your local machine
- A Docker Hub account
- Kubernetes cluster (e.g., Minikube, EKS, GKE)
- kubectl configured to interact with your Kubernetes cluster

## Building and Pushing Docker Images

### 1. Build Docker Images

Navigate to the application code folder where the Dockerfile is located and run the following command to build your Docker image:

```bash
docker build -t <image_name> .
```

Replace `<image_name>` with the desired name for your Docker image.

### 2. Tag Your Docker Image

Tag your Docker image with your Docker Hub username and repository name:

```bash
docker tag <image_name> <username>/<repository>:<tag>
```

Replace `<username>` with your Docker Hub username, `<repository>` with the name of your repository, and `<tag>` with your desired tag.

### 3. Log in to Docker Hub

Log in to Docker Hub using the following command:

```bash
docker login -u <username>
```

Replace `<username>` with your Docker Hub username. You will be prompted to enter your password.

### 4. Push Your Docker Image

Push your Docker image to Docker Hub:

```bash
docker push <username>/<repository>:<tag>
```

This command uploads your Docker image to your Docker Hub account.

## Update Kubernetes Manifest Files

### Create Namespace

Create a Kubernetes namespace for your deployments:

```bash
kubectl create namespace three-tier
```

### Deploy the Database

Maintain the following sequence when deploying the database:

```bash
kubectl apply -f secrets.yaml -n three-tier
kubectl apply -f pv.yaml -n three-tier
kubectl apply -f pvc.yaml -n three-tier
kubectl apply -f deployment.yaml -n three-tier
kubectl apply -f service.yaml -n three-tier
```

### Backend Deployment

Deploy the backend components with:

```bash
kubectl apply -f deployment.yaml -n three-tier
kubectl apply -f service.yaml -n three-tier
```

### Nginx Reverse Proxy Deployment

Deploy Nginx as a reverse proxy:

```bash
kubectl apply -f nginx_html_configmap.yaml -n three-tier
kubectl apply -f nginx_configmap.yaml -n three-tier
kubectl apply -f nginx_deploy.yaml -n three-tier
kubectl apply -f nginx-service.yaml -n three-tier
```

### Frontend Deployment

Before deploying the frontend, update the backend URL in the `deployment.yaml` file:

1. Run the following command to get the node port IP of your Nginx service associated to port 80:

    ```bash
    kubectl get svc -n three-tier
    ```

2. Obtain your local IP with Minikube:

    ```bash
    minikube ip
    ```

3. Update line 32 in the `deployment.yaml` file to change the backend URL to:

    ```
    http://<yourIP-addressorlocalhost>:<nodeport-ip>/api/tasks
    ```

Then apply these files:

```bash
kubectl apply -f deployment.yaml -n three-tier
kubectl apply -f service.yaml -n three-tier
```

### Access Your Frontend

Now, you can access your frontend from:

```
http://<yourIP-addressorlocalhost>:<nodeport-ip>
```

## All Done

You have now successfully deployed your application.

