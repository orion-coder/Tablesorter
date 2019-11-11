(function($){

    $.fn.linkincolumn = function(args) {

        $(this).each(function(e){
            var table = $(this);
            var tbody = (table.find('tbody').length > 0) ? table.find('tbody').not("."+args.exceptLink) : table;
            args = parseArgs(table, args);
				applyLinks(tbody, args.targetColumn, args.targetLink);
        });
    
        function parseArgs(table, args) {
            if(typeof args == "undefined") args = [];
            if(typeof args.targetColumn !== "undefined" && args.targetColumn >= 0) {
                args.targetColumn = parseInt(args.targetColumn);
            }else{
                args.targetColumn = 0;
            }
            return args;
        }

        function applyLinks(table, targetColumn, targetLink) {
            table.find('tr').each(function(i) {
					 var NewName = '<a href="'+targetLink+$(this).children().eq(targetColumn).text()+'" target="_blank">'+$(this).children().eq(targetColumn).text()+'</a>';
					 $(this).children().eq(targetColumn).html(NewName);
            });
        }
        return this;
    }
})(jQuery);

