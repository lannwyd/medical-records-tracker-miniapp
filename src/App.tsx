import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import MainLayout from "./layout/MainLayout";



function App() {
  return (
      <main className="h-screen w-full font-rubik bg-bg overflow-hidden p-3 ">
        <MainLayout/>
      </main>
  );
}

export default App;
