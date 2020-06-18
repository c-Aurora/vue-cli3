//对axios封装

import axios from 'axios'
import CONTACT_API from './contactApi'
import {Toast} from 'vant'

// CONTACT_API 循环遍历输出不同的请求方法
let instance = axios.create({  //创建实例
    baseURL: 'http://localhost:9000/api',
    timeout: 1000
})
//创建对象
const Http = {};//包裹请求方法的容器
//一、请求格式/参数的统一
for(let key in CONTACT_API){
    let api = CONTACT_API[key];//url method
     
    //async 作用：避免进入回调地狱
        //params:请求参数get:url、put,post,patch(data)、delete:url
        //isFormData=false 标识是否是form-data请求
        //config={} 配置参数
    Http[key] = async function( params,isFormData=false,config={} ){  
        
        let newParams = {};

        //content-type 是否是form-data判断
        if(params && isFormData){  //如果是form-data
            newParams = new FormData();
            for(let i in params){
                newParams.append(i,params[i]);
            }
        }else{
            newParams = params;
        }

        //不同请求的判断
        let response = {}; //请求返回值
        if( api.method === 'put' || api.method === 'post' || api.method === 'patch'){
            try {
                response = await instance[api.method](api.url,newParams,config)
            } catch (error) {
                response = error;
            }
        }else if( api.method === 'delete' || api.method === 'get' ){
            
            try {
                config.params = newParams;
                response = await instance[api.method](api.url,config)
            } catch (error) {
                response = error;
            }
        }
        return response; //返回响应值
    }
}

//二、请求拦截器的添加
    //请求拦截器
instance.interceptors.request.use(config => {
    // 发起请求前做些什么
    Toast.loading({
        mask:false,
        duration:0,//一直存在
        forbidClick:true,//禁止点击
        message:'加载中...'
    })
    return config;
},() => {
    // 请求错误
    Toast.clear();//清掉toast
    Toast('请求错误，请稍后重试')
});
    //响应拦截器
instance.interceptors.response.use(res => {
    // 请求成功
    Toast.clear();
    return res.data;
},() => {
    // 响应失败
    Toast.clear();
    Toast('请求错误，请稍后重试')
});

//三、http导出去
export default Http

//调用先设置main.js

             
        

