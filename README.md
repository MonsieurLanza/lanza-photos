#Lanza's Photos

Aim to be drop-in replacement for cozy-photos, the photo application of CozyCloud.
Still Work In Progress, very early pre-alpha. _DO NOT USE in production._

Known issues :
* crashes if you already have photos in cozy-photos
* thumbnail zoom creates artifacts on webkit based browsers
* upload does not work on iOS (not tested on Android)
* fullscreen does not work (this is a cozy layout issue) unless you open the frame alone in a tab/window.
* still lots of ugly & unfinished stuff in here... (client side essentially, but not only)
* view is trashed after adding photos.

What does work :
* upload photos using tus resumable protocol (as for now, refresh the page to see them) using form or drag/drop
* displays photos by date (descending) based on exifs
* thumbnails arranged in a smart grid (see : fleximages) preserving aspect ratio
* change thumbnail size
* zoom on hover
* diaporama

This app uses :
* [flexImages](https://github.com/Pixabay/JavaScript-flexImages) (with a [fix](https://github.com/Pixabay/JavaScript-flexImages/pull/5)). (MIT)
* [LightBox](https://github.com/PyxelCoder/LightBox) (with another fix). Not this [one](https://github.com/lokesh/lightbox2). (GPL3)
* BootStrap 4 alpha (MIT)
* [tus-node-server](https://github.com/tus/tus-node-server) (tweaked to get it work behind cozy-proxy) (MIT)
* [tus-js-client](https://github.com/tus/tus-js-client) (MIT)
* americano (MIT)
* cozydb (MIT)
* temporarily mustache (MIT) and consolidate (MIT), which will soon be dropped for vue.js
* a makefile :p
