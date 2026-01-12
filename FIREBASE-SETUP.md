# 🔥 Firebase Setup Guide for T-Konekt

## ✅ What Changed

Your T-Konekt platform now uses **Firebase** instead of localStorage!

### Firebase Features:
- ✅ **Real Authentication** - Secure user login/signup
- ✅ **Cloud Database** - Firestore for user profiles
- ✅ **Data Persistence** - Data syncs across all devices
- ✅ **Password Reset** - Firebase sends reset emails automatically
- ✅ **Email Verification** - Built-in email verification
- ✅ **Free Tier** - Perfect for development and small apps

---

## 🚀 Setup Firebase (15 minutes)

### STEP 1: Create Firebase Project

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"**
3. Enter project name: **T-Konekt** (or your choice)
4. Disable Google Analytics (optional for now)
5. Click **"Create project"**
6. Wait ~30 seconds for setup

### STEP 2: Enable Authentication

1. In Firebase Console, click **"Authentication"** in left menu
2. Click **"Get started"**
3. Click **"Email/Password"** provider
4. **Enable** the toggle
5. Click **"Save"**

### STEP 3: Enable Firestore Database

1. Click **"Firestore Database"** in left menu
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select your region (closest to you)
5. Click **"Enable"**

### STEP 4: Get Your Firebase Config

1. Click **⚙️ Settings** (gear icon) → **"Project settings"**
2. Scroll down to **"Your apps"**
3. Click **"</>" (Web)** icon
4. Register app name: **T-Konekt**
5. Don't check "Firebase Hosting"
6. Click **"Register app"**
7. **Copy the firebaseConfig object**

It looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123XYZ...",
  authDomain: "t-konekt-12345.firebaseapp.com",
  projectId: "t-konekt-12345",
  storageBucket: "t-konekt-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

### STEP 5: Add Config to login.html

1. Open **login.html** in VS Code
2. Find this section (around line 223):
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

3. **Replace** with your actual config from Firebase Console

4. Save the file

### STEP 6: Set Up Firestore Security Rules

1. Go back to Firebase Console
2. Click **"Firestore Database"** → **"Rules"** tab
3. Replace the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Anyone can read user profiles
      allow read: if true;
      // Only authenticated users can create
      allow create: if request.auth != null;
      // Only owner can update their own profile
      allow update: if request.auth != null && request.auth.uid == userId;
      // Only owner can delete their profile
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
    
    // Posts collection
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Groups collection
    match /groups/{groupId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null;
    }
  }
}
```

4. Click **"Publish"**

---

## ✅ Test Your Setup

### 1. Create New Account:
1. Open `login.html` in browser
2. Click **"Create New Account"**
3. Fill in:
   - First name: John
   - Last name: Doe  
   - Email: john@example.com
   - Password: test123
   - Gender: Male
4. Click **"Sign Up"**
5. Check browser console for success messages

### 2. Verify in Firebase Console:
1. Go to **Authentication** → **Users** tab
2. You should see your new user!
3. Go to **Firestore Database** → **users** collection
4. You should see the user profile document!

### 3. Login:
1. Go back to `login.html`
2. Enter: john@example.com / test123
3. Click **"Log In"**
4. Should redirect to home.html

### 4. Test Password Reset:
1. Click **"Forgotten password?"**
2. Enter your email
3. Click **"Send Code"**
4. Check your email inbox
5. Click the reset link from Firebase
6. Set new password

---

## 🔒 Security Features

### What Firebase Provides:
✅ **Password Hashing** - Automatic and secure  
✅ **Email Verification** - Optional but recommended  
✅ **Rate Limiting** - Prevents brute force attacks  
✅ **Password Reset** - Secure email-based reset  
✅ **Token Authentication** - JWT tokens automatically handled  
✅ **Cross-Device Sync** - Data syncs everywhere  

---

## 💰 Firebase Pricing

### Free Tier (Spark Plan):
- ✅ **Authentication:** 10,000 verifications/month
- ✅ **Firestore:** 50,000 reads/day, 20,000 writes/day
- ✅ **Storage:** 1 GB
- ✅ **Hosting:** 10 GB/month transfer

**Perfect for:**
- Development
- Testing
- Small apps (up to ~1000 active users)
- Portfolio projects

### Paid Tier (Blaze - Pay As You Go):
- Only pay for what you use
- First tier is still free
- Typical cost: $5-25/month for small apps

---

## 📱 What Works Now

### ✅ User Registration:
- Creates Firebase Auth account
- Stores profile in Firestore
- Auto-login after signup

### ✅ User Login:
- Firebase Authentication
- Secure password verification
- Session management

### ✅ Password Reset:
- Firebase sends reset email
- User clicks link in email
- Resets password securely

### ✅ Data Persistence:
- User profiles in Firestore
- Syncs across all devices
- No more localStorage!

---

## 🔧 Next Steps (Optional)

### Enable Email Verification:
```javascript
// After signup, send verification email
await user.sendEmailVerification();
```

### Add Google Sign-In:
1. Enable Google provider in Firebase Auth
2. Add button to login page
3. Use `signInWithPopup()`

### Add Profile Pictures Upload:
1. Enable Firebase Storage
2. Upload images to Storage
3. Store URLs in Firestore

---

## ⚠️ Important Notes

1. **Don't commit firebaseConfig to public GitHub!**
   - Your config is in login.html
   - Firebase Console → Project Settings → "Add web app" allows you to restrict domains
   
2. **Test Mode Expires:**
   - Firestore test mode rules expire in 30 days
   - Use the security rules provided above

3. **Email Delivery:**
   - Firebase uses its own email service
   - For custom emails, integrate SendGrid/Mailgun

4. **Rate Limits:**
   - Free tier has limits
   - Monitor usage in Firebase Console

---

## 🐛 Troubleshooting

### "Firebase not defined" error:
- Check that Firebase CDN scripts loaded
- Check browser console for errors
- Make sure you're online

### "Permission denied" error:
- Update Firestore security rules
- Make sure user is authenticated

### "Email already in use":
- User account exists
- Try logging in instead
- Or use password reset

### "Invalid API key":
- Double-check firebaseConfig
- Make sure you copied entire config
- Check for typos

---

## 📊 Monitor Your App

### Firebase Console:
1. **Authentication** - See all users
2. **Firestore** - View all data
3. **Usage** - Check quota limits
4. **Errors** - Monitor issues

---

## ✅ Complete Setup Checklist

- [ ] Created Firebase project
- [ ] Enabled Email/Password authentication
- [ ] Created Firestore database
- [ ] Got Firebase config from console
- [ ] Added config to login.html
- [ ] Set up Firestore security rules
- [ ] Tested signup (created account)
- [ ] Verified user in Firebase Console
- [ ] Tested login
- [ ] Tested password reset

---

**Your T-Konekt platform is now using Firebase! 🎉**

All changes are in login.html - commit and push when ready!

**Last Updated:** January 12, 2026  
**Status:** Firebase integrated, ready for setup
