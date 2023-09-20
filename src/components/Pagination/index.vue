<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <button class="prev butto" :disabled="pageNo <= 1" @click="$emit('GetPagintion',pageNo - 1)">«上一页</button>
        <li :class="{active: pageNo == 1}" v-show="pageNo > 3" @click="$emit('GetPagintion',1)">
          <a >1</a>
        </li>
        <li class="dotted" v-show="pageNo > 4"><span>...</span></li>
        <li :class="{active: pageNo === page}" v-for="(page,index) in StartandEnd.End" :key="index" v-show="page >= StartandEnd.Start" @click="$emit('GetPagintion',page)">
          <a >{{ page }}</a>
        </li>
        <li class="dotted" v-show="pageNo < AllPages-3"><span>...</span></li>
        <li :class="{active: pageNo === AllPages}" @click="$emit('GetPagintion',AllPages)">
          <a  v-show="pageNo < AllPages-2">{{ AllPages }}</a>
        </li>
        <button class="prev butto" :disabled="pageNo >= AllPages" @click="$emit('GetPagintion',pageNo + 1)">下一页</button>
      </ul>
      <div class="AllPages"><span>共 {{ total }} 条&nbsp;</span></div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Pagination',
    props:['pageNo','pageSize','total','continues'],
    computed:{
      // 计算一共展示几页
      AllPages(){
        return Math.ceil(this.total / this.pageSize)
      },
      // 计算中间展示的起始页和结束页
      StartandEnd(){
        let {pageNo,pageSize,total,continues,AllPages} = this
        let Start = 0;
        let End = 0;

        Start = pageNo - parseInt(continues / 2)
        End = pageNo + parseInt(continues / 2)

        if(Start < 1){
          Start = 1
          End = continues
        }

        if(End > AllPages){
          End = AllPages
          Start = AllPages - continues + 1
        }

        return {Start,End}
      },
    },
};
</script>

<style scoped lang="less">
.page {
//   width: 733px;
  height: 66px;
  overflow: hidden;
  // float: right;
  display: flex;
  justify-content: center;

  .sui-pagination {
    margin: 18px 0;
    width: 100%;
    display: flex;
    justify-content: center;

    .AllPages{
        width: 70px;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    ul {
      margin-left: 0;
      margin-bottom: 0;
      vertical-align: middle;
    //   width: 490px;
      float: left;
      display: flex;
      justify-content: center;

      .butto{
        line-height: 18px;
        font-size: 15px;
        border: 0;
      }

      li {
        line-height: 18px;
        display: inline-block;

        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }

        &.active {
          a {
            background-color: #5aa9f8;
            // color: #e1251b;
            border-color: #fff;
            cursor: default;
          }
        }

        &.prev {
          a {
            background-color: #fafafa;
          }
        }

        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }

        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }

        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }

    div {
      color: #333;
      font-size: 14px;
      float: right;
      width: 241px;
    }
  }
}
</style>