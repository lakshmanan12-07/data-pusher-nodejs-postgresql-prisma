import argon2 from 'argon2';

/**
 * This function will generate the password hash
 */
const generatePasswordHash = async (password: string): Promise<string | null> => {
    try {
        const passwordHash = await argon2.hash(password);
        return passwordHash;
    } catch (error) {
        return null;
    }
};

/**
 * This function will verify the password hash.
 */
const verifyPasswordHash = async (password: string, passwordHash: string): Promise<boolean> => {
    try {
        if (await argon2.verify(passwordHash, password)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export default {
    generatePasswordHash,
    verifyPasswordHash
};
