# Random Process Illustration

A web application for simulating and visualizing random processes, allowing users to observe how different parameters affect the behavior of these processes over time.

## Features

- **Process Selection**: Choose from various types of random processes (coin flip, dice roll)
- **Parameter Adjustment**: Modify the number of trials
- **Visualization**: Graphical representations including histograms and convergence charts
- **Real-time Updates**: Visualizations update instantly as parameters change
- **Extensible Architecture**: Modular design allows easy addition of new random processes

## Project Structure

```
random-process/
├── frontend/          # React.js application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── ProcessSelector.tsx
│   │   │   ├── ParameterControls.tsx
│   │   │   ├── VisualizationArea.tsx
│   │   │   └── Footer.tsx
│   │   ├── processes/           # Modular process abstractions
│   │   │   ├── types.ts         # Core interfaces
│   │   │   ├── CoinFlipProcess.ts
│   │   │   ├── DiceRollProcess.ts
│   │   │   ├── index.ts         # Process registry
│   │   │   └── *.test.ts        # Unit tests
│   │   ├── App.tsx
│   │   ├── App.test.tsx
│   │   └── index.tsx
│   └── package.json
├── backend/           # Node.js server
│   ├── src/
│   │   └── index.js
│   └── package.json
├── docker-compose.yml # Docker configuration
├── specs.md           # Application specifications
└── README.md          # This file
```

## Getting Started

### Option 1: Docker (Recommended)

The easiest way to run the application is using Docker:

```bash
docker compose up --build
```

This will start both the frontend and backend services. Open [http://localhost:3000](http://localhost:3000) in your browser.

To stop the containers:
```bash
docker compose down
```

### Option 2: Manual Setup

#### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

#### Installation

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express
- **Visualization**: Chart.js with react-chartjs-2
- **Testing**: Jest with React Testing Library
- **Styling**: CSS
- **Containerization**: Docker

## Testing

Run the test suite:

```bash
cd frontend
npm test
```

Run tests with coverage:

```bash
cd frontend
npm test -- --coverage
```

## Adding New Random Processes

The application is designed with extensibility in mind. To add a new random process:

1. Create a new class in `frontend/src/processes/` implementing the `RandomProcess` interface:

```typescript
import { RandomProcess, ProcessConfig } from './types';

export class MyNewProcess implements RandomProcess<MyResultType> {
  config: ProcessConfig = {
    id: 'my-new-process',
    name: 'My New Process',
    description: 'Description of my process',
  };

  runTrial(): MyResultType {
    // Implementation
  }

  getOutcomes(): MyResultType[] {
    // Return all possible outcomes
  }

  getExpectedValue(): number {
    // Return expected value
  }

  // ... other required methods
}
```

2. Register the process in `frontend/src/processes/index.ts`:

```typescript
import { MyNewProcess } from './MyNewProcess';
const myProcess = new MyNewProcess();
processRegistry.set(myProcess.config.id, myProcess);
```

3. Update `VisualizationArea.tsx` to handle the new process visualization.

## Usage

1. Select a random process from the dropdown menu
2. Click "Run Trial" to execute a single trial
3. Use "+10", "+100", "+1000" buttons to run multiple trials at once
4. Click "Reset" to clear all trials and start over

The visualization shows:
- A histogram of the outcomes distribution
- A convergence chart showing observed values approaching expected values
- Summary statistics and recent trial results
