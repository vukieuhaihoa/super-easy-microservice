PHONY: build_event_bus, push_event_bus

# Event bus service
build_event_bus:
	docker build -t haihoanguci/event_bus_service ./event-bus
push_event_bus:
	docker push haihoanguci/event_bus_service 
run_event_bus:
	kubectl apply -f ./infra/k8s/event-bus-depl.yaml
update_event_bus:
	kubectl rollout restart deployment event-bus-depl

# Posts service
build_post:
	docker build -t haihoanguci/post_service ./posts
push_post:
	docker push haihoanguci/post_service
run_post:
	kubectl apply -f ./infra/k8s/posts-depl.yaml
update_post:
	kubectl rollout restart deployment posts-depl

# Comments service
build_comment:
	docker build -t haihoanguci/comment_service ./comments
push_comment:
	docker push haihoanguci/comment_service 
run_comment:
	kubectl apply -f ./infra/k8s/comments-depl.yaml
update_comment:
	kubectl rollout restart deployment comments-depl 

# Moderation service
build_moderation:
	docker build -t haihoanguci/moderation_service ./moderation
push_moderation:
	docker push haihoanguci/moderation_service 
run_moderation:
	kubectl apply -f ./infra/k8s/moderations-depl.yaml
update_moderation:
	kubectl rollout restart deployment modarations-depl 

# Query service
build_query:
	docker build -t haihoanguci/query_service ./query
push_query:
	docker push haihoanguci/query_service 
run_query:
	kubectl apply -f ./infra/k8s/querys-depl.yaml
update_query:
	kubectl rollout restart deployment querys-depl 

# client site ui service
build_client:
	docker build -t haihoanguci/client_service ./blog
push_client:
	docker push haihoanguci/client_service 
run_client:
	kubectl apply -f ./infra/k8s/client-depl.yaml
update_client:
	kubectl rollout restart deployment client-depl 

run_ingress:
	kubectl apply -f ./infra/k8s/ingress-srv.yaml