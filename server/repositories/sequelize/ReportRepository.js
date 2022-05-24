const Test = require('../../models/sequelize/Test')
const Examination = require('../../models/sequelize/Examination')
const DeliveryContent = require('../../models/sequelize/DeliveryContent')
const Delivery = require('../../models/sequelize/Delivery')

exports.getDataForWarehouseReport = (from, to) => {
    return Test.findAll({
        include: [
            { model: Examination, as: 'examinations' }
        ]
    })
    .then(tests => {
        return tests.map(test => {
            let left = 0, wasted = 0
            
            return DeliveryContent.findAll({ where: { testId: test.id }, include: [{model: Delivery, as: 'delivery'}] })
                .then(deliveryContents => {
                    return deliveryContents.filter(dc => {
                        return dc.delivery.deliveredAt && new Date(dc.delivery.deliveredAt) < new Date()
                    })
                })
                .then(deliveryContents => {
                    return deliveryContents.map(dc => dc.amount).reduce((a,b)=>a+b)
                })
                .then(totalAmount => {
                    const used = !test.examinations ? 0 : test.examinations.filter(e => e.arrangedAt > from && e.arrangedAt < to && e.arrangedAt <= new Date()).length
                    const required = !test.examinations ? 0 : test.examinations.filter(e => e.arrangedAt > from && e.arrangedAt < to && e.arrangedAt > new Date()).length

                    return {
                        test: test.name,
                        used: used,
                        required: required,
                        left: left,
                        wasted: wasted
                    }
                })
        })
    })
}