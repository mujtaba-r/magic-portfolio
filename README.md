# Magic Portfolio

A modern, customizable portfolio template built with [Next.js](https://nextjs.org) and [Once UI](https://once-ui.com). Perfect for designers and developers looking to showcase their work with a clean, professional design.

![Magic Portfolio Preview](https://once-ui.com/images/templates/magic-portfolio/cover.jpg)

## 🌟 Features

### Core Features
- 🎨 Built with Once UI v0.3.1 for consistent design and theming
- ⚡️ Next.js 14 with App Router for optimal performance
- 📱 Fully responsive design optimized for all devices
- 🌙 Dark/Light mode support
- 🔒 Password protection for specific URLs
- 🎯 SEO optimized with automatic metadata generation

### Content Management
- 📝 MDX support for blog posts and projects
- 📸 Automatic image optimization with Sharp
- 🔄 Dynamic content rendering based on configuration
- 📊 Conditional section rendering
- 🔗 Automatic social links generation

### Performance & SEO
- 🖼️ Automatic OpenGraph and X (Twitter) image generation
- 📊 Schema and metadata generation
- 🚀 Optimized image loading and lazy loading
- 📈 Built-in analytics with Vercel Analytics
- 📊 Performance insights with Vercel Speed Insights

## 🚀 Getting Started

### Prerequisites
- Node.js v18.17 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/once-ui-system/magic-portfolio.git
   cd magic-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🛠️ Customization

### Content Structure
- **Configuration**: Edit `src/app/resources/config`
- **Content**: Edit `src/app/resources/content`
- **Blog Posts**: Add `.mdx` files to `src/app/blog/posts`
- **Projects**: Add `.mdx` files to `src/app/work/projects`

### Styling
- Customize themes using [data attributes](https://once-ui.com/docs/theming)
- Modify styles in `src/app/components/*.module.scss`
- Global styles in `src/app/globals.css`

### Pre-built Designs
Try different pre-built designs by modifying imports in `src/app/resources/index.ts`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

Found a bug? Please [report it](https://github.com/once-ui-system/magic-portfolio/issues/new?labels=bug&template=bug_report.md).

## 📄 License

This project is licensed under the CC BY-NC 4.0 License - see the [LICENSE](LICENSE) file for details.

- Commercial usage is not allowed
- Attribution is required

## 🚀 Deployment

### Deploy with Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&project-name=portfolio&repository-name=portfolio&redirect-url=https%3A%2F%2Fgithub.com%2Fonce-ui-system%2Fmagic-portfolio&demo-title=Magic%20Portfolio&demo-description=Showcase%20your%20designers%20or%20developer%20portfolio&demo-url=https%3A%2F%2Fdemo.magic-portfolio.com&demo-image=https%3A%2F%2Fonce-ui.com%2Fimages%2Ftemplates%2Fmagic-portfolio%2Fcover.jpg)

### Other Deployment Options
- Netlify
- GitHub Pages
- Any static hosting service

## 👥 Authors

- **Lorant Toth**
  - [X (Twitter)](https://x.com/lorant_one)
  - [LinkedIn](https://www.linkedin.com/in/tothlorant/)

- **Zsofia Komaromi**
  - [X (Twitter)](https://x.com/zsofiakomaromi)
  - [LinkedIn](https://www.linkedin.com/in/zsofiakomaromi/)

## 🤝 Community

Join our community:
- [Once UI Discord Server](https://discord.com/invite/5EyAQ4eNdS)
- Share your portfolio with designers and developers
- Get help and support

## 📞 Support

Need help? Here are some resources:
- [Once UI Documentation](https://once-ui.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Issues](https://github.com/once-ui-system/magic-portfolio/issues)
