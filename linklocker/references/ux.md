# LinkLocker - UI/UX Guidelines (Dark Theme, Minimal)

## 1. Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background (page) | Dark gray / near black | `#0a0a0a` |
| Card background | Slightly lighter dark | `#111111` |
| Primary accent | Blue | `#3b82f6` |
| Text primary | White | `#ffffff` |
| Text secondary | Light gray | `#9ca3af` |
| Border | Subtle gray | `#1f2937` |
| Hover card | Slight lift | `#1a1a1a` |
| Danger (delete) | Red | `#ef4444` |

## 2. Typography

- **Font family:** Inter, system-ui, -apple-system, sans-serif
- **Base size:** 16px on body
- **Headings:** 
  - H1: 2rem / 700
  - H2: 1.5rem / 600
  - H3: 1.25rem / 600
- **Body:** 0.875rem - 1rem / 400
- **Small text (timestamps, domains):** 0.75rem / 400, text-gray-400

## 3. Spacing System (Tailwind scale)

- **Card padding:** `p-4` (1rem)
- **Gap between cards:** `gap-4` (1rem)
- **Section margin:** `mb-8` (2rem)
- **Input padding:** `px-4 py-2`
- **Button padding:** `px-4 py-2` (small), `px-6 py-2.5` (medium)

## 4. Layout Rules (All Main Pages)

### Navbar
- Fixed at top, background `#0a0a0a`, border-bottom `#1f2937`
- Logo left, auth buttons / user menu right
- Max-width: 1280px, centered with `mx-auto`

### Main Container
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Top padding: `pt-20` (to account for fixed navbar)

### Quick Add Bar (Dashboard)
- Full width card with dark background (`#111111`)
- Border: `1px solid #1f2937`, rounded-xl
- Inner layout: flex wrap on mobile, row on desktop
- Inputs: dark background (`#1a1a1a`), border `#2d2d2d`, focus ring `#3b82f6`

### Boards Grid (Dashboard)
- Responsive grid: 
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3-4 columns
- Grid gap: `gap-4`

### Board View (Pinterest-style link grid)
- Same grid as boards: responsive columns
- Each link card:
  - Background `#111111`, rounded-xl, overflow hidden
  - Thumbnail: aspect-video (16:9), object-cover, bg-gray-800
  - Title: line-clamp-2, font-medium
  - Domain + favicon: row, small text, text-gray-400
  - Timestamp: small text
  - Actions (edit/delete): hidden until hover, absolute or visible on hover

### Discover Section
- Same board cards but with "by username" badge
- No edit/delete buttons for non-owners

## 5. Component Consistency

### Card (Board / Link)
- Background: `#111111`
- Border-radius: `rounded-xl` (12px)
- Border: `1px solid #1f2937`
- Hover: `bg-[#1a1a1a]`, border `#374151`, transition

### Modal
- Fixed overlay: `bg-black/70`
- Modal container: `bg-[#111111]`, rounded-2xl, max-w-md, w-full
- Padding: `p-6`
- Close button: top-right
- Buttons: primary blue, secondary gray, danger red

### Buttons
- Primary: `bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg`
- Secondary: `bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg`
- Danger: `bg-red-600 hover:bg-red-700 text-white`
- Outline: `border border-gray-600 text-gray-300 hover:bg-gray-800`

### Form Inputs
- Background: `#1a1a1a`
- Border: `1px solid #2d2d2d`
- Text color: white
- Focus: `ring-2 ring-blue-500`, border-transparent
- Padding: `px-3 py-2`

## 6. Responsive Breakpoints

- **Mobile:** < 640px – stacked layout, full-width inputs
- **Tablet:** 640px – 2 column grids
- **Desktop:** 1024px – 3/4 column grids

## 7. Spacing Examples

| Element | Margin/Padding |
|---------|----------------|
| Between navbar and content | `pt-20` |
| Between sections (e.g., "My Boards" and "Discover") | `mt-12` |
| Between heading and grid | `mb-4` |
| Between cards in grid | `gap-4` |
| Inside card (padding) | `p-4` |
| Between elements inside card | `space-y-2` |

## 8. Dark Theme Specifics

- No pure black (`#000`) – use `#0a0a0a` for backgrounds
- Cards: `#111111` to distinguish from page background
- Subtle borders: `#1f2937` (gray-800)
- Hover states: lighter dark (`#1a1a1a` or `#222222`)
- Shadows: none or very subtle `shadow-lg shadow-black/20`

## 9. Alignment Rules

- **Text:** Left-aligned everywhere (except maybe centered empty states)
- **Buttons:** Inline with form fields, right-aligned in modals
- **Cards:** Uniform height (flex column, justify-between optional)
- **Icons:** Use lucide-react or react-icons, size 4 (16px) for inline, size 5 (20px) for buttons

