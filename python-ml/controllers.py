from flask import jsonify
from models import db, Patient

def create_patient(data):
    new_patient = Patient(name=data['name'], description=data['description'])
    db.session.add(new_patient)
    db.session.commit()
    return jsonify(new_patient.to_dict()), 201

def get_all_patients():
    patients = Patient.query.all()
    patients_list = [patient.to_dict() for patient in patients]
    return jsonify(patients_list)

def get_patient_by_id(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    return jsonify(patient.to_dict())

def update_patient(patient_id, data):
    patient = Patient.query.get_or_404(patient_id)
    patient.name = data['name']
    patient.description = data['description']
    db.session.commit()
    return jsonify(patient.to_dict())

def delete_patient(patient_id):
    patient = Patient.query.get_or_404(patient_id)
    db.session.delete(patient)
    db.session.commit()
    return jsonify({'message': 'Patient deleted successfully'})
