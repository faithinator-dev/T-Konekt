# 🚀 QUICK START GUIDE

## 1️⃣ Get Firebase Config (2 minutes)

1. Go to https://console.firebase.google.com/
2. Click "Add project" → Name it → Create
3. Enable **Authentication** (Email/Password)
4. Enable **Realtime Database** (Test mode)
5. Enable **Storage** (Test mode)
6. Go to Project Settings → Web App → Copy config

## 2️⃣ Update Config (1 minute)

1. Copy `firebase-config.example.js` to `firebase-config.js`.
2. Open `firebase-config.js` and paste your Firebase config.
3. This file is ignored by Git, so your keys are safe.

## 3️⃣ Deploy Rules (1 minute)

In Firebase Console:
- **Realtime Database → Rules** → Paste from `database.rules.json`
- **Storage → Rules** → Paste from `storage.rules`

## 4️⃣ Test Locally

Open `index.html` in browser OR run:
```bash
python -m http.server 8000
```

## 5️⃣ Deploy to Web (1 minute)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## ✅ Done! Your app is LIVE!

### Test It:
1. Sign up with email/password
2. Search for friends (test with another account)
3. Send messages (real-time!)
4. Create posts
5. Start video call (📹 Meet button)

---

**Total Setup Time: 5 minutes** ⏱️

Need help? Check the full README.md!
