const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    notificationOwnerFirstName: {
        type: String,
        required: [true, "İsim alanı boş bırakılamaz"]
    },
    notificationOwnerLastName: {
        type: String,
        required: [true, "Soyisim alanı boş bırakılamaz"]
    },
    notificationText: {
        type: String,
        required: [true, "Lütfen bildirim mesajı giriniz"],
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Notification", NotificationSchema);