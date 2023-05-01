<template>
    <div class="parent">
        <router-link to="/home">home</router-link>
        <router-link to="/about">about</router-link>
        <router-view></router-view>
    </div>
</template>
<script>

export default {

}
</script>

<style lang="less">
.parent{
    color: red;
    display: flex;
}
</style>