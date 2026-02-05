# Legal Pages Summary

## Overview

This document provides a comprehensive summary of all legal pages created for RelivChats web application. These pages combine Razorpay's useful policy content with RelivChats-specific requirements for AI processing, GDPR/CCPA compliance, and SaaS delivery.

---

## 1. Privacy Policy (`/privacy`)

**File:** `/src/app/privacy/page.tsx`

### Purpose
Comprehensive privacy policy that explains how RelivChats collects, uses, stores, and protects user data while maintaining GDPR and CCPA compliance.

### Key Sections

#### Information Collection
- **Account Information:** Name, email, profile data collected via Clerk authentication
- **Chat Upload Data:** WhatsApp exports, message content, metadata, and statistics
- **Payment Information:** Billing details (payment cards handled by Razorpay/Stripe, never stored by us)
- **Usage Data:** Analytics, device information, cookies

#### How We Use Information
- Service delivery (chat analysis, AI insights generation)
- Account management (payment processing, credit balance)
- Platform improvement (anonymized analytics)
- Communication (service updates, optional marketing)
- Legal compliance

#### AI Processing & Third-Party Services
- **Google Gemini AI:** Processes chat data to generate insights
  - Enterprise-grade encryption
  - Not used to train Google's models
  - Not retained by Google after processing
- **Qdrant Vector Database:** Stores encrypted message vectors for similarity search
  - Deleted when user deletes chat/account
- **Clerk Authentication:** SOC 2 Type II compliant
- **Razorpay/Stripe:** Payment processing (no access to chat data)

#### Data Storage & Security
- **Encryption:** TLS 1.3 in transit, AES-256 at rest
- **Access Controls:** Role-based with MFA
- **Infrastructure:** Enterprise cloud with 99.9% uptime SLA
- **Regular Audits:** Security assessments and vulnerability scans
- **Backup & Recovery:** Automated daily backups

#### Data Retention
- **90 days:** Inactive chat data archived/deleted
- **30 days:** Account deletion processing time
- **7 years:** Financial records (tax/legal compliance)

#### Your Rights (GDPR/CCPA)
- **Access & Export:** Download all personal data in JSON format
- **Delete:** Request complete account and data deletion
- **Rectify:** Correct inaccurate personal information
- **Restrict Processing:** Limit data usage while maintaining account
- **Object:** Opt-out of marketing and non-essential processing
- **Data Portability:** Transfer data to another service

Contact: privacy@relivchats.com

#### Cookies & Tracking
- Essential cookies (Clerk auth, session management)
- Analytics cookies (usage patterns, opt-out available)
- Preference cookies (settings)
- See detailed Cookie Policy

#### Third-Party Disclosure
- **We do NOT sell data**
- Share only with necessary service providers (Google, Qdrant, Clerk, Razorpay/Stripe)
- Legal requirements (court orders, government requests)
- Business transfers (mergers/acquisitions with advance notice)

#### Children's Privacy
- Service not intended for users under 18
- No knowing collection of children's data
- Parents can request immediate deletion

### Design Features
- Table of contents sidebar with jump links
- Trust badges (Encryption, GDPR Compliance, Transparency)
- Visual hierarchy with icons and colored sections
- Mobile responsive layout
- SEO optimized metadata

---

## 2. Terms of Service (`/terms`)

**File:** `/src/app/terms/page.tsx`

### Purpose
Legally binding agreement between users and RelivChats outlining service usage, acceptable behavior, payment terms, and liability limitations.

### Key Sections

#### Acceptance of Terms
Legal agreement binding upon account creation or service use

#### Service Description
- **Free Features:** Chat uploads, basic statistics (message/word count, emojis, activity patterns), 50 free credits
- **Paid Features:** AI-powered insights by category, deep relationship analysis, shareable cards

#### Account Registration
Requirements:
1. Must be 18+ years old
2. Provide accurate information
3. Maintain account security
4. Report unauthorized access

#### Credit System & Pricing
- **How Credits Work:** Digital currency for unlocking AI insights (50-100 credits per category)
- **Non-transferable and non-refundable** (except service failures)
- **Credits don't expire** while account active
- **Current Pricing:** $2.99 to $14.99 (subject to change)

#### Acceptable Use Policy
**Prohibited Activities:**
- Illegal content upload
- Non-consensual chat uploads (without participant permission)
- Harmful content (child exploitation, harassment, threats, hate speech)
- System abuse (reverse engineering, hacking)
- Fraud (stolen payment methods, chargebacks for delivered services)
- Reselling insights without permission

**Consequences:** Account suspension/termination without refund

#### AI-Generated Insights Disclaimer
**CRITICAL WARNINGS:**
- Informational only (not professional advice)
- AI may contain errors, biases, or misinterpretations
- Limited context (text-only, no tone/non-verbal cues)
- Use at your own risk
- Consult licensed professionals for serious issues

#### Intellectual Property
- **Our Content:** We own platform software, design, trademarks
- **Your Content:** You retain rights to uploaded chats
- **License to Us:** Limited license to process, store, and improve services (ends when chat/account deleted)
- **Generated Insights:** Personal non-commercial use allowed; commercial use requires permission

#### Payment Terms
- **Processing:** Via Razorpay or Stripe (secure, encrypted)
- **Payment Methods:** Credit cards, debit cards, UPI, net banking
- **Failures:** Common reasons (insufficient funds, incorrect details, bank decline, 3D Secure failure)
- **Taxes:** GST/VAT/sales tax calculated at checkout
- **Refunds:** See Refund Policy

#### Termination
- **Your Rights:** Delete account anytime (data deleted within 30 days)
- **Our Rights:** Suspend/terminate for Terms violations, fraud, legal requirements, 180+ days inactivity
- **No Refunds:** Unused credits forfeited on termination

#### Warranty Disclaimer
Service provided "AS IS" and "AS AVAILABLE" without warranties:
- No guarantee of merchantability or fitness
- No guarantee of AI accuracy or reliability
- No guarantee of uninterrupted/error-free operation
- No guarantee of freedom from bugs/viruses

#### Limitation of Liability
RelivChats NOT liable for:
- Indirect, incidental, or consequential damages
- Loss of profits, revenue, data, or opportunities
- Relationship damage or emotional distress
- Security breaches
- Service interruptions or AI errors

**Maximum Liability Cap:** Amount paid in last 12 months or $100 USD (whichever greater)

#### Governing Law & Jurisdiction
- **Jurisdiction:** India (Ratlam, Madhya Pradesh courts)
- **Governing Law:** Indian law
- International users consent to Indian jurisdiction

#### Changes to Terms
- Updates effective immediately upon posting
- Material changes notified via email and platform notice
- Continued use = acceptance

### Design Features
- Table of contents sidebar
- Color-coded warning sections (red for prohibited, yellow for AI disclaimer)
- Visual hierarchy with icons
- Mobile responsive
- Clear formatting for legal readability

---

## 3. Refund & Cancellation Policy (`/refunds`)

**File:** `/src/app/refunds/page.tsx`

### Purpose
Transparent refund policy for digital credits, explaining when refunds are granted and the process for requesting them.

### Key Sections

#### Policy Overview
- **Processing Time:** 3-5 days
- **Approach:** Fair, customer-first
- **Full Refunds:** Available for service failures

#### Digital Credits Refund Policy
**General Rule:** Digital credits are **non-refundable** (immediately available for use)

**When You CAN Get a Refund:**
1. **Payment Processing Errors:** Double charges, credits not added after payment
2. **Service Failures:** AI insight generation failed (technical issues our fault), credits deducted without insights
3. **Accidental Purchase:** Within 24 hours, no credits used
4. **Platform Malfunction:** Extended downtime (48+ hours) preventing credit use

**When You CANNOT Get a Refund:**
1. **Credits Already Used:** Even partially spent
2. **Dissatisfaction with AI Insights:** Quality/accuracy complaints (see AI Disclaimer)
3. **Change of Mind:** After 24-hour window
4. **Account Termination:** For Terms violations

#### Insight Generation Failures
- **Automatic Credit Restoration:** Within 10 minutes if AI processing fails
- **Technical Failures (Our Fault):** Full credit refund (server errors, AI unavailability, database issues)
- **User-Side Issues:** Case-by-case basis (invalid format, corrupted data, network disconnection)

#### Partial Refunds
**Eligibility:**
1. Large credit package (250+ credits)
2. Less than 20% used
3. Legitimate reason (platform incompatibility, emergency)
4. Request within 14 days

**Calculation:** Unused credits minus processing fee

#### Refund Processing Timeline
- **1-2 Days:** Request review and eligibility verification
- **3-5 Days:** Refund processing to original payment method
- **5-10 Days:** Bank processing time (varies by institution)

**Total Time:** 3-15 business days from approval to account credit

#### Chargeback Policy
**Please Contact Us First!** Chargebacks hurt small businesses.

**Process:**
1. **Contact Us First:** Email for 24-48 hour resolution
2. **Investigation:** We provide evidence to bank (transaction records, service delivery proof)
3. **Fraudulent Chargebacks:** May result in account suspension and legal action

**Legitimate Chargebacks:** Understood for unauthorized transactions/fraud; please notify us for security investigation

#### How to Request a Refund
**Required Information:**
- Registered email address
- Transaction ID or receipt
- Date of purchase
- Reason for refund
- Screenshots/error messages (if applicable)

**Contact Methods:**
- **Email:** mayankpatidar275@gmail.com (24-48 hour response)
- **Phone:** +91 8959050275 (Mon-Sat, 10 AM - 6 PM IST)

#### Cancellation Policy
- **No Subscriptions:** Pay-as-you-go only (no recurring charges to cancel)
- **Account Deletion:** Available anytime
  - All data deleted within 30 days
  - Unused credits forfeited (no refund)
  - Transaction history retained 7 years (legal/tax)

### Design Features
- Visual timeline for refund processing
- Color-coded sections (green = yes, red = no)
- Clear eligibility criteria
- Contact information prominently displayed
- Mobile responsive

---

## 4. Delivery/Shipping Policy (`/shipping`)

**File:** `/src/app/shipping/page.tsx`

### Purpose
Clarify that RelivChats is a 100% digital SaaS platform with no physical product shipping. Created for payment processor compliance requirements.

### Key Sections

#### 100% Digital Service Notice
- Cloud-based SaaS platform
- No physical goods manufactured, sold, or shipped
- Page exists for payment processor compliance only

#### How Service is Delivered
- **Instant Digital Access:** Immediate upon account creation/credit purchase
- **Cloud-Based Platform:** Access from any device with internet
- **Data Export:** Download insights as PDF/JSON

#### Service Availability
- **24/7:** Platform access year-round (except scheduled maintenance)
- **<5 Minutes:** AI insight generation time
- **Instant:** Credit delivery upon payment
- **Global:** Worldwide access (no geographic restrictions)

#### What You Receive
- **Free Account:** 50 credits, unlimited uploads, free statistics, dashboard access
- **Credit Purchase:** Digital credits, email receipt, no expiration
- **AI Insights:** Detailed analysis, shareable cards, permanent access

#### Related Policies
Links to Refund Policy, Terms of Service, Privacy Policy

### Design Features
- Clear "digital only" messaging
- Service availability metrics
- Contact information for technical issues
- Mobile responsive

---

## 5. Contact Page (`/contact`)

**File:** `/src/app/contact/page.tsx`

### Purpose
Professional contact page with form submission, multiple contact methods, and support categories.

### Key Features

#### Contact Form
**Fields:**
- Name (required)
- Email (required)
- Category dropdown (required):
  - General Inquiry
  - Technical Support
  - Billing & Payments
  - Refund Request
  - Privacy & Data
  - Feature Request
  - Report a Bug
  - Partnership/Business
- Subject (required)
- Message (required)

**Functionality:**
- Form validation
- Toast notification on submission
- Loading state during submission

#### Contact Information
- **Email:** mayankpatidar275@gmail.com
- **Phone:** +91 8959050275
- **Address:** Mayank Patidar, Dantodiya Village, Ratlam, MP 457441, India
- **Support Hours:** Mon-Sat, 10 AM - 6 PM IST (Email 24/7)

#### Privacy Inquiries
Dedicated section for data protection questions:
- **Email:** privacy@relivchats.com

#### Response Time
- General Inquiries: 24-48 hours
- Technical Support: 12-24 hours
- Urgent Issues: 4-12 hours

#### Common Topics
Quick help categories with icons:
- Technical Issues
- Billing Support
- Privacy Concerns
- General Questions

### Design Features
- Professional layout
- Category-based form
- Multiple contact methods
- Response time transparency
- Mobile responsive

---

## 6. Cookie Policy (`/cookies`)

**File:** `/src/app/cookies/page.tsx`

### Purpose
GDPR-compliant cookie policy explaining all cookies used by RelivChats and how users can manage them.

### Key Sections

#### What Are Cookies
- Small text files stored on devices
- Remember preferences and improve experience
- First-party and third-party cookies

#### Types of Cookies Used

##### Essential Cookies (Required)
**Authentication & Session:**
- Clerk auth cookies (secure login)
- Session tokens (maintain logged-in state)
- CSRF protection
- Duration: Session or up to 7 days

**Security & Fraud Prevention:**
- Detect fraudulent activity
- Protect against bots
- Duration: Session or up to 90 days

**Load Balancing:**
- Route requests for optimal performance
- Duration: Session

##### Functional Cookies (Optional)
**Preferences & Settings:**
- Language preference
- Dashboard layout
- Cookie consent choices
- Duration: Up to 1 year

##### Analytics Cookies (Optional)
**Usage Analytics:**
- Pages visited, features used
- Time spent, navigation paths
- Device type, browser, screen resolution
- Provider: Google Analytics (anonymized IPs)
- Duration: Up to 2 years

**Performance Monitoring:**
- Page load times, errors
- API response times
- Duration: Up to 90 days

##### Marketing Cookies
**Currently NOT Used**
- No third-party advertising
- No retargeting cookies
- Will request consent if this changes

#### Third-Party Cookies
- **Clerk:** Authentication cookies
- **Razorpay/Stripe:** Payment security cookies
- **Analytics Providers:** Usage tracking (anonymized)

#### Managing Cookies

**Cookie Consent Banner:**
- Accept all cookies
- Accept only essential cookies
- Customize by category

**Browser Settings:**
- Chrome: Settings → Privacy → Cookies
- Firefox: Privacy & Security → Cookies
- Safari: Preferences → Privacy
- Edge: Privacy, search, and services → Cookies

**Important:** Blocking essential cookies prevents login and core features

#### GDPR Compliance
- Obtain explicit consent for non-essential cookies
- Provide control to withdraw consent
- Transparency about cookie purposes
- Data minimization

### Design Features
- Color-coded cookie categories (green = essential, blue = functional, purple = analytics)
- Browser-specific instructions
- Links to third-party privacy policies
- Mobile responsive

---

## Implementation Details

### Routing Structure
All pages use Next.js App Router:
```
/src/app/
├── privacy/page.tsx
├── terms/page.tsx
├── refunds/page.tsx
├── shipping/page.tsx
├── contact/page.tsx
└── cookies/page.tsx
```

### Design System
All pages use consistent styling from the RelivChats design system:
- **Colors:** `primary` (#8b5cf6), `primary-hover` (#7c3aed), `accent-pink` (#f9a8d4)
- **Typography:** Geist Sans font family
- **Components:** Lucide React icons, Tailwind CSS utilities
- **Layout:** Gradient headers, rounded corners, shadow effects
- **Animations:** Floating blobs, smooth transitions

### Common Features
Every page includes:
- SEO-optimized metadata (title, description)
- Mobile-responsive design
- Accessibility features (semantic HTML, ARIA labels)
- "Last Updated" date
- Related policy links
- Contact information in footer section
- Consistent visual hierarchy

### Footer Integration
Legal pages are linked in the Footer component:
```tsx
legal: [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Refund Policy", href: "/refunds" },
  { name: "Delivery Policy", href: "/shipping" },
  { name: "Cookie Policy", href: "/cookies" },
  { name: "Contact Us", href: "/contact" },
]
```

---

## Compliance Checklist

### GDPR Compliance ✅
- [x] Clear privacy notice
- [x] Lawful basis for processing (consent, contract, legitimate interest)
- [x] User rights explained (access, delete, rectify, restrict, object, portability)
- [x] Data retention periods specified
- [x] Third-party processors disclosed
- [x] Cookie consent mechanism
- [x] Privacy contact email (privacy@relivchats.com)

### CCPA Compliance ✅
- [x] Categories of personal information collected
- [x] Purpose of data collection
- [x] Third parties data is shared with
- [x] Right to know, delete, and opt-out
- [x] No sale of personal data statement

### Payment Processor Requirements ✅
- [x] Privacy Policy
- [x] Terms of Service
- [x] Refund/Cancellation Policy
- [x] Contact Information
- [x] Shipping/Delivery Policy (for SaaS)

### Legal Requirements ✅
- [x] Warranty disclaimer
- [x] Limitation of liability
- [x] Governing law and jurisdiction
- [x] Intellectual property rights
- [x] Acceptable use policy
- [x] Age restriction (18+)
- [x] AI-generated content disclaimer

---

## Maintenance & Updates

### Regular Review Schedule
- **Quarterly:** Review policies for accuracy and completeness
- **When Updated:** Services, features, third-party providers, legal requirements
- **Annual:** Comprehensive legal review

### Update Process
1. Update "Last Updated" date
2. Notify users via email for material changes
3. Update related documentation
4. Archive previous version for records

### Contact for Legal Questions
- **Privacy:** privacy@relivchats.com
- **General:** mayankpatidar275@gmail.com
- **Phone:** +91 8959050275

---

## Summary

All six legal pages have been created with:
1. **Complete Content:** Combining Razorpay's useful information with RelivChats-specific AI processing, chat upload, and GDPR requirements
2. **Professional Design:** Consistent with RelivChats branding and design system
3. **GDPR/CCPA Compliant:** Full user rights, transparency, and consent mechanisms
4. **SEO Optimized:** Proper metadata, semantic HTML, mobile responsive
5. **User-Friendly:** Clear language, visual hierarchy, easy navigation
6. **Production-Ready:** Can be deployed immediately

These pages provide comprehensive legal coverage for RelivChats while maintaining a professional, trustworthy appearance that builds user confidence in the platform.
