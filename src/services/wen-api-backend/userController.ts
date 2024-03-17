// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /user/apikey */
export async function getApikey(options?: { [key: string]: any }) {
  return request<API.BaseResponseApiKeyVO>('/user/apikey', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/apikey/change */
export async function changeApikey(options?: { [key: string]: any }) {
  return request<API.BaseResponseApiKeyVO>('/user/apikey/change', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/current */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseSafetyUserVO>('/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/delete */
export async function userDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userDeleteParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/user/delete', {
    method: 'POST',
    params: {
      ...params,
      deleteRequest: undefined,
      ...params['deleteRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/login */
export async function userLogin(body: API.UserLoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseSafetyUserVO>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseInteger>('/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/register */
export async function userRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/search */
export async function userSearch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userSearchParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListSafetyUserVO>('/user/search', {
    method: 'GET',
    params: {
      ...params,
      userSearchRequest: undefined,
      ...params['userSearchRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/update */
export async function userUpdate(body: API.UserUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseInteger>('/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
