# Components - Layout System Components

This directory contains the core layout components that implement the spotlight-ts inspired design system.

## Container System Components

### Container.astro
**Primary container component** - Use this for most content that should stay within the visual column.

**Structure:**
- Outer container: `sm:px-8` with `max-w-7xl lg:px-8`  
- Inner container: `px-4 sm:px-8 lg:px-12` with `max-w-2xl lg:max-w-5xl`

**Props:**
- `class?: string` - Additional classes for the inner container
- `outerClass?: string` - Additional classes for the outer container  
- `innerClass?: string` - Additional classes for the inner wrapper

**Usage:**
```astro
<Container class="mt-9">
  <h1>Constrained content</h1>
</Container>
```

### ContainerOuter.astro
**Outer boundary only** - Provides the wide container bounds without inner content constraints.

**Props:**
- `class?: string` - Additional classes

**Rarely used directly.** Mainly for components that need wide boundaries but custom inner content handling.

### ContainerInner.astro
**Inner constraints only** - Provides the content width constraints without outer boundaries.

**Props:**
- `class?: string` - Additional classes

**Rarely used directly.** Mainly for nested content scenarios.

## Gallery Component

### Gallery.astro
**Breakout component** that creates the dynamic flowing photo gallery effect.

**Key Features:**
- **No container wrapper** - breaks out of visual column completely
- **Horizontal scroll layout** - images flow horizontally with overflow
- **Rotation effects** - subtle rotations for organic feel
- **Responsive sizing** - `w-44` mobile, `sm:w-72` desktop
- **Portrait aspect ratio** - `aspect-[9/10]` for vertical photos

**Props:**
```typescript
interface Props {
  images: Array<{
    url: string;
    alternativeText?: string;
  }>;
}
```

**Integration with Strapi:**
- Uses `STRAPI_URL` environment variable
- Constructs full image URLs: `${strapiUrl}${image.url}`
- Supports lazy loading with `loading="lazy"`

**Rotation Pattern:**
The component cycles through these rotations for organic visual appeal:
```javascript
const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2'];
```

**Critical Design Note:**
Gallery must **never** be wrapped in Container components. It's designed to break out of the visual column boundaries to create the dynamic contrast effect.

## Layout Hierarchy Rules

1. **Text content** → Use `Container`
2. **Gallery/Photos** → Use directly, no container
3. **Mixed sections** → Separate into constrained and breakout parts
4. **Headers/Footers** → Use `Container`

## Component Integration Pattern

```astro
<!-- ✅ Correct Usage -->
<Container class="mt-9">
  <h1>Section Title</h1>
  <p>Description text</p>
</Container>

<Gallery images={photos} />

<Container class="mt-24">
  <footer>Footer content</footer>
</Container>

<!-- ❌ Wrong Usage -->
<Container>
  <Gallery images={photos} /> <!-- This kills the breakout effect -->
</Container>
```