<template>
  <div>
      <div class="fl">
            <div class="prize_img"><img :src="record.pro_info.imgurl" alt=""></div>
            <strong>{{record.pro_info.name}}</strong>
            <p class="time">{{ record.ts }}</p>
        </div>
        <div class="fr"> <span class="status" :class="{ 'fc_green': record.state == 2 }"></span>
            <span class="status fc_green" v-if="record.state == 2">奖品已发放</span>
            <span class="status" v-else-if="record.state == 1">待填写</span>
            <span class="status" v-else-if="record.state == 3">待发放</span>
            <span class="status" v-else>未中奖</span>
            <div class="status"><span class="use_up">消耗{{ record.consume }}金豆</span>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'record',
  props: ['record']
}
</script>

