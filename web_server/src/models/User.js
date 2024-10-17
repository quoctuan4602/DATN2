const { default: mongoose } = require('mongoose');

const useSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('user', useSchema);

module.exports = User;
