const DeliveryContent = require('../../models/sequelize/DeliveryContent')

exports.createDeliveryContent = (newDeliveryContentArray) => {
    return DeliveryContent.bulkCreate(newDeliveryContentArray)
}

exports.updateDeliveryContent = (deliveryContentId, updatedDeliveryContent) => {
    return DeliveryContent.update({...updatedDeliveryContent}, {where: {id: deliveryContentId}})
}

exports.deleteDeliveryContent = (deliveryContentId) => {
    return DeliveryContent.destroy({
        where: {id: deliveryContentId}
    })
}

exports.getDeliveryContentById = (deliveryContentId) => {
    return DeliveryContent.findByPk(deliveryContentId)
}