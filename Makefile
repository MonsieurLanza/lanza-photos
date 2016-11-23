build : base.css js-client
	mv tmp/*.css client/public/css/

%.css : tmp/%.scss
	sassc $^ tmp/$@

bootstrap: jquery tether node_modules/bootstrap/dist/css/bootstrap.min.css node_modules/bootstrap/dist/js/bootstrap.min.js
	cp node_modules/bootstrap/dist/css/bootstrap.min.css client/public/css/
	cp node_modules/bootstrap/dist/js/bootstrap.min.js client/public/js/

fleximages: tmp/vendor/fleximages/flex-images.min.js
	cp tmp/vendor/fleximages/flex-images.min.js client/public/js/

jquery: node_modules/jquery/dist/jquery.min.js
	cp node_modules/jquery/dist/jquery.min.js client/public/js/

js-client: bootstrap fleximages jquery lightbox socket.io tus vue

lightbox: tmp/vendor/lightbox/lightbox.js tmp/vendor/lightbox/img/*
	cp tmp/vendor/lightbox/lightbox.js client/public/js/
	cp -R tmp/vendor/lightbox/img client/public/img

socket.io : node_modules/socket.io/node_modules/socket.io-client/socket.io.min.js
	cp node_modules/socket.io/node_modules/socket.io-client/socket.io.min.js client/public/js/

tether: node_modules/tether/dist/js/tether.min.js
	cp node_modules/tether/dist/js/tether.min.js client/public/js/

tus: node_modules/tus-js-client/dist/tus.min.js
	cp node_modules/tus-js-client/dist/tus.min.js client/public/js/

vue: node_modules/vue/dist/vue.min.js
	cp node_modules/vue/dist/vue.min.js client/public/js/
