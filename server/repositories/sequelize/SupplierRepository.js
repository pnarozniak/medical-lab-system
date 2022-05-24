const Supplier = require('../../models/sequelize/Supplier')
const Delivery = require('../../models/sequelize/Delivery')

exports.getSuppliers = () => {
    return Supplier.findAll()
}

exports.getSupplierById = (supplierId) => {
    return Supplier.findByPk(supplierId, {
        include: [{
            model: Delivery,
            as: 'delivery'
        }]
    })
}

exports.createSupplier = (newSupplier) => {
    return Supplier.create({
        ...newSupplier
    })
}

exports.updateSupplier = (supplierId, updatedSupplier) => {
    return Supplier.update({...updatedSupplier}, {where: {id: supplierId}})
}

exports.deleteSupplier = (supplierId) => {
    return Supplier.destroy({
        where: {id: supplierId}
    })
}