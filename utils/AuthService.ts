import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'app_registered_users';

const seedAdminUser = async () => {
    const adminUser = {
        id: 'admin_1',
        username: 'admin',
        password: 'admin',
        email: 'admin@example.com'
    };
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify([adminUser]));
    return [adminUser];
};

export const getAllUsers = async () => {
    try {
        const stored = await AsyncStorage.getItem(USERS_KEY);
        if (!stored) {
            return await seedAdminUser();
        }
        return JSON.parse(stored);
    } catch {
        return [];
    }
};

export const registerUser = async (user: any) => {
    try {
        const stored = await AsyncStorage.getItem(USERS_KEY);
        let dynamicUsers = stored ? JSON.parse(stored) : [];

        // If completely empty, we might want to just start fresh or seed.
        // But for registration, we just append.

        if (dynamicUsers.some((u: any) => u.username.toLowerCase().trim() === user.username.toLowerCase().trim())) {
            return { success: false, message: 'Username already exists' };
        }

        const newUser = { ...user, id: Date.now().toString() };
        dynamicUsers.push(newUser);

        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(dynamicUsers));
        return { success: true, message: 'Registration successful' };
    } catch (error) {
        return { success: false, message: 'Registration failed' };
    }
};

export const loginUser = async (username: string, password: string) => {
    try {
        const stored = await AsyncStorage.getItem(USERS_KEY);
        let dynamicUsers = stored ? JSON.parse(stored) : null;

        if (!dynamicUsers || dynamicUsers.length === 0) {
            dynamicUsers = await seedAdminUser();
        }

        const user = dynamicUsers.find((u: any) =>
            u.username.toLowerCase().trim() === username.toLowerCase().trim() &&
            u.password === password
        );

        if (user) {
            return { success: true, user };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error) {
        console.error('Login Error:', error);
        return { success: false, message: 'Login failed' };
    }
};

export const updateUser = async (currentUsername: string, currentPassword: string, newUsername: string, newPassword: string) => {
    try {
        const stored = await AsyncStorage.getItem(USERS_KEY);
        let dynamicUsers = stored ? JSON.parse(stored) : [];

        const index = dynamicUsers.findIndex((u: any) =>
            u.username.toLowerCase().trim() === currentUsername.toLowerCase().trim() &&
            u.password === currentPassword
        );

        if (index === -1) {
            return { success: false, message: 'User not found or invalid credentials' };
        }

        // Check if new username is taken by someone else
        if (newUsername.toLowerCase().trim() !== currentUsername.toLowerCase().trim()) {
            if (dynamicUsers.some((u: any, idx: number) => idx !== index && u.username.toLowerCase().trim() === newUsername.toLowerCase().trim())) {
                return { success: false, message: 'New username already taken' };
            }
        }

        dynamicUsers[index].username = newUsername.trim();
        dynamicUsers[index].password = newPassword;

        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(dynamicUsers));
        return { success: true, message: 'Credentials updated' };

    } catch (error) {
        return { success: false, message: 'Update failed' };
    }
};
