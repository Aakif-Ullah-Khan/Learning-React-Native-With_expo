import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type AuthMode = "login" | "signup";

interface FormState {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

export default function HomeScreen() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const slideAnim = React.useRef(new Animated.Value(0)).current;

  // Toggle between login and signup with animation
  const toggleMode = (newMode: AuthMode) => {
    if (newMode !== mode) {
      Animated.timing(slideAnim, {
        toValue: newMode === "signup" ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

      setMode(newMode);
      setForm({ email: "", password: "", name: "", confirmPassword: "" });
      setErrors({});
      setSuccessful(false);
    }
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form inputs
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (mode === "signup") {
      if (!form.name.trim()) {
        newErrors.name = "Name is required";
      } else if (form.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }

      if (!form.confirmPassword.trim()) {
        newErrors.confirmPassword = "Confirm password is required";
      } else if (form.confirmPassword !== form.password) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle authentication
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setSuccessful(true);
        setTimeout(() => setSuccessful(false), 2500);
      }, 1500);
    }
  };

  const updateForm = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error for this field when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  // Animation values
  const cardOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
  });

  const signupOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Background Gradient Effect */}
          <View style={styles.backgroundGradient} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Welcome</Text>
            <Text style={styles.headerSubtitle}>
              {mode === "login"
                ? "Sign in to your account"
                : "Create your account"}
            </Text>
          </View>

          {/* Mode Toggle */}
          <View style={styles.modeToggle}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                mode === "login" && styles.toggleButtonActive,
              ]}
              onPress={() => toggleMode("login")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  mode === "login" && styles.toggleButtonTextActive,
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                mode === "signup" && styles.toggleButtonActive,
              ]}
              onPress={() => toggleMode("signup")}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  mode === "signup" && styles.toggleButtonTextActive,
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Card */}
          <Animated.View
            style={[
              styles.formCard,
              mode === "signup" && { opacity: signupOpacity },
              mode === "login" && { opacity: cardOpacity },
            ]}
          >
            {/* Name Field (Signup only) */}
            {mode === "signup" && (
              <View style={styles.inputContainer}>
                <View style={styles.inputLabelContainer}>
                  <MaterialCommunityIcons
                    name="account"
                    size={18}
                    color="#6B7280"
                    style={styles.inputIcon}
                  />
                  <Text style={styles.inputLabel}>Full Name</Text>
                </View>
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  placeholder="John Doe"
                  placeholderTextColor="#D1D5DB"
                  value={form.name}
                  onChangeText={(value) => updateForm("name", value)}
                  editable={!isLoading}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
            )}

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <View style={styles.inputLabelContainer}>
                <MaterialCommunityIcons
                  name="email"
                  size={18}
                  color="#6B7280"
                  style={styles.inputIcon}
                />
                <Text style={styles.inputLabel}>Email Address</Text>
              </View>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="you@example.com"
                placeholderTextColor="#D1D5DB"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(value) => updateForm("email", value)}
                editable={!isLoading}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <View style={styles.inputLabelContainer}>
                <MaterialCommunityIcons
                  name="lock"
                  size={18}
                  color="#6B7280"
                  style={styles.inputIcon}
                />
                <Text style={styles.inputLabel}>Password</Text>
              </View>
              <View
                style={[
                  styles.passwordContainer,
                  errors.password && styles.inputError,
                ]}
              >
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#D1D5DB"
                  secureTextEntry={!showPassword}
                  value={form.password}
                  onChangeText={(value) => updateForm("password", value)}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password Field (Signup only) */}
            {mode === "signup" && (
              <View style={styles.inputContainer}>
                <View style={styles.inputLabelContainer}>
                  <MaterialCommunityIcons
                    name="lock-check"
                    size={18}
                    color="#6B7280"
                    style={styles.inputIcon}
                  />
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                </View>
                <View
                  style={[
                    styles.passwordContainer,
                    errors.confirmPassword && styles.inputError,
                  ]}
                >
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="••••••••"
                    placeholderTextColor="#D1D5DB"
                    secureTextEntry={!showConfirmPassword}
                    value={form.confirmPassword}
                    onChangeText={(value) =>
                      updateForm("confirmPassword", value)
                    }
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialCommunityIcons
                      name={showConfirmPassword ? "eye" : "eye-off"}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
            )}

            {/* Forgot Password (Login only) */}
            {mode === "login" && (
              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            {/* Success Message */}
            {successful && (
              <View style={styles.successMessage}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color="#10B981"
                />
                <Text style={styles.successMessageText}>
                  {mode === "login" ? "Login successful!" : "Account created!"}
                </Text>
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                isLoading && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isLoading || successful}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <View style={styles.submitButtonContent}>
                  <Text style={styles.submitButtonText}>
                    {mode === "login" ? "Sign In" : "Create Account"}
                  </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={20}
                    color="#FFFFFF"
                  />
                </View>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="google"
                  size={24}
                  color="#DB4437"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="apple"
                  size={24}
                  color="#000000"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="github"
                  size={24}
                  color="#181717"
                />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Footer Text */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Text
                style={styles.footerLink}
                onPress={() =>
                  toggleMode(mode === "login" ? "signup" : "login")
                }
              >
                {mode === "login" ? "Sign Up" : "Login"}
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: "#F3F4F6",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: -1,
  },
  // Header
  header: {
    marginBottom: 32,
    marginTop: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  // Mode Toggle
  modeToggle: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  toggleButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
  },
  toggleButtonTextActive: {
    color: "#3B82F6",
  },
  // Form Card
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
    marginBottom: 24,
  },
  // Input Container
  inputContainer: {
    marginBottom: 20,
  },
  inputLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#1F2937",
    backgroundColor: "#FAFAFA",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 6,
    fontWeight: "500",
  },
  // Password Container
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FAFAFA",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1F2937",
  },
  // Forgot Password
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3B82F6",
  },
  // Success Message
  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  successMessageText: {
    fontSize: 14,
    color: "#10B981",
    fontWeight: "600",
    marginLeft: 10,
  },
  // Submit Button
  submitButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 8,
  },
  // Divider
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "500",
    paddingHorizontal: 12,
  },
  // Social Buttons
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  // Footer
  footer: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  footerLink: {
    color: "#3B82F6",
    fontWeight: "700",
  },
});
