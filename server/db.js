const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const connectionString = process.env.DB;
        
        // Log masked connection string
        console.log('🔌 Connecting to MongoDB at:', 
            connectionString ? 
            connectionString.replace(/:\/\/([^:]+:[^@]+)@/, '://***:***@') : 
            ' CONNECTION STRING MISSING');
        
        if (!connectionString) {
            console.error(' DB connection string is missing!');
            console.error('Please set the DB environment variable.');
            throw new Error('MongoDB connection string is required');
        }

        // Set mongoose options
        mongoose.set('strictQuery', false);

        // Connect to MongoDB
        await mongoose.connect(connectionString);
        
        console.log(' Connected to MongoDB Successfully');
        console.log(` Database: ${mongoose.connection.name}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error(' MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn(' MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log(' MongoDB reconnected');
        });

    } catch (error) {
        console.error(' MongoDB Connection Error:', error.message);
        console.error('Stack trace:', error.stack);
        console.error(' Tips:');
        console.error('  1. Check if your IP is whitelisted in MongoDB Atlas');
        console.error('  2. Verify username and password are correct');
        console.error('  3. Ensure special characters in password are URL encoded');
        console.error('  4. Check if cluster is active and accessible');
        
        // Don't exit process in production, let the app handle it
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};
