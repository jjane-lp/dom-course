// User Management Utility Functions
// This file contains all functions for managing user data

class UserManager {
    constructor() {
        this.storageKey = 'users';
        this.currentUserKey = 'currentUser';
        this.initializeStorage();
    }

    // Initialize storage with default data if empty
    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultUsers = [
                {
                    id: 1,
                    firstName: "John",
                    lastName: "Doe",
                    email: "john@example.com",
                    phone: "+1234567890",
                    password: "Password123!",
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                    isActive: true
                },
                {
                    id: 2,
                    firstName: "Jane",
                    lastName: "Smith",
                    email: "jane@example.com",
                    phone: "+0987654321",
                    password: "SecurePass456@",
                    createdAt: new Date().toISOString(),
                    lastLogin: null,
                    isActive: true
                }
            ];
            this.saveUsers(defaultUsers);
        }
    }

    // Get all users from localStorage
    getUsers() {
        try {
            const users = localStorage.getItem(this.storageKey);
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Error parsing users data:', error);
            return [];
        }
    }

    // Save users to localStorage
    saveUsers(users) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('Error saving users data:', error);
            return false;
        }
    }

    // Add a new user
    addUser(userData) {
        const users = this.getUsers();
        
        // Check if email already exists
        if (this.getUserByEmail(userData.email)) {
            throw new Error('User with this email already exists');
        }

        // Create new user object
        const newUser = {
            id: this.generateUserId(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email.toLowerCase(),
            phone: userData.phone,
            password: userData.password, // In real apps, hash this
            createdAt: new Date().toISOString(),
            lastLogin: null,
            isActive: true
        };

        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    }

    // Get user by email
    getUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    // Get user by ID
    getUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id === parseInt(id));
    }

    // Update user data
    updateUser(userId, updateData) {
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.id === parseInt(userId));
        
        if (userIndex === -1) {
            throw new Error('User not found');
        }

        // Update user data
        users[userIndex] = { ...users[userIndex], ...updateData };
        this.saveUsers(users);
        return users[userIndex];
    }

    // Delete user
    deleteUser(userId) {
        const users = this.getUsers();
        const updatedUsers = users.filter(user => user.id !== parseInt(userId));
        
        if (users.length === updatedUsers.length) {
            throw new Error('User not found');
        }

        this.saveUsers(updatedUsers);
        return true;
    }

    // Authenticate user
    authenticateUser(email, password) {
        const user = this.getUserByEmail(email);
        
        if (!user) {
            throw new Error('User not found');
        }

        if (!user.isActive) {
            throw new Error('User account is disabled');
        }

        if (user.password !== password) {
            throw new Error('Invalid password');
        }

        // Update last login
        this.updateUser(user.id, { lastLogin: new Date().toISOString() });
        
        return user;
    }

    // Set current logged-in user
    setCurrentUser(user) {
        try {
            localStorage.setItem(this.currentUserKey, JSON.stringify(user));
            return true;
        } catch (error) {
            console.error('Error setting current user:', error);
            return false;
        }
    }

    // Get current logged-in user
    getCurrentUser() {
        try {
            const currentUser = localStorage.getItem(this.currentUserKey);
            return currentUser ? JSON.parse(currentUser) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    // Logout current user
    logout() {
        localStorage.removeItem(this.currentUserKey);
        return true;
    }

    // Generate unique user ID
    generateUserId() {
        const users = this.getUsers();
        return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    }

    // Search users by name or email
    searchUsers(query) {
        const users = this.getUsers();
        const searchTerm = query.toLowerCase();
        
        return users.filter(user => 
            user.firstName.toLowerCase().includes(searchTerm) ||
            user.lastName.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
    }

    // Get user statistics
    getUserStats() {
        const users = this.getUsers();
        const activeUsers = users.filter(user => user.isActive);
        const usersWithLogin = users.filter(user => user.lastLogin);
        
        return {
            totalUsers: users.length,
            activeUsers: activeUsers.length,
            usersWithLogin: usersWithLogin.length,
            inactiveUsers: users.length - activeUsers.length,
            recentRegistrations: users.filter(user => {
                const createdDate = new Date(user.createdAt);
                const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                return createdDate > oneWeekAgo;
            }).length
        };
    }

    // Export users data as JSON
    exportUsers() {
        const users = this.getUsers();
        const exportData = {
            users: users,
            metadata: {
                exportDate: new Date().toISOString(),
                totalUsers: users.length,
                version: "1.0"
            }
        };
        return JSON.stringify(exportData, null, 2);
    }

    // Import users data from JSON
    importUsers(jsonData, mergeMode = false) {
        try {
            const data = JSON.parse(jsonData);
            const importedUsers = data.users || data;
            
            if (!Array.isArray(importedUsers)) {
                throw new Error('Invalid data format');
            }

            if (mergeMode) {
                // Merge with existing users
                const existingUsers = this.getUsers();
                const mergedUsers = [...existingUsers];
                
                importedUsers.forEach(importedUser => {
                    if (!this.getUserByEmail(importedUser.email)) {
                        mergedUsers.push({
                            ...importedUser,
                            id: this.generateUserId()
                        });
                    }
                });
                
                this.saveUsers(mergedUsers);
                return mergedUsers.length - existingUsers.length; // Return number of new users added
            } else {
                // Replace all users
                this.saveUsers(importedUsers);
                return importedUsers.length;
            }
        } catch (error) {
            throw new Error('Failed to import users: ' + error.message);
        }
    }

    // Validate user data
    validateUserData(userData) {
        const errors = [];

        // First name validation
        if (!userData.firstName || userData.firstName.trim().length < 2) {
            errors.push('First name must be at least 2 characters long');
        }

        // Last name validation
        if (!userData.lastName || userData.lastName.trim().length < 2) {
            errors.push('Last name must be at least 2 characters long');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userData.email || !emailRegex.test(userData.email)) {
            errors.push('Please provide a valid email address');
        }

        // Phone validation
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!userData.phone || !phoneRegex.test(userData.phone.replace(/[\s\-\(\)]/g, ''))) {
            errors.push('Please provide a valid phone number');
        }

        // Password validation
        if (!userData.password || userData.password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Usage example:
// const userManager = new UserManager();
// 
// // Add new user
// try {
//     const newUser = userManager.addUser({
//         firstName: "Alice",
//         lastName: "Wilson",
//         email: "alice@example.com",
//         phone: "+1555666777",
//         password: "MySecurePass123!"
//     });
//     console.log("User added:", newUser);
// } catch (error) {
//     console.error("Error adding user:", error.message);
// }
//
// // Authenticate user
// try {
//     const user = userManager.authenticateUser("alice@example.com", "MySecurePass123!");
//     userManager.setCurrentUser(user);
//     console.log("Login successful:", user);
// } catch (error) {
//     console.error("Login failed:", error.message);
// }
//
// // Get user statistics
// const stats = userManager.getUserStats();
// console.log("User statistics:", stats);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserManager;
}