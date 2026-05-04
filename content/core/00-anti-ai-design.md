# 🚫 00. Anti-AI Design Protocol (The 100 "AI Tells" & Human Solutions)

To pass as premium human work, the AI must aggressively avoid the following 100 "AI Tells" across Layout, Visuals, Typography, Components, Motion, and Code. Every generated output must be evaluated against this protocol.

## A. Layout, Grid & Spatial Tells (1-20)

**1. The Symmetrical Obsession**
*   **The AI Tell:** AI mathematically divides layouts into perfect 50/50 splits or exactly 3 identical columns. It feels robotic because it lacks visual tension and hierarchy.
*   **The Human Solution:** Introduce intentional asymmetry. Use the Golden Ratio (approx. 1:1.618) or 8:4 column splits on a 12-column grid.

**2. Mathematical Centering vs. Optical Centering**
*   **The AI Tell:** Relying purely on `align-items: center`. This creates optical imbalances, especially with asymmetrical icons (like a "Play" triangle) or text with descending letters.
*   **The Human Solution:** Apply optical adjustments. If an icon is visually heavier on the left, add padding to the left to visually center it. The eye decides what is centered, not the DOM.

**3. Homogenous Whitespace (The 16px Trap)**
*   **The AI Tell:** Using `gap: 16px` everywhere. There is no hierarchy of whitespace, leaving elements evenly distributed but completely disconnected.
*   **The Human Solution:** Implement structural tension. Group related items extremely close (`gap: 4px`), and separate distinct sections with massive whitespace (`padding-top: 120px`).

**4. The "Bento Box" Default**
*   **The AI Tell:** Forcing every single layout into an Apple-style grid of rounded boxes, even when a simple list or table would be much more readable.
*   **The Human Solution:** Reserve bento grids exclusively for dashboards. Use clean, open lists for text-heavy data.

**5. Mobile Desktop Scaling (Lazy Responsive)**
*   **The AI Tell:** Simply shrinking text sizes to make a 4-column desktop layout fit on a mobile screen. It becomes microscopic and unreadable.
*   **The Human Solution:** Completely refactor the UI structure for mobile (e.g., turning a data table into stacked, expandable cards).

**6. The "Card Soup" (Inception)**
*   **The AI Tell:** Putting a Card inside a Card inside a Card, creating messy nested borders and muddy drop shadows.
*   **The Human Solution:** Use negative space and typography size to separate nested content, rather than drawing literal boxes around everything.

**7. Ignoring the Fold**
*   **The AI Tell:** Designing a massive hero section that pushes the primary call-to-action (CTA) button below `100vh` on desktop screens.
*   **The Human Solution:** Ensure the main value proposition and the primary CTA are visible instantly without requiring the user to scroll.

**8. The "Floating Header" Disconnect**
*   **The AI Tell:** A sticky navbar that has no shadow or backdrop-blur. When the user scrolls, the text of the site clashes with the text of the menu.
*   **The Human Solution:** Add `backdrop-filter: blur(12px)` and a subtle `1px` bottom border with low opacity to sticky elements.

**9. Text Carousels**
*   **The AI Tell:** Putting crucial text content (like core features) inside an auto-playing carousel, forcing the user to wait or miss information.
*   **The Human Solution:** Stack the content vertically. If a carousel is mandatory, disable auto-play and allow manual swiping.

**10. Unnecessary Full-Width Text Containers**
*   **The AI Tell:** Letting paragraphs stretch from edge to edge on a 4K monitor, causing massive eye fatigue during reading.
*   **The Human Solution:** Cap reading widths to `max-w-prose` (approximately 65-75 characters per line).

**11. Lack of Sub-Grids**
*   **The AI Tell:** Creating independent columns where the inner contents do not align horizontally with the contents of the column next to them.
*   **The Human Solution:** Use CSS Subgrid to align nested components to a master baseline sub-grid across columns.

**12. Trapped Whitespace**
*   **The AI Tell:** Placing elements in a way that leaves weird, unusable white holes trapped in the dead center of the UI.
*   **The Human Solution:** Push whitespace to the outside edges of the layout (macro-spacing) to frame the content.

**13. Over-Padding**
*   **The AI Tell:** Putting `40px` padding inside a tiny card, which squishes the text into a single narrow column.
*   **The Human Solution:** Scale padding proportionally to the container size (e.g., `16px` on mobile cards, `32px` on desktop cards).

**14. Touching Edges (Under-Padding)**
*   **The AI Tell:** Forgetting to add `padding-bottom` on the main `<body>`, leaving the footer glued to the bottom of the scrollbar.
*   **The Human Solution:** Ensure massive breathing room above the footer to signal the end of the page content.

**15. The Wall of Features**
*   **The AI Tell:** Displaying 12 identical feature icons stacked perfectly in a grid without varying sizes or hierarchy.
*   **The Human Solution:** Vary sizes. Feature 3 main selling points prominently, and list the remaining 9 minimally.

**16. Equal Vertical Rhythm**
*   **The AI Tell:** Setting the margin between every single section to exactly `100px`. It feels robotic.
*   **The Human Solution:** Use a musical vertical rhythm scale based on relationship (e.g., `48px` for related sections, `192px` for a complete topic change).

**17. Centered Left-Aligned Text**
*   **The AI Tell:** A container is centered on the page, but the text inside it is left-aligned, creating a weird visual offset on the right side.
*   **The Human Solution:** Either align the text to the center to match the container, or left-align the entire container to the grid.

**18. Floating Footers**
*   **The AI Tell:** On a page with very little content (like a login screen), the footer floats awkwardly in the middle of the screen.
*   **The Human Solution:** Set `min-h-screen` (or `min-h-[100dvh]`) on the main wrapper to push the footer to the absolute bottom.

**19. Broken Optical Margins**
*   **The AI Tell:** Bullet points or quotation marks align perfectly with the text, making the paragraph look indented.
*   **The Human Solution:** Hang punctuation and bullets outside the left text margin to keep the text block perfectly aligned.

**20. Infinite Scroll Trap**
*   **The AI Tell:** Implementing infinite scroll on a page where the user desperately needs to reach the contact info in the footer.
*   **The Human Solution:** Provide a "Load More" button instead, allowing the user to access the footer at any time.

## B. Graphic, 3D & Photography Tells (21-40)

**21. Corporate Memphis (Alegria)**
*   **The AI Tell:** Using flat, faceless vector humans with disproportionately giant limbs and tiny heads. It screams generic "Big Tech 2018".
*   **The Human Solution:** Avoid human illustrations. Use high-contrast photography or abstract geometric visuals.

**22. The "Midjourney Sheen"**
*   **The AI Tell:** AI-generated images with hyper-smooth, glossy, plasticky textures and over-saturated rim lighting.
*   **The Human Solution:** Add heavy film grain (`ISO 400`), reduce global saturation by 10%, and crop tightly to remove the artificial sheen.

**23. Conflicting Light Sources**
*   **The AI Tell:** A UI card casts a drop shadow to the bottom-right, but contains an inner gradient lit from the bottom-right.
*   **The Human Solution:** Enforce a strict, global lighting environment across the entire interface (e.g., universal top-left lighting).

**24. The "AI Glow"**
*   **The AI Tell:** Massive, blurred cyan and purple radial gradients floating randomly in dark mode backgrounds to create fake depth.
*   **The Human Solution:** Use solid deep colors (`#0A0A0B`) and rely on subtle SVG noise overlays (`url('noise.png')`) for texture.

**25. Random Isometric 3D**
*   **The AI Tell:** Placing floating 3D glass spheres or abstract shapes to fill empty space without narrative purpose.
*   **The Human Solution:** Leave the space empty (negative space is luxury) or use purposeful, highly literal functional graphics.

**26. Text Rendering Hallucinations**
*   **The AI Tell:** Using AI-generated images that contain gibberish alien text or warped symbols in the background.
*   **The Human Solution:** Strictly use real photography from Unsplash or pure abstract visuals with zero lettering.

**27. Perfect Organic Symmetry**
*   **The AI Tell:** AI draws leaves, human faces, or natural textures perfectly symmetrically, triggering the uncanny valley.
*   **The Human Solution:** Intentionally skew, rotate, or deform organic assets slightly. Nature is never perfectly mirrored.

**28. Fake Film Grain**
*   **The AI Tell:** Digital noise overlays that look like harsh, pixelated TV static rather than analog film.
*   **The Human Solution:** Use SVG `<feTurbulence>` filters with a low frequency and `multiply` blend mode for true organic texture.

**29. Geometric Hexagon Logos**
*   **The AI Tell:** Defaulting to an overlapping transparent hexagon or a generic infinity symbol for "Tech" logos.
*   **The Human Solution:** Use pure typography (Logotypes) or extremely simple, bold brutalist shapes.

**30. Inconsistent Icon Sets**
*   **The AI Tell:** Mixing icons with a `1px` stroke next to icons with a `2px` stroke, or mixing filled icons with outline icons.
*   **The Human Solution:** Strictly use one unified icon library (e.g., Lucide, Phosphor) and enforce identical stroke widths.

**31. The 6-Fingered Hand**
*   **The AI Tell:** Using AI images with severe anatomical errors in hands, teeth, or background limbs.
*   **The Human Solution:** Never use AI-generated human anatomy without manual retouching or heavy cropping.

**32. Meaningless Dashboards**
*   **The AI Tell:** AI images of dashboards with fake, illogical UI graphs where the X and Y axes make zero mathematical sense.
*   **The Human Solution:** Build real CSS charts with libraries (like Recharts) or use precise, logical UI vectors.

**33. Over-blurred Backgrounds (Fake Bokeh)**
*   **The AI Tell:** Portrait-mode blurring that incorrectly blurs subjects on the same focal plane as the main subject.
*   **The Human Solution:** Use realistic depth-of-field logic or avoid artificial blurring entirely.

**34. Shadows on Flat Vectors**
*   **The AI Tell:** Slapping a literal drop shadow on a completely flat, 2D illustration.
*   **The Human Solution:** Keep 2D art strictly flat; apply shadows only to structural UI layers (like cards).

**35. Redundant Icons**
*   **The AI Tell:** Putting a 🏠 icon immediately next to the word "Home" on a modern website.
*   **The Human Solution:** Drop the icon. Text alone is faster to read and looks cleaner.

**36. The Stock Photo Grin**
*   **The AI Tell:** Using images of unnaturally happy people pointing aggressively at computer screens.
*   **The Human Solution:** Use candid, moody, or highly editorial lifestyle photography with natural lighting.

**37. Over-Detailed Small Icons**
*   **The AI Tell:** Shrinking a complex vector meant for `64x64px` down to `16x16px`, turning it into an illegible black blob.
*   **The Human Solution:** Use simplified icon variants specifically designed for small dimensions.

**38. Misaligned SVG Viewboxes**
*   **The AI Tell:** Generating SVGs with huge internal padding inside the `viewBox`, making CSS alignment impossible.
*   **The Human Solution:** Crop the SVG `viewBox` tightly to the exact boundaries of the vector path.

**39. The "Tech Dots"**
*   **The AI Tell:** Using random networks of connecting dots and lines to symbolize "AI" or "Blockchain".
*   **The Human Solution:** Find a specific, unique visual metaphor. The connecting dots are universally despised as generic.

**40. Aspect Ratio Mixing**
*   **The AI Tell:** Randomly mixing 1:1, 16:9, and 4:3 images in the exact same grid, breaking the layout.
*   **The Human Solution:** Force strict `aspect-ratio` rules via CSS (e.g., `aspect-video object-cover`).

## C. Color, Lighting & Contrast Tells (41-55)

**41. Toxic Vibrancy**
*   **The AI Tell:** Using `#FF0000` (Pure Red) or `#00FF00` (Pure Green) for system alerts, causing eye strain.
*   **The Human Solution:** Desaturate and darken functional colors slightly (`#EF4444` or `#10B981`) to look professional.

**42. Default Dark Mode**
*   **The AI Tell:** Generating a dark mode UI for every prompt, even for industries like hospitals, daycares, or banks.
*   **The Human Solution:** Analyze the industry. Use airy, white/light UIs to convey trust, health, and B2B security.

**43. Muddy Mid-Tones**
*   **The AI Tell:** Creating a gradient from Red to Green, resulting in a dirty brown/gray color in the dead center.
*   **The Human Solution:** Add a third, bright color stop in the middle, or use HSL color interpolation spaces.

**44. Blinding White**
*   **The AI Tell:** Using `#FFFFFF` for massive backgrounds or body text, causing halation and burning the retina.
*   **The Human Solution:** Use tinted off-whites (`#F4F4F5` or `#FAFAFA`) for backgrounds, and soft grays (`#E2E8F0`) for dark mode text.

**45. Gradient Border Abuse**
*   **The AI Tell:** Using iridescent gradient borders on every single card to look "Web3".
*   **The Human Solution:** Use subtle 1px solid borders (`rgba(255,255,255,0.1)`) for premium minimalism.

**46. Muted Text Contrast Failure**
*   **The AI Tell:** Using `#999` text on a `#FFF` background, completely failing accessibility standards.
*   **The Human Solution:** Check all text against WCAG 4.5:1 ratio rules. Muted text should usually be `#555` or `#666` at minimum.

**47. Colored Drop Shadows in Dark Mode**
*   **The AI Tell:** Using colored shadows in dark mode themes. Shadows do not exist in the dark.
*   **The Human Solution:** Indicate elevation in dark mode using lighter background shades (e.g., `#1A1A1A` over `#000000`).

**48. The "Color Picker" Palette**
*   **The AI Tell:** Using raw, mathematical primary colors like `#0000FF` (Blue) or `#FFFF00` (Yellow).
*   **The Human Solution:** Tweak hues slightly (e.g., add warmth to a yellow, or coolness to a blue) using HSL/LCH for harmony.

**49. Color Blindness Ignorance**
*   **The AI Tell:** Relying solely on color (Red vs Green) to indicate a success/error state.
*   **The Human Solution:** Always add a secondary indicator, like an icon (an "X" or a checkmark) or a text label.

**50. Hard Transition Shadows**
*   **The AI Tell:** Drop shadows with a `0px` spread and heavy opacity (like `rgba(0,0,0,0.5)`), looking like MS Word.
*   **The Human Solution:** Use layered, ultra-soft shadows with very low opacity (e.g., `0.05` to `0.02`).

**51. Multiple Primary Colors**
*   **The AI Tell:** Having a Green "Buy" button and a Red "Sign Up" button of equal visual weight on the same page.
*   **The Human Solution:** Designate only ONE primary brand color per view. All other actions must be secondary (outline/ghost).

**52. Neon Text Trap**
*   **The AI Tell:** Glowing neon text on a dark background without a supporting text-shadow, making it bleed and become illegible.
*   **The Human Solution:** Add `text-shadow: 0 0 10px rgba(brand-color, 0.5)` to anchor the glow to the text.

**53. Mixing Warm/Cool Grays**
*   **The AI Tell:** Using a cool blue-gray for the background but a warm yellow-gray for the card borders.
*   **The Human Solution:** Strictly align the hue of all neutral colors. Build a unified 50-900 color scale.

**54. Inverted Dark Mode**
*   **The AI Tell:** Creating a dark mode by algorithmically inverting all the light mode colors.
*   **The Human Solution:** Hand-pick semantic dark mode scales; dark mode requires inherently lower contrast to be readable.

**55. Brand Color Exhaustion**
*   **The AI Tell:** Making every header, every link, every icon, and every button the primary brand color.
*   **The Human Solution:** Follow the 60-30-10 rule. The brand color should be used for less than 10% of the UI.

## D. Typography, Copywriting & Content Tells (56-75)

**56. The ChatGPT Vocabulary**
*   **The AI Tell:** Relying on overused words like: *Delve, Elevate, Seamless, Unlock, Robust, Foster, Symphony, Tapestry.*
*   **The Human Solution:** Use direct verbs and nouns. ("Make faster payments" instead of "Unlock seamless financial symphonies").

**57. Structural Monotony**
*   **The AI Tell:** Writing exactly 3 paragraphs, each containing exactly 3 sentences of the exact same length. It feels robotic.
*   **The Human Solution:** Vary text rhythm dynamically. Use a 1-word sentence. Then a long explanation. Break it up with lists.

**58. No Font Pairing Tension**
*   **The AI Tell:** Using a single font (like Inter) everywhere with no contrast between headers and body text.
*   **The Human Solution:** Create tension. Pair a highly stylized, brutalist Serif display font with an ultra-utilitarian Mono font.

**59. Ignoring Letter-Spacing Rules**
*   **The AI Tell:** Using the default browser letter-spacing (tracking) for everything.
*   **The Human Solution:** Tighten tracking for massive headers (`-0.03em`), widen tracking for uppercase metadata or buttons (`0.05em`).

**60. Missing Typographic Hierarchy**
*   **The AI Tell:** Hierarchy is determined solely by font size (e.g., H1 is larger than H2).
*   **The Human Solution:** Use weight, color (muted grays), and casing to establish order. A tiny uppercase bold text can outrank a large thin text.

**61. Meaningless Microcopy**
*   **The AI Tell:** Using generic button text like "Click Here", "Submit", or "Learn More".
*   **The Human Solution:** Use descriptive, action-oriented verbs. ("Deploy to Vercel", "Read Documentation").

**62. The Lorem Ipsum Evasion**
*   **The AI Tell:** Refusing to write copy and just putting "Lorem ipsum dolor sit amet" everywhere.
*   **The Human Solution:** Use realistic, contextual "fake" data to test text wrapping and user intent.

**63. Gradient Text Abuse**
*   **The AI Tell:** Putting `background-clip: text` gradients on small 16px body text, destroying legibility.
*   **The Human Solution:** Restrict text gradients strictly to massive `H1` headlines.

**64. Orphan Words**
*   **The AI Tell:** The last word of a headline falls alone onto a new line, creating an ugly shape.
*   **The Human Solution:** Apply `text-wrap: balance` to CSS to ensure even, beautiful line lengths for headers.

**65. Emojis as Formatting**
*   **The AI Tell:** 🚀 Putting emojis at the start of every bullet point or heading to look "friendly". ✨
*   **The Human Solution:** Rely on pure typography, layout, or custom SVG icons. Emojis look amateurish in premium UI.

**66. Hardcoded Dates**
*   **The AI Tell:** Outputting database timestamps like `2026-05-04T00:22` directly into the UI.
*   **The Human Solution:** Parse and humanize dates (e.g., "Just now", "2 days ago", or "May 4, 2026").

**67. Unformatted Numbers**
*   **The AI Tell:** Displaying raw numbers like `$10000` or `1000000 views`.
*   **The Human Solution:** Use `Intl.NumberFormat` to output `$10,000.00` or `1M views`.

**68. System Font Fallback Failure**
*   **The AI Tell:** Specifying an obscure font like `font-family: "CustomFont";` without providing a safe fallback.
*   **The Human Solution:** Always end font stacks with system-safe defaults: `system-ui, -apple-system, sans-serif`.

**69. Capitalization Inconsistency**
*   **The AI Tell:** Mixing Title Case ("Sign Up Now") and Sentence case ("Sign up now") randomly across buttons.
*   **The Human Solution:** Pick one casing standard for the entire app and enforce it strictly.

**70. Fake Trust Badges**
*   **The AI Tell:** Slapping generic "100% Secure" text with a lock icon without any context.
*   **The Human Solution:** Explain *why* it's secure (e.g., "Secured via AES-256 Encryption by Stripe").

**71. The "Are you sure?" Spam**
*   **The AI Tell:** Triggering a confirmation dialogue for every single non-destructive action.
*   **The Human Solution:** Allow "Undo" (toast notifications) for non-destructive actions. Use modals only for permanent deletions.

**72. Fake Testimonial Names**
*   **The AI Tell:** Writing testimonials signed by "John Doe - CEO".
*   **The Human Solution:** Use highly specific, realistic placeholder names and job titles ("Sarah Jenkins - VP of Ops at Acme").

**73. Unscannable Text Walls**
*   **The AI Tell:** Presenting massive blocks of unbroken text without visual relief.
*   **The Human Solution:** Break it up with pull quotes, bolded keywords, bullet points, and generous line-heights.

**74. All-Caps Body Text**
*   **The AI Tell:** Using `text-transform: uppercase` on paragraphs longer than 3 words.
*   **The Human Solution:** Never uppercase long text blocks; it removes the shape of words, destroying readability.

**75. Straight Quotes**
*   **The AI Tell:** Using straight typewriter quotes (`" "`) instead of proper typographic smart quotes (`“ ”`).
*   **The Human Solution:** Run copy through a typography formatter or use HTML entities for smart quotes.

## E. UI Components, Interaction & Motion Tells (76-90)

**76. The "Bootstrap" Radius**
*   **The AI Tell:** Slapping `8px` rounded corners indiscriminately. Mixing pill buttons with square cards incorrectly.
*   **The Human Solution:** Follow the Law of Concentric Radii: Inner Radius = Outer Radius - Padding.

**77. Over-Animation (The Jiggle)**
*   **The AI Tell:** Adding `transition: all 0.3s ease` to cards, making them blow up massively and scale down on hover.
*   **The Human Solution:** Animate `transform` only. Hover should be a subtle `translateY(-2px)` shift. Fast in, slow out.

**78. Linear Easing**
*   **The AI Tell:** Movement uses `linear` easing, feeling robotic and lacking physical mass.
*   **The Human Solution:** Use custom cubic-beziers (`cubic-bezier(0.16, 1, 0.3, 1)`) or physics-based springs so objects accelerate organically.

**79. Missing Focus States**
*   **The AI Tell:** Removing focus rings (`outline: none`), breaking accessibility and keyboard navigation completely.
*   **The Human Solution:** Always implement highly visible `:focus-visible` offset rings (e.g., a 2px blue ring).

**80. The Floating Input**
*   **The AI Tell:** Form fields without visible boundaries, relying only on placeholder text.
*   **The Human Solution:** Ensure inputs have a distinct background tint or a clear `1px` border to provide click affordance.

**81. Excessive Glassmorphism**
*   **The AI Tell:** Blurring every background indiscriminately (`backdrop-filter: blur`), killing GPU performance.
*   **The Human Solution:** Use solid colors with opacity, unless there is a vibrant moving element directly behind the glass.

**82. Z-Index Wars**
*   **The AI Tell:** Assigning `z-index: 9999` randomly to fix stacking context issues.
*   **The Human Solution:** Establish a strict, documented scale (e.g., Modals=50, Tooltips=60) and restructure the DOM to avoid conflicts.

**83. The "Everything Fades Up" Entry**
*   **The AI Tell:** Every single element on the page does the exact same `fade-up` animation on scroll.
*   **The Human Solution:** Stagger animations sequentially. Use masks to reveal elements, or scale elements in from `0.95`.

**84. Lack of Haptic Mass**
*   **The AI Tell:** A massive modal animates in at the exact same speed (300ms) as a tiny tooltip.
*   **The Human Solution:** Large objects have more mass and take longer to move. Adjust duration based on component size.

**85. Vomit Parallax**
*   **The AI Tell:** Foreground and background layers moving at completely random, fast speeds, causing motion sickness.
*   **The Human Solution:** Keep parallax extremely subtle (e.g., background moves at 15% the speed of foreground).

**86. Hover States without Cursors**
*   **The AI Tell:** Missing `cursor: pointer` on interactive divs or custom buttons.
*   **The Human Solution:** Ensure every single clickable element changes the cursor to signify interactivity.

**87. The Disappearing Scrollbar**
*   **The AI Tell:** Hiding scrollbars completely via CSS `::-webkit-scrollbar { display: none; }`, breaking UX context.
*   **The Human Solution:** Style scrollbars elegantly to match the theme, but never hide them entirely.

**88. Infinite Spinners**
*   **The AI Tell:** Loading states with no timeout or error handling. If the API fails, it spins forever.
*   **The Human Solution:** Always show an error message if the API doesn't respond within 10 seconds.

**89. Un-clickable Touch Targets**
*   **The AI Tell:** Icons that require clicking exactly on the `1px` SVG path line to register a click.
*   **The Human Solution:** Wrap icons in a `<button>` with a minimum `44x44px` invisible padding hit area.

**90. The Instant Tooltip**
*   **The AI Tell:** Tooltips that appear with 0ms delay, flashing annoyingly when the mouse moves across the screen.
*   **The Human Solution:** Add a `300ms` delay before showing tooltips to ensure intentional hovering.

## F. Code Architecture, DOM & UX Engineering Tells (91-100)

**91. Div Soup**
*   **The AI Tell:** Wrapping everything in meaningless `<div>` tags, creating a massive, inaccessible DOM tree.
*   **The Human Solution:** Use semantic HTML5. Wrap articles in `<article>`, sidebars in `<aside>`, and navigation in `<nav>`.

**92. Arbitrary Inline Styles**
*   **The AI Tell:** Hardcoding CSS values (e.g., `margin-top: 17px;`) randomly throughout the codebase.
*   **The Human Solution:** Strictly enforce the 8pt design system scale and use tokens (e.g., `mt-4`).

**93. No CSS Variables**
*   **The AI Tell:** Hardcoded hex colors making system-wide theme switching (light/dark mode) impossible.
*   **The Human Solution:** Abstract all colors to CSS variables (e.g., `--bg-primary`, `--text-muted`).

**94. The 100vh Mobile Trap**
*   **The AI Tell:** Using `100vh`, causing bottom elements to be cut off by Safari's dynamic address bar.
*   **The Human Solution:** Use `100dvh` (Dynamic Viewport Height) for full-screen mobile layouts.

**95. Cumulative Layout Shift (CLS)**
*   **The AI Tell:** Loading skeletons that are smaller than the real content, causing the page to jump violently when data loads.
*   **The Human Solution:** Ensure skeletons map 1:1 to the exact final loaded heights of the components.

**96. The `.map()` Without Empty States**
*   **The AI Tell:** Rendering lists via `.map()` without checking if the array length is 0.
*   **The Human Solution:** Always return a beautiful `<EmptyState />` component if data is null or empty.

**97. `!important` Abuse**
*   **The AI Tell:** Forcing CSS properties with `!important` instead of understanding CSS specificity.
*   **The Human Solution:** Write cleaner CSS specificity or leverage modern CSS cascade layers (`@layer`).

**98. Missing Aria Labels**
*   **The AI Tell:** Icon-only buttons without text, making them completely invisible to screen readers.
*   **The Human Solution:** Always add `aria-label="Action name"` to all graphical buttons.

**99. The Un-submittable Form**
*   **The AI Tell:** Forms that rely entirely on JS `onClick` for submission, breaking the "Enter" key functionality.
*   **The Human Solution:** Use native `<form onSubmit>` so users can submit via keyboard natively.

**100. Hardcoded Strings**
*   **The AI Tell:** Writing textual content like "Submit" directly into the DOM tree.
*   **The Human Solution:** Abstract all strings into localization files (`i18n.t('submit')`) for easy translation.
