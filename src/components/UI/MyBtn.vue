<template>
    <button class="btn" >
<slot></slot>
    </button>
</template>

<script>
    export default {
        name:'my-btn'
    }
</script>

<style scoped>
.btn {
    padding: 10px;
    width: 300px;
    background: none;
    color: teal;
    border: 2px solid teal;
    cursor: pointer;
    font-weight: 600;
}
</style>