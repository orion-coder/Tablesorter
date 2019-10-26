(function($){

    $.fn.progressbarify = function(args) {

        $(this).each(function(e){
            
            var table = $(this);
            var tbody = (table.find('tbody').length > 0) ? table.find('tbody') : table;

            args = parseArgs(table, args);

            var values           = getColumnValues(tbody, args.targetColumn);
				var maxValue         = getMaximumColumnValue(values, args.maximum);
            var minValue   		= getMinimumColumnValue(values, args.minimum);
				// var percentageValues = getPercentageValues(values, maxValue);
            var percentageValues = getPercentageValues(values, minValue, maxValue);
            var gradients        = getPercentageBackgroundGradientValues(percentageValues, args.primaryColour, args.secondaryColour);

            applyGradientBackgrounds(tbody, args.targetColumn, gradients);

        });
    
        function parseArgs(table, args) {

            if(typeof args == "undefined") args = [];

            if(typeof args.primaryColour == "undefined") {
                args.primaryColour = '#31b0d5';
            }

            if(typeof args.secondaryColour == "undefined") {
                args.secondaryColour = 'transparent';
            }

            if(typeof args.maximum == "undefined") {
                args.maximum = false;
            }

            if(typeof args.targetColumn !== "undefined" && args.targetColumn >= 0) {
                args.targetColumn = parseInt(args.targetColumn);
            }else if(typeof table.attr('data-progressbarify') !== "undefined" && table.attr('data-progressbarify') >= 0) {
                args.targetColumn = table.attr('data-progressbarify');
            }else{
                args.targetColumn = 0;
            }

            return args;

        }

        function getColumnValues(table, targetColumn) {
            var values = [];
            $(table).find('tr').each(function() {
                var value = parseFloat($(this).children().eq(targetColumn).text());
                values.push(value);
            });
            return values;
        }

		  /* Rutina para obtener el minimo de la columna */
        function getMinimumColumnValue(values, minimum) {
            if(args.minimum) return args.minimum;
            var min = 99999999;
            for(var i=0; i<values.length; i++) {
                if(values[i] < min) min = values[i];
            }
            return min;
        }
		  
		  function getMaximumColumnValue(values, maximum) {
            if(args.maximum) return args.maximum;
            var max = -99999999;
            for(var i=0; i<values.length; i++) {
                if(values[i] > max) max = values[i];
            }
            return max;
        }

        function getPercentageValues(values, minValue, maxValue) {
            return values.map(function(value) {
					if(args.longBAR=='min')
                return ((maxValue-value) / (maxValue-minValue)) * 100;
					else
					 return ((value-minValue) / (maxValue-minValue)) * 100;
            });
        }
/*        function getPercentageValues(values, maxValue) {
            return values.map(function(value) {
                return (value / maxValue) * 100;
            });
        }
*/
        function getPercentageBackgroundGradientValues(percentageValues, primaryColour, secondaryColour) {
            return percentageValues.map(function(percentage) {
                percentage = Math.round(percentage);
                if(percentage >= 100) percentage = 100;
                return 'linear-gradient(90deg, ' + primaryColour + ' ' + percentage + '%, ' + primaryColour + ' ' + percentage + '%, ' + secondaryColour + ' ' + percentage + '%)';
            });
        }

        function applyGradientBackgrounds(table, targetColumn, gradients) {
            table.find('tr').each(function(i) {
                $(this).children().eq(targetColumn).css('background-image', gradients[i]);
            });
        }

        return this;

    }

})(jQuery);

