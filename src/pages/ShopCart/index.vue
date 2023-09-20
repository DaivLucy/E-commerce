<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="carinfo in cartInfoList" :key="carinfo.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="carinfo.isChecked === 1"
              @change="changeShoppCheck(carinfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="carinfo.imgUrl" />
            <div class="item-msg">{{ carinfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ carinfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="Handler('min', carinfo, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="carinfo.skuNum"
              minnum="1"
              class="itxt"
              @change="Handler('change', carinfo, $event.target.value)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="Handler('add', carinfo, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ carinfo.skuPrice * carinfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="DeleteCart(carinfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="AllChecked" @click="ChangeAllChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="DeleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ AllShoppPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/Trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 引用节流lodash
import { throttle } from "lodash";

export default {
  name: "ShopCart",
  mounted() {
    this.getShoppCartList();
  },
  computed: {
    ...mapGetters(["getShoppListData"]),

    cartInfoList() {
      return this.getShoppListData.cartInfoList || [];
    },

    // 计算所有商品总价
    AllShoppPrice() {
      let AllPrive = 0;
      this.cartInfoList.forEach((item) => {
        AllPrive += item.skuPrice * item.skuNum;
      });
      return AllPrive;
    },

    // 计算全部勾选框
    AllChecked() {
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
  },
  methods: {
    // 购物车页面数据获取
    getShoppCartList() {
      this.$store.dispatch("getshoppcartlist");
    },

    // 购物车勾选框
    async changeShoppCheck(carinfo, event) {
      let skuID = carinfo.skuId;
      let isChecked = event.target.checked ? 1 : 0;

      try {
        await this.$store.dispatch("getshoppcheckcart", { skuID, isChecked });

        this.getShoppCartList();
      } catch (error) {}
    },

    // 按钮修改数量
    Handler: throttle(async function (name, carinfo, skuNum) {
      // 判断谁点的
      switch (name) {
        case "add":
          skuNum = 1;
          break;
        case "min":
          skuNum = carinfo.skuNum - 1 < 1 ? 0 : -1;
          break;
        case "change":
          if (isNaN(skuNum * 1) || skuNum < 1) {
            skuNum = 0;
          } else {
            skuNum = parseInt(skuNum) - carinfo.skuNum;
          }
          break;
      }

      try {
        await this.$store.dispatch("sendshoppingCart", {
          skuId: carinfo.skuId,
          skuNum,
        });

        this.getShoppCartList();
      } catch (error) {}
    }, 2000),

    // 删除购物车数据操作
    async DeleteCart(skuId) {
      try {
        await this.$store.dispatch("deletecartdata", skuId);

        this.getShoppCartList();
      } catch (error) {}
    },

    // 删除选中的商品
    DeleteChecked() {
      this.cartInfoList.forEach(async (item) => {
        if (item.isChecked === 1) {
          try {
            await this.$store.dispatch("deletecartdata", item.skuId);

            this.getShoppCartList();
          } catch (error) {}
        }
      });
    },

    // 修改全选按钮
    async ChangeAllChecked(event){
      let isChe = event.target.checked ? '1' : '0'

      try {
        await this.$store.dispatch('changeallchecked',isChe)

        this.getShoppCartList()
      } catch (error) {
        
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>