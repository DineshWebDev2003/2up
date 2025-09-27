# 🔐 GitHub Secrets Setup Guide

To enable automatic app exports and builds, you need to configure the following GitHub secrets in your repository.

## 🚀 Required Secrets

### 1. EXPO_TOKEN
**Purpose**: Authenticate with Expo services for publishing and building

**How to get it**:
1. Install Expo CLI: `npm install -g @expo/cli`
2. Login to Expo: `expo login`
3. Generate token: `expo whoami --token`
4. Copy the token

**How to add to GitHub**:
1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `EXPO_TOKEN`
5. Value: Paste your Expo token
6. Click **Add secret**

### 2. EAS_PROJECT_ID (Optional)
**Purpose**: Links your project to Expo Application Services

**How to set it**:
- EAS will automatically manage project IDs based on your app slug
- No manual configuration needed
- If you have an existing EAS project, you can add its UUID here

## 🛠️ Setup Steps

### Step 1: Install Expo CLI
```bash
npm install -g @expo/cli
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
expo login
```
Enter your Expo account credentials.

### Step 3: Initialize EAS (if not done)
```bash
cd your-project-directory
eas init
```

### Step 4: Get Your Token
```bash
expo whoami --token
```
Copy this token - you'll need it for GitHub secrets.

### Step 5: Configure GitHub Secrets
1. Go to: `https://github.com/DineshWebDev2003/2up/settings/secrets/actions`
2. Add the secrets as described above

## 🎯 Workflow Triggers

### Automatic Triggers:
- **Push to main branch**: Triggers web export and Expo Go publish
- **Create version tag** (e.g., `v1.0.0`): Triggers full build (Android + iOS + Web) and creates GitHub release

### Manual Triggers:
- **Manual Build Workflow**: Go to Actions → "Manual Build & Export" → "Run workflow"
  - Choose export type (web-only, android-only, ios-only, or all)
  - Choose build profile (development, preview, production)
  - Option to create GitHub release

## 📱 Build Outputs

### Web Export:
- **Location**: `dist/` folder
- **Usage**: Deploy to any web server (Netlify, Vercel, etc.)
- **Access**: Direct web URL

### Android APK:
- **File**: `tn-happy-kids.apk`
- **Usage**: Install directly on Android devices
- **Requirements**: Enable "Install from unknown sources"

### iOS IPA:
- **File**: `tn-happy-kids.ipa`
- **Usage**: TestFlight or enterprise distribution
- **Requirements**: Apple Developer account for distribution

### Expo Go:
- **Access**: Scan QR code in Expo Go app
- **Platform**: iOS and Android
- **Usage**: Development and testing

## 🔧 Troubleshooting

### Common Issues:

1. **"EXPO_TOKEN not found"**
   - Make sure you've added the secret correctly
   - Check the secret name is exactly `EXPO_TOKEN`

2. **"Build failed - authentication error"**
   - Your Expo token might be expired
   - Generate a new token and update the secret

3. **"EAS project not found"**
   - Run `eas init` in your project
   - Make sure `EAS_PROJECT_ID` secret matches your project

4. **"Build timeout"**
   - Large builds can take 10-20 minutes
   - Check Expo dashboard for build status

## 📊 Monitoring Builds

### GitHub Actions:
- Go to **Actions** tab in your repository
- Monitor workflow progress
- Download artifacts when complete

### Expo Dashboard:
- Visit: https://expo.dev/
- Check build status and logs
- Download builds directly

## 🎉 Success Indicators

When everything is set up correctly, you should see:
- ✅ Green checkmarks in GitHub Actions
- 📦 Build artifacts available for download
- 🚀 Expo Go updates published
- 📱 APK/IPA files generated

---

**Need Help?** 
- Check GitHub Actions logs for detailed error messages
- Visit Expo documentation: https://docs.expo.dev/
- Ensure all secrets are correctly configured
