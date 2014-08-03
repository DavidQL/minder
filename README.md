# Minder
## Node file server with easy user-defined share settings

### Installation steps on CentOS

Download and expand the source code:
  `curl -L https://github.com/DavidQL/minder/archive/v0.1.tar.gz | tar zx`

Go into the new minder directory:
  `cd minder-0.1`

If you do not have node installed, run the install script:
  `bash install.sh`

Using visudo, look for secure_path, and append the following to it: `:/usr/local/bin`."
Then, cd into the Minder directory and run `npm install` (may require sudo)."
Finally, start the file server with `node index.js`."

Todo: 

[] node app restarts when config file is changed
[] bash script to install node and app
[] 