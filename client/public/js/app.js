var Vue = require('vue');

var photoList = Vue.component('photolist', {
    template: '<h1>{{ year }}<h1><ul class="photolist"><photo v-for="photo in photos" v-bind="photo"></ul',
    data: {
        photos:[]
    }
});

var photo = Vue.component('photo', {
    props: ['photo'],
    template: '<li class="photo"><a v-bind:href="src" v-bind:data-big="src"><img v-bind:data-src="thumbsrc" v-bind:alt="title"></a></li>'
});

new Vue({
    el: '#photo-view',
    components: {
        photoList,
        photo
    }
});


var xhr = new XMLHttpRequest();
xhr.setRequestHeader('Accept', 'application/json');
