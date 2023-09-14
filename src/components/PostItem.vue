<template>
    <div class="post">
        <div>
            <div>{{ post.id }}</div>
            <div><strong>Название:</strong> {{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
        <div class="post_btns">
            <my-btn
            @click="$emit('remove', post)">
       Удалить </my-btn>
        </div>
    </div>
</template>

<script>
import MyBtn from '@/components/UI/MyBtn';
export default {
    components: {
        MyBtn,
    },
    props: {
        post: {
            type: Object,
            requried: true,
        },
    },
};
</script>

<style scoped>
.post {
    margin-top: 15px;
    padding: 25px;
    border: 2px solid teal;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
