# Minder
## Node file server with easy user-defined share settings

### Installation steps on CentOS

Download and expand the source code:
  `curl -L https://github.com/DavidQL/minder/archive/v0.2.tar.gz | tar zx`

Go into the new minder directory:
  `cd minder-0.2`

If you do not have node installed, run my install script (this will take some time):
  `bash install.sh`

Then, cd into the Minder directory and run `npm install`.
Finally, start the file server with `node index.js`."

### User folder setup

To create a folder in which Pam can add files, but other users cannot view them:
  `useradd pam`
  `mkdir pam`
  `chmod 770 pam`
  `chgrp pam pam`

  Now the user pam can add a permissions.txt file to her folder, as well as any files she wants to serve.