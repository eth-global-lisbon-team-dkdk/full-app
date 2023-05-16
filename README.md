# README - CryptoWise.AI

## Introduction

Welcome to CryptoWise, our submission for the ETHGlobal Lisbon 2023 Hackathon! In this README, we will provide an overview of the technologies we have used and how we have utilized them to develop our project. CryptoWise.AI was awarded with bounty prizes from both Polygon and The Graph.

![overview](https://github.com/eth-global-lisbon-team-dkdk/full-app/assets/2742107/3f034891-e11b-4006-a6c4-7c1959f94027)


## Project Overview

CryptoWise is an AI-powered crypto assistant designed to help users invest smarter, better, faster, and stronger. Users can ask questions and even submit on-chain transactions - all through natural language. Whether you are new to crypto or an experienced investor, CryptoWise offers various features to support your crypto journey. Our platform includes the following functionalities:

- Crypto Learning: CryptoWise provides educational resources to help users learn about cryptocurrencies.
- Seamless Web3 Wallet on-boarding: For users new to Web3, CryptoWise enables the creation of web3 wallets from just your email.
- AI-Enabled: Utilizing AI technology, CryptoWise assists users in conducting due diligence on tokens and projects.
- Swaps and Transactions: Users can execute swaps and transactions through natural language, enabling seamless and efficient crypto operations.
- Automated Transactions: CryptoWise offers the ability to schedule automated transactions, providing convenience and control.

All these features are accessible through a user-friendly chat interface, simplifying the user experience.

## Technologies Used

### 1. Polygon/AA

We have deployed the smart contract that our AI Agent (LLM) and Safe Account interact with on the Polygon POS blockchain. We have also created a gas-less onboarding experience and sponsored first transaction mechanism to crypto by utilizing Account Abstraction (AA). This allows users to create their web3 wallets and execute transactions without the need for upfront gas fees. You can find the deployed smart contract on [Polygonscan](https://polygonscan.com/address/0x229d64bbd074722dd4e405f07cd8cf29717d8f87#writeContract).

### 2. The Graph

CryptoWise incorporates The Graph to enhance user interactions. We translate natural language commands, such as "What is the price of GRT?", into GraphQL subgraph queries. By parsing the query results, we generate conversational text responses, providing users with real-time information in a user-friendly format. This integration allows for a seamless conversational experience without the need for additional tools. Note: No Airstack is used for this - we have built the tooling ourselves.

### 3. Safe

To provide a smooth onboarding experience, CryptoWise utilizes Safe, which enables users to access Web3 functionality with just their email through Web3 Auth. We have implemented account abstraction to sponsor users' initial transactions, allowing them to buy their first crypto asset for free (up to $5). This approach promotes inclusivity and eliminates the barriers of entry for new users. For implementation details, please refer to the relevant sections of code in our repository.

## UX Optimization Strategies

Throughout the development of CryptoWise, we have focused on optimizing the user experience. Some of the UX optimization strategies we have employed include:

- **Chat Interface**: We have designed a conversational chat interface that allows users to interact with CryptoWise using natural language. This intuitive interface eliminates the need for users to learn complex commands or navigate through intricate menus.

- **Simplified Onboarding**: By integrating Safe and utilizing account abstraction, we have streamlined the onboarding process. Users can create web3 wallets and make their first crypto asset purchase with just their email address, reducing the barriers to entry.

- **Real-time Conversational Responses**: Leveraging The Graph, we provide real-time information in a conversational format. Users can receive up-to-date data and insights through a user-friendly chat interface, eliminating the need to navigate external websites or tools.

For more detailed information on the implementation of account abstraction and other UX optimization strategies, please refer to the relevant sections of code in our repository.
