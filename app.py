from flask import Flask, redirect, url_for, render_template, json

# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
import pandas as pd
from bson import json_util


# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)
 
app= Flask(__name__, static_url_path='/static')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/locations")
def location():
    return render_template("marker.html")

@app.route("/stats")

def Stats():
    # Connect to a database. Will create one if not already available.
    db = client.incentivesDB
    radial = pd.DataFrame(list(db.radial.find()))
    # del radial['_id']

    return render_template("radial_stacked_bar_chart.html", tables=[radial.to_html()])


# Set route
@app.route('/programs')

def index():

    # Connect to a database. Will create one if not already available.
    # db = client.incentivesDB
    # program = db.laws

    # Store the entire team collection in a list
    # roster = json_util.dumps(list(program.find()))
    # print(roster)

    with open('Page_Code/Icentive_Map/refinedData.json') as f:
        roster = json.load(f)

    # Return the template with the teams list passed in
    return render_template('index1.html', states_data=roster)


if __name__ == "__main__":
    app.run(debug=True)