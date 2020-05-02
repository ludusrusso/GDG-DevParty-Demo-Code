ng build --prod
eval $(minikube docker-env)
docker build -f docker/Dockerfile -t devparty2020-gui .
