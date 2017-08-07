<!--
    单条评论组件
-->
<template>
  <p>
      <span class="head_img"><img :src="dis.ico" alt=""></span> {{dis.text}}
  </p>
</template>

<script>
export default {
  name: 'discuss',
  props: ['dis']
}
</script>

