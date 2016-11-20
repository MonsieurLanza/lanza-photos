build : base.css js-client
	mv tmp/*.css client/public/css/

%.css : tmp/%.scss
	sassc $^ tmp/$@

js-client: tus fleximages lightbox

tus:
	cp node_modules/tus-js-client/dist/tus.min.js client/public/js/

fleximages: tmp/vendor/fleximages/flex-images.min.js
	cp tmp/vendor/fleximages/flex-images.min.js client/public/js/

lightbox: tmp/vendor/lightbox/lightbox.js tmp/vendor/lightbox/img/*
	cp tmp/vendor/lightbox/lightbox.js client/public/js/
	cp -R tmp/vendor/lightbox/img client/public/img
