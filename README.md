# User Authentication System

A complete client-side user authentication system built with HTML, CSS, and JavaScript using localStorage for data persistence.

## 🚀 Features

### ✅ User Registration
- Complete signup form with real-time validation
- Password strength requirements
- Duplicate email checking
- Form validation with visual feedback

### ✅ User Login
- Email/password authentication
- Session management
- Remember user sessions
- View registered users functionality

### ✅ User Dashboard
- Protected route (login required)
- User profile display
- View all registered users
- Logout functionality

### ✅ Profile Management
- Edit profile information
- Change password with validation
- Account deletion
- Real-time form validation

### ✅ Password Recovery
- Forgot password functionality
- Step-by-step reset process
- Code verification (demo mode)
- New password setup

### ✅ Additional Features
- Responsive design
- Modern UI/UX
- Real-time validation
- Error handling
- Success messages
- Demo data for testing

## 📁 Project Structure

```
user-auth-system/
│
├── login.html           # User login page
├── signup.html          # User registration page
├── dashboard.html       # Protected dashboard
├── profile.html         # User profile management
├── forgot-password.html # Password recovery
├── user-manager.js      # User management utilities (optional)
├── users.json          # Demo user data
└── README.md           # Project documentation
```

## 🛠 Setup Instructions

### Method 1: Simple File Opening
1. Download all files to a local directory
2. Open `login.html` in your web browser
3. The system will automatically create demo users on first load

### Method 2: Local Server (Recommended)
1. Install a local server (e.g., Live Server for VS Code, Python's http.server, or Node.js http-server)
2. Start the server in the project directory
3. Navigate to `login.html` in your browser

## 👥 Demo Users

The system comes with pre-configured demo users for testing:

| Email | Password | Name |
|-------|----------|------|
| john@example.com | Password123! | John Doe |
| jane@example.com | SecurePass456@ | Jane Smith |

## 🔧 How to Use

### 1. Registration Process
1. Navigate to `signup.html` or click "Sign up here" from login page
2. Fill out the registration form:
   - First Name (2-50 characters, letters only)
   - Last Name (2-50 characters, letters only)
   - Phone Number (valid format)
   - Email Address (valid email format)
   - Password (must meet complexity requirements)
3. Submit the form to create your account
4. You'll be redirected to the login page

### 2. Login Process
1. Start at `login.html`
2. Enter your email and password
3. Click "Login" to access your dashboard
4. Use "View Registered Users" to see all users (demo feature)

### 3. Dashboard Access
- After successful login, you'll be redirected to `dashboard.html`
- View your profile information
- See all registered users
- Access profile management
- Logout when done

### 4. Profile Management
1. Click "Profile" in the navigation or go to `profile.html`
2. Click "Edit Profile" to modify your information
3. Use "Change Password" section to update your password
4. "Danger Zone" allows account deletion (irreversible)

### 5. Password Recovery
1. From login page, click "Forgot your password?"
2. Enter your email address
3. Use demo code: `123456` (in real implementation, this would be sent via email)
4. Set your new password
5. Login with your new credentials

## 🔒 Security Features

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Data Validation
- Real-time form validation
- Email format checking
- Phone number validation
- Name validation (letters only)
- Password strength checking

### Session Management
- User session persistence
- Protected routes
- Automatic logout functionality
- Current user tracking

## 💾 Data Storage

This system uses **localStorage** for client-side data persistence:

- **Users Array**: Stored under key `'users'`
- **Current Session**: Stored under key `'currentUser'`
- **Automatic Initialization**: Demo users created on first load

### Data Structure
```javascript
// User Object
{
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    password: "Password123!", // In production, this should be hashed
    createdAt: "2024-01-15T10:30:00.000Z",
    lastLogin: "2024-01-20T14:22:00.000Z",
    isActive: true
}
```

## 🚨 Important Security Notes

⚠️ **This is a DEMO system for learning purposes only!**

### Current Limitations:
- Passwords are stored in **plain text** (never do this in production!)
- No server-side validation
- No rate limiting
- No CSRF protection
- Client-side only (easily manipulated)

### For Production Use:
- Hash passwords using bcrypt or similar
- Implement server-side validation
- Use HTTPS for all communications
- Add rate limiting and brute force protection
- Implement proper session management
- Add CSRF tokens
- Use secure authentication libraries
- Validate all inputs server-side
- Implement proper error handling
- Add logging and monitoring

## 🎨 Customization

### Styling
- Modify CSS in each HTML file's `<style>` section
- Consistent color scheme across all pages
- Responsive design principles
- Modern UI components

### Validation Rules
You can modify validation functions in each file:
```javascript
function validatePassword(password) {
    return {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
}
```

### Adding Features
- Email verification simulation
- User roles and permissions
- Profile pictures
- Activity logging
- Export/Import functionality

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration with valid data
- [ ] User registration with invalid data
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials
- [ ] Password reset flow
- [ ] Profile editing
- [ ] Password change
- [ ] Account deletion
- [ ] Session persistence
- [ ] Logout functionality

### Test Cases
1. **Registration Edge Cases**:
   - Duplicate email addresses
   - Invalid email formats
   - Weak passwords
   - Empty fields

2. **Login Edge Cases**:
   - Non-existent email
   - Wrong password
   - Empty fields

3. **Profile Management**:
   - Edit with duplicate email
   - Password change with wrong current password
   - Account deletion confirmation

## 🔧 Troubleshooting

### Common Issues

**Problem**: Users not persisting between sessions
**Solution**: Check if localStorage is enabled in your browser

**Problem**: Demo users not appearing
**Solution**: Clear localStorage and refresh the page

**Problem**: Forms not validating
**Solution**: Check browser console for JavaScript errors

**Problem**: Styling issues
**Solution**: Ensure CSS is loading properly, check for conflicts

### Browser Compatibility
- Modern browsers with localStorage support
- JavaScript enabled
- No special permissions required

## 📝 Development Notes

### File Dependencies
- Each HTML file is self-contained
- No external libraries required
- Pure vanilla JavaScript
- Inline CSS for simplicity

### Code Organization
- Consistent naming conventions
- Modular validation functions
- Event-driven architecture
- Error handling throughout

## 🚀 Future Enhancements

### Potential Improvements
- [ ] Server-side implementation
- [ ] Database integration
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Social media login
- [ ] Password strength meter
- [ ] Account lockout after failed attempts
- [ ] Remember me functionality
- [ ] Dark mode toggle
- [ ] Multi-language support

### Advanced Features
- [ ] Admin panel
- [ ] User roles and permissions
- [ ] Audit logging
- [ ] API integration
- [ ] Mobile app companion
- [ ] Export user data
- [ ] Bulk user operations

## 📄 License

This project is created for educational purposes. Feel free to use, modify, and distribute as needed.

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

### How to Contribute
1. Fork the project
2. Create your feature branch
3. Test your changes thoroughly
4. Submit a pull request

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review the code comments
3. Test with demo users first
4. Ensure browser compatibility

---

**Remember**: This is a client-side demo system. Never use this approach for real user authentication without proper server-side security measures!