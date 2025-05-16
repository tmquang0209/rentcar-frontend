export interface IPermission {
  id: string;
  name: string;
  code: string;
}

export interface IRole {
  id: string;
  name: string;
  code: string;
  permissions: IPermission[];
}

export interface UserInfo {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  accessToken: string;
  refreshToken: string;
  status: boolean;
  role?: IRole;
}

export interface IForgotPassword {
  status: string;
  message: string;
  data: {
    success: boolean;
  };
}

export interface IUserCreate {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthday: Date;
  address: string;
  roleId: string;
}

export interface IUserUpdate extends IUserCreate {
  id: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IAuthor {
  id: string;
  fullName: string;
}
