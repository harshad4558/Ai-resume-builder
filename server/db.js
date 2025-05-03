const mongoose = require('mongoose');

module.exports = async () => {
    try {
        // Log the connection string (but mask any credentials)
        const connectionString = process.env.DB;
        console.log('Connecting to MongoDB at:', 
            connectionString ? 
            connectionString.replace(/:\/\/([^:]+:[^@]+)@/, '://***:***@') : 
            'CONNECTION STRING MISSING');
        
        if (!connectionString) {
            console.error('DB connection string is missing! Check your .env file.');
            return;
        }

        // Use the newer connection method (no need for useNewUrlParser and useUnifiedTopology in newer versions)
        await mongoose.connect(process.env.DB);
        console.log('Connected to MongoDB Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        console.error('Stack trace:', error.stack);
        console.error('Could not connect to MongoDB database');
    }
};