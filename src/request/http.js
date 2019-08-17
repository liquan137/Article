// Javascript code
/**
 * author：小小游 - allen
 * date：2019.07.30
 * lastUpdateDate：2019.08.13
 * description: http.js作用是axios封装 --- 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import store from '../store/index';
import { Toast } from 'vant';

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    Toast ({
        message: msg,
        duration: 1000,
        forbidClick: true
    });
};

/**
 * 跳转登录页
 * 携带当前页面路由，在登录页面完成以前登录后返回当前页面
 */
const toLogin = () => {
    router.replace ({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = ( status, other ) => {
    // 状态码判断
    switch ( status ) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin ();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            tip ( '登录过期，请重新登录' );
            window.localStorage.removeItem ( 'token' );
            store.commit ( 'loginSuccess', null );
            setTimeout ( () => {
                toLogin ();
            }, 1000 );
            break;
        // 404请求不存在
        case 404:
            tip ( '请求的资源不存在' );
            break;
        default:
            console.log ( other );
    }
};

// 创建axios实例
let instance = axios.create ({
    // 允许携带cookie
    withCredentials: true
    // 过期时间
    // timeout: 45 * 1000
});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use (
    config => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作
        /** const token = store.state.token;
        token && ( config.headers.Authorization = token );
        return config; */
        config.headers['Token'] = getQueryString ( 'token' );
        return config;
    },
    error => Promise.error ( error ) );

// 响应拦截器
instance.interceptors.response.use (
    // 请求成功
    res => ( ( res.status >= 200 && res.status < 300 ) || res.status == 304 ) ? Promise.resolve ( res ) : Promise.reject ( res ),
    // 请求失败
    error => {
        const { response } = error;
        if ( response ) {
            // 请求已发出，但是不在2xx的范围
            errorHandle ( response.status, response.data.message );
            return Promise.reject ( response );
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if ( !window.navigator.onLine ) {
                store.commit ( 'changeNetwork', false );
            } else {
                return Promise.reject ( error );
            }
        }
    });

// 获取查询字符串
function getQueryString ( name ) {
    const parameter = window.location.hash.split ( '?' );
    if ( parameter.length === 2 ) {
        let reg = new RegExp ( '(^|&)' + name + '=([^&]*)(&|$)', 'i' );
        let r = ( '?' + parameter[1] ).substr( 1 ).match ( reg );
        if ( r != null ) return unescape ( r[2] );
        return null;
    } else {
        return null;
    }
}

export default instance;
