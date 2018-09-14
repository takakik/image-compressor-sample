$('#file').change(function (e) {
  console.dir(e.target.files);
  var 
    URL = window.URL || window.webkitURL,

    croppie_opts = {
      enableExif        : true,
      viewport          : { width: 160, height: 160 },
      boundary          : { width: 280, height: 200 },
      mouseWheelZoom    : false,
      showZoomer        : false,
      enableOrientation : true
    },
    croppie = new Croppie(document.getElementById('croppie')),

    options = {
      checkOrientation: true,
      maxWidth: 400,
      maxHeight: undefined,
      minWidth: 0,
      minHeight: 0,
      quality: 0.3,
      mimeType: '',
      //convertSize: 5000000,
      success: function (file) {
        // Blog URLの作成
        var blobUrl = URL.createObjectURL(file);

        $('#original').html($('<img />').attr('src', blobUrl));

        croppie
          .bind({ url : blobUrl })
          .then(function () {
            croppie.result('blob').then(function(r) {
              var src = URL.createObjectURL(r);
              $('#crop').html($('<img />').attr('src', src));
            });
          });
      }
    },

    file = e.target.files ? e.target.files[0] : null,
    imgCompressor = new ImageCompressor(file, options);
});
