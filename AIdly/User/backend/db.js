const dns = require('node:dns');
const path = require('node:path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const configuredDnsServers = process.env.MONGODB_DNS_SERVERS
    ?.split(',')
    .map((server) => server.trim())
    .filter(Boolean);

if (configuredDnsServers?.length) {
    dns.setServers(configuredDnsServers);
} else if (
    process.platform === 'win32' &&
    dns.getServers().some((server) => server === '127.0.0.1' || server === '::1')
) {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}

const connectDB = async () => {
    const mongoURL = process.env.MONGODB_URL_LOCAL;

    if (!mongoURL) {
        throw new Error('MONGODB_URL_LOCAL is not configured in the backend environment.');
    }

    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error.message);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    await mongoose.connect(mongoURL);
    console.log('Connected to MongoDB server');
};

module.exports = connectDB;