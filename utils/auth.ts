import Cookies from 'js-cookie';

// Template functions
export const getUserIdFromToken = (): number | null => {
    return 1; // Template user ID
};

export const getUserEmailFromToken = (): string | null => {
    return 'user@example.com'; // Template email
};

export const getUserNameFromToken = (): { firstName: string | null, lastName: string | null } => {
    return {
        firstName: 'John',
        lastName: 'Doe'
    };
};

export const setAccessToken = (token: string) => {
    Cookies.set('access_token', token, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 1 // 1 day
    });
};

export const getAccessToken = (): string | undefined => {
    return Cookies.get('access_token');
};

export const removeAccessToken = () => {
    Cookies.remove('access_token');
}; 