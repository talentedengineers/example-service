# Example Service

```bash
kubectl create namespace my-namespace-001

kubectl apply -f example-service.yaml -n my-namespace-001

kubectl apply -f example-service-ingress.yaml -n my-namespace-001

kubectl delete namespace my-namespace-001
```

`http://example.linkbird.io/instance-001/api/v1/generate`
