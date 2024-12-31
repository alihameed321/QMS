# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
# QMS Client (Quality Management System)

A modern React-based frontend application for managing educational institution data, built with TypeScript and Vite.

## Overview

The QMS Client is a sophisticated frontend application designed for educational institutions to manage their departments, courses, students, and attendance tracking. Built with modern web technologies, it provides a seamless and intuitive user interface for administrators, responsible, and students.

## Features

### 1. User Management
- **Authentication**
  - JWT-based secure authentication
  - Token refresh mechanism
  - Secure logout handling
  - Role-based access control

- **Profile Management**
  - User profile viewing and editing
  - Profile picture upload
  - Contact information management
  - Department association

### 2. Department Management
- Department creation and editing
- Department staff assignment
- Course allocation
- Department-wise reporting

### 3. Course Management
- **Course Operations**
  - Course creation and modification
  - Responsible assignment
  - Student enrollment
  - Course scheduling

- **Course Features**
  - Course materials management
  - Student progress tracking
  - Course statistics

### 4. Student Management
- **Student Records**
  - Student registration
  - Profile management
  - Course enrollment
  - Academic history

- **Performance Tracking**
  - Attendance monitoring
  - Progress reports
  - Performance analytics

### 5. Attendance System
- **Tracking Features**
  - Real-time attendance marking
  - Multiple attendance states (Present, Tardy, Absent)
  - Attendance reports generation
  - Student availability management

## Technical Stack

### Core Technologies
- React 18.3.1
- TypeScript 5.6.2
- Vite 6.0.5

### Key Dependencies
- react-router-dom 7.1.1 (Routing)
- axios 1.7.9 (API communication)
- ESLint 9.17.0 (Code quality)

## Project Structure

```
client/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── additional/      # Additional UI elements
│   │   └── features/        # Feature-specific components
│   │
│   ├── pages/               # Page components
│   │   ├── attendance/      # Attendance management
│   │   ├── class/          # Class management
│   │   ├── course/         # Course management
│   │   ├── department/     # Department management
│   │   ├── home/          # Dashboard/Home
│   │   ├── student/       # Student management
│   │   └── user/          # User/Profile management
│   │
│   ├── services/           # API services
│   │   ├── api.ts         # Base API configuration
│   │   ├── authService.ts # Authentication
│   │   ├── courseService.ts
│   │   ├── departmentService.ts
│   │   ├── studentService.ts
│   │   └── userService.ts
│   │
│   ├── types/             # TypeScript definitions
│   ├── routes/            # Route configurations
│   ├── assets/            # Static assets
│   └── utils/             # Utility functions
│
├── public/                # Public assets
└── index.html            # Entry point
```

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd qms/client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_JWT_SECRET=your_jwt_secret
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Development Guidelines

### 1. Code Organization
- Use feature-based folder structure
- Keep components small and focused
- Implement proper TypeScript types
- Follow React best practices

### 2. Component Structure
```typescript
import React from 'react';

interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    // JSX
  );
};

export default Component;
```

### 3. API Integration
```typescript
// Example service implementation
import api from './api';

export const serviceExample = {
  getAll: async () => {
    const response = await api.get('/endpoint');
    return response.data;
  },
  
  create: async (data: DataType) => {
    const response = await api.post('/endpoint', data);
    return response.data;
  }
};
```

### 4. State Management
- Use React hooks effectively
- Implement proper error handling
- Handle loading states
- Maintain clean component lifecycle

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. The build output will be in the `dist` directory

3. Deploy using your preferred hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the established code style
2. Write meaningful commit messages
3. Create feature branches
4. Submit pull requests for review

## Troubleshooting

Common issues and solutions:

1. **Authentication Issues**
   - Check token expiration
   - Verify API endpoint configuration
   - Clear browser cache

2. **Build Issues**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify environment variables

## License

This project is proprietary and confidential. All rights reserved.
