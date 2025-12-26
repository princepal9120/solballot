# SolBallot 🗳️

**SolBallot** is a secure, decentralized voting protocol built on the **Solana** blockchain. It empowers communities to govern effectively through a transparent proposal and voting system, backed by an on-chain treasury.

![Solana](https://img.shields.io/badge/Solana-Dominating-9945FF?style=for-the-badge&logo=solana)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)
![Anchor](https://img.shields.io/badge/Anchor-Framework-orange?style=for-the-badge)

## 🌟 Key Features

-   **Decentralized Governance**: Create and vote on proposals securely on-chain.
-   **Treasury Management**: Automated treasury that collects fees from token sales.
-   **Token-Based Voting**: Purchase voting tokens (1 Token = 1 Vote) to participate.
-   **Transparent & Immutable**: All actions are recorded on the Solana blockchain.
-   **Professional UI**: A high-trust, dark-mode native interface designed for protocol users.

## 🛠️ Technology Stack

-   **Blockchain**: Solana (Smart Contracts via Anchor Framework)
-   **Frontend**: React (Vite), TypeScript
-   **Styling**: Tailwind CSS (v4), Framer Motion
-   **Wallet Integration**: Solana Wallet Adapter

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   Rust & Cargo
-   Solana CLI & Anchor CLI

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/princepal9120/solballot.git
    cd solballot
    ```

2.  **Install Dependencies**
    ```bash
    cd app
    npm install
    ```

3.  **Run the Application**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

-   `programs/`: Solana smart contracts (Rust/Anchor)
-   `app/`: Frontend application (React/Vite)
    -   `src/components/`: UI Components (Vote, Proposal, etc.)
    -   `src/layout/`: App Shell and Navigation
    -   `src/idl/`: Interface Definition Language for the program

## 📜 License

This project is licensed under the MIT License.
