<template>
    <div >
        <h1>Страница с постами</h1>
        <my-input v-model="searchQuery" placeholder="Поиск..."> </my-input>
        <div class="add__btns">
            <my-btn @click="showDialog"> Создать пользователя </my-btn>
            <my-select v-model="selectedSort" :options="sortOptions">
            </my-select>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list
            :posts="sortedAddSearchedPost"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка....</div>
        <div ref="observer" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div 
            v-for="pageNumber in totalPage" 
            :key="pageNumber" 
            class="page"
            :class="{
                'current-page':page===pageNumber
            }"
            @click="changePage (pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div> -->
    </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import axios from 'axios';
// import MyDialog from '@/components/UI/MyDialog'

export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            modificatorValue: '',
            isPostsLoading: false,
            selectedSort: '',
            sortOptions: [
                { value: 'title', name: 'По Названию', id: 'Номер поста' },
                { value: 'body', name: 'По Cодержимому', id: 'Номер поста1' },
            ],
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPage: 0,
        };
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        //         changePage(pageNumber){
        // this.page=pageNumber
        //         },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;

                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        },
                    }
                );
                this.totalPage = Math.ceil(
                    response.headers['x-total-count'] / this.limit
                );
                this.posts = response.data;
                this.isPostsLoading = false;
            } catch (e) {
                alert('Ошибка');
            }
        },
        async loadMorePost() {
            try {
                this.page+=1;
              

                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        },
                    }
                );
                this.totalPage = Math.ceil(
                    response.headers['x-total-count'] / this.limit
                );
                this.posts = [...this.posts, ...response.data];
                this.isPostsLoading = false;
            } catch (e) {
                alert('Ошибка');
            }
        },
    },
    mounted() {
        this.fetchPosts();
        this.$refs.observer;
        const options = {
            rootMargin: '0px',
            threshold: 1.0,
        };
        const callback = (entries) => {
            if (entries[0].isIntersecting&& this.page<this.totalPage) {
                this.loadMorePost();
            }
        }
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
        },
    computed: {
        sortedPost() {
            return [...this.posts].sort((post1, post2) =>
                post1[this.selectedSort]?.localeCompare(
                    post2[this.selectedSort]
                )
            );
        },
        sortedAddSearchedPost() {
            return this.sortedPost.filter((post) =>
                post.title
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
            );
        },
    },
    watch: {
        // page(){
        //     this.fetchPosts()
        // }
    },
};
</script>

<style>

.add__btns {
    margin: 15px 0px;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 25px;
}
.page {
    cursor: pointer;
    border: 1px solid black;
    padding: 10px;
}
.current-page {
    border: 2px solid teal;
}
</style>
