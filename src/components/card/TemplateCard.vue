<template>
<div class="card-layout">
  <div class="option-btn">
    <el-dropdown @command="handleCommand">
        <el-button class="button-options" split-button type="primary" >
          <img src="@/resources/svg/options.svg" alt="">
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(option, index) in options" :key="option.label" :command="index">
            {{option.label}}
          </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
  <div class="title">
    <slot name="title"></slot>
  </div>
  <div class="description">
    <slot name="description"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'TemplateCard',
  data () {
    return {
      options: [{
        label: 'Edit',
        action: () => {
          this.$router.push('/request/editor')
        },
      },
      {
        label: 'Deploy',
        action: () => {
         
        },
      },{
        label: 'Delete',
        action: () => {
         
        },
      }],
      
    }
  },
  methods: {
    handleCommand (index) {
      this.options[index].action()
    },
  },
}
</script>

<style lang="scss" scoped>
.button-options{
  background-color: transparent;
  border: none;
  &:focus, &:hover{
    outline: none;
    cursor: pointer;
  }
}
.el-dropdown-menu{
  padding: 5px 0;
  font-weight: bold;
  .el-dropdown-menu__item:not(.is-disabled):hover{
      color: #1a6cfb;
  }
  .el-dropdown-menu__item:last-of-type:hover{
    background-color: rgba(250, 115, 115, 0.205);
    color:rgb(194, 60, 60);
  }
}
.el-button--primary:focus, .el-button--primary:hover, .el-button--primary:active{
  background: none;
  color: inherit;
}
.card-layout{
  box-shadow: 1px 3px 11px 0px rgba(158, 158, 158, 0.445);
  margin: 30px;
  padding: 20px;
  min-width: 250px;
  background-color: #ecf5ff67;
   
  &.option-btn, .title , .description{
    flex: 1 400px;
    padding: 20px
  }
  .title{
  font-size: 20px;
  color: black;
  padding-top: 0px;
  }
  .description{
    color: rgb(102, 101, 101);
    line-height: 1.5em;
  }
  .option-btn{
    text-align: right;
    padding: 0px
  }
}

</style>