// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /userInterface/invoke/top */
export async function invokeInterfaceTop(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceTopVO>('/userInterface/invoke/top', {
    method: 'POST',
    ...(options || {}),
  });
}
