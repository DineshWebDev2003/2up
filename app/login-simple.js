import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// Colors configuration
const Colors = {
  gradientMain: ['#8B5CF6', '#A855F7', '#C084FC'],
  gradientPrimary: ['#8B5CF6', '#A855F7'],
  primary: '#8B5CF6',
  white: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  border: 'rgba(255, 255, 255, 0.2)',
  background: '#FFFFFF',
  text: '#1F2937',
};

const roleRoutes = {
    'Admin': '/(admin)/home',
    'Administrator': '/(admin)/home',
    'Franchisee': '/(franchisee)/home',
    'Student': '/(student)/home',
    'Teacher': '/(teacher)/home',
    'Tuition Student': '/(tuition-student)/home',
    'Tuition Teacher': '/(tuition-teacher)/home',
    'Captain': '/(captain)/home',
    'Developer': '/(developer)/home',
};

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleLogin = async () => {
        // Mock users for development
        const mockUsers = {
            'admin': { role: 'Admin' },
            'student': { role: 'Student' },
            'teacher': { role: 'Teacher' },
            'captain': { role: 'Captain' },
            'franchisee': { role: 'Franchisee' },
            'tuition student': { role: 'Tuition Student' },
            'tuition teacher': { role: 'Tuition Teacher' },
        };

        const trimmedEmail = email.trim().toLowerCase();
        if (mockUsers[trimmedEmail]) {
            const userRole = mockUsers[trimmedEmail].role;
            const path = roleRoutes[userRole];
            
            console.log('🔍 MOCK DEBUG - User role:', userRole);
            console.log('🔍 MOCK DEBUG - Path found:', path);
            
            if (path) {
                await AsyncStorage.setItem('userRole', userRole);
                console.log('✅ Mock Login - Navigating to path:', path, 'for role:', userRole);
                
                // Set mock user data based on role
                const mockUserData = JSON.stringify({ 
                    id: 101, 
                    role: userRole.toLowerCase(), 
                    username: trimmedEmail,
                    name: `${userRole} Test User`,
                    email: `${trimmedEmail}@test.com`
                });
                await AsyncStorage.setItem('userData', mockUserData);
                
                Alert.alert('Success', `Logged in as ${userRole}! 🎉\n\nNext Phase: Navigation will be implemented.`, [
                    { text: 'OK', onPress: () => console.log('Login successful') }
                ]);
            } else {
                Alert.alert('Login Failed', `Unknown user role: ${userRole}`);
            }
            return;
        }

        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }
        
        Alert.alert('Info', 'Use mock credentials:\n• admin\n• student\n• teacher\n• captain\n• franchisee\n• tuition student\n• tuition teacher');
    };

    return (
        <LinearGradient 
            colors={Colors.gradientMain}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView 
                    style={styles.keyboardAvoidingView}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
                        {/* Header Section */}
                        <View style={styles.headerContainer}>
                            <View style={styles.logoContainer}>
                                <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']} style={styles.logoBackground}>
                                    <Image 
                                        source={require('../assets/Avartar.png')} 
                                        style={styles.logo}
                                        resizeMode="cover"
                                        onError={() => console.log('Image failed to load')}
                                    />
                                </LinearGradient>
                            </View>
                            <Text style={styles.title}>TN Happy Kids</Text>
                            <Text style={styles.subtitle}>Playschool Management</Text>
                            <Text style={styles.welcomeText}>Welcome back! Please sign in to continue</Text>
                        </View>

                        {/* Login Form */}
                        <View style={styles.formContainer}>
                            <View style={styles.formContent}>
                                <Text style={styles.formTitle}>Sign In</Text>
                                
                                <View style={styles.inputGroup}>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputIcon}>📧</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Email or Username"
                                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="default"
                                            autoCapitalize="none"
                                            selectionColor={Colors.primary}
                                        />
                                    </View>
                                    
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.inputIcon}>🔒</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!isPasswordVisible}
                                            selectionColor={Colors.primary}
                                        />
                                        <TouchableOpacity 
                                            onPress={() => setPasswordVisible(!isPasswordVisible)} 
                                            style={styles.eyeIconContainer}
                                        >
                                            <Text style={styles.eyeIcon}>
                                                {isPasswordVisible ? '🙈' : '👁️'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.forgotPasswordButton}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
                                    onPress={handleLogin} 
                                    disabled={loading}
                                >
                                    <LinearGradient colors={Colors.gradientPrimary} style={styles.loginButtonGradient}>
                                        {loading ? (
                                            <ActivityIndicator color={Colors.white} size="small" />
                                        ) : (
                                            <>
                                                <Text style={styles.loginButtonText}>Sign In</Text>
                                                <Text style={styles.loginArrow}>→</Text>
                                            </>
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    
    // Header Section
    headerContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    logoContainer: {
        marginBottom: 24,
    },
    logoBackground: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 8,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 8,
        textAlign: 'center',
        fontWeight: '500',
    },
    welcomeText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        lineHeight: 20,
    },
    
    // Form Container
    formContainer: {
        marginHorizontal: 24,
        paddingVertical: 20,
    },
    formContent: {
        alignItems: 'center',
    },
    formTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 32,
        textAlign: 'center',
    },
    
    // Input Group
    inputGroup: {
        width: '100%',
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 16,
        marginBottom: 16,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    inputIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.white,
        fontWeight: '500',
    },
    eyeIconContainer: {
        padding: 8,
        marginLeft: 8,
    },
    eyeIcon: {
        fontSize: 20,
    },
    
    // Forgot Password
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: 32,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '600',
    },
    
    // Login Button
    loginButton: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    loginButtonGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.white,
        letterSpacing: 0.5,
    },
    loginArrow: {
        fontSize: 20,
        color: Colors.white,
        marginLeft: 8,
    },
});
