<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="LeaveDone" @mouseenter="EnterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="SanjiShow">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="RouterHopping">
              <div
                class="item"
                v-for="(c1, index) in gettypenavValue"
                :key="c1.categoryId"
                :class="{ level: index === ChangeBackIndex }"
              >
                <h3 @mouseenter="ChangeBackcolor(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-categoryId1="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: index === ChangeBackIndex ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-categoryId2="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-categoryId3="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引用节流lodash
import { throttle } from "lodash";

export default {
  name: "Typenav",
  data() {
    return {
      ChangeBackIndex: -1,
      // 判断三级联动是否显示
      show: true,
    };
  },
  // 挂载完成时获取数据 移到app
  mounted() {
    // 判断是否显示三级联动
    if (this.$route.path != "/Home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 使用这个属性会立即调用  ,  state等于仓库
      gettypenavValue: (state) => state.home.gettypenavValue,
    }),
  },
  methods: {
    // 进行节流
    // 改变一级背景颜色
    ChangeBackcolor: throttle(function (index) {
      this.ChangeBackIndex = index;
    }, 50),

    // 进行路由跳转
    RouterHopping(event) {
      const { categoryname, categoryid1, categoryid2, categoryid3 } =
        event.target.dataset;
      if (categoryname) {
        let categoryName = categoryname
        let locahl = { name: "Search" };
        let query = { categoryName };
        if (categoryid1) {
          query.category1Id = categoryid1;
        } else if (categoryid2) {
          query.category2Id = categoryid2;
        } else {
          query.category3Id = categoryid3;
        }
        if (this.$route.params) {
          locahl.params = this.$route.params;
          locahl.query = query;
          this.$router.push(locahl);
        }
      }
    },

    // 移入显示三级联动
    EnterShow() {
      if (this.$route.path != "/Home") {
        this.show = true;
      }
    },

    // 判断多级菜单是否隐藏
    // 移出隐藏三级联动
    LeaveDone() {
      this.ChangeBackIndex = -1;

      if (this.$route.path != "/Home") {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
// 一级背景颜色改变
.level {
  background-color: rgb(86, 175, 175);
}

// 添加显示动画
.SanjiShow-enter,
.SanjiShow-leave-to {
  opacity: 0;
}
.SanjiShow-enter-to,
.SanjiShow-leave {
  opacity: 1;
}
.SanjiShow-enter-active,
.SanjiShow-leave-active {
  transition: all 0.3s linear;
}

.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
  }
}
</style>