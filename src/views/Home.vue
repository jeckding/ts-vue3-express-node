<template>
  <div class="home">
    <ul>
      <li>
        <a href="#" @click="isCompositionHome = true">tab1</a>
      </li>
      <li>
        <a href="#" @click="isCompositionHome = false">tab2</a>
      </li>
	  <li>
	    <a href="/about"  > to about page</a>
	  </li>
    </ul>
    <HelloWorldComp v-if="isCompositionHome" msg="tab1" />
    <HelloWorldOpt v-else msg="tab2" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue"
// @ is an alias to /src
import HelloWorldComp from "@/components/HelloWorld.composition.vue"
import HelloWorldOpt from "@/components/HelloWorld.options.vue"

export default defineComponent({
  components: {
    HelloWorldComp,
    HelloWorldOpt
  },
  setup() {
    const state = reactive({
      isCompositionHome: true
    })
	
    return { ...toRefs(state) }
  }
})
</script>
<style lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
