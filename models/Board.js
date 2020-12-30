const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const List = require("./List");
const Notification = require("./Notification");

//required: name, owner
//optional: description
const BoardSchema = new Schema({
    name: {
        type: String,
        required: [true,"Lütfen pano adını giriniz."]
    },
    description: {
        type: String
    },
    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    background: {
        type: String,
        default: "/images/backgrounds/7.jpg"
    },
    lists: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "List"
        }
    ],
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActivity: {
        type: Date,
        default: Date.now
    },
    lastActivities: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Notification"
        },
    ]
});

BoardSchema.pre("save", function(next){
    if(!this.isModified("name")){
        return next()
    }
    next();
})

BoardSchema.pre("remove", async function(next){
    this.members.map(async memberID =>{
        let member = await User.findById(memberID)
        let index = member.Boards.indexOf(this._id)
        member.Boards.splice(index,1)
        await member.save()
    })
    this.lists.map(async listID=>{
        let list = await List.findById(listID)
        await list.remove()
    })
    this.lastActivities.map(async notificationID=>{
        let notification = await Notification.findById(notificationID)
        await notification.remove()
    })
    next()
})

module.exports = mongoose.model("Board", BoardSchema);