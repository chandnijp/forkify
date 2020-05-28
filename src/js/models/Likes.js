export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, image) {
        const like = { id, title, author, image };
        this.likes.push(like);

        // Persist the data in localStorage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist the data in localStorage
        this.persistData();
    }

    isLiked(id) {
        const findId = this.likes.findIndex(el => el.id === id) !== -1;
        return findId;
        // if we cant find an item with the id thats passed in, it will be -1 therefore false therefore not liked
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        // set item in localStorage, key and value have to be strings, so convert this.likes array into a string
        localStorage.setItem('likes', JSON.stringify(this.likes)) 
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes')); //convert back to structure it was in before (not a string)
        
        // Restoring likes from the localStorage
        if (storage) this.likes = storage;
    }
}