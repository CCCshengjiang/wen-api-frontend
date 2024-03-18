declare namespace API {
  type ApiKeyVO = {
    accessKey?: string;
    secretKey?: string;
  };

  type BaseResponseApiKeyVO = {
    code?: number;
    data?: ApiKeyVO;
    message?: string;
    description?: string;
  };

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

  type BaseResponseInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
    description?: string;
  };

  type BaseResponseListInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo[];
    message?: string;
    description?: string;
  };

  type BaseResponseListInterfaceTopVO = {
    code?: number;
    data?: InterfaceTopVO[];
    message?: string;
    description?: string;
  };

  type BaseResponseListSafetyUserVO = {
    code?: number;
    data?: SafetyUserVO[];
    message?: string;
    description?: string;
  };

  type BaseResponseObject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
    description?: string;
  };

  type BaseResponsePageInterfaceInfo = {
    code?: number;
    data?: PageInterfaceInfo;
    message?: string;
    description?: string;
  };

  type BaseResponseSafetyUserVO = {
    code?: number;
    data?: SafetyUserVO;
    message?: string;
    description?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type IdRequest = {
    id?: number;
  };

  type InterfaceInfo = {
    id?: number;
    interfaceName?: string;
    interfaceDescription?: string;
    userId?: number;
    interfaceUrl?: string;
    interfaceMethod?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    interfaceStatus?: number;
    createTime?: string;
    updateTime?: string;
    isDeleted?: number;
  };

  type InterfaceInvokeRequest = {
    id?: number;
    userRequestParams?: string;
    interfaceUrl?: string;
    interfaceMethod?: string;
  };

  type InterfaceSearchRequest = {
    id?: number;
    interfaceName?: string;
    interfaceDescription?: string;
    userId?: number;
    interfaceUrl?: string;
    interfaceMethod?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    interfaceStatus?: number;
  };

  type InterfaceTopVO = {
    interfaceName?: string;
    invokeNum?: number;
  };

  type InterfaceUpdateRequest = {
    id?: number;
    interfaceName?: string;
    interfaceDescription?: string;
    interfaceUrl?: string;
    interfaceMethod?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
  };

  type listInterfaceByPageParams = {
    pageRequest: PageRequest;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageInterfaceInfo = {
    records?: InterfaceInfo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageInterfaceInfo;
    searchCount?: PageInterfaceInfo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageRequest = {
    current?: number;
    pageSize?: number;
  };

  type SafetyUserVO = {
    id?: number;
    username?: string;
    avatarUrl?: string;
    gender?: number;
    userAccount?: string;
    phone?: string;
    email?: string;
    userStatus?: number;
    createTime?: string;
    updateTime?: string;
    userRole?: number;
  };

  type searchInterfaceByIdParams = {
    idRequest: IdRequest;
  };

  type searchInterfaceParams = {
    interfaceSearchRequest: InterfaceSearchRequest;
  };

  type userDeleteParams = {
    deleteRequest: DeleteRequest;
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
