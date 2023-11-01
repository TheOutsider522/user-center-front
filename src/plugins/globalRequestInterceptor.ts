/**
 * request 网络请求工具
 * api文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from "antd";
import { history } from '@@/core/history';
import {stringify} from "querystring";

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix: process.env.NODE_ENV === 'production' ? 'http://101.43.230.78:8080' : undefined
  // prefix: process.env.NODE_ENV = 'http://101.43.230.78:8080'
  // requestType: 'form',
});

/**
 * 所有请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`);
  return {
    // `http://101.43.230.78:8080${url}`
    url,
    options: {
      ...options,
      headers: {
      },
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {

  /**
   * 梳理:
   *  1.若请求成功(code=0), 则直接将data返回给前端
   *  2.若用户未登录(code=40100), 则重定向到登陆页面
   *  3.若出现其他错误, 则将后端返回结果中的描述(description)进行提示
   */
  const res = await response.clone().json();
  console.log("后端返回数据" + res);
  if(res.code === 0) {
    return res.data;
  }
  if(res.code === 40100) {
    message.error("请先登录");
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
  }else {
    message.error(res.description);
  }

  return res.data;
});

export default request;
