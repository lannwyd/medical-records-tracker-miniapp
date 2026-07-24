import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import MainLayout from "./layout/MainLayout";



function App() {
  return (
      <main className="min-h-screen w-full font-rubik bg-bg">
        <MainLayout/>
      </main>
  );
}

export default App;
