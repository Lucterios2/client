#!/bin/bash

root_dir="$(dirname $(readlink -f "$0"))"
current_dir="$root_dir/web"
mkdir -p $current_dir
cd $current_dir

if [ -z "$1" ]
then
    if [ ! -f virt/bin/activate ]
    then
        python3 -m virtualenv --python=$PYTHONVER virt 2>&1  || echo "no virtualenv"
    fi
    [ -f virt/bin/activate ] && . virt/bin/activate
    pip install -U pip gunicorn lucterios lucterios-standard --extra-index-url https://pypi.lucterios.org/simple
else
    [ -f virt/bin/activate ] && . virt/bin/activate
fi

if [ ! -d  clienttest ]
then
    lucterios_admin.py add -n clienttest -p lucterios.standard -e '{"FORCE_SCRIPT_NAME":"lct","USE_X_FORWARDED_HOST":true}'
else
    lucterios_admin.py modif -n clienttest -p lucterios.standard -e '{"FORCE_SCRIPT_NAME":"lct","USE_X_FORWARDED_HOST":true}'
fi
python manage_clienttest.py collectstatic --noinput -l

supervisorfile="$current_dir/clienttest.conf"
nginxfile="$current_dir/nginxclienttest"

echo """[program:clienttest]
environment=DJANGO_SETTINGS_MODULE=clienttest.settings
command=$current_dir/virt/bin/gunicorn lucterios.framework.wsgi --bind 0.0.0.0:9900 -w 1
directory=$current_dir
user=$USER
autostart=true
autorestart=true
stdout_logfile=$current_dir/webmonitor.log
redirect_stderr=true
""" > $supervisorfile
sudo ln -sf $supervisorfile /etc/supervisor/conf.d/
sudo service supervisor restart

echo """
server {
    listen 9910;
    server_name localhost;
    access_log $current_dir/clienttest.access.log;
    error_log  $current_dir/clienttest.error.log;


    location / {
 #       alias $root_dir/;
 #       index index.html;
        proxy_pass http://127.0.0.1:5173;
        proxy_read_timeout    300;
        proxy_connect_timeout 300;
        proxy_redirect        off;
        proxy_set_header      Upgrade           \$http_upgrade;
        proxy_set_header      Connection        "upgrade";
        proxy_set_header      X-Real-IP         \$remote_addr;
        proxy_set_header      X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header      X-Forwarded-Proto https;
    }

    location /lct/ {
        proxy_pass http://127.0.0.1:9900;
        proxy_read_timeout    300;
        proxy_connect_timeout 300;
        proxy_redirect        off;
        proxy_set_header      Upgrade           \$http_upgrade;
        proxy_set_header      Connection        "upgrade";
        proxy_set_header      X-Real-IP         \$remote_addr;
        proxy_set_header      X-Forwarded-For   \$proxy_add_x_forwarded_for;
        proxy_set_header      X-Forwarded-Proto https;
    }

}
""" > $nginxfile
sudo ln -sf $nginxfile /etc/nginx/sites-enabled/    

sudo chmod -R ogu+rw .
sudo chown -R $USER:www-data .

sudo service nginx restart

