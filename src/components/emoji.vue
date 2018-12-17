<template>
  <div class="emoji">
    <ul class="emoji-controller">
      <li
        v-for="(pannel,index) in pannels"
        @click="changeActive(index)"
        :class="{'active': index === activeIndex}">{{ pannel }}</li>
    </ul>
    <ul class="emoji-container">
      <li
        v-for="(emojiGroup, index) in emojis"
        style="padding: 0"
        :key="index"
        v-if="index === activeIndex">
        <a href="javascript:;"
          v-for="(emoji, index) in emojiGroup"
          :key="index" @click="selectItem(emoji)">
           <span
              class="emoji-item"
              :title="emoji"
              :class="'sprite-' + getPureName(emoji)"></span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import data from '../data/emoji-data.js'

export default {
  name: 'emoji',
  data () {
    return {
      emojiData: data,
      pannels: ['表情', '自然', '物品', '地点', '符号'],
      activeIndex: 0
    }
  },
  methods: {
    changeActive (index) {
      this.activeIndex = index
    },
    getPureName (name) {
      return name.replace(/:/g, '')
    },
    selectItem (emoji) {
      this.$emit('select', emoji)
    }
  },
  computed: {
    emojis () {
      return this.pannels.map(item => {
        return Object.keys(this.emojiData[item])
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/scss/emoji-sprite.scss';

.emoji {
  width: 19rem;
  height: 9.3rem;
  bottom: 1.5rem;
  background: #fff;
  z-index: 10;
  padding: 0.5rem;
  margin-right: 0.5rem;
  .emoji-controller {
    height: 1.8rem;
    overflow: hidden;
    margin-bottom: 0;
    li {
      float: left;
      width: 3.8rem;
      font-size: 0.6rem;
      line-height: 1.8rem;
      cursor: pointer;
      text-align: center;
      position: relative;
      &.active::after{
        content: '';
        width: 100%;
        height: 1px;
        background: #0689dd;
        left: 0;
        bottom: 0.2rem;
        position: absolute;
      }
    }
  }
  .emoji-container {
    height: 7rem;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    li {
      font-size: 0;
      padding: 0.25rem;
      a {
        float: left;
        overflow: hidden;
        height: 1.75rem;
        transition: all ease-out .2s;
        border-radius: 0.2rem;
        &:hover {
          background-color: #d8d8d8;
          border-color: #d8d8d8;
        }
        span {
          width: 1.25rem;
          height: 1.25rem;
          display: inline-block;
          border: 1px solid transparent;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
