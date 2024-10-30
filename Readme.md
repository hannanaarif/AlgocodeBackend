
![Architecture for leetcode project](https://github.com/user-attachments/assets/21613a0e-594d-4865-a449-5846227fe146)

# Advanced Microservices-based Code Compilation and Execution Platform

An advanced, highly scalable platform for code compilation and execution, inspired by coding platforms like Leetcode and Codeforces. 
This project leverages a robust microservices architecture and AWS deployment to ensure seamless scalability, high availability, and exceptional performance.

---

## Project Overview

This platform is designed to manage complex coding challenges, compile and execute user code in multiple languages, and provide real-time feedback. 
Key features include dynamic problem administration, asynchronous submission handling, and real-time updates, all supported by AWS for high availability and fault tolerance.

---

## Features

### Microservices Architecture & Scalability
   - Architected with a microservices-based design for scalability and modularity.
   - Deployed on AWS with auto-scaling capabilities and load balancing for seamless scaling and high availability.
   - Each service operates independently, ensuring optimal resource usage and fault tolerance.

### Dynamic Problem Administration
   - Built a Problem Admin Service using **JavaScript**, **Express**, and **MongoDB**.
   - Supports CRUD operations for problems, enabling admins to manage coding challenges dynamically.
   - Handles complex test cases and code stubs, ensuring accurate and comprehensive evaluations of user submissions.

### Advanced Code Execution
   - Developed an Executor Service in **TypeScript** and **Express** to support multi-language code execution (Java, Python, C++).
   - Utilizes **Docker containers** to create isolated environments for safe code execution.
   - Employs **Strategy** and **Factory design patterns** to efficiently manage execution environments and handle time-limit conditions (TLE), enhancing system performance and reliability.

### High-performance Asynchronous Communication
   - Designed a Submission Service using **Fastify** to handle high request volumes.
   - Utilized **Redis message queues** for asynchronous communication between the submission and executor services.
   - Implemented WebSocket services to provide real-time feedback to users, enhancing interactivity and responsiveness.

### AWS Deployment & Operational Excellence
   - Deployed on **AWS** using:
     - **Auto-scaling groups** and **Load Balancers** for traffic management and fault tolerance.
     - **Monitoring tools** for performance tracking to ensure operational excellence and reliability.

---

## Tech Stack

- **Backend Frameworks:** Node.js (Express, Fastify)
- **Programming Languages:** JavaScript, TypeScript, Python, Java, C++
- **Database:** MongoDB
- **Messaging & Queues:** Redis
- **Containerization:** Docker
- **Real-time Communication:** WebSocket
- **Cloud Platform:** AWS (EC2, Load Balancer, Auto Scaling)

---

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hannanaarif/AlgocodeBackend.git
   cd AlgocodeBackend

2. **Install dependencies for each service**:
    - **Navigate to each service folder and run**:

      ```bash
npm install
```

3.**Deploy to AWS**:
- Configure your AWS CLI credentials and deploy using your deployment script or CI/CD pipeline.
- Ensure that auto-scaling groups, load balancers, and monitoring configurations are set up for each service.

---

## Complexity Analysis

### Code Execution Optimization
The platform is designed to efficiently handle large volumes of requests with optimized code execution through:

- **Containerization**: Isolates and manages resources for each language.
- **Design Patterns**: Utilizes Strategy and Factory patterns to ensure efficient resource allocation and scalability.

### Asynchronous Communication
Efficiently manages high request volumes with:

- **Redis Queues**: Ensures asynchronous, non-blocking communication between services.
- **WebSocket Integration**: Provides real-time updates, enhancing user experience and response times.





