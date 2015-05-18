function Video(title, picture, length, category, date, haveSubtitles) {
    this.title = title;
    this.picture = picture;
    this.length = length;
    this.category = category;
    this.date = date.toJSON();
    this.haveSubtitles = (haveSubtitles == '1');
    this.subscribers = 0;
    this.comments = [];
}