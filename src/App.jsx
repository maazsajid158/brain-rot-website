// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // placeholder if we later want remote images

// Simple cartoon avatar URLs (public domain / placeholder)
const avatars = [
  "https://i.imgur.com/1XK5ZkR.png", // nerd brain
  "https://i.imgur.com/8yZy8Vb.png", // goofy robot
  "https://i.imgur.com/3qJbM9C.png", // sleepy sloth
];

// Generate a roast message based on minutes of unproductive time
function generateRoast(minutes) {
  if (minutes < 5) return "Just a warm‑up, keep it up!";
  if (minutes < 15) return "Hey, did you forget what you were doing?";
  if (minutes < 30) return "Your brain is on a coffee break that never ends.";
  if (minutes < 60) return "That's an hour of pure brain‑rot. Maybe try a nap?";
  return "Wow, you’ve officially turned into a meme. Time to reboot!";
}

export default function App() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [roast, setRoast] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]);
  const intervalRef = useRef(null);

  // Choose a random avatar on component mount
  useEffect(() => {
    const random = avatars[Math.floor(Math.random() * avatars.length)];
    setAvatar(random);
  }, []);

  // Update timer when running
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // Update roast whenever minutes change
  useEffect(() => {
    const minutes = Math.floor(seconds / 60);
    setRoast(generateRoast(minutes));
  }, [seconds]);

  const handleStart = () => setRunning(true);
  const handleStop = () => setRunning(false);
  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
    setRoast("");
  };

  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;

  return (
    <div style={styles.container}>
      <h1>🧠 Brain‑Rot Tracker</h1>
      <img src={avatar} alt="Brain‑Rot character" style={styles.avatar} />
      <div style={styles.timerBox}>
        <span style={styles.time}>
          {minutes}:{displaySeconds.toString().padStart(2, "0")}
        </span>
        <div style={styles.buttons}>
          {!running && (
            <button onClick={handleStart} style={styles.button}>Start</button>
          )}
          {running && (
            <button onClick={handleStop} style={styles.button}>Stop</button>
          )}
          <button onClick={handleReset} style={styles.button}>Reset</button>
        </div>
      </div>
      {roast && (
        <div style={styles.roastBox}>
          <p>{roast}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  avatar: {
    width: "120px",
    marginBottom: "1rem",
  },
  timerBox: {
    margin: "1.5rem 0",
    fontSize: "2rem",
  },
  time: {
    display: "block",
    marginBottom: "0.5rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    background: "#4a90e2",
    color: "#fff",
  },
  roastBox: {
    marginTop: "1rem",
    fontStyle: "italic",
    color: "#c0392b",
  },
};
