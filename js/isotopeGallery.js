(function($) {
    $.fn.isotopeGallery = function (arg) {
        return this.each(function (index, gallery) {

            // TODO: Error handling
            var $gallery = $(gallery);
            var $gallery_items = $('.isotope-gallery a');
            var $gallery_images = $('.isotope-gallery img');

            // TODO: Make this configurable
            enquire.register("screen and (min-width:800px)", {

                // Triggered when a media query matches.
                match : function() {

                    // Setup Isotope: square images, margins,...
                    if (arg.imageSize != undefined) {                
                        $gallery_items.css({"height": arg.imageSize, "width": arg.imageSize});
                        $gallery_images.css({"height": "100%", "width": "100%"})
                    }
                    if (arg.margins != undefined) {
                        $gallery_items.css({"margin": arg.margins});
                        // Compensate margins in $gallery
                        $gallery.css({"margin": -arg.margins});
                    }
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
                },

                // Triggered when the media query transitions
                // *from a matched state to an unmatched state*.
                unmatch : function() {
                    $gallery.isotope('destroy');
                    $gallery_items.removeAttr("style");
                    $gallery_images.removeAttr("style");
                    
                }
            });

        })
    };
}(jQuery));