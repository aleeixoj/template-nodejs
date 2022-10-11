interface IUserTokenDTO {
  uuid_user: string;
  expires_date: Date;
  refresh_token: string;
}

export { IUserTokenDTO };
