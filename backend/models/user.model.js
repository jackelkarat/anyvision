
const User ={
  firstname: {
    type: String,
    required: true,
    minlength: 3
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  }
};


module.exports = User;
