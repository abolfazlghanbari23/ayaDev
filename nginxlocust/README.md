# Nginx

Nginx is used for backend production deployment. On ubuntu you can install nginx with below command:
  
    sudo apt install nginx
After installing nginx, you have to add your configuration to nginx s
   
    $ cd /etc/nginx/sites-available
    $ sudo nano your_domain

In created file, you can add following configuration for go and node js. 

    server {
        server_name  192.168.99.135;
        location /go/ {
            proxy_pass http://localhost:8080;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
        location /nodejs/ {
            proxy_pass http://localhost:8081;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    
        location / {
            root /home/webcourse/WebHomeWork1/front;
        }
    }
    
Section below serve our index.html file given it's direction

        location / {
            root /home/webcourse/WebHomeWork1/front;
        }
Other two part are just for forwarding request to nodejs and go backend working on port **8081** and **8080**

Before deploying backends on server useing nginx we should create a system service for both go, and nodejs.

## Go Service
With below command you can create and executable file from main.go and use this file for your service ExecStart address. 

    $go build main.go

## Nodejs Service
For node it is different.We use **pm2** package that create node.js service automaticlally.
**pm2** can be installed, start and configured with bellow commands:
    
    npm install -g pm2
    pm2 start main.js
    pm2 startup systemd
    
# Locust
Locust can easly be installed with bellow command for python:
    
    $ pip3 install locust
Then using this library we create a file named **locustfile.py**.All server api are wtitten in this file as a task.
Using bellow command we can start locust server on localhost port 5000 to use locust userinterface on borrowser.
    
    $locust -f <locustfile.py_ddress> --host=https://<server_host>
Screen shots from the charts and records are provided in nginxlocust director.
RPS for api:
    
**METHOD**    -    **URL**    -   **RPS**
GET   -   /   -   1.4
POST   -   /go/sha256   -   0.5
GET   -   /go/write   -   0.2
POST   -   /nodejs/sha256   -   0.5
GET   -   /nodejs/write   -   0.3
aggregated   -   __   -    2.9
    








