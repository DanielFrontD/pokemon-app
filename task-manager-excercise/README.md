# Task Management Solution for Content Moderators

This document outlines the proposed solution for a task management board intended for the social media content moderation department, aiming to replace the current inefficient tracking based on WhatsApp.

## Current Problem and Objective

- **Problem**: Moderators handle tasks (responding to comments, communicating with potential clients) via WhatsApp, leading to poor tracking and the neglect of some crucial assignments.

- **Objective**: To develop a centralized solution for the management, tracking, and prioritization of moderation and communication tasks.

## Solution Requirements (Task Board)

The development team must build an application that displays tasks in a tabular format with key functionalities for efficient management.

### Table Structure

Tasks must be listed in a table containing the following main columns:

| Column | Description |
|--------|-------------|
| Title | Brief title of the task (e.g., "Respond to DM about product X") |
| Description | Detailed description of the task |
| Status | Current status of the task (e.g., Pending, In Progress, Completed) |
| Due Date | Deadline for the task's completion |
| Assignee | Column to indicate the person responsible for the task |
| Actions | Column allowing the modification or deletion of the task |

### Required Functionalities

1. **Add Task**: A visible button must exist to add new tasks to the table.

2. **Task Modification**: The Actions column must allow:
   - Editing the title and description
   - Modifying the status
   - Assigning a responsible party (moderator)
   - Updating the due date

3. **Task Deletion**: The Actions column must include the option to permanently delete a task.

4. **Prioritization and Ordering**: The data must be ordered in the table according to the task's priority (priority must be a key field in the backend to ensure this ordering).

------------------------------------------------------------------------------------------------------------------------------------------------------------
# Development process:

I would use a AI-DLC approach for this, so this can be the prompts:

- Analyze the problem indicated in the document, and create a development plan where we will use ReactJS as the main framework, think of a simple but scalable solution where each UI element has a well-defined and specific logic.

LLM Response:

## Development Plan - Task Management Board

### Architecture Overview
- **Frontend**: React.js with functional components and hooks
- **State Management**: React Context API for global state
- **Styling**: CSS modules or styled-components for component isolation
- **Data Layer**: Local state with localStorage persistence (expandable to API)

### Component Structure

#### 1. App Component
- Main container managing global state
- Handles task CRUD operations
- Provides context to child components

#### 2. TaskBoard Component
- Renders the main table interface
- Manages table sorting and filtering
- Contains AddTaskButton and TaskTable

#### 3. TaskTable Component
- Displays tasks in tabular format
- Handles row rendering and actions
- Manages inline editing states

#### 4. TaskRow Component
- Individual task representation
- Toggle between view/edit modes
- Contains action buttons (edit, delete)

#### 5. TaskForm Component
- Modal/form for adding new tasks
- Validation and submission logic
- Reusable for both add and edit operations

#### 6. StatusDropdown Component
- Dropdown for status selection
- Predefined status options (Pending, In Progress, Completed)

### Data Model
```javascript
{
  id: string,
  title: string,
  description: string,
  status: 'pending' | 'in-progress' | 'completed',
  dueDate: Date,
  assignee: string,
  priority: number,
  createdAt: Date
}
```

### Implementation Priority
1. Basic table with static data
2. Add task functionality
3. Edit/delete operations
4. Status management
5. Priority-based sorting
6. Due date handling
7. Assignee management

------------------------------------------------------------------------------------------------------------------------------------------------------------
# HUMAN Review:

After read the LLM response I only ask for change:

- Consider that the task can observed or cancelled.

LLM Response:

## Updated Data Model and Status Management

### Enhanced Status Options
The task status should be updated to include the new states:

```javascript
status: 'pending' | 'in-progress' | 'completed' | 'observed' | 'cancelled'
```

### Updated Data Model
```javascript
{
  id: string,
  title: string,
  description: string,
  status: 'pending' | 'in-progress' | 'completed' | 'observed' | 'cancelled',
  dueDate: Date,
  assignee: string,
  priority: number,
  createdAt: Date,
  statusHistory: Array<{status: string, timestamp: Date, updatedBy: string}>
}
```

### Status Workflow
- **Observed**: Task is being monitored but no action required yet
- **Cancelled**: Task has been cancelled and will not be completed
- Status transitions should be tracked in statusHistory for audit purposes

### UI Updates Required
- StatusDropdown component needs the two additional options
- Task filtering should include observed and cancelled states
- Visual indicators (colors/icons) for the new statuses

------------------------------------------------------------------------------------------------------------------------------------------------------------
# HUMAN Review:

After read the LLM response I only ask for the folder structure:

- Add a folder structure of this react software

LLM Response:

## Project Folder Structure

```
task-management-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TaskBoard/
│   │   │   ├── TaskBoard.jsx
│   │   │   └── TaskBoard.module.css
│   │   ├── TaskTable/
│   │   │   ├── TaskTable.jsx
│   │   │   └── TaskTable.module.css
│   │   ├── TaskRow/
│   │   │   ├── TaskRow.jsx
│   │   │   └── TaskRow.module.css
│   │   ├── TaskForm/
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskForm.module.css
│   │   ├── StatusDropdown/
│   │   │   ├── StatusDropdown.jsx
│   │   │   └── StatusDropdown.module.css
│   │   └── common/
│   │       ├── Button/
│   │       │   ├── Button.jsx
│   │       │   └── Button.module.css
│   │       └── Modal/
│   │           ├── Modal.jsx
│   │           └── Modal.module.css
│   ├── context/
│   │   └── TaskContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useTasks.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validation.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
├── package-lock.json
└── README.md
```

### Folder Structure Explanation

- **components/**: Organized by feature with co-located CSS modules
- **context/**: Global state management using React Context
- **hooks/**: Custom hooks for reusable logic
- **utils/**: Helper functions, constants, and validation logic
- **styles/**: Global styles and CSS variables

------------------------------------------------------------------------------------------------------------------------------------------------------------
# HUMAN Review:

After read the LLM response I think everything looks good, so lets proceed with the next step:

- Now, do the implementation, for now just add the code of the most important components with some sample data

LLM Response:

## Core Components Implementation

### 1. TaskContext.jsx
```javascript
import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

const sampleTasks = [
  {
    id: '1',
    title: 'Respond to DM about product X',
    description: 'Customer asking about pricing and availability',
    status: 'pending',
    dueDate: new Date('2024-01-15'),
    assignee: 'John Doe',
    priority: 1,
    createdAt: new Date('2024-01-10')
  },
  {
    id: '2',
    title: 'Review flagged comment',
    description: 'Comment reported for inappropriate content',
    status: 'in-progress',
    dueDate: new Date('2024-01-12'),
    assignee: 'Jane Smith',
    priority: 2,
    createdAt: new Date('2024-01-11')
  }
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(sampleTasks);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
```

### 2. App.jsx
```javascript
import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskBoard from './components/TaskBoard/TaskBoard';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="App">
        <header className="App-header">
          <h1>Task Management Board</h1>
        </header>
        <main>
          <TaskBoard />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
```

### 3. TaskBoard.jsx
```javascript
import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskTable from '../TaskTable/TaskTable';
import TaskForm from '../TaskForm/TaskForm';
import Button from '../common/Button/Button';
import styles from './TaskBoard.module.css';

const TaskBoard = () => {
  const { tasks } = useTasks();
  const [showForm, setShowForm] = useState(false);

  const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);

  return (
    <div className={styles.taskBoard}>
      <div className={styles.header}>
        <h2>Tasks ({tasks.length})</h2>
        <Button onClick={() => setShowForm(true)}>
          Add Task
        </Button>
      </div>

      <TaskTable tasks={sortedTasks} />

      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onSubmit={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default TaskBoard;
```

### 4. TaskTable.jsx
```javascript
import React from 'react';
import TaskRow from '../TaskRow/TaskRow';
import styles from './TaskTable.module.css';

const TaskTable = ({ tasks }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Assignee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
```

### 5. TaskRow.jsx
```javascript
import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import StatusDropdown from '../StatusDropdown/StatusDropdown';
import Button from '../common/Button/Button';
import styles from './TaskRow.module.css';

const TaskRow = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);

  const handleSave = () => {
    updateTask(task.id, editData);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    updateTask(task.id, { status: newStatus });
  };

  return (
    <tr className={styles.taskRow}>
      <td>
        {isEditing ? (
          <input
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
          />
        ) : (
          task.title
        )}
      </td>
      <td>
        {isEditing ? (
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
          />
        ) : (
          task.description
        )}
      </td>
      <td>
        <StatusDropdown
          value={task.status}
          onChange={handleStatusChange}
        />
      </td>
      <td>{task.dueDate.toLocaleDateString()}</td>
      <td>{task.assignee}</td>
      <td className={styles.actions}>
        {isEditing ? (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button onClick={() => deleteTask(task.id)}>Delete</Button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TaskRow;
```
------------------------------------------------------------------------------------------------------------
# HUMAN Review:

After read the LLM response I think everything looks good, I would only make sure this implementation consider authentication:

- How can we be sure that a user with enough permissions, are performing certain actions? add some sample validation to view the role of the log user

LLM Response:

## Authentication and Role-Based Access Control

### User Context with Roles
```javascript
// context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const sampleUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@company.com',
  role: 'admin', // 'admin', 'moderator', 'viewer'
  permissions: ['create', 'edit', 'delete', 'assign']
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(sampleUser);

  const hasPermission = (action) => {
    return user?.permissions?.includes(action) || false;
  };

  const canEditTask = (task) => {
    if (user.role === 'admin') return true;
    if (user.role === 'moderator') return task.assignee === user.name;
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, hasPermission, canEditTask }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Protected TaskRow Component
```javascript
// Updated TaskRow.jsx with permission checks
import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import StatusDropdown from '../StatusDropdown/StatusDropdown';
import Button from '../common/Button/Button';
import styles from './TaskRow.module.css';

const TaskRow = ({ task }) => {
  const { updateTask, deleteTask } = useTasks();
  const { hasPermission, canEditTask } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(task);

  const canEdit = canEditTask(task);
  const canDelete = hasPermission('delete');

  const handleSave = () => {
    if (!canEdit) return;
    updateTask(task.id, editData);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    if (!canEdit) return;
    updateTask(task.id, { status: newStatus });
  };

  const handleDelete = () => {
    if (!canDelete) return;
    deleteTask(task.id);
  };

  return (
    <tr className={styles.taskRow}>
      <td>{isEditing && canEdit ? (
        <input 
          value={editData.title}
          onChange={(e) => setEditData({...editData, title: e.target.value})}
        />
      ) : task.title}</td>
      
      <td>{isEditing && canEdit ? (
        <textarea 
          value={editData.description}
          onChange={(e) => setEditData({...editData, description: e.target.value})}
        />
      ) : task.description}</td>
      
      <td>
        <StatusDropdown 
          value={task.status} 
          onChange={handleStatusChange}
          disabled={!canEdit}
        />
      </td>
      
      <td>{task.dueDate.toLocaleDateString()}</td>
      <td>{task.assignee}</td>
      
      <td className={styles.actions}>
        {isEditing ? (
          <>
            <Button onClick={handleSave} disabled={!canEdit}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : (
          <>
            {canEdit && <Button onClick={() => setIsEditing(true)}>Edit</Button>}
            {canDelete && <Button onClick={handleDelete}>Delete</Button>}
          </>
        )}
      </td>
    </tr>
  );
};

export default TaskRow;
```

### Role-Based Permissions
- **Admin**: Full access (create, edit, delete, assign)
- **Moderator**: Can edit own tasks, view all tasks
- **Viewer**: Read-only access

### Security Features
- Permission validation before actions
- UI elements disabled/hidden based on roles
- Task ownership validation for moderators
