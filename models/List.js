const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Card = require("./Card");

const ListSchema = new Schema({
    title: {
        type: String,
        required: [true,"Lütfen kart adını giriniz."]
    },
    index: {
        type: Number,
        required: [true,"Lütfen kart için geçerli bir sıra belirleyiniz."]
    },
    ownerBoard: {
        type: mongoose.Schema.ObjectId,
        ref: "Board",
        required: [true, "Her listenin bir panosu olmalıdır"]
    },
    cards: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Card"
        }
    ]
});

ListSchema.pre("remove", async function(next){
    this.cards.map(async cardID=>{
        let card = await Card.findById(cardID);
        await card.remove();
    });
    next();
})

module.exports = mongoose.model("List", ListSchema);