# Random Process Illustration

This document describes in details the application to be built for illustrating random processes.

## Overview

The application will simulate and visualize random processes, allowing users to observe how different parameters affect the behavior of these processes over time. The main features will include:

- **Process Selection**: Users can choose from various types of random processes: flipping a coin, rolling a dice, sum of multiple dice (demonstrates Central Limit Theorem and normal distribution convergence), simulating π (with Monte Carlo method).
- **Parameter Adjustment**: Users can modify parameters such as the number of trials. The default is set to one, but users can add more trials as needed, keeping the already existing trials intact. Users will be able to reset parameters, resulting in the removal of all existing trials.
- **Visualization**: The application will provide graphical representations of the random processes, including histograms, line charts, and scatter plots.
- **Real-time Updates**: As users adjust parameters, the visualizations will update in real-time to reflect the changes.


## Technical Specifications
- **Frontend**: The user interface will be built using React.js for a responsive and interactive experience.
- **Backend**: A Node.js server will handle the simulation logic and data processing.
- **Data Visualization**: Libraries such as D3.js or Chart.js will be used for rendering the visualizations.
- **State Management**: Redux or Context API will be employed for managing application state.
- **Build Tools**: Provide a ready-to-use containerized environment using Docker for easy deployment and testing.
- **Testing**: Implement unit and integration tests using Jest and React Testing Library to ensure reliability. Make the tests run during the build process to catch issues early. Report test coverage and results in the build logs. Target 100% test coverage for the random process modules.
- **Maintainability**: Code will be modular and well-documented to facilitate future enhancements and maintenance. Create abstractions where necessary to allow easy addition of new random processes in the future. Split the code into small, manageable components and modules, especially for the process simulations and visualizations.

## User Interface
The UI will consist of the following components:
- **Header**: Title and brief description of the application. Color specs: very light colors, grayish.
- **Process Selector**: Dropdown menu for selecting the type of random process. Add A catchy illustration related to the selected random process next to the title to make it less plain and technical.
- **Parameter Controls**: Input fields and sliders for adjusting parameters. Keep it small, not to occupy much space. Choosing between different random generators (standard, lattice based pseudo-random). Color specs: very light colors, grayish.
- **Visualization Area**: Section for displaying the graphical representations of the random processes. Color specs:
  - more vibrant colors to highlight the visualizations.
  - convergence plot and total trials label should NOT stick out too much.
  - make sure that colors in the probability distribution matches with the labels.
  - make sure that colors in the convergence graph does NOT interfere with the probability distribution colors.
- **Footer**: Additional information and links.

## Visualization Details
- **Probability Charts**:
  - Display the frequency distribution of outcomes as a bar chart for all random processes.
  - Make sure to bin the data appropriately for clarity and accuracy. Apply different binning strategies based on the process type, number of trials, observed range of outcomes.
- **Line Charts**: Show the convergence of sample means or other statistics over the number of trials.
- **Scatter Plots**: For the π simulation, display points inside and outside a quarter circle to visualize the Monte Carlo method.
- **Statistical Summaries**: Display key statistics such as mean and standard deviation alongside the visualizations.