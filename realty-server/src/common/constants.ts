export const jwtConstants = {
  secret: process.env.JWT_KEY,
};

export enum Role {
  Admin = 1,
  Client,
  Agent,
}
