/**
 * Database Seeder - Run with: node utils/seeder.js
 * Seeds admin user + sample products
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Product = require('../models/Product');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/desi_ghee_store';

const products = [
  {
    name: 'Pure A2 Gir Cow Ghee',
    shortDescription: 'Traditional bilona method, 100% pure A2 milk ghee',
    description: 'Our flagship A2 Gir Cow Ghee is crafted using the ancient Bilona (hand-churning) method. Made from the milk of indigenous Gir cows, this ghee retains all natural vitamins, minerals, and beneficial fatty acids. Each batch is carefully prepared by our artisans to ensure maximum purity and nutritional value.',
    category: 'desi-cow-ghee',
    price: 899,
    discountedPrice: 799,
    stock: 150,
    weight: '500g',
    images: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', alt: 'A2 Gir Cow Ghee 500g' },
      { url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600', alt: 'A2 Gir Cow Ghee jar' }
    ],
    benefits: [
      'Rich in A2 beta-casein protein',
      'Boosts immunity and digestion',
      'Contains natural CLA (Conjugated Linoleic Acid)',
      'High smoke point — ideal for cooking',
      'Lactose & casein-free (safe for lactose intolerant)'
    ],
    ingredients: ['100% Pure A2 Gir Cow Milk'],
    nutritionFacts: { calories: '900 kcal/100g', fat: '99.8g', protein: '0g', carbs: '0g' },
    tags: ['a2', 'gir-cow', 'bilona', 'organic', 'pure'],
    isFeatured: true,
    rating: 4.8,
    numReviews: 124
  },
  {
    name: 'Pure A2 Gir Cow Ghee',
    shortDescription: 'Traditional bilona method, 100% pure A2 milk ghee',
    description: 'Our flagship A2 Gir Cow Ghee in family pack size. Same authentic Bilona method, bigger savings.',
    category: 'desi-cow-ghee',
    price: 1599,
    discountedPrice: 1399,
    stock: 80,
    weight: '1kg',
    images: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', alt: 'A2 Gir Cow Ghee 1kg' }
    ],
    benefits: [
      'Rich in A2 beta-casein protein',
      'Boosts immunity and digestion',
      'Contains natural CLA',
      'Best value family pack'
    ],
    ingredients: ['100% Pure A2 Gir Cow Milk'],
    nutritionFacts: { calories: '900 kcal/100g', fat: '99.8g', protein: '0g', carbs: '0g' },
    tags: ['a2', 'gir-cow', 'bilona', 'family-pack'],
    isFeatured: true,
    rating: 4.9,
    numReviews: 89
  },
  {
    name: 'Buffalo Ghee Premium',
    shortDescription: 'Rich, creamy buffalo ghee for traditional recipes',
    description: 'Our Premium Buffalo Ghee is made from the finest buffalo milk, slow-cooked to golden perfection. Known for its rich flavor and dense nutritional profile, it is ideal for traditional Indian sweets, rotis, and rice dishes.',
    category: 'buffalo-ghee',
    price: 649,
    discountedPrice: 579,
    stock: 200,
    weight: '500g',
    images: [
      { url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600', alt: 'Buffalo Ghee Premium' }
    ],
    benefits: [
      'Higher fat content — more energy',
      'Rich in fat-soluble vitamins A, D, E, K',
      'Ideal for traditional Indian cooking',
      'Deep golden color and rich aroma'
    ],
    ingredients: ['100% Pure Buffalo Milk'],
    nutritionFacts: { calories: '920 kcal/100g', fat: '99.9g', protein: '0g', carbs: '0g' },
    tags: ['buffalo', 'premium', 'traditional'],
    isFeatured: true,
    rating: 4.6,
    numReviews: 67
  },
  {
    name: 'Cow Ghee Classic',
    shortDescription: 'Farm-fresh cow ghee, slow-cooked traditionally',
    description: 'Our Classic Cow Ghee is made from fresh, farm-sourced cow milk using traditional slow-cooking method. Perfect everyday ghee for all your cooking and health needs.',
    category: 'cow-ghee',
    price: 549,
    discountedPrice: null,
    stock: 300,
    weight: '500g',
    images: [
      { url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600', alt: 'Cow Ghee Classic' }
    ],
    benefits: [
      'Everyday cooking essential',
      'Good source of healthy fats',
      'Supports brain and bone health',
      'No preservatives or additives'
    ],
    ingredients: ['100% Pure Cow Milk'],
    nutritionFacts: { calories: '900 kcal/100g', fat: '99.5g', protein: '0g', carbs: '0g' },
    tags: ['cow', 'classic', 'everyday', 'pure'],
    isFeatured: false,
    rating: 4.5,
    numReviews: 203
  },
  {
    name: 'Turmeric Infused Ghee',
    shortDescription: 'Golden ghee with organic turmeric — the ultimate immunity booster',
    description: 'A potent blend of our pure desi cow ghee infused with organic turmeric (haldi). This golden ghee combines the ancient healing properties of turmeric with the nutritional richness of ghee, creating a powerful immunity-boosting superfood.',
    category: 'flavored-ghee',
    price: 699,
    discountedPrice: 629,
    stock: 100,
    weight: '250g',
    images: [
      { url: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600', alt: 'Turmeric Ghee' }
    ],
    benefits: [
      'Anti-inflammatory properties',
      'Boosts immunity naturally',
      'Aids in joint pain relief',
      'Rich in curcumin & antioxidants',
      'Perfect for golden milk (haldi doodh)'
    ],
    ingredients: ['Pure Desi Cow Ghee', 'Organic Turmeric (Curcuma longa)'],
    nutritionFacts: { calories: '895 kcal/100g', fat: '99g', protein: '0.2g', carbs: '0.5g' },
    tags: ['turmeric', 'haldi', 'immunity', 'flavored', 'organic'],
    isFeatured: true,
    rating: 4.7,
    numReviews: 45
  },
  {
    name: 'Family Combo Pack',
    shortDescription: '500g Cow + 500g Buffalo Ghee — best value combo',
    description: 'Get the best of both worlds with our Family Combo Pack. Includes 500g of our Premium Cow Ghee and 500g of our Rich Buffalo Ghee at a special bundled price. Perfect for families who enjoy varied cooking styles.',
    category: 'combo-pack',
    price: 1099,
    discountedPrice: 949,
    stock: 60,
    weight: '1kg (2x500g)',
    images: [
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', alt: 'Family Combo Pack' }
    ],
    benefits: [
      'Best value for money',
      'Variety for different recipes',
      'Gift-worthy packaging',
      'Free shipping included'
    ],
    ingredients: ['Pure Cow Milk', 'Pure Buffalo Milk'],
    nutritionFacts: { calories: '910 kcal/100g', fat: '99.7g', protein: '0g', carbs: '0g' },
    tags: ['combo', 'family', 'value', 'gift'],
    isFeatured: true,
    rating: 4.8,
    numReviews: 32
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@desighestore.com',
      password: 'Admin@123',
      role: 'admin',
      phone: '9999999999'
    });
    console.log('👤 Admin created:', admin.email);

    // Create test user
    await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: 'Test@123',
      phone: '8888888888'
    });
    console.log('👤 Test user created: user@test.com');

    // Create products
    // Drop the collection first to clear any index issues
try {
  await mongoose.connection.collection('products').drop();
} catch (error) {
  // Collection doesn't exist, that's fine
}

// Generate unique slugs
const productsWithSlugs = products.map((product, index) => ({
  ...product,
  slug: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + (Date.now() + index)
}));

// Create products
await Product.insertMany(productsWithSlugs);

    console.log(`📦 ${products.length} products seeded`);

    console.log('\n✨ Database seeded successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔑 Admin Login:  admin@desighestore.com / Admin@123');
    console.log('👤 User Login:   user@test.com / Test@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
