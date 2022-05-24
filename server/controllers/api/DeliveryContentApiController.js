const DeliveryContentRepository = require('../../repositories/sequelize/DeliveryContentRepository')

exports.createDeliveryContent = (req, res, next) => {
    DeliveryContentRepository.createDeliveryContent(req.body)
        .then(newDeliveryContent => {
            res.status(201).json(newDeliveryContent)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}