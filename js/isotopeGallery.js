(function($) {
    $.fn.isotopeGallery = function (arg) {
        return this.each(function (index, gallery) {

            // TODO: Error handling
            var $gallery = $(gallery);
            var $gallery_items = $('.isotope-gallery a');
            var $gallery_images = $('.isotope-gallery img');

            var setupIsotopeGallery = function() {

                // Setup Isotope: square images, margins,...
                var margins = 0; 
                if (arg.margins != undefined) {
                    margins = arg.margins;
                }
                if (arg.imageSize != undefined) {                
                    
                    // Use the overall width of the gallery ($gallery.width()) and resize the elements
                    var gallery_width = $gallery.width();
                    var cols = Math.floor(gallery_width / (arg.imageSize + 2*margins));
                    var actualSize = Math.floor((gallery_width - cols*2*margins) / cols);
                    // console.log("Actual size: " + actualSize);
                    $gallery_items.css({"height": actualSize, "width": actualSize});
                    $gallery_images.css({"height": "100%", "width": "100%"})
                }

                $gallery_items.css({"margin": arg.margins});
                // Compensate margins in $gallery
                $gallery.css({"margin": -arg.margins});
            
                $gallery.isotope({
                    itemSelector: 'a',
                    percentPosition: true,
                    masonry: {
                        columnWidth: 'a'
                    }
                });
                $gallery.addClass('isotope-gallery');
    
                // Re-layout Isotope after each image loads
                $gallery.imagesLoaded().progress( function() {
                    $gallery.isotope('layout');
                });  
                $gallery.isotope('layout');
            }

            var destroyIsotopeGallery = function () {
                $gallery.isotope('destroy');
                $gallery_items.removeAttr("style");
                $gallery_images.removeAttr("style");
                
            }
            
            // TODO: Make this configurable
            enquire
            .register("screen and (min-width:1280px)", {

                // Triggered when a media query matches.
                match : setupIsotopeGallery,

                // Triggered when the media query transitions
                // *from a matched state to an unmatched state*.
                unmatch : setupIsotopeGallery
            })
            .register("screen and (min-width:820px)", {
                match : setupIsotopeGallery,
                unmatch : destroyIsotopeGallery
            });


        })
    };
}(jQuery));