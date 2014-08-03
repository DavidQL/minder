#!/bin/sh

yum -y groupinstall "Development Tools"
yum install wget
cd /usr/src
wget http://nodejs.org/dist/v0.10.29/node-v0.10.29.tar.gz
tar zxf node-v0.10.29.tar.gz
cd node-v0.10.29
./configure
make
make install

echo "Now, using visudo, look for secure_path, and append the following to it: `:/usr/local/bin`."
echo "Then, cd into the Minder directory and run `npm install` (may require sudo)."
echo "Finally, start the file server with `node index.js`."