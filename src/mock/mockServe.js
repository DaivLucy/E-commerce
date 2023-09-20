import Mock from 'mockjs'

// 引入模拟数据
import banner from './banner.json'
import floors from './floors.json'

// 第一个参数：模拟地址      第二：数据
Mock.mock('/mock/banner',{code: 200 , data: banner})
Mock.mock('/mock/floors',{code: 200 , data: floors})