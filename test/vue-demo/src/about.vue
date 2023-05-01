<template>
    <div>aboute
        <child></child>
    </div>
</template>
<script>
import Child from './about-child.vue'
export default{
    name:'about',
    components:{
        Child:Child
    }
 
 } 
</script>
