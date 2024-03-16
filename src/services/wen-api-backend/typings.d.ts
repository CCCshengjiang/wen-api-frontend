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

  type BaseResponseListSafetyUserVO = {
    code?: number;
    data?: SafetyUserVO[];
    message?: string;
    description?: string;
  };

  type BaseResponseListUserInterfaceInfo = {
    code?: number;
    data?: UserInterfaceInfo[];
    message?: string;
    description?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
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

  type BaseResponsePageUserInterfaceInfo = {
    code?: number;
    data?: PageUserInterfaceInfo;
    message?: string;
    description?: string;
  };

  type BaseResponseSafetyUserVO = {
    code?: number;
    data?: SafetyUserVO;
    message?: string;
    description?: string;
  };

  type BaseResponseUserInterfaceInfo = {
    code?: number;
    data?: UserInterfaceInfo;
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

  type listUserInterfaceByPageParams = {
    pageRequest: Pageable;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type Pageable = {
    page?: number;
    size?: number;
    sort?: string[];
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

  type PageUserInterfaceInfo = {
    records?: UserInterfaceInfo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserInterfaceInfo;
    searchCount?: PageUserInterfaceInfo;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
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

  type searchUserInterfaceByIdParams = {
    idRequest: IdRequest;
  };

  type searchUserInterfaceParams = {
    userInterfaceSearchRequest: UserInterfaceSearchRequest;
  };

  type userDeleteParams = {
    deleteRequest: DeleteRequest;
  };

  type UserInterfaceAddRequest = {
    userId?: number;
    interfaceId?: number;
    totalNum?: number;
    balanceNum?: number;
  };

  type UserInterfaceInfo = {
    id?: number;
    userId?: number;
    interfaceId?: number;
    totalNum?: number;
    balanceNum?: number;
    userInterfaceStatus?: number;
    createTime?: string;
    updateTime?: string;
    isDeleted?: number;
  };

  type UserInterfaceSearchRequest = {
    id?: number;
    userId?: number;
    interfaceId?: number;
    totalNum?: number;
    balanceNum?: number;
    userInterfaceStatus?: number;
  };

  type UserInterfaceUpdateRequest = {
    id?: number;
    userId?: number;
    interfaceId?: number;
    totalNum?: number;
    balanceNum?: number;
    userInterfaceStatus?: number;
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
