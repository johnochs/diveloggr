Diveloggr.Views.UserEdit = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.image(), 'change', this.render);
		// debugger
	},
	template: JST['users/edit'],
	className: 'container',
	events: {
		"click .change-profile-pic": "uploadPhotos",
		"click #update-user-button": "submitForm",
		"click #rollback-form-button": "rollBack" 
	},
	render: function () {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		// debugger
		return this;
	},
	submitForm: function (event) {
		var formInput = $('form').serializeJSON();
		var user = this.model.set(formInput);
		
		this.model.save({},{
			success: function(model, response, options) { Backbone.history.navigate('/users/' + model.get('id'), { trigger: true }) },
			error: function (model, response, options) { console.log(response) }
		});
	},
	rollBack: function (event) {
		$('#roll-back-form-button').click( function () {
			$('#edit-user-form')[0].reset();
		});
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
										image.set('imageable_type', 'User');
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
											quality: 80,
											},
											{location: 'S3'},
											function (new_Blob) {
												image.set('m_url', new_Blob.url);
												image.save({});
												that.model.fetch();
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
											width: 100,
											height: 100,
											fit: 'clip',
											align: 'faces',
											format: 'jpg',
											quality: 80,
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
	}
});