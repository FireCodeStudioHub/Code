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
### Creating the Database and User Collection
Once MongoDB is running, open the MongoDB shell using mongosh, and set up the database:

Create the database vulnerable_db and switch to it:
```
use vulnerable_db
```
Create the users collection and insert a few users:
```
db.createCollection("users")
```
Insert users for testing:
```
db.users.insertMany([
    { username: "admin", password: "supersecret" },
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" }
])
```
Check if users are correctly inserted:
```
db.users.find().pretty()
```

### Setting Up Flask Backend
```
pip install Flask Flask-CORS pymongo
```
### Create app.py for the Flask Backend
```
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)

# Enable CORS to allow requests from React
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client.vulnerable_db
users_collection = db.users

# Vulnerable login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Vulnerable to NoSQL Injection
    user = users_collection.find_one({'username': username, 'password': password})
    
    if user:
        return jsonify({'message': 'Login successful!'}), 200
    else:
        return jsonify({'message': 'Login failed!'}), 401

# Start Flask server
if __name__ == '__main__':
    app.run(debug=True, port=5000)
```
### Run
```
python app.py
```




