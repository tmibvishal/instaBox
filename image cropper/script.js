let image = $('#imgCrop');

function imgCrop() {
    image.cropper({
        aspectRatio: 3 / 1,
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

        function cutImageUp() {
            let imagePieces = [];
            console.log(image.width);
            let widthOfOnePiece = (image.width) / 3;
            let heightOfOnePiece = image.height;
            for (var x = 0; x < 3; ++x) {
                for (var y = 0; y < 1; ++y) {
                    var canvas = document.createElement('canvas');
                    canvas.width = widthOfOnePiece;
                    canvas.height = heightOfOnePiece;
                    var context = canvas.getContext('2d');
                    context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
                    imagePieces.push(canvas.toDataURL());
                }
            }
            // imagePieces now contains data urls of all the pieces of the image
            // load one piece onto the page
            //var anImageElement = document.getElementById('myImageElementInTheDom');
            //myImage.src = imagePieces[0];


            let element = `<div class="ism-slider" data-buttons="false" id="my-slider"><ol><li><img src="${imagePieces[0]}"></li><li><img src="${imagePieces[1]}"></li><li><img src="${imagePieces[2]}"></li></ol></div><br><br>
<div class="downloadLinkButtons"><a href="${imagePieces[1]}" download="Image 1.jpg">Download Image 1</a><br><a href="${imagePieces[1]}" download="Image 2.jpg">Download Image 2</a><br><a href="${imagePieces[2]}" download="Image 3.jpg">Download Image 3</a></div>`;
            $('.container').eq(0).append(element);

            afterimageload();
            // afterimageload is a function in ism-2.2-min.js
        }
    })
    this.style.display = "none";
}

function loadImage() {
    if (this.files[0]) {
        let mFileReader = new FileReader();
        mFileReader.onload = function (data) {
            //image.src = data.target.result;
            image.on('load', function(){  image.css("display", "inline-block"); imgCrop(); $('#saveImageButton').css("display", "inline-block")}).attr("src", data.target.result);

        }
        mFileReader.readAsDataURL(this.files[0]);
    }
}