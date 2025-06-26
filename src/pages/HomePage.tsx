import React, { useState } from 'react';
import { Heart, MapPin, Clock, Users, Package, Truck, Globe, Shield, Zap } from 'lucide-react';
import DonationForm from '../components/DonationForm';
import Header from '../components/Header';
import StatsSection from '../components/StatsSection';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
              <span className="text-primary-600"> {t('hero.surplus')} </span>
              {t('hero.and')}
              <span className="text-secondary-600"> {t('hero.need')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowDonationForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {t('hero.donateNow')}
              </button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white hover:bg-gray-50 text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-primary-600 transition-all duration-200"
              >
                {t('hero.learnMore')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('about.globalImpact')}</h3>
              <p className="text-gray-600">
                {t('about.globalImpactDesc')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('about.safeReliable')}</h3>
              <p className="text-gray-600">
                {t('about.safeReliableDesc')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('about.aiPowered')}</h3>
              <p className="text-gray-600">
                {t('about.aiPoweredDesc')}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why This Matters</h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🌍 Environmental Crisis</h4>
                  <p className="text-gray-700 text-sm">
                    Food waste contributes to 8-10% of global greenhouse gas emissions. By rescuing surplus food, 
                    we're directly combating climate change while feeding communities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🍽️ Food Insecurity</h4>
                  <p className="text-gray-700 text-sm">
                    Millions face hunger daily while tons of perfectly good food are discarded. 
                    We bridge this gap by connecting surplus with need in real-time.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">💰 Economic Impact</h4>
                  <p className="text-gray-700 text-sm">
                    Food waste costs the global economy $1 trillion annually. Our platform helps businesses 
                    reduce waste disposal costs while supporting their community impact goals.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🤝 Community Building</h4>
                  <p className="text-gray-700 text-sm">
                    Every donation creates connections between businesses, volunteers, and beneficiaries, 
                    strengthening community bonds and social responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('howItWorks.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                <Package className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('howItWorks.step1')}</h3>
              <p className="text-gray-600">
                {t('howItWorks.step1Desc')}
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary-200 transition-colors">
                <Truck className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('howItWorks.step2')}</h3>
              <p className="text-gray-600">
                {t('howItWorks.step2Desc')}
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-200 transition-colors">
                <Heart className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('howItWorks.step3')}</h3>
              <p className="text-gray-600">
                {t('howItWorks.step3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of donors and volunteers working together to reduce waste and feed communities.
          </p>
          <button
            onClick={() => setShowDonationForm(true)}
            className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Donating Today
          </button>
        </div>
      </section>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <DonationForm onClose={() => setShowDonationForm(false)} />
      )}
    </div>
  );
};

export default HomePage;