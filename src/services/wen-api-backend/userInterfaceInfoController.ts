// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /userInterface/add */
export async function addUserInterface(
  body: API.UserInterfaceAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/userInterface/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /userInterface/delete */
export async function deleteUserInterface(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/userInterface/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /userInterface/get */
export async function searchUserInterfaceById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchUserInterfaceByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserInterfaceInfo>('/userInterface/get', {
    method: 'GET',
    params: {
      ...params,
      idRequest: undefined,
      ...params['idRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /userInterface/list */
export async function listUserInterfaceByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserInterfaceByPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceInfo>('/userInterface/list', {
    method: 'GET',
    params: {
      ...params,
      pageRequest: undefined,
      ...params['pageRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /userInterface/search */
export async function searchUserInterface(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchUserInterfaceParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserInterfaceInfo>('/userInterface/search', {
    method: 'GET',
    params: {
      ...params,
      userInterfaceSearchRequest: undefined,
      ...params['userInterfaceSearchRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /userInterface/update */
export async function updateUserInterface(
  body: API.UserInterfaceUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/userInterface/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
