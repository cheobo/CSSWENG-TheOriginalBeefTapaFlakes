// Sample Cart Data

const cartItem1 = {
    product: "65d604cefddb5dcd908a45d4",
    name: "The Original Beef Tapa Flakes",
    flavor: "Classic",
    size: "330 Grams",
    price: 215.0,
};

const cartItem2 = {
    product: "65d604cefddb5dcd908a45d6",
    name: "Negosyo Package 1 Box 24 Bottles",
    flavor: "Classic",
    size: "330 Grams",
    price: 4450.0,
};

const cartItems = [cartItem1, cartItem2];

const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

const cart = {
    cartItems: cartItems,
    totalPrice: totalPrice
};

export default cart;