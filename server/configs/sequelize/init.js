const sequelize = require('./sequelize')

const Patient = require('../../models/sequelize/Patient')
const Test = require('../../models/sequelize/Test')
const Examination = require('../../models/sequelize/Examination')
const User = require('../../models/sequelize/User')
const Role = require('../../models/sequelize/Role')
const UserRole = require('../../models/sequelize/UserRole')
const DeliveryContent = require('../../models/sequelize/DeliveryContent')
const Delivery = require('../../models/sequelize/Delivery')
const Supplier = require('../../models/sequelize/Supplier')

const {hashPassword} = require('../../services/password-service')

module.exports = async () => {
    Patient.hasMany(Examination, 
        {as: 'examinations', foreignKey: 'patientId', constraints: true, onDelete: 'CASCADE'})
    Examination.belongsTo(Patient, {as: 'patient', foreignKey: 'patientId'})    

    Test.hasMany(Examination, 
        {as: 'examinations', foreignKey: 'testId', constraints: true, onDelete: 'CASCADE'})        
    Examination.belongsTo(Test, {as: 'test', foreignKey: 'testId'})  

    User.hasMany(UserRole, 
        {as: 'roles', foreignKey: 'userId', constraints: true, onDelete: 'CASCADE'})        
    UserRole.belongsTo(User, {as: 'user', foreignKey: 'userId'})  

    Role.hasMany(UserRole, 
        {as: 'users', foreignKey: 'roleId', constraints: true, onDelete: 'CASCADE'})        
    UserRole.belongsTo(Role, {as: 'role', foreignKey: 'roleId'})  

    Test.hasMany(DeliveryContent, 
        {as: 'testDeliveryContent', foreignKey: 'testId', constraints: true, onDelete: 'CASCADE'})        
    DeliveryContent.belongsTo(Test, { as: 'deliveryTest', foreignKey: 'testId' })  
    
    Delivery.hasMany(DeliveryContent, 
        {as: 'deliveryDeliveryContent', foreignKey: 'deliveryId', constraints: true, onDelete: 'CASCADE'})        
    DeliveryContent.belongsTo(Delivery, { as: 'delivery', foreignKey: 'deliveryId' })  

    Supplier.hasMany(Delivery, 
        {as: 'delivery', foreignKey: 'supplierId', constraints: true, onDelete: 'CASCADE'})        
    Delivery.belongsTo(Supplier, { as: 'supplier', foreignKey: 'supplierId' })  

    const examplePatients = [
        {firstName: 'John', lastName: 'Doe', birthdate: '1990-10-04', gender: 1, email: 'john.doe@gmail.com', phoneNumber: '333209192'},
        {firstName: 'Artur', lastName: 'Nowak', birthdate: '1983-07-01', gender: 1, email: 'artur.nowak@gmail.com', phoneNumber: null},
        {firstName: 'Jan', lastName: 'Kowalski', birthdate: '1990-02-11', gender: 1, email: 'jan.kowalski@gmail.com', phoneNumber: '938123818'},
        {firstName: 'Natalia', lastName: 'Kwiatkowska', birthdate: '2000-11-21', gender: 2, email: 'natalia.kwiatkowska@gmail.com', phoneNumber: '849173292'}
    ]

    const exampleTests = [
        {name: 'Genetyczny RT-PCR', effectiveness: 97.09, estimatedDuration: '00:13:30', constraindications: null},
        {name: 'Antygenowy', effectiveness: 88.83, estimatedDuration: '00:4:55', constraindications: null},
        {name: 'Serologiczny', effectiveness: 99.13, estimatedDuration: '00:16:42', constraindications: null}
    ]

    const exampleExaminations = [
        {arrangedAt: '2021-01-19 16:14:00', referal: 1, result: 1},
        {arrangedAt: '2021-02-16 13:00:00', referal: 0, result: 0},
        {arrangedAt: '2021-02-24 15:25:00', referal: 1, result: 1},
        {arrangedAt: '2021-05-16', referal: 0, result: 1},
        {arrangedAt: '2021-12-01', referal: 0, result: null},
        {arrangedAt: '2021-12-15', referal: 1, result: null}
    ]

    const exampleRoles = [
        {name: 'admin'},
        {name: 'registrator'},
        {name: 'laborant'}
    ]

    const exampleUsers = [
        {email: 'admin@example.com', firstName: "Artur", lastName:"Doe", hashedPassword: await hashPassword('Abcdef1')},
        {email: 'registrator@example.com', firstName: "Abraham", lastName:"This", hashedPassword: await hashPassword('Abcdef1')},
        {email: 'laborant@example.com', firstName: "Frank", lastName:"Lampart", hashedPassword: await hashPassword('Abcdef1')},
    ]

    const exampleUserRoles = [
        
    ]

    const exampleSuppliers = [
        { name: 'DHL Medical', contactEmail: 'dhl.medical@gmail.com' },
        { name: 'DPD Hospitality', contactEmail: 'dpd.hospitality@gmail.com' }
    ]

    const exampleDelivery = [
        { plannedAt: '2021-05-16', deliveredAt: '2021-05-17', comments: null },
        { plannedAt: '2022-01-15', deliveredAt: null, comments: null }
    ]

    const exampleDeliveryContent = [
        { amount: 10, expiresAt: '2022-01-17' },
        { amount: 12, expiresAt: '2022-01-17' },
        { amount: 13, expiresAt: '2022-01-17' },

        { amount: 21, expiresAt: '2023-01-01' },
        { amount: 7, expiresAt: '2023-01-01'}
    ]

    let insertedPatients, insertedTests
    let insertedUsers, insertedRoles
    let insertedSuppliers, insertedDelivery

    return sequelize
        .sync({force: true})
        .then(()=>Patient.findAll())
        .then(patients => {
            if (!patients || patients.length == 0) {
                return Patient.bulkCreate(examplePatients)
                    .then(()=>Patient.findAll())
            }
            return patients
        })
        .then(patients => {
            insertedPatients = patients
            return Test.findAll()
        })
        .then(tests => {
            if (!tests || tests.length == 0) {
                return Test.bulkCreate(exampleTests)
                    .then(()=>Test.findAll())
            }
            return tests
        })
        .then(tests => {
            insertedTests = tests
            return Examination.findAll()
        })
        .then(examinations => {
            if (!examinations || examinations.length == 0) {
                Examination.bulkCreate([
                    {...exampleExaminations[0], testId: insertedTests[0].id, patientId: insertedPatients[0].id},
                    {...exampleExaminations[1], testId: insertedTests[0].id, patientId: insertedPatients[1].id},
                    {...exampleExaminations[2], testId: insertedTests[0].id, patientId: insertedPatients[1].id},
                    {...exampleExaminations[3], testId: insertedTests[1].id, patientId: insertedPatients[2].id},
                    {...exampleExaminations[4], testId: insertedTests[1].id, patientId: insertedPatients[0].id},
                    {...exampleExaminations[5], testId: insertedTests[2].id, patientId: insertedPatients[3].id}
                ])
            }
        })
        .then(()=>User.findAll())
        .then(users => {
            if (!users || users.length == 0) {
                return User.bulkCreate(exampleUsers)
                    .then(()=>User.findAll())
            }
            return users
        })
        .then(users => {
            insertedUsers = users
            return Role.findAll()
        })
        .then(roles => {
            if (!roles || roles.length == 0) {
                return Role.bulkCreate(exampleRoles)
                    .then(()=>Role.findAll())
            }
            return roles
        })
        .then(roles => {
            insertedRoles = roles
            return UserRole.findAll()
        })
        .then(usersRoles => {
            if (!usersRoles || usersRoles.length == 0) {
                UserRole.bulkCreate([
                    {userId: insertedUsers[0].id, roleId: insertedRoles[0].id},
                    {userId: insertedUsers[1].id, roleId: insertedRoles[1].id},
                    {userId: insertedUsers[2].id, roleId: insertedRoles[2].id},
                ])
            }
        })
        .then(()=>Supplier.findAll())
        .then(suppliers => {
            if (!suppliers || suppliers.length == 0) {
                return Supplier.bulkCreate(exampleSuppliers)
                    .then(()=>Supplier.findAll())
            }
            return suppliers
        })
        .then(suppliers => {
            insertedSuppliers = suppliers
            return Delivery.findAll()
        })
        .then(delivery => {
            if (!delivery || delivery.length == 0) {
                return Delivery.bulkCreate([
                    { ...exampleDelivery[0], supplierId: insertedSuppliers[0].id },
                    { ...exampleDelivery[1], supplierId: insertedSuppliers[1].id }
                ])
                .then(()=>Delivery.findAll())
            }
            return delivery
        })
        .then(delivery => {
            insertedDelivery = delivery
            return DeliveryContent.findAll()
        })
        .then(deliveryContents => {
            if (!deliveryContents || deliveryContents.length == 0) {
                return DeliveryContent.bulkCreate([
                    { ...exampleDeliveryContent[0], deliveryId: insertedDelivery[0].id, testId: insertedTests[0].id },
                    { ...exampleDeliveryContent[1], deliveryId: insertedDelivery[0].id, testId: insertedTests[1].id },
                    { ...exampleDeliveryContent[2], deliveryId: insertedDelivery[0].id, testId: insertedTests[2].id },

                    { ...exampleDeliveryContent[3], deliveryId: insertedDelivery[1].id, testId: insertedTests[0].id },
                    { ...exampleDeliveryContent[4], deliveryId: insertedDelivery[1].id, testId: insertedTests[1].id },
                ])
                .then(()=>DeliveryContent.findAll())
            }
            return deliveryContents
        })
    }
        