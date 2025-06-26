import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ar' | 'es' | 'de' | 'zh' | 'hi' | 'pt';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Comprehensive translations for all languages
const translations = {
  en: {
    // Header & Navigation
    'nav.about': 'About',
    'nav.impact': 'Impact',
    'nav.howItWorks': 'How It Works',
    'nav.volunteer': 'Volunteer Portal',
    'nav.admin': 'Admin',
    'nav.backToHome': 'Back to Home',
    
    // Hero Section
    'hero.title': 'Bridge the Gap Between',
    'hero.surplus': 'Surplus',
    'hero.and': 'and',
    'hero.need': 'Need',
    'hero.subtitle': 'Join our humanitarian mission to reduce food waste and support vulnerable communities. Every donation makes a difference in someone\'s life.',
    'hero.donateNow': 'Donate Food Now',
    'hero.learnMore': 'Learn More',
    
    // About Section
    'about.title': 'About Our Mission',
    'about.subtitle': 'We\'re dedicated to creating a world where no food goes to waste while people go hungry. Our technology-driven approach connects food donors with those in need through efficient, transparent, and impactful food rescue operations.',
    'about.globalImpact': 'Global Impact',
    'about.globalImpactDesc': 'Operating across multiple cities, we\'ve rescued millions of meals that would have otherwise gone to waste, directly supporting food security in vulnerable communities.',
    'about.safeReliable': 'Safe & Reliable',
    'about.safeReliableDesc': 'Our platform ensures food safety through rigorous tracking, time-sensitive alerts, and trained volunteer networks that maintain the highest standards of food handling.',
    'about.aiPowered': 'AI-Powered Efficiency',
    'about.aiPoweredDesc': 'Advanced algorithms optimize pickup routes, predict donation patterns, and ensure maximum efficiency in our food rescue operations, reducing waste and response times.',
    
    // How It Works
    'howItWorks.title': 'How Our System Works',
    'howItWorks.step1': '1. Report Surplus',
    'howItWorks.step1Desc': 'Restaurants, events, and businesses easily report available food with details on type, quantity, and pickup time through our intuitive platform.',
    'howItWorks.step2': '2. Smart Collection',
    'howItWorks.step2Desc': 'Our AI system optimizes pickup routes, assigns trained volunteers, and ensures efficient food collection while maintaining safety standards.',
    'howItWorks.step3': '3. Community Impact',
    'howItWorks.step3Desc': 'Food reaches those in need through partner organizations while reducing waste, creating measurable environmental and social impact.',
    
    // Stats Section
    'stats.title': 'Our Community Impact',
    'stats.subtitle': 'Real-time metrics showing the difference we\'re making together in reducing waste and feeding communities.',
    'stats.mealsRescued': 'Meals Rescued',
    'stats.peopleFed': 'People Fed',
    'stats.partnerLocations': 'Partner Locations',
    'stats.co2Saved': 'CO₂ Saved',
    'stats.successRate': 'Success Rate',
    'stats.avgResponse': 'Avg Response',
    'stats.thisMonth': 'This month',
    'stats.familiesSupported': 'Families supported',
    'stats.activeDonors': 'Active donors',
    'stats.environmentalImpact': 'Environmental impact',
    'stats.collectionEfficiency': 'Collection efficiency',
    'stats.pickupTime': 'Pickup time',
    
    // Login Forms
    'login.adminPortal': 'Admin Portal',
    'login.managementSystem': 'FoodBank Management System',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.signIn': 'Sign In to Dashboard',
    'login.demoCredentials': 'Demo Credentials',
    'login.volunteerAccess': 'Volunteer Access',
    'login.volunteerIdentifier': 'Volunteer Identifier',
    'login.enterIdEmail': 'Enter your ID, email, or name',
    'login.accessDashboard': 'Access Dashboard',
    'login.quickAccess': 'Quick Access',
    'login.demoAccess': 'Demo Access - Try these',
    
    // Donation Form
    'donation.title': 'Submit Food Donation',
    'donation.basicInfo': 'Basic Info',
    'donation.foodSafety': 'Food Safety',
    'donation.donorName': 'Donor Name',
    'donation.organizationType': 'Organization Type',
    'donation.foodType': 'Food Type',
    'donation.quantity': 'Estimated Quantity',
    'donation.bestBefore': 'Best Before Time',
    'donation.contactPhone': 'Contact Phone',
    'donation.pickupAddress': 'Pickup Address',
    'donation.storageConditions': 'Storage Conditions',
    'donation.foodCategory': 'Food Category',
    'donation.preparationTime': 'Preparation/Cooking Time',
    'donation.currentTemp': 'Current Temperature (if known)',
    'donation.allergens': 'Allergen Information',
    'donation.handlingNotes': 'Food Handling Notes',
    'donation.additionalInstructions': 'Additional Instructions',
    'donation.submit': 'Submit Donation',
    'donation.next': 'Next: Food Safety Info',
    'donation.back': 'Back',
    'donation.thankYou': 'Thank You!',
    'donation.successMessage': 'Your donation has been submitted successfully with food safety information. Our admin team will review and contact you shortly to coordinate pickup within 1 day.',
    
    // Dashboard
    'dashboard.overview': 'Dashboard Overview',
    'dashboard.activeDonations': 'Active Donations',
    'dashboard.foodSafetyTracking': 'Food Safety Tracking',
    'dashboard.volunteerManagement': 'Volunteer Management',
    'dashboard.inventoryManagement': 'Inventory Management',
    'dashboard.analytics': 'Analytics & Reports',
    'dashboard.aiAssistant': 'AI Assistant',
    'dashboard.totalDonations': 'Total Donations',
    'dashboard.pendingReview': 'Pending Review',
    'dashboard.activeCollections': 'Active Collections',
    'dashboard.completedToday': 'Completed Today',
    'dashboard.urgentAlerts': 'Urgent Alerts',
    'dashboard.safetyAlerts': 'Safety Alerts',
    'dashboard.highRiskItems': 'High Risk Items',
    
    // Volunteer Dashboard
    'volunteer.dashboard': 'Volunteer Dashboard',
    'volunteer.welcome': 'Welcome',
    'volunteer.newAssignments': 'New Assignments',
    'volunteer.activeCollections': 'Active Collections',
    'volunteer.completedToday': 'Completed Today',
    'volunteer.startCollection': 'Start Collection',
    'volunteer.markCompleted': 'Mark Completed',
    'volunteer.newAssignment': 'NEW ASSIGNMENT',
    'volunteer.highPriority': 'HIGH PRIORITY',
    'volunteer.safetyReminder': 'Food Safety Reminder',
    'volunteer.safetyProtocol': 'You have high-risk items assigned. Please follow safety protocols: verify food condition, maintain temperature control, and document any concerns.',
    
    // Common Actions
    'action.approve': 'Approve',
    'action.reject': 'Reject',
    'action.assign': 'Assign Volunteer',
    'action.cancel': 'Cancel',
    'action.save': 'Save',
    'action.delete': 'Delete',
    'action.edit': 'Edit',
    'action.view': 'View',
    'action.logout': 'Logout',
    'action.login': 'Login',
    'action.submit': 'Submit',
    'action.close': 'Close',
    
    // Status Labels
    'status.pending': 'Pending Review',
    'status.approved': 'Approved',
    'status.rejected': 'Rejected',
    'status.assigned': 'Assigned',
    'status.inTransit': 'In Transit',
    'status.completed': 'Completed',
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.suspended': 'Suspended',
    
    // Safety Labels
    'safety.highRisk': 'High Risk',
    'safety.mediumRisk': 'Medium Risk',
    'safety.lowRisk': 'Low Risk',
    'safety.unknown': 'Unknown',
    'safety.score': 'Safety Score',
    'safety.guidelines': 'Food Safety Guidelines',
    'safety.alerts': 'Safety Alerts',
    
    // Time & Urgency
    'time.expired': 'Expired',
    'time.hoursLeft': 'h left',
    'time.minutesLeft': 'm left',
    'urgency.high': 'High',
    'urgency.medium': 'Medium',
    'urgency.low': 'Low',
    'urgency.urgent': 'URGENT',
    
    // Food Categories
    'food.prepared': 'Prepared/Cooked Food',
    'food.raw': 'Raw Food (meat, dairy, produce)',
    'food.packaged': 'Packaged/Processed Food',
    'food.hot': 'Hot (Above 60°C/140°F)',
    'food.cold': 'Refrigerated (Below 4°C/40°F)',
    'food.frozen': 'Frozen (Below -18°C/0°F)',
    'food.ambient': 'Room Temperature',
    
    // Organization Types
    'org.restaurant': 'Restaurant',
    'org.eventVenue': 'Event Venue',
    'org.groceryStore': 'Grocery Store',
    'org.individual': 'Individual',
    'org.catering': 'Catering Service',
    'org.other': 'Other',
    
    // Language Names
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.arabic': 'العربية',
    'lang.spanish': 'Español',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.hindi': 'हिन्दी',
    'lang.portuguese': 'Português'
  },
  
  fr: {
    // Header & Navigation
    'nav.about': 'À propos',
    'nav.impact': 'Impact',
    'nav.howItWorks': 'Comment ça marche',
    'nav.volunteer': 'Portail bénévole',
    'nav.admin': 'Admin',
    'nav.backToHome': 'Retour à l\'accueil',
    
    // Hero Section
    'hero.title': 'Combler l\'écart entre',
    'hero.surplus': 'Surplus',
    'hero.and': 'et',
    'hero.need': 'Besoin',
    'hero.subtitle': 'Rejoignez notre mission humanitaire pour réduire le gaspillage alimentaire et soutenir les communautés vulnérables. Chaque don fait la différence dans la vie de quelqu\'un.',
    'hero.donateNow': 'Donner maintenant',
    'hero.learnMore': 'En savoir plus',
    
    // About Section
    'about.title': 'Notre mission',
    'about.subtitle': 'Nous nous consacrons à créer un monde où aucune nourriture n\'est gaspillée pendant que les gens ont faim. Notre approche technologique connecte les donateurs de nourriture avec ceux qui en ont besoin.',
    'about.globalImpact': 'Impact mondial',
    'about.globalImpactDesc': 'Opérant dans plusieurs villes, nous avons sauvé des millions de repas qui auraient autrement été gaspillés.',
    'about.safeReliable': 'Sûr et fiable',
    'about.safeReliableDesc': 'Notre plateforme assure la sécurité alimentaire grâce à un suivi rigoureux et des réseaux de bénévoles formés.',
    'about.aiPowered': 'Efficacité IA',
    'about.aiPoweredDesc': 'Des algorithmes avancés optimisent les itinéraires de collecte et garantissent une efficacité maximale.',
    
    // How It Works
    'howItWorks.title': 'Comment fonctionne notre système',
    'howItWorks.step1': '1. Signaler le surplus',
    'howItWorks.step1Desc': 'Les restaurants et entreprises signalent facilement la nourriture disponible via notre plateforme intuitive.',
    'howItWorks.step2': '2. Collecte intelligente',
    'howItWorks.step2Desc': 'Notre système IA optimise les itinéraires et assigne des bénévoles formés pour une collecte efficace.',
    'howItWorks.step3': '3. Impact communautaire',
    'howItWorks.step3Desc': 'La nourriture atteint ceux qui en ont besoin tout en réduisant le gaspillage.',
    
    // Stats Section
    'stats.title': 'Notre impact communautaire',
    'stats.subtitle': 'Métriques en temps réel montrant la différence que nous faisons ensemble.',
    'stats.mealsRescued': 'Repas sauvés',
    'stats.peopleFed': 'Personnes nourries',
    'stats.partnerLocations': 'Lieux partenaires',
    'stats.co2Saved': 'CO₂ économisé',
    'stats.successRate': 'Taux de réussite',
    'stats.avgResponse': 'Réponse moy.',
    'stats.thisMonth': 'Ce mois',
    'stats.familiesSupported': 'Familles soutenues',
    'stats.activeDonors': 'Donateurs actifs',
    'stats.environmentalImpact': 'Impact environnemental',
    'stats.collectionEfficiency': 'Efficacité de collecte',
    'stats.pickupTime': 'Temps de collecte',
    
    // Login Forms
    'login.adminPortal': 'Portail administrateur',
    'login.managementSystem': 'Système de gestion FoodBank',
    'login.username': 'Nom d\'utilisateur',
    'login.password': 'Mot de passe',
    'login.signIn': 'Se connecter au tableau de bord',
    'login.demoCredentials': 'Identifiants de démonstration',
    'login.volunteerAccess': 'Accès bénévole',
    'login.volunteerIdentifier': 'Identifiant bénévole',
    'login.enterIdEmail': 'Entrez votre ID, email ou nom',
    'login.accessDashboard': 'Accéder au tableau de bord',
    'login.quickAccess': 'Accès rapide',
    'login.demoAccess': 'Accès démo - Essayez ceci',
    
    // Donation Form
    'donation.title': 'Soumettre un don alimentaire',
    'donation.basicInfo': 'Informations de base',
    'donation.foodSafety': 'Sécurité alimentaire',
    'donation.donorName': 'Nom du donateur',
    'donation.organizationType': 'Type d\'organisation',
    'donation.foodType': 'Type d\'aliment',
    'donation.quantity': 'Quantité estimée',
    'donation.bestBefore': 'Meilleur avant',
    'donation.contactPhone': 'Téléphone de contact',
    'donation.pickupAddress': 'Adresse de collecte',
    'donation.storageConditions': 'Conditions de stockage',
    'donation.foodCategory': 'Catégorie d\'aliment',
    'donation.preparationTime': 'Heure de préparation/cuisson',
    'donation.currentTemp': 'Température actuelle (si connue)',
    'donation.allergens': 'Informations sur les allergènes',
    'donation.handlingNotes': 'Notes de manipulation',
    'donation.additionalInstructions': 'Instructions supplémentaires',
    'donation.submit': 'Soumettre le don',
    'donation.next': 'Suivant: Sécurité alimentaire',
    'donation.back': 'Retour',
    'donation.thankYou': 'Merci!',
    'donation.successMessage': 'Votre don a été soumis avec succès. Notre équipe vous contactera sous peu.',
    
    // Dashboard
    'dashboard.overview': 'Aperçu du tableau de bord',
    'dashboard.activeDonations': 'Dons actifs',
    'dashboard.foodSafetyTracking': 'Suivi de la sécurité alimentaire',
    'dashboard.volunteerManagement': 'Gestion des bénévoles',
    'dashboard.inventoryManagement': 'Gestion des stocks',
    'dashboard.analytics': 'Analyses et rapports',
    'dashboard.aiAssistant': 'Assistant IA',
    'dashboard.totalDonations': 'Total des dons',
    'dashboard.pendingReview': 'En attente d\'examen',
    'dashboard.activeCollections': 'Collectes actives',
    'dashboard.completedToday': 'Terminé aujourd\'hui',
    'dashboard.urgentAlerts': 'Alertes urgentes',
    'dashboard.safetyAlerts': 'Alertes de sécurité',
    'dashboard.highRiskItems': 'Articles à haut risque',
    
    // Volunteer Dashboard
    'volunteer.dashboard': 'Tableau de bord bénévole',
    'volunteer.welcome': 'Bienvenue',
    'volunteer.newAssignments': 'Nouvelles affectations',
    'volunteer.activeCollections': 'Collectes actives',
    'volunteer.completedToday': 'Terminé aujourd\'hui',
    'volunteer.startCollection': 'Commencer la collecte',
    'volunteer.markCompleted': 'Marquer comme terminé',
    'volunteer.newAssignment': 'NOUVELLE AFFECTATION',
    'volunteer.highPriority': 'HAUTE PRIORITÉ',
    'volunteer.safetyReminder': 'Rappel de sécurité alimentaire',
    'volunteer.safetyProtocol': 'Vous avez des articles à haut risque. Veuillez suivre les protocoles de sécurité.',
    
    // Common Actions
    'action.approve': 'Approuver',
    'action.reject': 'Rejeter',
    'action.assign': 'Assigner un bénévole',
    'action.cancel': 'Annuler',
    'action.save': 'Enregistrer',
    'action.delete': 'Supprimer',
    'action.edit': 'Modifier',
    'action.view': 'Voir',
    'action.logout': 'Déconnexion',
    'action.login': 'Connexion',
    'action.submit': 'Soumettre',
    'action.close': 'Fermer',
    
    // Status Labels
    'status.pending': 'En attente d\'examen',
    'status.approved': 'Approuvé',
    'status.rejected': 'Rejeté',
    'status.assigned': 'Assigné',
    'status.inTransit': 'En transit',
    'status.completed': 'Terminé',
    'status.active': 'Actif',
    'status.inactive': 'Inactif',
    'status.suspended': 'Suspendu',
    
    // Safety Labels
    'safety.highRisk': 'Haut risque',
    'safety.mediumRisk': 'Risque moyen',
    'safety.lowRisk': 'Faible risque',
    'safety.unknown': 'Inconnu',
    'safety.score': 'Score de sécurité',
    'safety.guidelines': 'Directives de sécurité alimentaire',
    'safety.alerts': 'Alertes de sécurité',
    
    // Time & Urgency
    'time.expired': 'Expiré',
    'time.hoursLeft': 'h restantes',
    'time.minutesLeft': 'm restantes',
    'urgency.high': 'Élevé',
    'urgency.medium': 'Moyen',
    'urgency.low': 'Faible',
    'urgency.urgent': 'URGENT',
    
    // Food Categories
    'food.prepared': 'Aliments préparés/cuits',
    'food.raw': 'Aliments crus (viande, produits laitiers)',
    'food.packaged': 'Aliments emballés/transformés',
    'food.hot': 'Chaud (Au-dessus de 60°C)',
    'food.cold': 'Réfrigéré (En dessous de 4°C)',
    'food.frozen': 'Congelé (En dessous de -18°C)',
    'food.ambient': 'Température ambiante',
    
    // Organization Types
    'org.restaurant': 'Restaurant',
    'org.eventVenue': 'Lieu d\'événement',
    'org.groceryStore': 'Épicerie',
    'org.individual': 'Individuel',
    'org.catering': 'Service de restauration',
    'org.other': 'Autre',
    
    // Language Names
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.arabic': 'العربية',
    'lang.spanish': 'Español',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.hindi': 'हिन्दी',
    'lang.portuguese': 'Português'
  },
  
  ar: {
    // Header & Navigation
    'nav.about': 'حول',
    'nav.impact': 'التأثير',
    'nav.howItWorks': 'كيف يعمل',
    'nav.volunteer': 'بوابة المتطوعين',
    'nav.admin': 'الإدارة',
    'nav.backToHome': 'العودة للرئيسية',
    
    // Hero Section
    'hero.title': 'سد الفجوة بين',
    'hero.surplus': 'الفائض',
    'hero.and': 'و',
    'hero.need': 'الحاجة',
    'hero.subtitle': 'انضم إلى مهمتنا الإنسانية لتقليل هدر الطعام ودعم المجتمعات المحتاجة. كل تبرع يحدث فرقاً في حياة شخص ما.',
    'hero.donateNow': 'تبرع بالطعام الآن',
    'hero.learnMore': 'اعرف المزيد',
    
    // About Section
    'about.title': 'حول مهمتنا',
    'about.subtitle': 'نحن ملتزمون بخلق عالم لا يُهدر فيه الطعام بينما الناس جائعون. نهجنا التقني يربط المتبرعين بالطعام مع المحتاجين.',
    'about.globalImpact': 'التأثير العالمي',
    'about.globalImpactDesc': 'نعمل في مدن متعددة وأنقذنا ملايين الوجبات التي كانت ستُهدر.',
    'about.safeReliable': 'آمن وموثوق',
    'about.safeReliableDesc': 'منصتنا تضمن سلامة الغذاء من خلال التتبع الدقيق وشبكات المتطوعين المدربين.',
    'about.aiPowered': 'كفاءة بالذكاء الاصطناعي',
    'about.aiPoweredDesc': 'خوارزميات متقدمة تحسن مسارات الجمع وتضمن أقصى كفاءة.',
    
    // How It Works
    'howItWorks.title': 'كيف يعمل نظامنا',
    'howItWorks.step1': '١. الإبلاغ عن الفائض',
    'howItWorks.step1Desc': 'المطاعم والشركات تبلغ بسهولة عن الطعام المتاح عبر منصتنا البديهية.',
    'howItWorks.step2': '٢. الجمع الذكي',
    'howItWorks.step2Desc': 'نظام الذكاء الاصطناعي يحسن المسارات ويعين متطوعين مدربين للجمع الفعال.',
    'howItWorks.step3': '٣. التأثير المجتمعي',
    'howItWorks.step3Desc': 'الطعام يصل للمحتاجين مع تقليل الهدر وخلق تأثير بيئي واجتماعي قابل للقياس.',
    
    // Stats Section
    'stats.title': 'تأثيرنا المجتمعي',
    'stats.subtitle': 'مقاييس في الوقت الفعلي تظهر الفرق الذي نحدثه معاً في تقليل الهدر وإطعام المجتمعات.',
    'stats.mealsRescued': 'وجبات منقذة',
    'stats.peopleFed': 'أشخاص مُطعمون',
    'stats.partnerLocations': 'مواقع الشركاء',
    'stats.co2Saved': 'ثاني أكسيد الكربون المحفوظ',
    'stats.successRate': 'معدل النجاح',
    'stats.avgResponse': 'متوسط الاستجابة',
    'stats.thisMonth': 'هذا الشهر',
    'stats.familiesSupported': 'عائلات مدعومة',
    'stats.activeDonors': 'متبرعون نشطون',
    'stats.environmentalImpact': 'التأثير البيئي',
    'stats.collectionEfficiency': 'كفاءة الجمع',
    'stats.pickupTime': 'وقت الاستلام',
    
    // Login Forms
    'login.adminPortal': 'بوابة الإدارة',
    'login.managementSystem': 'نظام إدارة بنك الطعام',
    'login.username': 'اسم المستخدم',
    'login.password': 'كلمة المرور',
    'login.signIn': 'تسجيل الدخول للوحة التحكم',
    'login.demoCredentials': 'بيانات التجربة',
    'login.volunteerAccess': 'دخول المتطوعين',
    'login.volunteerIdentifier': 'معرف المتطوع',
    'login.enterIdEmail': 'أدخل المعرف أو البريد الإلكتروني أو الاسم',
    'login.accessDashboard': 'الوصول للوحة التحكم',
    'login.quickAccess': 'وصول سريع',
    'login.demoAccess': 'وصول تجريبي - جرب هذه',
    
    // Donation Form
    'donation.title': 'تقديم تبرع غذائي',
    'donation.basicInfo': 'المعلومات الأساسية',
    'donation.foodSafety': 'سلامة الغذاء',
    'donation.donorName': 'اسم المتبرع',
    'donation.organizationType': 'نوع المنظمة',
    'donation.foodType': 'نوع الطعام',
    'donation.quantity': 'الكمية المقدرة',
    'donation.bestBefore': 'الأفضل قبل',
    'donation.contactPhone': 'هاتف الاتصال',
    'donation.pickupAddress': 'عنوان الاستلام',
    'donation.storageConditions': 'ظروف التخزين',
    'donation.foodCategory': 'فئة الطعام',
    'donation.preparationTime': 'وقت التحضير/الطبخ',
    'donation.currentTemp': 'درجة الحرارة الحالية (إن وُجدت)',
    'donation.allergens': 'معلومات المواد المسببة للحساسية',
    'donation.handlingNotes': 'ملاحظات التعامل',
    'donation.additionalInstructions': 'تعليمات إضافية',
    'donation.submit': 'تقديم التبرع',
    'donation.next': 'التالي: سلامة الغذاء',
    'donation.back': 'رجوع',
    'donation.thankYou': 'شكراً لك!',
    'donation.successMessage': 'تم تقديم تبرعك بنجاح مع معلومات سلامة الغذاء. فريقنا سيراجع ويتصل بك قريباً.',
    
    // Dashboard
    'dashboard.overview': 'نظرة عامة على لوحة التحكم',
    'dashboard.activeDonations': 'التبرعات النشطة',
    'dashboard.foodSafetyTracking': 'تتبع سلامة الغذاء',
    'dashboard.volunteerManagement': 'إدارة المتطوعين',
    'dashboard.inventoryManagement': 'إدارة المخزون',
    'dashboard.analytics': 'التحليلات والتقارير',
    'dashboard.aiAssistant': 'المساعد الذكي',
    'dashboard.totalDonations': 'إجمالي التبرعات',
    'dashboard.pendingReview': 'في انتظار المراجعة',
    'dashboard.activeCollections': 'المجموعات النشطة',
    'dashboard.completedToday': 'مكتمل اليوم',
    'dashboard.urgentAlerts': 'تنبيهات عاجلة',
    'dashboard.safetyAlerts': 'تنبيهات السلامة',
    'dashboard.highRiskItems': 'عناصر عالية المخاطر',
    
    // Volunteer Dashboard
    'volunteer.dashboard': 'لوحة تحكم المتطوع',
    'volunteer.welcome': 'مرحباً',
    'volunteer.newAssignments': 'مهام جديدة',
    'volunteer.activeCollections': 'مجموعات نشطة',
    'volunteer.completedToday': 'مكتمل اليوم',
    'volunteer.startCollection': 'بدء الجمع',
    'volunteer.markCompleted': 'تحديد كمكتمل',
    'volunteer.newAssignment': 'مهمة جديدة',
    'volunteer.highPriority': 'أولوية عالية',
    'volunteer.safetyReminder': 'تذكير بسلامة الغذاء',
    'volunteer.safetyProtocol': 'لديك عناصر عالية المخاطر. يرجى اتباع بروتوكولات السلامة.',
    
    // Common Actions
    'action.approve': 'موافقة',
    'action.reject': 'رفض',
    'action.assign': 'تعيين متطوع',
    'action.cancel': 'إلغاء',
    'action.save': 'حفظ',
    'action.delete': 'حذف',
    'action.edit': 'تعديل',
    'action.view': 'عرض',
    'action.logout': 'تسجيل خروج',
    'action.login': 'تسجيل دخول',
    'action.submit': 'إرسال',
    'action.close': 'إغلاق',
    
    // Status Labels
    'status.pending': 'في انتظار المراجعة',
    'status.approved': 'موافق عليه',
    'status.rejected': 'مرفوض',
    'status.assigned': 'معين',
    'status.inTransit': 'في الطريق',
    'status.completed': 'مكتمل',
    'status.active': 'نشط',
    'status.inactive': 'غير نشط',
    'status.suspended': 'معلق',
    
    // Safety Labels
    'safety.highRisk': 'مخاطر عالية',
    'safety.mediumRisk': 'مخاطر متوسطة',
    'safety.lowRisk': 'مخاطر منخفضة',
    'safety.unknown': 'غير معروف',
    'safety.score': 'نقاط السلامة',
    'safety.guidelines': 'إرشادات سلامة الغذاء',
    'safety.alerts': 'تنبيهات السلامة',
    
    // Time & Urgency
    'time.expired': 'منتهي الصلاحية',
    'time.hoursLeft': 'ساعة متبقية',
    'time.minutesLeft': 'دقيقة متبقية',
    'urgency.high': 'عالي',
    'urgency.medium': 'متوسط',
    'urgency.low': 'منخفض',
    'urgency.urgent': 'عاجل',
    
    // Food Categories
    'food.prepared': 'طعام محضر/مطبوخ',
    'food.raw': 'طعام نيء (لحوم، ألبان، منتجات)',
    'food.packaged': 'طعام معبأ/معالج',
    'food.hot': 'ساخن (فوق 60 درجة مئوية)',
    'food.cold': 'مبرد (تحت 4 درجات مئوية)',
    'food.frozen': 'مجمد (تحت -18 درجة مئوية)',
    'food.ambient': 'درجة حرارة الغرفة',
    
    // Organization Types
    'org.restaurant': 'مطعم',
    'org.eventVenue': 'مكان الفعاليات',
    'org.groceryStore': 'متجر بقالة',
    'org.individual': 'فردي',
    'org.catering': 'خدمة تقديم الطعام',
    'org.other': 'أخرى',
    
    // Language Names
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.arabic': 'العربية',
    'lang.spanish': 'Español',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.hindi': 'हिन्दी',
    'lang.portuguese': 'Português'
  },
  
  es: {
    // Header & Navigation
    'nav.about': 'Acerca de',
    'nav.impact': 'Impacto',
    'nav.howItWorks': 'Cómo funciona',
    'nav.volunteer': 'Portal de voluntarios',
    'nav.admin': 'Admin',
    'nav.backToHome': 'Volver al inicio',
    
    // Hero Section
    'hero.title': 'Cerrar la brecha entre',
    'hero.surplus': 'Excedente',
    'hero.and': 'y',
    'hero.need': 'Necesidad',
    'hero.subtitle': 'Únete a nuestra misión humanitaria para reducir el desperdicio de alimentos y apoyar a las comunidades vulnerables. Cada donación marca la diferencia en la vida de alguien.',
    'hero.donateNow': 'Donar comida ahora',
    'hero.learnMore': 'Saber más',
    
    // About Section
    'about.title': 'Nuestra misión',
    'about.subtitle': 'Nos dedicamos a crear un mundo donde no se desperdicie comida mientras la gente pasa hambre. Nuestro enfoque tecnológico conecta a los donantes de alimentos con quienes los necesitan.',
    'about.globalImpact': 'Impacto global',
    'about.globalImpactDesc': 'Operando en múltiples ciudades, hemos rescatado millones de comidas que de otro modo se habrían desperdiciado.',
    'about.safeReliable': 'Seguro y confiable',
    'about.safeReliableDesc': 'Nuestra plataforma asegura la seguridad alimentaria a través de seguimiento riguroso y redes de voluntarios capacitados.',
    'about.aiPowered': 'Eficiencia con IA',
    'about.aiPoweredDesc': 'Algoritmos avanzados optimizan las rutas de recolección y aseguran máxima eficiencia.',
    
    // How It Works
    'howItWorks.title': 'Cómo funciona nuestro sistema',
    'howItWorks.step1': '1. Reportar excedente',
    'howItWorks.step1Desc': 'Restaurantes y empresas reportan fácilmente comida disponible a través de nuestra plataforma intuitiva.',
    'howItWorks.step2': '2. Recolección inteligente',
    'howItWorks.step2Desc': 'Nuestro sistema de IA optimiza rutas y asigna voluntarios capacitados para recolección eficiente.',
    'howItWorks.step3': '3. Impacto comunitario',
    'howItWorks.step3Desc': 'La comida llega a quienes la necesitan mientras se reduce el desperdicio.',
    
    // Stats Section
    'stats.title': 'Nuestro impacto comunitario',
    'stats.subtitle': 'Métricas en tiempo real que muestran la diferencia que estamos haciendo juntos.',
    'stats.mealsRescued': 'Comidas rescatadas',
    'stats.peopleFed': 'Personas alimentadas',
    'stats.partnerLocations': 'Ubicaciones asociadas',
    'stats.co2Saved': 'CO₂ ahorrado',
    'stats.successRate': 'Tasa de éxito',
    'stats.avgResponse': 'Respuesta prom.',
    'stats.thisMonth': 'Este mes',
    'stats.familiesSupported': 'Familias apoyadas',
    'stats.activeDonors': 'Donantes activos',
    'stats.environmentalImpact': 'Impacto ambiental',
    'stats.collectionEfficiency': 'Eficiencia de recolección',
    'stats.pickupTime': 'Tiempo de recogida',
    
    // Login Forms
    'login.adminPortal': 'Portal de administrador',
    'login.managementSystem': 'Sistema de gestión FoodBank',
    'login.username': 'Nombre de usuario',
    'login.password': 'Contraseña',
    'login.signIn': 'Iniciar sesión en el panel',
    'login.demoCredentials': 'Credenciales de demostración',
    'login.volunteerAccess': 'Acceso de voluntarios',
    'login.volunteerIdentifier': 'Identificador de voluntario',
    'login.enterIdEmail': 'Ingresa tu ID, email o nombre',
    'login.accessDashboard': 'Acceder al panel',
    'login.quickAccess': 'Acceso rápido',
    'login.demoAccess': 'Acceso demo - Prueba estos',
    
    // Donation Form
    'donation.title': 'Enviar donación de alimentos',
    'donation.basicInfo': 'Información básica',
    'donation.foodSafety': 'Seguridad alimentaria',
    'donation.donorName': 'Nombre del donante',
    'donation.organizationType': 'Tipo de organización',
    'donation.foodType': 'Tipo de alimento',
    'donation.quantity': 'Cantidad estimada',
    'donation.bestBefore': 'Mejor antes de',
    'donation.contactPhone': 'Teléfono de contacto',
    'donation.pickupAddress': 'Dirección de recogida',
    'donation.storageConditions': 'Condiciones de almacenamiento',
    'donation.foodCategory': 'Categoría de alimento',
    'donation.preparationTime': 'Tiempo de preparación/cocción',
    'donation.currentTemp': 'Temperatura actual (si se conoce)',
    'donation.allergens': 'Información de alérgenos',
    'donation.handlingNotes': 'Notas de manejo',
    'donation.additionalInstructions': 'Instrucciones adicionales',
    'donation.submit': 'Enviar donación',
    'donation.next': 'Siguiente: Seguridad alimentaria',
    'donation.back': 'Atrás',
    'donation.thankYou': '¡Gracias!',
    'donation.successMessage': 'Tu donación ha sido enviada exitosamente. Nuestro equipo te contactará pronto.',
    
    // Dashboard
    'dashboard.overview': 'Resumen del panel',
    'dashboard.activeDonations': 'Donaciones activas',
    'dashboard.foodSafetyTracking': 'Seguimiento de seguridad alimentaria',
    'dashboard.volunteerManagement': 'Gestión de voluntarios',
    'dashboard.inventoryManagement': 'Gestión de inventario',
    'dashboard.analytics': 'Análisis e informes',
    'dashboard.aiAssistant': 'Asistente IA',
    'dashboard.totalDonations': 'Total de donaciones',
    'dashboard.pendingReview': 'Pendiente de revisión',
    'dashboard.activeCollections': 'Recolecciones activas',
    'dashboard.completedToday': 'Completado hoy',
    'dashboard.urgentAlerts': 'Alertas urgentes',
    'dashboard.safetyAlerts': 'Alertas de seguridad',
    'dashboard.highRiskItems': 'Artículos de alto riesgo',
    
    // Volunteer Dashboard
    'volunteer.dashboard': 'Panel de voluntario',
    'volunteer.welcome': 'Bienvenido',
    'volunteer.newAssignments': 'Nuevas asignaciones',
    'volunteer.activeCollections': 'Recolecciones activas',
    'volunteer.completedToday': 'Completado hoy',
    'volunteer.startCollection': 'Iniciar recolección',
    'volunteer.markCompleted': 'Marcar como completado',
    'volunteer.newAssignment': 'NUEVA ASIGNACIÓN',
    'volunteer.highPriority': 'ALTA PRIORIDAD',
    'volunteer.safetyReminder': 'Recordatorio de seguridad alimentaria',
    'volunteer.safetyProtocol': 'Tienes artículos de alto riesgo asignados. Por favor sigue los protocolos de seguridad.',
    
    // Common Actions
    'action.approve': 'Aprobar',
    'action.reject': 'Rechazar',
    'action.assign': 'Asignar voluntario',
    'action.cancel': 'Cancelar',
    'action.save': 'Guardar',
    'action.delete': 'Eliminar',
    'action.edit': 'Editar',
    'action.view': 'Ver',
    'action.logout': 'Cerrar sesión',
    'action.login': 'Iniciar sesión',
    'action.submit': 'Enviar',
    'action.close': 'Cerrar',
    
    // Status Labels
    'status.pending': 'Pendiente de revisión',
    'status.approved': 'Aprobado',
    'status.rejected': 'Rechazado',
    'status.assigned': 'Asignado',
    'status.inTransit': 'En tránsito',
    'status.completed': 'Completado',
    'status.active': 'Activo',
    'status.inactive': 'Inactivo',
    'status.suspended': 'Suspendido',
    
    // Safety Labels
    'safety.highRisk': 'Alto riesgo',
    'safety.mediumRisk': 'Riesgo medio',
    'safety.lowRisk': 'Bajo riesgo',
    'safety.unknown': 'Desconocido',
    'safety.score': 'Puntuación de seguridad',
    'safety.guidelines': 'Pautas de seguridad alimentaria',
    'safety.alerts': 'Alertas de seguridad',
    
    // Time & Urgency
    'time.expired': 'Expirado',
    'time.hoursLeft': 'h restantes',
    'time.minutesLeft': 'm restantes',
    'urgency.high': 'Alto',
    'urgency.medium': 'Medio',
    'urgency.low': 'Bajo',
    'urgency.urgent': 'URGENTE',
    
    // Food Categories
    'food.prepared': 'Comida preparada/cocinada',
    'food.raw': 'Comida cruda (carne, lácteos, productos)',
    'food.packaged': 'Comida empaquetada/procesada',
    'food.hot': 'Caliente (Arriba de 60°C)',
    'food.cold': 'Refrigerado (Debajo de 4°C)',
    'food.frozen': 'Congelado (Debajo de -18°C)',
    'food.ambient': 'Temperatura ambiente',
    
    // Organization Types
    'org.restaurant': 'Restaurante',
    'org.eventVenue': 'Lugar de eventos',
    'org.groceryStore': 'Tienda de comestibles',
    'org.individual': 'Individual',
    'org.catering': 'Servicio de catering',
    'org.other': 'Otro',
    
    // Language Names
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.arabic': 'العربية',
    'lang.spanish': 'Español',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.hindi': 'हिन्दी',
    'lang.portuguese': 'Português'
  },
  
  de: {
    // Header & Navigation
    'nav.about': 'Über uns',
    'nav.impact': 'Auswirkungen',
    'nav.howItWorks': 'Wie es funktioniert',
    'nav.volunteer': 'Freiwilligenportal',
    'nav.admin': 'Admin',
    'nav.backToHome': 'Zurück zur Startseite',
    
    // Hero Section
    'hero.title': 'Die Lücke schließen zwischen',
    'hero.surplus': 'Überschuss',
    'hero.and': 'und',
    'hero.need': 'Bedarf',
    'hero.subtitle': 'Schließen Sie sich unserer humanitären Mission an, um Lebensmittelverschwendung zu reduzieren und gefährdete Gemeinschaften zu unterstützen. Jede Spende macht einen Unterschied im Leben von jemandem.',
    'hero.donateNow': 'Jetzt Lebensmittel spenden',
    'hero.learnMore': 'Mehr erfahren',
    
    // About Section
    'about.title': 'Unsere Mission',
    'about.subtitle': 'Wir widmen uns der Schaffung einer Welt, in der keine Lebensmittel verschwendet werden, während Menschen hungern. Unser technologiegetriebener Ansatz verbindet Lebensmittelspender mit Bedürftigen.',
    'about.globalImpact': 'Globale Auswirkungen',
    'about.globalImpactDesc': 'Wir arbeiten in mehreren Städten und haben Millionen von Mahlzeiten gerettet, die sonst verschwendet worden wären.',
    'about.safeReliable': 'Sicher und zuverlässig',
    'about.safeReliableDesc': 'Unsere Plattform gewährleistet Lebensmittelsicherheit durch rigorose Verfolgung und geschulte Freiwilligennetzwerke.',
    'about.aiPowered': 'KI-gestützte Effizienz',
    'about.aiPoweredDesc': 'Fortgeschrittene Algorithmen optimieren Sammelrouten und gewährleisten maximale Effizienz.',
    
    // How It Works
    'howItWorks.title': 'Wie unser System funktioniert',
    'howItWorks.step1': '1. Überschuss melden',
    'howItWorks.step1Desc': 'Restaurants und Unternehmen melden verfügbare Lebensmittel einfach über unsere intuitive Plattform.',
    'howItWorks.step2': '2. Intelligente Sammlung',
    'howItWorks.step2Desc': 'Unser KI-System optimiert Routen und weist geschulte Freiwillige für effiziente Sammlung zu.',
    'howItWorks.step3': '3. Gemeinschaftsauswirkungen',
    'howItWorks.step3Desc': 'Lebensmittel erreichen Bedürftige, während Verschwendung reduziert wird.',
    
    // Stats Section
    'stats.title': 'Unsere Gemeinschaftsauswirkungen',
    'stats.subtitle': 'Echtzeitmetriken zeigen den Unterschied, den wir gemeinsam bei der Reduzierung von Verschwendung und der Ernährung von Gemeinschaften machen.',
    'stats.mealsRescued': 'Gerettete Mahlzeiten',
    'stats.peopleFed': 'Ernährte Menschen',
    'stats.partnerLocations': 'Partnerstandorte',
    'stats.co2Saved': 'CO₂ gespart',
    'stats.successRate': 'Erfolgsrate',
    'stats.avgResponse': 'Durchschn. Antwort',
    'stats.thisMonth': 'Diesen Monat',
    'stats.familiesSupported': 'Unterstützte Familien',
    'stats.activeDonors': 'Aktive Spender',
    'stats.environmentalImpact': 'Umweltauswirkungen',
    'stats.collectionEfficiency': 'Sammeleffizienz',
    'stats.pickupTime': 'Abholzeit',
    
    // Login Forms
    'login.adminPortal': 'Administratorportal',
    'login.managementSystem': 'FoodBank-Verwaltungssystem',
    'login.username': 'Benutzername',
    'login.password': 'Passwort',
    'login.signIn': 'Beim Dashboard anmelden',
    'login.demoCredentials': 'Demo-Anmeldedaten',
    'login.volunteerAccess': 'Freiwilligenzugang',
    'login.volunteerIdentifier': 'Freiwilligenkennung',
    'login.enterIdEmail': 'ID, E-Mail oder Namen eingeben',
    'login.accessDashboard': 'Auf Dashboard zugreifen',
    'login.quickAccess': 'Schnellzugriff',
    'login.demoAccess': 'Demo-Zugang - Probieren Sie diese',
    
    // Donation Form
    'donation.title': 'Lebensmittelspende einreichen',
    'donation.basicInfo': 'Grundinformationen',
    'donation.foodSafety': 'Lebensmittelsicherheit',
    'donation.donorName': 'Name des Spenders',
    'donation.organizationType': 'Organisationstyp',
    'donation.foodType': 'Lebensmitteltyp',
    'donation.quantity': 'Geschätzte Menge',
    'donation.bestBefore': 'Mindesthaltbarkeitsdatum',
    'donation.contactPhone': 'Kontakttelefon',
    'donation.pickupAddress': 'Abholadresse',
    'donation.storageConditions': 'Lagerbedingungen',
    'donation.foodCategory': 'Lebensmittelkategorie',
    'donation.preparationTime': 'Zubereitungs-/Kochzeit',
    'donation.currentTemp': 'Aktuelle Temperatur (falls bekannt)',
    'donation.allergens': 'Allergeninformationen',
    'donation.handlingNotes': 'Handhabungshinweise',
    'donation.additionalInstructions': 'Zusätzliche Anweisungen',
    'donation.submit': 'Spende einreichen',
    'donation.next': 'Weiter: Lebensmittelsicherheit',
    'donation.back': 'Zurück',
    'donation.thankYou': 'Vielen Dank!',
    'donation.successMessage': 'Ihre Spende wurde erfolgreich eingereicht. Unser Team wird Sie bald kontaktieren.',
    
    // Dashboard
    'dashboard.overview': 'Dashboard-Übersicht',
    'dashboard.activeDonations': 'Aktive Spenden',
    'dashboard.foodSafetyTracking': 'Lebensmittelsicherheitsverfolgung',
    'dashboard.volunteerManagement': 'Freiwilligenverwaltung',
    'dashboard.inventoryManagement': 'Bestandsverwaltung',
    'dashboard.analytics': 'Analysen und Berichte',
    'dashboard.aiAssistant': 'KI-Assistent',
    'dashboard.totalDonations': 'Gesamtspenden',
    'dashboard.pendingReview': 'Ausstehende Überprüfung',
    'dashboard.activeCollections': 'Aktive Sammlungen',
    'dashboard.completedToday': 'Heute abgeschlossen',
    'dashboard.urgentAlerts': 'Dringende Warnungen',
    'dashboard.safetyAlerts': 'Sicherheitswarnungen',
    'dashboard.highRiskItems': 'Hochrisiko-Artikel',
    
    // Volunteer Dashboard
    'volunteer.dashboard': 'Freiwilligen-Dashboard',
    'volunteer.welcome': 'Willkommen',
    'volunteer.newAssignments': 'Neue Aufgaben',
    'volunteer.activeCollections': 'Aktive Sammlungen',
    'volunteer.completedToday': 'Heute abgeschlossen',
    'volunteer.startCollection': 'Sammlung starten',
    'volunteer.markCompleted': 'Als abgeschlossen markieren',
    'volunteer.newAssignment': 'NEUE AUFGABE',
    'volunteer.highPriority': 'HOHE PRIORITÄT',
    'volunteer.safetyReminder': 'Lebensmittelsicherheitserinnerung',
    'volunteer.safetyProtocol': 'Sie haben Hochrisiko-Artikel zugewiesen. Bitte befolgen Sie die Sicherheitsprotokolle.',
    
    // Common Actions
    'action.approve': 'Genehmigen',
    'action.reject': 'Ablehnen',
    'action.assign': 'Freiwilligen zuweisen',
    'action.cancel': 'Abbrechen',
    'action.save': 'Speichern',
    'action.delete': 'Löschen',
    'action.edit': 'Bearbeiten',
    'action.view': 'Anzeigen',
    'action.logout': 'Abmelden',
    'action.login': 'Anmelden',
    'action.submit': 'Einreichen',
    'action.close': 'Schließen',
    
    // Status Labels
    'status.pending': 'Ausstehende Überprüfung',
    'status.approved': 'Genehmigt',
    'status.rejected': 'Abgelehnt',
    'status.assigned': 'Zugewiesen',
    'status.inTransit': 'Unterwegs',
    'status.completed': 'Abgeschlossen',
    'status.active': 'Aktiv',
    'status.inactive': 'Inaktiv',
    'status.suspended': 'Suspendiert',
    
    // Safety Labels
    'safety.highRisk': 'Hohes Risiko',
    'safety.mediumRisk': 'Mittleres Risiko',
    'safety.lowRisk': 'Geringes Risiko',
    'safety.unknown': 'Unbekannt',
    'safety.score': 'Sicherheitsbewertung',
    'safety.guidelines': 'Lebensmittelsicherheitsrichtlinien',
    'safety.alerts': 'Sicherheitswarnungen',
    
    // Time & Urgency
    'time.expired': 'Abgelaufen',
    'time.hoursLeft': 'Std. übrig',
    'time.minutesLeft': 'Min. übrig',
    'urgency.high': 'Hoch',
    'urgency.medium': 'Mittel',
    'urgency.low': 'Niedrig',
    'urgency.urgent': 'DRINGEND',
    
    // Food Categories
    'food.prepared': 'Zubereitete/gekochte Lebensmittel',
    'food.raw': 'Rohe Lebensmittel (Fleisch, Milchprodukte)',
    'food.packaged': 'Verpackte/verarbeitete Lebensmittel',
    'food.hot': 'Heiß (Über 60°C)',
    'food.cold': 'Gekühlt (Unter 4°C)',
    'food.frozen': 'Gefroren (Unter -18°C)',
    'food.ambient': 'Raumtemperatur',
    
    // Organization Types
    'org.restaurant': 'Restaurant',
    'org.eventVenue': 'Veranstaltungsort',
    'org.groceryStore': 'Lebensmittelgeschäft',
    'org.individual': 'Einzelperson',
    'org.catering': 'Catering-Service',
    'org.other': 'Andere',
    
    // Language Names
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.arabic': 'العربية',
    'lang.spanish': 'Español',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.hindi': 'हिन्दी',
    'lang.portuguese': 'Português'
  },
  
  zh: {
    // Header & Navigation
    'nav.about': '关于',
    'nav.impact': '影响',
    'nav.howItWorks': '工作原理',
    'nav.volunteer': '志愿者门户',
    'nav.admin': '管理员',
    'nav.backToHome': '返回首页',
    
    // Hero Section
    'hero.title': '连接',
    'hero.surplus': '剩余',
    'hero.and': '与',
    'hero.need': '需求',
    'hero.subtitle': '加入我们的人道主义使命，减少食物浪费，支持弱势社区。每一份捐赠都能改变某人的生活。',
    'hero.donateNow': '立即捐赠食物',
    'hero.learnMore': '了解更多',
    
    // About Section
    'about.title': '我们的使命',
    'about.subtitle': '我们致力于创造一个不浪费食物而人们挨饿的世界。我们的技术驱动方法通过高效、透明和有影响力的食物救援行动连接食物捐赠者和需要者。',
    'about.globalImpact': '全球影响',
    'about.globalImpactDesc': '在多个城市运营，我们已经拯救了数百万份原本会被浪费的餐食。',
    'about.safeReliable': '安全可靠',
    'about.safeReliableDesc': '我们的平台通过严格的跟踪和训练有素的志愿者网络确保食品安全。',
    'about.aiPowered': 'AI驱动的效率',
    'about.aiPoweredDesc': '先进的算法优化取货路线，确保最大效率。',
    
    // How It Works
    'howItWorks.title': '我们的系统如何工作',
    'howItWorks.step1': '1. 报告剩余',
    'howItWorks.step1Desc': '餐厅和企业通过我们直观的平台轻松报告可用食物。',
    'howItWorks.step2': '2. 智能收集',
    'howItWorks.step2Desc': '我们的AI系统优化路线并分配训练有素的志愿者进行高效收集。',
    'howItWorks.step3': '3. 社区影响',
    'howItWorks.step3Desc': '食物到达需要的人手中，同时减少浪费。',
    
    // Stats Section
    'stats.title': '我们的社区影响',
    'stats.subtitle': '实时指标显示我们在减少浪费和喂养社区方面共同产生的差异。',
    'stats.mealsRescued': '拯救的餐食',
    'stats.peopleFed': '喂养的人数',
    'stats.partnerLocations': '合作伙伴地点',
    'stats.co2Saved': '节省的CO₂',
    'stats.successRate': '成功率',
    'stats.avgResponse': '平均响应',
    'stats.thisMonth': '本月',
    'stats.familiesSupported': '支持的家庭',
    'stats.activeDonors': '活跃捐赠者',
    'stats.environmentalImpact': '环境影响',
    'stats.collectionEfficiency': '收集效率',
    'stats.pickupTime': '取货时间',
    
    // Login Forms
    'login.adminPortal': '管理员门户',
    'login.managementSystem': 'FoodBank管理系统',
    'login.username': '用户名',
    'login.password': '密码',
    'login.signIn': '登录仪表板',
    'login.demoCredentials': '演示凭据',
    'login.volunteerAccess': '志愿者访问',
    'login.volunteerIdentifier': '志愿者标识符',
    'login.enterIdEmail': '输入您的ID、邮箱或姓名',
    'login.accessDashboard': '访问仪表板',
    'login.quickAccess': '快速访问',
    'login.demoAccess': '演示访问 - 试试这些',
    
    // Donation Form
    'donation.title': '提交食物捐赠',
    'donation.basicInfo': '基本信息',
    'donation.foodSafety': '食品安全',
    'donation.donorName': '捐赠者姓名',
    'donation.organizationType': '组织类型',
    'donation.foodType': '食物类型',
    'donation.quantity': '估计数量',
    'donation.bestBefore': '最佳食用期',
    'donation.contactPhone': '联系电话',
    'donation.pickupAddress': '取货地址',
    'donation.storageConditions': '储存条件',
    'donation.foodCategory': '食物类别',
    'donation.preparationTime': '准备/烹饪时间',
    'donation.currentTemp': '当前温度（如果已知）',
    'donation.allergens': '过敏原信息',
    'donation.handlingNotes': '处理说明',
    'donation.additionalInstructions': '附加说明',
    'donation.submit': '提交捐赠',
    'donation.next': '下一步：食品安全',
    'donation.back': '返回',
    'donation.thankYou': '谢谢您！',
    'donation.successMessage': '您的捐赠已成功提交。我们的团队将很快联系您。',
    
    // Dashboard
    'dashboard.overview': '仪表板概览',
    'dashboard.activeDonations': '活跃捐赠',
    'dashboard.foodSafetyTracking': '食品安全跟踪',
    'dashboard.volunteerManagement': '志愿者管理',
    'dashboard.inventoryManagement': '库存管理',
    'dashboard.analytics': '分析和报告',
    'dashboard.aiAssistant': 'AI助手',
    'dashboard.totalDonations': '总捐赠',
    'dashboard.pendingReview': '待审核',
    'dashboard.activeCollections': '活跃收集',
    'dashboard.completedToday': '今日完成',
    'dashboard.urgentAlerts': '紧急警报',
    'dashboard.safetyAlerts': '安全警报',
    'dashboard.highRiskItems': '高风险物品',
    
    // Volunteer Dashboard
    'volunteer.dashboard': '志愿者仪表板',
    'volunteer.welcome': '欢迎',
    'volunteer.newAssignments': '新任务',
    'volunteer.activeCollections': '活跃收集',
    'volunteer.completedToday': '今日完成',
    'volunteer.startCollection': '开始收集',
    'volunteer.markCompleted': '标记为完成',
    'volunteer.newAssignment': '新任务',
    'volunteer.highPriority': '高优先级',
    'volunteer.safetyReminder': '食品安全提醒',
    'volunteer.safetyProtocol': '您有高风险物品分配。请遵循安全协议。',
    
    // Common Actions
    'action.approve': '批准',
    'action.reject': '拒绝',
    'action.assign': '分配志愿者',
    'action.cancel': '取消',
    'action.save': '保存',
    'action.delete': '删除',
    'action.edit': '编辑',
    'action.view': '查看',
    'action.logout': '登出',
    'action.login': '登录',
    'action.submit': '提交',
    'action.close': '关闭',
    
    // Status Labels
    'status.pending': '待审核',
    'status.approved': '已批准',
    'status.rejected': '已拒绝',
    'status.assigned': '已分配',
    'status.inTransit': '运输中',
    'status.completed': '已完成',
    'status.active': '活跃',
    'status.inactive': '非活跃',
    'status.suspended': '暂停',
    
    // Safety Labels
    'safety.highRisk': '高风险',
    'safety.mediumRisk': '中等风险',
    'safety.lowRisk': '低风险',
    'safety.unknown': '未知',
    'safety.score': '安全评分',
    'safety.guidelines': '食品安全指南',
    'safety.alerts': '安全警报',
    
    // Time & Urgency
    'time.expired': '已过期',
    'time.hoursLeft': '小时剩余',
    'time.minutesLeft': '分钟剩余',
    'urgency.high': '高',
    'urgency.medium': '中',
    'urgency.low': '低',
    'urgency.urgent': '紧急',
    
    // Food Categories
    'food.prepared': '准备好的/熟食',
    'food.raw': '生食（肉类、乳制品、农产品）',
    'food.packaged': '包装/加工食品',
    'food.hot': '热的（60°C以上）',
    'food.cold': '冷藏的（4°C以下）',
    'food.frozen': '冷冻的（-18°C以下）',
    'food.ambient': '室温',
    
    // Organization Types
    'org.restaurant': '餐厅',
    'org.eventVenue': '活动场所',
    'org.groceryStore': '杂货店',
    'org.individual': '个人',
    'org.catering': '餐饮服务',
    'org.other': '其他',
    
    // Language Names
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.arabic': 'العربية',
    'lang.spanish': 'Español',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.hindi': 'हिन्दी',
    'lang.portuguese': 'Português'
  },
  
  hi: {
    // Header & Navigation
    'nav.about': 'के बारे में',
    'nav.impact': 'प्रभाव',
    'nav.howItWorks': 'यह कैसे काम करता है',
    'nav.volunteer': 'स्वयंसेवक पोर्टल',
    'nav.admin': 'एडमिन',
    'nav.backToHome': 'होम पर वापस जाएं',
    
    // Hero Section
    'hero.title': 'के बीच अंतर को पाटना',
    'hero.surplus': 'अतिरिक्त',
    'hero.and': 'और',
    'hero.need': 'आवश्यकता',
    'hero.subtitle': 'भोजन की बर्बादी को कम करने और कमजोर समुदायों का समर्थन करने के हमारे मानवीय मिशन में शामिल हों। हर दान किसी के जीवन में बदलाव लाता है।',
    'hero.donateNow': 'अभी भोजन दान करें',
    'hero.learnMore': 'और जानें',
    
    // About Section
    'about.title': 'हमारा मिशन',
    'about.subtitle': 'हम एक ऐसी दुनिया बनाने के लिए समर्पित हैं जहां लोगों के भूखे रहने के दौरान कोई भोजन बर्बाद न हो। हमारा तकनीक-संचालित दृष्टिकोण भोजन दाताओं को जरूरतमंदों से जोड़ता है।',
    'about.globalImpact': 'वैश्विक प्रभाव',
    'about.globalImpactDesc': 'कई शहरों में काम करते हुए, हमने लाखों भोजन बचाए हैं जो अन्यथा बर्बाद हो जाते।',
    'about.safeReliable': 'सुरक्षित और विश्वसनीय',
    'about.safeReliableDesc': 'हमारा प्लेटफॉर्म कठोर ट्रैकिंग और प्रशिक्षित स्वयंसेवक नेटवर्क के माध्यम से खाद्य सुरक्षा सुनिश्चित करता है।',
    'about.aiPowered': 'AI-संचालित दक्षता',
    'about.aiPoweredDesc': 'उन्नत एल्गोरिदम संग्रह मार्गों को अनुकूलित करते हैं और अधिकतम दक्षता सुनिश्चित करते हैं।',
    
    // How It Works
    'howItWorks.title': 'हमारा सिस्टम कैसे काम करता है',
    'howItWorks.step1': '1. अतिरिक्त की रिपोर्ट करें',
    'howItWorks.step1Desc': 'रेस्तरां और व्यवसाय हमारे सहज प्लेटफॉर्म के माध्यम से उपलब्ध भोजन की आसानी से रिपोर्ट करते हैं।',
    'howItWorks.step2': '2. स्मार्ट संग्रह',
    'howItWorks.step2Desc': 'हमारा AI सिस्टम मार्गों को अनुकूलित करता है और कुशल संग्रह के लिए प्रशिक्षित स्वयंसेवकों को असाइन करता है।',
    'howItWorks.step3': '3. सामुदायिक प्रभाव',
    'howItWorks.step3Desc': 'भोजन जरूरतमंदों तक पहुंचता है जबकि बर्बादी कम होती है।',
    
    // Stats Section
    'stats.title': 'हमारा सामुदायिक प्रभाव',
    'stats.subtitle': 'रियल-टाइम मेट्रिक्स दिखाते हैं कि हम मिलकर बर्बादी कम करने और समुदायों को खिलाने में क्या अंतर ला रहे हैं।',
    'stats.mealsRescued': 'बचाए गए भोजन',
    'stats.peopleFed': 'खिलाए गए लोग',
    'stats.partnerLocations': 'साझीदार स्थान',
    'stats.co2Saved': 'CO₂ बचाया गया',
    'stats.successRate': 'सफलता दर',
    'stats.avgResponse': 'औसत प्रतिक्रिया',
    'stats.thisMonth': 'इस महीने',
    'stats.familiesSupported': 'समर्थित परिवार',
    'stats.activeDonors': 'सक्रिय दाता',
    'stats.environmentalImpact': 'पर्यावरणीय प्रभाव',
    'stats.collectionEfficiency': 'संग्रह दक्षता',
    'stats.pickupTime': 'पिकअप समय',
    
    // Login Forms
    'login.adminPortal': 'एडमिन पोर्टल',
    'login.managementSystem': 'FoodBank प्रबंधन सिस्टम',
    'login.username': 'उपयोगकर्ता नाम',
    'login.password': 'पासवर्ड',
    'login.signIn': 'डैशबोर्ड में साइन इन करें',
    'login.demoCredentials': 'डेमो क्रेडेंशियल',
    'login.volunteerAccess': 'स्वयंसेवक पहुंच',
    'login.volunteerIdentifier': 'स्वयंसेवक पहचानकर्ता',
    'login.enterIdEmail': 'अपना ID, ईमेल या नाम दर्ज करें',
    'login.accessDashboard': 'डैशबोर्ड तक पहुंचें',
    'login.quickAccess': 'त्वरित पहुंच',
    'login.demoAccess': 'डेमो पहुंच - इन्हें आज़माएं',
    
    // Donation Form
    'donation.title': 'भोजन दान जमा करें',
    'donation.basicInfo': 'बुनियादी जानकारी',
    'donation.foodSafety': 'खाद्य सुरक्षा',
    'donation.donorName': 'दाता का नाम',
    'donation.organizationType': 'संगठन का प्रकार',
    'donation.foodType': 'भोजन का प्रकार',
    'donation.quantity': 'अनुमानित मात्रा',
    'donation.bestBefore': 'सबसे अच्छा पहले',
    'donation.contactPhone': 'संपर्क फोन',
    'donation.pickupAddress': 'पिकअप पता',
    'donation.storageConditions': 'भंडारण की स्थिति',
    'donation.foodCategory': 'भोजन श्रेणी',
    'donation.preparationTime': 'तैयारी/खाना पकाने का समय',
    'donation.currentTemp': 'वर्तमान तापमान (यदि ज्ञात हो)',
    'donation.allergens': 'एलर्जी की जानकारी',
    'donation.handlingNotes': 'हैंडलिंग नोट्स',
    'donation.additionalInstructions': 'अतिरिक्त निर्देश',
    'donation.submit': 'दान जमा करें',
    'donation.next': 'अगला: खाद्य सुरक्षा',
    'donation.back': 'वापस',
    'donation.thankYou': 'धन्यवाद!',
    'donation.successMessage': 'आपका दान सफलतापूर्वक जमा हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।',
    
    // Dashboard
    'dashboard.overview': 'डैशबोर्ड अवलोकन',
    'dashboard.activeDonations': 'सक्रिय दान',
    'dashboard.foodSafetyTracking': 'खाद्य सुरक्षा ट्रैकिंग',
    'dashboard.volunteerManagement': 'स्वयंसेवक प्रबंधन',
    'dashboard.inventoryManagement': 'इन्वेंटरी प्रबंधन',
    'dashboard.analytics': 'विश्लेषण और रिपोर्ट',
    'dashboard.aiAssistant': 'AI सहायक',
    'dashboard.totalDonations': 'कुल दान',
    'dashboard.pendingReview': 'समीक्षा लंबित',
    'dashboard.activeCollections': 'सक्रिय संग्रह',
    'dashboard.completedToday': 'आज पूरा हुआ',
    'dashboard.urgentAlerts': 'तत्काल अलर्ट',
    'dashboard.safetyAlerts': 'सुरक्षा अलर्ट',
    'dashboard.highRiskItems': 'उच्च जोखिम वाली वस्तुएं',
    
    // Volunteer Dashboard
    'volunteer.dashboard': 'स्वयंसेवक डैशबोर्ड',
    'volunteer.welcome': 'स्वागत है',
    'volunteer.newAssignments': 'नए असाइनमेंट',
    'volunteer.activeCollections': 'सक्रिय संग्रह',
    'volunteer.completedToday': 'आज पूरा हुआ',
    'volunteer.startCollection': 'संग्रह शुरू करें',
    'volunteer.markCompleted': 'पूर्ण के रूप में चिह्नित करें',
    'volunteer.newAssignment': 'नया असाइनमेंट',
    'volunteer.highPriority': 'उच्च प्राथमिकता',
    'volunteer.safetyReminder': 'खाद्य सुरक्षा अनुस्मारक',
    'volunteer.safetyProtocol': 'आपके पास उच्च जोखिम वाली वस्तुएं असाइन हैं। कृपया सुरक्षा प्रोटोकॉल का पालन करें।',
    
    // Common Actions
    'action.approve': 'अनुमोदन',
    'action.reject': 'अस्वीकार',
    'action.assign': 'स्वयंसेवक असाइन करें',
    'action.cancel': 'रद्द करें',
    'action.save': 'सेव करें',
    'action.delete': 'हटाएं',
    'action.edit': 'संपादित करें',
    'action.view': 'देखें',
    'action.logout': 'लॉगआउट',
    'action.login': 'लॉगिन',
    'action.submit': 'जमा करें',
    'action.close': 'बंद करें',
    
    // Status Labels
    'status.pending': 'समीक्षा लंबित',
    'status.approved': 'अनुमोदित',
    'status.rejected': 'अस्वीकृत',
    'status.assigned': 'असाइन किया गया',
    'status.inTransit': 'ट्रांजिट में',
    'status.completed': 'पूर्ण',
    'status.active': 'सक्रिय',
    'status.inactive': 'निष्क्रिय',
    'status.suspended': 'निलंबित',
    
    // Safety Labels
    'safety.highRisk': 'उच्च जोखिम',
    'safety.mediumRisk': 'मध्यम जोखिम',
    'safety.lowRisk': 'कम जोखिम',
    'safety.unknown': 'अज्ञात',
    'safety.score': 'सुरक्षा स्कोर',
    'safety.guidelines': 'खाद्य सुरक्षा दिशानिर्देश',
    'safety.alerts': 'सुरक्षा अलर्ट',
    
    // Time & Urgency
    'time.expired': 'समाप्त हो गया',
    'time.hoursLeft': 'घंटे बचे',
    'time.minutesLeft': 'मिनट बचे',
    'urgency.high': 'उच्च',
    'urgency.medium': 'मध्यम',
    'urgency.low': 'कम',
    'urgency.urgent': 'तत्काल',
    
    // Food Categories
    'food.prepared': 'तैयार/पका हुआ भोजन',
    'food.raw': 'कच्चा भोजन (मांस, डेयरी, उत्पाद)',
    'food.packaged': 'पैकेज्ड/प्रोसेसड भोजन',
    'food.hot': 'गर्म (60°C से ऊपर)',
    'food.cold': 'ठंडा (4°C से नीचे)',
    'food.frozen': 'जमा हुआ (-18°C से नीचे)',
    'food.ambient': 'कमरे का तापमान',
    
    // Organization Types
    'org.restaurant': 'रेस्तरां',
    'org.eventVenue': 'इवेंट स्थल',
    'org.groceryStore': 'किराना स्टोर',
    'org.individual': 'व्यक्तिगत',
    'org.catering': 'कैटरिंग सेवा',
    'org.other': 'अन्य',
    
    // Language Names
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.arabic': 'العربية',
    'lang.spanish': 'Español',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.hindi': 'हिन्दी',
    'lang.portuguese': 'Português'
  },
  
  pt: {
    // Header & Navigation
    'nav.about': 'Sobre',
    'nav.impact': 'Impacto',
    'nav.howItWorks': 'Como funciona',
    'nav.volunteer': 'Portal do voluntário',
    'nav.admin': 'Admin',
    'nav.backToHome': 'Voltar ao início',
    
    // Hero Section
    'hero.title': 'Conectar a lacuna entre',
    'hero.surplus': 'Excedente',
    'hero.and': 'e',
    'hero.need': 'Necessidade',
    'hero.subtitle': 'Junte-se à nossa missão humanitária para reduzir o desperdício de alimentos e apoiar comunidades vulneráveis. Cada doação faz a diferença na vida de alguém.',
    'hero.donateNow': 'Doar comida agora',
    'hero.learnMore': 'Saber mais',
    
    // About Section
    'about.title': 'Nossa missão',
    'about.subtitle': 'Dedicamo-nos a criar um mundo onde nenhum alimento seja desperdiçado enquanto as pessoas passam fome. Nossa abordagem orientada por tecnologia conecta doadores de alimentos com aqueles que precisam.',
    'about.globalImpact': 'Impacto global',
    'about.globalImpactDesc': 'Operando em várias cidades, salvamos milhões de refeições que de outra forma teriam sido desperdiçadas.',
    'about.safeReliable': 'Seguro e confiável',
    'about.safeReliableDesc': 'Nossa plataforma garante a segurança alimentar através de rastreamento rigoroso e redes de voluntários treinados.',
    'about.aiPowered': 'Eficiência com IA',
    'about.aiPoweredDesc': 'Algoritmos avançados otimizam rotas de coleta e garantem máxima eficiência.',
    
    // How It Works
    'howItWorks.title': 'Como nosso sistema funciona',
    'howItWorks.step1': '1. Relatar excedente',
    'howItWorks.step1Desc': 'Restaurantes e empresas relatam facilmente alimentos disponíveis através de nossa plataforma intuitiva.',
    'howItWorks.step2': '2. Coleta inteligente',
    'howItWorks.step2Desc': 'Nosso sistema de IA otimiza rotas e designa voluntários treinados para coleta eficiente.',
    'howItWorks.step3': '3. Impacto comunitário',
    'howItWorks.step3Desc': 'Os alimentos chegam aos necessitados enquanto reduzem o desperdício.',
    
    // Stats Section
    'stats.title': 'Nosso impacto comunitário',
    'stats.subtitle': 'Métricas em tempo real mostrando a diferença que estamos fazendo juntos na redução do desperdício e alimentação de comunidades.',
    'stats.mealsRescued': 'Refeições salvas',
    'stats.peopleFed': 'Pessoas alimentadas',
    'stats.partnerLocations': 'Locais parceiros',
    'stats.co2Saved': 'CO₂ economizado',
    'stats.successRate': 'Taxa de sucesso',
    'stats.avgResponse': 'Resposta média',
    'stats.thisMonth': 'Este mês',
    'stats.familiesSupported': 'Famílias apoiadas',
    'stats.activeDonors': 'Doadores ativos',
    'stats.environmentalImpact': 'Impacto ambiental',
    'stats.collectionEfficiency': 'Eficiência de coleta',
    'stats.pickupTime': 'Tempo de coleta',
    
    // Login Forms
    'login.adminPortal': 'Portal do administrador',
    'login.managementSystem': 'Sistema de gestão FoodBank',
    'login.username': 'Nome de usuário',
    'login.password': 'Senha',
    'login.signIn': 'Entrar no painel',
    'login.demoCredentials': 'Credenciais de demonstração',
    'login.volunteerAccess': 'Acesso de voluntários',
    'login.volunteerIdentifier': 'Identificador de voluntário',
    'login.enterIdEmail': 'Digite seu ID, email ou nome',
    'login.accessDashboard': 'Acessar painel',
    'login.quickAccess': 'Acesso rápido',
    'login.demoAccess': 'Acesso demo - Experimente estes',
    
    // Donation Form
    'donation.title': 'Enviar doação de alimentos',
    'donation.basicInfo': 'Informações básicas',
    'donation.foodSafety': 'Segurança alimentar',
    'donation.donorName': 'Nome do doador',
    'donation.organizationType': 'Tipo de organização',
    'donation.foodType': 'Tipo de alimento',
    'donation.quantity': 'Quantidade estimada',
    'donation.bestBefore': 'Melhor antes de',
    'donation.contactPhone': 'Telefone de contato',
    'donation.pickupAddress': 'Endereço de coleta',
    'donation.storageConditions': 'Condições de armazenamento',
    'donation.foodCategory': 'Categoria de alimento',
    'donation.preparationTime': 'Tempo de preparação/cozimento',
    'donation.currentTemp': 'Temperatura atual (se conhecida)',
    'donation.allergens': 'Informações sobre alérgenos',
    'donation.handlingNotes': 'Notas de manuseio',
    'donation.additionalInstructions': 'Instruções adicionais',
    'donation.submit': 'Enviar doação',
    'donation.next': 'Próximo: Segurança alimentar',
    'donation.back': 'Voltar',
    'donation.thankYou': 'Obrigado!',
    'donation.successMessage': 'Sua doação foi enviada com sucesso. Nossa equipe entrará em contato em breve.',
    
    // Dashboard
    'dashboard.overview': 'Visão geral do painel',
    'dashboard.activeDonations': 'Doações ativas',
    'dashboard.foodSafetyTracking': 'Rastreamento de segurança alimentar',
    'dashboard.volunteerManagement': 'Gestão de voluntários',
    'dashboard.inventoryManagement': 'Gestão de estoque',
    'dashboard.analytics': 'Análises e relatórios',
    'dashboard.aiAssistant': 'Assistente IA',
    'dashboard.totalDonations': 'Total de doações',
    'dashboard.pendingReview': 'Pendente de revisão',
    'dashboard.activeCollections': 'Coletas ativas',
    'dashboard.completedToday': 'Concluído hoje',
    'dashboard.urgentAlerts': 'Alertas urgentes',
    'dashboard.safetyAlerts': 'Alertas de segurança',
    'dashboard.highRiskItems': 'Itens de alto risco',
    
    // Volunteer Dashboard
    'volunteer.dashboard': 'Painel do voluntário',
    'volunteer.welcome': 'Bem-vindo',
    'volunteer.newAssignments': 'Novas atribuições',
    'volunteer.activeCollections': 'Coletas ativas',
    'volunteer.completedToday': 'Concluído hoje',
    'volunteer.startCollection': 'Iniciar coleta',
    'volunteer.markCompleted': 'Marcar como concluído',
    'volunteer.newAssignment': 'NOVA ATRIBUIÇÃO',
    'volunteer.highPriority': 'ALTA PRIORIDADE',
    'volunteer.safetyReminder': 'Lembrete de segurança alimentar',
    'volunteer.safetyProtocol': 'Você tem itens de alto risco atribuídos. Por favor, siga os protocolos de segurança.',
    
    // Common Actions
    'action.approve': 'Aprovar',
    'action.reject': 'Rejeitar',
    'action.assign': 'Atribuir voluntário',
    'action.cancel': 'Cancelar',
    'action.save': 'Salvar',
    'action.delete': 'Excluir',
    'action.edit': 'Editar',
    'action.view': 'Ver',
    'action.logout': 'Sair',
    'action.login': 'Entrar',
    'action.submit': 'Enviar',
    'action.close': 'Fechar',
    
    // Status Labels
    'status.pending': 'Pendente de revisão',
    'status.approved': 'Aprovado',
    'status.rejected': 'Rejeitado',
    'status.assigned': 'Atribuído',
    'status.inTransit': 'Em trânsito',
    'status.completed': 'Concluído',
    'status.active': 'Ativo',
    'status.inactive': 'Inativo',
    'status.suspended': 'Suspenso',
    
    // Safety Labels
    'safety.highRisk': 'Alto risco',
    'safety.mediumRisk': 'Risco médio',
    'safety.lowRisk': 'Baixo risco',
    'safety.unknown': 'Desconhecido',
    'safety.score': 'Pontuação de segurança',
    'safety.guidelines': 'Diretrizes de segurança alimentar',
    'safety.alerts': 'Alertas de segurança',
    
    // Time & Urgency
    'time.expired': 'Expirado',
    'time.hoursLeft': 'h restantes',
    'time.minutesLeft': 'm restantes',
    'urgency.high': 'Alto',
    'urgency.medium': 'Médio',
    'urgency.low': 'Baixo',
    'urgency.urgent': 'URGENTE',
    
    // Food Categories
    'food.prepared': 'Alimentos preparados/cozidos',
    'food.raw': 'Alimentos crus (carne, laticínios, produtos)',
    'food.packaged': 'Alimentos embalados/processados',
    'food.hot': 'Quente (Acima de 60°C)',
    'food.cold': 'Refrigerado (Abaixo de 4°C)',
    'food.frozen': 'Congelado (Abaixo de -18°C)',
    'food.ambient': 'Temperatura ambiente',
    
    // Organization Types
    'org.restaurant': 'Restaurante',
    'org.eventVenue': 'Local de eventos',
    'org.groceryStore': 'Mercearia',
    'org.individual': 'Individual',
    'org.catering': 'Serviço de catering',
    'org.other': 'Outro',
    
    // Language Names
    'lang.english': 'English',
    'lang.french': 'Français',
    'lang.arabic': 'العربية',
    'lang.spanish': 'Español',
    'lang.german': 'Deutsch',
    'lang.chinese': '中文',
    'lang.hindi': 'हिन्दी',
    'lang.portuguese': 'Português'
  }
};

// RTL languages
const rtlLanguages: Language[] = ['ar'];

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem('foodbank-language') as Language;
    return saved && Object.keys(translations).includes(saved) ? saved : 'en';
  });

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('foodbank-language', language);
    
    // Update document direction for RTL languages
    document.documentElement.dir = rtlLanguages.includes(language) ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  const isRTL = rtlLanguages.includes(currentLanguage);

  // Set initial direction and language
  React.useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage, isRTL]);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      isRTL
    }}>
      {children}
    </LanguageContext.Provider>
  );
};