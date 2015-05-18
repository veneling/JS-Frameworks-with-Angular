var comment = (function () {

    function Comment(username, date, content) {
        this.username = username;
        this.date = date;
        this.content = content;
    }
    return Comment;

}());