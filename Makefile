build : base.css js-client
	mv tmp/*.css client/public/css/

%.css : tmp/%.scss
	sassc $^ tmp/$@

js-client: tus fleximages

tus:
	cp node_modules/tus-js-client/dist/tus.min.js client/public/js/

fleximages: tmp/vendor/fleximages/flex-images.min.js
	cp tmp/vendor/fleximages/flex-images.min.js client/public/js/
