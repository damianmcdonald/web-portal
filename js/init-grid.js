// global variable declarations
var $grid = $('.grid');
var MAX_SCROLLABLE = 300;

$( document ).ready(function() {
	
	// intialize materializecss select elements
	$('select').material_select();

	// render and show the isotope grid
	initializeAndRenderGrid();
	showElementByClassifier(".grid-container");
    
    // add scroll logic so that when the screen has been scrolled past
    // MAX_SCROLLABLE we can show a 'back to top' button
    $(window).scroll(function() {
        if ( $(window).scrollTop() > MAX_SCROLLABLE ) {
            $('a.back-to-top').show();
        } else {
            $('a.back-to-top').hide();
        }   
    });
    
    // animate the back-to-top effect
    $('a.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 700);
        return false;
    });
    
    $('.tooltipped').tooltip({delay: 50});
    
});

function initializeAndRenderGrid() {
	renderGrid( 'onlineToolsGrid', ONLINE_TOOLS_DATA );
	renderGrid( 'workToolsGrid', WORK_TOOLS_DATA );
	renderGrid( 'newsSitesGrid', NEWS_SITES_DATA );
	renderGrid( 'ecommerceSitesGrid', ECOMMERCE_SITES_DATA );
	renderGrid( 'sportsSitesGrid', SPORTS_SITES_DATA );
	
	
	initializeGrid();
}

function initializeGrid() {
	$grid.imagesLoaded( function() {
	   $grid.isotope({  
		  itemSelector: '.element-item',
		  layoutMode: 'fitRows',
          sortBy: 'rank',
		  sortAscending: false,
		  getSortData: {
			rank: '.siterank'
		  }
	   });
	});
}

function renderGrid( gridName, sectionData ) {
	var html = '';
	$.each(sectionData, function( index, website ) {
        
	  html += '<div class="siteitem grow element-item">';
	  html += '<span class="siterank" style="display:none;">'+(999-index)+'</span>';
      html += '<span class="sitename" style="display:none;">'+website.name+'</span>';
      html += '<div class="site-content">';
      html += '<a class="tooltipped" data-position="top" data-delay="50" data-tooltip="'+website.name+'" href="'+website.url+'" target="_blank"><img class="activator responsive-img" src="images/covers/' + website.image + '"></a>';    
      html += '</div>';    
      html += '</div>';

	});
	
	$('#'+gridName).html(html);
}

function showElementByClassifier(elem) {
	$(elem).show();
}