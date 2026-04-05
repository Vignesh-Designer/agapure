/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, useScroll, useSpring, motion } from 'motion/react';

// Import our new components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', message: '', oilQuantity: '', oilUnit: 'Litre' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const CONTACT_EMAIL = 'rv.vgnesh@gmail.com';
  const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Handle Scroll for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when "page" changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProduct]);

  // --- DATA ---
  const getProductImage = (productName: string | null) => {
    switch (productName) {
      case 'Refined Palm Oil': return '/images/palm-oil.png';
      case 'Groundnut Oil': return '/images/groundnut-oil.png';
      case 'Sunflower Oil': return '/images/sunflower-oil.png';
      case 'Coconut Oil': return '/images/coconut-oil.png';
      default: return '/images/palm-oil.png';
    }
  };

  const productVariations = [
    { id: 1, size: '200 ML Bottle', img: getProductImage(selectedProduct) },
    { id: 2, size: '500 ML Bottle', img: getProductImage(selectedProduct) },
    { id: 3, size: '1 Litre Bottle', img: getProductImage(selectedProduct) },
    { id: 4, size: '2 Litre Bottle', img: getProductImage(selectedProduct) },
    { id: 5, size: '5 Litre Jar', img: getProductImage(selectedProduct) },
    { id: 6, size: '10 Litre Tin', img: getProductImage(selectedProduct) },
    { id: 7, size: '15 Litre Tin', img: getProductImage(selectedProduct) },
    { id: 8, size: '15 Kg Tin', img: getProductImage(selectedProduct) },
  ];

  const slides = [
    { id: 1, title: 'Pure & High-Quality Edible Oils', subtitle: 'Your trusted partner in delivering quality you can trust.', image: '/images/hero-banner.jpg', cta: 'Explore Products', link: '#products' },
    { id: 2, title: 'Coimbatore-Based Manufacturer', subtitle: 'Specializing in Refined Palm, Groundnut, Sunflower, and Coconut oils.', image: '/images/hero-banner.jpg', cta: 'About Us', link: '#about-us' },
    { id: 3, title: 'Bulk Supply & Wholesale Pricing', subtitle: 'Serving wholesalers, retailers, and bulk buyers across various markets.', image: '/images/hero-banner.jpg', cta: 'Contact Us', link: '#contact' },
    { id: 4, title: 'Hygienic Processing & Packaging', subtitle: 'Ensuring the highest standards of safety and purity in every drop.', image: '/images/hero-banner.jpg', cta: 'Our Quality', link: '#why-choose-us' },
    { id: 5, title: 'Trusted by Thousands of Families', subtitle: 'Bringing health and taste to your kitchen with Agapure oils.', image: '/images/hero-banner.jpg', cta: 'View Products', link: '#products' },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsCaptchaLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsCaptchaLoading(false);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, to: CONTACT_EMAIL })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', address: '', message: '', oilQuantity: '', oilUnit: 'Litre' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative font-sans text-gray-900 bg-white overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[70] origin-left" style={{ scaleX }} />

      <Navbar 
        isScrolled={isScrolled} 
        selectedProduct={selectedProduct} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        setSelectedProduct={setSelectedProduct} 
      />

      <AnimatePresence mode="wait">
        {!selectedProduct ? (
          <HomePage 
            currentSlide={currentSlide}
            slides={slides}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
            setSelectedProduct={setSelectedProduct}
            formData={formData}
            setFormData={setFormData}
            handleFormSubmit={handleFormSubmit}
            isCaptchaLoading={isCaptchaLoading}
            isSubmitting={isSubmitting}
            isSuccess={isSuccess}
            errors={errors}
            setErrors={setErrors}
          />
        ) : (
          <ProductPage 
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            productVariations={productVariations}
          />
        )}
      </AnimatePresence>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
