const app = require('./app');
const reload = require('reload');

const server = app.listen(3000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});

reload(app);