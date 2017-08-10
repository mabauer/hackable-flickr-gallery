(function($) {
    $.fn.isotopeGallery = function (arg) {
        return this.each(function (index, gallery) {

            // TODO: Error handling
            var $gallery = $(gallery);
            var $gallery_items = $('.justified-gallery a');

            // Parse args
            if (arg.imageSize != undefined) {                
                $gallery_items.css({"height": arg.imageSize, "width": arg.imageSize});
            }
            if (arg.margins != undefined) {
                $gallery_items.css({"margin": arg.margins});
                // TODO: Compensate margins in $gallery
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
 
            // layout Isotope after each image loads
            $gallery.imagesLoaded().progress( function() {
                $gallery.isotope('layout');
            });  
        })
    };
}(jQuery));