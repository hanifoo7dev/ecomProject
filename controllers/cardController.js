const Product = require('../models/productSchema');
const Card = require('../models/cardSchema');


// create add to card
let createCard = async (req, res) => {
  let { productId, quantity=1, owner } = req.body;

  if(!owner || !productId || !quantity){
    return res.status(400).json({
      success: false,
      message: 'Missing required fields' });
  }
  let existingProduct = await Product.findOne({ _id: productId});
  let existingCard = await Card.findOne({ productId: productId, owner: owner });
  if (existingCard){
    let total = existingCard.quantity + 1;
    if(total > existingProduct.stock){
      return res.status(400).json({
        success: false,
        message: 'Quantity cannot be more than stock'
      });
    }
    existingCard.quantity = existingCard.quantity + 1;
    await existingCard.save();
    return res.status(200).json({
      success: true,
      message: 'Product quantity updated in card successfully',
      data: existingCard
    });
  }
 
  if (existingProduct.stock >= quantity) {
    let card = new Card({
      productId: productId,
      quantity: quantity,
      owner: owner
    });
    await card.save();
    res.status(201).json({
      success: true,
      message: 'Product added to card successfully',
      data: card
    });
  }else{
    res.status(400).json({
      success: false,
      message: 'Product is out of stock'
    });
  }



}
// inrement and decrement the stock of the product

let increDecre = async (req, res) => {
  let { cardId, quantity, owner, type } = req.body;

  let existingCard = await Card.findOne({_id: cardId,owner: owner}).populate('productId');
  if (!existingCard) {
    return res.status(404).json({
      success: false,
      message: 'Card not found'
    });
  }
  if (type === 'plus') {
  let total = existingCard.quantity + quantity;
  if (total > existingCard.productId.stock) {
      return res.status(400).json({
        success: false,
        message: 'Quantity cannot be more than stock'
      });
    } else {
      existingCard.quantity = existingCard.quantity + quantity;
    }
} else {

    existingCard.quantity = existingCard.quantity - 1;

    if (existingCard.quantity < 1) {

      await Card.findOneAndDelete({ _id: cardId,owner: owner});
      return res.status(200).json({
        success: true,
        message: 'Card deleted successfully'
      });

    }
  }

  await existingCard.save();

  res.status(200).json({
    success: true,
    message: 'Card updated successfully',
    data: existingCard
  });
};
// get card by owner
let getCard = async (req, res) => {
  let { owner } = req.body;
  let existingCard = await Card.find({owner: owner}).populate('productId');
   console.log(existingCard)
}
// 













module.exports={createCard, increDecre,getCard}