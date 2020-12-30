const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    text: {
        type: String,
        required: [true,"Lütfen bir kart metni giriniz."]
    },
    index: {
        type: Number,
        required: [true, "Lütfen kart indexi giriniz."]
    },
    description: {
        type: String,
        default: "bu pano hakkında bir açıklama yazabilirsiniz"
    },
    image: {
        type: String,
        default: ""
    },
    followers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    ownerList: {
        type: mongoose.Schema.ObjectId,
        ref: "List",
        required: [true, "Her kartın bir listesi olmalıdır"]
    }
});
module.exports = mongoose.model("Card", CardSchema);