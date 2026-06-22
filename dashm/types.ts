
export interface Location {
  latitude: number;
  longitude: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'entrée' | 'plat' | 'boisson' | 'dessert';
  isAvailable: boolean;
  stock?: number;
  lowStockThreshold?: number;
}

export type BusinessType = 'restaurant' | 'bar' | 'terrasse' | 'snack';

export interface Promotion {
  id: string;
  restaurantId: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption?: string;
  createdAt: string;
}

export type Currency = 'USD' | 'CDF';

export type MobileMoneyNetwork = 'mpesa' | 'airtel' | 'orange';

export interface RestaurantPaymentConfig {
  acceptCash: boolean;
  acceptMobileMoney: boolean;
  acceptMoneyFusion?: boolean;
  mpesaNumber?: string;
  airtelNumber?: string;
  orangeNumber?: string;
}

export interface Restaurant {
  id: string;
  ownerId: string; // Lien avec le compte entreprise
  owner_id?: string;
  type: BusinessType;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  city: string; // Ville de l'établissement
  currency: Currency; // Devise par défaut
  exchangeRate?: number; // Taux de change (USD -> CDF) spécifique à l'établissement
  displayCurrencyMode?: 'dual' | 'usd' | 'cdf'; // Comment afficher le prix (Duo, Uniquement USD, Uniquement CDF)
  isOpen: boolean;
  is_open?: boolean;
  isOnline?: boolean;
  isActive?: boolean;
  is_active?: boolean;
  rating: number; // 1-5
  reviewCount: number;
  preparationTime: number; // in minutes
  estimatedDeliveryTime: number; // in minutes (Temps moyen de livraison)
  deliveryAvailable: boolean;
  coverImage: string;
  cover_image?: string;
  phoneNumber?: string; // Ajout pour l'appel
  phone_number?: string;
  menu: MenuItem[];
  promotions?: Promotion[]; // Stories actives
  paymentConfig?: RestaurantPaymentConfig;
  isVerified?: boolean; // Badge de vérification
  verificationRequested?: boolean; // Demande de vérification envoyée par l'admin
  subscriptionTier?: 'free' | 'basic' | 'premium' | 'enterprise'; // Niveau d'abonnement
  subscriptionStatus?: 'active' | 'past_due' | 'canceled' | 'incomplete' | 'expired';
  subscriptionEndDate?: string;
  createdAt?: string; // Date de création du compte
  settings?: SecuritySettings;
  deliveryRadius?: number;
  deliveryFee?: number;
  staff?: any[];
  // Verification fields
  verificationStatus?: 'unverified' | 'pending' | 'verified' | 'rejected';
  verificationDocs?: {
    idCardUrl?: string;
    registryNumber?: string;
  };
  verificationPaymentStatus?: 'unpaid' | 'paid';
  // Calculated fields
  distance?: number; // km
  timeWalking?: number; // minutes
  timeMoto?: number; // minutes
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  isUrgent?: boolean;
  fulfillmentMode?: 'delivery' | 'pickup';
  paymentMethod?: PaymentMethod;
  paymentNetwork?: MobileMoneyNetwork;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  paymentProof?: string;
  customerName?: string;
  customerPhone?: string;
  deliveryLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
}

export type ViewMode = 'list' | 'map' | 'restaurant_detail' | 'checkout' | 'success' | 'orders' | 'settings' | 'delivery_onboarding';

export interface UserState {
  location: Location | null;
  locationError: string | null;
  loadingLocation: boolean;
}

// Auth Types
export type UserRole = 'client' | 'business' | 'superadmin' | 'guest' | 'staff' | 'delivery';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  city: string; // Ville de résidence
  phoneNumber?: string; // Ajout pour l'appel
  full_name?: string;
  last_seen?: string;
  lastSeen?: string;
  businessId?: string; // Si c'est un compte business ou staff
  deliveryApplicationStatus?: 'none' | 'pending' | 'approved' | 'rejected'; // Statut de la demande pour devenir livreur
  staffRole?: 'admin' | 'manager' | 'cook' | 'delivery' | 'manager:menu' | 'manager:orders' | 'manager:marketing' | 'manager:stats' | 'manager:all';
  settings?: SecuritySettings;
  preferences?: any;
  avatarUrl?: string; // URL de la photo de profil
  avatar_url?: string;
  deliveryInfo?: {
    vehicleType: 'moto' | 'velo' | 'voiture' | 'pieton';
    isAvailable: boolean;
    bio?: string;
    rating?: number;
    completedOrders?: number;
    address?: string;
  };
  delivery_info?: any;
}

// Order Types
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'completed' | 'cancelled';
export type PaymentMethod = 'cash' | 'mobile_money' | 'money_fusion' | 'stripe';

export interface Order {
  id: string;
  userId: string;
  user_id?: string;
  restaurantId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentNetwork?: MobileMoneyNetwork;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentProof?: string;
  totalAmount: number;
  exchangeRate?: number; // Taux de change appliqué à la commande
  isUrgent?: boolean;
  items: CartItem[];
  createdAt: string;
  deliveryLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  delivery_location?: {
    lat: number;
    lng: number;
    address: string;
  };
  delivery_instructions?: string;
  proof_url?: string;
  delivery_person_id?: string;
  delivery_acceptance_status?: 'pending' | 'accepted' | 'rejected';
  delivery_lat?: number;
  delivery_lng?: number;
  estimated_arrival_restaurant?: string;
  estimated_arrival_customer?: string;
  delivery_fee?: number;
  deliveryFee?: number;
  delivery_person?: {
    full_name: string;
    phone_number?: string;
    avatar_url?: string;
    last_seen?: string;
    delivery_info?: any;
  };
  // Optional joined fields for display
  restaurant?: {
    name: string;
    phone_number?: string;
    latitude?: number;
    longitude?: number;
    owner_id?: string;
    ownerId?: string;
    currency?: string;
    displayCurrencyMode?: string;
  };
  customer?: {
    full_name: string;
    phone_number?: string;
    email?: string;
    avatar_url?: string;
    last_seen?: string;
    delivery_info?: any;
  };
  customerName?: string;
}

// Chat Types
export interface Message {
  id: string;
  orderId: string;
  senderId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  isLocal?: boolean;
}

// App Settings Types
export type Theme = 'light' | 'dark';
export type Language = 'fr' | 'en' | 'ln'; // Français, Anglais, Lingala
export type AppFont = 'inter' | 'roboto' | 'opensans' | 'lato' | 'montserrat' | 'poppins' | 'quicksand' | 'playfair' | 'facebook';

export interface SecuritySettings {
  notifPush?: boolean;
  notifEmail?: boolean;
  notifSms?: boolean;
  twoFactorEnabled?: boolean;
  appLockEnabled?: boolean;
  appLockPin?: string;
  orderDeletionPassword?: string;
  biometricsEnabled?: boolean;
  privacyProfile?: 'public' | 'private';
  privacyStories?: 'everyone' | 'followers';
  hours?: any;
  isOnline?: boolean;
}

export interface StaffMember {
  id: string;
  restaurant_id: string;
  user_id?: string;
  name: string;
  role: 'admin' | 'manager' | 'cook' | 'delivery';
  pin_code?: string;
  created_at: string;
}

export interface AutomatedCampaign {
  id: string;
  restaurant_id: string;
  trigger_type: 'abandoned_cart' | 'dormant_30_days' | 'birthday';
  discount_percentage: number;
  is_active: boolean;
  created_at: string;
}

export interface AppSettings {
  support_email: string;
  support_phone: string;
  support_whatsapp: string;
  office_address: string;
}
