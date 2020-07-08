import axios from "axios";

/****** 创建axios实例 ******/

const $http = axios.create({
    baseURL:'https://api.mtnhao.com/',  // api的base_url
    // baseURL:'https://autumnfish.cn/',  // api的base_url
    timeout: 5000  // 请求超时时间
});


export default $http;