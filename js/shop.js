
$(function(){
    var $advZoeken = $('#adv_zoeken');
    var $advZoekenLink = $('#adv_zoeken_link');
    //$advZoeken.hide();
    //lees localStorage
    var zoek = localStorage.getItem("advZoeken");
    var setting = (zoek!=0 && zoek!=1)?0:zoek;
    //onmiddellijk toepassen
    toggleZoeken(setting,$advZoekenLink,$advZoeken);
    $advZoekenLink.click(function(e){
        e.preventDefault();
        setting = 1 - setting; //bitwise Xor
        toggleZoeken(setting,$(this),$advZoeken);
        localStorage.setItem("advZoeken",setting);
    })
    
    $("#slider-range-hoogte").slider({
        range: true,
        values: [100, 500],
        min: 0,
        max: 5000,
        step: 10,
        slide: function(event, ui) {
            $("#hoogte_min").val($(this).slider("values", 0));
            $("#hoogte_max").val($(this).slider("values", 1));
        },
        stop: function(event, ui) {
            $("#hoogte_min").val($(this).slider("values", 0));
            $("#hoogte_max").val($(this).slider("values", 1));
        }
        
    });

    //initialiseren van de startwaarden
    $("#hoogte_min").val($("#slider-range-hoogte").slider("values", 0));
    $("#hoogte_max").val($("#slider-range-hoogte").slider("values", 1));

    //datatables
    $("#plantenlijst").dataTable({     
        "bPaginate": true,
        "bSort":true,
        "iDisplayLength": 20,
        "iDisplayStart": 0,
        "sPaginationType": "full_numbers",
        "aLengthMenu": [[20, 25, 50, -1], [20, 25, 50, "Alle records"]],
        "bProcessing": true,
        "aaSorting": [[6,'asc'], [2,'desc']],
        "aoColumnDefs": [
        { "bVisible": true, "aTargets": [ 5 ] },
        { "bSortable": false, "aTargets": [ 2, 6 ] },
        { "asSorting": [ "desc" ], "aTargets": [ 3 ] },
        { "bSearchable": false, "sTitle": "Rubriek", "aTargets": [ 6 ] },
        { "sTitle": "Lengte", "sWidth": "5%", "aTargets": [ 2 ] },
        { "sClass": "dt_fluo", "aTargets": [ 0 ] }
        ],
        "oLanguage":{"sUrl": "js/vendor/jquery/Datatables-1.10.4/media/js/datatables.nederlands.txt"}
    });

}); //einde doc ready

//toevoegen van een title text aan de slideknoppen
$(".ui-slider-handle","#slider-range-hoogte")
.first().attr({'title':'Minimum hoogte'})
.end()
.last().attr({'title':'Maximum hoogte'})

function toggleZoeken(toon, $lienk, $el){
    /*
    @toon 1|0 setting tonen of verbergen
    @$lienk de hyperlink
    @$el het element dat getoggled moet worden
    */
    //eerste versie
    //$el.toggle('slow', function(){
    //tekst = ($el.css('display')=="none")?"geavanceerd zoeken":"eenvoudig zoeken";
    //$lienk.text(tekst);
    //})
    var txt_een = "eenvoudig zoeken";
    var txt_adv = "geavanceerd zoeken";
    if(toon==1){
        $el.show('slow');
        $lienk.text(txt_een);
    }
    else if(toon==0){
        $el.hide('normal');
        $lienk.text(txt_adv);
    }
    else{
        throw new Error("arg toon verkeerd")
    }
}