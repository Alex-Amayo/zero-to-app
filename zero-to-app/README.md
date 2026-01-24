# zero-to-app Design System

## TL;DR

React Native design system with theme-aware UI components, responsive utilities, and brand configuration. Exports 30+ components (buttons, inputs, cards, forms, feedback) plus theme context, hooks, and brand tokens. Cross-platform (iOS, Android, Web). Wrap app root with `<ZeroToApp brand={createBrand({...})}>` to enable theming and brand context. All brand values must be provided at app level - no defaults are included. Use `useBrand()` hook to access brand values in components. All exports from `'zero-to-app'`.

---

## Quick Start

```typescript
import { ZeroToApp, createBrand } from 'zero-to-app';

export default function Root() {
  // Create your brand configuration - all values are required
  const brand = createBrand({
    name: 'My App',
    colors: {
      primary: '#cc3366',
      secondary: '#cc3366',
      backgroundColor: '#fafafc',
    },
    fontSizes: {
      small: 14,
      medium: 16,
      large: 20,
      xlarge: 25,
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      xxxl: 40,
    },
    borderRadius: 5,
    logo: {
      light: require('./assets/logo-light.png'),
      dark: require('./assets/logo-dark.png'),
    },
    footerLinks: {
      links: [
        { text: 'Home', route: '/(tabs)/home' },
        { text: 'About', route: '/(tabs)/about' },
      ],
    },
    navigation: {
      items: [
        { 
          route: '/(tabs)/home', 
          title: 'Home', 
          icon: { web: 'home', mobile: 'house' } 
        },
        { 
          route: '/(tabs)/about', 
          title: 'About', 
          icon: { web: 'info', mobile: 'person' } 
        },
      ],
    },
  });

  return (
    <ZeroToApp brand={brand}>
      <App />
    </ZeroToApp>
  );
}
```

```typescript
import { StyledText, Button, Card, useDimensions } from 'zero-to-app';

function MyComponent() {
  const dimensions = useDimensions();
  return (
    <Card>
      <StyledText fontSize="lg" bold>Welcome</StyledText>
      <Button title="Get Started" onPress={() => {}} />
    </Card>
  );
}
```

---

## Migration from Static Brand Import

If you're upgrading from an older version that used static brand imports:

**Old way (deprecated):**
```typescript
import { brand } from 'zero-to-app';
// Direct access: brand.colors.primary
```

**New way (current):**
```typescript
import { createBrand, useBrand } from 'zero-to-app';

// In root component - all brand values must be provided
const brand = createBrand({
  name: 'My App',
  colors: { primary: '#ff0000', secondary: '#00ff00', backgroundColor: '#ffffff' },
  fontSizes: { small: 12, medium: 14, large: 18, xlarge: 24 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: 8,
});
<ZeroToApp brand={brand}>...</ZeroToApp>

// In child components
const brand = useBrand();
// Access: brand.colors.primary
```

This change makes the design system fully reusable - no embedded brand assumptions. You must provide all brand values at the app level, enabling true white-labeling and multi-brand support.

---

## File Map

| Directory | Purpose |
|-----------|---------|
| `brand/` | Brand configuration (colors, fonts, spacing, logos, navigation, footer links) |
| `theme/` | Theme system (light/dark themes, `ZeroToApp` provider) |
| `components/` | All components (composite + UI entrypoints) |
| `components/ui/` | UI components (Text, Button, Input, Feedback) |
| `hooks/` | Custom hooks (`useDimensions`, `useWindowWidth`, `useWindowHeight`) |
| `context/` | Scroll context utilities |

---

## Structure and Exports

### Module Map

- **UI:** `ui` (Button, StyledText, StyledTextInput, ErrorBoundary, etc.)
- **Composite:** `components/action`, `components/chat`, `components/form`, `components/layout`, `components/media`, `components/navigation`, `components/list`, `components/card`, `components/tile`
- **Utilities:** `brand`, `theme`, `hooks`, `context`

### Import Examples

```typescript
import { Button, StyledText } from 'zero-to-app';
```

```typescript
import { Button } from 'zero-to-app/ui/Button';
import { List, ListButton } from 'zero-to-app/components/list';
```

```typescript
import { FeatureCard } from 'zero-to-app/components/media';
import { AppbarWeb } from 'zero-to-app/components/navigation';
```

## Component Index

### UI Components

| Component | Import | Key Props |
|-----------|--------|-----------|
| `StyledText` | Named | `fontSize`, `align`, `color`, `bold`, `muted`, `numberOfLines` |
| `TextLink` | Default | `text`, `href`, `onPress`, `align` |
| `Button` | Default | `title`, `onPress`, `secondary`, `loading`, `icon`, `iconPosition` |
| `IconButton` | Default | `iconName`, `onPress`, `color`, `backgroundColor` |
| `ToggleIconButton` | Default | `iconName`, `alternateIconName`, `onPress`, `raised` |
| `BlurButton` | Default | `onPress`, `children`, `intensity`, `tint` |
| `ArrowButton` | Default | `direction`, `onPress`, `hidden` |
| `StyledTextInput` | Default | `value`, `onChangeText`, `inputHeight`, `onKeyDown` |
| `LoadingIndicator` | Default | - |
| `NotificationBadge` | Named | `count`, `maxCount` |
| `ErrorBoundary` | Default | Standard ErrorBoundary props |
| `SkeletonCard` | Default | `width`, `imageHeight`, `textLines` |

### Composite Components

| Component | Import | Category |
|-----------|--------|----------|
| `WebPageLayout` | Default | Layout |
| `ParallaxScrollView` | Default | Layout |
| `Footer`, `MinimalFooter`, `MobileFooterBar` | Named | Layout |
| `Card` | Default | Container |
| `Tile` | Default | Container |
| `List` | Default | Container |
| `ListButton` | Default | Container |
| `ListDivider` | Default | Container |
| `ScreenHeader` | Named | Navigation |
| `AppbarWeb` | Default | Navigation |
| `IconButtonGroup` | Default | Navigation |
| `Logo` | Default | Navigation |
| `ImageCarousel` | Named | Media |
| `FeatureCard` | Default | Media |
| `HorizontalCarousel` | Named | Media |
| `Carousel` | Named | Media |
| `MediaTile` | Named | Media |
| `SkeletonMediaTile` | Named | Media |
| `DropDownSelect` | Default | Form |
| `EmailSubscriptionForm` | Default | Form |
| `FormInput` | Default | Form |
| `FormErrors` | Default | Form |
| `FormSeparator` | Default | Form |
| `ActionRow` | Named | Action |
| `ChatContainer` | Default | Chat |
| `ChatMessages` | Default | Chat |
| `ChatInput` | Default | Chat |
| `EmptyChat` | Default | Chat |

### Hooks

| Hook | Returns | Purpose |
|------|---------|---------|
| `useDimensions()` | `{ width, height, breakpoint }` | Responsive dimensions |
| `useWindowWidth()` | `number` | Window width |
| `useWindowHeight()` | `number` | Window height |
| `useBrand()` | `Brand` | Access brand configuration (colors, spacing, fonts, logos) |

### Theme & Brand

| Export | Type | Purpose |
|--------|------|---------|
| `ZeroToApp` | Component | Theme provider (wrap app root, requires `brand` prop) |
| `ThemeContext` | Context | Access theme values and `toggleTheme()` |
| `createBrand` | Function | Create brand configuration object |
| `useBrand` | Hook | Access brand values in components |
| `BrandProvider` | Component | Brand context provider (used internally) |
| `breakpoints` | Object | `{ small: 480, medium: 768, large: 1024, xlarge: 1280 }` |

---

## Theme Quick Reference

### Theme Values

| Property | Light | Dark |
|----------|-------|------|
| `color` | `#000000` | `#FFFFFF` |
| `backgroundColor` | `#FFFFFF` | `#212121` |
| `cardBackgroundColor` | `#FFFFFF` | `#181818` |
| `appbarBackgroundColor` | `#FFFFFF` | `#000000` |
| `highlightColor` | Brand primary | Brand secondary |
| `borderColor` | `#dddfe2` | `#424242` |
| `inactiveIconColor` | `#606770` | `#b0b3b8` |
| `dividerColor` | `#dddfe2` | `#3e4042` |
| `iconButtonBackgroundColor` | `#999999` | `#3a3b3c` |
| `iconButtonIconColor` | `#ffffff` | `#ffffff` |
| `inputBackgroundColor` | `#ffffff` | `#3a3b3c` |
| `linkColor` | `#666666` | `#999999` |
| `isDark` | `false` | `true` |

### Usage

```typescript
import { useContext } from 'react';
import { ThemeContext } from 'zero-to-app';

function MyComponent() {
  const theme = useContext(ThemeContext);
  // theme.values.backgroundColor
  // theme.toggleTheme()
}
```

**Default:** Dark mode. Use `theme.toggleTheme()` to switch.

---

## Brand Quick Reference

### Brand Configuration

Brand configuration is passed to `ZeroToApp` as a prop. Use `createBrand()` to create your brand configuration - **all values are required** (except logo). Use `useBrand()` hook to access brand values in components.

**Creating Brand Configuration:**

```typescript
import { createBrand } from 'zero-to-app';

// Complete brand configuration required - all values must be provided
const brand = createBrand({
  name: 'My App',
  colors: {
    primary: '#ff0000',
    secondary: '#00ff00',
    backgroundColor: '#ffffff',
  },
  fontSizes: {
    small: 12,
    medium: 14,
    large: 18,
    xlarge: 24,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 40,
  },
  borderRadius: 8,
  logo: {
    light: require('./assets/logo-light.png'),
    dark: require('./assets/logo-dark.png'),
  },
  footerLinks: {
    links: [
      { text: 'Home', route: '/(tabs)/home' },
      { text: 'About', route: '/(tabs)/about' },
    ],
  },
  navigation: {
    items: [
      { 
        route: '/(tabs)/home', 
        title: 'Home', 
        icon: { web: 'home', mobile: 'house' } 
      },
      { 
        route: '/(tabs)/about', 
        title: 'About', 
        icon: { web: 'info', mobile: 'person' } 
      },
    ],
  },
});
```

**Navigation Configuration:**

Navigation items are configured through brand config and automatically used by navigation components (AppbarWeb, MobileMenuDrawer, mobile tabs). Each navigation item includes:

- `route`: Full route path (e.g., `'/(tabs)/home'`)
- `title`: Display title for the navigation item
- `icon`: Platform-specific icons with explicit library specification

**Icon Configuration:**

Icons support both explicit library specification and backward-compatible string format:

```typescript
// Explicit format (recommended)
icon: {
  web: { library: 'Feather', name: 'home' },
  mobile: { library: 'Feather', name: 'home' } // For Android fallback
}

// String format (backward compatible - assumes Feather)
icon: {
  web: 'home', // Assumes Feather library
  mobile: 'house' // For iOS: SF Symbol name, for Android: assumes Feather
}
```

**Available Icon Libraries:**
- `Feather` (default for web/Android)
- `MaterialIcons`
- `Ionicons`
- `FontAwesome`
- `AntDesign`
- `Entypo`
- `EvilIcons`
- `Foundation`
- `MaterialCommunityIcons`
- `Octicons`
- `SimpleLineIcons`
- `Zocial`

**Platform-Specific Behavior:**
- **Web desktop/tablet**: Uses `item.icon.web` with specified library (default: Feather)
- **Web mobile**: Hamburger menu drawer uses `item.icon.web` with specified library (default: Feather)
- **iOS native tabs**: Uses `item.icon.mobile` name as SF Symbol (library is ignored - SF Symbols are not from @expo/vector-icons)
- **Android/fallback tabs**: Uses `item.icon.mobile` or `item.icon.web` with specified library (default: Feather)

**Example:**
```typescript
navigation: {
  items: [
    { 
      route: '/(tabs)/home', 
      title: 'Home', 
      icon: { 
        web: { library: 'Feather', name: 'home' }, 
        mobile: 'house' // SF Symbol for iOS, or { library: 'Feather', name: 'home' } for Android
      } 
    },
    { 
      route: '/(tabs)/settings', 
      title: 'Settings', 
      icon: { 
        web: { library: 'MaterialIcons', name: 'settings' }, 
        mobile: { library: 'MaterialIcons', name: 'settings' }
      } 
    },
  ],
}
```

If navigation config is not provided, navigation components will not show menu items.

**White-Labeling Example:**

```typescript
// Create different brands for different clients/products - all values required
const enterpriseBrand = createBrand({
  name: 'Enterprise Edition',
  colors: { primary: '#1a1a1a', secondary: '#4a4a4a', backgroundColor: '#ffffff' },
  fontSizes: { small: 12, medium: 14, large: 18, xlarge: 24 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: 8, // More corporate look
});

const consumerBrand = createBrand({
  name: 'Consumer App',
  colors: { primary: '#ff6600', secondary: '#ffaa00', backgroundColor: '#fafafc' },
  fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: 16, // More playful
});

// Switch based on user type or configuration
<ZeroToApp brand={isEnterprise ? enterpriseBrand : consumerBrand}>
  <App />
</ZeroToApp>
```

**Accessing Brand Values in Components:**

```typescript
import { useBrand } from 'zero-to-app';

function MyComponent() {
  const brand = useBrand();
  
  return (
    <View style={{
      padding: brand.spacing.lg,
      borderRadius: brand.borderRadius,
      backgroundColor: brand.colors.backgroundColor,
    }}>
      <Text style={{ fontSize: brand.fontSizes.large }}>
        {brand.name}
      </Text>
    </View>
  );
}
```

**Navigation Configuration:**

Navigation items are configured through brand config and automatically used by navigation components (AppbarWeb, MobileMenuDrawer, mobile tabs). Each navigation item includes:

- `route`: Full route path (e.g., `'/(tabs)/home'`)
- `title`: Display title for the navigation item
- `icon`: Platform-specific icons
  - `web`: Feather icon name for web platform
  - `mobile`: SF Symbol name for iOS native tabs, or Feather icon name for Android fallback tabs

```typescript
const brand = createBrand({
  // ... other brand config
  navigation: {
    items: [
      { 
        route: '/(tabs)/home', 
        title: 'Home', 
        icon: { 
          web: { library: 'Feather', name: 'home' }, 
          mobile: 'house' // SF Symbol for iOS, or { library: 'Feather', name: 'home' } for Android
        } 
      },
      { 
        route: '/(tabs)/chat', 
        title: 'Chat', 
        icon: { 
          web: { library: 'Feather', name: 'message-circle' }, 
          mobile: 'message' // SF Symbol for iOS
        } 
      },
      { 
        route: '/(tabs)/account', 
        title: 'Account', 
        icon: { 
          web: { library: 'Feather', name: 'user' }, 
          mobile: 'person' // SF Symbol for iOS
        } 
      },
    ],
  },
});
```

**Icon Configuration Formats:**

Icons support both explicit library specification and backward-compatible string format:

```typescript
// Explicit format (recommended)
icon: {
  web: { library: 'Feather', name: 'home' },
  mobile: { library: 'Feather', name: 'home' } // For Android fallback
}

// String format (backward compatible - assumes Feather)
icon: {
  web: 'home', // Assumes Feather library
  mobile: 'house' // For iOS: SF Symbol name, for Android: assumes Feather
}

// Mixed format (common pattern)
icon: {
  web: { library: 'Feather', name: 'home' }, // Explicit for web
  mobile: 'house' // String for iOS SF Symbol
}
```

**Available Icon Libraries:**
- `Feather` (default for web/Android)
- `MaterialIcons`, `Ionicons`, `FontAwesome`, `AntDesign`, `Entypo`, `EvilIcons`, `Foundation`, `MaterialCommunityIcons`, `Octicons`, `SimpleLineIcons`, `Zocial`

Navigation components automatically use `brand.navigation.items`:
- **Web desktop/tablet**: Uses `item.icon.web` with specified library (default: Feather)
- **Web mobile**: Hamburger menu drawer uses `item.icon.web` with specified library (default: Feather)
- **iOS native tabs**: Uses `item.icon.mobile` name as SF Symbol (library ignored - SF Symbols are not from @expo/vector-icons)
- **Android/fallback tabs**: Uses `item.icon.mobile` or `item.icon.web` with specified library (default: Feather)

If navigation config is not provided, navigation components will not show menu items.

**Best Practices:**

1. **Create brand config in a shared file at app level:**
   ```typescript
   // app/brand.ts
   import { createBrand } from '../zero-to-app';
   
   export const appBrand = createBrand({
     name: 'My App',
     colors: { primary: '#cc3366', secondary: '#cc3366', backgroundColor: '#fafafc' },
     fontSizes: { small: 14, medium: 16, large: 20, xlarge: 25 },
     spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
     borderRadius: 5,
   });
   
   // app/_layout.tsx
   import { appBrand } from './brand';
   <ZeroToApp brand={appBrand}>...</ZeroToApp>
   ```

2. **Brand is stable at runtime:** Brand configuration is created once and doesn't change during app execution. This allows for optimal performance.

3. **StyleSheet.create() limitation:** Since `StyleSheet.create()` runs at module level, it cannot use hooks. For styles that need brand values, use inline styles instead:
   ```typescript
   // ❌ Don't do this - StyleSheet.create() can't use hooks
   const styles = StyleSheet.create({
     container: {
       padding: brand.spacing.xl, // Error: brand is undefined
     },
   });
   
   // ✅ Do this - use inline styles with useBrand() hook
   function MyComponent() {
     const brand = useBrand();
     return (
       <View style={{
         padding: brand.spacing.xl,
         borderRadius: brand.borderRadius,
       }}>
         {/* Content */}
       </View>
     );
   }
   ```

### Brand Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `brand.colors.primary` | `string` | Yes | Primary brand color |
| `brand.colors.secondary` | `string` | Yes | Secondary brand color |
| `brand.colors.backgroundColor` | `string` | Yes | Background color |
| `brand.fontSizes.small` | `number` | Yes | Small font size |
| `brand.fontSizes.medium` | `number` | Yes | Medium font size |
| `brand.fontSizes.large` | `number` | Yes | Large font size |
| `brand.fontSizes.xlarge` | `number` | Yes | Extra large font size |
| `brand.spacing.xs` | `number` | Yes | Extra small spacing |
| `brand.spacing.sm` | `number` | Yes | Small spacing |
| `brand.spacing.md` | `number` | Yes | Medium spacing |
| `brand.spacing.lg` | `number` | Yes | Large spacing |
| `brand.spacing.xl` | `number` | Yes | Extra large spacing |
| `brand.spacing.xxl` | `number` | Yes | 2X large spacing |
| `brand.spacing.xxxl` | `number` | Yes | 3X large spacing |
| `brand.borderRadius` | `number` | Yes | Border radius |
| `brand.name` | `string` | Yes | Brand name |
| `brand.logo.light` | `LogoSource` | No | Light mode logo (optional) |
| `brand.logo.dark` | `LogoSource` | No | Dark mode logo (optional) |
| `brand.footerLinks.links` | `FooterLink[]` | No | Footer navigation links (optional) |
| `brand.navigation.items` | `NavigationItem[]` | No | Navigation menu items (optional) |

**Note:** All brand values must be provided when calling `createBrand()`. There are no defaults - this ensures the design system is fully reusable without embedded brand assumptions. Footer links and navigation items are optional - if not provided, those components will not show navigation links.

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Use Case |
|------------|-------|----------|
| `small` | < 480px | Mobile phones |
| `medium` | ≥ 768px | Tablets |
| `large` | ≥ 1024px | Small desktops |
| `xlarge` | ≥ 1280px | Large desktops |

### Usage

```typescript
import { useDimensions, breakpoints, useBrand } from 'zero-to-app';

function ResponsiveComponent() {
  const dimensions = useDimensions();
  const brand = useBrand();
  const isDesktop = dimensions.width >= breakpoints.medium;
  
  return (
    <View style={{ 
      padding: isDesktop ? brand.spacing.xxxl : brand.spacing.xl 
    }}>
      {/* Content */}
    </View>
  );
}
```

---

## Common Patterns

### Pattern 1: Form with Validation

```typescript
import { useForm } from 'react-hook-form';
import { FormInput, FormErrors, Button, Card } from 'zero-to-app';

function LoginForm() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [formError, setFormError] = useState<string | null>(null);
  
  return (
    <Card>
      <FormInput
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        error={errors.email}
      />
      <FormInput
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
        error={errors.password}
      />
      <FormErrors error={formError} clearError={() => setFormError(null)} />
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </Card>
  );
}
```

### Pattern 2: Theme-Aware Styling

```typescript
import { useContext } from 'react';
import { ThemeContext, useBrand } from 'zero-to-app';

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  const brand = useBrand();
  
  return (
    <View style={{
      backgroundColor: theme.values.cardBackgroundColor,
      borderColor: theme.values.borderColor,
      padding: brand.spacing.lg,
      borderRadius: brand.borderRadius
    }}>
      <StyledText color={theme.values.highlightColor}>
        Themed Content
      </StyledText>
    </View>
  );
}
```

### Pattern 3: Button with Icon

```typescript
import { Button, IconButton } from 'zero-to-app';

function ButtonExamples() {
  return (
    <>
      <Button 
        title="Save"
        icon={{ library: 'Feather', name: 'save', size: 20 }}
        iconPosition="left"
        onPress={handleSave}
      />
      <IconButton iconName="heart" onPress={handleLike} />
    </>
  );
}
```

### Pattern 4: Responsive Layout

```typescript
import { useDimensions, breakpoints, useBrand } from 'zero-to-app';

function ResponsiveLayout() {
  const dimensions = useDimensions();
  const brand = useBrand();
  const isDesktop = dimensions.width >= breakpoints.medium;
  
  return (
    <View style={{
      flexDirection: isDesktop ? 'row' : 'column',
      padding: isDesktop ? brand.spacing.xxxl : brand.spacing.xl,
      gap: brand.spacing.lg
    }}>
      {/* Content */}
    </View>
  );
}
```

### Pattern 5: List with Actions

```typescript
import { List, ListButton, ListDivider } from 'zero-to-app';

function SettingsList() {
  return (
    <List>
      <ListButton text="Profile" icon="user" onPress={openProfile} />
      <ListButton text="Settings" icon="settings" onPress={openSettings} />
      <ListDivider />
      <ListButton text="Logout" icon="log-out" onPress={handleLogout} />
    </List>
  );
}
```

---

## Customization Points

### Brand Customization

**Brand Configuration is Required**
All brand values must be provided when calling `createBrand()`. There are no defaults - this ensures the design system is fully reusable without embedded brand assumptions.

```typescript
// Complete brand configuration required
const brand = createBrand({
  name: 'My App',
  colors: {
    primary: '#ff0000',
    secondary: '#00ff00',
    backgroundColor: '#ffffff',
  },
  fontSizes: {
    small: 12,
    medium: 14,
    large: 18,
    xlarge: 24,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 40,
  },
  borderRadius: 8,
  logo: {
    light: require('./assets/logo-light.png'),
    dark: require('./assets/logo-dark.png'),
  },
});
```

**White-Labeling Support:**
Create different brands for different clients/products - each must provide all values:
```typescript
// Client A brand - all values required
const clientABrand = createBrand({
  name: 'Client A App',
  colors: { primary: '#ff0000', secondary: '#00ff00', backgroundColor: '#ffffff' },
  fontSizes: { small: 12, medium: 14, large: 18, xlarge: 24 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 20, xl: 24, xxl: 28, xxxl: 44 },
  borderRadius: 8,
  navigation: {
    items: [
      { route: '/(tabs)/home', title: 'Home', icon: { web: 'home', mobile: 'house' } },
      { route: '/(tabs)/dashboard', title: 'Dashboard', icon: { web: 'grid', mobile: 'square.grid.2x2' } },
    ],
  },
});

// Client B brand - all values required
const clientBBrand = createBrand({
  name: 'Client B App',
  colors: { primary: '#0000ff', secondary: '#ffff00', backgroundColor: '#f5f5f5' },
  fontSizes: { small: 14, medium: 16, large: 20, xlarge: 26 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 40 },
  borderRadius: 16,
  navigation: {
    items: [
      { route: '/(tabs)/main', title: 'Main', icon: { web: 'home', mobile: 'house' } },
      { route: '/(tabs)/profile', title: 'Profile', icon: { web: 'user', mobile: 'person' } },
    ],
  },
});

// Use based on configuration
<ZeroToApp brand={getClientBrand()}>
  <App />
</ZeroToApp>
```

**Accessing Brand in Components:**
Always use the `useBrand()` hook to access brand values:
```typescript
import { useBrand } from 'zero-to-app';

function MyComponent() {
  const brand = useBrand();
  // Use brand.colors, brand.spacing, etc.
}
```

### Theme Customization

Edit `theme/themeConfig.ts` to customize:

- **Light Theme:** `lightTheme` object
- **Dark Theme:** `darkTheme` object
- **Theme Values:** Colors, backgrounds, borders, etc.

### Component Customization

- **UI Components:** Edit files in `components/ui/` (e.g., `components/ui/Button.tsx`)
- **Composite Components:** Edit files in `components/{category}/` (e.g., `components/layout/WebPageLayout.tsx`)

---

## Component Props Reference

### StyledText

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fontSize` | `'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Font size |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `color` | `string` | theme color | Text color |
| `bold` | `boolean` | `false` | Bold text |
| `muted` | `boolean` | `false` | Muted gray color |
| `uppercase` | `boolean` | `false` | Uppercase text |
| `numberOfLines` | `number` | undefined | Limit text lines |

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Button text |
| `onPress` | `(event) => void` | required | Press handler |
| `secondary` | `boolean` | `false` | Secondary style (outlined) |
| `loading` | `boolean` | `false` | Show loading spinner |
| `icon` | `{ library, name, size?, color? }` | undefined | Icon config |
| `iconPosition` | `'left' \| 'right'` | `'right'` | Icon position |

### FormInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `control` | `Control<T>` | required | React Hook Form control |
| `name` | `Path<T>` | required | Field name |
| `placeholder` | `string` | required | Placeholder text |
| `error` | `FieldError` | undefined | Validation error |
| `secureTextEntry` | `boolean` | `false` | Password input |
| `keyboardType` | `'default' \| 'email-address' \| 'numeric' \| 'phone-pad' \| 'number-pad'` | `'default'` | Keyboard type |
| `autoCapitalize` | `'none' \| 'sentences' \| 'words' \| 'characters'` | `'sentences'` | Auto capitalize |

### Tile

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | `string \| number` | required | Image source |
| `title` | `string` | required | Tile title |
| `subtitle` | `string` | undefined | Tile subtitle |
| `onPress` | `() => void` | undefined | Press handler |
| `width` | `number \| { mobile: number, web: number }` | responsive | Tile width |
| `imageHeight` | `number \| { mobile: number, web: number }` | responsive | Image height |

---

## Dependencies

- `react-native`: Core React Native components
- `@expo/vector-icons`: Icon library (Feather, MaterialIcons, etc.)
- `react-hook-form`: Form validation (for `FormInput`)
- `expo-blur`: Blur effects (for `BlurButton`, `ArrowButton`)

---

## TypeScript Support

All components are fully typed. Import types as needed:

```typescript
import type { ThemeContextType, DimensionsInfo } from 'zero-to-app';
```
