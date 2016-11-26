build : base.css js-client
	mv src/*.css client/public/css/

%.css : src/%.scss
	sassc $^ src/$@

bootstrap: node_modules/bootstrap/dist/css/bootstrap.min.css node_modules/bootstrap/dist/js/bootstrap.min.js
	cp node_modules/bootstrap/dist/css/bootstrap.min.css client/public/css/
	cp node_modules/bootstrap/dist/js/bootstrap.min.js client/public/js/

fleximages: src/vendor/fleximages/flex-images.min.js
	cp src/vendor/fleximages/flex-images.min.js client/public/js/

# jquery: node_modules/jquery/dist/jquery.min.js
# 	cp node_modules/jquery/dist/jquery.min.js client/public/js/

js-client: bootstrap fleximages lightbox socket.io tus vue

lightbox: src/vendor/lightbox/lightbox.js src/vendor/lightbox/img/*
	cp src/vendor/lightbox/lightbox.js client/public/js/
	cp -R src/vendor/lightbox/img client/public/img

socket.io : node_modules/socket.io/node_modules/socket.io-client/socket.io.min.js
	cp node_modules/socket.io/node_modules/socket.io-client/socket.io.min.js client/public/js/

tether: node_modules/tether/dist/js/tether.min.js
	cp node_modules/tether/dist/js/tether.min.js client/public/js/

tus: node_modules/tus-js-client/dist/tus.min.js
	cp node_modules/tus-js-client/dist/tus.min.js client/public/js/

vue: node_modules/vue/dist/vue.js
	cp node_modules/vue/dist/vue.js client/public/js/
