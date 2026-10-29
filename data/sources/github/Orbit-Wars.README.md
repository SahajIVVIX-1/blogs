# Orbit-Wars: Elite AI Strategy Agent

![Orbit Wars Banner](banner.png)

## 🌌 Overview
Orbit-Wars is a high-performance AI agent designed for the **Kaggle Orbit Wars** environment. It utilizes advanced orbital mechanics, predictive intercept mathematics, and a dynamic economic scoring system to dominate the battlefield. 

The agent transitions from a basic ROI-based navigator to an elite strategist, implementing multi-front pressure tactics and rigorous defensive protocols.

---

## 🚀 Key Features

### 🧠 Advanced Strategy Modules
- **Economic Priority Scoring (V6)**: Evaluates targets based on production value, distance, and current ship count. High-production planets are prioritized to build an unstoppable economy.
- **Threat Assessment & Fortress Logic**: Implements a defensive network that identifies doomed planets and reinforces them using ship reserves from nearby "fortress" bases.
- **Overkill Fleet Sizing**: Uses a logarithmic scaling algorithm (2.5x + 20) to ensure high-probability captures while maintaining defensive integrity.
- **Sun Bypass System**: Detects potential solar collisions and calculates safe angular offsets to navigate fleets around the sun without losses.

### 📐 Orbital Mathematics
- **Predictive Intercepts**: Calculates the future position of planets based on their angular velocity and the fleet's arrival time, ensuring precision strikes.
- **Dynamic Fleet Speed**: Accounts for the logarithmic relationship between fleet size and travel speed.
- **Comet Chasing**: Specialized logic for capturing high-value comet planets during optimal windows.

---

## 🛠️ Tech Stack
- **Language**: Python 3.x
- **Libraries**: NumPy, Pandas, Matplotlib
- **Environment**: Kaggle Environments (`orbit_wars`)

---

## 📥 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Orbit-Wars.git
   cd Orbit-Wars
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

---

## 🎮 Usage

### Running a Match
To test the agent against a random opponent and generate a replay:
```bash
python test_agent.py
```
This will run the simulation and save the visual output as `test_replay.html`.

### Project Structure
- `main.py`: The primary agent entry point and decision logic.
- `submission.py`: Optimized production version of the agent.
- `utils.py`: Core utility functions for orbital math, collision detection, and fleet management.
- `test_agent.py`: Testing suite for running matches and debugging.

---

## 📈 Technical Deep Dive

### Predictive Position Algorithm
The agent predicts planet positions using:
$$\theta_{predicted} = \theta_{initial} + \omega \cdot \Delta t$$
Where:
- $\theta_{initial}$ is the starting orbital angle.
- $\omega$ is the angular velocity.
- $\Delta t$ is the estimated travel time based on fleet speed.

### Sun Intersection Logic
To prevent fleet destruction, the agent uses a discriminant-based intersection check against the central sun's radius, automatically recalculating vectors if a collision is imminent.

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

*Developed with ❤️ for the AI competition community.*
