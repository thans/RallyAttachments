Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items: [{
        xtype: 'panel',
        title: 'Upload a File',
        width: 400,
        html: "<input id='inputFile' type='file' name='uploaded'/>"
    }, {
        xtype: 'button',
        text: 'Submit',
        handler: function() {
            var files = document.getElementById("inputFile").files;

            if (files && files[0]) {
                var xhr = Ext.Ajax.getXhrInstance();
                xhr.addEventListener('load', Ext.bind(function(event) {
                    if (event && event.target && event.target.responseText) {
                        App._uploadResponse(event.target.responseText);
                    } else {
                        App._failure();
                    }
                    
                }, this), false);

                var formData = new FormData();
                formData.append('file', files[0]);

                xhr.open('POST', App.url, true);
                xhr.send(formData);
            }
            
        }
    }],

    launch: function() {
        App = this;
        RALLY = Rally;
        App.url = 'https://rally1.rallydev.com/slm/ax/uploadAttachment.sp';
    },

    _uploadResponse: function(response) {
        if (response) {
            Ext.Msg.alert('File Upload', response);
        } else {
            App._failure();
        }
    },

    _failure: function() {
        Ext.Msg.alert('Failure', 'Failed to upload your file');
    }
});