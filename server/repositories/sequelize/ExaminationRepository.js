const Test = require('../../models/sequelize/Test')
const Patient = require('../../models/sequelize/Patient')
const Examination = require('../../models/sequelize/Examination')

exports.getExaminations = () => {
    return Examination.findAll()
}

exports.getExaminationById = (examinationId) => {
    return Examination.findByPk(examinationId, {
        include: [
            { model: Patient, as: 'patient' },
            { model: Test, as: 'test' }
        ]
    })
}

exports.createExamination = (newExamination) => {
    return Examination.create({
        ...newExamination
    })
}

exports.updateExamination = (examinationId, updatedExamination) => {
    return Examination.update({...updatedExamination}, {where: {id: examinationId}})
}

exports.deleteExamination = (examinationId) => {
    return Examination.destroy({
        where: {id: examinationId}
    })
}