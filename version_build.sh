#!/bin/bash 

rootversion="2.0.1"
buildtstmp=$(git log -1 --format=%at)
build_number=$(python -c "import datetime;print(datetime.datetime.fromtimestamp(int('${buildtstmp}')).strftime('%y%m%d%H'))")

cd $(dirname $(readlink -f "$0"))
mkdir -p public/conf
touch public/conf/index.html
echo "${rootversion}.${build_number}" > public/conf/build

sed -i "s|jsversion: '.*'|jsversion: '${rootversion}.${build_number}'|g" src/libs/datastorage.js
