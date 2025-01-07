const { createApp } = Vue

const app = createApp({
    data() {
        return {
            title: '书签管理系统',
            searchQuery: '',
            showAddForm: false,
            newBookmark: {
                title: '',
                url: '',
                description: '',
                category: ''
            },
            bookmarks: []
        }
    },
    computed: {
        filteredBookmarks() {
            const query = this.searchQuery.toLowerCase()
            return this.bookmarks.filter(bookmark => 
                bookmark.title.toLowerCase().includes(query) ||
                bookmark.url.toLowerCase().includes(query) ||
                bookmark.description.toLowerCase().includes(query) ||
                bookmark.category.toLowerCase().includes(query)
            )
        }
    },
    methods: {
        // 添加新书签
        addBookmark() {
            const bookmark = {
                id: Date.now(),
                title: this.newBookmark.title,
                url: this.newBookmark.url,
                description: this.newBookmark.description,
                category: this.newBookmark.category,
                createdAt: new Date().toISOString()
            }
            
            this.bookmarks.push(bookmark)
            this.saveBookmarks()
            this.resetForm()
            this.showAddForm = false
        },

        // 编辑书签
        editBookmark(bookmark) {
            this.newBookmark = { ...bookmark }
            this.showAddForm = true
        },

        // 删除书签
        deleteBookmark(id) {
            if (confirm('确定要删除这个书签吗？')) {
                this.bookmarks = this.bookmarks.filter(b => b.id !== id)
                this.saveBookmarks()
            }
        },

        // 重置表单
        resetForm() {
            this.newBookmark = {
                title: '',
                url: '',
                description: '',
                category: ''
            }
        },

        // 保存到本地存储
        saveBookmarks() {
            localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks))
        },

        // 从本地存储加载
        loadBookmarks() {
            const saved = localStorage.getItem('bookmarks')
            if (saved) {
                this.bookmarks = JSON.parse(saved)
            }
        }
    },
    mounted() {
        // 页面加载时从本地存储加载书签
        this.loadBookmarks()
    }
})

app.mount('#app') 