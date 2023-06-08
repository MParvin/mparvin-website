---
title: Compile nginx on FreeBSD
type: page
description: By following these steps, you will successfully install and configure NGinx on your FreeBSD system.
topic: installations
---

To begin the installation process for NGinx on FreeBSD, follow these steps:

1. Install PECL (Perl Compatible Regular Expressions) by running the following command:
```shell
pkg_add pecl
```

2. Proceed to install wget using the following command:

```shell
pkg_add wget
```
3. Download the NGinx source code from the official website. Use the wget command to retrieve the source code file:

```shell
wget https://nginx.org/download/nginx-1.17.0.tar.gz
```

4. Extract the downloaded file using the following command:

```shell
tar xzvf nginx-1.17.0.tar.gz
```

5. Configure the Makefile for NGinx by navigating into the extracted directory and running the configure script with the desired parameters:

```shell
cd nginx-1.17.0
./configure --sbin-path=/usr/local/sbin/nginx \
              --conf-path=/etc/nginx/nginx.conf \
              --pid-path=/var/run/nginx.pid \
              --with-http_ssl_module \
              --http-log-path=/var/log/nginx.log \
              --error-log-path=/var/log/nginx-error.log \
              --http-fastcgi-temp-path=/var/tmp/fastcgi_tmp \
              --http-proxy-temp-path=/var/tmp/proxy_tmp \
              --http-client-body-temp-path=/var/tmp/client_body_temp \
              --with-http_stub_status_module \
              --user=www --group=www
```

6. Proceed to compile and install NGinx by running the following commands:

```shell
make && make install
```

7. Once the installation is complete, start NGinx using the following command:

```shell
/usr/local/sbin/nginx
```

If you need to restart NGinx at any point, use the following command:

```shell
kill -HUP $(head -1 /var/run/nginx.pid)
```

To stop NGinx, execute the following command:

```shell
kill -QUIT $(cat /var/run/nginx.pid)
```

### Adding service
To ensure NGinx starts automatically on system boot and can be managed as a service, you can add it to the FreeBSD service management system. Follow these steps:

1. Create a file named nginx in the /usr/local/etc/rc.d/ directory. Use the following command to create the file
```shell
vi /usr/local/etc/rc.d/nginx
```
and put following content on it:
```shell
#!/bin/sh

# PROVIDE: nginx
# REQUIRE: LOGIN cleanvar
# KEYWORD: shutdown

. /etc/rc.subr

name="nginx"
rcvar="nginx_enable"

start_cmd="${name}_start"
stop_cmd="${name}_stop"
reload_cmd="${name}_reload"

load_rc_config $name

# NGinx binary path
nginx_bin="/usr/local/sbin/nginx"

# NGinx configuration file
nginx_conf="/etc/nginx/nginx.conf"

# NGinx PID file
nginx_pid="/var/run/nginx.pid"

command="/usr/sbin/daemon"

command_args="-r -P $nginx_pid $nginx_bin -c $nginx_conf"

nginx_start()
{
    ${command} ${command_args}
}

nginx_stop()
{
    kill -QUIT $(cat $nginx_pid)
}

nginx_reload()
{
    kill -HUP $(cat $nginx_pid)
}

run_rc_command "$1"
```

2. Enable service
```shell
sysrc nginx_enable=YES
```

3. Start nginx
```shell
service nginx start
```


To `stop`, `start` and `reload` service use the following commands:
```shell
service nginx start
service nginx stop
service nginx reload
```