from flask import Flask, render_template

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
from bson import json_util

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.incentivesDB

program = db.programs

# Set route
@app.route('/')
def index():
    # Store the entire team collection in a list
    roster = json_util.dumps(list(program.find()))
    print(roster)

    # Return the template with the teams list passed in
    return render_template('index.html', states_data=roster)


if __name__ == "__main__":
    app.run(debug=True)
