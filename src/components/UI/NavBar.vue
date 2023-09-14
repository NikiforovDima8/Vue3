<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue3</div>
        <div class="navbar__btns">
            <my-btn @click="$router.push('/users')">Пользователи</my-btn>
            <my-btn @click="$router.push('/about')" style="margin-left: 20px">О сайте</my-btn>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: rgb(180, 177, 177);
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.navbar__btns {
    margin-left: auto;
}
</style>
