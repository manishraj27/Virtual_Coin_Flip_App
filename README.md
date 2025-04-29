# Virtual Coin Flip

![Virtual Coin Flip](public/coin-preview.png)

A modern, interactive virtual coin flip application built with React and TypeScript. Make decisions between two options with a beautifully animated 3D coin and cryptographically secure randomness.

## 🌟 Features

- **Realistic 3D Coin Animation**: Smooth, visually appealing coin flip animation
- **Cryptographically Secure Randomness**: Uses advanced entropy sources and the Web Crypto API
- **Custom Options**: Enter your own options instead of just heads or tails
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Sound Effects**: Optional sound effects for an immersive experience
- **Accessibility**: Designed with accessibility in mind
- **Dark Mode**: Easy on the eyes with a sleek dark interface

## 🔍 Live Demo

Check out the live application at [https://virtualcoinflip.vercel.app/](https://virtualcoinflip.vercel.app/)

## 🧪 Advanced Randomness

Our coin flip uses multiple layers of entropy to ensure truly random results:

- **Web Crypto API**: Hardware-based cryptographically secure random number generation
- **Entropy Pool**: Constantly refreshing pool of random values
- **Temporal Entropy**: High-precision timestamps and counters for additional unpredictability
- **Entropy Mixing**: Bitwise operations and circular bit rotation to combine entropy sources

Learn more about our randomness implementation in the app's "How Random Is It?" section.

## 🛠️ Technologies Used

- React
- TypeScript
- Tailwind CSS
- GSAP (GreenSock Animation Platform)
- Web Crypto API
- Vite

## 📋 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone hhttps://github.com/manishraj27/Virtual_Coin_Flip_App
   cd Virtual_Coin_Flip_App

2. Install dependencies

    ```bash
    npm install

3. Start the development server

    ```bash
    npm run dev

Open your browser and navigate to http://localhost:5173

## 📱 Usage
1. Enter your two options (defaults to "Heads" and "Tails")
2. Click the "Flip" button
3. Watch the coin animation
4. See your result!