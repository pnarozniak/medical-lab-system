require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const sequelizeInit = require('./configs/sequelize/init')
sequelizeInit()
  .catch(err=> {
    console.log(err)
  })

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cors')())

//api routes
const testApiRouter = require('./routes/api/TestApiRoute')
const patientApiRouter = require('./routes/api/PatientApiRoute')
const examinationApiRouter = require('./routes/api/ExaminationApiRoute')
const authApiRouter = require('./routes/api/AuthApiRoute')
const employeeApiRouter = require('./routes/api/EmployeeApiRoute')
const supplierApiRouter = require('./routes/api/SupplierApiRoute')
const deliveryApiRouter = require('./routes/api/deliveryApiRoute')
const deliveryContentApiRouter = require('./routes/api/deliveryContentApiRoute')

const { authenticateJWT } = require('./middlewares/auth-middleware')

app.use('/api/tests', testApiRouter)
app.use('/api/patients', patientApiRouter)
app.use('/api/examinations', examinationApiRouter)
app.use('/api/auth', authApiRouter)
app.use('/api/employees', authenticateJWT(['admin']),  employeeApiRouter)
app.use('/api/suppliers', authenticateJWT(['admin']),  supplierApiRouter)
app.use('/api/delivery', authenticateJWT(['admin']), deliveryApiRouter)
app.use('/api/delivery-content', authenticateJWT(['admin']), deliveryContentApiRouter)

module.exports = app;
