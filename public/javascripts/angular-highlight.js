angular.module('angular-highlight', []).directive('highlight', function() {
	var component = function(scope, element, attrs) {
		
		if (!attrs.highlightClass) {
			attrs.highlightClass = 'angular-highlight';
		}
		
		var replacer = function(match, item) {
			return '<span class="'+attrs.highlightClass+'">'+match+'</span>';
		}
		var tokenize = function(keywords) {
			var keywords_yop = keywords.replace(new RegExp(',$','g'), '').split(',');
			var i;
			var l = keywords_yop.length;
			for (i=0;i<l;i++) {
				keywords_yop[i] = keywords_yop[i].replace(new RegExp('^ | $','g'), '');
			}
			return keywords_yop;
		}

		scope.$watch('keywords', function() {
			//console.log("scope.keywords",scope.keywords);
			if (!scope.keywords || scope.keywords == '') {
				element.html(scope.highlight);
				return false;
			}
			
			
			var tokenized	= tokenize(scope.keywords);
			var regex 		= new RegExp(tokenized.join('|'), 'gmi');
			
			console.log("regex",regex);

			// Find the words
			var html = scope.highlight.replace(regex, replacer);

			console.log(html)

			element.html(html);
		});
	}
	return {
		link: 			component,
		replace:		false,
		scope:			{
			highlight:	'=',
			keywords:	'='
		}
	};
});