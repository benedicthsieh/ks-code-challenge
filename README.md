# ks-code-challenge

Node application. Requires Node and prompt module ('npm install prompt').

$ node -p process.versions.v8
4.6.85.28

Current assumptions:
-Non-persistent app.
-Same card, different projects is okay for the same user. One user can also have multiple cards.
-Second 'back' command for same user, same project UPDATES the pledge amount, replacing previous.
-Second 'back' command for same user, same project can change the credit card, but does not release the original card into the 'unused' pool.

Questionable Decisions:
- Use npm assert library despite warnings.