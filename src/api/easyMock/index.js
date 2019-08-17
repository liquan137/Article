// Javascript code
/**
 * author：小小游 - allen
 * date：2019.07.30
 * lastUpdateDate：2019.07.30
 * description: userList模块接口列表
 */
// 导入接口域名列表
import base from '../base';

// 导入http中创建的axios实例
import axios from '@/request/http';

// 根据需求是否导入qs模块，这里没有要把一个对象转成查询拼接字符串，所以暂时用不上注释
// import qs from 'qs';

const userList = {
    // easyMock用户列表
    getList () {
        return axios.get ( `${base["vuex-test-pro"]}/list` );
    }
};

export default userList;
