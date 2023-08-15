export interface User {
  id: number;
}

export interface JwtPayload extends User {
  iat: string;
}

export interface RefreshTokenPayload extends JwtPayload {
  refreshToken: string;
}
