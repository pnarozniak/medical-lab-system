const UserRepository = require('../../repositories/sequelize/UserRepository')
const {hashPassword} = require('../../services/password-service')

exports.getEmployees = (req, res, next) => {
    UserRepository.getUsers()
        .then(employees => {
            res.status(200).json(employees)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteEmployee = (req, res, next) => {
    const {employeeId} = req.params
    UserRepository.deleteUser(employeeId)
        .then(rowsDeleted => {
            if (rowsDeleted == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.getEmployeeById = (req, res, next) => {
    const {employeeId} = req.params
    UserRepository.getUserById(employeeId)
        .then(employee => {
            if(!employee) {
                return res.status(404).send()
            }

            let parsedEmployee = JSON.parse(JSON.stringify(employee))
            parsedEmployee.roles = parsedEmployee.roles.map(r => r.role.name)
            
            res.status(200).json(parsedEmployee)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createEmployee = (req, res, next) => {
    if (!req.body.password)
        return res.sendStatus(400)

    req.body.hashedPassword = req.body.password

    UserRepository.createUser(req.body)
        .then(newEmployee => {
            res.status(201).json(newEmployee)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

//todo
exports.updateEmployee = (req, res, next) => {
    if (!req.body.password)
        return res.sendStatus(400)

    req.body.hashedPassword = req.body.password
    const {employeeId} = req.params

    UserRepository.updateUser(employeeId, req.body)
        .then(rowsUpdated => {
            if (!rowsUpdated || rowsUpdated == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
}