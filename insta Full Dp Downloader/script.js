let textBox;
let btnSubmit;
let loading;


$(document).ready(function(){
    textBox = $('#textBox');
    btnSubmit = $('#btnSubmit');
    loading = $('#loading');
    btnSubmit.click(function(){
        console.log("Image Downloading Started");
        loading.text("Loading...");
        hdImage(function(hdImage){
            let imgParent = $('#imgParent');
            let value = `<img src="${hdImage}" style="Width:400px;">`;
            let value2= `<a href="${hdImage}" download><input type="button" id="btnDownload" value="Download Image"></a>`;
            imgParent.text(""); //removing the image, if already a image exist
            imgParent.append(value); //adding the image
            imgParent.append(value2);
        })
    });
});

function hdImage(appendToImgParent) {
    $.ajax({
        url: `https://apinsta.herokuapp.com/u/${textBox.val()}`,
        method: 'GET',
        success:function (data) {
            console.log(data);
            let userid = data.graphql.user.id;
            $.ajax({
                url: `https://i.instagram.com/api/v1/users/${userid}/info/`,
                method: 'GET',
                success:function (data) {
                    let hdImage = data.user.hd_profile_pic_url_info.url;
                    loading.text("");
                    console.log("Hd Image Url "+hdImage);
                    appendToImgParent(hdImage); // calling the passed function back
                }
            });
        },
        error: function(){
            loading.text("Failed... Check the username or Internet Connection");
            //window.alert("Failed... Check the username or Internet Connection");
        }
    })
    ;
}


