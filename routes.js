var path = require('path')
var request = require('request');

const organizationController = require(__dirname + '/server/controllers/orgController');
const usersController = require(__dirname + '/server/controllers/usersController');
const accessrolesController = require(__dirname + '/server/controllers/accessrolesController');
const devicetransController = require(__dirname + '/server/controllers/devicetransController');
const deviceController = require(__dirname + '/server/controllers/deviceController');
const actionController = require(__dirname + '/server/controllers/actionController');
const action_accessrolesController = require(__dirname + '/server/controllers/action_accessrolesController');
const deliveryScheduleController = require(__dirname + '/server/controllers/deliveryScheduleController');

module.exports = function (app) {

    //---------------Security Routing----------------------------------------------
    function checkAuth (req, res, next) {

        if(req.url !== '/login') {
            if (req.url !== '/' && (!req.session || !req.session.authenticated)) {
                res.render('unauthorised', {status: 403});
                return;
            }
        }
        next();
    }
    app.use(checkAuth);
    app.post('/login', function (req, res, next) {
        usersController.auth(req,res)
    });
    app.get('/logout', function (req, res, next) {
        delete req.session.authenticated;
        res.redirect('/');
    });
    //---------------Security Routing----------------------------------------------

    // Setup a default catch-all route that sends back a welcome message in JSON format.
    app.get('/', function(req, res) {
        res.render('welcome');
    });
    //routing to main views
    app.get('/organizations', function (req, res, next) {
        organizationController.list(req, res)
    });
    app.get('/create-org-delivery-schedule', function (req, res, next) {
        deliveryScheduleController.create(req, res)
    });
    app.get('/users', function (req, res, next) {
        usersController.listJoinRef(req, res)
    });
    app.get('/roles', function (req, res, next) {
        accessrolesController.list(req, res)
    });
    app.get('/roots', function (req, res, next) {
        res.render('roots')
    });
    app.get('/devices', function (req, res, next) {
        deviceController.list(req, res)
    });

    app.get('/statloadtrans', function (req, res, next) {
        res.render('statloadtrans', {statloadtrans: {}, user:req.session.username})
    });

    app.get('/available-monitor', function (req, res, next) {
        request( {
            url : "https://smartcoolerbackend.mybluemix.net" + "/getlasttrans"
        },function (error, response, body) {
            res.render('available-monitor', {data: JSON.parse(body), user:req.session.username})
        });
    });
    app.get('/show-statloadtransday', function (req, res, next) {
        request( {
            url : "https://smartcoolerbackend.mybluemix.net" + "/statloadtransday"
        },function (error, response, body) {
            res.send({data: JSON.parse(body)})
        });
    });
    app.get('/statloadtranshour', function (req, res, next) {
        request( {
            url : "https://smartcoolerbackend.mybluemix.net" + "/statloadtranshour?devid=" + req.query.devid
        },function (error, response, body) {
            res.render('statloadtranshour', {data: JSON.parse(body), user:req.session.username})
        });
    });
    app.get('/device-details', function (req, res, next) {
        deviceController.details(req, res)
    });
    app.get('/role-details', function (req, res, next) {
        action_accessrolesController.findByRole(req, res)
    });
    app.get('/organization-details', function (req, res, next) {
        organizationController.details(req, res)
    });
//---------------Routing for Organization Controller--------------------------------------
    app.get('/createNewOrganization', function (req, res, next) {
        organizationController.create(req, res)
    });
    app.post('/updateOrganization', function (req, res, next) {
        organizationController.update(req, res)
    });
    app.get('/deleteOrganization', function (req, res, next) {
        organizationController.destroy(req, res)
    });
    app.get('/findOrganization', function (req, res, next) {
        organizationController.retrieve(req, res)
    });

    app.get('/getAllOrganizations', function (req, res, next) {
        organizationController.list(req, res)
    });
    app.get('/getLookupOrganizations', function (req, res, next) {
        organizationController.listRaw(req, res)
    });

    app.get('/blockOrganization', function (req, res, next) {
        organizationController.update(req, res)
    });
//------------Routing for userController---------------------
    app.get('/createUser', function (req, res, next) {
        usersController.create(req, res)
    });
    app.get('/updateUser', function (req, res, next) {
        usersController.update(req, res)
    });
    app.get('/deleteUser', function (req, res, next) {
        usersController.destroy(req, res)
    });
    app.get('/findUser', function (req, res, next) {
        usersController.retrieve(req, res)
    });

    app.get('/getAllUsers', function (req, res, next) {
        usersController.list(req, res)
    });
//---------------Routing for AccessRoles Controller--------------------------------------
    app.get('/createRole', function (req, res, next) {
        accessrolesController.create(req, res)
    });
    app.get('/updateRole', function (req, res, next) {
        accessrolesController.update(req, res)
    });
    app.get('/deleteRole', function (req, res, next) {
        accessrolesController.destroy(req, res)
    });
    app.get('/findRole', function (req, res, next) {
        accessrolesController.retrieve(req, res)
    });

    app.get('/getRoles', function (req, res, next) {
        accessrolesController.listJson(req, res)
    });
//---------------Routing for Device Trans Table--------------------------------------
    app.get('/createDeviceTransaction', function (req, res, next) {
        devicetransController.create(req, res)
    });
    app.get('/getAllDeviceTransactions', function (req, res, next) {
        devicetransController.listJson(req, res)
    });
//---------------Routing for Device Table--------------------------------------
    app.post('/updateDevice', function (req, res, next) {
        deviceController.update(req, res)
    });
    app.get('/deleteDevice', function (req, res, next) {
        deviceController.destroy(req, res)
    });
    app.get('/createDevice', function (req, res, next) {
        deviceController.create(req, res)
    });
    app.get('/getDevice', function (req, res, next) {
        deviceController.retrieve(req, res)
    });
    app.get('/findByName', function (req, res, next) {
        deviceController.findByName(req, res)
    });
//---------------Routing for Actions Table--------------------------------------
    app.get('/getActions', function (req, res, next) {
        actionController.listJson(req, res)
    });
//---------------Routing for Action_accessroles Table--------------------------------------
    app.get('/getAction_accessroles', function (req, res, next) {
        action_accessrolesController.listJson(req, res)
    });
    app.get('/findActionsByRole', function (req, res, next) {
        action_accessrolesController.findByRole(req, res)
    });
    app.get('/findActionsJson', function (req, res, next) {
        action_accessrolesController.listJson(req, res)
    });
    app.get('/saveActionRoles', function (req, res, next) {
        action_accessrolesController.create(req, res)
    });
    app.get('/deleteActionRoles', function (req, res, next) {
        action_accessrolesController.destroy(req, res)
    });
}