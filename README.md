# Random Process Illustration

A web application for simulating and visualizing random processes, allowing users to observe how different parameters affect the behavior of these processes over time.

## Features

- **Process Selection**: Choose from various types of random processes (starting with coin flip)
- **Parameter Adjustment**: Modify parameters such as number of trials and probability distributions
- **Visualization**: Graphical representations including histograms and line charts
- **Real-time Updates**: Visualizations update instantly as parameters change

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
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── package.json
├── backend/           # Node.js server
│   ├── src/
│   │   └── index.js
│   └── package.json
├── specs.md           # Application specifications
└── README.md          # This file
```

## Getting Started

### Option 1: Docker (Recommended)

The easiest way to run the application is using Docker:

```bash
docker-compose up --build
```

This will start both the frontend and backend services. Open [http://localhost:3000](http://localhost:3000) in your browser.

To stop the containers:
```bash
docker-compose down
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
- **Styling**: CSS

## Usage

1. Select a random process from the dropdown menu
2. Adjust the probability using the slider (for coin flip, this is the probability of heads)
3. Click "Flip Coin" to run a single trial
4. Use "Add Trials" to run multiple trials at once
5. Click "Reset All" to clear all trials and start over

The visualization shows:
- A histogram of the outcomes (heads vs tails)
- A line chart showing the convergence of the observed proportion to the expected probability
- Summary statistics and recent trial results
