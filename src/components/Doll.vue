<!--
    单个娃娃组件
-->
<template>
  <div class="doll_img"> 
    <i class="doll_img_face" :class="{'doll_img_face1': face == 1, 'doll_img_face2': face == 2,'doll_img_face3': face == 3, 'doll_img_faces': face == 0}"></i>
    <div class="doll_img_goods">
      <img :src="doll.imgurl" v-if=" doll.showtype == 'thing' " alt="">
    </div>
    <div class="doll_img_name" :class="{'doll_img_name_ticket': doll.showtype == 'virtual', 'doll_img_name_gift': doll.showtype == 'giftpack', 'doll_img_name_goods': doll.showtype == 'thing'}">
      <div class="doll_img_txt">{{ doll.showtype == 'thing' ? doll.name : ''}}</div>
    </div>
    <i class="doll_body"></i> </div>
</template>

<script>
export default {
  name: 'doll',
  props:['doll','face']
}
</script>

