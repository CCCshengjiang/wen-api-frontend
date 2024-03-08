declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
    description?: string;
  };

  type BaseResponseInteger = {
    code?: number;
    data?: number;
    message?: string;
    description?: string;
  };

  type BaseResponseListInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo[];
    message?: string;
    description?: string;
  };

  type BaseResponseListUser = {
    code?: number;
    data?: User[];
    message?: string;
    description?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
    description?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
    description?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type InterfaceAddRequest = {
    name?: string;
    description?: string;
    url?: string;
    method?: string;
    requestHeader?: string;
    responseHeader?: string;
  };

  type InterfaceInfo = {
    id?: number;
    name?: string;
    description?: string;
    userId?: string;
    url?: string;
    method?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    createTime?: string;
    updateTime?: string;
    isDeleted?: number;
  };

  type InterfaceSearchRequest = {
    id?: number;
    name?: string;
    description?: string;
    userId?: string;
    url?: string;
    method?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
  };

  type InterfaceUpdateRequest = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    method?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
  };

  type searchInterfaceParams = {
    interfaceSearchRequest: InterfaceSearchRequest;
  };

  type User = {
    id?: number;
    username?: string;
    avatarUrl?: string;
    gender?: number;
    userAccount?: string;
    userPassword?: string;
    phone?: string;
    email?: string;
    userStatus?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    userRole?: number;
    tags?: string;
    userProfile?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type userSearchParams = {
    userSearchRequest: UserSearchRequest;
  };

  type UserSearchRequest = {
    username?: string;
    gender?: number;
    userAccount?: string;
    phone?: string;
    email?: string;
    userStatus?: number;
    createTime?: string;
    userRole?: number;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    username?: string;
    avatarUrl?: string;
    gender?: number;
    userPassword?: string;
    phone?: string;
    email?: string;
    userStatus?: number;
    userRole?: number;
    tags?: string;
    userProfile?: string;
  };
}
