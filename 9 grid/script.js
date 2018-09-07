let image = $('#imgCrop');

function imgCrop() {
    image.cropper({
        aspectRatio: 1 / 1,
        zoomOnTouch: false,
        zoomOnWheel: false,
		dragMode: false
    });
}


function saveimg() {
    console.log("hello boi")
    image.cropper('getCroppedCanvas').toBlob(function (blob) {
        const formData = new FormData();
        formData.append('croppedImage', blob);

        let objectURL = URL.createObjectURL(blob);

        let image = new Image();
        image.onload = cutImageUp;
        image.src = objectURL;

        function cutImageUp(){
            let imagePieces = [];
            let widthOfSingleImage = image.width / 3;
            let heightOfSingleImage = image.height / 3;
            let canvas = document.createElement('canvas');
            canvas.width = widthOfSingleImage;
            canvas.height = heightOfSingleImage;
            let context = canvas.getContext('2d');
            for(let x =0; x<9 ; x++){
                let w = -(x % 3)*widthOfSingleImage;
                let h = -parseInt((x / 3))*heightOfSingleImage;
                context.drawImage(image, w, h, widthOfSingleImage*3, heightOfSingleImage*3);
                imagePieces.push(canvas.toDataURL());
            }
            let element = '<div class="nine-grid-container" id="nine-grid-container">';
            for(let x =0; x<9 ; x++){
                element += `<img src=${imagePieces[x]}>`;
            }
            element += "</div><div class=\"downloadLinkButtons\">";
            for(let x =0; x<9 ; x++){
                element += `<a href="${imagePieces[x]}" download="Image ${x+1}.jpg">Download Image ${x+1}</a><br>`;
            }
            element += "</div>";
            $('.container').eq(0).append(element);

        }

    })
    this.style.display = "none";
}

function loadImage() {
    if (this.files[0]) {
        let mFileReader = new FileReader();
        mFileReader.onload = function (data) {
            //image.src = data.target.result;
            image.on('load', function () {
                image.css("display", "inline-block");
                imgCrop();
                $('#saveImageButton').css("display", "inline-block")
            }).attr("src", data.target.result);

        }
        mFileReader.readAsDataURL(this.files[0]);
    }
}