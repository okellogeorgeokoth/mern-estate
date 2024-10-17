// user.controller.js
export const test = (_req, res) => {
    // Ensure res is the Express response object and use it to send a JSON response
    res.json({
        message: 'API route is working correctly ',
    });
};
