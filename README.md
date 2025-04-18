# ✨ User Management System 🛠️

A **React-based user management system** that allows users to manage their profiles, search for other users, and provides features like pagination and theme toggling.

---

## 🌐 Deployment

-   **Live Deployment**: [Live Link](https://user-management-system-wheat.vercel.app)

---

## 🚀 Features

### 🏠 **Home Page**

-   A welcoming home page with a **light/dark mode toggle** for a personalized user experience.

### 🔐 **Authentication**

-   Secure login functionality using email and password.
-   Session persistence using **Redux Persist**.

### 👤 **Profile Management**

-   Users can:
    -   **Edit and update** their profile details (name and email).
    -   **Delete their profile** with confirmation.
    -   **Note** - After updating or deleting data, the original values are restored because the mock API resets the changes. This behavior is due to the limitations of the mock API and is not an issue with the frontend implementation.

### 🔍 **Search & Pagination**

-   Search for users by **name** or **email**.
-   Paginated user lists for better performance and usability.

### 🌓 **Theme Toggle**

-   Switch between **light** and **dark** themes.
-   Theme preference is saved across sessions.

---

## 🛠️ Technologies Used

| Layer         | Tech Stack                                                              |
| ------------- | ----------------------------------------------------------------------- |
| **Frontend**  | React, React Router DOM, Redux, Redux Persist, DaisyUI, React Hook Form |
| **Utilities** | Axios, CORS                                                             |

---

## 🛠️ How to Run Locally

### Prerequisites

-   **Node.js** (v16 or higher)
-   **npm** or **yarn**

---

### Steps to Run

1️⃣ **Clone the Repository**

```bash
git clone https://github.com/devanshgupta08/user-management-system

```

2️⃣ **Open the Project in Visual Studio Code**
 - Open **Visual Studio Code**.
 - Click on **File > Open Folder**.
 - Select the folder where you cloned  the repository.

 3️⃣ **Install Dependencies**

 - Open the terminal in Visual Studio Code (Ctrl + ` or go to Terminal > New Terminal).
 - Run the following command to install dependencies:
```bash
npm install
```

4️⃣ **Start the Application**

 - In the terminal, run the following command to start the development server:
```bash
npm run dev
```
5️⃣**Open in Browser**

 -Open your browser and navigate to: http://localhost:5173
