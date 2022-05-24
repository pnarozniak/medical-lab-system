const TestRepository = require('../../repositories/sequelize/TestRepository')

exports.getTests = (req, res, next) => {
    TestRepository.getTests()
        .then(tests => {
            res.status(200).json(tests)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getTestById = (req, res, next) => {
    const {testId} = req.params
    TestRepository.getTestById(testId)
        .then(test => {
            if(!test) {
                return res.status(404).send()
            }

            res.status(200).json(test)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createTest = (req, res, next) => {
    TestRepository.createTest(req.body)
        .then(newTest => {
            res.status(200).json(newTest)
        })
        .catch(err => {
            return res.status(400).json(err)
        })
}

exports.updateTest = (req, res, next) => {
    const {testId} = req.params
    TestRepository.updateTest(testId, req.body)
        .then(([rowsUpdated]) => {
            if (rowsUpdated == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            return res.status(400).json(err)
        })
}

exports.deleteTest = (req, res, next) => {
    const {testId} = req.params
    TestRepository.deleteTest(testId)
        .then(rowsDeleted => {
            if (rowsDeleted == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            return res.status(400).json(err)
        })
}