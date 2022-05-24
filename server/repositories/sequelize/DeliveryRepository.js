const Supplier = require('../../models/sequelize/Supplier')
const Delivery = require('../../models/sequelize/Delivery')
const DeliveryContent = require('../../models/sequelize/DeliveryContent')
const Test = require('../../models/sequelize/Test')

exports.getDelivery = () => {
    return Delivery.findAll()
}

exports.getDeliveryWithDetails = () => {
    return Delivery.findAll({
        include: [
            { model: Supplier, as: 'supplier' },
            {
                model: DeliveryContent, as: 'deliveryDeliveryContent',
                include: [
                    {model: Test, as: 'deliveryTest'}
                ]
            }
        ]
    })
}

exports.getDeliveryById = (deliveryId) => {
    return Delivery.findByPk(deliveryId, {
        include: [
            { model: Supplier, as: 'supplier' },
            {
                model: DeliveryContent, as: 'deliveryDeliveryContent',
                include: [
                    {model: Test, as: 'deliveryTest'}
                ]
            }
        ]
    })
}

exports.createDelivery = (newDelivery) => {
    return Delivery.create({
        ...newDelivery
    })
}

exports.updateDelivery = (deliveryId, updatedDelivery) => {
    return Delivery.update({...updatedDelivery}, {where: {id: deliveryId}})
}

exports.deleteDelivery = (deliveryId) => {
    return Delivery.destroy({
        where: {id: deliveryId}
    })
}

exports.deleteDeliveryContent = (deliveryId) => {
    return DeliveryContent.destroy({
        where: {deliveryId: deliveryId}
    })
}