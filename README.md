# Personal Scheduler App

A modern, minimalist personal scheduler and task management application designed to help you organize your day effectively. Built with React and Firebase.

## Features

- **📊 Dashboard Overview**: Get a quick glimpse of your daily progress and upcoming tasks.
- **📅 Interactive Planner**: visually manage your sessions and tasks.
- **🔐 Secure Authentication**: User sign-up and login powered by Firebase Auth.
- **💾 Real-time Persistence**: Your data is stored securely and syncs across devices using Firebase Firestore.
- **🌓 Modern UI**: A clean, distraction-free interface with a focus on usability.
- **⚡️ Fast Performance**: Powered by Vite for lightning-fast development and production builds.

## Tech Stack

- **Frontend**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Design System)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Backend/Auth**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jitendra1282/sheduler_personal.git
   cd scheduler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Project Structure

```
scheduler/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context (Auth, etc.)
│   ├── hooks/           # Custom React Hooks
│   ├── pages/           # Application Pages (Dashboard, Planner, Login)
│   ├── firebase.js      # Firebase configuration
│   ├── main.jsx         # Application entry point
│   └── App.jsx          # Root component and Routing
├── vanilla-prototype/   # Initial HTML/CSS prototype
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
