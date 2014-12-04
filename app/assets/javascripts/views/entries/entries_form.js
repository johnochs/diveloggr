Diveloggr.Views.EntriesForm = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model, "sync", this.updateMap);
		this.updateMap();
		var wrapper = google.maps.event.addListenerOnce(
			Diveloggr.map, 'click', this.addDragMarker.bind(this)
		);
		this.addGoogEL(wrapper);
		var wrapper = google.maps.event.addListener(
			Diveloggr.map, 'idle', this.render.bind(this)
		);
		this.addGoogEL(wrapper);
	},
	template: JST['entries/new_form'],
	className: "new_entry_form container",
	events: {
		"submit": "submitForm",
		"click #form-upload-photos": "uploadPhotos"
	},
	render: function () {
		var renderedContent = this.template({ entry: this.model });
		this.$el.html(renderedContent);
		this.$('#map-container').html(Diveloggr.$mapEl);
		google.maps.event.trigger(Diveloggr.map, 'resize');
		this.updateSelected();
		this.parseTime();
		return this;
	},
	submitForm: function (event) {
		event.preventDefault();
		var formInput = $('#entry_form_el').serializeJSON();
		var entry = this.model.set(formInput);
				
		if (entry.isNew()) {
			this.collection.create(entry, {
				success: success
			});
		} else {
			entry.save({}, {
				success: function () {
					success();
					//On successful save, also remove the old marker from the map
					//and replace it with a new one.
					if (this.marker) {
						var oldMarker = Diveloggr.markerHash[entry.get('id')];
						oldMarker.setMap(null)
						Diveloggr.markerHash[entry.get('id')] = this.marker;
					}
				}.bind(this)
			});
		}
		function success () {
			Backbone.history.navigate("/feed", { trigger: true});
		}
	},
	updateSelected: function () {
		var that = this;
		_(this.model.attributes).each( function (value, attribute) {
			var searchId = "* #" + attribute;
			that.$el.find(searchId).each( function (){
				if($(this).val() === value) {
					$(this).prop("checked", true);
				}
			});
		});
	},
	updateMap: function () {
		if (!this.model.isNew()) {
			if(this.model.get('latitude')) {
				var lL = new google.maps.LatLng(
							parseFloat(this.model.get('latitude')),
							parseFloat(this.model.get('longitude'))
						 );
				Diveloggr.map.panTo(lL);
				Diveloggr.map.setZoom(15);
			}
		} else {
			var lL = new google.maps.LatLng(37.781083, -122.411542);
			Diveloggr.map.panTo(lL);
			Diveloggr.map.setZoom(15);
		}
	},
	addDragMarker: function(event) {
		var lL = event.latLng;  //stores google maps event latLng object where click occurred
		var newMarker = new google.maps.Marker({
			position: lL,
			map: Diveloggr.map,
			draggable: true,
			annimation: google.maps.Animation.DROP
		});
		
		Diveloggr.looseMarkers.push(newMarker);
		
		this.marker = newMarker;
		this.updateLatLng(newMarker.getPosition());
			var wrapper = google.maps.event.addListener(
					this.marker, 'position_changed', this.readLatLng.bind(this)
				);
			this.addGoogEL(wrapper);	
	},
	readLatLng: function () {
		var lL = this.marker.getPosition();
		
		this.updateLatLng(lL);
	},
	updateLatLng: function (latLng) {  //Note that this method takes a google latLng object
		if (!this.$lat && !this.$lng) {
			this.$lat = this.$el.find('#latitude');
			this.$lng = this.$el.find('#longitude');
		}
		
		this.$lat.attr('value', latLng.lat());
		this.$lng.attr('value', latLng.lng());
	},
	parseTime: function () {
		if (this.model.escape('entrytime')) {
			var timeStr = this.model.escape('entrytime');
			var parsedTime = timeStr.match(/:\d+:\d+/)[0].slice(1);
			this.$el.find('#entrytime').attr('value', parsedTime);
		}
	},
	uploadPhotos: function (event) {
		event.preventDefault();
		var that = this;
		
		filepicker.setKey("AadZ0oXR7q9wOPgssMM0gz");

		filepicker.pickAndStore({maxFiles: 10,
								 multiple: true,
								 maxSize: 10485760,
								 mimetype: 'image/*',
								 services: ['COMPUTER', 'FACEBOOK', 'BOX', 'GMAIL', 'FTP', 'GOOGLE_DRIVE', 'URL', 'FLICKR'],
								 openTo: 'COMPUTER'},
								{location: 'S3'},
								function(Blobs){

									
									Blobs.forEach( function (imageObj) {
										
										var image = new Diveloggr.Models.Image;
										_.each(imageObj, function(value, attr) {
											
											//since we are uploading the large version, it is important to store the filepicker response for the attribute "url" under "l_url", which is in the schema.
											if(attr == "url"){
												image.set('l_url', value);
											} else {
												image.set(attr, value);
											}
											
										})
										debugger
										image.set('imageable_type', 'Entry');
										image.set('imageable_id', that.model.get('id'));
										image.save({});
										
										//Calls FP conversion to medium sized image
										filepicker.convert(imageObj, 
											{
											width: 200,
											height: 200,
											fit: 'clip',
											align: 'faces',
											format: 'jpg',
											quality: 90,
											},
											{location: 'S3'},
											function (new_Blob) {
												image.set('m_url', new_Blob.url);
												image.save({});
											},
											function (FPError) {
												console.log(FPError.toJSON());
											},
											function (percent){
											}
										);
										
										//Calls FP conversion to small sized image
										filepicker.convert(imageObj, 
											{
											width: 50,
											height: 50,
											fit: 'clip',
											align: 'faces',
											format: 'jpg',
											quality: 90,
											},
											{location: 'S3'},
											function (new_Blob) {
												image.set('s_url', new_Blob.url);
												image.save({});
											},
											function (FPError) {
												console.log(FPError.toJSON());
											},
											function (percent){
											}
										);
								
										console.log(JSON.stringify(Blobs));  //TODO: RFP
										//input the callbacks for saving medium and small here later
									})
								},
								function(FPError){
									console.log(FPError.toJSON());  //TODO: RFP
								});
	},
});
