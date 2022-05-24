const PatientRepository = require('../../repositories/sequelize/PatientRepository')

exports.getPatients = (req, res, next) => {
    PatientRepository.getPatients()
        .then(tests => {
            res.status(200).json(tests)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getPatientById = (req, res, next) => {
    const {patientId} = req.params
    PatientRepository.getPatientById(patientId)
        .then(patient => {
            if(!patient) {
                return res.status(404).send()
            }

            res.status(200).json(patient)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createPatient = (req, res, next) => {
    PatientRepository.createPatient(req.body)
        .then(newPatient => {
            res.status(201).json(newPatient)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.updatePatient = (req, res, next) => {
    const {patientId} = req.params
    PatientRepository.updatePatient(patientId, req.body)
        .then(([rowsUpdated]) => {
            if (rowsUpdated == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.deletePatient = (req, res, next) => {
    const {patientId} = req.params
    PatientRepository.deletePatient(patientId)
        .then(rowsDeleted => {
            if (rowsDeleted == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            res.status(400).json(err)
        })
}