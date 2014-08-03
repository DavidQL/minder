# Minder
Node file server with easy user-defined share settings. A sample permissions.txt file:

```
1. Open to the public:
- open-file.txt
- open-file-2.txt

2. With password flooberjorbin:
- password-protected.txt

3. From 7/30/2014 until 8/15/2014:
- time-protected.txt

4. Rules 2 AND 3:
- compound-rule-file.txt
```

### Installation steps on CentOS

Download and expand the source code:

`curl -L https://github.com/DavidQL/minder/archive/v0.0.1.tar.gz | tar zx`

Go into the new minder directory:

`cd minder-0.0.1`

If you do not have node installed, run my install script (this will take some time):

`bash install.sh`

Then, cd into the Minder directory and run `npm install`.

### Usage

Add top-level user folders from which files will be served. Take a look at the included example_user_folder for examples.

Make sure each user folder has a permissions.txt file.

Start the file server with `node index.js`.

Files can then be queried like so:

`curl localhost:3000/example_user_folder/password-protected.txt?password=flooberjorbin`

### User folder setup

To create a folder in which Pam can add files, but other users cannot view them:

`useradd pam`

`mkdir pam`

`chmod 770 pam`

`chgrp pam pam`

Now the user pam can add a permissions.txt file to her folder, as well as any files she wants to serve.