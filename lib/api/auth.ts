import Cookies from 'js-cookie';

export interface LoginData {
    email: string;
    password: string;
    rememberMe: boolean;
    enterprise_id: string;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

// Template auth service
export const authService = {
    async login(data: LoginData): Promise<TokenResponse> {
        // Simulate successful login
        const mockResponse: TokenResponse = {
            access_token: 'mock_access_token',
            refresh_token: 'mock_refresh_token',
            token_type: 'Bearer'
        };

        // Store mock token in cookies
        Cookies.set('access_token', mockResponse.access_token, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: 1
        });

        return mockResponse;
    },

    async register(data: { first_name: string; last_name: string; organization_name: string; email: string; password: string }): Promise<void> {
        // Simulate successful registration
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock registration successful:', data);
    },

    async forgotPassword(email: string): Promise<void> {
        // Simulate sending verification code
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock forgot password email sent to:', email);
    },

    async resetPassword(data: { email: string; verification_code: string; new_password: string }): Promise<void> {
        // Simulate password reset
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock password reset successful:', data);
    },

    async verifyEmail(email: string, code: string): Promise<void> {
        // Simulate email verification
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock email verification successful:', { email, code });
    },

    async logout(): Promise<void> {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
    },

    isAuthenticated(): boolean {
        return !!Cookies.get('access_token');
    }
}; 