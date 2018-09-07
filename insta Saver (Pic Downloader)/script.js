let textBox;
let btnSubmit;
let parent;
let loading;
$(document).ready(function(){
    textBox = $('#textBox');
    btnSubmit = $('#btnSubmit');
    loading = $('#loading');

    btnSubmit.click(function(){
        //https://api.instagram.com/oembed/?callback=&url=
        let url = textBox.val();
        loading.text("Loading...");
        $.ajax({
            url: `https://api.instagram.com/oembed/?callback=&url=${url}`,
            method: 'GET',
            success: function(data){
                console.log("data");
                if(data == "No URL Match"){
                    loading.text("No URL Match");
                }
                else{
                    let username = data.author_name;
                    let index = (url.indexOf("/p/"))+3;
                    let imgid = url.substr(index, 11);
                    //https://www.instagram.com/p/Bk1wsP-jmqS/?utm_sour
                    //console.log(username);
                    //console.log(url);
                    //console.log(imgid);
                    //
                    $.ajax({
                        url: `https://apinsta.herokuapp.com/u/${username}`,
                        method: 'get',
                        success: function(data){
                            parent = data.graphql.user.edge_owner_to_timeline_media.edges;
                            console.log(parent);
                            for(i in parent){
                                if(parent[i].node.shortcode == imgid){
                                    break;
                                }
                            }
                            loading.text("");
                            let link = parent[i].node.display_url;
                            $("#imgParent").html(`<img src="${link}" width="100%"></img><a href="${link}" download><input type="button" id="btnDownload" value="Download Image"></input></a>`)
                            console.log(link);
                        }
                    })
                }
            },
            fail: function(){
                $("#imgParent").text("");
                loading.text("Failed loading the image. Try Again");
            },
            error: function(data){
                if(data.status == 400){
                    $("#imgParent").text("");
                    loading.text("No URL Match. Try Again");
                }
                else{
                    loading.text("Failed loading the image. Try Again");
                }
            }
        });
    });
});