'use strict';

const config = require('config');
const Hapi = require('@hapi/hapi');

const AllRoutes = require('./routes');
const { host, port } = config.get('server');

// Server bootstrapping code goes here
const init = async () => {

    const server = Hapi.server({ host, port });

    //Inititalize routes
    AllRoutes.forEach(route => server.route(route));

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();