docker run --name weapp_pg -d \
--publish 5455:5432 \
--restart always \
--env 'DB_USER=weapp' --env 'DB_PASS=sxxxfb6DDnQaapNxxxxxxFVpXrt2F' \
--env 'DB_NAME=weapp' \
registry.docker-cn.com/sameersbn/postgresql:9.6-2