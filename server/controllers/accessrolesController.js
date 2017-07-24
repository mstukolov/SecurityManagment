/**
 * Created by MAKS on 24.07.2017.
 */
const Accessroles = require('../models').Accessroles;

module.exports = {
    create(req, res) {
        return Accessroles
                .create({
                    role: req.query.role
                })
                .then(res.redirect('/roles'))
                .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Accessroles
                .findById(req.query.roleId)
                .then(role => {
                if (!role) { return res.status(404).send({
            message: 'Access role Not Found',
        });
        }
        return accessroles
                .update({
                    role: req.query.role || role.role
                })
                .then(res.redirect('/roles'))
                .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
    },
    list(req, res) {
        return Accessroles
                .all()
                .then(accessroles => res.status(200).render('roles', {accessroles : accessroles }))
    .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Accessroles
                .findById(req.query.roleId)
                .then(role => {
                if (!role) {
            return res.status(404).send({
                message: 'Todo Not Found',
            });
        }
        return res.status(200).send(role);
    })
    .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Accessroles
                .findById(req.query.roleId)
                .then(role => {
                if (!role) {
            return res.status(400).send({
                message: 'Role Not Found',
            });
        }
        return role
                .destroy()
                .then(res.redirect('/roles'))
                .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }
};