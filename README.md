# Customizable SVG Icon generator

A simple web-based **Customizable SVG Icon generator** build with **next.js**. It allows user to pick a predefined icon, change its color, and size. After that download or copy the generated SVG.


## Feature 
- Choose from predefined set of icons
- Change icon color dynamically
- Select icon size from 32px - 256px
- Live preview generated SVG
- Download generated SVG
- Copy directly generated SVG to clipboad


## Setup

### 1. Clone this repository 
### 2.  Install dependencies 

```bash
npm install
# or 
yarn install 
```

### 3. Run the development server

```bash
npm run dev
# or 
yarn dev
```

Your app will be avaible at:
[http://localhost:3000/](http://localhost:3000/)

## Usage 

1. Select an icon from dropdown.
2. Pick a clor with the color picker.
3. Choose a size from the dropdown.
4. preview updates instanly in the preview box.
5. Click download SVG to download or Copy SVG to copy 


## Adding Your Own SVG Icon 

You can add custom SVGs icon by editing **`src/utils/icons.ts`**

1. Place your svg inside `public/icons/`
2. Open `src/utils/icons.ts` and add it to the map:

```ts
export const ICONS = ['Download','Camera', 'Car', 'Custom'] as const // Your custom icon

export type IconKey = typeof ICONS[number]

export const ICON_PATHS: Record<IconKey, string> = {
    Download: '/icons/download.svg',
    Camera: '/icons/camera.svg',
    Car: '/icons/car.svg',
    Custom: '/icons/custom.svg' // Your custom icon
}

```

