<template>
  <div id="label-content" :style="$store.state.collapsed ? 'padding: 0 10px;' : ''">
    <!-- 搜索框 -->
    <div class="label-search">
      <a-space direction="vertical">
        <a-input-search v-model="searchContentTemp" :placeholder="$t('common.searchLabel')" style="min-width: 100px; width: 100%" @search="onLabelSearch" />
      </a-space>
      <a-popover :title="$t('common.labelAdd')" trigger="click" placement="bottomRight">
        <div slot="content" style="width: 26vw; min-width: 320px">
          <label-create @hideLabelVisibleFn="hideLabelVisibleFn" @refresh="refresh" />
        </div>
        <a-button class="add-item" type="primary" style="height: 30px" v-text="$t('common.add')" @click="labelAddCheck" v-if="$store.state.isManage"></a-button>
      </a-popover>
    </div>
    <a-empty v-if="data.length === 0" />
    <div>
      <div class="tag">
        <a-badge class="info-box" :style="$store.state.collapsed ? 'width:100%;' : 'width:20%;border-right: 20px solid #f0f2f5;'" v-for="item of data" :key="item.id">
          <a-icon slot="count" type="close-circle" style="color: red; cursor: pointer" @click="labelDelete(item.id)" v-if="$store.state.isManage" />
          <div>
            <a-avatar class="avatar" :size="60" :src="item.logo" @click="routerLabelToArticle(item.id)" />
          </div>
          <div class="title" @click="routerLabelToArticle(item.id)">{{ item.labelName }}</div>
          <div class="meta-article">{{ item.articleUseCount + ' ' + $t('common.article') }}</div>
          <a-popover :title="$t('common.labelEdit')" trigger="click" placement="bottom">
            <div slot="content" style="width: 26vw; min-width: 320px">
              <label-create @hideLabelVisibleFn="hideLabelVisibleFn" :label-logo-init="item.logo" :label-id="item.id" :label-name="item.labelName" @refresh="refresh" />
            </div>
            <a-button class="edit" type="primary" style="height: 30px" v-text="$t('common.edit')" @click="labelUpdateCheck(item.id)" v-if="$store.state.isManage"></a-button>
          </a-popover>
        </a-badge>
      </div>
    </div>
  </div>
</template>

<script>
import LabelCreate from './LabelCreate';
import { useLogin } from '@/components/login';

import labelService from '@/service/labelService';

export default {
  name: 'LabelContent',

  components: { LabelCreate },

  props: {
    data: { type: Array, default: () => [] },
    searchContent: { type: String, default: '' },
  },

  data() {
    return {
      searchContentTemp: this.searchContent,
      labelAddVisible: false,
      labelEditVisible: {},
    };
  },

  methods: {
    // 搜索
    onLabelSearch(value) {
      this.$emit('refresh', value);
    },

    // 新增标签验证
    labelAddCheck() {
      if (this.isLoginFn()) {
        this.labelAddVisible = true;
      }
    },

    // 更新标签验证
    labelUpdateCheck(labelId) {
      if (this.isLoginFn()) {
        this.labelEditVisible[labelId] = true;
      }
    },

    // 关闭气泡框
    hideLabelVisibleFn(labelId) {
      this.labelAddVisible = false;
      this.$set(this.labelEditVisible, labelId, false);
    },

    // 删除标签
    labelDelete(labelId) {
      if (this.isLoginFn()) {
        this.$confirm({
          centered: true,
          title: this.$t('common.deleteLabelTitle'),
          content: this.$t('common.deletePrompt'),
          onOk: () => {
            labelService
              .labelDelete(labelId)
              .then(res => {
                this.refresh();
              })
              .catch(err => {
                this.$message.error(err.desc);
              });
          },
        });
      }
    },

    refresh() {
      this.$emit('refresh');
    },

    isLoginFn() {
      if (this.$store.state.isLogin) {
        return true;
      } else {
        useLogin();
      }
    },

    // 路由到标签文章页面
    routerLabelToArticle(labelId) {
      const routeData = this.$router.resolve('/label/' + labelId);
      window.open(routeData.href, '_blank');
    },

    updateLabelEditVisible() {
      const labelEditVisibleNew = {};
      this.data.forEach(value => {
        labelEditVisibleNew[value.id] = false;
      });

      this.labelEditVisible = labelEditVisibleNew;
    },
  },

  mounted() {
    this.updateLabelEditVisible();
  },

  watch: {
    // data值改变时触发
    data: {
      handler(newVal, oldVal) {
        this.updateLabelEditVisible();
      },
    },
    // searchContent值改变时触发
    searchContent: {
      handler(newVal, oldVal) {
        this.searchContentTemp = newVal;
      },
    },
  },
};
</script>

<style lang="less" scoped>
#label-content .label-search {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
}

#label-content .tag {
  display: flex;
  flex-wrap: wrap;
}

#label-content .info-box {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: #fff;
  border-bottom: 20px solid #f0f2f5;

  .title,
  .avatar {
    cursor: pointer;
    border-radius: 0;
  }

  .title {
    padding-top: 5px;
    font-size: 20px;
    line-height: 40px;
    color: #333;
  }

  .edit {
    margin-top: 5px;
  }

  .meta-article {
    font-size: 16px;
    color: #909090;
  }
}
</style>
