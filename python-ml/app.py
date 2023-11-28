from flask import Flask, request
from controllers import create_patient, get_all_patients, get_patient_by_id, update_patient, delete_patient
from models import db

app = Flask(__name__)


# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name' # For MySQL
# pip install mysqlclient # For MySQL


# pip install Flask Flask-MongoEngine  #If using MongoDB, Switch this line of code to MongoDB
# app.config['MONGODB_SETTINGS'] = {
#     'db': 'your_database_name',
#     'host': 'your_mongo_server',
#     'port': 27017,
#     'username': 'your_username',
#     'password': 'your_password',
#     'authentication_source': 'admin'  # Optional, if your MongoDB requires authentication
# }
# db = MongoEngine()


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db' # Basic
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)

@app.before_first_request
def create_tables():
    db.create_all()




@app.route('/patients', methods=['GET']) # Get all patients
def get_patients():
    return get_all_patients()





@app.route('/patients', methods=['POST']) # Create new patient
def add_patient():
    data = request.get_json()
    return create_patient(data)

@app.route('/patients/<int:patient_id>', methods=['GET']) # Get patient from Id
def get_patient(patient_id):
    return get_patient_by_id(patient_id)

@app.route('/patients/<int:patient_id>', methods=['PUT']) # Update patient from Id
def update_patient_route(patient_id):
    data = request.get_json()
    return update_patient(patient_id, data)

@app.route('/patients/<int:patient_id>', methods=['DELETE']) # Delete patient from Id
def delete_patient_route(patient_id):
    return delete_patient(patient_id)





if __name__ == '__main__':
    app.run(debug=True)
