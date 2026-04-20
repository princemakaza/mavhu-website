<div align="center">

# 🌐 Mavhu Website

**A modern, fast, and scalable web application**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![AWS](https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white)

</div>

---

## 🚀 Tech Stack

| Technology     | Purpose                       |
| -------------- | ----------------------------- |
| **React**      | UI Component Library          |
| **TypeScript** | Type-safe JavaScript          |
| **Vite**       | Lightning-fast build tool     |
| **ESLint**     | Code quality & linting        |
| **PM2**        | Production process management |
| **AWS EC2**    | Cloud deployment              |

---

## 📦 Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mavhu-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

> The app will be available at **http://localhost:5173/**

---

## 🛠️ Build & Preview

### Build for Production

```bash
npm run build
```

This generates an optimized `dist/` folder ready for deployment.

### Preview the Production Build Locally

```bash
npm run preview
```

---

## ✅ ESLint Configuration

For production-grade type-aware linting, update your ESLint config:

```ts
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    // Or use stricter rules:
    // ...tseslint.configs.strictTypeChecked,
    // Optional stylistic rules:
    // ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

**Optional React-specific lint plugins:**

```bash
npm install eslint-plugin-react-x eslint-plugin-react-dom --save-dev
```

---

## ☁️ Deployment on AWS EC2

### 1. Connect to Your EC2 Instance

```bash
ssh ubuntu@your-ec2-ip
```

### 2. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Install PM2

```bash
npm install -g pm2
```

### 4. Clone & Install the Project

```bash
git clone <your-repo-url>
cd mavhu-website
npm install
```

### 5. Build the Project

```bash
npm run build
```

### 6. Serve the App

Choose one of the following options:

#### ✅ Option A — Vite Preview _(Simple)_

```bash
npm run preview -- --host 0.0.0.0 --port 5173

# Run with PM2
pm2 start npm --name "mavhu-site" -- run preview
```

#### ✅ Option B — Static Server _(Recommended)_

```bash
npm install -g serve

serve -s dist -l 3000

# Run with PM2
pm2 start serve --name "mavhu-site" -- -s dist -l 3000
```

### 7. Persist PM2 Process

```bash
pm2 save
pm2 startup
# Follow the command output to enable startup on reboot
```

### 8. Manage Your App with PM2

```bash
pm2 list                    # View all running processes
pm2 logs mavhu-site         # Stream live logs
pm2 restart mavhu-site      # Restart the app
pm2 stop mavhu-site         # Stop the app
```

### 9. Access Your App

```
http://your-ec2-ip:3000
```

---

## 🔐 Nginx Reverse Proxy _(Optional)_

### Install Nginx

```bash
sudo apt install nginx
```

### Configure

```bash
sudo nano /etc/nginx/sites-available/default
```

Paste the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

### Restart Nginx

```bash
sudo systemctl restart nginx
```

---

## 📁 Project Structure

```
mavhu-website/
├── src/            # Application source code
├── public/         # Static assets
├── dist/           # Production build output
├── package.json    # Project dependencies & scripts
└── vite.config.ts  # Vite configuration
```

---

## 👨‍💻 Author

<div align="center">

**Prince Z Makaza**

_Built with ❤️ and TypeScript_

</div>
