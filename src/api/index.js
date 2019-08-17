// Javascript code
/**
 * author：小小游 - allen
 * date：2019.07.30
 * lastUpdateDate：2019.08.15
 * description: api接口的统一出口
 */
// 文章模块接口
import userList from '@/api/easyMock';
// 其他模块的接口……

// banner多图上传测试接口
import multiplexUpload from '@/api/banner';

// 引入发布新文章的测试接口
import publishGoodThing from '@/api/publish';

// 导出接口
export default {
    userList,
    multiplexUpload,
    publishGoodThing
    // ……
};
