// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /interface/add */
export async function addInterface(
  body: API.InterfaceAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/interface/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

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
