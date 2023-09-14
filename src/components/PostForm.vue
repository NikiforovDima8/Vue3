<template>
    <form @submit.prevent>
        <h1>Создание поста</h1>
        <my-input 
        v-model="post.title" 
        type="text" 
        placeholder="Название" />
        <my-input 
        v-model="post.body" 
        type="text" 
        placeholder="Описание" />
        <my-btn
            @click="createPost"
            style="align-self: flex-end; margin-top: 15px"
        >
            Создать
        </my-btn>
    </form>
</template>

<script>
import MyBtn from '@/components/UI/MyBtn';
export default {
    components: {
        MyBtn,
    },
    data() {
        return {
            post: {
                title: '',
                body: '',
            },
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: '',
            };
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>
