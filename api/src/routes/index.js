const { Router } = require('express');

// import all routers;
const Email = require('./sendMails.js');
const User = require('./user.js')
const Admin = require('./admin.js')
const Cohort = require('./cohort')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/email', Email);
router.use('/user', User);
router.use('/admin', Admin)
router.use('/cohort', Cohort)

module.exports = router;
