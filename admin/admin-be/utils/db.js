const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/kaola')

const Kaolas = mongoose.model('kaolas', {
    name: String
})

const kitty = new Kaolas({
    name: 'hello'
})

kitty.save().then((result) => {
    console.log(result);
})