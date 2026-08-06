# Medical Records Tracker

A desktop application for tracking pharmacy dispensing records, built with Tauri, React, TypeScript, and SQLite.

---


## Overview

This application allows pharmacy staff to:

- Search patients by name.
- Add new dispensing records (date, doctor, medications, and quantities).
- Edit or duplicate an existing record for the same patient.
- View record details in a side panel.
- Store a persistent note for each patient (shared across all of their records).

---
## ScreenShots

<img width="1280" height="828" alt="5072e14e-910a-413c-868f-2172a10b91f4" src="https://github.com/user-attachments/assets/c43e643e-26d4-4422-b120-c8c8d4291ada" />

---

## Tech Stack

### Backend (Rust / Tauri)

- **Tauri 2** — Desktop application framework
- **rusqlite (bundled)** — Embedded SQLite database
- **serde / serde_json** — Serialization and JSON handling

### Frontend (React)

- React 19 + TypeScript
- Tailwind CSS v4
- react-hook-form + zod — Form handling and validation
- @radix-ui/react-dialog — Dialog components
- Motion (Framer Motion) — Animations
- lucide-react — Icons

---

## Requirements

- Node.js (v18 or later)
- Rust and the Tauri toolchain
- **Windows only:** Microsoft C++ Build Tools

Refer to the official Tauri prerequisites documentation for your operating system.

---

## Setup

```bash
# Install dependencies
npm install

# Build the Rust backend (if needed)
cd src-tauri
cargo build
cd ..
```

---

## Development

```bash
npm run tauri dev
```

This launches the desktop application with hot reloading enabled during development.

---

## Building

```bash
# Make sure the TypeScript project builds successfully
npm run build

# Build the desktop installer
npm run tauri build
```

The generated installer (`.msi` or `.exe`) can be found in:

```text
src-tauri/target/release/bundle/
```

---

## Features

- Fast patient search by name (matches anywhere within the name).
- Filter records by date range and note availability.
- Unified form for adding, editing, and duplicating records.
- Keyboard-friendly navigation using the **Enter** key.
- Smart duplication — duplicating a record keeps the same patient (`client_id`) instead of creating a new patient.
- Fully Arabic (RTL) user interface.

