from locust import HttpUser, task, between, TaskSet


class UserBehavior(TaskSet):
    def on_start(self):
        pass

    def on_stop(self):
        pass




class WebsiteUser(HttpUser):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000

    @task
    def index(self):
        self.client.get("/")

    @task
    def profile(self):
        self.client.get("/")

    @task
    def index_page(self):
        self.client.get(
            "/", json={"firstNum": 3245452, "secondNum": 265654848})

    @task
    def go_sum_sha256(self):
        self.client.post("/go/sha256")

    @task
    def node_sum_sha256(self):
        self.client.post("/nodejs/sha256",
                         json={"firstNum": 3245452, "secondNum": 265654848})

    @task
    def go_write(self):
        self.client.get("/go/write")

    @task
    def node_write(self):
        self.client.get("/nodejs/write")
