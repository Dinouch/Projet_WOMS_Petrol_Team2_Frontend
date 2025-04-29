export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Prices', href: '#prices' },
  { label: 'About', href: '#about' },
  { label: 'Locations', href: '#locations' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const services = [
  {
    id: 1,
    title: 'Premium Fuel',
    description: 'High-quality fuel optimized for performance and efficiency.',
    icon: 'Fuel',
  },
  {
    id: 2,
    title: 'Oil Change',
    description: 'Professional oil change services with premium oil products.',
    icon: 'Droplet',
  },
  {
    id: 3,
    title: 'Commercial Supply',
    description: 'Reliable bulk fuel supply for commercial and industrial needs.',
    icon: 'TruckIcon',
  },
  {
    id: 4,
    title: 'Convenience Store',
    description: '24/7 stores with fresh food, beverages, and essential items.',
    icon: 'ShoppingBag',
  },
  {
    id: 5,
    title: 'Car Wash',
    description: 'State-of-the-art car wash facilities for a spotless vehicle.',
    icon: 'CarFront',
  },
  {
    id: 6,
    title: 'Café Services',
    description: 'Fresh coffee, snacks, and meals for customers on the go.',
    icon: 'Coffee',
  },
];

export const fuelPrices = [
  { type: 'Regular', price: 3.45, change: -0.05 },
  { type: 'Plus', price: 3.75, change: -0.03 },
  { type: 'Premium', price: 4.05, change: -0.02 },
  { type: 'Diesel', price: 3.65, change: 0.01 },
];

export const locations = [
  {
    id: 1,
    name: 'WomsPetrol Downtown',
    address: '123 Main Street',
    city: 'Metropolis',
    state: 'NY',
    zipCode: '10001',
    latitude: 40.7128,
    longitude: -74.0060,
    services: ['Premium Fuel', 'Car Wash', 'Convenience Store', 'Café'],
    hours: '24 hours',
  },
  {
    id: 2,
    name: 'WomsPetrol Westside',
    address: '456 West Avenue',
    city: 'Metropolis',
    state: 'NY',
    zipCode: '10002',
    latitude: 40.7145,
    longitude: -74.0085,
    services: ['Premium Fuel', 'Oil Change', 'Convenience Store'],
    hours: '5:00 AM - 11:00 PM',
  },
  {
    id: 3,
    name: 'WomsPetrol Highway Plaza',
    address: '789 Interstate Road',
    city: 'Riverdale',
    state: 'NY',
    zipCode: '10463',
    latitude: 40.8978,
    longitude: -73.9171,
    services: ['Premium Fuel', 'Diesel', 'Truck Stop', 'Restaurant', 'Showers'],
    hours: '24 hours',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Daily Commuter',
    content: "I've been a loyal customer of WomsPetrol for over 5 years. Their fuel quality is consistently excellent, and their service stations are always clean and well-maintained.",
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Fleet Manager',
    content: 'Our company has partnered with WomsPetrol for our fleet fueling needs, and the experience has been exceptional. Their commercial services are reliable and cost-effective.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Truck Driver',
    content: "As someone who spends most of their time on the road, I appreciate WomsPetrol's truck stops. They have all the amenities I need, and the staff is always friendly.",
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];