const Test = require('../../models/sequelize/Test')
const Patient = require('../../models/sequelize/Patient')
const Examination = require('../../models/sequelize/Examination')


exports.getPatients = () => {
    return Patient.findAll()
}

exports.getPatientById = (patientId) => {
    return Patient.findByPk(patientId, {
        include: [{
            model: Examination,
            as: 'examinations',
            include: [{
                model: Test,
                as: 'test'
            }]
        }]
    })
}

exports.createPatient = (newPatient) => {
    return Patient.create({
        ...newPatient
    })
}

exports.updatePatient = (patientId, updatedPatient) => {
    return Patient.update({...updatedPatient}, {where: {id: patientId}})
}

exports.deletePatient = (patientId) => {
    return Patient.destroy({
        where: {id: patientId}
    })
}