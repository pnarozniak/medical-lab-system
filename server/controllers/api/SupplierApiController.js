const SupplierRepository = require('../../repositories/sequelize/SupplierRepository')

exports.getSuppliers = (req, res, next) => {
    SupplierRepository.getSuppliers()
        .then(suppliers => {
            res.status(200).json(suppliers)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getSupplierById = (req, res, next) => {
    const {supplierId} = req.params
    SupplierRepository.getSupplierById(supplierId)
        .then(supplier => {
            if(!supplier) {
                return res.status(404).send()
            }

            res.status(200).json(supplier)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createSupplier = (req, res, next) => {
    SupplierRepository.createSupplier(req.body)
        .then(newSupplier => {
            res.status(201).json(newSupplier)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.updateSupplier = (req, res, next) => {
    const {supplierId} = req.params
    SupplierRepository.updateSupplier(supplierId, req.body)
        .then(([rowsUpdated]) => {
            if (rowsUpdated == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

exports.deleteSupplier = (req, res, next) => {
    const {supplierId} = req.params
    SupplierRepository.deleteSupplier(supplierId)
        .then(rowsDeleted => {
            if (rowsDeleted == 0)
                return res.status(404).send()

            res.status(204).send()
        })
        .catch(err => {
            res.status(400).json(err)
        })
}