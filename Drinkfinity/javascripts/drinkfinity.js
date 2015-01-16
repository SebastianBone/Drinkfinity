//(function ($) {
	var Spirituose = Backbone.Model.extend();
	var Kategorie = Backbone.Collection.extend({model: Spirituose});
	var Router = Backbone.Router.extend({
		routes: {
			"show/:kategorie(/:spirituose)": "showCarousel",
			"*page": "showCarousel"
		}
	});	
	var SpirituoseGrossView = Backbone.View.extend({
		template: $("#spirituose-template").html(),
		render: function (wrap) {
			var wrappedTmpl = '<div class="spirituose-gross" data-df-spirituose="<%= id %>">' + this.template + '</div>';
			var tmpl = (wrap ? _.template(wrappedTmpl) : _.template(this.template)); //tmpl is a function that takes a JSON object and returns html
			return tmpl(this.model.toJSON()); //return this;
		}
	});
	var SpirituoseKleinView = Backbone.View.extend({
		template: $("#spirituose-klein-template").html(),
		render: function (wrap) {
			var wrappedTmpl = '<div class="spirituose-klein" data-df-spirituose="<%= id %>">' + this.template + '</div>';
			var tmpl = (wrap ? _.template(wrappedTmpl) : _.template(this.template)); //tmpl is a function that takes a JSON object and returns html
			return tmpl(this.model.toJSON());
		}
	});
	var CarouselView = Backbone.View.extend({
		initialize: function () {
			var views = this.collection.toArray();
			views = (views.length <= 3 ? views.concat(views) : views);

			this._SpirituosenViews = _(views).map(function (spirituose, index) {
				if (index === 1) {
					return new SpirituoseGrossView({model: spirituose});
				} else {
					return new SpirituoseKleinView({model: spirituose});
				}
			});
		},
	 
		render: function () {
			var $el = $(this.el);
			$el.empty(); // Clear out this element.
			_(this._SpirituosenViews).each(function (view) {// Render each sub-view and append it to the parent view's element.
				$el.append(view.render(true));
			});
		}
	});

	var spirituosen = {
		tanqueraygin: new Spirituose({
			id: 'tanqueraygin',
			titel:'Tanqueray London Dry Gin',
			kategorie: 'gin',
			bild:'images/flaschen/tanqueray.png',
			serviervorschlag: 'images/flaschen/tonic.png',
			herkunft:'Benannt nach seinem Hersteller Charles Tanqueray, stammt dieser Gin aus London. Aufgrund des zweiten Weltkriegs wurde die Destillerie allerdings nach Schottland verlegt. Bei der Herstellung werden die verschiedenen Gewürze während der Destillation als Aromastoffe hinzugefügt.',
			zusammensetzung:'Die essenziellen Bestandteile sind Wacholderbeeren, Koriandersamen, Lakritze, Engelwurz und Getreidespirit. Der Alkoholgehalt variiert in den verschiedenen Editionen zwischen 47,3% alc. vol., 43,1% alc. vol. und 40% alc. vol.',
			besonderheiten:'Die auffällig geformte Flasche ist einem englischen Hydranten nachempfunden und ist auf der ganzen Welt als ein Symbol für Klasse und Überlegenheit bekannt. Von denen im zweiten Weltkrieg zerstörten Brennkesseln ist nur einer verschont geblieben, der auch bis heute noch in Betrieb ist. Tanqueray London Dry Gin wird häufig für Longdrinks verwendet.'
		}),
		lagavulinclassic: new Spirituose({
			id: 'lagavulinclassic',
			titel:'Lagavulin "Classic Malt"',
			kategorie: 'whisky',
			bild:'images/flaschen/lagavulin.png',
			serviervorschlag: 'images/flaschen/whisky.png',
			herkunft:'Der Whisky kommt von der schottischen Küste aus der Region Islay. Das Wasser, was in der Lagavulin-Brennerei verwendet wird, stammt aus einem nahe gelegenen Fluss, wodurch der Whisky sein Torfaroma erhält. Das Destillieren erfolgt in birnenförmigen Kesseln und mit 16 Jahren Reifung im Fass hält der Lagavulin 16 Years unter den Classic Malts damit den Rekord.',
			zusammensetzung:'Der Alkoholgehalt beträgt 43% alc. vol., für die Herstellung wird als Basis Malzbrei verwendet.',
			besonderheiten:'Die 16 Years-Edition ist die bestverkaufte Sorte aus dem Hause Lagavulin und ungeheuer populär. Ihr stark torfiger, rauchiger Geschmack mit langem Abgang, bei dem man quasi die Küstenherkunft rausschmecken kann, macht diese Sorte so einzigartig.'
		}),
		bavarkavodka: new Spirituose({
			id: 'bavarkavodka',
			titel:'Bavarka Vodka',
			kategorie: 'vodka',
			bild:'images/flaschen/bavarkavodka.png',
			serviervorschlag: 'images/flaschen/tonic.png',
			herkunft:'Zur Herstellung wird der Vodka aus Oberbayern in einer Kolonnenbrennerei in München unter Aufsicht siebenfach destilliert, um alle unerwünschten Nebenbestandteile loszuwerden. Anschließend lagert das Destillat ein halbes Jahr lang in Steingutgefäßen.',
			zusammensetzung:'Es werden ausschließlich deutsche Kartoffeln und Quellwasser aus dem Mangfallgebirge verwendet. Der Alkoholgehalt beträgt 43% vol.',
			besonderheiten:'Bavarka Vodka ist der erste Vodka der Firma Lantenhammer. Das endgültige Flaschendesign steht bisher noch nicht fest. Dieser Vodka zeigt pur fruchtige Töne und wird auch zum Mischen von klassischen Cocktails empfohlen.'
		}),
		greygoose: new Spirituose({
			id: 'greygoose',
			titel:'Grey Goose',
			kategorie: 'vodka',
			bild:'images/flaschen/greygoose.png',
			serviervorschlag: 'images/flaschen/tonic.png',
			herkunft:'Grey Goose ist ein französischer Wodka, der auf Basis von Weizen aus der Region La Beauce und Wasser, das durch den Kalkstein der Champange natürlich gereinigt wurde, hergestellt wird. Der Wodka wird fünffach destilliert.',
			zusammensetzung:'Der Wodka hat einen Alkoholanteil von 40%. Je nach Sorte werden noch bestimmte Aromastoffe hinzugefügt, was den Alkoholgehalt variieren lässt.',
			besonderheiten:'Grey Goose gibt es auch in Sondereditionen von Armani oder Michalsky und in verschiedenen Aromen wie Orange, Zitrone, Birne und Vanille. Die Flaschen besitzen außerdem Vielfarbdrucke.'
		}),
		absolutvodka: new Spirituose({
			id: 'absolutvodka',
			titel:'Absolut Vodka "Blue Label"',
			kategorie: 'vodka',
			bild:'images/flaschen/absolutvodka.png',
			serviervorschlag: 'images/flaschen/tonic.png',
			herkunft:'Der Absolut Vodka kommt aus der Provin Skåne län, Åhus in Schweden. Dort wurde die fraktionierte Destillation erfunden, wobei unsaubere und unerwünschte Komponenten wie zB. Fuselöle abgetrennt weren. Dadurch entsteht am Ende ein Branntwein von höherer Qualität als bei der klassischen Herstellung in Brandblasen.',
			zusammensetzung:'Der Alkoholgehalt beträgt 40% alc. vol. und die Basis ist Winterweizen.',
			besonderheiten:'Die spezielle Flaschenform, die an Schwedische Apotheken-Flaschen erinnern soll ist das  Markenzeichen des Unternehmens. Es gibt eine große Vielfalt an Varianten und limitierten Sondereditionen, die sich im Design der Flasche, abweichendem Geschmack oder auch Flaschenüberzug („Second Skin“) unterscheiden.'
		}),
		monkey47: new Spirituose({
			id: 'monkey47',
			titel:'Monkey 47 Gin',
			kategorie: 'gin',
			bild:'images/flaschen/monkey-47.png',
			serviervorschlag: 'images/flaschen/tonic.png',
			herkunft:'Der Monkey 47 Gin stammt aus dem Schwarzwald im Nachkriegsdeutschland. Traditionell wird dieser Gin auf britische Weise hergestellt und durch regionale Inhalte spezialisiert.',
			zusammensetzung:'Der Alkoholgehalt beträgt 47% alc.vol., wobei zur Herstellung 47 verschiedene Zutaten, unter anderem Wacholderbeeren aus dem Schwarzwald verwendet werden.',
			besonderheiten:'Der Name geht auf den Namen des Gasthofs „Zum wilden Affen“ zurück, den der Entwickler Montgomery „Monty“ Collins nach dem Zweiten Weltkrieg eröffnete.'
		}),
		jackdaniels: new Spirituose({
			id: 'jackdaniels',
			titel:'Jack Daniel\'s old No.7',
			kategorie: 'whisky',
			bild:'images/flaschen/jack-daniels.png',
			serviervorschlag: 'images/flaschen/whisky-cola.png',
			herkunft:'Jack Daniel\'s old No.7 stammt aus Lynchburg, Tennessee. Die Destillerie befindet sich in einer Kalksteinquelle mit eisenfreiem Wasser. Dort wird der Whisky in einem von Jack Daniel\'s eigens entwickelten und patentierten Verfahren gefiltert: Zwölf Tage lang sickert durch eine ca. drei Meter dicke Zucker-Ahorn-Holzkohleschicht und wird dann für mindestens vier Jahre in Weißeichenfässern gelagert.',
			zusammensetzung:'Der Alkoholgehalt beträgt 40% alc. vol. (vor 1990 noch 43%) und ein wichtiger Bestandteil ist die Maismaische. Der Zusammensetzung nach ist Jack Daniel\'s old No.7 ein „Bourbon“, jedoch wird von Seiten des Unternehmens die Bezeichnung „Tennessee-Whiskey“ verwendet.',
			besonderheiten:'Es ist unbekannt was „old No.7“ bedeutet, denn das Geheimnis hat Gründer Jasper „Jack“ Newton Daniel mit ins Grab genommen. Dieser Mythos wird insofern gerne für Werbezwecke genutzt.'
		})
	};
	function getAllSpirituosen(kategorie) {
		return _.filter(spirituosen, function (spirituose) {
			return spirituose.get('kategorie') === kategorie;
		});
	}
	var kategorien = {
		gin: new Kategorie(getAllSpirituosen('gin')),
		vodka: new Kategorie(getAllSpirituosen('vodka')),
		whisky: new Kategorie(getAllSpirituosen('whisky'))
	};

	function carouselView(kategorie) {
		return new CarouselView({
			collection: kategorien[kategorie],
			el: $('#carousel')
		});
	}

	function spirituoseKleinView(spirituose) {
		return new SpirituoseKleinView({model: spirituosen[spirituose]});
	}

	function spirituoseGrossView(spirituose) {
		return new SpirituoseGrossView({model: spirituosen[spirituose]});
	}
	
	$(document).ready(function () {
		var $carousel, $backgroundBar, $window, $body, $div, $mainContainer, $spirituoseKlein, $spirituoseGross, $logo, $logoWrapper, $centerNav, contentHeight;
		//jquery selectors
		$carousel = $("#carousel");
		$backgroundBar = $("#background-bar");
		$window = $(window);
		$body = $("body");
		$div = $("div");
		$mainContainer = $("#main-container");
		$spirituoseKlein = $(".spirituose-klein");
		$spirituoseGross = $(".spirituose-gross");
		$logo = $("#logo");
		$logoWrapper = $('#logo-wrapper');
		$centerNav = $("#center-nav");

		/* Router */
		var router = new Router();
		router.on("route:showCarousel", function(kategorie, spirituose) {
			console.log(kategorie + spirituose);

			if (!kategorien[kategorie]) {//übergebene kategorie ungültig?
				kategorie = 'whisky'; //wenn nicht: default
				router.navigate("show/whisky", {trigger: false, replace: true});
			}
			$carousel.trigger("destroy");
			carouselView(kategorie).render();
			applyCSS();
			if (kategorien[kategorie].get(spirituose)) { //übergebene spirituose gültig?
				var $selector = $("[data-df-spirituose='" + spirituose + "']:first");
				console.log("asdf");
				initCarousel($selector.prev());
				//initCarousel($("#" + spirituose).prev());
			} else {
				initCarousel();
			}
		});
		Backbone.history.start();

		function applyCSS() {
			$spirituoseKlein = $(".spirituose-klein");
			$spirituoseGross = $(".spirituose-gross");

			//reset modified style properties
			$mainContainer.css('margin-top', '');
			$body.css('height', '');
			$logo.css('max-height', '');
			$spirituoseKlein.css('margin-top', '');
			if ($window.width() > 767 || $window.width === 0) {
				var windowHeight = $window.height();
				contentHeight = $mainContainer.height();
				var maxMarginTop = (windowHeight - contentHeight) / 2;
				var marginTop = Math.max(maxMarginTop, 15);

				$mainContainer.css('margin-top', marginTop);

				contentHeight = $mainContainer.height();
				$body.css("height", windowHeight - 2 * marginTop);
				$div.css("max-height", contentHeight - (marginTop / 2));

				
				$spirituoseKlein.height(contentHeight / 2).css('margin-top', (contentHeight / 4));
				$backgroundBar.height(contentHeight / 2).css('top', (contentHeight / 4));
				//logo
				var logoMarginTop = -1 * Math.min(25, marginTop);
				$logoWrapper.css("top", logoMarginTop);
				var maxLogoHeight = contentHeight / 4 - 10;
				if ($logo.height() > maxLogoHeight || $logo.height() === 0) {
					$logo.css('max-height', maxLogoHeight);
				}
				//nav
				var navHeight = $centerNav.height();
				$centerNav.css('margin-top', (contentHeight - navHeight)/2);
				//carousel
				if ($carousel.width() > $window.width()) {
					$carousel.carouFredSel({height: contentHeight});
				}
				$carousel.trigger("updateSizes");
			}
		}



		/* Carousel */
		function initCarousel(startItem) {
			var smallWidth = $("#width-hidden .three").first().width() - 15;
			var centerWidth = $("#width-hidden .ten").width() - 15;
			$(".spirituose-klein").width(smallWidth);
			$(".spirituose-gross").width(centerWidth);
			function getStartItem() {

			}
			$carousel.carouFredSel({
				height: contentHeight,
				items: {
					visible: 3,
					width: "variable",
					start: (startItem || 0)
				},
				swipe: {onTouch: true},
				scroll: {
					items: 1,
					duration: 700,
					onBefore: function (data) {
						var direction = data.scroll.direction;
						var aniDuration = data.scroll.duration;

						var $spirituoseGross = data.items.old.eq(1); // 0 [1] 2
						//var $spirituoseGross = $(".spirituose-gross");
						var nextCenter = (direction === "prev" ? $spirituoseGross.prev() : $spirituoseGross.next());

						var centerID = $spirituoseGross.data("df-spirituose");
						var nextID = $(nextCenter).data("df-spirituose");
						var nextMarginTop = $(nextCenter).css('margin-top');
						var nextHeight = $(nextCenter).height();
						_.defer(function () {
							$spirituoseGross.removeClass('spirituose-gross').addClass('spirituose-klein')
								.html(spirituoseKleinView(centerID).render(false))
								.animate(
									{marginTop: nextMarginTop, height: nextHeight},
									{queue: false, duration: aniDuration*0.2}
								)
								.animate(
									{width: smallWidth},
									{queue: true, duration: aniDuration*0.5}
								);
							$(nextCenter).animate(
								{width: centerWidth},
								{queue: false, duration: aniDuration*0.7}
								);
						});
						_.delay(function () {
							$(nextCenter).removeClass('spirituose-klein').addClass('spirituose-gross')
								.html(spirituoseGrossView(nextID).render())					
								.animate(
									{marginTop: 0},
									{queue: false, duration: aniDuration*0.1}
									)
								.animate(
									{height: ($(this).height() * 2)},
									{queue: false, duration: aniDuration*0.3}
									);
							$carousel.trigger("updateSizes");
						}, aniDuration*0.7);
					}
				},
				auto: false,
				next: {key: "right"},
				prev: {key: "left"},
				infinite: true
			});
		}

		/* Suche */

		var autoCompleteValues = [
			{titel: "Whisky", kategorie: "whisky"},
			{titel: "Gin", kategorie: "gin"},
			{titel: "Vodka", kategorie: "vodka"},
			{titel: "Wodka", kategorie: "vodka"}
		];
		_.each(_.values(spirituosen), function (spirituose) {
			autoCompleteValues.push({
				titel: spirituose.attributes.titel,
				id: spirituose.attributes.id,
				kategorie: spirituose.attributes.kategorie
			});
		});
		var $searchInput = $("#search-input");
		$searchInput.autocomplete({
			source: function(request, response) {
				var matcher, matched;
				//Suche nach Wörtern in Titel und Kategorie, die mit dem eingegebenen Text beginnen
				matcher = new RegExp('\\b' + $.ui.autocomplete.escapeRegex(request.term), "i");
				matched = $.grep(autoCompleteValues, function (value) {
					return matcher.test(value.titel) || matcher.test(value.kategorie);
				});
				response(matched);
			},
			select: function(event, ui) {
				$searchInput.val(ui.item.titel);
				if (ui.item.hasOwnProperty("id")) {
					$searchInput.data("df-link", "show/" + ui.item.kategorie + "/" + ui.item.id);
					//$("#search-link").val("/show/" + ui.item.kategorie + "/" + ui.item.id);
				} else {
					$searchInput.data("df-link", "show/" + ui.item.kategorie);
					//$("#search-link").val("/show/" + ui.item.id);
				}
				return false;
			}
		}).data("ui-autocomplete")._renderItem = function (ul, item) {
				return $("<li>")
					.append("<a>" + item.titel + "</a>")
					.appendTo(ul);
		};

		/* event handlers */
		$('#search-form').submit(function () {
			searchSubmit();
			return false;
		});
		$('#search-submit').click(searchSubmit);

		function searchSubmit() {
			router.navigate($searchInput.data("df-link"), true);
		}
		$window.resize($.throttle(500, function () {
			Backbone.history.fragment = null;
			Backbone.history.navigate(document.location.hash, true); 
		})); //fire not more often than every 100ms	
	});
//})(jQuery);
		/*var remainingContentHeight = (contentHeight / (contentHeight + marginTop) * 100) + '%';
		$("body").css('height', remainingContentHeight);*/
