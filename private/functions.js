// Admin Portal Functions

const mockUsers = JSON.parse(localStorage.getItem('mockUsers')) || [];
const mockPosts = JSON.parse(localStorage.getItem('mockPosts')) || [];
const mockGroups = JSON.parse(localStorage.getItem('mockGroups')) || [];

function loadPage(page) {
    const contentArea = document.getElementById('contentArea');
    
    switch(page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'users':
            loadUsersManagement();
            break;
        case 'posts':
            loadPostsManagement();
            break;
        case 'groups':
            loadGroupsManagement();
            break;
        case 'messages':
            loadBroadcastMessages();
            break;
        case 'emails':
            loadMassEmail();
            break;
        case 'reports':
            loadReports();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Dashboard
function loadDashboard() {
    const totalUsers = mockUsers.length;
    const totalPosts = mockPosts.length;
    const totalGroups = mockGroups.length;
    const totalLikes = mockPosts.reduce((sum, post) => sum + post.likes, 0);
    const totalComments = mockPosts.reduce((sum, post) => sum + post.comments, 0);
    
    document.getElementById('contentArea').innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold">Dashboard Overview</h2>
            <div>
                <button class="btn btn-primary" onclick="refreshStats()">
                    <i class="bi bi-arrow-clockwise me-2"></i>Refresh
                </button>
            </div>
        </div>
        
        <div class="row g-3 mb-4">
            <div class="col-md-3">
                <div class="card stat-card border-primary shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-muted mb-1">Total Users</h6>
                                <h2 class="mb-0 fw-bold">${totalUsers}</h2>
                            </div>
                            <div class="bg-primary bg-opacity-10 p-3 rounded">
                                <i class="bi bi-people-fill fs-2 text-primary"></i>
                            </div>
                        </div>
                        <small class="text-success"><i class="bi bi-arrow-up"></i> 12% from last month</small>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3">
                <div class="card stat-card border-success shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-muted mb-1">Total Posts</h6>
                                <h2 class="mb-0 fw-bold">${totalPosts}</h2>
                            </div>
                            <div class="bg-success bg-opacity-10 p-3 rounded">
                                <i class="bi bi-file-post fs-2 text-success"></i>
                            </div>
                        </div>
                        <small class="text-success"><i class="bi bi-arrow-up"></i> 8% from last month</small>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3">
                <div class="card stat-card border-warning shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-muted mb-1">Total Groups</h6>
                                <h2 class="mb-0 fw-bold">${totalGroups}</h2>
                            </div>
                            <div class="bg-warning bg-opacity-10 p-3 rounded">
                                <i class="bi bi-collection-fill fs-2 text-warning"></i>
                            </div>
                        </div>
                        <small class="text-success"><i class="bi bi-arrow-up"></i> 5% from last month</small>
                    </div>
                </div>
            </div>
            
            <div class="col-md-3">
                <div class="card stat-card border-danger shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-muted mb-1">Engagement</h6>
                                <h2 class="mb-0 fw-bold">${totalLikes + totalComments}</h2>
                            </div>
                            <div class="bg-danger bg-opacity-10 p-3 rounded">
                                <i class="bi bi-heart-fill fs-2 text-danger"></i>
                            </div>
                        </div>
                        <small class="text-success"><i class="bi bi-arrow-up"></i> 15% from last month</small>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row g-3">
            <div class="col-md-8">
                <div class="card shadow-sm">
                    <div class="card-header bg-white">
                        <h5 class="mb-0">Recent Activity</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Action</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${mockPosts.slice(0, 5).map(post => {
                                        const user = mockUsers.find(u => u.id === post.userId);
                                        return `
                                        <tr>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <img src="${user?.profilePic}" class="rounded-circle me-2" width="32">
                                                    <span>${user?.name}</span>
                                                </div>
                                            </td>
                                            <td>Created a new post</td>
                                            <td>${getTimeAgo(new Date(post.timestamp))}</td>
                                            <td><span class="badge bg-success">Active</span></td>
                                        </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="card shadow-sm mb-3">
                    <div class="card-header bg-white">
                        <h5 class="mb-0">Quick Actions</h5>
                    </div>
                    <div class="card-body">
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary" onclick="loadPage('messages')">
                                <i class="bi bi-chat-dots-fill me-2"></i>Send Broadcast Message
                            </button>
                            <button class="btn btn-outline-success" onclick="loadPage('emails')">
                                <i class="bi bi-envelope-fill me-2"></i>Send Mass Email
                            </button>
                            <button class="btn btn-outline-warning" onclick="loadPage('users')">
                                <i class="bi bi-person-plus-fill me-2"></i>Add New User
                            </button>
                            <button class="btn btn-outline-danger" onclick="loadPage('reports')">
                                <i class="bi bi-flag-fill me-2"></i>View Reports
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="card shadow-sm">
                    <div class="card-header bg-white">
                        <h5 class="mb-0">System Status</h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <small>Server Status</small>
                                <small class="text-success">Online</small>
                            </div>
                            <div class="progress" style="height: 5px;">
                                <div class="progress-bar bg-success" style="width: 100%"></div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <small>Database</small>
                                <small class="text-success">Healthy</small>
                            </div>
                            <div class="progress" style="height: 5px;">
                                <div class="progress-bar bg-success" style="width: 95%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-content-between mb-1">
                                <small>Storage</small>
                                <small class="text-warning">68%</small>
                            </div>
                            <div class="progress" style="height: 5px;">
                                <div class="progress-bar bg-warning" style="width: 68%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Users Management
function loadUsersManagement() {
    document.getElementById('contentArea').innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold">Users Management</h2>
            <div>
                <button class="btn btn-success" onclick="addNewUser()">
                    <i class="bi bi-person-plus me-2"></i>Add New User
                </button>
                <button class="btn btn-primary" onclick="exportUsers()">
                    <i class="bi bi-download me-2"></i>Export
                </button>
            </div>
        </div>
        
        <div class="card shadow-sm">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Search users..." id="userSearch" onkeyup="filterUsers()">
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="userStatusFilter" onchange="filterUsers()">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                            <option value="banned">Banned</option>
                        </select>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th><input type="checkbox" onclick="selectAllUsers(this)"></th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Friends</th>
                                <th>Posts</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="usersTableBody">
                            ${mockUsers.map(user => `
                                <tr>
                                    <td><input type="checkbox" class="user-checkbox" data-user-id="${user.id}"></td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="${user.profilePic}" class="rounded-circle me-2" width="40">
                                            <div>
                                                <strong>${user.name}</strong>
                                                <br><small class="text-muted">${user.id}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${user.email}</td>
                                    <td>${user.role === 'admin' ? '<span class="badge bg-warning"><i class="bi bi-shield-fill-check me-1"></i>Sub-Admin</span>' : '<span class="badge bg-secondary">User</span>'}</td>
                                    <td>${user.friends}</td>
                                    <td>${mockPosts.filter(p => p.userId === user.id).length}</td>
                                    <td><span class="badge bg-success">Active</span></td>
                                    <td class="table-actions">
                                        <button class="btn btn-sm btn-primary" onclick="editUser('${user.id}')">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-sm btn-warning" onclick="suspendUser('${user.id}')">
                                            <i class="bi bi-pause-circle"></i>
                                        </button>
                                        <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.id}')">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <div>Showing ${mockUsers.length} users</div>
                    <nav>
                        <ul class="pagination mb-0">
                            <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}

// Posts Management
function loadPostsManagement() {
    document.getElementById('contentArea').innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold">Posts Management</h2>
            <div>
                <button class="btn btn-danger" onclick="deleteSelectedPosts()">
                    <i class="bi bi-trash me-2"></i>Delete Selected
                </button>
            </div>
        </div>
        
        <div class="card shadow-sm">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th><input type="checkbox"></th>
                                <th>Author</th>
                                <th>Content</th>
                                <th>Likes</th>
                                <th>Comments</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockPosts.map(post => {
                                const user = mockUsers.find(u => u.id === post.userId);
                                return `
                                <tr>
                                    <td><input type="checkbox" class="post-checkbox" data-post-id="${post.id}"></td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="${user?.profilePic}" class="rounded-circle me-2" width="32">
                                            <span>${user?.name}</span>
                                        </div>
                                    </td>
                                    <td><small>${post.content.substring(0, 50)}...</small></td>
                                    <td><i class="bi bi-heart-fill text-danger"></i> ${post.likes}</td>
                                    <td><i class="bi bi-chat-fill text-primary"></i> ${post.comments}</td>
                                    <td><small>${getTimeAgo(new Date(post.timestamp))}</small></td>
                                    <td class="table-actions">
                                        <button class="btn btn-sm btn-info" onclick="viewPost('${post.id}')">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <button class="btn btn-sm btn-danger" onclick="deletePost('${post.id}')">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Groups Management
function loadGroupsManagement() {
    document.getElementById('contentArea').innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold">Groups Management</h2>
            <button class="btn btn-success" onclick="addNewGroup()">
                <i class="bi bi-plus-circle me-2"></i>Create Group
            </button>
        </div>
        
        <div class="row g-3">
            ${mockGroups.map(group => `
                <div class="col-md-4">
                    <div class="card shadow-sm">
                        <img src="${group.image}" class="card-img-top" alt="${group.name}" style="height: 150px; object-fit: cover;">
                        <div class="card-body">
                            <h6 class="fw-bold">${group.name}</h6>
                            <p class="text-muted small mb-2">${group.category}</p>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <small><i class="bi bi-people-fill me-1"></i>${group.members} members</small>
                                <span class="badge bg-success">Active</span>
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-sm btn-primary" onclick="viewGroup('${group.id}')">
                                    <i class="bi bi-eye me-2"></i>View
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="deleteGroup('${group.id}')">
                                    <i class="bi bi-trash me-2"></i>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Broadcast Messages
function loadBroadcastMessages() {
    document.getElementById('contentArea').innerHTML = `
        <div class="mb-4">
            <h2 class="fw-bold">Broadcast Messages</h2>
            <p class="text-muted">Send messages to all users or specific groups</p>
        </div>
        
        <div class="row">
            <div class="col-md-8">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <form id="broadcastForm" onsubmit="sendBroadcastMessage(event)">
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Recipients</label>
                                <select class="form-select" id="broadcastRecipients">
                                    <option value="all">All Users (${mockUsers.length})</option>
                                    <option value="active">Active Users Only</option>
                                    <option value="groups">Specific Groups</option>
                                    <option value="custom">Custom Selection</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Message Type</label>
                                <div class="btn-group w-100" role="group">
                                    <input type="radio" class="btn-check" name="messageType" id="typeNotification" value="notification" checked>
                                    <label class="btn btn-outline-primary" for="typeNotification">
                                        <i class="bi bi-bell me-2"></i>Notification
                                    </label>
                                    
                                    <input type="radio" class="btn-check" name="messageType" id="typeMessage" value="message">
                                    <label class="btn btn-outline-primary" for="typeMessage">
                                        <i class="bi bi-chat me-2"></i>Direct Message
                                    </label>
                                    
                                    <input type="radio" class="btn-check" name="messageType" id="typeAlert" value="alert">
                                    <label class="btn btn-outline-primary" for="typeAlert">
                                        <i class="bi bi-exclamation-triangle me-2"></i>Alert
                                    </label>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Message Title</label>
                                <input type="text" class="form-control" id="messageTitle" placeholder="Enter message title" required>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Message Content</label>
                                <textarea class="form-control" id="messageContent" rows="6" placeholder="Enter your message here..." required></textarea>
                                <small class="text-muted">Maximum 500 characters</small>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Schedule (Optional)</label>
                                <input type="datetime-local" class="form-control" id="scheduleTime">
                            </div>
                            
                            <div class="d-flex gap-2">
                                <button type="submit" class="btn btn-primary flex-fill">
                                    <i class="bi bi-send me-2"></i>Send Now
                                </button>
                                <button type="button" class="btn btn-outline-secondary" onclick="saveDraft()">
                                    <i class="bi bi-save me-2"></i>Save Draft
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="card shadow-sm mb-3">
                    <div class="card-header bg-white">
                        <h6 class="mb-0">Message History</h6>
                    </div>
                    <div class="card-body">
                        <div class="list-group list-group-flush">
                            <div class="list-group-item px-0">
                                <div class="d-flex justify-content-between">
                                    <strong class="small">System Update</strong>
                                    <small class="text-muted">2h ago</small>
                                </div>
                                <small class="text-muted">Sent to All Users</small>
                            </div>
                            <div class="list-group-item px-0">
                                <div class="d-flex justify-content-between">
                                    <strong class="small">Welcome Message</strong>
                                    <small class="text-muted">1d ago</small>
                                </div>
                                <small class="text-muted">Sent to Active Users</small>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card shadow-sm">
                    <div class="card-header bg-white">
                        <h6 class="mb-0">Quick Templates</h6>
                    </div>
                    <div class="card-body">
                        <div class="d-grid gap-2">
                            <button class="btn btn-sm btn-outline-primary" onclick="loadTemplate('welcome')">Welcome Message</button>
                            <button class="btn btn-sm btn-outline-primary" onclick="loadTemplate('update')">System Update</button>
                            <button class="btn btn-sm btn-outline-primary" onclick="loadTemplate('maintenance')">Maintenance Alert</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Mass Email
function loadMassEmail() {
    document.getElementById('contentArea').innerHTML = `
        <div class="mb-4">
            <h2 class="fw-bold">Mass Email Campaign</h2>
            <p class="text-muted">Send emails to users</p>
        </div>
        
        <div class="row">
            <div class="col-md-8">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <form id="emailForm" onsubmit="sendMassEmail(event)">
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Recipients</label>
                                <select class="form-select" id="emailRecipients">
                                    <option value="all">All Users (${mockUsers.length} emails)</option>
                                    <option value="verified">Verified Emails Only</option>
                                    <option value="subscribers">Newsletter Subscribers</option>
                                    <option value="custom">Custom Email List</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Subject Line</label>
                                <input type="text" class="form-control" id="emailSubject" placeholder="Enter email subject" required>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Email Template</label>
                                <select class="form-select" id="emailTemplate">
                                    <option value="plain">Plain Text</option>
                                    <option value="html">HTML Template</option>
                                    <option value="newsletter">Newsletter</option>
                                    <option value="announcement">Announcement</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Email Content</label>
                                <div class="btn-toolbar mb-2" role="toolbar">
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-type-bold"></i></button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-type-italic"></i></button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-type-underline"></i></button>
                                    </div>
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-link"></i></button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-image"></i></button>
                                    </div>
                                </div>
                                <textarea class="form-control" id="emailContent" rows="10" placeholder="Enter your email content here..." required></textarea>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Attachments (Optional)</label>
                                <input type="file" class="form-control" multiple>
                            </div>
                            
                            <div class="d-flex gap-2">
                                <button type="submit" class="btn btn-primary flex-fill">
                                    <i class="bi bi-envelope me-2"></i>Send Email Campaign
                                </button>
                                <button type="button" class="btn btn-outline-info" onclick="previewEmail()">
                                    <i class="bi bi-eye me-2"></i>Preview
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="card shadow-sm mb-3">
                    <div class="card-header bg-white">
                        <h6 class="mb-0">Email Statistics</h6>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <small>Sent Today</small>
                                <strong>250</strong>
                            </div>
                            <div class="progress" style="height: 5px;">
                                <div class="progress-bar bg-primary" style="width: 75%"></div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1">
                                <small>Open Rate</small>
                                <strong>68%</strong>
                            </div>
                            <div class="progress" style="height: 5px;">
                                <div class="progress-bar bg-success" style="width: 68%"></div>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-content-between mb-1">
                                <small>Click Rate</small>
                                <strong>42%</strong>
                            </div>
                            <div class="progress" style="height: 5px;">
                                <div class="progress-bar bg-info" style="width: 42%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card shadow-sm">
                    <div class="card-header bg-white">
                        <h6 class="mb-0">Recent Campaigns</h6>
                    </div>
                    <div class="card-body">
                        <div class="list-group list-group-flush">
                            <div class="list-group-item px-0">
                                <strong class="small d-block">Monthly Newsletter</strong>
                                <small class="text-muted">Sent to 1,234 users</small>
                                <div><small class="text-success">98% delivered</small></div>
                            </div>
                            <div class="list-group-item px-0">
                                <strong class="small d-block">New Features</strong>
                                <small class="text-muted">Sent to 987 users</small>
                                <div><small class="text-success">96% delivered</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Reports & Moderation
function loadReports() {
    document.getElementById('contentArea').innerHTML = `
        <div class="mb-4">
            <h2 class="fw-bold">Reports & Moderation</h2>
            <p class="text-muted">Review and moderate reported content</p>
        </div>
        
        <div class="card shadow-sm">
            <div class="card-body">
                <ul class="nav nav-tabs mb-3">
                    <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" href="#reportedPosts">Reported Posts</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#reportedUsers">Reported Users</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#spam">Spam Detection</a>
                    </li>
                </ul>
                
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="reportedPosts">
                        <div class="alert alert-info">
                            <i class="bi bi-info-circle me-2"></i>No reported posts at the moment
                        </div>
                    </div>
                    <div class="tab-pane fade" id="reportedUsers">
                        <div class="alert alert-info">
                            <i class="bi bi-info-circle me-2"></i>No reported users at the moment
                        </div>
                    </div>
                    <div class="tab-pane fade" id="spam">
                        <div class="alert alert-success">
                            <i class="bi bi-check-circle me-2"></i>No spam detected
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Analytics
function loadAnalytics() {
    document.getElementById('contentArea').innerHTML = `
        <div class="mb-4">
            <h2 class="fw-bold">Analytics & Insights</h2>
            <p class="text-muted">Platform performance and user behavior</p>
        </div>
        
        <div class="row g-3">
            <div class="col-md-12">
                <div class="card shadow-sm">
                    <div class="card-header bg-white">
                        <h5 class="mb-0">User Growth</h5>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-info">
                            <i class="bi bi-graph-up me-2"></i>Analytics charts would be displayed here with Chart.js or similar library
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Settings
function loadSettings() {
    document.getElementById('contentArea').innerHTML = `
        <div class="mb-4">
            <h2 class="fw-bold">Admin Settings</h2>
            <p class="text-muted">Configure platform settings</p>
        </div>
        
        <div class="card shadow-sm">
            <div class="card-body">
                <h5 class="mb-3">General Settings</h5>
                <div class="mb-3">
                    <label class="form-label">Platform Name</label>
                    <input type="text" class="form-control" value="FaithBook">
                </div>
                <div class="mb-3">
                    <label class="form-label">Support Email</label>
                    <input type="email" class="form-control" value="support@faithbook.com">
                </div>
                <button class="btn btn-primary">Save Settings</button>
            </div>
        </div>
    `;
}

// Utility Functions
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (const [key, value] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / value);
        if (interval >= 1) {
            return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
}

// Action Functions
function refreshStats() {
    loadDashboard();
}

function editUser(userId) {
    alert(`Edit user: ${userId}`);
}

function suspendUser(userId) {
    if (confirm('Are you sure you want to suspend this user?')) {
        alert(`User ${userId} suspended`);
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        alert(`User ${userId} deleted`);
    }
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        const index = mockPosts.findIndex(p => p.id === postId);
        if (index > -1) {
            mockPosts.splice(index, 1);
            localStorage.setItem('mockPosts', JSON.stringify(mockPosts));
            loadPostsManagement();
        }
    }
}

function viewPost(postId) {
    alert(`View post: ${postId}`);
}

function deleteGroup(groupId) {
    if (confirm('Are you sure you want to delete this group?')) {
        alert(`Group ${groupId} deleted`);
    }
}

function sendBroadcastMessage(event) {
    event.preventDefault();
    const recipients = document.getElementById('broadcastRecipients').value;
    const messageType = document.querySelector('input[name="messageType"]:checked').value;
    const title = document.getElementById('messageTitle').value;
    const content = document.getElementById('messageContent').value;
    
    // Get current notifications or create empty array
    let notifications = JSON.parse(localStorage.getItem('userNotifications')) || [];
    
    // Get all users who should receive this notification
    let targetUsers = [];
    if (recipients === 'all') {
        targetUsers = mockUsers;
    } else if (recipients === 'active') {
        targetUsers = mockUsers.filter(u => u.status !== 'suspended');
    }
    
    // Create notification for each user
    const newNotification = {
        id: Date.now(),
        type: 'admin',
        message: `<strong>${title}:</strong> ${content}`,
        time: 'Just now',
        read: false,
        icon: messageType === 'alert' ? 'bi-exclamation-triangle-fill text-danger' : 
              messageType === 'message' ? 'bi-chat-fill text-info' : 
              'bi-megaphone-fill text-primary',
        link: '#'
    };
    
    // Add notification to storage
    notifications.unshift(newNotification);
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
    
    // Show success message
    alert(`✅ Broadcast message sent successfully!\n\n📊 Recipients: ${targetUsers.length} users\n📝 Title: ${title}\n💬 Type: ${messageType}\n\n✓ Notification has been delivered to all users.`);
    document.getElementById('broadcastForm').reset();
    
    // Reload page to show in message history
    loadBroadcastMessages();
}

function sendMassEmail(event) {
    event.preventDefault();
    const recipients = document.getElementById('emailRecipients').value;
    const subject = document.getElementById('emailSubject').value;
    const content = document.getElementById('emailContent').value;
    
    // Get target users
    let targetUsers = [];
    if (recipients === 'all') {
        targetUsers = mockUsers;
    } else if (recipients === 'active') {
        targetUsers = mockUsers.filter(u => u.status !== 'suspended');
    }
    
    // Store email in localStorage for record
    let emailHistory = JSON.parse(localStorage.getItem('emailHistory')) || [];
    const newEmail = {
        id: Date.now(),
        recipients: recipients,
        recipientCount: targetUsers.length,
        subject: subject,
        content: content,
        timestamp: new Date().toISOString(),
        status: 'sent'
    };
    emailHistory.unshift(newEmail);
    localStorage.setItem('emailHistory', JSON.stringify(emailHistory));
    
    alert(`✅ Mass email campaign sent successfully!\n\n📧 Recipients: ${targetUsers.length} users\n📨 Subject: ${subject}\n\n✓ Emails have been queued for delivery.\n\nNote: In production, this would use services like:\n• SendGrid\n• Mailgun\n• AWS SES\n• Postmark`);
    document.getElementById('emailForm').reset();
    
    // Reload page to show in email history
    loadMassEmail();
}

function loadTemplate(type) {
    const templates = {
        welcome: {
            title: 'Welcome to FaithBook!',
            content: 'Welcome to our community! We\'re excited to have you here. Explore, connect, and share with friends.'
        },
        update: {
            title: 'System Update Notification',
            content: 'We\'ve made some improvements to enhance your experience. Check out the new features!'
        },
        maintenance: {
            title: 'Scheduled Maintenance',
            content: 'We\'ll be performing maintenance on [DATE]. The platform will be unavailable for approximately 2 hours.'
        }
    };
    
    if (templates[type]) {
        document.getElementById('messageTitle').value = templates[type].title;
        document.getElementById('messageContent').value = templates[type].content;
    }
}

function saveDraft() {
    alert('Message saved as draft');
}

function previewEmail() {
    alert('Email preview would be shown here');
}

function filterUsers() {
    // Filter implementation
}

function selectAllUsers(checkbox) {
    document.querySelectorAll('.user-checkbox').forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

function exportUsers() {
    alert('Users data would be exported as CSV/Excel file');
}

function addNewUser() {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="addUserModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addUserForm">
                            <div class="mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="newUserName" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" id="newUserEmail" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input type="password" class="form-control" id="newUserPassword" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Bio (Optional)</label>
                                <textarea class="form-control" id="newUserBio" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Profile Picture URL (Optional)</label>
                                <input type="url" class="form-control" id="newUserProfilePic" placeholder="https://via.placeholder.com/150">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">User Role</label>
                                <select class="form-select" id="newUserRole">
                                    <option value="user">Regular User</option>
                                    <option value="admin">Sub-Admin</option>
                                </select>
                                <small class="text-muted">Sub-admins can manage users and content but cannot access all admin features</small>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveNewUser()">Create User</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('addUserModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
    modal.show();
}

function saveNewUser() {
    const name = document.getElementById('newUserName').value;
    const email = document.getElementById('newUserEmail').value;
    const password = document.getElementById('newUserPassword').value;
    const bio = document.getElementById('newUserBio').value;
    const profilePic = document.getElementById('newUserProfilePic').value || 'https://via.placeholder.com/150';
    const role = document.getElementById('newUserRole').value;
    
    if (!name || !email || !password) {
        alert('❌ Please fill in all required fields');
        return;
    }
    
    // Get existing users
    let users = JSON.parse(localStorage.getItem('mockUsers')) || [];
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        alert('❌ A user with this email already exists');
        return;
    }
    
    // Create new user object
    const newUser = {
        id: `user${Date.now()}`,
        name: name,
        email: email,
        password: password,
        profilePic: profilePic,
        coverPhoto: 'https://via.placeholder.com/800x300',
        bio: bio || 'New to FaithBook',
        friends: 0,
        role: role,
        createdAt: new Date().toISOString()
    };
    
    // Add to users array
    users.push(newUser);
    
    // Save to localStorage
    localStorage.setItem('mockUsers', JSON.stringify(users));
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
    modal.hide();
    
    // Show success message
    alert(`✅ User created successfully!\n\n👤 Name: ${name}\n📧 Email: ${email}\n${role === 'admin' ? '👑 Role: Sub-Admin' : '👤 Role: Regular User'}\n\n✓ User can now log in to the platform.`);
    
    // Reload users page
    loadUsersManagement();
}

function addNewGroup() {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="addGroupModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create New Group</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addGroupForm">
                            <div class="mb-3">
                                <label class="form-label">Group Name</label>
                                <input type="text" class="form-control" id="newGroupName" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Category</label>
                                <select class="form-select" id="newGroupCategory">
                                    <option value="Faith & Spirituality">Faith & Spirituality</option>
                                    <option value="Community">Community</option>
                                    <option value="Study Group">Study Group</option>
                                    <option value="Support">Support</option>
                                    <option value="Social">Social</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Description</label>
                                <textarea class="form-control" id="newGroupDescription" rows="3" required></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Privacy</label>
                                <select class="form-select" id="newGroupPrivacy">
                                    <option value="public">Public - Anyone can see and join</option>
                                    <option value="private">Private - Members must be approved</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Group Image URL (Optional)</label>
                                <input type="url" class="form-control" id="newGroupImage" placeholder="https://via.placeholder.com/400">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveNewGroup()">Create Group</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('addGroupModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addGroupModal'));
    modal.show();
}

function saveNewGroup() {
    const name = document.getElementById('newGroupName').value;
    const category = document.getElementById('newGroupCategory').value;
    const description = document.getElementById('newGroupDescription').value;
    const privacy = document.getElementById('newGroupPrivacy').value;
    const image = document.getElementById('newGroupImage').value || 'https://via.placeholder.com/400';
    
    if (!name || !description) {
        alert('❌ Please fill in all required fields');
        return;
    }
    
    // Get existing groups
    let groups = JSON.parse(localStorage.getItem('mockGroups')) || [];
    
    // Create new group object
    const newGroup = {
        id: `group${Date.now()}`,
        name: name,
        category: category,
        description: description,
        members: 1,
        image: image,
        privacy: privacy,
        createdAt: new Date().toISOString()
    };
    
    // Add to groups array
    groups.push(newGroup);
    
    // Save to localStorage
    localStorage.setItem('mockGroups', JSON.stringify(groups));
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addGroupModal'));
    modal.hide();
    
    // Show success message
    alert(`✅ Group created successfully!\n\n👥 Name: ${name}\n📁 Category: ${category}\n🔒 Privacy: ${privacy}\n\n✓ Group is now available for users to join.`);
    
    // Reload groups page
    loadGroupsManagement();
}

function viewGroup(groupId) {
    alert(`View group: ${groupId}`);
}

function deleteSelectedPosts() {
    const selected = document.querySelectorAll('.post-checkbox:checked');
    if (selected.length === 0) {
        alert('Please select posts to delete');
        return;
    }
    if (confirm(`Delete ${selected.length} selected posts?`)) {
        alert(`${selected.length} posts deleted`);
        loadPostsManagement();
    }
}
