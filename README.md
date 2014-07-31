# Minder
## Node file server with easy user-defined share settings

### Installation steps on CentOS

`
yum -y groupinstall "Development Tools"
cd /usr/src
wget http://nodejs.org/dist/v0.10.29/node-v0.10.29.tar.gz
tar zxf node-v0.10.4.tar.gz
cd node-v0.10.4
./configure
make
make install
sudo visudo
	Look for secure_path, and append the following to it: ":/usr/local/bin". 
npm install -g express
`
Todo: 

[] node app restarts when config file is changed