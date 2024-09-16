### Download the MongoDB GPG key
```
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg
```

### Add the MongoDB repository:
```
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```
Update the package list
```
sudo apt-get update

```
### Install MongoDB:
```
sudo apt-get install -y mongodb-org
```
Start the MongoDB service:
```
sudo systemctl start mongod
````
