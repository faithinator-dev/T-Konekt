# 🔥 FaithSocial - Complete Social Media Web App

A **production-ready**, **mobile-first** social media app built with pure HTML/CSS/JavaScript and **Firebase Backend**.

## ✨ Features

- **Authentication**: Email/Password signup and login
- **Real-time Chat**: 1-on-1 and group messaging
- **Friends System**: Add, search, and manage friends
- **Social Feed**: Create posts, like, and comment
- **Video Calls**: One-click WebRTC video meetings
- **Profile Management**: Upload photos, view stats
- **Mobile-First Design**: Snapchat-style black/red UI

## 🚀 Quick Start (5 Minutes Setup)

### Prerequisites
- Node.js installed
- Firebase account (free tier works!)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it (e.g., "FaithSocial")
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Enable Firebase Services

#### Enable Authentication
1. Go to **Authentication** → **Get Started**
2. Click **Sign-in method** tab
3. Enable **Email/Password**
4. Click **Save**

#### Enable Realtime Database
1. Go to **Realtime Database** → **Create Database**
2. Choose **region** (closest to you)
3. Start in **Test mode** (we'll apply rules later)
4. Click **Enable**

#### Enable Storage
1. Go to **Storage** → **Get Started**
2. Start in **Test mode**
3. Click **Done**

### Step 3: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click **Web icon** (</>) to add web app
4. Register app with nickname (e.g., "FaithSocial Web")
5. Copy the `firebaseConfig` object

### Step 4: Configure Your App

Open `app.js` and replace the Firebase config (lines 2-9):

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 5: Deploy Security Rules

#### Database Rules
1. Go to **Realtime Database** → **Rules** tab
2. Copy content from `database.rules.json`
3. Paste and click **Publish**

#### Storage Rules
1. Go to **Storage** → **Rules** tab
2. Copy content from `storage.rules`
3. Paste and click **Publish**

### Step 6: Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project folder
firebase init

# Select:
# - Hosting
# - Use existing project (select your project)
# - Public directory: . (current directory)
# - Single-page app: Yes
# - Don't overwrite index.html

# Deploy
firebase deploy
```

Your app is now LIVE! 🎉

## 📱 Local Testing

Simply open `index.html` in a browser or use:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# VS Code
# Install "Live Server" extension, right-click index.html → Open with Live Server
```

Visit `http://localhost:8000`

## 🎯 Usage Guide

### First Time User
1. Open the app
2. Click **Sign Up**
3. Enter username, email, password
4. Click **Sign Up** button
5. You're in! 🎉

### Finding Friends
1. Tap **Friends** icon (bottom nav)
2. Tap **🔍 Find** button
3. Search by username or email
4. Tap **➕ Add** to send friend request

### Accepting Friends
1. Go to **Friends** tab
2. Tap **Requests** tab
3. Tap **✅** to accept or **❌** to reject

### Chatting
1. Tap **Chats** icon
2. Tap **➕ New** to start chat
3. Select a friend
4. Type and send messages
5. Real-time updates!

### Video Call
1. Open any chat
2. Tap **📹 Meet** button
3. Allow camera/microphone access
4. Wait for friend to join
5. Tap **End Call** when done

### Creating Posts
1. Go to **Feed** tab
2. Tap **➕ Post** button
3. Write your thoughts
4. Tap **Post**
5. Friends can like and comment!

### Updating Profile
1. Tap **Profile** icon
2. Tap **Change Photo**
3. Select image from device
4. Photo uploads automatically!

## 🔒 Security Features

✅ **Authentication required** for all actions  
✅ **User-specific data access** (can only edit own posts)  
✅ **Friend-only chats** (members-only access)  
✅ **Secure file uploads** (user-scoped storage)  
✅ **No public write access** (all writes authenticated)

## 📁 Project Structure

```
FaithSocial/
├── index.html          # Main HTML structure (all views)
├── app.js              # Firebase logic & app functionality
├── style.css           # Mobile-first styling (black/red theme)
├── firebase.json       # Hosting configuration
├── database.rules.json # Realtime Database security rules
├── storage.rules       # Storage security rules
└── README.md          # This file
```

## 🛠️ Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Firebase (100% serverless) |
| **Authentication** | Firebase Auth |
| **Database** | Firebase Realtime Database |
| **Storage** | Firebase Storage |
| **Hosting** | Firebase Hosting |
| **Video** | WebRTC (peer-to-peer) |

## 🎨 Design Philosophy

- **Mobile-First**: Optimized for phones, scales to desktop
- **Snapchat-Style**: Black background, red accents
- **One-Click Actions**: Minimal taps to complete tasks
- **Real-Time**: Instant updates across all devices
- **Simple**: Under 500 lines of code, easy to understand

## 📊 Firebase Database Structure

```
firebase-root/
├── users/
│   └── {userId}/
│       ├── username
│       ├── email
│       ├── phone
│       └── photoURL
├── posts/
│   └── {postId}/
│       ├── userId
│       ├── content
│       ├── timestamp
│       ├── likes/
│       └── comments/
├── friends/
│   └── {userId}/
│       └── {friendId}/
│           ├── status (pending/accepted)
│           └── type (sent/received)
├── chats/
│   └── {chatId}/
│       ├── members/
│       ├── messages/
│       └── lastMessage
└── calls/
    └── {callId}/
        ├── offer
        ├── answer
        └── candidates
```

## 🐛 Troubleshooting

### "Permission Denied" Error
- Check that security rules are deployed
- Verify user is logged in
- Ensure database URL is correct in config

### Video Call Not Working
- Check camera/microphone permissions in browser
- Ensure HTTPS connection (required for WebRTC)
- Test on different browsers (Chrome/Firefox recommended)

### Login/Signup Not Working
- Verify Firebase config is correct
- Check Authentication is enabled in Firebase Console
- Open browser console for error details

### Images Not Uploading
- Check Storage rules are deployed
- Verify image file size (<5MB recommended)
- Ensure user is authenticated

## 📱 Mobile Testing

### iOS Safari
1. Deploy to Firebase Hosting (https required)
2. Open in Safari
3. Tap Share → Add to Home Screen
4. Launches like native app!

### Android Chrome
1. Deploy to Firebase Hosting
2. Open in Chrome
3. Tap menu → Add to Home screen
4. PWA-ready experience!

## 🚀 Performance Tips

1. **Images**: Compress profile photos before upload
2. **Messages**: Limit message history to last 100
3. **Posts**: Paginate feed for better performance
4. **Caching**: Firebase SDK caches data automatically

## 🔐 Production Checklist

Before going live, ensure:

- [ ] Firebase config is filled in `app.js`
- [ ] Database rules are deployed (not test mode)
- [ ] Storage rules are deployed (not test mode)
- [ ] Authentication is properly configured
- [ ] App is tested on mobile devices
- [ ] Custom domain is set up (optional)
- [ ] Analytics enabled (optional)

## 📈 Scaling & Costs

**Firebase Free Tier Includes:**
- 50,000 Realtime Database connections/month
- 1GB Storage
- 10GB Hosting bandwidth
- Unlimited authentication users

**Good for:** 1,000+ active users before paid tier needed!

## 🎓 Learning Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [WebRTC Tutorial](https://webrtc.org/getting-started/overview)
- [Realtime Database Guide](https://firebase.google.com/docs/database)

## 💡 Future Enhancements (Ideas)

- [ ] Group chat support (3+ members)
- [ ] Story/Status feature (24h posts)
- [ ] Push notifications (FCM)
- [ ] Dark/Light theme toggle
- [ ] Voice messages in chat
- [ ] Emoji reactions
- [ ] Search messages in chat
- [ ] Block/Report users
- [ ] Admin dashboard

## 📄 License

MIT License - Feel free to use, modify, and distribute!

## 👨‍💻 Built With ❤️

A complete, production-ready social media app in under 500 lines of code. No frameworks, no complexity, just pure web technologies and Firebase power!

**Ready to launch? Follow the setup steps and you'll be live in 5 minutes!** 🚀

---

**Questions or Issues?** Check Firebase Console logs or browser console for error messages.

**Happy Coding!** 🔥
