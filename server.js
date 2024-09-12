const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname));

mongoose.connect('mongodb+srv://basherbd:admin@backenddb.2fsv4.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB');

const connect = mongoose.connection;

connect.on('error', console.error.bind(console, 'MongoDB connection error:'));

connect.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    m_name : String,
    saving : Number,
    profit : Number,
    total : Number,
    loan : Number,
    installment : Number,
    installment_number : Number
});

const User = mongoose.model('User', userSchema);

app.get('/', async (request, response) => {
    response.sendFile(__dirname + '/user.html');
});

app.post('/users', async (request, response) => {
    const user = new User({
        m_name : request.body.m_name,
        saving : request.body.saving,
        profit : request.body.profit,
        total : request.body.total,
        loan : request.body.loan,
        installment : request.body.installment,
        installment_number : request.body.installment_number
    });
    const newItem = await user.save();
    response.status(201).json({success:true});
});

app.get('/users', async (request, response) => {
    const users = await User.find();
    response.status(200).json(users);
});

app.get('/users/:id', async (request, response) => {
    const user = await User.findById(request.params.id);
    response.status(200).json(user);
});

app.put('/users/:id', async (request, response) => {
    const userId = request.params.id;
    // Fetch the user from the database
    const user = await User.findById(userId);
    user.m_name = request.body.m_name;
    user.saving = request.body.saving;
    user.profit = request.body.profit;
    user.total = request.body.total;
    user.loan = request.body.loan;
    user.installment = request.body.installment;
    user.installment_number = request.body.installment_number;
    const updatedItem = await user.save();
    response.status(200).json(updatedItem);
});

app.delete('/users/:id', async (request, response) => {
    const userId = request.params.id;
    // Fetch the user from the database
    const user = await User.findById(userId);
    await user.deleteOne();
    response.status(200).json({ message : 'Deleted item' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});