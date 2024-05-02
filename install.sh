#!/bin/bash

root_dir="$(dirname $(readlink -f "$0"))"
current_dir="$root_dir/web"
demo_archive="$(dirname $root_dir)/lct-test-fct/data/archive_asso.lbk"
mkdir -p $current_dir
cd $current_dir

if [ -z "$1" ]
then
    if [ ! -f virt/bin/activate ]
    then
        python3 -m virtualenv --python=$PYTHONVER virt 2>&1  || echo "no virtualenv"
    fi
    [ -f virt/bin/activate ] && . virt/bin/activate
    pip install -U pip gunicorn lucterios lucterios-documents lucterios-contacts diacamma-financial diacamma-asso --extra-index-url https://pypi.lucterios.org/simple
else
    [ -f virt/bin/activate ] && . virt/bin/activate
fi

if [ ! -d  clienttest ]
then
    lucterios_admin.py add -n clienttest -p diacamma.asso -m lucterios.contacts,lucterios.documents,lucterios.mailing,diacamma.accounting,diacamma.payoff,diacamma.invoice,diacamma.member,diacamma.event
else
    lucterios_admin.py modif -n clienttest -p diacamma.asso -m lucterios.contacts,lucterios.documents,lucterios.mailing,diacamma.accounting,diacamma.payoff,diacamma.invoice,diacamma.member,diacamma.event
fi
if [ -z "$2" -a -f "$demo_archive" ]
then
    lucterios_admin.py restore -n clienttest -f "$demo_archive"
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
stdout_logfile=$current_dir/clienttest.log
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

    index index.html;

    location /new/ {
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

    location /dist/ {
        alias $root_dir/dist/;
        index index.html;
    }

    location / {
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

