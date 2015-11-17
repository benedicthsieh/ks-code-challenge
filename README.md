# ks-code-challenge

Node application. Requires Node.
(https://nodejs.org/en/download/package-manager/)

To run interactively:  
$ node main.js

Or on a file:  
$ node main.js sample-input.txt

Needs node version 4.6.85.28 or higher. You can check by running this command:  
$ node -p process.versions.v8  
4.6.85.28

I upgraded node with this method, but read the caveat / alternatives first.  
$ sudo npm cache clean -f  
$ sudo npm install -g n  
$ sudo n stable  
(https://davidwalsh.name/upgrade-nodejs)

For tests:  
$ sudo npm install -g mocha  
$ sudo npm install -g sinon

Current assumptions:  
-Non-persistent app.  
-Same card, different projects is okay for the same user. One user can also have multiple cards.  
-Second 'back' command for same user, same project updates the pledge amount, replacing previous.  
-Second 'back' command for same user, same project can change the credit card, but does not release the original card into the 'unused' pool.  
