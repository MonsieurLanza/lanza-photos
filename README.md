#Lanza's Photos

Aim to be drop-in replacement for cozy-photos, the photo application of CozyCloud.
Still Work In Progress, very early pre-alpha. _DO NOT USE in production._

Known issues :
* crashes if you already have photos in cozy-photos
* thumbnail zoom creates artifacts on webkit based browsers
* upload does not work on iOS (not tested on Android)
* fullscreen does not work (this is a cozy layout issue) unless you open the frame alone in a tab/window.
* view does not refresh after uploading photos (currently implementing this)
* still lots of ugly stuff in here... (client side essentially, but not only)

What does work :
* upload photos using tus resumable protocol (as for now, refresh the page to see them) using form or drag/drop
* displays photos by date (descending) based on exifs
* thumbnails arranged in a smart grid (see : fleximages) preserving aspect ratio
* change thumbnail size
* zoom on hover
* diaporama

This app uses :
* fleximages (with a fix). (MIT)
* lightbox (with another fix). Not this one, this one. (GPL3)
* bootstrap (MIT)
* tus-node-server (MIT)
* tus-js-client (MIT)
* americano (MIT)
* cozydb (MIT)
* temporarily mustache (MIT) and consolidate (MIT), which will soon be dropped for vue.js

a makefile :p
