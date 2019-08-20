// Javascript code
/**
 * author：小小游 - allen
 * date：2019.08.12
 * lastUpdateDate：2019.08.13
 * description: banner模块接口列表
 */
// 导入接口域名列表
import base from '../base';

// 导入http中创建的axios实例
import axios from '@/request/http';

// 根据需求是否导入qs模块，这里没有要把一个对象转成查询拼接字符串，所以暂时用不上注释
// import qs from 'qs';

const videoUpload = {
    // 多图上传
    getVideoUploader ( fd, params ) {
        // ?XDEBUG_SESSION_START=13588
        return axios.post ( `${base["banner_test"]}/video`, fd, params );
    }
};

export default videoUpload;
