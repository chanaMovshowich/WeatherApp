// This middleware handles errors that occur in the application.
export const errorHandling = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: err.status,
        message: err.message || "An error occurred",
    });
};
