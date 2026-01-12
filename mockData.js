// Mock Data Initialization for T-Konekt
// This file initializes localStorage with demo data if not already present

(function initializeMockData() {
    // Initialize mock users if not present
    if (!localStorage.getItem('mockUsers')) {
        const mockUsers = [
            {
                id: 'user1',
                name: 'Faith Johnson',
                email: 'faith@faithbook.com',
                password: 'faith123',
                profilePic: 'https://i.pravatar.cc/150?img=1',
                coverPhoto: 'https://via.placeholder.com/800x300/667eea/ffffff?text=Faith+Johnson',
                bio: 'Living my best life! 🌟 Love, faith & positivity ✨',
                friends: 234,
                isAdmin: false
            },
            {
                id: 'user2',
                name: 'John Smith',
                email: 'john@example.com',
                password: 'john123',
                profilePic: 'https://i.pravatar.cc/150?img=12',
                coverPhoto: 'https://via.placeholder.com/800x300/764ba2/ffffff?text=John+Smith',
                bio: 'Tech enthusiast | Coffee lover ☕ | Adventure seeker 🏔️',
                friends: 156
            },
            {
                id: 'user3',
                name: 'Sarah Williams',
                email: 'sarah@example.com',
                password: 'sarah123',
                profilePic: 'https://i.pravatar.cc/150?img=5',
                coverPhoto: 'https://via.placeholder.com/800x300/667eea/ffffff?text=Sarah+Williams',
                bio: 'Artist 🎨 | Nature lover 🌿 | Making the world colorful',
                friends: 189
            },
            {
                id: 'user4',
                name: 'Michael Brown',
                email: 'michael@example.com',
                password: 'michael123',
                profilePic: 'https://i.pravatar.cc/150?img=15',
                coverPhoto: 'https://via.placeholder.com/800x300/764ba2/ffffff?text=Michael+Brown',
                bio: 'Fitness trainer 💪 | Motivational speaker | Health is wealth',
                friends: 312
            },
            {
                id: 'user5',
                name: 'Emily Davis',
                email: 'emily@example.com',
                password: 'emily123',
                profilePic: 'https://i.pravatar.cc/150?img=9',
                coverPhoto: 'https://via.placeholder.com/800x300/667eea/ffffff?text=Emily+Davis',
                bio: 'Travel blogger ✈️ | Food enthusiast 🍕 | Life is an adventure',
                friends: 278
            },
            {
                id: 'user6',
                name: 'David Martinez',
                email: 'david@example.com',
                password: 'david123',
                profilePic: 'https://i.pravatar.cc/150?img=13',
                coverPhoto: 'https://via.placeholder.com/800x300/764ba2/ffffff?text=David+Martinez',
                bio: 'Software developer 👨‍💻 | Open source contributor | Code is poetry',
                friends: 201
            },
            {
                id: 'user7',
                name: 'Jessica Taylor',
                email: 'jessica@example.com',
                password: 'jessica123',
                profilePic: 'https://i.pravatar.cc/150?img=10',
                coverPhoto: 'https://via.placeholder.com/800x300/667eea/ffffff?text=Jessica+Taylor',
                bio: 'Fashion designer 👗 | Style icon | Creating beauty every day',
                friends: 445
            },
            {
                id: 'user8',
                name: 'Chris Wilson',
                email: 'chris@example.com',
                password: 'chris123',
                profilePic: 'https://i.pravatar.cc/150?img=14',
                coverPhoto: 'https://via.placeholder.com/800x300/764ba2/ffffff?text=Chris+Wilson',
                bio: 'Photographer 📷 | Capturing moments | Life through my lens',
                friends: 367
            },
            {
                id: 'user9',
                name: 'Amanda Garcia',
                email: 'amanda@example.com',
                password: 'amanda123',
                profilePic: 'https://i.pravatar.cc/150?img=16',
                coverPhoto: 'https://via.placeholder.com/800x300/667eea/ffffff?text=Amanda+Garcia',
                bio: 'Writer ✍️ | Bookworm 📚 | Words are my world',
                friends: 223
            },
            {
                id: 'user10',
                name: 'Robert Johnson',
                email: 'robert@example.com',
                password: 'robert123',
                profilePic: 'https://i.pravatar.cc/150?img=11',
                coverPhoto: 'https://via.placeholder.com/800x300/764ba2/ffffff?text=Robert+Johnson',
                bio: 'Entrepreneur 💼 | Investor | Building the future',
                friends: 512
            }
        ];
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
    }

    // Initialize mock posts if not present
    if (!localStorage.getItem('mockPosts')) {
        const mockPosts = [
            {
                id: 'post1',
                userId: 'user1',
                userName: 'Faith Johnson',
                userAvatar: 'https://i.pravatar.cc/150?img=1',
                content: 'Feeling blessed today! 🙏 Just finished an amazing morning workout. Starting the day with gratitude and positive vibes! ✨',
                image: 'https://picsum.photos/600/400?random=1',
                likes: 45,
                comments: [
                    { userId: 'user2', userName: 'John Smith', text: 'Looking great! Keep it up! 💪', timestamp: '2h ago' },
                    { userId: 'user3', userName: 'Sarah Williams', text: 'So inspiring! ❤️', timestamp: '1h ago' }
                ],
                timestamp: '3 hours ago',
                likedBy: []
            },
            {
                id: 'post2',
                userId: 'user2',
                userName: 'John Smith',
                userAvatar: 'https://i.pravatar.cc/150?img=12',
                content: 'Just launched my new project! 🚀 Check it out and let me know what you think. Link in bio!',
                image: null,
                likes: 78,
                comments: [
                    { userId: 'user1', userName: 'Faith Johnson', text: 'Congratulations! This is amazing! 🎉', timestamp: '30m ago' }
                ],
                timestamp: '5 hours ago',
                likedBy: []
            },
            {
                id: 'post3',
                userId: 'user3',
                userName: 'Sarah Williams',
                userAvatar: 'https://i.pravatar.cc/150?img=5',
                content: 'Sunset painting session 🎨🌅 Nature is the best inspiration!',
                image: 'https://picsum.photos/600/400?random=2',
                likes: 92,
                comments: [],
                timestamp: '8 hours ago',
                likedBy: []
            },
            {
                id: 'post4',
                userId: 'user4',
                userName: 'Michael Brown',
                userAvatar: 'https://i.pravatar.cc/150?img=15',
                content: 'New workout routine dropping tomorrow! 💪 Who\'s ready to crush their fitness goals?',
                image: 'https://picsum.photos/600/400?random=3',
                likes: 134,
                comments: [
                    { userId: 'user5', userName: 'Emily Davis', text: 'Count me in! 🔥', timestamp: '2h ago' }
                ],
                timestamp: '12 hours ago',
                likedBy: []
            },
            {
                id: 'post5',
                userId: 'user5',
                userName: 'Emily Davis',
                userAvatar: 'https://i.pravatar.cc/150?img=9',
                content: 'Exploring the streets of Paris! 🇫🇷 The food, the culture, the people - everything is magnifique! ✨',
                image: 'https://picsum.photos/600/400?random=4',
                likes: 156,
                comments: [
                    { userId: 'user7', userName: 'Jessica Taylor', text: 'OMG I need to go there! 😍', timestamp: '4h ago' }
                ],
                timestamp: '1 day ago',
                likedBy: []
            },
            {
                id: 'post6',
                userId: 'user6',
                userName: 'David Martinez',
                userAvatar: 'https://i.pravatar.cc/150?img=13',
                content: 'Finally fixed that bug that\'s been haunting me for days! 🐛💻 The feeling of solving a complex problem is unbeatable!',
                image: null,
                likes: 67,
                comments: [],
                timestamp: '1 day ago',
                likedBy: []
            },
            {
                id: 'post7',
                userId: 'user7',
                userName: 'Jessica Taylor',
                userAvatar: 'https://i.pravatar.cc/150?img=10',
                content: 'New collection preview! 👗✨ Dropping next week. Which piece is your favorite?',
                image: 'https://picsum.photos/600/400?random=5',
                likes: 203,
                comments: [
                    { userId: 'user9', userName: 'Amanda Garcia', text: 'The blue dress is stunning! 😍', timestamp: '3h ago' }
                ],
                timestamp: '2 days ago',
                likedBy: []
            },
            {
                id: 'post8',
                userId: 'user8',
                userName: 'Chris Wilson',
                userAvatar: 'https://i.pravatar.cc/150?img=14',
                content: 'Golden hour magic ✨📷 There\'s something special about capturing this perfect light.',
                image: 'https://picsum.photos/600/400?random=6',
                likes: 189,
                comments: [],
                timestamp: '2 days ago',
                likedBy: []
            },
            {
                id: 'post9',
                userId: 'user9',
                userName: 'Amanda Garcia',
                userAvatar: 'https://i.pravatar.cc/150?img=16',
                content: 'Just finished my new novel! 📚✍️ Can\'t wait to share this story with the world. Publication date coming soon!',
                image: null,
                likes: 145,
                comments: [
                    { userId: 'user1', userName: 'Faith Johnson', text: 'Can\'t wait to read it! 📖', timestamp: '1d ago' }
                ],
                timestamp: '3 days ago',
                likedBy: []
            },
            {
                id: 'post10',
                userId: 'user10',
                userName: 'Robert Johnson',
                userAvatar: 'https://i.pravatar.cc/150?img=11',
                content: 'Startup milestone achieved! 🎯 From idea to execution. Thank you to everyone who believed in the vision! 🚀',
                image: 'https://picsum.photos/600/400?random=7',
                likes: 278,
                comments: [],
                timestamp: '3 days ago',
                likedBy: []
            }
        ];
        localStorage.setItem('mockPosts', JSON.stringify(mockPosts));
    }

    // Initialize mock groups if not present
    if (!localStorage.getItem('mockGroups')) {
        const mockGroups = [
            {
                id: 'group1',
                name: 'Tech Enthusiasts',
                description: 'Discussing the latest in technology, programming, and innovation',
                coverPhoto: 'https://picsum.photos/400/200?random=10',
                members: 1243,
                isJoined: true
            },
            {
                id: 'group2',
                name: 'Fitness & Wellness',
                description: 'Your journey to a healthier lifestyle starts here',
                coverPhoto: 'https://picsum.photos/400/200?random=11',
                members: 892,
                isJoined: false
            },
            {
                id: 'group3',
                name: 'Travel Lovers',
                description: 'Share your adventures and discover new destinations',
                coverPhoto: 'https://picsum.photos/400/200?random=12',
                members: 2156,
                isJoined: true
            },
            {
                id: 'group4',
                name: 'Art & Design',
                description: 'Creative community for artists and designers',
                coverPhoto: 'https://picsum.photos/400/200?random=13',
                members: 734,
                isJoined: false
            },
            {
                id: 'group5',
                name: 'Book Club',
                description: 'Monthly book discussions and recommendations',
                coverPhoto: 'https://picsum.photos/400/200?random=14',
                members: 567,
                isJoined: true
            },
            {
                id: 'group6',
                name: 'Photography Hub',
                description: 'Share tips, tricks, and stunning photographs',
                coverPhoto: 'https://picsum.photos/400/200?random=15',
                members: 1089,
                isJoined: false
            },
            {
                id: 'group7',
                name: 'Entrepreneurs Network',
                description: 'Connect with fellow entrepreneurs and business owners',
                coverPhoto: 'https://picsum.photos/400/200?random=16',
                members: 1567,
                isJoined: true
            },
            {
                id: 'group8',
                name: 'Food & Recipes',
                description: 'Share your favorite recipes and cooking experiences',
                coverPhoto: 'https://picsum.photos/400/200?random=17',
                members: 2034,
                isJoined: false
            }
        ];
        localStorage.setItem('mockGroups', JSON.stringify(mockGroups));
    }

    // Initialize notifications if not present
    if (!localStorage.getItem('userNotifications')) {
        const notifications = [
            {
                id: 'notif1',
                type: 'like',
                userId: 'user2',
                userName: 'John Smith',
                userAvatar: 'https://i.pravatar.cc/150?img=12',
                message: 'liked your post',
                timestamp: '5 minutes ago',
                read: false
            },
            {
                id: 'notif2',
                type: 'comment',
                userId: 'user3',
                userName: 'Sarah Williams',
                userAvatar: 'https://i.pravatar.cc/150?img=5',
                message: 'commented on your photo',
                timestamp: '1 hour ago',
                read: false
            },
            {
                id: 'notif3',
                type: 'friend',
                userId: 'user4',
                userName: 'Michael Brown',
                userAvatar: 'https://i.pravatar.cc/150?img=15',
                message: 'sent you a friend request',
                timestamp: '3 hours ago',
                read: true
            }
        ];
        localStorage.setItem('userNotifications', JSON.stringify(notifications));
    }

    // Initialize messages if not present
    if (!localStorage.getItem('mockMessages')) {
        const messages = [
            {
                chatId: 'chat1',
                participants: ['user1', 'user2'],
                messages: [
                    { senderId: 'user2', text: 'Hey! How are you?', timestamp: '10:30 AM' },
                    { senderId: 'user1', text: 'Hi! I\'m good, thanks! How about you?', timestamp: '10:32 AM' }
                ],
                lastMessage: 'Hi! I\'m good, thanks!',
                timestamp: '10:32 AM'
            }
        ];
        localStorage.setItem('mockMessages', JSON.stringify(messages));
    }

    console.log('✅ T-Konekt: Mock data initialized successfully!');
})();
