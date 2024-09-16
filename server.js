const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(express.static(__dirname));

mongoose.connect('mongodb+srv://basherbd:admin@backenddb.2fsv4.mongodb.net/r_basher?retryWrites=true&w=majority&appName=BackendDB');

const connect = mongoose.connection;

connect.on('error', console.error.bind(console, 'MongoDB connection error:'));

connect.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    month : String,
    saving : Number,
    profit : Number,
    withdraw : Number,
    total : Number,
    loan : Number,
    installment : Number,
    installment_number : Number,
    installment_due : Number,
    receiver : String,
    date : String,
    remark : String
});

const User = mongoose.model('User', userSchema);

app.get('/', async (request, response) => {
    response.sendFile(__dirname + '/user.html');
});

app.post('/users', async (request, response) => {
    const user = new User({
        month : request.body.month,
        saving : request.body.saving,
        profit : request.body.profit,
        withdraw : request.body.withdraw,
        total : request.body.total,
        loan : request.body.loan,
        installment : request.body.installment,
        installment_number : request.body.installment_number,
        installment_due : request.body.installment_due,
        receiver : request.body.receiver,
        date : request.body.date,
        remark : request.body.remark
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

    user.month = request.body.month;
    user.saving = request.body.saving;
    user.profit = request.body.profit;
    user.withdraw = request.body.withdraw;
    user.total = request.body.total;
    user.loan = request.body.loan;
    user.installment = request.body.installment;
    user.installment_number = request.body.installment_number;
    user.installment_due = request.body.installment_due;
    user.receiver = request.body.receiver;
    user.date = request.body.date;
    user.remark = request.body.remark;

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