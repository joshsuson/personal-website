# Personal Website Frontend - Layout System

This Astro frontend uses a sophisticated layout system inspired by the spotlight-ts project, creating dynamic visual effects through strategic container usage.

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

## Background Styling

The layout uses a purple gradient background (`bg-gradient-to-br from-indigo-500 to-purple-600`) that's visible when content breaks out of the white visual column, creating the desired dynamic effect.