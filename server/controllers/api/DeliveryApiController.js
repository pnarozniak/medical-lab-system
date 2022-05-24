const DeliveryRepository = require('../../repositories/sequelize/DeliveryRepository')
const DeliveryContentRepository = require('../../repositories/sequelize/DeliveryContentRepository')
const DeliveryContent = require('../../models/sequelize/DeliveryContent')

exports.getDelivery = (req, res, next) => {
    DeliveryRepository.getDelivery()
        .then(delivery => {
            res.status(200).json(delivery)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getDeliveryById = (req, res, next) => {
    const {deliveryId} = req.params
    DeliveryRepository.getDeliveryById(deliveryId)
        .then(delivery => {
            if(!delivery) {
                return res.status(404).send()
            }

            res.status(200).json(delivery)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createDelivery = (req, res, next) => {
    req.body.supplierId = req.body.supplier?.id
    
    DeliveryRepository.createDelivery(req.body)
        .then(newDelivery => {
            res.status(201).json(newDelivery)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.updateDelivery = (req, res, next) => {
    req.body.supplierId = req.body.supplier?.id
    
    const {deliveryId} = req.params
    DeliveryRepository.updateDelivery(deliveryId, req.body)
        .then(([rowsUpdated]) => {
            if (rowsUpdated == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.deleteDelivery = (req, res, next) => {
    const {deliveryId} = req.params
    DeliveryRepository.deleteDelivery(deliveryId)
        .then(rowsDeleted => {
            if (rowsDeleted == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.updateDeliveryContent = (req, res, next) => {
    const { deliveryId } = req.params
    const readyToInsert = req.body.map(c => {
        return {
            amount: c.amount,
            expiresAt: c.expiresAt,
            testId: c.testId,
            deliveryId: deliveryId
        }
    })

    DeliveryRepository.deleteDeliveryContent(deliveryId)
    .then(_ => {
        DeliveryContentRepository.createDeliveryContent(readyToInsert)
        .then(_ => {
            res.status(204).send()
        })
        .catch(err => {
            res.status(400).json(err)
        })
    })
    .catch(err => {
        res.status(400).json(err)
    })
}