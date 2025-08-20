# CashOn Admin Theme Documentation

## Overview
This theme is based on the CashOn Figma design system and provides a comprehensive dark financial interface with excellent contrast and clear visual hierarchy.

## Color Palette

### Brand Colors
- **Primary**: `#3AF4BD` - Bright green/cyan for primary actions and success states
- **Background**: `#151517` - Deep charcoal main background
- **Surface**: `#212123` - Dark gray for cards and containers

### Usage Examples

#### CSS Custom Properties
```css
.my-element {
  background: var(--primary);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

#### Tailwind Classes
```tsx
<div className="bg-surface border border-border text-text-primary">
  <h1 className="text-hero text-primary">₦245,890.00</h1>
  <p className="text-body text-text-secondary">Total Revenue</p>
</div>
```

## Typography Scale

### Font Sizes
- **Hero**: 56px - For large financial amounts
- **H1**: 30px - Page titles
- **H2**: 28px - Section headers
- **H3**: 24px - Card titles
- **Body Large**: 18px - Important text
- **Body**: 16px - Standard text
- **Body Small**: 14px - Secondary text
- **Caption**: 12px - Labels and captions
- **Tiny**: 10px - Micro text (uppercase)

### Usage Examples
```tsx
{/* Hero numbers */}
<span className="text-hero font-semibold text-primary">₦2,563,975,897.00</span>

{/* Section headers */}
<h2 className="text-h2 font-medium text-text-primary">Recent Transactions</h2>

{/* Body text */}
<p className="text-body text-text-secondary">Last updated 5 minutes ago</p>

{/* Captions */}
<span className="text-caption text-text-muted">Transaction ID</span>
```

## Status Colors & Components

### Status Badges
```tsx
{/* Success */}
<span className="badge-success">
  <div className="w-2 h-2 bg-success rounded-full"></div>
  Successful
</span>

{/* Warning */}
<span className="badge-warning">
  <div className="w-2 h-2 bg-warning rounded-full"></div>
  Pending
</span>

{/* Error */}
<span className="badge-error">
  <div className="w-2 h-2 bg-error rounded-full"></div>
  Failed
</span>
```

### Status Colors
- **Success**: `#05B480` - Green for successful transactions
- **Warning**: `#FFB45E` - Orange for pending states
- **Error**: `#EE6868` - Red for failed states
- **Info**: `#7987FF` - Blue for informational states

## Component Styles

### Cards
```tsx
{/* Primary card */}
<div className="card">
  <h3 className="text-h3 text-text-primary mb-4">Total Deposits</h3>
  <p className="text-hero text-primary">₦245,890.00</p>
</div>

{/* Secondary card */}
<div className="card-secondary">
  <p className="text-body text-text-secondary">Content here</p>
</div>
```

### Buttons
```tsx
{/* Primary button */}
<button className="btn-primary">
  Save Changes
</button>

{/* Secondary button */}
<button className="btn-secondary">
  Cancel
</button>
```

### Tables
```tsx
<table className="w-full">
  <thead>
    <tr className="bg-surface-secondary">
      <th className="text-caption text-text-muted uppercase tracking-wider p-4">
        User
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border">
      <td className="text-body text-text-primary p-4">
        Daniel Owolabi
      </td>
    </tr>
  </tbody>
</table>
```

## Spacing System

Based on 8px grid system:
- **XS**: 4px - `space-xs` or `p-1`
- **SM**: 8px - `space-sm` or `p-2`
- **MD**: 12px - `space-md` or `p-3`
- **LG**: 16px - `space-lg` or `p-4`
- **XL**: 20px - `space-xl` or `p-5`
- **2XL**: 24px - `space-2xl` or `p-6`
- **3XL**: 32px - `space-3xl` or `p-8`

## Border Radius

- **Small**: 4px - `rounded-sm`
- **Medium**: 8px - `rounded-md`
- **Large**: 14px - `rounded-lg`
- **XL**: 16px - `rounded-xl`
- **2XL**: 24px - `rounded-2xl`
- **3XL**: 30px - `rounded-3xl`

## Shadows

- **Small**: `shadow-cashon-sm` - Subtle card shadows
- **Medium**: `shadow-cashon-md` - Standard elevation
- **Large**: `shadow-cashon-lg` - High elevation

## Implementation Tips

### 1. Financial Amounts
Always use the hero font size for large monetary values:
```tsx
<span className="text-hero font-semibold text-primary">
  ₦{amount.toLocaleString()}
</span>
```

### 2. Charts and Data Visualization
Use the accent colors for different data series:
- **Deposits**: `var(--blue)` or `bg-blue`
- **Withdrawals**: `var(--blue-light)` or `bg-blue-light`
- **Growth**: `var(--primary)` or `bg-primary`

### 3. Form Elements
```tsx
<input 
  className="bg-surface border border-border rounded-md px-6 py-4 text-text-primary focus:border-primary"
  placeholder="Enter amount"
/>
```

### 4. Loading States
```tsx
<div className="animate-pulse">
  <div className="h-4 bg-surface-secondary rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-surface-secondary rounded w-1/2"></div>
</div>
```

## File Structure

```
app/
  globals.css         # Main theme implementation
  globals.css.backup  # Original theme backup
tailwind.config.js    # Tailwind configuration
```

## Reverting to Original Theme

To revert to the original light/dark theme, copy the contents of `globals.css.backup` to `globals.css`.

## Browser Support

This theme uses modern CSS custom properties and is supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 16+

## Accessibility

The theme maintains WCAG AA compliance with:
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Focus indicators for interactive elements
- Proper semantic color usage
