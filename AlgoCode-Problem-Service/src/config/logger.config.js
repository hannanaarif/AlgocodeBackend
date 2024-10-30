const winston=require('winston');
require('winston-mongodb'); // Import the MongoDB transport
const { LOG_DB_URL } = require('./server.config');


const allowedTransport=[];

allowedTransport.push(new winston.transports.Console({
    format:winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(log => `${log.timestamp}, [${log.level}], ${log.message}`)
    )
}));

allowedTransport.push(new winston.transports.File({
    filename:`aap.log`,
    format:winston.format.combine(
        winston.format.timestamp ({
            format:'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf((log)=>`${log.timestamp},[${log.level}],${log.message}`)
    ),
}));

allowedTransport.push(new winston.transports.MongoDB({
    level:'error',
    db:LOG_DB_URL,
    collection:'logs'
}))

const logger=winston.createLogger({
    format:winston.format.combine(
        winston.format.timestamp ({
            format:'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf((log)=>`${log.timestamp},[${log.level}],${log.message}`)
    ),
    transports: allowedTransport,
});

module.exports=logger;