// Configuration file for TN Happy Kids Playschool App

// API Configuration
export const API_URL = 'http://192.168.1.100/lastchapter';
export const API_TIMEOUT = 30000; // 30 seconds

// App Configuration
export const APP_NAME = 'TN Happy Kids';
export const APP_VERSION = '1.0.0';
export const APP_BUILD = 1;

// Environment Configuration
export const ENVIRONMENT = __DEV__ ? 'development' : 'production';
export const DEBUG_MODE = __DEV__;

// Storage Keys
export const STORAGE_KEYS = {
  USER_DATA: 'userData',
  USER_ROLE: 'userRole',
  SESSION_TOKEN: 'sessionToken',
  PUSH_TOKEN: 'pushToken',
  CUSTOM_API_URL: 'customApiUrl',
  THEME_PREFERENCE: 'themePreference',
  LANGUAGE_PREFERENCE: 'languagePreference',
  ONBOARDING_COMPLETED: 'onboardingCompleted',
};

// Role Configuration
export const USER_ROLES = {
  ADMIN: 'Admin',
  ADMINISTRATOR: 'Administrator',
  FRANCHISEE: 'Franchisee',
  STUDENT: 'Student',
  TEACHER: 'Teacher',
  TUITION_STUDENT: 'Tuition Student',
  TUITION_TEACHER: 'Tuition Teacher',
  CAPTAIN: 'Captain',
  DEVELOPER: 'Developer',
  PARENT: 'Parent',
  DRIVER: 'Driver',
};

// Route Configuration
export const ROUTES = {
  LOGIN: '/login',
  ADMIN_HOME: '/(admin)/home',
  FRANCHISEE_HOME: '/(franchisee)/home',
  STUDENT_HOME: '/(student)/home',
  TEACHER_HOME: '/(teacher)/home',
  TUITION_STUDENT_HOME: '/(tuition-student)/home',
  TUITION_TEACHER_HOME: '/(tuition-teacher)/home',
  CAPTAIN_HOME: '/(captain)/home',
  DEVELOPER_HOME: '/(developer)/home',
};

// Feature Flags
export const FEATURES = {
  PUSH_NOTIFICATIONS: true,
  OFFLINE_MODE: false,
  BIOMETRIC_AUTH: false,
  DARK_MODE: true,
  MULTI_LANGUAGE: false,
  LIVE_CHAT: true,
  VIDEO_CALLS: false,
  PAYMENT_GATEWAY: true,
  GPS_TRACKING: true,
};

// Theme Configuration
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

// Language Configuration
export const LANGUAGES = {
  ENGLISH: 'en',
  TAMIL: 'ta',
  HINDI: 'hi',
};

// Notification Configuration
export const NOTIFICATION_TYPES = {
  ATTENDANCE: 'attendance',
  HOMEWORK: 'homework',
  FEE_REMINDER: 'fee_reminder',
  ACTIVITY: 'activity',
  MESSAGE: 'message',
  ANNOUNCEMENT: 'announcement',
  EMERGENCY: 'emergency',
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['jpg', 'jpeg', 'png', 'gif'],
  ALLOWED_VIDEO_TYPES: ['mp4', 'mov', 'avi'],
  ALLOWED_DOCUMENT_TYPES: ['pdf', 'doc', 'docx', 'txt'],
};

// Cache Configuration
export const CACHE_CONFIG = {
  TTL: 5 * 60 * 1000, // 5 minutes
  MAX_ENTRIES: 100,
};

// Network Configuration
export const NETWORK_CONFIG = {
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  CONNECTION_TIMEOUT: 10000, // 10 seconds
};

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// Date/Time Configuration
export const DATE_TIME = {
  DATE_FORMAT: 'DD/MM/YYYY',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'DD/MM/YYYY HH:mm',
  TIMEZONE: 'Asia/Kolkata',
};

// School Configuration
export const SCHOOL_CONFIG = {
  ACADEMIC_YEAR_START: 'June',
  ACADEMIC_YEAR_END: 'May',
  WORKING_DAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SCHOOL_TIMINGS: {
    START: '09:00',
    END: '16:00',
  },
  BREAK_TIMINGS: {
    MORNING: '10:30-11:00',
    LUNCH: '12:30-13:30',
  },
};

// Clear API URL cache function
let apiUrlCache = null;

export const clearApiUrlCache = () => {
  apiUrlCache = null;
};

export const getApiUrlFromCache = () => {
  return apiUrlCache;
};

export const setApiUrlCache = (url) => {
  apiUrlCache = url;
};

// Default export with all configurations
export default {
  API_URL,
  API_TIMEOUT,
  APP_NAME,
  APP_VERSION,
  APP_BUILD,
  ENVIRONMENT,
  DEBUG_MODE,
  STORAGE_KEYS,
  USER_ROLES,
  ROUTES,
  FEATURES,
  THEME,
  LANGUAGES,
  NOTIFICATION_TYPES,
  UPLOAD_CONFIG,
  CACHE_CONFIG,
  NETWORK_CONFIG,
  VALIDATION,
  DATE_TIME,
  SCHOOL_CONFIG,
  clearApiUrlCache,
  getApiUrlFromCache,
  setApiUrlCache,
};
