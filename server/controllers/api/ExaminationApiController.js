const ExaminationRepository = require('../../repositories/sequelize/ExaminationRepository')

exports.getExaminations = (req, res, next) => {
    ExaminationRepository.getExaminations()
        .then(examinations => {
            res.status(200).json(examinations)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getExaminationById = (req, res, next) => {
    const {examinationId} = req.params
    ExaminationRepository.getExaminationById(examinationId)
        .then(examination => {
            if(!examination) {
                return res.status(404).send()
            }

            res.status(200).json(examination)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createExamination = (req, res, next) => {
    req.body.patientId = req.body.patient?.id
    req.body.testId = req.body.test?.id

    ExaminationRepository.createExamination(req.body)
        .then(newExamination => {
            res.status(201).json(newExamination)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.updateExamination = (req, res, next) => {
    req.body.patientId = req.body.patient?.id
    req.body.testId = req.body.test?.id
    
    const {examinationId} = req.params
    ExaminationRepository.updateExamination(examinationId, req.body)
        .then(([rowsUpdated]) => {
            if (rowsUpdated == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.deleteExamination = (req, res, next) => {
    const {examinationId} = req.params
    ExaminationRepository.deleteExamination(examinationId)
        .then(rowsDeleted => {
            if (rowsDeleted == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            res.status(400).json(err)
        })
}