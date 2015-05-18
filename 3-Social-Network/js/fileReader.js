// Change later to a more concrete selector
var selector = '#wrapper';

// Trigger file selection window
$(selector).on('click', '#upload-file-button', function () {
    $('#picture').click();
});

// Reads the selected file and returns the data as a base64 encoded string
$(selector).on('change', '#picture', function () {
    var file = this.files[0],
        reader;
    var sizeCheck = file.size / 1024 <= 128;
    var typeCheck = file.type.match(/image\/.*/);
    $('#notification').css('display', 'block');
    $('#notification').text('');

    if (file.type.match(/image\/.*/) && sizeCheck) {
        reader = new FileReader();
        reader.onload = function () {
            // TODO: set file name to picture name paragraph
            $('.picture-name').text(file.name);
            // TODO: set read image data for image preview
            $('.picture-preview').attr('src', reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        // TODO: Display type-mismatch error message
        if (typeCheck == null) {
            $('#notification').text('You must select an image').delay(2000).fadeOut();
        } else {
            $('#notification').text('Too big picture. Choose picture up to 128KB.').delay(2000).fadeOut();
        }
    }
});