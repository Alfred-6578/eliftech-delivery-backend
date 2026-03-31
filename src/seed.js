require('dotenv').config();
const mongoose = require('mongoose');
const Shop = require('./models/Shop');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Coupon = require('./models/Coupon');

const productTemplates = {
  'McDonald\'s': [
    { name: 'Big Mac', category: 'Burgers' }, { name: 'McChicken', category: 'Burgers' }, { name: 'French Fries', category: 'Sides' }, { name: 'Chicken Nuggets', category: 'Chicken' }, { name: 'Quarter Pounder', category: 'Burgers' },
    { name: 'Filet-O-Fish', category: 'Burgers' }, { name: 'McFlurry', category: 'Desserts' }, { name: 'Apple Pie', category: 'Desserts' }, { name: 'Hash Brown', category: 'Breakfast' }, { name: 'Egg McMuffin', category: 'Breakfast' },
    { name: 'Cheeseburger', category: 'Burgers' }, { name: 'Double Cheeseburger', category: 'Burgers' }, { name: 'McRib', category: 'Burgers' }, { name: 'Crispy Chicken Sandwich', category: 'Chicken' },
    { name: 'Spicy McChicken', category: 'Chicken' }, { name: 'McWrap', category: 'Chicken' }, { name: 'Caesar Salad', category: 'Salads' }, { name: 'Garden Salad', category: 'Salads' }, { name: 'Mozzarella Sticks', category: 'Sides' },
    { name: 'Vanilla Cone', category: 'Desserts' }, { name: 'Hot Fudge Sundae', category: 'Desserts' }, { name: 'Caramel Sundae', category: 'Desserts' }, { name: 'Strawberry Sundae', category: 'Desserts' },
    { name: 'Coca-Cola', category: 'Drinks' }, { name: 'Sprite', category: 'Drinks' }, { name: 'Fanta', category: 'Drinks' }, { name: 'Orange Juice', category: 'Drinks' }, { name: 'Coffee', category: 'Drinks' }, { name: 'Iced Coffee', category: 'Drinks' }, { name: 'Latte', category: 'Drinks' },
    { name: 'Mocha', category: 'Drinks' }, { name: 'Hot Chocolate', category: 'Drinks' }, { name: 'Sweet Tea', category: 'Drinks' }, { name: 'Lemonade', category: 'Drinks' }, { name: 'Milkshake Vanilla', category: 'Drinks' },
    { name: 'Milkshake Chocolate', category: 'Drinks' }, { name: 'Milkshake Strawberry', category: 'Drinks' }, { name: 'Pancakes', category: 'Breakfast' }, { name: 'Sausage McMuffin', category: 'Breakfast' },
    { name: 'Bacon McDouble', category: 'Burgers' }, { name: 'Honey Mustard Snack Wrap', category: 'Chicken' }, { name: 'Ranch Snack Wrap', category: 'Chicken' }, { name: 'BBQ Sauce Nuggets', category: 'Chicken' },
    { name: 'Sweet & Sour Nuggets', category: 'Chicken' }, { name: 'Buffalo Nuggets', category: 'Chicken' }, { name: 'Large Fries', category: 'Sides' }, { name: 'Medium Fries', category: 'Sides' },
    { name: 'Side Salad', category: 'Salads' }, { name: 'Fruit & Yogurt Parfait', category: 'Desserts' }, { name: 'Cookies', category: 'Desserts' }, { name: 'Brownie', category: 'Desserts' },
    { name: 'Chicken Tenders 3pc', category: 'Chicken' }, { name: 'Chicken Tenders 5pc', category: 'Chicken' }, { name: 'Chicken Tenders 10pc', category: 'Chicken' },
    { name: 'Mac Sauce Burger', category: 'Burgers' }, { name: 'Smoky BBQ Burger', category: 'Burgers' }, { name: 'Jalapeño Burger', category: 'Burgers' }, { name: 'Mushroom Swiss Burger', category: 'Burgers' },
    { name: 'Bacon Ranch Burger', category: 'Burgers' }, { name: 'Classic Grilled Chicken', category: 'Chicken' }, { name: 'Spicy Grilled Chicken', category: 'Chicken' },
    { name: 'Fish Sandwich Deluxe', category: 'Burgers' }, { name: 'Double Big Mac', category: 'Burgers' }, { name: 'Grand Mac', category: 'Burgers' }, { name: 'Mac Jr', category: 'Burgers' },
    { name: 'Sausage Burrito', category: 'Breakfast' }, { name: 'Fruit Smoothie Mango', category: 'Drinks' }, { name: 'Fruit Smoothie Strawberry', category: 'Drinks' },
    { name: 'Frozen Lemonade', category: 'Drinks' }, { name: 'Iced Caramel Macchiato', category: 'Drinks' }, { name: 'Bagel Sandwich', category: 'Breakfast' },
    { name: 'Biscuit Sandwich', category: 'Breakfast' }, { name: 'Cinnamon Roll', category: 'Breakfast' }, { name: 'Blueberry Muffin', category: 'Breakfast' }, { name: 'Apple Slices', category: 'Sides' },
    { name: 'Carrot Sticks', category: 'Sides' }, { name: 'Onion Rings', category: 'Sides' }, { name: 'Cheese Curds', category: 'Sides' }, { name: 'Poutine', category: 'Sides' },
    { name: 'McVeggie Burger', category: 'Burgers' }, { name: 'Beyond Burger', category: 'Burgers' }, { name: 'Grilled Cheese', category: 'Burgers' }, { name: 'Chicken Quesadilla', category: 'Chicken' },
    { name: 'Breakfast Platter', category: 'Breakfast' }, { name: 'Hotcakes & Sausage', category: 'Breakfast' }, { name: 'Steak Egg & Cheese Bagel', category: 'Breakfast' },
    { name: 'Bacon Egg & Cheese Biscuit', category: 'Breakfast' }, { name: 'Sausage Gravy & Biscuit', category: 'Breakfast' },
    { name: 'Double Sausage McMuffin', category: 'Breakfast' }, { name: 'Triple Cheeseburger', category: 'Burgers' }, { name: 'Deluxe Crispy Chicken', category: 'Chicken' },
    { name: 'Spicy Deluxe Chicken', category: 'Chicken' }, { name: 'Club Sandwich', category: 'Chicken' }, { name: 'BLT Sandwich', category: 'Burgers' },
    { name: 'Chocolate Chip Cookie', category: 'Desserts' }, { name: 'Oatmeal Raisin Cookie', category: 'Desserts' }, { name: 'Sugar Cookie', category: 'Desserts' },
    { name: 'Caramel Apple Pie', category: 'Desserts' }, { name: 'Cherry Pie', category: 'Desserts' }, { name: 'Peach Smoothie', category: 'Drinks' },
    { name: 'Tropical Smoothie', category: 'Drinks' }, { name: 'Berry Smoothie', category: 'Drinks' }, { name: 'Protein Burger', category: 'Burgers' }, { name: 'Veggie Wrap', category: 'Salads' },
  ],
  'Pizza Planet': [
    { name: 'Margherita Pizza', category: 'Pizza' }, { name: 'Pepperoni Pizza', category: 'Pizza' }, { name: 'Hawaiian Pizza', category: 'Pizza' }, { name: 'Garlic Bread', category: 'Sides' },
    { name: 'BBQ Chicken Pizza', category: 'Pizza' }, { name: 'Meat Lovers Pizza', category: 'Pizza' }, { name: 'Veggie Supreme', category: 'Pizza' }, { name: 'Four Cheese Pizza', category: 'Pizza' },
    { name: 'Buffalo Chicken Pizza', category: 'Pizza' }, { name: 'Mushroom Truffle Pizza', category: 'Pizza' }, { name: 'Pesto Chicken Pizza', category: 'Pizza' },
    { name: 'White Pizza', category: 'Pizza' }, { name: 'Spinach Artichoke Pizza', category: 'Pizza' }, { name: 'Philly Steak Pizza', category: 'Pizza' },
    { name: 'Taco Pizza', category: 'Pizza' }, { name: 'BLT Pizza', category: 'Pizza' }, { name: 'Chicken Alfredo Pizza', category: 'Pizza' }, { name: 'Supreme Pizza', category: 'Pizza' },
    { name: 'Greek Pizza', category: 'Pizza' }, { name: 'Mediterranean Pizza', category: 'Pizza' }, { name: 'Caprese Pizza', category: 'Pizza' }, { name: 'Prosciutto Pizza', category: 'Pizza' },
    { name: 'Fig & Goat Cheese Pizza', category: 'Pizza' }, { name: 'Jalapeño Popper Pizza', category: 'Pizza' }, { name: 'Mac & Cheese Pizza', category: 'Pizza' },
    { name: 'Breakfast Pizza', category: 'Pizza' }, { name: 'Dessert Pizza', category: 'Desserts' }, { name: 'Nutella Pizza', category: 'Desserts' }, { name: 'S\'mores Pizza', category: 'Desserts' },
    { name: 'Cheese Sticks', category: 'Sides' }, { name: 'Breadsticks', category: 'Sides' }, { name: 'Cinnamon Sticks', category: 'Desserts' }, { name: 'Cheesy Bread', category: 'Sides' },
    { name: 'Stuffed Crust Pepperoni', category: 'Pizza' }, { name: 'Stuffed Crust Cheese', category: 'Pizza' }, { name: 'Deep Dish Cheese', category: 'Pizza' },
    { name: 'Deep Dish Pepperoni', category: 'Pizza' }, { name: 'Deep Dish Supreme', category: 'Pizza' }, { name: 'Deep Dish Veggie', category: 'Pizza' },
    { name: 'Thin Crust Margherita', category: 'Pizza' }, { name: 'Thin Crust Pepperoni', category: 'Pizza' }, { name: 'Thin Crust BBQ Chicken', category: 'Pizza' },
    { name: 'Calzone Cheese', category: 'Calzones' }, { name: 'Calzone Meat', category: 'Calzones' }, { name: 'Calzone Veggie', category: 'Calzones' }, { name: 'Calzone Supreme', category: 'Calzones' },
    { name: 'Stromboli Italian', category: 'Calzones' }, { name: 'Stromboli Chicken', category: 'Calzones' }, { name: 'Garlic Knots', category: 'Sides' },
    { name: 'Caesar Salad', category: 'Salads' }, { name: 'Garden Salad', category: 'Salads' }, { name: 'Greek Salad', category: 'Salads' }, { name: 'Antipasto Salad', category: 'Salads' },
    { name: 'Chicken Wings 6pc', category: 'Wings' }, { name: 'Chicken Wings 12pc', category: 'Wings' }, { name: 'Chicken Wings 24pc', category: 'Wings' },
    { name: 'Boneless Wings 6pc', category: 'Wings' }, { name: 'Boneless Wings 12pc', category: 'Wings' }, { name: 'Marinara Dip', category: 'Sides' },
    { name: 'Ranch Dip', category: 'Sides' }, { name: 'Blue Cheese Dip', category: 'Sides' }, { name: 'Garlic Butter Dip', category: 'Sides' }, { name: 'Hot Sauce Dip', category: 'Sides' },
    { name: 'Pepsi', category: 'Drinks' }, { name: 'Mountain Dew', category: 'Drinks' }, { name: 'Dr Pepper', category: 'Drinks' }, { name: 'Root Beer', category: 'Drinks' }, { name: 'Lemonade', category: 'Drinks' },
    { name: 'Iced Tea', category: 'Drinks' }, { name: 'Water Bottle', category: 'Drinks' }, { name: 'Sparkling Water', category: 'Drinks' }, { name: '2-Liter Pepsi', category: 'Drinks' },
    { name: '2-Liter Mountain Dew', category: 'Drinks' }, { name: 'Chocolate Lava Cake', category: 'Desserts' }, { name: 'Tiramisu', category: 'Desserts' },
    { name: 'Cannoli', category: 'Desserts' }, { name: 'Cheesecake Slice', category: 'Desserts' }, { name: 'Brownie Bites', category: 'Desserts' }, { name: 'Cookie Dough Bites', category: 'Desserts' },
    { name: 'Mini Donuts', category: 'Desserts' }, { name: 'Zeppole', category: 'Desserts' }, { name: 'Fried Oreos', category: 'Desserts' }, { name: 'Funnel Cake Sticks', category: 'Desserts' },
    { name: 'Personal Cheese Pizza', category: 'Pizza' }, { name: 'Personal Pepperoni Pizza', category: 'Pizza' }, { name: 'Party Size Cheese', category: 'Pizza' },
    { name: 'Party Size Pepperoni', category: 'Pizza' }, { name: 'Party Size Supreme', category: 'Pizza' }, { name: 'Half & Half Pizza', category: 'Pizza' },
    { name: 'Gluten Free Cheese', category: 'Pizza' }, { name: 'Gluten Free Pepperoni', category: 'Pizza' }, { name: 'Cauliflower Crust Cheese', category: 'Pizza' },
    { name: 'Cauliflower Crust Veggie', category: 'Pizza' }, { name: 'Vegan Cheese Pizza', category: 'Pizza' }, { name: 'Vegan Supreme Pizza', category: 'Pizza' },
    { name: 'Lasagna', category: 'Pasta' }, { name: 'Baked Ziti', category: 'Pasta' }, { name: 'Chicken Parm', category: 'Pasta' }, { name: 'Eggplant Parm', category: 'Pasta' },
    { name: 'Spaghetti & Meatballs', category: 'Pasta' }, { name: 'Fettuccine Alfredo', category: 'Pasta' }, { name: 'Penne Vodka', category: 'Pasta' },
    { name: 'Ravioli Cheese', category: 'Pasta' }, { name: 'Ravioli Meat', category: 'Pasta' }, { name: 'Minestrone Soup', category: 'Sides' },
  ],
  'Sushi House': [
    { name: 'California Roll', category: 'Rolls' }, { name: 'Salmon Nigiri', category: 'Nigiri' }, { name: 'Miso Soup', category: 'Soups' }, { name: 'Dragon Roll', category: 'Rolls' },
    { name: 'Spicy Tuna Roll', category: 'Rolls' }, { name: 'Rainbow Roll', category: 'Rolls' }, { name: 'Philadelphia Roll', category: 'Rolls' }, { name: 'Shrimp Tempura Roll', category: 'Rolls' },
    { name: 'Eel Avocado Roll', category: 'Rolls' }, { name: 'Crunchy Roll', category: 'Rolls' }, { name: 'Spider Roll', category: 'Rolls' }, { name: 'Alaska Roll', category: 'Rolls' },
    { name: 'Volcano Roll', category: 'Rolls' }, { name: 'Caterpillar Roll', category: 'Rolls' }, { name: 'Tiger Roll', category: 'Rolls' }, { name: 'Lion King Roll', category: 'Rolls' },
    { name: 'Dynamite Roll', category: 'Rolls' }, { name: 'Rock & Roll', category: 'Rolls' }, { name: 'Firecracker Roll', category: 'Rolls' }, { name: 'Sunrise Roll', category: 'Rolls' },
    { name: 'Tuna Nigiri', category: 'Nigiri' }, { name: 'Yellowtail Nigiri', category: 'Nigiri' }, { name: 'Shrimp Nigiri', category: 'Nigiri' }, { name: 'Eel Nigiri', category: 'Nigiri' },
    { name: 'Octopus Nigiri', category: 'Nigiri' }, { name: 'Squid Nigiri', category: 'Nigiri' }, { name: 'Scallop Nigiri', category: 'Nigiri' }, { name: 'Crab Nigiri', category: 'Nigiri' },
    { name: 'Salmon Sashimi 3pc', category: 'Sashimi' }, { name: 'Salmon Sashimi 5pc', category: 'Sashimi' }, { name: 'Tuna Sashimi 3pc', category: 'Sashimi' },
    { name: 'Tuna Sashimi 5pc', category: 'Sashimi' }, { name: 'Mixed Sashimi Platter', category: 'Sashimi' }, { name: 'Chirashi Bowl', category: 'Bowls' },
    { name: 'Poke Bowl Salmon', category: 'Bowls' }, { name: 'Poke Bowl Tuna', category: 'Bowls' }, { name: 'Poke Bowl Mixed', category: 'Bowls' },
    { name: 'Teriyaki Chicken Bowl', category: 'Bowls' }, { name: 'Teriyaki Salmon Bowl', category: 'Bowls' }, { name: 'Teriyaki Beef Bowl', category: 'Bowls' },
    { name: 'Katsu Curry', category: 'Entrees' }, { name: 'Chicken Katsu', category: 'Entrees' }, { name: 'Tonkatsu', category: 'Entrees' }, { name: 'Tempura Udon', category: 'Noodles' },
    { name: 'Ramen Tonkotsu', category: 'Noodles' }, { name: 'Ramen Miso', category: 'Noodles' }, { name: 'Ramen Shoyu', category: 'Noodles' }, { name: 'Ramen Spicy', category: 'Noodles' },
    { name: 'Gyoza 6pc', category: 'Appetizers' }, { name: 'Gyoza 12pc', category: 'Appetizers' }, { name: 'Edamame', category: 'Appetizers' }, { name: 'Seaweed Salad', category: 'Appetizers' },
    { name: 'Cucumber Salad', category: 'Appetizers' }, { name: 'Agedashi Tofu', category: 'Appetizers' }, { name: 'Takoyaki', category: 'Appetizers' }, { name: 'Okonomiyaki', category: 'Entrees' },
    { name: 'Yakitori Chicken', category: 'Entrees' }, { name: 'Yakitori Beef', category: 'Entrees' }, { name: 'Tempura Shrimp', category: 'Appetizers' }, { name: 'Tempura Veggie', category: 'Appetizers' },
    { name: 'Soft Shell Crab', category: 'Entrees' }, { name: 'Grilled Squid', category: 'Entrees' }, { name: 'Seared Tuna Tataki', category: 'Sashimi' },
    { name: 'Beef Tataki', category: 'Sashimi' }, { name: 'Salmon Tataki', category: 'Sashimi' }, { name: 'Toro Nigiri', category: 'Nigiri' }, { name: 'Uni Nigiri', category: 'Nigiri' },
    { name: 'Hand Roll Salmon', category: 'Rolls' }, { name: 'Hand Roll Tuna', category: 'Rolls' }, { name: 'Hand Roll Spicy Crab', category: 'Rolls' },
    { name: 'Hand Roll Shrimp Tempura', category: 'Rolls' }, { name: 'Hand Roll Eel', category: 'Rolls' }, { name: 'Sushi Combo A', category: 'Combos' },
    { name: 'Sushi Combo B', category: 'Combos' }, { name: 'Sushi Combo C', category: 'Combos' }, { name: 'Sashimi Combo', category: 'Combos' },
    { name: 'Bento Box Chicken', category: 'Combos' }, { name: 'Bento Box Salmon', category: 'Combos' }, { name: 'Bento Box Shrimp', category: 'Combos' },
    { name: 'Green Tea', category: 'Drinks' }, { name: 'Matcha Latte', category: 'Drinks' }, { name: 'Sake', category: 'Drinks' }, { name: 'Japanese Beer', category: 'Drinks' },
    { name: 'Ramune Soda', category: 'Drinks' }, { name: 'Mochi Ice Cream', category: 'Desserts' }, { name: 'Green Tea Ice Cream', category: 'Desserts' },
    { name: 'Red Bean Mochi', category: 'Desserts' }, { name: 'Dorayaki', category: 'Desserts' }, { name: 'Taiyaki', category: 'Desserts' }, { name: 'Mango Sticky Rice', category: 'Desserts' },
    { name: 'Fried Rice', category: 'Entrees' }, { name: 'Garlic Fried Rice', category: 'Entrees' }, { name: 'Kimchi Fried Rice', category: 'Entrees' },
    { name: 'Vegetable Spring Rolls', category: 'Appetizers' }, { name: 'Shrimp Spring Rolls', category: 'Appetizers' }, { name: 'Crispy Wontons', category: 'Appetizers' },
    { name: 'Egg Drop Soup', category: 'Soups' }, { name: 'Tom Yum Soup', category: 'Soups' }, { name: 'Coconut Shrimp', category: 'Appetizers' },
    { name: 'Spicy Salmon Bowl', category: 'Bowls' }, { name: 'Unagi Don', category: 'Bowls' }, { name: 'Oyakodon', category: 'Bowls' }, { name: 'Katsudon', category: 'Bowls' },
  ],
  'Taco Fiesta': [
    { name: 'Beef Taco', category: 'Tacos' }, { name: 'Chicken Burrito', category: 'Burritos' }, { name: 'Nachos', category: 'Nachos' }, { name: 'Quesadilla', category: 'Quesadillas' },
    { name: 'Chicken Taco', category: 'Tacos' }, { name: 'Fish Taco', category: 'Tacos' }, { name: 'Shrimp Taco', category: 'Tacos' }, { name: 'Carnitas Taco', category: 'Tacos' },
    { name: 'Al Pastor Taco', category: 'Tacos' }, { name: 'Barbacoa Taco', category: 'Tacos' }, { name: 'Chorizo Taco', category: 'Tacos' }, { name: 'Veggie Taco', category: 'Tacos' },
    { name: 'Steak Burrito', category: 'Burritos' }, { name: 'Carnitas Burrito', category: 'Burritos' }, { name: 'Veggie Burrito', category: 'Burritos' }, { name: 'Bean Burrito', category: 'Burritos' },
    { name: 'Shrimp Burrito', category: 'Burritos' }, { name: 'Fish Burrito', category: 'Burritos' }, { name: 'Breakfast Burrito', category: 'Burritos' }, { name: 'Burrito Bowl', category: 'Bowls' },
    { name: 'Steak Bowl', category: 'Bowls' }, { name: 'Chicken Bowl', category: 'Bowls' }, { name: 'Carnitas Bowl', category: 'Bowls' }, { name: 'Veggie Bowl', category: 'Bowls' },
    { name: 'Cheese Quesadilla', category: 'Quesadillas' }, { name: 'Steak Quesadilla', category: 'Quesadillas' }, { name: 'Chicken Quesadilla', category: 'Quesadillas' },
    { name: 'Shrimp Quesadilla', category: 'Quesadillas' }, { name: 'Supreme Nachos', category: 'Nachos' }, { name: 'Loaded Nachos', category: 'Nachos' }, { name: 'Cheese Nachos', category: 'Nachos' },
    { name: 'Chicken Nachos', category: 'Nachos' }, { name: 'Steak Nachos', category: 'Nachos' }, { name: 'Chips & Guac', category: 'Sides' }, { name: 'Chips & Salsa', category: 'Sides' },
    { name: 'Chips & Queso', category: 'Sides' }, { name: 'Elote', category: 'Sides' }, { name: 'Mexican Rice', category: 'Sides' }, { name: 'Refried Beans', category: 'Sides' },
    { name: 'Black Beans', category: 'Sides' }, { name: 'Pinto Beans', category: 'Sides' }, { name: 'Corn Tortilla Soup', category: 'Sides' }, { name: 'Pozole', category: 'Sides' },
    { name: 'Chicken Enchiladas', category: 'Entrees' }, { name: 'Beef Enchiladas', category: 'Entrees' }, { name: 'Cheese Enchiladas', category: 'Entrees' },
    { name: 'Shrimp Enchiladas', category: 'Entrees' }, { name: 'Tamales Chicken', category: 'Entrees' }, { name: 'Tamales Pork', category: 'Entrees' }, { name: 'Tamales Cheese', category: 'Entrees' },
    { name: 'Tostada Beef', category: 'Entrees' }, { name: 'Tostada Chicken', category: 'Entrees' }, { name: 'Sope Beef', category: 'Entrees' }, { name: 'Sope Chicken', category: 'Entrees' },
    { name: 'Gordita Beef', category: 'Entrees' }, { name: 'Gordita Chicken', category: 'Entrees' }, { name: 'Flautas', category: 'Entrees' }, { name: 'Chimichanga Beef', category: 'Entrees' },
    { name: 'Chimichanga Chicken', category: 'Entrees' }, { name: 'Churros', category: 'Desserts' }, { name: 'Sopapillas', category: 'Desserts' }, { name: 'Tres Leches Cake', category: 'Desserts' },
    { name: 'Flan', category: 'Desserts' }, { name: 'Mexican Brownie', category: 'Desserts' }, { name: 'Fried Ice Cream', category: 'Desserts' }, { name: 'Cinnamon Chips', category: 'Desserts' },
    { name: 'Horchata', category: 'Drinks' }, { name: 'Jamaica', category: 'Drinks' }, { name: 'Tamarindo', category: 'Drinks' }, { name: 'Mexican Coke', category: 'Drinks' },
    { name: 'Margarita', category: 'Drinks' }, { name: 'Michelada', category: 'Drinks' }, { name: 'Agua Fresca Watermelon', category: 'Drinks' }, { name: 'Agua Fresca Pineapple', category: 'Drinks' },
    { name: 'Guacamole Small', category: 'Sides' }, { name: 'Guacamole Large', category: 'Sides' }, { name: 'Pico de Gallo', category: 'Sides' }, { name: 'Salsa Verde', category: 'Sides' },
    { name: 'Salsa Roja', category: 'Sides' }, { name: 'Chipotle Sauce', category: 'Sides' }, { name: 'Sour Cream', category: 'Sides' }, { name: 'Extra Cheese', category: 'Sides' },
    { name: 'Carne Asada Fries', category: 'Sides' }, { name: 'California Burrito', category: 'Burritos' }, { name: 'Mulita', category: 'Tacos' }, { name: 'Birria Taco', category: 'Tacos' },
    { name: 'Birria Ramen', category: 'Entrees' }, { name: 'Birria Quesadilla', category: 'Quesadillas' }, { name: 'Street Corn Salad', category: 'Sides' },
    { name: 'Mexican Caesar Salad', category: 'Sides' }, { name: 'Fiesta Salad', category: 'Sides' }, { name: 'Taco Salad', category: 'Sides' },
    { name: 'Combo Plate 1', category: 'Combos' }, { name: 'Combo Plate 2', category: 'Combos' }, { name: 'Combo Plate 3', category: 'Combos' }, { name: 'Family Pack', category: 'Combos' },
    { name: 'Taco Party Pack', category: 'Combos' }, { name: 'Burrito Party Pack', category: 'Combos' }, { name: 'Nacho Party Pack', category: 'Combos' },
    { name: 'Kids Taco Meal', category: 'Combos' }, { name: 'Kids Quesadilla Meal', category: 'Combos' }, { name: 'Kids Burrito Meal', category: 'Combos' },
    { name: 'Carnitas Plate', category: 'Entrees' }, { name: 'Carne Asada Plate', category: 'Entrees' },
  ],
  'Burger Barn': [
    { name: 'Classic Burger', category: 'Burgers' }, { name: 'Bacon Cheeseburger', category: 'Burgers' }, { name: 'Onion Rings', category: 'Sides' }, { name: 'Milkshake', category: 'Drinks' },
    { name: 'Double Burger', category: 'Burgers' }, { name: 'Triple Burger', category: 'Burgers' }, { name: 'Mushroom Swiss Burger', category: 'Burgers' }, { name: 'BBQ Bacon Burger', category: 'Burgers' },
    { name: 'Jalapeño Burger', category: 'Burgers' }, { name: 'Avocado Burger', category: 'Burgers' }, { name: 'Teriyaki Burger', category: 'Burgers' }, { name: 'Blue Cheese Burger', category: 'Burgers' },
    { name: 'Smokehouse Burger', category: 'Burgers' }, { name: 'Western Burger', category: 'Burgers' }, { name: 'Patty Melt', category: 'Burgers' }, { name: 'Veggie Burger', category: 'Burgers' },
    { name: 'Turkey Burger', category: 'Burgers' }, { name: 'Bison Burger', category: 'Burgers' }, { name: 'Lamb Burger', category: 'Burgers' }, { name: 'Impossible Burger', category: 'Burgers' },
    { name: 'Beyond Burger', category: 'Burgers' }, { name: 'Chicken Sandwich Classic', category: 'Sandwiches' }, { name: 'Spicy Chicken Sandwich', category: 'Sandwiches' },
    { name: 'Grilled Chicken Sandwich', category: 'Sandwiches' }, { name: 'Fish Sandwich', category: 'Sandwiches' }, { name: 'Philly Cheesesteak', category: 'Sandwiches' },
    { name: 'Pulled Pork Sandwich', category: 'Sandwiches' }, { name: 'BLT Sandwich', category: 'Sandwiches' }, { name: 'Club Sandwich', category: 'Sandwiches' }, { name: 'Reuben Sandwich', category: 'Sandwiches' },
    { name: 'Hot Dog Classic', category: 'Hot Dogs' }, { name: 'Chili Dog', category: 'Hot Dogs' }, { name: 'Chicago Dog', category: 'Hot Dogs' }, { name: 'Corn Dog', category: 'Hot Dogs' },
    { name: 'French Fries Small', category: 'Sides' }, { name: 'French Fries Medium', category: 'Sides' }, { name: 'French Fries Large', category: 'Sides' },
    { name: 'Curly Fries', category: 'Sides' }, { name: 'Sweet Potato Fries', category: 'Sides' }, { name: 'Loaded Fries', category: 'Sides' }, { name: 'Cheese Fries', category: 'Sides' },
    { name: 'Chili Cheese Fries', category: 'Sides' }, { name: 'Tater Tots', category: 'Sides' }, { name: 'Onion Rings Small', category: 'Sides' }, { name: 'Onion Rings Large', category: 'Sides' },
    { name: 'Mozzarella Sticks', category: 'Sides' }, { name: 'Fried Pickles', category: 'Sides' }, { name: 'Jalapeno Poppers', category: 'Sides' }, { name: 'Chicken Tenders 3pc', category: 'Chicken' },
    { name: 'Chicken Tenders 5pc', category: 'Chicken' }, { name: 'Chicken Wings 6pc', category: 'Chicken' }, { name: 'Chicken Wings 12pc', category: 'Chicken' },
    { name: 'Caesar Salad', category: 'Salads' }, { name: 'Garden Salad', category: 'Salads' }, { name: 'Cobb Salad', category: 'Salads' }, { name: 'Southwest Salad', category: 'Salads' },
    { name: 'Chili Bowl', category: 'Sides' }, { name: 'Soup of the Day', category: 'Sides' }, { name: 'Mac & Cheese', category: 'Sides' }, { name: 'Coleslaw', category: 'Sides' },
    { name: 'Corn on the Cob', category: 'Sides' }, { name: 'Baked Beans', category: 'Sides' }, { name: 'Side Salad', category: 'Salads' }, { name: 'Fruit Cup', category: 'Sides' },
    { name: 'Milkshake Vanilla', category: 'Drinks' }, { name: 'Milkshake Chocolate', category: 'Drinks' }, { name: 'Milkshake Strawberry', category: 'Drinks' },
    { name: 'Milkshake Cookies & Cream', category: 'Drinks' }, { name: 'Milkshake Peanut Butter', category: 'Drinks' }, { name: 'Milkshake Banana', category: 'Drinks' },
    { name: 'Float Root Beer', category: 'Drinks' }, { name: 'Float Coke', category: 'Drinks' }, { name: 'Smoothie Mango', category: 'Drinks' }, { name: 'Smoothie Berry', category: 'Drinks' },
    { name: 'Coca-Cola', category: 'Drinks' }, { name: 'Diet Coke', category: 'Drinks' }, { name: 'Sprite', category: 'Drinks' }, { name: 'Dr Pepper', category: 'Drinks' }, { name: 'Root Beer', category: 'Drinks' },
    { name: 'Lemonade', category: 'Drinks' }, { name: 'Iced Tea', category: 'Drinks' }, { name: 'Coffee', category: 'Drinks' }, { name: 'Water Bottle', category: 'Drinks' },
    { name: 'Apple Pie Slice', category: 'Desserts' }, { name: 'Brownie', category: 'Desserts' }, { name: 'Chocolate Cake Slice', category: 'Desserts' }, { name: 'Cheesecake Slice', category: 'Desserts' },
    { name: 'Cookie Chocolate Chip', category: 'Desserts' }, { name: 'Cookie Peanut Butter', category: 'Desserts' }, { name: 'Sundae Hot Fudge', category: 'Desserts' },
    { name: 'Sundae Caramel', category: 'Desserts' }, { name: 'Banana Split', category: 'Desserts' }, { name: 'Mini Donuts', category: 'Desserts' },
    { name: 'Kids Burger Meal', category: 'Combos' }, { name: 'Kids Chicken Tenders Meal', category: 'Combos' }, { name: 'Kids Hot Dog Meal', category: 'Combos' },
    { name: 'Kids Grilled Cheese Meal', category: 'Combos' }, { name: 'Combo Burger & Fries', category: 'Combos' }, { name: 'Combo Chicken & Fries', category: 'Combos' },
    { name: 'Combo Dog & Fries', category: 'Combos' }, { name: 'Family Burger Pack', category: 'Combos' }, { name: 'Party Platter Wings', category: 'Combos' },
    { name: 'Party Platter Tenders', category: 'Combos' }, { name: 'Party Platter Sliders', category: 'Combos' },
  ],
};

const shopsData = [
  { name: 'McDonald\'s', image: 'https://logo.clearbit.com/mcdonalds.com', rating: 4.2 },
  { name: 'Pizza Planet', image: 'https://logo.clearbit.com/dominos.com', rating: 4.7 },
  { name: 'Sushi House', image: 'https://logo.clearbit.com/sushi.com', rating: 3.8 },
  { name: 'Taco Fiesta', image: 'https://logo.clearbit.com/tacobell.com', rating: 2.5 },
  { name: 'Burger Barn', image: 'https://logo.clearbit.com/burgerking.com', rating: 3.3 },
];

const couponsData = [
  { code: 'SAVE10', discount: 10, expiresAt: new Date('2027-01-01') },
  { code: 'SAVE20', discount: 20, expiresAt: new Date('2027-01-01') },
  { code: 'HALFOFF', discount: 50, expiresAt: new Date('2027-06-01') },
  { code: 'EXPIRED5', discount: 5, isActive: false, expiresAt: new Date('2025-01-01') },
];

const randomPrice = () => +(Math.random() * 15 + 1.99).toFixed(2);

// Foodish API categories: burger (87), pizza (95), pasta (34), dessert (36), rice (35), biryani (81), samosa (22)
const foodishMap = {
  Burgers: { path: 'burger', max: 87 },
  Pizza: { path: 'pizza', max: 95 },
  Pasta: { path: 'pasta', max: 34 },
  Desserts: { path: 'dessert', max: 36 },
  Noodles: { path: 'pasta', max: 34 },
  Calzones: { path: 'pizza', max: 95 },
};

const categoryCounters = {};

const getImage = (category) => {
  if (!categoryCounters[category]) categoryCounters[category] = 0;
  categoryCounters[category]++;

  const foodish = foodishMap[category];
  if (foodish) {
    const num = ((categoryCounters[category] - 1) % foodish.max) + 1;
    return `https://foodish-api.com/images/${foodish.path}/${foodish.path}${num}.jpg`;
  }
  // Fallback: LoremFlickr with deterministic seed
  const keyword = category.toLowerCase().replace(/\s+/g, ',');
  return `https://loremflickr.com/640/480/${keyword}?lock=${categoryCounters[category]}`;
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Shop.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Coupon.deleteMany();

    const createdShops = [];
    const createdProducts = [];

    for (const shopData of shopsData) {
      const shop = await Shop.create({ name: shopData.name, image: shopData.image, rating: shopData.rating });
      const templates = productTemplates[shopData.name];
      const productDocs = templates.map((t) => ({
        name: t.name,
        category: t.category,
        price: randomPrice(),
        image: getImage(t.category),
        shop: shop._id,
      }));
      const products = await Product.insertMany(productDocs);
      shop.products = products.map((p) => p._id);
      await shop.save();
      createdShops.push(shop);
      createdProducts.push(...products);
    }

    await Coupon.insertMany(couponsData);

    // Seed sample orders
    await Order.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St',
        shops: [
          {
            shop: createdShops[0]._id,
            items: [
              { product: createdProducts[0]._id, name: createdProducts[0].name, price: createdProducts[0].price, quantity: 2 },
              { product: createdProducts[2]._id, name: createdProducts[2].name, price: createdProducts[2].price, quantity: 1 },
            ],
            subtotal: createdProducts[0].price * 2 + createdProducts[2].price,
          },
        ],
        totalPrice: createdProducts[0].price * 2 + createdProducts[2].price,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '0987654321',
        address: '456 Oak Ave',
        shops: [
          {
            shop: createdShops[1]._id,
            items: [
              { product: createdProducts[100]._id, name: createdProducts[100].name, price: createdProducts[100].price, quantity: 1 },
              { product: createdProducts[101]._id, name: createdProducts[101].name, price: createdProducts[101].price, quantity: 3 },
            ],
            subtotal: createdProducts[100].price + createdProducts[101].price * 3,
          },
          {
            shop: createdShops[0]._id,
            items: [
              { product: createdProducts[1]._id, name: createdProducts[1].name, price: createdProducts[1].price, quantity: 2 },
            ],
            subtotal: createdProducts[1].price * 2,
          },
        ],
        totalPrice: createdProducts[100].price + createdProducts[101].price * 3 + createdProducts[1].price * 2,
      },
    ]);

    console.log('Database seeded: 5 shops (100 products each), orders, and coupons');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
