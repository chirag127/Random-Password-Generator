# Random Password Generator

A secure, client-side password generator built with Next.js, TypeScript, and Tailwind CSS. Generate strong, customizable passwords with advanced options while maintaining complete privacy and security.

## 🔐 Features

-   **Secure Generation**: Uses `window.crypto.getRandomValues()` for cryptographically secure randomness
-   **Customizable Options**:
    -   Password length (8-128 characters)
    -   Character types (uppercase, lowercase, numbers, symbols)
    -   Exclude ambiguous characters option
-   **Real-time Strength Analysis**: Powered by zxcvbn-ts for accurate password strength assessment
-   **Local Storage**: Save and manage passwords locally in your browser
-   **Copy to Clipboard**: One-click password copying with visual feedback
-   **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
-   **Dark Mode Support**: Automatic dark/light theme based on system preferences
-   **Privacy First**: All operations performed client-side, no data transmitted to servers

## 🚀 Quick Start

### Prerequisites

-   Node.js 18.0 or later
-   npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/chirag127/Random-Password-Generator.git
cd Random-Password-Generator/random-password-generator
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
random-password-generator/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Slider.tsx
│   │   ├── Switch.tsx
│   │   └── Toaster.tsx
│   ├── PasswordDisplay.tsx
│   ├── SettingsPanel.tsx
│   ├── StrengthIndicator.tsx
│   └── SavedPasswordsList.tsx
├── hooks/                 # Custom React hooks
│   ├── useLocalStorage.ts
│   └── usePasswordStrength.ts
├── lib/                   # Utility functions
│   ├── password.ts        # Core password generation logic
│   └── utils.ts           # General utilities
├── __tests__/             # Test files
│   └── password.test.ts
├── public/                # Static assets
├── .env.example           # Environment variables template
├── jest.config.js         # Jest configuration
├── jest.setup.js          # Jest setup file
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🧪 Testing

Run the test suite:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔧 Configuration

### Environment Variables

This project doesn't require any environment variables as it operates entirely client-side. An `.env.example` file is included for convention.

### Customization

You can customize the application by modifying:

-   **Character sets**: Edit `CHARACTER_SETS` in `lib/password.ts`
-   **Default settings**: Modify `DEFAULT_SETTINGS` in `app/page.tsx`
-   **Styling**: Update Tailwind classes or modify `app/globals.css`
-   **Theme colors**: Adjust CSS variables in `app/globals.css`

## 📱 Usage

1. **Generate Password**: Click "Generate" or adjust settings to create a new password
2. **Customize Settings**:
    - Use the slider to set password length
    - Check/uncheck character types to include
    - Toggle "Exclude Ambiguous Characters" to avoid similar-looking characters
3. **Check Strength**: View real-time password strength analysis
4. **Copy Password**: Click "Copy" to copy the password to your clipboard
5. **Save Password**: Click "Save" to store the password locally
6. **Manage Saved Passwords**: View, copy, or delete saved passwords from the sidebar

## 🛡️ Security

-   **Client-Side Only**: All password generation and storage happens in your browser
-   **Cryptographically Secure**: Uses `window.crypto.getRandomValues()` for true randomness
-   **No Network Requests**: Passwords never leave your device
-   **Local Storage**: Saved passwords are stored only in your browser's local storage
-   **No Analytics**: No tracking or data collection

## 🎨 Tech Stack

-   **Framework**: Next.js 15.3.5
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: Custom components with Lucide React icons
-   **Password Strength**: zxcvbn-ts
-   **Notifications**: Sonner
-   **Testing**: Jest with jsdom
-   **Deployment**: Vercel-ready

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

-   Netlify
-   AWS Amplify
-   Railway
-   Render

Build the application:

```bash
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Chirag Singhal** ([chirag127](https://github.com/chirag127))

## 🙏 Acknowledgments

-   [zxcvbn-ts](https://github.com/zxcvbn-ts/zxcvbn) for password strength estimation
-   [Lucide](https://lucide.dev/) for beautiful icons
-   [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
-   [Next.js](https://nextjs.org/) for the React framework

---

**Last Updated**: 2025-07-12T04:47:48.583Z

**Version**: 1.0.0
