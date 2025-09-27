# TN Happy Kids Playschool App

A comprehensive school management system built with React Native and Expo for TN Happy Kids Playschool.

## 🏗️ Architecture

- **Frontend**: React Native with Expo
- **Backend**: PHP REST API
- **Database**: MySQL (MariaDB)
- **Development**: Quarantine methodology (incremental development)

## 🚀 Features

### Phase 1 - Authentication ✅
- [x] Beautiful login screen with gradient design
- [x] Multi-role authentication system
- [x] Mock user system for development
- [x] Secure session management
- [x] Role-based routing preparation

### Phase 2 - Navigation (In Progress)
- [ ] Role-based navigation system
- [ ] Admin dashboard
- [ ] Student portal
- [ ] Teacher interface
- [ ] Captain/Driver interface
- [ ] Franchisee management

### Phase 3 - Core Features (Planned)
- [ ] Attendance management
- [ ] Fee management and invoicing
- [ ] Activity posting and feeds
- [ ] Homework assignments
- [ ] Real-time messaging
- [ ] Live cab tracking
- [ ] Story management
- [ ] Payment processing

## 👥 User Roles

- **Admin**: Complete system management
- **Teacher**: Class management, attendance, homework
- **Student**: View activities, homework, attendance
- **Captain**: Attendance marking, student management
- **Franchisee**: Branch management and oversight
- **Tuition Teacher**: Tuition class management
- **Tuition Student**: Tuition portal access

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DineshWebDev2003/2up.git
   cd 2up
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/emulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web

## 🧪 Testing

### Mock Credentials
Use these usernames for testing (any password):
- `admin` - Administrator access
- `student` - Student portal
- `teacher` - Teacher interface
- `captain` - Captain/Attendance marker
- `franchisee` - Franchisee management
- `tuition student` - Tuition student access
- `tuition teacher` - Tuition teacher interface

## 📱 Tech Stack

- **React Native**: 0.81.4
- **Expo**: ~54.0.10
- **Expo Router**: ~4.0.10
- **Linear Gradient**: ~14.0.1
- **AsyncStorage**: 1.23.1
- **Vector Icons**: ^13.0.0

## 🏗️ Development Methodology

This project follows a **Quarantine Methodology**:
1. **Phase 1**: Authentication & Core Setup ✅
2. **Phase 2**: Navigation & Role Management
3. **Phase 3**: Feature Modules (Attendance, Fees, etc.)
4. **Phase 4**: Advanced Features (Chat, Payments, etc.)
5. **Phase 5**: Production Optimization & Deployment

## 📂 Project Structure

```
happy-kids-app/
├── app/
│   ├── constants/
│   │   └── colors.js
│   ├── utils/
│   │   ├── api.js
│   │   └── notifications.js
│   ├── login.js
│   └── login-simple.js
├── assets/
│   ├── Avartar.png
│   ├── icon.png
│   └── splash.png
├── config.js
├── App.js
└── package.json
```

## 🔧 Configuration

The app uses a centralized configuration system in `config.js`:
- API endpoints
- User roles
- Feature flags
- Theme settings
- Validation rules

## 🚀 Deployment

### GitHub Workflows (Planned)
- Automated testing
- Build generation
- Expo publishing
- Release management

## 📄 License

This project is proprietary software for TN Happy Kids Playschool.

## 👨‍💻 Developer

**Dinesh Web Dev**
- GitHub: [@DineshWebDev2003](https://github.com/DineshWebDev2003)
- Project: TN Happy Kids Playschool Management System

---

**Status**: Phase 1 Complete ✅ | Phase 2 In Progress 🚧
