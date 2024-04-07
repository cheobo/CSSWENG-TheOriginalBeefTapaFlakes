const products = [
      {
        name: "Sub-Reseller Package",
        description:  "Discover convenience and profit with our sub-reseller's package! Enjoy free marketing ads, no freezer needed, and high profits. Selling is easy and customers keep coming back!",
        reviews: [],
        avgRating: 0,
        countReviews: 0,
        packages: [
          {
            packageOption: "Package A",
            packageSize: 330,
            bottlesPerFlavor: [
              { flavor: "Classic", "quantity": 5 },
              { flavor: "Sisig", "quantity": 5 },
              { flavor: "Spicy", "quantity": 2 }
            ],
            price: 1975.0,
            countInStock: 10,
          },
          {
            packageOption: "Package B",
            packageSize: 550,
            bottlesPerFlavor: [
              { "flavor": "Classic", "quantity": 5 },
              { "flavor": "Sisig", "quantity": 5 },
              { "flavor": "Spicy", "quantity": 2 }
            ],
            price: 3075.0,
            countInStock: 10,
          }
        ],
        ingredients: "Beef, Salt, Pepper, Soy Sauce, Vinegar, Mixed Spices, and Vegetable Oil",
        nutriInfo: "Placeholder"
      },
      {
        name: "Reseller Package",
        description: "Avail the Reseller's package deal! Enjoy complimentary perks such as free delivery, rebranding (including layout, label, and packaging), a tarpaulin, and exclusive marketing ads featured on our main page. With no need for a freezer, expect great profits and effortless sales. It's the perfect choice for guaranteed repeat buyers!",
        reviews: [],
        avgRating: 0,
        countReviews: 0,
        packages: [
          {
            packageOption: "Package A",
            packageSize: 330,
            bottlesPerFlavor: [
              { flavor: "Classic", "quantity": 8 },
              { flavor: "Sisig", "quantity": 8 },
              { flavor: "Spicy", "quantity": 8 }
            ],
            price: 3950.0,
            countInStock: 10,
          },
          {
            packageOption: "Package B",
            packageSize: 550,
            bottlesPerFlavor: [
              { "flavor": "Classic", "quantity": 8 },
              { "flavor": "Sisig", "quantity": 8 },
              { "flavor": "Spicy", "quantity": 8   }
            ],
            price: 6150.0,
            countInStock: 10,
          }
        ],
        ingredients: "Beef, Salt, Pepper, Soy Sauce, Vinegar, Mixed Spices, and Vegetable Oil",
        nutriInfo: "Placeholder"
      },
      {
        name: "The Original Beef Tapa Flakes (330 Grams)",
        description: "You can never go wrong with the most talked about tapa in town! Stop wondering and have a taste of our savory tapa in a jar! No need to cook and ready to eat! It comes with three bursting flavors of Classic, Spicy and Sisig.",
        reviews: [],
        avgRating: 0,
        countReviews: 0,
        packages: [
          {
            packageOption: "Classic",
            packageSize: 330,
            bottlesPerFlavor:
              { 
                flavor: "Classic", "quantity": 1 
              },
            price: 215.0,
            countInStock: 10,
          },
          {
            packageOption: "Spicy",
            packageSize: 330,
            bottlesPerFlavor:
              { 
                flavor: "Classic", "quantity": 1
              },
            price: 215.0,
            countInStock: 10,
          },
          {
            packageOption: "Sisig",
            packageSize: 330,
            bottlesPerFlavor:
              { 
                flavor: "Classic", "quantity": 1
              },
            price: 215.0,
            countInStock: 10,
          }
        ],
        ingredients: "Beef, Salt, Pepper, Soy Sauce, Vinegar, Mixed Spices, and Vegetable Oil",
        nutriInfo: "Placeholder"
      },
  ];
  
  export default products;