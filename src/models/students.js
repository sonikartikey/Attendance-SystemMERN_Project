const mongooose = require('mongoose');

const studentSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
})

const Student = mongooose.model('Student', studentSchema);

module.exports = Student;
