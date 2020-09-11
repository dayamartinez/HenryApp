const { Router } = require('express');

// import all routers;
const Email = require('./sendMails.js');
<<<<<<< HEAD
const User = require('./user.js')
const Admin = require('./admin.js')
const Cohort = require('./cohort')

=======
const User = require('./user.js');
const Admin = require('./admin.js');
>>>>>>> master
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/email', Email);
router.use('/user', User);
<<<<<<< HEAD
router.use('/admin', Admin)
router.use('/cohort', Cohort)
=======
router.use('/admin', Admin);

>>>>>>> master

module.exports = router;
