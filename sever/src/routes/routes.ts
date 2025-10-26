import express from 'express';
import contactRoute from './contact.route.js';
import faqRoute from './faq.route.js';
import programRoute from './program.route.js';
import jobRoute from './job.route.js';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';

const router = express.Router();

const routes = [
    { path: '/users', router: userRoute },
    { path: '/contacts', router: contactRoute },
    { path: '/faqs', router: faqRoute },
    { path: '/programs', router: programRoute },
    { path: '/jobs', router: jobRoute },
    { path: '/auth', router: authRoute },
];

routes.forEach(route => {
    router.use(route.path, route.router);
});

export default router;