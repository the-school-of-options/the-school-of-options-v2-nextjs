# Webinar Landing Page - How to Edit

## Overview
This is a complete webinar landing page for The School of Options, built with Next.js App Router, TypeScript, and Tailwind CSS. All content and styling can be easily customized without touching the component logic.

## File Structure
```
src/app/webinar-ads1/
├── page.tsx                    # Main page component
├── content.ts                  # All copy and configuration
├── _components/                # Reusable components
│   ├── Countdown.tsx          # Countdown timer (IST timezone)
│   ├── FormCard.tsx           # Registration form with validation
│   ├── FAQAccordion.tsx       # FAQ section
│   ├── TestimonialCard.tsx    # Testimonial cards
│   ├── StatChip.tsx           # Statistics chips
│   ├── SeatMeter.tsx          # Visual seat availability meter
│   ├── StickyBar.tsx          # Sticky bottom bar
│   └── StackGroup.tsx         # Animation utilities
└── README.md                  # This file
```

## Quick Edits

### 1. Copy & Content
**File:** `content.ts`

All text content is centralized here. Edit any section:
- `hero` - Main headline and description
- `kundan` - Mentor bio and credentials
- `whyFail` - Problem/solution messaging
- `learn` - Learning outcomes
- `socialProof` - Testimonials and stats
- `faq` - Frequently asked questions
- `form` - Form labels and messages

### 2. Colors & Theme
**File:** `page.tsx` (lines 8-18)

The CSS variables are defined at the top of the page:
```css
:root {
  --ink-900: #000814;  /* Background */
  --ink-800: #001D3D;  /* Surface */
  --ink-700: #003566;  /* Cards */
  --acc-500: #FFC300;  /* Primary accent */
  --acc-400: #FFD60A;  /* Secondary accent */
  --text-100: #F5F7FA; /* Primary text */
  --text-70: rgba(245,247,250,0.7); /* Secondary text */
  --border-20: rgba(255,255,255,0.12); /* Borders */
}
```

### 3. Session Times
**File:** `Countdown.tsx` (lines 25-35)

The countdown automatically calculates next Saturday 20:00 IST. To change:
- Edit the `nextSaturday.setHours(20, 0, 0, 0)` line
- Change `20` to desired hour (24-hour format)
- Change `0` to desired minutes

### 4. Form Fields
**File:** `FormCard.tsx` (lines 120-150)

Add/remove form fields by:
1. Adding field to `FormData` interface (line 5-10)
2. Adding field to form state (line 12-17)
3. Adding validation logic (line 35-50)
4. Adding JSX input (lines 120-150)

### 5. Animations
**File:** `StackGroup.tsx`

- `staggerDelay` prop controls animation timing (default: 80ms)
- Set `prefers-reduced-motion` to disable animations
- Each `StackItem` gets `--i` CSS variable for delay calculation

### 6. Responsive Breakpoints
The page uses Tailwind's responsive prefixes:
- `md:` - 768px and up (tablet)
- `lg:` - 1024px and up (desktop)
- `xl:` - 1280px and up (large desktop)

## Key Features

### Countdown Timer
- Automatically calculates next Saturday 8 PM IST
- Rolls over to next week if current time >= Saturday 8 PM
- Respects `prefers-reduced-motion`
- Two variants: `long` (DD:HH:MM:SS) and `mini` (HH:MM:SS)

### Form Validation
- Client-side validation with real-time feedback
- localStorage persistence
- Step 2 modal with focus trap
- Email and phone pattern validation

### Stack Animations
- IntersectionObserver-based entrance animations
- Staggered timing for visual appeal
- Hover effects with subtle transforms
- Accessibility-compliant (respects reduced motion)

### Sticky Elements
- Top bar with logo and CTA
- Bottom bar with countdown and primary CTA
- Smooth scroll to registration form

## SEO & Performance
- Complete meta tags and Open Graph data
- Semantic HTML structure
- Lazy loading images
- Mobile-first responsive design
- Accessibility features (ARIA labels, focus management)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Testing
Test the page at these breakpoints:
- 360px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1280px (large desktop)

## Deployment
The page is static-friendly and ready for:
- Vercel
- Netlify
- Any static hosting service
- CDN deployment

No backend or API routes required - everything is client-side!

