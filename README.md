# To-Do List App

A modern, responsive React-based task management application built with Vite. Features a clean interface for creating, organizing, and managing tasks with date/time scheduling, priority levels, and multiple view modes.

## Features

- **Task Management**: Create, edit, complete, and delete tasks
- **Multiple Views**: Home (active tasks), Completed tasks, and Trash
- **Date & Time Scheduling**: Set custom dates and times for tasks
- **Priority System**: Organize tasks by priority levels (high, medium, low)
- **Search Functionality**: Search tasks by title or description
- **Responsive Design**: Mobile-friendly interface with collapsible sidebar
- **Local Storage**: Tasks persist in browser local storage
- **Task Filtering**: Filter and sort tasks by date, priority, or title

## Project Structure

```
src/
├── components/
│   ├── form/
│   │   ├── AddTaskForm.jsx       # Task creation form
│   │   └── DateTimePicker.jsx    # Date/time input component
│   ├── layout/
│   │   ├── Header.jsx            # Page header component
│   │   └── Sidebar.jsx           # Navigation sidebar
│   ├── task/
│   │   ├── TaskCard.jsx          # Individual task display
│   │   ├── TaskEditor.jsx        # Task editing interface
│   │   ├── TaskList.jsx          # Task list container
│   │   ├── TaskOptions.jsx       # Task action buttons
│   │   └── TaskViewer.jsx        # Task detail view
│   └── ui/
│       ├── Button.jsx            # Reusable button component
│       ├── CreateNewButton.jsx   # Add task button
│       ├── Overlay.jsx           # Modal overlay
│       └── SearchInput.jsx       # Search input component
├── context/
│   └── TaskContext.jsx           # Global task state management
├── hooks/
│   ├── useLocalStorage.js        # Local storage hook
│   └── useResponsive.js          # Responsive design hook
├── pages/
│   ├── CompletedPage.jsx         # Completed tasks view
│   ├── HomePage.jsx              # Active tasks view
│   └── TrashPage.jsx             # Deleted tasks view
├── styles/                       # CSS modules for styling
├── utils/
│   └── dateUtils.jsx             # Date formatting utilities
├── App.jsx                       # Main application component
└── main.jsx                      # Application entry point
```

## Tech Stack

- **React 19.0.0** - UI framework
- **React Router 7.4.1** - Client-side routing
- **Vite 6.2.0** - Build tool and development server
- **Lucide React** - Icon library
- **React DatePicker** - Date selection component

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development URL

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Components

### TaskContext
Global state management using React Context and useReducer for:
- Task CRUD operations
- Task filtering and sorting
- Local storage persistence

### Task Features
- **Title & Description**: Basic task information
- **Date/Time**: Optional scheduling with custom date/time picker
- **Priority Levels**: High, medium, low priority classification
- **Status States**: Active, completed, deleted (trash)
- **Search**: Filter tasks by title or description content

### Responsive Design
- Mobile-first approach with collapsible sidebar
- Adaptive layout for different screen sizes
- Touch-friendly interface elements

## Storage

Tasks are automatically saved to browser local storage and persist between sessions. No backend or database required.