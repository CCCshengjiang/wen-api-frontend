// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /interface/delete */
export async function deleteInterface(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/interface/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /interface/get */
export async function searchInterfaceById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchInterfaceByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInterfaceInfo>('/interface/get', {
    method: 'GET',
    params: {
      ...params,
      idRequest: undefined,
      ...params['idRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interface/invoke */
export async function invokeInterface(
  body: API.InterfaceInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/interface/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /interface/list */
export async function listInterfaceByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceByPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfo>('/interface/list', {
    method: 'GET',
    params: {
      ...params,
      pageRequest: undefined,
      ...params['pageRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interface/offline */
export async function offlineInterface(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/interface/offline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interface/online */
export async function onlineInterface(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/interface/online', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /interface/search */
export async function searchInterface(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchInterfaceParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListInterfaceInfo>('/interface/search', {
    method: 'GET',
    params: {
      ...params,
      interfaceSearchRequest: undefined,
      ...params['interfaceSearchRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interface/update */
export async function updateInterface(
  body: API.InterfaceUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/interface/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
