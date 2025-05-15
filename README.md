# Storm Project

A Vue.js 3 project built with Vite and SCSS for styling.

## Prerequisites

Before you begin, ensure you have the following installed:

### Windows

- Node.js (version 14.0.0 or higher)
  - Download from [Node.js official website](https://nodejs.org/)
  - npm comes bundled with Node.js
- Git for Windows
  - Download from [Git for Windows](https://gitforwindows.org/)

### Mac

- Node.js (version 14.0.0 or higher)
  - Using Homebrew: `brew install node`
  - Or download from [Node.js official website](https://nodejs.org/)
- Git
  - Using Homebrew: `brew install git`
  - Or comes pre-installed on macOS

## Installation

### Windows

1. Open Command Prompt or PowerShell
2. Clone the repository:

```bash
git clone [repository-url]
cd storm_project
```

3. Install dependencies:

```bash
npm install
```

### Mac

1. Open Terminal
2. Clone the repository:

```bash
git clone [repository-url]
cd storm_project
```

3. Install dependencies:

```bash
npm install
```

## Development

### Windows

To start the development server:

```bash
# Using Command Prompt or PowerShell
npm run dev
```

### Mac

To start the development server:

```bash
# Using Terminal
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Building for Production

### Windows

```bash
# Using Command Prompt or PowerShell
npm run build
```

### Mac

```bash
# Using Terminal
npm run build
```

This will create a `dist` directory with the optimized production build.

## Deployment

The project is configured for deployment to GitHub Pages. To deploy:

### Windows

```bash
# Using Command Prompt or PowerShell
npm run deploy
```

### Mac

```bash
# Using Terminal
npm run deploy
```

This will:

1. Build the project (`npm run build`)
2. Deploy the contents of the `dist` directory to GitHub Pages

## Project Structure

- `src/` - Source files
- `public/` - Static assets
- `dist/` - Production build output
- `node_modules/` - Project dependencies

## Technologies Used

- Vue.js 3
- Vite
- Pinia (State Management)
- SCSS (Styling)
- GitHub Pages (Deployment)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run deploy` - Deploy to GitHub Pages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
