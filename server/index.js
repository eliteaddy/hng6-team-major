const server = require('./controller.js');

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running at ${port}`);
});