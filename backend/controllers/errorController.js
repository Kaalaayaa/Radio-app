import express from 'express';
const router = express.Router();

router.use((error, req, res, next) => {
    let status = 404;
    let message = "Resource not found";

    if (error) {
        status = error.status || 500;
        message = error.message;
    }

    res.status(status);
    res.send(message);
});

export default router;