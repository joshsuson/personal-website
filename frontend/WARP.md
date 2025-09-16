# Personal Website Frontend - Vibrant Design System

This Astro frontend uses a vibrant, modern design system inspired by contemporary web design trends, featuring bold colors, geometric shapes, and dynamic layouts with strategic container usage for breakout effects.

## Core Layout Architecture

### Fixed Visual Column System
The main layout (`src/layouts/Layout.astro`) implements a fixed background visual column:

```astro
<!-- Fixed background container that creates the visual middle column -->
<div class="fixed inset-0 flex justify-center sm:px-8">
  <div class="flex w-full max-w-7xl lg:px-8">
    <div class="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"></div>
  </div>
</div>
<!-- Relative container for actual content -->
<div class="relative flex w-full flex-col">
  <main class="flex-auto">
    <slot />
  </main>
</div>
```

This creates a visual white column with purple background on the sides, allowing content to either stay within or break out of this visual boundary.

## Container Components

### Container.astro
Complete container with both outer and inner constraints:
- **Outer container**: `sm:px-8`, `max-w-7xl`
- **Inner container**: `px-4 sm:px-8 lg:px-12`, `max-w-2xl lg:max-w-5xl`

Use for: Regular text content, headers, footers

### ContainerOuter.astro
Only the outer container constraints:
- Provides wide boundary but no inner content constraints
- Rarely used directly

### ContainerInner.astro
Only the inner container constraints:
- For content that needs to be within the visual column
- Rarely used directly

## Dynamic Layout Patterns

### Constrained Content
```astro
<Container class="mt-9">
  <h1>Title stays within visual column</h1>
  <p>Content respects the visual boundaries</p>
</Container>
```

### Breakout Content
```astro
<Gallery images={photos} />
<!-- No container wrapper = breaks out of visual column -->
```

## Gallery Component

The Gallery component (`src/components/Gallery.astro`) creates the dynamic breakout effect:

- **No container wrapper** - allows it to flow edge-to-edge
- **Horizontal scrolling layout** with rotated images
- **Matches spotlight-ts implementation** exactly
- **Rotation pattern**: `['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']`

## Page Structure Pattern

```astro
<Layout>
  <Container class="mt-9">
    <!-- Header content - constrained -->
  </Container>
  
  <Gallery images={photos} />
  <!-- Gallery - breaks out -->
  
  <Container class="mt-24">
    <!-- Footer content - constrained -->
  </Container>
</Layout>
```

## Key Design Principles

1. **Visual Hierarchy**: Content either respects or breaks the visual column boundaries
2. **Dynamic Contrast**: Constrained text vs flowing gallery creates visual interest  
3. **Responsive Design**: System works across all screen sizes
4. **Spotlight-ts Compatibility**: Direct translation of the reference implementation

## Vibrant Design System

### Color Palette
- **Electric Yellow** (`#EFFF00`) - Primary brand color
- **Coral Pink** (`#FF6B6B`) - Accent color
- **Vibrant Purple** (`#B794F6`) - Secondary accent
- **Lime Green** (`#68D391`) - Success/positive actions
- **Electric Blue** (`#63B3ED`) - Information/links
- **Sunset Orange** (`#F6AD55`) - Warning/attention
- **Pure White** (`#FFFFFF`) - Primary background
- **Soft Cream** (`#FFFEF7`) - Secondary background
- **Charcoal** (`#2D3748`) - Primary text

### Typography System
- **Display Text**: Bold headlines, 800 weight, tight line-height
- **Headline Text**: Section headers, 700 weight
- **Body Text**: Regular content, 400 weight, relaxed line-height
- **Caption Text**: Small text, 500 weight

### Component System
- **Vibrant Cards**: White background with thick charcoal borders
- **Vibrant Buttons**: High-contrast with hover animations
- **Floating Shapes**: Decorative geometric elements
- **Split Layouts**: Two-column responsive layouts

### Background Styling

The layout uses an electric yellow background with a soft cream visual column, creating bold contrast when content breaks out of the container boundaries.
