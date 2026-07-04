/**
 * Environment-based constants and configuration
 * These values are loaded from .env.local and can be overridden per environment
 */

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export const RECAPTCHA = {
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
  secretKey: process.env.RECAPTCHA_SECRET_KEY || "",
  enabled: Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
};

export const APP_CONFIG = {
  environment: process.env.NEXT_PUBLIC_APP_ENV || "development",
  apiCacheMode: process.env.NEXT_PUBLIC_API_CACHE_MODE || "no-store",
  isDevelopment: process.env.NEXT_PUBLIC_APP_ENV === "development",
  isProduction: process.env.NEXT_PUBLIC_APP_ENV === "production",
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  GLOBAL: `${STRAPI_URL}/api/global`,
  ABOUT_PAGE: `${STRAPI_URL}/api/about-page`,
  CONTACT_PAGE: `${STRAPI_URL}/api/contact-page`,
  HOME_PAGE: `${STRAPI_URL}/api/home-page`,
  NAVBAR: `${STRAPI_URL}/api/navbar`,
  FOOTER: `${STRAPI_URL}/api/footer`,
  COURSES: `${STRAPI_URL}/api/coursespages`,
  COURSES_PAGE: `${STRAPI_URL}/api/courses-page`,
  WELCOME_POPUP: `${STRAPI_URL}/api/welcome-popupe`,
  ENROLLMENTS: `${STRAPI_URL}/api/enrollments`,
  // Add more endpoints as needed
};

/**
 * API Query Parameters for Strapi populate requests
 */
export const API_POPULATE = {
  FULL: "*",
  NAVBAR: "*",
  FOOTER: "logo&populate[link_group][populate][link_groups]=*&populate[ContactInfo]=*",
};