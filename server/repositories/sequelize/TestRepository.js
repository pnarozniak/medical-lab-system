const Test = require('../../models/sequelize/Test')
const Patient = require('../../models/sequelize/Patient')
const Examination = require('../../models/sequelize/Examination')


exports.getTests = () => {
    return Test.findAll()
}

exports.getTestById = (testId) => {
    return Test.findByPk(testId, {
        include: [{
            model: Examination,
            as: 'examinations',
            include: [{
                model: Patient,
                as: 'patient'
            }]
        }]
    })
}

exports.createTest = (newTest) => {
    return Test.create({
        ...newTest
    })
}

exports.updateTest = (testId, updatedTest) => {
    return Test.update({...updatedTest}, {where: {id: testId}})
}

exports.deleteTest = (testId) => {
    return Test.destroy({
        where: {id: testId}
    })
}