# 🎓 CampusLink - Modern Student Hub Web App

A **production-ready**, **mobile-first** student collaboration platform built with pure HTML/CSS/JavaScript and **Firebase Backend**.

## ✨ Features

- **Authentication**: Secure student login system.
- **Campus Feed**: Real-time updates and study tips from CourseMates.
- **CourseMates System**: Connect with peers across campus.
- **Study Groups**: Create and join focused academic communities.
- **Lectures Hub**: Share and access educational videos and tutorials.
- **Real-time Messaging**: Instant communication for collaboration.
- **Student Profiles**: Academic-focused profiles with major and university info.
- **Admin Portal**: Comprehensive dashboard for campus moderation.

## 🚀 Quick Start (5 Minutes)

### 1. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project.
3. Name it (e.g., "CampusLink")
4. Enable **Authentication** (Email/Password)
5. Enable **Realtime Database** (Start in **test mode**)
6. Enable **Storage** (Optional, for future file sharing)

### 2. Connect Your Code
1. In Firebase Console, click the **Web icon** (</>) to register an app.
2. Register app with nickname (e.g., "CampusLink Web")
3. Copy the `firebaseConfig` object.
4. Rename `firebase-config.example.js` to `firebase-config.js`.
5. Paste your config into `firebase-config.js`.

### 3. Launch
Just open `index.html` in your browser or use a live server!

## 📂 Project Structure

```text
CampusLink/
├── index.html          # Auth Redirector
├── login.html          # Student Login/Signup
├── home.html           # Campus Feed
├── profile.html        # Student Profile
├── friends.html        # CourseMates Management
├── groups.html         # Study Groups
├── watch.html          # Lectures & Tutorials
├── messages.html       # Direct Messages
├── notifications.html  # Campus Updates
├── campus-style.css    # Modern Academic Theme
├── core.js             # Global App Logic
├── private/            # Admin Dashboard
└── icons/              # UI Icons
```

## 🛠️ Customization

### Themes
The app uses a modern academic theme defined in `campus-style.css`. You can easily customize colors, fonts, and spacing there.

### Terminology
Terminology throughout the app has been student-focused:
- Friends -> **CourseMates**
- Groups -> **Study Groups**
- Watch -> **Lectures**
- Messenger -> **Direct Messages**

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License
This project is open-source and available under the MIT License.

---

**Built with Passion for Students** 🎓
