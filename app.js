// Firebase Configuration (REPLACE WITH YOUR PROJECT CONFIG)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
const storage = firebase.storage();

// Global State
let currentUser = null;
let currentChatId = null;
let peerConnection = null;
let localStream = null;

// Auth State Observer
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        loadUserData();
        showScreen('mainApp');
        showView('feed');
    } else {
        showScreen('authScreen');
    }
});

// ========== AUTH FUNCTIONS ==========
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.querySelectorAll('#authToggle button')[0].classList.add('active');
    document.querySelectorAll('#authToggle button')[1].classList.remove('active');
}

function showSignup() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
    document.querySelectorAll('#authToggle button')[1].classList.add('active');
    document.querySelectorAll('#authToggle button')[0].classList.remove('active');
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        showError(error.message);
    }
});

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const uid = userCredential.user.uid;
        
        // Create user profile
        await db.ref('users/' + uid).set({
            username: username,
            email: email,
            phone: phone || '',
            createdAt: Date.now(),
            photoURL: 'https://via.placeholder.com/100'
        });
    } catch (error) {
        showError(error.message);
    }
});

function logout() {
    auth.signOut();
}

// ========== UI FUNCTIONS ==========
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId + 'View').classList.add('active');
    
    document.querySelectorAll('.bottom-nav button').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-view="${viewId}"]`).classList.add('active');
    
    if (viewId === 'feed') loadFeed();
    if (viewId === 'friends') loadFriends();
    if (viewId === 'chats') loadChats();
}

function showError(msg) {
    const errorEl = document.getElementById('authError');
    errorEl.textContent = msg;
    setTimeout(() => errorEl.textContent = '', 3000);
}

function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function showPostModal() {
    showModal('postModal');
}

function showSearchModal() {
    showModal('searchModal');
}

function showNewChatModal() {
    loadFriendsForChat();
    showModal('newChatModal');
}

// ========== USER DATA ==========
async function loadUserData() {
    const snapshot = await db.ref('users/' + currentUser.uid).once('value');
    const userData = snapshot.val();
    
    document.getElementById('profileName').textContent = userData.username;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('profilePic').src = userData.photoURL;
    
    // Load stats
    const friendsSnap = await db.ref('friends/' + currentUser.uid).once('value');
    const postsSnap = await db.ref('posts').orderByChild('userId').equalTo(currentUser.uid).once('value');
    
    document.getElementById('friendCount').textContent = friendsSnap.numChildren();
    document.getElementById('postCount').textContent = postsSnap.numChildren();
}

// Profile Picture Upload
document.getElementById('picUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const storageRef = storage.ref('profiles/' + currentUser.uid + '.jpg');
    await storageRef.put(file);
    const photoURL = await storageRef.getDownloadURL();
    
    await db.ref('users/' + currentUser.uid).update({ photoURL });
    document.getElementById('profilePic').src = photoURL;
});

// ========== FEED FUNCTIONS ==========
async function loadFeed() {
    const feedList = document.getElementById('feedList');
    feedList.innerHTML = '<div class="loading">Loading feed...</div>';
    
    const snapshot = await db.ref('posts').orderByChild('timestamp').limitToLast(50).once('value');
    const posts = [];
    
    snapshot.forEach(child => {
        posts.unshift({ id: child.key, ...child.val() });
    });
    
    feedList.innerHTML = '';
    
    for (const post of posts) {
        const userSnap = await db.ref('users/' + post.userId).once('value');
        const user = userSnap.val();
        
        const postEl = document.createElement('div');
        postEl.className = 'post';
        postEl.innerHTML = `
            <div class="post-header">
                <img src="${user.photoURL}" alt="${user.username}">
                <div>
                    <strong>${user.username}</strong>
                    <small>${formatTime(post.timestamp)}</small>
                </div>
            </div>
            <p class="post-content">${escapeHtml(post.content)}</p>
            <div class="post-actions">
                <button onclick="likePost('${post.id}')" class="${post.likes && post.likes[currentUser.uid] ? 'liked' : ''}">
                    ❤️ ${post.likeCount || 0}
                </button>
                <button onclick="showComments('${post.id}')">💬 ${post.commentCount || 0}</button>
            </div>
            <div id="comments-${post.id}" class="comments hidden"></div>
        `;
        feedList.appendChild(postEl);
    }
}

async function createPost() {
    const content = document.getElementById('postContent').value.trim();
    if (!content) return;
    
    const postRef = db.ref('posts').push();
    await postRef.set({
        userId: currentUser.uid,
        content: content,
        timestamp: Date.now(),
        likeCount: 0,
        commentCount: 0
    });
    
    document.getElementById('postContent').value = '';
    closeModal('postModal');
    loadFeed();
}

async function likePost(postId) {
    const likeRef = db.ref('posts/' + postId + '/likes/' + currentUser.uid);
    const snapshot = await likeRef.once('value');
    
    if (snapshot.exists()) {
        await likeRef.remove();
        await db.ref('posts/' + postId + '/likeCount').transaction(count => (count || 1) - 1);
    } else {
        await likeRef.set(true);
        await db.ref('posts/' + postId + '/likeCount').transaction(count => (count || 0) + 1);
    }
    
    loadFeed();
}

// ========== FRIENDS FUNCTIONS ==========
async function loadFriends() {
    const friendsList = document.getElementById('friendsList');
    friendsList.innerHTML = '<div class="loading">Loading friends...</div>';
    
    const snapshot = await db.ref('friends/' + currentUser.uid).once('value');
    friendsList.innerHTML = '';
    
    if (!snapshot.exists()) {
        friendsList.innerHTML = '<p class="empty">No friends yet. Search to add!</p>';
        return;
    }
    
    for (const [friendId, data] of Object.entries(snapshot.val())) {
        if (data.status === 'accepted') {
            const userSnap = await db.ref('users/' + friendId).once('value');
            const friend = userSnap.val();
            
            const friendEl = document.createElement('div');
            friendEl.className = 'friend-item';
            friendEl.innerHTML = `
                <img src="${friend.photoURL}" alt="${friend.username}">
                <div class="friend-info">
                    <strong>${friend.username}</strong>
                    <small>${friend.email}</small>
                </div>
                <button onclick="startChat('${friendId}')">💬</button>
            `;
            friendsList.appendChild(friendEl);
        }
    }
    
    // Load friend requests
    loadFriendRequests();
}

async function loadFriendRequests() {
    const requestsList = document.getElementById('requestsList');
    requestsList.innerHTML = '';
    
    const snapshot = await db.ref('friends/' + currentUser.uid).once('value');
    let hasRequests = false;
    
    if (snapshot.exists()) {
        for (const [friendId, data] of Object.entries(snapshot.val())) {
            if (data.status === 'pending' && data.type === 'received') {
                hasRequests = true;
                const userSnap = await db.ref('users/' + friendId).once('value');
                const user = userSnap.val();
                
                const requestEl = document.createElement('div');
                requestEl.className = 'friend-item';
                requestEl.innerHTML = `
                    <img src="${user.photoURL}" alt="${user.username}">
                    <div class="friend-info">
                        <strong>${user.username}</strong>
                        <small>${user.email}</small>
                    </div>
                    <button onclick="acceptFriend('${friendId}')">✅</button>
                    <button onclick="rejectFriend('${friendId}')">❌</button>
                `;
                requestsList.appendChild(requestEl);
            }
        }
    }
    
    if (!hasRequests) {
        requestsList.innerHTML = '<p class="empty">No pending requests</p>';
    }
}

function showFriendTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'list') {
        document.getElementById('friendsList').classList.remove('hidden');
        document.getElementById('requestsList').classList.add('hidden');
    } else {
        document.getElementById('friendsList').classList.add('hidden');
        document.getElementById('requestsList').classList.remove('hidden');
    }
}

async function searchUsers() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!query) return;
    
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '<div class="loading">Searching...</div>';
    
    const snapshot = await db.ref('users').once('value');
    resultsDiv.innerHTML = '';
    
    snapshot.forEach(child => {
        const user = child.val();
        const userId = child.key;
        
        if (userId !== currentUser.uid && 
            (user.username.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))) {
            
            const resultEl = document.createElement('div');
            resultEl.className = 'search-item';
            resultEl.innerHTML = `
                <img src="${user.photoURL}" alt="${user.username}">
                <div class="friend-info">
                    <strong>${user.username}</strong>
                    <small>${user.email}</small>
                </div>
                <button onclick="sendFriendRequest('${userId}')">➕ Add</button>
            `;
            resultsDiv.appendChild(resultEl);
        }
    });
    
    if (resultsDiv.innerHTML === '') {
        resultsDiv.innerHTML = '<p class="empty">No users found</p>';
    }
}

async function sendFriendRequest(friendId) {
    await db.ref('friends/' + currentUser.uid + '/' + friendId).set({
        status: 'pending',
        type: 'sent',
        timestamp: Date.now()
    });
    
    await db.ref('friends/' + friendId + '/' + currentUser.uid).set({
        status: 'pending',
        type: 'received',
        timestamp: Date.now()
    });
    
    alert('Friend request sent!');
}

async function acceptFriend(friendId) {
    await db.ref('friends/' + currentUser.uid + '/' + friendId).update({ status: 'accepted' });
    await db.ref('friends/' + friendId + '/' + currentUser.uid).update({ status: 'accepted' });
    loadFriends();
}

async function rejectFriend(friendId) {
    await db.ref('friends/' + currentUser.uid + '/' + friendId).remove();
    await db.ref('friends/' + friendId + '/' + currentUser.uid).remove();
    loadFriends();
}

// ========== CHAT FUNCTIONS ==========
async function loadChats() {
    const chatsList = document.getElementById('chatsList');
    chatsList.innerHTML = '<div class="loading">Loading chats...</div>';
    
    const snapshot = await db.ref('chats').orderByChild('members/' + currentUser.uid).equalTo(true).once('value');
    chatsList.innerHTML = '';
    
    if (!snapshot.exists()) {
        chatsList.innerHTML = '<p class="empty">No chats yet. Start one!</p>';
        return;
    }
    
    snapshot.forEach(child => {
        const chat = child.val();
        const chatId = child.key;
        
        const otherUserId = Object.keys(chat.members).find(id => id !== currentUser.uid);
        
        db.ref('users/' + otherUserId).once('value').then(userSnap => {
            const otherUser = userSnap.val();
            
            const chatEl = document.createElement('div');
            chatEl.className = 'chat-item';
            chatEl.onclick = () => openChat(chatId, otherUser.username);
            chatEl.innerHTML = `
                <img src="${otherUser.photoURL}" alt="${otherUser.username}">
                <div class="chat-info">
                    <strong>${otherUser.username}</strong>
                    <small>${chat.lastMessage || 'No messages yet'}</small>
                </div>
            `;
            chatsList.appendChild(chatEl);
        });
    });
}

async function loadFriendsForChat() {
    const container = document.getElementById('friendsForChat');
    container.innerHTML = '<div class="loading">Loading friends...</div>';
    
    const snapshot = await db.ref('friends/' + currentUser.uid).once('value');
    container.innerHTML = '';
    
    if (!snapshot.exists()) {
        container.innerHTML = '<p class="empty">No friends to chat with</p>';
        return;
    }
    
    for (const [friendId, data] of Object.entries(snapshot.val())) {
        if (data.status === 'accepted') {
            const userSnap = await db.ref('users/' + friendId).once('value');
            const friend = userSnap.val();
            
            const friendEl = document.createElement('div');
            friendEl.className = 'friend-item';
            friendEl.onclick = () => {
                startChat(friendId);
                closeModal('newChatModal');
            };
            friendEl.innerHTML = `
                <img src="${friend.photoURL}" alt="${friend.username}">
                <div class="friend-info">
                    <strong>${friend.username}</strong>
                </div>
            `;
            container.appendChild(friendEl);
        }
    }
}

async function startChat(friendId) {
    // Check if chat already exists
    const snapshot = await db.ref('chats').once('value');
    let existingChatId = null;
    
    snapshot.forEach(child => {
        const chat = child.val();
        if (chat.members && chat.members[currentUser.uid] && chat.members[friendId]) {
            existingChatId = child.key;
        }
    });
    
    if (existingChatId) {
        const userSnap = await db.ref('users/' + friendId).once('value');
        openChat(existingChatId, userSnap.val().username);
    } else {
        // Create new chat
        const chatRef = db.ref('chats').push();
        await chatRef.set({
            members: {
                [currentUser.uid]: true,
                [friendId]: true
            },
            createdAt: Date.now()
        });
        
        const userSnap = await db.ref('users/' + friendId).once('value');
        openChat(chatRef.key, userSnap.val().username);
    }
}

function openChat(chatId, chatName) {
    currentChatId = chatId;
    document.getElementById('chatRoomName').textContent = chatName;
    showView('chatRoom');
    loadMessages();
}

function loadMessages() {
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';
    
    db.ref('chats/' + currentChatId + '/messages').on('child_added', async snapshot => {
        const message = snapshot.val();
        const userSnap = await db.ref('users/' + message.userId).once('value');
        const user = userSnap.val();
        
        const messageEl = document.createElement('div');
        messageEl.className = 'message ' + (message.userId === currentUser.uid ? 'sent' : 'received');
        messageEl.innerHTML = `
            <img src="${user.photoURL}" alt="${user.username}">
            <div class="message-content">
                <small>${user.username}</small>
                <p>${escapeHtml(message.text)}</p>
                <small class="time">${formatTime(message.timestamp)}</small>
            </div>
        `;
        messagesList.appendChild(messageEl);
        messagesList.scrollTop = messagesList.scrollHeight;
    });
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    if (!text) return;
    
    await db.ref('chats/' + currentChatId + '/messages').push({
        userId: currentUser.uid,
        text: text,
        timestamp: Date.now()
    });
    
    await db.ref('chats/' + currentChatId).update({
        lastMessage: text,
        lastMessageTime: Date.now()
    });
    
    input.value = '';
}

document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// ========== VIDEO CALL (WebRTC) ==========
async function startVideoCall() {
    showView('videoCall');
    
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.getElementById('localVideo').srcObject = localStream;
        
        // Simple WebRTC setup (peer-to-peer signaling via RTDB)
        const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        peerConnection = new RTCPeerConnection(configuration);
        
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });
        
        peerConnection.ontrack = event => {
            document.getElementById('remoteVideo').srcObject = event.streams[0];
        };
        
        // Create offer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        
        // Send offer via RTDB
        await db.ref('calls/' + currentChatId + '/offer').set({
            from: currentUser.uid,
            sdp: offer.sdp,
            type: offer.type
        });
        
        // Listen for answer
        db.ref('calls/' + currentChatId + '/answer').on('value', async snapshot => {
            const answer = snapshot.val();
            if (answer && answer.from !== currentUser.uid) {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            }
        });
        
        // ICE candidates
        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                db.ref('calls/' + currentChatId + '/candidates').push({
                    from: currentUser.uid,
                    candidate: event.candidate.toJSON()
                });
            }
        };
        
    } catch (error) {
        alert('Camera access denied or error: ' + error.message);
        showView('chatRoom');
    }
}

function endCall() {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection) {
        peerConnection.close();
    }
    db.ref('calls/' + currentChatId).remove();
    showView('chatRoom');
}

// ========== UTILITY FUNCTIONS ==========
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    return date.toLocaleDateString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
